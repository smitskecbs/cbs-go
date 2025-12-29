// src/ui/appShell.js
// Fullscreen map shell met overlays.
//
// Layout afspraken (NIET meer aankomen zonder dat jij het vraagt):
// - Map is fullscreen.
// - GEEN "CBS GO + profiel foto" linksboven.
// - Rechtsboven: alleen XP + stappen.
// - Rechtsonder: 2 ronde knoppen op de kaart (Profile & Bag), naast elkaar, net boven GPS-tekst.
// - Geen extra weather-dot linksonder (jouw eigen weer bovenin blijft leidend).
// - Geen leaderboard / competitie-focus.

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
} from '../app/leaderboard.js'; // alleen voor lokale profile-storage

import { renderMapView, bindMapView } from './mapView.js';
import { isNodeCompleted } from '../app/state.js';

import { getTickets, getCbsCoins } from '../app/inventory.js';

// ✅ Login + wallet weer actief
import { openLoginModal } from './loginModal.js';
import { hasWallet, isWalletUnlocked, getPublicKey } from '../app/wallet.js';

// ✅ NIEUW: Supabase helper (profile -> players tabel)
import { syncPlayerProfile } from '../app/onlinePlayers.js';

// ✅ NIEUW: positie-sync + andere spelers ophalen (oranje bolletjes)
import '../app/playerSync.js';

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

// Tab state: 'map' = geen panel, 'profile' = profiel-panel, 'bag' = inventaris
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

// ---------- Panel wrapper (onderin) ----------

function panelWrap(title, innerHtml) {
  return `
    <div style="
      position:fixed;
      left:0; right:0;
      bottom:0;
      z-index:6500;
      padding:12px 12px calc(16px + env(safe-area-inset-bottom));
      pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px, 96vw);
        margin:0 auto;
        border-radius:22px;
        /* 🔧 buitenste rand + achtergrond transparanter gemaakt */
        border:1px solid rgba(255,255,255,.30);
        background:rgba(10,12,18,.30);
        backdrop-filter: blur(14px);
        box-shadow:0 18px 60px rgba(0,0,0,.55);
        overflow:hidden;
      ">
        <div style="
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 16px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-weight:900; font-size:15px;">${esc(title)}</div>
          <button type="button" id="cbsgoClosePanel" style="
            border:0;
            padding:6px 10px;
            border-radius:999px;
            background:rgba(255,255,255,.1);
            color:#fff;
            font-size:12px;
          ">Close</button>
        </div>

        <div style="
          max-height: min(70vh, 560px);
          overflow:auto;
          padding:14px 16px 16px 16px;
        ">
          ${innerHtml}
        </div>
      </div>
    </div>
  `;
}

// ---------- Profile (zonder leaderboard) ----------

function renderProfile() {
  const me = getPlayerName();
  const myAvatar = getPlayerAvatar();
  const walletPk = getPublicKey(); // ✅ nep-wallet adres ophalen

  return `
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      /* 🔧 binnenste kaart transparanter (ongeveer 70% transparant) */
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Profile</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your nickname and avatar stay on this device only.
      </p>

      <div style="
        display:flex;
        gap:14px;
        align-items:center;
        flex-wrap:wrap;
      ">
        ${avatarCircle(myAvatar, 64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${esc(me)}" maxlength="24" style="
            width:100%;
            margin-top:4px;
            padding:10px 10px;
            border-radius:12px;
            border:1px solid rgba(255,255,255,.14);
            background:rgba(255,255,255,.06);
            color:#fff;
          " placeholder="Your nickname"/>

          <div style="margin-top:12px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:4px;">Photo</div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="profileAvatar" type="file" accept="image/*" />
              <button class="btn secondary" id="profileRemoveAvatar" type="button">Remove photo</button>
            </div>
          </div>

          ${
            walletPk
              ? `
                <div style="margin-top:12px;">
                  <div style="font-size:12px; opacity:.8; margin-bottom:4px;">
                    CBS-GO wallet address (local, game-only)
                  </div>
                  <div style="
                    font-size:11px;
                    opacity:.95;
                    padding:8px 10px;
                    border-radius:10px;
                    border:1px solid rgba(255,255,255,.16);
                    background:rgba(255,255,255,.04);
                    word-break:break-all;
                    font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                  ">
                    ${esc(walletPk)}
                  </div>
                </div>
              `
              : ''
          }

          <div id="profileMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
        </div>
      </div>
    </section>
  `;
}

