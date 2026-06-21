// src/app/applyRemoteProfile.js
// Supabase game_profiles is source of truth for nickname/avatar.
// localStorage is device cache only — never merge stale local profile on login.

import { getCurrentUserId, loadRemoteProfile } from './remoteProfile.js';
import {
  normalizePlayerEmail,
  normalizePlayerNickname,
  sanitizeStoredEmail,
  sanitizeStoredNickname,
  clearOwnedLocalProfile,
  setProfileOwner,
} from './playerNickname.js';

const STATE_KEY = 'cbsgo_state_v6';
const INV_KEY = 'cbsgo_inventory_v2';
const CARDS_KEY = 'cbsgo_cards_v1';

const KEY_NAME = 'cbsgo_player_name_v2';
const KEY_AVATAR = 'cbsgo_player_avatar_v2';
const KEY_EMAIL = 'cbsgo_player_email_v1';

function safeJsonParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

function loadLocalState() {
  const raw = localStorage.getItem(STATE_KEY);
  return safeJsonParse(raw, { xp: 0, completed: {}, updatedAt: Date.now() });
}

function loadLocalInventory() {
  const raw = localStorage.getItem(INV_KEY);
  return safeJsonParse(raw, {
    tickets: 0,
    cbs: 0,
    cards: {},
    updatedAt: 0,
  });
}

function saveStateXp(xp) {
  const s = loadLocalState();
  s.xp = Number(xp || 0);
  s.updatedAt = Date.now();
  localStorage.setItem(STATE_KEY, JSON.stringify(s));
}

function saveInventory(tickets, cbs, cardsObj, updatedAt = null) {
  const inv = {
    tickets: Number(tickets || 0),
    cbs: Number(cbs || 0),
    cards: cardsObj && typeof cardsObj === 'object' ? { ...cardsObj } : {},
    updatedAt:
      Number.isFinite(Number(updatedAt)) && Number(updatedAt) > 0
        ? Number(updatedAt)
        : Date.now(),
  };

  localStorage.setItem(INV_KEY, JSON.stringify(inv));

  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
}

function saveCardsV1FromCardsObj(cardsObj) {
  const safe = {
    counts: cardsObj && typeof cardsObj === 'object' ? { ...cardsObj } : {},
  };
  localStorage.setItem(CARDS_KEY, JSON.stringify(safe));

  window.dispatchEvent(
    new CustomEvent('cbsgo:bagChanged', {
      detail: { cards: { ...(safe.counts || {}) } },
    }),
  );
}

function setLocalNicknameAvatarEmail(nickname, avatar, email) {
  try {
    const validNick = normalizePlayerNickname(nickname);
    if (validNick) localStorage.setItem(KEY_NAME, validNick);
    else localStorage.removeItem(KEY_NAME);
    const validEmail = normalizePlayerEmail(email);
    if (validEmail) localStorage.setItem(KEY_EMAIL, validEmail);
    else localStorage.removeItem(KEY_EMAIL);
    if (typeof avatar === 'string' && avatar.trim()) {
      localStorage.setItem(KEY_AVATAR, String(avatar));
    } else {
      localStorage.removeItem(KEY_AVATAR);
    }
  } catch {}
}

/**
 * Load game_profiles for active user_id into localStorage cache.
 * No remote row => clear local nickname/avatar/owner (Supabase is truth).
 */
export async function applyRemoteProfileToLocal({ preferRemote = true, userId: userIdOverride } = {}) {
  const userId = userIdOverride || (await getCurrentUserId());
  if (!userId) return { applied: false, reason: 'no-auth', clearedLocalProfile: false };

  const remote = await loadRemoteProfile(userId);

  if (!remote) {
    clearOwnedLocalProfile();
    return { applied: false, reason: 'no-remote-row', clearedLocalProfile: true };
  }

  if (!preferRemote) return { applied: false, reason: 'preferRemote=false', clearedLocalProfile: false };

  const remoteXp = Number(remote.xp || 0);
  const remoteTickets = Number(remote.tickets || 0);
  const remoteCbs = Number(remote.cbs_play || 0);

  const remoteEmail = normalizePlayerEmail(remote?.email);

  const remoteNicknameRaw =
    typeof remote.nickname === 'string' && remote.nickname.trim()
      ? remote.nickname.trim()
      : '';
  const remoteNickname = normalizePlayerNickname(remoteNicknameRaw);

  const remoteAvatar =
    typeof remote.avatar === 'string' && remote.avatar.trim()
      ? remote.avatar.trim()
      : '';

  const remoteCards =
    remote.cards_json && typeof remote.cards_json === 'object'
      ? remote.cards_json
      : {};

  const localState = loadLocalState();
  const localXp = Number(localState.xp || 0);
  const mergedXp = Math.max(localXp, remoteXp);

  const localInv = loadLocalInventory();
  const localInvUpdatedAt = Number(localInv.updatedAt || 0);

  const remoteUpdatedAt = remote?.updated_at ? Date.parse(remote.updated_at) : 0;
  const remoteIsNewerForInventory = remoteUpdatedAt > localInvUpdatedAt;

  const mergedTickets = remoteIsNewerForInventory
    ? Number(remoteTickets || 0)
    : Number(localInv.tickets || 0);

  const mergedCbs = remoteIsNewerForInventory
    ? Number(remoteCbs || 0)
    : Number(localInv.cbs || 0);

  const mergedCards = remoteIsNewerForInventory
    ? (remoteCards && typeof remoteCards === 'object' ? { ...remoteCards } : {})
    : (localInv.cards && typeof localInv.cards === 'object' ? { ...localInv.cards } : {});

  const inventoryStamp = remoteIsNewerForInventory ? remoteUpdatedAt : localInvUpdatedAt;

  // Nickname/avatar/email: Supabase row only — no localStorage fallback.
  const finalNickname = remoteNickname || '';
  const finalAvatar = remoteAvatar || '';
  const finalEmail = remoteEmail || '';

  saveStateXp(mergedXp);
  saveInventory(mergedTickets, mergedCbs, mergedCards, inventoryStamp);
  saveCardsV1FromCardsObj(mergedCards);
  setLocalNicknameAvatarEmail(finalNickname, finalAvatar, finalEmail);
  setProfileOwner({
    userId: remote.user_id || userId,
    walletPk: remote.wallet_pk || null,
  });
  sanitizeStoredNickname();
  sanitizeStoredEmail();

  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: mergedXp } }));
  window.dispatchEvent(
    new CustomEvent('cbsgo:profileChanged', {
      detail: { nickname: finalNickname, avatar: finalAvatar, email: finalEmail },
    }),
  );

  return {
    applied: true,
    clearedLocalProfile: false,
    source: remoteIsNewerForInventory ? 'remote-authoritative-inventory' : 'local-newer-inventory',
    merged: {
      xp: mergedXp,
      tickets: mergedTickets,
      cbs: mergedCbs,
      cardsCount: Object.keys(mergedCards || {}).length,
      nickname: !!finalNickname,
      avatar: !!finalAvatar,
      email: !!finalEmail,
      remoteUpdatedAt,
      localInvUpdatedAt,
      remoteIsNewerForInventory,
    },
  };
}
