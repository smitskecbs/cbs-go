// src/app/inventory.js
// Inventory for CBS-GO (tickets + CBS play money + collectible cards)

import {
  CARDS_V1_KEY,
  normalizeCardCounts,
  writeCardsV1Counts,
} from './cardCounts.js';

const KEY = 'cbsgo_inventory_v2';

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

function defaultInv() {
  return {
    tickets: 0,
    cbs: 0, // 🪙 CBS play money
    cards: {},
  };
}

export function loadInventory() {
  const raw = localStorage.getItem(KEY);
  const inv = safeParse(raw, defaultInv());

  if (typeof inv.tickets !== 'number') inv.tickets = 0;
  if (typeof inv.cbs !== 'number') inv.cbs = 0;
  inv.cards = normalizeCardCounts(inv.cards);

  return inv;
}

export function saveInventory(inv) {
  const safe = {
    tickets: Number(inv.tickets || 0),
    cbs: Number(inv.cbs || 0),
    cards: normalizeCardCounts(inv?.cards),
  };

  localStorage.setItem(KEY, JSON.stringify(safe));
}

export function getTickets() {
  return Number(loadInventory().tickets || 0);
}

export function getCbsCoins() {
  return Number(loadInventory().cbs || 0);
}

/** Flat card counts from canonical inventory store. */
export function getAllCards() {
  return { ...normalizeCardCounts(loadInventory().cards) };
}

/**
 * ✅ NIEUW: zet inventory hard (voor remote sync na email login)
 * @param {{tickets:number, cbs:number, cards:object}} next
 */
export function setInventory(next = {}) {
  const safe = {
    tickets: Number(next.tickets || 0),
    cbs: Number(next.cbs || 0),
    cards: normalizeCardCounts(next.cards),
  };

  saveInventory(safe);
  writeCardsV1Counts(safe.cards);

  window.dispatchEvent(
    new CustomEvent('cbsgo:inventoryChanged', { detail: { ...safe } }),
  );

  return safe;
}

/* ---------- TICKETS / CBS ---------- */

export function addTickets(n = 1) {
  const delta = Number(n || 0);
  if (!Number.isFinite(delta) || delta === 0) return loadInventory();

  const inv = loadInventory();
  const current = Number(inv.tickets || 0);

  let next = current + delta;
  if (next < 0) next = 0;

  inv.tickets = next;
  saveInventory(inv);

  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  return inv;
}

export function addCbsCoins(n = 1) {
  const delta = Number(n || 0);
  if (!Number.isFinite(delta) || delta === 0) return loadInventory();

  const inv = loadInventory();
  const current = Number(inv.cbs || 0);

  let next = current + delta;
  if (next < 0) next = 0;

  inv.cbs = next;
  saveInventory(inv);

  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  return inv;
}

/* ---------- CARDS (canonical mutation path) ---------- */

export function addCard(cardId, qty = 1) {
  const id = String(cardId || '').trim();
  const n = Math.floor(Number(qty || 1));
  if (!id || !Number.isFinite(n) || n <= 0) return loadInventory();

  const inv = loadInventory();
  inv.cards = normalizeCardCounts(inv.cards);
  inv.cards[id] = Number(inv.cards[id] || 0) + n;

  saveInventory(inv);
  writeCardsV1Counts(inv.cards);

  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  window.dispatchEvent(
    new CustomEvent('cbsgo:bagChanged', {
      detail: { cards: { ...(inv.cards || {}) } },
    }),
  );

  return inv;
}

export function removeCard(cardId, qty = 1) {
  const id = String(cardId || '').trim();
  const n = Math.floor(Number(qty || 1));
  if (!id || !Number.isFinite(n) || n <= 0) return loadInventory();

  const inv = loadInventory();
  inv.cards = normalizeCardCounts(inv.cards);
  if (!inv.cards[id]) return inv;

  inv.cards[id] -= n;
  if (inv.cards[id] <= 0) delete inv.cards[id];

  saveInventory(inv);
  writeCardsV1Counts(inv.cards);

  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  window.dispatchEvent(
    new CustomEvent('cbsgo:bagChanged', {
      detail: { cards: { ...(inv.cards || {}) } },
    }),
  );

  return inv;
}

/* ---------- RESET ---------- */

export function resetInventory() {
  const inv = defaultInv();
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(CARDS_V1_KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  window.dispatchEvent(
    new CustomEvent('cbsgo:bagChanged', {
      detail: { cards: {} },
    }),
  );
  return inv;
}
