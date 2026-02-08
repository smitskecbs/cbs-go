// src/main.js

// ✅ Buffer polyfill (moet bovenaan staan!)
import './bufferPolyfill.js';

import './style.css';
import { mountApp } from './ui/appShell.js';

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

// --- Mount app safely ---
function boot() {
  try {
    const app = document.getElementById('app');
    if (!app) {
      showHud('❌ #app not found in index.html');
      return;
    }

    mountApp();

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

/* -------------------- PWA / SERVICE WORKER (ANTI STALE BUILDS) -------------------- */
/*
  Probleem op GitHub Pages + PWA:
  - oude service worker blijft soms oude JS/CSS cachen
  - gevolg: MapLibre marker updates “breken” → gifts plakken linksboven / kompas
  Oplossing:
  - updateViaCache:'none'
  - reg.update() forceren
  - als nieuwe SW klaar staat -> direct reload
  - optioneel: querystring bust bij register (extra veilig)
*/

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const base = import.meta.env.BASE_URL || '/';
    // Extra cache-bust voor sw.js zelf (GitHub Pages kan agressief cachen)
    const swPath = `${base}sw.js?v=${Date.now()}`;

    const reg = await navigator.serviceWorker.register(swPath, {
      updateViaCache: 'none', // ✅ pak sw.js nooit uit HTTP cache
    });

    // ✅ force check for updates
    try {
      await reg.update();
    } catch {}

    // ✅ Als er al een waiting SW is (nieuw), activeer en reload
    if (reg.waiting && navigator.serviceWorker.controller) {
      try {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      } catch {}
      // kleine delay zodat hij kan activeren
      setTimeout(() => window.location.reload(), 150);
      return;
    }

    // ✅ luister naar updates
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      if (!nw) return;

      nw.addEventListener('statechange', () => {
        // installed + er was al een controller => dit is een update
        if (nw.state === 'installed' && navigator.serviceWorker.controller) {
          // probeer skipWaiting (alleen als jouw sw.js het accepteert)
          try {
            nw.postMessage({ type: 'SKIP_WAITING' });
          } catch {}
          setTimeout(() => window.location.reload(), 150);
        }
      });
    });

    console.log('[CBS GO] Service worker registered:', reg.scope);
  } catch (err) {
    console.error('[CBS GO] Service worker registration failed:', err);
  }
}

window.addEventListener('load', () => {
  registerServiceWorker();
});
