// src/app/friends.js
// Friends via Supabase
// Jouw schema (volgens screenshot):
//   TABLE friends (id uuid, a_wallet text, b_wallet text, status text, created_at timestamptz)
//   TABLE players (wallet_pk text, nickname text, avatar text, last_seen timestamptz, ...)
//
// UI zit in appShell.js (Friends-blok).

import { supabase } from './supabaseClient.js';
import { getPublicKey } from './wallet.js';

function requireWallet() {
  const w = getPublicKey();
  if (!w) {
    throw new Error('No local CBS-GO wallet found. Create / unlock your wallet first.');
  }
  return w;
}

function logError(ctx, err) {
  console.warn(`CBS GO friends: ${ctx} failed`, err);
}

// ---------- SEND FRIEND REQUEST ----------

export async function sendFriendRequest(otherWalletRaw) {
  const me = requireWallet();
  const otherWallet = String(otherWalletRaw || '').trim();

  if (!otherWallet) {
    throw new Error('Wallet address is required.');
  }

  if (otherWallet === me) {
    throw new Error('You cannot add yourself as a friend.');
  }

  // Simpele lengte-check (Solana base58 ~32-44 chars)
  if (otherWallet.length < 20) {
    throw new Error('That does not look like a valid wallet address.');
  }

  const { error: insertError } = await supabase
    .from('friends')
    .insert({
      a_wallet: me,           // afzender
      b_wallet: otherWallet,  // ontvanger
      status: 'pending',
    });

  if (insertError) {
    logError('sendFriendRequest', insertError);

    if (insertError.message && insertError.message.toLowerCase().includes('duplicate')) {
      throw new Error('You already have a pending or accepted friendship with this wallet.');
    }

    throw new Error('Could not send friend request (permissions or network issue).');
  }

  return { ok: true };
}

// ---------- ACCEPT FRIEND REQUEST ----------

export async function acceptFriendRequest(friendId) {
  const me = requireWallet();
  const id = friendId; // uuid string

  if (!id) {
    throw new Error('Invalid friend request id.');
  }

  // Alleen accepteren als jij de ontvanger (b_wallet) bent.
  const { data, error } = await supabase
    .from('friends')
    .update({ status: 'accepted' })
    .eq('id', id)
    .eq('b_wallet', me)
    .select('*')
    .maybeSingle();

  if (error) {
    logError('acceptFriendRequest', error);
    throw new Error('Could not accept friend (permissions or network issue).');
  }

  if (!data) {
    throw new Error('Friend request not found or not meant for this wallet.');
  }

  return { ok: true, friend: data };
}

// ---------- LOAD FRIENDS OVERVIEW ----------
//
// Returned:
//   { incoming: [...], accepted: [...] }
// met per item:
//   id, a_wallet, b_wallet, status, otherWallet, nickname, avatar

export async function loadFriendsOverview() {
  const me = getPublicKey();
  if (!me) {
    return { incoming: [], accepted: [] };
  }

  // Alle rijen waar jij a_wallet of b_wallet bent
  const { data, error } = await supabase
    .from('friends')
    .select('*')
    .or(`a_wallet.eq.${me},b_wallet.eq.${me}`)
    .order('created_at', { ascending: false });

  if (error) {
    logError('loadFriendsOverview', error);
    throw new Error('Could not load friends (permissions or network issue).');
  }

  const rows = Array.isArray(data) ? data : [];
  const incoming = [];
  const accepted = [];

  for (const fr of rows) {
    const isIncoming = fr.b_wallet === me && fr.status === 'pending';
    const isAccepted =
      fr.status === 'accepted' &&
      (fr.a_wallet === me || fr.b_wallet === me);

    if (!isIncoming && !isAccepted) continue;

    const otherWallet = fr.a_wallet === me ? fr.b_wallet : fr.a_wallet;

    const base = {
      id: fr.id,
      a_wallet: fr.a_wallet,
      b_wallet: fr.b_wallet,
      status: fr.status,
      created_at: fr.created_at,
      otherWallet,
      nickname: null,
      avatar: '',
    };

    if (isIncoming) incoming.push(base);
    if (isAccepted) accepted.push(base);
  }

  // Nickname + avatar uit players
  const allWallets = Array.from(
    new Set(
      [...incoming, ...accepted]
        .map((f) => f.otherWallet)
        .filter(Boolean)
    )
  );

  if (allWallets.length > 0) {
    const { data: players, error: playersError } = await supabase
      .from('players')
      .select('wallet_pk, nickname, avatar')
      .in('wallet_pk', allWallets);

    if (!playersError && Array.isArray(players)) {
      const byWallet = new Map();
      for (const p of players) {
        if (!p.wallet_pk) continue;
        byWallet.set(String(p.wallet_pk), {
          nickname: p.nickname || null,
          avatar: p.avatar || '',
        });
      }

      const enrich = (arr) => {
        arr.forEach((fr) => {
          const info = byWallet.get(fr.otherWallet);
          if (info) {
            fr.nickname = info.nickname || null;
            fr.avatar = info.avatar || '';
          }
        });
      };

      enrich(incoming);
      enrich(accepted);
    } else if (playersError) {
      logError('loadFriendsOverview:players', playersError);
    }
  }

  return { incoming, accepted };
}
