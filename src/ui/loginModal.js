// src/ui/loginModal.js
// Login gate: start altijd met Email login modal.
// Recovery: als je via Supabase recovery link binnenkomt (?type=recovery),
// dan openen we direct SetPinModal zodat je een nieuwe PIN kan kiezen.

import { openEmailLoginModal } from './emailLoginModal.js';
import { openSetPinModal } from './setPinModal.js';

const MODAL_ID = 'cbsgoLoginWrap';

function remove() {
  const el = document.getElementById(MODAL_ID);
  if (el) el.remove();
}

function mount(html) {
  remove();
  const wrap = document.createElement('div');
  wrap.id = MODAL_ID;
  wrap.style.position = 'fixed';
  wrap.style.inset = '0';
  wrap.style.zIndex = '10000';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.padding = '16px';
  wrap.style.background = 'rgba(5,7,11,0.85)';
  wrap.style.pointerEvents = 'auto';
  wrap.innerHTML = html;
  document.body.appendChild(wrap);
  return wrap;
}

function hasRecoveryFlag() {
  try {
    const search = new URLSearchParams(window.location.search || '');
    if (search.get('type') === 'recovery') return true;
  } catch {}

  // fallback for older links / weird hashes
  try {
    const hash = String(window.location.hash || '');
    if (hash.includes('type=recovery')) return true;
  } catch {}

  return false;
}

export function openLoginModal() {
  // ✅ Recovery detect BEFORE we mount the welcome modal
  if (hasRecoveryFlag()) {
    remove();
    openSetPinModal();
    return;
  }

  // ✅ Normale flow: welcome modal
  const html = `
    <div style="
      width:min(420px, 92vw);
      border-radius:22px;
      border:1px solid rgba(56,189,248,.85);
      background:rgba(10,12,18,.98);
      box-shadow:0 24px 80px rgba(0,0,0,.88);
      padding:18px 16px 16px 16px;
      color:#fff;
      font-family:system-ui,sans-serif;
    ">
      <h2 style="margin:0 0 6px 0;font-size:18px;">Welcome to CBS-GO</h2>
      <p style="margin:0 0 14px 0;font-size:12px;opacity:.8;">
        Login with email + PIN to unlock your wallet and continue your journey.
      </p>

      <button id="cbsgoEmailBtn" type="button" style="
        width:100%;
        padding:12px 14px;
        border-radius:999px;
        border:1px solid rgba(56,189,248,.9);
        background:rgba(56,189,248,.2);
        color:#e0f2fe;
        font-size:14px;
        font-weight:700;
        cursor:pointer;
      ">Login with Email</button>

      <div id="cbsgoLoginMsg" style="margin-top:10px;font-size:12px;opacity:.9;"></div>
    </div>
  `;

  const wrap = mount(html);

  const msgEl = wrap.querySelector('#cbsgoLoginMsg');
  const setMsg = (t) => {
    if (msgEl) msgEl.textContent = t || '';
  };

  const done = (detail = {}) => {
    remove();
    window.dispatchEvent(new CustomEvent('cbsgo:loginDone', { detail }));
  };

  const onEmailDone = (ev) => {
    const d = ev?.detail || {};
    const pin = d.pin || '';
    const email = d.email || '';

    if (!pin || String(pin).length !== 6) {
      setMsg('⛔ Missing PIN (internal). Please login again.');
      return;
    }

    setMsg('✅ Email login ok. Starting game…');
    window.removeEventListener('cbsgo:emailLoginDone', onEmailDone);
    done({ pin, email });
  };

  window.addEventListener('cbsgo:emailLoginDone', onEmailDone);

  const emailBtn = wrap.querySelector('#cbsgoEmailBtn');
  if (emailBtn) {
    emailBtn.onclick = () => {
      setMsg('Opening email login…');
      openEmailLoginModal();
    };
  }
}
