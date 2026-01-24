// src/app/playerSync.js
// Synchroniseert jou met Supabase + haalt andere spelers op.
//
// - Luistert naar 'cbsgo:playerPos' events
// - Schrijft je positie naar public.player_state (1 row per auth user_id)
// - Haalt elke 10s andere spelers op en stuurt event 'cbsgo:onlinePlayers'

import { supabase } from './supabaseClient.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName } from './leaderboard.js';

const SEND_INTERVAL_MS = 15000; // elke 15s je eigen positie wegschrijven
const FETCH_INTERVAL_MS = 10000; // elke 10s andere spelers ophalen
const ONLINE_WINDOW_MS = 5 * 60 * 1000; // 5 minuten "online" window

let lastPos = null;
let lastSentAt = 0;
let lastFetchAt = 0;

let cachedUserId = null;

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
  } catch {
    // ignore
  }
}

// ---- GPS events ----
function handlePlayerPosEvent(ev) {
  const d = ev?.detail || {};
  if (typeof d.lat !== 'number' || typeof d.lng !== 'number') return;

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

// ---------- eigen positie naar Supabase ----------
async function pushMyState() {
  const user_id = await ensureUserId();
  if (!user_id) return; // niet ingelogd (email login nog niet gedaan)

  const wallet_pk = getPublicKey(); // voorlopig nog lokaal (later vervangen door echte)
  if (!wallet_pk) return;

  if (!lastPos) return;

  const now = Date.now();
  if (now - lastSentAt < 5000) return;
  lastSentAt = now;

  const nicknameRaw = getPlayerName() || '';
  const nickname = nicknameRaw.trim() || 'Anon';

  const payload = {
    user_id, // ✅ belangrijk voor RLS + cross-device
    wallet_pk, // voorlopig nog je lokale key
    nickname,
    lat: lastPos.lat,
    lng: lastPos.lng,
    heading: lastPos.heading,
    last_seen: new Date().toISOString(),
  };

  try {
    // ✅ 1 row per user_id
    const { error } = await supabase
      .from('player_state')
      .upsert(payload, { onConflict: 'user_id' });

    if (error) {
      console.warn('CBS GO: player_state upsert failed', error);
    }
  } catch (e) {
    console.warn('CBS GO: pushMyState error', e);
  }
}

// ---------- andere spelers ophalen ----------
async function fetchOnlinePlayers() {
  const user_id = await ensureUserId();
  if (!user_id) return;

  const wallet_pk = getPublicKey();
  if (!wallet_pk) return;

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

    // profiles ophalen uit players table via wallet_pk (zoals jij al had)
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
        profileByWallet = new Map(profiles.map((p) => [p.wallet_pk, p]));
      }
    }

    const players = rows
      .map((row) => {
        const lat = typeof row.lat === 'number' ? row.lat : parseFloat(row.lat);
        const lng = typeof row.lng === 'number' ? row.lng : parseFloat(row.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

        const profile = profileByWallet.get(row.wallet_pk) || null;
        const nickname = (profile && profile.nickname) || row.nickname || 'Anon';
        const avatar = profile && profile.avatar ? String(profile.avatar) : '';

        return {
          user_id: row.user_id || '',
          wallet_pk: row.wallet_pk || '',
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
      window.dispatchEvent(
        new CustomEvent('cbsgo:onlinePlayers', { detail: { players } }),
      );
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
