// src/ui/stepsWidget.js
// Compact steps UI for topbar (no big text)

import { getSteps, isStepsEnabled, enableSteps, disableSteps, getGpsDebug } from '../app/steps.js';
import { getTickets } from '../app/inventory.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function statusDot() {
  const dbg = getGpsDebug();
  if (dbg?.err) return `🔴`;
  if (dbg?.lat) return `🟢`;
  if (isStepsEnabled()) return `🟡`;
  return `⚪`;
}

export function renderStepsWidget() {
  const steps = getSteps();
  const tickets = getTickets();
  const enabled = isStepsEnabled();

  const dbg = getGpsDebug();
  const title = dbg?.err
    ? `GPS: ${esc(dbg.err)}`
    : dbg?.lat
      ? `GPS OK ~${Math.round(dbg.acc || 0)}m`
      : enabled
        ? `GPS starting…`
        : `GPS off`;

  return `
    <div title="${title}" style="
      display:flex;
      align-items:center;
      gap:8px;
      padding:8px 10px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      white-space:nowrap;
      max-width:46vw;
    ">
      <span style="opacity:.9">${statusDot()}</span>
      <span style="font-size:12px; opacity:.9">👣 <b>${steps}</b></span>
      <span style="font-size:12px; opacity:.9">🎟 <b>${tickets}</b></span>

      <button id="stepsToggleBtn" type="button" style="
        margin-left:4px;
        border:0;
        padding:6px 8px;
        border-radius:12px;
        background:rgba(255,255,255,.10);
        color:#fff;
        font:inherit;
        font-size:12px;
      ">
        ${enabled ? 'Off' : 'On'}
      </button>
    </div>
  `;
}

export function bindStepsWidget() {
  const btn = document.querySelector('#stepsToggleBtn');
  if (!btn) return;

  if (btn.__cbsgo_bound) return;
  btn.__cbsgo_bound = true;

  btn.addEventListener('click', async () => {
    if (isStepsEnabled()) {
      disableSteps();
      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
      return;
    }
    const res = await enableSteps({ silent: false });
    if (!res?.ok) {
      alert(res?.reason || 'Could not enable GPS steps.');
    }
    window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
  });
}
