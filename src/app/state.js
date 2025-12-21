const STORAGE_KEY = 'cbsgo_state_v1';

export const gameState = {
  xp: 0,
  completed: {}, // nodeKey -> true
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (typeof data?.xp === 'number') gameState.xp = data.xp;
    if (data?.completed && typeof data.completed === 'object') {
      gameState.completed = data.completed;
    }
  } catch {
    // ignore
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ xp: gameState.xp, completed: gameState.completed })
    );
  } catch {
    // ignore
  }
}

// load on import
loadState();

// Simple leveling: every 100 XP = +1 level
export function getLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

export function getXpIntoLevel(xp) {
  return xp % 100;
}

export function addXp(amount) {
  gameState.xp = Math.max(0, gameState.xp + amount);
  saveState();
}

// Completion helpers
export function isCompleted(nodeKey) {
  return !!gameState.completed[nodeKey];
}

export function markCompleted(nodeKey) {
  gameState.completed[nodeKey] = true;
  saveState();
}

export function resetProgress() {
  gameState.xp = 0;
  gameState.completed = {};
  saveState();
}
