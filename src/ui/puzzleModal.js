// src/ui/puzzleModal.js
// Modal that shows a puzzle for a node and awards XP once.
// Assumptions:
// - appShell blocks opening completed nodes (but we also guard here).
// - state.js exports addXp(), markNodeCompleted(), isNodeCompleted().

import { addXp, markNodeCompleted, isNodeCompleted } from '../app/state.js';

let currentNode = null;

function esc(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalize(s) {
  return String(s || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function normalizeCode(s) {
  return String(s || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

function ensureModalRoot() {
  let el = document.getElementById('cbsgoPuzzleModal');
  if (el) return el;

  el = document.createElement('div');
  el.id = 'cbsgoPuzzleModal';
  el.style.position = 'fixed';
  el.style.inset = '0';
  el.style.zIndex = '9000';
  el.style.display = 'none';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.padding = '14px';
  el.style.background = 'rgba(0,0,0,.55)';
  el.style.backdropFilter = 'blur(10px)';

  document.body.appendChild(el);
  return el;
}

function closeModal() {
  const root = ensureModalRoot();
  root.style.display = 'none';
  root.innerHTML = '';
  currentNode = null;
}

function baseCard(title, inner) {
  return `
    <div style="
      width:min(720px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      color:#fff;
      box-shadow:0 18px 80px rgba(0,0,0,.6);
      overflow:hidden;
      font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        gap:10px;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
      ">
        <div style="font-weight:900;">${esc(title)}</div>
        <button id="pmClose" type="button" style="
          border:0;
          padding:8px 10px;
          border-radius:12px;
          background:rgba(255,255,255,.08);
          color:#fff;
        ">Close</button>
      </div>

      <div style="padding:14px;">
        ${inner}
      </div>
    </div>
  `;
}

function renderMcq(p) {
  return `
    <div style="opacity:.9; white-space:pre-wrap; line-height:1.35;">${esc(p.q)}</div>

    <div style="margin-top:12px; display:flex; flex-direction:column; gap:10px;">
      ${p.options.map((opt, idx) => `
        <label style="
          display:flex; gap:10px; align-items:flex-start;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.04);
          cursor:pointer;
        ">
          <input type="radio" name="pmOpt" value="${idx}" style="margin-top:3px;" />
          <div>${esc(opt)}</div>
        </label>
      `).join('')}
    </div>

    <div style="margin-top:14px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <button id="pmSubmit" class="btn" type="button" style="
        border:0; padding:10px 12px; border-radius:14px;
        background:rgba(255,255,255,.14); color:#fff;
      ">Submit</button>
      <div id="pmMsg" style="opacity:.85; font-size:13px;"></div>
    </div>
  `;
}

function renderInput(p) {
  return `
    <div style="opacity:.9; white-space:pre-wrap; line-height:1.35;">${esc(p.q)}</div>

    <div style="margin-top:12px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <input id="pmInput" placeholder="Type your answer…" style="
        flex:1; min-width:220px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        color:#fff;
      "/>
      <button id="pmSubmit" class="btn" type="button" style="
        border:0; padding:10px 12px; border-radius:14px;
        background:rgba(255,255,255,.14); color:#fff;
      ">Submit</button>
    </div>

    <div id="pmHint" style="margin-top:10px; opacity:.7; font-size:12px;"></div>
    <div id="pmMsg" style="margin-top:8px; opacity:.85; font-size:13px;"></div>
  `;
}

function renderCode(p) {
  return `
    <div style="opacity:.9; white-space:pre-wrap; line-height:1.35;">${esc(p.q)}</div>

    <div style="margin-top:12px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <input id="pmInput" placeholder="Type the code…" style="
        flex:1; min-width:220px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        color:#fff;
      "/>
      <button id="pmSubmit" class="btn" type="button" style="
        border:0; padding:10px 12px; border-radius:14px;
        background:rgba(255,255,255,.14); color:#fff;
      ">Submit</button>
    </div>

    ${
      p.hint
        ? `<div id="pmHint" style="margin-top:10px; opacity:.7; font-size:12px;">Hint: ${esc(p.hint)}</div>`
        : `<div id="pmHint" style="margin-top:10px; opacity:.7; font-size:12px;"></div>`
    }

    <div id="pmMsg" style="margin-top:8px; opacity:.85; font-size:13px;"></div>
  `;
}

function renderContent(node) {
  const p = node?.puzzle;
  if (!p) {
    return `
      <div style="opacity:.9;">No puzzle configured for this node.</div>
      <div style="margin-top:12px; opacity:.7;">(Add puzzle in src/data/nodes.js)</div>
    `;
  }

  if (isNodeCompleted(node.id)) {
    return `
      <div style="opacity:.95; font-weight:800;">✅ Already completed</div>
      <div style="margin-top:10px; opacity:.8;">
        You can replay for fun, but you won’t earn XP again.
      </div>
      <div style="margin-top:14px;">
        <button id="pmReplay" type="button" style="
          border:0; padding:10px 12px; border-radius:14px;
          background:rgba(255,255,255,.14); color:#fff;
        ">Replay puzzle</button>
      </div>
    `;
  }

  if (p.type === 'mcq') return renderMcq(p);
  if (p.type === 'input') return renderInput(p);
  if (p.type === 'code') return renderCode(p);

  return `<div style="opacity:.9;">Unknown puzzle type: ${esc(p.type)}</div>`;
}

function bindLogic(node) {
  const root = ensureModalRoot();

  const closeBtn = root.querySelector('#pmClose');
  if (closeBtn) closeBtn.onclick = closeModal;

  // replay button (if completed)
  const replay = root.querySelector('#pmReplay');
  if (replay) {
    replay.onclick = () => {
      // Force re-render as playable, but still no XP because completed.
      // We just show the puzzle UI; on submit we’ll still block XP by markNodeCompleted() returning false.
      root.innerHTML = baseCard(node.name, (() => {
        const p = node.puzzle;
        if (!p) return `<div>No puzzle.</div>`;
        if (p.type === 'mcq') return renderMcq(p);
        if (p.type === 'input') return renderInput(p);
        if (p.type === 'code') return renderCode(p);
        return `<div>Unknown puzzle type.</div>`;
      })());

      // rebind close + logic
      bindLogic(node);
    };
    return;
  }

  const p = node?.puzzle;
  const submit = root.querySelector('#pmSubmit');
  const msg = root.querySelector('#pmMsg');
  const hint = root.querySelector('#pmHint');
  const input = root.querySelector('#pmInput');

  const setMsg = (t) => { if (msg) msg.textContent = t || ''; };
  const setHint = (t) => { if (hint) hint.textContent = t || ''; };

  function awardOnceAndClose() {
    // Only award if newly completed
    const newly = markNodeCompleted(node.id);
    if (!newly) {
      setMsg('✅ Completed already (no extra XP).');
      return;
    }

    const xp = Number(node.xp || 0);
    if (xp > 0) addXp(xp);

    setMsg(`✅ Correct! +${xp} XP`);
    // Tell app to refresh map/xp
    window.dispatchEvent(new CustomEvent('cbsgo:nodeCompleted', { detail: { id: node.id } }));
    window.dispatchEvent(new CustomEvent('cbsgo:rerenderMap'));
    window.dispatchEvent(new CustomEvent('cbsgo:xpChanged'));
    setTimeout(closeModal, 650);
  }

  function wrong(explainMaybe) {
    setMsg('❌ Not correct. Try again.');
    if (explainMaybe) setHint(explainMaybe);
  }

  if (!submit) return;

  submit.onclick = () => {
    if (!p) return;

    // If completed meanwhile, block XP
    if (isNodeCompleted(node.id)) {
      setMsg('✅ Completed already (no extra XP).');
      return;
    }

    if (p.type === 'mcq') {
      const sel = root.querySelector('input[name="pmOpt"]:checked');
      if (!sel) return setMsg('Pick an option.');
      const idx = Number(sel.value);
      if (idx === Number(p.answerIndex)) {
        awardOnceAndClose();
      } else {
        wrong(p.explain ? `Tip: ${p.explain}` : '');
      }
      return;
    }

    if (p.type === 'input') {
      const val = normalize(input?.value || '');
      if (!val) return setMsg('Type an answer.');
      const ok = (p.answers || []).some(a => normalize(a) === val);
      if (ok) awardOnceAndClose();
      else wrong(p.explain ? `Tip: ${p.explain}` : '');
      return;
    }

    if (p.type === 'code') {
      const val = normalizeCode(input?.value || '');
      if (!val) return setMsg('Type the code.');
      const ok = normalizeCode(p.code) === val;
      if (ok) awardOnceAndClose();
      else wrong(p.hint ? `Hint: ${p.hint}` : '');
      return;
    }
  };

  // Enter key submits for input/code
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit.click();
    });
  }

  setMsg('');
  setHint('');
}

export function openPuzzleModal(node) {
  currentNode = node;

  const root = ensureModalRoot();
  root.style.display = 'flex';

  root.innerHTML = baseCard(node?.name || 'Puzzle', renderContent(node));

  // click outside closes
  root.onclick = (e) => {
    if (e.target === root) closeModal();
  };

  bindLogic(node);
}
