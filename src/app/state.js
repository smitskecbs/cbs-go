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
 * ✅ Backward-compat: old modules import isCompleted()
 * Keep forever so older UI files don't break.
 */
export function isCompleted(nodeId) {
  return isNodeCompleted(nodeId);
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

/**
 * ✅ Used by puzzleModal:
 * Complete node once and award XP.
 * Accepts multiple ids (primary + legacy) and locks them all at once.
 * Returns { ok:boolean, reason?:string }
 */
export function completeNodeAndAwardXp(ids, rewardXp) {
  const list = Array.isArray(ids)
    ? ids.map(x => String(x || '').trim()).filter(Boolean)
    : [String(ids || '').trim()].filter(Boolean);

  if (list.length === 0) return { ok: false, reason: 'no_id' };

  // already completed?
  if (list.some(id => isNodeCompleted(id))) {
    return { ok: false, reason: 'already_completed' };
  }

  // mark all ids completed
  list.forEach(id => markNodeCompleted(id));

  const xp = Number(rewardXp || 0);
  if (Number.isFinite(xp) && xp > 0) addXp(xp);

  // let map/UI refresh (pins disappear etc.)
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap'));
  return { ok: true };
}

export function hardResetState() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: 0, delta: 0 } }));
  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id: null } }));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap'));
}
