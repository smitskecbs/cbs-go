// src/app/steps.js
// "Steps" from GPS distance (reliable on the web).
// Milestones:
// - every 5,000 steps => +20 XP
// - every 10,000 steps => +1 Ticket

import { addXp } from './state.js';
import { addTickets } from './inventory.js';

const KEY = 'cbsgo_steps_v1';

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
    last5kAwardAt: 0,   // last milestone step count (e.g. 5000, 10000, ...)
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

// We convert meters -> steps.
// Typical stride ~0.78m per step (adult). Adjust later if you want.
const METERS_PER_STEP = 0.78;

export function addMeters(deltaMeters) {
  const dm = Number(deltaMeters || 0);
  if (!Number.isFinite(dm) || dm <= 0) return loadSteps();

  const s = loadSteps();

  // Update total meters first
  s.meters = Number(s.meters || 0) + dm;

  // ✅ Fix: recompute steps from total meters so small GPS updates still count
  const prevSteps = Number(s.steps || 0);
  const newSteps = Math.floor(Number(s.meters || 0) / METERS_PER_STEP);
  s.steps = newSteps;

  const stepsNow = Number(s.steps || 0);
  const addedSteps = stepsNow - prevSteps; // not required, but useful for debugging

  // Milestones
  // 5k steps => +20 XP
  // 10k steps => +1 ticket

  // award 5k milestones
  const next5k = Math.floor(stepsNow / 5000) * 5000;
  if (next5k >= 5000 && next5k > Number(s.last5kAwardAt || 0)) {
    // award for each crossed milestone (in case of big jump)
    for (let x = Number(s.last5kAwardAt || 0) + 5000; x <= next5k; x += 5000) {
      addXp(20);
    }
    s.last5kAwardAt = next5k;
  }

  // award 10k milestones
  const next10k = Math.floor(stepsNow / 10000) * 10000;
  if (next10k >= 10000 && next10k > Number(s.last10kAwardAt || 0)) {
    for (let x = Number(s.last10kAwardAt || 0) + 10000; x <= next10k; x += 10000) {
      addTickets(1);
    }
    s.last10kAwardAt = next10k;
  }

  saveSteps(s);

  window.dispatchEvent(
    new CustomEvent('cbsgo:stepsChanged', {
      detail: { steps: s.steps, meters: s.meters, addedSteps }
    })
  );

  return s;
}
