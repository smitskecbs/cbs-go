// src/ui/mapView.maplibre.js
// CBS GO — MapLibre game map (stable build)
//
// Loot update:
// ✅ Loot is BLACK SQUARE + ⭐ (direction-agnostic, never upside-down)
// ✅ Glow on ⭐ indicates loot quality/rarity (stronger = rarer/better)
//
// Ring fix (MOBILE HARD FIX):
// ✅ Pickup ring layers are forced to the TOP (moveLayer) so they can’t be hidden
// ✅ Retry-safe timing for mobile style load
// ✅ Re-applied on styledata + idle + gps + move/moveend + mode switch
//
// Friends update (WORLDWIDE + SAME SIZE AS YOU):
// ✅ Friend PF size matches player PF (42px core)
// ✅ Friend scale stays ~1.0 (also visible on globe)
// ✅ Your PF always on top (player zIndex 2000)
// ✅ If friend is in Netherlands, friend zIndex is forced lower (so you always win overlap in NL)

import maplibregl from 'maplibre-gl';
import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';
import { openPuzzleModal } from './puzzleModal.js';

/* -------------------- CONFIG -------------------- */

const OPEN_WEATHER_API_KEY = '48a387bba00043ac4ba5823371abc9d2';

const PICKUP_RADIUS_M = 80;

// Loot spawns (meters)
const LOOT_ENABLED = true;
const LOOT_MAX_ACTIVE = 6;
const LOOT_SPAWN_MIN_DISTANCE_M = 70;
const LOOT_SPAWN_MAX_DISTANCE_M = 140;
const LOOT_RESPAWN_MS = 45_000;
const LOOT_DESPAWN_AGE_MS = 5 * 60_000;
const LOOT_DESPAWN_DIST_M = 260;

// Puzzle
const PUZZLES_ENABLED = true;
const PUZZLE_MAX_ACTIVE = 1;
const PUZZLE_SPAWN_CHUNK_M = 240;
const PUZZLE_SPAWN_CHANCE = 0.35;
const FIRST_PUZZLE_MIN_METERS = 90;

// Camera
const FOLLOW_ZOOM = 19.2;
const PLAYER_VIEW_DURATION_MS = 700;
const WORLD_VIEW_DURATION_MS = 700;

// Visibility
const RING_HIDE_BELOW_ZOOM = 0; // ring altijd zichtbaar in player-mode
const LOOT_HIDE_BELOW_ZOOM = 12.8;

// Rotate map with heading (player-mode)
const ROTATE_MAP_WITH_HEADING = true;
const ROTATE_DURATION_MS = 220;
const ROTATE_MIN_DEG_DELTA = 2;
const ROTATE_THROTTLE_MS = 120;

// Phone orientation rotate
const ROTATE_MAP_WITH_PHONE = true;
const PHONE_ROTATE_THROTTLE_MS = 120;
const PHONE_ROTATE_MIN_DEG_DELTA = 2;
const PHONE_ROTATE_SMOOTH = 0.18;
const PHONE_HEADING_PRIORITY = true;

// Fallback (als GPS er nog niet is)
const FALLBACK_CENTER = [4.87, 51.687]; // [lng, lat]
const FALLBACK_ZOOM = 15.5;

// World start
const WORLD_CENTER = [10, 25];
const WORLD_ZOOM = 1.55;

// Auto switch from world -> player when user zooms in far enough
const AUTO_SWITCH_TO_PLAYER_ZOOM = 10.5;

// Auto switch back from player -> world when zoomed out far enough
const AUTO_SWITCH_TO_WORLD_ZOOM = 4.2;

// Projection
const USE_TRUE_GLOBE = true;

/* -------------------- STATE -------------------- */

let map = null;
let destroyed = false;

let lastUserLatLng = null; // [lat,lng]
let lastHeadingDeg = 0;

let inWorldMode = true;
let hasGpsFix = false;

// rotate state
let lastBearingAt = 0;

// phone state
let phoneHeadingDeg = null;
let phoneHeadingSmoothed = null;
let lastPhoneBearingAt = 0;
let phoneListenerOn = false;

// loot/puzzle
let lootItems = []; // { id, lat, lng, createdAt, reward, marker, rootEl, scaleEl, kind }
let activePuzzle = null; // { id, lat, lng, marker, rootEl, scaleEl }
let lastLootSpawnAt = 0;
let puzzleMeters = 0;
let firstPuzzleSpawned = false;

// friends
let friendMarkers = new Map(); // user_id -> { marker, rootEl, scaleEl, lat, lng, nickname, avatar, t }
let lastOnlinePlayers = []; // cached

// privacy state
let shareLocation = (localStorage.getItem('cbsgo_shareLocation') ?? '1') === '1';

// weather/place
let weatherAbort = null;
let placeAbort = null;
let lastWeatherLatLng = null;

let weatherState = {
  temp: null,
  iconEmoji: '⛅',
  condition: 'clear',
  isNight: false,
  lastUpdated: 0,
};

let locationState = {
  place: null,
  lastUpdated: 0,
};

let lastPlaceCellKey = null;

// UI handle
let worldBtnEl = null;

// window listeners guard
let resizeListenersOn = false;

// ✅ autoswitch only after user interaction in world
let worldUserInteracted = false;

// ✅ block autoswitch during boot/init
let mapBooting = true;

/* -------------------- HELPERS -------------------- */

function ensureEl(id) {
  return document.getElementById(id);
}

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function initialsFromName(nameOverride) {
  const n = String(nameOverride ?? getPlayerName() ?? '').trim();
  if (!n) return '🙂';
  return n[0].toUpperCase();
}

function wrap360(deg) {
  let d = Number(deg);
  if (!Number.isFinite(d)) return 0;
  d = ((d % 360) + 360) % 360;
  return d;
}

function shortestAngleDeltaDeg(a, b) {
  return ((((b - a) % 360) + 540) % 360) - 180;
}

function safeMapBearing() {
  try {
    return map ? wrap360(map.getBearing()) : 0;
  } catch {
    return 0;
  }
}

function getZoom() {
  try {
    return map ? map.getZoom() : 0;
  } catch {
    return 0;
  }
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function metersBetween(a, b) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(s));
}

function randomNearbyLatLng(center, minM, maxM) {
  const r = minM + Math.random() * (maxM - minM);
  const ang = Math.random() * 2 * Math.PI;
  const dLat = (r * Math.cos(ang)) / 111111;
  const dLng =
    (r * Math.sin(ang)) / (111111 * Math.cos((center.lat * Math.PI) / 180));
  return { lat: center.lat + dLat, lng: center.lng + dLng };
}

function computeHeadingDeg(prev, cur) {
  const toRad = (x) => (x * Math.PI) / 180;
  const lat1 = toRad(prev.lat);
  const lat2 = toRad(cur.lat);
  const dLng = toRad(cur.lng - prev.lng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  let brng = Math.atan2(y, x);
  brng = (brng * 180) / Math.PI;
  brng = (brng + 360) % 360;
  return brng;
}

function shouldShowRing() {
  if (!map) return false;
  if (inWorldMode) return false;
  return getZoom() >= RING_HIDE_BELOW_ZOOM;
}

function shouldShowGameplayMarkers() {
  if (!map) return false;
  if (inWorldMode) return false;
  return getZoom() >= LOOT_HIDE_BELOW_ZOOM;
}

// ✅ NL bbox: if friend is in NL, keep them lower zIndex so you always win overlap in NL
function isInNetherlands(lat, lng) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= 50.75 &&
    lat <= 53.60 &&
    lng >= 3.20 &&
    lng <= 7.25
  );
}

