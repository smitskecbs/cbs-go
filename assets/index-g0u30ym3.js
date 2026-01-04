import{createClient as po}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(c){if(c.ep)return;c.ep=!0;const d=o(c);fetch(c.href,d)}})();const uo="modulepreload",xo=function(t){return"/cbs-go/"+t},cr={},yo=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let b=function(x){return Promise.all(x.map(h=>Promise.resolve(h).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=b(o.map(x=>{if(x=xo(x),x in cr)return;cr[x]=!0;const h=x.endsWith(".css"),y=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":uo,h||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),h)return new Promise(($,j)=>{_.addEventListener("load",$),_.addEventListener("error",()=>j(new Error(`Unable to preload CSS for ${x}`)))})}))}function d(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&d(p.reason);return n().catch(d)})},jn="cbsgoLevelUpOverlay",dr="cbsgoLevelUpStyles",Bn="https://smitskecbs.github.io/cbs-go/";function go(){if(document.getElementById(dr))return;const t=document.createElement("style");t.id=dr,t.textContent=`
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
  `,document.head.appendChild(t)}function zn(){const t=document.getElementById(jn);t&&t.remove()}function bo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const d=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${d}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function fr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ho(t){go(),zn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=jn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${fr(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${fr(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&bo(c);const d=()=>zn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),b=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=d),p&&(p.onclick=d),b&&(b.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Bn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Bn),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+Bn)}}),setTimeout(()=>{document.getElementById(jn)&&zn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{ho(t?.detail||{})}));const mo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Er="cbsgo_state_v6";function wo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function vo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ft(){const t=localStorage.getItem(Er);return wo(t,vo())}function Mr(t){t.updatedAt=Date.now(),localStorage.setItem(Er,JSON.stringify(t))}function Kn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function un(){return Number(Ft().xp||0)}function Ut(){const t=un();let n=1,o=t;for(;;){const l=Kn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function Lr(){const t=un();let n=1,o=t;for(;;){const l=Kn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function Ar(){return Kn(Ut())}function Dt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ft();const o=Ut(),l=Ft();l.xp=Number(l.xp||0)+n,Mr(l);const c=Ut();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function Br(t){const n=String(t||"");if(!n)return!1;const o=Ft();return!!(o.completed&&o.completed[n])}function zr(t){const n=String(t||"");if(!n)return;const o=Ft();o.completed||(o.completed={}),o.completed[n]=Date.now(),Mr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const _o=Object.freeze(Object.defineProperty({__proto__:null,addXp:Dt,completeNode:zr,getLevel:Ut,getXp:un,getXpIntoLevel:Lr,getXpNeededThisLevel:Ar,isNodeCompleted:Br},Symbol.toStringTag,{value:"Module"})),Nr="cbsgoPuzzleModal";function So(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nn(){const t=document.getElementById(Nr);t&&t.remove()}function Rn(t){Nn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],d=180,u=18,p=l.length,b=.01;let x=[],h=null,y=0,_=u,$=!1,j=!1,A=null;const T=t?.name||"CBS GO Puzzle",B=document.createElement("div");B.id=Nr,B.style.position="fixed",B.style.inset="0",B.style.zIndex="999999",B.style.display="flex",B.style.alignItems="center",B.style.justifyContent="center",B.style.padding="16px",B.style.background="rgba(0,0,0,.70)",B.style.backdropFilter="blur(12px)",B.style.fontFamily="system-ui, sans-serif",B.style.color="#fff",B.innerHTML=`
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
          ${So(T)}
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
  `,document.body.appendChild(B);const O=document.getElementById("cbsgoBoard"),oe=document.getElementById("cbsgoScore"),te=document.getElementById("cbsgoMoves"),le=document.getElementById("cbsgoStatus"),Se=document.getElementById("cbsgoPuzzleClose"),ke=document.getElementById("cbsgoPuzzleOk"),$e=document.getElementById("cbsgoConfettiLayer");function Ie(G){le&&(le.textContent=G||"")}function ot(){if(!$e)return;$e.style.display="block",$e.innerHTML="";const G=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],q=40;for(let H=0;H<q;H++){const F=document.createElement("div"),ne=6+Math.floor(Math.random()*6),me=Math.random()*100,Ee=Math.random()*.6,Me=1+Math.random()*.6,bt=Math.random()*360;F.style.position="absolute",F.style.top="-10%",F.style.left=`${me}%`,F.style.width=`${ne}px`,F.style.height=`${ne*2}px`,F.style.background=G[H%G.length],F.style.opacity="0.9",F.style.borderRadius="2px",F.style.transform=`rotate(${bt}deg)`,F.style.animation=`cbsgoConfettiFall ${Me}s ease-out ${Ee}s forwards`,$e.appendChild(F)}}function it(){return Math.floor(Math.random()*l.length)}function At(){x=[];for(let G=0;G<n;G++){const q=[];for(let H=0;H<o;H++)Math.random()<b?q.push(p):q.push(it());x.push(q)}}function at(G){return G===p}function Pe(){if(O){O.innerHTML="";for(let G=0;G<n;G++)for(let q=0;q<o;q++){const H=x[G][q],F=document.createElement("div");F.dataset.row=String(G),F.dataset.col=String(q),F.style.borderRadius="12px",F.style.display="flex",F.style.alignItems="center",F.style.justifyContent="center",F.style.cursor=j?"default":"pointer",F.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",F.style.fontSize="20px",at(H)?(F.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",F.textContent="💥"):(F.style.background=l[H]||"#444",F.textContent=c[H]||"⬛"),h&&h.row===G&&h.col===q&&(F.style.outline="2px solid #fff",F.style.outlineOffset="2px"),F.addEventListener("click",()=>{je(G,q)}),F.addEventListener("touchstart",ne=>{if(j)return;const me=ne.touches[0];A={row:G,col:q,x:me.clientX,y:me.clientY}}),F.addEventListener("touchend",ne=>{if(!A||j)return;const me=ne.changedTouches[0],Ee=me.clientX-A.x,Me=me.clientY-A.y;if(Math.sqrt(Ee*Ee+Me*Me)<18){je(G,q),A=null;return}let Ye=A.row,Je=A.col;Math.abs(Ee)>Math.abs(Me)?Ee>0?Je+=1:Je-=1:Me>0?Ye+=1:Ye-=1,Ye>=0&&Ye<n&&Je>=0&&Je<o&&Oe(A.row,A.col,Ye,Je),A=null,ne.preventDefault()}),O.appendChild(F)}}}function xt(G,q){if(!G||!q)return!1;const H=Math.abs(G.row-q.row),F=Math.abs(G.col-q.col);return H+F===1}function Ue(G,q){const H=x[G.row][G.col];x[G.row][G.col]=x[q.row][q.col],x[q.row][q.col]=H}function yt(){const G=new Set;for(let q=0;q<n;q++){let H=x[q][0],F=0;for(let ne=1;ne<=o;ne++){const me=ne<o?x[q][ne]:null;if(me===H)continue;const Ee=ne-F;if(H!=null&&Ee>=3)for(let Me=F;Me<ne;Me++)G.add(`${q},${Me}`);H=me,F=ne}}for(let q=0;q<o;q++){let H=x[0][q],F=0;for(let ne=1;ne<=n;ne++){const me=ne<n?x[ne][q]:null;if(me===H)continue;const Ee=ne-F;if(H!=null&&Ee>=3)for(let Me=F;Me<ne;Me++)G.add(`${Me},${q}`);H=me,F=ne}}return G}function qe(G){if(!G||!G.size)return 0;const q=G.size;y+=q*4,oe&&(oe.textContent=String(y)),!j&&y>=d&&gt(!0);for(const H of G){const[F,ne]=H.split(","),me=Number(F),Ee=Number(ne);x[me][Ee]=null}for(let H=0;H<o;H++){let F=n-1;for(let ne=n-1;ne>=0;ne--)x[ne][H]!=null&&(x[F][H]=x[ne][H],F--);for(let ne=F;ne>=0;ne--)Math.random()<b?x[ne][H]=p:x[ne][H]=it()}return q}function Qe(G,q){const H=new Set;for(let F=0;F<o;F++)H.add(`${G},${F}`);for(let F=0;F<n;F++)H.add(`${F},${q}`);qe(H),Pe(),j||setTimeout(()=>Bt(!1),120)}function Bt(G=!1){if(j)return;$=!0;const q=()=>{if(j){$=!0;return}const H=yt();if(!H.size){$=!1,Pe(),G&&!j&&(_<=0?He():Ie("Nice! Keep matching."));return}qe(H),Pe(),setTimeout(q,120)};q()}function gt(G){if(!j)if(j=!0,$=!0,G){Ie("Great job! Puzzle completed 🎉");try{t?.id&&zr(t.id),Dt(10)}catch{}ot(),setTimeout(()=>{Nn()},1600)}else Ie("Out of moves. Try again next time 🙂")}function He(){y>=d?gt(!0):_<=0&&gt(!1)}function Oe(G,q,H,F){if($||j)return;if(_<=0){He();return}const ne={row:G,col:q},me={row:H,col:F};if(!xt(ne,me))return;const Ee=x[G][q],Me=x[H][F],bt=at(Ee)||at(Me);if(Ue(ne,me),h=null,_--,te&&(te.textContent=String(_)),bt){Pe();const Ye=at(x[G][q])?{row:G,col:q}:{row:H,col:F};Qe(Ye.row,Ye.col),He();return}if(!yt().size){Ue(ne,me),Pe(),Ie("No match… try another swap."),He();return}Ie(""),Pe(),Bt(!0)}function je(G,q){if($||j)return;if(_<=0){He();return}const H={row:G,col:q};if(!h){h=H,Pe();return}if(h.row===G&&h.col===q){h=null,Pe();return}if(!xt(h,H)){h=H,Pe();return}Oe(h.row,h.col,H.row,H.col)}function pe(){Nn()}Se&&(Se.onclick=pe),ke&&(ke.onclick=()=>{pe()}),At(),Pe(),Ie("Tap or swipe two neighboring tiles to swap them.")}const Ir="cbsgo_inventory_v2";function ko(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Co(){return{tickets:0,cbs:0,cards:{}}}function ft(){const t=localStorage.getItem(Ir),n=ko(t,Co());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Xn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Ir,JSON.stringify(n))}function Jt(){return Number(ft().tickets||0)}function en(){return Number(ft().cbs||0)}function Lt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return ft();const o=ft();let c=Number(o.tickets||0)+n;return c<0&&(c=0),o.tickets=c,Xn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function xn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return ft();const o=ft();let c=Number(o.cbs||0)+n;return c<0&&(c=0),o.cbs=c,Xn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const Tr="cbsgo_steps_v6",Eo="cbsgo_steps_v5",Mo="cbsgo_gps_autostart_v2",$r="cbsgo_daily_puzzle_v1",Lo=.75,Ct=5e3,ln=7,Fn=100,Ao=1e3,Bo=.5,zo=2e3,No=4.5,In=1500,Tn=200,Io=.25,To=.05,$o=.3;let tn=null,nn=!1,wt={msg:"init"};function Un(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Pr="cbsgo_cards_v1",Po=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Oo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function jo(t){return Po.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Ro(){try{const t=localStorage.getItem(Pr),n=Un(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const d=Number(c.count);Number.isFinite(d)&&d>0&&(o[l]=d)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Fo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,d]of Object.entries(n)){const u=Number(d||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Pr,JSON.stringify(l))}catch{}}function Uo(t,n=1){const o=Oo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const d={...Ro().counts||{}},p=Number(d[o]||0)+l;d[o]=p,Fo({counts:d});const b=jo(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:d}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:b}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:b}}))}catch{}return{cardId:o,count:p,card:b}}function rt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Go(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,d=new Date(o,l-1,c);return Number.isNaN(d.getTime())?null:d}function Wo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Or(t,n){const o=Go(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const d=new Date(o.getTime());d.setDate(d.getDate()-c),l.push(Wo(d))}return l}function cn(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:rt(),daySteps:0,dayMeters:0,dailyGoalSteps:Ct,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Do(t){const n=rt();return!t||typeof t!="object"?cn():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Ct),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Ct),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function yn(t){t.updatedAt=Date.now(),localStorage.setItem(Tr,JSON.stringify(t))}function Yo(t,n){if(!n)return;const o=Or(n,ln);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(xn(Fn),Yt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:ln,rewardCbs:Fn,lastDayKey:n}})))}function pr(t){t=Do(t||cn());const n=rt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Yo(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,yn(t)}return t}function pt(){let t=localStorage.getItem(Tr);if(!t){const o=localStorage.getItem(Eo);if(o){const l=Un(o,cn()),c=pr(l);return yn(c),c}}const n=Un(t,cn());return pr(n)}function rn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:qo()}}))}function Vn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Yt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Zn(t,n,o,l){const c=Number(t||0),d=Number(n||0),u=0;if(!(!c&&!d&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:d,cbs:u,reason:l||"distance"}}))}catch{}}function qo(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Ho(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Ko(){return Ho()/1e3}function Xo(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||Ct),l=!!t.dailyGoalReached,c=t.dayKey||rt(),d=t.streak||{},p=Or(c,ln).map(b=>{let x=!1;return b===c?x=l:x=!!d[b],{dateKey:b,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:ln,rewardPerStreak:Fn}}function ur(){return!!nn}function Vo(){try{return localStorage.getItem($r)===rt()}catch{return!1}}function Zo(){try{localStorage.setItem($r,rt())}catch{}}function Qo(t,n){return Vo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:rt()}})),Zo(),!0)}function xr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Jo(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<In)return;const d=Math.floor(c/In);d<=0||(Lt(d),Yt(),Zn(0,d,0,"boost"),t.boostLastStep=o+d*In)}function ei(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Tn){t.chestMeters=n;return}let o=0;for(;n>=Tn&&o<5;)if(n-=Tn,o+=1,Math.random()<Io){const l=Math.random()<To,c=l?10:3,d=l?2:1;Dt(c),Vn(),Lt(d),Yt();const u=l&&Math.random()<$o;Zn(c,d,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:d,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function ti(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function ni(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),d=Number(t.xpKmAwarded||0);if(c>d){const x=c-d;x>0&&(Dt(x),Vn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),b=Number(t.ticketChunksAwarded||0);if(p>b){const x=p-b;x>0&&(Lt(x),Yt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Zn(o,l,0,"distance")}function ri(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/Lo);if(c>l){const d=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+d}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||Ct)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||rt(),steps:o.daySteps,goal:o.dailyGoalSteps||Ct}}))),ni(o),Jo(o),ei(o),yn(o),rn(),o}function oi(){tn!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(tn),tn=null}async function yr(t={}){const n=!!t.silent;if(!navigator.geolocation)return wt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Mo,"1")}catch{}oi(),nn=!0,wt={msg:"requesting",t:Date.now()};try{return tn=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,d=o.coords.accuracy||999,u=Date.now(),p=pt(),b=p.lastPos;p.lastPos={lat:l,lng:c,t:u},yn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:d,heading:x,speed:h,t:u}})),d>Ao){wt={lat:l,lng:c,acc:d,t:u,reason:"accuracy",boostMs:xr()},rn();return}Qo(l,c);let y=0,_=0,$=0,j=0,A="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(y=ti({lat:b.lat,lng:b.lng},{lat:l,lng:c}),_=Math.max(1,(u-b.t)/1e3),$=y/_,y<Bo?A="jitter":y>zo?A="teleport":$>No?A="too-fast":(ri(y),j=y,A="ok")),wt={lat:l,lng:c,acc:d,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite($)?Number($.toFixed(2)):0,added:Math.round(j),reason:A,boostMs:xr()},rn()},o=>{nn=!1,wt={err:o?.message||"GPS blocked",t:Date.now()},rn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return nn=!1,wt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ii(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ur()||await yr({silent:!0}))();const n=async()=>{ur()||await yr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Dt(o),Vn()),(l>0||c>0)&&(l>0&&Lt(l),c>0&&xn(c),Yt());const d=n.cardId||n.card_id;if(d)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Uo(d,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function jr(){const t=un(),n=Ut(),o=Lr(),l=Ar(),c=Ko(),d=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function Rr(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:d}=Xo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function Fr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ai(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Ur="cbsgo_player_name_v2",Qn="cbsgo_player_avatar_v2";function ut(){try{return localStorage.getItem(Ur)||"Sovereign"}catch{return"Sovereign"}}function Gr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Ur,n)}catch{}return n}function gn(){try{return localStorage.getItem(Qn)||""}catch{return""}}function si(t){const n=String(t||"");try{localStorage.setItem(Qn,n)}catch{}return n}function li(){try{localStorage.removeItem(Qn)}catch{}}let X=null,et=null,tt=null,$t=null,Ot=null,We=null,Te=null,vt=0,ct=!1,Ze=!0,Ge=null;const Xe=new Map;let Ve=!0,jt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const ci="48a387bba00043ac4ba5823371abc9d2",Gt=80,di=6,fi=80,pi=220,ui=6e4,xi=5*6e4,yi=300,gi=.35,$n=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],bi=350,hi=.35,mi=120;let dn=0,_t=0,on=null,Gn=!1,kt=[];function dt(t){return document.getElementById(t)}function St(t){const n=dt("cbsgoMapHost");if(!n)return;let o=dt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function wi(){const t=String(ut()||"").trim();return t?t[0].toUpperCase():"🙂"}function Wn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Et(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Wr(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,d=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+d,lng:t.lng+u}}function vi(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),d=o(n.lng-t.lng),u=Math.sin(d)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(d);let b=Math.atan2(u,p);return b=b*180/Math.PI,b=(b+360)%360,b}function _i(t,n,o){const c=n/6371e3,d=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,b=Math.sin(u),x=Math.cos(u),h=Math.sin(c),y=Math.cos(c),_=Math.asin(b*y+x*h*Math.cos(d)),$=p+Math.atan2(Math.sin(d)*h*x,y-b*Math.sin(_));return[_*180/Math.PI,$*180/Math.PI]}function Si(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Dr(){const{temp:t,iconEmoji:n}=jt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Yr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;Si();const{condition:n,isNight:o}=jt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const d=[];for(let u=0;u<96;u++){const p=Math.random()*100,b=Math.random()*16-8,x=Math.random()*2.5,h=2+Math.random()*1.5;d.push(`
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
      `)}l=d.join("")}else if(n==="snow"){const d=[];for(let u=0;u<80;u++){const p=Math.random()*100,b=Math.random()*20-10,x=Math.random()*4,h=6+Math.random()*4;d.push(`
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
      `)}l=d.join("")}else l="";t.innerHTML=l}async function ki(t,n){const o=Date.now();if(!(jt.lastUpdated&&o-jt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${ci}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const d=await c.json(),u=d?.main?.temp,p=d?.weather?.[0]?.icon||"01d",b=String(d?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),h="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(h="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(h="🌧️",y="rain"):p.startsWith("11")?(h="⛈️",y="storm"):p.startsWith("13")?(h="❄️",y="snow"):p.startsWith("50")&&(h="🌫️",y="mist"),b.includes("rain")&&(y="rain"),b.includes("snow")&&(y="snow"),b.includes("thunder")&&(y="storm");try{const $=Number(d?.dt||0),j=Number(d?.timezone||0);if($&&Number.isFinite(j)){const T=(($+j)/3600%24+24)%24;x=T<7||T>=19}}catch{}y==="clear"?h=x?"🌙":"☀️":y==="clouds"?h="☁️":y==="rain"?h="🌧️":y==="storm"?h="⛈️":y==="snow"?h="❄️":y==="mist"&&(h="🌫️"),jt={temp:u,iconEmoji:h,condition:y,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Dr()),Yr()}catch(l){console.warn("Weather fetch failed",l)}}function Ci(t){const n=gn();if(n){const c=`
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
    ">${Wn(wi())}</div>
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Ei(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Wn(o)}');
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
    ">${Wn(c)}</div>
  `;return t.divIcon({html:d,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function Mi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Li(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Ai(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Bi(){if(!$n.length)return null;const t=Math.floor(Math.random()*$n.length);return $n[t]}function zi(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let d=null,u=0;if(Math.random()<gi){const p=Bi();p&&(d=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:d,cardCount:u}}function Ni(t){if(!X||!We||!t)return;const n=Date.now();if(n-dn<ui||We.getLayers().length>=di)return;const l=window.L;if(!l)return;const c=Ai(),d=zi(c),u=Wr(t,fi,pi),p=Mi(l),b=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),h={marker:b,createdAt:n,lat:u.lat,lng:u.lng,reward:d};kt.push(h),b.on("click",()=>{if(!Te){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:Te[0],lng:Te[1]},_={lat:u.lat,lng:u.lng},$=Et(y,_);if($>Gt){alert(`Too far to open this gift.

Distance: ${Math.round($)}m
Needed: ≤ ${Gt}m`);return}We.removeLayer(b),kt=kt.filter(Se=>Se.marker!==b);const{xp:j,tickets:A,cbs:T,cardId:B,cardCount:O}=d,oe=[];j&&oe.push(`+${j} XP`),A&&oe.push(`+${A} ticket${A===1?"":"s"}`),T&&oe.push(`+${T} CBS`),B&&O>0&&oe.push(`+${O} card${O===1?"":"s"}`);const te=oe.length?oe.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${te}`);const le={kind:"mystery",xp:j||0,tickets:A||0,cbs:T||0,cardId:B||null,cardCount:O||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:le}))}catch{}}),b.addTo(We),dn=n}function Ii(t){if(!X||!We||!t)return;const n=Date.now();let o=0;kt=kt.filter(l=>{if(!l||!l.marker||!We.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>xi)return We.removeLayer(l.marker),o+=1,!1;const d=Et({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(d)&&d>yi?(We.removeLayer(l.marker),o+=1,!1):!0}),o>0&&We.getLayers().length===0&&(dn=0)}function Ti(t){if(!X||!Ot||!t||on)return;const n=window.L;if(!n)return;if(Gn){if(_t<bi||Math.random()>hi)return;_t=0}else{if(_t<mi)return;_t=0,Gn=!0}const o=Wr(t,60,140),l=Li(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!Te){alert("GPS not ready yet. Wait until your player marker appears.");return}const d={lat:Te[0],lng:Te[1]},u={lat:o.lat,lng:o.lng},p=Et(d,u);if(p>Gt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Gt}m`);return}Ot.removeLayer(c),on=null,Rn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(Ot),on=c}function $i(t){const n=window.L;if(!n||!X||!t)return;const o=Gt;$t?($t.setLatLng(t),$t.setRadius(o)):$t=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(X)}function Pi(t){const n=window.L;if(!n||!X)return;const o=Ci(n);if(et?(et.setIcon(o),et.setLatLng(t)):(et=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(X),X.setView(t,19)),tt?(tt.setIcon(gr(n,vt)),tt.setLatLng(t)):tt=n.marker(t,{icon:gr(n,vt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(X),et&&et.bringToFront&&et.bringToFront(),tt&&tt.bringToFront&&tt.bringToFront(),$i(t),Ze&&!ct&&X)try{const l=X.getZoom()||19;let c=t;Number.isFinite(vt)&&(c=_i(t,40,vt));const d=X.getCenter(),u=Et({lat:d.lat,lng:d.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&X.setView(c,l)}catch{}}function qr(){const t=window.L;return!t||!X?null:(Ge?(Ve&&!X.hasLayer(Ge)&&Ge.addTo(X),!Ve&&X.hasLayer(Ge)&&X.removeLayer(Ge)):(Ge=t.layerGroup(),Ve&&Ge.addTo(X)),Ge)}function Oi(t){if(!Array.isArray(t)||!X)return[];const n=X.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(d=>{if(!d||d.isMe||typeof d.lat!="number"||typeof d.lng!="number")return;const u=Math.round(d.lat*o)/o,p=Math.round(d.lng*o)/o,b=`${u}_${p}`;l.has(b)||l.set(b,[]),l.get(b).push(d)});const c=[];for(const[d,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||d,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,b=0;u.forEach(y=>{p+=y.lat,b+=y.lng});const x=p/u.length,h=b/u.length;c.push({id:`cluster_${d}`,lat:x,lng:h,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function ji(t){const n=window.L;if(!n||!X)return;const o=qr();if(!o)return;if(!Ve){for(const[d,u]of Xe.entries())o.removeLayer(u),Xe.delete(d);return}const l=Oi(t),c=new Set;l.forEach(d=>{if(!d||typeof d.lat!="number"||typeof d.lng!="number")return;const u=d.id||`${d.lat},${d.lng}`;c.add(u);const p=[d.lat,d.lng];let b=Xe.get(u);if(b)b.setLatLng(p);else{const x=d.isCluster&&d.count>1?String(d.count):d.nickname||"Anon",h=Ei(n,x,d.avatar,d.isCluster);b=n.marker(p,{icon:h,pane:"cbsgo-others-pane"});const y=d.isCluster&&d.count>1?`${d.count} CBS-GO explorers nearby`:`${d.nickname||"CBS-GO explorer"}`;b.bindPopup(y),b.addTo(o),Xe.set(u,b)}});for(const[d,u]of Xe.entries())c.has(d)||(o.removeLayer(u),Xe.delete(d))}function Ri(){return`
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
        <span id="cbsgoWeatherLabel">${Dr()}</span>
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
  `}function Fi(){try{X&&X.remove()}catch{}X=null,et=null,tt=null,$t=null,Ot=null,We=null,Te=null,ct=!1,Ze=!0,dn=0,_t=0,on=null,Gn=!1,Ge=null,Xe.clear(),kt=[]}function Ui(){const t=window.L,n=dt("cbsgoMap");if(!t||!n)return!1;Fi();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));X=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=X.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=X.createPane("cbsgo-others-pane");c.style.zIndex="640";const d=X.createPane("cbsgo-loot-pane");d.style.zIndex="630";const u=X.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(X),X.setMaxBounds(o),X.setView([51.687,4.87],16),Ot=t.layerGroup().addTo(X),We=t.layerGroup().addTo(X),X.on("dragstart",()=>{Ze=!1}),X.on("zoomstart",()=>{Ze=!1}),!0}function Gi(){!navigator.geolocation||!X||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,d={lat:n,lng:o},u=Te?{lat:Te[0],lng:Te[1]}:null;if(Te=[n,o],Number.isFinite(c))vt=c;else if(u){const p=Et(u,d);Number.isFinite(p)&&p>2&&(vt=vi(u,d))}if(Pi([n,o]),u){const p=Et(u,d);if(Number.isFinite(p)&&p>1&&(_t+=p),Number.isFinite(p)&&p>20&&!Ze&&!ct&&X){Ze=!0;const b=X.getZoom()||19;X.setView([n,o],b)}}Ti(d),Ni(d),Ii(d),ki(n,o),St(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{St(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Wi(){let t=0;const n=120,o=()=>{if(t++,!dt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(St("Loading map engine…"),t<n)return setTimeout(o,100);St("Map engine failed (Leaflet not found). Refresh.");return}if(!Ui()){St("Could not init map. Refresh.");return}const c=dt("cbsgoCenterBtn");c&&(c.onclick=()=>{X&&Te&&(Ze=!0,ct=!1,X.setView(Te,19))});const d=dt("cbsgoCompassBtn");d&&(d.onclick=()=>{X&&(ct=!ct,ct?(Ze=!1,X.setView([51.687,4.87],3)):Te&&(Ze=!0,X.setView(Te,16)))});const u=dt("cbsgoOnlineToggleBtn");if(u){const p=()=>{Ve?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Ve=!Ve;const b=qr();if(b&&X&&(Ve?X.hasLayer(b)||b.addTo(X):X.hasLayer(b)&&X.removeLayer(b)),p(),!Ve&&Ge){for(const[x,h]of Xe.entries())Ge.removeLayer(h);Xe.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const b=p?.detail?.players||[];ji(b)})),Yr(),St("Loading GPS…"),Gi()};o()}const Di="cbsgo_cards_v1";function Yi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Jn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function er(){const t=localStorage.getItem(Di),n=Yi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function nt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Hr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function qi(){const t=Jn(),n=er();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Hi(){const t=Jn(),n=er();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),d=Number.isFinite(c)&&c>0,u=Hr(l.rarity),p=d?u:"rgba(31,41,55,.9)",b=d?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=d?l.emoji||"🃏":"❓",h=d?nt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=nt(l.set||"Set"),_=d?`<div style="
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
            font-size:${d?"26px":"28px"};
            margin-top:${d?"4px":"8px"};
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
    `}function Ki(){const t=qi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
        ${Hi()}
      </div>
    </div>
  `}function Xi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Ki()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const d=Jn(),u=new Map(d.map(x=>[x.id,x]));function p(x){const h=u.get(x);if(!h)return;const y=er(),_=Number(y[x]||0),$=Number.isFinite(_)&&_>0,j=$?h.emoji||"🃏":"❓",A=$?h.name||"Card":"Unknown card",T=h.set||"Set",B=h.rarity||"common",O=Hr(B),oe={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[B]||"Common",te=document.createElement("div");te.style.position="fixed",te.style.inset="0",te.style.display="flex",te.style.alignItems="center",te.style.justifyContent="center",te.style.background="rgba(0,0,0,0.65)",te.style.pointerEvents="auto",te.style.zIndex="8600";const le=document.createElement("div");le.style.width="min(260px, 82vw)",le.style.borderRadius="20px",le.style.border=`1px solid ${O}`,le.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",le.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",le.style.padding="16px 14px 14px 14px",le.style.textAlign="center",le.style.color="#fff",le.style.fontFamily="system-ui,sans-serif",le.style.opacity="0",le.style.transform="translateY(14px) scale(0.96)",le.style.transition="opacity .2s ease-out, transform .2s ease-out";const Se=$?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',ke=$?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;le.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${nt(T)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${O};
          font-size:10px;
        ">
          ${nt(oe)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${O};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${nt(j)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${nt(A)}
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
    `,te.appendChild(le),document.body.appendChild(te),requestAnimationFrame(()=>{le.style.opacity="1",le.style.transform="translateY(0) scale(1)"});const $e=()=>{le.style.opacity="0",le.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(te)},200)},Ie=le.querySelector("#cbsgoCardPreviewCloseBtn");Ie&&(Ie.onclick=$e),te.addEventListener("click",ot=>{ot.target===te&&$e()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const h=x.getAttribute("data-card-id");h&&p(h)})})}function Vi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Zi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function Qi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Pn={exports:{}};const Ji={},ea=Object.freeze(Object.defineProperty({__proto__:null,default:Ji},Symbol.toStringTag,{value:"Module"})),ta=Zi(ea);var br;function na(){return br||(br=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),d=new Uint8Array(32);d[0]=9;var u=o(),p=o([1]),b=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),$=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function j(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var g,m=0;for(g=0;g<s;g++)m|=r[a+g]^i[e+g];return(1&m-1>>>8)-1}function T(r,a,i,e){return A(r,a,i,e,16)}function B(r,a,i,e){return A(r,a,i,e,32)}function O(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,D=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,N=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,P=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,ie=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,R=s,Y=g,I=m,U=k,W=L,z=D,w=N,v=ye,E=P,S=V,C=Z,M=ie,K=re,ae=Q,ce=ee,se=J,f,fe=0;fe<20;fe+=2)f=R+K|0,W^=f<<7|f>>>25,f=W+R|0,E^=f<<9|f>>>23,f=E+W|0,K^=f<<13|f>>>19,f=K+E|0,R^=f<<18|f>>>14,f=z+Y|0,S^=f<<7|f>>>25,f=S+z|0,ae^=f<<9|f>>>23,f=ae+S|0,Y^=f<<13|f>>>19,f=Y+ae|0,z^=f<<18|f>>>14,f=C+w|0,ce^=f<<7|f>>>25,f=ce+C|0,I^=f<<9|f>>>23,f=I+ce|0,w^=f<<13|f>>>19,f=w+I|0,C^=f<<18|f>>>14,f=se+M|0,U^=f<<7|f>>>25,f=U+se|0,v^=f<<9|f>>>23,f=v+U|0,M^=f<<13|f>>>19,f=M+v|0,se^=f<<18|f>>>14,f=R+U|0,Y^=f<<7|f>>>25,f=Y+R|0,I^=f<<9|f>>>23,f=I+Y|0,U^=f<<13|f>>>19,f=U+I|0,R^=f<<18|f>>>14,f=z+W|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,W^=f<<13|f>>>19,f=W+v|0,z^=f<<18|f>>>14,f=C+S|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=se+ce|0,K^=f<<7|f>>>25,f=K+se|0,ae^=f<<9|f>>>23,f=ae+K|0,ce^=f<<13|f>>>19,f=ce+ae|0,se^=f<<18|f>>>14;R=R+s|0,Y=Y+g|0,I=I+m|0,U=U+k|0,W=W+L|0,z=z+D|0,w=w+N|0,v=v+ye|0,E=E+P|0,S=S+V|0,C=C+Z|0,M=M+ie|0,K=K+re|0,ae=ae+Q|0,ce=ce+ee|0,se=se+J|0,r[0]=R>>>0&255,r[1]=R>>>8&255,r[2]=R>>>16&255,r[3]=R>>>24&255,r[4]=Y>>>0&255,r[5]=Y>>>8&255,r[6]=Y>>>16&255,r[7]=Y>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=U>>>0&255,r[13]=U>>>8&255,r[14]=U>>>16&255,r[15]=U>>>24&255,r[16]=W>>>0&255,r[17]=W>>>8&255,r[18]=W>>>16&255,r[19]=W>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=K>>>0&255,r[49]=K>>>8&255,r[50]=K>>>16&255,r[51]=K>>>24&255,r[52]=ae>>>0&255,r[53]=ae>>>8&255,r[54]=ae>>>16&255,r[55]=ae>>>24&255,r[56]=ce>>>0&255,r[57]=ce>>>8&255,r[58]=ce>>>16&255,r[59]=ce>>>24&255,r[60]=se>>>0&255,r[61]=se>>>8&255,r[62]=se>>>16&255,r[63]=se>>>24&255}function oe(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,D=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,N=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,P=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,ie=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,R=s,Y=g,I=m,U=k,W=L,z=D,w=N,v=ye,E=P,S=V,C=Z,M=ie,K=re,ae=Q,ce=ee,se=J,f,fe=0;fe<20;fe+=2)f=R+K|0,W^=f<<7|f>>>25,f=W+R|0,E^=f<<9|f>>>23,f=E+W|0,K^=f<<13|f>>>19,f=K+E|0,R^=f<<18|f>>>14,f=z+Y|0,S^=f<<7|f>>>25,f=S+z|0,ae^=f<<9|f>>>23,f=ae+S|0,Y^=f<<13|f>>>19,f=Y+ae|0,z^=f<<18|f>>>14,f=C+w|0,ce^=f<<7|f>>>25,f=ce+C|0,I^=f<<9|f>>>23,f=I+ce|0,w^=f<<13|f>>>19,f=w+I|0,C^=f<<18|f>>>14,f=se+M|0,U^=f<<7|f>>>25,f=U+se|0,v^=f<<9|f>>>23,f=v+U|0,M^=f<<13|f>>>19,f=M+v|0,se^=f<<18|f>>>14,f=R+U|0,Y^=f<<7|f>>>25,f=Y+R|0,I^=f<<9|f>>>23,f=I+Y|0,U^=f<<13|f>>>19,f=U+I|0,R^=f<<18|f>>>14,f=z+W|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,W^=f<<13|f>>>19,f=W+v|0,z^=f<<18|f>>>14,f=C+S|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=se+ce|0,K^=f<<7|f>>>25,f=K+se|0,ae^=f<<9|f>>>23,f=ae+K|0,ce^=f<<13|f>>>19,f=ce+ae|0,se^=f<<18|f>>>14;r[0]=R>>>0&255,r[1]=R>>>8&255,r[2]=R>>>16&255,r[3]=R>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=se>>>0&255,r[13]=se>>>8&255,r[14]=se>>>16&255,r[15]=se>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function te(r,a,i,e){O(r,a,i,e)}function le(r,a,i,e){oe(r,a,i,e)}var Se=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function ke(r,a,i,e,s,g,m){var k=new Uint8Array(16),L=new Uint8Array(64),D,N;for(N=0;N<16;N++)k[N]=0;for(N=0;N<8;N++)k[N]=g[N];for(;s>=64;){for(te(L,k,m,Se),N=0;N<64;N++)r[a+N]=i[e+N]^L[N];for(D=1,N=8;N<16;N++)D=D+(k[N]&255)|0,k[N]=D&255,D>>>=8;s-=64,a+=64,e+=64}if(s>0)for(te(L,k,m,Se),N=0;N<s;N++)r[a+N]=i[e+N]^L[N];return 0}function $e(r,a,i,e,s){var g=new Uint8Array(16),m=new Uint8Array(64),k,L;for(L=0;L<16;L++)g[L]=0;for(L=0;L<8;L++)g[L]=e[L];for(;i>=64;){for(te(m,g,s,Se),L=0;L<64;L++)r[a+L]=m[L];for(k=1,L=8;L<16;L++)k=k+(g[L]&255)|0,g[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(te(m,g,s,Se),L=0;L<i;L++)r[a+L]=m[L];return 0}function Ie(r,a,i,e,s){var g=new Uint8Array(32);le(g,e,s,Se);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return $e(r,a,i,m,g)}function ot(r,a,i,e,s,g,m){var k=new Uint8Array(32);le(k,g,m,Se);for(var L=new Uint8Array(8),D=0;D<8;D++)L[D]=g[D+16];return ke(r,a,i,e,s,L,k)}var it=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,m,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};it.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,m,k,L,D,N,ye,P,V,Z,ie,re,Q,ee,J,R,Y,I,U=this.h[0],W=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],K=this.h[9],ae=this.r[0],ce=this.r[1],se=this.r[2],f=this.r[3],fe=this.r[4],ge=this.r[5],be=this.r[6],de=this.r[7],ue=this.r[8],xe=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,U+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,W+=(s>>>13|g<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,z+=(g>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,D=r[a+10]&255|(r[a+11]&255)<<8,S+=(L>>>14|D<<2)&8191,N=r[a+12]&255|(r[a+13]&255)<<8,C+=(D>>>11|N<<5)&8191,ye=r[a+14]&255|(r[a+15]&255)<<8,M+=(N>>>8|ye<<8)&8191,K+=ye>>>5|e,P=0,V=P,V+=U*ae,V+=W*(5*xe),V+=z*(5*ue),V+=w*(5*de),V+=v*(5*be),P=V>>>13,V&=8191,V+=E*(5*ge),V+=S*(5*fe),V+=C*(5*f),V+=M*(5*se),V+=K*(5*ce),P+=V>>>13,V&=8191,Z=P,Z+=U*ce,Z+=W*ae,Z+=z*(5*xe),Z+=w*(5*ue),Z+=v*(5*de),P=Z>>>13,Z&=8191,Z+=E*(5*be),Z+=S*(5*ge),Z+=C*(5*fe),Z+=M*(5*f),Z+=K*(5*se),P+=Z>>>13,Z&=8191,ie=P,ie+=U*se,ie+=W*ce,ie+=z*ae,ie+=w*(5*xe),ie+=v*(5*ue),P=ie>>>13,ie&=8191,ie+=E*(5*de),ie+=S*(5*be),ie+=C*(5*ge),ie+=M*(5*fe),ie+=K*(5*f),P+=ie>>>13,ie&=8191,re=P,re+=U*f,re+=W*se,re+=z*ce,re+=w*ae,re+=v*(5*xe),P=re>>>13,re&=8191,re+=E*(5*ue),re+=S*(5*de),re+=C*(5*be),re+=M*(5*ge),re+=K*(5*fe),P+=re>>>13,re&=8191,Q=P,Q+=U*fe,Q+=W*f,Q+=z*se,Q+=w*ce,Q+=v*ae,P=Q>>>13,Q&=8191,Q+=E*(5*xe),Q+=S*(5*ue),Q+=C*(5*de),Q+=M*(5*be),Q+=K*(5*ge),P+=Q>>>13,Q&=8191,ee=P,ee+=U*ge,ee+=W*fe,ee+=z*f,ee+=w*se,ee+=v*ce,P=ee>>>13,ee&=8191,ee+=E*ae,ee+=S*(5*xe),ee+=C*(5*ue),ee+=M*(5*de),ee+=K*(5*be),P+=ee>>>13,ee&=8191,J=P,J+=U*be,J+=W*ge,J+=z*fe,J+=w*f,J+=v*se,P=J>>>13,J&=8191,J+=E*ce,J+=S*ae,J+=C*(5*xe),J+=M*(5*ue),J+=K*(5*de),P+=J>>>13,J&=8191,R=P,R+=U*de,R+=W*be,R+=z*ge,R+=w*fe,R+=v*f,P=R>>>13,R&=8191,R+=E*se,R+=S*ce,R+=C*ae,R+=M*(5*xe),R+=K*(5*ue),P+=R>>>13,R&=8191,Y=P,Y+=U*ue,Y+=W*de,Y+=z*be,Y+=w*ge,Y+=v*fe,P=Y>>>13,Y&=8191,Y+=E*f,Y+=S*se,Y+=C*ce,Y+=M*ae,Y+=K*(5*xe),P+=Y>>>13,Y&=8191,I=P,I+=U*xe,I+=W*ue,I+=z*de,I+=w*be,I+=v*ge,P=I>>>13,I&=8191,I+=E*fe,I+=S*f,I+=C*se,I+=M*ce,I+=K*ae,P+=I>>>13,I&=8191,P=(P<<2)+P|0,P=P+V|0,V=P&8191,P=P>>>13,Z+=P,U=V,W=Z,z=ie,w=re,v=Q,E=ee,S=J,C=R,M=Y,K=I,a+=16,i-=16;this.h[0]=U,this.h[1]=W,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=K},it.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,m=1;m<8;m++)g=(this.h[m]+this.pad[m]|0)+(g>>>16)|0,this.h[m]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},it.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function At(r,a,i,e,s,g){var m=new it(g);return m.update(i,e,s),m.finish(r,a),0}function at(r,a,i,e,s,g){var m=new Uint8Array(16);return At(m,0,i,e,s,g),T(r,a,m,0)}function Pe(r,a,i,e,s){var g;if(i<32)return-1;for(ot(r,0,a,0,i,e,s),At(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function xt(r,a,i,e,s){var g,m=new Uint8Array(32);if(i<32||(Ie(m,0,32,e,s),at(a,16,a,32,i-32,m)!==0))return-1;for(ot(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function Ue(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function yt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function qe(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function Qe(r,a){var i,e,s,g=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(yt(m),yt(m),yt(m),e=0;e<2;e++){for(g[0]=m[0]-65517,i=1;i<15;i++)g[i]=m[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=m[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,qe(m,g,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function Bt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Qe(i,r),Qe(e,a),B(i,0,e,0)}function gt(r){var a=new Uint8Array(32);return Qe(a,r),a[0]&1}function He(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Oe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function je(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function pe(r,a,i){var e,s,g=0,m=0,k=0,L=0,D=0,N=0,ye=0,P=0,V=0,Z=0,ie=0,re=0,Q=0,ee=0,J=0,R=0,Y=0,I=0,U=0,W=0,z=0,w=0,v=0,E=0,S=0,C=0,M=0,K=0,ae=0,ce=0,se=0,f=i[0],fe=i[1],ge=i[2],be=i[3],de=i[4],ue=i[5],xe=i[6],Ce=i[7],he=i[8],we=i[9],ve=i[10],_e=i[11],Le=i[12],Be=i[13],ze=i[14],Ne=i[15];e=a[0],g+=e*f,m+=e*fe,k+=e*ge,L+=e*be,D+=e*de,N+=e*ue,ye+=e*xe,P+=e*Ce,V+=e*he,Z+=e*we,ie+=e*ve,re+=e*_e,Q+=e*Le,ee+=e*Be,J+=e*ze,R+=e*Ne,e=a[1],m+=e*f,k+=e*fe,L+=e*ge,D+=e*be,N+=e*de,ye+=e*ue,P+=e*xe,V+=e*Ce,Z+=e*he,ie+=e*we,re+=e*ve,Q+=e*_e,ee+=e*Le,J+=e*Be,R+=e*ze,Y+=e*Ne,e=a[2],k+=e*f,L+=e*fe,D+=e*ge,N+=e*be,ye+=e*de,P+=e*ue,V+=e*xe,Z+=e*Ce,ie+=e*he,re+=e*we,Q+=e*ve,ee+=e*_e,J+=e*Le,R+=e*Be,Y+=e*ze,I+=e*Ne,e=a[3],L+=e*f,D+=e*fe,N+=e*ge,ye+=e*be,P+=e*de,V+=e*ue,Z+=e*xe,ie+=e*Ce,re+=e*he,Q+=e*we,ee+=e*ve,J+=e*_e,R+=e*Le,Y+=e*Be,I+=e*ze,U+=e*Ne,e=a[4],D+=e*f,N+=e*fe,ye+=e*ge,P+=e*be,V+=e*de,Z+=e*ue,ie+=e*xe,re+=e*Ce,Q+=e*he,ee+=e*we,J+=e*ve,R+=e*_e,Y+=e*Le,I+=e*Be,U+=e*ze,W+=e*Ne,e=a[5],N+=e*f,ye+=e*fe,P+=e*ge,V+=e*be,Z+=e*de,ie+=e*ue,re+=e*xe,Q+=e*Ce,ee+=e*he,J+=e*we,R+=e*ve,Y+=e*_e,I+=e*Le,U+=e*Be,W+=e*ze,z+=e*Ne,e=a[6],ye+=e*f,P+=e*fe,V+=e*ge,Z+=e*be,ie+=e*de,re+=e*ue,Q+=e*xe,ee+=e*Ce,J+=e*he,R+=e*we,Y+=e*ve,I+=e*_e,U+=e*Le,W+=e*Be,z+=e*ze,w+=e*Ne,e=a[7],P+=e*f,V+=e*fe,Z+=e*ge,ie+=e*be,re+=e*de,Q+=e*ue,ee+=e*xe,J+=e*Ce,R+=e*he,Y+=e*we,I+=e*ve,U+=e*_e,W+=e*Le,z+=e*Be,w+=e*ze,v+=e*Ne,e=a[8],V+=e*f,Z+=e*fe,ie+=e*ge,re+=e*be,Q+=e*de,ee+=e*ue,J+=e*xe,R+=e*Ce,Y+=e*he,I+=e*we,U+=e*ve,W+=e*_e,z+=e*Le,w+=e*Be,v+=e*ze,E+=e*Ne,e=a[9],Z+=e*f,ie+=e*fe,re+=e*ge,Q+=e*be,ee+=e*de,J+=e*ue,R+=e*xe,Y+=e*Ce,I+=e*he,U+=e*we,W+=e*ve,z+=e*_e,w+=e*Le,v+=e*Be,E+=e*ze,S+=e*Ne,e=a[10],ie+=e*f,re+=e*fe,Q+=e*ge,ee+=e*be,J+=e*de,R+=e*ue,Y+=e*xe,I+=e*Ce,U+=e*he,W+=e*we,z+=e*ve,w+=e*_e,v+=e*Le,E+=e*Be,S+=e*ze,C+=e*Ne,e=a[11],re+=e*f,Q+=e*fe,ee+=e*ge,J+=e*be,R+=e*de,Y+=e*ue,I+=e*xe,U+=e*Ce,W+=e*he,z+=e*we,w+=e*ve,v+=e*_e,E+=e*Le,S+=e*Be,C+=e*ze,M+=e*Ne,e=a[12],Q+=e*f,ee+=e*fe,J+=e*ge,R+=e*be,Y+=e*de,I+=e*ue,U+=e*xe,W+=e*Ce,z+=e*he,w+=e*we,v+=e*ve,E+=e*_e,S+=e*Le,C+=e*Be,M+=e*ze,K+=e*Ne,e=a[13],ee+=e*f,J+=e*fe,R+=e*ge,Y+=e*be,I+=e*de,U+=e*ue,W+=e*xe,z+=e*Ce,w+=e*he,v+=e*we,E+=e*ve,S+=e*_e,C+=e*Le,M+=e*Be,K+=e*ze,ae+=e*Ne,e=a[14],J+=e*f,R+=e*fe,Y+=e*ge,I+=e*be,U+=e*de,W+=e*ue,z+=e*xe,w+=e*Ce,v+=e*he,E+=e*we,S+=e*ve,C+=e*_e,M+=e*Le,K+=e*Be,ae+=e*ze,ce+=e*Ne,e=a[15],R+=e*f,Y+=e*fe,I+=e*ge,U+=e*be,W+=e*de,z+=e*ue,w+=e*xe,v+=e*Ce,E+=e*he,S+=e*we,C+=e*ve,M+=e*_e,K+=e*Le,ae+=e*Be,ce+=e*ze,se+=e*Ne,g+=38*Y,m+=38*I,k+=38*U,L+=38*W,D+=38*z,N+=38*w,ye+=38*v,P+=38*E,V+=38*S,Z+=38*C,ie+=38*M,re+=38*K,Q+=38*ae,ee+=38*ce,J+=38*se,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=D+s+65535,s=Math.floor(e/65536),D=e-s*65536,e=N+s+65535,s=Math.floor(e/65536),N=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=ie+s+65535,s=Math.floor(e/65536),ie=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=R+s+65535,s=Math.floor(e/65536),R=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=D+s+65535,s=Math.floor(e/65536),D=e-s*65536,e=N+s+65535,s=Math.floor(e/65536),N=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=ie+s+65535,s=Math.floor(e/65536),ie=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=R+s+65535,s=Math.floor(e/65536),R=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=m,r[2]=k,r[3]=L,r[4]=D,r[5]=N,r[6]=ye,r[7]=P,r[8]=V,r[9]=Z,r[10]=ie,r[11]=re,r[12]=Q,r[13]=ee,r[14]=J,r[15]=R}function G(r,a){pe(r,a,a)}function q(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)G(i,i),e!==2&&e!==4&&pe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function H(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)G(i,i),e!==1&&pe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function F(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,m,k=o(),L=o(),D=o(),N=o(),ye=o(),P=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,He(s,i),m=0;m<16;m++)L[m]=s[m],N[m]=k[m]=D[m]=0;for(k[0]=N[0]=1,m=254;m>=0;--m)g=e[m>>>3]>>>(m&7)&1,qe(k,L,g),qe(D,N,g),Oe(ye,k,D),je(k,k,D),Oe(D,L,N),je(L,L,N),G(N,ye),G(P,k),pe(k,D,k),pe(D,L,ye),Oe(ye,k,D),je(k,k,D),G(L,k),je(D,N,P),pe(k,D,b),Oe(k,k,N),pe(D,D,k),pe(k,N,P),pe(N,L,s),G(L,ye),qe(k,L,g),qe(D,N,g);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=D[m],s[m+48]=L[m],s[m+64]=N[m];var V=s.subarray(32),Z=s.subarray(16);return q(V,V),pe(Z,Z,V),Qe(r,Z),0}function ne(r,a){return F(r,a,d)}function me(r,a){return l(a,32),ne(r,a)}function Ee(r,a,i){var e=new Uint8Array(32);return F(e,i,a),le(r,c,e,Se)}var Me=Pe,bt=xt;function mn(r,a,i,e,s,g){var m=new Uint8Array(32);return Ee(m,s,g),Me(r,a,i,e,m)}function Ye(r,a,i,e,s,g){var m=new Uint8Array(32);return Ee(m,s,g),bt(r,a,i,e,m)}var Je=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function rr(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),m,k,L,D,N,ye,P,V,Z,ie,re,Q,ee,J,R,Y,I,U,W,z,w,v,E,S,C,M,K=r[0],ae=r[1],ce=r[2],se=r[3],f=r[4],fe=r[5],ge=r[6],be=r[7],de=a[0],ue=a[1],xe=a[2],Ce=a[3],he=a[4],we=a[5],ve=a[6],_e=a[7],Le=0;e>=128;){for(W=0;W<16;W++)z=8*W+Le,s[W]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],g[W]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(W=0;W<80;W++)if(m=K,k=ae,L=ce,D=se,N=f,ye=fe,P=ge,V=be,Z=de,ie=ue,re=xe,Q=Ce,ee=he,J=we,R=ve,Y=_e,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(f>>>14|he<<18)^(f>>>18|he<<14)^(he>>>9|f<<23),v=(he>>>14|f<<18)^(he>>>18|f<<14)^(f>>>9|he<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=f&fe^~f&ge,v=he&we^~he&ve,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=Je[W*2],v=Je[W*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[W%16],v=g[W%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,I=C&65535|M<<16,U=E&65535|S<<16,w=I,v=U,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(K>>>28|de<<4)^(de>>>2|K<<30)^(de>>>7|K<<25),v=(de>>>28|K<<4)^(K>>>2|de<<30)^(K>>>7|de<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=K&ae^K&ce^ae&ce,v=de&ue^de&xe^ue&xe,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,V=C&65535|M<<16,Y=E&65535|S<<16,w=D,v=Q,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=I,v=U,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,D=C&65535|M<<16,Q=E&65535|S<<16,ae=m,ce=k,se=L,f=D,fe=N,ge=ye,be=P,K=V,ue=Z,xe=ie,Ce=re,he=Q,we=ee,ve=J,_e=R,de=Y,W%16===15)for(z=0;z<16;z++)w=s[z],v=g[z],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(z+9)%16],v=g[(z+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(z+1)%16],U=g[(z+1)%16],w=(I>>>1|U<<31)^(I>>>8|U<<24)^I>>>7,v=(U>>>1|I<<31)^(U>>>8|I<<24)^(U>>>7|I<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(z+14)%16],U=g[(z+14)%16],w=(I>>>19|U<<13)^(U>>>29|I<<3)^I>>>6,v=(U>>>19|I<<13)^(I>>>29|U<<3)^(U>>>6|I<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[z]=C&65535|M<<16,g[z]=E&65535|S<<16;w=K,v=de,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[0]=K=C&65535|M<<16,a[0]=de=E&65535|S<<16,w=ae,v=ue,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[1]=ae=C&65535|M<<16,a[1]=ue=E&65535|S<<16,w=ce,v=xe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[2]=ce=C&65535|M<<16,a[2]=xe=E&65535|S<<16,w=se,v=Ce,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[3]=se=C&65535|M<<16,a[3]=Ce=E&65535|S<<16,w=f,v=he,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[4]=f=C&65535|M<<16,a[4]=he=E&65535|S<<16,w=fe,v=we,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[5]=fe=C&65535|M<<16,a[5]=we=E&65535|S<<16,w=ge,v=ve,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[6]=ge=C&65535|M<<16,a[6]=ve=E&65535|S<<16,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[7]=be=C&65535|M<<16,a[7]=_e=E&65535|S<<16,Le+=128,e-=128}return e}function st(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,rr(e,s,a,i),i%=128,m=0;m<i;m++)g[m]=a[k-i+m];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,j(g,i-8,k/536870912|0,k<<3),rr(e,s,g,i),m=0;m<8;m++)j(r,8*m,e[m],s[m]);return 0}function Ht(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o(),D=o(),N=o();je(i,r[1],r[0]),je(N,a[1],a[0]),pe(i,i,N),Oe(e,r[0],r[1]),Oe(N,a[0],a[1]),pe(e,e,N),pe(s,r[3],a[3]),pe(s,s,h),pe(g,r[2],a[2]),Oe(g,g,g),je(m,e,i),je(k,g,s),Oe(L,g,s),Oe(D,e,i),pe(r[0],m,k),pe(r[1],D,L),pe(r[2],L,k),pe(r[3],m,D)}function or(r,a,i){var e;for(e=0;e<4;e++)qe(r[e],a[e],i)}function wn(r,a){var i=o(),e=o(),s=o();q(s,a[2]),pe(i,a[0],s),pe(e,a[1],s),Qe(r,e),r[31]^=gt(i)<<7}function vn(r,a,i){var e,s;for(Ue(r[0],u),Ue(r[1],p),Ue(r[2],p),Ue(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,or(r,a,e),Ht(a,r),Ht(r,r),or(r,a,e)}function Kt(r,a){var i=[o(),o(),o(),o()];Ue(i[0],y),Ue(i[1],_),Ue(i[2],p),pe(i[3],y,_),vn(r,i,a)}function _n(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),st(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Kt(s,e),wn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Sn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function kn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;Sn(r,a)}function ir(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),m=new Uint8Array(64),k,L,D=new Float64Array(64),N=[o(),o(),o(),o()];st(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ye=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(st(m,r.subarray(32),i+32),kn(m),Kt(N,m),wn(r,N),k=32;k<64;k++)r[k]=e[k];for(st(g,r,i+64),kn(g),k=0;k<64;k++)D[k]=0;for(k=0;k<32;k++)D[k]=m[k];for(k=0;k<32;k++)for(L=0;L<32;L++)D[k+L]+=g[k]*s[L];return Sn(r.subarray(32),D),ye}function so(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o();return Ue(r[2],p),He(r[1],a),G(s,r[1]),pe(g,s,x),je(s,s,r[2]),Oe(g,r[2],g),G(m,g),G(k,m),pe(L,k,m),pe(i,L,s),pe(i,i,g),H(i,i),pe(i,i,s),pe(i,i,g),pe(i,i,g),pe(r[0],i,g),G(e,r[0]),pe(e,e,g),Bt(e,s)&&pe(r[0],r[0],$),G(e,r[0]),pe(e,e,g),Bt(e,s)?-1:(gt(r[0])===a[31]>>7&&je(r[0],u,r[0]),pe(r[3],r[0],r[1]),0)}function Cn(r,a,i,e){var s,g=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||so(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(st(m,r,i),kn(m),vn(k,L,m),Kt(L,a.subarray(32)),Ht(k,L),wn(g,k),i-=64,B(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var En=32,Vt=24,zt=32,ht=16,Nt=32,Zt=32,It=32,Tt=32,Mn=32,ar=Vt,lo=zt,co=ht,Ke=64,lt=32,mt=64,Ln=32,An=64;n.lowlevel={crypto_core_hsalsa20:le,crypto_stream_xor:ot,crypto_stream:Ie,crypto_stream_salsa20_xor:ke,crypto_stream_salsa20:$e,crypto_onetimeauth:At,crypto_onetimeauth_verify:at,crypto_verify_16:T,crypto_verify_32:B,crypto_secretbox:Pe,crypto_secretbox_open:xt,crypto_scalarmult:F,crypto_scalarmult_base:ne,crypto_box_beforenm:Ee,crypto_box_afternm:Me,crypto_box:mn,crypto_box_open:Ye,crypto_box_keypair:me,crypto_hash:st,crypto_sign:ir,crypto_sign_keypair:_n,crypto_sign_open:Cn,crypto_secretbox_KEYBYTES:En,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:ht,crypto_scalarmult_BYTES:Nt,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:It,crypto_box_SECRETKEYBYTES:Tt,crypto_box_BEFORENMBYTES:Mn,crypto_box_NONCEBYTES:ar,crypto_box_ZEROBYTES:lo,crypto_box_BOXZEROBYTES:co,crypto_sign_BYTES:Ke,crypto_sign_PUBLICKEYBYTES:lt,crypto_sign_SECRETKEYBYTES:mt,crypto_sign_SEEDBYTES:Ln,crypto_hash_BYTES:An,gf:o,D:x,L:Xt,pack25519:Qe,unpack25519:He,M:pe,A:Oe,S:G,Z:je,pow2523:H,add:Ht,set25519:Ue,modL:Sn,scalarmult:vn,scalarbase:Kt};function sr(r,a){if(r.length!==En)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function fo(r,a){if(r.length!==It)throw new Error("bad public key size");if(a.length!==Tt)throw new Error("bad secret key size")}function Re(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function lr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Re(r,a,i),sr(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+zt]=r[g];return Pe(s,e,e.length,a,i),s.subarray(ht)},n.secretbox.open=function(r,a,i){Re(r,a,i),sr(i,a);for(var e=new Uint8Array(ht+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+ht]=r[g];return e.length<32||xt(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=En,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=ht,n.scalarMult=function(r,a){if(Re(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==Nt)throw new Error("bad p size");var i=new Uint8Array(Nt);return F(i,r,a),i},n.scalarMult.base=function(r){if(Re(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(Nt);return ne(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=Nt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Re(r,a),fo(r,a);var i=new Uint8Array(Mn);return Ee(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(It),a=new Uint8Array(Tt);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Re(r),r.length!==Tt)throw new Error("bad secret key size");var a=new Uint8Array(It);return ne(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=It,n.box.secretKeyLength=Tt,n.box.sharedKeyLength=Mn,n.box.nonceLength=ar,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Re(r,a),a.length!==mt)throw new Error("bad secret key size");var i=new Uint8Array(Ke+r.length);return ir(i,r,r.length,a),i},n.sign.open=function(r,a){if(Re(r,a),a.length!==lt)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=Cn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ke),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Re(r,a,i),a.length!==Ke)throw new Error("bad signature size");if(i.length!==lt)throw new Error("bad public key size");var e=new Uint8Array(Ke+r.length),s=new Uint8Array(Ke+r.length),g;for(g=0;g<Ke;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+Ke]=r[g];return Cn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(lt),a=new Uint8Array(mt);return _n(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Re(r),r.length!==mt)throw new Error("bad secret key size");for(var a=new Uint8Array(lt),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Re(r),r.length!==Ln)throw new Error("bad seed size");for(var a=new Uint8Array(lt),i=new Uint8Array(mt),e=0;e<32;e++)i[e]=r[e];return _n(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=lt,n.sign.secretKeyLength=mt,n.sign.seedLength=Ln,n.sign.signatureLength=Ke,n.hash=function(r){Re(r);var a=new Uint8Array(An);return st(a,r,r.length),a},n.hash.hashLength=An,n.verify=function(r,a){return Re(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];lr(g)})}else typeof Qi<"u"&&(r=ta,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];lr(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Pn)),Pn.exports}var ra=na();const oa=Vi(ra);function ia(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const h=t.charAt(x),y=h.charCodeAt(0);if(n[y]!==255)throw new TypeError(h+" is ambiguous");n[y]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),d=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let h=0,y=0,_=0;const $=x.length;for(;_!==$&&x[_]===0;)_++,h++;const j=($-_)*d+1>>>0,A=new Uint8Array(j);for(;_!==$;){let O=x[_],oe=0;for(let te=j-1;(O!==0||oe<y)&&te!==-1;te--,oe++)O+=256*A[te]>>>0,A[te]=O%o>>>0,O=O/o>>>0;if(O!==0)throw new Error("Non-zero carry");y=oe,_++}let T=j-y;for(;T!==j&&A[T]===0;)T++;let B=l.repeat(h);for(;T<j;++T)B+=t.charAt(A[T]);return B}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let h=0,y=0,_=0;for(;x[h]===l;)y++,h++;const $=(x.length-h)*c+1>>>0,j=new Uint8Array($);for(;h<x.length;){const O=x.charCodeAt(h);if(O>255)return;let oe=n[O];if(oe===255)return;let te=0;for(let le=$-1;(oe!==0||te<_)&&le!==-1;le--,te++)oe+=o*j[le]>>>0,j[le]=oe%256>>>0,oe=oe/256>>>0;if(oe!==0)throw new Error("Non-zero carry");_=te,h++}let A=$-_;for(;A!==$&&j[A]===0;)A++;const T=new Uint8Array(y+($-A));let B=y;for(;A!==$;)T[B++]=j[A++];return T}function b(x){const h=p(x);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:b}}var aa="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const hr=ia(aa),tr="cbsgo_wallet_v3",bn="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(tr);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function sa(t){localStorage.setItem(tr,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function la(){const t=oa.sign.keyPair(),n=hr.encode(t.publicKey),o=hr.encode(t.secretKey);return{pk:n,sk:o}}function Kr(){return!!qt()}function ca(){return qt()?sessionStorage.getItem(bn)==="1":!1}function da(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=la();return sa({pk:l,sk:c,pin:n}),sessionStorage.setItem(bn,"1"),l}function fa(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(bn,"1"),n.pk}function De(){const t=qt();return t?t.pk:""}function pa(){localStorage.removeItem(tr),sessionStorage.removeItem(bn)}typeof window<"u"&&(window.cbsgoDevResetWallet=pa);const Xr="cbsgoLoginModal";function Vr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Zr(){const t=document.getElementById(Xr);t&&t.remove()}function ua(t){Zr();const n=document.createElement("div");return n.id=Xr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function xa(t,n){return`
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
      ">${Vr(t)}</div>

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
  `}function mr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ya(){const t=!Kr();let n="";try{const h=ut();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Vr(n)}" style="${Qt()}" placeholder="Kevin" />
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
        <button id="cbsgoCreateBtn" type="button" style="${mr(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${mr(!0)}">Unlock</button>
      </div>
    `,l=ua(xa(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),d=h=>{c&&(c.textContent=h||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),b=l.querySelector("#cbsgoNick"),x=()=>{Zr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const y=String(b?.value||"").trim(),_=String(u?.value||"").trim(),$=String(p?.value||"").trim();if(y.length<2)return d("⛔ Nickname too short.");if(_.length<4)return d("⛔ PIN must be at least 4 digits.");if(_!==$)return d("⛔ PINs do not match.");d("Creating wallet…"),Gr(y),await da(_),d("✅ Wallet created. Starting…"),x()}catch(y){d(`⛔ ${String(y?.message||y)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return d("⛔ PIN must be at least 4 digits.");d("Unlocking…"),await fa(y),d("✅ Unlocked."),x()}catch{d("⛔ Wrong PIN (or wallet data missing).")}})}}const ga="https://cxfedvowjgkqrakkkjpi.supabase.co",ba="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Fe=po(ga,ba);function ha(){const t=De();if(!t)return null;const n=ut(),o=gn();return{wallet_pk:t,nickname:n,avatar:o}}async function an(t={}){try{const n=ha();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Fe.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ma=15e3,wa=1e4,va=300*1e3;let Pt=null,wr=0,vr=0;function _a(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",_a));async function Sa(){const t=De();if(!t||!Pt)return;const n=Date.now();if(n-wr<5e3)return;wr=n;const l=(ut()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:d,error:u}=await Fe.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(d&&d.length>0){const p=d[0].id,{error:b}=await Fe.from("player_state").update(c).eq("id",p);b&&console.warn("CBS GO: player_state update failed",b)}else{const{error:p}=await Fe.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(d){console.warn("CBS GO: pushMyState error",d)}}async function ka(){const t=De();if(!t)return;const n=Date.now();if(n-vr<3e3)return;vr=n;const o=new Date(Date.now()-va).toISOString();try{const{data:l,error:c}=await Fe.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const d=Array.isArray(l)?l:[],u=Array.from(new Set(d.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:h}=await Fe.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const b=d.map(x=>{const h=x.lat,y=x.lng,_=typeof h=="number"?h:parseFloat(h),$=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite($))return null;const j=p.get(x.wallet_pk)||null,A=j&&j.nickname||x.nickname||"Anon",T=j&&j.avatar?String(j.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:T,lat:_,lng:$,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:b}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function Ca(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{Sa()},ma),setInterval(()=>{ka()},wa))}Ca();function Qr(){const t=De();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function fn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Ea(t){const n=Qr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Fe.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw fn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function Ma(t){const n=Qr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await Fe.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw fn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Jr(){const t=De();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Fe.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw fn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],d=[];for(const p of l){const b=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!b&&!x)continue;const h=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:h,nickname:null,avatar:""};b&&c.push(y),x&&d.push(y)}const u=Array.from(new Set([...c,...d].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:b}=await Fe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!b&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const h=y=>{y.forEach(_=>{const $=x.get(_.otherWallet);$&&(_.nickname=$.nickname||null,_.avatar=$.avatar||"")})};h(c),h(d)}else b&&fn("loadFriendsOverview:players",b)}return{incoming:c,accepted:d}}let Rt=null;async function eo(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Rt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Rt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function La(){try{Rt&&(await Rt.release(),Rt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Aa(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await eo():await La()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}const Dn="cbsgo_trades";async function Ba(t,n){const o=De();if(!o)throw new Error("No local CBS-GO wallet available.");const l=ut(),c=gn(),d=Number(n?.tickets||0),u=Number(n?.cbs||0),p=n?.cardId||null,b=p?Number(n?.cardQty||0):0;if(!d&&!u&&!p)throw new Error("Nothing to send.");const x=Jt(),h=en();if(d>0&&d>x)throw new Error("Not enough tickets in your bag.");if(u>0&&u>h)throw new Error("Not enough CBS (play money) in your bag.");const{error:y}=await Fe.from(Dn).insert({from_wallet:o,to_wallet:t,tickets:d,cbs:u,card_id:p,card_qty:b,sender_nickname:l||null,sender_avatar:c||null,claimed:!1});if(y)throw console.warn("CBS GO: sendGiftToWallet failed",y),new Error(y.message||"Could not send gift.");try{const _=Jt(),$=en();console.log("CBS GO: deducting from bag",{tickets:d,cbs:u,beforeTickets:_,beforeCbs:$}),d>0&&Lt(-d),u>0&&xn(-u);const j=Jt(),A=en();console.log("CBS GO: bag after deduct",{afterTickets:j,afterCbs:A}),typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}catch(_){console.warn("CBS GO: failed to update local bag after trade",_)}}let On=!1;async function Yn(){const t=De();if(t&&!On){On=!0;try{const{data:n,error:o}=await Fe.from(Dn).select("*").eq("to_wallet",t).eq("claimed",!1).order("created_at",{ascending:!0}).limit(50);if(o){console.warn("CBS GO: pullIncomingGifts failed",o);return}if(!n||!n.length)return;for(const l of n){const c=l.id,{data:d,error:u}=await Fe.from(Dn).update({claimed:!0}).eq("id",c).eq("claimed",!1).select("id");if(u){console.warn("CBS GO: failed to mark trade as claimed",u);continue}if(!d||!d.length)continue;const p=Number(l.tickets||0),b=Number(l.cbs||0),x=l.card_id||null,h=Number(l.card_qty||0);p&&Lt(p),b&&xn(b),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:{senderNickname:l.sender_nickname||"",senderAvatar:l.sender_avatar||"",toWallet:l.to_wallet,tickets:p,cbs:b,cardId:x,cardQty:h}}))}typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}finally{On=!1}}}function Ae(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function nr(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const to="cbsgo_name_locked_v1";function sn(){try{return localStorage.getItem(to)==="1"}catch{return!1}}function za(){try{localStorage.setItem(to,"1")}catch{}}const no="cbsgo_cards_v1";function Na(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Wt(){const t=localStorage.getItem(no),n=Na(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function ro(t){const n={counts:{...t||{}}};try{localStorage.setItem(no,JSON.stringify(n))}catch{}}function qn(){const t=Wt(),n=ft();n.cards={...t||{}},Xn(n)}const Ia=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function Ta(){const t=Wt();let n=0,o=0;const l=[];for(const c of Ia){const d=Number(t[c.id]||0);Number.isFinite(d)&&d>0&&(n+=1,o+=d,l.push({id:c.id,count:d,label:c.label}))}return{cardTypes:n,cardTotal:o,sendable:l}}function hn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Hn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function _r(t,n){return`
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
  `}function $a(){const t=ut(),n=gn(),o=De(),l=sn();return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Profile</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your nickname and avatar are stored locally and synced to CBS-GO so friends can find you later.${l?" Your nickname is locked to this wallet and can’t be changed during the game.":""}
      </p>

      <div style="
        display:flex;
        gap:14px;
        align-items:center;
        flex-wrap:wrap;
      ">
        ${nr(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">
            Nickname${l?" (locked)":""}
          </label>
          <input
            id="profileName"
            value="${Ae(t)}"
            maxlength="24"
            ${l?"disabled":""}
            style="
              width:100%;
              margin-top:4px;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            "
            placeholder="Your nickname"
          />

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
  `}function Pa(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=T=>{const B=document.querySelector("#profileMsg");B&&(B.textContent=T||"")},d=sn();t&&(d?(t.disabled=!0,c(t.value?`🔒 Nickname locked: ${t.value}`:"🔒 Nickname locked to your wallet.")):c(t.value?`✅ Profile loaded: ${t.value}`:""));const u=()=>{if(!t)return;if(sn()){t.disabled=!0,c(t.value?`🔒 Nickname locked: ${t.value}`:"🔒 Nickname locked to your wallet.");return}const T=Gr(t.value),B=De();let O=sn();B&&T&&!O&&(za(),O=!0),O?(t.disabled=!0,c(`🔒 Nickname locked: ${T}`)):c(`✅ Name saved: ${T}`);try{an()}catch(oe){console.warn("CBS GO: failed to sync profile after name change",oe)}};t&&!d&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(u,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),u()})),n&&n.addEventListener("change",()=>{const T=n.files&&n.files[0];if(!T)return;if(T.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const B=new FileReader;B.onload=()=>{si(String(B.result||"")),c("✅ Photo saved"),Mt();try{an()}catch(O){console.warn("CBS GO: failed to sync profile after avatar change",O)}},B.onerror=()=>c("⛔ Failed to read image."),B.readAsDataURL(T)}),o&&(o.onclick=()=>{li(),c("✅ Photo removed"),Mt();try{an()}catch(T){console.warn("CBS GO: failed to sync profile after avatar removal",T)}});const p=document.querySelector("#friendWalletInput"),b=document.querySelector("#friendSendBtn"),x=document.querySelector("#friendsMsg"),h=document.querySelector("#friendsIncomingList"),y=document.querySelector("#friendsAcceptedList"),_=T=>{x&&(x.textContent=T||"")},$=T=>{if(!T)return"";const B=String(T);return B.length<=12?B:`${B.slice(0,5)}…${B.slice(-4)}`},j=(T,B="")=>{const O=T.nickname&&T.nickname.trim()?T.nickname.trim():$(T.otherWallet),oe=$(T.otherWallet);return`
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
          ${nr(T.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Ae(O||"Friend")}
            </div>
            ${oe?`<div style="font-size:11px;opacity:.7;">${Ae(oe)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${B||""}
        </div>
      </div>
    `};async function A(){if(!(!h||!y))try{h.textContent="Loading…",y.textContent="Loading…";const T=await Jr();T.incoming.length?h.innerHTML=T.incoming.map(B=>{const O=`
              <div style="display:flex;gap:6px;align-items:center;">
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${B.otherWallet}"
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
              </div>
            `;return j(B,O)}).join(""):h.textContent="No incoming requests.",T.accepted.length?y.innerHTML=T.accepted.map(B=>{const O=`
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
                  data-wallet="${B.otherWallet}"
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
            `;return j(B,O)}).join(""):y.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(B=>{B.addEventListener("click",async()=>{const O=B.getAttribute("data-friend-id");if(O){_("Accepting friend…"),B.disabled=!0;try{await Ma(O),_("✅ Friend added."),await A()}catch(oe){console.warn(oe),_(`⛔ ${oe.message||oe}`),B.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(B=>{B.addEventListener("click",async()=>{const O=B.getAttribute("data-wallet")||"";if(O)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(O),_("✅ Friend wallet copied.")):_("📋 Copy not supported in this browser.")}catch(oe){console.warn("CBS GO: copy friend wallet failed",oe),_("⛔ Could not copy wallet address.")}})})}catch(T){console.warn("CBS GO: refreshFriends failed",T),h.textContent="Could not load friends.",y.textContent=""}}b&&p&&b.addEventListener("click",async()=>{const T=p.value.trim();if(!T){_("Enter a wallet address first.");return}_("Sending friend request…"),b.disabled=!0;try{await Ea(T),_("✅ Friend request sent."),p.value="",await A()}catch(B){console.warn(B),_(`⛔ ${B.message||B}`)}finally{b.disabled=!1}}),A().catch(()=>{})}function Oa(){const t=Jt(),n=en(),o=De(),{cardTypes:l,cardTotal:c,sendable:d}=Ta(),u=c>0?`You own ${c} cards (${l} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",b=d.length>0?`
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
            ${d.map(x=>`<option value="${Ae(x.id)}">${Ae(x.label||x.id)} (x${x.count})</option>`).join("")}
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
  `}function ja(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Xi()}catch(A){console.warn("CBS GO: openCardsPanel failed",A)}});try{qn()}catch(A){console.warn("CBS GO: failed to sync inventory cards from bag",A)}const l=De(),c=document.querySelector("#giftWalletInput"),d=document.querySelector("#giftFriendSelect"),u=document.querySelector("#giftTicketsInput"),p=document.querySelector("#giftCbsInput"),b=document.querySelector("#giftCardSelect"),x=document.querySelector("#giftCardQtyInput"),h=document.querySelector("#giftSendBtn"),y=document.querySelector("#giftMsg"),_=A=>{y&&(y.textContent=A||"")};async function $(){if(d)try{const A=await Jr(),T=[];T.push('<option value="">-- No friend selected --</option>'),A.accepted&&A.accepted.length&&A.accepted.forEach(B=>{const O=B.otherWallet||"";if(!O)return;const oe=B.nickname&&B.nickname.trim()?B.nickname.trim():O,te=Ae(oe),le=O.length>12?`${O.slice(0,5)}…${O.slice(-4)}`:O,Se=`${te} (${Ae(le)})`;T.push(`<option value="${Ae(O)}">${Se}</option>`)}),d.innerHTML=T.join("")}catch(A){console.warn("CBS GO: populateFriendSelect failed",A),d.innerHTML='<option value="">-- Friends not available --</option>'}}if($().catch(()=>{}),h&&(c||d)&&h.addEventListener("click",async()=>{let A=c&&c.value?c.value.trim():"";if((!A||!A.length)&&d){const ke=d.value.trim();ke&&(A=ke)}const T=u?.value??"",B=p?.value??"",O=b?b.value.trim():"",oe=x?.value??"",te=Number(oe||"0"),le=Number(T||"0"),Se=Number(B||"0");if(!A){_("Enter a wallet address first, or pick a friend.");return}if((!le||le<=0)&&(!Se||Se<=0)&&!O){_("Set tickets and/or CBS above 0, or choose a card.");return}if(O&&(!te||te<=0)){_("Set card quantity above 0.");return}if(O&&te>0){const ke=Wt(),$e=Number(ke[O]||0);if(!Number.isFinite($e)||$e<te){_("Not enough of that card in your collection.");return}}h.disabled=!0,_("Sending gift…");try{if(await Ba(A,{tickets:le,cbs:Se,cardId:O||null,cardQty:O?te:0}),O&&te>0){const ke=Wt(),Ie=Number(ke[O]||0)-te;Ie>0?ke[O]=Ie:delete ke[O],ro(ke),qn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...ke}}}))}_("✅ Gift sent."),u&&(u.value=""),p&&(p.value=""),x&&(x.value=""),b&&(b.value=""),d&&(d.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:A,tickets:le,cbs:Se,cardId:O||null,cardQty:O?te:0}}))}catch(ke){console.warn(ke),_(`⛔ ${ke.message||"Could not send gift."}`)}finally{h.disabled=!1}}),!t||!l){Yn().catch(()=>{});return}const j=A=>{n&&(n.textContent=A||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),j("✅ Wallet address copied to clipboard.")):j("📋 Copy not supported in this browser.")}catch{j("⛔ Failed to copy address.")}},Yn().catch(()=>{})}function oo(){const t=hn();return t==="profile"?_r("Profile",`<div id="profileMount">${$a()}</div>`):t==="bag"?_r("Bag",`<div id="bagMount">${Oa()}</div>`):""}function Ra(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ri()}
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
          ${jr()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Rr()}
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
        ${oo()}
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

      ${Fr()?`<button id="resetBtn" type="button" style="
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
  `}function Mt(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=oo();const n=hn();n==="profile"&&Pa(),n==="bag"&&ja();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Hn("map"),Mt()})}function Fa(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=hn();Hn(o===n?"map":n||"map"),Mt()})})}function Sr(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:c,toWallet:d,tickets:u=0,cbs:p=0,cardId:b=null,cardQty:x=0}=t||{};if(!u&&!p&&!(b&&x))return;n.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.78)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=ut(),$=o==="sent"?"Gift sent":"You received a gift",j=[];u&&j.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&j.push(`🪙 ${p} CBS`),b&&x&&j.push(`🃏 ${x} card${x===1?"":"s"}`);const A=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${Ae(_)}</b> to <span style="opacity:.9;">${Ae(d||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${Ae(l||"Friend")}</b>
        </div>
      `,T=o==="sent"?`
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
      ${T}
      <div>
        <div style="font-size:15px;font-weight:800;">${Ae($)}</div>
        ${A}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${Ae(j.join(" · "))}
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
  `,h.appendChild(y),n.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const B=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},O=document.getElementById("cbsgoTradePopupCloseBtn");O&&(O.onclick=B),h.addEventListener("click",oe=>{oe.target===h&&B()})}function kr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ra();try{eo(),Aa()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{an()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Fa(),Wi(),ii(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Rr())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=jr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{hn()==="bag"&&Mt()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let b=p.querySelector(".cbsgoToastBox");b||(b=document.createElement("div"),b.className="cbsgoToastBox",b.style.pointerEvents="auto",b.style.padding="8px 12px",b.style.borderRadius="999px",b.style.border="1px solid rgba(255,255,255,.25)",b.style.background="rgba(10,12,18,.88)",b.style.backdropFilter="blur(10px)",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.fontSize="11px",b.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",b.style.opacity="0",b.style.transform="translateY(10px)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(b)),b.textContent=u||"",b.style.opacity="1",b.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{b.style.opacity="0",b.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},b=Number(p.xp||0),x=Number(p.tickets||0),h=Number(p.cbs||0);if(!b&&!x&&!h)return;const y=[];b&&y.push(`+${b} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),h&&y.push(`+${h} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.steps||0),x=Number(u?.goal||0),h=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const $=x?`${b}/${x} steps`:`${b} steps`;_.innerHTML=`
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const j=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=j),y.addEventListener("click",T=>{T.target===y&&j()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const b=Number(u?.xp||0),x=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!b&&!x&&!h)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const $=[];b&&$.push(`+${b} XP`),x&&$.push(`+${x} ticket${x===1?"":"s"}`),h&&$.push(`+${h} CBS`),_.innerHTML=`
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function d(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.days||7),x=Number(u?.rewardCbs||0),h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.80)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(340px, 92vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(251,191,36,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",y.style.padding="20px 18px 16px 18px",y.style.textAlign="center",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",y.innerHTML=`
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
    `,h.appendChild(y),p.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},$=document.getElementById("cbsgoStreakCloseBtn");$&&($.onclick=_),h.addEventListener("click",j=>{j.target===h&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{d(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{Sr(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{},b=p.cardId||null,x=Number(p.cardQty||0);if(b&&x>0){const h=Wt(),_=Number(h[b]||0)+x;h[b]=_,ro(h),qn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...h}}}))}Sr({direction:"received",fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0})})),Mt(),Fr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ai)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Rn({id:"__daily__",name:"Daily Glow"});return}if(Br(p))return;const b=mo.find(x=>x.id===p);b&&Rn(b)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&yo(async()=>{const{completeNode:b}=await Promise.resolve().then(()=>_o);return{completeNode:b}},void 0).then(({completeNode:b})=>{b(p),io()})})),Yn().catch(()=>{})}function io(){if(!document.querySelector("#app"))return;if(Kr()&&ca()){kr();return}ya();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),kr()};window.addEventListener("cbsgo:loginDone",n)}function ao(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function pn(t){const n=ao();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";pn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{pn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function Cr(){try{if(!document.getElementById("app")){pn("❌ #app not found in index.html");return}io();const n=ao();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){pn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Cr,{once:!0}):Cr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
