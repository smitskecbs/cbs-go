import{createClient as Jr}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(c){if(c.ep)return;c.ep=!0;const d=o(c);fetch(c.href,d)}})();const Qr="modulepreload",eo=function(t){return"/cbs-go/"+t},Jn={},to=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let h=function(x){return Promise.all(x.map(v=>Promise.resolve(v).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=h(o.map(x=>{if(x=eo(x),x in Jn)return;Jn[x]=!0;const v=x.endsWith(".css"),b=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${b}`))return;const C=document.createElement("link");if(C.rel=v?"stylesheet":Qr,v||(C.as="script"),C.crossOrigin="",C.href=x,p&&C.setAttribute("nonce",p),document.head.appendChild(C),v)return new Promise((R,G)=>{C.addEventListener("load",R),C.addEventListener("error",()=>G(new Error(`Unable to preload CSS for ${x}`)))})}))}function d(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&d(p.reason);return n().catch(d)})},Bn="cbsgoLevelUpOverlay",Qn="cbsgoLevelUpStyles",kn="https://smitskecbs.github.io/cbs-go/";function no(){if(document.getElementById(Qn))return;const t=document.createElement("style");t.id=Qn,t.textContent=`
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
  `,document.head.appendChild(t)}function Cn(){const t=document.getElementById(Bn);t&&t.remove()}function ro(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const d=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${d}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function er(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oo(t){no(),Cn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=Bn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${er(String(o))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${er(String(o))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&ro(c);const d=()=>Cn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),h=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),v=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=d),p&&(p.onclick=d),h&&(h.onclick=()=>{const b=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${kn}`,C=`https://twitter.com/intent/tweet?text=${encodeURIComponent(b)}`;window.open(C,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(kn),v&&(v.textContent="✅ Link copied. Share it with your friends.")}catch{v&&(v.textContent="Could not copy link. You can share it manually: "+kn)}}),setTimeout(()=>{document.getElementById(Bn)&&Cn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{oo(t?.detail||{})}));const io=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],xr="cbsgo_state_v6";function ao(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function so(){return{xp:0,completed:{},updatedAt:Date.now()}}function jt(){const t=localStorage.getItem(xr);return ao(t,so())}function yr(t){t.updatedAt=Date.now(),localStorage.setItem(xr,JSON.stringify(t))}function jn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function ln(){return Number(jt().xp||0)}function Rt(){const t=ln();let n=1,o=t;for(;;){const l=jn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function gr(){const t=ln();let n=1,o=t;for(;;){const l=jn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function br(){return jn(Rt())}function Ft(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return jt();const o=Rt(),l=jt();l.xp=Number(l.xp||0)+n,yr(l);const c=Rt();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function hr(t){const n=String(t||"");if(!n)return!1;const o=jt();return!!(o.completed&&o.completed[n])}function mr(t){const n=String(t||"");if(!n)return;const o=jt();o.completed||(o.completed={}),o.completed[n]=Date.now(),yr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const lo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Ft,completeNode:mr,getLevel:Rt,getXp:ln,getXpIntoLevel:gr,getXpNeededThisLevel:br,isNodeCompleted:hr},Symbol.toStringTag,{value:"Module"})),wr="cbsgoPuzzleModal";function fo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function En(){const t=document.getElementById(wr);t&&t.remove()}function Nn(t){En();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],d=180,u=18,p=l.length,h=.01;let x=[],v=null,b=0,C=u,R=!1,G=!1,A=null;const F=t?.name||"CBS GO Puzzle",ae=document.createElement("div");ae.id=wr,ae.style.position="fixed",ae.style.inset="0",ae.style.zIndex="999999",ae.style.display="flex",ae.style.alignItems="center",ae.style.justifyContent="center",ae.style.padding="16px",ae.style.background="rgba(0,0,0,.70)",ae.style.backdropFilter="blur(12px)",ae.style.fontFamily="system-ui, sans-serif",ae.style.color="#fff",ae.innerHTML=`
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
          ${fo(F)}
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
  `,document.body.appendChild(ae);const ge=document.getElementById("cbsgoBoard"),he=document.getElementById("cbsgoScore"),ye=document.getElementById("cbsgoMoves"),fe=document.getElementById("cbsgoStatus"),Be=document.getElementById("cbsgoPuzzleClose"),nt=document.getElementById("cbsgoPuzzleOk"),Ue=document.getElementById("cbsgoConfettiLayer");function Ie(O){fe&&(fe.textContent=O||"")}function rt(){if(!Ue)return;Ue.style.display="block",Ue.innerHTML="";const O=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],W=40;for(let Y=0;Y<W;Y++){const $=document.createElement("div"),Q=6+Math.floor(Math.random()*6),me=Math.random()*100,ke=Math.random()*.6,Ce=1+Math.random()*.6,yt=Math.random()*360;$.style.position="absolute",$.style.top="-10%",$.style.left=`${me}%`,$.style.width=`${Q}px`,$.style.height=`${Q*2}px`,$.style.background=O[Y%O.length],$.style.opacity="0.9",$.style.borderRadius="2px",$.style.transform=`rotate(${yt}deg)`,$.style.animation=`cbsgoConfettiFall ${Ce}s ease-out ${ke}s forwards`,Ue.appendChild($)}}function ot(){return Math.floor(Math.random()*l.length)}function Mt(){x=[];for(let O=0;O<n;O++){const W=[];for(let Y=0;Y<o;Y++)Math.random()<h?W.push(p):W.push(ot());x.push(W)}}function it(O){return O===p}function Ne(){if(ge){ge.innerHTML="";for(let O=0;O<n;O++)for(let W=0;W<o;W++){const Y=x[O][W],$=document.createElement("div");$.dataset.row=String(O),$.dataset.col=String(W),$.style.borderRadius="12px",$.style.display="flex",$.style.alignItems="center",$.style.justifyContent="center",$.style.cursor=G?"default":"pointer",$.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",$.style.fontSize="20px",it(Y)?($.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",$.textContent="💥"):($.style.background=l[Y]||"#444",$.textContent=c[Y]||"⬛"),v&&v.row===O&&v.col===W&&($.style.outline="2px solid #fff",$.style.outlineOffset="2px"),$.addEventListener("click",()=>{Pe(O,W)}),$.addEventListener("touchstart",Q=>{if(G)return;const me=Q.touches[0];A={row:O,col:W,x:me.clientX,y:me.clientY}}),$.addEventListener("touchend",Q=>{if(!A||G)return;const me=Q.changedTouches[0],ke=me.clientX-A.x,Ce=me.clientY-A.y;if(Math.sqrt(ke*ke+Ce*Ce)<18){Pe(O,W),A=null;return}let Fe=A.row,Ve=A.col;Math.abs(ke)>Math.abs(Ce)?ke>0?Ve+=1:Ve-=1:Ce>0?Fe+=1:Fe-=1,Fe>=0&&Fe<n&&Ve>=0&&Ve<o&&Te(A.row,A.col,Fe,Ve),A=null,Q.preventDefault()}),ge.appendChild($)}}}function pt(O,W){if(!O||!W)return!1;const Y=Math.abs(O.row-W.row),$=Math.abs(O.col-W.col);return Y+$===1}function Oe(O,W){const Y=x[O.row][O.col];x[O.row][O.col]=x[W.row][W.col],x[W.row][W.col]=Y}function ut(){const O=new Set;for(let W=0;W<n;W++){let Y=x[W][0],$=0;for(let Q=1;Q<=o;Q++){const me=Q<o?x[W][Q]:null;if(me===Y)continue;const ke=Q-$;if(Y!=null&&ke>=3)for(let Ce=$;Ce<Q;Ce++)O.add(`${W},${Ce}`);Y=me,$=Q}}for(let W=0;W<o;W++){let Y=x[0][W],$=0;for(let Q=1;Q<=n;Q++){const me=Q<n?x[Q][W]:null;if(me===Y)continue;const ke=Q-$;if(Y!=null&&ke>=3)for(let Ce=$;Ce<Q;Ce++)O.add(`${Ce},${W}`);Y=me,$=Q}}return O}function Ge(O){if(!O||!O.size)return 0;const W=O.size;b+=W*4,he&&(he.textContent=String(b)),!G&&b>=d&&xt(!0);for(const Y of O){const[$,Q]=Y.split(","),me=Number($),ke=Number(Q);x[me][ke]=null}for(let Y=0;Y<o;Y++){let $=n-1;for(let Q=n-1;Q>=0;Q--)x[Q][Y]!=null&&(x[$][Y]=x[Q][Y],$--);for(let Q=$;Q>=0;Q--)Math.random()<h?x[Q][Y]=p:x[Q][Y]=ot()}return W}function Xe(O,W){const Y=new Set;for(let $=0;$<o;$++)Y.add(`${O},${$}`);for(let $=0;$<n;$++)Y.add(`${$},${W}`);Ge(Y),Ne(),G||setTimeout(()=>Lt(!1),120)}function Lt(O=!1){if(G)return;R=!0;const W=()=>{if(G){R=!0;return}const Y=ut();if(!Y.size){R=!1,Ne(),O&&!G&&(C<=0?We():Ie("Nice! Keep matching."));return}Ge(Y),Ne(),setTimeout(W,120)};W()}function xt(O){if(!G)if(G=!0,R=!0,O){Ie("Great job! Puzzle completed 🎉");try{t?.id&&mr(t.id),Ft(10)}catch{}rt(),setTimeout(()=>{En()},1600)}else Ie("Out of moves. Try again next time 🙂")}function We(){b>=d?xt(!0):C<=0&&xt(!1)}function Te(O,W,Y,$){if(R||G)return;if(C<=0){We();return}const Q={row:O,col:W},me={row:Y,col:$};if(!pt(Q,me))return;const ke=x[O][W],Ce=x[Y][$],yt=it(ke)||it(Ce);if(Oe(Q,me),v=null,C--,ye&&(ye.textContent=String(C)),yt){Ne();const Fe=it(x[O][W])?{row:O,col:W}:{row:Y,col:$};Xe(Fe.row,Fe.col),We();return}if(!ut().size){Oe(Q,me),Ne(),Ie("No match… try another swap."),We();return}Ie(""),Ne(),Lt(!0)}function Pe(O,W){if(R||G)return;if(C<=0){We();return}const Y={row:O,col:W};if(!v){v=Y,Ne();return}if(v.row===O&&v.col===W){v=null,Ne();return}if(!pt(v,Y)){v=Y,Ne();return}Te(v.row,v.col,Y.row,Y.col)}function le(){En()}Be&&(Be.onclick=le),nt&&(nt.onclick=()=>{le()}),Mt(),Ne(),Ie("Tap or swipe two neighboring tiles to swap them.")}const vr="cbsgo_inventory_v2";function co(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function po(){return{tickets:0,cbs:0,cards:{}}}function St(){const t=localStorage.getItem(vr),n=co(t,po());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function _r(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(vr,JSON.stringify(n))}function uo(){return Number(St().tickets||0)}function xo(){return Number(St().cbs||0)}function fn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return St();const o=St();let c=Number(o.tickets||0)+n;return c<0&&(c=0),o.tickets=c,_r(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function Sr(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return St();const o=St();let c=Number(o.cbs||0)+n;return c<0&&(c=0),o.cbs=c,_r(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const kr="cbsgo_steps_v6",yo="cbsgo_steps_v5",go="cbsgo_gps_autostart_v2",Cr="cbsgo_daily_puzzle_v1",bo=.75,kt=5e3,nn=7,Tn=100,ho=1e3,mo=.5,wo=2e3,vo=4.5,Mn=1500,Ln=200,_o=.25,So=.05,ko=.3;let Zt=null,Jt=!1,ht={msg:"init"};function Pn(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Er="cbsgo_cards_v1",Co=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Eo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Mo(t){return Co.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Lo(){try{const t=localStorage.getItem(Er),n=Pn(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const d=Number(c.count);Number.isFinite(d)&&d>0&&(o[l]=d)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Ao(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,d]of Object.entries(n)){const u=Number(d||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Er,JSON.stringify(l))}catch{}}function zo(t,n=1){const o=Eo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const d={...Lo().counts||{}},p=Number(d[o]||0)+l;d[o]=p,Ao({counts:d});const h=Mo(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:d}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:h}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:h}}))}catch{}return{cardId:o,count:p,card:h}}function et(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Bo(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,d=new Date(o,l-1,c);return Number.isNaN(d.getTime())?null:d}function No(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Mr(t,n){const o=Bo(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const d=new Date(o.getTime());d.setDate(d.getDate()-c),l.push(No(d))}return l}function rn(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:et(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function To(t){const n=et();return!t||typeof t!="object"?rn():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function cn(t){t.updatedAt=Date.now(),localStorage.setItem(kr,JSON.stringify(t))}function Po(t,n){if(!n)return;const o=Mr(n,nn);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(Sr(Tn),Dt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:nn,rewardCbs:Tn,lastDayKey:n}})))}function tr(t){t=To(t||rn());const n=et();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Po(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,cn(t)}return t}function ct(){let t=localStorage.getItem(kr);if(!t){const o=localStorage.getItem(yo);if(o){const l=Pn(o,rn()),c=tr(l);return cn(c),c}}const n=Pn(t,rn());return tr(n)}function Qt(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:$o()}}))}function Rn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Dt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Un(t,n,o,l){const c=Number(t||0),d=Number(n||0),u=0;if(!(!c&&!d&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:d,cbs:u,reason:l||"distance"}}))}catch{}}function $o(){const t=ct();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Io(){const t=ct(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Oo(){return Io()/1e3}function jo(){const t=ct(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,c=t.dayKey||et(),d=t.streak||{},p=Mr(c,nn).map(h=>{let x=!1;return h===c?x=l:x=!!d[h],{dateKey:h,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:nn,rewardPerStreak:Tn}}function nr(){return!!Jt}function Ro(){try{return localStorage.getItem(Cr)===et()}catch{return!1}}function Uo(){try{localStorage.setItem(Cr,et())}catch{}}function Fo(t,n){return Ro()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:et()}})),Uo(),!0)}function rr(){const t=ct(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Do(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<Mn)return;const d=Math.floor(c/Mn);d<=0||(fn(d),Dt(),Un(0,d,0,"boost"),t.boostLastStep=o+d*Mn)}function Go(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Ln){t.chestMeters=n;return}let o=0;for(;n>=Ln&&o<5;)if(n-=Ln,o+=1,Math.random()<_o){const l=Math.random()<So,c=l?10:3,d=l?2:1;Ft(c),Rn(),fn(d),Dt();const u=l&&Math.random()<ko;Un(c,d,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:d,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function Wo(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),h=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(h))}function Yo(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),d=Number(t.xpKmAwarded||0);if(c>d){const x=c-d;x>0&&(Ft(x),Rn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),h=Number(t.ticketChunksAwarded||0);if(p>h){const x=p-h;x>0&&(fn(x),Dt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Un(o,l,0,"distance")}function qo(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return ct();const o=ct();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/bo);if(c>l){const d=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+d}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||et(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),Yo(o),Do(o),Go(o),cn(o),Qt(),o}function Ko(){Zt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Zt),Zt=null}async function or(t={}){const n=!!t.silent;if(!navigator.geolocation)return ht={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(go,"1")}catch{}Ko(),Jt=!0,ht={msg:"requesting",t:Date.now()};try{return Zt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,d=o.coords.accuracy||999,u=Date.now(),p=ct(),h=p.lastPos;p.lastPos={lat:l,lng:c,t:u},cn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,v=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:d,heading:x,speed:v,t:u}})),d>ho){ht={lat:l,lng:c,acc:d,t:u,reason:"accuracy",boostMs:rr()},Qt();return}Fo(l,c);let b=0,C=0,R=0,G=0,A="no-last";h&&typeof h.lat=="number"&&typeof h.lng=="number"&&typeof h.t=="number"&&(b=Wo({lat:h.lat,lng:h.lng},{lat:l,lng:c}),C=Math.max(1,(u-h.t)/1e3),R=b/C,b<mo?A="jitter":b>wo?A="teleport":R>vo?A="too-fast":(qo(b),G=b,A="ok")),ht={lat:l,lng:c,acc:d,t:u,dist:Math.round(b),dt:Math.round(C),speed:Number.isFinite(R)?Number(R.toFixed(2)):0,added:Math.round(G),reason:A,boostMs:rr()},Qt()},o=>{Jt=!1,ht={err:o?.message||"GPS blocked",t:Date.now()},Qt()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return Jt=!1,ht={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Ho(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>nr()||await or({silent:!0}))();const n=async()=>{nr()||await or({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Ft(o),Rn()),(l>0||c>0)&&(l>0&&fn(l),c>0&&Sr(c),Dt());const d=n.cardId||n.card_id;if(d)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;zo(d,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Lr(){const t=ln(),n=Rt(),o=gr(),l=br(),c=Oo(),d=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function Ar(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:d}=jo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function zr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Xo(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Br="cbsgo_player_name_v2",Fn="cbsgo_player_avatar_v2";function Gt(){try{return localStorage.getItem(Br)||"Sovereign"}catch{return"Sovereign"}}function Nr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Br,n)}catch{}return n}function Dn(){try{return localStorage.getItem(Fn)||""}catch{return""}}function Vo(t){const n=String(t||"");try{localStorage.setItem(Fn,n)}catch{}return n}function Zo(){try{localStorage.removeItem(Fn)}catch{}}let K=null,Ze=null,Je=null,Tt=null,$t=null,Re=null,ze=null,mt=0,lt=!1,He=!0,je=null;const qe=new Map;let Ke=!0,It={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const Jo="48a387bba00043ac4ba5823371abc9d2",Ut=80,Qo=6,ei=80,ti=220,ni=6e4,ri=5*6e4,oi=300,ii=.35,An=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],ai=350,si=.35,li=120;let on=0,wt=0,en=null,$n=!1,_t=[];function ft(t){return document.getElementById(t)}function vt(t){const n=ft("cbsgoMapHost");if(!n)return;let o=ft("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function fi(){const t=String(Gt()||"").trim();return t?t[0].toUpperCase():"🙂"}function In(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),h=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(h))}function Tr(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,d=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+d,lng:t.lng+u}}function ci(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),d=o(n.lng-t.lng),u=Math.sin(d)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(d);let h=Math.atan2(u,p);return h=h*180/Math.PI,h=(h+360)%360,h}function di(t,n,o){const c=n/6371e3,d=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,h=Math.sin(u),x=Math.cos(u),v=Math.sin(c),b=Math.cos(c),C=Math.asin(h*b+x*v*Math.cos(d)),R=p+Math.atan2(Math.sin(d)*v*x,b-h*Math.sin(C));return[C*180/Math.PI,R*180/Math.PI]}function pi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Pr(){const{temp:t,iconEmoji:n}=It;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function $r(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;pi();const{condition:n,isNight:o}=It;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const d=[];for(let u=0;u<96;u++){const p=Math.random()*100,h=Math.random()*16-8,x=Math.random()*2.5,v=2+Math.random()*1.5;d.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+h}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${v}s;
          "
        ></div>
      `)}l=d.join("")}else if(n==="snow"){const d=[];for(let u=0;u<80;u++){const p=Math.random()*100,h=Math.random()*20-10,x=Math.random()*4,v=6+Math.random()*4;d.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+h}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${v}s;
          "
        ></div>
      `)}l=d.join("")}else l="";t.innerHTML=l}async function ui(t,n){const o=Date.now();if(!(It.lastUpdated&&o-It.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${Jo}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const d=await c.json(),u=d?.main?.temp,p=d?.weather?.[0]?.icon||"01d",h=String(d?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),v="⛅",b="clear";p.startsWith("01")||p.startsWith("02")?b="clear":p.startsWith("03")||p.startsWith("04")?(v="☁️",b="clouds"):p.startsWith("09")||p.startsWith("10")?(v="🌧️",b="rain"):p.startsWith("11")?(v="⛈️",b="storm"):p.startsWith("13")?(v="❄️",b="snow"):p.startsWith("50")&&(v="🌫️",b="mist"),h.includes("rain")&&(b="rain"),h.includes("snow")&&(b="snow"),h.includes("thunder")&&(b="storm");try{const R=Number(d?.dt||0),G=Number(d?.timezone||0);if(R&&Number.isFinite(G)){const F=((R+G)/3600%24+24)%24;x=F<7||F>=19}}catch{}b==="clear"?v=x?"🌙":"☀️":b==="clouds"?v="☁️":b==="rain"?v="🌧️":b==="storm"?v="⛈️":b==="snow"?v="❄️":b==="mist"&&(v="🌫️"),It={temp:u,iconEmoji:v,condition:b,isNight:x,lastUpdated:o};const C=document.getElementById("cbsgoWeatherLabel");C&&(C.textContent=Pr()),$r()}catch(l){console.warn("Weather fetch failed",l)}}function xi(t){const n=Dn();if(n){const c=`
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
    ">${In(fi())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function ir(t,n){const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function yi(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${In(o)}');
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
    ">${In(c)}</div>
  `;return t.divIcon({html:d,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function gi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function bi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function hi(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function mi(){if(!An.length)return null;const t=Math.floor(Math.random()*An.length);return An[t]}function wi(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let d=null,u=0;if(Math.random()<ii){const p=mi();p&&(d=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:d,cardCount:u}}function vi(t){if(!K||!Re||!t)return;const n=Date.now();if(n-on<ni||Re.getLayers().length>=Qo)return;const l=window.L;if(!l)return;const c=hi(),d=wi(c),u=Tr(t,ei,ti),p=gi(l),h=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),v={marker:h,createdAt:n,lat:u.lat,lng:u.lng,reward:d};_t.push(v),h.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const b={lat:ze[0],lng:ze[1]},C={lat:u.lat,lng:u.lng},R=Ct(b,C);if(R>Ut){alert(`Too far to open this gift.

Distance: ${Math.round(R)}m
Needed: ≤ ${Ut}m`);return}Re.removeLayer(h),_t=_t.filter(Be=>Be.marker!==h);const{xp:G,tickets:A,cbs:F,cardId:ae,cardCount:ge}=d,he=[];G&&he.push(`+${G} XP`),A&&he.push(`+${A} ticket${A===1?"":"s"}`),F&&he.push(`+${F} CBS`),ae&&ge>0&&he.push(`+${ge} card${ge===1?"":"s"}`);const ye=he.length?he.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${ye}`);const fe={kind:"mystery",xp:G||0,tickets:A||0,cbs:F||0,cardId:ae||null,cardCount:ge||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:fe}))}catch{}}),h.addTo(Re),on=n}function _i(t){if(!K||!Re||!t)return;const n=Date.now();let o=0;_t=_t.filter(l=>{if(!l||!l.marker||!Re.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>ri)return Re.removeLayer(l.marker),o+=1,!1;const d=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(d)&&d>oi?(Re.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Re.getLayers().length===0&&(on=0)}function Si(t){if(!K||!$t||!t||en)return;const n=window.L;if(!n)return;if($n){if(wt<ai||Math.random()>si)return;wt=0}else{if(wt<li)return;wt=0,$n=!0}const o=Tr(t,60,140),l=bi(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!ze){alert("GPS not ready yet. Wait until your player marker appears.");return}const d={lat:ze[0],lng:ze[1]},u={lat:o.lat,lng:o.lng},p=Ct(d,u);if(p>Ut){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Ut}m`);return}$t.removeLayer(c),en=null,Nn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo($t),en=c}function ki(t){const n=window.L;if(!n||!K||!t)return;const o=Ut;Tt?(Tt.setLatLng(t),Tt.setRadius(o)):Tt=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(K)}function Ci(t){const n=window.L;if(!n||!K)return;const o=xi(n);if(Ze?(Ze.setIcon(o),Ze.setLatLng(t)):(Ze=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(K),K.setView(t,19)),Je?(Je.setIcon(ir(n,mt)),Je.setLatLng(t)):Je=n.marker(t,{icon:ir(n,mt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(K),Ze&&Ze.bringToFront&&Ze.bringToFront(),Je&&Je.bringToFront&&Je.bringToFront(),ki(t),He&&!lt&&K)try{const l=K.getZoom()||19;let c=t;Number.isFinite(mt)&&(c=di(t,40,mt));const d=K.getCenter(),u=Ct({lat:d.lat,lng:d.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&K.setView(c,l)}catch{}}function Ir(){const t=window.L;return!t||!K?null:(je?(Ke&&!K.hasLayer(je)&&je.addTo(K),!Ke&&K.hasLayer(je)&&K.removeLayer(je)):(je=t.layerGroup(),Ke&&je.addTo(K)),je)}function Ei(t){if(!Array.isArray(t)||!K)return[];const n=K.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(d=>{if(!d||d.isMe||typeof d.lat!="number"||typeof d.lng!="number")return;const u=Math.round(d.lat*o)/o,p=Math.round(d.lng*o)/o,h=`${u}_${p}`;l.has(h)||l.set(h,[]),l.get(h).push(d)});const c=[];for(const[d,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||d,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,h=0;u.forEach(b=>{p+=b.lat,h+=b.lng});const x=p/u.length,v=h/u.length;c.push({id:`cluster_${d}`,lat:x,lng:v,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Mi(t){const n=window.L;if(!n||!K)return;const o=Ir();if(!o)return;if(!Ke){for(const[d,u]of qe.entries())o.removeLayer(u),qe.delete(d);return}const l=Ei(t),c=new Set;l.forEach(d=>{if(!d||typeof d.lat!="number"||typeof d.lng!="number")return;const u=d.id||`${d.lat},${d.lng}`;c.add(u);const p=[d.lat,d.lng];let h=qe.get(u);if(h)h.setLatLng(p);else{const x=d.isCluster&&d.count>1?String(d.count):d.nickname||"Anon",v=yi(n,x,d.avatar,d.isCluster);h=n.marker(p,{icon:v,pane:"cbsgo-others-pane"});const b=d.isCluster&&d.count>1?`${d.count} CBS-GO explorers nearby`:`${d.nickname||"CBS-GO explorer"}`;h.bindPopup(b),h.addTo(o),qe.set(u,h)}});for(const[d,u]of qe.entries())c.has(d)||(o.removeLayer(u),qe.delete(d))}function Li(){return`
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
        <span id="cbsgoWeatherLabel">${Pr()}</span>
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
  `}function Ai(){try{K&&K.remove()}catch{}K=null,Ze=null,Je=null,Tt=null,$t=null,Re=null,ze=null,lt=!1,He=!0,on=0,wt=0,en=null,$n=!1,je=null,qe.clear(),_t=[]}function zi(){const t=window.L,n=ft("cbsgoMap");if(!t||!n)return!1;Ai();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));K=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=K.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=K.createPane("cbsgo-others-pane");c.style.zIndex="640";const d=K.createPane("cbsgo-loot-pane");d.style.zIndex="630";const u=K.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(K),K.setMaxBounds(o),K.setView([51.687,4.87],16),$t=t.layerGroup().addTo(K),Re=t.layerGroup().addTo(K),K.on("dragstart",()=>{He=!1}),K.on("zoomstart",()=>{He=!1}),!0}function Bi(){!navigator.geolocation||!K||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,d={lat:n,lng:o},u=ze?{lat:ze[0],lng:ze[1]}:null;if(ze=[n,o],Number.isFinite(c))mt=c;else if(u){const p=Ct(u,d);Number.isFinite(p)&&p>2&&(mt=ci(u,d))}if(Ci([n,o]),u){const p=Ct(u,d);if(Number.isFinite(p)&&p>1&&(wt+=p),Number.isFinite(p)&&p>20&&!He&&!lt&&K){He=!0;const h=K.getZoom()||19;K.setView([n,o],h)}}Si(d),vi(d),_i(d),ui(n,o),vt(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{vt(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Ni(){let t=0;const n=120,o=()=>{if(t++,!ft("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(vt("Loading map engine…"),t<n)return setTimeout(o,100);vt("Map engine failed (Leaflet not found). Refresh.");return}if(!zi()){vt("Could not init map. Refresh.");return}const c=ft("cbsgoCenterBtn");c&&(c.onclick=()=>{K&&ze&&(He=!0,lt=!1,K.setView(ze,19))});const d=ft("cbsgoCompassBtn");d&&(d.onclick=()=>{K&&(lt=!lt,lt?(He=!1,K.setView([51.687,4.87],3)):ze&&(He=!0,K.setView(ze,16)))});const u=ft("cbsgoOnlineToggleBtn");if(u){const p=()=>{Ke?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Ke=!Ke;const h=Ir();if(h&&K&&(Ke?K.hasLayer(h)||h.addTo(K):K.hasLayer(h)&&K.removeLayer(h)),p(),!Ke&&je){for(const[x,v]of qe.entries())je.removeLayer(v);qe.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const h=p?.detail?.players||[];Mi(h)})),$r(),vt("Loading GPS…"),Bi()};o()}const Ti="cbsgo_cards_v1";function Pi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Gn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Wn(){const t=localStorage.getItem(Ti),n=Pi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function Qe(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Or(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function $i(){const t=Gn(),n=Wn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Ii(){const t=Gn(),n=Wn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),d=Number.isFinite(c)&&c>0,u=Or(l.rarity),p=d?u:"rgba(31,41,55,.9)",h=d?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=d?l.emoji||"🃏":"❓",v=d?Qe(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',b=Qe(l.set||"Set"),C=d?`<div style="
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
          data-card-id="${Qe(l.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${p};
            background:${h};
            padding:6px 6px 7px 6px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            min-height:96px;
            cursor:pointer;
          "
        >
          ${C}
          <div style="
            font-size:${d?"26px":"28px"};
            margin-top:${d?"4px":"8px"};
            margin-bottom:4px;
          ">
            ${Qe(x)}
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
            ${v}
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
    `}function Oi(){const t=$i(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
        ${Ii()}
      </div>
    </div>
  `}function ji(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Oi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const d=Gn(),u=new Map(d.map(x=>[x.id,x]));function p(x){const v=u.get(x);if(!v)return;const b=Wn(),C=Number(b[x]||0),R=Number.isFinite(C)&&C>0,G=R?v.emoji||"🃏":"❓",A=R?v.name||"Card":"Unknown card",F=v.set||"Set",ae=v.rarity||"common",ge=Or(ae),he={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[ae]||"Common",ye=document.createElement("div");ye.style.position="fixed",ye.style.inset="0",ye.style.display="flex",ye.style.alignItems="center",ye.style.justifyContent="center",ye.style.background="rgba(0,0,0,0.65)",ye.style.pointerEvents="auto",ye.style.zIndex="8600";const fe=document.createElement("div");fe.style.width="min(260px, 82vw)",fe.style.borderRadius="20px",fe.style.border=`1px solid ${ge}`,fe.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",fe.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",fe.style.padding="16px 14px 14px 14px",fe.style.textAlign="center",fe.style.color="#fff",fe.style.fontFamily="system-ui,sans-serif",fe.style.opacity="0",fe.style.transform="translateY(14px) scale(0.96)",fe.style.transition="opacity .2s ease-out, transform .2s ease-out";const Be=R?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${C}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',nt=R?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
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
          ${Qe(F)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${ge};
          font-size:10px;
        ">
          ${Qe(he)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${ge};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${Qe(G)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${Qe(A)}
      </div>

      ${Be}
      ${nt}

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
    `,ye.appendChild(fe),document.body.appendChild(ye),requestAnimationFrame(()=>{fe.style.opacity="1",fe.style.transform="translateY(0) scale(1)"});const Ue=()=>{fe.style.opacity="0",fe.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(ye)},200)},Ie=fe.querySelector("#cbsgoCardPreviewCloseBtn");Ie&&(Ie.onclick=Ue),ye.addEventListener("click",rt=>{rt.target===ye&&Ue()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const v=x.getAttribute("data-card-id");v&&p(v)})})}function Ri(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ui(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function Fi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var zn={exports:{}};const Di={},Gi=Object.freeze(Object.defineProperty({__proto__:null,default:Di},Symbol.toStringTag,{value:"Module"})),Wi=Ui(Gi);var ar;function Yi(){return ar||(ar=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),d=new Uint8Array(32);d[0]=9;var u=o(),p=o([1]),h=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),v=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),b=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),C=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),R=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function G(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var y,g=0;for(y=0;y<s;y++)g|=r[a+y]^i[e+y];return(1&g-1>>>8)-1}function F(r,a,i,e){return A(r,a,i,e,16)}function ae(r,a,i,e){return A(r,a,i,e,32)}function ge(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,y=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,g=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,S=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,U=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,pe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,te=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ee=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,D=y,N=g,I=S,j=L,z=U,m=B,w=pe,E=T,_=H,k=X,M=te,q=ee,ne=V,oe=J,re=Z,f,se=0;se<20;se+=2)f=P+q|0,j^=f<<7|f>>>25,f=j+P|0,E^=f<<9|f>>>23,f=E+j|0,q^=f<<13|f>>>19,f=q+E|0,P^=f<<18|f>>>14,f=z+D|0,_^=f<<7|f>>>25,f=_+z|0,ne^=f<<9|f>>>23,f=ne+_|0,D^=f<<13|f>>>19,f=D+ne|0,z^=f<<18|f>>>14,f=k+m|0,oe^=f<<7|f>>>25,f=oe+k|0,N^=f<<9|f>>>23,f=N+oe|0,m^=f<<13|f>>>19,f=m+N|0,k^=f<<18|f>>>14,f=re+M|0,I^=f<<7|f>>>25,f=I+re|0,w^=f<<9|f>>>23,f=w+I|0,M^=f<<13|f>>>19,f=M+w|0,re^=f<<18|f>>>14,f=P+I|0,D^=f<<7|f>>>25,f=D+P|0,N^=f<<9|f>>>23,f=N+D|0,I^=f<<13|f>>>19,f=I+N|0,P^=f<<18|f>>>14,f=z+j|0,m^=f<<7|f>>>25,f=m+z|0,w^=f<<9|f>>>23,f=w+m|0,j^=f<<13|f>>>19,f=j+w|0,z^=f<<18|f>>>14,f=k+_|0,M^=f<<7|f>>>25,f=M+k|0,E^=f<<9|f>>>23,f=E+M|0,_^=f<<13|f>>>19,f=_+E|0,k^=f<<18|f>>>14,f=re+oe|0,q^=f<<7|f>>>25,f=q+re|0,ne^=f<<9|f>>>23,f=ne+q|0,oe^=f<<13|f>>>19,f=oe+ne|0,re^=f<<18|f>>>14;P=P+s|0,D=D+y|0,N=N+g|0,I=I+S|0,j=j+L|0,z=z+U|0,m=m+B|0,w=w+pe|0,E=E+T|0,_=_+H|0,k=k+X|0,M=M+te|0,q=q+ee|0,ne=ne+V|0,oe=oe+J|0,re=re+Z|0,r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=D>>>0&255,r[5]=D>>>8&255,r[6]=D>>>16&255,r[7]=D>>>24&255,r[8]=N>>>0&255,r[9]=N>>>8&255,r[10]=N>>>16&255,r[11]=N>>>24&255,r[12]=I>>>0&255,r[13]=I>>>8&255,r[14]=I>>>16&255,r[15]=I>>>24&255,r[16]=j>>>0&255,r[17]=j>>>8&255,r[18]=j>>>16&255,r[19]=j>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=m>>>0&255,r[25]=m>>>8&255,r[26]=m>>>16&255,r[27]=m>>>24&255,r[28]=w>>>0&255,r[29]=w>>>8&255,r[30]=w>>>16&255,r[31]=w>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=_>>>0&255,r[37]=_>>>8&255,r[38]=_>>>16&255,r[39]=_>>>24&255,r[40]=k>>>0&255,r[41]=k>>>8&255,r[42]=k>>>16&255,r[43]=k>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=q>>>0&255,r[49]=q>>>8&255,r[50]=q>>>16&255,r[51]=q>>>24&255,r[52]=ne>>>0&255,r[53]=ne>>>8&255,r[54]=ne>>>16&255,r[55]=ne>>>24&255,r[56]=oe>>>0&255,r[57]=oe>>>8&255,r[58]=oe>>>16&255,r[59]=oe>>>24&255,r[60]=re>>>0&255,r[61]=re>>>8&255,r[62]=re>>>16&255,r[63]=re>>>24&255}function he(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,y=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,g=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,S=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,U=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,pe=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,T=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,H=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,X=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,te=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ee=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,V=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,J=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Z=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,D=y,N=g,I=S,j=L,z=U,m=B,w=pe,E=T,_=H,k=X,M=te,q=ee,ne=V,oe=J,re=Z,f,se=0;se<20;se+=2)f=P+q|0,j^=f<<7|f>>>25,f=j+P|0,E^=f<<9|f>>>23,f=E+j|0,q^=f<<13|f>>>19,f=q+E|0,P^=f<<18|f>>>14,f=z+D|0,_^=f<<7|f>>>25,f=_+z|0,ne^=f<<9|f>>>23,f=ne+_|0,D^=f<<13|f>>>19,f=D+ne|0,z^=f<<18|f>>>14,f=k+m|0,oe^=f<<7|f>>>25,f=oe+k|0,N^=f<<9|f>>>23,f=N+oe|0,m^=f<<13|f>>>19,f=m+N|0,k^=f<<18|f>>>14,f=re+M|0,I^=f<<7|f>>>25,f=I+re|0,w^=f<<9|f>>>23,f=w+I|0,M^=f<<13|f>>>19,f=M+w|0,re^=f<<18|f>>>14,f=P+I|0,D^=f<<7|f>>>25,f=D+P|0,N^=f<<9|f>>>23,f=N+D|0,I^=f<<13|f>>>19,f=I+N|0,P^=f<<18|f>>>14,f=z+j|0,m^=f<<7|f>>>25,f=m+z|0,w^=f<<9|f>>>23,f=w+m|0,j^=f<<13|f>>>19,f=j+w|0,z^=f<<18|f>>>14,f=k+_|0,M^=f<<7|f>>>25,f=M+k|0,E^=f<<9|f>>>23,f=E+M|0,_^=f<<13|f>>>19,f=_+E|0,k^=f<<18|f>>>14,f=re+oe|0,q^=f<<7|f>>>25,f=q+re|0,ne^=f<<9|f>>>23,f=ne+q|0,oe^=f<<13|f>>>19,f=oe+ne|0,re^=f<<18|f>>>14;r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=k>>>0&255,r[9]=k>>>8&255,r[10]=k>>>16&255,r[11]=k>>>24&255,r[12]=re>>>0&255,r[13]=re>>>8&255,r[14]=re>>>16&255,r[15]=re>>>24&255,r[16]=m>>>0&255,r[17]=m>>>8&255,r[18]=m>>>16&255,r[19]=m>>>24&255,r[20]=w>>>0&255,r[21]=w>>>8&255,r[22]=w>>>16&255,r[23]=w>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=_>>>0&255,r[29]=_>>>8&255,r[30]=_>>>16&255,r[31]=_>>>24&255}function ye(r,a,i,e){ge(r,a,i,e)}function fe(r,a,i,e){he(r,a,i,e)}var Be=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function nt(r,a,i,e,s,y,g){var S=new Uint8Array(16),L=new Uint8Array(64),U,B;for(B=0;B<16;B++)S[B]=0;for(B=0;B<8;B++)S[B]=y[B];for(;s>=64;){for(ye(L,S,g,Be),B=0;B<64;B++)r[a+B]=i[e+B]^L[B];for(U=1,B=8;B<16;B++)U=U+(S[B]&255)|0,S[B]=U&255,U>>>=8;s-=64,a+=64,e+=64}if(s>0)for(ye(L,S,g,Be),B=0;B<s;B++)r[a+B]=i[e+B]^L[B];return 0}function Ue(r,a,i,e,s){var y=new Uint8Array(16),g=new Uint8Array(64),S,L;for(L=0;L<16;L++)y[L]=0;for(L=0;L<8;L++)y[L]=e[L];for(;i>=64;){for(ye(g,y,s,Be),L=0;L<64;L++)r[a+L]=g[L];for(S=1,L=8;L<16;L++)S=S+(y[L]&255)|0,y[L]=S&255,S>>>=8;i-=64,a+=64}if(i>0)for(ye(g,y,s,Be),L=0;L<i;L++)r[a+L]=g[L];return 0}function Ie(r,a,i,e,s){var y=new Uint8Array(32);fe(y,e,s,Be);for(var g=new Uint8Array(8),S=0;S<8;S++)g[S]=e[S+16];return Ue(r,a,i,g,y)}function rt(r,a,i,e,s,y,g){var S=new Uint8Array(32);fe(S,y,g,Be);for(var L=new Uint8Array(8),U=0;U<8;U++)L[U]=y[U+16];return nt(r,a,i,e,s,L,S)}var ot=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,y,g,S,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,y=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|y<<12)&255,this.r[5]=y>>>1&8190,g=r[10]&255|(r[11]&255)<<8,this.r[6]=(y>>>14|g<<2)&8191,S=r[12]&255|(r[13]&255)<<8,this.r[7]=(g>>>11|S<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(S>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};ot.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,y,g,S,L,U,B,pe,T,H,X,te,ee,V,J,Z,P,D,N,I=this.h[0],j=this.h[1],z=this.h[2],m=this.h[3],w=this.h[4],E=this.h[5],_=this.h[6],k=this.h[7],M=this.h[8],q=this.h[9],ne=this.r[0],oe=this.r[1],re=this.r[2],f=this.r[3],se=this.r[4],ue=this.r[5],xe=this.r[6],ie=this.r[7],ce=this.r[8],de=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,I+=s&8191,y=r[a+2]&255|(r[a+3]&255)<<8,j+=(s>>>13|y<<3)&8191,g=r[a+4]&255|(r[a+5]&255)<<8,z+=(y>>>10|g<<6)&8191,S=r[a+6]&255|(r[a+7]&255)<<8,m+=(g>>>7|S<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,w+=(S>>>4|L<<12)&8191,E+=L>>>1&8191,U=r[a+10]&255|(r[a+11]&255)<<8,_+=(L>>>14|U<<2)&8191,B=r[a+12]&255|(r[a+13]&255)<<8,k+=(U>>>11|B<<5)&8191,pe=r[a+14]&255|(r[a+15]&255)<<8,M+=(B>>>8|pe<<8)&8191,q+=pe>>>5|e,T=0,H=T,H+=I*ne,H+=j*(5*de),H+=z*(5*ce),H+=m*(5*ie),H+=w*(5*xe),T=H>>>13,H&=8191,H+=E*(5*ue),H+=_*(5*se),H+=k*(5*f),H+=M*(5*re),H+=q*(5*oe),T+=H>>>13,H&=8191,X=T,X+=I*oe,X+=j*ne,X+=z*(5*de),X+=m*(5*ce),X+=w*(5*ie),T=X>>>13,X&=8191,X+=E*(5*xe),X+=_*(5*ue),X+=k*(5*se),X+=M*(5*f),X+=q*(5*re),T+=X>>>13,X&=8191,te=T,te+=I*re,te+=j*oe,te+=z*ne,te+=m*(5*de),te+=w*(5*ce),T=te>>>13,te&=8191,te+=E*(5*ie),te+=_*(5*xe),te+=k*(5*ue),te+=M*(5*se),te+=q*(5*f),T+=te>>>13,te&=8191,ee=T,ee+=I*f,ee+=j*re,ee+=z*oe,ee+=m*ne,ee+=w*(5*de),T=ee>>>13,ee&=8191,ee+=E*(5*ce),ee+=_*(5*ie),ee+=k*(5*xe),ee+=M*(5*ue),ee+=q*(5*se),T+=ee>>>13,ee&=8191,V=T,V+=I*se,V+=j*f,V+=z*re,V+=m*oe,V+=w*ne,T=V>>>13,V&=8191,V+=E*(5*de),V+=_*(5*ce),V+=k*(5*ie),V+=M*(5*xe),V+=q*(5*ue),T+=V>>>13,V&=8191,J=T,J+=I*ue,J+=j*se,J+=z*f,J+=m*re,J+=w*oe,T=J>>>13,J&=8191,J+=E*ne,J+=_*(5*de),J+=k*(5*ce),J+=M*(5*ie),J+=q*(5*xe),T+=J>>>13,J&=8191,Z=T,Z+=I*xe,Z+=j*ue,Z+=z*se,Z+=m*f,Z+=w*re,T=Z>>>13,Z&=8191,Z+=E*oe,Z+=_*ne,Z+=k*(5*de),Z+=M*(5*ce),Z+=q*(5*ie),T+=Z>>>13,Z&=8191,P=T,P+=I*ie,P+=j*xe,P+=z*ue,P+=m*se,P+=w*f,T=P>>>13,P&=8191,P+=E*re,P+=_*oe,P+=k*ne,P+=M*(5*de),P+=q*(5*ce),T+=P>>>13,P&=8191,D=T,D+=I*ce,D+=j*ie,D+=z*xe,D+=m*ue,D+=w*se,T=D>>>13,D&=8191,D+=E*f,D+=_*re,D+=k*oe,D+=M*ne,D+=q*(5*de),T+=D>>>13,D&=8191,N=T,N+=I*de,N+=j*ce,N+=z*ie,N+=m*xe,N+=w*ue,T=N>>>13,N&=8191,N+=E*se,N+=_*f,N+=k*re,N+=M*oe,N+=q*ne,T+=N>>>13,N&=8191,T=(T<<2)+T|0,T=T+H|0,H=T&8191,T=T>>>13,X+=T,I=H,j=X,z=te,m=ee,w=V,E=J,_=Z,k=P,M=D,q=N,a+=16,i-=16;this.h[0]=I,this.h[1]=j,this.h[2]=z,this.h[3]=m,this.h[4]=w,this.h[5]=E,this.h[6]=_,this.h[7]=k,this.h[8]=M,this.h[9]=q},ot.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,y,g;if(this.leftover){for(g=this.leftover,this.buffer[g++]=1;g<16;g++)this.buffer[g]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,g=2;g<10;g++)this.h[g]+=e,e=this.h[g]>>>13,this.h[g]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,g=1;g<10;g++)i[g]=this.h[g]+e,e=i[g]>>>13,i[g]&=8191;for(i[9]-=8192,s=(e^1)-1,g=0;g<10;g++)i[g]&=s;for(s=~s,g=0;g<10;g++)this.h[g]=this.h[g]&s|i[g];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,y=this.h[0]+this.pad[0],this.h[0]=y&65535,g=1;g<8;g++)y=(this.h[g]+this.pad[g]|0)+(y>>>16)|0,this.h[g]=y&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},ot.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Mt(r,a,i,e,s,y){var g=new ot(y);return g.update(i,e,s),g.finish(r,a),0}function it(r,a,i,e,s,y){var g=new Uint8Array(16);return Mt(g,0,i,e,s,y),F(r,a,g,0)}function Ne(r,a,i,e,s){var y;if(i<32)return-1;for(rt(r,0,a,0,i,e,s),Mt(r,16,r,32,i-32,r),y=0;y<16;y++)r[y]=0;return 0}function pt(r,a,i,e,s){var y,g=new Uint8Array(32);if(i<32||(Ie(g,0,32,e,s),it(a,16,a,32,i-32,g)!==0))return-1;for(rt(r,0,a,0,i,e,s),y=0;y<32;y++)r[y]=0;return 0}function Oe(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function ut(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function Ge(r,a,i){for(var e,s=~(i-1),y=0;y<16;y++)e=s&(r[y]^a[y]),r[y]^=e,a[y]^=e}function Xe(r,a){var i,e,s,y=o(),g=o();for(i=0;i<16;i++)g[i]=a[i];for(ut(g),ut(g),ut(g),e=0;e<2;e++){for(y[0]=g[0]-65517,i=1;i<15;i++)y[i]=g[i]-65535-(y[i-1]>>16&1),y[i-1]&=65535;y[15]=g[15]-32767-(y[14]>>16&1),s=y[15]>>16&1,y[14]&=65535,Ge(g,y,1-s)}for(i=0;i<16;i++)r[2*i]=g[i]&255,r[2*i+1]=g[i]>>8}function Lt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Xe(i,r),Xe(e,a),ae(i,0,e,0)}function xt(r){var a=new Uint8Array(32);return Xe(a,r),a[0]&1}function We(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Te(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Pe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function le(r,a,i){var e,s,y=0,g=0,S=0,L=0,U=0,B=0,pe=0,T=0,H=0,X=0,te=0,ee=0,V=0,J=0,Z=0,P=0,D=0,N=0,I=0,j=0,z=0,m=0,w=0,E=0,_=0,k=0,M=0,q=0,ne=0,oe=0,re=0,f=i[0],se=i[1],ue=i[2],xe=i[3],ie=i[4],ce=i[5],de=i[6],Se=i[7],be=i[8],we=i[9],ve=i[10],_e=i[11],Ee=i[12],Me=i[13],Le=i[14],Ae=i[15];e=a[0],y+=e*f,g+=e*se,S+=e*ue,L+=e*xe,U+=e*ie,B+=e*ce,pe+=e*de,T+=e*Se,H+=e*be,X+=e*we,te+=e*ve,ee+=e*_e,V+=e*Ee,J+=e*Me,Z+=e*Le,P+=e*Ae,e=a[1],g+=e*f,S+=e*se,L+=e*ue,U+=e*xe,B+=e*ie,pe+=e*ce,T+=e*de,H+=e*Se,X+=e*be,te+=e*we,ee+=e*ve,V+=e*_e,J+=e*Ee,Z+=e*Me,P+=e*Le,D+=e*Ae,e=a[2],S+=e*f,L+=e*se,U+=e*ue,B+=e*xe,pe+=e*ie,T+=e*ce,H+=e*de,X+=e*Se,te+=e*be,ee+=e*we,V+=e*ve,J+=e*_e,Z+=e*Ee,P+=e*Me,D+=e*Le,N+=e*Ae,e=a[3],L+=e*f,U+=e*se,B+=e*ue,pe+=e*xe,T+=e*ie,H+=e*ce,X+=e*de,te+=e*Se,ee+=e*be,V+=e*we,J+=e*ve,Z+=e*_e,P+=e*Ee,D+=e*Me,N+=e*Le,I+=e*Ae,e=a[4],U+=e*f,B+=e*se,pe+=e*ue,T+=e*xe,H+=e*ie,X+=e*ce,te+=e*de,ee+=e*Se,V+=e*be,J+=e*we,Z+=e*ve,P+=e*_e,D+=e*Ee,N+=e*Me,I+=e*Le,j+=e*Ae,e=a[5],B+=e*f,pe+=e*se,T+=e*ue,H+=e*xe,X+=e*ie,te+=e*ce,ee+=e*de,V+=e*Se,J+=e*be,Z+=e*we,P+=e*ve,D+=e*_e,N+=e*Ee,I+=e*Me,j+=e*Le,z+=e*Ae,e=a[6],pe+=e*f,T+=e*se,H+=e*ue,X+=e*xe,te+=e*ie,ee+=e*ce,V+=e*de,J+=e*Se,Z+=e*be,P+=e*we,D+=e*ve,N+=e*_e,I+=e*Ee,j+=e*Me,z+=e*Le,m+=e*Ae,e=a[7],T+=e*f,H+=e*se,X+=e*ue,te+=e*xe,ee+=e*ie,V+=e*ce,J+=e*de,Z+=e*Se,P+=e*be,D+=e*we,N+=e*ve,I+=e*_e,j+=e*Ee,z+=e*Me,m+=e*Le,w+=e*Ae,e=a[8],H+=e*f,X+=e*se,te+=e*ue,ee+=e*xe,V+=e*ie,J+=e*ce,Z+=e*de,P+=e*Se,D+=e*be,N+=e*we,I+=e*ve,j+=e*_e,z+=e*Ee,m+=e*Me,w+=e*Le,E+=e*Ae,e=a[9],X+=e*f,te+=e*se,ee+=e*ue,V+=e*xe,J+=e*ie,Z+=e*ce,P+=e*de,D+=e*Se,N+=e*be,I+=e*we,j+=e*ve,z+=e*_e,m+=e*Ee,w+=e*Me,E+=e*Le,_+=e*Ae,e=a[10],te+=e*f,ee+=e*se,V+=e*ue,J+=e*xe,Z+=e*ie,P+=e*ce,D+=e*de,N+=e*Se,I+=e*be,j+=e*we,z+=e*ve,m+=e*_e,w+=e*Ee,E+=e*Me,_+=e*Le,k+=e*Ae,e=a[11],ee+=e*f,V+=e*se,J+=e*ue,Z+=e*xe,P+=e*ie,D+=e*ce,N+=e*de,I+=e*Se,j+=e*be,z+=e*we,m+=e*ve,w+=e*_e,E+=e*Ee,_+=e*Me,k+=e*Le,M+=e*Ae,e=a[12],V+=e*f,J+=e*se,Z+=e*ue,P+=e*xe,D+=e*ie,N+=e*ce,I+=e*de,j+=e*Se,z+=e*be,m+=e*we,w+=e*ve,E+=e*_e,_+=e*Ee,k+=e*Me,M+=e*Le,q+=e*Ae,e=a[13],J+=e*f,Z+=e*se,P+=e*ue,D+=e*xe,N+=e*ie,I+=e*ce,j+=e*de,z+=e*Se,m+=e*be,w+=e*we,E+=e*ve,_+=e*_e,k+=e*Ee,M+=e*Me,q+=e*Le,ne+=e*Ae,e=a[14],Z+=e*f,P+=e*se,D+=e*ue,N+=e*xe,I+=e*ie,j+=e*ce,z+=e*de,m+=e*Se,w+=e*be,E+=e*we,_+=e*ve,k+=e*_e,M+=e*Ee,q+=e*Me,ne+=e*Le,oe+=e*Ae,e=a[15],P+=e*f,D+=e*se,N+=e*ue,I+=e*xe,j+=e*ie,z+=e*ce,m+=e*de,w+=e*Se,E+=e*be,_+=e*we,k+=e*ve,M+=e*_e,q+=e*Ee,ne+=e*Me,oe+=e*Le,re+=e*Ae,y+=38*D,g+=38*N,S+=38*I,L+=38*j,U+=38*z,B+=38*m,pe+=38*w,T+=38*E,H+=38*_,X+=38*k,te+=38*M,ee+=38*q,V+=38*ne,J+=38*oe,Z+=38*re,s=1,e=y+s+65535,s=Math.floor(e/65536),y=e-s*65536,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=S+s+65535,s=Math.floor(e/65536),S=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=U+s+65535,s=Math.floor(e/65536),U=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=pe+s+65535,s=Math.floor(e/65536),pe=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,y+=s-1+37*(s-1),s=1,e=y+s+65535,s=Math.floor(e/65536),y=e-s*65536,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=S+s+65535,s=Math.floor(e/65536),S=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=U+s+65535,s=Math.floor(e/65536),U=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=pe+s+65535,s=Math.floor(e/65536),pe=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=H+s+65535,s=Math.floor(e/65536),H=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,y+=s-1+37*(s-1),r[0]=y,r[1]=g,r[2]=S,r[3]=L,r[4]=U,r[5]=B,r[6]=pe,r[7]=T,r[8]=H,r[9]=X,r[10]=te,r[11]=ee,r[12]=V,r[13]=J,r[14]=Z,r[15]=P}function O(r,a){le(r,a,a)}function W(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)O(i,i),e!==2&&e!==4&&le(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)O(i,i),e!==1&&le(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function $(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),y,g,S=o(),L=o(),U=o(),B=o(),pe=o(),T=o();for(g=0;g<31;g++)e[g]=a[g];for(e[31]=a[31]&127|64,e[0]&=248,We(s,i),g=0;g<16;g++)L[g]=s[g],B[g]=S[g]=U[g]=0;for(S[0]=B[0]=1,g=254;g>=0;--g)y=e[g>>>3]>>>(g&7)&1,Ge(S,L,y),Ge(U,B,y),Te(pe,S,U),Pe(S,S,U),Te(U,L,B),Pe(L,L,B),O(B,pe),O(T,S),le(S,U,S),le(U,L,pe),Te(pe,S,U),Pe(S,S,U),O(L,S),Pe(U,B,T),le(S,U,h),Te(S,S,B),le(U,U,S),le(S,B,T),le(B,L,s),O(L,pe),Ge(S,L,y),Ge(U,B,y);for(g=0;g<16;g++)s[g+16]=S[g],s[g+32]=U[g],s[g+48]=L[g],s[g+64]=B[g];var H=s.subarray(32),X=s.subarray(16);return W(H,H),le(X,X,H),Xe(r,X),0}function Q(r,a){return $(r,a,d)}function me(r,a){return l(a,32),Q(r,a)}function ke(r,a,i){var e=new Uint8Array(32);return $(e,i,a),fe(r,c,e,Be)}var Ce=Ne,yt=pt;function un(r,a,i,e,s,y){var g=new Uint8Array(32);return ke(g,s,y),Ce(r,a,i,e,g)}function Fe(r,a,i,e,s,y){var g=new Uint8Array(32);return ke(g,s,y),yt(r,a,i,e,g)}var Ve=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function qn(r,a,i,e){for(var s=new Int32Array(16),y=new Int32Array(16),g,S,L,U,B,pe,T,H,X,te,ee,V,J,Z,P,D,N,I,j,z,m,w,E,_,k,M,q=r[0],ne=r[1],oe=r[2],re=r[3],f=r[4],se=r[5],ue=r[6],xe=r[7],ie=a[0],ce=a[1],de=a[2],Se=a[3],be=a[4],we=a[5],ve=a[6],_e=a[7],Ee=0;e>=128;){for(j=0;j<16;j++)z=8*j+Ee,s[j]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],y[j]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(j=0;j<80;j++)if(g=q,S=ne,L=oe,U=re,B=f,pe=se,T=ue,H=xe,X=ie,te=ce,ee=de,V=Se,J=be,Z=we,P=ve,D=_e,m=xe,w=_e,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=(f>>>14|be<<18)^(f>>>18|be<<14)^(be>>>9|f<<23),w=(be>>>14|f<<18)^(be>>>18|f<<14)^(f>>>9|be<<23),E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,m=f&se^~f&ue,w=be&we^~be&ve,E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,m=Ve[j*2],w=Ve[j*2+1],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,m=s[j%16],w=y[j%16],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,N=k&65535|M<<16,I=E&65535|_<<16,m=N,w=I,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=(q>>>28|ie<<4)^(ie>>>2|q<<30)^(ie>>>7|q<<25),w=(ie>>>28|q<<4)^(q>>>2|ie<<30)^(q>>>7|ie<<25),E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,m=q&ne^q&oe^ne&oe,w=ie&ce^ie&de^ce&de,E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,H=k&65535|M<<16,D=E&65535|_<<16,m=U,w=V,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=N,w=I,E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,U=k&65535|M<<16,V=E&65535|_<<16,ne=g,oe=S,re=L,f=U,se=B,ue=pe,xe=T,q=H,ce=X,de=te,Se=ee,be=V,we=J,ve=Z,_e=P,ie=D,j%16===15)for(z=0;z<16;z++)m=s[z],w=y[z],E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=s[(z+9)%16],w=y[(z+9)%16],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,N=s[(z+1)%16],I=y[(z+1)%16],m=(N>>>1|I<<31)^(N>>>8|I<<24)^N>>>7,w=(I>>>1|N<<31)^(I>>>8|N<<24)^(I>>>7|N<<25),E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,N=s[(z+14)%16],I=y[(z+14)%16],m=(N>>>19|I<<13)^(I>>>29|N<<3)^N>>>6,w=(I>>>19|N<<13)^(N>>>29|I<<3)^(I>>>6|N<<26),E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,s[z]=k&65535|M<<16,y[z]=E&65535|_<<16;m=q,w=ie,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[0],w=a[0],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[0]=q=k&65535|M<<16,a[0]=ie=E&65535|_<<16,m=ne,w=ce,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[1],w=a[1],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[1]=ne=k&65535|M<<16,a[1]=ce=E&65535|_<<16,m=oe,w=de,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[2],w=a[2],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[2]=oe=k&65535|M<<16,a[2]=de=E&65535|_<<16,m=re,w=Se,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[3],w=a[3],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[3]=re=k&65535|M<<16,a[3]=Se=E&65535|_<<16,m=f,w=be,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[4],w=a[4],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[4]=f=k&65535|M<<16,a[4]=be=E&65535|_<<16,m=se,w=we,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[5],w=a[5],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[5]=se=k&65535|M<<16,a[5]=we=E&65535|_<<16,m=ue,w=ve,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[6],w=a[6],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[6]=ue=k&65535|M<<16,a[6]=ve=E&65535|_<<16,m=xe,w=_e,E=w&65535,_=w>>>16,k=m&65535,M=m>>>16,m=r[7],w=a[7],E+=w&65535,_+=w>>>16,k+=m&65535,M+=m>>>16,_+=E>>>16,k+=_>>>16,M+=k>>>16,r[7]=xe=k&65535|M<<16,a[7]=_e=E&65535|_<<16,Ee+=128,e-=128}return e}function at(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),y=new Uint8Array(256),g,S=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,qn(e,s,a,i),i%=128,g=0;g<i;g++)y[g]=a[S-i+g];for(y[i]=128,i=256-128*(i<112?1:0),y[i-9]=0,G(y,i-8,S/536870912|0,S<<3),qn(e,s,y,i),g=0;g<8;g++)G(r,8*g,e[g],s[g]);return 0}function Yt(r,a){var i=o(),e=o(),s=o(),y=o(),g=o(),S=o(),L=o(),U=o(),B=o();Pe(i,r[1],r[0]),Pe(B,a[1],a[0]),le(i,i,B),Te(e,r[0],r[1]),Te(B,a[0],a[1]),le(e,e,B),le(s,r[3],a[3]),le(s,s,v),le(y,r[2],a[2]),Te(y,y,y),Pe(g,e,i),Pe(S,y,s),Te(L,y,s),Te(U,e,i),le(r[0],g,S),le(r[1],U,L),le(r[2],L,S),le(r[3],g,U)}function Kn(r,a,i){var e;for(e=0;e<4;e++)Ge(r[e],a[e],i)}function xn(r,a){var i=o(),e=o(),s=o();W(s,a[2]),le(i,a[0],s),le(e,a[1],s),Xe(r,e),r[31]^=xt(i)<<7}function yn(r,a,i){var e,s;for(Oe(r[0],u),Oe(r[1],p),Oe(r[2],p),Oe(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Kn(r,a,e),Yt(a,r),Yt(r,r),Kn(r,a,e)}function qt(r,a){var i=[o(),o(),o(),o()];Oe(i[0],b),Oe(i[1],C),Oe(i[2],p),le(i[3],b,C),yn(r,i,a)}function gn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],y;for(i||l(a,32),at(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,qt(s,e),xn(r,s),y=0;y<32;y++)a[y+32]=r[y];return 0}var Kt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function bn(r,a){var i,e,s,y;for(e=63;e>=32;--e){for(i=0,s=e-32,y=e-12;s<y;++s)a[s]+=i-16*a[e]*Kt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Kt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Kt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function hn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;bn(r,a)}function Hn(r,a,i,e){var s=new Uint8Array(64),y=new Uint8Array(64),g=new Uint8Array(64),S,L,U=new Float64Array(64),B=[o(),o(),o(),o()];at(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var pe=i+64;for(S=0;S<i;S++)r[64+S]=a[S];for(S=0;S<32;S++)r[32+S]=s[32+S];for(at(g,r.subarray(32),i+32),hn(g),qt(B,g),xn(r,B),S=32;S<64;S++)r[S]=e[S];for(at(y,r,i+64),hn(y),S=0;S<64;S++)U[S]=0;for(S=0;S<32;S++)U[S]=g[S];for(S=0;S<32;S++)for(L=0;L<32;L++)U[S+L]+=y[S]*s[L];return bn(r.subarray(32),U),pe}function Hr(r,a){var i=o(),e=o(),s=o(),y=o(),g=o(),S=o(),L=o();return Oe(r[2],p),We(r[1],a),O(s,r[1]),le(y,s,x),Pe(s,s,r[2]),Te(y,r[2],y),O(g,y),O(S,g),le(L,S,g),le(i,L,s),le(i,i,y),Y(i,i),le(i,i,s),le(i,i,y),le(i,i,y),le(r[0],i,y),O(e,r[0]),le(e,e,y),Lt(e,s)&&le(r[0],r[0],R),O(e,r[0]),le(e,e,y),Lt(e,s)?-1:(xt(r[0])===a[31]>>7&&Pe(r[0],u,r[0]),le(r[3],r[0],r[1]),0)}function mn(r,a,i,e){var s,y=new Uint8Array(32),g=new Uint8Array(64),S=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||Hr(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(at(g,r,i),hn(g),yn(S,L,g),qt(L,a.subarray(32)),Yt(S,L),xn(y,S),i-=64,ae(a,0,y,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var wn=32,Ht=24,At=32,gt=16,zt=32,Xt=32,Bt=32,Nt=32,vn=32,Xn=Ht,Xr=At,Vr=gt,Ye=64,st=32,bt=64,_n=32,Sn=64;n.lowlevel={crypto_core_hsalsa20:fe,crypto_stream_xor:rt,crypto_stream:Ie,crypto_stream_salsa20_xor:nt,crypto_stream_salsa20:Ue,crypto_onetimeauth:Mt,crypto_onetimeauth_verify:it,crypto_verify_16:F,crypto_verify_32:ae,crypto_secretbox:Ne,crypto_secretbox_open:pt,crypto_scalarmult:$,crypto_scalarmult_base:Q,crypto_box_beforenm:ke,crypto_box_afternm:Ce,crypto_box:un,crypto_box_open:Fe,crypto_box_keypair:me,crypto_hash:at,crypto_sign:Hn,crypto_sign_keypair:gn,crypto_sign_open:mn,crypto_secretbox_KEYBYTES:wn,crypto_secretbox_NONCEBYTES:Ht,crypto_secretbox_ZEROBYTES:At,crypto_secretbox_BOXZEROBYTES:gt,crypto_scalarmult_BYTES:zt,crypto_scalarmult_SCALARBYTES:Xt,crypto_box_PUBLICKEYBYTES:Bt,crypto_box_SECRETKEYBYTES:Nt,crypto_box_BEFORENMBYTES:vn,crypto_box_NONCEBYTES:Xn,crypto_box_ZEROBYTES:Xr,crypto_box_BOXZEROBYTES:Vr,crypto_sign_BYTES:Ye,crypto_sign_PUBLICKEYBYTES:st,crypto_sign_SECRETKEYBYTES:bt,crypto_sign_SEEDBYTES:_n,crypto_hash_BYTES:Sn,gf:o,D:x,L:Kt,pack25519:Xe,unpack25519:We,M:le,A:Te,S:O,Z:Pe,pow2523:Y,add:Yt,set25519:Oe,modL:bn,scalarmult:yn,scalarbase:qt};function Vn(r,a){if(r.length!==wn)throw new Error("bad key size");if(a.length!==Ht)throw new Error("bad nonce size")}function Zr(r,a){if(r.length!==Bt)throw new Error("bad public key size");if(a.length!==Nt)throw new Error("bad secret key size")}function $e(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function Zn(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){$e(r,a,i),Vn(i,a);for(var e=new Uint8Array(At+r.length),s=new Uint8Array(e.length),y=0;y<r.length;y++)e[y+At]=r[y];return Ne(s,e,e.length,a,i),s.subarray(gt)},n.secretbox.open=function(r,a,i){$e(r,a,i),Vn(i,a);for(var e=new Uint8Array(gt+r.length),s=new Uint8Array(e.length),y=0;y<r.length;y++)e[y+gt]=r[y];return e.length<32||pt(s,e,e.length,a,i)!==0?null:s.subarray(At)},n.secretbox.keyLength=wn,n.secretbox.nonceLength=Ht,n.secretbox.overheadLength=gt,n.scalarMult=function(r,a){if($e(r,a),r.length!==Xt)throw new Error("bad n size");if(a.length!==zt)throw new Error("bad p size");var i=new Uint8Array(zt);return $(i,r,a),i},n.scalarMult.base=function(r){if($e(r),r.length!==Xt)throw new Error("bad n size");var a=new Uint8Array(zt);return Q(a,r),a},n.scalarMult.scalarLength=Xt,n.scalarMult.groupElementLength=zt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){$e(r,a),Zr(r,a);var i=new Uint8Array(vn);return ke(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Bt),a=new Uint8Array(Nt);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if($e(r),r.length!==Nt)throw new Error("bad secret key size");var a=new Uint8Array(Bt);return Q(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Bt,n.box.secretKeyLength=Nt,n.box.sharedKeyLength=vn,n.box.nonceLength=Xn,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if($e(r,a),a.length!==bt)throw new Error("bad secret key size");var i=new Uint8Array(Ye+r.length);return Hn(i,r,r.length,a),i},n.sign.open=function(r,a){if($e(r,a),a.length!==st)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=mn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),y=0;y<s.length;y++)s[y]=i[y];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ye),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if($e(r,a,i),a.length!==Ye)throw new Error("bad signature size");if(i.length!==st)throw new Error("bad public key size");var e=new Uint8Array(Ye+r.length),s=new Uint8Array(Ye+r.length),y;for(y=0;y<Ye;y++)e[y]=a[y];for(y=0;y<r.length;y++)e[y+Ye]=r[y];return mn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(st),a=new Uint8Array(bt);return gn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if($e(r),r.length!==bt)throw new Error("bad secret key size");for(var a=new Uint8Array(st),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if($e(r),r.length!==_n)throw new Error("bad seed size");for(var a=new Uint8Array(st),i=new Uint8Array(bt),e=0;e<32;e++)i[e]=r[e];return gn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=st,n.sign.secretKeyLength=bt,n.sign.seedLength=_n,n.sign.signatureLength=Ye,n.hash=function(r){$e(r);var a=new Uint8Array(Sn);return at(a,r,r.length),a},n.hash.hashLength=Sn,n.verify=function(r,a){return $e(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,y=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(y.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=y[s];Zn(y)})}else typeof Fi<"u"&&(r=Wi,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,y=r.randomBytes(e);for(s=0;s<e;s++)i[s]=y[s];Zn(y)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(zn)),zn.exports}var qi=Yi();const Ki=Ri(qi);function Hi(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const v=t.charAt(x),b=v.charCodeAt(0);if(n[b]!==255)throw new TypeError(v+" is ambiguous");n[b]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),d=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let v=0,b=0,C=0;const R=x.length;for(;C!==R&&x[C]===0;)C++,v++;const G=(R-C)*d+1>>>0,A=new Uint8Array(G);for(;C!==R;){let ge=x[C],he=0;for(let ye=G-1;(ge!==0||he<b)&&ye!==-1;ye--,he++)ge+=256*A[ye]>>>0,A[ye]=ge%o>>>0,ge=ge/o>>>0;if(ge!==0)throw new Error("Non-zero carry");b=he,C++}let F=G-b;for(;F!==G&&A[F]===0;)F++;let ae=l.repeat(v);for(;F<G;++F)ae+=t.charAt(A[F]);return ae}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let v=0,b=0,C=0;for(;x[v]===l;)b++,v++;const R=(x.length-v)*c+1>>>0,G=new Uint8Array(R);for(;v<x.length;){const ge=x.charCodeAt(v);if(ge>255)return;let he=n[ge];if(he===255)return;let ye=0;for(let fe=R-1;(he!==0||ye<C)&&fe!==-1;fe--,ye++)he+=o*G[fe]>>>0,G[fe]=he%256>>>0,he=he/256>>>0;if(he!==0)throw new Error("Non-zero carry");C=ye,v++}let A=R-C;for(;A!==R&&G[A]===0;)A++;const F=new Uint8Array(b+(R-A));let ae=b;for(;A!==R;)F[ae++]=G[A++];return F}function h(x){const v=p(x);if(v)return v;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:h}}var Xi="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const sr=Hi(Xi),Yn="cbsgo_wallet_v3",dn="cbsgo_wallet_unlocked_v3";function Wt(){try{const t=localStorage.getItem(Yn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function Vi(t){localStorage.setItem(Yn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function Zi(){const t=Ki.sign.keyPair(),n=sr.encode(t.publicKey),o=sr.encode(t.secretKey);return{pk:n,sk:o}}function jr(){return!!Wt()}function Ji(){return Wt()?sessionStorage.getItem(dn)==="1":!1}function Qi(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");Wt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=Zi();return Vi({pk:l,sk:c,pin:n}),sessionStorage.setItem(dn,"1"),l}function ea(t){const n=Wt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(dn,"1"),n.pk}function tt(){const t=Wt();return t?t.pk:""}function ta(){localStorage.removeItem(Yn),sessionStorage.removeItem(dn)}typeof window<"u"&&(window.cbsgoDevResetWallet=ta);const Rr="cbsgoLoginModal";function Ur(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Fr(){const t=document.getElementById(Rr);t&&t.remove()}function na(t){Fr();const n=document.createElement("div");return n.id=Rr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function ra(t,n){return`
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
      ">${Ur(t)}</div>

      <div style="padding:14px 16px;">
        ${n}
      </div>
    </div>
  `}function Vt(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function lr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function oa(){const t=!jr();let n="";try{const v=Gt();t?v&&v!=="Sovereign"?n=v:n="":n=v||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Ur(n)}" style="${Vt()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Vt()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${Vt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${lr(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Vt()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${lr(!0)}">Unlock</button>
      </div>
    `,l=na(ra(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),d=v=>{c&&(c.textContent=v||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),h=l.querySelector("#cbsgoNick"),x=()=>{Fr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const v=l.querySelector("#cbsgoCreateBtn");v&&(v.onclick=async()=>{try{const b=String(h?.value||"").trim(),C=String(u?.value||"").trim(),R=String(p?.value||"").trim();if(b.length<2)return d("⛔ Nickname too short.");if(C.length<4)return d("⛔ PIN must be at least 4 digits.");if(C!==R)return d("⛔ PINs do not match.");d("Creating wallet…"),Nr(b),await Qi(C),d("✅ Wallet created. Starting…"),x()}catch(b){d(`⛔ ${String(b?.message||b)}`)}})}else{const v=l.querySelector("#cbsgoUnlockBtn");v&&(v.onclick=async()=>{try{const b=String(u?.value||"").trim();if(b.length<4)return d("⛔ PIN must be at least 4 digits.");d("Unlocking…"),await ea(b),d("✅ Unlocked."),x()}catch{d("⛔ Wrong PIN (or wallet data missing).")}})}}const ia="https://cxfedvowjgkqrakkkjpi.supabase.co",aa="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",De=Jr(ia,aa);function sa(){const t=tt();if(!t)return null;const n=Gt(),o=Dn();return{wallet_pk:t,nickname:n,avatar:o}}async function tn(t={}){try{const n=sa();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await De.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const la=15e3,fa=1e4,ca=300*1e3;let Pt=null,fr=0,cr=0;function da(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",da));async function pa(){const t=tt();if(!t||!Pt)return;const n=Date.now();if(n-fr<5e3)return;fr=n;const l=(Gt()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:d,error:u}=await De.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(d&&d.length>0){const p=d[0].id,{error:h}=await De.from("player_state").update(c).eq("id",p);h&&console.warn("CBS GO: player_state update failed",h)}else{const{error:p}=await De.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(d){console.warn("CBS GO: pushMyState error",d)}}async function ua(){const t=tt();if(!t)return;const n=Date.now();if(n-cr<3e3)return;cr=n;const o=new Date(Date.now()-ca).toISOString();try{const{data:l,error:c}=await De.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const d=Array.isArray(l)?l:[],u=Array.from(new Set(d.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:v}=await De.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);v?console.warn("CBS GO: fetch player profiles failed",v):Array.isArray(x)&&(p=new Map(x.map(b=>[b.wallet_pk,b])))}const h=d.map(x=>{const v=x.lat,b=x.lng,C=typeof v=="number"?v:parseFloat(v),R=typeof b=="number"?b:parseFloat(b);if(!Number.isFinite(C)||!Number.isFinite(R))return null;const G=p.get(x.wallet_pk)||null,A=G&&G.nickname||x.nickname||"Anon",F=G&&G.avatar?String(G.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:F,lat:C,lng:R,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:h}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function xa(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{pa()},la),setInterval(()=>{ua()},fa))}xa();function Dr(){const t=tt();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function an(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function ya(t){const n=Dr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await De.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw an("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function ga(t){const n=Dr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await De.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw an("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function ba(){const t=tt();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await De.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw an("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],d=[];for(const p of l){const h=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!h&&!x)continue;const v=p.a_wallet===t?p.b_wallet:p.a_wallet,b={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:v,nickname:null,avatar:""};h&&c.push(b),x&&d.push(b)}const u=Array.from(new Set([...c,...d].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:h}=await De.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!h&&Array.isArray(p)){const x=new Map;for(const b of p)b.wallet_pk&&x.set(String(b.wallet_pk),{nickname:b.nickname||null,avatar:b.avatar||""});const v=b=>{b.forEach(C=>{const R=x.get(C.otherWallet);R&&(C.nickname=R.nickname||null,C.avatar=R.avatar||"")})};v(c),v(d)}else h&&an("loadFriendsOverview:players",h)}return{incoming:c,accepted:d}}let Ot=null;async function Gr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Ot=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Ot.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function ha(){try{Ot&&(await Ot.release(),Ot=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function ma(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Gr():await ha()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function dt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Wr(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}function pn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function On(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function dr(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${dt(t)}</div>
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
  `}function wa(){const t=Gt(),n=Dn(),o=tt();return`
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
        ${Wr(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${dt(t)}" maxlength="24" style="
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
                    ${dt(o)}
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
  `}function va(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const F=document.querySelector("#profileMsg");F&&(F.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const d=()=>{if(!t)return;const A=Nr(t.value);c(`✅ Name saved: ${A}`);try{tn()}catch(F){console.warn("CBS GO: failed to sync profile after name change",F)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(d,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),d()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const F=new FileReader;F.onload=()=>{Vo(String(F.result||"")),c("✅ Photo saved"),Et();try{tn()}catch(ae){console.warn("CBS GO: failed to sync profile after avatar change",ae)}},F.onerror=()=>c("⛔ Failed to read image."),F.readAsDataURL(A)}),o&&(o.onclick=()=>{Zo(),c("✅ Photo removed"),Et();try{tn()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),h=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),v=document.querySelector("#friendsAcceptedList"),b=A=>{h&&(h.textContent=A||"")},C=A=>{if(!A)return"";const F=String(A);return F.length<=12?F:`${F.slice(0,5)}…${F.slice(-4)}`},R=(A,F="")=>{const ae=A.nickname&&A.nickname.trim()?A.nickname.trim():C(A.otherWallet),ge=C(A.otherWallet);return`
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
          ${Wr(A.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${dt(ae||"Friend")}
            </div>
            ${ge?`<div style="font-size:11px;opacity:.7;">${dt(ge)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${F||""}
        </div>
      </div>
    `};async function G(){if(!(!x||!v))try{x.textContent="Loading…",v.textContent="Loading…";const A=await ba();A.incoming.length?x.innerHTML=A.incoming.map(F=>{const ae=`
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${F.id}"
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
            `;return R(F,ae)}).join(""):x.textContent="No incoming requests.",A.accepted.length?v.innerHTML=A.accepted.map(F=>R(F,`
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
            `)).join(""):v.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(F=>{F.addEventListener("click",async()=>{const ae=F.getAttribute("data-friend-id");if(ae){b("Accepting friend…"),F.disabled=!0;try{await ga(ae),b("✅ Friend added."),await G()}catch(ge){console.warn(ge),b(`⛔ ${ge.message||ge}`),F.disabled=!1}}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",v.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){b("Enter a wallet address first.");return}b("Sending friend request…"),p.disabled=!0;try{await ya(A),b("✅ Friend request sent."),u.value="",await G()}catch(F){console.warn(F),b(`⛔ ${F.message||F}`)}finally{p.disabled=!1}}),G().catch(()=>{})}function _a(){const t=uo(),n=xo(),o=tt();return`
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
                ${dt(o)}
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
    </section>
  `}function Sa(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{ji()}catch(d){console.warn("CBS GO: openCardsPanel failed",d)}});const l=tt();if(!t||!l)return;const c=d=>{n&&(n.textContent=d||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),c("✅ Wallet address copied to clipboard.")):c("📋 Copy not supported in this browser.")}catch{c("⛔ Failed to copy address.")}}}function Yr(){const t=pn();return t==="profile"?dr("Profile",`<div id="profileMount">${wa()}</div>`):t==="bag"?dr("Bag",`<div id="bagMount">${_a()}</div>`):""}function ka(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Li()}
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
          ${Lr()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Ar()}
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
        ${Yr()}
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

      ${zr()?`<button id="resetBtn" type="button" style="
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Yr();const n=pn();n==="profile"&&va(),n==="bag"&&Sa();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{On("map"),Et()})}function Ca(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=pn();On(o===n?"map":n||"map"),Et()})})}function pr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=ka();try{Gr(),ma()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{tn()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Ca(),Ni(),Ho(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Ar())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Lr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{pn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let h=p.querySelector(".cbsgoToastBox");h||(h=document.createElement("div"),h.className="cbsgoToastBox",h.style.pointerEvents="auto",h.style.padding="8px 12px",h.style.borderRadius="999px",h.style.border="1px solid rgba(255,255,255,.25)",h.style.background="rgba(10,12,18,.88)",h.style.backdropFilter="blur(10px)",h.style.color="#fff",h.style.fontFamily="system-ui,sans-serif",h.style.fontSize="11px",h.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",h.style.opacity="0",h.style.transform="translateY(10px)",h.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(h)),h.textContent=u||"",h.style.opacity="1",h.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{h.style.opacity="0",h.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},h=Number(p.xp||0),x=Number(p.tickets||0),v=Number(p.cbs||0);if(!h&&!x&&!v)return;const b=[];h&&b.push(`+${h} XP`),x&&b.push(`+${x} ticket${x===1?"":"s"}`),v&&b.push(`+${v} CBS`);let C="Walking reward";p.reason==="boost"?C="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?C="Treasure reward":p.reason==="distance"&&(C="Distance reward"),o(`${C}: ${b.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const h=Number(u?.steps||0),x=Number(u?.goal||0),v=u?.dayKey||"",b=document.createElement("div");b.style.position="fixed",b.style.inset="0",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.background="rgba(5,7,11,0.80)",b.style.pointerEvents="auto";const C=document.createElement("div");C.style.width="min(340px, 92vw)",C.style.borderRadius="22px",C.style.border="1px solid rgba(56,189,248,.85)",C.style.background="rgba(10,12,18,0.98)",C.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",C.style.padding="20px 18px 16px 18px",C.style.textAlign="center",C.style.color="#fff",C.style.fontFamily="system-ui,sans-serif",C.style.opacity="0",C.style.transform="translateY(14px) scale(0.96)",C.style.transition="opacity .25s ease-out, transform .25s ease-out";const R=x?`${h}/${x} steps`:`${h} steps`;C.innerHTML=`
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
        ${R}
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
    `,b.appendChild(C),p.appendChild(b),requestAnimationFrame(()=>{C.style.opacity="1",C.style.transform="translateY(0) scale(1)"});const G=()=>{C.style.opacity="0",C.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=G),b.addEventListener("click",F=>{F.target===b&&G()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const h=Number(u?.xp||0),x=Number(u?.tickets||0),v=Number(u?.cbs||0);if(!h&&!x&&!v)return;p.innerHTML="";const b=document.createElement("div");b.style.position="fixed",b.style.inset="0",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.background="rgba(5,7,11,0.75)",b.style.pointerEvents="auto";const C=document.createElement("div");C.style.width="min(320px, 90vw)",C.style.borderRadius="22px",C.style.border="1px solid rgba(255,255,255,.4)",C.style.background="rgba(10,12,18,0.96)",C.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",C.style.padding="18px 18px 16px 18px",C.style.textAlign="center",C.style.color="#fff",C.style.fontFamily="system-ui,sans-serif",C.style.opacity="0",C.style.transform="translateY(12px) scale(0.97)",C.style.transition="opacity .25s ease-out, transform .25s ease-out";const R=[];h&&R.push(`+${h} XP`),x&&R.push(`+${x} ticket${x===1?"":"s"}`),v&&R.push(`+${v} CBS`),C.innerHTML=`
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
        ${dt(R.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,b.appendChild(C),p.appendChild(b),requestAnimationFrame(()=>{C.style.opacity="1",C.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{C.style.opacity="0",C.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function d(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const h=Number(u?.days||7),x=Number(u?.rewardCbs||0),v=document.createElement("div");v.style.position="fixed",v.style.inset="0",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.background="rgba(5,7,11,0.80)",v.style.pointerEvents="auto";const b=document.createElement("div");b.style.width="min(340px, 92vw)",b.style.borderRadius="22px",b.style.border="1px solid rgba(251,191,36,.85)",b.style.background="rgba(10,12,18,0.98)",b.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",b.style.padding="20px 18px 16px 18px",b.style.textAlign="center",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.opacity="0",b.style.transform="translateY(14px) scale(0.96)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",b.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${h}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${h} days in a row.
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
    `,v.appendChild(b),p.appendChild(v),requestAnimationFrame(()=>{b.style.opacity="1",b.style.transform="translateY(0) scale(1)"});const C=()=>{b.style.opacity="0",b.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},R=document.getElementById("cbsgoStreakCloseBtn");R&&(R.onclick=C),v.addEventListener("click",G=>{G.target===v&&C()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{d(u?.detail||{})})),Et(),zr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",Xo)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Nn({id:"__daily__",name:"Daily Glow"});return}if(hr(p))return;const h=io.find(x=>x.id===p);h&&Nn(h)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&to(async()=>{const{completeNode:h}=await Promise.resolve().then(()=>lo);return{completeNode:h}},void 0).then(({completeNode:h})=>{h(p),qr()})}))}function qr(){if(!document.querySelector("#app"))return;if(jr()&&Ji()){pr();return}oa();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),pr()};window.addEventListener("cbsgo:loginDone",n)}function Kr(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function sn(t){const n=Kr();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";sn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{sn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function ur(){try{if(!document.getElementById("app")){sn("❌ #app not found in index.html");return}qr();const n=Kr();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){sn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ur,{once:!0}):ur();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
