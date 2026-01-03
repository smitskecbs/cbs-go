import{createClient as io}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))l(f);new MutationObserver(f=>{for(const c of f)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function o(f){const c={};return f.integrity&&(c.integrity=f.integrity),f.referrerPolicy&&(c.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?c.credentials="include":f.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(f){if(f.ep)return;f.ep=!0;const c=o(f);fetch(f.href,c)}})();const ao="modulepreload",so=function(e){return"/cbs-go/"+e},rr={},lo=function(n,o,l){let f=Promise.resolve();if(o&&o.length>0){let _=function(p){return Promise.all(p.map(u=>Promise.resolve(u).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),b=g?.nonce||g?.getAttribute("nonce");f=_(o.map(p=>{if(p=so(p),p in rr)return;rr[p]=!0;const u=p.endsWith(".css"),x=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${x}`))return;const C=document.createElement("link");if(C.rel=u?"stylesheet":ao,u||(C.as="script"),C.crossOrigin="",C.href=p,b&&C.setAttribute("nonce",b),document.head.appendChild(C),u)return new Promise((z,v)=>{C.addEventListener("load",z),C.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${p}`)))})}))}function c(g){const b=new Event("vite:preloadError",{cancelable:!0});if(b.payload=g,window.dispatchEvent(b),!b.defaultPrevented)throw g}return f.then(g=>{for(const b of g||[])b.status==="rejected"&&c(b.reason);return n().catch(c)})},Tn="cbsgoLevelUpOverlay",or="cbsgoLevelUpStyles",Mn="https://smitskecbs.github.io/cbs-go/";function co(){if(document.getElementById(or))return;const e=document.createElement("style");e.id=or,e.textContent=`
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
  `,document.head.appendChild(e)}function Ln(){const e=document.getElementById(Tn);e&&e.remove()}function fo(e){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const f=document.createElement("div");f.className="cbsgoConfettiPiece";const c=10+Math.random()*80,g=Math.random()*.6,b=1+Math.random()*.8;f.style.left=`${c}%`,f.style.top="-10px",f.style.background=n[Math.floor(Math.random()*n.length)],f.style.animationDelay=`${g}s`,f.style.animationDuration=`${b}s`,e.appendChild(f),setTimeout(()=>f.remove(),(g+b+.3)*1e3)}}function ir(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function po(e){co(),Ln();const n=Number(e?.from||1),o=Number(e?.to||n+1),l=document.createElement("div");l.id=Tn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
  `,document.body.appendChild(l);const f=l.querySelector("#cbsgoLevelUpConfettiHost");f&&fo(f);const c=()=>Ln(),g=l.querySelector("#cbsgoLevelUpClose"),b=l.querySelector("#cbsgoLevelUpContinue"),_=l.querySelector("#cbsgoLevelUpShareX"),p=l.querySelector("#cbsgoLevelUpCopyLink"),u=l.querySelector("#cbsgoLevelUpMsg");g&&(g.onclick=c),b&&(b.onclick=c),_&&(_.onclick=()=>{const x=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Mn}`,C=`https://twitter.com/intent/tweet?text=${encodeURIComponent(x)}`;window.open(C,"_blank","noopener,noreferrer")}),p&&(p.onclick=async()=>{try{await navigator.clipboard.writeText(Mn),u&&(u.textContent="✅ Link copied. Share it with your friends.")}catch{u&&(u.textContent="Could not copy link. You can share it manually: "+Mn)}}),setTimeout(()=>{document.getElementById(Tn)&&Ln()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",e=>{po(e?.detail||{})}));const uo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],hr="cbsgo_state_v6";function xo(e,n){try{const o=JSON.parse(e);return o&&typeof o=="object"?o:n}catch{return n}}function yo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ue(){const e=localStorage.getItem(hr);return xo(e,yo())}function wr(e){e.updatedAt=Date.now(),localStorage.setItem(hr,JSON.stringify(e))}function Un(e){return 100+(Math.max(1,Number(e||1))-1)*40}function dn(){return Number(Ue().xp||0)}function Ge(){const e=dn();let n=1,o=e;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function vr(){const e=dn();let n=1,o=e;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function _r(){return Un(Ge())}function De(e){const n=Number(e||0);if(!Number.isFinite(n)||n<=0)return Ue();const o=Ge(),l=Ue();l.xp=Number(l.xp||0)+n,wr(l);const f=Ge();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:f}})),f>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:f,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:f,xp:l.xp}}))),l}function Sr(e){const n=String(e||"");if(!n)return!1;const o=Ue();return!!(o.completed&&o.completed[n])}function kr(e){const n=String(e||"");if(!n)return;const o=Ue();o.completed||(o.completed={}),o.completed[n]=Date.now(),wr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const go=Object.freeze(Object.defineProperty({__proto__:null,addXp:De,completeNode:kr,getLevel:Ge,getXp:dn,getXpIntoLevel:vr,getXpNeededThisLevel:_r,isNodeCompleted:Sr},Symbol.toStringTag,{value:"Module"})),Cr="cbsgoPuzzleModal";function bo(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function An(){const e=document.getElementById(Cr);e&&e.remove()}function $n(e){An();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],f=["🍬","💎","⭐","🍀","🔮"],c=180,g=18,b=l.length,_=.01;let p=[],u=null,x=0,C=g,z=!1,v=!1,S=null;const Y=e?.name||"CBS GO Puzzle",U=document.createElement("div");U.id=Cr,U.style.position="fixed",U.style.inset="0",U.style.zIndex="999999",U.style.display="flex",U.style.alignItems="center",U.style.justifyContent="center",U.style.padding="16px",U.style.background="rgba(0,0,0,.70)",U.style.backdropFilter="blur(12px)",U.style.fontFamily="system-ui, sans-serif",U.style.color="#fff",U.innerHTML=`
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
          ${bo(Y)}
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
          <div>Target: <span id="cbsgoTargetScore">${c}</span></div>
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
  `,document.body.appendChild(U);const H=document.getElementById("cbsgoBoard"),q=document.getElementById("cbsgoScore"),W=document.getElementById("cbsgoMoves"),it=document.getElementById("cbsgoStatus"),Mt=document.getElementById("cbsgoPuzzleClose"),Dt=document.getElementById("cbsgoPuzzleOk"),Rt=document.getElementById("cbsgoConfettiLayer");function Tt(R){it&&(it.textContent=R||"")}function ie(){if(!Rt)return;Rt.style.display="block",Rt.innerHTML="";const R=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],K=40;for(let X=0;X<K;X++){const O=document.createElement("div"),rt=6+Math.floor(Math.random()*6),ht=Math.random()*100,kt=Math.random()*.6,Ct=1+Math.random()*.6,ge=Math.random()*360;O.style.position="absolute",O.style.top="-10%",O.style.left=`${ht}%`,O.style.width=`${rt}px`,O.style.height=`${rt*2}px`,O.style.background=R[X%R.length],O.style.opacity="0.9",O.style.borderRadius="2px",O.style.transform=`rotate(${ge}deg)`,O.style.animation=`cbsgoConfettiFall ${Ct}s ease-out ${kt}s forwards`,Rt.appendChild(O)}}function ae(){return Math.floor(Math.random()*l.length)}function Ae(){p=[];for(let R=0;R<n;R++){const K=[];for(let X=0;X<o;X++)Math.random()<_?K.push(b):K.push(ae());p.push(K)}}function se(R){return R===b}function $t(){if(H){H.innerHTML="";for(let R=0;R<n;R++)for(let K=0;K<o;K++){const X=p[R][K],O=document.createElement("div");O.dataset.row=String(R),O.dataset.col=String(K),O.style.borderRadius="12px",O.style.display="flex",O.style.alignItems="center",O.style.justifyContent="center",O.style.cursor=v?"default":"pointer",O.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",O.style.fontSize="20px",se(X)?(O.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",O.textContent="💥"):(O.style.background=l[X]||"#444",O.textContent=f[X]||"⬛"),u&&u.row===R&&u.col===K&&(O.style.outline="2px solid #fff",O.style.outlineOffset="2px"),O.addEventListener("click",()=>{Ot(R,K)}),O.addEventListener("touchstart",rt=>{if(v)return;const ht=rt.touches[0];S={row:R,col:K,x:ht.clientX,y:ht.clientY}}),O.addEventListener("touchend",rt=>{if(!S||v)return;const ht=rt.changedTouches[0],kt=ht.clientX-S.x,Ct=ht.clientY-S.y;if(Math.sqrt(kt*kt+Ct*Ct)<18){Ot(R,K),S=null;return}let Yt=S.row,te=S.col;Math.abs(kt)>Math.abs(Ct)?kt>0?te+=1:te-=1:Ct>0?Yt+=1:Yt-=1,Yt>=0&&Yt<n&&te>=0&&te<o&&Pt(S.row,S.col,Yt,te),S=null,rt.preventDefault()}),H.appendChild(O)}}}function ue(R,K){if(!R||!K)return!1;const X=Math.abs(R.row-K.row),O=Math.abs(R.col-K.col);return X+O===1}function Ut(R,K){const X=p[R.row][R.col];p[R.row][R.col]=p[K.row][K.col],p[K.row][K.col]=X}function xe(){const R=new Set;for(let K=0;K<n;K++){let X=p[K][0],O=0;for(let rt=1;rt<=o;rt++){const ht=rt<o?p[K][rt]:null;if(ht===X)continue;const kt=rt-O;if(X!=null&&kt>=3)for(let Ct=O;Ct<rt;Ct++)R.add(`${K},${Ct}`);X=ht,O=rt}}for(let K=0;K<o;K++){let X=p[0][K],O=0;for(let rt=1;rt<=n;rt++){const ht=rt<n?p[rt][K]:null;if(ht===X)continue;const kt=rt-O;if(X!=null&&kt>=3)for(let Ct=O;Ct<rt;Ct++)R.add(`${Ct},${K}`);X=ht,O=rt}}return R}function Ht(R){if(!R||!R.size)return 0;const K=R.size;x+=K*4,q&&(q.textContent=String(x)),!v&&x>=c&&ye(!0);for(const X of R){const[O,rt]=X.split(","),ht=Number(O),kt=Number(rt);p[ht][kt]=null}for(let X=0;X<o;X++){let O=n-1;for(let rt=n-1;rt>=0;rt--)p[rt][X]!=null&&(p[O][X]=p[rt][X],O--);for(let rt=O;rt>=0;rt--)Math.random()<_?p[rt][X]=b:p[rt][X]=ae()}return K}function Jt(R,K){const X=new Set;for(let O=0;O<o;O++)X.add(`${R},${O}`);for(let O=0;O<n;O++)X.add(`${O},${K}`);Ht(X),$t(),v||setTimeout(()=>ze(!1),120)}function ze(R=!1){if(v)return;z=!0;const K=()=>{if(v){z=!0;return}const X=xe();if(!X.size){z=!1,$t(),R&&!v&&(C<=0?Kt():Tt("Nice! Keep matching."));return}Ht(X),$t(),setTimeout(K,120)};K()}function ye(R){if(!v)if(v=!0,z=!0,R){Tt("Great job! Puzzle completed 🎉");try{e?.id&&kr(e.id),De(10)}catch{}ie(),setTimeout(()=>{An()},1600)}else Tt("Out of moves. Try again next time 🙂")}function Kt(){x>=c?ye(!0):C<=0&&ye(!1)}function Pt(R,K,X,O){if(z||v)return;if(C<=0){Kt();return}const rt={row:R,col:K},ht={row:X,col:O};if(!ue(rt,ht))return;const kt=p[R][K],Ct=p[X][O],ge=se(kt)||se(Ct);if(Ut(rt,ht),u=null,C--,W&&(W.textContent=String(C)),ge){$t();const Yt=se(p[R][K])?{row:R,col:K}:{row:X,col:O};Jt(Yt.row,Yt.col),Kt();return}if(!xe().size){Ut(rt,ht),$t(),Tt("No match… try another swap."),Kt();return}Tt(""),$t(),ze(!0)}function Ot(R,K){if(z||v)return;if(C<=0){Kt();return}const X={row:R,col:K};if(!u){u=X,$t();return}if(u.row===R&&u.col===K){u=null,$t();return}if(!ue(u,X)){u=X,$t();return}Pt(u.row,u.col,X.row,X.col)}function pt(){An()}Mt&&(Mt.onclick=pt),Dt&&(Dt.onclick=()=>{pt()}),Ae(),$t(),Tt("Tap or swipe two neighboring tiles to swap them.")}const Er="cbsgo_inventory_v2";function mo(e,n){try{const o=JSON.parse(e);return o&&typeof o=="object"?o:n}catch{return n}}function ho(){return{tickets:0,cbs:0,cards:{}}}function It(){const e=localStorage.getItem(Er),n=mo(e,ho());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Me(e){const n={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0),cards:e.cards&&typeof e.cards=="object"?e.cards:{}};localStorage.setItem(Er,JSON.stringify(n))}function Mr(){return Number(It().tickets||0)}function Lr(){return Number(It().cbs||0)}function Le(e=1){const n=Number(e||0);if(!Number.isFinite(n)||n<=0)return It();const o=It();return o.tickets=Number(o.tickets||0)+n,Me(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function pn(e=1){const n=Number(e||0);if(!Number.isFinite(n)||n<=0)return It();const o=It();return o.cbs=Number(o.cbs||0)+n,Me(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function wo(e=1){const n=Number(e||0);if(!Number.isFinite(n)||n<=0)return It();const o=It(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,Me(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function vo(e=1){const n=Number(e||0);if(!Number.isFinite(n)||n<=0)return It();const o=It(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,Me(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function Ar(){return{...It().cards||{}}}function _o(e){const n=String(e||"").trim();if(!n)return 0;const o=Ar();return Number(o[n]||0)}function zr(e,n=1){const o=String(e||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return It();const f=It();return f.cards||(f.cards={}),f.cards[o]=Number(f.cards[o]||0)+l,Me(f),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...f}})),f}function So(e,n=1){const o=String(e||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return It();const f=It();if(!f.cards||typeof f.cards[o]!="number")throw new Error("Not enough of that card in your collection.");const c=Number(f.cards[o]||0);if(c<l)throw new Error("Not enough of that card in your collection.");return f.cards[o]=c-l,f.cards[o]<=0&&delete f.cards[o],Me(f),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...f}})),f}const Nr="cbsgo_steps_v6",ko="cbsgo_steps_v5",Co="cbsgo_gps_autostart_v2",Br="cbsgo_daily_puzzle_v1",Eo=.75,ke=5e3,an=7,Pn=100,Mo=1e3,Lo=.5,Ao=2e3,zo=4.5,zn=1500,Nn=200,No=.25,Bo=.05,Io=.3;let tn=null,en=!1,he={msg:"init"};function On(e,n){try{const o=JSON.parse(e);return o&&typeof o=="object"?o:n}catch{return n}}const Ir="cbsgo_cards_v1",To=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function $o(e){if(!e)return null;const n=String(e);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Po(e){return To.find(n=>n.id===e)||{id:e,name:e,emoji:"🃏",rarity:"common"}}function Oo(){try{const e=localStorage.getItem(Ir),n=On(e,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,f]of Object.entries(n))if(f&&typeof f=="object"&&"count"in f){const c=Number(f.count);Number.isFinite(c)&&c>0&&(o[l]=c)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function jo(e){try{const n=e&&e.counts&&typeof e.counts=="object"?e.counts:{},o={};for(const[f,c]of Object.entries(n)){const g=Number(c||0);Number.isFinite(g)&&g>0&&(o[f]=g)}const l={counts:o};localStorage.setItem(Ir,JSON.stringify(l))}catch{}}function Ro(e,n=1){const o=$o(e);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const c={...Oo().counts||{}},b=Number(c[o]||0)+l;c[o]=b,jo({counts:c});const _=Po(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:c}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:b,card:_}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:_}}))}catch{}return{cardId:o,count:b,card:_}}function oe(){const e=new Date,n=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Fo(e){if(!e||typeof e!="string")return null;const n=e.split("-").map(Number);if(n.length!==3)return null;const[o,l,f]=n,c=new Date(o,l-1,f);return Number.isNaN(c.getTime())?null:c}function Uo(e){const n=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Tr(e,n){const o=Fo(e);if(!o)return[];const l=[];for(let f=n-1;f>=0;f--){const c=new Date(o.getTime());c.setDate(c.getDate()-f),l.push(Uo(c))}return l}function sn(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:oe(),daySteps:0,dayMeters:0,dailyGoalSteps:ke,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Go(e){const n=oe();return!e||typeof e!="object"?sn():(typeof e.steps!="number"&&(e.steps=0),typeof e.meters!="number"&&(e.meters=0),typeof e.chestMeters!="number"&&(e.chestMeters=0),typeof e.xpKmAwarded!="number"&&(e.xpKmAwarded=0),typeof e.ticketChunksAwarded!="number"&&(e.ticketChunksAwarded=0),typeof e.totalMeters!="number"&&(e.totalMeters=Number(e.meters||0)),typeof e.dailyVersion!="number"||e.dailyVersion<1?(e.dayKey||(e.dayKey=n),typeof e.daySteps!="number"&&(e.daySteps=e.steps||0),typeof e.dayMeters!="number"&&(e.dayMeters=e.meters||0),(typeof e.dailyGoalSteps!="number"||e.dailyGoalSteps<=0)&&(e.dailyGoalSteps=ke),typeof e.dailyGoalReached!="boolean"&&(e.dailyGoalReached=!1),(!e.streak||typeof e.streak!="object")&&(e.streak={}),typeof e.lastStreakRewardDate!="string"&&(e.lastStreakRewardDate=null),e.dailyVersion=1):(e.dayKey||(e.dayKey=n),typeof e.daySteps!="number"&&(e.daySteps=0),typeof e.dayMeters!="number"&&(e.dayMeters=0),(typeof e.dailyGoalSteps!="number"||e.dailyGoalSteps<=0)&&(e.dailyGoalSteps=ke),typeof e.dailyGoalReached!="boolean"&&(e.dailyGoalReached=!1),(!e.streak||typeof e.streak!="object")&&(e.streak={}),typeof e.lastStreakRewardDate!="string"&&(e.lastStreakRewardDate=null)),e)}function un(e){e.updatedAt=Date.now(),localStorage.setItem(Nr,JSON.stringify(e))}function Wo(e,n){if(!n)return;const o=Tr(n,an);!o.length||!o.every(f=>!!e.streak[f])||e.lastStreakRewardDate!==n&&(pn(Pn),Ye(),e.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:an,rewardCbs:Pn,lastDayKey:n}})))}function ar(e){e=Go(e||sn());const n=oe();if(e.dayKey!==n){const o=e.dayKey;o&&(e.streak||(e.streak={}),e.streak[o]=!!e.dailyGoalReached,Wo(e,o)),e.dayKey=n,e.daySteps=0,e.dayMeters=0,e.dailyGoalReached=!1,un(e)}return e}function pe(){let e=localStorage.getItem(Nr);if(!e){const o=localStorage.getItem(ko);if(o){const l=On(o,sn()),f=ar(l);return un(f),f}}const n=On(e,sn());return ar(n)}function nn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Do()}}))}function Gn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Ye(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Wn(e,n,o,l){const f=Number(e||0),c=Number(n||0),g=0;if(!(!f&&!c&&!g))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:f,tickets:c,cbs:g,reason:l||"distance"}}))}catch{}}function Do(){const e=pe();return Number(e.daySteps!=null?e.daySteps:e.steps||0)}function Yo(){const e=pe(),n=e.dayMeters!=null?e.dayMeters:e.meters||0;return Number(n||0)}function qo(){return Yo()/1e3}function Ho(){const e=pe(),n=Number(e.daySteps!=null?e.daySteps:e.steps||0),o=Number(e.dailyGoalSteps||ke),l=!!e.dailyGoalReached,f=e.dayKey||oe(),c=e.streak||{},b=Tr(f,an).map(_=>{let p=!1;return _===f?p=l:p=!!c[_],{dateKey:_,reached:p}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:b,todayKey:f,streakLength:an,rewardPerStreak:Pn}}function sr(){return!!en}function Ko(){try{return localStorage.getItem(Br)===oe()}catch{return!1}}function Xo(){try{localStorage.setItem(Br,oe())}catch{}}function Vo(e,n){return Ko()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:n,date:oe()}})),Xo(),!0)}function lr(){const e=pe(),n=Number(e.boostUntil||0);return Math.max(0,n-Date.now())}function Zo(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const o=Number(e.boostLastStep||0),l=Number(e.steps||0);if(!Number.isFinite(o)){e.boostLastStep=l;return}const f=l-o;if(!Number.isFinite(f)||f<zn)return;const c=Math.floor(f/zn);c<=0||(Le(c),Ye(),Wn(0,c,0,"boost"),e.boostLastStep=o+c*zn)}function Qo(e){let n=Number(e.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Nn){e.chestMeters=n;return}let o=0;for(;n>=Nn&&o<5;)if(n-=Nn,o+=1,Math.random()<No){const l=Math.random()<Bo,f=l?10:3,c=l?2:1;De(f),Gn(),Le(c),Ye();const g=l&&Math.random()<Io;Wn(f,c,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:f,tickets:c,rare:l,hasCBSFlag:g}}));break}e.chestMeters=n}function Jo(e,n){const l=p=>p*Math.PI/180,f=l(n.lat-e.lat),c=l(n.lng-e.lng),g=l(e.lat),b=l(n.lat),_=Math.sin(f/2)**2+Math.cos(g)*Math.cos(b)*Math.sin(c/2)**2;return 2*6371e3*Math.asin(Math.sqrt(_))}function ti(e){const n=Number((e.totalMeters!=null?e.totalMeters:e.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const f=Math.floor(n/1e3),c=Number(e.xpKmAwarded||0);if(f>c){const p=f-c;p>0&&(De(p),Gn(),e.xpKmAwarded=f,o+=p)}const b=Math.floor(n/2500),_=Number(e.ticketChunksAwarded||0);if(b>_){const p=b-_;p>0&&(Le(p),Ye(),e.ticketChunksAwarded=b,l+=p)}(o>0||l>0)&&Wn(o,l,0,"distance")}function ei(e){const n=Number(e||0);if(!Number.isFinite(n)||n<=0)return pe();const o=pe();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),f=Math.floor((o.meters||0)/Eo);if(f>l){const c=f-l;o.steps=f,o.daySteps=Number(o.daySteps||0)+c}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||ke)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||oe(),steps:o.daySteps,goal:o.dailyGoalSteps||ke}}))),ti(o),Zo(o),Qo(o),un(o),nn(),o}function ni(){tn!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(tn),tn=null}async function cr(e={}){const n=!!e.silent;if(!navigator.geolocation)return he={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Co,"1")}catch{}ni(),en=!0,he={msg:"requesting",t:Date.now()};try{return tn=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,f=o.coords.longitude,c=o.coords.accuracy||999,g=Date.now(),b=pe(),_=b.lastPos;b.lastPos={lat:l,lng:f,t:g},un(b);const p=Number.isFinite(o.coords.heading)?o.coords.heading:null,u=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:f,acc:c,heading:p,speed:u,t:g}})),c>Mo){he={lat:l,lng:f,acc:c,t:g,reason:"accuracy",boostMs:lr()},nn();return}Vo(l,f);let x=0,C=0,z=0,v=0,S="no-last";_&&typeof _.lat=="number"&&typeof _.lng=="number"&&typeof _.t=="number"&&(x=Jo({lat:_.lat,lng:_.lng},{lat:l,lng:f}),C=Math.max(1,(g-_.t)/1e3),z=x/C,x<Lo?S="jitter":x>Ao?S="teleport":z>zo?S="too-fast":(ei(x),v=x,S="ok")),he={lat:l,lng:f,acc:c,t:g,dist:Math.round(x),dt:Math.round(C),speed:Number.isFinite(z)?Number(z.toFixed(2)):0,added:Math.round(v),reason:S,boostMs:lr()},nn()},o=>{en=!1,he={err:o?.message||"GPS blocked",t:Date.now()},nn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return en=!1,he={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ri(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>sr()||await cr({silent:!0}))();const n=async()=>{sr()||await cr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const n=e?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),f=Number(n.cbs||0);o>0&&(De(o),Gn()),(l>0||f>0)&&(l>0&&Le(l),f>0&&pn(f),Ye());const c=n.cardId||n.card_id;if(c)try{const g=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Ro(c,g)}catch(g){console.warn("CBS GO: grantCard from lootReward failed",g)}}));function $r(){const e=dn(),n=Ge(),o=vr(),l=_r(),f=qo(),c=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
          width:${c}%;
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
        <div>${o}/${l} XP · total ${e}</div>
        <div>${f.toFixed(2)} km walked</div>
      </div>
    </div>
  `}function Pr(){const{stepsToday:e,goalSteps:n,goalReached:o,streak:l,streakLength:f,rewardPerStreak:c}=Ho(),g=n>0?Math.min(100,Math.round(e/n*100)):0,b=(l||[]).map(p=>p.reached?"★":"☆").join(" ");return`
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
        <div style="font-size:10px;opacity:.9;">${`${e} / ${n} steps${o?" ✅":""}`}</div>
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
        ${b}
      </div>

      <div style="text-align:right;font-size:9px;opacity:.75;">
        ${f}-day streak → +${c} CBS
      </div>
    </div>
  `}function Or(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function oi(){try{const e=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&e.push(o)}e.forEach(n=>localStorage.removeItem(n))}catch{}try{const e=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&e.push(o)}e.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const jr="cbsgo_player_name_v2",Dn="cbsgo_player_avatar_v2";function qe(){try{return localStorage.getItem(jr)||"Sovereign"}catch{return"Sovereign"}}function Rr(e){const n=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(jr,n)}catch{}return n}function Yn(){try{return localStorage.getItem(Dn)||""}catch{return""}}function ii(e){const n=String(e||"");try{localStorage.setItem(Dn,n)}catch{}return n}function ai(){try{localStorage.removeItem(Dn)}catch{}}let Z=null,ee=null,ne=null,$e=null,Oe=null,Wt=null,Bt=null,we=0,fe=!1,Qt=!0,Gt=null;const Vt=new Map;let Zt=!0,je={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const si="48a387bba00043ac4ba5823371abc9d2",We=80,li=6,ci=80,fi=220,di=6e4,pi=5*6e4,ui=300,xi=.35,Bn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],yi=350,gi=.35,bi=120;let ln=0,ve=0,rn=null,jn=!1,Se=[];function de(e){return document.getElementById(e)}function _e(e){const n=de("cbsgoMapHost");if(!n)return;let o=de("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=e||""}function mi(){const e=String(qe()||"").trim();return e?e[0].toUpperCase():"🙂"}function Rn(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ce(e,n){const l=p=>p*Math.PI/180,f=l(n.lat-e.lat),c=l(n.lng-e.lng),g=l(e.lat),b=l(n.lat),_=Math.sin(f/2)**2+Math.cos(g)*Math.cos(b)*Math.sin(c/2)**2;return 2*6371e3*Math.asin(Math.sqrt(_))}function Fr(e,n,o){const l=n+Math.random()*(o-n),f=Math.random()*2*Math.PI,c=l*Math.cos(f)/111111,g=l*Math.sin(f)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+c,lng:e.lng+g}}function hi(e,n){const o=p=>p*Math.PI/180,l=o(e.lat),f=o(n.lat),c=o(n.lng-e.lng),g=Math.sin(c)*Math.cos(f),b=Math.cos(l)*Math.sin(f)-Math.sin(l)*Math.cos(f)*Math.cos(c);let _=Math.atan2(g,b);return _=_*180/Math.PI,_=(_+360)%360,_}function wi(e,n,o){const f=n/6371e3,c=o*Math.PI/180,g=e[0]*Math.PI/180,b=e[1]*Math.PI/180,_=Math.sin(g),p=Math.cos(g),u=Math.sin(f),x=Math.cos(f),C=Math.asin(_*x+p*u*Math.cos(c)),z=b+Math.atan2(Math.sin(c)*u*p,x-_*Math.sin(C));return[C*180/Math.PI,z*180/Math.PI]}function vi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const e=document.createElement("style");e.id="cbsgoWeatherFxStyles",e.textContent=`
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
  `,document.head.appendChild(e)}function Ur(){const{temp:e,iconEmoji:n}=je;return e==null?"⛅ …°":`${n} ${Math.round(e)}°`}function Gr(){const e=document.getElementById("cbsgoWeatherFx");if(!e)return;vi();const{condition:n,isNight:o}=je;e.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const c=[];for(let g=0;g<48;g++){const b=Math.random()*100,_=Math.random()*16-8,p=Math.random()*2.5,u=2+Math.random()*1.5;c.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${b}%;
            --xEnd:${b+_}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${u}s;
          "
        ></div>
      `)}l=c.join("")}else if(n==="snow"){const c=[];for(let g=0;g<42;g++){const b=Math.random()*100,_=Math.random()*20-10,p=Math.random()*4,u=6+Math.random()*4;c.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${b}%;
            --xEnd:${b+_}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${u}s;
          "
        ></div>
      `)}l=c.join("")}else l="";e.innerHTML=l}async function _i(e,n){const o=Date.now();if(!(je.lastUpdated&&o-je.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${n}&appid=${si}&units=metric`,f=await fetch(l);if(!f.ok)throw new Error("HTTP "+f.status);const c=await f.json(),g=c?.main?.temp,b=c?.weather?.[0]?.icon||"01d",_=String(c?.weather?.[0]?.main||"").toLowerCase();let p=b.endsWith("n"),u="⛅",x="clear";b.startsWith("01")||b.startsWith("02")?x="clear":b.startsWith("03")||b.startsWith("04")?(u="☁️",x="clouds"):b.startsWith("09")||b.startsWith("10")?(u="🌧️",x="rain"):b.startsWith("11")?(u="⛈️",x="storm"):b.startsWith("13")?(u="❄️",x="snow"):b.startsWith("50")&&(u="🌫️",x="mist"),_.includes("rain")&&(x="rain"),_.includes("snow")&&(x="snow"),_.includes("thunder")&&(x="storm");try{const z=Number(c?.dt||0),v=Number(c?.timezone||0);if(z&&Number.isFinite(v)){const Y=((z+v)/3600%24+24)%24;p=Y<7||Y>=19}}catch{}x==="clear"?u=p?"🌙":"☀️":x==="clouds"?u="☁️":x==="rain"?u="🌧️":x==="storm"?u="⛈️":x==="snow"?u="❄️":x==="mist"&&(u="🌫️"),je={temp:g,iconEmoji:u,condition:x,isNight:p,lastUpdated:o};const C=document.getElementById("cbsgoWeatherLabel");C&&(C.textContent=Ur()),Gr()}catch(l){console.warn("Weather fetch failed",l)}}function Si(e){const n=Yn();if(n){const f=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${n}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return e.divIcon({html:f,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const l=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${Rn(mi())}</div>
  `;return e.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function fr(e,n){const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function ki(e,n,o,l){if(!l&&o){const b=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Rn(o)}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return e.divIcon({html:b,className:"",iconSize:[30,30],iconAnchor:[15,15]})}const f=String(n||"").trim()||"🙂",c=`
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${Rn(f)}</div>
  `;return e.divIcon({html:c,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function Ci(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Ei(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Mi(){const e=Math.random();return e<.6?"small":e<.9?"medium":e<.98?"large":"jackpot"}function Li(){if(!Bn.length)return null;const e=Math.floor(Math.random()*Bn.length);return Bn[e]}function Ai(e){const n=e||"small";let o,l,f;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),f=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),f=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,f=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,f=Math.random()<.25?3+Math.floor(Math.random()*8):0);let c=null,g=0;if(Math.random()<xi){const b=Li();b&&(c=b,g=1)}return{xp:o,tickets:l,cbs:f,cardId:c,cardCount:g}}function zi(e){if(!Z||!Wt||!e)return;const n=Date.now();if(n-ln<di||Wt.getLayers().length>=li)return;const l=window.L;if(!l)return;const f=Mi(),c=Ai(f),g=Fr(e,ci,fi),b=Ci(l),_=l.marker([g.lat,g.lng],{icon:b,pane:"cbsgo-loot-pane"}),u={marker:_,createdAt:n,lat:g.lat,lng:g.lng,reward:c};Se.push(u),_.on("click",()=>{if(!Bt){alert("GPS not ready yet. Wait until your player marker appears.");return}const x={lat:Bt[0],lng:Bt[1]},C={lat:g.lat,lng:g.lng},z=Ce(x,C);if(z>We){alert(`Too far to open this gift.

Distance: ${Math.round(z)}m
Needed: ≤ ${We}m`);return}Wt.removeLayer(_),Se=Se.filter(Mt=>Mt.marker!==_);const{xp:v,tickets:S,cbs:Y,cardId:U,cardCount:H}=c,q=[];v&&q.push(`+${v} XP`),S&&q.push(`+${S} ticket${S===1?"":"s"}`),Y&&q.push(`+${Y} CBS`),U&&H>0&&q.push(`+${H} card${H===1?"":"s"}`);const W=q.length?q.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${W}`);const it={kind:"mystery",xp:v||0,tickets:S||0,cbs:Y||0,cardId:U||null,cardCount:H||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:it}))}catch{}}),_.addTo(Wt),ln=n}function Ni(e){if(!Z||!Wt||!e)return;const n=Date.now();let o=0;Se=Se.filter(l=>{if(!l||!l.marker||!Wt.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>pi)return Wt.removeLayer(l.marker),o+=1,!1;const c=Ce({lat:e.lat,lng:e.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(c)&&c>ui?(Wt.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Wt.getLayers().length===0&&(ln=0)}function Bi(e){if(!Z||!Oe||!e||rn)return;const n=window.L;if(!n)return;if(jn){if(ve<yi||Math.random()>gi)return;ve=0}else{if(ve<bi)return;ve=0,jn=!0}const o=Fr(e,60,140),l=Ei(n),f=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});f.on("click",()=>{if(!Bt){alert("GPS not ready yet. Wait until your player marker appears.");return}const c={lat:Bt[0],lng:Bt[1]},g={lat:o.lat,lng:o.lng},b=Ce(c,g);if(b>We){alert(`Too far to start this puzzle.

Distance: ${Math.round(b)}m
Needed: ≤ ${We}m`);return}Oe.removeLayer(f),rn=null,$n({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),f.addTo(Oe),rn=f}function Ii(e){const n=window.L;if(!n||!Z||!e)return;const o=We;$e?($e.setLatLng(e),$e.setRadius(o)):$e=n.circle(e,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(Z)}function Ti(e){const n=window.L;if(!n||!Z)return;const o=Si(n);if(ee?(ee.setIcon(o),ee.setLatLng(e)):(ee=n.marker(e,{icon:o,pane:"cbsgo-player-pane"}).addTo(Z),Z.setView(e,19)),ne?(ne.setIcon(fr(n,we)),ne.setLatLng(e)):ne=n.marker(e,{icon:fr(n,we),interactive:!1,pane:"cbsgo-player-pane"}).addTo(Z),ee&&ee.bringToFront&&ee.bringToFront(),ne&&ne.bringToFront&&ne.bringToFront(),Ii(e),Qt&&!fe&&Z)try{const l=Z.getZoom()||19;let f=e;Number.isFinite(we)&&(f=wi(e,40,we));const c=Z.getCenter(),g=Ce({lat:c.lat,lng:c.lng},{lat:f[0],lng:f[1]});(!Number.isFinite(g)||g>20)&&Z.setView(f,l)}catch{}}function Wr(){const e=window.L;return!e||!Z?null:(Gt?(Zt&&!Z.hasLayer(Gt)&&Gt.addTo(Z),!Zt&&Z.hasLayer(Gt)&&Z.removeLayer(Gt)):(Gt=e.layerGroup(),Zt&&Gt.addTo(Z)),Gt)}function $i(e){if(!Array.isArray(e)||!Z)return[];const n=Z.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;e.forEach(c=>{if(!c||c.isMe||typeof c.lat!="number"||typeof c.lng!="number")return;const g=Math.round(c.lat*o)/o,b=Math.round(c.lng*o)/o,_=`${g}_${b}`;l.has(_)||l.set(_,[]),l.get(_).push(c)});const f=[];for(const[c,g]of l.entries())if(g.length)if(g.length===1){const b=g[0];f.push({id:b.wallet_pk||c,lat:b.lat,lng:b.lng,count:1,nickname:b.nickname||"Anon",avatar:b.avatar||"",isCluster:!1})}else{let b=0,_=0;g.forEach(x=>{b+=x.lat,_+=x.lng});const p=b/g.length,u=_/g.length;f.push({id:`cluster_${c}`,lat:p,lng:u,count:g.length,nickname:`${g.length} players`,avatar:"",isCluster:!0})}return f}function Pi(e){const n=window.L;if(!n||!Z)return;const o=Wr();if(!o)return;if(!Zt){for(const[c,g]of Vt.entries())o.removeLayer(g),Vt.delete(c);return}const l=$i(e),f=new Set;l.forEach(c=>{if(!c||typeof c.lat!="number"||typeof c.lng!="number")return;const g=c.id||`${c.lat},${c.lng}`;f.add(g);const b=[c.lat,c.lng];let _=Vt.get(g);if(_)_.setLatLng(b);else{const p=c.isCluster&&c.count>1?String(c.count):c.nickname||"Anon",u=ki(n,p,c.avatar,c.isCluster);_=n.marker(b,{icon:u,pane:"cbsgo-others-pane"});const x=c.isCluster&&c.count>1?`${c.count} CBS-GO explorers nearby`:`${c.nickname||"CBS-GO explorer"}`;_.bindPopup(x),_.addTo(o),Vt.set(g,_)}});for(const[c,g]of Vt.entries())f.has(c)||(o.removeLayer(g),Vt.delete(c))}function Oi(){return`
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
  `}function ji(){try{Z&&Z.remove()}catch{}Z=null,ee=null,ne=null,$e=null,Oe=null,Wt=null,Bt=null,fe=!1,Qt=!0,ln=0,ve=0,rn=null,jn=!1,Gt=null,Vt.clear(),Se=[]}function Ri(){const e=window.L,n=de("cbsgoMap");if(!e||!n)return!1;ji();const o=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));Z=e.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=Z.createPane("cbsgo-player-pane");l.style.zIndex="650";const f=Z.createPane("cbsgo-others-pane");f.style.zIndex="640";const c=Z.createPane("cbsgo-loot-pane");c.style.zIndex="630";const g=Z.createPane("cbsgo-puzzle-pane");return g.style.zIndex="630",e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(Z),Z.setMaxBounds(o),Z.setView([51.687,4.87],16),Oe=e.layerGroup().addTo(Z),Wt=e.layerGroup().addTo(Z),Z.on("dragstart",()=>{Qt=!1}),Z.on("zoomstart",()=>{Qt=!1}),!0}function Fi(){!navigator.geolocation||!Z||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:n,longitude:o,accuracy:l,heading:f}=e.coords,c={lat:n,lng:o},g=Bt?{lat:Bt[0],lng:Bt[1]}:null;if(Bt=[n,o],Number.isFinite(f))we=f;else if(g){const b=Ce(g,c);Number.isFinite(b)&&b>2&&(we=hi(g,c))}if(Ti([n,o]),g){const b=Ce(g,c);if(Number.isFinite(b)&&b>1&&(ve+=b),Number.isFinite(b)&&b>20&&!Qt&&!fe&&Z){Qt=!0;const _=Z.getZoom()||19;Z.setView([n,o],_)}}Bi(c),zi(c),Ni(c),_i(n,o),_e(`GPS OK • accuracy ~${Math.round(l)}m`)},e=>{_e(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Ui(){let e=0;const n=120,o=()=>{if(e++,!de("cbsgoMap"))return e<n?setTimeout(o,100):void 0;if(!window.L){if(_e("Loading map engine…"),e<n)return setTimeout(o,100);_e("Map engine failed (Leaflet not found). Refresh.");return}if(!Ri()){_e("Could not init map. Refresh.");return}const f=de("cbsgoCenterBtn");f&&(f.onclick=()=>{Z&&Bt&&(Qt=!0,fe=!1,Z.setView(Bt,19))});const c=de("cbsgoCompassBtn");c&&(c.onclick=()=>{Z&&(fe=!fe,fe?(Qt=!1,Z.setView([51.687,4.87],3)):Bt&&(Qt=!0,Z.setView(Bt,16)))});const g=de("cbsgoOnlineToggleBtn");if(g){const b=()=>{Zt?(g.style.borderColor="rgba(251,191,36,0.95)",g.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(g.style.borderColor="rgba(255,255,255,0.18)",g.style.boxShadow="none")};b(),g.onclick=()=>{Zt=!Zt;const _=Wr();if(_&&Z&&(Zt?Z.hasLayer(_)||_.addTo(Z):Z.hasLayer(_)&&Z.removeLayer(_)),b(),!Zt&&Gt){for(const[p,u]of Vt.entries())Gt.removeLayer(u);Vt.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",b=>{const _=b?.detail?.players||[];Pi(_)})),Gr(),_e("Loading GPS…"),Fi()};o()}const Gi="cbsgo_cards_v1";function Wi(e,n){try{const o=JSON.parse(e);return o&&typeof o=="object"?o:n}catch{return n}}function qn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Hn(){const e=localStorage.getItem(Gi),n=Wi(e,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const f=Number(l.count||0);Number.isFinite(f)&&f>0&&(o[l.id]=f)}),o}function re(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Dr(e){return e==="legendary"?"rgba(251,191,36,.95)":e==="epic"?"rgba(147,51,234,.9)":e==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Di(){const e=qn(),n=Hn();let o=0;return e.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:e.length}}function Yi(){const e=qn(),n=Hn();return e.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${e.map(l=>{const f=Number(n[l.id]||0),c=Number.isFinite(f)&&f>0,g=Dr(l.rarity),b=c?g:"rgba(31,41,55,.9)",_=c?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",p=c?l.emoji||"🃏":"❓",u=c?re(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',x=re(l.set||"Set"),C=c?`<div style="
             position:absolute;
             right:6px;
             top:6px;
             padding:2px 6px;
             border-radius:999px;
             border:1px solid ${g};
             background:rgba(15,23,42,.96);
             font-size:10px;
           ">
             x${f}
           </div>`:"";return`
        <div
          class="cbsgoCardTile"
          data-card-id="${re(l.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${b};
            background:${_};
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
            font-size:${c?"26px":"28px"};
            margin-top:${c?"4px":"8px"};
            margin-bottom:4px;
          ">
            ${re(p)}
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
            ${u}
          </div>
          <div style="
            font-size:10px;
            opacity:.7;
          ">
            ${x}
          </div>
        </div>
      `}).join("")}
    </div>
  `:`
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `}function qi(){const e=Di(),{collected:n,total:o}=e,l=`${n}/${o} cards collected`,f=o>0?Math.round(n/o*100):0;return`
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
          width:${f}%;
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
  `}function Hi(){let e=document.getElementById("cbsgoCardsOverlayHost");e||(e=document.createElement("div"),e.id="cbsgoCardsOverlayHost",e.style.position="fixed",e.style.inset="0",e.style.zIndex="8500",e.style.pointerEvents="none",document.body.appendChild(e)),e.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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
  `,n.appendChild(o),e.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{e.innerHTML=""},220)},f=document.getElementById("cbsgoCardsCloseBtn");f&&(f.onclick=l),n.addEventListener("click",p=>{p.target===n&&l()});const c=qn(),g=new Map(c.map(p=>[p.id,p]));function b(p){const u=g.get(p);if(!u)return;const x=Hn(),C=Number(x[p]||0),z=Number.isFinite(C)&&C>0,v=z?u.emoji||"🃏":"❓",S=z?u.name||"Card":"Unknown card",Y=u.set||"Set",U=u.rarity||"common",H=Dr(U),q={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[U]||"Common",W=document.createElement("div");W.style.position="fixed",W.style.inset="0",W.style.display="flex",W.style.alignItems="center",W.style.justifyContent="center",W.style.background="rgba(0,0,0,0.65)",W.style.pointerEvents="auto",W.style.zIndex="8600";const it=document.createElement("div");it.style.width="min(260px, 82vw)",it.style.borderRadius="20px",it.style.border=`1px solid ${H}`,it.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",it.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",it.style.padding="16px 14px 14px 14px",it.style.textAlign="center",it.style.color="#fff",it.style.fontFamily="system-ui,sans-serif",it.style.opacity="0",it.style.transform="translateY(14px) scale(0.96)",it.style.transition="opacity .2s ease-out, transform .2s ease-out";const Mt=z?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${C}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',Dt=z?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;it.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${re(Y)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${H};
          font-size:10px;
        ">
          ${re(q)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${H};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${re(v)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${re(S)}
      </div>

      ${Mt}
      ${Dt}

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
    `,W.appendChild(it),document.body.appendChild(W),requestAnimationFrame(()=>{it.style.opacity="1",it.style.transform="translateY(0) scale(1)"});const Rt=()=>{it.style.opacity="0",it.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(W)},200)},Tt=it.querySelector("#cbsgoCardPreviewCloseBtn");Tt&&(Tt.onclick=Rt),W.addEventListener("click",ie=>{ie.target===W&&Rt()})}o.querySelectorAll(".cbsgoCardTile").forEach(p=>{p.addEventListener("click",()=>{const u=p.getAttribute("data-card-id");u&&b(u)})})}function Ki(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Xi(e){if(Object.prototype.hasOwnProperty.call(e,"__esModule"))return e;var n=e.default;if(typeof n=="function"){var o=function l(){var f=!1;try{f=this instanceof l}catch{}return f?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(e).forEach(function(l){var f=Object.getOwnPropertyDescriptor(e,l);Object.defineProperty(o,l,f.get?f:{enumerable:!0,get:function(){return e[l]}})}),o}function Vi(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var In={exports:{}};const Zi={},Qi=Object.freeze(Object.defineProperty({__proto__:null,default:Zi},Symbol.toStringTag,{value:"Module"})),Ji=Xi(Qi);var dr;function ta(){return dr||(dr=1,(function(e){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},f=new Uint8Array(16),c=new Uint8Array(32);c[0]=9;var g=o(),b=o([1]),_=o([56129,1]),p=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),u=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),x=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),C=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),z=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function v(r,a,i,t){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=t>>24&255,r[a+5]=t>>16&255,r[a+6]=t>>8&255,r[a+7]=t&255}function S(r,a,i,t,s){var y,m=0;for(y=0;y<s;y++)m|=r[a+y]^i[t+y];return(1&m-1>>>8)-1}function Y(r,a,i,t){return S(r,a,i,t,16)}function U(r,a,i,t){return S(r,a,i,t,32)}function H(r,a,i,t){for(var s=t[0]&255|(t[1]&255)<<8|(t[2]&255)<<16|(t[3]&255)<<24,y=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,E=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,N=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=t[4]&255|(t[5]&255)<<8|(t[6]&255)<<16|(t[7]&255)<<24,I=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,yt=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,Q=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,J=t[8]&255|(t[9]&255)<<8|(t[10]&255)<<16|(t[11]&255)<<24,at=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ot=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,tt=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,nt=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,et=t[12]&255|(t[13]&255)<<8|(t[14]&255)<<16|(t[15]&255)<<24,P=s,D=y,T=m,j=E,F=N,B=G,h=I,w=yt,L=$,k=Q,M=J,A=at,V=ot,st=tt,ct=nt,lt=et,d,dt=0;dt<20;dt+=2)d=P+V|0,F^=d<<7|d>>>25,d=F+P|0,L^=d<<9|d>>>23,d=L+F|0,V^=d<<13|d>>>19,d=V+L|0,P^=d<<18|d>>>14,d=B+D|0,k^=d<<7|d>>>25,d=k+B|0,st^=d<<9|d>>>23,d=st+k|0,D^=d<<13|d>>>19,d=D+st|0,B^=d<<18|d>>>14,d=M+h|0,ct^=d<<7|d>>>25,d=ct+M|0,T^=d<<9|d>>>23,d=T+ct|0,h^=d<<13|d>>>19,d=h+T|0,M^=d<<18|d>>>14,d=lt+A|0,j^=d<<7|d>>>25,d=j+lt|0,w^=d<<9|d>>>23,d=w+j|0,A^=d<<13|d>>>19,d=A+w|0,lt^=d<<18|d>>>14,d=P+j|0,D^=d<<7|d>>>25,d=D+P|0,T^=d<<9|d>>>23,d=T+D|0,j^=d<<13|d>>>19,d=j+T|0,P^=d<<18|d>>>14,d=B+F|0,h^=d<<7|d>>>25,d=h+B|0,w^=d<<9|d>>>23,d=w+h|0,F^=d<<13|d>>>19,d=F+w|0,B^=d<<18|d>>>14,d=M+k|0,A^=d<<7|d>>>25,d=A+M|0,L^=d<<9|d>>>23,d=L+A|0,k^=d<<13|d>>>19,d=k+L|0,M^=d<<18|d>>>14,d=lt+ct|0,V^=d<<7|d>>>25,d=V+lt|0,st^=d<<9|d>>>23,d=st+V|0,ct^=d<<13|d>>>19,d=ct+st|0,lt^=d<<18|d>>>14;P=P+s|0,D=D+y|0,T=T+m|0,j=j+E|0,F=F+N|0,B=B+G|0,h=h+I|0,w=w+yt|0,L=L+$|0,k=k+Q|0,M=M+J|0,A=A+at|0,V=V+ot|0,st=st+tt|0,ct=ct+nt|0,lt=lt+et|0,r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=D>>>0&255,r[5]=D>>>8&255,r[6]=D>>>16&255,r[7]=D>>>24&255,r[8]=T>>>0&255,r[9]=T>>>8&255,r[10]=T>>>16&255,r[11]=T>>>24&255,r[12]=j>>>0&255,r[13]=j>>>8&255,r[14]=j>>>16&255,r[15]=j>>>24&255,r[16]=F>>>0&255,r[17]=F>>>8&255,r[18]=F>>>16&255,r[19]=F>>>24&255,r[20]=B>>>0&255,r[21]=B>>>8&255,r[22]=B>>>16&255,r[23]=B>>>24&255,r[24]=h>>>0&255,r[25]=h>>>8&255,r[26]=h>>>16&255,r[27]=h>>>24&255,r[28]=w>>>0&255,r[29]=w>>>8&255,r[30]=w>>>16&255,r[31]=w>>>24&255,r[32]=L>>>0&255,r[33]=L>>>8&255,r[34]=L>>>16&255,r[35]=L>>>24&255,r[36]=k>>>0&255,r[37]=k>>>8&255,r[38]=k>>>16&255,r[39]=k>>>24&255,r[40]=M>>>0&255,r[41]=M>>>8&255,r[42]=M>>>16&255,r[43]=M>>>24&255,r[44]=A>>>0&255,r[45]=A>>>8&255,r[46]=A>>>16&255,r[47]=A>>>24&255,r[48]=V>>>0&255,r[49]=V>>>8&255,r[50]=V>>>16&255,r[51]=V>>>24&255,r[52]=st>>>0&255,r[53]=st>>>8&255,r[54]=st>>>16&255,r[55]=st>>>24&255,r[56]=ct>>>0&255,r[57]=ct>>>8&255,r[58]=ct>>>16&255,r[59]=ct>>>24&255,r[60]=lt>>>0&255,r[61]=lt>>>8&255,r[62]=lt>>>16&255,r[63]=lt>>>24&255}function q(r,a,i,t){for(var s=t[0]&255|(t[1]&255)<<8|(t[2]&255)<<16|(t[3]&255)<<24,y=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,E=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,N=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=t[4]&255|(t[5]&255)<<8|(t[6]&255)<<16|(t[7]&255)<<24,I=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,yt=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,Q=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,J=t[8]&255|(t[9]&255)<<8|(t[10]&255)<<16|(t[11]&255)<<24,at=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ot=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,tt=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,nt=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,et=t[12]&255|(t[13]&255)<<8|(t[14]&255)<<16|(t[15]&255)<<24,P=s,D=y,T=m,j=E,F=N,B=G,h=I,w=yt,L=$,k=Q,M=J,A=at,V=ot,st=tt,ct=nt,lt=et,d,dt=0;dt<20;dt+=2)d=P+V|0,F^=d<<7|d>>>25,d=F+P|0,L^=d<<9|d>>>23,d=L+F|0,V^=d<<13|d>>>19,d=V+L|0,P^=d<<18|d>>>14,d=B+D|0,k^=d<<7|d>>>25,d=k+B|0,st^=d<<9|d>>>23,d=st+k|0,D^=d<<13|d>>>19,d=D+st|0,B^=d<<18|d>>>14,d=M+h|0,ct^=d<<7|d>>>25,d=ct+M|0,T^=d<<9|d>>>23,d=T+ct|0,h^=d<<13|d>>>19,d=h+T|0,M^=d<<18|d>>>14,d=lt+A|0,j^=d<<7|d>>>25,d=j+lt|0,w^=d<<9|d>>>23,d=w+j|0,A^=d<<13|d>>>19,d=A+w|0,lt^=d<<18|d>>>14,d=P+j|0,D^=d<<7|d>>>25,d=D+P|0,T^=d<<9|d>>>23,d=T+D|0,j^=d<<13|d>>>19,d=j+T|0,P^=d<<18|d>>>14,d=B+F|0,h^=d<<7|d>>>25,d=h+B|0,w^=d<<9|d>>>23,d=w+h|0,F^=d<<13|d>>>19,d=F+w|0,B^=d<<18|d>>>14,d=M+k|0,A^=d<<7|d>>>25,d=A+M|0,L^=d<<9|d>>>23,d=L+A|0,k^=d<<13|d>>>19,d=k+L|0,M^=d<<18|d>>>14,d=lt+ct|0,V^=d<<7|d>>>25,d=V+lt|0,st^=d<<9|d>>>23,d=st+V|0,ct^=d<<13|d>>>19,d=ct+st|0,lt^=d<<18|d>>>14;r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=B>>>0&255,r[5]=B>>>8&255,r[6]=B>>>16&255,r[7]=B>>>24&255,r[8]=M>>>0&255,r[9]=M>>>8&255,r[10]=M>>>16&255,r[11]=M>>>24&255,r[12]=lt>>>0&255,r[13]=lt>>>8&255,r[14]=lt>>>16&255,r[15]=lt>>>24&255,r[16]=h>>>0&255,r[17]=h>>>8&255,r[18]=h>>>16&255,r[19]=h>>>24&255,r[20]=w>>>0&255,r[21]=w>>>8&255,r[22]=w>>>16&255,r[23]=w>>>24&255,r[24]=L>>>0&255,r[25]=L>>>8&255,r[26]=L>>>16&255,r[27]=L>>>24&255,r[28]=k>>>0&255,r[29]=k>>>8&255,r[30]=k>>>16&255,r[31]=k>>>24&255}function W(r,a,i,t){H(r,a,i,t)}function it(r,a,i,t){q(r,a,i,t)}var Mt=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function Dt(r,a,i,t,s,y,m){var E=new Uint8Array(16),N=new Uint8Array(64),G,I;for(I=0;I<16;I++)E[I]=0;for(I=0;I<8;I++)E[I]=y[I];for(;s>=64;){for(W(N,E,m,Mt),I=0;I<64;I++)r[a+I]=i[t+I]^N[I];for(G=1,I=8;I<16;I++)G=G+(E[I]&255)|0,E[I]=G&255,G>>>=8;s-=64,a+=64,t+=64}if(s>0)for(W(N,E,m,Mt),I=0;I<s;I++)r[a+I]=i[t+I]^N[I];return 0}function Rt(r,a,i,t,s){var y=new Uint8Array(16),m=new Uint8Array(64),E,N;for(N=0;N<16;N++)y[N]=0;for(N=0;N<8;N++)y[N]=t[N];for(;i>=64;){for(W(m,y,s,Mt),N=0;N<64;N++)r[a+N]=m[N];for(E=1,N=8;N<16;N++)E=E+(y[N]&255)|0,y[N]=E&255,E>>>=8;i-=64,a+=64}if(i>0)for(W(m,y,s,Mt),N=0;N<i;N++)r[a+N]=m[N];return 0}function Tt(r,a,i,t,s){var y=new Uint8Array(32);it(y,t,s,Mt);for(var m=new Uint8Array(8),E=0;E<8;E++)m[E]=t[E+16];return Rt(r,a,i,m,y)}function ie(r,a,i,t,s,y,m){var E=new Uint8Array(32);it(E,y,m,Mt);for(var N=new Uint8Array(8),G=0;G<8;G++)N[G]=y[G+16];return Dt(r,a,i,t,s,N,E)}var ae=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,t,s,y,m,E,N;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,t=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|t<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(t>>>7|s<<9)&8191,y=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|y<<12)&255,this.r[5]=y>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(y>>>14|m<<2)&8191,E=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|E<<5)&8065,N=r[14]&255|(r[15]&255)<<8,this.r[8]=(E>>>8|N<<8)&8191,this.r[9]=N>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};ae.prototype.blocks=function(r,a,i){for(var t=this.fin?0:2048,s,y,m,E,N,G,I,yt,$,Q,J,at,ot,tt,nt,et,P,D,T,j=this.h[0],F=this.h[1],B=this.h[2],h=this.h[3],w=this.h[4],L=this.h[5],k=this.h[6],M=this.h[7],A=this.h[8],V=this.h[9],st=this.r[0],ct=this.r[1],lt=this.r[2],d=this.r[3],dt=this.r[4],gt=this.r[5],bt=this.r[6],ft=this.r[7],ut=this.r[8],xt=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,j+=s&8191,y=r[a+2]&255|(r[a+3]&255)<<8,F+=(s>>>13|y<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,B+=(y>>>10|m<<6)&8191,E=r[a+6]&255|(r[a+7]&255)<<8,h+=(m>>>7|E<<9)&8191,N=r[a+8]&255|(r[a+9]&255)<<8,w+=(E>>>4|N<<12)&8191,L+=N>>>1&8191,G=r[a+10]&255|(r[a+11]&255)<<8,k+=(N>>>14|G<<2)&8191,I=r[a+12]&255|(r[a+13]&255)<<8,M+=(G>>>11|I<<5)&8191,yt=r[a+14]&255|(r[a+15]&255)<<8,A+=(I>>>8|yt<<8)&8191,V+=yt>>>5|t,$=0,Q=$,Q+=j*st,Q+=F*(5*xt),Q+=B*(5*ut),Q+=h*(5*ft),Q+=w*(5*bt),$=Q>>>13,Q&=8191,Q+=L*(5*gt),Q+=k*(5*dt),Q+=M*(5*d),Q+=A*(5*lt),Q+=V*(5*ct),$+=Q>>>13,Q&=8191,J=$,J+=j*ct,J+=F*st,J+=B*(5*xt),J+=h*(5*ut),J+=w*(5*ft),$=J>>>13,J&=8191,J+=L*(5*bt),J+=k*(5*gt),J+=M*(5*dt),J+=A*(5*d),J+=V*(5*lt),$+=J>>>13,J&=8191,at=$,at+=j*lt,at+=F*ct,at+=B*st,at+=h*(5*xt),at+=w*(5*ut),$=at>>>13,at&=8191,at+=L*(5*ft),at+=k*(5*bt),at+=M*(5*gt),at+=A*(5*dt),at+=V*(5*d),$+=at>>>13,at&=8191,ot=$,ot+=j*d,ot+=F*lt,ot+=B*ct,ot+=h*st,ot+=w*(5*xt),$=ot>>>13,ot&=8191,ot+=L*(5*ut),ot+=k*(5*ft),ot+=M*(5*bt),ot+=A*(5*gt),ot+=V*(5*dt),$+=ot>>>13,ot&=8191,tt=$,tt+=j*dt,tt+=F*d,tt+=B*lt,tt+=h*ct,tt+=w*st,$=tt>>>13,tt&=8191,tt+=L*(5*xt),tt+=k*(5*ut),tt+=M*(5*ft),tt+=A*(5*bt),tt+=V*(5*gt),$+=tt>>>13,tt&=8191,nt=$,nt+=j*gt,nt+=F*dt,nt+=B*d,nt+=h*lt,nt+=w*ct,$=nt>>>13,nt&=8191,nt+=L*st,nt+=k*(5*xt),nt+=M*(5*ut),nt+=A*(5*ft),nt+=V*(5*bt),$+=nt>>>13,nt&=8191,et=$,et+=j*bt,et+=F*gt,et+=B*dt,et+=h*d,et+=w*lt,$=et>>>13,et&=8191,et+=L*ct,et+=k*st,et+=M*(5*xt),et+=A*(5*ut),et+=V*(5*ft),$+=et>>>13,et&=8191,P=$,P+=j*ft,P+=F*bt,P+=B*gt,P+=h*dt,P+=w*d,$=P>>>13,P&=8191,P+=L*lt,P+=k*ct,P+=M*st,P+=A*(5*xt),P+=V*(5*ut),$+=P>>>13,P&=8191,D=$,D+=j*ut,D+=F*ft,D+=B*bt,D+=h*gt,D+=w*dt,$=D>>>13,D&=8191,D+=L*d,D+=k*lt,D+=M*ct,D+=A*st,D+=V*(5*xt),$+=D>>>13,D&=8191,T=$,T+=j*xt,T+=F*ut,T+=B*ft,T+=h*bt,T+=w*gt,$=T>>>13,T&=8191,T+=L*dt,T+=k*d,T+=M*lt,T+=A*ct,T+=V*st,$+=T>>>13,T&=8191,$=($<<2)+$|0,$=$+Q|0,Q=$&8191,$=$>>>13,J+=$,j=Q,F=J,B=at,h=ot,w=tt,L=nt,k=et,M=P,A=D,V=T,a+=16,i-=16;this.h[0]=j,this.h[1]=F,this.h[2]=B,this.h[3]=h,this.h[4]=w,this.h[5]=L,this.h[6]=k,this.h[7]=M,this.h[8]=A,this.h[9]=V},ae.prototype.finish=function(r,a){var i=new Uint16Array(10),t,s,y,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(t=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=t,t=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=t*5,t=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=t,t=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=t,i[0]=this.h[0]+5,t=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+t,t=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(t^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,y=this.h[0]+this.pad[0],this.h[0]=y&65535,m=1;m<8;m++)y=(this.h[m]+this.pad[m]|0)+(y>>>16)|0,this.h[m]=y&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},ae.prototype.update=function(r,a,i){var t,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),t=0;t<s;t++)this.buffer[this.leftover+t]=r[a+t];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(t=0;t<i;t++)this.buffer[this.leftover+t]=r[a+t];this.leftover+=i}};function Ae(r,a,i,t,s,y){var m=new ae(y);return m.update(i,t,s),m.finish(r,a),0}function se(r,a,i,t,s,y){var m=new Uint8Array(16);return Ae(m,0,i,t,s,y),Y(r,a,m,0)}function $t(r,a,i,t,s){var y;if(i<32)return-1;for(ie(r,0,a,0,i,t,s),Ae(r,16,r,32,i-32,r),y=0;y<16;y++)r[y]=0;return 0}function ue(r,a,i,t,s){var y,m=new Uint8Array(32);if(i<32||(Tt(m,0,32,t,s),se(a,16,a,32,i-32,m)!==0))return-1;for(ie(r,0,a,0,i,t,s),y=0;y<32;y++)r[y]=0;return 0}function Ut(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xe(r){var a,i,t=1;for(a=0;a<16;a++)i=r[a]+t+65535,t=Math.floor(i/65536),r[a]=i-t*65536;r[0]+=t-1+37*(t-1)}function Ht(r,a,i){for(var t,s=~(i-1),y=0;y<16;y++)t=s&(r[y]^a[y]),r[y]^=t,a[y]^=t}function Jt(r,a){var i,t,s,y=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(xe(m),xe(m),xe(m),t=0;t<2;t++){for(y[0]=m[0]-65517,i=1;i<15;i++)y[i]=m[i]-65535-(y[i-1]>>16&1),y[i-1]&=65535;y[15]=m[15]-32767-(y[14]>>16&1),s=y[15]>>16&1,y[14]&=65535,Ht(m,y,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function ze(r,a){var i=new Uint8Array(32),t=new Uint8Array(32);return Jt(i,r),Jt(t,a),U(i,0,t,0)}function ye(r){var a=new Uint8Array(32);return Jt(a,r),a[0]&1}function Kt(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Pt(r,a,i){for(var t=0;t<16;t++)r[t]=a[t]+i[t]}function Ot(r,a,i){for(var t=0;t<16;t++)r[t]=a[t]-i[t]}function pt(r,a,i){var t,s,y=0,m=0,E=0,N=0,G=0,I=0,yt=0,$=0,Q=0,J=0,at=0,ot=0,tt=0,nt=0,et=0,P=0,D=0,T=0,j=0,F=0,B=0,h=0,w=0,L=0,k=0,M=0,A=0,V=0,st=0,ct=0,lt=0,d=i[0],dt=i[1],gt=i[2],bt=i[3],ft=i[4],ut=i[5],xt=i[6],St=i[7],mt=i[8],wt=i[9],vt=i[10],_t=i[11],Et=i[12],Lt=i[13],At=i[14],zt=i[15];t=a[0],y+=t*d,m+=t*dt,E+=t*gt,N+=t*bt,G+=t*ft,I+=t*ut,yt+=t*xt,$+=t*St,Q+=t*mt,J+=t*wt,at+=t*vt,ot+=t*_t,tt+=t*Et,nt+=t*Lt,et+=t*At,P+=t*zt,t=a[1],m+=t*d,E+=t*dt,N+=t*gt,G+=t*bt,I+=t*ft,yt+=t*ut,$+=t*xt,Q+=t*St,J+=t*mt,at+=t*wt,ot+=t*vt,tt+=t*_t,nt+=t*Et,et+=t*Lt,P+=t*At,D+=t*zt,t=a[2],E+=t*d,N+=t*dt,G+=t*gt,I+=t*bt,yt+=t*ft,$+=t*ut,Q+=t*xt,J+=t*St,at+=t*mt,ot+=t*wt,tt+=t*vt,nt+=t*_t,et+=t*Et,P+=t*Lt,D+=t*At,T+=t*zt,t=a[3],N+=t*d,G+=t*dt,I+=t*gt,yt+=t*bt,$+=t*ft,Q+=t*ut,J+=t*xt,at+=t*St,ot+=t*mt,tt+=t*wt,nt+=t*vt,et+=t*_t,P+=t*Et,D+=t*Lt,T+=t*At,j+=t*zt,t=a[4],G+=t*d,I+=t*dt,yt+=t*gt,$+=t*bt,Q+=t*ft,J+=t*ut,at+=t*xt,ot+=t*St,tt+=t*mt,nt+=t*wt,et+=t*vt,P+=t*_t,D+=t*Et,T+=t*Lt,j+=t*At,F+=t*zt,t=a[5],I+=t*d,yt+=t*dt,$+=t*gt,Q+=t*bt,J+=t*ft,at+=t*ut,ot+=t*xt,tt+=t*St,nt+=t*mt,et+=t*wt,P+=t*vt,D+=t*_t,T+=t*Et,j+=t*Lt,F+=t*At,B+=t*zt,t=a[6],yt+=t*d,$+=t*dt,Q+=t*gt,J+=t*bt,at+=t*ft,ot+=t*ut,tt+=t*xt,nt+=t*St,et+=t*mt,P+=t*wt,D+=t*vt,T+=t*_t,j+=t*Et,F+=t*Lt,B+=t*At,h+=t*zt,t=a[7],$+=t*d,Q+=t*dt,J+=t*gt,at+=t*bt,ot+=t*ft,tt+=t*ut,nt+=t*xt,et+=t*St,P+=t*mt,D+=t*wt,T+=t*vt,j+=t*_t,F+=t*Et,B+=t*Lt,h+=t*At,w+=t*zt,t=a[8],Q+=t*d,J+=t*dt,at+=t*gt,ot+=t*bt,tt+=t*ft,nt+=t*ut,et+=t*xt,P+=t*St,D+=t*mt,T+=t*wt,j+=t*vt,F+=t*_t,B+=t*Et,h+=t*Lt,w+=t*At,L+=t*zt,t=a[9],J+=t*d,at+=t*dt,ot+=t*gt,tt+=t*bt,nt+=t*ft,et+=t*ut,P+=t*xt,D+=t*St,T+=t*mt,j+=t*wt,F+=t*vt,B+=t*_t,h+=t*Et,w+=t*Lt,L+=t*At,k+=t*zt,t=a[10],at+=t*d,ot+=t*dt,tt+=t*gt,nt+=t*bt,et+=t*ft,P+=t*ut,D+=t*xt,T+=t*St,j+=t*mt,F+=t*wt,B+=t*vt,h+=t*_t,w+=t*Et,L+=t*Lt,k+=t*At,M+=t*zt,t=a[11],ot+=t*d,tt+=t*dt,nt+=t*gt,et+=t*bt,P+=t*ft,D+=t*ut,T+=t*xt,j+=t*St,F+=t*mt,B+=t*wt,h+=t*vt,w+=t*_t,L+=t*Et,k+=t*Lt,M+=t*At,A+=t*zt,t=a[12],tt+=t*d,nt+=t*dt,et+=t*gt,P+=t*bt,D+=t*ft,T+=t*ut,j+=t*xt,F+=t*St,B+=t*mt,h+=t*wt,w+=t*vt,L+=t*_t,k+=t*Et,M+=t*Lt,A+=t*At,V+=t*zt,t=a[13],nt+=t*d,et+=t*dt,P+=t*gt,D+=t*bt,T+=t*ft,j+=t*ut,F+=t*xt,B+=t*St,h+=t*mt,w+=t*wt,L+=t*vt,k+=t*_t,M+=t*Et,A+=t*Lt,V+=t*At,st+=t*zt,t=a[14],et+=t*d,P+=t*dt,D+=t*gt,T+=t*bt,j+=t*ft,F+=t*ut,B+=t*xt,h+=t*St,w+=t*mt,L+=t*wt,k+=t*vt,M+=t*_t,A+=t*Et,V+=t*Lt,st+=t*At,ct+=t*zt,t=a[15],P+=t*d,D+=t*dt,T+=t*gt,j+=t*bt,F+=t*ft,B+=t*ut,h+=t*xt,w+=t*St,L+=t*mt,k+=t*wt,M+=t*vt,A+=t*_t,V+=t*Et,st+=t*Lt,ct+=t*At,lt+=t*zt,y+=38*D,m+=38*T,E+=38*j,N+=38*F,G+=38*B,I+=38*h,yt+=38*w,$+=38*L,Q+=38*k,J+=38*M,at+=38*A,ot+=38*V,tt+=38*st,nt+=38*ct,et+=38*lt,s=1,t=y+s+65535,s=Math.floor(t/65536),y=t-s*65536,t=m+s+65535,s=Math.floor(t/65536),m=t-s*65536,t=E+s+65535,s=Math.floor(t/65536),E=t-s*65536,t=N+s+65535,s=Math.floor(t/65536),N=t-s*65536,t=G+s+65535,s=Math.floor(t/65536),G=t-s*65536,t=I+s+65535,s=Math.floor(t/65536),I=t-s*65536,t=yt+s+65535,s=Math.floor(t/65536),yt=t-s*65536,t=$+s+65535,s=Math.floor(t/65536),$=t-s*65536,t=Q+s+65535,s=Math.floor(t/65536),Q=t-s*65536,t=J+s+65535,s=Math.floor(t/65536),J=t-s*65536,t=at+s+65535,s=Math.floor(t/65536),at=t-s*65536,t=ot+s+65535,s=Math.floor(t/65536),ot=t-s*65536,t=tt+s+65535,s=Math.floor(t/65536),tt=t-s*65536,t=nt+s+65535,s=Math.floor(t/65536),nt=t-s*65536,t=et+s+65535,s=Math.floor(t/65536),et=t-s*65536,t=P+s+65535,s=Math.floor(t/65536),P=t-s*65536,y+=s-1+37*(s-1),s=1,t=y+s+65535,s=Math.floor(t/65536),y=t-s*65536,t=m+s+65535,s=Math.floor(t/65536),m=t-s*65536,t=E+s+65535,s=Math.floor(t/65536),E=t-s*65536,t=N+s+65535,s=Math.floor(t/65536),N=t-s*65536,t=G+s+65535,s=Math.floor(t/65536),G=t-s*65536,t=I+s+65535,s=Math.floor(t/65536),I=t-s*65536,t=yt+s+65535,s=Math.floor(t/65536),yt=t-s*65536,t=$+s+65535,s=Math.floor(t/65536),$=t-s*65536,t=Q+s+65535,s=Math.floor(t/65536),Q=t-s*65536,t=J+s+65535,s=Math.floor(t/65536),J=t-s*65536,t=at+s+65535,s=Math.floor(t/65536),at=t-s*65536,t=ot+s+65535,s=Math.floor(t/65536),ot=t-s*65536,t=tt+s+65535,s=Math.floor(t/65536),tt=t-s*65536,t=nt+s+65535,s=Math.floor(t/65536),nt=t-s*65536,t=et+s+65535,s=Math.floor(t/65536),et=t-s*65536,t=P+s+65535,s=Math.floor(t/65536),P=t-s*65536,y+=s-1+37*(s-1),r[0]=y,r[1]=m,r[2]=E,r[3]=N,r[4]=G,r[5]=I,r[6]=yt,r[7]=$,r[8]=Q,r[9]=J,r[10]=at,r[11]=ot,r[12]=tt,r[13]=nt,r[14]=et,r[15]=P}function R(r,a){pt(r,a,a)}function K(r,a){var i=o(),t;for(t=0;t<16;t++)i[t]=a[t];for(t=253;t>=0;t--)R(i,i),t!==2&&t!==4&&pt(i,i,a);for(t=0;t<16;t++)r[t]=i[t]}function X(r,a){var i=o(),t;for(t=0;t<16;t++)i[t]=a[t];for(t=250;t>=0;t--)R(i,i),t!==1&&pt(i,i,a);for(t=0;t<16;t++)r[t]=i[t]}function O(r,a,i){var t=new Uint8Array(32),s=new Float64Array(80),y,m,E=o(),N=o(),G=o(),I=o(),yt=o(),$=o();for(m=0;m<31;m++)t[m]=a[m];for(t[31]=a[31]&127|64,t[0]&=248,Kt(s,i),m=0;m<16;m++)N[m]=s[m],I[m]=E[m]=G[m]=0;for(E[0]=I[0]=1,m=254;m>=0;--m)y=t[m>>>3]>>>(m&7)&1,Ht(E,N,y),Ht(G,I,y),Pt(yt,E,G),Ot(E,E,G),Pt(G,N,I),Ot(N,N,I),R(I,yt),R($,E),pt(E,G,E),pt(G,N,yt),Pt(yt,E,G),Ot(E,E,G),R(N,E),Ot(G,I,$),pt(E,G,_),Pt(E,E,I),pt(G,G,E),pt(E,I,$),pt(I,N,s),R(N,yt),Ht(E,N,y),Ht(G,I,y);for(m=0;m<16;m++)s[m+16]=E[m],s[m+32]=G[m],s[m+48]=N[m],s[m+64]=I[m];var Q=s.subarray(32),J=s.subarray(16);return K(Q,Q),pt(J,J,Q),Jt(r,J),0}function rt(r,a){return O(r,a,c)}function ht(r,a){return l(a,32),rt(r,a)}function kt(r,a,i){var t=new Uint8Array(32);return O(t,i,a),it(r,f,t,Mt)}var Ct=$t,ge=ue;function gn(r,a,i,t,s,y){var m=new Uint8Array(32);return kt(m,s,y),Ct(r,a,i,t,m)}function Yt(r,a,i,t,s,y){var m=new Uint8Array(32);return kt(m,s,y),ge(r,a,i,t,m)}var te=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Zn(r,a,i,t){for(var s=new Int32Array(16),y=new Int32Array(16),m,E,N,G,I,yt,$,Q,J,at,ot,tt,nt,et,P,D,T,j,F,B,h,w,L,k,M,A,V=r[0],st=r[1],ct=r[2],lt=r[3],d=r[4],dt=r[5],gt=r[6],bt=r[7],ft=a[0],ut=a[1],xt=a[2],St=a[3],mt=a[4],wt=a[5],vt=a[6],_t=a[7],Et=0;t>=128;){for(F=0;F<16;F++)B=8*F+Et,s[F]=i[B+0]<<24|i[B+1]<<16|i[B+2]<<8|i[B+3],y[F]=i[B+4]<<24|i[B+5]<<16|i[B+6]<<8|i[B+7];for(F=0;F<80;F++)if(m=V,E=st,N=ct,G=lt,I=d,yt=dt,$=gt,Q=bt,J=ft,at=ut,ot=xt,tt=St,nt=mt,et=wt,P=vt,D=_t,h=bt,w=_t,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=(d>>>14|mt<<18)^(d>>>18|mt<<14)^(mt>>>9|d<<23),w=(mt>>>14|d<<18)^(mt>>>18|d<<14)^(d>>>9|mt<<23),L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,h=d&dt^~d&gt,w=mt&wt^~mt&vt,L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,h=te[F*2],w=te[F*2+1],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,h=s[F%16],w=y[F%16],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,T=M&65535|A<<16,j=L&65535|k<<16,h=T,w=j,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=(V>>>28|ft<<4)^(ft>>>2|V<<30)^(ft>>>7|V<<25),w=(ft>>>28|V<<4)^(V>>>2|ft<<30)^(V>>>7|ft<<25),L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,h=V&st^V&ct^st&ct,w=ft&ut^ft&xt^ut&xt,L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,Q=M&65535|A<<16,D=L&65535|k<<16,h=G,w=tt,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=T,w=j,L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,G=M&65535|A<<16,tt=L&65535|k<<16,st=m,ct=E,lt=N,d=G,dt=I,gt=yt,bt=$,V=Q,ut=J,xt=at,St=ot,mt=tt,wt=nt,vt=et,_t=P,ft=D,F%16===15)for(B=0;B<16;B++)h=s[B],w=y[B],L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=s[(B+9)%16],w=y[(B+9)%16],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,T=s[(B+1)%16],j=y[(B+1)%16],h=(T>>>1|j<<31)^(T>>>8|j<<24)^T>>>7,w=(j>>>1|T<<31)^(j>>>8|T<<24)^(j>>>7|T<<25),L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,T=s[(B+14)%16],j=y[(B+14)%16],h=(T>>>19|j<<13)^(j>>>29|T<<3)^T>>>6,w=(j>>>19|T<<13)^(T>>>29|j<<3)^(j>>>6|T<<26),L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,s[B]=M&65535|A<<16,y[B]=L&65535|k<<16;h=V,w=ft,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[0],w=a[0],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[0]=V=M&65535|A<<16,a[0]=ft=L&65535|k<<16,h=st,w=ut,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[1],w=a[1],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[1]=st=M&65535|A<<16,a[1]=ut=L&65535|k<<16,h=ct,w=xt,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[2],w=a[2],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[2]=ct=M&65535|A<<16,a[2]=xt=L&65535|k<<16,h=lt,w=St,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[3],w=a[3],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[3]=lt=M&65535|A<<16,a[3]=St=L&65535|k<<16,h=d,w=mt,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[4],w=a[4],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[4]=d=M&65535|A<<16,a[4]=mt=L&65535|k<<16,h=dt,w=wt,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[5],w=a[5],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[5]=dt=M&65535|A<<16,a[5]=wt=L&65535|k<<16,h=gt,w=vt,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[6],w=a[6],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[6]=gt=M&65535|A<<16,a[6]=vt=L&65535|k<<16,h=bt,w=_t,L=w&65535,k=w>>>16,M=h&65535,A=h>>>16,h=r[7],w=a[7],L+=w&65535,k+=w>>>16,M+=h&65535,A+=h>>>16,k+=L>>>16,M+=k>>>16,A+=M>>>16,r[7]=bt=M&65535|A<<16,a[7]=_t=L&65535|k<<16,Et+=128,t-=128}return t}function le(r,a,i){var t=new Int32Array(8),s=new Int32Array(8),y=new Uint8Array(256),m,E=i;for(t[0]=1779033703,t[1]=3144134277,t[2]=1013904242,t[3]=2773480762,t[4]=1359893119,t[5]=2600822924,t[6]=528734635,t[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Zn(t,s,a,i),i%=128,m=0;m<i;m++)y[m]=a[E-i+m];for(y[i]=128,i=256-128*(i<112?1:0),y[i-9]=0,v(y,i-8,E/536870912|0,E<<3),Zn(t,s,y,i),m=0;m<8;m++)v(r,8*m,t[m],s[m]);return 0}function Ke(r,a){var i=o(),t=o(),s=o(),y=o(),m=o(),E=o(),N=o(),G=o(),I=o();Ot(i,r[1],r[0]),Ot(I,a[1],a[0]),pt(i,i,I),Pt(t,r[0],r[1]),Pt(I,a[0],a[1]),pt(t,t,I),pt(s,r[3],a[3]),pt(s,s,u),pt(y,r[2],a[2]),Pt(y,y,y),Ot(m,t,i),Ot(E,y,s),Pt(N,y,s),Pt(G,t,i),pt(r[0],m,E),pt(r[1],G,N),pt(r[2],N,E),pt(r[3],m,G)}function Qn(r,a,i){var t;for(t=0;t<4;t++)Ht(r[t],a[t],i)}function bn(r,a){var i=o(),t=o(),s=o();K(s,a[2]),pt(i,a[0],s),pt(t,a[1],s),Jt(r,t),r[31]^=ye(i)<<7}function mn(r,a,i){var t,s;for(Ut(r[0],g),Ut(r[1],b),Ut(r[2],b),Ut(r[3],g),s=255;s>=0;--s)t=i[s/8|0]>>(s&7)&1,Qn(r,a,t),Ke(a,r),Ke(r,r),Qn(r,a,t)}function Xe(r,a){var i=[o(),o(),o(),o()];Ut(i[0],x),Ut(i[1],C),Ut(i[2],b),pt(i[3],x,C),mn(r,i,a)}function hn(r,a,i){var t=new Uint8Array(64),s=[o(),o(),o(),o()],y;for(i||l(a,32),le(t,a,32),t[0]&=248,t[31]&=127,t[31]|=64,Xe(s,t),bn(r,s),y=0;y<32;y++)a[y+32]=r[y];return 0}var Ve=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function wn(r,a){var i,t,s,y;for(t=63;t>=32;--t){for(i=0,s=t-32,y=t-12;s<y;++s)a[s]+=i-16*a[t]*Ve[s-(t-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[t]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Ve[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Ve[s];for(t=0;t<32;t++)a[t+1]+=a[t]>>8,r[t]=a[t]&255}function vn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;wn(r,a)}function Jn(r,a,i,t){var s=new Uint8Array(64),y=new Uint8Array(64),m=new Uint8Array(64),E,N,G=new Float64Array(64),I=[o(),o(),o(),o()];le(s,t,32),s[0]&=248,s[31]&=127,s[31]|=64;var yt=i+64;for(E=0;E<i;E++)r[64+E]=a[E];for(E=0;E<32;E++)r[32+E]=s[32+E];for(le(m,r.subarray(32),i+32),vn(m),Xe(I,m),bn(r,I),E=32;E<64;E++)r[E]=t[E];for(le(y,r,i+64),vn(y),E=0;E<64;E++)G[E]=0;for(E=0;E<32;E++)G[E]=m[E];for(E=0;E<32;E++)for(N=0;N<32;N++)G[E+N]+=y[E]*s[N];return wn(r.subarray(32),G),yt}function eo(r,a){var i=o(),t=o(),s=o(),y=o(),m=o(),E=o(),N=o();return Ut(r[2],b),Kt(r[1],a),R(s,r[1]),pt(y,s,p),Ot(s,s,r[2]),Pt(y,r[2],y),R(m,y),R(E,m),pt(N,E,m),pt(i,N,s),pt(i,i,y),X(i,i),pt(i,i,s),pt(i,i,y),pt(i,i,y),pt(r[0],i,y),R(t,r[0]),pt(t,t,y),ze(t,s)&&pt(r[0],r[0],z),R(t,r[0]),pt(t,t,y),ze(t,s)?-1:(ye(r[0])===a[31]>>7&&Ot(r[0],g,r[0]),pt(r[3],r[0],r[1]),0)}function _n(r,a,i,t){var s,y=new Uint8Array(32),m=new Uint8Array(64),E=[o(),o(),o(),o()],N=[o(),o(),o(),o()];if(i<64||eo(N,t))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=t[s];if(le(m,r,i),vn(m),mn(E,N,m),Xe(N,a.subarray(32)),Ke(E,N),bn(y,E),i-=64,U(a,0,y,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var Sn=32,Ze=24,Ne=32,be=16,Be=32,Qe=32,Ie=32,Te=32,kn=32,tr=Ze,no=Ne,ro=be,Xt=64,ce=32,me=64,Cn=32,En=64;n.lowlevel={crypto_core_hsalsa20:it,crypto_stream_xor:ie,crypto_stream:Tt,crypto_stream_salsa20_xor:Dt,crypto_stream_salsa20:Rt,crypto_onetimeauth:Ae,crypto_onetimeauth_verify:se,crypto_verify_16:Y,crypto_verify_32:U,crypto_secretbox:$t,crypto_secretbox_open:ue,crypto_scalarmult:O,crypto_scalarmult_base:rt,crypto_box_beforenm:kt,crypto_box_afternm:Ct,crypto_box:gn,crypto_box_open:Yt,crypto_box_keypair:ht,crypto_hash:le,crypto_sign:Jn,crypto_sign_keypair:hn,crypto_sign_open:_n,crypto_secretbox_KEYBYTES:Sn,crypto_secretbox_NONCEBYTES:Ze,crypto_secretbox_ZEROBYTES:Ne,crypto_secretbox_BOXZEROBYTES:be,crypto_scalarmult_BYTES:Be,crypto_scalarmult_SCALARBYTES:Qe,crypto_box_PUBLICKEYBYTES:Ie,crypto_box_SECRETKEYBYTES:Te,crypto_box_BEFORENMBYTES:kn,crypto_box_NONCEBYTES:tr,crypto_box_ZEROBYTES:no,crypto_box_BOXZEROBYTES:ro,crypto_sign_BYTES:Xt,crypto_sign_PUBLICKEYBYTES:ce,crypto_sign_SECRETKEYBYTES:me,crypto_sign_SEEDBYTES:Cn,crypto_hash_BYTES:En,gf:o,D:p,L:Ve,pack25519:Jt,unpack25519:Kt,M:pt,A:Pt,S:R,Z:Ot,pow2523:X,add:Ke,set25519:Ut,modL:wn,scalarmult:mn,scalarbase:Xe};function er(r,a){if(r.length!==Sn)throw new Error("bad key size");if(a.length!==Ze)throw new Error("bad nonce size")}function oo(r,a){if(r.length!==Ie)throw new Error("bad public key size");if(a.length!==Te)throw new Error("bad secret key size")}function Ft(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function nr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Ft(r,a,i),er(i,a);for(var t=new Uint8Array(Ne+r.length),s=new Uint8Array(t.length),y=0;y<r.length;y++)t[y+Ne]=r[y];return $t(s,t,t.length,a,i),s.subarray(be)},n.secretbox.open=function(r,a,i){Ft(r,a,i),er(i,a);for(var t=new Uint8Array(be+r.length),s=new Uint8Array(t.length),y=0;y<r.length;y++)t[y+be]=r[y];return t.length<32||ue(s,t,t.length,a,i)!==0?null:s.subarray(Ne)},n.secretbox.keyLength=Sn,n.secretbox.nonceLength=Ze,n.secretbox.overheadLength=be,n.scalarMult=function(r,a){if(Ft(r,a),r.length!==Qe)throw new Error("bad n size");if(a.length!==Be)throw new Error("bad p size");var i=new Uint8Array(Be);return O(i,r,a),i},n.scalarMult.base=function(r){if(Ft(r),r.length!==Qe)throw new Error("bad n size");var a=new Uint8Array(Be);return rt(a,r),a},n.scalarMult.scalarLength=Qe,n.scalarMult.groupElementLength=Be,n.box=function(r,a,i,t){var s=n.box.before(i,t);return n.secretbox(r,a,s)},n.box.before=function(r,a){Ft(r,a),oo(r,a);var i=new Uint8Array(kn);return kt(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,t){var s=n.box.before(i,t);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Ie),a=new Uint8Array(Te);return ht(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Ft(r),r.length!==Te)throw new Error("bad secret key size");var a=new Uint8Array(Ie);return rt(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Ie,n.box.secretKeyLength=Te,n.box.sharedKeyLength=kn,n.box.nonceLength=tr,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Ft(r,a),a.length!==me)throw new Error("bad secret key size");var i=new Uint8Array(Xt+r.length);return Jn(i,r,r.length,a),i},n.sign.open=function(r,a){if(Ft(r,a),a.length!==ce)throw new Error("bad public key size");var i=new Uint8Array(r.length),t=_n(i,r,r.length,a);if(t<0)return null;for(var s=new Uint8Array(t),y=0;y<s.length;y++)s[y]=i[y];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),t=new Uint8Array(Xt),s=0;s<t.length;s++)t[s]=i[s];return t},n.sign.detached.verify=function(r,a,i){if(Ft(r,a,i),a.length!==Xt)throw new Error("bad signature size");if(i.length!==ce)throw new Error("bad public key size");var t=new Uint8Array(Xt+r.length),s=new Uint8Array(Xt+r.length),y;for(y=0;y<Xt;y++)t[y]=a[y];for(y=0;y<r.length;y++)t[y+Xt]=r[y];return _n(s,t,t.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ce),a=new Uint8Array(me);return hn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Ft(r),r.length!==me)throw new Error("bad secret key size");for(var a=new Uint8Array(ce),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Ft(r),r.length!==Cn)throw new Error("bad seed size");for(var a=new Uint8Array(ce),i=new Uint8Array(me),t=0;t<32;t++)i[t]=r[t];return hn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ce,n.sign.secretKeyLength=me,n.sign.seedLength=Cn,n.sign.signatureLength=Xt,n.hash=function(r){Ft(r);var a=new Uint8Array(En);return le(a,r,r.length),a},n.hash.hashLength=En,n.verify=function(r,a){return Ft(r,a),r.length===0||a.length===0||r.length!==a.length?!1:S(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,t){var s,y=new Uint8Array(t);for(s=0;s<t;s+=a)r.getRandomValues(y.subarray(s,s+Math.min(t-s,a)));for(s=0;s<t;s++)i[s]=y[s];nr(y)})}else typeof Vi<"u"&&(r=Ji,r&&r.randomBytes&&n.setPRNG(function(i,t){var s,y=r.randomBytes(t);for(s=0;s<t;s++)i[s]=y[s];nr(y)}))})()})(e.exports?e.exports:self.nacl=self.nacl||{})})(In)),In.exports}var ea=ta();const na=Ki(ea);function ra(e){if(e.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let p=0;p<n.length;p++)n[p]=255;for(let p=0;p<e.length;p++){const u=e.charAt(p),x=u.charCodeAt(0);if(n[x]!==255)throw new TypeError(u+" is ambiguous");n[x]=p}const o=e.length,l=e.charAt(0),f=Math.log(o)/Math.log(256),c=Math.log(256)/Math.log(o);function g(p){if(p instanceof Uint8Array||(ArrayBuffer.isView(p)?p=new Uint8Array(p.buffer,p.byteOffset,p.byteLength):Array.isArray(p)&&(p=Uint8Array.from(p))),!(p instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(p.length===0)return"";let u=0,x=0,C=0;const z=p.length;for(;C!==z&&p[C]===0;)C++,u++;const v=(z-C)*c+1>>>0,S=new Uint8Array(v);for(;C!==z;){let H=p[C],q=0;for(let W=v-1;(H!==0||q<x)&&W!==-1;W--,q++)H+=256*S[W]>>>0,S[W]=H%o>>>0,H=H/o>>>0;if(H!==0)throw new Error("Non-zero carry");x=q,C++}let Y=v-x;for(;Y!==v&&S[Y]===0;)Y++;let U=l.repeat(u);for(;Y<v;++Y)U+=e.charAt(S[Y]);return U}function b(p){if(typeof p!="string")throw new TypeError("Expected String");if(p.length===0)return new Uint8Array;let u=0,x=0,C=0;for(;p[u]===l;)x++,u++;const z=(p.length-u)*f+1>>>0,v=new Uint8Array(z);for(;u<p.length;){const H=p.charCodeAt(u);if(H>255)return;let q=n[H];if(q===255)return;let W=0;for(let it=z-1;(q!==0||W<C)&&it!==-1;it--,W++)q+=o*v[it]>>>0,v[it]=q%256>>>0,q=q/256>>>0;if(q!==0)throw new Error("Non-zero carry");C=W,u++}let S=z-C;for(;S!==z&&v[S]===0;)S++;const Y=new Uint8Array(x+(z-S));let U=x;for(;S!==z;)Y[U++]=v[S++];return Y}function _(p){const u=b(p);if(u)return u;throw new Error("Non-base"+o+" character")}return{encode:g,decodeUnsafe:b,decode:_}}var oa="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const pr=ra(oa),Kn="cbsgo_wallet_v3",xn="cbsgo_wallet_unlocked_v3";function He(){try{const e=localStorage.getItem(Kn);if(!e)return null;const n=JSON.parse(e);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function ia(e){localStorage.setItem(Kn,JSON.stringify({pk:String(e.pk),sk:String(e.sk),pin:String(e.pin)}))}function aa(){const e=na.sign.keyPair(),n=pr.encode(e.publicKey),o=pr.encode(e.secretKey);return{pk:n,sk:o}}function Yr(){return!!He()}function sa(){return He()?sessionStorage.getItem(xn)==="1":!1}function la(e){const n=String(e||"");if(n.length<4)throw new Error("PIN too short");He()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:f}=aa();return ia({pk:l,sk:f,pin:n}),sessionStorage.setItem(xn,"1"),l}function ca(e){const n=He();if(!n)throw new Error("No wallet");if(String(e||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(xn,"1"),n.pk}function qt(){const e=He();return e?e.pk:""}function fa(){localStorage.removeItem(Kn),sessionStorage.removeItem(xn)}typeof window<"u"&&(window.cbsgoDevResetWallet=fa);const qr="cbsgoLoginModal";function Hr(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Kr(){const e=document.getElementById(qr);e&&e.remove()}function da(e){Kr();const n=document.createElement("div");return n.id=qr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=e,document.body.appendChild(n),n}function pa(e,n){return`
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
      ">${Hr(e)}</div>

      <div style="padding:14px 16px;">
        ${n}
      </div>
    </div>
  `}function Je(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function ur(e=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${e?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ua(){const e=!Yr();let n="";try{const u=qe();e?u&&u!=="Sovereign"?n=u:n="":n=u||""}catch{n=""}const o=e?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Hr(n)}" style="${Je()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Je()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${Je()}" placeholder="••••" />
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
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${Je()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${ur(!0)}">Unlock</button>
      </div>
    `,l=da(pa(e?"Welcome to CBS-GO":"Unlock Wallet",o)),f=l.querySelector("#cbsgoLoginMsg"),c=u=>{f&&(f.textContent=u||"")},g=l.querySelector("#cbsgoPin"),b=l.querySelector("#cbsgoPin2"),_=l.querySelector("#cbsgoNick"),p=()=>{Kr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const u=l.querySelector("#cbsgoCreateBtn");u&&(u.onclick=async()=>{try{const x=String(_?.value||"").trim(),C=String(g?.value||"").trim(),z=String(b?.value||"").trim();if(x.length<2)return c("⛔ Nickname too short.");if(C.length<4)return c("⛔ PIN must be at least 4 digits.");if(C!==z)return c("⛔ PINs do not match.");c("Creating wallet…"),Rr(x),await la(C),c("✅ Wallet created. Starting…"),p()}catch(x){c(`⛔ ${String(x?.message||x)}`)}})}else{const u=l.querySelector("#cbsgoUnlockBtn");u&&(u.onclick=async()=>{try{const x=String(g?.value||"").trim();if(x.length<4)return c("⛔ PIN must be at least 4 digits.");c("Unlocking…"),await ca(x),c("✅ Unlocked."),p()}catch{c("⛔ Wrong PIN (or wallet data missing).")}})}}const xa="https://cxfedvowjgkqrakkkjpi.supabase.co",ya="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",jt=io(xa,ya);function ga(){const e=qt();if(!e)return null;const n=qe(),o=Yn();return{wallet_pk:e,nickname:n,avatar:o}}async function on(e={}){try{const n=ga();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...e,last_seen:new Date().toISOString()},{error:l}=await jt.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ba=15e3,ma=1e4,ha=300*1e3;let Pe=null,xr=0,yr=0;function wa(e){const n=e?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pe={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",wa));async function va(){const e=qt();if(!e||!Pe)return;const n=Date.now();if(n-xr<5e3)return;xr=n;const l=(qe()||"").trim()||"Anon",f={wallet_pk:e,nickname:l,lat:Pe.lat,lng:Pe.lng,heading:Pe.heading,last_seen:new Date().toISOString()};try{const{data:c,error:g}=await jt.from("player_state").select("id").eq("wallet_pk",e).limit(1);if(g){console.warn("CBS GO: player_state select failed",g);return}if(c&&c.length>0){const b=c[0].id,{error:_}=await jt.from("player_state").update(f).eq("id",b);_&&console.warn("CBS GO: player_state update failed",_)}else{const{error:b}=await jt.from("player_state").insert(f);b&&console.warn("CBS GO: player_state insert failed",b)}}catch(c){console.warn("CBS GO: pushMyState error",c)}}async function _a(){const e=qt();if(!e)return;const n=Date.now();if(n-yr<3e3)return;yr=n;const o=new Date(Date.now()-ha).toISOString();try{const{data:l,error:f}=await jt.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(f){console.warn("CBS GO: fetch online players failed",f);return}const c=Array.isArray(l)?l:[],g=Array.from(new Set(c.map(p=>p.wallet_pk).filter(p=>typeof p=="string"&&p.length>0)));let b=new Map;if(g.length>0){const{data:p,error:u}=await jt.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",g);u?console.warn("CBS GO: fetch player profiles failed",u):Array.isArray(p)&&(b=new Map(p.map(x=>[x.wallet_pk,x])))}const _=c.map(p=>{const u=p.lat,x=p.lng,C=typeof u=="number"?u:parseFloat(u),z=typeof x=="number"?x:parseFloat(x);if(!Number.isFinite(C)||!Number.isFinite(z))return null;const v=b.get(p.wallet_pk)||null,S=v&&v.nickname||p.nickname||"Anon",Y=v&&v.avatar?String(v.avatar):"";return{wallet_pk:p.wallet_pk||"",nickname:S,avatar:Y,lat:C,lng:z,heading:typeof p.heading=="number"?p.heading:null,last_seen:p.last_seen,isMe:p.wallet_pk===e}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:_}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function Sa(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{va()},ba),setInterval(()=>{_a()},ma))}Sa();function Xr(){const e=qt();if(!e)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return e}function cn(e,n){console.warn(`CBS GO friends: ${e} failed`,n)}async function ka(e){const n=Xr(),o=String(e||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await jt.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw cn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function Ca(e){const n=Xr(),o=e;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:f}=await jt.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(f)throw cn("acceptFriendRequest",f),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Ea(){const e=qt();if(!e)return{incoming:[],accepted:[]};const{data:n,error:o}=await jt.from("friends").select("*").or(`a_wallet.eq.${e},b_wallet.eq.${e}`).order("created_at",{ascending:!1});if(o)throw cn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],f=[],c=[];for(const b of l){const _=b.b_wallet===e&&b.status==="pending",p=b.status==="accepted"&&(b.a_wallet===e||b.b_wallet===e);if(!_&&!p)continue;const u=b.a_wallet===e?b.b_wallet:b.a_wallet,x={id:b.id,a_wallet:b.a_wallet,b_wallet:b.b_wallet,status:b.status,created_at:b.created_at,otherWallet:u,nickname:null,avatar:""};_&&f.push(x),p&&c.push(x)}const g=Array.from(new Set([...f,...c].map(b=>b.otherWallet).filter(Boolean)));if(g.length>0){const{data:b,error:_}=await jt.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",g);if(!_&&Array.isArray(b)){const p=new Map;for(const x of b)x.wallet_pk&&p.set(String(x.wallet_pk),{nickname:x.nickname||null,avatar:x.avatar||""});const u=x=>{x.forEach(C=>{const z=p.get(C.otherWallet);z&&(C.nickname=z.nickname||null,C.avatar=z.avatar||"")})};u(f),u(c)}else _&&cn("loadFriendsOverview:players",_)}return{incoming:f,accepted:c}}let Re=null;async function Vr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Re=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Re.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(e){console.warn("CBS-GO: wake lock request faalde",e)}}async function Ma(){try{Re&&(await Re.release(),Re=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(e){console.warn("CBS-GO: wake lock release faalde",e)}}function La(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Vr():await Ma()}catch(e){console.warn("CBS-GO: visibility wake lock error",e)}})}function Aa(){const e=qt();if(!e)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return e}function za(e){return String(e||"").trim()}async function Zr(e,n={}){const o=Aa(),l=za(e),f=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),c=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0))),g=n.cardId?String(n.cardId||"").trim():"",b=Math.max(0,Math.floor(Number(n.cardQty!=null?n.cardQty:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!f&&!c&&!b)throw new Error("Set tickets, CBS and/or cards above 0.");if(b>0&&!g)throw new Error("Select a card to send.");if(f>0&&Mr()<f)throw new Error("Not enough tickets in your bag.");if(c>0&&Lr()<c)throw new Error("Not enough CBS (play money) in your bag.");if(b>0&&_o(g)<b)throw new Error("Not enough of that card in your collection.");let _=0,p=0,u=null,x=0;try{f>0&&(wo(f),_=f),c>0&&(vo(c),p=c),b>0&&g&&(So(g,b),u=g,x=b);const{error:C}=await jt.from("trades").insert({from_wallet:o,to_wallet:l,tickets:f||0,cbs:c||0,card_id:g||null,card_qty:b||null,status:"sent"});if(C)throw _>0&&Le(_),p>0&&pn(p),u&&x>0&&zr(u,x),console.warn("CBS GO sendGiftToWallet Supabase error",C),new Error(C.message||"Could not save gift to Supabase (permissions or network issue).");if(typeof window<"u")try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftSent",{detail:{toWallet:l,tickets:f,cbs:c,cardId:g||null,cardQty:b||0}}))}catch(z){console.warn("CBS GO: dispatch friendGiftSent failed",z)}return{ok:!0}}catch(C){throw C instanceof Error?C:new Error(String(C?.message||C)||"Failed to send gift.")}}async function Xn(){const e=qt();if(e)try{const{data:n,error:o}=await jt.from("trades").select("*").eq("to_wallet",e).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const c=Array.from(new Set(n.map(g=>g&&g.from_wallet).filter(g=>typeof g=="string"&&g.trim().length>0)));if(c.length>0){const{data:g,error:b}=await jt.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",c);!b&&Array.isArray(g)?l=new Map(g.filter(_=>_&&_.wallet_pk).map(_=>[String(_.wallet_pk),{nickname:_.nickname||null,avatar:_.avatar||""}])):b&&console.warn("CBS GO pullIncomingGifts players error",b)}}catch(c){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",c)}const f=[];for(const c of n){if(!c)continue;const g=Number(c.tickets||0),b=Number(c.cbs||0),_=c.card_id?String(c.card_id||"").trim():"",p=Math.max(0,Number(c.card_qty||0));if(g>0&&Le(g),b>0&&pn(b),_&&p>0&&zr(_,p),(g>0||b>0||_&&p>0)&&typeof window<"u"){const u=l.get(c.from_wallet)||{nickname:null,avatar:""},x={id:c.id||null,fromWallet:c.from_wallet||"",toWallet:c.to_wallet||"",tickets:g,cbs:b,cardId:_||null,cardQty:p||0,createdAt:c.created_at||null,senderNickname:u.nickname||null,senderAvatar:u.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:x}))}catch(C){console.warn("CBS GO: dispatch friendGiftReceived failed",C)}}c.id&&f.push(c.id)}if(f.length>0){const{error:c}=await jt.from("trades").update({status:"claimed"}).in("id",f);c&&console.warn("CBS GO pullIncomingGifts update status error",c)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(e,n=0,o=0,l=null,f=0)=>Zr(e,{tickets:n,cbs:o,cardId:l,cardQty:f}),window.cbsgoPullGifts=Xn);function Nt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Vn(e,n=30){const o=e?`background-image:url('${e}');`:"";return`
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
    ">${e?"":"👤"}</div>
  `}function Fe(e){if(!e)return"";const n=String(e);return n.length<=12?n:`${n.slice(0,5)}…${n.slice(-4)}`}function yn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Fn(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function gr(e,n){return`
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
          <div style="font-weight:900; font-size:15px;">${Nt(e)}</div>
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
  `}function Na(){const e=qe(),n=Yn(),o=qt();return`
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
        ${Vn(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Nt(e)}" maxlength="24" style="
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
                    ${Nt(o)}
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
  `}function Ba(){const e=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const f=v=>{const S=document.querySelector("#profileMsg");S&&(S.textContent=v||"")};e&&f(e.value?`✅ Profile loaded: ${e.value}`:"");const c=()=>{if(!e)return;const v=Rr(e.value);f(`✅ Name saved: ${v}`);try{on()}catch(S){console.warn("CBS GO: failed to sync profile after name change",S)}};e&&(e.addEventListener("input",()=>{f("Saving…"),l&&clearTimeout(l),l=setTimeout(c,300)}),e.addEventListener("blur",()=>{l&&clearTimeout(l),c()})),n&&n.addEventListener("change",()=>{const v=n.files&&n.files[0];if(!v)return;if(v.size>15e5){f("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}f("Uploading photo…");const S=new FileReader;S.onload=()=>{ii(String(S.result||"")),f("✅ Photo saved"),Ee();try{on()}catch(Y){console.warn("CBS GO: failed to sync profile after avatar change",Y)}},S.onerror=()=>f("⛔ Failed to read image."),S.readAsDataURL(v)}),o&&(o.onclick=()=>{ai(),f("✅ Photo removed"),Ee();try{on()}catch(v){console.warn("CBS GO: failed to sync profile after avatar removal",v)}});const g=document.querySelector("#friendWalletInput"),b=document.querySelector("#friendSendBtn"),_=document.querySelector("#friendsMsg"),p=document.querySelector("#friendsIncomingList"),u=document.querySelector("#friendsAcceptedList"),x=v=>{_&&(_.textContent=v||"")},C=(v,S="")=>{const Y=v.nickname&&v.nickname.trim()?v.nickname.trim():Fe(v.otherWallet),U=Fe(v.otherWallet),H=Vn(v.avatar||"",32),q=v.otherWallet||"";return`
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
          ${H}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Nt(Y||"Friend")}
            </div>
            ${U?`<div style="font-size:11px;opacity:.7;">${Nt(U)}</div>`:""}
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">
          <button
            type="button"
            class="friendCopyBtn"
            data-wallet="${Nt(q)}"
            style="
              padding:3px 8px;
              border-radius:999px;
              border:1px solid rgba(148,163,184,.8);
              background:rgba(15,23,42,.95);
              color:#e5e7eb;
              font-size:10px;
              cursor:pointer;
            "
          >
            Copy
          </button>
          ${S||""}
        </div>
      </div>
    `};async function z(){if(!(!p||!u))try{p.textContent="Loading…",u.textContent="Loading…";const v=await Ea();v.incoming.length?p.innerHTML=v.incoming.map(S=>{const Y=`
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${S.id}"
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
            `;return C(S,Y)}).join(""):p.textContent="No incoming requests.",v.accepted.length?u.innerHTML=v.accepted.map(S=>C(S,`
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
            `)).join(""):u.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(S=>{S.addEventListener("click",async()=>{const Y=S.getAttribute("data-friend-id");if(Y){x("Accepting friend…"),S.disabled=!0;try{await Ca(Y),x("✅ Friend added."),await z()}catch(U){console.warn(U),x(`⛔ ${U.message||U}`),S.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(S=>{S.addEventListener("click",async()=>{const Y=S.getAttribute("data-wallet")||"";if(Y)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(Y),x("✅ Friend wallet copied.")):x("📋 Copy not supported in this browser.")}catch(U){console.warn("CBS GO: copy friend wallet failed",U),x("⛔ Could not copy wallet.")}})})}catch(v){console.warn("CBS GO: refreshFriends failed",v),p.textContent="Could not load friends.",u.textContent=""}}b&&g&&b.addEventListener("click",async()=>{const v=g.value.trim();if(!v){x("Enter a wallet address first.");return}x("Sending friend request…"),b.disabled=!0;try{await ka(v),x("✅ Friend request sent."),g.value="",await z()}catch(S){console.warn(S),x(`⛔ ${S.message||S}`)}finally{b.disabled=!1}}),z().catch(()=>{})}function Ia(){const e=Mr(),n=Lr(),o=qt(),l=Ar(),f=Object.entries(l||{}).filter(([,g])=>Number(g||0)>0);let c="";return f.length>0?c=`
      <div style="margin-top:6px;">
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
          ${f.map(([b,_])=>`<option value="${Nt(b)}">${Nt(b)} (x${_})</option>`).join("")}
        </select>
        <div style="margin-top:6px;">
          <label for="giftCardQtyInput" style="font-size:11px;opacity:.8;">Quantity</label>
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
    `:c=`
      <div style="margin-top:8px;font-size:11px;opacity:.7;">
        You don’t have any cards yet to send.
      </div>
    `,`
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
          🎟️ Tickets: <b>${e}</b>
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
                ${Nt(o)}
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

          ${c}

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
  `}function Ta(){const e=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Hi()}catch(C){console.warn("CBS GO: openCardsPanel failed",C)}});const l=qt(),f=document.querySelector("#giftWalletInput"),c=document.querySelector("#giftTicketsInput"),g=document.querySelector("#giftCbsInput"),b=document.querySelector("#giftCardSelect"),_=document.querySelector("#giftCardQtyInput"),p=document.querySelector("#giftSendBtn"),u=document.querySelector("#giftMsg"),x=C=>{u&&(u.textContent=C||"")};if(p&&f&&p.addEventListener("click",async()=>{const C=f.value.trim(),z=c?.value??"",v=g?.value??"",S=b?b.value:"";let Y=_?.value??"";const U=Number(z||"0"),H=Number(v||"0");let q=Number(Y||"0");if(Number.isFinite(q)||(q=0),q=Math.max(0,Math.floor(q)),!C){x("Enter a wallet address first.");return}if((!U||U<=0)&&(!H||H<=0)&&(!q||q<=0)){x("Set tickets, CBS and/or cards above 0.");return}if(q>0&&!S){x("Select a card if you set a card quantity.");return}p.disabled=!0,x("Sending gift…");try{await Zr(C,{tickets:U,cbs:H,cardId:S,cardQty:q}),x("✅ Gift sent."),c&&(c.value=""),g&&(g.value=""),_&&(_.value="")}catch(W){console.warn(W),x(`⛔ ${W.message||"Could not send gift."}`)}finally{p.disabled=!1}}),e&&l){const C=z=>{n&&(n.textContent=z||"")};e.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),C("✅ Wallet address copied to clipboard.")):C("📋 Copy not supported in this browser.")}catch{C("⛔ Failed to copy address.")}}}Xn().catch(()=>{})}function Qr(){const e=yn();return e==="profile"?gr("Profile",`<div id="profileMount">${Na()}</div>`):e==="bag"?gr("Bag",`<div id="bagMount">${Ia()}</div>`):""}function $a(){return`
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
          ${$r()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Pr()}
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

      <!-- Panel-root: alleen deze wordt gewisseld bij tabs -->
      <div id="panelRoot">
        ${Qr()}
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

      ${Or()?`<button id="resetBtn" type="button" style="
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
  `}function Ee(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=Qr();const n=yn();n==="profile"&&Ba(),n==="bag"&&Ta();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Fn("map"),Ee()})}function Pa(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-panel"),o=yn();Fn(o===n?"map":n||"map"),Ee()})})}function br(){const e=document.querySelector("#app");if(!e)return;e.innerHTML=$a();try{Vr(),La()}catch(p){console.warn("CBS GO: wake lock niet beschikbaar",p)}try{on()}catch(p){console.warn("CBS GO: failed to sync player profile (ignored)",p)}if(Pa(),Ui(),ri(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const p=()=>{const u=document.querySelector("#stepsMount");u&&(u.innerHTML=Pr())};window.addEventListener("cbsgo:stepsChanged",p)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const p=()=>{const u=document.querySelector("#xpMount");u&&(u.innerHTML=$r())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(u=>{window.addEventListener(u,p)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const p=()=>{yn()==="bag"&&Ee()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(u=>{window.addEventListener(u,p)})}let n=null;function o(p){const u=document.querySelector("#cbsgoToastHost");if(!u)return;let x=u.querySelector(".cbsgoToastBox");x||(x=document.createElement("div"),x.className="cbsgoToastBox",x.style.pointerEvents="auto",x.style.padding="8px 12px",x.style.borderRadius="999px",x.style.border="1px solid rgba(255,255,255,.25)",x.style.background="rgba(10,12,18,.88)",x.style.backdropFilter="blur(10px)",x.style.color="#fff",x.style.fontFamily="system-ui,sans-serif",x.style.fontSize="11px",x.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",x.style.opacity="0",x.style.transform="translateY(10px)",x.style.transition="opacity .25s ease-out, transform .25s ease-out",u.appendChild(x)),x.textContent=p||"",x.style.opacity="1",x.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{x.style.opacity="0",x.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",p=>{const u=p?.detail||{},x=Number(u.xp||0),C=Number(u.tickets||0),z=Number(u.cbs||0);if(!x&&!C&&!z)return;const v=[];x&&v.push(`+${x} XP`),C&&v.push(`+${C} ticket${C===1?"":"s"}`),z&&v.push(`+${z} CBS`);let S="Walking reward";u.reason==="boost"?S="Glow boost":u.reason==="treasure"||u.reason==="treasure-rare"?S="Treasure reward":u.reason==="distance"&&(S="Distance reward"),o(`${S}: ${v.join(" · ")}`)}));const l=()=>document.querySelector("#cbsgoLootOverlayHost");function f(p){const u=l();if(!u)return;u.innerHTML="";const x=Number(p?.steps||0),C=Number(p?.goal||0),z=p?.dayKey||"",v=document.createElement("div");v.style.position="fixed",v.style.inset="0",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.background="rgba(5,7,11,0.80)",v.style.pointerEvents="auto";const S=document.createElement("div");S.style.width="min(340px, 92vw)",S.style.borderRadius="22px",S.style.border="1px solid rgba(56,189,248,.85)",S.style.background="rgba(10,12,18,0.98)",S.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",S.style.padding="20px 18px 16px 18px",S.style.textAlign="center",S.style.color="#fff",S.style.fontFamily="system-ui,sans-serif",S.style.opacity="0",S.style.transform="translateY(14px) scale(0.96)",S.style.transition="opacity .25s ease-out, transform .25s ease-out";const Y=C?`${x}/${C} steps`:`${x} steps`;S.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${z?` (${z})`:""}.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#7dd3fc;
      ">
        ${Y}
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
    `,v.appendChild(S),u.appendChild(v),requestAnimationFrame(()=>{S.style.opacity="1",S.style.transform="translateY(0) scale(1)"});const U=()=>{S.style.opacity="0",S.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{u.innerHTML=""},250)},H=document.getElementById("cbsgoDailyGoalCloseBtn");H&&(H.onclick=U),v.addEventListener("click",q=>{q.target===v&&U()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",p=>{f(p?.detail||{})}));function c(p){const u=l();if(!u)return;const x=Number(p?.xp||0),C=Number(p?.tickets||0),z=Number(p?.cbs||0);if(!x&&!C&&!z)return;u.innerHTML="";const v=document.createElement("div");v.style.position="fixed",v.style.inset="0",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.background="rgba(5,7,11,0.75)",v.style.pointerEvents="auto";const S=document.createElement("div");S.style.width="min(320px, 90vw)",S.style.borderRadius="22px",S.style.border="1px solid rgba(255,255,255,.4)",S.style.background="rgba(10,12,18,0.96)",S.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",S.style.padding="18px 18px 16px 18px",S.style.textAlign="center",S.style.color="#fff",S.style.fontFamily="system-ui,sans-serif",S.style.opacity="0",S.style.transform="translateY(12px) scale(0.97)",S.style.transition="opacity .25s ease-out, transform .25s ease-out";const Y=[];x&&Y.push(`+${x} XP`),C&&Y.push(`+${C} ticket${C===1?"":"s"}`),z&&Y.push(`+${z} CBS`),S.innerHTML=`
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
        ${Nt(Y.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,v.appendChild(S),u.appendChild(v),requestAnimationFrame(()=>{S.style.opacity="1",S.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{S.style.opacity="0",S.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{u.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",p=>{c(p?.detail||{})}));function g(p){const u=l();if(!u)return;u.innerHTML="";const x=Number(p?.days||7),C=Number(p?.rewardCbs||0),z=document.createElement("div");z.style.position="fixed",z.style.inset="0",z.style.display="flex",z.style.alignItems="center",z.style.justifyContent="center",z.style.background="rgba(5,7,11,0.80)",z.style.pointerEvents="auto";const v=document.createElement("div");v.style.width="min(340px, 92vw)",v.style.borderRadius="22px",v.style.border="1px solid rgba(251,191,36,.85)",v.style.background="rgba(10,12,18,0.98)",v.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",v.style.padding="20px 18px 16px 18px",v.style.textAlign="center",v.style.color="#fff",v.style.fontFamily="system-ui,sans-serif",v.style.opacity="0",v.style.transform="translateY(14px) scale(0.96)",v.style.transition="opacity .25s ease-out, transform .25s ease-out",v.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${x}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${x} days in a row.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#facc15;
      ">
        +${C} CBS (play money)
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
    `,z.appendChild(v),u.appendChild(z),requestAnimationFrame(()=>{v.style.opacity="1",v.style.transform="translateY(0) scale(1)"});const S=()=>{v.style.opacity="0",v.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{u.innerHTML=""},250)},Y=document.getElementById("cbsgoStreakCloseBtn");Y&&(Y.onclick=S),z.addEventListener("click",U=>{U.target===z&&S()})}window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",p=>{g(p?.detail||{})}));function b(p){const u=l();if(!u)return;const x=Number(p?.tickets||0),C=Number(p?.cbs||0),z=p?.cardId||null,v=Number(p?.cardQty||0);if(!x&&!C&&!(z&&v>0))return;const S=p?.fromWallet||"",Y=p?.senderNickname||"",U=Y&&Y.trim()?Y.trim():Fe(S)||"Friend",H=p?.senderAvatar||"";u.innerHTML="";const q=document.createElement("div");q.style.position="fixed",q.style.inset="0",q.style.display="flex",q.style.alignItems="center",q.style.justifyContent="center",q.style.background="rgba(5,7,11,0.80)",q.style.pointerEvents="auto";const W=document.createElement("div");W.style.width="min(340px, 92vw)",W.style.borderRadius="22px",W.style.border="1px solid rgba(56,189,248,.85)",W.style.background="rgba(10,12,18,0.98)",W.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",W.style.padding="18px 18px 14px 18px",W.style.textAlign="center",W.style.color="#fff",W.style.fontFamily="system-ui,sans-serif",W.style.opacity="0",W.style.transform="translateY(14px) scale(0.96)",W.style.transition="opacity .25s ease-out, transform .25s ease-out";const it=[];x&&it.push(`+${x} ticket${x===1?"":"s"}`),C&&it.push(`+${C} CBS`),z&&v>0&&it.push(`Card: ${z} × ${v}`);const Mt=Vn(H||"",44);W.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;">
        <div>${Mt}</div>
        <div style="text-align:left;">
          <div style="font-size:12px;opacity:.8;">Gift from</div>
          <div style="font-size:14px;font-weight:700;">${Nt(U)}</div>
          <div style="font-size:11px;opacity:.6;">${Nt(Fe(S))}</div>
        </div>
      </div>
      <div style="font-size:28px;margin-bottom:4px;">🎁</div>
      <div style="font-weight:800;font-size:16px;margin-bottom:4px;">
        You received a gift!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:8px;">
        Added to your bag:
      </div>
      <div style="
        font-size:13px;
        font-weight:600;
        margin-bottom:10px;
      ">
        ${Nt(it.join(" · "))}
      </div>
      <button type="button" id="cbsgoFriendGiftCloseBtn" style="
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
    `,q.appendChild(W),u.appendChild(q),requestAnimationFrame(()=>{W.style.opacity="1",W.style.transform="translateY(0) scale(1)"});const Dt=()=>{W.style.opacity="0",W.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{u.innerHTML=""},220)},Rt=document.getElementById("cbsgoFriendGiftCloseBtn");Rt&&(Rt.onclick=Dt),q.addEventListener("click",Tt=>{Tt.target===q&&Dt()})}window.__cbsgo_friend_gift_received_listener||(window.__cbsgo_friend_gift_received_listener=!0,window.addEventListener("cbsgo:friendGiftReceived",p=>{b(p?.detail||{})}));function _(p){const u=l();if(!u)return;const x=Number(p?.tickets||0),C=Number(p?.cbs||0),z=p?.cardId||null,v=Number(p?.cardQty||0);if(!x&&!C&&!(z&&v>0))return;const S=p?.toWallet||"",Y=Fe(S)||"Friend";u.innerHTML="";const U=document.createElement("div");U.style.position="fixed",U.style.inset="0",U.style.display="flex",U.style.alignItems="center",U.style.justifyContent="center",U.style.background="rgba(5,7,11,0.72)",U.style.pointerEvents="auto";const H=document.createElement("div");H.style.width="min(340px, 92vw)",H.style.borderRadius="22px",H.style.border="1px solid rgba(34,197,94,.85)",H.style.background="rgba(10,12,18,0.98)",H.style.boxShadow="0 24px 80px rgba(0,0,0,.9)",H.style.padding="16px 18px 14px 18px",H.style.textAlign="center",H.style.color="#fff",H.style.fontFamily="system-ui,sans-serif",H.style.opacity="0",H.style.transform="translateY(12px) scale(0.97)",H.style.transition="opacity .25s ease-out, transform .25s ease-out";const q=[];x&&q.push(`-${x} ticket${x===1?"":"s"}`),C&&q.push(`-${C} CBS`),z&&v>0&&q.push(`-${v}× ${z} card${v===1?"":"s"}`),H.innerHTML=`
      <div style="font-size:26px;margin-bottom:6px;">📨</div>
      <div style="font-weight:800;font-size:16px;margin-bottom:4px;">
        Gift sent
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:8px;">
        Your gift is on its way to:
      </div>
      <div style="
        font-size:13px;
        font-weight:600;
        margin-bottom:8px;
      ">
        ${Nt(Y)}
      </div>
      <div style="font-size:11px;opacity:.7;margin-bottom:6px;">
        ${Nt(S)}
      </div>
      <div style="
        font-size:13px;
        font-weight:600;
        margin-bottom:10px;
      ">
        ${Nt(q.join(" · "))}
      </div>
      <button type="button" id="cbsgoFriendGiftSentCloseBtn" style="
        padding:7px 14px;
        border-radius:999px;
        border:1px solid rgba(34,197,94,.9);
        background:rgba(22,163,74,.95);
        color:#ecfdf5;
        font-size:12px;
        font-weight:600;
        cursor:pointer;
      ">
        Nice
      </button>
    `,U.appendChild(H),u.appendChild(U),requestAnimationFrame(()=>{H.style.opacity="1",H.style.transform="translateY(0) scale(1)"});const W=()=>{H.style.opacity="0",H.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{u.innerHTML=""},220)},it=document.getElementById("cbsgoFriendGiftSentCloseBtn");it&&(it.onclick=W),U.addEventListener("click",Mt=>{Mt.target===U&&W()})}if(window.__cbsgo_friend_gift_sent_listener||(window.__cbsgo_friend_gift_sent_listener=!0,window.addEventListener("cbsgo:friendGiftSent",p=>{_(p?.detail||{})})),Ee(),Or()){const p=document.querySelector("#resetBtn");p&&p.addEventListener("click",oi)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",p=>{const u=p?.detail?.id;if(!u)return;if(u==="__daily__"){$n({id:"__daily__",name:"Daily Glow"});return}if(Sr(u))return;const x=uo.find(C=>C.id===u);x&&$n(x)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",p=>{const u=p?.detail?.id;u&&lo(async()=>{const{completeNode:x}=await Promise.resolve().then(()=>go);return{completeNode:x}},void 0).then(({completeNode:x})=>{x(u),Jr()})})),Xn().catch(()=>{})}function Jr(){if(!document.querySelector("#app"))return;if(Yr()&&sa()){br();return}ua();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),br()};window.addEventListener("cbsgo:loginDone",n)}function to(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function fn(e){const n=to();n.textContent=String(e||""),n.style.display="block"}window.addEventListener("error",e=>{const n=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";fn(`❌ Error
${e?.message||e}
${n}`)});window.addEventListener("unhandledrejection",e=>{fn(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function mr(){try{if(!document.getElementById("app")){fn("❌ #app not found in index.html");return}Jr();const n=to();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(e){fn(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mr,{once:!0}):mr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
