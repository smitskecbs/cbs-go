// PWA install prompt — Android/Chrome deferred prompt + iOS Safari instructions.

import { icon } from './gameIcons.js';
import { isStandalonePwa } from '../app/pwaUpdate.js';
import { showGameToast } from './gameToast.js';

const INSTALL_MODAL_ID = 'cbsgoInstallPrompt';
const DISMISS_KEY = 'cbsgo_install_prompt_dismissed';
const INSTALL_INTENT_KEY = 'cbsgo_install_intent';

let deferredPrompt = null;
let installModalShown = false;
let explicitInstallIntent = false;

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

/** True when user arrived via ?install=1 (main site CTA). */
export function hasExplicitInstallIntent() {
  if (explicitInstallIntent) return true;
  try {
    return sessionStorage.getItem(INSTALL_INTENT_KEY) === '1';
  } catch {
    return false;
  }
}

function setExplicitInstallIntent(active) {
  explicitInstallIntent = !!active;
  try {
    if (active) sessionStorage.setItem(INSTALL_INTENT_KEY, '1');
    else sessionStorage.removeItem(INSTALL_INTENT_KEY);
  } catch {}
}

function clearExplicitInstallIntent() {
  setExplicitInstallIntent(false);
}

function shouldBypassDismissal({ manual = false, fromIntent = false } = {}) {
  return manual || fromIntent || hasExplicitInstallIntent();
}

/**
 * Capture ?install=1 from main site and clean the visible URL.
 * @returns {boolean}
 */
export function captureInstallIntentFromUrl() {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('install') !== '1') return false;

    setExplicitInstallIntent(true);
    console.info('[CBSGO install] explicit install intent from URL');

    url.searchParams.delete('install');
    const next = `${url.pathname}${url.search}${url.hash}` || '/';
    window.history.replaceState({}, '', next);

    return true;
  } catch (e) {
    console.warn('[CBSGO install] capture install intent failed', e);
    return false;
  }
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

function showAlreadyInstalledToast() {
  const host = document.getElementById('cbsgoToastHost');
  if (host) {
    showGameToast('CBS-GO is already installed.', {
      variant: 'info',
      iconName: 'compass',
      ms: 3600,
    });
    return;
  }

  setTimeout(() => {
    if (document.getElementById('cbsgoToastHost')) {
      showGameToast('CBS-GO is already installed.', {
        variant: 'info',
        iconName: 'compass',
        ms: 3600,
      });
    }
  }, 2500);
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

export function showInstallFallbackModal({ fromIntent = false } = {}) {
  if (isStandalonePwa()) return { ok: false, reason: 'standalone' };
  if (installModalShown) return { ok: false, reason: 'already-shown' };
  if (!fromIntent && !hasExplicitInstallIntent() && isInstallPromptDismissed()) {
    return { ok: false, reason: 'dismissed' };
  }
  if (isBlockingModalActive()) return { ok: false, reason: 'blocked' };

  const bypass = shouldBypassDismissal({ fromIntent });

  mountInstallModal({
    title: 'Install CBS-GO',
    text: 'Use your browser menu and choose Add to Home Screen.',
    primaryLabel: 'Got it',
    secondaryLabel: bypass ? 'Not now' : '',
    onPrimary: () => {
      if (!bypass) markInstallPromptDismissed();
      if (fromIntent || hasExplicitInstallIntent()) clearExplicitInstallIntent();
      removeInstallModal();
    },
    onSecondary: () => {
      if (!bypass) markInstallPromptDismissed();
      if (fromIntent || hasExplicitInstallIntent()) clearExplicitInstallIntent();
      removeInstallModal();
    },
  });

  return { ok: true };
}

export function showAndroidInstallPrompt({ manual = false, fromIntent = false } = {}) {
  if (isStandalonePwa()) return { ok: false, reason: 'standalone' };
  const bypass = shouldBypassDismissal({ manual, fromIntent });
  if (!bypass && isInstallPromptDismissed()) return { ok: false, reason: 'dismissed' };
  if (isBlockingModalActive()) return { ok: false, reason: 'blocked' };
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
        clearExplicitInstallIntent();
        if (!bypass && choice?.outcome === 'dismissed') {
          markInstallPromptDismissed();
        }
      } catch (e) {
        console.warn('[CBSGO install] deferred prompt failed', e);
        removeInstallModal();
      }
    },
    onSecondary: () => {
      if (!bypass) markInstallPromptDismissed();
      if (fromIntent || hasExplicitInstallIntent()) clearExplicitInstallIntent();
      removeInstallModal();
    },
  });

  return { ok: true };
}

