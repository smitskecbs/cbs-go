// src/main.js

// ✅ Buffer polyfill (moet bovenaan staan!)
import './bufferPolyfill.js';

import './style.css';
import { mountApp } from './ui/appShell.js';
import { initPwaUpdates, consumeSwReloadGuard, consumeForceRefreshParam } from './app/pwaUpdate.js';

// ✅ MapLibre CSS
import 'maplibre-gl/dist/maplibre-gl.css';

// ✅ Email+PIN vault bootstrap (backup/recover)
import { bootstrapAuthWallet } from './app/bootstrapAuthWallet.js';
if (typeof window !== 'undefined') {
  window.bootstrapAuthWallet = bootstrapAuthWallet;
}

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

function boot() {
  try {
    const app = document.getElementById('app');
    if (!app) {
      showHud('❌ #app not found in index.html');
      return;
    }

    // Register SW / check for updates before mounting UI (installed PWA cold start).
    initPwaUpdates();
    mountApp();

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

consumeSwReloadGuard();
consumeForceRefreshParam();
