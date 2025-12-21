import { gameState, getLevel, getXpIntoLevel } from '../app/state.js';

export function renderXpBar() {
  const level = getLevel(gameState.xp);
  const into = getXpIntoLevel(gameState.xp); // 0..99
  const percent = Math.min(100, Math.max(0, into));

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
