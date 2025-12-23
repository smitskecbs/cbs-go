// src/ui/appShell.js
// Fullscreen CBS GO shell
// - Map always fullscreen
// - Steps shown SMALL next to XP (top right)
// - Steps auto-start silently
// - Profile = profile + leaderboard
// - Bag = inventory only

import { nodes } from '../data/nodes.js';
import { openPuzzleModal } from './puzzleModal.js';

import { renderXpBar } from './xpBar.js';
import { renderStepsWidget, bindStepsWidget } from './stepsWidget.js';

import { isDev, hardResetCBSGO } from '../app/devTools.js';

import {
  getPlayerName,
  setPlayerName,
  getPlayerAvatar,
  setPlayerAvatar,
  clearPlayerAvatar,
  getTopScores,
  submitMyScore
} from '../app/leaderboard.js';

import { renderMapView, bindMapView } from './mapView.js';
import { isNodeCompleted } from '../app/state.js';

import { getTickets } from '../app/inventory.js';
import { enableSteps } from '../app/steps.js';

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

/* ---------------- tabs ---------------- */

function getSelectedTab() {
  try {
    return sessionStorage.getItem('cbsgo_tab_v1') || 'map';
  } catch {
    return 'map';
  }
}
function setSelectedTab(tab) {
  try { sessionStorage.setItem('cbsgo_tab_v1', tab); } catch {}
}

function renderBottomNav() {
  const t = getSelectedTab();
  const btn = (id, label, icon) => `
    <button data-tab="${id}" style="
      flex:1;height:56px;border:0;background:transparent;color:#fff;
      opacity:${t === id ? '1' : '.7'};
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:2px;font:inherit;
    ">
      <div style="font-size:18px">${icon}</div>
      <div style="font-size:11px">${label}</div>
    </button>
  `;

  return `
    <nav style="
      position:fixed;left:0;right:0;bottom:0;
      z-index:5000;
      padding:10px 10px calc(10px + env(safe-area-inset-bottom));
      background:rgba(10,12,18,.75);
      backdrop-filter: blur(10px);
      border-top:1px solid rgba(255,255,255,.1);
    ">
      <div style="
        display:flex;gap:8px;border-radius:18px;
        background:rgba(0,0,0,.25);
        border:1px solid rgba(255,255,255,.1);
        overflow:hidden;
      ">
        ${btn('map', 'Map', '🗺️')}
        ${btn('profile', 'Profile', '👤')}
        ${btn('bag', 'Bag', '🎒')}
      </div>
    </nav>
  `;
}

/* ---------------- panels ---------------- */

function panelWrap(title, inner) {
  return `
    <div style="
      position:fixed;left:0;right:0;bottom:0;
      z-index:6500;
      padding:12px 12px calc(86px + env(safe-area-inset-bottom));
      pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px,96vw);
        margin:0 auto;
        border-radius:22px;
        background:rgba(10,12,18,.9);
        border:1px solid rgba(255,255,255,.15);
        backdrop-filter: blur(12px);
        overflow:hidden;
      ">
        <div style="
          display:flex;justify-content:space-between;align-items:center;
          padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.1);
        ">
          <b>${esc(title)}</b>
          <button id="closePanel" class="btn secondary">Close</button>
        </div>
        <div style="padding:14px;max-height:70vh;overflow:auto">
          ${inner}
        </div>
      </div>
    </div>
  `;
}

/* ---------------- profile / leaderboard ---------------- */

function renderLeaderboard() {
  const top = getTopScores(10);
  const me = getPlayerName();
  const av = getPlayerAvatar();

  return `
    ${avatarCircle(av, 48)}
    <input id="lbName" value="${esc(me)}" maxlength="24"/>
    <button id="lbSave" class="btn">Save my score</button>
    <input id="lbAvatar" type="file" accept="image/*"/>
    <button id="lbRemove" class="btn secondary">Remove photo</button>

    <ol>
      ${top.map((e,i)=>`
        <li>#${i+1} ${esc(e.name)} – ${e.xp} XP</li>
      `).join('')}
    </ol>
  `;
}

function bindLeaderboardEvents() {
  const name = document.querySelector('#lbName');
  const save = document.querySelector('#lbSave');
  const file = document.querySelector('#lbAvatar');
  const remove = document.querySelector('#lbRemove');

  if (name) name.oninput = () => setPlayerName(name.value);
  if (save) save.onclick = () => submitMyScore();

  if (file) {
    file.onchange = () => {
      const f = file.files?.[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => setPlayerAvatar(r.result);
      r.readAsDataURL(f);
    };
  }
  if (remove) remove.onclick = () => clearPlayerAvatar();
}

/* ---------------- bag ---------------- */

function renderBag() {
  const tickets = getTickets();
  return `
    <div class="pill">🎟 Tickets: <b>${tickets}</b></div>
    <div class="pill" style="opacity:.6">🎆 Fireworks: 0 (soon)</div>
  `;
}

/* ---------------- main shell ---------------- */

export function renderAppShell() {
  const avatar = getPlayerAvatar();

  return `
    <div style="position:fixed;inset:0;background:#05070b;overflow:hidden">

      <div id="mapMount" style="position:absolute;inset:0;z-index:1">
        ${renderMapView()}
      </div>

      <header style="
        position:absolute;top:0;left:0;right:0;
        z-index:4000;
        padding:10px 12px;
        display:flex;justify-content:space-between;
        pointer-events:none;
      ">
        <div style="pointer-events:auto">
          ${avatarCircle(avatar,32)}
        </div>

        <div style="
          pointer-events:auto;
          display:flex;gap:10px;align-items:center;
        ">
          <div id="stepsInline">${renderStepsWidget()}</div>
          ${renderXpBar()}
        </div>
      </header>

      ${renderBottomNav()}
      ${renderPanel()}
    </div>
  `;
}

function renderPanel() {
  const t = getSelectedTab();
  if (t === 'profile') return panelWrap('Profile', renderLeaderboard());
  if (t === 'bag') return panelWrap('Bag', renderBag());
  return '';
}

/* ---------------- mount ---------------- */

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  bindMapView();
  bindStepsWidget();

  // auto start steps silently (no popup spam)
  if (!window.__cbsgo_steps_auto) {
    window.__cbsgo_steps_auto = true;
    enableSteps({ silent: true });
  }

  document.querySelectorAll('[data-tab]').forEach(b=>{
    b.onclick = () => {
      setSelectedTab(b.dataset.tab);
      mountApp();
    };
  });

  const close = document.querySelector('#closePanel');
  if (close) close.onclick = () => {
    setSelectedTab('map');
    mountApp();
  };

  if (getSelectedTab()==='profile') bindLeaderboardEvents();

  if (isDev()) {
    console.log('[CBSGO] dev mode');
  }

  if (!window.__cbsgo_open_listener) {
    window.__cbsgo_open_listener = true;
    window.addEventListener('cbsgo:openNode', ev=>{
      const id = ev?.detail?.id;
      if (!id || isNodeCompleted(id)) return;
      const node = nodes.find(n=>n.id===id);
      if (node) openPuzzleModal(node);
    });
  }
}
