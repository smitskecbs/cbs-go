// src/app/inventory.js
// Simple local inventory for CBS-GO (tickets + CBS play money)

const KEY = 'cbsgo_inventory_v1';

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
  };
}

export function loadInventory() {
  const raw = localStorage.getItem(KEY);
  const inv = safeParse(raw, defaultInv());

  // defensief: zorg dat beide keys bestaan
  if (typeof inv.tickets !== 'number') inv.tickets = 0;
  if (typeof inv.cbs !== 'number') inv.cbs = 0;

  return inv;
}

export function saveInventory(inv) {
  const safe = {
    tickets: Number(inv.tickets || 0),
    cbs: Number(inv.cbs || 0),
  };
  localStorage.setItem(KEY, JSON.stringify(safe));
}

export function getTickets() {
  return Number(loadInventory().tickets || 0);
}

export function getCbsCoins() {
  return Number(loadInventory().cbs || 0);
}

export function addTickets(n = 1) {
  const add = Number(n || 0);
  if (!Number.isFinite(add) || add <= 0) return loadInventory();

  const inv = loadInventory();
  inv.tickets = Number(inv.tickets || 0) + add;
  saveInventory(inv);

  window.dispatchEvent(
    new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }),
  );
  return inv;
}

export function addCbsCoins(n = 1) {
  const add = Number(n || 0);
  if (!Number.isFinite(add) || add <= 0) return loadInventory();

  const inv = loadInventory();
  inv.cbs = Number(inv.cbs || 0) + add;
  saveInventory(inv);

  window.dispatchEvent(
    new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }),
  );
  return inv;
}

export function resetInventory() {
  const inv = defaultInv();
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(
    new CustomEvent('cbsgo:inventoryChanged', { detail: inv }),
  );
}