/* -------------------- PRIVACY / FRIEND VISIBILITY -------------------- */

function truthyShareValue(v) {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    return s === '1' || s === 'true' || s === 'yes' || s === 'on';
  }
  return null; // unknown
}

/**
 * Show rule:
 * - If share flag exists and is explicitly false => hide.
 * - Else if lat/lng exists => show.
 * - Else hide.
 */
function playerSharesLocation(p) {
  if (!p) return false;
  const hasCoords = Number.isFinite(p.lat) && Number.isFinite(p.lng);

  if ('shareLocation' in p) {
    const v = truthyShareValue(p.shareLocation);
    if (v === false) return false;
    if (v === true) return true;
    return hasCoords;
  }
  if ('share_location' in p) {
    const v = truthyShareValue(p.share_location);
    if (v === false) return false;
    if (v === true) return true;
    return hasCoords;
  }
  if ('share_loc' in p) {
    const v = truthyShareValue(p.share_loc);
    if (v === false) return false;
    if (v === true) return true;
    return hasCoords;
  }
  if ('share' in p) {
    const v = truthyShareValue(p.share);
    if (v === false) return false;
    if (v === true) return true;
    return hasCoords;
  }

  return hasCoords;
}

/* -------------------- SAFE MARKER SCALING -------------------- */
/**
 * CRUCIAL:
 * - NEVER set `transform` on MapLibre marker root element (MapLibre uses it for positioning).
 * - We only scale an INNER wrapper (scaleEl).
 */

function lootScaleForZoom(z) {
  // z=19 -> ~1.00, z=13 -> ~0.48, z=11 -> ~0.34
  return clamp(0.34 + (z - 11) * 0.055, 0.26, 1.0);
}

// ✅ Friend same size as you: keep scale around 1.0 even on globe
function friendScaleForZoom(z) {
  // On extreme world zoom: tiny reduction to avoid total overlap clutter
  if (z <= 2.5) return 0.95;
  if (z <= 4.5) return 1.0;
  return 1.0;
}

function applyAllMarkerScales() {
  if (!map) return;
  const z = getZoom();

  const ls = lootScaleForZoom(z);
  lootItems.forEach((it) => {
    if (!it?.scaleEl) return;
    it.scaleEl.style.transform = `translateZ(0) scale(${ls})`;
  });

  if (activePuzzle?.scaleEl) {
    activePuzzle.scaleEl.style.transform = `translateZ(0) scale(${ls})`;
  }

  const fs = friendScaleForZoom(z);
  friendMarkers.forEach((fm) => {
    if (!fm?.scaleEl) return;
    fm.scaleEl.style.transform = `translateZ(0) scale(${fs})`;
  });
}

/* -------------------- TOAST -------------------- */

let toastTimer = null;

function showToast(msg, ms = 1600) {
  const el = ensureEl('cbsgoToast');
  if (!el) return;

  el.textContent = String(msg || '');
  el.style.display = 'block';

  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(-4px)';
  });

  try {
    clearTimeout(toastTimer);
  } catch {}
  toastTimer = setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(0px)';
    setTimeout(() => {
      el.style.display = 'none';
    }, 170);
  }, ms);
}

/* -------------------- PICKUP RING -------------------- */

const SRC_RANGE = 'cbsgo-range-src';
const LYR_RANGE_FILL = 'cbsgo-range-fill';
const LYR_RANGE_LINE = 'cbsgo-range-line';

function destinationPoint(lat, lng, bearingDeg, distanceM) {
  const R = 6371000;
  const br = (bearingDeg * Math.PI) / 180;
  const φ1 = (lat * Math.PI) / 180;
  const λ1 = (lng * Math.PI) / 180;
  const δ = distanceM / R;

  const sinφ1 = Math.sin(φ1);
  const cosφ1 = Math.cos(φ1);
  const sinδ = Math.sin(δ);
  const cosδ = Math.cos(δ);

  const sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * Math.cos(br);
  const φ2 = Math.asin(sinφ2);

  const y = Math.sin(br) * sinδ * cosφ1;
  const x = cosδ - sinφ1 * sinφ2;
  const λ2 = λ1 + Math.atan2(y, x);

  const lat2 = (φ2 * 180) / Math.PI;
  const lng2 = (((λ2 * 180) / Math.PI + 540) % 360) - 180;
  return [lng2, lat2];
}

function circlePolygonGeodesic(lat, lng, radiusM, steps = 112) {
  const coords = [];
  for (let i = 0; i <= steps; i++) {
    const b = (i / steps) * 360;
    coords.push(destinationPoint(lat, lng, b, radiusM));
  }
  return {
    type: 'Feature',
    properties: {},
    geometry: { type: 'Polygon', coordinates: [coords] },
  };
}

// ✅ MOBILE HARD FIX: force layers to top so ring can’t be hidden
function elevateRangeLayers() {
  if (!map) return;
  if (!map.isStyleLoaded()) return;

  try {
    if (map.getLayer(LYR_RANGE_FILL)) map.moveLayer(LYR_RANGE_FILL);
  } catch {}
  try {
    if (map.getLayer(LYR_RANGE_LINE)) map.moveLayer(LYR_RANGE_LINE);
  } catch {}
}

