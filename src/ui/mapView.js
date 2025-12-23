// src/ui/mapView.js
// Safe Leaflet map mount (waits for window.L to exist on GitHub Pages)
// Player marker uses Profile avatar (or initial) — no blue dot.

import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';

let map = null;
let userMarker = null;

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
    msg.style.bottom = '86px'; // above bottom nav
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

function initialOfName() {
  const n = String(getPlayerName() || '').trim();
  if (!n) return '🙂';
  return n[0].toUpperCase();
}

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
    return L.divIcon({
      html,
      className: '',
      iconSize: [42, 42],
      iconAnchor: [21, 21]
    });
  }

  const ini = initialOfName();
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
  return L.divIcon({
    html,
    className: '',
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  });
}

export function renderMapView() {
  return `
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `;
}

function destroyMapIfAny() {
  try {
    if (map) {
      map.remove();
      map = null;
      userMarker = null;
    }
  } catch {}
}

function initLeaflet() {
  const L = window.L;
  const el = ensureEl('cbsgoMap');
  if (!L || !el) return false;

  // Prevent "Map container is already initialized"
  destroyMapIfAny();

  map = L.map(el, { zoomControl: false, attributionControl: false });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  // Default view (NL) until GPS comes in
  map.setView([51.687, 4.87], 16);

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

  // Update icon live (avatar can change)
  userMarker.setIcon(icon);
  userMarker.setLatLng(latlng);
}

function startGps() {
  if (!navigator.geolocation || !map || !window.L) return;

  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      const latlng = [latitude, longitude];

      setUserMarker(latlng);

      showMapMsg(`GPS OK • accuracy ~${Math.round(accuracy)}m`);
    },
    (err) => {
      showMapMsg(`GPS error: ${err?.message || err?.code || 'unknown'}`);
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
  );
}

export function bindMapView() {
  // Wait for Leaflet on GitHub Pages
  let tries = 0;
  const maxTries = 80; // ~8s

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

    showMapMsg('Loading GPS…');
    startGps();
  };

  tick();
}
