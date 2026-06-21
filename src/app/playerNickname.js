// Shared profile validation for local storage, UI gates, and Supabase sync.

export const PROFILE_SETUP_MESSAGE =
  'Please complete your profile (nickname and photo) before playing.';
export const NICKNAME_REQUIRED_MESSAGE = PROFILE_SETUP_MESSAGE;

const KEY_NAME = 'cbsgo_player_name_v2';
const KEY_EMAIL = 'cbsgo_player_email_v1';
const KEY_AVATAR = 'cbsgo_player_avatar_v2';

/** Set after login/onboarding so sync gate checks can resolve auth + wallet. */
let profileGateContext = {
  authUser: null,
  walletPk: null,
};

export function setProfileGateContext(partial = {}) {
  if (!partial || typeof partial !== 'object') return;
  if (Object.prototype.hasOwnProperty.call(partial, 'authUser')) {
    profileGateContext.authUser = partial.authUser || null;
  }
  if (Object.prototype.hasOwnProperty.call(partial, 'walletPk')) {
    profileGateContext.walletPk = partial.walletPk || null;
  }
  if (Object.prototype.hasOwnProperty.call(partial, 'userId')) {
    profileGateContext.authUser = partial.userId ? { id: partial.userId } : null;
  }
}

export function getProfileGateContext() {
  return {
    authUser: profileGateContext.authUser,
    walletPk: profileGateContext.walletPk,
  };
}

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

/** True when avatar is a non-empty usable string (data URL, URL, or stored value). */
export function hasValidPlayerAvatar(raw) {
  let v = '';
  if (raw !== undefined && raw !== null) {
    v = String(raw).trim();
  } else {
    try {
      v = String(localStorage.getItem(KEY_AVATAR) || '').trim();
    } catch {
      return false;
    }
  }
  if (!v) return false;
  if (v.startsWith('data:image/')) {
    return v.includes(',') && v.length > 'data:image/'.length + 1;
  }
  if (/^https?:\/\//i.test(v)) return true;
  return v.length > 0;
}

/** True when wallet public key string is present. */
export function hasWalletPk(walletPk) {
  if (walletPk === undefined || walletPk === null) return false;
  return String(walletPk).trim().length > 0;
}

/**
 * Pure helper: true when a Supabase auth user/session identity is present.
 * Accepts auth user objects, session objects, or { user: { id } } shapes.
 */
export function hasAuthSession(authUserOrSession) {
  if (!authUserOrSession) return false;

  const o = authUserOrSession;
  const uid =
    o.user?.id ??
    o.id ??
    o.user_id ??
    o.session?.user?.id ??
    '';

  return !!String(uid).trim();
}

/**
 * Central profile gate: auth session + wallet_pk + valid nickname + valid avatar.
 *
 * @param {object} [input]
 * @param {object} [input.authUser] - Supabase auth user
 * @param {object} [input.authSession] - Supabase session ({ user: { id } })
 * @param {string} [input.userId] - Auth user id shorthand
 * @param {string} [input.walletPk] - Wallet public key
 * @param {string} [input.nickname] - Omit to read from localStorage
 * @param {string} [input.avatar] - Omit to read from localStorage
 */
export function isProfileComplete(input = {}) {
  if (input == null || typeof input !== 'object' || Array.isArray(input)) {
    return false;
  }

  const walletPk =
    input.walletPk !== undefined ? input.walletPk : profileGateContext.walletPk;

  const authCandidate =
    input.authUser ??
    input.authSession ??
    profileGateContext.authUser ??
    (input.userId != null && String(input.userId).trim() ? { id: input.userId } : null);

  return (
    hasAuthSession(authCandidate) &&
    hasWalletPk(walletPk) &&
    hasValidPlayerNickname(input.nickname) &&
    hasValidPlayerAvatar(input.avatar)
  );
}

/**
 * Backward-compatible gameplay gate.
 * - isGameplayAllowed({ authUser, walletPk, nickname, avatar })
 * - isGameplayAllowed(emailRaw, nicknameRaw) — email ignored; nickname override only
 * - isGameplayAllowed() — reads nickname/avatar from localStorage; auth/wallet must be passed via object form
 */
export function isGameplayAllowed(first, second) {
  if (first !== undefined && first !== null && typeof first === 'object' && !Array.isArray(first)) {
    return isProfileComplete(first);
  }

  return isProfileComplete({
    nickname: second !== undefined ? second : undefined,
  });
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
