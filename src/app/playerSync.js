// src/app/playerSync.js
// Synchroniseert jou met Supabase + haalt andere spelers op.
//
// - Luistert naar 'cbsgo:playerPos' events
// - Schrijft je positie naar public.player_state (1 row per auth user_id)
// - Haalt elke 10s andere spelers op en stuurt event 'cbsgo:onlinePlayers'
// - ✅ Privacy: shareLocation OFF => lat/lng/heading = null (wel online via last_seen)

import { supabase } from './supabaseClient.js';
import { getPlayerName } from './leaderboard.js';
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

  if (!lastPos) return;

  const now = Date.now();
  if (now - lastSentAt < 5000) return;
  lastSentAt = now;

  const nicknameRaw = getPlayerName() || '';
  const nickname = nicknameRaw.trim() || 'Anon';

  const wallet_pk = getWalletPkSafe();

  // ✅ Privacy: als share OFF => coords null, wel last_seen updaten
  const lat = shareLocation ? lastPos.lat : null;
  const lng = shareLocation ? lastPos.lng : null;
  const heading = shareLocation ? lastPos.heading : null;

  const payload = {
    user_id,
    wallet_pk, // mag null zijn
    nickname,
    lat,
    lng,
    heading,
    last_seen: new Date().toISOString(),
  };

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

    // Profiles ophalen via players table op wallet_pk
    const walletPks = Array.from(
      new Set(
        rows
          .map((r) => r.wallet_pk)
          .filter((v) => typeof v === 'string' && v.length > 0),
      ),
    );

    let profileByWallet = new Map();

    if (walletPks.length > 0) {
      const { data: profiles, error: profileError } = await supabase
        .from('players')
        .select('wallet_pk, avatar, nickname')
        .in('wallet_pk', walletPks);

      if (profileError) {
        console.warn('CBS GO: fetch player profiles failed', profileError);
      } else if (Array.isArray(profiles)) {
        profileByWallet = new Map(
          profiles
            .filter((p) => p && p.wallet_pk)
            .map((p) => [String(p.wallet_pk), p]),
        );
      }
    }

    const players = rows
      .map((row) => {
        const lat = typeof row.lat === 'number' ? row.lat : parseFloat(row.lat);
        const lng = typeof row.lng === 'number' ? row.lng : parseFloat(row.lng);

        // ✅ hidden players (lat/lng null) vallen hier automatisch weg
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

        const pk = row.wallet_pk ? String(row.wallet_pk) : '';
        const profile = pk ? profileByWallet.get(pk) || null : null;

        const nickname = (profile && profile.nickname) || row.nickname || 'Anon';
        const avatar = profile && profile.avatar ? String(profile.avatar) : '';

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
