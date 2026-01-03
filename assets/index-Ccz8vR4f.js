import{createClient as ro}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const c of d)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function o(d){const c={};return d.integrity&&(c.integrity=d.integrity),d.referrerPolicy&&(c.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?c.credentials="include":d.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(d){if(d.ep)return;d.ep=!0;const c=o(d);fetch(d.href,c)}})();const oo="modulepreload",io=function(t){return"/cbs-go/"+t},rr={},ao=function(n,o,l){let d=Promise.resolve();if(o&&o.length>0){let S=function(p){return Promise.all(p.map(u=>Promise.resolve(u).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),b=g?.nonce||g?.getAttribute("nonce");d=S(o.map(p=>{if(p=io(p),p in rr)return;rr[p]=!0;const u=p.endsWith(".css"),y=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${y}`))return;const A=document.createElement("link");if(A.rel=u?"stylesheet":oo,u||(A.as="script"),A.crossOrigin="",A.href=p,b&&A.setAttribute("nonce",b),document.head.appendChild(A),u)return new Promise((B,v)=>{A.addEventListener("load",B),A.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${p}`)))})}))}function c(g){const b=new Event("vite:preloadError",{cancelable:!0});if(b.payload=g,window.dispatchEvent(b),!b.defaultPrevented)throw g}return d.then(g=>{for(const b of g||[])b.status==="rejected"&&c(b.reason);return n().catch(c)})},$n="cbsgoLevelUpOverlay",or="cbsgoLevelUpStyles",Ln="https://smitskecbs.github.io/cbs-go/";function so(){if(document.getElementById(or))return;const t=document.createElement("style");t.id=or,t.textContent=`
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
  `,document.head.appendChild(t)}function An(){const t=document.getElementById($n);t&&t.remove()}function lo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const d=document.createElement("div");d.className="cbsgoConfettiPiece";const c=10+Math.random()*80,g=Math.random()*.6,b=1+Math.random()*.8;d.style.left=`${c}%`,d.style.top="-10px",d.style.background=n[Math.floor(Math.random()*n.length)],d.style.animationDelay=`${g}s`,d.style.animationDuration=`${b}s`,t.appendChild(d),setTimeout(()=>d.remove(),(g+b+.3)*1e3)}}function ir(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function co(t){so(),An();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=$n,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
  `,document.body.appendChild(l);const d=l.querySelector("#cbsgoLevelUpConfettiHost");d&&lo(d);const c=()=>An(),g=l.querySelector("#cbsgoLevelUpClose"),b=l.querySelector("#cbsgoLevelUpContinue"),S=l.querySelector("#cbsgoLevelUpShareX"),p=l.querySelector("#cbsgoLevelUpCopyLink"),u=l.querySelector("#cbsgoLevelUpMsg");g&&(g.onclick=c),b&&(b.onclick=c),S&&(S.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Ln}`,A=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(A,"_blank","noopener,noreferrer")}),p&&(p.onclick=async()=>{try{await navigator.clipboard.writeText(Ln),u&&(u.textContent="✅ Link copied. Share it with your friends.")}catch{u&&(u.textContent="Could not copy link. You can share it manually: "+Ln)}}),setTimeout(()=>{document.getElementById($n)&&An()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{co(t?.detail||{})}));const fo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],mr="cbsgo_state_v6";function po(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function uo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ut(){const t=localStorage.getItem(mr);return po(t,uo())}function wr(t){t.updatedAt=Date.now(),localStorage.setItem(mr,JSON.stringify(t))}function Gn(t){return 100+(Math.max(1,Number(t||1))-1)*40}function dn(){return Number(Ut().xp||0)}function Ft(){const t=dn();let n=1,o=t;for(;;){const l=Gn(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function vr(){const t=dn();let n=1,o=t;for(;;){const l=Gn(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function _r(){return Gn(Ft())}function Wt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ut();const o=Ft(),l=Ut();l.xp=Number(l.xp||0)+n,wr(l);const d=Ft();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:d}})),d>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:d,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:d,xp:l.xp}}))),l}function Sr(t){const n=String(t||"");if(!n)return!1;const o=Ut();return!!(o.completed&&o.completed[n])}function kr(t){const n=String(t||"");if(!n)return;const o=Ut();o.completed||(o.completed={}),o.completed[n]=Date.now(),wr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const xo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Wt,completeNode:kr,getLevel:Ft,getXp:dn,getXpIntoLevel:vr,getXpNeededThisLevel:_r,isNodeCompleted:Sr},Symbol.toStringTag,{value:"Module"})),Cr="cbsgoPuzzleModal";function yo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function zn(){const t=document.getElementById(Cr);t&&t.remove()}function Pn(t){zn();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],d=["🍬","💎","⭐","🍀","🔮"],c=180,g=18,b=l.length,S=.01;let p=[],u=null,y=0,A=g,B=!1,v=!1,_=null;const O=t?.name||"CBS GO Puzzle",P=document.createElement("div");P.id=Cr,P.style.position="fixed",P.style.inset="0",P.style.zIndex="999999",P.style.display="flex",P.style.alignItems="center",P.style.justifyContent="center",P.style.padding="16px",P.style.background="rgba(0,0,0,.70)",P.style.backdropFilter="blur(12px)",P.style.fontFamily="system-ui, sans-serif",P.style.color="#fff",P.innerHTML=`
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
          ${yo(O)}
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
  `,document.body.appendChild(P);const pe=document.getElementById("cbsgoBoard"),te=document.getElementById("cbsgoScore"),q=document.getElementById("cbsgoMoves"),de=document.getElementById("cbsgoStatus"),Me=document.getElementById("cbsgoPuzzleClose"),qe=document.getElementById("cbsgoPuzzleOk"),Ge=document.getElementById("cbsgoConfettiLayer");function je(F){de&&(de.textContent=F||"")}function it(){if(!Ge)return;Ge.style.display="block",Ge.innerHTML="";const F=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],Y=40;for(let K=0;K<Y;K++){const R=document.createElement("div"),ne=6+Math.floor(Math.random()*6),me=Math.random()*100,ke=Math.random()*.6,Ce=1+Math.random()*.6,gt=Math.random()*360;R.style.position="absolute",R.style.top="-10%",R.style.left=`${me}%`,R.style.width=`${ne}px`,R.style.height=`${ne*2}px`,R.style.background=F[K%F.length],R.style.opacity="0.9",R.style.borderRadius="2px",R.style.transform=`rotate(${gt}deg)`,R.style.animation=`cbsgoConfettiFall ${Ce}s ease-out ${ke}s forwards`,Ge.appendChild(R)}}function at(){return Math.floor(Math.random()*l.length)}function Lt(){p=[];for(let F=0;F<n;F++){const Y=[];for(let K=0;K<o;K++)Math.random()<S?Y.push(b):Y.push(at());p.push(Y)}}function st(F){return F===b}function Ne(){if(pe){pe.innerHTML="";for(let F=0;F<n;F++)for(let Y=0;Y<o;Y++){const K=p[F][Y],R=document.createElement("div");R.dataset.row=String(F),R.dataset.col=String(Y),R.style.borderRadius="12px",R.style.display="flex",R.style.alignItems="center",R.style.justifyContent="center",R.style.cursor=v?"default":"pointer",R.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",R.style.fontSize="20px",st(K)?(R.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",R.textContent="💥"):(R.style.background=l[K]||"#444",R.textContent=d[K]||"⬛"),u&&u.row===F&&u.col===Y&&(R.style.outline="2px solid #fff",R.style.outlineOffset="2px"),R.addEventListener("click",()=>{Ie(F,Y)}),R.addEventListener("touchstart",ne=>{if(v)return;const me=ne.touches[0];_={row:F,col:Y,x:me.clientX,y:me.clientY}}),R.addEventListener("touchend",ne=>{if(!_||v)return;const me=ne.changedTouches[0],ke=me.clientX-_.x,Ce=me.clientY-_.y;if(Math.sqrt(ke*ke+Ce*Ce)<18){Ie(F,Y),_=null;return}let We=_.row,et=_.col;Math.abs(ke)>Math.abs(Ce)?ke>0?et+=1:et-=1:Ce>0?We+=1:We-=1,We>=0&&We<n&&et>=0&&et<o&&Te(_.row,_.col,We,et),_=null,ne.preventDefault()}),pe.appendChild(R)}}}function ut(F,Y){if(!F||!Y)return!1;const K=Math.abs(F.row-Y.row),R=Math.abs(F.col-Y.col);return K+R===1}function Re(F,Y){const K=p[F.row][F.col];p[F.row][F.col]=p[Y.row][Y.col],p[Y.row][Y.col]=K}function xt(){const F=new Set;for(let Y=0;Y<n;Y++){let K=p[Y][0],R=0;for(let ne=1;ne<=o;ne++){const me=ne<o?p[Y][ne]:null;if(me===K)continue;const ke=ne-R;if(K!=null&&ke>=3)for(let Ce=R;Ce<ne;Ce++)F.add(`${Y},${Ce}`);K=me,R=ne}}for(let Y=0;Y<o;Y++){let K=p[0][Y],R=0;for(let ne=1;ne<=n;ne++){const me=ne<n?p[ne][Y]:null;if(me===K)continue;const ke=ne-R;if(K!=null&&ke>=3)for(let Ce=R;Ce<ne;Ce++)F.add(`${Ce},${Y}`);K=me,R=ne}}return F}function Ke(F){if(!F||!F.size)return 0;const Y=F.size;y+=Y*4,te&&(te.textContent=String(y)),!v&&y>=c&&yt(!0);for(const K of F){const[R,ne]=K.split(","),me=Number(R),ke=Number(ne);p[me][ke]=null}for(let K=0;K<o;K++){let R=n-1;for(let ne=n-1;ne>=0;ne--)p[ne][K]!=null&&(p[R][K]=p[ne][K],R--);for(let ne=R;ne>=0;ne--)Math.random()<S?p[ne][K]=b:p[ne][K]=at()}return Y}function Qe(F,Y){const K=new Set;for(let R=0;R<o;R++)K.add(`${F},${R}`);for(let R=0;R<n;R++)K.add(`${R},${Y}`);Ke(K),Ne(),v||setTimeout(()=>At(!1),120)}function At(F=!1){if(v)return;B=!0;const Y=()=>{if(v){B=!0;return}const K=xt();if(!K.size){B=!1,Ne(),F&&!v&&(A<=0?He():je("Nice! Keep matching."));return}Ke(K),Ne(),setTimeout(Y,120)};Y()}function yt(F){if(!v)if(v=!0,B=!0,F){je("Great job! Puzzle completed 🎉");try{t?.id&&kr(t.id),Wt(10)}catch{}it(),setTimeout(()=>{zn()},1600)}else je("Out of moves. Try again next time 🙂")}function He(){y>=c?yt(!0):A<=0&&yt(!1)}function Te(F,Y,K,R){if(B||v)return;if(A<=0){He();return}const ne={row:F,col:Y},me={row:K,col:R};if(!ut(ne,me))return;const ke=p[F][Y],Ce=p[K][R],gt=st(ke)||st(Ce);if(Re(ne,me),u=null,A--,q&&(q.textContent=String(A)),gt){Ne();const We=st(p[F][Y])?{row:F,col:Y}:{row:K,col:R};Qe(We.row,We.col),He();return}if(!xt().size){Re(ne,me),Ne(),je("No match… try another swap."),He();return}je(""),Ne(),At(!0)}function Ie(F,Y){if(B||v)return;if(A<=0){He();return}const K={row:F,col:Y};if(!u){u=K,Ne();return}if(u.row===F&&u.col===Y){u=null,Ne();return}if(!ut(u,K)){u=K,Ne();return}Te(u.row,u.col,K.row,K.col)}function fe(){zn()}Me&&(Me.onclick=fe),qe&&(qe.onclick=()=>{fe()}),Lt(),Ne(),je("Tap or swipe two neighboring tiles to swap them.")}const Er="cbsgo_inventory_v2";function go(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function bo(){return{tickets:0,cbs:0,cards:{}}}function De(){const t=localStorage.getItem(Er),n=go(t,bo());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function pn(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Er,JSON.stringify(n))}function Mr(){return Number(De().tickets||0)}function Lr(){return Number(De().cbs||0)}function Mt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De();return o.tickets=Number(o.tickets||0)+n,pn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function un(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De();return o.cbs=Number(o.cbs||0)+n,pn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function ho(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,pn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function mo(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return De();const o=De(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,pn(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}const Ar="cbsgo_steps_v6",wo="cbsgo_steps_v5",vo="cbsgo_gps_autostart_v2",zr="cbsgo_daily_puzzle_v1",_o=.75,kt=5e3,on=7,On=100,So=1e3,ko=.5,Co=2e3,Eo=4.5,Bn=1500,Nn=200,Mo=.25,Lo=.05,Ao=.3;let Qt=null,en=!1,mt={msg:"init"};function jn(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Br="cbsgo_cards_v1",zo=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Bo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function No(t){return zo.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function To(){try{const t=localStorage.getItem(Br),n=jn(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,d]of Object.entries(n))if(d&&typeof d=="object"&&"count"in d){const c=Number(d.count);Number.isFinite(c)&&c>0&&(o[l]=c)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Io(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[d,c]of Object.entries(n)){const g=Number(c||0);Number.isFinite(g)&&g>0&&(o[d]=g)}const l={counts:o};localStorage.setItem(Br,JSON.stringify(l))}catch{}}function $o(t,n=1){const o=Bo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const c={...To().counts||{}},b=Number(c[o]||0)+l;c[o]=b,Io({counts:c});const S=No(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:c}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:b,card:S}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:S}}))}catch{}return{cardId:o,count:b,card:S}}function ot(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Po(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,d]=n,c=new Date(o,l-1,d);return Number.isNaN(c.getTime())?null:c}function Oo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Nr(t,n){const o=Po(t);if(!o)return[];const l=[];for(let d=n-1;d>=0;d--){const c=new Date(o.getTime());c.setDate(c.getDate()-d),l.push(Oo(c))}return l}function an(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:ot(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function jo(t){const n=ot();return!t||typeof t!="object"?an():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function xn(t){t.updatedAt=Date.now(),localStorage.setItem(Ar,JSON.stringify(t))}function Ro(t,n){if(!n)return;const o=Nr(n,on);!o.length||!o.every(d=>!!t.streak[d])||t.lastStreakRewardDate!==n&&(un(On),Dt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:on,rewardCbs:On,lastDayKey:n}})))}function ar(t){t=jo(t||an());const n=ot();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Ro(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,xn(t)}return t}function pt(){let t=localStorage.getItem(Ar);if(!t){const o=localStorage.getItem(wo);if(o){const l=jn(o,an()),d=ar(l);return xn(d),d}}const n=jn(t,an());return ar(n)}function tn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Uo()}}))}function Wn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Dt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Dn(t,n,o,l){const d=Number(t||0),c=Number(n||0),g=0;if(!(!d&&!c&&!g))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:d,tickets:c,cbs:g,reason:l||"distance"}}))}catch{}}function Uo(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Fo(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Go(){return Fo()/1e3}function Wo(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,d=t.dayKey||ot(),c=t.streak||{},b=Nr(d,on).map(S=>{let p=!1;return S===d?p=l:p=!!c[S],{dateKey:S,reached:p}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:b,todayKey:d,streakLength:on,rewardPerStreak:On}}function sr(){return!!en}function Do(){try{return localStorage.getItem(zr)===ot()}catch{return!1}}function Yo(){try{localStorage.setItem(zr,ot())}catch{}}function qo(t,n){return Do()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:ot()}})),Yo(),!0)}function lr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function Ko(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const d=l-o;if(!Number.isFinite(d)||d<Bn)return;const c=Math.floor(d/Bn);c<=0||(Mt(c),Dt(),Dn(0,c,0,"boost"),t.boostLastStep=o+c*Bn)}function Ho(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<Nn){t.chestMeters=n;return}let o=0;for(;n>=Nn&&o<5;)if(n-=Nn,o+=1,Math.random()<Mo){const l=Math.random()<Lo,d=l?10:3,c=l?2:1;Wt(d),Wn(),Mt(c),Dt();const g=l&&Math.random()<Ao;Dn(d,c,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:d,tickets:c,rare:l,hasCBSFlag:g}}));break}t.chestMeters=n}function Xo(t,n){const l=p=>p*Math.PI/180,d=l(n.lat-t.lat),c=l(n.lng-t.lng),g=l(t.lat),b=l(n.lat),S=Math.sin(d/2)**2+Math.cos(g)*Math.cos(b)*Math.sin(c/2)**2;return 2*6371e3*Math.asin(Math.sqrt(S))}function Vo(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const d=Math.floor(n/1e3),c=Number(t.xpKmAwarded||0);if(d>c){const p=d-c;p>0&&(Wt(p),Wn(),t.xpKmAwarded=d,o+=p)}const b=Math.floor(n/2500),S=Number(t.ticketChunksAwarded||0);if(b>S){const p=b-S;p>0&&(Mt(p),Dt(),t.ticketChunksAwarded=b,l+=p)}(o>0||l>0)&&Dn(o,l,0,"distance")}function Zo(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),d=Math.floor((o.meters||0)/_o);if(d>l){const c=d-l;o.steps=d,o.daySteps=Number(o.daySteps||0)+c}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||ot(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),Vo(o),Ko(o),Ho(o),xn(o),tn(),o}function Jo(){Qt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Qt),Qt=null}async function cr(t={}){const n=!!t.silent;if(!navigator.geolocation)return mt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(vo,"1")}catch{}Jo(),en=!0,mt={msg:"requesting",t:Date.now()};try{return Qt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,d=o.coords.longitude,c=o.coords.accuracy||999,g=Date.now(),b=pt(),S=b.lastPos;b.lastPos={lat:l,lng:d,t:g},xn(b);const p=Number.isFinite(o.coords.heading)?o.coords.heading:null,u=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:d,acc:c,heading:p,speed:u,t:g}})),c>So){mt={lat:l,lng:d,acc:c,t:g,reason:"accuracy",boostMs:lr()},tn();return}qo(l,d);let y=0,A=0,B=0,v=0,_="no-last";S&&typeof S.lat=="number"&&typeof S.lng=="number"&&typeof S.t=="number"&&(y=Xo({lat:S.lat,lng:S.lng},{lat:l,lng:d}),A=Math.max(1,(g-S.t)/1e3),B=y/A,y<ko?_="jitter":y>Co?_="teleport":B>Eo?_="too-fast":(Zo(y),v=y,_="ok")),mt={lat:l,lng:d,acc:c,t:g,dist:Math.round(y),dt:Math.round(A),speed:Number.isFinite(B)?Number(B.toFixed(2)):0,added:Math.round(v),reason:_,boostMs:lr()},tn()},o=>{en=!1,mt={err:o?.message||"GPS blocked",t:Date.now()},tn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return en=!1,mt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Qo(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>sr()||await cr({silent:!0}))();const n=async()=>{sr()||await cr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),d=Number(n.cbs||0);o>0&&(Wt(o),Wn()),(l>0||d>0)&&(l>0&&Mt(l),d>0&&un(d),Dt());const c=n.cardId||n.card_id;if(c)try{const g=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;$o(c,g)}catch(g){console.warn("CBS GO: grantCard from lootReward failed",g)}}));function Tr(){const t=dn(),n=Ft(),o=vr(),l=_r(),d=Go(),c=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
        <div>${d.toFixed(2)} km walked</div>
      </div>
    </div>
  `}function Ir(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:d,rewardPerStreak:c}=Wo(),g=n>0?Math.min(100,Math.round(t/n*100)):0,b=(l||[]).map(p=>p.reached?"★":"☆").join(" ");return`
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
        ${d}-day streak → +${c} CBS
      </div>
    </div>
  `}function $r(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ei(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const Pr="cbsgo_player_name_v2",Yn="cbsgo_player_avatar_v2";function Yt(){try{return localStorage.getItem(Pr)||"Sovereign"}catch{return"Sovereign"}}function Or(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Pr,n)}catch{}return n}function qn(){try{return localStorage.getItem(Yn)||""}catch{return""}}function ti(t){const n=String(t||"");try{localStorage.setItem(Yn,n)}catch{}return n}function ni(){try{localStorage.removeItem(Yn)}catch{}}let X=null,tt=null,nt=null,It=null,Pt=null,Fe=null,Be=null,wt=0,ft=!1,Je=!0,Ue=null;const Ve=new Map;let Ze=!0,Ot={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const ri="48a387bba00043ac4ba5823371abc9d2",Gt=80,oi=6,ii=80,ai=220,si=6e4,li=5*6e4,ci=300,fi=.35,Tn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],di=350,pi=.35,ui=120;let sn=0,vt=0,nn=null,Rn=!1,St=[];function dt(t){return document.getElementById(t)}function _t(t){const n=dt("cbsgoMapHost");if(!n)return;let o=dt("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function xi(){const t=String(Yt()||"").trim();return t?t[0].toUpperCase():"🙂"}function Un(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=p=>p*Math.PI/180,d=l(n.lat-t.lat),c=l(n.lng-t.lng),g=l(t.lat),b=l(n.lat),S=Math.sin(d/2)**2+Math.cos(g)*Math.cos(b)*Math.sin(c/2)**2;return 2*6371e3*Math.asin(Math.sqrt(S))}function jr(t,n,o){const l=n+Math.random()*(o-n),d=Math.random()*2*Math.PI,c=l*Math.cos(d)/111111,g=l*Math.sin(d)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+c,lng:t.lng+g}}function yi(t,n){const o=p=>p*Math.PI/180,l=o(t.lat),d=o(n.lat),c=o(n.lng-t.lng),g=Math.sin(c)*Math.cos(d),b=Math.cos(l)*Math.sin(d)-Math.sin(l)*Math.cos(d)*Math.cos(c);let S=Math.atan2(g,b);return S=S*180/Math.PI,S=(S+360)%360,S}function gi(t,n,o){const d=n/6371e3,c=o*Math.PI/180,g=t[0]*Math.PI/180,b=t[1]*Math.PI/180,S=Math.sin(g),p=Math.cos(g),u=Math.sin(d),y=Math.cos(d),A=Math.asin(S*y+p*u*Math.cos(c)),B=b+Math.atan2(Math.sin(c)*u*p,y-S*Math.sin(A));return[A*180/Math.PI,B*180/Math.PI]}function bi(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Rr(){const{temp:t,iconEmoji:n}=Ot;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Ur(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;bi();const{condition:n,isNight:o}=Ot;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const c=[];for(let g=0;g<48;g++){const b=Math.random()*100,S=Math.random()*16-8,p=Math.random()*2.5,u=2+Math.random()*1.5;c.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${b}%;
            --xEnd:${b+S}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${u}s;
          "
        ></div>
      `)}l=c.join("")}else if(n==="snow"){const c=[];for(let g=0;g<42;g++){const b=Math.random()*100,S=Math.random()*20-10,p=Math.random()*4,u=6+Math.random()*4;c.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${b}%;
            --xEnd:${b+S}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${u}s;
          "
        ></div>
      `)}l=c.join("")}else l="";t.innerHTML=l}async function hi(t,n){const o=Date.now();if(!(Ot.lastUpdated&&o-Ot.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${ri}&units=metric`,d=await fetch(l);if(!d.ok)throw new Error("HTTP "+d.status);const c=await d.json(),g=c?.main?.temp,b=c?.weather?.[0]?.icon||"01d",S=String(c?.weather?.[0]?.main||"").toLowerCase();let p=b.endsWith("n"),u="⛅",y="clear";b.startsWith("01")||b.startsWith("02")?y="clear":b.startsWith("03")||b.startsWith("04")?(u="☁️",y="clouds"):b.startsWith("09")||b.startsWith("10")?(u="🌧️",y="rain"):b.startsWith("11")?(u="⛈️",y="storm"):b.startsWith("13")?(u="❄️",y="snow"):b.startsWith("50")&&(u="🌫️",y="mist"),S.includes("rain")&&(y="rain"),S.includes("snow")&&(y="snow"),S.includes("thunder")&&(y="storm");try{const B=Number(c?.dt||0),v=Number(c?.timezone||0);if(B&&Number.isFinite(v)){const O=((B+v)/3600%24+24)%24;p=O<7||O>=19}}catch{}y==="clear"?u=p?"🌙":"☀️":y==="clouds"?u="☁️":y==="rain"?u="🌧️":y==="storm"?u="⛈️":y==="snow"?u="❄️":y==="mist"&&(u="🌫️"),Ot={temp:g,iconEmoji:u,condition:y,isNight:p,lastUpdated:o};const A=document.getElementById("cbsgoWeatherLabel");A&&(A.textContent=Rr()),Ur()}catch(l){console.warn("Weather fetch failed",l)}}function mi(t){const n=qn();if(n){const d=`
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
    ">${Un(xi())}</div>
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
  `;return t.divIcon({html:o,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function wi(t,n,o,l){if(!l&&o){const b=`
      <div style="
        width:30px;height:30px;border-radius:999px;
        border:2px solid rgba(251,191,36,0.95);
        box-shadow:0 8px 18px rgba(0,0,0,.55);
        background-image:url('${Un(o)}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:b,className:"",iconSize:[30,30],iconAnchor:[15,15]})}const d=String(n||"").trim()||"🙂",c=`
    <div style="
      width:30px;height:30px;border-radius:999px;
      border:2px solid rgba(251,191,36,0.95); /* amber rand */
      box-shadow:0 8px 18px rgba(0,0,0,.55);
      background:rgba(245,158,11,0.90);      /* amber */
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:14px;color:#111;
    ">${Un(d)}</div>
  `;return t.divIcon({html:c,className:"",iconSize:[30,30],iconAnchor:[15,15]})}function vi(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function _i(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Si(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function ki(){if(!Tn.length)return null;const t=Math.floor(Math.random()*Tn.length);return Tn[t]}function Ci(t){const n=t||"small";let o,l,d;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),d=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),d=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,d=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,d=Math.random()<.25?3+Math.floor(Math.random()*8):0);let c=null,g=0;if(Math.random()<fi){const b=ki();b&&(c=b,g=1)}return{xp:o,tickets:l,cbs:d,cardId:c,cardCount:g}}function Ei(t){if(!X||!Fe||!t)return;const n=Date.now();if(n-sn<si||Fe.getLayers().length>=oi)return;const l=window.L;if(!l)return;const d=Si(),c=Ci(d),g=jr(t,ii,ai),b=vi(l),S=l.marker([g.lat,g.lng],{icon:b,pane:"cbsgo-loot-pane"}),u={marker:S,createdAt:n,lat:g.lat,lng:g.lng,reward:c};St.push(u),S.on("click",()=>{if(!Be){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:Be[0],lng:Be[1]},A={lat:g.lat,lng:g.lng},B=Ct(y,A);if(B>Gt){alert(`Too far to open this gift.

Distance: ${Math.round(B)}m
Needed: ≤ ${Gt}m`);return}Fe.removeLayer(S),St=St.filter(Me=>Me.marker!==S);const{xp:v,tickets:_,cbs:O,cardId:P,cardCount:pe}=c,te=[];v&&te.push(`+${v} XP`),_&&te.push(`+${_} ticket${_===1?"":"s"}`),O&&te.push(`+${O} CBS`),P&&pe>0&&te.push(`+${pe} card${pe===1?"":"s"}`);const q=te.length?te.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${q}`);const de={kind:"mystery",xp:v||0,tickets:_||0,cbs:O||0,cardId:P||null,cardCount:pe||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:de}))}catch{}}),S.addTo(Fe),sn=n}function Mi(t){if(!X||!Fe||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!Fe.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>li)return Fe.removeLayer(l.marker),o+=1,!1;const c=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(c)&&c>ci?(Fe.removeLayer(l.marker),o+=1,!1):!0}),o>0&&Fe.getLayers().length===0&&(sn=0)}function Li(t){if(!X||!Pt||!t||nn)return;const n=window.L;if(!n)return;if(Rn){if(vt<di||Math.random()>pi)return;vt=0}else{if(vt<ui)return;vt=0,Rn=!0}const o=jr(t,60,140),l=_i(n),d=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});d.on("click",()=>{if(!Be){alert("GPS not ready yet. Wait until your player marker appears.");return}const c={lat:Be[0],lng:Be[1]},g={lat:o.lat,lng:o.lng},b=Ct(c,g);if(b>Gt){alert(`Too far to start this puzzle.

Distance: ${Math.round(b)}m
Needed: ≤ ${Gt}m`);return}Pt.removeLayer(d),nn=null,Pn({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),d.addTo(Pt),nn=d}function Ai(t){const n=window.L;if(!n||!X||!t)return;const o=Gt;It?(It.setLatLng(t),It.setRadius(o)):It=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(X)}function zi(t){const n=window.L;if(!n||!X)return;const o=mi(n);if(tt?(tt.setIcon(o),tt.setLatLng(t)):(tt=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(X),X.setView(t,19)),nt?(nt.setIcon(fr(n,wt)),nt.setLatLng(t)):nt=n.marker(t,{icon:fr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(X),tt&&tt.bringToFront&&tt.bringToFront(),nt&&nt.bringToFront&&nt.bringToFront(),Ai(t),Je&&!ft&&X)try{const l=X.getZoom()||19;let d=t;Number.isFinite(wt)&&(d=gi(t,40,wt));const c=X.getCenter(),g=Ct({lat:c.lat,lng:c.lng},{lat:d[0],lng:d[1]});(!Number.isFinite(g)||g>20)&&X.setView(d,l)}catch{}}function Fr(){const t=window.L;return!t||!X?null:(Ue?(Ze&&!X.hasLayer(Ue)&&Ue.addTo(X),!Ze&&X.hasLayer(Ue)&&X.removeLayer(Ue)):(Ue=t.layerGroup(),Ze&&Ue.addTo(X)),Ue)}function Bi(t){if(!Array.isArray(t)||!X)return[];const n=X.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(c=>{if(!c||c.isMe||typeof c.lat!="number"||typeof c.lng!="number")return;const g=Math.round(c.lat*o)/o,b=Math.round(c.lng*o)/o,S=`${g}_${b}`;l.has(S)||l.set(S,[]),l.get(S).push(c)});const d=[];for(const[c,g]of l.entries())if(g.length)if(g.length===1){const b=g[0];d.push({id:b.wallet_pk||c,lat:b.lat,lng:b.lng,count:1,nickname:b.nickname||"Anon",avatar:b.avatar||"",isCluster:!1})}else{let b=0,S=0;g.forEach(y=>{b+=y.lat,S+=y.lng});const p=b/g.length,u=S/g.length;d.push({id:`cluster_${c}`,lat:p,lng:u,count:g.length,nickname:`${g.length} players`,avatar:"",isCluster:!0})}return d}function Ni(t){const n=window.L;if(!n||!X)return;const o=Fr();if(!o)return;if(!Ze){for(const[c,g]of Ve.entries())o.removeLayer(g),Ve.delete(c);return}const l=Bi(t),d=new Set;l.forEach(c=>{if(!c||typeof c.lat!="number"||typeof c.lng!="number")return;const g=c.id||`${c.lat},${c.lng}`;d.add(g);const b=[c.lat,c.lng];let S=Ve.get(g);if(S)S.setLatLng(b);else{const p=c.isCluster&&c.count>1?String(c.count):c.nickname||"Anon",u=wi(n,p,c.avatar,c.isCluster);S=n.marker(b,{icon:u,pane:"cbsgo-others-pane"});const y=c.isCluster&&c.count>1?`${c.count} CBS-GO explorers nearby`:`${c.nickname||"CBS-GO explorer"}`;S.bindPopup(y),S.addTo(o),Ve.set(g,S)}});for(const[c,g]of Ve.entries())d.has(c)||(o.removeLayer(g),Ve.delete(c))}function Ti(){return`
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
        <span id="cbsgoWeatherLabel">${Rr()}</span>
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
  `}function Ii(){try{X&&X.remove()}catch{}X=null,tt=null,nt=null,It=null,Pt=null,Fe=null,Be=null,ft=!1,Je=!0,sn=0,vt=0,nn=null,Rn=!1,Ue=null,Ve.clear(),St=[]}function $i(){const t=window.L,n=dt("cbsgoMap");if(!t||!n)return!1;Ii();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));X=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=X.createPane("cbsgo-player-pane");l.style.zIndex="650";const d=X.createPane("cbsgo-others-pane");d.style.zIndex="640";const c=X.createPane("cbsgo-loot-pane");c.style.zIndex="630";const g=X.createPane("cbsgo-puzzle-pane");return g.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(X),X.setMaxBounds(o),X.setView([51.687,4.87],16),Pt=t.layerGroup().addTo(X),Fe=t.layerGroup().addTo(X),X.on("dragstart",()=>{Je=!1}),X.on("zoomstart",()=>{Je=!1}),!0}function Pi(){!navigator.geolocation||!X||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:d}=t.coords,c={lat:n,lng:o},g=Be?{lat:Be[0],lng:Be[1]}:null;if(Be=[n,o],Number.isFinite(d))wt=d;else if(g){const b=Ct(g,c);Number.isFinite(b)&&b>2&&(wt=yi(g,c))}if(zi([n,o]),g){const b=Ct(g,c);if(Number.isFinite(b)&&b>1&&(vt+=b),Number.isFinite(b)&&b>20&&!Je&&!ft&&X){Je=!0;const S=X.getZoom()||19;X.setView([n,o],S)}}Li(c),Ei(c),Mi(c),hi(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Oi(){let t=0;const n=120,o=()=>{if(t++,!dt("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!$i()){_t("Could not init map. Refresh.");return}const d=dt("cbsgoCenterBtn");d&&(d.onclick=()=>{X&&Be&&(Je=!0,ft=!1,X.setView(Be,19))});const c=dt("cbsgoCompassBtn");c&&(c.onclick=()=>{X&&(ft=!ft,ft?(Je=!1,X.setView([51.687,4.87],3)):Be&&(Je=!0,X.setView(Be,16)))});const g=dt("cbsgoOnlineToggleBtn");if(g){const b=()=>{Ze?(g.style.borderColor="rgba(251,191,36,0.95)",g.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(g.style.borderColor="rgba(255,255,255,0.18)",g.style.boxShadow="none")};b(),g.onclick=()=>{Ze=!Ze;const S=Fr();if(S&&X&&(Ze?X.hasLayer(S)||S.addTo(X):X.hasLayer(S)&&X.removeLayer(S)),b(),!Ze&&Ue){for(const[p,u]of Ve.entries())Ue.removeLayer(u);Ve.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",b=>{const S=b?.detail?.players||[];Ni(S)})),Ur(),_t("Loading GPS…"),Pi()};o()}const ji="cbsgo_cards_v1";function Ri(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Kn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Hn(){const t=localStorage.getItem(ji),n=Ri(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const d=Number(l.count||0);Number.isFinite(d)&&d>0&&(o[l.id]=d)}),o}function rt(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Gr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Ui(){const t=Kn(),n=Hn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Fi(){const t=Kn(),n=Hn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const d=Number(n[l.id]||0),c=Number.isFinite(d)&&d>0,g=Gr(l.rarity),b=c?g:"rgba(31,41,55,.9)",S=c?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",p=c?l.emoji||"🃏":"❓",u=c?rt(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=rt(l.set||"Set"),A=c?`<div style="
             position:absolute;
             right:6px;
             top:6px;
             padding:2px 6px;
             border-radius:999px;
             border:1px solid ${g};
             background:rgba(15,23,42,.96);
             font-size:10px;
           ">
             x${d}
           </div>`:"";return`
        <div
          class="cbsgoCardTile"
          data-card-id="${rt(l.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${b};
            background:${S};
            padding:6px 6px 7px 6px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            min-height:96px;
            cursor:pointer;
          "
        >
          ${A}
          <div style="
            font-size:${c?"26px":"28px"};
            margin-top:${c?"4px":"8px"};
            margin-bottom:4px;
          ">
            ${rt(p)}
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
            ${y}
          </div>
        </div>
      `}).join("")}
    </div>
  `:`
      <div style="font-size:13px;opacity:.8;">
        No cards defined yet.
      </div>
    `}function Gi(){const t=Ui(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,d=o>0?Math.round(n/o*100):0;return`
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
        ${Fi()}
      </div>
    </div>
  `}function Wi(){let t=document.getElementById("cbsgoCardsOverlayHost");t||(t=document.createElement("div"),t.id="cbsgoCardsOverlayHost",t.style.position="fixed",t.style.inset="0",t.style.zIndex="8500",t.style.pointerEvents="none",document.body.appendChild(t)),t.innerHTML="";const n=document.createElement("div");n.style.position="fixed",n.style.inset="0",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.background="rgba(5,7,11,0.78)",n.style.pointerEvents="auto";const o=document.createElement("div");o.style.width="min(420px, 94vw)",o.style.maxHeight="80vh",o.style.borderRadius="22px",o.style.border="1px solid rgba(148,163,184,.9)",o.style.background="rgba(10,12,18,0.97)",o.style.boxShadow="0 26px 80px rgba(0,0,0,.9)",o.style.padding="14px 14px 10px 14px",o.style.display="flex",o.style.flexDirection="column",o.style.color="#fff",o.style.fontFamily="system-ui,sans-serif",o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",o.style.transition="opacity .22s ease-out, transform .22s ease-out",o.innerHTML=`
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

    ${Gi()}
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},d=document.getElementById("cbsgoCardsCloseBtn");d&&(d.onclick=l),n.addEventListener("click",p=>{p.target===n&&l()});const c=Kn(),g=new Map(c.map(p=>[p.id,p]));function b(p){const u=g.get(p);if(!u)return;const y=Hn(),A=Number(y[p]||0),B=Number.isFinite(A)&&A>0,v=B?u.emoji||"🃏":"❓",_=B?u.name||"Card":"Unknown card",O=u.set||"Set",P=u.rarity||"common",pe=Gr(P),te={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[P]||"Common",q=document.createElement("div");q.style.position="fixed",q.style.inset="0",q.style.display="flex",q.style.alignItems="center",q.style.justifyContent="center",q.style.background="rgba(0,0,0,0.65)",q.style.pointerEvents="auto",q.style.zIndex="8600";const de=document.createElement("div");de.style.width="min(260px, 82vw)",de.style.borderRadius="20px",de.style.border=`1px solid ${pe}`,de.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",de.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",de.style.padding="16px 14px 14px 14px",de.style.textAlign="center",de.style.color="#fff",de.style.fontFamily="system-ui,sans-serif",de.style.opacity="0",de.style.transform="translateY(14px) scale(0.96)",de.style.transition="opacity .2s ease-out, transform .2s ease-out";const Me=B?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${A}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',qe=B?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;de.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${rt(O)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${pe};
          font-size:10px;
        ">
          ${rt(te)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${pe};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${rt(v)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${rt(_)}
      </div>

      ${Me}
      ${qe}

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
    `,q.appendChild(de),document.body.appendChild(q),requestAnimationFrame(()=>{de.style.opacity="1",de.style.transform="translateY(0) scale(1)"});const Ge=()=>{de.style.opacity="0",de.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(q)},200)},je=de.querySelector("#cbsgoCardPreviewCloseBtn");je&&(je.onclick=Ge),q.addEventListener("click",it=>{it.target===q&&Ge()})}o.querySelectorAll(".cbsgoCardTile").forEach(p=>{p.addEventListener("click",()=>{const u=p.getAttribute("data-card-id");u&&b(u)})})}function Di(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Yi(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var d=!1;try{d=this instanceof l}catch{}return d?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var d=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,d.get?d:{enumerable:!0,get:function(){return t[l]}})}),o}function qi(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var In={exports:{}};const Ki={},Hi=Object.freeze(Object.defineProperty({__proto__:null,default:Ki},Symbol.toStringTag,{value:"Module"})),Xi=Yi(Hi);var dr;function Vi(){return dr||(dr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},d=new Uint8Array(16),c=new Uint8Array(32);c[0]=9;var g=o(),b=o([1]),S=o([56129,1]),p=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),u=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),A=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),B=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function v(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function _(r,a,i,e,s){var x,h=0;for(x=0;x<s;x++)h|=r[a+x]^i[e+x];return(1&h-1>>>8)-1}function O(r,a,i,e){return _(r,a,i,e,16)}function P(r,a,i,e){return _(r,a,i,e,32)}function pe(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,x=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,C=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,z=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,W=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,T=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,J=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Q=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,j=s,D=x,I=h,U=C,G=z,N=W,m=T,w=ye,M=$,k=V,E=Z,L=oe,H=re,ie=J,se=ee,ae=Q,f,ce=0;ce<20;ce+=2)f=j+H|0,G^=f<<7|f>>>25,f=G+j|0,M^=f<<9|f>>>23,f=M+G|0,H^=f<<13|f>>>19,f=H+M|0,j^=f<<18|f>>>14,f=N+D|0,k^=f<<7|f>>>25,f=k+N|0,ie^=f<<9|f>>>23,f=ie+k|0,D^=f<<13|f>>>19,f=D+ie|0,N^=f<<18|f>>>14,f=E+m|0,se^=f<<7|f>>>25,f=se+E|0,I^=f<<9|f>>>23,f=I+se|0,m^=f<<13|f>>>19,f=m+I|0,E^=f<<18|f>>>14,f=ae+L|0,U^=f<<7|f>>>25,f=U+ae|0,w^=f<<9|f>>>23,f=w+U|0,L^=f<<13|f>>>19,f=L+w|0,ae^=f<<18|f>>>14,f=j+U|0,D^=f<<7|f>>>25,f=D+j|0,I^=f<<9|f>>>23,f=I+D|0,U^=f<<13|f>>>19,f=U+I|0,j^=f<<18|f>>>14,f=N+G|0,m^=f<<7|f>>>25,f=m+N|0,w^=f<<9|f>>>23,f=w+m|0,G^=f<<13|f>>>19,f=G+w|0,N^=f<<18|f>>>14,f=E+k|0,L^=f<<7|f>>>25,f=L+E|0,M^=f<<9|f>>>23,f=M+L|0,k^=f<<13|f>>>19,f=k+M|0,E^=f<<18|f>>>14,f=ae+se|0,H^=f<<7|f>>>25,f=H+ae|0,ie^=f<<9|f>>>23,f=ie+H|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;j=j+s|0,D=D+x|0,I=I+h|0,U=U+C|0,G=G+z|0,N=N+W|0,m=m+T|0,w=w+ye|0,M=M+$|0,k=k+V|0,E=E+Z|0,L=L+oe|0,H=H+re|0,ie=ie+J|0,se=se+ee|0,ae=ae+Q|0,r[0]=j>>>0&255,r[1]=j>>>8&255,r[2]=j>>>16&255,r[3]=j>>>24&255,r[4]=D>>>0&255,r[5]=D>>>8&255,r[6]=D>>>16&255,r[7]=D>>>24&255,r[8]=I>>>0&255,r[9]=I>>>8&255,r[10]=I>>>16&255,r[11]=I>>>24&255,r[12]=U>>>0&255,r[13]=U>>>8&255,r[14]=U>>>16&255,r[15]=U>>>24&255,r[16]=G>>>0&255,r[17]=G>>>8&255,r[18]=G>>>16&255,r[19]=G>>>24&255,r[20]=N>>>0&255,r[21]=N>>>8&255,r[22]=N>>>16&255,r[23]=N>>>24&255,r[24]=m>>>0&255,r[25]=m>>>8&255,r[26]=m>>>16&255,r[27]=m>>>24&255,r[28]=w>>>0&255,r[29]=w>>>8&255,r[30]=w>>>16&255,r[31]=w>>>24&255,r[32]=M>>>0&255,r[33]=M>>>8&255,r[34]=M>>>16&255,r[35]=M>>>24&255,r[36]=k>>>0&255,r[37]=k>>>8&255,r[38]=k>>>16&255,r[39]=k>>>24&255,r[40]=E>>>0&255,r[41]=E>>>8&255,r[42]=E>>>16&255,r[43]=E>>>24&255,r[44]=L>>>0&255,r[45]=L>>>8&255,r[46]=L>>>16&255,r[47]=L>>>24&255,r[48]=H>>>0&255,r[49]=H>>>8&255,r[50]=H>>>16&255,r[51]=H>>>24&255,r[52]=ie>>>0&255,r[53]=ie>>>8&255,r[54]=ie>>>16&255,r[55]=ie>>>24&255,r[56]=se>>>0&255,r[57]=se>>>8&255,r[58]=se>>>16&255,r[59]=se>>>24&255,r[60]=ae>>>0&255,r[61]=ae>>>8&255,r[62]=ae>>>16&255,r[63]=ae>>>24&255}function te(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,x=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,h=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,C=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,z=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,W=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,T=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,J=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,Q=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,j=s,D=x,I=h,U=C,G=z,N=W,m=T,w=ye,M=$,k=V,E=Z,L=oe,H=re,ie=J,se=ee,ae=Q,f,ce=0;ce<20;ce+=2)f=j+H|0,G^=f<<7|f>>>25,f=G+j|0,M^=f<<9|f>>>23,f=M+G|0,H^=f<<13|f>>>19,f=H+M|0,j^=f<<18|f>>>14,f=N+D|0,k^=f<<7|f>>>25,f=k+N|0,ie^=f<<9|f>>>23,f=ie+k|0,D^=f<<13|f>>>19,f=D+ie|0,N^=f<<18|f>>>14,f=E+m|0,se^=f<<7|f>>>25,f=se+E|0,I^=f<<9|f>>>23,f=I+se|0,m^=f<<13|f>>>19,f=m+I|0,E^=f<<18|f>>>14,f=ae+L|0,U^=f<<7|f>>>25,f=U+ae|0,w^=f<<9|f>>>23,f=w+U|0,L^=f<<13|f>>>19,f=L+w|0,ae^=f<<18|f>>>14,f=j+U|0,D^=f<<7|f>>>25,f=D+j|0,I^=f<<9|f>>>23,f=I+D|0,U^=f<<13|f>>>19,f=U+I|0,j^=f<<18|f>>>14,f=N+G|0,m^=f<<7|f>>>25,f=m+N|0,w^=f<<9|f>>>23,f=w+m|0,G^=f<<13|f>>>19,f=G+w|0,N^=f<<18|f>>>14,f=E+k|0,L^=f<<7|f>>>25,f=L+E|0,M^=f<<9|f>>>23,f=M+L|0,k^=f<<13|f>>>19,f=k+M|0,E^=f<<18|f>>>14,f=ae+se|0,H^=f<<7|f>>>25,f=H+ae|0,ie^=f<<9|f>>>23,f=ie+H|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;r[0]=j>>>0&255,r[1]=j>>>8&255,r[2]=j>>>16&255,r[3]=j>>>24&255,r[4]=N>>>0&255,r[5]=N>>>8&255,r[6]=N>>>16&255,r[7]=N>>>24&255,r[8]=E>>>0&255,r[9]=E>>>8&255,r[10]=E>>>16&255,r[11]=E>>>24&255,r[12]=ae>>>0&255,r[13]=ae>>>8&255,r[14]=ae>>>16&255,r[15]=ae>>>24&255,r[16]=m>>>0&255,r[17]=m>>>8&255,r[18]=m>>>16&255,r[19]=m>>>24&255,r[20]=w>>>0&255,r[21]=w>>>8&255,r[22]=w>>>16&255,r[23]=w>>>24&255,r[24]=M>>>0&255,r[25]=M>>>8&255,r[26]=M>>>16&255,r[27]=M>>>24&255,r[28]=k>>>0&255,r[29]=k>>>8&255,r[30]=k>>>16&255,r[31]=k>>>24&255}function q(r,a,i,e){pe(r,a,i,e)}function de(r,a,i,e){te(r,a,i,e)}var Me=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function qe(r,a,i,e,s,x,h){var C=new Uint8Array(16),z=new Uint8Array(64),W,T;for(T=0;T<16;T++)C[T]=0;for(T=0;T<8;T++)C[T]=x[T];for(;s>=64;){for(q(z,C,h,Me),T=0;T<64;T++)r[a+T]=i[e+T]^z[T];for(W=1,T=8;T<16;T++)W=W+(C[T]&255)|0,C[T]=W&255,W>>>=8;s-=64,a+=64,e+=64}if(s>0)for(q(z,C,h,Me),T=0;T<s;T++)r[a+T]=i[e+T]^z[T];return 0}function Ge(r,a,i,e,s){var x=new Uint8Array(16),h=new Uint8Array(64),C,z;for(z=0;z<16;z++)x[z]=0;for(z=0;z<8;z++)x[z]=e[z];for(;i>=64;){for(q(h,x,s,Me),z=0;z<64;z++)r[a+z]=h[z];for(C=1,z=8;z<16;z++)C=C+(x[z]&255)|0,x[z]=C&255,C>>>=8;i-=64,a+=64}if(i>0)for(q(h,x,s,Me),z=0;z<i;z++)r[a+z]=h[z];return 0}function je(r,a,i,e,s){var x=new Uint8Array(32);de(x,e,s,Me);for(var h=new Uint8Array(8),C=0;C<8;C++)h[C]=e[C+16];return Ge(r,a,i,h,x)}function it(r,a,i,e,s,x,h){var C=new Uint8Array(32);de(C,x,h,Me);for(var z=new Uint8Array(8),W=0;W<8;W++)z[W]=x[W+16];return qe(r,a,i,e,s,z,C)}var at=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,x,h,C,z;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,x=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|x<<12)&255,this.r[5]=x>>>1&8190,h=r[10]&255|(r[11]&255)<<8,this.r[6]=(x>>>14|h<<2)&8191,C=r[12]&255|(r[13]&255)<<8,this.r[7]=(h>>>11|C<<5)&8065,z=r[14]&255|(r[15]&255)<<8,this.r[8]=(C>>>8|z<<8)&8191,this.r[9]=z>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};at.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,x,h,C,z,W,T,ye,$,V,Z,oe,re,J,ee,Q,j,D,I,U=this.h[0],G=this.h[1],N=this.h[2],m=this.h[3],w=this.h[4],M=this.h[5],k=this.h[6],E=this.h[7],L=this.h[8],H=this.h[9],ie=this.r[0],se=this.r[1],ae=this.r[2],f=this.r[3],ce=this.r[4],ge=this.r[5],be=this.r[6],le=this.r[7],ue=this.r[8],xe=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,U+=s&8191,x=r[a+2]&255|(r[a+3]&255)<<8,G+=(s>>>13|x<<3)&8191,h=r[a+4]&255|(r[a+5]&255)<<8,N+=(x>>>10|h<<6)&8191,C=r[a+6]&255|(r[a+7]&255)<<8,m+=(h>>>7|C<<9)&8191,z=r[a+8]&255|(r[a+9]&255)<<8,w+=(C>>>4|z<<12)&8191,M+=z>>>1&8191,W=r[a+10]&255|(r[a+11]&255)<<8,k+=(z>>>14|W<<2)&8191,T=r[a+12]&255|(r[a+13]&255)<<8,E+=(W>>>11|T<<5)&8191,ye=r[a+14]&255|(r[a+15]&255)<<8,L+=(T>>>8|ye<<8)&8191,H+=ye>>>5|e,$=0,V=$,V+=U*ie,V+=G*(5*xe),V+=N*(5*ue),V+=m*(5*le),V+=w*(5*be),$=V>>>13,V&=8191,V+=M*(5*ge),V+=k*(5*ce),V+=E*(5*f),V+=L*(5*ae),V+=H*(5*se),$+=V>>>13,V&=8191,Z=$,Z+=U*se,Z+=G*ie,Z+=N*(5*xe),Z+=m*(5*ue),Z+=w*(5*le),$=Z>>>13,Z&=8191,Z+=M*(5*be),Z+=k*(5*ge),Z+=E*(5*ce),Z+=L*(5*f),Z+=H*(5*ae),$+=Z>>>13,Z&=8191,oe=$,oe+=U*ae,oe+=G*se,oe+=N*ie,oe+=m*(5*xe),oe+=w*(5*ue),$=oe>>>13,oe&=8191,oe+=M*(5*le),oe+=k*(5*be),oe+=E*(5*ge),oe+=L*(5*ce),oe+=H*(5*f),$+=oe>>>13,oe&=8191,re=$,re+=U*f,re+=G*ae,re+=N*se,re+=m*ie,re+=w*(5*xe),$=re>>>13,re&=8191,re+=M*(5*ue),re+=k*(5*le),re+=E*(5*be),re+=L*(5*ge),re+=H*(5*ce),$+=re>>>13,re&=8191,J=$,J+=U*ce,J+=G*f,J+=N*ae,J+=m*se,J+=w*ie,$=J>>>13,J&=8191,J+=M*(5*xe),J+=k*(5*ue),J+=E*(5*le),J+=L*(5*be),J+=H*(5*ge),$+=J>>>13,J&=8191,ee=$,ee+=U*ge,ee+=G*ce,ee+=N*f,ee+=m*ae,ee+=w*se,$=ee>>>13,ee&=8191,ee+=M*ie,ee+=k*(5*xe),ee+=E*(5*ue),ee+=L*(5*le),ee+=H*(5*be),$+=ee>>>13,ee&=8191,Q=$,Q+=U*be,Q+=G*ge,Q+=N*ce,Q+=m*f,Q+=w*ae,$=Q>>>13,Q&=8191,Q+=M*se,Q+=k*ie,Q+=E*(5*xe),Q+=L*(5*ue),Q+=H*(5*le),$+=Q>>>13,Q&=8191,j=$,j+=U*le,j+=G*be,j+=N*ge,j+=m*ce,j+=w*f,$=j>>>13,j&=8191,j+=M*ae,j+=k*se,j+=E*ie,j+=L*(5*xe),j+=H*(5*ue),$+=j>>>13,j&=8191,D=$,D+=U*ue,D+=G*le,D+=N*be,D+=m*ge,D+=w*ce,$=D>>>13,D&=8191,D+=M*f,D+=k*ae,D+=E*se,D+=L*ie,D+=H*(5*xe),$+=D>>>13,D&=8191,I=$,I+=U*xe,I+=G*ue,I+=N*le,I+=m*be,I+=w*ge,$=I>>>13,I&=8191,I+=M*ce,I+=k*f,I+=E*ae,I+=L*se,I+=H*ie,$+=I>>>13,I&=8191,$=($<<2)+$|0,$=$+V|0,V=$&8191,$=$>>>13,Z+=$,U=V,G=Z,N=oe,m=re,w=J,M=ee,k=Q,E=j,L=D,H=I,a+=16,i-=16;this.h[0]=U,this.h[1]=G,this.h[2]=N,this.h[3]=m,this.h[4]=w,this.h[5]=M,this.h[6]=k,this.h[7]=E,this.h[8]=L,this.h[9]=H},at.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,x,h;if(this.leftover){for(h=this.leftover,this.buffer[h++]=1;h<16;h++)this.buffer[h]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,h=2;h<10;h++)this.h[h]+=e,e=this.h[h]>>>13,this.h[h]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,h=1;h<10;h++)i[h]=this.h[h]+e,e=i[h]>>>13,i[h]&=8191;for(i[9]-=8192,s=(e^1)-1,h=0;h<10;h++)i[h]&=s;for(s=~s,h=0;h<10;h++)this.h[h]=this.h[h]&s|i[h];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,x=this.h[0]+this.pad[0],this.h[0]=x&65535,h=1;h<8;h++)x=(this.h[h]+this.pad[h]|0)+(x>>>16)|0,this.h[h]=x&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},at.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Lt(r,a,i,e,s,x){var h=new at(x);return h.update(i,e,s),h.finish(r,a),0}function st(r,a,i,e,s,x){var h=new Uint8Array(16);return Lt(h,0,i,e,s,x),O(r,a,h,0)}function Ne(r,a,i,e,s){var x;if(i<32)return-1;for(it(r,0,a,0,i,e,s),Lt(r,16,r,32,i-32,r),x=0;x<16;x++)r[x]=0;return 0}function ut(r,a,i,e,s){var x,h=new Uint8Array(32);if(i<32||(je(h,0,32,e,s),st(a,16,a,32,i-32,h)!==0))return-1;for(it(r,0,a,0,i,e,s),x=0;x<32;x++)r[x]=0;return 0}function Re(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function Ke(r,a,i){for(var e,s=~(i-1),x=0;x<16;x++)e=s&(r[x]^a[x]),r[x]^=e,a[x]^=e}function Qe(r,a){var i,e,s,x=o(),h=o();for(i=0;i<16;i++)h[i]=a[i];for(xt(h),xt(h),xt(h),e=0;e<2;e++){for(x[0]=h[0]-65517,i=1;i<15;i++)x[i]=h[i]-65535-(x[i-1]>>16&1),x[i-1]&=65535;x[15]=h[15]-32767-(x[14]>>16&1),s=x[15]>>16&1,x[14]&=65535,Ke(h,x,1-s)}for(i=0;i<16;i++)r[2*i]=h[i]&255,r[2*i+1]=h[i]>>8}function At(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return Qe(i,r),Qe(e,a),P(i,0,e,0)}function yt(r){var a=new Uint8Array(32);return Qe(a,r),a[0]&1}function He(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function Te(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Ie(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function fe(r,a,i){var e,s,x=0,h=0,C=0,z=0,W=0,T=0,ye=0,$=0,V=0,Z=0,oe=0,re=0,J=0,ee=0,Q=0,j=0,D=0,I=0,U=0,G=0,N=0,m=0,w=0,M=0,k=0,E=0,L=0,H=0,ie=0,se=0,ae=0,f=i[0],ce=i[1],ge=i[2],be=i[3],le=i[4],ue=i[5],xe=i[6],Se=i[7],he=i[8],we=i[9],ve=i[10],_e=i[11],Ee=i[12],Le=i[13],Ae=i[14],ze=i[15];e=a[0],x+=e*f,h+=e*ce,C+=e*ge,z+=e*be,W+=e*le,T+=e*ue,ye+=e*xe,$+=e*Se,V+=e*he,Z+=e*we,oe+=e*ve,re+=e*_e,J+=e*Ee,ee+=e*Le,Q+=e*Ae,j+=e*ze,e=a[1],h+=e*f,C+=e*ce,z+=e*ge,W+=e*be,T+=e*le,ye+=e*ue,$+=e*xe,V+=e*Se,Z+=e*he,oe+=e*we,re+=e*ve,J+=e*_e,ee+=e*Ee,Q+=e*Le,j+=e*Ae,D+=e*ze,e=a[2],C+=e*f,z+=e*ce,W+=e*ge,T+=e*be,ye+=e*le,$+=e*ue,V+=e*xe,Z+=e*Se,oe+=e*he,re+=e*we,J+=e*ve,ee+=e*_e,Q+=e*Ee,j+=e*Le,D+=e*Ae,I+=e*ze,e=a[3],z+=e*f,W+=e*ce,T+=e*ge,ye+=e*be,$+=e*le,V+=e*ue,Z+=e*xe,oe+=e*Se,re+=e*he,J+=e*we,ee+=e*ve,Q+=e*_e,j+=e*Ee,D+=e*Le,I+=e*Ae,U+=e*ze,e=a[4],W+=e*f,T+=e*ce,ye+=e*ge,$+=e*be,V+=e*le,Z+=e*ue,oe+=e*xe,re+=e*Se,J+=e*he,ee+=e*we,Q+=e*ve,j+=e*_e,D+=e*Ee,I+=e*Le,U+=e*Ae,G+=e*ze,e=a[5],T+=e*f,ye+=e*ce,$+=e*ge,V+=e*be,Z+=e*le,oe+=e*ue,re+=e*xe,J+=e*Se,ee+=e*he,Q+=e*we,j+=e*ve,D+=e*_e,I+=e*Ee,U+=e*Le,G+=e*Ae,N+=e*ze,e=a[6],ye+=e*f,$+=e*ce,V+=e*ge,Z+=e*be,oe+=e*le,re+=e*ue,J+=e*xe,ee+=e*Se,Q+=e*he,j+=e*we,D+=e*ve,I+=e*_e,U+=e*Ee,G+=e*Le,N+=e*Ae,m+=e*ze,e=a[7],$+=e*f,V+=e*ce,Z+=e*ge,oe+=e*be,re+=e*le,J+=e*ue,ee+=e*xe,Q+=e*Se,j+=e*he,D+=e*we,I+=e*ve,U+=e*_e,G+=e*Ee,N+=e*Le,m+=e*Ae,w+=e*ze,e=a[8],V+=e*f,Z+=e*ce,oe+=e*ge,re+=e*be,J+=e*le,ee+=e*ue,Q+=e*xe,j+=e*Se,D+=e*he,I+=e*we,U+=e*ve,G+=e*_e,N+=e*Ee,m+=e*Le,w+=e*Ae,M+=e*ze,e=a[9],Z+=e*f,oe+=e*ce,re+=e*ge,J+=e*be,ee+=e*le,Q+=e*ue,j+=e*xe,D+=e*Se,I+=e*he,U+=e*we,G+=e*ve,N+=e*_e,m+=e*Ee,w+=e*Le,M+=e*Ae,k+=e*ze,e=a[10],oe+=e*f,re+=e*ce,J+=e*ge,ee+=e*be,Q+=e*le,j+=e*ue,D+=e*xe,I+=e*Se,U+=e*he,G+=e*we,N+=e*ve,m+=e*_e,w+=e*Ee,M+=e*Le,k+=e*Ae,E+=e*ze,e=a[11],re+=e*f,J+=e*ce,ee+=e*ge,Q+=e*be,j+=e*le,D+=e*ue,I+=e*xe,U+=e*Se,G+=e*he,N+=e*we,m+=e*ve,w+=e*_e,M+=e*Ee,k+=e*Le,E+=e*Ae,L+=e*ze,e=a[12],J+=e*f,ee+=e*ce,Q+=e*ge,j+=e*be,D+=e*le,I+=e*ue,U+=e*xe,G+=e*Se,N+=e*he,m+=e*we,w+=e*ve,M+=e*_e,k+=e*Ee,E+=e*Le,L+=e*Ae,H+=e*ze,e=a[13],ee+=e*f,Q+=e*ce,j+=e*ge,D+=e*be,I+=e*le,U+=e*ue,G+=e*xe,N+=e*Se,m+=e*he,w+=e*we,M+=e*ve,k+=e*_e,E+=e*Ee,L+=e*Le,H+=e*Ae,ie+=e*ze,e=a[14],Q+=e*f,j+=e*ce,D+=e*ge,I+=e*be,U+=e*le,G+=e*ue,N+=e*xe,m+=e*Se,w+=e*he,M+=e*we,k+=e*ve,E+=e*_e,L+=e*Ee,H+=e*Le,ie+=e*Ae,se+=e*ze,e=a[15],j+=e*f,D+=e*ce,I+=e*ge,U+=e*be,G+=e*le,N+=e*ue,m+=e*xe,w+=e*Se,M+=e*he,k+=e*we,E+=e*ve,L+=e*_e,H+=e*Ee,ie+=e*Le,se+=e*Ae,ae+=e*ze,x+=38*D,h+=38*I,C+=38*U,z+=38*G,W+=38*N,T+=38*m,ye+=38*w,$+=38*M,V+=38*k,Z+=38*E,oe+=38*L,re+=38*H,J+=38*ie,ee+=38*se,Q+=38*ae,s=1,e=x+s+65535,s=Math.floor(e/65536),x=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=C+s+65535,s=Math.floor(e/65536),C=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=W+s+65535,s=Math.floor(e/65536),W=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=j+s+65535,s=Math.floor(e/65536),j=e-s*65536,x+=s-1+37*(s-1),s=1,e=x+s+65535,s=Math.floor(e/65536),x=e-s*65536,e=h+s+65535,s=Math.floor(e/65536),h=e-s*65536,e=C+s+65535,s=Math.floor(e/65536),C=e-s*65536,e=z+s+65535,s=Math.floor(e/65536),z=e-s*65536,e=W+s+65535,s=Math.floor(e/65536),W=e-s*65536,e=T+s+65535,s=Math.floor(e/65536),T=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=j+s+65535,s=Math.floor(e/65536),j=e-s*65536,x+=s-1+37*(s-1),r[0]=x,r[1]=h,r[2]=C,r[3]=z,r[4]=W,r[5]=T,r[6]=ye,r[7]=$,r[8]=V,r[9]=Z,r[10]=oe,r[11]=re,r[12]=J,r[13]=ee,r[14]=Q,r[15]=j}function F(r,a){fe(r,a,a)}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)F(i,i),e!==2&&e!==4&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function K(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)F(i,i),e!==1&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function R(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),x,h,C=o(),z=o(),W=o(),T=o(),ye=o(),$=o();for(h=0;h<31;h++)e[h]=a[h];for(e[31]=a[31]&127|64,e[0]&=248,He(s,i),h=0;h<16;h++)z[h]=s[h],T[h]=C[h]=W[h]=0;for(C[0]=T[0]=1,h=254;h>=0;--h)x=e[h>>>3]>>>(h&7)&1,Ke(C,z,x),Ke(W,T,x),Te(ye,C,W),Ie(C,C,W),Te(W,z,T),Ie(z,z,T),F(T,ye),F($,C),fe(C,W,C),fe(W,z,ye),Te(ye,C,W),Ie(C,C,W),F(z,C),Ie(W,T,$),fe(C,W,S),Te(C,C,T),fe(W,W,C),fe(C,T,$),fe(T,z,s),F(z,ye),Ke(C,z,x),Ke(W,T,x);for(h=0;h<16;h++)s[h+16]=C[h],s[h+32]=W[h],s[h+48]=z[h],s[h+64]=T[h];var V=s.subarray(32),Z=s.subarray(16);return Y(V,V),fe(Z,Z,V),Qe(r,Z),0}function ne(r,a){return R(r,a,c)}function me(r,a){return l(a,32),ne(r,a)}function ke(r,a,i){var e=new Uint8Array(32);return R(e,i,a),de(r,d,e,Me)}var Ce=Ne,gt=ut;function bn(r,a,i,e,s,x){var h=new Uint8Array(32);return ke(h,s,x),Ce(r,a,i,e,h)}function We(r,a,i,e,s,x){var h=new Uint8Array(32);return ke(h,s,x),gt(r,a,i,e,h)}var et=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Zn(r,a,i,e){for(var s=new Int32Array(16),x=new Int32Array(16),h,C,z,W,T,ye,$,V,Z,oe,re,J,ee,Q,j,D,I,U,G,N,m,w,M,k,E,L,H=r[0],ie=r[1],se=r[2],ae=r[3],f=r[4],ce=r[5],ge=r[6],be=r[7],le=a[0],ue=a[1],xe=a[2],Se=a[3],he=a[4],we=a[5],ve=a[6],_e=a[7],Ee=0;e>=128;){for(G=0;G<16;G++)N=8*G+Ee,s[G]=i[N+0]<<24|i[N+1]<<16|i[N+2]<<8|i[N+3],x[G]=i[N+4]<<24|i[N+5]<<16|i[N+6]<<8|i[N+7];for(G=0;G<80;G++)if(h=H,C=ie,z=se,W=ae,T=f,ye=ce,$=ge,V=be,Z=le,oe=ue,re=xe,J=Se,ee=he,Q=we,j=ve,D=_e,m=be,w=_e,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=(f>>>14|he<<18)^(f>>>18|he<<14)^(he>>>9|f<<23),w=(he>>>14|f<<18)^(he>>>18|f<<14)^(f>>>9|he<<23),M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,m=f&ce^~f&ge,w=he&we^~he&ve,M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,m=et[G*2],w=et[G*2+1],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,m=s[G%16],w=x[G%16],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,I=E&65535|L<<16,U=M&65535|k<<16,m=I,w=U,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=(H>>>28|le<<4)^(le>>>2|H<<30)^(le>>>7|H<<25),w=(le>>>28|H<<4)^(H>>>2|le<<30)^(H>>>7|le<<25),M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,m=H&ie^H&se^ie&se,w=le&ue^le&xe^ue&xe,M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,V=E&65535|L<<16,D=M&65535|k<<16,m=W,w=J,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=I,w=U,M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,W=E&65535|L<<16,J=M&65535|k<<16,ie=h,se=C,ae=z,f=W,ce=T,ge=ye,be=$,H=V,ue=Z,xe=oe,Se=re,he=J,we=ee,ve=Q,_e=j,le=D,G%16===15)for(N=0;N<16;N++)m=s[N],w=x[N],M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=s[(N+9)%16],w=x[(N+9)%16],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,I=s[(N+1)%16],U=x[(N+1)%16],m=(I>>>1|U<<31)^(I>>>8|U<<24)^I>>>7,w=(U>>>1|I<<31)^(U>>>8|I<<24)^(U>>>7|I<<25),M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,I=s[(N+14)%16],U=x[(N+14)%16],m=(I>>>19|U<<13)^(U>>>29|I<<3)^I>>>6,w=(U>>>19|I<<13)^(I>>>29|U<<3)^(U>>>6|I<<26),M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,s[N]=E&65535|L<<16,x[N]=M&65535|k<<16;m=H,w=le,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[0],w=a[0],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[0]=H=E&65535|L<<16,a[0]=le=M&65535|k<<16,m=ie,w=ue,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[1],w=a[1],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[1]=ie=E&65535|L<<16,a[1]=ue=M&65535|k<<16,m=se,w=xe,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[2],w=a[2],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[2]=se=E&65535|L<<16,a[2]=xe=M&65535|k<<16,m=ae,w=Se,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[3],w=a[3],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[3]=ae=E&65535|L<<16,a[3]=Se=M&65535|k<<16,m=f,w=he,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[4],w=a[4],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[4]=f=E&65535|L<<16,a[4]=he=M&65535|k<<16,m=ce,w=we,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[5],w=a[5],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[5]=ce=E&65535|L<<16,a[5]=we=M&65535|k<<16,m=ge,w=ve,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[6],w=a[6],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[6]=ge=E&65535|L<<16,a[6]=ve=M&65535|k<<16,m=be,w=_e,M=w&65535,k=w>>>16,E=m&65535,L=m>>>16,m=r[7],w=a[7],M+=w&65535,k+=w>>>16,E+=m&65535,L+=m>>>16,k+=M>>>16,E+=k>>>16,L+=E>>>16,r[7]=be=E&65535|L<<16,a[7]=_e=M&65535|k<<16,Ee+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),x=new Uint8Array(256),h,C=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Zn(e,s,a,i),i%=128,h=0;h<i;h++)x[h]=a[C-i+h];for(x[i]=128,i=256-128*(i<112?1:0),x[i-9]=0,v(x,i-8,C/536870912|0,C<<3),Zn(e,s,x,i),h=0;h<8;h++)v(r,8*h,e[h],s[h]);return 0}function Kt(r,a){var i=o(),e=o(),s=o(),x=o(),h=o(),C=o(),z=o(),W=o(),T=o();Ie(i,r[1],r[0]),Ie(T,a[1],a[0]),fe(i,i,T),Te(e,r[0],r[1]),Te(T,a[0],a[1]),fe(e,e,T),fe(s,r[3],a[3]),fe(s,s,u),fe(x,r[2],a[2]),Te(x,x,x),Ie(h,e,i),Ie(C,x,s),Te(z,x,s),Te(W,e,i),fe(r[0],h,C),fe(r[1],W,z),fe(r[2],z,C),fe(r[3],h,W)}function Jn(r,a,i){var e;for(e=0;e<4;e++)Ke(r[e],a[e],i)}function hn(r,a){var i=o(),e=o(),s=o();Y(s,a[2]),fe(i,a[0],s),fe(e,a[1],s),Qe(r,e),r[31]^=yt(i)<<7}function mn(r,a,i){var e,s;for(Re(r[0],g),Re(r[1],b),Re(r[2],b),Re(r[3],g),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Jn(r,a,e),Kt(a,r),Kt(r,r),Jn(r,a,e)}function Ht(r,a){var i=[o(),o(),o(),o()];Re(i[0],y),Re(i[1],A),Re(i[2],b),fe(i[3],y,A),mn(r,i,a)}function wn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],x;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Ht(s,e),hn(r,s),x=0;x<32;x++)a[x+32]=r[x];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function vn(r,a){var i,e,s,x;for(e=63;e>=32;--e){for(i=0,s=e-32,x=e-12;s<x;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function _n(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;vn(r,a)}function Qn(r,a,i,e){var s=new Uint8Array(64),x=new Uint8Array(64),h=new Uint8Array(64),C,z,W=new Float64Array(64),T=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ye=i+64;for(C=0;C<i;C++)r[64+C]=a[C];for(C=0;C<32;C++)r[32+C]=s[32+C];for(lt(h,r.subarray(32),i+32),_n(h),Ht(T,h),hn(r,T),C=32;C<64;C++)r[C]=e[C];for(lt(x,r,i+64),_n(x),C=0;C<64;C++)W[C]=0;for(C=0;C<32;C++)W[C]=h[C];for(C=0;C<32;C++)for(z=0;z<32;z++)W[C+z]+=x[C]*s[z];return vn(r.subarray(32),W),ye}function Qr(r,a){var i=o(),e=o(),s=o(),x=o(),h=o(),C=o(),z=o();return Re(r[2],b),He(r[1],a),F(s,r[1]),fe(x,s,p),Ie(s,s,r[2]),Te(x,r[2],x),F(h,x),F(C,h),fe(z,C,h),fe(i,z,s),fe(i,i,x),K(i,i),fe(i,i,s),fe(i,i,x),fe(i,i,x),fe(r[0],i,x),F(e,r[0]),fe(e,e,x),At(e,s)&&fe(r[0],r[0],B),F(e,r[0]),fe(e,e,x),At(e,s)?-1:(yt(r[0])===a[31]>>7&&Ie(r[0],g,r[0]),fe(r[3],r[0],r[1]),0)}function Sn(r,a,i,e){var s,x=new Uint8Array(32),h=new Uint8Array(64),C=[o(),o(),o(),o()],z=[o(),o(),o(),o()];if(i<64||Qr(z,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(h,r,i),_n(h),mn(C,z,h),Ht(z,a.subarray(32)),Kt(C,z),hn(x,C),i-=64,P(a,0,x,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var kn=32,Vt=24,zt=32,bt=16,Bt=32,Zt=32,Nt=32,Tt=32,Cn=32,er=Vt,eo=zt,to=bt,Xe=64,ct=32,ht=64,En=32,Mn=64;n.lowlevel={crypto_core_hsalsa20:de,crypto_stream_xor:it,crypto_stream:je,crypto_stream_salsa20_xor:qe,crypto_stream_salsa20:Ge,crypto_onetimeauth:Lt,crypto_onetimeauth_verify:st,crypto_verify_16:O,crypto_verify_32:P,crypto_secretbox:Ne,crypto_secretbox_open:ut,crypto_scalarmult:R,crypto_scalarmult_base:ne,crypto_box_beforenm:ke,crypto_box_afternm:Ce,crypto_box:bn,crypto_box_open:We,crypto_box_keypair:me,crypto_hash:lt,crypto_sign:Qn,crypto_sign_keypair:wn,crypto_sign_open:Sn,crypto_secretbox_KEYBYTES:kn,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:zt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:Bt,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:Nt,crypto_box_SECRETKEYBYTES:Tt,crypto_box_BEFORENMBYTES:Cn,crypto_box_NONCEBYTES:er,crypto_box_ZEROBYTES:eo,crypto_box_BOXZEROBYTES:to,crypto_sign_BYTES:Xe,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:ht,crypto_sign_SEEDBYTES:En,crypto_hash_BYTES:Mn,gf:o,D:p,L:Xt,pack25519:Qe,unpack25519:He,M:fe,A:Te,S:F,Z:Ie,pow2523:K,add:Kt,set25519:Re,modL:vn,scalarmult:mn,scalarbase:Ht};function tr(r,a){if(r.length!==kn)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function no(r,a){if(r.length!==Nt)throw new Error("bad public key size");if(a.length!==Tt)throw new Error("bad secret key size")}function Pe(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function nr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Pe(r,a,i),tr(i,a);for(var e=new Uint8Array(zt+r.length),s=new Uint8Array(e.length),x=0;x<r.length;x++)e[x+zt]=r[x];return Ne(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){Pe(r,a,i),tr(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),x=0;x<r.length;x++)e[x+bt]=r[x];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(zt)},n.secretbox.keyLength=kn,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if(Pe(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==Bt)throw new Error("bad p size");var i=new Uint8Array(Bt);return R(i,r,a),i},n.scalarMult.base=function(r){if(Pe(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(Bt);return ne(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=Bt,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Pe(r,a),no(r,a);var i=new Uint8Array(Cn);return ke(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Nt),a=new Uint8Array(Tt);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Pe(r),r.length!==Tt)throw new Error("bad secret key size");var a=new Uint8Array(Nt);return ne(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Nt,n.box.secretKeyLength=Tt,n.box.sharedKeyLength=Cn,n.box.nonceLength=er,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Pe(r,a),a.length!==ht)throw new Error("bad secret key size");var i=new Uint8Array(Xe+r.length);return Qn(i,r,r.length,a),i},n.sign.open=function(r,a){if(Pe(r,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=Sn(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),x=0;x<s.length;x++)s[x]=i[x];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Xe),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Pe(r,a,i),a.length!==Xe)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(Xe+r.length),s=new Uint8Array(Xe+r.length),x;for(x=0;x<Xe;x++)e[x]=a[x];for(x=0;x<r.length;x++)e[x+Xe]=r[x];return Sn(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ct),a=new Uint8Array(ht);return wn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Pe(r),r.length!==ht)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Pe(r),r.length!==En)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(ht),e=0;e<32;e++)i[e]=r[e];return wn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=ht,n.sign.seedLength=En,n.sign.signatureLength=Xe,n.hash=function(r){Pe(r);var a=new Uint8Array(Mn);return lt(a,r,r.length),a},n.hash.hashLength=Mn,n.verify=function(r,a){return Pe(r,a),r.length===0||a.length===0||r.length!==a.length?!1:_(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,x=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(x.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=x[s];nr(x)})}else typeof qi<"u"&&(r=Xi,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,x=r.randomBytes(e);for(s=0;s<e;s++)i[s]=x[s];nr(x)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(In)),In.exports}var Zi=Vi();const Ji=Di(Zi);function Qi(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let p=0;p<n.length;p++)n[p]=255;for(let p=0;p<t.length;p++){const u=t.charAt(p),y=u.charCodeAt(0);if(n[y]!==255)throw new TypeError(u+" is ambiguous");n[y]=p}const o=t.length,l=t.charAt(0),d=Math.log(o)/Math.log(256),c=Math.log(256)/Math.log(o);function g(p){if(p instanceof Uint8Array||(ArrayBuffer.isView(p)?p=new Uint8Array(p.buffer,p.byteOffset,p.byteLength):Array.isArray(p)&&(p=Uint8Array.from(p))),!(p instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(p.length===0)return"";let u=0,y=0,A=0;const B=p.length;for(;A!==B&&p[A]===0;)A++,u++;const v=(B-A)*c+1>>>0,_=new Uint8Array(v);for(;A!==B;){let pe=p[A],te=0;for(let q=v-1;(pe!==0||te<y)&&q!==-1;q--,te++)pe+=256*_[q]>>>0,_[q]=pe%o>>>0,pe=pe/o>>>0;if(pe!==0)throw new Error("Non-zero carry");y=te,A++}let O=v-y;for(;O!==v&&_[O]===0;)O++;let P=l.repeat(u);for(;O<v;++O)P+=t.charAt(_[O]);return P}function b(p){if(typeof p!="string")throw new TypeError("Expected String");if(p.length===0)return new Uint8Array;let u=0,y=0,A=0;for(;p[u]===l;)y++,u++;const B=(p.length-u)*d+1>>>0,v=new Uint8Array(B);for(;u<p.length;){const pe=p.charCodeAt(u);if(pe>255)return;let te=n[pe];if(te===255)return;let q=0;for(let de=B-1;(te!==0||q<A)&&de!==-1;de--,q++)te+=o*v[de]>>>0,v[de]=te%256>>>0,te=te/256>>>0;if(te!==0)throw new Error("Non-zero carry");A=q,u++}let _=B-A;for(;_!==B&&v[_]===0;)_++;const O=new Uint8Array(y+(B-_));let P=y;for(;_!==B;)O[P++]=v[_++];return O}function S(p){const u=b(p);if(u)return u;throw new Error("Non-base"+o+" character")}return{encode:g,decodeUnsafe:b,decode:S}}var ea="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const pr=Qi(ea),Xn="cbsgo_wallet_v3",yn="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(Xn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function ta(t){localStorage.setItem(Xn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function na(){const t=Ji.sign.keyPair(),n=pr.encode(t.publicKey),o=pr.encode(t.secretKey);return{pk:n,sk:o}}function Wr(){return!!qt()}function ra(){return qt()?sessionStorage.getItem(yn)==="1":!1}function oa(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:d}=na();return ta({pk:l,sk:d,pin:n}),sessionStorage.setItem(yn,"1"),l}function ia(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(yn,"1"),n.pk}function Ye(){const t=qt();return t?t.pk:""}function aa(){localStorage.removeItem(Xn),sessionStorage.removeItem(yn)}typeof window<"u"&&(window.cbsgoDevResetWallet=aa);const Dr="cbsgoLoginModal";function Yr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function qr(){const t=document.getElementById(Dr);t&&t.remove()}function sa(t){qr();const n=document.createElement("div");return n.id=Dr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function la(t,n){return`
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
      ">${Yr(t)}</div>

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
  `}function ur(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function ca(){const t=!Wr();let n="";try{const u=Yt();t?u&&u!=="Sovereign"?n=u:n="":n=u||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Yr(n)}" style="${Jt()}" placeholder="Kevin" />
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
        <button id="cbsgoCreateBtn" type="button" style="${ur(!0)}">Create Wallet & Start</button>
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
        <button id="cbsgoUnlockBtn" type="button" style="${ur(!0)}">Unlock</button>
      </div>
    `,l=sa(la(t?"Welcome to CBS-GO":"Unlock Wallet",o)),d=l.querySelector("#cbsgoLoginMsg"),c=u=>{d&&(d.textContent=u||"")},g=l.querySelector("#cbsgoPin"),b=l.querySelector("#cbsgoPin2"),S=l.querySelector("#cbsgoNick"),p=()=>{qr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const u=l.querySelector("#cbsgoCreateBtn");u&&(u.onclick=async()=>{try{const y=String(S?.value||"").trim(),A=String(g?.value||"").trim(),B=String(b?.value||"").trim();if(y.length<2)return c("⛔ Nickname too short.");if(A.length<4)return c("⛔ PIN must be at least 4 digits.");if(A!==B)return c("⛔ PINs do not match.");c("Creating wallet…"),Or(y),await oa(A),c("✅ Wallet created. Starting…"),p()}catch(y){c(`⛔ ${String(y?.message||y)}`)}})}else{const u=l.querySelector("#cbsgoUnlockBtn");u&&(u.onclick=async()=>{try{const y=String(g?.value||"").trim();if(y.length<4)return c("⛔ PIN must be at least 4 digits.");c("Unlocking…"),await ia(y),c("✅ Unlocked."),p()}catch{c("⛔ Wrong PIN (or wallet data missing).")}})}}const fa="https://cxfedvowjgkqrakkkjpi.supabase.co",da="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",$e=ro(fa,da);function pa(){const t=Ye();if(!t)return null;const n=Yt(),o=qn();return{wallet_pk:t,nickname:n,avatar:o}}async function rn(t={}){try{const n=pa();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await $e.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const ua=15e3,xa=1e4,ya=300*1e3;let $t=null,xr=0,yr=0;function ga(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||($t={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",ga));async function ba(){const t=Ye();if(!t||!$t)return;const n=Date.now();if(n-xr<5e3)return;xr=n;const l=(Yt()||"").trim()||"Anon",d={wallet_pk:t,nickname:l,lat:$t.lat,lng:$t.lng,heading:$t.heading,last_seen:new Date().toISOString()};try{const{data:c,error:g}=await $e.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(g){console.warn("CBS GO: player_state select failed",g);return}if(c&&c.length>0){const b=c[0].id,{error:S}=await $e.from("player_state").update(d).eq("id",b);S&&console.warn("CBS GO: player_state update failed",S)}else{const{error:b}=await $e.from("player_state").insert(d);b&&console.warn("CBS GO: player_state insert failed",b)}}catch(c){console.warn("CBS GO: pushMyState error",c)}}async function ha(){const t=Ye();if(!t)return;const n=Date.now();if(n-yr<3e3)return;yr=n;const o=new Date(Date.now()-ya).toISOString();try{const{data:l,error:d}=await $e.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(d){console.warn("CBS GO: fetch online players failed",d);return}const c=Array.isArray(l)?l:[],g=Array.from(new Set(c.map(p=>p.wallet_pk).filter(p=>typeof p=="string"&&p.length>0)));let b=new Map;if(g.length>0){const{data:p,error:u}=await $e.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",g);u?console.warn("CBS GO: fetch player profiles failed",u):Array.isArray(p)&&(b=new Map(p.map(y=>[y.wallet_pk,y])))}const S=c.map(p=>{const u=p.lat,y=p.lng,A=typeof u=="number"?u:parseFloat(u),B=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(A)||!Number.isFinite(B))return null;const v=b.get(p.wallet_pk)||null,_=v&&v.nickname||p.nickname||"Anon",O=v&&v.avatar?String(v.avatar):"";return{wallet_pk:p.wallet_pk||"",nickname:_,avatar:O,lat:A,lng:B,heading:typeof p.heading=="number"?p.heading:null,last_seen:p.last_seen,isMe:p.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:S}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function ma(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{ba()},ua),setInterval(()=>{ha()},xa))}ma();function Kr(){const t=Ye();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function ln(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function wa(t){const n=Kr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await $e.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw ln("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function va(t){const n=Kr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:d}=await $e.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(d)throw ln("acceptFriendRequest",d),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function _a(){const t=Ye();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await $e.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw ln("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],d=[],c=[];for(const b of l){const S=b.b_wallet===t&&b.status==="pending",p=b.status==="accepted"&&(b.a_wallet===t||b.b_wallet===t);if(!S&&!p)continue;const u=b.a_wallet===t?b.b_wallet:b.a_wallet,y={id:b.id,a_wallet:b.a_wallet,b_wallet:b.b_wallet,status:b.status,created_at:b.created_at,otherWallet:u,nickname:null,avatar:""};S&&d.push(y),p&&c.push(y)}const g=Array.from(new Set([...d,...c].map(b=>b.otherWallet).filter(Boolean)));if(g.length>0){const{data:b,error:S}=await $e.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",g);if(!S&&Array.isArray(b)){const p=new Map;for(const y of b)y.wallet_pk&&p.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const u=y=>{y.forEach(A=>{const B=p.get(A.otherWallet);B&&(A.nickname=B.nickname||null,A.avatar=B.avatar||"")})};u(d),u(c)}else S&&ln("loadFriendsOverview:players",S)}return{incoming:d,accepted:c}}let jt=null;async function Hr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(jt=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),jt.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function Sa(){try{jt&&(await jt.release(),jt=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function ka(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Hr():await Sa()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function Ca(){const t=Ye();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Ea(t){return String(t||"").trim()}async function Xr(t,n={}){const o=Ca(),l=Ea(t),d=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),c=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!d&&!c)throw new Error("Set tickets and/or CBS above 0.");if(d>0&&Mr()<d)throw new Error("Not enough tickets in your bag.");if(c>0&&Lr()<c)throw new Error("Not enough CBS (play money) in your bag.");let g=0,b=0;try{d>0&&(ho(d),g=d),c>0&&(mo(c),b=c);const{error:S}=await $e.from("trades").insert({from_wallet:o,to_wallet:l,tickets:d||0,cbs:c||0,card_id:null,card_qty:null,status:"sent"});if(S)throw g>0&&Mt(g),b>0&&un(b),console.warn("CBS GO sendGiftToWallet Supabase error",S),new Error(S.message||"Could not save gift to Supabase (permissions or network issue).");if(typeof window<"u")try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftSent",{detail:{toWallet:l,tickets:d,cbs:c}}))}catch(p){console.warn("CBS GO: dispatch friendGiftSent failed",p)}return{ok:!0}}catch(S){throw S instanceof Error?S:new Error(String(S?.message||S)||"Failed to send gift.")}}async function cn(){const t=Ye();if(t)try{const{data:n,error:o}=await $e.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const c=Array.from(new Set(n.map(g=>g&&g.from_wallet).filter(g=>typeof g=="string"&&g.trim().length>0)));if(c.length>0){const{data:g,error:b}=await $e.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",c);!b&&Array.isArray(g)?l=new Map(g.filter(S=>S&&S.wallet_pk).map(S=>[String(S.wallet_pk),{nickname:S.nickname||null,avatar:S.avatar||""}])):b&&console.warn("CBS GO pullIncomingGifts players error",b)}}catch(c){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",c)}const d=[];for(const c of n){if(!c)continue;const g=Number(c.tickets||0),b=Number(c.cbs||0);if(g>0&&Mt(g),b>0&&un(b),(g>0||b>0)&&typeof window<"u"){const S=l.get(c.from_wallet)||{nickname:null,avatar:""},p={id:c.id||null,fromWallet:c.from_wallet||"",toWallet:c.to_wallet||"",tickets:g,cbs:b,createdAt:c.created_at||null,senderNickname:S.nickname||null,senderAvatar:S.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:p}))}catch(u){console.warn("CBS GO: dispatch friendGiftReceived failed",u)}}c.id&&d.push(c.id)}if(d.length>0){const{error:c}=await $e.from("trades").update({status:"claimed"}).in("id",d);c&&console.warn("CBS GO pullIncomingGifts update status error",c)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0)=>Xr(t,{tickets:n,cbs:o}),window.cbsgoPullGifts=cn);function Oe(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Vn(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}function Rt(t){if(!t)return"";const n=String(t);return n.length<=12?n:`${n.slice(0,5)}…${n.slice(-4)}`}function gn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Fn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function gr(t,n){return`
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
          <div style="font-weight:900; font-size:15px;">${Oe(t)}</div>
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
  `}function Ma(){const t=Yt(),n=qn(),o=Ye();return`
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
        ${Vn(n,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Oe(t)}" maxlength="24" style="
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
                    ${Oe(o)}
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
  `}function La(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const d=v=>{const _=document.querySelector("#profileMsg");_&&(_.textContent=v||"")};t&&d(t.value?`✅ Profile loaded: ${t.value}`:"");const c=()=>{if(!t)return;const v=Or(t.value);d(`✅ Name saved: ${v}`);try{rn()}catch(_){console.warn("CBS GO: failed to sync profile after name change",_)}};t&&(t.addEventListener("input",()=>{d("Saving…"),l&&clearTimeout(l),l=setTimeout(c,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),c()})),n&&n.addEventListener("change",()=>{const v=n.files&&n.files[0];if(!v)return;if(v.size>15e5){d("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}d("Uploading photo…");const _=new FileReader;_.onload=()=>{ti(String(_.result||"")),d("✅ Photo saved"),Et();try{rn()}catch(O){console.warn("CBS GO: failed to sync profile after avatar change",O)}},_.onerror=()=>d("⛔ Failed to read image."),_.readAsDataURL(v)}),o&&(o.onclick=()=>{ni(),d("✅ Photo removed"),Et();try{rn()}catch(v){console.warn("CBS GO: failed to sync profile after avatar removal",v)}});const g=document.querySelector("#friendWalletInput"),b=document.querySelector("#friendSendBtn"),S=document.querySelector("#friendsMsg"),p=document.querySelector("#friendsIncomingList"),u=document.querySelector("#friendsAcceptedList"),y=v=>{S&&(S.textContent=v||"")},A=(v,_="")=>{const O=v.nickname&&v.nickname.trim()?v.nickname.trim():Rt(v.otherWallet),P=Rt(v.otherWallet),pe=Vn(v.avatar||"",32),te=v.otherWallet||"";return`
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
          ${pe}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Oe(O||"Friend")}
            </div>
            ${P?`<div style="font-size:11px;opacity:.7;">${Oe(P)}</div>`:""}
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">
          <button
            type="button"
            class="friendCopyBtn"
            data-wallet="${Oe(te)}"
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
          ${_||""}
        </div>
      </div>
    `};async function B(){if(!(!p||!u))try{p.textContent="Loading…",u.textContent="Loading…";const v=await _a();v.incoming.length?p.innerHTML=v.incoming.map(_=>{const O=`
              <button
                type="button"
                class="friendAcceptBtn"
                data-friend-id="${_.id}"
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
            `;return A(_,O)}).join(""):p.textContent="No incoming requests.",v.accepted.length?u.innerHTML=v.accepted.map(_=>A(_,`
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
            `)).join(""):u.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(_=>{_.addEventListener("click",async()=>{const O=_.getAttribute("data-friend-id");if(O){y("Accepting friend…"),_.disabled=!0;try{await va(O),y("✅ Friend added."),await B()}catch(P){console.warn(P),y(`⛔ ${P.message||P}`),_.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(_=>{_.addEventListener("click",async()=>{const O=_.getAttribute("data-wallet")||"";if(O)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(O),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(P){console.warn("CBS GO: copy friend wallet failed",P),y("⛔ Could not copy wallet.")}})})}catch(v){console.warn("CBS GO: refreshFriends failed",v),p.textContent="Could not load friends.",u.textContent=""}}b&&g&&b.addEventListener("click",async()=>{const v=g.value.trim();if(!v){y("Enter a wallet address first.");return}y("Sending friend request…"),b.disabled=!0;try{await wa(v),y("✅ Friend request sent."),g.value="",await B()}catch(_){console.warn(_),y(`⛔ ${_.message||_}`)}finally{b.disabled=!1}}),B().catch(()=>{})}function Aa(){const t=Mr(),n=Lr(),o=Ye();return`
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
                ${Oe(o)}
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
              Send tickets and CBS (play money) to another CBS-GO wallet. Off-chain via Supabase.
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
  `}function za(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Wi()}catch(y){console.warn("CBS GO: openCardsPanel failed",y)}});const l=Ye(),d=document.querySelector("#giftWalletInput"),c=document.querySelector("#giftTicketsInput"),g=document.querySelector("#giftCbsInput"),b=document.querySelector("#giftSendBtn"),S=document.querySelector("#giftMsg"),p=y=>{S&&(S.textContent=y||"")};if(b&&d&&b.addEventListener("click",async()=>{const y=d.value.trim(),A=c?.value??"",B=g?.value??"",v=Number(A||"0"),_=Number(B||"0");if(!y){p("Enter a wallet address first.");return}if((!v||v<=0)&&(!_||_<=0)){p("Set tickets and/or CBS above 0.");return}b.disabled=!0,p("Sending gift…");try{await Xr(y,{tickets:v,cbs:_}),p("✅ Gift sent."),c&&(c.value=""),g&&(g.value="")}catch(O){console.warn(O),p(`⛔ ${O.message||"Could not send gift."}`)}finally{b.disabled=!1}}),!t||!l)return;const u=y=>{n&&(n.textContent=y||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),u("✅ Wallet address copied to clipboard.")):u("📋 Copy not supported in this browser.")}catch{u("⛔ Failed to copy address.")}},cn().catch(()=>{})}function Vr(){const t=gn();return t==="profile"?gr("Profile",`<div id="profileMount">${Ma()}</div>`):t==="bag"?gr("Bag",`<div id="bagMount">${Aa()}</div>`):""}function Ba(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ti()}
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
          ${Ir()}
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
        ${Vr()}
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

      ${$r()?`<button id="resetBtn" type="button" style="
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Vr();const n=gn();n==="profile"&&La(),n==="bag"&&za();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Fn("map"),Et()})}function Na(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=gn();Fn(o===n?"map":n||"map"),Et()})})}function br(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ba();try{Hr(),ka()}catch(p){console.warn("CBS GO: wake lock niet beschikbaar",p)}try{rn()}catch(p){console.warn("CBS GO: failed to sync player profile (ignored)",p)}if(Na(),Oi(),Qo(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const p=()=>{const u=document.querySelector("#stepsMount");u&&(u.innerHTML=Ir())};window.addEventListener("cbsgo:stepsChanged",p)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const p=()=>{const u=document.querySelector("#xpMount");u&&(u.innerHTML=Tr())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(u=>{window.addEventListener(u,p)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const p=()=>{gn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(u=>{window.addEventListener(u,p)})}let n=null;function o(p){const u=document.querySelector("#cbsgoToastHost");if(!u)return;let y=u.querySelector(".cbsgoToastBox");y||(y=document.createElement("div"),y.className="cbsgoToastBox",y.style.pointerEvents="auto",y.style.padding="8px 12px",y.style.borderRadius="999px",y.style.border="1px solid rgba(255,255,255,.25)",y.style.background="rgba(10,12,18,.88)",y.style.backdropFilter="blur(10px)",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.fontSize="11px",y.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",y.style.opacity="0",y.style.transform="translateY(10px)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",u.appendChild(y)),y.textContent=p||"",y.style.opacity="1",y.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{y.style.opacity="0",y.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",p=>{const u=p?.detail||{},y=Number(u.xp||0),A=Number(u.tickets||0),B=Number(u.cbs||0);if(!y&&!A&&!B)return;const v=[];y&&v.push(`+${y} XP`),A&&v.push(`+${A} ticket${A===1?"":"s"}`),B&&v.push(`+${B} CBS`);let _="Walking reward";u.reason==="boost"?_="Glow boost":u.reason==="treasure"||u.reason==="treasure-rare"?_="Treasure reward":u.reason==="distance"&&(_="Distance reward"),o(`${_}: ${v.join(" · ")}`)}));const l=()=>document.querySelector("#cbsgoLootOverlayHost");function d(p){const u=l();if(!u)return;u.innerHTML="";const y=Number(p?.steps||0),A=Number(p?.goal||0),B=p?.dayKey||"",v=document.createElement("div");v.style.position="fixed",v.style.inset="0",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.background="rgba(5,7,11,0.80)",v.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const O=A?`${y}/${A} steps`:`${y} steps`;_.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🎯</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        Daily goal reached!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your step goal for today${B?` (${B})`:""}.
      </div>
      <div style="
        font-size:15px;
        font-weight:700;
        margin-bottom:10px;
        color:#7dd3fc;
      ">
        ${O}
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
    `,v.appendChild(_),u.appendChild(v),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const P=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{u.innerHTML=""},250)},pe=document.getElementById("cbsgoDailyGoalCloseBtn");pe&&(pe.onclick=P),v.addEventListener("click",te=>{te.target===v&&P()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",p=>{d(p?.detail||{})}));function c(p){const u=l();if(!u)return;const y=Number(p?.xp||0),A=Number(p?.tickets||0),B=Number(p?.cbs||0);if(!y&&!A&&!B)return;u.innerHTML="";const v=document.createElement("div");v.style.position="fixed",v.style.inset="0",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.background="rgba(5,7,11,0.75)",v.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const O=[];y&&O.push(`+${y} XP`),A&&O.push(`+${A} ticket${A===1?"":"s"}`),B&&O.push(`+${B} CBS`),_.innerHTML=`
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
        ${Oe(O.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,v.appendChild(_),u.appendChild(v),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{u.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",p=>{c(p?.detail||{})}));function g(p){const u=l();if(!u)return;const y=Number(p?.tickets||0),A=Number(p?.cbs||0);if(!y&&!A)return;const B=p?.fromWallet||"",v=p?.senderNickname||"",_=v&&v.trim()?v.trim():Rt(B)||"Friend",O=p?.senderAvatar||"",P=[];y&&P.push(`+${y} ticket${y===1?"":"s"}`),A&&P.push(`+${A} CBS`);const pe=Rt(B);u.innerHTML="";const te=document.createElement("div");te.style.position="fixed",te.style.inset="0",te.style.display="flex",te.style.alignItems="center",te.style.justifyContent="center",te.style.background="rgba(5,7,11,0.80)",te.style.pointerEvents="auto";const q=document.createElement("div");q.style.width="min(340px, 92vw)",q.style.borderRadius="22px",q.style.border="1px solid rgba(56,189,248,.85)",q.style.background="rgba(10,12,18,0.98)",q.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",q.style.padding="18px 18px 14px 18px",q.style.textAlign="center",q.style.color="#fff",q.style.fontFamily="system-ui,sans-serif",q.style.opacity="0",q.style.transform="translateY(14px) scale(0.96)",q.style.transition="opacity .25s ease-out, transform .25s ease-out",q.innerHTML=`
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
        ${Vn(O,56)}
        <div style="font-weight:800;font-size:16px;margin-top:4px;">
          ${Oe(_)}
        </div>
        ${pe?`<div style="font-size:11px;opacity:.7;">${Oe(pe)}</div>`:""}
        <div style="font-size:12px;opacity:.85;margin-top:4px;">
          sent you a gift in CBS-GO
        </div>
        <div style="
          font-size:14px;
          font-weight:600;
          margin-top:8px;
        ">
          ${Oe(P.join(" · "))}
        </div>
        <button type="button" id="cbsgoFriendGiftCloseBtn" style="
          margin-top:10px;
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
      </div>
    `,te.appendChild(q),u.appendChild(te),requestAnimationFrame(()=>{q.style.opacity="1",q.style.transform="translateY(0) scale(1)"});const de=()=>{q.style.opacity="0",q.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{u.innerHTML=""},220)},Me=document.getElementById("cbsgoFriendGiftCloseBtn");Me&&(Me.onclick=de),te.addEventListener("click",qe=>{qe.target===te&&de()})}window.__cbsgo_friend_gift_overlay_listener||(window.__cbsgo_friend_gift_overlay_listener=!0,window.addEventListener("cbsgo:friendGiftReceived",p=>{g(p?.detail||{})}));function b(p){const u=l();if(!u)return;const y=Number(p?.tickets||0),A=Number(p?.cbs||0);if(!y&&!A)return;const B=p?.toWallet||"",v=Rt(B)||"Friend",_=[];y&&_.push(`-${y} ticket${y===1?"":"s"}`),A&&_.push(`-${A} CBS`),u.innerHTML="";const O=document.createElement("div");O.style.position="fixed",O.style.inset="0",O.style.display="flex",O.style.alignItems="center",O.style.justifyContent="center",O.style.background="rgba(5,7,11,0.80)",O.style.pointerEvents="auto";const P=document.createElement("div");P.style.width="min(340px, 92vw)",P.style.borderRadius="22px",P.style.border="1px solid rgba(56,189,248,.85)",P.style.background="rgba(10,12,18,0.98)",P.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",P.style.padding="18px 18px 14px 18px",P.style.textAlign="center",P.style.color="#fff",P.style.fontFamily="system-ui,sans-serif",P.style.opacity="0",P.style.transform="translateY(14px) scale(0.96)",P.style.transition="opacity .25s ease-out, transform .25s ease-out",P.innerHTML=`
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
        <div style="font-size:28px;">📨</div>
        <div style="font-weight:800;font-size:16px;margin-top:4px;">
          Gift sent
        </div>
        <div style="font-size:12px;opacity:.85;margin-top:4px;">
          to ${Oe(v)}
        </div>
        <div style="
          font-size:14px;
          font-weight:600;
          margin-top:8px;
        ">
          ${Oe(_.join(" · "))}
        </div>
        <button type="button" id="cbsgoFriendGiftSentCloseBtn" style="
          margin-top:10px;
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(148,163,184,.9);
          background:rgba(15,23,42,.95);
          color:#e5e7eb;
          font-size:12px;
          font-weight:600;
          cursor:pointer;
        ">
          OK
        </button>
      </div>
    `,O.appendChild(P),u.appendChild(O),requestAnimationFrame(()=>{P.style.opacity="1",P.style.transform="translateY(0) scale(1)"});const pe=()=>{P.style.opacity="0",P.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{u.innerHTML=""},220)},te=document.getElementById("cbsgoFriendGiftSentCloseBtn");te&&(te.onclick=pe),O.addEventListener("click",q=>{q.target===O&&pe()})}window.__cbsgo_friend_gift_sent_overlay_listener||(window.__cbsgo_friend_gift_sent_overlay_listener=!0,window.addEventListener("cbsgo:friendGiftSent",p=>{b(p?.detail||{})}));function S(p){const u=l();if(!u)return;u.innerHTML="";const y=Number(p?.days||7),A=Number(p?.rewardCbs||0),B=document.createElement("div");B.style.position="fixed",B.style.inset="0",B.style.display="flex",B.style.alignItems="center",B.style.justifyContent="center",B.style.background="rgba(5,7,11,0.80)",B.style.pointerEvents="auto";const v=document.createElement("div");v.style.width="min(340px, 92vw)",v.style.borderRadius="22px",v.style.border="1px solid rgba(251,191,36,.85)",v.style.background="rgba(10,12,18,0.98)",v.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",v.style.padding="20px 18px 16px 18px",v.style.textAlign="center",v.style.color="#fff",v.style.fontFamily="system-ui,sans-serif",v.style.opacity="0",v.style.transform="translateY(14px) scale(0.96)",v.style.transition="opacity .25s ease-out, transform .25s ease-out",v.innerHTML=`
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
        +${A} CBS (play money)
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
    `,B.appendChild(v),u.appendChild(B),requestAnimationFrame(()=>{v.style.opacity="1",v.style.transform="translateY(0) scale(1)"});const _=()=>{v.style.opacity="0",v.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{u.innerHTML=""},250)},O=document.getElementById("cbsgoStreakCloseBtn");O&&(O.onclick=_),B.addEventListener("click",P=>{P.target===B&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",p=>{S(p?.detail||{})})),Et(),$r()){const p=document.querySelector("#resetBtn");p&&p.addEventListener("click",ei)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",p=>{const u=p?.detail?.id;if(!u)return;if(u==="__daily__"){Pn({id:"__daily__",name:"Daily Glow"});return}if(Sr(u))return;const y=fo.find(A=>A.id===u);y&&Pn(y)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",p=>{const u=p?.detail?.id;u&&ao(async()=>{const{completeNode:y}=await Promise.resolve().then(()=>xo);return{completeNode:y}},void 0).then(({completeNode:y})=>{y(u),Zr()})})),cn().catch(()=>{}),window.__cbsgo_gifts_poll_started||(window.__cbsgo_gifts_poll_started=!0,setInterval(()=>{cn().catch(()=>{})},15e3))}function Zr(){if(!document.querySelector("#app"))return;if(Wr()&&ra()){br();return}ca();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),br()};window.addEventListener("cbsgo:loginDone",n)}function Jr(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function fn(t){const n=Jr();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";fn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{fn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function hr(){try{if(!document.getElementById("app")){fn("❌ #app not found in index.html");return}Zr();const n=Jr();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){fn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hr,{once:!0}):hr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
