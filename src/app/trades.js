// src/app/trades.js
// Off-chain gifts via Supabase: tickets + CBS + (optionele) cards.

import { supabase } from './supabaseClient.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName, getPlayerAvatar } from './leaderboard.js';
import {
  addTickets,
  addCbsCoins,
  getTickets,
  getCbsCoins,
} from './inventory.js';

const TABLE = 'cbsgo_trades'; // tabelnaam in Supabase

/**
 * Stuur een gift naar een andere CBS-GO wallet.
 * - Tickets & CBS worden NA een succesvolle insert uit je Bag gehaald.
 * - Kaarten worden NIET hier aangepast (dat doet de Cards + Bag logica al goed).
 */
export async function sendGiftToWallet(toWallet, payload) {
  const fromWallet = getPublicKey();
  if (!fromWallet) {
    throw new Error('No local CBS-GO wallet available.');
  }

  const senderNickname = getPlayerName();
  const senderAvatar = getPlayerAvatar();

  const tickets = Number(payload?.tickets || 0);
  const cbs = Number(payload?.cbs || 0);
  const cardId = payload?.cardId || null;
  const cardQty = cardId ? Number(payload?.cardQty || 0) : 0;

  // Niks te versturen?
  if (!tickets && !cbs && !cardId) {
    throw new Error('Nothing to send.');
  }

  // 🔒 Check of je genoeg in je Bag hebt (alleen tickets & CBS)
  const currentTickets = getTickets();
  const currentCbs = getCbsCoins();

  if (tickets > 0 && tickets > currentTickets) {
    throw new Error('Not enough tickets in your bag.');
  }
  if (cbs > 0 && cbs > currentCbs) {
    throw new Error('Not enough CBS (play money) in your bag.');
  }

  // 💾 Supabase insert
  const { error } = await supabase.from(TABLE).insert({
    from_wallet: fromWallet,
    to_wallet: toWallet,
    tickets,
    cbs,
    card_id: cardId,
    card_qty: cardQty,
    sender_nickname: senderNickname || null,
    sender_avatar: senderAvatar || null,
    claimed: false,
  });

  if (error) {
    console.warn('CBS GO: sendGiftToWallet failed', error);
    throw new Error(error.message || 'Could not send gift.');
  }

  // ✅ Lokale Bag bijwerken (alleen als insert gelukt is)
  try {
    const beforeTickets = getTickets();
    const beforeCbs = getCbsCoins();
    console.log('CBS GO: deducting from bag', {
      tickets,
      cbs,
      beforeTickets,
      beforeCbs,
    });

    if (tickets > 0) {
      addTickets(-tickets);
    }
    if (cbs > 0) {
      addCbsCoins(-cbs);
    }

    const afterTickets = getTickets();
    const afterCbs = getCbsCoins();
    console.log('CBS GO: bag after deduct', {
      afterTickets,
      afterCbs,
    });

    // UI laten rerenderen (Bag + eventuele andere listeners)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged'));
      window.dispatchEvent(new CustomEvent('cbsgo:bagChanged'));
    }
  } catch (e) {
    console.warn('CBS GO: failed to update local bag after trade', e);
  }
}

let isPulling = false; // simpele lock om parallelle pulls te voorkomen

/**
 * Haal inkomende gifts op voor de huidige wallet.
 * - Voegt tickets + CBS toe aan je inventory.
 * - Stuurt een cbsgo:friendGiftReceived event
 *   (appShell.js doet daar kaarten + popup mee).
 *
 * Idempotent gemaakt:
 * - Voor elke row proberen we eerst `claimed = true` te zetten
 *   met `.eq('claimed', false)`.
 * - Alleen als die update echt iets verandert, geven we de reward.
 *   -> geen dubbele tickets/CBS als pullIncomingGifts meerdere keren draait.
 */
export async function pullIncomingGifts() {
  const myWallet = getPublicKey();
  if (!myWallet) return;
  if (isPulling) {
    // Al bezig; voorkom parallelle runs
    return;
  }

  isPulling = true;
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('to_wallet', myWallet)
      .eq('claimed', false)
      .order('created_at', { ascending: true })
      .limit(50);

    if (error) {
      console.warn('CBS GO: pullIncomingGifts failed', error);
      return;
    }

    if (!data || !data.length) return;

    for (const row of data) {
      const rowId = row.id;

      // 🔒 Eerst proberen deze trade "te claimen" op de server.
      // Alleen als claimed nog false is, krijgen we een row terug.
      const { data: updatedRows, error: updError } = await supabase
        .from(TABLE)
        .update({ claimed: true })
        .eq('id', rowId)
        .eq('claimed', false)
        .select('id');

      if (updError) {
        console.warn('CBS GO: failed to mark trade as claimed', updError);
        continue;
      }

      // Als er geen rows terugkomen, was hij al claimed door een andere call.
      if (!updatedRows || !updatedRows.length) {
        // Al verwerkt; geen rewards meer toekennen.
        continue;
      }

      // 👉 Vanaf hier weten we zeker dat wij de "eerste" zijn die deze gift pakken.
      const tickets = Number(row.tickets || 0);
      const cbs = Number(row.cbs || 0);
      const cardId = row.card_id || null;
      const cardQty = Number(row.card_qty || 0);

      // Inventory updaten (tickets + CBS)
      if (tickets) addTickets(tickets);
      if (cbs) addCbsCoins(cbs);

      // Frontend event -> appShell.js doet de rest (kaarten + popup)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('cbsgo:friendGiftReceived', {
            detail: {
              senderNickname: row.sender_nickname || '',
              senderAvatar: row.sender_avatar || '',
              toWallet: row.to_wallet,
              tickets,
              cbs,
              cardId,
              cardQty,
            },
          }),
        );
      }
    }

    // Inventaris kan veranderd zijn: laat Bag zichzelf rerenderen
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged'));
      window.dispatchEvent(new CustomEvent('cbsgo:bagChanged'));
    }
  } finally {
    isPulling = false;
  }
}
