import{createClient as oo}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const u of f.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(c){if(c.ep)return;c.ep=!0;const f=o(c);fetch(c.href,f)}})();const io="modulepreload",ao=function(t){return"/cbs-go/"+t},nr={},so=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let b=function(x){return Promise.all(x.map(h=>Promise.resolve(h).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=b(o.map(x=>{if(x=ao(x),x in nr)return;nr[x]=!0;const h=x.endsWith(".css"),y=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":io,h||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),h)return new Promise((B,U)=>{_.addEventListener("load",B),_.addEventListener("error",()=>U(new Error(`Unable to preload CSS for ${x}`)))})}))}function f(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&f(p.reason);return n().catch(f)})},$n="cbsgoLevelUpOverlay",rr="cbsgoLevelUpStyles",Ln="https://smitskecbs.github.io/cbs-go/";function lo(){if(document.getElementById(rr))return;const t=document.createElement("style");t.id=rr,t.textContent=`
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
  `,document.head.appendChild(t)}function An(){const t=document.getElementById($n);t&&t.remove()}function co(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const f=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${f}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function or(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fo(t){lo(),An();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=$n,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${or(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${or(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&co(c);const f=()=>An(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),b=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=f),p&&(p.onclick=f),b&&(b.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Ln}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Ln),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+Ln)}}),setTimeout(()=>{document.getElementById($n)&&An()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{fo(t?.detail||{})}));const po=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],mr="cbsgo_state_v6";function uo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function xo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ft(){const t=localStorage.getItem(mr);return uo(t,xo())}function wr(t){t.updatedAt=Date.now(),localStorage.setItem(mr,JSON.stringify(t))}function Gn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function pn(){return Number(Ft().xp||0)}function Gt(){const t=pn();let n=1,o=t;for(;;){const l=Gn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function vr(){const t=pn();let n=1,o=t;for(;;){const l=Gn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function _r(){return Gn(Gt())}function Yt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ft();const o=Gt(),l=Ft();l.xp=Number(l.xp||0)+n,wr(l);const c=Gt();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function Sr(t){const n=String(t||"");if(!n)return!1;const o=Ft();return!!(o.completed&&o.completed[n])}function kr(t){const n=String(t||"");if(!n)return;const o=Ft();o.completed||(o.completed={}),o.completed[n]=Date.now(),wr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const yo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Yt,completeNode:kr,getLevel:Gt,getXp:pn,getXpIntoLevel:vr,getXpNeededThisLevel:_r,isNodeCompleted:Sr},Symbol.toStringTag,{value:"Module"})),Cr="cbsgoPuzzleModal";function go(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Bn(){const t=document.getElementById(Cr);t&&t.remove()}function Pn(t){Bn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],f=180,u=18,p=l.length,b=.01;let x=[],h=null,y=0,_=u,B=!1,U=!1,A=null;const N=t?.name||"CBS GO Puzzle",K=document.createElement("div");K.id=Cr,K.style.position="fixed",K.style.inset="0",K.style.zIndex="999999",K.style.display="flex",K.style.alignItems="center",K.style.justifyContent="center",K.style.padding="16px",K.style.background="rgba(0,0,0,.70)",K.style.backdropFilter="blur(12px)",K.style.fontFamily="system-ui, sans-serif",K.style.color="#fff",K.innerHTML=`
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
          ${go(N)}
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
          <div>Moves left: <span id="cbsgoMoves">${u}</span></div>
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
  `,document.body.appendChild(K);const ie=document.getElementById("cbsgoBoard"),pe=document.getElementById("cbsgoScore"),le=document.getElementById("cbsgoMoves"),de=document.getElementById("cbsgoStatus"),Ie=document.getElementById("cbsgoPuzzleClose"),ot=document.getElementById("cbsgoPuzzleOk"),We=document.getElementById("cbsgoConfettiLayer");function Re(R){de&&(de.textContent=R||"")}function it(){if(!We)return;We.style.display="block",We.innerHTML="";const R=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],D=40;for(let Y=0;Y<D;Y++){const O=document.createElement("div"),ee=6+Math.floor(Math.random()*6),me=Math.random()*100,ke=Math.random()*.6,Ce=1+Math.random()*.6,gt=Math.random()*360;O.style.position="absolute",O.style.top="-10%",O.style.left=`${me}%`,O.style.width=`${ee}px`,O.style.height=`${ee*2}px`,O.style.background=R[Y%R.length],O.style.opacity="0.9",O.style.borderRadius="2px",O.style.transform=`rotate(${gt}deg)`,O.style.animation=`cbsgoConfettiFall ${Ce}s ease-out ${ke}s forwards`,We.appendChild(O)}}function at(){return Math.floor(Math.random()*l.length)}function Bt(){x=[];for(let R=0;R<n;R++){const D=[];for(let Y=0;Y<o;Y++)Math.random()<b?D.push(p):D.push(at());x.push(D)}}function st(R){return R===p}function Te(){if(ie){ie.innerHTML="";for(let R=0;R<n;R++)for(let D=0;D<o;D++){const Y=x[R][D],O=document.createElement("div");O.dataset.row=String(R),O.dataset.col=String(D),O.style.borderRadius="12px",O.style.display="flex",O.style.alignItems="center",O.style.justifyContent="center",O.style.cursor=U?"default":"pointer",O.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",O.style.fontSize="20px",st(Y)?(O.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",O.textContent="💥"):(O.style.background=l[Y]||"#444",O.textContent=c[Y]||"⬛"),h&&h.row===R&&h.col===D&&(O.style.outline="2px solid #fff",O.style.outlineOffset="2px"),O.addEventListener("click",()=>{Pe(R,D)}),O.addEventListener("touchstart",ee=>{if(U)return;const me=ee.touches[0];A={row:R,col:D,x:me.clientX,y:me.clientY}}),O.addEventListener("touchend",ee=>{if(!A||U)return;const me=ee.changedTouches[0],ke=me.clientX-A.x,Ce=me.clientY-A.y;if(Math.sqrt(ke*ke+Ce*Ce)<18){Pe(R,D),A=null;return}let De=A.row,Je=A.col;Math.abs(ke)>Math.abs(Ce)?ke>0?Je+=1:Je-=1:Ce>0?De+=1:De-=1,De>=0&&De<n&&Je>=0&&Je<o&&$e(A.row,A.col,De,Je),A=null,ee.preventDefault()}),ie.appendChild(O)}}}function ut(R,D){if(!R||!D)return!1;const Y=Math.abs(R.row-D.row),O=Math.abs(R.col-D.col);return Y+O===1}function Ue(R,D){const Y=x[R.row][R.col];x[R.row][R.col]=x[D.row][D.col],x[D.row][D.col]=Y}function xt(){const R=new Set;for(let D=0;D<n;D++){let Y=x[D][0],O=0;for(let ee=1;ee<=o;ee++){const me=ee<o?x[D][ee]:null;if(me===Y)continue;const ke=ee-O;if(Y!=null&&ke>=3)for(let Ce=O;Ce<ee;Ce++)R.add(`${D},${Ce}`);Y=me,O=ee}}for(let D=0;D<o;D++){let Y=x[0][D],O=0;for(let ee=1;ee<=n;ee++){const me=ee<n?x[ee][D]:null;if(me===Y)continue;const ke=ee-O;if(Y!=null&&ke>=3)for(let Ce=O;Ce<ee;Ce++)R.add(`${Ce},${D}`);Y=me,O=ee}}return R}function qe(R){if(!R||!R.size)return 0;const D=R.size;y+=D*4,pe&&(pe.textContent=String(y)),!U&&y>=f&&yt(!0);for(const Y of R){const[O,ee]=Y.split(","),me=Number(O),ke=Number(ee);x[me][ke]=null}for(let Y=0;Y<o;Y++){let O=n-1;for(let ee=n-1;ee>=0;ee--)x[ee][Y]!=null&&(x[O][Y]=x[ee][Y],O--);for(let ee=O;ee>=0;ee--)Math.random()<b?x[ee][Y]=p:x[ee][Y]=at()}return D}function Qe(R,D){const Y=new Set;for(let O=0;O<o;O++)Y.add(`${R},${O}`);for(let O=0;O<n;O++)Y.add(`${O},${D}`);qe(Y),Te(),U||setTimeout(()=>zt(!1),120)}function zt(R=!1){if(U)return;B=!0;const D=()=>{if(U){B=!0;return}const Y=xt();if(!Y.size){B=!1,Te(),R&&!U&&(_<=0?He():Re("Nice! Keep matching."));return}qe(Y),Te(),setTimeout(D,120)};D()}function yt(R){if(!U)if(U=!0,B=!0,R){Re("Great job! Puzzle completed 🎉");try{t?.id&&kr(t.id),Yt(10)}catch{}it(),setTimeout(()=>{Bn()},1600)}else Re("Out of moves. Try again next time 🙂")}function He(){y>=f?yt(!0):_<=0&&yt(!1)}function $e(R,D,Y,O){if(B||U)return;if(_<=0){He();return}const ee={row:R,col:D},me={row:Y,col:O};if(!ut(ee,me))return;const ke=x[R][D],Ce=x[Y][O],gt=st(ke)||st(Ce);if(Ue(ee,me),h=null,_--,le&&(le.textContent=String(_)),gt){Te();const De=st(x[R][D])?{row:R,col:D}:{row:Y,col:O};Qe(De.row,De.col),He();return}if(!xt().size){Ue(ee,me),Te(),Re("No match… try another swap."),He();return}Re(""),Te(),zt(!0)}function Pe(R,D){if(B||U)return;if(_<=0){He();return}const Y={row:R,col:D};if(!h){h=Y,Te();return}if(h.row===R&&h.col===D){h=null,Te();return}if(!ut(h,Y)){h=Y,Te();return}$e(h.row,h.col,Y.row,Y.col)}function fe(){Bn()}Ie&&(Ie.onclick=fe),ot&&(ot.onclick=()=>{fe()}),Bt(),Te(),Re("Tap or swipe two neighboring tiles to swap them.")}const Er="cbsgo_inventory_v2";function bo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function ho(){return{tickets:0,cbs:0,cards:{}}}function Ne(){const t=localStorage.getItem(Er),n=bo(t,ho());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Mt(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Er,JSON.stringify(n))}function Mr(){return Number(Ne().tickets||0)}function Lr(){return Number(Ne().cbs||0)}function Lt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne();return o.tickets=Number(o.tickets||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function un(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne();return o.cbs=Number(o.cbs||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function mo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function wo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function vo(){return{...Ne().cards||{}}}function _o(t){const n=String(t||"").trim();if(!n)return 0;const o=vo();return Number(o[n]||0)}function Ar(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Ne();const c=Ne();return c.cards||(c.cards={}),c.cards[o]=Number(c.cards[o]||0)+l,Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}function So(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Ne();const c=Ne();if(!c.cards||typeof c.cards[o]!="number")throw new Error("Not enough of that card in your collection.");const f=Number(c.cards[o]||0);if(f<l)throw new Error("Not enough of that card in your collection.");return c.cards[o]=f-l,c.cards[o]<=0&&delete c.cards[o],Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}const Br="cbsgo_steps_v6",ko="cbsgo_steps_v5",Co="cbsgo_gps_autostart_v2",zr="cbsgo_daily_puzzle_v1",Eo=.75,kt=5e3,an=7,On=100,Mo=1e3,Lo=.5,Ao=2e3,Bo=4.5,zn=1500,Nn=200,zo=.25,No=.05,Io=.3;let en=null,tn=!1,mt={msg:"init"};function jn(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Nr="cbsgo_cards_v1",To=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function $o(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Po(t){return To.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Oo(){try{const t=localStorage.getItem(Nr),n=jn(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const f=Number(c.count);Number.isFinite(f)&&f>0&&(o[l]=f)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function jo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,f]of Object.entries(n)){const u=Number(f||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Nr,JSON.stringify(l))}catch{}}function Ro(t,n=1){const o=$o(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const f={...Oo().counts||{}},p=Number(f[o]||0)+l;f[o]=p,jo({counts:f});const b=Po(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:f}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:b}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:b}}))}catch{}return{cardId:o,count:p,card:b}}function rt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Uo(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,f=new Date(o,l-1,c);return Number.isNaN(f.getTime())?null:f}function Fo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Ir(t,n){const o=Uo(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const f=new Date(o.getTime());f.setDate(f.getDate()-c),l.push(Fo(f))}return l}function sn(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:rt(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Go(t){const n=rt();return!t||typeof t!="object"?sn():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function xn(t){t.updatedAt=Date.now(),localStorage.setItem(Br,JSON.stringify(t))}function Wo(t,n){if(!n)return;const o=Ir(n,an);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(un(On),qt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:an,rewardCbs:On,lastDayKey:n}})))}function ir(t){t=Go(t||sn());const n=rt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Wo(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,xn(t)}return t}function pt(){let t=localStorage.getItem(Br);if(!t){const o=localStorage.getItem(ko);if(o){const l=jn(o,sn()),c=ir(l);return xn(c),c}}const n=jn(t,sn());return ir(n)}function nn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Do()}}))}function Wn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function qt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Dn(t,n,o,l){const c=Number(t||0),f=Number(n||0),u=0;if(!(!c&&!f&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:f,cbs:u,reason:l||"distance"}}))}catch{}}function Do(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Yo(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function qo(){return Yo()/1e3}function Ho(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,c=t.dayKey||rt(),f=t.streak||{},p=Ir(c,an).map(b=>{let x=!1;return b===c?x=l:x=!!f[b],{dateKey:b,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:an,rewardPerStreak:On}}function ar(){return!!tn}function Ko(){try{return localStorage.getItem(zr)===rt()}catch{return!1}}function Xo(){try{localStorage.setItem(zr,rt())}catch{}}function Vo(t,n){return Ko()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:rt()}})),Xo(),!0)}function sr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Zo(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<zn)return;const f=Math.floor(c/zn);f<=0||(Lt(f),qt(),Dn(0,f,0,"boost"),t.boostLastStep=o+f*zn)}function Qo(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Nn){t.chestMeters=n;return}let o=0;for(;n>=Nn&&o<5;)if(n-=Nn,o+=1,Math.random()<zo){const l=Math.random()<No,c=l?10:3,f=l?2:1;Yt(c),Wn(),Lt(f),qt();const u=l&&Math.random()<Io;Dn(c,f,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:f,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function Jo(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function ei(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),f=Number(t.xpKmAwarded||0);if(c>f){const x=c-f;x>0&&(Yt(x),Wn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),b=Number(t.ticketChunksAwarded||0);if(p>b){const x=p-b;x>0&&(Lt(x),qt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Dn(o,l,0,"distance")}function ti(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/Eo);if(c>l){const f=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+f}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||rt(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),ei(o),Zo(o),Qo(o),xn(o),nn(),o}function ni(){en!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(en),en=null}async function lr(t={}){const n=!!t.silent;if(!navigator.geolocation)return mt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Co,"1")}catch{}ni(),tn=!0,mt={msg:"requesting",t:Date.now()};try{return en=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,f=o.coords.accuracy||999,u=Date.now(),p=pt(),b=p.lastPos;p.lastPos={lat:l,lng:c,t:u},xn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:f,heading:x,speed:h,t:u}})),f>Mo){mt={lat:l,lng:c,acc:f,t:u,reason:"accuracy",boostMs:sr()},nn();return}Vo(l,c);let y=0,_=0,B=0,U=0,A="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(y=Jo({lat:b.lat,lng:b.lng},{lat:l,lng:c}),_=Math.max(1,(u-b.t)/1e3),B=y/_,y<Lo?A="jitter":y>Ao?A="teleport":B>Bo?A="too-fast":(ti(y),U=y,A="ok")),mt={lat:l,lng:c,acc:f,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite(B)?Number(B.toFixed(2)):0,added:Math.round(U),reason:A,boostMs:sr()},nn()},o=>{tn=!1,mt={err:o?.message||"GPS blocked",t:Date.now()},nn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return tn=!1,mt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ri(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ar()||await lr({silent:!0}))();const n=async()=>{ar()||await lr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Yt(o),Wn()),(l>0||c>0)&&(l>0&&Lt(l),c>0&&un(c),qt());const f=n.cardId||n.card_id;if(f)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Ro(f,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Tr(){const t=pn(),n=Gt(),o=vr(),l=_r(),c=qo(),f=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
        <div>${c.toFixed(2)} km walked</div>
      </div>
    </div>
  `}function $r(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:f}=Ho(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
          width:${u}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 8px rgba(168,85,247,.6);
          transition:width .25s ease-out;
        "></div>
      </div>

      <div style="text-align:right;font-size:11px;letter-spacing:1px;margin-bottom:2px;">
        ${p}
      </div>

      <div style="text-align:right;font-size:9px;opacity:.75;">
        ${c}-day streak → +${f} CBS
      </div>
    </div>
  `}function Pr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function oi(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Or="cbsgo_player_name_v2",Yn="cbsgo_player_avatar_v2";function At(){try{return localStorage.getItem(Or)||"Sovereign"}catch{return"Sovereign"}}function jr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Or,n)}catch{}return n}function Wt(){try{return localStorage.getItem(Yn)||""}catch{return""}}function ii(t){const n=String(t||"");try{localStorage.setItem(Yn,n)}catch{}return n}function ai(){try{localStorage.removeItem(Yn)}catch{}}let H=null,et=null,tt=null,Pt=null,jt=null,Ge=null,ze=null,wt=0,ft=!1,Ze=!0,Fe=null;const Xe=new Map;let Ve=!0,Rt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const si="48a387bba00043ac4ba5823371abc9d2",Dt=80,li=6,ci=80,fi=220,di=6e4,pi=5*6e4,ui=300,xi=.35,In=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],yi=350,gi=.35,bi=120;let ln=0,vt=0,rn=null,Rn=!1,St=[];function dt(t){return document.getElementById(t)}function _t(t){const n=dt("cbsgoMapHost");if(!n)return;let o=dt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function hi(){const t=String(At()||"").trim();return t?t[0].toUpperCase():"🙂"}function Un(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Rr(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,f=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+f,lng:t.lng+u}}function mi(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),f=o(n.lng-t.lng),u=Math.sin(f)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(f);let b=Math.atan2(u,p);return b=b*180/Math.PI,b=(b+360)%360,b}function wi(t,n,o){const c=n/6371e3,f=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,b=Math.sin(u),x=Math.cos(u),h=Math.sin(c),y=Math.cos(c),_=Math.asin(b*y+x*h*Math.cos(f)),B=p+Math.atan2(Math.sin(f)*h*x,y-b*Math.sin(_));return[_*180/Math.PI,B*180/Math.PI]}function vi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Ur(){const{temp:t,iconEmoji:n}=Rt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Fr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;vi();const{condition:n,isNight:o}=Rt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const f=[];for(let u=0;u<48;u++){const p=Math.random()*100,b=Math.random()*16-8,x=Math.random()*2.5,h=2+Math.random()*1.5;f.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+b}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=f.join("")}else if(n==="snow"){const f=[];for(let u=0;u<42;u++){const p=Math.random()*100,b=Math.random()*20-10,x=Math.random()*4,h=6+Math.random()*4;f.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+b}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=f.join("")}else l="";t.innerHTML=l}async function _i(t,n){const o=Date.now();if(!(Rt.lastUpdated&&o-Rt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${si}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const f=await c.json(),u=f?.main?.temp,p=f?.weather?.[0]?.icon||"01d",b=String(f?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),h="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(h="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(h="🌧️",y="rain"):p.startsWith("11")?(h="⛈️",y="storm"):p.startsWith("13")?(h="❄️",y="snow"):p.startsWith("50")&&(h="🌫️",y="mist"),b.includes("rain")&&(y="rain"),b.includes("snow")&&(y="snow"),b.includes("thunder")&&(y="storm");try{const B=Number(f?.dt||0),U=Number(f?.timezone||0);if(B&&Number.isFinite(U)){const N=((B+U)/3600%24+24)%24;x=N<7||N>=19}}catch{}y==="clear"?h=x?"🌙":"☀️":y==="clouds"?h="☁️":y==="rain"?h="🌧️":y==="storm"?h="⛈️":y==="snow"?h="❄️":y==="mist"&&(h="🌫️"),Rt={temp:u,iconEmoji:h,condition:y,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Ur()),Fr()}catch(l){console.warn("Weather fetch failed",l)}}function Si(t){const n=Wt();if(n){const c=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${n}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:c,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const l=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${Un(hi())}</div>
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function ki(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Un(o)}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:p,className:"",iconSize:[30,30],iconAnchor:[15,15]})}const c=String(n||"").trim()||"🙂",f=`
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${Un(c)}</div>
  `;return t.divIcon({html:f,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function Ci(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Ei(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Mi(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Li(){if(!In.length)return null;const t=Math.floor(Math.random()*In.length);return In[t]}function Ai(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let f=null,u=0;if(Math.random()<xi){const p=Li();p&&(f=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:f,cardCount:u}}function Bi(t){if(!H||!Ge||!t)return;const n=Date.now();if(n-ln<di||Ge.getLayers().length>=li)return;const l=window.L;if(!l)return;const c=Mi(),f=Ai(c),u=Rr(t,ci,fi),p=Ci(l),b=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),h={marker:b,createdAt:n,lat:u.lat,lng:u.lng,reward:f};St.push(h),b.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:ze[0],lng:ze[1]},_={lat:u.lat,lng:u.lng},B=Ct(y,_);if(B>Dt){alert(`Too far to open this gift.

Distance: ${Math.round(B)}m
Needed: ≤ ${Dt}m`);return}Ge.removeLayer(b),St=St.filter(Ie=>Ie.marker!==b);const{xp:U,tickets:A,cbs:N,cardId:K,cardCount:ie}=f,pe=[];U&&pe.push(`+${U} XP`),A&&pe.push(`+${A} ticket${A===1?"":"s"}`),N&&pe.push(`+${N} CBS`),K&&ie>0&&pe.push(`+${ie} card${ie===1?"":"s"}`);const le=pe.length?pe.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${le}`);const de={kind:"mystery",xp:U||0,tickets:A||0,cbs:N||0,cardId:K||null,cardCount:ie||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:de}))}catch{}}),b.addTo(Ge),ln=n}function zi(t){if(!H||!Ge||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!Ge.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>pi)return Ge.removeLayer(l.marker),o+=1,!1;const f=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(f)&&f>ui?(Ge.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Ge.getLayers().length===0&&(ln=0)}function Ni(t){if(!H||!jt||!t||rn)return;const n=window.L;if(!n)return;if(Rn){if(vt<yi||Math.random()>gi)return;vt=0}else{if(vt<bi)return;vt=0,Rn=!0}const o=Rr(t,60,140),l=Ei(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:ze[0],lng:ze[1]},u={lat:o.lat,lng:o.lng},p=Ct(f,u);if(p>Dt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Dt}m`);return}jt.removeLayer(c),rn=null,Pn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(jt),rn=c}function Ii(t){const n=window.L;if(!n||!H||!t)return;const o=Dt;Pt?(Pt.setLatLng(t),Pt.setRadius(o)):Pt=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(H)}function Ti(t){const n=window.L;if(!n||!H)return;const o=Si(n);if(et?(et.setIcon(o),et.setLatLng(t)):(et=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(H),H.setView(t,19)),tt?(tt.setIcon(cr(n,wt)),tt.setLatLng(t)):tt=n.marker(t,{icon:cr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(H),et&&et.bringToFront&&et.bringToFront(),tt&&tt.bringToFront&&tt.bringToFront(),Ii(t),Ze&&!ft&&H)try{const l=H.getZoom()||19;let c=t;Number.isFinite(wt)&&(c=wi(t,40,wt));const f=H.getCenter(),u=Ct({lat:f.lat,lng:f.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&H.setView(c,l)}catch{}}function Gr(){const t=window.L;return!t||!H?null:(Fe?(Ve&&!H.hasLayer(Fe)&&Fe.addTo(H),!Ve&&H.hasLayer(Fe)&&H.removeLayer(Fe)):(Fe=t.layerGroup(),Ve&&Fe.addTo(H)),Fe)}function $i(t){if(!Array.isArray(t)||!H)return[];const n=H.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(f=>{if(!f||f.isMe||typeof f.lat!="number"||typeof f.lng!="number")return;const u=Math.round(f.lat*o)/o,p=Math.round(f.lng*o)/o,b=`${u}_${p}`;l.has(b)||l.set(b,[]),l.get(b).push(f)});const c=[];for(const[f,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||f,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,b=0;u.forEach(y=>{p+=y.lat,b+=y.lng});const x=p/u.length,h=b/u.length;c.push({id:`cluster_${f}`,lat:x,lng:h,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Pi(t){const n=window.L;if(!n||!H)return;const o=Gr();if(!o)return;if(!Ve){for(const[f,u]of Xe.entries())o.removeLayer(u),Xe.delete(f);return}const l=$i(t),c=new Set;l.forEach(f=>{if(!f||typeof f.lat!="number"||typeof f.lng!="number")return;const u=f.id||`${f.lat},${f.lng}`;c.add(u);const p=[f.lat,f.lng];let b=Xe.get(u);if(b)b.setLatLng(p);else{const x=f.isCluster&&f.count>1?String(f.count):f.nickname||"Anon",h=ki(n,x,f.avatar,f.isCluster);b=n.marker(p,{icon:h,pane:"cbsgo-others-pane"});const y=f.isCluster&&f.count>1?`${f.count} CBS-GO explorers nearby`:`${f.nickname||"CBS-GO explorer"}`;b.bindPopup(y),b.addTo(o),Xe.set(u,b)}});for(const[f,u]of Xe.entries())c.has(f)||(o.removeLayer(u),Xe.delete(f))}function Oi(){return`
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
        <span id="cbsgoWeatherLabel">${Ur()}</span>
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
  `}function ji(){try{H&&H.remove()}catch{}H=null,et=null,tt=null,Pt=null,jt=null,Ge=null,ze=null,ft=!1,Ze=!0,ln=0,vt=0,rn=null,Rn=!1,Fe=null,Xe.clear(),St=[]}function Ri(){const t=window.L,n=dt("cbsgoMap");if(!t||!n)return!1;ji();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));H=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=H.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=H.createPane("cbsgo-others-pane");c.style.zIndex="640";const f=H.createPane("cbsgo-loot-pane");f.style.zIndex="630";const u=H.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(H),H.setMaxBounds(o),H.setView([51.687,4.87],16),jt=t.layerGroup().addTo(H),Ge=t.layerGroup().addTo(H),H.on("dragstart",()=>{Ze=!1}),H.on("zoomstart",()=>{Ze=!1}),!0}function Ui(){!navigator.geolocation||!H||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,f={lat:n,lng:o},u=ze?{lat:ze[0],lng:ze[1]}:null;if(ze=[n,o],Number.isFinite(c))wt=c;else if(u){const p=Ct(u,f);Number.isFinite(p)&&p>2&&(wt=mi(u,f))}if(Ti([n,o]),u){const p=Ct(u,f);if(Number.isFinite(p)&&p>1&&(vt+=p),Number.isFinite(p)&&p>20&&!Ze&&!ft&&H){Ze=!0;const b=H.getZoom()||19;H.setView([n,o],b)}}Ni(f),Bi(f),zi(f),_i(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Fi(){let t=0;const n=120,o=()=>{if(t++,!dt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!Ri()){_t("Could not init map. Refresh.");return}const c=dt("cbsgoCenterBtn");c&&(c.onclick=()=>{H&&ze&&(Ze=!0,ft=!1,H.setView(ze,19))});const f=dt("cbsgoCompassBtn");f&&(f.onclick=()=>{H&&(ft=!ft,ft?(Ze=!1,H.setView([51.687,4.87],3)):ze&&(Ze=!0,H.setView(ze,16)))});const u=dt("cbsgoOnlineToggleBtn");if(u){const p=()=>{Ve?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Ve=!Ve;const b=Gr();if(b&&H&&(Ve?H.hasLayer(b)||b.addTo(H):H.hasLayer(b)&&H.removeLayer(b)),p(),!Ve&&Fe){for(const[x,h]of Xe.entries())Fe.removeLayer(h);Xe.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const b=p?.detail?.players||[];Pi(b)})),Fr(),_t("Loading GPS…"),Ui()};o()}const Gi="cbsgo_cards_v1";function Wi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function qn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Hn(){const t=localStorage.getItem(Gi),n=Wi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function nt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Wr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Di(){const t=qn(),n=Hn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Yi(){const t=qn(),n=Hn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),f=Number.isFinite(c)&&c>0,u=Wr(l.rarity),p=f?u:"rgba(31,41,55,.9)",b=f?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=f?l.emoji||"🃏":"❓",h=f?nt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=nt(l.set||"Set"),_=f?`<div style="
             position:absolute;
             right:6px;
             top:6px;
             padding:2px 6px;
             border-radius:999px;
             border:1px solid ${u};
             background:rgba(15,23,42,.96);
             font-size:10px;
           ">
             x${c}
           </div>`:"";return`
        <div
          class="cbsgoCardTile"
          data-card-id="${nt(l.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${p};
            background:${b};
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
            ${nt(x)}
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
            ${y}
          </div>
        </div>
      `}).join("")}
    </div>
  `:`
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `}function qi(){const t=Di(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
          width:${c}%;
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
        ${Yi()}
      </div>
    </div>
  `}function Hi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${qi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const f=qn(),u=new Map(f.map(x=>[x.id,x]));function p(x){const h=u.get(x);if(!h)return;const y=Hn(),_=Number(y[x]||0),B=Number.isFinite(_)&&_>0,U=B?h.emoji||"🃏":"❓",A=B?h.name||"Card":"Unknown card",N=h.set||"Set",K=h.rarity||"common",ie=Wr(K),pe={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[K]||"Common",le=document.createElement("div");le.style.position="fixed",le.style.inset="0",le.style.display="flex",le.style.alignItems="center",le.style.justifyContent="center",le.style.background="rgba(0,0,0,0.65)",le.style.pointerEvents="auto",le.style.zIndex="8600";const de=document.createElement("div");de.style.width="min(260px, 82vw)",de.style.borderRadius="20px",de.style.border=`1px solid ${ie}`,de.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",de.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",de.style.padding="16px 14px 14px 14px",de.style.textAlign="center",de.style.color="#fff",de.style.fontFamily="system-ui,sans-serif",de.style.opacity="0",de.style.transform="translateY(14px) scale(0.96)",de.style.transition="opacity .2s ease-out, transform .2s ease-out";const Ie=B?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',ot=B?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;de.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${nt(N)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${ie};
          font-size:10px;
        ">
          ${nt(pe)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${ie};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${nt(U)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${nt(A)}
      </div>

      ${Ie}
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
    `,le.appendChild(de),document.body.appendChild(le),requestAnimationFrame(()=>{de.style.opacity="1",de.style.transform="translateY(0) scale(1)"});const We=()=>{de.style.opacity="0",de.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(le)},200)},Re=de.querySelector("#cbsgoCardPreviewCloseBtn");Re&&(Re.onclick=We),le.addEventListener("click",it=>{it.target===le&&We()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const h=x.getAttribute("data-card-id");h&&p(h)})})}function Ki(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Xi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function Vi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Tn={exports:{}};const Zi={},Qi=Object.freeze(Object.defineProperty({__proto__:null,default:Zi},Symbol.toStringTag,{value:"Module"})),Ji=Xi(Qi);var fr;function ea(){return fr||(fr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),f=new Uint8Array(32);f[0]=9;var u=o(),p=o([1]),b=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),B=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function U(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var g,m=0;for(g=0;g<s;g++)m|=r[a+g]^i[e+g];return(1&m-1>>>8)-1}function N(r,a,i,e){return A(r,a,i,e,16)}function K(r,a,i,e){return A(r,a,i,e,32)}function ie(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,I=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,X=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,V=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,ne=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,te=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Z=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Q=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,W=g,T=m,j=k,F=L,z=G,w=I,v=ye,E=$,S=X,C=V,M=ne,q=te,re=Z,ae=J,oe=Q,d,ce=0;ce<20;ce+=2)d=P+q|0,F^=d<<7|d>>>25,d=F+P|0,E^=d<<9|d>>>23,d=E+F|0,q^=d<<13|d>>>19,d=q+E|0,P^=d<<18|d>>>14,d=z+W|0,S^=d<<7|d>>>25,d=S+z|0,re^=d<<9|d>>>23,d=re+S|0,W^=d<<13|d>>>19,d=W+re|0,z^=d<<18|d>>>14,d=C+w|0,ae^=d<<7|d>>>25,d=ae+C|0,T^=d<<9|d>>>23,d=T+ae|0,w^=d<<13|d>>>19,d=w+T|0,C^=d<<18|d>>>14,d=oe+M|0,j^=d<<7|d>>>25,d=j+oe|0,v^=d<<9|d>>>23,d=v+j|0,M^=d<<13|d>>>19,d=M+v|0,oe^=d<<18|d>>>14,d=P+j|0,W^=d<<7|d>>>25,d=W+P|0,T^=d<<9|d>>>23,d=T+W|0,j^=d<<13|d>>>19,d=j+T|0,P^=d<<18|d>>>14,d=z+F|0,w^=d<<7|d>>>25,d=w+z|0,v^=d<<9|d>>>23,d=v+w|0,F^=d<<13|d>>>19,d=F+v|0,z^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=oe+ae|0,q^=d<<7|d>>>25,d=q+oe|0,re^=d<<9|d>>>23,d=re+q|0,ae^=d<<13|d>>>19,d=ae+re|0,oe^=d<<18|d>>>14;P=P+s|0,W=W+g|0,T=T+m|0,j=j+k|0,F=F+L|0,z=z+G|0,w=w+I|0,v=v+ye|0,E=E+$|0,S=S+X|0,C=C+V|0,M=M+ne|0,q=q+te|0,re=re+Z|0,ae=ae+J|0,oe=oe+Q|0,r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=W>>>0&255,r[5]=W>>>8&255,r[6]=W>>>16&255,r[7]=W>>>24&255,r[8]=T>>>0&255,r[9]=T>>>8&255,r[10]=T>>>16&255,r[11]=T>>>24&255,r[12]=j>>>0&255,r[13]=j>>>8&255,r[14]=j>>>16&255,r[15]=j>>>24&255,r[16]=F>>>0&255,r[17]=F>>>8&255,r[18]=F>>>16&255,r[19]=F>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=q>>>0&255,r[49]=q>>>8&255,r[50]=q>>>16&255,r[51]=q>>>24&255,r[52]=re>>>0&255,r[53]=re>>>8&255,r[54]=re>>>16&255,r[55]=re>>>24&255,r[56]=ae>>>0&255,r[57]=ae>>>8&255,r[58]=ae>>>16&255,r[59]=ae>>>24&255,r[60]=oe>>>0&255,r[61]=oe>>>8&255,r[62]=oe>>>16&255,r[63]=oe>>>24&255}function pe(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,I=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,X=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,V=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,ne=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,te=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Z=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Q=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,W=g,T=m,j=k,F=L,z=G,w=I,v=ye,E=$,S=X,C=V,M=ne,q=te,re=Z,ae=J,oe=Q,d,ce=0;ce<20;ce+=2)d=P+q|0,F^=d<<7|d>>>25,d=F+P|0,E^=d<<9|d>>>23,d=E+F|0,q^=d<<13|d>>>19,d=q+E|0,P^=d<<18|d>>>14,d=z+W|0,S^=d<<7|d>>>25,d=S+z|0,re^=d<<9|d>>>23,d=re+S|0,W^=d<<13|d>>>19,d=W+re|0,z^=d<<18|d>>>14,d=C+w|0,ae^=d<<7|d>>>25,d=ae+C|0,T^=d<<9|d>>>23,d=T+ae|0,w^=d<<13|d>>>19,d=w+T|0,C^=d<<18|d>>>14,d=oe+M|0,j^=d<<7|d>>>25,d=j+oe|0,v^=d<<9|d>>>23,d=v+j|0,M^=d<<13|d>>>19,d=M+v|0,oe^=d<<18|d>>>14,d=P+j|0,W^=d<<7|d>>>25,d=W+P|0,T^=d<<9|d>>>23,d=T+W|0,j^=d<<13|d>>>19,d=j+T|0,P^=d<<18|d>>>14,d=z+F|0,w^=d<<7|d>>>25,d=w+z|0,v^=d<<9|d>>>23,d=v+w|0,F^=d<<13|d>>>19,d=F+v|0,z^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=oe+ae|0,q^=d<<7|d>>>25,d=q+oe|0,re^=d<<9|d>>>23,d=re+q|0,ae^=d<<13|d>>>19,d=ae+re|0,oe^=d<<18|d>>>14;r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=oe>>>0&255,r[13]=oe>>>8&255,r[14]=oe>>>16&255,r[15]=oe>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function le(r,a,i,e){ie(r,a,i,e)}function de(r,a,i,e){pe(r,a,i,e)}var Ie=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function ot(r,a,i,e,s,g,m){var k=new Uint8Array(16),L=new Uint8Array(64),G,I;for(I=0;I<16;I++)k[I]=0;for(I=0;I<8;I++)k[I]=g[I];for(;s>=64;){for(le(L,k,m,Ie),I=0;I<64;I++)r[a+I]=i[e+I]^L[I];for(G=1,I=8;I<16;I++)G=G+(k[I]&255)|0,k[I]=G&255,G>>>=8;s-=64,a+=64,e+=64}if(s>0)for(le(L,k,m,Ie),I=0;I<s;I++)r[a+I]=i[e+I]^L[I];return 0}function We(r,a,i,e,s){var g=new Uint8Array(16),m=new Uint8Array(64),k,L;for(L=0;L<16;L++)g[L]=0;for(L=0;L<8;L++)g[L]=e[L];for(;i>=64;){for(le(m,g,s,Ie),L=0;L<64;L++)r[a+L]=m[L];for(k=1,L=8;L<16;L++)k=k+(g[L]&255)|0,g[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(le(m,g,s,Ie),L=0;L<i;L++)r[a+L]=m[L];return 0}function Re(r,a,i,e,s){var g=new Uint8Array(32);de(g,e,s,Ie);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return We(r,a,i,m,g)}function it(r,a,i,e,s,g,m){var k=new Uint8Array(32);de(k,g,m,Ie);for(var L=new Uint8Array(8),G=0;G<8;G++)L[G]=g[G+16];return ot(r,a,i,e,s,L,k)}var at=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,m,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};at.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,m,k,L,G,I,ye,$,X,V,ne,te,Z,J,Q,P,W,T,j=this.h[0],F=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],q=this.h[9],re=this.r[0],ae=this.r[1],oe=this.r[2],d=this.r[3],ce=this.r[4],ge=this.r[5],be=this.r[6],se=this.r[7],ue=this.r[8],xe=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,j+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,F+=(s>>>13|g<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,z+=(g>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,G=r[a+10]&255|(r[a+11]&255)<<8,S+=(L>>>14|G<<2)&8191,I=r[a+12]&255|(r[a+13]&255)<<8,C+=(G>>>11|I<<5)&8191,ye=r[a+14]&255|(r[a+15]&255)<<8,M+=(I>>>8|ye<<8)&8191,q+=ye>>>5|e,$=0,X=$,X+=j*re,X+=F*(5*xe),X+=z*(5*ue),X+=w*(5*se),X+=v*(5*be),$=X>>>13,X&=8191,X+=E*(5*ge),X+=S*(5*ce),X+=C*(5*d),X+=M*(5*oe),X+=q*(5*ae),$+=X>>>13,X&=8191,V=$,V+=j*ae,V+=F*re,V+=z*(5*xe),V+=w*(5*ue),V+=v*(5*se),$=V>>>13,V&=8191,V+=E*(5*be),V+=S*(5*ge),V+=C*(5*ce),V+=M*(5*d),V+=q*(5*oe),$+=V>>>13,V&=8191,ne=$,ne+=j*oe,ne+=F*ae,ne+=z*re,ne+=w*(5*xe),ne+=v*(5*ue),$=ne>>>13,ne&=8191,ne+=E*(5*se),ne+=S*(5*be),ne+=C*(5*ge),ne+=M*(5*ce),ne+=q*(5*d),$+=ne>>>13,ne&=8191,te=$,te+=j*d,te+=F*oe,te+=z*ae,te+=w*re,te+=v*(5*xe),$=te>>>13,te&=8191,te+=E*(5*ue),te+=S*(5*se),te+=C*(5*be),te+=M*(5*ge),te+=q*(5*ce),$+=te>>>13,te&=8191,Z=$,Z+=j*ce,Z+=F*d,Z+=z*oe,Z+=w*ae,Z+=v*re,$=Z>>>13,Z&=8191,Z+=E*(5*xe),Z+=S*(5*ue),Z+=C*(5*se),Z+=M*(5*be),Z+=q*(5*ge),$+=Z>>>13,Z&=8191,J=$,J+=j*ge,J+=F*ce,J+=z*d,J+=w*oe,J+=v*ae,$=J>>>13,J&=8191,J+=E*re,J+=S*(5*xe),J+=C*(5*ue),J+=M*(5*se),J+=q*(5*be),$+=J>>>13,J&=8191,Q=$,Q+=j*be,Q+=F*ge,Q+=z*ce,Q+=w*d,Q+=v*oe,$=Q>>>13,Q&=8191,Q+=E*ae,Q+=S*re,Q+=C*(5*xe),Q+=M*(5*ue),Q+=q*(5*se),$+=Q>>>13,Q&=8191,P=$,P+=j*se,P+=F*be,P+=z*ge,P+=w*ce,P+=v*d,$=P>>>13,P&=8191,P+=E*oe,P+=S*ae,P+=C*re,P+=M*(5*xe),P+=q*(5*ue),$+=P>>>13,P&=8191,W=$,W+=j*ue,W+=F*se,W+=z*be,W+=w*ge,W+=v*ce,$=W>>>13,W&=8191,W+=E*d,W+=S*oe,W+=C*ae,W+=M*re,W+=q*(5*xe),$+=W>>>13,W&=8191,T=$,T+=j*xe,T+=F*ue,T+=z*se,T+=w*be,T+=v*ge,$=T>>>13,T&=8191,T+=E*ce,T+=S*d,T+=C*oe,T+=M*ae,T+=q*re,$+=T>>>13,T&=8191,$=($<<2)+$|0,$=$+X|0,X=$&8191,$=$>>>13,V+=$,j=X,F=V,z=ne,w=te,v=Z,E=J,S=Q,C=P,M=W,q=T,a+=16,i-=16;this.h[0]=j,this.h[1]=F,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=q},at.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,m=1;m<8;m++)g=(this.h[m]+this.pad[m]|0)+(g>>>16)|0,this.h[m]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},at.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Bt(r,a,i,e,s,g){var m=new at(g);return m.update(i,e,s),m.finish(r,a),0}function st(r,a,i,e,s,g){var m=new Uint8Array(16);return Bt(m,0,i,e,s,g),N(r,a,m,0)}function Te(r,a,i,e,s){var g;if(i<32)return-1;for(it(r,0,a,0,i,e,s),Bt(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function ut(r,a,i,e,s){var g,m=new Uint8Array(32);if(i<32||(Re(m,0,32,e,s),st(a,16,a,32,i-32,m)!==0))return-1;for(it(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function Ue(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function qe(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function Qe(r,a){var i,e,s,g=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(xt(m),xt(m),xt(m),e=0;e<2;e++){for(g[0]=m[0]-65517,i=1;i<15;i++)g[i]=m[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=m[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,qe(m,g,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function zt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Qe(i,r),Qe(e,a),K(i,0,e,0)}function yt(r){var a=new Uint8Array(32);return Qe(a,r),a[0]&1}function He(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function $e(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Pe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function fe(r,a,i){var e,s,g=0,m=0,k=0,L=0,G=0,I=0,ye=0,$=0,X=0,V=0,ne=0,te=0,Z=0,J=0,Q=0,P=0,W=0,T=0,j=0,F=0,z=0,w=0,v=0,E=0,S=0,C=0,M=0,q=0,re=0,ae=0,oe=0,d=i[0],ce=i[1],ge=i[2],be=i[3],se=i[4],ue=i[5],xe=i[6],Se=i[7],he=i[8],we=i[9],ve=i[10],_e=i[11],Ee=i[12],Me=i[13],Le=i[14],Ae=i[15];e=a[0],g+=e*d,m+=e*ce,k+=e*ge,L+=e*be,G+=e*se,I+=e*ue,ye+=e*xe,$+=e*Se,X+=e*he,V+=e*we,ne+=e*ve,te+=e*_e,Z+=e*Ee,J+=e*Me,Q+=e*Le,P+=e*Ae,e=a[1],m+=e*d,k+=e*ce,L+=e*ge,G+=e*be,I+=e*se,ye+=e*ue,$+=e*xe,X+=e*Se,V+=e*he,ne+=e*we,te+=e*ve,Z+=e*_e,J+=e*Ee,Q+=e*Me,P+=e*Le,W+=e*Ae,e=a[2],k+=e*d,L+=e*ce,G+=e*ge,I+=e*be,ye+=e*se,$+=e*ue,X+=e*xe,V+=e*Se,ne+=e*he,te+=e*we,Z+=e*ve,J+=e*_e,Q+=e*Ee,P+=e*Me,W+=e*Le,T+=e*Ae,e=a[3],L+=e*d,G+=e*ce,I+=e*ge,ye+=e*be,$+=e*se,X+=e*ue,V+=e*xe,ne+=e*Se,te+=e*he,Z+=e*we,J+=e*ve,Q+=e*_e,P+=e*Ee,W+=e*Me,T+=e*Le,j+=e*Ae,e=a[4],G+=e*d,I+=e*ce,ye+=e*ge,$+=e*be,X+=e*se,V+=e*ue,ne+=e*xe,te+=e*Se,Z+=e*he,J+=e*we,Q+=e*ve,P+=e*_e,W+=e*Ee,T+=e*Me,j+=e*Le,F+=e*Ae,e=a[5],I+=e*d,ye+=e*ce,$+=e*ge,X+=e*be,V+=e*se,ne+=e*ue,te+=e*xe,Z+=e*Se,J+=e*he,Q+=e*we,P+=e*ve,W+=e*_e,T+=e*Ee,j+=e*Me,F+=e*Le,z+=e*Ae,e=a[6],ye+=e*d,$+=e*ce,X+=e*ge,V+=e*be,ne+=e*se,te+=e*ue,Z+=e*xe,J+=e*Se,Q+=e*he,P+=e*we,W+=e*ve,T+=e*_e,j+=e*Ee,F+=e*Me,z+=e*Le,w+=e*Ae,e=a[7],$+=e*d,X+=e*ce,V+=e*ge,ne+=e*be,te+=e*se,Z+=e*ue,J+=e*xe,Q+=e*Se,P+=e*he,W+=e*we,T+=e*ve,j+=e*_e,F+=e*Ee,z+=e*Me,w+=e*Le,v+=e*Ae,e=a[8],X+=e*d,V+=e*ce,ne+=e*ge,te+=e*be,Z+=e*se,J+=e*ue,Q+=e*xe,P+=e*Se,W+=e*he,T+=e*we,j+=e*ve,F+=e*_e,z+=e*Ee,w+=e*Me,v+=e*Le,E+=e*Ae,e=a[9],V+=e*d,ne+=e*ce,te+=e*ge,Z+=e*be,J+=e*se,Q+=e*ue,P+=e*xe,W+=e*Se,T+=e*he,j+=e*we,F+=e*ve,z+=e*_e,w+=e*Ee,v+=e*Me,E+=e*Le,S+=e*Ae,e=a[10],ne+=e*d,te+=e*ce,Z+=e*ge,J+=e*be,Q+=e*se,P+=e*ue,W+=e*xe,T+=e*Se,j+=e*he,F+=e*we,z+=e*ve,w+=e*_e,v+=e*Ee,E+=e*Me,S+=e*Le,C+=e*Ae,e=a[11],te+=e*d,Z+=e*ce,J+=e*ge,Q+=e*be,P+=e*se,W+=e*ue,T+=e*xe,j+=e*Se,F+=e*he,z+=e*we,w+=e*ve,v+=e*_e,E+=e*Ee,S+=e*Me,C+=e*Le,M+=e*Ae,e=a[12],Z+=e*d,J+=e*ce,Q+=e*ge,P+=e*be,W+=e*se,T+=e*ue,j+=e*xe,F+=e*Se,z+=e*he,w+=e*we,v+=e*ve,E+=e*_e,S+=e*Ee,C+=e*Me,M+=e*Le,q+=e*Ae,e=a[13],J+=e*d,Q+=e*ce,P+=e*ge,W+=e*be,T+=e*se,j+=e*ue,F+=e*xe,z+=e*Se,w+=e*he,v+=e*we,E+=e*ve,S+=e*_e,C+=e*Ee,M+=e*Me,q+=e*Le,re+=e*Ae,e=a[14],Q+=e*d,P+=e*ce,W+=e*ge,T+=e*be,j+=e*se,F+=e*ue,z+=e*xe,w+=e*Se,v+=e*he,E+=e*we,S+=e*ve,C+=e*_e,M+=e*Ee,q+=e*Me,re+=e*Le,ae+=e*Ae,e=a[15],P+=e*d,W+=e*ce,T+=e*ge,j+=e*be,F+=e*se,z+=e*ue,w+=e*xe,v+=e*Se,E+=e*he,S+=e*we,C+=e*ve,M+=e*_e,q+=e*Ee,re+=e*Me,ae+=e*Le,oe+=e*Ae,g+=38*W,m+=38*T,k+=38*j,L+=38*F,G+=38*z,I+=38*w,ye+=38*v,$+=38*E,X+=38*S,V+=38*C,ne+=38*M,te+=38*q,Z+=38*re,J+=38*ae,Q+=38*oe,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=I+s+65535,s=Math.floor(e/65536),I=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=I+s+65535,s=Math.floor(e/65536),I=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=m,r[2]=k,r[3]=L,r[4]=G,r[5]=I,r[6]=ye,r[7]=$,r[8]=X,r[9]=V,r[10]=ne,r[11]=te,r[12]=Z,r[13]=J,r[14]=Q,r[15]=P}function R(r,a){fe(r,a,a)}function D(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)R(i,i),e!==2&&e!==4&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)R(i,i),e!==1&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function O(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,m,k=o(),L=o(),G=o(),I=o(),ye=o(),$=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,He(s,i),m=0;m<16;m++)L[m]=s[m],I[m]=k[m]=G[m]=0;for(k[0]=I[0]=1,m=254;m>=0;--m)g=e[m>>>3]>>>(m&7)&1,qe(k,L,g),qe(G,I,g),$e(ye,k,G),Pe(k,k,G),$e(G,L,I),Pe(L,L,I),R(I,ye),R($,k),fe(k,G,k),fe(G,L,ye),$e(ye,k,G),Pe(k,k,G),R(L,k),Pe(G,I,$),fe(k,G,b),$e(k,k,I),fe(G,G,k),fe(k,I,$),fe(I,L,s),R(L,ye),qe(k,L,g),qe(G,I,g);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=G[m],s[m+48]=L[m],s[m+64]=I[m];var X=s.subarray(32),V=s.subarray(16);return D(X,X),fe(V,V,X),Qe(r,V),0}function ee(r,a){return O(r,a,f)}function me(r,a){return l(a,32),ee(r,a)}function ke(r,a,i){var e=new Uint8Array(32);return O(e,i,a),de(r,c,e,Ie)}var Ce=Te,gt=ut;function bn(r,a,i,e,s,g){var m=new Uint8Array(32);return ke(m,s,g),Ce(r,a,i,e,m)}function De(r,a,i,e,s,g){var m=new Uint8Array(32);return ke(m,s,g),gt(r,a,i,e,m)}var Je=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Vn(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),m,k,L,G,I,ye,$,X,V,ne,te,Z,J,Q,P,W,T,j,F,z,w,v,E,S,C,M,q=r[0],re=r[1],ae=r[2],oe=r[3],d=r[4],ce=r[5],ge=r[6],be=r[7],se=a[0],ue=a[1],xe=a[2],Se=a[3],he=a[4],we=a[5],ve=a[6],_e=a[7],Ee=0;e>=128;){for(F=0;F<16;F++)z=8*F+Ee,s[F]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],g[F]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(F=0;F<80;F++)if(m=q,k=re,L=ae,G=oe,I=d,ye=ce,$=ge,X=be,V=se,ne=ue,te=xe,Z=Se,J=he,Q=we,P=ve,W=_e,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(d>>>14|he<<18)^(d>>>18|he<<14)^(he>>>9|d<<23),v=(he>>>14|d<<18)^(he>>>18|d<<14)^(d>>>9|he<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=d&ce^~d&ge,v=he&we^~he&ve,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=Je[F*2],v=Je[F*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[F%16],v=g[F%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,T=C&65535|M<<16,j=E&65535|S<<16,w=T,v=j,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(q>>>28|se<<4)^(se>>>2|q<<30)^(se>>>7|q<<25),v=(se>>>28|q<<4)^(q>>>2|se<<30)^(q>>>7|se<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=q&re^q&ae^re&ae,v=se&ue^se&xe^ue&xe,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,X=C&65535|M<<16,W=E&65535|S<<16,w=G,v=Z,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=T,v=j,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,G=C&65535|M<<16,Z=E&65535|S<<16,re=m,ae=k,oe=L,d=G,ce=I,ge=ye,be=$,q=X,ue=V,xe=ne,Se=te,he=Z,we=J,ve=Q,_e=P,se=W,F%16===15)for(z=0;z<16;z++)w=s[z],v=g[z],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(z+9)%16],v=g[(z+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,T=s[(z+1)%16],j=g[(z+1)%16],w=(T>>>1|j<<31)^(T>>>8|j<<24)^T>>>7,v=(j>>>1|T<<31)^(j>>>8|T<<24)^(j>>>7|T<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,T=s[(z+14)%16],j=g[(z+14)%16],w=(T>>>19|j<<13)^(j>>>29|T<<3)^T>>>6,v=(j>>>19|T<<13)^(T>>>29|j<<3)^(j>>>6|T<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[z]=C&65535|M<<16,g[z]=E&65535|S<<16;w=q,v=se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[0]=q=C&65535|M<<16,a[0]=se=E&65535|S<<16,w=re,v=ue,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[1]=re=C&65535|M<<16,a[1]=ue=E&65535|S<<16,w=ae,v=xe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[2]=ae=C&65535|M<<16,a[2]=xe=E&65535|S<<16,w=oe,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[3]=oe=C&65535|M<<16,a[3]=Se=E&65535|S<<16,w=d,v=he,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[4]=d=C&65535|M<<16,a[4]=he=E&65535|S<<16,w=ce,v=we,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[5]=ce=C&65535|M<<16,a[5]=we=E&65535|S<<16,w=ge,v=ve,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[6]=ge=C&65535|M<<16,a[6]=ve=E&65535|S<<16,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[7]=be=C&65535|M<<16,a[7]=_e=E&65535|S<<16,Ee+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Vn(e,s,a,i),i%=128,m=0;m<i;m++)g[m]=a[k-i+m];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,U(g,i-8,k/536870912|0,k<<3),Vn(e,s,g,i),m=0;m<8;m++)U(r,8*m,e[m],s[m]);return 0}function Kt(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o(),G=o(),I=o();Pe(i,r[1],r[0]),Pe(I,a[1],a[0]),fe(i,i,I),$e(e,r[0],r[1]),$e(I,a[0],a[1]),fe(e,e,I),fe(s,r[3],a[3]),fe(s,s,h),fe(g,r[2],a[2]),$e(g,g,g),Pe(m,e,i),Pe(k,g,s),$e(L,g,s),$e(G,e,i),fe(r[0],m,k),fe(r[1],G,L),fe(r[2],L,k),fe(r[3],m,G)}function Zn(r,a,i){var e;for(e=0;e<4;e++)qe(r[e],a[e],i)}function hn(r,a){var i=o(),e=o(),s=o();D(s,a[2]),fe(i,a[0],s),fe(e,a[1],s),Qe(r,e),r[31]^=yt(i)<<7}function mn(r,a,i){var e,s;for(Ue(r[0],u),Ue(r[1],p),Ue(r[2],p),Ue(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Zn(r,a,e),Kt(a,r),Kt(r,r),Zn(r,a,e)}function Xt(r,a){var i=[o(),o(),o(),o()];Ue(i[0],y),Ue(i[1],_),Ue(i[2],p),fe(i[3],y,_),mn(r,i,a)}function wn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Xt(s,e),hn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Vt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function vn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Vt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Vt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Vt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function _n(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;vn(r,a)}function Qn(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),m=new Uint8Array(64),k,L,G=new Float64Array(64),I=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ye=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(lt(m,r.subarray(32),i+32),_n(m),Xt(I,m),hn(r,I),k=32;k<64;k++)r[k]=e[k];for(lt(g,r,i+64),_n(g),k=0;k<64;k++)G[k]=0;for(k=0;k<32;k++)G[k]=m[k];for(k=0;k<32;k++)for(L=0;L<32;L++)G[k+L]+=g[k]*s[L];return vn(r.subarray(32),G),ye}function eo(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o();return Ue(r[2],p),He(r[1],a),R(s,r[1]),fe(g,s,x),Pe(s,s,r[2]),$e(g,r[2],g),R(m,g),R(k,m),fe(L,k,m),fe(i,L,s),fe(i,i,g),Y(i,i),fe(i,i,s),fe(i,i,g),fe(i,i,g),fe(r[0],i,g),R(e,r[0]),fe(e,e,g),zt(e,s)&&fe(r[0],r[0],B),R(e,r[0]),fe(e,e,g),zt(e,s)?-1:(yt(r[0])===a[31]>>7&&Pe(r[0],u,r[0]),fe(r[3],r[0],r[1]),0)}function Sn(r,a,i,e){var s,g=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||eo(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(m,r,i),_n(m),mn(k,L,m),Xt(L,a.subarray(32)),Kt(k,L),hn(g,k),i-=64,K(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var kn=32,Zt=24,Nt=32,bt=16,It=32,Qt=32,Tt=32,$t=32,Cn=32,Jn=Zt,to=Nt,no=bt,Ke=64,ct=32,ht=64,En=32,Mn=64;n.lowlevel={crypto_core_hsalsa20:de,crypto_stream_xor:it,crypto_stream:Re,crypto_stream_salsa20_xor:ot,crypto_stream_salsa20:We,crypto_onetimeauth:Bt,crypto_onetimeauth_verify:st,crypto_verify_16:N,crypto_verify_32:K,crypto_secretbox:Te,crypto_secretbox_open:ut,crypto_scalarmult:O,crypto_scalarmult_base:ee,crypto_box_beforenm:ke,crypto_box_afternm:Ce,crypto_box:bn,crypto_box_open:De,crypto_box_keypair:me,crypto_hash:lt,crypto_sign:Qn,crypto_sign_keypair:wn,crypto_sign_open:Sn,crypto_secretbox_KEYBYTES:kn,crypto_secretbox_NONCEBYTES:Zt,crypto_secretbox_ZEROBYTES:Nt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:It,crypto_scalarmult_SCALARBYTES:Qt,crypto_box_PUBLICKEYBYTES:Tt,crypto_box_SECRETKEYBYTES:$t,crypto_box_BEFORENMBYTES:Cn,crypto_box_NONCEBYTES:Jn,crypto_box_ZEROBYTES:to,crypto_box_BOXZEROBYTES:no,crypto_sign_BYTES:Ke,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:ht,crypto_sign_SEEDBYTES:En,crypto_hash_BYTES:Mn,gf:o,D:x,L:Vt,pack25519:Qe,unpack25519:He,M:fe,A:$e,S:R,Z:Pe,pow2523:Y,add:Kt,set25519:Ue,modL:vn,scalarmult:mn,scalarbase:Xt};function er(r,a){if(r.length!==kn)throw new Error("bad key size");if(a.length!==Zt)throw new Error("bad nonce size")}function ro(r,a){if(r.length!==Tt)throw new Error("bad public key size");if(a.length!==$t)throw new Error("bad secret key size")}function je(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function tr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){je(r,a,i),er(i,a);for(var e=new Uint8Array(Nt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+Nt]=r[g];return Te(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){je(r,a,i),er(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+bt]=r[g];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(Nt)},n.secretbox.keyLength=kn,n.secretbox.nonceLength=Zt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if(je(r,a),r.length!==Qt)throw new Error("bad n size");if(a.length!==It)throw new Error("bad p size");var i=new Uint8Array(It);return O(i,r,a),i},n.scalarMult.base=function(r){if(je(r),r.length!==Qt)throw new Error("bad n size");var a=new Uint8Array(It);return ee(a,r),a},n.scalarMult.scalarLength=Qt,n.scalarMult.groupElementLength=It,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){je(r,a),ro(r,a);var i=new Uint8Array(Cn);return ke(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Tt),a=new Uint8Array($t);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(je(r),r.length!==$t)throw new Error("bad secret key size");var a=new Uint8Array(Tt);return ee(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Tt,n.box.secretKeyLength=$t,n.box.sharedKeyLength=Cn,n.box.nonceLength=Jn,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(je(r,a),a.length!==ht)throw new Error("bad secret key size");var i=new Uint8Array(Ke+r.length);return Qn(i,r,r.length,a),i},n.sign.open=function(r,a){if(je(r,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=Sn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ke),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(je(r,a,i),a.length!==Ke)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(Ke+r.length),s=new Uint8Array(Ke+r.length),g;for(g=0;g<Ke;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+Ke]=r[g];return Sn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ct),a=new Uint8Array(ht);return wn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(je(r),r.length!==ht)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(je(r),r.length!==En)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(ht),e=0;e<32;e++)i[e]=r[e];return wn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=ht,n.sign.seedLength=En,n.sign.signatureLength=Ke,n.hash=function(r){je(r);var a=new Uint8Array(Mn);return lt(a,r,r.length),a},n.hash.hashLength=Mn,n.verify=function(r,a){return je(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];tr(g)})}else typeof Vi<"u"&&(r=Ji,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];tr(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Tn)),Tn.exports}var ta=ea();const na=Ki(ta);function ra(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const h=t.charAt(x),y=h.charCodeAt(0);if(n[y]!==255)throw new TypeError(h+" is ambiguous");n[y]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),f=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let h=0,y=0,_=0;const B=x.length;for(;_!==B&&x[_]===0;)_++,h++;const U=(B-_)*f+1>>>0,A=new Uint8Array(U);for(;_!==B;){let ie=x[_],pe=0;for(let le=U-1;(ie!==0||pe<y)&&le!==-1;le--,pe++)ie+=256*A[le]>>>0,A[le]=ie%o>>>0,ie=ie/o>>>0;if(ie!==0)throw new Error("Non-zero carry");y=pe,_++}let N=U-y;for(;N!==U&&A[N]===0;)N++;let K=l.repeat(h);for(;N<U;++N)K+=t.charAt(A[N]);return K}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let h=0,y=0,_=0;for(;x[h]===l;)y++,h++;const B=(x.length-h)*c+1>>>0,U=new Uint8Array(B);for(;h<x.length;){const ie=x.charCodeAt(h);if(ie>255)return;let pe=n[ie];if(pe===255)return;let le=0;for(let de=B-1;(pe!==0||le<_)&&de!==-1;de--,le++)pe+=o*U[de]>>>0,U[de]=pe%256>>>0,pe=pe/256>>>0;if(pe!==0)throw new Error("Non-zero carry");_=le,h++}let A=B-_;for(;A!==B&&U[A]===0;)A++;const N=new Uint8Array(y+(B-A));let K=y;for(;A!==B;)N[K++]=U[A++];return N}function b(x){const h=p(x);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:b}}var oa="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const dr=ra(oa),Kn="cbsgo_wallet_v3",yn="cbsgo_wallet_unlocked_v3";function Ht(){try{const t=localStorage.getItem(Kn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function ia(t){localStorage.setItem(Kn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function aa(){const t=na.sign.keyPair(),n=dr.encode(t.publicKey),o=dr.encode(t.secretKey);return{pk:n,sk:o}}function Dr(){return!!Ht()}function sa(){return Ht()?sessionStorage.getItem(yn)==="1":!1}function la(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");Ht()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=aa();return ia({pk:l,sk:c,pin:n}),sessionStorage.setItem(yn,"1"),l}function ca(t){const n=Ht();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(yn,"1"),n.pk}function Ye(){const t=Ht();return t?t.pk:""}function fa(){localStorage.removeItem(Kn),sessionStorage.removeItem(yn)}typeof window<"u"&&(window.cbsgoDevResetWallet=fa);const Yr="cbsgoLoginModal";function qr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Hr(){const t=document.getElementById(Yr);t&&t.remove()}function da(t){Hr();const n=document.createElement("div");return n.id=Yr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function pa(t,n){return`
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
      ">${qr(t)}</div>

      <div style="padding:14px 16px;">
        ${n}
      </div>
    </div>
  `}function Jt(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function pr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ua(){const t=!Dr();let n="";try{const h=At();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${qr(n)}" style="${Jt()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Jt()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${Jt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${pr(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Jt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${pr(!0)}">Unlock</button>
      </div>
    `,l=da(pa(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),f=h=>{c&&(c.textContent=h||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),b=l.querySelector("#cbsgoNick"),x=()=>{Hr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const y=String(b?.value||"").trim(),_=String(u?.value||"").trim(),B=String(p?.value||"").trim();if(y.length<2)return f("⛔ Nickname too short.");if(_.length<4)return f("⛔ PIN must be at least 4 digits.");if(_!==B)return f("⛔ PINs do not match.");f("Creating wallet…"),jr(y),await la(_),f("✅ Wallet created. Starting…"),x()}catch(y){f(`⛔ ${String(y?.message||y)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return f("⛔ PIN must be at least 4 digits.");f("Unlocking…"),await ca(y),f("✅ Unlocked."),x()}catch{f("⛔ Wrong PIN (or wallet data missing).")}})}}const xa="https://cxfedvowjgkqrakkkjpi.supabase.co",ya="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Oe=oo(xa,ya);function ga(){const t=Ye();if(!t)return null;const n=At(),o=Wt();return{wallet_pk:t,nickname:n,avatar:o}}async function on(t={}){try{const n=ga();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Oe.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ba=15e3,ha=1e4,ma=300*1e3;let Ot=null,ur=0,xr=0;function wa(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Ot={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",wa));async function va(){const t=Ye();if(!t||!Ot)return;const n=Date.now();if(n-ur<5e3)return;ur=n;const l=(At()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Ot.lat,lng:Ot.lng,heading:Ot.heading,last_seen:new Date().toISOString()};try{const{data:f,error:u}=await Oe.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(f&&f.length>0){const p=f[0].id,{error:b}=await Oe.from("player_state").update(c).eq("id",p);b&&console.warn("CBS GO: player_state update failed",b)}else{const{error:p}=await Oe.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(f){console.warn("CBS GO: pushMyState error",f)}}async function _a(){const t=Ye();if(!t)return;const n=Date.now();if(n-xr<3e3)return;xr=n;const o=new Date(Date.now()-ma).toISOString();try{const{data:l,error:c}=await Oe.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const f=Array.isArray(l)?l:[],u=Array.from(new Set(f.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:h}=await Oe.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const b=f.map(x=>{const h=x.lat,y=x.lng,_=typeof h=="number"?h:parseFloat(h),B=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite(B))return null;const U=p.get(x.wallet_pk)||null,A=U&&U.nickname||x.nickname||"Anon",N=U&&U.avatar?String(U.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:N,lat:_,lng:B,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:b}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function Sa(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{va()},ba),setInterval(()=>{_a()},ha))}Sa();function Kr(){const t=Ye();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function cn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function ka(t){const n=Kr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Oe.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw cn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function Ca(t){const n=Kr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await Oe.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw cn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Ea(){const t=Ye();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Oe.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw cn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],f=[];for(const p of l){const b=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!b&&!x)continue;const h=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:h,nickname:null,avatar:""};b&&c.push(y),x&&f.push(y)}const u=Array.from(new Set([...c,...f].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:b}=await Oe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!b&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const h=y=>{y.forEach(_=>{const B=x.get(_.otherWallet);B&&(_.nickname=B.nickname||null,_.avatar=B.avatar||"")})};h(c),h(f)}else b&&cn("loadFriendsOverview:players",b)}return{incoming:c,accepted:f}}let Ut=null;async function Xr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Ut=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Ut.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Ma(){try{Ut&&(await Ut.release(),Ut=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function La(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Xr():await Ma()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function Aa(){const t=Ye();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Ba(t){return String(t||"").trim()}async function Vr(t,n={}){const o=Aa(),l=Ba(t),c=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),f=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0))),u=n.cardId?String(n.cardId||"").trim():"",p=Math.max(0,Math.floor(Number(n.cardQty!=null?n.cardQty:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!c&&!f&&!p)throw new Error("Set tickets, CBS and/or cards above 0.");if(p>0&&!u)throw new Error("Select a card to send.");if(c>0&&Mr()<c)throw new Error("Not enough tickets in your bag.");if(f>0&&Lr()<f)throw new Error("Not enough CBS (play money) in your bag.");if(p>0&&_o(u)<p)throw new Error("Not enough of that card in your collection.");let b=0,x=0,h=null,y=0;try{c>0&&(mo(c),b=c),f>0&&(wo(f),x=f),p>0&&u&&(So(u,p),h=u,y=p);const{error:_}=await Oe.from("trades").insert({from_wallet:o,to_wallet:l,tickets:c||0,cbs:f||0,card_id:u||null,card_qty:p||null,status:"sent"});if(_)throw b>0&&Lt(b),x>0&&un(x),h&&y>0&&Ar(h,y),console.warn("CBS GO sendGiftToWallet Supabase error",_),new Error(_.message||"Could not save gift to Supabase (permissions or network issue).");if(typeof window<"u")try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftSent",{detail:{toWallet:l,tickets:c,cbs:f,cardId:u||null,cardQty:p||0}}))}catch(B){console.warn("CBS GO: dispatch friendGiftSent failed",B)}return{ok:!0}}catch(_){throw _ instanceof Error?_:new Error(String(_?.message||_)||"Failed to send gift.")}}async function fn(){const t=Ye();if(t)try{const{data:n,error:o}=await Oe.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const f=Array.from(new Set(n.map(u=>u&&u.from_wallet).filter(u=>typeof u=="string"&&u.trim().length>0)));if(f.length>0){const{data:u,error:p}=await Oe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",f);!p&&Array.isArray(u)?l=new Map(u.filter(b=>b&&b.wallet_pk).map(b=>[String(b.wallet_pk),{nickname:b.nickname||null,avatar:b.avatar||""}])):p&&console.warn("CBS GO pullIncomingGifts players error",p)}}catch(f){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",f)}const c=[];for(const f of n){if(!f)continue;const u=Number(f.tickets||0),p=Number(f.cbs||0),b=f.card_id?String(f.card_id||"").trim():"",x=Math.max(0,Number(f.card_qty||0));if(u>0&&Lt(u),p>0&&un(p),b&&x>0&&Ar(b,x),(u>0||p>0||b&&x>0)&&typeof window<"u"){const h=l.get(f.from_wallet)||{nickname:null,avatar:""},y={id:f.id||null,fromWallet:f.from_wallet||"",toWallet:f.to_wallet||"",tickets:u,cbs:p,cardId:b||null,cardQty:x||0,createdAt:f.created_at||null,senderNickname:h.nickname||null,senderAvatar:h.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:y}))}catch(_){console.warn("CBS GO: dispatch friendGiftReceived failed",_)}}f.id&&c.push(f.id)}if(c.length>0){const{error:f}=await Oe.from("trades").update({status:"claimed"}).in("id",c);f&&console.warn("CBS GO pullIncomingGifts update status error",f)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0,l=null,c=0)=>Vr(t,{tickets:n,cbs:o,cardId:l,cardQty:c}),window.cbsgoPullGifts=fn);function Be(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Xn(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const za="cbsgo_cards_v1";function Na(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Ia(){const t=localStorage.getItem(za),n=Na(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}const Ta=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function $a(){const t=Ia();let n=0,o=0;const l=[];for(const c of Ta){const f=Number(t[c.id]||0);Number.isFinite(f)&&f>0&&(n+=1,o+=f,l.push({id:c.id,count:f,label:c.label}))}return{cardTypes:n,cardTotal:o,sendable:l}}function gn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Fn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function yr(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${Be(t)}</div>
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
  `}function Pa(){const t=At(),n=Wt(),o=Ye();return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
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
        ${Xn(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Be(t)}" maxlength="24" style="
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
                    ${Be(o)}
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
  `}function Oa(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const N=document.querySelector("#profileMsg");N&&(N.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const f=()=>{if(!t)return;const A=jr(t.value);c(`✅ Name saved: ${A}`);try{on()}catch(N){console.warn("CBS GO: failed to sync profile after name change",N)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(f,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),f()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const N=new FileReader;N.onload=()=>{ii(String(N.result||"")),c("✅ Photo saved"),Et();try{on()}catch(K){console.warn("CBS GO: failed to sync profile after avatar change",K)}},N.onerror=()=>c("⛔ Failed to read image."),N.readAsDataURL(A)}),o&&(o.onclick=()=>{ai(),c("✅ Photo removed"),Et();try{on()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),b=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),h=document.querySelector("#friendsAcceptedList"),y=A=>{b&&(b.textContent=A||"")},_=A=>{if(!A)return"";const N=String(A);return N.length<=12?N:`${N.slice(0,5)}…${N.slice(-4)}`},B=(A,N="")=>{const K=A.nickname&&A.nickname.trim()?A.nickname.trim():_(A.otherWallet),ie=_(A.otherWallet);return`
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
          ${Xn(A.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Be(K||"Friend")}
            </div>
            ${ie?`<div style="font-size:11px;opacity:.7;">${Be(ie)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${N||""}
        </div>
      </div>
    `};async function U(){if(!(!x||!h))try{x.textContent="Loading…",h.textContent="Loading…";const A=await Ea();A.incoming.length?x.innerHTML=A.incoming.map(N=>{const K=`
              <div style="display:flex;gap:6px;align-items:center;">
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${N.otherWallet}"
                  style="
                    padding:3px 7px;
                    border-radius:999px;
                    border:1px solid rgba(148,163,184,.8);
                    background:rgba(15,23,42,.9);
                    color:#e5e7eb;
                    font-size:10px;
                    cursor:pointer;
                  "
                >
                  Copy
                </button>
                <button
                  type="button"
                  class="friendAcceptBtn"
                  data-friend-id="${N.id}"
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
              </div>
            `;return B(N,K)}).join(""):x.textContent="No incoming requests.",A.accepted.length?h.innerHTML=A.accepted.map(N=>{const K=`
              <div style="display:flex;gap:6px;align-items:center;">
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
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${N.otherWallet}"
                  style="
                    padding:3px 7px;
                    border-radius:999px;
                    border:1px solid rgba(148,163,184,.8);
                    background:rgba(15,23,42,.9);
                    color:#e5e7eb;
                    font-size:10px;
                    cursor:pointer;
                  "
                >
                  Copy
                </button>
              </div>
            `;return B(N,K)}).join(""):h.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(N=>{N.addEventListener("click",async()=>{const K=N.getAttribute("data-friend-id");if(K){y("Accepting friend…"),N.disabled=!0;try{await Ca(K),y("✅ Friend added."),await U()}catch(ie){console.warn(ie),y(`⛔ ${ie.message||ie}`),N.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(N=>{N.addEventListener("click",async()=>{const K=N.getAttribute("data-wallet")||"";if(K)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(K),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(ie){console.warn("CBS GO: copy friend wallet failed",ie),y("⛔ Could not copy wallet address.")}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",h.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){y("Enter a wallet address first.");return}y("Sending friend request…"),p.disabled=!0;try{await ka(A),y("✅ Friend request sent."),u.value="",await U()}catch(N){console.warn(N),y(`⛔ ${N.message||N}`)}finally{p.disabled=!1}}),U().catch(()=>{})}function ja(){const t=Mr(),n=Lr(),o=Ye(),{cardTypes:l,cardTotal:c,sendable:f}=$a(),u=c>0?`You own ${c} cards (${l} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",b=f.length>0?`
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <div style="flex:1;min-width:140px;">
          <label for="giftCardSelect" style="font-size:11px;opacity:.8;">Card (optional)</label>
          <select id="giftCardSelect" style="
            margin-top:4px;
            width:100%;
            padding:7px 9px;
            border-radius:10px;
            border:1px solid rgba(148,163,184,.7);
            background:rgba(15,23,42,.95);
            color:#fff;
            font-size:12px;
          ">
            <option value="">No card</option>
            ${f.map(x=>`<option value="${Be(x.id)}">${Be(x.label||x.id)} (x${x.count})</option>`).join("")}
          </select>
        </div>
        <div style="width:80px;">
          <label for="giftCardQtyInput" style="font-size:11px;opacity:.8;">Qty</label>
          <input id="giftCardQtyInput" type="number" min="0" step="1" placeholder="0" style="
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
    `:`
      <div style="font-size:11px;opacity:.7;margin-top:4px;">
        You don’t have any cards yet to send.
      </div>
    `;return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
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
                ${Be(o)}
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
              Walking & CBS cards you collect on your journey. You can also send some to friends as gifts.
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
        <div style="font-size:11px;opacity:.8;margin-top:6px;">
          ${Be(u)}
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
              Send tickets, CBS (play money) and optional cards to another CBS-GO wallet. Off-chain via Supabase.
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

          ${b}

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
  `}function Ra(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Hi()}catch(B){console.warn("CBS GO: openCardsPanel failed",B)}});const l=Ye(),c=document.querySelector("#giftWalletInput"),f=document.querySelector("#giftTicketsInput"),u=document.querySelector("#giftCbsInput"),p=document.querySelector("#giftCardSelect"),b=document.querySelector("#giftCardQtyInput"),x=document.querySelector("#giftSendBtn"),h=document.querySelector("#giftMsg"),y=B=>{h&&(h.textContent=B||"")};if(x&&c&&x.addEventListener("click",async()=>{const B=c.value.trim(),U=f?.value??"",A=u?.value??"",N=p?p.value.trim():"",K=b?.value??"",ie=Number(K||"0"),pe=Number(U||"0"),le=Number(A||"0");if(!B){y("Enter a wallet address first.");return}if((!pe||pe<=0)&&(!le||le<=0)&&!N){y("Set tickets and/or CBS above 0, or choose a card.");return}if(N&&(!ie||ie<=0)){y("Set card quantity above 0.");return}x.disabled=!0,y("Sending gift…");try{await Vr(B,{tickets:pe,cbs:le,cardId:N||null,cardQty:N?ie:0}),y("✅ Gift sent."),f&&(f.value=""),u&&(u.value=""),b&&(b.value=""),p&&(p.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:B,tickets:pe,cbs:le,cardId:N||null,cardQty:N?ie:0}}))}catch(de){console.warn(de),y(`⛔ ${de.message||"Could not send gift."}`)}finally{x.disabled=!1}}),!t||!l){fn().catch(()=>{});return}const _=B=>{n&&(n.textContent=B||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),_("✅ Wallet address copied to clipboard.")):_("📋 Copy not supported in this browser.")}catch{_("⛔ Failed to copy address.")}},fn().catch(()=>{})}function Zr(){const t=gn();return t==="profile"?yr("Profile",`<div id="profileMount">${Pa()}</div>`):t==="bag"?yr("Bag",`<div id="bagMount">${ja()}</div>`):""}function Ua(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Oi()}
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
          ${$r()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px;
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

      <!-- Panel-root -->
      <div id="panelRoot">
        ${Zr()}
      </div>

      <!-- Toast -->
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

      <!-- Loot / trade overlay -->
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Zr();const n=gn();n==="profile"&&Oa(),n==="bag"&&Ra();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Fn("map"),Et()})}function Fa(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=gn();Fn(o===n?"map":n||"map"),Et()})})}function gr(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:c,toWallet:f,tickets:u=0,cbs:p=0,cardId:b=null,cardQty:x=0}=t||{};if(!u&&!p&&!(b&&x))return;n.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.78)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=At();Wt();const B=o==="sent"?"Gift sent":"You received a gift",U=[];u&&U.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&U.push(`🪙 ${p} CBS`),b&&x&&U.push(`🃏 ${x} card${x===1?"":"s"}`);const A=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${Be(_)}</b> to <span style="opacity:.9;">${Be(f||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${Be(l||"Friend")}</b>
        </div>
      `,N=o==="sent"?Wt():c||"",K=Xn(N||"",40);y.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${K}
      <div>
        <div style="font-size:15px;font-weight:800;">${Be(B)}</div>
        ${A}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${Be(U.join(" · "))}
    </div>
    <div style="font-size:11px;opacity:.78;margin-bottom:10px;">
      Gifts are added to your Bag. Later you can also send and trade cards with friends.
    </div>
    <button type="button" id="cbsgoTradePopupCloseBtn" style="
      padding:8px 14px;
      border-radius:999px;
      border:1px solid rgba(148,163,184,.9);
      background:rgba(15,23,42,.96);
      color:#e5e7eb;
      font-size:12px;
      font-weight:600;
      cursor:pointer;
      margin-top:2px;
    ">
      Okay
    </button>
  `,h.appendChild(y),n.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const ie=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},pe=document.getElementById("cbsgoTradePopupCloseBtn");pe&&(pe.onclick=ie),h.addEventListener("click",le=>{le.target===h&&ie()})}function br(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ua();try{Xr(),La()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{on()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Fa(),Fi(),ri(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=$r())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Tr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{gn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let b=p.querySelector(".cbsgoToastBox");b||(b=document.createElement("div"),b.className="cbsgoToastBox",b.style.pointerEvents="auto",b.style.padding="8px 12px",b.style.borderRadius="999px",b.style.border="1px solid rgba(255,255,255,.25)",b.style.background="rgba(10,12,18,.88)",b.style.backdropFilter="blur(10px)",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.fontSize="11px",b.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",b.style.opacity="0",b.style.transform="translateY(10px)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(b)),b.textContent=u||"",b.style.opacity="1",b.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{b.style.opacity="0",b.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},b=Number(p.xp||0),x=Number(p.tickets||0),h=Number(p.cbs||0);if(!b&&!x&&!h)return;const y=[];b&&y.push(`+${b} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),h&&y.push(`+${h} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.steps||0),x=Number(u?.goal||0),h=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const B=x?`${b}/${x} steps`:`${b} steps`;_.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${h?` (${h})`:""}.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#7dd3fc;
      ">
        ${B}
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const U=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=U),y.addEventListener("click",N=>{N.target===y&&U()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const b=Number(u?.xp||0),x=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!b&&!x&&!h)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const B=[];b&&B.push(`+${b} XP`),x&&B.push(`+${x} ticket${x===1?"":"s"}`),h&&B.push(`+${h} CBS`),_.innerHTML=`
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
        ${Be(B.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function f(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.days||7),x=Number(u?.rewardCbs||0),h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.80)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(340px, 92vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(251,191,36,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",y.style.padding="20px 18px 16px 18px",y.style.textAlign="center",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",y.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${b}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${b} days in a row.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#facc15;
      ">
        +${x} CBS (play money)
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
    `,h.appendChild(y),p.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},B=document.getElementById("cbsgoStreakCloseBtn");B&&(B.onclick=_),h.addEventListener("click",U=>{U.target===h&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{f(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{gr(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{};gr({direction:"received",fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0})})),Et(),Pr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",oi)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Pn({id:"__daily__",name:"Daily Glow"});return}if(Sr(p))return;const b=po.find(x=>x.id===p);b&&Pn(b)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&so(async()=>{const{completeNode:b}=await Promise.resolve().then(()=>yo);return{completeNode:b}},void 0).then(({completeNode:b})=>{b(p),Qr()})})),fn().catch(()=>{})}function Qr(){if(!document.querySelector("#app"))return;if(Dr()&&sa()){br();return}ua();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),br()};window.addEventListener("cbsgo:loginDone",n)}function Jr(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function dn(t){const n=Jr();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";dn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{dn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function hr(){try{if(!document.getElementById("app")){dn("❌ #app not found in index.html");return}Qr();const n=Jr();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){dn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hr,{once:!0}):hr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
