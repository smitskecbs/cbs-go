import { nodes } from '../data/nodes.js';
import { openPuzzleModal } from './puzzleModal.js';
import { renderNodesList, bindNodesEvents } from './nodesList.js';
import { renderXpBar } from './xpBar.js';
import { isDev, hardResetCBSGO } from '../app/devTools.js';
import {
  getPlayerName,
  setPlayerName,
  getPlayerAvatar,
  setPlayerAvatar,
  clearPlayerAvatar,
  getTopScores,
  submitMyScore
} from '../app/leaderboard.js';
import { renderMapView, bindMapView } from './mapView.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function avatarCircle(dataUrl, size = 30) {
  const bg = dataUrl ? `background-image:url('${dataUrl}');` : '';
  const txt = dataUrl ? '' : '👤';
  return `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${bg}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">${txt}</div>
  `;
}

function renderLeaderboard() {
  const top = getTopScores(10);
  const me = getPlayerName();
  const myAvatar = getPlayerAvatar();

  return `
    <section class="lb" style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <h3 style="margin:0; font-size:16px;">Leaderboard</h3>
        <span class="pill">Local</span>
      </div>

      <div style="
        margin-top:10px;
        padding:10px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.10);
        background:rgba(0,0,0,.18);
      ">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Profile (auto-saves)</div>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          ${avatarCircle(myAvatar, 44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${esc(me)}" maxlength="24" style="
                flex:1; min-width:180px;
                padding:10px 10px;
                border-radius:12px;
                border:1px solid rgba(255,255,255,.14);
                background:rgba(255,255,255,.06);
                color:#fff;
              "/>
              <button class="btn" id="lbSubmit" type="button">Save my score</button>
            </div>

            <div style="margin-top:8px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbAvatar" type="file" accept="image/*" />
              <button class="btn secondary" id="lbRemoveAvatar" type="button">Remove photo</button>
            </div>

            <div id="lbMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
            <div style="margin-top:6px; font-size:12px; opacity:.7;">
              Local only (this browser). Later we’ll make it global + map-ready.
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:10px;">
        ${
          top.length === 0
            ? `<div style="opacity:.75; font-size:13px;">No scores yet. Click “Save my score”.</div>`
            : `
              <ol style="margin:0; padding-left:18px;">
                ${top.map((e, i) => `
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${i + 1}</div>
                      ${avatarCircle(e.avatar, 28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${esc(e.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">
                          Level ${Number(e.level || 1)}
                        </div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">
                      ${Number(e.xp || 0)} XP
                    </div>
                  </li>
                `).join('')}
              </ol>
            `
        }
      </div>
    </section>
  `;
}

function bindLeaderboardEvents() {
  const lbMount = document.querySelector('#lbMount');
  const nameInput = document.querySelector('#lbName');
  const submitBtn = document.querySelector('#lbSubmit');
  const fileInput = document.querySelector('#lbAvatar');
  const removeBtn = document.querySelector('#lbRemoveAvatar');

  let saveTimer = null;

  const setMsg = (t) => {
    const msg = document.querySelector('#lbMsg');
    if (msg) msg.textContent = t || '';
  };

  if (nameInput) setMsg(`✅ Profile loaded: ${nameInput.value}`);

  const saveNameNow = () => {
    if (!nameInput) return;
    const n = setPlayerName(nameInput.value);
    setMsg(`✅ Name saved: ${n}`);
  };

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      setMsg('Saving…');
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(saveNameNow, 300);
    });

    nameInput.addEventListener('blur', () => {
      if (saveTimer) clearTimeout(saveTimer);
      saveNameNow();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;

      if (f.size > 1_500_000) {
        setMsg('❌ Image too large. Please choose a smaller photo (max ~1.5MB).');
        fileInput.value = '';
        return;
      }

      setMsg('Uploading photo…');
      const reader = new FileReader();
      reader.onload = () => {
        setPlayerAvatar(String(reader.result || ''));
        if (lbMount) lbMount.innerHTML = renderLeaderboard();
        bindLeaderboardEvents();
        setMsg('✅ Photo saved');
        // also refresh header avatar + map avatar
        mountApp();
      };
      reader.onerror = () => setMsg('❌ Failed to read image.');
      reader.readAsDataURL(f);
    });
  }

  if (removeBtn) {
    removeBtn.onclick = () => {
      clearPlayerAvatar();
      if (lbMount) lbMount.innerHTML = renderLeaderboard();
      bindLeaderboardEvents();
      setMsg('✅ Photo removed');
      mountApp();
    };
  }

  if (submitBtn) {
    submitBtn.onclick = () => {
      if (nameInput) saveNameNow();
      const entry = submitMyScore();
      if (lbMount) lbMount.innerHTML = renderLeaderboard();
      bindLeaderboardEvents();
      setMsg(`✅ Saved: ${entry.name} – ${entry.xp} XP`);
    };
  }
}

