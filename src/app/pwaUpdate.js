// PWA update orchestration — single Workbox path via virtual:pwa-register in main.js.

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
let updateBannerShown = false;

const STALE_CACHE_RE = /workbox|precache|cbs-go|runtime|pwa/i;

/** Remove old Workbox / runtime caches that can pin stale hashed bundles. */
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

  let swRemoved = 0;
  let cachesRemoved = 0;

  try {
    swRemoved = await unregisterAllServiceWorkers();
    console.info(`CBS-GO: unregistered ${swRemoved} service worker(s)`);
  } catch (e) {
    console.warn('CBS-GO: force update SW cleanup failed', e);
  }

  try {
    cachesRemoved = await purgeWorkboxCaches();
    console.info(`CBS-GO: cleared ${cachesRemoved} cache(s) before force reload`);
  } catch (e) {
    console.warn('CBS-GO: force update cache purge failed', e);
  }

  try {
    sessionStorage.setItem(FORCE_UPDATE_GUARD, String(Date.now()));
  } catch {}

  const url = new URL(window.location.href);
  url.searchParams.set('refresh', String(Date.now()));
  window.location.replace(url.toString());

  return { ok: true, swRemoved, cachesRemoved };
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

  console.info('CBS-GO: update available', { source, version: CBSGO_APP_VERSION });

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

  console.info('CBS-GO: refresh recommended', info);

  showAppUpdatedNotice({
    onRefresh: () => applyPwaUpdate(updateSWFn),
    onDismiss: () => markAppVersionSeen(),
    onCheckUpdate: () => checkForSwUpdate(true),
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

    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) {
        openUpdateBanner('installed');
      }
    });
  });
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
    } catch {}
  }

  if (!registration) {
    if (manual) setUpdateNoticeStatus('No service worker registered yet.');
    return { ok: false, reason: 'no-registration' };
  }

  try {
    await registration.update();
  } catch (e) {
    console.warn('CBS-GO: serviceWorker.update failed', e);
    if (manual) setUpdateNoticeStatus('Update check failed. Try again in a moment.');
    return { ok: false, error: e };
  }

  if (registration.waiting && navigator.serviceWorker.controller) {
    openUpdateBanner(manual ? 'manual-check' : 'update-check');
    if (manual) setUpdateNoticeStatus('Update available — tap Update now.');
    return { ok: true, waiting: true };
  }

  if (manual) {
    setUpdateNoticeStatus('You are on the latest cached build. Refresh if UI still looks old.');
  }

  return { ok: true, waiting: false };
}

/** Apply update: purge stale caches, activate waiting SW, reload. */
export async function applyPwaUpdate(updateSW = updateSWFn) {
  if (reloadRequested) return;
  reloadRequested = true;

  markAppVersionSeen();
  dismissUpdateNotices();

  try {
    const removed = await purgeWorkboxCaches();
    if (removed) console.info(`CBS-GO: cleared ${removed} cache(s) before reload`);
  } catch (e) {
    console.warn('CBS-GO: cache purge before update failed', e);
  }

  try {
    sessionStorage.setItem(SW_RELOAD_GUARD, '1');
  } catch {}

  if (typeof updateSW === 'function') {
    updateSW(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    window.location.reload();
  }
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

export async function initPwaUpdates() {
  console.info(`CBS-GO version: ${CBSGO_APP_VERSION}`);

  await cleanupStalePwaCachesIfNeeded();

  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
    setupVersionFallbackNotice();
    return;
  }

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
        },
        onRegisteredSW(_swUrl, registration) {
          wireRegistration(registration);
          registration?.update().catch(() => {});
        },
        onOfflineReady() {},
      });

      // Boot-time update checks (SW fetch can be lazy on cold start).
      setTimeout(() => checkForSwUpdate(false), 400);
      setTimeout(() => checkForSwUpdate(false), 3500);
    })
    .catch((e) => {
      console.warn('CBS-GO: PWA register unavailable', e);
      setupVersionFallbackNotice();
    });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkForSwUpdate(false);
    }
  });

  navigator.serviceWorker?.addEventListener('controllerchange', () => {
    if (reloadRequested) return;
    try {
      if (sessionStorage.getItem(SW_RELOAD_GUARD)) {
        window.location.reload();
      }
    } catch {}
  });

  setupVersionFallbackNotice();
}
