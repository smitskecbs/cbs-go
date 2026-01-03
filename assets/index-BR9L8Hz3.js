import{createClient as io}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))l(f);new MutationObserver(f=>{for(const c of f)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(f){const c={};return f.integrity&&(c.integrity=f.integrity),f.referrerPolicy&&(c.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?c.credentials="include":f.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(f){if(f.ep)return;f.ep=!0;const c=o(f);fetch(f.href,c)}})();const ao="modulepreload",so=function(t){return"/cbs-go/"+t},rr={},lo=function(n,o,l){let f=Promise.resolve();if(o&&o.length>0){let y=function(x){return Promise.all(x.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");f=y(o.map(x=>{if(x=so(x),x in rr)return;rr[x]=!0;const h=x.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${g}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":ao,h||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),h)return new Promise((A,G)=>{_.addEventListener("load",A),_.addEventListener("error",()=>G(new Error(`Unable to preload CSS for ${x}`)))})}))}function c(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return f.then(u=>{for(const p of u||[])p.status==="rejected"&&c(p.reason);return n().catch(c)})},Pn="cbsgoLevelUpOverlay",or="cbsgoLevelUpStyles",An="https://smitskecbs.github.io/cbs-go/";function co(){if(document.getElementById(or))return;const t=document.createElement("style");t.id=or,t.textContent=`
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
  `,document.head.appendChild(t)}function zn(){const t=document.getElementById(Pn);t&&t.remove()}function fo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const f=document.createElement("div");f.className="cbsgoConfettiPiece";const c=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;f.style.left=`${c}%`,f.style.top="-10px",f.style.background=n[Math.floor(Math.random()*n.length)],f.style.animationDelay=`${u}s`,f.style.animationDuration=`${p}s`,t.appendChild(f),setTimeout(()=>f.remove(),(u+p+.3)*1e3)}}function ir(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function po(t){co(),zn();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=Pn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
  `,document.body.appendChild(l);const f=l.querySelector("#cbsgoLevelUpConfettiHost");f&&fo(f);const c=()=>zn(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),y=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=c),p&&(p.onclick=c),y&&(y.onclick=()=>{const g=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${An}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(g)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(An),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+An)}}),setTimeout(()=>{document.getElementById(Pn)&&zn()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{po(t?.detail||{})}));const uo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],mr="cbsgo_state_v6";function xo(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function go(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ft(){const t=localStorage.getItem(mr);return xo(t,go())}function wr(t){t.updatedAt=Date.now(),localStorage.setItem(mr,JSON.stringify(t))}function Wn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function pn(){return Number(Ft().xp||0)}function Gt(){const t=pn();let n=1,o=t;for(;;){const l=Wn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function vr(){const t=pn();let n=1,o=t;for(;;){const l=Wn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function _r(){return Wn(Gt())}function Dt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ft();const o=Gt(),l=Ft();l.xp=Number(l.xp||0)+n,wr(l);const f=Gt();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:f}})),f>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:f,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:f,xp:l.xp}}))),l}function Sr(t){const n=String(t||"");if(!n)return!1;const o=Ft();return!!(o.completed&&o.completed[n])}function kr(t){const n=String(t||"");if(!n)return;const o=Ft();o.completed||(o.completed={}),o.completed[n]=Date.now(),wr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const yo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Dt,completeNode:kr,getLevel:Gt,getXp:pn,getXpIntoLevel:vr,getXpNeededThisLevel:_r,isNodeCompleted:Sr},Symbol.toStringTag,{value:"Module"})),Cr="cbsgoPuzzleModal";function bo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nn(){const t=document.getElementById(Cr);t&&t.remove()}function On(t){Nn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],f=["🍬","💎","⭐","🍀","🔮"],c=180,u=18,p=l.length,y=.01;let x=[],h=null,g=0,_=u,A=!1,G=!1,R=null;const pe=t?.name||"CBS GO Puzzle",fe=document.createElement("div");fe.id=Cr,fe.style.position="fixed",fe.style.inset="0",fe.style.zIndex="999999",fe.style.display="flex",fe.style.alignItems="center",fe.style.justifyContent="center",fe.style.padding="16px",fe.style.background="rgba(0,0,0,.70)",fe.style.backdropFilter="blur(12px)",fe.style.fontFamily="system-ui, sans-serif",fe.style.color="#fff",fe.innerHTML=`
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
          ${bo(pe)}
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
  `,document.body.appendChild(fe);const de=document.getElementById("cbsgoBoard"),T=document.getElementById("cbsgoScore"),z=document.getElementById("cbsgoMoves"),D=document.getElementById("cbsgoStatus"),ue=document.getElementById("cbsgoPuzzleClose"),$e=document.getElementById("cbsgoPuzzleOk"),Be=document.getElementById("cbsgoConfettiLayer");function Pe(U){D&&(D.textContent=U||"")}function it(){if(!Be)return;Be.style.display="block",Be.innerHTML="";const U=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],q=40;for(let H=0;H<q;H++){const O=document.createElement("div"),te=6+Math.floor(Math.random()*6),we=Math.random()*100,Ce=Math.random()*.6,Ee=1+Math.random()*.6,yt=Math.random()*360;O.style.position="absolute",O.style.top="-10%",O.style.left=`${we}%`,O.style.width=`${te}px`,O.style.height=`${te*2}px`,O.style.background=U[H%U.length],O.style.opacity="0.9",O.style.borderRadius="2px",O.style.transform=`rotate(${yt}deg)`,O.style.animation=`cbsgoConfettiFall ${Ee}s ease-out ${Ce}s forwards`,Be.appendChild(O)}}function at(){return Math.floor(Math.random()*l.length)}function zt(){x=[];for(let U=0;U<n;U++){const q=[];for(let H=0;H<o;H++)Math.random()<y?q.push(p):q.push(at());x.push(q)}}function st(U){return U===p}function Oe(){if(de){de.innerHTML="";for(let U=0;U<n;U++)for(let q=0;q<o;q++){const H=x[U][q],O=document.createElement("div");O.dataset.row=String(U),O.dataset.col=String(q),O.style.borderRadius="12px",O.style.display="flex",O.style.alignItems="center",O.style.justifyContent="center",O.style.cursor=G?"default":"pointer",O.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",O.style.fontSize="20px",st(H)?(O.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",O.textContent="💥"):(O.style.background=l[H]||"#444",O.textContent=f[H]||"⬛"),h&&h.row===U&&h.col===q&&(O.style.outline="2px solid #fff",O.style.outlineOffset="2px"),O.addEventListener("click",()=>{Re(U,q)}),O.addEventListener("touchstart",te=>{if(G)return;const we=te.touches[0];R={row:U,col:q,x:we.clientX,y:we.clientY}}),O.addEventListener("touchend",te=>{if(!R||G)return;const we=te.changedTouches[0],Ce=we.clientX-R.x,Ee=we.clientY-R.y;if(Math.sqrt(Ce*Ce+Ee*Ee)<18){Re(U,q),R=null;return}let qe=R.row,et=R.col;Math.abs(Ce)>Math.abs(Ee)?Ce>0?et+=1:et-=1:Ee>0?qe+=1:qe-=1,qe>=0&&qe<n&&et>=0&&et<o&&je(R.row,R.col,qe,et),R=null,te.preventDefault()}),de.appendChild(O)}}}function ut(U,q){if(!U||!q)return!1;const H=Math.abs(U.row-q.row),O=Math.abs(U.col-q.col);return H+O===1}function Ge(U,q){const H=x[U.row][U.col];x[U.row][U.col]=x[q.row][q.col],x[q.row][q.col]=H}function xt(){const U=new Set;for(let q=0;q<n;q++){let H=x[q][0],O=0;for(let te=1;te<=o;te++){const we=te<o?x[q][te]:null;if(we===H)continue;const Ce=te-O;if(H!=null&&Ce>=3)for(let Ee=O;Ee<te;Ee++)U.add(`${q},${Ee}`);H=we,O=te}}for(let q=0;q<o;q++){let H=x[0][q],O=0;for(let te=1;te<=n;te++){const we=te<n?x[te][q]:null;if(we===H)continue;const Ce=te-O;if(H!=null&&Ce>=3)for(let Ee=O;Ee<te;Ee++)U.add(`${Ee},${q}`);H=we,O=te}}return U}function He(U){if(!U||!U.size)return 0;const q=U.size;g+=q*4,T&&(T.textContent=String(g)),!G&&g>=c&&gt(!0);for(const H of U){const[O,te]=H.split(","),we=Number(O),Ce=Number(te);x[we][Ce]=null}for(let H=0;H<o;H++){let O=n-1;for(let te=n-1;te>=0;te--)x[te][H]!=null&&(x[O][H]=x[te][H],O--);for(let te=O;te>=0;te--)Math.random()<y?x[te][H]=p:x[te][H]=at()}return q}function Je(U,q){const H=new Set;for(let O=0;O<o;O++)H.add(`${U},${O}`);for(let O=0;O<n;O++)H.add(`${O},${q}`);He(H),Oe(),G||setTimeout(()=>Nt(!1),120)}function Nt(U=!1){if(G)return;A=!0;const q=()=>{if(G){A=!0;return}const H=xt();if(!H.size){A=!1,Oe(),U&&!G&&(_<=0?Ke():Pe("Nice! Keep matching."));return}He(H),Oe(),setTimeout(q,120)};q()}function gt(U){if(!G)if(G=!0,A=!0,U){Pe("Great job! Puzzle completed 🎉");try{t?.id&&kr(t.id),Dt(10)}catch{}it(),setTimeout(()=>{Nn()},1600)}else Pe("Out of moves. Try again next time 🙂")}function Ke(){g>=c?gt(!0):_<=0&&gt(!1)}function je(U,q,H,O){if(A||G)return;if(_<=0){Ke();return}const te={row:U,col:q},we={row:H,col:O};if(!ut(te,we))return;const Ce=x[U][q],Ee=x[H][O],yt=st(Ce)||st(Ee);if(Ge(te,we),h=null,_--,z&&(z.textContent=String(_)),yt){Oe();const qe=st(x[U][q])?{row:U,col:q}:{row:H,col:O};Je(qe.row,qe.col),Ke();return}if(!xt().size){Ge(te,we),Oe(),Pe("No match… try another swap."),Ke();return}Pe(""),Oe(),Nt(!0)}function Re(U,q){if(A||G)return;if(_<=0){Ke();return}const H={row:U,col:q};if(!h){h=H,Oe();return}if(h.row===U&&h.col===q){h=null,Oe();return}if(!ut(h,H)){h=H,Oe();return}je(h.row,h.col,H.row,H.col)}function ce(){Nn()}ue&&(ue.onclick=ce),$e&&($e.onclick=()=>{ce()}),zt(),Oe(),Pe("Tap or swipe two neighboring tiles to swap them.")}const Er="cbsgo_inventory_v2";function ho(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function mo(){return{tickets:0,cbs:0,cards:{}}}function Te(){const t=localStorage.getItem(Er),n=ho(t,mo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Mt(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Er,JSON.stringify(n))}function Mr(){return Number(Te().tickets||0)}function Lr(){return Number(Te().cbs||0)}function Lt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Te();const o=Te();return o.tickets=Number(o.tickets||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function un(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Te();const o=Te();return o.cbs=Number(o.cbs||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function wo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Te();const o=Te(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function vo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Te();const o=Te(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function _o(){return{...Te().cards||{}}}function So(t){const n=String(t||"").trim();if(!n)return 0;const o=_o();return Number(o[n]||0)}function Ar(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Te();const f=Te();return f.cards||(f.cards={}),f.cards[o]=Number(f.cards[o]||0)+l,Mt(f),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...f}})),f}function ko(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Te();const f=Te();if(!f.cards||typeof f.cards[o]!="number")throw new Error("Not enough of that card in your collection.");const c=Number(f.cards[o]||0);if(c<l)throw new Error("Not enough of that card in your collection.");return f.cards[o]=c-l,f.cards[o]<=0&&delete f.cards[o],Mt(f),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...f}})),f}const zr="cbsgo_steps_v6",Co="cbsgo_steps_v5",Eo="cbsgo_gps_autostart_v2",Nr="cbsgo_daily_puzzle_v1",Mo=.75,kt=5e3,on=7,jn=100,Lo=1e3,Ao=.5,zo=2e3,No=4.5,Bn=1500,In=200,Bo=.25,Io=.05,To=.3;let Jt=null,en=!1,mt={msg:"init"};function Rn(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Br="cbsgo_cards_v1",$o=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Po(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Oo(t){return $o.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function jo(){try{const t=localStorage.getItem(Br),n=Rn(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,f]of Object.entries(n))if(f&&typeof f=="object"&&"count"in f){const c=Number(f.count);Number.isFinite(c)&&c>0&&(o[l]=c)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Ro(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[f,c]of Object.entries(n)){const u=Number(c||0);Number.isFinite(u)&&u>0&&(o[f]=u)}const l={counts:o};localStorage.setItem(Br,JSON.stringify(l))}catch{}}function Uo(t,n=1){const o=Po(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const c={...jo().counts||{}},p=Number(c[o]||0)+l;c[o]=p,Ro({counts:c});const y=Oo(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:c}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:y}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:y}}))}catch{}return{cardId:o,count:p,card:y}}function ot(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Fo(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,f]=n,c=new Date(o,l-1,f);return Number.isNaN(c.getTime())?null:c}function Go(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Ir(t,n){const o=Fo(t);if(!o)return[];const l=[];for(let f=n-1;f>=0;f--){const c=new Date(o.getTime());c.setDate(c.getDate()-f),l.push(Go(c))}return l}function an(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:ot(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Wo(t){const n=ot();return!t||typeof t!="object"?an():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function xn(t){t.updatedAt=Date.now(),localStorage.setItem(zr,JSON.stringify(t))}function Do(t,n){if(!n)return;const o=Ir(n,on);!o.length||!o.every(f=>!!t.streak[f])||t.lastStreakRewardDate!==n&&(un(jn),Yt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:on,rewardCbs:jn,lastDayKey:n}})))}function ar(t){t=Wo(t||an());const n=ot();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Do(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,xn(t)}return t}function pt(){let t=localStorage.getItem(zr);if(!t){const o=localStorage.getItem(Co);if(o){const l=Rn(o,an()),f=ar(l);return xn(f),f}}const n=Rn(t,an());return ar(n)}function tn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Yo()}}))}function Dn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Yt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Yn(t,n,o,l){const f=Number(t||0),c=Number(n||0),u=0;if(!(!f&&!c&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:f,tickets:c,cbs:u,reason:l||"distance"}}))}catch{}}function Yo(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function qo(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Ho(){return qo()/1e3}function Ko(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,f=t.dayKey||ot(),c=t.streak||{},p=Ir(f,on).map(y=>{let x=!1;return y===f?x=l:x=!!c[y],{dateKey:y,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:f,streakLength:on,rewardPerStreak:jn}}function sr(){return!!en}function Xo(){try{return localStorage.getItem(Nr)===ot()}catch{return!1}}function Vo(){try{localStorage.setItem(Nr,ot())}catch{}}function Zo(t,n){return Xo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:ot()}})),Vo(),!0)}function lr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Qo(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const f=l-o;if(!Number.isFinite(f)||f<Bn)return;const c=Math.floor(f/Bn);c<=0||(Lt(c),Yt(),Yn(0,c,0,"boost"),t.boostLastStep=o+c*Bn)}function Jo(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<In){t.chestMeters=n;return}let o=0;for(;n>=In&&o<5;)if(n-=In,o+=1,Math.random()<Bo){const l=Math.random()<Io,f=l?10:3,c=l?2:1;Dt(f),Dn(),Lt(c),Yt();const u=l&&Math.random()<To;Yn(f,c,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:f,tickets:c,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function ei(t,n){const l=x=>x*Math.PI/180,f=l(n.lat-t.lat),c=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),y=Math.sin(f/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(c/2)**2;return 2*6371e3*Math.asin(Math.sqrt(y))}function ti(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const f=Math.floor(n/1e3),c=Number(t.xpKmAwarded||0);if(f>c){const x=f-c;x>0&&(Dt(x),Dn(),t.xpKmAwarded=f,o+=x)}const p=Math.floor(n/2500),y=Number(t.ticketChunksAwarded||0);if(p>y){const x=p-y;x>0&&(Lt(x),Yt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Yn(o,l,0,"distance")}function ni(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),f=Math.floor((o.meters||0)/Mo);if(f>l){const c=f-l;o.steps=f,o.daySteps=Number(o.daySteps||0)+c}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||ot(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),ti(o),Qo(o),Jo(o),xn(o),tn(),o}function ri(){Jt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Jt),Jt=null}async function cr(t={}){const n=!!t.silent;if(!navigator.geolocation)return mt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Eo,"1")}catch{}ri(),en=!0,mt={msg:"requesting",t:Date.now()};try{return Jt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,f=o.coords.longitude,c=o.coords.accuracy||999,u=Date.now(),p=pt(),y=p.lastPos;p.lastPos={lat:l,lng:f,t:u},xn(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:f,acc:c,heading:x,speed:h,t:u}})),c>Lo){mt={lat:l,lng:f,acc:c,t:u,reason:"accuracy",boostMs:lr()},tn();return}Zo(l,f);let g=0,_=0,A=0,G=0,R="no-last";y&&typeof y.lat=="number"&&typeof y.lng=="number"&&typeof y.t=="number"&&(g=ei({lat:y.lat,lng:y.lng},{lat:l,lng:f}),_=Math.max(1,(u-y.t)/1e3),A=g/_,g<Ao?R="jitter":g>zo?R="teleport":A>No?R="too-fast":(ni(g),G=g,R="ok")),mt={lat:l,lng:f,acc:c,t:u,dist:Math.round(g),dt:Math.round(_),speed:Number.isFinite(A)?Number(A.toFixed(2)):0,added:Math.round(G),reason:R,boostMs:lr()},tn()},o=>{en=!1,mt={err:o?.message||"GPS blocked",t:Date.now()},tn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return en=!1,mt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function oi(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>sr()||await cr({silent:!0}))();const n=async()=>{sr()||await cr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),f=Number(n.cbs||0);o>0&&(Dt(o),Dn()),(l>0||f>0)&&(l>0&&Lt(l),f>0&&un(f),Yt());const c=n.cardId||n.card_id;if(c)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Uo(c,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function Tr(){const t=pn(),n=Gt(),o=vr(),l=_r(),f=Ho(),c=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
        <div>${o}/${l} XP · total ${t}</div>
        <div>${f.toFixed(2)} km walked</div>
      </div>
    </div>
  `}function $r(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:f,rewardPerStreak:c}=Ko(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
        ${f}-day streak → +${c} CBS
      </div>
    </div>
  `}function Pr(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ii(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Or="cbsgo_player_name_v2",qn="cbsgo_player_avatar_v2";function At(){try{return localStorage.getItem(Or)||"Sovereign"}catch{return"Sovereign"}}function jr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Or,n)}catch{}return n}function gn(){try{return localStorage.getItem(qn)||""}catch{return""}}function ai(t){const n=String(t||"");try{localStorage.setItem(qn,n)}catch{}return n}function si(){try{localStorage.removeItem(qn)}catch{}}let X=null,tt=null,nt=null,Pt=null,jt=null,De=null,Ie=null,wt=0,ft=!1,Qe=!0,We=null;const Ve=new Map;let Ze=!0,Rt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const li="48a387bba00043ac4ba5823371abc9d2",Wt=80,ci=6,fi=80,di=220,pi=6e4,ui=5*6e4,xi=300,gi=.35,Tn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],yi=350,bi=.35,hi=120;let sn=0,vt=0,nn=null,Un=!1,St=[];function dt(t){return document.getElementById(t)}function _t(t){const n=dt("cbsgoMapHost");if(!n)return;let o=dt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function mi(){const t=String(At()||"").trim();return t?t[0].toUpperCase():"🙂"}function Fn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=x=>x*Math.PI/180,f=l(n.lat-t.lat),c=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),y=Math.sin(f/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(c/2)**2;return 2*6371e3*Math.asin(Math.sqrt(y))}function Rr(t,n,o){const l=n+Math.random()*(o-n),f=Math.random()*2*Math.PI,c=l*Math.cos(f)/111111,u=l*Math.sin(f)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+c,lng:t.lng+u}}function wi(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),f=o(n.lat),c=o(n.lng-t.lng),u=Math.sin(c)*Math.cos(f),p=Math.cos(l)*Math.sin(f)-Math.sin(l)*Math.cos(f)*Math.cos(c);let y=Math.atan2(u,p);return y=y*180/Math.PI,y=(y+360)%360,y}function vi(t,n,o){const f=n/6371e3,c=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,y=Math.sin(u),x=Math.cos(u),h=Math.sin(f),g=Math.cos(f),_=Math.asin(y*g+x*h*Math.cos(c)),A=p+Math.atan2(Math.sin(c)*h*x,g-y*Math.sin(_));return[_*180/Math.PI,A*180/Math.PI]}function _i(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Ur(){const{temp:t,iconEmoji:n}=Rt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Fr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;_i();const{condition:n,isNight:o}=Rt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const c=[];for(let u=0;u<48;u++){const p=Math.random()*100,y=Math.random()*16-8,x=Math.random()*2.5,h=2+Math.random()*1.5;c.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+y}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=c.join("")}else if(n==="snow"){const c=[];for(let u=0;u<42;u++){const p=Math.random()*100,y=Math.random()*20-10,x=Math.random()*4,h=6+Math.random()*4;c.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+y}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=c.join("")}else l="";t.innerHTML=l}async function Si(t,n){const o=Date.now();if(!(Rt.lastUpdated&&o-Rt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${li}&units=metric`,f=await fetch(l);if(!f.ok)throw new Error("HTTP "+f.status);const c=await f.json(),u=c?.main?.temp,p=c?.weather?.[0]?.icon||"01d",y=String(c?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),h="⛅",g="clear";p.startsWith("01")||p.startsWith("02")?g="clear":p.startsWith("03")||p.startsWith("04")?(h="☁️",g="clouds"):p.startsWith("09")||p.startsWith("10")?(h="🌧️",g="rain"):p.startsWith("11")?(h="⛈️",g="storm"):p.startsWith("13")?(h="❄️",g="snow"):p.startsWith("50")&&(h="🌫️",g="mist"),y.includes("rain")&&(g="rain"),y.includes("snow")&&(g="snow"),y.includes("thunder")&&(g="storm");try{const A=Number(c?.dt||0),G=Number(c?.timezone||0);if(A&&Number.isFinite(G)){const pe=((A+G)/3600%24+24)%24;x=pe<7||pe>=19}}catch{}g==="clear"?h=x?"🌙":"☀️":g==="clouds"?h="☁️":g==="rain"?h="🌧️":g==="storm"?h="⛈️":g==="snow"?h="❄️":g==="mist"&&(h="🌫️"),Rt={temp:u,iconEmoji:h,condition:g,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Ur()),Fr()}catch(l){console.warn("Weather fetch failed",l)}}function ki(t){const n=gn();if(n){const f=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${n}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:f,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const l=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${Fn(mi())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function fr(t,n){const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Ci(t,n,o,l){if(!l&&o){const p=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Fn(o)}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:p,className:"",iconSize:[30,30],iconAnchor:[15,15]})}const f=String(n||"").trim()||"🙂",c=`
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${Fn(f)}</div>
  `;return t.divIcon({html:c,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function Ei(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Mi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Li(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Ai(){if(!Tn.length)return null;const t=Math.floor(Math.random()*Tn.length);return Tn[t]}function zi(t){const n=t||"small";let o,l,f;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),f=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),f=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,f=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,f=Math.random()<.25?3+Math.floor(Math.random()*8):0);let c=null,u=0;if(Math.random()<gi){const p=Ai();p&&(c=p,u=1)}return{xp:o,tickets:l,cbs:f,cardId:c,cardCount:u}}function Ni(t){if(!X||!De||!t)return;const n=Date.now();if(n-sn<pi||De.getLayers().length>=ci)return;const l=window.L;if(!l)return;const f=Li(),c=zi(f),u=Rr(t,fi,di),p=Ei(l),y=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),h={marker:y,createdAt:n,lat:u.lat,lng:u.lng,reward:c};St.push(h),y.on("click",()=>{if(!Ie){alert("GPS not ready yet. Wait until your player marker appears.");return}const g={lat:Ie[0],lng:Ie[1]},_={lat:u.lat,lng:u.lng},A=Ct(g,_);if(A>Wt){alert(`Too far to open this gift.

Distance: ${Math.round(A)}m
Needed: ≤ ${Wt}m`);return}De.removeLayer(y),St=St.filter(ue=>ue.marker!==y);const{xp:G,tickets:R,cbs:pe,cardId:fe,cardCount:de}=c,T=[];G&&T.push(`+${G} XP`),R&&T.push(`+${R} ticket${R===1?"":"s"}`),pe&&T.push(`+${pe} CBS`),fe&&de>0&&T.push(`+${de} card${de===1?"":"s"}`);const z=T.length?T.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${z}`);const D={kind:"mystery",xp:G||0,tickets:R||0,cbs:pe||0,cardId:fe||null,cardCount:de||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:D}))}catch{}}),y.addTo(De),sn=n}function Bi(t){if(!X||!De||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!De.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>ui)return De.removeLayer(l.marker),o+=1,!1;const c=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(c)&&c>xi?(De.removeLayer(l.marker),o+=1,!1):!0}),o>0&&De.getLayers().length===0&&(sn=0)}function Ii(t){if(!X||!jt||!t||nn)return;const n=window.L;if(!n)return;if(Un){if(vt<yi||Math.random()>bi)return;vt=0}else{if(vt<hi)return;vt=0,Un=!0}const o=Rr(t,60,140),l=Mi(n),f=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});f.on("click",()=>{if(!Ie){alert("GPS not ready yet. Wait until your player marker appears.");return}const c={lat:Ie[0],lng:Ie[1]},u={lat:o.lat,lng:o.lng},p=Ct(c,u);if(p>Wt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Wt}m`);return}jt.removeLayer(f),nn=null,On({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),f.addTo(jt),nn=f}function Ti(t){const n=window.L;if(!n||!X||!t)return;const o=Wt;Pt?(Pt.setLatLng(t),Pt.setRadius(o)):Pt=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(X)}function $i(t){const n=window.L;if(!n||!X)return;const o=ki(n);if(tt?(tt.setIcon(o),tt.setLatLng(t)):(tt=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(X),X.setView(t,19)),nt?(nt.setIcon(fr(n,wt)),nt.setLatLng(t)):nt=n.marker(t,{icon:fr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(X),tt&&tt.bringToFront&&tt.bringToFront(),nt&&nt.bringToFront&&nt.bringToFront(),Ti(t),Qe&&!ft&&X)try{const l=X.getZoom()||19;let f=t;Number.isFinite(wt)&&(f=vi(t,40,wt));const c=X.getCenter(),u=Ct({lat:c.lat,lng:c.lng},{lat:f[0],lng:f[1]});(!Number.isFinite(u)||u>20)&&X.setView(f,l)}catch{}}function Gr(){const t=window.L;return!t||!X?null:(We?(Ze&&!X.hasLayer(We)&&We.addTo(X),!Ze&&X.hasLayer(We)&&X.removeLayer(We)):(We=t.layerGroup(),Ze&&We.addTo(X)),We)}function Pi(t){if(!Array.isArray(t)||!X)return[];const n=X.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(c=>{if(!c||c.isMe||typeof c.lat!="number"||typeof c.lng!="number")return;const u=Math.round(c.lat*o)/o,p=Math.round(c.lng*o)/o,y=`${u}_${p}`;l.has(y)||l.set(y,[]),l.get(y).push(c)});const f=[];for(const[c,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];f.push({id:p.wallet_pk||c,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,y=0;u.forEach(g=>{p+=g.lat,y+=g.lng});const x=p/u.length,h=y/u.length;f.push({id:`cluster_${c}`,lat:x,lng:h,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return f}function Oi(t){const n=window.L;if(!n||!X)return;const o=Gr();if(!o)return;if(!Ze){for(const[c,u]of Ve.entries())o.removeLayer(u),Ve.delete(c);return}const l=Pi(t),f=new Set;l.forEach(c=>{if(!c||typeof c.lat!="number"||typeof c.lng!="number")return;const u=c.id||`${c.lat},${c.lng}`;f.add(u);const p=[c.lat,c.lng];let y=Ve.get(u);if(y)y.setLatLng(p);else{const x=c.isCluster&&c.count>1?String(c.count):c.nickname||"Anon",h=Ci(n,x,c.avatar,c.isCluster);y=n.marker(p,{icon:h,pane:"cbsgo-others-pane"});const g=c.isCluster&&c.count>1?`${c.count} CBS-GO explorers nearby`:`${c.nickname||"CBS-GO explorer"}`;y.bindPopup(g),y.addTo(o),Ve.set(u,y)}});for(const[c,u]of Ve.entries())f.has(c)||(o.removeLayer(u),Ve.delete(c))}function ji(){return`
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
  `}function Ri(){try{X&&X.remove()}catch{}X=null,tt=null,nt=null,Pt=null,jt=null,De=null,Ie=null,ft=!1,Qe=!0,sn=0,vt=0,nn=null,Un=!1,We=null,Ve.clear(),St=[]}function Ui(){const t=window.L,n=dt("cbsgoMap");if(!t||!n)return!1;Ri();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));X=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=X.createPane("cbsgo-player-pane");l.style.zIndex="650";const f=X.createPane("cbsgo-others-pane");f.style.zIndex="640";const c=X.createPane("cbsgo-loot-pane");c.style.zIndex="630";const u=X.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(X),X.setMaxBounds(o),X.setView([51.687,4.87],16),jt=t.layerGroup().addTo(X),De=t.layerGroup().addTo(X),X.on("dragstart",()=>{Qe=!1}),X.on("zoomstart",()=>{Qe=!1}),!0}function Fi(){!navigator.geolocation||!X||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:f}=t.coords,c={lat:n,lng:o},u=Ie?{lat:Ie[0],lng:Ie[1]}:null;if(Ie=[n,o],Number.isFinite(f))wt=f;else if(u){const p=Ct(u,c);Number.isFinite(p)&&p>2&&(wt=wi(u,c))}if($i([n,o]),u){const p=Ct(u,c);if(Number.isFinite(p)&&p>1&&(vt+=p),Number.isFinite(p)&&p>20&&!Qe&&!ft&&X){Qe=!0;const y=X.getZoom()||19;X.setView([n,o],y)}}Ii(c),Ni(c),Bi(c),Si(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Gi(){let t=0;const n=120,o=()=>{if(t++,!dt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!Ui()){_t("Could not init map. Refresh.");return}const f=dt("cbsgoCenterBtn");f&&(f.onclick=()=>{X&&Ie&&(Qe=!0,ft=!1,X.setView(Ie,19))});const c=dt("cbsgoCompassBtn");c&&(c.onclick=()=>{X&&(ft=!ft,ft?(Qe=!1,X.setView([51.687,4.87],3)):Ie&&(Qe=!0,X.setView(Ie,16)))});const u=dt("cbsgoOnlineToggleBtn");if(u){const p=()=>{Ze?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Ze=!Ze;const y=Gr();if(y&&X&&(Ze?X.hasLayer(y)||y.addTo(X):X.hasLayer(y)&&X.removeLayer(y)),p(),!Ze&&We){for(const[x,h]of Ve.entries())We.removeLayer(h);Ve.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const y=p?.detail?.players||[];Oi(y)})),Fr(),_t("Loading GPS…"),Fi()};o()}const Wi="cbsgo_cards_v1";function Di(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Hn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Kn(){const t=localStorage.getItem(Wi),n=Di(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const f=Number(l.count||0);Number.isFinite(f)&&f>0&&(o[l.id]=f)}),o}function rt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Wr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Yi(){const t=Hn(),n=Kn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function qi(){const t=Hn(),n=Kn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const f=Number(n[l.id]||0),c=Number.isFinite(f)&&f>0,u=Wr(l.rarity),p=c?u:"rgba(31,41,55,.9)",y=c?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=c?l.emoji||"🃏":"❓",h=c?rt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',g=rt(l.set||"Set"),_=c?`<div style="
             position:absolute;
             right:6px;
             top:6px;
             padding:2px 6px;
             border-radius:999px;
             border:1px solid ${u};
             background:rgba(15,23,42,.96);
             font-size:10px;
           ">
             x${f}
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
            font-size:${c?"26px":"28px"};
            margin-top:${c?"4px":"8px"};
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
            ${h}
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
    `}function Hi(){const t=Yi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,f=o>0?Math.round(n/o*100):0;return`
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
        ${qi()}
      </div>
    </div>
  `}function Ki(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Hi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},f=document.getElementById("cbsgoCardsCloseBtn");f&&(f.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const c=Hn(),u=new Map(c.map(x=>[x.id,x]));function p(x){const h=u.get(x);if(!h)return;const g=Kn(),_=Number(g[x]||0),A=Number.isFinite(_)&&_>0,G=A?h.emoji||"🃏":"❓",R=A?h.name||"Card":"Unknown card",pe=h.set||"Set",fe=h.rarity||"common",de=Wr(fe),T={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[fe]||"Common",z=document.createElement("div");z.style.position="fixed",z.style.inset="0",z.style.display="flex",z.style.alignItems="center",z.style.justifyContent="center",z.style.background="rgba(0,0,0,0.65)",z.style.pointerEvents="auto",z.style.zIndex="8600";const D=document.createElement("div");D.style.width="min(260px, 82vw)",D.style.borderRadius="20px",D.style.border=`1px solid ${de}`,D.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",D.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",D.style.padding="16px 14px 14px 14px",D.style.textAlign="center",D.style.color="#fff",D.style.fontFamily="system-ui,sans-serif",D.style.opacity="0",D.style.transform="translateY(14px) scale(0.96)",D.style.transition="opacity .2s ease-out, transform .2s ease-out";const ue=A?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',$e=A?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;D.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${rt(pe)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${de};
          font-size:10px;
        ">
          ${rt(T)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${de};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${rt(G)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${rt(R)}
      </div>

      ${ue}
      ${$e}

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
    `,z.appendChild(D),document.body.appendChild(z),requestAnimationFrame(()=>{D.style.opacity="1",D.style.transform="translateY(0) scale(1)"});const Be=()=>{D.style.opacity="0",D.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(z)},200)},Pe=D.querySelector("#cbsgoCardPreviewCloseBtn");Pe&&(Pe.onclick=Be),z.addEventListener("click",it=>{it.target===z&&Be()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const h=x.getAttribute("data-card-id");h&&p(h)})})}function Xi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Vi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var f=!1;try{f=this instanceof l}catch{}return f?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var f=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,f.get?f:{enumerable:!0,get:function(){return t[l]}})}),o}function Zi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var $n={exports:{}};const Qi={},Ji=Object.freeze(Object.defineProperty({__proto__:null,default:Qi},Symbol.toStringTag,{value:"Module"})),ea=Vi(Ji);var dr;function ta(){return dr||(dr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},f=new Uint8Array(16),c=new Uint8Array(32);c[0]=9;var u=o(),p=o([1]),y=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),g=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),A=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function G(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function R(r,a,i,e,s){var b,m=0;for(b=0;b<s;b++)m|=r[a+b]^i[e+b];return(1&m-1>>>8)-1}function pe(r,a,i,e){return R(r,a,i,e,16)}function fe(r,a,i,e){return R(r,a,i,e,32)}function de(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,W=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,Y=b,I=m,j=k,F=L,N=W,w=B,v=ye,E=$,S=V,C=Z,M=re,K=ne,oe=Q,ae=ee,ie=J,d,le=0;le<20;le+=2)d=P+K|0,F^=d<<7|d>>>25,d=F+P|0,E^=d<<9|d>>>23,d=E+F|0,K^=d<<13|d>>>19,d=K+E|0,P^=d<<18|d>>>14,d=N+Y|0,S^=d<<7|d>>>25,d=S+N|0,oe^=d<<9|d>>>23,d=oe+S|0,Y^=d<<13|d>>>19,d=Y+oe|0,N^=d<<18|d>>>14,d=C+w|0,ae^=d<<7|d>>>25,d=ae+C|0,I^=d<<9|d>>>23,d=I+ae|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ie+M|0,j^=d<<7|d>>>25,d=j+ie|0,v^=d<<9|d>>>23,d=v+j|0,M^=d<<13|d>>>19,d=M+v|0,ie^=d<<18|d>>>14,d=P+j|0,Y^=d<<7|d>>>25,d=Y+P|0,I^=d<<9|d>>>23,d=I+Y|0,j^=d<<13|d>>>19,d=j+I|0,P^=d<<18|d>>>14,d=N+F|0,w^=d<<7|d>>>25,d=w+N|0,v^=d<<9|d>>>23,d=v+w|0,F^=d<<13|d>>>19,d=F+v|0,N^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=ie+ae|0,K^=d<<7|d>>>25,d=K+ie|0,oe^=d<<9|d>>>23,d=oe+K|0,ae^=d<<13|d>>>19,d=ae+oe|0,ie^=d<<18|d>>>14;P=P+s|0,Y=Y+b|0,I=I+m|0,j=j+k|0,F=F+L|0,N=N+W|0,w=w+B|0,v=v+ye|0,E=E+$|0,S=S+V|0,C=C+Z|0,M=M+re|0,K=K+ne|0,oe=oe+Q|0,ae=ae+ee|0,ie=ie+J|0,r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=Y>>>0&255,r[5]=Y>>>8&255,r[6]=Y>>>16&255,r[7]=Y>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=j>>>0&255,r[13]=j>>>8&255,r[14]=j>>>16&255,r[15]=j>>>24&255,r[16]=F>>>0&255,r[17]=F>>>8&255,r[18]=F>>>16&255,r[19]=F>>>24&255,r[20]=N>>>0&255,r[21]=N>>>8&255,r[22]=N>>>16&255,r[23]=N>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=M>>>0&255,r[45]=M>>>8&255,r[46]=M>>>16&255,r[47]=M>>>24&255,r[48]=K>>>0&255,r[49]=K>>>8&255,r[50]=K>>>16&255,r[51]=K>>>24&255,r[52]=oe>>>0&255,r[53]=oe>>>8&255,r[54]=oe>>>16&255,r[55]=oe>>>24&255,r[56]=ae>>>0&255,r[57]=ae>>>8&255,r[58]=ae>>>16&255,r[59]=ae>>>24&255,r[60]=ie>>>0&255,r[61]=ie>>>8&255,r[62]=ie>>>16&255,r[63]=ie>>>24&255}function T(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,L=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,W=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,B=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,re=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,ne=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,Y=b,I=m,j=k,F=L,N=W,w=B,v=ye,E=$,S=V,C=Z,M=re,K=ne,oe=Q,ae=ee,ie=J,d,le=0;le<20;le+=2)d=P+K|0,F^=d<<7|d>>>25,d=F+P|0,E^=d<<9|d>>>23,d=E+F|0,K^=d<<13|d>>>19,d=K+E|0,P^=d<<18|d>>>14,d=N+Y|0,S^=d<<7|d>>>25,d=S+N|0,oe^=d<<9|d>>>23,d=oe+S|0,Y^=d<<13|d>>>19,d=Y+oe|0,N^=d<<18|d>>>14,d=C+w|0,ae^=d<<7|d>>>25,d=ae+C|0,I^=d<<9|d>>>23,d=I+ae|0,w^=d<<13|d>>>19,d=w+I|0,C^=d<<18|d>>>14,d=ie+M|0,j^=d<<7|d>>>25,d=j+ie|0,v^=d<<9|d>>>23,d=v+j|0,M^=d<<13|d>>>19,d=M+v|0,ie^=d<<18|d>>>14,d=P+j|0,Y^=d<<7|d>>>25,d=Y+P|0,I^=d<<9|d>>>23,d=I+Y|0,j^=d<<13|d>>>19,d=j+I|0,P^=d<<18|d>>>14,d=N+F|0,w^=d<<7|d>>>25,d=w+N|0,v^=d<<9|d>>>23,d=v+w|0,F^=d<<13|d>>>19,d=F+v|0,N^=d<<18|d>>>14,d=C+S|0,M^=d<<7|d>>>25,d=M+C|0,E^=d<<9|d>>>23,d=E+M|0,S^=d<<13|d>>>19,d=S+E|0,C^=d<<18|d>>>14,d=ie+ae|0,K^=d<<7|d>>>25,d=K+ie|0,oe^=d<<9|d>>>23,d=oe+K|0,ae^=d<<13|d>>>19,d=ae+oe|0,ie^=d<<18|d>>>14;r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=N>>>0&255,r[5]=N>>>8&255,r[6]=N>>>16&255,r[7]=N>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ie>>>0&255,r[13]=ie>>>8&255,r[14]=ie>>>16&255,r[15]=ie>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function z(r,a,i,e){de(r,a,i,e)}function D(r,a,i,e){T(r,a,i,e)}var ue=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function $e(r,a,i,e,s,b,m){var k=new Uint8Array(16),L=new Uint8Array(64),W,B;for(B=0;B<16;B++)k[B]=0;for(B=0;B<8;B++)k[B]=b[B];for(;s>=64;){for(z(L,k,m,ue),B=0;B<64;B++)r[a+B]=i[e+B]^L[B];for(W=1,B=8;B<16;B++)W=W+(k[B]&255)|0,k[B]=W&255,W>>>=8;s-=64,a+=64,e+=64}if(s>0)for(z(L,k,m,ue),B=0;B<s;B++)r[a+B]=i[e+B]^L[B];return 0}function Be(r,a,i,e,s){var b=new Uint8Array(16),m=new Uint8Array(64),k,L;for(L=0;L<16;L++)b[L]=0;for(L=0;L<8;L++)b[L]=e[L];for(;i>=64;){for(z(m,b,s,ue),L=0;L<64;L++)r[a+L]=m[L];for(k=1,L=8;L<16;L++)k=k+(b[L]&255)|0,b[L]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(z(m,b,s,ue),L=0;L<i;L++)r[a+L]=m[L];return 0}function Pe(r,a,i,e,s){var b=new Uint8Array(32);D(b,e,s,ue);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return Be(r,a,i,m,b)}function it(r,a,i,e,s,b,m){var k=new Uint8Array(32);D(k,b,m,ue);for(var L=new Uint8Array(8),W=0;W<8;W++)L[W]=b[W+16];return $e(r,a,i,e,s,L,k)}var at=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,b,m,k,L;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,b=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|b<<12)&255,this.r[5]=b>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(b>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,L=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|L<<8)&8191,this.r[9]=L>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};at.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,b,m,k,L,W,B,ye,$,V,Z,re,ne,Q,ee,J,P,Y,I,j=this.h[0],F=this.h[1],N=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],M=this.h[8],K=this.h[9],oe=this.r[0],ae=this.r[1],ie=this.r[2],d=this.r[3],le=this.r[4],be=this.r[5],he=this.r[6],se=this.r[7],xe=this.r[8],ge=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,j+=s&8191,b=r[a+2]&255|(r[a+3]&255)<<8,F+=(s>>>13|b<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,N+=(b>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,L=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|L<<12)&8191,E+=L>>>1&8191,W=r[a+10]&255|(r[a+11]&255)<<8,S+=(L>>>14|W<<2)&8191,B=r[a+12]&255|(r[a+13]&255)<<8,C+=(W>>>11|B<<5)&8191,ye=r[a+14]&255|(r[a+15]&255)<<8,M+=(B>>>8|ye<<8)&8191,K+=ye>>>5|e,$=0,V=$,V+=j*oe,V+=F*(5*ge),V+=N*(5*xe),V+=w*(5*se),V+=v*(5*he),$=V>>>13,V&=8191,V+=E*(5*be),V+=S*(5*le),V+=C*(5*d),V+=M*(5*ie),V+=K*(5*ae),$+=V>>>13,V&=8191,Z=$,Z+=j*ae,Z+=F*oe,Z+=N*(5*ge),Z+=w*(5*xe),Z+=v*(5*se),$=Z>>>13,Z&=8191,Z+=E*(5*he),Z+=S*(5*be),Z+=C*(5*le),Z+=M*(5*d),Z+=K*(5*ie),$+=Z>>>13,Z&=8191,re=$,re+=j*ie,re+=F*ae,re+=N*oe,re+=w*(5*ge),re+=v*(5*xe),$=re>>>13,re&=8191,re+=E*(5*se),re+=S*(5*he),re+=C*(5*be),re+=M*(5*le),re+=K*(5*d),$+=re>>>13,re&=8191,ne=$,ne+=j*d,ne+=F*ie,ne+=N*ae,ne+=w*oe,ne+=v*(5*ge),$=ne>>>13,ne&=8191,ne+=E*(5*xe),ne+=S*(5*se),ne+=C*(5*he),ne+=M*(5*be),ne+=K*(5*le),$+=ne>>>13,ne&=8191,Q=$,Q+=j*le,Q+=F*d,Q+=N*ie,Q+=w*ae,Q+=v*oe,$=Q>>>13,Q&=8191,Q+=E*(5*ge),Q+=S*(5*xe),Q+=C*(5*se),Q+=M*(5*he),Q+=K*(5*be),$+=Q>>>13,Q&=8191,ee=$,ee+=j*be,ee+=F*le,ee+=N*d,ee+=w*ie,ee+=v*ae,$=ee>>>13,ee&=8191,ee+=E*oe,ee+=S*(5*ge),ee+=C*(5*xe),ee+=M*(5*se),ee+=K*(5*he),$+=ee>>>13,ee&=8191,J=$,J+=j*he,J+=F*be,J+=N*le,J+=w*d,J+=v*ie,$=J>>>13,J&=8191,J+=E*ae,J+=S*oe,J+=C*(5*ge),J+=M*(5*xe),J+=K*(5*se),$+=J>>>13,J&=8191,P=$,P+=j*se,P+=F*he,P+=N*be,P+=w*le,P+=v*d,$=P>>>13,P&=8191,P+=E*ie,P+=S*ae,P+=C*oe,P+=M*(5*ge),P+=K*(5*xe),$+=P>>>13,P&=8191,Y=$,Y+=j*xe,Y+=F*se,Y+=N*he,Y+=w*be,Y+=v*le,$=Y>>>13,Y&=8191,Y+=E*d,Y+=S*ie,Y+=C*ae,Y+=M*oe,Y+=K*(5*ge),$+=Y>>>13,Y&=8191,I=$,I+=j*ge,I+=F*xe,I+=N*se,I+=w*he,I+=v*be,$=I>>>13,I&=8191,I+=E*le,I+=S*d,I+=C*ie,I+=M*ae,I+=K*oe,$+=I>>>13,I&=8191,$=($<<2)+$|0,$=$+V|0,V=$&8191,$=$>>>13,Z+=$,j=V,F=Z,N=re,w=ne,v=Q,E=ee,S=J,C=P,M=Y,K=I,a+=16,i-=16;this.h[0]=j,this.h[1]=F,this.h[2]=N,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=M,this.h[9]=K},at.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,b,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,b=this.h[0]+this.pad[0],this.h[0]=b&65535,m=1;m<8;m++)b=(this.h[m]+this.pad[m]|0)+(b>>>16)|0,this.h[m]=b&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},at.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function zt(r,a,i,e,s,b){var m=new at(b);return m.update(i,e,s),m.finish(r,a),0}function st(r,a,i,e,s,b){var m=new Uint8Array(16);return zt(m,0,i,e,s,b),pe(r,a,m,0)}function Oe(r,a,i,e,s){var b;if(i<32)return-1;for(it(r,0,a,0,i,e,s),zt(r,16,r,32,i-32,r),b=0;b<16;b++)r[b]=0;return 0}function ut(r,a,i,e,s){var b,m=new Uint8Array(32);if(i<32||(Pe(m,0,32,e,s),st(a,16,a,32,i-32,m)!==0))return-1;for(it(r,0,a,0,i,e,s),b=0;b<32;b++)r[b]=0;return 0}function Ge(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function He(r,a,i){for(var e,s=~(i-1),b=0;b<16;b++)e=s&(r[b]^a[b]),r[b]^=e,a[b]^=e}function Je(r,a){var i,e,s,b=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(xt(m),xt(m),xt(m),e=0;e<2;e++){for(b[0]=m[0]-65517,i=1;i<15;i++)b[i]=m[i]-65535-(b[i-1]>>16&1),b[i-1]&=65535;b[15]=m[15]-32767-(b[14]>>16&1),s=b[15]>>16&1,b[14]&=65535,He(m,b,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function Nt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Je(i,r),Je(e,a),fe(i,0,e,0)}function gt(r){var a=new Uint8Array(32);return Je(a,r),a[0]&1}function Ke(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function je(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Re(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function ce(r,a,i){var e,s,b=0,m=0,k=0,L=0,W=0,B=0,ye=0,$=0,V=0,Z=0,re=0,ne=0,Q=0,ee=0,J=0,P=0,Y=0,I=0,j=0,F=0,N=0,w=0,v=0,E=0,S=0,C=0,M=0,K=0,oe=0,ae=0,ie=0,d=i[0],le=i[1],be=i[2],he=i[3],se=i[4],xe=i[5],ge=i[6],ke=i[7],me=i[8],ve=i[9],_e=i[10],Se=i[11],Me=i[12],Le=i[13],Ae=i[14],ze=i[15];e=a[0],b+=e*d,m+=e*le,k+=e*be,L+=e*he,W+=e*se,B+=e*xe,ye+=e*ge,$+=e*ke,V+=e*me,Z+=e*ve,re+=e*_e,ne+=e*Se,Q+=e*Me,ee+=e*Le,J+=e*Ae,P+=e*ze,e=a[1],m+=e*d,k+=e*le,L+=e*be,W+=e*he,B+=e*se,ye+=e*xe,$+=e*ge,V+=e*ke,Z+=e*me,re+=e*ve,ne+=e*_e,Q+=e*Se,ee+=e*Me,J+=e*Le,P+=e*Ae,Y+=e*ze,e=a[2],k+=e*d,L+=e*le,W+=e*be,B+=e*he,ye+=e*se,$+=e*xe,V+=e*ge,Z+=e*ke,re+=e*me,ne+=e*ve,Q+=e*_e,ee+=e*Se,J+=e*Me,P+=e*Le,Y+=e*Ae,I+=e*ze,e=a[3],L+=e*d,W+=e*le,B+=e*be,ye+=e*he,$+=e*se,V+=e*xe,Z+=e*ge,re+=e*ke,ne+=e*me,Q+=e*ve,ee+=e*_e,J+=e*Se,P+=e*Me,Y+=e*Le,I+=e*Ae,j+=e*ze,e=a[4],W+=e*d,B+=e*le,ye+=e*be,$+=e*he,V+=e*se,Z+=e*xe,re+=e*ge,ne+=e*ke,Q+=e*me,ee+=e*ve,J+=e*_e,P+=e*Se,Y+=e*Me,I+=e*Le,j+=e*Ae,F+=e*ze,e=a[5],B+=e*d,ye+=e*le,$+=e*be,V+=e*he,Z+=e*se,re+=e*xe,ne+=e*ge,Q+=e*ke,ee+=e*me,J+=e*ve,P+=e*_e,Y+=e*Se,I+=e*Me,j+=e*Le,F+=e*Ae,N+=e*ze,e=a[6],ye+=e*d,$+=e*le,V+=e*be,Z+=e*he,re+=e*se,ne+=e*xe,Q+=e*ge,ee+=e*ke,J+=e*me,P+=e*ve,Y+=e*_e,I+=e*Se,j+=e*Me,F+=e*Le,N+=e*Ae,w+=e*ze,e=a[7],$+=e*d,V+=e*le,Z+=e*be,re+=e*he,ne+=e*se,Q+=e*xe,ee+=e*ge,J+=e*ke,P+=e*me,Y+=e*ve,I+=e*_e,j+=e*Se,F+=e*Me,N+=e*Le,w+=e*Ae,v+=e*ze,e=a[8],V+=e*d,Z+=e*le,re+=e*be,ne+=e*he,Q+=e*se,ee+=e*xe,J+=e*ge,P+=e*ke,Y+=e*me,I+=e*ve,j+=e*_e,F+=e*Se,N+=e*Me,w+=e*Le,v+=e*Ae,E+=e*ze,e=a[9],Z+=e*d,re+=e*le,ne+=e*be,Q+=e*he,ee+=e*se,J+=e*xe,P+=e*ge,Y+=e*ke,I+=e*me,j+=e*ve,F+=e*_e,N+=e*Se,w+=e*Me,v+=e*Le,E+=e*Ae,S+=e*ze,e=a[10],re+=e*d,ne+=e*le,Q+=e*be,ee+=e*he,J+=e*se,P+=e*xe,Y+=e*ge,I+=e*ke,j+=e*me,F+=e*ve,N+=e*_e,w+=e*Se,v+=e*Me,E+=e*Le,S+=e*Ae,C+=e*ze,e=a[11],ne+=e*d,Q+=e*le,ee+=e*be,J+=e*he,P+=e*se,Y+=e*xe,I+=e*ge,j+=e*ke,F+=e*me,N+=e*ve,w+=e*_e,v+=e*Se,E+=e*Me,S+=e*Le,C+=e*Ae,M+=e*ze,e=a[12],Q+=e*d,ee+=e*le,J+=e*be,P+=e*he,Y+=e*se,I+=e*xe,j+=e*ge,F+=e*ke,N+=e*me,w+=e*ve,v+=e*_e,E+=e*Se,S+=e*Me,C+=e*Le,M+=e*Ae,K+=e*ze,e=a[13],ee+=e*d,J+=e*le,P+=e*be,Y+=e*he,I+=e*se,j+=e*xe,F+=e*ge,N+=e*ke,w+=e*me,v+=e*ve,E+=e*_e,S+=e*Se,C+=e*Me,M+=e*Le,K+=e*Ae,oe+=e*ze,e=a[14],J+=e*d,P+=e*le,Y+=e*be,I+=e*he,j+=e*se,F+=e*xe,N+=e*ge,w+=e*ke,v+=e*me,E+=e*ve,S+=e*_e,C+=e*Se,M+=e*Me,K+=e*Le,oe+=e*Ae,ae+=e*ze,e=a[15],P+=e*d,Y+=e*le,I+=e*be,j+=e*he,F+=e*se,N+=e*xe,w+=e*ge,v+=e*ke,E+=e*me,S+=e*ve,C+=e*_e,M+=e*Se,K+=e*Me,oe+=e*Le,ae+=e*Ae,ie+=e*ze,b+=38*Y,m+=38*I,k+=38*j,L+=38*F,W+=38*N,B+=38*w,ye+=38*v,$+=38*E,V+=38*S,Z+=38*C,re+=38*M,ne+=38*K,Q+=38*oe,ee+=38*ae,J+=38*ie,s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=W+s+65535,s=Math.floor(e/65536),W=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,b+=s-1+37*(s-1),s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=L+s+65535,s=Math.floor(e/65536),L=e-s*65536,e=W+s+65535,s=Math.floor(e/65536),W=e-s*65536,e=B+s+65535,s=Math.floor(e/65536),B=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=ne+s+65535,s=Math.floor(e/65536),ne=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,b+=s-1+37*(s-1),r[0]=b,r[1]=m,r[2]=k,r[3]=L,r[4]=W,r[5]=B,r[6]=ye,r[7]=$,r[8]=V,r[9]=Z,r[10]=re,r[11]=ne,r[12]=Q,r[13]=ee,r[14]=J,r[15]=P}function U(r,a){ce(r,a,a)}function q(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)U(i,i),e!==2&&e!==4&&ce(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function H(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)U(i,i),e!==1&&ce(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function O(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),b,m,k=o(),L=o(),W=o(),B=o(),ye=o(),$=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,Ke(s,i),m=0;m<16;m++)L[m]=s[m],B[m]=k[m]=W[m]=0;for(k[0]=B[0]=1,m=254;m>=0;--m)b=e[m>>>3]>>>(m&7)&1,He(k,L,b),He(W,B,b),je(ye,k,W),Re(k,k,W),je(W,L,B),Re(L,L,B),U(B,ye),U($,k),ce(k,W,k),ce(W,L,ye),je(ye,k,W),Re(k,k,W),U(L,k),Re(W,B,$),ce(k,W,y),je(k,k,B),ce(W,W,k),ce(k,B,$),ce(B,L,s),U(L,ye),He(k,L,b),He(W,B,b);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=W[m],s[m+48]=L[m],s[m+64]=B[m];var V=s.subarray(32),Z=s.subarray(16);return q(V,V),ce(Z,Z,V),Je(r,Z),0}function te(r,a){return O(r,a,c)}function we(r,a){return l(a,32),te(r,a)}function Ce(r,a,i){var e=new Uint8Array(32);return O(e,i,a),D(r,f,e,ue)}var Ee=Oe,yt=ut;function hn(r,a,i,e,s,b){var m=new Uint8Array(32);return Ce(m,s,b),Ee(r,a,i,e,m)}function qe(r,a,i,e,s,b){var m=new Uint8Array(32);return Ce(m,s,b),yt(r,a,i,e,m)}var et=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Zn(r,a,i,e){for(var s=new Int32Array(16),b=new Int32Array(16),m,k,L,W,B,ye,$,V,Z,re,ne,Q,ee,J,P,Y,I,j,F,N,w,v,E,S,C,M,K=r[0],oe=r[1],ae=r[2],ie=r[3],d=r[4],le=r[5],be=r[6],he=r[7],se=a[0],xe=a[1],ge=a[2],ke=a[3],me=a[4],ve=a[5],_e=a[6],Se=a[7],Me=0;e>=128;){for(F=0;F<16;F++)N=8*F+Me,s[F]=i[N+0]<<24|i[N+1]<<16|i[N+2]<<8|i[N+3],b[F]=i[N+4]<<24|i[N+5]<<16|i[N+6]<<8|i[N+7];for(F=0;F<80;F++)if(m=K,k=oe,L=ae,W=ie,B=d,ye=le,$=be,V=he,Z=se,re=xe,ne=ge,Q=ke,ee=me,J=ve,P=_e,Y=Se,w=he,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(d>>>14|me<<18)^(d>>>18|me<<14)^(me>>>9|d<<23),v=(me>>>14|d<<18)^(me>>>18|d<<14)^(d>>>9|me<<23),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=d&le^~d&be,v=me&ve^~me&_e,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=et[F*2],v=et[F*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=s[F%16],v=b[F%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,I=C&65535|M<<16,j=E&65535|S<<16,w=I,v=j,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=(K>>>28|se<<4)^(se>>>2|K<<30)^(se>>>7|K<<25),v=(se>>>28|K<<4)^(K>>>2|se<<30)^(K>>>7|se<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,w=K&oe^K&ae^oe&ae,v=se&xe^se&ge^xe&ge,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,V=C&65535|M<<16,Y=E&65535|S<<16,w=W,v=Q,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=I,v=j,E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,W=C&65535|M<<16,Q=E&65535|S<<16,oe=m,ae=k,ie=L,d=W,le=B,be=ye,he=$,K=V,xe=Z,ge=re,ke=ne,me=Q,ve=ee,_e=J,Se=P,se=Y,F%16===15)for(N=0;N<16;N++)w=s[N],v=b[N],E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=s[(N+9)%16],v=b[(N+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(N+1)%16],j=b[(N+1)%16],w=(I>>>1|j<<31)^(I>>>8|j<<24)^I>>>7,v=(j>>>1|I<<31)^(j>>>8|I<<24)^(j>>>7|I<<25),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,I=s[(N+14)%16],j=b[(N+14)%16],w=(I>>>19|j<<13)^(j>>>29|I<<3)^I>>>6,v=(j>>>19|I<<13)^(I>>>29|j<<3)^(j>>>6|I<<26),E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,s[N]=C&65535|M<<16,b[N]=E&65535|S<<16;w=K,v=se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[0]=K=C&65535|M<<16,a[0]=se=E&65535|S<<16,w=oe,v=xe,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[1]=oe=C&65535|M<<16,a[1]=xe=E&65535|S<<16,w=ae,v=ge,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[2]=ae=C&65535|M<<16,a[2]=ge=E&65535|S<<16,w=ie,v=ke,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[3]=ie=C&65535|M<<16,a[3]=ke=E&65535|S<<16,w=d,v=me,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[4]=d=C&65535|M<<16,a[4]=me=E&65535|S<<16,w=le,v=ve,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[5]=le=C&65535|M<<16,a[5]=ve=E&65535|S<<16,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[6]=be=C&65535|M<<16,a[6]=_e=E&65535|S<<16,w=he,v=Se,E=v&65535,S=v>>>16,C=w&65535,M=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,M+=w>>>16,S+=E>>>16,C+=S>>>16,M+=C>>>16,r[7]=he=C&65535|M<<16,a[7]=Se=E&65535|S<<16,Me+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),b=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Zn(e,s,a,i),i%=128,m=0;m<i;m++)b[m]=a[k-i+m];for(b[i]=128,i=256-128*(i<112?1:0),b[i-9]=0,G(b,i-8,k/536870912|0,k<<3),Zn(e,s,b,i),m=0;m<8;m++)G(r,8*m,e[m],s[m]);return 0}function Ht(r,a){var i=o(),e=o(),s=o(),b=o(),m=o(),k=o(),L=o(),W=o(),B=o();Re(i,r[1],r[0]),Re(B,a[1],a[0]),ce(i,i,B),je(e,r[0],r[1]),je(B,a[0],a[1]),ce(e,e,B),ce(s,r[3],a[3]),ce(s,s,h),ce(b,r[2],a[2]),je(b,b,b),Re(m,e,i),Re(k,b,s),je(L,b,s),je(W,e,i),ce(r[0],m,k),ce(r[1],W,L),ce(r[2],L,k),ce(r[3],m,W)}function Qn(r,a,i){var e;for(e=0;e<4;e++)He(r[e],a[e],i)}function mn(r,a){var i=o(),e=o(),s=o();q(s,a[2]),ce(i,a[0],s),ce(e,a[1],s),Je(r,e),r[31]^=gt(i)<<7}function wn(r,a,i){var e,s;for(Ge(r[0],u),Ge(r[1],p),Ge(r[2],p),Ge(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Qn(r,a,e),Ht(a,r),Ht(r,r),Qn(r,a,e)}function Kt(r,a){var i=[o(),o(),o(),o()];Ge(i[0],g),Ge(i[1],_),Ge(i[2],p),ce(i[3],g,_),wn(r,i,a)}function vn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],b;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Kt(s,e),mn(r,s),b=0;b<32;b++)a[b+32]=r[b];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function _n(r,a){var i,e,s,b;for(e=63;e>=32;--e){for(i=0,s=e-32,b=e-12;s<b;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function Sn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;_n(r,a)}function Jn(r,a,i,e){var s=new Uint8Array(64),b=new Uint8Array(64),m=new Uint8Array(64),k,L,W=new Float64Array(64),B=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ye=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(lt(m,r.subarray(32),i+32),Sn(m),Kt(B,m),mn(r,B),k=32;k<64;k++)r[k]=e[k];for(lt(b,r,i+64),Sn(b),k=0;k<64;k++)W[k]=0;for(k=0;k<32;k++)W[k]=m[k];for(k=0;k<32;k++)for(L=0;L<32;L++)W[k+L]+=b[k]*s[L];return _n(r.subarray(32),W),ye}function to(r,a){var i=o(),e=o(),s=o(),b=o(),m=o(),k=o(),L=o();return Ge(r[2],p),Ke(r[1],a),U(s,r[1]),ce(b,s,x),Re(s,s,r[2]),je(b,r[2],b),U(m,b),U(k,m),ce(L,k,m),ce(i,L,s),ce(i,i,b),H(i,i),ce(i,i,s),ce(i,i,b),ce(i,i,b),ce(r[0],i,b),U(e,r[0]),ce(e,e,b),Nt(e,s)&&ce(r[0],r[0],A),U(e,r[0]),ce(e,e,b),Nt(e,s)?-1:(gt(r[0])===a[31]>>7&&Re(r[0],u,r[0]),ce(r[3],r[0],r[1]),0)}function kn(r,a,i,e){var s,b=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],L=[o(),o(),o(),o()];if(i<64||to(L,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(m,r,i),Sn(m),wn(k,L,m),Kt(L,a.subarray(32)),Ht(k,L),mn(b,k),i-=64,fe(a,0,b,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var Cn=32,Vt=24,Bt=32,bt=16,It=32,Zt=32,Tt=32,$t=32,En=32,er=Vt,no=Bt,ro=bt,Xe=64,ct=32,ht=64,Mn=32,Ln=64;n.lowlevel={crypto_core_hsalsa20:D,crypto_stream_xor:it,crypto_stream:Pe,crypto_stream_salsa20_xor:$e,crypto_stream_salsa20:Be,crypto_onetimeauth:zt,crypto_onetimeauth_verify:st,crypto_verify_16:pe,crypto_verify_32:fe,crypto_secretbox:Oe,crypto_secretbox_open:ut,crypto_scalarmult:O,crypto_scalarmult_base:te,crypto_box_beforenm:Ce,crypto_box_afternm:Ee,crypto_box:hn,crypto_box_open:qe,crypto_box_keypair:we,crypto_hash:lt,crypto_sign:Jn,crypto_sign_keypair:vn,crypto_sign_open:kn,crypto_secretbox_KEYBYTES:Cn,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:Bt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:It,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:Tt,crypto_box_SECRETKEYBYTES:$t,crypto_box_BEFORENMBYTES:En,crypto_box_NONCEBYTES:er,crypto_box_ZEROBYTES:no,crypto_box_BOXZEROBYTES:ro,crypto_sign_BYTES:Xe,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:ht,crypto_sign_SEEDBYTES:Mn,crypto_hash_BYTES:Ln,gf:o,D:x,L:Xt,pack25519:Je,unpack25519:Ke,M:ce,A:je,S:U,Z:Re,pow2523:H,add:Ht,set25519:Ge,modL:_n,scalarmult:wn,scalarbase:Kt};function tr(r,a){if(r.length!==Cn)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function oo(r,a){if(r.length!==Tt)throw new Error("bad public key size");if(a.length!==$t)throw new Error("bad secret key size")}function Fe(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function nr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Fe(r,a,i),tr(i,a);for(var e=new Uint8Array(Bt+r.length),s=new Uint8Array(e.length),b=0;b<r.length;b++)e[b+Bt]=r[b];return Oe(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){Fe(r,a,i),tr(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),b=0;b<r.length;b++)e[b+bt]=r[b];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(Bt)},n.secretbox.keyLength=Cn,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if(Fe(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==It)throw new Error("bad p size");var i=new Uint8Array(It);return O(i,r,a),i},n.scalarMult.base=function(r){if(Fe(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(It);return te(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=It,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Fe(r,a),oo(r,a);var i=new Uint8Array(En);return Ce(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Tt),a=new Uint8Array($t);return we(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Fe(r),r.length!==$t)throw new Error("bad secret key size");var a=new Uint8Array(Tt);return te(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Tt,n.box.secretKeyLength=$t,n.box.sharedKeyLength=En,n.box.nonceLength=er,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Fe(r,a),a.length!==ht)throw new Error("bad secret key size");var i=new Uint8Array(Xe+r.length);return Jn(i,r,r.length,a),i},n.sign.open=function(r,a){if(Fe(r,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=kn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),b=0;b<s.length;b++)s[b]=i[b];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Xe),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Fe(r,a,i),a.length!==Xe)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(Xe+r.length),s=new Uint8Array(Xe+r.length),b;for(b=0;b<Xe;b++)e[b]=a[b];for(b=0;b<r.length;b++)e[b+Xe]=r[b];return kn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ct),a=new Uint8Array(ht);return vn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Fe(r),r.length!==ht)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Fe(r),r.length!==Mn)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(ht),e=0;e<32;e++)i[e]=r[e];return vn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=ht,n.sign.seedLength=Mn,n.sign.signatureLength=Xe,n.hash=function(r){Fe(r);var a=new Uint8Array(Ln);return lt(a,r,r.length),a},n.hash.hashLength=Ln,n.verify=function(r,a){return Fe(r,a),r.length===0||a.length===0||r.length!==a.length?!1:R(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,b=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(b.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=b[s];nr(b)})}else typeof Zi<"u"&&(r=ea,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,b=r.randomBytes(e);for(s=0;s<e;s++)i[s]=b[s];nr(b)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})($n)),$n.exports}var na=ta();const ra=Xi(na);function oa(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const h=t.charAt(x),g=h.charCodeAt(0);if(n[g]!==255)throw new TypeError(h+" is ambiguous");n[g]=x}const o=t.length,l=t.charAt(0),f=Math.log(o)/Math.log(256),c=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let h=0,g=0,_=0;const A=x.length;for(;_!==A&&x[_]===0;)_++,h++;const G=(A-_)*c+1>>>0,R=new Uint8Array(G);for(;_!==A;){let de=x[_],T=0;for(let z=G-1;(de!==0||T<g)&&z!==-1;z--,T++)de+=256*R[z]>>>0,R[z]=de%o>>>0,de=de/o>>>0;if(de!==0)throw new Error("Non-zero carry");g=T,_++}let pe=G-g;for(;pe!==G&&R[pe]===0;)pe++;let fe=l.repeat(h);for(;pe<G;++pe)fe+=t.charAt(R[pe]);return fe}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let h=0,g=0,_=0;for(;x[h]===l;)g++,h++;const A=(x.length-h)*f+1>>>0,G=new Uint8Array(A);for(;h<x.length;){const de=x.charCodeAt(h);if(de>255)return;let T=n[de];if(T===255)return;let z=0;for(let D=A-1;(T!==0||z<_)&&D!==-1;D--,z++)T+=o*G[D]>>>0,G[D]=T%256>>>0,T=T/256>>>0;if(T!==0)throw new Error("Non-zero carry");_=z,h++}let R=A-_;for(;R!==A&&G[R]===0;)R++;const pe=new Uint8Array(g+(A-R));let fe=g;for(;R!==A;)pe[fe++]=G[R++];return pe}function y(x){const h=p(x);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:y}}var ia="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const pr=oa(ia),Xn="cbsgo_wallet_v3",yn="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(Xn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function aa(t){localStorage.setItem(Xn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function sa(){const t=ra.sign.keyPair(),n=pr.encode(t.publicKey),o=pr.encode(t.secretKey);return{pk:n,sk:o}}function Dr(){return!!qt()}function la(){return qt()?sessionStorage.getItem(yn)==="1":!1}function ca(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:f}=sa();return aa({pk:l,sk:f,pin:n}),sessionStorage.setItem(yn,"1"),l}function fa(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(yn,"1"),n.pk}function Ye(){const t=qt();return t?t.pk:""}function da(){localStorage.removeItem(Xn),sessionStorage.removeItem(yn)}typeof window<"u"&&(window.cbsgoDevResetWallet=da);const Yr="cbsgoLoginModal";function qr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Hr(){const t=document.getElementById(Yr);t&&t.remove()}function pa(t){Hr();const n=document.createElement("div");return n.id=Yr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function ua(t,n){return`
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
  `}function ur(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function xa(){const t=!Dr();let n="";try{const h=At();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
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
        <button id="cbsgoCreateBtn" type="button" style="${ur(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${ur(!0)}">Unlock</button>
      </div>
    `,l=pa(ua(t?"Welcome to CBS-GO":"Unlock Wallet",o)),f=l.querySelector("#cbsgoLoginMsg"),c=h=>{f&&(f.textContent=h||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),y=l.querySelector("#cbsgoNick"),x=()=>{Hr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const g=String(y?.value||"").trim(),_=String(u?.value||"").trim(),A=String(p?.value||"").trim();if(g.length<2)return c("⛔ Nickname too short.");if(_.length<4)return c("⛔ PIN must be at least 4 digits.");if(_!==A)return c("⛔ PINs do not match.");c("Creating wallet…"),jr(g),await ca(_),c("✅ Wallet created. Starting…"),x()}catch(g){c(`⛔ ${String(g?.message||g)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const g=String(u?.value||"").trim();if(g.length<4)return c("⛔ PIN must be at least 4 digits.");c("Unlocking…"),await fa(g),c("✅ Unlocked."),x()}catch{c("⛔ Wrong PIN (or wallet data missing).")}})}}const ga="https://cxfedvowjgkqrakkkjpi.supabase.co",ya="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Ue=io(ga,ya);function ba(){const t=Ye();if(!t)return null;const n=At(),o=gn();return{wallet_pk:t,nickname:n,avatar:o}}async function rn(t={}){try{const n=ba();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Ue.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ha=15e3,ma=1e4,wa=300*1e3;let Ot=null,xr=0,gr=0;function va(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Ot={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",va));async function _a(){const t=Ye();if(!t||!Ot)return;const n=Date.now();if(n-xr<5e3)return;xr=n;const l=(At()||"").trim()||"Anon",f={wallet_pk:t,nickname:l,lat:Ot.lat,lng:Ot.lng,heading:Ot.heading,last_seen:new Date().toISOString()};try{const{data:c,error:u}=await Ue.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(c&&c.length>0){const p=c[0].id,{error:y}=await Ue.from("player_state").update(f).eq("id",p);y&&console.warn("CBS GO: player_state update failed",y)}else{const{error:p}=await Ue.from("player_state").insert(f);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(c){console.warn("CBS GO: pushMyState error",c)}}async function Sa(){const t=Ye();if(!t)return;const n=Date.now();if(n-gr<3e3)return;gr=n;const o=new Date(Date.now()-wa).toISOString();try{const{data:l,error:f}=await Ue.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(f){console.warn("CBS GO: fetch online players failed",f);return}const c=Array.isArray(l)?l:[],u=Array.from(new Set(c.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:h}=await Ue.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(x)&&(p=new Map(x.map(g=>[g.wallet_pk,g])))}const y=c.map(x=>{const h=x.lat,g=x.lng,_=typeof h=="number"?h:parseFloat(h),A=typeof g=="number"?g:parseFloat(g);if(!Number.isFinite(_)||!Number.isFinite(A))return null;const G=p.get(x.wallet_pk)||null,R=G&&G.nickname||x.nickname||"Anon",pe=G&&G.avatar?String(G.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:R,avatar:pe,lat:_,lng:A,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:y}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function ka(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{_a()},ha),setInterval(()=>{Sa()},ma))}ka();function Kr(){const t=Ye();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function ln(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Ca(t){const n=Kr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Ue.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw ln("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function Ea(t){const n=Kr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:f}=await Ue.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(f)throw ln("acceptFriendRequest",f),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Ma(){const t=Ye();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Ue.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw ln("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],f=[],c=[];for(const p of l){const y=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!y&&!x)continue;const h=p.a_wallet===t?p.b_wallet:p.a_wallet,g={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:h,nickname:null,avatar:""};y&&f.push(g),x&&c.push(g)}const u=Array.from(new Set([...f,...c].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:y}=await Ue.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!y&&Array.isArray(p)){const x=new Map;for(const g of p)g.wallet_pk&&x.set(String(g.wallet_pk),{nickname:g.nickname||null,avatar:g.avatar||""});const h=g=>{g.forEach(_=>{const A=x.get(_.otherWallet);A&&(_.nickname=A.nickname||null,_.avatar=A.avatar||"")})};h(f),h(c)}else y&&ln("loadFriendsOverview:players",y)}return{incoming:f,accepted:c}}let Ut=null;async function Xr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Ut=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Ut.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function La(){try{Ut&&(await Ut.release(),Ut=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Aa(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Xr():await La()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function za(){const t=Ye();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Na(t){return String(t||"").trim()}async function Vr(t,n={}){const o=za(),l=Na(t),f=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),c=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0))),u=n.cardId?String(n.cardId||"").trim():"",p=Math.max(0,Math.floor(Number(n.cardQty!=null?n.cardQty:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!f&&!c&&!p)throw new Error("Set tickets, CBS and/or cards above 0.");if(p>0&&!u)throw new Error("Select a card to send.");if(f>0&&Mr()<f)throw new Error("Not enough tickets in your bag.");if(c>0&&Lr()<c)throw new Error("Not enough CBS (play money) in your bag.");if(p>0&&So(u)<p)throw new Error("Not enough of that card in your collection.");let y=0,x=0,h=null,g=0;try{f>0&&(wo(f),y=f),c>0&&(vo(c),x=c),p>0&&u&&(ko(u,p),h=u,g=p);const{error:_}=await Ue.from("trades").insert({from_wallet:o,to_wallet:l,tickets:f||0,cbs:c||0,card_id:u||null,card_qty:p||null,status:"sent"});if(_)throw y>0&&Lt(y),x>0&&un(x),h&&g>0&&Ar(h,g),console.warn("CBS GO sendGiftToWallet Supabase error",_),new Error(_.message||"Could not save gift to Supabase (permissions or network issue).");if(typeof window<"u")try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftSent",{detail:{toWallet:l,tickets:f,cbs:c,cardId:u||null,cardQty:p||0}}))}catch(A){console.warn("CBS GO: dispatch friendGiftSent failed",A)}return{ok:!0}}catch(_){throw _ instanceof Error?_:new Error(String(_?.message||_)||"Failed to send gift.")}}async function Vn(){const t=Ye();if(t)try{const{data:n,error:o}=await Ue.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const c=Array.from(new Set(n.map(u=>u&&u.from_wallet).filter(u=>typeof u=="string"&&u.trim().length>0)));if(c.length>0){const{data:u,error:p}=await Ue.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",c);!p&&Array.isArray(u)?l=new Map(u.filter(y=>y&&y.wallet_pk).map(y=>[String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""}])):p&&console.warn("CBS GO pullIncomingGifts players error",p)}}catch(c){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",c)}const f=[];for(const c of n){if(!c)continue;const u=Number(c.tickets||0),p=Number(c.cbs||0),y=c.card_id?String(c.card_id||"").trim():"",x=Math.max(0,Number(c.card_qty||0));if(u>0&&Lt(u),p>0&&un(p),y&&x>0&&Ar(y,x),(u>0||p>0||y&&x>0)&&typeof window<"u"){const h=l.get(c.from_wallet)||{nickname:null,avatar:""},g={id:c.id||null,fromWallet:c.from_wallet||"",toWallet:c.to_wallet||"",tickets:u,cbs:p,cardId:y||null,cardQty:x||0,createdAt:c.created_at||null,senderNickname:h.nickname||null,senderAvatar:h.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:g}))}catch(_){console.warn("CBS GO: dispatch friendGiftReceived failed",_)}}c.id&&f.push(c.id)}if(f.length>0){const{error:c}=await Ue.from("trades").update({status:"claimed"}).in("id",f);c&&console.warn("CBS GO pullIncomingGifts update status error",c)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0,l=null,f=0)=>Vr(t,{tickets:n,cbs:o,cardId:l,cardQty:f}),window.cbsgoPullGifts=Vn);function Ne(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function cn(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const Zr="cbsgo_cards_v1";function Ba(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function fn(){const t=localStorage.getItem(Zr),n=Ba(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const f=Number(l.count||0);Number.isFinite(f)&&f>0&&(o[l.id]=f)}),o}function Ia(t){const n={};for(const[l,f]of Object.entries(t||{})){const c=Number(f||0);Number.isFinite(c)&&c>0&&(n[l]=c)}const o={counts:n};try{localStorage.setItem(Zr,JSON.stringify(o))}catch{}}function Ta(){const t=fn(),n=["walk_sun_1","walk_rain_1","walk_night_1","walk_city_1","walk_nature_1","walk_beach_1","cbs_heart_1","cbs_chain_1","cbs_fire_1","cbs_go_1","walk_morning_1","walk_evening_1","walk_park_1","walk_bridge_1","cbs_star_1","cbs_glow_1","cbs_team_1","cbs_legend_1","walk_placeholder_1","walk_placeholder_2","cbs_placeholder_1","cbs_placeholder_2"];let o=0,l=0;for(const f of n){const c=Number(t[f]||0);Number.isFinite(c)&&c>0&&(o+=1,l+=c)}return{cardTypes:o,cardTotal:l}}function bn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Gn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function yr(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${Ne(t)}</div>
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
  `}function $a(){const t=At(),n=gn(),o=Ye();return`
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
        ${cn(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Ne(t)}" maxlength="24" style="
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
                    display:flex;
                    align-items:center;
                    gap:8px;
                    flex-wrap:wrap;
                  ">
                    <div style="
                      font-size:11px;
                      opacity:.95;
                      padding:8px 10px;
                      border-radius:10px;
                      border:1px solid rgba(255,255,255,.16);
                      background:rgba(255,255,255,.04);
                      word-break:break-all;
                      font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                      max-width:100%;
                    ">
                      ${Ne(o)}
                    </div>
                    <button type="button" id="profileCopyWalletBtn" style="
                      padding:6px 10px;
                      border-radius:999px;
                      border:1px solid rgba(255,255,255,.18);
                      background:rgba(90,200,255,.18);
                      color:#fff;
                      font-size:11px;
                      font-weight:600;
                      cursor:pointer;
                      white-space:nowrap;
                    ">
                      Copy
                    </button>
                  </div>
                  <div id="profileWalletMsg" style="margin-top:4px;font-size:11px;opacity:.85;"></div>
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
  `}function Pa(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const f=T=>{const z=document.querySelector("#profileMsg");z&&(z.textContent=T||"")};t&&f(t.value?`✅ Profile loaded: ${t.value}`:"");const c=()=>{if(!t)return;const T=jr(t.value);f(`✅ Name saved: ${T}`);try{rn()}catch(z){console.warn("CBS GO: failed to sync profile after name change",z)}};t&&(t.addEventListener("input",()=>{f("Saving…"),l&&clearTimeout(l),l=setTimeout(c,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),c()})),n&&n.addEventListener("change",()=>{const T=n.files&&n.files[0];if(!T)return;if(T.size>15e5){f("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}f("Uploading photo…");const z=new FileReader;z.onload=()=>{ai(String(z.result||"")),f("✅ Photo saved"),Et();try{rn()}catch(D){console.warn("CBS GO: failed to sync profile after avatar change",D)}},z.onerror=()=>f("⛔ Failed to read image."),z.readAsDataURL(T)}),o&&(o.onclick=()=>{si(),f("✅ Photo removed"),Et();try{rn()}catch(T){console.warn("CBS GO: failed to sync profile after avatar removal",T)}});const u=document.querySelector("#profileCopyWalletBtn"),p=document.querySelector("#profileWalletMsg"),y=Ye(),x=T=>{p&&(p.textContent=T||"")};u&&y&&(u.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(y),x("✅ Wallet address copied.")):x("📋 Copy not supported in this browser.")}catch{x("⛔ Failed to copy address.")}});const h=document.querySelector("#friendWalletInput"),g=document.querySelector("#friendSendBtn"),_=document.querySelector("#friendsMsg"),A=document.querySelector("#friendsIncomingList"),G=document.querySelector("#friendsAcceptedList"),R=T=>{_&&(_.textContent=T||"")},pe=T=>{if(!T)return"";const z=String(T);return z.length<=12?z:`${z.slice(0,5)}…${z.slice(-4)}`},fe=(T,z="")=>{const D=T.nickname&&T.nickname.trim()?T.nickname.trim():pe(T.otherWallet),ue=pe(T.otherWallet),$e=T.otherWallet||"",Be=cn(T.avatar||"",32),Pe=$e?`
        <button
          type="button"
          class="friendCopyBtn"
          data-wallet="${Ne($e)}"
          style="
            padding:4px 8px;
            border-radius:999px;
            border:1px solid rgba(148,163,184,0.9);
            background:rgba(15,23,42,0.95);
            color:#e5e7eb;
            font-size:10px;
            cursor:pointer;
            white-space:nowrap;
          "
        >
          Copy
        </button>
      `:"";return`
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
          ${Be}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Ne(D||"Friend")}
            </div>
            ${ue?`<div style="font-size:11px;opacity:.7;">${Ne(ue)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;display:flex;gap:6px;align-items:center;">
          ${Pe}
          ${z||""}
        </div>
      </div>
    `};async function de(){if(!(!A||!G))try{A.textContent="Loading…",G.textContent="Loading…";const T=await Ma();T.incoming.length?A.innerHTML=T.incoming.map(z=>{const D=`
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${z.id}"
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
            `;return fe(z,D)}).join(""):A.textContent="No incoming requests.",T.accepted.length?G.innerHTML=T.accepted.map(z=>fe(z,`
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
            `)).join(""):G.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(z=>{z.addEventListener("click",async()=>{const D=z.getAttribute("data-friend-id");if(D){R("Accepting friend…"),z.disabled=!0;try{await Ea(D),R("✅ Friend added."),await de()}catch(ue){console.warn(ue),R(`⛔ ${ue.message||ue}`),z.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(z=>{z.addEventListener("click",async()=>{const D=z.getAttribute("data-wallet")||"";if(D)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(D),R("✅ Friend wallet copied.")):R("📋 Copy not supported in this browser.")}catch{R("⛔ Could not copy wallet.")}})})}catch(T){console.warn("CBS GO: refreshFriends failed",T),A.textContent="Could not load friends.",G.textContent=""}}g&&h&&g.addEventListener("click",async()=>{const T=h.value.trim();if(!T){R("Enter a wallet address first.");return}R("Sending friend request…"),g.disabled=!0;try{await Ca(T),R("✅ Friend request sent."),h.value="",await de()}catch(z){console.warn(z),R(`⛔ ${z.message||z}`)}finally{g.disabled=!1}}),de().catch(()=>{})}function Oa(){const t=Mr(),n=Lr(),o=Ye(),{cardTypes:l,cardTotal:f}=Ta(),c=fn(),u=f>0?`You own ${f} cards (${l} different).`:"You don’t have any cards yet to send.",p=Object.entries(c).filter(([,x])=>Number(x||0)>0).map(([x,h])=>`
        <option value="${Ne(x)}">
          ${Ne(x)} (x${h})
        </option>
      `).join(""),y=p.trim().length>0;return`
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
                display:flex;
                align-items:center;
                gap:8px;
                flex-wrap:wrap;
              ">
                <div style="
                  font-size:11px;
                  opacity:.95;
                  padding:6px 8px;
                  border-radius:10px;
                  border:1px solid rgba(255,255,255,.16);
                  background:rgba(255,255,255,.04);
                  word-break:break-all;
                  font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                  max-width:100%;
                ">
                  ${Ne(o)}
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
              </div>
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
          ${Ne(u)}
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
              Send tickets, CBS (play money) and optionally a card to another CBS-GO wallet. Off-chain via Supabase.
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

          <!-- Card send blok -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="flex:1;min-width:120px;">
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
                ${y?p:""}
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
  `}function ja(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Ki()}catch(A){console.warn("CBS GO: openCardsPanel failed",A)}});const l=Ye(),f=document.querySelector("#giftWalletInput"),c=document.querySelector("#giftTicketsInput"),u=document.querySelector("#giftCbsInput"),p=document.querySelector("#giftCardSelect"),y=document.querySelector("#giftCardQtyInput"),x=document.querySelector("#giftSendBtn"),h=document.querySelector("#giftMsg"),g=A=>{h&&(h.textContent=A||"")};if(x&&f&&x.addEventListener("click",async()=>{const A=f.value.trim(),G=c?.value??"",R=u?.value??"",pe=p?.value??"",fe=y?.value??"",de=Number(G||"0"),T=Number(R||"0");let z=String(pe||"").trim(),D=Number(fe||"0");if(!A){g("Enter a wallet address first.");return}if(!de&&!T&&!D){g("Set tickets, CBS and/or a card above 0.");return}if(z&&(!Number.isFinite(D)||D<=0)&&(D=1),z){const ue=fn(),$e=Number(ue[z]||0);if(!$e||$e<D){g("You don’t have enough of that card in your collection.");return}}x.disabled=!0,g("Sending gift…");try{if(await Vr(A,{tickets:de,cbs:T,cardId:z||null,cardQty:D}),g("✅ Gift sent."),c&&(c.value=""),u&&(u.value=""),p&&(p.value=""),y&&(y.value=""),z&&D>0)try{const ue=fn(),Be=Number(ue[z]||0)-D;Be>0?ue[z]=Be:delete ue[z],Ia(ue),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged"))}catch(ue){console.warn("CBS GO: failed to update card counts after send",ue)}typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:A,tickets:de,cbs:T,cardId:z||null,cardQty:D||0}}))}catch(ue){console.warn(ue),g(`⛔ ${ue.message||"Could not send gift."}`)}finally{x.disabled=!1}}),!t||!l)return;const _=A=>{n&&(n.textContent=A||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),_("✅ Wallet address copied to clipboard.")):_("📋 Copy not supported in this browser.")}catch{_("⛔ Failed to copy address.")}},Vn().catch(()=>{})}function Qr(){const t=bn();return t==="profile"?yr("Profile",`<div id="profileMount">${$a()}</div>`):t==="bag"?yr("Bag",`<div id="bagMount">${Oa()}</div>`):""}function Ra(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${ji()}
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

      <!-- 🎁 Groot overlay-venster voor cadeautjes + streak + daily-goal + gifts -->
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Qr();const n=bn();n==="profile"&&Pa(),n==="bag"&&ja();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Gn("map"),Et()})}function Ua(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=bn();Gn(o===n?"map":n||"map"),Et()})})}function Fa(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:f,toWallet:c,tickets:u=0,cbs:p=0,cardId:y=null,cardQty:x=0}=t||{};if(!u&&!p&&!x)return;n.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.78)",h.style.pointerEvents="auto";const g=document.createElement("div");g.style.width="min(320px, 90vw)",g.style.borderRadius="22px",g.style.border="1px solid rgba(56,189,248,.85)",g.style.background="rgba(10,12,18,0.98)",g.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",g.style.padding="18px 16px 14px 16px",g.style.color="#fff",g.style.fontFamily="system-ui,sans-serif",g.style.opacity="0",g.style.transform="translateY(12px) scale(0.97)",g.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=At(),A=gn(),G=o==="sent"?"Gift sent":"You received a gift",R=[];u&&R.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&R.push(`🪙 ${p} CBS`),y&&x&&R.push(`🃏 ${x} card${x===1?"":"s"}`);const pe=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${Ne(_)}</b> to <span style="opacity:.9;">${Ne(c||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${Ne(l||"Friend")}</b>
        </div>
      `,fe=cn(o==="sent"?A||"":f||"",40);g.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${fe}
      <div>
        <div style="font-size:15px;font-weight:800;">${Ne(G)}</div>
        ${pe}
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">
      ${Ne(R.join(" · "))}
    </div>
    <div style="font-size:11px;opacity:.78;margin-bottom:10px;">
      Gifts are added to your Bag.
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
  `,h.appendChild(g),n.appendChild(h),requestAnimationFrame(()=>{g.style.opacity="1",g.style.transform="translateY(0) scale(1)"});const de=()=>{g.style.opacity="0",g.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},T=document.getElementById("cbsgoTradePopupCloseBtn");T&&(T.onclick=de),h.addEventListener("click",z=>{z.target===h&&de()})}function br(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ra();try{Xr(),Aa()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{rn()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Ua(),Gi(),oi(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=$r())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=Tr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{bn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let y=p.querySelector(".cbsgoToastBox");y||(y=document.createElement("div"),y.className="cbsgoToastBox",y.style.pointerEvents="auto",y.style.padding="8px 12px",y.style.borderRadius="999px",y.style.border="1px solid rgba(255,255,255,.25)",y.style.background="rgba(10,12,18,.88)",y.style.backdropFilter="blur(10px)",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.fontSize="11px",y.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",y.style.opacity="0",y.style.transform="translateY(10px)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(y)),y.textContent=u||"",y.style.opacity="1",y.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{y.style.opacity="0",y.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},y=Number(p.xp||0),x=Number(p.tickets||0),h=Number(p.cbs||0);if(!y&&!x&&!h)return;const g=[];y&&g.push(`+${y} XP`),x&&g.push(`+${x} ticket${x===1?"":"s"}`),h&&g.push(`+${h} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${g.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const y=Number(u?.steps||0),x=Number(u?.goal||0),h=u?.dayKey||"",g=document.createElement("div");g.style.position="fixed",g.style.inset="0",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.background="rgba(5,7,11,0.80)",g.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const A=x?`${y}/${x} steps`:`${y} steps`;_.innerHTML=`
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
        ${A}
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
    `,g.appendChild(_),p.appendChild(g),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const G=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},R=document.getElementById("cbsgoDailyGoalCloseBtn");R&&(R.onclick=G),g.addEventListener("click",pe=>{pe.target===g&&G()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function f(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const y=Number(u?.xp||0),x=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!y&&!x&&!h)return;p.innerHTML="";const g=document.createElement("div");g.style.position="fixed",g.style.inset="0",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.background="rgba(5,7,11,0.75)",g.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const A=[];y&&A.push(`+${y} XP`),x&&A.push(`+${x} ticket${x===1?"":"s"}`),h&&A.push(`+${h} CBS`),_.innerHTML=`
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
        ${Ne(A.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,g.appendChild(_),p.appendChild(g),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{f(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const y=Number(u?.days||7),x=Number(u?.rewardCbs||0),h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.80)",h.style.pointerEvents="auto";const g=document.createElement("div");g.style.width="min(340px, 92vw)",g.style.borderRadius="22px",g.style.border="1px solid rgba(251,191,36,.85)",g.style.background="rgba(10,12,18,0.98)",g.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",g.style.padding="20px 18px 16px 18px",g.style.textAlign="center",g.style.color="#fff",g.style.fontFamily="system-ui,sans-serif",g.style.opacity="0",g.style.transform="translateY(14px) scale(0.96)",g.style.transition="opacity .25s ease-out, transform .25s ease-out",g.innerHTML=`
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
    `,h.appendChild(g),p.appendChild(h),requestAnimationFrame(()=>{g.style.opacity="1",g.style.transform="translateY(0) scale(1)"});const _=()=>{g.style.opacity="0",g.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},A=document.getElementById("cbsgoStreakCloseBtn");A&&(A.onclick=_),h.addEventListener("click",G=>{G.target===h&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{c(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{Fa(u?.detail||{})})),window.__cbsgo_friend_gift_bridge||(window.__cbsgo_friend_gift_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{};try{window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"received",fromNickname:p.senderNickname||null,fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0}}))}catch(y){console.warn("CBS GO: friendGiftReceived bridge failed",y)}})),Et(),Pr()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ii)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){On({id:"__daily__",name:"Daily Glow"});return}if(Sr(p))return;const y=uo.find(x=>x.id===p);y&&On(y)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&lo(async()=>{const{completeNode:y}=await Promise.resolve().then(()=>yo);return{completeNode:y}},void 0).then(({completeNode:y})=>{y(p),Jr()})})),Vn().then(()=>{}).catch(()=>{})}function Jr(){if(!document.querySelector("#app"))return;if(Dr()&&la()){br();return}xa();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),br()};window.addEventListener("cbsgo:loginDone",n)}function eo(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function dn(t){const n=eo();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";dn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{dn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function hr(){try{if(!document.getElementById("app")){dn("❌ #app not found in index.html");return}Jr();const n=eo();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){dn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hr,{once:!0}):hr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