function getSelectedTab() {
  try {
    return sessionStorage.getItem('cbsgo_selected_tab_v1') || 'nodes';
  } catch {
    return 'nodes';
  }
}

function setSelectedTab(tab) {
  try {
    sessionStorage.setItem('cbsgo_selected_tab_v1', tab);
  } catch {}
}

function renderTabs() {
  const t = getSelectedTab();
  const btn = (id, label) => `
    <button class="btn secondary" type="button"
      data-tab="${id}"
      style="opacity:${t === id ? '1' : '.75'};">
      ${label}
    </button>
  `;
  return `
    <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:10px;">
      ${btn('nodes', 'Nodes')}
      ${btn('map', 'Map')}
    </div>
  `;
}

function bindTabs() {
  document.querySelectorAll('[data-tab]').forEach(b => {
    b.addEventListener('click', () => {
      const tab = b.getAttribute('data-tab');
      setSelectedTab(tab);
      mountApp();
    });
  });
}

export function renderAppShell() {
  const dev = isDev();
  const myAvatar = getPlayerAvatar();
  const tab = getSelectedTab();

  return `
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-left" style="display:flex; gap:10px; align-items:center;">
          ${avatarCircle(myAvatar, 32)}
          <div>
            <h1 style="margin:0;">CBS GO</h1>
            <span class="tagline">Mind & Motion</span>
          </div>
        </div>

        <div class="topbar-right" id="xpMount">
          ${renderXpBar()}
        </div>
      </header>

      <main class="main">
        <p>Welcome Sovereign 👋</p>
        <p>Explore the real world. Unlock Nodes. Solve puzzles.</p>

        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <button id="startBtn" type="button">Start Exploring</button>
          ${dev ? `<button id="resetBtn" class="btn secondary" type="button">Reset Demo (Hard)</button>` : ``}
        </div>

        ${dev ? `<p style="opacity:.65; font-size:12px; margin-top:8px;">Dev mode enabled (?dev=1)</p>` : ``}

        ${renderTabs()}

        <section id="tabNodes" style="display:${tab === 'nodes' ? 'block' : 'none'};">
          <div id="nodesMount" class="mount">
            ${renderNodesList()}
          </div>
          <aside id="lbMount">
            ${renderLeaderboard()}
          </aside>
        </section>

        <section id="tabMap" style="display:${tab === 'map' ? 'block' : 'none'};">
          <div id="mapMount">
            ${renderMapView()}
          </div>
        </section>
      </main>
    </div>
  `;
}

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  bindTabs();

  // Nodes tab bindings
  bindNodesEvents('#nodesMount');
  bindLeaderboardEvents();

  // Map tab bindings
  bindMapView();

  // Dev reset
  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', hardResetCBSGO);
  }

  // Map pin open -> open same puzzle modal
  window.addEventListener('cbsgo:openNode', (ev) => {
    const id = ev?.detail?.id;
    const node = nodes.find(n => n.id === id);
    if (node) openPuzzleModal(node);
  }, { once: true });
}
