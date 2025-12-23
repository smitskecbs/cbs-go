// src/ui/appShell.js
// Fullscreen Pokemon-GO style shell: map fills screen, UI overlays.

import { nodes } from '../data/nodes.js';
import { openPuzzleModal } from './puzzleModal.js';
import { renderXpBar } from './xpBar.js';
import { isDev, hardResetCBSGO } from '../app/devTools.js';
import { getPlayerAvatar } from '../app/leaderboard.js';
import { renderMapView, bindMapView } from './mapView.js';
import { isNodeCompleted } from '../app/state.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function avatarCircle(dataUrl, size = 30) {
  const bg = dataUrl ? `background-image:url('${dataUrl}');` : '';
  const txt = dataUrl ? '' : '👤';
  return `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${bg}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">${txt}</div>
  `;
}

function getSelectedTab() {
  try {
    return sessionStorage.getItem('cbsgo_selected_tab_v2') || 'map';
  } catch {
    return 'map';
  }
}
function setSelectedTab(tab) {
  try { sessionStorage.setItem('cbsgo_selected_tab_v2', tab); } catch {}
}

function renderBottomNav() {
  const t = getSelectedTab();
  const btn = (id, label, icon) => `
    <button type="button" data-tab="${id}" style="
      flex:1;
      height:56px;
      border:0;
      background:transparent;
      color:#fff;
      opacity:${t === id ? '1' : '.72'};
      font:inherit;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:2px;
    ">
      <div style="font-size:18px; line-height:18px;">${icon}</div>
      <div style="font-size:11px;">${esc(label)}</div>
    </button>
  `;

  return `
    <nav style="
      position:fixed;
      left:0; right:0; bottom:0;
      z-index:5000;
      padding:10px 10px calc(10px + env(safe-area-inset-bottom));
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      border-top:1px solid rgba(255,255,255,.10);
    ">
      <div style="
        display:flex;
        gap:8px;
        border-radius:18px;
        border:1px solid rgba(255,255,255,.10);
        background:rgba(0,0,0,.18);
        overflow:hidden;
      ">
        ${btn('map', 'Map', '🗺️')}
        ${btn('profile', 'Profile', '👤')}
        ${btn('bag', 'Bag', '🎒')}
      </div>
    </nav>
  `;
}

export function renderAppShell() {
  const dev = isDev();
  const myAvatar = getPlayerAvatar();

  return `
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP always fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${renderMapView()}
      </div>

      <!-- TOPBAR overlay -->
      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        pointer-events:none;
      ">
        <div style="
          display:flex; gap:10px; align-items:center;
          pointer-events:auto;
          padding:10px 12px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter: blur(10px);
        ">
          ${avatarCircle(myAvatar, 32)}
          <div>
            <div style="font-weight:900; line-height:1;">CBS GO</div>
            <div style="opacity:.8; font-size:12px;">Explore Web2 × Web3, IRL</div>
          </div>
        </div>

        <div id="xpMount" style="
          pointer-events:auto;
          padding:10px 12px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter: blur(10px);
        ">
          ${renderXpBar()}
        </div>
      </header>

      ${renderBottomNav()}

      ${
        dev
          ? `<button id="resetBtn" type="button" style="
               position:fixed;
               right:12px;
               bottom:90px;
               z-index:6000;
               padding:10px 12px;
               border-radius:14px;
               border:1px solid rgba(255,255,255,.14);
               background:rgba(0,0,0,.35);
               color:#fff;
             ">Reset Demo</button>`
          : ``
      }
    </div>
  `;
}

function bindTabs() {
  document.querySelectorAll('[data-tab]').forEach(b => {
    b.addEventListener('click', () => {
      const tab = b.getAttribute('data-tab');
      setSelectedTab(tab);

      // Stap 1: tabs zijn alleen “select state”.
      // Panels (profile/bag) bouwen we in de volgende stap.
      // Nu blijft de map altijd fullscreen.
      mountApp();
    });
  });
}

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  bindTabs();
  bindMapView();

  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', hardResetCBSGO);
  }

  // Open node → puzzle modal (maar nooit als completed)
  if (!window.__cbsgo_openNode_listener) {
    window.__cbsgo_openNode_listener = true;

    window.addEventListener('cbsgo:openNode', (ev) => {
      const id = ev?.detail?.id;
      if (!id) return;

      if (isNodeCompleted(id)) return;

      const node = nodes.find(n => n.id === id);
      if (!node) return;

      openPuzzleModal(node);
    });
  }

  // Rerender map when something completes (pins disappear)
  if (!window.__cbsgo_rerender_map_listener) {
    window.__cbsgo_rerender_map_listener = true;

    const rerender = () => {
      const mount = document.querySelector('#mapMount');
      if (!mount) return;
      mount.innerHTML = renderMapView();
      bindMapView();
    };

    window.addEventListener('cbsgo:rerenderMap', rerender);
    window.addEventListener('cbsgo:nodeCompleted', rerender);
  }
}
