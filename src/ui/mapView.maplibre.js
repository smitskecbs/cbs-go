// src/ui/mapView.maplibre.js
// CBS GO — MapLibre game map (CLEAN + STABLE build 2026-02-26)
//
// Fixes:
// - No duplicate declarations (prevents "has already been declared")
// - Loot = black square + ⭐ (glow indicates rarity)
// - Ring layers forced to TOP + retry-safe on mobile
// - Friends worldwide, same size as player, player always on top (NL friends lower)
// - No auto-rotate map by GPS/phone compass (finger rotate only)
// - Weather label + 5-day forecast modal

import maplibregl from 'maplibre-gl';
import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';

/* -------------------- CONFIG -------------------- */

const OPEN_WEATHER_API_KEY = '48a387bba00043ac4ba5823371abc9d2';

const PICKUP_RADIUS_M = 80;

// Loot
const LOOT_ENABLED = true;
const LOOT_MAX_ACTIVE = 6;
const LOOT_SPAWN_MIN_DISTANCE_M = 70;
const LOOT_SPAWN_MAX_DISTANCE_M = 140;
const LOOT_RESPAWN_MS = 45_000;
const LOOT_DESPAWN_AGE_MS = 5 * 60_000;
const LOOT_DESPAWN_DIST_M = 260;

// Camera
const FOLLOW_ZOOM = 16.7;
const PLAYER_VIEW_DURATION_MS = 700;
const WORLD_VIEW_DURATION_MS = 700;

// Visibility
const RING_HIDE_BELOW_ZOOM = 0;
const LOOT_HIDE_BELOW_ZOOM = 12.8;

// Fallback (no GPS)
const FALLBACK_CENTER = [4.87, 51.687]; // [lng, lat]
const FALLBACK_ZOOM = 15.5;

// World mode
const WORLD_CENTER = [10, 25];
const WORLD_ZOOM = 1.55;

const AUTO_SWITCH_TO_PLAYER_ZOOM = 10.5;
const AUTO_SWITCH_TO_WORLD_ZOOM = 4.2;

// Projection
const USE_TRUE_GLOBE = true;

/* -------------------- STATE -------------------- */

let map = null;
let destroyed = false;

let lastUserLatLng = null; // [lat, lng]
let lastRingLatLng = null;
let lastHeadingDeg = 0;
let smoothedUserLatLng = null; // [lat, lng] voor rustige UI

function smoothUiLatLng(rawLat, rawLng, accuracyM = null) {
  const next = { lat: Number(rawLat), lng: Number(rawLng) };
  if (!Number.isFinite(next.lat) || !Number.isFinite(next.lng)) {
    return smoothedUserLatLng || null;
  }

  // Eerste fix = direct zetten
  if (!smoothedUserLatLng) {
    smoothedUserLatLng = [next.lat, next.lng];
    return smoothedUserLatLng;
  }

  const prev = { lat: smoothedUserLatLng[0], lng: smoothedUserLatLng[1] };
  const dist = metersBetween(prev, next);

  // Slechte GPS? Kleine sprongen gewoon negeren
  const deadzoneM = Number.isFinite(accuracyM)
    ? Math.max(3, Math.min(accuracyM * 0.35, 12))
    : 5;

  if (dist < deadzoneM) {
    return smoothedUserLatLng;
  }

  // Hoe slechter GPS, hoe rustiger bewegen
  const alpha = Number.isFinite(accuracyM)
    ? Math.max(0.12, Math.min(0.28, 8 / Math.max(8, accuracyM)))
    : 0.22;

  const lat = prev.lat + (next.lat - prev.lat) * alpha;
  const lng = prev.lng + (next.lng - prev.lng) * alpha;

  smoothedUserLatLng = [lat, lng];
  return smoothedUserLatLng;
}

let inWorldMode = true;
let hasGpsFix = false;

// loot
let lootItems = []; // { id, lat, lng, createdAt, reward, marker, rootEl, scaleEl, kind }
let lastLootSpawnAt = 0;

// friends
let friendMarkers = new Map(); // user_id -> { marker, rootEl, scaleEl, lat, lng, nickname, avatar, t }
let lastOnlinePlayers = []; // cached

// privacy
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

// forecast
let forecastAbort = null;
let forecastState = {
  days: [],        // [{ date, min, max, iconEmoji, condition }]
  lastUpdated: 0,
  lastLatLng: null // [lat,lng]
};

// UI
let worldBtnEl = null;

// window listeners guard
let resizeListenersOn = false;

// autoswitch only after user interaction in world
let worldUserInteracted = false;

// block autoswitch during boot/init
let mapBooting = true;

/* -------------------- MAP LIFECYCLE -------------------- */

function destroyMapIfAny() {
  destroyed = true;

  // player
  try { playerMarker?.remove?.(); } catch {}
  playerMarker = null;
  playerArrowEl = null;
  arrowDegSmoothed = null;

  // loot
  try { lootItems.forEach((x) => { try { x.marker?.remove?.(); } catch {} }); } catch {}
  lootItems = [];
  lastLootSpawnAt = 0;

  // friends
  try { friendMarkers.forEach((fm) => { try { fm.marker?.remove?.(); } catch {} }); } catch {}
  try { friendMarkers.clear(); } catch {}
  lastOnlinePlayers = [];

  // abort ongoing requests
  try { weatherAbort?.abort?.(); } catch {}
  try { placeAbort?.abort?.(); } catch {}
  try { forecastAbort?.abort?.(); } catch {}
  weatherAbort = null;
  placeAbort = null;
  forecastAbort = null;

  lastWeatherLatLng = null;
  lastPlaceCellKey = null;

  // gps + mode
  lastUserLatLng = null;
  lastHeadingDeg = 0;
  inWorldMode = true;
  hasGpsFix = false;

  // autoswitch / boot flags
  worldUserInteracted = false;
  mapBooting = true;

  // ring cleanup
  try { clearPickupRing(); } catch {}

  // map instance
  try { if (map) map.remove(); } catch {}
  map = null;

  destroyed = false; // allow fresh init
}
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

// NL bbox: keep friend lower zIndex in NL so player wins overlap
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

/* -------------------- TOAST -------------------- */

let toastTimer = null;
let toastHideTimer = null;

function showToast(msg, ms = 1600) {
  const el = ensureEl('cbsgoToast');
  if (!el) return;

  const duration = clamp(Number(ms) || 1600, 600, 6000);

  el.textContent = String(msg || '');

  // reset state first (prevents stuck animation on rapid calls)
  try { clearTimeout(toastTimer); } catch {}
  try { clearTimeout(toastHideTimer); } catch {}

  el.style.display = 'block';
  el.style.opacity = '0';
  el.style.transform = 'translateX(-50%) translateY(6px)';

  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(-4px)';
  });

  toastTimer = setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(6px)';

    toastHideTimer = setTimeout(() => {
      el.style.display = 'none';
    }, 180);
  }, duration);
}

/* -------------------- PICKUP RING (MOBILE HARD FIX) -------------------- */

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

