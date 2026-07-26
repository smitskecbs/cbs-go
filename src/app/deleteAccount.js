// Client helper: reauthenticate with PIN, then call /api/delete-account.

import { supabase } from './supabaseClient.js';
import { clearAccountBoundLocalState } from './clearAccountLocalState.js';
import { setProfileGateContext, setProfileOwner } from './playerNickname.js';
import { disableProgressRemoteSync, enableProgressRemoteSync } from './progressSyncState.js';

export const DELETE_CONFIRM_WORD = 'DELETE';
export const DELETE_ACCOUNT_FRIENDLY_ERROR =
  'We could not delete your account. Please try again later.';

function deleteAccountUrl() {
  try {
    return new URL('/api/delete-account', window.location.origin).href;
  } catch {
    return '/api/delete-account';
  }
}

/**
 * Re-auth with email + PIN, then permanently delete the account on the server.
 * Does not send the PIN to the delete endpoint.
 *
 * @param {{ pin: string }} options
 * @returns {Promise<{ ok: true } | { ok: false, message: string }>}
 */
export async function deleteMyAccount({ pin }) {
  const pinClean = String(pin || '').replace(/\D/g, '').slice(0, 6);
  if (pinClean.length !== 6) {
    return { ok: false, message: 'Enter your current 6-digit PIN.' };
  }

  let email = '';
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return { ok: false, message: 'Please log in again and retry.' };
    }
    email = String(data.user.email || '').trim();
  } catch (e) {
    console.warn('CBS GO: deleteMyAccount getUser failed', e);
    return { ok: false, message: 'Please log in again and retry.' };
  }

  if (!email) {
    return { ok: false, message: 'No email on this account. Please log in again.' };
  }

  // Prove possession of the current password (PIN) before calling the server.
  try {
    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email,
      password: pinClean,
    });
    if (reauthError) {
      console.warn('CBS GO: delete reauth failed', {
        code: reauthError.code,
        message: reauthError.message,
      });
      return { ok: false, message: 'Incorrect PIN. Account was not deleted.' };
    }
  } catch (e) {
    console.warn('CBS GO: delete reauth crashed', e);
    return { ok: false, message: 'Incorrect PIN. Account was not deleted.' };
  }

  let accessToken = '';
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data?.session?.access_token) {
      return { ok: false, message: 'Please log in again and retry.' };
    }
    accessToken = data.session.access_token;
  } catch (e) {
    console.warn('CBS GO: delete getSession failed', e);
    return { ok: false, message: 'Please log in again and retry.' };
  }

  // Freeze progress sync before the destructive server call so late timers cannot
  // recreate game_profiles after Auth deletion. Re-enable if delete fails.
  try {
    if (typeof window !== 'undefined' && typeof window.__cbsgo_cancelProgressSync === 'function') {
      window.__cbsgo_cancelProgressSync();
    } else {
      disableProgressRemoteSync('account-delete-start');
    }
  } catch {
    disableProgressRemoteSync('account-delete-start');
  }

  let response;
  try {
    response = await fetch(deleteAccountUrl(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  } catch (e) {
    console.warn('CBS GO: delete-account network failed', e);
    enableProgressRemoteSync();
    return { ok: false, message: DELETE_ACCOUNT_FRIENDLY_ERROR };
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.ok) {
    console.warn('CBS GO: delete-account rejected', {
      status: response.status,
      code: payload?.code || null,
      error: payload?.error || null,
    });
    enableProgressRemoteSync();
    return {
      ok: false,
      message: String(payload?.error || DELETE_ACCOUNT_FRIENDLY_ERROR),
    };
  }

  // Keep sync disabled. Server confirmed Auth user deleted — clear local account state.
  clearAccountBoundLocalState();
  setProfileGateContext({ authUser: null, walletPk: null });
  setProfileOwner({ userId: '', walletPk: '' });

  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.warn('CBS GO: signOut after delete failed', e);
  }

  return { ok: true };
}
