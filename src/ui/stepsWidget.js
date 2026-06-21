// src/ui/stepsWidget.js
// Alleen Level zichtbaar (geen Daily Goal / geen sterren).
// Stappen blijven op de achtergrond tellen via steps.js + events.

import { getDailyStats } from '../app/steps.js';

export function renderStepsWidget() {
  const { level, levelProgressPct } = getDailyStats();

  const pct = Number.isFinite(levelProgressPct) ? Math.max(0, Math.min(100, Math.round(levelProgressPct))) : 0;

  return `
    <div id="cbsgoStepsWidget" style="
      min-width:160px;
      max-width:220px;
      font-family:system-ui,sans-serif;
      color:#fff;
      font-size:10px;
      padding:8px 10px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.72);
      backdrop-filter:blur(10px);
    ">
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:6px;
        margin-bottom:6px;
      ">
        <div style="font-weight:800;font-size:11px;">Level</div>
        <div style="font-size:11px;opacity:.95;">${level ?? '-'}</div>
      </div>

      <div style="
        position:relative;
        height:6px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
      ">
        <div style="
          position:absolute;
          inset:0;
          width:${pct}%;
          background:linear-gradient(90deg,#22c55e,#ff9f1c);
          box-shadow:0 0 8px rgba(168,85,247,.45);
          transition:width .25s ease-out;
        "></div>
      </div>

      <div style="text-align:right;font-size:10px;opacity:.8;margin-top:5px;">
        ${pct}% to next
      </div>
    </div>
  `;
}

export function bindStepsWidget() {
  // geen listeners nodig (rerender gebeurt vanuit appShell via events)
}
