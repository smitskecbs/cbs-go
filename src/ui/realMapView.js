// src/ui/realMapView.js
// Real GPS map using Leaflet + OpenStreetMap tiles.
// Shows your live position and spawns "drops" near you while walking.
// HTTPS is required on most phones (GitHub Pages is OK).

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { nodes } from '../data/nodes.js';
import { isNodeCompleted } from '../app/state.js';
import { getPlayerName } from '../app/leaderboard.js';
import { openPuzzleModal } from './puzzleModal.js';

// --- simple drop system (local demo) ---
const DROPS_KEY = 'cbsgo_drops_v1';
const LAST_POS_KEY = 'cbsgo_last_pos_v1';

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

function metersBetween(a, b) {
  // Haversine
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

function getDrops() {
  return readJSON(DROPS_KEY, []);
}
function setDrops(arr) {
  writeJSON(DROPS_KEY, arr);
}

function maybeSpawnDropNear(lat, lng) {
  // spawn chance + spacing
  const drops = getDrops();
  const now = Date.now();

  // don't spam: max 1 drop per ~40 seconds
  const last = drops.length ? drops[drops.length - 1].t : 0;
  if (now - last < 40_000) return;

  // 25% chance
  if (Math.random() > 0.25) return;

  // random offset ~20-60 meters
  const r = 20 + Math.random() * 40;
  const ang = Math.random() * Math.PI * 2;

  // rough meter->deg conversion
  const dLat = (r * Math.cos(ang)) / 111111;
  const dLng = (r * Math.sin(ang)) / (111111 * Math.cos((lat * Math.PI) / 180));

  const drop = {
    id: 'drop-' + Math.random().toString(16).slice(2),
    lat: lat + dLat,
    lng: lng + dLng,
    kind: Math.random() < 0.7 ? 'ticket' : 'xp',
    value: Math.random() < 0.7 ? 1 : 10,
    t: now,
    taken: false
  };

  drops.push(drop);
  setDrops(drops);
}

function takeDrop(dropId) {
  const drops = getDrops();
  const d = drops.find(x => x.id === dropId);
  if (!d || d.taken) return null;
  d.taken = true;
  setDrops(drops);
  return d;
}

// --- Leaflet instance cache (so we don't re-init every rerender) ---
let map = null;
let meMarker = null;
let watchId = null;
let nodesLayer = null;
let dropsLayer = null;

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getVisibleNodes() {
  // show only not completed, solo only (no group)
  return nodes.filter(n => n.type !== 'group' && !isNodeCompleted(n.id));
}

function nodeToLatLng(node) {
  // If you already have real lat/lng in nodes later:
  // return { lat: node.lat, lng: node.lng }
  // For now: we auto-place nodes around you (relative) when GPS is known.
  return null;
}

function clearLayers() {
  if (nodesLayer) {
    nodesLayer.clearLayers();
  }
  if (dropsLayer) {
    dropsLayer.clearLayers();
  }
}

function renderNodesOnMap(center) {
  const list = getVisibleNodes();
  if (!nodesLayer) nodesLayer = L.layerGroup().addTo(map);

  nodesLayer.clearLayers();

  // place them around the player in a small ring (demo)
  const radiusM = 120; // ~120m radius
  list.forEach((node, idx) => {
    const ang = (idx / Math.max(1, list.length)) * Math.PI * 2;
    const r = radiusM * (0.6 + Math.random() * 0.4);

    const dLat = (r * Math.cos(ang)) / 111111;
    const dLng = (r * Math.sin(ang)) / (111111 * Math.cos((center.lat * Math.PI) / 180));

    const lat = center.lat + dLat;
    const lng = center.lng + dLng;

    const marker = L.circleMarker([lat, lng], {
      radius: 10,
      weight: 2
    });

    marker.bindTooltip(node.name, { direction: 'top', offset: [0, -10] });

    marker.on('click', () => openPuzzleModal(node));

    marker.addTo(nodesLayer);
  });
}

function renderDropsOnMap() {
  if (!dropsLayer) dropsLayer = L.layerGroup().addTo(map);
  dropsLayer.clearLayers();

  const drops = getDrops().filter(d => !d.taken).slice(-20); // show last 20 active

  drops.forEach(d => {
    const marker = L.circleMarker([d.lat, d.lng], {
      radius: 9,
      weight: 2
    });

    const label = d.kind === 'ticket' ? `🎟 Ticket +${d.value}` : `⚡ XP +${d.value}`;
    marker.bindTooltip(label, { direction: 'top', offset: [0, -10] });

    marker.on('click', () => {
      const taken = takeDrop(d.id);
      if (!taken) return;

      alert(`Collected: ${label}\n\n(We’ll connect tickets/xp into the real economy next.)`);
      renderDropsOnMap();
    });

    marker.addTo(dropsLayer);
  });
}

function stopGps() {
  if (watchId != null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
  watchId = null;
}

export function renderRealMapView() {
  const me = getPlayerName() || 'You';

  return `
    <section class="mapCard" style="
      margin-top:14px;
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.03);
    ">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:18px; font-weight:800; margin:0;">Live Map (GPS)</div>
          <div style="opacity:.75; font-size:13px;">Walk outside. Pins and drops are placed around you.</div>
          <div style="opacity:.75; font-size:13px; margin-top:6px;">Tip: tap a pin to open a puzzle.</div>
        </div>
        <div style="opacity:.75; font-size:13px;">You: <b style="opacity:1">${esc(me)}</b></div>
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:12px;">
        <button id="gpsStartBtn" class="btn" type="button">Enable GPS</button>
        <button id="gpsStopBtn" class="btn secondary" type="button">Stop GPS</button>
        <span id="gpsStatus" style="opacity:.8; font-size:13px;"></span>
      </div>

      <div id="leafletMap" style="
        margin-top:12px;
        width:100%;
        height:520px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.10);
        overflow:hidden;
      "></div>
    </section>
  `;
}

export function bindRealMapView() {
  const mount = document.querySelector('#mapMount') || document;
  const el = mount.querySelector('#leafletMap');
  const startBtn = mount.querySelector('#gpsStartBtn');
  const stopBtn = mount.querySelector('#gpsStopBtn');
  const status = mount.querySelector('#gpsStatus');

  if (!el) return;

  const setStatus = (t) => {
    if (status) status.textContent = t || '';
  };

  // init map once
  if (!map) {
    map = L.map(el, { zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    map.setView([51.687, 4.867], 16); // default-ish NL center, will jump to GPS
  } else {
    // Leaflet needs invalidateSize if container was re-rendered
    setTimeout(() => map.invalidateSize(), 50);
  }

  // buttons
  if (startBtn) {
    startBtn.onclick = () => {
      if (!navigator.geolocation) {
        setStatus('❌ GPS not supported in this browser.');
        return;
      }

      setStatus('Requesting GPS…');

      // single fix to reduce “table drift”: ignore super-bad accuracy
      const MIN_ACCURACY_M = 35;

      stopGps();

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const acc = pos.coords.accuracy || 999;

          if (acc > MIN_ACCURACY_M) {
            setStatus(`GPS OK but accuracy too low (${Math.round(acc)}m). Move outside.`);
            return;
          }

          setStatus(`✅ GPS active (±${Math.round(acc)}m)`);

          const center = { lat, lng };

          // move marker
          if (!meMarker) {
            meMarker = L.circleMarker([lat, lng], { radius: 8, weight: 2 }).addTo(map);
            meMarker.bindTooltip('You', { permanent: false });
          } else {
            meMarker.setLatLng([lat, lng]);
          }

          // center map
          map.setView([lat, lng], Math.max(map.getZoom(), 17), { animate: true });

          // spawn drops only when you really moved
          const last = readJSON(LAST_POS_KEY, null);
          if (last) {
            const dist = metersBetween(last, center);
            if (dist >= 18) { // moved ~18m
              maybeSpawnDropNear(lat, lng);
            }
          }
          writeJSON(LAST_POS_KEY, center);

          // nodes around you + drops
          renderNodesOnMap(center);
          renderDropsOnMap();
        },
        (err) => {
          setStatus(`❌ GPS blocked: ${err?.message || 'error'}`);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 12000
        }
      );
    };
  }

  if (stopBtn) {
    stopBtn.onclick = () => {
      stopGps();
      setStatus('GPS stopped.');
    };
  }

  // if nodes completion changes, refresh layers
  if (!window.__cbsgo_realmap_nodes_listener) {
    window.__cbsgo_realmap_nodes_listener = true;
    window.addEventListener('cbsgo:nodesChanged', () => {
      // re-render with last known position if possible
      const last = readJSON(LAST_POS_KEY, null);
      if (last && map) {
        renderNodesOnMap(last);
        renderDropsOnMap();
      }
    });
  }
}
