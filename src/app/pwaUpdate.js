// PWA update orchestration — single Workbox path via virtual:pwa-register in main.js.
// Primary production origin: https://go.cbs-coin.com (root scope /)

import {
  CBSGO_APP_VERSION,
  checkAppVersionNotice,
  markAppVersionSeen,
  getSeenAppVersion,
} from './appVersion.js';
import {
  showUpdateAvailable,
  showAppUpdatedNotice,
  dismissUpdateNotices,
  setUpdateNoticeStatus,
} from '../ui/updateNotice.js';

const SW_RELOAD_GUARD = 'cbsgo_sw_reload_guard';
const CACHE_CLEANUP_KEY = 'cbsgo_pwa_cache_cleanup';
const FORCE_UPDATE_GUARD = 'cbsgo_force_update_reload';

let updateSWFn = null;
let swRegistration = null;
let reloadRequested = false;
let reloadDone = false;
let updateBannerShown = false;

const STALE_CACHE_RE = /workbox|precache|cbs-go|cbsgo|runtime|pwa|vite|api-bypass/i;

/** Installed PWA / standalone (iOS + Android). */
export function isStandalonePwa() {
  try {
    if (window.matchMedia('(display-mode: standalone)').matches) return true;
    if (window.matchMedia('(display-mode: fullscreen)').matches) return true;
    if (navigator.standalone === true) return true;
  } catch {}
  return false;
}

/** Safe diagnostics for mobile installed app debugging (no secrets). */
export function logPwaDiagnostics(reason = 'boot') {
  const reg = swRegistration;
  let controllerName = '';
  try {
    const url = navigator.serviceWorker?.controller?.scriptURL || '';
    controllerName = url ? url.split('/').pop() : '';
  } catch {}

  console.info('[CBSGO PWA]', reason, {
    version: CBSGO_APP_VERSION,
    origin: typeof location !== 'undefined' ? location.origin : '',
    standalone: isStandalonePwa(),
    hasController: !!navigator.serviceWorker?.controller,
    controllerScript: controllerName || null,
    hasRegistration: !!reg,
    waiting: !!reg?.waiting,
    installing: !!reg?.installing,
    updateBannerShown,
    seenVersion: getSeenAppVersion(),
    updateStatus: getUpdateStatusLabel(),
  });
}

export function getUpdateStatusLabel() {
  if (updateBannerShown || swRegistration?.waiting) return 'Update ready';
  const seen = getSeenAppVersion();
  if (seen && seen !== CBSGO_APP_VERSION) return 'Update ready';
  return 'Up to date';
}

export function isPwaVersionStale() {
  const seen = getSeenAppVersion();
  if (!seen) return false;
  return seen !== CBSGO_APP_VERSION;
}

/** Fresh load URL at site root (go.cbs-coin.com). */
export function buildFreshWebUrl() {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://go.cbs-coin.com';
  return `${origin}/?refresh=${Date.now()}`;
}

/** Open latest web build in browser (useful when installed PWA is stuck). */
export function openFreshWebVersion() {
  const url = buildFreshWebUrl();
  console.info('[CBSGO PWA] open fresh web version', { url, standalone: isStandalonePwa() });
  if (isStandalonePwa()) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.replace(url);
  }
}

export function getPwaRuntimeInfo() {
  const standalone = isStandalonePwa();
  const seen = getSeenAppVersion();
  const stale = isPwaVersionStale();
  const unknown = !seen;
  const updateStatus = getUpdateStatusLabel();
  return {
    version: CBSGO_APP_VERSION,
    appMode: standalone ? 'Installed PWA' : 'Browser',
    updateStatus,
    isStale: stale,
    isUnknown: unknown,
    showStaleWarning: standalone && (unknown || stale || updateStatus === 'Update ready'),
  };
}

/** Remove Workbox / PWA caches that can pin stale hashed bundles. */
export async function purgeWorkboxCaches() {
  if (!('caches' in window)) return 0;

  const keys = await caches.keys();
  let removed = 0;

  for (const key of keys) {
    if (!STALE_CACHE_RE.test(key)) continue;
    try {
      if (await caches.delete(key)) removed += 1;
    } catch (e) {
      console.warn('CBS-GO: failed to delete cache', key, e);
    }
  }

  return removed;
}

