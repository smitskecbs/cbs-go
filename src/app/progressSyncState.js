// Account-bound progress sync metadata (dirty / remote stamp / conflict).
// Ownership proof is auth user_id only — never wallet_pk.

import { getProfileOwner } from './playerNickname.js';

export const PROGRESS_SYNC_KEY = 'cbsgo_progress_sync_v1';

/** @typedef {{
 *   userId: string,
 *   dirty: boolean,
 *   localMutatedAt: number,
 *   lastRemoteUpdatedAt: number,
 *   conflict: boolean,
 *   conflictNote: string,
 * }} ProgressSyncState */

const EMPTY = () => ({
  userId: '',
  dirty: false,
  localMutatedAt: 0,
  lastRemoteUpdatedAt: 0,
  conflict: false,
  conflictNote: '',
});

let suppressDepth = 0;

export function beginProgressSyncSuppress() {
  suppressDepth += 1;
}

export function endProgressSyncSuppress() {
  suppressDepth = Math.max(0, suppressDepth - 1);
}

export function isProgressSyncSuppressed() {
  return suppressDepth > 0;
}

function safeParse(raw) {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? v : null;
  } catch {
    return null;
  }
}

/**
 * @returns {ProgressSyncState}
 */
export function readProgressSyncState() {
  try {
    const raw = localStorage.getItem(PROGRESS_SYNC_KEY);
    if (!raw) return EMPTY();
    const parsed = safeParse(raw);
    if (!parsed) return EMPTY();
    return {
      userId: String(parsed.userId || '').trim(),
      dirty: parsed.dirty === true,
      localMutatedAt: Number(parsed.localMutatedAt || 0) || 0,
      lastRemoteUpdatedAt: Number(parsed.lastRemoteUpdatedAt || 0) || 0,
      conflict: parsed.conflict === true,
      conflictNote: String(parsed.conflictNote || ''),
    };
  } catch {
    return EMPTY();
  }
}

/**
 * @param {Partial<ProgressSyncState>} next
 */
