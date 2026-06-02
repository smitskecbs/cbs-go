// src/app/trades.js
// Off-chain gifts via Supabase: tickets + CBS + (optionele) cards.
// ✅ FIX: na send/claim ook meteen remote game_profiles updaten,
// zodat device B niet je oude bag terugzet.

import { supabase } from './supabaseClient.js';
import { getPublicKey } from './wallet.js';
import { getPlayerName, getPlayerAvatar, normalizePlayerNickname } from './leaderboard.js';
import { NICKNAME_REQUIRED_MESSAGE, requireGameplayAllowed } from './playerNickname.js';

import {
  addTickets,
  addCbsCoins,
  addCard,
  getTickets,
  getCbsCoins,
  loadInventory,
} from './inventory.js';

import { loadRemoteProfile, saveRemoteProfile } from './remoteProfile.js';

const TABLE = 'cbsgo_trades'; // tabelnaam in Supabase

// ----------------- Remote sync helpers -----------------
let _remoteSyncTimer = null;

async function persistBagToRemote() {
  // alleen als je email-login hebt (anders returnt remoteProfile null)
  const wallet_pk = getPublicKey();
  if (!wallet_pk) return;

  const localNick = normalizePlayerNickname(getPlayerName());
  const existingNick = normalizePlayerNickname(existing.nickname);
  const nickname = localNick || existingNick || null;
  const avatar = getPlayerAvatar() || null;

  const inv = loadInventory(); // {tickets,cbs,cards}

  // Merge met bestaande remote row zodat xp/level niet per ongeluk null wordt
  const existing = (await loadRemoteProfile()) || {};

  const merged = {
    wallet_pk,
    nickname,
    avatar,

    // behoud remote xp/level als die bestaan
    xp: existing.xp ?? null,
    level: existing.level ?? null,

    // ✅ de echte bag-stand
    tickets: Number(inv.tickets || 0),
    cbs_play: Number(inv.cbs || 0),
    cards_json: inv.cards && typeof inv.cards === 'object' ? inv.cards : {},

    // friends_json laten we met rust (anders overschrijven we die per ongeluk)
    friends_json:
      existing.friends_json && typeof existing.friends_json === 'object'
        ? existing.friends_json
        : {},
  };

  const saved = await saveRemoteProfile(merged);
  if (!saved) {
    console.warn('CBS GO: persistBagToRemote failed (not logged in or blocked)');
  } else {
    console.log('CBS GO: bag persisted to remote', {
      tickets: merged.tickets,
      cbs_play: merged.cbs_play,
      cards: Object.keys(merged.cards_json || {}).length,
    });
  }
}

// Debounce: als je meerdere changes snel achter elkaar hebt
function schedulePersistBagToRemote() {
  if (_remoteSyncTimer) clearTimeout(_remoteSyncTimer);
  _remoteSyncTimer = setTimeout(() => {
    persistBagToRemote().catch((e) =>
      console.warn('CBS GO: persistBagToRemote crash', e),
    );
  }, 600);
}

/**
 * Stuur een gift naar een andere CBS-GO wallet.
 * - Tickets & CBS worden NA een succesvolle insert uit je Bag gehaald.
 * - Kaarten worden NIET hier aangepast (dat doet de Cards + Bag logica al goed).
 */
export async function sendGiftToWallet(toWallet, payload) {
  if (!requireGameplayAllowed()) {
    throw new Error(NICKNAME_REQUIRED_MESSAGE);
  }

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

    if (tickets > 0) addTickets(-tickets);
    if (cbs > 0) addCbsCoins(-cbs);

    const afterTickets = getTickets();
    const afterCbs = getCbsCoins();
    console.log('CBS GO: bag after deduct', { afterTickets, afterCbs });

    // UI laten rerenderen
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged'));
      window.dispatchEvent(new CustomEvent('cbsgo:bagChanged'));
    }

    // ✅ FIX: schrijf nieuwe bag-stand ook naar remote profiel
    schedulePersistBagToRemote();
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
 * - Voor elke row proberen we eerst `claimed = true` te zetten met `.eq('claimed', false)`.
 * - Alleen als die update echt iets verandert, geven we de reward.
 */
export async function pullIncomingGifts() {
  const myWallet = getPublicKey();
  if (!myWallet) return;
  if (isPulling) return;
  if (!requireGameplayAllowed()) return;

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

    let changedBag = false;

    for (const row of data) {
      const rowId = row.id;

     const { data: updatedRows, error: updError } = await supabase
  .from(TABLE)
  .update({
    claimed: true,
    status: 'claimed',
    claimed_at: new Date().toISOString(),
  })
  .eq('id', rowId)
  .eq('claimed', false)
  .select('id');

      if (updError) {
        console.warn('CBS GO: failed to mark trade as claimed', updError);
        continue;
      }

      if (!updatedRows || !updatedRows.length) continue;

           const tickets = Number(row.tickets || 0);
      const cbs = Number(row.cbs || 0);
      const cardId = row.card_id || null;
      const cardQty = Number(row.card_qty || 0);

      if (tickets) {
        addTickets(tickets);
        changedBag = true;
      }

      if (cbs) {
        addCbsCoins(cbs);
        changedBag = true;
      }

      if (cardId && cardQty > 0) {
        addCard(cardId, cardQty);
        changedBag = true;
      }

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

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged'));
      window.dispatchEvent(new CustomEvent('cbsgo:bagChanged'));
    }

    // ✅ FIX: als bag veranderde door claims → meteen remote opslaan
    if (changedBag) schedulePersistBagToRemote();
  } finally {
    isPulling = false;
  }
}
