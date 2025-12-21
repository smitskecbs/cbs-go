// Local leaderboard v2 (no backend yet)
// - Stores: name + avatar (dataURL) + xp + level
// - Reads XP/Level from cbsgo_state_v1 so it stays compatible with state.js

const LB_KEY = 'cbsgo_leaderboard_v2';
const NAME_KEY = 'cbsgo_player_name_v1';
const AVATAR_KEY = 'cbsgo_player_avatar_v1';
const STATE_KEY = 'cbsgo_state_v1';

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const data = JSON.parse(raw);
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function randomName() {
  const a = ['Sovereign','Builder','Runner','Scout','Mapper','Guardian','Wanderer','Cipher'];
  const b = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `${a[Math.floor(Math.random() * a.length)]}-${b}`;
}

export function getPlayerName() {
  let name = '';
  try { name = localStorage.getItem(NAME_KEY) || ''; } catch {}
  if (!name) {
    name = randomName();
    try { localStorage.setItem(NAME_KEY, name); } catch {}
  }
  return name;
}

export function setPlayerName(name) {
  const clean = String(name || '').trim().slice(0, 24);
  if (!clean) return getPlayerName();
  try { localStorage.setItem(NAME_KEY, clean); } catch {}
  return clean;
}

export function getPlayerAvatar() {
  try {
    return localStorage.getItem(AVATAR_KEY) || '';
  } catch {
    return '';
  }
}

export function setPlayerAvatar(dataUrl) {
  const v = String(dataUrl || '');
  try { localStorage.setItem(AVATAR_KEY, v); } catch {}
  return v;
}

export function clearPlayerAvatar() {
  try { localStorage.removeItem(AVATAR_KEY); } catch {}
}

function readXpLevel() {
  const s = loadJson(STATE_KEY, {});
  const xp = Number(s?.xp ?? 0);
  const level = Number(s?.level ?? 1);
  return {
    xp: Number.isFinite(xp) ? xp : 0,
    level: Number.isFinite(level) ? level : 1
  };
}

function normalizeList(raw) {
  const arr = Array.isArray(raw) ? raw : [];
  // Accept older shapes and normalize
  return arr
    .map(e => ({
      name: String(e?.name ?? '').slice(0, 24),
      xp: Number(e?.xp ?? 0) || 0,
      level: Number(e?.level ?? 1) || 1,
      avatar: String(e?.avatar ?? ''),
      ts: Number(e?.ts ?? 0) || 0
    }))
    .filter(e => e.name.length > 0);
}

export function getTopScores(limit = 10) {
  const list = normalizeList(loadJson(LB_KEY, []));
  list.sort((x, y) => (y.xp - x.xp) || (y.level - x.level) || (y.ts - x.ts));
  return list.slice(0, limit);
}

export function submitMyScore() {
  const { xp, level } = readXpLevel();
  const name = getPlayerName();
  const avatar = getPlayerAvatar();

  const entry = { name, xp, level, avatar, ts: Date.now() };

  const list = normalizeList(loadJson(LB_KEY, []));
  const idx = list.findIndex(e => e.name === name);

  if (idx >= 0) {
    // Keep best XP; always refresh avatar + timestamp if improved
    if (entry.xp >= Number(list[idx]?.xp ?? 0)) {
      list[idx] = entry;
    } else {
      // still update avatar if changed
      if (avatar && avatar !== list[idx].avatar) {
        list[idx] = { ...list[idx], avatar, ts: Date.now() };
      }
    }
  } else {
    list.push(entry);
  }

  list.sort((x, y) => (y.xp - x.xp) || (y.level - x.level) || (y.ts - x.ts));
  saveJson(LB_KEY, list.slice(0, 50));

  return entry;
}
