// src/ui/gameIcons.js
// Consistent inline SVG icons for CBS-GO (Solana adventure HUD style).

const ICON_PATHS = {
  profile: `
    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.75"/>
    <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M16 5.5l1.5 1.5L21 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
  `,
  bag: `
    <path d="M8 9V7.5A4 4 0 0 1 16 7.5V9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <rect x="6" y="9" width="12" height="11" rx="2.5" stroke="currentColor" stroke-width="1.75"/>
    <path d="M10 13h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M12 9v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
  `,
  wallet: `
    <rect x="3" y="7" width="18" height="12" rx="3" stroke="currentColor" stroke-width="1.75"/>
    <path d="M3 11h18" stroke="currentColor" stroke-width="1.75"/>
    <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor"/>
    <path d="M7 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
  `,
  receive: `
    <path d="M12 4v10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M8 10l4 4 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 18h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
  `,
  send: `
    <path d="M12 20V10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M8 14l4-4 4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 6h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
  `,
  back: `
    <path d="M14 6L8 12l6 6" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 12h10" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>
  `,
  compass: `
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/>
    <polygon points="12,5 14.5,12 12,19 9.5,12" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>
  `,
  globe: `
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/>
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" stroke-width="1.5" opacity=".75"/>
    <path d="M3 12h18M5.5 7h13M5.5 17h13" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" opacity=".55"/>
  `,
  friends: `
    <circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.75"/>
    <path d="M4 19c0-2.8 2.2-5 5-5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <circle cx="16.5" cy="10" r="2.5" stroke="currentColor" stroke-width="1.75"/>
    <path d="M13 19c0-2.2 1.8-4.5 4.5-4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
  `,
  trophy: `
    <path d="M8 5h8v3a4 4 0 0 1-8 0V5z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <path d="M8 5H6a2 2 0 0 0 0 4h2M16 5h2a2 2 0 0 1 0 4h-2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M12 12v3M9 19h6M10 15h4v4H10v-4z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
  `,
  chest: `
    <rect x="4" y="10" width="16" height="9" rx="2" stroke="currentColor" stroke-width="1.75"/>
    <path d="M4 13h16" stroke="currentColor" stroke-width="1.75"/>
    <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <rect x="10.5" y="13.5" width="3" height="3" rx=".8" fill="currentColor" opacity=".85"/>
  `,
  settings: `
    <circle cx="12" cy="12" r="2.75" stroke="currentColor" stroke-width="1.75"/>
    <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.55 1.55M16.85 16.85l1.55 1.55M5.6 18.4l1.55-1.55M16.85 7.15l1.55-1.55" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/>
  `,
  check: `
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/>
    <path d="M8 12.2l2.6 2.6L16.5 9" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  error: `
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/>
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>
  `,
  location: `
    <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <circle cx="12" cy="11" r="2.2" fill="currentColor"/>
  `,
  locationOff: `
    <path d="M12 21s6-5.1 6-10a6 6 0 0 0-9.3-5" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <circle cx="12" cy="11" r="2.2" stroke="currentColor" stroke-width="1.75"/>
    <path d="M4 4l16 16" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>
  `,
  add: `
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/>
    <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>
  `,
  remove: `
    <path d="M9 9h6l-.8 10.5H9.8L9 9z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <path d="M7 9h10M10 6h4a1 1 0 0 1 1 1v1H9V7a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <path d="M10.5 12v5M13.5 12v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".75"/>
  `,
  close: `
    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>
  `,
  medalGold: `
    <circle cx="12" cy="13" r="6" fill="#FBBF24" stroke="#F59E0B" stroke-width="1.2"/>
    <path d="M9.5 7.5L12 4l2.5 3.5" stroke="#F59E0B" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
    <path d="M10 13.5l1.5 1.5 3-3" stroke="#78350F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  medalSilver: `
    <circle cx="12" cy="13" r="6" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1.2"/>
    <path d="M9.5 7.5L12 4l2.5 3.5" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
    <path d="M10 13.5l1.5 1.5 3-3" stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  medalBronze: `
    <circle cx="12" cy="13" r="6" fill="#D97706" stroke="#B45309" stroke-width="1.2"/>
    <path d="M9.5 7.5L12 4l2.5 3.5" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
    <path d="M10 13.5l1.5 1.5 3-3" stroke="#78350F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  ticket: `
    <path d="M5 8h14v3a2 2 0 0 0 0 4v3H5v-3a2 2 0 0 0 0-4V8z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <path d="M12 8v8" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2" opacity=".7"/>
  `,
  coin: `
    <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.75"/>
    <path d="M12 7v10M9 9.5h4a2 2 0 0 1 0 3h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  `,
  gift: `
    <rect x="4" y="11" width="16" height="9" rx="1.5" stroke="currentColor" stroke-width="1.75"/>
    <path d="M12 11v9M4 15h16" stroke="currentColor" stroke-width="1.75"/>
    <path d="M12 11c-2-2.5-5-2-5 .5S10 11 12 11zM12 11c2-2.5 5-2 5 .5S14 11 12 11z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  `,
  cards: `
    <rect x="5" y="7" width="11" height="14" rx="2" stroke="currentColor" stroke-width="1.75"/>
    <rect x="8" y="5" width="11" height="14" rx="2" stroke="currentColor" stroke-width="1.75" opacity=".65"/>
    <path d="M10 12h6M10 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".75"/>
  `,
  login: `
    <rect x="4" y="10" width="16" height="10" rx="2.5" stroke="currentColor" stroke-width="1.75"/>
    <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
    <path d="M12 16.5v1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  `,
};

const PANEL_ICON_MAP = {
  Profile: 'profile',
  Bag: 'bag',
  'Adventure Bag': 'bag',
  'Solana Wallet': 'wallet',
  'CBS-GO Wallet': 'wallet',
  Leaderboard: 'trophy',
  Friends: 'friends',
};

/**
 * @param {string} name
 * @param {number} [size]
 * @param {{ className?: string, title?: string }} [opts]
 */
export function icon(name, size = 24, opts = {}) {
  const paths = ICON_PATHS[name];
  if (!paths) return '';

  const cls = opts.className ? ` class="${opts.className}"` : '';
  const title = opts.title ? `<title>${opts.title}</title>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"${cls} aria-hidden="${opts.title ? 'false' : 'true'}">${title}${paths}</svg>`;
}

export function panelIconForTitle(title) {
  const key = PANEL_ICON_MAP[title] || 'compass';
  return icon(key, 20, { className: 'cbsgo-icon cbsgo-icon--panel' });
}

/** Avatar placeholder when no photo is set. */
export function avatarFallbackHtml(size = 32) {
  return `<span class="cbsgo-avatar-fallback" style="width:${size}px;height:${size}px;">${icon('profile', Math.round(size * 0.55), { className: 'cbsgo-icon' })}</span>`;
}

export function medalIcon(rankIdx, size = 22) {
  if (rankIdx === 0) return icon('medalGold', size, { className: 'cbsgo-icon cbsgo-medal' });
  if (rankIdx === 1) return icon('medalSilver', size, { className: 'cbsgo-icon cbsgo-medal' });
  if (rankIdx === 2) return icon('medalBronze', size, { className: 'cbsgo-icon cbsgo-medal' });
  return '';
}
