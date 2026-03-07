// src/ui/friendsPanel.js
// Friends UI voor CBS-GO
//
// - Laat friends zien met nickname + avatar
// - Friend requests (incoming/outgoing)
// - Friend request sturen via wallet-adres

import {
  loadFriendsOverview,
  sendFriendRequest,
  acceptFriendRequest,
} from '../app/friends.js';
import { getPublicKey } from '../app/wallet.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function shortWallet(pk) {
  if (!pk) return '';
  const s = String(pk);
  if (s.length <= 12) return s;
  return `${s.slice(0, 4)}…${s.slice(-4)}`;
}

// ✅ Normalize avatar input to a clean data:image/*;base64,... URL
function normalizeImageDataUrl(input) {
  if (typeof input !== 'string') return '';
  let s = input.trim();
  if (!s) return '';

  // Sometimes saved as a quoted JSON string
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }

  // If it contains multiple "data:image" segments, keep the last one
  const last = s.lastIndexOf('data:image');
  if (last > 0) s = s.slice(last);

  // Already a data URL
  if (s.startsWith('data:image')) {
    const comma = s.indexOf(',');
    if (comma === -1) return '';

    const header = s.slice(0, comma);
    let b64 = s.slice(comma + 1);

    // Remove whitespace/newlines and any non-base64 characters
    b64 = b64.replace(/\s+/g, '');
    b64 = b64.replace(/[^A-Za-z0-9+/=]/g, '');

    const mimeMatch = header.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64$/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';

    if (!b64) return '';
    return `data:${mime};base64,${b64}`;
  }

  // Otherwise assume it's raw base64
  let b64 = s.replace(/\s+/g, '').replace(/[^A-Za-z0-9+/=]/g, '');
  if (!b64) return '';
  return `data:image/png;base64,${b64}`;
}

function avatarBubble(dataUrl, size = 32) {
  const safeUrl = normalizeImageDataUrl(dataUrl);
  const bg = safeUrl ? `background-image:url('${safeUrl}');` : '';
  const txt = safeUrl ? '' : '👤';

  return `
    <div style="
      flex-shrink:0;
      width:${size}px;
      height:${size}px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.25);
      background:rgba(15,23,42,.8);
      ${bg}
      background-size:cover;
      background-position:center;
      display:flex;
      align-items:center;
      justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">
      ${txt}
    </div>
  `;
}

function renderFriendRow(friend, extraRightHtml = '') {
  const name =
    friend.nickname && friend.nickname.trim()
      ? friend.nickname.trim()
      : shortWallet(friend.otherWallet);

  const walletLabel = shortWallet(friend.otherWallet);

  return `
    <div style="
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      padding:8px 10px;
      border-radius:14px;
      border:1px solid rgba(148,163,184,.45);
      background:rgba(15,23,42,.75);
      margin-bottom:6px;
    ">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        ${avatarBubble(friend.avatar, 34)}
        <div style="min-width:0;">
          <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${esc(name)}
          </div>
          <div style="font-size:11px;opacity:.7;">
            ${esc(walletLabel)}
          </div>
        </div>
      </div>
      <div style="flex-shrink:0;display:flex;align-items:center;gap:6px;">
        ${extraRightHtml}
      </div>
    </div>
  `;
}

export function renderFriendsPanel() {
  const myWallet = getPublicKey();
  const disabled = !myWallet;

  return `
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0;font-size:16px;">Friends</h3>
      <p style="margin:0 0 12px 0;font-size:12px;opacity:.75;">
        Add friends by wallet address. Once they accept, you'll see their nickname and avatar here.
      </p>

      <div style="
        border-radius:14px;
        border:1px solid rgba(148,163,184,.4);
        background:rgba(15,23,42,.85);
        padding:10px 10px;
        margin-bottom:14px;
      ">
        <label for="friendWalletInput" style="font-size:12px;opacity:.8;">
          Friend's wallet address
        </label>
        <input id="friendWalletInput" ${disabled ? 'disabled' : ''} placeholder="Paste wallet address"
          style="
            margin-top:4px;
            width:100%;
            padding:8px 10px;
            border-radius:10px;
            border:1px solid rgba(148,163,184,.6);
            background:rgba(15,23,42,.9);
            color:#fff;
            font-size:13px;
          " />

        <div style="display:flex;justify-content:flex-end;margin-top:8px;">
          <button id="sendFriendRequestBtn" ${disabled ? 'disabled' : ''} type="button" style="
            padding:7px 12px;
            border-radius:999px;
            border:1px solid rgba(94,234,212,.8);
            background:rgba(45,212,191,.15);
            color:#e0f2f1;
            font-size:12px;
            font-weight:600;
            cursor:pointer;
          ">
            ➕ Add friend
          </button>
        </div>
        <div id="friendsStatusMsg" style="margin-top:6px;font-size:11px;opacity:.9;"></div>
      </div>

      <div id="friendsLists">
        <!-- wordt gevuld door bindFriendsPanelEvents / refreshFriendsUI -->
        <div style="font-size:12px;opacity:.75;">Loading friends…</div>
      </div>
    </section>
  `;
}

