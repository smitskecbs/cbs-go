// XP bar + distance HUD (top-right).

import {
  getXp,
  getLevel,
  getXpIntoLevel,
  getXpNeededThisLevel,
} from '../app/state.js';

import { getDistanceKm } from '../app/steps.js';

import { icon } from './gameIcons.js';

export function renderXpBar() {
  const total = getXp();
  const level = getLevel();
  const current = getXpIntoLevel();
  const needed = getXpNeededThisLevel();
  const km = getDistanceKm();

  const pct =
    needed > 0 ? Math.min(100, Math.round((current / needed) * 100)) : 0;

  return `
    <div id="cbsgoXpBarInner" class="cbsgo-xp-bar">
      <div class="cbsgo-xp-bar__head">
        <div class="cbsgo-xp-bar__badge" aria-hidden="true">${level}</div>
        <div class="cbsgo-xp-bar__meta">
          <div id="cbsgoXpLabel" class="cbsgo-xp-bar__level">Level ${level}</div>
          <div class="cbsgo-xp-bar__km">${km.toFixed(2)} km today</div>
        </div>
        <div class="cbsgo-xp-bar__trophy">${icon('trophy', 16, { className: 'cbsgo-icon' })}</div>
      </div>

      <div class="cbsgo-xp-bar__track" aria-hidden="true">
        <div id="cbsgoXpFill" class="cbsgo-xp-bar__fill" style="width:${pct}%;"></div>
      </div>

      <div id="cbsgoXpText" class="cbsgo-xp-bar__foot">
        <span>${current}/${needed} XP</span>
        <span class="cbsgo-xp-bar__total">${total} total</span>
      </div>
    </div>
  `;
}
