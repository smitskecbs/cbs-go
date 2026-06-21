// Adventure Bag panel layout (orange/gold wallet-style).

import { icon } from './gameIcons.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function cardTileIcon(id) {
  const key = String(id || '');
  if (key.startsWith('cbs_')) return icon('coin', 20, { className: 'cbsgo-icon' });
  if (key.startsWith('walk_')) return icon('compass', 20, { className: 'cbsgo-icon' });
  return icon('cards', 20, { className: 'cbsgo-icon' });
}

function renderCardTile(c) {
  const qty = Number(c.count || 0);
  return `
    <div class="cbsgo-bag-card-tile" title="${esc(c.label || c.id)}">
      <span class="cbsgo-bag-card-tile__qty">x${qty}</span>
      <div class="cbsgo-bag-card-tile__art">${cardTileIcon(c.id)}</div>
      <div class="cbsgo-bag-card-tile__name">${esc(c.label || c.id)}</div>
    </div>
  `;
}

/**
 * @param {{
 *   tickets: number,
 *   cbs: number,
 *   cardTypes: number,
 *   cardTotal: number,
 *   sendable: Array<{ id: string, count: number, label?: string }>,
 *   canClaimMysteryBox: boolean,
 *   canClaimCbsReward: boolean,
 *   solPk: string,
 * }} ctx
 */
