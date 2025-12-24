// src/app/wallet.js
// Local wallet: create on first login, stored encrypted with PIN (AES-GCM via WebCrypto).
// Uses @solana/web3.js Keypair.
//
// Storage:
// - cbsgo_wallet_v1 = { pubkey, enc: { saltB64, ivB64, ctB64 }, createdAt }
// - session unlock cache (optional): sessionStorage cbsgo_wallet_unlocked_v1 = "1"
//
// Public API:
// - hasLocalWallet()
// - getWalletPubkey()
// - ensureWalletCreated(pin) -> creates if missing, unlocks into memory
// - unlockWallet(pin) -> unlocks into memory
// - isWalletUnlocked()
// - getKeypair() -> throws if locked
// - exportSecretKeyBase58(pin) -> decrypt & export for backup
// - wipeLocalWallet() -> removes local wallet

import { Keypair } from '@solana/web3.js';

const KEY = 'cbsgo_wallet_v1';
const SESSION_UNLOCK = 'cbsgo_wallet_unlocked_v1';

let _keypair = null;

function toB64(u8) {
  let s = '';
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s);
}
function fromB64(b64) {
  const bin = atob(String(b64 || ''));
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
}

function textToU8(s) {
  return new TextEncoder().encode(String(s || ''));
}

async function sha256(u8) {
  const buf = await crypto.subtle.digest('SHA-256', u8);
  return new Uint8Array(buf);
}

async function deriveAesKeyFromPin(pin, saltU8) {
  // PIN -> PBKDF2 -> AES-GCM key
  const pinU8 = textToU8(pin);
  const baseKey = await crypto.subtle.importKey(
    'raw',
    pinU8,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltU8,
      iterations: 120000,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptBytesWithPin(bytesU8, pin) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKeyFromPin(pin, salt);

  const ctBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    bytesU8
  );

  const ct = new Uint8Array(ctBuf);

  return {
    saltB64: toB64(salt),
    ivB64: toB64(iv),
    ctB64: toB64(ct)
  };
}

async function decryptBytesWithPin(enc, pin) {
  const salt = fromB64(enc?.saltB64);
  const iv = fromB64(enc?.ivB64);
  const ct = fromB64(enc?.ctB64);

  const key = await deriveAesKeyFromPin(pin, salt);

  const ptBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ct
  );

  return new Uint8Array(ptBuf);
}

function readWalletRecord() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (!v || typeof v !== 'object') return null;
    if (!v.pubkey || !v.enc) return null;
    return v;
  } catch {
    return null;
  }
}

function writeWalletRecord(rec) {
  localStorage.setItem(KEY, JSON.stringify(rec));
}

export function hasLocalWallet() {
  return !!readWalletRecord();
}

export function isWalletUnlocked() {
  if (_keypair) return true;
  try {
    return sessionStorage.getItem(SESSION_UNLOCK) === '1';
  } catch {
    return false;
  }
}

export function getWalletPubkey() {
  const rec = readWalletRecord();
  return rec?.pubkey || '';
}

export function getKeypair() {
  if (!_keypair) throw new Error('Wallet locked');
  return _keypair;
}

export async function ensureWalletCreated(pin) {
  if (!crypto?.subtle) throw new Error('WebCrypto not supported');
  const p = String(pin || '').trim();
  if (p.length < 4) throw new Error('PIN too short (min 4)');

  const existing = readWalletRecord();
  if (existing) {
    // already exists -> unlock
    await unlockWallet(pin);
    return { ok: true, created: false, pubkey: existing.pubkey };
  }

  const kp = Keypair.generate();
  const secret = kp.secretKey; // Uint8Array(64)

  const enc = await encryptBytesWithPin(secret, p);

  const rec = {
    pubkey: kp.publicKey.toBase58(),
    enc,
    createdAt: Date.now()
  };

  writeWalletRecord(rec);

  _keypair = kp;
  try { sessionStorage.setItem(SESSION_UNLOCK, '1'); } catch {}

  window.dispatchEvent(new CustomEvent('cbsgo:walletChanged', { detail: { pubkey: rec.pubkey } }));
  return { ok: true, created: true, pubkey: rec.pubkey };
}

export async function unlockWallet(pin) {
  const rec = readWalletRecord();
  if (!rec) throw new Error('No local wallet found');

  const p = String(pin || '').trim();
  if (p.length < 4) throw new Error('PIN too short');

  // decrypt secretKey
  const secretU8 = await decryptBytesWithPin(rec.enc, p);

  // quick sanity: 64 bytes expected
  if (!(secretU8 instanceof Uint8Array) || secretU8.length !== 64) {
    throw new Error('Invalid wallet data');
  }

  const kp = Keypair.fromSecretKey(secretU8);
  if (kp.publicKey.toBase58() !== rec.pubkey) {
    throw new Error('PIN incorrect');
  }

  _keypair = kp;
  try { sessionStorage.setItem(SESSION_UNLOCK, '1'); } catch {}

  window.dispatchEvent(new CustomEvent('cbsgo:walletChanged', { detail: { pubkey: rec.pubkey } }));
  return { ok: true, pubkey: rec.pubkey };
}

function base58Encode(u8) {
  // Small base58 encoder (no dependency)
  const ALPH = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let digits = [0];
  for (let i = 0; i < u8.length; i++) {
    let carry = u8[i];
    for (let j = 0; j < digits.length; j++) {
      const x = digits[j] * 256 + carry;
      digits[j] = x % 58;
      carry = (x / 58) | 0;
    }
    while (carry) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  // leading zeros
  let zeros = 0;
  while (zeros < u8.length && u8[zeros] === 0) zeros++;
  let out = '';
  for (let z = 0; z < zeros; z++) out += '1';
  for (let q = digits.length - 1; q >= 0; q--) out += ALPH[digits[q]];
  return out;
}

export async function exportSecretKeyBase58(pin) {
  const rec = readWalletRecord();
  if (!rec) throw new Error('No local wallet');

  const secretU8 = await decryptBytesWithPin(rec.enc, String(pin || '').trim());
  if (secretU8.length !== 64) throw new Error('Invalid secret key');

  // Export as base58 string (Solana secretKey format)
  return base58Encode(secretU8);
}

export function wipeLocalWallet() {
  try { localStorage.removeItem(KEY); } catch {}
  try { sessionStorage.removeItem(SESSION_UNLOCK); } catch {}
  _keypair = null;
  window.dispatchEvent(new CustomEvent('cbsgo:walletChanged', { detail: { pubkey: '' } }));
}
