// src/ui/cardsPanel.js
// "My Cards" collection map for CBS-GO (localStorage inventory display only).

import { icon } from './gameIcons.js';

const STORAGE_KEY = 'cbsgo_cards_v1';

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

function getAllCardsDefinition() {
  return [
    { id: 'walk_sun_1', set: 'Walking', name: 'Sunny Walk', emoji: '🚶‍♂️☀️', rarity: 'common' },
    { id: 'walk_rain_1', set: 'Walking', name: 'Rainy Walk', emoji: '🚶‍♂️🌧️', rarity: 'common' },
    { id: 'walk_night_1', set: 'Walking', name: 'Night Walk', emoji: '🚶‍♀️🌙', rarity: 'uncommon' },
    { id: 'walk_city_1', set: 'Walking', name: 'City Steps', emoji: '🚶‍♂️🏙️', rarity: 'uncommon' },
    { id: 'walk_nature_1', set: 'Walking', name: 'Forest Trail', emoji: '🚶‍♀️🌲', rarity: 'rare' },
    { id: 'walk_beach_1', set: 'Walking', name: 'Beach Walk', emoji: '🚶‍♂️🏖️', rarity: 'rare' },
    { id: 'cbs_heart_1', set: 'CBS', name: 'CBS Heart', emoji: '💛🪙', rarity: 'rare' },
    { id: 'cbs_chain_1', set: 'CBS', name: 'Break the Chain', emoji: '⛓️✨', rarity: 'epic' },
    { id: 'cbs_fire_1', set: 'CBS', name: 'Builder Flame', emoji: '🔥🛠️', rarity: 'epic' },
    { id: 'cbs_go_1', set: 'CBS', name: 'CBS-GO Explorer', emoji: '🗺️🪙', rarity: 'legendary' },
    { id: 'walk_morning_1', set: 'Walking', name: 'Morning Steps', emoji: '🌅🚶‍♂️', rarity: 'common' },
    { id: 'walk_evening_1', set: 'Walking', name: 'Evening Glow', emoji: '🌇🚶‍♀️', rarity: 'common' },
    { id: 'walk_park_1', set: 'Walking', name: 'Park Loop', emoji: '🌳🚶‍♂️', rarity: 'uncommon' },
    { id: 'walk_bridge_1', set: 'Walking', name: 'River Bridge', emoji: '🌉🚶‍♀️', rarity: 'uncommon' },
    { id: 'cbs_star_1', set: 'CBS', name: 'Community Star', emoji: '⭐🪙', rarity: 'rare' },
    { id: 'cbs_glow_1', set: 'CBS', name: 'Glow Ticket', emoji: '🎟️✨', rarity: 'rare' },
    { id: 'cbs_team_1', set: 'CBS', name: 'Builder Squad', emoji: '🧑‍💻🧑‍💻', rarity: 'epic' },
    { id: 'cbs_legend_1', set: 'CBS', name: 'CBS Legend', emoji: '👑🪙', rarity: 'legendary' },
    { id: 'walk_placeholder_1', set: 'Walking', name: 'Mystery Walk I', emoji: '🚶‍♂️❓', rarity: 'common' },
    { id: 'walk_placeholder_2', set: 'Walking', name: 'Mystery Walk II', emoji: '🚶‍♀️❓', rarity: 'common' },
    { id: 'cbs_placeholder_1', set: 'CBS', name: 'Mystery CBS I', emoji: '🪙❓', rarity: 'rare' },
    { id: 'cbs_placeholder_2', set: 'CBS', name: 'Mystery CBS II', emoji: '🪙❓', rarity: 'rare' },
  ];
}

function loadCardCounts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = safeParse(raw, {});

  let counts = {};

  if (data && typeof data.counts === 'object' && data.counts !== null) {
    counts = { ...data.counts };
  } else if (Array.isArray(data.cards)) {
    data.cards.forEach((c) => {
      if (!c || !c.id) return;
      const n = Number(c.count || 0);
      if (Number.isFinite(n) && n > 0) {
        counts[c.id] = n;
      }
    });
  }

  return counts;
}