function ensureRangeLayers() {
  if (!map) return;
  if (!map.isStyleLoaded()) return;

  try {
    if (!map.getSource(SRC_RANGE)) {
      map.addSource(SRC_RANGE, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
    }

    if (!map.getLayer(LYR_RANGE_FILL)) {
      map.addLayer({
        id: LYR_RANGE_FILL,
        type: 'fill',
        source: SRC_RANGE,
        paint: {
          // zichtbaarder op mobiel
          'fill-color': 'rgba(56,189,248,0.22)',
          'fill-outline-color': 'rgba(56,189,248,0.0)',
        },
      });
    }

    if (!map.getLayer(LYR_RANGE_LINE)) {
      map.addLayer({
        id: LYR_RANGE_LINE,
        type: 'line',
        source: SRC_RANGE,
        paint: {
          'line-color': 'rgba(56,189,248,0.95)',
          'line-width': 3.5,
          'line-dasharray': [2, 3],
        },
      });
    }
  } catch {
    // Timing issues on mobile: if addLayer fails, next retry fixes it
  }

  elevateRangeLayers();
}

function clearPickupRing() {
  if (!map || !map.isStyleLoaded()) return;
  const src = map.getSource(SRC_RANGE);
  if (src) src.setData({ type: 'FeatureCollection', features: [] });
}

/**
 * ✅ HARD ring fix:
 * - Retries until style is loaded (mobile timing)
 * - Re-adds layers if needed
 * - Forces layers to TOP (moveLayer)
 * - Only shows in player-mode
 */
function forceUpdatePickupRing(lat, lng, tries = 0) {
  if (!map || destroyed) return;
  if (inWorldMode) return;

  if (!map.isStyleLoaded()) {
    if (tries < 40) setTimeout(() => forceUpdatePickupRing(lat, lng, tries + 1), 120);
    return;
  }

  ensureRangeLayers(); // will also elevate
  elevateRangeLayers(); // extra hard push
  const src = map.getSource(SRC_RANGE);
  if (!src) {
    if (tries < 40) setTimeout(() => forceUpdatePickupRing(lat, lng, tries + 1), 120);
    return;
  }

  if (!shouldShowRing()) {
    src.setData({ type: 'FeatureCollection', features: [] });
    return;
  }

  src.setData({
    type: 'FeatureCollection',
    features: [circlePolygonGeodesic(lat, lng, PICKUP_RADIUS_M)],
  });

  elevateRangeLayers();
}

/* -------------------- PLAYER MARKER -------------------- */

let playerArrowEl = null;
let arrowDegSmoothed = null;

function buildPlayerEl() {
  const av = getPlayerAvatar();

  const wrap = document.createElement('div');
  wrap.className = 'cbsgo-player cbsgo-marker-player';
  wrap.style.zIndex = '2000';
  wrap.style.pointerEvents = 'none';

  const glow = document.createElement('div');
  glow.className = 'cbsgo-player-glow';
  wrap.appendChild(glow);

  const core = document.createElement('div');
  core.className = 'cbsgo-player-core';

  if (av) {
    const img = document.createElement('img');
    img.src = av;
    img.alt = 'me';
    img.width = 42;
    img.height = 42;
    img.decoding = 'async';
    img.loading = 'eager';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    core.textContent = '';
    core.appendChild(img);
  } else {
    core.textContent = initialsFromName();
  }

  wrap.appendChild(core);

  const arrow = document.createElement('div');
  arrow.className = 'cbsgo-player-arrow';
  wrap.appendChild(arrow);

  return { wrap, arrow };
}

function updatePlayerArrow() {
  if (!playerArrowEl) return;

  const bearing = safeMapBearing();
  const target = wrap360(wrap360(lastHeadingDeg) - bearing);

  if (arrowDegSmoothed == null) arrowDegSmoothed = target;

  const diff = shortestAngleDeltaDeg(arrowDegSmoothed, target);
  arrowDegSmoothed = wrap360(arrowDegSmoothed + diff * 0.22);

  playerArrowEl.style.setProperty('--deg', `${arrowDegSmoothed}deg`);
}

let playerMarker = null;

function ensurePlayerMarker(lat, lng) {
  if (!map) return;

  if (!playerMarker) {
    const { wrap, arrow } = buildPlayerEl();
    playerArrowEl = arrow;

    playerMarker = new maplibregl.Marker({
      element: wrap,
      anchor: 'center',
    })
      .setLngLat([lng, lat])
      .addTo(map);
  } else {
    playerMarker.setLngLat([lng, lat]);
  }

  updatePlayerArrow();

  // ✅ Force ring in player-mode, always (mobile hard)
  if (!inWorldMode) {
    forceUpdatePickupRing(lat, lng);
  }

  syncGameplayMarkerVisibility();
}

function refreshPlayerLooks() {
  try {
    playerMarker?.remove?.();
  } catch {}
  playerMarker = null;
  playerArrowEl = null;
  arrowDegSmoothed = null;

  if (lastUserLatLng) {
    ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
  }
}

/* -------------------- FRIEND MARKERS (WORLDWIDE) -------------------- */

function buildFriendEl(nickname, avatar, lat, lng) {
  const root = document.createElement('div');
  root.className = 'cbsgo-marker-root';
  root.style.pointerEvents = 'none';

  // ✅ Under player always; extra under if friend is in NL
  root.style.zIndex = isInNetherlands(lat, lng) ? '1200' : '1400';

  const scale = document.createElement('div');
  scale.className = 'cbsgo-scale';
  scale.style.transformOrigin = 'center center';
  scale.style.willChange = 'transform';

  const bubble = document.createElement('div');
  bubble.className = 'cbsgo-friend';
  bubble.title = nickname ? String(nickname) : 'Player';

  const core = document.createElement('div');
  core.className = 'cbsgo-friend-core';

  if (avatar) {
    const img = document.createElement('img');
    img.src = String(avatar);
    img.alt = nickname || 'friend';
    img.width = 42;
    img.height = 42;
    img.decoding = 'async';
    img.loading = 'eager';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    core.appendChild(img);
  } else {
    core.textContent = initialsFromName(nickname);
  }

  const label = document.createElement('div');
  label.className = 'cbsgo-friend-label';
  label.textContent = nickname ? String(nickname).slice(0, 18) : 'Player';

  bubble.appendChild(core);
  bubble.appendChild(label);

  scale.appendChild(bubble);
  root.appendChild(scale);

  return { rootEl: root, scaleEl: scale };
}

function upsertFriendMarkers(players) {
  if (!map) return;
  const now = Date.now();

  const arr = Array.isArray(players) ? players : [];
  lastOnlinePlayers = arr;

  const seen = new Set();

  for (const p of arr) {
    if (!p) continue;
    if (p.isMe) continue;
    if (!playerSharesLocation(p)) continue;
    if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) continue;

    const id = String(p.user_id || p.wallet_pk || p.uid || p.id || '');
    if (!id) continue;

    seen.add(id);

    const nick = p.nickname || 'Player';
    const avatar = p.avatar || '';

    let fm = friendMarkers.get(id);

    if (!fm) {
      const { rootEl, scaleEl } = buildFriendEl(nick, avatar, p.lat, p.lng);

      const marker = new maplibregl.Marker({
        element: rootEl,
        anchor: 'center',
      })
        .setLngLat([p.lng, p.lat])
        .addTo(map);

      fm = { marker, rootEl, scaleEl, lat: p.lat, lng: p.lng, nickname: nick, avatar, t: now };
      friendMarkers.set(id, fm);
    } else {
      fm.t = now;
      fm.lat = p.lat;
      fm.lng = p.lng;
      try {
        fm.marker.setLngLat([p.lng, p.lat]);
      } catch {}

      // keep NL zIndex logic up-to-date even if location changed
      try {
        if (fm.rootEl) fm.rootEl.style.zIndex = isInNetherlands(p.lat, p.lng) ? '1200' : '1400';
      } catch {}

      if (fm.nickname !== nick || fm.avatar !== avatar) {
        try {
          fm.marker.remove();
        } catch {}
        const { rootEl, scaleEl } = buildFriendEl(nick, avatar, p.lat, p.lng);
        const marker = new maplibregl.Marker({ element: rootEl, anchor: 'center' })
          .setLngLat([p.lng, p.lat])
          .addTo(map);
        fm.marker = marker;
        fm.rootEl = rootEl;
        fm.scaleEl = scaleEl;
        fm.nickname = nick;
        fm.avatar = avatar;
      }
    }
  }

  friendMarkers.forEach((fm, id) => {
    if (!seen.has(id)) {
      try {
        fm.marker?.remove?.();
      } catch {}
      friendMarkers.delete(id);
    }
  });

  applyAllMarkerScales();
}

/* -------------------- LOOT / PUZZLES -------------------- */

function rollLootKind() {
  const r = Math.random();
  if (r < 0.6) return 'small';
  if (r < 0.9) return 'medium';
  if (r < 0.98) return 'large';
  return 'jackpot';
}

const CARD_DROP_CHANCE = 0.35;
const CARD_POOL = ['walk_sun_1', 'walk_rain_1', 'walk_city_1', 'cbs_heart_1'];
const RARE_CARD_IDS = new Set(['cbs_heart_1']);

function pickRandomCardId() {
  if (!CARD_POOL.length) return null;
  const idx = Math.floor(Math.random() * CARD_POOL.length);
  return CARD_POOL[idx];
}

