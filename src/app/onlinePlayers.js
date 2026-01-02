// src/app/onlinePlayers.js
// Profiel-sync naar Supabase (nickname + avatar + wallet + optioneel locatie)
//
// Wordt o.a. aangeroepen vanuit appShell.js:
//   syncPlayerProfile();
//
// En later ook vanuit playerSync.js:
//   syncPlayerProfile({ lat, lng });

import { getPublicKey } from './wallet.js';
import { getPlayerName, getPlayerAvatar } from './leaderboard.js';

// 🔧 Belangrijk: we gaan er hier vanuit dat je al een supabase client hebt.
// Meest gebruikelijk:
//
//   import { supabase } from './supabaseClient.js';
//
// Pas deze import aan als jouw pad anders is.
import { supabase } from './supabaseClient.js';

// Kleine helper om te voorkomen dat we syncen zonder wallet
function getBaseProfile() {
  const walletPk = getPublicKey();
  if (!walletPk) return null;

  const nickname = getPlayerName();
  const avatar = getPlayerAvatar(); // data URL (base64) van jouw profielfoto

  return {
    wallet_pk: walletPk,
    nickname,
    avatar,
  };
}

/**
 * syncPlayerProfile(extra?: object)
 *
 * - Stuurt wallet_pk + nickname + avatar naar Supabase.
 * - 'extra' kan dingen zijn als { lat, lng } vanuit playerSync.js.
 * - Upsert op wallet_pk zodat één rij per speler blijft.
 *
 * Vereiste tabel in Supabase:
 *   tabel: players
 *   kolommen:
 *     - wallet_pk (text, PRIMARY KEY of UNIQUE)
 *     - nickname (text)
 *     - avatar (text)        // data URL of later URL naar geuploade image
 *     - lat (numeric, optioneel)
 *     - lng (numeric, optioneel)
 *     - last_seen (timestamptz)
 */
export async function syncPlayerProfile(extra = {}) {
  try {
    const base = getBaseProfile();
    if (!base) {
      console.warn('CBS GO: no local wallet, skip profile sync');
      return;
    }

    const payload = {
      ...base,
      ...extra,
      last_seen: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('players') // 🔧 check of jouw tabel ook echt "players" heet
      .upsert(payload, {
        onConflict: 'wallet_pk', // 1 rij per wallet
      });

    if (error) {
      console.warn('CBS GO: failed to sync player profile', error);
    }
  } catch (e) {
    console.warn('CBS GO: syncPlayerProfile crashed', e);
  }
}
