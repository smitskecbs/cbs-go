import{createClient as yo}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(c){if(c.ep)return;c.ep=!0;const d=o(c);fetch(c.href,d)}})();const go="modulepreload",bo=function(t){return"/cbs-go/"+t},cr={},ho=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let h=function(x){return Promise.all(x.map(b=>Promise.resolve(b).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=h(o.map(x=>{if(x=bo(x),x in cr)return;cr[x]=!0;const b=x.endsWith(".css"),y=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=b?"stylesheet":go,b||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),b)return new Promise((I,P)=>{_.addEventListener("load",I),_.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${x}`)))})}))}function d(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&d(p.reason);return n().catch(d)})},jn="cbsgoLevelUpOverlay",dr="cbsgoLevelUpStyles",Bn="https://smitskecbs.github.io/cbs-go/";function mo(){if(document.getElementById(dr))return;const t=document.createElement("style");t.id=dr,t.textContent=`
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
  `,document.head.appendChild(t)}function zn(){const t=document.getElementById(jn);t&&t.remove()}function wo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const d=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${d}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function fr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function vo(t){mo(),zn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=jn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&wo(c);const d=()=>zn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),h=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),b=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=d),p&&(p.onclick=d),h&&(h.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Bn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Bn),b&&(b.textContent="✅ Link copied. Share it with your friends.")}catch{b&&(b.textContent="Could not copy link. You can share it manually: "+Bn)}}),setTimeout(()=>{document.getElementById(jn)&&zn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{vo(t?.detail||{})}));const _o=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Er="cbsgo_state_v6";function So(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function ko(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ft(){const t=localStorage.getItem(Er);return So(t,ko())}function Mr(t){t.updatedAt=Date.now(),localStorage.setItem(Er,JSON.stringify(t))}function Kn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function un(){return Number(Ft().xp||0)}function Ut(){const t=un();let n=1,o=t;for(;;){const l=Kn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function Lr(){const t=un();let n=1,o=t;for(;;){const l=Kn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function Ar(){return Kn(Ut())}function Dt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ft();const o=Ut(),l=Ft();l.xp=Number(l.xp||0)+n,Mr(l);const c=Ut();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function Br(t){const n=String(t||"");if(!n)return!1;const o=Ft();return!!(o.completed&&o.completed[n])}function zr(t){const n=String(t||"");if(!n)return;const o=Ft();o.completed||(o.completed={}),o.completed[n]=Date.now(),Mr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const Co=Object.freeze(Object.defineProperty({__proto__:null,addXp:Dt,completeNode:zr,getLevel:Ut,getXp:un,getXpIntoLevel:Lr,getXpNeededThisLevel:Ar,isNodeCompleted:Br},Symbol.toStringTag,{value:"Module"})),Nr="cbsgoPuzzleModal";function Eo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nn(){const t=document.getElementById(Nr);t&&t.remove()}function Rn(t){Nn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],d=180,u=18,p=l.length,h=.01;let x=[],b=null,y=0,_=u,I=!1,P=!1,A=null;const T=t?.name||"CBS GO Puzzle",V=document.createElement("div");V.id=Nr,V.style.position="fixed",V.style.inset="0",V.style.zIndex="999999",V.style.display="flex",V.style.alignItems="center",V.style.justifyContent="center",V.style.padding="16px",V.style.background="rgba(0,0,0,.70)",V.style.backdropFilter="blur(12px)",V.style.fontFamily="system-ui, sans-serif",V.style.color="#fff",V.innerHTML=`
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
          ${Eo(T)}
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
  `,document.body.appendChild(V);const ce=document.getElementById("cbsgoBoard"),me=document.getElementById("cbsgoScore"),pe=document.getElementById("cbsgoMoves"),ne=document.getElementById("cbsgoStatus"),H=document.getElementById("cbsgoPuzzleClose"),Ue=document.getElementById("cbsgoPuzzleOk"),Ne=document.getElementById("cbsgoConfettiLayer");function ye(F){ne&&(ne.textContent=F||"")}function Ye(){if(!Ne)return;Ne.style.display="block",Ne.innerHTML="";const F=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],D=40;for(let Y=0;Y<D;Y++){const j=document.createElement("div"),te=6+Math.floor(Math.random()*6),_e=Math.random()*100,Me=Math.random()*.6,Le=1+Math.random()*.6,ht=Math.random()*360;j.style.position="absolute",j.style.top="-10%",j.style.left=`${_e}%`,j.style.width=`${te}px`,j.style.height=`${te*2}px`,j.style.background=F[Y%F.length],j.style.opacity="0.9",j.style.borderRadius="2px",j.style.transform=`rotate(${ht}deg)`,j.style.animation=`cbsgoConfettiFall ${Le}s ease-out ${Me}s forwards`,Ne.appendChild(j)}}function ze(){return Math.floor(Math.random()*l.length)}function De(){x=[];for(let F=0;F<n;F++){const D=[];for(let Y=0;Y<o;Y++)Math.random()<h?D.push(p):D.push(ze());x.push(D)}}function je(F){return F===p}function ve(){if(ce){ce.innerHTML="";for(let F=0;F<n;F++)for(let D=0;D<o;D++){const Y=x[F][D],j=document.createElement("div");j.dataset.row=String(F),j.dataset.col=String(D),j.style.borderRadius="12px",j.style.display="flex",j.style.alignItems="center",j.style.justifyContent="center",j.style.cursor=P?"default":"pointer",j.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",j.style.fontSize="20px",je(Y)?(j.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",j.textContent="💥"):(j.style.background=l[Y]||"#444",j.textContent=c[Y]||"⬛"),b&&b.row===F&&b.col===D&&(j.style.outline="2px solid #fff",j.style.outlineOffset="2px"),j.addEventListener("click",()=>{Fe(F,D)}),j.addEventListener("touchstart",te=>{if(P)return;const _e=te.touches[0];A={row:F,col:D,x:_e.clientX,y:_e.clientY}}),j.addEventListener("touchend",te=>{if(!A||P)return;const _e=te.changedTouches[0],Me=_e.clientX-A.x,Le=_e.clientY-A.y;if(Math.sqrt(Me*Me+Le*Le)<18){Fe(F,D),A=null;return}let Ve=A.row,ot=A.col;Math.abs(Me)>Math.abs(Le)?Me>0?ot+=1:ot-=1:Le>0?Ve+=1:Ve-=1,Ve>=0&&Ve<n&&ot>=0&&ot<o&&Re(A.row,A.col,Ve,ot),A=null,te.preventDefault()}),ce.appendChild(j)}}}function He(F,D){if(!F||!D)return!1;const Y=Math.abs(F.row-D.row),j=Math.abs(F.col-D.col);return Y+j===1}function Pe(F,D){const Y=x[F.row][F.col];x[F.row][F.col]=x[D.row][D.col],x[D.row][D.col]=Y}function gt(){const F=new Set;for(let D=0;D<n;D++){let Y=x[D][0],j=0;for(let te=1;te<=o;te++){const _e=te<o?x[D][te]:null;if(_e===Y)continue;const Me=te-j;if(Y!=null&&Me>=3)for(let Le=j;Le<te;Le++)F.add(`${D},${Le}`);Y=_e,j=te}}for(let D=0;D<o;D++){let Y=x[0][D],j=0;for(let te=1;te<=n;te++){const _e=te<n?x[te][D]:null;if(_e===Y)continue;const Me=te-j;if(Y!=null&&Me>=3)for(let Le=j;Le<te;Le++)F.add(`${Le},${D}`);Y=_e,j=te}}return F}function Ze(F){if(!F||!F.size)return 0;const D=F.size;y+=D*4,me&&(me.textContent=String(y)),!P&&y>=d&&bt(!0);for(const Y of F){const[j,te]=Y.split(","),_e=Number(j),Me=Number(te);x[_e][Me]=null}for(let Y=0;Y<o;Y++){let j=n-1;for(let te=n-1;te>=0;te--)x[te][Y]!=null&&(x[j][Y]=x[te][Y],j--);for(let te=j;te>=0;te--)Math.random()<h?x[te][Y]=p:x[te][Y]=ze()}return D}function rt(F,D){const Y=new Set;for(let j=0;j<o;j++)Y.add(`${F},${j}`);for(let j=0;j<n;j++)Y.add(`${j},${D}`);Ze(Y),ve(),P||setTimeout(()=>Bt(!1),120)}function Bt(F=!1){if(P)return;I=!0;const D=()=>{if(P){I=!0;return}const Y=gt();if(!Y.size){I=!1,ve(),F&&!P&&(_<=0?Qe():ye("Nice! Keep matching."));return}Ze(Y),ve(),setTimeout(D,120)};D()}function bt(F){if(!P)if(P=!0,I=!0,F){ye("Great job! Puzzle completed 🎉");try{t?.id&&zr(t.id),Dt(10)}catch{}Ye(),setTimeout(()=>{Nn()},1600)}else ye("Out of moves. Try again next time 🙂")}function Qe(){y>=d?bt(!0):_<=0&&bt(!1)}function Re(F,D,Y,j){if(I||P)return;if(_<=0){Qe();return}const te={row:F,col:D},_e={row:Y,col:j};if(!He(te,_e))return;const Me=x[F][D],Le=x[Y][j],ht=je(Me)||je(Le);if(Pe(te,_e),b=null,_--,pe&&(pe.textContent=String(_)),ht){ve();const Ve=je(x[F][D])?{row:F,col:D}:{row:Y,col:j};rt(Ve.row,Ve.col),Qe();return}if(!gt().size){Pe(te,_e),ve(),ye("No match… try another swap."),Qe();return}ye(""),ve(),Bt(!0)}function Fe(F,D){if(I||P)return;if(_<=0){Qe();return}const Y={row:F,col:D};if(!b){b=Y,ve();return}if(b.row===F&&b.col===D){b=null,ve();return}if(!He(b,Y)){b=Y,ve();return}Re(b.row,b.col,Y.row,Y.col)}function fe(){Nn()}H&&(H.onclick=fe),Ue&&(Ue.onclick=()=>{fe()}),De(),ve(),ye("Tap or swipe two neighboring tiles to swap them.")}const Tr="cbsgo_inventory_v2";function Mo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Lo(){return{tickets:0,cbs:0,cards:{}}}function ut(){const t=localStorage.getItem(Tr),n=Mo(t,Lo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Hn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Tr,JSON.stringify(n))}function Jt(){return Number(ut().tickets||0)}function en(){return Number(ut().cbs||0)}function At(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return ut();const o=ut();let c=Number(o.tickets||0)+n;return c<0&&(c=0),o.tickets=c,Hn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function xn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return ut();const o=ut();let c=Number(o.cbs||0)+n;return c<0&&(c=0),o.cbs=c,Hn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const Ir="cbsgo_steps_v6",Ao="cbsgo_steps_v5",Bo="cbsgo_gps_autostart_v2",$r="cbsgo_daily_puzzle_v1",zo=.75,Et=5e3,sn=7,Fn=100,No=1e3,To=.5,Io=2e3,$o=4.5,Tn=1500,In=200,Po=.25,Oo=.05,jo=.3;let tn=null,nn=!1,vt={msg:"init"};function Un(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Pr="cbsgo_cards_v1",Ro=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Fo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Uo(t){return Ro.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Go(){try{const t=localStorage.getItem(Pr),n=Un(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const d=Number(c.count);Number.isFinite(d)&&d>0&&(o[l]=d)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Wo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,d]of Object.entries(n)){const u=Number(d||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Pr,JSON.stringify(l))}catch{}}function Do(t,n=1){const o=Fo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const d={...Go().counts||{}},p=Number(d[o]||0)+l;d[o]=p,Wo({counts:d});const h=Uo(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:d}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:h}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:h}}))}catch{}return{cardId:o,count:p,card:h}}function lt(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Yo(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,d=new Date(o,l-1,c);return Number.isNaN(d.getTime())?null:d}function qo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Or(t,n){const o=Yo(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const d=new Date(o.getTime());d.setDate(d.getDate()-c),l.push(qo(d))}return l}function ln(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:lt(),daySteps:0,dayMeters:0,dailyGoalSteps:Et,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Ko(t){const n=lt();return!t||typeof t!="object"?ln():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Et),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Et),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function yn(t){t.updatedAt=Date.now(),localStorage.setItem(Ir,JSON.stringify(t))}function Ho(t,n){if(!n)return;const o=Or(n,sn);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(xn(Fn),Yt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:sn,rewardCbs:Fn,lastDayKey:n}})))}function pr(t){t=Ko(t||ln());const n=lt();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Ho(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,yn(t)}return t}function xt(){let t=localStorage.getItem(Ir);if(!t){const o=localStorage.getItem(Ao);if(o){const l=Un(o,ln()),c=pr(l);return yn(c),c}}const n=Un(t,ln());return pr(n)}function rn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Vo()}}))}function Vn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Yt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Xn(t,n,o,l){const c=Number(t||0),d=Number(n||0),u=0;if(!(!c&&!d&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:d,cbs:u,reason:l||"distance"}}))}catch{}}function Vo(){const t=xt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Xo(){const t=xt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Zo(){return Xo()/1e3}function Qo(){const t=xt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||Et),l=!!t.dailyGoalReached,c=t.dayKey||lt(),d=t.streak||{},p=Or(c,sn).map(h=>{let x=!1;return h===c?x=l:x=!!d[h],{dateKey:h,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:sn,rewardPerStreak:Fn}}function ur(){return!!nn}function Jo(){try{return localStorage.getItem($r)===lt()}catch{return!1}}function ei(){try{localStorage.setItem($r,lt())}catch{}}function ti(t,n){return Jo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:lt()}})),ei(),!0)}function xr(){const t=xt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function ni(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<Tn)return;const d=Math.floor(c/Tn);d<=0||(At(d),Yt(),Xn(0,d,0,"boost"),t.boostLastStep=o+d*Tn)}function ri(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<In){t.chestMeters=n;return}let o=0;for(;n>=In&&o<5;)if(n-=In,o+=1,Math.random()<Po){const l=Math.random()<Oo,c=l?10:3,d=l?2:1;Dt(c),Vn(),At(d),Yt();const u=l&&Math.random()<jo;Xn(c,d,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:d,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function oi(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),h=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(h))}function ii(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),d=Number(t.xpKmAwarded||0);if(c>d){const x=c-d;x>0&&(Dt(x),Vn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),h=Number(t.ticketChunksAwarded||0);if(p>h){const x=p-h;x>0&&(At(x),Yt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Xn(o,l,0,"distance")}function ai(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return xt();const o=xt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/zo);if(c>l){const d=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+d}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||Et)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||lt(),steps:o.daySteps,goal:o.dailyGoalSteps||Et}}))),ii(o),ni(o),ri(o),yn(o),rn(),o}function si(){tn!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(tn),tn=null}async function yr(t={}){const n=!!t.silent;if(!navigator.geolocation)return vt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Bo,"1")}catch{}si(),nn=!0,vt={msg:"requesting",t:Date.now()};try{return tn=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,d=o.coords.accuracy||999,u=Date.now(),p=xt(),h=p.lastPos;p.lastPos={lat:l,lng:c,t:u},yn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,b=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:d,heading:x,speed:b,t:u}})),d>No){vt={lat:l,lng:c,acc:d,t:u,reason:"accuracy",boostMs:xr()},rn();return}ti(l,c);let y=0,_=0,I=0,P=0,A="no-last";h&&typeof h.lat=="number"&&typeof h.lng=="number"&&typeof h.t=="number"&&(y=oi({lat:h.lat,lng:h.lng},{lat:l,lng:c}),_=Math.max(1,(u-h.t)/1e3),I=y/_,y<To?A="jitter":y>Io?A="teleport":I>$o?A="too-fast":(ai(y),P=y,A="ok")),vt={lat:l,lng:c,acc:d,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite(I)?Number(I.toFixed(2)):0,added:Math.round(P),reason:A,boostMs:xr()},rn()},o=>{nn=!1,vt={err:o?.message||"GPS blocked",t:Date.now()},rn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return nn=!1,vt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function li(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ur()||await yr({silent:!0}))();const n=async()=>{ur()||await yr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Dt(o),Vn()),(l>0||c>0)&&(l>0&&At(l),c>0&&xn(c),Yt());const d=n.cardId||n.card_id;if(d)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Do(d,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function jr(){const t=un(),n=Ut(),o=Lr(),l=Ar(),c=Zo(),d=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function Rr(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:d}=Qo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function Fr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ci(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Ur="cbsgo_player_name_v2",Zn="cbsgo_player_avatar_v2";function yt(){try{return localStorage.getItem(Ur)||"Sovereign"}catch{return"Sovereign"}}function Gr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Ur,n)}catch{}return n}function gn(){try{return localStorage.getItem(Zn)||""}catch{return""}}function di(t){const n=String(t||"");try{localStorage.setItem(Zn,n)}catch{}return n}function fi(){try{localStorage.removeItem(Zn)}catch{}}let K=null,it=null,at=null,$t=null,Ot=null,Ke=null,Oe=null,_t=0,ft=!1,nt=!0,qe=null;const et=new Map;let tt=!0,jt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const pi="48a387bba00043ac4ba5823371abc9d2",Gt=80,ui=6,xi=80,yi=220,gi=6e4,bi=5*6e4,hi=300,mi=.35,$n=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],wi=350,vi=.35,_i=120;let cn=0,St=0,on=null,Gn=!1,Ct=[];function pt(t){return document.getElementById(t)}function kt(t){const n=pt("cbsgoMapHost");if(!n)return;let o=pt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function Si(){const t=String(yt()||"").trim();return t?t[0].toUpperCase():"🙂"}function Wn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Mt(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),h=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(h))}function Wr(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,d=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+d,lng:t.lng+u}}function ki(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),d=o(n.lng-t.lng),u=Math.sin(d)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(d);let h=Math.atan2(u,p);return h=h*180/Math.PI,h=(h+360)%360,h}function Ci(t,n,o){const c=n/6371e3,d=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,h=Math.sin(u),x=Math.cos(u),b=Math.sin(c),y=Math.cos(c),_=Math.asin(h*y+x*b*Math.cos(d)),I=p+Math.atan2(Math.sin(d)*b*x,y-h*Math.sin(_));return[_*180/Math.PI,I*180/Math.PI]}function Ei(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Dr(){const{temp:t,iconEmoji:n}=jt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Yr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;Ei();const{condition:n,isNight:o}=jt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const d=[];for(let u=0;u<96;u++){const p=Math.random()*100,h=Math.random()*16-8,x=Math.random()*2.5,b=2+Math.random()*1.5;d.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+h}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${b}s;
          "
        ></div>
      `)}l=d.join("")}else if(n==="snow"){const d=[];for(let u=0;u<80;u++){const p=Math.random()*100,h=Math.random()*20-10,x=Math.random()*4,b=6+Math.random()*4;d.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+h}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${b}s;
          "
        ></div>
      `)}l=d.join("")}else l="";t.innerHTML=l}async function Mi(t,n){const o=Date.now();if(!(jt.lastUpdated&&o-jt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${pi}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const d=await c.json(),u=d?.main?.temp,p=d?.weather?.[0]?.icon||"01d",h=String(d?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),b="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(b="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(b="🌧️",y="rain"):p.startsWith("11")?(b="⛈️",y="storm"):p.startsWith("13")?(b="❄️",y="snow"):p.startsWith("50")&&(b="🌫️",y="mist"),h.includes("rain")&&(y="rain"),h.includes("snow")&&(y="snow"),h.includes("thunder")&&(y="storm");try{const I=Number(d?.dt||0),P=Number(d?.timezone||0);if(I&&Number.isFinite(P)){const T=((I+P)/3600%24+24)%24;x=T<7||T>=19}}catch{}y==="clear"?b=x?"🌙":"☀️":y==="clouds"?b="☁️":y==="rain"?b="🌧️":y==="storm"?b="⛈️":y==="snow"?b="❄️":y==="mist"&&(b="🌫️"),jt={temp:u,iconEmoji:b,condition:y,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Dr()),Yr()}catch(l){console.warn("Weather fetch failed",l)}}function Li(t){const n=gn();if(n){const c=`
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
    ">${Wn(Si())}</div>
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Ai(t,n,o,l){if(!l&&o){const p=`
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
  `;return t.divIcon({html:d,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function Bi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function zi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Ni(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Ti(){if(!$n.length)return null;const t=Math.floor(Math.random()*$n.length);return $n[t]}function Ii(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let d=null,u=0;if(Math.random()<mi){const p=Ti();p&&(d=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:d,cardCount:u}}function $i(t){if(!K||!Ke||!t)return;const n=Date.now();if(n-cn<gi||Ke.getLayers().length>=ui)return;const l=window.L;if(!l)return;const c=Ni(),d=Ii(c),u=Wr(t,xi,yi),p=Bi(l),h=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),b={marker:h,createdAt:n,lat:u.lat,lng:u.lng,reward:d};Ct.push(b),h.on("click",()=>{if(!Oe){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:Oe[0],lng:Oe[1]},_={lat:u.lat,lng:u.lng},I=Mt(y,_);if(I>Gt){alert(`Too far to open this gift.

Distance: ${Math.round(I)}m
Needed: ≤ ${Gt}m`);return}Ke.removeLayer(h),Ct=Ct.filter(H=>H.marker!==h);const{xp:P,tickets:A,cbs:T,cardId:V,cardCount:ce}=d,me=[];P&&me.push(`+${P} XP`),A&&me.push(`+${A} ticket${A===1?"":"s"}`),T&&me.push(`+${T} CBS`),V&&ce>0&&me.push(`+${ce} card${ce===1?"":"s"}`);const pe=me.length?me.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${pe}`);const ne={kind:"mystery",xp:P||0,tickets:A||0,cbs:T||0,cardId:V||null,cardCount:ce||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:ne}))}catch{}}),h.addTo(Ke),cn=n}function Pi(t){if(!K||!Ke||!t)return;const n=Date.now();let o=0;Ct=Ct.filter(l=>{if(!l||!l.marker||!Ke.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>bi)return Ke.removeLayer(l.marker),o+=1,!1;const d=Mt({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(d)&&d>hi?(Ke.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Ke.getLayers().length===0&&(cn=0)}function Oi(t){if(!K||!Ot||!t||on)return;const n=window.L;if(!n)return;if(Gn){if(St<wi||Math.random()>vi)return;St=0}else{if(St<_i)return;St=0,Gn=!0}const o=Wr(t,60,140),l=zi(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!Oe){alert("GPS not ready yet. Wait until your player marker appears.");return}const d={lat:Oe[0],lng:Oe[1]},u={lat:o.lat,lng:o.lng},p=Mt(d,u);if(p>Gt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Gt}m`);return}Ot.removeLayer(c),on=null,Rn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(Ot),on=c}function ji(t){const n=window.L;if(!n||!K||!t)return;const o=Gt;$t?($t.setLatLng(t),$t.setRadius(o)):$t=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(K)}function Ri(t){const n=window.L;if(!n||!K)return;const o=Li(n);if(it?(it.setIcon(o),it.setLatLng(t)):(it=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(K),K.setView(t,19)),at?(at.setIcon(gr(n,_t)),at.setLatLng(t)):at=n.marker(t,{icon:gr(n,_t),interactive:!1,pane:"cbsgo-player-pane"}).addTo(K),it&&it.bringToFront&&it.bringToFront(),at&&at.bringToFront&&at.bringToFront(),ji(t),nt&&!ft&&K)try{const l=K.getZoom()||19;let c=t;Number.isFinite(_t)&&(c=Ci(t,40,_t));const d=K.getCenter(),u=Mt({lat:d.lat,lng:d.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&K.setView(c,l)}catch{}}function qr(){const t=window.L;return!t||!K?null:(qe?(tt&&!K.hasLayer(qe)&&qe.addTo(K),!tt&&K.hasLayer(qe)&&K.removeLayer(qe)):(qe=t.layerGroup(),tt&&qe.addTo(K)),qe)}function Fi(t){if(!Array.isArray(t)||!K)return[];const n=K.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(d=>{if(!d||d.isMe||typeof d.lat!="number"||typeof d.lng!="number")return;const u=Math.round(d.lat*o)/o,p=Math.round(d.lng*o)/o,h=`${u}_${p}`;l.has(h)||l.set(h,[]),l.get(h).push(d)});const c=[];for(const[d,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||d,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,h=0;u.forEach(y=>{p+=y.lat,h+=y.lng});const x=p/u.length,b=h/u.length;c.push({id:`cluster_${d}`,lat:x,lng:b,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Ui(t){const n=window.L;if(!n||!K)return;const o=qr();if(!o)return;if(!tt){for(const[d,u]of et.entries())o.removeLayer(u),et.delete(d);return}const l=Fi(t),c=new Set;l.forEach(d=>{if(!d||typeof d.lat!="number"||typeof d.lng!="number")return;const u=d.id||`${d.lat},${d.lng}`;c.add(u);const p=[d.lat,d.lng];let h=et.get(u);if(h)h.setLatLng(p);else{const x=d.isCluster&&d.count>1?String(d.count):d.nickname||"Anon",b=Ai(n,x,d.avatar,d.isCluster);h=n.marker(p,{icon:b,pane:"cbsgo-others-pane"});const y=d.isCluster&&d.count>1?`${d.count} CBS-GO explorers nearby`:`${d.nickname||"CBS-GO explorer"}`;h.bindPopup(y),h.addTo(o),et.set(u,h)}});for(const[d,u]of et.entries())c.has(d)||(o.removeLayer(u),et.delete(d))}function Gi(){return`
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
  `}function Wi(){try{K&&K.remove()}catch{}K=null,it=null,at=null,$t=null,Ot=null,Ke=null,Oe=null,ft=!1,nt=!0,cn=0,St=0,on=null,Gn=!1,qe=null,et.clear(),Ct=[]}function Di(){const t=window.L,n=pt("cbsgoMap");if(!t||!n)return!1;Wi();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));K=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=K.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=K.createPane("cbsgo-others-pane");c.style.zIndex="640";const d=K.createPane("cbsgo-loot-pane");d.style.zIndex="630";const u=K.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(K),K.setMaxBounds(o),K.setView([51.687,4.87],16),Ot=t.layerGroup().addTo(K),Ke=t.layerGroup().addTo(K),K.on("dragstart",()=>{nt=!1}),K.on("zoomstart",()=>{nt=!1}),!0}function Yi(){!navigator.geolocation||!K||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,d={lat:n,lng:o},u=Oe?{lat:Oe[0],lng:Oe[1]}:null;if(Oe=[n,o],Number.isFinite(c))_t=c;else if(u){const p=Mt(u,d);Number.isFinite(p)&&p>2&&(_t=ki(u,d))}if(Ri([n,o]),u){const p=Mt(u,d);if(Number.isFinite(p)&&p>1&&(St+=p),Number.isFinite(p)&&p>20&&!nt&&!ft&&K){nt=!0;const h=K.getZoom()||19;K.setView([n,o],h)}}Oi(d),$i(d),Pi(d),Mi(n,o),kt(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{kt(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function qi(){let t=0;const n=120,o=()=>{if(t++,!pt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(kt("Loading map engine…"),t<n)return setTimeout(o,100);kt("Map engine failed (Leaflet not found). Refresh.");return}if(!Di()){kt("Could not init map. Refresh.");return}const c=pt("cbsgoCenterBtn");c&&(c.onclick=()=>{K&&Oe&&(nt=!0,ft=!1,K.setView(Oe,19))});const d=pt("cbsgoCompassBtn");d&&(d.onclick=()=>{K&&(ft=!ft,ft?(nt=!1,K.setView([51.687,4.87],3)):Oe&&(nt=!0,K.setView(Oe,16)))});const u=pt("cbsgoOnlineToggleBtn");if(u){const p=()=>{tt?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{tt=!tt;const h=qr();if(h&&K&&(tt?K.hasLayer(h)||h.addTo(K):K.hasLayer(h)&&K.removeLayer(h)),p(),!tt&&qe){for(const[x,b]of et.entries())qe.removeLayer(b);et.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const h=p?.detail?.players||[];Ui(h)})),Yr(),kt("Loading GPS…"),Yi()};o()}const Ki="cbsgo_cards_v1";function Hi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Qn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Jn(){const t=localStorage.getItem(Ki),n=Hi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function st(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Kr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Vi(){const t=Qn(),n=Jn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Xi(){const t=Qn(),n=Jn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),d=Number.isFinite(c)&&c>0,u=Kr(l.rarity),p=d?u:"rgba(31,41,55,.9)",h=d?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=d?l.emoji||"🃏":"❓",b=d?st(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=st(l.set||"Set"),_=d?`<div style="
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
          data-card-id="${st(l.id)}"
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
          ${_}
          <div style="
            font-size:${d?"26px":"28px"};
            margin-top:${d?"4px":"8px"};
            margin-bottom:4px;
          ">
            ${st(x)}
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
            ${b}
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
    `}function Zi(){const t=Vi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
  `}function Qi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const d=Qn(),u=new Map(d.map(x=>[x.id,x]));function p(x){const b=u.get(x);if(!b)return;const y=Jn(),_=Number(y[x]||0),I=Number.isFinite(_)&&_>0,P=I?b.emoji||"🃏":"❓",A=I?b.name||"Card":"Unknown card",T=b.set||"Set",V=b.rarity||"common",ce=Kr(V),me={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[V]||"Common",pe=document.createElement("div");pe.style.position="fixed",pe.style.inset="0",pe.style.display="flex",pe.style.alignItems="center",pe.style.justifyContent="center",pe.style.background="rgba(0,0,0,0.65)",pe.style.pointerEvents="auto",pe.style.zIndex="8600";const ne=document.createElement("div");ne.style.width="min(260px, 82vw)",ne.style.borderRadius="20px",ne.style.border=`1px solid ${ce}`,ne.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",ne.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",ne.style.padding="16px 14px 14px 14px",ne.style.textAlign="center",ne.style.color="#fff",ne.style.fontFamily="system-ui,sans-serif",ne.style.opacity="0",ne.style.transform="translateY(14px) scale(0.96)",ne.style.transition="opacity .2s ease-out, transform .2s ease-out";const H=I?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',Ue=I?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;ne.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${st(T)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${ce};
          font-size:10px;
        ">
          ${st(me)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${ce};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${st(P)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${st(A)}
      </div>

      ${H}
      ${Ue}

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
    `,pe.appendChild(ne),document.body.appendChild(pe),requestAnimationFrame(()=>{ne.style.opacity="1",ne.style.transform="translateY(0) scale(1)"});const Ne=()=>{ne.style.opacity="0",ne.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(pe)},200)},ye=ne.querySelector("#cbsgoCardPreviewCloseBtn");ye&&(ye.onclick=Ne),pe.addEventListener("click",Ye=>{Ye.target===pe&&Ne()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const b=x.getAttribute("data-card-id");b&&p(b)})})}function Ji(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function ea(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function ta(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Pn={exports:{}};const na={},ra=Object.freeze(Object.defineProperty({__proto__:null,default:na},Symbol.toStringTag,{value:"Module"})),oa=ea(ra);var br;function ia(){return br||(br=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),d=new Uint8Array(32);d[0]=9;var u=o(),p=o([1]),h=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),b=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),I=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function P(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var g,m=0;for(g=0;g<s;g++)m|=r[a+g]^i[e+g];return(1&m-1>>>8)-1}function T(r,a,i,e){return A(r,a,i,e,16)}function V(r,a,i,e){return A(r,a,i,e,32)}function ce(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,z=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ge=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,X=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,W=g,N=m,R=k,U=L,B=G,w=z,v=ge,E=$,S=X,C=Z,M=oe,q=re,ie=Q,se=ee,ae=J,f,de=0;de<20;de+=2)f=O+q|0,U^=f<<7|f>>>25,f=U+O|0,E^=f<<9|f>>>23,f=E+U|0,q^=f<<13|f>>>19,f=q+E|0,O^=f<<18|f>>>14,f=B+W|0,S^=f<<7|f>>>25,f=S+B|0,ie^=f<<9|f>>>23,f=ie+S|0,W^=f<<13|f>>>19,f=W+ie|0,B^=f<<18|f>>>14,f=C+w|0,se^=f<<7|f>>>25,f=se+C|0,N^=f<<9|f>>>23,f=N+se|0,w^=f<<13|f>>>19,f=w+N|0,C^=f<<18|f>>>14,f=ae+M|0,R^=f<<7|f>>>25,f=R+ae|0,v^=f<<9|f>>>23,f=v+R|0,M^=f<<13|f>>>19,f=M+v|0,ae^=f<<18|f>>>14,f=O+R|0,W^=f<<7|f>>>25,f=W+O|0,N^=f<<9|f>>>23,f=N+W|0,R^=f<<13|f>>>19,f=R+N|0,O^=f<<18|f>>>14,f=B+U|0,w^=f<<7|f>>>25,f=w+B|0,v^=f<<9|f>>>23,f=v+w|0,U^=f<<13|f>>>19,f=U+v|0,B^=f<<18|f>>>14,f=C+S|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=ae+se|0,q^=f<<7|f>>>25,f=q+ae|0,ie^=f<<9|f>>>23,f=ie+q|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;O=O+s|0,W=W+g|0,N=N+m|0,R=R+k|0,U=U+L|0,B=B+G|0,w=w+z|0,v=v+ge|0,E=E+$|0,S=S+X|0,C=C+Z|0,M=M+oe|0,q=q+re|0,ie=ie+Q|0,se=se+ee|0,ae=ae+J|0,r[0]=O>>>0&255,r[1]=O>>>8&255,r[2]=O>>>16&255,r[3]=O>>>24&255,r[4]=W>>>0&255,r[5]=W>>>8&255,r[6]=W>>>16&255,r[7]=W>>>24&255,r[8]=N>>>0&255,r[9]=N>>>8&255,r[10]=N>>>16&255,r[11]=N>>>24&255,r[12]=R>>>0&255,r[13]=R>>>8&255,r[14]=R>>>16&255,r[15]=R>>>24&255,r[16]=U>>>0&255,r[17]=U>>>8&255,r[18]=U>>>16&255,r[19]=U>>>24&255,r[20]=B>>>0&255,r[21]=B>>>8&255,r[22]=B>>>16&255,r[23]=B>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=q>>>0&255,r[49]=q>>>8&255,r[50]=q>>>16&255,r[51]=q>>>24&255,r[52]=ie>>>0&255,r[53]=ie>>>8&255,r[54]=ie>>>16&255,r[55]=ie>>>24&255,r[56]=se>>>0&255,r[57]=se>>>8&255,r[58]=se>>>16&255,r[59]=se>>>24&255,r[60]=ae>>>0&255,r[61]=ae>>>8&255,r[62]=ae>>>16&255,r[63]=ae>>>24&255}function me(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,z=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ge=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,X=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,W=g,N=m,R=k,U=L,B=G,w=z,v=ge,E=$,S=X,C=Z,M=oe,q=re,ie=Q,se=ee,ae=J,f,de=0;de<20;de+=2)f=O+q|0,U^=f<<7|f>>>25,f=U+O|0,E^=f<<9|f>>>23,f=E+U|0,q^=f<<13|f>>>19,f=q+E|0,O^=f<<18|f>>>14,f=B+W|0,S^=f<<7|f>>>25,f=S+B|0,ie^=f<<9|f>>>23,f=ie+S|0,W^=f<<13|f>>>19,f=W+ie|0,B^=f<<18|f>>>14,f=C+w|0,se^=f<<7|f>>>25,f=se+C|0,N^=f<<9|f>>>23,f=N+se|0,w^=f<<13|f>>>19,f=w+N|0,C^=f<<18|f>>>14,f=ae+M|0,R^=f<<7|f>>>25,f=R+ae|0,v^=f<<9|f>>>23,f=v+R|0,M^=f<<13|f>>>19,f=M+v|0,ae^=f<<18|f>>>14,f=O+R|0,W^=f<<7|f>>>25,f=W+O|0,N^=f<<9|f>>>23,f=N+W|0,R^=f<<13|f>>>19,f=R+N|0,O^=f<<18|f>>>14,f=B+U|0,w^=f<<7|f>>>25,f=w+B|0,v^=f<<9|f>>>23,f=v+w|0,U^=f<<13|f>>>19,f=U+v|0,B^=f<<18|f>>>14,f=C+S|0,M^=f<<7|f>>>25,f=M+C|0,E^=f<<9|f>>>23,f=E+M|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=ae+se|0,q^=f<<7|f>>>25,f=q+ae|0,ie^=f<<9|f>>>23,f=ie+q|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;r[0]=O>>>0&255,r[1]=O>>>8&255,r[2]=O>>>16&255,r[3]=O>>>24&255,r[4]=B>>>0&255,r[5]=B>>>8&255,r[6]=B>>>16&255,r[7]=B>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ae>>>0&255,r[13]=ae>>>8&255,r[14]=ae>>>16&255,r[15]=ae>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function pe(r,a,i,e){ce(r,a,i,e)}function ne(r,a,i,e){me(r,a,i,e)}var H=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function Ue(r,a,i,e,s,g,m){var k=new Uint8Array(16),L=new Uint8Array(64),G,z;for(z=0;z<16;z++)k[z]=0;for(z=0;z<8;z++)k[z]=g[z];for(;s>=64;){for(pe(L,k,m,H),z=0;z<64;z++)r[a+z]=i[e+z]^L[z];for(G=1,z=8;z<16;z++)G=G+(k[z]&255)|0,k[z]=G&255,G>>>=8;s-=64,a+=64,e+=64}if(s>0)for(pe(L,k,m,H),z=0;z<s;z++)r[a+z]=i[e+z]^L[z];return 0}function Ne(r,a,i,e,s){var g=new Uint8Array(16),m=new Uint8Array(64),k,L;for(L=0;L<16;L++)g[L]=0;for(L=0;L<8;L++)g[L]=e[L];for(;i>=64;){for(pe(m,g,s,H),L=0;L<64;L++)r[a+L]=m[L];for(k=1,L=8;L<16;L++)k=k+(g[L]&255)|0,g[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(pe(m,g,s,H),L=0;L<i;L++)r[a+L]=m[L];return 0}function ye(r,a,i,e,s){var g=new Uint8Array(32);ne(g,e,s,H);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return Ne(r,a,i,m,g)}function Ye(r,a,i,e,s,g,m){var k=new Uint8Array(32);ne(k,g,m,H);for(var L=new Uint8Array(8),G=0;G<8;G++)L[G]=g[G+16];return Ue(r,a,i,e,s,L,k)}var ze=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,m,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};ze.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,m,k,L,G,z,ge,$,X,Z,oe,re,Q,ee,J,O,W,N,R=this.h[0],U=this.h[1],B=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],q=this.h[9],ie=this.r[0],se=this.r[1],ae=this.r[2],f=this.r[3],de=this.r[4],be=this.r[5],he=this.r[6],le=this.r[7],ue=this.r[8],xe=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,R+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,U+=(s>>>13|g<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,B+=(g>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,G=r[a+10]&255|(r[a+11]&255)<<8,S+=(L>>>14|G<<2)&8191,z=r[a+12]&255|(r[a+13]&255)<<8,C+=(G>>>11|z<<5)&8191,ge=r[a+14]&255|(r[a+15]&255)<<8,M+=(z>>>8|ge<<8)&8191,q+=ge>>>5|e,$=0,X=$,X+=R*ie,X+=U*(5*xe),X+=B*(5*ue),X+=w*(5*le),X+=v*(5*he),$=X>>>13,X&=8191,X+=E*(5*be),X+=S*(5*de),X+=C*(5*f),X+=M*(5*ae),X+=q*(5*se),$+=X>>>13,X&=8191,Z=$,Z+=R*se,Z+=U*ie,Z+=B*(5*xe),Z+=w*(5*ue),Z+=v*(5*le),$=Z>>>13,Z&=8191,Z+=E*(5*he),Z+=S*(5*be),Z+=C*(5*de),Z+=M*(5*f),Z+=q*(5*ae),$+=Z>>>13,Z&=8191,oe=$,oe+=R*ae,oe+=U*se,oe+=B*ie,oe+=w*(5*xe),oe+=v*(5*ue),$=oe>>>13,oe&=8191,oe+=E*(5*le),oe+=S*(5*he),oe+=C*(5*be),oe+=M*(5*de),oe+=q*(5*f),$+=oe>>>13,oe&=8191,re=$,re+=R*f,re+=U*ae,re+=B*se,re+=w*ie,re+=v*(5*xe),$=re>>>13,re&=8191,re+=E*(5*ue),re+=S*(5*le),re+=C*(5*he),re+=M*(5*be),re+=q*(5*de),$+=re>>>13,re&=8191,Q=$,Q+=R*de,Q+=U*f,Q+=B*ae,Q+=w*se,Q+=v*ie,$=Q>>>13,Q&=8191,Q+=E*(5*xe),Q+=S*(5*ue),Q+=C*(5*le),Q+=M*(5*he),Q+=q*(5*be),$+=Q>>>13,Q&=8191,ee=$,ee+=R*be,ee+=U*de,ee+=B*f,ee+=w*ae,ee+=v*se,$=ee>>>13,ee&=8191,ee+=E*ie,ee+=S*(5*xe),ee+=C*(5*ue),ee+=M*(5*le),ee+=q*(5*he),$+=ee>>>13,ee&=8191,J=$,J+=R*he,J+=U*be,J+=B*de,J+=w*f,J+=v*ae,$=J>>>13,J&=8191,J+=E*se,J+=S*ie,J+=C*(5*xe),J+=M*(5*ue),J+=q*(5*le),$+=J>>>13,J&=8191,O=$,O+=R*le,O+=U*he,O+=B*be,O+=w*de,O+=v*f,$=O>>>13,O&=8191,O+=E*ae,O+=S*se,O+=C*ie,O+=M*(5*xe),O+=q*(5*ue),$+=O>>>13,O&=8191,W=$,W+=R*ue,W+=U*le,W+=B*he,W+=w*be,W+=v*de,$=W>>>13,W&=8191,W+=E*f,W+=S*ae,W+=C*se,W+=M*ie,W+=q*(5*xe),$+=W>>>13,W&=8191,N=$,N+=R*xe,N+=U*ue,N+=B*le,N+=w*he,N+=v*be,$=N>>>13,N&=8191,N+=E*de,N+=S*f,N+=C*ae,N+=M*se,N+=q*ie,$+=N>>>13,N&=8191,$=($<<2)+$|0,$=$+X|0,X=$&8191,$=$>>>13,Z+=$,R=X,U=Z,B=oe,w=re,v=Q,E=ee,S=J,C=O,M=W,q=N,a+=16,i-=16;this.h[0]=R,this.h[1]=U,this.h[2]=B,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=q},ze.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,m=1;m<8;m++)g=(this.h[m]+this.pad[m]|0)+(g>>>16)|0,this.h[m]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},ze.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function De(r,a,i,e,s,g){var m=new ze(g);return m.update(i,e,s),m.finish(r,a),0}function je(r,a,i,e,s,g){var m=new Uint8Array(16);return De(m,0,i,e,s,g),T(r,a,m,0)}function ve(r,a,i,e,s){var g;if(i<32)return-1;for(Ye(r,0,a,0,i,e,s),De(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function He(r,a,i,e,s){var g,m=new Uint8Array(32);if(i<32||(ye(m,0,32,e,s),je(a,16,a,32,i-32,m)!==0))return-1;for(Ye(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function Pe(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function gt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function Ze(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function rt(r,a){var i,e,s,g=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(gt(m),gt(m),gt(m),e=0;e<2;e++){for(g[0]=m[0]-65517,i=1;i<15;i++)g[i]=m[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=m[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,Ze(m,g,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function Bt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return rt(i,r),rt(e,a),V(i,0,e,0)}function bt(r){var a=new Uint8Array(32);return rt(a,r),a[0]&1}function Qe(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Re(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Fe(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function fe(r,a,i){var e,s,g=0,m=0,k=0,L=0,G=0,z=0,ge=0,$=0,X=0,Z=0,oe=0,re=0,Q=0,ee=0,J=0,O=0,W=0,N=0,R=0,U=0,B=0,w=0,v=0,E=0,S=0,C=0,M=0,q=0,ie=0,se=0,ae=0,f=i[0],de=i[1],be=i[2],he=i[3],le=i[4],ue=i[5],xe=i[6],Ee=i[7],we=i[8],Se=i[9],ke=i[10],Ce=i[11],Ae=i[12],Te=i[13],Ie=i[14],$e=i[15];e=a[0],g+=e*f,m+=e*de,k+=e*be,L+=e*he,G+=e*le,z+=e*ue,ge+=e*xe,$+=e*Ee,X+=e*we,Z+=e*Se,oe+=e*ke,re+=e*Ce,Q+=e*Ae,ee+=e*Te,J+=e*Ie,O+=e*$e,e=a[1],m+=e*f,k+=e*de,L+=e*be,G+=e*he,z+=e*le,ge+=e*ue,$+=e*xe,X+=e*Ee,Z+=e*we,oe+=e*Se,re+=e*ke,Q+=e*Ce,ee+=e*Ae,J+=e*Te,O+=e*Ie,W+=e*$e,e=a[2],k+=e*f,L+=e*de,G+=e*be,z+=e*he,ge+=e*le,$+=e*ue,X+=e*xe,Z+=e*Ee,oe+=e*we,re+=e*Se,Q+=e*ke,ee+=e*Ce,J+=e*Ae,O+=e*Te,W+=e*Ie,N+=e*$e,e=a[3],L+=e*f,G+=e*de,z+=e*be,ge+=e*he,$+=e*le,X+=e*ue,Z+=e*xe,oe+=e*Ee,re+=e*we,Q+=e*Se,ee+=e*ke,J+=e*Ce,O+=e*Ae,W+=e*Te,N+=e*Ie,R+=e*$e,e=a[4],G+=e*f,z+=e*de,ge+=e*be,$+=e*he,X+=e*le,Z+=e*ue,oe+=e*xe,re+=e*Ee,Q+=e*we,ee+=e*Se,J+=e*ke,O+=e*Ce,W+=e*Ae,N+=e*Te,R+=e*Ie,U+=e*$e,e=a[5],z+=e*f,ge+=e*de,$+=e*be,X+=e*he,Z+=e*le,oe+=e*ue,re+=e*xe,Q+=e*Ee,ee+=e*we,J+=e*Se,O+=e*ke,W+=e*Ce,N+=e*Ae,R+=e*Te,U+=e*Ie,B+=e*$e,e=a[6],ge+=e*f,$+=e*de,X+=e*be,Z+=e*he,oe+=e*le,re+=e*ue,Q+=e*xe,ee+=e*Ee,J+=e*we,O+=e*Se,W+=e*ke,N+=e*Ce,R+=e*Ae,U+=e*Te,B+=e*Ie,w+=e*$e,e=a[7],$+=e*f,X+=e*de,Z+=e*be,oe+=e*he,re+=e*le,Q+=e*ue,ee+=e*xe,J+=e*Ee,O+=e*we,W+=e*Se,N+=e*ke,R+=e*Ce,U+=e*Ae,B+=e*Te,w+=e*Ie,v+=e*$e,e=a[8],X+=e*f,Z+=e*de,oe+=e*be,re+=e*he,Q+=e*le,ee+=e*ue,J+=e*xe,O+=e*Ee,W+=e*we,N+=e*Se,R+=e*ke,U+=e*Ce,B+=e*Ae,w+=e*Te,v+=e*Ie,E+=e*$e,e=a[9],Z+=e*f,oe+=e*de,re+=e*be,Q+=e*he,ee+=e*le,J+=e*ue,O+=e*xe,W+=e*Ee,N+=e*we,R+=e*Se,U+=e*ke,B+=e*Ce,w+=e*Ae,v+=e*Te,E+=e*Ie,S+=e*$e,e=a[10],oe+=e*f,re+=e*de,Q+=e*be,ee+=e*he,J+=e*le,O+=e*ue,W+=e*xe,N+=e*Ee,R+=e*we,U+=e*Se,B+=e*ke,w+=e*Ce,v+=e*Ae,E+=e*Te,S+=e*Ie,C+=e*$e,e=a[11],re+=e*f,Q+=e*de,ee+=e*be,J+=e*he,O+=e*le,W+=e*ue,N+=e*xe,R+=e*Ee,U+=e*we,B+=e*Se,w+=e*ke,v+=e*Ce,E+=e*Ae,S+=e*Te,C+=e*Ie,M+=e*$e,e=a[12],Q+=e*f,ee+=e*de,J+=e*be,O+=e*he,W+=e*le,N+=e*ue,R+=e*xe,U+=e*Ee,B+=e*we,w+=e*Se,v+=e*ke,E+=e*Ce,S+=e*Ae,C+=e*Te,M+=e*Ie,q+=e*$e,e=a[13],ee+=e*f,J+=e*de,O+=e*be,W+=e*he,N+=e*le,R+=e*ue,U+=e*xe,B+=e*Ee,w+=e*we,v+=e*Se,E+=e*ke,S+=e*Ce,C+=e*Ae,M+=e*Te,q+=e*Ie,ie+=e*$e,e=a[14],J+=e*f,O+=e*de,W+=e*be,N+=e*he,R+=e*le,U+=e*ue,B+=e*xe,w+=e*Ee,v+=e*we,E+=e*Se,S+=e*ke,C+=e*Ce,M+=e*Ae,q+=e*Te,ie+=e*Ie,se+=e*$e,e=a[15],O+=e*f,W+=e*de,N+=e*be,R+=e*he,U+=e*le,B+=e*ue,w+=e*xe,v+=e*Ee,E+=e*we,S+=e*Se,C+=e*ke,M+=e*Ce,q+=e*Ae,ie+=e*Te,se+=e*Ie,ae+=e*$e,g+=38*W,m+=38*N,k+=38*R,L+=38*U,G+=38*B,z+=38*w,ge+=38*v,$+=38*E,X+=38*S,Z+=38*C,oe+=38*M,re+=38*q,Q+=38*ie,ee+=38*se,J+=38*ae,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=ge+s+65535,s=Math.floor(e/65536),ge=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=ge+s+65535,s=Math.floor(e/65536),ge=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=X+s+65535,s=Math.floor(e/65536),X=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=m,r[2]=k,r[3]=L,r[4]=G,r[5]=z,r[6]=ge,r[7]=$,r[8]=X,r[9]=Z,r[10]=oe,r[11]=re,r[12]=Q,r[13]=ee,r[14]=J,r[15]=O}function F(r,a){fe(r,a,a)}function D(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)F(i,i),e!==2&&e!==4&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)F(i,i),e!==1&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function j(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,m,k=o(),L=o(),G=o(),z=o(),ge=o(),$=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,Qe(s,i),m=0;m<16;m++)L[m]=s[m],z[m]=k[m]=G[m]=0;for(k[0]=z[0]=1,m=254;m>=0;--m)g=e[m>>>3]>>>(m&7)&1,Ze(k,L,g),Ze(G,z,g),Re(ge,k,G),Fe(k,k,G),Re(G,L,z),Fe(L,L,z),F(z,ge),F($,k),fe(k,G,k),fe(G,L,ge),Re(ge,k,G),Fe(k,k,G),F(L,k),Fe(G,z,$),fe(k,G,h),Re(k,k,z),fe(G,G,k),fe(k,z,$),fe(z,L,s),F(L,ge),Ze(k,L,g),Ze(G,z,g);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=G[m],s[m+48]=L[m],s[m+64]=z[m];var X=s.subarray(32),Z=s.subarray(16);return D(X,X),fe(Z,Z,X),rt(r,Z),0}function te(r,a){return j(r,a,d)}function _e(r,a){return l(a,32),te(r,a)}function Me(r,a,i){var e=new Uint8Array(32);return j(e,i,a),ne(r,c,e,H)}var Le=ve,ht=He;function mn(r,a,i,e,s,g){var m=new Uint8Array(32);return Me(m,s,g),Le(r,a,i,e,m)}function Ve(r,a,i,e,s,g){var m=new Uint8Array(32);return Me(m,s,g),ht(r,a,i,e,m)}var ot=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function rr(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),m,k,L,G,z,ge,$,X,Z,oe,re,Q,ee,J,O,W,N,R,U,B,w,v,E,S,C,M,q=r[0],ie=r[1],se=r[2],ae=r[3],f=r[4],de=r[5],be=r[6],he=r[7],le=a[0],ue=a[1],xe=a[2],Ee=a[3],we=a[4],Se=a[5],ke=a[6],Ce=a[7],Ae=0;e>=128;){for(U=0;U<16;U++)B=8*U+Ae,s[U]=i[B+0]<<24|i[B+1]<<16|i[B+2]<<8|i[B+3],g[U]=i[B+4]<<24|i[B+5]<<16|i[B+6]<<8|i[B+7];for(U=0;U<80;U++)if(m=q,k=ie,L=se,G=ae,z=f,ge=de,$=be,X=he,Z=le,oe=ue,re=xe,Q=Ee,ee=we,J=Se,O=ke,W=Ce,w=he,v=Ce,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(f>>>14|we<<18)^(f>>>18|we<<14)^(we>>>9|f<<23),v=(we>>>14|f<<18)^(we>>>18|f<<14)^(f>>>9|we<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=f&de^~f&be,v=we&Se^~we&ke,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=ot[U*2],v=ot[U*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[U%16],v=g[U%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,N=C&65535|M<<16,R=E&65535|S<<16,w=N,v=R,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(q>>>28|le<<4)^(le>>>2|q<<30)^(le>>>7|q<<25),v=(le>>>28|q<<4)^(q>>>2|le<<30)^(q>>>7|le<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=q&ie^q&se^ie&se,v=le&ue^le&xe^ue&xe,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,X=C&65535|M<<16,W=E&65535|S<<16,w=G,v=Q,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=N,v=R,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,G=C&65535|M<<16,Q=E&65535|S<<16,ie=m,se=k,ae=L,f=G,de=z,be=ge,he=$,q=X,ue=Z,xe=oe,Ee=re,we=Q,Se=ee,ke=J,Ce=O,le=W,U%16===15)for(B=0;B<16;B++)w=s[B],v=g[B],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(B+9)%16],v=g[(B+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,N=s[(B+1)%16],R=g[(B+1)%16],w=(N>>>1|R<<31)^(N>>>8|R<<24)^N>>>7,v=(R>>>1|N<<31)^(R>>>8|N<<24)^(R>>>7|N<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,N=s[(B+14)%16],R=g[(B+14)%16],w=(N>>>19|R<<13)^(R>>>29|N<<3)^N>>>6,v=(R>>>19|N<<13)^(N>>>29|R<<3)^(R>>>6|N<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[B]=C&65535|M<<16,g[B]=E&65535|S<<16;w=q,v=le,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[0]=q=C&65535|M<<16,a[0]=le=E&65535|S<<16,w=ie,v=ue,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[1]=ie=C&65535|M<<16,a[1]=ue=E&65535|S<<16,w=se,v=xe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[2]=se=C&65535|M<<16,a[2]=xe=E&65535|S<<16,w=ae,v=Ee,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[3]=ae=C&65535|M<<16,a[3]=Ee=E&65535|S<<16,w=f,v=we,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[4]=f=C&65535|M<<16,a[4]=we=E&65535|S<<16,w=de,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[5]=de=C&65535|M<<16,a[5]=Se=E&65535|S<<16,w=be,v=ke,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[6]=be=C&65535|M<<16,a[6]=ke=E&65535|S<<16,w=he,v=Ce,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[7]=he=C&65535|M<<16,a[7]=Ce=E&65535|S<<16,Ae+=128,e-=128}return e}function ct(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,rr(e,s,a,i),i%=128,m=0;m<i;m++)g[m]=a[k-i+m];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,P(g,i-8,k/536870912|0,k<<3),rr(e,s,g,i),m=0;m<8;m++)P(r,8*m,e[m],s[m]);return 0}function Kt(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o(),G=o(),z=o();Fe(i,r[1],r[0]),Fe(z,a[1],a[0]),fe(i,i,z),Re(e,r[0],r[1]),Re(z,a[0],a[1]),fe(e,e,z),fe(s,r[3],a[3]),fe(s,s,b),fe(g,r[2],a[2]),Re(g,g,g),Fe(m,e,i),Fe(k,g,s),Re(L,g,s),Re(G,e,i),fe(r[0],m,k),fe(r[1],G,L),fe(r[2],L,k),fe(r[3],m,G)}function or(r,a,i){var e;for(e=0;e<4;e++)Ze(r[e],a[e],i)}function wn(r,a){var i=o(),e=o(),s=o();D(s,a[2]),fe(i,a[0],s),fe(e,a[1],s),rt(r,e),r[31]^=bt(i)<<7}function vn(r,a,i){var e,s;for(Pe(r[0],u),Pe(r[1],p),Pe(r[2],p),Pe(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,or(r,a,e),Kt(a,r),Kt(r,r),or(r,a,e)}function Ht(r,a){var i=[o(),o(),o(),o()];Pe(i[0],y),Pe(i[1],_),Pe(i[2],p),fe(i[3],y,_),vn(r,i,a)}function _n(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),ct(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Ht(s,e),wn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Vt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Sn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Vt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Vt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Vt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function kn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;Sn(r,a)}function ir(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),m=new Uint8Array(64),k,L,G=new Float64Array(64),z=[o(),o(),o(),o()];ct(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ge=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(ct(m,r.subarray(32),i+32),kn(m),Ht(z,m),wn(r,z),k=32;k<64;k++)r[k]=e[k];for(ct(g,r,i+64),kn(g),k=0;k<64;k++)G[k]=0;for(k=0;k<32;k++)G[k]=m[k];for(k=0;k<32;k++)for(L=0;L<32;L++)G[k+L]+=g[k]*s[L];return Sn(r.subarray(32),G),ge}function fo(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o();return Pe(r[2],p),Qe(r[1],a),F(s,r[1]),fe(g,s,x),Fe(s,s,r[2]),Re(g,r[2],g),F(m,g),F(k,m),fe(L,k,m),fe(i,L,s),fe(i,i,g),Y(i,i),fe(i,i,s),fe(i,i,g),fe(i,i,g),fe(r[0],i,g),F(e,r[0]),fe(e,e,g),Bt(e,s)&&fe(r[0],r[0],I),F(e,r[0]),fe(e,e,g),Bt(e,s)?-1:(bt(r[0])===a[31]>>7&&Fe(r[0],u,r[0]),fe(r[3],r[0],r[1]),0)}function Cn(r,a,i,e){var s,g=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||fo(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(ct(m,r,i),kn(m),vn(k,L,m),Ht(L,a.subarray(32)),Kt(k,L),wn(g,k),i-=64,V(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var En=32,Xt=24,zt=32,mt=16,Nt=32,Zt=32,Tt=32,It=32,Mn=32,ar=Xt,po=zt,uo=mt,Je=64,dt=32,wt=64,Ln=32,An=64;n.lowlevel={crypto_core_hsalsa20:ne,crypto_stream_xor:Ye,crypto_stream:ye,crypto_stream_salsa20_xor:Ue,crypto_stream_salsa20:Ne,crypto_onetimeauth:De,crypto_onetimeauth_verify:je,crypto_verify_16:T,crypto_verify_32:V,crypto_secretbox:ve,crypto_secretbox_open:He,crypto_scalarmult:j,crypto_scalarmult_base:te,crypto_box_beforenm:Me,crypto_box_afternm:Le,crypto_box:mn,crypto_box_open:Ve,crypto_box_keypair:_e,crypto_hash:ct,crypto_sign:ir,crypto_sign_keypair:_n,crypto_sign_open:Cn,crypto_secretbox_KEYBYTES:En,crypto_secretbox_NONCEBYTES:Xt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:mt,crypto_scalarmult_BYTES:Nt,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:Tt,crypto_box_SECRETKEYBYTES:It,crypto_box_BEFORENMBYTES:Mn,crypto_box_NONCEBYTES:ar,crypto_box_ZEROBYTES:po,crypto_box_BOXZEROBYTES:uo,crypto_sign_BYTES:Je,crypto_sign_PUBLICKEYBYTES:dt,crypto_sign_SECRETKEYBYTES:wt,crypto_sign_SEEDBYTES:Ln,crypto_hash_BYTES:An,gf:o,D:x,L:Vt,pack25519:rt,unpack25519:Qe,M:fe,A:Re,S:F,Z:Fe,pow2523:Y,add:Kt,set25519:Pe,modL:Sn,scalarmult:vn,scalarbase:Ht};function sr(r,a){if(r.length!==En)throw new Error("bad key size");if(a.length!==Xt)throw new Error("bad nonce size")}function xo(r,a){if(r.length!==Tt)throw new Error("bad public key size");if(a.length!==It)throw new Error("bad secret key size")}function Ge(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function lr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Ge(r,a,i),sr(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+zt]=r[g];return ve(s,e,e.length,a,i),s.subarray(mt)},n.secretbox.open=function(r,a,i){Ge(r,a,i),sr(i,a);for(var e=new Uint8Array(mt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+mt]=r[g];return e.length<32||He(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=En,n.secretbox.nonceLength=Xt,n.secretbox.overheadLength=mt,n.scalarMult=function(r,a){if(Ge(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==Nt)throw new Error("bad p size");var i=new Uint8Array(Nt);return j(i,r,a),i},n.scalarMult.base=function(r){if(Ge(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(Nt);return te(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=Nt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Ge(r,a),xo(r,a);var i=new Uint8Array(Mn);return Me(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Tt),a=new Uint8Array(It);return _e(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Ge(r),r.length!==It)throw new Error("bad secret key size");var a=new Uint8Array(Tt);return te(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Tt,n.box.secretKeyLength=It,n.box.sharedKeyLength=Mn,n.box.nonceLength=ar,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Ge(r,a),a.length!==wt)throw new Error("bad secret key size");var i=new Uint8Array(Je+r.length);return ir(i,r,r.length,a),i},n.sign.open=function(r,a){if(Ge(r,a),a.length!==dt)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=Cn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Je),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Ge(r,a,i),a.length!==Je)throw new Error("bad signature size");if(i.length!==dt)throw new Error("bad public key size");var e=new Uint8Array(Je+r.length),s=new Uint8Array(Je+r.length),g;for(g=0;g<Je;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+Je]=r[g];return Cn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(dt),a=new Uint8Array(wt);return _n(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Ge(r),r.length!==wt)throw new Error("bad secret key size");for(var a=new Uint8Array(dt),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Ge(r),r.length!==Ln)throw new Error("bad seed size");for(var a=new Uint8Array(dt),i=new Uint8Array(wt),e=0;e<32;e++)i[e]=r[e];return _n(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=dt,n.sign.secretKeyLength=wt,n.sign.seedLength=Ln,n.sign.signatureLength=Je,n.hash=function(r){Ge(r);var a=new Uint8Array(An);return ct(a,r,r.length),a},n.hash.hashLength=An,n.verify=function(r,a){return Ge(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];lr(g)})}else typeof ta<"u"&&(r=oa,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];lr(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Pn)),Pn.exports}var aa=ia();const Hr=Ji(aa);function sa(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const b=t.charAt(x),y=b.charCodeAt(0);if(n[y]!==255)throw new TypeError(b+" is ambiguous");n[y]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),d=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let b=0,y=0,_=0;const I=x.length;for(;_!==I&&x[_]===0;)_++,b++;const P=(I-_)*d+1>>>0,A=new Uint8Array(P);for(;_!==I;){let ce=x[_],me=0;for(let pe=P-1;(ce!==0||me<y)&&pe!==-1;pe--,me++)ce+=256*A[pe]>>>0,A[pe]=ce%o>>>0,ce=ce/o>>>0;if(ce!==0)throw new Error("Non-zero carry");y=me,_++}let T=P-y;for(;T!==P&&A[T]===0;)T++;let V=l.repeat(b);for(;T<P;++T)V+=t.charAt(A[T]);return V}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let b=0,y=0,_=0;for(;x[b]===l;)y++,b++;const I=(x.length-b)*c+1>>>0,P=new Uint8Array(I);for(;b<x.length;){const ce=x.charCodeAt(b);if(ce>255)return;let me=n[ce];if(me===255)return;let pe=0;for(let ne=I-1;(me!==0||pe<_)&&ne!==-1;ne--,pe++)me+=o*P[ne]>>>0,P[ne]=me%256>>>0,me=me/256>>>0;if(me!==0)throw new Error("Non-zero carry");_=pe,b++}let A=I-_;for(;A!==I&&P[A]===0;)A++;const T=new Uint8Array(y+(I-A));let V=y;for(;A!==I;)T[V++]=P[A++];return T}function h(x){const b=p(x);if(b)return b;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:h}}var la="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const dn=sa(la),er="cbsgo_wallet_v3",bn="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(er);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function ca(t){localStorage.setItem(er,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function da(){const t=Hr.sign.keyPair(),n=dn.encode(t.publicKey),o=dn.encode(t.secretKey);return{pk:n,sk:o}}function Vr(){return!!qt()}function fa(){return qt()?sessionStorage.getItem(bn)==="1":!1}function pa(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=da();return ca({pk:l,sk:c,pin:n}),sessionStorage.setItem(bn,"1"),l}function ua(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(bn,"1"),n.pk}function Xe(){const t=qt();return t?t.pk:""}function xa(){localStorage.removeItem(er),sessionStorage.removeItem(bn)}typeof window<"u"&&(window.cbsgoDevResetWallet=xa);const Xr="cbsgoLoginModal";function Zr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Qr(){const t=document.getElementById(Xr);t&&t.remove()}function ya(t){Qr();const n=document.createElement("div");return n.id=Xr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function ga(t,n){return`
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
      ">${Zr(t)}</div>

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
  `}function hr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ba(){const t=!Vr();let n="";try{const b=yt();t?b&&b!=="Sovereign"?n=b:n="":n=b||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Zr(n)}" style="${Qt()}" placeholder="Kevin" />
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
        <button id="cbsgoCreateBtn" type="button" style="${hr(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${hr(!0)}">Unlock</button>
      </div>
    `,l=ya(ga(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),d=b=>{c&&(c.textContent=b||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),h=l.querySelector("#cbsgoNick"),x=()=>{Qr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const b=l.querySelector("#cbsgoCreateBtn");b&&(b.onclick=async()=>{try{const y=String(h?.value||"").trim(),_=String(u?.value||"").trim(),I=String(p?.value||"").trim();if(y.length<2)return d("⛔ Nickname too short.");if(_.length<4)return d("⛔ PIN must be at least 4 digits.");if(_!==I)return d("⛔ PINs do not match.");d("Creating wallet…"),Gr(y),await pa(_),d("✅ Wallet created. Starting…"),x()}catch(y){d(`⛔ ${String(y?.message||y)}`)}})}else{const b=l.querySelector("#cbsgoUnlockBtn");b&&(b.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return d("⛔ PIN must be at least 4 digits.");d("Unlocking…"),await ua(y),d("✅ Unlocked."),x()}catch{d("⛔ Wrong PIN (or wallet data missing).")}})}}const Jr="cbsgo_solana_wallet_v1";function ha(t,n=null){try{const o=JSON.parse(t);return!o||typeof o!="object"||typeof o.publicKey!="string"||typeof o.secretKey!="string"?n:o}catch{return n}}function ma(){const t=Hr.sign.keyPair(),n=dn.encode(t.publicKey),o=dn.encode(t.secretKey),l={publicKey:n,secretKey:o,createdAt:new Date().toISOString(),version:1};try{localStorage.setItem(Jr,JSON.stringify(l))}catch(c){console.warn("CBS GO: failed to persist local Solana wallet",c)}return l}function wa(){try{const t=localStorage.getItem(Jr);return t?ha(t,null):null}catch{return null}}function eo(){let t=wa();return t||(t=ma(),t)}function tr(){return eo().publicKey}function mr(){return eo().secretKey}const va="https://cxfedvowjgkqrakkkjpi.supabase.co",_a="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",We=yo(va,_a);function Sa(){const t=Xe();if(!t)return null;const n=yt(),o=gn();let l=null;try{l=tr()}catch(c){console.warn("CBS GO: kon lokale Solana wallet niet lezen/aanmaken (solana_pk blijft leeg)",c)}return{wallet_pk:t,nickname:n,avatar:o,solana_pk:l}}async function an(t={}){try{const n=Sa();if(!n){console.warn("CBS GO: no game wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await We.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ka=15e3,Ca=1e4,Ea=300*1e3;let Pt=null,wr=0,vr=0;function Ma(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",Ma));async function La(){const t=Xe();if(!t||!Pt)return;const n=Date.now();if(n-wr<5e3)return;wr=n;const l=(yt()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:d,error:u}=await We.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(d&&d.length>0){const p=d[0].id,{error:h}=await We.from("player_state").update(c).eq("id",p);h&&console.warn("CBS GO: player_state update failed",h)}else{const{error:p}=await We.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(d){console.warn("CBS GO: pushMyState error",d)}}async function Aa(){const t=Xe();if(!t)return;const n=Date.now();if(n-vr<3e3)return;vr=n;const o=new Date(Date.now()-Ea).toISOString();try{const{data:l,error:c}=await We.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const d=Array.isArray(l)?l:[],u=Array.from(new Set(d.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:b}=await We.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);b?console.warn("CBS GO: fetch player profiles failed",b):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const h=d.map(x=>{const b=x.lat,y=x.lng,_=typeof b=="number"?b:parseFloat(b),I=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite(I))return null;const P=p.get(x.wallet_pk)||null,A=P&&P.nickname||x.nickname||"Anon",T=P&&P.avatar?String(P.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:T,lat:_,lng:I,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:h}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function Ba(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{La()},ka),setInterval(()=>{Aa()},Ca))}Ba();function to(){const t=Xe();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function fn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function za(t){const n=to(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await We.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw fn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function Na(t){const n=to(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await We.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw fn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function no(){const t=Xe();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await We.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw fn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],d=[];for(const p of l){const h=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!h&&!x)continue;const b=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:b,nickname:null,avatar:""};h&&c.push(y),x&&d.push(y)}const u=Array.from(new Set([...c,...d].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:h}=await We.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!h&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const b=y=>{y.forEach(_=>{const I=x.get(_.otherWallet);I&&(_.nickname=I.nickname||null,_.avatar=I.avatar||"")})};b(c),b(d)}else h&&fn("loadFriendsOverview:players",h)}return{incoming:c,accepted:d}}let Rt=null;async function ro(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Rt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Rt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Ta(){try{Rt&&(await Rt.release(),Rt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Ia(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await ro():await Ta()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}const Dn="cbsgo_trades";async function $a(t,n){const o=Xe();if(!o)throw new Error("No local CBS-GO wallet available.");const l=yt(),c=gn(),d=Number(n?.tickets||0),u=Number(n?.cbs||0),p=n?.cardId||null,h=p?Number(n?.cardQty||0):0;if(!d&&!u&&!p)throw new Error("Nothing to send.");const x=Jt(),b=en();if(d>0&&d>x)throw new Error("Not enough tickets in your bag.");if(u>0&&u>b)throw new Error("Not enough CBS (play money) in your bag.");const{error:y}=await We.from(Dn).insert({from_wallet:o,to_wallet:t,tickets:d,cbs:u,card_id:p,card_qty:h,sender_nickname:l||null,sender_avatar:c||null,claimed:!1});if(y)throw console.warn("CBS GO: sendGiftToWallet failed",y),new Error(y.message||"Could not send gift.");try{const _=Jt(),I=en();console.log("CBS GO: deducting from bag",{tickets:d,cbs:u,beforeTickets:_,beforeCbs:I}),d>0&&At(-d),u>0&&xn(-u);const P=Jt(),A=en();console.log("CBS GO: bag after deduct",{afterTickets:P,afterCbs:A}),typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}catch(_){console.warn("CBS GO: failed to update local bag after trade",_)}}let On=!1;async function oo(){const t=Xe();if(t&&!On){On=!0;try{const{data:n,error:o}=await We.from(Dn).select("*").eq("to_wallet",t).eq("claimed",!1).order("created_at",{ascending:!0}).limit(50);if(o){console.warn("CBS GO: pullIncomingGifts failed",o);return}if(!n||!n.length)return;for(const l of n){const c=l.id,{data:d,error:u}=await We.from(Dn).update({claimed:!0}).eq("id",c).eq("claimed",!1).select("id");if(u){console.warn("CBS GO: failed to mark trade as claimed",u);continue}if(!d||!d.length)continue;const p=Number(l.tickets||0),h=Number(l.cbs||0),x=l.card_id||null,b=Number(l.card_qty||0);p&&At(p),h&&xn(h),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:{senderNickname:l.sender_nickname||"",senderAvatar:l.sender_avatar||"",toWallet:l.to_wallet,tickets:p,cbs:h,cardId:x,cardQty:b}}))}typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}finally{On=!1}}}function Be(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function nr(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const io="cbsgo_cards_v1";function Pa(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Wt(){const t=localStorage.getItem(io),n=Pa(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function ao(t){const n={counts:{...t||{}}};try{localStorage.setItem(io,JSON.stringify(n))}catch{}}function Yn(){const t=Wt(),n=ut();n.cards={...t||{}},Hn(n)}const Oa=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function ja(){const t=Wt();let n=0,o=0;const l=[];for(const c of Oa){const d=Number(t[c.id]||0);Number.isFinite(d)&&d>0&&(n+=1,o+=d,l.push({id:c.id,count:d,label:c.label}))}return{cardTypes:n,cardTotal:o,sendable:l}}function hn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function qn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function _r(t,n){return`
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
  `}function Ra(){const t=yt(),n=gn(),o=Xe();return`
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
  `}function Fa(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const T=document.querySelector("#profileMsg");T&&(T.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const d=()=>{if(!t)return;const A=Gr(t.value);c(`✅ Name saved: ${A}`);try{an()}catch(T){console.warn("CBS GO: failed to sync profile after name change",T)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(d,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),d()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const T=new FileReader;T.onload=()=>{di(String(T.result||"")),c("✅ Photo saved"),Lt();try{an()}catch(V){console.warn("CBS GO: failed to sync profile after avatar change",V)}},T.onerror=()=>c("⛔ Failed to read image."),T.readAsDataURL(A)}),o&&(o.onclick=()=>{fi(),c("✅ Photo removed"),Lt();try{an()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),h=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),b=document.querySelector("#friendsAcceptedList"),y=A=>{h&&(h.textContent=A||"")},_=A=>{if(!A)return"";const T=String(A);return T.length<=12?T:`${T.slice(0,5)}…${T.slice(-4)}`},I=(A,T="")=>{const V=A.nickname&&A.nickname.trim()?A.nickname.trim():_(A.otherWallet),ce=_(A.otherWallet);return`
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
          ${nr(A.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Be(V||"Friend")}
            </div>
            ${ce?`<div style="font-size:11px;opacity:.7;">${Be(ce)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${T||""}
        </div>
      </div>
    `};async function P(){if(!(!x||!b))try{x.textContent="Loading…",b.textContent="Loading…";const A=await no();A.incoming.length?x.innerHTML=A.incoming.map(T=>{const V=`
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
            `;return I(T,V)}).join(""):x.textContent="No incoming requests.",A.accepted.length?b.innerHTML=A.accepted.map(T=>{const V=`
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
            `;return I(T,V)}).join(""):b.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(T=>{T.addEventListener("click",async()=>{const V=T.getAttribute("data-friend-id");if(V){y("Accepting friend…"),T.disabled=!0;try{await Na(V),y("✅ Friend added."),await P()}catch(ce){console.warn(ce),y(`⛔ ${ce.message||ce}`),T.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(T=>{T.addEventListener("click",async()=>{const V=T.getAttribute("data-wallet")||"";if(V)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(V),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(ce){console.warn("CBS GO: copy friend wallet failed",ce),y("⛔ Could not copy wallet address.")}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",b.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){y("Enter a wallet address first.");return}y("Sending friend request…"),p.disabled=!0;try{await za(A),y("✅ Friend request sent."),u.value="",await P()}catch(T){console.warn(T),y(`⛔ ${T.message||T}`)}finally{p.disabled=!1}}),P().catch(()=>{})}function Ua(){const t=Jt(),n=en(),o=Xe(),l=tr(),{cardTypes:c,cardTotal:d,sendable:u}=ja(),p=d>0?`You own ${d} cards (${c} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",x=u.length>0?`
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
            ${u.map(b=>`<option value="${Be(b.id)}">${Be(b.label||b.id)} (x${b.count})</option>`).join("")}
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

      ${l?`
            <div style="
              margin-top:16px;
              padding:10px 12px;
              border-radius:14px;
              border:1px solid rgba(56,189,248,.85);
              background:rgba(10,12,18,.92);
            ">
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
                margin-bottom:8px;
              ">
                ${Be(l)}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                <button id="cbsgoCopySolanaPkBtn" type="button" style="
                  padding:7px 10px;
                  border-radius:999px;
                  border:1px solid rgba(56,189,248,.8);
                  background:rgba(56,189,248,.18);
                  color:#e0f2fe;
                  font-size:12px;
                  font-weight:600;
                  cursor:pointer;
                ">
                  Copy address
                </button>
                <button id="cbsgoShowSecretBtn" type="button" style="
                  padding:7px 10px;
                  border-radius:999px;
                  border:1px solid rgba(248,250,252,.45);
                  background:rgba(15,23,42,.98);
                  color:#fee2e2;
                  font-size:11px;
                  font-weight:600;
                  cursor:pointer;
                ">
                  Show private key (advanced)
                </button>
              </div>
              <div id="cbsgoSolSecretWrap" style="
                margin-top:8px;
                display:none;
              ">
                <div style="font-size:11px;opacity:.85;margin-bottom:4px;">
                  ⚠️ Do not share this key with anyone. Anyone with this key can take your tokens.
                </div>
                <div id="cbsgoSolSecretValue" style="
                  font-size:11px;
                  opacity:.95;
                  padding:6px 8px;
                  border-radius:10px;
                  border:1px solid rgba(248,250,252,.45);
                  background:rgba(15,23,42,1);
                  word-break:break-all;
                  font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                  margin-bottom:6px;
                "></div>
                <button id="cbsgoCopySolanaSecretBtn" type="button" style="
                  padding:7px 10px;
                  border-radius:999px;
                  border:1px solid rgba(248,250,252,.6);
                  background:rgba(15,23,42,.98);
                  color:#e5e7eb;
                  font-size:11px;
                  font-weight:600;
                  cursor:pointer;
                ">
                  Copy private key
                </button>
              </div>
              <div id="solanaWalletMsg" style="margin-top:6px; font-size:11px; opacity:.9;"></div>
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
          ${Be(p)}
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
  `}function Ga(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Qi()}catch(H){console.warn("CBS GO: openCardsPanel failed",H)}});try{Yn()}catch(H){console.warn("CBS GO: failed to sync inventory cards from bag",H)}const l=Xe(),c=document.querySelector("#giftWalletInput"),d=document.querySelector("#giftFriendSelect"),u=document.querySelector("#giftTicketsInput"),p=document.querySelector("#giftCbsInput"),h=document.querySelector("#giftCardSelect"),x=document.querySelector("#giftCardQtyInput"),b=document.querySelector("#giftSendBtn"),y=document.querySelector("#giftMsg"),_=H=>{y&&(y.textContent=H||"")};async function I(){if(d)try{const H=await no(),Ue=[];Ue.push('<option value="">-- No friend selected --</option>'),H.accepted&&H.accepted.length&&H.accepted.forEach(Ne=>{const ye=Ne.otherWallet||"";if(!ye)return;const Ye=Ne.nickname&&Ne.nickname.trim()?Ne.nickname.trim():ye,ze=Be(Ye),De=ye.length>12?`${ye.slice(0,5)}…${ye.slice(-4)}`:ye,je=`${ze} (${Be(De)})`;Ue.push(`<option value="${Be(ye)}">${je}</option>`)}),d.innerHTML=Ue.join("")}catch(H){console.warn("CBS GO: populateFriendSelect failed",H),d.innerHTML='<option value="">-- Friends not available --</option>'}}I().catch(()=>{}),b&&(c||d)&&b.addEventListener("click",async()=>{let H=c&&c.value?c.value.trim():"";if((!H||!H.length)&&d){const ve=d.value.trim();ve&&(H=ve)}const Ue=u?.value??"",Ne=p?.value??"",ye=h?h.value.trim():"",Ye=x?.value??"",ze=Number(Ye||"0"),De=Number(Ue||"0"),je=Number(Ne||"0");if(!H){_("Enter a wallet address first, or pick a friend.");return}if((!De||De<=0)&&(!je||je<=0)&&!ye){_("Set tickets and/or CBS above 0, or choose a card.");return}if(ye&&(!ze||ze<=0)){_("Set card quantity above 0.");return}if(ye&&ze>0){const ve=Wt(),He=Number(ve[ye]||0);if(!Number.isFinite(He)||He<ze){_("Not enough of that card in your collection.");return}}b.disabled=!0,_("Sending gift…");try{if(await $a(H,{tickets:De,cbs:je,cardId:ye||null,cardQty:ye?ze:0}),ye&&ze>0){const ve=Wt(),Pe=Number(ve[ye]||0)-ze;Pe>0?ve[ye]=Pe:delete ve[ye],ao(ve),Yn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...ve}}}))}_("✅ Gift sent."),u&&(u.value=""),p&&(p.value=""),x&&(x.value=""),h&&(h.value=""),d&&(d.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:H,tickets:De,cbs:je,cardId:ye||null,cardQty:ye?ze:0}}))}catch(ve){console.warn(ve),_(`⛔ ${ve.message||"Could not send gift."}`)}finally{b.disabled=!1}});const P=H=>{n&&(n.textContent=H||"")};t&&l&&(t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),P("✅ Wallet address copied to clipboard.")):P("📋 Copy not supported in this browser.")}catch{P("⛔ Failed to copy address.")}});const A=document.querySelector("#solanaWalletMsg"),T=document.querySelector("#cbsgoSolSecretWrap"),V=document.querySelector("#cbsgoSolSecretValue"),ce=document.querySelector("#cbsgoCopySolanaPkBtn"),me=document.querySelector("#cbsgoShowSecretBtn"),pe=document.querySelector("#cbsgoCopySolanaSecretBtn"),ne=H=>{A&&(A.textContent=H||"")};ce&&(ce.onclick=async()=>{try{const H=tr();navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(H),ne("✅ Solana address copied.")):ne("📋 Copy not supported in this browser.")}catch(H){console.warn("CBS GO: copy Solana pk failed",H),ne("⛔ Failed to copy address.")}}),me&&T&&V&&(me.onclick=()=>{try{const H=mr();V.textContent=H,T.style.display="block",ne("⚠️ Keep this private key safe. Anyone with this key can access your funds.")}catch(H){console.warn("CBS GO: show secret failed",H),ne("⛔ Could not load private key.")}}),pe&&(pe.onclick=async()=>{try{const H=mr();navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(H),ne("✅ Private key copied (handle with care).")):ne("📋 Copy not supported in this browser.")}catch(H){console.warn("CBS GO: copy secret failed",H),ne("⛔ Failed to copy private key.")}}),oo().catch(()=>{})}function so(){const t=hn();return t==="profile"?_r("Profile",`<div id="profileMount">${Ra()}</div>`):t==="bag"?_r("Bag",`<div id="bagMount">${Ua()}</div>`):""}function Wa(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Gi()}
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
        ${so()}
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
  `}function Lt(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=so();const n=hn();n==="profile"&&Fa(),n==="bag"&&Ga();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{qn("map"),Lt()})}function Da(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=hn();qn(o===n?"map":n||"map"),Lt()})})}function Sr(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:c,toWallet:d,tickets:u=0,cbs:p=0,cardId:h=null,cardQty:x=0}=t||{};if(!u&&!p&&!(h&&x))return;n.innerHTML="";const b=document.createElement("div");b.style.position="fixed",b.style.inset="0",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.background="rgba(5,7,11,0.78)",b.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=yt(),I=o==="sent"?"Gift sent":"You received a gift",P=[];u&&P.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&P.push(`🪙 ${p} CBS`),h&&x&&P.push(`🃏 ${x} card${x===1?"":"s"}`);const A=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${Be(_)}</b> to <span style="opacity:.9;">${Be(d||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${Be(l||"Friend")}</b>
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
        <div style="font-size:15px;font-weight:800;">${Be(I)}</div>
        ${A}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${Be(P.join(" · "))}
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
  `,b.appendChild(y),n.appendChild(b),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const V=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},ce=document.getElementById("cbsgoTradePopupCloseBtn");ce&&(ce.onclick=V),b.addEventListener("click",me=>{me.target===b&&V()})}function kr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Wa();try{ro(),Ia()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{an()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Da(),qi(),li(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Rr())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=jr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{hn()==="bag"&&Lt()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let h=p.querySelector(".cbsgoToastBox");h||(h=document.createElement("div"),h.className="cbsgoToastBox",h.style.pointerEvents="auto",h.style.padding="8px 12px",h.style.borderRadius="999px",h.style.border="1px solid rgba(255,255,255,.25)",h.style.background="rgba(10,12,18,.88)",h.style.backdropFilter="blur(10px)",h.style.color="#fff",h.style.fontFamily="system-ui,sans-serif",h.style.fontSize="11px",h.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",h.style.opacity="0",h.style.transform="translateY(10px)",h.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(h)),h.textContent=u||"",h.style.opacity="1",h.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{h.style.opacity="0",h.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},h=Number(p.xp||0),x=Number(p.tickets||0),b=Number(p.cbs||0);if(!h&&!x&&!b)return;const y=[];h&&y.push(`+${h} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),b&&y.push(`+${b} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const h=Number(u?.steps||0),x=Number(u?.goal||0),b=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const I=x?`${h}/${x} steps`:`${h} steps`;_.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${b?` (${b})`:""}.
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const P=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=P),y.addEventListener("click",T=>{T.target===y&&P()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const h=Number(u?.xp||0),x=Number(u?.tickets||0),b=Number(u?.cbs||0);if(!h&&!x&&!b)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const I=[];h&&I.push(`+${h} XP`),x&&I.push(`+${x} ticket${x===1?"":"s"}`),b&&I.push(`+${b} CBS`),_.innerHTML=`
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
        ${Be(I.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function d(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const h=Number(u?.days||7),x=Number(u?.rewardCbs||0),b=document.createElement("div");b.style.position="fixed",b.style.inset="0",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.background="rgba(5,7,11,0.80)",b.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(340px, 92vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(251,191,36,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",y.style.padding="20px 18px 16px 18px",y.style.textAlign="center",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",y.innerHTML=`
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
    `,b.appendChild(y),p.appendChild(b),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},I=document.getElementById("cbsgoStreakCloseBtn");I&&(I.onclick=_),b.addEventListener("click",P=>{P.target===b&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{d(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{Sr(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{},h=p.cardId||null,x=Number(p.cardQty||0);if(h&&x>0){const b=Wt(),_=Number(b[h]||0)+x;b[h]=_,ao(b),Yn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...b}}}))}Sr({direction:"received",fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0})})),Lt(),Fr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ci)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Rn({id:"__daily__",name:"Daily Glow"});return}if(Br(p))return;const h=_o.find(x=>x.id===p);h&&Rn(h)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&ho(async()=>{const{completeNode:h}=await Promise.resolve().then(()=>Co);return{completeNode:h}},void 0).then(({completeNode:h})=>{h(p),lo()})})),oo().catch(()=>{})}function lo(){if(!document.querySelector("#app"))return;if(Vr()&&fa()){kr();return}ba();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),kr()};window.addEventListener("cbsgo:loginDone",n)}function co(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function pn(t){const n=co();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";pn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{pn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function Cr(){try{if(!document.getElementById("app")){pn("❌ #app not found in index.html");return}lo();const n=co();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){pn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Cr,{once:!0}):Cr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
