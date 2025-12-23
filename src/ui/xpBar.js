// src/ui/xpBar.js
// Stable XP bar: Level N + (xpIntoLevel / 100)
// Uses app/state.js as single source of truth.

import { getXp, getLevel, getXpIntoLevel } from '../app/state.js';

function clamp(n, a, b) {
  const x = Number(n || 0);
  if (!Number.isFinite(x)) return a;
  return Math.max(a, Math.min(b, x));
}

export function renderXpBar() {
  const totalXp = Number(getXp() || 0);
  const level = Number(getLevel(totalXp) || 1);
  const into = Number(getXpIntoLevel(totalXp) || 0);

  const safeInto = clamp(into, 0, 100);
  const pct = clamp((safeInto / 100) * 100, 0, 100);

  return `
    <div style="min-width:180px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; line-height:1;">Level ${level}</div>
        <div style="opacity:.85; font-size:12px; white-space:nowrap;">
          ${safeInto}/100 XP
        </div>
      </div>

      <div style="
        margin-top:8px;
        height:8px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
      ">
        <div style="
          height:100%;
          width:${pct}%;
          background:rgba(255,255,255,.75);
        "></div>
      </div>

      <div style="margin-top:6px; font-size:11px; opacity:.65;">
        Total XP: ${totalXp}
      </div>
    </div>
  `;
}
