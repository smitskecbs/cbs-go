// src/app/state.js
// Persistent game state (XP + completed nodes) using localStorage.
// Prevents XP farming by making node completion "write-once".

const KEY = 'cbsgo_state_v2';

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

export function addXp(amount) {
  const a = Number(amount || 0);
  if (!Number.isFinite(a) || a <= 0) return getXp();

  const s = loadState();
  s.xp = Number(s.xp || 0) + a;
  saveState(s);

  // let UI refresh XP bar + list/map if needed
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: s.xp } }));
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
 * @returns {boolean} true if it was newly completed, false if it was already completed.
 */
export function markNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;

  const s = loadState();
  if (s.completed?.[id]) return false; // already completed => block

  s.completed[id] = Date.now();
  saveState(s);

  // notify UI
  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id } }));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap', { detail: { id } }));
  return true;
}

// Optional helpers (dev reset)
export function hardResetState() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: 0 } }));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap'));
}
