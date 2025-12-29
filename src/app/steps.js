// src/app/steps.js
// GPS distance -> steps (stable) + rewards
// Daily puzzle trigger (1x/day) + 1h "glow" ticket boost
// ✅ Single GPS source for the entire app
// ✅ Broadcast player position + heading via "cbsgo:playerPos"
// Autostart + "first tap" fallback (for browsers that require a user gesture)

import { addXp } from './state.js';
import { addTickets, addCbsCoins } from './inventory.js';

const KEY = 'cbsgo_steps_v6';
const AUTOSTART_KEY = 'cbsgo_gps_autostart_v2';
const DAILY_PUZZLE_KEY = 'cbsgo_daily_puzzle_v1';

// Steps model
const METERS_PER_STEP = 0.75;

// Daily goal + streak
const DAILY_GOAL_STEPS = 5000;
const STREAK_LENGTH = 7;
const STREAK_REWARD_CBS = 100;

// GPS quality / movement rules (tuned for phones)
const MAX_ACCEPTED_ACCURACY_M = 1000;
const MIN_DIST_M = 0.5;
const MAX_DIST_M = 2000;
const MAX_SPEED_MPS = 4.5;

// Glow boost
const BOOST_DURATION_MIN = 60;
const BOOST_STEP_CHUNK = 1500;

// Treasure chest config
const CHEST_CHUNK_M = 200;
const CHEST_BASE_CHANCE = 0.25;
const CHEST_RARE_CHANCE = 0.05;
const CBS_FLAG_CHANCE = 0.3;

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

/* ---------- DATE HELPERS ---------- */

function todayKeyLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseDateKey(key) {
  if (!key || typeof key !== 'string') return null;
  const parts = key.split('-').map(Number);
  if (parts.length !== 3) return null;
  const [y, m, d] = parts;
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt;
}

function formatDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getLastNDates(endKey, n) {
  const base = parseDateKey(endKey);
  if (!base) return [];
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base.getTime());
    d.setDate(d.getDate() - i);
    out.push(formatDateKey(d));
  }
  return out;
}

function defaultSteps() {
  return {
    // lifetime
    steps: 0,
    meters: 0,
    totalMeters: 0,

    lastPos: null,

    // glow boost
    boostUntil: 0,
    boostLastStep: 0,

    // treasure chest
    chestMeters: 0,

    // distance-based rewards (lifetime)
    xpKmAwarded: 0,
    ticketChunksAwarded: 0,

    // daily
    dayKey: todayKeyLocal(),
    daySteps: 0,
    dayMeters: 0,
    dailyGoalSteps: DAILY_GOAL_STEPS,
    dailyGoalReached: false,

    // streak { [dateKey]: true/false }
    streak: {},
    lastStreakRewardDate: null,

    // versie van daily-systeem (voor migratie)
    dailyVersion: 1,

    updatedAt: Date.now()
  };
}

/* ---------- MIGRATIE + DAG RESET ---------- */

