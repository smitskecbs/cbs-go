// src/app/remoteProfile.js
// Opslaan & ophalen van game-profiel per Supabase user (email-login).
// Let op: dit bestand doet GEEN directe game-logica, alleen praten met Supabase.

import { normalizePlayerNickname, isProfileComplete, getProfileGateContext } from './playerNickname.js';
import { supabase } from './supabaseClient.js';

export async function getCurrentUserId() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.warn('CBS-GO: getUser error', error);
      return null;
    }
    return data?.user?.id || null;
  } catch (e) {
    console.warn('CBS-GO: getCurrentUserId crashed', e);
    return null;
  }
}

export const NICKNAME_TAKEN_MESSAGE = 'This nickname is already taken.';

/**
 * Case-insensitive nickname availability in game_profiles.
 * Same user may keep their own nickname.
 */
export async function isNicknameAvailable(nickname, currentUserId) {
  const nick = normalizePlayerNickname(nickname);
  if (!nick) return { available: false, reason: 'invalid' };

  const userId = currentUserId || (await getCurrentUserId());
  if (!userId) return { available: false, reason: 'no-auth' };

  try {
    const { data, error } = await supabase
      .from('game_profiles')
      .select('user_id, nickname')
      .ilike('nickname', nick)
      .limit(1);

    if (error) {
      console.warn('CBS-GO: isNicknameAvailable error', error);
      return { available: false, reason: 'error' };
    }

    const row = Array.isArray(data) ? data[0] : null;
    if (!row?.user_id) return { available: true };
    if (String(row.user_id) === String(userId)) return { available: true };
    return { available: false, reason: 'taken' };
  } catch (e) {
    console.warn('CBS-GO: isNicknameAvailable crashed', e);
    return { available: false, reason: 'error' };
  }
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function normalizeNickname(raw) {
  const n = normalizePlayerNickname(raw);
  return n || null;
}

function normalizeEmail(raw) {
  const e = String(raw ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return null;
  return e;
}

function resolveEmailForSave(existing, localProfile) {
  const existingEmail = normalizeEmail(existing.email);
  if (!hasOwn(localProfile, 'email')) return existingEmail;

  const next = normalizeEmail(localProfile.email);
  if (next) return next;

  if (existingEmail) return existingEmail;
  return null;
}

function resolveNicknameForSave(existing, localProfile) {
  const existingNick = normalizeNickname(existing.nickname);
  if (!hasOwn(localProfile, 'nickname')) return existingNick;

  const next = normalizeNickname(localProfile.nickname);
  if (next) return next;

  if (existingNick) return existingNick;
  return null;
}

function profileHasMeaningfulData(profile) {
  if (!profile || typeof profile !== 'object') return false;
  if (normalizeEmail(profile.email)) return true;
  if (normalizeNickname(profile.nickname)) return true;
  if (profile.avatar && String(profile.avatar).trim()) return true;
  if (profile.wallet_pk) return true;
  if (profile.xp != null && Number.isFinite(Number(profile.xp))) return true;
  if (profile.level != null && Number.isFinite(Number(profile.level))) return true;
  if (profile.tickets != null && Number.isFinite(Number(profile.tickets))) return true;
  if (profile.cbs_play != null && Number.isFinite(Number(profile.cbs_play))) return true;
  const cards = profile.cards_json;
  if (cards && typeof cards === 'object' && Object.keys(cards).length > 0) return true;
  const friends = profile.friends_json;
  if (friends && typeof friends === 'object' && Object.keys(friends).length > 0) return true;
  return false;
}

/**
 * Lees bestaand profiel uit game_profiles voor de ingelogde user.
 * @returns {Promise<object|null>} row of null
 */
export async function loadRemoteProfile() {
  const userId = await getCurrentUserId();
  if (!userId) {
    // niet ingelogd met email
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('game_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // 0 of 1 rij

    if (error) {
      // PGRST116 = no rows (ok)
      if (error.code !== 'PGRST116') {
        console.warn('CBS-GO: loadRemoteProfile error', error);
      }
      return null;
    }

    return data || null;
  } catch (e) {
    console.warn('CBS-GO: loadRemoteProfile crashed', e);
    return null;
  }
}

/**
 * Sla lokaal game-profiel op in Supabase.
 * localProfile voorbeeld:
 * {
 *   wallet_pk, email, nickname, avatar,
 *   xp, level, tickets, cbs_play,
 *   cards_json, friends_json
 * }
 *
 * Partial updates merge with the existing row so XP sync cannot wipe nickname.
 *
 * @param {object} localProfile
 * @param {object} [options]
 * @param {boolean} [options.forceSave=false] - allow first insert during onboarding
 * @returns {Promise<object|null>} de opgeslagen row of null
 */
export async function saveRemoteProfile(localProfile = {}, options = {}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    // niet ingelogd met email
    return null;
  }

  const existing = (await loadRemoteProfile()) || {};

  const cardsObj = hasOwn(localProfile, 'cards_json')
    ? localProfile.cards_json && typeof localProfile.cards_json === 'object'
      ? localProfile.cards_json
      : {}
    : existing.cards_json && typeof existing.cards_json === 'object'
      ? existing.cards_json
      : {};

  const friendsObj = hasOwn(localProfile, 'friends_json')
    ? localProfile.friends_json && typeof localProfile.friends_json === 'object'
      ? localProfile.friends_json
      : {}
    : existing.friends_json && typeof existing.friends_json === 'object'
      ? existing.friends_json
      : {};

  const payload = {
    user_id: userId,
    wallet_pk: hasOwn(localProfile, 'wallet_pk')
      ? localProfile.wallet_pk || null
      : existing.wallet_pk ?? null,
    email: resolveEmailForSave(existing, localProfile),
    nickname: resolveNicknameForSave(existing, localProfile),
    avatar: hasOwn(localProfile, 'avatar')
      ? localProfile.avatar || null
      : existing.avatar ?? null,
    xp: hasOwn(localProfile, 'xp') ? localProfile.xp ?? null : existing.xp ?? null,
    level: hasOwn(localProfile, 'level')
      ? localProfile.level ?? null
      : existing.level ?? null,
    tickets: hasOwn(localProfile, 'tickets')
      ? localProfile.tickets ?? null
      : existing.tickets ?? null,
    cbs_play: hasOwn(localProfile, 'cbs_play')
      ? localProfile.cbs_play ?? null
      : existing.cbs_play ?? null,
    cards_json: cardsObj,
    friends_json: friendsObj,
  };

  if (!existing.user_id && !profileHasMeaningfulData(payload) && !options.forceSave) {
    return null;
  }

  if (!options.forceSave) {
    const { authUser, walletPk } = getProfileGateContext();
    if (
      !isProfileComplete({
        authUser: authUser || { id: userId },
        walletPk: payload.wallet_pk || walletPk,
        nickname: payload.nickname,
        avatar: payload.avatar,
      })
    ) {
      return null;
    }
  }

  try {
    const { data, error } = await supabase
      .from('game_profiles')
      .upsert(payload, { onConflict: 'user_id' }) // 1 profiel per user
      .select()
      .single();

    if (error) {
      console.warn('CBS-GO: saveRemoteProfile error', error);
      return null;
    }

    return data || null;
  } catch (e) {
    console.warn('CBS-GO: saveRemoteProfile crashed', e);
    return null;
  }
}

// ✅ Debug helpers: expose functions for DevTools console (GH Pages friendly)
if (typeof window !== 'undefined') {
  window.__cbsgo_saveRemoteProfile = saveRemoteProfile;
  window.__cbsgo_loadRemoteProfile = loadRemoteProfile;
  window.__cbsgo_getCurrentUserId = getCurrentUserId;
}
