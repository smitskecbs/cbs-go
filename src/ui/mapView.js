// src/ui/mapView.js
// Fullscreen Leaflet map mount (waits for window.L on GitHub Pages)
// ✅ World zoom-out + compass + player direction arrow
// ✅ No GPS watch here: uses cbsgo:playerPos from steps.js

import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';

let map = null;
let userMarker = null;

let lastPos = null;         // {lat,lng,t}
let deviceHeadingDeg = null;

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

function clampHeading(h) {
  const x = Number(h);
  if (!Number.isFinite(x)) return null;
  return ((x % 360) + 360) % 360;
}

function bearingDeg(a, b) {
  // bearing from a->b in degrees
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

function initialOfName() {
  const n = String(getPlayerName() || '').trim();
  if (!n) return '🙂';
  return n[0].toUpperCase();
}

function buildPlayerIcon(L, headingDeg) {
  const av = getPlayerAvatar();
  const ini = initialOfName();

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
        background:rgba(0,0,0,.35);
        display:flex;align-items:center;justify-content:center;
        font-weight:900;font-size:16px;color:#fff;
      ">${ini}</div>
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

      <div style="
        position:absolute; inset:4px;
        border-radius:999px;
        box-shadow:0 0 18px rgba(90,200,255,.25);
        border:1px solid rgba(90,200,255,.20);
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

export function renderMapView() {
  return `
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Compass overlay -->
      <div id="cbsgoCompass" style="
        position:absolute;
        right:12px;
        bottom: calc(86px + 12px);
        z-index: 9999;
        width:44px; height:44px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.70);
        backdrop-filter: blur(10px);
        display:flex;
        align-items:center;
        justify-content:center;
        user-select:none;
        pointer-events:none;
      ">
        <div id="cbsgoCompassNeedle" style="
          width:0; height:0;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-bottom:18px solid rgba(255,70,70,.95);
          transform-origin: 50% 16px;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,.4));
        "></div>
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
    }
  } catch {}
}

function initLeaflet() {
  const L = window.L;
  const el = ensureEl('cbsgoMap');
  if (!L || !el) return false;

  destroyMapIfAny();

  map = L.map(el, {
    zoomControl: false,
    attributionControl: false,
    minZoom: 2,       // ✅ world zoom-out
    maxZoom: 19,
    worldCopyJump: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  map.setView([51.687, 4.87], 16);
  return true;
}

function setCompass(headingDeg) {
  const needle = ensureEl('cbsgoCompassNeedle');
  if (!needle) return;

  const h = clampHeading(headingDeg);
  if (!Number.isFinite(h)) return;

  needle.style.transform = `rotate(${h}deg)`;
}

function setUserMarker(lat, lng, headingDeg) {
  const L = window.L;
  if (!L || !map) return;

  const icon = buildPlayerIcon(L, headingDeg);

  if (!userMarker) {
    userMarker = L.marker([lat, lng], { icon }).addTo(map);
    map.setView([lat, lng], 18);
    return;
  }

  userMarker.setIcon(icon);
  userMarker.setLatLng([lat, lng]);
}

// Device orientation -> heading (best on phones)
async function tryEnableDeviceHeading() {
  const request = async () => {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        const p = await DeviceOrientationEvent.requestPermission();
        if (p !== 'granted') return;
      }
      window.addEventListener('deviceorientation', onDeviceOrientation, true);
      showMapMsg('Compass ready.');
    } catch {
      // ignore
    }
  };

  const onFirstTap = async () => {
    window.removeEventListener('pointerdown', onFirstTap);
    window.removeEventListener('touchstart', onFirstTap);
    window.removeEventListener('click', onFirstTap);
    await request();
  };

  window.addEventListener('pointerdown', onFirstTap, { once: true });
  window.addEventListener('touchstart', onFirstTap, { once: true });
  window.addEventListener('click', onFirstTap, { once: true });
}

function onDeviceOrientation(e) {
  if (Number.isFinite(e.alpha)) {
    deviceHeadingDeg = clampHeading(e.alpha);
  }
}

export function bindMapView() {
  let tries = 0;
  const maxTries = 80;

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

    showMapMsg('Waiting for GPS (steps.js)… Tap once for compass.');
    tryEnableDeviceHeading();

    if (!window.__cbsgo_playerpos_listener_mapview) {
      window.__cbsgo_playerpos_listener_mapview = true;

      window.addEventListener('cbsgo:playerPos', (ev) => {
        const d = ev?.detail || {};
        const lat = Number(d.lat);
        const lng = Number(d.lng);
        const acc = Number(d.acc);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        // heading priority:
        // 1) device heading
        // 2) GPS heading
        // 3) bearing from last position
        let heading = clampHeading(deviceHeadingDeg);
        if (!Number.isFinite(heading)) heading = clampHeading(d.heading);

        if (!Number.isFinite(heading) && lastPos) {
          heading = bearingDeg(lastPos, { lat, lng });
        }

        lastPos = { lat, lng, t: d.t || Date.now() };

        setUserMarker(lat, lng, heading);
        if (Number.isFinite(heading)) setCompass(heading);

        if (Number.isFinite(acc)) showMapMsg(`GPS OK • accuracy ~${Math.round(acc)}m`);
        else showMapMsg('GPS OK');
      });
    }
  };

  tick();
}
