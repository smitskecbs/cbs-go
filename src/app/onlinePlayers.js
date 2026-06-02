// src/app/onlinePlayers.js
// Profiel-sync naar Supabase (players tabel)
// SAFE versie: gebruikt alleen kolommen die zeker bestaan:
// user_id, wallet_pk, nickname, avatar

import { getLocalPublicKey } from './solanaLocalWallet.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName, getPlayerAvatar } from './leaderboard.js';
import { normalizePlayerNickname } from './playerNickname.js';
import { supabase } from './supabaseClient.js';

function safeWalletPk() {
  // Prefer: local solana wallet (die wil je tonen/copy’en)
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

    const nickname = resolveNickname(base, extra);
    if (!nickname) {
      console.warn('CBS GO: no nickname yet, skip players profile sync');
      return;
    }

    const user_id = await getAuthUserId();

    // Payload: alleen kolommen die bestaan
    const payload = {
      user_id: user_id || null,
      wallet_pk: base.wallet_pk,
      avatar: base.avatar,
      ...extra,
      nickname,
    };

    // Als user ingelogd is, update op user_id (bestendig)
    if (user_id) {
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
        // 2) Update bestaande row
        const { error: upErr } = await supabase
          .from('players')
          .update(payload)
          .eq('id', existing.id);

        if (upErr) {
          console.warn('CBS GO: players update failed', upErr);
        }
        return;
      }

      // 3) Nog geen row: insert
      const { error: insErr } = await supabase.from('players').insert(payload);
      if (insErr) {
        console.warn('CBS GO: players insert failed', insErr);
      }
      return;
    }

    // Geen login (geen user_id): probeer update op wallet_pk, anders insert
    const { data: ex2, error: sel2 } = await supabase
      .from('players')
      .select('id')
      .eq('wallet_pk', base.wallet_pk)
      .maybeSingle();

    if (sel2) {
      console.warn('CBS GO: players select by wallet_pk failed', sel2);
    }

    if (ex2?.id) {
      const { error: up2 } = await supabase.from('players').update(payload).eq('id', ex2.id);
      if (up2) console.warn('CBS GO: players update by wallet_pk failed', up2);
      return;
    }

    const { error: ins2 } = await supabase.from('players').insert(payload);
    if (ins2) console.warn('CBS GO: players insert (no user) failed', ins2);
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

    // zet nickname lokaal (caller doet dat al meestal) + sync naar supabase
    await syncPlayerProfile({ nickname });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'crash', error: e };
  }
}
