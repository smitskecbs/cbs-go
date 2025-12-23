// src/app/state.js
// Single source of truth for XP + completed nodes.
// UI reads XP from here (no stale gameState object).

const KEY = 'cbsgo_state_v3';

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

function defaultState() {
  return {
    xp: 0,
    completed: {} // { [nodeId]: timestamp }
  };
}

export function loadState() {
  const raw = localStorage.getItem(KEY);
  return safeParse(raw, defaultState());
}

export function saveState(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function getXp() {
  return Number(loadState().xp || 0);
}

export function getLevel(totalXp) {
  const xp = Math.max(0, Number(totalXp || 0));
  // 100 XP per level (simple)
  return Math.floor(xp / 100) + 1;
}

export function getXpIntoLevel(totalXp) {
  const xp = Math.max(0, Number(totalXp || 0));
  return xp % 100; // 0..99
}

export function addXp(amount) {
  const a = Number(amount || 0);
  if (!Number.isFinite(a) || a <= 0) return getXp();

  const s = loadState();
  s.xp = Number(s.xp || 0) + a;
  saveState(s);

  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: s.xp, delta: a } }));
  return s.xp;
}

export function isNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;
  const s = loadState();
  return !!s.completed?.[id];
}

/**
 * Marks node completed if not already completed.
 * @returns {boolean} true if newly completed, false if already completed.
 */
export function markNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;

  const s = loadState();
  if (s.completed?.[id]) return false;

  s.completed[id] = Date.now();
  saveState(s);

  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id } }));
  return true;
}

export function hardResetState() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: 0, delta: 0 } }));
  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id: null } }));
}
