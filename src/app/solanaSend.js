// src/app/solanaSend.js
// Echte on-chain sends voor CBS-GO, maar veilig en simpel gehouden.
//
// - Gebruikt de lokale Solana-wallet uit solanaLocalWallet.js
// - Standaard mainnet RPC, of VITE_SOLANA_RPC uit je .env
// - Ondersteunt SOL en SPL-tokens (zoals CBS)
//
// Let op: dit is pure "engine" code. De UI (wallet formulier in appShell)
// moet hier nog tegenaan geknoopt worden in een volgende stap.

import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
  getMint,
  transfer as splTransfer,
} from '@solana/spl-token';

import bs58 from 'bs58';

import {
  getLocalSecretKeyBase58,
  getLocalPublicKey,
} from './solanaLocalWallet.js';

// ---------- RPC helper ----------

function getRpcEndpoint() {
  // Je kunt zelf een RPC-endpoint zetten in .env:
  // VITE_SOLANA_RPC="https://..."
  if (import.meta && import.meta.env && import.meta.env.VITE_SOLANA_RPC) {
    return import.meta.env.VITE_SOLANA_RPC;
  }
  // Fallback: standaard mainnet
  return 'https://api.mainnet-beta.solana.com';
}

function getConnection() {
  const rpc = getRpcEndpoint();
  return new Connection(rpc, 'confirmed');
}

// ---------- Lokale keypair uit Base58 secret ----------

function getLocalKeypair() {
  const b58 = getLocalSecretKeyBase58();
  if (!b58) {
    throw new Error('No local private key found. Unlock your CBS-GO wallet first.');
  }

  let secretBytes;
  try {
    secretBytes = bs58.decode(b58);
  } catch (e) {
    console.warn('CBS-GO: failed to decode Base58 secret', e);
    throw new Error('Could not decode local private key (Base58).');
  }

  try {
    return Keypair.fromSecretKey(secretBytes);
  } catch (e) {
    console.warn('CBS-GO: failed to create Keypair from secret', e);
    throw new Error('Could not create wallet from private key.');
  }
}

