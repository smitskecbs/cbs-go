// src/ui/puzzleModal.js
import { addXp, completeNodeOnce, isNodeCompleted } from '../app/state.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizeAnswer(s) {
  return String(s || '').trim().toLowerCase();
}

function getAcceptedAnswers(node) {
  // node.answers can be array of acceptable answers
  const arr = Array.isArray(node.answers) ? node.answers : [];
  return arr.map(normalizeAnswer).filter(Boolean);
}

function ensureModalRoot() {
  let root = document.querySelector('#cbsgoModalRoot');
  if (root) return root;

  root = document.createElement('div');
  root.id = 'cbsgoModalRoot';
  document.body.appendChild(root);
  return root;
}

function closeModal() {
  const root = document.querySelector('#cbsgoModalRoot');
  if (root) root.innerHTML = '';
}

export function openPuzzleModal(node) {
  const root = ensureModalRoot();

  const completed = isNodeCompleted(node.id);
  const xpReward = Number(node.xp || 50);

  const question =
    node.question ||
    `Demo puzzle for "${node.name}". (We’ll refine questions later.)`;

  const hint = node.hint || `Tip: try a simple keyword.`;

  root.innerHTML = `
    <div style="
      position:fixed; inset:0;
      background:rgba(0,0,0,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
      z-index:9999;
    ">

      <div style="
        width:min(560px, 100%);
        border-radius:18px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(18,18,18,.92);
        box-shadow:0 24px 70px rgba(0,0,0,.55);
        overflow:hidden;
      ">

        <div style="
          padding:14px 16px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="min-width:0;">
            <div style="font-weight:800; font-size:16px;">${esc(node.name)}</div>
            <div style="opacity:.75; font-size:12px;">
              ${completed ? '✅ Completed (no more XP)' : `Reward: +${xpReward} XP`}
            </div>
          </div>

          <button id="cbsgoCloseModal" class="btn secondary" type="button">Close</button>
        </div>

        <div style="padding:16px;">
          <div style="font-size:14px; line-height:1.35;">
            <div style="font-weight:700; margin-bottom:6px;">Question</div>
            <div style="opacity:.95;">${esc(question)}</div>

            <div style="margin-top:12px; font-weight:700;">Hint</div>
            <div style="opacity:.8;">${esc(hint)}</div>
          </div>

          <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
            <input id="cbsgoAnswer" placeholder="Type your answer…" style="
              flex:1; min-width:220px;
              padding:10px 12px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            " />

            <button id="cbsgoSubmitAnswer" class="btn" type="button">
              Submit
            </button>
          </div>

          <div id="cbsgoMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

          ${
            completed
              ? `<div style="margin-top:10px; font-size:12px; opacity:.7;">
                   This node is already completed. You can review it, but you can’t earn XP again.
                 </div>`
              : ``
          }
        </div>
      </div>
    </div>
  `;

  const closeBtn = document.querySelector('#cbsgoCloseModal');
  if (closeBtn) closeBtn.onclick = closeModal;

  const input = document.querySelector('#cbsgoAnswer');
  const submit = document.querySelector('#cbsgoSubmitAnswer');
  const msg = document.querySelector('#cbsgoMsg');

  const setMsg = (t) => {
    if (msg) msg.textContent = t || '';
  };

  const doSubmit = () => {
    const user = normalizeAnswer(input?.value || '');
    const accepted = getAcceptedAnswers(node);

    // If no answers defined yet: allow "demo complete" by any non-empty answer
    const ok =
      accepted.length === 0 ? user.length > 0 : accepted.includes(user);

    if (!ok) {
      setMsg('❌ Not correct. Try again.');
      return;
    }

    // Already completed? No XP.
    const firstTime = completeNodeOnce(node.id);

    if (firstTime) {
      addXp(Number(node.xp || 50));
      setMsg(`✅ Correct! +${Number(node.xp || 50)} XP`);

      // Let UI refresh (map/list)
      window.dispatchEvent(new CustomEvent('cbsgo:rerenderSteps')); // harmless
      window.dispatchEvent(new CustomEvent('cbsgo:xpChanged'));
      window.dispatchEvent(new CustomEvent('cbsgo:nodesChanged'));
    } else {
      setMsg('✅ Correct — but this node was already completed, no extra XP.');
    }
  };

  if (submit) submit.onclick = doSubmit;
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSubmit();
    });
  }

  setTimeout(() => input?.focus?.(), 50);
}

