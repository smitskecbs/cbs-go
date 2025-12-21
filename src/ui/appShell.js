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

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function avatarCircle(dataUrl, size = 34) {
  const bg = dataUrl ? `background-image:url('${dataUrl}');` : '';
  const txt = dataUrl ? '' : '👤';
  return `
    <div style="
      width:${size}px;height:${size}px; border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${bg}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      font-size:16px;
      overflow:hidden;
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

  // Status on load
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

  // Avatar upload (stores as dataURL)
  if (fileInput) {
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;

      // Basic limit: 1.5MB to avoid huge localStorage
      if (f.size > 1_500_000) {
        setMsg('❌ Image too large. Please choose a smaller photo (max ~1.5MB).');
        fileInput.value = '';
        return;
      }

      setMsg('Uploading photo…');

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || '');
        setPlayerAvatar(dataUrl);

        // Re-render so avatar shows everywhere (leaderboard + header later)
        if (lbMount) lbMount.innerHTML = renderLeaderboard();
        bindLeaderboardEvents();
        setMsg('✅ Photo saved');
      };
      reader.onerror = () => {
        setMsg('❌ Failed to read image.');
      };
      reader.readAsDataURL(f);
    });
  }

  if (removeBtn) {
    removeBtn.onclick = () => {
      clearPlayerAvatar();
      if (lbMount) lbMount.innerHTML = renderLeaderboard();
      bindLeaderboardEvents();
      setMsg('✅ Photo removed');
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

export function renderAppShell() {
  const dev = isDev();
  const myAvatar = getPlayerAvatar();

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

        <div id="nodesMount" class="mount">
          ${renderNodesList()}
        </div>

        <aside id="lbMount">
          ${renderLeaderboard()}
        </aside>
      </main>
    </div>
  `;
}

export function mountApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = renderAppShell();

  bindNodesEvents('#nodesMount');
  bindLeaderboardEvents();

  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', hardResetCBSGO);
  }
}
