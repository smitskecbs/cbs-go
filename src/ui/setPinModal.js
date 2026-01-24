// src/ui/setPinModal.js
// Recovery flow with two options:
// A) Keep wallet (needs OLD PIN)
// B) Lost old PIN -> Create NEW wallet for same email (overwrite vault)
//
// Also supports direct new-wallet mode via URL:
// ?type=recovery&mode=newwallet

import { supabase } from '../app/supabaseClient.js';
import { importWalletFromSecret } from '../app/wallet.js';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

const MODAL_ID = 'cbsgoSetPinModal';

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
  wrap.style.background = 'rgba(0,0,0,.75)';
  wrap.style.backdropFilter = 'blur(12px)';
  wrap.innerHTML = html;
  document.body.appendChild(wrap);
  return wrap;
}

function cleanPin6(raw) {
  return String(raw || '').replace(/\D/g, '').slice(0, 6);
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

// --- crypto helpers ---
function b64(bytes) {
  let bin = '';
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin);
}

function unb64(str) {
  const bin = atob(String(str || ''));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(pin6, saltBytes) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(pin6),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBytes, iterations: 120000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptString(pin6, plainText) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin6, salt);

  const enc = new TextEncoder();
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(String(plainText || '')),
  );

  return { enc_secret: b64(new Uint8Array(cipherBuf)), salt: b64(salt), iv: b64(iv) };
}

async function decryptString(pin6, row) {
  const salt = unb64(row.salt);
  const iv = unb64(row.iv);
  const data = unb64(row.enc_secret);
  const key = await deriveKey(pin6, salt);

  const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  return new TextDecoder().decode(plainBuf);
}

function getMode() {
  try {
    const sp = new URLSearchParams(window.location.search || '');
    return String(sp.get('mode') || '');
  } catch {
    return '';
  }
}

function clearRecoveryUrl() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('type');
    url.searchParams.delete('mode');
    url.hash = '';
    history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
  } catch {
    try { history.replaceState(null, '', window.location.pathname); } catch {}
  }
}

