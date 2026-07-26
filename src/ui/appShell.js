// src/ui/appShell.js 

// Fullscreen map shell met overlays.
// Layout afspraken
//
// - Map is fullscreen.
// - Rechtsboven: alleen XP + stappen.
// - Rechtsonder: 2 ronde knoppen op de kaart (Profile & Bag), naast elkaar, net boven GPS-tekst.
// - Geen extra weather-dot linksonder (jouw eigen weer bovenin blijft leidend).
// - Geen leaderboard / competitie-focus.
import '../bufferPolyfill.js';
import { supabase } from '../app/supabaseClient.js';
import { applyRemoteProfileToLocal } from '../app/applyRemoteProfile.js';

import './levelUpPopup.js';

import { nodes } from '../data/nodes.js';
import { openPuzzleModal } from './puzzleModal.js';

import { renderXpBar } from './xpBar.js';
// import { renderStepsWidget, bindStepsWidget } from './stepsWidget.js'; // UI uit
import { renderLeaderboardPanel, bindLeaderboardPanel } from './leaderboardPanel.js';
import { tryAutoStart } from '../app/steps.js';
import { isDev, hardResetCBSGO } from '../app/devTools.js';
import { renderDevPanelBody, bindDevPanelButtons } from './devPanel.js';
import {
  getPlayerName,
  setPlayerName,
  getPlayerAvatar,
  setPlayerAvatar,
  clearPlayerAvatar,
  isGameplayAllowed,
  normalizePlayerNickname,
  PROFILE_SETUP_MESSAGE,
  sanitizeStoredNickname,
} from '../app/leaderboard.js';
import {
  getPlayerEmail,
  setPlayerEmail,
  isValidEmail,
  normalizePlayerEmail,
  sanitizeStoredEmail,
  isProfileComplete,
  hasValidPlayerNickname,
  hasValidPlayerAvatar,
  setProfileGateContext,
  setProfileOwner,
  profileOwnerMatches,
  getProfileOwner,
} from '../app/playerNickname.js';

// ✅ MapView: namespace import voorkomt build errors als exports ooit anders heten
import * as mapView from './mapView.maplibre.js';


// ✅ Inventory: namespace import voorkomt build errors als loadInventory/export mismatch
import * as inventory from '../app/inventory.js';

import { openCardsPanel } from './cardsPanel.js';

// ✅ Login gate
import { openLoginModal } from './loginModal.js';
import { openProfileOnboardingModal } from './profileOnboardingModal.js';
import { openDeleteAccountModal } from './deleteAccountModal.js';

// ✅ Supabase helper (profile -> players tabel)
import { syncPlayerProfile } from '../app/onlinePlayers.js';

// ✅ Supabase remote game profile (backup naar game_profiles)
import { saveRemoteProfile, loadRemoteProfile, isNicknameAvailable, NICKNAME_TAKEN_MESSAGE, PROFILE_SAVE_FAILED_MESSAGE, updateGameProfileAvatar } from '../app/remoteProfile.js';
import { compressAvatarFile } from '../app/avatarImage.js';
import {
  countryOptionsHtml,
  loadCountryPrivacyPrefs,
  saveCountryPrivacyPrefs,
} from '../app/countryPrivacy.js';


// ✅ positie-sync + andere spelers ophalen (oranje bolletjes)
import '../app/playerSync.js';

// ✅ friends helpers
import {
  loadFriendsOverview,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
  getMyFriendCode,
} from '../app/friends.js';
import { icon, panelIconForTitle, avatarFallbackHtml } from './gameIcons.js';
import { showConfirmDialog } from './confirmDialog.js';
import { showGameIntroIfNeeded } from './gameIntroModal.js';
import { scheduleInstallPromptIfNeeded, handleManualInstall } from './installPrompt.js';
import { initLeaveGuard } from '../app/leaveGuard.js';
import { initViewportLayout } from '../app/viewportLayout.js';
import { renderBagPanel } from './bagPanel.js';
import { CBSGO_APP_VERSION } from '../app/appVersion.js';
import {
  showGameToast,
  friendSendToastFromError,
  initGameToastListener,
} from './gameToast.js';
import { executeForceAppUpdate, getPwaRuntimeInfo, openFreshWebVersion } from '../app/pwaUpdate.js';

let cbsgoFriendsSetMsg = () => {};
let cbsgoFriendsRefresh = async () => {};

function ensureFriendsActionDelegation() {
  if (typeof window !== 'undefined' && window.__cbsgoFriendsActionsBound) return;
  if (typeof window !== 'undefined') window.__cbsgoFriendsActionsBound = true;

  document.addEventListener(
    'click',
    async (e) => {
      const acceptBtn = e.target.closest?.('.friendAcceptBtn');
      const copyBtn = e.target.closest?.('.friendCopyBtn');
      const removeBtn = e.target.closest?.('.friendRemoveBtn');
      const btn = acceptBtn || copyBtn || removeBtn;
      if (!btn) return;

      const host = btn.closest('#friendsIncomingList, #friendsAcceptedList');
      if (!host) return;

      e.preventDefault();
      e.stopPropagation();

      if (acceptBtn) {
        const id = btn.getAttribute('data-friend-id');
        if (!id) return;

        cbsgoFriendsSetMsg('Accepting friend…');
        btn.disabled = true;
        try {
          await acceptFriendRequest(id);
          cbsgoFriendsSetMsg('');
          showGameToast('Friend added.', { variant: 'success', iconName: 'friends' });
          await cbsgoFriendsRefresh();
        } catch (err) {
          console.warn(err);
          cbsgoFriendsSetMsg('');
          showGameToast('Could not accept friend request.', { variant: 'error' });
          btn.disabled = false;
        }
        return;
      }

      if (copyBtn) {
        const w = (btn.getAttribute('data-wallet') || '').trim();
        const code = (btn.getAttribute('data-code') || '').trim();
        const value = w || code;
        if (!value) return;

        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(value);
            cbsgoFriendsSetMsg('');
            showGameToast(w ? 'Friend wallet copied.' : 'Friend Code copied.', {
              variant: 'success',
              iconName: 'receive',
            });
          } else {
            showGameToast('Copy not supported in this browser.', { variant: 'error' });
          }
        } catch (err) {
          console.warn('CBS GO: copy friend failed', err);
          showGameToast('Could not copy.', { variant: 'error' });
        }
        return;
      }

      if (removeBtn) {
        const id = btn.getAttribute('data-friend-id');
        const nick = btn.getAttribute('data-friend-nick') || 'this friend';
        if (!id) return;

        const ok = await showConfirmDialog({
          title: 'Remove friend',
          message: `Remove ${nick} from your friends? This only removes the friendship link.`,
          confirmLabel: 'Remove',
          cancelLabel: 'Cancel',
          danger: true,
        });
        if (!ok) return;

        cbsgoFriendsSetMsg('Removing friend…');
        btn.disabled = true;
        try {
          await removeFriend(id);
          cbsgoFriendsSetMsg('');
          showGameToast('Friend removed.', { variant: 'success', iconName: 'friends' });
          await cbsgoFriendsRefresh();
        } catch (err) {
          console.warn(err);
          cbsgoFriendsSetMsg('');
          showGameToast('Could not remove friend.', { variant: 'error' });
          btn.disabled = false;
        }
      }
    },
    true,
  );
}

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
import { logRpcEnvDiagnostics, describeRpcSource, resetSolanaConnectionCache } from '../app/solanaConnection.js';

// ✅ state helpers
import { isNodeCompleted, getXp, getLevel } from '../app/state.js';

// ✅ auth wallet bootstrap (side effects / global)
import '../app/bootstrapAuthWallet.js';

import { getLocalPublicKey, getLocalSecretKeyBase58 } from '../app/solanaLocalWallet.js';
import { createWallet } from '../app/wallet.js';

// ----------------- inventory (source of truth) -----------------
const getTickets = () => Number(inventory.getTickets?.() || 0);
const getCbsCoins = () => Number(inventory.getCbsCoins?.() || 0);

const loadInventory = () => inventory.loadInventory?.() || { tickets: 0, cbs: 0, cards: {} };
const saveInventory = (inv) => inventory.saveInventory?.(inv);


// ----------------- safe wrappers (mapView) -----------------
const renderMapView =
  typeof mapView.renderMapView === 'function'
    ? mapView.renderMapView
    : () =>
        `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#3d2a10;opacity:.6;">MapView missing export</div>`;

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
  // Hard normalize any avatar input into a clean data:image/*;base64,... url
  function normalizeImageDataUrl(input) {
    if (typeof input !== 'string') return '';
    let s = input.trim();
    if (!s) return '';

    // Sometimes it gets saved as a JSON string including quotes
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      s = s.slice(1, -1).trim();
    }

    // If it already looks like a data URL, extract mime + base64 part
    if (s.startsWith('data:image')) {
      // keep only the last data:image occurrence if duplicated somewhere
      const last = s.lastIndexOf('data:image');
      if (last > 0) s = s.slice(last);

      const comma = s.indexOf(',');
      if (comma === -1) return '';

      const header = s.slice(0, comma); // data:image/png;base64
      let b64 = s.slice(comma + 1);

      // Remove whitespace/newlines and any non-base64 characters
      b64 = b64.replace(/\s+/g, '');
      b64 = b64.replace(/[^A-Za-z0-9+/=]/g, '');

      // Extract mime type if present
      const mimeMatch = header.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64$/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';

      if (!b64) return '';
      return `data:${mime};base64,${b64}`;
    }

    // Otherwise assume it's raw base64 (maybe with whitespace)
    let b64 = s.replace(/\s+/g, '').replace(/[^A-Za-z0-9+/=]/g, '');
    if (!b64) return '';
    return `data:image/png;base64,${b64}`;
  }

  const safeUrl = normalizeImageDataUrl(dataUrl);
  const bg = safeUrl ? `background-image:url('${safeUrl}');` : '';
  const inner = safeUrl ? '' : avatarFallbackHtml(size);

  return `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      border:1px solid rgba(255,159,28,.18);
      background:rgba(255,255,255,.06);
      ${bg}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
    ">${inner}</div>
  `;
}

