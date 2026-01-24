// src/app/solanaSendSpl.js
// On-chain SPL transfers (CBS / BONK / andere tokens)
// gebruikt je lokale Ed25519 keypair uit solanaLocalWallet.js

import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
} from '@solana/web3.js';

import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
} from '@solana/spl-token';

import bs58 from 'bs58';
import { getLocalSecretKeyBase58 } from './solanaLocalWallet.js';

// Zelfde RPC als je SOL-send helper
const RPC =
  import.meta.env.VITE_SOLANA_RPC_URL ||
  clusterApiUrl('mainnet-beta');

/**
 * Stuur een SPL-token (bijv. CBS) vanaf je lokale wallet.
 *
 * @param {Object} params
 * @param {string} params.mintAddress - mint van de token (CBS / BONK / etc)
 * @param {string} params.toAddress   - ontvangende WALLET (niet ATA)
 * @param {number} params.amountTokens - bedrag in "gewone" tokens (bijv. 10 CBS)
 * @param {number} params.decimals     - aantal decimals (CBS = 9)
 */
export async function sendSplFromLocalWallet({
  mintAddress,
  toAddress,
  amountTokens,
  decimals,
}) {
  if (!mintAddress) {
    throw new Error('Missing mint address');
  }
  if (!toAddress) {
    throw new Error('Missing destination wallet');
  }
  if (!Number.isFinite(amountTokens) || amountTokens <= 0) {
    throw new Error('Amount must be greater than 0');
  }
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) {
    throw new Error('Invalid decimals value');
  }

  const connection = new Connection(RPC, 'confirmed');

  // lokale private key uit je web2-wallet (Ed25519)
  const secretKeyBytes = bs58.decode(getLocalSecretKeyBase58());
  const payer = Keypair.fromSecretKey(secretKeyBytes);

  const mint = new PublicKey(mintAddress);
  const toWallet = new PublicKey(toAddress);

  // Associated Token Accounts (ATA)
  const fromAta = await getAssociatedTokenAddress(mint, payer.publicKey);
  const toAta = await getAssociatedTokenAddress(mint, toWallet);

  const instructions = [];

  // Maak de ATA voor de ontvanger aan als die nog niet bestaat
  try {
    await getAccount(connection, toAta);
  } catch {
    instructions.push(
      createAssociatedTokenAccountInstruction(
        payer.publicKey, // payer
        toAta,           // ATA die we aanmaken
        toWallet,        // eigenaar
        mint,            // mint
      ),
    );
  }

  // Mens-bedrag → raw units (BigInt)
  const multiplier = 10 ** decimals;
  const rawAmount = BigInt(Math.round(amountTokens * multiplier));

  instructions.push(
    createTransferInstruction(
      fromAta,         // bron-ATA
      toAta,           // doel-ATA
      payer.publicKey, // owner
      rawAmount,
    ),
  );

  const tx = new Transaction().add(...instructions);
  tx.feePayer = payer.publicKey;

  const { blockhash } = await connection.getLatestBlockhash('finalized');
  tx.recentBlockhash = blockhash;

  const signature = await sendAndConfirmTransaction(
    connection,
    tx,
    [payer],
    { commitment: 'confirmed' },
  );

  return {
    signature,
    amountTokens,
    mint: mintAddress,
  };
}
