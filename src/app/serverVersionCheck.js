// Hard server version check — works even when an old JS bundle is running in an installed PWA.

import { CBSGO_APP_VERSION } from './appVersion.js';
import { showRequiredUpdateModal } from '../ui/updateNotice.js';

let serverVersion = '';
let serverVersionStatus = 'checking';
let requiredModalShown = false;
let checkInFlight = false;

function versionJsonUrl() {
  const base = import.meta.env.BASE_URL || '/';
  const originBase = typeof window !== 'undefined' ? window.location.origin : '';
  return new URL(`version.json?t=${Date.now()}`, `${originBase}${base}`).href;
}

function normalizeVersion(value) {
  return String(value || '').trim();
}

function updateProfileServerVersionDisplay() {
  const el = document.getElementById('cbsgoProfileServerVersion');
  if (!el) return;

  if (serverVersionStatus === 'checking') {
    el.textContent = 'Checking…';
  } else if (serverVersion) {
    el.textContent = serverVersion;
  } else {
    el.textContent = 'Unavailable';
  }
}

export function getServerVersionInfo() {
  return {
    serverVersion: serverVersion || null,
    serverVersionStatus,
    localVersion: CBSGO_APP_VERSION,
    mismatch:
      !!serverVersion &&
      serverVersionStatus === 'mismatch' &&
      serverVersion !== CBSGO_APP_VERSION,
  };
}

/**
 * Fetch /version.json bypassing HTTP and SW caches.
 * @returns {Promise<string|null>}
 */
export async function fetchServerVersion() {
  const url = versionJsonUrl();
  console.info('[CBSGO version] fetching server version', { url, local: CBSGO_APP_VERSION });

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.warn('[CBSGO version] fetch failed', { status: res.status, url });
      return null;
    }

    const data = await res.json();
    const version = normalizeVersion(data?.version);
    if (!version) {
      console.warn('[CBSGO version] missing version field', data);
      return null;
    }

    console.info('[CBSGO version] server version', {
      local: CBSGO_APP_VERSION,
      server: version,
      match: version === CBSGO_APP_VERSION,
    });

    return version;
  } catch (e) {
    console.warn('[CBSGO version] fetch error', e);
    return null;
  }
}

function showRequiredUpdateIfNeeded() {
  if (requiredModalShown) return;
  if (!serverVersion || serverVersion === CBSGO_APP_VERSION) return;

  requiredModalShown = true;
  serverVersionStatus = 'mismatch';

  console.info('[CBSGO version] update required', {
    local: CBSGO_APP_VERSION,
    server: serverVersion,
  });

  showRequiredUpdateModal({
    localVersion: CBSGO_APP_VERSION,
    serverVersion,
    onUpdate: () => {
      import('./pwaUpdate.js')
        .then(({ executeForceAppUpdate }) => executeForceAppUpdate())
        .catch((e) => console.warn('[CBSGO version] force update failed', e));
    },
  });
}

/**
 * Compare local bundle version with server /version.json.
 * @param {string} [reason]
 */
export async function checkServerVersion(reason = 'boot') {
  if (checkInFlight) return getServerVersionInfo();
  checkInFlight = true;

  try {
    serverVersionStatus = 'checking';
    updateProfileServerVersionDisplay();

    const remote = await fetchServerVersion();
    if (!remote) {
      serverVersionStatus = 'unavailable';
      updateProfileServerVersionDisplay();
      return getServerVersionInfo();
    }

    serverVersion = remote;
    serverVersionStatus = remote === CBSGO_APP_VERSION ? 'ok' : 'mismatch';
    updateProfileServerVersionDisplay();

    if (remote !== CBSGO_APP_VERSION) {
      showRequiredUpdateIfNeeded();
    }

    return getServerVersionInfo();
  } finally {
    checkInFlight = false;
    console.info('[CBSGO version] check complete', { reason, ...getServerVersionInfo() });
  }
}

export function initServerVersionCheck() {
  checkServerVersion('init').catch(() => {});

  const recheck = () => {
    checkServerVersion('lifecycle').catch(() => {});
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') recheck();
  });
  window.addEventListener('focus', recheck);
  window.addEventListener('online', recheck);
}
