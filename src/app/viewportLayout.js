// Mobile browser viewport insets (address bar) — keeps bottom HUD visible.

import { isStandalonePwa } from './pwaUpdate.js';

function syncBrowserBottomInset() {
  const root = document.documentElement;

  if (isStandalonePwa()) {
    root.classList.remove('cbsgo-browser-mode');
    root.style.setProperty('--cbsgo-browser-bottom', '0px');
    return;
  }

  root.classList.add('cbsgo-browser-mode');

  const vv = window.visualViewport;
  if (!vv) {
    root.style.setProperty('--cbsgo-browser-bottom', '12px');
    return;
  }

  const inset = Math.max(12, Math.round(window.innerHeight - vv.height - vv.offsetTop));
  root.style.setProperty('--cbsgo-browser-bottom', `${inset}px`);
}

/** Track visual viewport so fixed bottom UI clears the mobile browser chrome. */
export function initViewportLayout() {
  if (typeof window === 'undefined') return;

  syncBrowserBottomInset();

  window.visualViewport?.addEventListener('resize', syncBrowserBottomInset);
  window.visualViewport?.addEventListener('scroll', syncBrowserBottomInset);
  window.addEventListener('resize', syncBrowserBottomInset);
  window.addEventListener('orientationchange', syncBrowserBottomInset);
}
