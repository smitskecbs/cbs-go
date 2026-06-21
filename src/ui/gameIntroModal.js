// Game intro popup — shown once per app version after profile is complete.

import { CBSGO_APP_VERSION } from '../app/appVersion.js';
import { icon } from './gameIcons.js';

const STORAGE_KEY = 'cbsgo_seen_game_intro';
const MODAL_ID = 'cbsgoGameIntroModal';

function getSeenIntroVersion() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return String(parsed?.version || '');
  } catch {
    return '';
  }
}

function markIntroSeen() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: CBSGO_APP_VERSION, at: Date.now() }),
    );
  } catch {}
}

function removeModal() {
  const el = document.getElementById(MODAL_ID);
  if (el) el.remove();
}

/**
 * Show welcome intro once per CBSGO_APP_VERSION, after gameplay is allowed.
 */
export function showGameIntroIfNeeded() {
  if (getSeenIntroVersion() === CBSGO_APP_VERSION) return;
  if (document.getElementById(MODAL_ID)) return;

  const wrap = document.createElement('div');
  wrap.id = MODAL_ID;
  wrap.className = 'cbsgo-intro-backdrop';

  wrap.innerHTML = `
    <div class="cbsgo-intro-card" role="dialog" aria-modal="true" aria-labelledby="cbsgoIntroTitle">
      <div class="cbsgo-intro-card__glow" aria-hidden="true"></div>
      <div class="cbsgo-intro-card__icon">${icon('compass', 32, { className: 'cbsgo-icon' })}</div>
      <h2 id="cbsgoIntroTitle" class="cbsgo-intro-card__title">Welcome to CBS-GO</h2>
      <ul class="cbsgo-intro-card__list">
        <li>Walk around in the real world and explore the map.</li>
        <li>Stars are loot points. Open them to collect coins, tickets and rewards.</li>
        <li>Save your tickets and CBS Play to redeem later for real CBS rewards and mystery boxes.</li>
        <li>Tap your level badge in the top-right to open the scoreboard.</li>
        <li>Use the compass/globe button in the top-left to switch between world mode and player mode.</li>
      </ul>
      <button type="button" class="cbsgo-btn-primary cbsgo-intro-card__btn">Start exploring</button>
    </div>
  `;

  const finish = () => {
    markIntroSeen();
    removeModal();
  };

  wrap.addEventListener('click', (e) => {
    if (e.target === wrap) {
      e.preventDefault();
      finish();
    }
  });

  wrap.querySelector('.cbsgo-intro-card__btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    finish();
  });

  document.body.appendChild(wrap);
}
