// src/app/playerSync.js
// Synchroniseert jou met Supabase + haalt andere spelers op.
//
// - Luistert naar 'cbsgo:playerPos' events
// - Schrijft je positie naar public.player_state (1 row per auth user_id)
// - Haalt elke 10s andere spelers op en stuurt event 'cbsgo:onlinePlayers'
// - ✅ Privacy: shareLocation OFF => lat/lng/heading = null (wel online via last_seen)

import { supabase } from './supabaseClient.js';
import { getPlayerName, getPlayerAvatar } from './leaderboard.js';
import {
  getProfileGateContext,
  hasValidPlayerAvatar,
  hasValidPlayerNickname,
  isProfileComplete,
  normalizePlayerNickname,
} from './playerNickname.js';
import { getLocalPublicKey } from './solanaLocalWallet.js';

const SEND_INTERVAL_MS = 15000; // elke 15s je eigen positie wegschrijven
const FETCH_INTERVAL_MS = 10000; // elke 10s andere spelers ophalen
const ONLINE_WINDOW_MS = 5 * 60 * 1000; // 5 minuten "online" window

let lastPos = null;
let lastSentAt = 0;
let lastFetchAt = 0;

let cachedUserId = null;

// 🙈 Share-location state (default ON)
let shareLocation = (localStorage.getItem('cbsgo_shareLocation') ?? '1') === '1';

async function ensureUserId() {
  if (cachedUserId) return cachedUserId;

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    cachedUserId = data?.user?.id || null;
    return cachedUserId;
  } catch {
    return null;
  }
}

// refresh cache als auth verandert
if (typeof window !== 'undefined' && !window.__cbsgo_auth_listener) {
  window.__cbsgo_auth_listener = true;
  try {
    supabase.auth.onAuthStateChange((_event, session) => {
      cachedUserId = session?.user?.id || null;
    });
  } catch {}
}

// ---- GPS events ----
function handlePlayerPosEvent(ev) {
  const d = ev?.detail || {};
  if (typeof d.lat !== 'number' || typeof d.lng !== 'number') return;

  // shareLocation kan meeliften vanuit mapView
  if (typeof d.shareLocation === 'boolean') {
    shareLocation = d.shareLocation;
    localStorage.setItem('cbsgo_shareLocation', shareLocation ? '1' : '0');
  }

  lastPos = {
    lat: d.lat,
    lng: d.lng,
    heading: typeof d.heading === 'number' ? d.heading : null,
    acc: typeof d.acc === 'number' ? d.acc : null,
    t: typeof d.t === 'number' ? d.t : Date.now(),
  };
}

if (typeof window !== 'undefined' && !window.__cbsgo_playerPos_listener) {
  window.__cbsgo_playerPos_listener = true;
  window.addEventListener('cbsgo:playerPos', handlePlayerPosEvent);
}

// ---- Share toggle event (🙈/📍 knop) ----
function handleShareToggle(ev) {
  const v = ev?.detail?.shareLocation;
  if (typeof v !== 'boolean') return;
  shareLocation = v;
  localStorage.setItem('cbsgo_shareLocation', shareLocation ? '1' : '0');
}

if (typeof window !== 'undefined' && !window.__cbsgo_shareLocation_listener) {
  window.__cbsgo_shareLocation_listener = true;
  window.addEventListener('cbsgo:shareLocation', handleShareToggle);
}

// ---------- helpers ----------
function canSyncOwnPlayerState(userId = null) {
  const { authUser, walletPk: ctxWallet } = getProfileGateContext();
  const walletPk = getWalletPkSafe() || ctxWallet || null;
  const authCandidate = authUser || (userId ? { id: userId } : null);

  return isProfileComplete({
    authUser: authCandidate,
    walletPk,
    nickname: getPlayerName(),
    avatar: getPlayerAvatar(),
  });
}

