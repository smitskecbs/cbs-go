// src/app/wallet.js
// Eenvoudige lokale "game wallet" voor CBS GO.
// - 1 wallet per browser (geen echte SOL, alleen een pseudo public key).
// - PIN wordt als string opgeslagen (game, geen echte crypto).
// - "Unlocked" status is per tab/sessie (sessionStorage).

const WALLET_KEY = 'cbsgo_wallet_v2';         // v2 om oude, kapotte data te negeren
const UNLOCK_KEY = 'cbsgo_wallet_unlocked_v2';

function loadWallet() {
  try {
    const raw = localStorage.getItem(WALLET_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.pk || !parsed.pin) return null;
    return {
      pk: String(parsed.pk),
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
      pin: String(wallet.pin),
    }),
  );
}

// Simpele pseudo-public key generator (base58-achtig, begint met "CBS")
function generatePublicKey() {
  const alphabet =
    '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let out = 'CBS';
  for (let i = 0; i < 36; i += 1) {
    const r = Math.floor(Math.random() * alphabet.length);
    out += alphabet[r];
  }
  return out;
}

// == Public API ==

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
// Wordt direct als "unlocked" gemarkeerd in deze sessie.
// createWallet(pin) moet de public key teruggeven (zoals jouw modal verwacht).
export function createWallet(pin) {
  const p = String(pin || '');

  if (p.length < 4) {
    throw new Error('PIN too short');
  }

  const existing = loadWallet();
  if (existing) {
    // Optioneel: overschrijven is toegestaan; als je dit niet wilt, kun je hier throwen.
    console.warn('CBS GO: overwriting existing wallet');
  }

  const pk = generatePublicKey();
  const wallet = { pk, pin: p };
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

// Optionele helper om alles te wissen (voor dev / reset)
// Gebruik bv. via console: window.cbsgoDevResetWallet()
export function devResetWallet() {
  localStorage.removeItem(WALLET_KEY);
  sessionStorage.removeItem(UNLOCK_KEY);
}

// Handig om in dev-console te kunnen aanroepen
if (typeof window !== 'undefined') {
  window.cbsgoDevResetWallet = devResetWallet;
}
