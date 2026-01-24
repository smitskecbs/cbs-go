// src/app/solanaLocalWallet.js
// REAL local Solana-compatible wallet (Ed25519 keypair) for CBS-GO.
// -----------------------------------------------------------------
// - 1 wallet per browser/device (localStorage)
// - PIN is lock (basic)
// - unlocked status per tab (sessionStorage)
//
// Exports used across the app:
// hasLocalWallet(), isLocalWalletUnlocked(), createLocalWallet(), unlockLocalWallet(),
// importLocalWalletFromSecret(), getLocalPublicKey(), getLocalSecretKeyBase58(), devResetLocalWallet()

import nacl from 'tweetnacl';
import bs58 from 'bs58';

const WALLET_KEY = 'cbsgo_wallet_v3';
const UNLOCK_KEY = 'cbsgo_wallet_unlocked_v3';

function loadWallet() {
  try {
    const raw = localStorage.getItem(WALLET_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    if (!parsed.pk || !parsed.sk || !parsed.pin) return null;

    return {
      pk: String(parsed.pk),
      sk: String(parsed.sk),
      pin: String(parsed.pin),
    };
  } catch (e) {
    console.warn('CBS GO: failed to load wallet from localStorage', e);
    return null;
  }
}

function saveWallet(wallet) {
  localStorage.setItem(
    WALLET_KEY,
    JSON.stringify({
      pk: String(wallet.pk),
      sk: String(wallet.sk),
      pin: String(wallet.pin),
    }),
  );
}

function generateKeypair() {
  const pair = nacl.sign.keyPair();
  const pk = bs58.encode(pair.publicKey);
  const sk = bs58.encode(pair.secretKey); // 64 bytes
  return { pk, sk };
}

function pkFromSecret(skBase58) {
  const skBytes = bs58.decode(String(skBase58 || ''));
  if (!(skBytes instanceof Uint8Array) || skBytes.length !== 64) {
    throw new Error('Invalid secret key (expected 64 bytes base58)');
  }
  const pair = nacl.sign.keyPair.fromSecretKey(skBytes);
  return bs58.encode(pair.publicKey);
}

// ---------------- Public API ----------------

export function hasLocalWallet() {
  return !!loadWallet();
}

export function isLocalWalletUnlocked() {
  const wallet = loadWallet();
  if (!wallet) return false;
  return sessionStorage.getItem(UNLOCK_KEY) === '1';
}

export function createLocalWallet(pin) {
  const p = String(pin || '');
  if (p.length < 4) throw new Error('PIN too short');

  const { pk, sk } = generateKeypair();
  saveWallet({ pk, sk, pin: p });
  sessionStorage.setItem(UNLOCK_KEY, '1');
  return pk;
}

export function unlockLocalWallet(pin) {
  const wallet = loadWallet();
  if (!wallet) throw new Error('No wallet');

  const p = String(pin || '');
  if (p !== wallet.pin) throw new Error('Incorrect PIN');

  sessionStorage.setItem(UNLOCK_KEY, '1');
  return wallet.pk;
}

export function importLocalWalletFromSecret({ secretKeyBase58, pin }) {
  const p = String(pin || '');
  if (p.length < 4) throw new Error('PIN too short');

  const sk = String(secretKeyBase58 || '');
  const pk = pkFromSecret(sk);

  saveWallet({ pk, sk, pin: p });
  sessionStorage.setItem(UNLOCK_KEY, '1');
  return pk;
}

export function getLocalPublicKey() {
  const wallet = loadWallet();
  return wallet ? wallet.pk : '';
}

export function getLocalSecretKeyBase58() {
  const wallet = loadWallet();
  return wallet ? wallet.sk : '';
}

export function devResetLocalWallet() {
  localStorage.removeItem(WALLET_KEY);
  sessionStorage.removeItem(UNLOCK_KEY);
}

// Dev helper
if (typeof window !== 'undefined') {
  window.cbsgoDevResetLocalWallet = devResetLocalWallet;
}
