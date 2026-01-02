// src/ui/cardsPanel.js
// "My Cards" kaart-map voor CBS-GO.
//
// - Laat een vaste set kaarten zien (walking + CBS), bv. 20+ stuks.
// - Voor elke kaart:
//     - Als je 'm hebt (count > 0) → emoji + naam + count.
//     - Als je 'm niet hebt → grote "?" met set-label eronder.
// - Data wordt lokaal opgeslagen in localStorage onder cbsgo_cards_v1.
// - Oude opslagvorm { cards: [...] } wordt automatisch gemigreerd naar { counts: { id: n } }.
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
// Hier kun je later gewoon meer kaarten bijzetten (tot 300+).
function getAllCardsDefinition() {
  return [
    // Walking-set (voorbeelden)
    { id: 'walk_sun_1', set: 'Walking', name: 'Sunny Walk', emoji: '🚶‍♂️☀️', rarity: 'common' },
    { id: 'walk_rain_1', set: 'Walking', name: 'Rainy Walk', emoji: '🚶‍♂️🌧️', rarity: 'common' },
    { id: 'walk_night_1', set: 'Walking', name: 'Night Walk', emoji: '🚶‍♀️🌙', rarity: 'uncommon' },
    { id: 'walk_city_1', set: 'Walking', name: 'City Steps', emoji: '🚶‍♂️🏙️', rarity: 'uncommon' },
    { id: 'walk_nature_1', set: 'Walking', name: 'Forest Trail', emoji: '🚶‍♀️🌲', rarity: 'rare' },
    { id: 'walk_beach_1', set: 'Walking', name: 'Beach Walk', emoji: '🚶‍♂️🏖️', rarity: 'rare' },

    // CBS-set (play / community)
    { id: 'cbs_heart_1', set: 'CBS', name: 'CBS Heart', emoji: '💛🪙', rarity: 'rare' },
    { id: 'cbs_chain_1', set: 'CBS', name: 'Break the Chain', emoji: '⛓️✨', rarity: 'epic' },
    { id: 'cbs_fire_1', set: 'CBS', name: 'Builder Flame', emoji: '🔥🛠️', rarity: 'epic' },
    { id: 'cbs_go_1', set: 'CBS', name: 'CBS-GO Explorer', emoji: '🗺️🪙', rarity: 'legendary' },

    // Nog wat extra generieke kaarten (zodat de map voller voelt)
    { id: 'walk_morning_1', set: 'Walking', name: 'Morning Steps', emoji: '🌅🚶‍♂️', rarity: 'common' },
    { id: 'walk_evening_1', set: 'Walking', name: 'Evening Glow', emoji: '🌇🚶‍♀️', rarity: 'common' },
    { id: 'walk_park_1', set: 'Walking', name: 'Park Loop', emoji: '🌳🚶‍♂️', rarity: 'uncommon' },
    { id: 'walk_bridge_1', set: 'Walking', name: 'River Bridge', emoji: '🌉🚶‍♀️', rarity: 'uncommon' },
    { id: 'cbs_star_1', set: 'CBS', name: 'Community Star', emoji: '⭐🪙', rarity: 'rare' },
    { id: 'cbs_glow_1', set: 'CBS', name: 'Glow Ticket', emoji: '🎟️✨', rarity: 'rare' },
    { id: 'cbs_team_1', set: 'CBS', name: 'Builder Squad', emoji: '🧑‍💻🧑‍💻', rarity: 'epic' },
    { id: 'cbs_legend_1', set: 'CBS', name: 'CBS Legend', emoji: '👑🪙', rarity: 'legendary' },

    // Placeholder kaarten – kun je later vervangen met eigen designs
    { id: 'walk_placeholder_1', set: 'Walking', name: 'Mystery Walk I', emoji: '🚶‍♂️❓', rarity: 'common' },
    { id: 'walk_placeholder_2', set: 'Walking', name: 'Mystery Walk II', emoji: '🚶‍♀️❓', rarity: 'common' },
    { id: 'cbs_placeholder_1', set: 'CBS', name: 'Mystery CBS I', emoji: '🪙❓', rarity: 'rare' },
    { id: 'cbs_placeholder_2', set: 'CBS', name: 'Mystery CBS II', emoji: '🪙❓', rarity: 'rare' },
  ];
}