function elevateRangeLayers() {
  if (!map) return;
  if (!map.isStyleLoaded()) return;
  try { if (map.getLayer(LYR_RANGE_FILL)) map.moveLayer(LYR_RANGE_FILL); } catch {}
  try { if (map.getLayer(LYR_RANGE_LINE)) map.moveLayer(LYR_RANGE_LINE); } catch {}
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

    // ---- FILL (binnen cirkel) ----
    if (!map.getLayer(LYR_RANGE_FILL)) {
      map.addLayer({
        id: LYR_RANGE_FILL,
        type: 'fill',
        source: SRC_RANGE,
        paint: {
          // ✅ binnen cirkel oranje (duidelijker dan 0.22)
          'fill-color': 'rgba(255,165,0,0.35)',
          // outline via fill is onbetrouwbaar; echte rand = LINE layer hieronder
          'fill-outline-color': 'rgba(255,165,0,0.0)',
        },
      });
    } else {
      try { map.setPaintProperty(LYR_RANGE_FILL, 'fill-color', 'rgba(255,165,0,0.35)'); } catch {}
      try { map.setPaintProperty(LYR_RANGE_FILL, 'fill-outline-color', 'rgba(255,165,0,0.0)'); } catch {}
    }

    // ---- LINE (buiten rand) ----
    if (!map.getLayer(LYR_RANGE_LINE)) {
      map.addLayer({
        id: LYR_RANGE_LINE,
        type: 'line',
        source: SRC_RANGE,
        paint: {
          // ✅ volle oranje rand (geen stippels)
          'line-color': 'rgba(255,165,0,0.98)',
          'line-width': 4.5,
          'line-opacity': 1,
          'line-blur': 0,
        },
      });
    } else {
      try { map.setPaintProperty(LYR_RANGE_LINE, 'line-color', 'rgba(255,165,0,0.98)'); } catch {}
      try { map.setPaintProperty(LYR_RANGE_LINE, 'line-width', 4.5); } catch {}
      try { map.setPaintProperty(LYR_RANGE_LINE, 'line-opacity', 1); } catch {}
      try { map.setPaintProperty(LYR_RANGE_LINE, 'line-blur', 0); } catch {}

      // ✅ dash écht uit (meest betrouwbaar)
      try { map.removePaintProperty(LYR_RANGE_LINE, 'line-dasharray'); } catch {}
    }
  } catch {
    // mobile timing: retry later
  }

  elevateRangeLayers();
}

function clearPickupRing() {
  if (!map || !map.isStyleLoaded()) return;
  const src = map.getSource(SRC_RANGE);
  if (src) src.setData({ type: 'FeatureCollection', features: [] });
}

function forceUpdatePickupRing(lat, lng, tries = 0) {
  // voorkom jitter: alleen update als speler echt beweegt
if (lastRingLatLng) {
  const dist = metersBetween(
    { lat: lastRingLatLng[0], lng: lastRingLatLng[1] },
    { lat, lng }
  );

  if (dist < 2) return;
}

lastRingLatLng = [lat, lng];
  if (!map || destroyed) return;
  if (inWorldMode) return;

  if (!map.isStyleLoaded()) {
    if (tries < 40) setTimeout(() => forceUpdatePickupRing(lat, lng, tries + 1), 120);
    return;
  }

  ensureRangeLayers();
  elevateRangeLayers();

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

/* -------------------- SAFE MARKER SCALING -------------------- */

function lootScaleForZoom(z) {
  return clamp(0.34 + (z - 11) * 0.055, 0.26, 1.0);
}

function friendScaleForZoom(z) {
  if (z <= 2.2) return 0.92;
  if (z <= 3.2) return 0.96;
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

  const fs = friendScaleForZoom(z);
  friendMarkers.forEach((fm) => {
    if (!fm?.scaleEl) return;
    fm.scaleEl.style.transform = `translateZ(0) scale(${fs})`;
  });
}

/* -------------------- PLAYER MARKER -------------------- */

let playerArrowEl = null;
let arrowDegSmoothed = null;
let playerMarker = null;

function buildPlayerEl() {
  const av = getPlayerAvatar?.();

  const wrap = document.createElement('div');
  wrap.className = 'cbsgo-player cbsgo-marker-player';
  wrap.style.zIndex = '2000';
  wrap.style.pointerEvents = 'none';

  const glow = document.createElement('div');
  glow.className = 'cbsgo-player-glow';
  wrap.appendChild(glow);

  const core = document.createElement('div');
  core.className = 'cbsgo-player-core';

  const setInitialsFallback = () => {
    core.innerHTML = '';
    core.textContent = initialsFromName();
  };

  if (av) {
    const img = document.createElement('img');
    img.src = String(av);
    img.alt = 'me';
    img.width = 42;
    img.height = 42;
    img.decoding = 'async';
    img.loading = 'eager';
    img.referrerPolicy = 'no-referrer';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    // ✅ fallback als avatar url stuk is / 404 / CORS
    img.onerror = () => setInitialsFallback();

    core.textContent = '';
    core.appendChild(img);
  } else {
    setInitialsFallback();
  }

  wrap.appendChild(core);

  const arrow = document.createElement('div');
  arrow.className = 'cbsgo-player-arrow';
  wrap.appendChild(arrow);

  return { wrap, arrow };
}

function updatePlayerArrow() {
  if (!playerArrowEl) return;

  // Arrow points to world heading; if user rotated map with fingers, subtract map bearing.
  const bearing = safeMapBearing();
  const target = wrap360(wrap360(lastHeadingDeg) - bearing);

  if (arrowDegSmoothed == null) arrowDegSmoothed = target;
  const diff = shortestAngleDeltaDeg(arrowDegSmoothed, target);
  arrowDegSmoothed = wrap360(arrowDegSmoothed + diff * 0.22);

  playerArrowEl.style.setProperty('--deg', `${arrowDegSmoothed}deg`);
}

function ensurePlayerMarker(lat, lng) {
  if (!map) return;

  if (!playerMarker) {
    const { wrap, arrow } = buildPlayerEl();
    playerArrowEl = arrow;

    playerMarker = new maplibregl.Marker({ element: wrap, anchor: 'center' })
      .setLngLat([lng, lat])
      .addTo(map);
  } else {
    playerMarker.setLngLat([lng, lat]);
  }

  updatePlayerArrow();

  if (!inWorldMode) forceUpdatePickupRing(lat, lng);
  syncGameplayMarkerVisibility();
}

function refreshPlayerLooks() {
  try { playerMarker?.remove?.(); } catch {}
  playerMarker = null;
  playerArrowEl = null;
  arrowDegSmoothed = null;

  if (lastUserLatLng) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
}

/* -------------------- FRIEND MARKERS -------------------- */

const FRIEND_TTL_MS = 20_000;

function truthyShareValue(v) {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    return s === '1' || s === 'true' || s === 'yes' || s === 'on';
  }
  return null;
}

function playerSharesLocation(p) {
  if (!p) return false;

  const lat = Number(
    p.lat != null ? p.lat :
    (p.latitude != null ? p.latitude :
    (p.pos?.lat != null ? p.pos.lat :
    (p.pos?.latitude != null ? p.pos.latitude : NaN)))
  );

  const lng = Number(
    p.lng != null ? p.lng :
    (p.lon != null ? p.lon :
    (p.longitude != null ? p.longitude :
    (p.pos?.lng != null ? p.pos.lng :
    (p.pos?.lon != null ? p.pos.lon :
    (p.pos?.longitude != null ? p.pos.longitude : NaN)))))
  );

  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const candidates = [
    p.shareLocation, p.share_location, p.share_loc, p.share,
    p.privacy?.shareLocation, p.privacy?.share_location, p.privacy?.share,
  ];

  for (const raw of candidates) {
    if (raw === undefined) continue;
    const v = truthyShareValue(raw);
    if (v === false) return false;
    if (v === true) return true;
  }

  return hasCoords;
}

function safeStr(v) { return String(v ?? '').trim(); }

