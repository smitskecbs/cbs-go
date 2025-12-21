import { nodes } from '../data/nodes.js';
import { getPlayerName, getPlayerAvatar } from '../app/leaderboard.js';

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function posForNode(n) {
  const id = String(n?.id || n?.name || 'node');
  const a = hash01(id + ':x');
  const b = hash01(id + ':y');
  const x = 0.10 + a * 0.80;
  const y = 0.12 + b * 0.76;
  return { x, y };
}

function avatarCircle(dataUrl, size = 30) {
  const bg = dataUrl ? `background-image:url('${dataUrl}');` : '';
  const txt = dataUrl ? '' : '👤';
  return `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${bg}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
    ">${txt}</div>
  `;
}

// We avoid importing state.js to prevent export mismatch bugs.
// We read completion from localStorage safely.
function readCompletedMap() {
  try {
    // We try a few common keys; whichever exists first wins.
    const keys = ['cbsgo_state_v1', 'cbsgo_state', 'CBSGO_STATE'];
    for (const k of keys) {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (parsed.completed && typeof parsed.completed === 'object') return parsed.completed;
        // some implementations store as completedNodes array
        if (Array.isArray(parsed.completedNodes)) {
          const m = {};
          parsed.completedNodes.forEach(id => (m[id] = true));
          return m;
        }
      }
    }
  } catch (_) {}
  return {};
}

function isCompleted(nodeId) {
  const completed = readCompletedMap();
  return !!completed[nodeId];
}

export function renderMapView() {
  const me = getPlayerName();
  const av = getPlayerAvatar();

  return `
    <section class="mapcard" style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <div style="display:flex; align-items:center; gap:10px;">
          ${avatarCircle(av, 34)}
          <div>
            <div style="font-weight:700;">Map</div>
            <div style="font-size:12px; opacity:.75;">Fake map for now (next: GPS + real map)</div>
          </div>
        </div>
        <div style="font-size:12px; opacity:.8;">You: <b>${esc(me)}</b></div>
      </div>

      <div style="margin-top:10px;">
        <canvas id="cbsMap" width="860" height="420" style="
          width:100%;
          height:auto;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.12);
          background: radial-gradient(circle at 30% 20%, rgba(40,180,110,.20), transparent 55%),
                      radial-gradient(circle at 80% 70%, rgba(255,216,107,.12), transparent 55%),
                      rgba(0,0,0,.25);
        "></canvas>
        <div style="margin-top:8px; font-size:12px; opacity:.75;">
          Completed nodes disappear from the map.
        </div>
      </div>

      <div style="margin-top:10px; font-size:12px; opacity:.85;">
        <span class="pill" style="background:rgba(46,204,113,.18); border-color:rgba(46,204,113,.28);">🧩 Puzzle</span>
        <span class="pill" style="background:rgba(155,89,182,.18); border-color:rgba(155,89,182,.28);">👥 Group</span>
        <span class="pill">⭐ You</span>
      </div>

      <div style="margin-top:12px;">
        <div style="font-weight:700; margin-bottom:6px;">Pins</div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${nodes.map(n => {
            const done = isCompleted(n.id);
            return `
              <button class="btn secondary" type="button"
                data-map-open="${n.id}"
                ${done ? 'disabled' : ''}
                style="
                  text-align:left;
                  display:flex;
                  justify-content:space-between;
                  gap:10px;
                  opacity:${done ? '.45' : '1'};
                  cursor:${done ? 'not-allowed' : 'pointer'};
                ">
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                  ${n.type === 'group' ? '👥' : '🧩'} ${esc(n.name)} ${done ? '(Completed)' : ''}
                </span>
                <span style="opacity:.7;">${done ? 'Done' : 'Open'}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}

export function bindMapView() {
  const canvas = document.querySelector('#cbsMap');
  if (!canvas) return;

  // bind once per canvas element
  if (canvas.dataset.bound === '1') return;
  canvas.dataset.bound = '1';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const pins = nodes
    .filter(n => !isCompleted(n.id))
    .map(n => {
      const p = posForNode(n);
      return { id: n.id, type: n.type, name: n.name, x: p.x, y: p.y };
    });

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // grid
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = 'rgba(0,0,0,.9)';
    for (let x = 40; x < w; x += 80) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 30; y < h; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.restore();

    // You marker
    const meX = w * 0.58, meY = h * 0.60;
    ctx.fillStyle = 'rgba(255,216,107,.95)';
    ctx.beginPath();
    ctx.arc(meX, meY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.font = '12px system-ui';
    ctx.fillText('⭐ You', meX + 14, meY + 4);

    // pins
    pins.forEach(p => {
      const px = p.x * w;
      const py = p.y * h;

      const fill = p.type === 'group'
        ? 'rgba(155,89,182,.95)'
        : 'rgba(46,204,113,.95)';

      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(px, py, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(0,0,0,.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.font = '12px system-ui';
      const icon = p.type === 'group' ? '👥 ' : '🧩 ';
      ctx.fillText((icon + p.name).slice(0, 24), px + 16, py + 4);
    });
  }

  draw();

  const HIT_RADIUS = 18;

  canvas.addEventListener('click', (ev) => {
    const rect = canvas.getBoundingClientRect();
    const cx = ((ev.clientX - rect.left) / rect.width) * canvas.width;
    const cy = ((ev.clientY - rect.top) / rect.height) * canvas.height;

    const w = canvas.width, h = canvas.height;

    let best = null;
    let bestD = Infinity;

    for (const p of pins) {
      const px = p.x * w;
      const py = p.y * h;
      const d = Math.hypot(px - cx, py - cy);
      if (d <= HIT_RADIUS && d < bestD) {
        bestD = d;
        best = p;
      }
    }

    if (!best) return;

    window.dispatchEvent(new CustomEvent('cbsgo:openNode', { detail: { id: best.id } }));
  });

  document.querySelectorAll('[data-map-open]').forEach(btn => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-map-open');
      if (isCompleted(id)) return;
      window.dispatchEvent(new CustomEvent('cbsgo:openNode', { detail: { id } }));
    });
  });

  window.addEventListener('resize', () => draw(), { passive: true });
}
