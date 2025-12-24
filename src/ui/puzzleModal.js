// src/ui/puzzleModal.js
// Daily Minesweeper puzzle with glow reward

import { addXp } from '../app/state.js';
import { addTickets } from '../app/inventory.js';
import { activateTicketBoost } from '../app/steps.js';

let open = false;

function openModal() {
  if (open) return;
  open = true;

  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.inset = '0';
  el.style.background = 'rgba(0,0,0,.6)';
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.zIndex = '9999';

  el.innerHTML = `
    <div style="
      background:#0b1020;
      color:#fff;
      padding:20px;
      border-radius:18px;
      width:320px;
      box-shadow:0 0 30px rgba(120,200,255,.4)
    ">
      <h3>🧨 Daily Mijnenveger</h3>
      <p>Win en krijg 1 uur glow</p>
      <button id="win">💥 Ik win</button>
      <button id="close">Sluiten</button>
    </div>
  `;

  el.querySelector('#win').onclick = () => {
    addXp(25);
    addTickets(1);
    activateTicketBoost(60);
    close(el);
  };

  el.querySelector('#close').onclick = () => close(el);

  document.body.appendChild(el);
}

function close(el) {
  el.remove();
  open = false;
}

window.addEventListener('cbsgo:dailyPuzzle', () => {
  openModal();
});
