// src/ui/stepsWidget.js
// Minimal steps indicator for topbar (auto, no buttons)

import { getSteps } from '../app/steps.js';
import { getTickets } from '../app/inventory.js';

export function renderStepsWidget() {
  const steps = getSteps();
  const tickets = getTickets();

  return `
    <div style="
      display:flex;
      gap:10px;
      align-items:center;
      font-size:12px;
      opacity:.85;
      white-space:nowrap;
    ">
      <span>👣 ${steps}</span>
      <span>🎟️ ${tickets}</span>
    </div>
  `;
}

export function bindStepsWidget() {
  // no-op (auto updates via events)
}
