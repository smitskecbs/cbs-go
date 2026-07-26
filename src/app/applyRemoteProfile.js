// src/app/applyRemoteProfile.js
// Supabase game_profiles is source of truth for authenticated account progress.
// localStorage is device cache only — never inherit another user's progress.

import { getCurrentUserId, loadRemoteProfile } from './remoteProfile.js';
import { hardResetState } from './state.js';
import { resetInventory } from './inventory.js';
import {
  normalizePlayerEmail,
  normalizePlayerNickname,
  sanitizeStoredEmail,
  sanitizeStoredNickname,
  clearOwnedLocalProfile,
  getProfileOwner,
  setProfileOwner,
} from './playerNickname.js';

const STATE_KEY = 'cbsgo_state_v6';
const INV_KEY = 'cbsgo_inventory_v2';
const CARDS_KEY = 'cbsgo_cards_v1';
const LB_KEY = 'cbsgo_leaderboard_v2';

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

function saveStateXp(xp) {
  const raw = localStorage.getItem(STATE_KEY);
  const s = safeJsonParse(raw, { xp: 0, completed: {}, updatedAt: Date.now() });
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
 * Reset account-bound gameplay progress on this device.
 * Preserves non-progress settings (theme, sound, share-location, etc.).
 */
export function resetLocalGameplayProgress() {
  hardResetState();
  resetInventory();
  try {
    localStorage.removeItem(LB_KEY);
  } catch {}
}

/**
 * Load game_profiles for active user_id into localStorage cache.
 * No remote row => clear cosmetics; reset progress when ownership does not match.
 * Remote row => remote progress is authoritative (no foreign-local inflation).
 */
export async function applyRemoteProfileToLocal({ preferRemote = true, userId: userIdOverride } = {}) {
  const userId = userIdOverride || (await getCurrentUserId());
  if (!userId) return { applied: false, reason: 'no-auth', clearedLocalProfile: false };

  const remote = await loadRemoteProfile(userId);
  const ownerBefore = getProfileOwner();
  const ownerMatches =
    !!ownerBefore.userId && String(ownerBefore.userId) === String(userId);

  if (!remote) {
    clearOwnedLocalProfile();

    let resetProgress = false;
    if (!ownerMatches) {
      resetLocalGameplayProgress();
      resetProgress = true;
      console.warn('[CBSGO ownership] reset local progress for new/mismatched account', {
        authUserId: userId,
        previousOwner: ownerBefore.userId || null,
      });
    }

    // Own the clean local session only after any reset.
    setProfileOwner({ userId, walletPk: null });

    return {
      applied: false,
      reason: 'no-remote-row',
      clearedLocalProfile: true,
      resetProgress,
    };
  }

  if (!preferRemote) {
    return { applied: false, reason: 'preferRemote=false', clearedLocalProfile: false };
  }

  // Authenticated session: remote progress is authoritative.
  const remoteXp = Number(remote.xp || 0);
  const remoteTickets = Number(remote.tickets || 0);
  const remoteCbs = Number(remote.cbs_play || 0);
  const remoteCards =
    remote.cards_json && typeof remote.cards_json === 'object'
      ? remote.cards_json
      : {};
  const remoteUpdatedAt = remote?.updated_at ? Date.parse(remote.updated_at) : 0;

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

  if (!ownerMatches) {
    // Drop any foreign local residue before writing remote values.
    resetLocalGameplayProgress();
    console.warn('[CBSGO ownership] replaced foreign local progress with remote profile', {
      authUserId: userId,
      previousOwner: ownerBefore.userId || null,
      remoteXp,
    });
  }

  saveStateXp(remoteXp);
  // completed nodes are local-only; hardReset cleared them on ownership mismatch.
  // When owner already matched, saveStateXp preserves completed while applying remote XP.
  saveInventory(remoteTickets, remoteCbs, remoteCards, remoteUpdatedAt || Date.now());
  saveCardsV1FromCardsObj(remoteCards);
  setLocalNicknameAvatarEmail(remoteNickname, remoteAvatar, remoteEmail);
  setProfileOwner({
    userId: remote.user_id || userId,
    walletPk: remote.wallet_pk || null,
  });
  sanitizeStoredNickname();
  sanitizeStoredEmail();

  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: remoteXp } }));
  window.dispatchEvent(
    new CustomEvent('cbsgo:profileChanged', {
      detail: { nickname: remoteNickname || '', avatar: remoteAvatar || '', email: remoteEmail || '' },
    }),
  );

  return {
    applied: true,
    clearedLocalProfile: false,
    source: 'remote-authoritative',
    merged: {
      xp: remoteXp,
      tickets: remoteTickets,
      cbs: remoteCbs,
      cardsCount: Object.keys(remoteCards || {}).length,
      nickname: !!remoteNickname,
      avatar: !!remoteAvatar,
      email: !!remoteEmail,
      remoteUpdatedAt,
      ownerMatched: ownerMatches,
    },
  };
}
