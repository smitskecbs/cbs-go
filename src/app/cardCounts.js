// Canonical flat card-count helpers.
// Shapes:
//   inventory.cards / game_profiles.cards_json → { [cardId]: number }
//   cbsgo_cards_v1 → { counts: { [cardId]: number } }
//
// Inventory is authoritative for normal operation.
// Bag-only ids may be imported once as legacy recovery; stale bag counts
// must never raise inventory after a canonical remove/consume.

export const CARDS_V1_KEY = 'cbsgo_cards_v1';

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function isSafeCardId(id) {
  const s = String(id || '').trim();
  if (!s) return false;
  if (FORBIDDEN_KEYS.has(s)) return false;
  return true;
}

/**
 * Normalize any card-count-like input into a flat { [id]: positiveInt } map.
 * Accepts:
 * - flat object { id: n }
 * - wrapped { counts: { id: n } }
 * - legacy { id: { count: n } }
 * Ignores invalid ids/counts. Never stringifies JSON.
 */
export function normalizeCardCounts(raw) {
  const out = Object.create(null);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};

  const source =
    raw.counts && typeof raw.counts === 'object' && !Array.isArray(raw.counts)
      ? raw.counts
      : raw;

  for (const [key, val] of Object.entries(source)) {
    if (!isSafeCardId(key)) continue;
    const id = String(key).trim();

    let n = 0;
    if (typeof val === 'number') {
      n = val;
    } else if (val && typeof val === 'object' && 'count' in val) {
      n = Number(val.count);
    } else {
      n = Number(val);
    }

    if (!Number.isFinite(n)) continue;
    const count = Math.floor(n);
    if (count <= 0) continue;
    out[id] = count;
  }

  // Return a normal object (not null-prototype) for JSON/localStorage friendliness.
  return { ...out };
}

export function loadCardsV1Counts() {
  try {
    const raw = localStorage.getItem(CARDS_V1_KEY);
    if (!raw) return {};
    return normalizeCardCounts(JSON.parse(raw));
  } catch {
    return {};
  }
}

export function writeCardsV1Counts(flatCounts) {
  const counts = normalizeCardCounts(flatCounts);
  try {
    localStorage.setItem(CARDS_V1_KEY, JSON.stringify({ counts }));
  } catch {}
  return counts;
}

/**
 * Reconcile local card stores for sync.
 *
 * Rules:
 * 1. Start from canonical inventory.cards (authoritative).
 * 2. Legacy recovery: import bag-only card IDs that inventory does not have.
 * 3. Never raise an inventory count from a higher stale bag count.
 * 4. Mirror the result into cbsgo_cards_v1 so UI cannot keep stale higher counts.
 *
 * @returns {{ counts: Record<string, number>, changed: boolean, importedLegacyIds: string[] }}
 */
export function reconcileLocalCardStores({
  loadInventoryFn,
  saveInventoryFn,
} = {}) {
  let invCards = {};
  let inv = null;

  try {
    if (typeof loadInventoryFn === 'function') {
      inv = loadInventoryFn();
      invCards = normalizeCardCounts(inv?.cards);
    }
  } catch {}

  const bagCounts = loadCardsV1Counts();
  const merged = { ...invCards };
  const importedLegacyIds = [];

  for (const [id, bagN] of Object.entries(bagCounts)) {
    if (!Object.prototype.hasOwnProperty.call(invCards, id)) {
      // Bag-only id: legacy loot that never reached inventory.
      merged[id] = bagN;
      importedLegacyIds.push(id);
    }
    // else: inventory count wins even when bag is higher (prevents resurrection)
  }

  const beforeInv = JSON.stringify(invCards);
  const beforeBag = JSON.stringify(bagCounts);
  const after = JSON.stringify(merged);
  const changed = beforeInv !== after || beforeBag !== after;

  writeCardsV1Counts(merged);

  if (inv && typeof saveInventoryFn === 'function') {
    try {
      inv.cards = { ...merged };
      saveInventoryFn(inv);
    } catch {}
  }

  return { counts: merged, changed, importedLegacyIds };
}
