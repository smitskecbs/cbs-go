// src/ui/puzzleModal.js
// Simpele placeholder voor puzzels.
// Geen daily boost, geen koppeling met steps.js meer.
// Alleen een modal met info en een "Close"-knop.
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
  // node: { id, name, ... } – kan ook "__daily__" zijn, maar we doen nu niks speciaals.
  remove();

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

  const title = node?.name || 'CBS GO Puzzle';
  const desc = 'Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.';

  wrap.innerHTML = `
    <div style="
      width:min(420px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(10,12,18,.96);
      box-shadow:0 18px 60px rgba(0,0,0,.65);
      overflow:hidden;
    ">
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

      <div style="padding:14px 16px;">
        <div style="font-size:13px; opacity:.9; margin-bottom:10px;">
          ${esc(desc)}
        </div>

        <div style="
          margin-top:10px;
          font-size:12px;
          opacity:.75;
        ">
          Voor nu kun je gewoon stappen zetten, XP verdienen en tickets sparen.
        </div>

        <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
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
            Oke, terug naar map
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(wrap);

  const closeBtn = document.getElementById('cbsgoPuzzleClose');
  const okBtn = document.getElementById('cbsgoPuzzleOk');

  const close = () => {
    remove();
  };

  if (closeBtn) closeBtn.onclick = close;
  if (okBtn) {
    okBtn.onclick = () => {
      // Eventueel een klein beetje XP als iemand toch op een node klikt.
      try {
        if (node?.id) {
          completeNode(node.id);
        }
        addXp(5); // mini reward, kan je later weghalen
      } catch {
        // ignore
      }
      close();
    };
  }
}
