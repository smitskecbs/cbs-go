// src/ui/mapView.js
// Fullscreen Leaflet map:
// ✅ Player marker uses profile avatar/initial
// ✅ Puzzles tijdelijk UIT (PUZZLES_ENABLED = false)
// ✅ Daily Glow logic aanwezig maar doet niks als puzzels uit staan
// ✅ No infinite world scrolling (noWrap + maxBounds)
// ✅ Can zoom out to world level (minZoom 1/0-ish)

import { nodes } from '../data/nodes.js';
import { isNodeCompleted } from '../app/state.js';
import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';

let map = null;
let userMarker = null;
let nodesLayer = null;
let dailyMarker = null;
let lastUserLatLng = null;      // laatst bekende spelerpositie
let worldViewMode = false;      // voor het kompas

const NODES_POS_KEY = 'cbsgo_nodes_pos_v3';
const DAILY_MARKER_KEY = 'cbsgo_daily_marker_v1';

// 🔧 Puzzels uit, zodat je geen 🧩 meer ziet
const PUZZLES_ENABLED = false;

function ensureEl(id) {
  return document.getElementById(id);
}

function showMapMsg(text) {
  const host = ensureEl('cbsgoMapHost');
  if (!host) return;

  let msg = ensureEl('cbsgoMapMsg');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'cbsgoMapMsg';
    msg.style.position = 'absolute';
    msg.style.left = '12px';
    msg.style.right = '12px';
    // GPS-balk laag bij de onderrand (onder je Profile/Bag knoppen)
    msg.style.bottom = '16px';
    msg.style.zIndex = '9999';
    msg.style.padding = '10px 12px';
    msg.style.borderRadius = '14px';
    msg.style.border = '1px solid rgba(255,255,255,.14)';
    msg.style.background = 'rgba(0,0,0,.40)';
    msg.style.color = '#fff';
    msg.style.fontFamily = 'system-ui, sans-serif';
    msg.style.fontSize = '13px';
    msg.style.backdropFilter = 'blur(10px)';
    host.appendChild(msg);
  }
  msg.textContent = text || '';
}

function initialsFromName() {
  const n = String(getPlayerName() || '').trim();
  if (!n) return '🙂';
  return n[0].toUpperCase();
}

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function writeJSON(key, v) {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
}

function visibleNodes() {
  return nodes.filter((n) => n.type !== 'group' && !isNodeCompleted(n.id));
}

/* ---------- Icons ---------- */

function buildPlayerIcon(L) {
  const av = getPlayerAvatar();
  if (av) {
    const html = `
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${av}');
        background-size:cover;
        background-position:center;
      "></div>
    `;
    return L.divIcon({ html, className: '', iconSize: [42, 42], iconAnchor: [21, 21] });
  }

  const ini = esc(initialsFromName());
  const html = `
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${ini}</div>
  `;
  return L.divIcon({ html, className: '', iconSize: [38, 38], iconAnchor: [19, 19] });
}

function buildPuzzleIcon(L, glow = false) {
  const html = `
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${glow ? '0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)' : '0 10px 22px rgba(0,0,0,.35)'}; 
      font-size:22px;
    ">🧩</div>
  `;
  return L.divIcon({ html, className: '', iconSize: [44, 44], iconAnchor: [22, 22] });
}

function buildDailyGlowIcon(L) {
  const html = `
    <div style="
      width:52px;height:52px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 22px rgba(120,220,255,.70), 0 0 40px rgba(120,220,255,.35), 0 12px 26px rgba(0,0,0,.40);
      font-size:22px;
    ">
      ✨🧩
    </div>
  `;
  return L.divIcon({ html, className: '', iconSize: [52, 52], iconAnchor: [26, 26] });
}

/* ---------- Dag/nacht helpers ---------- */

function isNight() {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
}

/* ---------- Simpele lokale "weather" bubble ---------- */

function getWeatherLabel() {
  const night = isNight();
  // Zonder echte weer-API doen we het simpel op tijd:
  // - overdag: zon
  // - 's avonds: maan
  const icon = night ? '🌙' : '☀️';
  const temp = night ? '-1°' : '3°'; // placeholder, kan later echte data worden
  return `${icon} ${temp}`;
}

/* ---------- Node positioning (stable around seed) ---------- */

