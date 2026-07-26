// Blocking modal: permanent CBS-GO account deletion with PIN + typed DELETE.

import { DELETE_CONFIRM_WORD, deleteMyAccount } from '../app/deleteAccount.js';
import { icon } from './gameIcons.js';

const MODAL_ID = 'cbsgoDeleteAccountModal';

function remove() {
  const el = document.getElementById(MODAL_ID);
  if (el) el.remove();
}

function inputStyle() {
  return `
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255, 159, 28, 0.28);
    background:#fffbf3;
    color:#3d2a10;
    outline:none;
    font-size:14px;
  `;
}

/**
 * @returns {Promise<'deleted'|'cancelled'>}
 */
export function openDeleteAccountModal() {
  remove();

  return new Promise((resolve) => {
    let busy = false;

    const wrap = document.createElement('div');
    wrap.id = MODAL_ID;
    wrap.style.cssText =
      'position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.82);backdrop-filter:blur(14px);';

    wrap.innerHTML = `
      <div class="cbsgo-game-modal" style="width:min(520px,96vw);max-height:92vh;overflow:auto;">
        <div class="cbsgo-game-modal__header">
          <div class="cbsgo-game-modal__icon">${icon('error', 22, { className: 'cbsgo-icon' })}</div>
          <div>
            <div>Delete account</div>
            <div style="font-size:12px;font-weight:500;opacity:.75;margin-top:2px;">This cannot be undone</div>
          </div>
        </div>
        <div style="padding:16px;">
          <p style="margin:0 0 12px 0;font-size:13px;line-height:1.45;opacity:.9;">
            Permanently delete your CBS-GO account. This removes your profile, XP, leaderboard
            position, friends, and cloud wallet backup.
          </p>
          <ul style="margin:0 0 14px 0;padding-left:18px;font-size:12px;line-height:1.5;opacity:.85;">
            <li>Payment and claim history may be kept for security and reconciliation.</li>
            <li>Blockchain transactions cannot be deleted.</li>
            <li>Your local crypto wallet / private key is <b>not</b> deleted automatically.</li>
            <li>Back up your private key from the Wallet panel before continuing if you hold funds.</li>
          </ul>

          <label for="cbsgoDeletePin" style="font-size:12px;opacity:.8;">Current PIN</label>
          <input
            id="cbsgoDeletePin"
            type="password"
            inputmode="numeric"
            autocomplete="current-password"
            maxlength="6"
            placeholder="••••••"
            style="${inputStyle()};margin-top:6px;margin-bottom:12px;"
          />

          <label for="cbsgoDeleteConfirm" style="font-size:12px;opacity:.8;">
            Type <b>${DELETE_CONFIRM_WORD}</b> to confirm
          </label>
          <input
            id="cbsgoDeleteConfirm"
            type="text"
            autocomplete="off"
            placeholder="${DELETE_CONFIRM_WORD}"
            style="${inputStyle()};margin-top:6px;"
          />

          <div id="cbsgoDeleteMsg" style="min-height:18px;margin:10px 0;font-size:13px;"></div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button id="cbsgoDeleteCancelBtn" type="button" class="cbsgo-btn-secondary" style="flex:1;min-width:120px;">Cancel</button>
            <button id="cbsgoDeleteConfirmBtn" type="button" class="cbsgo-btn-danger" style="flex:1;min-width:140px;" disabled>Delete account forever</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrap);

    const pinEl = wrap.querySelector('#cbsgoDeletePin');
    const confirmEl = wrap.querySelector('#cbsgoDeleteConfirm');
    const msgEl = wrap.querySelector('#cbsgoDeleteMsg');
    const cancelBtn = wrap.querySelector('#cbsgoDeleteCancelBtn');
    const deleteBtn = wrap.querySelector('#cbsgoDeleteConfirmBtn');

    const setMsg = (t, isError = false) => {
      if (!msgEl) return;
      msgEl.textContent = t || '';
      msgEl.style.color = isError ? '#b91c1c' : '';
    };

    const canSubmit = () => {
      const pin = String(pinEl?.value || '').replace(/\D/g, '');
      const word = String(confirmEl?.value || '').trim();
      return pin.length === 6 && word === DELETE_CONFIRM_WORD && !busy;
    };

    const refresh = () => {
      if (!deleteBtn) return;
      deleteBtn.disabled = !canSubmit();
    };

    pinEl?.addEventListener('input', () => {
      if (!pinEl) return;
      const next = String(pinEl.value || '').replace(/\D/g, '').slice(0, 6);
      if (pinEl.value !== next) pinEl.value = next;
      setMsg('');
      refresh();
    });

    confirmEl?.addEventListener('input', () => {
      setMsg('');
      refresh();
    });

    const finishCancel = () => {
      if (busy) return;
      remove();
      resolve('cancelled');
    };

    cancelBtn?.addEventListener('click', finishCancel);
    wrap.addEventListener('click', (ev) => {
      if (ev.target === wrap) finishCancel();
    });
    wrap.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        finishCancel();
      }
    });

    deleteBtn?.addEventListener('click', async () => {
      if (!canSubmit()) return;
      busy = true;
      refresh();
      if (cancelBtn) cancelBtn.disabled = true;
      if (pinEl) pinEl.disabled = true;
      if (confirmEl) confirmEl.disabled = true;
      setMsg('Deleting account…');

      const pin = String(pinEl?.value || '').replace(/\D/g, '').slice(0, 6);
      try {
        const result = await deleteMyAccount({ pin });
        if (!result.ok) {
          setMsg(result.message || 'Could not delete account.', true);
          busy = false;
          if (cancelBtn) cancelBtn.disabled = false;
          if (pinEl) pinEl.disabled = false;
          if (confirmEl) confirmEl.disabled = false;
          refresh();
          return;
        }
        remove();
        resolve('deleted');
      } catch (e) {
        console.warn('CBS GO: delete account modal failed', e);
        setMsg('Could not delete account. Try again.', true);
        busy = false;
        if (cancelBtn) cancelBtn.disabled = false;
        if (pinEl) pinEl.disabled = false;
        if (confirmEl) confirmEl.disabled = false;
        refresh();
      }
    });

    refresh();
    try {
      pinEl?.focus();
    } catch {}
  });
}
