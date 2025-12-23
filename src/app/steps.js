// src/app/steps.js
// GPS distance -> steps + milestones
// - every 5,000 steps => +20 XP
// - every 10,000 steps => +1 Ticket
//
// Exports guaranteed:
// getSteps(), addMeters(dm), enableSteps(), disableSteps(), isStepsEnabled(), getGpsDebug()

import { addXp } from './state.js';
import { addTickets, getTickets } from './inventory.js';

const KEY = 'cbsgo_steps_v1';
const ENABLE_KEY = 'cbsgo_steps_enabled_v1';

const METERS_PER_STEP = 0.78;

let watchId = null;
let lastPos = null;

// keep tiny debug for UI/diagnostics
let gpsDebug = { msg: 'idle', t: 0, lat: null, lng: null, acc: null, err: null };

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
    last5kAwardAt: 0,
    last10kAwardAt: 0
  };
}

export function loadSteps() {
  const raw = localStorage.getItem(KEY);
  return safeParse(raw, defaultSteps());
}

export function saveSteps(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function getSteps() {
  return Number(loadSteps().steps || 0);
}

export function isStepsEnabled() {
  try { return localStorage.getItem(ENABLE_KEY) === '1'; } catch { return false; }
}

function setEnabled(v) {
  try { localStorage.setItem(ENABLE_KEY, v ? '1' : '0'); } catch {}
}

export function getGpsDebug() {
  return gpsDebug;
}

function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);

  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLon / 2);

  const q = s1 * s1 + Math.cos(lat1) * Math.cos(lat2) * s2 * s2;
  const c = 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q));
  return R * c;
}

export function addMeters(deltaMeters) {
  const dm = Number(deltaMeters || 0);
  if (!Number.isFinite(dm) || dm <= 0) return loadSteps();

  const s = loadSteps();
  s.meters = Number(s.meters || 0) + dm;

  const addedSteps = Math.floor(dm / METERS_PER_STEP);
  if (addedSteps > 0) s.steps = Number(s.steps || 0) + addedSteps;

  const stepsNow = Number(s.steps || 0);

  // 5k milestones -> +20 XP each
  const next5k = Math.floor(stepsNow / 5000) * 5000;
  if (next5k >= 5000 && next5k > Number(s.last5kAwardAt || 0)) {
    for (let x = Number(s.last5kAwardAt || 0) + 5000; x <= next5k; x += 5000) {
      addXp(20);
    }
    s.last5kAwardAt = next5k;
  }

  // 10k milestones -> +1 ticket each
  const next10k = Math.floor(stepsNow / 10000) * 10000;
  if (next10k >= 10000 && next10k > Number(s.last10kAwardAt || 0)) {
    for (let x = Number(s.last10kAwardAt || 0) + 10000; x <= next10k; x += 10000) {
      addTickets(1);
    }
    s.last10kAwardAt = next10k;
  }

  saveSteps(s);

  window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged', { detail: { steps: s.steps, meters: s.meters, tickets: getTickets() } }));
  return s;
}

export async function enableSteps() {
  if (!navigator.geolocation) {
    gpsDebug = { msg: 'geolocation_not_supported', t: Date.now(), lat: null, lng: null, acc: null, err: 'Geolocation not supported' };
    return { ok: false, reason: 'Geolocation not supported' };
  }

  // already running
  if (watchId != null) {
    setEnabled(true);
    gpsDebug = { ...gpsDebug, msg: 'already_enabled', t: Date.now(), err: null };
    return { ok: true };
  }

  lastPos = null;
  gpsDebug = { msg: 'starting', t: Date.now(), lat: null, lng: null, acc: null, err: null };

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;

      gpsDebug = {
        msg: 'ok',
        t: Date.now(),
        lat: latitude,
        lng: longitude,
        acc: accuracy,
        err: null
      };

      const cur = { lat: latitude, lng: longitude };

      if (!lastPos) {
        lastPos = cur;
        setEnabled(true);
        window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
        return;
      }

      const dm = haversineMeters(lastPos, cur);

      // filter GPS jitter (ignore tiny moves)
      if (dm >= 2) {
        addMeters(dm);
        lastPos = cur;
        window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
      }
    },
    (err) => {
      gpsDebug = { msg: 'error', t: Date.now(), lat: null, lng: null, acc: null, err: err?.message || String(err) };
      setEnabled(false);
      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
  );

  setEnabled(true);
  return { ok: true };
}

export function disableSteps() {
  try {
    if (watchId != null) {
      navigator.geolocation.clearWatch(watchId);
    }
  } catch {}
  watchId = null;
  lastPos = null;
  setEnabled(false);
  gpsDebug = { msg: 'disabled', t: Date.now(), lat: null, lng: null, acc: null, err: null };
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
}
