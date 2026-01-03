import{createClient as ro}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const u of f.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(c){if(c.ep)return;c.ep=!0;const f=o(c);fetch(c.href,f)}})();const oo="modulepreload",io=function(t){return"/cbs-go/"+t},tr={},ao=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let y=function(x){return Promise.all(x.map(m=>Promise.resolve(m).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=y(o.map(x=>{if(x=io(x),x in tr)return;tr[x]=!0;const m=x.endsWith(".css"),b=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${b}`))return;const _=document.createElement("link");if(_.rel=m?"stylesheet":oo,m||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),m)return new Promise((T,G)=>{_.addEventListener("load",T),_.addEventListener("error",()=>G(new Error(`Unable to preload CSS for ${x}`)))})}))}function f(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&f(p.reason);return n().catch(f)})},In="cbsgoLevelUpOverlay",nr="cbsgoLevelUpStyles",En="https://smitskecbs.github.io/cbs-go/";function so(){if(document.getElementById(nr))return;const t=document.createElement("style");t.id=nr,t.textContent=`
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
  `,document.head.appendChild(t)}function Mn(){const t=document.getElementById(In);t&&t.remove()}function lo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const f=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${f}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function rr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function co(t){so(),Mn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=In,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&lo(c);const f=()=>Mn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),y=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),m=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=f),p&&(p.onclick=f),y&&(y.onclick=()=>{const b=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${En}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(b)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(En),m&&(m.textContent="✅ Link copied. Share it with your friends.")}catch{m&&(m.textContent="Could not copy link. You can share it manually: "+En)}}),setTimeout(()=>{document.getElementById(In)&&Mn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{co(t?.detail||{})}));const fo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],br="cbsgo_state_v6";function po(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function uo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ut(){const t=localStorage.getItem(br);return po(t,uo())}function hr(t){t.updatedAt=Date.now(),localStorage.setItem(br,JSON.stringify(t))}function Un(t){return 100+(Math.max(1,Number(t||1))-1)*40}function fn(){return Number(Ut().xp||0)}function Ft(){const t=fn();let n=1,o=t;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function mr(){const t=fn();let n=1,o=t;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function wr(){return Un(Ft())}function Wt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ut();const o=Ft(),l=Ut();l.xp=Number(l.xp||0)+n,hr(l);const c=Ft();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function vr(t){const n=String(t||"");if(!n)return!1;const o=Ut();return!!(o.completed&&o.completed[n])}function _r(t){const n=String(t||"");if(!n)return;const o=Ut();o.completed||(o.completed={}),o.completed[n]=Date.now(),hr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const xo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Wt,completeNode:_r,getLevel:Ft,getXp:fn,getXpIntoLevel:mr,getXpNeededThisLevel:wr,isNodeCompleted:vr},Symbol.toStringTag,{value:"Module"})),Sr="cbsgoPuzzleModal";function go(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ln(){const t=document.getElementById(Sr);t&&t.remove()}function Tn(t){Ln();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],f=180,u=18,p=l.length,y=.01;let x=[],m=null,b=0,_=u,T=!1,G=!1,A=null;const U=t?.name||"CBS GO Puzzle",ae=document.createElement("div");ae.id=Sr,ae.style.position="fixed",ae.style.inset="0",ae.style.zIndex="999999",ae.style.display="flex",ae.style.alignItems="center",ae.style.justifyContent="center",ae.style.padding="16px",ae.style.background="rgba(0,0,0,.70)",ae.style.backdropFilter="blur(12px)",ae.style.fontFamily="system-ui, sans-serif",ae.style.color="#fff",ae.innerHTML=`
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
          ${go(U)}
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
  `,document.body.appendChild(ae);const ye=document.getElementById("cbsgoBoard"),he=document.getElementById("cbsgoScore"),ge=document.getElementById("cbsgoMoves"),ce=document.getElementById("cbsgoStatus"),Be=document.getElementById("cbsgoPuzzleClose"),rt=document.getElementById("cbsgoPuzzleOk"),Ge=document.getElementById("cbsgoConfettiLayer");function je(j){ce&&(ce.textContent=j||"")}function ot(){if(!Ge)return;Ge.style.display="block",Ge.innerHTML="";const j=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],D=40;for(let Y=0;Y<D;Y++){const $=document.createElement("div"),Q=6+Math.floor(Math.random()*6),me=Math.random()*100,ke=Math.random()*.6,Ce=1+Math.random()*.6,yt=Math.random()*360;$.style.position="absolute",$.style.top="-10%",$.style.left=`${me}%`,$.style.width=`${Q}px`,$.style.height=`${Q*2}px`,$.style.background=j[Y%j.length],$.style.opacity="0.9",$.style.borderRadius="2px",$.style.transform=`rotate(${yt}deg)`,$.style.animation=`cbsgoConfettiFall ${Ce}s ease-out ${ke}s forwards`,Ge.appendChild($)}}function it(){return Math.floor(Math.random()*l.length)}function At(){x=[];for(let j=0;j<n;j++){const D=[];for(let Y=0;Y<o;Y++)Math.random()<y?D.push(p):D.push(it());x.push(D)}}function at(j){return j===p}function Ie(){if(ye){ye.innerHTML="";for(let j=0;j<n;j++)for(let D=0;D<o;D++){const Y=x[j][D],$=document.createElement("div");$.dataset.row=String(j),$.dataset.col=String(D),$.style.borderRadius="12px",$.style.display="flex",$.style.alignItems="center",$.style.justifyContent="center",$.style.cursor=G?"default":"pointer",$.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",$.style.fontSize="20px",at(Y)?($.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",$.textContent="💥"):($.style.background=l[Y]||"#444",$.textContent=c[Y]||"⬛"),m&&m.row===j&&m.col===D&&($.style.outline="2px solid #fff",$.style.outlineOffset="2px"),$.addEventListener("click",()=>{Pe(j,D)}),$.addEventListener("touchstart",Q=>{if(G)return;const me=Q.touches[0];A={row:j,col:D,x:me.clientX,y:me.clientY}}),$.addEventListener("touchend",Q=>{if(!A||G)return;const me=Q.changedTouches[0],ke=me.clientX-A.x,Ce=me.clientY-A.y;if(Math.sqrt(ke*ke+Ce*Ce)<18){Pe(j,D),A=null;return}let We=A.row,Je=A.col;Math.abs(ke)>Math.abs(Ce)?ke>0?Je+=1:Je-=1:Ce>0?We+=1:We-=1,We>=0&&We<n&&Je>=0&&Je<o&&Te(A.row,A.col,We,Je),A=null,Q.preventDefault()}),ye.appendChild($)}}}function ut(j,D){if(!j||!D)return!1;const Y=Math.abs(j.row-D.row),$=Math.abs(j.col-D.col);return Y+$===1}function Re(j,D){const Y=x[j.row][j.col];x[j.row][j.col]=x[D.row][D.col],x[D.row][D.col]=Y}function xt(){const j=new Set;for(let D=0;D<n;D++){let Y=x[D][0],$=0;for(let Q=1;Q<=o;Q++){const me=Q<o?x[D][Q]:null;if(me===Y)continue;const ke=Q-$;if(Y!=null&&ke>=3)for(let Ce=$;Ce<Q;Ce++)j.add(`${D},${Ce}`);Y=me,$=Q}}for(let D=0;D<o;D++){let Y=x[0][D],$=0;for(let Q=1;Q<=n;Q++){const me=Q<n?x[Q][D]:null;if(me===Y)continue;const ke=Q-$;if(Y!=null&&ke>=3)for(let Ce=$;Ce<Q;Ce++)j.add(`${Ce},${D}`);Y=me,$=Q}}return j}function Ye(j){if(!j||!j.size)return 0;const D=j.size;b+=D*4,he&&(he.textContent=String(b)),!G&&b>=f&&gt(!0);for(const Y of j){const[$,Q]=Y.split(","),me=Number($),ke=Number(Q);x[me][ke]=null}for(let Y=0;Y<o;Y++){let $=n-1;for(let Q=n-1;Q>=0;Q--)x[Q][Y]!=null&&(x[$][Y]=x[Q][Y],$--);for(let Q=$;Q>=0;Q--)Math.random()<y?x[Q][Y]=p:x[Q][Y]=it()}return D}function Ze(j,D){const Y=new Set;for(let $=0;$<o;$++)Y.add(`${j},${$}`);for(let $=0;$<n;$++)Y.add(`${$},${D}`);Ye(Y),Ie(),G||setTimeout(()=>zt(!1),120)}function zt(j=!1){if(G)return;T=!0;const D=()=>{if(G){T=!0;return}const Y=xt();if(!Y.size){T=!1,Ie(),j&&!G&&(_<=0?qe():je("Nice! Keep matching."));return}Ye(Y),Ie(),setTimeout(D,120)};D()}function gt(j){if(!G)if(G=!0,T=!0,j){je("Great job! Puzzle completed 🎉");try{t?.id&&_r(t.id),Wt(10)}catch{}ot(),setTimeout(()=>{Ln()},1600)}else je("Out of moves. Try again next time 🙂")}function qe(){b>=f?gt(!0):_<=0&&gt(!1)}function Te(j,D,Y,$){if(T||G)return;if(_<=0){qe();return}const Q={row:j,col:D},me={row:Y,col:$};if(!ut(Q,me))return;const ke=x[j][D],Ce=x[Y][$],yt=at(ke)||at(Ce);if(Re(Q,me),m=null,_--,ge&&(ge.textContent=String(_)),yt){Ie();const We=at(x[j][D])?{row:j,col:D}:{row:Y,col:$};Ze(We.row,We.col),qe();return}if(!xt().size){Re(Q,me),Ie(),je("No match… try another swap."),qe();return}je(""),Ie(),zt(!0)}function Pe(j,D){if(T||G)return;if(_<=0){qe();return}const Y={row:j,col:D};if(!m){m=Y,Ie();return}if(m.row===j&&m.col===D){m=null,Ie();return}if(!ut(m,Y)){m=Y,Ie();return}Te(m.row,m.col,Y.row,Y.col)}function le(){Ln()}Be&&(Be.onclick=le),rt&&(rt.onclick=()=>{le()}),At(),Ie(),je("Tap or swipe two neighboring tiles to swap them.")}const kr="cbsgo_inventory_v2";function yo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function bo(){return{tickets:0,cbs:0,cards:{}}}function Ne(){const t=localStorage.getItem(kr),n=yo(t,bo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Mt(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(kr,JSON.stringify(n))}function Cr(){return Number(Ne().tickets||0)}function Er(){return Number(Ne().cbs||0)}function Lt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne();return o.tickets=Number(o.tickets||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function dn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne();return o.cbs=Number(o.cbs||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function ho(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function mo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ne();const o=Ne(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function wo(){return{...Ne().cards||{}}}function vo(t){const n=String(t||"").trim();if(!n)return 0;const o=wo();return Number(o[n]||0)}function Mr(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Ne();const c=Ne();return c.cards||(c.cards={}),c.cards[o]=Number(c.cards[o]||0)+l,Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}function _o(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Ne();const c=Ne();if(!c.cards||typeof c.cards[o]!="number")throw new Error("Not enough of that card in your collection.");const f=Number(c.cards[o]||0);if(f<l)throw new Error("Not enough of that card in your collection.");return c.cards[o]=f-l,c.cards[o]<=0&&delete c.cards[o],Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}const Lr="cbsgo_steps_v6",So="cbsgo_steps_v5",ko="cbsgo_gps_autostart_v2",Ar="cbsgo_daily_puzzle_v1",Co=.75,kt=5e3,on=7,Pn=100,Eo=1e3,Mo=.5,Lo=2e3,Ao=4.5,An=1500,zn=200,zo=.25,No=.05,Bo=.3;let Qt=null,en=!1,mt={msg:"init"};function $n(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const zr="cbsgo_cards_v1",Io=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function To(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Po(t){return Io.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function $o(){try{const t=localStorage.getItem(zr),n=$n(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const f=Number(c.count);Number.isFinite(f)&&f>0&&(o[l]=f)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Oo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,f]of Object.entries(n)){const u=Number(f||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(zr,JSON.stringify(l))}catch{}}function jo(t,n=1){const o=To(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const f={...$o().counts||{}},p=Number(f[o]||0)+l;f[o]=p,Oo({counts:f});const y=Po(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:f}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:y}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:y}}))}catch{}return{cardId:o,count:p,card:y}}function nt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Ro(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,f=new Date(o,l-1,c);return Number.isNaN(f.getTime())?null:f}function Uo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Nr(t,n){const o=Ro(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const f=new Date(o.getTime());f.setDate(f.getDate()-c),l.push(Uo(f))}return l}function an(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:nt(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Fo(t){const n=nt();return!t||typeof t!="object"?an():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function pn(t){t.updatedAt=Date.now(),localStorage.setItem(Lr,JSON.stringify(t))}function Go(t,n){if(!n)return;const o=Nr(n,on);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(dn(Pn),Dt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:on,rewardCbs:Pn,lastDayKey:n}})))}function or(t){t=Fo(t||an());const n=nt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Go(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,pn(t)}return t}function dt(){let t=localStorage.getItem(Lr);if(!t){const o=localStorage.getItem(So);if(o){const l=$n(o,an()),c=or(l);return pn(c),c}}const n=$n(t,an());return or(n)}function tn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Wo()}}))}function Fn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Dt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Gn(t,n,o,l){const c=Number(t||0),f=Number(n||0),u=0;if(!(!c&&!f&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:f,cbs:u,reason:l||"distance"}}))}catch{}}function Wo(){const t=dt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Do(){const t=dt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Yo(){return Do()/1e3}function qo(){const t=dt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,c=t.dayKey||nt(),f=t.streak||{},p=Nr(c,on).map(y=>{let x=!1;return y===c?x=l:x=!!f[y],{dateKey:y,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:on,rewardPerStreak:Pn}}function ir(){return!!en}function Ko(){try{return localStorage.getItem(Ar)===nt()}catch{return!1}}function Ho(){try{localStorage.setItem(Ar,nt())}catch{}}function Xo(t,n){return Ko()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:nt()}})),Ho(),!0)}function ar(){const t=dt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Vo(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<An)return;const f=Math.floor(c/An);f<=0||(Lt(f),Dt(),Gn(0,f,0,"boost"),t.boostLastStep=o+f*An)}function Zo(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<zn){t.chestMeters=n;return}let o=0;for(;n>=zn&&o<5;)if(n-=zn,o+=1,Math.random()<zo){const l=Math.random()<No,c=l?10:3,f=l?2:1;Wt(c),Fn(),Lt(f),Dt();const u=l&&Math.random()<Bo;Gn(c,f,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:f,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function Jo(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),y=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(y))}function Qo(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),f=Number(t.xpKmAwarded||0);if(c>f){const x=c-f;x>0&&(Wt(x),Fn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),y=Number(t.ticketChunksAwarded||0);if(p>y){const x=p-y;x>0&&(Lt(x),Dt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Gn(o,l,0,"distance")}function ei(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return dt();const o=dt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/Co);if(c>l){const f=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+f}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||nt(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),Qo(o),Vo(o),Zo(o),pn(o),tn(),o}function ti(){Qt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Qt),Qt=null}async function sr(t={}){const n=!!t.silent;if(!navigator.geolocation)return mt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(ko,"1")}catch{}ti(),en=!0,mt={msg:"requesting",t:Date.now()};try{return Qt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,f=o.coords.accuracy||999,u=Date.now(),p=dt(),y=p.lastPos;p.lastPos={lat:l,lng:c,t:u},pn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,m=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:f,heading:x,speed:m,t:u}})),f>Eo){mt={lat:l,lng:c,acc:f,t:u,reason:"accuracy",boostMs:ar()},tn();return}Xo(l,c);let b=0,_=0,T=0,G=0,A="no-last";y&&typeof y.lat=="number"&&typeof y.lng=="number"&&typeof y.t=="number"&&(b=Jo({lat:y.lat,lng:y.lng},{lat:l,lng:c}),_=Math.max(1,(u-y.t)/1e3),T=b/_,b<Mo?A="jitter":b>Lo?A="teleport":T>Ao?A="too-fast":(ei(b),G=b,A="ok")),mt={lat:l,lng:c,acc:f,t:u,dist:Math.round(b),dt:Math.round(_),speed:Number.isFinite(T)?Number(T.toFixed(2)):0,added:Math.round(G),reason:A,boostMs:ar()},tn()},o=>{en=!1,mt={err:o?.message||"GPS blocked",t:Date.now()},tn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return en=!1,mt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ni(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ir()||await sr({silent:!0}))();const n=async()=>{ir()||await sr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Wt(o),Fn()),(l>0||c>0)&&(l>0&&Lt(l),c>0&&dn(c),Dt());const f=n.cardId||n.card_id;if(f)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;jo(f,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Br(){const t=fn(),n=Ft(),o=mr(),l=wr(),c=Yo(),f=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function Ir(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:f}=qo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function Tr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ri(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Pr="cbsgo_player_name_v2",Wn="cbsgo_player_avatar_v2";function Yt(){try{return localStorage.getItem(Pr)||"Sovereign"}catch{return"Sovereign"}}function $r(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Pr,n)}catch{}return n}function Dn(){try{return localStorage.getItem(Wn)||""}catch{return""}}function oi(t){const n=String(t||"");try{localStorage.setItem(Wn,n)}catch{}return n}function ii(){try{localStorage.removeItem(Wn)}catch{}}let K=null,Qe=null,et=null,Pt=null,Ot=null,Fe=null,ze=null,wt=0,ct=!1,Ve=!0,Ue=null;const He=new Map;let Xe=!0,jt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const ai="48a387bba00043ac4ba5823371abc9d2",Gt=80,si=6,li=80,ci=220,fi=6e4,di=5*6e4,pi=300,ui=.35,Nn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],xi=350,gi=.35,yi=120;let sn=0,vt=0,nn=null,On=!1,St=[];function ft(t){return document.getElementById(t)}function _t(t){const n=ft("cbsgoMapHost");if(!n)return;let o=ft("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function bi(){const t=String(Yt()||"").trim();return t?t[0].toUpperCase():"🙂"}function jn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),y=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(y))}function Or(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,f=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+f,lng:t.lng+u}}function hi(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),f=o(n.lng-t.lng),u=Math.sin(f)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(f);let y=Math.atan2(u,p);return y=y*180/Math.PI,y=(y+360)%360,y}function mi(t,n,o){const c=n/6371e3,f=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,y=Math.sin(u),x=Math.cos(u),m=Math.sin(c),b=Math.cos(c),_=Math.asin(y*b+x*m*Math.cos(f)),T=p+Math.atan2(Math.sin(f)*m*x,b-y*Math.sin(_));return[_*180/Math.PI,T*180/Math.PI]}function wi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function jr(){const{temp:t,iconEmoji:n}=jt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Rr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;wi();const{condition:n,isNight:o}=jt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const f=[];for(let u=0;u<48;u++){const p=Math.random()*100,y=Math.random()*16-8,x=Math.random()*2.5,m=2+Math.random()*1.5;f.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+y}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${m}s;
          "
        ></div>
      `)}l=f.join("")}else if(n==="snow"){const f=[];for(let u=0;u<42;u++){const p=Math.random()*100,y=Math.random()*20-10,x=Math.random()*4,m=6+Math.random()*4;f.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+y}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${m}s;
          "
        ></div>
      `)}l=f.join("")}else l="";t.innerHTML=l}async function vi(t,n){const o=Date.now();if(!(jt.lastUpdated&&o-jt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${ai}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const f=await c.json(),u=f?.main?.temp,p=f?.weather?.[0]?.icon||"01d",y=String(f?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),m="⛅",b="clear";p.startsWith("01")||p.startsWith("02")?b="clear":p.startsWith("03")||p.startsWith("04")?(m="☁️",b="clouds"):p.startsWith("09")||p.startsWith("10")?(m="🌧️",b="rain"):p.startsWith("11")?(m="⛈️",b="storm"):p.startsWith("13")?(m="❄️",b="snow"):p.startsWith("50")&&(m="🌫️",b="mist"),y.includes("rain")&&(b="rain"),y.includes("snow")&&(b="snow"),y.includes("thunder")&&(b="storm");try{const T=Number(f?.dt||0),G=Number(f?.timezone||0);if(T&&Number.isFinite(G)){const U=((T+G)/3600%24+24)%24;x=U<7||U>=19}}catch{}b==="clear"?m=x?"🌙":"☀️":b==="clouds"?m="☁️":b==="rain"?m="🌧️":b==="storm"?m="⛈️":b==="snow"?m="❄️":b==="mist"&&(m="🌫️"),jt={temp:u,iconEmoji:m,condition:b,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=jr()),Rr()}catch(l){console.warn("Weather fetch failed",l)}}function _i(t){const n=Dn();if(n){const c=`
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
    ">${jn(bi())}</div>
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Si(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${jn(o)}');
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
    ">${jn(c)}</div>
  `;return t.divIcon({html:f,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function ki(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Ci(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Ei(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Mi(){if(!Nn.length)return null;const t=Math.floor(Math.random()*Nn.length);return Nn[t]}function Li(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let f=null,u=0;if(Math.random()<ui){const p=Mi();p&&(f=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:f,cardCount:u}}function Ai(t){if(!K||!Fe||!t)return;const n=Date.now();if(n-sn<fi||Fe.getLayers().length>=si)return;const l=window.L;if(!l)return;const c=Ei(),f=Li(c),u=Or(t,li,ci),p=ki(l),y=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),m={marker:y,createdAt:n,lat:u.lat,lng:u.lng,reward:f};St.push(m),y.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const b={lat:ze[0],lng:ze[1]},_={lat:u.lat,lng:u.lng},T=Ct(b,_);if(T>Gt){alert(`Too far to open this gift.

Distance: ${Math.round(T)}m
Needed: ≤ ${Gt}m`);return}Fe.removeLayer(y),St=St.filter(Be=>Be.marker!==y);const{xp:G,tickets:A,cbs:U,cardId:ae,cardCount:ye}=f,he=[];G&&he.push(`+${G} XP`),A&&he.push(`+${A} ticket${A===1?"":"s"}`),U&&he.push(`+${U} CBS`),ae&&ye>0&&he.push(`+${ye} card${ye===1?"":"s"}`);const ge=he.length?he.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${ge}`);const ce={kind:"mystery",xp:G||0,tickets:A||0,cbs:U||0,cardId:ae||null,cardCount:ye||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:ce}))}catch{}}),y.addTo(Fe),sn=n}function zi(t){if(!K||!Fe||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!Fe.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>di)return Fe.removeLayer(l.marker),o+=1,!1;const f=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(f)&&f>pi?(Fe.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Fe.getLayers().length===0&&(sn=0)}function Ni(t){if(!K||!Ot||!t||nn)return;const n=window.L;if(!n)return;if(On){if(vt<xi||Math.random()>gi)return;vt=0}else{if(vt<yi)return;vt=0,On=!0}const o=Or(t,60,140),l=Ci(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:ze[0],lng:ze[1]},u={lat:o.lat,lng:o.lng},p=Ct(f,u);if(p>Gt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Gt}m`);return}Ot.removeLayer(c),nn=null,Tn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(Ot),nn=c}function Bi(t){const n=window.L;if(!n||!K||!t)return;const o=Gt;Pt?(Pt.setLatLng(t),Pt.setRadius(o)):Pt=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(K)}function Ii(t){const n=window.L;if(!n||!K)return;const o=_i(n);if(Qe?(Qe.setIcon(o),Qe.setLatLng(t)):(Qe=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(K),K.setView(t,19)),et?(et.setIcon(lr(n,wt)),et.setLatLng(t)):et=n.marker(t,{icon:lr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(K),Qe&&Qe.bringToFront&&Qe.bringToFront(),et&&et.bringToFront&&et.bringToFront(),Bi(t),Ve&&!ct&&K)try{const l=K.getZoom()||19;let c=t;Number.isFinite(wt)&&(c=mi(t,40,wt));const f=K.getCenter(),u=Ct({lat:f.lat,lng:f.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&K.setView(c,l)}catch{}}function Ur(){const t=window.L;return!t||!K?null:(Ue?(Xe&&!K.hasLayer(Ue)&&Ue.addTo(K),!Xe&&K.hasLayer(Ue)&&K.removeLayer(Ue)):(Ue=t.layerGroup(),Xe&&Ue.addTo(K)),Ue)}function Ti(t){if(!Array.isArray(t)||!K)return[];const n=K.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(f=>{if(!f||f.isMe||typeof f.lat!="number"||typeof f.lng!="number")return;const u=Math.round(f.lat*o)/o,p=Math.round(f.lng*o)/o,y=`${u}_${p}`;l.has(y)||l.set(y,[]),l.get(y).push(f)});const c=[];for(const[f,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||f,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,y=0;u.forEach(b=>{p+=b.lat,y+=b.lng});const x=p/u.length,m=y/u.length;c.push({id:`cluster_${f}`,lat:x,lng:m,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Pi(t){const n=window.L;if(!n||!K)return;const o=Ur();if(!o)return;if(!Xe){for(const[f,u]of He.entries())o.removeLayer(u),He.delete(f);return}const l=Ti(t),c=new Set;l.forEach(f=>{if(!f||typeof f.lat!="number"||typeof f.lng!="number")return;const u=f.id||`${f.lat},${f.lng}`;c.add(u);const p=[f.lat,f.lng];let y=He.get(u);if(y)y.setLatLng(p);else{const x=f.isCluster&&f.count>1?String(f.count):f.nickname||"Anon",m=Si(n,x,f.avatar,f.isCluster);y=n.marker(p,{icon:m,pane:"cbsgo-others-pane"});const b=f.isCluster&&f.count>1?`${f.count} CBS-GO explorers nearby`:`${f.nickname||"CBS-GO explorer"}`;y.bindPopup(b),y.addTo(o),He.set(u,y)}});for(const[f,u]of He.entries())c.has(f)||(o.removeLayer(u),He.delete(f))}function $i(){return`
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
        <span id="cbsgoWeatherLabel">${jr()}</span>
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
  `}function Oi(){try{K&&K.remove()}catch{}K=null,Qe=null,et=null,Pt=null,Ot=null,Fe=null,ze=null,ct=!1,Ve=!0,sn=0,vt=0,nn=null,On=!1,Ue=null,He.clear(),St=[]}function ji(){const t=window.L,n=ft("cbsgoMap");if(!t||!n)return!1;Oi();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));K=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=K.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=K.createPane("cbsgo-others-pane");c.style.zIndex="640";const f=K.createPane("cbsgo-loot-pane");f.style.zIndex="630";const u=K.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(K),K.setMaxBounds(o),K.setView([51.687,4.87],16),Ot=t.layerGroup().addTo(K),Fe=t.layerGroup().addTo(K),K.on("dragstart",()=>{Ve=!1}),K.on("zoomstart",()=>{Ve=!1}),!0}function Ri(){!navigator.geolocation||!K||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,f={lat:n,lng:o},u=ze?{lat:ze[0],lng:ze[1]}:null;if(ze=[n,o],Number.isFinite(c))wt=c;else if(u){const p=Ct(u,f);Number.isFinite(p)&&p>2&&(wt=hi(u,f))}if(Ii([n,o]),u){const p=Ct(u,f);if(Number.isFinite(p)&&p>1&&(vt+=p),Number.isFinite(p)&&p>20&&!Ve&&!ct&&K){Ve=!0;const y=K.getZoom()||19;K.setView([n,o],y)}}Ni(f),Ai(f),zi(f),vi(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Ui(){let t=0;const n=120,o=()=>{if(t++,!ft("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!ji()){_t("Could not init map. Refresh.");return}const c=ft("cbsgoCenterBtn");c&&(c.onclick=()=>{K&&ze&&(Ve=!0,ct=!1,K.setView(ze,19))});const f=ft("cbsgoCompassBtn");f&&(f.onclick=()=>{K&&(ct=!ct,ct?(Ve=!1,K.setView([51.687,4.87],3)):ze&&(Ve=!0,K.setView(ze,16)))});const u=ft("cbsgoOnlineToggleBtn");if(u){const p=()=>{Xe?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Xe=!Xe;const y=Ur();if(y&&K&&(Xe?K.hasLayer(y)||y.addTo(K):K.hasLayer(y)&&K.removeLayer(y)),p(),!Xe&&Ue){for(const[x,m]of He.entries())Ue.removeLayer(m);He.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const y=p?.detail?.players||[];Pi(y)})),Rr(),_t("Loading GPS…"),Ri()};o()}const Fi="cbsgo_cards_v1";function Gi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Yn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function qn(){const t=localStorage.getItem(Fi),n=Gi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function tt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Fr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Wi(){const t=Yn(),n=qn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Di(){const t=Yn(),n=qn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),f=Number.isFinite(c)&&c>0,u=Fr(l.rarity),p=f?u:"rgba(31,41,55,.9)",y=f?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=f?l.emoji||"🃏":"❓",m=f?tt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',b=tt(l.set||"Set"),_=f?`<div style="
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
            background:${y};
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
            ${b}
          </div>
        </div>
      `}).join("")}
    </div>
  `:`
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `}function Yi(){const t=Wi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
        ${Di()}
      </div>
    </div>
  `}function qi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Yi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const f=Yn(),u=new Map(f.map(x=>[x.id,x]));function p(x){const m=u.get(x);if(!m)return;const b=qn(),_=Number(b[x]||0),T=Number.isFinite(_)&&_>0,G=T?m.emoji||"🃏":"❓",A=T?m.name||"Card":"Unknown card",U=m.set||"Set",ae=m.rarity||"common",ye=Fr(ae),he={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[ae]||"Common",ge=document.createElement("div");ge.style.position="fixed",ge.style.inset="0",ge.style.display="flex",ge.style.alignItems="center",ge.style.justifyContent="center",ge.style.background="rgba(0,0,0,0.65)",ge.style.pointerEvents="auto",ge.style.zIndex="8600";const ce=document.createElement("div");ce.style.width="min(260px, 82vw)",ce.style.borderRadius="20px",ce.style.border=`1px solid ${ye}`,ce.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",ce.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",ce.style.padding="16px 14px 14px 14px",ce.style.textAlign="center",ce.style.color="#fff",ce.style.fontFamily="system-ui,sans-serif",ce.style.opacity="0",ce.style.transform="translateY(14px) scale(0.96)",ce.style.transition="opacity .2s ease-out, transform .2s ease-out";const Be=T?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',rt=T?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
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
    `,ge.appendChild(ce),document.body.appendChild(ge),requestAnimationFrame(()=>{ce.style.opacity="1",ce.style.transform="translateY(0) scale(1)"});const Ge=()=>{ce.style.opacity="0",ce.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(ge)},200)},je=ce.querySelector("#cbsgoCardPreviewCloseBtn");je&&(je.onclick=Ge),ge.addEventListener("click",ot=>{ot.target===ge&&Ge()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const m=x.getAttribute("data-card-id");m&&p(m)})})}function Ki(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Hi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function Xi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Bn={exports:{}};const Vi={},Zi=Object.freeze(Object.defineProperty({__proto__:null,default:Vi},Symbol.toStringTag,{value:"Module"})),Ji=Hi(Zi);var cr;function Qi(){return cr||(cr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),f=new Uint8Array(32);f[0]=9;var u=o(),p=o([1]),y=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),m=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),b=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),T=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function G(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var g,h=0;for(g=0;g<s;g++)h|=r[a+g]^i[e+g];return(1&h-1>>>8)-1}function U(r,a,i,e){return A(r,a,i,e,16)}function ae(r,a,i,e){return A(r,a,i,e,32)}function ye(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,F=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,N=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,pe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,I=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,te=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ee=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,W=g,B=h,O=k,R=L,z=F,w=N,v=pe,E=I,S=H,C=X,M=te,q=ee,ne=V,oe=J,re=Z,d,se=0;se<20;se+=2)d=P+q|0,R^=d<<7|d>>>25,d=R+P|0,E^=d<<9|d>>>23,d=E+R|0,q^=d<<13|d>>>19,d=q+E|0,P^=d<<18|d>>>14,d=z+W|0,S^=d<<7|d>>>25,d=S+z|0,ne^=d<<9|d>>>23,d=ne+S|0,W^=d<<13|d>>>19,d=W+ne|0,z^=d<<18|d>>>14,d=C+w|0,oe^=d<<7|d>>>25,d=oe+C|0,B^=d<<9|d>>>23,d=B+oe|0,w^=d<<13|d>>>19,d=w+B|0,C^=d<<18|d>>>14,d=re+M|0,O^=d<<7|d>>>25,d=O+re|0,v^=d<<9|d>>>23,d=v+O|0,M^=d<<13|d>>>19,d=M+v|0,re^=d<<18|d>>>14,d=P+O|0,W^=d<<7|d>>>25,d=W+P|0,B^=d<<9|d>>>23,d=B+W|0,O^=d<<13|d>>>19,d=O+B|0,P^=d<<18|d>>>14,d=z+R|0,w^=d<<7|d>>>25,d=w+z|0,v^=d<<9|d>>>23,d=v+w|0,R^=d<<13|d>>>19,d=R+v|0,z^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=re+oe|0,q^=d<<7|d>>>25,d=q+re|0,ne^=d<<9|d>>>23,d=ne+q|0,oe^=d<<13|d>>>19,d=oe+ne|0,re^=d<<18|d>>>14;P=P+s|0,W=W+g|0,B=B+h|0,O=O+k|0,R=R+L|0,z=z+F|0,w=w+N|0,v=v+pe|0,E=E+I|0,S=S+H|0,C=C+X|0,M=M+te|0,q=q+ee|0,ne=ne+V|0,oe=oe+J|0,re=re+Z|0,r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=W>>>0&255,r[5]=W>>>8&255,r[6]=W>>>16&255,r[7]=W>>>24&255,r[8]=B>>>0&255,r[9]=B>>>8&255,r[10]=B>>>16&255,r[11]=B>>>24&255,r[12]=O>>>0&255,r[13]=O>>>8&255,r[14]=O>>>16&255,r[15]=O>>>24&255,r[16]=R>>>0&255,r[17]=R>>>8&255,r[18]=R>>>16&255,r[19]=R>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=q>>>0&255,r[49]=q>>>8&255,r[50]=q>>>16&255,r[51]=q>>>24&255,r[52]=ne>>>0&255,r[53]=ne>>>8&255,r[54]=ne>>>16&255,r[55]=ne>>>24&255,r[56]=oe>>>0&255,r[57]=oe>>>8&255,r[58]=oe>>>16&255,r[59]=oe>>>24&255,r[60]=re>>>0&255,r[61]=re>>>8&255,r[62]=re>>>16&255,r[63]=re>>>24&255}function he(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,F=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,N=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,pe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,I=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,te=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ee=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,W=g,B=h,O=k,R=L,z=F,w=N,v=pe,E=I,S=H,C=X,M=te,q=ee,ne=V,oe=J,re=Z,d,se=0;se<20;se+=2)d=P+q|0,R^=d<<7|d>>>25,d=R+P|0,E^=d<<9|d>>>23,d=E+R|0,q^=d<<13|d>>>19,d=q+E|0,P^=d<<18|d>>>14,d=z+W|0,S^=d<<7|d>>>25,d=S+z|0,ne^=d<<9|d>>>23,d=ne+S|0,W^=d<<13|d>>>19,d=W+ne|0,z^=d<<18|d>>>14,d=C+w|0,oe^=d<<7|d>>>25,d=oe+C|0,B^=d<<9|d>>>23,d=B+oe|0,w^=d<<13|d>>>19,d=w+B|0,C^=d<<18|d>>>14,d=re+M|0,O^=d<<7|d>>>25,d=O+re|0,v^=d<<9|d>>>23,d=v+O|0,M^=d<<13|d>>>19,d=M+v|0,re^=d<<18|d>>>14,d=P+O|0,W^=d<<7|d>>>25,d=W+P|0,B^=d<<9|d>>>23,d=B+W|0,O^=d<<13|d>>>19,d=O+B|0,P^=d<<18|d>>>14,d=z+R|0,w^=d<<7|d>>>25,d=w+z|0,v^=d<<9|d>>>23,d=v+w|0,R^=d<<13|d>>>19,d=R+v|0,z^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=re+oe|0,q^=d<<7|d>>>25,d=q+re|0,ne^=d<<9|d>>>23,d=ne+q|0,oe^=d<<13|d>>>19,d=oe+ne|0,re^=d<<18|d>>>14;r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=re>>>0&255,r[13]=re>>>8&255,r[14]=re>>>16&255,r[15]=re>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function ge(r,a,i,e){ye(r,a,i,e)}function ce(r,a,i,e){he(r,a,i,e)}var Be=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function rt(r,a,i,e,s,g,h){var k=new Uint8Array(16),L=new Uint8Array(64),F,N;for(N=0;N<16;N++)k[N]=0;for(N=0;N<8;N++)k[N]=g[N];for(;s>=64;){for(ge(L,k,h,Be),N=0;N<64;N++)r[a+N]=i[e+N]^L[N];for(F=1,N=8;N<16;N++)F=F+(k[N]&255)|0,k[N]=F&255,F>>>=8;s-=64,a+=64,e+=64}if(s>0)for(ge(L,k,h,Be),N=0;N<s;N++)r[a+N]=i[e+N]^L[N];return 0}function Ge(r,a,i,e,s){var g=new Uint8Array(16),h=new Uint8Array(64),k,L;for(L=0;L<16;L++)g[L]=0;for(L=0;L<8;L++)g[L]=e[L];for(;i>=64;){for(ge(h,g,s,Be),L=0;L<64;L++)r[a+L]=h[L];for(k=1,L=8;L<16;L++)k=k+(g[L]&255)|0,g[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(ge(h,g,s,Be),L=0;L<i;L++)r[a+L]=h[L];return 0}function je(r,a,i,e,s){var g=new Uint8Array(32);ce(g,e,s,Be);for(var h=new Uint8Array(8),k=0;k<8;k++)h[k]=e[k+16];return Ge(r,a,i,h,g)}function ot(r,a,i,e,s,g,h){var k=new Uint8Array(32);ce(k,g,h,Be);for(var L=new Uint8Array(8),F=0;F<8;F++)L[F]=g[F+16];return rt(r,a,i,e,s,L,k)}var it=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,h,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,h=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|h<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(h>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};it.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,h,k,L,F,N,pe,I,H,X,te,ee,V,J,Z,P,W,B,O=this.h[0],R=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],q=this.h[9],ne=this.r[0],oe=this.r[1],re=this.r[2],d=this.r[3],se=this.r[4],ue=this.r[5],xe=this.r[6],ie=this.r[7],fe=this.r[8],de=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,O+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,R+=(s>>>13|g<<3)&8191,h=r[a+4]&255|(r[a+5]&255)<<8,z+=(g>>>10|h<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(h>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,F=r[a+10]&255|(r[a+11]&255)<<8,S+=(L>>>14|F<<2)&8191,N=r[a+12]&255|(r[a+13]&255)<<8,C+=(F>>>11|N<<5)&8191,pe=r[a+14]&255|(r[a+15]&255)<<8,M+=(N>>>8|pe<<8)&8191,q+=pe>>>5|e,I=0,H=I,H+=O*ne,H+=R*(5*de),H+=z*(5*fe),H+=w*(5*ie),H+=v*(5*xe),I=H>>>13,H&=8191,H+=E*(5*ue),H+=S*(5*se),H+=C*(5*d),H+=M*(5*re),H+=q*(5*oe),I+=H>>>13,H&=8191,X=I,X+=O*oe,X+=R*ne,X+=z*(5*de),X+=w*(5*fe),X+=v*(5*ie),I=X>>>13,X&=8191,X+=E*(5*xe),X+=S*(5*ue),X+=C*(5*se),X+=M*(5*d),X+=q*(5*re),I+=X>>>13,X&=8191,te=I,te+=O*re,te+=R*oe,te+=z*ne,te+=w*(5*de),te+=v*(5*fe),I=te>>>13,te&=8191,te+=E*(5*ie),te+=S*(5*xe),te+=C*(5*ue),te+=M*(5*se),te+=q*(5*d),I+=te>>>13,te&=8191,ee=I,ee+=O*d,ee+=R*re,ee+=z*oe,ee+=w*ne,ee+=v*(5*de),I=ee>>>13,ee&=8191,ee+=E*(5*fe),ee+=S*(5*ie),ee+=C*(5*xe),ee+=M*(5*ue),ee+=q*(5*se),I+=ee>>>13,ee&=8191,V=I,V+=O*se,V+=R*d,V+=z*re,V+=w*oe,V+=v*ne,I=V>>>13,V&=8191,V+=E*(5*de),V+=S*(5*fe),V+=C*(5*ie),V+=M*(5*xe),V+=q*(5*ue),I+=V>>>13,V&=8191,J=I,J+=O*ue,J+=R*se,J+=z*d,J+=w*re,J+=v*oe,I=J>>>13,J&=8191,J+=E*ne,J+=S*(5*de),J+=C*(5*fe),J+=M*(5*ie),J+=q*(5*xe),I+=J>>>13,J&=8191,Z=I,Z+=O*xe,Z+=R*ue,Z+=z*se,Z+=w*d,Z+=v*re,I=Z>>>13,Z&=8191,Z+=E*oe,Z+=S*ne,Z+=C*(5*de),Z+=M*(5*fe),Z+=q*(5*ie),I+=Z>>>13,Z&=8191,P=I,P+=O*ie,P+=R*xe,P+=z*ue,P+=w*se,P+=v*d,I=P>>>13,P&=8191,P+=E*re,P+=S*oe,P+=C*ne,P+=M*(5*de),P+=q*(5*fe),I+=P>>>13,P&=8191,W=I,W+=O*fe,W+=R*ie,W+=z*xe,W+=w*ue,W+=v*se,I=W>>>13,W&=8191,W+=E*d,W+=S*re,W+=C*oe,W+=M*ne,W+=q*(5*de),I+=W>>>13,W&=8191,B=I,B+=O*de,B+=R*fe,B+=z*ie,B+=w*xe,B+=v*ue,I=B>>>13,B&=8191,B+=E*se,B+=S*d,B+=C*re,B+=M*oe,B+=q*ne,I+=B>>>13,B&=8191,I=(I<<2)+I|0,I=I+H|0,H=I&8191,I=I>>>13,X+=I,O=H,R=X,z=te,w=ee,v=V,E=J,S=Z,C=P,M=W,q=B,a+=16,i-=16;this.h[0]=O,this.h[1]=R,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=q},it.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,h;if(this.leftover){for(h=this.leftover,this.buffer[h++]=1;h<16;h++)this.buffer[h]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,h=2;h<10;h++)this.h[h]+=e,e=this.h[h]>>>13,this.h[h]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,h=1;h<10;h++)i[h]=this.h[h]+e,e=i[h]>>>13,i[h]&=8191;for(i[9]-=8192,s=(e^1)-1,h=0;h<10;h++)i[h]&=s;for(s=~s,h=0;h<10;h++)this.h[h]=this.h[h]&s|i[h];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,h=1;h<8;h++)g=(this.h[h]+this.pad[h]|0)+(g>>>16)|0,this.h[h]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},it.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function At(r,a,i,e,s,g){var h=new it(g);return h.update(i,e,s),h.finish(r,a),0}function at(r,a,i,e,s,g){var h=new Uint8Array(16);return At(h,0,i,e,s,g),U(r,a,h,0)}function Ie(r,a,i,e,s){var g;if(i<32)return-1;for(ot(r,0,a,0,i,e,s),At(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function ut(r,a,i,e,s){var g,h=new Uint8Array(32);if(i<32||(je(h,0,32,e,s),at(a,16,a,32,i-32,h)!==0))return-1;for(ot(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function Re(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function Ye(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function Ze(r,a){var i,e,s,g=o(),h=o();for(i=0;i<16;i++)h[i]=a[i];for(xt(h),xt(h),xt(h),e=0;e<2;e++){for(g[0]=h[0]-65517,i=1;i<15;i++)g[i]=h[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=h[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,Ye(h,g,1-s)}for(i=0;i<16;i++)r[2*i]=h[i]&255,r[2*i+1]=h[i]>>8}function zt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Ze(i,r),Ze(e,a),ae(i,0,e,0)}function gt(r){var a=new Uint8Array(32);return Ze(a,r),a[0]&1}function qe(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Te(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Pe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function le(r,a,i){var e,s,g=0,h=0,k=0,L=0,F=0,N=0,pe=0,I=0,H=0,X=0,te=0,ee=0,V=0,J=0,Z=0,P=0,W=0,B=0,O=0,R=0,z=0,w=0,v=0,E=0,S=0,C=0,M=0,q=0,ne=0,oe=0,re=0,d=i[0],se=i[1],ue=i[2],xe=i[3],ie=i[4],fe=i[5],de=i[6],Se=i[7],be=i[8],we=i[9],ve=i[10],_e=i[11],Ee=i[12],Me=i[13],Le=i[14],Ae=i[15];e=a[0],g+=e*d,h+=e*se,k+=e*ue,L+=e*xe,F+=e*ie,N+=e*fe,pe+=e*de,I+=e*Se,H+=e*be,X+=e*we,te+=e*ve,ee+=e*_e,V+=e*Ee,J+=e*Me,Z+=e*Le,P+=e*Ae,e=a[1],h+=e*d,k+=e*se,L+=e*ue,F+=e*xe,N+=e*ie,pe+=e*fe,I+=e*de,H+=e*Se,X+=e*be,te+=e*we,ee+=e*ve,V+=e*_e,J+=e*Ee,Z+=e*Me,P+=e*Le,W+=e*Ae,e=a[2],k+=e*d,L+=e*se,F+=e*ue,N+=e*xe,pe+=e*ie,I+=e*fe,H+=e*de,X+=e*Se,te+=e*be,ee+=e*we,V+=e*ve,J+=e*_e,Z+=e*Ee,P+=e*Me,W+=e*Le,B+=e*Ae,e=a[3],L+=e*d,F+=e*se,N+=e*ue,pe+=e*xe,I+=e*ie,H+=e*fe,X+=e*de,te+=e*Se,ee+=e*be,V+=e*we,J+=e*ve,Z+=e*_e,P+=e*Ee,W+=e*Me,B+=e*Le,O+=e*Ae,e=a[4],F+=e*d,N+=e*se,pe+=e*ue,I+=e*xe,H+=e*ie,X+=e*fe,te+=e*de,ee+=e*Se,V+=e*be,J+=e*we,Z+=e*ve,P+=e*_e,W+=e*Ee,B+=e*Me,O+=e*Le,R+=e*Ae,e=a[5],N+=e*d,pe+=e*se,I+=e*ue,H+=e*xe,X+=e*ie,te+=e*fe,ee+=e*de,V+=e*Se,J+=e*be,Z+=e*we,P+=e*ve,W+=e*_e,B+=e*Ee,O+=e*Me,R+=e*Le,z+=e*Ae,e=a[6],pe+=e*d,I+=e*se,H+=e*ue,X+=e*xe,te+=e*ie,ee+=e*fe,V+=e*de,J+=e*Se,Z+=e*be,P+=e*we,W+=e*ve,B+=e*_e,O+=e*Ee,R+=e*Me,z+=e*Le,w+=e*Ae,e=a[7],I+=e*d,H+=e*se,X+=e*ue,te+=e*xe,ee+=e*ie,V+=e*fe,J+=e*de,Z+=e*Se,P+=e*be,W+=e*we,B+=e*ve,O+=e*_e,R+=e*Ee,z+=e*Me,w+=e*Le,v+=e*Ae,e=a[8],H+=e*d,X+=e*se,te+=e*ue,ee+=e*xe,V+=e*ie,J+=e*fe,Z+=e*de,P+=e*Se,W+=e*be,B+=e*we,O+=e*ve,R+=e*_e,z+=e*Ee,w+=e*Me,v+=e*Le,E+=e*Ae,e=a[9],X+=e*d,te+=e*se,ee+=e*ue,V+=e*xe,J+=e*ie,Z+=e*fe,P+=e*de,W+=e*Se,B+=e*be,O+=e*we,R+=e*ve,z+=e*_e,w+=e*Ee,v+=e*Me,E+=e*Le,S+=e*Ae,e=a[10],te+=e*d,ee+=e*se,V+=e*ue,J+=e*xe,Z+=e*ie,P+=e*fe,W+=e*de,B+=e*Se,O+=e*be,R+=e*we,z+=e*ve,w+=e*_e,v+=e*Ee,E+=e*Me,S+=e*Le,C+=e*Ae,e=a[11],ee+=e*d,V+=e*se,J+=e*ue,Z+=e*xe,P+=e*ie,W+=e*fe,B+=e*de,O+=e*Se,R+=e*be,z+=e*we,w+=e*ve,v+=e*_e,E+=e*Ee,S+=e*Me,C+=e*Le,M+=e*Ae,e=a[12],V+=e*d,J+=e*se,Z+=e*ue,P+=e*xe,W+=e*ie,B+=e*fe,O+=e*de,R+=e*Se,z+=e*be,w+=e*we,v+=e*ve,E+=e*_e,S+=e*Ee,C+=e*Me,M+=e*Le,q+=e*Ae,e=a[13],J+=e*d,Z+=e*se,P+=e*ue,W+=e*xe,B+=e*ie,O+=e*fe,R+=e*de,z+=e*Se,w+=e*be,v+=e*we,E+=e*ve,S+=e*_e,C+=e*Ee,M+=e*Me,q+=e*Le,ne+=e*Ae,e=a[14],Z+=e*d,P+=e*se,W+=e*ue,B+=e*xe,O+=e*ie,R+=e*fe,z+=e*de,w+=e*Se,v+=e*be,E+=e*we,S+=e*ve,C+=e*_e,M+=e*Ee,q+=e*Me,ne+=e*Le,oe+=e*Ae,e=a[15],P+=e*d,W+=e*se,B+=e*ue,O+=e*xe,R+=e*ie,z+=e*fe,w+=e*de,v+=e*Se,E+=e*be,S+=e*we,C+=e*ve,M+=e*_e,q+=e*Ee,ne+=e*Me,oe+=e*Le,re+=e*Ae,g+=38*W,h+=38*B,k+=38*O,L+=38*R,F+=38*z,N+=38*w,pe+=38*v,I+=38*E,H+=38*S,X+=38*C,te+=38*M,ee+=38*q,V+=38*ne,J+=38*oe,Z+=38*re,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=F+s+65535,s=Math.floor(e/65536),F=e-s*65536,e=N+s+65535,s=Math.floor(e/65536),N=e-s*65536,e=pe+s+65535,s=Math.floor(e/65536),pe=e-s*65536,e=I+s+65535,s=Math.floor(e/65536),I=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=F+s+65535,s=Math.floor(e/65536),F=e-s*65536,e=N+s+65535,s=Math.floor(e/65536),N=e-s*65536,e=pe+s+65535,s=Math.floor(e/65536),pe=e-s*65536,e=I+s+65535,s=Math.floor(e/65536),I=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=h,r[2]=k,r[3]=L,r[4]=F,r[5]=N,r[6]=pe,r[7]=I,r[8]=H,r[9]=X,r[10]=te,r[11]=ee,r[12]=V,r[13]=J,r[14]=Z,r[15]=P}function j(r,a){le(r,a,a)}function D(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)j(i,i),e!==2&&e!==4&&le(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)j(i,i),e!==1&&le(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function $(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,h,k=o(),L=o(),F=o(),N=o(),pe=o(),I=o();for(h=0;h<31;h++)e[h]=a[h];for(e[31]=a[31]&127|64,e[0]&=248,qe(s,i),h=0;h<16;h++)L[h]=s[h],N[h]=k[h]=F[h]=0;for(k[0]=N[0]=1,h=254;h>=0;--h)g=e[h>>>3]>>>(h&7)&1,Ye(k,L,g),Ye(F,N,g),Te(pe,k,F),Pe(k,k,F),Te(F,L,N),Pe(L,L,N),j(N,pe),j(I,k),le(k,F,k),le(F,L,pe),Te(pe,k,F),Pe(k,k,F),j(L,k),Pe(F,N,I),le(k,F,y),Te(k,k,N),le(F,F,k),le(k,N,I),le(N,L,s),j(L,pe),Ye(k,L,g),Ye(F,N,g);for(h=0;h<16;h++)s[h+16]=k[h],s[h+32]=F[h],s[h+48]=L[h],s[h+64]=N[h];var H=s.subarray(32),X=s.subarray(16);return D(H,H),le(X,X,H),Ze(r,X),0}function Q(r,a){return $(r,a,f)}function me(r,a){return l(a,32),Q(r,a)}function ke(r,a,i){var e=new Uint8Array(32);return $(e,i,a),ce(r,c,e,Be)}var Ce=Ie,yt=ut;function gn(r,a,i,e,s,g){var h=new Uint8Array(32);return ke(h,s,g),Ce(r,a,i,e,h)}function We(r,a,i,e,s,g){var h=new Uint8Array(32);return ke(h,s,g),yt(r,a,i,e,h)}var Je=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Xn(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),h,k,L,F,N,pe,I,H,X,te,ee,V,J,Z,P,W,B,O,R,z,w,v,E,S,C,M,q=r[0],ne=r[1],oe=r[2],re=r[3],d=r[4],se=r[5],ue=r[6],xe=r[7],ie=a[0],fe=a[1],de=a[2],Se=a[3],be=a[4],we=a[5],ve=a[6],_e=a[7],Ee=0;e>=128;){for(R=0;R<16;R++)z=8*R+Ee,s[R]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],g[R]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(R=0;R<80;R++)if(h=q,k=ne,L=oe,F=re,N=d,pe=se,I=ue,H=xe,X=ie,te=fe,ee=de,V=Se,J=be,Z=we,P=ve,W=_e,w=xe,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(d>>>14|be<<18)^(d>>>18|be<<14)^(be>>>9|d<<23),v=(be>>>14|d<<18)^(be>>>18|d<<14)^(d>>>9|be<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=d&se^~d&ue,v=be&we^~be&ve,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=Je[R*2],v=Je[R*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[R%16],v=g[R%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,B=C&65535|M<<16,O=E&65535|S<<16,w=B,v=O,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(q>>>28|ie<<4)^(ie>>>2|q<<30)^(ie>>>7|q<<25),v=(ie>>>28|q<<4)^(q>>>2|ie<<30)^(q>>>7|ie<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=q&ne^q&oe^ne&oe,v=ie&fe^ie&de^fe&de,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,H=C&65535|M<<16,W=E&65535|S<<16,w=F,v=V,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=B,v=O,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,F=C&65535|M<<16,V=E&65535|S<<16,ne=h,oe=k,re=L,d=F,se=N,ue=pe,xe=I,q=H,fe=X,de=te,Se=ee,be=V,we=J,ve=Z,_e=P,ie=W,R%16===15)for(z=0;z<16;z++)w=s[z],v=g[z],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(z+9)%16],v=g[(z+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,B=s[(z+1)%16],O=g[(z+1)%16],w=(B>>>1|O<<31)^(B>>>8|O<<24)^B>>>7,v=(O>>>1|B<<31)^(O>>>8|B<<24)^(O>>>7|B<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,B=s[(z+14)%16],O=g[(z+14)%16],w=(B>>>19|O<<13)^(O>>>29|B<<3)^B>>>6,v=(O>>>19|B<<13)^(B>>>29|O<<3)^(O>>>6|B<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[z]=C&65535|M<<16,g[z]=E&65535|S<<16;w=q,v=ie,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[0]=q=C&65535|M<<16,a[0]=ie=E&65535|S<<16,w=ne,v=fe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[1]=ne=C&65535|M<<16,a[1]=fe=E&65535|S<<16,w=oe,v=de,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[2]=oe=C&65535|M<<16,a[2]=de=E&65535|S<<16,w=re,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[3]=re=C&65535|M<<16,a[3]=Se=E&65535|S<<16,w=d,v=be,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[4]=d=C&65535|M<<16,a[4]=be=E&65535|S<<16,w=se,v=we,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[5]=se=C&65535|M<<16,a[5]=we=E&65535|S<<16,w=ue,v=ve,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[6]=ue=C&65535|M<<16,a[6]=ve=E&65535|S<<16,w=xe,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[7]=xe=C&65535|M<<16,a[7]=_e=E&65535|S<<16,Ee+=128,e-=128}return e}function st(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),h,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Xn(e,s,a,i),i%=128,h=0;h<i;h++)g[h]=a[k-i+h];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,G(g,i-8,k/536870912|0,k<<3),Xn(e,s,g,i),h=0;h<8;h++)G(r,8*h,e[h],s[h]);return 0}function Kt(r,a){var i=o(),e=o(),s=o(),g=o(),h=o(),k=o(),L=o(),F=o(),N=o();Pe(i,r[1],r[0]),Pe(N,a[1],a[0]),le(i,i,N),Te(e,r[0],r[1]),Te(N,a[0],a[1]),le(e,e,N),le(s,r[3],a[3]),le(s,s,m),le(g,r[2],a[2]),Te(g,g,g),Pe(h,e,i),Pe(k,g,s),Te(L,g,s),Te(F,e,i),le(r[0],h,k),le(r[1],F,L),le(r[2],L,k),le(r[3],h,F)}function Vn(r,a,i){var e;for(e=0;e<4;e++)Ye(r[e],a[e],i)}function yn(r,a){var i=o(),e=o(),s=o();D(s,a[2]),le(i,a[0],s),le(e,a[1],s),Ze(r,e),r[31]^=gt(i)<<7}function bn(r,a,i){var e,s;for(Re(r[0],u),Re(r[1],p),Re(r[2],p),Re(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Vn(r,a,e),Kt(a,r),Kt(r,r),Vn(r,a,e)}function Ht(r,a){var i=[o(),o(),o(),o()];Re(i[0],b),Re(i[1],_),Re(i[2],p),le(i[3],b,_),bn(r,i,a)}function hn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),st(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Ht(s,e),yn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function mn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function wn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;mn(r,a)}function Zn(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),h=new Uint8Array(64),k,L,F=new Float64Array(64),N=[o(),o(),o(),o()];st(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var pe=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(st(h,r.subarray(32),i+32),wn(h),Ht(N,h),yn(r,N),k=32;k<64;k++)r[k]=e[k];for(st(g,r,i+64),wn(g),k=0;k<64;k++)F[k]=0;for(k=0;k<32;k++)F[k]=h[k];for(k=0;k<32;k++)for(L=0;L<32;L++)F[k+L]+=g[k]*s[L];return mn(r.subarray(32),F),pe}function Qr(r,a){var i=o(),e=o(),s=o(),g=o(),h=o(),k=o(),L=o();return Re(r[2],p),qe(r[1],a),j(s,r[1]),le(g,s,x),Pe(s,s,r[2]),Te(g,r[2],g),j(h,g),j(k,h),le(L,k,h),le(i,L,s),le(i,i,g),Y(i,i),le(i,i,s),le(i,i,g),le(i,i,g),le(r[0],i,g),j(e,r[0]),le(e,e,g),zt(e,s)&&le(r[0],r[0],T),j(e,r[0]),le(e,e,g),zt(e,s)?-1:(gt(r[0])===a[31]>>7&&Pe(r[0],u,r[0]),le(r[3],r[0],r[1]),0)}function vn(r,a,i,e){var s,g=new Uint8Array(32),h=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||Qr(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(st(h,r,i),wn(h),bn(k,L,h),Ht(L,a.subarray(32)),Kt(k,L),yn(g,k),i-=64,ae(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var _n=32,Vt=24,Nt=32,bt=16,Bt=32,Zt=32,It=32,Tt=32,Sn=32,Jn=Vt,eo=Nt,to=bt,Ke=64,lt=32,ht=64,kn=32,Cn=64;n.lowlevel={crypto_core_hsalsa20:ce,crypto_stream_xor:ot,crypto_stream:je,crypto_stream_salsa20_xor:rt,crypto_stream_salsa20:Ge,crypto_onetimeauth:At,crypto_onetimeauth_verify:at,crypto_verify_16:U,crypto_verify_32:ae,crypto_secretbox:Ie,crypto_secretbox_open:ut,crypto_scalarmult:$,crypto_scalarmult_base:Q,crypto_box_beforenm:ke,crypto_box_afternm:Ce,crypto_box:gn,crypto_box_open:We,crypto_box_keypair:me,crypto_hash:st,crypto_sign:Zn,crypto_sign_keypair:hn,crypto_sign_open:vn,crypto_secretbox_KEYBYTES:_n,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:Nt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:Bt,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:It,crypto_box_SECRETKEYBYTES:Tt,crypto_box_BEFORENMBYTES:Sn,crypto_box_NONCEBYTES:Jn,crypto_box_ZEROBYTES:eo,crypto_box_BOXZEROBYTES:to,crypto_sign_BYTES:Ke,crypto_sign_PUBLICKEYBYTES:lt,crypto_sign_SECRETKEYBYTES:ht,crypto_sign_SEEDBYTES:kn,crypto_hash_BYTES:Cn,gf:o,D:x,L:Xt,pack25519:Ze,unpack25519:qe,M:le,A:Te,S:j,Z:Pe,pow2523:Y,add:Kt,set25519:Re,modL:mn,scalarmult:bn,scalarbase:Ht};function Qn(r,a){if(r.length!==_n)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function no(r,a){if(r.length!==It)throw new Error("bad public key size");if(a.length!==Tt)throw new Error("bad secret key size")}function Oe(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function er(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Oe(r,a,i),Qn(i,a);for(var e=new Uint8Array(Nt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+Nt]=r[g];return Ie(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){Oe(r,a,i),Qn(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+bt]=r[g];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(Nt)},n.secretbox.keyLength=_n,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if(Oe(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==Bt)throw new Error("bad p size");var i=new Uint8Array(Bt);return $(i,r,a),i},n.scalarMult.base=function(r){if(Oe(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(Bt);return Q(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=Bt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Oe(r,a),no(r,a);var i=new Uint8Array(Sn);return ke(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(It),a=new Uint8Array(Tt);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Oe(r),r.length!==Tt)throw new Error("bad secret key size");var a=new Uint8Array(It);return Q(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=It,n.box.secretKeyLength=Tt,n.box.sharedKeyLength=Sn,n.box.nonceLength=Jn,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Oe(r,a),a.length!==ht)throw new Error("bad secret key size");var i=new Uint8Array(Ke+r.length);return Zn(i,r,r.length,a),i},n.sign.open=function(r,a){if(Oe(r,a),a.length!==lt)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=vn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ke),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Oe(r,a,i),a.length!==Ke)throw new Error("bad signature size");if(i.length!==lt)throw new Error("bad public key size");var e=new Uint8Array(Ke+r.length),s=new Uint8Array(Ke+r.length),g;for(g=0;g<Ke;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+Ke]=r[g];return vn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(lt),a=new Uint8Array(ht);return hn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Oe(r),r.length!==ht)throw new Error("bad secret key size");for(var a=new Uint8Array(lt),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Oe(r),r.length!==kn)throw new Error("bad seed size");for(var a=new Uint8Array(lt),i=new Uint8Array(ht),e=0;e<32;e++)i[e]=r[e];return hn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=lt,n.sign.secretKeyLength=ht,n.sign.seedLength=kn,n.sign.signatureLength=Ke,n.hash=function(r){Oe(r);var a=new Uint8Array(Cn);return st(a,r,r.length),a},n.hash.hashLength=Cn,n.verify=function(r,a){return Oe(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];er(g)})}else typeof Xi<"u"&&(r=Ji,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];er(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Bn)),Bn.exports}var ea=Qi();const ta=Ki(ea);function na(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const m=t.charAt(x),b=m.charCodeAt(0);if(n[b]!==255)throw new TypeError(m+" is ambiguous");n[b]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),f=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let m=0,b=0,_=0;const T=x.length;for(;_!==T&&x[_]===0;)_++,m++;const G=(T-_)*f+1>>>0,A=new Uint8Array(G);for(;_!==T;){let ye=x[_],he=0;for(let ge=G-1;(ye!==0||he<b)&&ge!==-1;ge--,he++)ye+=256*A[ge]>>>0,A[ge]=ye%o>>>0,ye=ye/o>>>0;if(ye!==0)throw new Error("Non-zero carry");b=he,_++}let U=G-b;for(;U!==G&&A[U]===0;)U++;let ae=l.repeat(m);for(;U<G;++U)ae+=t.charAt(A[U]);return ae}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let m=0,b=0,_=0;for(;x[m]===l;)b++,m++;const T=(x.length-m)*c+1>>>0,G=new Uint8Array(T);for(;m<x.length;){const ye=x.charCodeAt(m);if(ye>255)return;let he=n[ye];if(he===255)return;let ge=0;for(let ce=T-1;(he!==0||ge<_)&&ce!==-1;ce--,ge++)he+=o*G[ce]>>>0,G[ce]=he%256>>>0,he=he/256>>>0;if(he!==0)throw new Error("Non-zero carry");_=ge,m++}let A=T-_;for(;A!==T&&G[A]===0;)A++;const U=new Uint8Array(b+(T-A));let ae=b;for(;A!==T;)U[ae++]=G[A++];return U}function y(x){const m=p(x);if(m)return m;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:y}}var ra="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const fr=na(ra),Kn="cbsgo_wallet_v3",un="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(Kn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function oa(t){localStorage.setItem(Kn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function ia(){const t=ta.sign.keyPair(),n=fr.encode(t.publicKey),o=fr.encode(t.secretKey);return{pk:n,sk:o}}function Gr(){return!!qt()}function aa(){return qt()?sessionStorage.getItem(un)==="1":!1}function sa(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=ia();return oa({pk:l,sk:c,pin:n}),sessionStorage.setItem(un,"1"),l}function la(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(un,"1"),n.pk}function De(){const t=qt();return t?t.pk:""}function ca(){localStorage.removeItem(Kn),sessionStorage.removeItem(un)}typeof window<"u"&&(window.cbsgoDevResetWallet=ca);const Wr="cbsgoLoginModal";function Dr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Yr(){const t=document.getElementById(Wr);t&&t.remove()}function fa(t){Yr();const n=document.createElement("div");return n.id=Wr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function da(t,n){return`
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
      ">${Dr(t)}</div>

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
  `}function dr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function pa(){const t=!Gr();let n="";try{const m=Yt();t?m&&m!=="Sovereign"?n=m:n="":n=m||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Dr(n)}" style="${Jt()}" placeholder="Kevin" />
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
        <button id="cbsgoCreateBtn" type="button" style="${dr(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${dr(!0)}">Unlock</button>
      </div>
    `,l=fa(da(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),f=m=>{c&&(c.textContent=m||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),y=l.querySelector("#cbsgoNick"),x=()=>{Yr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const m=l.querySelector("#cbsgoCreateBtn");m&&(m.onclick=async()=>{try{const b=String(y?.value||"").trim(),_=String(u?.value||"").trim(),T=String(p?.value||"").trim();if(b.length<2)return f("⛔ Nickname too short.");if(_.length<4)return f("⛔ PIN must be at least 4 digits.");if(_!==T)return f("⛔ PINs do not match.");f("Creating wallet…"),$r(b),await sa(_),f("✅ Wallet created. Starting…"),x()}catch(b){f(`⛔ ${String(b?.message||b)}`)}})}else{const m=l.querySelector("#cbsgoUnlockBtn");m&&(m.onclick=async()=>{try{const b=String(u?.value||"").trim();if(b.length<4)return f("⛔ PIN must be at least 4 digits.");f("Unlocking…"),await la(b),f("✅ Unlocked."),x()}catch{f("⛔ Wrong PIN (or wallet data missing).")}})}}const ua="https://cxfedvowjgkqrakkkjpi.supabase.co",xa="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",$e=ro(ua,xa);function ga(){const t=De();if(!t)return null;const n=Yt(),o=Dn();return{wallet_pk:t,nickname:n,avatar:o}}async function rn(t={}){try{const n=ga();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await $e.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ya=15e3,ba=1e4,ha=300*1e3;let $t=null,pr=0,ur=0;function ma(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||($t={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",ma));async function wa(){const t=De();if(!t||!$t)return;const n=Date.now();if(n-pr<5e3)return;pr=n;const l=(Yt()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:$t.lat,lng:$t.lng,heading:$t.heading,last_seen:new Date().toISOString()};try{const{data:f,error:u}=await $e.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(f&&f.length>0){const p=f[0].id,{error:y}=await $e.from("player_state").update(c).eq("id",p);y&&console.warn("CBS GO: player_state update failed",y)}else{const{error:p}=await $e.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(f){console.warn("CBS GO: pushMyState error",f)}}async function va(){const t=De();if(!t)return;const n=Date.now();if(n-ur<3e3)return;ur=n;const o=new Date(Date.now()-ha).toISOString();try{const{data:l,error:c}=await $e.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const f=Array.isArray(l)?l:[],u=Array.from(new Set(f.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:m}=await $e.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);m?console.warn("CBS GO: fetch player profiles failed",m):Array.isArray(x)&&(p=new Map(x.map(b=>[b.wallet_pk,b])))}const y=f.map(x=>{const m=x.lat,b=x.lng,_=typeof m=="number"?m:parseFloat(m),T=typeof b=="number"?b:parseFloat(b);if(!Number.isFinite(_)||!Number.isFinite(T))return null;const G=p.get(x.wallet_pk)||null,A=G&&G.nickname||x.nickname||"Anon",U=G&&G.avatar?String(G.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:U,lat:_,lng:T,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:y}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function _a(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{wa()},ya),setInterval(()=>{va()},ba))}_a();function qr(){const t=De();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function ln(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Sa(t){const n=qr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await $e.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw ln("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function ka(t){const n=qr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await $e.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw ln("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Ca(){const t=De();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await $e.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw ln("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],f=[];for(const p of l){const y=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!y&&!x)continue;const m=p.a_wallet===t?p.b_wallet:p.a_wallet,b={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:m,nickname:null,avatar:""};y&&c.push(b),x&&f.push(b)}const u=Array.from(new Set([...c,...f].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:y}=await $e.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!y&&Array.isArray(p)){const x=new Map;for(const b of p)b.wallet_pk&&x.set(String(b.wallet_pk),{nickname:b.nickname||null,avatar:b.avatar||""});const m=b=>{b.forEach(_=>{const T=x.get(_.otherWallet);T&&(_.nickname=T.nickname||null,_.avatar=T.avatar||"")})};m(c),m(f)}else y&&ln("loadFriendsOverview:players",y)}return{incoming:c,accepted:f}}let Rt=null;async function Kr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Rt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Rt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Ea(){try{Rt&&(await Rt.release(),Rt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Ma(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Kr():await Ea()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function La(){const t=De();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Aa(t){return String(t||"").trim()}async function Hr(t,n={}){const o=La(),l=Aa(t),c=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),f=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0))),u=n.cardId?String(n.cardId||"").trim():"",p=Math.max(0,Math.floor(Number(n.cardQty!=null?n.cardQty:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!c&&!f&&!p)throw new Error("Set tickets, CBS and/or cards above 0.");if(p>0&&!u)throw new Error("Select a card to send.");if(c>0&&Cr()<c)throw new Error("Not enough tickets in your bag.");if(f>0&&Er()<f)throw new Error("Not enough CBS (play money) in your bag.");if(p>0&&vo(u)<p)throw new Error("Not enough of that card in your collection.");let y=0,x=0,m=null,b=0;try{c>0&&(ho(c),y=c),f>0&&(mo(f),x=f),p>0&&u&&(_o(u,p),m=u,b=p);const{error:_}=await $e.from("trades").insert({from_wallet:o,to_wallet:l,tickets:c||0,cbs:f||0,card_id:u||null,card_qty:p||null,status:"sent"});if(_)throw y>0&&Lt(y),x>0&&dn(x),m&&b>0&&Mr(m,b),console.warn("CBS GO sendGiftToWallet Supabase error",_),new Error(_.message||"Could not save gift to Supabase (permissions or network issue).");if(typeof window<"u")try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftSent",{detail:{toWallet:l,tickets:c,cbs:f,cardId:u||null,cardQty:p||0}}))}catch(T){console.warn("CBS GO: dispatch friendGiftSent failed",T)}return{ok:!0}}catch(_){throw _ instanceof Error?_:new Error(String(_?.message||_)||"Failed to send gift.")}}async function Hn(){const t=De();if(t)try{const{data:n,error:o}=await $e.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const f=Array.from(new Set(n.map(u=>u&&u.from_wallet).filter(u=>typeof u=="string"&&u.trim().length>0)));if(f.length>0){const{data:u,error:p}=await $e.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",f);!p&&Array.isArray(u)?l=new Map(u.filter(y=>y&&y.wallet_pk).map(y=>[String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""}])):p&&console.warn("CBS GO pullIncomingGifts players error",p)}}catch(f){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",f)}const c=[];for(const f of n){if(!f)continue;const u=Number(f.tickets||0),p=Number(f.cbs||0),y=f.card_id?String(f.card_id||"").trim():"",x=Math.max(0,Number(f.card_qty||0));if(u>0&&Lt(u),p>0&&dn(p),y&&x>0&&Mr(y,x),(u>0||p>0||y&&x>0)&&typeof window<"u"){const m=l.get(f.from_wallet)||{nickname:null,avatar:""},b={id:f.id||null,fromWallet:f.from_wallet||"",toWallet:f.to_wallet||"",tickets:u,cbs:p,cardId:y||null,cardQty:x||0,createdAt:f.created_at||null,senderNickname:m.nickname||null,senderAvatar:m.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:b}))}catch(_){console.warn("CBS GO: dispatch friendGiftReceived failed",_)}}f.id&&c.push(f.id)}if(c.length>0){const{error:f}=await $e.from("trades").update({status:"claimed"}).in("id",c);f&&console.warn("CBS GO pullIncomingGifts update status error",f)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0,l=null,c=0)=>Hr(t,{tickets:n,cbs:o,cardId:l,cardQty:c}),window.cbsgoPullGifts=Hn);function pt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Xr(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}function za(){try{const t=localStorage.getItem("cbsgo_cards_v1");if(!t)return{};const n=JSON.parse(t),o={};if(n&&n.counts&&typeof n.counts=="object"){for(const[l,c]of Object.entries(n.counts)){const f=Number(c||0);Number.isFinite(f)&&f>0&&(o[l]=f)}return o}if(Array.isArray(n.cards)){for(const l of n.cards){if(!l||!l.id)continue;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=(o[l.id]||0)+c)}return o}return o}catch{return{}}}function Na(){const t=za();let n=0,o=0;return Object.values(t).forEach(l=>{const c=Number(l||0);Number.isFinite(c)&&c>0&&(n+=1,o+=c)}),{cardTypes:n,cardTotal:o}}function xn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Rn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function xr(t,n){return`
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
  `}function Ba(){const t=Yt(),n=Dn(),o=De();return`
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
        ${Xr(n,64)}

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
  `}function Ia(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const U=document.querySelector("#profileMsg");U&&(U.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const f=()=>{if(!t)return;const A=$r(t.value);c(`✅ Name saved: ${A}`);try{rn()}catch(U){console.warn("CBS GO: failed to sync profile after name change",U)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(f,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),f()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const U=new FileReader;U.onload=()=>{oi(String(U.result||"")),c("✅ Photo saved"),Et();try{rn()}catch(ae){console.warn("CBS GO: failed to sync profile after avatar change",ae)}},U.onerror=()=>c("⛔ Failed to read image."),U.readAsDataURL(A)}),o&&(o.onclick=()=>{ii(),c("✅ Photo removed"),Et();try{rn()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),y=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),m=document.querySelector("#friendsAcceptedList"),b=A=>{y&&(y.textContent=A||"")},_=A=>{if(!A)return"";const U=String(A);return U.length<=12?U:`${U.slice(0,5)}…${U.slice(-4)}`},T=(A,U="")=>{const ae=A.nickname&&A.nickname.trim()?A.nickname.trim():_(A.otherWallet),ye=_(A.otherWallet);return`
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
          ${Xr(A.avatar||"",32)}
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
    `};async function G(){if(!(!x||!m))try{x.textContent="Loading…",m.textContent="Loading…";const A=await Ca();A.incoming.length?x.innerHTML=A.incoming.map(U=>{const ae=`
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
            `;return T(U,ae)}).join(""):x.textContent="No incoming requests.",A.accepted.length?m.innerHTML=A.accepted.map(U=>T(U,`
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
            `)).join(""):m.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(U=>{U.addEventListener("click",async()=>{const ae=U.getAttribute("data-friend-id");if(ae){b("Accepting friend…"),U.disabled=!0;try{await ka(ae),b("✅ Friend added."),await G()}catch(ye){console.warn(ye),b(`⛔ ${ye.message||ye}`),U.disabled=!1}}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",m.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){b("Enter a wallet address first.");return}b("Sending friend request…"),p.disabled=!0;try{await Sa(A),b("✅ Friend request sent."),u.value="",await G()}catch(U){console.warn(U),b(`⛔ ${U.message||U}`)}finally{p.disabled=!1}}),G().catch(()=>{})}function Ta(){const t=Cr(),n=Er(),o=De(),{cardTypes:l,cardTotal:c}=Na();return`
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

          <div style="font-size:11px;opacity:.8;margin-top:4px;">
            ${l>0?`You own <b>${c}</b> cards (${l} different). Card sending will be added later.`:"You don't have any cards yet to send."}
          </div>
        </div>
      </div>
    </section>
  `}function Pa(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{qi()}catch(b){console.warn("CBS GO: openCardsPanel failed",b)}});const l=De(),c=document.querySelector("#giftWalletInput"),f=document.querySelector("#giftTicketsInput"),u=document.querySelector("#giftCbsInput"),p=document.querySelector("#giftSendBtn"),y=document.querySelector("#giftMsg"),x=b=>{y&&(y.textContent=b||"")};if(p&&c&&p.addEventListener("click",async()=>{const b=c.value.trim(),_=f?.value??"",T=u?.value??"",G=Number(_||"0"),A=Number(T||"0");if(!b){x("Enter a wallet address first.");return}if((!G||G<=0)&&(!A||A<=0)){x("Set tickets and/or CBS above 0.");return}p.disabled=!0,x("Sending gift…");try{await Hr(b,{tickets:G,cbs:A}),x("✅ Gift sent."),f&&(f.value=""),u&&(u.value="")}catch(U){console.warn(U),x(`⛔ ${U.message||"Could not send gift."}`)}finally{p.disabled=!1}}),!t||!l)return;const m=b=>{n&&(n.textContent=b||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),m("✅ Wallet address copied to clipboard.")):m("📋 Copy not supported in this browser.")}catch{m("⛔ Failed to copy address.")}},Hn().catch(()=>{})}function Vr(){const t=xn();return t==="profile"?xr("Profile",`<div id="profileMount">${Ba()}</div>`):t==="bag"?xr("Bag",`<div id="bagMount">${Ta()}</div>`):""}function $a(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${$i()}
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Vr();const n=xn();n==="profile"&&Ia(),n==="bag"&&Pa();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Rn("map"),Et()})}function Oa(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=xn();Rn(o===n?"map":n||"map"),Et()})})}function gr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=$a();try{Kr(),Ma()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{rn()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Oa(),Ui(),ni(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Ir())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Br())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{xn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let y=p.querySelector(".cbsgoToastBox");y||(y=document.createElement("div"),y.className="cbsgoToastBox",y.style.pointerEvents="auto",y.style.padding="8px 12px",y.style.borderRadius="999px",y.style.border="1px solid rgba(255,255,255,.25)",y.style.background="rgba(10,12,18,.88)",y.style.backdropFilter="blur(10px)",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.fontSize="11px",y.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",y.style.opacity="0",y.style.transform="translateY(10px)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(y)),y.textContent=u||"",y.style.opacity="1",y.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{y.style.opacity="0",y.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},y=Number(p.xp||0),x=Number(p.tickets||0),m=Number(p.cbs||0);if(!y&&!x&&!m)return;const b=[];y&&b.push(`+${y} XP`),x&&b.push(`+${x} ticket${x===1?"":"s"}`),m&&b.push(`+${m} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${b.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const y=Number(u?.steps||0),x=Number(u?.goal||0),m=u?.dayKey||"",b=document.createElement("div");b.style.position="fixed",b.style.inset="0",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.background="rgba(5,7,11,0.80)",b.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const T=x?`${y}/${x} steps`:`${y} steps`;_.innerHTML=`
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
        ${T}
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
    `,b.appendChild(_),p.appendChild(b),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const G=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=G),b.addEventListener("click",U=>{U.target===b&&G()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const y=Number(u?.xp||0),x=Number(u?.tickets||0),m=Number(u?.cbs||0);if(!y&&!x&&!m)return;p.innerHTML="";const b=document.createElement("div");b.style.position="fixed",b.style.inset="0",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.background="rgba(5,7,11,0.75)",b.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const T=[];y&&T.push(`+${y} XP`),x&&T.push(`+${x} ticket${x===1?"":"s"}`),m&&T.push(`+${m} CBS`),_.innerHTML=`
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
        ${pt(T.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,b.appendChild(_),p.appendChild(b),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function f(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const y=Number(u?.days||7),x=Number(u?.rewardCbs||0),m=document.createElement("div");m.style.position="fixed",m.style.inset="0",m.style.display="flex",m.style.alignItems="center",m.style.justifyContent="center",m.style.background="rgba(5,7,11,0.80)",m.style.pointerEvents="auto";const b=document.createElement("div");b.style.width="min(340px, 92vw)",b.style.borderRadius="22px",b.style.border="1px solid rgba(251,191,36,.85)",b.style.background="rgba(10,12,18,0.98)",b.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",b.style.padding="20px 18px 16px 18px",b.style.textAlign="center",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.opacity="0",b.style.transform="translateY(14px) scale(0.96)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",b.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${y}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${y} days in a row.
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
    `,m.appendChild(b),p.appendChild(m),requestAnimationFrame(()=>{b.style.opacity="1",b.style.transform="translateY(0) scale(1)"});const _=()=>{b.style.opacity="0",b.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},T=document.getElementById("cbsgoStreakCloseBtn");T&&(T.onclick=_),m.addEventListener("click",G=>{G.target===m&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{f(u?.detail||{})})),Et(),Tr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ri)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Tn({id:"__daily__",name:"Daily Glow"});return}if(vr(p))return;const y=fo.find(x=>x.id===p);y&&Tn(y)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&ao(async()=>{const{completeNode:y}=await Promise.resolve().then(()=>xo);return{completeNode:y}},void 0).then(({completeNode:y})=>{y(p),Zr()})})),Hn().catch(()=>{})}function Zr(){if(!document.querySelector("#app"))return;if(Gr()&&aa()){gr();return}pa();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),gr()};window.addEventListener("cbsgo:loginDone",n)}function Jr(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function cn(t){const n=Jr();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";cn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{cn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function yr(){try{if(!document.getElementById("app")){cn("❌ #app not found in index.html");return}Zr();const n=Jr();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){cn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",yr,{once:!0}):yr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