function isCompleteOnlinePlayer({ user_id, wallet_pk, nickname, avatar }) {
  const uid = user_id ? String(user_id).trim() : '';
  const pk = wallet_pk ? String(wallet_pk).trim() : '';
  if (!uid && !pk) return false;
  if (!hasValidPlayerNickname(nickname)) return false;
  if (!hasValidPlayerAvatar(avatar)) return false;
  return true;
}

function getWalletPkSafe() {
  try {
    // 1) direct import
    const pk = typeof getLocalPublicKey === 'function' ? getLocalPublicKey() : null;
    if (pk) return String(pk);

    // 2) compat: appShell exposes window.getLocalPublicKey()
    if (typeof window !== 'undefined' && typeof window.getLocalPublicKey === 'function') {
      const pk2 = window.getLocalPublicKey();
      if (pk2) return String(pk2);
    }

    // 3) legacy/global fallback
    const v = globalThis?.cbsgoWalletPublicKey || null;
    return v ? String(v) : null;
  } catch {
    return null;
  }
}

// ---------- eigen positie naar Supabase ----------
async function pushMyState() {
  const user_id = await ensureUserId();
  if (!user_id) return; // niet ingelogd

  if (!canSyncOwnPlayerState(user_id)) return;

  if (!lastPos) return;

  const now = Date.now();
  if (now - lastSentAt < 5000) return;
  lastSentAt = now;

  const nickname = normalizePlayerNickname(getPlayerName());
  if (!nickname) return;

  const wallet_pk = getWalletPkSafe();

  // ✅ Privacy: als share OFF => coords null, wel last_seen updaten
  const lat = shareLocation ? lastPos.lat : null;
  const lng = shareLocation ? lastPos.lng : null;
  const heading = shareLocation ? lastPos.heading : null;

  const payload = {
    user_id,
    wallet_pk, // mag null zijn
    lat,
    lng,
    heading,
    last_seen: new Date().toISOString(),
  };

  if (nickname) payload.nickname = nickname;

  try {
    const { error } = await supabase.from('player_state').upsert(payload, { onConflict: 'user_id' });
    if (error) console.warn('CBS GO: player_state upsert failed', error);
  } catch (e) {
    console.warn('CBS GO: pushMyState error', e);
  }
}

