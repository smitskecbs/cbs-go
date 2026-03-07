// src/ui/leaderboardPanel.js
import { sendFriendRequest, loadFriendsOverview } from '../app/friends.js';
import { loadLeaderboard } from '../app/leaderboard.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizeImageDataUrl(input) {
  if (typeof input !== 'string') return '';
  let s = input.trim();
  if (!s) return '';

  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }

  const last = s.lastIndexOf('data:image');
  if (last > 0) s = s.slice(last);

  if (s.startsWith('data:image')) {
    const comma = s.indexOf(',');
    if (comma === -1) return '';
    const header = s.slice(0, comma);
    let b64 = s.slice(comma + 1);
    b64 = b64.replace(/\s+/g, '').replace(/[^A-Za-z0-9+/=]/g, '');
    const mimeMatch = header.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64$/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    if (!b64) return '';
    return `data:${mime};base64,${b64}`;
  }

  let b64 = s.replace(/\s+/g, '').replace(/[^A-Za-z0-9+/=]/g, '');
  if (!b64) return '';
  return `data:image/png;base64,${b64}`;
}

function avatarCircle(dataUrl, size = 34) {
  const safeUrl = normalizeImageDataUrl(dataUrl);
  const bg = safeUrl ? `background-image:url('${safeUrl}');` : '';
  const txt = safeUrl ? '' : '👤';
  return `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(15,23,42,.85);
      ${bg}
      background-size:cover;background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;font-size:16px;flex-shrink:0;
    ">${txt}</div>
  `;
}

function friendCodeFromUid(uid) {
  return uid ? `CBS-${uid}` : '';
}

export function renderLeaderboardPanel() {
  return `
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(8,10,16,.30);
    ">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap;">
        <div>
          <h3 style="margin:0 0 4px 0;font-size:16px;">Leaderboard</h3>
          <div style="font-size:12px;opacity:.75;">
            Sovereign focus: ranking is based on <b>XP only</b>.
          </div>
        </div>
        <button id="lbRefreshBtn" type="button" style="
          padding:7px 12px;border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(255,255,255,.08);
          color:#fff;font-size:12px;font-weight:700;cursor:pointer;
        ">Refresh</button>
      </div>

      <div id="lbStatus" style="margin-top:10px;font-size:12px;opacity:.8;">Loading…</div>
      <div id="lbList" style="margin-top:10px;"></div>
      <div id="lbMsg" style="margin-top:10px;font-size:12px;opacity:.9;"></div>
    </section>
  `;
}

export function bindLeaderboardPanel() {
  const statusEl = document.querySelector('#lbStatus');
  const listEl = document.querySelector('#lbList');
  const msgEl = document.querySelector('#lbMsg');
  const refreshBtn = document.querySelector('#lbRefreshBtn');

  const setStatus = (t) => { if (statusEl) statusEl.textContent = t || ''; };
  const setMsg = (t) => { if (msgEl) msgEl.textContent = t || ''; };

  async function loadAndRender() {
    if (!listEl) return;
    setMsg('');
    setStatus('Loading players…');

    try {
      // ✅ Load accepted friends first
      const friendCodes = new Set();
      try {
        const ov = await loadFriendsOverview();
        const accepted = Array.isArray(ov?.accepted) ? ov.accepted : [];
        accepted.forEach((fr) => {
          const uid = String(fr?.otherUserId || fr?.other_user_id || fr?.uid || '').trim();
          if (uid) friendCodes.add(friendCodeFromUid(uid));
        });
      } catch (e) {
        console.warn('CBS GO: loadFriendsOverview failed (ignored)', e);
      }

      // ✅ from game_profiles (via app/leaderboard.js)
      const rowsRaw = await loadLeaderboard(250);
      const rows = Array.isArray(rowsRaw) ? rowsRaw : [];

      // Ensure we show also 0 xp players; sort by xp desc
      rows.sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0));

      setStatus(rows.length ? '' : 'No players found yet.');

      listEl.innerHTML = rows.map((r, idx) => {
        const uid = String(r.user_id || '').trim();
        const friendCode = friendCodeFromUid(uid);

        const name = String((r.nickname || 'Anon')).trim() || 'Anon';
        const xp = Number(r.xp || 0);

        const isFriend = friendCode && friendCodes.has(friendCode);

        const rightBtn = isFriend
          ? `
            <button type="button" disabled style="
              padding:7px 10px;border-radius:999px;
              border:1px solid rgba(34,197,94,.9);
              background:rgba(34,197,94,.18);
              color:#bbf7d0;font-size:12px;font-weight:900;
              cursor:default;
            ">✔ Friend</button>
          `
          : `
            <button class="lbAddFriendBtn" data-value="${esc(friendCode)}" type="button" style="
              padding:7px 10px;border-radius:999px;
              border:1px solid rgba(56,189,248,.9);
              background:rgba(56,189,248,.18);
              color:#e0f2fe;font-size:12px;font-weight:800;cursor:pointer;
            ">Add friend</button>
          `;

        return `
          <div style="
            padding:10px 10px;
            border-radius:14px;
            border:1px solid rgba(148,163,184,.45);
            background:rgba(15,23,42,.82);
            display:flex;align-items:center;justify-content:space-between;
            gap:10px;margin-bottom:8px;
          ">
            <div style="display:flex;align-items:center;gap:10px;min-width:0;">
              <div style="width:26px;text-align:right;opacity:.7;font-variant-numeric:tabular-nums;">${idx + 1}</div>
              ${avatarCircle(r.avatar, 34)}
              <div style="min-width:0;">
                <div style="font-size:13px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  ${esc(name)}
                </div>
                <div style="font-size:11px;opacity:.75;">
                  XP: <b>${esc(xp)}</b>
                </div>
              </div>
            </div>

            <div style="display:flex;gap:8px;align-items:center;flex-shrink:0;">
              ${rightBtn}
            </div>
          </div>
        `;
      }).join('');

      // bind add friend buttons
      document.querySelectorAll('.lbAddFriendBtn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const value = (btn.getAttribute('data-value') || '').trim();
          if (!value) return;

          btn.disabled = true;
          const old = btn.textContent;
          btn.textContent = '…';

          try {
            await sendFriendRequest(value);
            setMsg('✅ Friend request sent.');
            // refresh UI so it can flip to "Friend" if accepted quickly
            loadAndRender().catch(() => {});
          } catch (e) {
            console.warn(e);
            setMsg(`⛔ ${e?.message || 'Could not send friend request.'}`);
            btn.disabled = false;
            btn.textContent = old;
          }
        });
      });

    } catch (e) {
      console.warn('CBS GO: leaderboard load failed', e);
      setStatus('⛔ Failed to load leaderboard.');
    }
  }

  if (refreshBtn) refreshBtn.onclick = () => loadAndRender().catch(() => {});
  loadAndRender().catch(() => {});
}