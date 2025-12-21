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

// Roles are the ONLY source of truth:
// { [nodeId]: { A: tabId, B: tabId, ... } }
const ROLE_STORAGE_KEY = 'cbsgo_group_roles_v1';

// Dev mode flag (?dev=1)
function isDev() {
  try {
    return new URLSearchParams(window.location.search).get('dev') === '1';
  } catch {
    return false;
  }
}

// Unique per tab id
const TAB_ID = (() => {
  const k = 'cbsgo_tab_id_v1';
  let v = sessionStorage.getItem(k);
  if (!v) {
    v = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem(k, v);
  }
  return v;
})();

function loadRoleClaimsAll() {
  try {
    const raw = localStorage.getItem(ROLE_STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

function saveRoleClaimsAll(obj) {
  try {
    localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // ignore
  }
}

function getNodeClaims(nodeId) {
  const all = loadRoleClaimsAll();
  const nodeClaims = all[nodeId];
  return (nodeClaims && typeof nodeClaims === 'object') ? nodeClaims : {};
}

function setNodeClaims(nodeId, claimsForNode) {
  const all = loadRoleClaimsAll();
  all[nodeId] = claimsForNode;
  saveRoleClaimsAll(all);
}

function getMyRole(nodeId) {
  const nodeClaims = getNodeClaims(nodeId);
  const hit = Object.entries(nodeClaims).find(([, tabId]) => tabId === TAB_ID);
  return hit ? hit[0] : null;
}

function getPlayersCount(nodeId) {
  const nodeClaims = getNodeClaims(nodeId);
  const roles = ['A','B','C','D','E'];
  let count = 0;
  for (const r of roles) if (nodeClaims[r]) count++;
  return count;
}

// Claim a role for THIS tab if possible, or return existing
function claimRole(nodeId) {
  const roles = ['A','B','C','D','E'];
  const nodeClaims = getNodeClaims(nodeId);

  // already have role
  const existing = Object.entries(nodeClaims).find(([, tabId]) => tabId === TAB_ID);
  if (existing) return existing[0];

  // free role?
  const free = roles.find(r => !nodeClaims[r]);
  if (!free) return null;

  nodeClaims[free] = TAB_ID;
  setNodeClaims(nodeId, nodeClaims);
  return free;
}

function releaseRole(nodeId) {
  const nodeClaims = getNodeClaims(nodeId);
  let changed = false;

  for (const [role, tabId] of Object.entries(nodeClaims)) {
    if (tabId === TAB_ID) {
      delete nodeClaims[role];
      changed = true;
    }
  }
  if (changed) setNodeClaims(nodeId, nodeClaims);
}

/**
 * DEV helper: Fill A–E but ALWAYS keep/assign a real role to this TAB.
 * - If you already have a role, keep it.
 * - Else, try to claim a free one.
 * - If full of DEV_* roles, we "steal" role A for this TAB (dev-only),
 *   because this is purely for local testing.
 */
function devFillRoles(nodeId) {
  const roles = ['A','B','C','D','E'];
  const nodeClaims = getNodeClaims(nodeId);

  // Ensure THIS tab has a role:
  let myRole = getMyRole(nodeId);

  if (!myRole) {
    // try normal claim first
    const claimed = claimRole(nodeId);
    myRole = claimed;

    if (!myRole) {
      // If full, in DEV mode we overwrite role A so you can test
      nodeClaims.A = TAB_ID;
      myRole = 'A';
      setNodeClaims(nodeId, nodeClaims);
    }
  }

  // Reload claims after potential changes
  const fresh = getNodeClaims(nodeId);

  // Fill remaining roles with DEV placeholders (don't overwrite your role)
  for (const r of roles) {
    if (r === myRole) continue;
    fresh[r] = fresh[r] || `DEV_${r}`;
  }
  setNodeClaims(nodeId, fresh);

  return myRole;
}

function devClearRoles(nodeId) {
  setNodeClaims(nodeId, {});
}

const state = {
  joinedGroupNodeIds: new Set(),
};

function renderInto(selector) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  mount.innerHTML = renderNodesList();
  bindNodesEvents(selector);
}

function toggleJoin(nodeId) {
  const isJoined = state.joinedGroupNodeIds.has(nodeId);

  if (isJoined) {
    state.joinedGroupNodeIds.delete(nodeId);
    releaseRole(nodeId);
    renderInto('#nodesMount');
    return;
  }

  const role = claimRole(nodeId);
  if (!role) {
    alert('This group is full (roles A–E already taken).');
    return;
  }
  state.joinedGroupNodeIds.add(nodeId);
  renderInto('#nodesMount');
}

function renderCompletedPill(node) {
  const done = isCompleted(keyOf(node));
  return done ? `<span class="pill ok">✅ Completed</span>` : ``;
}

function renderNode(node) {
  const done = isCompleted(keyOf(node));

  if (node.type === 'group') {
    const required = node.requiredPlayers ?? 5;
    const count = getPlayersCount(node.id);
    const canOpen = count >= required;
    const joined = state.joinedGroupNodeIds.has(node.id);
    const xp = node.xp ?? 150;
    const myRole = getMyRole(node.id);
    const dev = isDev();

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
              ${myRole ? `<span class="pill ok">Role: ${myRole}</span>` : ``}
              ${renderCompletedPill(node)}
              ${dev ? `<span class="pill">DEV</span>` : ``}
            </div>

            ${dev ? `
              <div class="meta" style="margin-top:8px;">
                <button class="btn secondary" data-action="devClear" data-id="${node.id}">DEV: Clear</button>
                <button class="btn secondary" data-action="devFill" data-id="${node.id}">DEV: Fill A–E (keep my role)</button>
              </div>
            ` : ``}
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

  window.addEventListener('storage', (ev) => {
    if (ev.key === ROLE_STORAGE_KEY) {
      renderInto('#nodesMount');
    }
  });

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'join') {
      toggleJoin(id);
      return;
    }

    if (action === 'devClear') {
      devClearRoles(id);
      renderInto('#nodesMount');
      return;
    }

    if (action === 'devFill') {
      devFillRoles(id);
      // also mark joined so Open won't complain in group mode flows
      state.joinedGroupNodeIds.add(id);
      renderInto('#nodesMount');
      return;
    }

    if (action === 'open') {
      const node = nodes.find(n => n.id === id);
      if (!node) return;

      if (node.type === 'group') {
        const required = node.requiredPlayers ?? 5;
        const count = getPlayersCount(node.id);
        if (count < required) {
          alert(`This Group Node requires ${required} players.\nCurrently: ${count}/${required}`);
          return;
        }
        const myRole = getMyRole(node.id);
        if (!myRole) {
          alert('Join this Group Node first to receive a role (A–E).');
          return;
        }
      }

      openPuzzleModal(node);
    }
  });
}

export function getMyGroupRole(nodeId) {
  return getMyRole(nodeId);
}
