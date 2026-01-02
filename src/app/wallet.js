// src/app/wallet.js
// Lokale "game wallet" voor CBS GO – nu met echte Ed25519 keypair.
// ---------------------------------------------------------------
// - 1 wallet per browser (Solana-compatibel keypair).
// - PIN is een simpele lock (niet cryptografisch sterk!).
// - "Unlocked" status is per tab/sessie (sessionStorage).
//
// ⚠️ Let op: secret key staat in plaintext in localStorage.
//   Gebruik dit NIET voor grote bedragen. Dit is nu puur
//   voor CBS-GO loot / kleine bedragen. Voor echte funds
//   moeten we later encryptie toevoegen.

// Nieuwe versie -> oude fake wallet negeren
const WALLET_KEY = 'cbsgo_wallet_v3';
const UNLOCK_KEY = 'cbsgo_wallet_unlocked_v3';

// Kleine dependency voor Ed25519 + base58
import nacl from 'tweetnacl';
import bs58 from 'bs58';

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

// Genereer een echte Ed25519 keypair (Solana-stijl)
// - pk = publicKey (base58)
// - sk = secretKey (base58, 64 bytes)
function generateKeypair() {
  const pair = nacl.sign.keyPair();
  const pk = bs58.encode(pair.publicKey);
  const sk = bs58.encode(pair.secretKey);
  return { pk, sk };
}

/* == Public API == */

// Is er überhaupt een wallet op dit apparaat?
export function hasWallet() {
  return !!loadWallet();
}

// Is de wallet in deze TAB/sessie unlocked?
export function isWalletUnlocked() {
  const wallet = loadWallet();
  if (!wallet) return false;
  return sessionStorage.getItem(UNLOCK_KEY) === '1';
}

// Maak een nieuwe wallet met gegeven PIN.
// - Maakt een echte Ed25519 keypair
// - Slaat (pk + sk + pin) op in localStorage
// - Markeer sessie als unlocked
// - Return de public key (zoals loginModal verwacht)
export function createWallet(pin) {
  const p = String(pin || '');

  if (p.length < 4) {
    throw new Error('PIN too short');
  }

  const existing = loadWallet();
  if (existing) {
    console.warn('CBS GO: overwriting existing wallet (v3)');
  }

  const { pk, sk } = generateKeypair();
  const wallet = { pk, sk, pin: p };
  saveWallet(wallet);
  sessionStorage.setItem(UNLOCK_KEY, '1');
  return pk;
}

// Probeer wallet te unlocken met een PIN.
// Bij succes -> markeer sessie als unlocked en return pk.
// Bij failure -> gooi error (loginModal vangt dit af).
export function unlockWallet(pin) {
  const wallet = loadWallet();
  if (!wallet) {
    throw new Error('No wallet');
  }

  const p = String(pin || '');
  if (p !== wallet.pin) {
    throw new Error('Incorrect PIN');
  }

  sessionStorage.setItem(UNLOCK_KEY, '1');
  return wallet.pk;
}

// Geef de public key van de lokale wallet (of lege string).
export function getPublicKey() {
  const wallet = loadWallet();
  return wallet ? wallet.pk : '';
}

// Extra helper om (later) secretKey te kunnen gebruiken
// Bijvoorbeeld voor signeren met @solana/web3.js.
export function getSecretKeyBase58() {
  const wallet = loadWallet();
  return wallet ? wallet.sk : '';
}

// Optionele helper om alles te wissen (voor dev / reset)
export function devResetWallet() {
  localStorage.removeItem(WALLET_KEY);
  sessionStorage.removeItem(UNLOCK_KEY);
}

// Handig om in dev-console te kunnen aanroepen
if (typeof window !== 'undefined') {
  window.cbsgoDevResetWallet = devResetWallet;
}
