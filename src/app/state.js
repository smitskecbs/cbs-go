// src/app/state.js
// Single source of truth for XP + completed nodes.
// Works on GitHub Pages (localStorage).

const XP_KEY = 'cbsgo_xp_v1';
const COMPLETED_KEY = 'cbsgo_completed_nodes_v1';

// --- helpers ---
function readNum(key, fallback = 0) {
  try {
    const n = Number(localStorage.getItem(key));
    return Number.isFinite(n) ? n : fallback;
  } catch {
    return fallback;
  }
}
function writeNum(key, n) {
  try { localStorage.setItem(key, String(Number(n) || 0)); } catch {}
}
function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// --- XP ---
export function getXp() {
  return readNum(XP_KEY, 0);
}

export function setXp(n) {
  writeNum(XP_KEY, Number(n) || 0);
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged'));
}

export function addXp(amount) {
  const a = Number(amount) || 0;
  if (a <= 0) return getXp();
  const next = getXp() + a;
  setXp(next);
  return next;
}

// Simple level curve: every 100 XP = +1 level (Level 1 starts at 0 XP)
export function getLevel() {
  const xp = getXp();
  return Math.max(1, Math.floor(xp / 100) + 1);
}

export function getXpIntoLevel() {
  const xp = getXp();
  return xp % 100;
}

export function getXpToNextLevel() {
  return 100;
}

// --- Completed nodes ---
export function getCompletedNodeIds() {
  const arr = readJson(COMPLETED_KEY, []);
  if (!Array.isArray(arr)) return [];
  // unique & string
  return Array.from(new Set(arr.map(x => String(x))));
}

export function isNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;
  return getCompletedNodeIds().includes(id);
}

export function markNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;

  const arr = getCompletedNodeIds();
  if (arr.includes(id)) return false;

  arr.push(id);
  writeJson(COMPLETED_KEY, arr);

  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id } }));
  // Map + lists can listen to this
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap'));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderNodes'));

  return true;
}

export function resetProgress() {
  try { localStorage.removeItem(XP_KEY); } catch {}
  try { localStorage.removeItem(COMPLETED_KEY); } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged'));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap'));
  window.dispatchEvent(new CustomEvent('cbsgo:rerenderNodes'));
}
