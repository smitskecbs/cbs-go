// src/ui/loginModal.js
// Login gate: start altijd met Email login modal.
// Recovery: als je via Supabase recovery link binnenkomt (?type=recovery),
// dan openen we direct SetPinModal zodat je een nieuwe PIN kan kiezen.

import { supabase } from '../app/supabaseClient.js';
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

export async function openLoginModal() {
  // ✅ Recovery detect BEFORE we mount anything
  if (hasRecoveryFlag()) {
    remove();
    openSetPinModal();
    return;
  }

  // ✅ Check existing Supabase session first
  let existingUser = null;
  try {
    const { data, error } = await supabase.auth.getSession();
    if (!error) {
      existingUser = data?.session?.user || null;
    }
  } catch (e) {
    console.warn('CBS-GO: session check failed', e);
  }

  // ---------- PIN only flow (already logged in) ----------
  if (existingUser) {
    const html = `
      <div style="
        width:min(420px, 92vw);
        border-radius:22px;
        border:1px solid rgba(255, 159, 28,.85);
        background:linear-gradient(165deg,#fffbf3 0%,#ffe9b8 100%);
        box-shadow:0 24px 80px rgba(74,52,32,.18);
        padding:18px 16px 16px 16px;
        color:#3d2a10;
        font-family:system-ui,sans-serif;
      ">
        <h2 style="margin:0 0 6px 0;font-size:18px;">Welcome back</h2>
        <p style="margin:0 0 14px 0;font-size:12px;opacity:.8;">
          Session found for <b>${existingUser.email || 'your account'}</b>.<br/>
          Enter your 6-digit PIN to unlock CBS-GO.
        </p>

        <input
          id="cbsgoPinOnlyInput"
          inputmode="numeric"
          type="password"
          maxlength="6"
          placeholder="••••••"
          style="
            width:100%;
            padding:12px 14px;
            border-radius:14px;
            border:1px solid rgba(255,159,28,.14);
            background:#fff8eb;
            color:#3d2a10;
            font-size:14px;
            outline:none;
            margin-bottom:10px;
          "
        />

        <button id="cbsgoPinOnlyBtn" type="button" class="cbsgo-login-btn cbsgo-login-btn--primary">Unlock with PIN</button>

        <button id="cbsgoUseOtherAccountBtn" type="button" class="cbsgo-login-btn cbsgo-login-btn--secondary">Use another account</button>

        <div id="cbsgoLoginMsg" style="margin-top:10px;font-size:12px;opacity:.9;"></div>
      </div>
    `;

    const wrap = mount(html);

    const msgEl = wrap.querySelector('#cbsgoLoginMsg');
    const pinInput = wrap.querySelector('#cbsgoPinOnlyInput');
    const pinBtn = wrap.querySelector('#cbsgoPinOnlyBtn');
    const otherBtn = wrap.querySelector('#cbsgoUseOtherAccountBtn');

    const setMsg = (t) => {
      if (msgEl) msgEl.textContent = t || '';
    };

    const done = (detail = {}) => {
      remove();
      window.dispatchEvent(new CustomEvent('cbsgo:loginDone', { detail }));
    };

    const cleanPin = (raw) => String(raw || '').replace(/\D/g, '').slice(0, 6);

    if (pinInput) {
      pinInput.addEventListener('input', () => {
        const next = cleanPin(pinInput.value);
        if (pinInput.value !== next) pinInput.value = next;
      });
      try { pinInput.focus(); } catch {}
    }

    if (pinBtn) {
      pinBtn.onclick = () => {
        const pin = cleanPin(pinInput?.value || '');
        if (pin.length !== 6) {
          setMsg('⛔ Enter your 6-digit PIN.');
          return;
        }

        setMsg('✅ Session found. Unlocking…');
        done({ pin, email: existingUser.email || '' });
      };
    }

    if (otherBtn) {
      otherBtn.onclick = async () => {
        try {
          if (typeof window.__cbsgo_flushProgressSync === 'function') {
            await window.__cbsgo_flushProgressSync('pre-signout');
          }
        } catch (e) {
          console.warn('CBS-GO: pre-signOut progress flush failed', e);
        }
        try {
          await supabase.auth.signOut();
        } catch (e) {
          console.warn('CBS-GO: signOut failed', e);
        }
        remove();
        openLoginModal();
      };
    }

    return;
  }

  // ---------- Normal email login flow ----------
  const html = `
    <div style="
      width:min(420px, 92vw);
      border-radius:22px;
      border:1px solid rgba(255, 159, 28,.85);
      background:linear-gradient(165deg,#fffbf3 0%,#ffe9b8 100%);
      box-shadow:0 24px 80px rgba(74,52,32,.18);
      padding:18px 16px 16px 16px;
      color:#3d2a10;
      font-family:system-ui,sans-serif;
    ">
      <h2 style="margin:0 0 6px 0;font-size:18px;">Welcome to CBS-GO</h2>
      <p style="margin:0 0 14px 0;font-size:12px;opacity:.8;">
        Login with email + PIN to unlock your wallet and continue your journey.
      </p>

      <button id="cbsgoEmailBtn" type="button" class="cbsgo-login-btn cbsgo-login-btn--primary">Login with Email</button>

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