function buildFriendEl(nickname, avatar, lat, lng) {
  const root = document.createElement('div');
  root.className = 'cbsgo-marker-root';
  root.style.pointerEvents = 'none';
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

  const setInitialsFallback = () => {
    core.innerHTML = '';
    core.textContent = initialsFromName(nickname);
  };

  if (avatar) {
    const img = document.createElement('img');
    img.src = String(avatar);
    img.alt = nickname || 'friend';
    img.width = 42;
    img.height = 42;
    img.decoding = 'async';
    img.loading = 'eager';
    img.referrerPolicy = 'no-referrer';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    // fallback als avatar stuk is / 404 / CORS
    img.onerror = () => setInitialsFallback();

    core.appendChild(img);
  } else {
    setInitialsFallback();
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

    // accepteer ook latitude/longitude varianten
    const lat = Number(
      p.lat != null ? p.lat :
      (p.latitude != null ? p.latitude :
      (p.pos?.lat != null ? p.pos.lat :
      (p.pos?.latitude != null ? p.pos.latitude : NaN)))
    );

    const lng = Number(
      p.lng != null ? p.lng :
      (p.lon != null ? p.lon :
      (p.longitude != null ? p.longitude :
      (p.pos?.lng != null ? p.pos.lng :
      (p.pos?.lon != null ? p.pos.lon :
      (p.pos?.longitude != null ? p.pos.longitude : NaN)))))
    );

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    const id = safeStr(p.user_id || p.wallet_pk || p.uid || p.id);
    if (!id) continue;

    seen.add(id);

    const nick = safeStr(p.nickname) || 'Player';
    const avatar =
  safeStr(
    p.avatar ??
    p.photo_url ??
    p.photoURL ??
    p.profile_picture ??
    p.profilePicture ??
    p.pfp ??
    p.pf ??
    p.image ??
    p.picture ??
    p.user_metadata?.avatar_url ??
    p.user_metadata?.picture
  ) || '';

    let fm = friendMarkers.get(id);

    if (!fm) {
      const { rootEl, scaleEl } = buildFriendEl(nick, avatar, lat, lng);
      const marker = new maplibregl.Marker({ element: rootEl, anchor: 'center' })
        .setLngLat([lng, lat])
        .addTo(map);

      friendMarkers.set(id, {
        marker, rootEl, scaleEl,
        lat, lng,
        nickname: nick, avatar,
        t: now,
      });
      continue;
    }

    fm.t = now;
    fm.lat = lat;
    fm.lng = lng;

    try { fm.marker.setLngLat([lng, lat]); } catch {}

    try {
      if (fm.rootEl) fm.rootEl.style.zIndex = isInNetherlands(lat, lng) ? '1200' : '1400';
    } catch {}

    // rebuild alleen als nick/avatar echt veranderd is
    if (fm.nickname !== nick || fm.avatar !== avatar) {
      try { fm.marker.remove(); } catch {}

      const { rootEl, scaleEl } = buildFriendEl(nick, avatar, lat, lng);
      const marker = new maplibregl.Marker({ element: rootEl, anchor: 'center' })
        .setLngLat([lng, lat])
        .addTo(map);

      fm.marker = marker;
      fm.rootEl = rootEl;
      fm.scaleEl = scaleEl;
      fm.nickname = nick;
      fm.avatar = avatar;
    }
  }

  friendMarkers.forEach((fm, id) => {
    const tooOld = (now - (fm?.t || 0)) > FRIEND_TTL_MS;
    if (!seen.has(id) || tooOld) {
      try { fm.marker?.remove?.(); } catch {}
      friendMarkers.delete(id);
    }
  });

  applyAllMarkerScales();
}

/* -------------------- VISIBILITY SYNC -------------------- */

function syncGameplayMarkerVisibility() {
  const showGameplay = shouldShowGameplayMarkers();

  // loot
  lootItems.forEach((it) => {
    const el = it?.rootEl;
    if (!el) return;
    el.style.display = showGameplay ? 'block' : 'none';
    // ✅ avoid accidental clicks when hidden
    el.style.pointerEvents = showGameplay ? 'auto' : 'none';
  });

  // ✅ pickup ring only when it should be visible (prevents weird layer "resets")
  if (lastUserLatLng && !inWorldMode) {
    if (showGameplay && shouldShowRing()) {
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
    } else {
      clearPickupRing();
    }
  }

  applyAllMarkerScales();
  updatePlayerArrow();
}

/* -------------------- WEATHER + PLACE + FORECAST -------------------- */

function placeCellKey(lat, lng) {
  const step = 0.002;
  const a = Math.round(lat / step) * step;
  const o = Math.round(lng / step) * step;
  return `${a.toFixed(3)}_${o.toFixed(3)}`;
}

function conditionToEmoji(condition, isNight = false) {
  let iconEmoji = '⛅';
  if (condition === 'clear') iconEmoji = isNight ? '🌙' : '☀️';
  else if (condition === 'clouds') iconEmoji = '☁️';
  else if (condition === 'rain') iconEmoji = '🌧️';
  else if (condition === 'storm') iconEmoji = '⛈️';
  else if (condition === 'snow') iconEmoji = '❄️';
  else if (condition === 'mist') iconEmoji = '🌫️';
  return iconEmoji;
}

function codeToCondition(iconCode, mainLower) {
  let condition = 'clear';

  const code = String(iconCode || '');
  const main = String(mainLower || '').toLowerCase();

  if (code.startsWith('03') || code.startsWith('04')) condition = 'clouds';
  else if (code.startsWith('09') || code.startsWith('10')) condition = 'rain';
  else if (code.startsWith('11')) condition = 'storm';
  else if (code.startsWith('13')) condition = 'snow';
  else if (code.startsWith('50')) condition = 'mist';

  if (main.includes('rain')) condition = 'rain';
  if (main.includes('snow')) condition = 'snow';
  if (main.includes('thunder')) condition = 'storm';

  return condition;
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

/* ✅ FIX: deze helper ontbrak vaak → crash bij openForecastModal */
function dayNameFromDate(dateStr) {
  try {
    // verwacht "YYYY-MM-DD"
    const s = String(dateStr || '').slice(0, 10);
    const d = new Date(s + 'T12:00:00'); // midday = minder timezone gedoe
    if (Number.isNaN(d.getTime())) return s || 'Day';
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  } catch {
    return String(dateStr || 'Day');
  }
}

/**
 * ✅ Day / night class only
 */
function setNightClass(isNight) {
  try {
    document.documentElement.classList.toggle('cbsgo-night', !!isNight);
  } catch (e) {}

  const host = ensureEl('cbsgoMapHost');
  if (host) host.setAttribute('data-night', isNight ? '1' : '0');
}


function closeForecastModal() {
  const backdrop = ensureEl('cbsgoForecastBackdrop');
  const modal = ensureEl('cbsgoForecastModal');
  if (backdrop) {
    backdrop.style.display = 'none';
    backdrop.onclick = null;
  }
  if (modal) modal.style.display = 'none';

  try { window.removeEventListener('keydown', window.__cbsgo_forecast_esc); } catch {}
  window.__cbsgo_forecast_esc = null;
}

function openForecastModal() {
  const backdropId = 'cbsgoForecastBackdrop';
  const modalId = 'cbsgoForecastModal';

  let backdrop = ensureEl(backdropId);
  let modal = ensureEl(modalId);

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = backdropId;
    backdrop.style.cssText = `
      position:fixed; inset:0;
      background:rgba(0,0,0,0.72);
      z-index:99998;
      display:none;
    `;
    document.body.appendChild(backdrop);
  }

  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.style.cssText = `
      position:fixed;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      width:min(92vw, 520px);
      max-height:min(72vh, 560px);
      overflow:auto;
      z-index:99999;
      display:none;
    `;
    document.body.appendChild(modal);
  }

  const place = locationState.place ? String(locationState.place) : 'Your area';
  const updated = forecastState.lastUpdated ? new Date(forecastState.lastUpdated) : null;
  const updatedText = updated ? updated.toLocaleString() : '';

  const rows = (forecastState.days || []).slice(0, 5).map((d) => {
    const dn = dayNameFromDate(d.date);
    const min = Number.isFinite(d.min) ? Math.round(d.min) : '…';
    const max = Number.isFinite(d.max) ? Math.round(d.max) : '…';
    const cond = String(d.condition || '').trim();
    return `
      <div class="cbsgo-pill" style="
        display:flex; align-items:center; justify-content:space-between; gap:10px;
        padding:10px 12px; margin-top:10px;
        background:rgba(10,12,18,0.78);
        border:1px solid rgba(255,255,255,0.14);
      ">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="font-size:20px;">${esc(d.iconEmoji || '⛅')}</div>
          <div>
            <div style="font-weight:800; font-size:13px;">${esc(dn)}</div>
            <div style="opacity:0.75; font-size:12px;">${esc(cond)}</div>
          </div>
        </div>
        <div style="font-weight:900; font-size:13px;">
          <span>${max}°</span>
<span style="opacity:0.35;"> / </span>
<span style="opacity:0.75;">${min}°</span>
        </div>
      </div>
    `;
  }).join('');

  const empty = `
    <div style="margin-top:10px; opacity:0.82; font-size:13px; line-height:1.45;">
      Forecast is loading…<br/>
      If it stays empty: wait a few seconds and tap again.
    </div>
  `;

  modal.innerHTML = `
    <div class="cbsgo-pill" style="
      border-radius:18px;
      padding:14px;
      background:rgba(0,0,0,0.88);
      border:1px solid rgba(120,190,255,0.25);
      box-shadow: 0 18px 40px rgba(0,0,0,0.60);
      color:#fff;
      font-family: system-ui;
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div>
          <div style="font-weight:900; font-size:16px;">5-day forecast</div>
          <div style="opacity:0.75; font-size:12px; margin-top:2px;">
            ${esc(place)} ${updatedText ? '· ' + esc(updatedText) : ''}
          </div>
        </div>
        <button class="cbsgo-pill" type="button" id="cbsgoForecastCloseBtn" style="
          width:42px;height:42px;font-size:18px;
          display:flex;align-items:center;justify-content:center;cursor:pointer;
        ">✕</button>
      </div>

      ${rows || empty}

      <div style="margin-top:12px; opacity:0.6; font-size:12px;">
        Tip: tap outside or press ESC to close.
      </div>
    </div>
  `;

  backdrop.style.display = 'block';
  modal.style.display = 'block';

  const close = () => closeForecastModal();
  const closeBtn = ensureEl('cbsgoForecastCloseBtn');
  if (closeBtn) closeBtn.onclick = close;
  backdrop.onclick = close;

  try {
    if (!window.__cbsgo_forecast_esc) {
      window.__cbsgo_forecast_esc = (ev) => { if (ev?.key === 'Escape') closeForecastModal(); };
    }
    window.addEventListener('keydown', window.__cbsgo_forecast_esc);
  } catch {}
}

