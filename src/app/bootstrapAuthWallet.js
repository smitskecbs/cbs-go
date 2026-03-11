// src/app/bootstrapAuthWallet.js
// Email PIN (6 digits) -> encrypt/decrypt *ECHTE* wallet secret -> Supabase wallet_vault
//
// RULES:
// - Vault is truth (cross-device).
// - If vault exists: try recover to local.
//   - If PIN wrong: DO NOT crash; return mode 'needs_old_pin' so app can continue.
//   - If oldPin provided: try decrypt with oldPin and then re-encrypt with new pin.
// - Only if vault is empty: backup local to vault.

import { supabase } from './supabaseClient.js';
import { getPublicKey, getSecretKeyBase58, importWalletFromSecret, createWallet } from './wallet.js';

function cleanPin6(raw) {
  return String(raw || '').replace(/\D/g, '').slice(0, 6);
}

function b64(bytes) {
  let bin = '';
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin);
}

function unb64(str) {
  const bin = atob(String(str || ''));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(pin6, saltBytes) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pin6), 'PBKDF2', false, [
    'deriveKey',
  ]);

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBytes, iterations: 120000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptString(pin6, plainText) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin6, salt);

  const enc = new TextEncoder();
  const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(String(plainText || '')));

  return { enc_secret: b64(new Uint8Array(cipherBuf)), salt: b64(salt), iv: b64(iv) };
}

async function decryptString(pin6, row) {
  if (!row?.salt || !row?.iv || !row?.enc_secret) {
    throw new Error('Vault row missing encryption fields');
  }

  const salt = unb64(row.salt);
  const iv = unb64(row.iv);
  const data = unb64(row.enc_secret);

  const key = await deriveKey(pin6, salt);
  const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  return new TextDecoder().decode(plainBuf);
}

/**
 * bootstrapAuthWallet(newPin, oldPin?)
 * - newPin = login PIN (6 digits)
 * - oldPin = optional previous PIN (6 digits) used to decrypt vault once, then re-encrypt with newPin
 */
export async function bootstrapAuthWallet(pin, oldPin = '') {
  const pin6 = cleanPin6(pin);
  if (pin6.length !== 6) throw new Error('PIN must be exactly 6 digits');

  const oldPin6 = cleanPin6(oldPin || '');

  // 1) auth user
  const { data: authData, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;
  const user = authData?.user;
  if (!user?.id) throw new Error('No Supabase user session');

  // 2) check vault first (vault = truth)
  const { data: vaultRow, error: vaultErr } = await supabase
    .from('wallet_vault')
    .select('user_id,wallet_pk,enc_secret,salt,iv')
    .eq('user_id', user.id)
    .maybeSingle();

  if (vaultErr) throw vaultErr;

  // 3) Vault exists -> try recover
  if (vaultRow) {
    let secretKeyBase58 = '';

    // First try decrypt with NEW pin
    try {
      secretKeyBase58 = await decryptString(pin6, vaultRow);
    } catch (eNew) {
      // If oldPin is provided, try decrypt with OLD pin one time
      if (oldPin6.length === 6) {
        try {
          secretKeyBase58 = await decryptString(oldPin6, vaultRow);
        } catch (eOld) {
          return { mode: 'needs_old_pin', wallet_pk: String(vaultRow.wallet_pk || '') };
        }
      } else {
        return { mode: 'needs_old_pin', wallet_pk: String(vaultRow.wallet_pk || '') };
      }
    }

    // Overwrite local with vault wallet (truth) using NEW pin as local pin
    const recoveredPk = importWalletFromSecret({
      secretKeyBase58,
      pin: pin6,
    });

    // Refresh vault encryption with NEW pin (best effort)
    try {
      const encrypted = await encryptString(pin6, secretKeyBase58);
      const { error: upErr } = await supabase
        .from('wallet_vault')
        .upsert(
          { user_id: user.id, wallet_pk: recoveredPk, ...encrypted },
          { onConflict: 'user_id' },
        );
      if (upErr) throw upErr;
    } catch (e) {
      console.warn('CBS-GO: vault re-encrypt failed (non-blocking)', e);
    }

    return { mode: 'recover', wallet_pk: recoveredPk };
  }

    // 4) Vault empty -> create a NEW local wallet for this auth user
  // IMPORTANT:
  // Do NOT reuse an old device wallet from another account.
  const wallet_pk = createWallet(pin6);
  const sk = getSecretKeyBase58();

  if (!wallet_pk || !sk) {
    throw new Error('Failed to create local wallet for this account');
  }

  const encrypted = await encryptString(pin6, sk);

  const { error: insErr } = await supabase
    .from('wallet_vault')
    .upsert({ user_id: user.id, wallet_pk, ...encrypted }, { onConflict: 'user_id' });

  if (insErr) throw insErr;

  return { mode: 'created_new_for_user', wallet_pk };
}

if (typeof window !== 'undefined') {
  window.bootstrapAuthWallet = bootstrapAuthWallet;
}
