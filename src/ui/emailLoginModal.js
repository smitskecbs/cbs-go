// src/ui/emailLoginModal.js
// Email + 6-digit PIN login (Supabase signInWithPassword / signUp)
//
// Emits: cbsgo:emailLoginDone { detail: { email, pin } }

import { supabase } from '../app/supabaseClient.js';

const MODAL_ID = 'cbsgoEmailLogin';

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
  wrap.style.zIndex = '999999';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.padding = '16px';
  wrap.style.background = 'rgba(0,0,0,.70)';
  wrap.style.backdropFilter = 'blur(12px)';
  wrap.innerHTML = html;
  document.body.appendChild(wrap);
  return wrap;
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

function btnStyle(primary = true) {
  return `
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${primary ? 'rgba(90,200,255,.22)' : 'rgba(255,255,255,.08)'};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `;
}

function isValidEmail(s) {
  const v = String(s || '').trim();
  return v.includes('@') && v.includes('.') && v.length >= 6;
}

function cleanPin(raw) {
  return String(raw || '').replace(/\D/g, '').slice(0, 6);
}

function dispatchDone(email, pin) {
  window.dispatchEvent(
    new CustomEvent('cbsgo:emailLoginDone', { detail: { email, pin } }),
  );
}

export function openEmailLoginModal() {
  const body = `
    <div style="
      width:min(620px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      color:#fff;
      box-shadow:0 18px 60px rgba(0,0,0,.55);
      font-family:system-ui, sans-serif;
      overflow:hidden;
    ">
      <div style="
        padding:14px 16px;
        border-bottom:1px solid rgba(255,255,255,.10);
        font-weight:900;
        font-size:16px;
      ">Email + PIN</div>

      <div style="padding:14px 16px;">
        <div style="opacity:.85; font-size:13px; line-height:1.35;">
          Login with your email and a <b>6-digit PIN</b>.
          After login you will set your nickname and profile photo.
        </div>

        <div style="margin-top:12px;">
          <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Email</div>
          <input id="cbsgoEmail" type="email" style="${inputStyle()}" placeholder="you@email.com" />
        </div>

        <div style="margin-top:12px;">
          <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN (exactly 6 digits)</div>
          <input
            id="cbsgoPin"
            inputmode="numeric"
            autocomplete="one-time-code"
            type="password"
            maxlength="6"
            style="${inputStyle()}"
            placeholder="••••••"
          />
        </div>

        <div id="cbsgoEmailMsg" style="margin-top:10px; font-size:13px; opacity:.92;"></div>

        <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
          <button id="cbsgoEmailLoginBtn" type="button" style="${btnStyle(true)}">Login</button>
          <button id="cbsgoEmailCreateBtn" type="button" style="${btnStyle(false)}">Create account</button>
        </div>

        <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
          <button id="cbsgoEmailChangePinBtn" type="button" style="${btnStyle(false)}">Change PIN (keep wallet)</button>
          <button id="cbsgoEmailResetBtn" type="button" style="${btnStyle(false)}">Forgot PIN (reset device)</button>
          <button id="cbsgoEmailClose" type="button" style="${btnStyle(false)}">Cancel</button>
        </div>

        <div style="margin-top:10px; font-size:11px; opacity:.75;">
          - <b>Change PIN</b> keeps wallet but requires OLD PIN.<br/>
          - <b>Reset device</b> wipes local data on this device.
        </div>
      </div>
    </div>
  `;

  const wrap = mount(body);

  const emailEl = wrap.querySelector('#cbsgoEmail');
  const pinEl = wrap.querySelector('#cbsgoPin');
  const msgEl = wrap.querySelector('#cbsgoEmailMsg');

  const loginBtn = wrap.querySelector('#cbsgoEmailLoginBtn');
  const createBtn = wrap.querySelector('#cbsgoEmailCreateBtn');
  const changePinBtn = wrap.querySelector('#cbsgoEmailChangePinBtn');
  const resetBtn = wrap.querySelector('#cbsgoEmailResetBtn');
  const closeBtn = wrap.querySelector('#cbsgoEmailClose');

  const setMsg = (t) => { if (msgEl) msgEl.textContent = t || ''; };

  try { emailEl && emailEl.focus(); } catch {}

  if (pinEl) {
    pinEl.addEventListener('input', () => {
      const next = cleanPin(pinEl.value);
      if (pinEl.value !== next) pinEl.value = next;
    });
  }

  if (closeBtn) closeBtn.onclick = () => remove();

  wrap.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { ev.preventDefault(); doLogin(false).catch(() => {}); }
    if (ev.key === 'Escape') { ev.preventDefault(); remove(); }
  });

  function setBusy(on) {
    if (loginBtn) loginBtn.disabled = !!on;
    if (createBtn) createBtn.disabled = !!on;
    if (changePinBtn) changePinBtn.disabled = !!on;
    if (resetBtn) resetBtn.disabled = !!on;
    if (closeBtn) closeBtn.disabled = !!on;
  }

  async function doLogin(isCreate) {
    const email = String(emailEl?.value || '').trim();
    const pin = cleanPin(pinEl?.value || '');

    if (!isValidEmail(email)) return setMsg('⛔ Invalid email.');
    if (pin.length !== 6) return setMsg('⛔ PIN must be exactly 6 digits.');

    setBusy(true);
    try {
      if (isCreate) {
        setMsg('Creating account…');
        const { error: signUpError } = await supabase.auth.signUp({ email, password: pin });
        if (signUpError) {
          const m = String(signUpError.message || '').toLowerCase();
          const already = m.includes('already') || m.includes('registered') || m.includes('exists');
          if (!already) return setMsg('⛔ ' + (signUpError.message || 'Sign up failed.'));
        }
        setMsg('Account ok. Logging in…');
      } else {
        setMsg('Logging in…');
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: pin });
      if (signInError) return setMsg('⛔ ' + (signInError.message || 'Login failed.'));

      setMsg('✅ Logged in.');
      dispatchDone(email, pin);
      remove();
    } catch (e) {
      console.warn('CBS GO: email+pin auth crashed', e);
      setMsg('⛔ Auth crashed (see console).');
    } finally {
      setBusy(false);
    }
  }

  // ✅ FIX: redirectTo via query param, NOT via hash
  async function doChangePin() {
    const email = String(emailEl?.value || '').trim();
    if (!isValidEmail(email)) return setMsg('⛔ Enter a valid email first.');

    setBusy(true);
    try {
      setMsg('Sending change-PIN email…');

      // ✅ IMPORTANT: use query param so Supabase can own the hash for tokens
      const redirectTo = 'https://smitskecbs.github.io/cbs-go/?type=recovery';

      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) return setMsg('⛔ ' + (error.message || 'Failed.'));

      setMsg('✅ Email sent. Open the link, then enter your OLD PIN to keep the wallet.');
    } catch (e) {
      console.warn('CBS GO: change pin email crashed', e);
      setMsg('⛔ Failed (see console).');
    } finally {
      setBusy(false);
    }
  }

  async function doResetDevice() {
    const ok = confirm(
      'Forgot PIN?\n\nThis will reset CBS-GO on THIS device (local data).\nIf you used an internal wallet vault, you may lose access to that wallet on this device.\n\nContinue?',
    );
    if (!ok) return;

    setBusy(true);
    try {
      setMsg('Resetting this device…');

      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.startsWith('cbsgo') || k.startsWith('CBSGO') || k.includes('cbs-go') || k.includes('cbsgo')) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));

      try { await supabase.auth.signOut(); } catch {}

      setMsg('✅ Reset done. Reloading…');
      setTimeout(() => window.location.reload(), 450);
    } catch (e) {
      console.warn('CBS GO: device reset failed', e);
      setMsg('⛔ Reset failed (see console).');
    } finally {
      setBusy(false);
    }
  }

  if (loginBtn) loginBtn.onclick = () => doLogin(false);
  if (createBtn) createBtn.onclick = () => doLogin(true);
  if (changePinBtn) changePinBtn.onclick = () => doChangePin();
  if (resetBtn) resetBtn.onclick = () => doResetDevice();
}
