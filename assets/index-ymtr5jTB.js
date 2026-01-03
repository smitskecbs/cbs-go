import{createClient as ro}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const g of f.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function o(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(d){if(d.ep)return;d.ep=!0;const f=o(d);fetch(d.href,f)}})();const oo="modulepreload",io=function(t){return"/cbs-go/"+t},rr={},ao=function(n,o,l){let d=Promise.resolve();if(o&&o.length>0){let x=function(p){return Promise.all(p.map(h=>Promise.resolve(h).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),u=g?.nonce||g?.getAttribute("nonce");d=x(o.map(p=>{if(p=io(p),p in rr)return;rr[p]=!0;const h=p.endsWith(".css"),v=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${v}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":oo,h||(_.as="script"),_.crossOrigin="",_.href=p,u&&_.setAttribute("nonce",u),document.head.appendChild(_),h)return new Promise((E,A)=>{_.addEventListener("load",E),_.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${p}`)))})}))}function f(g){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=g,window.dispatchEvent(u),!u.defaultPrevented)throw g}return d.then(g=>{for(const u of g||[])u.status==="rejected"&&f(u.reason);return n().catch(f)})},In="cbsgoLevelUpOverlay",or="cbsgoLevelUpStyles",Mn="https://smitskecbs.github.io/cbs-go/";function so(){if(document.getElementById(or))return;const t=document.createElement("style");t.id=or,t.textContent=`
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
  `,document.head.appendChild(t)}function Ln(){const t=document.getElementById(In);t&&t.remove()}function lo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const d=document.createElement("div");d.className="cbsgoConfettiPiece";const f=10+Math.random()*80,g=Math.random()*.6,u=1+Math.random()*.8;d.style.left=`${f}%`,d.style.top="-10px",d.style.background=n[Math.floor(Math.random()*n.length)],d.style.animationDelay=`${g}s`,d.style.animationDuration=`${u}s`,t.appendChild(d),setTimeout(()=>d.remove(),(g+u+.3)*1e3)}}function ir(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fo(t){so(),Ln();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=In,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${ir(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${ir(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const d=l.querySelector("#cbsgoLevelUpConfettiHost");d&&lo(d);const f=()=>Ln(),g=l.querySelector("#cbsgoLevelUpClose"),u=l.querySelector("#cbsgoLevelUpContinue"),x=l.querySelector("#cbsgoLevelUpShareX"),p=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");g&&(g.onclick=f),u&&(u.onclick=f),x&&(x.onclick=()=>{const v=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Mn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(v)}`;window.open(_,"_blank","noopener,noreferrer")}),p&&(p.onclick=async()=>{try{await navigator.clipboard.writeText(Mn),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+Mn)}}),setTimeout(()=>{document.getElementById(In)&&Ln()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{fo(t?.detail||{})}));const co=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],mr="cbsgo_state_v6";function po(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function uo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Rt(){const t=localStorage.getItem(mr);return po(t,uo())}function wr(t){t.updatedAt=Date.now(),localStorage.setItem(mr,JSON.stringify(t))}function Fn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function cn(){return Number(Rt().xp||0)}function Ut(){const t=cn();let n=1,o=t;for(;;){const l=Fn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function vr(){const t=cn();let n=1,o=t;for(;;){const l=Fn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function _r(){return Fn(Ut())}function Gt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Rt();const o=Ut(),l=Rt();l.xp=Number(l.xp||0)+n,wr(l);const d=Ut();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:d}})),d>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:d,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:d,xp:l.xp}}))),l}function Sr(t){const n=String(t||"");if(!n)return!1;const o=Rt();return!!(o.completed&&o.completed[n])}function kr(t){const n=String(t||"");if(!n)return;const o=Rt();o.completed||(o.completed={}),o.completed[n]=Date.now(),wr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const xo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Gt,completeNode:kr,getLevel:Ut,getXp:cn,getXpIntoLevel:vr,getXpNeededThisLevel:_r,isNodeCompleted:Sr},Symbol.toStringTag,{value:"Module"})),Cr="cbsgoPuzzleModal";function yo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function An(){const t=document.getElementById(Cr);t&&t.remove()}function Pn(t){An();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],d=["🍬","💎","⭐","🍀","🔮"],f=180,g=18,u=l.length,x=.01;let p=[],h=null,v=0,_=g,E=!1,A=!1,B=null;const Q=t?.name||"CBS GO Puzzle",K=document.createElement("div");K.id=Cr,K.style.position="fixed",K.style.inset="0",K.style.zIndex="999999",K.style.display="flex",K.style.alignItems="center",K.style.justifyContent="center",K.style.padding="16px",K.style.background="rgba(0,0,0,.70)",K.style.backdropFilter="blur(12px)",K.style.fontFamily="system-ui, sans-serif",K.style.color="#fff",K.innerHTML=`
    <style>
      @keyframes cbsgoConfettiFall {
        0% {
          transform: translate3d(0, -100%, 0) rotateZ(0deg);
          opacity: 1;
        }
        100% {
          transform: translate3d(10px, 120%, 0) rotateZ(360deg);
          opacity: 0;
        }
      }
    </style>
    <div style="
      width:min(420px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(10,12,18,.96);
      box-shadow:0 18px 60px rgba(0,0,0,.65);
      overflow:hidden;
      display:flex;
      flex-direction:column;
      max-height:90vh;
      position:relative;
    ">
      <div id="cbsgoConfettiLayer" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        overflow:hidden;
        display:none;
        z-index:999;
      "></div>

      <div style="
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.12);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      ">
        <div style="font-weight:900; font-size:15px;">
          ${yo(Q)}
        </div>
        <button type="button" id="cbsgoPuzzleClose" style="
          padding:6px 10px;
          border-radius:12px;
          border:0;
          background:rgba(255,255,255,.10);
          color:#fff;
          font-size:13px;
        ">Close</button>
      </div>

      <div style="padding:10px 14px 4px; font-size:12px; opacity:.9;">
        Match <b>3 or more</b> tiles in a row by swapping neighbors.  
        You can <b>tap</b> or <b>swipe</b>.  
        💥 clears a whole row and column.
      </div>

      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:4px 14px 10px;
        gap:10px;
        font-size:12px;
      ">
        <div>
          <div>Score: <span id="cbsgoScore">0</span></div>
          <div>Target: <span id="cbsgoTargetScore">${f}</span></div>
        </div>
        <div style="text-align:right;">
          <div>Moves left: <span id="cbsgoMoves">${g}</span></div>
        </div>
      </div>

      <div style="
        flex:1;
        padding:8px 14px 14px;
        display:flex;
        justify-content:center;
        align-items:center;
      ">
        <div id="cbsgoBoard" style="
          display:grid;
          grid-template-rows:repeat(${n}, 1fr);
          grid-template-columns:repeat(${o}, 1fr);
          gap:4px;
          width:min(320px, 90vw);
          aspect-ratio:1/1;
          touch-action:manipulation;
        "></div>
      </div>

      <div id="cbsgoStatus" style="
        padding:8px 14px 12px;
        font-size:12px;
        text-align:center;
        opacity:.85;
      "></div>

      <div style="padding:0 14px 12px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" id="cbsgoPuzzleOk" style="
          flex:1;
          padding:10px 12px;
          border-radius:16px;
          border:0;
          background:rgba(34,197,94,.25);
          color:#fff;
          font-weight:900;
          font-size:14px;
        ">
          Back to map
        </button>
      </div>
    </div>
  `,document.body.appendChild(K);const ee=document.getElementById("cbsgoBoard"),he=document.getElementById("cbsgoScore"),de=document.getElementById("cbsgoMoves"),ce=document.getElementById("cbsgoStatus"),Be=document.getElementById("cbsgoPuzzleClose"),ot=document.getElementById("cbsgoPuzzleOk"),Fe=document.getElementById("cbsgoConfettiLayer");function Oe(R){ce&&(ce.textContent=R||"")}function it(){if(!Fe)return;Fe.style.display="block",Fe.innerHTML="";const R=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],W=40;for(let D=0;D<W;D++){const O=document.createElement("div"),te=6+Math.floor(Math.random()*6),me=Math.random()*100,ke=Math.random()*.6,Ce=1+Math.random()*.6,gt=Math.random()*360;O.style.position="absolute",O.style.top="-10%",O.style.left=`${me}%`,O.style.width=`${te}px`,O.style.height=`${te*2}px`,O.style.background=R[D%R.length],O.style.opacity="0.9",O.style.borderRadius="2px",O.style.transform=`rotate(${gt}deg)`,O.style.animation=`cbsgoConfettiFall ${Ce}s ease-out ${ke}s forwards`,Fe.appendChild(O)}}function at(){return Math.floor(Math.random()*l.length)}function Lt(){p=[];for(let R=0;R<n;R++){const W=[];for(let D=0;D<o;D++)Math.random()<x?W.push(u):W.push(at());p.push(W)}}function st(R){return R===u}function Ne(){if(ee){ee.innerHTML="";for(let R=0;R<n;R++)for(let W=0;W<o;W++){const D=p[R][W],O=document.createElement("div");O.dataset.row=String(R),O.dataset.col=String(W),O.style.borderRadius="12px",O.style.display="flex",O.style.alignItems="center",O.style.justifyContent="center",O.style.cursor=A?"default":"pointer",O.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",O.style.fontSize="20px",st(D)?(O.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",O.textContent="💥"):(O.style.background=l[D]||"#444",O.textContent=d[D]||"⬛"),h&&h.row===R&&h.col===W&&(O.style.outline="2px solid #fff",O.style.outlineOffset="2px"),O.addEventListener("click",()=>{Ie(R,W)}),O.addEventListener("touchstart",te=>{if(A)return;const me=te.touches[0];B={row:R,col:W,x:me.clientX,y:me.clientY}}),O.addEventListener("touchend",te=>{if(!B||A)return;const me=te.changedTouches[0],ke=me.clientX-B.x,Ce=me.clientY-B.y;if(Math.sqrt(ke*ke+Ce*Ce)<18){Ie(R,W),B=null;return}let Ge=B.row,Qe=B.col;Math.abs(ke)>Math.abs(Ce)?ke>0?Qe+=1:Qe-=1:Ce>0?Ge+=1:Ge-=1,Ge>=0&&Ge<n&&Qe>=0&&Qe<o&&Te(B.row,B.col,Ge,Qe),B=null,te.preventDefault()}),ee.appendChild(O)}}}function ut(R,W){if(!R||!W)return!1;const D=Math.abs(R.row-W.row),O=Math.abs(R.col-W.col);return D+O===1}function je(R,W){const D=p[R.row][R.col];p[R.row][R.col]=p[W.row][W.col],p[W.row][W.col]=D}function xt(){const R=new Set;for(let W=0;W<n;W++){let D=p[W][0],O=0;for(let te=1;te<=o;te++){const me=te<o?p[W][te]:null;if(me===D)continue;const ke=te-O;if(D!=null&&ke>=3)for(let Ce=O;Ce<te;Ce++)R.add(`${W},${Ce}`);D=me,O=te}}for(let W=0;W<o;W++){let D=p[0][W],O=0;for(let te=1;te<=n;te++){const me=te<n?p[te][W]:null;if(me===D)continue;const ke=te-O;if(D!=null&&ke>=3)for(let Ce=O;Ce<te;Ce++)R.add(`${Ce},${W}`);D=me,O=te}}return R}function qe(R){if(!R||!R.size)return 0;const W=R.size;v+=W*4,he&&(he.textContent=String(v)),!A&&v>=f&&yt(!0);for(const D of R){const[O,te]=D.split(","),me=Number(O),ke=Number(te);p[me][ke]=null}for(let D=0;D<o;D++){let O=n-1;for(let te=n-1;te>=0;te--)p[te][D]!=null&&(p[O][D]=p[te][D],O--);for(let te=O;te>=0;te--)Math.random()<x?p[te][D]=u:p[te][D]=at()}return W}function Je(R,W){const D=new Set;for(let O=0;O<o;O++)D.add(`${R},${O}`);for(let O=0;O<n;O++)D.add(`${O},${W}`);qe(D),Ne(),A||setTimeout(()=>At(!1),120)}function At(R=!1){if(A)return;E=!0;const W=()=>{if(A){E=!0;return}const D=xt();if(!D.size){E=!1,Ne(),R&&!A&&(_<=0?Ke():Oe("Nice! Keep matching."));return}qe(D),Ne(),setTimeout(W,120)};W()}function yt(R){if(!A)if(A=!0,E=!0,R){Oe("Great job! Puzzle completed 🎉");try{t?.id&&kr(t.id),Gt(10)}catch{}it(),setTimeout(()=>{An()},1600)}else Oe("Out of moves. Try again next time 🙂")}function Ke(){v>=f?yt(!0):_<=0&&yt(!1)}function Te(R,W,D,O){if(E||A)return;if(_<=0){Ke();return}const te={row:R,col:W},me={row:D,col:O};if(!ut(te,me))return;const ke=p[R][W],Ce=p[D][O],gt=st(ke)||st(Ce);if(je(te,me),h=null,_--,de&&(de.textContent=String(_)),gt){Ne();const Ge=st(p[R][W])?{row:R,col:W}:{row:D,col:O};Je(Ge.row,Ge.col),Ke();return}if(!xt().size){je(te,me),Ne(),Oe("No match… try another swap."),Ke();return}Oe(""),Ne(),At(!0)}function Ie(R,W){if(E||A)return;if(_<=0){Ke();return}const D={row:R,col:W};if(!h){h=D,Ne();return}if(h.row===R&&h.col===W){h=null,Ne();return}if(!ut(h,D)){h=D,Ne();return}Te(h.row,h.col,D.row,D.col)}function fe(){An()}Be&&(Be.onclick=fe),ot&&(ot.onclick=()=>{fe()}),Lt(),Ne(),Oe("Tap or swipe two neighboring tiles to swap them.")}const Er="cbsgo_inventory_v2";function go(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function bo(){return{tickets:0,cbs:0,cards:{}}}function De(){const t=localStorage.getItem(Er),n=go(t,bo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function dn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Er,JSON.stringify(n))}function Mr(){return Number(De().tickets||0)}function Lr(){return Number(De().cbs||0)}function Mt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De();return o.tickets=Number(o.tickets||0)+n,dn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function pn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De();return o.cbs=Number(o.cbs||0)+n,dn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function ho(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,dn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function mo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,dn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const Ar="cbsgo_steps_v6",wo="cbsgo_steps_v5",vo="cbsgo_gps_autostart_v2",zr="cbsgo_daily_puzzle_v1",_o=.75,kt=5e3,rn=7,$n=100,So=1e3,ko=.5,Co=2e3,Eo=4.5,zn=1500,Bn=200,Mo=.25,Lo=.05,Ao=.3;let Jt=null,Qt=!1,mt={msg:"init"};function On(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Br="cbsgo_cards_v1",zo=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Bo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function No(t){return zo.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function To(){try{const t=localStorage.getItem(Br),n=On(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,d]of Object.entries(n))if(d&&typeof d=="object"&&"count"in d){const f=Number(d.count);Number.isFinite(f)&&f>0&&(o[l]=f)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Io(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[d,f]of Object.entries(n)){const g=Number(f||0);Number.isFinite(g)&&g>0&&(o[d]=g)}const l={counts:o};localStorage.setItem(Br,JSON.stringify(l))}catch{}}function Po(t,n=1){const o=Bo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const f={...To().counts||{}},u=Number(f[o]||0)+l;f[o]=u,Io({counts:f});const x=No(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:f}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:u,card:x}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:x}}))}catch{}return{cardId:o,count:u,card:x}}function rt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function $o(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,d]=n,f=new Date(o,l-1,d);return Number.isNaN(f.getTime())?null:f}function Oo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Nr(t,n){const o=$o(t);if(!o)return[];const l=[];for(let d=n-1;d>=0;d--){const f=new Date(o.getTime());f.setDate(f.getDate()-d),l.push(Oo(f))}return l}function on(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:rt(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function jo(t){const n=rt();return!t||typeof t!="object"?on():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function un(t){t.updatedAt=Date.now(),localStorage.setItem(Ar,JSON.stringify(t))}function Ro(t,n){if(!n)return;const o=Nr(n,rn);!o.length||!o.every(d=>!!t.streak[d])||t.lastStreakRewardDate!==n&&(pn($n),Wt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:rn,rewardCbs:$n,lastDayKey:n}})))}function ar(t){t=jo(t||on());const n=rt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Ro(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,un(t)}return t}function pt(){let t=localStorage.getItem(Ar);if(!t){const o=localStorage.getItem(wo);if(o){const l=On(o,on()),d=ar(l);return un(d),d}}const n=On(t,on());return ar(n)}function en(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Uo()}}))}function Gn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Wt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Wn(t,n,o,l){const d=Number(t||0),f=Number(n||0),g=0;if(!(!d&&!f&&!g))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:d,tickets:f,cbs:g,reason:l||"distance"}}))}catch{}}function Uo(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Fo(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Go(){return Fo()/1e3}function Wo(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,d=t.dayKey||rt(),f=t.streak||{},u=Nr(d,rn).map(x=>{let p=!1;return x===d?p=l:p=!!f[x],{dateKey:x,reached:p}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:u,todayKey:d,streakLength:rn,rewardPerStreak:$n}}function sr(){return!!Qt}function Do(){try{return localStorage.getItem(zr)===rt()}catch{return!1}}function Yo(){try{localStorage.setItem(zr,rt())}catch{}}function qo(t,n){return Do()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:rt()}})),Yo(),!0)}function lr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Ko(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const d=l-o;if(!Number.isFinite(d)||d<zn)return;const f=Math.floor(d/zn);f<=0||(Mt(f),Wt(),Wn(0,f,0,"boost"),t.boostLastStep=o+f*zn)}function Ho(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Bn){t.chestMeters=n;return}let o=0;for(;n>=Bn&&o<5;)if(n-=Bn,o+=1,Math.random()<Mo){const l=Math.random()<Lo,d=l?10:3,f=l?2:1;Gt(d),Gn(),Mt(f),Wt();const g=l&&Math.random()<Ao;Wn(d,f,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:d,tickets:f,rare:l,hasCBSFlag:g}}));break}t.chestMeters=n}function Xo(t,n){const l=p=>p*Math.PI/180,d=l(n.lat-t.lat),f=l(n.lng-t.lng),g=l(t.lat),u=l(n.lat),x=Math.sin(d/2)**2+Math.cos(g)*Math.cos(u)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(x))}function Vo(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const d=Math.floor(n/1e3),f=Number(t.xpKmAwarded||0);if(d>f){const p=d-f;p>0&&(Gt(p),Gn(),t.xpKmAwarded=d,o+=p)}const u=Math.floor(n/2500),x=Number(t.ticketChunksAwarded||0);if(u>x){const p=u-x;p>0&&(Mt(p),Wt(),t.ticketChunksAwarded=u,l+=p)}(o>0||l>0)&&Wn(o,l,0,"distance")}function Zo(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),d=Math.floor((o.meters||0)/_o);if(d>l){const f=d-l;o.steps=d,o.daySteps=Number(o.daySteps||0)+f}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||rt(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),Vo(o),Ko(o),Ho(o),un(o),en(),o}function Jo(){Jt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Jt),Jt=null}async function fr(t={}){const n=!!t.silent;if(!navigator.geolocation)return mt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(vo,"1")}catch{}Jo(),Qt=!0,mt={msg:"requesting",t:Date.now()};try{return Jt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,d=o.coords.longitude,f=o.coords.accuracy||999,g=Date.now(),u=pt(),x=u.lastPos;u.lastPos={lat:l,lng:d,t:g},un(u);const p=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:d,acc:f,heading:p,speed:h,t:g}})),f>So){mt={lat:l,lng:d,acc:f,t:g,reason:"accuracy",boostMs:lr()},en();return}qo(l,d);let v=0,_=0,E=0,A=0,B="no-last";x&&typeof x.lat=="number"&&typeof x.lng=="number"&&typeof x.t=="number"&&(v=Xo({lat:x.lat,lng:x.lng},{lat:l,lng:d}),_=Math.max(1,(g-x.t)/1e3),E=v/_,v<ko?B="jitter":v>Co?B="teleport":E>Eo?B="too-fast":(Zo(v),A=v,B="ok")),mt={lat:l,lng:d,acc:f,t:g,dist:Math.round(v),dt:Math.round(_),speed:Number.isFinite(E)?Number(E.toFixed(2)):0,added:Math.round(A),reason:B,boostMs:lr()},en()},o=>{Qt=!1,mt={err:o?.message||"GPS blocked",t:Date.now()},en()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return Qt=!1,mt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Qo(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>sr()||await fr({silent:!0}))();const n=async()=>{sr()||await fr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),d=Number(n.cbs||0);o>0&&(Gt(o),Gn()),(l>0||d>0)&&(l>0&&Mt(l),d>0&&pn(d),Wt());const f=n.cardId||n.card_id;if(f)try{const g=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Po(f,g)}catch(g){console.warn("CBS GO: grantCard from lootReward failed",g)}}));function Tr(){const t=cn(),n=Ut(),o=vr(),l=_r(),d=Go(),f=l>0?Math.min(100,Math.round(o/l*100)):0;return`
    <div id="cbsgoXpBarInner" style="
      min-width:160px;
      max-width:220px;
      font-family:system-ui,sans-serif;
      color:#fff;
      font-size:11px;
    ">
      <!-- Level + balk -->
      <div id="cbsgoXpLabel" style="
        font-weight:700;
        font-size:11px;
        margin-bottom:4px;
        text-align:right;
      ">
        Level ${n}
      </div>

      <div style="
        position:relative;
        height:7px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
      ">
        <div id="cbsgoXpFill" style="
          position:absolute;
          inset:0;
          width:${f}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 10px rgba(168,85,247,.65);
          transition:width .25s ease-out;
        "></div>
      </div>

      <!-- Tekst onder de balk: XP + kilometers -->
      <div id="cbsgoXpText" style="
        margin-top:3px;
        opacity:.9;
        text-align:right;
        line-height:1.3;
      ">
        <div>${o}/${l} XP · total ${t}</div>
        <div>${d.toFixed(2)} km walked</div>
      </div>
    </div>
  `}function Ir(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:d,rewardPerStreak:f}=Wo(),g=n>0?Math.min(100,Math.round(t/n*100)):0,u=(l||[]).map(p=>p.reached?"★":"☆").join(" ");return`
    <div id="cbsgoDailyWidget" style="
      min-width:160px;
      max-width:220px;
      font-family:system-ui,sans-serif;
      color:#fff;
      font-size:10px;
      padding:8px 10px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.72);
      backdrop-filter:blur(10px);
    ">
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:6px;
        margin-bottom:4px;
      ">
        <div style="font-weight:700;font-size:11px;">Daily goal</div>
        <div style="font-size:10px;opacity:.9;">${`${t} / ${n} steps${o?" ✅":""}`}</div>
      </div>

      <div style="
        position:relative;
        height:5px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
        margin-bottom:4px;
      ">
        <div style="
          position:absolute;
          inset:0;
          width:${g}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 8px rgba(168,85,247,.6);
          transition:width .25s ease-out;
        "></div>
      </div>

      <div style="text-align:right;font-size:11px;letter-spacing:1px;margin-bottom:2px;">
        ${u}
      </div>

      <div style="text-align:right;font-size:9px;opacity:.75;">
        ${d}-day streak → +${f} CBS
      </div>
    </div>
  `}function Pr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ei(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const $r="cbsgo_player_name_v2",Dn="cbsgo_player_avatar_v2";function Dt(){try{return localStorage.getItem($r)||"Sovereign"}catch{return"Sovereign"}}function Or(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem($r,n)}catch{}return n}function Yn(){try{return localStorage.getItem(Dn)||""}catch{return""}}function ti(t){const n=String(t||"");try{localStorage.setItem(Dn,n)}catch{}return n}function ni(){try{localStorage.removeItem(Dn)}catch{}}let q=null,et=null,tt=null,It=null,$t=null,Ue=null,ze=null,wt=0,ct=!1,Ze=!0,Re=null;const Xe=new Map;let Ve=!0,Ot={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const ri="48a387bba00043ac4ba5823371abc9d2",Ft=80,oi=6,ii=80,ai=220,si=6e4,li=5*6e4,fi=300,ci=.35,Nn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],di=350,pi=.35,ui=120;let an=0,vt=0,tn=null,jn=!1,St=[];function dt(t){return document.getElementById(t)}function _t(t){const n=dt("cbsgoMapHost");if(!n)return;let o=dt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function xi(){const t=String(Dt()||"").trim();return t?t[0].toUpperCase():"🙂"}function Rn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=p=>p*Math.PI/180,d=l(n.lat-t.lat),f=l(n.lng-t.lng),g=l(t.lat),u=l(n.lat),x=Math.sin(d/2)**2+Math.cos(g)*Math.cos(u)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(x))}function jr(t,n,o){const l=n+Math.random()*(o-n),d=Math.random()*2*Math.PI,f=l*Math.cos(d)/111111,g=l*Math.sin(d)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+f,lng:t.lng+g}}function yi(t,n){const o=p=>p*Math.PI/180,l=o(t.lat),d=o(n.lat),f=o(n.lng-t.lng),g=Math.sin(f)*Math.cos(d),u=Math.cos(l)*Math.sin(d)-Math.sin(l)*Math.cos(d)*Math.cos(f);let x=Math.atan2(g,u);return x=x*180/Math.PI,x=(x+360)%360,x}function gi(t,n,o){const d=n/6371e3,f=o*Math.PI/180,g=t[0]*Math.PI/180,u=t[1]*Math.PI/180,x=Math.sin(g),p=Math.cos(g),h=Math.sin(d),v=Math.cos(d),_=Math.asin(x*v+p*h*Math.cos(f)),E=u+Math.atan2(Math.sin(f)*h*p,v-x*Math.sin(_));return[_*180/Math.PI,E*180/Math.PI]}function bi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
    @keyframes cbsgoRainFall {
      0%   { transform: translate3d(var(--x, 0%), -10%, 0); opacity: 0; }
      10%  { opacity: 1; }
      100% { transform: translate3d(var(--xEnd, 0%), 110%, 0); opacity: 0; }
    }

    @keyframes cbsgoSnowFall {
      0%   { transform: translate3d(var(--x, 0%), -10%, 0); opacity: 0; }
      15%  { opacity: 1; }
      100% { transform: translate3d(var(--xEnd, 0%), 110%, 0); opacity: 0.2; }
    }

    .cbsgoRainDrop {
      position:absolute;
      top:-10%;
      width:2px;
      height:22px;
      background:rgba(173,216,230,0.9);
      border-radius:999px;
      opacity:0;
      animation-name:cbsgoRainFall;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    }

    .cbsgoSnowFlake {
      position:absolute;
      top:-10%;
      width:10px;
      height:10px;
      border-radius:50%;
      background:rgba(255,255,255,0.95);
      box-shadow:0 0 6px rgba(255,255,255,0.9);
      opacity:0;
      animation-name:cbsgoSnowFall;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    }
  `,document.head.appendChild(t)}function Rr(){const{temp:t,iconEmoji:n}=Ot;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Ur(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;bi();const{condition:n,isNight:o}=Ot;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const f=[];for(let g=0;g<48;g++){const u=Math.random()*100,x=Math.random()*16-8,p=Math.random()*2.5,h=2+Math.random()*1.5;f.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${u}%;
            --xEnd:${u+x}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=f.join("")}else if(n==="snow"){const f=[];for(let g=0;g<42;g++){const u=Math.random()*100,x=Math.random()*20-10,p=Math.random()*4,h=6+Math.random()*4;f.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${u}%;
            --xEnd:${u+x}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=f.join("")}else l="";t.innerHTML=l}async function hi(t,n){const o=Date.now();if(!(Ot.lastUpdated&&o-Ot.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${ri}&units=metric`,d=await fetch(l);if(!d.ok)throw new Error("HTTP "+d.status);const f=await d.json(),g=f?.main?.temp,u=f?.weather?.[0]?.icon||"01d",x=String(f?.weather?.[0]?.main||"").toLowerCase();let p=u.endsWith("n"),h="⛅",v="clear";u.startsWith("01")||u.startsWith("02")?v="clear":u.startsWith("03")||u.startsWith("04")?(h="☁️",v="clouds"):u.startsWith("09")||u.startsWith("10")?(h="🌧️",v="rain"):u.startsWith("11")?(h="⛈️",v="storm"):u.startsWith("13")?(h="❄️",v="snow"):u.startsWith("50")&&(h="🌫️",v="mist"),x.includes("rain")&&(v="rain"),x.includes("snow")&&(v="snow"),x.includes("thunder")&&(v="storm");try{const E=Number(f?.dt||0),A=Number(f?.timezone||0);if(E&&Number.isFinite(A)){const Q=((E+A)/3600%24+24)%24;p=Q<7||Q>=19}}catch{}v==="clear"?h=p?"🌙":"☀️":v==="clouds"?h="☁️":v==="rain"?h="🌧️":v==="storm"?h="⛈️":v==="snow"?h="❄️":v==="mist"&&(h="🌫️"),Ot={temp:g,iconEmoji:h,condition:v,isNight:p,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Rr()),Ur()}catch(l){console.warn("Weather fetch failed",l)}}function mi(t){const n=Yn();if(n){const d=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${n}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:d,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const l=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${Rn(xi())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function cr(t,n){const o=`
    <div style="
      width:28px;
      height:28px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:18px;
      filter:drop-shadow(0 2px 3px rgba(0,0,0,.8));
      /* Eerst een beetje naar boven duwen, dan roteren -> pijltje draait rond de avatar */
      transform: rotate(${n}deg) translateY(-26px);
      transform-origin:center center;
    ">
      ▲
    </div>
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function wi(t,n,o,l){if(!l&&o){const u=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Rn(o)}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:u,className:"",iconSize:[30,30],iconAnchor:[15,15]})}const d=String(n||"").trim()||"🙂",f=`
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${Rn(d)}</div>
  `;return t.divIcon({html:f,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function vi(t){return t.divIcon({html:`
    <div style="
      position:relative;
      width:40px;height:40px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.80);
      backdrop-filter: blur(10px);
      box-shadow:0 10px 22px rgba(0,0,0,.45);
      font-size:22px;
    ">
      🎁
      <div style="
        position:absolute;
        right:-4px;bottom:-4px;
        width:20px;height:20px;
        border-radius:999px;
        border:1px solid rgba(0,0,0,.7);
        background:rgba(15,23,42,.96);
        display:flex;align-items:center;justify-content:center;
        font-size:12px;
        color:#facc15;
        font-weight:900;
      ">
        ?
      </div>
    </div>
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function _i(t){return t.divIcon({html:`
    <div style="
      width:46px;height:46px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.78);
      backdrop-filter: blur(10px);
      box-shadow:0 0 20px rgba(96,165,250,.65), 0 10px 22px rgba(0,0,0,.45);
      font-size:22px;
    ">
      🧩
    </div>
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Si(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function ki(){if(!Nn.length)return null;const t=Math.floor(Math.random()*Nn.length);return Nn[t]}function Ci(t){const n=t||"small";let o,l,d;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),d=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),d=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,d=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,d=Math.random()<.25?3+Math.floor(Math.random()*8):0);let f=null,g=0;if(Math.random()<ci){const u=ki();u&&(f=u,g=1)}return{xp:o,tickets:l,cbs:d,cardId:f,cardCount:g}}function Ei(t){if(!q||!Ue||!t)return;const n=Date.now();if(n-an<si||Ue.getLayers().length>=oi)return;const l=window.L;if(!l)return;const d=Si(),f=Ci(d),g=jr(t,ii,ai),u=vi(l),x=l.marker([g.lat,g.lng],{icon:u,pane:"cbsgo-loot-pane"}),h={marker:x,createdAt:n,lat:g.lat,lng:g.lng,reward:f};St.push(h),x.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const v={lat:ze[0],lng:ze[1]},_={lat:g.lat,lng:g.lng},E=Ct(v,_);if(E>Ft){alert(`Too far to open this gift.

Distance: ${Math.round(E)}m
Needed: ≤ ${Ft}m`);return}Ue.removeLayer(x),St=St.filter(Be=>Be.marker!==x);const{xp:A,tickets:B,cbs:Q,cardId:K,cardCount:ee}=f,he=[];A&&he.push(`+${A} XP`),B&&he.push(`+${B} ticket${B===1?"":"s"}`),Q&&he.push(`+${Q} CBS`),K&&ee>0&&he.push(`+${ee} card${ee===1?"":"s"}`);const de=he.length?he.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${de}`);const ce={kind:"mystery",xp:A||0,tickets:B||0,cbs:Q||0,cardId:K||null,cardCount:ee||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:ce}))}catch{}}),x.addTo(Ue),an=n}function Mi(t){if(!q||!Ue||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!Ue.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>li)return Ue.removeLayer(l.marker),o+=1,!1;const f=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(f)&&f>fi?(Ue.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Ue.getLayers().length===0&&(an=0)}function Li(t){if(!q||!$t||!t||tn)return;const n=window.L;if(!n)return;if(jn){if(vt<di||Math.random()>pi)return;vt=0}else{if(vt<ui)return;vt=0,jn=!0}const o=jr(t,60,140),l=_i(n),d=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});d.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:ze[0],lng:ze[1]},g={lat:o.lat,lng:o.lng},u=Ct(f,g);if(u>Ft){alert(`Too far to start this puzzle.

Distance: ${Math.round(u)}m
Needed: ≤ ${Ft}m`);return}$t.removeLayer(d),tn=null,Pn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),d.addTo($t),tn=d}function Ai(t){const n=window.L;if(!n||!q||!t)return;const o=Ft;It?(It.setLatLng(t),It.setRadius(o)):It=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(q)}function zi(t){const n=window.L;if(!n||!q)return;const o=mi(n);if(et?(et.setIcon(o),et.setLatLng(t)):(et=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(q),q.setView(t,19)),tt?(tt.setIcon(cr(n,wt)),tt.setLatLng(t)):tt=n.marker(t,{icon:cr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(q),et&&et.bringToFront&&et.bringToFront(),tt&&tt.bringToFront&&tt.bringToFront(),Ai(t),Ze&&!ct&&q)try{const l=q.getZoom()||19;let d=t;Number.isFinite(wt)&&(d=gi(t,40,wt));const f=q.getCenter(),g=Ct({lat:f.lat,lng:f.lng},{lat:d[0],lng:d[1]});(!Number.isFinite(g)||g>20)&&q.setView(d,l)}catch{}}function Fr(){const t=window.L;return!t||!q?null:(Re?(Ve&&!q.hasLayer(Re)&&Re.addTo(q),!Ve&&q.hasLayer(Re)&&q.removeLayer(Re)):(Re=t.layerGroup(),Ve&&Re.addTo(q)),Re)}function Bi(t){if(!Array.isArray(t)||!q)return[];const n=q.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(f=>{if(!f||f.isMe||typeof f.lat!="number"||typeof f.lng!="number")return;const g=Math.round(f.lat*o)/o,u=Math.round(f.lng*o)/o,x=`${g}_${u}`;l.has(x)||l.set(x,[]),l.get(x).push(f)});const d=[];for(const[f,g]of l.entries())if(g.length)if(g.length===1){const u=g[0];d.push({id:u.wallet_pk||f,lat:u.lat,lng:u.lng,count:1,nickname:u.nickname||"Anon",avatar:u.avatar||"",isCluster:!1})}else{let u=0,x=0;g.forEach(v=>{u+=v.lat,x+=v.lng});const p=u/g.length,h=x/g.length;d.push({id:`cluster_${f}`,lat:p,lng:h,count:g.length,nickname:`${g.length} players`,avatar:"",isCluster:!0})}return d}function Ni(t){const n=window.L;if(!n||!q)return;const o=Fr();if(!o)return;if(!Ve){for(const[f,g]of Xe.entries())o.removeLayer(g),Xe.delete(f);return}const l=Bi(t),d=new Set;l.forEach(f=>{if(!f||typeof f.lat!="number"||typeof f.lng!="number")return;const g=f.id||`${f.lat},${f.lng}`;d.add(g);const u=[f.lat,f.lng];let x=Xe.get(g);if(x)x.setLatLng(u);else{const p=f.isCluster&&f.count>1?String(f.count):f.nickname||"Anon",h=wi(n,p,f.avatar,f.isCluster);x=n.marker(u,{icon:h,pane:"cbsgo-others-pane"});const v=f.isCluster&&f.count>1?`${f.count} CBS-GO explorers nearby`:`${f.nickname||"CBS-GO explorer"}`;x.bindPopup(v),x.addTo(o),Xe.set(g,x)}});for(const[f,g]of Xe.entries())d.has(f)||(o.removeLayer(g),Xe.delete(f))}function Ti(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Weer-effect laag (regen/sneeuw/nacht) -->
      <div id="cbsgoWeatherFx" style="
        position:absolute;
        inset:0;
        z-index:2000;
        pointer-events:none;
        overflow:hidden;
      "></div>

      <!-- Weer-bolletje linksboven -->
      <div id="cbsgoWeather" style="
        position:absolute;
        top:16px;
        left:12px;
        z-index:3000;
        padding:6px 10px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.18);
        background:rgba(10,12,18,.78);
        backdrop-filter: blur(10px);
        font-size:12px;
        color:#fff;
        font-family:system-ui,sans-serif;
        display:inline-flex;
        align-items:center;
        gap:6px;
      ">
        <span id="cbsgoWeatherLabel">${Rr()}</span>
      </div>

      <!-- Kompas + centreer-player + online-toggle RECHTSONDER -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;
        bottom:148px;
        z-index:3000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
        <button id="cbsgoOnlineToggleBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          color:#fff;
          font-size:22px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">👥</button>
        <button id="cbsgoCompassBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          color:#fff;
          font-size:22px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">🧭</button>
        <button id="cbsgoCenterBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          color:#fff;
          font-size:22px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">🎯</button>
      </div>
    </div>
  `}function Ii(){try{q&&q.remove()}catch{}q=null,et=null,tt=null,It=null,$t=null,Ue=null,ze=null,ct=!1,Ze=!0,an=0,vt=0,tn=null,jn=!1,Re=null,Xe.clear(),St=[]}function Pi(){const t=window.L,n=dt("cbsgoMap");if(!t||!n)return!1;Ii();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));q=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=q.createPane("cbsgo-player-pane");l.style.zIndex="650";const d=q.createPane("cbsgo-others-pane");d.style.zIndex="640";const f=q.createPane("cbsgo-loot-pane");f.style.zIndex="630";const g=q.createPane("cbsgo-puzzle-pane");return g.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(q),q.setMaxBounds(o),q.setView([51.687,4.87],16),$t=t.layerGroup().addTo(q),Ue=t.layerGroup().addTo(q),q.on("dragstart",()=>{Ze=!1}),q.on("zoomstart",()=>{Ze=!1}),!0}function $i(){!navigator.geolocation||!q||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:d}=t.coords,f={lat:n,lng:o},g=ze?{lat:ze[0],lng:ze[1]}:null;if(ze=[n,o],Number.isFinite(d))wt=d;else if(g){const u=Ct(g,f);Number.isFinite(u)&&u>2&&(wt=yi(g,f))}if(zi([n,o]),g){const u=Ct(g,f);if(Number.isFinite(u)&&u>1&&(vt+=u),Number.isFinite(u)&&u>20&&!Ze&&!ct&&q){Ze=!0;const x=q.getZoom()||19;q.setView([n,o],x)}}Li(f),Ei(f),Mi(f),hi(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Oi(){let t=0;const n=120,o=()=>{if(t++,!dt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!Pi()){_t("Could not init map. Refresh.");return}const d=dt("cbsgoCenterBtn");d&&(d.onclick=()=>{q&&ze&&(Ze=!0,ct=!1,q.setView(ze,19))});const f=dt("cbsgoCompassBtn");f&&(f.onclick=()=>{q&&(ct=!ct,ct?(Ze=!1,q.setView([51.687,4.87],3)):ze&&(Ze=!0,q.setView(ze,16)))});const g=dt("cbsgoOnlineToggleBtn");if(g){const u=()=>{Ve?(g.style.borderColor="rgba(251,191,36,0.95)",g.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(g.style.borderColor="rgba(255,255,255,0.18)",g.style.boxShadow="none")};u(),g.onclick=()=>{Ve=!Ve;const x=Fr();if(x&&q&&(Ve?q.hasLayer(x)||x.addTo(q):q.hasLayer(x)&&q.removeLayer(x)),u(),!Ve&&Re){for(const[p,h]of Xe.entries())Re.removeLayer(h);Xe.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",u=>{const x=u?.detail?.players||[];Ni(x)})),Ur(),_t("Loading GPS…"),$i()};o()}const ji="cbsgo_cards_v1";function Ri(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function qn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Kn(){const t=localStorage.getItem(ji),n=Ri(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const d=Number(l.count||0);Number.isFinite(d)&&d>0&&(o[l.id]=d)}),o}function nt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Gr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Ui(){const t=qn(),n=Kn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Fi(){const t=qn(),n=Kn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const d=Number(n[l.id]||0),f=Number.isFinite(d)&&d>0,g=Gr(l.rarity),u=f?g:"rgba(31,41,55,.9)",x=f?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",p=f?l.emoji||"🃏":"❓",h=f?nt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',v=nt(l.set||"Set"),_=f?`<div style="
             position:absolute;
             right:6px;
             top:6px;
             padding:2px 6px;
             border-radius:999px;
             border:1px solid ${g};
             background:rgba(15,23,42,.96);
             font-size:10px;
           ">
             x${d}
           </div>`:"";return`
        <div
          class="cbsgoCardTile"
          data-card-id="${nt(l.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${u};
            background:${x};
            padding:6px 6px 7px 6px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            min-height:96px;
            cursor:pointer;
          "
        >
          ${_}
          <div style="
            font-size:${f?"26px":"28px"};
            margin-top:${f?"4px":"8px"};
            margin-bottom:4px;
          ">
            ${nt(p)}
          </div>
          <div style="
            width:100%;
            text-align:center;
            font-size:11px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            margin-bottom:2px;
          ">
            ${h}
          </div>
          <div style="
            font-size:10px;
            opacity:.7;
          ">
            ${v}
          </div>
        </div>
      `}).join("")}
    </div>
  `:`
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `}function Gi(){const t=Ui(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,d=o>0?Math.round(n/o*100):0;return`
    <div style="
      display:flex;
      flex-direction:column;
      gap:10px;
    ">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div style="font-size:11px;opacity:.8;">
          Fill your map by walking, playing CBS-GO and later by swapping cards with friends.
        </div>
        <div style="
          padding:4px 8px;
          border-radius:999px;
          border:1px solid rgba(148,163,184,.9);
          font-size:11px;
        ">
          ${l}
        </div>
      </div>

      <div style="
        width:100%;
        height:4px;
        border-radius:999px;
        background:rgba(15,23,42,1);
        overflow:hidden;
        margin-top:-2px;
        margin-bottom:4px;
      ">
        <div style="
          width:${d}%;
          height:100%;
          background:linear-gradient(to right, #38bdf8, #facc15);
          transition:width .25s ease-out;
        "></div>
      </div>

      <div style="
        flex:1;
        max-height:60vh;
        overflow:auto;
        padding:4px 2px 2px 2px;
      ">
        ${Fi()}
      </div>
    </div>
  `}function Wi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="
          width:28px;height:28px;
          border-radius:999px;
          border:1px solid rgba(251,191,36,.9);
          display:flex;align-items:center;justify-content:center;
          background:rgba(15,23,42,1);
        ">
          🃏
        </div>
        <div>
          <div style="font-size:15px;font-weight:800;">
            My Cards
          </div>
          <div style="font-size:11px;opacity:.78;">
            Walking & CBS cards. Collected and still hidden.
          </div>
        </div>
      </div>
      <button type="button" id="cbsgoCardsCloseBtn" style="
        padding:6px 10px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,1);
        color:#e5e7eb;
        font-size:11px;
        font-weight:600;
        cursor:pointer;
      ">
        Close
      </button>
    </div>

    ${Gi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},d=document.getElementById("cbsgoCardsCloseBtn");d&&(d.onclick=l),n.addEventListener("click",p=>{p.target===n&&l()});const f=qn(),g=new Map(f.map(p=>[p.id,p]));function u(p){const h=g.get(p);if(!h)return;const v=Kn(),_=Number(v[p]||0),E=Number.isFinite(_)&&_>0,A=E?h.emoji||"🃏":"❓",B=E?h.name||"Card":"Unknown card",Q=h.set||"Set",K=h.rarity||"common",ee=Gr(K),he={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[K]||"Common",de=document.createElement("div");de.style.position="fixed",de.style.inset="0",de.style.display="flex",de.style.alignItems="center",de.style.justifyContent="center",de.style.background="rgba(0,0,0,0.65)",de.style.pointerEvents="auto",de.style.zIndex="8600";const ce=document.createElement("div");ce.style.width="min(260px, 82vw)",ce.style.borderRadius="20px",ce.style.border=`1px solid ${ee}`,ce.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",ce.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",ce.style.padding="16px 14px 14px 14px",ce.style.textAlign="center",ce.style.color="#fff",ce.style.fontFamily="system-ui,sans-serif",ce.style.opacity="0",ce.style.transform="translateY(14px) scale(0.96)",ce.style.transition="opacity .2s ease-out, transform .2s ease-out";const Be=E?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',ot=E?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;ce.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${nt(Q)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${ee};
          font-size:10px;
        ">
          ${nt(he)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${ee};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${nt(A)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${nt(B)}
      </div>

      ${Be}
      ${ot}

      <button type="button" style="
        margin-top:10px;
        padding:7px 14px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,1);
        color:#e5e7eb;
        font-size:11px;
        font-weight:600;
        cursor:pointer;
      " id="cbsgoCardPreviewCloseBtn">
        Close
      </button>
    `,de.appendChild(ce),document.body.appendChild(de),requestAnimationFrame(()=>{ce.style.opacity="1",ce.style.transform="translateY(0) scale(1)"});const Fe=()=>{ce.style.opacity="0",ce.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(de)},200)},Oe=ce.querySelector("#cbsgoCardPreviewCloseBtn");Oe&&(Oe.onclick=Fe),de.addEventListener("click",it=>{it.target===de&&Fe()})}o.querySelectorAll(".cbsgoCardTile").forEach(p=>{p.addEventListener("click",()=>{const h=p.getAttribute("data-card-id");h&&u(h)})})}function Di(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Yi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var d=!1;try{d=this instanceof l}catch{}return d?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var d=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,d.get?d:{enumerable:!0,get:function(){return t[l]}})}),o}function qi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Tn={exports:{}};const Ki={},Hi=Object.freeze(Object.defineProperty({__proto__:null,default:Ki},Symbol.toStringTag,{value:"Module"})),Xi=Yi(Hi);var dr;function Vi(){return dr||(dr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},d=new Uint8Array(16),f=new Uint8Array(32);f[0]=9;var g=o(),u=o([1]),x=o([56129,1]),p=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),v=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),E=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function A(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function B(r,a,i,e,s){var y,b=0;for(y=0;y<s;y++)b|=r[a+y]^i[e+y];return(1&b-1>>>8)-1}function Q(r,a,i,e){return B(r,a,i,e,16)}function K(r,a,i,e){return B(r,a,i,e,32)}function ee(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,y=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,b=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,z=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,F=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,T=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,xe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,P=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,$=s,G=y,I=b,j=k,U=z,N=F,m=T,w=xe,M=P,S=H,C=X,L=re,Y=ne,oe=V,ae=J,ie=Z,c,le=0;le<20;le+=2)c=$+Y|0,U^=c<<7|c>>>25,c=U+$|0,M^=c<<9|c>>>23,c=M+U|0,Y^=c<<13|c>>>19,c=Y+M|0,$^=c<<18|c>>>14,c=N+G|0,S^=c<<7|c>>>25,c=S+N|0,oe^=c<<9|c>>>23,c=oe+S|0,G^=c<<13|c>>>19,c=G+oe|0,N^=c<<18|c>>>14,c=C+m|0,ae^=c<<7|c>>>25,c=ae+C|0,I^=c<<9|c>>>23,c=I+ae|0,m^=c<<13|c>>>19,c=m+I|0,C^=c<<18|c>>>14,c=ie+L|0,j^=c<<7|c>>>25,c=j+ie|0,w^=c<<9|c>>>23,c=w+j|0,L^=c<<13|c>>>19,c=L+w|0,ie^=c<<18|c>>>14,c=$+j|0,G^=c<<7|c>>>25,c=G+$|0,I^=c<<9|c>>>23,c=I+G|0,j^=c<<13|c>>>19,c=j+I|0,$^=c<<18|c>>>14,c=N+U|0,m^=c<<7|c>>>25,c=m+N|0,w^=c<<9|c>>>23,c=w+m|0,U^=c<<13|c>>>19,c=U+w|0,N^=c<<18|c>>>14,c=C+S|0,L^=c<<7|c>>>25,c=L+C|0,M^=c<<9|c>>>23,c=M+L|0,S^=c<<13|c>>>19,c=S+M|0,C^=c<<18|c>>>14,c=ie+ae|0,Y^=c<<7|c>>>25,c=Y+ie|0,oe^=c<<9|c>>>23,c=oe+Y|0,ae^=c<<13|c>>>19,c=ae+oe|0,ie^=c<<18|c>>>14;$=$+s|0,G=G+y|0,I=I+b|0,j=j+k|0,U=U+z|0,N=N+F|0,m=m+T|0,w=w+xe|0,M=M+P|0,S=S+H|0,C=C+X|0,L=L+re|0,Y=Y+ne|0,oe=oe+V|0,ae=ae+J|0,ie=ie+Z|0,r[0]=$>>>0&255,r[1]=$>>>8&255,r[2]=$>>>16&255,r[3]=$>>>24&255,r[4]=G>>>0&255,r[5]=G>>>8&255,r[6]=G>>>16&255,r[7]=G>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=j>>>0&255,r[13]=j>>>8&255,r[14]=j>>>16&255,r[15]=j>>>24&255,r[16]=U>>>0&255,r[17]=U>>>8&255,r[18]=U>>>16&255,r[19]=U>>>24&255,r[20]=N>>>0&255,r[21]=N>>>8&255,r[22]=N>>>16&255,r[23]=N>>>24&255,r[24]=m>>>0&255,r[25]=m>>>8&255,r[26]=m>>>16&255,r[27]=m>>>24&255,r[28]=w>>>0&255,r[29]=w>>>8&255,r[30]=w>>>16&255,r[31]=w>>>24&255,r[32]=M>>>0&255,r[33]=M>>>8&255,r[34]=M>>>16&255,r[35]=M>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=L>>>0&255,r[45]=L>>>8&255,r[46]=L>>>16&255,r[47]=L>>>24&255,r[48]=Y>>>0&255,r[49]=Y>>>8&255,r[50]=Y>>>16&255,r[51]=Y>>>24&255,r[52]=oe>>>0&255,r[53]=oe>>>8&255,r[54]=oe>>>16&255,r[55]=oe>>>24&255,r[56]=ae>>>0&255,r[57]=ae>>>8&255,r[58]=ae>>>16&255,r[59]=ae>>>24&255,r[60]=ie>>>0&255,r[61]=ie>>>8&255,r[62]=ie>>>16&255,r[63]=ie>>>24&255}function he(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,y=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,b=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,z=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,F=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,T=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,xe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,P=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,$=s,G=y,I=b,j=k,U=z,N=F,m=T,w=xe,M=P,S=H,C=X,L=re,Y=ne,oe=V,ae=J,ie=Z,c,le=0;le<20;le+=2)c=$+Y|0,U^=c<<7|c>>>25,c=U+$|0,M^=c<<9|c>>>23,c=M+U|0,Y^=c<<13|c>>>19,c=Y+M|0,$^=c<<18|c>>>14,c=N+G|0,S^=c<<7|c>>>25,c=S+N|0,oe^=c<<9|c>>>23,c=oe+S|0,G^=c<<13|c>>>19,c=G+oe|0,N^=c<<18|c>>>14,c=C+m|0,ae^=c<<7|c>>>25,c=ae+C|0,I^=c<<9|c>>>23,c=I+ae|0,m^=c<<13|c>>>19,c=m+I|0,C^=c<<18|c>>>14,c=ie+L|0,j^=c<<7|c>>>25,c=j+ie|0,w^=c<<9|c>>>23,c=w+j|0,L^=c<<13|c>>>19,c=L+w|0,ie^=c<<18|c>>>14,c=$+j|0,G^=c<<7|c>>>25,c=G+$|0,I^=c<<9|c>>>23,c=I+G|0,j^=c<<13|c>>>19,c=j+I|0,$^=c<<18|c>>>14,c=N+U|0,m^=c<<7|c>>>25,c=m+N|0,w^=c<<9|c>>>23,c=w+m|0,U^=c<<13|c>>>19,c=U+w|0,N^=c<<18|c>>>14,c=C+S|0,L^=c<<7|c>>>25,c=L+C|0,M^=c<<9|c>>>23,c=M+L|0,S^=c<<13|c>>>19,c=S+M|0,C^=c<<18|c>>>14,c=ie+ae|0,Y^=c<<7|c>>>25,c=Y+ie|0,oe^=c<<9|c>>>23,c=oe+Y|0,ae^=c<<13|c>>>19,c=ae+oe|0,ie^=c<<18|c>>>14;r[0]=$>>>0&255,r[1]=$>>>8&255,r[2]=$>>>16&255,r[3]=$>>>24&255,r[4]=N>>>0&255,r[5]=N>>>8&255,r[6]=N>>>16&255,r[7]=N>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ie>>>0&255,r[13]=ie>>>8&255,r[14]=ie>>>16&255,r[15]=ie>>>24&255,r[16]=m>>>0&255,r[17]=m>>>8&255,r[18]=m>>>16&255,r[19]=m>>>24&255,r[20]=w>>>0&255,r[21]=w>>>8&255,r[22]=w>>>16&255,r[23]=w>>>24&255,r[24]=M>>>0&255,r[25]=M>>>8&255,r[26]=M>>>16&255,r[27]=M>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function de(r,a,i,e){ee(r,a,i,e)}function ce(r,a,i,e){he(r,a,i,e)}var Be=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function ot(r,a,i,e,s,y,b){var k=new Uint8Array(16),z=new Uint8Array(64),F,T;for(T=0;T<16;T++)k[T]=0;for(T=0;T<8;T++)k[T]=y[T];for(;s>=64;){for(de(z,k,b,Be),T=0;T<64;T++)r[a+T]=i[e+T]^z[T];for(F=1,T=8;T<16;T++)F=F+(k[T]&255)|0,k[T]=F&255,F>>>=8;s-=64,a+=64,e+=64}if(s>0)for(de(z,k,b,Be),T=0;T<s;T++)r[a+T]=i[e+T]^z[T];return 0}function Fe(r,a,i,e,s){var y=new Uint8Array(16),b=new Uint8Array(64),k,z;for(z=0;z<16;z++)y[z]=0;for(z=0;z<8;z++)y[z]=e[z];for(;i>=64;){for(de(b,y,s,Be),z=0;z<64;z++)r[a+z]=b[z];for(k=1,z=8;z<16;z++)k=k+(y[z]&255)|0,y[z]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(de(b,y,s,Be),z=0;z<i;z++)r[a+z]=b[z];return 0}function Oe(r,a,i,e,s){var y=new Uint8Array(32);ce(y,e,s,Be);for(var b=new Uint8Array(8),k=0;k<8;k++)b[k]=e[k+16];return Fe(r,a,i,b,y)}function it(r,a,i,e,s,y,b){var k=new Uint8Array(32);ce(k,y,b,Be);for(var z=new Uint8Array(8),F=0;F<8;F++)z[F]=y[F+16];return ot(r,a,i,e,s,z,k)}var at=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,y,b,k,z;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,y=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|y<<12)&255,this.r[5]=y>>>1&8190,b=r[10]&255|(r[11]&255)<<8,this.r[6]=(y>>>14|b<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(b>>>11|k<<5)&8065,z=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|z<<8)&8191,this.r[9]=z>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};at.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,y,b,k,z,F,T,xe,P,H,X,re,ne,V,J,Z,$,G,I,j=this.h[0],U=this.h[1],N=this.h[2],m=this.h[3],w=this.h[4],M=this.h[5],S=this.h[6],C=this.h[7],L=this.h[8],Y=this.h[9],oe=this.r[0],ae=this.r[1],ie=this.r[2],c=this.r[3],le=this.r[4],ye=this.r[5],ge=this.r[6],se=this.r[7],pe=this.r[8],ue=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,j+=s&8191,y=r[a+2]&255|(r[a+3]&255)<<8,U+=(s>>>13|y<<3)&8191,b=r[a+4]&255|(r[a+5]&255)<<8,N+=(y>>>10|b<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,m+=(b>>>7|k<<9)&8191,z=r[a+8]&255|(r[a+9]&255)<<8,w+=(k>>>4|z<<12)&8191,M+=z>>>1&8191,F=r[a+10]&255|(r[a+11]&255)<<8,S+=(z>>>14|F<<2)&8191,T=r[a+12]&255|(r[a+13]&255)<<8,C+=(F>>>11|T<<5)&8191,xe=r[a+14]&255|(r[a+15]&255)<<8,L+=(T>>>8|xe<<8)&8191,Y+=xe>>>5|e,P=0,H=P,H+=j*oe,H+=U*(5*ue),H+=N*(5*pe),H+=m*(5*se),H+=w*(5*ge),P=H>>>13,H&=8191,H+=M*(5*ye),H+=S*(5*le),H+=C*(5*c),H+=L*(5*ie),H+=Y*(5*ae),P+=H>>>13,H&=8191,X=P,X+=j*ae,X+=U*oe,X+=N*(5*ue),X+=m*(5*pe),X+=w*(5*se),P=X>>>13,X&=8191,X+=M*(5*ge),X+=S*(5*ye),X+=C*(5*le),X+=L*(5*c),X+=Y*(5*ie),P+=X>>>13,X&=8191,re=P,re+=j*ie,re+=U*ae,re+=N*oe,re+=m*(5*ue),re+=w*(5*pe),P=re>>>13,re&=8191,re+=M*(5*se),re+=S*(5*ge),re+=C*(5*ye),re+=L*(5*le),re+=Y*(5*c),P+=re>>>13,re&=8191,ne=P,ne+=j*c,ne+=U*ie,ne+=N*ae,ne+=m*oe,ne+=w*(5*ue),P=ne>>>13,ne&=8191,ne+=M*(5*pe),ne+=S*(5*se),ne+=C*(5*ge),ne+=L*(5*ye),ne+=Y*(5*le),P+=ne>>>13,ne&=8191,V=P,V+=j*le,V+=U*c,V+=N*ie,V+=m*ae,V+=w*oe,P=V>>>13,V&=8191,V+=M*(5*ue),V+=S*(5*pe),V+=C*(5*se),V+=L*(5*ge),V+=Y*(5*ye),P+=V>>>13,V&=8191,J=P,J+=j*ye,J+=U*le,J+=N*c,J+=m*ie,J+=w*ae,P=J>>>13,J&=8191,J+=M*oe,J+=S*(5*ue),J+=C*(5*pe),J+=L*(5*se),J+=Y*(5*ge),P+=J>>>13,J&=8191,Z=P,Z+=j*ge,Z+=U*ye,Z+=N*le,Z+=m*c,Z+=w*ie,P=Z>>>13,Z&=8191,Z+=M*ae,Z+=S*oe,Z+=C*(5*ue),Z+=L*(5*pe),Z+=Y*(5*se),P+=Z>>>13,Z&=8191,$=P,$+=j*se,$+=U*ge,$+=N*ye,$+=m*le,$+=w*c,P=$>>>13,$&=8191,$+=M*ie,$+=S*ae,$+=C*oe,$+=L*(5*ue),$+=Y*(5*pe),P+=$>>>13,$&=8191,G=P,G+=j*pe,G+=U*se,G+=N*ge,G+=m*ye,G+=w*le,P=G>>>13,G&=8191,G+=M*c,G+=S*ie,G+=C*ae,G+=L*oe,G+=Y*(5*ue),P+=G>>>13,G&=8191,I=P,I+=j*ue,I+=U*pe,I+=N*se,I+=m*ge,I+=w*ye,P=I>>>13,I&=8191,I+=M*le,I+=S*c,I+=C*ie,I+=L*ae,I+=Y*oe,P+=I>>>13,I&=8191,P=(P<<2)+P|0,P=P+H|0,H=P&8191,P=P>>>13,X+=P,j=H,U=X,N=re,m=ne,w=V,M=J,S=Z,C=$,L=G,Y=I,a+=16,i-=16;this.h[0]=j,this.h[1]=U,this.h[2]=N,this.h[3]=m,this.h[4]=w,this.h[5]=M,this.h[6]=S,this.h[7]=C,this.h[8]=L,this.h[9]=Y},at.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,y,b;if(this.leftover){for(b=this.leftover,this.buffer[b++]=1;b<16;b++)this.buffer[b]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,b=2;b<10;b++)this.h[b]+=e,e=this.h[b]>>>13,this.h[b]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,b=1;b<10;b++)i[b]=this.h[b]+e,e=i[b]>>>13,i[b]&=8191;for(i[9]-=8192,s=(e^1)-1,b=0;b<10;b++)i[b]&=s;for(s=~s,b=0;b<10;b++)this.h[b]=this.h[b]&s|i[b];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,y=this.h[0]+this.pad[0],this.h[0]=y&65535,b=1;b<8;b++)y=(this.h[b]+this.pad[b]|0)+(y>>>16)|0,this.h[b]=y&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},at.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Lt(r,a,i,e,s,y){var b=new at(y);return b.update(i,e,s),b.finish(r,a),0}function st(r,a,i,e,s,y){var b=new Uint8Array(16);return Lt(b,0,i,e,s,y),Q(r,a,b,0)}function Ne(r,a,i,e,s){var y;if(i<32)return-1;for(it(r,0,a,0,i,e,s),Lt(r,16,r,32,i-32,r),y=0;y<16;y++)r[y]=0;return 0}function ut(r,a,i,e,s){var y,b=new Uint8Array(32);if(i<32||(Oe(b,0,32,e,s),st(a,16,a,32,i-32,b)!==0))return-1;for(it(r,0,a,0,i,e,s),y=0;y<32;y++)r[y]=0;return 0}function je(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function qe(r,a,i){for(var e,s=~(i-1),y=0;y<16;y++)e=s&(r[y]^a[y]),r[y]^=e,a[y]^=e}function Je(r,a){var i,e,s,y=o(),b=o();for(i=0;i<16;i++)b[i]=a[i];for(xt(b),xt(b),xt(b),e=0;e<2;e++){for(y[0]=b[0]-65517,i=1;i<15;i++)y[i]=b[i]-65535-(y[i-1]>>16&1),y[i-1]&=65535;y[15]=b[15]-32767-(y[14]>>16&1),s=y[15]>>16&1,y[14]&=65535,qe(b,y,1-s)}for(i=0;i<16;i++)r[2*i]=b[i]&255,r[2*i+1]=b[i]>>8}function At(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Je(i,r),Je(e,a),K(i,0,e,0)}function yt(r){var a=new Uint8Array(32);return Je(a,r),a[0]&1}function Ke(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Te(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Ie(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function fe(r,a,i){var e,s,y=0,b=0,k=0,z=0,F=0,T=0,xe=0,P=0,H=0,X=0,re=0,ne=0,V=0,J=0,Z=0,$=0,G=0,I=0,j=0,U=0,N=0,m=0,w=0,M=0,S=0,C=0,L=0,Y=0,oe=0,ae=0,ie=0,c=i[0],le=i[1],ye=i[2],ge=i[3],se=i[4],pe=i[5],ue=i[6],Se=i[7],be=i[8],we=i[9],ve=i[10],_e=i[11],Ee=i[12],Me=i[13],Le=i[14],Ae=i[15];e=a[0],y+=e*c,b+=e*le,k+=e*ye,z+=e*ge,F+=e*se,T+=e*pe,xe+=e*ue,P+=e*Se,H+=e*be,X+=e*we,re+=e*ve,ne+=e*_e,V+=e*Ee,J+=e*Me,Z+=e*Le,$+=e*Ae,e=a[1],b+=e*c,k+=e*le,z+=e*ye,F+=e*ge,T+=e*se,xe+=e*pe,P+=e*ue,H+=e*Se,X+=e*be,re+=e*we,ne+=e*ve,V+=e*_e,J+=e*Ee,Z+=e*Me,$+=e*Le,G+=e*Ae,e=a[2],k+=e*c,z+=e*le,F+=e*ye,T+=e*ge,xe+=e*se,P+=e*pe,H+=e*ue,X+=e*Se,re+=e*be,ne+=e*we,V+=e*ve,J+=e*_e,Z+=e*Ee,$+=e*Me,G+=e*Le,I+=e*Ae,e=a[3],z+=e*c,F+=e*le,T+=e*ye,xe+=e*ge,P+=e*se,H+=e*pe,X+=e*ue,re+=e*Se,ne+=e*be,V+=e*we,J+=e*ve,Z+=e*_e,$+=e*Ee,G+=e*Me,I+=e*Le,j+=e*Ae,e=a[4],F+=e*c,T+=e*le,xe+=e*ye,P+=e*ge,H+=e*se,X+=e*pe,re+=e*ue,ne+=e*Se,V+=e*be,J+=e*we,Z+=e*ve,$+=e*_e,G+=e*Ee,I+=e*Me,j+=e*Le,U+=e*Ae,e=a[5],T+=e*c,xe+=e*le,P+=e*ye,H+=e*ge,X+=e*se,re+=e*pe,ne+=e*ue,V+=e*Se,J+=e*be,Z+=e*we,$+=e*ve,G+=e*_e,I+=e*Ee,j+=e*Me,U+=e*Le,N+=e*Ae,e=a[6],xe+=e*c,P+=e*le,H+=e*ye,X+=e*ge,re+=e*se,ne+=e*pe,V+=e*ue,J+=e*Se,Z+=e*be,$+=e*we,G+=e*ve,I+=e*_e,j+=e*Ee,U+=e*Me,N+=e*Le,m+=e*Ae,e=a[7],P+=e*c,H+=e*le,X+=e*ye,re+=e*ge,ne+=e*se,V+=e*pe,J+=e*ue,Z+=e*Se,$+=e*be,G+=e*we,I+=e*ve,j+=e*_e,U+=e*Ee,N+=e*Me,m+=e*Le,w+=e*Ae,e=a[8],H+=e*c,X+=e*le,re+=e*ye,ne+=e*ge,V+=e*se,J+=e*pe,Z+=e*ue,$+=e*Se,G+=e*be,I+=e*we,j+=e*ve,U+=e*_e,N+=e*Ee,m+=e*Me,w+=e*Le,M+=e*Ae,e=a[9],X+=e*c,re+=e*le,ne+=e*ye,V+=e*ge,J+=e*se,Z+=e*pe,$+=e*ue,G+=e*Se,I+=e*be,j+=e*we,U+=e*ve,N+=e*_e,m+=e*Ee,w+=e*Me,M+=e*Le,S+=e*Ae,e=a[10],re+=e*c,ne+=e*le,V+=e*ye,J+=e*ge,Z+=e*se,$+=e*pe,G+=e*ue,I+=e*Se,j+=e*be,U+=e*we,N+=e*ve,m+=e*_e,w+=e*Ee,M+=e*Me,S+=e*Le,C+=e*Ae,e=a[11],ne+=e*c,V+=e*le,J+=e*ye,Z+=e*ge,$+=e*se,G+=e*pe,I+=e*ue,j+=e*Se,U+=e*be,N+=e*we,m+=e*ve,w+=e*_e,M+=e*Ee,S+=e*Me,C+=e*Le,L+=e*Ae,e=a[12],V+=e*c,J+=e*le,Z+=e*ye,$+=e*ge,G+=e*se,I+=e*pe,j+=e*ue,U+=e*Se,N+=e*be,m+=e*we,w+=e*ve,M+=e*_e,S+=e*Ee,C+=e*Me,L+=e*Le,Y+=e*Ae,e=a[13],J+=e*c,Z+=e*le,$+=e*ye,G+=e*ge,I+=e*se,j+=e*pe,U+=e*ue,N+=e*Se,m+=e*be,w+=e*we,M+=e*ve,S+=e*_e,C+=e*Ee,L+=e*Me,Y+=e*Le,oe+=e*Ae,e=a[14],Z+=e*c,$+=e*le,G+=e*ye,I+=e*ge,j+=e*se,U+=e*pe,N+=e*ue,m+=e*Se,w+=e*be,M+=e*we,S+=e*ve,C+=e*_e,L+=e*Ee,Y+=e*Me,oe+=e*Le,ae+=e*Ae,e=a[15],$+=e*c,G+=e*le,I+=e*ye,j+=e*ge,U+=e*se,N+=e*pe,m+=e*ue,w+=e*Se,M+=e*be,S+=e*we,C+=e*ve,L+=e*_e,Y+=e*Ee,oe+=e*Me,ae+=e*Le,ie+=e*Ae,y+=38*G,b+=38*I,k+=38*j,z+=38*U,F+=38*N,T+=38*m,xe+=38*w,P+=38*M,H+=38*S,X+=38*C,re+=38*L,ne+=38*Y,V+=38*oe,J+=38*ae,Z+=38*ie,s=1,e=y+s+65535,s=Math.floor(e/65536),y=e-s*65536,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=F+s+65535,s=Math.floor(e/65536),F=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=xe+s+65535,s=Math.floor(e/65536),xe=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,y+=s-1+37*(s-1),s=1,e=y+s+65535,s=Math.floor(e/65536),y=e-s*65536,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=F+s+65535,s=Math.floor(e/65536),F=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=xe+s+65535,s=Math.floor(e/65536),xe=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,y+=s-1+37*(s-1),r[0]=y,r[1]=b,r[2]=k,r[3]=z,r[4]=F,r[5]=T,r[6]=xe,r[7]=P,r[8]=H,r[9]=X,r[10]=re,r[11]=ne,r[12]=V,r[13]=J,r[14]=Z,r[15]=$}function R(r,a){fe(r,a,a)}function W(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)R(i,i),e!==2&&e!==4&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function D(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)R(i,i),e!==1&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function O(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),y,b,k=o(),z=o(),F=o(),T=o(),xe=o(),P=o();for(b=0;b<31;b++)e[b]=a[b];for(e[31]=a[31]&127|64,e[0]&=248,Ke(s,i),b=0;b<16;b++)z[b]=s[b],T[b]=k[b]=F[b]=0;for(k[0]=T[0]=1,b=254;b>=0;--b)y=e[b>>>3]>>>(b&7)&1,qe(k,z,y),qe(F,T,y),Te(xe,k,F),Ie(k,k,F),Te(F,z,T),Ie(z,z,T),R(T,xe),R(P,k),fe(k,F,k),fe(F,z,xe),Te(xe,k,F),Ie(k,k,F),R(z,k),Ie(F,T,P),fe(k,F,x),Te(k,k,T),fe(F,F,k),fe(k,T,P),fe(T,z,s),R(z,xe),qe(k,z,y),qe(F,T,y);for(b=0;b<16;b++)s[b+16]=k[b],s[b+32]=F[b],s[b+48]=z[b],s[b+64]=T[b];var H=s.subarray(32),X=s.subarray(16);return W(H,H),fe(X,X,H),Je(r,X),0}function te(r,a){return O(r,a,f)}function me(r,a){return l(a,32),te(r,a)}function ke(r,a,i){var e=new Uint8Array(32);return O(e,i,a),ce(r,d,e,Be)}var Ce=Ne,gt=ut;function gn(r,a,i,e,s,y){var b=new Uint8Array(32);return ke(b,s,y),Ce(r,a,i,e,b)}function Ge(r,a,i,e,s,y){var b=new Uint8Array(32);return ke(b,s,y),gt(r,a,i,e,b)}var Qe=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Zn(r,a,i,e){for(var s=new Int32Array(16),y=new Int32Array(16),b,k,z,F,T,xe,P,H,X,re,ne,V,J,Z,$,G,I,j,U,N,m,w,M,S,C,L,Y=r[0],oe=r[1],ae=r[2],ie=r[3],c=r[4],le=r[5],ye=r[6],ge=r[7],se=a[0],pe=a[1],ue=a[2],Se=a[3],be=a[4],we=a[5],ve=a[6],_e=a[7],Ee=0;e>=128;){for(U=0;U<16;U++)N=8*U+Ee,s[U]=i[N+0]<<24|i[N+1]<<16|i[N+2]<<8|i[N+3],y[U]=i[N+4]<<24|i[N+5]<<16|i[N+6]<<8|i[N+7];for(U=0;U<80;U++)if(b=Y,k=oe,z=ae,F=ie,T=c,xe=le,P=ye,H=ge,X=se,re=pe,ne=ue,V=Se,J=be,Z=we,$=ve,G=_e,m=ge,w=_e,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=(c>>>14|be<<18)^(c>>>18|be<<14)^(be>>>9|c<<23),w=(be>>>14|c<<18)^(be>>>18|c<<14)^(c>>>9|be<<23),M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,m=c&le^~c&ye,w=be&we^~be&ve,M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,m=Qe[U*2],w=Qe[U*2+1],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,m=s[U%16],w=y[U%16],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,I=C&65535|L<<16,j=M&65535|S<<16,m=I,w=j,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=(Y>>>28|se<<4)^(se>>>2|Y<<30)^(se>>>7|Y<<25),w=(se>>>28|Y<<4)^(Y>>>2|se<<30)^(Y>>>7|se<<25),M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,m=Y&oe^Y&ae^oe&ae,w=se&pe^se&ue^pe&ue,M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,H=C&65535|L<<16,G=M&65535|S<<16,m=F,w=V,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=I,w=j,M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,F=C&65535|L<<16,V=M&65535|S<<16,oe=b,ae=k,ie=z,c=F,le=T,ye=xe,ge=P,Y=H,pe=X,ue=re,Se=ne,be=V,we=J,ve=Z,_e=$,se=G,U%16===15)for(N=0;N<16;N++)m=s[N],w=y[N],M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=s[(N+9)%16],w=y[(N+9)%16],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,I=s[(N+1)%16],j=y[(N+1)%16],m=(I>>>1|j<<31)^(I>>>8|j<<24)^I>>>7,w=(j>>>1|I<<31)^(j>>>8|I<<24)^(j>>>7|I<<25),M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,I=s[(N+14)%16],j=y[(N+14)%16],m=(I>>>19|j<<13)^(j>>>29|I<<3)^I>>>6,w=(j>>>19|I<<13)^(I>>>29|j<<3)^(j>>>6|I<<26),M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,s[N]=C&65535|L<<16,y[N]=M&65535|S<<16;m=Y,w=se,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[0],w=a[0],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[0]=Y=C&65535|L<<16,a[0]=se=M&65535|S<<16,m=oe,w=pe,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[1],w=a[1],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[1]=oe=C&65535|L<<16,a[1]=pe=M&65535|S<<16,m=ae,w=ue,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[2],w=a[2],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[2]=ae=C&65535|L<<16,a[2]=ue=M&65535|S<<16,m=ie,w=Se,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[3],w=a[3],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[3]=ie=C&65535|L<<16,a[3]=Se=M&65535|S<<16,m=c,w=be,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[4],w=a[4],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[4]=c=C&65535|L<<16,a[4]=be=M&65535|S<<16,m=le,w=we,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[5],w=a[5],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[5]=le=C&65535|L<<16,a[5]=we=M&65535|S<<16,m=ye,w=ve,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[6],w=a[6],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[6]=ye=C&65535|L<<16,a[6]=ve=M&65535|S<<16,m=ge,w=_e,M=w&65535,S=w>>>16,C=m&65535,L=m>>>16,m=r[7],w=a[7],M+=w&65535,S+=w>>>16,C+=m&65535,L+=m>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[7]=ge=C&65535|L<<16,a[7]=_e=M&65535|S<<16,Ee+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),y=new Uint8Array(256),b,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Zn(e,s,a,i),i%=128,b=0;b<i;b++)y[b]=a[k-i+b];for(y[i]=128,i=256-128*(i<112?1:0),y[i-9]=0,A(y,i-8,k/536870912|0,k<<3),Zn(e,s,y,i),b=0;b<8;b++)A(r,8*b,e[b],s[b]);return 0}function qt(r,a){var i=o(),e=o(),s=o(),y=o(),b=o(),k=o(),z=o(),F=o(),T=o();Ie(i,r[1],r[0]),Ie(T,a[1],a[0]),fe(i,i,T),Te(e,r[0],r[1]),Te(T,a[0],a[1]),fe(e,e,T),fe(s,r[3],a[3]),fe(s,s,h),fe(y,r[2],a[2]),Te(y,y,y),Ie(b,e,i),Ie(k,y,s),Te(z,y,s),Te(F,e,i),fe(r[0],b,k),fe(r[1],F,z),fe(r[2],z,k),fe(r[3],b,F)}function Jn(r,a,i){var e;for(e=0;e<4;e++)qe(r[e],a[e],i)}function bn(r,a){var i=o(),e=o(),s=o();W(s,a[2]),fe(i,a[0],s),fe(e,a[1],s),Je(r,e),r[31]^=yt(i)<<7}function hn(r,a,i){var e,s;for(je(r[0],g),je(r[1],u),je(r[2],u),je(r[3],g),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Jn(r,a,e),qt(a,r),qt(r,r),Jn(r,a,e)}function Kt(r,a){var i=[o(),o(),o(),o()];je(i[0],v),je(i[1],_),je(i[2],u),fe(i[3],v,_),hn(r,i,a)}function mn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],y;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Kt(s,e),bn(r,s),y=0;y<32;y++)a[y+32]=r[y];return 0}var Ht=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function wn(r,a){var i,e,s,y;for(e=63;e>=32;--e){for(i=0,s=e-32,y=e-12;s<y;++s)a[s]+=i-16*a[e]*Ht[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Ht[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Ht[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function vn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;wn(r,a)}function Qn(r,a,i,e){var s=new Uint8Array(64),y=new Uint8Array(64),b=new Uint8Array(64),k,z,F=new Float64Array(64),T=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var xe=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(lt(b,r.subarray(32),i+32),vn(b),Kt(T,b),bn(r,T),k=32;k<64;k++)r[k]=e[k];for(lt(y,r,i+64),vn(y),k=0;k<64;k++)F[k]=0;for(k=0;k<32;k++)F[k]=b[k];for(k=0;k<32;k++)for(z=0;z<32;z++)F[k+z]+=y[k]*s[z];return wn(r.subarray(32),F),xe}function Qr(r,a){var i=o(),e=o(),s=o(),y=o(),b=o(),k=o(),z=o();return je(r[2],u),Ke(r[1],a),R(s,r[1]),fe(y,s,p),Ie(s,s,r[2]),Te(y,r[2],y),R(b,y),R(k,b),fe(z,k,b),fe(i,z,s),fe(i,i,y),D(i,i),fe(i,i,s),fe(i,i,y),fe(i,i,y),fe(r[0],i,y),R(e,r[0]),fe(e,e,y),At(e,s)&&fe(r[0],r[0],E),R(e,r[0]),fe(e,e,y),At(e,s)?-1:(yt(r[0])===a[31]>>7&&Ie(r[0],g,r[0]),fe(r[3],r[0],r[1]),0)}function _n(r,a,i,e){var s,y=new Uint8Array(32),b=new Uint8Array(64),k=[o(),o(),o(),o()],z=[o(),o(),o(),o()];if(i<64||Qr(z,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(b,r,i),vn(b),hn(k,z,b),Kt(z,a.subarray(32)),qt(k,z),bn(y,k),i-=64,K(a,0,y,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var Sn=32,Xt=24,zt=32,bt=16,Bt=32,Vt=32,Nt=32,Tt=32,kn=32,er=Xt,eo=zt,to=bt,He=64,ft=32,ht=64,Cn=32,En=64;n.lowlevel={crypto_core_hsalsa20:ce,crypto_stream_xor:it,crypto_stream:Oe,crypto_stream_salsa20_xor:ot,crypto_stream_salsa20:Fe,crypto_onetimeauth:Lt,crypto_onetimeauth_verify:st,crypto_verify_16:Q,crypto_verify_32:K,crypto_secretbox:Ne,crypto_secretbox_open:ut,crypto_scalarmult:O,crypto_scalarmult_base:te,crypto_box_beforenm:ke,crypto_box_afternm:Ce,crypto_box:gn,crypto_box_open:Ge,crypto_box_keypair:me,crypto_hash:lt,crypto_sign:Qn,crypto_sign_keypair:mn,crypto_sign_open:_n,crypto_secretbox_KEYBYTES:Sn,crypto_secretbox_NONCEBYTES:Xt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:Bt,crypto_scalarmult_SCALARBYTES:Vt,crypto_box_PUBLICKEYBYTES:Nt,crypto_box_SECRETKEYBYTES:Tt,crypto_box_BEFORENMBYTES:kn,crypto_box_NONCEBYTES:er,crypto_box_ZEROBYTES:eo,crypto_box_BOXZEROBYTES:to,crypto_sign_BYTES:He,crypto_sign_PUBLICKEYBYTES:ft,crypto_sign_SECRETKEYBYTES:ht,crypto_sign_SEEDBYTES:Cn,crypto_hash_BYTES:En,gf:o,D:p,L:Ht,pack25519:Je,unpack25519:Ke,M:fe,A:Te,S:R,Z:Ie,pow2523:D,add:qt,set25519:je,modL:wn,scalarmult:hn,scalarbase:Kt};function tr(r,a){if(r.length!==Sn)throw new Error("bad key size");if(a.length!==Xt)throw new Error("bad nonce size")}function no(r,a){if(r.length!==Nt)throw new Error("bad public key size");if(a.length!==Tt)throw new Error("bad secret key size")}function $e(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function nr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){$e(r,a,i),tr(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),y=0;y<r.length;y++)e[y+zt]=r[y];return Ne(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){$e(r,a,i),tr(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),y=0;y<r.length;y++)e[y+bt]=r[y];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=Sn,n.secretbox.nonceLength=Xt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if($e(r,a),r.length!==Vt)throw new Error("bad n size");if(a.length!==Bt)throw new Error("bad p size");var i=new Uint8Array(Bt);return O(i,r,a),i},n.scalarMult.base=function(r){if($e(r),r.length!==Vt)throw new Error("bad n size");var a=new Uint8Array(Bt);return te(a,r),a},n.scalarMult.scalarLength=Vt,n.scalarMult.groupElementLength=Bt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){$e(r,a),no(r,a);var i=new Uint8Array(kn);return ke(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Nt),a=new Uint8Array(Tt);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if($e(r),r.length!==Tt)throw new Error("bad secret key size");var a=new Uint8Array(Nt);return te(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Nt,n.box.secretKeyLength=Tt,n.box.sharedKeyLength=kn,n.box.nonceLength=er,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if($e(r,a),a.length!==ht)throw new Error("bad secret key size");var i=new Uint8Array(He+r.length);return Qn(i,r,r.length,a),i},n.sign.open=function(r,a){if($e(r,a),a.length!==ft)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=_n(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),y=0;y<s.length;y++)s[y]=i[y];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(He),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if($e(r,a,i),a.length!==He)throw new Error("bad signature size");if(i.length!==ft)throw new Error("bad public key size");var e=new Uint8Array(He+r.length),s=new Uint8Array(He+r.length),y;for(y=0;y<He;y++)e[y]=a[y];for(y=0;y<r.length;y++)e[y+He]=r[y];return _n(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ft),a=new Uint8Array(ht);return mn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if($e(r),r.length!==ht)throw new Error("bad secret key size");for(var a=new Uint8Array(ft),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if($e(r),r.length!==Cn)throw new Error("bad seed size");for(var a=new Uint8Array(ft),i=new Uint8Array(ht),e=0;e<32;e++)i[e]=r[e];return mn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ft,n.sign.secretKeyLength=ht,n.sign.seedLength=Cn,n.sign.signatureLength=He,n.hash=function(r){$e(r);var a=new Uint8Array(En);return lt(a,r,r.length),a},n.hash.hashLength=En,n.verify=function(r,a){return $e(r,a),r.length===0||a.length===0||r.length!==a.length?!1:B(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,y=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(y.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=y[s];nr(y)})}else typeof qi<"u"&&(r=Xi,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,y=r.randomBytes(e);for(s=0;s<e;s++)i[s]=y[s];nr(y)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Tn)),Tn.exports}var Zi=Vi();const Ji=Di(Zi);function Qi(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let p=0;p<n.length;p++)n[p]=255;for(let p=0;p<t.length;p++){const h=t.charAt(p),v=h.charCodeAt(0);if(n[v]!==255)throw new TypeError(h+" is ambiguous");n[v]=p}const o=t.length,l=t.charAt(0),d=Math.log(o)/Math.log(256),f=Math.log(256)/Math.log(o);function g(p){if(p instanceof Uint8Array||(ArrayBuffer.isView(p)?p=new Uint8Array(p.buffer,p.byteOffset,p.byteLength):Array.isArray(p)&&(p=Uint8Array.from(p))),!(p instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(p.length===0)return"";let h=0,v=0,_=0;const E=p.length;for(;_!==E&&p[_]===0;)_++,h++;const A=(E-_)*f+1>>>0,B=new Uint8Array(A);for(;_!==E;){let ee=p[_],he=0;for(let de=A-1;(ee!==0||he<v)&&de!==-1;de--,he++)ee+=256*B[de]>>>0,B[de]=ee%o>>>0,ee=ee/o>>>0;if(ee!==0)throw new Error("Non-zero carry");v=he,_++}let Q=A-v;for(;Q!==A&&B[Q]===0;)Q++;let K=l.repeat(h);for(;Q<A;++Q)K+=t.charAt(B[Q]);return K}function u(p){if(typeof p!="string")throw new TypeError("Expected String");if(p.length===0)return new Uint8Array;let h=0,v=0,_=0;for(;p[h]===l;)v++,h++;const E=(p.length-h)*d+1>>>0,A=new Uint8Array(E);for(;h<p.length;){const ee=p.charCodeAt(h);if(ee>255)return;let he=n[ee];if(he===255)return;let de=0;for(let ce=E-1;(he!==0||de<_)&&ce!==-1;ce--,de++)he+=o*A[ce]>>>0,A[ce]=he%256>>>0,he=he/256>>>0;if(he!==0)throw new Error("Non-zero carry");_=de,h++}let B=E-_;for(;B!==E&&A[B]===0;)B++;const Q=new Uint8Array(v+(E-B));let K=v;for(;B!==E;)Q[K++]=A[B++];return Q}function x(p){const h=u(p);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:g,decodeUnsafe:u,decode:x}}var ea="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const pr=Qi(ea),Hn="cbsgo_wallet_v3",xn="cbsgo_wallet_unlocked_v3";function Yt(){try{const t=localStorage.getItem(Hn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function ta(t){localStorage.setItem(Hn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function na(){const t=Ji.sign.keyPair(),n=pr.encode(t.publicKey),o=pr.encode(t.secretKey);return{pk:n,sk:o}}function Wr(){return!!Yt()}function ra(){return Yt()?sessionStorage.getItem(xn)==="1":!1}function oa(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");Yt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:d}=na();return ta({pk:l,sk:d,pin:n}),sessionStorage.setItem(xn,"1"),l}function ia(t){const n=Yt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(xn,"1"),n.pk}function Ye(){const t=Yt();return t?t.pk:""}function aa(){localStorage.removeItem(Hn),sessionStorage.removeItem(xn)}typeof window<"u"&&(window.cbsgoDevResetWallet=aa);const Dr="cbsgoLoginModal";function Yr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function qr(){const t=document.getElementById(Dr);t&&t.remove()}function sa(t){qr();const n=document.createElement("div");return n.id=Dr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function la(t,n){return`
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
      ">${Yr(t)}</div>

      <div style="padding:14px 16px;">
        ${n}
      </div>
    </div>
  `}function Zt(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function ur(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function fa(){const t=!Wr();let n="";try{const h=Dt();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Yr(n)}" style="${Zt()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Zt()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${Zt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${ur(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Zt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${ur(!0)}">Unlock</button>
      </div>
    `,l=sa(la(t?"Welcome to CBS-GO":"Unlock Wallet",o)),d=l.querySelector("#cbsgoLoginMsg"),f=h=>{d&&(d.textContent=h||"")},g=l.querySelector("#cbsgoPin"),u=l.querySelector("#cbsgoPin2"),x=l.querySelector("#cbsgoNick"),p=()=>{qr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const v=String(x?.value||"").trim(),_=String(g?.value||"").trim(),E=String(u?.value||"").trim();if(v.length<2)return f("⛔ Nickname too short.");if(_.length<4)return f("⛔ PIN must be at least 4 digits.");if(_!==E)return f("⛔ PINs do not match.");f("Creating wallet…"),Or(v),await oa(_),f("✅ Wallet created. Starting…"),p()}catch(v){f(`⛔ ${String(v?.message||v)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const v=String(g?.value||"").trim();if(v.length<4)return f("⛔ PIN must be at least 4 digits.");f("Unlocking…"),await ia(v),f("✅ Unlocked."),p()}catch{f("⛔ Wrong PIN (or wallet data missing).")}})}}const ca="https://cxfedvowjgkqrakkkjpi.supabase.co",da="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Pe=ro(ca,da);function pa(){const t=Ye();if(!t)return null;const n=Dt(),o=Yn();return{wallet_pk:t,nickname:n,avatar:o}}async function nn(t={}){try{const n=pa();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Pe.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ua=15e3,xa=1e4,ya=300*1e3;let Pt=null,xr=0,yr=0;function ga(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",ga));async function ba(){const t=Ye();if(!t||!Pt)return;const n=Date.now();if(n-xr<5e3)return;xr=n;const l=(Dt()||"").trim()||"Anon",d={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:f,error:g}=await Pe.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(g){console.warn("CBS GO: player_state select failed",g);return}if(f&&f.length>0){const u=f[0].id,{error:x}=await Pe.from("player_state").update(d).eq("id",u);x&&console.warn("CBS GO: player_state update failed",x)}else{const{error:u}=await Pe.from("player_state").insert(d);u&&console.warn("CBS GO: player_state insert failed",u)}}catch(f){console.warn("CBS GO: pushMyState error",f)}}async function ha(){const t=Ye();if(!t)return;const n=Date.now();if(n-yr<3e3)return;yr=n;const o=new Date(Date.now()-ya).toISOString();try{const{data:l,error:d}=await Pe.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(d){console.warn("CBS GO: fetch online players failed",d);return}const f=Array.isArray(l)?l:[],g=Array.from(new Set(f.map(p=>p.wallet_pk).filter(p=>typeof p=="string"&&p.length>0)));let u=new Map;if(g.length>0){const{data:p,error:h}=await Pe.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",g);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(p)&&(u=new Map(p.map(v=>[v.wallet_pk,v])))}const x=f.map(p=>{const h=p.lat,v=p.lng,_=typeof h=="number"?h:parseFloat(h),E=typeof v=="number"?v:parseFloat(v);if(!Number.isFinite(_)||!Number.isFinite(E))return null;const A=u.get(p.wallet_pk)||null,B=A&&A.nickname||p.nickname||"Anon",Q=A&&A.avatar?String(A.avatar):"";return{wallet_pk:p.wallet_pk||"",nickname:B,avatar:Q,lat:_,lng:E,heading:typeof p.heading=="number"?p.heading:null,last_seen:p.last_seen,isMe:p.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:x}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function ma(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{ba()},ua),setInterval(()=>{ha()},xa))}ma();function Kr(){const t=Ye();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function sn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function wa(t){const n=Kr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Pe.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw sn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function va(t){const n=Kr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:d}=await Pe.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(d)throw sn("acceptFriendRequest",d),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function _a(){const t=Ye();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Pe.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw sn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],d=[],f=[];for(const u of l){const x=u.b_wallet===t&&u.status==="pending",p=u.status==="accepted"&&(u.a_wallet===t||u.b_wallet===t);if(!x&&!p)continue;const h=u.a_wallet===t?u.b_wallet:u.a_wallet,v={id:u.id,a_wallet:u.a_wallet,b_wallet:u.b_wallet,status:u.status,created_at:u.created_at,otherWallet:h,nickname:null,avatar:""};x&&d.push(v),p&&f.push(v)}const g=Array.from(new Set([...d,...f].map(u=>u.otherWallet).filter(Boolean)));if(g.length>0){const{data:u,error:x}=await Pe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",g);if(!x&&Array.isArray(u)){const p=new Map;for(const v of u)v.wallet_pk&&p.set(String(v.wallet_pk),{nickname:v.nickname||null,avatar:v.avatar||""});const h=v=>{v.forEach(_=>{const E=p.get(_.otherWallet);E&&(_.nickname=E.nickname||null,_.avatar=E.avatar||"")})};h(d),h(f)}else x&&sn("loadFriendsOverview:players",x)}return{incoming:d,accepted:f}}let jt=null;async function Hr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(jt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),jt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Sa(){try{jt&&(await jt.release(),jt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function ka(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Hr():await Sa()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function Ca(){const t=Ye();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Ea(t){return String(t||"").trim()}async function Xr(t,n={}){const o=Ca(),l=Ea(t),d=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),f=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!d&&!f)throw new Error("Set tickets and/or CBS above 0.");if(d>0&&Mr()<d)throw new Error("Not enough tickets in your bag.");if(f>0&&Lr()<f)throw new Error("Not enough CBS (play money) in your bag.");let g=0,u=0;try{d>0&&(ho(d),g=d),f>0&&(mo(f),u=f);const{error:x}=await Pe.from("trades").insert({from_wallet:o,to_wallet:l,tickets:d||0,cbs:f||0,card_id:null,card_qty:null,status:"sent"});if(x)throw g>0&&Mt(g),u>0&&pn(u),console.warn("CBS GO sendGiftToWallet Supabase error",x),new Error(x.message||"Could not save gift to Supabase (permissions or network issue).");return{ok:!0}}catch(x){throw x instanceof Error?x:new Error(String(x?.message||x)||"Failed to send gift.")}}async function Xn(){const t=Ye();if(t)try{const{data:n,error:o}=await Pe.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const f=Array.from(new Set(n.map(g=>g&&g.from_wallet).filter(g=>typeof g=="string"&&g.trim().length>0)));if(f.length>0){const{data:g,error:u}=await Pe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",f);!u&&Array.isArray(g)?l=new Map(g.filter(x=>x&&x.wallet_pk).map(x=>[String(x.wallet_pk),{nickname:x.nickname||null,avatar:x.avatar||""}])):u&&console.warn("CBS GO pullIncomingGifts players error",u)}}catch(f){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",f)}const d=[];for(const f of n){if(!f)continue;const g=Number(f.tickets||0),u=Number(f.cbs||0);if(g>0&&Mt(g),u>0&&pn(u),(g>0||u>0)&&typeof window<"u"){const x=l.get(f.from_wallet)||{nickname:null,avatar:""},p={id:f.id||null,fromWallet:f.from_wallet||"",toWallet:f.to_wallet||"",tickets:g,cbs:u,createdAt:f.created_at||null,senderNickname:x.nickname||null,senderAvatar:x.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:p}))}catch(h){console.warn("CBS GO: dispatch friendGiftReceived failed",h)}}f.id&&d.push(f.id)}if(d.length>0){const{error:f}=await Pe.from("trades").update({status:"claimed"}).in("id",d);f&&console.warn("CBS GO pullIncomingGifts update status error",f)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0)=>Xr(t,{tickets:n,cbs:o}),window.cbsgoPullGifts=Xn);function We(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Vn(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
    <div style="
      width:${n}px;height:${n}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${o}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">${t?"":"👤"}</div>
  `}function ln(t){if(!t)return"";const n=String(t);return n.length<=12?n:`${n.slice(0,5)}…${n.slice(-4)}`}function yn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Un(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function gr(t,n){return`
    <div style="
      position:fixed;
      left:0; right:0;
      bottom:0;
      z-index:6500;
      padding:12px 12px calc(16px + env(safe-area-inset-bottom));
      pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px, 96vw);
        margin:0 auto;
        border-radius:22px;
        /* 🔧 buitenste rand + achtergrond transparanter gemaakt */
        border:1px solid rgba(255,255,255,.30);
        background:rgba(10,12,18,.30);
        backdrop-filter: blur(14px);
        box-shadow:0 18px 60px rgba(0,0,0,.55);
        overflow:hidden;
      ">
        <div style="
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 16px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-weight:900; font-size:15px;">${We(t)}</div>
          <button type="button" id="cbsgoClosePanel" style="
            border:0;
            padding:6px 10px;
            border-radius:999px;
            background:rgba(255,255,255,.1);
            color:#fff;
            font-size:12px;
          ">Close</button>
        </div>

        <div style="
          max-height: min(70vh, 560px);
          overflow:auto;
          padding:14px 16px 16px 16px;
        ">
          ${n}
        </div>
      </div>
    </div>
  `}function Ma(){const t=Dt(),n=Yn(),o=Ye();return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      /* 🔧 binnenste kaart transparanter (ongeveer 70% transparant) */
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Profile</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your nickname and avatar are stored locally and synced to CBS-GO so friends can find you later.
      </p>

      <div style="
        display:flex;
        gap:14px;
        align-items:center;
        flex-wrap:wrap;
      ">
        ${Vn(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${We(t)}" maxlength="24" style="
            width:100%;
            margin-top:4px;
            padding:10px 10px;
            border-radius:12px;
            border:1px solid rgba(255,255,255,.14);
            background:rgba(255,255,255,.06);
            color:#fff;
          " placeholder="Your nickname"/>

          <div style="margin-top:12px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:4px;">Photo</div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="profileAvatar" type="file" accept="image/*" />
              <button class="btn secondary" id="profileRemoveAvatar" type="button">Remove photo</button>
            </div>
          </div>

          ${o?`
                <div style="margin-top:12px;">
                  <div style="font-size:12px; opacity:.8; margin-bottom:4px;">
                    CBS-GO wallet address (local, game-only)
                  </div>
                  <div style="
                    font-size:11px;
                    opacity:.95;
                    padding:8px 10px;
                    border-radius:10px;
                    border:1px solid rgba(255,255,255,.16);
                    background:rgba(255,255,255,.04);
                    word-break:break-all;
                    font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                  ">
                    ${We(o)}
                  </div>
                </div>
              `:""}

          <div id="profileMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
        </div>
      </div>

      <!-- Friends blok -->
      <div style="
        margin-top:18px;
        padding-top:12px;
        border-top:1px solid rgba(255,255,255,.16);
      ">
        <h4 style="margin:0 0 6px 0; font-size:14px;">Friends</h4>
        <p style="margin:0 0 10px 0; font-size:11px; opacity:.75;">
          Add a friend by wallet address. Once they accept, you will see their nickname and avatar here.
        </p>

        <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
          <input
            id="friendWalletInput"
            placeholder="Wallet address"
            style="
              flex:1;
              min-width:180px;
              padding:8px 9px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.16);
              background:rgba(255,255,255,.06);
              color:#fff;
              font-size:12px;
            "
          />
          <button
            id="friendSendBtn"
            type="button"
            style="
              padding:8px 12px;
              border-radius:999px;
              border:1px solid rgba(255,255,255,.18);
              background:rgba(56,189,248,.35);
              color:#fff;
              font-size:12px;
              font-weight:600;
              cursor:pointer;
            "
          >
            Add
          </button>
        </div>

        <div id="friendsMsg" style="margin-top:6px; font-size:11px; opacity:.9;"></div>

        <div style="margin-top:12px;">
          <div style="font-size:12px; opacity:.85; margin-bottom:4px;">Friend requests</div>
          <div id="friendsIncomingList" style="font-size:11px; opacity:.85;"></div>
        </div>

        <div style="margin-top:10px;">
          <div style="font-size:12px; opacity:.85; margin-bottom:4px;">Your friends</div>
          <div id="friendsAcceptedList" style="font-size:11px; opacity:.9;"></div>
        </div>
      </div>
    </section>
  `}function La(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const d=A=>{const B=document.querySelector("#profileMsg");B&&(B.textContent=A||"")};t&&d(t.value?`✅ Profile loaded: ${t.value}`:"");const f=()=>{if(!t)return;const A=Or(t.value);d(`✅ Name saved: ${A}`);try{nn()}catch(B){console.warn("CBS GO: failed to sync profile after name change",B)}};t&&(t.addEventListener("input",()=>{d("Saving…"),l&&clearTimeout(l),l=setTimeout(f,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),f()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){d("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}d("Uploading photo…");const B=new FileReader;B.onload=()=>{ti(String(B.result||"")),d("✅ Photo saved"),Et();try{nn()}catch(Q){console.warn("CBS GO: failed to sync profile after avatar change",Q)}},B.onerror=()=>d("⛔ Failed to read image."),B.readAsDataURL(A)}),o&&(o.onclick=()=>{ni(),d("✅ Photo removed"),Et();try{nn()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const g=document.querySelector("#friendWalletInput"),u=document.querySelector("#friendSendBtn"),x=document.querySelector("#friendsMsg"),p=document.querySelector("#friendsIncomingList"),h=document.querySelector("#friendsAcceptedList"),v=A=>{x&&(x.textContent=A||"")},_=(A,B="")=>{const Q=A.nickname&&A.nickname.trim()?A.nickname.trim():ln(A.otherWallet),K=ln(A.otherWallet);return`
      <div style="
        margin-bottom:6px;
        padding:6px 8px;
        border-radius:12px;
        border:1px solid rgba(148,163,184,.55);
        background:rgba(15,23,42,.85);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:8px;
      ">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;">
          ${Vn(A.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${We(Q||"Friend")}
            </div>
            ${K?`<div style="font-size:11px;opacity:.7;">${We(K)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${B||""}
        </div>
      </div>
    `};async function E(){if(!(!p||!h))try{p.textContent="Loading…",h.textContent="Loading…";const A=await _a();A.incoming.length?p.innerHTML=A.incoming.map(B=>{const Q=`
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${B.id}"
                style="
                  padding:4px 8px;
                  border-radius:999px;
                  border:1px solid rgba(34,197,94,0.9);
                  background:rgba(22,163,74,0.95);
                  color:#fff;
                  font-size:11px;
                  cursor:pointer;
                "
              >
                Accept
              </button>
            `;return _(B,Q)}).join(""):p.textContent="No incoming requests.",A.accepted.length?h.innerHTML=A.accepted.map(B=>_(B,`
              <span style="
                display:inline-block;
                padding:3px 6px;
                border-radius:999px;
                border:1px solid rgba(148,163,184,0.8);
                font-size:10px;
                opacity:.85;
              ">
                ✔ Friend
              </span>
            `)).join(""):h.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(B=>{B.addEventListener("click",async()=>{const Q=B.getAttribute("data-friend-id");if(Q){v("Accepting friend…"),B.disabled=!0;try{await va(Q),v("✅ Friend added."),await E()}catch(K){console.warn(K),v(`⛔ ${K.message||K}`),B.disabled=!1}}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),p.textContent="Could not load friends.",h.textContent=""}}u&&g&&u.addEventListener("click",async()=>{const A=g.value.trim();if(!A){v("Enter a wallet address first.");return}v("Sending friend request…"),u.disabled=!0;try{await wa(A),v("✅ Friend request sent."),g.value="",await E()}catch(B){console.warn(B),v(`⛔ ${B.message||B}`)}finally{u.disabled=!1}}),E().catch(()=>{})}function Aa(){const t=Mr(),n=Lr(),o=Ye();return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      /* 🔧 zelfde transparantie als profile */
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Bag</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your collected items in the real world.
      </p>

      <div style="
        display:flex;
        flex-wrap:wrap;
        gap:10px;
      ">
        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🎟️ Tickets: <b>${t}</b>
        </div>

        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🪙 CBS (play money): <b>${n}</b>
        </div>
      </div>

      ${o?`
            <div style="
              margin-top:16px;
              padding:10px 12px;
              border-radius:14px;
              border:1px solid rgba(255,255,255,.16);
              background:rgba(10,12,18,.85);
            ">
              <div style="font-size:12px; opacity:.85; margin-bottom:6px;">
                CBS-GO wallet (local, game-only)
              </div>
              <div style="
                font-size:11px;
                opacity:.95;
                padding:6px 8px;
                border-radius:10px;
                border:1px solid rgba(255,255,255,.16);
                background:rgba(255,255,255,.04);
                word-break:break-all;
                font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                margin-bottom:8px;
              ">
                ${We(o)}
              </div>
              <button id="cbsgoCopyWalletBtn" type="button" style="
                padding:8px 10px;
                border-radius:999px;
                border:1px solid rgba(255,255,255,.18);
                background:rgba(90,200,255,.18);
                color:#fff;
                font-size:12px;
                font-weight:600;
                cursor:pointer;
              ">
                Copy address
              </button>
              <div id="bagMsg" style="margin-top:6px; font-size:11px; opacity:.85;"></div>
            </div>
          `:""}

      <!-- My Cards blok in de Bag -->
      <div style="
        margin-top:16px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(148,163,184,.7);
        background:rgba(15,23,42,.9);
      ">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <div>
            <div style="font-size:13px;font-weight:600;margin-bottom:2px;">
              🃏 My Cards
            </div>
            <div style="font-size:11px;opacity:.8;max-width:260px;">
              Walking & CBS cards you collect on your journey. Later you can trade and send them to friends.
            </div>
          </div>
          <button id="cbsgoOpenCardsBtn" type="button" style="
            margin-top:6px;
            padding:7px 12px;
            border-radius:999px;
            border:1px solid rgba(251,191,36,.9);
            background:rgba(245,158,11,.95);
            color:#111827;
            font-size:12px;
            font-weight:700;
            cursor:pointer;
            white-space:nowrap;
          ">
            Open collection
          </button>
        </div>
      </div>

      <!-- Send to friend blok -->
      <div style="
        margin-top:16px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(56,189,248,.75);
        background:rgba(15,23,42,.92);
      ">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <div>
            <div style="font-size:13px;font-weight:600;margin-bottom:2px;">
              🎁 Send a gift to a friend
            </div>
            <div style="font-size:11px;opacity:.8;max-width:260px;">
              Send tickets and CBS (play money) to another CBS-GO wallet. Off-chain via Supabase.
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <div>
            <label for="giftWalletInput" style="font-size:11px;opacity:.8;">Friend wallet address</label>
            <input id="giftWalletInput" placeholder="Paste CBS-GO wallet address" style="
              margin-top:4px;
              width:100%;
              padding:8px 9px;
              border-radius:10px;
              border:1px solid rgba(148,163,184,.7);
              background:rgba(15,23,42,.95);
              color:#fff;
              font-size:12px;
            " />
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="flex:1;min-width:90px;">
              <label for="giftTicketsInput" style="font-size:11px;opacity:.8;">Tickets</label>
              <input id="giftTicketsInput" type="number" min="0" step="1" placeholder="0" style="
                margin-top:4px;
                width:100%;
                padding:7px 9px;
                border-radius:10px;
                border:1px solid rgba(148,163,184,.7);
                background:rgba(15,23,42,.95);
                color:#fff;
                font-size:12px;
              " />
            </div>

            <div style="flex:1;min-width:90px;">
              <label for="giftCbsInput" style="font-size:11px;opacity:.8;">CBS (play money)</label>
              <input id="giftCbsInput" type="number" min="0" step="1" placeholder="0" style="
                margin-top:4px;
                width:100%;
                padding:7px 9px;
                border-radius:10px;
                border:1px solid rgba(148,163,184,.7);
                background:rgba(15,23,42,.95);
                color:#fff;
                font-size:12px;
              " />
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;margin-top:4px;">
            <button id="giftSendBtn" type="button" style="
              padding:8px 14px;
              border-radius:999px;
              border:1px solid rgba(56,189,248,.9);
              background:rgba(56,189,248,.2);
              color:#e0f2fe;
              font-size:12px;
              font-weight:700;
              cursor:pointer;
            ">
              Send gift
            </button>
          </div>

          <div id="giftMsg" style="font-size:11px;opacity:.9;margin-top:2px;"></div>
        </div>
      </div>
    </section>
  `}function za(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Wi()}catch(v){console.warn("CBS GO: openCardsPanel failed",v)}});const l=Ye(),d=document.querySelector("#giftWalletInput"),f=document.querySelector("#giftTicketsInput"),g=document.querySelector("#giftCbsInput"),u=document.querySelector("#giftSendBtn"),x=document.querySelector("#giftMsg"),p=v=>{x&&(x.textContent=v||"")};if(u&&d&&u.addEventListener("click",async()=>{const v=d.value.trim(),_=f?.value??"",E=g?.value??"",A=Number(_||"0"),B=Number(E||"0");if(!v){p("Enter a wallet address first.");return}if((!A||A<=0)&&(!B||B<=0)){p("Set tickets and/or CBS above 0.");return}u.disabled=!0,p("Sending gift…");try{await Xr(v,{tickets:A,cbs:B}),p("✅ Gift sent."),f&&(f.value=""),g&&(g.value="")}catch(Q){console.warn(Q),p(`⛔ ${Q.message||"Could not send gift."}`)}finally{u.disabled=!1}}),!t||!l)return;const h=v=>{n&&(n.textContent=v||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),h("✅ Wallet address copied to clipboard.")):h("📋 Copy not supported in this browser.")}catch{h("⛔ Failed to copy address.")}},Xn().catch(()=>{})}function Vr(){const t=yn();return t==="profile"?gr("Profile",`<div id="profileMount">${Ma()}</div>`):t==="bag"?gr("Bag",`<div id="bagMount">${Aa()}</div>`):""}function Ba(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ti()}
      </div>

      <!-- Header rechtsboven: XP + stappen -->
      <header style="
        position:absolute; top:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        flex-direction:column;
        align-items:flex-end;
        gap:8px;
        pointer-events:none;
      ">
        <div id="xpMount" style="
          pointer-events:auto;
          padding:10px 12px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter: blur(10px);
        ">
          ${Tr()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Ir()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag, naast elkaar, NET boven GPS -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px; /* netjes tussen 🎯/🧭 en GPS-balk */
        z-index:5000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
        <button type="button" data-panel="profile" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#fff;
        ">👤</button>

        <button type="button" data-panel="bag" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#fff;
        ">🎒</button>
      </div>

      <!-- Panel-root: alleen deze wordt gewisseld bij tabs -->
      <div id="panelRoot">
        ${Vr()}
      </div>

      <!-- 🔔 Kleine toast voor step-rewards (XP/tickets/CBS via lopen) -->
      <div id="cbsgoToastHost" style="
        position:fixed;
        left:0;
        right:0;
        bottom:24px;
        z-index:7000;
        display:flex;
        justify-content:center;
        pointer-events:none;
      "></div>

      <!-- 🎁 Groot overlay-venster voor cadeautjes + streak + daily-goal + friend gifts -->
      <div id="cbsgoLootOverlayHost" style="
        position:fixed;
        inset:0;
        z-index:8000;
        pointer-events:none;
      "></div>

      ${Pr()?`<button id="resetBtn" type="button" style="
               position:fixed;
               right:12px;
               bottom:90px;
               z-index:6000;
               padding:10px 12px;
               border-radius:14px;
               border:1px solid rgba(255,255,255,.14);
               background:rgba(0,0,0,.35);
               color:#fff;
             ">Reset Demo</button>`:""}
    </div>
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Vr();const n=yn();n==="profile"&&La(),n==="bag"&&za();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Un("map"),Et()})}function Na(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=yn();Un(o===n?"map":n||"map"),Et()})})}function br(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ba();try{Hr(),ka()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{nn()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Na(),Oi(),Qo(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const x=document.querySelector("#stepsMount");x&&(x.innerHTML=Ir())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const x=document.querySelector("#xpMount");x&&(x.innerHTML=Tr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(x=>{window.addEventListener(x,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{yn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(x=>{window.addEventListener(x,u)})}let n=null;function o(u){const x=document.querySelector("#cbsgoToastHost");if(!x)return;let p=x.querySelector(".cbsgoToastBox");p||(p=document.createElement("div"),p.className="cbsgoToastBox",p.style.pointerEvents="auto",p.style.padding="8px 12px",p.style.borderRadius="999px",p.style.border="1px solid rgba(255,255,255,.25)",p.style.background="rgba(10,12,18,.88)",p.style.backdropFilter="blur(10px)",p.style.color="#fff",p.style.fontFamily="system-ui,sans-serif",p.style.fontSize="11px",p.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",p.style.opacity="0",p.style.transform="translateY(10px)",p.style.transition="opacity .25s ease-out, transform .25s ease-out",x.appendChild(p)),p.textContent=u||"",p.style.opacity="1",p.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{p.style.opacity="0",p.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const x=u?.detail||{},p=Number(x.xp||0),h=Number(x.tickets||0),v=Number(x.cbs||0);if(!p&&!h&&!v)return;const _=[];p&&_.push(`+${p} XP`),h&&_.push(`+${h} ticket${h===1?"":"s"}`),v&&_.push(`+${v} CBS`);let E="Walking reward";x.reason==="boost"?E="Glow boost":x.reason==="treasure"||x.reason==="treasure-rare"?E="Treasure reward":x.reason==="distance"&&(E="Distance reward"),o(`${E}: ${_.join(" · ")}`)}));function l(u){const x=document.querySelector("#cbsgoLootOverlayHost");if(!x)return;x.innerHTML="";const p=Number(u?.steps||0),h=Number(u?.goal||0),v=u?.dayKey||"",_=document.createElement("div");_.style.position="fixed",_.style.inset="0",_.style.display="flex",_.style.alignItems="center",_.style.justifyContent="center",_.style.background="rgba(5,7,11,0.80)",_.style.pointerEvents="auto";const E=document.createElement("div");E.style.width="min(340px, 92vw)",E.style.borderRadius="22px",E.style.border="1px solid rgba(56,189,248,.85)",E.style.background="rgba(10,12,18,0.98)",E.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",E.style.padding="20px 18px 16px 18px",E.style.textAlign="center",E.style.color="#fff",E.style.fontFamily="system-ui,sans-serif",E.style.opacity="0",E.style.transform="translateY(14px) scale(0.96)",E.style.transition="opacity .25s ease-out, transform .25s ease-out";const A=h?`${p}/${h} steps`:`${p} steps`;E.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${v?` (${v})`:""}.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#7dd3fc;
      ">
        ${A}
      </div>
      <div style="font-size:11px;opacity:.75;margin-bottom:12px;">
        Every day counts towards your streak. Keep going, CBS-GO is proud of you.
      </div>
      <button type="button" id="cbsgoDailyGoalCloseBtn" style="
        padding:8px 14px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,.95);
        color:#e5e7eb;
        font-size:12px;
        font-weight:600;
        cursor:pointer;
      ">
        Nice! Continue
      </button>
    `,_.appendChild(E),x.appendChild(_),requestAnimationFrame(()=>{E.style.opacity="1",E.style.transform="translateY(0) scale(1)"});const B=()=>{E.style.opacity="0",E.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{x.innerHTML=""},250)},Q=document.getElementById("cbsgoDailyGoalCloseBtn");Q&&(Q.onclick=B),_.addEventListener("click",K=>{K.target===_&&B()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function d(u){const x=document.querySelector("#cbsgoLootOverlayHost");if(!x)return;const p=Number(u?.xp||0),h=Number(u?.tickets||0),v=Number(u?.cbs||0);if(!p&&!h&&!v)return;x.innerHTML="";const _=document.createElement("div");_.style.position="fixed",_.style.inset="0",_.style.display="flex",_.style.alignItems="center",_.style.justifyContent="center",_.style.background="rgba(5,7,11,0.75)",_.style.pointerEvents="auto";const E=document.createElement("div");E.style.width="min(320px, 90vw)",E.style.borderRadius="22px",E.style.border="1px solid rgba(255,255,255,.4)",E.style.background="rgba(10,12,18,0.96)",E.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",E.style.padding="18px 18px 16px 18px",E.style.textAlign="center",E.style.color="#fff",E.style.fontFamily="system-ui,sans-serif",E.style.opacity="0",E.style.transform="translateY(12px) scale(0.97)",E.style.transition="opacity .25s ease-out, transform .25s ease-out";const A=[];p&&A.push(`+${p} XP`),h&&A.push(`+${h} ticket${h===1?"":"s"}`),v&&A.push(`+${v} CBS`),E.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎁</div>
      <div style="font-weight:800;font-size:16px;margin-bottom:4px;">
        Gift opened!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You found:
      </div>
      <div style="
        font-size:14px;
        font-weight:600;
        margin-bottom:10px;
      ">
        ${We(A.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,_.appendChild(E),x.appendChild(_),requestAnimationFrame(()=>{E.style.opacity="1",E.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{E.style.opacity="0",E.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{x.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{d(u?.detail||{})}));function f(u){const x=document.querySelector("#cbsgoLootOverlayHost");if(!x)return;const p=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!p&&!h)return;const v=u?.fromWallet||"",_=u?.senderNickname||"",E=_&&_.trim()?_.trim():ln(v)||"Friend",A=u?.senderAvatar||"",B=[];p&&B.push(`+${p} ticket${p===1?"":"s"}`),h&&B.push(`+${h} CBS`);const Q=ln(v);x.innerHTML="";const K=document.createElement("div");K.style.position="fixed",K.style.inset="0",K.style.display="flex",K.style.alignItems="center",K.style.justifyContent="center",K.style.background="rgba(5,7,11,0.80)",K.style.pointerEvents="auto";const ee=document.createElement("div");ee.style.width="min(340px, 92vw)",ee.style.borderRadius="22px",ee.style.border="1px solid rgba(56,189,248,.85)",ee.style.background="rgba(10,12,18,0.98)",ee.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",ee.style.padding="18px 18px 14px 18px",ee.style.textAlign="center",ee.style.color="#fff",ee.style.fontFamily="system-ui,sans-serif",ee.style.opacity="0",ee.style.transform="translateY(14px) scale(0.96)",ee.style.transition="opacity .25s ease-out, transform .25s ease-out",ee.innerHTML=`
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
        ${Vn(A,56)}
        <div style="font-weight:800;font-size:16px;margin-top:4px;">
          ${We(E)}
        </div>
        ${Q?`<div style="font-size:11px;opacity:.7;">${We(Q)}</div>`:""}
        <div style="font-size:12px;opacity:.85;margin-top:4px;">
          sent you a gift in CBS-GO
        </div>
        <div style="
          font-size:14px;
          font-weight:600;
          margin-top:8px;
        ">
          ${We(B.join(" · "))}
        </div>
        <button type="button" id="cbsgoFriendGiftCloseBtn" style="
          margin-top:10px;
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(148,163,184,.9);
          background:rgba(15,23,42,.95);
          color:#e5e7eb;
          font-size:12px;
          font-weight:600;
          cursor:pointer;
        ">
          Nice! Continue
        </button>
      </div>
    `,K.appendChild(ee),x.appendChild(K),requestAnimationFrame(()=>{ee.style.opacity="1",ee.style.transform="translateY(0) scale(1)"});const he=()=>{ee.style.opacity="0",ee.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{x.innerHTML=""},220)},de=document.getElementById("cbsgoFriendGiftCloseBtn");de&&(de.onclick=he),K.addEventListener("click",ce=>{ce.target===K&&he()})}window.__cbsgo_friend_gift_overlay_listener||(window.__cbsgo_friend_gift_overlay_listener=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{f(u?.detail||{})}));function g(u){const x=document.querySelector("#cbsgoLootOverlayHost");if(!x)return;x.innerHTML="";const p=Number(u?.days||7),h=Number(u?.rewardCbs||0),v=document.createElement("div");v.style.position="fixed",v.style.inset="0",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.background="rgba(5,7,11,0.80)",v.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(251,191,36,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out",_.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${p}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${p} days in a row.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#facc15;
      ">
        +${h} CBS (play money)
      </div>
      <div style="font-size:11px;opacity:.7;margin-bottom:12px;">
        Keep walking, keep glowing – CBS-GO is proud of you.
      </div>
      <button type="button" id="cbsgoStreakCloseBtn" style="
        padding:8px 14px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,.9);
        background:rgba(15,23,42,.95);
        color:#e5e7eb;
        font-size:12px;
        font-weight:600;
        cursor:pointer;
      ">
        Nice! Continue
      </button>
    `,v.appendChild(_),x.appendChild(v),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const E=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{x.innerHTML=""},250)},A=document.getElementById("cbsgoStreakCloseBtn");A&&(A.onclick=E),v.addEventListener("click",B=>{B.target===v&&E()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{g(u?.detail||{})})),Et(),Pr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ei)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const x=u?.detail?.id;if(!x)return;if(x==="__daily__"){Pn({id:"__daily__",name:"Daily Glow"});return}if(Sr(x))return;const p=co.find(h=>h.id===x);p&&Pn(p)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const x=u?.detail?.id;x&&ao(async()=>{const{completeNode:p}=await Promise.resolve().then(()=>xo);return{completeNode:p}},void 0).then(({completeNode:p})=>{p(x),Zr()})})),Xn().catch(()=>{})}function Zr(){if(!document.querySelector("#app"))return;if(Wr()&&ra()){br();return}fa();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),br()};window.addEventListener("cbsgo:loginDone",n)}function Jr(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function fn(t){const n=Jr();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";fn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{fn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function hr(){try{if(!document.getElementById("app")){fn("❌ #app not found in index.html");return}Zr();const n=Jr();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){fn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hr,{once:!0}):hr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
