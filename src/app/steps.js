// src/app/steps.js
// GPS distance -> estimated steps (Android friendly) with HARD anti-jitter filters
// XP is awarded ONLY per 10,000 steps milestone.
// Emits window events so UI/map can react.
//
// Events:
//  - cbsgo:stepsUpdate   detail: state
//  - cbsgo:stepsMilestone detail: { totalSteps, milestone, awardedXp }

import { addXp } from './state.js';

// ----- config (tune later) -----
const CFG = {
  // Ignore bad GPS
  maxAccuracyM: 35,          // if accuracy worse than this -> ignore sample
  // Ignore micro-jitter
  minMoveDistanceM: 8,       // must move at least this distance between accepted points
  minSpeedMS: 0.4,           // must be moving (roughly walking)
  // Steps conversion
  metersPerStep: 0.78,       // average walking step length (tune later)
  // XP milestone
  stepsPerMilestone: 10000,
  xpPerMilestone: 250,
  // Ticket drops later
  ticketsPerMilestone: 3,    // we’ll use this in the next step
};

// ----- state -----
const STORAGE_KEY = 'cbsgo_steps_v1';

let watchId = null;

let state = load() || {
  enabled: false,
  gpsStatus: 'DISABLED', // DISABLED | ENABLED | ERROR
  lastUpdateTs: 0,

  totalSteps: 0,
  totalMeters: 0,

  // last accepted GPS sample
  lastLat: null,
  lastLng: null,
  lastTs: null,
};

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

function now() {
  return Date.now();
}

function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function getSpeedMS(pos) {
  // pos.coords.speed can be null on some Androids; we estimate if needed
  const s = pos?.coords?.speed;
  if (Number.isFinite(s)) return s;

  // estimate from last accepted point (only if we have last)
  if (state.lastLat == null || state.lastLng == null || state.lastTs == null) return null;

  const dt = (pos.timestamp || now()) - state.lastTs;
  if (dt <= 0) return null;

  const d = haversineMeters(state.lastLat, state.lastLng, pos.coords.latitude, pos.coords.longitude);
  return d / (dt / 1000);
}

function shouldAccept(pos) {
  const acc = pos?.coords?.accuracy;
  if (!Number.isFinite(acc) || acc > CFG.maxAccuracyM) return false;

  if (state.lastLat == null || state.lastLng == null) return true;

  const d = haversineMeters(state.lastLat, state.lastLng, pos.coords.latitude, pos.coords.longitude);
  if (d < CFG.minMoveDistanceM) return false;

  const speed = getSpeedMS(pos);
  // If speed missing, we still allow big moves; but for small moves, require speed
  if (speed == null) return d >= (CFG.minMoveDistanceM * 2);
  if (speed < CFG.minSpeedMS) return false;

  return true;
}

function applySample(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const ts = pos.timestamp || now();

  let addedMeters = 0;

  if (state.lastLat != null && state.lastLng != null) {
    addedMeters = haversineMeters(state.lastLat, state.lastLng, lat, lng);
  }

  state.lastLat = lat;
  state.lastLng = lng;
  state.lastTs = ts;

  // convert meters -> steps
  if (addedMeters > 0) {
    state.totalMeters += addedMeters;
    const addedSteps = Math.floor(addedMeters / CFG.metersPerStep);
    if (addedSteps > 0) {
      const before = state.totalSteps;
      state.totalSteps += addedSteps;

      // milestone check
      const beforeMilestone = Math.floor(before / CFG.stepsPerMilestone);
      const afterMilestone = Math.floor(state.totalSteps / CFG.stepsPerMilestone);

      if (afterMilestone > beforeMilestone) {
        // award for each milestone passed (in case of big jumps)
        for (let m = beforeMilestone + 1; m <= afterMilestone; m++) {
          addXp(CFG.xpPerMilestone);
          emit('cbsgo:stepsMilestone', {
            totalSteps: state.totalSteps,
            milestone: m,
            awardedXp: CFG.xpPerMilestone,
          });
        }
      }
    }
  }

  state.lastUpdateTs = now();
  save();
  emit('cbsgo:stepsUpdate', { ...state });
}

function onPosition(pos) {
  state.gpsStatus = 'ENABLED';
  state.enabled = true;

  if (!shouldAccept(pos)) {
    // still update "lastUpdateTs" for UI to show it's alive
    state.lastUpdateTs = now();
    save();
    emit('cbsgo:stepsUpdate', { ...state });
    return;
  }

  applySample(pos);
}

function onError(err) {
  state.gpsStatus = 'ERROR';
  state.enabled = false;
  state.lastUpdateTs = now();
  save();
  emit('cbsgo:stepsUpdate', { ...state });

  console.warn('[steps] GPS error', err);
}

export function getStepsState() {
  return { ...state };
}

export function resetSteps() {
  state = {
    enabled: false,
    gpsStatus: 'DISABLED',
    lastUpdateTs: 0,
    totalSteps: 0,
    totalMeters: 0,
    lastLat: null,
    lastLng: null,
    lastTs: null,
  };
  save();
  emit('cbsgo:stepsUpdate', { ...state });
}

export function startGpsSteps() {
  if (!('geolocation' in navigator)) {
    state.gpsStatus = 'ERROR';
    state.enabled = false;
    save();
    emit('cbsgo:stepsUpdate', { ...state });
    throw new Error('Geolocation not supported');
  }

  // already running
  if (watchId != null) return;

  state.enabled = true;
  state.gpsStatus = 'ENABLED';
  state.lastUpdateTs = now();
  save();
  emit('cbsgo:stepsUpdate', { ...state });

  watchId = navigator.geolocation.watchPosition(onPosition, onError, {
    enableHighAccuracy: true,
    maximumAge: 2000,
    timeout: 15000,
  });
}

export function stopGpsSteps() {
  if (watchId != null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  state.enabled = false;
  state.gpsStatus = 'DISABLED';
  state.lastUpdateTs = now();
  save();
  emit('cbsgo:stepsUpdate', { ...state });
}