// 🔹 Progress laden: hoeveel van elke kaart heb je?
// Ondersteunt:
//   - Nieuwe vorm: { counts: { id: number } }
//   - Oude vorm  : { cards: [ { id, count } ] }  → wordt gemigreerd naar counts.
function loadCardCounts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = safeParse(raw, {});

  let counts = {};

  if (data && typeof data.counts === 'object' && data.counts !== null) {
    counts = { ...data.counts };
  } else if (Array.isArray(data.cards)) {
    // migratie: oude vorm naar nieuwe counts-structuur
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

  const payload = { counts: safe };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

// Kleine helper: als je ooit via code een kaart wilt geven
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

// Rarity kleurtjes
function rarityColor(rarity) {
  if (rarity === 'legendary') return 'rgba(251,191,36,.95)'; // goud
  if (rarity === 'epic') return 'rgba(147,51,234,.9)';       // paars
  if (rarity === 'rare') return 'rgba(56,189,248,.9)';       // blauw
  return 'rgba(148,163,184,.9)';                             // grijs
}

// Hoeveel kaarten heb je totaal verzameld?
function getCollectedStats() {
  const defs = getAllCardsDefinition();
  const counts = loadCardCounts();

  let collected = 0;
  defs.forEach((c) => {
    if (counts[c.id] > 0) collected += 1;
  });

  return {
    collected,
    total: defs.length,
  };
}

// HTML grid met ALLE kaarten (invuld + vraagteken)
function renderCardsGrid() {
  const defs = getAllCardsDefinition();
  const counts = loadCardCounts();

  if (!defs.length) {
    return `
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `;
  }

  const tiles = defs
    .map((card) => {
      const count = Number(counts[card.id] || 0);
      const hasCard = Number.isFinite(count) && count > 0;

      const color = rarityColor(card.rarity);
      const borderColor = hasCard
        ? color
        : 'rgba(31,41,55,.9)';

      const bg = hasCard
        ? 'radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))'
        : 'rgba(15,23,42,1)';

      const emoji = hasCard ? (card.emoji || '🃏') : '❓';

      const nameLine = hasCard
        ? esc(card.name || 'Card')
        : `<span style="opacity:.6;">Unknown card</span>`;

      const setLabel = esc(card.set || 'Set');

      const countBadge = hasCard
        ? `<div style="
             position:absolute;
             right:6px;
             top:6px;
             padding:2px 6px;
             border-radius:999px;
             border:1px solid ${color};
             background:rgba(15,23,42,.96);
             font-size:10px;
           ">
             x${count}
           </div>`
        : '';

      return `
        <div
          class="cbsgoCardTile"
          data-card-id="${esc(card.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${borderColor};
            background:${bg};
            padding:6px 6px 7px 6px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            min-height:96px;
            cursor:pointer;
          "
        >
          ${countBadge}
          <div style="
            font-size:${hasCard ? '26px' : '28px'};
            margin-top:${hasCard ? '4px' : '8px'};
            margin-bottom:4px;
          ">
            ${esc(emoji)}
          </div>
          <div style="
            width:100%;
            text-align:center;
            font-size:11px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            margin-bottom:2px;
          ">
            ${nameLine}
          </div>
          <div style="
            font-size:10px;
            opacity:.7;
          ">
            ${setLabel}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${tiles}
    </div>
  `;
}

// ---------- Hoofd content voor My Cards-panel ----------

function renderCardsContent() {
  const stats = getCollectedStats();
  const { collected, total } = stats;

  const progressText = `${collected}/${total} cards collected`;

  const progressPercent = total > 0
    ? Math.round((collected / total) * 100)
    : 0;

  return `
    <div style="
      display:flex;
      flex-direction:column;
      gap:10px;
    ">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div style="font-size:11px;opacity:.8;">
          Fill your map by walking, playing CBS-GO and later by swapping cards with friends.
        </div>
        <div style="
          padding:4px 8px;
          border-radius:999px;
          border:1px solid rgba(148,163,184,.9);
          font-size:11px;
        ">
          ${progressText}
        </div>
      </div>

      <div style="
        width:100%;
        height:4px;
        border-radius:999px;
        background:rgba(15,23,42,1);
        overflow:hidden;
        margin-top:-2px;
        margin-bottom:4px;
      ">
        <div style="
          width:${progressPercent}%;
          height:100%;
          background:linear-gradient(to right, #38bdf8, #facc15);
          transition:width .25s ease-out;
        "></div>
      </div>

      <div style="
        flex:1;
        max-height:60vh;
        overflow:auto;
        padding:4px 2px 2px 2px;
      ">
        ${renderCardsGrid()}
      </div>
    </div>
  `;
}

/**
 * openCardsPanel()
 *
 * Toont fullscreen overlay boven de map.
 * Klik op een tegel → grote kaart-pop-up.
 */
export function openCardsPanel() {
  let host = document.getElementById('cbsgoCardsOverlayHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'cbsgoCardsOverlayHost';
    host.style.position = 'fixed';
    host.style.inset = '0';
    host.style.zIndex = '8500'; // tussen loot (8000) en evt. andere zaken
    host.style.pointerEvents = 'none';
    document.body.appendChild(host);
  }

  host.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style.position = 'fixed';
  wrap.style.inset = '0';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.background = 'rgba(5,7,11,0.78)';
  wrap.style.pointerEvents = 'auto';

  const card = document.createElement('div');
  card.style.width = 'min(420px, 94vw)';
  card.style.maxHeight = '80vh';
  card.style.borderRadius = '22px';
  card.style.border = '1px solid rgba(148,163,184,.9)';
  card.style.background = 'rgba(10,12,18,0.97)';
  card.style.boxShadow = '0 26px 80px rgba(0,0,0,.9)';
  card.style.padding = '14px 14px 10px 14px';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.color = '#fff';
  card.style.fontFamily = 'system-ui,sans-serif';
  card.style.opacity = '0';
  card.style.transform = 'translateY(14px) scale(0.96)';
  card.style.transition = 'opacity .22s ease-out, transform .22s ease-out';

  card.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="
          width:28px;height:28px;
          border-radius:999px;
          border:1px solid rgba(251,191,36,.9);
          display:flex;align-items:center;justify-content:center;
          background:rgba(15,23,42,1);
        ">
          🃏
        </div>
        <div>
          <div style="font-size:15px;font-weight:800;">
            My Cards
          </div>
          <div style="font-size:11px;opacity:.78;">
            Walking & CBS cards. Collected and still hidden.
          </div>
        </div>
      </div>
      <button type="button" id="cbsgoCardsCloseBtn" style="
        padding:6px 10px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,1);
        color:#e5e7eb;
        font-size:11px;
        font-weight:600;
        cursor:pointer;
      ">
        Close
      </button>
    </div>

    ${renderCardsContent()}
  `;

  wrap.appendChild(card);
  host.appendChild(wrap);

  // animatie in
  requestAnimationFrame(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
  });

  const closePanel = () => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px) scale(0.96)';
    setTimeout(() => {
      host.innerHTML = '';
    }, 220);
  };

  const closeBtn = document.getElementById('cbsgoCardsCloseBtn');
  if (closeBtn) closeBtn.onclick = closePanel;

  wrap.addEventListener('click', (e) => {
    if (e.target === wrap) closePanel();
  });

  // ---------- Kaart-pop-up binnen dit panel ----------

  const defs = getAllCardsDefinition();
  const byId = new Map(defs.map((c) => [c.id, c]));

  function showCardPreview(cardId) {
    const cardDef = byId.get(cardId);
    if (!cardDef) return;

    const counts = loadCardCounts();
    const count = Number(counts[cardId] || 0);
    const hasCard = Number.isFinite(count) && count > 0;

    const emoji = hasCard ? (cardDef.emoji || '🃏') : '❓';
    const name = hasCard ? (cardDef.name || 'Card') : 'Unknown card';
    const setLabel = cardDef.set || 'Set';
    const rarity = cardDef.rarity || 'common';
    const color = rarityColor(rarity);

    const rarityLabel = {
      common: 'Common',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary',
    }[rarity] || 'Common';

    const hostOverlay = document.createElement('div');
    hostOverlay.style.position = 'fixed';
    hostOverlay.style.inset = '0';
    hostOverlay.style.display = 'flex';
    hostOverlay.style.alignItems = 'center';
    hostOverlay.style.justifyContent = 'center';
    hostOverlay.style.background = 'rgba(0,0,0,0.65)';
    hostOverlay.style.pointerEvents = 'auto';
    hostOverlay.style.zIndex = '8600';

    const bigCard = document.createElement('div');
    bigCard.style.width = 'min(260px, 82vw)';
    bigCard.style.borderRadius = '20px';
    bigCard.style.border = `1px solid ${color}`;
    bigCard.style.background = 'radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))';
    bigCard.style.boxShadow = '0 28px 90px rgba(0,0,0,.95)';
    bigCard.style.padding = '16px 14px 14px 14px';
    bigCard.style.textAlign = 'center';
    bigCard.style.color = '#fff';
    bigCard.style.fontFamily = 'system-ui,sans-serif';
    bigCard.style.opacity = '0';
    bigCard.style.transform = 'translateY(14px) scale(0.96)';
    bigCard.style.transition = 'opacity .2s ease-out, transform .2s ease-out';

    const countLine = hasCard
      ? `<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${count}</b></div>`
      : `<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>`;

    const extraLine = hasCard
      ? `<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`
      : `<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;

    bigCard.innerHTML = `
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${esc(setLabel)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${color};
          font-size:10px;
        ">
          ${esc(rarityLabel)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${color};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${esc(emoji)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${esc(name)}
      </div>

      ${countLine}
      ${extraLine}

      <button type="button" style="
        margin-top:10px;
        padding:7px 14px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,1);
        color:#e5e7eb;
        font-size:11px;
        font-weight:600;
        cursor:pointer;
      " id="cbsgoCardPreviewCloseBtn">
        Close
      </button>
    `;

    hostOverlay.appendChild(bigCard);
    document.body.appendChild(hostOverlay);

    requestAnimationFrame(() => {
      bigCard.style.opacity = '1';
      bigCard.style.transform = 'translateY(0) scale(1)';
    });

    const closePreview = () => {
      bigCard.style.opacity = '0';
      bigCard.style.transform = 'translateY(14px) scale(0.96)';
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

  // Klikken op tegel → preview
  const tiles = card.querySelectorAll('.cbsgoCardTile');
  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const id = tile.getAttribute('data-card-id');
      if (!id) return;
      showCardPreview(id);
    });
  });
}
