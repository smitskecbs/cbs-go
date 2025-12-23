// src/ui/realMapView.js
// Leaflet via CDN (window.L)
// Fixes:
// - Nodes can only be opened when you are NEAR (no "dev mode").
// - GPS distance converts to STEPS (reliable) and triggers 5k/10k rewards.
// - Follow toggle still works.

import { nodes } from '../data/nodes.js';
import { isNodeCompleted } from '../app/state.js';
import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';
import { openPuzzleModal } from './puzzleModal.js';
import { addMeters, loadSteps } from '../app/steps.js';

const LAST_POS_KEY = 'cbsgo_last_pos_v3';
const NODES_POS_KEY = 'cbsgo_nodes_pos_v2';
const GPS_AUTOSTART_KEY = 'cbsgo_gps_autostart_v1';
const FOLLOW_KEY = 'cbsgo_follow_me_v1';

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

// --- Leaflet state ---
let map = null;
let nodesLayer = null;
let watchId = null;

let meMarker = null;
let meIcon = null;

function getLeaflet() {
  const L = window.L;
  return L && typeof L.map === 'function' ? L : null;
}

function clearGpsWatch() {
  if (watchId != null && navigator.geolocation) navigator.geolocation.clearWatch(watchId);
  watchId = null;
}

function getFollow() {
  try {
    const v = localStorage.getItem(FOLLOW_KEY);
    return v == null ? true : v === '1';
  } catch {
    return true;
  }
}
function setFollow(v) {
  try { localStorage.setItem(FOLLOW_KEY, v ? '1' : '0'); } catch {}
}

function visibleNodes() {
  return nodes.filter(n => n.type !== 'group' && !isNodeCompleted(n.id));
}