export function writeProgressSyncState(next) {
  const cur = readProgressSyncState();
  const merged = {
    userId: String(next.userId ?? cur.userId ?? '').trim(),
    dirty: next.dirty === true,
    localMutatedAt: Number(next.localMutatedAt ?? cur.localMutatedAt ?? 0) || 0,
    lastRemoteUpdatedAt: Number(next.lastRemoteUpdatedAt ?? cur.lastRemoteUpdatedAt ?? 0) || 0,
    conflict: next.conflict === true,
    conflictNote: String(next.conflictNote ?? cur.conflictNote ?? ''),
  };
  try {
    if (!merged.userId) {
      localStorage.removeItem(PROGRESS_SYNC_KEY);
      return EMPTY();
    }
    localStorage.setItem(PROGRESS_SYNC_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return merged;
  }
}

export function clearProgressSyncState() {
  try {
    localStorage.removeItem(PROGRESS_SYNC_KEY);
  } catch {}
}

export function parseRemoteUpdatedAt(remoteOrIso) {
  if (remoteOrIso == null) return 0;
  if (typeof remoteOrIso === 'number' && Number.isFinite(remoteOrIso)) {
    return remoteOrIso > 0 ? remoteOrIso : 0;
  }
  if (typeof remoteOrIso === 'string') {
    const t = Date.parse(remoteOrIso);
    return Number.isFinite(t) && t > 0 ? t : 0;
  }
  if (typeof remoteOrIso === 'object' && remoteOrIso.updated_at) {
    return parseRemoteUpdatedAt(remoteOrIso.updated_at);
  }
  return 0;
}

/** True only when dirty metadata is bound to this auth user_id. */
export function isSameOwnerDirty(userId) {
  const uid = String(userId || '').trim();
  if (!uid) return false;
  const s = readProgressSyncState();
  return s.userId === uid && s.dirty === true;
}

export function getLastRemoteUpdatedAtForUser(userId) {
  const uid = String(userId || '').trim();
  const s = readProgressSyncState();
  if (!uid || s.userId !== uid) return 0;
  return Number(s.lastRemoteUpdatedAt || 0) || 0;
}

/**
 * Mark local progress dirty for the authenticated owner only.
 * Ignores calls while applying remote, or when owner metadata mismatches.
 */
export function markProgressDirty(userId) {
  if (isProgressSyncSuppressed()) return false;

  const uid = String(userId || '').trim();
  if (!uid) return false;

  const s = readProgressSyncState();
  if (s.userId && s.userId !== uid) {
    console.warn('CBS GO: skip markProgressDirty (sync state owned by another user)', {
      requested: uid,
      bound: s.userId,
    });
    return false;
  }

  writeProgressSyncState({
    userId: uid,
    dirty: true,
    localMutatedAt: Date.now(),
    lastRemoteUpdatedAt: s.userId === uid ? s.lastRemoteUpdatedAt : 0,
    conflict: s.userId === uid ? s.conflict : false,
    conflictNote: s.userId === uid ? s.conflictNote : '',
  });
  return true;
}

/** Mark dirty using local profile owner user_id when available. */
export function markProgressDirtyForOwner() {
  const ownerId = getProfileOwner()?.userId || '';
  if (!ownerId) return false;
  return markProgressDirty(ownerId);
}

/**
 * Clear dirty only after a confirmed remote save for the same user.
 * If a newer local mutation landed after the values that were uploaded
 * (`notAfterLocalMutatedAt`), keep dirty=true so a pending/later sync retries.
 *
 * @param {string} userId
 * @param {string|number|null|undefined} remoteUpdatedAt
 * @param {{ notAfterLocalMutatedAt?: number }} [opts]
 */
export function clearProgressDirty(userId, remoteUpdatedAt, opts = {}) {
  const uid = String(userId || '').trim();
  if (!uid) return false;
  const s = readProgressSyncState();
  if (!s.userId || s.userId !== uid) return false;

  const ts = parseRemoteUpdatedAt(remoteUpdatedAt);
  const snapshot = Number(opts.notAfterLocalMutatedAt || 0) || 0;

  if (snapshot > 0 && s.localMutatedAt > snapshot) {
    // Newer mutation than the payload we just saved — stamp remote, keep dirty.
    writeProgressSyncState({
      userId: uid,
      dirty: true,
      localMutatedAt: s.localMutatedAt,
      lastRemoteUpdatedAt: ts > 0 ? ts : s.lastRemoteUpdatedAt,
      conflict: s.conflict,
      conflictNote: s.conflictNote,
    });
    return false;
  }

  writeProgressSyncState({
    userId: uid,
    dirty: false,
    localMutatedAt: s.localMutatedAt,
    lastRemoteUpdatedAt: ts > 0 ? ts : s.lastRemoteUpdatedAt,
    conflict: false,
    conflictNote: '',
  });
  return true;
}

/** Hard stop for post-delete / teardown — blocks further remote progress writes. */
let progressRemoteSyncDisabled = false;

export function disableProgressRemoteSync(reason = '') {
  progressRemoteSyncDisabled = true;
  if (reason) {
    console.info('CBS GO: progress remote sync disabled', { reason });
  }
}

export function enableProgressRemoteSync() {
  progressRemoteSyncDisabled = false;
}

export function isProgressRemoteSyncDisabled() {
  return progressRemoteSyncDisabled === true;
}

/**
 * Record that remote progress was applied/synced for this user (not dirty).
 */
export function recordRemoteApplied(userId, remoteUpdatedAt) {
  const uid = String(userId || '').trim();
  if (!uid) return false;
  const ts = parseRemoteUpdatedAt(remoteUpdatedAt);
  writeProgressSyncState({
    userId: uid,
    dirty: false,
    localMutatedAt: 0,
    lastRemoteUpdatedAt: ts > 0 ? ts : 0,
    conflict: false,
    conflictNote: '',
  });
  return true;
}

/**
 * Bind sync metadata to a new/current auth user. Drops foreign dirty state.
 */
export function bindProgressSyncOwner(userId, { remoteUpdatedAt = 0, keepDirtyIfSame = false } = {}) {
  const uid = String(userId || '').trim();
  if (!uid) {
    clearProgressSyncState();
    return;
  }
  const s = readProgressSyncState();
  const same = s.userId === uid;
  const ts = parseRemoteUpdatedAt(remoteUpdatedAt);
  writeProgressSyncState({
    userId: uid,
    dirty: keepDirtyIfSame && same ? s.dirty : false,
    localMutatedAt: keepDirtyIfSame && same && s.dirty ? s.localMutatedAt : 0,
    lastRemoteUpdatedAt: ts > 0 ? ts : same ? s.lastRemoteUpdatedAt : 0,
    conflict: keepDirtyIfSame && same ? s.conflict : false,
    conflictNote: keepDirtyIfSame && same ? s.conflictNote : '',
  });
}

export function markProgressConflict(userId, note = '') {
  const uid = String(userId || '').trim();
  if (!uid) return false;
  const s = readProgressSyncState();
  if (s.userId && s.userId !== uid) return false;
  writeProgressSyncState({
    userId: uid,
    dirty: true,
    localMutatedAt: s.localMutatedAt || Date.now(),
    lastRemoteUpdatedAt: s.userId === uid ? s.lastRemoteUpdatedAt : 0,
    conflict: true,
    conflictNote: String(note || 'Remote changed while local progress was unsynced'),
  });
  return true;
}

/**
 * True when remote.updated_at is newer than the last successfully applied/synced stamp.
 */
export function remoteChangedSinceLastSync(userId, remote) {
  const uid = String(userId || '').trim();
  if (!uid) return false;
  const last = getLastRemoteUpdatedAtForUser(uid);
  if (!last) return false;
  const remoteTs = parseRemoteUpdatedAt(remote);
  return remoteTs > 0 && remoteTs > last;
}