export function renderBagPanel(ctx) {
  const {
    tickets,
    cbs,
    cardTypes,
    cardTotal,
    sendable,
    canClaimMysteryBox,
    canClaimCbsReward,
    solPk,
  } = ctx;

  const hasSendableCards = sendable.length > 0;

  const cardSelectHtml = hasSendableCards
    ? `
      <div class="cbsgo-bag-gift-row">
        <div style="flex:1;min-width:140px;">
          <label for="giftCardSelect" class="cbsgo-bag-label">Card (optional)</label>
          <select id="giftCardSelect" class="cbsgo-bag-input">
            <option value="">No card</option>
            ${sendable
              .map(
                (c) =>
                  `<option value="${esc(c.id)}">${esc(c.label || c.id)} (x${c.count})</option>`,
              )
              .join('')}
          </select>
        </div>
        <div style="width:80px;">
          <label for="giftCardQtyInput" class="cbsgo-bag-label">Qty</label>
          <input id="giftCardQtyInput" type="number" min="0" step="1" placeholder="0" class="cbsgo-bag-input" />
        </div>
      </div>
    `
    : `<div class="cbsgo-bag-empty-hint">You do not have any cards yet to send.</div>`;

  const cardCollectionHtml =
    sendable.length > 0
      ? `
        <div class="cbsgo-bag-card-scroll">
          <div class="cbsgo-bag-card-grid">
            ${sendable.map(renderCardTile).join('')}
          </div>
        </div>
      `
      : `
        <div class="cbsgo-bag-card-scroll cbsgo-bag-card-scroll--empty">
          <div class="cbsgo-bag-empty-state">
            ${icon('cards', 28, { className: 'cbsgo-icon' })}
            <div>No cards collected yet. Open loot stars to find cards.</div>
          </div>
        </div>
      `;

  const bagSectionHead = (iconName, title, desc) => `
    <div class="cbsgo-bag-section__head">
      <div class="cbsgo-bag-section__icon">${icon(iconName, 18, { className: 'cbsgo-icon' })}</div>
      <div style="min-width:0;">
        <div class="cbsgo-bag-section__title">${esc(title)}</div>
        <div class="cbsgo-bag-section__desc">${esc(desc)}</div>
      </div>
    </div>
  `;

  return `
    <section class="cbsgo-bag-panel">
      <div class="cbsgo-bag-panel__header">
        <div class="cbsgo-bag-panel__brand">
          <div class="cbsgo-bag-panel__logo">${icon('bag', 26, { className: 'cbsgo-icon' })}</div>
          <div>
            <div class="cbsgo-bag-panel__title">Adventure Bag</div>
            <div class="cbsgo-bag-panel__subtitle">Loot, tickets and CBS play collected while walking</div>
          </div>
        </div>
      </div>

      <div class="cbsgo-bag-asset-grid">
        <div class="cbsgo-bag-asset-card cbsgo-bag-asset-card--tickets">
          <div class="cbsgo-bag-asset-card__icon">${icon('ticket', 16, { className: 'cbsgo-icon' })}</div>
          <div class="cbsgo-bag-asset-card__label">Tickets</div>
          <div class="cbsgo-bag-asset-card__value">${esc(String(tickets))}</div>
          <div class="cbsgo-bag-asset-card__hint">Redeem rewards</div>
        </div>
        <div class="cbsgo-bag-asset-card cbsgo-bag-asset-card--cbs">
          <div class="cbsgo-bag-asset-card__icon">${icon('coin', 16, { className: 'cbsgo-icon' })}</div>
          <div class="cbsgo-bag-asset-card__label">CBS Play</div>
          <div class="cbsgo-bag-asset-card__value">${esc(String(cbs))}</div>
          <div class="cbsgo-bag-asset-card__hint">In-game balance</div>
        </div>
        <div class="cbsgo-bag-asset-card cbsgo-bag-asset-card--cards">
          <div class="cbsgo-bag-asset-card__icon">${icon('cards', 16, { className: 'cbsgo-icon' })}</div>
          <div class="cbsgo-bag-asset-card__label">Cards</div>
          <div class="cbsgo-bag-asset-card__value">${esc(String(cardTotal))}</div>
          <div class="cbsgo-bag-asset-card__hint">${cardTypes} types</div>
        </div>
      </div>

      <div class="cbsgo-bag-section cbsgo-bag-section--rewards">
        <div class="cbsgo-bag-reward-card ${canClaimMysteryBox ? 'cbsgo-bag-reward-card--ready' : ''}">
          <div class="cbsgo-bag-reward-card__main">
            ${bagSectionHead('chest', 'Mystery Box', 'Collect 1000 tickets to claim BONK, SOL or CBS rewards.')}
          </div>
          <button id="claimMysteryBoxBtn" type="button" class="cbsgo-bag-action-btn" ${canClaimMysteryBox ? '' : 'disabled'}>
            ${canClaimMysteryBox ? 'Claim box' : `${1000 - tickets} left`}
          </button>
        </div>

        <div class="cbsgo-bag-reward-card ${canClaimCbsReward ? 'cbsgo-bag-reward-card--ready' : ''}">
          <div class="cbsgo-bag-reward-card__main">
            ${bagSectionHead('coin', 'CBS Reward', 'Collect 1000 CBS play to claim a CBS reward later.')}
          </div>
          <button id="claimCbsRewardBtn" type="button" class="cbsgo-bag-action-btn" ${canClaimCbsReward ? '' : 'disabled'}>
            ${canClaimCbsReward ? 'Claim reward' : `${1000 - cbs} left`}
          </button>
        </div>
      </div>

      <div class="cbsgo-bag-section cbsgo-bag-section--cards">
        ${bagSectionHead('cards', 'Card collection', `${cardTypes} types · ${cardTotal} total`)}
        <p class="cbsgo-bag-card-hint">
          Cards can sometimes be found in loot stars. Collect and save them for future rewards.
        </p>
        ${cardCollectionHtml}
        <div class="cbsgo-bag-section__actions cbsgo-bag-section__actions--end">
          <button id="cbsgoOpenCardsBtn" type="button" class="cbsgo-bag-action-btn cbsgo-bag-action-btn--primary">
            Open collection
          </button>
        </div>
      </div>

      ${
        solPk
          ? `
        <div class="cbsgo-bag-section cbsgo-bag-section--wallet">
          ${bagSectionHead('wallet', 'Linked wallet', 'Your Solana address for on-chain gifts and rewards.')}
          <div class="cbsgo-bag-address-box">${esc(solPk)}</div>
          <div class="cbsgo-bag-section__actions">
            <button id="cbsgoCopySolWalletBtn" type="button" class="cbsgo-bag-action-btn cbsgo-bag-action-btn--primary">Copy address</button>
            <button id="cbsgoOpenSolanaWalletBtn" type="button" class="cbsgo-bag-action-btn">Open wallet</button>
          </div>
          <div id="bagMsg" class="cbsgo-bag-msg"></div>
        </div>
      `
          : `
        <div class="cbsgo-bag-section cbsgo-bag-section--warn">
          ${icon('error', 18, { className: 'cbsgo-icon' })}
          <div>No local Solana wallet found yet. Finish login (PIN) to unlock or create your wallet.</div>
        </div>
      `
      }

      <div class="cbsgo-bag-section cbsgo-bag-section--gift">
        ${bagSectionHead('gift', 'Send a gift', 'Send tickets, CBS play and optional cards to a friend. Off-chain via Supabase.')}
        <div class="cbsgo-bag-gift-form">
          <div>
            <label for="giftWalletInput" class="cbsgo-bag-label">Friend wallet address</label>
            <input id="giftWalletInput" placeholder="Paste wallet address" class="cbsgo-bag-input" />
          </div>
          <div>
            <label for="giftFriendSelect" class="cbsgo-bag-label">Or pick a friend</label>
            <select id="giftFriendSelect" class="cbsgo-bag-input">
              <option value="">-- No friend selected --</option>
            </select>
          </div>
          <div class="cbsgo-bag-gift-row">
            <div style="flex:1;min-width:90px;">
              <label for="giftTicketsInput" class="cbsgo-bag-label">Tickets</label>
              <input id="giftTicketsInput" type="number" min="0" step="1" placeholder="0" class="cbsgo-bag-input" />
            </div>
            <div style="flex:1;min-width:90px;">
              <label for="giftCbsInput" class="cbsgo-bag-label">CBS play</label>
              <input id="giftCbsInput" type="number" min="0" step="1" placeholder="0" class="cbsgo-bag-input" />
            </div>
          </div>
          ${cardSelectHtml}
          <div style="display:flex;justify-content:flex-end;">
            <button id="giftSendBtn" type="button" class="cbsgo-bag-action-btn cbsgo-bag-action-btn--primary">Send gift</button>
          </div>
          <div id="giftMsg" class="cbsgo-bag-msg"></div>
        </div>
      </div>
    </section>
  `;
}
