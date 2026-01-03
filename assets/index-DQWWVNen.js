import{createClient as ao}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const u of f.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(d){if(d.ep)return;d.ep=!0;const f=o(d);fetch(d.href,f)}})();const so="modulepreload",lo=function(t){return"/cbs-go/"+t},ir={},co=function(n,o,l){let d=Promise.resolve();if(o&&o.length>0){let b=function(x){return Promise.all(x.map(h=>Promise.resolve(h).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");d=b(o.map(x=>{if(x=lo(x),x in ir)return;ir[x]=!0;const h=x.endsWith(".css"),y=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":so,h||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),h)return new Promise(($,O)=>{_.addEventListener("load",$),_.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${x}`)))})}))}function f(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return d.then(u=>{for(const p of u||[])p.status==="rejected"&&f(p.reason);return n().catch(f)})},In="cbsgoLevelUpOverlay",ar="cbsgoLevelUpStyles",En="https://smitskecbs.github.io/cbs-go/";function fo(){if(document.getElementById(ar))return;const t=document.createElement("style");t.id=ar,t.textContent=`
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
  `,document.head.appendChild(t)}function Mn(){const t=document.getElementById(In);t&&t.remove()}function po(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const d=document.createElement("div");d.className="cbsgoConfettiPiece";const f=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;d.style.left=`${f}%`,d.style.top="-10px",d.style.background=n[Math.floor(Math.random()*n.length)],d.style.animationDelay=`${u}s`,d.style.animationDuration=`${p}s`,t.appendChild(d),setTimeout(()=>d.remove(),(u+p+.3)*1e3)}}function sr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function uo(t){fo(),Mn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=In,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${sr(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${sr(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const d=l.querySelector("#cbsgoLevelUpConfettiHost");d&&po(d);const f=()=>Mn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),b=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=f),p&&(p.onclick=f),b&&(b.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${En}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(En),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+En)}}),setTimeout(()=>{document.getElementById(In)&&Mn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{uo(t?.detail||{})}));const xo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],_r="cbsgo_state_v6";function yo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function go(){return{xp:0,completed:{},updatedAt:Date.now()}}function Rt(){const t=localStorage.getItem(_r);return yo(t,go())}function Sr(t){t.updatedAt=Date.now(),localStorage.setItem(_r,JSON.stringify(t))}function Wn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function fn(){return Number(Rt().xp||0)}function Ft(){const t=fn();let n=1,o=t;for(;;){const l=Wn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function kr(){const t=fn();let n=1,o=t;for(;;){const l=Wn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function Cr(){return Wn(Ft())}function Wt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Rt();const o=Ft(),l=Rt();l.xp=Number(l.xp||0)+n,Sr(l);const d=Ft();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:d}})),d>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:d,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:d,xp:l.xp}}))),l}function Er(t){const n=String(t||"");if(!n)return!1;const o=Rt();return!!(o.completed&&o.completed[n])}function Mr(t){const n=String(t||"");if(!n)return;const o=Rt();o.completed||(o.completed={}),o.completed[n]=Date.now(),Sr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const bo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Wt,completeNode:Mr,getLevel:Ft,getXp:fn,getXpIntoLevel:kr,getXpNeededThisLevel:Cr,isNodeCompleted:Er},Symbol.toStringTag,{value:"Module"})),Lr="cbsgoPuzzleModal";function ho(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ln(){const t=document.getElementById(Lr);t&&t.remove()}function Tn(t){Ln();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],d=["🍬","💎","⭐","🍀","🔮"],f=180,u=18,p=l.length,b=.01;let x=[],h=null,y=0,_=u,$=!1,O=!1,M=null;const N=t?.name||"CBS GO Puzzle",q=document.createElement("div");q.id=Lr,q.style.position="fixed",q.style.inset="0",q.style.zIndex="999999",q.style.display="flex",q.style.alignItems="center",q.style.justifyContent="center",q.style.padding="16px",q.style.background="rgba(0,0,0,.70)",q.style.backdropFilter="blur(12px)",q.style.fontFamily="system-ui, sans-serif",q.style.color="#fff",q.innerHTML=`
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
          ${ho(N)}
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
  `,document.body.appendChild(q);const W=document.getElementById("cbsgoBoard"),be=document.getElementById("cbsgoScore"),ne=document.getElementById("cbsgoMoves"),se=document.getElementById("cbsgoStatus"),Se=document.getElementById("cbsgoPuzzleClose"),ke=document.getElementById("cbsgoPuzzleOk"),$e=document.getElementById("cbsgoConfettiLayer");function Ie(F){se&&(se.textContent=F||"")}function ot(){if(!$e)return;$e.style.display="block",$e.innerHTML="";const F=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],Y=40;for(let H=0;H<Y;H++){const j=document.createElement("div"),te=6+Math.floor(Math.random()*6),me=Math.random()*100,Ee=Math.random()*.6,Me=1+Math.random()*.6,bt=Math.random()*360;j.style.position="absolute",j.style.top="-10%",j.style.left=`${me}%`,j.style.width=`${te}px`,j.style.height=`${te*2}px`,j.style.background=F[H%F.length],j.style.opacity="0.9",j.style.borderRadius="2px",j.style.transform=`rotate(${bt}deg)`,j.style.animation=`cbsgoConfettiFall ${Me}s ease-out ${Ee}s forwards`,$e.appendChild(j)}}function it(){return Math.floor(Math.random()*l.length)}function Lt(){x=[];for(let F=0;F<n;F++){const Y=[];for(let H=0;H<o;H++)Math.random()<b?Y.push(p):Y.push(it());x.push(Y)}}function at(F){return F===p}function Pe(){if(W){W.innerHTML="";for(let F=0;F<n;F++)for(let Y=0;Y<o;Y++){const H=x[F][Y],j=document.createElement("div");j.dataset.row=String(F),j.dataset.col=String(Y),j.style.borderRadius="12px",j.style.display="flex",j.style.alignItems="center",j.style.justifyContent="center",j.style.cursor=O?"default":"pointer",j.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",j.style.fontSize="20px",at(H)?(j.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",j.textContent="💥"):(j.style.background=l[H]||"#444",j.textContent=d[H]||"⬛"),h&&h.row===F&&h.col===Y&&(j.style.outline="2px solid #fff",j.style.outlineOffset="2px"),j.addEventListener("click",()=>{je(F,Y)}),j.addEventListener("touchstart",te=>{if(O)return;const me=te.touches[0];M={row:F,col:Y,x:me.clientX,y:me.clientY}}),j.addEventListener("touchend",te=>{if(!M||O)return;const me=te.changedTouches[0],Ee=me.clientX-M.x,Me=me.clientY-M.y;if(Math.sqrt(Ee*Ee+Me*Me)<18){je(F,Y),M=null;return}let De=M.row,Je=M.col;Math.abs(Ee)>Math.abs(Me)?Ee>0?Je+=1:Je-=1:Me>0?De+=1:De-=1,De>=0&&De<n&&Je>=0&&Je<o&&Oe(M.row,M.col,De,Je),M=null,te.preventDefault()}),W.appendChild(j)}}}function xt(F,Y){if(!F||!Y)return!1;const H=Math.abs(F.row-Y.row),j=Math.abs(F.col-Y.col);return H+j===1}function Ue(F,Y){const H=x[F.row][F.col];x[F.row][F.col]=x[Y.row][Y.col],x[Y.row][Y.col]=H}function yt(){const F=new Set;for(let Y=0;Y<n;Y++){let H=x[Y][0],j=0;for(let te=1;te<=o;te++){const me=te<o?x[Y][te]:null;if(me===H)continue;const Ee=te-j;if(H!=null&&Ee>=3)for(let Me=j;Me<te;Me++)F.add(`${Y},${Me}`);H=me,j=te}}for(let Y=0;Y<o;Y++){let H=x[0][Y],j=0;for(let te=1;te<=n;te++){const me=te<n?x[te][Y]:null;if(me===H)continue;const Ee=te-j;if(H!=null&&Ee>=3)for(let Me=j;Me<te;Me++)F.add(`${Me},${Y}`);H=me,j=te}}return F}function qe(F){if(!F||!F.size)return 0;const Y=F.size;y+=Y*4,be&&(be.textContent=String(y)),!O&&y>=f&&gt(!0);for(const H of F){const[j,te]=H.split(","),me=Number(j),Ee=Number(te);x[me][Ee]=null}for(let H=0;H<o;H++){let j=n-1;for(let te=n-1;te>=0;te--)x[te][H]!=null&&(x[j][H]=x[te][H],j--);for(let te=j;te>=0;te--)Math.random()<b?x[te][H]=p:x[te][H]=it()}return Y}function Qe(F,Y){const H=new Set;for(let j=0;j<o;j++)H.add(`${F},${j}`);for(let j=0;j<n;j++)H.add(`${j},${Y}`);qe(H),Pe(),O||setTimeout(()=>At(!1),120)}function At(F=!1){if(O)return;$=!0;const Y=()=>{if(O){$=!0;return}const H=yt();if(!H.size){$=!1,Pe(),F&&!O&&(_<=0?He():Ie("Nice! Keep matching."));return}qe(H),Pe(),setTimeout(Y,120)};Y()}function gt(F){if(!O)if(O=!0,$=!0,F){Ie("Great job! Puzzle completed 🎉");try{t?.id&&Mr(t.id),Wt(10)}catch{}ot(),setTimeout(()=>{Ln()},1600)}else Ie("Out of moves. Try again next time 🙂")}function He(){y>=f?gt(!0):_<=0&&gt(!1)}function Oe(F,Y,H,j){if($||O)return;if(_<=0){He();return}const te={row:F,col:Y},me={row:H,col:j};if(!xt(te,me))return;const Ee=x[F][Y],Me=x[H][j],bt=at(Ee)||at(Me);if(Ue(te,me),h=null,_--,ne&&(ne.textContent=String(_)),bt){Pe();const De=at(x[F][Y])?{row:F,col:Y}:{row:H,col:j};Qe(De.row,De.col),He();return}if(!yt().size){Ue(te,me),Pe(),Ie("No match… try another swap."),He();return}Ie(""),Pe(),At(!0)}function je(F,Y){if($||O)return;if(_<=0){He();return}const H={row:F,col:Y};if(!h){h=H,Pe();return}if(h.row===F&&h.col===Y){h=null,Pe();return}if(!xt(h,H)){h=H,Pe();return}Oe(h.row,h.col,H.row,H.col)}function de(){Ln()}Se&&(Se.onclick=de),ke&&(ke.onclick=()=>{de()}),Lt(),Pe(),Ie("Tap or swipe two neighboring tiles to swap them.")}const Ar="cbsgo_inventory_v2";function mo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function wo(){return{tickets:0,cbs:0,cards:{}}}function dt(){const t=localStorage.getItem(Ar),n=mo(t,wo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Dn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Ar,JSON.stringify(n))}function vo(){return Number(dt().tickets||0)}function _o(){return Number(dt().cbs||0)}function Dt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return dt();const o=dt();return o.tickets=Number(o.tickets||0)+n,Dn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function Yn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return dt();const o=dt();return o.cbs=Number(o.cbs||0)+n,Dn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const zr="cbsgo_steps_v6",So="cbsgo_steps_v5",ko="cbsgo_gps_autostart_v2",Br="cbsgo_daily_puzzle_v1",Co=.75,Ct=5e3,on=7,$n=100,Eo=1e3,Mo=.5,Lo=2e3,Ao=4.5,An=1500,zn=200,zo=.25,Bo=.05,No=.3;let Jt=null,en=!1,wt={msg:"init"};function Pn(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Nr="cbsgo_cards_v1",Io=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function To(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function $o(t){return Io.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Po(){try{const t=localStorage.getItem(Nr),n=Pn(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,d]of Object.entries(n))if(d&&typeof d=="object"&&"count"in d){const f=Number(d.count);Number.isFinite(f)&&f>0&&(o[l]=f)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Oo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[d,f]of Object.entries(n)){const u=Number(f||0);Number.isFinite(u)&&u>0&&(o[d]=u)}const l={counts:o};localStorage.setItem(Nr,JSON.stringify(l))}catch{}}function jo(t,n=1){const o=To(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const f={...Po().counts||{}},p=Number(f[o]||0)+l;f[o]=p,Oo({counts:f});const b=$o(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:f}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:b}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:b}}))}catch{}return{cardId:o,count:p,card:b}}function rt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Ro(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,d]=n,f=new Date(o,l-1,d);return Number.isNaN(f.getTime())?null:f}function Fo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Ir(t,n){const o=Ro(t);if(!o)return[];const l=[];for(let d=n-1;d>=0;d--){const f=new Date(o.getTime());f.setDate(f.getDate()-d),l.push(Fo(f))}return l}function an(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:rt(),daySteps:0,dayMeters:0,dailyGoalSteps:Ct,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Uo(t){const n=rt();return!t||typeof t!="object"?an():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Ct),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Ct),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function dn(t){t.updatedAt=Date.now(),localStorage.setItem(zr,JSON.stringify(t))}function Go(t,n){if(!n)return;const o=Ir(n,on);!o.length||!o.every(d=>!!t.streak[d])||t.lastStreakRewardDate!==n&&(Yn($n),Yt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:on,rewardCbs:$n,lastDayKey:n}})))}function lr(t){t=Uo(t||an());const n=rt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Go(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,dn(t)}return t}function pt(){let t=localStorage.getItem(zr);if(!t){const o=localStorage.getItem(So);if(o){const l=Pn(o,an()),d=lr(l);return dn(d),d}}const n=Pn(t,an());return lr(n)}function tn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Wo()}}))}function qn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Yt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Hn(t,n,o,l){const d=Number(t||0),f=Number(n||0),u=0;if(!(!d&&!f&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:d,tickets:f,cbs:u,reason:l||"distance"}}))}catch{}}function Wo(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Do(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Yo(){return Do()/1e3}function qo(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||Ct),l=!!t.dailyGoalReached,d=t.dayKey||rt(),f=t.streak||{},p=Ir(d,on).map(b=>{let x=!1;return b===d?x=l:x=!!f[b],{dateKey:b,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:d,streakLength:on,rewardPerStreak:$n}}function cr(){return!!en}function Ho(){try{return localStorage.getItem(Br)===rt()}catch{return!1}}function Ko(){try{localStorage.setItem(Br,rt())}catch{}}function Xo(t,n){return Ho()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:rt()}})),Ko(),!0)}function fr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Vo(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const d=l-o;if(!Number.isFinite(d)||d<An)return;const f=Math.floor(d/An);f<=0||(Dt(f),Yt(),Hn(0,f,0,"boost"),t.boostLastStep=o+f*An)}function Zo(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<zn){t.chestMeters=n;return}let o=0;for(;n>=zn&&o<5;)if(n-=zn,o+=1,Math.random()<zo){const l=Math.random()<Bo,d=l?10:3,f=l?2:1;Wt(d),qn(),Dt(f),Yt();const u=l&&Math.random()<No;Hn(d,f,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:d,tickets:f,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function Qo(t,n){const l=x=>x*Math.PI/180,d=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(d/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Jo(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const d=Math.floor(n/1e3),f=Number(t.xpKmAwarded||0);if(d>f){const x=d-f;x>0&&(Wt(x),qn(),t.xpKmAwarded=d,o+=x)}const p=Math.floor(n/2500),b=Number(t.ticketChunksAwarded||0);if(p>b){const x=p-b;x>0&&(Dt(x),Yt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Hn(o,l,0,"distance")}function ei(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),d=Math.floor((o.meters||0)/Co);if(d>l){const f=d-l;o.steps=d,o.daySteps=Number(o.daySteps||0)+f}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||Ct)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||rt(),steps:o.daySteps,goal:o.dailyGoalSteps||Ct}}))),Jo(o),Vo(o),Zo(o),dn(o),tn(),o}function ti(){Jt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Jt),Jt=null}async function dr(t={}){const n=!!t.silent;if(!navigator.geolocation)return wt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(ko,"1")}catch{}ti(),en=!0,wt={msg:"requesting",t:Date.now()};try{return Jt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,d=o.coords.longitude,f=o.coords.accuracy||999,u=Date.now(),p=pt(),b=p.lastPos;p.lastPos={lat:l,lng:d,t:u},dn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:d,acc:f,heading:x,speed:h,t:u}})),f>Eo){wt={lat:l,lng:d,acc:f,t:u,reason:"accuracy",boostMs:fr()},tn();return}Xo(l,d);let y=0,_=0,$=0,O=0,M="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(y=Qo({lat:b.lat,lng:b.lng},{lat:l,lng:d}),_=Math.max(1,(u-b.t)/1e3),$=y/_,y<Mo?M="jitter":y>Lo?M="teleport":$>Ao?M="too-fast":(ei(y),O=y,M="ok")),wt={lat:l,lng:d,acc:f,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite($)?Number($.toFixed(2)):0,added:Math.round(O),reason:M,boostMs:fr()},tn()},o=>{en=!1,wt={err:o?.message||"GPS blocked",t:Date.now()},tn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return en=!1,wt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ni(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>cr()||await dr({silent:!0}))();const n=async()=>{cr()||await dr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),d=Number(n.cbs||0);o>0&&(Wt(o),qn()),(l>0||d>0)&&(l>0&&Dt(l),d>0&&Yn(d),Yt());const f=n.cardId||n.card_id;if(f)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;jo(f,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Tr(){const t=fn(),n=Ft(),o=kr(),l=Cr(),d=Yo(),f=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function $r(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:d,rewardPerStreak:f}=qo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
        ${d}-day streak → +${f} CBS
      </div>
    </div>
  `}function Pr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ri(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Or="cbsgo_player_name_v2",Kn="cbsgo_player_avatar_v2";function ut(){try{return localStorage.getItem(Or)||"Sovereign"}catch{return"Sovereign"}}function jr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Or,n)}catch{}return n}function pn(){try{return localStorage.getItem(Kn)||""}catch{return""}}function oi(t){const n=String(t||"");try{localStorage.setItem(Kn,n)}catch{}return n}function ii(){try{localStorage.removeItem(Kn)}catch{}}let X=null,et=null,tt=null,Tt=null,Pt=null,We=null,Te=null,vt=0,ct=!1,Ze=!0,Ge=null;const Xe=new Map;let Ve=!0,Ot={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const ai="48a387bba00043ac4ba5823371abc9d2",Ut=80,si=6,li=80,ci=220,fi=6e4,di=5*6e4,pi=300,ui=.35,Bn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],xi=350,yi=.35,gi=120;let sn=0,_t=0,nn=null,On=!1,kt=[];function ft(t){return document.getElementById(t)}function St(t){const n=ft("cbsgoMapHost");if(!n)return;let o=ft("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function bi(){const t=String(ut()||"").trim();return t?t[0].toUpperCase():"🙂"}function jn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Et(t,n){const l=x=>x*Math.PI/180,d=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(d/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Rr(t,n,o){const l=n+Math.random()*(o-n),d=Math.random()*2*Math.PI,f=l*Math.cos(d)/111111,u=l*Math.sin(d)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+f,lng:t.lng+u}}function hi(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),d=o(n.lat),f=o(n.lng-t.lng),u=Math.sin(f)*Math.cos(d),p=Math.cos(l)*Math.sin(d)-Math.sin(l)*Math.cos(d)*Math.cos(f);let b=Math.atan2(u,p);return b=b*180/Math.PI,b=(b+360)%360,b}function mi(t,n,o){const d=n/6371e3,f=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,b=Math.sin(u),x=Math.cos(u),h=Math.sin(d),y=Math.cos(d),_=Math.asin(b*y+x*h*Math.cos(f)),$=p+Math.atan2(Math.sin(f)*h*x,y-b*Math.sin(_));return[_*180/Math.PI,$*180/Math.PI]}function wi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Fr(){const{temp:t,iconEmoji:n}=Ot;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Ur(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;wi();const{condition:n,isNight:o}=Ot;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const f=[];for(let u=0;u<48;u++){const p=Math.random()*100,b=Math.random()*16-8,x=Math.random()*2.5,h=2+Math.random()*1.5;f.push(`
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
      `)}l=f.join("")}else l="";t.innerHTML=l}async function vi(t,n){const o=Date.now();if(!(Ot.lastUpdated&&o-Ot.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${ai}&units=metric`,d=await fetch(l);if(!d.ok)throw new Error("HTTP "+d.status);const f=await d.json(),u=f?.main?.temp,p=f?.weather?.[0]?.icon||"01d",b=String(f?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),h="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(h="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(h="🌧️",y="rain"):p.startsWith("11")?(h="⛈️",y="storm"):p.startsWith("13")?(h="❄️",y="snow"):p.startsWith("50")&&(h="🌫️",y="mist"),b.includes("rain")&&(y="rain"),b.includes("snow")&&(y="snow"),b.includes("thunder")&&(y="storm");try{const $=Number(f?.dt||0),O=Number(f?.timezone||0);if($&&Number.isFinite(O)){const N=(($+O)/3600%24+24)%24;x=N<7||N>=19}}catch{}y==="clear"?h=x?"🌙":"☀️":y==="clouds"?h="☁️":y==="rain"?h="🌧️":y==="storm"?h="⛈️":y==="snow"?h="❄️":y==="mist"&&(h="🌫️"),Ot={temp:u,iconEmoji:h,condition:y,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Fr()),Ur()}catch(l){console.warn("Weather fetch failed",l)}}function _i(t){const n=pn();if(n){const d=`
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
    ">${jn(bi())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function pr(t,n){const o=`
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
    `;return t.divIcon({html:p,className:"",iconSize:[30,30],iconAnchor:[15,15]})}const d=String(n||"").trim()||"🙂",f=`
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${jn(d)}</div>
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Ei(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Mi(){if(!Bn.length)return null;const t=Math.floor(Math.random()*Bn.length);return Bn[t]}function Li(t){const n=t||"small";let o,l,d;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),d=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),d=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,d=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,d=Math.random()<.25?3+Math.floor(Math.random()*8):0);let f=null,u=0;if(Math.random()<ui){const p=Mi();p&&(f=p,u=1)}return{xp:o,tickets:l,cbs:d,cardId:f,cardCount:u}}function Ai(t){if(!X||!We||!t)return;const n=Date.now();if(n-sn<fi||We.getLayers().length>=si)return;const l=window.L;if(!l)return;const d=Ei(),f=Li(d),u=Rr(t,li,ci),p=ki(l),b=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),h={marker:b,createdAt:n,lat:u.lat,lng:u.lng,reward:f};kt.push(h),b.on("click",()=>{if(!Te){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:Te[0],lng:Te[1]},_={lat:u.lat,lng:u.lng},$=Et(y,_);if($>Ut){alert(`Too far to open this gift.

Distance: ${Math.round($)}m
Needed: ≤ ${Ut}m`);return}We.removeLayer(b),kt=kt.filter(Se=>Se.marker!==b);const{xp:O,tickets:M,cbs:N,cardId:q,cardCount:W}=f,be=[];O&&be.push(`+${O} XP`),M&&be.push(`+${M} ticket${M===1?"":"s"}`),N&&be.push(`+${N} CBS`),q&&W>0&&be.push(`+${W} card${W===1?"":"s"}`);const ne=be.length?be.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${ne}`);const se={kind:"mystery",xp:O||0,tickets:M||0,cbs:N||0,cardId:q||null,cardCount:W||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:se}))}catch{}}),b.addTo(We),sn=n}function zi(t){if(!X||!We||!t)return;const n=Date.now();let o=0;kt=kt.filter(l=>{if(!l||!l.marker||!We.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>di)return We.removeLayer(l.marker),o+=1,!1;const f=Et({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(f)&&f>pi?(We.removeLayer(l.marker),o+=1,!1):!0}),o>0&&We.getLayers().length===0&&(sn=0)}function Bi(t){if(!X||!Pt||!t||nn)return;const n=window.L;if(!n)return;if(On){if(_t<xi||Math.random()>yi)return;_t=0}else{if(_t<gi)return;_t=0,On=!0}const o=Rr(t,60,140),l=Ci(n),d=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});d.on("click",()=>{if(!Te){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:Te[0],lng:Te[1]},u={lat:o.lat,lng:o.lng},p=Et(f,u);if(p>Ut){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Ut}m`);return}Pt.removeLayer(d),nn=null,Tn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),d.addTo(Pt),nn=d}function Ni(t){const n=window.L;if(!n||!X||!t)return;const o=Ut;Tt?(Tt.setLatLng(t),Tt.setRadius(o)):Tt=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(X)}function Ii(t){const n=window.L;if(!n||!X)return;const o=_i(n);if(et?(et.setIcon(o),et.setLatLng(t)):(et=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(X),X.setView(t,19)),tt?(tt.setIcon(pr(n,vt)),tt.setLatLng(t)):tt=n.marker(t,{icon:pr(n,vt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(X),et&&et.bringToFront&&et.bringToFront(),tt&&tt.bringToFront&&tt.bringToFront(),Ni(t),Ze&&!ct&&X)try{const l=X.getZoom()||19;let d=t;Number.isFinite(vt)&&(d=mi(t,40,vt));const f=X.getCenter(),u=Et({lat:f.lat,lng:f.lng},{lat:d[0],lng:d[1]});(!Number.isFinite(u)||u>20)&&X.setView(d,l)}catch{}}function Gr(){const t=window.L;return!t||!X?null:(Ge?(Ve&&!X.hasLayer(Ge)&&Ge.addTo(X),!Ve&&X.hasLayer(Ge)&&X.removeLayer(Ge)):(Ge=t.layerGroup(),Ve&&Ge.addTo(X)),Ge)}function Ti(t){if(!Array.isArray(t)||!X)return[];const n=X.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(f=>{if(!f||f.isMe||typeof f.lat!="number"||typeof f.lng!="number")return;const u=Math.round(f.lat*o)/o,p=Math.round(f.lng*o)/o,b=`${u}_${p}`;l.has(b)||l.set(b,[]),l.get(b).push(f)});const d=[];for(const[f,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];d.push({id:p.wallet_pk||f,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,b=0;u.forEach(y=>{p+=y.lat,b+=y.lng});const x=p/u.length,h=b/u.length;d.push({id:`cluster_${f}`,lat:x,lng:h,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return d}function $i(t){const n=window.L;if(!n||!X)return;const o=Gr();if(!o)return;if(!Ve){for(const[f,u]of Xe.entries())o.removeLayer(u),Xe.delete(f);return}const l=Ti(t),d=new Set;l.forEach(f=>{if(!f||typeof f.lat!="number"||typeof f.lng!="number")return;const u=f.id||`${f.lat},${f.lng}`;d.add(u);const p=[f.lat,f.lng];let b=Xe.get(u);if(b)b.setLatLng(p);else{const x=f.isCluster&&f.count>1?String(f.count):f.nickname||"Anon",h=Si(n,x,f.avatar,f.isCluster);b=n.marker(p,{icon:h,pane:"cbsgo-others-pane"});const y=f.isCluster&&f.count>1?`${f.count} CBS-GO explorers nearby`:`${f.nickname||"CBS-GO explorer"}`;b.bindPopup(y),b.addTo(o),Xe.set(u,b)}});for(const[f,u]of Xe.entries())d.has(f)||(o.removeLayer(u),Xe.delete(f))}function Pi(){return`
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
        <span id="cbsgoWeatherLabel">${Fr()}</span>
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
  `}function Oi(){try{X&&X.remove()}catch{}X=null,et=null,tt=null,Tt=null,Pt=null,We=null,Te=null,ct=!1,Ze=!0,sn=0,_t=0,nn=null,On=!1,Ge=null,Xe.clear(),kt=[]}function ji(){const t=window.L,n=ft("cbsgoMap");if(!t||!n)return!1;Oi();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));X=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=X.createPane("cbsgo-player-pane");l.style.zIndex="650";const d=X.createPane("cbsgo-others-pane");d.style.zIndex="640";const f=X.createPane("cbsgo-loot-pane");f.style.zIndex="630";const u=X.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(X),X.setMaxBounds(o),X.setView([51.687,4.87],16),Pt=t.layerGroup().addTo(X),We=t.layerGroup().addTo(X),X.on("dragstart",()=>{Ze=!1}),X.on("zoomstart",()=>{Ze=!1}),!0}function Ri(){!navigator.geolocation||!X||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:d}=t.coords,f={lat:n,lng:o},u=Te?{lat:Te[0],lng:Te[1]}:null;if(Te=[n,o],Number.isFinite(d))vt=d;else if(u){const p=Et(u,f);Number.isFinite(p)&&p>2&&(vt=hi(u,f))}if(Ii([n,o]),u){const p=Et(u,f);if(Number.isFinite(p)&&p>1&&(_t+=p),Number.isFinite(p)&&p>20&&!Ze&&!ct&&X){Ze=!0;const b=X.getZoom()||19;X.setView([n,o],b)}}Bi(f),Ai(f),zi(f),vi(n,o),St(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{St(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Fi(){let t=0;const n=120,o=()=>{if(t++,!ft("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(St("Loading map engine…"),t<n)return setTimeout(o,100);St("Map engine failed (Leaflet not found). Refresh.");return}if(!ji()){St("Could not init map. Refresh.");return}const d=ft("cbsgoCenterBtn");d&&(d.onclick=()=>{X&&Te&&(Ze=!0,ct=!1,X.setView(Te,19))});const f=ft("cbsgoCompassBtn");f&&(f.onclick=()=>{X&&(ct=!ct,ct?(Ze=!1,X.setView([51.687,4.87],3)):Te&&(Ze=!0,X.setView(Te,16)))});const u=ft("cbsgoOnlineToggleBtn");if(u){const p=()=>{Ve?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Ve=!Ve;const b=Gr();if(b&&X&&(Ve?X.hasLayer(b)||b.addTo(X):X.hasLayer(b)&&X.removeLayer(b)),p(),!Ve&&Ge){for(const[x,h]of Xe.entries())Ge.removeLayer(h);Xe.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const b=p?.detail?.players||[];$i(b)})),Ur(),St("Loading GPS…"),Ri()};o()}const Ui="cbsgo_cards_v1";function Gi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Xn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Vn(){const t=localStorage.getItem(Ui),n=Gi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const d=Number(l.count||0);Number.isFinite(d)&&d>0&&(o[l.id]=d)}),o}function nt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Wr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Wi(){const t=Xn(),n=Vn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Di(){const t=Xn(),n=Vn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const d=Number(n[l.id]||0),f=Number.isFinite(d)&&d>0,u=Wr(l.rarity),p=f?u:"rgba(31,41,55,.9)",b=f?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=f?l.emoji||"🃏":"❓",h=f?nt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=nt(l.set||"Set"),_=f?`<div style="
             position:absolute;
             right:6px;
             top:6px;
             padding:2px 6px;
             border-radius:999px;
             border:1px solid ${u};
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
    `}function Yi(){const t=Wi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,d=o>0?Math.round(n/o*100):0;return`
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
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},d=document.getElementById("cbsgoCardsCloseBtn");d&&(d.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const f=Xn(),u=new Map(f.map(x=>[x.id,x]));function p(x){const h=u.get(x);if(!h)return;const y=Vn(),_=Number(y[x]||0),$=Number.isFinite(_)&&_>0,O=$?h.emoji||"🃏":"❓",M=$?h.name||"Card":"Unknown card",N=h.set||"Set",q=h.rarity||"common",W=Wr(q),be={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[q]||"Common",ne=document.createElement("div");ne.style.position="fixed",ne.style.inset="0",ne.style.display="flex",ne.style.alignItems="center",ne.style.justifyContent="center",ne.style.background="rgba(0,0,0,0.65)",ne.style.pointerEvents="auto",ne.style.zIndex="8600";const se=document.createElement("div");se.style.width="min(260px, 82vw)",se.style.borderRadius="20px",se.style.border=`1px solid ${W}`,se.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",se.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",se.style.padding="16px 14px 14px 14px",se.style.textAlign="center",se.style.color="#fff",se.style.fontFamily="system-ui,sans-serif",se.style.opacity="0",se.style.transform="translateY(14px) scale(0.96)",se.style.transition="opacity .2s ease-out, transform .2s ease-out";const Se=$?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',ke=$?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
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
        ${nt(O)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${nt(M)}
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
    `,ne.appendChild(se),document.body.appendChild(ne),requestAnimationFrame(()=>{se.style.opacity="1",se.style.transform="translateY(0) scale(1)"});const $e=()=>{se.style.opacity="0",se.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(ne)},200)},Ie=se.querySelector("#cbsgoCardPreviewCloseBtn");Ie&&(Ie.onclick=$e),ne.addEventListener("click",ot=>{ot.target===ne&&$e()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const h=x.getAttribute("data-card-id");h&&p(h)})})}function Hi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ki(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var d=!1;try{d=this instanceof l}catch{}return d?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var d=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,d.get?d:{enumerable:!0,get:function(){return t[l]}})}),o}function Xi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Nn={exports:{}};const Vi={},Zi=Object.freeze(Object.defineProperty({__proto__:null,default:Vi},Symbol.toStringTag,{value:"Module"})),Qi=Ki(Zi);var ur;function Ji(){return ur||(ur=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},d=new Uint8Array(16),f=new Uint8Array(32);f[0]=9;var u=o(),p=o([1]),b=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),$=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function O(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function M(r,a,i,e,s){var g,m=0;for(g=0;g<s;g++)m|=r[a+g]^i[e+g];return(1&m-1>>>8)-1}function N(r,a,i,e){return M(r,a,i,e,16)}function q(r,a,i,e){return M(r,a,i,e,32)}function W(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,A=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,xe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,D=g,I=m,R=k,U=A,z=G,w=B,v=xe,E=T,S=V,C=Z,L=oe,K=re,ie=Q,le=ee,ae=J,c,fe=0;fe<20;fe+=2)c=P+K|0,U^=c<<7|c>>>25,c=U+P|0,E^=c<<9|c>>>23,c=E+U|0,K^=c<<13|c>>>19,c=K+E|0,P^=c<<18|c>>>14,c=z+D|0,S^=c<<7|c>>>25,c=S+z|0,ie^=c<<9|c>>>23,c=ie+S|0,D^=c<<13|c>>>19,c=D+ie|0,z^=c<<18|c>>>14,c=C+w|0,le^=c<<7|c>>>25,c=le+C|0,I^=c<<9|c>>>23,c=I+le|0,w^=c<<13|c>>>19,c=w+I|0,C^=c<<18|c>>>14,c=ae+L|0,R^=c<<7|c>>>25,c=R+ae|0,v^=c<<9|c>>>23,c=v+R|0,L^=c<<13|c>>>19,c=L+v|0,ae^=c<<18|c>>>14,c=P+R|0,D^=c<<7|c>>>25,c=D+P|0,I^=c<<9|c>>>23,c=I+D|0,R^=c<<13|c>>>19,c=R+I|0,P^=c<<18|c>>>14,c=z+U|0,w^=c<<7|c>>>25,c=w+z|0,v^=c<<9|c>>>23,c=v+w|0,U^=c<<13|c>>>19,c=U+v|0,z^=c<<18|c>>>14,c=C+S|0,L^=c<<7|c>>>25,c=L+C|0,E^=c<<9|c>>>23,c=E+L|0,S^=c<<13|c>>>19,c=S+E|0,C^=c<<18|c>>>14,c=ae+le|0,K^=c<<7|c>>>25,c=K+ae|0,ie^=c<<9|c>>>23,c=ie+K|0,le^=c<<13|c>>>19,c=le+ie|0,ae^=c<<18|c>>>14;P=P+s|0,D=D+g|0,I=I+m|0,R=R+k|0,U=U+A|0,z=z+G|0,w=w+B|0,v=v+xe|0,E=E+T|0,S=S+V|0,C=C+Z|0,L=L+oe|0,K=K+re|0,ie=ie+Q|0,le=le+ee|0,ae=ae+J|0,r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=D>>>0&255,r[5]=D>>>8&255,r[6]=D>>>16&255,r[7]=D>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=R>>>0&255,r[13]=R>>>8&255,r[14]=R>>>16&255,r[15]=R>>>24&255,r[16]=U>>>0&255,r[17]=U>>>8&255,r[18]=U>>>16&255,r[19]=U>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=L>>>0&255,r[45]=L>>>8&255,r[46]=L>>>16&255,r[47]=L>>>24&255,r[48]=K>>>0&255,r[49]=K>>>8&255,r[50]=K>>>16&255,r[51]=K>>>24&255,r[52]=ie>>>0&255,r[53]=ie>>>8&255,r[54]=ie>>>16&255,r[55]=ie>>>24&255,r[56]=le>>>0&255,r[57]=le>>>8&255,r[58]=le>>>16&255,r[59]=le>>>24&255,r[60]=ae>>>0&255,r[61]=ae>>>8&255,r[62]=ae>>>16&255,r[63]=ae>>>24&255}function be(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,A=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,xe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,D=g,I=m,R=k,U=A,z=G,w=B,v=xe,E=T,S=V,C=Z,L=oe,K=re,ie=Q,le=ee,ae=J,c,fe=0;fe<20;fe+=2)c=P+K|0,U^=c<<7|c>>>25,c=U+P|0,E^=c<<9|c>>>23,c=E+U|0,K^=c<<13|c>>>19,c=K+E|0,P^=c<<18|c>>>14,c=z+D|0,S^=c<<7|c>>>25,c=S+z|0,ie^=c<<9|c>>>23,c=ie+S|0,D^=c<<13|c>>>19,c=D+ie|0,z^=c<<18|c>>>14,c=C+w|0,le^=c<<7|c>>>25,c=le+C|0,I^=c<<9|c>>>23,c=I+le|0,w^=c<<13|c>>>19,c=w+I|0,C^=c<<18|c>>>14,c=ae+L|0,R^=c<<7|c>>>25,c=R+ae|0,v^=c<<9|c>>>23,c=v+R|0,L^=c<<13|c>>>19,c=L+v|0,ae^=c<<18|c>>>14,c=P+R|0,D^=c<<7|c>>>25,c=D+P|0,I^=c<<9|c>>>23,c=I+D|0,R^=c<<13|c>>>19,c=R+I|0,P^=c<<18|c>>>14,c=z+U|0,w^=c<<7|c>>>25,c=w+z|0,v^=c<<9|c>>>23,c=v+w|0,U^=c<<13|c>>>19,c=U+v|0,z^=c<<18|c>>>14,c=C+S|0,L^=c<<7|c>>>25,c=L+C|0,E^=c<<9|c>>>23,c=E+L|0,S^=c<<13|c>>>19,c=S+E|0,C^=c<<18|c>>>14,c=ae+le|0,K^=c<<7|c>>>25,c=K+ae|0,ie^=c<<9|c>>>23,c=ie+K|0,le^=c<<13|c>>>19,c=le+ie|0,ae^=c<<18|c>>>14;r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ae>>>0&255,r[13]=ae>>>8&255,r[14]=ae>>>16&255,r[15]=ae>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function ne(r,a,i,e){W(r,a,i,e)}function se(r,a,i,e){be(r,a,i,e)}var Se=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function ke(r,a,i,e,s,g,m){var k=new Uint8Array(16),A=new Uint8Array(64),G,B;for(B=0;B<16;B++)k[B]=0;for(B=0;B<8;B++)k[B]=g[B];for(;s>=64;){for(ne(A,k,m,Se),B=0;B<64;B++)r[a+B]=i[e+B]^A[B];for(G=1,B=8;B<16;B++)G=G+(k[B]&255)|0,k[B]=G&255,G>>>=8;s-=64,a+=64,e+=64}if(s>0)for(ne(A,k,m,Se),B=0;B<s;B++)r[a+B]=i[e+B]^A[B];return 0}function $e(r,a,i,e,s){var g=new Uint8Array(16),m=new Uint8Array(64),k,A;for(A=0;A<16;A++)g[A]=0;for(A=0;A<8;A++)g[A]=e[A];for(;i>=64;){for(ne(m,g,s,Se),A=0;A<64;A++)r[a+A]=m[A];for(k=1,A=8;A<16;A++)k=k+(g[A]&255)|0,g[A]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(ne(m,g,s,Se),A=0;A<i;A++)r[a+A]=m[A];return 0}function Ie(r,a,i,e,s){var g=new Uint8Array(32);se(g,e,s,Se);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return $e(r,a,i,m,g)}function ot(r,a,i,e,s,g,m){var k=new Uint8Array(32);se(k,g,m,Se);for(var A=new Uint8Array(8),G=0;G<8;G++)A[G]=g[G+16];return ke(r,a,i,e,s,A,k)}var it=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,m,k,A;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,A=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|A<<8)&8191,this.r[9]=A>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};it.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,m,k,A,G,B,xe,T,V,Z,oe,re,Q,ee,J,P,D,I,R=this.h[0],U=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],L=this.h[8],K=this.h[9],ie=this.r[0],le=this.r[1],ae=this.r[2],c=this.r[3],fe=this.r[4],ye=this.r[5],ge=this.r[6],ce=this.r[7],pe=this.r[8],ue=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,R+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,U+=(s>>>13|g<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,z+=(g>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,A=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|A<<12)&8191,E+=A>>>1&8191,G=r[a+10]&255|(r[a+11]&255)<<8,S+=(A>>>14|G<<2)&8191,B=r[a+12]&255|(r[a+13]&255)<<8,C+=(G>>>11|B<<5)&8191,xe=r[a+14]&255|(r[a+15]&255)<<8,L+=(B>>>8|xe<<8)&8191,K+=xe>>>5|e,T=0,V=T,V+=R*ie,V+=U*(5*ue),V+=z*(5*pe),V+=w*(5*ce),V+=v*(5*ge),T=V>>>13,V&=8191,V+=E*(5*ye),V+=S*(5*fe),V+=C*(5*c),V+=L*(5*ae),V+=K*(5*le),T+=V>>>13,V&=8191,Z=T,Z+=R*le,Z+=U*ie,Z+=z*(5*ue),Z+=w*(5*pe),Z+=v*(5*ce),T=Z>>>13,Z&=8191,Z+=E*(5*ge),Z+=S*(5*ye),Z+=C*(5*fe),Z+=L*(5*c),Z+=K*(5*ae),T+=Z>>>13,Z&=8191,oe=T,oe+=R*ae,oe+=U*le,oe+=z*ie,oe+=w*(5*ue),oe+=v*(5*pe),T=oe>>>13,oe&=8191,oe+=E*(5*ce),oe+=S*(5*ge),oe+=C*(5*ye),oe+=L*(5*fe),oe+=K*(5*c),T+=oe>>>13,oe&=8191,re=T,re+=R*c,re+=U*ae,re+=z*le,re+=w*ie,re+=v*(5*ue),T=re>>>13,re&=8191,re+=E*(5*pe),re+=S*(5*ce),re+=C*(5*ge),re+=L*(5*ye),re+=K*(5*fe),T+=re>>>13,re&=8191,Q=T,Q+=R*fe,Q+=U*c,Q+=z*ae,Q+=w*le,Q+=v*ie,T=Q>>>13,Q&=8191,Q+=E*(5*ue),Q+=S*(5*pe),Q+=C*(5*ce),Q+=L*(5*ge),Q+=K*(5*ye),T+=Q>>>13,Q&=8191,ee=T,ee+=R*ye,ee+=U*fe,ee+=z*c,ee+=w*ae,ee+=v*le,T=ee>>>13,ee&=8191,ee+=E*ie,ee+=S*(5*ue),ee+=C*(5*pe),ee+=L*(5*ce),ee+=K*(5*ge),T+=ee>>>13,ee&=8191,J=T,J+=R*ge,J+=U*ye,J+=z*fe,J+=w*c,J+=v*ae,T=J>>>13,J&=8191,J+=E*le,J+=S*ie,J+=C*(5*ue),J+=L*(5*pe),J+=K*(5*ce),T+=J>>>13,J&=8191,P=T,P+=R*ce,P+=U*ge,P+=z*ye,P+=w*fe,P+=v*c,T=P>>>13,P&=8191,P+=E*ae,P+=S*le,P+=C*ie,P+=L*(5*ue),P+=K*(5*pe),T+=P>>>13,P&=8191,D=T,D+=R*pe,D+=U*ce,D+=z*ge,D+=w*ye,D+=v*fe,T=D>>>13,D&=8191,D+=E*c,D+=S*ae,D+=C*le,D+=L*ie,D+=K*(5*ue),T+=D>>>13,D&=8191,I=T,I+=R*ue,I+=U*pe,I+=z*ce,I+=w*ge,I+=v*ye,T=I>>>13,I&=8191,I+=E*fe,I+=S*c,I+=C*ae,I+=L*le,I+=K*ie,T+=I>>>13,I&=8191,T=(T<<2)+T|0,T=T+V|0,V=T&8191,T=T>>>13,Z+=T,R=V,U=Z,z=oe,w=re,v=Q,E=ee,S=J,C=P,L=D,K=I,a+=16,i-=16;this.h[0]=R,this.h[1]=U,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=L,this.h[9]=K},it.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,m=1;m<8;m++)g=(this.h[m]+this.pad[m]|0)+(g>>>16)|0,this.h[m]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},it.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Lt(r,a,i,e,s,g){var m=new it(g);return m.update(i,e,s),m.finish(r,a),0}function at(r,a,i,e,s,g){var m=new Uint8Array(16);return Lt(m,0,i,e,s,g),N(r,a,m,0)}function Pe(r,a,i,e,s){var g;if(i<32)return-1;for(ot(r,0,a,0,i,e,s),Lt(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function xt(r,a,i,e,s){var g,m=new Uint8Array(32);if(i<32||(Ie(m,0,32,e,s),at(a,16,a,32,i-32,m)!==0))return-1;for(ot(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function Ue(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function yt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function qe(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function Qe(r,a){var i,e,s,g=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(yt(m),yt(m),yt(m),e=0;e<2;e++){for(g[0]=m[0]-65517,i=1;i<15;i++)g[i]=m[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=m[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,qe(m,g,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function At(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Qe(i,r),Qe(e,a),q(i,0,e,0)}function gt(r){var a=new Uint8Array(32);return Qe(a,r),a[0]&1}function He(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Oe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function je(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function de(r,a,i){var e,s,g=0,m=0,k=0,A=0,G=0,B=0,xe=0,T=0,V=0,Z=0,oe=0,re=0,Q=0,ee=0,J=0,P=0,D=0,I=0,R=0,U=0,z=0,w=0,v=0,E=0,S=0,C=0,L=0,K=0,ie=0,le=0,ae=0,c=i[0],fe=i[1],ye=i[2],ge=i[3],ce=i[4],pe=i[5],ue=i[6],Ce=i[7],he=i[8],we=i[9],ve=i[10],_e=i[11],Le=i[12],ze=i[13],Be=i[14],Ne=i[15];e=a[0],g+=e*c,m+=e*fe,k+=e*ye,A+=e*ge,G+=e*ce,B+=e*pe,xe+=e*ue,T+=e*Ce,V+=e*he,Z+=e*we,oe+=e*ve,re+=e*_e,Q+=e*Le,ee+=e*ze,J+=e*Be,P+=e*Ne,e=a[1],m+=e*c,k+=e*fe,A+=e*ye,G+=e*ge,B+=e*ce,xe+=e*pe,T+=e*ue,V+=e*Ce,Z+=e*he,oe+=e*we,re+=e*ve,Q+=e*_e,ee+=e*Le,J+=e*ze,P+=e*Be,D+=e*Ne,e=a[2],k+=e*c,A+=e*fe,G+=e*ye,B+=e*ge,xe+=e*ce,T+=e*pe,V+=e*ue,Z+=e*Ce,oe+=e*he,re+=e*we,Q+=e*ve,ee+=e*_e,J+=e*Le,P+=e*ze,D+=e*Be,I+=e*Ne,e=a[3],A+=e*c,G+=e*fe,B+=e*ye,xe+=e*ge,T+=e*ce,V+=e*pe,Z+=e*ue,oe+=e*Ce,re+=e*he,Q+=e*we,ee+=e*ve,J+=e*_e,P+=e*Le,D+=e*ze,I+=e*Be,R+=e*Ne,e=a[4],G+=e*c,B+=e*fe,xe+=e*ye,T+=e*ge,V+=e*ce,Z+=e*pe,oe+=e*ue,re+=e*Ce,Q+=e*he,ee+=e*we,J+=e*ve,P+=e*_e,D+=e*Le,I+=e*ze,R+=e*Be,U+=e*Ne,e=a[5],B+=e*c,xe+=e*fe,T+=e*ye,V+=e*ge,Z+=e*ce,oe+=e*pe,re+=e*ue,Q+=e*Ce,ee+=e*he,J+=e*we,P+=e*ve,D+=e*_e,I+=e*Le,R+=e*ze,U+=e*Be,z+=e*Ne,e=a[6],xe+=e*c,T+=e*fe,V+=e*ye,Z+=e*ge,oe+=e*ce,re+=e*pe,Q+=e*ue,ee+=e*Ce,J+=e*he,P+=e*we,D+=e*ve,I+=e*_e,R+=e*Le,U+=e*ze,z+=e*Be,w+=e*Ne,e=a[7],T+=e*c,V+=e*fe,Z+=e*ye,oe+=e*ge,re+=e*ce,Q+=e*pe,ee+=e*ue,J+=e*Ce,P+=e*he,D+=e*we,I+=e*ve,R+=e*_e,U+=e*Le,z+=e*ze,w+=e*Be,v+=e*Ne,e=a[8],V+=e*c,Z+=e*fe,oe+=e*ye,re+=e*ge,Q+=e*ce,ee+=e*pe,J+=e*ue,P+=e*Ce,D+=e*he,I+=e*we,R+=e*ve,U+=e*_e,z+=e*Le,w+=e*ze,v+=e*Be,E+=e*Ne,e=a[9],Z+=e*c,oe+=e*fe,re+=e*ye,Q+=e*ge,ee+=e*ce,J+=e*pe,P+=e*ue,D+=e*Ce,I+=e*he,R+=e*we,U+=e*ve,z+=e*_e,w+=e*Le,v+=e*ze,E+=e*Be,S+=e*Ne,e=a[10],oe+=e*c,re+=e*fe,Q+=e*ye,ee+=e*ge,J+=e*ce,P+=e*pe,D+=e*ue,I+=e*Ce,R+=e*he,U+=e*we,z+=e*ve,w+=e*_e,v+=e*Le,E+=e*ze,S+=e*Be,C+=e*Ne,e=a[11],re+=e*c,Q+=e*fe,ee+=e*ye,J+=e*ge,P+=e*ce,D+=e*pe,I+=e*ue,R+=e*Ce,U+=e*he,z+=e*we,w+=e*ve,v+=e*_e,E+=e*Le,S+=e*ze,C+=e*Be,L+=e*Ne,e=a[12],Q+=e*c,ee+=e*fe,J+=e*ye,P+=e*ge,D+=e*ce,I+=e*pe,R+=e*ue,U+=e*Ce,z+=e*he,w+=e*we,v+=e*ve,E+=e*_e,S+=e*Le,C+=e*ze,L+=e*Be,K+=e*Ne,e=a[13],ee+=e*c,J+=e*fe,P+=e*ye,D+=e*ge,I+=e*ce,R+=e*pe,U+=e*ue,z+=e*Ce,w+=e*he,v+=e*we,E+=e*ve,S+=e*_e,C+=e*Le,L+=e*ze,K+=e*Be,ie+=e*Ne,e=a[14],J+=e*c,P+=e*fe,D+=e*ye,I+=e*ge,R+=e*ce,U+=e*pe,z+=e*ue,w+=e*Ce,v+=e*he,E+=e*we,S+=e*ve,C+=e*_e,L+=e*Le,K+=e*ze,ie+=e*Be,le+=e*Ne,e=a[15],P+=e*c,D+=e*fe,I+=e*ye,R+=e*ge,U+=e*ce,z+=e*pe,w+=e*ue,v+=e*Ce,E+=e*he,S+=e*we,C+=e*ve,L+=e*_e,K+=e*Le,ie+=e*ze,le+=e*Be,ae+=e*Ne,g+=38*D,m+=38*I,k+=38*R,A+=38*U,G+=38*z,B+=38*w,xe+=38*v,T+=38*E,V+=38*S,Z+=38*C,oe+=38*L,re+=38*K,Q+=38*ie,ee+=38*le,J+=38*ae,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=A+s+65535,s=Math.floor(e/65536),A=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=xe+s+65535,s=Math.floor(e/65536),xe=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=A+s+65535,s=Math.floor(e/65536),A=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=xe+s+65535,s=Math.floor(e/65536),xe=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=m,r[2]=k,r[3]=A,r[4]=G,r[5]=B,r[6]=xe,r[7]=T,r[8]=V,r[9]=Z,r[10]=oe,r[11]=re,r[12]=Q,r[13]=ee,r[14]=J,r[15]=P}function F(r,a){de(r,a,a)}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)F(i,i),e!==2&&e!==4&&de(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function H(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)F(i,i),e!==1&&de(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function j(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,m,k=o(),A=o(),G=o(),B=o(),xe=o(),T=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,He(s,i),m=0;m<16;m++)A[m]=s[m],B[m]=k[m]=G[m]=0;for(k[0]=B[0]=1,m=254;m>=0;--m)g=e[m>>>3]>>>(m&7)&1,qe(k,A,g),qe(G,B,g),Oe(xe,k,G),je(k,k,G),Oe(G,A,B),je(A,A,B),F(B,xe),F(T,k),de(k,G,k),de(G,A,xe),Oe(xe,k,G),je(k,k,G),F(A,k),je(G,B,T),de(k,G,b),Oe(k,k,B),de(G,G,k),de(k,B,T),de(B,A,s),F(A,xe),qe(k,A,g),qe(G,B,g);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=G[m],s[m+48]=A[m],s[m+64]=B[m];var V=s.subarray(32),Z=s.subarray(16);return Y(V,V),de(Z,Z,V),Qe(r,Z),0}function te(r,a){return j(r,a,f)}function me(r,a){return l(a,32),te(r,a)}function Ee(r,a,i){var e=new Uint8Array(32);return j(e,i,a),se(r,d,e,Se)}var Me=Pe,bt=xt;function yn(r,a,i,e,s,g){var m=new Uint8Array(32);return Ee(m,s,g),Me(r,a,i,e,m)}function De(r,a,i,e,s,g){var m=new Uint8Array(32);return Ee(m,s,g),bt(r,a,i,e,m)}var Je=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Jn(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),m,k,A,G,B,xe,T,V,Z,oe,re,Q,ee,J,P,D,I,R,U,z,w,v,E,S,C,L,K=r[0],ie=r[1],le=r[2],ae=r[3],c=r[4],fe=r[5],ye=r[6],ge=r[7],ce=a[0],pe=a[1],ue=a[2],Ce=a[3],he=a[4],we=a[5],ve=a[6],_e=a[7],Le=0;e>=128;){for(U=0;U<16;U++)z=8*U+Le,s[U]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],g[U]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(U=0;U<80;U++)if(m=K,k=ie,A=le,G=ae,B=c,xe=fe,T=ye,V=ge,Z=ce,oe=pe,re=ue,Q=Ce,ee=he,J=we,P=ve,D=_e,w=ge,v=_e,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=(c>>>14|he<<18)^(c>>>18|he<<14)^(he>>>9|c<<23),v=(he>>>14|c<<18)^(he>>>18|c<<14)^(c>>>9|he<<23),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=c&fe^~c&ye,v=he&we^~he&ve,E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=Je[U*2],v=Je[U*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=s[U%16],v=g[U%16],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,I=C&65535|L<<16,R=E&65535|S<<16,w=I,v=R,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=(K>>>28|ce<<4)^(ce>>>2|K<<30)^(ce>>>7|K<<25),v=(ce>>>28|K<<4)^(K>>>2|ce<<30)^(K>>>7|ce<<25),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=K&ie^K&le^ie&le,v=ce&pe^ce&ue^pe&ue,E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,V=C&65535|L<<16,D=E&65535|S<<16,w=G,v=Q,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=I,v=R,E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,G=C&65535|L<<16,Q=E&65535|S<<16,ie=m,le=k,ae=A,c=G,fe=B,ye=xe,ge=T,K=V,pe=Z,ue=oe,Ce=re,he=Q,we=ee,ve=J,_e=P,ce=D,U%16===15)for(z=0;z<16;z++)w=s[z],v=g[z],E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=s[(z+9)%16],v=g[(z+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,I=s[(z+1)%16],R=g[(z+1)%16],w=(I>>>1|R<<31)^(I>>>8|R<<24)^I>>>7,v=(R>>>1|I<<31)^(R>>>8|I<<24)^(R>>>7|I<<25),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,I=s[(z+14)%16],R=g[(z+14)%16],w=(I>>>19|R<<13)^(R>>>29|I<<3)^I>>>6,v=(R>>>19|I<<13)^(I>>>29|R<<3)^(R>>>6|I<<26),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,s[z]=C&65535|L<<16,g[z]=E&65535|S<<16;w=K,v=ce,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[0]=K=C&65535|L<<16,a[0]=ce=E&65535|S<<16,w=ie,v=pe,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[1]=ie=C&65535|L<<16,a[1]=pe=E&65535|S<<16,w=le,v=ue,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[2]=le=C&65535|L<<16,a[2]=ue=E&65535|S<<16,w=ae,v=Ce,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[3]=ae=C&65535|L<<16,a[3]=Ce=E&65535|S<<16,w=c,v=he,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[4]=c=C&65535|L<<16,a[4]=he=E&65535|S<<16,w=fe,v=we,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[5]=fe=C&65535|L<<16,a[5]=we=E&65535|S<<16,w=ye,v=ve,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[6]=ye=C&65535|L<<16,a[6]=ve=E&65535|S<<16,w=ge,v=_e,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[7]=ge=C&65535|L<<16,a[7]=_e=E&65535|S<<16,Le+=128,e-=128}return e}function st(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Jn(e,s,a,i),i%=128,m=0;m<i;m++)g[m]=a[k-i+m];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,O(g,i-8,k/536870912|0,k<<3),Jn(e,s,g,i),m=0;m<8;m++)O(r,8*m,e[m],s[m]);return 0}function Ht(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),A=o(),G=o(),B=o();je(i,r[1],r[0]),je(B,a[1],a[0]),de(i,i,B),Oe(e,r[0],r[1]),Oe(B,a[0],a[1]),de(e,e,B),de(s,r[3],a[3]),de(s,s,h),de(g,r[2],a[2]),Oe(g,g,g),je(m,e,i),je(k,g,s),Oe(A,g,s),Oe(G,e,i),de(r[0],m,k),de(r[1],G,A),de(r[2],A,k),de(r[3],m,G)}function er(r,a,i){var e;for(e=0;e<4;e++)qe(r[e],a[e],i)}function gn(r,a){var i=o(),e=o(),s=o();Y(s,a[2]),de(i,a[0],s),de(e,a[1],s),Qe(r,e),r[31]^=gt(i)<<7}function bn(r,a,i){var e,s;for(Ue(r[0],u),Ue(r[1],p),Ue(r[2],p),Ue(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,er(r,a,e),Ht(a,r),Ht(r,r),er(r,a,e)}function Kt(r,a){var i=[o(),o(),o(),o()];Ue(i[0],y),Ue(i[1],_),Ue(i[2],p),de(i[3],y,_),bn(r,i,a)}function hn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),st(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Kt(s,e),gn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function mn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function wn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;mn(r,a)}function tr(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),m=new Uint8Array(64),k,A,G=new Float64Array(64),B=[o(),o(),o(),o()];st(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var xe=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(st(m,r.subarray(32),i+32),wn(m),Kt(B,m),gn(r,B),k=32;k<64;k++)r[k]=e[k];for(st(g,r,i+64),wn(g),k=0;k<64;k++)G[k]=0;for(k=0;k<32;k++)G[k]=m[k];for(k=0;k<32;k++)for(A=0;A<32;A++)G[k+A]+=g[k]*s[A];return mn(r.subarray(32),G),xe}function no(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),A=o();return Ue(r[2],p),He(r[1],a),F(s,r[1]),de(g,s,x),je(s,s,r[2]),Oe(g,r[2],g),F(m,g),F(k,m),de(A,k,m),de(i,A,s),de(i,i,g),H(i,i),de(i,i,s),de(i,i,g),de(i,i,g),de(r[0],i,g),F(e,r[0]),de(e,e,g),At(e,s)&&de(r[0],r[0],$),F(e,r[0]),de(e,e,g),At(e,s)?-1:(gt(r[0])===a[31]>>7&&je(r[0],u,r[0]),de(r[3],r[0],r[1]),0)}function vn(r,a,i,e){var s,g=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],A=[o(),o(),o(),o()];if(i<64||no(A,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(st(m,r,i),wn(m),bn(k,A,m),Kt(A,a.subarray(32)),Ht(k,A),gn(g,k),i-=64,q(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var _n=32,Vt=24,zt=32,ht=16,Bt=32,Zt=32,Nt=32,It=32,Sn=32,nr=Vt,ro=zt,oo=ht,Ke=64,lt=32,mt=64,kn=32,Cn=64;n.lowlevel={crypto_core_hsalsa20:se,crypto_stream_xor:ot,crypto_stream:Ie,crypto_stream_salsa20_xor:ke,crypto_stream_salsa20:$e,crypto_onetimeauth:Lt,crypto_onetimeauth_verify:at,crypto_verify_16:N,crypto_verify_32:q,crypto_secretbox:Pe,crypto_secretbox_open:xt,crypto_scalarmult:j,crypto_scalarmult_base:te,crypto_box_beforenm:Ee,crypto_box_afternm:Me,crypto_box:yn,crypto_box_open:De,crypto_box_keypair:me,crypto_hash:st,crypto_sign:tr,crypto_sign_keypair:hn,crypto_sign_open:vn,crypto_secretbox_KEYBYTES:_n,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:ht,crypto_scalarmult_BYTES:Bt,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:Nt,crypto_box_SECRETKEYBYTES:It,crypto_box_BEFORENMBYTES:Sn,crypto_box_NONCEBYTES:nr,crypto_box_ZEROBYTES:ro,crypto_box_BOXZEROBYTES:oo,crypto_sign_BYTES:Ke,crypto_sign_PUBLICKEYBYTES:lt,crypto_sign_SECRETKEYBYTES:mt,crypto_sign_SEEDBYTES:kn,crypto_hash_BYTES:Cn,gf:o,D:x,L:Xt,pack25519:Qe,unpack25519:He,M:de,A:Oe,S:F,Z:je,pow2523:H,add:Ht,set25519:Ue,modL:mn,scalarmult:bn,scalarbase:Kt};function rr(r,a){if(r.length!==_n)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function io(r,a){if(r.length!==Nt)throw new Error("bad public key size");if(a.length!==It)throw new Error("bad secret key size")}function Re(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function or(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Re(r,a,i),rr(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+zt]=r[g];return Pe(s,e,e.length,a,i),s.subarray(ht)},n.secretbox.open=function(r,a,i){Re(r,a,i),rr(i,a);for(var e=new Uint8Array(ht+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+ht]=r[g];return e.length<32||xt(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=_n,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=ht,n.scalarMult=function(r,a){if(Re(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==Bt)throw new Error("bad p size");var i=new Uint8Array(Bt);return j(i,r,a),i},n.scalarMult.base=function(r){if(Re(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(Bt);return te(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=Bt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Re(r,a),io(r,a);var i=new Uint8Array(Sn);return Ee(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Nt),a=new Uint8Array(It);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Re(r),r.length!==It)throw new Error("bad secret key size");var a=new Uint8Array(Nt);return te(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Nt,n.box.secretKeyLength=It,n.box.sharedKeyLength=Sn,n.box.nonceLength=nr,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Re(r,a),a.length!==mt)throw new Error("bad secret key size");var i=new Uint8Array(Ke+r.length);return tr(i,r,r.length,a),i},n.sign.open=function(r,a){if(Re(r,a),a.length!==lt)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=vn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ke),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Re(r,a,i),a.length!==Ke)throw new Error("bad signature size");if(i.length!==lt)throw new Error("bad public key size");var e=new Uint8Array(Ke+r.length),s=new Uint8Array(Ke+r.length),g;for(g=0;g<Ke;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+Ke]=r[g];return vn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(lt),a=new Uint8Array(mt);return hn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Re(r),r.length!==mt)throw new Error("bad secret key size");for(var a=new Uint8Array(lt),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Re(r),r.length!==kn)throw new Error("bad seed size");for(var a=new Uint8Array(lt),i=new Uint8Array(mt),e=0;e<32;e++)i[e]=r[e];return hn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=lt,n.sign.secretKeyLength=mt,n.sign.seedLength=kn,n.sign.signatureLength=Ke,n.hash=function(r){Re(r);var a=new Uint8Array(Cn);return st(a,r,r.length),a},n.hash.hashLength=Cn,n.verify=function(r,a){return Re(r,a),r.length===0||a.length===0||r.length!==a.length?!1:M(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];or(g)})}else typeof Xi<"u"&&(r=Qi,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];or(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Nn)),Nn.exports}var ea=Ji();const ta=Hi(ea);function na(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const h=t.charAt(x),y=h.charCodeAt(0);if(n[y]!==255)throw new TypeError(h+" is ambiguous");n[y]=x}const o=t.length,l=t.charAt(0),d=Math.log(o)/Math.log(256),f=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let h=0,y=0,_=0;const $=x.length;for(;_!==$&&x[_]===0;)_++,h++;const O=($-_)*f+1>>>0,M=new Uint8Array(O);for(;_!==$;){let W=x[_],be=0;for(let ne=O-1;(W!==0||be<y)&&ne!==-1;ne--,be++)W+=256*M[ne]>>>0,M[ne]=W%o>>>0,W=W/o>>>0;if(W!==0)throw new Error("Non-zero carry");y=be,_++}let N=O-y;for(;N!==O&&M[N]===0;)N++;let q=l.repeat(h);for(;N<O;++N)q+=t.charAt(M[N]);return q}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let h=0,y=0,_=0;for(;x[h]===l;)y++,h++;const $=(x.length-h)*d+1>>>0,O=new Uint8Array($);for(;h<x.length;){const W=x.charCodeAt(h);if(W>255)return;let be=n[W];if(be===255)return;let ne=0;for(let se=$-1;(be!==0||ne<_)&&se!==-1;se--,ne++)be+=o*O[se]>>>0,O[se]=be%256>>>0,be=be/256>>>0;if(be!==0)throw new Error("Non-zero carry");_=ne,h++}let M=$-_;for(;M!==$&&O[M]===0;)M++;const N=new Uint8Array(y+($-M));let q=y;for(;M!==$;)N[q++]=O[M++];return N}function b(x){const h=p(x);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:b}}var ra="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const xr=na(ra),Zn="cbsgo_wallet_v3",un="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(Zn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function oa(t){localStorage.setItem(Zn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function ia(){const t=ta.sign.keyPair(),n=xr.encode(t.publicKey),o=xr.encode(t.secretKey);return{pk:n,sk:o}}function Dr(){return!!qt()}function aa(){return qt()?sessionStorage.getItem(un)==="1":!1}function sa(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:d}=ia();return oa({pk:l,sk:d,pin:n}),sessionStorage.setItem(un,"1"),l}function la(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(un,"1"),n.pk}function Ye(){const t=qt();return t?t.pk:""}function ca(){localStorage.removeItem(Zn),sessionStorage.removeItem(un)}typeof window<"u"&&(window.cbsgoDevResetWallet=ca);const Yr="cbsgoLoginModal";function qr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Hr(){const t=document.getElementById(Yr);t&&t.remove()}function fa(t){Hr();const n=document.createElement("div");return n.id=Yr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function da(t,n){return`
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
  `}function Qt(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function yr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function pa(){const t=!Dr();let n="";try{const h=ut();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${qr(n)}" style="${Qt()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Qt()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${Qt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${yr(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Qt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${yr(!0)}">Unlock</button>
      </div>
    `,l=fa(da(t?"Welcome to CBS-GO":"Unlock Wallet",o)),d=l.querySelector("#cbsgoLoginMsg"),f=h=>{d&&(d.textContent=h||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),b=l.querySelector("#cbsgoNick"),x=()=>{Hr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const y=String(b?.value||"").trim(),_=String(u?.value||"").trim(),$=String(p?.value||"").trim();if(y.length<2)return f("⛔ Nickname too short.");if(_.length<4)return f("⛔ PIN must be at least 4 digits.");if(_!==$)return f("⛔ PINs do not match.");f("Creating wallet…"),jr(y),await sa(_),f("✅ Wallet created. Starting…"),x()}catch(y){f(`⛔ ${String(y?.message||y)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return f("⛔ PIN must be at least 4 digits.");f("Unlocking…"),await la(y),f("✅ Unlocked."),x()}catch{f("⛔ Wrong PIN (or wallet data missing).")}})}}const ua="https://cxfedvowjgkqrakkkjpi.supabase.co",xa="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Fe=ao(ua,xa);function ya(){const t=Ye();if(!t)return null;const n=ut(),o=pn();return{wallet_pk:t,nickname:n,avatar:o}}async function rn(t={}){try{const n=ya();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Fe.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ga=15e3,ba=1e4,ha=300*1e3;let $t=null,gr=0,br=0;function ma(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||($t={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",ma));async function wa(){const t=Ye();if(!t||!$t)return;const n=Date.now();if(n-gr<5e3)return;gr=n;const l=(ut()||"").trim()||"Anon",d={wallet_pk:t,nickname:l,lat:$t.lat,lng:$t.lng,heading:$t.heading,last_seen:new Date().toISOString()};try{const{data:f,error:u}=await Fe.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(f&&f.length>0){const p=f[0].id,{error:b}=await Fe.from("player_state").update(d).eq("id",p);b&&console.warn("CBS GO: player_state update failed",b)}else{const{error:p}=await Fe.from("player_state").insert(d);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(f){console.warn("CBS GO: pushMyState error",f)}}async function va(){const t=Ye();if(!t)return;const n=Date.now();if(n-br<3e3)return;br=n;const o=new Date(Date.now()-ha).toISOString();try{const{data:l,error:d}=await Fe.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(d){console.warn("CBS GO: fetch online players failed",d);return}const f=Array.isArray(l)?l:[],u=Array.from(new Set(f.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:h}=await Fe.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const b=f.map(x=>{const h=x.lat,y=x.lng,_=typeof h=="number"?h:parseFloat(h),$=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite($))return null;const O=p.get(x.wallet_pk)||null,M=O&&O.nickname||x.nickname||"Anon",N=O&&O.avatar?String(O.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:M,avatar:N,lat:_,lng:$,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:b}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function _a(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{wa()},ga),setInterval(()=>{va()},ba))}_a();function Kr(){const t=Ye();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function ln(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Sa(t){const n=Kr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Fe.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw ln("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function ka(t){const n=Kr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:d}=await Fe.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(d)throw ln("acceptFriendRequest",d),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Xr(){const t=Ye();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Fe.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw ln("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],d=[],f=[];for(const p of l){const b=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!b&&!x)continue;const h=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:h,nickname:null,avatar:""};b&&d.push(y),x&&f.push(y)}const u=Array.from(new Set([...d,...f].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:b}=await Fe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!b&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const h=y=>{y.forEach(_=>{const $=x.get(_.otherWallet);$&&(_.nickname=$.nickname||null,_.avatar=$.avatar||"")})};h(d),h(f)}else b&&ln("loadFriendsOverview:players",b)}return{incoming:d,accepted:f}}let jt=null;async function Vr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(jt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),jt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Ca(){try{jt&&(await jt.release(),jt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Ea(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Vr():await Ca()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}const Rn="cbsgo_trades";async function Ma(t,n){const o=Ye();if(!o)throw new Error("No local CBS-GO wallet available.");const l=ut(),d=pn(),f=Number(n?.tickets||0),u=Number(n?.cbs||0),p=n?.cardId||null,b=p?Number(n?.cardQty||0):0;if(!f&&!u&&!p)throw new Error("Nothing to send.");const{error:x}=await Fe.from(Rn).insert({from_wallet:o,to_wallet:t,tickets:f,cbs:u,card_id:p,card_qty:b,sender_nickname:l||null,sender_avatar:d||null,claimed:!1});if(x)throw console.warn("CBS GO: sendGiftToWallet failed",x),new Error(x.message||"Could not send gift.")}async function Fn(){const t=Ye();if(!t)return;const{data:n,error:o}=await Fe.from(Rn).select("*").eq("to_wallet",t).eq("claimed",!1).order("created_at",{ascending:!0}).limit(50);if(o){console.warn("CBS GO: pullIncomingGifts failed",o);return}if(!(!n||!n.length)){for(const l of n){const d=Number(l.tickets||0),f=Number(l.cbs||0),u=l.card_id||null,p=Number(l.card_qty||0);d&&Dt(d),f&&Yn(f),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:{senderNickname:l.sender_nickname||"",senderAvatar:l.sender_avatar||"",toWallet:l.to_wallet,tickets:d,cbs:f,cardId:u,cardQty:p}}));const{error:b}=await Fe.from(Rn).update({claimed:!0}).eq("id",l.id);b&&console.warn("CBS GO: failed to mark trade as claimed",b)}typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged"))}}function Ae(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Qn(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const Zr="cbsgo_cards_v1";function La(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Gt(){const t=localStorage.getItem(Zr),n=La(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const d=Number(l.count||0);Number.isFinite(d)&&d>0&&(o[l.id]=d)}),o}function Qr(t){const n={counts:{...t||{}}};try{localStorage.setItem(Zr,JSON.stringify(n))}catch{}}function Un(){const t=Gt(),n=dt();n.cards={...t||{}},Dn(n)}const Aa=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function za(){const t=Gt();let n=0,o=0;const l=[];for(const d of Aa){const f=Number(t[d.id]||0);Number.isFinite(f)&&f>0&&(n+=1,o+=f,l.push({id:d.id,count:f,label:d.label}))}return{cardTypes:n,cardTotal:o,sendable:l}}function xn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Gn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function hr(t,n){return`
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
  `}function Ba(){const t=ut(),n=pn(),o=Ye();return`
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
        ${Qn(n,64)}

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
  `}function Na(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const d=M=>{const N=document.querySelector("#profileMsg");N&&(N.textContent=M||"")};t&&d(t.value?`✅ Profile loaded: ${t.value}`:"");const f=()=>{if(!t)return;const M=jr(t.value);d(`✅ Name saved: ${M}`);try{rn()}catch(N){console.warn("CBS GO: failed to sync profile after name change",N)}};t&&(t.addEventListener("input",()=>{d("Saving…"),l&&clearTimeout(l),l=setTimeout(f,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),f()})),n&&n.addEventListener("change",()=>{const M=n.files&&n.files[0];if(!M)return;if(M.size>15e5){d("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}d("Uploading photo…");const N=new FileReader;N.onload=()=>{oi(String(N.result||"")),d("✅ Photo saved"),Mt();try{rn()}catch(q){console.warn("CBS GO: failed to sync profile after avatar change",q)}},N.onerror=()=>d("⛔ Failed to read image."),N.readAsDataURL(M)}),o&&(o.onclick=()=>{ii(),d("✅ Photo removed"),Mt();try{rn()}catch(M){console.warn("CBS GO: failed to sync profile after avatar removal",M)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),b=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),h=document.querySelector("#friendsAcceptedList"),y=M=>{b&&(b.textContent=M||"")},_=M=>{if(!M)return"";const N=String(M);return N.length<=12?N:`${N.slice(0,5)}…${N.slice(-4)}`},$=(M,N="")=>{const q=M.nickname&&M.nickname.trim()?M.nickname.trim():_(M.otherWallet),W=_(M.otherWallet);return`
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
          ${Qn(M.avatar||"",32)}
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
    `};async function O(){if(!(!x||!h))try{x.textContent="Loading…",h.textContent="Loading…";const M=await Xr();M.incoming.length?x.innerHTML=M.incoming.map(N=>{const q=`
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
            `;return $(N,q)}).join(""):x.textContent="No incoming requests.",M.accepted.length?h.innerHTML=M.accepted.map(N=>{const q=`
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
            `;return $(N,q)}).join(""):h.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(N=>{N.addEventListener("click",async()=>{const q=N.getAttribute("data-friend-id");if(q){y("Accepting friend…"),N.disabled=!0;try{await ka(q),y("✅ Friend added."),await O()}catch(W){console.warn(W),y(`⛔ ${W.message||W}`),N.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(N=>{N.addEventListener("click",async()=>{const q=N.getAttribute("data-wallet")||"";if(q)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(q),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(W){console.warn("CBS GO: copy friend wallet failed",W),y("⛔ Could not copy wallet address.")}})})}catch(M){console.warn("CBS GO: refreshFriends failed",M),x.textContent="Could not load friends.",h.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const M=u.value.trim();if(!M){y("Enter a wallet address first.");return}y("Sending friend request…"),p.disabled=!0;try{await Sa(M),y("✅ Friend request sent."),u.value="",await O()}catch(N){console.warn(N),y(`⛔ ${N.message||N}`)}finally{p.disabled=!1}}),O().catch(()=>{})}function Ia(){const t=vo(),n=_o(),o=Ye(),{cardTypes:l,cardTotal:d,sendable:f}=za(),u=d>0?`You own ${d} cards (${l} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",b=f.length>0?`
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
  `}function Ta(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{qi()}catch(M){console.warn("CBS GO: openCardsPanel failed",M)}});try{Un()}catch(M){console.warn("CBS GO: failed to sync inventory cards from bag",M)}const l=Ye(),d=document.querySelector("#giftWalletInput"),f=document.querySelector("#giftFriendSelect"),u=document.querySelector("#giftTicketsInput"),p=document.querySelector("#giftCbsInput"),b=document.querySelector("#giftCardSelect"),x=document.querySelector("#giftCardQtyInput"),h=document.querySelector("#giftSendBtn"),y=document.querySelector("#giftMsg"),_=M=>{y&&(y.textContent=M||"")};async function $(){if(f)try{const M=await Xr(),N=[];N.push('<option value="">-- No friend selected --</option>'),M.accepted&&M.accepted.length&&M.accepted.forEach(q=>{const W=q.otherWallet||"";if(!W)return;const be=q.nickname&&q.nickname.trim()?q.nickname.trim():W,ne=Ae(be),se=W.length>12?`${W.slice(0,5)}…${W.slice(-4)}`:W,Se=`${ne} (${Ae(se)})`;N.push(`<option value="${Ae(W)}">${Se}</option>`)}),f.innerHTML=N.join("")}catch(M){console.warn("CBS GO: populateFriendSelect failed",M),f.innerHTML='<option value="">-- Friends not available --</option>'}}if($().catch(()=>{}),h&&(d||f)&&h.addEventListener("click",async()=>{let M=d&&d.value?d.value.trim():"";if((!M||!M.length)&&f){const ke=f.value.trim();ke&&(M=ke)}const N=u?.value??"",q=p?.value??"",W=b?b.value.trim():"",be=x?.value??"",ne=Number(be||"0"),se=Number(N||"0"),Se=Number(q||"0");if(!M){_("Enter a wallet address first, or pick a friend.");return}if((!se||se<=0)&&(!Se||Se<=0)&&!W){_("Set tickets and/or CBS above 0, or choose a card.");return}if(W&&(!ne||ne<=0)){_("Set card quantity above 0.");return}if(W&&ne>0){const ke=Gt(),$e=Number(ke[W]||0);if(!Number.isFinite($e)||$e<ne){_("Not enough of that card in your collection.");return}}h.disabled=!0,_("Sending gift…");try{if(await Ma(M,{tickets:se,cbs:Se,cardId:W||null,cardQty:W?ne:0}),W&&ne>0){const ke=Gt(),Ie=Number(ke[W]||0)-ne;Ie>0?ke[W]=Ie:delete ke[W],Qr(ke),Un(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...ke}}}))}_("✅ Gift sent."),u&&(u.value=""),p&&(p.value=""),x&&(x.value=""),b&&(b.value=""),f&&(f.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:M,tickets:se,cbs:Se,cardId:W||null,cardQty:W?ne:0}}))}catch(ke){console.warn(ke),_(`⛔ ${ke.message||"Could not send gift."}`)}finally{h.disabled=!1}}),!t||!l){Fn().catch(()=>{});return}const O=M=>{n&&(n.textContent=M||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),O("✅ Wallet address copied to clipboard.")):O("📋 Copy not supported in this browser.")}catch{O("⛔ Failed to copy address.")}},Fn().catch(()=>{})}function Jr(){const t=xn();return t==="profile"?hr("Profile",`<div id="profileMount">${Ba()}</div>`):t==="bag"?hr("Bag",`<div id="bagMount">${Ia()}</div>`):""}function $a(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Pi()}
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
        ${Jr()}
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
  `}function Mt(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Jr();const n=xn();n==="profile"&&Na(),n==="bag"&&Ta();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Gn("map"),Mt()})}function Pa(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=xn();Gn(o===n?"map":n||"map"),Mt()})})}function mr(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:d,toWallet:f,tickets:u=0,cbs:p=0,cardId:b=null,cardQty:x=0}=t||{};if(!u&&!p&&!(b&&x))return;n.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.78)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=ut(),$=o==="sent"?"Gift sent":"You received a gift",O=[];u&&O.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&O.push(`🪙 ${p} CBS`),b&&x&&O.push(`🃏 ${x} card${x===1?"":"s"}`);const M=o==="sent"?`
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
      `:Qn(d||"",40);y.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${N}
      <div>
        <div style="font-size:15px;font-weight:800;">${Ae($)}</div>
        ${M}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${Ae(O.join(" · "))}
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
  `,h.appendChild(y),n.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const q=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},W=document.getElementById("cbsgoTradePopupCloseBtn");W&&(W.onclick=q),h.addEventListener("click",be=>{be.target===h&&q()})}function wr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=$a();try{Vr(),Ea()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{rn()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Pa(),Fi(),ni(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=$r())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Tr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{xn()==="bag"&&Mt()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let b=p.querySelector(".cbsgoToastBox");b||(b=document.createElement("div"),b.className="cbsgoToastBox",b.style.pointerEvents="auto",b.style.padding="8px 12px",b.style.borderRadius="999px",b.style.border="1px solid rgba(255,255,255,.25)",b.style.background="rgba(10,12,18,.88)",b.style.backdropFilter="blur(10px)",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.fontSize="11px",b.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",b.style.opacity="0",b.style.transform="translateY(10px)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(b)),b.textContent=u||"",b.style.opacity="1",b.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{b.style.opacity="0",b.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},b=Number(p.xp||0),x=Number(p.tickets||0),h=Number(p.cbs||0);if(!b&&!x&&!h)return;const y=[];b&&y.push(`+${b} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),h&&y.push(`+${h} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.steps||0),x=Number(u?.goal||0),h=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const $=x?`${b}/${x} steps`:`${b} steps`;_.innerHTML=`
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
        ${$}
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const O=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},M=document.getElementById("cbsgoDailyGoalCloseBtn");M&&(M.onclick=O),y.addEventListener("click",N=>{N.target===y&&O()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function d(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const b=Number(u?.xp||0),x=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!b&&!x&&!h)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const $=[];b&&$.push(`+${b} XP`),x&&$.push(`+${x} ticket${x===1?"":"s"}`),h&&$.push(`+${h} CBS`),_.innerHTML=`
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
        ${Ae($.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{d(u?.detail||{})}));function f(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.days||7),x=Number(u?.rewardCbs||0),h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.80)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(340px, 92vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(251,191,36,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",y.style.padding="20px 18px 16px 18px",y.style.textAlign="center",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",y.innerHTML=`
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
    `,h.appendChild(y),p.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},$=document.getElementById("cbsgoStreakCloseBtn");$&&($.onclick=_),h.addEventListener("click",O=>{O.target===h&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{f(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{mr(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{},b=p.cardId||null,x=Number(p.cardQty||0);if(b&&x>0){const h=Gt(),_=Number(h[b]||0)+x;h[b]=_,Qr(h),Un(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...h}}}))}mr({direction:"received",fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0})})),Mt(),Pr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ri)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Tn({id:"__daily__",name:"Daily Glow"});return}if(Er(p))return;const b=xo.find(x=>x.id===p);b&&Tn(b)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&co(async()=>{const{completeNode:b}=await Promise.resolve().then(()=>bo);return{completeNode:b}},void 0).then(({completeNode:b})=>{b(p),eo()})})),Fn().catch(()=>{})}function eo(){if(!document.querySelector("#app"))return;if(Dr()&&aa()){wr();return}pa();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),wr()};window.addEventListener("cbsgo:loginDone",n)}function to(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function cn(t){const n=to();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";cn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{cn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function vr(){try{if(!document.getElementById("app")){cn("❌ #app not found in index.html");return}eo();const n=to();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){cn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vr,{once:!0}):vr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
