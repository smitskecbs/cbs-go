import { addXp, isCompleted, markCompleted } from '../app/state.js';
import { renderXpBar } from './xpBar.js';
import { renderNodesList, bindNodesEvents, getMyGroupRole } from './nodesList.js';

function isDev() {
  try {
    return new URLSearchParams(window.location.search).get('dev') === '1';
  } catch {
    return false;
  }
}

function keyOf(node) {
  const base = (node?.name || node?.id || '').toString().trim().toLowerCase();
  return base
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getPuzzleForNode(node) {
  const k = keyOf(node);

  const puzzles = {
    'old-clock-tower': {
      mode: 'solo',
      question: '🔐 The clock shows 04:20. What two numbers unlock it (no symbols)?',
      hint: 'Write the hour and minutes together (4 digits).',
      answer: '0420',
    },

    'abandoned-square': {
      mode: 'group',
      question: '👥 CO-OP LOCK: Each role has 1 digit. Combine all 5 digits (A→E) to unlock.',
      roles: [
        { key: 'A', label: 'Scout',  fragment: '7', clue: 'You found the first digit scratched into stone.' },
        { key: 'B', label: 'Mapper', fragment: '2', clue: 'The map grid points to the second digit.' },
        { key: 'C', label: 'Reader', fragment: '9', clue: 'A torn note reveals the third digit.' },
        { key: 'D', label: 'Guard',  fragment: '1', clue: 'A badge number contains the fourth digit.' },
        { key: 'E', label: 'Caller', fragment: '4', clue: 'A final echo repeats the fifth digit.' },
      ],
      answer: '72914',
    },
  };

  return (
    puzzles[k] || {
      mode: node.type === 'group' ? 'group' : 'solo',
      question:
        node.type === 'group'
          ? '👥 CO-OP LOCK: Each role has 1 digit. Combine all 5 digits (A→E) to unlock.'
          : '🔐 Enter the code: 42',
      roles:
        node.type === 'group'
          ? [
              { key: 'A', label: 'Scout',  fragment: '1', clue: 'First digit found.' },
              { key: 'B', label: 'Mapper', fragment: '2', clue: 'Second digit found.' },
              { key: 'C', label: 'Reader', fragment: '3', clue: 'Third digit found.' },
              { key: 'D', label: 'Guard',  fragment: '4', clue: 'Fourth digit found.' },
              { key: 'E', label: 'Caller', fragment: '5', clue: 'Fifth digit found.' },
            ]
          : undefined,
      answer: node.type === 'group' ? '12345' : '42',
      hint: node.type === 'group' ? 'Talk to your team: each role has one piece.' : 'It’s the famous number.',
    }
  );
}

function refreshXpUI() {
  const mount = document.querySelector('#xpMount');
  if (!mount) return;
  mount.innerHTML = renderXpBar();
}

function refreshNodesUI() {
  const mount = document.querySelector('#nodesMount');
  if (!mount) return;
  mount.innerHTML = renderNodesList();
  bindNodesEvents('#nodesMount');
}

function safeCopy(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);

  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
  return Promise.resolve();
}