function computeLootReward(kind) {
  const k = kind || 'small';
  let xp, tickets, cbs;

  if (k === 'jackpot') {
    xp = 30 + Math.floor(Math.random() * 31);
    tickets = 2 + Math.floor(Math.random() * 2);
    cbs = 20 + Math.floor(Math.random() * 31);
  } else if (k === 'large') {
    xp = 20 + Math.floor(Math.random() * 21);
    tickets = 1 + Math.floor(Math.random() * 2);
    cbs = 10 + Math.floor(Math.random() * 16);
  } else if (k === 'medium') {
    xp = 10 + Math.floor(Math.random() * 16);
    tickets = Math.random() < 0.7 ? 1 : 0;
    cbs = Math.random() < 0.5 ? 5 + Math.floor(Math.random() * 11) : 0;
  } else {
    xp = 5 + Math.floor(Math.random() * 11);
    tickets = Math.random() < 0.25 ? 1 : 0;
    cbs = Math.random() < 0.25 ? 3 + Math.floor(Math.random() * 8) : 0;
  }

  let cardId = null;
  let cardCount = 0;
  if (Math.random() < CARD_DROP_CHANCE) {
    const chosen = pickRandomCardId();
    if (chosen) {
      cardId = chosen;
      cardCount = 1;
    }
  }

  return { xp, tickets, cbs, cardId, cardCount };
}

/**
 * Glow score (stronger = rarer/better)
 */
function computeLootGlowPx(kind, reward) {
  const k = kind || 'small';
  const r = reward || {};

  const hasExtra = !!(r.tickets > 0 || r.cbs > 0 || (r.cardId && r.cardCount > 0));
  const hasRareCard = !!(r.cardId && RARE_CARD_IDS.has(String(r.cardId)));

  let px = 0;
  if (k === 'medium') px = 10;
  if (k === 'large') px = 18;
  if (k === 'jackpot') px = 26;

  if (hasExtra) px = Math.max(px, 12);
  if (hasRareCard) px = Math.max(px, 32);

  return clamp(px, 0, 36);
}

/**
 * ✅ Loot marker: black square + ⭐
 * Glow is on the ⭐
 */
function buildLootGroundEl(kind, reward) {
  const root = document.createElement('div');
  root.className = 'cbsgo-marker-root';
  root.style.pointerEvents = 'auto';

  const scale = document.createElement('div');
  scale.className = 'cbsgo-scale';
  scale.style.transformOrigin = 'center center';
  scale.style.willChange = 'transform';

  const glowPx = computeLootGlowPx(kind, reward);

  scale.innerHTML = `
    <div class="cbsgo-loot-square">
      <div class="cbsgo-loot-star" style="--loot-glow:${glowPx}px;">⭐</div>
    </div>
  `;

  root.appendChild(scale);
  return { rootEl: root, scaleEl: scale };
}

function buildPuzzleEl() {
  const root = document.createElement('div');
  root.className = 'cbsgo-marker-root';
  root.style.pointerEvents = 'auto';

  const scale = document.createElement('div');
  scale.className = 'cbsgo-scale';
  scale.style.transformOrigin = 'bottom center';
  scale.style.willChange = 'transform';

  scale.innerHTML = `
    <div class="cbsgo-pin cbsgo-marker-loot">
      <div class="cbsgo-gift-core">🧩</div>
    </div>
  `;

  root.appendChild(scale);
  return { rootEl: root, scaleEl: scale };
}

function canSpawnGameplay() {
  return !!map && !inWorldMode && hasGpsFix;
}

function spawnLootAround(center) {
  if (!LOOT_ENABLED || !canSpawnGameplay() || !center) return;

  const now = Date.now();
  if (now - lastLootSpawnAt < LOOT_RESPAWN_MS) return;
  if (lootItems.length >= LOOT_MAX_ACTIVE) return;

  const kind = rollLootKind();
  const reward = computeLootReward(kind);
  const pos = randomNearbyLatLng(center, LOOT_SPAWN_MIN_DISTANCE_M, LOOT_SPAWN_MAX_DISTANCE_M);
  const id = `loot_${now}_${Math.floor(Math.random() * 9999)}`;

  const { rootEl, scaleEl } = buildLootGroundEl(kind, reward);

  const marker = new maplibregl.Marker({
    element: rootEl,
    anchor: 'center',
    offset: [0, 0],
  })
    .setLngLat([pos.lng, pos.lat])
    .addTo(map);

  rootEl.addEventListener('click', () => {
    if (!lastUserLatLng) return;

    const player = { lat: lastUserLatLng[0], lng: lastUserLatLng[1] };
    const chest = { lat: pos.lat, lng: pos.lng };
    const dist = metersBetween(player, chest);

    if (dist > PICKUP_RADIUS_M) {
      showToast(`Too far. Move closer (${Math.round(dist)}m / ${PICKUP_RADIUS_M}m).`, 1600);
      return;
    }

    try {
      marker.remove();
    } catch {}
    lootItems = lootItems.filter((x) => x.id !== id);

    const { xp, tickets, cbs, cardId, cardCount } = reward;
    const parts = [];
    if (xp) parts.push(`+${xp} XP`);
    if (tickets) parts.push(`+${tickets} ticket${tickets === 1 ? '' : 's'}`);
    if (cbs) parts.push(`+${cbs} CBS`);
    if (cardId && cardCount > 0) parts.push(`+${cardCount} card`);

    showToast(`Loot found: ${parts.join(' · ')}`, 2000);

    try {
      window.dispatchEvent(
        new CustomEvent('cbsgo:lootReward', {
          detail: { kind: 'mystery', xp: xp || 0, tickets: tickets || 0, cbs: cbs || 0, cardId, cardCount },
        })
      );
    } catch {}
  });

  lootItems.push({ id, marker, rootEl, scaleEl, createdAt: now, lat: pos.lat, lng: pos.lng, reward, kind });
  lastLootSpawnAt = now;

  syncGameplayMarkerVisibility();
}

function cleanupLoot(center) {
  if (!canSpawnGameplay() || !center) return;

  const now = Date.now();
  lootItems = lootItems.filter((item) => {
    const age = now - (item.createdAt || 0);
    if (age > LOOT_DESPAWN_AGE_MS) {
      try {
        item.marker.remove();
      } catch {}
      return false;
    }

    const dist = metersBetween(center, { lat: item.lat, lng: item.lng });
    if (Number.isFinite(dist) && dist > LOOT_DESPAWN_DIST_M) {
      try {
        item.marker.remove();
      } catch {}
      return false;
    }
    return true;
  });

  if (lootItems.length === 0) lastLootSpawnAt = 0;
}

