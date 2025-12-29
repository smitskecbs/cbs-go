// src/ui/mapView.js
// Fullscreen Leaflet map:
// ✅ Player marker gebruikt avatar/initial
// ✅ Richting-pijl bij speler (heading / looprichting) – rond de avatar
// ✅ Kleine glow-radius rond speler = daadwerkelijke pickup-range
// ✅ Cadeautjes + puzzels spawnen rond speler
// ✅ Compass + Center knoppen rechtsonder
// ✅ Weather-bubble + regen/sneeuw + nacht-dimming
// ✅ Online spelers (andere wallets) als oranje bolletjes (met toggle + clustering)
// ✅ Auto-follow op speler, tenzij je zelf sleept of over map scrolt
// ✅ Speler(pf) altijd boven loot/puzzels/andere spelers dankzij panes

import { getPlayerAvatar, getPlayerName } from '../app/leaderboard.js';
import { openPuzzleModal } from './puzzleModal.js';

let map = null;
let userMarker = null;
let userArrow = null;
let playerRangeCircle = null;
let nodesLayer = null;   // puzzel-markers
let lootLayer = null;    // cadeautjes
let lastUserLatLng = null;
let lastHeadingDeg = 0;
let worldViewMode = false;

// 👣 auto-follow state
let followPlayer = true;

// 🔶 andere spelers
let otherPlayersLayer = null;
const otherPlayerMarkers = new Map();
let otherPlayersVisible = true; // 👥 toggle aan/uit

// 🌤️ Weer-state
let weatherState = {
  temp: null,
  iconEmoji: '⛅',
  condition: 'clear', // 'clear' | 'clouds' | 'rain' | 'snow' | 'storm' | 'mist'
  isNight: false,
  lastUpdated: 0
};

// 🔑 OpenWeatherMap API key
const OPEN_WEATHER_API_KEY = '48a387bba00043ac4ba5823371abc9d2';

// 🔧 Pickup-radius (cirkel + echte bereikchecks)
const PICKUP_RADIUS_M = 80;

// 🔧 Loot-config
const LOOT_ENABLED = true;
const LOOT_MAX_ACTIVE = 6;
const LOOT_SPAWN_MIN_DISTANCE_M = 80;
const LOOT_SPAWN_MAX_DISTANCE_M = 220;
const LOOT_RESPAWN_MS = 60_000;

// 🔧 Puzzle spawn config (rond speler)
const PUZZLES_ENABLED = true;
const PUZZLE_MAX_ACTIVE = 1;
const PUZZLE_SPAWN_CHUNK_M = 350;   // elke 350m lopen kans op een puzzel
const PUZZLE_SPAWN_CHANCE = 0.35;   // 35% kans zodra chunk gehaald is
const FIRST_PUZZLE_MIN_METERS = 120; // eerste puzzel al na ±120m lopen

let lastLootSpawnAt = 0;
let puzzleMeters = 0;
let activePuzzleMarker = null;
let firstPuzzleSpawned = false;

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

// Haversine afstand
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
  const dLng = (r * Math.sin(ang)) / (111111 * Math.cos((center.lat * Math.PI) / 180));
  return { lat: center.lat + dLat, lng: center.lng + dLng };
}

/* ---------- Heading berekenen ---------- */

