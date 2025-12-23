// src/app/state.js
const KEY = 'cbsgo_state_v4';

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
    return safeParse(localStorage.getItem(KEY), defaultState());
  } catch {
    return defaultState();
  }
}

export function saveState(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function getXp() {
  return Number(loadState().xp || 0);
}

function markCompletedInternal(s, ids) {
  let changed = false;
  ids.forEach((id) => {
    const k = String(id || '');
    if (!k) return;
    if (!s.completed[k]) {
      s.completed[k] = Date.now();
      changed = true;
    }
  });
  return changed;
}

export function isNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;
  const s = loadState();
  return !!s.completed?.[id];
}

// ✅ Atomic + alias support: pass both ids (primary + legacy) if you have them
export function completeNodeAndAwardXp(nodeIds, amount) {
  const ids = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
  const cleanIds = ids.map(x => String(x || '')).filter(Boolean);

  const a = Number(amount || 0);
  if (cleanIds.length === 0) return { ok: false, reason: 'no_id', xp: getXp() };
  if (!Number.isFinite(a) || a <= 0) return { ok: false, reason: 'bad_amount', xp: getXp() };

  const s = loadState();

  // already completed? if ANY id is completed, treat as completed
  if (cleanIds.some(id => !!s.completed?.[id])) {
    return { ok: false, reason: 'already_completed', xp: Number(s.xp || 0) };
  }

  // mark all ids completed + award XP once
  markCompletedInternal(s, cleanIds);
  s.xp = Number(s.xp || 0) + a;

  saveState(s);

  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: s.xp } }));
  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id: cleanIds[0] } }));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap', { detail: { id: cleanIds[0] } }));

  return { ok: true, reason: 'awarded', xp: s.xp };
}

// Level system
export function getLevel(xp) {
  const x = Math.max(0, Number(xp) || 0);
  return Math.floor(x / 100) + 1;
}
export function getXpIntoLevel(xp) {
  const x = Math.max(0, Number(xp) || 0);
  return x % 100;
}

export function hardResetState() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: 0 } }));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap' }));
}