function maybeSpawnPuzzle(center) {
  if (!PUZZLES_ENABLED || !canSpawnGameplay() || !center) return;
  if (PUZZLE_MAX_ACTIVE <= 0) return;
  if (activePuzzle) return;

  if (!firstPuzzleSpawned) {
    if (puzzleMeters < FIRST_PUZZLE_MIN_METERS) return;
    puzzleMeters = 0;
    firstPuzzleSpawned = true;
  } else {
    if (puzzleMeters < PUZZLE_SPAWN_CHUNK_M) return;
    if (Math.random() > PUZZLE_SPAWN_CHANCE) return;
    puzzleMeters = 0;
  }

  const pos = randomNearbyLatLng(center, 45, 110);
  const id = `puzzle_${Date.now()}`;

  const { rootEl, scaleEl } = buildPuzzleEl();
  const marker = new maplibregl.Marker({
    element: rootEl,
    anchor: 'bottom',
    offset: [0, 0],
  })
    .setLngLat([pos.lng, pos.lat])
    .addTo(map);

  rootEl.addEventListener('click', () => {
    if (!lastUserLatLng) return;

    const player = { lat: lastUserLatLng[0], lng: lastUserLatLng[1] };
    const target = { lat: pos.lat, lng: pos.lng };
    const dist = metersBetween(player, target);

    if (dist > PICKUP_RADIUS_M) {
      showToast(`Too far. Move closer (${Math.round(dist)}m / ${PICKUP_RADIUS_M}m).`, 1600);
      return;
    }

    try {
      marker.remove();
    } catch {}
    activePuzzle = null;
    openPuzzleModal({ id, name: 'CBS GO Puzzle' });
  });

  activePuzzle = { id, lat: pos.lat, lng: pos.lng, marker, rootEl, scaleEl };
  syncGameplayMarkerVisibility();
}

/* -------------------- VISIBILITY -------------------- */

function syncGameplayMarkerVisibility() {
  const showGameplay = shouldShowGameplayMarkers();

  lootItems.forEach((it) => {
    if (it?.rootEl) it.rootEl.style.display = showGameplay ? 'block' : 'none';
  });

  if (activePuzzle?.rootEl) {
    activePuzzle.rootEl.style.display = showGameplay ? 'block' : 'none';
  }

  // ✅ Ring should always update in player-mode (and retry-safe)
  if (lastUserLatLng && !inWorldMode) {
    forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
  }

  applyAllMarkerScales();
  updatePlayerArrow();
}

/* -------------------- WEATHER/PLACE -------------------- */

function placeCellKey(lat, lng) {
  const step = 0.002;
  const a = Math.round(lat / step) * step;
  const o = Math.round(lng / step) * step;
  return `${a.toFixed(3)}_${o.toFixed(3)}`;
}

function getWeatherLabel() {
  const { temp, iconEmoji } = weatherState;
  const place = locationState.place;
  if (temp == null) return '⛅ …°';
  return place ? `${iconEmoji} ${Math.round(temp)}° · ${place}` : `${iconEmoji} ${Math.round(temp)}°`;
}

function updateWeatherLabel() {
  const el = ensureEl('cbsgoWeatherLabel');
  if (el) el.textContent = getWeatherLabel();
}

function setNightClass(isNight) {
  const host = ensureEl('cbsgoMapHost');
  if (!host) return;
  host.dataset.night = isNight ? '1' : '0';
}

async function fetchWeatherForLatLng(lat, lng) {
  if (!OPEN_WEATHER_API_KEY) return;
  const now = Date.now();

  if (lastWeatherLatLng) {
    const moved = metersBetween(
      { lat: lastWeatherLatLng[0], lng: lastWeatherLatLng[1] },
      { lat, lng }
    );
    if (Number.isFinite(moved) && moved > 1500) weatherState.lastUpdated = 0;
  }

  if (weatherState.lastUpdated && now - weatherState.lastUpdated < 5 * 60 * 1000) return;

  try {
    try {
      weatherAbort?.abort?.();
    } catch {}
    weatherAbort = new AbortController();

    const url =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}` +
      `&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

    const res = await fetch(url, { signal: weatherAbort.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    const temp = data?.main?.temp;
    const code = data?.weather?.[0]?.icon || '01d';
    const main = String(data?.weather?.[0]?.main || '').toLowerCase();

    let isNight = code.endsWith('n');
    let condition = 'clear';

    if (code.startsWith('03') || code.startsWith('04')) condition = 'clouds';
    else if (code.startsWith('09') || code.startsWith('10')) condition = 'rain';
    else if (code.startsWith('11')) condition = 'storm';
    else if (code.startsWith('13')) condition = 'snow';
    else if (code.startsWith('50')) condition = 'mist';

    if (main.includes('rain')) condition = 'rain';
    if (main.includes('snow')) condition = 'snow';
    if (main.includes('thunder')) condition = 'storm';

    try {
      const dt = Number(data?.dt || 0);
      const tz = Number(data?.timezone || 0);
      if (dt && Number.isFinite(tz)) {
        const localTs = dt + tz;
        const hour = ((localTs / 3600) % 24 + 24) % 24;
        isNight = hour < 7 || hour >= 19;
      }
    } catch {}

    let iconEmoji = '⛅';
    if (condition === 'clear') iconEmoji = isNight ? '🌙' : '☀️';
    else if (condition === 'clouds') iconEmoji = '☁️';
    else if (condition === 'rain') iconEmoji = '🌧️';
    else if (condition === 'storm') iconEmoji = '⛈️';
    else if (condition === 'snow') iconEmoji = '❄️';
    else if (condition === 'mist') iconEmoji = '🌫️';

    weatherState = { temp, iconEmoji, condition, isNight, lastUpdated: now };
    lastWeatherLatLng = [lat, lng];

    updateWeatherLabel();
    setNightClass(isNight);
  } catch (e) {
    if (e?.name === 'AbortError') return;
    console.warn('Weather fetch failed', e);
  }
}

async function fetchPlaceName(lat, lng) {
  if (!OPEN_WEATHER_API_KEY) return;

  const now = Date.now();
  const cell = placeCellKey(lat, lng);

  if (cell === lastPlaceCellKey && locationState.place) return;
  if (locationState.lastUpdated && now - locationState.lastUpdated < 10 * 60 * 1000) return;

  try {
    try {
      placeAbort?.abort?.();
    } catch {}
    placeAbort = new AbortController();

    const url =
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}` +
      `&limit=1&appid=${OPEN_WEATHER_API_KEY}`;

    const res = await fetch(url, { signal: placeAbort.signal });
    if (!res.ok) throw new Error('Reverse geocode HTTP ' + res.status);

    const data = await res.json();
    const row = Array.isArray(data) ? data[0] : null;
    const place = row?.name || row?.local_names?.en || null;

    locationState = { place: place ? String(place) : null, lastUpdated: now };
    lastPlaceCellKey = cell;
    updateWeatherLabel();
  } catch (e) {
    if (e?.name === 'AbortError') return;
    console.warn('Place lookup failed', e);
    locationState.lastUpdated = now;
  }
}

/* -------------------- STYLES -------------------- */

function injectStylesOnce() {
  if (document.getElementById('cbsgoMapLibreGameStyles')) return;

  const style = document.createElement('style');
  style.id = 'cbsgoMapLibreGameStyles';
  style.textContent = `
    #cbsgoMapHost { position:relative; width:100%; height:100%; overflow:hidden; }
    #cbsgoMap { position:absolute; inset:0; }

    /* NEVER override MapLibre marker transform */
    .cbsgo-marker-root { position: relative; }

    /* SAFE scaling wrapper inside marker */
    .cbsgo-scale { display:block; transform-origin: bottom center; }

    #cbsgoMapHost::after{
      content:"";
      position:absolute; inset:0;
      pointer-events:none;
      background: radial-gradient(ellipse at center, rgba(0,0,0,0.10), rgba(0,0,0,0.55));
      mix-blend-mode:multiply;
      z-index: 800;
    }
    #cbsgoMapHost[data-night="1"]::after{
      background: radial-gradient(ellipse at center, rgba(0,0,0,0.22), rgba(0,0,0,0.78));
    }

    .cbsgo-player{ position:relative; width:54px; height:54px; }
    .cbsgo-player-glow{
      position:absolute; inset:0;
      border-radius:999px;
      background: radial-gradient(circle, rgba(56,189,248,0.35), rgba(56,189,248,0.00) 70%);
      transform: scale(1.2);
    }
    .cbsgo-player-core{
      position:absolute; left:50%; top:50%;
      transform: translate(-50%,-50%);
      width:42px; height:42px;
      border-radius:999px;
      border:2px solid rgba(255,255,255,0.92);
      box-shadow: 0 10px 24px rgba(0,0,0,0.55);
      background: rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
      font-weight:900; font-size:16px; color:#fff;
      overflow:hidden;
    }
    .cbsgo-player-core img{ width:100%; height:100%; object-fit:cover; display:block; }

    .cbsgo-player-arrow{
      position:absolute;
      left:50%;
      top:50%;
      width:8px;
      height:8px;
      transform: translate3d(-50%,-50%,0)
                 rotate(var(--deg, 0deg))
                 translate3d(0,-23px,0);
      transform-origin: 50% 50%;
      pointer-events:none;
      will-change: transform;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));
      opacity:0.95;
    }
    .cbsgo-player-arrow::before{
      content:"";
      position:absolute;
      inset:0;
      background: rgba(255,255,255,0.95);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      border-radius:2px;
    }

    .cbsgo-pin{ position:relative; width:44px; height:58px; }
    .cbsgo-gift-core{
      position:absolute;
      left:0; top:0;
      width:44px; height:44px;
      border-radius:18px;
      display:flex; align-items:center; justify-content:center;
      background: rgba(10,12,18,0.80);
      border: 1px solid rgba(255,255,255,0.16);
      box-shadow: 0 10px 22px rgba(0,0,0,0.45);
      font-size:22px;
      backdrop-filter: blur(10px);
    }

    /* ✅ Loot square + ⭐ + glow-on-star */
    .cbsgo-loot-square{
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: rgba(8,10,16,0.88);
      border: 1px solid rgba(255,255,255,0.16);
      box-shadow: 0 10px 24px rgba(0,0,0,0.55);
      display:flex;
      align-items:center;
      justify-content:center;
      transform: translateY(-2px);
    }
    .cbsgo-loot-star{
      font-size: 22px;
      filter:
        drop-shadow(0 0 var(--loot-glow, 0px) rgba(255,215,0,0.92))
        drop-shadow(0 0 calc(var(--loot-glow, 0px) * 1.65) rgba(255,215,0,0.45));
    }

    /* Friend bubble */
    .cbsgo-friend{
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:6px;
      transform: translateY(-6px);
    }
    /* ✅ Friend core matches player core size */
    .cbsgo-friend-core{
      width:42px; height:42px;
      border-radius:999px;
      overflow:hidden;
      border:2px solid rgba(255,255,255,0.82);
      background: rgba(0,0,0,0.30);
      box-shadow: 0 10px 24px rgba(0,0,0,0.45);
      display:flex; align-items:center; justify-content:center;
      font-weight:900; font-size:15px; color:#fff;
    }
    .cbsgo-friend-core img{ width:100%; height:100%; object-fit:cover; display:block; }
    .cbsgo-friend-label{
      font-family: system-ui, sans-serif;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 999px;
      color:#fff;
      background: rgba(10,12,18,0.70);
      border: 1px solid rgba(255,255,255,0.14);
      backdrop-filter: blur(10px);
      max-width: 140px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cbsgo-pill{
      border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.82);
      backdrop-filter: blur(10px);
      color:#fff;
      font-family:system-ui,sans-serif;
      box-shadow:0 10px 22px rgba(0,0,0,.28);
    }

    .cbsgo-marker-player { z-index:2000 !important; }
    .cbsgo-marker-loot   { z-index:1000 !important; }

    .maplibregl-ctrl { display:none !important; }

    @keyframes cbsgoSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

