// Game-style in-app notices for PWA / bundle updates.

import { icon } from './gameIcons.js';

const UPDATE_NOTICE_ID = 'cbsgoUpdateNotice';
const VERSION_NOTICE_ID = 'cbsgoVersionNotice';

function removeNotice(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function mountNotice({
  id,
  title,
  text,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}) {
  removeNotice(id);
  if (document.getElementById(id)) return;

  const wrap = document.createElement('div');
  wrap.id = id;
  wrap.className = 'cbsgo-update-notice';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-live', 'polite');

  wrap.innerHTML = `
    <div class="cbsgo-update-notice__card">
      <div class="cbsgo-update-notice__icon">${icon('compass', 22, { className: 'cbsgo-icon' })}</div>
      <div class="cbsgo-update-notice__body">
        <div class="cbsgo-update-notice__title">${title}</div>
        <div class="cbsgo-update-notice__text">${text}</div>
      </div>
      <div class="cbsgo-update-notice__actions">
        <button type="button" class="cbsgo-btn-primary cbsgo-update-notice__primary">${primaryLabel}</button>
        <button type="button" class="cbsgo-btn-secondary cbsgo-update-notice__secondary">${secondaryLabel}</button>
      </div>
    </div>
  `;

  const primaryBtn = wrap.querySelector('.cbsgo-update-notice__primary');
  const secondaryBtn = wrap.querySelector('.cbsgo-update-notice__secondary');

  primaryBtn?.addEventListener('click', () => {
    if (typeof onPrimary === 'function') onPrimary();
  });

  secondaryBtn?.addEventListener('click', () => {
    removeNotice(id);
    if (typeof onSecondary === 'function') onSecondary();
  });

  document.body.appendChild(wrap);
}

export function showUpdateAvailable({ onUpdate, onLater } = {}) {
  mountNotice({
    id: UPDATE_NOTICE_ID,
    title: 'Update available',
    text: 'A new CBS-GO version is ready. Update now to get the latest game UI and fixes.',
    primaryLabel: 'Update now',
    onPrimary: () => {
      if (typeof onUpdate === 'function') onUpdate();
    },
    secondaryLabel: 'Later',
    onSecondary: onLater,
  });
}

export function showAppUpdatedNotice({ onRefresh, onDismiss } = {}) {
  mountNotice({
    id: VERSION_NOTICE_ID,
    title: 'Refresh recommended',
    text: 'This device may still be running an older CBS-GO build. Refresh to load the latest game UI and fixes.',
    primaryLabel: 'Refresh now',
    onPrimary: () => {
      if (typeof onRefresh === 'function') onRefresh();
    },
    secondaryLabel: 'Later',
    onSecondary: onDismiss,
  });
}

export function dismissUpdateNotices() {
  removeNotice(UPDATE_NOTICE_ID);
  removeNotice(VERSION_NOTICE_ID);
}