export function openPuzzleModal(node) {
  const puzzle = getPuzzleForNode(node);
  const nodeKey = keyOf(node);
  const doneAlready = isCompleted(nodeKey);

  const group = node.type === 'group';
  const rewardXp = node.xp ?? (group ? 150 : 50);

  let selectedRole = null;
  let revealed = false;

  if (group) {
    const myRoleKey = getMyGroupRole(node.id);
    selectedRole = (puzzle.roles || []).find(r => r.key === myRoleKey) || null;
  }

  const dev = isDev();

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';

  const devTeamFragments = (group && dev && (puzzle.roles || []).length)
    ? `
      <div class="roles" style="margin-top:10px;">
        <p class="roles-title">DEV: Team fragments (for solo testing)</p>
        <div class="role-panel">
          <p style="margin:0; opacity:.9;">
            ${puzzle.roles.map(r => `<b>${r.key}</b>: ${r.fragment}`).join(' &nbsp;•&nbsp; ')}
          </p>
          <p style="margin:6px 0 0 0; font-size:12px; opacity:.75;">
            Full code (A→E): <b>${puzzle.roles.map(r => r.fragment).join('')}</b>
          </p>
        </div>
      </div>
    `
    : '';

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div>
          <h2>${node.name}</h2>
          <p class="modal-sub">
            ${group ? '👥 Group Challenge (Co-op)' : '🧩 Solo Puzzle'}
            • Reward: <b>${doneAlready ? '+0 XP (completed)' : `+${rewardXp} XP`}</b>
          </p>
        </div>
        <button class="icon-btn" id="closeModal" title="Close">✕</button>
      </div>

      <p class="modal-desc">${node.description}</p>
      <p class="puzzle-question">${puzzle.question}</p>

      ${group ? `
        <div class="roles">
          <p class="roles-title">Your role:</p>
          <div class="role-panel" id="rolePanel"></div>
        </div>
      ` : ``}

      ${devTeamFragments}

      <input
        type="text"
        id="puzzleInput"
        placeholder="${group ? 'Enter full 5-digit code (A→E)' : 'Enter answer'}"
        autocomplete="off"
      />

      <div class="modal-actions">
        <button class="btn secondary" id="hintBtn">Hint</button>
        <button class="btn secondary" id="cancelPuzzle">Cancel</button>
        <button class="btn" id="submitPuzzle">Submit</button>
      </div>

      <p id="puzzleFeedback" class="puzzle-feedback"></p>
    </div>
  `;

  document.body.appendChild(modal);

  // Robust close
  const onKey = (e) => {
    if (e.key === 'Escape') closeWrapped();
  };
  const closeWrapped = () => {
    window.removeEventListener('keydown', onKey);
    modal.remove();
  };

  window.addEventListener('keydown', onKey);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeWrapped();
  });

  modal.querySelector('#closeModal').onclick = closeWrapped;
  modal.querySelector('#cancelPuzzle').onclick = closeWrapped;

  function setFeedback(msg) {
    const el = modal.querySelector('#puzzleFeedback');
    if (el) el.textContent = msg;
  }

  function renderRolePanel() {
    const panel = modal.querySelector('#rolePanel');
    if (!panel) return;

    if (!selectedRole) {
      panel.innerHTML = `<p class="role-empty">No role assigned. Join the Group Node first.</p>`;
      return;
    }

    const fragHidden = revealed ? selectedRole.fragment : '• • •';

    panel.innerHTML = `
      <div class="role-card">
        <div class="role-head">
          <span class="pill ok">Role ${selectedRole.key}</span>
          <span class="pill">Fragment: <b class="frag">${fragHidden}</b></span>
        </div>

        <p class="role-clue">🧩 ${selectedRole.clue}</p>

        <div class="role-actions">
          <button class="btn secondary" id="revealBtn">${revealed ? 'Revealed' : 'Reveal fragment'}</button>
          <button class="btn secondary" id="copyBtn" ${revealed ? '' : 'disabled'}>Copy</button>
        </div>

        <p class="role-share">Share your fragment with the team. Combine A→E.</p>
      </div>
    `;

    const revealBtn = panel.querySelector('#revealBtn');
    const copyBtn = panel.querySelector('#copyBtn');

    revealBtn.onclick = async () => {
      if (revealed) return;
      revealBtn.textContent = 'Revealing...';
      revealBtn.disabled = true;
      await new Promise(r => setTimeout(r, 650));
      revealed = true;
      renderRolePanel();
    };

    copyBtn.onclick = async () => {
      try {
        await safeCopy(`${selectedRole.key}:${selectedRole.fragment}`);
        setFeedback(`📋 Copied: ${selectedRole.key}:${selectedRole.fragment}`);
      } catch {
        setFeedback('❌ Copy failed.');
      }
    };
  }

  if (group) renderRolePanel();

  modal.querySelector('#hintBtn').onclick = () => {
    setFeedback(
      group
        ? '💡 Hint: Each player has ONE digit. Share A–E and combine in order.'
        : `💡 Hint: ${puzzle.hint}`
    );
  };

  function onSuccess() {
    if (!isCompleted(nodeKey)) {
      addXp(rewardXp);
      markCompleted(nodeKey);
      refreshXpUI();
      refreshNodesUI();
      setFeedback(`✅ Solved! +${rewardXp} XP`);
    } else {
      setFeedback('✅ Solved again! +0 XP (already completed)');
    }
    setTimeout(closeWrapped, 900);
  }

  modal.querySelector('#submitPuzzle').onclick = () => {
    const value = modal.querySelector('#puzzleInput').value.trim();
    if (value.toLowerCase() === String(puzzle.answer).toLowerCase()) {
      onSuccess();
    } else {
      setFeedback(group ? '❌ Incorrect. Collect all fragments A→E.' : '❌ Incorrect. Try again.');
    }
  };

  modal.querySelector('#puzzleInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') modal.querySelector('#submitPuzzle').click();
  });
}