/** Force-update only: clear every Cache Storage bucket for this origin. */
export async function purgeAllOriginCaches() {
  if (!('caches' in window)) return { removed: 0, keys: [] };

  const keys = await caches.keys();
  const removedKeys = [];

  for (const key of keys) {
    try {
      if (await caches.delete(key)) removedKeys.push(key);
    } catch (e) {
      console.warn('CBS-GO: failed to delete cache', key, e);
    }
  }

  return { removed: removedKeys.length, keys: removedKeys };
}

/**
 * Unregister all service workers for this origin.
 * @returns {Promise<number>}
 */
export async function unregisterAllServiceWorkers() {
  if (!('serviceWorker' in navigator)) return 0;

  let count = 0;
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const reg of regs) {
      try {
        if (await reg.unregister()) count += 1;
      } catch (e) {
        console.warn('CBS-GO: SW unregister failed', e);
      }
    }
  } catch (e) {
    console.warn('CBS-GO: getRegistrations failed', e);
  }

  return count;
}

/**
 * Force refresh cached app shell: unregister SW, purge caches, reload once.
 * Does not touch localStorage (wallet vault / profile keys stay).
 */
export async function executeForceAppUpdate() {
  if (reloadRequested) return { ok: false, reason: 'already-running' };
  reloadRequested = true;

  dismissUpdateNotices();
  logPwaDiagnostics('force-update-start');

  let cacheKeysBefore = [];
  try {
    if ('caches' in window) {
      cacheKeysBefore = await caches.keys();
      console.info('[CBSGO PWA] force update: caches before', cacheKeysBefore);
    }
  } catch {}

  let swRemoved = 0;
  let cachesRemoved = 0;
  let cacheKeys = [];

  try {
    swRemoved = await unregisterAllServiceWorkers();
    console.info('[CBSGO PWA] force update: unregistered service workers', { count: swRemoved });
  } catch (e) {
    console.warn('CBS-GO: force update SW cleanup failed', e);
  }

  try {
    const result = await purgeAllOriginCaches();
    cachesRemoved = result.removed;
    cacheKeys = result.keys;
    console.info('[CBSGO PWA] force update: cleared caches', {
      count: cachesRemoved,
      keys: cacheKeys,
      keysBefore: cacheKeysBefore,
    });
  } catch (e) {
    console.warn('CBS-GO: force update cache purge failed', e);
  }

  try {
    sessionStorage.setItem(FORCE_UPDATE_GUARD, String(Date.now()));
    sessionStorage.setItem(SW_RELOAD_GUARD, '1');
  } catch {}

  const refreshUrl = buildFreshWebUrl();
  console.info('[CBSGO PWA] force update: navigating to root refresh URL', { refreshUrl });
  window.location.replace(refreshUrl);

  return { ok: true, swRemoved, cachesRemoved, cacheKeys, cacheKeysBefore, refreshUrl };
}

/** Strip one-time ?refresh= param after force reload (avoids bookmarking / loops). */
export function consumeForceRefreshParam() {
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('refresh')) return;

    url.searchParams.delete('refresh');
    const next = `${url.pathname}${url.search}${url.hash}` || '/';
    window.history.replaceState({}, '', next);
    sessionStorage.removeItem(FORCE_UPDATE_GUARD);
    logPwaDiagnostics('force-refresh-consumed');
  } catch {}
}

/**
 * One-time stale cache cleanup when the running bundle version differs from the
 * last version this device acknowledged.
 */
export async function cleanupStalePwaCachesIfNeeded() {
  const seen = getSeenAppVersion();
  if (!seen || seen === CBSGO_APP_VERSION) return false;

  const lastCleanup = localStorage.getItem(CACHE_CLEANUP_KEY);
  if (lastCleanup === CBSGO_APP_VERSION) return false;

  const removed = await purgeWorkboxCaches();
  localStorage.setItem(CACHE_CLEANUP_KEY, CBSGO_APP_VERSION);
  console.info(`CBS-GO: purged ${removed} stale PWA cache(s) for ${CBSGO_APP_VERSION}`);
  return true;
}

