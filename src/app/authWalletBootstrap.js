// src/app/authWalletBootstrap.js
// After Email+PIN login: load or create Solana wallet via wallet_vault

import { getAuthUser, loadVaultForUser, saveVaultForUser } from './walletVault.js';
import { Keypair } from '@solana/web3.js';

let activeKeypair = null;

export function getActiveKeypair() {
  return activeKeypair;
}

export async function bootstrapAuthWallet(pin) {
  const user = await getAuthUser();
  if (!user) throw new Error('No auth user');

  // 1) try load existing wallet
  const existing = await loadVaultForUser(user.id, pin);
  if (existing?.secretBytes) {
    activeKeypair = Keypair.fromSecretKey(existing.secretBytes);
    return { status: 'loaded', publicKey: activeKeypair.publicKey.toBase58() };
  }

  // 2) create new wallet
  const kp = Keypair.generate();
  activeKeypair = kp;

  await saveVaultForUser(
    {
      user_id: user.id,
      wallet_pk: kp.publicKey.toBase58(),
      secretBytes: kp.secretKey,
    },
    pin,
  );

  return { status: 'created', publicKey: kp.publicKey.toBase58() };
}
