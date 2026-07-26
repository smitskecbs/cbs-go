// Clear account-bound localStorage after successful server-side account deletion.
// Preserves device preferences and the local crypto wallet.

const ALWAYS_CLEAR = [
  'cbsgo_state_v6',
  'cbsgo_inventory_v2',
  'cbsgo_cards_v1',
  'cbsgo_leaderboard_v2',
  'cbsgo_player_name_v2',
  'cbsgo_player_avatar_v2',
  'cbsgo_player_email_v1',
  'cbsgo_profile_owner_user_id',
  'cbsgo_profile_owner_wallet_pk',
  'cbsgo_remote_synced_at_v1',
];

/** Keys that must never be wiped by account deletion. */
const PRESERVE_EXACT = new Set([
  'cbsgo_wallet_v3',
  'cbsgo_wallet_unlocked_v3',
  'cbsgo_shareLocation',
]);

/**
 * Remove account-bound local keys. Does not touch the Solana wallet keypair.
 */
export function clearAccountBoundLocalState() {
  const removed = [];

  try {
    for (const key of ALWAYS_CLEAR) {
      if (localStorage.getItem(key) != null) {
        localStorage.removeItem(key);
        removed.push(key);
      }
    }
  } catch (e) {
    console.warn('CBS GO: clearAccountBoundLocalState primary keys failed', e);
  }

  // Also drop other cbsgo_* account leftovers, but never wallet / share-location prefs.
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith('cbsgo_')) continue;
      if (PRESERVE_EXACT.has(k)) continue;
      if (k === 'cbsgo_wallet_v3' || k.startsWith('cbsgo_wallet_')) continue;
      // Keep install/update UX keys that are device-scoped, not account progress
      if (
        k.includes('install') ||
        k.includes('pwa') ||
        k.includes('seen_app_version') ||
        k.includes('intro') ||
        k.includes('force') ||
        k.includes('dismiss')
      ) {
        continue;
      }
      keys.push(k);
    }
    keys.forEach((k) => {
      try {
        localStorage.removeItem(k);
        removed.push(k);
      } catch {}
    });
  } catch (e) {
    console.warn('CBS GO: clearAccountBoundLocalState scan failed', e);
  }

  // Clear Supabase auth storage key used by supabaseClient
  try {
    localStorage.removeItem('cbsgo-supabase-auth');
  } catch {}

  console.info('CBS GO: cleared account-bound local state', { removed });
  return { removed };
}
