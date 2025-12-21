import { nodes } from '../data/nodes.js';
import { openPuzzleModal } from './puzzleModal.js';
import { isCompleted } from '../app/state.js';

function keyOf(node) {
  const base = (node?.name || node?.id || '').toString().trim().toLowerCase();
  return base
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const state = {
  joinedGroupNodeIds: new Set(),
  groupCounts: new Map(), // nodeId -> currentCount
};

function getGroupCount(nodeId) {
  if (!state.groupCounts.has(nodeId)) {
    state.groupCounts.set(nodeId, 1);
  }
  return state.groupCounts.get(nodeId);
}

function setGroupCount(nodeId, next) {
  state.groupCounts.set(nodeId, next);
}

function renderInto(selector) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  mount.innerHTML = renderNodesList();
  bindNodesEvents(selector);
}

function toggleJoin(nodeId) {
  const isJoined = state.joinedGroupNodeIds.has(nodeId);
  const count = getGroupCount(nodeId);

  if (isJoined) {
    state.joinedGroupNodeIds.delete(nodeId);
    setGroupCount(nodeId, Math.max(0, count - 1));
  } else {
    state.joinedGroupNodeIds.add(nodeId);
    setGroupCount(nodeId, count + 1);
  }

  renderInto('#nodesMount');
}

function renderCompletedPill(node) {
  const done = isCompleted(keyOf(node));
  return done ? `<span class="pill ok">✅ Completed</span>` : ``;
}

function renderNode(node) {
  const done = isCompleted(keyOf(node));

  if (node.type === 'group') {
    const count = getGroupCount(node.id);
    const joined = state.joinedGroupNodeIds.has(node.id);
    const required = node.requiredPlayers ?? 5;
    const canOpen = count >= required;
    const xp = node.xp ?? 150;

    return `
      <li class="node group">
        <div class="node-row">
          <div class="node-main">
            <strong>${node.name}</strong>
            <small>${node.description}</small>

            <div class="meta">
              <span class="badge">👥 Group Node</span>
              <span class="pill">Players: ${count}/${required}</span>
              <span class="pill ${canOpen ? 'ok' : ''}">
                ${canOpen ? 'Unlocked' : 'Locked'}
              </span>
              <span class="pill">XP: ${xp} (Group)</span>
              ${renderCompletedPill(node)}
            </div>
          </div>

          <div class="node-actions">
            <button class="btn secondary" data-action="join" data-id="${node.id}">
              ${joined ? 'Leave' : 'Join'}
            </button>

            ${canOpen
              ? `<button class="btn" data-action="open" data-id="${node.id}">
                  ${done ? 'Replay' : 'Open'}
                </button>`
              : ``}
          </div>
        </div>
      </li>
    `;
  }

  const xp = node.xp ?? 50;

  return `
    <li class="node puzzle">
      <div class="node-row">
        <div class="node-main">
          <strong>${node.name}</strong>
          <small>${node.description}</small>

          <div class="meta">
            <span class="badge">🧩 Puzzle Node</span>
            <span class="pill">XP: ${xp} (Solo)</span>
            ${renderCompletedPill(node)}
          </div>
        </div>

        <div class="node-actions">
          <button class="btn" data-action="open" data-id="${node.id}">
            ${done ? 'Replay' : 'Open'}
          </button>
        </div>
      </div>
    </li>
  `;
}

export function renderNodesList() {
  return `
    <section class="nodes">
      <h2>Nearby Nodes</h2>
      <ul class="node-list">
        ${nodes.map(renderNode).join('')}
      </ul>
    </section>
  `;
}

export function bindNodesEvents(rootSelector = '#nodesMount') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'join') {
      toggleJoin(id);
      return;
    }

    if (action === 'open') {
      const node = nodes.find(n => n.id === id);
      if (!node) return;

      if (node.type === 'group') {
        const count = getGroupCount(node.id);
        const required = node.requiredPlayers ?? 5;
        if (count < required) {
          alert(`This Group Node requires ${required} players.\nCurrently: ${count}/${required}`);
          return;
        }
      }

      openPuzzleModal(node);
    }
  });
}
