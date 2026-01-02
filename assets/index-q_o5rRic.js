import{createClient as no}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(c){if(c.ep)return;c.ep=!0;const d=o(c);fetch(c.href,d)}})();const ro="modulepreload",oo=function(t){return"/cbs-go/"+t},tr={},io=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let b=function(x){return Promise.all(x.map(m=>Promise.resolve(m).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=b(o.map(x=>{if(x=oo(x),x in tr)return;tr[x]=!0;const m=x.endsWith(".css"),h=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${h}`))return;const S=document.createElement("link");if(S.rel=m?"stylesheet":ro,m||(S.as="script"),S.crossOrigin="",S.href=x,p&&S.setAttribute("nonce",p),document.head.appendChild(S),m)return new Promise((O,G)=>{S.addEventListener("load",O),S.addEventListener("error",()=>G(new Error(`Unable to preload CSS for ${x}`)))})}))}function d(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&d(p.reason);return n().catch(d)})},Tn="cbsgoLevelUpOverlay",nr="cbsgoLevelUpStyles",En="https://smitskecbs.github.io/cbs-go/";function ao(){if(document.getElementById(nr))return;const t=document.createElement("style");t.id=nr,t.textContent=`
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
  `,document.head.appendChild(t)}function Mn(){const t=document.getElementById(Tn);t&&t.remove()}function so(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const d=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${d}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function rr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function lo(t){ao(),Mn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=Tn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${rr(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${rr(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&so(c);const d=()=>Mn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),b=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),m=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=d),p&&(p.onclick=d),b&&(b.onclick=()=>{const h=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${En}`,S=`https://twitter.com/intent/tweet?text=${encodeURIComponent(h)}`;window.open(S,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(En),m&&(m.textContent="✅ Link copied. Share it with your friends.")}catch{m&&(m.textContent="Could not copy link. You can share it manually: "+En)}}),setTimeout(()=>{document.getElementById(Tn)&&Mn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{lo(t?.detail||{})}));const fo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],br="cbsgo_state_v6";function co(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function po(){return{xp:0,completed:{},updatedAt:Date.now()}}function Rt(){const t=localStorage.getItem(br);return co(t,po())}function hr(t){t.updatedAt=Date.now(),localStorage.setItem(br,JSON.stringify(t))}function Un(t){return 100+(Math.max(1,Number(t||1))-1)*40}function fn(){return Number(Rt().xp||0)}function Ut(){const t=fn();let n=1,o=t;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function mr(){const t=fn();let n=1,o=t;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function wr(){return Un(Ut())}function Gt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Rt();const o=Ut(),l=Rt();l.xp=Number(l.xp||0)+n,hr(l);const c=Ut();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function vr(t){const n=String(t||"");if(!n)return!1;const o=Rt();return!!(o.completed&&o.completed[n])}function _r(t){const n=String(t||"");if(!n)return;const o=Rt();o.completed||(o.completed={}),o.completed[n]=Date.now(),hr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const uo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Gt,completeNode:_r,getLevel:Ut,getXp:fn,getXpIntoLevel:mr,getXpNeededThisLevel:wr,isNodeCompleted:vr},Symbol.toStringTag,{value:"Module"})),Sr="cbsgoPuzzleModal";function xo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ln(){const t=document.getElementById(Sr);t&&t.remove()}function In(t){Ln();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],d=180,u=18,p=l.length,b=.01;let x=[],m=null,h=0,S=u,O=!1,G=!1,A=null;const U=t?.name||"CBS GO Puzzle",ae=document.createElement("div");ae.id=Sr,ae.style.position="fixed",ae.style.inset="0",ae.style.zIndex="999999",ae.style.display="flex",ae.style.alignItems="center",ae.style.justifyContent="center",ae.style.padding="16px",ae.style.background="rgba(0,0,0,.70)",ae.style.backdropFilter="blur(12px)",ae.style.fontFamily="system-ui, sans-serif",ae.style.color="#fff",ae.innerHTML=`
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
          ${xo(U)}
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
          <div>Target: <span id="cbsgoTargetScore">${d}</span></div>
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
  `,document.body.appendChild(ae);const ye=document.getElementById("cbsgoBoard"),he=document.getElementById("cbsgoScore"),ge=document.getElementById("cbsgoMoves"),fe=document.getElementById("cbsgoStatus"),Be=document.getElementById("cbsgoPuzzleClose"),rt=document.getElementById("cbsgoPuzzleOk"),Fe=document.getElementById("cbsgoConfettiLayer");function Oe(j){fe&&(fe.textContent=j||"")}function ot(){if(!Fe)return;Fe.style.display="block",Fe.innerHTML="";const j=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],D=40;for(let Y=0;Y<D;Y++){const P=document.createElement("div"),Q=6+Math.floor(Math.random()*6),me=Math.random()*100,ke=Math.random()*.6,Ce=1+Math.random()*.6,yt=Math.random()*360;P.style.position="absolute",P.style.top="-10%",P.style.left=`${me}%`,P.style.width=`${Q}px`,P.style.height=`${Q*2}px`,P.style.background=j[Y%j.length],P.style.opacity="0.9",P.style.borderRadius="2px",P.style.transform=`rotate(${yt}deg)`,P.style.animation=`cbsgoConfettiFall ${Ce}s ease-out ${ke}s forwards`,Fe.appendChild(P)}}function it(){return Math.floor(Math.random()*l.length)}function Lt(){x=[];for(let j=0;j<n;j++){const D=[];for(let Y=0;Y<o;Y++)Math.random()<b?D.push(p):D.push(it());x.push(D)}}function at(j){return j===p}function Ne(){if(ye){ye.innerHTML="";for(let j=0;j<n;j++)for(let D=0;D<o;D++){const Y=x[j][D],P=document.createElement("div");P.dataset.row=String(j),P.dataset.col=String(D),P.style.borderRadius="12px",P.style.display="flex",P.style.alignItems="center",P.style.justifyContent="center",P.style.cursor=G?"default":"pointer",P.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",P.style.fontSize="20px",at(Y)?(P.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",P.textContent="💥"):(P.style.background=l[Y]||"#444",P.textContent=c[Y]||"⬛"),m&&m.row===j&&m.col===D&&(P.style.outline="2px solid #fff",P.style.outlineOffset="2px"),P.addEventListener("click",()=>{Ie(j,D)}),P.addEventListener("touchstart",Q=>{if(G)return;const me=Q.touches[0];A={row:j,col:D,x:me.clientX,y:me.clientY}}),P.addEventListener("touchend",Q=>{if(!A||G)return;const me=Q.changedTouches[0],ke=me.clientX-A.x,Ce=me.clientY-A.y;if(Math.sqrt(ke*ke+Ce*Ce)<18){Ie(j,D),A=null;return}let Ge=A.row,Je=A.col;Math.abs(ke)>Math.abs(Ce)?ke>0?Je+=1:Je-=1:Ce>0?Ge+=1:Ge-=1,Ge>=0&&Ge<n&&Je>=0&&Je<o&&Te(A.row,A.col,Ge,Je),A=null,Q.preventDefault()}),ye.appendChild(P)}}}function ut(j,D){if(!j||!D)return!1;const Y=Math.abs(j.row-D.row),P=Math.abs(j.col-D.col);return Y+P===1}function je(j,D){const Y=x[j.row][j.col];x[j.row][j.col]=x[D.row][D.col],x[D.row][D.col]=Y}function xt(){const j=new Set;for(let D=0;D<n;D++){let Y=x[D][0],P=0;for(let Q=1;Q<=o;Q++){const me=Q<o?x[D][Q]:null;if(me===Y)continue;const ke=Q-P;if(Y!=null&&ke>=3)for(let Ce=P;Ce<Q;Ce++)j.add(`${D},${Ce}`);Y=me,P=Q}}for(let D=0;D<o;D++){let Y=x[0][D],P=0;for(let Q=1;Q<=n;Q++){const me=Q<n?x[Q][D]:null;if(me===Y)continue;const ke=Q-P;if(Y!=null&&ke>=3)for(let Ce=P;Ce<Q;Ce++)j.add(`${Ce},${D}`);Y=me,P=Q}}return j}function Ye(j){if(!j||!j.size)return 0;const D=j.size;h+=D*4,he&&(he.textContent=String(h)),!G&&h>=d&&gt(!0);for(const Y of j){const[P,Q]=Y.split(","),me=Number(P),ke=Number(Q);x[me][ke]=null}for(let Y=0;Y<o;Y++){let P=n-1;for(let Q=n-1;Q>=0;Q--)x[Q][Y]!=null&&(x[P][Y]=x[Q][Y],P--);for(let Q=P;Q>=0;Q--)Math.random()<b?x[Q][Y]=p:x[Q][Y]=it()}return D}function Ze(j,D){const Y=new Set;for(let P=0;P<o;P++)Y.add(`${j},${P}`);for(let P=0;P<n;P++)Y.add(`${P},${D}`);Ye(Y),Ne(),G||setTimeout(()=>At(!1),120)}function At(j=!1){if(G)return;O=!0;const D=()=>{if(G){O=!0;return}const Y=xt();if(!Y.size){O=!1,Ne(),j&&!G&&(S<=0?qe():Oe("Nice! Keep matching."));return}Ye(Y),Ne(),setTimeout(D,120)};D()}function gt(j){if(!G)if(G=!0,O=!0,j){Oe("Great job! Puzzle completed 🎉");try{t?.id&&_r(t.id),Gt(10)}catch{}ot(),setTimeout(()=>{Ln()},1600)}else Oe("Out of moves. Try again next time 🙂")}function qe(){h>=d?gt(!0):S<=0&&gt(!1)}function Te(j,D,Y,P){if(O||G)return;if(S<=0){qe();return}const Q={row:j,col:D},me={row:Y,col:P};if(!ut(Q,me))return;const ke=x[j][D],Ce=x[Y][P],yt=at(ke)||at(Ce);if(je(Q,me),m=null,S--,ge&&(ge.textContent=String(S)),yt){Ne();const Ge=at(x[j][D])?{row:j,col:D}:{row:Y,col:P};Ze(Ge.row,Ge.col),qe();return}if(!xt().size){je(Q,me),Ne(),Oe("No match… try another swap."),qe();return}Oe(""),Ne(),At(!0)}function Ie(j,D){if(O||G)return;if(S<=0){qe();return}const Y={row:j,col:D};if(!m){m=Y,Ne();return}if(m.row===j&&m.col===D){m=null,Ne();return}if(!ut(m,Y)){m=Y,Ne();return}Te(m.row,m.col,Y.row,Y.col)}function le(){Ln()}Be&&(Be.onclick=le),rt&&(rt.onclick=()=>{le()}),Lt(),Ne(),Oe("Tap or swipe two neighboring tiles to swap them.")}const kr="cbsgo_inventory_v2";function go(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function yo(){return{tickets:0,cbs:0,cards:{}}}function We(){const t=localStorage.getItem(kr),n=go(t,yo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function cn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(kr,JSON.stringify(n))}function Cr(){return Number(We().tickets||0)}function Er(){return Number(We().cbs||0)}function Mt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return We();const o=We();return o.tickets=Number(o.tickets||0)+n,cn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function dn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return We();const o=We();return o.cbs=Number(o.cbs||0)+n,cn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function bo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return We();const o=We(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,cn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function ho(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return We();const o=We(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,cn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const Mr="cbsgo_steps_v6",mo="cbsgo_steps_v5",wo="cbsgo_gps_autostart_v2",Lr="cbsgo_daily_puzzle_v1",vo=.75,kt=5e3,rn=7,Pn=100,_o=1e3,So=.5,ko=2e3,Co=4.5,An=1500,zn=200,Eo=.25,Mo=.05,Lo=.3;let Jt=null,Qt=!1,mt={msg:"init"};function $n(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Ar="cbsgo_cards_v1",Ao=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function zo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Bo(t){return Ao.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function No(){try{const t=localStorage.getItem(Ar),n=$n(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const d=Number(c.count);Number.isFinite(d)&&d>0&&(o[l]=d)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function To(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,d]of Object.entries(n)){const u=Number(d||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Ar,JSON.stringify(l))}catch{}}function Io(t,n=1){const o=zo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const d={...No().counts||{}},p=Number(d[o]||0)+l;d[o]=p,To({counts:d});const b=Bo(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:d}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:b}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:b}}))}catch{}return{cardId:o,count:p,card:b}}function nt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Po(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,d=new Date(o,l-1,c);return Number.isNaN(d.getTime())?null:d}function $o(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function zr(t,n){const o=Po(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const d=new Date(o.getTime());d.setDate(d.getDate()-c),l.push($o(d))}return l}function on(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:nt(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Oo(t){const n=nt();return!t||typeof t!="object"?on():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function pn(t){t.updatedAt=Date.now(),localStorage.setItem(Mr,JSON.stringify(t))}function jo(t,n){if(!n)return;const o=zr(n,rn);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(dn(Pn),Wt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:rn,rewardCbs:Pn,lastDayKey:n}})))}function or(t){t=Oo(t||on());const n=nt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,jo(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,pn(t)}return t}function dt(){let t=localStorage.getItem(Mr);if(!t){const o=localStorage.getItem(mo);if(o){const l=$n(o,on()),c=or(l);return pn(c),c}}const n=$n(t,on());return or(n)}function en(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Ro()}}))}function Fn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Wt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Gn(t,n,o,l){const c=Number(t||0),d=Number(n||0),u=0;if(!(!c&&!d&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:d,cbs:u,reason:l||"distance"}}))}catch{}}function Ro(){const t=dt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Uo(){const t=dt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Fo(){return Uo()/1e3}function Go(){const t=dt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,c=t.dayKey||nt(),d=t.streak||{},p=zr(c,rn).map(b=>{let x=!1;return b===c?x=l:x=!!d[b],{dateKey:b,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:rn,rewardPerStreak:Pn}}function ir(){return!!Qt}function Wo(){try{return localStorage.getItem(Lr)===nt()}catch{return!1}}function Do(){try{localStorage.setItem(Lr,nt())}catch{}}function Yo(t,n){return Wo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:nt()}})),Do(),!0)}function ar(){const t=dt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function qo(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<An)return;const d=Math.floor(c/An);d<=0||(Mt(d),Wt(),Gn(0,d,0,"boost"),t.boostLastStep=o+d*An)}function Ko(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<zn){t.chestMeters=n;return}let o=0;for(;n>=zn&&o<5;)if(n-=zn,o+=1,Math.random()<Eo){const l=Math.random()<Mo,c=l?10:3,d=l?2:1;Gt(c),Fn(),Mt(d),Wt();const u=l&&Math.random()<Lo;Gn(c,d,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:d,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function Ho(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Xo(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),d=Number(t.xpKmAwarded||0);if(c>d){const x=c-d;x>0&&(Gt(x),Fn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),b=Number(t.ticketChunksAwarded||0);if(p>b){const x=p-b;x>0&&(Mt(x),Wt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Gn(o,l,0,"distance")}function Vo(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return dt();const o=dt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/vo);if(c>l){const d=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+d}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||nt(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),Xo(o),qo(o),Ko(o),pn(o),en(),o}function Zo(){Jt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Jt),Jt=null}async function sr(t={}){const n=!!t.silent;if(!navigator.geolocation)return mt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(wo,"1")}catch{}Zo(),Qt=!0,mt={msg:"requesting",t:Date.now()};try{return Jt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,d=o.coords.accuracy||999,u=Date.now(),p=dt(),b=p.lastPos;p.lastPos={lat:l,lng:c,t:u},pn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,m=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:d,heading:x,speed:m,t:u}})),d>_o){mt={lat:l,lng:c,acc:d,t:u,reason:"accuracy",boostMs:ar()},en();return}Yo(l,c);let h=0,S=0,O=0,G=0,A="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(h=Ho({lat:b.lat,lng:b.lng},{lat:l,lng:c}),S=Math.max(1,(u-b.t)/1e3),O=h/S,h<So?A="jitter":h>ko?A="teleport":O>Co?A="too-fast":(Vo(h),G=h,A="ok")),mt={lat:l,lng:c,acc:d,t:u,dist:Math.round(h),dt:Math.round(S),speed:Number.isFinite(O)?Number(O.toFixed(2)):0,added:Math.round(G),reason:A,boostMs:ar()},en()},o=>{Qt=!1,mt={err:o?.message||"GPS blocked",t:Date.now()},en()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return Qt=!1,mt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Jo(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ir()||await sr({silent:!0}))();const n=async()=>{ir()||await sr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Gt(o),Fn()),(l>0||c>0)&&(l>0&&Mt(l),c>0&&dn(c),Wt());const d=n.cardId||n.card_id;if(d)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Io(d,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Br(){const t=fn(),n=Ut(),o=mr(),l=wr(),c=Fo(),d=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
          width:${d}%;
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
  `}function Nr(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:d}=Go(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
        ${c}-day streak → +${d} CBS
      </div>
    </div>
  `}function Tr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Qo(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Ir="cbsgo_player_name_v2",Wn="cbsgo_player_avatar_v2";function Dt(){try{return localStorage.getItem(Ir)||"Sovereign"}catch{return"Sovereign"}}function Pr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Ir,n)}catch{}return n}function Dn(){try{return localStorage.getItem(Wn)||""}catch{return""}}function ei(t){const n=String(t||"");try{localStorage.setItem(Wn,n)}catch{}return n}function ti(){try{localStorage.removeItem(Wn)}catch{}}let K=null,Qe=null,et=null,It=null,$t=null,Ue=null,ze=null,wt=0,ft=!1,Ve=!0,Re=null;const He=new Map;let Xe=!0,Ot={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const ni="48a387bba00043ac4ba5823371abc9d2",Ft=80,ri=6,oi=80,ii=220,ai=6e4,si=5*6e4,li=300,fi=.35,Bn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],ci=350,di=.35,pi=120;let an=0,vt=0,tn=null,On=!1,St=[];function ct(t){return document.getElementById(t)}function _t(t){const n=ct("cbsgoMapHost");if(!n)return;let o=ct("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function ui(){const t=String(Dt()||"").trim();return t?t[0].toUpperCase():"🙂"}function jn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function $r(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,d=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+d,lng:t.lng+u}}function xi(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),d=o(n.lng-t.lng),u=Math.sin(d)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(d);let b=Math.atan2(u,p);return b=b*180/Math.PI,b=(b+360)%360,b}function gi(t,n,o){const c=n/6371e3,d=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,b=Math.sin(u),x=Math.cos(u),m=Math.sin(c),h=Math.cos(c),S=Math.asin(b*h+x*m*Math.cos(d)),O=p+Math.atan2(Math.sin(d)*m*x,h-b*Math.sin(S));return[S*180/Math.PI,O*180/Math.PI]}function yi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Or(){const{temp:t,iconEmoji:n}=Ot;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function jr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;yi();const{condition:n,isNight:o}=Ot;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const d=[];for(let u=0;u<48;u++){const p=Math.random()*100,b=Math.random()*16-8,x=Math.random()*2.5,m=2+Math.random()*1.5;d.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+b}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${m}s;
          "
        ></div>
      `)}l=d.join("")}else if(n==="snow"){const d=[];for(let u=0;u<42;u++){const p=Math.random()*100,b=Math.random()*20-10,x=Math.random()*4,m=6+Math.random()*4;d.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+b}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${m}s;
          "
        ></div>
      `)}l=d.join("")}else l="";t.innerHTML=l}async function bi(t,n){const o=Date.now();if(!(Ot.lastUpdated&&o-Ot.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${ni}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const d=await c.json(),u=d?.main?.temp,p=d?.weather?.[0]?.icon||"01d",b=String(d?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),m="⛅",h="clear";p.startsWith("01")||p.startsWith("02")?h="clear":p.startsWith("03")||p.startsWith("04")?(m="☁️",h="clouds"):p.startsWith("09")||p.startsWith("10")?(m="🌧️",h="rain"):p.startsWith("11")?(m="⛈️",h="storm"):p.startsWith("13")?(m="❄️",h="snow"):p.startsWith("50")&&(m="🌫️",h="mist"),b.includes("rain")&&(h="rain"),b.includes("snow")&&(h="snow"),b.includes("thunder")&&(h="storm");try{const O=Number(d?.dt||0),G=Number(d?.timezone||0);if(O&&Number.isFinite(G)){const U=((O+G)/3600%24+24)%24;x=U<7||U>=19}}catch{}h==="clear"?m=x?"🌙":"☀️":h==="clouds"?m="☁️":h==="rain"?m="🌧️":h==="storm"?m="⛈️":h==="snow"?m="❄️":h==="mist"&&(m="🌫️"),Ot={temp:u,iconEmoji:m,condition:h,isNight:x,lastUpdated:o};const S=document.getElementById("cbsgoWeatherLabel");S&&(S.textContent=Or()),jr()}catch(l){console.warn("Weather fetch failed",l)}}function hi(t){const n=Dn();if(n){const c=`
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
    ">${jn(ui())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function lr(t,n){const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function mi(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${jn(o)}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:p,className:"",iconSize:[30,30],iconAnchor:[15,15]})}const c=String(n||"").trim()||"🙂",d=`
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${jn(c)}</div>
  `;return t.divIcon({html:d,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function wi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function vi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function _i(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Si(){if(!Bn.length)return null;const t=Math.floor(Math.random()*Bn.length);return Bn[t]}function ki(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let d=null,u=0;if(Math.random()<fi){const p=Si();p&&(d=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:d,cardCount:u}}function Ci(t){if(!K||!Ue||!t)return;const n=Date.now();if(n-an<ai||Ue.getLayers().length>=ri)return;const l=window.L;if(!l)return;const c=_i(),d=ki(c),u=$r(t,oi,ii),p=wi(l),b=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),m={marker:b,createdAt:n,lat:u.lat,lng:u.lng,reward:d};St.push(m),b.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const h={lat:ze[0],lng:ze[1]},S={lat:u.lat,lng:u.lng},O=Ct(h,S);if(O>Ft){alert(`Too far to open this gift.

Distance: ${Math.round(O)}m
Needed: ≤ ${Ft}m`);return}Ue.removeLayer(b),St=St.filter(Be=>Be.marker!==b);const{xp:G,tickets:A,cbs:U,cardId:ae,cardCount:ye}=d,he=[];G&&he.push(`+${G} XP`),A&&he.push(`+${A} ticket${A===1?"":"s"}`),U&&he.push(`+${U} CBS`),ae&&ye>0&&he.push(`+${ye} card${ye===1?"":"s"}`);const ge=he.length?he.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${ge}`);const fe={kind:"mystery",xp:G||0,tickets:A||0,cbs:U||0,cardId:ae||null,cardCount:ye||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:fe}))}catch{}}),b.addTo(Ue),an=n}function Ei(t){if(!K||!Ue||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!Ue.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>si)return Ue.removeLayer(l.marker),o+=1,!1;const d=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(d)&&d>li?(Ue.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Ue.getLayers().length===0&&(an=0)}function Mi(t){if(!K||!$t||!t||tn)return;const n=window.L;if(!n)return;if(On){if(vt<ci||Math.random()>di)return;vt=0}else{if(vt<pi)return;vt=0,On=!0}const o=$r(t,60,140),l=vi(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const d={lat:ze[0],lng:ze[1]},u={lat:o.lat,lng:o.lng},p=Ct(d,u);if(p>Ft){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Ft}m`);return}$t.removeLayer(c),tn=null,In({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo($t),tn=c}function Li(t){const n=window.L;if(!n||!K||!t)return;const o=Ft;It?(It.setLatLng(t),It.setRadius(o)):It=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(K)}function Ai(t){const n=window.L;if(!n||!K)return;const o=hi(n);if(Qe?(Qe.setIcon(o),Qe.setLatLng(t)):(Qe=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(K),K.setView(t,19)),et?(et.setIcon(lr(n,wt)),et.setLatLng(t)):et=n.marker(t,{icon:lr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(K),Qe&&Qe.bringToFront&&Qe.bringToFront(),et&&et.bringToFront&&et.bringToFront(),Li(t),Ve&&!ft&&K)try{const l=K.getZoom()||19;let c=t;Number.isFinite(wt)&&(c=gi(t,40,wt));const d=K.getCenter(),u=Ct({lat:d.lat,lng:d.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&K.setView(c,l)}catch{}}function Rr(){const t=window.L;return!t||!K?null:(Re?(Xe&&!K.hasLayer(Re)&&Re.addTo(K),!Xe&&K.hasLayer(Re)&&K.removeLayer(Re)):(Re=t.layerGroup(),Xe&&Re.addTo(K)),Re)}function zi(t){if(!Array.isArray(t)||!K)return[];const n=K.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(d=>{if(!d||d.isMe||typeof d.lat!="number"||typeof d.lng!="number")return;const u=Math.round(d.lat*o)/o,p=Math.round(d.lng*o)/o,b=`${u}_${p}`;l.has(b)||l.set(b,[]),l.get(b).push(d)});const c=[];for(const[d,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||d,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,b=0;u.forEach(h=>{p+=h.lat,b+=h.lng});const x=p/u.length,m=b/u.length;c.push({id:`cluster_${d}`,lat:x,lng:m,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Bi(t){const n=window.L;if(!n||!K)return;const o=Rr();if(!o)return;if(!Xe){for(const[d,u]of He.entries())o.removeLayer(u),He.delete(d);return}const l=zi(t),c=new Set;l.forEach(d=>{if(!d||typeof d.lat!="number"||typeof d.lng!="number")return;const u=d.id||`${d.lat},${d.lng}`;c.add(u);const p=[d.lat,d.lng];let b=He.get(u);if(b)b.setLatLng(p);else{const x=d.isCluster&&d.count>1?String(d.count):d.nickname||"Anon",m=mi(n,x,d.avatar,d.isCluster);b=n.marker(p,{icon:m,pane:"cbsgo-others-pane"});const h=d.isCluster&&d.count>1?`${d.count} CBS-GO explorers nearby`:`${d.nickname||"CBS-GO explorer"}`;b.bindPopup(h),b.addTo(o),He.set(u,b)}});for(const[d,u]of He.entries())c.has(d)||(o.removeLayer(u),He.delete(d))}function Ni(){return`
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
        <span id="cbsgoWeatherLabel">${Or()}</span>
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
  `}function Ti(){try{K&&K.remove()}catch{}K=null,Qe=null,et=null,It=null,$t=null,Ue=null,ze=null,ft=!1,Ve=!0,an=0,vt=0,tn=null,On=!1,Re=null,He.clear(),St=[]}function Ii(){const t=window.L,n=ct("cbsgoMap");if(!t||!n)return!1;Ti();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));K=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=K.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=K.createPane("cbsgo-others-pane");c.style.zIndex="640";const d=K.createPane("cbsgo-loot-pane");d.style.zIndex="630";const u=K.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(K),K.setMaxBounds(o),K.setView([51.687,4.87],16),$t=t.layerGroup().addTo(K),Ue=t.layerGroup().addTo(K),K.on("dragstart",()=>{Ve=!1}),K.on("zoomstart",()=>{Ve=!1}),!0}function Pi(){!navigator.geolocation||!K||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,d={lat:n,lng:o},u=ze?{lat:ze[0],lng:ze[1]}:null;if(ze=[n,o],Number.isFinite(c))wt=c;else if(u){const p=Ct(u,d);Number.isFinite(p)&&p>2&&(wt=xi(u,d))}if(Ai([n,o]),u){const p=Ct(u,d);if(Number.isFinite(p)&&p>1&&(vt+=p),Number.isFinite(p)&&p>20&&!Ve&&!ft&&K){Ve=!0;const b=K.getZoom()||19;K.setView([n,o],b)}}Mi(d),Ci(d),Ei(d),bi(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function $i(){let t=0;const n=120,o=()=>{if(t++,!ct("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!Ii()){_t("Could not init map. Refresh.");return}const c=ct("cbsgoCenterBtn");c&&(c.onclick=()=>{K&&ze&&(Ve=!0,ft=!1,K.setView(ze,19))});const d=ct("cbsgoCompassBtn");d&&(d.onclick=()=>{K&&(ft=!ft,ft?(Ve=!1,K.setView([51.687,4.87],3)):ze&&(Ve=!0,K.setView(ze,16)))});const u=ct("cbsgoOnlineToggleBtn");if(u){const p=()=>{Xe?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Xe=!Xe;const b=Rr();if(b&&K&&(Xe?K.hasLayer(b)||b.addTo(K):K.hasLayer(b)&&K.removeLayer(b)),p(),!Xe&&Re){for(const[x,m]of He.entries())Re.removeLayer(m);He.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const b=p?.detail?.players||[];Bi(b)})),jr(),_t("Loading GPS…"),Pi()};o()}const Oi="cbsgo_cards_v1";function ji(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Yn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function qn(){const t=localStorage.getItem(Oi),n=ji(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function tt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ur(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Ri(){const t=Yn(),n=qn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Ui(){const t=Yn(),n=qn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),d=Number.isFinite(c)&&c>0,u=Ur(l.rarity),p=d?u:"rgba(31,41,55,.9)",b=d?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=d?l.emoji||"🃏":"❓",m=d?tt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',h=tt(l.set||"Set"),S=d?`<div style="
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
          data-card-id="${tt(l.id)}"
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
          ${S}
          <div style="
            font-size:${d?"26px":"28px"};
            margin-top:${d?"4px":"8px"};
            margin-bottom:4px;
          ">
            ${tt(x)}
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
            ${m}
          </div>
          <div style="
            font-size:10px;
            opacity:.7;
          ">
            ${h}
          </div>
        </div>
      `}).join("")}
    </div>
  `:`
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `}function Fi(){const t=Ri(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
        ${Ui()}
      </div>
    </div>
  `}function Gi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Fi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const d=Yn(),u=new Map(d.map(x=>[x.id,x]));function p(x){const m=u.get(x);if(!m)return;const h=qn(),S=Number(h[x]||0),O=Number.isFinite(S)&&S>0,G=O?m.emoji||"🃏":"❓",A=O?m.name||"Card":"Unknown card",U=m.set||"Set",ae=m.rarity||"common",ye=Ur(ae),he={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[ae]||"Common",ge=document.createElement("div");ge.style.position="fixed",ge.style.inset="0",ge.style.display="flex",ge.style.alignItems="center",ge.style.justifyContent="center",ge.style.background="rgba(0,0,0,0.65)",ge.style.pointerEvents="auto",ge.style.zIndex="8600";const fe=document.createElement("div");fe.style.width="min(260px, 82vw)",fe.style.borderRadius="20px",fe.style.border=`1px solid ${ye}`,fe.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",fe.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",fe.style.padding="16px 14px 14px 14px",fe.style.textAlign="center",fe.style.color="#fff",fe.style.fontFamily="system-ui,sans-serif",fe.style.opacity="0",fe.style.transform="translateY(14px) scale(0.96)",fe.style.transition="opacity .2s ease-out, transform .2s ease-out";const Be=O?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${S}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',rt=O?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;fe.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${tt(U)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${ye};
          font-size:10px;
        ">
          ${tt(he)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${ye};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${tt(G)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${tt(A)}
      </div>

      ${Be}
      ${rt}

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
    `,ge.appendChild(fe),document.body.appendChild(ge),requestAnimationFrame(()=>{fe.style.opacity="1",fe.style.transform="translateY(0) scale(1)"});const Fe=()=>{fe.style.opacity="0",fe.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(ge)},200)},Oe=fe.querySelector("#cbsgoCardPreviewCloseBtn");Oe&&(Oe.onclick=Fe),ge.addEventListener("click",ot=>{ot.target===ge&&Fe()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const m=x.getAttribute("data-card-id");m&&p(m)})})}function Wi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Di(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function Yi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Nn={exports:{}};const qi={},Ki=Object.freeze(Object.defineProperty({__proto__:null,default:qi},Symbol.toStringTag,{value:"Module"})),Hi=Di(Ki);var fr;function Xi(){return fr||(fr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),d=new Uint8Array(32);d[0]=9;var u=o(),p=o([1]),b=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),m=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),h=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),S=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),O=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function G(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var g,y=0;for(g=0;g<s;g++)y|=r[a+g]^i[e+g];return(1&y-1>>>8)-1}function U(r,a,i,e){return A(r,a,i,e,16)}function ae(r,a,i,e){return A(r,a,i,e,32)}function ye(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,y=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,F=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,pe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,te=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ee=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,I=s,W=g,N=y,$=k,R=L,z=F,w=B,v=pe,E=T,_=H,C=X,M=te,q=ee,ne=V,oe=J,re=Z,f,se=0;se<20;se+=2)f=I+q|0,R^=f<<7|f>>>25,f=R+I|0,E^=f<<9|f>>>23,f=E+R|0,q^=f<<13|f>>>19,f=q+E|0,I^=f<<18|f>>>14,f=z+W|0,_^=f<<7|f>>>25,f=_+z|0,ne^=f<<9|f>>>23,f=ne+_|0,W^=f<<13|f>>>19,f=W+ne|0,z^=f<<18|f>>>14,f=C+w|0,oe^=f<<7|f>>>25,f=oe+C|0,N^=f<<9|f>>>23,f=N+oe|0,w^=f<<13|f>>>19,f=w+N|0,C^=f<<18|f>>>14,f=re+M|0,$^=f<<7|f>>>25,f=$+re|0,v^=f<<9|f>>>23,f=v+$|0,M^=f<<13|f>>>19,f=M+v|0,re^=f<<18|f>>>14,f=I+$|0,W^=f<<7|f>>>25,f=W+I|0,N^=f<<9|f>>>23,f=N+W|0,$^=f<<13|f>>>19,f=$+N|0,I^=f<<18|f>>>14,f=z+R|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,R^=f<<13|f>>>19,f=R+v|0,z^=f<<18|f>>>14,f=C+_|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,_^=f<<13|f>>>19,f=_+E|0,C^=f<<18|f>>>14,f=re+oe|0,q^=f<<7|f>>>25,f=q+re|0,ne^=f<<9|f>>>23,f=ne+q|0,oe^=f<<13|f>>>19,f=oe+ne|0,re^=f<<18|f>>>14;I=I+s|0,W=W+g|0,N=N+y|0,$=$+k|0,R=R+L|0,z=z+F|0,w=w+B|0,v=v+pe|0,E=E+T|0,_=_+H|0,C=C+X|0,M=M+te|0,q=q+ee|0,ne=ne+V|0,oe=oe+J|0,re=re+Z|0,r[0]=I>>>0&255,r[1]=I>>>8&255,r[2]=I>>>16&255,r[3]=I>>>24&255,r[4]=W>>>0&255,r[5]=W>>>8&255,r[6]=W>>>16&255,r[7]=W>>>24&255,r[8]=N>>>0&255,r[9]=N>>>8&255,r[10]=N>>>16&255,r[11]=N>>>24&255,r[12]=$>>>0&255,r[13]=$>>>8&255,r[14]=$>>>16&255,r[15]=$>>>24&255,r[16]=R>>>0&255,r[17]=R>>>8&255,r[18]=R>>>16&255,r[19]=R>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=_>>>0&255,r[37]=_>>>8&255,r[38]=_>>>16&255,r[39]=_>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=q>>>0&255,r[49]=q>>>8&255,r[50]=q>>>16&255,r[51]=q>>>24&255,r[52]=ne>>>0&255,r[53]=ne>>>8&255,r[54]=ne>>>16&255,r[55]=ne>>>24&255,r[56]=oe>>>0&255,r[57]=oe>>>8&255,r[58]=oe>>>16&255,r[59]=oe>>>24&255,r[60]=re>>>0&255,r[61]=re>>>8&255,r[62]=re>>>16&255,r[63]=re>>>24&255}function he(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,y=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,F=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,pe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,te=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ee=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,I=s,W=g,N=y,$=k,R=L,z=F,w=B,v=pe,E=T,_=H,C=X,M=te,q=ee,ne=V,oe=J,re=Z,f,se=0;se<20;se+=2)f=I+q|0,R^=f<<7|f>>>25,f=R+I|0,E^=f<<9|f>>>23,f=E+R|0,q^=f<<13|f>>>19,f=q+E|0,I^=f<<18|f>>>14,f=z+W|0,_^=f<<7|f>>>25,f=_+z|0,ne^=f<<9|f>>>23,f=ne+_|0,W^=f<<13|f>>>19,f=W+ne|0,z^=f<<18|f>>>14,f=C+w|0,oe^=f<<7|f>>>25,f=oe+C|0,N^=f<<9|f>>>23,f=N+oe|0,w^=f<<13|f>>>19,f=w+N|0,C^=f<<18|f>>>14,f=re+M|0,$^=f<<7|f>>>25,f=$+re|0,v^=f<<9|f>>>23,f=v+$|0,M^=f<<13|f>>>19,f=M+v|0,re^=f<<18|f>>>14,f=I+$|0,W^=f<<7|f>>>25,f=W+I|0,N^=f<<9|f>>>23,f=N+W|0,$^=f<<13|f>>>19,f=$+N|0,I^=f<<18|f>>>14,f=z+R|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,R^=f<<13|f>>>19,f=R+v|0,z^=f<<18|f>>>14,f=C+_|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,_^=f<<13|f>>>19,f=_+E|0,C^=f<<18|f>>>14,f=re+oe|0,q^=f<<7|f>>>25,f=q+re|0,ne^=f<<9|f>>>23,f=ne+q|0,oe^=f<<13|f>>>19,f=oe+ne|0,re^=f<<18|f>>>14;r[0]=I>>>0&255,r[1]=I>>>8&255,r[2]=I>>>16&255,r[3]=I>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=re>>>0&255,r[13]=re>>>8&255,r[14]=re>>>16&255,r[15]=re>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=_>>>0&255,r[29]=_>>>8&255,r[30]=_>>>16&255,r[31]=_>>>24&255}function ge(r,a,i,e){ye(r,a,i,e)}function fe(r,a,i,e){he(r,a,i,e)}var Be=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function rt(r,a,i,e,s,g,y){var k=new Uint8Array(16),L=new Uint8Array(64),F,B;for(B=0;B<16;B++)k[B]=0;for(B=0;B<8;B++)k[B]=g[B];for(;s>=64;){for(ge(L,k,y,Be),B=0;B<64;B++)r[a+B]=i[e+B]^L[B];for(F=1,B=8;B<16;B++)F=F+(k[B]&255)|0,k[B]=F&255,F>>>=8;s-=64,a+=64,e+=64}if(s>0)for(ge(L,k,y,Be),B=0;B<s;B++)r[a+B]=i[e+B]^L[B];return 0}function Fe(r,a,i,e,s){var g=new Uint8Array(16),y=new Uint8Array(64),k,L;for(L=0;L<16;L++)g[L]=0;for(L=0;L<8;L++)g[L]=e[L];for(;i>=64;){for(ge(y,g,s,Be),L=0;L<64;L++)r[a+L]=y[L];for(k=1,L=8;L<16;L++)k=k+(g[L]&255)|0,g[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(ge(y,g,s,Be),L=0;L<i;L++)r[a+L]=y[L];return 0}function Oe(r,a,i,e,s){var g=new Uint8Array(32);fe(g,e,s,Be);for(var y=new Uint8Array(8),k=0;k<8;k++)y[k]=e[k+16];return Fe(r,a,i,y,g)}function ot(r,a,i,e,s,g,y){var k=new Uint8Array(32);fe(k,g,y,Be);for(var L=new Uint8Array(8),F=0;F<8;F++)L[F]=g[F+16];return rt(r,a,i,e,s,L,k)}var it=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,y,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,y=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|y<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(y>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};it.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,y,k,L,F,B,pe,T,H,X,te,ee,V,J,Z,I,W,N,$=this.h[0],R=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],_=this.h[6],C=this.h[7],M=this.h[8],q=this.h[9],ne=this.r[0],oe=this.r[1],re=this.r[2],f=this.r[3],se=this.r[4],ue=this.r[5],xe=this.r[6],ie=this.r[7],ce=this.r[8],de=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,$+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,R+=(s>>>13|g<<3)&8191,y=r[a+4]&255|(r[a+5]&255)<<8,z+=(g>>>10|y<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(y>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,F=r[a+10]&255|(r[a+11]&255)<<8,_+=(L>>>14|F<<2)&8191,B=r[a+12]&255|(r[a+13]&255)<<8,C+=(F>>>11|B<<5)&8191,pe=r[a+14]&255|(r[a+15]&255)<<8,M+=(B>>>8|pe<<8)&8191,q+=pe>>>5|e,T=0,H=T,H+=$*ne,H+=R*(5*de),H+=z*(5*ce),H+=w*(5*ie),H+=v*(5*xe),T=H>>>13,H&=8191,H+=E*(5*ue),H+=_*(5*se),H+=C*(5*f),H+=M*(5*re),H+=q*(5*oe),T+=H>>>13,H&=8191,X=T,X+=$*oe,X+=R*ne,X+=z*(5*de),X+=w*(5*ce),X+=v*(5*ie),T=X>>>13,X&=8191,X+=E*(5*xe),X+=_*(5*ue),X+=C*(5*se),X+=M*(5*f),X+=q*(5*re),T+=X>>>13,X&=8191,te=T,te+=$*re,te+=R*oe,te+=z*ne,te+=w*(5*de),te+=v*(5*ce),T=te>>>13,te&=8191,te+=E*(5*ie),te+=_*(5*xe),te+=C*(5*ue),te+=M*(5*se),te+=q*(5*f),T+=te>>>13,te&=8191,ee=T,ee+=$*f,ee+=R*re,ee+=z*oe,ee+=w*ne,ee+=v*(5*de),T=ee>>>13,ee&=8191,ee+=E*(5*ce),ee+=_*(5*ie),ee+=C*(5*xe),ee+=M*(5*ue),ee+=q*(5*se),T+=ee>>>13,ee&=8191,V=T,V+=$*se,V+=R*f,V+=z*re,V+=w*oe,V+=v*ne,T=V>>>13,V&=8191,V+=E*(5*de),V+=_*(5*ce),V+=C*(5*ie),V+=M*(5*xe),V+=q*(5*ue),T+=V>>>13,V&=8191,J=T,J+=$*ue,J+=R*se,J+=z*f,J+=w*re,J+=v*oe,T=J>>>13,J&=8191,J+=E*ne,J+=_*(5*de),J+=C*(5*ce),J+=M*(5*ie),J+=q*(5*xe),T+=J>>>13,J&=8191,Z=T,Z+=$*xe,Z+=R*ue,Z+=z*se,Z+=w*f,Z+=v*re,T=Z>>>13,Z&=8191,Z+=E*oe,Z+=_*ne,Z+=C*(5*de),Z+=M*(5*ce),Z+=q*(5*ie),T+=Z>>>13,Z&=8191,I=T,I+=$*ie,I+=R*xe,I+=z*ue,I+=w*se,I+=v*f,T=I>>>13,I&=8191,I+=E*re,I+=_*oe,I+=C*ne,I+=M*(5*de),I+=q*(5*ce),T+=I>>>13,I&=8191,W=T,W+=$*ce,W+=R*ie,W+=z*xe,W+=w*ue,W+=v*se,T=W>>>13,W&=8191,W+=E*f,W+=_*re,W+=C*oe,W+=M*ne,W+=q*(5*de),T+=W>>>13,W&=8191,N=T,N+=$*de,N+=R*ce,N+=z*ie,N+=w*xe,N+=v*ue,T=N>>>13,N&=8191,N+=E*se,N+=_*f,N+=C*re,N+=M*oe,N+=q*ne,T+=N>>>13,N&=8191,T=(T<<2)+T|0,T=T+H|0,H=T&8191,T=T>>>13,X+=T,$=H,R=X,z=te,w=ee,v=V,E=J,_=Z,C=I,M=W,q=N,a+=16,i-=16;this.h[0]=$,this.h[1]=R,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=_,this.h[7]=C,this.h[8]=M,this.h[9]=q},it.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,y;if(this.leftover){for(y=this.leftover,this.buffer[y++]=1;y<16;y++)this.buffer[y]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,y=2;y<10;y++)this.h[y]+=e,e=this.h[y]>>>13,this.h[y]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,y=1;y<10;y++)i[y]=this.h[y]+e,e=i[y]>>>13,i[y]&=8191;for(i[9]-=8192,s=(e^1)-1,y=0;y<10;y++)i[y]&=s;for(s=~s,y=0;y<10;y++)this.h[y]=this.h[y]&s|i[y];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,y=1;y<8;y++)g=(this.h[y]+this.pad[y]|0)+(g>>>16)|0,this.h[y]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},it.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Lt(r,a,i,e,s,g){var y=new it(g);return y.update(i,e,s),y.finish(r,a),0}function at(r,a,i,e,s,g){var y=new Uint8Array(16);return Lt(y,0,i,e,s,g),U(r,a,y,0)}function Ne(r,a,i,e,s){var g;if(i<32)return-1;for(ot(r,0,a,0,i,e,s),Lt(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function ut(r,a,i,e,s){var g,y=new Uint8Array(32);if(i<32||(Oe(y,0,32,e,s),at(a,16,a,32,i-32,y)!==0))return-1;for(ot(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function je(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function Ye(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function Ze(r,a){var i,e,s,g=o(),y=o();for(i=0;i<16;i++)y[i]=a[i];for(xt(y),xt(y),xt(y),e=0;e<2;e++){for(g[0]=y[0]-65517,i=1;i<15;i++)g[i]=y[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=y[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,Ye(y,g,1-s)}for(i=0;i<16;i++)r[2*i]=y[i]&255,r[2*i+1]=y[i]>>8}function At(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Ze(i,r),Ze(e,a),ae(i,0,e,0)}function gt(r){var a=new Uint8Array(32);return Ze(a,r),a[0]&1}function qe(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Te(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Ie(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function le(r,a,i){var e,s,g=0,y=0,k=0,L=0,F=0,B=0,pe=0,T=0,H=0,X=0,te=0,ee=0,V=0,J=0,Z=0,I=0,W=0,N=0,$=0,R=0,z=0,w=0,v=0,E=0,_=0,C=0,M=0,q=0,ne=0,oe=0,re=0,f=i[0],se=i[1],ue=i[2],xe=i[3],ie=i[4],ce=i[5],de=i[6],Se=i[7],be=i[8],we=i[9],ve=i[10],_e=i[11],Ee=i[12],Me=i[13],Le=i[14],Ae=i[15];e=a[0],g+=e*f,y+=e*se,k+=e*ue,L+=e*xe,F+=e*ie,B+=e*ce,pe+=e*de,T+=e*Se,H+=e*be,X+=e*we,te+=e*ve,ee+=e*_e,V+=e*Ee,J+=e*Me,Z+=e*Le,I+=e*Ae,e=a[1],y+=e*f,k+=e*se,L+=e*ue,F+=e*xe,B+=e*ie,pe+=e*ce,T+=e*de,H+=e*Se,X+=e*be,te+=e*we,ee+=e*ve,V+=e*_e,J+=e*Ee,Z+=e*Me,I+=e*Le,W+=e*Ae,e=a[2],k+=e*f,L+=e*se,F+=e*ue,B+=e*xe,pe+=e*ie,T+=e*ce,H+=e*de,X+=e*Se,te+=e*be,ee+=e*we,V+=e*ve,J+=e*_e,Z+=e*Ee,I+=e*Me,W+=e*Le,N+=e*Ae,e=a[3],L+=e*f,F+=e*se,B+=e*ue,pe+=e*xe,T+=e*ie,H+=e*ce,X+=e*de,te+=e*Se,ee+=e*be,V+=e*we,J+=e*ve,Z+=e*_e,I+=e*Ee,W+=e*Me,N+=e*Le,$+=e*Ae,e=a[4],F+=e*f,B+=e*se,pe+=e*ue,T+=e*xe,H+=e*ie,X+=e*ce,te+=e*de,ee+=e*Se,V+=e*be,J+=e*we,Z+=e*ve,I+=e*_e,W+=e*Ee,N+=e*Me,$+=e*Le,R+=e*Ae,e=a[5],B+=e*f,pe+=e*se,T+=e*ue,H+=e*xe,X+=e*ie,te+=e*ce,ee+=e*de,V+=e*Se,J+=e*be,Z+=e*we,I+=e*ve,W+=e*_e,N+=e*Ee,$+=e*Me,R+=e*Le,z+=e*Ae,e=a[6],pe+=e*f,T+=e*se,H+=e*ue,X+=e*xe,te+=e*ie,ee+=e*ce,V+=e*de,J+=e*Se,Z+=e*be,I+=e*we,W+=e*ve,N+=e*_e,$+=e*Ee,R+=e*Me,z+=e*Le,w+=e*Ae,e=a[7],T+=e*f,H+=e*se,X+=e*ue,te+=e*xe,ee+=e*ie,V+=e*ce,J+=e*de,Z+=e*Se,I+=e*be,W+=e*we,N+=e*ve,$+=e*_e,R+=e*Ee,z+=e*Me,w+=e*Le,v+=e*Ae,e=a[8],H+=e*f,X+=e*se,te+=e*ue,ee+=e*xe,V+=e*ie,J+=e*ce,Z+=e*de,I+=e*Se,W+=e*be,N+=e*we,$+=e*ve,R+=e*_e,z+=e*Ee,w+=e*Me,v+=e*Le,E+=e*Ae,e=a[9],X+=e*f,te+=e*se,ee+=e*ue,V+=e*xe,J+=e*ie,Z+=e*ce,I+=e*de,W+=e*Se,N+=e*be,$+=e*we,R+=e*ve,z+=e*_e,w+=e*Ee,v+=e*Me,E+=e*Le,_+=e*Ae,e=a[10],te+=e*f,ee+=e*se,V+=e*ue,J+=e*xe,Z+=e*ie,I+=e*ce,W+=e*de,N+=e*Se,$+=e*be,R+=e*we,z+=e*ve,w+=e*_e,v+=e*Ee,E+=e*Me,_+=e*Le,C+=e*Ae,e=a[11],ee+=e*f,V+=e*se,J+=e*ue,Z+=e*xe,I+=e*ie,W+=e*ce,N+=e*de,$+=e*Se,R+=e*be,z+=e*we,w+=e*ve,v+=e*_e,E+=e*Ee,_+=e*Me,C+=e*Le,M+=e*Ae,e=a[12],V+=e*f,J+=e*se,Z+=e*ue,I+=e*xe,W+=e*ie,N+=e*ce,$+=e*de,R+=e*Se,z+=e*be,w+=e*we,v+=e*ve,E+=e*_e,_+=e*Ee,C+=e*Me,M+=e*Le,q+=e*Ae,e=a[13],J+=e*f,Z+=e*se,I+=e*ue,W+=e*xe,N+=e*ie,$+=e*ce,R+=e*de,z+=e*Se,w+=e*be,v+=e*we,E+=e*ve,_+=e*_e,C+=e*Ee,M+=e*Me,q+=e*Le,ne+=e*Ae,e=a[14],Z+=e*f,I+=e*se,W+=e*ue,N+=e*xe,$+=e*ie,R+=e*ce,z+=e*de,w+=e*Se,v+=e*be,E+=e*we,_+=e*ve,C+=e*_e,M+=e*Ee,q+=e*Me,ne+=e*Le,oe+=e*Ae,e=a[15],I+=e*f,W+=e*se,N+=e*ue,$+=e*xe,R+=e*ie,z+=e*ce,w+=e*de,v+=e*Se,E+=e*be,_+=e*we,C+=e*ve,M+=e*_e,q+=e*Ee,ne+=e*Me,oe+=e*Le,re+=e*Ae,g+=38*W,y+=38*N,k+=38*$,L+=38*R,F+=38*z,B+=38*w,pe+=38*v,T+=38*E,H+=38*_,X+=38*C,te+=38*M,ee+=38*q,V+=38*ne,J+=38*oe,Z+=38*re,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=y+s+65535,s=Math.floor(e/65536),y=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=F+s+65535,s=Math.floor(e/65536),F=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=pe+s+65535,s=Math.floor(e/65536),pe=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=I+s+65535,s=Math.floor(e/65536),I=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=y+s+65535,s=Math.floor(e/65536),y=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=F+s+65535,s=Math.floor(e/65536),F=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=pe+s+65535,s=Math.floor(e/65536),pe=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=I+s+65535,s=Math.floor(e/65536),I=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=y,r[2]=k,r[3]=L,r[4]=F,r[5]=B,r[6]=pe,r[7]=T,r[8]=H,r[9]=X,r[10]=te,r[11]=ee,r[12]=V,r[13]=J,r[14]=Z,r[15]=I}function j(r,a){le(r,a,a)}function D(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)j(i,i),e!==2&&e!==4&&le(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)j(i,i),e!==1&&le(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function P(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,y,k=o(),L=o(),F=o(),B=o(),pe=o(),T=o();for(y=0;y<31;y++)e[y]=a[y];for(e[31]=a[31]&127|64,e[0]&=248,qe(s,i),y=0;y<16;y++)L[y]=s[y],B[y]=k[y]=F[y]=0;for(k[0]=B[0]=1,y=254;y>=0;--y)g=e[y>>>3]>>>(y&7)&1,Ye(k,L,g),Ye(F,B,g),Te(pe,k,F),Ie(k,k,F),Te(F,L,B),Ie(L,L,B),j(B,pe),j(T,k),le(k,F,k),le(F,L,pe),Te(pe,k,F),Ie(k,k,F),j(L,k),Ie(F,B,T),le(k,F,b),Te(k,k,B),le(F,F,k),le(k,B,T),le(B,L,s),j(L,pe),Ye(k,L,g),Ye(F,B,g);for(y=0;y<16;y++)s[y+16]=k[y],s[y+32]=F[y],s[y+48]=L[y],s[y+64]=B[y];var H=s.subarray(32),X=s.subarray(16);return D(H,H),le(X,X,H),Ze(r,X),0}function Q(r,a){return P(r,a,d)}function me(r,a){return l(a,32),Q(r,a)}function ke(r,a,i){var e=new Uint8Array(32);return P(e,i,a),fe(r,c,e,Be)}var Ce=Ne,yt=ut;function gn(r,a,i,e,s,g){var y=new Uint8Array(32);return ke(y,s,g),Ce(r,a,i,e,y)}function Ge(r,a,i,e,s,g){var y=new Uint8Array(32);return ke(y,s,g),yt(r,a,i,e,y)}var Je=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Xn(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),y,k,L,F,B,pe,T,H,X,te,ee,V,J,Z,I,W,N,$,R,z,w,v,E,_,C,M,q=r[0],ne=r[1],oe=r[2],re=r[3],f=r[4],se=r[5],ue=r[6],xe=r[7],ie=a[0],ce=a[1],de=a[2],Se=a[3],be=a[4],we=a[5],ve=a[6],_e=a[7],Ee=0;e>=128;){for(R=0;R<16;R++)z=8*R+Ee,s[R]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],g[R]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(R=0;R<80;R++)if(y=q,k=ne,L=oe,F=re,B=f,pe=se,T=ue,H=xe,X=ie,te=ce,ee=de,V=Se,J=be,Z=we,I=ve,W=_e,w=xe,v=_e,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=(f>>>14|be<<18)^(f>>>18|be<<14)^(be>>>9|f<<23),v=(be>>>14|f<<18)^(be>>>18|f<<14)^(f>>>9|be<<23),E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,w=f&se^~f&ue,v=be&we^~be&ve,E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,w=Je[R*2],v=Je[R*2+1],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,w=s[R%16],v=g[R%16],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,N=C&65535|M<<16,$=E&65535|_<<16,w=N,v=$,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=(q>>>28|ie<<4)^(ie>>>2|q<<30)^(ie>>>7|q<<25),v=(ie>>>28|q<<4)^(q>>>2|ie<<30)^(q>>>7|ie<<25),E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,w=q&ne^q&oe^ne&oe,v=ie&ce^ie&de^ce&de,E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,H=C&65535|M<<16,W=E&65535|_<<16,w=F,v=V,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=N,v=$,E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,F=C&65535|M<<16,V=E&65535|_<<16,ne=y,oe=k,re=L,f=F,se=B,ue=pe,xe=T,q=H,ce=X,de=te,Se=ee,be=V,we=J,ve=Z,_e=I,ie=W,R%16===15)for(z=0;z<16;z++)w=s[z],v=g[z],E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=s[(z+9)%16],v=g[(z+9)%16],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,N=s[(z+1)%16],$=g[(z+1)%16],w=(N>>>1|$<<31)^(N>>>8|$<<24)^N>>>7,v=($>>>1|N<<31)^($>>>8|N<<24)^($>>>7|N<<25),E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,N=s[(z+14)%16],$=g[(z+14)%16],w=(N>>>19|$<<13)^($>>>29|N<<3)^N>>>6,v=($>>>19|N<<13)^(N>>>29|$<<3)^($>>>6|N<<26),E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,s[z]=C&65535|M<<16,g[z]=E&65535|_<<16;w=q,v=ie,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[0]=q=C&65535|M<<16,a[0]=ie=E&65535|_<<16,w=ne,v=ce,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[1]=ne=C&65535|M<<16,a[1]=ce=E&65535|_<<16,w=oe,v=de,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[2]=oe=C&65535|M<<16,a[2]=de=E&65535|_<<16,w=re,v=Se,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[3]=re=C&65535|M<<16,a[3]=Se=E&65535|_<<16,w=f,v=be,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[4]=f=C&65535|M<<16,a[4]=be=E&65535|_<<16,w=se,v=we,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[5]=se=C&65535|M<<16,a[5]=we=E&65535|_<<16,w=ue,v=ve,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[6]=ue=C&65535|M<<16,a[6]=ve=E&65535|_<<16,w=xe,v=_e,E=v&65535,_=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,_+=v>>>16,C+=w&65535,M+=w>>>16,_+=E>>>16,C+=_>>>16,M+=C>>>16,r[7]=xe=C&65535|M<<16,a[7]=_e=E&65535|_<<16,Ee+=128,e-=128}return e}function st(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),y,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Xn(e,s,a,i),i%=128,y=0;y<i;y++)g[y]=a[k-i+y];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,G(g,i-8,k/536870912|0,k<<3),Xn(e,s,g,i),y=0;y<8;y++)G(r,8*y,e[y],s[y]);return 0}function qt(r,a){var i=o(),e=o(),s=o(),g=o(),y=o(),k=o(),L=o(),F=o(),B=o();Ie(i,r[1],r[0]),Ie(B,a[1],a[0]),le(i,i,B),Te(e,r[0],r[1]),Te(B,a[0],a[1]),le(e,e,B),le(s,r[3],a[3]),le(s,s,m),le(g,r[2],a[2]),Te(g,g,g),Ie(y,e,i),Ie(k,g,s),Te(L,g,s),Te(F,e,i),le(r[0],y,k),le(r[1],F,L),le(r[2],L,k),le(r[3],y,F)}function Vn(r,a,i){var e;for(e=0;e<4;e++)Ye(r[e],a[e],i)}function yn(r,a){var i=o(),e=o(),s=o();D(s,a[2]),le(i,a[0],s),le(e,a[1],s),Ze(r,e),r[31]^=gt(i)<<7}function bn(r,a,i){var e,s;for(je(r[0],u),je(r[1],p),je(r[2],p),je(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Vn(r,a,e),qt(a,r),qt(r,r),Vn(r,a,e)}function Kt(r,a){var i=[o(),o(),o(),o()];je(i[0],h),je(i[1],S),je(i[2],p),le(i[3],h,S),bn(r,i,a)}function hn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),st(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Kt(s,e),yn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Ht=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function mn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Ht[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Ht[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Ht[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function wn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;mn(r,a)}function Zn(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),y=new Uint8Array(64),k,L,F=new Float64Array(64),B=[o(),o(),o(),o()];st(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var pe=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(st(y,r.subarray(32),i+32),wn(y),Kt(B,y),yn(r,B),k=32;k<64;k++)r[k]=e[k];for(st(g,r,i+64),wn(g),k=0;k<64;k++)F[k]=0;for(k=0;k<32;k++)F[k]=y[k];for(k=0;k<32;k++)for(L=0;L<32;L++)F[k+L]+=g[k]*s[L];return mn(r.subarray(32),F),pe}function Jr(r,a){var i=o(),e=o(),s=o(),g=o(),y=o(),k=o(),L=o();return je(r[2],p),qe(r[1],a),j(s,r[1]),le(g,s,x),Ie(s,s,r[2]),Te(g,r[2],g),j(y,g),j(k,y),le(L,k,y),le(i,L,s),le(i,i,g),Y(i,i),le(i,i,s),le(i,i,g),le(i,i,g),le(r[0],i,g),j(e,r[0]),le(e,e,g),At(e,s)&&le(r[0],r[0],O),j(e,r[0]),le(e,e,g),At(e,s)?-1:(gt(r[0])===a[31]>>7&&Ie(r[0],u,r[0]),le(r[3],r[0],r[1]),0)}function vn(r,a,i,e){var s,g=new Uint8Array(32),y=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||Jr(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(st(y,r,i),wn(y),bn(k,L,y),Kt(L,a.subarray(32)),qt(k,L),yn(g,k),i-=64,ae(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var _n=32,Xt=24,zt=32,bt=16,Bt=32,Vt=32,Nt=32,Tt=32,Sn=32,Jn=Xt,Qr=zt,eo=bt,Ke=64,lt=32,ht=64,kn=32,Cn=64;n.lowlevel={crypto_core_hsalsa20:fe,crypto_stream_xor:ot,crypto_stream:Oe,crypto_stream_salsa20_xor:rt,crypto_stream_salsa20:Fe,crypto_onetimeauth:Lt,crypto_onetimeauth_verify:at,crypto_verify_16:U,crypto_verify_32:ae,crypto_secretbox:Ne,crypto_secretbox_open:ut,crypto_scalarmult:P,crypto_scalarmult_base:Q,crypto_box_beforenm:ke,crypto_box_afternm:Ce,crypto_box:gn,crypto_box_open:Ge,crypto_box_keypair:me,crypto_hash:st,crypto_sign:Zn,crypto_sign_keypair:hn,crypto_sign_open:vn,crypto_secretbox_KEYBYTES:_n,crypto_secretbox_NONCEBYTES:Xt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:Bt,crypto_scalarmult_SCALARBYTES:Vt,crypto_box_PUBLICKEYBYTES:Nt,crypto_box_SECRETKEYBYTES:Tt,crypto_box_BEFORENMBYTES:Sn,crypto_box_NONCEBYTES:Jn,crypto_box_ZEROBYTES:Qr,crypto_box_BOXZEROBYTES:eo,crypto_sign_BYTES:Ke,crypto_sign_PUBLICKEYBYTES:lt,crypto_sign_SECRETKEYBYTES:ht,crypto_sign_SEEDBYTES:kn,crypto_hash_BYTES:Cn,gf:o,D:x,L:Ht,pack25519:Ze,unpack25519:qe,M:le,A:Te,S:j,Z:Ie,pow2523:Y,add:qt,set25519:je,modL:mn,scalarmult:bn,scalarbase:Kt};function Qn(r,a){if(r.length!==_n)throw new Error("bad key size");if(a.length!==Xt)throw new Error("bad nonce size")}function to(r,a){if(r.length!==Nt)throw new Error("bad public key size");if(a.length!==Tt)throw new Error("bad secret key size")}function Pe(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function er(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Pe(r,a,i),Qn(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+zt]=r[g];return Ne(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){Pe(r,a,i),Qn(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+bt]=r[g];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=_n,n.secretbox.nonceLength=Xt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if(Pe(r,a),r.length!==Vt)throw new Error("bad n size");if(a.length!==Bt)throw new Error("bad p size");var i=new Uint8Array(Bt);return P(i,r,a),i},n.scalarMult.base=function(r){if(Pe(r),r.length!==Vt)throw new Error("bad n size");var a=new Uint8Array(Bt);return Q(a,r),a},n.scalarMult.scalarLength=Vt,n.scalarMult.groupElementLength=Bt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Pe(r,a),to(r,a);var i=new Uint8Array(Sn);return ke(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Nt),a=new Uint8Array(Tt);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Pe(r),r.length!==Tt)throw new Error("bad secret key size");var a=new Uint8Array(Nt);return Q(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Nt,n.box.secretKeyLength=Tt,n.box.sharedKeyLength=Sn,n.box.nonceLength=Jn,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Pe(r,a),a.length!==ht)throw new Error("bad secret key size");var i=new Uint8Array(Ke+r.length);return Zn(i,r,r.length,a),i},n.sign.open=function(r,a){if(Pe(r,a),a.length!==lt)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=vn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ke),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Pe(r,a,i),a.length!==Ke)throw new Error("bad signature size");if(i.length!==lt)throw new Error("bad public key size");var e=new Uint8Array(Ke+r.length),s=new Uint8Array(Ke+r.length),g;for(g=0;g<Ke;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+Ke]=r[g];return vn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(lt),a=new Uint8Array(ht);return hn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Pe(r),r.length!==ht)throw new Error("bad secret key size");for(var a=new Uint8Array(lt),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Pe(r),r.length!==kn)throw new Error("bad seed size");for(var a=new Uint8Array(lt),i=new Uint8Array(ht),e=0;e<32;e++)i[e]=r[e];return hn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=lt,n.sign.secretKeyLength=ht,n.sign.seedLength=kn,n.sign.signatureLength=Ke,n.hash=function(r){Pe(r);var a=new Uint8Array(Cn);return st(a,r,r.length),a},n.hash.hashLength=Cn,n.verify=function(r,a){return Pe(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];er(g)})}else typeof Yi<"u"&&(r=Hi,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];er(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Nn)),Nn.exports}var Vi=Xi();const Zi=Wi(Vi);function Ji(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const m=t.charAt(x),h=m.charCodeAt(0);if(n[h]!==255)throw new TypeError(m+" is ambiguous");n[h]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),d=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let m=0,h=0,S=0;const O=x.length;for(;S!==O&&x[S]===0;)S++,m++;const G=(O-S)*d+1>>>0,A=new Uint8Array(G);for(;S!==O;){let ye=x[S],he=0;for(let ge=G-1;(ye!==0||he<h)&&ge!==-1;ge--,he++)ye+=256*A[ge]>>>0,A[ge]=ye%o>>>0,ye=ye/o>>>0;if(ye!==0)throw new Error("Non-zero carry");h=he,S++}let U=G-h;for(;U!==G&&A[U]===0;)U++;let ae=l.repeat(m);for(;U<G;++U)ae+=t.charAt(A[U]);return ae}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let m=0,h=0,S=0;for(;x[m]===l;)h++,m++;const O=(x.length-m)*c+1>>>0,G=new Uint8Array(O);for(;m<x.length;){const ye=x.charCodeAt(m);if(ye>255)return;let he=n[ye];if(he===255)return;let ge=0;for(let fe=O-1;(he!==0||ge<S)&&fe!==-1;fe--,ge++)he+=o*G[fe]>>>0,G[fe]=he%256>>>0,he=he/256>>>0;if(he!==0)throw new Error("Non-zero carry");S=ge,m++}let A=O-S;for(;A!==O&&G[A]===0;)A++;const U=new Uint8Array(h+(O-A));let ae=h;for(;A!==O;)U[ae++]=G[A++];return U}function b(x){const m=p(x);if(m)return m;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:b}}var Qi="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const cr=Ji(Qi),Kn="cbsgo_wallet_v3",un="cbsgo_wallet_unlocked_v3";function Yt(){try{const t=localStorage.getItem(Kn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function ea(t){localStorage.setItem(Kn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function ta(){const t=Zi.sign.keyPair(),n=cr.encode(t.publicKey),o=cr.encode(t.secretKey);return{pk:n,sk:o}}function Fr(){return!!Yt()}function na(){return Yt()?sessionStorage.getItem(un)==="1":!1}function ra(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");Yt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=ta();return ea({pk:l,sk:c,pin:n}),sessionStorage.setItem(un,"1"),l}function oa(t){const n=Yt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(un,"1"),n.pk}function De(){const t=Yt();return t?t.pk:""}function ia(){localStorage.removeItem(Kn),sessionStorage.removeItem(un)}typeof window<"u"&&(window.cbsgoDevResetWallet=ia);const Gr="cbsgoLoginModal";function Wr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Dr(){const t=document.getElementById(Gr);t&&t.remove()}function aa(t){Dr();const n=document.createElement("div");return n.id=Gr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function sa(t,n){return`
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
      ">${Wr(t)}</div>

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
  `}function dr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function la(){const t=!Fr();let n="";try{const m=Dt();t?m&&m!=="Sovereign"?n=m:n="":n=m||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Wr(n)}" style="${Zt()}" placeholder="Kevin" />
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
        <button id="cbsgoCreateBtn" type="button" style="${dr(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${dr(!0)}">Unlock</button>
      </div>
    `,l=aa(sa(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),d=m=>{c&&(c.textContent=m||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),b=l.querySelector("#cbsgoNick"),x=()=>{Dr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const m=l.querySelector("#cbsgoCreateBtn");m&&(m.onclick=async()=>{try{const h=String(b?.value||"").trim(),S=String(u?.value||"").trim(),O=String(p?.value||"").trim();if(h.length<2)return d("⛔ Nickname too short.");if(S.length<4)return d("⛔ PIN must be at least 4 digits.");if(S!==O)return d("⛔ PINs do not match.");d("Creating wallet…"),Pr(h),await ra(S),d("✅ Wallet created. Starting…"),x()}catch(h){d(`⛔ ${String(h?.message||h)}`)}})}else{const m=l.querySelector("#cbsgoUnlockBtn");m&&(m.onclick=async()=>{try{const h=String(u?.value||"").trim();if(h.length<4)return d("⛔ PIN must be at least 4 digits.");d("Unlocking…"),await oa(h),d("✅ Unlocked."),x()}catch{d("⛔ Wrong PIN (or wallet data missing).")}})}}const fa="https://cxfedvowjgkqrakkkjpi.supabase.co",ca="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",$e=no(fa,ca);function da(){const t=De();if(!t)return null;const n=Dt(),o=Dn();return{wallet_pk:t,nickname:n,avatar:o}}async function nn(t={}){try{const n=da();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await $e.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const pa=15e3,ua=1e4,xa=300*1e3;let Pt=null,pr=0,ur=0;function ga(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",ga));async function ya(){const t=De();if(!t||!Pt)return;const n=Date.now();if(n-pr<5e3)return;pr=n;const l=(Dt()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:d,error:u}=await $e.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(d&&d.length>0){const p=d[0].id,{error:b}=await $e.from("player_state").update(c).eq("id",p);b&&console.warn("CBS GO: player_state update failed",b)}else{const{error:p}=await $e.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(d){console.warn("CBS GO: pushMyState error",d)}}async function ba(){const t=De();if(!t)return;const n=Date.now();if(n-ur<3e3)return;ur=n;const o=new Date(Date.now()-xa).toISOString();try{const{data:l,error:c}=await $e.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const d=Array.isArray(l)?l:[],u=Array.from(new Set(d.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:m}=await $e.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);m?console.warn("CBS GO: fetch player profiles failed",m):Array.isArray(x)&&(p=new Map(x.map(h=>[h.wallet_pk,h])))}const b=d.map(x=>{const m=x.lat,h=x.lng,S=typeof m=="number"?m:parseFloat(m),O=typeof h=="number"?h:parseFloat(h);if(!Number.isFinite(S)||!Number.isFinite(O))return null;const G=p.get(x.wallet_pk)||null,A=G&&G.nickname||x.nickname||"Anon",U=G&&G.avatar?String(G.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:U,lat:S,lng:O,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:b}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function ha(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{ya()},pa),setInterval(()=>{ba()},ua))}ha();function Yr(){const t=De();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function sn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function ma(t){const n=Yr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await $e.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw sn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function wa(t){const n=Yr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await $e.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw sn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function va(){const t=De();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await $e.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw sn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],d=[];for(const p of l){const b=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!b&&!x)continue;const m=p.a_wallet===t?p.b_wallet:p.a_wallet,h={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:m,nickname:null,avatar:""};b&&c.push(h),x&&d.push(h)}const u=Array.from(new Set([...c,...d].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:b}=await $e.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!b&&Array.isArray(p)){const x=new Map;for(const h of p)h.wallet_pk&&x.set(String(h.wallet_pk),{nickname:h.nickname||null,avatar:h.avatar||""});const m=h=>{h.forEach(S=>{const O=x.get(S.otherWallet);O&&(S.nickname=O.nickname||null,S.avatar=O.avatar||"")})};m(c),m(d)}else b&&sn("loadFriendsOverview:players",b)}return{incoming:c,accepted:d}}let jt=null;async function qr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(jt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),jt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function _a(){try{jt&&(await jt.release(),jt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Sa(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await qr():await _a()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function ka(){const t=De();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Ca(t){return String(t||"").trim()}async function Kr(t,n={}){const o=ka(),l=Ca(t),c=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),d=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!c&&!d)throw new Error("Set tickets and/or CBS above 0.");if(c>0&&Cr()<c)throw new Error("Not enough tickets in your bag.");if(d>0&&Er()<d)throw new Error("Not enough CBS (play money) in your bag.");let u=0,p=0;try{c>0&&(bo(c),u=c),d>0&&(ho(d),p=d);const{error:b}=await $e.from("trades").insert({from_wallet:o,to_wallet:l,tickets:c||0,cbs:d||0,card_id:null,card_qty:null,status:"sent"});if(b)throw u>0&&Mt(u),p>0&&dn(p),console.warn("CBS GO sendGiftToWallet Supabase error",b),new Error(b.message||"Could not save gift to Supabase (permissions or network issue).");return{ok:!0}}catch(b){throw b instanceof Error?b:new Error(String(b?.message||b)||"Failed to send gift.")}}async function Hn(){const t=De();if(t)try{const{data:n,error:o}=await $e.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;const l=[];for(const c of n){if(!c)continue;const d=Number(c.tickets||0),u=Number(c.cbs||0);d>0&&Mt(d),u>0&&dn(u),c.id&&l.push(c.id)}if(l.length>0){const{error:c}=await $e.from("trades").update({status:"claimed"}).in("id",l);c&&console.warn("CBS GO pullIncomingGifts update status error",c)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0)=>Kr(t,{tickets:n,cbs:o}),window.cbsgoPullGifts=Hn);function pt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Hr(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}function xn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Rn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function xr(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${pt(t)}</div>
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
  `}function Ea(){const t=Dt(),n=Dn(),o=De();return`
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
        ${Hr(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${pt(t)}" maxlength="24" style="
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
                    ${pt(o)}
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
  `}function Ma(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const U=document.querySelector("#profileMsg");U&&(U.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const d=()=>{if(!t)return;const A=Pr(t.value);c(`✅ Name saved: ${A}`);try{nn()}catch(U){console.warn("CBS GO: failed to sync profile after name change",U)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(d,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),d()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const U=new FileReader;U.onload=()=>{ei(String(U.result||"")),c("✅ Photo saved"),Et();try{nn()}catch(ae){console.warn("CBS GO: failed to sync profile after avatar change",ae)}},U.onerror=()=>c("⛔ Failed to read image."),U.readAsDataURL(A)}),o&&(o.onclick=()=>{ti(),c("✅ Photo removed"),Et();try{nn()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),b=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),m=document.querySelector("#friendsAcceptedList"),h=A=>{b&&(b.textContent=A||"")},S=A=>{if(!A)return"";const U=String(A);return U.length<=12?U:`${U.slice(0,5)}…${U.slice(-4)}`},O=(A,U="")=>{const ae=A.nickname&&A.nickname.trim()?A.nickname.trim():S(A.otherWallet),ye=S(A.otherWallet);return`
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
          ${Hr(A.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${pt(ae||"Friend")}
            </div>
            ${ye?`<div style="font-size:11px;opacity:.7;">${pt(ye)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${U||""}
        </div>
      </div>
    `};async function G(){if(!(!x||!m))try{x.textContent="Loading…",m.textContent="Loading…";const A=await va();A.incoming.length?x.innerHTML=A.incoming.map(U=>{const ae=`
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${U.id}"
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
            `;return O(U,ae)}).join(""):x.textContent="No incoming requests.",A.accepted.length?m.innerHTML=A.accepted.map(U=>O(U,`
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
            `)).join(""):m.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(U=>{U.addEventListener("click",async()=>{const ae=U.getAttribute("data-friend-id");if(ae){h("Accepting friend…"),U.disabled=!0;try{await wa(ae),h("✅ Friend added."),await G()}catch(ye){console.warn(ye),h(`⛔ ${ye.message||ye}`),U.disabled=!1}}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",m.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){h("Enter a wallet address first.");return}h("Sending friend request…"),p.disabled=!0;try{await ma(A),h("✅ Friend request sent."),u.value="",await G()}catch(U){console.warn(U),h(`⛔ ${U.message||U}`)}finally{p.disabled=!1}}),G().catch(()=>{})}function La(){const t=Cr(),n=Er(),o=De();return`
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
                ${pt(o)}
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
  `}function Aa(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Gi()}catch(h){console.warn("CBS GO: openCardsPanel failed",h)}});const l=De(),c=document.querySelector("#giftWalletInput"),d=document.querySelector("#giftTicketsInput"),u=document.querySelector("#giftCbsInput"),p=document.querySelector("#giftSendBtn"),b=document.querySelector("#giftMsg"),x=h=>{b&&(b.textContent=h||"")};if(p&&c&&p.addEventListener("click",async()=>{const h=c.value.trim(),S=d?.value??"",O=u?.value??"",G=Number(S||"0"),A=Number(O||"0");if(!h){x("Enter a wallet address first.");return}if((!G||G<=0)&&(!A||A<=0)){x("Set tickets and/or CBS above 0.");return}p.disabled=!0,x("Sending gift…");try{await Kr(h,{tickets:G,cbs:A}),x("✅ Gift sent."),d&&(d.value=""),u&&(u.value="")}catch(U){console.warn(U),x(`⛔ ${U.message||"Could not send gift."}`)}finally{p.disabled=!1}}),!t||!l)return;const m=h=>{n&&(n.textContent=h||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),m("✅ Wallet address copied to clipboard.")):m("📋 Copy not supported in this browser.")}catch{m("⛔ Failed to copy address.")}},Hn().catch(()=>{})}function Xr(){const t=xn();return t==="profile"?xr("Profile",`<div id="profileMount">${Ea()}</div>`):t==="bag"?xr("Bag",`<div id="bagMount">${La()}</div>`):""}function za(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ni()}
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
          ${Br()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Nr()}
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
        ${Xr()}
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

      <!-- 🎁 Groot overlay-venster voor cadeautjes + streak + daily-goal -->
      <div id="cbsgoLootOverlayHost" style="
        position:fixed;
        inset:0;
        z-index:8000;
        pointer-events:none;
      "></div>

      ${Tr()?`<button id="resetBtn" type="button" style="
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Xr();const n=xn();n==="profile"&&Ma(),n==="bag"&&Aa();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Rn("map"),Et()})}function Ba(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=xn();Rn(o===n?"map":n||"map"),Et()})})}function gr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=za();try{qr(),Sa()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{nn()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Ba(),$i(),Jo(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Nr())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Br())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{xn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let b=p.querySelector(".cbsgoToastBox");b||(b=document.createElement("div"),b.className="cbsgoToastBox",b.style.pointerEvents="auto",b.style.padding="8px 12px",b.style.borderRadius="999px",b.style.border="1px solid rgba(255,255,255,.25)",b.style.background="rgba(10,12,18,.88)",b.style.backdropFilter="blur(10px)",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.fontSize="11px",b.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",b.style.opacity="0",b.style.transform="translateY(10px)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(b)),b.textContent=u||"",b.style.opacity="1",b.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{b.style.opacity="0",b.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},b=Number(p.xp||0),x=Number(p.tickets||0),m=Number(p.cbs||0);if(!b&&!x&&!m)return;const h=[];b&&h.push(`+${b} XP`),x&&h.push(`+${x} ticket${x===1?"":"s"}`),m&&h.push(`+${m} CBS`);let S="Walking reward";p.reason==="boost"?S="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?S="Treasure reward":p.reason==="distance"&&(S="Distance reward"),o(`${S}: ${h.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.steps||0),x=Number(u?.goal||0),m=u?.dayKey||"",h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.80)",h.style.pointerEvents="auto";const S=document.createElement("div");S.style.width="min(340px, 92vw)",S.style.borderRadius="22px",S.style.border="1px solid rgba(56,189,248,.85)",S.style.background="rgba(10,12,18,0.98)",S.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",S.style.padding="20px 18px 16px 18px",S.style.textAlign="center",S.style.color="#fff",S.style.fontFamily="system-ui,sans-serif",S.style.opacity="0",S.style.transform="translateY(14px) scale(0.96)",S.style.transition="opacity .25s ease-out, transform .25s ease-out";const O=x?`${b}/${x} steps`:`${b} steps`;S.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${m?` (${m})`:""}.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#7dd3fc;
      ">
        ${O}
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
    `,h.appendChild(S),p.appendChild(h),requestAnimationFrame(()=>{S.style.opacity="1",S.style.transform="translateY(0) scale(1)"});const G=()=>{S.style.opacity="0",S.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=G),h.addEventListener("click",U=>{U.target===h&&G()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const b=Number(u?.xp||0),x=Number(u?.tickets||0),m=Number(u?.cbs||0);if(!b&&!x&&!m)return;p.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.75)",h.style.pointerEvents="auto";const S=document.createElement("div");S.style.width="min(320px, 90vw)",S.style.borderRadius="22px",S.style.border="1px solid rgba(255,255,255,.4)",S.style.background="rgba(10,12,18,0.96)",S.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",S.style.padding="18px 18px 16px 18px",S.style.textAlign="center",S.style.color="#fff",S.style.fontFamily="system-ui,sans-serif",S.style.opacity="0",S.style.transform="translateY(12px) scale(0.97)",S.style.transition="opacity .25s ease-out, transform .25s ease-out";const O=[];b&&O.push(`+${b} XP`),x&&O.push(`+${x} ticket${x===1?"":"s"}`),m&&O.push(`+${m} CBS`),S.innerHTML=`
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
        ${pt(O.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,h.appendChild(S),p.appendChild(h),requestAnimationFrame(()=>{S.style.opacity="1",S.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{S.style.opacity="0",S.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function d(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.days||7),x=Number(u?.rewardCbs||0),m=document.createElement("div");m.style.position="fixed",m.style.inset="0",m.style.display="flex",m.style.alignItems="center",m.style.justifyContent="center",m.style.background="rgba(5,7,11,0.80)",m.style.pointerEvents="auto";const h=document.createElement("div");h.style.width="min(340px, 92vw)",h.style.borderRadius="22px",h.style.border="1px solid rgba(251,191,36,.85)",h.style.background="rgba(10,12,18,0.98)",h.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",h.style.padding="20px 18px 16px 18px",h.style.textAlign="center",h.style.color="#fff",h.style.fontFamily="system-ui,sans-serif",h.style.opacity="0",h.style.transform="translateY(14px) scale(0.96)",h.style.transition="opacity .25s ease-out, transform .25s ease-out",h.innerHTML=`
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
    `,m.appendChild(h),p.appendChild(m),requestAnimationFrame(()=>{h.style.opacity="1",h.style.transform="translateY(0) scale(1)"});const S=()=>{h.style.opacity="0",h.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},O=document.getElementById("cbsgoStreakCloseBtn");O&&(O.onclick=S),m.addEventListener("click",G=>{G.target===m&&S()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{d(u?.detail||{})})),Et(),Tr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",Qo)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){In({id:"__daily__",name:"Daily Glow"});return}if(vr(p))return;const b=fo.find(x=>x.id===p);b&&In(b)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&io(async()=>{const{completeNode:b}=await Promise.resolve().then(()=>uo);return{completeNode:b}},void 0).then(({completeNode:b})=>{b(p),Vr()})})),Hn().catch(()=>{})}function Vr(){if(!document.querySelector("#app"))return;if(Fr()&&na()){gr();return}la();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),gr()};window.addEventListener("cbsgo:loginDone",n)}function Zr(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function ln(t){const n=Zr();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";ln(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{ln(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function yr(){try{if(!document.getElementById("app")){ln("❌ #app not found in index.html");return}Vr();const n=Zr();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){ln(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",yr,{once:!0}):yr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
