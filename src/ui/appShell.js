// src/ui/appShell.js
// Fullscreen map shell
// - Map always fullscreen
// - XP + level top-right
// - Steps + tickets directly UNDER XP (compact)
// - Profile + Bag as bottom panels

import { nodes } from '../data/nodes.js';
import { openPuzzleModal } from './puzzleModal.js';

import { renderXpBar } from './xpBar.js';
import { renderStepsWidget, bindStepsWidget } from './stepsWidget.js';

import { tryAutoStart } from '../app/steps.js';
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

/* ---------------- Tabs ---------------- */

function getSelectedTab() {
  try {
    return sessionStorage.getItem('cbsgo_selected_tab_v5') || 'map';
  } catch {
    return 'map';
  }
}
function setSelectedTab(tab) {
  try { sessionStorage.setItem('cbsgo_selected_tab_v5', tab); } catch {}
}

function renderBottomNav() {
  const t = getSelectedTab();
  const btn = (id, label, icon) => `
    <button type="button" data-tab="${id}" style="
      flex:1;height:56px;border:0;background:transparent;
      color:#fff;opacity:${t === id ? '1' : '.7'};
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:2px;
    ">
      <div style="font-size:18px;">${icon}</div>
      <div style="font-size:11px;">${label}</div>
    </button>
  `;
  return `
    <nav style="
      position:fixed;left:0;right:0;bottom:0;z-index:5000;
      padding:10px;background:rgba(10,12,18,.72);
      backdrop-filter:blur(10px);
      border-top:1px solid rgba(255,255,255,.1);
    ">
      <div style="
        display:flex;gap:8px;border-radius:18px;
        border:1px solid rgba(255,255,255,.1);
        background:rgba(0,0,0,.2);
      ">
        ${btn('map','Map','🗺️')}
        ${btn('profile','Profile','👤')}
        ${btn('bag','Bag','🎒')}
      </div>
    </nav>
  `;
}

/* ---------------- Panels ---------------- */

function panelWrap(title, inner) {
  return `
    <div style="
      position:fixed;left:0;right:0;bottom:0;z-index:6500;
      padding:12px 12px 86px;pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px,96vw);margin:0 auto;
        border-radius:22px;border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.86);backdrop-filter:blur(12px);
      ">
        <div style="
          padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.1);
          display:flex;justify-content:space-between;
        ">
          <b>${title}</b>
          <button id="cbsgoClosePanel">Close</button>
        </div>
        <div style="padding:12px 14px;max-height:70vh;overflow:auto;">
          ${inner}
        </div>
      </div>
    </div>
  `;
}

/* ---------------- Profile / Bag ---------------- */

function renderBag() {
  const tickets = getTickets();
  return `
    <div>
      <div class="pill">🎟️ Tickets: <b>${tickets}</b></div>
      <div class="pill" style="opacity:.6">🎆 Fireworks (soon)</div>
    </div>
  `;
}

function renderPanel() {
  const t = getSelectedTab();
  if (t === 'bag') return panelWrap('Bag', renderBag());
  return '';
}

/* ---------------- App Shell ---------------- */

export function renderAppShell() {
  const avatar = getPlayerAvatar();
  return `
    <div style="position:fixed;inset:0;background:#05070b;overflow:hidden">

      <div id="mapMount" style="position:absolute;inset:0;z-index:1">
        ${renderMapView()}
      </div>

      <!-- TOP RIGHT -->
      <div style="
        position:absolute;top:10px;right:10px;z-index:4000;
        display:flex;flex-direction:column;gap:6px;
      ">
        <div style="
          padding:10px 12px;border-radius:18px;
          background:rgba(10,12,18,.72);
          border:1px solid rgba(255,255,255,.12);
        ">
          ${renderXpBar()}
        </div>

        <div id="stepsMount">
          ${renderStepsWidget()}
        </div>
      </div>

      ${renderBottomNav()}
      ${renderPanel()}
    </div>
  `;
}

/* ---------------- Mount ---------------- */

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  bindMapView();
  bindStepsWidget();

  // 🔑 AUTO-START GPS ONCE
  if (!window.__cbsgo_steps_autostart) {
    window.__cbsgo_steps_autostart = true;
    tryAutoStart();
  }

  document.querySelectorAll('[data-tab]').forEach(b => {
    b.onclick = () => {
      setSelectedTab(b.dataset.tab);
      mountApp();
    };
  });

  const close = document.querySelector('#cbsgoClosePanel');
  if (close) close.onclick = () => {
    setSelectedTab('map');
    mountApp();
  };
}