function computeHeadingDeg(prev, cur) {
  // 0° = noord, 90° = oost, etc.
  const toRad = (x) => (x * Math.PI) / 180;
  const lat1 = toRad(prev.lat);
  const lat2 = toRad(cur.lat);
  const dLng = toRad(cur.lng - prev.lng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  let brng = Math.atan2(y, x);      // in rad
  brng = (brng * 180) / Math.PI;    // naar graden
  brng = (brng + 360) % 360;        // 0–360
  return brng;
}

/* ---------- Weather helpers ---------- */

function ensureWeatherFxStyles() {
  if (document.getElementById('cbsgoWeatherFxStyles')) return;

  const style = document.createElement('style');
  style.id = 'cbsgoWeatherFxStyles';
  style.textContent = `
    @keyframes cbsgoRainFall {
      0%   { transform: translate3d(var(--x, 0%), -10%, 0); opacity: 0; }
      10%  { opacity: 1; }
      100% { transform: translate3d(var(--xEnd, 0%), 110%, 0); opacity: 0; }
    }

    @keyframes cbsgoSnowFall {
      0%   { transform: translate3d(var(--x, 0%), -10%, 0); opacity: 0; }
      15%  { opacity: 1; }
      100% { transform: translate3d(var(--xEnd, 0%), 110%, 0); opacity: 0.2; }
    }

    .cbsgoRainDrop {
      position:absolute;
      top:-10%;
      width:2px;
      height:22px;
      background:rgba(173,216,230,0.9);
      border-radius:999px;
      opacity:0;
      animation-name:cbsgoRainFall;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    }

    .cbsgoSnowFlake {
      position:absolute;
      top:-10%;
      width:10px;
      height:10px;
      border-radius:50%;
      background:rgba(255,255,255,0.95);
      box-shadow:0 0 6px rgba(255,255,255,0.9);
      opacity:0;
      animation-name:cbsgoSnowFall;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    }
  `;
  document.head.appendChild(style);
}

function getWeatherLabel() {
  const { temp, iconEmoji } = weatherState;
  if (temp == null) return '⛅ …°';
  return `${iconEmoji} ${Math.round(temp)}°`;
}

function updateWeatherFx() {
  const host = document.getElementById('cbsgoWeatherFx');
  if (!host) return;

  ensureWeatherFxStyles();

  const { condition, isNight } = weatherState;

  host.style.background = isNight
    ? 'radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))'
    : 'transparent';

  let html = '';

  if (condition === 'rain' || condition === 'storm') {
    const count = 48;
    const parts = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const drift = (Math.random() * 16) - 8;
      const delay = Math.random() * 2.5;
      const dur = 2 + Math.random() * 1.5;

      parts.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${x}%;
            --xEnd:${x + drift}%;
            left:0;
            animation-delay:${delay}s;
            animation-duration:${dur}s;
          "
        ></div>
      `);
    }
    html = parts.join('');
  } else if (condition === 'snow') {
    const count = 42;
    const parts = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const drift = (Math.random() * 20) - 10;
      const delay = Math.random() * 4;
      const dur = 6 + Math.random() * 4;

      parts.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${x}%;
            --xEnd:${x + drift}%;
            left:0;
            animation-delay:${delay}s;
            animation-duration:${dur}s;
          "
        ></div>
      `);
    }
    html = parts.join('');
  } else {
    html = '';
  }

  host.innerHTML = html;
}

async function fetchWeatherForLatLng(lat, lng) {
  if (!OPEN_WEATHER_API_KEY) return;

  const now = Date.now();
  // max 1x per 5 minuten het weer ophalen
  if (weatherState.lastUpdated && now - weatherState.lastUpdated < 5 * 60 * 1000) {
    return;
  }

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}` +
      `&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    const temp = data?.main?.temp;
    const code = data?.weather?.[0]?.icon || '01d'; // bv. "01d" of "01n"
    const main = String(data?.weather?.[0]?.main || '').toLowerCase();

    // 🔹 eerste gok: op basis van OpenWeather icon (d/n)
    let isNight = code.endsWith('n');

    let iconEmoji = '⛅';
    let condition = 'clear';

    // basis op icon-code
    if (code.startsWith('01')) {
      condition = 'clear';
    } else if (code.startsWith('02')) {
      condition = 'clear';
    } else if (code.startsWith('03') || code.startsWith('04')) {
      iconEmoji = '☁️';
      condition = 'clouds';
    } else if (code.startsWith('09') || code.startsWith('10')) {
      iconEmoji = '🌧️';
      condition = 'rain';
    } else if (code.startsWith('11')) {
      iconEmoji = '⛈️';
      condition = 'storm';
    } else if (code.startsWith('13')) {
      iconEmoji = '❄️';
      condition = 'snow';
    } else if (code.startsWith('50')) {
      iconEmoji = '🌫️';
      condition = 'mist';
    }

    // extra check op MAIN tekst
    if (main.includes('rain')) condition = 'rain';
    if (main.includes('snow')) condition = 'snow';
    if (main.includes('thunder')) condition = 'storm';

    // 🔹 daarna nog een nauwkeuriger nacht-check op basis van tijdzone
    try {
      const dt = Number(data?.dt || 0);       // unix tijd in seconden
      const tz = Number(data?.timezone || 0); // offset in seconden
      if (dt && Number.isFinite(tz)) {
        const localTs = dt + tz;
        const hour = ((localTs / 3600) % 24 + 24) % 24;
        // nacht = voor 7:00 of na 19:00
        isNight = hour < 7 || hour >= 19;
      }
    } catch {
      // laat isNight zoals hij was
    }

    // 🔹 emoji definitief kiezen, nu we weten of het nacht is
    if (condition === 'clear') {
      iconEmoji = isNight ? '🌙' : '☀️';
    } else if (condition === 'clouds') {
      iconEmoji = '☁️';
    } else if (condition === 'rain') {
      iconEmoji = '🌧️';
    } else if (condition === 'storm') {
      iconEmoji = '⛈️';
    } else if (condition === 'snow') {
      iconEmoji = '❄️';
    } else if (condition === 'mist') {
      iconEmoji = '🌫️';
    }

    weatherState = {
      temp,
      iconEmoji,
      condition,
      isNight,
      lastUpdated: now
    };

    const el = document.getElementById('cbsgoWeatherLabel');
    if (el) el.textContent = getWeatherLabel();

    updateWeatherFx();
  } catch (e) {
    console.warn('Weather fetch failed', e);
  }
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

