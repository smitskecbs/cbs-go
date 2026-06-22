// PWA install prompt — Android/Chrome deferred prompt + iOS Safari instructions.

import { icon } from './gameIcons.js';
import { isStandalonePwa } from '../app/pwaUpdate.js';

const INSTALL_MODAL_ID = 'cbsgoInstallPrompt';
const DISMISS_KEY = 'cbsgo_install_prompt_dismissed';

let deferredPrompt = null;
let installModalShown = false;

export function isInstallPromptDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function markInstallPromptDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, '1');
  } catch {}
}

export function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

/** iOS browsers that install via Share → Add to Home Screen (no beforeinstallprompt). */
export function isIosHomeScreenCapable() {
  return isIosDevice() && !isStandalonePwa();
}

export function hasDeferredInstallPrompt() {
  return !!deferredPrompt;
}

export function isUpdateModalActive() {
  return !!document.getElementById('cbsgoRequiredUpdateNotice');
}

export function isBlockingModalActive() {
  return (
    isUpdateModalActive() ||
    !!document.getElementById('cbsgoProfileOnboarding') ||
    !!document.getElementById('cbsgoGameIntroModal') ||
    !!document.getElementById('cbsgoLoginWrap')
  );
}

function removeInstallModal() {
  const el = document.getElementById(INSTALL_MODAL_ID);
  if (el) el.remove();
  installModalShown = false;
}

function setProfileInstallMessage(text) {
  const el = document.getElementById('cbsgoInstallAppMsg');
  if (el) el.textContent = text || '';
}

function mountInstallModal({ title, text, primaryLabel, secondaryLabel, onPrimary, onSecondary }) {
  removeInstallModal();
  installModalShown = true;

  const secondaryHtml = secondaryLabel
    ? `<button type="button" class="cbsgo-btn-secondary cbsgo-install-card__secondary">${secondaryLabel}</button>`
    : '';

  const wrap = document.createElement('div');
  wrap.id = INSTALL_MODAL_ID;
  wrap.className = 'cbsgo-install-backdrop';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-modal', 'true');

  wrap.innerHTML = `
    <div class="cbsgo-install-card">
      <div class="cbsgo-install-card__glow" aria-hidden="true"></div>
      <div class="cbsgo-install-card__icon">${icon('compass', 28, { className: 'cbsgo-icon' })}</div>
      <h2 class="cbsgo-install-card__title">${title}</h2>
      <p class="cbsgo-install-card__text">${text}</p>
      <div class="cbsgo-install-card__actions">
        <button type="button" class="cbsgo-btn-primary cbsgo-install-card__primary">${primaryLabel}</button>
        ${secondaryHtml}
      </div>
    </div>
  `;

  wrap.querySelector('.cbsgo-install-card__primary')?.addEventListener('click', () => {
    if (typeof onPrimary === 'function') onPrimary();
  });

  wrap.querySelector('.cbsgo-install-card__secondary')?.addEventListener('click', () => {
    if (typeof onSecondary === 'function') onSecondary();
  });

  document.body.appendChild(wrap);
}

export function showAndroidInstallPrompt({ manual = false } = {}) {
  if (isStandalonePwa()) return { ok: false, reason: 'standalone' };
  if (!manual && isInstallPromptDismissed()) return { ok: false, reason: 'dismissed' };
  if (!manual && isBlockingModalActive()) return { ok: false, reason: 'blocked' };
  if (installModalShown) return { ok: false, reason: 'already-shown' };
  if (!deferredPrompt) return { ok: false, reason: 'no-prompt' };

  mountInstallModal({
    title: 'Install CBS-GO',
    text: 'Add CBS-GO to your home screen for the best game experience.',
    primaryLabel: 'Install app',
    secondaryLabel: 'Not now',
    onPrimary: async () => {
      const prompt = deferredPrompt;
      if (!prompt) {
        removeInstallModal();
        return;
      }

      try {
        await prompt.prompt();
        const choice = await prompt.userChoice;
        console.info('[CBSGO install] user choice', { outcome: choice?.outcome });
        deferredPrompt = null;
        removeInstallModal();
        if (choice?.outcome === 'dismissed') {
          markInstallPromptDismissed();
        }
      } catch (e) {
        console.warn('[CBSGO install] deferred prompt failed', e);
        removeInstallModal();
      }
    },
    onSecondary: () => {
      markInstallPromptDismissed();
      removeInstallModal();
    },
  });

  return { ok: true };
}

export function showIosInstallInstructions({ manual = false } = {}) {
  if (isStandalonePwa()) return { ok: false, reason: 'standalone' };
  if (!isIosHomeScreenCapable()) return { ok: false, reason: 'not-ios' };
  if (!manual && isInstallPromptDismissed()) return { ok: false, reason: 'dismissed' };
  if (!manual && isBlockingModalActive()) return { ok: false, reason: 'blocked' };
  if (installModalShown) return { ok: false, reason: 'already-shown' };

  mountInstallModal({
    title: 'Install CBS-GO',
    text: 'To install CBS-GO, tap the Share button in Safari and choose Add to Home Screen.',
    primaryLabel: 'Got it',
    secondaryLabel: manual ? 'Not now' : '',
    onPrimary: () => {
      if (!manual) markInstallPromptDismissed();
      removeInstallModal();
    },
    onSecondary: () => {
      markInstallPromptDismissed();
      removeInstallModal();
    },
  });

  return { ok: true };
}

function tryAutoShowInstallPrompt() {
  if (isStandalonePwa() || isInstallPromptDismissed() || installModalShown) return false;
  if (isBlockingModalActive()) return false;

  if (isIosHomeScreenCapable()) {
    return showIosInstallInstructions({ manual: false }).ok;
  }

  if (deferredPrompt) {
    return showAndroidInstallPrompt({ manual: false }).ok;
  }

  return false;
}

/** Wait until login/onboarding/intro/update modals are gone, then show install UI once. */
export function scheduleInstallPromptIfNeeded() {
  if (isStandalonePwa() || isInstallPromptDismissed()) return;

  let attempts = 0;
  const maxAttempts = 64;

  const tick = () => {
    attempts += 1;
    if (isStandalonePwa() || isInstallPromptDismissed()) return;

    if (tryAutoShowInstallPrompt()) return;

    if (attempts < maxAttempts) {
      setTimeout(tick, 500);
    }
  };

  setTimeout(tick, 1200);
}

/** Profile → Install CBS-GO button. */
export function handleManualInstall() {
  setProfileInstallMessage('');

  if (isStandalonePwa()) {
    setProfileInstallMessage('CBS-GO is already installed.');
    return;
  }

  if (deferredPrompt) {
    const result = showAndroidInstallPrompt({ manual: true });
    if (!result.ok && result.reason === 'already-shown') {
      setProfileInstallMessage('Install prompt is already open.');
    }
    return;
  }

  if (isIosHomeScreenCapable()) {
    showIosInstallInstructions({ manual: true });
    return;
  }

  setProfileInstallMessage('Use your browser menu and choose Add to Home Screen.');
}

/** Capture Chrome/Android deferred install prompt early. */
export function initInstallPrompt() {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.info('[CBSGO install] beforeinstallprompt captured');

    if (!isInstallPromptDismissed() && !isBlockingModalActive() && !installModalShown) {
      tryAutoShowInstallPrompt();
    }
  });

  window.addEventListener('appinstalled', () => {
    console.info('[CBSGO install] app installed');
    deferredPrompt = null;
    removeInstallModal();
  });
}
