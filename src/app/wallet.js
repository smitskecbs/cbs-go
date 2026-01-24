// src/app/wallet.js
// SPEELWALLET = ECHTE SPL WALLET (solanaLocalWallet) - compat layer
// ---------------------------------------------------------------
// Doel: rest van app blijft dezelfde API gebruiken:
// hasWallet(), isWalletUnlocked(), createWallet(), unlockWallet(),
// importWalletFromSecret(), getPublicKey(), getSecretKeyBase58()

import * as SLW from './solanaLocalWallet.js';

// ---- helper: pick first existing function name ----
function pick(fnNames) {
  for (const name of fnNames) {
    const fn = SLW[name];
    if (typeof fn === 'function') return fn;
  }
  return null;
}

// ---- map solanaLocalWallet exports -> expected API ----
// We KNOW you already use these in appShell.js:
const getPkFn = pick(['getLocalPublicKey', 'getPublicKey', 'getSolanaPublicKey', 'getSolanaPk']);
const getSkFn = pick(['getLocalSecretKeyBase58', 'getSecretKeyBase58', 'getSolanaSecretKeyBase58', 'getSolanaSkBase58']);

// Optional helpers (may or may not exist in your solanaLocalWallet.js)
const hasFn = pick([
  'hasLocalWallet',
  'hasWallet',
  'hasSolanaLocalWallet',
  'hasLocalKeypair',
]);

const isUnlockedFn = pick([
  'isLocalWalletUnlocked',
  'isWalletUnlocked',
  'isUnlockedLocalWallet',
  'isSolanaLocalWalletUnlocked',
]);

const createFn = pick([
  'createLocalWallet',
  'createWallet',
  'createSolanaLocalWallet',
  'createSolanaWallet',
  'createKeypair',
]);

const unlockFn = pick([
  'unlockLocalWallet',
  'unlockWallet',
  'unlockSolanaLocalWallet',
  'unlockSolanaWallet',
]);

const importFn = pick([
  // meest waarschijnlijke namen
  'importLocalWalletFromSecret',
  'importWalletFromSecret',
  'importSolanaLocalWalletFromSecret',
  'importSolanaWalletFromSecret',

  // extra varianten (voor als je eerder andere namen hebt gebruikt)
  'importFromSecret',
  'importFromSecretKey',
  'importKeypairFromSecret',
  'importKeypair',
  'restoreWalletFromSecret',
  'restoreLocalWalletFromSecret',
]);

const resetFn = pick([
  'devResetLocalWallet',
  'devResetWallet',
  'resetLocalWallet',
  'devResetSolanaLocalWallet',
]);

// ---- API the rest of CBS-GO expects ----
export function hasWallet() {
  // Prefer explicit hasFn if available
  if (hasFn) return !!hasFn();

  // Fallback: if we can read a public key, wallet exists
  if (getPkFn) return !!String(getPkFn() || '');
  return false;
}

export function isWalletUnlocked() {
  // If solanaLocalWallet has an explicit unlock state, use it
  if (isUnlockedFn) return !!isUnlockedFn();

  // Otherwise: treat "wallet exists" as unlocked
  // (your real protection is now the Email+PIN vault flow)
  return hasWallet();
}

export function createWallet(pin) {
  if (!createFn) {
    throw new Error('solanaLocalWallet: create function not found (expected createLocalWallet/createWallet)');
  }
  return createFn(pin);
}

export function unlockWallet(pin) {
  // If there is no unlock function, but wallet exists, just return pk.
  if (!unlockFn) {
    const pk = getPublicKey();
    if (pk) return pk;
    throw new Error('solanaLocalWallet: unlock function not found and no local wallet exists');
  }
  return unlockFn(pin);
}

export function importWalletFromSecret({ secretKeyBase58, pin }) {
  if (!importFn) {
    throw new Error(
      'solanaLocalWallet: import function not found. ' +
      'Your solanaLocalWallet.js must export an import function (e.g. importLocalWalletFromSecret).'
    );
  }

  // Support both call styles:
  // - importFn({ secretKeyBase58, pin })
  // - importFn(secretKeyBase58, pin)
  try {
    return importFn({ secretKeyBase58, pin });
  } catch (e1) {
    try {
      return importFn(secretKeyBase58, pin);
    } catch (e2) {
      const msg = e2?.message || e1?.message || String(e2 || e1 || 'Import failed');
      throw new Error('solanaLocalWallet: import failed: ' + msg);
    }
  }
}

export function getPublicKey() {
  if (!getPkFn) return '';
  return String(getPkFn() || '');
}

export function getSecretKeyBase58() {
  if (!getSkFn) return '';
  return String(getSkFn() || '');
}

export function devResetWallet() {
  if (resetFn) resetFn();
}

if (typeof window !== 'undefined') {
  window.cbsgoDevResetWallet = devResetWallet;
}
