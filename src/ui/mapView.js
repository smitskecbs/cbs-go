// src/ui/mapView.js
// Safe Leaflet map mount (waits for window.L to exist on GitHub Pages)

let map = null;
let userMarker = null;
let nodeLayer = null;

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

export function renderMapView() {
  // Host is position:relative so we can overlay messages safely
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
      nodeLayer = null;
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

function startGps() {
  if (!navigator.geolocation || !map || !window.L) return;

  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      const L = window.L;

      const latlng = [latitude, longitude];

      if (!userMarker) {
        userMarker = L.circleMarker(latlng, {
          radius: 8,
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.6
        }).addTo(map);

        map.setView(latlng, 18);
      } else {
        userMarker.setLatLng(latlng);
      }

      // show small accuracy text
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
      // not mounted yet, try again
      if (tries < maxTries) return setTimeout(tick, 100);
      return;
    }

    if (!window.L) {
      showMapMsg('Loading map engine…');
      if (tries < maxTries) return setTimeout(tick, 100);
      showMapMsg('Map engine failed to load (Leaflet not found). Refresh.');
      return;
    }

    // Leaflet is ready
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
