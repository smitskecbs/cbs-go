// src/ui/xpBar.js
// XP-balk + afstand in één kaartje.

import {
  getXp,
  getLevel,
  getXpIntoLevel,
  getXpNeededThisLevel
} from '../app/state.js';

import {
  getDistanceKm
} from '../app/steps.js';

export function renderXpBar() {
  const total = getXp();
  const level = getLevel();
  const current = getXpIntoLevel();
  const needed = getXpNeededThisLevel();

  const km = getDistanceKm();

  const pct = needed > 0
    ? Math.min(100, Math.round((current / needed) * 100))
    : 0;

  return `
    <div id="cbsgoXpBarInner" style="
      min-width:160px;
      max-width:220px;
      font-family:system-ui,sans-serif;
      color:#fff;
      font-size:11px;
    ">
      <!-- Level + balk -->
      <div id="cbsgoXpLabel" style="
        font-weight:700;
        font-size:11px;
        margin-bottom:4px;
        text-align:right;
      ">
        Level ${level}
      </div>

      <div style="
        position:relative;
        height:7px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
      ">
        <div id="cbsgoXpFill" style="
          position:absolute;
          inset:0;
          width:${pct}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 10px rgba(168,85,247,.65);
          transition:width .25s ease-out;
        "></div>
      </div>

      <!-- Tekst onder de balk: XP + kilometers -->
      <div id="cbsgoXpText" style="
        margin-top:3px;
        opacity:.9;
        text-align:right;
        line-height:1.3;
      ">
        <div>${current}/${needed} XP · total ${total}</div>
        <div>${km.toFixed(2)} km walked</div>
      </div>
    </div>
  `;
}
