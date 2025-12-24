// src/ui/puzzleModal.js
// Daily Puzzle Modal (Minesweeper + glow)
// Triggered by: window event "cbsgo:dailyPuzzle" from steps.js
//
// ✅ Rewards on win:
// - Activate 60 minutes ticket boost (extra tickets while walking)
// - +XP bonus
// - Optional instant ticket

import { addXp } from '../app/state.js';
import { addTickets } from '../app/inventory.js';
import { activateTicketBoost } from '../app/steps.js';

let _open = false;
let _rootEl = null;

function ensureRoot() {
  if (_rootEl) return _rootEl;

  const el = document.createElement('div');
  el.id = 'cbsgo-puzzle-modal-root';
  el.style.position = 'fixed';
  el.style.inset = '0';
  el.style.zIndex = '9999';
  el.style.display = 'none';
  document.body.appendChild(el);

  _rootEl = el;
  return el;
}

function closeModal() {
  const root = ensureRoot();
  root.style.display = 'none';
  root.innerHTML = '';
  _open = false;
}

function glowCss() {
  return `
    <style>
      .cbsgo-overlay{
        position:absolute; inset:0;
        background:rgba(0,0,0,.55);
        backdrop-filter: blur(6px);
        display:flex; align-items:center; justify-content:center;
        padding:16px;
      }
      .cbsgo-card{
        width:min(520px, 96vw);
        border-radius:18px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.92);
        color:#fff;
        box-shadow: 0 16px 60px rgba(0,0,0,.55);
        overflow:hidden;
      }
      .cbsgo-head{
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
      }
      .cbsgo-title{
        display:flex; flex-direction:column; gap:2px;
      }
      .cbsgo-title b{ font-size:14px; }
      .cbsgo-title span{ font-size:12px; opacity:.8; }
      .cbsgo-x{
        cursor:pointer;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        color:#fff;
        border-radius:12px;
        padding:6px 10px;
        font-size:12px;
      }
      .cbsgo-body{
        padding:14px;
        display:flex;
        flex-direction:column;
        gap:12px;
      }
      .cbsgo-glow{
        border:1px solid rgba(140,200,255,.25);
        background: radial-gradient(circle at 20% 0%, rgba(130,220,255,.25), transparent 55%),
                    radial-gradient(circle at 80% 100%, rgba(160,120,255,.18), transparent 60%),
                    rgba(255,255,255,.05);
        border-radius:14px;
        padding:10px 12px;
        font-size:12px;
        box-shadow: 0 0 22px rgba(90,190,255,.18);
      }
      .cbsgo-grid{
        display:grid;
        gap:8px;
        justify-content:center;
        user-select:none;
      }
      .cbsgo-cell{
        width:44px; height:44px;
        border-radius:12px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        display:flex; align-items:center; justify-content:center;
        font-weight:700;
        cursor:pointer;
        transition: transform .08s ease, background .12s ease;
      }
      .cbsgo-cell:active{ transform: scale(.98); }
      .cbsgo-cell.revealed{
        background:rgba(255,255,255,.10);
        cursor:default;
      }
      .cbsgo-cell.mine{
        background:rgba(255,80,80,.18);
        border-color: rgba(255,80,80,.28);
      }
      .cbsgo-row{
        display:flex; gap:10px; flex-wrap:wrap;
        align-items:center; justify-content:space-between;
      }
      .cbsgo-pill{
        font-size:12px;
        padding:6px 10px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        opacity:.92;
      }
      .cbsgo-btn{
        cursor:pointer;
        border:1px solid rgba(255,255,255,.16);
        background:rgba(255,255,255,.08);
        color:#fff;
        border-radius:14px;
        padding:10px 12px;
        font-weight:700;
        font-size:12px;
      }
      .cbsgo-btn.primary{
        border-color: rgba(120,220,255,.35);
        background: rgba(90,200,255,.15);
        box-shadow: 0 0 18px rgba(90,200,255,.15);
      }
      .cbsgo-foot{
        padding:12px 14px;
        border-top:1px solid rgba(255,255,255,.10);
        display:flex;
        gap:10px;
        justify-content:flex-end;
      }
    </style>
  `;
}

