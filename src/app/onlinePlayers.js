// src/app/onlinePlayers.js
// Profiel-sync naar Supabase (players tabel)

import { getLocalPublicKey } from './solanaLocalWallet.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName, getPlayerAvatar } from './leaderboard.js';
import { supabase } from './supabaseClient.js';

function getBaseProfile() {
  const gameWalletPk = getPublicKey();
  if (!gameWalletPk) return null;

  const nickname = getPlayerName();
  const avatar = getPlayerAvatar();

  let solanaPk = null;
  try {
    solanaPk = getLocalPublicKey();
  } catch (e) {
    console.warn('CBS GO: could not read/create local Solana wallet', e);
  }

  return {
    wallet_pk: gameWalletPk,
    nickname,
    avatar,
    solana_pk: solanaPk,
  };
}

/**
 * Upsert op wallet_pk (altijd ok, wallet blijft leidend)
 * Let op: als je later nickname UNIQUE maakt, dan kan deze call falen
 * als de nickname al bestaat. Daarom hebben we claimNickname() hieronder.
 */
export async function syncPlayerProfile(extra = {}) {
  try {
    const base = getBaseProfile();
    if (!base) {
      console.warn('CBS GO: no game wallet, skip profile sync');
      return;
    }

    // Probeer auth user te lezen (mail login).
    let userId = null;
    try {
      const { data } = await supabase.auth.getUser();
      userId = data?.user?.id || null;
    } catch {
      userId = null;
    }

    const payload = {
      ...base,
      ...extra,
      last_seen: new Date().toISOString(),
      user_id: userId, // alleen als je kolom hebt
    };

    const { error } = await supabase.from('players').upsert(payload, { onConflict: 'wallet_pk' });

    if (error) {
      console.warn('CBS GO: failed to sync player profile', error);
    }
  } catch (e) {
    console.warn('CBS GO: syncPlayerProfile crashed', e);
  }
}

/**
 * Claim nickname veilig:
 * - schrijft nickname op jouw wallet_pk
 * - als UNIQUE faalt -> geeft reason "nickname_taken"
 *
 * Retourneert:
 * { ok:true } of { ok:false, reason:'nickname_taken'|'db_error'|'no_wallet'|'empty'|'crash' }
 */
export async function claimNickname(nicknameRaw) {
  try {
    const wallet_pk = getPublicKey();
    if (!wallet_pk) return { ok: false, reason: 'no_wallet' };

    const nickname = String(nicknameRaw || '').trim();
    if (!nickname) return { ok: false, reason: 'empty' };

    // auth user_id (optioneel)
    let userId = null;
    try {
      const { data } = await supabase.auth.getUser();
      userId = data?.user?.id || null;
    } catch {
      userId = null;
    }

    const payload = {
      wallet_pk,
      nickname,
      last_seen: new Date().toISOString(),
      user_id: userId,
    };

    const { error } = await supabase.from('players').upsert(payload, { onConflict: 'wallet_pk' });

    if (!error) return { ok: true };

    const msg = String(error.message || error.details || error.hint || '');

    // PostgreSQL unique violation: 23505
    if (String(error.code) === '23505' || msg.toLowerCase().includes('duplicate')) {
      return { ok: false, reason: 'nickname_taken', error };
    }

    console.warn('CBS GO: claimNickname failed', error);
    return { ok: false, reason: 'db_error', error };
  } catch (e) {
    return { ok: false, reason: 'crash', error: e };
  }
}
