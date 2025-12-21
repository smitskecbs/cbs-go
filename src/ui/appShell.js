import { renderNodesList, bindNodesEvents } from './nodesList.js';
import { renderXpBar } from './xpBar.js';
import { isDev, resetDemoSession } from '../app/devTools.js';

export function renderAppShell() {
  const dev = isDev();

  return `
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-left">
          <h1>CBS GO</h1>
          <span class="tagline">Mind & Motion</span>
        </div>

        <div class="topbar-right" id="xpMount">
          ${renderXpBar()}
        </div>
      </header>

      <main class="main">
        <p>Welcome Sovereign 👋</p>
        <p>Explore the real world. Unlock Nodes. Solve puzzles.</p>

        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <button id="startBtn">Start Exploring</button>

          ${dev ? `<button id="resetBtn" class="btn secondary">Reset Demo</button>` : ``}
        </div>

        ${dev ? `<p style="opacity:.65; font-size:12px; margin-top:8px;">Dev mode enabled (?dev=1)</p>` : ``}

        <div id="nodesMount" class="mount">
          ${renderNodesList()}
        </div>
      </main>
    </div>
  `;
}

export function mountApp() {
  document.querySelector('#app').innerHTML = renderAppShell();
  bindNodesEvents('#nodesMount');

  if (isDev()) {
    const btn = document.querySelector('#resetBtn');
    if (btn) btn.addEventListener('click', resetDemoSession);
  }
}
