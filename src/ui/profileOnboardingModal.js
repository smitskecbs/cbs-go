// src/ui/profileOnboardingModal.js
// Blocking profile onboarding after login: nickname + avatar required before game start.

import {
  hasValidPlayerAvatar,
  hasValidPlayerNickname,
  normalizePlayerNickname,
  PROFILE_SETUP_MESSAGE,
} from '../app/playerNickname.js';
import { icon, avatarFallbackHtml } from './gameIcons.js';

const MODAL_ID = 'cbsgoProfileOnboarding';

function remove() {
  const el = document.getElementById(MODAL_ID);
  if (el) el.remove();
}

function inputStyle() {
  return `
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `;
}

function btnStyle(enabled) {
  return `
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255, 159, 28,.35);
    background:${enabled ? 'linear-gradient(135deg, rgba(255, 159, 28,.35), rgba(255, 179, 71,.22))' : 'rgba(255,255,255,.08)'};
    color:#fff;
    font-weight:900;
    cursor:${enabled ? 'pointer' : 'not-allowed'};
    opacity:${enabled ? '1' : '.55'};
    box-shadow:${enabled ? '0 0 18px rgba(255, 159, 28,.25)' : 'none'};
  `;
}

function avatarPreviewStyle(dataUrl) {
  const safe = dataUrl ? String(dataUrl).replace(/'/g, '%27') : '';
  const bg = safe ? `background-image:url('${safe}');` : '';
  return `
    width:88px;height:88px;border-radius:999px;
    border:1px solid rgba(255, 159, 28,.35);
    background:rgba(255, 159, 28,.08);
    ${bg}
    background-size:cover;background-position:center;
    display:flex;align-items:center;justify-content:center;
    overflow:hidden;flex-shrink:0;
    box-shadow:0 0 24px rgba(255, 159, 28,.18);
  `;
}

function avatarPreviewInner(dataUrl) {
  return dataUrl ? '' : avatarFallbackHtml(88);
}

/**
 * Show blocking onboarding until profile is saved.
 *
 * @param {object} options
 * @param {object} [options.authUser]
 * @param {string} [options.walletPk]
 * @param {string} [options.initialNickname]
 * @param {string} [options.initialAvatar]
 * @param {(payload: { nickname: string, avatar: string }) => Promise<void>} options.onSave
 * @returns {Promise<{ nickname: string, avatar: string }>}
 */
export function openProfileOnboardingModal(options = {}) {
  const {
    authUser = null,
    walletPk = '',
    initialNickname = '',
    initialAvatar = '',
    onSave,
  } = options;

  if (typeof onSave !== 'function') {
    return Promise.reject(new Error('openProfileOnboardingModal requires onSave'));
  }

  remove();

  return new Promise((resolve, reject) => {
    let draftAvatar = String(initialAvatar || '').trim();
    let saving = false;

    const wrap = document.createElement('div');
    wrap.id = MODAL_ID;
    wrap.style.cssText =
      'position:fixed;inset:0;z-index:999998;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.82);backdrop-filter:blur(14px);';

    wrap.innerHTML = `
      <div class="cbsgo-game-modal">
        <div class="cbsgo-game-modal__header">
          <div class="cbsgo-game-modal__icon">${icon('profile', 22, { className: 'cbsgo-icon' })}</div>
          <div>
            <div>Character Setup</div>
            <div style="font-size:12px;font-weight:500;opacity:.75;margin-top:2px;">Create your adventurer before entering the world</div>
          </div>
        </div>
        <div style="padding:16px;">
          <p style="margin:0 0 14px 0;font-size:13px;opacity:.85;line-height:1.45;">
            Choose a nickname and profile photo before entering CBS-GO.
            Location sharing stays optional and can be changed later.
          </p>
          ${
            !walletPk
              ? `<div style="margin:0 0 12px 0;padding:10px 12px;border-radius:12px;border:1px solid rgba(239,68,68,.45);background:rgba(239,68,68,.12);color:#fecaca;font-size:12px;display:flex;align-items:center;gap:8px;">${icon('error', 16, { className: 'cbsgo-icon' })} Wallet not ready. Please reload and log in again.</div>`
              : ''
          }
          <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
            <div id="cbsgoOnboardAvatarPreview" style="${avatarPreviewStyle(draftAvatar)}">${avatarPreviewInner(draftAvatar)}</div>
            <div style="flex:1;min-width:200px;">
              <label for="cbsgoOnboardNickname" style="font-size:12px;opacity:.8;">Nickname <span style="opacity:.6;">(required)</span></label>
              <input id="cbsgoOnboardNickname" maxlength="24" value="${escapeAttr(initialNickname)}" style="${inputStyle()};margin-top:6px;" placeholder="Your nickname" />
            </div>
          </div>
          <div style="margin-bottom:12px;">
            <label for="cbsgoOnboardAvatar" style="font-size:12px;opacity:.8;">Profile photo <span style="opacity:.6;">(required)</span></label>
            <input id="cbsgoOnboardAvatar" type="file" accept="image/*" style="margin-top:6px;width:100%;color:#fff;font-size:13px;" />
          </div>
          <div id="cbsgoOnboardMsg" style="min-height:18px;margin-bottom:10px;font-size:13px;opacity:.92;"></div>
          <button id="cbsgoOnboardSaveBtn" type="button" class="cbsgo-btn-primary" style="${btnStyle(false)}">Save profile &amp; continue</button>
        </div>
      </div>
    `;

    document.body.appendChild(wrap);

    const nickEl = wrap.querySelector('#cbsgoOnboardNickname');
    const fileEl = wrap.querySelector('#cbsgoOnboardAvatar');
    const previewEl = wrap.querySelector('#cbsgoOnboardAvatarPreview');
    const msgEl = wrap.querySelector('#cbsgoOnboardMsg');
    const saveBtn = wrap.querySelector('#cbsgoOnboardSaveBtn');

    const setMsg = (t, isError = false) => {
      if (!msgEl) return;
      msgEl.textContent = t || '';
      msgEl.className = isError ? 'cbsgo-msg--error' : '';
    };

    const getDraftNickname = () => normalizePlayerNickname(nickEl?.value || '');

    const canSave = () =>
      !!walletPk && hasValidPlayerNickname(getDraftNickname()) && hasValidPlayerAvatar(draftAvatar);

    const refreshSaveBtn = () => {
      if (!saveBtn) return;
      const ok = canSave() && !saving;
      saveBtn.disabled = !ok;
      saveBtn.style.cssText = btnStyle(ok);
    };

    const updatePreview = () => {
      if (!previewEl) return;
      previewEl.style.cssText = avatarPreviewStyle(draftAvatar);
      previewEl.innerHTML = avatarPreviewInner(draftAvatar);
    };

    refreshSaveBtn();
    try {
      nickEl?.focus();
    } catch {}

    nickEl?.addEventListener('input', () => {
      setMsg('');
      refreshSaveBtn();
    });

    fileEl?.addEventListener('change', () => {
      const f = fileEl.files && fileEl.files[0];
      if (!f) return;

      if (f.size > 1_500_000) {
        setMsg('Image too large. Please choose a smaller photo (max ~1.5MB).', true);
        fileEl.value = '';
        return;
      }

      setMsg('Loading photo…');
      const reader = new FileReader();
      reader.onload = () => {
        draftAvatar = String(reader.result || '').trim();
        updatePreview();
        setMsg('');
        refreshSaveBtn();
      };
      reader.onerror = () => {
        setMsg('Could not read that image.', true);
        fileEl.value = '';
      };
      reader.readAsDataURL(f);
    });

    wrap.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        ev.stopPropagation();
      }
      if (ev.key === 'Enter') {
        ev.preventDefault();
        if (canSave() && !saving) saveBtn?.click();
      }
    });

    saveBtn?.addEventListener('click', async () => {
      if (!canSave() || saving) return;

      const nickname = getDraftNickname();
      const avatar = draftAvatar;

      if (!hasValidPlayerNickname(nickname) || !hasValidPlayerAvatar(avatar)) {
        setMsg(PROFILE_SETUP_MESSAGE, true);
        refreshSaveBtn();
        return;
      }

      saving = true;
      refreshSaveBtn();
      setMsg('Saving profile…');

      try {
        await onSave({ nickname, avatar, authUser, walletPk });
        remove();
        resolve({ nickname, avatar });
      } catch (e) {
        console.warn('CBS GO: onboarding save failed', e);
        setMsg(e?.message || 'Could not save profile. Try again.', true);
        saving = false;
        refreshSaveBtn();
      }
    });
  });
}

function escapeAttr(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
