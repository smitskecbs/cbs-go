// Shared nickname validation for local storage, UI gates, and Supabase sync.

export const NICKNAME_REQUIRED_MESSAGE = 'Please choose a nickname before playing.';

const KEY_NAME = 'cbsgo_player_name_v2';

const PLACEHOLDER_NICKNAMES = new Set([
  'anon',
  'anonymous',
  'guest',
  'player',
  'unknown',
  'unnamed',
  'default',
  'user',
  'nobody',
  'no name',
  'noname',
  'test',
  'testing',
  'nameless',
  'new player',
  'newplayer',
]);

export function isPlaceholderNickname(raw) {
  const n = String(raw ?? '').trim().toLowerCase();
  if (!n) return true;
  if (PLACEHOLDER_NICKNAMES.has(n)) return true;
  if (/^anon\b/.test(n)) return true;
  if (/^anonymous\b/.test(n)) return true;
  if (/^guest\b/.test(n)) return true;
  if (/^player\b/.test(n)) return true;
  return false;
}

export function normalizePlayerNickname(raw) {
  const n = String(raw ?? '').trim().slice(0, 24);
  if (!n || isPlaceholderNickname(n)) return '';
  return n;
}

export function hasValidPlayerNickname(raw) {
  if (raw !== undefined && raw !== null) {
    return !!normalizePlayerNickname(raw);
  }
  try {
    return !!normalizePlayerNickname(localStorage.getItem(KEY_NAME) || '');
  } catch {
    return false;
  }
}

/** Central gate: true only when the player may interact with gameplay systems. */
export function isGameplayAllowed(raw) {
  return hasValidPlayerNickname(raw);
}

/** Returns false and notifies UI when gameplay must be blocked. */
export function requireGameplayAllowed() {
  if (isGameplayAllowed()) return true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cbsgo:nicknameRequired'));
  }
  return false;
}

/** Remove invalid/legacy placeholder nicknames from local storage on load. */
export function sanitizeStoredNickname() {
  try {
    const raw = localStorage.getItem(KEY_NAME);
    if (!raw) return;
    if (!normalizePlayerNickname(raw)) {
      localStorage.removeItem(KEY_NAME);
    }
  } catch {}
}

export const LEADERBOARD_NICKNAME_BLOCKLIST_IN =
  '("Anon","anon","Anonymous","anonymous","Guest","guest","Player","player","Unknown","unknown","Unnamed","unnamed","Default","default","User","user","Nobody","nobody","No name","no name","NoName","noname")';