function seededRng(seedStr) {
  // tiny deterministic rng (xorshift32)
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let x = h >>> 0;
  return () => {
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17; x >>>= 0;
    x ^= x << 5;  x >>>= 0;
    return (x >>> 0) / 4294967296;
  };
}

function makeBoard({ rows, cols, mines, seed }) {
  const rng = seededRng(seed);
  const n = rows * cols;
  const mineSet = new Set();

  while (mineSet.size < mines) {
    const idx = Math.floor(rng() * n);
    mineSet.add(idx);
  }

  const board = Array.from({ length: n }, (_, idx) => ({
    idx,
    mine: mineSet.has(idx),
    revealed: false,
    flagged: false,
    number: 0
  }));

  const getRC = (i) => [Math.floor(i / cols), i % cols];
  const inBounds = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;
  const neighbors = (i) => {
    const [r, c] = getRC(i);
    const res = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const rr = r + dr, cc = c + dc;
        if (inBounds(rr, cc)) res.push(rr * cols + cc);
      }
    }
    return res;
  };

  for (let i = 0; i < n; i++) {
    if (board[i].mine) continue;
    const count = neighbors(i).reduce((acc, j) => acc + (board[j].mine ? 1 : 0), 0);
    board[i].number = count;
  }

  return { board, neighbors };
}