function buildArrowIcon(L, headingDeg) {
  const html = `
    <div style="
      width:28px;
      height:28px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:18px;
      filter:drop-shadow(0 2px 3px rgba(0,0,0,.8));
      /* Eerst een beetje naar boven duwen, dan roteren -> pijltje draait rond de avatar */
      transform: rotate(${headingDeg}deg) translateY(-26px);
      transform-origin:center center;
    ">
      ▲
    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
}

// 🔶 Online speler-icon (andere mensen / clusters)
function buildOtherPlayerIcon(L, label) {
  const txt = String(label || '').trim() || '🙂';

  const html = `
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${esc(txt)}</div>
  `;
  return L.divIcon({ html, className: '', iconSize: [30, 30], iconAnchor: [15, 15] });
}

// 🎁 Loot-icon (cadeautje)
function buildLootIcon(L, kind) {
  let badge = '⭐';
  if (kind === 'ticket') badge = '🎟️';
  if (kind === 'cbs') badge = '🪙';

  const html = `
    <div style="
      position:relative;
      width:40px;height:40px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.80);
      backdrop-filter: blur(10px);
      box-shadow:0 10px 22px rgba(0,0,0,.45);
      font-size:22px;
    ">
      🎁
      <div style="
        position:absolute;
        right:-4px;bottom:-4px;
        width:20px;height:20px;
        border-radius:999px;
        border:1px solid rgba(0,0,0,.7);
        background:rgba(0,0,0,.85);
        display:flex;align-items:center;justify-content:center;
        font-size:11px;
      ">
        ${badge}
      </div>
    </div>
  `;
  return L.divIcon({ html, className: '', iconSize: [40, 40], iconAnchor: [20, 20] });
}

// 🧩 Puzzle-icon
function buildPuzzleIcon(L) {
  const html = `
    <div style="
      width:46px;height:46px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.78);
      backdrop-filter: blur(10px);
      box-shadow:0 0 20px rgba(96,165,250,.65), 0 10px 22px rgba(0,0,0,.45);
      font-size:22px;
    ">
      🧩
    </div>
  `;
  return L.divIcon({ html, className: '', iconSize: [46, 46], iconAnchor: [23, 23] });
}

/* ---------- Loot ---------- */

function rollLootKind() {
  const r = Math.random();
  if (r < 0.70) return 'xp';
  if (r < 0.95) return 'ticket';
  return 'cbs';
}

function computeLootReward(kind) {
  if (kind === 'xp') {
    const xp = 10 + Math.floor(Math.random() * 21);
    return { xp, tickets: 0, cbs: 0, text: `+${xp} XP` };
  }
  if (kind === 'ticket') {
    return { xp: 0, tickets: 1, cbs: 0, text: '+1 ticket' };
  }
  const c = 5 + Math.floor(Math.random() * 11);
  return { xp: 0, tickets: 0, cbs: c, text: `+${c} CBS Coin` };
}

function spawnLootAround(center) {
  if (!LOOT_ENABLED || !map || !lootLayer || !center) return;

  const now = Date.now();
  if (now - lastLootSpawnAt < LOOT_RESPAWN_MS) return;

  const active = lootLayer.getLayers().length;
  if (active >= LOOT_MAX_ACTIVE) return;

  const L = window.L;
  if (!L) return;

  const kind = rollLootKind();
  const pos = randomNearbyLatLng(center, LOOT_SPAWN_MIN_DISTANCE_M, LOOT_SPAWN_MAX_DISTANCE_M);
  const icon = buildLootIcon(L, kind);

  const marker = L.marker([pos.lat, pos.lng], { icon, pane: 'cbsgo-loot-pane' });

  marker.on('click', () => {
    if (!lastUserLatLng) {
      alert('GPS not ready yet. Wait until your player marker appears.');
      return;
    }

    const player = { lat: lastUserLatLng[0], lng: lastUserLatLng[1] };
    const chest = { lat: pos.lat, lng: pos.lng };
    const dist = metersBetween(player, chest);

    if (dist > PICKUP_RADIUS_M) {
      alert(
        `Too far to open this gift.\n\n` +
        `Distance: ${Math.round(dist)}m\n` +
        `Needed: ≤ ${PICKUP_RADIUS_M}m`
      );
      return;
    }

    lootLayer.removeLayer(marker);

    const reward = computeLootReward(kind);
    const msg = `You found a gift!\n\nReward: ${reward.text}`;
    alert(msg);

    const payload = { kind, ...reward };
    try {
      window.dispatchEvent(new CustomEvent('cbsgo:lootReward', { detail: payload }));
    } catch {
      // ignore
    }
  });

  marker.addTo(lootLayer);
  lastLootSpawnAt = now;
}

/* ---------- Puzzles ---------- */

function maybeSpawnPuzzle(center) {
  if (!PUZZLES_ENABLED || !map || !nodesLayer || !center) return;

  // één puzzel tegelijk
  if (activePuzzleMarker) return;

  const L = window.L;
  if (!L) return;

  // 🔹 Eerste puzzel: sneller en zonder random kans
  if (!firstPuzzleSpawned) {
    if (puzzleMeters < FIRST_PUZZLE_MIN_METERS) {
      return;
    }
    // genoeg gelopen voor eerste puzzel -> spawn gegarandeerd
    puzzleMeters = 0;
    firstPuzzleSpawned = true;
  } else {
    // 🔹 Volgende puzzels: gebruik oude config (350m + 35% kans)
    if (puzzleMeters < PUZZLE_SPAWN_CHUNK_M) return;
    if (Math.random() > PUZZLE_SPAWN_CHANCE) return;
    puzzleMeters = 0;
  }

  const pos = randomNearbyLatLng(center, 60, 140);
  const icon = buildPuzzleIcon(L);

  const marker = L.marker([pos.lat, pos.lng], { icon, pane: 'cbsgo-puzzle-pane' });

  marker.on('click', () => {
    if (!lastUserLatLng) {
      alert('GPS not ready yet. Wait until your player marker appears.');
      return;
    }

    const player = { lat: lastUserLatLng[0], lng: lastUserLatLng[1] };
    const target = { lat: pos.lat, lng: pos.lng };
    const dist = metersBetween(player, target);

    if (dist > PICKUP_RADIUS_M) {
      alert(
        `Too far to start this puzzle.\n\n` +
        `Distance: ${Math.round(dist)}m\n` +
        `Needed: ≤ ${PICKUP_RADIUS_M}m`
      );
      return;
    }

    nodesLayer.removeLayer(marker);
    activePuzzleMarker = null;

    openPuzzleModal({ id: `puzzle-${Date.now()}`, name: 'CBS GO Puzzle' });
  });

  marker.addTo(nodesLayer);
  activePuzzleMarker = marker;
}

/* ---------- Player marker + arrow + range ---------- */

function updatePlayerRange(latlng) {
  const L = window.L;
  if (!L || !map || !latlng) return;

  const radiusMeters = PICKUP_RADIUS_M;

  if (!playerRangeCircle) {
    playerRangeCircle = L.circle(latlng, {
      radius: radiusMeters,
      color: '#38bdf8',
      weight: 1,
      opacity: 0.9,
      fillColor: '#38bdf8',
      fillOpacity: 0.12,
      dashArray: '4 6'
    }).addTo(map);
  } else {
    playerRangeCircle.setLatLng(latlng);
    playerRangeCircle.setRadius(radiusMeters);
  }
}

function setUserMarker(latlng) {
  const L = window.L;
  if (!L || !map) return;

  const icon = buildPlayerIcon(L);

  if (!userMarker) {
    userMarker = L.marker(latlng, { icon, pane: 'cbsgo-player-pane' }).addTo(map);
    map.setView(latlng, 19);   // eerste keer dicht erop
  } else {
    userMarker.setIcon(icon);
    userMarker.setLatLng(latlng);
  }

  // Richting-pijl
  if (!userArrow) {
    userArrow = L.marker(latlng, {
      icon: buildArrowIcon(L, lastHeadingDeg),
      interactive: false,
      pane: 'cbsgo-player-pane'
    }).addTo(map);
  } else {
    userArrow.setIcon(buildArrowIcon(L, lastHeadingDeg));
    userArrow.setLatLng(latlng);
  }

  // Profiel + pijl altijd boven alles
  if (userMarker && userMarker.bringToFront) userMarker.bringToFront();
  if (userArrow && userArrow.bringToFront) userArrow.bringToFront();

  // Glow-range
  updatePlayerRange(latlng);

  // Auto-follow: kaart blijft om je heen gecentreerd, tenzij je zelf hebt gescrolld of worldViewMode aan staat
  if (followPlayer && !worldViewMode && map) {
    try {
      const center = map.getCenter();
      const distToCenter = metersBetween(
        { lat: center.lat, lng: center.lng },
        { lat: latlng[0], lng: latlng[1] }
      );
      if (!Number.isFinite(distToCenter) || distToCenter > 20) {
        const zoom = map.getZoom() || 19;
        map.setView(latlng, zoom);
      }
    } catch {
      // ignore
    }
  }
}

/* ---------- Online players (oranje bolletjes) ---------- */

function ensureOtherPlayersLayer() {
  const L = window.L;
  if (!L || !map) return null;

  if (!otherPlayersLayer) {
    otherPlayersLayer = L.layerGroup();
    if (otherPlayersVisible) {
      otherPlayersLayer.addTo(map);
    }
  } else {
    if (otherPlayersVisible && !map.hasLayer(otherPlayersLayer)) {
      otherPlayersLayer.addTo(map);
    }
    if (!otherPlayersVisible && map.hasLayer(otherPlayersLayer)) {
      map.removeLayer(otherPlayersLayer);
    }
  }
  return otherPlayersLayer;
}

// Simpele clustering zodat bolletjes niet op elkaar liggen als je uitzoomt
function clusterOnlinePlayers(players) {
  if (!Array.isArray(players) || !map) return [];

  const zoom = map.getZoom() || 3;
  let factor;

  if (zoom >= 15) factor = 100;      // ~0.01°
  else if (zoom >= 10) factor = 50;  // ~0.02°
  else if (zoom >= 6) factor = 25;   // ~0.04°
  else factor = 10;                  // ~0.1° (wereld-view)

  const cells = new Map();

  players.forEach((p) => {
    if (!p) return;
    if (p.isMe) return;
    if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return;

    const latKey = Math.round(p.lat * factor) / factor;
    const lngKey = Math.round(p.lng * factor) / factor;
    const key = `${latKey}_${lngKey}`;

    if (!cells.has(key)) cells.set(key, []);
    cells.get(key).push(p);
  });

  const clusters = [];
  for (const [key, list] of cells.entries()) {
    if (!list.length) continue;

    if (list.length === 1) {
      const p = list[0];
      clusters.push({
        id: p.wallet_pk || key,
        lat: p.lat,
        lng: p.lng,
        count: 1,
        nickname: p.nickname || 'Anon',
        isCluster: false
      });
    } else {
      let sumLat = 0;
      let sumLng = 0;
      list.forEach((p) => {
        sumLat += p.lat;
        sumLng += p.lng;
      });
      const avgLat = sumLat / list.length;
      const avgLng = sumLng / list.length;

      clusters.push({
        id: `cluster_${key}`,
        lat: avgLat,
        lng: avgLng,
        count: list.length,
        nickname: `${list.length} players`,
        isCluster: true
      });
    }
  }

  return clusters;
}

function renderOnlinePlayers(players) {
  const L = window.L;
  if (!L || !map) return;

  const layer = ensureOtherPlayersLayer();
  if (!layer) return;

  if (!otherPlayersVisible) {
    for (const [id, marker] of otherPlayerMarkers.entries()) {
      layer.removeLayer(marker);
      otherPlayerMarkers.delete(id);
    }
    return;
  }

  const clusters = clusterOnlinePlayers(players);
  const seen = new Set();

  clusters.forEach((c) => {
    if (!c) return;
    if (typeof c.lat !== 'number' || typeof c.lng !== 'number') return;

    const id = c.id || `${c.lat},${c.lng}`;
    seen.add(id);

    const latlng = [c.lat, c.lng];

    let marker = otherPlayerMarkers.get(id);
    if (!marker) {
      const label = c.isCluster && c.count > 1
        ? String(c.count)
        : (c.nickname || 'Anon');

      const icon = buildOtherPlayerIcon(L, label);
      marker = L.marker(latlng, { icon, pane: 'cbsgo-others-pane' });

      const popupText = c.isCluster && c.count > 1
        ? `${c.count} CBS-GO explorers nearby`
        : `${c.nickname || 'CBS-GO explorer'}`;

      marker.bindPopup(popupText);

      marker.addTo(layer);
      otherPlayerMarkers.set(id, marker);
    } else {
      marker.setLatLng(latlng);
    }
  });

  for (const [id, marker] of otherPlayerMarkers.entries()) {
    if (!seen.has(id)) {
      layer.removeLayer(marker);
      otherPlayerMarkers.delete(id);
    }
  }
}

/* ---------- Leaflet setup ---------- */

export function renderMapView() {
  const weatherLabel = getWeatherLabel();

  return `
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Weer-effect laag (regen/sneeuw/nacht) -->
      <div id="cbsgoWeatherFx" style="
        position:absolute;
        inset:0;
        z-index:2000;
        pointer-events:none;
        overflow:hidden;
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
        <span id="cbsgoWeatherLabel">${weatherLabel}</span>
      </div>

      <!-- Kompas + centreer-player + online-toggle RECHTSONDER -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;
        bottom:148px;
        z-index:3000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
        <button id="cbsgoOnlineToggleBtn" type="button" style="
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
        ">👥</button>
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
    }
  } catch {}
  map = null;
  userMarker = null;
  userArrow = null;
  playerRangeCircle = null;
  nodesLayer = null;
  lootLayer = null;
  lastUserLatLng = null;
  worldViewMode = false;
  followPlayer = true;
  lastLootSpawnAt = 0;
  puzzleMeters = 0;
  activePuzzleMarker = null;
  firstPuzzleSpawned = false;

  otherPlayersLayer = null;
  otherPlayerMarkers.clear();
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

  // 🧱 eigen panes voor lagen
  const playerPane = map.createPane('cbsgo-player-pane');
  playerPane.style.zIndex = '650';

  const othersPane = map.createPane('cbsgo-others-pane');
  othersPane.style.zIndex = '640';

  const lootPane = map.createPane('cbsgo-loot-pane');
  lootPane.style.zIndex = '630';

  const puzzlePane = map.createPane('cbsgo-puzzle-pane');
  puzzlePane.style.zIndex = '630';

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    noWrap: true,
    bounds: worldBounds
  }).addTo(map);

  map.setMaxBounds(worldBounds);
  map.setView([51.687, 4.87], 16);

  nodesLayer = L.layerGroup().addTo(map);
  lootLayer = L.layerGroup().addTo(map);

  // Als je de kaart met de hand beweegt/zoomt -> auto-follow uit
  map.on('movestart', (ev) => {
    if (ev && ev.originalEvent) {
      followPlayer = false;
    }
  });

  return true;
}

