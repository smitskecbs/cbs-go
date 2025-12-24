// src/ui/puzzleModal.js
// Puzzle modal system
// ✅ Exports openPuzzleModal(node)
// ✅ Supports Daily Glow puzzle when node.id === '__daily__'
// ✅ Daily no longer auto-opens. It opens via a map marker (mapView.js).

import { activateTicketBoost } from '../app/steps.js';

const MODAL_ID = 'cbsgoPuzzleModal';
const DAILY_NODE_ID = '__daily__';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function removeModal() {
  const el = document.getElementById(MODAL_ID);
  if (el) el.remove();
}

function ensureModalHost() {
  removeModal();

  const wrap = document.createElement('div');
  wrap.id = MODAL_ID;
  wrap.style.position = 'fixed';
  wrap.style.inset = '0';
  wrap.style.zIndex = '99999';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.padding = '16px';
  wrap.style.background = 'rgba(0,0,0,.62)';
  wrap.style.backdropFilter = 'blur(10px)';

  wrap.innerHTML = `
    <div style="
      width:min(720px, 96vw);
      max-height:min(82vh, 720px);
      overflow:auto;
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.55);
      color:#fff;
      font-family:system-ui, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
        position:sticky; top:0;
        background:rgba(10,12,18,.92);
        backdrop-filter: blur(10px);
        z-index:5;
      ">
        <div id="cbsgoPuzzleTitle" style="font-weight:900;">Puzzle</div>
        <button id="cbsgoPuzzleClose" type="button" style="
          border:0;
          padding:8px 10px;
          border-radius:12px;
          background:rgba(255,255,255,.08);
          color:#fff;
        ">Close</button>
      </div>

      <div id="cbsgoPuzzleBody" style="padding:14px;"></div>
    </div>
  `;

  document.body.appendChild(wrap);

  const closeBtn = wrap.querySelector('#cbsgoPuzzleClose');
  if (closeBtn) closeBtn.onclick = removeModal;

  wrap.addEventListener('click', (e) => {
    if (e.target === wrap) removeModal();
  });

  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') removeModal();
    },
    { once: true }
  );

  return wrap;
}

/* ---------------- Glow Minesweeper (simple) ---------------- */

function renderGlowMinesweeper(onWin) {
  const size = 5;
  const mines = 5;
  const total = size * size;

  const cells = Array.from({ length: total }, () => ({
    mine: false,
    revealed: false,
    flagged: false,
    n: 0
  }));

  let placed = 0;
  while (placed < mines) {
    const i = Math.floor(Math.random() * total);
    if (!cells[i].mine) {
      cells[i].mine = true;
      placed++;
    }
  }

  const idx = (r, c) => r * size + c;
  const inb = (r, c) => r >= 0 && c >= 0 && r < size && c < size;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const i = idx(r, c);
      if (cells[i].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          const rr = r + dr,
            cc = c + dc;
          if (inb(rr, cc) && cells[idx(rr, cc)].mine) n++;
        }
      }
      cells[i].n = n;
    }
  }

  const root = document.createElement('div');

  const msg = document.createElement('div');
  msg.style.marginBottom = '10px';
  msg.style.opacity = '.85';
  msg.style.fontSize = '13px';
  msg.innerHTML = `Clear all safe tiles. <b>Win = 60 min Glow</b> (extra tickets while walking).`;
  root.appendChild(msg);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gap = '8px';
  grid.style.userSelect = 'none';
  root.appendChild(grid);

  const status = document.createElement('div');
  status.style.marginTop = '12px';
  status.style.fontSize = '13px';
  status.style.opacity = '.9';
  root.appendChild(status);

  const setStatus = (t) => (status.textContent = t || '');

  function countRevealedSafe() {
    return cells.filter((c) => c.revealed && !c.mine).length;
  }

  function render() {
    grid.innerHTML = '';
    const revealedSafe = countRevealedSafe();
    const safeTotal = total - mines;

    if (revealedSafe >= safeTotal) {
      setStatus('✅ Glow cleared! Boost activated (60 min).');
      onWin?.();
      cells.forEach((c) => (c.revealed = true));
    }

    for (let i = 0; i < total; i++) {
      const c = cells[i];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.aspectRatio = '1 / 1';
      btn.style.borderRadius = '14px';
      btn.style.border = '1px solid rgba(255,255,255,.12)';
      btn.style.background = 'rgba(255,255,255,.06)';
      btn.style.color = '#fff';
      btn.style.fontWeight = '900';
      btn.style.fontSize = '16px';
      btn.style.display = 'flex';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.style.boxShadow = '0 10px 20px rgba(0,0,0,.25)';

      if (c.revealed) {
        btn.style.background = c.mine ? 'rgba(255,80,80,.18)' : 'rgba(90,200,255,.18)';
        btn.textContent = c.mine ? '💥' : c.n ? String(c.n) : '';
      } else if (c.flagged) {
        btn.textContent = '🚩';
      } else {
        btn.textContent = '';
      }

      btn.onclick = () => {
        if (c.revealed) return;
        if (c.flagged) c.flagged = false;

        c.revealed = true;

        if (c.mine) {
          cells.forEach((x) => {
            if (x.mine) x.revealed = true;
          });
          setStatus('⛔ Boom. Try again tomorrow (daily).');
        } else {
          setStatus('');
        }
        render();
      };

      btn.oncontextmenu = (e) => {
        e.preventDefault();
        if (c.revealed) return false;
        c.flagged = !c.flagged;
        render();
        return false;
      };

      grid.appendChild(btn);
    }
  }

  setStatus('Tip: long-press (or right-click) to flag.');
  render();

  return root;
}

/* ---------------- Default node puzzle ---------------- */

function renderNodePuzzle(node) {
  return `
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-size:18px; font-weight:900;">${esc(node?.name || 'Puzzle')}</div>
      <div style="opacity:.8; font-size:13px; margin-top:6px;">
        Solve to mark this node as completed.
      </div>

      <button id="cbsgoSolveNode" type="button" style="
        margin-top:12px;
        width:100%;
        padding:12px 14px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(90,200,255,.18);
        color:#fff;
        font-weight:900;
      ">Solve</button>
    </div>
  `;
}

/* ---------------- PUBLIC API ---------------- */

export function openPuzzleModal(node) {
  const host = ensureModalHost();
  const title = host.querySelector('#cbsgoPuzzleTitle');
  const body = host.querySelector('#cbsgoPuzzleBody');

  if (node && node.id === DAILY_NODE_ID) {
    if (title) title.textContent = 'Daily Glow Puzzle';
    if (body) {
      body.innerHTML = '';
      const game = renderGlowMinesweeper(() => {
        activateTicketBoost(60);
        window.dispatchEvent(new CustomEvent('cbsgo:stepsChanged'));
      });
      body.appendChild(game);
    }
    return;
  }

  if (title) title.textContent = node?.name ? `Puzzle: ${node.name}` : 'Puzzle';
  if (body) body.innerHTML = renderNodePuzzle(node);

  const solve = document.getElementById('cbsgoSolveNode');
  if (solve) {
    solve.onclick = () => {
      if (node?.id) {
        window.dispatchEvent(new CustomEvent('cbsgo:completeNode', { detail: { id: node.id } }));
      }
      removeModal();
    };
  }
}
