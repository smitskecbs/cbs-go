// src/ui/levelUpPopup.js
// Luistert naar 'cbsgo:levelUp' en toont een feestelijke popup.
// - Geen layout wijziging van de app (alleen overlay bovenop).
// - Met simpele animatie + share-knoppen.

const OVERLAY_ID = 'cbsgoLevelUpOverlay';
const STYLE_ID = 'cbsgoLevelUpStyles';

// Eventueel: link naar jouw live page / repo
const SHARE_URL = 'https://smitskecbs.github.io/cbs-go/';

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes cbsgoLevelUpFadeIn {
      0% { opacity: 0; transform: translateY(12px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes cbsgoLevelUpGlow {
      0% { box-shadow: 0 0 0 rgba(34,197,94,0.0); }
      50% { box-shadow: 0 0 30px rgba(34,197,94,0.9); }
      100% { box-shadow: 0 0 0 rgba(34,197,94,0.0); }
    }

    @keyframes cbsgoLevelUpConfetti {
      0% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
      15% { opacity: 1; }
      100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
    }

    .cbsgoLevelUpCard {
      animation: cbsgoLevelUpFadeIn 0.30s ease-out;
    }

    .cbsgoLevelUpBadge {
      animation: cbsgoLevelUpGlow 1.4s ease-out 0.2s 2;
    }

    .cbsgoConfettiPiece {
      position:absolute;
      width:6px;
      height:10px;
      border-radius:2px;
      opacity:0;
      animation-name:cbsgoLevelUpConfetti;
      animation-timing-function:linear;
      animation-iteration-count:1;
    }
  `;
  document.head.appendChild(style);
}

function removeOverlay() {
  const el = document.getElementById(OVERLAY_ID);
  if (el) el.remove();
}

function createConfetti(container) {
  const colors = [
    'rgba(244,114,182,1)', // pink
    'rgba(56,189,248,1)',  // sky
    'rgba(34,197,94,1)',   // green
    'rgba(234,179,8,1)',   // amber
    'rgba(129,140,248,1)'  // indigo
  ];

  const count = 40;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'cbsgoConfettiPiece';
    const left = 10 + Math.random() * 80;
    const delay = Math.random() * 0.6;
    const duration = 1.0 + Math.random() * 0.8;

    piece.style.left = `${left}%`;
    piece.style.top = '-10px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;

    container.appendChild(piece);

    // Na animatie opruimen
    setTimeout(() => piece.remove(), (delay + duration + 0.3) * 1000);
  }
}

function esc(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function openLevelUpPopup(detail) {
  ensureStyles();
  removeOverlay();

  const from = Number(detail?.from || 1);
  const to = Number(detail?.to || from + 1);

  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.zIndex = '999998'; // onder login-modal (die zit op 999999)
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.padding = '16px';
  overlay.style.background = 'rgba(0,0,0,0.70)';
  overlay.style.backdropFilter = 'blur(12px)';
  overlay.style.fontFamily = 'system-ui, sans-serif';

  overlay.innerHTML = `
    <div class="cbsgoLevelUpCard" style="
      width:min(420px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.20);
      background:radial-gradient(circle at top, rgba(34,197,94,0.28), rgba(15,23,42,0.96));
      box-shadow:0 18px 60px rgba(0,0,0,.70);
      color:#fff;
      position:relative;
      overflow:hidden;
      padding:18px 18px 14px 18px;
    ">
      <!-- Confetti container -->
      <div id="cbsgoLevelUpConfettiHost" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        overflow:hidden;
      "></div>

      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <div style="font-size:15px; font-weight:800; letter-spacing:0.02em;">
          Level Up! 🎉
        </div>
        <button id="cbsgoLevelUpClose" type="button" style="
          border-radius:999px;
          border:0;
          width:26px;
          height:26px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:rgba(15,23,42,.86);
          color:#fff;
          font-size:15px;
          cursor:pointer;
        ">✕</button>
      </div>

      <div style="margin-top:14px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:10px;">
        <div class="cbsgoLevelUpBadge" style="
          width:84px;
          height:84px;
          border-radius:999px;
          border:2px solid rgba(34,197,94,1);
          background:radial-gradient(circle at top, rgba(22,163,74,0.95), rgba(15,23,42,0.95));
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:26px;
          font-weight:900;
          margin-top:4px;
        ">
          ${esc(String(to))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${esc(String(to))}</b> in CBS-GO.
        </div>
        <div style="font-size:12px; opacity:0.85;">
          Keep moving, keep growing. Every step is a vote for your future self.
        </div>
      </div>

      <div style="margin-top:16px; display:flex; flex-direction:column; gap:8px;">
        <button id="cbsgoLevelUpShareX" type="button" style="
          width:100%;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(148,163,184,0.80);
          background:rgba(15,23,42,0.92);
          color:#fff;
          font-size:13px;
          font-weight:700;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          cursor:pointer;
        ">
          <span>Share on X</span> <span style="font-size:15px;">📣</span>
        </button>

        <button id="cbsgoLevelUpCopyLink" type="button" style="
          width:100%;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(148,163,184,0.50);
          background:rgba(15,23,42,0.80);
          color:#fff;
          font-size:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:6px;
          cursor:pointer;
        ">
          <span>Copy game link</span> <span style="font-size:13px;">🔗</span>
        </button>

        <button id="cbsgoLevelUpContinue" type="button" style="
          width:100%;
          margin-top:2px;
          padding:10px 12px;
          border-radius:14px;
          border:0;
          background:linear-gradient(90deg, #22c55e, #0ea5e9);
          color:#0b1120;
          font-size:13px;
          font-weight:800;
          cursor:pointer;
        ">
          Continue exploring
        </button>
      </div>

      <div id="cbsgoLevelUpMsg" style="
        margin-top:8px;
        font-size:11px;
        opacity:0.75;
        text-align:center;
      ">
        CBS-GO — sovereignty starts with small steps 💚
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const confettiHost = overlay.querySelector('#cbsgoLevelUpConfettiHost');
  if (confettiHost) {
    createConfetti(confettiHost);
  }

  const close = () => removeOverlay();

  const closeBtn = overlay.querySelector('#cbsgoLevelUpClose');
  const contBtn = overlay.querySelector('#cbsgoLevelUpContinue');
  const shareBtn = overlay.querySelector('#cbsgoLevelUpShareX');
  const copyBtn = overlay.querySelector('#cbsgoLevelUpCopyLink');
  const msg = overlay.querySelector('#cbsgoLevelUpMsg');

  if (closeBtn) closeBtn.onclick = close;
  if (contBtn) contBtn.onclick = close;

  if (shareBtn) {
    shareBtn.onclick = () => {
      const text = `I just reached Level ${to} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${SHARE_URL}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    };
  }

  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(SHARE_URL);
        if (msg) msg.textContent = '✅ Link copied. Share it with your friends.';
      } catch {
        if (msg) msg.textContent = 'Could not copy link. You can share it manually: ' + SHARE_URL;
      }
    };
  }

  // Auto close na een tijdje, zodat het nooit irritant wordt
  setTimeout(() => {
    const el = document.getElementById(OVERLAY_ID);
    if (el) removeOverlay();
  }, 10000); // 10s
}

// Globale listener één keer registreren
if (typeof window !== 'undefined' && !window.__cbsgo_levelUpListener) {
  window.__cbsgo_levelUpListener = true;
  window.addEventListener('cbsgo:levelUp', (ev) => {
    openLevelUpPopup(ev?.detail || {});
  });
}
