// src/ui/appShell.js
// Fullscreen map shell with overlays + required local wallet login (PIN)
// - On first run: nickname + PIN -> create encrypted local wallet
// - On later runs: PIN -> unlock
//
// Keeps your existing layout, steps autostart, node open modal, etc.

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

import { openLoginModal } from './loginModal.js';
import { hasLocalWallet, isWalletUnlocked, getWalletPubkey } from '../app/wallet.js';

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

function panelWrap(title, innerHtml) {
  return `
    <div style="
      position:fixed;
      left:0; right:0;
      bottom:0;
      z-index:6500;
      padding:12px 12px calc(86px + env(safe-area-inset-bottom));
      pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px, 96vw);
        margin:0 auto;
        border-radius:22px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.86);
        backdrop-filter: blur(12px);
        box-shadow:0 18px 60px rgba(0,0,0,.55);
        overflow:hidden;
      ">
        <div style="
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 14px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-weight:900;">${esc(title)}</div>
          <button type="button" id="cbsgoClosePanel" style="
            border:0;
            padding:8px 10px;
            border-radius:12px;
            background:rgba(255,255,255,.08);
            color:#fff;
          ">Close</button>
        </div>

        <div style="
          max-height: min(70vh, 560px);
          overflow:auto;
          padding:12px 14px;
        ">
          ${innerHtml}
        </div>
      </div>
    </div>
  `;
}

/* ---------- Profile + Leaderboard ---------- */

function renderLeaderboard() {
  const top = getTopScores(10);
  const me = getPlayerName();
  const myAvatar = getPlayerAvatar();

  return `
    <section class="lb" style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <h3 style="margin:0; font-size:16px;">Leaderboard</h3>
        <span class="pill">Local</span>
      </div>

      <div style="
        margin-top:10px;
        padding:10px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.10);
        background:rgba(0,0,0,.18);
      ">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Profile (auto-saves)</div>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          ${avatarCircle(myAvatar, 44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${esc(me)}" maxlength="24" style="
                flex:1; min-width:180px;
                padding:10px 10px;
                border-radius:12px;
                border:1px solid rgba(255,255,255,.14);
                background:rgba(255,255,255,.06);
                color:#fff;
              "/>
              <button class="btn" id="lbSubmit" type="button">Save my score</button>
            </div>

            <div style="margin-top:8px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbAvatar" type="file" accept="image/*" />
              <button class="btn secondary" id="lbRemoveAvatar" type="button">Remove photo</button>
            </div>

            <div id="lbMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>

            <div style="margin-top:10px; font-size:12px; opacity:.75;">
              Local wallet: <b>${esc(getWalletPubkey() || '')}</b>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:10px;">
        ${
          top.length === 0
            ? `<div style="opacity:.75; font-size:13px;">No scores yet. Click “Save my score”.</div>`
            : `
              <ol style="margin:0; padding-left:18px;">
                ${top.map((e, i) => `
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${i + 1}</div>
                      ${avatarCircle(e.avatar, 28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${esc(e.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">Level ${Number(e.level || 1)}</div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">${Number(e.xp || 0)} XP</div>
                  </li>
                `).join('')}
              </ol>
            `
        }
      </div>
    </section>
  `;
}

function bindLeaderboardEvents() {
  const nameInput = document.querySelector('#lbName');
  const submitBtn = document.querySelector('#lbSubmit');
  const fileInput = document.querySelector('#lbAvatar');
  const removeBtn = document.querySelector('#lbRemoveAvatar');

  let saveTimer = null;

  const setMsg = (t) => {
    const msg = document.querySelector('#lbMsg');
    if (msg) msg.textContent = t || '';
  };

  if (nameInput) setMsg(`✅ Profile loaded: ${nameInput.value}`);

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
        mountApp();
      };
      reader.onerror = () => setMsg('⛔ Failed to read image.');
      reader.readAsDataURL(f);
    });
  }

  if (removeBtn) {
    removeBtn.onclick = () => {
      clearPlayerAvatar();
      setMsg('✅ Photo removed');
      mountApp();
    };
  }

  if (submitBtn) {
    submitBtn.onclick = () => {
      if (nameInput) saveNameNow();
      const entry = submitMyScore();
      setMsg(`✅ Saved: ${entry.name} – ${entry.xp} XP`);
      mountApp();
    };
  }
}

