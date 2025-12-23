// src/app/inventory.js
// Simple local inventory for CBS-GO (tickets etc.)

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
    tickets: 0
  };
}

export function loadInventory() {
  const raw = localStorage.getItem(KEY);
  return safeParse(raw, defaultInv());
}

export function saveInventory(inv) {
  localStorage.setItem(KEY, JSON.stringify(inv));
}

export function getTickets() {
  return Number(loadInventory().tickets || 0);
}

export function addTickets(n = 1) {
  const add = Number(n || 0);
  if (!Number.isFinite(add) || add <= 0) return loadInventory();

  const inv = loadInventory();
  inv.tickets = Number(inv.tickets || 0) + add;
  saveInventory(inv);

  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: { ...inv } }));
  return inv;
}

export function resetInventory() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged', { detail: defaultInv() }));
}
