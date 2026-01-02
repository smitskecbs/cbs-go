// src/app/wakeLock.js
// Scherm wakker houden tijdens het spelen (waar ondersteund).

let wakeLock = null;

// Probeer wake lock aan te zetten
export async function enableWakeLock() {
  try {
    if ('wakeLock' in navigator && navigator.wakeLock?.request) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('CBS-GO: wake lock actief');

      wakeLock.addEventListener('release', () => {
        console.log('CBS-GO: wake lock vrijgegeven');
      });
    } else {
      console.log('CBS-GO: wake lock niet ondersteund in deze browser');
    }
  } catch (err) {
    console.warn('CBS-GO: wake lock request faalde', err);
  }
}

export async function disableWakeLock() {
  try {
    if (wakeLock) {
      await wakeLock.release();
      wakeLock = null;
      console.log('CBS-GO: wake lock handmatig vrijgegeven');
    }
  } catch (err) {
    console.warn('CBS-GO: wake lock release faalde', err);
  }
}

// Als tab naar achtergrond gaat / terugkomt -> opnieuw aanvragen of loslaten
export function bindWakeLockVisibilityHandler() {
  if (!('wakeLock' in navigator)) return;

  document.addEventListener('visibilitychange', async () => {
    try {
      if (document.visibilityState === 'visible') {
        await enableWakeLock();
      } else {
        await disableWakeLock();
      }
    } catch (e) {
      console.warn('CBS-GO: visibility wake lock error', e);
    }
  });
}