function bindProfileEvents() {
  const nameInput = document.querySelector('#profileName');
  const fileInput = document.querySelector('#profileAvatar');
  const removeBtn = document.querySelector('#profileRemoveAvatar');

  let saveTimer = null;

  const setMsg = (t) => {
    const msg = document.querySelector('#profileMsg');
    if (msg) msg.textContent = t || '';
  };

  if (nameInput) setMsg(nameInput.value ? `✅ Profile loaded: ${nameInput.value}` : '');

  const saveNameNow = () => {
    if (!nameInput) return;
    const n = setPlayerName(nameInput.value);
    setMsg(`✅ Name saved: ${n}`);
  };

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      setMsg('Saving…');
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(saveNameNow, 300);
    });

    nameInput.addEventListener('blur', () => {
      if (saveTimer) clearTimeout(saveTimer);
      saveNameNow();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;

      if (f.size > 1_500_000) {
        setMsg('⛔ Image too large. Please choose a smaller photo (max ~1.5MB).');
        fileInput.value = '';
        return;
      }

      setMsg('Uploading photo…');
      const reader = new FileReader();
      reader.onload = () => {
        setPlayerAvatar(String(reader.result || ''));
        setMsg('✅ Photo saved');
        updatePanel(); // alleen panel/avatar updaten, map blijft staan
      };
      reader.onerror = () => setMsg('⛔ Failed to read image.');
      reader.readAsDataURL(f);
    });
  }

  if (removeBtn) {
    removeBtn.onclick = () => {
      clearPlayerAvatar();
      setMsg('✅ Photo removed');
      updatePanel();
    };
  }
}

// ---------- Bag (inventory – tickets + CBS play money) ----------

function renderBag() {
  const tickets = getTickets();
  const cbs = getCbsCoins();

  return `
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      /* 🔧 zelfde transparantie als profile */
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Bag</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your collected items in the real world.
      </p>

      <div style="
        display:flex;
        flex-wrap:wrap;
        gap:10px;
      ">
        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🎟️ Tickets: <b>${tickets}</b>
        </div>

        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🪙 CBS (play money): <b>${cbs}</b>
        </div>
      </div>
    </section>
  `;
}

// ---------- Panel router ----------

function renderPanel() {
  const t = getSelectedTab();
  if (t === 'profile') return panelWrap('Profile', `<div id="profileMount">${renderProfile()}</div>`);
  if (t === 'bag') return panelWrap('Bag', `<div id="bagMount">${renderBag()}</div>`);
  return '';
}

// ---------- Hoofd shell ----------

