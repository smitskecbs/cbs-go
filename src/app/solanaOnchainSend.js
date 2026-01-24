// src/app/solanaOnchainSend.js
// Echte on-chain SOL send helper voor de lokale CBS-GO wallet.
//
// Dit gebruikt:
// - @solana/web3.js  -> verbinding + transacties
// - bs58             -> jouw Base58 private key uit solanaLocalWallet.js
//
// In appShell.js wordt deze functie al gebruikt:
//   sendSolFromLocalWallet({ toAddress, amountSol })
//
// LET OP: standaard gaat dit naar MAINNET.
// Wil je eerst testen op devnet? Zet dan VITE_SOLANA_RPC_URL op een devnet URL
// in een .env bestand, bv:
//   VITE_SOLANA_RPC_URL = "https://api.devnet.solana.com"

import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
} from '@solana/web3.js';
import bs58 from 'bs58';
import { getLocalSecretKeyBase58 } from './solanaLocalWallet.js';

// 🌐 RPC kiezen
// - Als je VITE_SOLANA_RPC_URL zet, gebruiken we die.
// - Anders pakken we standaard mainnet-beta.
const RPC_URL =
  import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta');

let _connection = null;

function getConnection() {
  if (!_connection) {
    _connection = new Connection(RPC_URL, 'confirmed');
  }
  return _connection;
}

// Lokale keypair uit je Base58 secret
function getLocalKeypair() {
  const secretBase58 = getLocalSecretKeyBase58();
  if (!secretBase58) {
    throw new Error(
      'Local wallet not ready yet. Open CBS-GO once so a wallet can be created.',
    );
  }

  let secretKey;
  try {
    secretKey = bs58.decode(secretBase58);
  } catch (e) {
    console.error('Failed to decode local secret key (base58).', e);
    throw new Error('Could not load local wallet secret key.');
  }

  try {
    return Keypair.fromSecretKey(secretKey);
  } catch (e) {
    console.error('Failed to create keypair from secret key.', e);
    throw new Error('Could not create local wallet keypair.');
  }
}

/**
 * Stuur SOL vanaf de lokale CBS-GO wallet.
 *
 * @param {Object} opts
 * @param {string} opts.toAddress  - Bestemmingsadres (Solana pubkey, base58)
 * @param {number} opts.amountSol  - Hoeveel SOL je wilt sturen (bv. 0.01)
 * @returns {Promise<{signature: string, amountSol: number}>}
 */
export async function sendSolFromLocalWallet({ toAddress, amountSol }) {
  if (!toAddress) {
    throw new Error('Destination address is required.');
  }
  if (!amountSol || amountSol <= 0) {
    throw new Error('Amount must be greater than 0.');
  }

  // Check of adres geldig is
  let toPubkey;
  try {
    toPubkey = new PublicKey(toAddress);
  } catch (e) {
    throw new Error('Destination address is not a valid Solana address.');
  }

  const conn = getConnection();
  const fromKeypair = getLocalKeypair();

  // Amount (SOL) -> lamports
  const lamports = Math.round(amountSol * 1_000_000_000); // 1 SOL = 1e9 lamports
  if (!Number.isFinite(lamports) || lamports <= 0) {
    throw new Error('Amount is too small. Try a higher amount.');
  }

  // Balance check inclusief een kleine fee-buffer (~0.0001 SOL)
  const balance = await conn.getBalance(fromKeypair.publicKey);
  const feeBuffer = Math.round(0.0001 * 1_000_000_000);

  if (balance < lamports + feeBuffer) {
    throw new Error('Not enough SOL in local wallet for amount + fees.');
  }

  // Transfer instructie
  const ix = SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey,
    lamports,
  });

  const tx = new Transaction().add(ix);
  tx.feePayer = fromKeypair.publicKey;

  const latest = await conn.getLatestBlockhash('finalized');
  tx.recentBlockhash = latest.blockhash;

  // Ondertekenen + verzenden
  const signature = await sendAndConfirmTransaction(conn, tx, [fromKeypair], {
    skipPreflight: false,
    commitment: 'confirmed',
  });

  return { signature, amountSol };
}

// Later kunnen we hier SPL-token helpers aan toevoegen, bv. sendCbsTokenFromLocalWallet(...)