function bindWeatherClickOnce() {
  const box = ensureEl('cbsgoWeather');
  if (!box || box.__cbsgo_bound) return;
  box.__cbsgo_bound = true;

  box.style.cursor = 'pointer';
  box.style.userSelect = 'none';
  box.title = 'Tap for 5-day forecast';

  box.addEventListener('click', async () => {
    if (lastUserLatLng) {
      const lat = lastUserLatLng[0];
      const lng = lastUserLatLng[1];

      const stale = !forecastState.lastUpdated || (Date.now() - forecastState.lastUpdated) > 10 * 60 * 1000;
      const empty = !Array.isArray(forecastState.days) || forecastState.days.length === 0;

      if (stale || empty) {
        fetchForecastForLatLng(lat, lng).then(() => {
          const modal = ensureEl('cbsgoForecastModal');
          const isOpen = modal && modal.style.display === 'block';
          if (isOpen) openForecastModal();
        });
      }
    }
    openForecastModal();
  });

  if (typeof window !== 'undefined' && !window.openWeatherForecastModal) {
    window.openWeatherForecastModal = () => {
      try { box.click(); } catch { openForecastModal(); }
    };
  }
}

async function fetchForecastForLatLng(lat, lng) {
  if (!OPEN_WEATHER_API_KEY) return;
  const now = Date.now();

  if (forecastState.lastLatLng) {
    const moved = metersBetween(
      { lat: forecastState.lastLatLng[0], lng: forecastState.lastLatLng[1] },
      { lat, lng }
    );
    if (Number.isFinite(moved) && moved > 2500) forecastState.lastUpdated = 0;
  }

  if (forecastState.lastUpdated && now - forecastState.lastUpdated < 10 * 60 * 1000) return;

  try {
    try { forecastAbort?.abort?.(); } catch {}
    forecastAbort = new AbortController();

    const url =
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}` +
      `&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

    const res = await fetch(url, { signal: forecastAbort.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    const list = Array.isArray(data?.list) ? data.list : [];
    const byDay = new Map();

    for (const it of list) {
      const dtTxt = String(it?.dt_txt || '').slice(0, 10);
      if (!dtTxt) continue;

      const tMin = Number(it?.main?.temp_min);
      const tMax = Number(it?.main?.temp_max);
      const code = it?.weather?.[0]?.icon || '01d';
      const mainLower = String(it?.weather?.[0]?.main || '').toLowerCase();
      const condition = codeToCondition(code, mainLower);

      let row = byDay.get(dtTxt);
      if (!row) {
        row = { date: dtTxt, min: Number.isFinite(tMin) ? tMin : null, max: Number.isFinite(tMax) ? tMax : null, condition, iconCode: code };
        byDay.set(dtTxt, row);
      } else {
        if (Number.isFinite(tMin)) row.min = row.min == null ? tMin : Math.min(row.min, tMin);
        if (Number.isFinite(tMax)) row.max = row.max == null ? tMax : Math.max(row.max, tMax);

        const pri = (c) => (c === 'storm' ? 5 : c === 'snow' ? 4 : c === 'rain' ? 3 : c === 'mist' ? 2 : c === 'clouds' ? 1 : 0);
        if (pri(condition) > pri(row.condition)) {
          row.condition = condition;
          row.iconCode = code;
        }
      }
    }

   const days = [...byDay.values()]
  .sort((a, b) => String(a.date).localeCompare(String(b.date)))
  .slice(0, 5)
  .map((d) => {
    // ✅ Forecast = dag-overzicht → altijd day icon (geen maan)
    const isNight = false;
    return {
      date: d.date,
      min: d.min,
      max: d.max,
      condition: d.condition,
      iconEmoji: conditionToEmoji(d.condition, isNight),
    };
  });

    forecastState = { days, lastUpdated: now, lastLatLng: [lat, lng] };
  } catch (e) {
    if (e?.name === 'AbortError') return;
    console.warn('Forecast fetch failed', e);
  }
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
    try { weatherAbort?.abort?.(); } catch {}
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

    let isNight = String(code).endsWith('n');
    let condition = codeToCondition(code, main);

    try {
      const dt = Number(data?.dt || 0);
      const tz = Number(data?.timezone || 0);
      if (dt && Number.isFinite(tz)) {
        const localTs = dt + tz;
        const hour = ((localTs / 3600) % 24 + 24) % 24;
        isNight = hour < 7 || hour >= 19;
      }
    } catch {}

    const iconEmoji = conditionToEmoji(condition, isNight);

    weatherState = { temp, iconEmoji, condition, isNight, lastUpdated: now };
    lastWeatherLatLng = [lat, lng];

    updateWeatherLabel();
    setNightClass(isNight);

    bindWeatherClickOnce();
    fetchForecastForLatLng(lat, lng);
  } catch (e) {
    if (e?.name === 'AbortError') return;
    console.warn('Weather fetch failed', e);
    bindWeatherClickOnce();
  }
}

