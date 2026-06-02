// src/app/remoteProfile.js
// Opslaan & ophalen van game-profiel per Supabase user (email-login).
// Let op: dit bestand doet GEEN directe game-logica, alleen praten met Supabase.

import { supabase } from './supabaseClient.js';

/**
 * Haal huidige Supabase user_id op (email-account).
 * @returns {Promise<string|null>}
 */
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

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function normalizeNickname(raw) {
  const n = String(raw ?? '').trim().slice(0, 24);
  if (!n || n.toLowerCase() === 'anon') return null;
  return n;
}

function profileHasMeaningfulData(profile) {
  if (!profile || typeof profile !== 'object') return false;
  if (normalizeNickname(profile.nickname)) return true;
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
 *   wallet_pk, nickname, avatar,
 *   xp, level, tickets, cbs_play,
 *   cards_json, friends_json
 * }
 *
 * Partial updates merge with the existing row so XP sync cannot wipe nickname.
 *
 * @param {object} localProfile
 * @returns {Promise<object|null>} de opgeslagen row of null
 */
export async function saveRemoteProfile(localProfile = {}) {
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
    nickname: hasOwn(localProfile, 'nickname')
      ? normalizeNickname(localProfile.nickname)
      : normalizeNickname(existing.nickname),
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

  if (!existing.user_id && !profileHasMeaningfulData(payload)) {
    return null;
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