/* ---------- GPS ---------- */

function startGps() {
  if (!navigator.geolocation || !map || !window.L) return;

  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy, heading } = pos.coords;
      const center = { lat: latitude, lng: longitude };

      const prev = lastUserLatLng
        ? { lat: lastUserLatLng[0], lng: lastUserLatLng[1] }
        : null;

      lastUserLatLng = [latitude, longitude];

      if (Number.isFinite(heading)) {
        lastHeadingDeg = heading;
      } else if (prev) {
        const distMoved = metersBetween(prev, center);
        if (Number.isFinite(distMoved) && distMoved > 2) {
          lastHeadingDeg = computeHeadingDeg(prev, center);
        }
      }

      setUserMarker([latitude, longitude]);

      if (prev) {
        const distMoved = metersBetween(prev, center);
        if (Number.isFinite(distMoved) && distMoved > 1) {
          puzzleMeters += distMoved;
        }
      }

      maybeSpawnPuzzle(center);
      spawnLootAround(center);

      fetchWeatherForLatLng(latitude, longitude);

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
      showMapMsg('Map engine failed (Leaflet not found). Refresh.');
      return;
    }

    const ok = initLeaflet();
    if (!ok) {
      showMapMsg('Could not init map. Refresh.');
      return;
    }

    // 🔹 pointerdown op de kaart => user wil kijken / scrollen => follow uit
    const host = ensureEl('cbsgoMapHost');
    if (host && !host.__cbsgo_followPointerBound) {
      host.__cbsgo_followPointerBound = true;
      host.addEventListener('pointerdown', (ev) => {
        const btn = ev.target.closest('button');
        if (btn && (
          btn.id === 'cbsgoCenterBtn' ||
          btn.id === 'cbsgoCompassBtn' ||
          btn.id === 'cbsgoOnlineToggleBtn'
        )) {
          return; // knoppen mogen follow niet uitzetten
        }
        followPlayer = false;
      });
    }

    const centerBtn = ensureEl('cbsgoCenterBtn');
    if (centerBtn) {
      centerBtn.onclick = () => {
        if (map && lastUserLatLng) {
          followPlayer = true;
          worldViewMode = false;
          map.setView(lastUserLatLng, 19);
        }
      };
    }

    const compassBtn = ensureEl('cbsgoCompassBtn');
    if (compassBtn) {
      compassBtn.onclick = () => {
        if (!map) return;
        worldViewMode = !worldViewMode;
        if (worldViewMode) {
          followPlayer = false;
          map.setView([51.687, 4.87], 3);
        } else if (lastUserLatLng) {
          followPlayer = true;
          map.setView(lastUserLatLng, 16);
        }
      };
    }

    const onlineToggleBtn = ensureEl('cbsgoOnlineToggleBtn');
    if (onlineToggleBtn) {
      const refreshBtnStyle = () => {
        if (otherPlayersVisible) {
          onlineToggleBtn.style.borderColor = 'rgba(251,191,36,0.95)';
          onlineToggleBtn.style.boxShadow = '0 0 12px rgba(251,191,36,0.7)';
        } else {
          onlineToggleBtn.style.borderColor = 'rgba(255,255,255,0.18)';
          onlineToggleBtn.style.boxShadow = 'none';
        }
      };
      refreshBtnStyle();

      onlineToggleBtn.onclick = () => {
        otherPlayersVisible = !otherPlayersVisible;
        const layer = ensureOtherPlayersLayer();
        if (layer && map) {
          if (otherPlayersVisible) {
            if (!map.hasLayer(layer)) layer.addTo(map);
          } else if (map.hasLayer(layer)) {
            map.removeLayer(layer);
          }
        }
        refreshBtnStyle();

        if (!otherPlayersVisible && otherPlayersLayer) {
          for (const [id, marker] of otherPlayerMarkers.entries()) {
            otherPlayersLayer.removeLayer(marker);
          }
          otherPlayerMarkers.clear();
        }
      };
    }

    if (!window.__cbsgo_onlinePlayers_listener) {
      window.__cbsgo_onlinePlayers_listener = true;
      window.addEventListener('cbsgo:onlinePlayers', (ev) => {
        const players = ev?.detail?.players || [];
        renderOnlinePlayers(players);
      });
    }

    updateWeatherFx();
    showMapMsg('Loading GPS…');
    startGps();
  };

  tick();
}