function getShareLocation() {
  try {
    return (localStorage.getItem('cbsgo_shareLocation') ?? '1') === '1';
  } catch {
    return true;
  }
}

function setShareLocation(v) {
  try {
    localStorage.setItem('cbsgo_shareLocation', v ? '1' : '0');
  } catch {}

  try {
    window.dispatchEvent(
      new CustomEvent('cbsgo:shareLocation', {
        detail: { shareLocation: !!v },
      })
    );
  } catch {}
}

function updateShareLocProfileButton() {
  const btn = document.querySelector('#profileShareLocBtn');
  if (!btn) return;

  const on = getShareLocation();
  const label = btn.querySelector('[data-share-loc-label]');
  if (label) {
    label.textContent = on ? 'ON' : 'OFF';
  } else {
    btn.textContent = on ? 'ON' : 'OFF';
  }
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  btn.title = on
    ? 'You appear on the map for other players'
    : 'Your location is not shared. You still appear on the leaderboard.';
}

function updateShowCountryFlagButton(showFlag) {
  const btn = document.querySelector('#profileShowCountryFlagBtn');
  if (!btn) return;
  const on = !!showFlag;
  const label = btn.querySelector('[data-flag-pref-label]');
  if (label) {
    label.textContent = on ? 'ON' : 'OFF';
  } else {
    btn.textContent = on ? 'ON' : 'OFF';
  }
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  btn.dataset.showFlag = on ? '1' : '0';
}

// ---------- CBS token info (SPL) ----------
const CBS_MINT = 'B9z8cEWFmc7LvQtjKsaLoKqW5MJmGRCWqs1DPKupCfkk';
const CBS_DECIMALS = 9;

// ---------- Common SPL tokens ----------
const BONK_MINT = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';
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

function showProfileSetupMessage() {
  const msg = document.querySelector('#profileMsg');
  if (msg) msg.textContent = PROFILE_SETUP_MESSAGE;
}

async function checkProfileComplete(overrides = {}) {
  try {
    const { data } = await supabase.auth.getUser();
    const authUser = data?.user || null;
    const walletPk = getLocalPublicKeySafe();

    if (overrides.nickname !== undefined || overrides.avatar !== undefined) {
      return isProfileComplete({
        authUser,
        walletPk,
        nickname: overrides.nickname,
        avatar: overrides.avatar,
      });
    }

    return isProfileComplete({ authUser, walletPk });
  } catch {
    return false;
  }
}

async function persistProfileAvatar(avatarDataUrl) {
  const av = setPlayerAvatar(String(avatarDataUrl || ''));
  if (!hasValidPlayerAvatar(av)) {
    throw new Error('Invalid profile photo.');
  }

  let userId = null;
  try {
    const { data } = await supabase.auth.getUser();
    userId = data?.user?.id || null;
  } catch {}
  if (!userId) throw new Error('Not logged in.');

  const walletPk = getLocalPublicKeySafe() || null;
  setProfileOwner({ userId, walletPk });

  const nick = normalizePlayerNickname(getPlayerName());
  const result = await updateGameProfileAvatar(av, {
    userId,
    walletPk,
    nickname: nick || undefined,
  });

  if (!result.ok) {
    throw new Error(result.message || 'Could not save profile photo to cloud.');
  }

  markRemoteApplied();

  try {
    await syncPlayerProfile({ avatar: av, forceSync: true });
  } catch (e) {
    console.warn('CBS GO: syncPlayerProfile after avatar save failed', e);
  }

  window.dispatchEvent(
    new CustomEvent('cbsgo:profileChanged', {
      detail: { nickname: nick, avatar: av, email: getPlayerEmail() },
    }),
  );

  return av;
}

async function saveOnboardingProfile({ nickname, avatar, authUser, walletPk }) {
  const nick = normalizePlayerNickname(nickname);
  if (!nick) throw new Error('Invalid nickname.');

  const userId = authUser?.id || null;
  let resolvedUserId = userId;
  if (!resolvedUserId) {
    try {
      const { data } = await supabase.auth.getUser();
      resolvedUserId = data?.user?.id || null;
    } catch {}
  }

  const nickCheck = await isNicknameAvailable(nick, resolvedUserId);
  if (!nickCheck.available) {
    if (nickCheck.reason === 'taken') throw new Error(NICKNAME_TAKEN_MESSAGE);
    throw new Error('Could not verify nickname availability.');
  }

  setPlayerName(nick);

  const av = setPlayerAvatar(avatar);
  if (!hasValidPlayerAvatar(av)) throw new Error('Profile photo is required.');

  const ownerWallet = walletPk || getLocalPublicKeySafe() || null;
  setProfileOwner({ userId: resolvedUserId, walletPk: ownerWallet });

  // Email stays in auth.users / localStorage — never written to game_profiles.
  const localEmail = normalizePlayerEmail(getPlayerEmail());
  let authEmail = '';
  try {
    const { data } = await supabase.auth.getUser();
    authEmail = normalizePlayerEmail(data?.user?.email || '');
  } catch {}
  const email = localEmail || authEmail || null;

  const existingRemote = resolvedUserId
    ? await loadRemoteProfile(resolvedUserId).catch(() => null)
    : null;

  // First remote row only: explicit progress defaults (never inherit device leftovers).
  // Incomplete returning users keep remote progress already applied locally.
  const progressDefaults = existingRemote?.user_id
    ? {}
    : {
        xp: 0,
        level: 1,
        tickets: 0,
        cbs_play: 0,
        cards_json: {},
      };

  const { data: saved, error: saveError } = await saveRemoteProfile(
    {
      wallet_pk: ownerWallet,
      nickname: nick,
      avatar: av,
      ...progressDefaults,
    },
    { forceSave: true },
  );

  if (saveError) {
    console.warn('CBS GO: onboarding profile save failed', saveError.error || saveError);
    const code = String(saveError.code || '');
    if (code === '42501' || code === 'rls') {
      throw new Error('Profile update is blocked by permissions.');
    }
    if (code === 'too_large') {
      throw new Error(saveError.message || 'Avatar image is too large. Choose a smaller photo.');
    }
    throw new Error(PROFILE_SAVE_FAILED_MESSAGE);
  }

  if (!saved) {
    console.warn('CBS GO: onboarding profile save returned no row');
    throw new Error(PROFILE_SAVE_FAILED_MESSAGE);
  }

  try {
    await syncPlayerProfile({ nickname: nick, avatar: av, forceSync: true });
  } catch (e) {
    console.warn('CBS GO: syncPlayerProfile after onboarding failed', e);
  }

  markRemoteApplied();

  window.dispatchEvent(
    new CustomEvent('cbsgo:profileChanged', {
      detail: { nickname: nick, avatar: av, email },
    }),
  );
}

function ensureProfileSetup() {
  if (isGameplayAllowed()) return true;
  setSelectedTab('profile');
  updatePanel();
  showProfileSetupMessage();
  return false;
}

// ---------- Panel wrapper (onderin) ----------
function panelWrap(title, innerHtml) {
  return `
    <div class="cbsgo-panel-dock">
      <div class="cbsgo-game-panel">
        <div class="cbsgo-game-panel__header">
          <div class="cbsgo-game-panel__title">
            ${panelIconForTitle(title)}
            <span>${esc(title)}</span>
          </div>
          <button type="button" id="cbsgoClosePanel" class="cbsgo-btn-secondary" style="padding:6px 12px;font-size:12px;">
            ${icon('close', 14, { className: 'cbsgo-icon' })} Close
          </button>
        </div>

        <div class="cbsgo-game-panel__body">
          ${innerHtml}
        </div>
      </div>
    </div>
  `;
}

