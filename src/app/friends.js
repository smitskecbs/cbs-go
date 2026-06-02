// src/app/friends.js
// Friends via Supabase (AUTH USER ID based) ✅
//
// Doel:
// - Friends blijven bestaan als wallet verandert.
// - Identity = supabase auth user_id (email login).
// - UI toont nickname/avatar + een kopieerbare wallet.
//   Bronnen:
//   1) players (op user_id)  -> nickname/avatar/solana_pk/wallet_pk
//   2) player_state (op user_id) -> nickname/wallet_pk (fallback)
//   3) players (op wallet_pk) -> avatar/nickname (fallback)
//
// DB schema verwacht:
//   TABLE friends_uid (id uuid, a_user uuid, b_user uuid, status text, created_at timestamptz)
//   TABLE players (user_id uuid, wallet_pk text, solana_pk text, nickname text, avatar text, ...)
//   TABLE player_state (user_id uuid UNIQUE, wallet_pk text, nickname text, ...)

import { supabase } from './supabaseClient.js';
import { normalizePlayerNickname } from './playerNickname.js';

const FRIENDS_TABLE = 'friends_uid';
const PLAYERS_TABLE = 'players';
const PLAYER_STATE_TABLE = 'player_state';

function logError(ctx, err) {
  console.warn(`CBS GO friends(uid): ${ctx} failed`, err);
}

async function ensureSupabaseSessionLoaded() {
  try {
    await supabase.auth.getSession();
  } catch {}
}

