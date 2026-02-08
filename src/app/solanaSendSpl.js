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
  createTransferCheckedInstruction,
  getAccount,
} from '@solana/spl-token';

import bs58 from 'bs58';
import { getLocalSecretKeyBase58 } from './solanaLocalWallet.js';

const RPC = import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta');

function toRawAmountBigInt(amountTokens, decimals) {
  // accepteert number of string; zet veilig om naar raw BigInt
  const s = String(amountTokens ?? '').trim().replace(',', '.');
  if (!s) throw new Error('Amount missing');

  if (!/^\d+(\.\d+)?$/.test(s)) throw new Error('Invalid amount format');

  const [intPart, fracPartRaw = ''] = s.split('.');
  const fracPart = fracPartRaw.slice(0, decimals).padEnd(decimals, '0'); // truncate + pad
  const combined = `${intPart}${fracPart}`.replace(/^0+/, '') || '0';

  return BigInt(combined);
}

/**
 * Stuur een SPL-token vanaf je lokale wallet.
 *
 * @param {Object} params
 * @param {string} params.mintAddress
 * @param {string} params.toAddress
 * @param {number|string} params.amountTokens
 * @param {number} params.decimals
 */
export async function sendSplFromLocalWallet({
  mintAddress,
  toAddress,
  amountTokens,
  decimals,
}) {
  if (!mintAddress) throw new Error('Missing mint address');
  if (!toAddress) throw new Error('Missing destination wallet');
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) {
    throw new Error('Invalid decimals value');
  }

  const rawAmount = toRawAmountBigInt(amountTokens, decimals);
  if (rawAmount <= 0n) throw new Error('Amount must be greater than 0');

  const connection = new Connection(RPC, 'confirmed');

  const sk58 = getLocalSecretKeyBase58();
  if (!sk58) throw new Error('No local private key available');

  const secretKeyBytes = bs58.decode(sk58);
  const payer = Keypair.fromSecretKey(secretKeyBytes);

  const mint = new PublicKey(mintAddress);
  const toWallet = new PublicKey(toAddress);

  const fromAta = await getAssociatedTokenAddress(mint, payer.publicKey);
  const toAta = await getAssociatedTokenAddress(mint, toWallet);

  const instructions = [];

  // Ensure recipient ATA exists
  try {
    await getAccount(connection, toAta);
  } catch {
    instructions.push(
      createAssociatedTokenAccountInstruction(
        payer.publicKey, // payer
        toAta,           // ATA
        toWallet,        // owner
        mint,            // mint
      ),
    );
  }

  // ✅ Checked transfer (decimals verified)
  instructions.push(
    createTransferCheckedInstruction(
      fromAta,
      mint,
      toAta,
      payer.publicKey,
      rawAmount,
      decimals,
    ),
  );

  const tx = new Transaction().add(...instructions);
  tx.feePayer = payer.publicKey;

  const { blockhash } = await connection.getLatestBlockhash('finalized');
  tx.recentBlockhash = blockhash;

  const signature = await sendAndConfirmTransaction(connection, tx, [payer], {
    commitment: 'confirmed',
  });

  return {
    signature,
    amountTokens: String(amountTokens),
    rawAmount: rawAmount.toString(),
    mint: mintAddress,
  };
}
