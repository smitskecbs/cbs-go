// src/ui/appShell.js
// Fullscreen map shell met overlays.
//
// Layout afspraken :
// - Map is fullscreen.
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

// ✅ inventory helpers
import {
  getTickets,
  getCbsCoins,
  loadInventory,
  saveInventory,
} from '../app/inventory.js';

import { openCardsPanel } from './cardsPanel.js';

// ✅ Login + wallet weer actief
import { openLoginModal } from './loginModal.js';
import { hasWallet, isWalletUnlocked, getPublicKey } from '../app/wallet.js';

// ✅ Supabase helper (profile -> players tabel)
import { syncPlayerProfile } from '../app/onlinePlayers.js';

// ✅ positie-sync + andere spelers ophalen (oranje bolletjes)
import '../app/playerSync.js';

// ✅ friends helpers
import {
  loadFriendsOverview,
  sendFriendRequest,
  acceptFriendRequest,
} from '../app/friends.js';

// ✅ scherm wakker houden tijdens spelen
import { enableWakeLock, bindWakeLockVisibilityHandler } from '../app/wakeLock.js';

// ✅ trades (tickets + CBS + cards via Supabase)
import { sendGiftToWallet, pullIncomingGifts } from '../app/trades.js';

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

// ---------- Cards in Bag: zelfde storage als My Cards ----------

const CARDS_STORAGE_KEY = 'cbsgo_cards_v1';

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

// leest counts uit cbsgo_cards_v1 (nieuwe + oude vorm)
function loadBagCardCounts() {
  const raw = localStorage.getItem(CARDS_STORAGE_KEY);
  const data = safeParse(raw, {});

  let counts = {};

  if (data && typeof data.counts === 'object' && data.counts !== null) {
    counts = { ...data.counts };
  } else if (Array.isArray(data.cards)) {
    // oude vorm { cards: [ { id, count } ] }
    data.cards.forEach((c) => {
      if (!c || !c.id) return;
      const n = Number(c.count || 0);
      if (Number.isFinite(n) && n > 0) {
        counts[c.id] = n;
      }
    });
  }

  return counts;
}

// schrijft counts terug naar cbsgo_cards_v1
function saveBagCardCounts(counts) {
  const safe = {
    counts: { ...(counts || {}) },
  };
  try {
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(safe));
  } catch {
    // ignore
  }
}

// inventory.cards in sync brengen met My Cards storage
function syncInventoryCardsFromBag() {
  const counts = loadBagCardCounts();
  const inv = loadInventory();
  inv.cards = { ...(counts || {}) };
  saveInventory(inv);
}

// zelfde IDs als in cardsPanel.js, met korte labels voor dropdown
const BAG_CARD_DEFS = [
  { id: 'walk_sun_1', label: 'Sunny Walk' },
  { id: 'walk_rain_1', label: 'Rainy Walk' },
  { id: 'walk_night_1', label: 'Night Walk' },
  { id: 'walk_city_1', label: 'City Steps' },
  { id: 'walk_nature_1', label: 'Forest Trail' },
  { id: 'walk_beach_1', label: 'Beach Walk' },

  { id: 'cbs_heart_1', label: 'CBS Heart' },
  { id: 'cbs_chain_1', label: 'Break the Chain' },
  { id: 'cbs_fire_1', label: 'Builder Flame' },
  { id: 'cbs_go_1', label: 'CBS-GO Explorer' },

  { id: 'walk_morning_1', label: 'Morning Steps' },
  { id: 'walk_evening_1', label: 'Evening Glow' },
  { id: 'walk_park_1', label: 'Park Loop' },
  { id: 'walk_bridge_1', label: 'River Bridge' },

  { id: 'cbs_star_1', label: 'Community Star' },
  { id: 'cbs_glow_1', label: 'Glow Ticket' },
  { id: 'cbs_team_1', label: 'Builder Squad' },
  { id: 'cbs_legend_1', label: 'CBS Legend' },

  { id: 'walk_placeholder_1', label: 'Mystery Walk I' },
  { id: 'walk_placeholder_2', label: 'Mystery Walk II' },
  { id: 'cbs_placeholder_1', label: 'Mystery CBS I' },
  { id: 'cbs_placeholder_2', label: 'Mystery CBS II' },
];

