// src/app/vaultCrypto.js
// Encrypt/decrypt helpers for storing Solana secret key in Supabase (wallet_vault).
// Uses PBKDF2 + AES-GCM (WebCrypto).

function toB64(bytes) {
  const bin = String.fromCharCode(...bytes);
  return btoa(bin);
}
function fromB64(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function deriveKey(pin, saltBytes) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(String(pin)),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 150000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptSecretBytes(secretBytes, pin) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin, salt);

  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    secretBytes,
  );

  return {
    enc_secret: toB64(new Uint8Array(cipherBuf)),
    salt: toB64(salt),
    iv: toB64(iv),
  };
}

export async function decryptSecretBytes({ enc_secret, salt, iv }, pin) {
  const saltBytes = fromB64(salt);
  const ivBytes = fromB64(iv);
  const cipherBytes = fromB64(enc_secret);

  const key = await deriveKey(pin, saltBytes);

  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBytes },
    key,
    cipherBytes,
  );

  return new Uint8Array(plainBuf);
}
