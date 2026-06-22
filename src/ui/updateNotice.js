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
  tertiaryLabel,
  onTertiary,
}) {
  removeNotice(id);

  const wrap = document.createElement('div');
  wrap.id = id;
  wrap.className = 'cbsgo-update-notice';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-live', 'polite');

  const tertiaryHtml = tertiaryLabel
    ? `<button type="button" class="cbsgo-btn-secondary cbsgo-update-notice__tertiary">${tertiaryLabel}</button>`
    : '';

  wrap.innerHTML = `
    <div class="cbsgo-update-notice__card">
      <div class="cbsgo-update-notice__icon">${icon('compass', 22, { className: 'cbsgo-icon' })}</div>
      <div class="cbsgo-update-notice__body">
        <div class="cbsgo-update-notice__title">${title}</div>
        <div class="cbsgo-update-notice__text">${text}</div>
        <div class="cbsgo-update-notice__status" aria-live="polite"></div>
      </div>
      <div class="cbsgo-update-notice__actions">
        <button type="button" class="cbsgo-btn-primary cbsgo-update-notice__primary">${primaryLabel}</button>
        <button type="button" class="cbsgo-btn-secondary cbsgo-update-notice__secondary">${secondaryLabel}</button>
        ${tertiaryHtml}
      </div>
    </div>
  `;

  wrap.querySelector('.cbsgo-update-notice__primary')?.addEventListener('click', () => {
    if (typeof onPrimary === 'function') onPrimary();
  });

  wrap.querySelector('.cbsgo-update-notice__secondary')?.addEventListener('click', () => {
    removeNotice(id);
    if (typeof onSecondary === 'function') onSecondary();
  });

  wrap.querySelector('.cbsgo-update-notice__tertiary')?.addEventListener('click', () => {
    if (typeof onTertiary === 'function') onTertiary();
  });

  document.body.appendChild(wrap);
}

export function setUpdateNoticeStatus(message) {
  const el =
    document.querySelector('#cbsgoUpdateNotice .cbsgo-update-notice__status') ||
    document.querySelector('#cbsgoVersionNotice .cbsgo-update-notice__status');
  if (el) el.textContent = message || '';
}

export function showUpdateAvailable({ onUpdate, onLater, onCheckUpdate } = {}) {
  mountNotice({
    id: UPDATE_NOTICE_ID,
    title: 'New version available',
    text: 'A new CBS-GO version is ready. Update now to load the latest UI and fixes. If the app still looks old, use Force app update in Profile.',
    primaryLabel: 'Update now',
    onPrimary: () => {
      if (typeof onUpdate === 'function') onUpdate();
    },
    secondaryLabel: 'Later',
    onSecondary: onLater,
    tertiaryLabel: onCheckUpdate ? 'Check for update' : '',
    onTertiary: onCheckUpdate,
  });
}

export function showAppUpdatedNotice({ onRefresh, onDismiss, onCheckUpdate } = {}) {
  mountNotice({
    id: VERSION_NOTICE_ID,
    title: 'New version available',
    text: 'A newer CBS-GO version is available. Tap Refresh now, or use Force app update in Profile if this screen still looks old.',
    primaryLabel: 'Refresh now',
    onPrimary: () => {
      if (typeof onRefresh === 'function') onRefresh();
    },
    secondaryLabel: 'Later',
    onSecondary: onDismiss,
    tertiaryLabel: onCheckUpdate ? 'Check for update' : '',
    onTertiary: onCheckUpdate,
  });
}

export function dismissUpdateNotices() {
  removeNotice(UPDATE_NOTICE_ID);
  removeNotice(VERSION_NOTICE_ID);
}
