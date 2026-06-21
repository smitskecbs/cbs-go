// Small game-style confirm dialog (no native window.confirm).

import { icon } from './gameIcons.js';

const DIALOG_ID = 'cbsgoConfirmDialog';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function remove() {
  const el = document.getElementById(DIALOG_ID);
  if (el) el.remove();
}

/**
 * @param {{ title?: string, message?: string, confirmLabel?: string, cancelLabel?: string, danger?: boolean }} options
 * @returns {Promise<boolean>}
 */
export function showConfirmDialog(options = {}) {
  const {
    title = 'Confirm',
    message = 'Are you sure?',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    danger = false,
  } = options;

  remove();

  return new Promise((resolve) => {
    const wrap = document.createElement('div');
    wrap.id = DIALOG_ID;
    wrap.className = 'cbsgo-confirm-backdrop';

    const finish = (ok) => {
      remove();
      resolve(!!ok);
    };

    wrap.innerHTML = `
      <div class="cbsgo-confirm-card" role="dialog" aria-modal="true">
        <div class="cbsgo-confirm-card__icon">${icon(danger ? 'remove' : 'check', 22, { className: 'cbsgo-icon' })}</div>
        <div class="cbsgo-confirm-card__title">${esc(title)}</div>
        <div class="cbsgo-confirm-card__message">${esc(message)}</div>
        <div class="cbsgo-confirm-card__actions">
          <button type="button" class="cbsgo-btn-secondary cbsgo-confirm-cancel">${esc(cancelLabel)}</button>
          <button type="button" class="${danger ? 'cbsgo-btn-danger' : 'cbsgo-btn-primary'} cbsgo-confirm-ok">${esc(confirmLabel)}</button>
        </div>
      </div>
    `;

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) {
        e.preventDefault();
        e.stopPropagation();
        finish(false);
      }
    });

    const okBtn = wrap.querySelector('.cbsgo-confirm-ok');
    const cancelBtn = wrap.querySelector('.cbsgo-confirm-cancel');

    okBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      finish(true);
    });

    cancelBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      finish(false);
    });

    document.body.appendChild(wrap);
  });
}