/* -------------------- MAP MODES -------------------- */

function destroyMapIfAny() {
  destroyed = true;

  try { playerMarker?.remove?.(); } catch {}
  playerMarker = null;
  playerArrowEl = null;
  arrowDegSmoothed = null;

  lootItems.forEach((x) => { try { x.marker?.remove?.(); } catch {} });
  lootItems = [];

  try { activePuzzle?.marker?.remove?.(); } catch {}
  activePuzzle = null;

  friendMarkers.forEach((fm) => { try { fm.marker?.remove?.(); } catch {} });
  friendMarkers.clear();
  lastOnlinePlayers = [];

  try { weatherAbort?.abort?.(); } catch {}
  try { placeAbort?.abort?.(); } catch {}
  weatherAbort = null;
  placeAbort = null;

  lastUserLatLng = null;
  lastHeadingDeg = 0;

  inWorldMode = true;
  hasGpsFix = false;

  lastBearingAt = 0;

  lastLootSpawnAt = 0;
  puzzleMeters = 0;
  firstPuzzleSpawned = false;

  phoneHeadingDeg = null;
  phoneHeadingSmoothed = null;
  lastPhoneBearingAt = 0;

  worldUserInteracted = false;
  mapBooting = true;

  try { if (map) map.remove(); } catch {}
  map = null;
}

function setWorldMode({ animate = true } = {}) {
  if (!map) return;
  inWorldMode = true;
  worldUserInteracted = false;

  if (USE_TRUE_GLOBE) {
    try { map.setProjection({ type: 'globe' }); } catch {}
  }

  try { map.dragRotate.enable(); } catch {}
  try { map.touchZoomRotate.enableRotation(); } catch {}

  clearPickupRing();
  syncGameplayMarkerVisibility();

  const cam = {
    center: WORLD_CENTER,
    zoom: WORLD_ZOOM,
    bearing: 0,
    duration: WORLD_VIEW_DURATION_MS,
  };

  if (animate) map.easeTo(cam);
  else map.jumpTo({ center: cam.center, zoom: cam.zoom, bearing: cam.bearing });

  if (lastUserLatLng) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
  if (lastOnlinePlayers.length) upsertFriendMarkers(lastOnlinePlayers);

  if (worldBtnEl) worldBtnEl.textContent = '🌍';

  applyAllMarkerScales();
}

