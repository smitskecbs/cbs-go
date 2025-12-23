// src/app/steps.js
// GPS distance -> steps (stable) + rewards
// Fix: never overwrite updated step state after addMeters()
// Auto-start friendly + compact debug for UI

import { addXp } from './state.js';
import { addTickets } from './inventory.js';

const KEY = 'cbsgo_steps_v5';
const AUTOSTART_KEY = 'cbsgo_gps_autostart_v2';

let watchId = null;
let enabled = false;
let gpsDebug = { msg: 'init', t: Date.now() };

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
  try { localStorage.setItem(AUTOSTART_KEY, '0'); } catch {}
  window.dispatchEvent(
    new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
  );
}

export async function enableSteps(opts = {}) {
  // opts.silent = true => do not alert, just fail quietly
  const silent = !!opts.silent;

  if (!navigator.geolocation) {
    enabled = false;
    gpsDebug = { err: 'GPS not supported', t: Date.now() };
    return { ok: false, reason: 'GPS not supported' };
  }

  try { localStorage.setItem(AUTOSTART_KEY, '1'); } catch {}

  clearWatch();
  enabled = true;
  gpsDebug = { msg: 'requesting', t: Date.now() };

  // Indoor GPS is often bad; keep threshold but not insane
  const MIN_ACCURACY_M = 100;

  try {
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy || 999;

        const now = Date.now();
        const center = { lat, lng, t: now };

        if (acc > MIN_ACCURACY_M) {
          gpsDebug = { msg: `low accuracy ${Math.round(acc)}m`, acc, t: now };
          window.dispatchEvent(
            new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
          );
          // Still store lastPos so outside becomes smooth
          const sLow = loadSteps();
          sLow.lastPos = center;
          saveSteps(sLow);
          return;
        }

        gpsDebug = { lat, lng, acc, t: now };

        // IMPORTANT FIX:
        // Never save an old 's' after addMeters(); it overwrites progress.
        let s = loadSteps();
        const last = s.lastPos;

        if (last && typeof last.lat === 'number' && typeof last.lng === 'number') {
          const dist = metersBetween(
            { lat: last.lat, lng: last.lng },
            { lat, lng }
          );

          // ignore jitter, ignore teleport
          if (dist >= 6 && dist <= 90) {
            s = addMeters(dist); // returns NEW saved state
          }
        }

        // set lastPos on the LATEST state and save
        s.lastPos = center;
        saveSteps(s);

        window.dispatchEvent(
          new CustomEvent('cbsgo:stepsChanged', { detail: { steps: s.steps } })
        );
      },
      (err) => {
        enabled = false;
        gpsDebug = { err: err?.message || 'GPS blocked', t: Date.now() };
        window.dispatchEvent(
          new CustomEvent('cbsgo:stepsChanged', { detail: { steps: getSteps() } })
        );
        if (!silent) {
          // iOS/Safari sometimes needs a user tap; we keep it quiet in silent mode
        }
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
    if (!silent) {}
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

// Convenience: try auto-start without alerts
export function tryAutoStart() {
  // If user already allowed GPS before OR browser allows auto-start
  // we just try silently.
  return enableSteps({ silent: true });
}
