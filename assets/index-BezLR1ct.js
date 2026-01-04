import{createClient as yr}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function r(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(c){if(c.ep)return;c.ep=!0;const d=r(c);fetch(c.href,d)}})();const gr="modulepreload",br=function(t){return"/cbs-go/"+t},fo={},mr=function(n,r,l){let c=Promise.resolve();if(r&&r.length>0){let m=function(x){return Promise.all(x.map(g=>Promise.resolve(g).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=m(r.map(x=>{if(x=br(x),x in fo)return;fo[x]=!0;const g=x.endsWith(".css"),y=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=g?"stylesheet":gr,g||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),g)return new Promise((I,P)=>{_.addEventListener("load",I),_.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${x}`)))})}))}function d(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&d(p.reason);return n().catch(d)})},Wn="cbsgoLevelUpOverlay",po="cbsgoLevelUpStyles",Nn="https://smitskecbs.github.io/cbs-go/";function hr(){if(document.getElementById(po))return;const t=document.createElement("style");t.id=po,t.textContent=`
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
  `,document.head.appendChild(t)}function Tn(){const t=document.getElementById(Wn);t&&t.remove()}function wr(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const d=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${d}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function uo(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function vr(t){hr(),Tn();const n=Number(t?.from||1),r=Number(t?.to||n+1),l=document.createElement("div");l.id=Wn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
          ${uo(String(r))}
        </div>

        <div style="font-size:14px; margin-top:8px;">
          You reached <b>Level ${uo(String(r))}</b> in CBS-GO.
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&wr(c);const d=()=>Tn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),m=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),g=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=d),p&&(p.onclick=d),m&&(m.onclick=()=>{const y=`I just reached Level ${r} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Nn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Nn),g&&(g.textContent="✅ Link copied. Share it with your friends.")}catch{g&&(g.textContent="Could not copy link. You can share it manually: "+Nn)}}),setTimeout(()=>{document.getElementById(Wn)&&Tn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{vr(t?.detail||{})}));const _r=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Mo="cbsgo_state_v6";function Sr(t,n){try{const r=JSON.parse(t);return r&&typeof r=="object"?r:n}catch{return n}}function kr(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ft(){const t=localStorage.getItem(Mo);return Sr(t,kr())}function Lo(t){t.updatedAt=Date.now(),localStorage.setItem(Mo,JSON.stringify(t))}function Xn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function xn(){return Number(Ft().xp||0)}function Wt(){const t=xn();let n=1,r=t;for(;;){const l=Xn(n);if(r<l||(r-=l,n+=1,n>999))break}return n}function Ao(){const t=xn();let n=1,r=t;for(;;){const l=Xn(n);if(r<l||(r-=l,n+=1,n>999))break}return r}function zo(){return Xn(Wt())}function Dt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ft();const r=Wt(),l=Ft();l.xp=Number(l.xp||0)+n,Lo(l);const c=Wt();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>r&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:r,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function Bo(t){const n=String(t||"");if(!n)return!1;const r=Ft();return!!(r.completed&&r.completed[n])}function No(t){const n=String(t||"");if(!n)return;const r=Ft();r.completed||(r.completed={}),r.completed[n]=Date.now(),Lo(r),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const Cr=Object.freeze(Object.defineProperty({__proto__:null,addXp:Dt,completeNode:No,getLevel:Wt,getXp:xn,getXpIntoLevel:Ao,getXpNeededThisLevel:zo,isNodeCompleted:Bo},Symbol.toStringTag,{value:"Module"})),To="cbsgoPuzzleModal";function Er(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function In(){const t=document.getElementById(To);t&&t.remove()}function Un(t){In();const n=6,r=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],d=180,u=18,p=l.length,m=.01;let x=[],g=null,y=0,_=u,I=!1,P=!1,A=null;const T=t?.name||"CBS GO Puzzle",V=document.createElement("div");V.id=To,V.style.position="fixed",V.style.inset="0",V.style.zIndex="999999",V.style.display="flex",V.style.alignItems="center",V.style.justifyContent="center",V.style.padding="16px",V.style.background="rgba(0,0,0,.70)",V.style.backdropFilter="blur(12px)",V.style.fontFamily="system-ui, sans-serif",V.style.color="#fff",V.innerHTML=`
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
          ${Er(T)}
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
          grid-template-columns:repeat(${r}, 1fr);
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
  `,document.body.appendChild(V);const U=document.getElementById("cbsgoBoard"),pe=document.getElementById("cbsgoScore"),ce=document.getElementById("cbsgoMoves"),q=document.getElementById("cbsgoStatus"),ze=document.getElementById("cbsgoPuzzleClose"),Be=document.getElementById("cbsgoPuzzleOk"),Ne=document.getElementById("cbsgoConfettiLayer");function Ee(F){q&&(q.textContent=F||"")}function Se(){if(!Ne)return;Ne.style.display="block",Ne.innerHTML="";const F=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],Y=40;for(let K=0;K<Y;K++){const R=document.createElement("div"),ne=6+Math.floor(Math.random()*6),he=Math.random()*100,Me=Math.random()*.6,Le=1+Math.random()*.6,ht=Math.random()*360;R.style.position="absolute",R.style.top="-10%",R.style.left=`${he}%`,R.style.width=`${ne}px`,R.style.height=`${ne*2}px`,R.style.background=F[K%F.length],R.style.opacity="0.9",R.style.borderRadius="2px",R.style.transform=`rotate(${ht}deg)`,R.style.animation=`cbsgoConfettiFall ${Le}s ease-out ${Me}s forwards`,Ne.appendChild(R)}}function Ge(){return Math.floor(Math.random()*l.length)}function et(){x=[];for(let F=0;F<n;F++){const Y=[];for(let K=0;K<r;K++)Math.random()<m?Y.push(p):Y.push(Ge());x.push(Y)}}function st(F){return F===p}function Oe(){if(U){U.innerHTML="";for(let F=0;F<n;F++)for(let Y=0;Y<r;Y++){const K=x[F][Y],R=document.createElement("div");R.dataset.row=String(F),R.dataset.col=String(Y),R.style.borderRadius="12px",R.style.display="flex",R.style.alignItems="center",R.style.justifyContent="center",R.style.cursor=P?"default":"pointer",R.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",R.style.fontSize="20px",st(K)?(R.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",R.textContent="💥"):(R.style.background=l[K]||"#444",R.textContent=c[K]||"⬛"),g&&g.row===F&&g.col===Y&&(R.style.outline="2px solid #fff",R.style.outlineOffset="2px"),R.addEventListener("click",()=>{je(F,Y)}),R.addEventListener("touchstart",ne=>{if(P)return;const he=ne.touches[0];A={row:F,col:Y,x:he.clientX,y:he.clientY}}),R.addEventListener("touchend",ne=>{if(!A||P)return;const he=ne.changedTouches[0],Me=he.clientX-A.x,Le=he.clientY-A.y;if(Math.sqrt(Me*Me+Le*Le)<18){je(F,Y),A=null;return}let Ye=A.row,nt=A.col;Math.abs(Me)>Math.abs(Le)?Me>0?nt+=1:nt-=1:Le>0?Ye+=1:Ye-=1,Ye>=0&&Ye<n&&nt>=0&&nt<r&&Re(A.row,A.col,Ye,nt),A=null,ne.preventDefault()}),U.appendChild(R)}}}function gt(F,Y){if(!F||!Y)return!1;const K=Math.abs(F.row-Y.row),R=Math.abs(F.col-Y.col);return K+R===1}function Ue(F,Y){const K=x[F.row][F.col];x[F.row][F.col]=x[Y.row][Y.col],x[Y.row][Y.col]=K}function bt(){const F=new Set;for(let Y=0;Y<n;Y++){let K=x[Y][0],R=0;for(let ne=1;ne<=r;ne++){const he=ne<r?x[Y][ne]:null;if(he===K)continue;const Me=ne-R;if(K!=null&&Me>=3)for(let Le=R;Le<ne;Le++)F.add(`${Y},${Le}`);K=he,R=ne}}for(let Y=0;Y<r;Y++){let K=x[0][Y],R=0;for(let ne=1;ne<=n;ne++){const he=ne<n?x[ne][Y]:null;if(he===K)continue;const Me=ne-R;if(K!=null&&Me>=3)for(let Le=R;Le<ne;Le++)F.add(`${Le},${Y}`);K=he,R=ne}}return F}function He(F){if(!F||!F.size)return 0;const Y=F.size;y+=Y*4,pe&&(pe.textContent=String(y)),!P&&y>=d&&mt(!0);for(const K of F){const[R,ne]=K.split(","),he=Number(R),Me=Number(ne);x[he][Me]=null}for(let K=0;K<r;K++){let R=n-1;for(let ne=n-1;ne>=0;ne--)x[ne][K]!=null&&(x[R][K]=x[ne][K],R--);for(let ne=R;ne>=0;ne--)Math.random()<m?x[ne][K]=p:x[ne][K]=Ge()}return Y}function tt(F,Y){const K=new Set;for(let R=0;R<r;R++)K.add(`${F},${R}`);for(let R=0;R<n;R++)K.add(`${R},${Y}`);He(K),Oe(),P||setTimeout(()=>zt(!1),120)}function zt(F=!1){if(P)return;I=!0;const Y=()=>{if(P){I=!0;return}const K=bt();if(!K.size){I=!1,Oe(),F&&!P&&(_<=0?Xe():Ee("Nice! Keep matching."));return}He(K),Oe(),setTimeout(Y,120)};Y()}function mt(F){if(!P)if(P=!0,I=!0,F){Ee("Great job! Puzzle completed 🎉");try{t?.id&&No(t.id),Dt(10)}catch{}Se(),setTimeout(()=>{In()},1600)}else Ee("Out of moves. Try again next time 🙂")}function Xe(){y>=d?mt(!0):_<=0&&mt(!1)}function Re(F,Y,K,R){if(I||P)return;if(_<=0){Xe();return}const ne={row:F,col:Y},he={row:K,col:R};if(!gt(ne,he))return;const Me=x[F][Y],Le=x[K][R],ht=st(Me)||st(Le);if(Ue(ne,he),g=null,_--,ce&&(ce.textContent=String(_)),ht){Oe();const Ye=st(x[F][Y])?{row:F,col:Y}:{row:K,col:R};tt(Ye.row,Ye.col),Xe();return}if(!bt().size){Ue(ne,he),Oe(),Ee("No match… try another swap."),Xe();return}Ee(""),Oe(),zt(!0)}function je(F,Y){if(I||P)return;if(_<=0){Xe();return}const K={row:F,col:Y};if(!g){g=K,Oe();return}if(g.row===F&&g.col===Y){g=null,Oe();return}if(!gt(g,K)){g=K,Oe();return}Re(g.row,g.col,K.row,K.col)}function fe(){In()}ze&&(ze.onclick=fe),Be&&(Be.onclick=()=>{fe()}),et(),Oe(),Ee("Tap or swipe two neighboring tiles to swap them.")}const Io="cbsgo_inventory_v2";function Mr(t,n){try{const r=JSON.parse(t);return r&&typeof r=="object"?r:n}catch{return n}}function Lr(){return{tickets:0,cbs:0,cards:{}}}function pt(){const t=localStorage.getItem(Io),n=Mr(t,Lr());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Vn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Io,JSON.stringify(n))}function Jt(){return Number(pt().tickets||0)}function en(){return Number(pt().cbs||0)}function At(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return pt();const r=pt();let c=Number(r.tickets||0)+n;return c<0&&(c=0),r.tickets=c,Vn(r),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...r}})),r}function yn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return pt();const r=pt();let c=Number(r.cbs||0)+n;return c<0&&(c=0),r.cbs=c,Vn(r),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...r}})),r}const $o="cbsgo_steps_v6",Ar="cbsgo_steps_v5",zr="cbsgo_gps_autostart_v2",Po="cbsgo_daily_puzzle_v1",Br=.75,Mt=5e3,sn=7,Gn=100,Nr=1e3,Tr=.5,Ir=2e3,$r=4.5,$n=1500,Pn=200,Pr=.25,Or=.05,Rr=.3;let tn=null,nn=!1,_t={msg:"init"};function Dn(t,n){try{const r=JSON.parse(t);return r&&typeof r=="object"?r:n}catch{return n}}const Oo="cbsgo_cards_v1",jr=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Fr(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Wr(t){return jr.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Ur(){try{const t=localStorage.getItem(Oo),n=Dn(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const r={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const d=Number(c.count);Number.isFinite(d)&&d>0&&(r[l]=d)}if(Object.keys(r).length>0)return{counts:r}}return{counts:{}}}catch{return{counts:{}}}}function Gr(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},r={};for(const[c,d]of Object.entries(n)){const u=Number(d||0);Number.isFinite(u)&&u>0&&(r[c]=u)}const l={counts:r};localStorage.setItem(Oo,JSON.stringify(l))}catch{}}function Dr(t,n=1){const r=Fr(t);if(!r)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const d={...Ur().counts||{}},p=Number(d[r]||0)+l;d[r]=p,Gr({counts:d});const m=Wr(r);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:d}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:r,count:p,card:m}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:m}}))}catch{}return{cardId:r,count:p,card:m}}function at(){const t=new Date,n=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${r}-${l}`}function qr(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[r,l,c]=n,d=new Date(r,l-1,c);return Number.isNaN(d.getTime())?null:d}function Yr(t){const n=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${r}-${l}`}function Ro(t,n){const r=qr(t);if(!r)return[];const l=[];for(let c=n-1;c>=0;c--){const d=new Date(r.getTime());d.setDate(d.getDate()-c),l.push(Yr(d))}return l}function ln(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:at(),daySteps:0,dayMeters:0,dailyGoalSteps:Mt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Kr(t){const n=at();return!t||typeof t!="object"?ln():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Mt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Mt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function gn(t){t.updatedAt=Date.now(),localStorage.setItem($o,JSON.stringify(t))}function Hr(t,n){if(!n)return;const r=Ro(n,sn);!r.length||!r.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(yn(Gn),qt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:sn,rewardCbs:Gn,lastDayKey:n}})))}function xo(t){t=Kr(t||ln());const n=at();if(t.dayKey!==n){const r=t.dayKey;r&&(t.streak||(t.streak={}),t.streak[r]=!!t.dailyGoalReached,Hr(t,r)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,gn(t)}return t}function ut(){let t=localStorage.getItem($o);if(!t){const r=localStorage.getItem(Ar);if(r){const l=Dn(r,ln()),c=xo(l);return gn(c),c}}const n=Dn(t,ln());return xo(n)}function on(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Xr()}}))}function Zn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function qt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Qn(t,n,r,l){const c=Number(t||0),d=Number(n||0),u=0;if(!(!c&&!d&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:d,cbs:u,reason:l||"distance"}}))}catch{}}function Xr(){const t=ut();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Vr(){const t=ut(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Zr(){return Vr()/1e3}function Qr(){const t=ut(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),r=Number(t.dailyGoalSteps||Mt),l=!!t.dailyGoalReached,c=t.dayKey||at(),d=t.streak||{},p=Ro(c,sn).map(m=>{let x=!1;return m===c?x=l:x=!!d[m],{dateKey:m,reached:x}});return{stepsToday:n,goalSteps:r,goalReached:l,streak:p,todayKey:c,streakLength:sn,rewardPerStreak:Gn}}function yo(){return!!nn}function Jr(){try{return localStorage.getItem(Po)===at()}catch{return!1}}function ei(){try{localStorage.setItem(Po,at())}catch{}}function ti(t,n){return Jr()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:at()}})),ei(),!0)}function go(){const t=ut(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function ni(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const r=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(r)){t.boostLastStep=l;return}const c=l-r;if(!Number.isFinite(c)||c<$n)return;const d=Math.floor(c/$n);d<=0||(At(d),qt(),Qn(0,d,0,"boost"),t.boostLastStep=r+d*$n)}function oi(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Pn){t.chestMeters=n;return}let r=0;for(;n>=Pn&&r<5;)if(n-=Pn,r+=1,Math.random()<Pr){const l=Math.random()<Or,c=l?10:3,d=l?2:1;Dt(c),Zn(),At(d),qt();const u=l&&Math.random()<Rr;Qn(c,d,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:d,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function ri(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),m=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(m))}function ii(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let r=0,l=0;const c=Math.floor(n/1e3),d=Number(t.xpKmAwarded||0);if(c>d){const x=c-d;x>0&&(Dt(x),Zn(),t.xpKmAwarded=c,r+=x)}const p=Math.floor(n/2500),m=Number(t.ticketChunksAwarded||0);if(p>m){const x=p-m;x>0&&(At(x),qt(),t.ticketChunksAwarded=p,l+=x)}(r>0||l>0)&&Qn(r,l,0,"distance")}function ai(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return ut();const r=ut();r.totalMeters=Number(r.totalMeters||0)+n,r.meters=Number(r.meters||0)+n,r.dayMeters=Number(r.dayMeters||0)+n,r.chestMeters=Number(r.chestMeters||0)+n;const l=Number(r.steps||0),c=Math.floor((r.meters||0)/Br);if(c>l){const d=c-l;r.steps=c,r.daySteps=Number(r.daySteps||0)+d}return!r.dailyGoalReached&&r.daySteps>=(r.dailyGoalSteps||Mt)&&(r.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:r.dayKey||at(),steps:r.daySteps,goal:r.dailyGoalSteps||Mt}}))),ii(r),ni(r),oi(r),gn(r),on(),r}function si(){tn!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(tn),tn=null}async function bo(t={}){const n=!!t.silent;if(!navigator.geolocation)return _t={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(zr,"1")}catch{}si(),nn=!0,_t={msg:"requesting",t:Date.now()};try{return tn=navigator.geolocation.watchPosition(r=>{const l=r.coords.latitude,c=r.coords.longitude,d=r.coords.accuracy||999,u=Date.now(),p=ut(),m=p.lastPos;p.lastPos={lat:l,lng:c,t:u},gn(p);const x=Number.isFinite(r.coords.heading)?r.coords.heading:null,g=Number.isFinite(r.coords.speed)?r.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:d,heading:x,speed:g,t:u}})),d>Nr){_t={lat:l,lng:c,acc:d,t:u,reason:"accuracy",boostMs:go()},on();return}ti(l,c);let y=0,_=0,I=0,P=0,A="no-last";m&&typeof m.lat=="number"&&typeof m.lng=="number"&&typeof m.t=="number"&&(y=ri({lat:m.lat,lng:m.lng},{lat:l,lng:c}),_=Math.max(1,(u-m.t)/1e3),I=y/_,y<Tr?A="jitter":y>Ir?A="teleport":I>$r?A="too-fast":(ai(y),P=y,A="ok")),_t={lat:l,lng:c,acc:d,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite(I)?Number(I.toFixed(2)):0,added:Math.round(P),reason:A,boostMs:go()},on()},r=>{nn=!1,_t={err:r?.message||"GPS blocked",t:Date.now()},on()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(r){return nn=!1,_t={err:String(r?.message||r),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function li(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>yo()||await bo({silent:!0}))();const n=async()=>{yo()||await bo({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},r=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);r>0&&(Dt(r),Zn()),(l>0||c>0)&&(l>0&&At(l),c>0&&yn(c),qt());const d=n.cardId||n.card_id;if(d)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Dr(d,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function jo(){const t=xn(),n=Wt(),r=Ao(),l=zo(),c=Zr(),d=l>0?Math.min(100,Math.round(r/l*100)):0;return`
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
        <div>${r}/${l} XP · total ${t}</div>
        <div>${c.toFixed(2)} km walked</div>
      </div>
    </div>
  `}function Fo(){const{stepsToday:t,goalSteps:n,goalReached:r,streak:l,streakLength:c,rewardPerStreak:d}=Qr(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
        <div style="font-size:10px;opacity:.9;">${`${t} / ${n} steps${r?" ✅":""}`}</div>
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
  `}function Wo(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ci(){try{const t=[];for(let n=0;n<localStorage.length;n++){const r=localStorage.key(n);r&&r.startsWith("cbsgo_")&&t.push(r)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const r=sessionStorage.key(n);r&&r.startsWith("cbsgo_")&&t.push(r)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Uo="cbsgo_player_name_v2",Jn="cbsgo_player_avatar_v2";function yt(){try{return localStorage.getItem(Uo)||"Sovereign"}catch{return"Sovereign"}}function Go(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Uo,n)}catch{}return n}function bn(){try{return localStorage.getItem(Jn)||""}catch{return""}}function di(t){const n=String(t||"");try{localStorage.setItem(Jn,n)}catch{}return n}function fi(){try{localStorage.removeItem(Jn)}catch{}}let X=null,ot=null,rt=null,$t=null,Ot=null,qe=null,Pe=null,St=0,dt=!1,Je=!0,De=null;const Ze=new Map;let Qe=!0,Rt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const pi="48a387bba00043ac4ba5823371abc9d2",Ut=80,ui=6,xi=80,yi=220,gi=6e4,bi=5*6e4,mi=300,hi=.35,On=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],wi=350,vi=.35,_i=120;let cn=0,kt=0,rn=null,qn=!1,Et=[];function ft(t){return document.getElementById(t)}function Ct(t){const n=ft("cbsgoMapHost");if(!n)return;let r=ft("cbsgoMapMsg");r||(r=document.createElement("div"),r.id="cbsgoMapMsg",r.style.position="absolute",r.style.left="12px",r.style.right="12px",r.style.bottom="16px",r.style.zIndex="9999",r.style.padding="10px 12px",r.style.borderRadius="14px",r.style.border="1px solid rgba(255,255,255,.14)",r.style.background="rgba(0,0,0,.40)",r.style.color="#fff",r.style.fontFamily="system-ui, sans-serif",r.style.fontSize="13px",r.style.backdropFilter="blur(10px)",n.appendChild(r)),r.textContent=t||""}function Si(){const t=String(yt()||"").trim();return t?t[0].toUpperCase():"🙂"}function Yn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Lt(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),m=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(m))}function Do(t,n,r){const l=n+Math.random()*(r-n),c=Math.random()*2*Math.PI,d=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+d,lng:t.lng+u}}function ki(t,n){const r=x=>x*Math.PI/180,l=r(t.lat),c=r(n.lat),d=r(n.lng-t.lng),u=Math.sin(d)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(d);let m=Math.atan2(u,p);return m=m*180/Math.PI,m=(m+360)%360,m}function Ci(t,n,r){const c=n/6371e3,d=r*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,m=Math.sin(u),x=Math.cos(u),g=Math.sin(c),y=Math.cos(c),_=Math.asin(m*y+x*g*Math.cos(d)),I=p+Math.atan2(Math.sin(d)*g*x,y-m*Math.sin(_));return[_*180/Math.PI,I*180/Math.PI]}function Ei(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function qo(){const{temp:t,iconEmoji:n}=Rt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Yo(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;Ei();const{condition:n,isNight:r}=Rt;t.style.background=r?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const d=[];for(let u=0;u<96;u++){const p=Math.random()*100,m=Math.random()*16-8,x=Math.random()*2.5,g=2+Math.random()*1.5;d.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+m}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${g}s;
          "
        ></div>
      `)}l=d.join("")}else if(n==="snow"){const d=[];for(let u=0;u<80;u++){const p=Math.random()*100,m=Math.random()*20-10,x=Math.random()*4,g=6+Math.random()*4;d.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+m}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${g}s;
          "
        ></div>
      `)}l=d.join("")}else l="";t.innerHTML=l}async function Mi(t,n){const r=Date.now();if(!(Rt.lastUpdated&&r-Rt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${pi}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const d=await c.json(),u=d?.main?.temp,p=d?.weather?.[0]?.icon||"01d",m=String(d?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),g="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(g="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(g="🌧️",y="rain"):p.startsWith("11")?(g="⛈️",y="storm"):p.startsWith("13")?(g="❄️",y="snow"):p.startsWith("50")&&(g="🌫️",y="mist"),m.includes("rain")&&(y="rain"),m.includes("snow")&&(y="snow"),m.includes("thunder")&&(y="storm");try{const I=Number(d?.dt||0),P=Number(d?.timezone||0);if(I&&Number.isFinite(P)){const T=((I+P)/3600%24+24)%24;x=T<7||T>=19}}catch{}y==="clear"?g=x?"🌙":"☀️":y==="clouds"?g="☁️":y==="rain"?g="🌧️":y==="storm"?g="⛈️":y==="snow"?g="❄️":y==="mist"&&(g="🌫️"),Rt={temp:u,iconEmoji:g,condition:y,isNight:x,lastUpdated:r};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=qo()),Yo()}catch(l){console.warn("Weather fetch failed",l)}}function Li(t){const n=bn();if(n){const c=`
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
    ">${Yn(Si())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function mo(t,n){const r=`
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
  `;return t.divIcon({html:r,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Ai(t,n,r,l){if(!l&&r){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Yn(r)}');
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
    ">${Yn(c)}</div>
  `;return t.divIcon({html:d,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function zi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Ni(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Ti(){if(!On.length)return null;const t=Math.floor(Math.random()*On.length);return On[t]}function Ii(t){const n=t||"small";let r,l,c;n==="jackpot"?(r=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(r=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(r=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(r=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let d=null,u=0;if(Math.random()<hi){const p=Ti();p&&(d=p,u=1)}return{xp:r,tickets:l,cbs:c,cardId:d,cardCount:u}}function $i(t){if(!X||!qe||!t)return;const n=Date.now();if(n-cn<gi||qe.getLayers().length>=ui)return;const l=window.L;if(!l)return;const c=Ni(),d=Ii(c),u=Do(t,xi,yi),p=zi(l),m=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),g={marker:m,createdAt:n,lat:u.lat,lng:u.lng,reward:d};Et.push(g),m.on("click",()=>{if(!Pe){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:Pe[0],lng:Pe[1]},_={lat:u.lat,lng:u.lng},I=Lt(y,_);if(I>Ut){alert(`Too far to open this gift.

Distance: ${Math.round(I)}m
Needed: ≤ ${Ut}m`);return}qe.removeLayer(m),Et=Et.filter(ze=>ze.marker!==m);const{xp:P,tickets:A,cbs:T,cardId:V,cardCount:U}=d,pe=[];P&&pe.push(`+${P} XP`),A&&pe.push(`+${A} ticket${A===1?"":"s"}`),T&&pe.push(`+${T} CBS`),V&&U>0&&pe.push(`+${U} card${U===1?"":"s"}`);const ce=pe.length?pe.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${ce}`);const q={kind:"mystery",xp:P||0,tickets:A||0,cbs:T||0,cardId:V||null,cardCount:U||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:q}))}catch{}}),m.addTo(qe),cn=n}function Pi(t){if(!X||!qe||!t)return;const n=Date.now();let r=0;Et=Et.filter(l=>{if(!l||!l.marker||!qe.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>bi)return qe.removeLayer(l.marker),r+=1,!1;const d=Lt({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(d)&&d>mi?(qe.removeLayer(l.marker),r+=1,!1):!0}),r>0&&qe.getLayers().length===0&&(cn=0)}function Oi(t){if(!X||!Ot||!t||rn)return;const n=window.L;if(!n)return;if(qn){if(kt<wi||Math.random()>vi)return;kt=0}else{if(kt<_i)return;kt=0,qn=!0}const r=Do(t,60,140),l=Bi(n),c=n.marker([r.lat,r.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!Pe){alert("GPS not ready yet. Wait until your player marker appears.");return}const d={lat:Pe[0],lng:Pe[1]},u={lat:r.lat,lng:r.lng},p=Lt(d,u);if(p>Ut){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Ut}m`);return}Ot.removeLayer(c),rn=null,Un({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(Ot),rn=c}function Ri(t){const n=window.L;if(!n||!X||!t)return;const r=Ut;$t?($t.setLatLng(t),$t.setRadius(r)):$t=n.circle(t,{radius:r,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(X)}function ji(t){const n=window.L;if(!n||!X)return;const r=Li(n);if(ot?(ot.setIcon(r),ot.setLatLng(t)):(ot=n.marker(t,{icon:r,pane:"cbsgo-player-pane"}).addTo(X),X.setView(t,19)),rt?(rt.setIcon(mo(n,St)),rt.setLatLng(t)):rt=n.marker(t,{icon:mo(n,St),interactive:!1,pane:"cbsgo-player-pane"}).addTo(X),ot&&ot.bringToFront&&ot.bringToFront(),rt&&rt.bringToFront&&rt.bringToFront(),Ri(t),Je&&!dt&&X)try{const l=X.getZoom()||19;let c=t;Number.isFinite(St)&&(c=Ci(t,40,St));const d=X.getCenter(),u=Lt({lat:d.lat,lng:d.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&X.setView(c,l)}catch{}}function Ko(){const t=window.L;return!t||!X?null:(De?(Qe&&!X.hasLayer(De)&&De.addTo(X),!Qe&&X.hasLayer(De)&&X.removeLayer(De)):(De=t.layerGroup(),Qe&&De.addTo(X)),De)}function Fi(t){if(!Array.isArray(t)||!X)return[];const n=X.getZoom()||3;let r;n>=15?r=100:n>=10?r=50:n>=6?r=25:r=10;const l=new Map;t.forEach(d=>{if(!d||d.isMe||typeof d.lat!="number"||typeof d.lng!="number")return;const u=Math.round(d.lat*r)/r,p=Math.round(d.lng*r)/r,m=`${u}_${p}`;l.has(m)||l.set(m,[]),l.get(m).push(d)});const c=[];for(const[d,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||d,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,m=0;u.forEach(y=>{p+=y.lat,m+=y.lng});const x=p/u.length,g=m/u.length;c.push({id:`cluster_${d}`,lat:x,lng:g,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Wi(t){const n=window.L;if(!n||!X)return;const r=Ko();if(!r)return;if(!Qe){for(const[d,u]of Ze.entries())r.removeLayer(u),Ze.delete(d);return}const l=Fi(t),c=new Set;l.forEach(d=>{if(!d||typeof d.lat!="number"||typeof d.lng!="number")return;const u=d.id||`${d.lat},${d.lng}`;c.add(u);const p=[d.lat,d.lng];let m=Ze.get(u);if(m)m.setLatLng(p);else{const x=d.isCluster&&d.count>1?String(d.count):d.nickname||"Anon",g=Ai(n,x,d.avatar,d.isCluster);m=n.marker(p,{icon:g,pane:"cbsgo-others-pane"});const y=d.isCluster&&d.count>1?`${d.count} CBS-GO explorers nearby`:`${d.nickname||"CBS-GO explorer"}`;m.bindPopup(y),m.addTo(r),Ze.set(u,m)}});for(const[d,u]of Ze.entries())c.has(d)||(r.removeLayer(u),Ze.delete(d))}function Ui(){return`
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
        <span id="cbsgoWeatherLabel">${qo()}</span>
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
  `}function Gi(){try{X&&X.remove()}catch{}X=null,ot=null,rt=null,$t=null,Ot=null,qe=null,Pe=null,dt=!1,Je=!0,cn=0,kt=0,rn=null,qn=!1,De=null,Ze.clear(),Et=[]}function Di(){const t=window.L,n=ft("cbsgoMap");if(!t||!n)return!1;Gi();const r=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));X=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:r,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=X.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=X.createPane("cbsgo-others-pane");c.style.zIndex="640";const d=X.createPane("cbsgo-loot-pane");d.style.zIndex="630";const u=X.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:r}).addTo(X),X.setMaxBounds(r),X.setView([51.687,4.87],16),Ot=t.layerGroup().addTo(X),qe=t.layerGroup().addTo(X),X.on("dragstart",()=>{Je=!1}),X.on("zoomstart",()=>{Je=!1}),!0}function qi(){!navigator.geolocation||!X||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:r,accuracy:l,heading:c}=t.coords,d={lat:n,lng:r},u=Pe?{lat:Pe[0],lng:Pe[1]}:null;if(Pe=[n,r],Number.isFinite(c))St=c;else if(u){const p=Lt(u,d);Number.isFinite(p)&&p>2&&(St=ki(u,d))}if(ji([n,r]),u){const p=Lt(u,d);if(Number.isFinite(p)&&p>1&&(kt+=p),Number.isFinite(p)&&p>20&&!Je&&!dt&&X){Je=!0;const m=X.getZoom()||19;X.setView([n,r],m)}}Oi(d),$i(d),Pi(d),Mi(n,r),Ct(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{Ct(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Yi(){let t=0;const n=120,r=()=>{if(t++,!ft("cbsgoMap"))return t<n?setTimeout(r,100):void 0;if(!window.L){if(Ct("Loading map engine…"),t<n)return setTimeout(r,100);Ct("Map engine failed (Leaflet not found). Refresh.");return}if(!Di()){Ct("Could not init map. Refresh.");return}const c=ft("cbsgoCenterBtn");c&&(c.onclick=()=>{X&&Pe&&(Je=!0,dt=!1,X.setView(Pe,19))});const d=ft("cbsgoCompassBtn");d&&(d.onclick=()=>{X&&(dt=!dt,dt?(Je=!1,X.setView([51.687,4.87],3)):Pe&&(Je=!0,X.setView(Pe,16)))});const u=ft("cbsgoOnlineToggleBtn");if(u){const p=()=>{Qe?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Qe=!Qe;const m=Ko();if(m&&X&&(Qe?X.hasLayer(m)||m.addTo(X):X.hasLayer(m)&&X.removeLayer(m)),p(),!Qe&&De){for(const[x,g]of Ze.entries())De.removeLayer(g);Ze.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const m=p?.detail?.players||[];Wi(m)})),Yo(),Ct("Loading GPS…"),qi()};r()}const Ki="cbsgo_cards_v1";function Hi(t,n){try{const r=JSON.parse(t);return r&&typeof r=="object"?r:n}catch{return n}}function eo(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function to(){const t=localStorage.getItem(Ki),n=Hi(t,{});let r={};return n&&typeof n.counts=="object"&&n.counts!==null?r={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(r[l.id]=c)}),r}function it(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ho(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Xi(){const t=eo(),n=to();let r=0;return t.forEach(l=>{n[l.id]>0&&(r+=1)}),{collected:r,total:t.length}}function Vi(){const t=eo(),n=to();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),d=Number.isFinite(c)&&c>0,u=Ho(l.rarity),p=d?u:"rgba(31,41,55,.9)",m=d?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=d?l.emoji||"🃏":"❓",g=d?it(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=it(l.set||"Set"),_=d?`<div style="
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
          data-card-id="${it(l.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${p};
            background:${m};
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
            ${it(x)}
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
            ${g}
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
    `}function Zi(){const t=Xi(),{collected:n,total:r}=t,l=`${n}/${r} cards collected`,c=r>0?Math.round(n/r*100):0;return`
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
        ${Vi()}
      </div>
    </div>
  `}function Qi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const r=document.createElement("div");r.style.width="min(420px, 94vw)",r.style.maxHeight="80vh",r.style.borderRadius="22px",r.style.border="1px solid rgba(148,163,184,.9)",r.style.background="rgba(10,12,18,0.97)",r.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",r.style.padding="14px 14px 10px 14px",r.style.display="flex",r.style.flexDirection="column",r.style.color="#fff",r.style.fontFamily="system-ui,sans-serif",r.style.opacity="0",r.style.transform="translateY(14px) scale(0.96)",r.style.transition="opacity .22s ease-out, transform .22s ease-out",r.innerHTML=`
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

    ${Zi()}
  `,n.appendChild(r),t.appendChild(n),requestAnimationFrame(()=>{r.style.opacity="1",r.style.transform="translateY(0) scale(1)"});const l=()=>{r.style.opacity="0",r.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const d=eo(),u=new Map(d.map(x=>[x.id,x]));function p(x){const g=u.get(x);if(!g)return;const y=to(),_=Number(y[x]||0),I=Number.isFinite(_)&&_>0,P=I?g.emoji||"🃏":"❓",A=I?g.name||"Card":"Unknown card",T=g.set||"Set",V=g.rarity||"common",U=Ho(V),pe={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[V]||"Common",ce=document.createElement("div");ce.style.position="fixed",ce.style.inset="0",ce.style.display="flex",ce.style.alignItems="center",ce.style.justifyContent="center",ce.style.background="rgba(0,0,0,0.65)",ce.style.pointerEvents="auto",ce.style.zIndex="8600";const q=document.createElement("div");q.style.width="min(260px, 82vw)",q.style.borderRadius="20px",q.style.border=`1px solid ${U}`,q.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",q.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",q.style.padding="16px 14px 14px 14px",q.style.textAlign="center",q.style.color="#fff",q.style.fontFamily="system-ui,sans-serif",q.style.opacity="0",q.style.transform="translateY(14px) scale(0.96)",q.style.transition="opacity .2s ease-out, transform .2s ease-out";const ze=I?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',Be=I?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;q.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${it(T)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${U};
          font-size:10px;
        ">
          ${it(pe)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${U};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${it(P)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${it(A)}
      </div>

      ${ze}
      ${Be}

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
    `,ce.appendChild(q),document.body.appendChild(ce),requestAnimationFrame(()=>{q.style.opacity="1",q.style.transform="translateY(0) scale(1)"});const Ne=()=>{q.style.opacity="0",q.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(ce)},200)},Ee=q.querySelector("#cbsgoCardPreviewCloseBtn");Ee&&(Ee.onclick=Ne),ce.addEventListener("click",Se=>{Se.target===ce&&Ne()})}r.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const g=x.getAttribute("data-card-id");g&&p(g)})})}function Ji(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function ea(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var r=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};r.prototype=n.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(r,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),r}function ta(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Rn={exports:{}};const na={},oa=Object.freeze(Object.defineProperty({__proto__:null,default:na},Symbol.toStringTag,{value:"Module"})),ra=ea(oa);var ho;function ia(){return ho||(ho=1,(function(t){(function(n){var r=function(o){var a,i=new Float64Array(16);if(o)for(a=0;a<o.length;a++)i[a]=o[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),d=new Uint8Array(32);d[0]=9;var u=r(),p=r([1]),m=r([56129,1]),x=r([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),g=r([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=r([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=r([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),I=r([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function P(o,a,i,e){o[a]=i>>24&255,o[a+1]=i>>16&255,o[a+2]=i>>8&255,o[a+3]=i&255,o[a+4]=e>>24&255,o[a+5]=e>>16&255,o[a+6]=e>>8&255,o[a+7]=e&255}function A(o,a,i,e,s){var b,h=0;for(b=0;b<s;b++)h|=o[a+b]^i[e+b];return(1&h-1>>>8)-1}function T(o,a,i,e){return A(o,a,i,e,16)}function V(o,a,i,e){return A(o,a,i,e,32)}function U(o,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,Z=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Q=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,oe=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,J=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,te=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,ee=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,D=b,N=h,j=k,W=L,z=G,w=B,v=ye,E=$,S=Z,C=Q,M=re,H=oe,ie=J,se=te,ae=ee,f,de=0;de<20;de+=2)f=O+H|0,W^=f<<7|f>>>25,f=W+O|0,E^=f<<9|f>>>23,f=E+W|0,H^=f<<13|f>>>19,f=H+E|0,O^=f<<18|f>>>14,f=z+D|0,S^=f<<7|f>>>25,f=S+z|0,ie^=f<<9|f>>>23,f=ie+S|0,D^=f<<13|f>>>19,f=D+ie|0,z^=f<<18|f>>>14,f=C+w|0,se^=f<<7|f>>>25,f=se+C|0,N^=f<<9|f>>>23,f=N+se|0,w^=f<<13|f>>>19,f=w+N|0,C^=f<<18|f>>>14,f=ae+M|0,j^=f<<7|f>>>25,f=j+ae|0,v^=f<<9|f>>>23,f=v+j|0,M^=f<<13|f>>>19,f=M+v|0,ae^=f<<18|f>>>14,f=O+j|0,D^=f<<7|f>>>25,f=D+O|0,N^=f<<9|f>>>23,f=N+D|0,j^=f<<13|f>>>19,f=j+N|0,O^=f<<18|f>>>14,f=z+W|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,W^=f<<13|f>>>19,f=W+v|0,z^=f<<18|f>>>14,f=C+S|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=ae+se|0,H^=f<<7|f>>>25,f=H+ae|0,ie^=f<<9|f>>>23,f=ie+H|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;O=O+s|0,D=D+b|0,N=N+h|0,j=j+k|0,W=W+L|0,z=z+G|0,w=w+B|0,v=v+ye|0,E=E+$|0,S=S+Z|0,C=C+Q|0,M=M+re|0,H=H+oe|0,ie=ie+J|0,se=se+te|0,ae=ae+ee|0,o[0]=O>>>0&255,o[1]=O>>>8&255,o[2]=O>>>16&255,o[3]=O>>>24&255,o[4]=D>>>0&255,o[5]=D>>>8&255,o[6]=D>>>16&255,o[7]=D>>>24&255,o[8]=N>>>0&255,o[9]=N>>>8&255,o[10]=N>>>16&255,o[11]=N>>>24&255,o[12]=j>>>0&255,o[13]=j>>>8&255,o[14]=j>>>16&255,o[15]=j>>>24&255,o[16]=W>>>0&255,o[17]=W>>>8&255,o[18]=W>>>16&255,o[19]=W>>>24&255,o[20]=z>>>0&255,o[21]=z>>>8&255,o[22]=z>>>16&255,o[23]=z>>>24&255,o[24]=w>>>0&255,o[25]=w>>>8&255,o[26]=w>>>16&255,o[27]=w>>>24&255,o[28]=v>>>0&255,o[29]=v>>>8&255,o[30]=v>>>16&255,o[31]=v>>>24&255,o[32]=E>>>0&255,o[33]=E>>>8&255,o[34]=E>>>16&255,o[35]=E>>>24&255,o[36]=S>>>0&255,o[37]=S>>>8&255,o[38]=S>>>16&255,o[39]=S>>>24&255,o[40]=C>>>0&255,o[41]=C>>>8&255,o[42]=C>>>16&255,o[43]=C>>>24&255,o[44]=M>>>0&255,o[45]=M>>>8&255,o[46]=M>>>16&255,o[47]=M>>>24&255,o[48]=H>>>0&255,o[49]=H>>>8&255,o[50]=H>>>16&255,o[51]=H>>>24&255,o[52]=ie>>>0&255,o[53]=ie>>>8&255,o[54]=ie>>>16&255,o[55]=ie>>>24&255,o[56]=se>>>0&255,o[57]=se>>>8&255,o[58]=se>>>16&255,o[59]=se>>>24&255,o[60]=ae>>>0&255,o[61]=ae>>>8&255,o[62]=ae>>>16&255,o[63]=ae>>>24&255}function pe(o,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,Z=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Q=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,oe=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,J=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,te=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,ee=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,D=b,N=h,j=k,W=L,z=G,w=B,v=ye,E=$,S=Z,C=Q,M=re,H=oe,ie=J,se=te,ae=ee,f,de=0;de<20;de+=2)f=O+H|0,W^=f<<7|f>>>25,f=W+O|0,E^=f<<9|f>>>23,f=E+W|0,H^=f<<13|f>>>19,f=H+E|0,O^=f<<18|f>>>14,f=z+D|0,S^=f<<7|f>>>25,f=S+z|0,ie^=f<<9|f>>>23,f=ie+S|0,D^=f<<13|f>>>19,f=D+ie|0,z^=f<<18|f>>>14,f=C+w|0,se^=f<<7|f>>>25,f=se+C|0,N^=f<<9|f>>>23,f=N+se|0,w^=f<<13|f>>>19,f=w+N|0,C^=f<<18|f>>>14,f=ae+M|0,j^=f<<7|f>>>25,f=j+ae|0,v^=f<<9|f>>>23,f=v+j|0,M^=f<<13|f>>>19,f=M+v|0,ae^=f<<18|f>>>14,f=O+j|0,D^=f<<7|f>>>25,f=D+O|0,N^=f<<9|f>>>23,f=N+D|0,j^=f<<13|f>>>19,f=j+N|0,O^=f<<18|f>>>14,f=z+W|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,W^=f<<13|f>>>19,f=W+v|0,z^=f<<18|f>>>14,f=C+S|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=ae+se|0,H^=f<<7|f>>>25,f=H+ae|0,ie^=f<<9|f>>>23,f=ie+H|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;o[0]=O>>>0&255,o[1]=O>>>8&255,o[2]=O>>>16&255,o[3]=O>>>24&255,o[4]=z>>>0&255,o[5]=z>>>8&255,o[6]=z>>>16&255,o[7]=z>>>24&255,o[8]=C>>>0&255,o[9]=C>>>8&255,o[10]=C>>>16&255,o[11]=C>>>24&255,o[12]=ae>>>0&255,o[13]=ae>>>8&255,o[14]=ae>>>16&255,o[15]=ae>>>24&255,o[16]=w>>>0&255,o[17]=w>>>8&255,o[18]=w>>>16&255,o[19]=w>>>24&255,o[20]=v>>>0&255,o[21]=v>>>8&255,o[22]=v>>>16&255,o[23]=v>>>24&255,o[24]=E>>>0&255,o[25]=E>>>8&255,o[26]=E>>>16&255,o[27]=E>>>24&255,o[28]=S>>>0&255,o[29]=S>>>8&255,o[30]=S>>>16&255,o[31]=S>>>24&255}function ce(o,a,i,e){U(o,a,i,e)}function q(o,a,i,e){pe(o,a,i,e)}var ze=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function Be(o,a,i,e,s,b,h){var k=new Uint8Array(16),L=new Uint8Array(64),G,B;for(B=0;B<16;B++)k[B]=0;for(B=0;B<8;B++)k[B]=b[B];for(;s>=64;){for(ce(L,k,h,ze),B=0;B<64;B++)o[a+B]=i[e+B]^L[B];for(G=1,B=8;B<16;B++)G=G+(k[B]&255)|0,k[B]=G&255,G>>>=8;s-=64,a+=64,e+=64}if(s>0)for(ce(L,k,h,ze),B=0;B<s;B++)o[a+B]=i[e+B]^L[B];return 0}function Ne(o,a,i,e,s){var b=new Uint8Array(16),h=new Uint8Array(64),k,L;for(L=0;L<16;L++)b[L]=0;for(L=0;L<8;L++)b[L]=e[L];for(;i>=64;){for(ce(h,b,s,ze),L=0;L<64;L++)o[a+L]=h[L];for(k=1,L=8;L<16;L++)k=k+(b[L]&255)|0,b[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(ce(h,b,s,ze),L=0;L<i;L++)o[a+L]=h[L];return 0}function Ee(o,a,i,e,s){var b=new Uint8Array(32);q(b,e,s,ze);for(var h=new Uint8Array(8),k=0;k<8;k++)h[k]=e[k+16];return Ne(o,a,i,h,b)}function Se(o,a,i,e,s,b,h){var k=new Uint8Array(32);q(k,b,h,ze);for(var L=new Uint8Array(8),G=0;G<8;G++)L[G]=b[G+16];return Be(o,a,i,e,s,L,k)}var Ge=function(o){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,b,h,k,L;a=o[0]&255|(o[1]&255)<<8,this.r[0]=a&8191,i=o[2]&255|(o[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=o[4]&255|(o[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=o[6]&255|(o[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,b=o[8]&255|(o[9]&255)<<8,this.r[4]=(s>>>4|b<<12)&255,this.r[5]=b>>>1&8190,h=o[10]&255|(o[11]&255)<<8,this.r[6]=(b>>>14|h<<2)&8191,k=o[12]&255|(o[13]&255)<<8,this.r[7]=(h>>>11|k<<5)&8065,L=o[14]&255|(o[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=o[16]&255|(o[17]&255)<<8,this.pad[1]=o[18]&255|(o[19]&255)<<8,this.pad[2]=o[20]&255|(o[21]&255)<<8,this.pad[3]=o[22]&255|(o[23]&255)<<8,this.pad[4]=o[24]&255|(o[25]&255)<<8,this.pad[5]=o[26]&255|(o[27]&255)<<8,this.pad[6]=o[28]&255|(o[29]&255)<<8,this.pad[7]=o[30]&255|(o[31]&255)<<8};Ge.prototype.blocks=function(o,a,i){for(var e=this.fin?0:2048,s,b,h,k,L,G,B,ye,$,Z,Q,re,oe,J,te,ee,O,D,N,j=this.h[0],W=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],H=this.h[9],ie=this.r[0],se=this.r[1],ae=this.r[2],f=this.r[3],de=this.r[4],ge=this.r[5],be=this.r[6],le=this.r[7],ue=this.r[8],xe=this.r[9];i>=16;)s=o[a+0]&255|(o[a+1]&255)<<8,j+=s&8191,b=o[a+2]&255|(o[a+3]&255)<<8,W+=(s>>>13|b<<3)&8191,h=o[a+4]&255|(o[a+5]&255)<<8,z+=(b>>>10|h<<6)&8191,k=o[a+6]&255|(o[a+7]&255)<<8,w+=(h>>>7|k<<9)&8191,L=o[a+8]&255|(o[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,G=o[a+10]&255|(o[a+11]&255)<<8,S+=(L>>>14|G<<2)&8191,B=o[a+12]&255|(o[a+13]&255)<<8,C+=(G>>>11|B<<5)&8191,ye=o[a+14]&255|(o[a+15]&255)<<8,M+=(B>>>8|ye<<8)&8191,H+=ye>>>5|e,$=0,Z=$,Z+=j*ie,Z+=W*(5*xe),Z+=z*(5*ue),Z+=w*(5*le),Z+=v*(5*be),$=Z>>>13,Z&=8191,Z+=E*(5*ge),Z+=S*(5*de),Z+=C*(5*f),Z+=M*(5*ae),Z+=H*(5*se),$+=Z>>>13,Z&=8191,Q=$,Q+=j*se,Q+=W*ie,Q+=z*(5*xe),Q+=w*(5*ue),Q+=v*(5*le),$=Q>>>13,Q&=8191,Q+=E*(5*be),Q+=S*(5*ge),Q+=C*(5*de),Q+=M*(5*f),Q+=H*(5*ae),$+=Q>>>13,Q&=8191,re=$,re+=j*ae,re+=W*se,re+=z*ie,re+=w*(5*xe),re+=v*(5*ue),$=re>>>13,re&=8191,re+=E*(5*le),re+=S*(5*be),re+=C*(5*ge),re+=M*(5*de),re+=H*(5*f),$+=re>>>13,re&=8191,oe=$,oe+=j*f,oe+=W*ae,oe+=z*se,oe+=w*ie,oe+=v*(5*xe),$=oe>>>13,oe&=8191,oe+=E*(5*ue),oe+=S*(5*le),oe+=C*(5*be),oe+=M*(5*ge),oe+=H*(5*de),$+=oe>>>13,oe&=8191,J=$,J+=j*de,J+=W*f,J+=z*ae,J+=w*se,J+=v*ie,$=J>>>13,J&=8191,J+=E*(5*xe),J+=S*(5*ue),J+=C*(5*le),J+=M*(5*be),J+=H*(5*ge),$+=J>>>13,J&=8191,te=$,te+=j*ge,te+=W*de,te+=z*f,te+=w*ae,te+=v*se,$=te>>>13,te&=8191,te+=E*ie,te+=S*(5*xe),te+=C*(5*ue),te+=M*(5*le),te+=H*(5*be),$+=te>>>13,te&=8191,ee=$,ee+=j*be,ee+=W*ge,ee+=z*de,ee+=w*f,ee+=v*ae,$=ee>>>13,ee&=8191,ee+=E*se,ee+=S*ie,ee+=C*(5*xe),ee+=M*(5*ue),ee+=H*(5*le),$+=ee>>>13,ee&=8191,O=$,O+=j*le,O+=W*be,O+=z*ge,O+=w*de,O+=v*f,$=O>>>13,O&=8191,O+=E*ae,O+=S*se,O+=C*ie,O+=M*(5*xe),O+=H*(5*ue),$+=O>>>13,O&=8191,D=$,D+=j*ue,D+=W*le,D+=z*be,D+=w*ge,D+=v*de,$=D>>>13,D&=8191,D+=E*f,D+=S*ae,D+=C*se,D+=M*ie,D+=H*(5*xe),$+=D>>>13,D&=8191,N=$,N+=j*xe,N+=W*ue,N+=z*le,N+=w*be,N+=v*ge,$=N>>>13,N&=8191,N+=E*de,N+=S*f,N+=C*ae,N+=M*se,N+=H*ie,$+=N>>>13,N&=8191,$=($<<2)+$|0,$=$+Z|0,Z=$&8191,$=$>>>13,Q+=$,j=Z,W=Q,z=re,w=oe,v=J,E=te,S=ee,C=O,M=D,H=N,a+=16,i-=16;this.h[0]=j,this.h[1]=W,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=H},Ge.prototype.finish=function(o,a){var i=new Uint16Array(10),e,s,b,h;if(this.leftover){for(h=this.leftover,this.buffer[h++]=1;h<16;h++)this.buffer[h]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,h=2;h<10;h++)this.h[h]+=e,e=this.h[h]>>>13,this.h[h]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,h=1;h<10;h++)i[h]=this.h[h]+e,e=i[h]>>>13,i[h]&=8191;for(i[9]-=8192,s=(e^1)-1,h=0;h<10;h++)i[h]&=s;for(s=~s,h=0;h<10;h++)this.h[h]=this.h[h]&s|i[h];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,b=this.h[0]+this.pad[0],this.h[0]=b&65535,h=1;h<8;h++)b=(this.h[h]+this.pad[h]|0)+(b>>>16)|0,this.h[h]=b&65535;o[a+0]=this.h[0]>>>0&255,o[a+1]=this.h[0]>>>8&255,o[a+2]=this.h[1]>>>0&255,o[a+3]=this.h[1]>>>8&255,o[a+4]=this.h[2]>>>0&255,o[a+5]=this.h[2]>>>8&255,o[a+6]=this.h[3]>>>0&255,o[a+7]=this.h[3]>>>8&255,o[a+8]=this.h[4]>>>0&255,o[a+9]=this.h[4]>>>8&255,o[a+10]=this.h[5]>>>0&255,o[a+11]=this.h[5]>>>8&255,o[a+12]=this.h[6]>>>0&255,o[a+13]=this.h[6]>>>8&255,o[a+14]=this.h[7]>>>0&255,o[a+15]=this.h[7]>>>8&255},Ge.prototype.update=function(o,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=o[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(o,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=o[a+e];this.leftover+=i}};function et(o,a,i,e,s,b){var h=new Ge(b);return h.update(i,e,s),h.finish(o,a),0}function st(o,a,i,e,s,b){var h=new Uint8Array(16);return et(h,0,i,e,s,b),T(o,a,h,0)}function Oe(o,a,i,e,s){var b;if(i<32)return-1;for(Se(o,0,a,0,i,e,s),et(o,16,o,32,i-32,o),b=0;b<16;b++)o[b]=0;return 0}function gt(o,a,i,e,s){var b,h=new Uint8Array(32);if(i<32||(Ee(h,0,32,e,s),st(a,16,a,32,i-32,h)!==0))return-1;for(Se(o,0,a,0,i,e,s),b=0;b<32;b++)o[b]=0;return 0}function Ue(o,a){var i;for(i=0;i<16;i++)o[i]=a[i]|0}function bt(o){var a,i,e=1;for(a=0;a<16;a++)i=o[a]+e+65535,e=Math.floor(i/65536),o[a]=i-e*65536;o[0]+=e-1+37*(e-1)}function He(o,a,i){for(var e,s=~(i-1),b=0;b<16;b++)e=s&(o[b]^a[b]),o[b]^=e,a[b]^=e}function tt(o,a){var i,e,s,b=r(),h=r();for(i=0;i<16;i++)h[i]=a[i];for(bt(h),bt(h),bt(h),e=0;e<2;e++){for(b[0]=h[0]-65517,i=1;i<15;i++)b[i]=h[i]-65535-(b[i-1]>>16&1),b[i-1]&=65535;b[15]=h[15]-32767-(b[14]>>16&1),s=b[15]>>16&1,b[14]&=65535,He(h,b,1-s)}for(i=0;i<16;i++)o[2*i]=h[i]&255,o[2*i+1]=h[i]>>8}function zt(o,a){var i=new Uint8Array(32),e=new Uint8Array(32);return tt(i,o),tt(e,a),V(i,0,e,0)}function mt(o){var a=new Uint8Array(32);return tt(a,o),a[0]&1}function Xe(o,a){var i;for(i=0;i<16;i++)o[i]=a[2*i]+(a[2*i+1]<<8);o[15]&=32767}function Re(o,a,i){for(var e=0;e<16;e++)o[e]=a[e]+i[e]}function je(o,a,i){for(var e=0;e<16;e++)o[e]=a[e]-i[e]}function fe(o,a,i){var e,s,b=0,h=0,k=0,L=0,G=0,B=0,ye=0,$=0,Z=0,Q=0,re=0,oe=0,J=0,te=0,ee=0,O=0,D=0,N=0,j=0,W=0,z=0,w=0,v=0,E=0,S=0,C=0,M=0,H=0,ie=0,se=0,ae=0,f=i[0],de=i[1],ge=i[2],be=i[3],le=i[4],ue=i[5],xe=i[6],ke=i[7],me=i[8],we=i[9],ve=i[10],_e=i[11],Ae=i[12],Te=i[13],Ie=i[14],$e=i[15];e=a[0],b+=e*f,h+=e*de,k+=e*ge,L+=e*be,G+=e*le,B+=e*ue,ye+=e*xe,$+=e*ke,Z+=e*me,Q+=e*we,re+=e*ve,oe+=e*_e,J+=e*Ae,te+=e*Te,ee+=e*Ie,O+=e*$e,e=a[1],h+=e*f,k+=e*de,L+=e*ge,G+=e*be,B+=e*le,ye+=e*ue,$+=e*xe,Z+=e*ke,Q+=e*me,re+=e*we,oe+=e*ve,J+=e*_e,te+=e*Ae,ee+=e*Te,O+=e*Ie,D+=e*$e,e=a[2],k+=e*f,L+=e*de,G+=e*ge,B+=e*be,ye+=e*le,$+=e*ue,Z+=e*xe,Q+=e*ke,re+=e*me,oe+=e*we,J+=e*ve,te+=e*_e,ee+=e*Ae,O+=e*Te,D+=e*Ie,N+=e*$e,e=a[3],L+=e*f,G+=e*de,B+=e*ge,ye+=e*be,$+=e*le,Z+=e*ue,Q+=e*xe,re+=e*ke,oe+=e*me,J+=e*we,te+=e*ve,ee+=e*_e,O+=e*Ae,D+=e*Te,N+=e*Ie,j+=e*$e,e=a[4],G+=e*f,B+=e*de,ye+=e*ge,$+=e*be,Z+=e*le,Q+=e*ue,re+=e*xe,oe+=e*ke,J+=e*me,te+=e*we,ee+=e*ve,O+=e*_e,D+=e*Ae,N+=e*Te,j+=e*Ie,W+=e*$e,e=a[5],B+=e*f,ye+=e*de,$+=e*ge,Z+=e*be,Q+=e*le,re+=e*ue,oe+=e*xe,J+=e*ke,te+=e*me,ee+=e*we,O+=e*ve,D+=e*_e,N+=e*Ae,j+=e*Te,W+=e*Ie,z+=e*$e,e=a[6],ye+=e*f,$+=e*de,Z+=e*ge,Q+=e*be,re+=e*le,oe+=e*ue,J+=e*xe,te+=e*ke,ee+=e*me,O+=e*we,D+=e*ve,N+=e*_e,j+=e*Ae,W+=e*Te,z+=e*Ie,w+=e*$e,e=a[7],$+=e*f,Z+=e*de,Q+=e*ge,re+=e*be,oe+=e*le,J+=e*ue,te+=e*xe,ee+=e*ke,O+=e*me,D+=e*we,N+=e*ve,j+=e*_e,W+=e*Ae,z+=e*Te,w+=e*Ie,v+=e*$e,e=a[8],Z+=e*f,Q+=e*de,re+=e*ge,oe+=e*be,J+=e*le,te+=e*ue,ee+=e*xe,O+=e*ke,D+=e*me,N+=e*we,j+=e*ve,W+=e*_e,z+=e*Ae,w+=e*Te,v+=e*Ie,E+=e*$e,e=a[9],Q+=e*f,re+=e*de,oe+=e*ge,J+=e*be,te+=e*le,ee+=e*ue,O+=e*xe,D+=e*ke,N+=e*me,j+=e*we,W+=e*ve,z+=e*_e,w+=e*Ae,v+=e*Te,E+=e*Ie,S+=e*$e,e=a[10],re+=e*f,oe+=e*de,J+=e*ge,te+=e*be,ee+=e*le,O+=e*ue,D+=e*xe,N+=e*ke,j+=e*me,W+=e*we,z+=e*ve,w+=e*_e,v+=e*Ae,E+=e*Te,S+=e*Ie,C+=e*$e,e=a[11],oe+=e*f,J+=e*de,te+=e*ge,ee+=e*be,O+=e*le,D+=e*ue,N+=e*xe,j+=e*ke,W+=e*me,z+=e*we,w+=e*ve,v+=e*_e,E+=e*Ae,S+=e*Te,C+=e*Ie,M+=e*$e,e=a[12],J+=e*f,te+=e*de,ee+=e*ge,O+=e*be,D+=e*le,N+=e*ue,j+=e*xe,W+=e*ke,z+=e*me,w+=e*we,v+=e*ve,E+=e*_e,S+=e*Ae,C+=e*Te,M+=e*Ie,H+=e*$e,e=a[13],te+=e*f,ee+=e*de,O+=e*ge,D+=e*be,N+=e*le,j+=e*ue,W+=e*xe,z+=e*ke,w+=e*me,v+=e*we,E+=e*ve,S+=e*_e,C+=e*Ae,M+=e*Te,H+=e*Ie,ie+=e*$e,e=a[14],ee+=e*f,O+=e*de,D+=e*ge,N+=e*be,j+=e*le,W+=e*ue,z+=e*xe,w+=e*ke,v+=e*me,E+=e*we,S+=e*ve,C+=e*_e,M+=e*Ae,H+=e*Te,ie+=e*Ie,se+=e*$e,e=a[15],O+=e*f,D+=e*de,N+=e*ge,j+=e*be,W+=e*le,z+=e*ue,w+=e*xe,v+=e*ke,E+=e*me,S+=e*we,C+=e*ve,M+=e*_e,H+=e*Ae,ie+=e*Te,se+=e*Ie,ae+=e*$e,b+=38*D,h+=38*N,k+=38*j,L+=38*W,G+=38*z,B+=38*w,ye+=38*v,$+=38*E,Z+=38*S,Q+=38*C,re+=38*M,oe+=38*H,J+=38*ie,te+=38*se,ee+=38*ae,s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,b+=s-1+37*(s-1),s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=te+s+65535,s=Math.floor(e/65536),te=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,b+=s-1+37*(s-1),o[0]=b,o[1]=h,o[2]=k,o[3]=L,o[4]=G,o[5]=B,o[6]=ye,o[7]=$,o[8]=Z,o[9]=Q,o[10]=re,o[11]=oe,o[12]=J,o[13]=te,o[14]=ee,o[15]=O}function F(o,a){fe(o,a,a)}function Y(o,a){var i=r(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)F(i,i),e!==2&&e!==4&&fe(i,i,a);for(e=0;e<16;e++)o[e]=i[e]}function K(o,a){var i=r(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)F(i,i),e!==1&&fe(i,i,a);for(e=0;e<16;e++)o[e]=i[e]}function R(o,a,i){var e=new Uint8Array(32),s=new Float64Array(80),b,h,k=r(),L=r(),G=r(),B=r(),ye=r(),$=r();for(h=0;h<31;h++)e[h]=a[h];for(e[31]=a[31]&127|64,e[0]&=248,Xe(s,i),h=0;h<16;h++)L[h]=s[h],B[h]=k[h]=G[h]=0;for(k[0]=B[0]=1,h=254;h>=0;--h)b=e[h>>>3]>>>(h&7)&1,He(k,L,b),He(G,B,b),Re(ye,k,G),je(k,k,G),Re(G,L,B),je(L,L,B),F(B,ye),F($,k),fe(k,G,k),fe(G,L,ye),Re(ye,k,G),je(k,k,G),F(L,k),je(G,B,$),fe(k,G,m),Re(k,k,B),fe(G,G,k),fe(k,B,$),fe(B,L,s),F(L,ye),He(k,L,b),He(G,B,b);for(h=0;h<16;h++)s[h+16]=k[h],s[h+32]=G[h],s[h+48]=L[h],s[h+64]=B[h];var Z=s.subarray(32),Q=s.subarray(16);return Y(Z,Z),fe(Q,Q,Z),tt(o,Q),0}function ne(o,a){return R(o,a,d)}function he(o,a){return l(a,32),ne(o,a)}function Me(o,a,i){var e=new Uint8Array(32);return R(e,i,a),q(o,c,e,ze)}var Le=Oe,ht=gt;function vn(o,a,i,e,s,b){var h=new Uint8Array(32);return Me(h,s,b),Le(o,a,i,e,h)}function Ye(o,a,i,e,s,b){var h=new Uint8Array(32);return Me(h,s,b),ht(o,a,i,e,h)}var nt=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function ro(o,a,i,e){for(var s=new Int32Array(16),b=new Int32Array(16),h,k,L,G,B,ye,$,Z,Q,re,oe,J,te,ee,O,D,N,j,W,z,w,v,E,S,C,M,H=o[0],ie=o[1],se=o[2],ae=o[3],f=o[4],de=o[5],ge=o[6],be=o[7],le=a[0],ue=a[1],xe=a[2],ke=a[3],me=a[4],we=a[5],ve=a[6],_e=a[7],Ae=0;e>=128;){for(W=0;W<16;W++)z=8*W+Ae,s[W]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],b[W]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(W=0;W<80;W++)if(h=H,k=ie,L=se,G=ae,B=f,ye=de,$=ge,Z=be,Q=le,re=ue,oe=xe,J=ke,te=me,ee=we,O=ve,D=_e,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(f>>>14|me<<18)^(f>>>18|me<<14)^(me>>>9|f<<23),v=(me>>>14|f<<18)^(me>>>18|f<<14)^(f>>>9|me<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=f&de^~f&ge,v=me&we^~me&ve,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=nt[W*2],v=nt[W*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[W%16],v=b[W%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,N=C&65535|M<<16,j=E&65535|S<<16,w=N,v=j,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(H>>>28|le<<4)^(le>>>2|H<<30)^(le>>>7|H<<25),v=(le>>>28|H<<4)^(H>>>2|le<<30)^(H>>>7|le<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=H&ie^H&se^ie&se,v=le&ue^le&xe^ue&xe,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,Z=C&65535|M<<16,D=E&65535|S<<16,w=G,v=J,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=N,v=j,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,G=C&65535|M<<16,J=E&65535|S<<16,ie=h,se=k,ae=L,f=G,de=B,ge=ye,be=$,H=Z,ue=Q,xe=re,ke=oe,me=J,we=te,ve=ee,_e=O,le=D,W%16===15)for(z=0;z<16;z++)w=s[z],v=b[z],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(z+9)%16],v=b[(z+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,N=s[(z+1)%16],j=b[(z+1)%16],w=(N>>>1|j<<31)^(N>>>8|j<<24)^N>>>7,v=(j>>>1|N<<31)^(j>>>8|N<<24)^(j>>>7|N<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,N=s[(z+14)%16],j=b[(z+14)%16],w=(N>>>19|j<<13)^(j>>>29|N<<3)^N>>>6,v=(j>>>19|N<<13)^(N>>>29|j<<3)^(j>>>6|N<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[z]=C&65535|M<<16,b[z]=E&65535|S<<16;w=H,v=le,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[0]=H=C&65535|M<<16,a[0]=le=E&65535|S<<16,w=ie,v=ue,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[1]=ie=C&65535|M<<16,a[1]=ue=E&65535|S<<16,w=se,v=xe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[2]=se=C&65535|M<<16,a[2]=xe=E&65535|S<<16,w=ae,v=ke,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[3]=ae=C&65535|M<<16,a[3]=ke=E&65535|S<<16,w=f,v=me,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[4]=f=C&65535|M<<16,a[4]=me=E&65535|S<<16,w=de,v=we,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[5]=de=C&65535|M<<16,a[5]=we=E&65535|S<<16,w=ge,v=ve,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[6]=ge=C&65535|M<<16,a[6]=ve=E&65535|S<<16,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=o[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,o[7]=be=C&65535|M<<16,a[7]=_e=E&65535|S<<16,Ae+=128,e-=128}return e}function lt(o,a,i){var e=new Int32Array(8),s=new Int32Array(8),b=new Uint8Array(256),h,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,ro(e,s,a,i),i%=128,h=0;h<i;h++)b[h]=a[k-i+h];for(b[i]=128,i=256-128*(i<112?1:0),b[i-9]=0,P(b,i-8,k/536870912|0,k<<3),ro(e,s,b,i),h=0;h<8;h++)P(o,8*h,e[h],s[h]);return 0}function Kt(o,a){var i=r(),e=r(),s=r(),b=r(),h=r(),k=r(),L=r(),G=r(),B=r();je(i,o[1],o[0]),je(B,a[1],a[0]),fe(i,i,B),Re(e,o[0],o[1]),Re(B,a[0],a[1]),fe(e,e,B),fe(s,o[3],a[3]),fe(s,s,g),fe(b,o[2],a[2]),Re(b,b,b),je(h,e,i),je(k,b,s),Re(L,b,s),Re(G,e,i),fe(o[0],h,k),fe(o[1],G,L),fe(o[2],L,k),fe(o[3],h,G)}function io(o,a,i){var e;for(e=0;e<4;e++)He(o[e],a[e],i)}function _n(o,a){var i=r(),e=r(),s=r();Y(s,a[2]),fe(i,a[0],s),fe(e,a[1],s),tt(o,e),o[31]^=mt(i)<<7}function Sn(o,a,i){var e,s;for(Ue(o[0],u),Ue(o[1],p),Ue(o[2],p),Ue(o[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,io(o,a,e),Kt(a,o),Kt(o,o),io(o,a,e)}function Ht(o,a){var i=[r(),r(),r(),r()];Ue(i[0],y),Ue(i[1],_),Ue(i[2],p),fe(i[3],y,_),Sn(o,i,a)}function kn(o,a,i){var e=new Uint8Array(64),s=[r(),r(),r(),r()],b;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Ht(s,e),_n(o,s),b=0;b<32;b++)a[b+32]=o[b];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Cn(o,a){var i,e,s,b;for(e=63;e>=32;--e){for(i=0,s=e-32,b=e-12;s<b;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,o[e]=a[e]&255}function En(o){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=o[i];for(i=0;i<64;i++)o[i]=0;Cn(o,a)}function ao(o,a,i,e){var s=new Uint8Array(64),b=new Uint8Array(64),h=new Uint8Array(64),k,L,G=new Float64Array(64),B=[r(),r(),r(),r()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ye=i+64;for(k=0;k<i;k++)o[64+k]=a[k];for(k=0;k<32;k++)o[32+k]=s[32+k];for(lt(h,o.subarray(32),i+32),En(h),Ht(B,h),_n(o,B),k=32;k<64;k++)o[k]=e[k];for(lt(b,o,i+64),En(b),k=0;k<64;k++)G[k]=0;for(k=0;k<32;k++)G[k]=h[k];for(k=0;k<32;k++)for(L=0;L<32;L++)G[k+L]+=b[k]*s[L];return Cn(o.subarray(32),G),ye}function fr(o,a){var i=r(),e=r(),s=r(),b=r(),h=r(),k=r(),L=r();return Ue(o[2],p),Xe(o[1],a),F(s,o[1]),fe(b,s,x),je(s,s,o[2]),Re(b,o[2],b),F(h,b),F(k,h),fe(L,k,h),fe(i,L,s),fe(i,i,b),K(i,i),fe(i,i,s),fe(i,i,b),fe(i,i,b),fe(o[0],i,b),F(e,o[0]),fe(e,e,b),zt(e,s)&&fe(o[0],o[0],I),F(e,o[0]),fe(e,e,b),zt(e,s)?-1:(mt(o[0])===a[31]>>7&&je(o[0],u,o[0]),fe(o[3],o[0],o[1]),0)}function Mn(o,a,i,e){var s,b=new Uint8Array(32),h=new Uint8Array(64),k=[r(),r(),r(),r()],L=[r(),r(),r(),r()];if(i<64||fr(L,e))return-1;for(s=0;s<i;s++)o[s]=a[s];for(s=0;s<32;s++)o[s+32]=e[s];if(lt(h,o,i),En(h),Sn(k,L,h),Ht(L,a.subarray(32)),Kt(k,L),_n(b,k),i-=64,V(a,0,b,0)){for(s=0;s<i;s++)o[s]=0;return-1}for(s=0;s<i;s++)o[s]=a[s+64];return i}var Ln=32,Vt=24,Bt=32,wt=16,Nt=32,Zt=32,Tt=32,It=32,An=32,so=Vt,pr=Bt,ur=wt,Ve=64,ct=32,vt=64,zn=32,Bn=64;n.lowlevel={crypto_core_hsalsa20:q,crypto_stream_xor:Se,crypto_stream:Ee,crypto_stream_salsa20_xor:Be,crypto_stream_salsa20:Ne,crypto_onetimeauth:et,crypto_onetimeauth_verify:st,crypto_verify_16:T,crypto_verify_32:V,crypto_secretbox:Oe,crypto_secretbox_open:gt,crypto_scalarmult:R,crypto_scalarmult_base:ne,crypto_box_beforenm:Me,crypto_box_afternm:Le,crypto_box:vn,crypto_box_open:Ye,crypto_box_keypair:he,crypto_hash:lt,crypto_sign:ao,crypto_sign_keypair:kn,crypto_sign_open:Mn,crypto_secretbox_KEYBYTES:Ln,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:Bt,crypto_secretbox_BOXZEROBYTES:wt,crypto_scalarmult_BYTES:Nt,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:Tt,crypto_box_SECRETKEYBYTES:It,crypto_box_BEFORENMBYTES:An,crypto_box_NONCEBYTES:so,crypto_box_ZEROBYTES:pr,crypto_box_BOXZEROBYTES:ur,crypto_sign_BYTES:Ve,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:vt,crypto_sign_SEEDBYTES:zn,crypto_hash_BYTES:Bn,gf:r,D:x,L:Xt,pack25519:tt,unpack25519:Xe,M:fe,A:Re,S:F,Z:je,pow2523:K,add:Kt,set25519:Ue,modL:Cn,scalarmult:Sn,scalarbase:Ht};function lo(o,a){if(o.length!==Ln)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function xr(o,a){if(o.length!==Tt)throw new Error("bad public key size");if(a.length!==It)throw new Error("bad secret key size")}function Fe(){for(var o=0;o<arguments.length;o++)if(!(arguments[o]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function co(o){for(var a=0;a<o.length;a++)o[a]=0}n.randomBytes=function(o){var a=new Uint8Array(o);return l(a,o),a},n.secretbox=function(o,a,i){Fe(o,a,i),lo(i,a);for(var e=new Uint8Array(Bt+o.length),s=new Uint8Array(e.length),b=0;b<o.length;b++)e[b+Bt]=o[b];return Oe(s,e,e.length,a,i),s.subarray(wt)},n.secretbox.open=function(o,a,i){Fe(o,a,i),lo(i,a);for(var e=new Uint8Array(wt+o.length),s=new Uint8Array(e.length),b=0;b<o.length;b++)e[b+wt]=o[b];return e.length<32||gt(s,e,e.length,a,i)!==0?null:s.subarray(Bt)},n.secretbox.keyLength=Ln,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=wt,n.scalarMult=function(o,a){if(Fe(o,a),o.length!==Zt)throw new Error("bad n size");if(a.length!==Nt)throw new Error("bad p size");var i=new Uint8Array(Nt);return R(i,o,a),i},n.scalarMult.base=function(o){if(Fe(o),o.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(Nt);return ne(a,o),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=Nt,n.box=function(o,a,i,e){var s=n.box.before(i,e);return n.secretbox(o,a,s)},n.box.before=function(o,a){Fe(o,a),xr(o,a);var i=new Uint8Array(An);return Me(i,o,a),i},n.box.after=n.secretbox,n.box.open=function(o,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(o,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var o=new Uint8Array(Tt),a=new Uint8Array(It);return he(o,a),{publicKey:o,secretKey:a}},n.box.keyPair.fromSecretKey=function(o){if(Fe(o),o.length!==It)throw new Error("bad secret key size");var a=new Uint8Array(Tt);return ne(a,o),{publicKey:a,secretKey:new Uint8Array(o)}},n.box.publicKeyLength=Tt,n.box.secretKeyLength=It,n.box.sharedKeyLength=An,n.box.nonceLength=so,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(o,a){if(Fe(o,a),a.length!==vt)throw new Error("bad secret key size");var i=new Uint8Array(Ve+o.length);return ao(i,o,o.length,a),i},n.sign.open=function(o,a){if(Fe(o,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(o.length),e=Mn(i,o,o.length,a);if(e<0)return null;for(var s=new Uint8Array(e),b=0;b<s.length;b++)s[b]=i[b];return s},n.sign.detached=function(o,a){for(var i=n.sign(o,a),e=new Uint8Array(Ve),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(o,a,i){if(Fe(o,a,i),a.length!==Ve)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(Ve+o.length),s=new Uint8Array(Ve+o.length),b;for(b=0;b<Ve;b++)e[b]=a[b];for(b=0;b<o.length;b++)e[b+Ve]=o[b];return Mn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var o=new Uint8Array(ct),a=new Uint8Array(vt);return kn(o,a),{publicKey:o,secretKey:a}},n.sign.keyPair.fromSecretKey=function(o){if(Fe(o),o.length!==vt)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=o[32+i];return{publicKey:a,secretKey:new Uint8Array(o)}},n.sign.keyPair.fromSeed=function(o){if(Fe(o),o.length!==zn)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(vt),e=0;e<32;e++)i[e]=o[e];return kn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=vt,n.sign.seedLength=zn,n.sign.signatureLength=Ve,n.hash=function(o){Fe(o);var a=new Uint8Array(Bn);return lt(a,o,o.length),a},n.hash.hashLength=Bn,n.verify=function(o,a){return Fe(o,a),o.length===0||a.length===0||o.length!==a.length?!1:A(o,0,a,0,o.length)===0},n.setPRNG=function(o){l=o},(function(){var o=typeof self<"u"?self.crypto||self.msCrypto:null;if(o&&o.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,b=new Uint8Array(e);for(s=0;s<e;s+=a)o.getRandomValues(b.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=b[s];co(b)})}else typeof ta<"u"&&(o=ra,o&&o.randomBytes&&n.setPRNG(function(i,e){var s,b=o.randomBytes(e);for(s=0;s<e;s++)i[s]=b[s];co(b)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Rn)),Rn.exports}var aa=ia();const Xo=Ji(aa);function sa(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const g=t.charAt(x),y=g.charCodeAt(0);if(n[y]!==255)throw new TypeError(g+" is ambiguous");n[y]=x}const r=t.length,l=t.charAt(0),c=Math.log(r)/Math.log(256),d=Math.log(256)/Math.log(r);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let g=0,y=0,_=0;const I=x.length;for(;_!==I&&x[_]===0;)_++,g++;const P=(I-_)*d+1>>>0,A=new Uint8Array(P);for(;_!==I;){let U=x[_],pe=0;for(let ce=P-1;(U!==0||pe<y)&&ce!==-1;ce--,pe++)U+=256*A[ce]>>>0,A[ce]=U%r>>>0,U=U/r>>>0;if(U!==0)throw new Error("Non-zero carry");y=pe,_++}let T=P-y;for(;T!==P&&A[T]===0;)T++;let V=l.repeat(g);for(;T<P;++T)V+=t.charAt(A[T]);return V}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let g=0,y=0,_=0;for(;x[g]===l;)y++,g++;const I=(x.length-g)*c+1>>>0,P=new Uint8Array(I);for(;g<x.length;){const U=x.charCodeAt(g);if(U>255)return;let pe=n[U];if(pe===255)return;let ce=0;for(let q=I-1;(pe!==0||ce<_)&&q!==-1;q--,ce++)pe+=r*P[q]>>>0,P[q]=pe%256>>>0,pe=pe/256>>>0;if(pe!==0)throw new Error("Non-zero carry");_=ce,g++}let A=I-_;for(;A!==I&&P[A]===0;)A++;const T=new Uint8Array(y+(I-A));let V=y;for(;A!==I;)T[V++]=P[A++];return T}function m(x){const g=p(x);if(g)return g;throw new Error("Non-base"+r+" character")}return{encode:u,decodeUnsafe:p,decode:m}}var la="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const dn=sa(la),no="cbsgo_wallet_v3",mn="cbsgo_wallet_unlocked_v3";function Yt(){try{const t=localStorage.getItem(no);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function ca(t){localStorage.setItem(no,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function da(){const t=Xo.sign.keyPair(),n=dn.encode(t.publicKey),r=dn.encode(t.secretKey);return{pk:n,sk:r}}function Vo(){return!!Yt()}function fa(){return Yt()?sessionStorage.getItem(mn)==="1":!1}function pa(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");Yt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=da();return ca({pk:l,sk:c,pin:n}),sessionStorage.setItem(mn,"1"),l}function ua(t){const n=Yt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(mn,"1"),n.pk}function Ke(){const t=Yt();return t?t.pk:""}function xa(){localStorage.removeItem(no),sessionStorage.removeItem(mn)}typeof window<"u"&&(window.cbsgoDevResetWallet=xa);const Zo="cbsgoLoginModal";function Qo(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Jo(){const t=document.getElementById(Zo);t&&t.remove()}function ya(t){Jo();const n=document.createElement("div");return n.id=Zo,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function ga(t,n){return`
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
      ">${Qo(t)}</div>

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
  `}function wo(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ba(){const t=!Vo();let n="";try{const g=yt();t?g&&g!=="Sovereign"?n=g:n="":n=g||""}catch{n=""}const r=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Qo(n)}" style="${Qt()}" placeholder="Kevin" />
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
        <button id="cbsgoCreateBtn" type="button" style="${wo(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${wo(!0)}">Unlock</button>
      </div>
    `,l=ya(ga(t?"Welcome to CBS-GO":"Unlock Wallet",r)),c=l.querySelector("#cbsgoLoginMsg"),d=g=>{c&&(c.textContent=g||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),m=l.querySelector("#cbsgoNick"),x=()=>{Jo(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const g=l.querySelector("#cbsgoCreateBtn");g&&(g.onclick=async()=>{try{const y=String(m?.value||"").trim(),_=String(u?.value||"").trim(),I=String(p?.value||"").trim();if(y.length<2)return d("⛔ Nickname too short.");if(_.length<4)return d("⛔ PIN must be at least 4 digits.");if(_!==I)return d("⛔ PINs do not match.");d("Creating wallet…"),Go(y),await pa(_),d("✅ Wallet created. Starting…"),x()}catch(y){d(`⛔ ${String(y?.message||y)}`)}})}else{const g=l.querySelector("#cbsgoUnlockBtn");g&&(g.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return d("⛔ PIN must be at least 4 digits.");d("Unlocking…"),await ua(y),d("✅ Unlocked."),x()}catch{d("⛔ Wrong PIN (or wallet data missing).")}})}}const er="cbsgo_solana_wallet_v1";function ma(t,n=null){try{const r=JSON.parse(t);return!r||typeof r!="object"||typeof r.publicKey!="string"||typeof r.secretKey!="string"?n:r}catch{return n}}function ha(){const t=Xo.sign.keyPair(),n=dn.encode(t.publicKey),r=dn.encode(t.secretKey),l={publicKey:n,secretKey:r,createdAt:new Date().toISOString(),version:1};try{localStorage.setItem(er,JSON.stringify(l))}catch(c){console.warn("CBS GO: failed to persist local Solana wallet",c)}return l}function wa(){try{const t=localStorage.getItem(er);return t?ma(t,null):null}catch{return null}}function tr(){let t=wa();return t||(t=ha(),t)}function hn(){return tr().publicKey}function vo(){return tr().secretKey}const va="https://cxfedvowjgkqrakkkjpi.supabase.co",_a="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",We=yr(va,_a);function Sa(){const t=Ke();if(!t)return null;const n=yt(),r=bn();let l=null;try{l=hn()}catch(c){console.warn("CBS GO: kon lokale Solana wallet niet lezen/aanmaken (solana_pk blijft leeg)",c)}return{wallet_pk:t,nickname:n,avatar:r,solana_pk:l}}async function an(t={}){try{const n=Sa();if(!n){console.warn("CBS GO: no game wallet, skip profile sync");return}const r={...n,...t,last_seen:new Date().toISOString()},{error:l}=await We.from("players").upsert(r,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ka=15e3,Ca=1e4,Ea=300*1e3;let Pt=null,_o=0,So=0;function Ma(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",Ma));async function La(){const t=Ke();if(!t||!Pt)return;const n=Date.now();if(n-_o<5e3)return;_o=n;const l=(yt()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:d,error:u}=await We.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(d&&d.length>0){const p=d[0].id,{error:m}=await We.from("player_state").update(c).eq("id",p);m&&console.warn("CBS GO: player_state update failed",m)}else{const{error:p}=await We.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(d){console.warn("CBS GO: pushMyState error",d)}}async function Aa(){const t=Ke();if(!t)return;const n=Date.now();if(n-So<3e3)return;So=n;const r=new Date(Date.now()-Ea).toISOString();try{const{data:l,error:c}=await We.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",r);if(c){console.warn("CBS GO: fetch online players failed",c);return}const d=Array.isArray(l)?l:[],u=Array.from(new Set(d.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:g}=await We.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);g?console.warn("CBS GO: fetch player profiles failed",g):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const m=d.map(x=>{const g=x.lat,y=x.lng,_=typeof g=="number"?g:parseFloat(g),I=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite(I))return null;const P=p.get(x.wallet_pk)||null,A=P&&P.nickname||x.nickname||"Anon",T=P&&P.avatar?String(P.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:T,lat:_,lng:I,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:m}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function za(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{La()},ka),setInterval(()=>{Aa()},Ca))}za();function nr(){const t=Ke();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function fn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Ba(t){const n=nr(),r=String(t||"").trim();if(!r)throw new Error("Wallet address is required.");if(r===n)throw new Error("You cannot add yourself as a friend.");if(r.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await We.from("friends").insert({a_wallet:n,b_wallet:r,status:"pending"});if(l)throw fn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function Na(t){const n=nr(),r=t;if(!r)throw new Error("Invalid friend request id.");const{data:l,error:c}=await We.from("friends").update({status:"accepted"}).eq("id",r).eq("b_wallet",n).select("*").maybeSingle();if(c)throw fn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function or(){const t=Ke();if(!t)return{incoming:[],accepted:[]};const{data:n,error:r}=await We.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(r)throw fn("loadFriendsOverview",r),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],d=[];for(const p of l){const m=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!m&&!x)continue;const g=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:g,nickname:null,avatar:""};m&&c.push(y),x&&d.push(y)}const u=Array.from(new Set([...c,...d].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:m}=await We.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!m&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const g=y=>{y.forEach(_=>{const I=x.get(_.otherWallet);I&&(_.nickname=I.nickname||null,_.avatar=I.avatar||"")})};g(c),g(d)}else m&&fn("loadFriendsOverview:players",m)}return{incoming:c,accepted:d}}let jt=null;async function rr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(jt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),jt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Ta(){try{jt&&(await jt.release(),jt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Ia(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await rr():await Ta()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}const Kn="cbsgo_trades";async function $a(t,n){const r=Ke();if(!r)throw new Error("No local CBS-GO wallet available.");const l=yt(),c=bn(),d=Number(n?.tickets||0),u=Number(n?.cbs||0),p=n?.cardId||null,m=p?Number(n?.cardQty||0):0;if(!d&&!u&&!p)throw new Error("Nothing to send.");const x=Jt(),g=en();if(d>0&&d>x)throw new Error("Not enough tickets in your bag.");if(u>0&&u>g)throw new Error("Not enough CBS (play money) in your bag.");const{error:y}=await We.from(Kn).insert({from_wallet:r,to_wallet:t,tickets:d,cbs:u,card_id:p,card_qty:m,sender_nickname:l||null,sender_avatar:c||null,claimed:!1});if(y)throw console.warn("CBS GO: sendGiftToWallet failed",y),new Error(y.message||"Could not send gift.");try{const _=Jt(),I=en();console.log("CBS GO: deducting from bag",{tickets:d,cbs:u,beforeTickets:_,beforeCbs:I}),d>0&&At(-d),u>0&&yn(-u);const P=Jt(),A=en();console.log("CBS GO: bag after deduct",{afterTickets:P,afterCbs:A}),typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}catch(_){console.warn("CBS GO: failed to update local bag after trade",_)}}let jn=!1;async function ir(){const t=Ke();if(t&&!jn){jn=!0;try{const{data:n,error:r}=await We.from(Kn).select("*").eq("to_wallet",t).eq("claimed",!1).order("created_at",{ascending:!0}).limit(50);if(r){console.warn("CBS GO: pullIncomingGifts failed",r);return}if(!n||!n.length)return;for(const l of n){const c=l.id,{data:d,error:u}=await We.from(Kn).update({claimed:!0}).eq("id",c).eq("claimed",!1).select("id");if(u){console.warn("CBS GO: failed to mark trade as claimed",u);continue}if(!d||!d.length)continue;const p=Number(l.tickets||0),m=Number(l.cbs||0),x=l.card_id||null,g=Number(l.card_qty||0);p&&At(p),m&&yn(m),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:{senderNickname:l.sender_nickname||"",senderAvatar:l.sender_avatar||"",toWallet:l.to_wallet,tickets:p,cbs:m,cardId:x,cardQty:g}}))}typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}finally{jn=!1}}}function Ce(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oo(t,n=30){const r=t?`background-image:url('${t}');`:"";return`
    <div style="
      width:${n}px;height:${n}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${r}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">${t?"":"👤"}</div>
  `}const ar="cbsgo_cards_v1";function Pa(t,n){try{const r=JSON.parse(t);return r&&typeof r=="object"?r:n}catch{return n}}function Gt(){const t=localStorage.getItem(ar),n=Pa(t,{});let r={};return n&&typeof n.counts=="object"&&n.counts!==null?r={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(r[l.id]=c)}),r}function sr(t){const n={counts:{...t||{}}};try{localStorage.setItem(ar,JSON.stringify(n))}catch{}}function Hn(){const t=Gt(),n=pt();n.cards={...t||{}},Vn(n)}const Oa=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function Ra(){const t=Gt();let n=0,r=0;const l=[];for(const c of Oa){const d=Number(t[c.id]||0);Number.isFinite(d)&&d>0&&(n+=1,r+=d,l.push({id:c.id,count:d,label:c.label}))}return{cardTypes:n,cardTotal:r,sendable:l}}function wn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function pn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function Fn(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${Ce(t)}</div>
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
  `}function ja(){const t=yt(),n=bn(),r=Ke();return`
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
        ${oo(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Ce(t)}" maxlength="24" style="
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

          ${r?`
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
                    ${Ce(r)}
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
  `}function Fa(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),r=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const T=document.querySelector("#profileMsg");T&&(T.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const d=()=>{if(!t)return;const A=Go(t.value);c(`✅ Name saved: ${A}`);try{an()}catch(T){console.warn("CBS GO: failed to sync profile after name change",T)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(d,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),d()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const T=new FileReader;T.onload=()=>{di(String(T.result||"")),c("✅ Photo saved"),xt();try{an()}catch(V){console.warn("CBS GO: failed to sync profile after avatar change",V)}},T.onerror=()=>c("⛔ Failed to read image."),T.readAsDataURL(A)}),r&&(r.onclick=()=>{fi(),c("✅ Photo removed"),xt();try{an()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),m=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),g=document.querySelector("#friendsAcceptedList"),y=A=>{m&&(m.textContent=A||"")},_=A=>{if(!A)return"";const T=String(A);return T.length<=12?T:`${T.slice(0,5)}…${T.slice(-4)}`},I=(A,T="")=>{const V=A.nickname&&A.nickname.trim()?A.nickname.trim():_(A.otherWallet),U=_(A.otherWallet);return`
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
          ${oo(A.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Ce(V||"Friend")}
            </div>
            ${U?`<div style="font-size:11px;opacity:.7;">${Ce(U)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${T||""}
        </div>
      </div>
    `};async function P(){if(!(!x||!g))try{x.textContent="Loading…",g.textContent="Loading…";const A=await or();A.incoming.length?x.innerHTML=A.incoming.map(T=>{const V=`
              <div style="display:flex;gap:6px;align-items:center;">
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${T.otherWallet}"
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
                  data-friend-id="${T.id}"
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
            `;return I(T,V)}).join(""):x.textContent="No incoming requests.",A.accepted.length?g.innerHTML=A.accepted.map(T=>{const V=`
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
                  data-wallet="${T.otherWallet}"
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
            `;return I(T,V)}).join(""):g.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(T=>{T.addEventListener("click",async()=>{const V=T.getAttribute("data-friend-id");if(V){y("Accepting friend…"),T.disabled=!0;try{await Na(V),y("✅ Friend added."),await P()}catch(U){console.warn(U),y(`⛔ ${U.message||U}`),T.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(T=>{T.addEventListener("click",async()=>{const V=T.getAttribute("data-wallet")||"";if(V)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(V),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(U){console.warn("CBS GO: copy friend wallet failed",U),y("⛔ Could not copy wallet address.")}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",g.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){y("Enter a wallet address first.");return}y("Sending friend request…"),p.disabled=!0;try{await Ba(A),y("✅ Friend request sent."),u.value="",await P()}catch(T){console.warn(T),y(`⛔ ${T.message||T}`)}finally{p.disabled=!1}}),P().catch(()=>{})}function Wa(){const t=Jt(),n=en(),r=Ke(),l=hn(),{cardTypes:c,cardTotal:d,sendable:u}=Ra(),p=d>0?`You own ${d} cards (${c} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",x=u.length>0?`
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
            ${u.map(g=>`<option value="${Ce(g.id)}">${Ce(g.label||g.id)} (x${g.count})</option>`).join("")}
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

      ${r?`
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
                ${Ce(r)}
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

      ${l?`
            <div style="
              margin-top:16px;
              padding:10px 12px;
              border-radius:14px;
              border:1px solid rgba(56,189,248,.85);
              background:rgba(10,12,18,.92);
              cursor:pointer;
            " id="cbsgoOpenSolanaWalletCard">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                <div>
                  <div style="font-size:12px; opacity:.9; margin-bottom:4px;">
                    Local Solana wallet (real SPL address)
                  </div>
                  <div style="
                    font-size:11px;
                    opacity:.95;
                    padding:6px 8px;
                    border-radius:10px;
                    border:1px solid rgba(56,189,248,.5);
                    background:rgba(15,23,42,.95);
                    word-break:break-all;
                    font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                    margin-bottom:4px;
                  ">
                    ${Ce(l)}
                  </div>
                  <div style="font-size:11px;opacity:.8;">
                    Tap to open wallet page. Manage tokens and export your key safely.
                  </div>
                </div>
                <button id="cbsgoOpenSolanaWalletBtn" type="button" style="
                  padding:7px 11px;
                  border-radius:999px;
                  border:1px solid rgba(56,189,248,.9);
                  background:rgba(56,189,248,.18);
                  color:#e0f2fe;
                  font-size:12px;
                  font-weight:700;
                  cursor:pointer;
                  white-space:nowrap;
                ">
                  Open wallet
                </button>
              </div>
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
          ${Ce(p)}
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

          ${x}

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
  `}function Ua(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),r=document.querySelector("#cbsgoOpenCardsBtn");r&&(r.onclick=()=>{try{Qi()}catch(U){console.warn("CBS GO: openCardsPanel failed",U)}});try{Hn()}catch(U){console.warn("CBS GO: failed to sync inventory cards from bag",U)}const l=Ke(),c=document.querySelector("#giftWalletInput"),d=document.querySelector("#giftFriendSelect"),u=document.querySelector("#giftTicketsInput"),p=document.querySelector("#giftCbsInput"),m=document.querySelector("#giftCardSelect"),x=document.querySelector("#giftCardQtyInput"),g=document.querySelector("#giftSendBtn"),y=document.querySelector("#giftMsg"),_=U=>{y&&(y.textContent=U||"")};async function I(){if(d)try{const U=await or(),pe=[];pe.push('<option value="">-- No friend selected --</option>'),U.accepted&&U.accepted.length&&U.accepted.forEach(ce=>{const q=ce.otherWallet||"";if(!q)return;const ze=ce.nickname&&ce.nickname.trim()?ce.nickname.trim():q,Be=Ce(ze),Ne=q.length>12?`${q.slice(0,5)}…${q.slice(-4)}`:q,Ee=`${Be} (${Ce(Ne)})`;pe.push(`<option value="${Ce(q)}">${Ee}</option>`)}),d.innerHTML=pe.join("")}catch(U){console.warn("CBS GO: populateFriendSelect failed",U),d.innerHTML='<option value="">-- Friends not available --</option>'}}I().catch(()=>{}),g&&(c||d)&&g.addEventListener("click",async()=>{let U=c&&c.value?c.value.trim():"";if((!U||!U.length)&&d){const Se=d.value.trim();Se&&(U=Se)}const pe=u?.value??"",ce=p?.value??"",q=m?m.value.trim():"",ze=x?.value??"",Be=Number(ze||"0"),Ne=Number(pe||"0"),Ee=Number(ce||"0");if(!U){_("Enter a wallet address first, or pick a friend.");return}if((!Ne||Ne<=0)&&(!Ee||Ee<=0)&&!q){_("Set tickets and/or CBS above 0, or choose a card.");return}if(q&&(!Be||Be<=0)){_("Set card quantity above 0.");return}if(q&&Be>0){const Se=Gt(),Ge=Number(Se[q]||0);if(!Number.isFinite(Ge)||Ge<Be){_("Not enough of that card in your collection.");return}}g.disabled=!0,_("Sending gift…");try{if(await $a(U,{tickets:Ne,cbs:Ee,cardId:q||null,cardQty:q?Be:0}),q&&Be>0){const Se=Gt(),et=Number(Se[q]||0)-Be;et>0?Se[q]=et:delete Se[q],sr(Se),Hn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...Se}}}))}_("✅ Gift sent."),u&&(u.value=""),p&&(p.value=""),x&&(x.value=""),m&&(m.value=""),d&&(d.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:U,tickets:Ne,cbs:Ee,cardId:q||null,cardQty:q?Be:0}}))}catch(Se){console.warn(Se),_(`⛔ ${Se.message||"Could not send gift."}`)}finally{g.disabled=!1}});const P=U=>{n&&(n.textContent=U||"")};t&&l&&(t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),P("✅ Wallet address copied to clipboard.")):P("📋 Copy not supported in this browser.")}catch{P("⛔ Failed to copy address.")}});const A=document.querySelector("#cbsgoOpenSolanaWalletCard"),T=document.querySelector("#cbsgoOpenSolanaWalletBtn"),V=()=>{pn("wallet"),xt()};A&&A.addEventListener("click",U=>{V()}),T&&T.addEventListener("click",U=>{U.stopPropagation(),V()}),ir().catch(()=>{})}function Ga(){const t=hn();if(!t)return`
      <section style="
        padding:14px;
        border-radius:18px;
        border:1px solid rgba(239,68,68,.65);
        background:rgba(24,24,27,.9);
      ">
        <h3 style="margin:0 0 8px 0;font-size:16px;">Solana Wallet</h3>
        <p style="margin:0;font-size:12px;opacity:.8;">
          No local Solana wallet found. Try restarting the app or resetting debug data.
        </p>
      </section>
    `;const n="•".repeat(44);return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(56,189,248,.85);
      background:rgba(8,10,16,.90);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Solana Wallet</h3>
      <p style="margin:0 0 12px 0; font-size:12px; opacity:.78;">
        This is your local Solana wallet for CBS-GO. You can receive SOL and SPL tokens here,
        and later connect the same wallet in Phantom or other apps.
      </p>

      <!-- Receive -->
      <div style="
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(56,189,248,.6);
        background:rgba(15,23,42,.98);
        margin-bottom:12px;
      ">
        <div style="font-size:13px;font-weight:600;margin-bottom:4px;">
          Receive tokens
        </div>
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Share this address to receive SOL or SPL tokens (like CBS) from other wallets.
        </div>
        <div style="
          font-size:11px;
          opacity:.95;
          padding:6px 8px;
          border-radius:10px;
          border:1px solid rgba(56,189,248,.55);
          background:rgba(15,23,42,1);
          word-break:break-all;
          font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          margin-bottom:6px;
        ">
          ${Ce(t)}
        </div>
        <button id="walletCopyAddressBtn" type="button" style="
          padding:7px 11px;
          border-radius:999px;
          border:1px solid rgba(56,189,248,.9);
          background:rgba(56,189,248,.18);
          color:#e0f2fe;
          font-size:12px;
          font-weight:700;
          cursor:pointer;
        ">
          Copy address
        </button>
      </div>

      <!-- Send UI (voor nu nog niet on-chain) -->
      <div style="
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(148,163,184,.65);
        background:rgba(15,23,42,.96);
        margin-bottom:12px;
      ">
        <div style="font-size:13px;font-weight:600;margin-bottom:4px;">
          Send tokens (coming soon)
        </div>
        <div style="font-size:11px;opacity:.78;margin-bottom:8px;">
          The send form will later connect to the Solana network. For now this is just a preview UI.
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <div>
            <label for="walletSendToInput" style="font-size:11px;opacity:.8;">To address</label>
            <input id="walletSendToInput" placeholder="Paste Solana address" style="
              margin-top:4px;
              width:100%;
              padding:8px 9px;
              border-radius:10px;
              border:1px solid rgba(148,163,184,.7);
              background:rgba(15,23,42,1);
              color:#fff;
              font-size:12px;
            " />
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="flex:1;min-width:110px;">
              <label for="walletSendAmountInput" style="font-size:11px;opacity:.8;">Amount</label>
              <input id="walletSendAmountInput" type="number" min="0" step="0.000001" placeholder="0.0" style="
                margin-top:4px;
                width:100%;
                padding:8px 9px;
                border-radius:10px;
                border:1px solid rgba(148,163,184,.7);
                background:rgba(15,23,42,1);
                color:#fff;
                font-size:12px;
              " />
            </div>
            <div style="width:110px;">
              <label for="walletSendTokenSelect" style="font-size:11px;opacity:.8;">Token</label>
              <select id="walletSendTokenSelect" style="
                margin-top:4px;
                width:100%;
                padding:8px 9px;
                border-radius:10px;
                border:1px solid rgba(148,163,184,.7);
                background:rgba(15,23,42,1);
                color:#fff;
                font-size:12px;
              ">
                <option value="SOL">SOL</option>
                <option value="CBS">CBS</option>
                <option value="SPL">Other SPL</option>
              </select>
            </div>
          </div>

          <button id="walletSendBtn" type="button" style="
            margin-top:4px;
            padding:8px 14px;
            border-radius:999px;
            border:1px solid rgba(148,163,184,.9);
            background:rgba(31,41,55,1);
            color:#e5e7eb;
            font-size:12px;
            font-weight:700;
            cursor:not-allowed;
            opacity:.7;
          ">
            Send (disabled in test mode)
          </button>

          <div id="walletSendMsg" style="font-size:11px;opacity:.85;margin-top:2px;">
            On-chain sending will be enabled later once Web3 integration is live.
          </div>
        </div>
      </div>

      <!-- Private key (met waarschuwing + bolletjes) -->
      <div style="
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(239,68,68,.8);
        background:rgba(24,24,27,1);
      ">
        <div style="font-size:13px;font-weight:600;margin-bottom:4px;color:#fecaca;">
          Private key (advanced)
        </div>
        <div style="font-size:11px;opacity:.85;margin-bottom:8px;color:#fecaca;">
          ⚠️ This private key controls all funds in this wallet. Never share it with anyone.
          Anyone with this key can move your tokens.
        </div>

        <div id="walletSecretMasked" style="
          font-size:12px;
          padding:6px 8px;
          border-radius:10px;
          border:1px dashed rgba(248,250,252,.35);
          background:rgba(15,23,42,1);
          font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          letter-spacing:3px;
          margin-bottom:6px;
          color:#9ca3af;
        ">
          ${n}
        </div>

        <div id="walletSecretRealWrap" style="
          display:none;
          margin-bottom:6px;
        ">
          <div style="
            font-size:11px;
            opacity:.9;
            margin-bottom:4px;
            color:#fee2e2;
          ">
            This is your actual Base58 private key:
          </div>
          <div id="walletSecretReal" style="
            font-size:11px;
            padding:6px 8px;
            border-radius:10px;
            border:1px solid rgba(248,250,252,.6);
            background:rgba(15,23,42,1);
            font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
            word-break:break-all;
            color:#f9fafb;
          "></div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">
          <button id="walletRevealSecretBtn" type="button" style="
            padding:7px 11px;
            border-radius:999px;
            border:1px solid rgba(239,68,68,.9);
            background:rgba(127,29,29,1);
            color:#fee2e2;
            font-size:12px;
            font-weight:700;
            cursor:pointer;
          ">
            Reveal private key
          </button>
          <button id="walletCopySecretBtn" type="button" style="
            padding:7px 11px;
            border-radius:999px;
            border:1px solid rgba(248,250,252,.6);
            background:rgba(15,23,42,1);
            color:#e5e7eb;
            font-size:11px;
            font-weight:600;
            cursor:pointer;
          " disabled>
            Copy private key
          </button>
        </div>

        <div id="walletSecretMsg" style="font-size:11px;opacity:.9;margin-top:4px;color:#fee2e2;"></div>
      </div>
    </section>
  `}function Da(){const t=document.querySelector("#walletCopyAddressBtn"),n=document.querySelector("#walletSendBtn"),r=document.querySelector("#walletSendMsg"),l=document.querySelector("#walletSecretMasked"),c=document.querySelector("#walletSecretRealWrap"),d=document.querySelector("#walletSecretReal"),u=document.querySelector("#walletRevealSecretBtn"),p=document.querySelector("#walletCopySecretBtn"),m=document.querySelector("#walletSecretMsg"),x=g=>{m&&(m.textContent=g||"")};t&&(t.onclick=async()=>{try{const g=hn();navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(g),r&&(r.textContent="✅ Address copied.")):r&&(r.textContent="📋 Copy not supported in this browser.")}catch(g){console.warn("CBS GO: copy wallet address failed",g),r&&(r.textContent="⛔ Failed to copy address.")}}),n&&(n.onclick=()=>{r&&(r.textContent="On-chain sending is disabled in this test build. Later this will connect to Solana.")}),u&&l&&c&&d&&(u.onclick=()=>{if(window.confirm(`This will show your private key on screen.

Only continue if you are in a safe place and will store it securely. Never share it with anyone.

Show private key?`))try{const y=vo();d.textContent=y,c.style.display="block",l.style.opacity="0.25",u.disabled=!0,u.textContent="Private key visible",p&&(p.disabled=!1),x("⚠️ Private key is now visible. Do not share it. You can import this into Phantom as a private key wallet.")}catch(y){console.warn("CBS GO: reveal secret failed",y),x("⛔ Could not load private key.")}}),p&&(p.onclick=async()=>{try{const g=vo();navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(g),x("✅ Private key copied. Store it securely and never share it.")):x("📋 Copy not supported in this browser.")}catch(g){console.warn("CBS GO: copy private key failed",g),x("⛔ Failed to copy private key.")}})}function lr(){const t=wn();return t==="profile"?Fn("Profile",`<div id="profileMount">${ja()}</div>`):t==="bag"?Fn("Bag",`<div id="bagMount">${Wa()}</div>`):t==="wallet"?Fn("Solana Wallet",`<div id="walletMount">${Ga()}</div>`):""}function qa(){return`
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
          ${jo()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Fo()}
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
        ${lr()}
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

      ${Wo()?`<button id="resetBtn" type="button" style="
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
  `}function xt(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=lr();const n=wn();n==="profile"&&Fa(),n==="bag"&&Ua(),n==="wallet"&&Da();const r=document.querySelector("#cbsgoClosePanel");r&&r.addEventListener("click",()=>{pn("map"),xt()})}function Ya(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),r=wn();pn(r===n?"map":n||"map"),xt()})})}function ko(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:r="received",fromNickname:l,fromAvatar:c,toWallet:d,tickets:u=0,cbs:p=0,cardId:m=null,cardQty:x=0}=t||{};if(!u&&!p&&!(m&&x))return;n.innerHTML="";const g=document.createElement("div");g.style.position="fixed",g.style.inset="0",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.background="rgba(5,7,11,0.78)",g.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=yt(),I=r==="sent"?"Gift sent":"You received a gift",P=[];u&&P.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&P.push(`🪙 ${p} CBS`),m&&x&&P.push(`🃏 ${x} card${x===1?"":"s"}`);const A=r==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${Ce(_)}</b> to <span style="opacity:.9;">${Ce(d||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${Ce(l||"Friend")}</b>
        </div>
      `,T=r==="sent"?`
        <div style="
          width:40px;height:40px;border-radius:999px;
          border:1px solid rgba(148,163,184,.5);
          background:rgba(15,23,42,.9);
          display:flex;align-items:center;justify-content:center;
          font-size:20px;
        ">
          📤
        </div>
      `:oo(c||"",40);y.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${T}
      <div>
        <div style="font-size:15px;font-weight:800;">${Ce(I)}</div>
        ${A}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${Ce(P.join(" · "))}
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
  `,g.appendChild(y),n.appendChild(g),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const V=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},U=document.getElementById("cbsgoTradePopupCloseBtn");U&&(U.onclick=V),g.addEventListener("click",pe=>{pe.target===g&&V()})}function Co(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=qa();try{rr(),Ia()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{an()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Ya(),Yi(),li(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Fo())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=jo())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{wn()==="bag"&&xt()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function r(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let m=p.querySelector(".cbsgoToastBox");m||(m=document.createElement("div"),m.className="cbsgoToastBox",m.style.pointerEvents="auto",m.style.padding="8px 12px",m.style.borderRadius="999px",m.style.border="1px solid rgba(255,255,255,.25)",m.style.background="rgba(10,12,18,.88)",m.style.backdropFilter="blur(10px)",m.style.color="#fff",m.style.fontFamily="system-ui,sans-serif",m.style.fontSize="11px",m.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",m.style.opacity="0",m.style.transform="translateY(10px)",m.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(m)),m.textContent=u||"",m.style.opacity="1",m.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{m.style.opacity="0",m.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},m=Number(p.xp||0),x=Number(p.tickets||0),g=Number(p.cbs||0);if(!m&&!x&&!g)return;const y=[];m&&y.push(`+${m} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),g&&y.push(`+${g} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),r(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const m=Number(u?.steps||0),x=Number(u?.goal||0),g=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const I=x?`${m}/${x} steps`:`${m} steps`;_.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${g?` (${g})`:""}.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#7dd3fc;
      ">
        ${I}
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const P=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=P),y.addEventListener("click",T=>{T.target===y&&P()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const m=Number(u?.xp||0),x=Number(u?.tickets||0),g=Number(u?.cbs||0);if(!m&&!x&&!g)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const I=[];m&&I.push(`+${m} XP`),x&&I.push(`+${x} ticket${x===1?"":"s"}`),g&&I.push(`+${g} CBS`),_.innerHTML=`
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
        ${Ce(I.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function d(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const m=Number(u?.days||7),x=Number(u?.rewardCbs||0),g=document.createElement("div");g.style.position="fixed",g.style.inset="0",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.background="rgba(5,7,11,0.80)",g.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(340px, 92vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(251,191,36,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",y.style.padding="20px 18px 16px 18px",y.style.textAlign="center",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",y.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${m}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${m} days in a row.
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
    `,g.appendChild(y),p.appendChild(g),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},I=document.getElementById("cbsgoStreakCloseBtn");I&&(I.onclick=_),g.addEventListener("click",P=>{P.target===g&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{d(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{ko(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{},m=p.cardId||null,x=Number(p.cardQty||0);if(m&&x>0){const g=Gt(),_=Number(g[m]||0)+x;g[m]=_,sr(g),Hn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...g}}}))}ko({direction:"received",fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0})})),xt(),Wo()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ci)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Un({id:"__daily__",name:"Daily Glow"});return}if(Bo(p))return;const m=_r.find(x=>x.id===p);m&&Un(m)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&mr(async()=>{const{completeNode:m}=await Promise.resolve().then(()=>Cr);return{completeNode:m}},void 0).then(({completeNode:m})=>{m(p),cr()})})),ir().catch(()=>{})}function cr(){if(!document.querySelector("#app"))return;if(Vo()&&fa()){Co();return}ba();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),Co()};window.addEventListener("cbsgo:loginDone",n)}function dr(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function un(t){const n=dr();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";un(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{un(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function Eo(){try{if(!document.getElementById("app")){un("❌ #app not found in index.html");return}cr();const n=dr();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){un(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Eo,{once:!0}):Eo();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