function migrateStepsState(s) {
  const nowKey = todayKeyLocal();
  if (!s || typeof s !== 'object') return defaultSteps();

  // defensief: nummers normaliseren
  if (typeof s.steps !== 'number') s.steps = 0;
  if (typeof s.meters !== 'number') s.meters = 0;
  if (typeof s.chestMeters !== 'number') s.chestMeters = 0;
  if (typeof s.xpKmAwarded !== 'number') s.xpKmAwarded = 0;
  if (typeof s.ticketChunksAwarded !== 'number') s.ticketChunksAwarded = 0;

  // totalMeters voor lifetime XP/tickets
  if (typeof s.totalMeters !== 'number') {
    s.totalMeters = Number(s.meters || 0);
  }

  // 🔥 Nieuwe daily-logica: eerste keer alles schoon starten
  if (typeof s.dailyVersion !== 'number' || s.dailyVersion < 1) {
    s.dayKey = nowKey;
    s.daySteps = 0;
    s.dayMeters = 0;
    s.dailyGoalSteps = DAILY_GOAL_STEPS;
    s.dailyGoalReached = false;
    s.streak = {};
    s.lastStreakRewardDate = null;
    s.dailyVersion = 1;
  } else {
    if (!s.dayKey) s.dayKey = nowKey;
    if (typeof s.daySteps !== 'number') s.daySteps = 0;
    if (typeof s.dayMeters !== 'number') s.dayMeters = 0;
    if (typeof s.dailyGoalSteps !== 'number' || s.dailyGoalSteps <= 0) {
      s.dailyGoalSteps = DAILY_GOAL_STEPS;
    }
    if (typeof s.dailyGoalReached !== 'boolean') s.dailyGoalReached = false;
    if (!s.streak || typeof s.streak !== 'object') s.streak = {};
    if (typeof s.lastStreakRewardDate !== 'string') s.lastStreakRewardDate = null;
  }

  return s;
}

function saveSteps(s) {
  s.updatedAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify(s));
}

// 7-dagen streak reward
function maybeRewardStreak(s, lastDayKey) {
  if (!lastDayKey) return;

  const keys = getLastNDates(lastDayKey, STREAK_LENGTH);
  if (!keys.length) return;

  const allFilled = keys.every(k => !!s.streak[k]);
  if (!allFilled) return;

  if (s.lastStreakRewardDate === lastDayKey) return;

  addCbsCoins(STREAK_REWARD_CBS);
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', {}));

  s.lastStreakRewardDate = lastDayKey;

  window.dispatchEvent(new CustomEvent('cbsgo:streakReward', {
    detail: {
      days: STREAK_LENGTH,
      rewardCbs: STREAK_REWARD_CBS,
      lastDayKey
    }
  }));
}

// Dag wisselen + vorige dag vastleggen
function ensureDay(s) {
  s = migrateStepsState(s || defaultSteps());

  const today = todayKeyLocal();

  if (s.dayKey !== today) {
    const prevKey = s.dayKey;

    if (prevKey) {
      if (!s.streak) s.streak = {};
      s.streak[prevKey] = !!s.dailyGoalReached;
      maybeRewardStreak(s, prevKey);
    }

    s.dayKey = today;
    s.daySteps = 0;
    s.dayMeters = 0;
    s.dailyGoalReached = false;

    saveSteps(s);
  }

  return s;
}

export function loadSteps() {
  const raw = localStorage.getItem(KEY);
  const parsed = safeParse(raw, defaultSteps());
  return ensureDay(parsed);
}

/* ---------- UI HELPERS/EVENTS ---------- */

function notifyStepsChanged() {
  window.dispatchEvent(
    new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
  );
}

function notifyXpChanged() {
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', {}));
}

function notifyInventoryChanged() {
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', {}));
}

// aantal stappen VANDAAG (voor UI)
export function getSteps() {
  const s = loadSteps();
  return Number(s.daySteps != null ? s.daySteps : s.steps || 0);
}

// afstand in meters VANDAAG (voor UI / xpBar)
export function getDistanceMeters() {
  const s = loadSteps();
  const m = (s.dayMeters != null ? s.dayMeters : s.meters || 0);
  return Number(m || 0);
}

// afstand in kilometers VANDAAG
export function getDistanceKm() {
  return getDistanceMeters() / 1000;
}

// Daily stats voor stappen-widget (sterren)
export function getDailyStats() {
  const s = loadSteps();

  const stepsToday = Number(s.daySteps != null ? s.daySteps : s.steps || 0);
  const goalSteps = Number(s.dailyGoalSteps || DAILY_GOAL_STEPS);
  const goalReached = !!s.dailyGoalReached;
  const today = s.dayKey || todayKeyLocal();
  const streakObj = s.streak || {};

  const keys = getLastNDates(today, STREAK_LENGTH);
  const streak = keys.map(k => {
    let reached = false;
    if (k === today) {
      reached = goalReached;
    } else {
      reached = !!streakObj[k];
    }
    return { dateKey: k, reached };
  });

  return {
    stepsToday,
    goalSteps,
    goalReached,
    streak,
    todayKey: today,
    streakLength: STREAK_LENGTH,
    rewardPerStreak: STREAK_REWARD_CBS
  };
}

