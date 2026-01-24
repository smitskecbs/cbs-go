// src/app/leaderboard.js
// Local profile storage (nickname + avatar) in this browser.
// Uses XP/level from state.js (single source of truth)

import { getXp, getLevel } from './state.js';

const KEY = 'cbsgo_leaderboard_v2';
const KEY_NAME = 'cbsgo_player_name_v2';
const KEY_AVATAR = 'cbsgo_player_avatar_v2';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJSON(key, v) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {}
}

export function getPlayerName() {
  try {
    return localStorage.getItem(KEY_NAME) || '';
  } catch {
    return '';
  }
}

export function setPlayerName(name) {
  const n = String(name || '').trim().slice(0, 24);
  try {
    if (n) localStorage.setItem(KEY_NAME, n);
    else localStorage.removeItem(KEY_NAME);
  } catch {}
  return n;
}

export function getPlayerAvatar() {
  try {
    return localStorage.getItem(KEY_AVATAR) || '';
  } catch {
    return '';
  }
}

export function setPlayerAvatar(dataUrl) {
  const v = String(dataUrl || '');
  try {
    localStorage.setItem(KEY_AVATAR, v);
  } catch {}
  return v;
}

export function clearPlayerAvatar() {
  try {
    localStorage.removeItem(KEY_AVATAR);
  } catch {}
}

export function getTopScores(limit = 10) {
  const list = readJSON(KEY, []);
  return Array.isArray(list) ? list.slice(0, limit) : [];
}

export function submitMyScore() {
  const name = getPlayerName();
  const avatar = getPlayerAvatar();

  const xp = getXp();
  const level = getLevel(); // ✅ getLevel() heeft geen params

  const list = readJSON(KEY, []);
  const arr = Array.isArray(list) ? list : [];

  // upsert by name (simple local demo)
  const existing = arr.find((x) => x.name === name);
  if (existing) {
    existing.xp = xp;
    existing.level = level;
    existing.avatar = avatar;
    existing.t = Date.now();
  } else {
    arr.push({ name, xp, level, avatar, t: Date.now() });
  }

  // sort highest XP first
  arr.sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0));

  writeJSON(KEY, arr);

  return { name, xp, level, avatar };
}