// --- stable node positions around first GPS seed ---
function ensureNodePositions(seedCenter) {
  const stored = readJSON(NODES_POS_KEY, null);
  if (stored && stored.seed && stored.posById) return stored;

  const list = visibleNodes();
  const posById = {};
  const placed = [];

  const minSepM = 90;
  const minR = 160;
  const maxR = 420;
  const maxTry = 4000;

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

      ok = placed.every(p => metersBetween(p, cand) >= minSepM);
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

function setNearInfo(text) {
  const el = document.querySelector('#nearInfo');
  if (el) el.textContent = text || '';
}

function buildAvatarIcon(L) {
  const av = getPlayerAvatar();
  if (!av) return null;

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

  return L.divIcon({
    html,
    className: '',
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  });
}

export function renderRealMapView() {
  const me = getPlayerName() || 'You';
  const av = getPlayerAvatar();
  const followLabel = getFollow() ? 'Following ✅' : 'Free look 👀';

  const steps = loadSteps().steps || 0;

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
          <div style="font-size:18px; font-weight:900; margin:0;">Live Map (GPS)</div>
          <div style="opacity:.75; font-size:13px;">Distance → steps. 5k steps = +20 XP. 10k steps = +1 🎟.</div>
          <div id="stepsLine" style="opacity:.85; font-size:13px; margin-top:6px;">Steps: <b>${Number(steps)}</b></div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <div style="
            width:28px;height:28px;border-radius:999px;
            border:1px solid rgba(255,255,255,.18);
            background:rgba(255,255,255,.06);
            ${av ? `background-image:url('${av}'); background-size:cover; background-position:center;` : ''}
            display:flex;align-items:center;justify-content:center;
            overflow:hidden;
          ">${av ? '' : '👤'}</div>
          <div style="opacity:.75; font-size:13px;">${esc(me)}</div>
        </div>
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:12px;">
        <button id="gpsStartBtn" class="btn" type="button">Enable GPS</button>
        <button id="gpsStopBtn" class="btn secondary" type="button">Stop GPS</button>
        <button id="followBtn" class="btn secondary" type="button">${followLabel}</button>
        <span id="gpsStatus" style="opacity:.85; font-size:13px;"></span>
      </div>

      <div id="nearInfo" style="margin-top:10px; opacity:.85; font-size:13px;"></div>

      <div id="leafletMap" style="
        margin-top:12px;
        width:100%;
        height:540px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.10);
        overflow:hidden;
      "></div>
    </section>
  `;
}

function renderNodesOnMap(centerNow) {
  const L = getLeaflet();
  if (!L || !map) return;

  if (!nodesLayer) nodesLayer = L.layerGroup().addTo(map);
  nodesLayer.clearLayers();

  const list = visibleNodes();
  const stored = ensureNodePositions(centerNow);

  const pts = [];
  for (const node of list) {
    const ll = nodeLatLng(node, stored.seed);
    if (!ll) continue;

    const dist = Math.round(metersBetween(centerNow, ll));
    if (dist > 1200) continue;

    pts.push({ node, ll, dist });
  }

  pts.sort((a, b) => a.dist - b.dist);

  if (pts.length === 0) {
    setNearInfo('No nodes nearby (walk a bit).');
  } else {
    setNearInfo(`Nearest: ${pts[0].node.name} • ${pts[0].dist}m • Visible: ${pts.length} (must be close to open)`);
  }

  // IMPORTANT: you can only open if within this radius
  const OPEN_RADIUS_M = 60;

  pts.forEach(({ node, ll, dist }) => {
    const marker = L.circleMarker([ll.lat, ll.lng], {
      radius: 11,
      weight: 2
    });

    marker.bindTooltip(`${node.name} • ${dist}m`, { direction: 'top', offset: [0, -10] });

    marker.on('click', () => {
      if (dist > OPEN_RADIUS_M) {
        alert(`Too far.\n\nGo closer to open:\n${node.name}\nDistance: ${dist}m\nRequired: ≤ ${OPEN_RADIUS_M}m`);
        return;
      }
      openPuzzleModal(node);
    });

    marker.addTo(nodesLayer);
  });
}

function initMapOnce(containerEl) {
  const L = getLeaflet();
  if (!L) return false;

  if (!map) {
    map = L.map(containerEl, { zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    map.setView([51.687, 4.867], 16);

    map.on('dragstart', () => {
      setFollow(false);
      const b = document.querySelector('#followBtn');
      if (b) b.textContent = 'Free look 👀';
    });
    map.on('zoomstart', () => {
      setFollow(false);
      const b = document.querySelector('#followBtn');
      if (b) b.textContent = 'Free look 👀';
    });
  } else {
    setTimeout(() => map.invalidateSize(), 80);
  }

  return true;
}

function updateStepsLine() {
  const el = document.querySelector('#stepsLine');
  if (!el) return;
  const s = loadSteps();
  el.innerHTML = `Steps: <b>${Number(s.steps || 0)}</b>`;
}

function startGps(setStatus) {
  if (!navigator.geolocation) {
    setStatus('❌ GPS not supported.');
    return;
  }

  try { localStorage.setItem(GPS_AUTOSTART_KEY, '1'); } catch {}
  setStatus('Requesting GPS…');

  const MIN_ACCURACY_M = 80;

  clearGpsWatch();

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const acc = pos.coords.accuracy || 999;

      if (acc > MIN_ACCURACY_M) {
        setStatus(`GPS OK but accuracy low (${Math.round(acc)}m). Move outside.`);
        return;
      }

      setStatus(`✅ GPS active (±${Math.round(acc)}m)`);

      const center = { lat, lng };

      const L = getLeaflet();
      if (L && map) {
        const nextIcon = buildAvatarIcon(L);
        if (nextIcon && (!meIcon || JSON.stringify(meIcon?.options) !== JSON.stringify(nextIcon?.options))) {
          meIcon = nextIcon;
          if (meMarker) meMarker.setIcon(meIcon);
        }

        if (!meMarker) {
          meMarker = meIcon
            ? L.marker([lat, lng], { icon: meIcon }).addTo(map)
            : L.circleMarker([lat, lng], { radius: 8, weight: 2 }).addTo(map);
        } else {
          meMarker.setLatLng([lat, lng]);
        }
      }

      if (map && getFollow()) {
        map.setView([lat, lng], Math.max(map.getZoom(), 17), { animate: true });
      }

      // meters -> steps (reliable)
      const last = readJSON(LAST_POS_KEY, null);
      if (last) {
        const dist = metersBetween(last, center);

        // ignore jitter, ignore teleport jumps
        if (dist >= 6 && dist <= 90) {
          addMeters(dist);
          updateStepsLine();
        }
      }
      writeJSON(LAST_POS_KEY, center);

      renderNodesOnMap(center);
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
}

export function bindRealMapView() {
  const mount = document.querySelector('#mapMount') || document;
  const el = mount.querySelector('#leafletMap');
  const startBtn = mount.querySelector('#gpsStartBtn');
  const stopBtn = mount.querySelector('#gpsStopBtn');
  const status = mount.querySelector('#gpsStatus');
  const followBtn = mount.querySelector('#followBtn');

  if (!el) return;

  const setStatus = (t) => { if (status) status.textContent = t || ''; };

  let tries = 0;
  const tryInit = () => {
    tries++;
    const ok = initMapOnce(el);
    if (!ok) {
      setStatus('Loading map engine…');
      if (tries < 30) setTimeout(tryInit, 150);
      else setStatus('❌ Leaflet not loaded. Check index.html CDN.');
      return;
    }

    setStatus('Map ready. Enable GPS.');

    if (followBtn) {
      followBtn.onclick = () => {
        const next = !getFollow();
        setFollow(next);
        followBtn.textContent = next ? 'Following ✅' : 'Free look 👀';
        if (next && map) {
          const last = readJSON(LAST_POS_KEY, null);
          if (last) map.setView([last.lat, last.lng], Math.max(map.getZoom(), 17), { animate: true });
        }
      };
    }

    if (startBtn) startBtn.onclick = () => startGps(setStatus);

    if (stopBtn) {
      stopBtn.onclick = () => {
        clearGpsWatch();
        setStatus('GPS stopped.');
      };
    }

    updateStepsLine();

    const auto = (() => {
      try { return localStorage.getItem(GPS_AUTOSTART_KEY) === '1'; } catch { return false; }
    })();
    if (auto) startGps(setStatus);

    if (!window.__cbsgo_steps_listener_v1) {
      window.__cbsgo_steps_listener_v1 = true;
      window.addEventListener('cbsgo:stepsChanged', updateStepsLine);
    }
  };

  tryInit();
}
