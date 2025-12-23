// src/ui/xpBar.js
import { getXp, getLevel, getXpIntoLevel } from '../app/state.js';

export function renderXpBar() {
  const xp = getXp();
  const level = getLevel(xp);
  const into = getXpIntoLevel(xp); // 0..99 (or 0..(levelSize-1) depending on your math)
  const percent = Math.min(100, Math.max(0, Number(into) || 0));

  return `
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${level}</span>
        <span class="xp-text">${into}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${percent}%"></div>
      </div>
    </div>
  `;
}