function saveCardCounts(counts) {
  const safe = {};
  for (const [id, n] of Object.entries(counts || {})) {
    const num = Number(n || 0);
    if (Number.isFinite(num) && num > 0) {
      safe[id] = num;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ counts: safe }));
}

export function grantCard(cardId, amount = 1) {
  const defs = getAllCardsDefinition();
  const exists = defs.some((c) => c.id === cardId);
  if (!exists) return;

  const counts = loadCardCounts();
  const current = Number(counts[cardId] || 0);
  const add = Number(amount || 0);
  if (!Number.isFinite(add) || add <= 0) return;

  counts[cardId] = current + add;
  saveCardCounts(counts);
}

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function rarityClass(rarity) {
  const r = String(rarity || 'common').toLowerCase();
  if (r === 'legendary' || r === 'epic' || r === 'rare' || r === 'uncommon') return r;
  return 'common';
}

function getCollectedStats() {
  const defs = getAllCardsDefinition();
  const counts = loadCardCounts();

  let collected = 0;
  defs.forEach((c) => {
    if (counts[c.id] > 0) collected += 1;
  });

  return { collected, total: defs.length };
}

function renderCardsGrid() {
  const defs = getAllCardsDefinition();
  const counts = loadCardCounts();

  if (!defs.length) {
    return `<div class="cbsgo-mycards-empty">No cards defined yet.</div>`;
  }

  const tiles = defs
    .map((card) => {
      const count = Number(counts[card.id] || 0);
      const hasCard = Number.isFinite(count) && count > 0;
      const rarity = rarityClass(card.rarity);
      const lockedClass = hasCard ? '' : ' cbsgo-mycards-tile--locked';

      const emoji = hasCard ? card.emoji || '🃏' : '❓';
      const nameLine = hasCard
        ? esc(card.name || 'Card')
        : `<span class="cbsgo-mycards-tile__unknown">Unknown card</span>`;

      const countBadge = hasCard
        ? `<span class="cbsgo-mycards-tile__qty">x${count}</span>`
        : '';

      return `
        <div
          class="cbsgo-mycards-tile cbsgo-mycards-tile--${rarity}${lockedClass}"
          data-card-id="${esc(card.id)}"
          title="${esc(card.name || card.id)}"
        >
          ${countBadge}
          <div class="cbsgo-mycards-tile__emoji">${esc(emoji)}</div>
          <div class="cbsgo-mycards-tile__name">${nameLine}</div>
          <div class="cbsgo-mycards-tile__set">${esc(card.set || 'Set')}</div>
        </div>
      `;
    })
    .join('');

  return `<div class="cbsgo-mycards-grid">${tiles}</div>`;
}

function renderCardsContent() {
  const { collected, total } = getCollectedStats();
  const progressText = `${collected}/${total} cards collected`;
  const progressPercent = total > 0 ? Math.round((collected / total) * 100) : 0;

  return `
    <div class="cbsgo-mycards-body">
      <div class="cbsgo-mycards-meta">
        <div class="cbsgo-mycards-meta__hint">
          Fill your map by walking, playing CBS-GO and later by swapping cards with friends.
        </div>
        <div class="cbsgo-mycards-meta__pill">${progressText}</div>
      </div>

      <div class="cbsgo-mycards-progress" aria-hidden="true">
        <div class="cbsgo-mycards-progress__bar" style="width:${progressPercent}%;"></div>
      </div>

      <div class="cbsgo-mycards-scroll">
        ${renderCardsGrid()}
      </div>
    </div>
  `;
}