async function fetchPlaceName(lat, lng) {
  if (!OPEN_WEATHER_API_KEY) return;

  const now = Date.now();
  const cell = placeCellKey(lat, lng);

  if (cell === lastPlaceCellKey && locationState.place) return;
  if (locationState.lastUpdated && now - locationState.lastUpdated < 10 * 60 * 1000) return;

  try {
    try { placeAbort?.abort?.(); } catch {}
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
    bindWeatherClickOnce();
  } catch (e) {
    if (e?.name === 'AbortError') return;
    console.warn('Place lookup failed', e);
    locationState.lastUpdated = now;
    bindWeatherClickOnce();
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

    .cbsgo-marker-root { position: relative; }
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

    .cbsgo-friend{
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:6px;
      transform: translateY(-6px);
    }
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
    .maplibregl-ctrl { display:none !important; }

    @keyframes cbsgoSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

/* -------------------- LOOT (ALL CARDS + RARITY WEIGHTS) -------------------- */

// Loot chest rarity (size)
function rollLootKind() {
  const r = Math.random();
  if (r < 0.6) return 'small';
  if (r < 0.9) return 'medium';
  if (r < 0.98) return 'large';
  return 'jackpot';
}

// ✅ Card drop settings
const CARD_DROP_CHANCE = 0.35;

// ✅ ALLE kaarten (zelfde ids als cardsPanel.js)
// (Later kun je hier makkelijk 300+ kaarten van maken)
const CARD_DEFS = [
  // Walking
  { id: 'walk_sun_1',         rarity: 'common' },
  { id: 'walk_rain_1',        rarity: 'common' },
  { id: 'walk_night_1',       rarity: 'uncommon' },
  { id: 'walk_city_1',        rarity: 'uncommon' },
  { id: 'walk_nature_1',      rarity: 'rare' },
  { id: 'walk_beach_1',       rarity: 'rare' },
  { id: 'walk_morning_1',     rarity: 'common' },
  { id: 'walk_evening_1',     rarity: 'common' },
  { id: 'walk_park_1',        rarity: 'uncommon' },
  { id: 'walk_bridge_1',      rarity: 'uncommon' },
  { id: 'walk_placeholder_1', rarity: 'common' },
  { id: 'walk_placeholder_2', rarity: 'common' },

  // CBS
  { id: 'cbs_heart_1',        rarity: 'rare' },
  { id: 'cbs_chain_1',        rarity: 'epic' },
  { id: 'cbs_fire_1',         rarity: 'epic' },
  { id: 'cbs_go_1',           rarity: 'legendary' },
  { id: 'cbs_star_1',         rarity: 'rare' },
  { id: 'cbs_glow_1',         rarity: 'rare' },
  { id: 'cbs_team_1',         rarity: 'epic' },
  { id: 'cbs_legend_1',       rarity: 'legendary' },
  { id: 'cbs_placeholder_1',  rarity: 'rare' },
  { id: 'cbs_placeholder_2',  rarity: 'rare' },
];

// ✅ Hoe zeldzamer, hoe minder vaak (tweakbaar)
const RARITY_WEIGHT = {
  common: 1.00,
  uncommon: 0.60,
  rare: 0.25,
  epic: 0.10,
  legendary: 0.04,
};

const cardRarityById = new Map(CARD_DEFS.map((c) => [c.id, (c.rarity || 'common')]));

function isRareOrBetter(cardId) {
  const r = cardRarityById.get(String(cardId)) || 'common';
  return r === 'rare' || r === 'epic' || r === 'legendary';
}

// ✅ Weighted pick: rare/epic/legendary minder vaak
function pickRandomCardId() {
  if (!CARD_DEFS.length) return null;

  let total = 0;
  for (const c of CARD_DEFS) total += (RARITY_WEIGHT[c.rarity] ?? 1);

  if (!(total > 0)) {
    return CARD_DEFS[Math.floor(Math.random() * CARD_DEFS.length)]?.id || null;
  }

  let roll = Math.random() * total;
  for (const c of CARD_DEFS) {
    roll -= (RARITY_WEIGHT[c.rarity] ?? 1);
    if (roll <= 0) return c.id;
  }

  return CARD_DEFS[CARD_DEFS.length - 1].id;
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
    if (chosen) { cardId = chosen; cardCount = 1; }
  }

  return { xp, tickets, cbs, cardId, cardCount };
}

function computeLootGlowPx(kind, reward) {
  const k = kind || 'small';
  const r = reward || {};

  const hasExtra = !!(r.tickets > 0 || r.cbs > 0 || (r.cardId && r.cardCount > 0));
  const hasRareCard = !!(r.cardId && isRareOrBetter(r.cardId));

  let px = 0;
  if (k === 'medium') px = 10;
  if (k === 'large') px = 18;
  if (k === 'jackpot') px = 26;

  if (hasExtra) px = Math.max(px, 12);
  if (hasRareCard) px = Math.max(px, 32);

  return clamp(px, 0, 36);
}

function buildLootGroundEl(kind, reward) {
  const root = document.createElement('div');
  root.className = 'cbsgo-marker-root';
  root.style.pointerEvents = 'auto';
  root.style.touchAction = 'manipulation';
  root.style.cursor = 'pointer';

  const scale = document.createElement('div');
  scale.className = 'cbsgo-scale';
  scale.style.transformOrigin = 'center center';
  scale.style.willChange = 'transform';

  const glowPx = computeLootGlowPx(kind, reward);

  scale.innerHTML = `
    <div class="cbsgo-loot-square" role="button" aria-label="Open loot">
      <div class="cbsgo-loot-star" style="--loot-glow:${glowPx}px;">⭐</div>
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

  const marker = new maplibregl.Marker({ element: rootEl, anchor: 'center', offset: [0, 0] })
    .setLngLat([pos.lng, pos.lat])
    .addTo(map);

  const tryOpen = () => {
    if (!lastUserLatLng) return;

    const player = { lat: lastUserLatLng[0], lng: lastUserLatLng[1] };
    const chest = { lat: pos.lat, lng: pos.lng };
    const dist = metersBetween(player, chest);

    if (dist > PICKUP_RADIUS_M) {
      showToast(`Too far. Move closer (${Math.round(dist)}m / ${PICKUP_RADIUS_M}m).`, 1600);
      return;
    }

    try { marker.remove(); } catch {}
    lootItems = lootItems.filter((x) => x.id !== id);

    const { xp, tickets, cbs, cardId, cardCount } = reward;
    const parts = [];
    if (xp) parts.push(`+${xp} XP`);
    if (tickets) parts.push(`+${tickets} ticket${tickets === 1 ? '' : 's'}`);
    if (cbs) parts.push(`+${cbs} CBS`);
    if (cardId && cardCount > 0) parts.push(`+${cardCount} card`);

    showToast(`Loot found: ${parts.join(' · ')}`, 2000);

    try {
      window.dispatchEvent(new CustomEvent('cbsgo:lootReward', {
        detail: { kind: 'mystery', xp: xp || 0, tickets: tickets || 0, cbs: cbs || 0, cardId, cardCount },
      }));
    } catch {}
  };

  const onPointerUp = (e) => {
    try { e.preventDefault(); } catch {}
    try { e.stopPropagation(); } catch {}
    tryOpen();
  };

  rootEl.addEventListener('pointerup', onPointerUp, { passive: false });
  rootEl.addEventListener('click', (e) => {
    try { e.preventDefault(); } catch {}
    try { e.stopPropagation(); } catch {}
    tryOpen();
  }, { passive: false });

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
      try { item.marker.remove(); } catch {}
      return false;
    }

    const dist = metersBetween(center, { lat: item.lat, lng: item.lng });
    if (Number.isFinite(dist) && dist > LOOT_DESPAWN_DIST_M) {
      try { item.marker.remove(); } catch {}
      return false;
    }
    return true;
  });

  if (lootItems.length === 0) lastLootSpawnAt = 0;
}

/* -------------------- MAP MODES -------------------- */

function setWorldMode({ animate = true } = {}) {
  if (!map) return;
  inWorldMode = true;
  worldUserInteracted = false;

  if (USE_TRUE_GLOBE) {
    try { map.setProjection({ type: 'globe' }); } catch {}
  }

  // World: allow rotate by fingers
  try { map.dragRotate.enable(); } catch {}
  try { map.touchZoomRotate.enableRotation(); } catch {}

  clearPickupRing();
  syncGameplayMarkerVisibility();

  const cam = { center: WORLD_CENTER, zoom: WORLD_ZOOM, bearing: 0, duration: WORLD_VIEW_DURATION_MS };
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

  // Player: finger rotate only
  try { map.dragRotate.disable(); } catch {}
  try { map.touchZoomRotate.enableRotation(); } catch {}

  const has = !!lastUserLatLng;
  const center = has ? [lastUserLatLng[1], lastUserLatLng[0]] : FALLBACK_CENTER;

  if (snap) {
    map.jumpTo({ center, zoom: has ? FOLLOW_ZOOM : FALLBACK_ZOOM });

    ensureRangeLayers();
    elevateRangeLayers();

    if (has) {
      forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
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

  ensureRangeLayers();
  const cam = { center, zoom: has ? FOLLOW_ZOOM : FALLBACK_ZOOM, duration: PLAYER_VIEW_DURATION_MS };
  if (animate) map.easeTo(cam);
  else map.jumpTo({ center: cam.center, zoom: cam.zoom });

  if (worldBtnEl) worldBtnEl.textContent = '🧭';

  if (has) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
  if (has) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);

  if (lastOnlinePlayers.length) upsertFriendMarkers(lastOnlinePlayers);

  syncGameplayMarkerVisibility();
  applyAllMarkerScales();
}

/* -------------------- MAP INIT -------------------- */

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

      ensureRangeLayers();
      elevateRangeLayers();

      if (lastUserLatLng && !inWorldMode) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
      if (lastUserLatLng) ensurePlayerMarker(lastUserLatLng[0], lastUserLatLng[1]);
      if (lastOnlinePlayers.length) upsertFriendMarkers(lastOnlinePlayers);

      applyAllMarkerScales();
    });
  });

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

  map.on('idle', () => {
    if (!map || destroyed) return;
    if (!map.isStyleLoaded()) return;
    ensureRangeLayers();
    elevateRangeLayers();
    if (lastUserLatLng && !inWorldMode) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
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
    if (lastUserLatLng && !inWorldMode) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
    updatePlayerArrow();
    applyAllMarkerScales();
  });

  map.on('moveend', () => {
    if (lastUserLatLng && !inWorldMode) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);
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

      if (lastUserLatLng && !inWorldMode) forceUpdatePickupRing(lastUserLatLng[0], lastUserLatLng[1]);

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

/* -------------------- GPS -------------------- */

function startGps() {
  if (!navigator.geolocation) return;

// -------------------- Dynamic treasures from Supabase --------------------
let lastTreasureCheckAt = 0;
let lastTreasureFetchAt = 0;
let treasurePopupOpen = false;
let treasureSeenThisSession = false;
let activeTreasures = [];
let activeNearbyTreasure = null;
let activeTreasureMarkers = new Map();

const TREASURE_FETCH_INTERVAL_MS = 15000;

const getSupabaseClient = async () => {
  try {
    if (window.__cbsgo_supabase_client) return window.__cbsgo_supabase_client;

    const { createClient } = await import('@supabase/supabase-js');
    const url = import.meta.env.VITE_SUPABASE_URL;
    const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !anon) {
      console.warn('CBS-GO: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
      return null;
    }

    const client = createClient(url, anon);
    window.__cbsgo_supabase_client = client;
    return client;
  } catch (e) {
    console.warn('CBS-GO: failed to create Supabase client', e);
    return null;
  }
};

const refreshActiveTreasures = async () => {
  try {
    const supabase = await getSupabaseClient();
    if (!supabase) return;

    const { data, error } = await supabase
      .from('treasures')
      .select('id,title,lat,lng,radius_m,reward_bonk,reward_cbs,reward_sol,status')
      .eq('status', 'active')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('CBS-GO: failed to fetch treasures', error);
      return;
    }

    activeTreasures = Array.isArray(data) ? data : [];
    lastTreasureFetchAt = Date.now();
  } catch (e) {
    console.warn('CBS-GO: refreshActiveTreasures failed', e);
  }
};

const getLocalPkSafe = () => {
  try {
    if (typeof window !== 'undefined' && typeof window.getLocalPublicKey === 'function') {
      return String(window.getLocalPublicKey() || '').trim();
    }
  } catch {}
  return '';
};

const buildShareText = (treasure) => {
  const title = treasure?.title || 'a CBS-GO treasure';
  return `I found ${title} in CBS-GO. 🎁🌍 #CBSGO #Solana`;
};

const shareOnX = (treasure) => {
  try {
    const text = encodeURIComponent(buildShareText(treasure));
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (e) {
    console.warn('CBS-GO: shareOnX failed', e);
  }
};

const shareOnTelegram = (treasure) => {
  try {
    const text = encodeURIComponent(buildShareText(treasure));
    const url = `https://t.me/share/url?url=&text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (e) {
    console.warn('CBS-GO: shareOnTelegram failed', e);
  }
};

const getMarkerClass = () => {
  try {
    if (typeof mapboxgl !== 'undefined' && mapboxgl?.Marker) return mapboxgl.Marker;
  } catch {}

  try {
    if (typeof maplibregl !== 'undefined' && maplibregl?.Marker) return maplibregl.Marker;
  } catch {}

  try {
    if (window?.mapboxgl?.Marker) return window.mapboxgl.Marker;
  } catch {}

  try {
    if (window?.maplibregl?.Marker) return window.maplibregl.Marker;
  } catch {}

  return null;
};

const ensureTreasureStyles = () => {
  if (document.getElementById('cbsgoTreasureStyles')) return;

  const style = document.createElement('style');
  style.id = 'cbsgoTreasureStyles';
  style.textContent = `

.cbsgo-treasure-marker{
  position:relative;
  width:64px;
  height:64px;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  user-select:none;
}

/* glow ring op de grond */
.cbsgo-treasure-marker .ring{
  position:absolute;
  bottom:4px;
  left:50%;
  transform:translateX(-50%);
  width:42px;
  height:14px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(34,211,238,.45), rgba(34,211,238,.05) 70%, transparent);
  filter:blur(3px);
  animation:cbsgoTreasureRing 1.8s ease-in-out infinite;
}

/* het cadeau zelf */
.cbsgo-treasure-marker .gift{
  font-size:36px;
  animation:cbsgoTreasureFloat 2s ease-in-out infinite;
  text-shadow:
    0 0 10px rgba(255,255,255,.4),
    0 0 20px rgba(34,211,238,.3);
}

/* label */
.cbsgo-treasure-marker .label{
  position:absolute;
  bottom:-12px;
  font-size:10px;
  font-weight:800;
  color:#e0f2fe;
  background:rgba(2,6,23,.8);
  border:1px solid rgba(56,189,248,.35);
  border-radius:999px;
  padding:2px 7px;
  pointer-events:none;
}

/* animaties */

@keyframes cbsgoTreasureFloat{
  0%{ transform:translateY(0px); }
  50%{ transform:translateY(-6px); }
  100%{ transform:translateY(0px); }
}

@keyframes cbsgoTreasureRing{
  0%{ transform:translateX(-50%) scale(.9); opacity:.6;}
  50%{ transform:translateX(-50%) scale(1.1); opacity:1;}
  100%{ transform:translateX(-50%) scale(.9); opacity:.6;}
}

  `;
  document.head.appendChild(style);
};
const removeTreasureMarker = (id) => {
  const entry = activeTreasureMarkers.get(String(id));
  if (!entry) return;

  try {
    entry.marker?.remove?.();
  } catch (e) {
    console.warn('CBS-GO: removeTreasureMarker failed', e);
  }

  activeTreasureMarkers.delete(String(id));
};

const clearAllTreasureMarkers = () => {
  for (const id of [...activeTreasureMarkers.keys()]) {
    removeTreasureMarker(id);
  }
};

const createTreasureMarkerElement = (treasure, onClick) => {

  const el = document.createElement('div');
  el.className = 'cbsgo-treasure-marker';

  el.innerHTML = `
    <div class="gift">🎁</div>
    <div class="ring"></div>
    <div class="label">TREASURE</div>
  `;

  el.onclick = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return el;
};

const showTreasurePopup = ({ treasure, distanceM, accuracyM }) => {
  if (!treasure || treasurePopupOpen) return;
  treasurePopupOpen = true;
  activeNearbyTreasure = treasure;

  const hostId = 'cbsgoTreasurePopupHost';
  let host = document.getElementById(hostId);
  if (!host) {
    host = document.createElement('div');
    host.id = hostId;
    document.body.appendChild(host);
  }

  host.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style.position = 'fixed';
  wrap.style.inset = '0';
  wrap.style.zIndex = '9000';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.background = 'rgba(2,6,23,.74)';
  wrap.style.backdropFilter = 'blur(8px)';
  wrap.style.webkitBackdropFilter = 'blur(8px)';
  wrap.style.pointerEvents = 'auto';

  const card = document.createElement('div');
  card.style.width = 'min(430px, 92vw)';
  card.style.borderRadius = '28px';
  card.style.border = '1px solid rgba(56,189,248,.45)';
  card.style.background = 'linear-gradient(180deg, rgba(8,15,28,.98) 0%, rgba(7,10,18,.98) 100%)';
  card.style.boxShadow = '0 30px 90px rgba(0,0,0,.58), 0 0 0 1px rgba(255,255,255,.03) inset, 0 0 40px rgba(34,211,238,.10)';
  card.style.padding = '18px';
  card.style.color = '#fff';
  card.style.fontFamily = 'system-ui,sans-serif';
  card.style.opacity = '0';
  card.style.transform = 'translateY(18px) scale(0.96)';
  card.style.transition = 'opacity .22s ease-out, transform .22s ease-out';

  const pk = getLocalPkSafe();
  const d = Math.max(0, Math.round(Number(distanceM || 0)));
  const acc = Number.isFinite(accuracyM) ? Math.round(accuracyM) : null;

  const rewardBonk = Number(treasure?.reward_bonk || 0);
  const rewardCbs = Number(treasure?.reward_cbs || 0);
  const rewardSol = Number(treasure?.reward_sol || 0);

  const rewardParts = [];
  if (rewardBonk > 0) rewardParts.push(`🐕 ${rewardBonk} BONK`);
  if (rewardCbs > 0) rewardParts.push(`🪙 ${rewardCbs} CBS`);
  if (rewardSol > 0) rewardParts.push(`☀️ ${rewardSol} SOL`);

  card.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      gap:14px;
      margin-bottom:14px;
      padding:12px;
      border-radius:20px;
      background:linear-gradient(180deg, rgba(15,23,42,.68), rgba(2,6,23,.5));
      border:1px solid rgba(56,189,248,.18);
    ">
      <div style="
        width:58px;height:58px;border-radius:18px;
        border:1px solid rgba(56,189,248,.38);
        background:
          radial-gradient(circle at 30% 25%, rgba(103,232,249,.18), rgba(34,211,238,.06) 45%, rgba(0,0,0,0) 72%),
          linear-gradient(180deg, rgba(15,23,42,.98), rgba(8,15,28,.98));
        display:flex;align-items:center;justify-content:center;
        font-size:28px;
        box-shadow: 0 10px 30px rgba(34,211,238,.12);
      ">🎁</div>

      <div style="min-width:0;flex:1;">
        <div style="font-size:18px;font-weight:900;letter-spacing:.01em;">Treasure nearby</div>
        <div style="font-size:12px;opacity:.82;line-height:1.45;margin-top:3px;">
          ${treasure?.title ? `Tap to open <b>${treasure.title}</b>.` : 'You are close enough to open this treasure.'}
        </div>
      </div>
    </div>

    <div style="
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:10px;
      margin-bottom:12px;
    ">
      <div style="
        padding:11px 12px;
        border-radius:16px;
        background:rgba(15,23,42,.72);
        border:1px solid rgba(148,163,184,.18);
      ">
        <div style="font-size:10px;opacity:.7;text-transform:uppercase;letter-spacing:.08em;">Distance</div>
        <div style="font-size:18px;font-weight:900;margin-top:2px;">${d}m</div>
      </div>

      <div style="
        padding:11px 12px;
        border-radius:16px;
        background:rgba(15,23,42,.72);
        border:1px solid rgba(148,163,184,.18);
      ">
        <div style="font-size:10px;opacity:.7;text-transform:uppercase;letter-spacing:.08em;">GPS accuracy</div>
        <div style="font-size:18px;font-weight:900;margin-top:2px;">${acc !== null ? `±${acc}m` : '—'}</div>
      </div>
    </div>

    ${
      rewardParts.length
        ? `
    <div style="
      margin-bottom:12px;
      padding:12px 13px;
      border-radius:18px;
      background:linear-gradient(180deg, rgba(8,47,73,.55), rgba(15,23,42,.78));
      border:1px solid rgba(56,189,248,.28);
      box-shadow: 0 8px 28px rgba(2,132,199,.08) inset;
    ">
      <div style="font-size:10px;opacity:.72;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px;">Reward</div>
      <div style="font-size:13px;font-weight:800;line-height:1.6;">${rewardParts.join(' · ')}</div>
    </div>`
        : ''
    }

    <div style="
      padding:11px 12px;
      border-radius:16px;
      border:1px solid rgba(148,163,184,.22);
      background:rgba(15,23,42,.68);
      font-size:11px;
      opacity:.9;
      line-height:1.5;
      margin-bottom:14px;
    ">
      Manual open mode is active.<br>
      This treasure can only be opened once, so first valid claim wins.
    </div>

    <div style="display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-bottom:10px;">
      <button id="cbsgoTreasureCancelBtn" type="button" style="
        padding:10px 14px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        color:#fff;
        font-size:12px;
        font-weight:800;
        cursor:pointer;
      ">Close</button>

      <button id="cbsgoTreasureOpenBtn" type="button" style="
        padding:10px 16px;
        border-radius:999px;
        border:1px solid rgba(34,197,94,.65);
        background:linear-gradient(180deg, rgba(34,197,94,.98), rgba(22,163,74,.96));
        color:#fff;
        font-size:12px;
        font-weight:900;
        cursor:pointer;
        box-shadow: 0 12px 26px rgba(22,163,74,.22);
      ">Open treasure</button>
    </div>

    <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-bottom:4px;">
      <button id="cbsgoTreasureShareXBtn" type="button" style="
        padding:8px 12px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.04);
        color:#fff;
        font-size:11px;
        font-weight:800;
        cursor:pointer;
      ">Share on X</button>

      <button id="cbsgoTreasureShareTgBtn" type="button" style="
        padding:8px 12px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.04);
        color:#fff;
        font-size:11px;
        font-weight:800;
        cursor:pointer;
      ">Share on Telegram</button>
    </div>

    <div id="cbsgoTreasureMsg" style="margin-top:10px;font-size:11px;opacity:.85;min-height:16px;"></div>

    ${
      pk
        ? ''
        : `<div style="margin-top:8px;font-size:11px;opacity:.85;color:#fecaca;">
        ⚠️ No local wallet detected yet. Finish login/PIN first.
      </div>`
    }
  `;

  const close = () => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px) scale(0.96)';
    setTimeout(() => {
      if (host) host.innerHTML = '';
      treasurePopupOpen = false;
      activeNearbyTreasure = null;
    }, 220);
  };

  wrap.appendChild(card);
  host.appendChild(wrap);

  requestAnimationFrame(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
  });

  wrap.addEventListener('click', (e) => {
    if (e.target === wrap) close();
  });

  const cancelBtn = document.getElementById('cbsgoTreasureCancelBtn');
  if (cancelBtn) cancelBtn.onclick = close;

  const shareXBtn = document.getElementById('cbsgoTreasureShareXBtn');
  if (shareXBtn) shareXBtn.onclick = () => shareOnX(treasure);

  const shareTgBtn = document.getElementById('cbsgoTreasureShareTgBtn');
  if (shareTgBtn) shareTgBtn.onclick = () => shareOnTelegram(treasure);

  const msgEl = document.getElementById('cbsgoTreasureMsg');
  const setMsg = (t) => {
    if (msgEl) msgEl.textContent = t || '';
  };

  const openBtn = document.getElementById('cbsgoTreasureOpenBtn');
  if (openBtn) {
    openBtn.onclick = () => {
      const claimant_wallet = getLocalPkSafe();
      if (!claimant_wallet) {
        setMsg('⛔ No local wallet found. Finish login/PIN first.');
        return;
      }

      openBtn.disabled = true;
      setMsg('Opening…');

      try {
        window.dispatchEvent(
          new CustomEvent('cbsgo:treasureOpenRequest', {
            detail: {
              treasure_id: treasure.id,
              claimant_wallet,
              radius_m: Number(treasure.radius_m || 0),
              center: {
                lat: Number(treasure.lat),
                lng: Number(treasure.lng),
              },
              distance_m: d,
              t: Date.now(),
            },
          })
        );
      } catch (e) {
        console.warn('CBS-GO: treasureOpenRequest dispatch failed', e);
      }

      treasureSeenThisSession = true;
      removeTreasureMarker(treasure.id);

      setMsg('✅ Request sent. If you are first, payout will arrive shortly.');
      setTimeout(() => close(), 900);
    };
  }
};

