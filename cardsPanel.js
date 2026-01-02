// src/ui/cardsPanel.js
// "My Cards" kaart-map voor CBS-GO.
//
// - Laat een vaste set kaarten zien (walking + CBS)
// - Als je ‘m hebt -> emoji + naam + count
// - Anders -> ❓ Unknown card
//

const STORAGE_KEY = 'cbsgo_cards_v1';

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : fallback;
  } catch {
    return fallback;
  }
}

// 🔹 DEFINITIE VAN ALLE MOGELIJKE KAARTEN
export function getAllCardsDefinition() {
  return [
    { id: 'walk_sun_1', set: 'Walking', name: 'Sunny Walk', emoji: '🚶‍♂️☀️', rarity: 'common' },
    { id: 'walk_rain_1', set: 'Walking', name: 'Rainy Walk', emoji: '🚶‍♂️🌧️', rarity: 'common' },
    { id: 'walk_night_1', set: 'Walking', name: 'Night Walk', emoji: '🚶‍♀️🌙', rarity: 'uncommon' },
    { id: 'walk_city_1', set: 'Walking', name: 'City Steps', emoji: '🚶‍♂️🏙️', rarity: 'uncommon' },
    { id: 'walk_nature_1', set: 'Walking', name: 'Forest Trail', emoji: '🚶‍♀️🌲', rarity: 'rare' },
    { id: 'walk_beach_1', set: 'Walking', name: 'Beach Walk', emoji: '🚶‍♂️🏖️', rarity: 'rare' },

    // CBS-set
    { id: 'cbs_heart_1', set: 'CBS', name: 'CBS Heart', emoji: '💛🪙', rarity: 'rare' },
    { id: 'cbs_chain_1', set: 'CBS', name: 'Break the Chain', emoji: '⛓️✨', rarity: 'epic' },
    { id: 'cbs_fire_1', set: 'CBS', name: 'Builder Flame', emoji: '🔥🛠️', rarity: 'epic' },
    { id: 'cbs_go_1', set: 'CBS', name: 'CBS-GO Explorer', emoji: '🗺️🪙', rarity: 'legendary' },
  ];
}

// 🔹 Laden van progress
function loadCardCounts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = safeParse(raw, {});
  let counts = {};

  if (data && typeof data.counts === 'object' && data.counts !== null) {
    counts = { ...data.counts };
  }
  return counts;
}

function saveCardCounts(counts) {
  const safe = {};
  for (const [id, n] of Object.entries(counts || {})) {
    const num = Number(n || 0);
    if (Number.isFinite(num) && num > 0) safe[id] = num;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ counts: safe }));
}

// 🔹 EXTERN API — kaarten geven
export function grantCard(cardId, amount = 1) {
  const defs = getAllCardsDefinition();
  if (!defs.some(c => c.id === cardId)) return;

  const counts = loadCardCounts();
  const add = Number(amount || 0);
  if (!Number.isFinite(add) || add <= 0) return;

  counts[cardId] = Number(counts[cardId] || 0) + add;
  saveCardCounts(counts);

  window.dispatchEvent(new CustomEvent('cbsgo:cardsChanged', { detail: { counts } }));
}

function rarityColor(rarity) {
  if (rarity === 'legendary') return 'rgba(251,191,36,.95)';
  if (rarity === 'epic') return 'rgba(147,51,234,.9)';
  if (rarity === 'rare') return 'rgba(56,189,248,.9)';
  return 'rgba(148,163,184,.9)';
}

function renderCardsGrid() {
  const defs = getAllCardsDefinition();
  const counts = loadCardCounts();

  return `
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px,1fr));
      gap:8px;
    ">
      ${defs.map(card => {
        const count = Number(counts[card.id] || 0);
        const hasCard = count > 0;
        const color = rarityColor(card.rarity);
        return `
          <div class="cbsgoCardTile" data-card-id="${card.id}"
            style="
              position:relative;
              border-radius:14px;
              border:1px solid ${hasCard ? color : 'rgba(31,41,55,.9)'};
              background:${hasCard
                ? 'radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))'
                : 'rgba(15,23,42,1)'};
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:center;
              min-height:96px;
              cursor:pointer;
            ">
            ${hasCard ? `<div style="
              position:absolute;right:6px;top:6px;
              border-radius:999px;
              border:1px solid ${color};
              padding:2px 6px;
              font-size:10px;
            ">x${count}</div>` : ''}
            <div style="font-size:${hasCard ? '28px' : '30px'};">
              ${hasCard ? card.emoji : '❓'}
            </div>
            <div style="font-size:10px;opacity:.8;">
              ${hasCard ? card.name : 'Unknown card'}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ---------- Open panel ----------
export function openCardsPanel() {
  let host = document.getElementById('cbsgoCardsOverlayHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'cbsgoCardsOverlayHost';
    host.style.position = 'fixed';
    host.style.inset = '0';
    host.style.zIndex = '8500';
    document.body.appendChild(host);
  }

  host.innerHTML = `
    <div style="
      position:fixed;inset:0;
      display:flex;align-items:center;justify-content:center;
      background:rgba(5,7,11,0.78);
    ">
      <div style="
        width:min(420px,94vw);
        max-height:80vh;
        overflow:auto;
        border-radius:22px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(10,12,18,.97);
        padding:14px;
        color:white;
      ">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <b>My Cards</b>
          <button id="cbsgoCardsCloseBtn">Close</button>
        </div>
        ${renderCardsGrid()}
      </div>
    </div>
  `;

  document.getElementById('cbsgoCardsCloseBtn').onclick = () => host.innerHTML = '';

  host.querySelectorAll('.cbsgoCardTile').forEach(tile => {
    tile.addEventListener('click', () => {
      alert(tile.dataset.cardId);
    });
  });
}
