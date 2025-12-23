// src/ui/stepsWidget.js
// Steps + Tickets UI (GPS-based) + live GPS debug status

import {
  getSteps,
  enableSteps,
  disableSteps,
  isStepsEnabled,
  getGpsDebug
} from '../app/steps.js';

import { getTickets } from '../app/inventory.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function fmtTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString();
  } catch {
    return '';
  }
}

export function renderStepsWidget() {
  const steps = getSteps();
  const tickets = getTickets();
  const enabled = isStepsEnabled();
  const dbg = getGpsDebug();

  const dbgLine = dbg?.err
    ? `❌ ${esc(dbg.err)}`
    : dbg?.lat
      ? `✅ ${fmtTime(dbg.t)} acc=${Math.round(dbg.acc || 0)}m`
      : dbg?.msg
        ? `ℹ️ ${esc(dbg.msg)}`
        : `…`;

  return `
    <div style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <div>
          <div style="font-weight:800; font-size:15px;">Steps & Tickets</div>
          <div style="opacity:.75; font-size:12px; margin-top:2px;">
            Uses GPS distance to estimate steps (Android-friendly).
          </div>
          <div style="opacity:.75; font-size:12px; margin-top:4px;">
            GPS Status: <b>${enabled ? 'ENABLED' : 'OFF'}</b> • ${dbgLine}
          </div>
          <div style="opacity:.6; font-size:12px; margin-top:4px;">
            Milestones: <b>5,000 steps</b> → +20 XP • <b>10,000 steps</b> → +1 Ticket
          </div>
        </div>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <div class="pill">Steps: <b>${steps}</b></div>
          <div class="pill">Tickets: <b>${tickets}</b></div>
          <button id="enableStepsBtn" class="btn ${enabled ? 'secondary' : ''}" type="button">
            ${enabled ? 'Disable GPS Steps' : 'Enable GPS Steps'}
          </button>
        </div>
      </div>

      <div style="margin-top:10px; opacity:.75; font-size:12px;">
        Tip: open on your phone on HTTPS (GitHub Pages is perfect) and walk outside for real GPS.
      </div>
    </div>
  `;
}

export function bindStepsWidget() {
  const root = document.querySelector('#stepsMount') || document;
  const btn = root.querySelector('#enableStepsBtn');
  if (!btn) return;

  if (btn.__cbsgo_bound) return;
  btn.__cbsgo_bound = true;

  btn.addEventListener('click', async () => {
    if (isStepsEnabled()) {
      disableSteps();
      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
      return;
    }

    const res = await enableSteps();
    if (!res?.ok) {
      alert(res?.reason || 'Could not enable GPS steps.');
    }
    window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
  });
}
