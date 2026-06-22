// App bundle version for one-time "refresh recommended" UX (service worker remains primary).

export const CBSGO_APP_VERSION = '1.2.2';

const STORAGE_KEY = 'cbsgo_seen_app_version';

export function getSeenAppVersion() {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function markAppVersionSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, CBSGO_APP_VERSION);
  } catch {}
}

/**
 * @param {{ onRefreshRecommended?: (info: { previous: string, current: string }) => void }} options
 */
export function checkAppVersionNotice(options = {}) {
  const seen = getSeenAppVersion();

  if (!seen) {
    markAppVersionSeen();
    return false;
  }

  if (seen === CBSGO_APP_VERSION) return false;

  options.onRefreshRecommended?.({ previous: seen, current: CBSGO_APP_VERSION });
  return true;
}
