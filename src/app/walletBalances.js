// src/app/walletBalances.js
// Centrale balans per CBS-GO wallet in Supabase
//
// Tabellen:
//   wallet_balances (wallet_pk unique)
//
// Dit script leest de lokale state (wallet + nickname + inventory)
// en doet een upsert naar Supabase.
//
// Wordt aangeroepen bij app-start en bij inventory-wijzigingen.

import { supabase } from './supabaseClient.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName } from './leaderboard.js';
import { getTickets, getCbsCoins } from './inventory.js';

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Sync de huidige lokale speler naar wallet_balances.
 * - 1 rij per wallet_pk
 * - nickname wordt meegenomen
 * - tickets + cbs_play worden geüpdatet
 */
export async function syncWalletBalanceFromLocal() {
  try {
    const walletPk = getPublicKey();
    if (!walletPk) {
      // nog geen lokale wallet (zou zeldzaam moeten zijn)
      return;
    }

    const nickname = getPlayerName() || null;
    const tickets = safeNumber(getTickets(), 0);
    const cbsPlay = safeNumber(getCbsCoins(), 0);

    const payload = {
      wallet_pk: walletPk,
      nickname,
      tickets,
      cbs_play: cbsPlay,
    };

    // upsert op wallet_pk (1 record per wallet)
    const { error } = await supabase
      .from('wallet_balances')
      .upsert(payload, { onConflict: 'wallet_pk' });

    if (error) {
      console.warn('CBS GO: wallet balance sync error', error);
    } else {
      // Handig voor debuggen:
      console.log(
        '[CBS GO] wallet balance synced',
        walletPk,
        `tickets=${tickets}`,
        `cbs=${cbsPlay}`,
      );
    }
  } catch (e) {
    console.warn('CBS GO: syncWalletBalanceFromLocal failed', e);
  }
}

/**
 * Optioneel helper: balans ophalen uit Supabase.
 * Gebruiken we later als we remote balans terug willen lezen.
 */
export async function loadWalletBalance() {
  try {
    const walletPk = getPublicKey();
    if (!walletPk) return null;

    const { data, error } = await supabase
      .from('wallet_balances')
      .select('tickets, cbs_play, nickname')
      .eq('wallet_pk', walletPk)
      .maybeSingle();

    if (error) {
      console.warn('CBS GO: loadWalletBalance error', error);
      return null;
    }

    return data || null;
  } catch (e) {
    console.warn('CBS GO: loadWalletBalance failed', e);
    return null;
  }
}