/* ---------- Bag (inventory) ---------- */

function renderBag() {
  const tickets = getTickets();
  return `
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${tickets}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `;
}

function renderPanel() {
  const t = getSelectedTab();
  if (t === 'profile') return panelWrap('Profile', `<div id="lbMount">${renderLeaderboard()}</div>`);
  if (t === 'bag') return panelWrap('Bag', `<div id="bagMount">${renderBag()}</div>`);
  return '';
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
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${renderMapView()}
      </div>

      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:flex-start;
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
          <div style="font-weight:900; line-height:1;">CBS GO</div>
        </div>

        <div style="pointer-events:auto; display:flex; flex-direction:column; align-items:stretch;">
          <div id="xpMount" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
          ">
            ${renderXpBar()}
          </div>

          <div id="stepsMount">
            ${renderStepsWidget()}
          </div>
        </div>
      </header>

      ${renderBottomNav()}
      ${renderPanel()}

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
      setSelectedTab(tab || 'map');
      mountApp();
    });
  });

  const close = document.querySelector('#cbsgoClosePanel');
  if (close) {
    close.addEventListener('click', () => {
      setSelectedTab('map');
      mountApp();
    });
  }
}

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  // ✅ Require wallet login first
  // - If no wallet yet -> create
  // - If wallet exists but not unlocked -> unlock
  if (!hasLocalWallet() || !isWalletUnlocked()) {
    app.innerHTML = `
      <div style="
        position:fixed; inset:0;
        display:flex; align-items:center; justify-content:center;
        background:#05070b;
        color:#fff;
        font-family:system-ui, sans-serif;
        padding:18px;
        text-align:center;
      ">
        <div style="max-width:520px;">
          <div style="font-weight:900; font-size:20px;">CBS GO</div>
          <div style="opacity:.8; margin-top:8px;">Preparing secure local wallet…</div>
          <div style="opacity:.65; margin-top:6px; font-size:13px;">A PIN is required to unlock.</div>
        </div>
      </div>
    `;

    // Open login modal
    setTimeout(() => openLoginModal(), 80);

    // After login, mount app for real
    if (!window.__cbsgo_login_listener_v1) {
      window.__cbsgo_login_listener_v1 = true;
      window.addEventListener('cbsgo:loginDone', () => {
        mountApp();
      });
    }
    return;
  }

  // Normal app mount
  app.innerHTML = renderAppShell();

  bindTabs();
  bindMapView();

  // auto-start steps (and first tap fallback)
  tryAutoStart();

  // steps rerender on change
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

  const t = getSelectedTab();
  if (t === 'profile') bindLeaderboardEvents();

  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', hardResetCBSGO);
  }

  // Open node -> puzzle modal (block if completed)
  if (!window.__cbsgo_openNode_listener) {
    window.__cbsgo_openNode_listener = true;

    window.addEventListener('cbsgo:openNode', (ev) => {
      const id = ev?.detail?.id;
      if (!id) return;

      // daily node opens directly
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

  // Node completion events come from puzzleModal "Solve"
  if (!window.__cbsgo_complete_listener_v1) {
    window.__cbsgo_complete_listener_v1 = true;
    window.addEventListener('cbsgo:completeNode', (ev) => {
      const id = ev?.detail?.id;
      if (!id) return;
      // state.js listens? If not, you can handle it there.
      // (You already have completeNode export in state.js, but this keeps coupling low.)
      import('../app/state.js').then(({ completeNode }) => {
        completeNode(id);
        mountApp();
      });
    });
  }
}
