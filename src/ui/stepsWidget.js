// src/ui/stepsWidget.js
// Tiny topbar indicator: Steps + Tickets (auto-start GPS if available)
// Works even if steps.js exports differ, because we import * as Steps.

import * as Steps from '../app/steps.js';
import { getTickets } from '../app/inventory.js';

function safeNum(x) {
  const n = Number(x || 0);
  return Number.isFinite(n) ? n : 0;
}

function getStepsValue() {
  // Prefer getSteps(); fallback to loadSteps().steps
  if (typeof Steps.getSteps === 'function') return safeNum(Steps.getSteps());
  if (typeof Steps.loadSteps === 'function') return safeNum(Steps.loadSteps()?.steps);
  return 0;
}

function gpsDot() {
  // Optional debug dot if steps.js provides it
  try {
    if (typeof Steps.getGpsDebug !== 'function') return '';
    const dbg = Steps.getGpsDebug();
    if (dbg?.err) return '🔴';
    if (dbg?.lat) return '🟢';
    return '🟡';
  } catch {
    return '';
  }
}

export function ensureStepsAutoStart() {
  // Auto-start if steps.js supports it (no build errors if not present)
  try {
    if (typeof Steps.enableSteps === 'function') Steps.enableSteps();
  } catch {
    // ignore
  }
}

export function renderStepsWidget() {
  const steps = getStepsValue();
  const tickets = safeNum(getTickets?.() ?? 0);

  // super compact, 1 line
  return `
    <div style="
      display:flex;
      align-items:center;
      gap:10px;
      font-size:12px;
      opacity:.92;
      white-space:nowrap;
    ">
      <span style="opacity:.85;">${gpsDot()}</span>
      <span class="pill" style="padding:6px 10px;">👟 <b>${steps}</b></span>
      <span class="pill" style="padding:6px 10px;">🎟 <b>${tickets}</b></span>
    </div>
  `;
}

// no bindings needed anymore (kept for compatibility if appShell still calls it)
export function bindStepsWidget() {}
