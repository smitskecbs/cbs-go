
// src/ui/appShell.js 

// Fullscreen map shell met overlays.
//
// Layout afspraken :
// - Map is fullscreen.
// - Rechtsboven: alleen XP + stappen.
// - Rechtsonder: 2 ronde knoppen op de kaart (Profile & Bag), naast elkaar, net boven GPS-tekst.
// - Geen extra weather-dot linksonder (jouw eigen weer bovenin blijft leidend).
// - Geen leaderboard / competitie-focus.

import { supabase } from '../app/supabaseClient.js';
import { applyRemoteProfileToLocal } from '../app/applyRemoteProfile.js';

import './levelUpPopup.js';

import { nodes } from '../data/nodes.js';
import { openPuzzleModal } from './puzzleModal.js';

import { renderXpBar } from './xpBar.js';
// import { renderStepsWidget, bindStepsWidget } from './stepsWidget.js'; // UI uit

import { tryAutoStart } from '../app/steps.js';
import { isDev, hardResetCBSGO } from '../app/devTools.js';

import {
  getPlayerName,
  setPlayerName,
  getPlayerAvatar,
  setPlayerAvatar,
  clearPlayerAvatar,
} from '../app/leaderboard.js'; // alleen voor lokale profile-storage

// ✅ MapView: namespace import voorkomt build errors als exports ooit anders heten
import * as mapView from './mapView.js';

// ✅ Inventory: namespace import voorkomt build errors als loadInventory/export mismatch
import * as inventory from '../app/inventory.js';

import { openCardsPanel } from './cardsPanel.js';

// ✅ Login gate
import { openLoginModal } from './loginModal.js';

// ✅ Supabase helper (profile -> players tabel)
import { syncPlayerProfile } from '../app/onlinePlayers.js';

// ✅ Supabase remote game profile (backup naar game_profiles)
import { saveRemoteProfile } from '../app/remoteProfile.js';

// ✅ positie-sync + andere spelers ophalen (oranje bolletjes)
import '../app/playerSync.js';

// ✅ friends helpers
import {
  loadFriendsOverview,
  sendFriendRequest,
  acceptFriendRequest,
  getMyFriendCode,
} from '../app/friends.js';

// ✅ scherm wakker houden tijdens spelen
import { enableWakeLock, bindWakeLockVisibilityHandler } from '../app/wakeLock.js';

// ✅ trades (tickets + CBS + cards via Supabase)
import { sendGiftToWallet, pullIncomingGifts } from '../app/trades.js';

// ✅ on-chain SOL send helper
import { sendSolFromLocalWallet } from '../app/solanaOnchainSend.js';

// ✅ on-chain SPL (CBS) send helper
import { sendSplFromLocalWallet } from '../app/solanaSendSpl.js';

// ✅ On-chain token overview (SOL + SPL)
import { fetchTokenOverview } from '../app/solanaTokenOverview.js';

// ✅ state helpers
import { isNodeCompleted, getXp, getLevel } from '../app/state.js';

// ✅ auth wallet bootstrap (side effects / global)
import '../app/bootstrapAuthWallet.js';

import { getLocalPublicKey, getLocalSecretKeyBase58 } from '../app/solanaLocalWallet.js';
import { createWallet } from '../app/wallet.js';

// ----------------- safe wrappers (inventory) -----------------
const getTickets =
  typeof inventory.getTickets === 'function'
    ? inventory.getTickets
    : () => Number(inventory?.state?.tickets || 0);

const getCbsCoins =
  typeof inventory.getCbsCoins === 'function'
    ? inventory.getCbsCoins
    : () => Number(inventory?.state?.cbs || 0);

const loadInventory =
  typeof inventory.loadInventory === 'function'
    ? inventory.loadInventory
    : () => ({ tickets: getTickets(), cbs: getCbsCoins(), cards: {} });

const saveInventory =
  typeof inventory.saveInventory === 'function'
    ? inventory.saveInventory
    : (_inv) => {};

// ----------------- safe wrappers (mapView) -----------------
const renderMapView =
  typeof mapView.renderMapView === 'function'
    ? mapView.renderMapView
    : () =>
        `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;opacity:.6;">MapView missing export</div>`;

const bindMapView = typeof mapView.bindMapView === 'function' ? mapView.bindMapView : () => {};

// ✅ Expose wallet helpers as globals (legacy/debug) — enkel 1x
if (typeof window !== 'undefined') {
  window.getLocalSecretKeyBase58 = () => {
    try {
      return getLocalSecretKeyBase58() || '';
    } catch {
      return '';
    }
  };
  window.getLocalPublicKey = () => {
    try {
      return getLocalPublicKey() || '';
    } catch {
      return '';
    }
  };
}

// ✅ Compat wrapper: never crash (works with import OR legacy globals)
function getLocalPublicKeySafe() {
  try {
    if (typeof getLocalPublicKey === 'function') return getLocalPublicKey() || '';
    if (typeof window !== 'undefined' && typeof window.getLocalPublicKey === 'function') {
      return window.getLocalPublicKey() || '';
    }
    const v = globalThis?.cbsgoWalletPublicKey || null;
    return v ? String(v) : '';
  } catch {
    return '';
  }
}

// ----------------- Supabase user binding -----------------
async function ensureSupabaseUserBound() {
  try {
    const { data: ures } = await supabase.auth.getUser();
    const user = ures?.user;
    if (!user) return null;

    const { data: row, error } = await supabase
      .from('player_state')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.warn('[CBSGO] player_state lookup failed', error);
      return user;
    }

    if (row) {
      window.dispatchEvent(new CustomEvent('cbsgo:playerBound', { detail: { user_id: user.id } }));
      return user;
    }

    const { error: insErr } = await supabase.from('player_state').insert([{ user_id: user.id }]);
    if (insErr) console.warn('[CBSGO] player_state insert failed', insErr);
    else window.dispatchEvent(new CustomEvent('cbsgo:playerBound', { detail: { user_id: user.id } }));

    return user;
  } catch (e) {
    console.warn('[CBSGO] ensureSupabaseUserBound failed', e);
    return null;
  }
}

// ----------------- helpers -----------------
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

