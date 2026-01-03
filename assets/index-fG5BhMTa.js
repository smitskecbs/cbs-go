import{createClient as lo}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const u of f.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(c){if(c.ep)return;c.ep=!0;const f=o(c);fetch(c.href,f)}})();const co="modulepreload",fo=function(t){return"/cbs-go/"+t},or={},po=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let y=function(x){return Promise.all(x.map(m=>Promise.resolve(m).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=y(o.map(x=>{if(x=fo(x),x in or)return;or[x]=!0;const m=x.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${g}`))return;const _=document.createElement("link");if(_.rel=m?"stylesheet":co,m||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),m)return new Promise((N,G)=>{_.addEventListener("load",N),_.addEventListener("error",()=>G(new Error(`Unable to preload CSS for ${x}`)))})}))}function f(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&f(p.reason);return n().catch(f)})},On="cbsgoLevelUpOverlay",ir="cbsgoLevelUpStyles",Nn="https://smitskecbs.github.io/cbs-go/";function uo(){if(document.getElementById(ir))return;const t=document.createElement("style");t.id=ir,t.textContent=`
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
  `,document.head.appendChild(t)}function zn(){const t=document.getElementById(On);t&&t.remove()}function xo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const f=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${f}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function ar(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function go(t){uo(),zn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=On,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${ar(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${ar(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&xo(c);const f=()=>zn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),y=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),m=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=f),p&&(p.onclick=f),y&&(y.onclick=()=>{const g=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Nn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(g)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Nn),m&&(m.textContent="✅ Link copied. Share it with your friends.")}catch{m&&(m.textContent="Could not copy link. You can share it manually: "+Nn)}}),setTimeout(()=>{document.getElementById(On)&&zn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{go(t?.detail||{})}));const yo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],vr="cbsgo_state_v6";function bo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function mo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ut(){const t=localStorage.getItem(vr);return bo(t,mo())}function _r(t){t.updatedAt=Date.now(),localStorage.setItem(vr,JSON.stringify(t))}function Dn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function un(){return Number(Ut().xp||0)}function Gt(){const t=un();let n=1,o=t;for(;;){const l=Dn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function Sr(){const t=un();let n=1,o=t;for(;;){const l=Dn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function kr(){return Dn(Gt())}function Dt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ut();const o=Gt(),l=Ut();l.xp=Number(l.xp||0)+n,_r(l);const c=Gt();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function Cr(t){const n=String(t||"");if(!n)return!1;const o=Ut();return!!(o.completed&&o.completed[n])}function Er(t){const n=String(t||"");if(!n)return;const o=Ut();o.completed||(o.completed={}),o.completed[n]=Date.now(),_r(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const ho=Object.freeze(Object.defineProperty({__proto__:null,addXp:Dt,completeNode:Er,getLevel:Gt,getXp:un,getXpIntoLevel:Sr,getXpNeededThisLevel:kr,isNodeCompleted:Cr},Symbol.toStringTag,{value:"Module"})),Mr="cbsgoPuzzleModal";function wo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Bn(){const t=document.getElementById(Mr);t&&t.remove()}function jn(t){Bn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],f=180,u=18,p=l.length,y=.01;let x=[],m=null,g=0,_=u,N=!1,G=!1,A=null;const R=t?.name||"CBS GO Puzzle",ee=document.createElement("div");ee.id=Mr,ee.style.position="fixed",ee.style.inset="0",ee.style.zIndex="999999",ee.style.display="flex",ee.style.alignItems="center",ee.style.justifyContent="center",ee.style.padding="16px",ee.style.background="rgba(0,0,0,.70)",ee.style.backdropFilter="blur(12px)",ee.style.fontFamily="system-ui, sans-serif",ee.style.color="#fff",ee.innerHTML=`
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
          ${wo(R)}
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
  `,document.body.appendChild(ee);const fe=document.getElementById("cbsgoBoard"),xe=document.getElementById("cbsgoScore"),re=document.getElementById("cbsgoMoves"),te=document.getElementById("cbsgoStatus"),he=document.getElementById("cbsgoPuzzleClose"),Qe=document.getElementById("cbsgoPuzzleOk"),je=document.getElementById("cbsgoConfettiLayer");function Fe(j){te&&(te.textContent=j||"")}function it(){if(!je)return;je.style.display="block",je.innerHTML="";const j=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],D=40;for(let Y=0;Y<D;Y++){const P=document.createElement("div"),J=6+Math.floor(Math.random()*6),we=Math.random()*100,Ce=Math.random()*.6,Ee=1+Math.random()*.6,yt=Math.random()*360;P.style.position="absolute",P.style.top="-10%",P.style.left=`${we}%`,P.style.width=`${J}px`,P.style.height=`${J*2}px`,P.style.background=j[Y%j.length],P.style.opacity="0.9",P.style.borderRadius="2px",P.style.transform=`rotate(${yt}deg)`,P.style.animation=`cbsgoConfettiFall ${Ee}s ease-out ${Ce}s forwards`,je.appendChild(P)}}function at(){return Math.floor(Math.random()*l.length)}function Nt(){x=[];for(let j=0;j<n;j++){const D=[];for(let Y=0;Y<o;Y++)Math.random()<y?D.push(p):D.push(at());x.push(D)}}function st(j){return j===p}function Te(){if(fe){fe.innerHTML="";for(let j=0;j<n;j++)for(let D=0;D<o;D++){const Y=x[j][D],P=document.createElement("div");P.dataset.row=String(j),P.dataset.col=String(D),P.style.borderRadius="12px",P.style.display="flex",P.style.alignItems="center",P.style.justifyContent="center",P.style.cursor=G?"default":"pointer",P.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",P.style.fontSize="20px",st(Y)?(P.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",P.textContent="💥"):(P.style.background=l[Y]||"#444",P.textContent=c[Y]||"⬛"),m&&m.row===j&&m.col===D&&(P.style.outline="2px solid #fff",P.style.outlineOffset="2px"),P.addEventListener("click",()=>{Pe(j,D)}),P.addEventListener("touchstart",J=>{if(G)return;const we=J.touches[0];A={row:j,col:D,x:we.clientX,y:we.clientY}}),P.addEventListener("touchend",J=>{if(!A||G)return;const we=J.changedTouches[0],Ce=we.clientX-A.x,Ee=we.clientY-A.y;if(Math.sqrt(Ce*Ce+Ee*Ee)<18){Pe(j,D),A=null;return}let De=A.row,et=A.col;Math.abs(Ce)>Math.abs(Ee)?Ce>0?et+=1:et-=1:Ee>0?De+=1:De-=1,De>=0&&De<n&&et>=0&&et<o&&$e(A.row,A.col,De,et),A=null,J.preventDefault()}),fe.appendChild(P)}}}function ut(j,D){if(!j||!D)return!1;const Y=Math.abs(j.row-D.row),P=Math.abs(j.col-D.col);return Y+P===1}function Ue(j,D){const Y=x[j.row][j.col];x[j.row][j.col]=x[D.row][D.col],x[D.row][D.col]=Y}function xt(){const j=new Set;for(let D=0;D<n;D++){let Y=x[D][0],P=0;for(let J=1;J<=o;J++){const we=J<o?x[D][J]:null;if(we===Y)continue;const Ce=J-P;if(Y!=null&&Ce>=3)for(let Ee=P;Ee<J;Ee++)j.add(`${D},${Ee}`);Y=we,P=J}}for(let D=0;D<o;D++){let Y=x[0][D],P=0;for(let J=1;J<=n;J++){const we=J<n?x[J][D]:null;if(we===Y)continue;const Ce=J-P;if(Y!=null&&Ce>=3)for(let Ee=P;Ee<J;Ee++)j.add(`${Ee},${D}`);Y=we,P=J}}return j}function qe(j){if(!j||!j.size)return 0;const D=j.size;g+=D*4,xe&&(xe.textContent=String(g)),!G&&g>=f&&gt(!0);for(const Y of j){const[P,J]=Y.split(","),we=Number(P),Ce=Number(J);x[we][Ce]=null}for(let Y=0;Y<o;Y++){let P=n-1;for(let J=n-1;J>=0;J--)x[J][Y]!=null&&(x[P][Y]=x[J][Y],P--);for(let J=P;J>=0;J--)Math.random()<y?x[J][Y]=p:x[J][Y]=at()}return D}function Je(j,D){const Y=new Set;for(let P=0;P<o;P++)Y.add(`${j},${P}`);for(let P=0;P<n;P++)Y.add(`${P},${D}`);qe(Y),Te(),G||setTimeout(()=>zt(!1),120)}function zt(j=!1){if(G)return;N=!0;const D=()=>{if(G){N=!0;return}const Y=xt();if(!Y.size){N=!1,Te(),j&&!G&&(_<=0?He():Fe("Nice! Keep matching."));return}qe(Y),Te(),setTimeout(D,120)};D()}function gt(j){if(!G)if(G=!0,N=!0,j){Fe("Great job! Puzzle completed 🎉");try{t?.id&&Er(t.id),Dt(10)}catch{}it(),setTimeout(()=>{Bn()},1600)}else Fe("Out of moves. Try again next time 🙂")}function He(){g>=f?gt(!0):_<=0&&gt(!1)}function $e(j,D,Y,P){if(N||G)return;if(_<=0){He();return}const J={row:j,col:D},we={row:Y,col:P};if(!ut(J,we))return;const Ce=x[j][D],Ee=x[Y][P],yt=st(Ce)||st(Ee);if(Ue(J,we),m=null,_--,re&&(re.textContent=String(_)),yt){Te();const De=st(x[j][D])?{row:j,col:D}:{row:Y,col:P};Je(De.row,De.col),He();return}if(!xt().size){Ue(J,we),Te(),Fe("No match… try another swap."),He();return}Fe(""),Te(),zt(!0)}function Pe(j,D){if(N||G)return;if(_<=0){He();return}const Y={row:j,col:D};if(!m){m=Y,Te();return}if(m.row===j&&m.col===D){m=null,Te();return}if(!ut(m,Y)){m=Y,Te();return}$e(m.row,m.col,Y.row,Y.col)}function de(){Bn()}he&&(he.onclick=de),Qe&&(Qe.onclick=()=>{de()}),Nt(),Te(),Fe("Tap or swipe two neighboring tiles to swap them.")}const Lr="cbsgo_inventory_v2";function vo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function _o(){return{tickets:0,cbs:0,cards:{}}}function Ie(){const t=localStorage.getItem(Lr),n=vo(t,_o());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Mt(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Lr,JSON.stringify(n))}function Ar(){return Number(Ie().tickets||0)}function Nr(){return Number(Ie().cbs||0)}function Lt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ie();const o=Ie();return o.tickets=Number(o.tickets||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function xn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ie();const o=Ie();return o.cbs=Number(o.cbs||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function So(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ie();const o=Ie(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function ko(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ie();const o=Ie(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function zr(){return{...Ie().cards||{}}}function Co(t){const n=String(t||"").trim();if(!n)return 0;const o=zr();return Number(o[n]||0)}function Yn(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Ie();const c=Ie();return c.cards||(c.cards={}),c.cards[o]=Number(c.cards[o]||0)+l,Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}function Eo(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Ie();const c=Ie();if(!c.cards||typeof c.cards[o]!="number")throw new Error("Not enough of that card in your collection.");const f=Number(c.cards[o]||0);if(f<l)throw new Error("Not enough of that card in your collection.");return c.cards[o]=f-l,c.cards[o]<=0&&delete c.cards[o],Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}const Br="cbsgo_steps_v6",Mo="cbsgo_steps_v5",Lo="cbsgo_gps_autostart_v2",Ir="cbsgo_daily_puzzle_v1",Ao=.75,kt=5e3,an=7,Rn=100,No=1e3,zo=.5,Bo=2e3,Io=4.5,In=1500,Tn=200,To=.25,$o=.05,Po=.3;let en=null,tn=!1,ht={msg:"init"};function Fn(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Tr="cbsgo_cards_v1",Oo=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function jo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Ro(t){return Oo.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Fo(){try{const t=localStorage.getItem(Tr),n=Fn(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const f=Number(c.count);Number.isFinite(f)&&f>0&&(o[l]=f)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Uo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,f]of Object.entries(n)){const u=Number(f||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Tr,JSON.stringify(l))}catch{}}function Go(t,n=1){const o=jo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const f={...Fo().counts||{}},p=Number(f[o]||0)+l;f[o]=p,Uo({counts:f});const y=Ro(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:f}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:y}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:y}}))}catch{}return{cardId:o,count:p,card:y}}function ot(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Wo(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,f=new Date(o,l-1,c);return Number.isNaN(f.getTime())?null:f}function Do(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function $r(t,n){const o=Wo(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const f=new Date(o.getTime());f.setDate(f.getDate()-c),l.push(Do(f))}return l}function sn(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:ot(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Yo(t){const n=ot();return!t||typeof t!="object"?sn():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function gn(t){t.updatedAt=Date.now(),localStorage.setItem(Br,JSON.stringify(t))}function qo(t,n){if(!n)return;const o=$r(n,an);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(xn(Rn),Yt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:an,rewardCbs:Rn,lastDayKey:n}})))}function sr(t){t=Yo(t||sn());const n=ot();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,qo(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,gn(t)}return t}function pt(){let t=localStorage.getItem(Br);if(!t){const o=localStorage.getItem(Mo);if(o){const l=Fn(o,sn()),c=sr(l);return gn(c),c}}const n=Fn(t,sn());return sr(n)}function nn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Ho()}}))}function qn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Yt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Hn(t,n,o,l){const c=Number(t||0),f=Number(n||0),u=0;if(!(!c&&!f&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:f,cbs:u,reason:l||"distance"}}))}catch{}}function Ho(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Ko(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Xo(){return Ko()/1e3}function Vo(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,c=t.dayKey||ot(),f=t.streak||{},p=$r(c,an).map(y=>{let x=!1;return y===c?x=l:x=!!f[y],{dateKey:y,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:an,rewardPerStreak:Rn}}function lr(){return!!tn}function Zo(){try{return localStorage.getItem(Ir)===ot()}catch{return!1}}function Qo(){try{localStorage.setItem(Ir,ot())}catch{}}function Jo(t,n){return Zo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:ot()}})),Qo(),!0)}function cr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function ei(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<In)return;const f=Math.floor(c/In);f<=0||(Lt(f),Yt(),Hn(0,f,0,"boost"),t.boostLastStep=o+f*In)}function ti(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Tn){t.chestMeters=n;return}let o=0;for(;n>=Tn&&o<5;)if(n-=Tn,o+=1,Math.random()<To){const l=Math.random()<$o,c=l?10:3,f=l?2:1;Dt(c),qn(),Lt(f),Yt();const u=l&&Math.random()<Po;Hn(c,f,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:f,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function ni(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),y=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(y))}function ri(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),f=Number(t.xpKmAwarded||0);if(c>f){const x=c-f;x>0&&(Dt(x),qn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),y=Number(t.ticketChunksAwarded||0);if(p>y){const x=p-y;x>0&&(Lt(x),Yt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Hn(o,l,0,"distance")}function oi(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/Ao);if(c>l){const f=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+f}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||ot(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),ri(o),ei(o),ti(o),gn(o),nn(),o}function ii(){en!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(en),en=null}async function fr(t={}){const n=!!t.silent;if(!navigator.geolocation)return ht={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Lo,"1")}catch{}ii(),tn=!0,ht={msg:"requesting",t:Date.now()};try{return en=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,f=o.coords.accuracy||999,u=Date.now(),p=pt(),y=p.lastPos;p.lastPos={lat:l,lng:c,t:u},gn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,m=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:f,heading:x,speed:m,t:u}})),f>No){ht={lat:l,lng:c,acc:f,t:u,reason:"accuracy",boostMs:cr()},nn();return}Jo(l,c);let g=0,_=0,N=0,G=0,A="no-last";y&&typeof y.lat=="number"&&typeof y.lng=="number"&&typeof y.t=="number"&&(g=ni({lat:y.lat,lng:y.lng},{lat:l,lng:c}),_=Math.max(1,(u-y.t)/1e3),N=g/_,g<zo?A="jitter":g>Bo?A="teleport":N>Io?A="too-fast":(oi(g),G=g,A="ok")),ht={lat:l,lng:c,acc:f,t:u,dist:Math.round(g),dt:Math.round(_),speed:Number.isFinite(N)?Number(N.toFixed(2)):0,added:Math.round(G),reason:A,boostMs:cr()},nn()},o=>{tn=!1,ht={err:o?.message||"GPS blocked",t:Date.now()},nn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return tn=!1,ht={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ai(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>lr()||await fr({silent:!0}))();const n=async()=>{lr()||await fr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Dt(o),qn()),(l>0||c>0)&&(l>0&&Lt(l),c>0&&xn(c),Yt());const f=n.cardId||n.card_id;if(f)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Go(f,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Pr(){const t=un(),n=Gt(),o=Sr(),l=kr(),c=Xo(),f=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function Or(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:f}=Vo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function jr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function si(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Rr="cbsgo_player_name_v2",Kn="cbsgo_player_avatar_v2";function At(){try{return localStorage.getItem(Rr)||"Sovereign"}catch{return"Sovereign"}}function Fr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Rr,n)}catch{}return n}function yn(){try{return localStorage.getItem(Kn)||""}catch{return""}}function li(t){const n=String(t||"");try{localStorage.setItem(Kn,n)}catch{}return n}function ci(){try{localStorage.removeItem(Kn)}catch{}}let H=null,tt=null,nt=null,Pt=null,jt=null,We=null,Be=null,wt=0,ft=!1,Ze=!0,Ge=null;const Xe=new Map;let Ve=!0,Rt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const fi="48a387bba00043ac4ba5823371abc9d2",Wt=80,di=6,pi=80,ui=220,xi=6e4,gi=5*6e4,yi=300,bi=.35,$n=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],mi=350,hi=.35,wi=120;let ln=0,vt=0,rn=null,Un=!1,St=[];function dt(t){return document.getElementById(t)}function _t(t){const n=dt("cbsgoMapHost");if(!n)return;let o=dt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function vi(){const t=String(At()||"").trim();return t?t[0].toUpperCase():"🙂"}function Gn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),y=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(y))}function Ur(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,f=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+f,lng:t.lng+u}}function _i(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),f=o(n.lng-t.lng),u=Math.sin(f)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(f);let y=Math.atan2(u,p);return y=y*180/Math.PI,y=(y+360)%360,y}function Si(t,n,o){const c=n/6371e3,f=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,y=Math.sin(u),x=Math.cos(u),m=Math.sin(c),g=Math.cos(c),_=Math.asin(y*g+x*m*Math.cos(f)),N=p+Math.atan2(Math.sin(f)*m*x,g-y*Math.sin(_));return[_*180/Math.PI,N*180/Math.PI]}function ki(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Gr(){const{temp:t,iconEmoji:n}=Rt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Wr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;ki();const{condition:n,isNight:o}=Rt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const f=[];for(let u=0;u<48;u++){const p=Math.random()*100,y=Math.random()*16-8,x=Math.random()*2.5,m=2+Math.random()*1.5;f.push(`
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
      `)}l=f.join("")}else l="";t.innerHTML=l}async function Ci(t,n){const o=Date.now();if(!(Rt.lastUpdated&&o-Rt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${fi}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const f=await c.json(),u=f?.main?.temp,p=f?.weather?.[0]?.icon||"01d",y=String(f?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),m="⛅",g="clear";p.startsWith("01")||p.startsWith("02")?g="clear":p.startsWith("03")||p.startsWith("04")?(m="☁️",g="clouds"):p.startsWith("09")||p.startsWith("10")?(m="🌧️",g="rain"):p.startsWith("11")?(m="⛈️",g="storm"):p.startsWith("13")?(m="❄️",g="snow"):p.startsWith("50")&&(m="🌫️",g="mist"),y.includes("rain")&&(g="rain"),y.includes("snow")&&(g="snow"),y.includes("thunder")&&(g="storm");try{const N=Number(f?.dt||0),G=Number(f?.timezone||0);if(N&&Number.isFinite(G)){const R=((N+G)/3600%24+24)%24;x=R<7||R>=19}}catch{}g==="clear"?m=x?"🌙":"☀️":g==="clouds"?m="☁️":g==="rain"?m="🌧️":g==="storm"?m="⛈️":g==="snow"?m="❄️":g==="mist"&&(m="🌫️"),Rt={temp:u,iconEmoji:m,condition:g,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Gr()),Wr()}catch(l){console.warn("Weather fetch failed",l)}}function Ei(t){const n=yn();if(n){const c=`
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
    ">${Gn(vi())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function dr(t,n){const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Mi(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Gn(o)}');
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
    ">${Gn(c)}</div>
  `;return t.divIcon({html:f,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function Li(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Ai(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Ni(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function zi(){if(!$n.length)return null;const t=Math.floor(Math.random()*$n.length);return $n[t]}function Bi(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let f=null,u=0;if(Math.random()<bi){const p=zi();p&&(f=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:f,cardCount:u}}function Ii(t){if(!H||!We||!t)return;const n=Date.now();if(n-ln<xi||We.getLayers().length>=di)return;const l=window.L;if(!l)return;const c=Ni(),f=Bi(c),u=Ur(t,pi,ui),p=Li(l),y=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),m={marker:y,createdAt:n,lat:u.lat,lng:u.lng,reward:f};St.push(m),y.on("click",()=>{if(!Be){alert("GPS not ready yet. Wait until your player marker appears.");return}const g={lat:Be[0],lng:Be[1]},_={lat:u.lat,lng:u.lng},N=Ct(g,_);if(N>Wt){alert(`Too far to open this gift.

Distance: ${Math.round(N)}m
Needed: ≤ ${Wt}m`);return}We.removeLayer(y),St=St.filter(he=>he.marker!==y);const{xp:G,tickets:A,cbs:R,cardId:ee,cardCount:fe}=f,xe=[];G&&xe.push(`+${G} XP`),A&&xe.push(`+${A} ticket${A===1?"":"s"}`),R&&xe.push(`+${R} CBS`),ee&&fe>0&&xe.push(`+${fe} card${fe===1?"":"s"}`);const re=xe.length?xe.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${re}`);const te={kind:"mystery",xp:G||0,tickets:A||0,cbs:R||0,cardId:ee||null,cardCount:fe||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:te}))}catch{}}),y.addTo(We),ln=n}function Ti(t){if(!H||!We||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!We.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>gi)return We.removeLayer(l.marker),o+=1,!1;const f=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(f)&&f>yi?(We.removeLayer(l.marker),o+=1,!1):!0}),o>0&&We.getLayers().length===0&&(ln=0)}function $i(t){if(!H||!jt||!t||rn)return;const n=window.L;if(!n)return;if(Un){if(vt<mi||Math.random()>hi)return;vt=0}else{if(vt<wi)return;vt=0,Un=!0}const o=Ur(t,60,140),l=Ai(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!Be){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:Be[0],lng:Be[1]},u={lat:o.lat,lng:o.lng},p=Ct(f,u);if(p>Wt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Wt}m`);return}jt.removeLayer(c),rn=null,jn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(jt),rn=c}function Pi(t){const n=window.L;if(!n||!H||!t)return;const o=Wt;Pt?(Pt.setLatLng(t),Pt.setRadius(o)):Pt=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(H)}function Oi(t){const n=window.L;if(!n||!H)return;const o=Ei(n);if(tt?(tt.setIcon(o),tt.setLatLng(t)):(tt=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(H),H.setView(t,19)),nt?(nt.setIcon(dr(n,wt)),nt.setLatLng(t)):nt=n.marker(t,{icon:dr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(H),tt&&tt.bringToFront&&tt.bringToFront(),nt&&nt.bringToFront&&nt.bringToFront(),Pi(t),Ze&&!ft&&H)try{const l=H.getZoom()||19;let c=t;Number.isFinite(wt)&&(c=Si(t,40,wt));const f=H.getCenter(),u=Ct({lat:f.lat,lng:f.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&H.setView(c,l)}catch{}}function Dr(){const t=window.L;return!t||!H?null:(Ge?(Ve&&!H.hasLayer(Ge)&&Ge.addTo(H),!Ve&&H.hasLayer(Ge)&&H.removeLayer(Ge)):(Ge=t.layerGroup(),Ve&&Ge.addTo(H)),Ge)}function ji(t){if(!Array.isArray(t)||!H)return[];const n=H.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(f=>{if(!f||f.isMe||typeof f.lat!="number"||typeof f.lng!="number")return;const u=Math.round(f.lat*o)/o,p=Math.round(f.lng*o)/o,y=`${u}_${p}`;l.has(y)||l.set(y,[]),l.get(y).push(f)});const c=[];for(const[f,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||f,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,y=0;u.forEach(g=>{p+=g.lat,y+=g.lng});const x=p/u.length,m=y/u.length;c.push({id:`cluster_${f}`,lat:x,lng:m,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Ri(t){const n=window.L;if(!n||!H)return;const o=Dr();if(!o)return;if(!Ve){for(const[f,u]of Xe.entries())o.removeLayer(u),Xe.delete(f);return}const l=ji(t),c=new Set;l.forEach(f=>{if(!f||typeof f.lat!="number"||typeof f.lng!="number")return;const u=f.id||`${f.lat},${f.lng}`;c.add(u);const p=[f.lat,f.lng];let y=Xe.get(u);if(y)y.setLatLng(p);else{const x=f.isCluster&&f.count>1?String(f.count):f.nickname||"Anon",m=Mi(n,x,f.avatar,f.isCluster);y=n.marker(p,{icon:m,pane:"cbsgo-others-pane"});const g=f.isCluster&&f.count>1?`${f.count} CBS-GO explorers nearby`:`${f.nickname||"CBS-GO explorer"}`;y.bindPopup(g),y.addTo(o),Xe.set(u,y)}});for(const[f,u]of Xe.entries())c.has(f)||(o.removeLayer(u),Xe.delete(f))}function Fi(){return`
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
        <span id="cbsgoWeatherLabel">${Gr()}</span>
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
  `}function Ui(){try{H&&H.remove()}catch{}H=null,tt=null,nt=null,Pt=null,jt=null,We=null,Be=null,ft=!1,Ze=!0,ln=0,vt=0,rn=null,Un=!1,Ge=null,Xe.clear(),St=[]}function Gi(){const t=window.L,n=dt("cbsgoMap");if(!t||!n)return!1;Ui();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));H=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=H.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=H.createPane("cbsgo-others-pane");c.style.zIndex="640";const f=H.createPane("cbsgo-loot-pane");f.style.zIndex="630";const u=H.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(H),H.setMaxBounds(o),H.setView([51.687,4.87],16),jt=t.layerGroup().addTo(H),We=t.layerGroup().addTo(H),H.on("dragstart",()=>{Ze=!1}),H.on("zoomstart",()=>{Ze=!1}),!0}function Wi(){!navigator.geolocation||!H||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,f={lat:n,lng:o},u=Be?{lat:Be[0],lng:Be[1]}:null;if(Be=[n,o],Number.isFinite(c))wt=c;else if(u){const p=Ct(u,f);Number.isFinite(p)&&p>2&&(wt=_i(u,f))}if(Oi([n,o]),u){const p=Ct(u,f);if(Number.isFinite(p)&&p>1&&(vt+=p),Number.isFinite(p)&&p>20&&!Ze&&!ft&&H){Ze=!0;const y=H.getZoom()||19;H.setView([n,o],y)}}$i(f),Ii(f),Ti(f),Ci(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Di(){let t=0;const n=120,o=()=>{if(t++,!dt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!Gi()){_t("Could not init map. Refresh.");return}const c=dt("cbsgoCenterBtn");c&&(c.onclick=()=>{H&&Be&&(Ze=!0,ft=!1,H.setView(Be,19))});const f=dt("cbsgoCompassBtn");f&&(f.onclick=()=>{H&&(ft=!ft,ft?(Ze=!1,H.setView([51.687,4.87],3)):Be&&(Ze=!0,H.setView(Be,16)))});const u=dt("cbsgoOnlineToggleBtn");if(u){const p=()=>{Ve?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Ve=!Ve;const y=Dr();if(y&&H&&(Ve?H.hasLayer(y)||y.addTo(H):H.hasLayer(y)&&H.removeLayer(y)),p(),!Ve&&Ge){for(const[x,m]of Xe.entries())Ge.removeLayer(m);Xe.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const y=p?.detail?.players||[];Ri(y)})),Wr(),_t("Loading GPS…"),Wi()};o()}const Yi="cbsgo_cards_v1";function qi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Xn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Vn(){const t=localStorage.getItem(Yi),n=qi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function rt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Yr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Hi(){const t=Xn(),n=Vn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Ki(){const t=Xn(),n=Vn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),f=Number.isFinite(c)&&c>0,u=Yr(l.rarity),p=f?u:"rgba(31,41,55,.9)",y=f?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=f?l.emoji||"🃏":"❓",m=f?rt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',g=rt(l.set||"Set"),_=f?`<div style="
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
          data-card-id="${rt(l.id)}"
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
            ${rt(x)}
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
            ${g}
          </div>
        </div>
      `}).join("")}
    </div>
  `:`
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `}function Xi(){const t=Hi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
        ${Ki()}
      </div>
    </div>
  `}function Vi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Xi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const f=Xn(),u=new Map(f.map(x=>[x.id,x]));function p(x){const m=u.get(x);if(!m)return;const g=Vn(),_=Number(g[x]||0),N=Number.isFinite(_)&&_>0,G=N?m.emoji||"🃏":"❓",A=N?m.name||"Card":"Unknown card",R=m.set||"Set",ee=m.rarity||"common",fe=Yr(ee),xe={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[ee]||"Common",re=document.createElement("div");re.style.position="fixed",re.style.inset="0",re.style.display="flex",re.style.alignItems="center",re.style.justifyContent="center",re.style.background="rgba(0,0,0,0.65)",re.style.pointerEvents="auto",re.style.zIndex="8600";const te=document.createElement("div");te.style.width="min(260px, 82vw)",te.style.borderRadius="20px",te.style.border=`1px solid ${fe}`,te.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",te.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",te.style.padding="16px 14px 14px 14px",te.style.textAlign="center",te.style.color="#fff",te.style.fontFamily="system-ui,sans-serif",te.style.opacity="0",te.style.transform="translateY(14px) scale(0.96)",te.style.transition="opacity .2s ease-out, transform .2s ease-out";const he=N?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',Qe=N?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;te.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${rt(R)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${fe};
          font-size:10px;
        ">
          ${rt(xe)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${fe};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${rt(G)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${rt(A)}
      </div>

      ${he}
      ${Qe}

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
    `,re.appendChild(te),document.body.appendChild(re),requestAnimationFrame(()=>{te.style.opacity="1",te.style.transform="translateY(0) scale(1)"});const je=()=>{te.style.opacity="0",te.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(re)},200)},Fe=te.querySelector("#cbsgoCardPreviewCloseBtn");Fe&&(Fe.onclick=je),re.addEventListener("click",it=>{it.target===re&&je()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const m=x.getAttribute("data-card-id");m&&p(m)})})}function Zi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Qi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function Ji(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Pn={exports:{}};const ea={},ta=Object.freeze(Object.defineProperty({__proto__:null,default:ea},Symbol.toStringTag,{value:"Module"})),na=Qi(ta);var pr;function ra(){return pr||(pr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),f=new Uint8Array(32);f[0]=9;var u=o(),p=o([1]),y=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),m=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),g=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),N=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function G(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var b,h=0;for(b=0;b<s;b++)h|=r[a+b]^i[e+b];return(1&h-1>>>8)-1}function R(r,a,i,e){return A(r,a,i,e,16)}function ee(r,a,i,e){return A(r,a,i,e,32)}function fe(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,U=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ge=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,K=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,Q=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,$=s,W=b,I=h,O=k,F=L,z=U,w=B,v=ge,E=T,S=K,C=X,M=oe,q=ne,ie=V,se=Q,ae=Z,d,ce=0;ce<20;ce+=2)d=$+q|0,F^=d<<7|d>>>25,d=F+$|0,E^=d<<9|d>>>23,d=E+F|0,q^=d<<13|d>>>19,d=q+E|0,$^=d<<18|d>>>14,d=z+W|0,S^=d<<7|d>>>25,d=S+z|0,ie^=d<<9|d>>>23,d=ie+S|0,W^=d<<13|d>>>19,d=W+ie|0,z^=d<<18|d>>>14,d=C+w|0,se^=d<<7|d>>>25,d=se+C|0,I^=d<<9|d>>>23,d=I+se|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ae+M|0,O^=d<<7|d>>>25,d=O+ae|0,v^=d<<9|d>>>23,d=v+O|0,M^=d<<13|d>>>19,d=M+v|0,ae^=d<<18|d>>>14,d=$+O|0,W^=d<<7|d>>>25,d=W+$|0,I^=d<<9|d>>>23,d=I+W|0,O^=d<<13|d>>>19,d=O+I|0,$^=d<<18|d>>>14,d=z+F|0,w^=d<<7|d>>>25,d=w+z|0,v^=d<<9|d>>>23,d=v+w|0,F^=d<<13|d>>>19,d=F+v|0,z^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=ae+se|0,q^=d<<7|d>>>25,d=q+ae|0,ie^=d<<9|d>>>23,d=ie+q|0,se^=d<<13|d>>>19,d=se+ie|0,ae^=d<<18|d>>>14;$=$+s|0,W=W+b|0,I=I+h|0,O=O+k|0,F=F+L|0,z=z+U|0,w=w+B|0,v=v+ge|0,E=E+T|0,S=S+K|0,C=C+X|0,M=M+oe|0,q=q+ne|0,ie=ie+V|0,se=se+Q|0,ae=ae+Z|0,r[0]=$>>>0&255,r[1]=$>>>8&255,r[2]=$>>>16&255,r[3]=$>>>24&255,r[4]=W>>>0&255,r[5]=W>>>8&255,r[6]=W>>>16&255,r[7]=W>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=O>>>0&255,r[13]=O>>>8&255,r[14]=O>>>16&255,r[15]=O>>>24&255,r[16]=F>>>0&255,r[17]=F>>>8&255,r[18]=F>>>16&255,r[19]=F>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=q>>>0&255,r[49]=q>>>8&255,r[50]=q>>>16&255,r[51]=q>>>24&255,r[52]=ie>>>0&255,r[53]=ie>>>8&255,r[54]=ie>>>16&255,r[55]=ie>>>24&255,r[56]=se>>>0&255,r[57]=se>>>8&255,r[58]=se>>>16&255,r[59]=se>>>24&255,r[60]=ae>>>0&255,r[61]=ae>>>8&255,r[62]=ae>>>16&255,r[63]=ae>>>24&255}function xe(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,U=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ge=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,K=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,Q=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,$=s,W=b,I=h,O=k,F=L,z=U,w=B,v=ge,E=T,S=K,C=X,M=oe,q=ne,ie=V,se=Q,ae=Z,d,ce=0;ce<20;ce+=2)d=$+q|0,F^=d<<7|d>>>25,d=F+$|0,E^=d<<9|d>>>23,d=E+F|0,q^=d<<13|d>>>19,d=q+E|0,$^=d<<18|d>>>14,d=z+W|0,S^=d<<7|d>>>25,d=S+z|0,ie^=d<<9|d>>>23,d=ie+S|0,W^=d<<13|d>>>19,d=W+ie|0,z^=d<<18|d>>>14,d=C+w|0,se^=d<<7|d>>>25,d=se+C|0,I^=d<<9|d>>>23,d=I+se|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ae+M|0,O^=d<<7|d>>>25,d=O+ae|0,v^=d<<9|d>>>23,d=v+O|0,M^=d<<13|d>>>19,d=M+v|0,ae^=d<<18|d>>>14,d=$+O|0,W^=d<<7|d>>>25,d=W+$|0,I^=d<<9|d>>>23,d=I+W|0,O^=d<<13|d>>>19,d=O+I|0,$^=d<<18|d>>>14,d=z+F|0,w^=d<<7|d>>>25,d=w+z|0,v^=d<<9|d>>>23,d=v+w|0,F^=d<<13|d>>>19,d=F+v|0,z^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=ae+se|0,q^=d<<7|d>>>25,d=q+ae|0,ie^=d<<9|d>>>23,d=ie+q|0,se^=d<<13|d>>>19,d=se+ie|0,ae^=d<<18|d>>>14;r[0]=$>>>0&255,r[1]=$>>>8&255,r[2]=$>>>16&255,r[3]=$>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ae>>>0&255,r[13]=ae>>>8&255,r[14]=ae>>>16&255,r[15]=ae>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function re(r,a,i,e){fe(r,a,i,e)}function te(r,a,i,e){xe(r,a,i,e)}var he=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function Qe(r,a,i,e,s,b,h){var k=new Uint8Array(16),L=new Uint8Array(64),U,B;for(B=0;B<16;B++)k[B]=0;for(B=0;B<8;B++)k[B]=b[B];for(;s>=64;){for(re(L,k,h,he),B=0;B<64;B++)r[a+B]=i[e+B]^L[B];for(U=1,B=8;B<16;B++)U=U+(k[B]&255)|0,k[B]=U&255,U>>>=8;s-=64,a+=64,e+=64}if(s>0)for(re(L,k,h,he),B=0;B<s;B++)r[a+B]=i[e+B]^L[B];return 0}function je(r,a,i,e,s){var b=new Uint8Array(16),h=new Uint8Array(64),k,L;for(L=0;L<16;L++)b[L]=0;for(L=0;L<8;L++)b[L]=e[L];for(;i>=64;){for(re(h,b,s,he),L=0;L<64;L++)r[a+L]=h[L];for(k=1,L=8;L<16;L++)k=k+(b[L]&255)|0,b[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(re(h,b,s,he),L=0;L<i;L++)r[a+L]=h[L];return 0}function Fe(r,a,i,e,s){var b=new Uint8Array(32);te(b,e,s,he);for(var h=new Uint8Array(8),k=0;k<8;k++)h[k]=e[k+16];return je(r,a,i,h,b)}function it(r,a,i,e,s,b,h){var k=new Uint8Array(32);te(k,b,h,he);for(var L=new Uint8Array(8),U=0;U<8;U++)L[U]=b[U+16];return Qe(r,a,i,e,s,L,k)}var at=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,b,h,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,b=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|b<<12)&255,this.r[5]=b>>>1&8190,h=r[10]&255|(r[11]&255)<<8,this.r[6]=(b>>>14|h<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(h>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};at.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,b,h,k,L,U,B,ge,T,K,X,oe,ne,V,Q,Z,$,W,I,O=this.h[0],F=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],q=this.h[9],ie=this.r[0],se=this.r[1],ae=this.r[2],d=this.r[3],ce=this.r[4],ye=this.r[5],be=this.r[6],le=this.r[7],pe=this.r[8],ue=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,O+=s&8191,b=r[a+2]&255|(r[a+3]&255)<<8,F+=(s>>>13|b<<3)&8191,h=r[a+4]&255|(r[a+5]&255)<<8,z+=(b>>>10|h<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(h>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,U=r[a+10]&255|(r[a+11]&255)<<8,S+=(L>>>14|U<<2)&8191,B=r[a+12]&255|(r[a+13]&255)<<8,C+=(U>>>11|B<<5)&8191,ge=r[a+14]&255|(r[a+15]&255)<<8,M+=(B>>>8|ge<<8)&8191,q+=ge>>>5|e,T=0,K=T,K+=O*ie,K+=F*(5*ue),K+=z*(5*pe),K+=w*(5*le),K+=v*(5*be),T=K>>>13,K&=8191,K+=E*(5*ye),K+=S*(5*ce),K+=C*(5*d),K+=M*(5*ae),K+=q*(5*se),T+=K>>>13,K&=8191,X=T,X+=O*se,X+=F*ie,X+=z*(5*ue),X+=w*(5*pe),X+=v*(5*le),T=X>>>13,X&=8191,X+=E*(5*be),X+=S*(5*ye),X+=C*(5*ce),X+=M*(5*d),X+=q*(5*ae),T+=X>>>13,X&=8191,oe=T,oe+=O*ae,oe+=F*se,oe+=z*ie,oe+=w*(5*ue),oe+=v*(5*pe),T=oe>>>13,oe&=8191,oe+=E*(5*le),oe+=S*(5*be),oe+=C*(5*ye),oe+=M*(5*ce),oe+=q*(5*d),T+=oe>>>13,oe&=8191,ne=T,ne+=O*d,ne+=F*ae,ne+=z*se,ne+=w*ie,ne+=v*(5*ue),T=ne>>>13,ne&=8191,ne+=E*(5*pe),ne+=S*(5*le),ne+=C*(5*be),ne+=M*(5*ye),ne+=q*(5*ce),T+=ne>>>13,ne&=8191,V=T,V+=O*ce,V+=F*d,V+=z*ae,V+=w*se,V+=v*ie,T=V>>>13,V&=8191,V+=E*(5*ue),V+=S*(5*pe),V+=C*(5*le),V+=M*(5*be),V+=q*(5*ye),T+=V>>>13,V&=8191,Q=T,Q+=O*ye,Q+=F*ce,Q+=z*d,Q+=w*ae,Q+=v*se,T=Q>>>13,Q&=8191,Q+=E*ie,Q+=S*(5*ue),Q+=C*(5*pe),Q+=M*(5*le),Q+=q*(5*be),T+=Q>>>13,Q&=8191,Z=T,Z+=O*be,Z+=F*ye,Z+=z*ce,Z+=w*d,Z+=v*ae,T=Z>>>13,Z&=8191,Z+=E*se,Z+=S*ie,Z+=C*(5*ue),Z+=M*(5*pe),Z+=q*(5*le),T+=Z>>>13,Z&=8191,$=T,$+=O*le,$+=F*be,$+=z*ye,$+=w*ce,$+=v*d,T=$>>>13,$&=8191,$+=E*ae,$+=S*se,$+=C*ie,$+=M*(5*ue),$+=q*(5*pe),T+=$>>>13,$&=8191,W=T,W+=O*pe,W+=F*le,W+=z*be,W+=w*ye,W+=v*ce,T=W>>>13,W&=8191,W+=E*d,W+=S*ae,W+=C*se,W+=M*ie,W+=q*(5*ue),T+=W>>>13,W&=8191,I=T,I+=O*ue,I+=F*pe,I+=z*le,I+=w*be,I+=v*ye,T=I>>>13,I&=8191,I+=E*ce,I+=S*d,I+=C*ae,I+=M*se,I+=q*ie,T+=I>>>13,I&=8191,T=(T<<2)+T|0,T=T+K|0,K=T&8191,T=T>>>13,X+=T,O=K,F=X,z=oe,w=ne,v=V,E=Q,S=Z,C=$,M=W,q=I,a+=16,i-=16;this.h[0]=O,this.h[1]=F,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=q},at.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,b,h;if(this.leftover){for(h=this.leftover,this.buffer[h++]=1;h<16;h++)this.buffer[h]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,h=2;h<10;h++)this.h[h]+=e,e=this.h[h]>>>13,this.h[h]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,h=1;h<10;h++)i[h]=this.h[h]+e,e=i[h]>>>13,i[h]&=8191;for(i[9]-=8192,s=(e^1)-1,h=0;h<10;h++)i[h]&=s;for(s=~s,h=0;h<10;h++)this.h[h]=this.h[h]&s|i[h];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,b=this.h[0]+this.pad[0],this.h[0]=b&65535,h=1;h<8;h++)b=(this.h[h]+this.pad[h]|0)+(b>>>16)|0,this.h[h]=b&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},at.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Nt(r,a,i,e,s,b){var h=new at(b);return h.update(i,e,s),h.finish(r,a),0}function st(r,a,i,e,s,b){var h=new Uint8Array(16);return Nt(h,0,i,e,s,b),R(r,a,h,0)}function Te(r,a,i,e,s){var b;if(i<32)return-1;for(it(r,0,a,0,i,e,s),Nt(r,16,r,32,i-32,r),b=0;b<16;b++)r[b]=0;return 0}function ut(r,a,i,e,s){var b,h=new Uint8Array(32);if(i<32||(Fe(h,0,32,e,s),st(a,16,a,32,i-32,h)!==0))return-1;for(it(r,0,a,0,i,e,s),b=0;b<32;b++)r[b]=0;return 0}function Ue(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function qe(r,a,i){for(var e,s=~(i-1),b=0;b<16;b++)e=s&(r[b]^a[b]),r[b]^=e,a[b]^=e}function Je(r,a){var i,e,s,b=o(),h=o();for(i=0;i<16;i++)h[i]=a[i];for(xt(h),xt(h),xt(h),e=0;e<2;e++){for(b[0]=h[0]-65517,i=1;i<15;i++)b[i]=h[i]-65535-(b[i-1]>>16&1),b[i-1]&=65535;b[15]=h[15]-32767-(b[14]>>16&1),s=b[15]>>16&1,b[14]&=65535,qe(h,b,1-s)}for(i=0;i<16;i++)r[2*i]=h[i]&255,r[2*i+1]=h[i]>>8}function zt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Je(i,r),Je(e,a),ee(i,0,e,0)}function gt(r){var a=new Uint8Array(32);return Je(a,r),a[0]&1}function He(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function $e(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Pe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function de(r,a,i){var e,s,b=0,h=0,k=0,L=0,U=0,B=0,ge=0,T=0,K=0,X=0,oe=0,ne=0,V=0,Q=0,Z=0,$=0,W=0,I=0,O=0,F=0,z=0,w=0,v=0,E=0,S=0,C=0,M=0,q=0,ie=0,se=0,ae=0,d=i[0],ce=i[1],ye=i[2],be=i[3],le=i[4],pe=i[5],ue=i[6],ke=i[7],me=i[8],ve=i[9],_e=i[10],Se=i[11],Me=i[12],Le=i[13],Ae=i[14],Ne=i[15];e=a[0],b+=e*d,h+=e*ce,k+=e*ye,L+=e*be,U+=e*le,B+=e*pe,ge+=e*ue,T+=e*ke,K+=e*me,X+=e*ve,oe+=e*_e,ne+=e*Se,V+=e*Me,Q+=e*Le,Z+=e*Ae,$+=e*Ne,e=a[1],h+=e*d,k+=e*ce,L+=e*ye,U+=e*be,B+=e*le,ge+=e*pe,T+=e*ue,K+=e*ke,X+=e*me,oe+=e*ve,ne+=e*_e,V+=e*Se,Q+=e*Me,Z+=e*Le,$+=e*Ae,W+=e*Ne,e=a[2],k+=e*d,L+=e*ce,U+=e*ye,B+=e*be,ge+=e*le,T+=e*pe,K+=e*ue,X+=e*ke,oe+=e*me,ne+=e*ve,V+=e*_e,Q+=e*Se,Z+=e*Me,$+=e*Le,W+=e*Ae,I+=e*Ne,e=a[3],L+=e*d,U+=e*ce,B+=e*ye,ge+=e*be,T+=e*le,K+=e*pe,X+=e*ue,oe+=e*ke,ne+=e*me,V+=e*ve,Q+=e*_e,Z+=e*Se,$+=e*Me,W+=e*Le,I+=e*Ae,O+=e*Ne,e=a[4],U+=e*d,B+=e*ce,ge+=e*ye,T+=e*be,K+=e*le,X+=e*pe,oe+=e*ue,ne+=e*ke,V+=e*me,Q+=e*ve,Z+=e*_e,$+=e*Se,W+=e*Me,I+=e*Le,O+=e*Ae,F+=e*Ne,e=a[5],B+=e*d,ge+=e*ce,T+=e*ye,K+=e*be,X+=e*le,oe+=e*pe,ne+=e*ue,V+=e*ke,Q+=e*me,Z+=e*ve,$+=e*_e,W+=e*Se,I+=e*Me,O+=e*Le,F+=e*Ae,z+=e*Ne,e=a[6],ge+=e*d,T+=e*ce,K+=e*ye,X+=e*be,oe+=e*le,ne+=e*pe,V+=e*ue,Q+=e*ke,Z+=e*me,$+=e*ve,W+=e*_e,I+=e*Se,O+=e*Me,F+=e*Le,z+=e*Ae,w+=e*Ne,e=a[7],T+=e*d,K+=e*ce,X+=e*ye,oe+=e*be,ne+=e*le,V+=e*pe,Q+=e*ue,Z+=e*ke,$+=e*me,W+=e*ve,I+=e*_e,O+=e*Se,F+=e*Me,z+=e*Le,w+=e*Ae,v+=e*Ne,e=a[8],K+=e*d,X+=e*ce,oe+=e*ye,ne+=e*be,V+=e*le,Q+=e*pe,Z+=e*ue,$+=e*ke,W+=e*me,I+=e*ve,O+=e*_e,F+=e*Se,z+=e*Me,w+=e*Le,v+=e*Ae,E+=e*Ne,e=a[9],X+=e*d,oe+=e*ce,ne+=e*ye,V+=e*be,Q+=e*le,Z+=e*pe,$+=e*ue,W+=e*ke,I+=e*me,O+=e*ve,F+=e*_e,z+=e*Se,w+=e*Me,v+=e*Le,E+=e*Ae,S+=e*Ne,e=a[10],oe+=e*d,ne+=e*ce,V+=e*ye,Q+=e*be,Z+=e*le,$+=e*pe,W+=e*ue,I+=e*ke,O+=e*me,F+=e*ve,z+=e*_e,w+=e*Se,v+=e*Me,E+=e*Le,S+=e*Ae,C+=e*Ne,e=a[11],ne+=e*d,V+=e*ce,Q+=e*ye,Z+=e*be,$+=e*le,W+=e*pe,I+=e*ue,O+=e*ke,F+=e*me,z+=e*ve,w+=e*_e,v+=e*Se,E+=e*Me,S+=e*Le,C+=e*Ae,M+=e*Ne,e=a[12],V+=e*d,Q+=e*ce,Z+=e*ye,$+=e*be,W+=e*le,I+=e*pe,O+=e*ue,F+=e*ke,z+=e*me,w+=e*ve,v+=e*_e,E+=e*Se,S+=e*Me,C+=e*Le,M+=e*Ae,q+=e*Ne,e=a[13],Q+=e*d,Z+=e*ce,$+=e*ye,W+=e*be,I+=e*le,O+=e*pe,F+=e*ue,z+=e*ke,w+=e*me,v+=e*ve,E+=e*_e,S+=e*Se,C+=e*Me,M+=e*Le,q+=e*Ae,ie+=e*Ne,e=a[14],Z+=e*d,$+=e*ce,W+=e*ye,I+=e*be,O+=e*le,F+=e*pe,z+=e*ue,w+=e*ke,v+=e*me,E+=e*ve,S+=e*_e,C+=e*Se,M+=e*Me,q+=e*Le,ie+=e*Ae,se+=e*Ne,e=a[15],$+=e*d,W+=e*ce,I+=e*ye,O+=e*be,F+=e*le,z+=e*pe,w+=e*ue,v+=e*ke,E+=e*me,S+=e*ve,C+=e*_e,M+=e*Se,q+=e*Me,ie+=e*Le,se+=e*Ae,ae+=e*Ne,b+=38*W,h+=38*I,k+=38*O,L+=38*F,U+=38*z,B+=38*w,ge+=38*v,T+=38*E,K+=38*S,X+=38*C,oe+=38*M,ne+=38*q,V+=38*ie,Q+=38*se,Z+=38*ae,s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=U+s+65535,s=Math.floor(e/65536),U=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=ge+s+65535,s=Math.floor(e/65536),ge=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=K+s+65535,s=Math.floor(e/65536),K=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,b+=s-1+37*(s-1),s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=U+s+65535,s=Math.floor(e/65536),U=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=ge+s+65535,s=Math.floor(e/65536),ge=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=K+s+65535,s=Math.floor(e/65536),K=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,b+=s-1+37*(s-1),r[0]=b,r[1]=h,r[2]=k,r[3]=L,r[4]=U,r[5]=B,r[6]=ge,r[7]=T,r[8]=K,r[9]=X,r[10]=oe,r[11]=ne,r[12]=V,r[13]=Q,r[14]=Z,r[15]=$}function j(r,a){de(r,a,a)}function D(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)j(i,i),e!==2&&e!==4&&de(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)j(i,i),e!==1&&de(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function P(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),b,h,k=o(),L=o(),U=o(),B=o(),ge=o(),T=o();for(h=0;h<31;h++)e[h]=a[h];for(e[31]=a[31]&127|64,e[0]&=248,He(s,i),h=0;h<16;h++)L[h]=s[h],B[h]=k[h]=U[h]=0;for(k[0]=B[0]=1,h=254;h>=0;--h)b=e[h>>>3]>>>(h&7)&1,qe(k,L,b),qe(U,B,b),$e(ge,k,U),Pe(k,k,U),$e(U,L,B),Pe(L,L,B),j(B,ge),j(T,k),de(k,U,k),de(U,L,ge),$e(ge,k,U),Pe(k,k,U),j(L,k),Pe(U,B,T),de(k,U,y),$e(k,k,B),de(U,U,k),de(k,B,T),de(B,L,s),j(L,ge),qe(k,L,b),qe(U,B,b);for(h=0;h<16;h++)s[h+16]=k[h],s[h+32]=U[h],s[h+48]=L[h],s[h+64]=B[h];var K=s.subarray(32),X=s.subarray(16);return D(K,K),de(X,X,K),Je(r,X),0}function J(r,a){return P(r,a,f)}function we(r,a){return l(a,32),J(r,a)}function Ce(r,a,i){var e=new Uint8Array(32);return P(e,i,a),te(r,c,e,he)}var Ee=Te,yt=ut;function hn(r,a,i,e,s,b){var h=new Uint8Array(32);return Ce(h,s,b),Ee(r,a,i,e,h)}function De(r,a,i,e,s,b){var h=new Uint8Array(32);return Ce(h,s,b),yt(r,a,i,e,h)}var et=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Qn(r,a,i,e){for(var s=new Int32Array(16),b=new Int32Array(16),h,k,L,U,B,ge,T,K,X,oe,ne,V,Q,Z,$,W,I,O,F,z,w,v,E,S,C,M,q=r[0],ie=r[1],se=r[2],ae=r[3],d=r[4],ce=r[5],ye=r[6],be=r[7],le=a[0],pe=a[1],ue=a[2],ke=a[3],me=a[4],ve=a[5],_e=a[6],Se=a[7],Me=0;e>=128;){for(F=0;F<16;F++)z=8*F+Me,s[F]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],b[F]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(F=0;F<80;F++)if(h=q,k=ie,L=se,U=ae,B=d,ge=ce,T=ye,K=be,X=le,oe=pe,ne=ue,V=ke,Q=me,Z=ve,$=_e,W=Se,w=be,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(d>>>14|me<<18)^(d>>>18|me<<14)^(me>>>9|d<<23),v=(me>>>14|d<<18)^(me>>>18|d<<14)^(d>>>9|me<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=d&ce^~d&ye,v=me&ve^~me&_e,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=et[F*2],v=et[F*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[F%16],v=b[F%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,I=C&65535|M<<16,O=E&65535|S<<16,w=I,v=O,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(q>>>28|le<<4)^(le>>>2|q<<30)^(le>>>7|q<<25),v=(le>>>28|q<<4)^(q>>>2|le<<30)^(q>>>7|le<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=q&ie^q&se^ie&se,v=le&pe^le&ue^pe&ue,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,K=C&65535|M<<16,W=E&65535|S<<16,w=U,v=V,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=I,v=O,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,U=C&65535|M<<16,V=E&65535|S<<16,ie=h,se=k,ae=L,d=U,ce=B,ye=ge,be=T,q=K,pe=X,ue=oe,ke=ne,me=V,ve=Q,_e=Z,Se=$,le=W,F%16===15)for(z=0;z<16;z++)w=s[z],v=b[z],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(z+9)%16],v=b[(z+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(z+1)%16],O=b[(z+1)%16],w=(I>>>1|O<<31)^(I>>>8|O<<24)^I>>>7,v=(O>>>1|I<<31)^(O>>>8|I<<24)^(O>>>7|I<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(z+14)%16],O=b[(z+14)%16],w=(I>>>19|O<<13)^(O>>>29|I<<3)^I>>>6,v=(O>>>19|I<<13)^(I>>>29|O<<3)^(O>>>6|I<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[z]=C&65535|M<<16,b[z]=E&65535|S<<16;w=q,v=le,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[0]=q=C&65535|M<<16,a[0]=le=E&65535|S<<16,w=ie,v=pe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[1]=ie=C&65535|M<<16,a[1]=pe=E&65535|S<<16,w=se,v=ue,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[2]=se=C&65535|M<<16,a[2]=ue=E&65535|S<<16,w=ae,v=ke,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[3]=ae=C&65535|M<<16,a[3]=ke=E&65535|S<<16,w=d,v=me,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[4]=d=C&65535|M<<16,a[4]=me=E&65535|S<<16,w=ce,v=ve,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[5]=ce=C&65535|M<<16,a[5]=ve=E&65535|S<<16,w=ye,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[6]=ye=C&65535|M<<16,a[6]=_e=E&65535|S<<16,w=be,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[7]=be=C&65535|M<<16,a[7]=Se=E&65535|S<<16,Me+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),b=new Uint8Array(256),h,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Qn(e,s,a,i),i%=128,h=0;h<i;h++)b[h]=a[k-i+h];for(b[i]=128,i=256-128*(i<112?1:0),b[i-9]=0,G(b,i-8,k/536870912|0,k<<3),Qn(e,s,b,i),h=0;h<8;h++)G(r,8*h,e[h],s[h]);return 0}function Kt(r,a){var i=o(),e=o(),s=o(),b=o(),h=o(),k=o(),L=o(),U=o(),B=o();Pe(i,r[1],r[0]),Pe(B,a[1],a[0]),de(i,i,B),$e(e,r[0],r[1]),$e(B,a[0],a[1]),de(e,e,B),de(s,r[3],a[3]),de(s,s,m),de(b,r[2],a[2]),$e(b,b,b),Pe(h,e,i),Pe(k,b,s),$e(L,b,s),$e(U,e,i),de(r[0],h,k),de(r[1],U,L),de(r[2],L,k),de(r[3],h,U)}function Jn(r,a,i){var e;for(e=0;e<4;e++)qe(r[e],a[e],i)}function wn(r,a){var i=o(),e=o(),s=o();D(s,a[2]),de(i,a[0],s),de(e,a[1],s),Je(r,e),r[31]^=gt(i)<<7}function vn(r,a,i){var e,s;for(Ue(r[0],u),Ue(r[1],p),Ue(r[2],p),Ue(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Jn(r,a,e),Kt(a,r),Kt(r,r),Jn(r,a,e)}function Xt(r,a){var i=[o(),o(),o(),o()];Ue(i[0],g),Ue(i[1],_),Ue(i[2],p),de(i[3],g,_),vn(r,i,a)}function _n(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],b;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Xt(s,e),wn(r,s),b=0;b<32;b++)a[b+32]=r[b];return 0}var Vt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Sn(r,a){var i,e,s,b;for(e=63;e>=32;--e){for(i=0,s=e-32,b=e-12;s<b;++s)a[s]+=i-16*a[e]*Vt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Vt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Vt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function kn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;Sn(r,a)}function er(r,a,i,e){var s=new Uint8Array(64),b=new Uint8Array(64),h=new Uint8Array(64),k,L,U=new Float64Array(64),B=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ge=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(lt(h,r.subarray(32),i+32),kn(h),Xt(B,h),wn(r,B),k=32;k<64;k++)r[k]=e[k];for(lt(b,r,i+64),kn(b),k=0;k<64;k++)U[k]=0;for(k=0;k<32;k++)U[k]=h[k];for(k=0;k<32;k++)for(L=0;L<32;L++)U[k+L]+=b[k]*s[L];return Sn(r.subarray(32),U),ge}function oo(r,a){var i=o(),e=o(),s=o(),b=o(),h=o(),k=o(),L=o();return Ue(r[2],p),He(r[1],a),j(s,r[1]),de(b,s,x),Pe(s,s,r[2]),$e(b,r[2],b),j(h,b),j(k,h),de(L,k,h),de(i,L,s),de(i,i,b),Y(i,i),de(i,i,s),de(i,i,b),de(i,i,b),de(r[0],i,b),j(e,r[0]),de(e,e,b),zt(e,s)&&de(r[0],r[0],N),j(e,r[0]),de(e,e,b),zt(e,s)?-1:(gt(r[0])===a[31]>>7&&Pe(r[0],u,r[0]),de(r[3],r[0],r[1]),0)}function Cn(r,a,i,e){var s,b=new Uint8Array(32),h=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||oo(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(h,r,i),kn(h),vn(k,L,h),Xt(L,a.subarray(32)),Kt(k,L),wn(b,k),i-=64,ee(a,0,b,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var En=32,Zt=24,Bt=32,bt=16,It=32,Qt=32,Tt=32,$t=32,Mn=32,tr=Zt,io=Bt,ao=bt,Ke=64,ct=32,mt=64,Ln=32,An=64;n.lowlevel={crypto_core_hsalsa20:te,crypto_stream_xor:it,crypto_stream:Fe,crypto_stream_salsa20_xor:Qe,crypto_stream_salsa20:je,crypto_onetimeauth:Nt,crypto_onetimeauth_verify:st,crypto_verify_16:R,crypto_verify_32:ee,crypto_secretbox:Te,crypto_secretbox_open:ut,crypto_scalarmult:P,crypto_scalarmult_base:J,crypto_box_beforenm:Ce,crypto_box_afternm:Ee,crypto_box:hn,crypto_box_open:De,crypto_box_keypair:we,crypto_hash:lt,crypto_sign:er,crypto_sign_keypair:_n,crypto_sign_open:Cn,crypto_secretbox_KEYBYTES:En,crypto_secretbox_NONCEBYTES:Zt,crypto_secretbox_ZEROBYTES:Bt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:It,crypto_scalarmult_SCALARBYTES:Qt,crypto_box_PUBLICKEYBYTES:Tt,crypto_box_SECRETKEYBYTES:$t,crypto_box_BEFORENMBYTES:Mn,crypto_box_NONCEBYTES:tr,crypto_box_ZEROBYTES:io,crypto_box_BOXZEROBYTES:ao,crypto_sign_BYTES:Ke,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:mt,crypto_sign_SEEDBYTES:Ln,crypto_hash_BYTES:An,gf:o,D:x,L:Vt,pack25519:Je,unpack25519:He,M:de,A:$e,S:j,Z:Pe,pow2523:Y,add:Kt,set25519:Ue,modL:Sn,scalarmult:vn,scalarbase:Xt};function nr(r,a){if(r.length!==En)throw new Error("bad key size");if(a.length!==Zt)throw new Error("bad nonce size")}function so(r,a){if(r.length!==Tt)throw new Error("bad public key size");if(a.length!==$t)throw new Error("bad secret key size")}function Re(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function rr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Re(r,a,i),nr(i,a);for(var e=new Uint8Array(Bt+r.length),s=new Uint8Array(e.length),b=0;b<r.length;b++)e[b+Bt]=r[b];return Te(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){Re(r,a,i),nr(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),b=0;b<r.length;b++)e[b+bt]=r[b];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(Bt)},n.secretbox.keyLength=En,n.secretbox.nonceLength=Zt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if(Re(r,a),r.length!==Qt)throw new Error("bad n size");if(a.length!==It)throw new Error("bad p size");var i=new Uint8Array(It);return P(i,r,a),i},n.scalarMult.base=function(r){if(Re(r),r.length!==Qt)throw new Error("bad n size");var a=new Uint8Array(It);return J(a,r),a},n.scalarMult.scalarLength=Qt,n.scalarMult.groupElementLength=It,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Re(r,a),so(r,a);var i=new Uint8Array(Mn);return Ce(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Tt),a=new Uint8Array($t);return we(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Re(r),r.length!==$t)throw new Error("bad secret key size");var a=new Uint8Array(Tt);return J(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Tt,n.box.secretKeyLength=$t,n.box.sharedKeyLength=Mn,n.box.nonceLength=tr,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Re(r,a),a.length!==mt)throw new Error("bad secret key size");var i=new Uint8Array(Ke+r.length);return er(i,r,r.length,a),i},n.sign.open=function(r,a){if(Re(r,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=Cn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),b=0;b<s.length;b++)s[b]=i[b];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ke),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Re(r,a,i),a.length!==Ke)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(Ke+r.length),s=new Uint8Array(Ke+r.length),b;for(b=0;b<Ke;b++)e[b]=a[b];for(b=0;b<r.length;b++)e[b+Ke]=r[b];return Cn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ct),a=new Uint8Array(mt);return _n(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Re(r),r.length!==mt)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Re(r),r.length!==Ln)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(mt),e=0;e<32;e++)i[e]=r[e];return _n(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=mt,n.sign.seedLength=Ln,n.sign.signatureLength=Ke,n.hash=function(r){Re(r);var a=new Uint8Array(An);return lt(a,r,r.length),a},n.hash.hashLength=An,n.verify=function(r,a){return Re(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,b=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(b.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=b[s];rr(b)})}else typeof Ji<"u"&&(r=na,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,b=r.randomBytes(e);for(s=0;s<e;s++)i[s]=b[s];rr(b)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Pn)),Pn.exports}var oa=ra();const ia=Zi(oa);function aa(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const m=t.charAt(x),g=m.charCodeAt(0);if(n[g]!==255)throw new TypeError(m+" is ambiguous");n[g]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),f=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let m=0,g=0,_=0;const N=x.length;for(;_!==N&&x[_]===0;)_++,m++;const G=(N-_)*f+1>>>0,A=new Uint8Array(G);for(;_!==N;){let fe=x[_],xe=0;for(let re=G-1;(fe!==0||xe<g)&&re!==-1;re--,xe++)fe+=256*A[re]>>>0,A[re]=fe%o>>>0,fe=fe/o>>>0;if(fe!==0)throw new Error("Non-zero carry");g=xe,_++}let R=G-g;for(;R!==G&&A[R]===0;)R++;let ee=l.repeat(m);for(;R<G;++R)ee+=t.charAt(A[R]);return ee}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let m=0,g=0,_=0;for(;x[m]===l;)g++,m++;const N=(x.length-m)*c+1>>>0,G=new Uint8Array(N);for(;m<x.length;){const fe=x.charCodeAt(m);if(fe>255)return;let xe=n[fe];if(xe===255)return;let re=0;for(let te=N-1;(xe!==0||re<_)&&te!==-1;te--,re++)xe+=o*G[te]>>>0,G[te]=xe%256>>>0,xe=xe/256>>>0;if(xe!==0)throw new Error("Non-zero carry");_=re,m++}let A=N-_;for(;A!==N&&G[A]===0;)A++;const R=new Uint8Array(g+(N-A));let ee=g;for(;A!==N;)R[ee++]=G[A++];return R}function y(x){const m=p(x);if(m)return m;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:y}}var sa="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const ur=aa(sa),Zn="cbsgo_wallet_v3",bn="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(Zn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function la(t){localStorage.setItem(Zn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function ca(){const t=ia.sign.keyPair(),n=ur.encode(t.publicKey),o=ur.encode(t.secretKey);return{pk:n,sk:o}}function qr(){return!!qt()}function fa(){return qt()?sessionStorage.getItem(bn)==="1":!1}function da(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=ca();return la({pk:l,sk:c,pin:n}),sessionStorage.setItem(bn,"1"),l}function pa(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(bn,"1"),n.pk}function Ye(){const t=qt();return t?t.pk:""}function ua(){localStorage.removeItem(Zn),sessionStorage.removeItem(bn)}typeof window<"u"&&(window.cbsgoDevResetWallet=ua);const Hr="cbsgoLoginModal";function Kr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Xr(){const t=document.getElementById(Hr);t&&t.remove()}function xa(t){Xr();const n=document.createElement("div");return n.id=Hr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function ga(t,n){return`
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
      ">${Kr(t)}</div>

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
  `}function xr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ya(){const t=!qr();let n="";try{const m=At();t?m&&m!=="Sovereign"?n=m:n="":n=m||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Kr(n)}" style="${Jt()}" placeholder="Kevin" />
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
        <button id="cbsgoCreateBtn" type="button" style="${xr(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${xr(!0)}">Unlock</button>
      </div>
    `,l=xa(ga(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),f=m=>{c&&(c.textContent=m||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),y=l.querySelector("#cbsgoNick"),x=()=>{Xr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const m=l.querySelector("#cbsgoCreateBtn");m&&(m.onclick=async()=>{try{const g=String(y?.value||"").trim(),_=String(u?.value||"").trim(),N=String(p?.value||"").trim();if(g.length<2)return f("⛔ Nickname too short.");if(_.length<4)return f("⛔ PIN must be at least 4 digits.");if(_!==N)return f("⛔ PINs do not match.");f("Creating wallet…"),Fr(g),await da(_),f("✅ Wallet created. Starting…"),x()}catch(g){f(`⛔ ${String(g?.message||g)}`)}})}else{const m=l.querySelector("#cbsgoUnlockBtn");m&&(m.onclick=async()=>{try{const g=String(u?.value||"").trim();if(g.length<4)return f("⛔ PIN must be at least 4 digits.");f("Unlocking…"),await pa(g),f("✅ Unlocked."),x()}catch{f("⛔ Wrong PIN (or wallet data missing).")}})}}const ba="https://cxfedvowjgkqrakkkjpi.supabase.co",ma="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Oe=lo(ba,ma);function ha(){const t=Ye();if(!t)return null;const n=At(),o=yn();return{wallet_pk:t,nickname:n,avatar:o}}async function on(t={}){try{const n=ha();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Oe.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const wa=15e3,va=1e4,_a=300*1e3;let Ot=null,gr=0,yr=0;function Sa(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Ot={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",Sa));async function ka(){const t=Ye();if(!t||!Ot)return;const n=Date.now();if(n-gr<5e3)return;gr=n;const l=(At()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Ot.lat,lng:Ot.lng,heading:Ot.heading,last_seen:new Date().toISOString()};try{const{data:f,error:u}=await Oe.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(f&&f.length>0){const p=f[0].id,{error:y}=await Oe.from("player_state").update(c).eq("id",p);y&&console.warn("CBS GO: player_state update failed",y)}else{const{error:p}=await Oe.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(f){console.warn("CBS GO: pushMyState error",f)}}async function Ca(){const t=Ye();if(!t)return;const n=Date.now();if(n-yr<3e3)return;yr=n;const o=new Date(Date.now()-_a).toISOString();try{const{data:l,error:c}=await Oe.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const f=Array.isArray(l)?l:[],u=Array.from(new Set(f.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:m}=await Oe.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);m?console.warn("CBS GO: fetch player profiles failed",m):Array.isArray(x)&&(p=new Map(x.map(g=>[g.wallet_pk,g])))}const y=f.map(x=>{const m=x.lat,g=x.lng,_=typeof m=="number"?m:parseFloat(m),N=typeof g=="number"?g:parseFloat(g);if(!Number.isFinite(_)||!Number.isFinite(N))return null;const G=p.get(x.wallet_pk)||null,A=G&&G.nickname||x.nickname||"Anon",R=G&&G.avatar?String(G.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:R,lat:_,lng:N,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:y}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function Ea(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{ka()},wa),setInterval(()=>{Ca()},va))}Ea();function Vr(){const t=Ye();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function cn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Ma(t){const n=Vr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Oe.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw cn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function La(t){const n=Vr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await Oe.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw cn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Aa(){const t=Ye();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Oe.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw cn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],f=[];for(const p of l){const y=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!y&&!x)continue;const m=p.a_wallet===t?p.b_wallet:p.a_wallet,g={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:m,nickname:null,avatar:""};y&&c.push(g),x&&f.push(g)}const u=Array.from(new Set([...c,...f].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:y}=await Oe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!y&&Array.isArray(p)){const x=new Map;for(const g of p)g.wallet_pk&&x.set(String(g.wallet_pk),{nickname:g.nickname||null,avatar:g.avatar||""});const m=g=>{g.forEach(_=>{const N=x.get(_.otherWallet);N&&(_.nickname=N.nickname||null,_.avatar=N.avatar||"")})};m(c),m(f)}else y&&cn("loadFriendsOverview:players",y)}return{incoming:c,accepted:f}}let Ft=null;async function Zr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Ft=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Ft.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Na(){try{Ft&&(await Ft.release(),Ft=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function za(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Zr():await Na()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function Ba(){const t=Ye();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Ia(t){return String(t||"").trim()}async function Qr(t,n={}){const o=Ba(),l=Ia(t),c=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),f=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0))),u=n.cardId?String(n.cardId||"").trim():"",p=Math.max(0,Math.floor(Number(n.cardQty!=null?n.cardQty:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!c&&!f&&!p)throw new Error("Set tickets, CBS and/or cards above 0.");if(p>0&&!u)throw new Error("Select a card to send.");if(c>0&&Ar()<c)throw new Error("Not enough tickets in your bag.");if(f>0&&Nr()<f)throw new Error("Not enough CBS (play money) in your bag.");if(p>0&&Co(u)<p)throw new Error("Not enough of that card in your collection.");let y=0,x=0,m=null,g=0;try{c>0&&(So(c),y=c),f>0&&(ko(f),x=f),p>0&&u&&(Eo(u,p),m=u,g=p);const{error:_}=await Oe.from("trades").insert({from_wallet:o,to_wallet:l,tickets:c||0,cbs:f||0,card_id:u||null,card_qty:p||null,status:"sent"});if(_)throw y>0&&Lt(y),x>0&&xn(x),m&&g>0&&Yn(m,g),console.warn("CBS GO sendGiftToWallet Supabase error",_),new Error(_.message||"Could not save gift to Supabase (permissions or network issue).");if(typeof window<"u")try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftSent",{detail:{toWallet:l,tickets:c,cbs:f,cardId:u||null,cardQty:p||0}}))}catch(N){console.warn("CBS GO: dispatch friendGiftSent failed",N)}return{ok:!0}}catch(_){throw _ instanceof Error?_:new Error(String(_?.message||_)||"Failed to send gift.")}}async function fn(){const t=Ye();if(t)try{const{data:n,error:o}=await Oe.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const f=Array.from(new Set(n.map(u=>u&&u.from_wallet).filter(u=>typeof u=="string"&&u.trim().length>0)));if(f.length>0){const{data:u,error:p}=await Oe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",f);!p&&Array.isArray(u)?l=new Map(u.filter(y=>y&&y.wallet_pk).map(y=>[String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""}])):p&&console.warn("CBS GO pullIncomingGifts players error",p)}}catch(f){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",f)}const c=[];for(const f of n){if(!f)continue;const u=Number(f.tickets||0),p=Number(f.cbs||0),y=f.card_id?String(f.card_id||"").trim():"",x=Math.max(0,Number(f.card_qty||0));if(u>0&&Lt(u),p>0&&xn(p),y&&x>0&&Yn(y,x),(u>0||p>0||y&&x>0)&&typeof window<"u"){const m=l.get(f.from_wallet)||{nickname:null,avatar:""},g={id:f.id||null,fromWallet:f.from_wallet||"",toWallet:f.to_wallet||"",tickets:u,cbs:p,cardId:y||null,cardQty:x||0,createdAt:f.created_at||null,senderNickname:m.nickname||null,senderAvatar:m.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:g}))}catch(_){console.warn("CBS GO: dispatch friendGiftReceived failed",_)}}f.id&&c.push(f.id)}if(c.length>0){const{error:f}=await Oe.from("trades").update({status:"claimed"}).in("id",c);f&&console.warn("CBS GO pullIncomingGifts update status error",f)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0,l=null,c=0)=>Qr(t,{tickets:n,cbs:o,cardId:l,cardQty:c}),window.cbsgoPullGifts=fn);function ze(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function dn(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const Jr="cbsgo_cards_v1";function Ta(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Ht(){const t=localStorage.getItem(Jr),n=Ta(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function eo(t){const n={};for(const[l,c]of Object.entries(t||{})){const f=Number(c||0);Number.isFinite(f)&&f>0&&(n[l]=f)}const o={counts:n};localStorage.setItem(Jr,JSON.stringify(o))}function $a(){const t=Ht(),n=["walk_sun_1","walk_rain_1","walk_night_1","walk_city_1","walk_nature_1","walk_beach_1","cbs_heart_1","cbs_chain_1","cbs_fire_1","cbs_go_1","walk_morning_1","walk_evening_1","walk_park_1","walk_bridge_1","cbs_star_1","cbs_glow_1","cbs_team_1","cbs_legend_1","walk_placeholder_1","walk_placeholder_2","cbs_placeholder_1","cbs_placeholder_2"];let o=0,l=0;for(const c of n){const f=Number(t[c]||0);Number.isFinite(f)&&f>0&&(o+=1,l+=f)}return{cardTypes:o,cardTotal:l}}function Pa(){try{const t=Ht(),n=zr();for(const[o,l]of Object.entries(t)){const c=Number(l||0);if(!Number.isFinite(c)||c<=0)continue;const f=Number(n[o]||0);if(!Number.isFinite(f)||f>=c)continue;const u=c-f;Yn(o,u)}}catch(t){console.warn("CBS GO: syncInventoryCardsFromBag failed",t)}}function mn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Wn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function br(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${ze(t)}</div>
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
  `}function Oa(){const t=At(),n=yn(),o=Ye();return`
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
        ${dn(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${ze(t)}" maxlength="24" style="
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
                    ${ze(o)}
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
  `}function ja(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const R=document.querySelector("#profileMsg");R&&(R.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const f=()=>{if(!t)return;const A=Fr(t.value);c(`✅ Name saved: ${A}`);try{on()}catch(R){console.warn("CBS GO: failed to sync profile after name change",R)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(f,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),f()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const R=new FileReader;R.onload=()=>{li(String(R.result||"")),c("✅ Photo saved"),Et();try{on()}catch(ee){console.warn("CBS GO: failed to sync profile after avatar change",ee)}},R.onerror=()=>c("⛔ Failed to read image."),R.readAsDataURL(A)}),o&&(o.onclick=()=>{ci(),c("✅ Photo removed"),Et();try{on()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),y=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),m=document.querySelector("#friendsAcceptedList"),g=A=>{y&&(y.textContent=A||"")},_=A=>{if(!A)return"";const R=String(A);return R.length<=12?R:`${R.slice(0,5)}…${R.slice(-4)}`},N=(A,R="")=>{const ee=A.nickname&&A.nickname.trim()?A.nickname.trim():_(A.otherWallet),fe=_(A.otherWallet);return`
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
          ${dn(A.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${ze(ee||"Friend")}
            </div>
            ${fe?`<div style="font-size:11px;opacity:.7;">${ze(fe)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${R||""}
        </div>
      </div>
    `};async function G(){if(!(!x||!m))try{x.textContent="Loading…",m.textContent="Loading…";const A=await Aa();A.incoming.length?x.innerHTML=A.incoming.map(R=>{const ee=`
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${R.id}"
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
            `;return N(R,ee)}).join(""):x.textContent="No incoming requests.",A.accepted.length?m.innerHTML=A.accepted.map(R=>N(R,`
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
            `)).join(""):m.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(R=>{R.addEventListener("click",async()=>{const ee=R.getAttribute("data-friend-id");if(ee){g("Accepting friend…"),R.disabled=!0;try{await La(ee),g("✅ Friend added."),await G()}catch(fe){console.warn(fe),g(`⛔ ${fe.message||fe}`),R.disabled=!1}}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",m.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){g("Enter a wallet address first.");return}g("Sending friend request…"),p.disabled=!0;try{await Ma(A),g("✅ Friend request sent."),u.value="",await G()}catch(R){console.warn(R),g(`⛔ ${R.message||R}`)}finally{p.disabled=!1}}),G().catch(()=>{})}function Ra(){const t=Ar(),n=Nr(),o=Ye(),{cardTypes:l,cardTotal:c}=$a(),f=Ht(),u=Object.entries(f).filter(([,x])=>Number(x||0)>0),p=c>0?`You own ${c} cards (${l} different). You can also send cards to friends below.`:"You don’t have any cards yet to send.",y=u.length?['<option value="">No card</option>',...u.map(([x,m])=>`<option value="${ze(x)}">${ze(x)} (x${Number(m||0)})</option>`)].join(""):'<option value="">No cards available</option>';return`
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
                ${ze(o)}
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
              Walking & CBS cards you collect on your journey. You can later trade and send them to friends.
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
          ${ze(p)}
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
              Send tickets, CBS (play money) and cards to another CBS-GO wallet. Off-chain via Supabase.
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

          <div style="margin-top:4px;">
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
              ${y}
            </select>
          </div>

          <div style="max-width:120px;">
            <label for="giftCardQtyInput" style="font-size:11px;opacity:.8;">Card quantity</label>
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
  `}function Fa(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Vi()}catch(N){console.warn("CBS GO: openCardsPanel failed",N)}});const l=Ye(),c=document.querySelector("#giftWalletInput"),f=document.querySelector("#giftTicketsInput"),u=document.querySelector("#giftCbsInput"),p=document.querySelector("#giftCardSelect"),y=document.querySelector("#giftCardQtyInput"),x=document.querySelector("#giftSendBtn"),m=document.querySelector("#giftMsg"),g=N=>{m&&(m.textContent=N||"")};if(x&&c&&x.addEventListener("click",async()=>{const N=c.value.trim(),G=f?.value??"",A=u?.value??"",R=p?.value??"",ee=y?.value??"",fe=Number(G||"0"),xe=Number(A||"0");let re=String(R||"").trim(),te=Number(ee||"0");if(!N){g("Enter a wallet address first.");return}if(!fe&&!xe&&!te){g("Set tickets, CBS and/or a card above 0.");return}re&&(!Number.isFinite(te)||te<=0)&&(te=1),Pa(),x.disabled=!0,g("Sending gift…");try{if(await Qr(N,{tickets:fe,cbs:xe,cardId:re||null,cardQty:te}),g("✅ Gift sent."),f&&(f.value=""),u&&(u.value=""),p&&(p.value=""),y&&(y.value=""),re&&te>0)try{const he=Ht(),je=Number(he[re]||0)-te;je>0?he[re]=je:delete he[re],eo(he),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged"))}catch(he){console.warn("CBS GO: failed to update card counts after send",he)}typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:N,tickets:fe,cbs:xe,cardId:re||null,cardQty:te||0}}))}catch(he){console.warn(he),g(`⛔ ${he.message||"Could not send gift."}`)}finally{x.disabled=!1}}),!t||!l){fn().catch(()=>{});return}const _=N=>{n&&(n.textContent=N||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),_("✅ Wallet address copied to clipboard.")):_("📋 Copy not supported in this browser.")}catch{_("⛔ Failed to copy address.")}},fn().catch(()=>{})}function to(){const t=mn();return t==="profile"?br("Profile",`<div id="profileMount">${Oa()}</div>`):t==="bag"?br("Bag",`<div id="bagMount">${Ra()}</div>`):""}function Ua(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Fi()}
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
          ${Pr()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Or()}
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
        ${to()}
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

      <!-- 🎁 Groot overlay-venster voor cadeautjes + streak + daily-goal + gifts -->
      <div id="cbsgoLootOverlayHost" style="
        position:fixed;
        inset:0;
        z-index:8000;
        pointer-events:none;
      "></div>

      ${jr()?`<button id="resetBtn" type="button" style="
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=to();const n=mn();n==="profile"&&ja(),n==="bag"&&Fa();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Wn("map"),Et()})}function Ga(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=mn();Wn(o===n?"map":n||"map"),Et()})})}function mr(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:c,toWallet:f,tickets:u=0,cbs:p=0,cardId:y=null,cardQty:x=0}=t||{};if(!u&&!p&&!x)return;n.innerHTML="";const m=document.createElement("div");m.style.position="fixed",m.style.inset="0",m.style.display="flex",m.style.alignItems="center",m.style.justifyContent="center",m.style.background="rgba(5,7,11,0.78)",m.style.pointerEvents="auto";const g=document.createElement("div");g.style.width="min(320px, 90vw)",g.style.borderRadius="22px",g.style.border="1px solid rgba(56,189,248,.85)",g.style.background="rgba(10,12,18,0.98)",g.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",g.style.padding="18px 16px 14px 16px",g.style.color="#fff",g.style.fontFamily="system-ui,sans-serif",g.style.opacity="0",g.style.transform="translateY(12px) scale(0.97)",g.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=At(),N=yn(),G=o==="sent"?"Gift sent":"You received a gift",A=[];u&&A.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&A.push(`🪙 ${p} CBS`),x&&A.push(`🃏 ${x} card${x===1?"":"s"}`);const R=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${ze(_)}</b> to <span style="opacity:.9;">${ze(f||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${ze(l||"Friend")}</b>
        </div>
      `,ee=dn(o==="sent"?N||"":c||"",40);g.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${ee}
      <div>
        <div style="font-size:15px;font-weight:800;">${ze(G)}</div>
        ${R}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${ze(A.join(" · "))}
    </div>
    <div style="font-size:11px;opacity:.78;margin-bottom:10px;">
      Gifts are added to your Bag (tickets, CBS & cards).
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
  `,m.appendChild(g),n.appendChild(m),requestAnimationFrame(()=>{g.style.opacity="1",g.style.transform="translateY(0) scale(1)"});const fe=()=>{g.style.opacity="0",g.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},xe=document.getElementById("cbsgoTradePopupCloseBtn");xe&&(xe.onclick=fe),m.addEventListener("click",re=>{re.target===m&&fe()})}function hr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ua();try{Zr(),za()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{on()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Ga(),Di(),ai(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Or())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Pr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{mn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let y=p.querySelector(".cbsgoToastBox");y||(y=document.createElement("div"),y.className="cbsgoToastBox",y.style.pointerEvents="auto",y.style.padding="8px 12px",y.style.borderRadius="999px",y.style.border="1px solid rgba(255,255,255,.25)",y.style.background="rgba(10,12,18,.88)",y.style.backdropFilter="blur(10px)",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.fontSize="11px",y.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",y.style.opacity="0",y.style.transform="translateY(10px)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(y)),y.textContent=u||"",y.style.opacity="1",y.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{y.style.opacity="0",y.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},y=Number(p.xp||0),x=Number(p.tickets||0),m=Number(p.cbs||0);if(!y&&!x&&!m)return;const g=[];y&&g.push(`+${y} XP`),x&&g.push(`+${x} ticket${x===1?"":"s"}`),m&&g.push(`+${m} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${g.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const y=Number(u?.steps||0),x=Number(u?.goal||0),m=u?.dayKey||"",g=document.createElement("div");g.style.position="fixed",g.style.inset="0",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.background="rgba(5,7,11,0.80)",g.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const N=x?`${y}/${x} steps`:`${y} steps`;_.innerHTML=`
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
        ${N}
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
    `,g.appendChild(_),p.appendChild(g),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const G=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=G),g.addEventListener("click",R=>{R.target===g&&G()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const y=Number(u?.xp||0),x=Number(u?.tickets||0),m=Number(u?.cbs||0);if(!y&&!x&&!m)return;p.innerHTML="";const g=document.createElement("div");g.style.position="fixed",g.style.inset="0",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.background="rgba(5,7,11,0.75)",g.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const N=[];y&&N.push(`+${y} XP`),x&&N.push(`+${x} ticket${x===1?"":"s"}`),m&&N.push(`+${m} CBS`),_.innerHTML=`
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
        ${ze(N.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,g.appendChild(_),p.appendChild(g),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function f(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const y=Number(u?.days||7),x=Number(u?.rewardCbs||0),m=document.createElement("div");m.style.position="fixed",m.style.inset="0",m.style.display="flex",m.style.alignItems="center",m.style.justifyContent="center",m.style.background="rgba(5,7,11,0.80)",m.style.pointerEvents="auto";const g=document.createElement("div");g.style.width="min(340px, 92vw)",g.style.borderRadius="22px",g.style.border="1px solid rgba(251,191,36,.85)",g.style.background="rgba(10,12,18,0.98)",g.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",g.style.padding="20px 18px 16px 18px",g.style.textAlign="center",g.style.color="#fff",g.style.fontFamily="system-ui,sans-serif",g.style.opacity="0",g.style.transform="translateY(14px) scale(0.96)",g.style.transition="opacity .25s ease-out, transform .25s ease-out",g.innerHTML=`
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
    `,m.appendChild(g),p.appendChild(m),requestAnimationFrame(()=>{g.style.opacity="1",g.style.transform="translateY(0) scale(1)"});const _=()=>{g.style.opacity="0",g.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},N=document.getElementById("cbsgoStreakCloseBtn");N&&(N.onclick=_),m.addEventListener("click",G=>{G.target===m&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{f(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{mr(u?.detail||{})})),window.__cbsgo_friend_gift_received_listener||(window.__cbsgo_friend_gift_received_listener=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{},y=p.cardId||null,x=Number(p.cardQty||0);if(y&&x>0)try{const m=Ht(),g=Number(m[y]||0);m[y]=g+x,eo(m),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged"))}catch(m){console.warn("CBS GO: failed to update My Cards on gift receive",m)}mr({direction:"received",fromNickname:p.senderNickname||null,fromAvatar:p.senderAvatar||"",tickets:Number(p.tickets||0),cbs:Number(p.cbs||0),cardId:y,cardQty:x})})),Et(),jr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",si)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){jn({id:"__daily__",name:"Daily Glow"});return}if(Cr(p))return;const y=yo.find(x=>x.id===p);y&&jn(y)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&po(async()=>{const{completeNode:y}=await Promise.resolve().then(()=>ho);return{completeNode:y}},void 0).then(({completeNode:y})=>{y(p),no()})})),fn().then(()=>{}).catch(()=>{})}function no(){if(!document.querySelector("#app"))return;if(qr()&&fa()){hr();return}ya();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),hr()};window.addEventListener("cbsgo:loginDone",n)}function ro(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function pn(t){const n=ro();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";pn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{pn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function wr(){try{if(!document.getElementById("app")){pn("❌ #app not found in index.html");return}no();const n=ro();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){pn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wr,{once:!0}):wr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