export async function bindFriendsPanelEvents() {
  const input = document.querySelector('#friendWalletInput');
  const btn = document.querySelector('#sendFriendRequestBtn');
  const msg = document.querySelector('#friendsStatusMsg');
  const listsHost = document.querySelector('#friendsLists');

  const setMsg = (t) => {
    if (msg) msg.textContent = t || '';
  };

  async function refreshFriendsUI() {
    if (!listsHost) return;
    try {
      const overview = await loadFriendsOverview();
      const { accepted, incoming, outgoing } = overview;

      let html = '';

      // Your friends
      html += `
        <div style="margin-bottom:12px;">
          <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
            Your friends (${accepted.length})
          </div>
          ${
            accepted.length === 0
              ? `<div style="font-size:11px;opacity:.6;">No friends yet. Add someone with their wallet address.</div>`
              : accepted
                  .map((f) =>
                    renderFriendRow(
                      f,
                      `<span style="font-size:11px;opacity:.8;">✔︎ Friends</span>`
                    )
                  )
                  .join('')
          }
        </div>
      `;

      // Incoming
      html += `
        <div style="margin-bottom:12px;">
          <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
            Friend requests (${incoming.length})
          </div>
          ${
            incoming.length === 0
              ? `<div style="font-size:11px;opacity:.6;">No incoming requests.</div>`
              : incoming
                  .map((f) =>
                    renderFriendRow(
                      f,
                      `<button class="friends-accept-btn" data-id="${esc(f.id)}" type="button" style="
                         padding:5px 10px;
                         border-radius:999px;
                         border:1px solid rgba(52,211,153,.9);
                         background:rgba(16,185,129,.15);
                         color:#bbf7d0;
                         font-size:11px;
                         font-weight:600;
                         cursor:pointer;
                       ">Accept</button>`
                    )
                  )
                  .join('')
          }
        </div>
      `;

      // Outgoing
      html += `
        <div>
          <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
            Requests you sent (${outgoing.length})
          </div>
          ${
            outgoing.length === 0
              ? `<div style="font-size:11px;opacity:.6;">No pending outgoing requests.</div>`
              : outgoing
                  .map((f) =>
                    renderFriendRow(
                      f,
                      `<span style="font-size:11px;opacity:.8;">⏳ Pending</span>`
                    )
                  )
                  .join('')
          }
        </div>
      `;

      listsHost.innerHTML = html;

      // Accept-buttons koppelen
      document.querySelectorAll('.friends-accept-btn').forEach((b) => {
        b.addEventListener('click', async () => {
          const idRaw = b.getAttribute('data-id');
          const id = Number(idRaw);
          if (!Number.isFinite(id) || id <= 0) return;

          try {
            b.disabled = true;
            b.textContent = '…';
            await acceptFriendRequest(id);
            await refreshFriendsUI();
            setMsg('✅ Friend request accepted');
          } catch (e) {
            console.warn(e);
            setMsg(e?.message || 'Could not accept friend request.');
            b.disabled = false;
            b.textContent = 'Accept';
          }
        });
      });
    } catch (e) {
      console.warn('CBS GO: refreshFriendsUI failed', e);
      if (listsHost) {
        listsHost.innerHTML =
          '<div style="font-size:12px;color:#fecaca;">Failed to load friends.</div>';
      }
    }
  }

  if (btn) {
    btn.addEventListener('click', async () => {
      const value = (input?.value || '').trim();
      if (!value) return setMsg('Enter a wallet address first.');

      setMsg('Sending friend request…');
      try {
        await sendFriendRequest(value);
        if (input) input.value = '';
        setMsg('✅ Friend request sent');
        await refreshFriendsUI();
      } catch (e) {
        console.warn(e);
        setMsg(e?.message || 'Could not send friend request.');
      }
    });
  }

  await refreshFriendsUI();
}