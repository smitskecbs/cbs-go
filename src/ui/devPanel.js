import { getLocalPublicKey } from '../app/solanaLocalWallet.js';
import { getPlayerName } from '../app/leaderboard.js';
import { getXp, getLevel } from '../app/state.js';
import * as inventory from '../app/inventory.js';
import { supabase } from '../app/supabaseClient.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function shortPk(pk) {
  const s = String(pk || '').trim();
  if (!s) return '—';
  if (s.length <= 14) return s;
  return `${s.slice(0, 6)}…${s.slice(-6)}`;
}

function getCardsCount(inv) {
  const cards = inv?.cards;
  if (!cards || typeof cards !== 'object') return 0;
  return Object.values(cards).reduce((sum, n) => sum + Number(n || 0), 0);
}
function addXpDev(amount = 100) {
  try {
    const raw = localStorage.getItem('cbsgo_state_v6') || '{}';
    const state = JSON.parse(raw);
    state.xp = Number(state.xp || 0) + amount;
    state.updatedAt = Date.now();
    localStorage.setItem('cbsgo_state_v6', JSON.stringify(state));

    window.dispatchEvent(new CustomEvent('cbsgo:xpChanged', { detail: { xp: state.xp } }));
    } catch (e) {
    console.warn('DEV XP add failed', e);
  }
}

function addTicketsDev(amount = 10) {
  try {
    if (typeof inventory.addTickets === 'function') {
      inventory.addTickets(amount);
    } else {
      const raw = localStorage.getItem('cbsgo_inventory_v2') || '{}';
      const inv = JSON.parse(raw);
      inv.tickets = Number(inv.tickets || 0) + amount;
      localStorage.setItem('cbsgo_inventory_v2', JSON.stringify(inv));
    }

    window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged'));
    window.dispatchEvent(new CustomEvent('cbsgo:bagChanged'));
  } catch (e) {
    console.warn('DEV tickets add failed', e);
  }
}

function addCbsDev(amount = 100) {
  try {
    const raw = localStorage.getItem('cbsgo_inventory_v2') || '{}';
    const inv = JSON.parse(raw);
    inv.cbs = Number(inv.cbs || 0) + amount;

    localStorage.setItem('cbsgo_inventory_v2', JSON.stringify(inv));
    window.dispatchEvent(new CustomEvent('cbsgo:inventoryChanged'));
     } catch (e) {
    console.warn('DEV CBS add failed', e);
  }
}
async function getPendingGiftsCount(wallet) {
  try {
    if (!wallet) return 0;

    const { count, error } = await supabase
      .from('trades')
      .select('*', { count: 'exact', head: true })
      .eq('to_wallet', wallet)
      .eq('status', 'pending');

    if (error) {
      console.warn('Gift debug count failed', error);
      return 0;
    }

    return count || 0;
  } catch (e) {
    console.warn('Gift debug error', e);
    return 0;
  }
}

export function renderDevPanelBody() {
  const wallet = getLocalPublicKey() || '';
  const nickname = getPlayerName() || '—';
  const xp = Number(getXp?.() || 0);
  const level = Number(getLevel?.(xp) || 1);

  const inv = inventory.loadInventory?.() || { tickets: 0, cbs: 0, cards: {} };
  const tickets = Number(inv.tickets || 0);
  const cbs = Number(inv.cbs || 0);
  const cards = getCardsCount(inv);

   return `
    <div style="display:grid;gap:8px;">
    <div style="padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);">
  <div style="font-size:11px;opacity:.7;">Wallet</div>
  <div style="font-size:12px;font-weight:700;color:#7dd3fc;">${esc(shortPk(wallet))}</div>
  <div id="devGiftCount" style="
    margin-top:6px;
    font-size:11px;
    opacity:.75;
  ">
    Gifts pending: loading...
  </div>
</div>

      <div style="padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);">
        <div style="font-size:11px;opacity:.7;">Nickname</div>
        <div style="font-size:12px;font-weight:700;">${esc(nickname)}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div style="padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);">
          <div style="font-size:11px;opacity:.7;">XP</div>
          <div style="font-size:12px;font-weight:700;">${xp}</div>
        </div>

        <div style="padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);">
          <div style="font-size:11px;opacity:.7;">Level</div>
          <div style="font-size:12px;font-weight:700;">${level}</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
        <div style="padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);">
          <div style="font-size:11px;opacity:.7;">Tickets</div>
          <div style="font-size:12px;font-weight:700;">${tickets}</div>
        </div>

        <div style="padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);">
          <div style="font-size:11px;opacity:.7;">CBS</div>
          <div style="font-size:12px;font-weight:700;">${cbs}</div>
        </div>

        <div style="padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);">
          <div style="font-size:11px;opacity:.7;">Cards</div>
          <div style="font-size:12px;font-weight:700;">${cards}</div>
        </div>
      </div>

      <div style="margin-top:4px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08);">
        <div style="font-size:11px;opacity:.7;margin-bottom:8px;">Dev actions</div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          <button id="devAddXpBtn" type="button" style="
            padding:8px 10px;
            border-radius:10px;
            border:1px solid rgba(255, 159, 28,.45);
            background:rgba(255, 159, 28,.10);
            color:#e5e7eb;
            font-size:12px;
            font-weight:700;
            cursor:pointer;
          ">+100 XP</button>

          <button id="devAddTicketsBtn" type="button" style="
            padding:8px 10px;
            border-radius:10px;
            border:1px solid rgba(255, 159, 28,.45);
            background:rgba(255, 159, 28,.10);
            color:#e5e7eb;
            font-size:12px;
            font-weight:700;
            cursor:pointer;
          ">+10 Tickets</button>

          <button id="devAddCbsBtn" type="button" style="
            padding:8px 10px;
            border-radius:10px;
            border:1px solid rgba(255, 159, 28,.45);
            background:rgba(255, 159, 28,.10);
            color:#e5e7eb;
            font-size:12px;
            font-weight:700;
            cursor:pointer;
          ">+100 CBS</button>
        </div>
      </div>
    </div>
  `;
}
export function bindDevPanelButtons() {
  const xpBtn = document.querySelector('#devAddXpBtn');
  const tBtn = document.querySelector('#devAddTicketsBtn');
  const cBtn = document.querySelector('#devAddCbsBtn');

  if (xpBtn) xpBtn.onclick = () => addXpDev(100);
  if (tBtn) tBtn.onclick = () => addTicketsDev(10);
  if (cBtn) cBtn.onclick = () => addCbsDev(100);
}
async function updateGiftDebugCount() {
  try {
    const wallet = getLocalPublicKey();
    const el = document.querySelector('#devGiftCount');
    if (!wallet || !el) return;

    const { count, error } = await supabase
      .from('cbsgo_trades')
      .select('*', { count: 'exact', head: true })
      .eq('to_wallet', wallet)
      .eq('claimed', false);

    if (error) {
      console.warn('Gift debug count failed', error);
      el.textContent = 'Gifts pending: error';
      return;
    }

    el.textContent = `Gifts pending: ${count || 0}`;
  } catch (e) {
    console.warn('Gift debug crashed', e);
  }
}
updateGiftDebugCount()
setInterval(updateGiftDebugCount, 4000)
