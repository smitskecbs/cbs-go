// src/app/steps.js
// GPS distance -> steps + rewards
// Daily puzzle trigger + 1h glow ticket boost

import { addXp } from './state.js';
import { addTickets } from './inventory.js';

const KEY = 'cbsgo_steps_v5';
const AUTOSTART_KEY = 'cbsgo_gps_autostart_v2';
const DAILY_PUZZLE_KEY = 'cbsgo_daily_puzzle_v1';

// Glow boost config
const BOOST_DURATION_MIN = 60;
const BOOST_STEP_CHUNK = 1500;

let watchId = null;
let enabled = false;
let gpsDebug = {};

function defaultSteps() {
  return {
    steps: 0,
    meters: 0,
    lastPos: null,
    rewarded5k: false,
    rewarded10k: false,
    boostUntil: 0,
    boostLastStep: 0
  };
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || defaultSteps();
  } catch {
    return defaultSteps();
  }
}

function save(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function getSteps() {
  return load().steps || 0;
}

export function getGpsDebug() {
  return gpsDebug;
}

export function isStepsEnabled() {
  return enabled;
}

/* ---------------- DAILY PUZZLE ---------------- */

function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function dailyShown() {
  return localStorage.getItem(DAILY_PUZZLE_KEY) === todayKey();
}

function markDailyShown() {
  localStorage.setItem(DAILY_PUZZLE_KEY, todayKey());
}

function triggerDailyPuzzle(lat, lng) {
  if (dailyShown()) return;
  window.dispatchEvent(
    new CustomEvent('cbsgo:dailyPuzzle', {
      detail: { lat, lng, date: todayKey() }
    })
  );
  markDailyShown();
}

/* ---------------- GLOW BOOST ---------------- */

export function activateTicketBoost(minutes = BOOST_DURATION_MIN) {
  const s = load();
  const now = Date.now();
  const until = now + minutes * 60 * 1000;

  s.boostUntil = Math.max(s.boostUntil || 0, until);
  s.boostLastStep = s.steps;
  save(s);
}

function applyBoost(s) {
  if (!s.boostUntil || Date.now() > s.boostUntil) return;

  const delta = s.steps - (s.boostLastStep || 0);
  if (delta >= BOOST_STEP_CHUNK) {
    const tickets = Math.floor(delta / BOOST_STEP_CHUNK);
    addTickets(tickets);
    s.boostLastStep += tickets * BOOST_STEP_CHUNK;
  }
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

function addMeters(m) {
  const s = load();
  s.meters += m;
  const nextSteps = Math.floor(s.meters / 0.75);
  if (nextSteps > s.steps) s.steps = nextSteps;

  if (!s.rewarded5k && s.steps >= 5000) {
    s.rewarded5k = true;
    addXp(20);
  }
  if (!s.rewarded10k && s.steps >= 10000) {
    s.rewarded10k = true;
    addTickets(1);
  }

  applyBoost(s);
  save(s);

  window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged'));
}

export async function enableSteps() {
  if (!navigator.geolocation) return;

  enabled = true;

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const acc = pos.coords.accuracy || 999;
      const now = Date.now();

      gpsDebug = { lat, lng, acc };

      const s = load();
      if (acc > 200) {
        s.lastPos = { lat, lng, t: now };
        save(s);
        return;
      }

      triggerDailyPuzzle(lat, lng);

      if (s.lastPos) {
        const dist = metersBetween(s.lastPos, { lat, lng });
        const dt = (now - s.lastPos.t) / 1000;
        const speed = dist / dt;

        if (dist > 1.5 && dist < 250 && speed < 3.2) {
          addMeters(dist);
        }
      }

      s.lastPos = { lat, lng, t: now };
      save(s);
    },
    () => (enabled = false),
    { enableHighAccuracy: true, maximumAge: 1000 }
  );
}