// gebruikt dezelfde IDs als My Cards en telt alleen die kaarten
function getBagCardStats() {
  const counts = loadBagCardCounts();

  let cardTypes = 0;
  let cardTotal = 0;
  const sendable = [];

  for (const def of BAG_CARD_DEFS) {
    const n = Number(counts[def.id] || 0);
    if (Number.isFinite(n) && n > 0) {
      cardTypes += 1;
      cardTotal += n;
      sendable.push({ id: def.id, count: n, label: def.label });
    }
  }

  return { cardTypes, cardTotal, sendable };
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
  try {
    sessionStorage.setItem('cbsgo_selected_tab_v5', tab);
  } catch {}
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
        updatePanel();

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

  const renderFriendRow = (fr, rightHtml = '') => {
    const nick =
      fr.nickname && fr.nickname.trim()
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

      // Incoming requests
      if (!data.incoming.length) {
        incomingListEl.textContent = 'No incoming requests.';
      } else {
        incomingListEl.innerHTML = data.incoming
          .map((fr) => {
            const btnHtml = `
              <div style="display:flex;gap:6px;align-items:center;">
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${fr.otherWallet}"
                  style="
                    padding:3px 7px;
                    border-radius:999px;
                    border:1px solid rgba(148,163,184,.8);
                    background:rgba(15,23,42,.9);
                    color:#e5e7eb;
                    font-size:10px;
                    cursor:pointer;
                  "
                >
                  Copy
                </button>
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
              </div>
            `;
            return renderFriendRow(fr, btnHtml);
          })
          .join('');
      }

      // Accepted friends
      if (!data.accepted.length) {
        acceptedListEl.textContent = 'No friends yet.';
      } else {
        acceptedListEl.innerHTML = data.accepted
          .map((fr) => {
            const badgeHtml = `
              <div style="display:flex;gap:6px;align-items:center;">
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
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${fr.otherWallet}"
                  style="
                    padding:3px 7px;
                    border-radius:999px;
                    border:1px solid rgba(148,163,184,.8);
                    background:rgba(15,23,42,.9);
                    color:#e5e7eb;
                    font-size:10px;
                    cursor:pointer;
                  "
                >
                  Copy
                </button>
              </div>
            `;
            return renderFriendRow(fr, badgeHtml);
          })
          .join('');
      }

      // Accept-knoppen
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

      // Copy-knoppen
      document.querySelectorAll('.friendCopyBtn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const w = btn.getAttribute('data-wallet') || '';
          if (!w) return;
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(w);
              setFriendsMsg('✅ Friend wallet copied.');
            } else {
              setFriendsMsg('📋 Copy not supported in this browser.');
            }
          } catch (err) {
            console.warn('CBS GO: copy friend wallet failed', err);
            setFriendsMsg('⛔ Could not copy wallet address.');
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

  // Initial load
  refreshFriends().catch(() => {});
}

// ---------- Bag (inventory – tickets + CBS + wallet view + My Cards + Send to friend) ----------

function renderBag() {
  const tickets = getTickets();
  const cbs = getCbsCoins();
  const walletPk = getPublicKey();
  const { cardTypes, cardTotal, sendable } = getBagCardStats();

  const cardsLine =
    cardTotal > 0
      ? `You own ${cardTotal} cards (${cardTypes} different). You can also send some to friends as gifts.`
      : 'You don’t have any cards yet to send.';

  const hasSendableCards = sendable.length > 0;

  const cardSelectHtml = hasSendableCards
    ? `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <div style="flex:1;min-width:140px;">
          <label for="giftCardSelect" style="font-size:11px;opacity:.8;">Card (optional)</label>
          <select id="giftCardSelect" style="
            margin-top:4px;
            width:100%;
            padding:7px 9px;
            border-radius:10px;
            border:1px solid rgba(148,163,184,.7);
            background:rgba(15,23,42,.95);
            color:#fff;
            font-size:12px;
          ">
            <option value="">No card</option>
            ${sendable
              .map(
                (c) =>
                  `<option value="${esc(c.id)}">${esc(
                    c.label || c.id,
                  )} (x${c.count})</option>`,
              )
              .join('')}
          </select>
        </div>
        <div style="width:80px;">
          <label for="giftCardQtyInput" style="font-size:11px;opacity:.8;">Qty</label>
          <input id="giftCardQtyInput" type="number" min="0" step="1" placeholder="0" style="
            margin-top:4px;
            width:100%;
            padding:7px 9px;
            border-radius:10px;
            border:1px solid rgba(148,163,184,.7);
            background:rgba(15,23,42,.95);
            color:#fff;
            font-size:12px;
          " />
        </div>
      </div>
    `
    : `
      <div style="font-size:11px;opacity:.7;margin-top:4px;">
        You don’t have any cards yet to send.
      </div>
    `;

  return `
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
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
              Walking & CBS cards you collect on your journey. You can also send some to friends as gifts.
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
        <div style="font-size:11px;opacity:.8;margin-top:6px;">
          ${esc(cardsLine)}
        </div>
      </div>

      <!-- Send to friend blok -->
      <div style="
        margin-top:16px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(56,189,248,.75);
        background:rgba(15,23,42,.92);
      ">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <div>
            <div style="font-size:13px;font-weight:600;margin-bottom:2px;">
              🎁 Send a gift to a friend
            </div>
            <div style="font-size:11px;opacity:.8;max-width:260px;">
              Send tickets, CBS (play money) and optional cards to another CBS-GO wallet. Off-chain via Supabase.
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <div>
            <label for="giftWalletInput" style="font-size:11px;opacity:.8;">Friend wallet address</label>
            <input id="giftWalletInput" placeholder="Paste CBS-GO wallet address" style="
              margin-top:4px;
              width:100%;
              padding:8px 9px;
              border-radius:10px;
              border:1px solid rgba(148,163,184,.7);
              background:rgba(15,23,42,.95);
              color:#fff;
              font-size:12px;
            " />
          </div>

          <div style="margin-top:2px;">
            <label for="giftFriendSelect" style="font-size:11px;opacity:.8;">Or pick a friend</label>
            <select id="giftFriendSelect" style="
              margin-top:4px;
              width:100%;
              padding:7px 9px;
              border-radius:10px;
              border:1px solid rgba(148,163,184,.7);
              background:rgba(15,23,42,.95);
              color:#fff;
              font-size:12px;
            ">
              <option value="">-- No friend selected --</option>
            </select>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="flex:1;min-width:90px;">
              <label for="giftTicketsInput" style="font-size:11px;opacity:.8;">Tickets</label>
              <input id="giftTicketsInput" type="number" min="0" step="1" placeholder="0" style="
                margin-top:4px;
                width:100%;
                padding:7px 9px;
                border-radius:10px;
                border:1px solid rgba(148,163,184,.7);
                background:rgba(15,23,42,.95);
                color:#fff;
                font-size:12px;
              " />
            </div>

            <div style="flex:1;min-width:90px;">
              <label for="giftCbsInput" style="font-size:11px;opacity:.8;">CBS (play money)</label>
              <input id="giftCbsInput" type="number" min="0" step="1" placeholder="0" style="
                margin-top:4px;
                width:100%;
                padding:7px 9px;
                border-radius:10px;
                border:1px solid rgba(148,163,184,.7);
                background:rgba(15,23,42,.95);
                color:#fff;
                font-size:12px;
              " />
            </div>
          </div>

          ${cardSelectHtml}

          <div style="display:flex;justify-content:flex-end;margin-top:4px;">
            <button id="giftSendBtn" type="button" style="
              padding:8px 14px;
              border-radius:999px;
              border:1px solid rgba(56,189,248,.9);
              background:rgba(56,189,248,.2);
              color:#e0f2fe;
              font-size:12px;
              font-weight:700;
              cursor:pointer;
            ">
              Send gift
            </button>
          </div>

          <div id="giftMsg" style="font-size:11px;opacity:.9;margin-top:2px;"></div>
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

  // bij openen Bag: inventory.cards gelijk trekken aan My Cards
  try {
    syncInventoryCardsFromBag();
  } catch (e) {
    console.warn('CBS GO: failed to sync inventory cards from bag', e);
  }

  const walletPk = getPublicKey();

  // Send-to-friend blok
  const giftWalletInput = document.querySelector('#giftWalletInput');
  const giftFriendSelect = document.querySelector('#giftFriendSelect');
  const giftTicketsInput = document.querySelector('#giftTicketsInput');
  const giftCbsInput = document.querySelector('#giftCbsInput');
  const giftCardSelect = document.querySelector('#giftCardSelect');
  const giftCardQtyInput = document.querySelector('#giftCardQtyInput');
  const giftSendBtn = document.querySelector('#giftSendBtn');
  const giftMsgEl = document.querySelector('#giftMsg');

  const setGiftMsg = (t) => {
    if (giftMsgEl) giftMsgEl.textContent = t || '';
  };

  // friend dropdown vullen met accepted friends
  async function populateFriendSelect() {
    if (!giftFriendSelect) return;
    try {
      const data = await loadFriendsOverview();
      const opts = [];
      opts.push('<option value="">-- No friend selected --</option>');
      if (data.accepted && data.accepted.length) {
        data.accepted.forEach((fr) => {
          const wallet = fr.otherWallet || '';
          if (!wallet) return;
          const nickRaw =
            fr.nickname && fr.nickname.trim()
              ? fr.nickname.trim()
              : wallet;
          const nick = esc(nickRaw);
          const short =
            wallet.length > 12
              ? `${wallet.slice(0, 5)}…${wallet.slice(-4)}`
              : wallet;
          const label = `${nick} (${esc(short)})`;
          opts.push(
            `<option value="${esc(wallet)}">${label}</option>`,
          );
        });
      }
      giftFriendSelect.innerHTML = opts.join('');
    } catch (e) {
      console.warn('CBS GO: populateFriendSelect failed', e);
      giftFriendSelect.innerHTML =
        '<option value="">-- Friends not available --</option>';
    }
  }

  populateFriendSelect().catch(() => {});

  if (giftSendBtn && (giftWalletInput || giftFriendSelect)) {
    giftSendBtn.addEventListener('click', async () => {
      let toWallet =
        giftWalletInput && giftWalletInput.value
          ? giftWalletInput.value.trim()
          : '';

      if ((!toWallet || !toWallet.length) && giftFriendSelect) {
        const v = giftFriendSelect.value.trim();
        if (v) toWallet = v;
      }

      const ticketsVal = giftTicketsInput?.value ?? '';
      const cbsVal = giftCbsInput?.value ?? '';
      const cardId = giftCardSelect ? giftCardSelect.value.trim() : '';
      const cardQtyVal = giftCardQtyInput?.value ?? '';
      const cardQty = Number(cardQtyVal || '0');

      const tickets = Number(ticketsVal || '0');
      const cbs = Number(cbsVal || '0');

      if (!toWallet) {
        setGiftMsg('Enter a wallet address first, or pick a friend.');
        return;
      }

      if ((!tickets || tickets <= 0) && (!cbs || cbs <= 0) && !cardId) {
        setGiftMsg('Set tickets and/or CBS above 0, or choose a card.');
        return;
      }

      if (cardId && (!cardQty || cardQty <= 0)) {
        setGiftMsg('Set card quantity above 0.');
        return;
      }

      if (cardId && cardQty > 0) {
        const counts = loadBagCardCounts();
        const owned = Number(counts[cardId] || 0);
        if (!Number.isFinite(owned) || owned < cardQty) {
          setGiftMsg('Not enough of that card in your collection.');
          return;
        }
      }

      giftSendBtn.disabled = true;
      setGiftMsg('Sending gift…');

      try {
        await sendGiftToWallet(toWallet, {
          tickets,
          cbs,
          cardId: cardId || null,
          cardQty: cardId ? cardQty : 0,
        });

        // lokaal kaarten bijwerken als we een kaart versturen
        if (cardId && cardQty > 0) {
          const counts = loadBagCardCounts();
          const cur = Number(counts[cardId] || 0);
          const next = cur - cardQty;
          if (next > 0) counts[cardId] = next;
          else delete counts[cardId];
          saveBagCardCounts(counts);
          syncInventoryCardsFromBag();
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('cbsgo:bagChanged', {
                detail: { cards: { ...counts } },
              }),
            );
          }
        }

        setGiftMsg('✅ Gift sent.');
        if (giftTicketsInput) giftTicketsInput.value = '';
        if (giftCbsInput) giftCbsInput.value = '';
        if (giftCardQtyInput) giftCardQtyInput.value = '';
        if (giftCardSelect) giftCardSelect.value = '';
        if (giftFriendSelect) giftFriendSelect.value = '';

        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('cbsgo:tradePopup', {
              detail: {
                direction: 'sent',
                toWallet,
                tickets,
                cbs,
                cardId: cardId || null,
                cardQty: cardId ? cardQty : 0,
              },
            }),
          );
        }
      } catch (e) {
        console.warn(e);
        setGiftMsg(`⛔ ${e.message || 'Could not send gift.'}`);
      } finally {
        giftSendBtn.disabled = false;
      }
    });
  }

  // Copy wallet knop
  if (!copyBtn || !walletPk) {
    pullIncomingGifts().catch(() => {});
    return;
  }

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

  // Bij openen Bag ook even incoming gifts ophalen
  pullIncomingGifts().catch(() => {});
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

      <!-- Floating knoppen rechtsonder: Profile + Bag -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px;
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

      <!-- Panel-root -->
      <div id="panelRoot">
        ${renderPanel()}
      </div>

      <!-- Toast -->
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

      <!-- Loot / trade overlay -->
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
  document.querySelectorAll('[data-panel]').forEach((b) => {
    b.addEventListener('click', () => {
      const panel = b.getAttribute('data-panel');
      const current = getSelectedTab();
      if (current === panel) {
        setSelectedTab('map');
      } else {
        setSelectedTab(panel || 'map');
      }
      updatePanel();
    });
  });
}

// ---------- Gift / trade popup helper ----------

function showTradePopup(detail) {
  const host = document.querySelector('#cbsgoLootOverlayHost');
  if (!host) return;

  const {
    direction = 'received',
    fromNickname,
    fromAvatar,
    toWallet,
    tickets = 0,
    cbs = 0,
    cardId = null,
    cardQty = 0,
  } = detail || {};

  if (!tickets && !cbs && !(cardId && cardQty)) return;

  host.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style.position = 'fixed';
  wrap.style.inset = '0';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.background = 'rgba(5,7,11,0.78)';
  wrap.style.pointerEvents = 'auto';

  const card = document.createElement('div');
  card.style.width = 'min(320px, 90vw)';
  card.style.borderRadius = '22px';
  card.style.border = '1px solid rgba(56,189,248,.85)';
  card.style.background = 'rgba(10,12,18,0.98)';
  card.style.boxShadow = '0 24px 80px rgba(0,0,0,.88)';
  card.style.padding = '18px 16px 14px 16px';
  card.style.color = '#fff';
  card.style.fontFamily = 'system-ui,sans-serif';
  card.style.opacity = '0';
  card.style.transform = 'translateY(12px) scale(0.97)';
  card.style.transition = 'opacity .22s ease-out, transform .22s ease-out';

  const meName = getPlayerName();

  const title =
    direction === 'sent'
      ? 'Gift sent'
      : 'You received a gift';

  const lineParts = [];
  if (tickets) lineParts.push(`🎟️ ${tickets} ticket${tickets === 1 ? '' : 's'}`);
  if (cbs) lineParts.push(`🪙 ${cbs} CBS`);
  if (cardId && cardQty) lineParts.push(`🃏 ${cardQty} card${cardQty === 1 ? '' : 's'}`);

  const fromHtml =
    direction === 'sent'
      ? `
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${esc(meName)}</b> to <span style="opacity:.9;">${esc(toWallet || '')}</span>
        </div>
      `
      : `
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${esc(fromNickname || 'Friend')}</b>
        </div>
      `;

  const avatarHtml =
    direction === 'sent'
      ? `
        <div style="
          width:40px;height:40px;border-radius:999px;
          border:1px solid rgba(148,163,184,.5);
          background:rgba(15,23,42,.9);
          display:flex;align-items:center;justify-content:center;
          font-size:20px;
        ">
          📤
        </div>
      `
      : avatarCircle(fromAvatar || '', 40);

  card.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${avatarHtml}
      <div>
        <div style="font-size:15px;font-weight:800;">${esc(title)}</div>
        ${fromHtml}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${esc(lineParts.join(' · '))}
    </div>
    <div style="font-size:11px;opacity:.78;margin-bottom:10px;">
      Gifts are added to your Bag. Later you can also send and trade cards with friends.
    </div>
    <button type="button" id="cbsgoTradePopupCloseBtn" style="
      padding:8px 14px;
      border-radius:999px;
      border:1px solid rgba(148,163,184,.9);
      background:rgba(15,23,42,.96);
      color:#e5e7eb;
      font-size:12px;
      font-weight:600;
      cursor:pointer;
      margin-top:2px;
    ">
      Okay
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
    card.style.transform = 'translateY(12px) scale(0.97)';
    setTimeout(() => {
      host.innerHTML = '';
    }, 220);
  };

  const btn = document.getElementById('cbsgoTradePopupCloseBtn');
  if (btn) btn.onclick = close;

  wrap.addEventListener('click', (e) => {
    if (e.target === wrap) close();
  });
}

// ---------- Interne helper: hele app bootstrappen (zonder login) ----------

function bootstrapApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  // scherm wakker houden
  try {
    enableWakeLock();
    bindWakeLockVisibilityHandler();
  } catch (e) {
    console.warn('CBS GO: wake lock niet beschikbaar', e);
  }

  // Supabase profiel-sync
  try {
    syncPlayerProfile();
  } catch (e) {
    console.warn('CBS GO: failed to sync player profile (ignored)', e);
  }

  bindUi();
  bindMapView();

  tryAutoStart();

  // steps widget rerender
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

  // XP-balk
  if (!window.__cbsgo_xp_rerender_listener) {
    window.__cbsgo_xp_rerender_listener = true;
    const rerenderXp = () => {
      const mount = document.querySelector('#xpMount');
      if (!mount) return;
      mount.innerHTML = renderXpBar();
    };
    ['cbsgo:xpChanged', 'cbsgo:levelChanged', 'cbsgo:stepsChanged'].forEach(
      (evtName) => {
        window.addEventListener(evtName, rerenderXp);
      },
    );
  }

  // Bag/inventory rerender bij loot-verandering
  if (!window.__cbsgo_inventory_rerender_listener) {
    window.__cbsgo_inventory_rerender_listener = true;
    const rerenderBagIfOpen = () => {
      if (getSelectedTab() === 'bag') {
        updatePanel();
      }
    };
    ['cbsgo:inventoryChanged', 'cbsgo:bagChanged'].forEach((evtName) => {
      window.addEventListener(evtName, rerenderBagIfOpen);
    });
  }

  // Step-reward toast
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
      box.style.transition =
        'opacity .25s ease-out, transform .25s ease-out';
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
      else if (d.reason === 'treasure' || d.reason === 'treasure-rare')
        label = 'Treasure reward';
      else if (d.reason === 'distance') label = 'Distance reward';

      showStepToast(`${label}: ${parts.join(' · ')}`);
    });
  }

  // Daily goal overlay
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
    card.style.transition =
      'opacity .25s ease-out, transform .25s ease-out';

    const progressLine = goal ? `${steps}/${goal} steps` : `${steps} steps`;

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

  // Gift loot overlay (walk gifts)
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
    card.style.transition =
      'opacity .25s ease-out, transform .25s ease-out';

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

    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    });

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

  // Streak overlay
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
    card.style.transition =
      'opacity .25s ease-out, transform .25s ease-out';

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

  if (!window.__cbsgo_streak_overlay_listener) {
    window.__cbsgo_streak_overlay_listener = true;
    window.addEventListener('cbsgo:streakReward', (ev) => {
      showStreakOverlay(ev?.detail || {});
    });
  }

  // Trade popup events
  if (!window.__cbsgo_trade_popup_listener) {
    window.__cbsgo_trade_popup_listener = true;
    window.addEventListener('cbsgo:tradePopup', (ev) => {
      showTradePopup(ev?.detail || {});
    });
  }

  // Bridge + lokale card-update bij ontvangen gifts
  if (!window.__cbsgo_friendGift_popup_bridge) {
    window.__cbsgo_friendGift_popup_bridge = true;
    window.addEventListener('cbsgo:friendGiftReceived', (ev) => {
      const d = ev?.detail || {};

      // kaarten lokaal bijwerken
      const cardId = d.cardId || null;
      const cardQty = Number(d.cardQty || 0);
      if (cardId && cardQty > 0) {
        const counts = loadBagCardCounts();
        const cur = Number(counts[cardId] || 0);
        const next = cur + cardQty;
        counts[cardId] = next;
        saveBagCardCounts(counts);
        syncInventoryCardsFromBag();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('cbsgo:bagChanged', {
              detail: { cards: { ...counts } },
            }),
          );
        }
      }

      showTradePopup({
        direction: 'received',
        fromNickname: d.senderNickname || '',
        fromAvatar: d.senderAvatar || '',
        toWallet: d.toWallet || '',
        tickets: d.tickets || 0,
        cbs: d.cbs || 0,
        cardId: d.cardId || null,
        cardQty: d.cardQty || 0,
      });
    });
  }

  // Init panel
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

      const node = nodes.find((n) => n.id === id);
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
        mountApp();
      });
    });
  }

  // Bij app-start alvast incoming gifts ophalen
  pullIncomingGifts().catch(() => {});
}

// ---------- Mount + login/PIN flow ----------

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  if (hasWallet() && isWalletUnlocked()) {
    bootstrapApp();
    return;
  }

  openLoginModal();

  const onLoginDone = () => {
    window.removeEventListener('cbsgo:loginDone', onLoginDone);
    bootstrapApp();
  };

  window.addEventListener('cbsgo:loginDone', onLoginDone);
}