export function showIosInstallInstructions({ manual = false, fromIntent = false } = {}) {
  if (isStandalonePwa()) return { ok: false, reason: 'standalone' };
  if (!isIosHomeScreenCapable()) return { ok: false, reason: 'not-ios' };
  const bypass = shouldBypassDismissal({ manual, fromIntent });
  if (!bypass && isInstallPromptDismissed()) return { ok: false, reason: 'dismissed' };
  if (isBlockingModalActive()) return { ok: false, reason: 'blocked' };
  if (installModalShown) return { ok: false, reason: 'already-shown' };

  mountInstallModal({
    title: 'Install CBS-GO',
    text: 'To install CBS-GO, tap the Share button in Safari and choose Add to Home Screen.',
    primaryLabel: 'Got it',
    secondaryLabel: bypass ? 'Not now' : '',
    onPrimary: () => {
      if (!bypass) markInstallPromptDismissed();
      if (fromIntent || hasExplicitInstallIntent()) clearExplicitInstallIntent();
      removeInstallModal();
    },
    onSecondary: () => {
      if (!bypass) markInstallPromptDismissed();
      if (fromIntent || hasExplicitInstallIntent()) clearExplicitInstallIntent();
      removeInstallModal();
    },
  });

  return { ok: true };
}

function tryAutoShowInstallPrompt() {
  if (isStandalonePwa() || installModalShown) return false;
  if (!shouldBypassDismissal() && isInstallPromptDismissed()) return false;
  if (isBlockingModalActive()) return false;

  if (isIosHomeScreenCapable()) {
    return showIosInstallInstructions({ manual: false }).ok;
  }

  if (deferredPrompt) {
    return showAndroidInstallPrompt({ manual: false }).ok;
  }

  return false;
}

function tryShowExplicitInstallPrompt() {
  if (!hasExplicitInstallIntent()) return false;
  if (isStandalonePwa()) {
    showAlreadyInstalledToast();
    clearExplicitInstallIntent();
    return true;
  }
  if (isBlockingModalActive() || installModalShown) return false;

  if (isIosHomeScreenCapable()) {
    return showIosInstallInstructions({ manual: true, fromIntent: true }).ok;
  }

  if (deferredPrompt) {
    return showAndroidInstallPrompt({ manual: true, fromIntent: true }).ok;
  }

  return false;
}

let explicitInstallSchedulerRunning = false;

/** Wait for blockers / beforeinstallprompt, then show install UI for ?install=1. */
export function scheduleExplicitInstallIntentFlow() {
  if (!hasExplicitInstallIntent()) return;
  if (explicitInstallSchedulerRunning) return;
  explicitInstallSchedulerRunning = true;

  if (isStandalonePwa()) {
    showAlreadyInstalledToast();
    clearExplicitInstallIntent();
    explicitInstallSchedulerRunning = false;
    return;
  }

  let attempts = 0;
  const maxAttempts = 80;

  const tick = () => {
    attempts += 1;

    if (!hasExplicitInstallIntent()) {
      explicitInstallSchedulerRunning = false;
      return;
    }

    if (isStandalonePwa()) {
      showAlreadyInstalledToast();
      clearExplicitInstallIntent();
      explicitInstallSchedulerRunning = false;
      return;
    }

    if (tryShowExplicitInstallPrompt()) {
      explicitInstallSchedulerRunning = false;
      return;
    }

    if (!isBlockingModalActive() && !installModalShown && !isIosHomeScreenCapable() && !deferredPrompt) {
      if (attempts >= maxAttempts) {
        showInstallFallbackModal({ fromIntent: true });
        explicitInstallSchedulerRunning = false;
        return;
      }
    }

    if (attempts < maxAttempts) {
      setTimeout(tick, 500);
      return;
    }

    if (!isStandalonePwa() && !installModalShown) {
      showInstallFallbackModal({ fromIntent: true });
    }
    explicitInstallSchedulerRunning = false;
  };

  setTimeout(tick, 800);
}

/** Wait until login/onboarding/intro/update modals are gone, then show install UI once. */
export function scheduleInstallPromptIfNeeded() {
  if (hasExplicitInstallIntent()) {
    scheduleExplicitInstallIntentFlow();
    return;
  }

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

  captureInstallIntentFromUrl();

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.info('[CBSGO install] beforeinstallprompt captured');

    if (installModalShown || isBlockingModalActive()) return;

    if (hasExplicitInstallIntent()) {
      tryShowExplicitInstallPrompt();
      return;
    }

    if (!isInstallPromptDismissed()) {
      tryAutoShowInstallPrompt();
    }
  });

  window.addEventListener('appinstalled', () => {
    console.info('[CBSGO install] app installed');
    deferredPrompt = null;
    clearExplicitInstallIntent();
    removeInstallModal();
  });

  if (hasExplicitInstallIntent()) {
    scheduleExplicitInstallIntentFlow();
  }
}
