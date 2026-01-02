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

import './levelUpPopup.js';

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
import { openCardsPanel } from './cardsPanel.js';

// ✅ Login + wallet weer actief
import { openLoginModal } from './loginModal.js';
import { hasWallet, isWalletUnlocked, getPublicKey } from '../app/wallet.js';

// ✅ NIEUW: Supabase helper (profile -> players tabel)
import { syncPlayerProfile } from '../app/onlinePlayers.js';

// ✅ NIEUW: positie-sync + andere spelers ophalen (oranje bolletjes)
import '../app/playerSync.js';

// ✅ NIEUW: friends helpers
import {
  loadFriendsOverview,
  sendFriendRequest,
  acceptFriendRequest
} from '../app/friends.js';

// ✅ NIEUW: scherm wakker houden tijdens spelen
import { enableWakeLock, bindWakeLockVisibilityHandler } from '../app/wakeLock.js';

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

// ---------- Profile (zonder leaderboard) + Friends ----------

function renderProfile() {
  const me = getPlayerName();
  const myAvatar = getPlayerAvatar();
  const walletPk = getPublicKey(); // lokale (game-only) wallet

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
        Your nickname and avatar are stored locally and synced to CBS-GO so friends can find you later.
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

      <!-- Friends blok -->
      <div style="
        margin-top:18px;
        padding-top:12px;
        border-top:1px solid rgba(255,255,255,.16);
      ">
        <h4 style="margin:0 0 6px 0; font-size:14px;">Friends</h4>
        <p style="margin:0 0 10px 0; font-size:11px; opacity:.75;">
          Add a friend by wallet address. Once they accept, you will see their nickname and avatar here.
        </p>

        <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
          <input
            id="friendWalletInput"
            placeholder="Wallet address"
            style="
              flex:1;
              min-width:180px;
              padding:8px 9px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.16);
              background:rgba(255,255,255,.06);
              color:#fff;
              font-size:12px;
            "
          />
          <button
            id="friendSendBtn"
            type="button"
            style="
              padding:8px 12px;
              border-radius:999px;
              border:1px solid rgba(255,255,255,.18);
              background:rgba(56,189,248,.35);
              color:#fff;
              font-size:12px;
              font-weight:600;
              cursor:pointer;
            "
          >
            Add
          </button>
        </div>

        <div id="friendsMsg" style="margin-top:6px; font-size:11px; opacity:.9;"></div>

        <div style="margin-top:12px;">
          <div style="font-size:12px; opacity:.85; margin-bottom:4px;">Friend requests</div>
          <div id="friendsIncomingList" style="font-size:11px; opacity:.85;"></div>
        </div>

        <div style="margin-top:10px;">
          <div style="font-size:12px; opacity:.85; margin-bottom:4px;">Your friends</div>
          <div id="friendsAcceptedList" style="font-size:11px; opacity:.9;"></div>
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
    // 👉 Naam wijziging ook naar Supabase pushen
    try {
      syncPlayerProfile();
    } catch (e) {
      console.warn('CBS GO: failed to sync profile after name change', e);
    }
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

        // 👉 Avatar wijziging ook naar Supabase pushen
        try {
          syncPlayerProfile();
        } catch (e) {
          console.warn('CBS GO: failed to sync profile after avatar change', e);
        }
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

      // 👉 Avatar verwijderen ook syncen
      try {
        syncPlayerProfile();
      } catch (e) {
        console.warn('CBS GO: failed to sync profile after avatar removal', e);
      }
    };
  }

  // ---------- Friends UI binding ----------

  const friendInput = document.querySelector('#friendWalletInput');
  const friendSendBtn = document.querySelector('#friendSendBtn');
  const friendsMsgEl = document.querySelector('#friendsMsg');
  const incomingListEl = document.querySelector('#friendsIncomingList');
  const acceptedListEl = document.querySelector('#friendsAcceptedList');

  const setFriendsMsg = (t) => {
    if (friendsMsgEl) friendsMsgEl.textContent = t || '';
  };

  const shortWallet = (w) => {
    if (!w) return '';
    const s = String(w);
    if (s.length <= 12) return s;
    return `${s.slice(0, 5)}…${s.slice(-4)}`;
  };

  // 🔹 shared renderer voor een vriend (avatar + nickname + wallet)
  const renderFriendRow = (fr, rightHtml = '') => {
    const nick = fr.nickname && fr.nickname.trim()
      ? fr.nickname.trim()
      : shortWallet(fr.otherWallet);

    const walletShort = shortWallet(fr.otherWallet);
    const avatarHtml = avatarCircle(fr.avatar || '', 32);

    return `
      <div style="
        margin-bottom:6px;
        padding:6px 8px;
        border-radius:12px;
        border:1px solid rgba(148,163,184,.55);
        background:rgba(15,23,42,.85);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:8px;
      ">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;">
          ${avatarHtml}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${esc(nick || 'Friend')}
            </div>
            ${
              walletShort
                ? `<div style="font-size:11px;opacity:.7;">${esc(walletShort)}</div>`
                : ''
            }
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${rightHtml || ''}
        </div>
      </div>
    `;
  };

  async function refreshFriends() {
    if (!incomingListEl || !acceptedListEl) return;
    try {
      incomingListEl.textContent = 'Loading…';
      acceptedListEl.textContent = 'Loading…';

      const data = await loadFriendsOverview();

      // Incoming requests (die jij kunt accepteren)
      if (!data.incoming.length) {
        incomingListEl.textContent = 'No incoming requests.';
      } else {
        incomingListEl.innerHTML = data.incoming
          .map((fr) => {
            const btnHtml = `
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${fr.id}"
                style="
                  padding:4px 8px;
                  border-radius:999px;
                  border:1px solid rgba(34,197,94,0.9);
                  background:rgba(22,163,74,0.95);
                  color:#fff;
                  font-size:11px;
                  cursor:pointer;
                "
              >
                Accept
              </button>
            `;
            return renderFriendRow(fr, btnHtml);
          })
          .join('');
      }

      // Accepted friends (lijst)
      if (!data.accepted.length) {
        acceptedListEl.textContent = 'No friends yet.';
      } else {
        acceptedListEl.innerHTML = data.accepted
          .map((fr) => {
            const badgeHtml = `
              <span style="
                display:inline-block;
                padding:3px 6px;
                border-radius:999px;
                border:1px solid rgba(148,163,184,0.8);
                font-size:10px;
                opacity:.85;
              ">
                ✔ Friend
              </span>
            `;
            return renderFriendRow(fr, badgeHtml);
          })
          .join('');
      }

      // ✅ id als string gebruiken (UUID), dus GEEN Number() meer
      document.querySelectorAll('.friendAcceptBtn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-friend-id');
          if (!id) return;

          setFriendsMsg('Accepting friend…');
          btn.disabled = true;
          try {
            await acceptFriendRequest(id);
            setFriendsMsg('✅ Friend added.');
            await refreshFriends();
          } catch (e) {
            console.warn(e);
            setFriendsMsg(`⛔ ${e.message || e}`);
            btn.disabled = false;
          }
        });
      });
    } catch (e) {
      console.warn('CBS GO: refreshFriends failed', e);
      incomingListEl.textContent = 'Could not load friends.';
      acceptedListEl.textContent = '';
    }
  }

  if (friendSendBtn && friendInput) {
    friendSendBtn.addEventListener('click', async () => {
      const value = friendInput.value.trim();
      if (!value) {
        setFriendsMsg('Enter a wallet address first.');
        return;
      }
      setFriendsMsg('Sending friend request…');
      friendSendBtn.disabled = true;
      try {
        await sendFriendRequest(value);
        setFriendsMsg('✅ Friend request sent.');
        friendInput.value = '';
        await refreshFriends();
      } catch (e) {
        console.warn(e);
        setFriendsMsg(`⛔ ${e.message || e}`);
      } finally {
        friendSendBtn.disabled = false;
      }
    });
  }

  // Initial load (stilletjes, zonder message als het faalt)
  refreshFriends().catch(() => {});
}