function setPlayerMode({ animate = true, snap = true } = {}) {
  if (!map) return;
  inWorldMode = false;

  if (USE_TRUE_GLOBE) {
    try { map.setProjection({ type: 'mercator' }); } catch {}
  }

  try { map.dragRotate.disable(); } catch {}
  try { map.touchZoomRotate.disableRotation(); } catch {}

  const has = !!lastUserLatLng;
  const center = has ? [lastUserLatLng[1], lastUserLatLng[0]] : FALLBACK_CENTER;

  // ✅ snap-to-perfect zoom right away on button press
  if (snap) {
    map.jumpTo({
      center,
      zoom: has ? FOLLOW_ZOOM : FALLBACK_ZOOM,
      bearing: Number.isFinite(lastHeadingDeg) ? wrap360(lastHeadingDeg) : 0,
    });

    // HARD: ensure layers exist AND are on top
    ensureRangeLayers();
    elevateRangeLayers();

    if (has) {
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      // extra micro-tick for mobile render pipeline
      requestAnimationFrame(() => {
        if (lastUserLatLng && !inWorldMode) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      });
    }

    if (worldBtnEl) worldBtnEl.textContent = '🧭';

    if (has) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
    if (lastOnlinePlayers.length) upsertFriendMarkers(lastOnlinePlayers);

    syncGameplayMarkerVisibility();
    applyAllMarkerScales();
    return;
  }

  // fallback animate mode (not used on button click)
  ensureRangeLayers();
  const cam = {
    center,
    zoom: has ? FOLLOW_ZOOM : FALLBACK_ZOOM,
    bearing: Number.isFinite(lastHeadingDeg) ? wrap360(lastHeadingDeg) : 0,
    duration: PLAYER_VIEW_DURATION_MS,
  };

  if (animate) {
    map.easeTo(cam);
    const snapEnd = () => {
      map.off('moveend', snapEnd);
      if (!lastUserLatLng) return;

      map.jumpTo({
        center: [lastUserLatLng[1], lastUserLatLng[0]],
        zoom: FOLLOW_ZOOM,
        bearing: Number.isFinite(lastHeadingDeg) ? wrap360(lastHeadingDeg) : 0,
      });

      ensureRangeLayers();
      elevateRangeLayers();
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      syncGameplayMarkerVisibility();
    };
    map.on('moveend', snapEnd);
  } else {
    map.jumpTo({ center: cam.center, zoom: cam.zoom, bearing: cam.bearing });
  }

  if (worldBtnEl) worldBtnEl.textContent = '🧭';

  if (has) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
  if (has) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);

  if (lastOnlinePlayers.length) upsertFriendMarkers(lastOnlinePlayers);

  syncGameplayMarkerVisibility();
  applyAllMarkerScales();
}

function initMapLibre() {
  const el = ensureEl('cbsgoMap');
  if (!el) return false;

  destroyMapIfAny();
  destroyed = false;

  mapBooting = true;

  map = new maplibregl.Map({
    container: el,
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    center: WORLD_CENTER,
    zoom: WORLD_ZOOM,
    attributionControl: true,
    pitchWithRotate: true,
    bearing: 0,
  });

  map.on('load', () => {
    ensureRangeLayers();
    setWorldMode({ animate: false });

    map.once('idle', () => {
      mapBooting = false;

      // HARD: idle is a great moment on mobile to re-apply ring
      ensureRangeLayers();
      elevateRangeLayers();
      if (lastUserLatLng && !inWorldMode) {
        forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      }

      if (lastUserLatLng) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
      if (lastOnlinePlayers.length) upsertFriendMarkers(lastOnlinePlayers);

      applyAllMarkerScales();
    });
  });

  // ✅ If style reloads, re-add ring layers + retry ring + push to top
  map.on('styledata', () => {
    if (!map || destroyed) return;

    ensureRangeLayers();
    elevateRangeLayers();

    if (lastUserLatLng && !inWorldMode) {
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      requestAnimationFrame(() => {
        if (lastUserLatLng && !inWorldMode) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      });
    }
  });

  // ✅ Also on idle (some mobiles reorder layers after styledata)
  map.on('idle', () => {
    if (!map || destroyed) return;
    if (!map.isStyleLoaded()) return;

    ensureRangeLayers();
    elevateRangeLayers();

    if (lastUserLatLng && !inWorldMode) {
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
    }
  });

  const markWorldInteract = () => {
    if (!map) return;
    if (inWorldMode) worldUserInteracted = true;
  };
  map.on('wheel', markWorldInteract);
  map.on('touchstart', markWorldInteract);
  map.on('mousedown', markWorldInteract);

  map.on('zoom', () => {
    if (mapBooting) return;

    const z = getZoom();
    applyAllMarkerScales();

    if (inWorldMode && worldUserInteracted && z >= AUTO_SWITCH_TO_PLAYER_ZOOM) {
      setPlayerMode({ animate: true, snap: false });
      return;
    }

    if (!inWorldMode && z <= AUTO_SWITCH_TO_WORLD_ZOOM) {
      setWorldMode({ animate: true });
      return;
    }

    syncGameplayMarkerVisibility();
  });

  map.on('move', () => {
    if (lastUserLatLng && !inWorldMode) {
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
    }
    updatePlayerArrow();
    applyAllMarkerScales();
  });

  map.on('moveend', () => {
    if (lastUserLatLng && !inWorldMode) {
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
    }
    updatePlayerArrow();
    applyAllMarkerScales();
  });

  map.on('rotate', () => {
    updatePlayerArrow();
    applyAllMarkerScales();
  });

  if (!resizeListenersOn) {
    resizeListenersOn = true;

    const handleResize = () => {
      if (!map) return;
      try { map.resize(); } catch {}

      try {
        lootItems.forEach((it) => it?.marker?.setLngLat?.([it.lng, it.lat]));
        if (activePuzzle?.marker) activePuzzle.marker.setLngLat([activePuzzle.lng, activePuzzle.lat]);
      } catch {}

      if (lastUserLatLng && !inWorldMode) {
        forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      }

      updatePlayerArrow();
      syncGameplayMarkerVisibility();

      if (lastUserLatLng) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
      if (lastOnlinePlayers.length) upsertFriendMarkers(lastOnlinePlayers);

      applyAllMarkerScales();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
  }

  return true;
}

/* -------------------- PHONE ORIENTATION -------------------- */

function getScreenAngleDeg() {
  try {
    const a = window.screen?.orientation?.angle;
    if (Number.isFinite(a)) return a;
  } catch {}
  try {
    const a = window.orientation;
    if (Number.isFinite(a)) return a;
  } catch {}
  return 0;
}

function computePhoneHeadingFromEvent(ev) {
  if (!ev) return null;

  if (typeof ev.webkitCompassHeading === 'number' && Number.isFinite(ev.webkitCompassHeading)) {
    return wrap360(ev.webkitCompassHeading);
  }

  if (typeof ev.alpha === 'number' && Number.isFinite(ev.alpha)) {
    const screenAngle = getScreenAngleDeg();
    return wrap360(360 - ev.alpha + screenAngle);
  }

  return null;
}

async function ensurePhoneOrientationListener() {
  if (phoneListenerOn) return;
  phoneListenerOn = true;

  const handler = (ev) => {
    if (destroyed) return;
    if (!ROTATE_MAP_WITH_PHONE) return;
    if (!map || inWorldMode) return;
    if (!map.isStyleLoaded()) return;

    const h = computePhoneHeadingFromEvent(ev);
    if (!Number.isFinite(h)) return;

    phoneHeadingDeg = wrap360(h);

    if (phoneHeadingSmoothed == null) phoneHeadingSmoothed = phoneHeadingDeg;
    const diff = shortestAngleDeltaDeg(phoneHeadingSmoothed, phoneHeadingDeg);
    phoneHeadingSmoothed = wrap360(phoneHeadingSmoothed + diff * PHONE_ROTATE_SMOOTH);

    lastHeadingDeg = wrap360(phoneHeadingSmoothed);
    updatePlayerArrow();

    const now = Date.now();
    if (now - lastPhoneBearingAt < PHONE_ROTATE_THROTTLE_MS) return;

    const cur = wrap360(map.getBearing());
    const delta = Math.abs(shortestAngleDeltaDeg(cur, phoneHeadingSmoothed));
    if (delta < PHONE_ROTATE_MIN_DEG_DELTA) return;

    lastPhoneBearingAt = now;

    const center = lastUserLatLng ? [lastUserLatLng[1], lastUserLatLng[0]] : map.getCenter();
    map.easeTo({
      center,
      bearing: phoneHeadingSmoothed,
      duration: ROTATE_DURATION_MS,
    });
  };

  try {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      window.__cbsgo_needOrientationPermission = true;
      window.__cbsgo_orientationHandler = handler;
      return;
    }
  } catch {}

  window.addEventListener('deviceorientation', handler, true);
}