export function isStepsEnabled() {
  return !!enabled;
}

export function getGpsDebug() {
  return gpsDebug;
}

/* ---------------- DAILY PUZZLE ---------------- */

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
  const durMs =
    (Number.isFinite(mins) && mins > 0 ? mins : BOOST_DURATION_MIN) *
    60 * 1000;

  const s = loadSteps();
  const now = Date.now();
  const until = now + durMs;

  s.boostUntil = Math.max(Number(s.boostUntil || 0), until);
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
  notifyInventoryChanged();

  s.boostLastStep = last + tickets * BOOST_STEP_CHUNK;
}

/* ---------------- TREASURE CHESTS ---------------- */

function applyChestProgress(s) {
  let chestMeters = Number(s.chestMeters || 0);
  if (!Number.isFinite(chestMeters)) chestMeters = 0;

  if (chestMeters < CHEST_CHUNK_M) {
    s.chestMeters = chestMeters;
    return;
  }

  let loops = 0;
  while (chestMeters >= CHEST_CHUNK_M && loops < 5) {
    chestMeters -= CHEST_CHUNK_M;
    loops += 1;

    if (Math.random() < CHEST_BASE_CHANCE) {
      const isRare = Math.random() < CHEST_RARE_CHANCE;

      const xp = isRare ? 10 : 3;
      const tickets = isRare ? 2 : 1;

      addXp(xp);
      notifyXpChanged();

      addTickets(tickets);
      notifyInventoryChanged();

      const hasCBSFlag = isRare && (Math.random() < CBS_FLAG_CHANCE);

      window.dispatchEvent(new CustomEvent('cbsgo:treasureFound', {
        detail: { xp, tickets, rare: isRare, hasCBSFlag }
      }));

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

// distance rewards (lifetime)
function applyRewards(s) {
  const totalMeters = Number(
    (s.totalMeters != null ? s.totalMeters : s.meters) || 0
  );
  if (!Number.isFinite(totalMeters) || totalMeters <= 0) return;

  const totalKm = Math.floor(totalMeters / 1000);
  const prevKmAwarded = Number(s.xpKmAwarded || 0);
  if (totalKm > prevKmAwarded) {
    const deltaKm = totalKm - prevKmAwarded;
    if (deltaKm > 0) {
      addXp(deltaKm);
      notifyXpChanged();
      s.xpKmAwarded = totalKm;
    }
  }

  const TICKET_CHUNK_M = 2500;
  const totalTicketChunks = Math.floor(totalMeters / TICKET_CHUNK_M);
  const prevTicketChunksAwarded = Number(s.ticketChunksAwarded || 0);
  if (totalTicketChunks > prevTicketChunksAwarded) {
    const deltaChunks = totalTicketChunks - prevTicketChunksAwarded;
    if (deltaChunks > 0) {
      addTickets(deltaChunks);
      notifyInventoryChanged();
      s.ticketChunksAwarded = totalTicketChunks;
    }
  }
}

export function addMeters(meters) {
  const m = Number(meters || 0);
  if (!Number.isFinite(m) || m <= 0) return loadSteps();

  const s = loadSteps();

  // lifetime
  s.totalMeters = Number(s.totalMeters || 0) + m;
  s.meters = Number(s.meters || 0) + m;

  // dagelijks
  s.dayMeters = Number(s.dayMeters || 0) + m;
  s.chestMeters = Number(s.chestMeters || 0) + m;

  const prevStepsLifetime = Number(s.steps || 0);
  const nextStepsLifetime = Math.floor((s.meters || 0) / METERS_PER_STEP);

  if (nextStepsLifetime > prevStepsLifetime) {
    const delta = nextStepsLifetime - prevStepsLifetime;
    s.steps = nextStepsLifetime;
    s.daySteps = Number(s.daySteps || 0) + delta;
  }

  // daily goal check
  if (!s.dailyGoalReached &&
      s.daySteps >= (s.dailyGoalSteps || DAILY_GOAL_STEPS)) {
    s.dailyGoalReached = true;

    window.dispatchEvent(new CustomEvent('cbsgo:dailyGoalReached', {
      detail: {
        dayKey: s.dayKey || todayKeyLocal(),
        steps: s.daySteps,
        goal: s.dailyGoalSteps || DAILY_GOAL_STEPS
      }
    }));
  }

  applyRewards(s);
  applyBoostTickets(s);
  applyChestProgress(s);

  saveSteps(s);
  notifyStepsChanged();
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
  notifyStepsChanged();
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

        s.lastPos = { lat, lng, t: now };
        saveSteps(s);

        const heading = Number.isFinite(pos.coords.heading) ? pos.coords.heading : null;
        const speedGps = Number.isFinite(pos.coords.speed) ? pos.coords.speed : null;

        window.dispatchEvent(new CustomEvent('cbsgo:playerPos', {
          detail: { lat, lng, acc, heading, speed: speedGps, t: now }
        }));

        if (acc > MAX_ACCEPTED_ACCURACY_M) {
          gpsDebug = {
            lat, lng, acc, t: now,
            reason: 'accuracy',
            boostMs: getTicketBoostRemainingMs()
          };
          notifyStepsChanged();
          return;
        }

        triggerDailyPuzzle(lat, lng);

        let dist = 0;
        let dt = 0;
        let speed = 0;
        let added = 0;
        let reason = 'no-last';

        if (last && typeof last.lat === 'number' &&
            typeof last.lng === 'number' &&
            typeof last.t === 'number') {

          dist = metersBetween({ lat: last.lat, lng: last.lng }, { lat, lng });
          dt = Math.max(1, (now - last.t) / 1000);
          speed = dist / dt;

          if (dist < MIN_DIST_M) {
            reason = 'jitter';
          } else if (dist > MAX_DIST_M) {
            reason = 'teleport';
          } else if (speed > MAX_SPEED_MPS) {
            reason = 'too-fast';
          } else {
            addMeters(dist);
            added = dist;
            reason = 'ok';
          }
        }

        gpsDebug = {
          lat, lng, acc, t: now,
          dist: Math.round(dist),
          dt: Math.round(dt),
          speed: Number.isFinite(speed) ? Number(speed.toFixed(2)) : 0,
          added: Math.round(added),
          reason,
          boostMs: getTicketBoostRemainingMs()
        };

        notifyStepsChanged();
      },
      (err) => {
        enabled = false;
        gpsDebug = { err: err?.message || 'GPS blocked', t: Date.now() };
        if (!silent) {
          // handled by tryAutoStart()
        }
        notifyStepsChanged();
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

  attempt();

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

/* ---------------- LOOT REWARD LISTENER ---------------- */

if (!window.__cbsgo_loot_reward_listener_v1) {
  window.__cbsgo_loot_reward_listener_v1 = true;

  window.addEventListener('cbsgo:lootReward', (ev) => {
    const d = ev?.detail || {};
    const xp = Number(d.xp || 0);
    const tickets = Number(d.tickets || 0);
    const cbs = Number(d.cbs || 0);

    if (xp > 0) {
      addXp(xp);
      notifyXpChanged();
    }
    if (tickets > 0 || cbs > 0) {
      if (tickets > 0) addTickets(tickets);
      if (cbs > 0) addCbsCoins(cbs);
      notifyInventoryChanged();
    }
  });
}
