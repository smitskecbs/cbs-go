// Shared profile validation for local storage, UI gates, and Supabase sync.

export const PROFILE_SETUP_MESSAGE =
  'Please complete your profile (email and nickname) before playing.';
export const NICKNAME_REQUIRED_MESSAGE = PROFILE_SETUP_MESSAGE;

const KEY_NAME = 'cbsgo_player_name_v2';
const KEY_EMAIL = 'cbsgo_player_email_v1';

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
  'needs_name',
  'needs name',
  'needsname',
  'test',
  'testing',
  'nameless',
  'new player',
  'newplayer',
]);

export function isValidEmail(raw) {
  const e = String(raw ?? '').trim();
  if (!e) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export function normalizePlayerEmail(raw) {
  const e = String(raw ?? '').trim().toLowerCase();
  if (!isValidEmail(e)) return '';
  return e;
}

export function getPlayerEmail() {
  try {
    return localStorage.getItem(KEY_EMAIL) || '';
  } catch {
    return '';
  }
}

export function setPlayerEmail(raw) {
  const e = normalizePlayerEmail(raw);
  try {
    if (e) localStorage.setItem(KEY_EMAIL, e);
    else localStorage.removeItem(KEY_EMAIL);
  } catch {}
  return e;
}

export function hasValidPlayerEmail(raw) {
  if (raw !== undefined && raw !== null) {
    return !!normalizePlayerEmail(raw);
  }
  return !!normalizePlayerEmail(getPlayerEmail());
}

export function isPlaceholderNickname(raw) {
  const n = String(raw ?? '').trim().toLowerCase();
  if (!n) return true;
  if (PLACEHOLDER_NICKNAMES.has(n)) return true;
  if (/^anon\b/.test(n)) return true;
  if (/^anonymous\b/.test(n)) return true;
  if (/^guest\b/.test(n)) return true;
  if (/^player\b/.test(n)) return true;
  if (/^needs[_\s-]?name\b/.test(n)) return true;
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

export function isProfileComplete(emailRaw, nicknameRaw) {
  const emailOk =
    emailRaw !== undefined ? hasValidPlayerEmail(emailRaw) : hasValidPlayerEmail();
  const nickOk =
    nicknameRaw !== undefined
      ? hasValidPlayerNickname(nicknameRaw)
      : hasValidPlayerNickname();
  return emailOk && nickOk;
}

/** Central gate: true only when email + nickname are valid. */
export function isGameplayAllowed(emailRaw, nicknameRaw) {
  return isProfileComplete(emailRaw, nicknameRaw);
}

/** Returns false and notifies UI when gameplay must be blocked. */
export function requireGameplayAllowed() {
  if (isGameplayAllowed()) return true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cbsgo:profileSetupRequired'));
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

export function sanitizeStoredEmail() {
  try {
    const raw = localStorage.getItem(KEY_EMAIL);
    if (!raw) return;
    if (!normalizePlayerEmail(raw)) {
      localStorage.removeItem(KEY_EMAIL);
    }
  } catch {}
}

export const LEADERBOARD_NICKNAME_BLOCKLIST_IN =
  '("Anon","anon","Anonymous","anonymous","Guest","guest","Player","player","Unknown","unknown","Unnamed","unnamed","Default","default","User","user","Nobody","nobody","No name","no name","NoName","noname","NEEDS_NAME","needs_name","needs name","needsname")';
