import { addXp, isCompleted, markCompleted } from '../app/state.js';
import { renderXpBar } from './xpBar.js';
import { renderNodesList, bindNodesEvents } from './nodesList.js';

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
      question: '🔐 The clock shows 04:20. What two numbers unlock it (no symbols)?',
      hint: 'Write the hour and minutes together (4 digits).',
      answer: '0420',
    },
    'abandoned-square': {
      question: '🕯️ Five Sovereigns light five torches. What is 3 + 2?',
      hint: 'It’s literally 3+2.',
      answer: '5',
    },
  };

  return puzzles[k] || {
    question: '🔐 Enter the code: 42',
    hint: 'It’s the famous number.',
    answer: '42',
  };
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

export function openPuzzleModal(node) {
  const puzzle = getPuzzleForNode(node);
  const nodeKey = keyOf(node);
  const doneAlready = isCompleted(nodeKey);
  const isGroup = node.type === 'group';
  const rewardXp = node.xp ?? (isGroup ? 150 : 50);

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div>
          <h2>${node.name}</h2>
          <p class="modal-sub">
            ${isGroup ? '👥 Group Challenge' : '🧩 Solo Puzzle'}
            • Reward: <b>${doneAlready ? '+0 XP (completed)' : `+${rewardXp} XP`}</b>
          </p>
        </div>
        <button class="icon-btn" id="closeModal" title="Close">✕</button>
      </div>

      <p class="modal-desc">${node.description}</p>

      <p class="puzzle-question">${puzzle.question}</p>

      <input
        type="text"
        id="puzzleInput"
        placeholder="Enter answer"
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

  const close = () => modal.remove();

  modal.querySelector('#closeModal').onclick = close;
  modal.querySelector('#cancelPuzzle').onclick = close;

  modal.querySelector('#hintBtn').onclick = () => {
    modal.querySelector('#puzzleFeedback').textContent = `💡 Hint: ${puzzle.hint}`;
  };

  function onSuccess() {
    // Only grant XP the first time
    if (!isCompleted(nodeKey)) {
      addXp(rewardXp);
      markCompleted(nodeKey);
      refreshXpUI();
      refreshNodesUI();
      modal.querySelector('#puzzleFeedback').textContent = `✅ Solved! +${rewardXp} XP`;
    } else {
      modal.querySelector('#puzzleFeedback').textContent = `✅ Solved again! +0 XP (already completed)`;
    }

    setTimeout(close, 1200);
  }

  modal.querySelector('#submitPuzzle').onclick = () => {
    const value = modal.querySelector('#puzzleInput').value.trim();

    if (value.toLowerCase() === String(puzzle.answer).toLowerCase()) {
      onSuccess();
    } else {
      modal.querySelector('#puzzleFeedback').textContent = '❌ Incorrect. Try again.';
    }
  };

  modal.querySelector('#puzzleInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') modal.querySelector('#submitPuzzle').click();
  });
}