// Kleine helper om nette fouttekst te geven in de UI
function normalizeError(err) {
  if (!err) return 'Unknown error';
  if (typeof err === 'string') return err;
  if (err.message) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

// ---------- Publieke helpers ----------

/**
 * Haal SOL balance op van de lokale wallet.
 * Returned een object zoals:
 * { pubkey: string, sol: number }
 */
export async function getSolBalance() {
  const conn = getConnection();
  const pubkeyStr = getLocalPublicKey();
  if (!pubkeyStr) {
    throw new Error('No local wallet address found.');
  }
  const pubkey = new PublicKey(pubkeyStr);
  const lamports = await conn.getBalance(pubkey, { commitment: 'confirmed' });
  const sol = lamports / LAMPORTS_PER_SOL;
  return { pubkey: pubkey.toBase58(), sol };
}

/**
 * Haal SPL-token balance op van een bepaalde mint (bijv. CBS).
 * @param {string} mintAddress - SPL mint address (bijv. CBS mint)
 * Returned een object zoals:
 * {
 *   owner: string,
 *   mint: string,
 *   amount: number,   // in normale tokens (met decimals verwerkt)
 *   rawAmount: string // als string in base units
 *   decimals: number
 * }
 */
export async function getSplTokenBalance(mintAddress) {
  const conn = getConnection();
  const ownerStr = getLocalPublicKey();
  if (!ownerStr) {
    throw new Error('No local wallet address found.');
  }

  const owner = new PublicKey(ownerStr);
  const mint = new PublicKey(mintAddress);

  // Bijbehorende token account
  const ata = await getOrCreateAssociatedTokenAccount(
    conn,
    getLocalKeypair(), // payer voor eventueel aanmaken
    mint,
    owner,
  );

  // Token account info
  const accountInfo = await getAccount(conn, ata.address);
  const mintInfo = await getMint(conn, mint);

  const decimals = mintInfo.decimals ?? 0;

  const rawAmount = accountInfo.amount; // bigint
  const divisor = 10 ** decimals;
  const amount = Number(rawAmount) / divisor;

  return {
    owner: owner.toBase58(),
    mint: mint.toBase58(),
    amount,
    rawAmount: rawAmount.toString(),
    decimals,
  };
}

/**
 * Stuur native SOL van de lokale wallet naar een ander adres.
 *
 * @param {Object} params
 * @param {string} params.toAddress - ontvanger Solana adres
 * @param {number} params.amountSol - hoeveelheid SOL (bijv. 0.01)
 *
 * Returned:
 * {
 *   signature: string,
 *   explorerUrl: string,
 * }
 */
export async function sendSol({ toAddress, amountSol }) {
  if (!toAddress || !amountSol || amountSol <= 0) {
    throw new Error('Invalid send parameters (need toAddress and amountSol > 0).');
  }

  const conn = getConnection();
  const fromKeypair = getLocalKeypair();
  const fromPubkey = fromKeypair.publicKey;
  const toPubkey = new PublicKey(toAddress);

  // Balans check
  const balance = await conn.getBalance(fromPubkey, { commitment: 'confirmed' });
  const lamportsToSend = Math.round(amountSol * LAMPORTS_PER_SOL);

  // Klein beetje extra voor fee
  const feeSafetyLamports = 5000; // ~0.000005 SOL

  if (balance < lamportsToSend + feeSafetyLamports) {
    throw new Error('Not enough SOL in wallet to cover amount + fee.');
  }

  const tx = SystemProgram.transfer({
    fromPubkey,
    toPubkey,
    lamports: lamportsToSend,
  });

  // Belangrijk: we maken een echte Transaction om later makkelijk uitbreiden mogelijk te houden.
  const transaction = new (await import('@solana/web3.js')).Transaction().add(tx);

  let signature;
  try {
    signature = await sendAndConfirmTransaction(conn, transaction, [fromKeypair], {
      commitment: 'confirmed',
    });
  } catch (e) {
    console.warn('CBS-GO: sendSol failed', e);
    throw new Error(normalizeError(e));
  }

  const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=mainnet`;

  return { signature, explorerUrl };
}

/**
 * Stuur een SPL-token (bijv. CBS) van de lokale wallet naar een ander adres.
 *
 * @param {Object} params
 * @param {string} params.mintAddress - SPL mint address (CBS of andere)
 * @param {string} params.toAddress - ontvanger wallet
 * @param {number} params.amountTokens - hoeveelheid in "normale" tokens (bijv. 10 CBS)
 *
 * Returned:
 * {
 *   signature: string,
 *   explorerUrl: string,
 * }
 */
export async function sendSplToken({ mintAddress, toAddress, amountTokens }) {
  if (!mintAddress || !toAddress || !amountTokens || amountTokens <= 0) {
    throw new Error(
      'Invalid send parameters (need mintAddress, toAddress and amountTokens > 0).',
    );
  }

  const conn = getConnection();
  const fromKeypair = getLocalKeypair();
  const fromOwner = fromKeypair.publicKey;
  const mint = new PublicKey(mintAddress);
  const toOwner = new PublicKey(toAddress);

  // Mint-info (voor decimals)
  const mintInfo = await getMint(conn, mint);
  const decimals = mintInfo.decimals ?? 0;

  const baseUnits = BigInt(
    Math.round(amountTokens * 10 ** decimals),
  ); // hoeveelheid in base units (u64)

  // Associated token accounts voor sender en ontvanger
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    fromKeypair,
    mint,
    fromOwner,
  );

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    fromKeypair,
    mint,
    toOwner,
  );

  // Check of er genoeg balance is
  const fromAccountInfo = await getAccount(conn, fromTokenAccount.address);
  if (fromAccountInfo.amount < baseUnits) {
    throw new Error('Not enough token balance in wallet.');
  }

  let signature;
  try {
    signature = await splTransfer(
      conn,
      fromKeypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromOwner,
      baseUnits,
    );
  } catch (e) {
    console.warn('CBS-GO: sendSplToken failed', e);
    throw new Error(normalizeError(e));
  }

  const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=mainnet`;

  return { signature, explorerUrl };
}
