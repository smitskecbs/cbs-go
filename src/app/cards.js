// src/app/cards.js
// Card model for CBS-GO (walking + CBS themed)

import { getAllCards, addCard } from './inventory.js';

export const CARD_SERIES_V1 = [
  // WALKING
  { id: 'forest_explorer', emoji: '🌲', name: 'Forest Explorer', rarity: 'common' },
  { id: 'night_runner', emoji: '🌙', name: 'Night Runner', rarity: 'common' },
  { id: 'rain_walker', emoji: '🌧️', name: 'Rain Walker', rarity: 'common' },
  { id: 'city_trekker', emoji: '🏙️', name: 'City Trekker', rarity: 'rare' },
  { id: 'long_distance_hero', emoji: '🥇', name: 'Long Distance Hero', rarity: 'legendary' },

  // CBS
  { id: 'chain_breaker', emoji: '⛓️', name: 'Chain Breaker', rarity: 'rare' },
  { id: 'community_builder', emoji: '🤝', name: 'Community Builder', rarity: 'common' },
  { id: 'diamond_hands', emoji: '💎', name: 'Diamond Hands', rarity: 'rare' },
  { id: 'cbs_og', emoji: '🔥', name: 'CBS OG', rarity: 'legendary' },
];

export function getCardCatalog() {
  return CARD_SERIES_V1;
}

export function getMyCards() {
  return getAllCards();
}

export function awardCard(cardId) {
  return addCard(cardId, 1);
}
