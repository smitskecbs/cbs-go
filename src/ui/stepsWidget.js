// src/ui/stepsWidget.js
// Ultra-compact steps + tickets indicator (topbar-safe on mobile)

import { getSteps } from '../app/steps.js';
import { getTickets } from '../app/inventory.js';

export function renderStepsWidget() {
  const steps = Number(getSteps() || 0);
  const tickets = Number(getTickets() || 0);

  return `
    <div style="
      display:flex;
      align-items:center;
      gap:8px;
      font-size:12px;
      line-height:1;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    ">
      <span>👣 <b>${steps}</b></span>
      <span style="opacity:.6;">•</span>
      <span>🎟️ <b>${tickets}</b></span>
    </div>
  `;
}

export function bindStepsWidget() {
  // Nothing to bind (auto indicator)
}