export function openCardsPanel() {
  let host = document.getElementById('cbsgoCardsOverlayHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'cbsgoCardsOverlayHost';
    host.className = 'cbsgo-mycards-host';
    document.body.appendChild(host);
  }

  host.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'cbsgo-mycards-overlay';

  const card = document.createElement('div');
  card.className = 'cbsgo-mycards-modal';

  card.innerHTML = `
    <div class="cbsgo-mycards-modal__header">
      <div class="cbsgo-mycards-modal__brand">
        <div class="cbsgo-mycards-modal__logo">${icon('cards', 22, { className: 'cbsgo-icon' })}</div>
        <div>
          <div class="cbsgo-mycards-modal__title">My Cards</div>
          <div class="cbsgo-mycards-modal__subtitle">Walking and CBS cards. Collected and still hidden.</div>
        </div>
      </div>
      <button type="button" id="cbsgoCardsCloseBtn" class="cbsgo-mycards-modal__close">Close</button>
    </div>
    ${renderCardsContent()}
  `;

  wrap.appendChild(card);
  host.appendChild(wrap);

  requestAnimationFrame(() => {
    card.classList.add('cbsgo-mycards-modal--visible');
  });

  const closePanel = () => {
    card.classList.remove('cbsgo-mycards-modal--visible');
    setTimeout(() => {
      host.innerHTML = '';
    }, 220);
  };

  const closeBtn = document.getElementById('cbsgoCardsCloseBtn');
  if (closeBtn) closeBtn.onclick = closePanel;

  wrap.addEventListener('click', (e) => {
    if (e.target === wrap) closePanel();
  });

  const defs = getAllCardsDefinition();
  const byId = new Map(defs.map((c) => [c.id, c]));

  function showCardPreview(cardId) {
    const cardDef = byId.get(cardId);
    if (!cardDef) return;

    const counts = loadCardCounts();
    const count = Number(counts[cardId] || 0);
    const hasCard = Number.isFinite(count) && count > 0;
    const rarity = rarityClass(cardDef.rarity);

    const emoji = hasCard ? cardDef.emoji || '🃏' : '❓';
    const name = hasCard ? cardDef.name || 'Card' : 'Unknown card';
    const setLabel = cardDef.set || 'Set';

    const rarityLabel = {
      common: 'Common',
      uncommon: 'Uncommon',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary',
    }[rarity] || 'Common';

    const hostOverlay = document.createElement('div');
    hostOverlay.className = 'cbsgo-mycards-preview-overlay';

    const bigCard = document.createElement('div');
    bigCard.className = `cbsgo-mycards-preview cbsgo-mycards-preview--${rarity}${hasCard ? '' : ' cbsgo-mycards-preview--locked'}`;

    const countLine = hasCard
      ? `<div class="cbsgo-mycards-preview__count">You own <b>x${count}</b></div>`
      : `<div class="cbsgo-mycards-preview__count">Not collected yet.</div>`;

    const extraLine = hasCard
      ? `<div class="cbsgo-mycards-preview__hint">Trade or keep walking to complete more cards in this set.</div>`
      : `<div class="cbsgo-mycards-preview__hint">Find this card by walking, opening gifts or later by swapping cards with friends.</div>`;

    bigCard.innerHTML = `
      <div class="cbsgo-mycards-preview__top">
        <div class="cbsgo-mycards-preview__set">${esc(setLabel)} set</div>
        <div class="cbsgo-mycards-preview__rarity">${esc(rarityLabel)}</div>
      </div>
      <div class="cbsgo-mycards-preview__art">${esc(emoji)}</div>
      <div class="cbsgo-mycards-preview__name">${esc(name)}</div>
      ${countLine}
      ${extraLine}
      <button type="button" class="cbsgo-mycards-preview__close" id="cbsgoCardPreviewCloseBtn">Close</button>
    `;

    hostOverlay.appendChild(bigCard);
    document.body.appendChild(hostOverlay);

    requestAnimationFrame(() => {
      bigCard.classList.add('cbsgo-mycards-preview--visible');
    });

    const closePreview = () => {
      bigCard.classList.remove('cbsgo-mycards-preview--visible');
      setTimeout(() => {
        document.body.removeChild(hostOverlay);
      }, 200);
    };

    const closePreviewBtn = bigCard.querySelector('#cbsgoCardPreviewCloseBtn');
    if (closePreviewBtn) closePreviewBtn.onclick = closePreview;

    hostOverlay.addEventListener('click', (e) => {
      if (e.target === hostOverlay) closePreview();
    });
  }

  card.querySelectorAll('.cbsgo-mycards-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const id = tile.getAttribute('data-card-id');
      if (!id) return;
      showCardPreview(id);
    });
  });
}
