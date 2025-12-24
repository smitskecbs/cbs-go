// src/app/state.js
// Core game state: XP/level + completed nodes
// ✅ Exports expected by UI:
// - getXp, getLevel, getXpIntoLevel
// - addXp
// - isNodeCompleted, completeNode
// - getLevelProgress (handy)
// - resetState
//
// NOTE: This file is designed to be a stable single source of truth for XP + node completion.

const KEY = 'cbsgo_state_v7';

/* ---------- Leveling model (simple, stable) ---------- */

// Total XP required to REACH a given level.
// Level 1 is 0 XP.
// Level 2 requires some XP, then it ramps gently.
function xpForLevel(level) {
  const l = Math.max(1, Number(level || 1));
  if (l <= 1) return 0;

  let sum = 0;
  for (let i = 2; i <= l; i++) {
    // per-level requirement grows slowly
    // L2: 120, L3: 160, L4: 200, ...
    sum += 80 + i * 20;
  }
  return sum;
}

function levelFromXp(xp) {
  const x = Math.max(0, Number(xp || 0));
  let level = 1;
  while (xpForLevel(level + 1) <= x) level++;
  return level;
}

/* ---------- Storage helpers ---------- */

function defaultState() {
  return {
    xp: 0,
    level: 1,
    completed: {}, // { [nodeId]: true }
    updatedAt: Date.now()
  };
}

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

export function loadState() {
  const raw = localStorage.getItem(KEY);
  return safeParse(raw, defaultState());
}

export function saveState(s) {
  s.updatedAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify(s));
}

/* ---------- Public getters ---------- */

export function getXp() {
  return Number(loadState().xp || 0);
}

export function getLevel() {
  const s = loadState();
  const xp = Number(s.xp || 0);
  const computed = levelFromXp(xp);
  const stored = Number(s.level || 1);
  return Math.max(1, stored, computed);
}

// ✅ Needed by src/ui/xpBar.js
// XP earned within the current level (0..xpNeededForNextLevel-1)
export function getXpIntoLevel() {
  const xp = getXp();
  const lvl = getLevel();
  const base = xpForLevel(lvl);
  return Math.max(0, xp - base);
}

// Optional but useful
export function getXpForNextLevel() {
  const lvl = getLevel();
  const curBase = xpForLevel(lvl);
  const nextBase = xpForLevel(lvl + 1);
  return Math.max(1, nextBase - curBase);
}

export function getLevelProgress() {
  const into = getXpIntoLevel();
  const need = getXpForNextLevel();
  return Math.max(0, Math.min(1, into / need));
}

/* ---------- XP mutation ---------- */

export function addXp(amount) {
  const a = Number(amount || 0);
  if (!Number.isFinite(a) || a <= 0) return loadState();

  const s = loadState();
  s.xp = Number(s.xp || 0) + a;

  const newLevel = levelFromXp(s.xp);
  s.level = Math.max(Number(s.level || 1), newLevel, 1);

  saveState(s);

  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', {
    detail: { xp: s.xp, level: s.level }
  }));

  return s;
}

/* ---------- Node completion ---------- */

export function isNodeCompleted(id) {
  const key = String(id || '').trim();
  if (!key) return false;
  const s = loadState();
  return !!(s.completed && s.completed[key]);
}

export function completeNode(id) {
  const key = String(id || '').trim();
  if (!key) return loadState();

  const s = loadState();
  if (!s.completed) s.completed = {};
  s.completed[key] = true;

  saveState(s);

  window.dispatchEvent(new CustomEvent('cbsgo:stateChanged', {
    detail: { type: 'nodeCompleted', id: key }
  }));

  return s;
}

/* ---------- Reset ---------- */

export function resetState() {
  const s = defaultState();
  saveState(s);

  window.dispatchEvent(new CustomEvent('cbsgo:stateChanged', {
    detail: { type: 'reset' }
  }));
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', {
    detail: { xp: s.xp, level: s.level }
  }));

  return s;
}