// ---------- CBS token info (SPL) ----------
const CBS_MINT = 'B9z8cEWFmc7LvQtjKsaLoKqW5MJmGRCWqs1DPKupCfkk';
const CBS_DECIMALS = 9;

// ---------- Common SPL tokens ----------
const BONK_MINT = 'DezXAZ8z7PnrnRJvxUuG1spHxsFJqts7qF4N8ko9rEz';
const BONK_DECIMALS = 5;

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const USDC_DECIMALS = 6;

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
    data.cards.forEach((c) => {
      if (!c || !c.id) return;
      const n = Number(c.count || 0);
      if (Number.isFinite(n) && n > 0) counts[c.id] = n;
    });
  }
  return counts;
}

// schrijft counts terug naar cbsgo_cards_v1
function saveBagCardCounts(counts) {
  const safe = { counts: { ...(counts || {}) } };
  try {
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(safe));
  } catch {}
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

// Tab state
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

// ---------- Profile (zonder wallet blok) + Friends ----------
function renderProfile() {
  const me = getPlayerName();
  const myAvatar = getPlayerAvatar();

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
          Friends are linked to your <b>email account</b> (Supabase user). Your wallet can change later, but your friends stay.
        </p>

        <!-- My Friend Code -->
        <div style="
          margin:10px 0 12px 0;
          padding:10px 10px;
          border-radius:14px;
          border:1px solid rgba(56,189,248,.55);
          background:rgba(15,23,42,.92);
        ">
          <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
            Your Friend Code (share this)
          </div>

          <div id="myFriendCodeValue" style="
            font-size:11px;
            opacity:.95;
            padding:6px 8px;
            border-radius:10px;
            border:1px solid rgba(56,189,248,.45);
            background:rgba(10,12,18,.85);
            word-break:break-all;
            font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
            margin-bottom:8px;
          ">Loading…</div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button id="myFriendCodeCopyBtn" type="button" style="
              padding:7px 11px;
              border-radius:999px;
              border:1px solid rgba(56,189,248,.9);
              background:rgba(56,189,248,.18);
              color:#e0f2fe;
              font-size:12px;
              font-weight:700;
              cursor:pointer;
            ">Copy Friend Code</button>

            <button id="myFriendCodeRefreshBtn" type="button" style="
              padding:7px 11px;
              border-radius:999px;
              border:1px solid rgba(255,255,255,.18);
              background:rgba(255,255,255,.08);
              color:#fff;
              font-size:12px;
              font-weight:600;
              cursor:pointer;
            ">Refresh</button>
          </div>

          <div id="myFriendCodeMsg" style="margin-top:6px;font-size:11px;opacity:.85;"></div>
        </div>

        <!-- Add friend -->
        <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
          <input
            id="friendWalletInput"
            placeholder="Friend Code (CBS-...) or wallet address"
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
      syncRemoteProfileSafe('name-change');
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
          syncRemoteProfileSafe('avatar-change');
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
        syncRemoteProfileSafe('avatar-remove');
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

  // ---------- My Friend Code (email identity) ----------
  const myCodeEl = document.querySelector('#myFriendCodeValue');
  const myCodeCopyBtn = document.querySelector('#myFriendCodeCopyBtn');
  const myCodeRefreshBtn = document.querySelector('#myFriendCodeRefreshBtn');
  const myCodeMsgEl = document.querySelector('#myFriendCodeMsg');

  const setMyCodeMsg = (t) => {
    if (myCodeMsgEl) myCodeMsgEl.textContent = t || '';
  };

  let cachedFriendCode = '';

  async function refreshMyFriendCode() {
    if (!myCodeEl) return;
    myCodeEl.textContent = 'Loading…';
    setMyCodeMsg('');
    try {
      const code = await getMyFriendCode();
      cachedFriendCode = String(code || '');
      myCodeEl.textContent = cachedFriendCode || 'Not available';
      if (!cachedFriendCode) setMyCodeMsg('⛔ Friend Code not available. Are you logged in?');
    } catch (e) {
      console.warn('CBS GO: getMyFriendCode failed', e);
      myCodeEl.textContent = 'Not available';
      setMyCodeMsg('⛔ Could not load Friend Code (login or permissions).');
    }
  }

  if (myCodeCopyBtn) {
    myCodeCopyBtn.addEventListener('click', async () => {
      try {
        if (!cachedFriendCode) await refreshMyFriendCode();
        if (!cachedFriendCode) return setMyCodeMsg('⛔ No Friend Code to copy.');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(cachedFriendCode);
          setMyCodeMsg('✅ Friend Code copied.');
        } else {
          setMyCodeMsg('📋 Copy not supported in this browser.');
        }
      } catch (e) {
        console.warn(e);
        setMyCodeMsg('⛔ Could not copy Friend Code.');
      }
    });
  }

  if (myCodeRefreshBtn) {
    myCodeRefreshBtn.addEventListener('click', () => {
      refreshMyFriendCode().catch(() => {});
    });
  }

  // Auto-load once
  refreshMyFriendCode().catch(() => {});

  const setFriendsMsg = (t) => {
    if (friendsMsgEl) friendsMsgEl.textContent = t || '';
  };

  const shortWallet = (w) => {
    if (!w) return '';
    const s = String(w);
    if (s.length <= 12) return s;
    return `${s.slice(0, 5)}…${s.slice(-4)}`;
  };

  const friendCodeFromUid = (uid) => (uid ? `CBS-${uid}` : '');

  const pick = (obj, keys, fallback = '') => {
    for (const k of keys) {
      const v = obj?.[k];
      if (v !== undefined && v !== null && String(v).trim() !== '') return v;
    }
    return fallback;
  };

  const renderFriendRow = (fr, rightHtml = '') => {
    const otherWallet = String(
      pick(fr, ['otherWallet', 'other_wallet', 'wallet_pk', 'wallet', 'friend_wallet'], '')
    ).trim();

    const nicknameRaw = String(
      pick(fr, ['nickname', 'otherNickname', 'other_nickname', 'name', 'display_name'], '')
    ).trim();

    const avatarRaw = String(
      pick(fr, ['avatar', 'otherAvatar', 'other_avatar', 'pf', 'photo'], '')
    );

    // ✅ fallback: show friend code if wallet missing
    const uid = String(pick(fr, ['otherUserId', 'other_user_id', 'uid', 'user_id'], '')).trim();
    const fallbackCode = friendCodeFromUid(uid);

    const nick = nicknameRaw
      ? nicknameRaw
      : otherWallet
        ? shortWallet(otherWallet)
        : fallbackCode
          ? 'Friend (email)'
          : 'Friend';

    const walletLine = otherWallet ? shortWallet(otherWallet) : (fallbackCode ? fallbackCode : '');

    const avatarHtml = avatarCircle(avatarRaw || '', 32);

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
            ${walletLine ? `<div style="font-size:11px;opacity:.7;">${esc(walletLine)}</div>` : ''}
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
            const uid = fr.otherUserId || '';
            const code = uid ? `CBS-${uid}` : '';
            const btnHtml = `
              <div style="display:flex;gap:6px;align-items:center;">
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${esc(fr.otherWallet || '')}"
                  data-code="${esc(code)}"
                  style="
                    padding:3px 7px;
                    border-radius:999px;
                    border:1px solid rgba(148,163,184,.8);
                    background:rgba(15,23,42,.9);
                    color:#e5e7eb;
                    font-size:10px;
                    cursor:pointer;
                  "
                >Copy</button>
                <button
                  type="button"
                  class="friendAcceptBtn"
                  data-friend-id="${esc(fr.id)}"
                  style="
                    padding:4px 8px;
                    border-radius:999px;
                    border:1px solid rgba(34,197,94,0.9);
                    background:rgba(22,163,74,0.95);
                    color:#fff;
                    font-size:11px;
                    cursor:pointer;
                  "
                >Accept</button>
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
            const uid = fr.otherUserId || '';
            const code = uid ? `CBS-${uid}` : '';
            const btnHtml = `
              <div style="display:flex;gap:6px;align-items:center;">
                <span style="
                  display:inline-block;
                  padding:3px 6px;
                  border-radius:999px;
                  border:1px solid rgba(148,163,184,0.8);
                  font-size:10px;
                  opacity:.85;
                ">✔ Friend</span>
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${esc(fr.otherWallet || '')}"
                  data-code="${esc(code)}"
                  style="
                    padding:3px 7px;
                    border-radius:999px;
                    border:1px solid rgba(148,163,184,.8);
                    background:rgba(15,23,42,.9);
                    color:#e5e7eb;
                    font-size:10px;
                    cursor:pointer;
                  "
                >Copy</button>
              </div>
            `;
            return renderFriendRow(fr, btnHtml);
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

      // Copy-knoppen (wallet als die er is, anders Friend Code)
      document.querySelectorAll('.friendCopyBtn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const w = (btn.getAttribute('data-wallet') || '').trim();
          const code = (btn.getAttribute('data-code') || '').trim();
          const value = w || code;
          if (!value) return;

          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(value);
              setFriendsMsg(w ? '✅ Friend wallet copied.' : '✅ Friend Code copied.');
            } else {
              setFriendsMsg('📋 Copy not supported in this browser.');
            }
          } catch (err) {
            console.warn('CBS GO: copy friend failed', err);
            setFriendsMsg('⛔ Could not copy.');
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
        setFriendsMsg('Enter a Friend Code or wallet first.');
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

  refreshFriends().catch(() => {});
}

// ---------- Bag ----------
function renderBag() {
  const tickets = getTickets();
  const cbs = getCbsCoins();

  // ✅ één adres overal: de echte Solana/SPL wallet
  const solPk = getLocalPublicKeySafe();

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
              .map((c) => `<option value="${esc(c.id)}">${esc(c.label || c.id)} (x${c.count})</option>`)
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

      <div style="display:flex;flex-wrap:wrap;gap:10px;">
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
        solPk
          ? `
            <div style="
              margin-top:16px;
              padding:10px 12px;
              border-radius:14px;
              border:1px solid rgba(56,189,248,.85);
              background:rgba(10,12,18,.92);
            ">
              <div style="font-size:12px; opacity:.9; margin-bottom:6px;">
                Solana wallet address (SPL wallet)
              </div>
              <div style="
                font-size:11px;
                opacity:.95;
                padding:6px 8px;
                border-radius:10px;
                border:1px solid rgba(56,189,248,.5);
                background:rgba(15,23,42,.95);
                word-break:break-all;
                font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                margin-bottom:8px;
              ">${esc(solPk)}</div>

              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                <button id="cbsgoCopySolWalletBtn" type="button" style="
                  padding:8px 10px;
                  border-radius:999px;
                  border:1px solid rgba(255,255,255,.18);
                  background:rgba(90,200,255,.18);
                  color:#fff;
                  font-size:12px;
                  font-weight:600;
                  cursor:pointer;
                ">Copy address</button>

                <button id="cbsgoOpenSolanaWalletBtn" type="button" style="
                  padding:8px 10px;
                  border-radius:999px;
                  border:1px solid rgba(56,189,248,.9);
                  background:rgba(56,189,248,.18);
                  color:#e0f2fe;
                  font-size:12px;
                  font-weight:700;
                  cursor:pointer;
                ">Open wallet</button>
              </div>

              <div id="bagMsg" style="margin-top:6px; font-size:11px; opacity:.85;"></div>
            </div>
          `
          : `
            <div style="
              margin-top:16px;
              padding:10px 12px;
              border-radius:14px;
              border:1px solid rgba(239,68,68,.65);
              background:rgba(24,24,27,.9);
              font-size:12px;
              opacity:.9;
            ">
              ⛔ No local Solana wallet found yet. Finish login (PIN) to unlock or create your wallet.
            </div>
          `
      }
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
            <input id="giftWalletInput" placeholder="Paste wallet address" style="
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
  const msgEl = document.querySelector('#bagMsg');
  const cardsBtn = document.querySelector('#cbsgoOpenCardsBtn');

  const setMsg = (t) => {
    if (msgEl) msgEl.textContent = t || '';
  };

  if (cardsBtn) {
    cardsBtn.onclick = () => {
      try {
        openCardsPanel();
      } catch (e) {
        console.warn('CBS GO: openCardsPanel failed', e);
      }
    };
  }

  try {
    syncInventoryCardsFromBag();
  } catch (e) {
    console.warn('CBS GO: failed to sync inventory cards from bag', e);
  }

  // ✅ Copy Solana address
  const copySolBtn = document.querySelector('#cbsgoCopySolWalletBtn');
  if (copySolBtn) {
    copySolBtn.onclick = async () => {
      try {
        const pk = getLocalPublicKeySafe();
        if (!pk) return setMsg('⛔ No wallet address found.');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(pk);
          setMsg('✅ Address copied to clipboard.');
        } else {
          setMsg('📋 Copy not supported in this browser.');
        }
      } catch (e) {
        console.warn('CBS GO: copy sol wallet failed', e);
        setMsg('⛔ Failed to copy address.');
      }
    };
  }

  // ✅ Open wallet page
  const openWalletBtn = document.querySelector('#cbsgoOpenSolanaWalletBtn');
  if (openWalletBtn) {
    openWalletBtn.onclick = () => {
      setSelectedTab('wallet');
      updatePanel();
    };
  }

  // ---- Gift sending ----
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
          const nickRaw = fr.nickname && fr.nickname.trim() ? fr.nickname.trim() : wallet;
          const nick = esc(nickRaw);
          const short = wallet.length > 12 ? `${wallet.slice(0, 5)}…${wallet.slice(-4)}` : wallet;
          const label = `${nick} (${esc(short)})`;
          opts.push(`<option value="${esc(wallet)}">${label}</option>`);
        });
      }
      giftFriendSelect.innerHTML = opts.join('');
    } catch (e) {
      console.warn('CBS GO: populateFriendSelect failed', e);
      giftFriendSelect.innerHTML = '<option value="">-- Friends not available --</option>';
    }
  }

  populateFriendSelect().catch(() => {});

  if (giftSendBtn && (giftWalletInput || giftFriendSelect)) {
    giftSendBtn.addEventListener('click', async () => {
      let toWallet = giftWalletInput && giftWalletInput.value ? giftWalletInput.value.trim() : '';

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

        if (cardId && cardQty > 0) {
          const counts = loadBagCardCounts();
          const cur = Number(counts[cardId] || 0);
          const next = cur - cardQty;
          if (next > 0) counts[cardId] = next;
          else delete counts[cardId];
          saveBagCardCounts(counts);
          syncInventoryCardsFromBag();
          window.dispatchEvent(new CustomEvent('cbsgo:bagChanged', { detail: { cards: { ...counts } } }));
        }

        setGiftMsg('✅ Gift sent.');
        if (giftTicketsInput) giftTicketsInput.value = '';
        if (giftCbsInput) giftCbsInput.value = '';
        if (giftCardQtyInput) giftCardQtyInput.value = '';
        if (giftCardSelect) giftCardSelect.value = '';
        if (giftFriendSelect) giftFriendSelect.value = '';

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
      } catch (e) {
        console.warn(e);
        setGiftMsg(`⛔ ${e.message || 'Could not send gift.'}`);
      } finally {
        giftSendBtn.disabled = false;
      }
    });
  }

  pullIncomingGifts().catch(() => {});
}


// ---------- Solana Wallet pagina met Token Overview (UI v1) ----------
function renderWalletPanel() {
  const localSolPk = getLocalPublicKeySafe();

  if (!localSolPk) {
    return `
      <section style="
        padding:14px;
        border-radius:18px;
        border:1px solid rgba(239,68,68,.65);
        background:rgba(24,24,27,.9);
      ">
        <h3 style="margin:0 0 8px 0;font-size:16px;">Solana Wallet</h3>
        <p style="margin:0;font-size:12px;opacity:.8;">
          No local Solana wallet found. Finish login or create a wallet.
        </p>
      </section>
    `;
  }

  const maskedDots = '•'.repeat(44);

  // Small helpers for consistent cards
  const cardStyle = `
    padding:12px 12px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(10,12,18,.65);
    backdrop-filter: blur(10px);
  `;

  const titleRow = (icon, title, desc) => `
    <div style="display:flex;gap:10px;align-items:flex-start;">
      <div style="
        width:34px;height:34px;border-radius:12px;
        border:1px solid rgba(56,189,248,.35);
        background:rgba(56,189,248,.10);
        display:flex;align-items:center;justify-content:center;
        font-size:18px;
      ">${icon}</div>
      <div style="min-width:0;">
        <div style="font-size:13px;font-weight:800;margin-bottom:2px;">${esc(title)}</div>
        <div style="font-size:11px;opacity:.78;line-height:1.35;">${esc(desc)}</div>
      </div>
    </div>
  `;

  const pillBtn = (id, label, primary = false) => `
    <button id="${id}" type="button" style="
      padding:8px 12px;
      border-radius:999px;
      border:1px solid ${primary ? 'rgba(56,189,248,.9)' : 'rgba(255,255,255,.18)'};
      background:${primary ? 'rgba(56,189,248,.18)' : 'rgba(255,255,255,.08)'};
      color:${primary ? '#e0f2fe' : '#fff'};
      font-size:12px;
      font-weight:${primary ? '800' : '600'};
      cursor:pointer;
      white-space:nowrap;
    ">${esc(label)}</button>
  `;

  return `
    <section style="
      padding:14px;
      border-radius:20px;
      border:1px solid rgba(56,189,248,.65);
      background:rgba(8,10,16,.78);
      backdrop-filter: blur(12px);
    ">
      <!-- Header -->
      <div style="
        display:flex;align-items:flex-start;justify-content:space-between;
        gap:10px;flex-wrap:wrap;
        margin-bottom:12px;
      ">
        <div>
          <div style="font-size:16px;font-weight:900;letter-spacing:.2px;">
            👛 Wallet
          </div>
          <div style="font-size:11px;opacity:.78;max-width:520px;line-height:1.35;">
            Your CBS-GO wallet is stored locally, and backed up encrypted via your Email + PIN (vault).
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${pillBtn('walletCopyAddressBtn', 'Copy address', true)}
          ${pillBtn('walletRefreshOverviewBtn', 'Refresh balances', false)}
        </div>
      </div>

      <!-- Receive card -->
      <div style="${cardStyle}; border-color: rgba(56,189,248,.45);">
        ${titleRow('📥', 'Receive', 'Use this address to receive SOL or SPL tokens (CBS/BONK/USDC).')}
        <div style="
          margin-top:10px;
          font-size:11px;
          opacity:.95;
          padding:8px 10px;
          border-radius:12px;
          border:1px solid rgba(56,189,248,.45);
          background:rgba(15,23,42,.95);
          word-break:break-all;
          font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
        ">${esc(localSolPk)}</div>

        <div id="walletReceiveMsg" style="margin-top:8px;font-size:11px;opacity:.82;">
          Tip: you can paste this into Phantom / Solflare when you want to view the wallet there later.
        </div>
      </div>

      <!-- Send card -->
      <div style="${cardStyle}; margin-top:12px;">
        ${titleRow('📤', 'Send', 'Send SOL or SPL tokens from your local wallet on-chain.')}
        <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
          <div>
            <label for="walletSendToInput" style="font-size:11px;opacity:.8;">To address</label>
            <input id="walletSendToInput" placeholder="Paste Solana address" style="
              margin-top:4px;
              width:100%;
              padding:9px 10px;
              border-radius:12px;
              border:1px solid rgba(148,163,184,.55);
              background:rgba(15,23,42,1);
              color:#fff;
              font-size:12px;
            " />
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="flex:1;min-width:120px;">
              <label for="walletSendAmountInput" style="font-size:11px;opacity:.8;">Amount</label>
              <input id="walletSendAmountInput" type="number" min="0" step="0.000000001" placeholder="0.01" style="
                margin-top:4px;
                width:100%;
                padding:9px 10px;
                border-radius:12px;
                border:1px solid rgba(148,163,184,.55);
                background:rgba(15,23,42,1);
                color:#fff;
                font-size:12px;
              " />
            </div>

            <div style="width:160px;">
              <label for="walletSendTokenSelect" style="font-size:11px;opacity:.8;">Token</label>
              <select id="walletSendTokenSelect" style="
                margin-top:4px;
                width:100%;
                padding:9px 10px;
                border-radius:12px;
                border:1px solid rgba(148,163,184,.55);
                background:rgba(15,23,42,1);
                color:#fff;
                font-size:12px;
              ">
                <option value="SOL">SOL</option>
                <option value="CBS">CBS</option>
                <option value="BONK">BONK</option>
                <option value="USDC">USDC</option>
                <option value="SPL">Other SPL (mint)</option>
              </select>
            </div>
          </div>

          <div id="walletCustomSplWrap" style="display:none; margin-top:2px;">
            <label style="font-size:11px;opacity:.8;">SPL Mint address</label>
            <input id="walletSplMintInput" placeholder="Mint address" style="
              margin-top:4px;
              width:100%;
              padding:9px 10px;
              border-radius:12px;
              border:1px solid rgba(148,163,184,.55);
              background:rgba(15,23,42,1);
              color:#fff;
              font-size:12px;
            " />

            <label style="font-size:11px;opacity:.8; margin-top:6px;">Token decimals</label>
            <input id="walletSplDecimalsInput" type="number" min="0" max="12" placeholder="e.g. 6" style="
              margin-top:4px;
              width:100%;
              padding:9px 10px;
              border-radius:12px;
              border:1px solid rgba(148,163,184,.55);
              background:rgba(15,23,42,1);
              color:#fff;
              font-size:12px;
            " />
          </div>

          <div style="display:flex;justify-content:flex-end;">
            <button id="walletSendBtn" type="button" style="
              margin-top:2px;
              padding:9px 14px;
              border-radius:999px;
              border:1px solid rgba(56,189,248,.9);
              background:rgba(56,189,248,.2);
              color:#e0f2fe;
              font-size:12px;
              font-weight:800;
              cursor:pointer;
            ">Send</button>
          </div>

          <!-- ✅ FIX: eigen message element voor SEND (niet dezelfde id als receive) -->
          <div id="walletSendMsg" style="font-size:11px;opacity:.82;">
            Select SOL or an SPL token to send on-chain. For "Other SPL (mint)" fill in mint + decimals.
          </div>
        </div>
      </div>

      <!-- Overview card -->
      <div style="${cardStyle}; margin-top:12px; border-color: rgba(74,222,128,.40);">
        ${titleRow('💹', 'Token overview', 'Live on-chain balances for this wallet.')}
        <div id="walletOverviewStatus" style="font-size:11px;opacity:.8;margin-top:8px;">
          Loading balances…
        </div>
        <div id="walletOverviewTotals" style="font-size:12px;margin-top:6px;"></div>

        <div style="margin-top:10px;overflow-x:auto;">
          <table style="
            width:100%;
            border-collapse:collapse;
            font-size:11px;
            min-width:260px;
          ">
            <thead>
              <tr>
                <th style="text-align:left;padding:6px 4px;border-bottom:1px solid rgba(148,163,184,.45);opacity:.8;">Token</th>
                <th style="text-align:right;padding:6px 4px;border-bottom:1px solid rgba(148,163,184,.45);opacity:.8;">Balance</th>
                <th style="text-align:left;padding:6px 4px;border-bottom:1px solid rgba(148,163,184,.45);opacity:.8;">Name</th>
              </tr>
            </thead>
            <tbody id="walletOverviewTableBody">
              <tr>
                <td style="padding:6px 4px;opacity:.7;" colspan="3">
                  Fetching SPL token accounts&hellip;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Private key card -->
      <div style="${cardStyle}; margin-top:12px; border-color: rgba(239,68,68,.55); background:rgba(24,24,27,.92);">
        ${titleRow('⚠️', 'Private key (advanced)', 'Never share this. Anyone with it can move your funds.')}
        <div id="walletSecretMasked" style="
          margin-top:10px;
          font-size:12px;
          padding:8px 10px;
          border-radius:12px;
          border:1px dashed rgba(248,250,252,.35);
          background:rgba(15,23,42,1);
          font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          letter-spacing:3px;
          color:#9ca3af;

          max-width:100%;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        ">${maskedDots}</div>

        <div id="walletSecretRealWrap" style="display:none; margin-top:8px;">
          <div style="font-size:11px;opacity:.9;margin-bottom:6px;color:#fee2e2;">
            This is your actual Base58 private key:
          </div>
          <div id="walletSecretReal" style="
            font-size:11px;
            padding:8px 10px;
            border-radius:12px;
            border:1px solid rgba(248,250,252,.6);
            background:rgba(15,23,42,1);
            font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;

            max-width:100%;
            overflow:auto;
            white-space:nowrap;

            color:#f9fafb;
          "></div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
          <button id="walletRevealSecretBtn" type="button" style="
            padding:8px 12px;
            border-radius:999px;
            border:1px solid rgba(239,68,68,.9);
            background:rgba(127,29,29,1);
            color:#fee2e2;
            font-size:12px;
            font-weight:800;
            cursor:pointer;
          ">Reveal private key</button>

          <button id="walletCopySecretBtn" type="button" style="
            padding:8px 12px;
            border-radius:999px;
            border:1px solid rgba(248,250,252,.6);
            background:rgba(15,23,42,1);
            color:#e5e7eb;
            font-size:12px;
            font-weight:700;
            cursor:pointer;
          " disabled>Copy private key</button>
        </div>

        <div id="walletSecretMsg" style="font-size:11px;opacity:.9;margin-top:8px;color:#fee2e2;"></div>
      </div>
    </section>
  `;
}

function bindWalletEvents() {
  const copyAddressBtn = document.querySelector('#walletCopyAddressBtn');

  const sendToInput = document.querySelector('#walletSendToInput');
  const sendAmountInput = document.querySelector('#walletSendAmountInput');
  const sendTokenSelect = document.querySelector('#walletSendTokenSelect');
  const sendBtn = document.querySelector('#walletSendBtn');
  const sendMsgEl = document.querySelector('#walletSendMsg');

  const splWrap = document.querySelector('#walletCustomSplWrap');
  const splMintInput = document.querySelector('#walletSplMintInput');
  const splDecimalsInput = document.querySelector('#walletSplDecimalsInput');

  const secretMaskedEl = document.querySelector('#walletSecretMasked');
  const secretRealWrap = document.querySelector('#walletSecretRealWrap');
  const secretRealEl = document.querySelector('#walletSecretReal');
  const revealSecretBtn = document.querySelector('#walletRevealSecretBtn');
  const copySecretBtn = document.querySelector('#walletCopySecretBtn');
  const secretMsgEl = document.querySelector('#walletSecretMsg');

  const overviewStatusEl = document.querySelector('#walletOverviewStatus');
  const overviewTotalsEl = document.querySelector('#walletOverviewTotals');
  const overviewTableBody = document.querySelector('#walletOverviewTableBody');
  const overviewRefreshBtn = document.querySelector('#walletRefreshOverviewBtn');

  const setSendMsg = (t, isError = false) => {
    if (!sendMsgEl) return;
    sendMsgEl.innerHTML = t || '';
    sendMsgEl.style.color = isError ? '#fecaca' : '#e5e7eb';
  };

  const setSecretMsg = (t) => {
    if (secretMsgEl) secretMsgEl.textContent = t || '';
  };

  const setOverviewStatus = (t) => {
    if (overviewStatusEl) overviewStatusEl.textContent = t || '';
  };

  const formatAmount = (value, maxDecimals = 6) => {
    const n = Number(value || 0);
    if (!Number.isFinite(n)) return '0';
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    });
  };

  // Toggle custom SPL velden
  if (sendTokenSelect && splWrap) {
    const toggleCustomSpl = () => {
      if (sendTokenSelect.value === 'SPL') splWrap.style.display = 'block';
      else splWrap.style.display = 'none';
    };
    sendTokenSelect.addEventListener('change', toggleCustomSpl);
    toggleCustomSpl();
  }

  // Copy address
  if (copyAddressBtn) {
    copyAddressBtn.onclick = async () => {
      try {
        const pk = getLocalPublicKeySafe();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(pk);
          setSendMsg('✅ Address copied.');
        } else {
          setSendMsg('📋 Copy not supported in this browser.', true);
        }
      } catch (e) {
        console.warn('CBS GO: copy wallet address failed', e);
        setSendMsg('⛔ Failed to copy address.', true);
      }
    };
  }

  // On-chain SOL / SPL versturen
  if (sendBtn && sendToInput && sendAmountInput && sendTokenSelect) {
    sendBtn.onclick = async () => {
      const to = sendToInput.value.trim();
      const rawAmount = sendAmountInput.value.trim();
      const token = sendTokenSelect.value || 'SOL';

      if (!to) {
        setSendMsg('Enter a destination Solana address.', true);
        return;
      }

      if (!rawAmount) {
        setSendMsg('Enter an amount.', true);
        return;
      }

      const amount = Number(rawAmount.replace(',', '.'));
      if (!Number.isFinite(amount) || amount <= 0) {
        setSendMsg('Amount must be greater than 0.', true);
        return;
      }

      sendBtn.disabled = true;

      const makeLink = (signature) => {
        const shortSig =
          signature.length > 16 ? `${signature.slice(0, 8)}…${signature.slice(-8)}` : signature;
        return `
          <a href="https://solscan.io/tx/${signature}" target="_blank" rel="noreferrer" style="color:#7dd3fc;">
            View transaction on Solscan (${shortSig})
          </a>
        `;
      };

      try {
        if (token === 'SOL') {
          setSendMsg('Sending SOL on-chain…');
          const { signature, amountSol } = await sendSolFromLocalWallet({ toAddress: to, amountSol: amount });
          setSendMsg(`✅ Sent ${amountSol} SOL.<br/>${makeLink(signature)}`);
          sendAmountInput.value = '';
          return;
        }

        if (token === 'CBS') {
          setSendMsg('Sending CBS on-chain…');
          const { signature, amountTokens } = await sendSplFromLocalWallet({
            mintAddress: CBS_MINT,
            toAddress: to,
            amountTokens: amount,
            decimals: CBS_DECIMALS,
          });
          setSendMsg(`✅ Sent ${amountTokens} CBS.<br/>${makeLink(signature)}`);
          sendAmountInput.value = '';
          return;
        }

        if (token === 'BONK') {
          setSendMsg('Sending BONK on-chain…');
          const { signature, amountTokens } = await sendSplFromLocalWallet({
            mintAddress: BONK_MINT,
            toAddress: to,
            amountTokens: amount,
            decimals: BONK_DECIMALS,
          });
          setSendMsg(`✅ Sent ${amountTokens} BONK.<br/>${makeLink(signature)}`);
          sendAmountInput.value = '';
          return;
        }

        if (token === 'USDC') {
          setSendMsg('Sending USDC on-chain…');
          const { signature, amountTokens } = await sendSplFromLocalWallet({
            mintAddress: USDC_MINT,
            toAddress: to,
            amountTokens: amount,
            decimals: USDC_DECIMALS,
          });
          setSendMsg(`✅ Sent ${amountTokens} USDC.<br/>${makeLink(signature)}`);
          sendAmountInput.value = '';
          return;
        }

        if (token === 'SPL') {
          const mint = splMintInput?.value?.trim();
          const decRaw = splDecimalsInput?.value?.trim();

          if (!mint) {
            setSendMsg('Enter SPL mint address.', true);
            return;
          }

          const decimals = Number(decRaw);
          if (!Number.isFinite(decimals) || decimals < 0 || decimals > 12) {
            setSendMsg('Enter valid decimals between 0 and 12.', true);
            return;
          }

          setSendMsg('Sending SPL token on-chain…');
          const { signature, amountTokens } = await sendSplFromLocalWallet({
            mintAddress: mint,
            toAddress: to,
            amountTokens: amount,
            decimals,
          });
          setSendMsg(`✅ Sent ${amountTokens} tokens.<br/>${makeLink(signature)}`);
          sendAmountInput.value = '';
          return;
        }

        setSendMsg('Unsupported token selected.', true);
      } catch (e) {
        console.warn('CBS GO: send token failed', e);
        setSendMsg(`⛔ ${e.message || 'Could not send token.'}`, true);
      } finally {
        sendBtn.disabled = false;
      }
    };
  }

  // Token Overview laden
  async function loadTokenOverview() {
    if (!overviewTableBody) return;
    const owner = getLocalPublicKeySafe();
    if (!owner) {
      setOverviewStatus('No local wallet available.');
      overviewTableBody.innerHTML = `<tr><td colspan="3" style="padding:4px 4px;opacity:.7;">No wallet.</td></tr>`;
      return;
    }

    setOverviewStatus('Loading balances…');
    overviewTableBody.innerHTML = `
      <tr>
        <td style="padding:4px 4px;opacity:.7;" colspan="3">
          Fetching SOL + SPL token accounts…
        </td>
      </tr>
    `;
    if (overviewRefreshBtn) overviewRefreshBtn.disabled = true;

    try {
      const { sol, tokens } = await fetchTokenOverview(owner);
      setOverviewStatus('');

      if (overviewTotalsEl) {
        const tokenCount = tokens.length;
        overviewTotalsEl.textContent = `SOL: ${formatAmount(sol, 5)} · SPL tokens: ${tokenCount}`;
      }

      if (!tokens.length) {
        overviewTableBody.innerHTML = `
          <tr>
            <td style="padding:4px 4px;opacity:.7;" colspan="3">
              No SPL tokens found for this wallet yet.
            </td>
          </tr>
        `;
      } else {
        overviewTableBody.innerHTML = tokens
          .map((t) => {
            const mintShort = t.mint.length > 10 ? `${t.mint.slice(0, 4)}…${t.mint.slice(-4)}` : t.mint;
            const label = t.symbol ? `${t.symbol}` : t.mint.slice(0, 4);
            const name = t.name || 'SPL Token';

            return `
              <tr>
                <td style="padding:4px 4px;white-space:nowrap;">
                  <span style="font-weight:600;">${esc(label)}</span>
                  <span style="font-size:10px;opacity:.65;"> · ${esc(mintShort)}</span>
                </td>
                <td style="padding:4px 4px;text-align:right;font-variant-numeric:tabular-nums;">
                  ${esc(t.uiAmountStr || formatAmount(t.uiAmount, 6))}
                </td>
                <td style="padding:4px 4px;">
                  <span style="opacity:.9;">${esc(name)}</span>
                </td>
              </tr>
            `;
          })
          .join('');
      }
    } catch (e) {
      console.warn('CBS GO: fetchTokenOverview failed', e);
      setOverviewStatus('⛔ Could not fetch token balances.');
      overviewTableBody.innerHTML = `
        <tr>
          <td style="padding:4px 4px;opacity:.7;" colspan="3">
            Error loading token accounts.
          </td>
        </tr>
      `;
    } finally {
      if (overviewRefreshBtn) overviewRefreshBtn.disabled = false;
    }
  }

  if (overviewRefreshBtn) overviewRefreshBtn.onclick = () => loadTokenOverview().catch(() => {});
  loadTokenOverview().catch(() => {});

  // Reveal private key
  if (revealSecretBtn && secretMaskedEl && secretRealWrap && secretRealEl) {
    revealSecretBtn.onclick = () => {
      const ok = window.confirm(
        'This will show your private key on screen.\n\nOnly continue if you are in a safe place and will store it securely. Never share it with anyone.\n\nShow private key?',
      );
      if (!ok) return;

      try {
        const sk = getLocalSecretKeyBase58();
        secretRealEl.textContent = sk;
        secretRealWrap.style.display = 'block';
        secretMaskedEl.style.opacity = '0.25';
        revealSecretBtn.disabled = true;
        revealSecretBtn.textContent = 'Private key visible';
        if (copySecretBtn) copySecretBtn.disabled = false;
        setSecretMsg('⚠️ Private key is now visible. Do not share it.');
      } catch (e) {
        console.warn('CBS GO: reveal secret failed', e);
        setSecretMsg('⛔ Could not load private key.');
      }
    };
  }

  // Copy private key
  if (copySecretBtn) {
    copySecretBtn.onclick = async () => {
      try {
        const sk = getLocalSecretKeyBase58();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(sk);
          setSecretMsg('✅ Private key copied. Store it securely and never share it.');
        } else {
          setSecretMsg('📋 Copy not supported in this browser.');
        }
      } catch (e) {
        console.warn('CBS GO: copy private key failed', e);
        setSecretMsg('⛔ Failed to copy private key.');
      }
    };
  }
}

// ---------- Remote profile sync ----------
async function syncRemoteProfileSafe(source = 'unknown') {
  try {
    const wallet_pk = getLocalPublicKeySafe() || null;

    const nickname = getPlayerName() || null;
    const avatar = getPlayerAvatar() || null;

    const xp = getXp();
    const level = getLevel(xp);
    const tickets = getTickets();
    const cbs_play = getCbsCoins();

    let cards_json = {};
    try {
      const inv = loadInventory();
      if (inv && typeof inv.cards === 'object' && inv.cards !== null) {
        cards_json = { ...inv.cards };
      }
    } catch {}

    const payload = { wallet_pk, nickname, avatar, xp, level, tickets, cbs_play, cards_json };
    await saveRemoteProfile(payload);
  } catch (e) {
    console.warn('CBS GO: syncRemoteProfileSafe failed from', source, e);
  }
}

// ---------- Panel router ----------
function renderPanel() {
  const t = getSelectedTab();
  if (t === 'profile') return panelWrap('Profile', `<div id="profileMount">${renderProfile()}</div>`);
  if (t === 'bag') return panelWrap('Bag', `<div id="bagMount">${renderBag()}</div>`);
  if (t === 'wallet') return panelWrap('Solana Wallet', `<div id="walletMount">${renderWalletPanel()}</div>`);
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
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag + Wallet -->
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

        <button type="button" data-panel="wallet" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(56,189,248,.55);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#e0f2fe;
        ">👛</button>
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
  if (t === 'profile') bindProfileEvents();
  if (t === 'bag') bindBagEvents();
  if (t === 'wallet') bindWalletEvents();

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
      if (current === panel) setSelectedTab('map');
      else setSelectedTab(panel || 'map');
      updatePanel();
    });
  });
}

// ---------- Trade popup ----------
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
  const title = direction === 'sent' ? 'Gift sent' : 'You received a gift';

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

// ---------- Interne helper: hele app bootstrappen ----------
function bootstrapApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  try {
    enableWakeLock();
    bindWakeLockVisibilityHandler();
  } catch (e) {
    console.warn('CBS GO: wake lock niet beschikbaar', e);
  }

  try {
    syncPlayerProfile();
    syncRemoteProfileSafe('bootstrap');
  } catch (e) {
    console.warn('CBS GO: failed to sync player profile / remote profile (ignored)', e);
  }

  bindUi();
  bindMapView();

  tryAutoStart();

  if (!window.__cbsgo_xp_rerender_listener) {
    window.__cbsgo_xp_rerender_listener = true;
    const rerenderXp = () => {
      const mount = document.querySelector('#xpMount');
      if (!mount) return;
      mount.innerHTML = renderXpBar();
    };
    ['cbsgo:xpChanged', 'cbsgo:levelChanged', 'cbsgo:stepsChanged'].forEach((evtName) => {
      window.addEventListener(evtName, rerenderXp);
    });
  }

  if (!window.__cbsgo_inventory_rerender_listener) {
    window.__cbsgo_inventory_rerender_listener = true;
    const rerenderBagIfOpen = () => {
      if (getSelectedTab() === 'bag') updatePanel();
    };
    ['cbsgo:inventoryChanged', 'cbsgo:bagChanged'].forEach((evtName) => {
      window.addEventListener(evtName, rerenderBagIfOpen);
    });
  }

  if (!window.__cbsgo_trade_popup_listener) {
    window.__cbsgo_trade_popup_listener = true;
    window.addEventListener('cbsgo:tradePopup', (ev) => {
      showTradePopup(ev?.detail || {});
    });
  }

  updatePanel();

  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', hardResetCBSGO);
  }

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

  pullIncomingGifts().catch(() => {});
}

// ---------- Mount + login/PIN flow ----------
export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  openLoginModal();

  const onLoginDone = async (ev) => {
    window.removeEventListener('cbsgo:loginDone', onLoginDone);

    const pin = ev?.detail?.pin || '';

    // 1) bootstrap vault/local wallet
    try {
      const fn = window.bootstrapAuthWallet;

      if (typeof fn === 'function') {
        let res = await fn(pin);

        // Vault exists but PIN mismatched
        if (res?.mode === 'needs_old_pin') {
          const oldPin = window.prompt(
            'This account has an existing wallet backup encrypted with an older PIN.\n\nIf you know your OLD 6-digit PIN, enter it once to restore your wallet.\n\nIf you forgot it, press Cancel to continue with a NEW local wallet (old funds cannot be recovered).',
            '',
          );

          if (oldPin) {
            // If you updated bootstrapAuthWallet.js to accept (pin, oldPin), this will restore.
            res = await fn(pin, oldPin);
          } else {
            // Fallback: create a new local wallet so game has a visible wallet
            try {
              createWallet(pin); // makes local wallet immediately
              console.warn('CBS-GO: created NEW local wallet because old vault PIN was not provided.');
            } catch (e) {
              console.warn('CBS-GO: could not create new local wallet', e);
            }
          }
        }

        // no vault and no local -> create local wallet so user can play
        if (res?.mode === 'no_vault_no_local') {
          try {
            createWallet(pin);
            // After creating local wallet, next boot can backup into vault if you want:
            // await fn(pin); // optional
          } catch (e) {
            console.warn('CBS-GO: createWallet failed', e);
          }
        }
      } else {
        console.warn('CBS-GO: bootstrapAuthWallet not available');
      }
    } catch (e) {
      console.warn('CBS-GO: bootstrapAuthWallet failed', e);
      alert('Wallet unlock failed (wrong PIN?)');
      openLoginModal();
      window.addEventListener('cbsgo:loginDone', onLoginDone);
      return;
    }

    // 2) ensure supabase player_state row exists
    try {
      await ensureSupabaseUserBound();
    } catch {}

    // 3) apply remote profile to local (if available)
    try {
      await applyRemoteProfileToLocal({ preferRemote: true });
    } catch (e) {
      console.warn('CBS-GO: applyRemoteProfileToLocal failed', e);
    }

    // 4) start game
    bootstrapApp();
  };

  window.addEventListener('cbsgo:loginDone', onLoginDone);
}
