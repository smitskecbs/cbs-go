// src/app/applyRemoteProfile.js
// Laad game_profiles (Supabase) en zet dit terug naar lokale storage,
// zodat dezelfde email op elk device exact hetzelfde profiel gebruikt.
//
// FIX (BELANGRIJK):
// - XP/Level rollback voorkomen: merge local vs remote -> hoogste wint.
// - Tickets/CBS idem: hoogste wint.
// - Cards: merge per kaart -> hoogste count wint.
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

function loadLocalInventory() {
  const raw = localStorage.getItem(INV_KEY);
  return safeJsonParse(raw, { tickets: 0, cbs: 0, cards: {} });
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

function loadCardsV1Counts() {
  const raw = localStorage.getItem(CARDS_KEY);
  const data = safeJsonParse(raw, {});
  if (data && typeof data.counts === 'object' && data.counts !== null) return { ...data.counts };
  // fallback oude vorm
  if (Array.isArray(data.cards)) {
    const counts = {};
    data.cards.forEach((c) => {
      if (!c || !c.id) return;
      const n = Number(c.count || 0);
      if (Number.isFinite(n) && n > 0) counts[c.id] = n;
    });
    return counts;
  }
  return {};
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

function mergeCardsMax(localCards, remoteCards) {
  const out = { ...(localCards || {}) };
  const r = remoteCards || {};
  Object.keys(r).forEach((id) => {
    const lv = Number(out[id] || 0);
    const rv = Number(r[id] || 0);
    const next = Math.max(lv, rv);
    if (next > 0) out[id] = next;
  });
  // ook: alles <=0 eruit
  Object.keys(out).forEach((id) => {
    const v = Number(out[id] || 0);
    if (!Number.isFinite(v) || v <= 0) delete out[id];
  });
  return out;
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

  // --- MERGE: hoogste wint ---
  const localState = loadLocalState();
  const localInv = loadLocalInventory();
  const localCardsV1 = loadCardsV1Counts();

  const localXp = Number(localState.xp || 0);
  const mergedXp = Math.max(localXp, remoteXp);

  const localTickets = Number(localInv.tickets || 0);
  const mergedTickets = Math.max(localTickets, remoteTickets);

  const localCbs = Number(localInv.cbs || 0);
  const mergedCbs = Math.max(localCbs, remoteCbs);

  // cards: combineer inventory.cards + cards_v1 + remote -> max per id
  const localInvCards =
    localInv.cards && typeof localInv.cards === 'object' ? localInv.cards : {};
  const localAllCards = mergeCardsMax(localCardsV1, localInvCards);
  const mergedCards = mergeCardsMax(localAllCards, remoteCards);

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
    source: 'merge-max',
    merged: {
      xp: mergedXp,
      tickets: mergedTickets,
      cbs: mergedCbs,
      cardsCount: Object.keys(mergedCards || {}).length,
    },
  };
}