function openUpdateBanner(source) {
  if (updateBannerShown) return;
  updateBannerShown = true;

  console.info('[CBSGO PWA] update notice shown', { source, version: CBSGO_APP_VERSION });
  logPwaDiagnostics(`update-banner-${source}`);

  showUpdateAvailable({
    onUpdate: () => applyPwaUpdate(),
    onLater: () => {
      updateBannerShown = false;
    },
    onCheckUpdate: () => checkForSwUpdate(true),
  });
}

function openVersionRefreshBanner(info) {
  if (
    document.getElementById('cbsgoUpdateNotice') ||
    document.getElementById('cbsgoVersionNotice')
  ) {
    return;
  }

  console.info('[CBSGO PWA] version refresh notice', info);
  logPwaDiagnostics('version-fallback-notice');

  showAppUpdatedNotice({
    onRefresh: () => applyPwaUpdate(updateSWFn),
    onDismiss: () => markAppVersionSeen(),
    onCheckUpdate: () => checkForSwUpdate(true),
  });
}

async function waitForWaitingWorker(registration, timeoutMs = 4000) {
  if (!registration) return null;
  if (registration.waiting) return registration.waiting;

  const installing = registration.installing;
  if (!installing) return null;

  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timer);
      installing.removeEventListener('statechange', onState);
      resolve(registration.waiting || null);
    };

    const onState = () => {
      if (installing.state === 'installed') finish();
    };

    installing.addEventListener('statechange', onState);
    const timer = setTimeout(finish, timeoutMs);
  });
}

function wireRegistration(registration) {
  if (!registration) return;
  swRegistration = registration;

  if (registration.waiting && navigator.serviceWorker.controller) {
    openUpdateBanner('waiting-on-load');
  }

  registration.addEventListener('updatefound', () => {
    const worker = registration.installing;
    if (!worker) return;

    console.info('[CBSGO PWA] service worker updatefound');

    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) {
        openUpdateBanner('installed');
      }
    });
  });

  logPwaDiagnostics('registration-wired');
}

function reloadOnceAfterUpdate() {
  if (reloadDone) return;
  reloadDone = true;

  try {
    sessionStorage.removeItem(SW_RELOAD_GUARD);
  } catch {}

  window.location.reload();
}

/**
 * Ask the browser to check for a new service worker.
 * @param {boolean} [manual]
 */
export async function checkForSwUpdate(manual = false) {
  if (manual) {
    setUpdateNoticeStatus('Checking for update…');
  }

  let registration = swRegistration;
  if (!registration && 'serviceWorker' in navigator) {
    try {
      registration = await navigator.serviceWorker.getRegistration();
      if (registration) swRegistration = registration;
    } catch {}
  }

  if (!registration) {
    if (manual) setUpdateNoticeStatus('No service worker registered yet.');
    logPwaDiagnostics(manual ? 'check-manual-no-reg' : 'check-no-reg');
    return { ok: false, reason: 'no-registration' };
  }

  try {
    await registration.update();
  } catch (e) {
    console.warn('CBS-GO: serviceWorker.update failed', e);
    if (manual) setUpdateNoticeStatus('Update check failed. Try again in a moment.');
    logPwaDiagnostics('check-update-failed');
    return { ok: false, error: e };
  }

  await waitForWaitingWorker(registration, manual ? 5000 : 3000);

  if (registration.waiting && navigator.serviceWorker.controller) {
    openUpdateBanner(manual ? 'manual-check' : 'update-check');
    if (manual) setUpdateNoticeStatus('Update available — tap Update now.');
    logPwaDiagnostics(manual ? 'check-manual-waiting' : 'check-waiting');
    return { ok: true, waiting: true };
  }

  if (manual) {
    setUpdateNoticeStatus('You are on the latest cached build. Use Force app update if UI still looks old.');
  }

  logPwaDiagnostics(manual ? 'check-manual-uptodate' : 'check-uptodate');
  return { ok: true, waiting: false };
}

