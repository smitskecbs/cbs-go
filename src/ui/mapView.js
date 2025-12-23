// src/ui/mapView.js
import { nodes } from '../data/nodes.js';
import { isNodeCompleted } from '../app/state.js';

let map = null;
let markers = [];

function hasLeaflet() {
  return typeof window !== 'undefined' && !!window.L;
}

function clearMarkers() {
  markers.forEach(m => m.remove());
  markers = [];
}

function getMyDefaultCenter() {
  // fallback center: first node or NL-ish
  const first = nodes.find(n => Number.isFinite(n.lat) && Number.isFinite(n.lng));
  if (first) return [first.lat, first.lng];
  return [52.0907, 5.1214]; // Utrecht-ish
}

function makeIcon(done) {
  // Use default markers; tweak via CSS later if you want
  return done ? '✅' : '📍';
}

export function renderMapView() {
  if (!hasLeaflet()) {
    return `
      <div style="padding:12px; border:1px solid rgba(255,255,255,.12); border-radius:16px; background:rgba(255,255,255,.04);">
        <div style="font-weight:700;">Map loading…</div>
        <div style="opacity:.8; margin-top:6px;">
          Leaflet not loaded. Make sure you added Leaflet CDN in <code>index.html</code>.
        </div>
      </div>
    `;
  }

  return `
    <div style="margin-top:10px;">
      <div style="
        border-radius:16px;
        overflow:hidden;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(0,0,0,.2);
      ">
        <div id="leafletMap" style="height:420px; width:100%;"></div>
      </div>

      <div style="margin-top:10px; font-size:12px; opacity:.75;">
        Tip: Click a pin to open a Node. Completed nodes are marked.
      </div>
    </div>
  `;
}

export function bindMapView() {
  if (!hasLeaflet()) return;

  const el = document.querySelector('#leafletMap');
  if (!el) return;

  // init map once
  if (!map) {
    const center = getMyDefaultCenter();
    map = window.L.map(el, { zoomControl: true }).setView(center, 16);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
  } else {
    // re-attach map to new DOM node after re-render
    map._container = el;
    el.innerHTML = '';
    map.invalidateSize(true);
  }

  clearMarkers();

  nodes.forEach(n => {
    if (!Number.isFinite(n.lat) || !Number.isFinite(n.lng)) return;

    const done = isNodeCompleted(n.id);

    const m = window.L.marker([n.lat, n.lng]).addTo(map);
    m.bindPopup(`
      <div style="min-width:180px;">
        <div style="font-weight:800;">${makeIcon(done)} ${n.name}</div>
        <div style="opacity:.85; margin-top:4px;">${n.description || ''}</div>
        <div style="opacity:.75; margin-top:6px;">Reward: ${Number(n.xp || 0)} XP</div>
        ${done ? `<div style="margin-top:6px;">✅ Completed</div>` : `<div style="margin-top:6px;">Click pin to open</div>`}
      </div>
    `);

    m.on('click', () => {
      // Let appShell open modal via global event (your existing flow)
      window.dispatchEvent(new CustomEvent('cbsgo:openNode', { detail: { id: n.id } }));
    });

    markers.push(m);
  });

  map.invalidateSize(true);
}
