// src/app/walletVault.js
// Saves/loads encrypted Solana secret key in Supabase table: wallet_vault

import { supabase } from './supabaseClient.js';
import { encryptSecretBytes, decryptSecretBytes } from './vaultCrypto.js';

export async function getAuthUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user || null;
}

export async function saveVaultForUser({ user_id, wallet_pk, secretBytes }, pin) {
  const enc = await encryptSecretBytes(secretBytes, pin);

  const payload = {
    user_id,
    wallet_pk,
    enc_secret: enc.enc_secret,
    salt: enc.salt,
    iv: enc.iv,
  };

  const { error } = await supabase
    .from('wallet_vault')
    .upsert(payload, { onConflict: 'user_id' });

  if (error) throw error;
  return true;
}

export async function loadVaultForUser(user_id, pin) {
  const { data, error } = await supabase
    .from('wallet_vault')
    .select('user_id,wallet_pk,enc_secret,salt,iv')
    .eq('user_id', user_id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const secretBytes = await decryptSecretBytes(
    {
      enc_secret: data.enc_secret,
      salt: data.salt,
      iv: data.iv,
    },
    pin,
  );

  return { wallet_pk: data.wallet_pk, secretBytes };
}
