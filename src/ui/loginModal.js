// src/ui/loginModal.js
// First-time login flow:
// - User sets nickname + PIN -> creates local encrypted wallet
// Returning user:
// - PIN only -> unlock wallet
//
// Emits: cbsgo:loginDone

import { hasWallet, createWallet, unlockWallet } from '../app/wallet.js';
import { getPlayerName, setPlayerName } from '../app/leaderboard.js';

const MODAL_ID = 'cbsgoLoginModal';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

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

function shell(title, bodyHtml) {
  return `
    <div style="
      width:min(720px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.55);
      color:#fff;
      font-family:system-ui, sans-serif;
      overflow:hidden;
    ">
      <div style="
        padding:14px 16px;
        border-bottom:1px solid rgba(255,255,255,.10);
        font-weight:900;
        font-size:16px;
      ">${esc(title)}</div>

      <div style="padding:14px 16px;">
        ${bodyHtml}
      </div>
    </div>
  `;
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

export function openLoginModal() {
  const firstTime = !hasWallet();
  const curName = getPlayerName() || '';

  const body = firstTime
    ? `
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${esc(curName)}" style="${inputStyle()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${inputStyle()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${inputStyle()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${btnStyle(true)}">Create Wallet & Start</button>
      </div>
    `
    : `
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${inputStyle()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${btnStyle(true)}">Unlock</button>
      </div>
    `;

  const wrap = mount(shell(firstTime ? 'Welcome to CBS-GO' : 'Unlock Wallet', body));

  const msg = wrap.querySelector('#cbsgoLoginMsg');
  const setMsg = (t) => { if (msg) msg.textContent = t || ''; };

  const pin = wrap.querySelector('#cbsgoPin');
  const pin2 = wrap.querySelector('#cbsgoPin2');
  const nick = wrap.querySelector('#cbsgoNick');

  const done = () => {
    remove();
    window.dispatchEvent(new CustomEvent('cbsgo:loginDone', { detail: {} }));
  };

  if (firstTime) {
    const btn = wrap.querySelector('#cbsgoCreateBtn');
    if (btn) {
      btn.onclick = async () => {
        try {
          const n = String(nick?.value || '').trim();
          const p = String(pin?.value || '').trim();
          const p2 = String(pin2?.value || '').trim();

          if (n.length < 2) return setMsg('⛔ Nickname too short.');
          if (p.length < 4) return setMsg('⛔ PIN must be at least 4 digits.');
          if (p !== p2) return setMsg('⛔ PINs do not match.');

          setMsg('Creating wallet…');

          setPlayerName(n);
          await createWallet(p); // sync of async, allebei ok met await

          setMsg('✅ Wallet created. Starting…');
          done();
        } catch (e) {
          setMsg(`⛔ ${String(e?.message || e)}`);
        }
      };
    }
  } else {
    const btn = wrap.querySelector('#cbsgoUnlockBtn');
    if (btn) {
      btn.onclick = async () => {
        try {
          const p = String(pin?.value || '').trim();
          if (p.length < 4) return setMsg('⛔ PIN must be at least 4 digits.');

          setMsg('Unlocking…');
          await unlockWallet(p);

          setMsg('✅ Unlocked.');
          done();
        } catch (e) {
          setMsg('⛔ Wrong PIN (or wallet data missing).');
        }
      };
    }
  }
}