// ---------- Profile (zonder wallet blok) + Friends ----------
function renderProfile() {
  const me = getPlayerName();
  const myEmail = getPlayerEmail();
  const myAvatar = String(getPlayerAvatar() || '').trim();
  const needsProfileSetup =
    !hasValidPlayerNickname(me) || !hasValidPlayerAvatar(myAvatar);
  const pwaInfo = getPwaRuntimeInfo();

  return `
    <section class="cbsgo-game-section">
      <h3 style="margin:0 0 8px 0; font-size:16px; display:flex; align-items:center; gap:8px;">
        ${icon('profile', 20, { className: 'cbsgo-icon cbsgo-icon--panel' })}
        Character Profile
      </h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Complete your profile before entering the game. Nickname and profile photo are required.
      </p>
      ${
        needsProfileSetup
          ? `
      <div style="
        margin:0 0 12px 0;
        padding:10px 12px;
        border-radius:12px;
        border:1px solid rgba(251,191,36,.45);
        background:rgba(251,191,36,.12);
        color:#3d2a10;
        font-size:12px;
        font-weight:700;
      ">${esc(PROFILE_SETUP_MESSAGE)}</div>`
          : ''
      }

      <div style="
        display:flex;
        gap:14px;
        align-items:center;
        flex-wrap:wrap;
      ">
        ${avatarCircle(myAvatar, 64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileEmail" style="font-size:12px; opacity:.8;">Email <span style="opacity:.6;">(required)</span></label>
          <input
            id="profileEmail"
            type="email"
            value="${esc(myEmail)}"
            autocomplete="email"
            style="
              width:100%;
              margin-top:4px;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,159,28,.14);
              background:rgba(255,255,255,.06);
              color:#3d2a10;
            "
            placeholder="you@email.com"
          />

          <label for="profileName" style="display:block;margin-top:12px;font-size:12px; opacity:.8;">Nickname <span style="opacity:.6;">(required)</span></label>
          <input
            id="profileName"
            value="${esc(me)}"
            maxlength="24"
            style="
              width:100%;
              margin-top:4px;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,159,28,.14);
              background:rgba(255,255,255,.06);
              color:#3d2a10;
            "
            placeholder="Your nickname"
          />

          <div style="margin-top:12px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:4px;">Profile photo <span style="opacity:.6;">(required)</span></div>
            <input id="profileAvatar" type="file" accept="image/*" />
          </div>

          <div id="profileMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
        </div>
      </div>

      <!-- Privacy & country -->
      <div style="
        margin-top:18px;
        padding-top:12px;
        border-top:1px solid rgba(255,255,255,.16);
      ">
        <h4 style="margin:0 0 6px 0; font-size:14px; display:flex; align-items:center; gap:8px;">
          ${icon('location', 18, { className: 'cbsgo-icon cbsgo-icon--panel' })}
          Privacy &amp; country
        </h4>
        <p style="margin:0 0 12px 0; font-size:11px; opacity:.75;">
          Control map visibility and how your country appears on the leaderboard.
        </p>

        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          flex-wrap:wrap;
          margin-bottom:8px;
        ">
          <div style="min-width:0;flex:1;">
            <div style="font-size:13px;font-weight:700;">Show me on the map</div>
            <div style="font-size:11px;opacity:.75;margin-top:2px;">
              When disabled, your location will not be shared. You will still appear on the leaderboard.
            </div>
          </div>
          <button
            class="btn secondary"
            id="profileShareLocBtn"
            type="button"
            aria-pressed="${getShareLocation() ? 'true' : 'false'}"
            style="min-width:64px;font-weight:800;"
          >
            <span data-share-loc-label>${getShareLocation() ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        <label for="profileCountrySelect" style="display:block;margin-top:14px;font-size:12px;opacity:.8;">
          Country
        </label>
        <select
          id="profileCountrySelect"
          style="
            width:100%;
            margin-top:4px;
            padding:10px 10px;
            border-radius:12px;
            border:1px solid rgba(255,159,28,.14);
            background:rgba(255,255,255,.06);
            color:#3d2a10;
          "
        >
          ${countryOptionsHtml('')}
        </select>
        <div style="font-size:11px;opacity:.7;margin-top:4px;">
          Choose your country yourself. We do not set this automatically.
        </div>

        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          flex-wrap:wrap;
          margin-top:14px;
        ">
          <div style="min-width:0;flex:1;">
            <div style="font-size:13px;font-weight:700;">Show country flag on leaderboard</div>
            <div style="font-size:11px;opacity:.75;margin-top:2px;">
              Requires a country above. Stored on your account, not only on this device.
            </div>
          </div>
          <button
            class="btn secondary"
            id="profileShowCountryFlagBtn"
            type="button"
            data-show-flag="0"
            aria-pressed="false"
            style="min-width:64px;font-weight:800;"
          >
            <span data-flag-pref-label>OFF</span>
          </button>
        </div>

        <div id="profilePrivacyMsg" style="margin-top:8px;font-size:12px;opacity:.9;"></div>
      </div>

      <!-- Friends blok -->
      <div style="
        margin-top:18px;
        padding-top:12px;
        border-top:1px solid rgba(255,255,255,.16);
      ">
        <h4 style="margin:0 0 6px 0; font-size:14px; display:flex; align-items:center; gap:8px;">
          ${icon('friends', 18, { className: 'cbsgo-icon cbsgo-icon--panel' })}
          Friends
        </h4>
        <p style="margin:0 0 10px 0; font-size:11px; opacity:.75;">
          Friends are linked to your <b>email account</b> (Supabase user).
          Your wallet can change later, but your friends stay.
        </p>

        <!-- My Friend Code -->
        <div style="
          margin:10px 0 12px 0;
          padding:10px 10px;
          border-radius:14px;
          border:1px solid rgba(255, 159, 28,.55);
          background:rgba(255,248,235,.92); border:1px solid rgba(255,159,28,0.28);
        ">
          <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
            Your Friend Code (share this)
          </div>

          <div
            id="myFriendCodeValue"
            style="
              font-size:11px;
              opacity:.95;
              padding:6px 8px;
              border-radius:10px;
              border:1px solid rgba(255, 159, 28,.45);
              background:rgba(255,248,235,.95); color:#3d2a10;
              word-break:break-all;
              font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
              margin-bottom:8px;
            "
          >
            Loading…
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button
              id="myFriendCodeCopyBtn"
              type="button"
              style="
                padding:7px 11px;
                border-radius:999px;
                border:1px solid rgba(255, 159, 28,.45);
                background:rgba(255, 159, 28,.18);
                color:#3d2a10;
                font-size:12px;
                font-weight:700;
                cursor:pointer;
              "
            >
              Copy Friend Code
            </button>

            <button
              id="myFriendCodeRefreshBtn"
              type="button"
              style="
                padding:7px 11px;
                border-radius:999px;
                border:1px solid rgba(255,159,28,.18);
                background:rgba(255,255,255,.08);
                color:#3d2a10;
                font-size:12px;
                font-weight:600;
                cursor:pointer;
              "
            >
              Refresh
            </button>
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
              border:1px solid rgba(255,159,28,.16);
              background:rgba(255,255,255,.06);
              color:#3d2a10;
              font-size:12px;
            "
          />
          <button
            id="friendSendBtn"
            type="button"
            style="
              padding:8px 12px;
              border-radius:999px;
              border:1px solid rgba(255,159,28,.18);
              background:rgba(255, 159, 28,.35);
              color:#3d2a10;
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

      <div class="cbsgo-profile-update">
        ${
          pwaInfo.showStaleWarning
            ? `<p class="cbsgo-pwa-stale-warn">
                Installed app may be on an older build. Tap Force app update, or open the fresh web version below.
              </p>`
            : ''
        }
        <button id="cbsgoForceAppUpdateBtn" type="button" class="cbsgo-btn-secondary cbsgo-force-update-btn">
          Force app update
        </button>
        <button id="cbsgoOpenFreshWebBtn" type="button" class="cbsgo-btn-secondary cbsgo-fresh-web-btn">
          Open fresh web version
        </button>
        <button id="cbsgoInstallAppBtn" type="button" class="cbsgo-btn-secondary cbsgo-install-app-btn">
          Install CBS-GO
        </button>
        <p id="cbsgoInstallAppMsg" class="cbsgo-install-app-msg"></p>
        <p class="cbsgo-force-update-hint">
          Clears cached app files only. Your CBS-GO account and wallet stay safe. Does not clear saved login or wallet data.
        </p>
      </div>

      <div style="
        margin-top:18px;
        padding-top:14px;
        border-top:1px solid rgba(239,68,68,.28);
      ">
        <h4 style="margin:0 0 6px 0;font-size:14px;color:#b91c1c;">Danger zone</h4>
        <p style="margin:0 0 10px 0;font-size:11px;opacity:.8;line-height:1.45;">
          Permanently delete your CBS-GO account (profile, XP, friends, cloud backup).
          Your local crypto wallet is not removed automatically.
        </p>
        <button id="cbsgoDeleteAccountBtn" type="button" class="cbsgo-btn-danger" style="width:100%;">
          Delete account
        </button>
        <div id="cbsgoDeleteAccountMsg" style="margin-top:8px;font-size:12px;opacity:.9;"></div>
      </div>

      <div class="cbsgo-app-version" title="Build version for support and update checks">
        <div class="cbsgo-app-version__row">
          <span class="cbsgo-app-version__label">App version:</span>
          <span class="cbsgo-app-version__value">${esc(CBSGO_APP_VERSION)}</span>
        </div>
        <div class="cbsgo-app-version__row">
          <span class="cbsgo-app-version__label">Server version:</span>
          <span id="cbsgoProfileServerVersion" class="cbsgo-app-version__value">${esc(pwaInfo.serverVersion)}</span>
        </div>
      </div>
      <div class="cbsgo-pwa-status">
        <div>App mode: ${esc(pwaInfo.appMode)}</div>
        <div>Update status: ${esc(pwaInfo.updateStatus)}</div>
      </div>
    </section>
  `;
}

function bindProfileEvents() {
  const emailInput = document.querySelector('#profileEmail');
  const nameInput = document.querySelector('#profileName');
  const fileInput = document.querySelector('#profileAvatar');
  const shareLocBtn = document.querySelector('#profileShareLocBtn');
  const countrySelect = document.querySelector('#profileCountrySelect');
  const showFlagBtn = document.querySelector('#profileShowCountryFlagBtn');
  const privacyMsgEl = document.querySelector('#profilePrivacyMsg');

  let saveTimer = null;
  let emailSaveTimer = null;
  let privacySaveTimer = null;
  let privacyBusy = false;

  const setMsg = (t) => {
    const msg = document.querySelector('#profileMsg');
    if (msg) msg.textContent = t || '';
  };

  const setPrivacyMsg = (t) => {
    if (privacyMsgEl) privacyMsgEl.textContent = t || '';
  };

  const refreshProfileStatus = async () => {
    const complete = await checkProfileComplete({
      nickname: nameInput?.value,
    });
    if (complete) {
      setMsg('✅ Profile complete. You can play now.');
    } else if (!hasValidPlayerNickname(nameInput?.value || '')) {
      setMsg(PROFILE_SETUP_MESSAGE);
    } else if (!hasValidPlayerAvatar(getPlayerAvatar())) {
      setMsg('⛔ Profile photo is required.');
    } else {
      setMsg(PROFILE_SETUP_MESSAGE);
    }
  };

  const persistCountryPrivacy = async ({ silent = false } = {}) => {
    if (privacyBusy) return;
    if (!countrySelect || !showFlagBtn) return;

    privacyBusy = true;
    if (!silent) setPrivacyMsg('Saving…');

    try {
      const result = await saveCountryPrivacyPrefs({
        countryCode: countrySelect.value,
        showCountryFlag: showFlagBtn.dataset.showFlag === '1',
      });

      if (!result.ok) {
        setPrivacyMsg(result.message || 'Could not save country settings.');
        return;
      }

      if (countrySelect) countrySelect.value = result.countryCode || '';
      updateShowCountryFlagButton(!!result.showCountryFlag);
      if (!silent) setPrivacyMsg('✅ Privacy settings saved.');
    } catch (e) {
      console.warn('CBS GO: persistCountryPrivacy failed', e);
      setPrivacyMsg('Could not save country settings. Try again.');
    } finally {
      privacyBusy = false;
    }
  };

  const schedulePrivacySave = () => {
    try {
      if (privacySaveTimer) clearTimeout(privacySaveTimer);
    } catch {}
    setPrivacyMsg('Saving…');
    privacySaveTimer = setTimeout(() => {
      persistCountryPrivacy();
    }, 350);
  };

  (async () => {
    try {
      if (emailInput && !getPlayerEmail()) {
        const { data } = await supabase.auth.getUser();
        const authEmail = String(data?.user?.email || '').trim();
        if (authEmail && isValidEmail(authEmail)) {
          emailInput.value = authEmail;
          setPlayerEmail(authEmail);
        }
      }
    } catch {}

    try {
      const prefs = await loadCountryPrivacyPrefs();
      if (countrySelect) countrySelect.value = prefs.countryCode || '';
      updateShowCountryFlagButton(!!prefs.showCountryFlag);
      if (prefs.reason === 'schema') {
        setPrivacyMsg(
          'Country settings need a database update before they can be saved.',
        );
      }
    } catch (e) {
      console.warn('CBS GO: load country privacy UI failed', e);
    }

    refreshProfileStatus();
  })();

  const saveEmailNow = () => {
    if (!emailInput) return false;
    const e = setPlayerEmail(emailInput.value);
    if (!e) {
      setMsg('⛔ Enter a valid email address.');
      return false;
    }
    try {
      syncRemoteProfileSafe('email-change', true);
    } catch (err) {
      console.warn('CBS GO: failed to sync email', err);
    }
    return true;
  };

  // --- Name save ---
  const saveNameNow = async () => {
    if (!nameInput) return false;
    const n = normalizePlayerNickname(nameInput.value);
    if (!n) {
      setMsg(PROFILE_SETUP_MESSAGE);
      return false;
    }

    let userId = null;
    try {
      const { data } = await supabase.auth.getUser();
      userId = data?.user?.id || null;
    } catch {}

    const nickCheck = await isNicknameAvailable(n, userId);
    if (!nickCheck.available) {
      if (nickCheck.reason === 'taken') {
        setMsg(`⛔ ${NICKNAME_TAKEN_MESSAGE}`);
      } else {
        setMsg('⛔ Could not verify nickname availability.');
      }
      return false;
    }

    setPlayerName(n);
    setProfileOwner({ userId, walletPk: getLocalPublicKeySafe() });

    try {
      await syncPlayerProfile({ nickname: n });
      syncRemoteProfileSafe('name-change', true);
    } catch (e) {
      console.warn('CBS GO: failed to sync profile after name change', e);
    }
    return true;
  };

  const saveProfileFields = async () => {
    saveEmailNow();
    const nickOk = await saveNameNow();
    const complete = await checkProfileComplete({ nickname: nameInput?.value });
    if (nickOk && complete) {
      setMsg('✅ Profile saved. Welcome to CBS-GO!');
    } else {
      await refreshProfileStatus();
    }
  };

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      setMsg('Saving…');
      try {
        if (emailSaveTimer) clearTimeout(emailSaveTimer);
      } catch {}
      emailSaveTimer = setTimeout(() => {
        saveEmailNow();
        refreshProfileStatus();
      }, 300);
    });

    emailInput.addEventListener('blur', () => {
      try {
        if (emailSaveTimer) clearTimeout(emailSaveTimer);
      } catch {}
      saveEmailNow();
      refreshProfileStatus();
    });
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      setMsg('Saving…');
      try {
        if (saveTimer) clearTimeout(saveTimer);
      } catch {}
      saveTimer = setTimeout(saveProfileFields, 300);
    });

    nameInput.addEventListener('blur', () => {
      try {
        if (saveTimer) clearTimeout(saveTimer);
      } catch {}
      saveProfileFields();
    });
  }

  // --- Avatar upload (1x, met size-check) ---
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
      compressAvatarFile(f)
        .then(async (av) => {
          setMsg('Saving photo…');
          await persistProfileAvatar(av);
          setMsg('✅ Photo updated');
          updatePanel();
        })
        .catch((e) => {
          console.warn('Avatar update failed', e);
          setMsg(`⚠️ ${e.message || 'Failed to update photo'}`);
        })
        .finally(() => {
          fileInput.value = '';
        });
    });
  }

  // --- Show me on the map (existing cbsgo_shareLocation / playerSync) ---
  try {
    updateShareLocProfileButton();
  } catch {}

  if (shareLocBtn) {
    shareLocBtn.onclick = () => {
      const next = !getShareLocation();
      setShareLocation(next);
      try {
        updateShareLocProfileButton();
      } catch {}
      setPrivacyMsg(
        next
          ? 'Show me on the map: ON'
          : 'Show me on the map: OFF. Location not shared; you still appear on the leaderboard.',
      );
    };
  }

  if (countrySelect) {
    countrySelect.addEventListener('change', () => {
      schedulePrivacySave();
    });
  }

  if (showFlagBtn) {
    showFlagBtn.onclick = () => {
      const next = showFlagBtn.dataset.showFlag !== '1';
      updateShowCountryFlagButton(next);
      schedulePrivacySave();
    };
  }

  const forceUpdateBtn = document.querySelector('#cbsgoForceAppUpdateBtn');
  if (forceUpdateBtn && !forceUpdateBtn.__cbsgoBound) {
    forceUpdateBtn.__cbsgoBound = true;
    forceUpdateBtn.addEventListener('click', async () => {
      const ok = await showConfirmDialog({
        title: 'Force app update',
        message: 'This will refresh the app files. Your CBS-GO account will stay safe.',
        confirmLabel: 'Update now',
        cancelLabel: 'Cancel',
      });
      if (!ok) return;

      forceUpdateBtn.disabled = true;
      setMsg('Refreshing app files…');
      try {
        await executeForceAppUpdate();
      } catch (e) {
        console.warn('CBS-GO: force app update failed', e);
        forceUpdateBtn.disabled = false;
        setMsg('Could not refresh app files. Try again.');
      }
    });
  }

  const freshWebBtn = document.querySelector('#cbsgoOpenFreshWebBtn');
  if (freshWebBtn && !freshWebBtn.__cbsgoBound) {
    freshWebBtn.__cbsgoBound = true;
    freshWebBtn.addEventListener('click', () => {
      openFreshWebVersion();
      setMsg('Opening fresh web version…');
    });
  }

  const installAppBtn = document.querySelector('#cbsgoInstallAppBtn');
  if (installAppBtn && !installAppBtn.__cbsgoBound) {
    installAppBtn.__cbsgoBound = true;
    installAppBtn.addEventListener('click', () => {
      handleManualInstall();
    });
  }

  const deleteAccountBtn = document.querySelector('#cbsgoDeleteAccountBtn');
  const deleteAccountMsg = document.querySelector('#cbsgoDeleteAccountMsg');
  if (deleteAccountBtn && !deleteAccountBtn.__cbsgoBound) {
    deleteAccountBtn.__cbsgoBound = true;
    deleteAccountBtn.addEventListener('click', async () => {
      if (deleteAccountMsg) deleteAccountMsg.textContent = '';
      deleteAccountBtn.disabled = true;
      try {
        const result = await openDeleteAccountModal();
        if (result === 'deleted') {
          if (deleteAccountMsg) {
            deleteAccountMsg.textContent = 'Account deleted. Returning to login…';
          }
          window.location.reload();
          return;
        }
      } catch (e) {
        console.warn('CBS GO: delete account UI failed', e);
        if (deleteAccountMsg) {
          deleteAccountMsg.textContent = 'Could not open delete account. Try again.';
        }
      }
      deleteAccountBtn.disabled = false;
    });
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

    const avatarRaw = String(pick(fr, ['avatar', 'otherAvatar', 'other_avatar', 'pf', 'photo'], ''));

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
        background:rgba(255,248,235,.88); border:1px solid rgba(255,159,28,0.28);
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
                  class="friendCopyBtn cbsgo-btn-secondary"
                  data-wallet="${esc(fr.otherWallet || '')}"
                  data-code="${esc(code)}"
                  style="padding:3px 8px;font-size:10px;"
                >Copy</button>
                <button
                  type="button"
                  class="friendAcceptBtn cbsgo-friend-pill cbsgo-friend-pill--accept"
                  data-friend-id="${esc(String(fr.friendshipId || fr.id || ''))}"
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
            const nickLabel = esc(fr.nickname || 'Friend');
            const btnHtml = `
              <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
                <span class="cbsgo-friend-pill cbsgo-friend-pill--accepted cbsgo-friend-pill--compact">
                  ${icon('check', 12, { className: 'cbsgo-icon' })} Friend
                </span>
                <button
                  type="button"
                  class="friendCopyBtn cbsgo-btn-secondary"
                  data-wallet="${esc(fr.otherWallet || '')}"
                  data-code="${esc(code)}"
                  style="padding:3px 8px;font-size:10px;"
                >Copy</button>
                <button
                  type="button"
                  class="friendRemoveBtn cbsgo-btn-danger"
                  data-friend-id="${esc(String(fr.friendshipId || fr.id || ''))}"
                  data-friend-nick="${nickLabel}"
                >Remove</button>
              </div>
            `;
            return renderFriendRow(fr, btnHtml);
          })
          .join('');
      }

      ensureFriendsActionDelegation();
    } catch (e) {
      console.warn('CBS GO: refreshFriends failed', e);
      incomingListEl.textContent = 'Could not load friends.';
      acceptedListEl.textContent = '';
    }
  }

  cbsgoFriendsSetMsg = setFriendsMsg;
  cbsgoFriendsRefresh = refreshFriends;
  ensureFriendsActionDelegation();

  if (friendSendBtn && friendInput) {
    if (!friendSendBtn.__cbsgoBound) {
      friendSendBtn.__cbsgoBound = true;
      friendSendBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

      const value = friendInput.value.trim();
      if (!value) {
        showGameToast('Enter a Friend Code or wallet first.', { variant: 'info', iconName: 'friends' });
        return;
      }
      setFriendsMsg('');
      friendSendBtn.disabled = true;
      try {
        await sendFriendRequest(value);
        friendInput.value = '';
        setFriendsMsg('');
        showGameToast('Friend request sent.', { variant: 'success', iconName: 'friends' });
        await refreshFriends();
      } catch (e) {
        console.warn(e);
        const toast = friendSendToastFromError(e);
        setFriendsMsg('');
        showGameToast(toast.text, { variant: toast.variant, iconName: 'friends' });
      } finally {
        friendSendBtn.disabled = false;
      }
    });
    }
  }

  refreshFriends().catch(() => {});
}

// ---------- Bag ----------
function renderBag() {
  const tickets = getTickets();
  const cbs = getCbsCoins();
  const { cardTypes, cardTotal, sendable } = getBagCardStats();

  return renderBagPanel({
    tickets,
    cbs,
    cardTypes,
    cardTotal,
    sendable,
    canClaimMysteryBox: tickets >= 1000,
    canClaimCbsReward: cbs >= 1000,
    solPk: getLocalPublicKeySafe(),
  });
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
          setMsg('');
          showGameToast('Address copied to clipboard.', { variant: 'success', iconName: 'receive' });
        } else {
          showGameToast('Copy not supported in this browser.', { variant: 'error' });
        }
      } catch (e) {
        console.warn('CBS GO: copy sol wallet failed', e);
        showGameToast('Could not copy address.', { variant: 'error' });
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
    const claimMysteryBoxBtn = document.querySelector('#claimMysteryBoxBtn');
  const claimCbsRewardBtn = document.querySelector('#claimCbsRewardBtn');

  if (claimMysteryBoxBtn) {
    claimMysteryBoxBtn.onclick = () => {
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

      const ticketsNow = getTickets();
      if (ticketsNow < 1000) return;

      const ok = window.confirm(
        'Claim Mystery Box?\n\nThis will spend 1000 tickets and reset those tickets from your Bag.'
      );
      if (!ok) return;

      inventory.addTickets?.(-1000);

      window.dispatchEvent(
        new CustomEvent('cbsgo:tradePopup', {
          detail: {
            direction: 'received',
            fromNickname: 'Mystery Box',
            fromAvatar: '',
            tickets: 0,
            cbs: 0,
            cardId: null,
            cardQty: 0,
          },
        }),
      );

      setMsg('✅ Mystery Box claimed. Reward logic comes next.');
      updatePanel();
    };
  }

  if (claimCbsRewardBtn) {
    claimCbsRewardBtn.onclick = () => {
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

      const cbsNow = getCbsCoins();
      if (cbsNow < 1000) return;

      const ok = window.confirm(
        'Claim CBS Reward?\n\nThis will spend 1000 CBS play money from your Bag.'
      );
      if (!ok) return;

      inventory.addCbsCoins?.(-1000);

      setMsg('✅ CBS Reward claimed. Real reward logic comes next.');
      updatePanel();
    };
  }
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
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

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
        // ✅ Force remote to match the new bag state (after deduct)
        syncRemoteProfileSafe('gift-sent', true).catch(() => {});

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

  if (isGameplayAllowed()) pullIncomingGifts().catch(() => {});
  // ✅ Treasure open request -> write claim to Supabase
  if (!window.__cbsgo_treasure_claim_listener) {
    window.__cbsgo_treasure_claim_listener = true;

    window.addEventListener('cbsgo:treasureOpenRequest', async (ev) => {
      try {
        if (!isGameplayAllowed()) {
          ensureProfileSetup();
          return;
        }

        const treasureId = String(ev?.detail?.treasure_id || '').trim();
const lat = Number(ev?.detail?.center?.lat);
const lng = Number(ev?.detail?.center?.lng);

        if (!treasureId) return;

        // claimant = jouw Solana wallet (lokale CBS-GO wallet)
        const claimantWallet = (getLocalPublicKeySafe() || '').trim();
        if (!claimantWallet) {
          window.dispatchEvent(
            new CustomEvent('cbsgo:toast', { detail: { text: '⛔ No local wallet found (finish login).' } })
          );
          return;
        }

        // schrijf claim in Supabase (row-level update)
        const { error } = await supabase
          .from('treasures')
          .update({
            claimed_by_wallet: claimantWallet,
            claimed_at: new Date().toISOString(),
            claimed_lat: Number.isFinite(lat) ? lat : null,
            claimed_lng: Number.isFinite(lng) ? lng : null,
            status: 'active', // worker will atomically flip to processing
          })
          .eq('id', treasureId)
          .is('claimed_by_wallet', null) // only first claimant wins
          .eq('status', 'active');

        if (error) {
          console.warn('CBS-GO: treasure claim update failed', error);
          window.dispatchEvent(
            new CustomEvent('cbsgo:toast', { detail: { text: `⛔ Claim failed: ${error.message}` } })
          );
          return;
        }

        window.dispatchEvent(
          new CustomEvent('cbsgo:toast', { detail: { text: '✅ Treasure opened! Paying out…' } })
        );
      } catch (e) {
        console.warn('CBS-GO: treasure claim handler failed', e);
        window.dispatchEvent(
          new CustomEvent('cbsgo:toast', { detail: { text: '⛔ Claim failed (unexpected error).' } })
        );
      }
    });
  }
}

// ---------- Solana Wallet panel ----------
function renderWalletPanel() {
  const localSolPk = getLocalPublicKeySafe();
  const tickets = getTickets();
  const cbsPlay = getCbsCoins();

  if (!localSolPk) {
    return `
      <section class="cbsgo-wallet-panel">
        <div class="cbsgo-wallet-panel__header">
          ${icon('wallet', 24, { className: 'cbsgo-icon cbsgo-icon--panel' })}
          <div>
            <div class="cbsgo-wallet-panel__title">CBS-GO Wallet</div>
            <div class="cbsgo-wallet-panel__subtitle">No wallet unlocked yet</div>
          </div>
        </div>
        <p style="margin:0;font-size:12px;opacity:.85;">
          Finish login to unlock your Solana wallet.
        </p>
      </section>
    `;
  }

  const shortPk =
    localSolPk.length > 16
      ? `${localSolPk.slice(0, 6)}…${localSolPk.slice(-6)}`
      : localSolPk;

  const titleRow = (iconName, title, desc) => `
    <div class="cbsgo-wallet-section__head">
      <div class="cbsgo-wallet-section__icon">${icon(iconName, 18, { className: 'cbsgo-icon' })}</div>
      <div style="min-width:0;">
        <div class="cbsgo-wallet-section__title">${esc(title)}</div>
        <div class="cbsgo-wallet-section__desc">${esc(desc)}</div>
      </div>
    </div>
  `;

  const pillBtn = (id, label, primary = false) => `
    <button id="${id}" type="button" class="${primary ? 'cbsgo-btn-primary' : 'cbsgo-btn-secondary'}" style="padding:8px 12px;font-size:12px;white-space:nowrap;">
      ${esc(label)}
    </button>
  `;

  return `
    <section class="cbsgo-wallet-panel">
      <div class="cbsgo-wallet-panel__header">
        <div class="cbsgo-wallet-panel__brand">
          <div class="cbsgo-wallet-panel__logo">${icon('wallet', 26, { className: 'cbsgo-icon' })}</div>
          <div>
            <div class="cbsgo-wallet-panel__title">CBS-GO Wallet</div>
            <div class="cbsgo-wallet-panel__subtitle">Solana · local vault · ${esc(shortPk)}</div>
          </div>
        </div>
        <div class="cbsgo-wallet-panel__header-actions">
          ${pillBtn('walletCopyAddressBtn', 'Copy address', true)}
          ${pillBtn('walletRefreshOverviewBtn', 'Refresh balance', false)}
        </div>
      </div>

      <div class="cbsgo-wallet-asset-grid">
        <div class="cbsgo-wallet-asset-card cbsgo-wallet-asset-card--sol">
          <div class="cbsgo-wallet-asset-card__label">SOL</div>
          <div id="walletAssetSol" class="cbsgo-wallet-asset-card__value">—</div>
          <div class="cbsgo-wallet-asset-card__hint">On-chain</div>
        </div>
        <div class="cbsgo-wallet-asset-card">
          <div class="cbsgo-wallet-asset-card__label">CBS Play</div>
          <div class="cbsgo-wallet-asset-card__value">${esc(String(cbsPlay))}</div>
          <div class="cbsgo-wallet-asset-card__hint">In-game</div>
        </div>
        <div class="cbsgo-wallet-asset-card">
          <div class="cbsgo-wallet-asset-card__label">Tickets</div>
          <div class="cbsgo-wallet-asset-card__value">${esc(String(tickets))}</div>
          <div class="cbsgo-wallet-asset-card__hint">In-game</div>
        </div>
      </div>

      <div class="cbsgo-wallet-section cbsgo-wallet-section--receive">
        ${titleRow('receive', 'Receive', 'Share this address to receive SOL or SPL tokens.')}
        <div class="cbsgo-wallet-address-box">${esc(localSolPk)}</div>
        <div class="cbsgo-wallet-qr-placeholder" aria-hidden="true">
          <div class="cbsgo-wallet-qr-placeholder__frame">
            ${icon('wallet', 28, { className: 'cbsgo-icon' })}
          </div>
          <div class="cbsgo-wallet-qr-placeholder__text">Scan or paste address in Phantom / Solflare</div>
        </div>
        <div id="walletReceiveMsg" style="margin-top:8px;font-size:11px;opacity:.82;"></div>
      </div>

      <div class="cbsgo-wallet-section">
        ${titleRow('send', 'Send', 'Send SOL or SPL tokens from your local wallet on-chain.')}
        <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
          <div>
            <label for="walletSendToInput" style="font-size:11px;opacity:.8;">To address</label>
            <input id="walletSendToInput" placeholder="Paste Solana address" class="cbsgo-wallet-input" />
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="flex:1;min-width:120px;">
              <label for="walletSendAmountInput" style="font-size:11px;opacity:.8;">Amount</label>
              <input id="walletSendAmountInput" type="number" min="0" step="0.000000001" placeholder="0.01" class="cbsgo-wallet-input" />
            </div>

            <div style="width:160px;">
              <label for="walletSendTokenSelect" style="font-size:11px;opacity:.8;">Token</label>
              <select id="walletSendTokenSelect" class="cbsgo-wallet-input">
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
            <input id="walletSplMintInput" placeholder="Mint address" class="cbsgo-wallet-input" />
            <label style="font-size:11px;opacity:.8; margin-top:6px;">Token decimals</label>
            <input id="walletSplDecimalsInput" type="number" min="0" max="12" placeholder="e.g. 6" class="cbsgo-wallet-input" />
          </div>

          <div style="display:flex;justify-content:flex-end;">
            <button id="walletSendBtn" type="button" class="cbsgo-btn-primary" style="padding:9px 16px;font-size:12px;">Send</button>
          </div>

          <div id="walletSendMsg" style="font-size:11px;opacity:.82;">
            Select SOL or an SPL token to send on-chain.
          </div>
        </div>
      </div>

      <div class="cbsgo-wallet-section cbsgo-wallet-section--tokens">
        ${titleRow('trophy', 'Assets', 'Live on-chain balances for this wallet.')}
        <div id="walletOverviewStatus" style="font-size:11px;opacity:.8;margin-top:8px;">Loading wallet balances…</div>
        <div id="walletOverviewTotals" style="font-size:12px;margin-top:6px;"></div>

        <div style="margin-top:10px;overflow-x:auto;">
          <table class="cbsgo-wallet-token-table">
            <thead>
              <tr>
                <th>Token</th>
                <th style="text-align:right;">Balance</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody id="walletOverviewTableBody">
              <tr>
                <td colspan="3" style="padding:6px 4px;opacity:.7;">Fetching token accounts…</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <details class="cbsgo-wallet-advanced">
        <summary>Advanced · private key</summary>
        <div class="cbsgo-wallet-section cbsgo-wallet-section--danger">
          ${titleRow('error', 'Private key', 'Never share this. Anyone with it can move your funds.')}
          <div id="walletSecretMasked" class="cbsgo-wallet-secret-masked">${'•'.repeat(44)}</div>
          <div id="walletSecretRealWrap" style="display:none; margin-top:8px;">
            <div style="font-size:11px;opacity:.9;margin-bottom:6px;color:#fecaca;">Your Base58 private key:</div>
            <div id="walletSecretReal" class="cbsgo-wallet-secret-real"></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
            <button id="walletRevealSecretBtn" type="button" class="cbsgo-btn-danger">Reveal private key</button>
            <button id="walletCopySecretBtn" type="button" class="cbsgo-btn-secondary" disabled>Copy private key</button>
          </div>
          <div id="walletSecretMsg" style="font-size:11px;opacity:.9;margin-top:8px;color:#fecaca;"></div>
        </div>
      </details>
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
  const walletAssetSolEl = document.querySelector('#walletAssetSol');

  const setSendMsg = (t, isError = false) => {
    if (!sendMsgEl) return;
    sendMsgEl.innerHTML = t || '';
    sendMsgEl.style.color = isError ? '#b91c1c' : 'var(--cbsgo-text-muted, #6b5340)';
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
  let walletRpcDiagLogged = false;

  async function loadTokenOverview() {
    if (!overviewTableBody) return;

    if (!walletRpcDiagLogged) {
      logRpcEnvDiagnostics();
      walletRpcDiagLogged = true;
    }

    const owner = getLocalPublicKeySafe();
    const pkShort = owner && owner.length > 8 ? `${owner.slice(0, 4)}…${owner.slice(-4)}` : owner || '';

    if (!owner) {
      console.warn('[CBSGO wallet] load skipped — wallet public key missing');
      setOverviewStatus('Wallet public key missing.');
      if (walletAssetSolEl) walletAssetSolEl.textContent = '—';
      overviewTableBody.innerHTML = `<tr><td colspan="3" style="padding:6px 4px;opacity:.7;">No wallet.</td></tr>`;
      return;
    }

    console.info('[CBSGO wallet] load start', { walletPk: pkShort });

    setOverviewStatus('Loading wallet balances…');
    overviewTableBody.innerHTML = `
      <tr>
        <td style="padding:6px 4px;opacity:.7;" colspan="3">
          Fetching SOL + SPL token accounts…
        </td>
      </tr>
    `;
    if (overviewRefreshBtn) overviewRefreshBtn.disabled = true;

    try {
      const { sol, tokens, rpcUrl, rpcSource } = await fetchTokenOverview(owner);
      const sourceLabel = rpcSource || describeRpcSource(rpcUrl);
      console.info('[CBSGO wallet] load ok', {
        walletPk: pkShort,
        sol,
        splCount: tokens.length,
        rpcSource: sourceLabel,
      });
      setOverviewStatus('');

      if (walletAssetSolEl) {
        walletAssetSolEl.textContent = formatAmount(sol, 4);
      }

      if (overviewTotalsEl) {
        const tokenCount = tokens.length;
        overviewTotalsEl.textContent = `SOL: ${formatAmount(sol, 5)} · SPL tokens: ${tokenCount}`;
      }

      if (!tokens.length) {
        overviewTableBody.innerHTML = `
          <tr>
            <td style="padding:6px 4px;opacity:.7;" colspan="3">
              No SPL tokens found
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
      const reason = String(e?.message || 'Could not load wallet balances');
      console.error('[CBSGO wallet] load failed', {
        walletPk: pkShort,
        code: e?.code || '',
        message: reason,
        cause: e?.cause?.message || e?.cause || '',
      });
      setOverviewStatus(reason);
      if (walletAssetSolEl) walletAssetSolEl.textContent = '—';
      if (overviewTotalsEl) overviewTotalsEl.textContent = '';
      overviewTableBody.innerHTML = `
        <tr>
          <td style="padding:6px 4px;opacity:.7;" colspan="3">
            ${esc(reason)}. Tap Refresh balance to try again.
          </td>
        </tr>
      `;
    } finally {
      if (overviewRefreshBtn) overviewRefreshBtn.disabled = false;
    }
  }

  if (overviewRefreshBtn) {
    overviewRefreshBtn.onclick = () => {
      resetSolanaConnectionCache();
      loadTokenOverview().catch(() => {});
    };
  }
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
const REMOTE_SYNC_KEY = 'cbsgo_remote_synced_at_v1';

// local timestamp wanneer we voor het laatst remote hebben toegepast
function markRemoteApplied() {
  try {
    localStorage.setItem(REMOTE_SYNC_KEY, String(Date.now()));
  } catch {}
}

function getRemoteAppliedStamp() {
  try {
    return Number(localStorage.getItem(REMOTE_SYNC_KEY) || 0);
  } catch {
    return 0;
  }
}

// simpele lock zodat we niet tegelijk syncen
let __remoteSyncBusy = false;

// ---------- Remote profile sync ----------
async function syncRemoteProfileSafe(source = 'unknown', force = false) {
  if (__remoteSyncBusy) return;
  if (!force && !isGameplayAllowed()) return;
  __remoteSyncBusy = true;

  try {
    let authUserId = null;
    try {
      const { data } = await supabase.auth.getUser();
      authUserId = data?.user?.id || null;
    } catch {}

    if (!authUserId || !profileOwnerMatches({ userId: authUserId })) {
      console.warn('CBS GO: skip remote progress sync (ownership not proven)', {
        source,
        authUserId,
        localOwner: getProfileOwner()?.userId || null,
      });
      return;
    }

    // 1) Eerst remote lezen (deze is leidend na login)
    const remote = await loadRemoteProfile().catch(() => null);
    const remoteUpdatedAt = remote?.updated_at ? Date.parse(remote.updated_at) : 0;

    // 2) Als remote nieuwer is dan onze "remote applied" stamp, dan NIET overschrijven
    // (dit voorkomt dat device B met oude local values jouw remote reset)
    const appliedStamp = getRemoteAppliedStamp();

    if (!force && remoteUpdatedAt && remoteUpdatedAt > appliedStamp) {
      // Remote is nieuwer dan wat wij lokaal als “remote toegepast” beschouwen.
      // Skip om overwrites te voorkomen.
      console.log('CBS-GO: skip remote sync (remote newer)', { source, remoteUpdatedAt, appliedStamp });
      return;
    }

    // 3) Bouw payload vanuit local (never write email to game_profiles)
    const wallet_pk = getLocalPublicKeySafe() || null;

    const localNick = normalizePlayerNickname(getPlayerName());
    const remoteNick = normalizePlayerNickname(remote?.nickname);
    const nickname = localNick || remoteNick || null;
    const avatar = getPlayerAvatar() || null;

    const xp = getXp();
    const level = getLevel();
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

    const { data: savedRemote } = await saveRemoteProfile(payload);
    if (savedRemote) {
      markRemoteApplied();
    }
  } catch (e) {
    console.warn('CBS GO: syncRemoteProfileSafe failed from', source, e);
  } finally {
    __remoteSyncBusy = false;
  }
}

// ---------- Panel router ----------
function renderPanel() {
  const t = getSelectedTab();
  if (t === 'profile') return panelWrap('Profile', `<div id="profileMount">${renderProfile()}</div>`);
  if (t === 'bag') return panelWrap('Adventure Bag', `<div id="bagMount">${renderBag()}</div>`);
  if (t === 'wallet') return panelWrap('CBS-GO Wallet', `<div id="walletMount">${renderWalletPanel()}</div>`);
  if (t === 'leaderboard') return panelWrap('Leaderboard', `<div id="lbMount">${renderLeaderboardPanel()}</div>`);
  return '';
}

// ---------- Hoofd shell ----------
export function renderAppShell() {
  return `
    <div class="app-shell cbsgo-map-shell cbsgo-app-shell">
      <!-- Map -->
      <div id="mapMount" class="cbsgo-map-shell" style="position:absolute; inset:0; z-index:1;">
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
        <div id="xpMount" class="cbsgo-xp-hud">
          ${renderXpBar()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag + Wallet -->
      <div id="fabNav" class="cbsgo-fab-nav">
        <button type="button" data-panel="profile" class="cbsgo-hud-btn" title="Profile">
          ${icon('profile', 26, { className: 'cbsgo-icon' })}
        </button>

        <button type="button" data-panel="bag" class="cbsgo-hud-btn" title="Bag">
          ${icon('bag', 26, { className: 'cbsgo-icon' })}
        </button>

        <button type="button" data-panel="wallet" class="cbsgo-hud-btn cbsgo-hud-btn--wallet" title="Wallet">
          ${icon('wallet', 26, { className: 'cbsgo-icon' })}
        </button>
      </div>

          <!-- Panel-root -->
      <div id="panelRoot">
        ${renderPanel()}
      </div>

      <!-- Dev panel (only useful when dev button exists) -->
      <div id="devPanelRoot" style="
        position:fixed;
        right:12px;
        bottom:190px;
        z-index:6500;
        display:none;
        width:min(360px, 92vw);
        border-radius:18px;
        border:1px solid rgba(255, 159, 28,.45);
        background:linear-gradient(165deg,#fffbf3,#ffe9b8); color:#3d2a10;
        box-shadow:0 18px 60px rgba(0,0,0,.6);
        overflow:hidden;
      ">
        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:8px;
          padding:10px 12px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-size:13px;font-weight:800;color:#7dd3fc;">DEV PANEL</div>
          <button id="devPanelCloseBtn" type="button" style="
            padding:6px 10px;
            border-radius:999px;
            border:1px solid rgba(255,159,28,.14);
            background:rgba(255,255,255,.08);
            color:#3d2a10;
            font-size:11px;
            cursor:pointer;
          ">Close</button>
        </div>

       <div id="devPanelBody" style="
  padding:12px;
  font-size:12px;
  color:#e5e7eb;
  line-height:1.45;
">
  ${renderDevPanelBody()}
</div>
      </div>

      <!-- Toast -->
      <div id="cbsgoToastHost" class="cbsgo-toast-host"></div>

      <!-- Loot / trade overlay -->
      <div id="cbsgoLootOverlayHost" style="
        position:fixed;
        inset:0;
        z-index:8000;
        pointer-events:none;
      "></div>

${
  isDev()
    ? `
      <button id="resetBtn" type="button" style="
        position:fixed;
        right:12px;
        bottom:220px;
        z-index:6000;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(255,159,28,.14);
        background:rgba(0,0,0,.35);
        color:#3d2a10;
      ">Reset Demo</button>

      <button id="devPanelBtn" type="button" style="
        position:fixed;
        right:12px;
        bottom:140px;
        z-index:6000;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(255, 159, 28,.6);
        background:rgba(255,248,235,.94); border:1px solid rgba(255,159,28,0.35);
        color:#7dd3fc;
        font-weight:700;
      ">DEV</button>
      `
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
  if (t === 'leaderboard') bindLeaderboardPanel();
  const close = document.querySelector('#cbsgoClosePanel');
  if (close) {
    close.addEventListener('click', () => {
      if (!isGameplayAllowed()) {
        showProfileSetupMessage();
        return;
      }
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

      if (panel !== 'profile' && !isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

      if (current === panel) {
        if (!isGameplayAllowed()) {
          ensureProfileSetup();
          return;
        }
        setSelectedTab('map');
      } else {
        setSelectedTab(panel || 'map');
      }
      updatePanel();
    });
  });

  // ✅ Klik op XP box rechtsboven => open Leaderboard
  const xp = document.querySelector('#xpMount');
  if (xp && !xp.__lbBound) {
    xp.__lbBound = true;
    xp.style.cursor = 'pointer';
    xp.title = 'Open leaderboard (XP)';
    xp.addEventListener('click', () => {
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

      const current = getSelectedTab();
      if (current === 'leaderboard') setSelectedTab('map');
      else setSelectedTab('leaderboard');
      updatePanel();
    });
  }
// ---------- DEV panel toggle ----------
const devBtn = document.querySelector('#devPanelBtn');
const devPanel = document.querySelector('#devPanelRoot');
const devClose = document.querySelector('#devPanelCloseBtn');

if (devBtn && devPanel) {
  devBtn.addEventListener('click', () => {
    if (devPanel.style.display === 'none' || !devPanel.style.display) {
      devPanel.style.display = 'block';
bindDevPanelButtons();
    } else {
      devPanel.style.display = 'none';
    }
  });
}

if (devClose && devPanel) {
  devClose.addEventListener('click', () => {
    devPanel.style.display = 'none';
  });
}
}


// ---------- Trade popup ----------
function showTradePopup(detail) {
  const host = document.querySelector('#cbsgoLootOverlayHost');
  if (!host) return;

  const {
    direction = 'received',
    fromNickname,
    fromAvatar,
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
  wrap.style.background = 'rgba(61,42,16,0.42)';
  wrap.style.pointerEvents = 'auto';

  const card = document.createElement('div');
  card.style.width = 'min(320px, 90vw)';
  card.style.borderRadius = '22px';
  card.style.border = '1px solid rgba(255, 159, 28,.85)';
  card.style.background = 'linear-gradient(165deg,#fffbf3 0%,#ffe9b8 100%)';
  card.style.boxShadow = '0 24px 80px rgba(0,0,0,.88)';
  card.style.padding = '18px 16px 14px 16px';
  card.style.color = '#3d2a10';
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

  let fromHtml = '';
  if (direction === 'sent') {
    fromHtml = `
      <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
        Sent by <b>${esc(meName)}</b>
      </div>
    `;
  } else {
    fromHtml = `
      <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
        From <b>${esc(fromNickname || 'Friend')}</b>
      </div>
    `;
  }

  let avatarHtml = '';
  if (direction === 'sent') {
    avatarHtml = `
      <div style="
        width:40px;height:40px;border-radius:999px;
        border:1px solid rgba(255, 159, 28,.45);
        background:rgba(255, 159, 28,.12);
        display:flex;align-items:center;justify-content:center;
      ">
        ${icon('chest', 22, { className: 'cbsgo-icon' })}
      </div>
    `;
  } else {
    avatarHtml = avatarCircle(fromAvatar || '', 40);
  }

  const infoLine =
    direction === 'sent'
      ? 'Your gift has been sent successfully.'
      : 'This gift has been added to your Bag.';

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
      ${esc(infoLine)}
    </div>

    <button type="button" id="cbsgoTradePopupCloseBtn" class="cbsgo-btn-primary" style="width:100%;margin-top:4px;">
      Collect
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
  sanitizeStoredNickname();
  sanitizeStoredEmail();
  initGameToastListener();

  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  initViewportLayout();
  initLeaveGuard();

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
  // ✅ Keep remote profile in sync with local inventory/bag changes (debounced)
  if (!window.__cbsgo_remote_sync_listeners) {
    window.__cbsgo_remote_sync_listeners = true;

    let t = null;
    const schedule = (source) => {
      try {
        if (t) clearTimeout(t);
        t = setTimeout(() => {
          syncRemoteProfileSafe(source);
        }, 500);
      } catch (e) {
        console.warn('CBS GO: schedule remote sync failed', e);
      }
    };

    // When tickets/CBS change (send/receive gifts)
    window.addEventListener('cbsgo:inventoryChanged', () => schedule('inventoryChanged'));
    // When cards change (you already dispatch bagChanged after card send)
    window.addEventListener('cbsgo:bagChanged', () => schedule('bagChanged'));

  // Optional extra safety: after receiving gifts popup event
window.addEventListener('cbsgo:friendGiftReceived', () => schedule('friendGiftReceived'));

window.addEventListener('cbsgo:friendGiftReceived', (ev) => {
  const d = ev?.detail || {};

  window.dispatchEvent(
    new CustomEvent('cbsgo:tradePopup', {
      detail: {
        direction: 'received',
        fromNickname: d.senderNickname || '',
        fromAvatar: d.senderAvatar || '',
        toWallet: d.toWallet || '',
        tickets: Number(d.tickets || 0),
        cbs: Number(d.cbs || 0),
        cardId: d.cardId || null,
        cardQty: Number(d.cardQty || 0),
      },
    }),
  );
});
}
  bindUi();
  bindMapView();
  bindTreasureClaimListener();

  if (!window.__cbsgo_nickname_required_listener) {
    window.__cbsgo_nickname_required_listener = true;
    window.addEventListener('cbsgo:nicknameRequired', () => {
      ensureProfileSetup();
    });
    window.addEventListener('cbsgo:profileSetupRequired', () => {
      ensureProfileSetup();
    });
  }

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
  ensureProfileSetup();

  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', hardResetCBSGO);
  }

  if (!window.__cbsgo_openNode_listener) {
    window.__cbsgo_openNode_listener = true;

    window.addEventListener('cbsgo:openNode', (ev) => {
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

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
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

      const id = ev?.detail?.id;
      if (!id) return;
      import('../app/state.js').then(({ completeNode }) => {
        completeNode(id);
        mountApp();
      });
    });
  }

  if (isGameplayAllowed()) pullIncomingGifts().catch(() => {});
}

// ---------- Mount + login/PIN flow ----------
export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  // ---------- Loading overlay (local helper) ----------
  const LOADER_ID = 'cbsgoLoginLoadingOverlay';
  const ensureLoader = () => {
    let el = document.getElementById(LOADER_ID);
    if (el) return el;

    el = document.createElement('div');
    el.id = LOADER_ID;
    el.style.position = 'fixed';
    el.style.inset = '0';
    el.style.zIndex = '99999';
    el.style.background = 'rgba(5,7,11,0.92)';
    el.style.backdropFilter = 'blur(10px)';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.padding = '24px';
    el.style.color = '#fff';
    el.style.fontFamily = 'system-ui, sans-serif';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.style.transition = 'opacity .18s ease-out';

    el.innerHTML = `
      <div style="
        width:min(420px, 92vw);
        border-radius:22px;
        border:1px solid rgba(255, 159, 28,.55);
        background:rgba(255,248,235,.92);
        box-shadow:0 24px 80px rgba(0,0,0,.75);
        padding:18px 16px;
      ">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="cbsgo-game-modal__icon">${icon('compass', 24, { className: 'cbsgo-icon' })}</div>
          <div style="min-width:0;">
            <div style="font-size:15px;font-weight:900;margin-bottom:2px;">
              Preparing CBS-GO…
            </div>
            <div id="cbsgoLoginLoadingText" style="font-size:12px;opacity:.85;line-height:1.35;">
              Loading your world
            </div>
          </div>
        </div>

        <div style="margin-top:14px;height:8px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.10);">
          <div id="cbsgoLoginLoadingBar" style="
            height:100%;
            width:35%;
            border-radius:999px;
            background:rgba(255, 159, 28,.75);
            box-shadow:0 0 22px rgba(255, 159, 28,.45);
            animation:cbsgoLoadAnim 1.05s ease-in-out infinite alternate;
          "></div>
        </div>

        <style>
          @keyframes cbsgoLoadAnim {
            from { transform: translateX(-10%); width: 30%; opacity: .75; }
            to   { transform: translateX(10%);  width: 70%; opacity: 1; }
          }
        </style>
      </div>
    `;

    document.body.appendChild(el);
    return el;
  };

  const setLoadingText = (t) => {
    const txt = document.getElementById('cbsgoLoginLoadingText');
    if (txt) txt.textContent = t || '';
  };

  const showLoading = (t) => {
    const el = ensureLoader();
    setLoadingText(t || 'Loading your world');
    el.style.pointerEvents = 'auto';
    requestAnimationFrame(() => {
      el.style.opacity = '1';
    });
  };

  const hideLoading = () => {
    const el = document.getElementById(LOADER_ID);
    if (!el) return;
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    setTimeout(() => {
      try {
        el.remove();
      } catch {}
    }, 220);
  };

  openLoginModal();

  const onLoginDone = async (ev) => {
    window.removeEventListener('cbsgo:loginDone', onLoginDone);

    const pin = ev?.detail?.pin || '';
    const loginEmail = String(ev?.detail?.email || '').trim();
    if (loginEmail && isValidEmail(loginEmail)) {
      setPlayerEmail(loginEmail);
    }

    // ✅ show loader immediately after PIN submit
    showLoading('Unlocking wallet & syncing profile…');

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
      hideLoading();
      alert('Wallet unlock failed (wrong PIN?)');
      openLoginModal();
      window.addEventListener('cbsgo:loginDone', onLoginDone);
      return;
    }

    // 2) auth user + email seed
    let authUser = null;
    try {
      const { data } = await supabase.auth.getUser();
      authUser = data?.user || null;
      const authEmail = String(authUser?.email || '').trim();
      if (authEmail && isValidEmail(authEmail) && !getPlayerEmail()) {
        setPlayerEmail(authEmail);
      }
    } catch {}

    const walletPk = getLocalPublicKeySafe() || null;

    console.log('[CBSGO PROFILE DEBUG] login session', {
      email: authUser?.email || '',
      userId: authUser?.id || '',
      walletPk: walletPk || '',
    });

    setProfileGateContext({ authUser, walletPk });

    // 3) Supabase profile is source of truth — apply or clear local cache
    let applyResult = { applied: false, clearedLocalProfile: false };
    try {
      setLoadingText('Applying cloud profile…');
      applyResult = await applyRemoteProfileToLocal({
        preferRemote: true,
        userId: authUser?.id || null,
      });
    } catch (e) {
      console.warn('CBS-GO: applyRemoteProfileToLocal failed', e);
    }

    console.log('[CBSGO PROFILE DEBUG] remote apply', {
      remoteProfileFound: !!applyResult.applied,
      localProfileCleared: !!applyResult.clearedLocalProfile,
      reason: applyResult.reason || '',
    });

    markRemoteApplied();

    // 4) profile onboarding when incomplete (never trust stale localStorage without owner match)
    const profileReady = isProfileComplete({ authUser, walletPk });

    if (!profileReady) {
      hideLoading();
      try {
        await openProfileOnboardingModal({
          authUser,
          walletPk,
          initialNickname: getPlayerName(),
          initialAvatar: getPlayerAvatar(),
          onSave: saveOnboardingProfile,
        });
      } catch (e) {
        console.warn('CBS-GO: profile onboarding failed', e);
        hideLoading();
        alert('Profile setup is required before playing.');
        openLoginModal();
        window.addEventListener('cbsgo:loginDone', onLoginDone);
        return;
      }
      setProfileGateContext({ authUser, walletPk });
      showLoading('Starting CBS-GO…');
    }

    // 5) bind account row (after profile complete)
    try {
      setLoadingText('Binding your account…');
      await ensureSupabaseUserBound();
    } catch {}

    // 6) start game
    setLoadingText('Starting CBS-GO…');
    bootstrapApp();

    // ✅ WAIT until the app is really ready (map + top UI + optional weather)
    const waitForCondition = (fn, timeoutMs = 12000, intervalMs = 80) =>
      new Promise((resolve, reject) => {
        const start = Date.now();
        const tick = () => {
          try {
            if (fn()) return resolve(true);
          } catch {}
          if (Date.now() - start > timeoutMs) return reject(new Error('timeout'));
          setTimeout(tick, intervalMs);
        };
        tick();
      });

    const waitForAppReady = async () => {
      // 1) Map mounted (canvas exists) — MapLibre typically creates a canvas
      await waitForCondition(() => {
        const mapMount = document.querySelector('#mapMount');
        if (!mapMount) return false;
        const canvas = mapMount.querySelector('canvas');
        return !!canvas;
      }, 15000);

      // 2) XP bar mounted (top-right)
      await waitForCondition(() => {
        const xp = document.querySelector('#xpMount');
        return !!xp && (xp.textContent || '').trim().length > 0;
      }, 12000);

      // 3) Map controls mounted (top-left)
      await waitForCondition(() => !!document.querySelector('#cbsgoWorldBtn'), 8000);

// end waitForAppReady
};

try {
  setLoadingText('Loading map & live widgets…');
  await waitForAppReady();
} catch (e) {
  console.warn('CBS-GO: app ready wait timed out (continuing)', e);
}

hideLoading();
showGameIntroIfNeeded();
scheduleInstallPromptIfNeeded();
}; // ✅ end onLoginDone

window.addEventListener('cbsgo:loginDone', onLoginDone);
}

function bindTreasureClaimListener() {
  if (window.__cbsgo_treasure_claim_listener) return;
  window.__cbsgo_treasure_claim_listener = true;

  // maak/haal supabase client uit je app (werkt met VITE env vars)
  const getSupabaseClient = async () => {
    // als je al ergens een global client hebt, gebruik die
    if (window.supabase) return window.supabase;
    if (window.__supabase) return window.__supabase;

    // anders: maak er 1 aan vanuit Vite env
    const { createClient } = await import('@supabase/supabase-js');
    const url = import.meta.env.VITE_SUPABASE_URL;
    const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !anon) throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
    const client = createClient(url, anon);
    window.__supabase = client;
    return client;
  };

  window.addEventListener('cbsgo:treasureOpenRequest', async (ev) => {
    try {
      if (!isGameplayAllowed()) {
        ensureProfileSetup();
        return;
      }

      const detail = ev?.detail || {};
      const treasure_id = String(detail.treasure_id || '').trim();
      const claimant_wallet = String(detail.claimant_wallet || '').trim();
      const distance_m = Number(detail.distance_m || 0);

      if (!treasure_id || !claimant_wallet) {
        console.warn('CBSGO: treasureOpenRequest missing data', detail);
        return;
      }

      console.log('CBSGO: claiming treasure in Supabase...', { treasure_id, claimant_wallet });

      const supabase = await getSupabaseClient();

      // claim: alleen als status nog 'active' is
      // (RLS / policy moet dit toestaan voor ingelogde user)
      const patch = {
        status: 'processing',
        claimant_wallet,
        claimed_at: new Date().toISOString(),
        // claimed_by vullen we liever server-side via auth.uid(),
        // maar als jouw tabel trigger/policy dat al doet is dit ok.
      };

      const { data, error } = await supabase
        .from('treasures')
        .update(patch)
        .eq('id', treasure_id)
        .eq('status', 'active')
        .select('*')
        .maybeSingle();

      if (error) {
        console.warn('CBSGO: claim update failed', error);
        alert(`Treasure claim failed: ${error.message}`);
        return;
      }

      if (!data) {
        // niks geüpdatet = al geclaimd / niet active
        alert('Too late — this treasure is already claimed.');
        return;
      }

      console.log('CBSGO: treasure claimed, worker will pay now', data);
      alert('✅ Treasure claim sent. Payout will arrive shortly (if you are the first).');
    } catch (e) {
      console.warn('CBSGO: claim handler crashed', e);
      alert(`Treasure claim error: ${e?.message || e}`);
    }
  });
}