const syncNearbyTreasureMarkers = (center, accuracyM) => {
  if (!map || !Array.isArray(activeTreasures)) return;

  if (treasureSeenThisSession) {
    clearAllTreasureMarkers();
    return;
  }

  ensureTreasureStyles();

  const MarkerClass = getMarkerClass();
  if (!MarkerClass) {
    console.warn('CBS-GO: no Marker class found (mapboxgl/maplibregl)');
    return;
  }

  const visibleIds = new Set();

  for (const t of activeTreasures) {
    const id = String(t?.id ?? '');
    const lat = Number(t?.lat);
    const lng = Number(t?.lng);
    const radius = Number(t?.radius_m || 0);

    if (!id || !Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isFinite(radius) || radius <= 0) {
      removeTreasureMarker(id);
      continue;
    }

    const dist = metersBetween(center, { lat, lng });
    const jitter = Number.isFinite(accuracyM) ? Math.min(Math.max(accuracyM, 0), 25) : 10;

    // claim/open afstand
    const openDistance = radius + jitter;

    // reveal afstand:
    // treasure wordt pas zichtbaar als je echt dichtbij bent
    // minimum 20m, maximum 60m, of de echte radius als die kleiner is
    const revealDistance = Math.min(openDistance, Math.max(20, Math.min(radius, 60)));

    // buiten reveal afstand = marker weg
    if (!Number.isFinite(dist) || dist > revealDistance) {
      removeTreasureMarker(id);
      continue;
    }

    visibleIds.add(id);

    const existing = activeTreasureMarkers.get(id);

    if (!existing) {
      const el = createTreasureMarkerElement(t, () => {
        const latest = activeTreasureMarkers.get(id);
        if (!latest) return;

        // popup alleen openen als je nog steeds binnen echte open radius bent
        if (!Number.isFinite(latest.distanceM) || latest.distanceM > (Number(latest.treasure?.radius_m || 0) + (Number.isFinite(latest.accuracyM) ? Math.min(Math.max(latest.accuracyM, 0), 25) : 10))) {
          return;
        }

        showTreasurePopup({
          treasure: latest.treasure,
          distanceM: latest.distanceM,
          accuracyM: latest.accuracyM,
        });
      });

      let marker = null;

      try {
        marker = new MarkerClass({
          element: el,
          anchor: 'bottom',
        })
          .setLngLat([lng, lat])
          .addTo(map);
      } catch (e) {
        console.warn('CBS-GO: failed to create treasure marker', e);
        continue;
      }

      activeTreasureMarkers.set(id, {
        marker,
        el,
        treasure: t,
        distanceM: dist,
        accuracyM,
      });
    } else {
      existing.treasure = t;
      existing.distanceM = dist;
      existing.accuracyM = accuracyM;

      try {
        existing.marker?.setLngLat?.([lng, lat]);
      } catch (e) {
        console.warn('CBS-GO: failed to update treasure marker position', e);
      }
    }
  }

  for (const id of [...activeTreasureMarkers.keys()]) {
    if (!visibleIds.has(id)) {
      removeTreasureMarker(id);
    }
  }
};

