import { renderNodesList, bindNodesEvents } from './nodesList.js';
import { renderXpBar } from './xpBar.js';

export function renderAppShell() {
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

        <button id="startBtn">Start Exploring</button>

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
}