function ensureNodePositions(seedCenter) {
  const stored = readJSON(NODES_POS_KEY, null);
  if (stored && stored.seed && stored.posById) return stored;

  const list = visibleNodes();
  const posById = {};
  const placed = [];

  const minSepM = 90;
  const minR = 180;
  const maxR = 520;
  const maxTry = 5000;

  function toDegOffset(lat, rM, ang) {
    const dLat = (rM * Math.cos(ang)) / 111111;
    const dLng = (rM * Math.sin(ang)) / (111111 * Math.cos((lat * Math.PI) / 180));
    return { dLat, dLng };
  }

  let tries = 0;
  for (const node of list) {
    let ok = false;
    while (!ok && tries < maxTry) {
      tries++;
      const r = minR + Math.random() * (maxR - minR);
      const ang = Math.random() * Math.PI * 2;
      const off = toDegOffset(seedCenter.lat, r, ang);
      const cand = { lat: seedCenter.lat + off.dLat, lng: seedCenter.lng + off.dLng };
      ok = placed.every((p) => metersBetween(p, cand) >= minSepM);
      if (ok) {
        placed.push(cand);
        posById[node.id] = { dLat: off.dLat, dLng: off.dLng };
      }
    }
    if (!posById[node.id]) {
      const off = toDegOffset(seedCenter.lat, minR, Math.random() * Math.PI * 2);
      posById[node.id] = { dLat: off.dLat, dLng: off.dLng };
    }
  }

  const save = { seed: seedCenter, posById, createdAt: Date.now() };
  writeJSON(NODES_POS_KEY, save);
  return save;
}

function nodeLatLng(node, centerSeed) {
  const stored = readJSON(NODES_POS_KEY, null);
  const seed = stored?.seed || centerSeed;
  const off = stored?.posById?.[node.id];
  if (!seed || !off) return null;
  return { lat: seed.lat + off.dLat, lng: seed.lng + off.dLng };
}

/* ---------- Leaflet setup + UI ---------- */

export function renderMapView() {
  const weatherLabel = getWeatherLabel();
  const night = isNight();

  return `
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Night overlay: maakt de kaart donker in de avond/nacht -->
      <div id="cbsgoNightOverlay" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        z-index:1500;
        background:${night ? 'rgba(0,0,0,.45)' : 'transparent'};
        transition: background .4s ease;
      "></div>

      <!-- Weer-bolletje linksboven -->
      <div id="cbsgoWeather" style="
        position:absolute;
        top:16px;
        left:12px;
        z-index:3000;
        padding:6px 10px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.18);
        background:rgba(10,12,18,.78);
        backdrop-filter: blur(10px);
        font-size:12px;
        color:#fff;
        font-family:system-ui,sans-serif;
        display:inline-flex;
        align-items:center;
        gap:6px;
      ">
        <span>${weatherLabel}</span>
      </div>

      <!-- Kompas + centreer-player RECHTSONDER, groot als Profile/Bag -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;              
        bottom:148px;            
        z-index:3000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
        <button id="cbsgoCompassBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          color:#fff;
          font-size:22px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">🧭</button>
        <button id="cbsgoCenterBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          color:#fff;
          font-size:22px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">🎯</button>
      </div>
    </div>
  `;
}

function destroyMapIfAny() {
  try {
    if (map) {
      map.remove();
      map = null;
      userMarker = null;
      nodesLayer = null;
      dailyMarker = null;
      lastUserLatLng = null;
      worldViewMode = false;
    }
  } catch {}
}

function initLeaflet() {
  const L = window.L;
  const el = ensureEl('cbsgoMap');
  if (!L || !el) return false;

  destroyMapIfAny();

  const worldBounds = L.latLngBounds(
    L.latLng(-85, -180),
    L.latLng(85, 180)
  );

  map = L.map(el, {
    zoomControl: false,
    attributionControl: false,
    worldCopyJump: true,
    maxBounds: worldBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 1,
    maxZoom: 19
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    noWrap: true,
    bounds: worldBounds
  }).addTo(map);

  map.setView([51.687, 4.87], 16);

  nodesLayer = L.layerGroup().addTo(map);

  return true;
}

function setUserMarker(latlng) {
  const L = window.L;
  if (!L || !map) return;

  const icon = buildPlayerIcon(L);

  if (!userMarker) {
    userMarker = L.marker(latlng, { icon }).addTo(map);
    map.setView(latlng, 18);
    return;
  }

  userMarker.setIcon(icon);
  userMarker.setLatLng(latlng);
}

/* ---------- Puzzels (nu uitgeschakeld) ---------- */

