export function isDev() {
  try {
    return new URLSearchParams(window.location.search).get('dev') === '1';
  } catch {
    return false;
  }
}

// This name must match the import in appShell.js
export function hardResetCBSGO() {
  // Remove ALL cbsgo_* keys from localStorage and sessionStorage
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('cbsgo_')) keys.push(k);
    }
    keys.forEach(k => localStorage.removeItem(k));
  } catch {}

  try {
    const keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && k.startsWith('cbsgo_')) keys.push(k);
    }
    keys.forEach(k => sessionStorage.removeItem(k));
  } catch {}

  window.location.reload();
}