// ---------- Bag (inventory – tickets + CBS play money + wallet view + My Cards) ----------

function renderBag() {
  const tickets = getTickets();
  const cbs = getCbsCoins();
  const walletPk = getPublicKey();

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

      ${
        walletPk
          ? `
            <div style="
              margin-top:16px;
              padding:10px 12px;
              border-radius:14px;
              border:1px solid rgba(255,255,255,.16);
              background:rgba(10,12,18,.85);
            ">
              <div style="font-size:12px; opacity:.85; margin-bottom:6px;">
                CBS-GO wallet (local, game-only)
              </div>
              <div style="
                font-size:11px;
                opacity:.95;
                padding:6px 8px;
                border-radius:10px;
                border:1px solid rgba(255,255,255,.16);
                background:rgba(255,255,255,.04);
                word-break:break-all;
                font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                margin-bottom:8px;
              ">
                ${esc(walletPk)}
              </div>
              <button id="cbsgoCopyWalletBtn" type="button" style="
                padding:8px 10px;
                border-radius:999px;
                border:1px solid rgba(255,255,255,.18);
                background:rgba(90,200,255,.18);
                color:#fff;
                font-size:12px;
                font-weight:600;
                cursor:pointer;
              ">
                Copy address
              </button>
              <div id="bagMsg" style="margin-top:6px; font-size:11px; opacity:.85;"></div>
            </div>
          `
          : ''
      }

      <!-- My Cards blok in de Bag -->
      <div style="
        margin-top:16px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(148,163,184,.7);
        background:rgba(15,23,42,.9);
      ">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <div>
            <div style="font-size:13px;font-weight:600;margin-bottom:2px;">
              🃏 My Cards
            </div>
            <div style="font-size:11px;opacity:.8;max-width:260px;">
              Walking & CBS cards you collect on your journey. Later you can trade and send them to friends.
            </div>
          </div>
          <button id="cbsgoOpenCardsBtn" type="button" style="
            margin-top:6px;
            padding:7px 12px;
            border-radius:999px;
            border:1px solid rgba(251,191,36,.9);
            background:rgba(245,158,11,.95);
            color:#111827;
            font-size:12px;
            font-weight:700;
            cursor:pointer;
            white-space:nowrap;
          ">
            Open collection
          </button>
        </div>
      </div>
    </section>
  `;
}

function bindBagEvents() {
  const copyBtn = document.querySelector('#cbsgoCopyWalletBtn');
  const msgEl = document.querySelector('#bagMsg');
  const cardsBtn = document.querySelector('#cbsgoOpenCardsBtn');

  // My Cards knop → overlay met verzameling
  if (cardsBtn) {
    cardsBtn.onclick = () => {
      try {
        openCardsPanel();
      } catch (e) {
        console.warn('CBS GO: openCardsPanel failed', e);
      }
    };
  }

  const walletPk = getPublicKey();
  if (!copyBtn || !walletPk) return;

  const setMsg = (t) => {
    if (msgEl) msgEl.textContent = t || '';
  };

  copyBtn.onclick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(walletPk);
        setMsg('✅ Wallet address copied to clipboard.');
      } else {
        setMsg('📋 Copy not supported in this browser.');
      }
    } catch (e) {
      setMsg('⛔ Failed to copy address.');
    }
  };
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

      <!-- 🔔 Kleine toast voor step-rewards (XP/tickets/CBS via lopen) -->
      <div id="cbsgoToastHost" style="
        position:fixed;
        left:0;
        right:0;
        bottom:24px;
        z-index:7000;
        display:flex;
        justify-content:center;
        pointer-events:none;
      "></div>

      <!-- 🎁 Groot overlay-venster voor cadeautjes + streak + daily-goal -->
      <div id="cbsgoLootOverlayHost" style="
        position:fixed;
        inset:0;
        z-index:8000;
        pointer-events:none;
      "></div>

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
  if (t === 'bag') {
    bindBagEvents();
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

  // 📵 Scherm wakker houden tijdens het spelen
  try {
    enableWakeLock();
    bindWakeLockVisibilityHandler();
  } catch (e) {
    console.warn('CBS GO: wake lock niet beschikbaar', e);
  }

  // 🔌 Supabase: rustig op achtergrond profiel syncen (nickname + wallet_pk + avatar)
  try {
    syncPlayerProfile();
  } catch (e) {
    console.warn('CBS GO: failed to sync player profile (ignored)', e);
  }

  bindUi();
  bindMapView();

  // auto-start steps
  tryAutoStart();

  // steps rerender op change
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

  // 🔔 Step-reward toast listener (alleen bij lopen, event cbsgo:stepReward)
  let toastTimer = null;

  function showStepToast(text) {
    const host = document.querySelector('#cbsgoToastHost');
    if (!host) return;

    let box = host.querySelector('.cbsgoToastBox');
    if (!box) {
      box = document.createElement('div');
      box.className = 'cbsgoToastBox';
      box.style.pointerEvents = 'auto';
      box.style.padding = '8px 12px';
      box.style.borderRadius = '999px';
      box.style.border = '1px solid rgba(255,255,255,.25)';
      box.style.background = 'rgba(10,12,18,.88)';
      box.style.backdropFilter = 'blur(10px)';
      box.style.color = '#fff';
      box.style.fontFamily = 'system-ui,sans-serif';
      box.style.fontSize = '11px';
      box.style.boxShadow = '0 10px 30px rgba(0,0,0,.6)';
      box.style.opacity = '0';
      box.style.transform = 'translateY(10px)';
      box.style.transition = 'opacity .25s ease-out, transform .25s ease-out';
      host.appendChild(box);
    }

    box.textContent = text || '';
    box.style.opacity = '1';
    box.style.transform = 'translateY(0)';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      box.style.opacity = '0';
      box.style.transform = 'translateY(10px)';
    }, 2500);
  }

  if (!window.__cbsgo_stepReward_toast_listener) {
    window.__cbsgo_stepReward_toast_listener = true;

    window.addEventListener('cbsgo:stepReward', (ev) => {
      const d = ev?.detail || {};
      const xp = Number(d.xp || 0);
      const tickets = Number(d.tickets || 0);
      const cbs = Number(d.cbs || 0);
      if (!xp && !tickets && !cbs) return;

      const parts = [];
      if (xp) parts.push(`+${xp} XP`);
      if (tickets) parts.push(`+${tickets} ticket${tickets === 1 ? '' : 's'}`);
      if (cbs) parts.push(`+${cbs} CBS`);

      let label = 'Walking reward';
      if (d.reason === 'boost') label = 'Glow boost';
      else if (d.reason === 'treasure' || d.reason === 'treasure-rare') label = 'Treasure reward';
      else if (d.reason === 'distance') label = 'Distance reward';

      showStepToast(`${label}: ${parts.join(' · ')}`);
    });
  }

  // 🎯 Daily goal overlay (grote felicitatie in beeld)
  function showDailyGoalOverlay(detail) {
    const host = document.querySelector('#cbsgoLootOverlayHost');
    if (!host) return;

    host.innerHTML = '';

    const steps = Number(detail?.steps || 0);
    const goal = Number(detail?.goal || 0);
    const dayKey = detail?.dayKey || '';

    const wrap = document.createElement('div');
    wrap.style.position = 'fixed';
    wrap.style.inset = '0';
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.justifyContent = 'center';
    wrap.style.background = 'rgba(5,7,11,0.80)';
    wrap.style.pointerEvents = 'auto';

    const card = document.createElement('div');
    card.style.width = 'min(340px, 92vw)';
    card.style.borderRadius = '22px';
    card.style.border = '1px solid rgba(56,189,248,.85)';
    card.style.background = 'rgba(10,12,18,0.98)';
    card.style.boxShadow = '0 28px 90px rgba(0,0,0,.9)';
    card.style.padding = '20px 18px 16px 18px';
    card.style.textAlign = 'center';
    card.style.color = '#fff';
    card.style.fontFamily = 'system-ui,sans-serif';
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px) scale(0.96)';
    card.style.transition = 'opacity .25s ease-out, transform .25s ease-out';

    const progressLine = goal
      ? `${steps}/${goal} steps`
      : `${steps} steps`;

    card.innerHTML = `
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${dayKey ? ` (${dayKey})` : ''}.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#7dd3fc;
      ">
        ${progressLine}
      </div>
      <div style="font-size:11px;opacity:.75;margin-bottom:12px;">
        Every day counts towards your streak. Keep going, CBS-GO is proud of you.
      </div>
      <button type="button" id="cbsgoDailyGoalCloseBtn" style="
        padding:8px 14px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,.95);
        color:#e5e7eb;
        font-size:12px;
        font-weight:600;
        cursor:pointer;
      ">
        Nice! Continue
      </button>
    `;

    wrap.appendChild(card);
    host.appendChild(wrap);

    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    });

    const close = () => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px) scale(0.96)';
      setTimeout(() => {
        host.innerHTML = '';
      }, 250);
    };

    const btn = document.getElementById('cbsgoDailyGoalCloseBtn');
    if (btn) btn.onclick = close;

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) close();
    });
  }

  if (!window.__cbsgo_daily_goal_toast_listener) {
    window.__cbsgo_daily_goal_toast_listener = true;

    window.addEventListener('cbsgo:dailyGoalReached', (ev) => {
      showDailyGoalOverlay(ev?.detail || {});
    });
  }

  // 🎁 Loot overlay (groot in beeld als je cadeau opent, luistert naar cbsgo:lootReward)
  function showLootOverlay(detail) {
    const host = document.querySelector('#cbsgoLootOverlayHost');
    if (!host) return;

    const xp = Number(detail?.xp || 0);
    const tickets = Number(detail?.tickets || 0);
    const cbs = Number(detail?.cbs || 0);

    if (!xp && !tickets && !cbs) return;

    host.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.style.position = 'fixed';
    wrap.style.inset = '0';
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.justifyContent = 'center';
    wrap.style.background = 'rgba(5,7,11,0.75)';
    wrap.style.pointerEvents = 'auto';

    const card = document.createElement('div');
    card.style.width = 'min(320px, 90vw)';
    card.style.borderRadius = '22px';
    card.style.border = '1px solid rgba(255,255,255,.4)';
    card.style.background = 'rgba(10,12,18,0.96)';
    card.style.boxShadow = '0 24px 80px rgba(0,0,0,.85)';
    card.style.padding = '18px 18px 16px 18px';
    card.style.textAlign = 'center';
    card.style.color = '#fff';
    card.style.fontFamily = 'system-ui,sans-serif';
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px) scale(0.97)';
    card.style.transition = 'opacity .25s ease-out, transform .25s ease-out';

    const lines = [];
    if (xp) lines.push(`+${xp} XP`);
    if (tickets) lines.push(`+${tickets} ticket${tickets === 1 ? '' : 's'}`);
    if (cbs) lines.push(`+${cbs} CBS`);

    card.innerHTML = `
      <div style="font-size:32px;margin-bottom:8px;">🎁</div>
      <div style="font-weight:800;font-size:16px;margin-bottom:4px;">
        Gift opened!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You found:
      </div>
      <div style="
        font-size:14px;
        font-weight:600;
        margin-bottom:10px;
      ">
        ${esc(lines.join(' · '))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `;

    wrap.appendChild(card);
    host.appendChild(wrap);

    // animatie in
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    });

    // na ~2.5s weer weg
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px) scale(0.97)';
      setTimeout(() => {
        host.innerHTML = '';
      }, 250);
    }, 2600);
  }

  if (!window.__cbsgo_loot_overlay_listener) {
    window.__cbsgo_loot_overlay_listener = true;
    window.addEventListener('cbsgo:lootReward', (ev) => {
      showLootOverlay(ev?.detail || {});
    });
  }

  // 🧑‍🚀 7-day streak overlay (CBS reward)
  function showStreakOverlay(detail) {
    const host = document.querySelector('#cbsgoLootOverlayHost');
    if (!host) return;

    host.innerHTML = '';

    const days = Number(detail?.days || 7);
    const rewardCbs = Number(detail?.rewardCbs || 0);

    const wrap = document.createElement('div');
    wrap.style.position = 'fixed';
    wrap.style.inset = '0';
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.justifyContent = 'center';
    wrap.style.background = 'rgba(5,7,11,0.80)';
    wrap.style.pointerEvents = 'auto';

    const card = document.createElement('div');
    card.style.width = 'min(340px, 92vw)';
    card.style.borderRadius = '22px';
    card.style.border = '1px solid rgba(251,191,36,.85)';
    card.style.background = 'rgba(10,12,18,0.98)';
    card.style.boxShadow = '0 28px 90px rgba(0,0,0,.9)';
    card.style.padding = '20px 18px 16px 18px';
    card.style.textAlign = 'center';
    card.style.color = '#fff';
    card.style.fontFamily = 'system-ui,sans-serif';
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px) scale(0.96)';
    card.style.transition = 'opacity .25s ease-out, transform .25s ease-out';

    card.innerHTML = `
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${days}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${days} days in a row.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#facc15;
      ">
        +${rewardCbs} CBS (play money)
      </div>
      <div style="font-size:11px;opacity:.7;margin-bottom:12px;">
        Keep walking, keep glowing – CBS-GO is proud of you.
      </div>
      <button type="button" id="cbsgoStreakCloseBtn" style="
        padding:8px 14px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,.95);
        color:#e5e7eb;
        font-size:12px;
        font-weight:600;
        cursor:pointer;
      ">
        Nice! Continue
      </button>
    `;

    wrap.appendChild(card);
    host.appendChild(wrap);

    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    });

    const close = () => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px) scale(0.96)';
      setTimeout(() => {
        host.innerHTML = '';
      }, 250);
    };

    const btn = document.getElementById('cbsgoStreakCloseBtn');
    if (btn) btn.onclick = close;

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) close();
    });
  }

  // 🧑‍🚀 streak listener
  if (!window.__cbsgo_streak_overlay_listener) {
    window.__cbsgo_streak_overlay_listener = true;
    window.addEventListener('cbsgo:streakReward', (ev) => {
      showStreakOverlay(ev?.detail || {});
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
