// src/app/steps.js
// GPS distance -> steps (stable) + rewards
// Daily puzzle trigger (1x/day) + 1h "glow" ticket boost
// ✅ Single GPS source for the entire app
// ✅ Broadcast player position + heading via "cbsgo:playerPos"
// Autostart + "first tap" fallback (for browsers that require a user gesture)

import { addXp } from './state.js';
import { addTickets } from './inventory.js';

const KEY = 'cbsgo_steps_v6';
const AUTOSTART_KEY = 'cbsgo_gps_autostart_v2';
const DAILY_PUZZLE_KEY = 'cbsgo_daily_puzzle_v1';

// Steps model
const METERS_PER_STEP = 0.75;

// GPS quality / movement rules (tuned for phones)
// 👇 Dit zijn je NU werkende waarden – laten we zo!
const MAX_ACCEPTED_ACCURACY_M = 200;  // accepteer alles tot 200 m nauwkeurigheid
const MIN_DIST_M = 0.3;               // veel minder snel jitter
const MAX_DIST_M = 400;               // ruimer om grotere stukken toe te laten
const MAX_SPEED_MPS = 20;             // tot ~72 km/h, voorkomt dat GPS te snel "too-fast" zegt

// Glow boost
const BOOST_DURATION_MIN = 60;
const BOOST_STEP_CHUNK = 1500;

// Treasure chest config
const CHEST_CHUNK_M = 200;        // elke ~200 meter kans op een chest
const CHEST_BASE_CHANCE = 0.25;   // 25% kans per chunk
const CHEST_RARE_CHANCE = 0.05;   // 5% van de chests is "rare"
const CBS_FLAG_CHANCE = 0.3;      // 30% kans dat rare chest een CBS-flag heeft

let watchId = null;
let enabled = false;
let gpsDebug = { msg: 'init' };

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

function defaultSteps() {
  return {
    steps: 0,
    meters: 0,
    lastPos: null, // { lat, lng, t }
    rewarded5k: false,
    rewarded10k: false,

    // glow boost
    boostUntil: 0,      // epoch ms
    boostLastStep: 0,   // step counter at last boost award

    // treasure chest progress
    chestMeters: 0,     // hoeveel meter sinds laatste chest-check

    updatedAt: Date.now()
  };
}

export function loadSteps() {
  const raw = localStorage.getItem(KEY);
  return safeParse(raw, defaultSteps());
}

function saveSteps(s) {
  s.updatedAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify(s));
}

// aantal stappen
export function getSteps() {
  return Number(loadSteps().steps || 0);
}

// afstand in meters (handig voor UI / debug)
export function getDistanceMeters() {
  const s = loadSteps();
  return Number(s.meters || 0);
}

// afstand in kilometers
export function getDistanceKm() {
  return getDistanceMeters() / 1000;
}

export function isStepsEnabled() {
  return !!enabled;
}

export function getGpsDebug() {
  return gpsDebug;
}

/* ---------------- DAILY PUZZLE ---------------- */

