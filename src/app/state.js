// src/app/state.js
// Single source of truth for:
// - XP + levels
// - completed nodes
// Exports used across UI: getXp/getLevel/getXpIntoLevel/addXp/isNodeCompleted/completeNode

import { requireGameplayAllowed } from './playerNickname.js';

const KEY = 'cbsgo_state_v6';

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

function defaultState() {
  return {
    xp: 0,
    completed: {}, // { [nodeId]: timestamp }
    updatedAt: Date.now(),
  };
}

function load() {
  const raw = localStorage.getItem(KEY);
  return safeParse(raw, defaultState());
}

function save(s) {
  s.updatedAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify(s));
}

/* ---------- XP / LEVEL ---------- */

function xpNeededForLevel(level) {
  const L = Math.max(1, Number(level || 1));
  return 100 + (L - 1) * 40;
}

export function getXp() {
  return Number(load().xp || 0);
}

export function getLevel() {
  const xp = getXp();
  let lvl = 1;
  let remaining = xp;

  while (true) {
    const need = xpNeededForLevel(lvl);
    if (remaining < need) break;
    remaining -= need;
    lvl += 1;
    if (lvl > 999) break;
  }
  return lvl;
}

export function getXpIntoLevel() {
  const xp = getXp();
  let lvl = 1;
  let remaining = xp;

  while (true) {
    const need = xpNeededForLevel(lvl);
    if (remaining < need) break;
    remaining -= need;
    lvl += 1;
    if (lvl > 999) break;
  }
  return remaining;
}

export function getXpNeededThisLevel() {
  return xpNeededForLevel(getLevel());
}

export function addXp(amount) {
  const a = Number(amount || 0);
  if (!Number.isFinite(a) || a <= 0) return load();
  if (!requireGameplayAllowed()) return load();

  const beforeLevel = getLevel();

  const s = load();
  s.xp = Number(s.xp || 0) + a;
  save(s);

  const afterLevel = getLevel();

  window.dispatchEvent(
    new CustomEvent('cbsgo:xpChanged', {
      detail: { xp: s.xp, level: afterLevel },
    }),
  );

  if (afterLevel > beforeLevel) {
    window.dispatchEvent(
      new CustomEvent('cbsgo:levelUp', {
        detail: { from: beforeLevel, to: afterLevel, xp: s.xp },
      }),
    );

    window.dispatchEvent(
      new CustomEvent('cbsgo:levelChanged', {
        detail: { level: afterLevel, xp: s.xp },
      }),
    );
  }

  return s;
}

/**
 * ✅ NIEUW: zet XP hard (voor remote sync na email login)
 * @param {number} totalXp
 */
export function setXp(totalXp) {
  const x = Number(totalXp || 0);
  const safeXp = Number.isFinite(x) && x >= 0 ? x : 0;

  const beforeLevel = getLevel();

  const s = load();
  s.xp = safeXp;
  save(s);

  const afterLevel = getLevel();

  window.dispatchEvent(
    new CustomEvent('cbsgo:xpChanged', {
      detail: { xp: s.xp, level: afterLevel },
    }),
  );

  if (afterLevel > beforeLevel) {
    window.dispatchEvent(
      new CustomEvent('cbsgo:levelUp', {
        detail: { from: beforeLevel, to: afterLevel, xp: s.xp },
      }),
    );
    window.dispatchEvent(
      new CustomEvent('cbsgo:levelChanged', {
        detail: { level: afterLevel, xp: s.xp },
      }),
    );
  }

  return s;
}

/* ---------- COMPLETION ---------- */

export function isNodeCompleted(nodeId) {
  const id = String(nodeId || '');
  if (!id) return false;
  const s = load();
  return !!(s.completed && s.completed[id]);
}

export function completeNode(nodeId) {
  const id = String(nodeId || '');
  if (!id) return;
  if (!requireGameplayAllowed()) return;

  const s = load();
  if (!s.completed) s.completed = {};
  s.completed[id] = Date.now();
  save(s);

  window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id } }));
}

export function getCompletedMap() {
  return load().completed || {};
}

export function hardResetState() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: 0, level: 1 } }));
}
