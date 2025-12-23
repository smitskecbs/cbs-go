// src/ui/stepsWidget.js
// Compact topbar indicator: Steps + Tickets + GPS dot
// Auto mode: no big blocks over the map.

import { getSteps, isStepsEnabled, getGpsDebug, tryAutoStart } from '../app/steps.js';
import { getTickets } from '../app/inventory.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function gpsDot() {
  const dbg = getGpsDebug();
  if (dbg?.err) return '🔴';
  if (dbg?.lat) return '🟢';
  if (isStepsEnabled()) return '🟡';
  return '⚪';
}

export function renderStepsWidget() {
  const steps = Number(getSteps() || 0);
  const tickets = Number(getTickets() || 0);

  const dbg = getGpsDebug();
  const title = dbg?.err
    ? `GPS: ${dbg.err}`
    : dbg?.lat
      ? `GPS OK ±${Math.round(dbg.acc || 0)}m`
      : dbg?.msg
        ? `GPS: ${dbg.msg}`
        : `GPS`;

  return `
    <button id="stepsMiniBtn" type="button" title="${esc(title)}" style="
      display:flex;
      align-items:center;
      gap:8px;
      padding:8px 10px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      color:#fff;
      font:inherit;
      cursor:pointer;
      white-space:nowrap;
    ">
      <span style="font-size:14px; line-height:14px;">${gpsDot()}</span>
      <span style="font-size:12px; opacity:.9;">👣 <b>${steps}</b></span>
      <span style="font-size:12px; opacity:.9;">🎟️ <b>${tickets}</b></span>
    </button>
  `;
}

export function bindStepsWidget() {
  const btn = document.querySelector('#stepsMiniBtn');
  if (!btn) return;

  if (btn.__cbsgo_bound) return;
  btn.__cbsgo_bound = true;

  // Tap = retry GPS silently (handig voor iOS/Safari waar het soms user gesture wil)
  btn.addEventListener('click', async () => {
    await tryAutoStart();
  });
}
