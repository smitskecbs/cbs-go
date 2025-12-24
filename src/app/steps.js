// src/app/steps.js
// GPS distance -> steps (stable) + rewards
// Autostart + "first tap" fallback (for browsers that require a user gesture)

import { addXp } from './state.js';
import { addTickets } from './inventory.js';

const KEY = 'cbsgo_steps_v4';
const AUTOSTART_KEY = 'cbsgo_gps_autostart_v2';

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

export function getSteps() {
  return Number(loadSteps().steps || 0);
}

export function isStepsEnabled() {
  return !!enabled;
}

export function getGpsDebug() {
  return gpsDebug;
}

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
  // Rules:
  // - 5,000 steps => +20 XP (once)
  // - 10,000 steps => +1 ticket (once)
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

  // Estimate: 1 step ~ 0.75m (simple + stable)
  const nextSteps = Math.floor((s.meters || 0) / 0.75);
  if (nextSteps > s.steps) s.steps = nextSteps;

  applyRewards(s);
  saveSteps(s);

  window.dispatchEvent(
    new CustomEvent('cbsgo:stepsChanged', { detail: { steps: s.steps } })
  );
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
  try {
    localStorage.setItem(AUTOSTART_KEY, '0');
  } catch {}
  window.dispatchEvent(
    new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
  );
}

export async function enableSteps(opts = {}) {
  // opts.silent = true => fail quietly
  const silent = !!opts.silent;

  if (!navigator.geolocation) {
    gpsDebug = { err: 'GPS not supported', t: Date.now() };
    return { ok: false, reason: 'GPS not supported' };
  }

  try {
    localStorage.setItem(AUTOSTART_KEY, '1');
  } catch {}

  clearWatch();
  enabled = true;
  gpsDebug = { msg: 'requesting', t: Date.now() };

  // Indoor/outdoor GPS can be noisy
  const MAX_ACCEPTED_ACCURACY_M = 200;

  // Movement sanity rules (fix for “big jump ignored” on mobile)
  const MIN_DIST_M = 1.5;     // ignore micro jitter
  const MAX_DIST_M = 250;     // reject huge teleports
  const MAX_SPEED_MPS = 3.2;  // ~11.5 km/h (fast walk/jog)

  try {
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy || 999;
        const now = Date.now();

        const s = loadSteps();
        const last = s.lastPos;

        // If accuracy is bad, update lastPos but don’t count steps yet
        if (acc > MAX_ACCEPTED_ACCURACY_M) {
          s.lastPos = { lat, lng, t: now };
          saveSteps(s);

          gpsDebug = { lat, lng, acc, t: now, reason: 'accuracy' };
          window.dispatchEvent(
            new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
          );
          return;
        }

        let reason = 'no-last';
        let dist = 0;
        let dt = 0;
        let speed = 0;
        let added = 0;

        if (
          last &&
          typeof last.lat === 'number' &&
          typeof last.lng === 'number' &&
          typeof last.t === 'number'
        ) {
          dist = metersBetween(
            { lat: last.lat, lng: last.lng },
            { lat, lng }
          );

          dt = Math.max(1, (now - last.t) / 1000); // seconds
          speed = dist / dt; // m/s

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

        // Update lastPos AFTER processing so we measure from previous point
        s.lastPos = { lat, lng, t: now };
        saveSteps(s);

        gpsDebug = {
          lat,
          lng,
          acc,
          t: now,
          dist: Math.round(dist),
          dt: Math.round(dt),
          speed: Number(speed.toFixed(2)),
          added: Math.round(added),
          reason
        };

        window.dispatchEvent(
          new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
        );
      },
      (err) => {
        enabled = false;
        gpsDebug = { err: err?.message || 'GPS blocked', t: Date.now() };
        if (!silent) {
          // some browsers require a user gesture; we handle this in tryAutoStart()
        }
        window.dispatchEvent(
          new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
        );
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

export function shouldAutoStart() {
  try {
    return localStorage.getItem(AUTOSTART_KEY) === '1';
  } catch {
    return false;
  }
}

// ✅ auto-start + first-tap fallback
export function tryAutoStart() {
  // avoid multiple installs
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
