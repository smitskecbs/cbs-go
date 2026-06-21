// src/main.js

// ✅ Buffer polyfill (moet bovenaan staan!)
import './bufferPolyfill.js';

import './style.css';
import { mountApp } from './ui/appShell.js';
import { CBSGO_APP_VERSION, checkAppVersionNotice, markAppVersionSeen } from './app/appVersion.js';
import { showUpdateAvailable, showAppUpdatedNotice } from './ui/updateNotice.js';

// ✅ MapLibre CSS
import 'maplibre-gl/dist/maplibre-gl.css';

// ✅ Email+PIN vault bootstrap (backup/recover)
import { bootstrapAuthWallet } from './app/bootstrapAuthWallet.js';
if (typeof window !== 'undefined') {
  window.bootstrapAuthWallet = bootstrapAuthWallet;
}

const SW_RELOAD_GUARD = 'cbsgo_sw_reload_guard';

// --- Mobile-friendly error HUD (so we can debug black screens on GitHub Pages) ---
function ensureHud() {
  let hud = document.getElementById('cbsgoHud');
  if (hud) return hud;

  hud = document.createElement('div');
  hud.id = 'cbsgoHud';
  hud.style.position = 'fixed';
  hud.style.left = '10px';
  hud.style.right = '10px';
  hud.style.bottom = '10px';
  hud.style.zIndex = '999999';
  hud.style.padding = '10px 12px';
  hud.style.borderRadius = '14px';
  hud.style.border = '1px solid rgba(255,255,255,.18)';
  hud.style.background = 'rgba(0,0,0,.55)';
  hud.style.backdropFilter = 'blur(10px)';
  hud.style.color = '#fff';
  hud.style.fontFamily = 'system-ui, sans-serif';
  hud.style.fontSize = '12px';
  hud.style.whiteSpace = 'pre-wrap';
  hud.style.display = 'none';
  document.body.appendChild(hud);
  return hud;
}

function showHud(msg) {
  const hud = ensureHud();
  hud.textContent = String(msg || '');
  hud.style.display = 'block';
}

window.addEventListener('error', (e) => {
  const where = e?.filename ? `${e.filename}:${e.lineno || 0}:${e.colno || 0}` : '';
  showHud(`❌ Error\n${e?.message || e}\n${where}`);
});

window.addEventListener('unhandledrejection', (e) => {
  showHud(`❌ Unhandled promise rejection\n${e?.reason?.message || e?.reason || e}`);
});

function setupVersionFallbackNotice() {
  checkAppVersionNotice({
    onRefreshRecommended: () => {
      if (document.getElementById('cbsgoUpdateNotice')) return;

      showAppUpdatedNotice({
        onRefresh: () => {
          markAppVersionSeen();
          try {
            sessionStorage.setItem(SW_RELOAD_GUARD, '1');
          } catch {}
          window.location.reload();
        },
        onDismiss: () => {
          markAppVersionSeen();
        },
      });
    },
  });
}

function setupPwaUpdates() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
    setupVersionFallbackNotice();
    return;
  }

  let updateSW = null;
  let reloadRequested = false;

  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      updateSW = registerSW({
        onNeedRefresh() {
          showUpdateAvailable({
            onUpdate: () => {
              if (reloadRequested || typeof updateSW !== 'function') return;
              reloadRequested = true;
              markAppVersionSeen();
              try {
                sessionStorage.setItem(SW_RELOAD_GUARD, '1');
              } catch {}
              updateSW(true);
            },
            onLater: () => {},
          });
        },
        onOfflineReady() {
          // optional: app is ready for offline use
        },
      });
    })
    .catch((e) => {
      console.warn('CBS-GO: PWA register unavailable', e);
      setupVersionFallbackNotice();
    });

  // Version fallback when no SW update prompt is visible yet.
  setupVersionFallbackNotice();
}

// --- Mount app safely ---
function boot() {
  try {
    const app = document.getElementById('app');
    if (!app) {
      showHud('❌ #app not found in index.html');
      return;
    }

    mountApp();
    setupPwaUpdates();

    if (import.meta.env.DEV) {
      console.info(`CBS-GO app version: ${CBSGO_APP_VERSION}`);
    }

    // tiny success ping (hidden after 1s)
    const hud = ensureHud();
    hud.textContent = '✅ boot ok';
    hud.style.display = 'block';
    setTimeout(() => {
      hud.style.display = 'none';
    }, 1000);
  } catch (err) {
    showHud(`❌ Boot crash\n${err?.message || err}\n${err?.stack || ''}`);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

// Consume one-shot reload guard (prevents accidental reload loops).
try {
  if (sessionStorage.getItem(SW_RELOAD_GUARD)) {
    sessionStorage.removeItem(SW_RELOAD_GUARD);
  }
} catch {}