// ---------- andere spelers ophalen ----------
async function fetchOnlinePlayers() {
  const user_id = await ensureUserId();
  if (!user_id) return;

  if (!canSyncOwnPlayerState(user_id)) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cbsgo:onlinePlayers', { detail: { players: [] } }));
    }
    return;
  }

  const now = Date.now();
  if (now - lastFetchAt < 3000) return;
  lastFetchAt = now;

  const sinceIso = new Date(Date.now() - ONLINE_WINDOW_MS).toISOString();

  try {
    const { data, error } = await supabase
      .from('player_state')
      .select('user_id, wallet_pk, nickname, lat, lng, heading, last_seen')
      .gt('last_seen', sinceIso);

    if (error) {
      console.warn('CBS GO: fetch online players failed', error);
      return;
    }

    const rows = Array.isArray(data) ? data : [];

    // Profielen ophalen:
    // 1) game_profiles op user_id (beste bron voor avatar)
    // 2) players op user_id
    // 3) players op wallet_pk fallback
    const userIds = Array.from(
      new Set(
        rows
          .map((r) => r.user_id)
          .filter((v) => typeof v === 'string' && v.length > 0),
      ),
    );

    const walletPks = Array.from(
      new Set(
        rows
          .map((r) => r.wallet_pk)
          .filter((v) => typeof v === 'string' && v.length > 0),
      ),
    );

    let gameProfileByUserId = new Map();
    let playersByUserId = new Map();
    let playersByWallet = new Map();

    if (userIds.length > 0) {
      const { data: gameProfiles, error: gpErr } = await supabase
        .from('game_profiles')
        .select('user_id, nickname, avatar, wallet_pk')
        .in('user_id', userIds);

      if (gpErr) {
        console.warn('CBS GO: fetch game_profiles failed', gpErr);
      } else if (Array.isArray(gameProfiles)) {
        gameProfileByUserId = new Map(
          gameProfiles
            .filter((p) => p && p.user_id)
            .map((p) => [String(p.user_id), p]),
        );
      }

      const { data: playerProfiles, error: pErr } = await supabase
        .from('players')
        .select('user_id, wallet_pk, nickname, avatar')
        .in('user_id', userIds);

      if (pErr) {
        console.warn('CBS GO: fetch players by user_id failed', pErr);
      } else if (Array.isArray(playerProfiles)) {
        playersByUserId = new Map(
          playerProfiles
            .filter((p) => p && p.user_id)
            .map((p) => [String(p.user_id), p]),
        );

        for (const p of playerProfiles) {
          if (p?.wallet_pk) playersByWallet.set(String(p.wallet_pk), p);
        }
      }
    }

    if (walletPks.length > 0) {
      const missingWallets = walletPks.filter((pk) => !playersByWallet.has(String(pk)));

      if (missingWallets.length > 0) {
        const { data: walletProfiles, error: wpErr } = await supabase
          .from('players')
          .select('user_id, wallet_pk, nickname, avatar')
          .in('wallet_pk', missingWallets);

        if (wpErr) {
          console.warn('CBS GO: fetch players by wallet_pk failed', wpErr);
        } else if (Array.isArray(walletProfiles)) {
          for (const p of walletProfiles) {
            if (p?.wallet_pk) playersByWallet.set(String(p.wallet_pk), p);
            if (p?.user_id && !playersByUserId.has(String(p.user_id))) {
              playersByUserId.set(String(p.user_id), p);
            }
          }
        }
      }
    }

    const players = rows
      .map((row) => {
        const lat = typeof row.lat === 'number' ? row.lat : parseFloat(row.lat);
        const lng = typeof row.lng === 'number' ? row.lng : parseFloat(row.lng);

        // ✅ hidden players (lat/lng null) vallen hier automatisch weg
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

        const uid = row.user_id ? String(row.user_id) : '';
        const pk = row.wallet_pk ? String(row.wallet_pk) : '';

        const gameProfile = uid ? gameProfileByUserId.get(uid) || null : null;
        const playerProfile =
          (uid && playersByUserId.get(uid)) ||
          (pk && playersByWallet.get(pk)) ||
          null;

        const nickname = normalizePlayerNickname(
          (gameProfile && gameProfile.nickname) ||
            (playerProfile && playerProfile.nickname) ||
            row.nickname ||
            '',
        );

        const avatar =
          (gameProfile && gameProfile.avatar ? String(gameProfile.avatar).trim() : '') ||
          (playerProfile && playerProfile.avatar ? String(playerProfile.avatar).trim() : '');

        if (!isCompleteOnlinePlayer({ user_id: uid, wallet_pk: pk, nickname, avatar })) {
          return null;
        }

        return {
          user_id: row.user_id || '',
          wallet_pk: pk,
          nickname,
          avatar,
          lat,
          lng,
          heading: typeof row.heading === 'number' ? row.heading : null,
          last_seen: row.last_seen,
          isMe: row.user_id === user_id,
        };
      })
      .filter(Boolean);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cbsgo:onlinePlayers', { detail: { players } }));
    }
  } catch (e) {
    console.warn('CBS GO: fetchOnlinePlayers error', e);
  }
}

// ---------- loops starten ----------
function startPlayerSyncLoops() {
  if (typeof window === 'undefined') return;
  if (window.__cbsgo_playerSync_started) return;
  window.__cbsgo_playerSync_started = true;

  setInterval(() => {
    pushMyState();
  }, SEND_INTERVAL_MS);

  setInterval(() => {
    fetchOnlinePlayers();
  }, FETCH_INTERVAL_MS);
}

startPlayerSyncLoops();
