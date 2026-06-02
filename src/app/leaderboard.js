// src/app/leaderboard.js
// Local profile storage (nickname + avatar) in this browser.
// Uses XP/level from state.js (single source of truth)
//
// ✅ Keep existing local behavior
// ✅ Add remote leaderboard (Supabase) — only named players with saved XP
// ✅ Country flag source comes from public.player_state.country_code

import { getXp, getLevel } from './state.js';
import { supabase } from './supabaseClient.js';
import {
  hasValidPlayerNickname,
  isGameplayAllowed,
  normalizePlayerNickname,
  NICKNAME_REQUIRED_MESSAGE,
  PROFILE_SETUP_MESSAGE,
  requireGameplayAllowed,
  sanitizeStoredNickname,
  LEADERBOARD_NICKNAME_BLOCKLIST_IN,
} from './playerNickname.js';

export {
  hasValidPlayerNickname,
  isGameplayAllowed,
  normalizePlayerNickname,
  NICKNAME_REQUIRED_MESSAGE,
  PROFILE_SETUP_MESSAGE,
  requireGameplayAllowed,
  sanitizeStoredNickname,
};

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

export function isValidLeaderboardEntry(row) {
  if (!row || !String(row.user_id || '').trim()) return false;
  if (!normalizePlayerNickname(row.nickname)) return false;
  const xp = row.xp;
  if (xp == null || !Number.isFinite(Number(xp))) return false;
  return true;
}

export function setPlayerName(name) {
  const n = normalizePlayerNickname(name);
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
  if (!isGameplayAllowed()) return null;

  const name = normalizePlayerNickname(getPlayerName());
  if (!name) return null;

  const avatar = getPlayerAvatar();

  const xp = getXp();
  const level = getLevel();

  const list = readJSON(KEY, []);
  const arr = Array.isArray(list) ? list : [];

  const existing = arr.find((x) => x.name === name);
  if (existing) {
    existing.xp = xp;
    existing.level = level;
    existing.avatar = avatar;
    existing.t = Date.now();
  } else {
    arr.push({ name, xp, level, avatar, t: Date.now() });
  }

  arr.sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0));

  writeJSON(KEY, arr);

  return { name, xp, level, avatar };
}

/**
 * Remote leaderboard — only players with a saved nickname and XP score.
 * Main source: public.game_profiles
 * Country flag source: public.player_state.country_code
 */
export async function loadLeaderboard(limit = 100) {
  try {
    const fetchLimit = Math.max(limit * 4, 200);

    const { data: profiles, error: profilesError } = await supabase
      .from('game_profiles')
      .select('user_id, nickname, avatar, xp, level, updated_at')
      .not('nickname', 'is', null)
      .neq('nickname', '')
      .not('nickname', 'in', LEADERBOARD_NICKNAME_BLOCKLIST_IN)
      .not('nickname', 'ilike', 'anon%')
      .not('nickname', 'ilike', 'anonymous%')
      .not('nickname', 'ilike', 'guest%')
      .not('nickname', 'ilike', 'player%')
      .not('nickname', 'ilike', 'needs%')
      .order('xp', { ascending: false })
      .limit(fetchLimit);

    if (profilesError) {
      console.warn('CBS GO: loadLeaderboard failed', profilesError);
      return [];
    }

    const rows = Array.isArray(profiles) ? profiles : [];
    if (!rows.length) return [];

    const userIds = rows
      .map((r) => String(r?.user_id || '').trim())
      .filter(Boolean);

    let countryByUserId = new Map();

    if (userIds.length > 0) {
      const { data: stateRows, error: stateError } = await supabase
        .from('player_state')
        .select('user_id, country_code, last_seen')
        .in('user_id', userIds);

      if (stateError) {
        console.warn('CBS GO: player_state country lookup failed', stateError);
      } else if (Array.isArray(stateRows)) {
        for (const row of stateRows) {
          const uid = String(row?.user_id || '').trim();
          if (!uid) continue;

          const code = String(row?.country_code || '').trim().toUpperCase();
          countryByUserId.set(uid, code || '');
        }
      }
    }

    return rows
      .map((r) => {
        const uid = String(r?.user_id || '').trim();
        return {
          ...r,
          nickname: normalizePlayerNickname(r?.nickname),
          country_code: uid ? (countryByUserId.get(uid) || '') : '',
        };
      })
      .filter(isValidLeaderboardEntry)
      .slice(0, limit);
  } catch (e) {
    console.warn('CBS GO: loadLeaderboard exception', e);
    return [];
  }
}
