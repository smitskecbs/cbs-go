// src/ui/mapView.js
import { nodes } from '../data/nodes.js';
import { isNodeCompleted } from '../app/state.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderMapView() {
  // Fake map UI (your current one)
  return `
    <div class="mount" style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:800;">Map</div>
      <div style="opacity:.75; margin-top:4px;">Fake map for now (next: GPS + real map)</div>
      <div style="opacity:.75; margin-top:6px;">Tip: click a pin to open the node.</div>

      <div id="cbsgoFakeMap" style="
        margin-top:12px;
        height:420px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.10);
        background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.06), rgba(0,0,0,.25));
        position:relative;
        overflow:hidden;
      ">
        ${nodes.map((n, idx) => {
          const done = isNodeCompleted(n.id);
          // simple layout positions
          const positions = [
            { left: '10%', top: '60%' },
            { left: '40%', top: '35%' },
            { left: '70%', top: '58%' },
            { left: '52%', top: '80%' },
          ];
          const p = positions[idx % positions.length];

          return `
            <button
              type="button"
              class="cbsgo-pin"
              data-node-id="${esc(n.id)}"
              style="
                position:absolute;
                left:${p.left}; top:${p.top};
                transform:translate(-50%, -50%);
                padding:10px 12px;
                border-radius:999px;
                border:1px solid rgba(255,255,255,.14);
                background:${done ? 'rgba(0,255,128,.12)' : 'rgba(255,255,255,.06)'};
                color:#fff;
                cursor:pointer;
              "
              title="${esc(n.description || '')}"
            >
              ${done ? '✅' : '📍'} ${esc(n.name)}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function bindMapView() {
  const mapEl = document.querySelector('#cbsgoFakeMap');
  if (!mapEl) return;

  // ✅ IMPORTANT: bind ONLY ONCE using event delegation
  if (mapEl.dataset.bound === '1') return;
  mapEl.dataset.bound = '1';

  mapEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.cbsgo-pin');
    if (!btn) return;

    const id = btn.getAttribute('data-node-id');
    if (!id) return;

    console.log('[MAP CLICK]', { id });

    // Dispatch one event per click
    window.dispatchEvent(new CustomEvent('cbsgo:openNode', { detail: { id } }));
  });
}