function openDailyMinesweeper({ lat, lng, dateKey }) {
  const root = ensureRoot();
  if (_open) return;
  _open = true;

  // Difficulty knobs
  const rows = 5;
  const cols = 5;
  const mines = 5;

  // Seed per day + location bucket => "daily feel" but not too predictable
  const seed = `${dateKey}|${Math.round(lat * 1000)}|${Math.round(lng * 1000)}`;

  const { board, neighbors } = makeBoard({ rows, cols, mines, seed });

  let alive = true;
  let revealedCount = 0;
  const safeCells = rows * cols - mines;

  const render = () => {
    const gridHtml = board.map((cell) => {
      let content = '';
      let cls = 'cbsgo-cell';

      if (cell.revealed) {
        cls += ' revealed';
        if (cell.mine) {
          cls += ' mine';
          content = '💥';
        } else if (cell.number > 0) {
          content = String(cell.number);
        } else {
          content = '';
        }
      }

      return `<div class="${cls}" data-idx="${cell.idx}">${content}</div>`;
    }).join('');

    root.innerHTML = `
      ${glowCss()}
      <div class="cbsgo-overlay" role="dialog" aria-modal="true">
        <div class="cbsgo-card">
          <div class="cbsgo-head">
            <div class="cbsgo-title">
              <b>Daily Mijnenveger (Glow)</b>
              <span>1× per dag — win een 1 uur ticket-boost</span>
            </div>
            <button class="cbsgo-x" data-close="1">Close</button>
          </div>

          <div class="cbsgo-body">
            <div class="cbsgo-glow">
              ✨ Glow actief na win: <b>+1 ticket</b> per <b>${BOOST_STEP_CHUNK_LABEL()}</b> stappen, <b>60 min</b> lang.
              <div style="opacity:.8; margin-top:6px;">
                Locatie: ${lat.toFixed(5)}, ${lng.toFixed(5)} · Seed: ${dateKey}
              </div>
            </div>

            <div class="cbsgo-row">
              <div class="cbsgo-pill">💣 Mines: <b>${mines}</b></div>
              <div class="cbsgo-pill">✅ Safe revealed: <b>${revealedCount}</b> / ${safeCells}</div>
              <div class="cbsgo-pill">${alive ? '🟢' : '🔴'} ${alive ? 'Alive' : 'Failed'}</div>
            </div>

            <div class="cbsgo-grid" style="grid-template-columns: repeat(${cols}, 44px);">
              ${gridHtml}
            </div>

            <div class="cbsgo-row">
              <button class="cbsgo-btn" data-restart="1">New (same daily)</button>
              <button class="cbsgo-btn primary" data-revealall="1">Reveal all</button>
            </div>
          </div>

          <div class="cbsgo-foot">
            <button class="cbsgo-btn" data-close="1">Close</button>
          </div>
        </div>
      </div>
    `;

    root.style.display = 'block';

    // events
    root.querySelectorAll('[data-close="1"]').forEach((b) => {
      b.onclick = () => closeModal();
    });

    const restartBtn = root.querySelector('[data-restart="1"]');
    if (restartBtn) restartBtn.onclick = () => {
      // reset state, keep same daily board seed
      for (const c of board) c.revealed = false;
      alive = true;
      revealedCount = 0;
      render();
    };

    const revealAllBtn = root.querySelector('[data-revealall="1"]');
    if (revealAllBtn) revealAllBtn.onclick = () => {
      for (const c of board) c.revealed = true;
      alive = false;
      render();
    };

    const grid = root.querySelector('.cbsgo-grid');
    if (grid) {
      grid.onclick = (ev) => {
        const cellEl = ev.target?.closest?.('[data-idx]');
        if (!cellEl) return;
        const idx = Number(cellEl.getAttribute('data-idx'));
        if (!Number.isFinite(idx)) return;

        onClick(idx);
      };
    }
  };

  const revealFlood = (startIdx) => {
    const stack = [startIdx];
    const seen = new Set();

    while (stack.length) {
      const i = stack.pop();
      if (seen.has(i)) continue;
      seen.add(i);

      const cell = board[i];
      if (!cell || cell.revealed) continue;
      if (cell.mine) continue;

      cell.revealed = true;
      revealedCount++;

      if (cell.number === 0) {
        for (const j of neighbors(i)) {
          if (!seen.has(j)) stack.push(j);
        }
      }
    }
  };

  const win = () => {
    // ✅ Rewards
    addXp(25);
    addTickets(1); // instant bonus (feel good)
    activateTicketBoost(60);

    // show all safe cells as revealed
    for (const c of board) {
      if (!c.mine) c.revealed = true;
    }

    root.innerHTML = `
      ${glowCss()}
      <div class="cbsgo-overlay" role="dialog" aria-modal="true">
        <div class="cbsgo-card">
          <div class="cbsgo-head">
            <div class="cbsgo-title">
              <b>🎉 Daily Puzzle cleared!</b>
              <span>Glow actief voor 60 minuten</span>
            </div>
            <button class="cbsgo-x" data-close="1">Close</button>
          </div>
          <div class="cbsgo-body">
            <div class="cbsgo-glow">
              ✅ +25 XP · 🎟️ +1 ticket · ✨ 1 uur glow boost gestart
              <div style="opacity:.85; margin-top:6px;">
                Tijdens glow: elke <b>${BOOST_STEP_CHUNK_LABEL()}</b> stappen = <b>+1 ticket</b>.
              </div>
            </div>
            <button class="cbsgo-btn primary" data-close="1">Nice — close</button>
          </div>
        </div>
      </div>
    `;
    root.style.display = 'block';
    root.querySelectorAll('[data-close="1"]').forEach((b) => (b.onclick = closeModal));
  };

  const lose = (idx) => {
    alive = false;
    // reveal mine
    board[idx].revealed = true;
    // reveal all mines for feedback
    for (const c of board) if (c.mine) c.revealed = true;
    render();
  };

  const onClick = (idx) => {
    if (!alive) return;

    const cell = board[idx];
    if (!cell || cell.revealed) return;

    if (cell.mine) return lose(idx);

    if (cell.number === 0) {
      revealFlood(idx);
    } else {
      cell.revealed = true;
      revealedCount++;
    }

    // Win condition
    if (revealedCount >= safeCells) {
      alive = false;
      return win();
    }

    render();
  };

  render();
}

function BOOST_STEP_CHUNK_LABEL() {
  // keep label in sync with steps.js BOOST_STEP_CHUNK (1500)
  return '1500';
}

// Listen for daily puzzle trigger from steps.js
window.addEventListener('cbsgo:dailyPuzzle', (e) => {
  try {
    const { lat, lng, date } = e.detail || {};
    if (typeof lat !== 'number' || typeof lng !== 'number') return;
    const dateKey = String(date || '').trim() || new Date().toISOString().slice(0, 10);

    openDailyMinesweeper({ lat, lng, dateKey });
  } catch {
    // no-op
  }
});

// Escape key closes modal
window.addEventListener('keydown', (e) => {
  if (!_open) return;
  if (e.key === 'Escape') closeModal();
});

// Exported API (optional, in case other UI wants to open it)
export function openPuzzleModal() {
  // kept for compatibility (if other modules import it)
  // this file now opens via event, but you can implement custom opens here later.
}

export function closePuzzleModal() {
  closeModal();
}
