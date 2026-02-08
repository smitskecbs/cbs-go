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
    const fn = SLW?.[name];
    if (typeof fn === 'function') return fn;
  }
  return null;
}

// ---- map solanaLocalWallet exports -> expected API ----
const getPkFn = pick(['getLocalPublicKey', 'getPublicKey', 'getSolanaPublicKey', 'getSolanaPk']);
const getSkFn = pick(['getLocalSecretKeyBase58', 'getSecretKeyBase58', 'getSolanaSecretKeyBase58', 'getSolanaSkBase58']);

const hasFn = pick(['hasLocalWallet', 'hasWallet', 'hasSolanaLocalWallet', 'hasLocalKeypair']);
const isUnlockedFn = pick(['isLocalWalletUnlocked', 'isWalletUnlocked', 'isUnlockedLocalWallet', 'isSolanaLocalWalletUnlocked']);

const createFn = pick(['createLocalWallet', 'createWallet', 'createSolanaLocalWallet', 'createSolanaWallet', 'createKeypair']);
const unlockFn = pick(['unlockLocalWallet', 'unlockWallet', 'unlockSolanaLocalWallet', 'unlockSolanaWallet']);

const importFn = pick([
  'importLocalWalletFromSecret',
  'importWalletFromSecret',
  'importSolanaLocalWalletFromSecret',
  'importSolanaWalletFromSecret',
  'importFromSecret',
  'importFromSecretKey',
  'importKeypairFromSecret',
  'importKeypair',
  'restoreWalletFromSecret',
  'restoreLocalWalletFromSecret',
]);

const resetFn = pick(['devResetLocalWallet', 'devResetWallet', 'resetLocalWallet', 'devResetSolanaLocalWallet']);

// ---- API the rest of CBS-GO expects ----
export function hasWallet() {
  if (hasFn) return !!hasFn();
  return !!getPublicKey();
}

export function isWalletUnlocked() {
  if (isUnlockedFn) return !!isUnlockedFn();
  // In jouw flow is “wallet bestaat” praktisch “unlocked” (PIN/vault is de echte gate)
  return hasWallet();
}

export function createWallet(pin) {
  if (!createFn) {
    throw new Error('solanaLocalWallet: create function not found (expected createLocalWallet/createWallet)');
  }
  return createFn(pin);
}

export function unlockWallet(pin) {
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
  try {
    if (!getPkFn) return '';
    const v = getPkFn();
    return v ? String(v) : '';
  } catch {
    return '';
  }
}

export function getSecretKeyBase58() {
  try {
    if (!getSkFn) return '';
    const v = getSkFn();
    return v ? String(v) : '';
  } catch {
    return '';
  }
}

export function devResetWallet() {
  try {
    if (resetFn) resetFn();
  } catch (e) {
    console.warn('cbsgo: devResetWallet failed', e);
  }
}

if (typeof window !== 'undefined') {
  window.cbsgoDevResetWallet = devResetWallet;
}
