// src/app/playerSync.js
// Synchroniseert jou met Supabase + haalt andere spelers op.
// - Luistert naar 'cbsgo:playerPos' events (van steps.js / GPS)
// - Schrijft je positie naar public.player_state
// - Haalt elke 10s andere spelers op en stuurt event 'cbsgo:onlinePlayers'
// Layout en gameplay blijven met rust; dit is alleen netwerkcode.

import { supabase } from './supabaseClient.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName } from './leaderboard.js';

const SEND_INTERVAL_MS = 15000;   // elke 15s je eigen positie wegschrijven
const FETCH_INTERVAL_MS = 10000;  // elke 10s andere spelers ophalen
const ONLINE_WINDOW_MS = 5 * 60 * 1000; // 5 minuten "online" window

let lastPos = null;        // { lat, lng, heading, acc, t }
let lastSentAt = 0;
let lastFetchAt = 0;

// We luisteren naar GPS events die steps.js al uitstuurt
function handlePlayerPosEvent(ev) {
  const d = ev?.detail || {};
  if (typeof d.lat !== 'number' || typeof d.lng !== 'number') return;

  lastPos = {
    lat: d.lat,
    lng: d.lng,
    heading: typeof d.heading === 'number' ? d.heading : null,
    acc: typeof d.acc === 'number' ? d.acc : null,
    t: typeof d.t === 'number' ? d.t : Date.now()
  };
}

if (typeof window !== 'undefined' && !window.__cbsgo_playerPos_listener) {
  window.__cbsgo_playerPos_listener = true;
  window.addEventListener('cbsgo:playerPos', handlePlayerPosEvent);
}

// ---------- eigen positie naar Supabase ----------

async function pushMyState() {
  const wallet_pk = getPublicKey();
  if (!wallet_pk) return;          // nog geen lokale wallet
  if (!lastPos) return;            // nog geen GPS

  const now = Date.now();
  if (now - lastSentAt < 5000) {
    // max 1x per 5s om spam te voorkomen
    return;
  }
  lastSentAt = now;

  const nicknameRaw = getPlayerName() || '';
  const nickname = nicknameRaw.trim() || 'Anon';

  const payload = {
    wallet_pk,
    nickname,
    lat: lastPos.lat,
    lng: lastPos.lng,
    heading: lastPos.heading,
    last_seen: new Date().toISOString()
  };

  try {
    // Kijk of er al een row is voor deze wallet
    const { data: existing, error: selectError } = await supabase
      .from('player_state')
      .select('id')
      .eq('wallet_pk', wallet_pk)
      .limit(1);

    if (selectError) {
      console.warn('CBS GO: player_state select failed', selectError);
      return;
    }

    if (existing && existing.length > 0) {
      const rowId = existing[0].id;
      const { error: updateError } = await supabase
        .from('player_state')
        .update(payload)
        .eq('id', rowId);

      if (updateError) {
        console.warn('CBS GO: player_state update failed', updateError);
      }
    } else {
      const { error: insertError } = await supabase
        .from('player_state')
        .insert(payload);

      if (insertError) {
        console.warn('CBS GO: player_state insert failed', insertError);
      }
    }
  } catch (e) {
    console.warn('CBS GO: pushMyState error', e);
  }
}

// ---------- andere spelers ophalen ----------

async function fetchOnlinePlayers() {
  const wallet_pk = getPublicKey();
  if (!wallet_pk) return;

  const now = Date.now();
  if (now - lastFetchAt < 3000) {
    // max 1x per 3s
    return;
  }
  lastFetchAt = now;

  const sinceIso = new Date(Date.now() - ONLINE_WINDOW_MS).toISOString();

  try {
    const { data, error } = await supabase
      .from('player_state')
      .select('wallet_pk, nickname, lat, lng, heading, last_seen')
      .gt('last_seen', sinceIso);

    if (error) {
      console.warn('CBS GO: fetch online players failed', error);
      return;
    }

    const rows = Array.isArray(data) ? data : [];

    const players = rows
      .map((row) => {
        const rawLat = row.lat;
        const rawLng = row.lng;

        const lat = typeof rawLat === 'number' ? rawLat : parseFloat(rawLat);
        const lng = typeof rawLng === 'number' ? rawLng : parseFloat(rawLng);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null; // overslaan als het geen geldige nummers zijn
        }

        return {
          wallet_pk: row.wallet_pk || '',
          nickname: row.nickname || 'Anon',
          lat,
          lng,
          heading: typeof row.heading === 'number' ? row.heading : null,
          last_seen: row.last_seen,
          isMe: row.wallet_pk === wallet_pk
        };
      })
      .filter(Boolean);

    // Event naar de map-layer
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cbsgo:onlinePlayers', {
          detail: { players }
        })
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

  // Periodiek eigen positie wegschrijven
  setInterval(() => {
    pushMyState();
  }, SEND_INTERVAL_MS);

  // Periodiek andere spelers ophalen
  setInterval(() => {
    fetchOnlinePlayers();
  }, FETCH_INTERVAL_MS);
}

startPlayerSyncLoops();
