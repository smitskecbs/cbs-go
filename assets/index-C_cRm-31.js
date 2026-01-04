import{createClient as uo}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const u of f.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(c){if(c.ep)return;c.ep=!0;const f=o(c);fetch(c.href,f)}})();const xo="modulepreload",yo=function(t){return"/cbs-go/"+t},cr={},go=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let b=function(x){return Promise.all(x.map(h=>Promise.resolve(h).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=b(o.map(x=>{if(x=yo(x),x in cr)return;cr[x]=!0;const h=x.endsWith(".css"),y=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":xo,h||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),h)return new Promise((N,P)=>{_.addEventListener("load",N),_.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${x}`)))})}))}function f(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&f(p.reason);return n().catch(f)})},jn="cbsgoLevelUpOverlay",dr="cbsgoLevelUpStyles",Bn="https://smitskecbs.github.io/cbs-go/";function bo(){if(document.getElementById(dr))return;const t=document.createElement("style");t.id=dr,t.textContent=`
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
  `,document.head.appendChild(t)}function zn(){const t=document.getElementById(jn);t&&t.remove()}function ho(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const f=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${f}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function fr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function mo(t){bo(),zn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=jn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&ho(c);const f=()=>zn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),b=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=f),p&&(p.onclick=f),b&&(b.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Bn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Bn),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+Bn)}}),setTimeout(()=>{document.getElementById(jn)&&zn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{mo(t?.detail||{})}));const wo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Cr="cbsgo_state_v6";function vo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function _o(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ft(){const t=localStorage.getItem(Cr);return vo(t,_o())}function Er(t){t.updatedAt=Date.now(),localStorage.setItem(Cr,JSON.stringify(t))}function Kn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function un(){return Number(Ft().xp||0)}function Ut(){const t=un();let n=1,o=t;for(;;){const l=Kn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function Mr(){const t=un();let n=1,o=t;for(;;){const l=Kn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function Lr(){return Kn(Ut())}function Dt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ft();const o=Ut(),l=Ft();l.xp=Number(l.xp||0)+n,Er(l);const c=Ut();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function Ar(t){const n=String(t||"");if(!n)return!1;const o=Ft();return!!(o.completed&&o.completed[n])}function Br(t){const n=String(t||"");if(!n)return;const o=Ft();o.completed||(o.completed={}),o.completed[n]=Date.now(),Er(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const So=Object.freeze(Object.defineProperty({__proto__:null,addXp:Dt,completeNode:Br,getLevel:Ut,getXp:un,getXpIntoLevel:Mr,getXpNeededThisLevel:Lr,isNodeCompleted:Ar},Symbol.toStringTag,{value:"Module"})),zr="cbsgoPuzzleModal";function ko(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nn(){const t=document.getElementById(zr);t&&t.remove()}function Rn(t){Nn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],f=180,u=18,p=l.length,b=.01;let x=[],h=null,y=0,_=u,N=!1,P=!1,A=null;const T=t?.name||"CBS GO Puzzle",X=document.createElement("div");X.id=zr,X.style.position="fixed",X.style.inset="0",X.style.zIndex="999999",X.style.display="flex",X.style.alignItems="center",X.style.justifyContent="center",X.style.padding="16px",X.style.background="rgba(0,0,0,.70)",X.style.backdropFilter="blur(12px)",X.style.fontFamily="system-ui, sans-serif",X.style.color="#fff",X.innerHTML=`
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
          ${ko(T)}
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
  `,document.body.appendChild(X);const le=document.getElementById("cbsgoBoard"),Y=document.getElementById("cbsgoScore"),fe=document.getElementById("cbsgoMoves"),ae=document.getElementById("cbsgoStatus"),ue=document.getElementById("cbsgoPuzzleClose"),We=document.getElementById("cbsgoPuzzleOk"),ke=document.getElementById("cbsgoConfettiLayer");function Me(F){ae&&(ae.textContent=F||"")}function Pe(){if(!ke)return;ke.style.display="block",ke.innerHTML="";const F=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],D=40;for(let q=0;q<D;q++){const j=document.createElement("div"),te=6+Math.floor(Math.random()*6),we=Math.random()*100,Le=Math.random()*.6,Ae=1+Math.random()*.6,ht=Math.random()*360;j.style.position="absolute",j.style.top="-10%",j.style.left=`${we}%`,j.style.width=`${te}px`,j.style.height=`${te*2}px`,j.style.background=F[q%F.length],j.style.opacity="0.9",j.style.borderRadius="2px",j.style.transform=`rotate(${ht}deg)`,j.style.animation=`cbsgoConfettiFall ${Ae}s ease-out ${Le}s forwards`,ke.appendChild(j)}}function Ce(){return Math.floor(Math.random()*l.length)}function Xe(){x=[];for(let F=0;F<n;F++){const D=[];for(let q=0;q<o;q++)Math.random()<b?D.push(p):D.push(Ce());x.push(D)}}function qe(F){return F===p}function Oe(){if(le){le.innerHTML="";for(let F=0;F<n;F++)for(let D=0;D<o;D++){const q=x[F][D],j=document.createElement("div");j.dataset.row=String(F),j.dataset.col=String(D),j.style.borderRadius="12px",j.style.display="flex",j.style.alignItems="center",j.style.justifyContent="center",j.style.cursor=P?"default":"pointer",j.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",j.style.fontSize="20px",qe(q)?(j.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",j.textContent="💥"):(j.style.background=l[q]||"#444",j.textContent=c[q]||"⬛"),h&&h.row===F&&h.col===D&&(j.style.outline="2px solid #fff",j.style.outlineOffset="2px"),j.addEventListener("click",()=>{Re(F,D)}),j.addEventListener("touchstart",te=>{if(P)return;const we=te.touches[0];A={row:F,col:D,x:we.clientX,y:we.clientY}}),j.addEventListener("touchend",te=>{if(!A||P)return;const we=te.changedTouches[0],Le=we.clientX-A.x,Ae=we.clientY-A.y;if(Math.sqrt(Le*Le+Ae*Ae)<18){Re(F,D),A=null;return}let Ke=A.row,rt=A.col;Math.abs(Le)>Math.abs(Ae)?Le>0?rt+=1:rt-=1:Ae>0?Ke+=1:Ke-=1,Ke>=0&&Ke<n&&rt>=0&&rt<o&&je(A.row,A.col,Ke,rt),A=null,te.preventDefault()}),le.appendChild(j)}}}function yt(F,D){if(!F||!D)return!1;const q=Math.abs(F.row-D.row),j=Math.abs(F.col-D.col);return q+j===1}function Ge(F,D){const q=x[F.row][F.col];x[F.row][F.col]=x[D.row][D.col],x[D.row][D.col]=q}function gt(){const F=new Set;for(let D=0;D<n;D++){let q=x[D][0],j=0;for(let te=1;te<=o;te++){const we=te<o?x[D][te]:null;if(we===q)continue;const Le=te-j;if(q!=null&&Le>=3)for(let Ae=j;Ae<te;Ae++)F.add(`${D},${Ae}`);q=we,j=te}}for(let D=0;D<o;D++){let q=x[0][D],j=0;for(let te=1;te<=n;te++){const we=te<n?x[te][D]:null;if(we===q)continue;const Le=te-j;if(q!=null&&Le>=3)for(let Ae=j;Ae<te;Ae++)F.add(`${Ae},${D}`);q=we,j=te}}return F}function Ve(F){if(!F||!F.size)return 0;const D=F.size;y+=D*4,Y&&(Y.textContent=String(y)),!P&&y>=f&&bt(!0);for(const q of F){const[j,te]=q.split(","),we=Number(j),Le=Number(te);x[we][Le]=null}for(let q=0;q<o;q++){let j=n-1;for(let te=n-1;te>=0;te--)x[te][q]!=null&&(x[j][q]=x[te][q],j--);for(let te=j;te>=0;te--)Math.random()<b?x[te][q]=p:x[te][q]=Ce()}return D}function nt(F,D){const q=new Set;for(let j=0;j<o;j++)q.add(`${F},${j}`);for(let j=0;j<n;j++)q.add(`${j},${D}`);Ve(q),Oe(),P||setTimeout(()=>Bt(!1),120)}function Bt(F=!1){if(P)return;N=!0;const D=()=>{if(P){N=!0;return}const q=gt();if(!q.size){N=!1,Oe(),F&&!P&&(_<=0?Ze():Me("Nice! Keep matching."));return}Ve(q),Oe(),setTimeout(D,120)};D()}function bt(F){if(!P)if(P=!0,N=!0,F){Me("Great job! Puzzle completed 🎉");try{t?.id&&Br(t.id),Dt(10)}catch{}Pe(),setTimeout(()=>{Nn()},1600)}else Me("Out of moves. Try again next time 🙂")}function Ze(){y>=f?bt(!0):_<=0&&bt(!1)}function je(F,D,q,j){if(N||P)return;if(_<=0){Ze();return}const te={row:F,col:D},we={row:q,col:j};if(!yt(te,we))return;const Le=x[F][D],Ae=x[q][j],ht=qe(Le)||qe(Ae);if(Ge(te,we),h=null,_--,fe&&(fe.textContent=String(_)),ht){Oe();const Ke=qe(x[F][D])?{row:F,col:D}:{row:q,col:j};nt(Ke.row,Ke.col),Ze();return}if(!gt().size){Ge(te,we),Oe(),Me("No match… try another swap."),Ze();return}Me(""),Oe(),Bt(!0)}function Re(F,D){if(N||P)return;if(_<=0){Ze();return}const q={row:F,col:D};if(!h){h=q,Oe();return}if(h.row===F&&h.col===D){h=null,Oe();return}if(!yt(h,q)){h=q,Oe();return}je(h.row,h.col,q.row,q.col)}function pe(){Nn()}ue&&(ue.onclick=pe),We&&(We.onclick=()=>{pe()}),Xe(),Oe(),Me("Tap or swipe two neighboring tiles to swap them.")}const Nr="cbsgo_inventory_v2";function Co(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Eo(){return{tickets:0,cbs:0,cards:{}}}function pt(){const t=localStorage.getItem(Nr),n=Co(t,Eo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Hn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Nr,JSON.stringify(n))}function Jt(){return Number(pt().tickets||0)}function en(){return Number(pt().cbs||0)}function At(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return pt();const o=pt();let c=Number(o.tickets||0)+n;return c<0&&(c=0),o.tickets=c,Hn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function xn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n===0)return pt();const o=pt();let c=Number(o.cbs||0)+n;return c<0&&(c=0),o.cbs=c,Hn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const Ir="cbsgo_steps_v6",Mo="cbsgo_steps_v5",Lo="cbsgo_gps_autostart_v2",Tr="cbsgo_daily_puzzle_v1",Ao=.75,Et=5e3,sn=7,Fn=100,Bo=1e3,zo=.5,No=2e3,Io=4.5,In=1500,Tn=200,To=.25,$o=.05,Po=.3;let tn=null,nn=!1,vt={msg:"init"};function Un(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const $r="cbsgo_cards_v1",Oo=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function jo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Ro(t){return Oo.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Fo(){try{const t=localStorage.getItem($r),n=Un(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const f=Number(c.count);Number.isFinite(f)&&f>0&&(o[l]=f)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Uo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,f]of Object.entries(n)){const u=Number(f||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem($r,JSON.stringify(l))}catch{}}function Go(t,n=1){const o=jo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const f={...Fo().counts||{}},p=Number(f[o]||0)+l;f[o]=p,Uo({counts:f});const b=Ro(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:f}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:b}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:b}}))}catch{}return{cardId:o,count:p,card:b}}function st(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Wo(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,f=new Date(o,l-1,c);return Number.isNaN(f.getTime())?null:f}function Do(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Pr(t,n){const o=Wo(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const f=new Date(o.getTime());f.setDate(f.getDate()-c),l.push(Do(f))}return l}function ln(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:st(),daySteps:0,dayMeters:0,dailyGoalSteps:Et,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Yo(t){const n=st();return!t||typeof t!="object"?ln():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Et),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=Et),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function yn(t){t.updatedAt=Date.now(),localStorage.setItem(Ir,JSON.stringify(t))}function qo(t,n){if(!n)return;const o=Pr(n,sn);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(xn(Fn),Yt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:sn,rewardCbs:Fn,lastDayKey:n}})))}function pr(t){t=Yo(t||ln());const n=st();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,qo(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,yn(t)}return t}function ut(){let t=localStorage.getItem(Ir);if(!t){const o=localStorage.getItem(Mo);if(o){const l=Un(o,ln()),c=pr(l);return yn(c),c}}const n=Un(t,ln());return pr(n)}function rn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Ko()}}))}function Xn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Yt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Vn(t,n,o,l){const c=Number(t||0),f=Number(n||0),u=0;if(!(!c&&!f&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:f,cbs:u,reason:l||"distance"}}))}catch{}}function Ko(){const t=ut();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Ho(){const t=ut(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Xo(){return Ho()/1e3}function Vo(){const t=ut(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||Et),l=!!t.dailyGoalReached,c=t.dayKey||st(),f=t.streak||{},p=Pr(c,sn).map(b=>{let x=!1;return b===c?x=l:x=!!f[b],{dateKey:b,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:sn,rewardPerStreak:Fn}}function ur(){return!!nn}function Zo(){try{return localStorage.getItem(Tr)===st()}catch{return!1}}function Qo(){try{localStorage.setItem(Tr,st())}catch{}}function Jo(t,n){return Zo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:st()}})),Qo(),!0)}function xr(){const t=ut(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function ei(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<In)return;const f=Math.floor(c/In);f<=0||(At(f),Yt(),Vn(0,f,0,"boost"),t.boostLastStep=o+f*In)}function ti(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Tn){t.chestMeters=n;return}let o=0;for(;n>=Tn&&o<5;)if(n-=Tn,o+=1,Math.random()<To){const l=Math.random()<$o,c=l?10:3,f=l?2:1;Dt(c),Xn(),At(f),Yt();const u=l&&Math.random()<Po;Vn(c,f,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:f,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function ni(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function ri(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),f=Number(t.xpKmAwarded||0);if(c>f){const x=c-f;x>0&&(Dt(x),Xn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),b=Number(t.ticketChunksAwarded||0);if(p>b){const x=p-b;x>0&&(At(x),Yt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Vn(o,l,0,"distance")}function oi(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return ut();const o=ut();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/Ao);if(c>l){const f=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+f}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||Et)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||st(),steps:o.daySteps,goal:o.dailyGoalSteps||Et}}))),ri(o),ei(o),ti(o),yn(o),rn(),o}function ii(){tn!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(tn),tn=null}async function yr(t={}){const n=!!t.silent;if(!navigator.geolocation)return vt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Lo,"1")}catch{}ii(),nn=!0,vt={msg:"requesting",t:Date.now()};try{return tn=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,f=o.coords.accuracy||999,u=Date.now(),p=ut(),b=p.lastPos;p.lastPos={lat:l,lng:c,t:u},yn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:f,heading:x,speed:h,t:u}})),f>Bo){vt={lat:l,lng:c,acc:f,t:u,reason:"accuracy",boostMs:xr()},rn();return}Jo(l,c);let y=0,_=0,N=0,P=0,A="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(y=ni({lat:b.lat,lng:b.lng},{lat:l,lng:c}),_=Math.max(1,(u-b.t)/1e3),N=y/_,y<zo?A="jitter":y>No?A="teleport":N>Io?A="too-fast":(oi(y),P=y,A="ok")),vt={lat:l,lng:c,acc:f,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite(N)?Number(N.toFixed(2)):0,added:Math.round(P),reason:A,boostMs:xr()},rn()},o=>{nn=!1,vt={err:o?.message||"GPS blocked",t:Date.now()},rn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return nn=!1,vt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ai(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ur()||await yr({silent:!0}))();const n=async()=>{ur()||await yr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Dt(o),Xn()),(l>0||c>0)&&(l>0&&At(l),c>0&&xn(c),Yt());const f=n.cardId||n.card_id;if(f)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Go(f,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Or(){const t=un(),n=Ut(),o=Mr(),l=Lr(),c=Xo(),f=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function jr(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:f}=Vo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function Rr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function si(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Fr="cbsgo_player_name_v2",Zn="cbsgo_player_avatar_v2";function xt(){try{return localStorage.getItem(Fr)||"Sovereign"}catch{return"Sovereign"}}function Ur(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Fr,n)}catch{}return n}function gn(){try{return localStorage.getItem(Zn)||""}catch{return""}}function li(t){const n=String(t||"");try{localStorage.setItem(Zn,n)}catch{}return n}function ci(){try{localStorage.removeItem(Zn)}catch{}}let H=null,ot=null,it=null,$t=null,Ot=null,Ye=null,$e=null,_t=0,dt=!1,tt=!0,De=null;const Je=new Map;let et=!0,jt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const di="48a387bba00043ac4ba5823371abc9d2",Gt=80,fi=6,pi=80,ui=220,xi=6e4,yi=5*6e4,gi=300,bi=.35,$n=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],hi=350,mi=.35,wi=120;let cn=0,St=0,on=null,Gn=!1,Ct=[];function ft(t){return document.getElementById(t)}function kt(t){const n=ft("cbsgoMapHost");if(!n)return;let o=ft("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function vi(){const t=String(xt()||"").trim();return t?t[0].toUpperCase():"🙂"}function Wn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Mt(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),f=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),b=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(f/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Gr(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,f=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+f,lng:t.lng+u}}function _i(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),f=o(n.lng-t.lng),u=Math.sin(f)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(f);let b=Math.atan2(u,p);return b=b*180/Math.PI,b=(b+360)%360,b}function Si(t,n,o){const c=n/6371e3,f=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,b=Math.sin(u),x=Math.cos(u),h=Math.sin(c),y=Math.cos(c),_=Math.asin(b*y+x*h*Math.cos(f)),N=p+Math.atan2(Math.sin(f)*h*x,y-b*Math.sin(_));return[_*180/Math.PI,N*180/Math.PI]}function ki(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Wr(){const{temp:t,iconEmoji:n}=jt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Dr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;ki();const{condition:n,isNight:o}=jt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const f=[];for(let u=0;u<96;u++){const p=Math.random()*100,b=Math.random()*16-8,x=Math.random()*2.5,h=2+Math.random()*1.5;f.push(`
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
      `)}l=f.join("")}else l="";t.innerHTML=l}async function Ci(t,n){const o=Date.now();if(!(jt.lastUpdated&&o-jt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${di}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const f=await c.json(),u=f?.main?.temp,p=f?.weather?.[0]?.icon||"01d",b=String(f?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),h="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(h="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(h="🌧️",y="rain"):p.startsWith("11")?(h="⛈️",y="storm"):p.startsWith("13")?(h="❄️",y="snow"):p.startsWith("50")&&(h="🌫️",y="mist"),b.includes("rain")&&(y="rain"),b.includes("snow")&&(y="snow"),b.includes("thunder")&&(y="storm");try{const N=Number(f?.dt||0),P=Number(f?.timezone||0);if(N&&Number.isFinite(P)){const T=((N+P)/3600%24+24)%24;x=T<7||T>=19}}catch{}y==="clear"?h=x?"🌙":"☀️":y==="clouds"?h="☁️":y==="rain"?h="🌧️":y==="storm"?h="⛈️":y==="snow"?h="❄️":y==="mist"&&(h="🌫️"),jt={temp:u,iconEmoji:h,condition:y,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Wr()),Dr()}catch(l){console.warn("Weather fetch failed",l)}}function Ei(t){const n=gn();if(n){const c=`
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
    ">${Wn(vi())}</div>
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Mi(t,n,o,l){if(!l&&o){const p=`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Bi(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function zi(){if(!$n.length)return null;const t=Math.floor(Math.random()*$n.length);return $n[t]}function Ni(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let f=null,u=0;if(Math.random()<bi){const p=zi();p&&(f=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:f,cardCount:u}}function Ii(t){if(!H||!Ye||!t)return;const n=Date.now();if(n-cn<xi||Ye.getLayers().length>=fi)return;const l=window.L;if(!l)return;const c=Bi(),f=Ni(c),u=Gr(t,pi,ui),p=Li(l),b=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),h={marker:b,createdAt:n,lat:u.lat,lng:u.lng,reward:f};Ct.push(h),b.on("click",()=>{if(!$e){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:$e[0],lng:$e[1]},_={lat:u.lat,lng:u.lng},N=Mt(y,_);if(N>Gt){alert(`Too far to open this gift.

Distance: ${Math.round(N)}m
Needed: ≤ ${Gt}m`);return}Ye.removeLayer(b),Ct=Ct.filter(ue=>ue.marker!==b);const{xp:P,tickets:A,cbs:T,cardId:X,cardCount:le}=f,Y=[];P&&Y.push(`+${P} XP`),A&&Y.push(`+${A} ticket${A===1?"":"s"}`),T&&Y.push(`+${T} CBS`),X&&le>0&&Y.push(`+${le} card${le===1?"":"s"}`);const fe=Y.length?Y.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${fe}`);const ae={kind:"mystery",xp:P||0,tickets:A||0,cbs:T||0,cardId:X||null,cardCount:le||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:ae}))}catch{}}),b.addTo(Ye),cn=n}function Ti(t){if(!H||!Ye||!t)return;const n=Date.now();let o=0;Ct=Ct.filter(l=>{if(!l||!l.marker||!Ye.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>yi)return Ye.removeLayer(l.marker),o+=1,!1;const f=Mt({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(f)&&f>gi?(Ye.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Ye.getLayers().length===0&&(cn=0)}function $i(t){if(!H||!Ot||!t||on)return;const n=window.L;if(!n)return;if(Gn){if(St<hi||Math.random()>mi)return;St=0}else{if(St<wi)return;St=0,Gn=!0}const o=Gr(t,60,140),l=Ai(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!$e){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:$e[0],lng:$e[1]},u={lat:o.lat,lng:o.lng},p=Mt(f,u);if(p>Gt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Gt}m`);return}Ot.removeLayer(c),on=null,Rn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(Ot),on=c}function Pi(t){const n=window.L;if(!n||!H||!t)return;const o=Gt;$t?($t.setLatLng(t),$t.setRadius(o)):$t=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(H)}function Oi(t){const n=window.L;if(!n||!H)return;const o=Ei(n);if(ot?(ot.setIcon(o),ot.setLatLng(t)):(ot=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(H),H.setView(t,19)),it?(it.setIcon(gr(n,_t)),it.setLatLng(t)):it=n.marker(t,{icon:gr(n,_t),interactive:!1,pane:"cbsgo-player-pane"}).addTo(H),ot&&ot.bringToFront&&ot.bringToFront(),it&&it.bringToFront&&it.bringToFront(),Pi(t),tt&&!dt&&H)try{const l=H.getZoom()||19;let c=t;Number.isFinite(_t)&&(c=Si(t,40,_t));const f=H.getCenter(),u=Mt({lat:f.lat,lng:f.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&H.setView(c,l)}catch{}}function Yr(){const t=window.L;return!t||!H?null:(De?(et&&!H.hasLayer(De)&&De.addTo(H),!et&&H.hasLayer(De)&&H.removeLayer(De)):(De=t.layerGroup(),et&&De.addTo(H)),De)}function ji(t){if(!Array.isArray(t)||!H)return[];const n=H.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(f=>{if(!f||f.isMe||typeof f.lat!="number"||typeof f.lng!="number")return;const u=Math.round(f.lat*o)/o,p=Math.round(f.lng*o)/o,b=`${u}_${p}`;l.has(b)||l.set(b,[]),l.get(b).push(f)});const c=[];for(const[f,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||f,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,b=0;u.forEach(y=>{p+=y.lat,b+=y.lng});const x=p/u.length,h=b/u.length;c.push({id:`cluster_${f}`,lat:x,lng:h,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Ri(t){const n=window.L;if(!n||!H)return;const o=Yr();if(!o)return;if(!et){for(const[f,u]of Je.entries())o.removeLayer(u),Je.delete(f);return}const l=ji(t),c=new Set;l.forEach(f=>{if(!f||typeof f.lat!="number"||typeof f.lng!="number")return;const u=f.id||`${f.lat},${f.lng}`;c.add(u);const p=[f.lat,f.lng];let b=Je.get(u);if(b)b.setLatLng(p);else{const x=f.isCluster&&f.count>1?String(f.count):f.nickname||"Anon",h=Mi(n,x,f.avatar,f.isCluster);b=n.marker(p,{icon:h,pane:"cbsgo-others-pane"});const y=f.isCluster&&f.count>1?`${f.count} CBS-GO explorers nearby`:`${f.nickname||"CBS-GO explorer"}`;b.bindPopup(y),b.addTo(o),Je.set(u,b)}});for(const[f,u]of Je.entries())c.has(f)||(o.removeLayer(u),Je.delete(f))}function Fi(){return`
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
        <span id="cbsgoWeatherLabel">${Wr()}</span>
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
  `}function Ui(){try{H&&H.remove()}catch{}H=null,ot=null,it=null,$t=null,Ot=null,Ye=null,$e=null,dt=!1,tt=!0,cn=0,St=0,on=null,Gn=!1,De=null,Je.clear(),Ct=[]}function Gi(){const t=window.L,n=ft("cbsgoMap");if(!t||!n)return!1;Ui();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));H=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=H.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=H.createPane("cbsgo-others-pane");c.style.zIndex="640";const f=H.createPane("cbsgo-loot-pane");f.style.zIndex="630";const u=H.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(H),H.setMaxBounds(o),H.setView([51.687,4.87],16),Ot=t.layerGroup().addTo(H),Ye=t.layerGroup().addTo(H),H.on("dragstart",()=>{tt=!1}),H.on("zoomstart",()=>{tt=!1}),!0}function Wi(){!navigator.geolocation||!H||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,f={lat:n,lng:o},u=$e?{lat:$e[0],lng:$e[1]}:null;if($e=[n,o],Number.isFinite(c))_t=c;else if(u){const p=Mt(u,f);Number.isFinite(p)&&p>2&&(_t=_i(u,f))}if(Oi([n,o]),u){const p=Mt(u,f);if(Number.isFinite(p)&&p>1&&(St+=p),Number.isFinite(p)&&p>20&&!tt&&!dt&&H){tt=!0;const b=H.getZoom()||19;H.setView([n,o],b)}}$i(f),Ii(f),Ti(f),Ci(n,o),kt(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{kt(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Di(){let t=0;const n=120,o=()=>{if(t++,!ft("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(kt("Loading map engine…"),t<n)return setTimeout(o,100);kt("Map engine failed (Leaflet not found). Refresh.");return}if(!Gi()){kt("Could not init map. Refresh.");return}const c=ft("cbsgoCenterBtn");c&&(c.onclick=()=>{H&&$e&&(tt=!0,dt=!1,H.setView($e,19))});const f=ft("cbsgoCompassBtn");f&&(f.onclick=()=>{H&&(dt=!dt,dt?(tt=!1,H.setView([51.687,4.87],3)):$e&&(tt=!0,H.setView($e,16)))});const u=ft("cbsgoOnlineToggleBtn");if(u){const p=()=>{et?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{et=!et;const b=Yr();if(b&&H&&(et?H.hasLayer(b)||b.addTo(H):H.hasLayer(b)&&H.removeLayer(b)),p(),!et&&De){for(const[x,h]of Je.entries())De.removeLayer(h);Je.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const b=p?.detail?.players||[];Ri(b)})),Dr(),kt("Loading GPS…"),Wi()};o()}const Yi="cbsgo_cards_v1";function qi(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Qn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Jn(){const t=localStorage.getItem(Yi),n=qi(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function at(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function qr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Ki(){const t=Qn(),n=Jn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Hi(){const t=Qn(),n=Jn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),f=Number.isFinite(c)&&c>0,u=qr(l.rarity),p=f?u:"rgba(31,41,55,.9)",b=f?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=f?l.emoji||"🃏":"❓",h=f?at(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=at(l.set||"Set"),_=f?`<div style="
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
          data-card-id="${at(l.id)}"
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
            ${at(x)}
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
    `}function Xi(){const t=Ki(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const f=Qn(),u=new Map(f.map(x=>[x.id,x]));function p(x){const h=u.get(x);if(!h)return;const y=Jn(),_=Number(y[x]||0),N=Number.isFinite(_)&&_>0,P=N?h.emoji||"🃏":"❓",A=N?h.name||"Card":"Unknown card",T=h.set||"Set",X=h.rarity||"common",le=qr(X),Y={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[X]||"Common",fe=document.createElement("div");fe.style.position="fixed",fe.style.inset="0",fe.style.display="flex",fe.style.alignItems="center",fe.style.justifyContent="center",fe.style.background="rgba(0,0,0,0.65)",fe.style.pointerEvents="auto",fe.style.zIndex="8600";const ae=document.createElement("div");ae.style.width="min(260px, 82vw)",ae.style.borderRadius="20px",ae.style.border=`1px solid ${le}`,ae.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",ae.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",ae.style.padding="16px 14px 14px 14px",ae.style.textAlign="center",ae.style.color="#fff",ae.style.fontFamily="system-ui,sans-serif",ae.style.opacity="0",ae.style.transform="translateY(14px) scale(0.96)",ae.style.transition="opacity .2s ease-out, transform .2s ease-out";const ue=N?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',We=N?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;ae.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${at(T)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${le};
          font-size:10px;
        ">
          ${at(Y)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${le};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${at(P)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${at(A)}
      </div>

      ${ue}
      ${We}

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
    `,fe.appendChild(ae),document.body.appendChild(fe),requestAnimationFrame(()=>{ae.style.opacity="1",ae.style.transform="translateY(0) scale(1)"});const ke=()=>{ae.style.opacity="0",ae.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(fe)},200)},Me=ae.querySelector("#cbsgoCardPreviewCloseBtn");Me&&(Me.onclick=ke),fe.addEventListener("click",Pe=>{Pe.target===fe&&ke()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const h=x.getAttribute("data-card-id");h&&p(h)})})}function Zi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Qi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function Ji(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Pn={exports:{}};const ea={},ta=Object.freeze(Object.defineProperty({__proto__:null,default:ea},Symbol.toStringTag,{value:"Module"})),na=Qi(ta);var br;function ra(){return br||(br=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),f=new Uint8Array(32);f[0]=9;var u=o(),p=o([1]),b=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),N=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function P(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function A(r,a,i,e,s){var g,m=0;for(g=0;g<s;g++)m|=r[a+g]^i[e+g];return(1&m-1>>>8)-1}function T(r,a,i,e){return A(r,a,i,e,16)}function X(r,a,i,e){return A(r,a,i,e,32)}function le(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,z=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ge=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,W=g,I=m,R=k,U=L,B=G,w=z,v=ge,E=$,S=V,C=Z,M=re,K=ne,oe=Q,se=ee,ie=J,d,de=0;de<20;de+=2)d=O+K|0,U^=d<<7|d>>>25,d=U+O|0,E^=d<<9|d>>>23,d=E+U|0,K^=d<<13|d>>>19,d=K+E|0,O^=d<<18|d>>>14,d=B+W|0,S^=d<<7|d>>>25,d=S+B|0,oe^=d<<9|d>>>23,d=oe+S|0,W^=d<<13|d>>>19,d=W+oe|0,B^=d<<18|d>>>14,d=C+w|0,se^=d<<7|d>>>25,d=se+C|0,I^=d<<9|d>>>23,d=I+se|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ie+M|0,R^=d<<7|d>>>25,d=R+ie|0,v^=d<<9|d>>>23,d=v+R|0,M^=d<<13|d>>>19,d=M+v|0,ie^=d<<18|d>>>14,d=O+R|0,W^=d<<7|d>>>25,d=W+O|0,I^=d<<9|d>>>23,d=I+W|0,R^=d<<13|d>>>19,d=R+I|0,O^=d<<18|d>>>14,d=B+U|0,w^=d<<7|d>>>25,d=w+B|0,v^=d<<9|d>>>23,d=v+w|0,U^=d<<13|d>>>19,d=U+v|0,B^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=ie+se|0,K^=d<<7|d>>>25,d=K+ie|0,oe^=d<<9|d>>>23,d=oe+K|0,se^=d<<13|d>>>19,d=se+oe|0,ie^=d<<18|d>>>14;O=O+s|0,W=W+g|0,I=I+m|0,R=R+k|0,U=U+L|0,B=B+G|0,w=w+z|0,v=v+ge|0,E=E+$|0,S=S+V|0,C=C+Z|0,M=M+re|0,K=K+ne|0,oe=oe+Q|0,se=se+ee|0,ie=ie+J|0,r[0]=O>>>0&255,r[1]=O>>>8&255,r[2]=O>>>16&255,r[3]=O>>>24&255,r[4]=W>>>0&255,r[5]=W>>>8&255,r[6]=W>>>16&255,r[7]=W>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=R>>>0&255,r[13]=R>>>8&255,r[14]=R>>>16&255,r[15]=R>>>24&255,r[16]=U>>>0&255,r[17]=U>>>8&255,r[18]=U>>>16&255,r[19]=U>>>24&255,r[20]=B>>>0&255,r[21]=B>>>8&255,r[22]=B>>>16&255,r[23]=B>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=K>>>0&255,r[49]=K>>>8&255,r[50]=K>>>16&255,r[51]=K>>>24&255,r[52]=oe>>>0&255,r[53]=oe>>>8&255,r[54]=oe>>>16&255,r[55]=oe>>>24&255,r[56]=se>>>0&255,r[57]=se>>>8&255,r[58]=se>>>16&255,r[59]=se>>>24&255,r[60]=ie>>>0&255,r[61]=ie>>>8&255,r[62]=ie>>>16&255,r[63]=ie>>>24&255}function Y(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,g=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,z=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ge=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,O=s,W=g,I=m,R=k,U=L,B=G,w=z,v=ge,E=$,S=V,C=Z,M=re,K=ne,oe=Q,se=ee,ie=J,d,de=0;de<20;de+=2)d=O+K|0,U^=d<<7|d>>>25,d=U+O|0,E^=d<<9|d>>>23,d=E+U|0,K^=d<<13|d>>>19,d=K+E|0,O^=d<<18|d>>>14,d=B+W|0,S^=d<<7|d>>>25,d=S+B|0,oe^=d<<9|d>>>23,d=oe+S|0,W^=d<<13|d>>>19,d=W+oe|0,B^=d<<18|d>>>14,d=C+w|0,se^=d<<7|d>>>25,d=se+C|0,I^=d<<9|d>>>23,d=I+se|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ie+M|0,R^=d<<7|d>>>25,d=R+ie|0,v^=d<<9|d>>>23,d=v+R|0,M^=d<<13|d>>>19,d=M+v|0,ie^=d<<18|d>>>14,d=O+R|0,W^=d<<7|d>>>25,d=W+O|0,I^=d<<9|d>>>23,d=I+W|0,R^=d<<13|d>>>19,d=R+I|0,O^=d<<18|d>>>14,d=B+U|0,w^=d<<7|d>>>25,d=w+B|0,v^=d<<9|d>>>23,d=v+w|0,U^=d<<13|d>>>19,d=U+v|0,B^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=ie+se|0,K^=d<<7|d>>>25,d=K+ie|0,oe^=d<<9|d>>>23,d=oe+K|0,se^=d<<13|d>>>19,d=se+oe|0,ie^=d<<18|d>>>14;r[0]=O>>>0&255,r[1]=O>>>8&255,r[2]=O>>>16&255,r[3]=O>>>24&255,r[4]=B>>>0&255,r[5]=B>>>8&255,r[6]=B>>>16&255,r[7]=B>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ie>>>0&255,r[13]=ie>>>8&255,r[14]=ie>>>16&255,r[15]=ie>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function fe(r,a,i,e){le(r,a,i,e)}function ae(r,a,i,e){Y(r,a,i,e)}var ue=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function We(r,a,i,e,s,g,m){var k=new Uint8Array(16),L=new Uint8Array(64),G,z;for(z=0;z<16;z++)k[z]=0;for(z=0;z<8;z++)k[z]=g[z];for(;s>=64;){for(fe(L,k,m,ue),z=0;z<64;z++)r[a+z]=i[e+z]^L[z];for(G=1,z=8;z<16;z++)G=G+(k[z]&255)|0,k[z]=G&255,G>>>=8;s-=64,a+=64,e+=64}if(s>0)for(fe(L,k,m,ue),z=0;z<s;z++)r[a+z]=i[e+z]^L[z];return 0}function ke(r,a,i,e,s){var g=new Uint8Array(16),m=new Uint8Array(64),k,L;for(L=0;L<16;L++)g[L]=0;for(L=0;L<8;L++)g[L]=e[L];for(;i>=64;){for(fe(m,g,s,ue),L=0;L<64;L++)r[a+L]=m[L];for(k=1,L=8;L<16;L++)k=k+(g[L]&255)|0,g[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(fe(m,g,s,ue),L=0;L<i;L++)r[a+L]=m[L];return 0}function Me(r,a,i,e,s){var g=new Uint8Array(32);ae(g,e,s,ue);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return ke(r,a,i,m,g)}function Pe(r,a,i,e,s,g,m){var k=new Uint8Array(32);ae(k,g,m,ue);for(var L=new Uint8Array(8),G=0;G<8;G++)L[G]=g[G+16];return We(r,a,i,e,s,L,k)}var Ce=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,g,m,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,g=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|g<<12)&255,this.r[5]=g>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(g>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};Ce.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,g,m,k,L,G,z,ge,$,V,Z,re,ne,Q,ee,J,O,W,I,R=this.h[0],U=this.h[1],B=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],K=this.h[9],oe=this.r[0],se=this.r[1],ie=this.r[2],d=this.r[3],de=this.r[4],be=this.r[5],he=this.r[6],ce=this.r[7],xe=this.r[8],ye=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,R+=s&8191,g=r[a+2]&255|(r[a+3]&255)<<8,U+=(s>>>13|g<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,B+=(g>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,G=r[a+10]&255|(r[a+11]&255)<<8,S+=(L>>>14|G<<2)&8191,z=r[a+12]&255|(r[a+13]&255)<<8,C+=(G>>>11|z<<5)&8191,ge=r[a+14]&255|(r[a+15]&255)<<8,M+=(z>>>8|ge<<8)&8191,K+=ge>>>5|e,$=0,V=$,V+=R*oe,V+=U*(5*ye),V+=B*(5*xe),V+=w*(5*ce),V+=v*(5*he),$=V>>>13,V&=8191,V+=E*(5*be),V+=S*(5*de),V+=C*(5*d),V+=M*(5*ie),V+=K*(5*se),$+=V>>>13,V&=8191,Z=$,Z+=R*se,Z+=U*oe,Z+=B*(5*ye),Z+=w*(5*xe),Z+=v*(5*ce),$=Z>>>13,Z&=8191,Z+=E*(5*he),Z+=S*(5*be),Z+=C*(5*de),Z+=M*(5*d),Z+=K*(5*ie),$+=Z>>>13,Z&=8191,re=$,re+=R*ie,re+=U*se,re+=B*oe,re+=w*(5*ye),re+=v*(5*xe),$=re>>>13,re&=8191,re+=E*(5*ce),re+=S*(5*he),re+=C*(5*be),re+=M*(5*de),re+=K*(5*d),$+=re>>>13,re&=8191,ne=$,ne+=R*d,ne+=U*ie,ne+=B*se,ne+=w*oe,ne+=v*(5*ye),$=ne>>>13,ne&=8191,ne+=E*(5*xe),ne+=S*(5*ce),ne+=C*(5*he),ne+=M*(5*be),ne+=K*(5*de),$+=ne>>>13,ne&=8191,Q=$,Q+=R*de,Q+=U*d,Q+=B*ie,Q+=w*se,Q+=v*oe,$=Q>>>13,Q&=8191,Q+=E*(5*ye),Q+=S*(5*xe),Q+=C*(5*ce),Q+=M*(5*he),Q+=K*(5*be),$+=Q>>>13,Q&=8191,ee=$,ee+=R*be,ee+=U*de,ee+=B*d,ee+=w*ie,ee+=v*se,$=ee>>>13,ee&=8191,ee+=E*oe,ee+=S*(5*ye),ee+=C*(5*xe),ee+=M*(5*ce),ee+=K*(5*he),$+=ee>>>13,ee&=8191,J=$,J+=R*he,J+=U*be,J+=B*de,J+=w*d,J+=v*ie,$=J>>>13,J&=8191,J+=E*se,J+=S*oe,J+=C*(5*ye),J+=M*(5*xe),J+=K*(5*ce),$+=J>>>13,J&=8191,O=$,O+=R*ce,O+=U*he,O+=B*be,O+=w*de,O+=v*d,$=O>>>13,O&=8191,O+=E*ie,O+=S*se,O+=C*oe,O+=M*(5*ye),O+=K*(5*xe),$+=O>>>13,O&=8191,W=$,W+=R*xe,W+=U*ce,W+=B*he,W+=w*be,W+=v*de,$=W>>>13,W&=8191,W+=E*d,W+=S*ie,W+=C*se,W+=M*oe,W+=K*(5*ye),$+=W>>>13,W&=8191,I=$,I+=R*ye,I+=U*xe,I+=B*ce,I+=w*he,I+=v*be,$=I>>>13,I&=8191,I+=E*de,I+=S*d,I+=C*ie,I+=M*se,I+=K*oe,$+=I>>>13,I&=8191,$=($<<2)+$|0,$=$+V|0,V=$&8191,$=$>>>13,Z+=$,R=V,U=Z,B=re,w=ne,v=Q,E=ee,S=J,C=O,M=W,K=I,a+=16,i-=16;this.h[0]=R,this.h[1]=U,this.h[2]=B,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=K},Ce.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,g,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,g=this.h[0]+this.pad[0],this.h[0]=g&65535,m=1;m<8;m++)g=(this.h[m]+this.pad[m]|0)+(g>>>16)|0,this.h[m]=g&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},Ce.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Xe(r,a,i,e,s,g){var m=new Ce(g);return m.update(i,e,s),m.finish(r,a),0}function qe(r,a,i,e,s,g){var m=new Uint8Array(16);return Xe(m,0,i,e,s,g),T(r,a,m,0)}function Oe(r,a,i,e,s){var g;if(i<32)return-1;for(Pe(r,0,a,0,i,e,s),Xe(r,16,r,32,i-32,r),g=0;g<16;g++)r[g]=0;return 0}function yt(r,a,i,e,s){var g,m=new Uint8Array(32);if(i<32||(Me(m,0,32,e,s),qe(a,16,a,32,i-32,m)!==0))return-1;for(Pe(r,0,a,0,i,e,s),g=0;g<32;g++)r[g]=0;return 0}function Ge(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function gt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function Ve(r,a,i){for(var e,s=~(i-1),g=0;g<16;g++)e=s&(r[g]^a[g]),r[g]^=e,a[g]^=e}function nt(r,a){var i,e,s,g=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(gt(m),gt(m),gt(m),e=0;e<2;e++){for(g[0]=m[0]-65517,i=1;i<15;i++)g[i]=m[i]-65535-(g[i-1]>>16&1),g[i-1]&=65535;g[15]=m[15]-32767-(g[14]>>16&1),s=g[15]>>16&1,g[14]&=65535,Ve(m,g,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function Bt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return nt(i,r),nt(e,a),X(i,0,e,0)}function bt(r){var a=new Uint8Array(32);return nt(a,r),a[0]&1}function Ze(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function je(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Re(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function pe(r,a,i){var e,s,g=0,m=0,k=0,L=0,G=0,z=0,ge=0,$=0,V=0,Z=0,re=0,ne=0,Q=0,ee=0,J=0,O=0,W=0,I=0,R=0,U=0,B=0,w=0,v=0,E=0,S=0,C=0,M=0,K=0,oe=0,se=0,ie=0,d=i[0],de=i[1],be=i[2],he=i[3],ce=i[4],xe=i[5],ye=i[6],Ee=i[7],me=i[8],ve=i[9],_e=i[10],Se=i[11],Be=i[12],Ne=i[13],Ie=i[14],Te=i[15];e=a[0],g+=e*d,m+=e*de,k+=e*be,L+=e*he,G+=e*ce,z+=e*xe,ge+=e*ye,$+=e*Ee,V+=e*me,Z+=e*ve,re+=e*_e,ne+=e*Se,Q+=e*Be,ee+=e*Ne,J+=e*Ie,O+=e*Te,e=a[1],m+=e*d,k+=e*de,L+=e*be,G+=e*he,z+=e*ce,ge+=e*xe,$+=e*ye,V+=e*Ee,Z+=e*me,re+=e*ve,ne+=e*_e,Q+=e*Se,ee+=e*Be,J+=e*Ne,O+=e*Ie,W+=e*Te,e=a[2],k+=e*d,L+=e*de,G+=e*be,z+=e*he,ge+=e*ce,$+=e*xe,V+=e*ye,Z+=e*Ee,re+=e*me,ne+=e*ve,Q+=e*_e,ee+=e*Se,J+=e*Be,O+=e*Ne,W+=e*Ie,I+=e*Te,e=a[3],L+=e*d,G+=e*de,z+=e*be,ge+=e*he,$+=e*ce,V+=e*xe,Z+=e*ye,re+=e*Ee,ne+=e*me,Q+=e*ve,ee+=e*_e,J+=e*Se,O+=e*Be,W+=e*Ne,I+=e*Ie,R+=e*Te,e=a[4],G+=e*d,z+=e*de,ge+=e*be,$+=e*he,V+=e*ce,Z+=e*xe,re+=e*ye,ne+=e*Ee,Q+=e*me,ee+=e*ve,J+=e*_e,O+=e*Se,W+=e*Be,I+=e*Ne,R+=e*Ie,U+=e*Te,e=a[5],z+=e*d,ge+=e*de,$+=e*be,V+=e*he,Z+=e*ce,re+=e*xe,ne+=e*ye,Q+=e*Ee,ee+=e*me,J+=e*ve,O+=e*_e,W+=e*Se,I+=e*Be,R+=e*Ne,U+=e*Ie,B+=e*Te,e=a[6],ge+=e*d,$+=e*de,V+=e*be,Z+=e*he,re+=e*ce,ne+=e*xe,Q+=e*ye,ee+=e*Ee,J+=e*me,O+=e*ve,W+=e*_e,I+=e*Se,R+=e*Be,U+=e*Ne,B+=e*Ie,w+=e*Te,e=a[7],$+=e*d,V+=e*de,Z+=e*be,re+=e*he,ne+=e*ce,Q+=e*xe,ee+=e*ye,J+=e*Ee,O+=e*me,W+=e*ve,I+=e*_e,R+=e*Se,U+=e*Be,B+=e*Ne,w+=e*Ie,v+=e*Te,e=a[8],V+=e*d,Z+=e*de,re+=e*be,ne+=e*he,Q+=e*ce,ee+=e*xe,J+=e*ye,O+=e*Ee,W+=e*me,I+=e*ve,R+=e*_e,U+=e*Se,B+=e*Be,w+=e*Ne,v+=e*Ie,E+=e*Te,e=a[9],Z+=e*d,re+=e*de,ne+=e*be,Q+=e*he,ee+=e*ce,J+=e*xe,O+=e*ye,W+=e*Ee,I+=e*me,R+=e*ve,U+=e*_e,B+=e*Se,w+=e*Be,v+=e*Ne,E+=e*Ie,S+=e*Te,e=a[10],re+=e*d,ne+=e*de,Q+=e*be,ee+=e*he,J+=e*ce,O+=e*xe,W+=e*ye,I+=e*Ee,R+=e*me,U+=e*ve,B+=e*_e,w+=e*Se,v+=e*Be,E+=e*Ne,S+=e*Ie,C+=e*Te,e=a[11],ne+=e*d,Q+=e*de,ee+=e*be,J+=e*he,O+=e*ce,W+=e*xe,I+=e*ye,R+=e*Ee,U+=e*me,B+=e*ve,w+=e*_e,v+=e*Se,E+=e*Be,S+=e*Ne,C+=e*Ie,M+=e*Te,e=a[12],Q+=e*d,ee+=e*de,J+=e*be,O+=e*he,W+=e*ce,I+=e*xe,R+=e*ye,U+=e*Ee,B+=e*me,w+=e*ve,v+=e*_e,E+=e*Se,S+=e*Be,C+=e*Ne,M+=e*Ie,K+=e*Te,e=a[13],ee+=e*d,J+=e*de,O+=e*be,W+=e*he,I+=e*ce,R+=e*xe,U+=e*ye,B+=e*Ee,w+=e*me,v+=e*ve,E+=e*_e,S+=e*Se,C+=e*Be,M+=e*Ne,K+=e*Ie,oe+=e*Te,e=a[14],J+=e*d,O+=e*de,W+=e*be,I+=e*he,R+=e*ce,U+=e*xe,B+=e*ye,w+=e*Ee,v+=e*me,E+=e*ve,S+=e*_e,C+=e*Se,M+=e*Be,K+=e*Ne,oe+=e*Ie,se+=e*Te,e=a[15],O+=e*d,W+=e*de,I+=e*be,R+=e*he,U+=e*ce,B+=e*xe,w+=e*ye,v+=e*Ee,E+=e*me,S+=e*ve,C+=e*_e,M+=e*Se,K+=e*Be,oe+=e*Ne,se+=e*Ie,ie+=e*Te,g+=38*W,m+=38*I,k+=38*R,L+=38*U,G+=38*B,z+=38*w,ge+=38*v,$+=38*E,V+=38*S,Z+=38*C,re+=38*M,ne+=38*K,Q+=38*oe,ee+=38*se,J+=38*ie,s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=ge+s+65535,s=Math.floor(e/65536),ge=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,g+=s-1+37*(s-1),s=1,e=g+s+65535,s=Math.floor(e/65536),g=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=ge+s+65535,s=Math.floor(e/65536),ge=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=O+s+65535,s=Math.floor(e/65536),O=e-s*65536,g+=s-1+37*(s-1),r[0]=g,r[1]=m,r[2]=k,r[3]=L,r[4]=G,r[5]=z,r[6]=ge,r[7]=$,r[8]=V,r[9]=Z,r[10]=re,r[11]=ne,r[12]=Q,r[13]=ee,r[14]=J,r[15]=O}function F(r,a){pe(r,a,a)}function D(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)F(i,i),e!==2&&e!==4&&pe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function q(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)F(i,i),e!==1&&pe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function j(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),g,m,k=o(),L=o(),G=o(),z=o(),ge=o(),$=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,Ze(s,i),m=0;m<16;m++)L[m]=s[m],z[m]=k[m]=G[m]=0;for(k[0]=z[0]=1,m=254;m>=0;--m)g=e[m>>>3]>>>(m&7)&1,Ve(k,L,g),Ve(G,z,g),je(ge,k,G),Re(k,k,G),je(G,L,z),Re(L,L,z),F(z,ge),F($,k),pe(k,G,k),pe(G,L,ge),je(ge,k,G),Re(k,k,G),F(L,k),Re(G,z,$),pe(k,G,b),je(k,k,z),pe(G,G,k),pe(k,z,$),pe(z,L,s),F(L,ge),Ve(k,L,g),Ve(G,z,g);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=G[m],s[m+48]=L[m],s[m+64]=z[m];var V=s.subarray(32),Z=s.subarray(16);return D(V,V),pe(Z,Z,V),nt(r,Z),0}function te(r,a){return j(r,a,f)}function we(r,a){return l(a,32),te(r,a)}function Le(r,a,i){var e=new Uint8Array(32);return j(e,i,a),ae(r,c,e,ue)}var Ae=Oe,ht=yt;function mn(r,a,i,e,s,g){var m=new Uint8Array(32);return Le(m,s,g),Ae(r,a,i,e,m)}function Ke(r,a,i,e,s,g){var m=new Uint8Array(32);return Le(m,s,g),ht(r,a,i,e,m)}var rt=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function rr(r,a,i,e){for(var s=new Int32Array(16),g=new Int32Array(16),m,k,L,G,z,ge,$,V,Z,re,ne,Q,ee,J,O,W,I,R,U,B,w,v,E,S,C,M,K=r[0],oe=r[1],se=r[2],ie=r[3],d=r[4],de=r[5],be=r[6],he=r[7],ce=a[0],xe=a[1],ye=a[2],Ee=a[3],me=a[4],ve=a[5],_e=a[6],Se=a[7],Be=0;e>=128;){for(U=0;U<16;U++)B=8*U+Be,s[U]=i[B+0]<<24|i[B+1]<<16|i[B+2]<<8|i[B+3],g[U]=i[B+4]<<24|i[B+5]<<16|i[B+6]<<8|i[B+7];for(U=0;U<80;U++)if(m=K,k=oe,L=se,G=ie,z=d,ge=de,$=be,V=he,Z=ce,re=xe,ne=ye,Q=Ee,ee=me,J=ve,O=_e,W=Se,w=he,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(d>>>14|me<<18)^(d>>>18|me<<14)^(me>>>9|d<<23),v=(me>>>14|d<<18)^(me>>>18|d<<14)^(d>>>9|me<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=d&de^~d&be,v=me&ve^~me&_e,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=rt[U*2],v=rt[U*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[U%16],v=g[U%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,I=C&65535|M<<16,R=E&65535|S<<16,w=I,v=R,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(K>>>28|ce<<4)^(ce>>>2|K<<30)^(ce>>>7|K<<25),v=(ce>>>28|K<<4)^(K>>>2|ce<<30)^(K>>>7|ce<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=K&oe^K&se^oe&se,v=ce&xe^ce&ye^xe&ye,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,V=C&65535|M<<16,W=E&65535|S<<16,w=G,v=Q,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=I,v=R,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,G=C&65535|M<<16,Q=E&65535|S<<16,oe=m,se=k,ie=L,d=G,de=z,be=ge,he=$,K=V,xe=Z,ye=re,Ee=ne,me=Q,ve=ee,_e=J,Se=O,ce=W,U%16===15)for(B=0;B<16;B++)w=s[B],v=g[B],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(B+9)%16],v=g[(B+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(B+1)%16],R=g[(B+1)%16],w=(I>>>1|R<<31)^(I>>>8|R<<24)^I>>>7,v=(R>>>1|I<<31)^(R>>>8|I<<24)^(R>>>7|I<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(B+14)%16],R=g[(B+14)%16],w=(I>>>19|R<<13)^(R>>>29|I<<3)^I>>>6,v=(R>>>19|I<<13)^(I>>>29|R<<3)^(R>>>6|I<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[B]=C&65535|M<<16,g[B]=E&65535|S<<16;w=K,v=ce,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[0]=K=C&65535|M<<16,a[0]=ce=E&65535|S<<16,w=oe,v=xe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[1]=oe=C&65535|M<<16,a[1]=xe=E&65535|S<<16,w=se,v=ye,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[2]=se=C&65535|M<<16,a[2]=ye=E&65535|S<<16,w=ie,v=Ee,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[3]=ie=C&65535|M<<16,a[3]=Ee=E&65535|S<<16,w=d,v=me,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[4]=d=C&65535|M<<16,a[4]=me=E&65535|S<<16,w=de,v=ve,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[5]=de=C&65535|M<<16,a[5]=ve=E&65535|S<<16,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[6]=be=C&65535|M<<16,a[6]=_e=E&65535|S<<16,w=he,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[7]=he=C&65535|M<<16,a[7]=Se=E&65535|S<<16,Be+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),g=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,rr(e,s,a,i),i%=128,m=0;m<i;m++)g[m]=a[k-i+m];for(g[i]=128,i=256-128*(i<112?1:0),g[i-9]=0,P(g,i-8,k/536870912|0,k<<3),rr(e,s,g,i),m=0;m<8;m++)P(r,8*m,e[m],s[m]);return 0}function Kt(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o(),G=o(),z=o();Re(i,r[1],r[0]),Re(z,a[1],a[0]),pe(i,i,z),je(e,r[0],r[1]),je(z,a[0],a[1]),pe(e,e,z),pe(s,r[3],a[3]),pe(s,s,h),pe(g,r[2],a[2]),je(g,g,g),Re(m,e,i),Re(k,g,s),je(L,g,s),je(G,e,i),pe(r[0],m,k),pe(r[1],G,L),pe(r[2],L,k),pe(r[3],m,G)}function or(r,a,i){var e;for(e=0;e<4;e++)Ve(r[e],a[e],i)}function wn(r,a){var i=o(),e=o(),s=o();D(s,a[2]),pe(i,a[0],s),pe(e,a[1],s),nt(r,e),r[31]^=bt(i)<<7}function vn(r,a,i){var e,s;for(Ge(r[0],u),Ge(r[1],p),Ge(r[2],p),Ge(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,or(r,a,e),Kt(a,r),Kt(r,r),or(r,a,e)}function Ht(r,a){var i=[o(),o(),o(),o()];Ge(i[0],y),Ge(i[1],_),Ge(i[2],p),pe(i[3],y,_),vn(r,i,a)}function _n(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],g;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Ht(s,e),wn(r,s),g=0;g<32;g++)a[g+32]=r[g];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Sn(r,a){var i,e,s,g;for(e=63;e>=32;--e){for(i=0,s=e-32,g=e-12;s<g;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function kn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;Sn(r,a)}function ir(r,a,i,e){var s=new Uint8Array(64),g=new Uint8Array(64),m=new Uint8Array(64),k,L,G=new Float64Array(64),z=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ge=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(lt(m,r.subarray(32),i+32),kn(m),Ht(z,m),wn(r,z),k=32;k<64;k++)r[k]=e[k];for(lt(g,r,i+64),kn(g),k=0;k<64;k++)G[k]=0;for(k=0;k<32;k++)G[k]=m[k];for(k=0;k<32;k++)for(L=0;L<32;L++)G[k+L]+=g[k]*s[L];return Sn(r.subarray(32),G),ge}function lo(r,a){var i=o(),e=o(),s=o(),g=o(),m=o(),k=o(),L=o();return Ge(r[2],p),Ze(r[1],a),F(s,r[1]),pe(g,s,x),Re(s,s,r[2]),je(g,r[2],g),F(m,g),F(k,m),pe(L,k,m),pe(i,L,s),pe(i,i,g),q(i,i),pe(i,i,s),pe(i,i,g),pe(i,i,g),pe(r[0],i,g),F(e,r[0]),pe(e,e,g),Bt(e,s)&&pe(r[0],r[0],N),F(e,r[0]),pe(e,e,g),Bt(e,s)?-1:(bt(r[0])===a[31]>>7&&Re(r[0],u,r[0]),pe(r[3],r[0],r[1]),0)}function Cn(r,a,i,e){var s,g=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||lo(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(m,r,i),kn(m),vn(k,L,m),Ht(L,a.subarray(32)),Kt(k,L),wn(g,k),i-=64,X(a,0,g,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var En=32,Vt=24,zt=32,mt=16,Nt=32,Zt=32,It=32,Tt=32,Mn=32,ar=Vt,co=zt,fo=mt,Qe=64,ct=32,wt=64,Ln=32,An=64;n.lowlevel={crypto_core_hsalsa20:ae,crypto_stream_xor:Pe,crypto_stream:Me,crypto_stream_salsa20_xor:We,crypto_stream_salsa20:ke,crypto_onetimeauth:Xe,crypto_onetimeauth_verify:qe,crypto_verify_16:T,crypto_verify_32:X,crypto_secretbox:Oe,crypto_secretbox_open:yt,crypto_scalarmult:j,crypto_scalarmult_base:te,crypto_box_beforenm:Le,crypto_box_afternm:Ae,crypto_box:mn,crypto_box_open:Ke,crypto_box_keypair:we,crypto_hash:lt,crypto_sign:ir,crypto_sign_keypair:_n,crypto_sign_open:Cn,crypto_secretbox_KEYBYTES:En,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:mt,crypto_scalarmult_BYTES:Nt,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:It,crypto_box_SECRETKEYBYTES:Tt,crypto_box_BEFORENMBYTES:Mn,crypto_box_NONCEBYTES:ar,crypto_box_ZEROBYTES:co,crypto_box_BOXZEROBYTES:fo,crypto_sign_BYTES:Qe,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:wt,crypto_sign_SEEDBYTES:Ln,crypto_hash_BYTES:An,gf:o,D:x,L:Xt,pack25519:nt,unpack25519:Ze,M:pe,A:je,S:F,Z:Re,pow2523:q,add:Kt,set25519:Ge,modL:Sn,scalarmult:vn,scalarbase:Ht};function sr(r,a){if(r.length!==En)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function po(r,a){if(r.length!==It)throw new Error("bad public key size");if(a.length!==Tt)throw new Error("bad secret key size")}function Fe(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function lr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Fe(r,a,i),sr(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+zt]=r[g];return Oe(s,e,e.length,a,i),s.subarray(mt)},n.secretbox.open=function(r,a,i){Fe(r,a,i),sr(i,a);for(var e=new Uint8Array(mt+r.length),s=new Uint8Array(e.length),g=0;g<r.length;g++)e[g+mt]=r[g];return e.length<32||yt(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=En,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=mt,n.scalarMult=function(r,a){if(Fe(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==Nt)throw new Error("bad p size");var i=new Uint8Array(Nt);return j(i,r,a),i},n.scalarMult.base=function(r){if(Fe(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(Nt);return te(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=Nt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Fe(r,a),po(r,a);var i=new Uint8Array(Mn);return Le(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(It),a=new Uint8Array(Tt);return we(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Fe(r),r.length!==Tt)throw new Error("bad secret key size");var a=new Uint8Array(It);return te(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=It,n.box.secretKeyLength=Tt,n.box.sharedKeyLength=Mn,n.box.nonceLength=ar,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Fe(r,a),a.length!==wt)throw new Error("bad secret key size");var i=new Uint8Array(Qe+r.length);return ir(i,r,r.length,a),i},n.sign.open=function(r,a){if(Fe(r,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=Cn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),g=0;g<s.length;g++)s[g]=i[g];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Qe),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Fe(r,a,i),a.length!==Qe)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(Qe+r.length),s=new Uint8Array(Qe+r.length),g;for(g=0;g<Qe;g++)e[g]=a[g];for(g=0;g<r.length;g++)e[g+Qe]=r[g];return Cn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ct),a=new Uint8Array(wt);return _n(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Fe(r),r.length!==wt)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Fe(r),r.length!==Ln)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(wt),e=0;e<32;e++)i[e]=r[e];return _n(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=wt,n.sign.seedLength=Ln,n.sign.signatureLength=Qe,n.hash=function(r){Fe(r);var a=new Uint8Array(An);return lt(a,r,r.length),a},n.hash.hashLength=An,n.verify=function(r,a){return Fe(r,a),r.length===0||a.length===0||r.length!==a.length?!1:A(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,g=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(g.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=g[s];lr(g)})}else typeof Ji<"u"&&(r=na,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,g=r.randomBytes(e);for(s=0;s<e;s++)i[s]=g[s];lr(g)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(Pn)),Pn.exports}var oa=ra();const Kr=Zi(oa);function ia(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const h=t.charAt(x),y=h.charCodeAt(0);if(n[y]!==255)throw new TypeError(h+" is ambiguous");n[y]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),f=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let h=0,y=0,_=0;const N=x.length;for(;_!==N&&x[_]===0;)_++,h++;const P=(N-_)*f+1>>>0,A=new Uint8Array(P);for(;_!==N;){let le=x[_],Y=0;for(let fe=P-1;(le!==0||Y<y)&&fe!==-1;fe--,Y++)le+=256*A[fe]>>>0,A[fe]=le%o>>>0,le=le/o>>>0;if(le!==0)throw new Error("Non-zero carry");y=Y,_++}let T=P-y;for(;T!==P&&A[T]===0;)T++;let X=l.repeat(h);for(;T<P;++T)X+=t.charAt(A[T]);return X}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let h=0,y=0,_=0;for(;x[h]===l;)y++,h++;const N=(x.length-h)*c+1>>>0,P=new Uint8Array(N);for(;h<x.length;){const le=x.charCodeAt(h);if(le>255)return;let Y=n[le];if(Y===255)return;let fe=0;for(let ae=N-1;(Y!==0||fe<_)&&ae!==-1;ae--,fe++)Y+=o*P[ae]>>>0,P[ae]=Y%256>>>0,Y=Y/256>>>0;if(Y!==0)throw new Error("Non-zero carry");_=fe,h++}let A=N-_;for(;A!==N&&P[A]===0;)A++;const T=new Uint8Array(y+(N-A));let X=y;for(;A!==N;)T[X++]=P[A++];return T}function b(x){const h=p(x);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:b}}var aa="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const dn=ia(aa),er="cbsgo_wallet_v3",bn="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(er);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function sa(t){localStorage.setItem(er,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function la(){const t=Kr.sign.keyPair(),n=dn.encode(t.publicKey),o=dn.encode(t.secretKey);return{pk:n,sk:o}}function Hr(){return!!qt()}function ca(){return qt()?sessionStorage.getItem(bn)==="1":!1}function da(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=la();return sa({pk:l,sk:c,pin:n}),sessionStorage.setItem(bn,"1"),l}function fa(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(bn,"1"),n.pk}function He(){const t=qt();return t?t.pk:""}function pa(){localStorage.removeItem(er),sessionStorage.removeItem(bn)}typeof window<"u"&&(window.cbsgoDevResetWallet=pa);const Xr="cbsgoLoginModal";function Vr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Zr(){const t=document.getElementById(Xr);t&&t.remove()}function ua(t){Zr();const n=document.createElement("div");return n.id=Xr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function xa(t,n){return`
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
  `}function hr(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ya(){const t=!Hr();let n="";try{const h=xt();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
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
    `,l=ua(xa(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),f=h=>{c&&(c.textContent=h||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),b=l.querySelector("#cbsgoNick"),x=()=>{Zr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const y=String(b?.value||"").trim(),_=String(u?.value||"").trim(),N=String(p?.value||"").trim();if(y.length<2)return f("⛔ Nickname too short.");if(_.length<4)return f("⛔ PIN must be at least 4 digits.");if(_!==N)return f("⛔ PINs do not match.");f("Creating wallet…"),Ur(y),await da(_),f("✅ Wallet created. Starting…"),x()}catch(y){f(`⛔ ${String(y?.message||y)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return f("⛔ PIN must be at least 4 digits.");f("Unlocking…"),await fa(y),f("✅ Unlocked."),x()}catch{f("⛔ Wrong PIN (or wallet data missing).")}})}}const Qr="cbsgo_solana_wallet_v1";function ga(t,n=null){try{const o=JSON.parse(t);return!o||typeof o!="object"||typeof o.publicKey!="string"||typeof o.secretKey!="string"?n:o}catch{return n}}function ba(){const t=Kr.sign.keyPair(),n=dn.encode(t.publicKey),o=dn.encode(t.secretKey),l={publicKey:n,secretKey:o,createdAt:new Date().toISOString(),version:1};try{localStorage.setItem(Qr,JSON.stringify(l))}catch(c){console.warn("CBS GO: failed to persist local Solana wallet",c)}return l}function ha(){try{const t=localStorage.getItem(Qr);return t?ga(t,null):null}catch{return null}}function ma(){let t=ha();return t||(t=ba(),t)}function tr(){return ma().publicKey}const wa="https://cxfedvowjgkqrakkkjpi.supabase.co",va="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Ue=uo(wa,va);function _a(){const t=He();if(!t)return null;const n=xt(),o=gn();let l=null;try{l=tr()}catch(c){console.warn("CBS GO: kon lokale Solana wallet niet lezen/aanmaken (solana_pk blijft leeg)",c)}return{wallet_pk:t,nickname:n,avatar:o,solana_pk:l}}async function an(t={}){try{const n=_a();if(!n){console.warn("CBS GO: no game wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Ue.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const Sa=15e3,ka=1e4,Ca=300*1e3;let Pt=null,mr=0,wr=0;function Ea(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Pt={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",Ea));async function Ma(){const t=He();if(!t||!Pt)return;const n=Date.now();if(n-mr<5e3)return;mr=n;const l=(xt()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Pt.lat,lng:Pt.lng,heading:Pt.heading,last_seen:new Date().toISOString()};try{const{data:f,error:u}=await Ue.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(f&&f.length>0){const p=f[0].id,{error:b}=await Ue.from("player_state").update(c).eq("id",p);b&&console.warn("CBS GO: player_state update failed",b)}else{const{error:p}=await Ue.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(f){console.warn("CBS GO: pushMyState error",f)}}async function La(){const t=He();if(!t)return;const n=Date.now();if(n-wr<3e3)return;wr=n;const o=new Date(Date.now()-Ca).toISOString();try{const{data:l,error:c}=await Ue.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const f=Array.isArray(l)?l:[],u=Array.from(new Set(f.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:h}=await Ue.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const b=f.map(x=>{const h=x.lat,y=x.lng,_=typeof h=="number"?h:parseFloat(h),N=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite(N))return null;const P=p.get(x.wallet_pk)||null,A=P&&P.nickname||x.nickname||"Anon",T=P&&P.avatar?String(P.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:A,avatar:T,lat:_,lng:N,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:b}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function Aa(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{Ma()},Sa),setInterval(()=>{La()},ka))}Aa();function Jr(){const t=He();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function fn(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Ba(t){const n=Jr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Ue.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw fn("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function za(t){const n=Jr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await Ue.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw fn("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function eo(){const t=He();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Ue.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw fn("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],f=[];for(const p of l){const b=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!b&&!x)continue;const h=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:h,nickname:null,avatar:""};b&&c.push(y),x&&f.push(y)}const u=Array.from(new Set([...c,...f].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:b}=await Ue.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!b&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const h=y=>{y.forEach(_=>{const N=x.get(_.otherWallet);N&&(_.nickname=N.nickname||null,_.avatar=N.avatar||"")})};h(c),h(f)}else b&&fn("loadFriendsOverview:players",b)}return{incoming:c,accepted:f}}let Rt=null;async function to(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Rt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Rt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Na(){try{Rt&&(await Rt.release(),Rt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Ia(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await to():await Na()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}const Dn="cbsgo_trades";async function Ta(t,n){const o=He();if(!o)throw new Error("No local CBS-GO wallet available.");const l=xt(),c=gn(),f=Number(n?.tickets||0),u=Number(n?.cbs||0),p=n?.cardId||null,b=p?Number(n?.cardQty||0):0;if(!f&&!u&&!p)throw new Error("Nothing to send.");const x=Jt(),h=en();if(f>0&&f>x)throw new Error("Not enough tickets in your bag.");if(u>0&&u>h)throw new Error("Not enough CBS (play money) in your bag.");const{error:y}=await Ue.from(Dn).insert({from_wallet:o,to_wallet:t,tickets:f,cbs:u,card_id:p,card_qty:b,sender_nickname:l||null,sender_avatar:c||null,claimed:!1});if(y)throw console.warn("CBS GO: sendGiftToWallet failed",y),new Error(y.message||"Could not send gift.");try{const _=Jt(),N=en();console.log("CBS GO: deducting from bag",{tickets:f,cbs:u,beforeTickets:_,beforeCbs:N}),f>0&&At(-f),u>0&&xn(-u);const P=Jt(),A=en();console.log("CBS GO: bag after deduct",{afterTickets:P,afterCbs:A}),typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}catch(_){console.warn("CBS GO: failed to update local bag after trade",_)}}let On=!1;async function no(){const t=He();if(t&&!On){On=!0;try{const{data:n,error:o}=await Ue.from(Dn).select("*").eq("to_wallet",t).eq("claimed",!1).order("created_at",{ascending:!0}).limit(50);if(o){console.warn("CBS GO: pullIncomingGifts failed",o);return}if(!n||!n.length)return;for(const l of n){const c=l.id,{data:f,error:u}=await Ue.from(Dn).update({claimed:!0}).eq("id",c).eq("claimed",!1).select("id");if(u){console.warn("CBS GO: failed to mark trade as claimed",u);continue}if(!f||!f.length)continue;const p=Number(l.tickets||0),b=Number(l.cbs||0),x=l.card_id||null,h=Number(l.card_qty||0);p&&At(p),b&&xn(b),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:{senderNickname:l.sender_nickname||"",senderAvatar:l.sender_avatar||"",toWallet:l.to_wallet,tickets:p,cbs:b,cardId:x,cardQty:h}}))}typeof window<"u"&&(window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged")),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged")))}finally{On=!1}}}function ze(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function nr(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const ro="cbsgo_cards_v1";function $a(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Wt(){const t=localStorage.getItem(ro),n=$a(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function oo(t){const n={counts:{...t||{}}};try{localStorage.setItem(ro,JSON.stringify(n))}catch{}}function Yn(){const t=Wt(),n=pt();n.cards={...t||{}},Hn(n)}const Pa=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function Oa(){const t=Wt();let n=0,o=0;const l=[];for(const c of Pa){const f=Number(t[c.id]||0);Number.isFinite(f)&&f>0&&(n+=1,o+=f,l.push({id:c.id,count:f,label:c.label}))}return{cardTypes:n,cardTotal:o,sendable:l}}function hn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function qn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function vr(t,n){return`
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
  `}function ja(){const t=xt(),n=gn(),o=He();return`
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
  `}function Ra(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=A=>{const T=document.querySelector("#profileMsg");T&&(T.textContent=A||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const f=()=>{if(!t)return;const A=Ur(t.value);c(`✅ Name saved: ${A}`);try{an()}catch(T){console.warn("CBS GO: failed to sync profile after name change",T)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(f,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),f()})),n&&n.addEventListener("change",()=>{const A=n.files&&n.files[0];if(!A)return;if(A.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const T=new FileReader;T.onload=()=>{li(String(T.result||"")),c("✅ Photo saved"),Lt();try{an()}catch(X){console.warn("CBS GO: failed to sync profile after avatar change",X)}},T.onerror=()=>c("⛔ Failed to read image."),T.readAsDataURL(A)}),o&&(o.onclick=()=>{ci(),c("✅ Photo removed"),Lt();try{an()}catch(A){console.warn("CBS GO: failed to sync profile after avatar removal",A)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),b=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),h=document.querySelector("#friendsAcceptedList"),y=A=>{b&&(b.textContent=A||"")},_=A=>{if(!A)return"";const T=String(A);return T.length<=12?T:`${T.slice(0,5)}…${T.slice(-4)}`},N=(A,T="")=>{const X=A.nickname&&A.nickname.trim()?A.nickname.trim():_(A.otherWallet),le=_(A.otherWallet);return`
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
              ${ze(X||"Friend")}
            </div>
            ${le?`<div style="font-size:11px;opacity:.7;">${ze(le)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${T||""}
        </div>
      </div>
    `};async function P(){if(!(!x||!h))try{x.textContent="Loading…",h.textContent="Loading…";const A=await eo();A.incoming.length?x.innerHTML=A.incoming.map(T=>{const X=`
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
            `;return N(T,X)}).join(""):x.textContent="No incoming requests.",A.accepted.length?h.innerHTML=A.accepted.map(T=>{const X=`
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
            `;return N(T,X)}).join(""):h.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(T=>{T.addEventListener("click",async()=>{const X=T.getAttribute("data-friend-id");if(X){y("Accepting friend…"),T.disabled=!0;try{await za(X),y("✅ Friend added."),await P()}catch(le){console.warn(le),y(`⛔ ${le.message||le}`),T.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(T=>{T.addEventListener("click",async()=>{const X=T.getAttribute("data-wallet")||"";if(X)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(X),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(le){console.warn("CBS GO: copy friend wallet failed",le),y("⛔ Could not copy wallet address.")}})})}catch(A){console.warn("CBS GO: refreshFriends failed",A),x.textContent="Could not load friends.",h.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const A=u.value.trim();if(!A){y("Enter a wallet address first.");return}y("Sending friend request…"),p.disabled=!0;try{await Ba(A),y("✅ Friend request sent."),u.value="",await P()}catch(T){console.warn(T),y(`⛔ ${T.message||T}`)}finally{p.disabled=!1}}),P().catch(()=>{})}function Fa(){const t=Jt(),n=en(),o=He(),l=tr(),{cardTypes:c,cardTotal:f,sendable:u}=Oa(),p=f>0?`You own ${f} cards (${c} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",x=u.length>0?`
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
            ${u.map(h=>`<option value="${ze(h.id)}">${ze(h.label||h.id)} (x${h.count})</option>`).join("")}
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
                CBS-GO wallet (local, game-only – used for tickets, CBS play & cards)
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
                Copy game wallet
              </button>
              <div id="bagMsg" style="margin-top:6px; font-size:11px; opacity:.85;"></div>
            </div>
          `:""}

      ${l?`
            <div style="
              margin-top:12px;
              padding:10px 12px;
              border-radius:14px;
              border:1px solid rgba(56,189,248,.85);
              background:rgba(8,12,24,.96);
            ">
              <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:8px;
                flex-wrap:wrap;
                margin-bottom:6px;
              ">
                <div>
                  <div style="font-size:12px; opacity:.9; font-weight:600;">
                    🪙 CBS-GO Solana wallet (real crypto)
                  </div>
                  <div style="font-size:11px; opacity:.75; max-width:260px;">
                    This is your real wallet on the Solana blockchain. Later you can receive CBS Coin & SPL tokens here.
                  </div>
                </div>
              </div>
              <div style="
                font-size:11px;
                opacity:.95;
                padding:6px 8px;
                border-radius:10px;
                border:1px solid rgba(56,189,248,.7);
                background:rgba(15,23,42,1);
                word-break:break-all;
                font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                margin-bottom:8px;
              ">
                ${ze(l)}
              </div>
              <button id="cbsgoCopySolWalletBtn" type="button" style="
                padding:8px 10px;
                border-radius:999px;
                border:1px solid rgba(56,189,248,.9);
                background:rgba(56,189,248,.18);
                color:#e0f2fe;
                font-size:12px;
                font-weight:600;
                cursor:pointer;
              ">
                Copy Solana address
              </button>
              <div id="bagSolMsg" style="margin-top:6px; font-size:11px; opacity:.85;">
                Keep this safe – tokens sent here are on the real blockchain.
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
  `}function Ua(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoCopySolWalletBtn"),l=document.querySelector("#bagSolMsg"),c=document.querySelector("#cbsgoOpenCardsBtn");c&&(c.onclick=()=>{try{Vi()}catch(Y){console.warn("CBS GO: openCardsPanel failed",Y)}});try{Yn()}catch(Y){console.warn("CBS GO: failed to sync inventory cards from bag",Y)}const f=He(),u=tr(),p=document.querySelector("#giftWalletInput"),b=document.querySelector("#giftFriendSelect"),x=document.querySelector("#giftTicketsInput"),h=document.querySelector("#giftCbsInput"),y=document.querySelector("#giftCardSelect"),_=document.querySelector("#giftCardQtyInput"),N=document.querySelector("#giftSendBtn"),P=document.querySelector("#giftMsg"),A=Y=>{P&&(P.textContent=Y||"")};async function T(){if(b)try{const Y=await eo(),fe=[];fe.push('<option value="">-- No friend selected --</option>'),Y.accepted&&Y.accepted.length&&Y.accepted.forEach(ae=>{const ue=ae.otherWallet||"";if(!ue)return;const We=ae.nickname&&ae.nickname.trim()?ae.nickname.trim():ue,ke=ze(We),Me=ue.length>12?`${ue.slice(0,5)}…${ue.slice(-4)}`:ue,Pe=`${ke} (${ze(Me)})`;fe.push(`<option value="${ze(ue)}">${Pe}</option>`)}),b.innerHTML=fe.join("")}catch(Y){console.warn("CBS GO: populateFriendSelect failed",Y),b.innerHTML='<option value="">-- Friends not available --</option>'}}T().catch(()=>{}),N&&(p||b)&&N.addEventListener("click",async()=>{let Y=p&&p.value?p.value.trim():"";if((!Y||!Y.length)&&b){const Ce=b.value.trim();Ce&&(Y=Ce)}const fe=x?.value??"",ae=h?.value??"",ue=y?y.value.trim():"",We=_?.value??"",ke=Number(We||"0"),Me=Number(fe||"0"),Pe=Number(ae||"0");if(!Y){A("Enter a wallet address first, or pick a friend.");return}if((!Me||Me<=0)&&(!Pe||Pe<=0)&&!ue){A("Set tickets and/or CBS above 0, or choose a card.");return}if(ue&&(!ke||ke<=0)){A("Set card quantity above 0.");return}if(ue&&ke>0){const Ce=Wt(),Xe=Number(Ce[ue]||0);if(!Number.isFinite(Xe)||Xe<ke){A("Not enough of that card in your collection.");return}}N.disabled=!0,A("Sending gift…");try{if(await Ta(Y,{tickets:Me,cbs:Pe,cardId:ue||null,cardQty:ue?ke:0}),ue&&ke>0){const Ce=Wt(),qe=Number(Ce[ue]||0)-ke;qe>0?Ce[ue]=qe:delete Ce[ue],oo(Ce),Yn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...Ce}}}))}A("✅ Gift sent."),x&&(x.value=""),h&&(h.value=""),_&&(_.value=""),y&&(y.value=""),b&&(b.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:Y,tickets:Me,cbs:Pe,cardId:ue||null,cardQty:ue?ke:0}}))}catch(Ce){console.warn(Ce),A(`⛔ ${Ce.message||"Could not send gift."}`)}finally{N.disabled=!1}});const X=Y=>{n&&(n.textContent=Y||"")},le=Y=>{l&&(l.textContent=Y||"")};t&&f&&(t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(f),X("✅ Game wallet copied to clipboard.")):X("📋 Copy not supported in this browser.")}catch{X("⛔ Failed to copy address.")}}),o&&u&&(o.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(u),le("✅ Solana address copied to clipboard.")):le("📋 Copy not supported in this browser.")}catch{le("⛔ Failed to copy Solana address.")}}),no().catch(()=>{})}function io(){const t=hn();return t==="profile"?vr("Profile",`<div id="profileMount">${ja()}</div>`):t==="bag"?vr("Bag",`<div id="bagMount">${Fa()}</div>`):""}function Ga(){return`
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
          ${Or()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${jr()}
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
        ${io()}
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

      ${Rr()?`<button id="resetBtn" type="button" style="
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
  `}function Lt(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=io();const n=hn();n==="profile"&&Ra(),n==="bag"&&Ua();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{qn("map"),Lt()})}function Wa(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=hn();qn(o===n?"map":n||"map"),Lt()})})}function _r(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:c,toWallet:f,tickets:u=0,cbs:p=0,cardId:b=null,cardQty:x=0}=t||{};if(!u&&!p&&!(b&&x))return;n.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.78)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=xt(),N=o==="sent"?"Gift sent":"You received a gift",P=[];u&&P.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&P.push(`🪙 ${p} CBS`),b&&x&&P.push(`🃏 ${x} card${x===1?"":"s"}`);const A=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${ze(_)}</b> to <span style="opacity:.9;">${ze(f||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${ze(l||"Friend")}</b>
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
        <div style="font-size:15px;font-weight:800;">${ze(N)}</div>
        ${A}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${ze(P.join(" · "))}
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
  `,h.appendChild(y),n.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const X=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},le=document.getElementById("cbsgoTradePopupCloseBtn");le&&(le.onclick=X),h.addEventListener("click",Y=>{Y.target===h&&X()})}function Sr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ga();try{to(),Ia()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{an()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Wa(),Di(),ai(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=jr())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Or())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{hn()==="bag"&&Lt()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let b=p.querySelector(".cbsgoToastBox");b||(b=document.createElement("div"),b.className="cbsgoToastBox",b.style.pointerEvents="auto",b.style.padding="8px 12px",b.style.borderRadius="999px",b.style.border="1px solid rgba(255,255,255,.25)",b.style.background="rgba(10,12,18,.88)",b.style.backdropFilter="blur(10px)",b.style.color="#fff",b.style.fontFamily="system-ui,sans-serif",b.style.fontSize="11px",b.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",b.style.opacity="0",b.style.transform="translateY(10px)",b.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(b)),b.textContent=u||"",b.style.opacity="1",b.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{b.style.opacity="0",b.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},b=Number(p.xp||0),x=Number(p.tickets||0),h=Number(p.cbs||0);if(!b&&!x&&!h)return;const y=[];b&&y.push(`+${b} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),h&&y.push(`+${h} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const b=Number(u?.steps||0),x=Number(u?.goal||0),h=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const N=x?`${b}/${x} steps`:`${b} steps`;_.innerHTML=`
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const P=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoDailyGoalCloseBtn");A&&(A.onclick=P),y.addEventListener("click",T=>{T.target===y&&P()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const b=Number(u?.xp||0),x=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!b&&!x&&!h)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const N=[];b&&N.push(`+${b} XP`),x&&N.push(`+${x} ticket${x===1?"":"s"}`),h&&N.push(`+${h} CBS`),_.innerHTML=`
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
    `,h.appendChild(y),p.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},N=document.getElementById("cbsgoStreakCloseBtn");N&&(N.onclick=_),h.addEventListener("click",P=>{P.target===h&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{f(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{_r(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{},b=p.cardId||null,x=Number(p.cardQty||0);if(b&&x>0){const h=Wt(),_=Number(h[b]||0)+x;h[b]=_,oo(h),Yn(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{cards:{...h}}}))}_r>{fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0}})),Lt(),Rr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",si)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){Rn({id:"__daily__",name:"Daily Glow"});return}if(Ar(p))return;const b=wo.find(x=>x.id===p);b&&Rn(b)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&go(async()=>{const{completeNode:b}=await Promise.resolve().then(()=>So);return{completeNode:b}},void 0).then(({completeNode:b})=>{b(p),ao()})})),no().catch(()=>{})}function ao(){if(!document.querySelector("#app"))return;if(Hr()&&ca()){Sr();return}ya();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),Sr()};window.addEventListener("cbsgo:loginDone",n)}function so(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function pn(t){const n=so();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";pn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{pn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function kr(){try{if(!document.getElementById("app")){pn("❌ #app not found in index.html");return}ao();const n=so();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){pn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",kr,{once:!0}):kr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