/* -------------------- GPS -------------------- */

function startGps() {
  if (!navigator.geolocation) return;

  navigator.geolocation.watchPosition(
    (pos) => {
      if (destroyed) return;

      const { latitude, longitude, heading } = pos.coords;
      const center = { lat: latitude, lng: longitude };

      const prev = lastUserLatLng ? { lat: lastUserLatLng[0], lng: lastUserLatLng[1] } : null;

      lastUserLatLng = [latitude, longitude];
      hasGpsFix = true;

      let gpsHeading = null;
      if (Number.isFinite(heading)) gpsHeading = wrap360(heading);
      else if (prev) {
        const distMoved = metersBetween(prev, center);
        if (Number.isFinite(distMoved) && distMoved > 2) gpsHeading = wrap360(computeHeadingDeg(prev, center));
      }

      if (PHONE_HEADING_PRIORITY && ROTATE_MAP_WITH_PHONE && Number.isFinite(phoneHeadingSmoothed)) {
        lastHeadingDeg = wrap360(phoneHeadingSmoothed);
      } else if (Number.isFinite(gpsHeading)) {
        lastHeadingDeg = wrap360(gpsHeading);
      }

      if (map) ensurePlayerMarker(latitude, longitude);

      if (map && !inWorldMode && ROTATE_MAP_WITH_HEADING && map.isStyleLoaded()) {
        const now = Date.now();
        if (now - lastBearingAt > ROTATE_THROTTLE_MS && Number.isFinite(lastHeadingDeg)) {
          const cur = wrap360(map.getBearing());
          const delta = Math.abs(shortestAngleDeltaDeg(cur, lastHeadingDeg));
          if (delta >= ROTATE_MIN_DEG_DELTA) {
            lastBearingAt = now;
            map.easeTo({
              center: [longitude, latitude],
              bearing: lastHeadingDeg,
              duration: ROTATE_DURATION_MS,
            });
          }
        }
      }

      updatePlayerArrow();

      if (prev) {
        const moved = metersBetween(prev, center);
        if (Number.isFinite(moved) && moved > 1) puzzleMeters += moved;
      }

      if (!inWorldMode) {
        maybeSpawnPuzzle(center);
        spawnLootAround(center);
        cleanupLoot(center);
      }

      // ✅ Force ring update on every GPS tick in player-mode (retry safe)
      if (!inWorldMode) {
        forceUpdatePickupRing(latitude, longitude);
      }

      applyAllMarkerScales();

      fetchWeatherForLatLng(latitude, longitude);
      fetchPlaceName(latitude, longitude);

      try {
        window.dispatchEvent(
          new CustomEvent('cbsgo:playerPos', {
            detail: {
              lat: latitude,
              lng: longitude,
              heading: lastHeadingDeg,
              acc: Number.isFinite(pos.coords.accuracy) ? pos.coords.accuracy : null,
              t: Date.now(),
              shareLocation,
            },
          })
        );
      } catch {}
    },
    (err) => {
      console.warn('GPS error:', err?.message || err?.code || 'unknown');
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
  );
}

/* -------------------- PUBLIC API -------------------- */

export function renderMapView() {
  injectStylesOnce();

  return `
    <div id="cbsgoMapHost" data-night="0">
      <div id="cbsgoMap"></div>

      <div id="cbsgoWeather" class="cbsgo-pill" style="
        position:absolute;
        top:16px;
        left:12px;
        z-index:3000;
        padding:6px 10px;
        font-size:12px;
        display:inline-flex;
        align-items:center;
        gap:6px;
      ">
        <span id="cbsgoWeatherLabel">${esc(getWeatherLabel())}</span>
      </div>

      <div id="cbsgoMapControls" style="
        position:absolute;
        left:12px;
        top:58px;
        z-index:3000;
        display:flex;
        flex-direction:column;
        gap:10px;
      ">
        <button id="cbsgoWorldBtn" class="cbsgo-pill" type="button" aria-label="World / Player toggle"
          style="width:52px;height:52px;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
          🌍
        </button>
      </div>

      <div id="cbsgoToast" class="cbsgo-pill" style="
        position:absolute;
        left:50%;
        bottom:18px;
        transform:translateX(-50%);
        z-index:4000;
        padding:10px 12px;
        font-size:13px;
        max-width:min(92vw, 420px);
        text-align:center;
        display:none;
        opacity:0;
        transition:opacity 140ms ease, transform 140ms ease;
        pointer-events:none;
      "></div>
    </div>
  `;
}

export function bindMapView() {
  let tries = 0;
  const maxTries = 120;

  const tick = () => {
    tries++;

    const el = ensureEl('cbsgoMap');
    if (!el) {
      if (tries < maxTries) return setTimeout(tick, 100);
      console.warn('Map container not found.');
      return;
    }

    const ok = initMapLibre();
    if (!ok) return;

    if (!window.__cbsgo_share_listener) {
      window.__cbsgo_share_listener = true;
      window.addEventListener('cbsgo:shareLocation', (ev) => {
        const v = ev?.detail?.shareLocation;
        if (typeof v === 'boolean') shareLocation = v;
      });
    }

    if (!window.__cbsgo_onlinePlayers_listener) {
      window.__cbsgo_onlinePlayers_listener = true;
      window.addEventListener('cbsgo:onlinePlayers', (ev) => {
        const players = ev?.detail?.players;
        if (!Array.isArray(players)) return;
        if (!map) return;
        upsertFriendMarkers(players);
      });
    }

    ensurePhoneOrientationListener();

    const worldBtn = ensureEl('cbsgoWorldBtn');
    worldBtnEl = worldBtn || null;

    if (worldBtn) {
      worldBtn.onclick = async () => {
        if (!map) return;

        try {
          if (window.__cbsgo_needOrientationPermission && typeof DeviceOrientationEvent !== 'undefined') {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
              const res = await DeviceOrientationEvent.requestPermission();
              if (String(res).toLowerCase() === 'granted') {
                window.__cbsgo_needOrientationPermission = false;
                if (window.__cbsgo_orientationHandler) {
                  window.addEventListener('deviceorientation', window.__cbsgo_orientationHandler, true);
                }
                showToast('Compass enabled ✅', 1200);
              } else {
                showToast('Compass disabled (permission not granted).', 1600);
              }
            }
          }
        } catch {}

        worldBtn.style.animation = 'cbsgoSpin 0.6s cubic-bezier(0.25,0.46,0.45,0.94)';
        setTimeout(() => { worldBtn.style.animation = ''; }, 600);

        // ✅ Button behavior: snap to perfect game zoom immediately
        if (inWorldMode) setPlayerMode({ animate: false, snap: true });
        else setWorldMode({ animate: true });

        applyAllMarkerScales();
      };
    }

    if (!window.__cbsgo_profile_listener) {
      window.__cbsgo_profile_listener = true;
      window.addEventListener('cbsgo:profileChanged', () => {
        refreshPlayerLooks();
      });
    }

    updateWeatherLabel();
    startGps();
  };

  tick();
}
