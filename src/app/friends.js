// src/app/friends.js
// Friends via Supabase (AUTH USER ID based) ✅
// ------------------------------------------------------------
// Doel:
// - Friends blijven bestaan als wallet verandert (new wallet).
// - Identity = supabase auth user_id (email login).
// - UI kan nog steeds wallet address tonen + copy (uit players tabel).
//
// DB schema verwacht:
//   TABLE friends_uid (id uuid, a_user uuid, b_user uuid, status text, created_at timestamptz)
//   TABLE players (wallet_pk text, nickname text, avatar text, user_id uuid, ...)
// (players.user_id wordt al gezet in onlinePlayers.js)

import { supabase } from './supabaseClient.js';

const FRIENDS_TABLE = 'friends_uid';
const PLAYERS_TABLE = 'players';

function logError(ctx, err) {
  console.warn(`CBS GO friends(uid): ${ctx} failed`, err);
}

async function ensureSupabaseSessionLoaded() {
  // Triggert het laden van session uit localStorage (handig op desktop/Edge)
  try {
    await supabase.auth.getSession();
  } catch {
    // ignore
  }
}

function isUuidLike(s) {
  const v = String(s || '').trim();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

function isWalletLike(s) {
  // Solana base58 is vaak 32-44 chars. We houden het simpel.
  const v = String(s || '').trim();
  return v.length >= 28 && v.length <= 60;
}

function normalizeFriendCode(input) {
  // We gebruiken: CBS-<FULL-UUID>
  // Voor later kunnen we hier ook andere formats ondersteunen.
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
 * Input kan zijn:
 * - Friend Code: "CBS-<uuid>" of "<uuid>"
 * - Wallet address: we zoeken user_id via players.wallet_pk
 */
async function resolveTargetUserId(inputRaw) {
  const raw = String(inputRaw || '').trim();
  if (!raw) throw new Error('Enter a Friend Code (CBS-...) or a wallet address.');

  // 1) Friend code / uuid direct
  const maybeUuid = normalizeFriendCode(raw);
  if (isUuidLike(maybeUuid)) return maybeUuid;

  // 2) Wallet -> lookup user_id via players
  if (isWalletLike(raw)) {
    const { data, error } = await supabase
      .from(PLAYERS_TABLE)
      .select('user_id')
      .eq('wallet_pk', raw)
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
// PUBLIC API (zelfde exports als je appShell verwacht)
// ------------------------------------------------------------

/**
 * sendFriendRequest(input)
 * input: Friend Code (CBS-<uuid>) OF wallet address
 */
export async function sendFriendRequest(otherInput) {
  const meUid = await requireAuthUserId();
  const otherUid = await resolveTargetUserId(otherInput);

  if (otherUid === meUid) {
    throw new Error('You cannot add yourself as a friend.');
  }

  // Check bestaande relatie in beide richtingen
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
    if (st === 'accepted') {
      throw new Error('You are already friends.');
    }
    throw new Error('A friend request already exists between you and this user.');
  }

  // Insert (a_user = sender, b_user = receiver)
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

  // Alleen receiver (b_user) mag accepteren door policy
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
 *    incoming: [{id, otherUserId, nickname, avatar, otherWallet, status, created_at}],
 *    accepted: [{...}]
 *  }
 *
 * NOTE: otherWallet komt uit players.wallet_pk (kan veranderen bij new wallet),
 * maar vriendenrelatie blijft door user_id.
 */
export async function loadFriendsOverview() {
  await ensureSupabaseSessionLoaded();

  // Als user nog niet ingelogd is: leeg terug
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
  const incoming = [];
  const accepted = [];

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
      nickname: null,
      avatar: '',
      otherWallet: '', // uit players
    };

    if (isIncoming) incoming.push(base);
    if (isAccepted) accepted.push(base);
  }

  // Enrich via players (nickname, avatar, wallet_pk) op user_id
  const allUserIds = Array.from(new Set([...incoming, ...accepted].map((x) => x.otherUserId).filter(Boolean)));

  if (allUserIds.length) {
    const { data: players, error: pErr } = await supabase
      .from(PLAYERS_TABLE)
      .select('user_id, wallet_pk, nickname, avatar')
      .in('user_id', allUserIds);

    if (!pErr && Array.isArray(players)) {
      const byUid = new Map();
      for (const p of players) {
        if (!p.user_id) continue;
        byUid.set(String(p.user_id), {
          wallet_pk: p.wallet_pk || '',
          nickname: p.nickname || null,
          avatar: p.avatar || '',
        });
      }

      const enrich = (arr) => {
        arr.forEach((fr) => {
          const info = byUid.get(fr.otherUserId);
          if (!info) return;
          fr.nickname = info.nickname || null;
          fr.avatar = info.avatar || '';
          fr.otherWallet = info.wallet_pk || '';
        });
      };

      enrich(incoming);
      enrich(accepted);
    } else if (pErr) {
      logError('loadFriendsOverview:players', pErr);
      // Fallback: geen nickname/wallet, UI kan nog steeds friend code tonen
    }
  }

  return { incoming, accepted };
}

// ------------------------------------------------------------
// Extra helpers (handig voor UI later)
// ------------------------------------------------------------

export async function getMyFriendCode() {
  const uid = await requireAuthUserId();
  return `CBS-${uid}`;
}

// Debug helpers in console
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