navigator.geolocation.watchPosition(
  async (pos) => {
    if (destroyed) return;

    const { latitude, longitude, heading } = pos.coords;
    const center = { lat: latitude, lng: longitude };

    const prev = lastUserLatLng ? { lat: lastUserLatLng[0], lng: lastUserLatLng[1] } : null;

        lastUserLatLng = [latitude, longitude];
    hasGpsFix = true;

    const uiLatLng = smoothUiLatLng(
      latitude,
      longitude,
      Number.isFinite(pos.coords.accuracy) ? pos.coords.accuracy : null
    ) || [latitude, longitude];

    let gpsHeading = null;
    if (Number.isFinite(heading)) gpsHeading = wrap360(heading);
    else if (prev) {
      const distMoved = metersBetween(prev, center);
      if (Number.isFinite(distMoved) && distMoved > 2) {
        gpsHeading = wrap360(computeHeadingDeg(prev, center));
      }
    }
    if (Number.isFinite(gpsHeading)) lastHeadingDeg = wrap360(gpsHeading);

       if (map) ensurePlayerMarker(uiLatLng[0], uiLatLng[1]);
    updatePlayerArrow();

    if (!inWorldMode) {
      spawnLootAround(center);
      cleanupLoot(center);
      forceUpdatePickupRing(uiLatLng[0], uiLatLng[1]);
    }

    applyAllMarkerScales();

    fetchWeatherForLatLng(latitude, longitude);
    fetchPlaceName(latitude, longitude);

    try {
      const now = Date.now();
      if (!lastTreasureFetchAt || now - lastTreasureFetchAt > TREASURE_FETCH_INTERVAL_MS) {
        await refreshActiveTreasures();
      }
    } catch {}

    try {
      const now = Date.now();
      if (now - lastTreasureCheckAt > 1200) {
        lastTreasureCheckAt = now;

        const acc = Number.isFinite(pos.coords.accuracy) ? pos.coords.accuracy : null;
        syncNearbyTreasureMarkers(center, acc);
      }
    } catch (e) {
      console.warn('CBS-GO: treasure marker check failed', e);
    }

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

      <div id="cbsgoTopLeftUi" style="
        position:absolute;
        left:12px;
        top:calc(env(safe-area-inset-top, 0px) + 42px);
        z-index:3000;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        gap:10px;
        pointer-events:none;
      ">
        <div id="cbsgoWeather" class="cbsgo-pill" style="
          position:relative;
          margin:0;
          padding:6px 10px;
          font-size:12px;
          display:inline-flex;
          align-items:center;
          gap:6px;
          text-align:left;
          max-width:min(62vw, 240px);
          cursor:pointer;
          user-select:none;
          pointer-events:auto;
        " title="Tap for 5-day forecast">
          <span id="cbsgoWeatherLabel">${esc(getWeatherLabel())}</span>
        </div>

        <div id="cbsgoMapControls" style="
          position:relative;
          margin:0;
          display:flex;
          flex-direction:column;
          gap:10px;
          pointer-events:auto;
        ">
          <button id="cbsgoWorldBtn" class="cbsgo-pill" type="button" aria-label="World / Player toggle"
            style="
              width:52px;
              height:52px;
              margin:0;
              font-size:22px;
              display:flex;
              align-items:center;
              justify-content:center;
              cursor:pointer;
            ">
            🌍
          </button>
        </div>
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

    // prevent double init
    if (window.__cbsgo_map_inited) return;
    window.__cbsgo_map_inited = true;

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

    const worldBtn = ensureEl('cbsgoWorldBtn');
    worldBtnEl = worldBtn || null;

    bindWeatherClickOnce();

    /* -------------------- WORLD / PLAYER BTN -------------------- */
    if (worldBtn) {
      worldBtn.onclick = () => {
        if (!map) return;

        worldBtn.style.animation = 'cbsgoSpin 0.6s cubic-bezier(0.25,0.46,0.45,0.94)';
        setTimeout(() => { worldBtn.style.animation = ''; }, 600);

        if (inWorldMode) setPlayerMode({ animate: false, snap: true });
        else setWorldMode({ animate: true });

        applyAllMarkerScales();
      };
    }

    if (!window.__cbsgo_profile_listener) {
      window.__cbsgo_profile_listener = true;
      window.addEventListener('cbsgo:profileChanged', () => refreshPlayerLooks());
    }

    updateWeatherLabel();
    startGps();
  };

  tick();
}