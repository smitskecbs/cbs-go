// src/ui/stepsWidget.js
// Steps + Tickets UI (GPS-based) - minimal & stable: no dependency on steps.js extra exports

import { getSteps, enableSteps, disableSteps } from '../app/steps.js';
import { getTickets } from '../app/inventory.js';

const ENABLE_KEY = 'cbsgo_steps_enabled_v1';

function isEnabled() {
  try { return localStorage.getItem(ENABLE_KEY) === '1'; } catch { return false; }
}
function setEnabled(v) {
  try { localStorage.setItem(ENABLE_KEY, v ? '1' : '0'); } catch {}
}

export function renderStepsWidget() {
  const steps = getSteps();
  const tickets = getTickets();
  const enabled = isEnabled();

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
            GPS Steps: <b>${enabled ? 'ENABLED' : 'OFF'}</b>
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
        Tip: Use on phone (HTTPS). After enabling, walk outside to rack up steps.
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
    const enabled = isEnabled();

    if (enabled) {
      try { disableSteps(); } catch {}
      setEnabled(false);
      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
      return;
    }

    try {
      const res = await enableSteps();
      if (!res?.ok) {
        alert(res?.reason || 'Could not enable GPS steps.');
        return;
      }
      setEnabled(true);
      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps'));
    } catch (e) {
      alert(e?.message || 'Could not enable GPS steps.');
    }
  });
}