export function renderAppShell() {
  return `
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${renderMapView()}
      </div>

      <!-- Header rechtsboven: XP + stappen -->
      <header style="
        position:absolute; top:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        flex-direction:column;
        align-items:flex-end;
        gap:8px;
        pointer-events:none;
      ">
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

        <div id="stepsMount" style="pointer-events:auto;">
          ${renderStepsWidget()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag, naast elkaar, NET boven GPS -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px; /* netjes tussen 🎯/🧭 en GPS-balk */
        z-index:5000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
        <button type="button" data-panel="profile" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#fff;
        ">👤</button>

        <button type="button" data-panel="bag" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#fff;
        ">🎒</button>
      </div>

      <!-- Panel-root: alleen deze wordt gewisseld bij tabs -->
      <div id="panelRoot">
        ${renderPanel()}
      </div>

      ${
        isDev()
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

// ---------- Alleen panel verversen, NIET hele app ----------

function updatePanel() {
  const root = document.querySelector('#panelRoot');
  if (!root) return;
  root.innerHTML = renderPanel();

  const t = getSelectedTab();
  if (t === 'profile') {
    bindProfileEvents();
  }

  // Close-knop opnieuw koppelen na elke panel-render
  const close = document.querySelector('#cbsgoClosePanel');
  if (close) {
    close.addEventListener('click', () => {
      setSelectedTab('map');
      updatePanel();
    });
  }
}

// ---------- Binding van knoppen / panel ----------

function bindUi() {
  // Floating knoppen
  document.querySelectorAll('[data-panel]').forEach(b => {
    b.addEventListener('click', () => {
      const panel = b.getAttribute('data-panel');
      const current = getSelectedTab();
      // Zelfde panel klik = sluiten -> terug naar map
      if (current === panel) {
        setSelectedTab('map');
      } else {
        setSelectedTab(panel || 'map');
      }
      updatePanel(); // alleen panel wisselen, map/weer/GPS blijven intact
    });
  });
}

// ---------- Interne helper: hele app bootstrappen (zonder login) ----------

function bootstrapApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  // 🔌 Supabase: rustig op achtergrond profiel syncen (nickname + wallet_pk)
  try {
    syncPlayerProfile();
  } catch (e) {
    console.warn('CBS GO: failed to sync player profile (ignored)', e);
  }

  bindUi();
  bindMapView();

  // auto-start steps
  tryAutoStart();

  // steps rerender op change (stepsWidget is nu leeg, maar laten we staan voor later)
  bindStepsWidget();
  if (!window.__cbsgo_steps_rerender_listener) {
    window.__cbsgo_steps_rerender_listener = true;
    const rerenderSteps = () => {
      const mount = document.querySelector('#stepsMount');
      if (!mount) return;
      mount.innerHTML = renderStepsWidget();
      bindStepsWidget();
    };
    window.addEventListener('cbsgo:stepsChanged', rerenderSteps);
  }

  // XP-balk rerender bij XP/level wijziging + stappen wijziging
  if (!window.__cbsgo_xp_rerender_listener) {
    window.__cbsgo_xp_rerender_listener = true;
    const rerenderXp = () => {
      const mount = document.querySelector('#xpMount');
      if (!mount) return;
      mount.innerHTML = renderXpBar();
    };
    ['cbsgo:xpChanged', 'cbsgo:levelChanged', 'cbsgo:stepsChanged'].forEach(evtName => {
      window.addEventListener(evtName, rerenderXp);
    });
  }

  // Bag/inventory rerender bij loot-verandering
  if (!window.__cbsgo_inventory_rerender_listener) {
    window.__cbsgo_inventory_rerender_listener = true;
    const rerenderBagIfOpen = () => {
      if (getSelectedTab() === 'bag') {
        updatePanel(); // renderBag() leest getTickets/getCbsCoins opnieuw
      }
    };
    ['cbsgo:inventoryChanged', 'cbsgo:bagChanged'].forEach(evtName => {
      window.addEventListener(evtName, rerenderBagIfOpen);
    });
  }

  // Init panel (als er al een tab gekozen was)
  updatePanel();

  // Dev reset knop
  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', hardResetCBSGO);
  }

  // Node open -> puzzle
  if (!window.__cbsgo_openNode_listener) {
    window.__cbsgo_openNode_listener = true;

    window.addEventListener('cbsgo:openNode', (ev) => {
      const id = ev?.detail?.id;
      if (!id) return;

      if (id === '__daily__') {
        openPuzzleModal({ id: '__daily__', name: 'Daily Glow' });
        return;
      }

      if (isNodeCompleted(id)) return;

      const node = nodes.find(n => n.id === id);
      if (!node) return;

      openPuzzleModal(node);
    });
  }

  // Node completion events
  if (!window.__cbsgo_complete_listener_v1) {
    window.__cbsgo_complete_listener_v1 = true;
    window.addEventListener('cbsgo:completeNode', (ev) => {
      const id = ev?.detail?.id;
      if (!id) return;
      import('../app/state.js').then(({ completeNode }) => {
        completeNode(id);
        mountApp(); // bij complete node mag alles opnieuw tekenen
      });
    });
  }
}

// ---------- Mount + login/PIN flow ----------

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  // Als er al een wallet is én hij is in deze sessie unlocked -> direct starten
  if (hasWallet() && isWalletUnlocked()) {
    bootstrapApp();
    return;
  }

  // Anders: eerst login/pin modal
  openLoginModal();

  const onLoginDone = () => {
    window.removeEventListener('cbsgo:loginDone', onLoginDone);
    bootstrapApp();
  };

  window.addEventListener('cbsgo:loginDone', onLoginDone);
}
