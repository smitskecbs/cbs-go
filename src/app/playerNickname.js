// Shared nickname validation for local storage, UI gates, and Supabase sync.

export const NICKNAME_REQUIRED_MESSAGE = 'Please choose a nickname before playing.';

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
]);

export function isPlaceholderNickname(raw) {
  const n = String(raw ?? '').trim().toLowerCase();
  if (!n) return true;
  if (PLACEHOLDER_NICKNAMES.has(n)) return true;
  if (/^anon\b/.test(n)) return true;
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
    return !!normalizePlayerNickname(localStorage.getItem('cbsgo_player_name_v2') || '');
  } catch {
    return false;
  }
}