function todayKeyLocal() {
  // local date key (NL time)
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dailyShownToday() {
  try { return localStorage.getItem(DAILY_PUZZLE_KEY) === todayKeyLocal(); }
  catch { return false; }
}

function markDailyShownToday() {
  try { localStorage.setItem(DAILY_PUZZLE_KEY, todayKeyLocal()); }
  catch {}
}

function triggerDailyPuzzle(lat, lng) {
  if (dailyShownToday()) return false;

  window.dispatchEvent(new CustomEvent('cbsgo:dailyPuzzle', {
    detail: { lat, lng, date: todayKeyLocal() }
  }));

  markDailyShownToday();
  return true;
}

/* ---------------- GLOW BOOST ---------------- */

export function getTicketBoostRemainingMs() {
  const s = loadSteps();
  const until = Number(s.boostUntil || 0);
  return Math.max(0, until - Date.now());
}

export function isTicketBoostActive() {
  return getTicketBoostRemainingMs() > 0;
}

export function activateTicketBoost(minutes = BOOST_DURATION_MIN) {
  const mins = Number(minutes);
  const durMs = (Number.isFinite(mins) && mins > 0 ? mins : BOOST_DURATION_MIN) * 60 * 1000;

  const s = loadSteps();
  const now = Date.now();
  const until = now + durMs;

  // extend if already active
  s.boostUntil = Math.max(Number(s.boostUntil || 0), until);

  // start ticket counting from current steps
  s.boostLastStep = Number(s.steps || 0);

  saveSteps(s);

  window.dispatchEvent(new CustomEvent('cbsgo:boostChanged', {
    detail: { boostUntil: s.boostUntil }
  }));

  return { ok: true, boostUntil: s.boostUntil };
}

function applyBoostTickets(s) {
  const remaining = Math.max(0, Number(s.boostUntil || 0) - Date.now());
  if (!remaining) return;

  const last = Number(s.boostLastStep || 0);
  const cur = Number(s.steps || 0);

  if (!Number.isFinite(last)) {
    s.boostLastStep = cur;
    return;
  }

  const delta = cur - last;
  if (!Number.isFinite(delta) || delta < BOOST_STEP_CHUNK) return;

  const tickets = Math.floor(delta / BOOST_STEP_CHUNK);
  if (tickets <= 0) return;

  addTickets(tickets);
  s.boostLastStep = last + tickets * BOOST_STEP_CHUNK;
}

/* ---------------- TREASURE CHESTS ---------------- */

function applyChestProgress(s) {
  let chestMeters = Number(s.chestMeters || 0);
  if (!Number.isFinite(chestMeters)) chestMeters = 0;

  // niet doen als we nog geen volle chunk hebben
  if (chestMeters < CHEST_CHUNK_M) {
    s.chestMeters = chestMeters;
    return;
  }

  let loops = 0;
  // max 5 chunks per call verwerken zodat we niet in een huge loop komen
  while (chestMeters >= CHEST_CHUNK_M && loops < 5) {
    chestMeters -= CHEST_CHUNK_M;
    loops += 1;

    if (Math.random() < CHEST_BASE_CHANCE) {
      const isRare = Math.random() < CHEST_RARE_CHANCE;

      const xp = isRare ? 10 : 3;
      const tickets = isRare ? 2 : 1;

      addXp(xp);
      addTickets(tickets);

      const hasCBSFlag = isRare && (Math.random() < CBS_FLAG_CHANCE);

      // Event voor UI: kan later een chest-popup tonen
      window.dispatchEvent(new CustomEvent('cbsgo:treasureFound', {
        detail: {
          xp,
          tickets,
          rare: isRare,
          hasCBSFlag
        }
      }));

      // 1 chest per call is genoeg
      break;
    }
  }

  s.chestMeters = chestMeters;
}

/* ---------------- STEPS ---------------- */

function metersBetween(a, b) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(s));
}

function applyRewards(s) {
  if (!s.rewarded5k && s.steps >= 5000) {
    s.rewarded5k = true;
    addXp(20);
  }
  if (!s.rewarded10k && s.steps >= 10000) {
    s.rewarded10k = true;
    addTickets(1);
  }
}

export function addMeters(meters) {
  const m = Number(meters || 0);
  if (!Number.isFinite(m) || m <= 0) return loadSteps();

  const s = loadSteps();

  s.meters = Number(s.meters || 0) + m;
  s.chestMeters = Number(s.chestMeters || 0) + m;

  // stable conversion
  const nextSteps = Math.floor((s.meters || 0) / METERS_PER_STEP);
  if (nextSteps > s.steps) s.steps = nextSteps;

  applyRewards(s);
  applyBoostTickets(s);
  applyChestProgress(s);

  saveSteps(s);

  window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged', { detail: { steps: s.steps } }));
  return s;
}

function clearWatch() {
  if (watchId != null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
  watchId = null;
}

export function disableSteps() {
  clearWatch();
  enabled = false;
  gpsDebug = { msg: 'disabled', t: Date.now() };
  try { localStorage.setItem(AUTOSTART_KEY, '0'); } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } }));
}