function isUuidLike(s) {
  const v = String(s || '').trim();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

function isWalletLike(s) {
  const v = String(s || '').trim();
  return v.length >= 28 && v.length <= 60;
}

function normalizeFriendCode(input) {
  const v = String(input || '').trim();
  if (!v) return '';
  if (v.toUpperCase().startsWith('CBS-')) return v.slice(4).trim();
  return v;
}

async function requireAuthUserId() {
  await ensureSupabaseSessionLoaded();

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  const uid = data?.user?.id || '';
  if (!uid) throw new Error('No Supabase user session. Please login again.');
  return uid;
}

/**
 * Resolve input -> target user_id
 * Input:
 * - Friend Code "CBS-<uuid>" of "<uuid>"
 * - Wallet address: lookup players.user_id via wallet_pk of solana_pk
 */
async function resolveTargetUserId(inputRaw) {
  const raw = String(inputRaw || '').trim();
  if (!raw) throw new Error('Enter a Friend Code (CBS-...) or a wallet address.');

  const maybeUuid = normalizeFriendCode(raw);
  if (isUuidLike(maybeUuid)) return maybeUuid;

  if (isWalletLike(raw)) {
    // Probeer match op wallet_pk of solana_pk
    const { data, error } = await supabase
      .from(PLAYERS_TABLE)
      .select('user_id')
      .or(`wallet_pk.eq.${raw},solana_pk.eq.${raw}`)
      .maybeSingle();

    if (error) {
      logError('resolveTargetUserId:players_lookup', error);
      throw new Error('Could not lookup that wallet (permissions or network).');
    }

    const uid = data?.user_id || null;
    if (!uid) {
      throw new Error(
        'That wallet is not linked to an email account yet.\nAsk your friend to login with email first, then share their Friend Code.',
      );
    }
    return uid;
  }

  throw new Error('That does not look like a Friend Code or a wallet address.');
}

// ------------------------------------------------------------
// ENRICH HELPERS
// ------------------------------------------------------------

function pickFirstNonEmpty(...vals) {
  for (const v of vals) {
    if (v === undefined || v === null) continue;
    const s = String(v).trim();
    if (s) return s;
  }
  return '';
}

function normalizeNick(v) {
  const s = normalizePlayerNickname(v);
  return s || null;
}

/**
 * Enrich friend entries with:
 * - otherWallet
 * - nickname
 * - avatar
 *
 * Priority:
 * 1) players by user_id (best: avatar + nickname + solana_pk/wallet_pk)
 * 2) player_state by user_id (fallback: nickname + wallet_pk)
 * 3) players by wallet_pk (fallback: avatar + nickname)
 */
async function enrichFriends(list) {
  const arr = Array.isArray(list) ? list : [];
  if (!arr.length) return arr;

  const otherUserIds = Array.from(
    new Set(arr.map((x) => x.otherUserId).filter(Boolean).map(String)),
  );

  // --- 1) players by user_id ---
  let playersByUid = new Map();
  if (otherUserIds.length) {
    const { data: players, error: pErr } = await supabase
      .from(PLAYERS_TABLE)
      .select('user_id, wallet_pk, solana_pk, nickname, avatar')
      .in('user_id', otherUserIds);

    if (pErr) {
      logError('enrich:players_by_user_id', pErr);
    } else if (Array.isArray(players)) {
      playersByUid = new Map(
        players
          .map((p) => {
            const uid = p?.user_id ? String(p.user_id) : '';
            if (!uid) return null;

            const solPk = p.solana_pk ? String(p.solana_pk) : '';
            const walletPk = p.wallet_pk ? String(p.wallet_pk) : '';
            const bestWallet = solPk || walletPk;

            return [
              uid,
              {
                wallet: bestWallet,
                nickname: normalizeNick(p.nickname),
                avatar: p.avatar ? String(p.avatar) : '',
              },
            ];
          })
          .filter(Boolean),
      );
    }
  }

  // --- 2) player_state by user_id (fallback) ---
  let stateByUid = new Map();
  if (otherUserIds.length) {
    const { data: states, error: sErr } = await supabase
      .from(PLAYER_STATE_TABLE)
      .select('user_id, wallet_pk, nickname, last_seen')
      .in('user_id', otherUserIds);

    if (sErr) {
      logError('enrich:player_state_by_user_id', sErr);
    } else if (Array.isArray(states)) {
      stateByUid = new Map(
        states
          .map((s) => {
            const uid = s?.user_id ? String(s.user_id) : '';
            if (!uid) return null;

            return [
              uid,
              {
                wallet: s.wallet_pk ? String(s.wallet_pk) : '',
                nickname: normalizeNick(s.nickname),
              },
            ];
          })
          .filter(Boolean),
      );
    }
  }

  // Merge 1+2 into friends, collect wallets we discovered
  const discoveredWallets = new Set();

  for (const fr of arr) {
    const uid = String(fr.otherUserId || '');
    const p = uid ? playersByUid.get(uid) : null;
    const st = uid ? stateByUid.get(uid) : null;

    const bestWallet = pickFirstNonEmpty(fr.otherWallet, p?.wallet, st?.wallet);
    const bestNick = normalizeNick(p?.nickname || fr.nickname || st?.nickname || '');

    fr.otherWallet = bestWallet || '';
    fr.nickname = bestNick;
    fr.avatar = pickFirstNonEmpty(fr.avatar, p?.avatar, ''); // avatar liefst uit players

    if (fr.otherWallet) discoveredWallets.add(fr.otherWallet);
  }

  // --- 3) players by wallet_pk (avatar fallback) ---
  // Alleen doen voor friends die nog geen avatar hebben.
  const needAvatarWallets = Array.from(
    new Set(
      arr
        .filter((fr) => fr.otherWallet && !String(fr.avatar || '').trim())
        .map((fr) => String(fr.otherWallet).trim())
        .filter(Boolean),
    ),
  );

  if (needAvatarWallets.length) {
    const { data: profs, error: wErr } = await supabase
      .from(PLAYERS_TABLE)
      .select('wallet_pk, solana_pk, nickname, avatar')
      .or(
        // we zoeken match op wallet_pk OF solana_pk
        needAvatarWallets
          .map((w) => `wallet_pk.eq.${w},solana_pk.eq.${w}`)
          .join(','),
      );

    if (wErr) {
      logError('enrich:players_by_wallet', wErr);
    } else if (Array.isArray(profs)) {
      const byWallet = new Map();
      for (const p of profs) {
        const w1 = p?.wallet_pk ? String(p.wallet_pk) : '';
        const w2 = p?.solana_pk ? String(p.solana_pk) : '';
        const nick = normalizeNick(p?.nickname);
        const av = p?.avatar ? String(p.avatar) : '';
        if (w1) byWallet.set(w1, { nick, av });
        if (w2) byWallet.set(w2, { nick, av });
      }

      for (const fr of arr) {
        if (!fr.otherWallet) continue;
        if (String(fr.avatar || '').trim()) continue;

        const info = byWallet.get(String(fr.otherWallet).trim());
        if (!info) continue;

        if (!fr.nickname) fr.nickname = info.nick;
        if (!String(fr.avatar || '').trim()) fr.avatar = info.av || '';
      }
    }
  }

  return arr;
}

// ------------------------------------------------------------
// PUBLIC API
// ------------------------------------------------------------

export async function sendFriendRequest(otherInput) {
  const meUid = await requireAuthUserId();
  const otherUid = await resolveTargetUserId(otherInput);

  if (otherUid === meUid) throw new Error('You cannot add yourself as a friend.');

  const { data: existing, error: exErr } = await supabase
    .from(FRIENDS_TABLE)
    .select('id,a_user,b_user,status')
    .or(`and(a_user.eq.${meUid},b_user.eq.${otherUid}),and(a_user.eq.${otherUid},b_user.eq.${meUid})`)
    .limit(1);

  if (exErr) {
    logError('sendFriendRequest:exists_check', exErr);
    throw new Error('Could not check existing friendships (permissions or network).');
  }

  if (existing && existing.length) {
    const st = existing[0]?.status || '';
    if (st === 'accepted') throw new Error('You are already friends.');
    throw new Error('A friend request already exists between you and this user.');
  }

  const { error } = await supabase.from(FRIENDS_TABLE).insert({
    a_user: meUid,
    b_user: otherUid,
    status: 'pending',
  });

  if (error) {
    logError('sendFriendRequest:insert', error);
    const msg = String(error.message || '').toLowerCase();
    if (msg.includes('duplicate') || msg.includes('unique')) {
      throw new Error('A friend request already exists between you and this user.');
    }
    if (msg.includes('row level security') || msg.includes('rls')) {
      throw new Error('Supabase RLS blocked sending the request. Check policies for "friends_uid".');
    }
    throw new Error('Could not send friend request (permissions or network issue).');
  }

  return { ok: true };
}

export async function acceptFriendRequest(friendId) {
  const meUid = await requireAuthUserId();
  const id = String(friendId || '').trim();
  if (!id) throw new Error('Invalid friend request id.');

  const { data, error } = await supabase
    .from(FRIENDS_TABLE)
    .update({ status: 'accepted' })
    .eq('id', id)
    .eq('b_user', meUid)
    .select('*')
    .maybeSingle();

  if (error) {
    logError('acceptFriendRequest', error);
    const msg = String(error.message || '').toLowerCase();
    if (msg.includes('row level security') || msg.includes('rls')) {
      throw new Error('Supabase RLS blocked accepting the request. Check policies for "friends_uid".');
    }
    throw new Error('Could not accept friend (permissions or network issue).');
  }

  if (!data) throw new Error('Friend request not found or not meant for this account.');
  return { ok: true, friend: data };
}

/**
 * loadFriendsOverview()
 * returns:
 *  {
 *    incoming: [{id, otherUserId, friendCode, nickname, avatar, otherWallet, status, created_at}],
 *    accepted: [{...}]
 *  }
 */
export async function loadFriendsOverview() {
  await ensureSupabaseSessionLoaded();

  let meUid = '';
  try {
    meUid = await requireAuthUserId();
  } catch {
    return { incoming: [], accepted: [] };
  }

  const { data, error } = await supabase
    .from(FRIENDS_TABLE)
    .select('*')
    .or(`a_user.eq.${meUid},b_user.eq.${meUid}`)
    .order('created_at', { ascending: false });

  if (error) {
    logError('loadFriendsOverview', error);
    const msg = String(error.message || '').toLowerCase();
    if (msg.includes('row level security') || msg.includes('rls')) {
      throw new Error('Supabase RLS blocked loading friends. Check policies for "friends_uid".');
    }
    throw new Error('Could not load friends (permissions or network issue).');
  }

  const rows = Array.isArray(data) ? data : [];
  let incoming = [];
  let accepted = [];

  for (const fr of rows) {
    const isIncoming = fr.b_user === meUid && fr.status === 'pending';
    const isAccepted = fr.status === 'accepted' && (fr.a_user === meUid || fr.b_user === meUid);
    if (!isIncoming && !isAccepted) continue;

    const otherUserId = fr.a_user === meUid ? fr.b_user : fr.a_user;

    const base = {
      id: fr.id,
      status: fr.status,
      created_at: fr.created_at,
      otherUserId,
      friendCode: otherUserId ? `CBS-${otherUserId}` : '',
      nickname: null,
      avatar: '',
      otherWallet: '', // ✅ wallet address for copy/gifts
    };

    if (isIncoming) incoming.push(base);
    if (isAccepted) accepted.push(base);
  }

  // ✅ ENRICH (players + player_state + wallet lookup)
  incoming = await enrichFriends(incoming);
  accepted = await enrichFriends(accepted);

  return { incoming, accepted };
}

export async function getMyFriendCode() {
  const uid = await requireAuthUserId();
  return `CBS-${uid}`;
}

// Debug helpers
if (typeof window !== 'undefined') {
  window.cbsgoGetFriendCode = async () => {
    try {
      return await getMyFriendCode();
    } catch (e) {
      console.warn(e);
      return '';
    }
  };
}
