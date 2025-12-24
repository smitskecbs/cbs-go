// src/ui/stepsWidget.js
// Compact topbar indicator: Steps + Tickets + GPS status dot + Glow (ticket boost) indicator
// No buttons. Auto-start is handled by steps.js tryAutoStart() from appShell.

import {
  getSteps,
  isStepsEnabled,
  getGpsDebug
  // (optional exports – may or may not exist in your current steps.js)
  // getTicketBoostRemainingMs,
  // isTicketBoostActive
} from '../app/steps.js';

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

function msToMinSec(ms) {
  const v = Math.max(0, Number(ms || 0));
  const totalSec = Math.floor(v / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${String(sec).padStart(2, '0')}`;
}

function getBoostRemainingMsSafe() {
  // Try to read from gpsDebug.boostMs first (works even if steps.js doesn't export helpers)
  const dbg = getGpsDebug() || {};
  if (Number.isFinite(dbg.boostMs)) return Number(dbg.boostMs);

  // If you later add exports in steps.js, you can uncomment these and remove fallback:
  // try { return getTicketBoostRemainingMs(); } catch {}

  return 0;
}

function glowLine() {
  const ms = getBoostRemainingMsSafe();
  if (ms <= 0) return '';

  // Our rule: +1 ticket per 1500 steps during glow (1 hour)
  return `✨ Glow: <b>${msToMinSec(ms)}</b> left · 🎟️ +1 / 1500 steps`;
}

function debugLine() {
  const dbg = getGpsDebug() || {};
  if (dbg.err) return `GPS: ${dbg.err}`;
  if (!isStepsEnabled()) return `GPS: off`;

  if (!dbg.lat) return `GPS: starting…`;

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
  const glow = glowLine();

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
      min-width: 210px;
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

      ${
        glow
          ? `<div style="
              opacity:.95;
              font-size:11px;
              line-height:1.1;
              border-radius:10px;
              padding:6px 8px;
              border:1px solid rgba(120,220,255,.22);
              background:rgba(90,200,255,.10);
              box-shadow:0 0 18px rgba(90,200,255,.10);
            ">${glow}</div>`
          : ``
      }

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
