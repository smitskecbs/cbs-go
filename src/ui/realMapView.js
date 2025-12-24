// src/ui/realMapView.js
// Leaflet via CDN (window.L)
// ✅ Passive map: NO own GPS watch
// ✅ Listens to "cbsgo:playerPos" from steps.js
// ✅ Nodes open only when near
// ✅ Player marker = avatar + direction arrow (heading)

// NOTE: appShell currently uses mapView.js, not this file,
// but this version is kept compatible + non-conflicting.

import { nodes } from '../data/nodes.js';
import { isNodeCompleted } from '../app/state.js';
import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';
import { openPuzzleModal } from './puzzleModal.js';

const NODES_POS_KEY = 'cbsgo_nodes_pos_v2';
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

function clampHeading(h) {
  const x = Number(h);
  if (!Number.isFinite(x)) return null;
  return ((x % 360) + 360) % 360;
}

function bearingDeg(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const toDeg = (r) => (r * 180) / Math.PI;

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  let brng = toDeg(Math.atan2(y, x));
  brng = (brng + 360) % 360;
  return brng;
}

// --- Leaflet state ---
let map = null;
let nodesLayer = null;

let meMarker = null;
let lastPos = null; // {lat,lng,t}
let deviceHeadingDeg = null;

function getLeaflet() {
  const L = window.L;
  return L && typeof L.map === 'function' ? L : null;
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

/* ---------- PLAYER ICON (photo + arrow) ---------- */

function initialsFromName(name) {
  const n = String(name || '').trim();
  if (!n) return 'ME';
  const parts = n.split(/\s+/g).filter(Boolean);
  const a = parts[0]?.[0] || 'M';
  const b = (parts.length > 1 ? parts[parts.length - 1]?.[0] : '') || '';
  const ini = (a + b).toUpperCase();
  return ini.length ? ini : 'ME';
}

function buildMeIcon(L, headingDeg) {
  const av = getPlayerAvatar();
  const me = getPlayerName() || 'You';
  const ini = initialsFromName(me);

  const arrowRot = Number.isFinite(headingDeg) ? `transform: rotate(${headingDeg}deg);` : '';

  const avatarHtml = av
    ? `
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${av}');
        background-size:cover;
        background-position:center;
      "></div>
    `
    : `
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background:linear-gradient(135deg, rgba(0,175,255,.95), rgba(120,0,255,.95));
        display:flex;align-items:center;justify-content:center;
        color:#fff;
        font-weight:900;
        font-size:14px;
        letter-spacing:.5px;
      ">${esc(ini)}</div>
    `;

  const html = `
    <div style="position:relative; width:54px; height:54px;">
      <div style="
        position:absolute;
        left:50%; top:-2px;
        width:0; height:0;
        border-left:9px solid transparent;
        border-right:9px solid transparent;
        border-bottom:16px solid rgba(90,200,255,.95);
        filter: drop-shadow(0 6px 10px rgba(0,0,0,.35));
        transform-origin: 50% 22px;
        ${arrowRot}
      "></div>
      <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);">
        ${avatarHtml}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [54, 54],
    iconAnchor: [27, 27]
  });
}

export function renderRealMapView() {
  const me = getPlayerName() || 'You';
  const followLabel = getFollow() ? 'Following (ON)' : 'Free look';

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
          <div style="font-size:18px; font-weight:900; margin:0;">Live Map (Passive)</div>
          <div style="opacity:.75; font-size:13px;">GPS is handled by steps.js (single source).</div>
        </div>
        <div style="opacity:.75; font-size:13px;">${esc(me)}</div>
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:12px;">
        <button id="followBtn" class="btn secondary" type="button">${esc(followLabel)}</button>
        <span id="gpsStatus" style="opacity:.85; font-size:13px;">Waiting for GPS…</span>
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

  const OPEN_RADIUS_M = 60;

  pts.forEach(({ node, ll, dist }) => {
    const marker = L.circleMarker([ll.lat, ll.lng], {
      radius: 11,
      weight: 2
    });

    marker.bindTooltip(`${node.name} • ${dist}m`, { direction: 'top', offset: [0, -10] });

    marker.on('click', () => {
      if (dist > OPEN_RADIUS_M) {
        alert(`Too far.\n\nGo closer to open:\n${node.name}\nDistance: ${dist}m\nRequired: <= ${OPEN_RADIUS_M}m`);
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
    map = L.map(containerEl, { zoomControl: true, minZoom: 2, maxZoom: 19, worldCopyJump: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    map.setView([51.687, 4.867], 16);

    map.on('dragstart', () => setFollow(false));
    map.on('zoomstart', () => setFollow(false));
  } else {
    setTimeout(() => map.invalidateSize(), 80);
  }

  return true;
}

export function bindRealMapView() {
  const mount = document.querySelector('#mapMount') || document;
  const el = mount.querySelector('#leafletMap');
  const status = mount.querySelector('#gpsStatus');
  const followBtn = mount.querySelector('#followBtn');

  if (!el) return;

  const setStatus = (t) => { if (status) status.textContent = t || ''; };

  let tries = 0;
  const tryInit = () => {
    tries++;
    const ok = initMapOnce(el);
    if (!ok) {
      setStatus('Loading map engine...');
      if (tries < 30) setTimeout(tryInit, 150);
      else setStatus('ERR: Leaflet not loaded. Check index.html CDN.');
      return;
    }

    setStatus('Map ready. Waiting for GPS from steps.js…');

    if (followBtn) {
      followBtn.onclick = () => {
        const next = !getFollow();
        setFollow(next);
        followBtn.textContent = next ? 'Following (ON)' : 'Free look';
        if (next && map && lastPos) {
          map.setView([lastPos.lat, lastPos.lng], Math.max(map.getZoom(), 17), { animate: true });
        }
      };
    }

    if (!window.__cbsgo_playerpos_listener_realmap) {
      window.__cbsgo_playerpos_listener_realmap = true;

      window.addEventListener('cbsgo:playerPos', (ev) => {
        const d = ev?.detail || {};
        const lat = Number(d.lat);
        const lng = Number(d.lng);
        const acc = Number(d.acc);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        let heading = clampHeading(deviceHeadingDeg);
        if (!Number.isFinite(heading)) heading = clampHeading(d.heading);
        if (!Number.isFinite(heading) && lastPos) heading = bearingDeg(lastPos, { lat, lng });

        lastPos = { lat, lng, t: d.t || Date.now() };

        const L = getLeaflet();
        if (L && map) {
          const icon = buildMeIcon(L, heading);
          if (!meMarker) meMarker = L.marker([lat, lng], { icon }).addTo(map);
          else {
            meMarker.setIcon(icon);
            meMarker.setLatLng([lat, lng]);
          }
        }

        if (map && getFollow()) {
          map.setView([lat, lng], Math.max(map.getZoom(), 17), { animate: true });
        }

        renderNodesOnMap({ lat, lng });

        if (Number.isFinite(acc)) setStatus(`GPS OK (+/- ${Math.round(acc)}m)`);
        else setStatus('GPS OK');
      });
    }
  };

  tryInit();
}
