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
  requireGameplayAllowed,
  sanitizeStoredNickname,
  LEADERBOARD_NICKNAME_BLOCKLIST_IN,
} from './playerNickname.js';

export {
  hasValidPlayerNickname,
  isGameplayAllowed,
  normalizePlayerNickname,
  NICKNAME_REQUIRED_MESSAGE,
  requireGameplayAllowed,
  sanitizeStoredNickname,
};

const KEY = 'cbsgo_leaderboard_v2';
const KEY_NAME = 'cbsgo_player_name_v2';
const KEY_AVATAR = 'cbsgo_player_avatar_v2';

// TEMP DEBUG — remove after Anon investigation
const LB_DEBUG = true;
const LB_DEBUG_TAG = '[CBSGO LB DEBUG]';

function lbDebug(label, payload) {
  if (!LB_DEBUG) return;
  console.log(LB_DEBUG_TAG, label, payload);
}

function lbDebugTable(label, rows, pick = (r, i) => r) {
  if (!LB_DEBUG) return;
  console.group(`${LB_DEBUG_TAG} ${label}`);
  console.table((rows || []).map((r, i) => pick(r, i)));
  console.groupEnd();
}

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

    // TEMP DEBUG: unfiltered raw Supabase response (top 20 by XP)
    let rawUnfiltered = null;
    if (LB_DEBUG) {
      const rawRes = await supabase
        .from('game_profiles')
        .select('user_id, nickname, avatar, xp, level, updated_at')
        .order('xp', { ascending: false })
        .limit(20);

      rawUnfiltered = rawRes.data;
      const rawErr = rawRes.error;

      lbDebug('1. RAW Supabase response BEFORE any client filters', {
        table: 'game_profiles',
        query:
          'SELECT user_id, nickname, avatar, xp, level, updated_at FROM game_profiles ORDER BY xp DESC LIMIT 20',
        error: rawErr || null,
        rowCount: Array.isArray(rawUnfiltered) ? rawUnfiltered.length : 0,
        top20Nicknames: (rawUnfiltered || []).map((r, i) => ({
          rank: i + 1,
          user_id: r?.user_id,
          nickname: r?.nickname,
          nicknameType: typeof r?.nickname,
          nicknameJson: JSON.stringify(r?.nickname),
          xp: r?.xp,
        })),
        fullRows: rawUnfiltered,
      });
      lbDebugTable(
        '1b. Top 20 nickname values (raw, unfiltered)',
        rawUnfiltered || [],
        (r, i) => ({
          rank: i + 1,
          user_id: r?.user_id,
          nickname: r?.nickname,
          xp: r?.xp,
        }),
      );
    }

    const queryDesc =
      'game_profiles SELECT user_id,nickname,avatar,xp,level,updated_at ' +
      'WHERE nickname IS NOT NULL AND nickname <> "" ' +
      'AND nickname NOT IN (blocklist) AND nickname NOT ILIKE anon|anonymous|guest|player% ' +
      `ORDER BY xp DESC LIMIT ${fetchLimit}`;

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
      .order('xp', { ascending: false })
      .limit(fetchLimit);

    if (LB_DEBUG) {
      lbDebug('2. Supabase response AFTER server-side query filters (before client map/filter)', {
        table: 'game_profiles',
        query: queryDesc,
        blocklist: LEADERBOARD_NICKNAME_BLOCKLIST_IN,
        error: profilesError || null,
        rowCount: Array.isArray(profiles) ? profiles.length : 0,
        top20Nicknames: (profiles || []).slice(0, 20).map((r, i) => ({
          rank: i + 1,
          user_id: r?.user_id,
          nickname: r?.nickname,
          nicknameType: typeof r?.nickname,
          nicknameJson: JSON.stringify(r?.nickname),
          xp: r?.xp,
        })),
      });
    }

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

      if (LB_DEBUG) {
        lbDebug('3. player_state country lookup (NOT used for nickname display)', {
          table: 'player_state',
          query: 'SELECT user_id, country_code, last_seen WHERE user_id IN (...)',
          error: stateError || null,
          rowCount: Array.isArray(stateRows) ? stateRows.length : 0,
        });
      }

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

    const afterMap = rows.map((r) => {
      const uid = String(r?.user_id || '').trim();
      const rawNick = r?.nickname;
      const normalizedNick = normalizePlayerNickname(rawNick);
      return {
        ...r,
        nickname: normalizedNick,
        country_code: uid ? (countryByUserId.get(uid) || '') : '',
        __debug: {
          rawNickname: rawNick,
          normalizedNickname: normalizedNick,
          isValid: isValidLeaderboardEntry({
            ...r,
            nickname: normalizedNick,
          }),
        },
      };
    });

    if (LB_DEBUG) {
      lbDebug('4. After normalizePlayerNickname() map (leaderboard.js ~map step)', {
        file: 'src/app/leaderboard.js',
        transform: 'nickname = normalizePlayerNickname(r.nickname)',
        top20: afterMap.slice(0, 20).map((r, i) => ({
          rank: i + 1,
          user_id: r.user_id,
          rawNickname: r.__debug.rawNickname,
          normalizedNickname: r.__debug.normalizedNickname,
          isValid: r.__debug.isValid,
          xp: r.xp,
        })),
      });
    }

    const afterFilter = afterMap.filter((r) => {
      const ok = isValidLeaderboardEntry(r);
      if (LB_DEBUG && !ok && afterMap.indexOf(r) < 20) {
        lbDebug(`4b. FILTERED OUT row #${afterMap.indexOf(r) + 1}`, {
          file: 'src/app/leaderboard.js isValidLeaderboardEntry()',
          user_id: r.user_id,
          rawNickname: r.__debug?.rawNickname,
          normalizedNickname: r.nickname,
          xp: r.xp,
        });
      }
      return ok;
    });

    const finalRows = afterFilter.slice(0, limit).map(({ __debug, ...row }) => row);

    if (LB_DEBUG) {
      lbDebug('5. Final rows returned to leaderboardPanel (after filter + slice)', {
        file: 'src/app/leaderboard.js loadLeaderboard() return',
        rowCount: finalRows.length,
        top20Nicknames: finalRows.slice(0, 20).map((r, i) => ({
          rank: i + 1,
          user_id: r.user_id,
          nickname: r.nickname,
          xp: r.xp,
        })),
      });
      window.__cbsgo_lb_debug = {
        rawTop20: rawUnfiltered,
        filteredTop20: (profiles || []).slice(0, 20),
        finalRows: finalRows.slice(0, 20),
      };
    }

    return finalRows;
  } catch (e) {
    console.warn('CBS GO: loadLeaderboard exception', e);
    return [];
  }
}