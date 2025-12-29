// src/app/onlinePlayers.js
// Kleine helper om jouw speler in Supabase te zetten.
// Geen layout of gameplay, alleen een rustige netwerk-call.

import { supabase } from './supabaseClient.js';
import { getPlayerName } from './leaderboard.js';
import { getPublicKey } from './wallet.js';

let currentPlayerId = null;

export function getCurrentPlayerId() {
  return currentPlayerId;
}

// Stuur (nickname + wallet_pk) naar de "players" tabel.
// Als er geen internet is of Supabase faalt -> alleen een console.warn.
export async function syncPlayerProfile() {
  try {
    const nicknameRaw = getPlayerName() || '';
    const nickname = nicknameRaw.trim() || 'Anon';
    const wallet_pk = getPublicKey() || null;

    // Als we geen wallet hebben, doen we niets
    if (!wallet_pk) {
      console.warn('CBS GO: no local wallet yet, skip Supabase sync.');
      return null;
    }

    // 1) kijken of er al een row is voor deze wallet
    const { data: existing, error: selectError } = await supabase
      .from('players')
      .select('id')
      .eq('wallet_pk', wallet_pk)
      .limit(1);

    if (selectError) {
      console.warn('CBS GO: Supabase select failed', selectError);
    }

    if (existing && existing.length > 0) {
      currentPlayerId = existing[0].id;
      return currentPlayerId;
    }

    // 2) anders: nieuwe speler aanmaken
    const { data, error } = await supabase
      .from('players')
      .insert({
        nickname,
        wallet_pk
      })
      .select('id')
      .single();

    if (error) {
      console.warn('CBS GO: Supabase insert failed', error);
      return null;
    }

    currentPlayerId = data?.id || null;
    console.log('CBS GO: player synced to Supabase:', currentPlayerId);
    return currentPlayerId;
  } catch (e) {
    console.warn('CBS GO: Supabase sync error', e);
    return null;
  }
}
