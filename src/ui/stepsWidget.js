// src/ui/stepsWidget.js
// Compact topbar indicator: Steps + Tickets + small GPS status dot
// No buttons. Auto-start is handled by steps.js tryAutoStart() from appShell.

import { getSteps, isStepsEnabled, getGpsDebug } from '../app/steps.js';
import { getTickets } from '../app/inventory.js';

function dot() {
  const dbg = getGpsDebug();
  if (dbg?.err) return '🔴';
  if (dbg?.lat && isStepsEnabled()) return '🟢';
  if (isStepsEnabled()) return '🟡';
  return '⚪';
}

export function renderStepsWidget() {
  const steps = getSteps();
  const tickets = getTickets();

  return `
    <div style="
      /* weer normaal: dicht onder de XP-balk */
      margin-top:6px;
      padding:8px 10px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      white-space:nowrap;
      font-size:12px;
    ">
      <span style="opacity:.9;">${dot()} <b>${Number(steps || 0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(tickets || 0)}</b></span>
    </div>
  `;
}

// Export blijft nodig voor appShell
export function bindStepsWidget() {
  // geen interacties
}
