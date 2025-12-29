// src/ui/stepsWidget.js
// Dagelijkse stappen + 7-daagse sterren-streak.
// - gebruikt getDailyStats() uit steps.js
// - geen event listeners: alleen render via appShell (cbsgo:stepsChanged)

import { getDailyStats } from '../app/steps.js';

export function renderStepsWidget() {
  const {
    stepsToday,
    goalSteps,
    goalReached,
    streak,
    streakLength,
    rewardPerStreak
  } = getDailyStats();

  const pct = goalSteps > 0
    ? Math.min(100, Math.round((stepsToday / goalSteps) * 100))
    : 0;

  const starsHtml = (streak || [])
    .map(s => (s.reached ? '★' : '☆'))
    .join(' ');

  const goalLabel = `${stepsToday} / ${goalSteps} steps${goalReached ? ' ✅' : ''}`;

  return `
    <div id="cbsgoDailyWidget" style="
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
        margin-bottom:4px;
      ">
        <div style="font-weight:700;font-size:11px;">Daily goal</div>
        <div style="font-size:10px;opacity:.9;">${goalLabel}</div>
      </div>

      <div style="
        position:relative;
        height:5px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
        margin-bottom:4px;
      ">
        <div style="
          position:absolute;
          inset:0;
          width:${pct}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 8px rgba(168,85,247,.6);
          transition:width .25s ease-out;
        "></div>
      </div>

      <div style="text-align:right;font-size:11px;letter-spacing:1px;margin-bottom:2px;">
        ${starsHtml}
      </div>

      <div style="text-align:right;font-size:9px;opacity:.75;">
        ${streakLength}-day streak → +${rewardPerStreak} CBS
      </div>
    </div>
  `;
}

export function bindStepsWidget() {
  // geen listeners nodig (rerender gebeurt vanuit appShell via events)
}