function renderNodes(center) {
  if (!PUZZLES_ENABLED) return;

  const L = window.L;
  if (!L || !map || !nodesLayer) return;

  const keepDaily = dailyMarker;

  nodesLayer.clearLayers();

  if (keepDaily) {
    dailyMarker = keepDaily;
    dailyMarker.addTo(nodesLayer);
  }

  const stored = ensureNodePositions(center);
  const list = visibleNodes();

  const OPEN_RADIUS_M = 65;
  const VISIBLE_RADIUS_M = 1600;

  const pts = [];
  for (const node of list) {
    const ll = nodeLatLng(node, stored.seed);
    if (!ll) continue;
    const dist = Math.round(metersBetween(center, ll));
    if (dist > VISIBLE_RADIUS_M) continue;
    pts.push({ node, ll, dist });
  }

  pts.sort((a, b) => a.dist - b.dist);

  pts.forEach(({ node, ll, dist }) => {
    const marker = L.marker([ll.lat, ll.lng], { icon: buildPuzzleIcon(L, dist <= OPEN_RADIUS_M) });

    marker.on('click', () => {
      if (dist > OPEN_RADIUS_M) {
        alert(`Too far.\n\nGo closer to open:\n${node.name}\nDistance: ${dist}m\nRequired: ≤ ${OPEN_RADIUS_M}m`);
        return;
      }
      window.dispatchEvent(new CustomEvent('cbsgo:openNode', { detail: { id: node.id } }));
    });

    marker.addTo(nodesLayer);
  });
}

/* ---------- Daily marker ---------- */

function getDailyMarkerState() {
  return readJSON(DAILY_MARKER_KEY, { date: '', shown: false });
}
function setDailyMarkerState(v) {
  writeJSON(DAILY_MARKER_KEY, v);
}

function ensureDailyMarkerAt(center) {
  // als puzzels uit zijn, ook geen daily marker tonen
  if (!PUZZLES_ENABLED) return;

  const L = window.L;
  if (!L || !map || !nodesLayer) return;

  const s = getDailyMarkerState();
  const t = todayKey();

  if (s.date === t && s.shown === false) return;

  if (s.date !== t) {
    setDailyMarkerState({ date: t, shown: true });
  }

  if (dailyMarker) return;

  dailyMarker = L.marker([center.lat, center.lng], { icon: buildDailyGlowIcon(L) }).addTo(nodesLayer);
  dailyMarker.on('click', () => {
    window.dispatchEvent(new CustomEvent('cbsgo:openNode', { detail: { id: '__daily__' } }));
  });

  // geen extra overlay-tekst meer
  // showMapMsg(`✨ Daily Glow puzzle spawned on you (1x/day). Tap it to play.`);
}

if (!window.__cbsgo_daily_marker_listener_v1) {
  window.__cbsgo_daily_marker_listener_v1 = true;

  window.addEventListener('cbsgo:dailyPuzzle', (ev) => {
    const d = ev?.detail || {};
    if (!d.lat || !d.lng) return;
    setDailyMarkerState({ date: todayKey(), shown: true });
    if (map && window.L && nodesLayer) {
      ensureDailyMarkerAt({ lat: d.lat, lng: d.lng });
    }
  });
}

/* ---------- GPS ---------- */

function startGps() {
  if (!navigator.geolocation || !map || !window.L) return;

  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      const center = { lat: latitude, lng: longitude };

      lastUserLatLng = [latitude, longitude];  // voor centreer-knop
      setUserMarker([latitude, longitude]);

      ensureDailyMarkerAt(center);
      renderNodes(center);

      showMapMsg(`GPS OK • accuracy ~${Math.round(accuracy)}m`);
    },
    (err) => {
      showMapMsg(`GPS error: ${err?.message || err?.code || 'unknown'}`);
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
  );
}

/* ---------- Binding ---------- */

export function bindMapView() {
  let tries = 0;
  const maxTries = 120;

  const tick = () => {
    tries++;

    if (!ensureEl('cbsgoMap')) {
      if (tries < maxTries) return setTimeout(tick, 100);
      return;
    }

    if (!window.L) {
      showMapMsg('Loading map engine…');
      if (tries < maxTries) return setTimeout(tick, 100);
      showMapMsg('Map engine failed to load (Leaflet not found). Refresh.');
      return;
    }

    const ok = initLeaflet();
    if (!ok) {
      showMapMsg('Could not init map. Refresh.');
      return;
    }

    // knoppen koppelen
    const centerBtn = ensureEl('cbsgoCenterBtn');
    if (centerBtn) {
      centerBtn.onclick = () => {
        if (map && lastUserLatLng) {
          map.setView(lastUserLatLng, 18);
        }
      };
    }

    const compassBtn = ensureEl('cbsgoCompassBtn');
    if (compassBtn) {
      compassBtn.onclick = () => {
        if (!map) return;
        worldViewMode = !worldViewMode;
        if (worldViewMode) {
          map.setView([51.687, 4.87], 3);  // “wereld” kijken
        } else if (lastUserLatLng) {
          map.setView(lastUserLatLng, 16); // terug naar speler / dorp
        }
      };
    }

    showMapMsg('Loading GPS…');
    startGps();
  };

  tick();
}
