/**
 * Vercel serverless: permanently delete the authenticated CBS-GO account.
 *
 * Server-only env (Vercel Project → Settings → Environment Variables):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Authorization:
 *   Authorization: Bearer <access_token>
 *   uid is derived only from auth.getUser(token) — never from the request body.
 */

import { createClient } from '@supabase/supabase-js';

const FRIENDLY_ERROR = 'We could not delete your account. Please try again later.';
const RATE_LIMIT_MS = 60_000;
const recentByUid = new Map();

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.end(JSON.stringify(body));
}

function getBearerToken(req) {
  const h = String(req.headers?.authorization || req.headers?.Authorization || '');
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? String(m[1] || '').trim() : '';
}

function isIgnorableDeleteError(error) {
  if (!error) return true;
  const code = String(error.code || '');
  const msg = String(error.message || '').toLowerCase();
  // No rows / already gone
  if (code === 'PGRST116') return true;
  if (msg.includes('0 rows') || msg.includes('no rows')) return true;
  return false;
}

async function safeDelete(admin, label, run) {
  try {
    const { error, count } = await run();
    if (error && !isIgnorableDeleteError(error)) {
      console.error(`[api/delete-account] ${label} failed`, {
        code: error.code,
        message: error.message,
      });
      return { ok: false, label, error };
    }
    console.info(`[api/delete-account] ${label} ok`, { count: count ?? null });
    return { ok: true, label };
  } catch (e) {
    console.error(`[api/delete-account] ${label} crashed`, String(e?.message || e));
    return { ok: false, label, error: e };
  }
}

function checkRateLimit(uid) {
  const now = Date.now();
  const prev = recentByUid.get(uid) || 0;
  if (now - prev < RATE_LIMIT_MS) return false;
  recentByUid.set(uid, now);
  // prune old entries occasionally
  if (recentByUid.size > 500) {
    for (const [k, t] of recentByUid) {
      if (now - t > RATE_LIMIT_MS * 5) recentByUid.delete(k);
    }
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'Method not allowed.' });
  }

  const supabaseUrl = String(process.env.SUPABASE_URL || '').trim();
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

  if (!supabaseUrl || !serviceKey) {
    console.error('[api/delete-account] missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return json(res, 503, { ok: false, error: FRIENDLY_ERROR });
  }

  const token = getBearerToken(req);
  if (!token) {
    return json(res, 401, { ok: false, error: 'Please log in again and retry.' });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let uid = '';
  try {
    const { data, error } = await admin.auth.getUser(token);
    if (error || !data?.user?.id) {
      console.warn('[api/delete-account] token verification failed', {
        code: error?.code,
        message: error?.message,
      });
      return json(res, 401, { ok: false, error: 'Your session expired. Please log in again.' });
    }
    uid = String(data.user.id);
  } catch (e) {
    console.warn('[api/delete-account] getUser crashed', String(e?.message || e));
    return json(res, 401, { ok: false, error: 'Your session expired. Please log in again.' });
  }

  // Ignore any body.user_id — deletion authority is token-only.
  if (!checkRateLimit(uid)) {
    return json(res, 429, {
      ok: false,
      error: 'Please wait a moment before trying again.',
    });
  }

  console.info('[api/delete-account] start', { uid });

  // 1) friends_uid (both directions)
  {
    const r = await safeDelete(admin, 'friends_uid', () =>
      admin.from('friends_uid').delete({ count: 'exact' }).or(`a_user.eq.${uid},b_user.eq.${uid}`),
    );
    if (!r.ok) return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
  }

  // 2) Resolve players.id for this user (needed for player_state.player_id)
  let playerIds = [];
  try {
    const { data, error } = await admin.from('players').select('id').eq('user_id', uid);
    if (error && !isIgnorableDeleteError(error)) {
      console.error('[api/delete-account] players select failed', {
        code: error.code,
        message: error.message,
      });
      return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
    }
    playerIds = (Array.isArray(data) ? data : [])
      .map((row) => row?.id)
      .filter((id) => id != null);
  } catch (e) {
    console.error('[api/delete-account] players select crashed', String(e?.message || e));
    return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
  }

  // 3) player_state — by user_id and by player_id (FK to players.id)
  //    Also clears country_code + show_country_flag (no separate wipe needed).
  {
    const rUser = await safeDelete(admin, 'player_state.user_id', () =>
      admin.from('player_state').delete({ count: 'exact' }).eq('user_id', uid),
    );
    // Column missing on some schemas: treat as non-fatal only for undefined column
    if (!rUser.ok) {
      const msg = String(rUser.error?.message || '').toLowerCase();
      if (!msg.includes('column') && !msg.includes('does not exist')) {
        return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
      }
      console.warn('[api/delete-account] player_state.user_id skipped (column may be absent)');
    }

    if (playerIds.length > 0) {
      const rPid = await safeDelete(admin, 'player_state.player_id', () =>
        admin.from('player_state').delete({ count: 'exact' }).in('player_id', playerIds),
      );
      if (!rPid.ok) {
        const msg = String(rPid.error?.message || '').toLowerCase();
        if (!msg.includes('column') && !msg.includes('does not exist')) {
          return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
        }
        console.warn('[api/delete-account] player_state.player_id skipped (column may be absent)');
      }
    }
  }

  // 4) players (may CASCADE remaining player_state via player_id)
  {
    const r = await safeDelete(admin, 'players', () =>
      admin.from('players').delete({ count: 'exact' }).eq('user_id', uid),
    );
    if (!r.ok) return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
  }

  // 5) game_profiles
  {
    const r = await safeDelete(admin, 'game_profiles', () =>
      admin.from('game_profiles').delete({ count: 'exact' }).eq('user_id', uid),
    );
    if (!r.ok) return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
  }

  // 6) wallet_vault
  {
    const r = await safeDelete(admin, 'wallet_vault', () =>
      admin.from('wallet_vault').delete({ count: 'exact' }).eq('user_id', uid),
    );
    if (!r.ok) return json(res, 500, { ok: false, error: FRIENDLY_ERROR });
  }

  // 7) Auth user last — success only if this succeeds
  try {
    const { error } = await admin.auth.admin.deleteUser(uid);
    if (error) {
      console.error('[api/delete-account] auth.admin.deleteUser FAILED after app data removed', {
        uid,
        code: error.code,
        message: error.message,
      });
      return json(res, 500, {
        ok: false,
        error:
          'Account data was removed but login cleanup failed. Contact support with this time so we can finish recovery.',
        code: 'auth_delete_failed',
      });
    }
  } catch (e) {
    console.error('[api/delete-account] auth.admin.deleteUser crashed after app data removed', {
      uid,
      message: String(e?.message || e),
    });
    return json(res, 500, {
      ok: false,
      error:
        'Account data was removed but login cleanup failed. Contact support with this time so we can finish recovery.',
      code: 'auth_delete_failed',
    });
  }

  console.info('[api/delete-account] complete', { uid });
  return json(res, 200, { ok: true });
}
