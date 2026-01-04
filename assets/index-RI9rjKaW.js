import{createClient as xo}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const u of f.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(c){if(c.ep)return;c.ep=!0;const f=o(c);fetch(c.href,f)}})();const yo="modulepreload",go=function(t){return"/cbs-go/"+t},cr={},bo=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let b=function(x){return Promise.all(x.map(h=>Promise.resolve(h).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=b(o.map(x=>{if(x=go(x),x in cr)return;cr[x]=!0;const h=x.endsWith(".css"),y=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":yo,h||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),h)return new Promise((T,P)=>{_.addEventListener("load",T),_.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${x}`)))})}))}function f(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&f(p.reason);return n().catch(f)})},jn="cbsgoLevelUpOverlay",fr="cbsgoLevelUpStyles",Bn="https://smitskecbs.github.io/cbs-go/";function ho(){if(document.getElementById(fr))return;const t=document.createElement("style");t.id=fr,t.textContent=`
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
  `,document.head.appendChild(t)}function zn(){const t=document.getElementById(jn);t&&t.remove()}function mo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const f=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${f}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function dr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function wo(t){ho(),zn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=jn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${dr(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${dr(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&mo(c);const f=()=>zn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),b=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=f),p&&(p.onclick=f),b&&(b.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Bn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Bn),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+Bn)}}),setTimeout(()=>{document.getElementById(jn)&&zn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{wo(t?.detail||{})}));const vo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Mr="cbsgo_state_v6";function _o(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function So(){return{xp:0,completed:{},updatedAt:Date.now()}}function Gt(){const t=localStorage.getItem(Mr);return _o(t,So())}function Lr(t){t.updatedAt=Date.now(),localStorage.setItem(Mr,JSON.stringify(t))}function Hn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function un(){return Number(Gt().xp||0)}function Wt(){const t=un();let n=1,o=t;for(;;){const l=Hn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function Ar(){const t=un();let n=1,o=t;for(;;){const l=Hn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function Br(){return Hn(Wt())}function qt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Gt();const o=Wt(),l=Gt();l.xp=Number(l.xp||0)+n,Lr(l);const c=Wt();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function zr(t){const n=String(t||"");if(!n)return!1;const o=Gt();return!!(o.completed&&o.completed[n])}function Nr(t){const n=String(t||"");if(!n)return;const o=Gt();o.completed||(o.completed={}),o.completed[n]=Date.now(),Lr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const ko=Object.freeze(Object.defineProperty({__proto__:null,addXp:qt,completeNode:Nr,getLevel:Wt,getXp:un,getXpIntoLevel:Ar,getXpNeededThisLevel:Br,isNodeCompleted:zr},Symbol.toStringTag,{value:"Module"})),Ir="cbsgoPuzzleModal";function Co(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nn(){const t=document.getElementById(Ir);t&&t.remove()}function Rn(t){Nn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],f=180,u=18,p=l.length,b=.01;let x=[],h=null,y=0,_=u,T=!1,P=!1,E=null;const N=t?.name||"CBS GO Puzzle",q=document.createElement("div");q.id=Ir,q.style.position="fixed",q.style.inset="0",q.style.zIndex="999999",q.style.display="flex",q.style.alignItems="center",q.style.justifyContent="center",q.style.padding="16px",q.style.background="rgba(0,0,0,.70)",q.style.backdropFilter="blur(12px)",q.style.fontFamily="system-ui, sans-serif",q.style.color="#fff",q.innerHTML=`
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
          ${Co(N)}
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
  `,document.body.appendChild(q);const W=document.getElementById("cbsgoBoard"),be=document.getElementById("cbsgoScore"),ne=document.getElementById("cbsgoMoves"),se=document.getElementById("cbsgoStatus"),Se=document.getElementById("cbsgoPuzzleClose"),ke=document.getElementById("cbsgoPuzzleOk"),$e=document.getElementById("cbsgoConfettiLayer");function Ie(F){se&&(se.textContent=F||"")}function it(){if(!$e)return;$e.style.display="block",$e.innerHTML="";const F=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],Y=40;for(let K=0;K<Y;K++){const j=document.createElement("div"),te=6+Math.floor(Math.random()*6),me=Math.random()*100,Ee=Math.random()*.6,Me=1+Math.random()*.6,bt=Math.random()*360;j.style.position="absolute",j.style.top="-10%",j.style.left=`${me}%`,j.style.width=`${te}px`,j.style.height=`${te*2}px`,j.style.background=F[K%F.length],j.style.opacity="0.9",j.style.borderRadius="2px",j.style.transform=`rotate(${bt}deg)`,j.style.animation=`cbsgoConfettiFall ${Me}s ease-out ${Ee}s forwards`,$e.appendChild(j)}}function at(){return Math.floor(Math.random()*l.length)}function At(){x=[];for(let F=0;F<n;F++){const Y=[];for(let K=0;K<o;K++)Math.random()<b?Y.push(p):Y.push(at());x.push(Y)}}function st(F){return F===p}function Pe(){if(W){W.innerHTML="";for(let F=0;F<n;F++)for(let Y=0;Y<o;Y++){const K=x[F][Y],j=document.createElement("div");j.dataset.row=String(F),j.dataset.col=String(Y),j.style.borderRadius="12px",j.style.display="flex",j.style.alignItems="center",j.style.justifyContent="center",j.style.cursor=P?"default":"pointer",j.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",j.style.fontSize="20px",st(K)?(j.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",j.textContent="💥"):(j.style.background=l[K]||"#444",j.textContent=c[K]||"⬛"),h&&h.row===F&&h.col===Y&&(j.style.outline="2px solid #fff",j.style.outlineOffset="2px"),j.addEventListener("click",()=>{je(F,Y)}),j.addEventListener("touchstart",te=>{if(P)return;const me=te.touches[0];E={row:F,col:Y,x:me.clientX,y:me.clientY}}),j.addEventListener("touchend",te=>{if(!E||P)return;const me=te.changedTouches[0],Ee=me.clientX-E.x,Me=me.clientY-E.y;if(Math.sqrt(Ee*Ee+Me*Me)<18){je(F,Y),E=null;return}let Ye=E.row,Je=E.col;Math.abs(Ee)>Math.abs(Me)?Ee>0?Je+=1:Je-=1:Me>0?Ye+=1:Ye-=1,Ye>=0&&Ye<n&&Je>=0&&Je<o&&Oe(E.row,E.col,Ye,Je),E=null,te.preventDefault()}),W.appendChild(j)}}}function xt(F,Y){if(!F||!Y)return!1;const K=Math.abs(F.row-Y.row),j=Math.abs(F.col-Y.col);return K+j===1}function Ue(F,Y){const K=x[F.row][F.col];x[F.row][F.col]=x[Y.row][Y.col],x[Y.row][Y.col]=K}function yt(){const F=new Set;for(let Y=0;Y<n;Y++){let K=x[Y][0],j=0;for(let te=1;te<=o;te++){const me=te<o?x[Y][te]:null;if(me===K)continue;const Ee=te-j;if(K!=null&&Ee>=3)for(let Me=j;Me<te;Me++)F.add(`${Y},${Me}`);K=me,j=te}}for(let Y=0;Y<o;Y++){let K=x[0][Y],j=0;for(let te=1;te<=n;te++){const me=te<n?x[te][Y]:null;if(me===K)continue;const Ee=te-j;if(K!=null&&Ee>=3)for(let Me=j;Me<te;Me++)F.add(`${Me},${Y}`);K=me,j=te}}return F}function qe(F){if(!F||!F.size)return 0;const Y=F.size;y+=Y*4,be&&(be.textContent=String(y)),!P&&y>=f&&gt(!0);for(const K of F){const[j,te]=K.split(","),me=Number(j),Ee=Number(te);x[me][Ee]=null}for(let K=0;K<o;K++){let j=n-1;for(let te=n-1;te>=0;te--)x[te][K]!=null&&(x[j][K]=x[te][K],j--);for(let te=j;te>=0;te--)Math.random()<b?x[te][K]=p:x[te][K]=at()}return Y}function Qe(F,Y){const K=new Set;for(let j=0;j<o;j++)K.add(`${F},${j}`);for(let j=0;j<n;j++)K.add(`${j},${Y}`);qe(K),Pe(),P||setTimeout(()=>Bt(!1),120)}function Bt(F=!1){if(P)return;T=!0;const Y=()=>{if(P){T=!0;return}const K=yt();if(!K.size){T=!1,Pe(),F&&!P&&(_<=0?Ke():Ie("Nice! Keep matching."));return}qe(K),Pe(),setTimeout(Y,120)};Y()}function gt(F){if(!P)if(P=!0,T=!0,F){Ie("Great job! Puzzle completed 🎉");try{t?.id&&Nr(t.id),qt(10)}catch{}it(),setTimeout(()=>{Nn()},1600)}else Ie("Out of moves. Try again next time 🙂")}function Ke(){y>=f?gt(!0):_<=0&&gt(!1)}function Oe(F,Y,K,j){if(T||P)return;if(_<=0){Ke();return}const te={row:F,col:Y},me={row:K,col:j};if(!xt(te,me))return;const Ee=x[F][Y],Me=x[K][j],bt=st(Ee)||st(Me);if(Ue(te,me),h=null,_--,ne&&(ne.textContent=String(_)),bt){Pe();const Ye=st(x[F][Y])?{row:F,col:Y}:{row:K,col:j};Qe(Ye.row,Ye.col),Ke();return}if(!yt().size){Ue(te,me),Pe(),Ie("No match… try another swap."),Ke();return}Ie(""),Pe(),Bt(!0)}function je(F,Y){if(T||P)return;if(_<=0){Ke();return}const K={row:F,col:Y};if(!h){h=K,Pe();return}if(h.row===F&&h.col===Y){h=null,Pe();return}if(!xt(h,K)){h=K,Pe();return}Oe(h.row,h.col,K.row,K.col)}function de(){Nn()}Se&&(Se.onclick=de),ke&&(ke.onclick=()=>{de()}),At(),Pe(),Ie("Tap or swipe two neighboring tiles to swap them.")}const Tr="cbsgo_inventory_v2";function Eo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Mo(){return{tickets:0,cbs:0,cards:{}}}function pt(){const t=localStorage.getItem(Tr),n=Eo(t,Mo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Xn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Tr,JSON.stringify(n))}function Ot(){return Number(pt().tickets||0)}function jt(){return Number(pt().cbs||0)}function Lt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return pt();const o=pt();let c=Number(o.tickets||0)+n;return c<0&&(c=0),o.tickets=c,Xn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function xn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return pt();const o=pt();let c=Number(o.cbs||0)+n;return c<0&&(c=0),o.cbs=c,Xn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const $r="cbsgo_steps_v6",Lo="cbsgo_steps_v5",Ao="cbsgo_gps_autostart_v2",Pr="cbsgo_daily_puzzle_v1",Bo=.75,Ct=5e3,sn=7,Fn=100,zo=1e3,No=.5,Io=2e3,To=4.5,In=1500,Tn=200,$o=.25,Po=.05,Oo=.3;let tn=null,nn=!1,wt={msg:"init"};function Un(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Or="cbsgo_cards_v1",jo=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Ro(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Fo(t){return jo.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Uo(){try{const t=localStorage.getItem(Or),n=Un(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const f=Number(c.count);Number.isFinite(f)&&f>0&&(o[l]=f)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Go(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,f]of Object.entries(n)){const u=Number(f||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Or,JSON.stringify(l))}catch{}}function Wo(t,n=1){const o=Ro(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const f={...Uo().counts||{}},p=Number(f[o]||0)+l;f[o]=p,Go({counts:f});const b=Fo(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:f}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:b}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:b}}))}catch{}return{cardId:o,count:p,card:b}}function rt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Do(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,f=new Date(o,l-1,c);return Number.isNaN(f.getTime())?null:f}function Yo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function jr(t,n){const o=Do(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const f=new Date(o.getTime());f.setDate(f.getDate()-c),l.push(Yo(f))}return l}function ln(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:rt(),daySteps:0,dayMeters:0,dailyGoalSteps:Ct,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function qo(t){const n=rt();return!t||typeof t!="object"?ln():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Ct),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Ct),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function yn(t){t.updatedAt=Date.now(),localStorage.setItem($r,JSON.stringify(t))}function Ko(t,n){if(!n)return;const o=jr(n,sn);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(xn(Fn),Kt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:sn,rewardCbs:Fn,lastDayKey:n}})))}function pr(t){t=qo(t||ln());const n=rt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Ko(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,yn(t)}return t}function ut(){let t=localStorage.getItem($r);if(!t){const o=localStorage.getItem(Lo);if(o){const l=Un(o,ln()),c=pr(l);return yn(c),c}}const n=Un(t,ln());return pr(n)}function rn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Ho()}}))}function Vn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Kt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Zn(t,n,o,l){const c=Number(t||0),f=Number(n||0),u=0;if(!(!c&&!f&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:f,cbs:u,reason:l||"distance"}}))}catch{}}function Ho(){const t=ut();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Xo(){const t=ut(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Vo(){return Xo()/1e3}function Zo(){const t=ut(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||Ct),l=!!t.dailyGoalReached,c=t.dayKey||rt(),f=t.streak||{},p=jr(c,sn).map(b=>{let x=!1;return b===c?x=l:x=!!f[b],{dateKey:b,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:sn,rewardPerStreak:Fn}}function ur(){return!!nn}function Qo(){try{return localStorage.getItem(Pr)===rt()}catch{return!1}}function Jo(){try{localStorage.setItem(Pr,rt())}catch{}}function ei(t,n){return Qo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:rt()}})),Jo(),!0)}function xr(){const t=ut(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function ti(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<In)return;const f=Math.floor(c/In);f<=0||(Lt(f),Kt(),Zn(0,f,0,"boost"),t.boostLastStep=o+f*In)}function ni(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Tn){t.chestMeters=n;return}let o=0;for(;n>=Tn&&o<5;)if(n-=Tn,o+=1,Math.random()<$o){const l=Math.random()<Po,c=l?10:3,f=l?2:1;qt(c),Vn(),Lt(f),Kt();const u=l&&Math.random()<Oo;Zn(c,f,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:f,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function ri(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function oi(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),f=Number(t.xpKmAwarded||0);if(c>f){const x=c-f;x>0&&(qt(x),Vn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),b=Number(t.ticketChunksAwarded||0);if(p>b){const x=p-b;x>0&&(Lt(x),Kt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Zn(o,l,0,"distance")}function ii(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return ut();const o=ut();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/Bo);if(c>l){const f=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+f}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||Ct)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||rt(),steps:o.daySteps,goal:o.dailyGoalSteps||Ct}}))),oi(o),ti(o),ni(o),yn(o),rn(),o}function ai(){tn!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(tn),tn=null}async function yr(t={}){const n=!!t.silent;if(!navigator.geolocation)return wt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Ao,"1")}catch{}ai(),nn=!0,wt={msg:"requesting",t:Date.now()};try{return tn=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,f=o.coords.accuracy||999,u=Date.now(),p=ut(),b=p.lastPos;p.lastPos={lat:l,lng:c,t:u},yn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:f,heading:x,speed:h,t:u}})),f>zo){wt={lat:l,lng:c,acc:f,t:u,reason:"accuracy",boostMs:xr()},rn();return}ei(l,c);let y=0,_=0,T=0,P=0,E="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(y=ri({lat:b.lat,lng:b.lng},{lat:l,lng:c}),_=Math.max(1,(u-b.t)/1e3),T=y/_,y<No?E="jitter":y>Io?E="teleport":T>To?E="too-fast":(ii(y),P=y,E="ok")),wt={lat:l,lng:c,acc:f,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite(T)?Number(T.toFixed(2)):0,added:Math.round(P),reason:E,boostMs:xr()},rn()},o=>{nn=!1,wt={err:o?.message||"GPS blocked",t:Date.now()},rn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return nn=!1,wt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function si(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ur()||await yr({silent:!0}))();const n=async()=>{ur()||await yr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(qt(o),Vn()),(l>0||c>0)&&(l>0&&Lt(l),c>0&&xn(c),Kt());const f=n.cardId||n.card_id;if(f)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Wo(f,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Rr(){const t=un(),n=Wt(),o=Ar(),l=Br(),c=Vo(),f=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function Fr(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:f}=Zo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function Ur(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function li(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Gr="cbsgo_player_name_v2",Qn="cbsgo_player_avatar_v2";function ot(){try{return localStorage.getItem(Gr)||"Sovereign"}catch{return"Sovereign"}}function Wr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Gr,n)}catch{}return n}function gn(){try{return localStorage.getItem(Qn)||""}catch{return""}}function ci(t){const n=String(t||"");try{localStorage.setItem(Qn,n)}catch{}return n}function fi(){try{localStorage.removeItem(Qn)}catch{}}let X=null,et=null,tt=null,$t=null,Rt=null,We=null,Te=null,vt=0,ft=!1,Ze=!0,Ge=null;const Xe=new Map;let Ve=!0,Ft={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const di="48a387bba00043ac4ba5823371abc9d2",Dt=80,pi=6,ui=80,xi=220,yi=6e4,gi=5*6e4,bi=300,hi=.35,$n=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],mi=350,wi=.35,vi=120;let cn=0,_t=0,on=null,Gn=!1,kt=[];function dt(t){return document.getElementById(t)}function St(t){const n=dt("cbsgoMapHost");if(!n)return;let o=dt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function _i(){const t=String(ot()||"").trim();return t?t[0].toUpperCase():"🙂"}function Wn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Et(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Dr(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,f=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+f,lng:t.lng+u}}function Si(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),f=o(n.lng-t.lng),u=Math.sin(f)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(f);let b=Math.atan2(u,p);return b=b*180/Math.PI,b=(b+360)%360,b}function ki(t,n,o){const c=n/6371e3,f=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,b=Math.sin(u),x=Math.cos(u),h=Math.sin(c),y=Math.cos(c),_=Math.asin(b*y+x*h*Math.cos(f)),T=p+Math.atan2(Math.sin(f)*h*x,y-b*Math.sin(_));return[_*180/Math.PI,T*180/Math.PI]}function Ci(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Yr(){const{temp:t,iconEmoji:n}=Ft;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function qr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;Ci();const{condition:n,isNight:o}=Ft;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const f=[];for(let u=0;u<96;u++){const p=Math.random()*100,b=Math.random()*16-8,x=Math.random()*2.5,h=2+Math.random()*1.5;f.push(`
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
      `)}l=f.join("")}else if(n==="snow"){const f=[];for(let u=0;u<80;u++){const p=Math.random()*100,b=Math.random()*20-10,x=Math.random()*4,h=6+Math.random()*4;f.push(`
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
      `)}l=f.join("")}else l="";t.innerHTML=l}async function Ei(t,n){const o=Date.now();if(!(Ft.lastUpdated&&o-Ft.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${di}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const f=await c.json(),u=f?.main?.temp,p=f?.weather?.[0]?.icon||"01d",b=String(f?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),h="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(h="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(h="🌧️",y="rain"):p.startsWith("11")?(h="⛈️",y="storm"):p.startsWith("13")?(h="❄️",y="snow"):p.startsWith("50")&&(h="🌫️",y="mist"),b.includes("rain")&&(y="rain"),b.includes("snow")&&(y="snow"),b.includes("thunder")&&(y="storm");try{const T=Number(f?.dt||0),P=Number(f?.timezone||0);if(T&&Number.isFinite(P)){const N=((T+P)/3600%24+24)%24;x=N<7||N>=19}}catch{}y==="clear"?h=x?"🌙":"☀️":y==="clouds"?h="☁️":y==="rain"?h="🌧️":y==="storm"?h="⛈️":y==="snow"?h="❄️":y==="mist"&&(h="🌫️"),Ft={temp:u,iconEmoji:h,condition:y,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Yr()),qr()}catch(l){console.warn("Weather fetch failed",l)}}function Mi(t){const n=gn();if(n){const c=`
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
    ">${Wn(_i())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function gr(t,n){const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Li(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Wn(o)}');
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
    ">${Wn(c)}</div>
  `;return t.divIcon({html:f,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function Ai(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Bi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function zi(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Ni(){if(!$n.length)return null;const t=Math.floor(Math.random()*$n.length);return $n[t]}function Ii(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let f=null,u=0;if(Math.random()<hi){const p=Ni();p&&(f=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:f,cardCount:u}}function Ti(t){if(!X||!We||!t)return;const n=Date.now();if(n-cn<yi||We.getLayers().length>=pi)return;const l=window.L;if(!l)return;const c=zi(),f=Ii(c),u=Dr(t,ui,xi),p=Ai(l),b=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),h={marker:b,createdAt:n,lat:u.lat,lng:u.lng,reward:f};kt.push(h),b.on("click",()=>{if(!Te){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:Te[0],lng:Te[1]},_={lat:u.lat,lng:u.lng},T=Et(y,_);if(T>Dt){alert(`Too far to open this gift.

Distance: ${Math.round(T)}m
Needed: ≤ ${Dt}m`);return}We.removeLayer(b),kt=kt.filter(Se=>Se.marker!==b);const{xp:P,tickets:E,cbs:N,cardId:q,cardCount:W}=f,be=[];P&&be.push(`+${P} XP`),E&&be.push(`+${E} ticket${E===1?"":"s"}`),N&&be.push(`+${N} CBS`),q&&W>0&&be.push(`+${W} card${W===1?"":"s"}`);const ne=be.length?be.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${ne}`);const se={kind:"mystery",xp:P||0,tickets:E||0,cbs:N||0,cardId:q||null,cardCount:W||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:se}))}catch{}}),b.addTo(We),cn=n}function $i(t){if(!X||!We||!t)return;const n=Date.now();let o=0;kt=kt.filter(l=>{if(!l||!l.marker||!We.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>gi)return We.removeLayer(l.marker),o+=1,!1;const f=Et({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(f)&&f>bi?(We.removeLayer(l.marker),o+=1,!1):!0}),o>0&&We.getLayers().length===0&&(cn=0)}function Pi(t){if(!X||!Rt||!t||on)return;const n=window.L;if(!n)return;if(Gn){if(_t<mi||Math.random()>wi)return;_t=0}else{if(_t<vi)return;_t=0,Gn=!0}const o=Dr(t,60,140),l=Bi(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!Te){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:Te[0],lng:Te[1]},u={lat:o.lat,lng:o.lng},p=Et(f,u);if(p>Dt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Dt}m`);return}Rt.removeLayer(c),on=null,Rn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(Rt),on=c}function Oi(t){const n=window.L;if(!n||!X||!t)return;const o=Dt;$t?($t.setLatLng(t),$t.setRadius(o)):$t=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(X)}function ji(t){const n=window.L;if(!n||!X)return;const o=Mi(n);if(et?(et.setIcon(o),et.setLatLng(t)):(et=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(X),X.setView(t,19)),tt?(tt.setIcon(gr(n,vt)),tt.setLatLng(t)):tt=n.marker(t,{icon:gr(n,vt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(X),et&&et.bringToFront&&et.bringToFront(),tt&&tt.bringToFront&&tt.bringToFront(),Oi(t),Ze&&!ft&&X)try{const l=X.getZoom()||19;let c=t;Number.isFinite(vt)&&(c=ki(t,40,vt));const f=X.getCenter(),u=Et({lat:f.lat,lng:f.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&X.setView(c,l)}catch{}}function Kr(){const t=window.L;return!t||!X?null:(Ge?(Ve&&!X.hasLayer(Ge)&&Ge.addTo(X),!Ve&&X.hasLayer(Ge)&&X.removeLayer(Ge)):(Ge=t.layerGroup(),Ve&&Ge.addTo(X)),Ge)}function Ri(t){if(!Array.isArray(t)||!X)return[];const n=X.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(f=>{if(!f||f.isMe||typeof f.lat!="number"||typeof f.lng!="number")return;const u=Math.round(f.lat*o)/o,p=Math.round(f.lng*o)/o,b=`${u}_${p}`;l.has(b)||l.set(b,[]),l.get(b).push(f)});const c=[];for(const[f,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||f,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,b=0;u.forEach(y=>{p+=y.lat,b+=y.lng});const x=p/u.length,h=b/u.length;c.push({id:`cluster_${f}`,lat:x,lng:h,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Fi(t){const n=window.L;if(!n||!X)return;const o=Kr();if(!o)return;if(!Ve){for(const[f,u]of Xe.entries())o.removeLayer(u),Xe.delete(f);return}const l=Ri(t),c=new Set;l.forEach(f=>{if(!f||typeof f.lat!="number"||typeof f.lng!="number")return;const u=f.id||`${f.lat},${f.lng}`;c.add(u);const p=[f.lat,f.lng];let b=Xe.get(u);if(b)b.setLatLng(p);else{const x=f.isCluster&&f.count>1?String(f.count):f.nickname||"Anon",h=Li(n,x,f.avatar,f.isCluster);b=n.marker(p,{icon:h,pane:"cbsgo-others-pane"});const y=f.isCluster&&f.count>1?`${f.count} CBS-GO explorers nearby`:`${f.nickname||"CBS-GO explorer"}`;b.bindPopup(y),b.addTo(o),Xe.set(u,b)}});for(const[f,u]of Xe.entries())c.has(f)||(o.removeLayer(u),Xe.delete(f))}function Ui(){return`
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
        <span id="cbsgoWeatherLabel">${Yr()}</span>
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
  `}function Gi(){try{X&&X.remove()}catch{}X=null,et=null,tt=null,$t=null,Rt=null,We=null,Te=null,ft=!1,Ze=!0,cn=0,_t=0,on=null,Gn=!1,Ge=null,Xe.clear(),kt=[]}function Wi(){const t=window.L,n=dt("cbsgoMap");if(!t||!n)return!1;Gi();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));X=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=X.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=X.createPane("cbsgo-others-pane");c.style.zIndex="640";const f=X.createPane("cbsgo-loot-pane");f.style.zIndex="630";const u=X.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(X),X.setMaxBounds(o),X.setView([51.687,4.87],16),Rt=t.layerGroup().addTo(X),We=t.layerGroup().addTo(X),X.on("dragstart",()=>{Ze=!1}),X.on("zoomstart",()=>{Ze=!1}),!0}function Di(){!navigator.geolocation||!X||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,f={lat:n,lng:o},u=Te?{lat:Te[0],lng:Te[1]}:null;if(Te=[n,o],Number.isFinite(c))vt=c;else if(u){const p=Et(u,f);Number.isFinite(p)&&p>2&&(vt=Si(u,f))}if(ji([n,o]),u){const p=Et(u,f);if(Number.isFinite(p)&&p>1&&(_t+=p),Number.isFinite(p)&&p>20&&!Ze&&!ft&&X){Ze=!0;const b=X.getZoom()||19;X.setView([n,o],b)}}Pi(f),Ti(f),$i(f),Ei(n,o),St(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{St(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Yi(){let t=0;const n=120,o=()=>{if(t++,!dt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(St("Loading map engine…"),t<n)return setTimeout(o,100);St("Map engine failed (Leaflet not found). Refresh.");return}if(!Wi()){St("Could not init map. Refresh.");return}const c=dt("cbsgoCenterBtn");c&&(c.onclick=()=>{X&&Te&&(Ze=!0,ft=!1,X.setView(Te,19))});const f=dt("cbsgoCompassBtn");f&&(f.onclick=()=>{X&&(ft=!ft,ft?(Ze=!1,X.setView([51.687,4.87],3)):Te&&(Ze=!0,X.setView(Te,16)))});const u=dt("cbsgoOnlineToggleBtn");if(u){const p=()=>{Ve?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Ve=!Ve;const b=Kr();if(b&&X&&(Ve?X.hasLayer(b)||b.addTo(X):X.hasLayer(b)&&X.removeLayer(b)),p(),!Ve&&Ge){for(const[x,h]of Xe.entries())Ge.removeLayer(h);Xe.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const b=p?.detail?.players||[];Fi(b)})),qr(),St("Loading GPS…"),Di()};o()}const qi="cbsgo_cards_v1";function Ki(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Jn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function er(){const t=localStorage.getItem(qi),n=Ki(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function nt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Hr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Hi(){const t=Jn(),n=er();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Xi(){const t=Jn(),n=er();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),f=Number.isFinite(c)&&c>0,u=Hr(l.rarity),p=f?u:"rgba(31,41,55,.9)",b=f?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=f?l.emoji||"🃏":"❓",h=f?nt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=nt(l.set||"Set"),_=f?`<div style="
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
    `}function Vi(){const t=Hi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
        ${Xi()}
      </div>
    </div>
  `}function Zi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Vi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const f=Jn(),u=new Map(f.map(x=>[x.id,x]));function p(x){const h=u.get(x);if(!h)return;const y=er(),_=Number(y[x]||0),T=Number.isFinite(_)&&_>0,P=T?h.emoji||"🃏":"❓",E=T?h.name||"Card":"Unknown card",N=h.set||"Set",q=h.rarity||"common",W=Hr(q),be={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[q]||"Common",ne=document.createElement("div");ne.style.position="fixed",ne.style.inset="0",ne.style.display="flex",ne.style.alignItems="center",ne.style.justifyContent="center",ne.style.background="rgba(0,0,0,0.65)",ne.style.pointerEvents="auto",ne.style.zIndex="8600";const se=document.createElement("div");se.style.width="min(260px, 82vw)",se.style.borderRadius="20px",se.style.border=`1px solid ${W}`,se.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",se.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",se.style.padding="16px 14px 14px 14px",se.style.textAlign="center",se.style.color="#fff",se.style.fontFamily="system-ui,sans-serif",se.style.opacity="0",se.style.transform="translateY(14px) scale(0.96)",se.style.transition="opacity .2s ease-out, transform .2s ease-out";const Se=T?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',ke=T?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;se.innerHTML=`
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
          border:1px solid ${W};
          font-size:10px;
        ">
          ${nt(be)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${W};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${nt(P)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${nt(E)}
      </div>

      ${Se}
      ${ke}

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
    `,ne.appendChild(se),document.body.appendChild(ne),requestAnimationFrame(()=>{se.style.opacity="1",se.style.transform="translateY(0) scale(1)"});const $e=()=>{se.style.opacity="0",se.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(ne)},200)},Ie=se.querySelector("#cbsgoCardPreviewCloseBtn");Ie&&(Ie.onclick=$e),ne.addEventListener("click",it=>{it.target===ne&&$e()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const h=x.getAttribute("data-card-id");h&&p(h)})})}function Qi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ji(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function ea(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Pn={exports:{}};const ta={},na=Object.freeze(Object.defineProperty({__proto__:null,default:ta},Symbol.toStringTag,{value:"Module"})),ra=Ji(na);var br;function oa(){return br||(br=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),f=new Uint8Array(32);f[0]=9;var u=o(),p=o([1]),b=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),T=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function P(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function E(r,a,i,e,s){var g,m=0;for(g=0;g<s;g++)m|=r[a+g]^i[e+g];return(1&m-1>>>8)-1}function N(r,a,i,e){return E(r,a,i,e,16)}function q(r,a,i,e){return E(r,a,i,e,32)}function W(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,A=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,z=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,xe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,D=g,I=m,R=k,U=A,B=G,w=z,v=xe,M=$,S=V,C=Z,L=oe,H=re,ie=Q,le=ee,ae=J,d,fe=0;fe<20;fe+=2)d=O+H|0,U^=d<<7|d>>>25,d=U+O|0,M^=d<<9|d>>>23,d=M+U|0,H^=d<<13|d>>>19,d=H+M|0,O^=d<<18|d>>>14,d=B+D|0,S^=d<<7|d>>>25,d=S+B|0,ie^=d<<9|d>>>23,d=ie+S|0,D^=d<<13|d>>>19,d=D+ie|0,B^=d<<18|d>>>14,d=C+w|0,le^=d<<7|d>>>25,d=le+C|0,I^=d<<9|d>>>23,d=I+le|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ae+L|0,R^=d<<7|d>>>25,d=R+ae|0,v^=d<<9|d>>>23,d=v+R|0,L^=d<<13|d>>>19,d=L+v|0,ae^=d<<18|d>>>14,d=O+R|0,D^=d<<7|d>>>25,d=D+O|0,I^=d<<9|d>>>23,d=I+D|0,R^=d<<13|d>>>19,d=R+I|0,O^=d<<18|d>>>14,d=B+U|0,w^=d<<7|d>>>25,d=w+B|0,v^=d<<9|d>>>23,d=v+w|0,U^=d<<13|d>>>19,d=U+v|0,B^=d<<18|d>>>14,d=C+S|0,L^=d<<7|d>>>25,d=L+C|0,M^=d<<9|d>>>23,d=M+L|0,S^=d<<13|d>>>19,d=S+M|0,C^=d<<18|d>>>14,d=ae+le|0,H^=d<<7|d>>>25,d=H+ae|0,ie^=d<<9|d>>>23,d=ie+H|0,le^=d<<13|d>>>19,d=le+ie|0,ae^=d<<18|d>>>14;O=O+s|0,D=D+g|0,I=I+m|0,R=R+k|0,U=U+A|0,B=B+G|0,w=w+z|0,v=v+xe|0,M=M+$|0,S=S+V|0,C=C+Z|0,L=L+oe|0,H=H+re|0,ie=ie+Q|0,le=le+ee|0,ae=ae+J|0,r[0]=O>>>0&255,r[1]=O>>>8&255,r[2]=O>>>16&255,r[3]=O>>>24&255,r[4]=D>>>0&255,r[5]=D>>>8&255,r[6]=D>>>16&255,r[7]=D>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=R>>>0&255,r[13]=R>>>8&255,r[14]=R>>>16&255,r[15]=R>>>24&255,r[16]=U>>>0&255,r[17]=U>>>8&255,r[18]=U>>>16&255,r[19]=U>>>24&255,r[20]=B>>>0&255,r[21]=B>>>8&255,r[22]=B>>>16&255,r[23]=B>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=M>>>0&255,r[33]=M>>>8&255,r[34]=M>>>16&255,r[35]=M>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=L>>>0&255,r[45]=L>>>8&255,r[46]=L>>>16&255,r[47]=L>>>24&255,r[48]=H>>>0&255,r[49]=H>>>8&255,r[50]=H>>>16&255,r[51]=H>>>24&255,r[52]=ie>>>0&255,r[53]=ie>>>8&255,r[54]=ie>>>16&255,r[55]=ie>>>24&255,r[56]=le>>>0&255,r[57]=le>>>8&255,r[58]=le>>>16&255,r[59]=le>>>24&255,r[60]=ae>>>0&255,r[61]=ae>>>8&255,r[62]=ae>>>16&255,r[63]=ae>>>24&255}function be(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,A=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,z=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,xe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,D=g,I=m,R=k,U=A,B=G,w=z,v=xe,M=$,S=V,C=Z,L=oe,H=re,ie=Q,le=ee,ae=J,d,fe=0;fe<20;fe+=2)d=O+H|0,U^=d<<7|d>>>25,d=U+O|0,M^=d<<9|d>>>23,d=M+U|0,H^=d<<13|d>>>19,d=H+M|0,O^=d<<18|d>>>14,d=B+D|0,S^=d<<7|d>>>25,d=S+B|0,ie^=d<<9|d>>>23,d=ie+S|0,D^=d<<13|d>>>19,d=D+ie|0,B^=d<<18|d>>>14,d=C+w|0,le^=d<<7|d>>>25,d=le+C|0,I^=d<<9|d>>>23,d=I+le|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ae+L|0,R^=d<<7|d>>>25,d=R+ae|0,v^=d<<9|d>>>23,d=v+R|0,L^=d<<13|d>>>19,d=L+v|0,ae^=d<<18|d>>>14,d=O+R|0,D^=d<<7|d>>>25,d=D+O|0,I^=d<<9|d>>>23,d=I+D|0,R^=d<<13|d>>>19,d=R+I|0,O^=d<<18|d>>>14,d=B+U|0,w^=d<<7|d>>>25,d=w+B|0,v^=d<<9|d>>>23,d=v+w|0,U^=d<<13|d>>>19,d=U+v|0,B^=d<<18|d>>>14,d=C+S|0,L^=d<<7|d>>>25,d=L+C|0,M^=d<<9|d>>>23,d=M+L|0,S^=d<<13|d>>>19,d=S+M|0,C^=d<<18|d>>>14,d=ae+le|0,H^=d<<7|d>>>25,d=H+ae|0,ie^=d<<9|d>>>23,d=ie+H|0,le^=d<<13|d>>>19,d=le+ie|0,ae^=d<<18|d>>>14;r[0]=O>>>0&255,r[1]=O>>>8&255,r[2]=O>>>16&255,r[3]=O>>>24&255,r[4]=B>>>0&255,r[5]=B>>>8&255,r[6]=B>>>16&255,r[7]=B>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ae>>>0&255,r[13]=ae>>>8&255,r[14]=ae>>>16&255,r[15]=ae>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=M>>>0&255,r[25]=M>>>8&255,r[26]=M>>>16&255,r[27]=M>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function ne(r,a,i,e){W(r,a,i,e)}function se(r,a,i,e){be(r,a,i,e)}var Se=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function ke(r,a,i,e,s,g,m){var k=new Uint8Array(16),A=new Uint8Array(64),G,z;for(z=0;z<16;z++)k[z]=0;for(z=0;z<8;z++)k[z]=g[z];for(;s>=64;){for(ne(A,k,m,Se),z=0;z<64;z++)r[a+z]=i[e+z]^A[z];for(G=1,z=8;z<16;z++)G=G+(k[z]&255)|0,k[z]=G&255,G>>>=8;s-=64,a+=64,e+=64}if(s>0)for(ne(A,k,m,Se),z=0;z<s;z++)r[a+z]=i[e+z]^A[z];return 0}function $e(r,a,i,e,s){var g=new Uint8Array(16),m=new Uint8Array(64),k,A;for(A=0;A<16;A++)g[A]=0;for(A=0;A<8;A++)g[A]=e[A];for(;i>=64;){for(ne(m,g,s,Se),A=0;A<64;A++)r[a+A]=m[A];for(k=1,A=8;A<16;A++)k=k+(g[A]&255)|0,g[A]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(ne(m,g,s,Se),A=0;A<i;A++)r[a+A]=m[A];return 0}function Ie(r,a,i,e,s){var g=new Uint8Array(32);se(g,e,s,Se);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return $e(r,a,i,m,g)}function it(r,a,i,e,s,g,m){var k=new Uint8Array(32);se(k,g,m,Se);for(var A=new Uint8Array(8),G=0;G<8;G++)A[G]=g[G+16];return ke(r,a,i,e,s,A,k)}var at=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,m,k,A;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,A=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|A<<8)&8191,this.r[9]=A>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};at.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,m,k,A,G,z,xe,$,V,Z,oe,re,Q,ee,J,O,D,I,R=this.h[0],U=this.h[1],B=this.h[2],w=this.h[3],v=this.h[4],M=this.h[5],S=this.h[6],C=this.h[7],L=this.h[8],H=this.h[9],ie=this.r[0],le=this.r[1],ae=this.r[2],d=this.r[3],fe=this.r[4],ye=this.r[5],ge=this.r[6],ce=this.r[7],pe=this.r[8],ue=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,R+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,U+=(s>>>13|g<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,B+=(g>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,A=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|A<<12)&8191,M+=A>>>1&8191,G=r[a+10]&255|(r[a+11]&255)<<8,S+=(A>>>14|G<<2)&8191,z=r[a+12]&255|(r[a+13]&255)<<8,C+=(G>>>11|z<<5)&8191,xe=r[a+14]&255|(r[a+15]&255)<<8,L+=(z>>>8|xe<<8)&8191,H+=xe>>>5|e,$=0,V=$,V+=R*ie,V+=U*(5*ue),V+=B*(5*pe),V+=w*(5*ce),V+=v*(5*ge),$=V>>>13,V&=8191,V+=M*(5*ye),V+=S*(5*fe),V+=C*(5*d),V+=L*(5*ae),V+=H*(5*le),$+=V>>>13,V&=8191,Z=$,Z+=R*le,Z+=U*ie,Z+=B*(5*ue),Z+=w*(5*pe),Z+=v*(5*ce),$=Z>>>13,Z&=8191,Z+=M*(5*ge),Z+=S*(5*ye),Z+=C*(5*fe),Z+=L*(5*d),Z+=H*(5*ae),$+=Z>>>13,Z&=8191,oe=$,oe+=R*ae,oe+=U*le,oe+=B*ie,oe+=w*(5*ue),oe+=v*(5*pe),$=oe>>>13,oe&=8191,oe+=M*(5*ce),oe+=S*(5*ge),oe+=C*(5*ye),oe+=L*(5*fe),oe+=H*(5*d),$+=oe>>>13,oe&=8191,re=$,re+=R*d,re+=U*ae,re+=B*le,re+=w*ie,re+=v*(5*ue),$=re>>>13,re&=8191,re+=M*(5*pe),re+=S*(5*ce),re+=C*(5*ge),re+=L*(5*ye),re+=H*(5*fe),$+=re>>>13,re&=8191,Q=$,Q+=R*fe,Q+=U*d,Q+=B*ae,Q+=w*le,Q+=v*ie,$=Q>>>13,Q&=8191,Q+=M*(5*ue),Q+=S*(5*pe),Q+=C*(5*ce),Q+=L*(5*ge),Q+=H*(5*ye),$+=Q>>>13,Q&=8191,ee=$,ee+=R*ye,ee+=U*fe,ee+=B*d,ee+=w*ae,ee+=v*le,$=ee>>>13,ee&=8191,ee+=M*ie,ee+=S*(5*ue),ee+=C*(5*pe),ee+=L*(5*ce),ee+=H*(5*ge),$+=ee>>>13,ee&=8191,J=$,J+=R*ge,J+=U*ye,J+=B*fe,J+=w*d,J+=v*ae,$=J>>>13,J&=8191,J+=M*le,J+=S*ie,J+=C*(5*ue),J+=L*(5*pe),J+=H*(5*ce),$+=J>>>13,J&=8191,O=$,O+=R*ce,O+=U*ge,O+=B*ye,O+=w*fe,O+=v*d,$=O>>>13,O&=8191,O+=M*ae,O+=S*le,O+=C*ie,O+=L*(5*ue),O+=H*(5*pe),$+=O>>>13,O&=8191,D=$,D+=R*pe,D+=U*ce,D+=B*ge,D+=w*ye,D+=v*fe,$=D>>>13,D&=8191,D+=M*d,D+=S*ae,D+=C*le,D+=L*ie,D+=H*(5*ue),$+=D>>>13,D&=8191,I=$,I+=R*ue,I+=U*pe,I+=B*ce,I+=w*ge,I+=v*ye,$=I>>>13,I&=8191,I+=M*fe,I+=S*d,I+=C*ae,I+=L*le,I+=H*ie,$+=I>>>13,I&=8191,$=($<<2)+$|0,$=$+V|0,V=$&8191,$=$>>>13,Z+=$,R=V,U=Z,B=oe,w=re,v=Q,M=ee,S=J,C=O,L=D,H=I,a+=16,i-=16;this.h[0]=R,this.h[1]=U,this.h[2]=B,this.h[3]=w,this.h[4]=v,this.h[5]=M,this.h[6]=S,this.h[7]=C,this.h[8]=L,this.h[9]=H},at.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,m=1;m<8;m++)g=(this.h[m]+this.pad[m]|0)+(g>>>16)|0,this.h[m]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},at.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function At(r,a,i,e,s,g){var m=new at(g);return m.update(i,e,s),m.finish(r,a),0}function st(r,a,i,e,s,g){var m=new Uint8Array(16);return At(m,0,i,e,s,g),N(r,a,m,0)}function Pe(r,a,i,e,s){var g;if(i<32)return-1;for(it(r,0,a,0,i,e,s),At(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function xt(r,a,i,e,s){var g,m=new Uint8Array(32);if(i<32||(Ie(m,0,32,e,s),st(a,16,a,32,i-32,m)!==0))return-1;for(it(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function Ue(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function yt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function qe(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function Qe(r,a){var i,e,s,g=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(yt(m),yt(m),yt(m),e=0;e<2;e++){for(g[0]=m[0]-65517,i=1;i<15;i++)g[i]=m[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=m[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,qe(m,g,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function Bt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Qe(i,r),Qe(e,a),q(i,0,e,0)}function gt(r){var a=new Uint8Array(32);return Qe(a,r),a[0]&1}function Ke(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Oe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function je(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function de(r,a,i){var e,s,g=0,m=0,k=0,A=0,G=0,z=0,xe=0,$=0,V=0,Z=0,oe=0,re=0,Q=0,ee=0,J=0,O=0,D=0,I=0,R=0,U=0,B=0,w=0,v=0,M=0,S=0,C=0,L=0,H=0,ie=0,le=0,ae=0,d=i[0],fe=i[1],ye=i[2],ge=i[3],ce=i[4],pe=i[5],ue=i[6],Ce=i[7],he=i[8],we=i[9],ve=i[10],_e=i[11],Le=i[12],Be=i[13],ze=i[14],Ne=i[15];e=a[0],g+=e*d,m+=e*fe,k+=e*ye,A+=e*ge,G+=e*ce,z+=e*pe,xe+=e*ue,$+=e*Ce,V+=e*he,Z+=e*we,oe+=e*ve,re+=e*_e,Q+=e*Le,ee+=e*Be,J+=e*ze,O+=e*Ne,e=a[1],m+=e*d,k+=e*fe,A+=e*ye,G+=e*ge,z+=e*ce,xe+=e*pe,$+=e*ue,V+=e*Ce,Z+=e*he,oe+=e*we,re+=e*ve,Q+=e*_e,ee+=e*Le,J+=e*Be,O+=e*ze,D+=e*Ne,e=a[2],k+=e*d,A+=e*fe,G+=e*ye,z+=e*ge,xe+=e*ce,$+=e*pe,V+=e*ue,Z+=e*Ce,oe+=e*he,re+=e*we,Q+=e*ve,ee+=e*_e,J+=e*Le,O+=e*Be,D+=e*ze,I+=e*Ne,e=a[3],A+=e*d,G+=e*fe,z+=e*ye,xe+=e*ge,$+=e*ce,V+=e*pe,Z+=e*ue,oe+=e*Ce,re+=e*he,Q+=e*we,ee+=e*ve,J+=e*_e,O+=e*Le,D+=e*Be,I+=e*ze,R+=e*Ne,e=a[4],G+=e*d,z+=e*fe,xe+=e*ye,$+=e*ge,V+=e*ce,Z+=e*pe,oe+=e*ue,re+=e*Ce,Q+=e*he,ee+=e*we,J+=e*ve,O+=e*_e,D+=e*Le,I+=e*Be,R+=e*ze,U+=e*Ne,e=a[5],z+=e*d,xe+=e*fe,$+=e*ye,V+=e*ge,Z+=e*ce,oe+=e*pe,re+=e*ue,Q+=e*Ce,ee+=e*he,J+=e*we,O+=e*ve,D+=e*_e,I+=e*Le,R+=e*Be,U+=e*ze,B+=e*Ne,e=a[6],xe+=e*d,$+=e*fe,V+=e*ye,Z+=e*ge,oe+=e*ce,re+=e*pe,Q+=e*ue,ee+=e*Ce,J+=e*he,O+=e*we,D+=e*ve,I+=e*_e,R+=e*Le,U+=e*Be,B+=e*ze,w+=e*Ne,e=a[7],$+=e*d,V+=e*fe,Z+=e*ye,oe+=e*ge,re+=e*ce,Q+=e*pe,ee+=e*ue,J+=e*Ce,O+=e*he,D+=e*we,I+=e*ve,R+=e*_e,U+=e*Le,B+=e*Be,w+=e*ze,v+=e*Ne,e=a[8],V+=e*d,Z+=e*fe,oe+=e*ye,re+=e*ge,Q+=e*ce,ee+=e*pe,J+=e*ue,O+=e*Ce,D+=e*he,I+=e*we,R+=e*ve,U+=e*_e,B+=e*Le,w+=e*Be,v+=e*ze,M+=e*Ne,e=a[9],Z+=e*d,oe+=e*fe,re+=e*ye,Q+=e*ge,ee+=e*ce,J+=e*pe,O+=e*ue,D+=e*Ce,I+=e*he,R+=e*we,U+=e*ve,B+=e*_e,w+=e*Le,v+=e*Be,M+=e*ze,S+=e*Ne,e=a[10],oe+=e*d,re+=e*fe,Q+=e*ye,ee+=e*ge,J+=e*ce,O+=e*pe,D+=e*ue,I+=e*Ce,R+=e*he,U+=e*we,B+=e*ve,w+=e*_e,v+=e*Le,M+=e*Be,S+=e*ze,C+=e*Ne,e=a[11],re+=e*d,Q+=e*fe,ee+=e*ye,J+=e*ge,O+=e*ce,D+=e*pe,I+=e*ue,R+=e*Ce,U+=e*he,B+=e*we,w+=e*ve,v+=e*_e,M+=e*Le,S+=e*Be,C+=e*ze,L+=e*Ne,e=a[12],Q+=e*d,ee+=e*fe,J+=e*ye,O+=e*ge,D+=e*ce,I+=e*pe,R+=e*ue,U+=e*Ce,B+=e*he,w+=e*we,v+=e*ve,M+=e*_e,S+=e*Le,C+=e*Be,L+=e*ze,H+=e*Ne,e=a[13],ee+=e*d,J+=e*fe,O+=e*ye,D+=e*ge,I+=e*ce,R+=e*pe,U+=e*ue,B+=e*Ce,w+=e*he,v+=e*we,M+=e*ve,S+=e*_e,C+=e*Le,L+=e*Be,H+=e*ze,ie+=e*Ne,e=a[14],J+=e*d,O+=e*fe,D+=e*ye,I+=e*ge,R+=e*ce,U+=e*pe,B+=e*ue,w+=e*Ce,v+=e*he,M+=e*we,S+=e*ve,C+=e*_e,L+=e*Le,H+=e*Be,ie+=e*ze,le+=e*Ne,e=a[15],O+=e*d,D+=e*fe,I+=e*ye,R+=e*ge,U+=e*ce,B+=e*pe,w+=e*ue,v+=e*Ce,M+=e*he,S+=e*we,C+=e*ve,L+=e*_e,H+=e*Le,ie+=e*Be,le+=e*ze,ae+=e*Ne,g+=38*D,m+=38*I,k+=38*R,A+=38*U,G+=38*B,z+=38*w,xe+=38*v,$+=38*M,V+=38*S,Z+=38*C,oe+=38*L,re+=38*H,Q+=38*ie,ee+=38*le,J+=38*ae,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=A+s+65535,s=Math.floor(e/65536),A=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=xe+s+65535,s=Math.floor(e/65536),xe=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=A+s+65535,s=Math.floor(e/65536),A=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=xe+s+65535,s=Math.floor(e/65536),xe=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=m,r[2]=k,r[3]=A,r[4]=G,r[5]=z,r[6]=xe,r[7]=$,r[8]=V,r[9]=Z,r[10]=oe,r[11]=re,r[12]=Q,r[13]=ee,r[14]=J,r[15]=O}function F(r,a){de(r,a,a)}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)F(i,i),e!==2&&e!==4&&de(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function K(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)F(i,i),e!==1&&de(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function j(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,m,k=o(),A=o(),G=o(),z=o(),xe=o(),$=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,Ke(s,i),m=0;m<16;m++)A[m]=s[m],z[m]=k[m]=G[m]=0;for(k[0]=z[0]=1,m=254;m>=0;--m)g=e[m>>>3]>>>(m&7)&1,qe(k,A,g),qe(G,z,g),Oe(xe,k,G),je(k,k,G),Oe(G,A,z),je(A,A,z),F(z,xe),F($,k),de(k,G,k),de(G,A,xe),Oe(xe,k,G),je(k,k,G),F(A,k),je(G,z,$),de(k,G,b),Oe(k,k,z),de(G,G,k),de(k,z,$),de(z,A,s),F(A,xe),qe(k,A,g),qe(G,z,g);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=G[m],s[m+48]=A[m],s[m+64]=z[m];var V=s.subarray(32),Z=s.subarray(16);return Y(V,V),de(Z,Z,V),Qe(r,Z),0}function te(r,a){return j(r,a,f)}function me(r,a){return l(a,32),te(r,a)}function Ee(r,a,i){var e=new Uint8Array(32);return j(e,i,a),se(r,c,e,Se)}var Me=Pe,bt=xt;function mn(r,a,i,e,s,g){var m=new Uint8Array(32);return Ee(m,s,g),Me(r,a,i,e,m)}function Ye(r,a,i,e,s,g){var m=new Uint8Array(32);return Ee(m,s,g),bt(r,a,i,e,m)}var Je=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function rr(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),m,k,A,G,z,xe,$,V,Z,oe,re,Q,ee,J,O,D,I,R,U,B,w,v,M,S,C,L,H=r[0],ie=r[1],le=r[2],ae=r[3],d=r[4],fe=r[5],ye=r[6],ge=r[7],ce=a[0],pe=a[1],ue=a[2],Ce=a[3],he=a[4],we=a[5],ve=a[6],_e=a[7],Le=0;e>=128;){for(U=0;U<16;U++)B=8*U+Le,s[U]=i[B+0]<<24|i[B+1]<<16|i[B+2]<<8|i[B+3],g[U]=i[B+4]<<24|i[B+5]<<16|i[B+6]<<8|i[B+7];for(U=0;U<80;U++)if(m=H,k=ie,A=le,G=ae,z=d,xe=fe,$=ye,V=ge,Z=ce,oe=pe,re=ue,Q=Ce,ee=he,J=we,O=ve,D=_e,w=ge,v=_e,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=(d>>>14|he<<18)^(d>>>18|he<<14)^(he>>>9|d<<23),v=(he>>>14|d<<18)^(he>>>18|d<<14)^(d>>>9|he<<23),M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=d&fe^~d&ye,v=he&we^~he&ve,M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=Je[U*2],v=Je[U*2+1],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=s[U%16],v=g[U%16],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,I=C&65535|L<<16,R=M&65535|S<<16,w=I,v=R,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=(H>>>28|ce<<4)^(ce>>>2|H<<30)^(ce>>>7|H<<25),v=(ce>>>28|H<<4)^(H>>>2|ce<<30)^(H>>>7|ce<<25),M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=H&ie^H&le^ie&le,v=ce&pe^ce&ue^pe&ue,M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,V=C&65535|L<<16,D=M&65535|S<<16,w=G,v=Q,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=I,v=R,M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,G=C&65535|L<<16,Q=M&65535|S<<16,ie=m,le=k,ae=A,d=G,fe=z,ye=xe,ge=$,H=V,pe=Z,ue=oe,Ce=re,he=Q,we=ee,ve=J,_e=O,ce=D,U%16===15)for(B=0;B<16;B++)w=s[B],v=g[B],M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=s[(B+9)%16],v=g[(B+9)%16],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,I=s[(B+1)%16],R=g[(B+1)%16],w=(I>>>1|R<<31)^(I>>>8|R<<24)^I>>>7,v=(R>>>1|I<<31)^(R>>>8|I<<24)^(R>>>7|I<<25),M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,I=s[(B+14)%16],R=g[(B+14)%16],w=(I>>>19|R<<13)^(R>>>29|I<<3)^I>>>6,v=(R>>>19|I<<13)^(I>>>29|R<<3)^(R>>>6|I<<26),M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,s[B]=C&65535|L<<16,g[B]=M&65535|S<<16;w=H,v=ce,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[0],v=a[0],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[0]=H=C&65535|L<<16,a[0]=ce=M&65535|S<<16,w=ie,v=pe,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[1],v=a[1],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[1]=ie=C&65535|L<<16,a[1]=pe=M&65535|S<<16,w=le,v=ue,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[2],v=a[2],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[2]=le=C&65535|L<<16,a[2]=ue=M&65535|S<<16,w=ae,v=Ce,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[3],v=a[3],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[3]=ae=C&65535|L<<16,a[3]=Ce=M&65535|S<<16,w=d,v=he,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[4],v=a[4],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[4]=d=C&65535|L<<16,a[4]=he=M&65535|S<<16,w=fe,v=we,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[5],v=a[5],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[5]=fe=C&65535|L<<16,a[5]=we=M&65535|S<<16,w=ye,v=ve,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[6],v=a[6],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[6]=ye=C&65535|L<<16,a[6]=ve=M&65535|S<<16,w=ge,v=_e,M=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[7],v=a[7],M+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=M>>>16,C+=S>>>16,L+=C>>>16,r[7]=ge=C&65535|L<<16,a[7]=_e=M&65535|S<<16,Le+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,rr(e,s,a,i),i%=128,m=0;m<i;m++)g[m]=a[k-i+m];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,P(g,i-8,k/536870912|0,k<<3),rr(e,s,g,i),m=0;m<8;m++)P(r,8*m,e[m],s[m]);return 0}function Xt(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),A=o(),G=o(),z=o();je(i,r[1],r[0]),je(z,a[1],a[0]),de(i,i,z),Oe(e,r[0],r[1]),Oe(z,a[0],a[1]),de(e,e,z),de(s,r[3],a[3]),de(s,s,h),de(g,r[2],a[2]),Oe(g,g,g),je(m,e,i),je(k,g,s),Oe(A,g,s),Oe(G,e,i),de(r[0],m,k),de(r[1],G,A),de(r[2],A,k),de(r[3],m,G)}function or(r,a,i){var e;for(e=0;e<4;e++)qe(r[e],a[e],i)}function wn(r,a){var i=o(),e=o(),s=o();Y(s,a[2]),de(i,a[0],s),de(e,a[1],s),Qe(r,e),r[31]^=gt(i)<<7}function vn(r,a,i){var e,s;for(Ue(r[0],u),Ue(r[1],p),Ue(r[2],p),Ue(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,or(r,a,e),Xt(a,r),Xt(r,r),or(r,a,e)}function Vt(r,a){var i=[o(),o(),o(),o()];Ue(i[0],y),Ue(i[1],_),Ue(i[2],p),de(i[3],y,_),vn(r,i,a)}function _n(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Vt(s,e),wn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Zt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Sn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Zt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Zt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Zt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function kn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;Sn(r,a)}function ir(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),m=new Uint8Array(64),k,A,G=new Float64Array(64),z=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var xe=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(lt(m,r.subarray(32),i+32),kn(m),Vt(z,m),wn(r,z),k=32;k<64;k++)r[k]=e[k];for(lt(g,r,i+64),kn(g),k=0;k<64;k++)G[k]=0;for(k=0;k<32;k++)G[k]=m[k];for(k=0;k<32;k++)for(A=0;A<32;A++)G[k+A]+=g[k]*s[A];return Sn(r.subarray(32),G),xe}function co(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),A=o();return Ue(r[2],p),Ke(r[1],a),F(s,r[1]),de(g,s,x),je(s,s,r[2]),Oe(g,r[2],g),F(m,g),F(k,m),de(A,k,m),de(i,A,s),de(i,i,g),K(i,i),de(i,i,s),de(i,i,g),de(i,i,g),de(r[0],i,g),F(e,r[0]),de(e,e,g),Bt(e,s)&&de(r[0],r[0],T),F(e,r[0]),de(e,e,g),Bt(e,s)?-1:(gt(r[0])===a[31]>>7&&je(r[0],u,r[0]),de(r[3],r[0],r[1]),0)}function Cn(r,a,i,e){var s,g=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],A=[o(),o(),o(),o()];if(i<64||co(A,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(m,r,i),kn(m),vn(k,A,m),Vt(A,a.subarray(32)),Xt(k,A),wn(g,k),i-=64,q(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var En=32,Qt=24,zt=32,ht=16,Nt=32,Jt=32,It=32,Tt=32,Mn=32,ar=Qt,fo=zt,po=ht,He=64,ct=32,mt=64,Ln=32,An=64;n.lowlevel={crypto_core_hsalsa20:se,crypto_stream_xor:it,crypto_stream:Ie,crypto_stream_salsa20_xor:ke,crypto_stream_salsa20:$e,crypto_onetimeauth:At,crypto_onetimeauth_verify:st,crypto_verify_16:N,crypto_verify_32:q,crypto_secretbox:Pe,crypto_secretbox_open:xt,crypto_scalarmult:j,crypto_scalarmult_base:te,crypto_box_beforenm:Ee,crypto_box_afternm:Me,crypto_box:mn,crypto_box_open:Ye,crypto_box_keypair:me,crypto_hash:lt,crypto_sign:ir,crypto_sign_keypair:_n,crypto_sign_open:Cn,crypto_secretbox_KEYBYTES:En,crypto_secretbox_NONCEBYTES:Qt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:ht,crypto_scalarmult_BYTES:Nt,crypto_scalarmult_SCALARBYTES:Jt,crypto_box_PUBLICKEYBYTES:It,crypto_box_SECRETKEYBYTES:Tt,crypto_box_BEFORENMBYTES:Mn,crypto_box_NONCEBYTES:ar,crypto_box_ZEROBYTES:fo,crypto_box_BOXZEROBYTES:po,crypto_sign_BYTES:He,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:mt,crypto_sign_SEEDBYTES:Ln,crypto_hash_BYTES:An,gf:o,D:x,L:Zt,pack25519:Qe,unpack25519:Ke,M:de,A:Oe,S:F,Z:je,pow2523:K,add:Xt,set25519:Ue,modL:Sn,scalarmult:vn,scalarbase:Vt};function sr(r,a){if(r.length!==En)throw new Error("bad key size");if(a.length!==Qt)throw new Error("bad nonce size")}function uo(r,a){if(r.length!==It)throw new Error("bad public key size");if(a.length!==Tt)throw new Error("bad secret key size")}function Fe(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function lr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Fe(r,a,i),sr(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+zt]=r[g];return Pe(s,e,e.length,a,i),s.subarray(ht)},n.secretbox.open=function(r,a,i){Fe(r,a,i),sr(i,a);for(var e=new Uint8Array(ht+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+ht]=r[g];return e.length<32||xt(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=En,n.secretbox.nonceLength=Qt,n.secretbox.overheadLength=ht,n.scalarMult=function(r,a){if(Fe(r,a),r.length!==Jt)throw new Error("bad n size");if(a.length!==Nt)throw new Error("bad p size");var i=new Uint8Array(Nt);return j(i,r,a),i},n.scalarMult.base=function(r){if(Fe(r),r.length!==Jt)throw new Error("bad n size");var a=new Uint8Array(Nt);return te(a,r),a},n.scalarMult.scalarLength=Jt,n.scalarMult.groupElementLength=Nt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Fe(r,a),uo(r,a);var i=new Uint8Array(Mn);return Ee(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(It),a=new Uint8Array(Tt);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Fe(r),r.length!==Tt)throw new Error("bad secret key size");var a=new Uint8Array(It);return te(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=It,n.box.secretKeyLength=Tt,n.box.sharedKeyLength=Mn,n.box.nonceLength=ar,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Fe(r,a),a.length!==mt)throw new Error("bad secret key size");var i=new Uint8Array(He+r.length);return ir(i,r,r.length,a),i},n.sign.open=function(r,a){if(Fe(r,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=Cn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(He),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Fe(r,a,i),a.length!==He)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(He+r.length),s=new Uint8Array(He+r.length),g;for(g=0;g<He;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+He]=r[g];return Cn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ct),a=new Uint8Array(mt);return _n(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Fe(r),r.length!==mt)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Fe(r),r.length!==Ln)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(mt),e=0;e<32;e++)i[e]=r[e];return _n(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=mt,n.sign.seedLength=Ln,n.sign.signatureLength=He,n.hash=function(r){Fe(r);var a=new Uint8Array(An);return lt(a,r,r.length),a},n.hash.hashLength=An,n.verify=function(r,a){return Fe(r,a),r.length===0||a.length===0||r.length!==a.length?!1:E(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];lr(g)})}else typeof ea<"u"&&(r=ra,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];lr(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Pn)),Pn.exports}var ia=oa();const Xr=Qi(ia);function aa(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const h=t.charAt(x),y=h.charCodeAt(0);if(n[y]!==255)throw new TypeError(h+" is ambiguous");n[y]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),f=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let h=0,y=0,_=0;const T=x.length;for(;_!==T&&x[_]===0;)_++,h++;const P=(T-_)*f+1>>>0,E=new Uint8Array(P);for(;_!==T;){let W=x[_],be=0;for(let ne=P-1;(W!==0||be<y)&&ne!==-1;ne--,be++)W+=256*E[ne]>>>0,E[ne]=W%o>>>0,W=W/o>>>0;if(W!==0)throw new Error("Non-zero carry");y=be,_++}let N=P-y;for(;N!==P&&E[N]===0;)N++;let q=l.repeat(h);for(;N<P;++N)q+=t.charAt(E[N]);return q}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let h=0,y=0,_=0;for(;x[h]===l;)y++,h++;const T=(x.length-h)*c+1>>>0,P=new Uint8Array(T);for(;h<x.length;){const W=x.charCodeAt(h);if(W>255)return;let be=n[W];if(be===255)return;let ne=0;for(let se=T-1;(be!==0||ne<_)&&se!==-1;se--,ne++)be+=o*P[se]>>>0,P[se]=be%256>>>0,be=be/256>>>0;if(be!==0)throw new Error("Non-zero carry");_=ne,h++}let E=T-_;for(;E!==T&&P[E]===0;)E++;const N=new Uint8Array(y+(T-E));let q=y;for(;E!==T;)N[q++]=P[E++];return N}function b(x){const h=p(x);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:b}}var sa="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const fn=aa(sa),tr="cbsgo_wallet_v3",bn="cbsgo_wallet_unlocked_v3";function Ht(){try{const t=localStorage.getItem(tr);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function la(t){localStorage.setItem(tr,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function ca(){const t=Xr.sign.keyPair(),n=fn.encode(t.publicKey),o=fn.encode(t.secretKey);return{pk:n,sk:o}}function Vr(){return!!Ht()}function fa(){return Ht()?sessionStorage.getItem(bn)==="1":!1}function da(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");Ht()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=ca();return la({pk:l,sk:c,pin:n}),sessionStorage.setItem(bn,"1"),l}function pa(t){const n=Ht();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(bn,"1"),n.pk}function De(){const t=Ht();return t?t.pk:""}function ua(){localStorage.removeItem(tr),sessionStorage.removeItem(bn)}typeof window<"u"&&(window.cbsgoDevResetWallet=ua);const Zr="cbsgoLoginModal";function Qr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Jr(){const t=document.getElementById(Zr);t&&t.remove()}function xa(t){Jr();const n=document.createElement("div");return n.id=Zr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function ya(t,n){return`
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
      ">${Qr(t)}</div>

      <div style="padding:14px 16px;">
        ${n}
      </div>
    </div>
  `}function en(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function hr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ga(){const t=!Vr();let n="";try{const h=ot();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Qr(n)}" style="${en()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${en()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${en()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${hr(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${en()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${hr(!0)}">Unlock</button>
      </div>
    `,l=xa(ya(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),f=h=>{c&&(c.textContent=h||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),b=l.querySelector("#cbsgoNick"),x=()=>{Jr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const y=String(b?.value||"").trim(),_=String(u?.value||"").trim(),T=String(p?.value||"").trim();if(y.length<2)return f("⛔ Nickname too short.");if(_.length<4)return f("⛔ PIN must be at least 4 digits.");if(_!==T)return f("⛔ PINs do not match.");f("Creating wallet…"),Wr(y),await da(_),f("✅ Wallet created. Starting…"),x()}catch(y){f(`⛔ ${String(y?.message||y)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return f("⛔ PIN must be at least 4 digits.");f("Unlocking…"),await pa(y),f("✅ Unlocked."),x()}catch{f("⛔ Wrong PIN (or wallet data missing).")}})}}const ba="https://cxfedvowjgkqrakkkjpi.supabase.co",ha="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Re=xo(ba,ha);function ma(){const t=De();if(!t)return null;const n=ot(),o=gn();return{wallet_pk:t,nickname:n,avatar:o}}async function an(t={}){try{const n=ma();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Re.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const wa=15e3,va=1e4,_a=300*1e3;let Pt=null,mr=0,wr=0;function Sa(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",Sa));async function ka(){const t=De();if(!t||!Pt)return;const n=Date.now();if(n-mr<5e3)return;mr=n;const l=(ot()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:f,error:u}=await Re.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(f&&f.length>0){const p=f[0].id,{error:b}=await Re.from("player_state").update(c).eq("id",p);b&&console.warn("CBS GO: player_state update failed",b)}else{const{error:p}=await Re.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(f){console.warn("CBS GO: pushMyState error",f)}}async function Ca(){const t=De();if(!t)return;const n=Date.now();if(n-wr<3e3)return;wr=n;const o=new Date(Date.now()-_a).toISOString();try{const{data:l,error:c}=await Re.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const f=Array.isArray(l)?l:[],u=Array.from(new Set(f.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:h}=await Re.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const b=f.map(x=>{const h=x.lat,y=x.lng,_=typeof h=="number"?h:parseFloat(h),T=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite(T))return null;const P=p.get(x.wallet_pk)||null,E=P&&P.nickname||x.nickname||"Anon",N=P&&P.avatar?String(P.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:E,avatar:N,lat:_,lng:T,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:b}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function Ea(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{ka()},wa),setInterval(()=>{Ca()},va))}Ea();function eo(){const t=De();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function dn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Ma(t){const n=eo(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Re.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw dn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function La(t){const n=eo(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await Re.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw dn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function to(){const t=De();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Re.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw dn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],f=[];for(const p of l){const b=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!b&&!x)continue;const h=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:h,nickname:null,avatar:""};b&&c.push(y),x&&f.push(y)}const u=Array.from(new Set([...c,...f].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:b}=await Re.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!b&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const h=y=>{y.forEach(_=>{const T=x.get(_.otherWallet);T&&(_.nickname=T.nickname||null,_.avatar=T.avatar||"")})};h(c),h(f)}else b&&dn("loadFriendsOverview:players",b)}return{incoming:c,accepted:f}}let Ut=null;async function no(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Ut=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Ut.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Aa(){try{Ut&&(await Ut.release(),Ut=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Ba(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await no():await Aa()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}const Dn="cbsgo_trades";async function za(t,n){const o=De();if(!o)throw new Error("No local CBS-GO wallet available.");const l=ot(),c=gn(),f=Number(n?.tickets||0),u=Number(n?.cbs||0),p=n?.cardId||null,b=p?Number(n?.cardQty||0):0;if(!f&&!u&&!p)throw new Error("Nothing to send.");const x=Ot(),h=jt();if(f>0&&f>x)throw new Error("Not enough tickets in your bag.");if(u>0&&u>h)throw new Error("Not enough CBS (play money) in your bag.");const{error:y}=await Re.from(Dn).insert({from_wallet:o,to_wallet:t,tickets:f,cbs:u,card_id:p,card_qty:b,sender_nickname:l||null,sender_avatar:c||null,claimed:!1});if(y)throw console.warn("CBS GO: sendGiftToWallet failed",y),new Error(y.message||"Could not send gift.");try{const _=Ot(),T=jt();console.log("CBS GO: deducting from bag",{tickets:f,cbs:u,beforeTickets:_,beforeCbs:T}),f>0&&Lt(-f),u>0&&xn(-u);const P=Ot(),E=jt();console.log("CBS GO: bag after deduct",{afterTickets:P,afterCbs:E}),typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}catch(_){console.warn("CBS GO: failed to update local bag after trade",_)}}let On=!1;async function Yn(){const t=De();if(t&&!On){On=!0;try{const{data:n,error:o}=await Re.from(Dn).select("*").eq("to_wallet",t).eq("claimed",!1).order("created_at",{ascending:!0}).limit(50);if(o){console.warn("CBS GO: pullIncomingGifts failed",o);return}if(!n||!n.length)return;for(const l of n){const c=l.id,{data:f,error:u}=await Re.from(Dn).update({claimed:!0}).eq("id",c).eq("claimed",!1).select("id");if(u){console.warn("CBS GO: failed to mark trade as claimed",u);continue}if(!f||!f.length)continue;const p=Number(l.tickets||0),b=Number(l.cbs||0),x=l.card_id||null,h=Number(l.card_qty||0);p&&Lt(p),b&&xn(b),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:{senderNickname:l.sender_nickname||"",senderAvatar:l.sender_avatar||"",toWallet:l.to_wallet,tickets:p,cbs:b,cardId:x,cardQty:h}}))}typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}finally{On=!1}}}function vr(t,n=0){const o=Number(t);return Number.isFinite(o)?o:n}async function _r(){try{const t=De();if(!t)return;const n=ot()||null,o=vr(Ot(),0),l=vr(jt(),0),c={wallet_pk:t,nickname:n,tickets:o,cbs_play:l},{error:f}=await Re.from("wallet_balances").upsert(c,{onConflict:"wallet_pk"});f?console.warn("CBS GO: wallet balance sync error",f):console.log("[CBS GO] wallet balance synced",t,`tickets=${o}`,`cbs=${l}`)}catch(t){console.warn("CBS GO: syncWalletBalanceFromLocal failed",t)}}const ro="cbsgo_solana_wallet_v1";function Na(t,n=null){try{const o=JSON.parse(t);return!o||typeof o!="object"||typeof o.publicKey!="string"||typeof o.secretKey!="string"?n:o}catch{return n}}function Ia(){const t=Xr.sign.keyPair(),n=fn.encode(t.publicKey),o=fn.encode(t.secretKey),l={publicKey:n,secretKey:o,createdAt:new Date().toISOString(),version:1};try{localStorage.setItem(ro,JSON.stringify(l))}catch(c){console.warn("CBS GO: failed to persist local Solana wallet",c)}return l}function Ta(){try{const t=localStorage.getItem(ro);return t?Na(t,null):null}catch{return null}}function $a(){let t=Ta();return t||(t=Ia(),t)}function Ae(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function nr(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const oo="cbsgo_cards_v1";function Pa(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Yt(){const t=localStorage.getItem(oo),n=Pa(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function io(t){const n={counts:{...t||{}}};try{localStorage.setItem(oo,JSON.stringify(n))}catch{}}function qn(){const t=Yt(),n=pt();n.cards={...t||{}},Xn(n)}const Oa=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function ja(){const t=Yt();let n=0,o=0;const l=[];for(const c of Oa){const f=Number(t[c.id]||0);Number.isFinite(f)&&f>0&&(n+=1,o+=f,l.push({id:c.id,count:f,label:c.label}))}return{cardTypes:n,cardTotal:o,sendable:l}}function hn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Kn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function Sr(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${Ae(t)}</div>
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
  `}function Ra(){const t=ot(),n=gn(),o=De();return`
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
        ${nr(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Ae(t)}" maxlength="24" style="
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
                    ${Ae(o)}
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
  `}function Fa(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=E=>{const N=document.querySelector("#profileMsg");N&&(N.textContent=E||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const f=()=>{if(!t)return;const E=Wr(t.value);c(`✅ Name saved: ${E}`);try{an()}catch(N){console.warn("CBS GO: failed to sync profile after name change",N)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(f,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),f()})),n&&n.addEventListener("change",()=>{const E=n.files&&n.files[0];if(!E)return;if(E.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const N=new FileReader;N.onload=()=>{ci(String(N.result||"")),c("✅ Photo saved"),Mt();try{an()}catch(q){console.warn("CBS GO: failed to sync profile after avatar change",q)}},N.onerror=()=>c("⛔ Failed to read image."),N.readAsDataURL(E)}),o&&(o.onclick=()=>{fi(),c("✅ Photo removed"),Mt();try{an()}catch(E){console.warn("CBS GO: failed to sync profile after avatar removal",E)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),b=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),h=document.querySelector("#friendsAcceptedList"),y=E=>{b&&(b.textContent=E||"")},_=E=>{if(!E)return"";const N=String(E);return N.length<=12?N:`${N.slice(0,5)}…${N.slice(-4)}`},T=(E,N="")=>{const q=E.nickname&&E.nickname.trim()?E.nickname.trim():_(E.otherWallet),W=_(E.otherWallet);return`
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
          ${nr(E.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Ae(q||"Friend")}
            </div>
            ${W?`<div style="font-size:11px;opacity:.7;">${Ae(W)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${N||""}
        </div>
      </div>
    `};async function P(){if(!(!x||!h))try{x.textContent="Loading…",h.textContent="Loading…";const E=await to();E.incoming.length?x.innerHTML=E.incoming.map(N=>{const q=`
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
            `;return T(N,q)}).join(""):x.textContent="No incoming requests.",E.accepted.length?h.innerHTML=E.accepted.map(N=>{const q=`
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
            `;return T(N,q)}).join(""):h.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(N=>{N.addEventListener("click",async()=>{const q=N.getAttribute("data-friend-id");if(q){y("Accepting friend…"),N.disabled=!0;try{await La(q),y("✅ Friend added."),await P()}catch(W){console.warn(W),y(`⛔ ${W.message||W}`),N.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(N=>{N.addEventListener("click",async()=>{const q=N.getAttribute("data-wallet")||"";if(q)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(q),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(W){console.warn("CBS GO: copy friend wallet failed",W),y("⛔ Could not copy wallet address.")}})})}catch(E){console.warn("CBS GO: refreshFriends failed",E),x.textContent="Could not load friends.",h.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const E=u.value.trim();if(!E){y("Enter a wallet address first.");return}y("Sending friend request…"),p.disabled=!0;try{await Ma(E),y("✅ Friend request sent."),u.value="",await P()}catch(N){console.warn(N),y(`⛔ ${N.message||N}`)}finally{p.disabled=!1}}),P().catch(()=>{})}function Ua(){const t=Ot(),n=jt(),o=De(),{cardTypes:l,cardTotal:c,sendable:f}=ja(),u=c>0?`You own ${c} cards (${l} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",b=f.length>0?`
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
            ${f.map(x=>`<option value="${Ae(x.id)}">${Ae(x.label||x.id)} (x${x.count})</option>`).join("")}
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
                ${Ae(o)}
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
          ${Ae(u)}
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

          <div style="margin-top:2px;">
            <label for="giftFriendSelect" style="font-size:11px;opacity:.8;">Or pick a friend</label>
            <select id="giftFriendSelect" style="
              margin-top:4px;
              width:100%;
              padding:7px 9px;
              border-radius:10px;
              border:1px solid rgba(148,163,184,.7);
              background:rgba(15,23,42,.95);
              color:#fff;
              font-size:12px;
            ">
              <option value="">-- No friend selected --</option>
            </select>
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
  `}function Ga(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Zi()}catch(E){console.warn("CBS GO: openCardsPanel failed",E)}});try{qn()}catch(E){console.warn("CBS GO: failed to sync inventory cards from bag",E)}const l=De(),c=document.querySelector("#giftWalletInput"),f=document.querySelector("#giftFriendSelect"),u=document.querySelector("#giftTicketsInput"),p=document.querySelector("#giftCbsInput"),b=document.querySelector("#giftCardSelect"),x=document.querySelector("#giftCardQtyInput"),h=document.querySelector("#giftSendBtn"),y=document.querySelector("#giftMsg"),_=E=>{y&&(y.textContent=E||"")};async function T(){if(f)try{const E=await to(),N=[];N.push('<option value="">-- No friend selected --</option>'),E.accepted&&E.accepted.length&&E.accepted.forEach(q=>{const W=q.otherWallet||"";if(!W)return;const be=q.nickname&&q.nickname.trim()?q.nickname.trim():W,ne=Ae(be),se=W.length>12?`${W.slice(0,5)}…${W.slice(-4)}`:W,Se=`${ne} (${Ae(se)})`;N.push(`<option value="${Ae(W)}">${Se}</option>`)}),f.innerHTML=N.join("")}catch(E){console.warn("CBS GO: populateFriendSelect failed",E),f.innerHTML='<option value="">-- Friends not available --</option>'}}if(T().catch(()=>{}),h&&(c||f)&&h.addEventListener("click",async()=>{let E=c&&c.value?c.value.trim():"";if((!E||!E.length)&&f){const ke=f.value.trim();ke&&(E=ke)}const N=u?.value??"",q=p?.value??"",W=b?b.value.trim():"",be=x?.value??"",ne=Number(be||"0"),se=Number(N||"0"),Se=Number(q||"0");if(!E){_("Enter a wallet address first, or pick a friend.");return}if((!se||se<=0)&&(!Se||Se<=0)&&!W){_("Set tickets and/or CBS above 0, or choose a card.");return}if(W&&(!ne||ne<=0)){_("Set card quantity above 0.");return}if(W&&ne>0){const ke=Yt(),$e=Number(ke[W]||0);if(!Number.isFinite($e)||$e<ne){_("Not enough of that card in your collection.");return}}h.disabled=!0,_("Sending gift…");try{if(await za(E,{tickets:se,cbs:Se,cardId:W||null,cardQty:W?ne:0}),W&&ne>0){const ke=Yt(),Ie=Number(ke[W]||0)-ne;Ie>0?ke[W]=Ie:delete ke[W],io(ke),qn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...ke}}}))}_("✅ Gift sent."),u&&(u.value=""),p&&(p.value=""),x&&(x.value=""),b&&(b.value=""),f&&(f.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:E,tickets:se,cbs:Se,cardId:W||null,cardQty:W?ne:0}}))}catch(ke){console.warn(ke),_(`⛔ ${ke.message||"Could not send gift."}`)}finally{h.disabled=!1}}),!t||!l){Yn().catch(()=>{});return}const P=E=>{n&&(n.textContent=E||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),P("✅ Wallet address copied to clipboard.")):P("📋 Copy not supported in this browser.")}catch{P("⛔ Failed to copy address.")}},Yn().catch(()=>{})}function ao(){const t=hn();return t==="profile"?Sr("Profile",`<div id="profileMount">${Ra()}</div>`):t==="bag"?Sr("Bag",`<div id="bagMount">${Ua()}</div>`):""}function Wa(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ui()}
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
          ${Rr()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Fr()}
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
        ${ao()}
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

      ${Ur()?`<button id="resetBtn" type="button" style="
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
  `}function Mt(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=ao();const n=hn();n==="profile"&&Fa(),n==="bag"&&Ga();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Kn("map"),Mt()})}function Da(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=hn();Kn(o===n?"map":n||"map"),Mt()})})}function kr(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:c,toWallet:f,tickets:u=0,cbs:p=0,cardId:b=null,cardQty:x=0}=t||{};if(!u&&!p&&!(b&&x))return;n.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.78)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=ot(),T=o==="sent"?"Gift sent":"You received a gift",P=[];u&&P.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&P.push(`🪙 ${p} CBS`),b&&x&&P.push(`🃏 ${x} card${x===1?"":"s"}`);const E=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${Ae(_)}</b> to <span style="opacity:.9;">${Ae(f||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${Ae(l||"Friend")}</b>
        </div>
      `,N=o==="sent"?`
        <div style="
          width:40px;height:40px;border-radius:999px;
          border:1px solid rgba(148,163,184,.5);
          background:rgba(15,23,42,.9);
          display:flex;align-items:center;justify-content:center;
          font-size:20px;
        ">
          📤
        </div>
      `:nr(c||"",40);y.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${N}
      <div>
        <div style="font-size:15px;font-weight:800;">${Ae(T)}</div>
        ${E}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${Ae(P.join(" · "))}
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
  `,h.appendChild(y),n.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const q=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},W=document.getElementById("cbsgoTradePopupCloseBtn");W&&(W.onclick=q),h.addEventListener("click",be=>{be.target===h&&q()})}function Cr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Wa();try{const u=$a();console.log("CBS GO local Solana wallet ->",u.publicKey)}catch(u){console.warn("CBS GO: failed to init local Solana wallet",u)}try{no(),Ba()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{an()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}try{_r()}catch(u){console.warn("CBS GO: failed to sync wallet balance (ignored)",u)}if(Da(),Yi(),si(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Fr())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Rr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{hn()==="bag"&&Mt()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_wallet_balance_sync_listener){window.__cbsgo_wallet_balance_sync_listener=!0;const u=()=>{try{_r()}catch(p){console.warn("CBS GO: wallet balance sync on inventory change failed",p)}};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let b=p.querySelector(".cbsgoToastBox");b||(b=document.createElement("div"),b.className="cbsgoToastBox",b.style.pointerEvents="auto",b.style.padding="8px 12px",b.style.borderRadius="999px",b.style.border="1px solid rgba(255,255,255,.25)",b.style.background="rgba(10,12,18,.88)",b.style.backdropFilter="blur(10px)",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.fontSize="11px",b.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",b.style.opacity="0",b.style.transform="translateY(10px)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(b)),b.textContent=u||"",b.style.opacity="1",b.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{b.style.opacity="0",b.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},b=Number(p.xp||0),x=Number(p.tickets||0),h=Number(p.cbs||0);if(!b&&!x&&!h)return;const y=[];b&&y.push(`+${b} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),h&&y.push(`+${h} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.steps||0),x=Number(u?.goal||0),h=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const T=x?`${b}/${x} steps`:`${b} steps`;_.innerHTML=`
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const P=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},E=document.getElementById("cbsgoDailyGoalCloseBtn");E&&(E.onclick=P),y.addEventListener("click",N=>{N.target===y&&P()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const b=Number(u?.xp||0),x=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!b&&!x&&!h)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const T=[];b&&T.push(`+${b} XP`),x&&T.push(`+${x} ticket${x===1?"":"s"}`),h&&T.push(`+${h} CBS`),_.innerHTML=`
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
        ${Ae(T.join(" · "))}
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
    `,h.appendChild(y),p.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},T=document.getElementById("cbsgoStreakCloseBtn");T&&(T.onclick=_),h.addEventListener("click",P=>{P.target===h&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{f(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{kr(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{},b=p.cardId||null,x=Number(p.cardQty||0);if(b&&x>0){const h=Yt(),_=Number(h[b]||0)+x;h[b]=_,io(h),qn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...h}}}))}kr({direction:"received",fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0})})),Mt(),Ur()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",li)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Rn({id:"__daily__",name:"Daily Glow"});return}if(zr(p))return;const b=vo.find(x=>x.id===p);b&&Rn(b)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&bo(async()=>{const{completeNode:b}=await Promise.resolve().then(()=>ko);return{completeNode:b}},void 0).then(({completeNode:b})=>{b(p),so()})})),Yn().catch(()=>{})}function so(){if(!document.querySelector("#app"))return;if(Vr()&&fa()){Cr();return}ga();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),Cr()};window.addEventListener("cbsgo:loginDone",n)}function lo(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function pn(t){const n=lo();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";pn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{pn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function Er(){try{if(!document.getElementById("app")){pn("❌ #app not found in index.html");return}so();const n=lo();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){pn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Er,{once:!0}):Er();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