export function shouldAutoStart() {
  try {
    return localStorage.getItem(AUTOSTART_KEY) === '1';
  } catch {
    return false;
  }
}

export async function enableSteps(opts = {}) {
  const silent = !!opts.silent;

  if (!navigator.geolocation) {
    gpsDebug = { err: 'GPS not supported', t: Date.now() };
    return { ok: false, reason: 'GPS not supported' };
  }

  try { localStorage.setItem(AUTOSTART_KEY, '1'); } catch {}

  clearWatch();
  enabled = true;
  gpsDebug = { msg: 'requesting', t: Date.now() };

  try {
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy || 999;
        const now = Date.now();

        const s = loadSteps();
        const last = s.lastPos;

        // Always update lastPos so we can accumulate once accuracy improves
        s.lastPos = { lat, lng, t: now };
        saveSteps(s);

        // ✅ Broadcast player position for the map + compass + arrow
        const heading = Number.isFinite(pos.coords.heading) ? pos.coords.heading : null;
        const speedGps = Number.isFinite(pos.coords.speed) ? pos.coords.speed : null;

        window.dispatchEvent(new CustomEvent('cbsgo:playerPos', {
          detail: { lat, lng, acc, heading, speed: speedGps, t: now }
        }));

        // If accuracy is bad, do not count movement
        if (acc > MAX_ACCEPTED_ACCURACY_M) {
          gpsDebug = {
            lat, lng, acc, t: now,
            reason: 'accuracy',
            boostMs: getTicketBoostRemainingMs()
          };
          window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } }));
          return;
        }

        // ✅ 1x/day daily puzzle exactly at your GPS location
        triggerDailyPuzzle(lat, lng);

        let dist = 0;
        let dt = 0;
        let speed = 0;
        let added = 0;
        let reason = 'no-last';

        if (last && typeof last.lat === 'number' && typeof last.lng === 'number' && typeof last.t === 'number') {
          dist = metersBetween({ lat: last.lat, lng: last.lng }, { lat, lng });
          dt = Math.max(1, (now - last.t) / 1000);
          speed = dist / dt;

          if (dist < MIN_DIST_M) reason = 'jitter';
          else if (dist > MAX_DIST_M) reason = 'teleport';
          else if (speed > MAX_SPEED_MPS) reason = 'too-fast';
          else {
            addMeters(dist);
            added = dist;
            reason = 'ok';
          }
        }

        gpsDebug = {
          lat, lng, acc, t: now,
          dist: Math.round(dist),
          dt: Math.round(dt),
          speed: Number(speed.toFixed(2)),
          added: Math.round(added),
          reason,
          boostMs: getTicketBoostRemainingMs()
        };

        window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } }));
      },
      (err) => {
        enabled = false;
        gpsDebug = { err: err?.message || 'GPS blocked', t: Date.now() };
        if (!silent) {
          // browsers that require a user gesture are handled by tryAutoStart()
        }
        window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } }));
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 12000
      }
    );

    return { ok: true };
  } catch (e) {
    enabled = false;
    gpsDebug = { err: String(e?.message || e), t: Date.now() };
    return { ok: false, reason: 'Failed to start GPS' };
  }
}

// ✅ auto-start + first-tap fallback
export function tryAutoStart() {
  if (window.__cbsgo_try_autostart) return;
  window.__cbsgo_try_autostart = true;

  const attempt = async () => {
    if (isStepsEnabled()) return;
    await enableSteps({ silent: true });
  };

  // Try immediately
  attempt();

  // Some browsers require a user gesture: start on first tap anywhere
  const onFirstTap = async () => {
    if (!isStepsEnabled()) await enableSteps({ silent: true });
    window.removeEventListener('pointerdown', onFirstTap);
    window.removeEventListener('touchstart', onFirstTap);
    window.removeEventListener('click', onFirstTap);
  };

  window.addEventListener('pointerdown', onFirstTap, { once: true });
  window.addEventListener('touchstart', onFirstTap, { once: true });
  window.addEventListener('click', onFirstTap, { once: true });
}
