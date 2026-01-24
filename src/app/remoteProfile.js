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
 * @param {object} localProfile
 * @returns {Promise<object|null>} de opgeslagen row of null
 */
export async function saveRemoteProfile(localProfile = {}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    // niet ingelogd met email
    return null;
  }

  const cardsObj =
    localProfile.cards_json && typeof localProfile.cards_json === 'object'
      ? localProfile.cards_json
      : {};

  const friendsObj =
    localProfile.friends_json && typeof localProfile.friends_json === 'object'
      ? localProfile.friends_json
      : {};

  const payload = {
    user_id: userId,
    wallet_pk: localProfile.wallet_pk || null,
    nickname: localProfile.nickname || null,
    avatar: localProfile.avatar || null,
    xp: localProfile.xp ?? null,
    level: localProfile.level ?? null,
    tickets: localProfile.tickets ?? null,
    cbs_play: localProfile.cbs_play ?? null,

    // ✅ JSON objecten (geen arrays)
    cards_json: cardsObj,
    friends_json: friendsObj,
  };

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
