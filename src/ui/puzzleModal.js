// src/ui/puzzleModal.js
// Opens a modal for a node puzzle. Can only complete once.
// Atomic XP award prevents double points even if submit triggers twice.

import { isNodeCompleted, completeNodeAndAwardXp } from '../app/state.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

function ensureModalRoot() {
  let m = document.querySelector('#cbsgoModal');
  if (m) return m;

  m = document.createElement('div');
  m.id = 'cbsgoModal';
  m.style.position = 'fixed';
  m.style.inset = '0';
  m.style.zIndex = '9999';
  m.style.display = 'none';
  m.style.alignItems = 'center';
  m.style.justifyContent = 'center';
  m.style.padding = '18px';
  m.style.background = 'rgba(0,0,0,.55)';
  m.addEventListener('click', (e) => {
    if (e.target === m) closePuzzleModal();
  });
  document.body.appendChild(m);
  return m;
}

export function closePuzzleModal() {
  const m = document.querySelector('#cbsgoModal');
  if (!m) return;
  m.style.display = 'none';
  m.innerHTML = '';
}

function acceptedAnswers(node) {
  const arr = Array.isArray(node?.answers)
    ? node.answers
    : (node?.answer ? [node.answer] : []);
  return arr.map(norm).filter(Boolean);
}

function getQuestion(node) {
  return node?.question || node?.puzzle?.question || `Solve the node: ${node?.name || ''}`;
}

function getHint(node) {
  return node?.hint || node?.puzzle?.hint || '';
}

function getRewardXp(node) {
  const v = Number(node?.xp ?? node?.rewardXp ?? 50);
  return Number.isFinite(v) ? v : 50;
}

export function openPuzzleModal(node) {
  const m = ensureModalRoot();
  const id = String(node?.id || '');
  const done = isNodeCompleted(id);

  const q = getQuestion(node);
  const hint = getHint(node);
  const reward = getRewardXp(node);
  const answers = acceptedAnswers(node);

  m.style.display = 'flex';

  m.innerHTML = `
    <div style="
      width:min(640px, 96vw);
      border-radius:18px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 22px 60px rgba(0,0,0,.55);
      padding:16px;
      color:#fff;
    ">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:18px; font-weight:800;">${esc(node?.name || 'Node')}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${reward} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${esc(q)}</div>
        ${hint ? `<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${esc(hint)}</div>` : ``}
      </div>

      ${
        done
          ? `
            <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(0,255,128,.20); background:rgba(0,255,128,.08);">
              ✅ Completed. This node can’t give XP again.
            </div>
          `
          : `
            <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <input id="cbsgoAnswer" placeholder="Type your answer…" style="
                flex:1; min-width:220px;
                padding:12px 12px;
                border-radius:14px;
                border:1px solid rgba(255,255,255,.14);
                background:rgba(255,255,255,.06);
                color:#fff;
              "/>
              <button id="cbsgoSubmit" class="btn" type="button">Submit</button>
            </div>
            <div id="cbsgoMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>
            ${
              answers.length === 0
                ? `<div style="margin-top:10px; font-size:12px; opacity:.7;">
                     (Dev note: add <code>answers: ["..."]</code> in <code>src/data/nodes.js</code>.)
                   </div>`
                : ``
            }
          `
      }
    </div>
  `;

  const closeBtn = m.querySelector('#cbsgoClose');
  if (closeBtn) closeBtn.onclick = closePuzzleModal;

  if (done) return;

  const msg = m.querySelector('#cbsgoMsg');
  const input = m.querySelector('#cbsgoAnswer');
  const submit = m.querySelector('#cbsgoSubmit');

  const setMsg = (t) => { if (msg) msg.textContent = t || ''; };

  let locked = false; // blocks double-trigger in the same modal

  const trySubmit = () => {
    if (locked) return;

    if (isNodeCompleted(id)) {
      setMsg('✅ Already completed.');
      return;
    }

    const user = norm(input?.value || '');

    if (answers.length === 0) {
      setMsg('⚠️ This node has no answers configured yet.');
      return;
    }

    if (!answers.includes(user)) {
      setMsg('❌ Not correct. Try again.');
      return;
    }

    locked = true;
    if (submit) submit.disabled = true;

    // ✅ ATOMIC award
    const res = completeNodeAndAwardXp(id, reward);
    if (!res.ok) {
      setMsg(res.reason === 'already_completed' ? '✅ Already completed.' : '❌ Could not award XP.');
      return;
    }

    setMsg(`✅ Correct! +${reward} XP`);

    setTimeout(() => closePuzzleModal(), 550);
  };

  if (submit) submit.onclick = trySubmit;
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') trySubmit();
    });
    setTimeout(() => input.focus(), 50);
  }
}
