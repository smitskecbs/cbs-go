// src/ui/leaderboardPanel.js
import { sendFriendRequest, loadFriendsOverview } from '../app/friends.js';
import { isValidLeaderboardEntry, loadLeaderboard } from '../app/leaderboard.js';

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

function rankBadge(idx) {
  if (idx === 0) {
    return `
      <div style="
        width:26px;
        text-align:right;
        font-size:18px;
        line-height:1;
      ">🥇</div>
    `;
  }

  if (idx === 1) {
    return `
      <div style="
        width:26px;
        text-align:right;
        font-size:18px;
        line-height:1;
      ">🥈</div>
    `;
  }

  if (idx === 2) {
    return `
      <div style="
        width:26px;
        text-align:right;
        font-size:18px;
        line-height:1;
      ">🥉</div>
    `;
  }

  return `
    <div style="
      width:26px;
      text-align:right;
      opacity:.7;
      font-variant-numeric:tabular-nums;
    ">${idx + 1}</div>
  `;
}

function medalUnderAvatar(idx) {
  if (idx === 0) {
    return `
      <div style="
        margin-top:4px;
        font-size:14px;
        line-height:1;
        filter:drop-shadow(0 0 6px rgba(250,204,21,.35));
      ">🥇</div>
    `;
  }

  if (idx === 1) {
    return `
      <div style="
        margin-top:4px;
        font-size:14px;
        line-height:1;
        filter:drop-shadow(0 0 6px rgba(226,232,240,.28));
      ">🥈</div>
    `;
  }

  if (idx === 2) {
    return `
      <div style="
        margin-top:4px;
        font-size:14px;
        line-height:1;
        filter:drop-shadow(0 0 6px rgba(180,83,9,.28));
      ">🥉</div>
    `;
  }

  return `<div style="margin-top:4px;height:14px;"></div>`;
}

function avatarWithMedal(dataUrl, idx) {
  return `
    <div style="
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      min-width:34px;
    ">
      ${avatarCircle(dataUrl, 34)}
      ${medalUnderAvatar(idx)}
    </div>
  `;
}

function flagEmojiFromCountryCode(code) {
  const cc = String(code || '').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return '';

  const A = 0x1F1E6;
  const first = cc.charCodeAt(0) - 65 + A;
  const second = cc.charCodeAt(1) - 65 + A;

  try {
    return String.fromCodePoint(first) + String.fromCodePoint(second);
  } catch {
    return '';
  }
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

  const setStatus = (t) => {
    if (statusEl) statusEl.textContent = t || '';
  };

  const setMsg = (t) => {
    if (msgEl) msgEl.textContent = t || '';
  };

  async function loadAndRender() {
    if (!listEl) return;
    setMsg('');
    setStatus('Loading players…');

    try {
      const friendCodes = new Set();

      const [ov, rowsRaw] = await Promise.all([
        loadFriendsOverview().catch((e) => {
          console.warn('CBS GO: loadFriendsOverview failed (ignored)', e);
          return { accepted: [] };
        }),
        loadLeaderboard(100),
      ]);

      const accepted = Array.isArray(ov?.accepted) ? ov.accepted : [];
      accepted.forEach((fr) => {
        const uid = String(fr?.otherUserId || fr?.other_user_id || fr?.uid || '').trim();
        if (uid) friendCodes.add(friendCodeFromUid(uid));
      });

      const rows = (Array.isArray(rowsRaw) ? rowsRaw : []).filter(isValidLeaderboardEntry);

      rows.sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0));

      setStatus(rows.length ? '' : 'No players found yet.');

      listEl.innerHTML = rows.map((r, idx) => {
        const uid = String(r.user_id || '').trim();
        const friendCode = friendCodeFromUid(uid);

        const name = String(r.nickname || '').trim();
        const xp = Number(r.xp || 0);
        const flag = flagEmojiFromCountryCode(r.country_code);

        const isFriend = friendCode && friendCodes.has(friendCode);

        const isTop3 = idx < 3;
        const rowBorder =
          idx === 0
            ? 'rgba(250,204,21,.55)'
            : idx === 1
              ? 'rgba(203,213,225,.45)'
              : idx === 2
                ? 'rgba(180,83,9,.45)'
                : 'rgba(148,163,184,.45)';

        const rowBackground =
          idx === 0
            ? 'linear-gradient(180deg, rgba(71,52,8,.42), rgba(15,23,42,.88))'
            : idx === 1
              ? 'linear-gradient(180deg, rgba(51,65,85,.34), rgba(15,23,42,.84))'
              : idx === 2
                ? 'linear-gradient(180deg, rgba(120,53,15,.30), rgba(15,23,42,.84))'
                : 'rgba(15,23,42,.82)';

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
            border:1px solid ${rowBorder};
            background:${rowBackground};
            display:flex;align-items:center;justify-content:space-between;
            gap:10px;margin-bottom:8px;
            box-shadow:${isTop3 ? '0 8px 24px rgba(0,0,0,.18)' : 'none'};
          ">
            <div style="display:flex;align-items:center;gap:10px;min-width:0;">
              ${rankBadge(idx)}
              ${avatarWithMedal(r.avatar, idx)}
              <div style="min-width:0;">
                <div style="font-size:13px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  ${esc(name)}${flag ? ` <span style="margin-left:6px;">${flag}</span>` : ''}
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