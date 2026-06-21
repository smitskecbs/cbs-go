// Lightweight CBS-GO game toast (orange/gold card, auto-dismiss).

import { icon } from './gameIcons.js';

let showTimer = null;
let hideTimer = null;
let listenerBound = false;

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function iconForVariant(variant, iconName) {
  if (iconName) return icon(iconName, 20, { className: 'cbsgo-icon' });
  if (variant === 'error') return icon('error', 20, { className: 'cbsgo-icon' });
  if (variant === 'info') return icon('friends', 20, { className: 'cbsgo-icon' });
  return icon('trophy', 20, { className: 'cbsgo-icon' });
}

/**
 * @param {string} text
 * @param {{ variant?: 'success'|'error'|'info', ms?: number, iconName?: string }} [options]
 */
export function showGameToast(text, options = {}) {
  const msg = String(text || '').trim();
  if (!msg) return;

  const host = document.getElementById('cbsgoToastHost');
  if (!host) return;

  const variant = options.variant || 'success';
  const ms = Number(options.ms) > 0 ? Number(options.ms) : 3200;

  try {
    if (showTimer) clearTimeout(showTimer);
    if (hideTimer) clearTimeout(hideTimer);
  } catch {}

  host.innerHTML = `
    <div class="cbsgo-game-toast cbsgo-game-toast--${variant}" role="status" aria-live="polite">
      <div class="cbsgo-game-toast__icon">${iconForVariant(variant, options.iconName)}</div>
      <div class="cbsgo-game-toast__text">${esc(msg)}</div>
    </div>
  `;

  const el = host.firstElementChild;
  requestAnimationFrame(() => {
    el?.classList.add('cbsgo-game-toast--visible');
  });

  hideTimer = setTimeout(() => {
    el?.classList.remove('cbsgo-game-toast--visible');
    showTimer = setTimeout(() => {
      if (host.firstElementChild === el) host.innerHTML = '';
    }, 280);
  }, ms);
}

/** Map sendFriendRequest errors to friendly English toast copy. */
export function friendSendToastFromError(err) {
  const raw = String(err?.message || err || '');
  const lower = raw.toLowerCase();

  if (lower.includes('already friends')) {
    return { text: 'You are already friends.', variant: 'info' };
  }
  if (lower.includes('already exists') || lower.includes('pending')) {
    return { text: 'Friend request already pending.', variant: 'info' };
  }
  if (lower.includes('cannot add yourself')) {
    return { text: 'You cannot add yourself as a friend.', variant: 'info' };
  }

  return { text: 'Could not send friend request. Please try again.', variant: 'error' };
}

export function initGameToastListener() {
  if (listenerBound || typeof window === 'undefined') return;
  listenerBound = true;

  window.addEventListener('cbsgo:toast', (ev) => {
    const detail = ev?.detail || {};
    let text = String(detail.text || '').trim();
    if (!text) return;

    let variant = detail.variant;
    if (!variant) {
      if (text.startsWith('⛔')) variant = 'error';
      else if (text.startsWith('✅')) variant = 'success';
      else variant = 'info';
    }

    text = text.replace(/^✅\s*/, '').replace(/^⛔\s*/, '');
    showGameToast(text, { variant, ms: detail.ms, iconName: detail.iconName });
  });
}
