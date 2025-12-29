// src/ui/puzzleModal.js
// Candy Crush-achtige mini-puzzle in een modal.
// - Tap of swipe om twee aangrenzende blokjes te wisselen
// - Emoji-tiles (🍬, 💎, ⭐, 🍀, 🔮)
// - Speciale 💥-tile: haalt hele rij + kolom weg bij een swap (heel zeldzaam)
// - Moves tellen af, bij 0 is het spel echt klaar
// - Bij win: confetti + auto-close terug naar de map
//
// Export:
//   openPuzzleModal(node)

import { completeNode } from '../app/state.js';
import { addXp } from '../app/state.js';

const MODAL_ID = 'cbsgoPuzzleModal';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function remove() {
  const el = document.getElementById(MODAL_ID);
  if (el) el.remove();
}

export function openPuzzleModal(node) {
  remove();

  // Basis-config
  const ROWS = 6;
  const COLS = 6;

  // kleur-thema + emoji
  const COLORS = ['#f97373', '#facc15', '#4ade80', '#60a5fa', '#a855f7'];
  const TILE_EMOJIS = ['🍬', '💎', '⭐', '🍀', '🔮'];

  const TARGET_SCORE = 180;   // meer nodig om te winnen
  const MAX_MOVES = 18;

  // 💥 speciale tile index
  const SPECIAL_INDEX = COLORS.length;
  const SPECIAL_CHANCE = 0.01; // 1% kans op bomb

  let board = [];
  let selected = null; // {row, col}
  let score = 0;
  let movesLeft = MAX_MOVES;
  let locked = false; // tijdens animatie / drops even blokkeren
  let gameOver = false;

  let touchStart = null; // {row, col, x, y}

  const title = node?.name || 'CBS GO Puzzle';

  const wrap = document.createElement('div');
  wrap.id = MODAL_ID;
  wrap.style.position = 'fixed';
  wrap.style.inset = '0';
  wrap.style.zIndex = '999999';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.padding = '16px';
  wrap.style.background = 'rgba(0,0,0,.70)';
  wrap.style.backdropFilter = 'blur(12px)';
  wrap.style.fontFamily = 'system-ui, sans-serif';
  wrap.style.color = '#fff';

  wrap.innerHTML = `
    <style>
      @keyframes cbsgoConfettiFall {
        0% {
          transform: translate3d(0, -100%, 0) rotateZ(0deg);
          opacity: 1;
        }
        100% {
          transform: translate3d(10px, 120%, 0) rotateZ(360deg);
          opacity: 0;
        }
      }
    </style>
    <div style="
      width:min(420px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(10,12,18,.96);
      box-shadow:0 18px 60px rgba(0,0,0,.65);
      overflow:hidden;
      display:flex;
      flex-direction:column;
      max-height:90vh;
      position:relative;
    ">
      <div id="cbsgoConfettiLayer" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        overflow:hidden;
        display:none;
        z-index:999;
      "></div>

      <div style="
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.12);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      ">
        <div style="font-weight:900; font-size:15px;">
          ${esc(title)}
        </div>
        <button type="button" id="cbsgoPuzzleClose" style="
          padding:6px 10px;
          border-radius:12px;
          border:0;
          background:rgba(255,255,255,.10);
          color:#fff;
          font-size:13px;
        ">Close</button>
      </div>

      <div style="padding:10px 14px 4px; font-size:12px; opacity:.9;">
        Match <b>3 or more</b> tiles in a row by swapping neighbors.  
        You can <b>tap</b> or <b>swipe</b>.  
        💥 clears a whole row and column.
      </div>

      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:4px 14px 10px;
        gap:10px;
        font-size:12px;
      ">
        <div>
          <div>Score: <span id="cbsgoScore">0</span></div>
          <div>Target: <span id="cbsgoTargetScore">${TARGET_SCORE}</span></div>
        </div>
        <div style="text-align:right;">
          <div>Moves left: <span id="cbsgoMoves">${MAX_MOVES}</span></div>
        </div>
      </div>

      <div style="
        flex:1;
        padding:8px 14px 14px;
        display:flex;
        justify-content:center;
        align-items:center;
      ">
        <div id="cbsgoBoard" style="
          display:grid;
          grid-template-rows:repeat(${ROWS}, 1fr);
          grid-template-columns:repeat(${COLS}, 1fr);
          gap:4px;
          width:min(320px, 90vw);
          aspect-ratio:1/1;
          touch-action:manipulation;
        "></div>
      </div>

      <div id="cbsgoStatus" style="
        padding:8px 14px 12px;
        font-size:12px;
        text-align:center;
        opacity:.85;
      "></div>

      <div style="padding:0 14px 12px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" id="cbsgoPuzzleOk" style="
          flex:1;
          padding:10px 12px;
          border-radius:16px;
          border:0;
          background:rgba(34,197,94,.25);
          color:#fff;
          font-weight:900;
          font-size:14px;
        ">
          Back to map
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(wrap);

  const boardEl = document.getElementById('cbsgoBoard');
  const scoreEl = document.getElementById('cbsgoScore');
  const movesEl = document.getElementById('cbsgoMoves');
  const statusEl = document.getElementById('cbsgoStatus');
  const closeBtn = document.getElementById('cbsgoPuzzleClose');
  const okBtn = document.getElementById('cbsgoPuzzleOk');
  const confettiLayer = document.getElementById('cbsgoConfettiLayer');

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg || '';
  }

  function showConfetti() {
    if (!confettiLayer) return;
    confettiLayer.style.display = 'block';
    confettiLayer.innerHTML = '';

    const colors = ['#f97373', '#facc15', '#4ade80', '#60a5fa', '#a855f7', '#ffffff'];

    const count = 40;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      const size = 6 + Math.floor(Math.random() * 6); // 6–11px

      const left = Math.random() * 100;      // 0–100%
      const delay = Math.random() * 0.6;     // 0–0.6s
      const duration = 1.0 + Math.random() * 0.6; // 1.0–1.6s
      const rotate = Math.random() * 360;

      piece.style.position = 'absolute';
      piece.style.top = '-10%';
      piece.style.left = `${left}%`;
      piece.style.width = `${size}px`;
      piece.style.height = `${size * 2}px`;
      piece.style.background = colors[i % colors.length];
      piece.style.opacity = '0.9';
      piece.style.borderRadius = '2px';
      piece.style.transform = `rotate(${rotate}deg)`;
      piece.style.animation = `cbsgoConfettiFall ${duration}s ease-out ${delay}s forwards`;
      confettiLayer.appendChild(piece);
    }
  }

  function randomColorIndex() {
    return Math.floor(Math.random() * COLORS.length);
  }

  function initBoard() {
    board = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        if (Math.random() < SPECIAL_CHANCE) {
          row.push(SPECIAL_INDEX);
        } else {
          row.push(randomColorIndex());
        }
      }
      board.push(row);
    }
  }

  function isSpecial(idx) {
    return idx === SPECIAL_INDEX;
  }

  function renderBoard() {
    if (!boardEl) return;
    boardEl.innerHTML = '';

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = board[r][c];
        const tile = document.createElement('div');
        tile.dataset.row = String(r);
        tile.dataset.col = String(c);
        tile.style.borderRadius = '12px';
        tile.style.display = 'flex';
        tile.style.alignItems = 'center';
        tile.style.justifyContent = 'center';
        tile.style.cursor = gameOver ? 'default' : 'pointer';
        tile.style.boxShadow = '0 0 0 1px rgba(0,0,0,.18) inset';
        tile.style.fontSize = '20px';

        if (isSpecial(idx)) {
          tile.style.background =
            'radial-gradient(circle at 30% 30%, #f97373, #a855f7)';
          tile.textContent = '💥';
        } else {
          tile.style.background = COLORS[idx] || '#444';
          tile.textContent = TILE_EMOJIS[idx] || '⬛';
        }

        if (selected && selected.row === r && selected.col === c) {
          tile.style.outline = '2px solid #fff';
          tile.style.outlineOffset = '2px';
        }

        tile.addEventListener('click', () => {
          onTileTap(r, c);
        });

        tile.addEventListener('touchstart', (e) => {
          if (gameOver) return;
          const t = e.touches[0];
          touchStart = {
            row: r,
            col: c,
            x: t.clientX,
            y: t.clientY
          };
        });

        tile.addEventListener('touchend', (e) => {
          if (!touchStart || gameOver) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - touchStart.x;
          const dy = t.clientY - touchStart.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const SWIPE_MIN = 18;

          if (dist < SWIPE_MIN) {
            onTileTap(r, c);
            touchStart = null;
            return;
          }

          let targetRow = touchStart.row;
          let targetCol = touchStart.col;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) targetCol += 1;
            else targetCol -= 1;
          } else {
            if (dy > 0) targetRow += 1;
            else targetRow -= 1;
          }

          if (
            targetRow >= 0 && targetRow < ROWS &&
            targetCol >= 0 && targetCol < COLS
          ) {
            trySwap(touchStart.row, touchStart.col, targetRow, targetCol);
          }

          touchStart = null;
          e.preventDefault();
        });

        boardEl.appendChild(tile);
      }
    }
  }

  function isAdjacent(a, b) {
    if (!a || !b) return false;
    const dr = Math.abs(a.row - b.row);
    const dc = Math.abs(a.col - b.col);
    return (dr + dc === 1);
  }

  function swapTiles(a, b) {
    const tmp = board[a.row][a.col];
    board[a.row][a.col] = board[b.row][b.col];
    board[b.row][b.col] = tmp;
  }

  function findMatches() {
    const toRemove = new Set();

    // horizontaal
    for (let r = 0; r < ROWS; r++) {
      let runColor = board[r][0];
      let runStart = 0;
      for (let c = 1; c <= COLS; c++) {
        const color = c < COLS ? board[r][c] : null;
        if (color === runColor) continue;
        const runLen = c - runStart;
        if (runColor != null && runLen >= 3) {
          for (let cc = runStart; cc < c; cc++) {
            toRemove.add(`${r},${cc}`);
          }
        }
        runColor = color;
        runStart = c;
      }
    }

    // verticaal
    for (let c = 0; c < COLS; c++) {
      let runColor = board[0][c];
      let runStart = 0;
      for (let r = 1; r <= ROWS; r++) {
        const color = r < ROWS ? board[r][c] : null;
        if (color === runColor) continue;
        const runLen = r - runStart;
        if (runColor != null && runLen >= 3) {
          for (let rr = runStart; rr < r; rr++) {
            toRemove.add(`${rr},${c}`);
          }
        }
        runColor = color;
        runStart = r;
      }
    }

    return toRemove;
  }

  function applyMatches(toRemove) {
    if (!toRemove || !toRemove.size) return 0;

    const removedCount = toRemove.size;
    score += removedCount * 4;  // iets trager scoren
    if (scoreEl) scoreEl.textContent = String(score);

    // direct checken op win
    if (!gameOver && score >= TARGET_SCORE) {
      endGame(true);
    }

    for (const key of toRemove) {
      const [rStr, cStr] = key.split(',');
      const r = Number(rStr);
      const c = Number(cStr);
      board[r][c] = null;
    }

    for (let c = 0; c < COLS; c++) {
      let writeRow = ROWS - 1;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][c] != null) {
          board[writeRow][c] = board[r][c];
          writeRow--;
        }
      }
      for (let r = writeRow; r >= 0; r--) {
        if (Math.random() < SPECIAL_CHANCE) {
          board[r][c] = SPECIAL_INDEX;
        } else {
          board[r][c] = randomColorIndex();
        }
      }
    }

    return removedCount;
  }

  function activateBomb(row, col) {
    const toRemove = new Set();

    for (let c = 0; c < COLS; c++) {
      toRemove.add(`${row},${c}`);
    }
    for (let r = 0; r < ROWS; r++) {
      toRemove.add(`${r},${col}`);
    }

    applyMatches(toRemove);
    renderBoard();

    if (!gameOver) {
      setTimeout(() => resolveBoard(false), 120);
    }
  }

  function resolveBoard(afterSwap = false) {
    if (gameOver) return;
    locked = true;

    const step = () => {
      if (gameOver) {
        locked = true;
        return;
      }

      const matches = findMatches();
      if (!matches.size) {
        locked = false;
        renderBoard();
        if (afterSwap && !gameOver) {
          if (movesLeft <= 0) {
            checkEnd();
          } else {
            setStatus('Nice! Keep matching.');
          }
        }
        return;
      }

      applyMatches(matches);
      renderBoard();
      setTimeout(step, 120);
    };

    step();
  }

  function endGame(win) {
    if (gameOver) return;
    gameOver = true;
    locked = true;

    if (win) {
      setStatus('Great job! Puzzle completed 🎉');
      try {
        if (node?.id) completeNode(node.id);
        addXp(10);
      } catch {
        // ignore
      }
      showConfetti();
      setTimeout(() => {
        remove();
      }, 1600);
    } else {
      setStatus('Out of moves. Try again next time 🙂');
    }
  }

  function checkEnd() {
    if (score >= TARGET_SCORE) {
      endGame(true);
    } else if (movesLeft <= 0) {
      endGame(false);
    }
  }

  function trySwap(r1, c1, r2, c2) {
    if (locked || gameOver) return;
    if (movesLeft <= 0) {
      checkEnd();
      return;
    }

    const a = { row: r1, col: c1 };
    const b = { row: r2, col: c2 };
    if (!isAdjacent(a, b)) return;

    const valA = board[r1][c1];
    const valB = board[r2][c2];
    const bombUsed = isSpecial(valA) || isSpecial(valB);

    swapTiles(a, b);
    selected = null;
    movesLeft--;
    if (movesEl) movesEl.textContent = String(movesLeft);

    if (bombUsed) {
      renderBoard();
      const bombPos = isSpecial(board[r1][c1]) ? { row: r1, col: c1 } : { row: r2, col: c2 };
      activateBomb(bombPos.row, bombPos.col);
      checkEnd();
      return;
    }

    const matches = findMatches();
    if (!matches.size) {
      swapTiles(a, b);
      renderBoard();
      setStatus('No match… try another swap.');
      checkEnd();
      return;
    }

    setStatus('');
    renderBoard();
    resolveBoard(true);
  }

  function onTileTap(row, col) {
    if (locked || gameOver) return;

    if (movesLeft <= 0) {
      checkEnd();
      return;
    }

    const tile = { row, col };

    if (!selected) {
      selected = tile;
      renderBoard();
      return;
    }

    if (selected.row === row && selected.col === col) {
      selected = null;
      renderBoard();
      return;
    }

    if (!isAdjacent(selected, tile)) {
      selected = tile;
      renderBoard();
      return;
    }

    trySwap(selected.row, selected.col, tile.row, tile.col);
  }

  function close() {
    remove();
  }

  if (closeBtn) closeBtn.onclick = close;
  if (okBtn) {
    okBtn.onclick = () => {
      close();
    };
  }

  initBoard();
  renderBoard();
  setStatus('Tap or swipe two neighboring tiles to swap them.');
}