export function openSetPinModal() {
  const mode = getMode();
  const isNewWalletMode = mode === 'newwallet';

  const body = `
    <div style="
      width:min(780px, 96vw);
      border-radius:22px;
      border:1px solid rgba(56,189,248,.7);
      background:rgba(10,12,18,.95);
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
      ">Recovery: set a new PIN</div>

      <div style="padding:14px 16px;">
        <div style="opacity:.88; font-size:13px; line-height:1.4;">
          ${isNewWalletMode
            ? `Lost PIN mode: you will create a <b>NEW wallet</b> for this email (old vault wallet replaced).`
            : `Choose one option:<br/>- <b>Keep wallet</b> (needs OLD PIN)<br/>- <b>Lost PIN</b> → create NEW wallet (keeps email)`}
        </div>

        <div id="keepBlock" style="margin-top:14px; padding:12px; border:1px solid rgba(255,255,255,.10); border-radius:16px; background:rgba(255,255,255,.04); ${isNewWalletMode ? 'display:none;' : ''}">
          <div style="font-weight:900; margin-bottom:8px;">Option A — Keep wallet (needs OLD PIN)</div>

          <div style="margin-top:10px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Old PIN (6 digits)</div>
            <input id="cbsgoOldPin" inputmode="numeric" type="password" maxlength="6" style="${inputStyle()}" placeholder="••••••" />
          </div>
        </div>

        <div style="margin-top:12px; padding:12px; border:1px solid rgba(255,255,255,.10); border-radius:16px; background:rgba(255,255,255,.04);">
          <div style="font-weight:900; margin-bottom:8px;">New PIN</div>

          <div style="margin-top:10px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:6px;">New PIN (6 digits)</div>
            <input id="cbsgoNewPin" inputmode="numeric" type="password" maxlength="6" style="${inputStyle()}" placeholder="••••••" />
          </div>

          <div style="margin-top:12px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat new PIN</div>
            <input id="cbsgoNewPin2" inputmode="numeric" type="password" maxlength="6" style="${inputStyle()}" placeholder="••••••" />
          </div>
        </div>

        <div id="cbsgoSetPinMsg" style="margin-top:12px; font-size:13px; opacity:.92;"></div>

        <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
          <button id="cbsgoKeepWalletBtn" type="button" style="${btnStyle(true)}" ${isNewWalletMode ? 'style="display:none;"' : ''}>Keep wallet (use OLD PIN)</button>
          <button id="cbsgoNewWalletBtn" type="button" style="${btnStyle(false)}">${isNewWalletMode ? 'Create NEW wallet' : 'I lost old PIN → Create NEW wallet'}</button>
        </div>

        <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
          <button id="cbsgoSetPinCancel" type="button" style="${btnStyle(false)}">Cancel</button>
        </div>

        <div style="margin-top:10px; font-size:11px; opacity:.75;">
          Note: NEW wallet replaces the vault wallet. Later we’ll add seed backup.
        </div>
      </div>
    </div>
  `;

  const wrap = mount(body);

  const oldEl = wrap.querySelector('#cbsgoOldPin');
  const pin1 = wrap.querySelector('#cbsgoNewPin');
  const pin2 = wrap.querySelector('#cbsgoNewPin2');
  const msgEl = wrap.querySelector('#cbsgoSetPinMsg');

  const keepBtn = wrap.querySelector('#cbsgoKeepWalletBtn');
  const newWalletBtn = wrap.querySelector('#cbsgoNewWalletBtn');
  const cancel = wrap.querySelector('#cbsgoSetPinCancel');

  const setMsg = (t) => { if (msgEl) msgEl.textContent = t || ''; };

  const bindPin = (el) => {
    if (!el) return;
    el.addEventListener('input', () => {
      const next = cleanPin6(el.value);
      if (el.value !== next) el.value = next;
    });
  };
  bindPin(oldEl);
  bindPin(pin1);
  bindPin(pin2);

  try { pin1 && pin1.focus(); } catch {}

  function setBusy(on) {
    if (keepBtn) keepBtn.disabled = !!on;
    if (newWalletBtn) newWalletBtn.disabled = !!on;
    if (cancel) cancel.disabled = !!on;
  }

  if (cancel) cancel.onclick = () => remove();

  async function getUserOrFail() {
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr) throw authErr;
    const user = authData?.user;
    if (!user?.id) throw new Error('No recovery session. Open the recovery email link again.');
    return user;
  }

  async function loadVaultRow(userId) {
    const { data: vaultRow, error: vaultErr } = await supabase
      .from('wallet_vault')
      .select('user_id,wallet_pk,enc_secret,salt,iv')
      .eq('user_id', userId)
      .maybeSingle();
    if (vaultErr) throw vaultErr;
    return vaultRow;
  }

  async function upsertVault(userId, wallet_pk, secretKeyBase58, newPin6) {
    const encrypted = await encryptString(newPin6, secretKeyBase58);
    const { error: upErr } = await supabase
      .from('wallet_vault')
      .upsert({ user_id: userId, wallet_pk, ...encrypted }, { onConflict: 'user_id' });
    if (upErr) throw upErr;
  }

  // ✅ Important: allow "same password" for NEW wallet flow (don’t fail the whole process)
  async function updateSupabasePasswordAllowSame(newPin6) {
    const { error: pwErr } = await supabase.auth.updateUser({ password: newPin6 });
    if (!pwErr) return;

    const msg = String(pwErr.message || '').toLowerCase();
    const isSame =
      msg.includes('different from the old') ||
      msg.includes('same password') ||
      msg.includes('should be different');

    if (isSame) {
      // For NEW wallet flow this is fine: user kept same PIN.
      return;
    }

    throw pwErr;
  }

  async function finishSuccess() {
    setMsg('✅ Done. Reloading…');
    clearRecoveryUrl();
    setTimeout(() => {
      remove();
      window.location.reload();
    }, 650);
  }

  function validateNewPins() {
    const p1 = cleanPin6(pin1?.value || '');
    const p2 = cleanPin6(pin2?.value || '');
    if (p1.length !== 6) return { ok: false, p1, p2, msg: '⛔ New PIN must be exactly 6 digits.' };
    if (p1 !== p2) return { ok: false, p1, p2, msg: '⛔ New PINs do not match.' };
    return { ok: true, p1, p2, msg: '' };
  }

  // OPTION A: Keep wallet (needs old pin)
  if (keepBtn) {
    keepBtn.onclick = async () => {
      const oldPin = cleanPin6(oldEl?.value || '');
      const v = validateNewPins();
      if (!v.ok) return setMsg(v.msg);
      if (oldPin.length !== 6) return setMsg('⛔ Old PIN must be exactly 6 digits.');

      setBusy(true);
      setMsg('Working… (decrypt vault, re-encrypt, update PIN)');

      try {
        const user = await getUserOrFail();

        const vaultRow = await loadVaultRow(user.id);
        if (!vaultRow) return setMsg('⛔ No wallet vault found for this account.');

        let secretKeyBase58 = '';
        try {
          secretKeyBase58 = await decryptString(oldPin, vaultRow);
        } catch {
          return setMsg('⛔ Old PIN is wrong. Cannot unlock your wallet vault.');
        }

        await upsertVault(user.id, String(vaultRow.wallet_pk || ''), secretKeyBase58, v.p1);

        // Here: must update password; same-password should be blocked (keep wallet expects real change)
        const { error: pwErr } = await supabase.auth.updateUser({ password: v.p1 });
        if (pwErr) return setMsg('⛔ New PIN must be different from old PIN.');

        try { importWalletFromSecret({ secretKeyBase58, pin: v.p1 }); } catch {}

        await finishSuccess();
      } catch (e) {
        console.warn('CBS GO: setPin keep-wallet failed', e);
        setMsg('⛔ Failed. Check console.');
      } finally {
        setBusy(false);
      }
    };
  }

  // OPTION B: Lost old pin -> NEW wallet (overwrite vault)
  if (newWalletBtn) {
    newWalletBtn.onclick = async () => {
      const v = validateNewPins();
      if (!v.ok) return setMsg(v.msg);

      const ok = confirm(
        'Create a NEW wallet for this email?\n\nThis will REPLACE the existing vault wallet.\n\nContinue?',
      );
      if (!ok) return;

      setBusy(true);
      setMsg('Working… (create new wallet, encrypt, update PIN)');

      try {
        const user = await getUserOrFail();

        const kp = Keypair.generate();
        const wallet_pk = kp.publicKey.toBase58();
        const secretKeyBase58 = bs58.encode(kp.secretKey);

        await upsertVault(user.id, wallet_pk, secretKeyBase58, v.p1);

        // ✅ Allow "same password" without failing for NEW wallet flow
        await updateSupabasePasswordAllowSame(v.p1);

        try { importWalletFromSecret({ secretKeyBase58, pin: v.p1 }); } catch {}

        await finishSuccess();
      } catch (e) {
        console.warn('CBS GO: setPin new-wallet failed', e);
        setMsg('⛔ Failed. Check console.');
      } finally {
        setBusy(false);
      }
    };
  }
}
