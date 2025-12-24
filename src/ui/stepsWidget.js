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

function fmt(n, digits = 0) {
  const x = Number(n);
  if (!Number.isFinite(x)) return '';
  return x.toFixed(digits);
}

function debugLine() {
  const dbg = getGpsDebug() || {};
  if (dbg.err) return `GPS: ${dbg.err}`;
  if (!isStepsEnabled()) return `GPS: off`;

  // When enabled but not yet receiving coords
  if (!dbg.lat) return `GPS: starting…`;

  // Show compact “why” info (super useful during walking tests)
  const parts = [];
  if (Number.isFinite(dbg.acc)) parts.push(`acc ${Math.round(dbg.acc)}m`);
  if (dbg.reason) parts.push(dbg.reason);
  if (Number.isFinite(dbg.added)) parts.push(`+${Math.round(dbg.added)}m`);
  if (Number.isFinite(dbg.dist)) parts.push(`d ${Math.round(dbg.dist)}m`);
  if (Number.isFinite(dbg.speed)) parts.push(`${fmt(dbg.speed, 1)} m/s`);

  return parts.length ? `GPS: ${parts.join(' · ')}` : `GPS: ok`;
}

export function renderStepsWidget() {
  const steps = getSteps();
  const tickets = getTickets();

  return `
    <div style="
      margin-top:6px;
      padding:8px 10px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      display:flex;
      flex-direction:column;
      gap:6px;
      white-space:nowrap;
      font-size:12px;
    ">
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      ">
        <span style="opacity:.9;">${dot()} <b>${steps}</b> steps</span>
        <span style="opacity:.9;">🎟️ <b>${tickets}</b></span>
      </div>

      <div style="
        opacity:.75;
        font-size:11px;
        line-height:1;
      ">
        ${debugLine()}
      </div>
    </div>
  `;
}

export function bindStepsWidget() {
  // no interactions (keeps it stable)
  // live updates happen via cbsgo:stepsChanged rerender in appShell
}
