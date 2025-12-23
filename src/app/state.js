// src/app/state.js
// Persistent game state (XP + completed nodes) using localStorage.
// Prevents XP farming by making node completion + XP atomic (cannot double-award).

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
  return { xp: 0, completed: {} };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    return safeParse(raw, defaultState());
  } catch {
    return defaultState();
  }
}

export function saveState(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

export function getXp() {
  return Number(loadState().xp || 0);
}

export function isNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;
  const s = loadState();
  return !!s.completed?.[id];
}

// ✅ ATOMIC: check + complete + award XP in one function
export function completeNodeAndAwardXp(nodeId, amount) {
  const id = String(nodeId || '');
  const a = Number(amount || 0);

  if (!id) return { ok: false, reason: 'no_id', xp: getXp() };
  if (!Number.isFinite(a) || a <= 0) return { ok: false, reason: 'bad_amount', xp: getXp() };

  const s = loadState();

  // already completed => block
  if (s.completed?.[id]) {
    return { ok: false, reason: 'already_completed', xp: Number(s.xp || 0) };
  }

  // mark completed + award XP
  s.completed[id] = Date.now();
  s.xp = Number(s.xp || 0) + a;

  saveState(s);

  // notify UI
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: s.xp } }));
  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id } }));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap', { detail: { id } }));

  return { ok: true, reason: 'awarded', xp: s.xp };
}

// Level system: every 100 XP => next level
export function getLevel(xp) {
  const x = Math.max(0, Number(xp) || 0);
  return Math.floor(x / 100) + 1;
}

export function getXpIntoLevel(xp) {
  const x = Math.max(0, Number(xp) || 0);
  return x % 100;
}

// Optional: dev reset
export function hardResetState() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: 0 } }));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap' }));
}
