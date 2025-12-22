// src/ui/mapView.js
// Fake map + pins. Completed nodes are hidden.
// Emits: cbsgo:openNode {id}

import { nodes } from '../data/nodes.js';
import { getPlayerName, getPlayerAvatar } from '../app/leaderboard.js';
import { isNodeCompleted } from '../app/state.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function avatarCircle(dataUrl, size = 22) {
  const bg = dataUrl ? `background-image:url('${dataUrl}');` : '';
  const txt = dataUrl ? '' : '★';
  return `
    <span style="
      width:${size}px;height:${size}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${bg}
      background-size:cover;
      background-position:center;
      display:inline-flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:12px;
      flex:0 0 auto;
    ">${txt}</span>
  `;
}

function posFromId(id) {
  const str = String(id || '');
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  const x = 12 + (h % 70);
  const y = 18 + ((h >>> 8) % 62);
  return { x, y };
}

function renderPin(node) {
  const { x, y } = posFromId(node.id);
  const color = node.color || '#35d07f';

  return `
    <button
      type="button"
      class="mapPin"
      data-node-id="${esc(node.id)}"
      title="${esc(node.name)}"
      style="
        position:absolute;
        left:${x}%;
        top:${y}%;
        transform:translate(-50%,-50%);
        cursor:pointer;
        border:0;
        background:transparent;
        padding:0;
      "
    >
      <span style="
        display:inline-flex;
        align-items:center;
        gap:10px;
        padding:10px 14px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(0,0,0,.18);
        box-shadow:0 12px 26px rgba(0,0,0,.35);
        backdrop-filter: blur(6px);
      ">
        <span style="
          width:12px;height:12px;border-radius:999px;
          background:${color};
          box-shadow:0 0 0 6px rgba(255,255,255,.05);
          flex:0 0 auto;
        "></span>
        <span style="color:#fff; font-size:13px; white-space:nowrap;">
          ${esc(node.name)}
        </span>
      </span>
    </button>
  `;
}

function renderMeMarker() {
  const name = getPlayerName() || 'You';
  const avatar = getPlayerAvatar();
  const x = 50;
  const y = 86;

  return `
    <div style="
      position:absolute;
      left:${x}%;
      top:${y}%;
      transform:translate(-50%,-50%);
      display:flex;
      align-items:center;
      gap:10px;
      padding:10px 14px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(0,0,0,.18);
      box-shadow:0 12px 26px rgba(0,0,0,.35);
      backdrop-filter: blur(6px);
      pointer-events:none;
    ">
      ${avatarCircle(avatar, 22)}
      <span style="color:#fff; font-size:13px; white-space:nowrap;">
        ${esc(name)}
      </span>
    </div>
  `;
}

export function renderMapView() {
  const me = getPlayerName() || 'You';

  // ✅ only SOLO nodes + not completed
  const soloNodes = nodes
    .filter(n => n.type !== 'group')
    .filter(n => !isNodeCompleted(n.id));

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
          <div style="font-size:18px; font-weight:700; margin:0;">Map</div>
          <div style="opacity:.75; font-size:13px;">Fake map for now (next: real GPS map)</div>
          <div style="opacity:.75; font-size:13px; margin-top:6px;">Tip: click a pin to open the node.</div>
        </div>
        <div style="opacity:.75; font-size:13px;">You: <b style="opacity:1">${esc(me)}</b></div>
      </div>

      <div id="fakeMap" style="
        position:relative;
        margin-top:12px;
        width:100%;
        height:420px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.10);
        overflow:hidden;
        background:
          radial-gradient(circle at 15% 20%, rgba(18, 97, 66,.35), transparent 45%),
          radial-gradient(circle at 70% 30%, rgba(98, 69, 160,.28), transparent 48%),
          radial-gradient(circle at 40% 85%, rgba(255, 216, 107,.12), transparent 50%),
          linear-gradient(135deg, rgba(0,0,0,.25), rgba(0,0,0,.55));
      ">
        <div style="
          position:absolute; inset:0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size:40px 40px;
          opacity:.35;
          pointer-events:none;
        "></div>

        ${soloNodes.map(renderPin).join('')}

        ${renderMeMarker()}
      </div>
    </section>
  `;
}

export function bindMapView() {
  const root = document.querySelector('#mapMount') || document;
  const map = root.querySelector('#fakeMap');
  if (!map) return;

  if (map.__cbsgo_map_bound) return;
  map.__cbsgo_map_bound = true;

  map.addEventListener('click', (e) => {
    const pin = e.target?.closest?.('[data-node-id]');
    if (!pin) return;

    const id = pin.getAttribute('data-node-id');
    if (!id) return;

    window.dispatchEvent(new CustomEvent('cbsgo:openNode', { detail: { id } }));
  });
}

