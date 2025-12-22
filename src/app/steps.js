// src/app/steps.js
// GPS-based "steps" estimator + tickets
// Fix: ignores GPS jitter (accuracy filter + minimum distance threshold)
// XP: only rewards at 10,000-step milestones (as you requested)

import * as State from './state.js';

const STEPS_KEY = 'cbsgo_steps_v1';
const TICKETS_KEY = 'cbsgo_tickets_v1';
const LAST_MILESTONE_KEY = 'cbsgo_last_10k_milestone_v1';
const GPS_DEBUG_KEY = 'cbsgo_gps_debug_v1';

let enabled = false;
let watchId = null;

let lastPos = null;         // { lat, lng, acc, t }
let distCarry = 0;          // meters that didn't make a full "step" yet

// Tuning (safe defaults)
const STEP_LENGTH_M = 0.78;       // average step length
const MAX_ACC_M = 35;             // ignore GPS fixes worse than 35m accuracy
const MIN_MOVE_M = 8;             // ignore tiny jumps < 8m (jitter filter)
const MAX_JUMP_M = 120;           // ignore insane jumps (gps spikes)
const XP_PER_10K = 500;           // reward per 10,000 steps

function readNum(key, fallback = 0) {
  try {
    const v = Number(localStorage.getItem(key));
    return Number.isFinite(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

function writeNum(key, n) {
  try {
    localStorage.setItem(key, String(Math.max(0, Math.floor(Number(n) || 0))));
  } catch {}
}

function writeGpsDebug(obj) {
  try {
    localStorage.setItem(GPS_DEBUG_KEY, JSON.stringify(obj));
  } catch {}
}

function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

// ---- public getters ----
export function getSteps() {
  return readNum(STEPS_KEY, 0);
}

export function getTickets() {
  return readNum(TICKETS_KEY, 0);
}

export function isStepsEnabled() {
  return enabled;
}

export function getGpsDebug() {
  try {
    return JSON.parse(localStorage.getItem(GPS_DEBUG_KEY) || 'null');
  } catch {
    return null;
  }
}

// ---- internal setters ----
function setSteps(n) {
  writeNum(STEPS_KEY, n);
  window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged'));
}

function setTickets(n) {
  writeNum(TICKETS_KEY, n);
  window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged'));
}

// ---- rewards logic ----
function maybeReward10k(stepsNow) {
  const milestone = Math.floor(stepsNow / 10000) * 10000;
  const last = readNum(LAST_MILESTONE_KEY, 0);

  if (milestone >= 10000 && milestone > last) {
    writeNum(LAST_MILESTONE_KEY, milestone);

    // Safe call (won't crash if addXP doesn't exist)
    if (typeof State.addXP === 'function') State.addXP(XP_PER_10K);

    window.dispatchEvent(
      new CustomEvent('cbsgo:milestone10k', { detail: { milestone, xp: XP_PER_10K } })
    );
  }
}

// Random tickets while walking (simple for now)
function maybeGiveTicket(stepsNow) {
  // Every 250 steps: 35% chance to get 1 ticket
  if (stepsNow > 0 && stepsNow % 250 === 0) {
    if (Math.random() < 0.35) {
      setTickets(getTickets() + 1);
      window.dispatchEvent(new CustomEvent('cbsgo:ticketFound', { detail: { count: 1 } }));
    }
  }
}

// ---- start/stop ----
export async function enableSteps() {
  if (!navigator.geolocation) {
    writeGpsDebug({ t: Date.now(), err: 'Geolocation not supported' });
    return { ok: false, reason: 'GPS not supported on this device.' };
  }

  enabled = true;
  writeGpsDebug({ t: Date.now(), msg: 'watchPosition started' });

  // Reset tracking buffers each enable
  lastPos = null;
  distCarry = 0;

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const acc = pos.coords.accuracy ?? 999;
      const t = pos.timestamp ?? Date.now();

      writeGpsDebug({ t: Date.now(), lat, lng, acc, note: 'update' });

      // Ignore very inaccurate points
      if (!Number.isFinite(acc) || acc > MAX_ACC_M) {
        window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
        return;
      }

      const curr = { lat, lng, acc, t };

      if (!lastPos) {
        lastPos = curr;
        window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
        return;
      }

      const d = haversineMeters(lastPos, curr);

      // Ignore jitter + spikes
      if (d < MIN_MOVE_M || d > MAX_JUMP_M) {
        lastPos = curr; // still advance so we don’t “stack” old point forever
        window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
        return;
      }

      lastPos = curr;

      // Convert distance to steps
      const total = distCarry + d;
      const addSteps = Math.floor(total / STEP_LENGTH_M);
      distCarry = total - addSteps * STEP_LENGTH_M;

      if (addSteps > 0) {
        const nextSteps = getSteps() + addSteps;
        setSteps(nextSteps);
        maybeGiveTicket(nextSteps);
        maybeReward10k(nextSteps);
      }

      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
    },
    (err) => {
      writeGpsDebug({ t: Date.now(), err: err?.message || 'GPS error' });
      enabled = false;
      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
    },
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    }
  );

  return { ok: true };
}

export function disableSteps() {
  if (watchId != null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
  watchId = null;
  enabled = false;
  writeGpsDebug({ t: Date.now(), msg: 'watchPosition stopped' });
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
}

// Convenience exports (if you prefer these names later)
export const startGpsSteps = enableSteps;
export const stopGpsSteps = disableSteps;

export function getStepsState() {
  return {
    enabled,
    steps: getSteps(),
    tickets: getTickets(),
    gps: getGpsDebug(),
  };
}
