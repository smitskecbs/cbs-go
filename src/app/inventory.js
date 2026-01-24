// src/app/inventory.js
// Inventory for CBS-GO (tickets + CBS play money + collectible cards)

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
  if (!inv.cards || typeof inv.cards !== 'object') inv.cards = {};

  return inv;
}

export function saveInventory(inv) {
  const safe = {
    tickets: Number(inv.tickets || 0),
    cbs: Number(inv.cbs || 0),
    cards: inv.cards && typeof inv.cards === 'object' ? inv.cards : {},
  };

  localStorage.setItem(KEY, JSON.stringify(safe));
}

export function getTickets() {
  return Number(loadInventory().tickets || 0);
}

export function getCbsCoins() {
  return Number(loadInventory().cbs || 0);
}

/**
 * ✅ NIEUW: zet inventory hard (voor remote sync na email login)
 * @param {{tickets:number, cbs:number, cards:object}} next
 */
export function setInventory(next = {}) {
  const safe = {
    tickets: Number(next.tickets || 0),
    cbs: Number(next.cbs || 0),
    cards: next.cards && typeof next.cards === 'object' ? next.cards : {},
  };

  saveInventory(safe);

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

/* ---------- CARDS ---------- */

export function getAllCards() {
  const inv = loadInventory();
  return { ...(inv.cards || {}) };
}

export function addCard(cardId, qty = 1) {
  const id = String(cardId || '').trim();
  const n = Number(qty || 1);
  if (!id || !Number.isFinite(n) || n <= 0) return loadInventory();

  const inv = loadInventory();
  if (!inv.cards) inv.cards = {};
  inv.cards[id] = Number(inv.cards[id] || 0) + n;

  saveInventory(inv);
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  return inv;
}

export function removeCard(cardId, qty = 1) {
  const id = String(cardId || '').trim();
  const n = Number(qty || 1);
  if (!id || !Number.isFinite(n) || n <= 0) return loadInventory();

  const inv = loadInventory();
  if (!inv.cards || typeof inv.cards[id] !== 'number') return inv;

  inv.cards[id] -= n;
  if (inv.cards[id] <= 0) delete inv.cards[id];

  saveInventory(inv);
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  return inv;
}

/* ---------- RESET ---------- */

export function resetInventory() {
  const inv = defaultInv();
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: inv }));
}
