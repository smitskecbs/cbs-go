// src/app/state.js
// Single source of truth for:
// - XP + levels
// - completed nodes
// Exports used across UI: getXp/getLevel/getXpIntoLevel/addXp/isNodeCompleted/completeNode

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
    updatedAt: Date.now()
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

// Simple curve: each level needs more XP.
// You can tweak later without breaking callers.
function xpNeededForLevel(level) {
  const L = Math.max(1, Number(level || 1));
  // Level 1->2: 100, 2->3: 140, 3->4: 180, ...
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

// ✅ Needed by xpBar.js build
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
  return remaining; // xp progress inside current level
}

export function getXpNeededThisLevel() {
  return xpNeededForLevel(getLevel());
}

export function addXp(amount) {
  const a = Number(amount || 0);
  if (!Number.isFinite(a) || a <= 0) return load();

  // 🔹 Level vóór de update
  const beforeLevel = getLevel();

  const s = load();
  s.xp = Number(s.xp || 0) + a;
  save(s);

  // 🔹 Level ná de update
  const afterLevel = getLevel();

  // XP event (zoals je al had)
  window.dispatchEvent(
    new CustomEvent('cbsgo:xpChanged', {
      detail: { xp: s.xp, level: afterLevel }
    })
  );

  // 🔔 Nieuw: los level-up event als je level gestegen is
  if (afterLevel > beforeLevel) {
    window.dispatchEvent(
      new CustomEvent('cbsgo:levelUp', {
        detail: {
          from: beforeLevel,
          to: afterLevel,
          xp: s.xp
        }
      })
    );

    // (optioneel, als je ooit nog iets met cbsgo:levelChanged wilt)
    window.dispatchEvent(
      new CustomEvent('cbsgo:levelChanged', {
        detail: { level: afterLevel, xp: s.xp }
      })
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

// ✅ Needed by puzzleModal.js build
export function completeNode(nodeId) {
  const id = String(nodeId || '');
  if (!id) return;

  const s = load();
  if (!s.completed) s.completed = {};
  s.completed[id] = Date.now();
  save(s);

  window.dispatchEvent(
    new CustomEvent('cbsgo:nodeCompleted', { detail: { id } })
  );
}

// Optional helper (handig later)
export function getCompletedMap() {
  return load().completed || {};
}

// Used by your dev reset button
export function hardResetState() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(
    new CustomEvent('cbsgo:xpChanged', { detail: { xp: 0, level: 1 } })
  );
}
