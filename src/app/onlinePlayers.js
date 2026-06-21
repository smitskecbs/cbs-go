// src/app/onlinePlayers.js
// Profiel-sync naar Supabase (players tabel)
// SAFE versie: gebruikt alleen kolommen die zeker bestaan:
// user_id, wallet_pk, nickname, avatar

import { getLocalPublicKey } from './solanaLocalWallet.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName, getPlayerAvatar } from './leaderboard.js';
import {
  getProfileGateContext,
  hasValidPlayerAvatar,
  isProfileComplete,
  normalizePlayerNickname,
} from './playerNickname.js';
import { isNicknameAvailable, NICKNAME_TAKEN_MESSAGE } from './remoteProfile.js';
import { supabase } from './supabaseClient.js';

function safeWalletPk() {
  // Prefer: local solana wallet (die wil je tonen/copy'en)
  try {
    const pk = getLocalPublicKey();
    if (pk) return String(pk);
  } catch {}

  // Fallback: game wallet
  try {
    const pk = getPublicKey();
    if (pk) return String(pk);
  } catch {}

  return null;
}

function getBaseProfile() {
  const wallet_pk = safeWalletPk();
  if (!wallet_pk) return null;

  const nickname = String(getPlayerName() || '').trim();
  const avatar = String(getPlayerAvatar() || '') || '';

  return { wallet_pk, nickname, avatar };
}

function resolveNickname(base, extra = {}) {
  const extraNick = normalizePlayerNickname(extra.nickname);
  if (extraNick) return extraNick;

  const baseNick = normalizePlayerNickname(base?.nickname);
  if (baseNick) return baseNick;

  return '';
}

function resolveAvatar(base, extra = {}) {
  if (Object.prototype.hasOwnProperty.call(extra, 'avatar')) {
    return String(extra.avatar || '').trim();
  }
  return String(base?.avatar || '').trim();
}

async function getAuthUserId() {
  try {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id || null;
  } catch {
    return null;
  }
}

export async function syncPlayerProfile(extra = {}) {
  try {
    const base = getBaseProfile();
    if (!base) {
      console.warn('CBS GO: no wallet, skip profile sync');
      return;
    }

    const user_id = await getAuthUserId();
    if (!user_id) {
      console.warn('CBS GO: no auth session, skip players profile sync');
      return;
    }

    const nickname = resolveNickname(base, extra);
    const avatar = resolveAvatar(base, extra);
    const { authUser, walletPk: ctxWallet } = getProfileGateContext();

    if (
      !extra.forceSync &&
      !isProfileComplete({
        authUser: authUser || { id: user_id },
        walletPk: base.wallet_pk || ctxWallet,
        nickname,
        avatar,
      })
    ) {
      return;
    }

    if (!nickname || !hasValidPlayerAvatar(avatar)) {
      return;
    }

    // Payload: alleen kolommen die bestaan
    const payload = {
      user_id,
      wallet_pk: base.wallet_pk,
      avatar,
      nickname,
    };

    // 1) Bestaat er al een row voor deze user?
    const { data: existing, error: selErr } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', user_id)
      .maybeSingle();

    if (selErr) {
      console.warn('CBS GO: players select by user_id failed', selErr);
    }

    if (existing?.id) {
      const { error: upErr } = await supabase.from('players').update(payload).eq('id', existing.id);

      if (upErr) {
        console.warn('CBS GO: players update failed', upErr);
      }
      return;
    }

    const { error: insErr } = await supabase.from('players').insert(payload);
    if (insErr) {
      console.warn('CBS GO: players insert failed', insErr);
    }
  } catch (e) {
    console.warn('CBS GO: syncPlayerProfile crashed', e);
  }
}

export async function claimNickname(nicknameRaw) {
  try {
    const base = getBaseProfile();
    if (!base?.wallet_pk) return { ok: false, reason: 'no_wallet' };

    const nickname = normalizePlayerNickname(nicknameRaw);
    if (!nickname) return { ok: false, reason: 'empty' };

    const user_id = await getAuthUserId();
    const nickCheck = await isNicknameAvailable(nickname, user_id);
    if (!nickCheck.available) {
      if (nickCheck.reason === 'taken') {
        return { ok: false, reason: 'taken', message: NICKNAME_TAKEN_MESSAGE };
      }
      return { ok: false, reason: nickCheck.reason || 'unavailable' };
    }

    await syncPlayerProfile({ nickname });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'crash', error: e };
  }
}