/** Apply update: purge stale caches, activate waiting SW, reload once. */
export async function applyPwaUpdate(updateSW = updateSWFn) {
  if (reloadRequested) return;
  reloadRequested = true;

  markAppVersionSeen();
  dismissUpdateNotices();
  logPwaDiagnostics('apply-update-start');

  try {
    const removed = await purgeWorkboxCaches();
    if (removed) console.info(`[CBSGO PWA] cleared ${removed} cache(s) before reload`);
  } catch (e) {
    console.warn('CBS-GO: cache purge before update failed', e);
  }

  try {
    sessionStorage.setItem(SW_RELOAD_GUARD, '1');
  } catch {}

  let registration = swRegistration;
  if (!registration && 'serviceWorker' in navigator) {
    try {
      registration = await navigator.serviceWorker.getRegistration();
    } catch {}
  }

  const onControllerChange = () => {
    navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    reloadOnceAfterUpdate();
  };
  navigator.serviceWorker?.addEventListener('controllerchange', onControllerChange);

  let skipWaitingSent = false;
  if (registration?.waiting) {
    try {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      skipWaitingSent = true;
      console.info('[CBSGO PWA] SKIP_WAITING sent to waiting service worker');
    } catch (e) {
      console.warn('CBS-GO: SKIP_WAITING postMessage failed', e);
    }
  }

  if (!skipWaitingSent && typeof updateSW === 'function') {
    try {
      updateSW(true);
    } catch (e) {
      console.warn('CBS-GO: updateSW(true) failed', e);
    }
  }

  setTimeout(() => {
    try {
      if (sessionStorage.getItem(SW_RELOAD_GUARD)) {
        reloadOnceAfterUpdate();
      }
    } catch {}
  }, skipWaitingSent ? 4500 : 1200);
}

export function consumeSwReloadGuard() {
  try {
    if (sessionStorage.getItem(SW_RELOAD_GUARD)) {
      sessionStorage.removeItem(SW_RELOAD_GUARD);
    }
  } catch {}
}

function setupVersionFallbackNotice() {
  checkAppVersionNotice({
    onRefreshRecommended: (info) => openVersionRefreshBanner(info),
  });
}

function scheduleUpdateChecks() {
  const delays = isStandalonePwa()
    ? [0, 300, 1200, 3500, 8000, 15000]
    : [0, 400, 2000, 6000];

  delays.forEach((ms) => {
    setTimeout(() => {
      checkForSwUpdate(false).catch(() => {});
    }, ms);
  });
}

function bindUpdateLifecycleListeners() {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkForSwUpdate(false).catch(() => {});
      logPwaDiagnostics('visibility-visible');
    }
  });

  window.addEventListener('focus', () => {
    checkForSwUpdate(false).catch(() => {});
  });

  window.addEventListener('pageshow', (ev) => {
    checkForSwUpdate(false).catch(() => {});
    logPwaDiagnostics(ev.persisted ? 'pageshow-bfcache' : 'pageshow');
  });

  window.addEventListener('online', () => {
    checkForSwUpdate(false).catch(() => {});
    logPwaDiagnostics('online');
  });

  navigator.serviceWorker?.addEventListener('controllerchange', () => {
    if (reloadDone) return;
    if (!reloadRequested) return;
    try {
      if (sessionStorage.getItem(SW_RELOAD_GUARD)) {
        reloadOnceAfterUpdate();
      }
    } catch {}
  });
}

export async function initPwaUpdates() {
  logPwaDiagnostics('init');

  await cleanupStalePwaCachesIfNeeded();

  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
    setupVersionFallbackNotice();
    return;
  }

  bindUpdateLifecycleListeners();

  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      updateSWFn = registerSW({
        immediate: true,
        onNeedRefresh() {
          openUpdateBanner('onNeedRefresh');
        },
        onRegistered(registration) {
          wireRegistration(registration);
          registration?.update().catch(() => {});
          scheduleUpdateChecks();
        },
        onRegisteredSW(_swUrl, registration) {
          wireRegistration(registration);
          registration?.update().catch(() => {});
          scheduleUpdateChecks();
        },
        onOfflineReady() {},
      });
    })
    .catch((e) => {
      console.warn('CBS-GO: PWA register unavailable', e);
      setupVersionFallbackNotice();
    });

  setupVersionFallbackNotice();
}
