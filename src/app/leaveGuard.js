// Confirm before leaving CBS-GO (browser back / tab close).

import { showConfirmDialog } from '../ui/confirmDialog.js';

let guardActive = false;
let leaveConfirmed = false;
let guardInitialized = false;

function onBeforeUnload(e) {
  if (!guardActive || leaveConfirmed) return;
  e.preventDefault();
  e.returnValue = '';
}

async function onPopState() {
  if (!guardActive || leaveConfirmed) return;

  const leave = await showConfirmDialog({
    title: 'Leave CBS-GO?',
    message: 'Are you sure you want to exit the game?',
    confirmLabel: 'Leave',
    cancelLabel: 'Stay',
    danger: true,
  });

  if (leave) {
    leaveConfirmed = true;
    guardActive = false;
    window.removeEventListener('beforeunload', onBeforeUnload);
    history.back();
    return;
  }

  try {
    history.pushState({ cbsgoLeaveGuard: 1 }, '', window.location.href);
  } catch {}
}

/** Activate after gameplay shell is loaded (not during login/onboarding). */
export function initLeaveGuard() {
  if (guardInitialized || typeof window === 'undefined') return;
  guardInitialized = true;
  guardActive = true;

  try {
    history.pushState({ cbsgoLeaveGuard: 1 }, '', window.location.href);
  } catch {}

  window.addEventListener('popstate', onPopState);
  window.addEventListener('beforeunload', onBeforeUnload);
}
