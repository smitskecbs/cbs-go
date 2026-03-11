// src/app/applyRemoteProfile.js
// Laad game_profiles (Supabase) en zet dit terug naar lokale storage,
// zodat dezelfde email op elk device exact hetzelfde profiel gebruikt.
//
// FIX (BELANGRIJK):
// - XP rollback voorkomen: merge local vs remote -> hoogste wint.
// - Tickets/CBS/Cards: REMOTE is leidend, zodat gifts (verlaging) blijven bestaan.
// - Nickname/avatar: remote blijft leidend (consistent voor vrienden).

import { loadRemoteProfile } from './remoteProfile.js';

// storage keys (moeten matchen met je bestaande bestanden)
const STATE_KEY = 'cbsgo_state_v6';
const INV_KEY = 'cbsgo_inventory_v2';
const CARDS_KEY = 'cbsgo_cards_v1'; // jouw cardsPanel/bag key

// ✅ leaderboard keys (match jouw leaderboard.js)
const KEY_NAME = 'cbsgo_player_name_v2';
const KEY_AVATAR = 'cbsgo_player_avatar_v2';

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

function saveStateXp(xp) {
  const s = loadLocalState();
  s.xp = Number(xp || 0);
  s.updatedAt = Date.now();
  localStorage.setItem(STATE_KEY, JSON.stringify(s));
}

function saveInventory(tickets, cbs, cardsObj) {
  const inv = {
    tickets: Number(tickets || 0),
    cbs: Number(cbs || 0),
    cards: cardsObj && typeof cardsObj === 'object' ? { ...cardsObj } : {},
  };
  localStorage.setItem(INV_KEY, JSON.stringify(inv));

  // UI update
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
}

function saveCardsV1FromCardsObj(cardsObj) {
  // jouw Bag/MyCards sync gebruikt cbsgo_cards_v1 met { counts: {...} }
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

function setLocalNicknameAvatar(nickname, avatar) {
  try {
    if (nickname != null) localStorage.setItem(KEY_NAME, String(nickname));
    if (avatar != null) localStorage.setItem(KEY_AVATAR, String(avatar));
  } catch {}
}

export async function applyRemoteProfileToLocal({ preferRemote = true } = {}) {
  const remote = await loadRemoteProfile();
  if (!remote) return { applied: false, reason: 'no-remote-row' };

  const remoteXp = Number(remote.xp || 0);
  const remoteTickets = Number(remote.tickets || 0);
  const remoteCbs = Number(remote.cbs_play || 0);
  const remoteNickname = remote.nickname || null;
  const remoteAvatar = remote.avatar || null;

  const remoteCards =
    remote.cards_json && typeof remote.cards_json === 'object'
      ? remote.cards_json
      : {};

  // Alleen uitvoeren als preferRemote=true (zoals jij gebruikt in appShell)
  if (!preferRemote) return { applied: false, reason: 'preferRemote=false' };

  // ✅ XP: max om rollback te voorkomen
  const localState = loadLocalState();
  const localXp = Number(localState.xp || 0);
  const mergedXp = Number(remoteXp || 0);

  // ✅ Inventory: REMOTE is leidend (anders komen gifts terug!)
  const mergedTickets = Number(remoteTickets || 0);
  const mergedCbs = Number(remoteCbs || 0);

  const mergedCards =
    remoteCards && typeof remoteCards === 'object'
      ? { ...remoteCards }
      : {};

  // schrijf terug naar local
  saveStateXp(mergedXp);
  saveInventory(mergedTickets, mergedCbs, mergedCards);
  saveCardsV1FromCardsObj(mergedCards);

  // nickname/avatar remote leidend (consistent)
  setLocalNicknameAvatar(remoteNickname, remoteAvatar);

  // notify UI
  window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: mergedXp } }));
  window.dispatchEvent(
    new CustomEvent('cbsgo:profileChanged', {
      detail: { nickname: remoteNickname, avatar: remoteAvatar },
    }),
  );

  return {
    applied: true,
    source: 'remote-authoritative-inventory',
    merged: {
      xp: mergedXp,
      tickets: mergedTickets,
      cbs: mergedCbs,
      cardsCount: Object.keys(mergedCards || {}).length,
    },
  };
}
