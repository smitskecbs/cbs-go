import{createClient as co}from"https://esm.sh/@supabase/supabase-js@2";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(c){if(c.ep)return;c.ep=!0;const d=o(c);fetch(c.href,d)}})();const fo="modulepreload",po=function(t){return"/cbs-go/"+t},rr={},uo=function(n,o,l){let c=Promise.resolve();if(o&&o.length>0){let g=function(x){return Promise.all(x.map(h=>Promise.resolve(h).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");c=g(o.map(x=>{if(x=po(x),x in rr)return;rr[x]=!0;const h=x.endsWith(".css"),y=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${y}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":fo,h||(_.as="script"),_.crossOrigin="",_.href=x,p&&_.setAttribute("nonce",p),document.head.appendChild(_),h)return new Promise((B,O)=>{_.addEventListener("load",B),_.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${x}`)))})}))}function d(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return c.then(u=>{for(const p of u||[])p.status==="rejected"&&d(p.reason);return n().catch(d)})},Tn="cbsgoLevelUpOverlay",or="cbsgoLevelUpStyles",Mn="https://smitskecbs.github.io/cbs-go/";function xo(){if(document.getElementById(or))return;const t=document.createElement("style");t.id=or,t.textContent=`
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
  `,document.head.appendChild(t)}function Ln(){const t=document.getElementById(Tn);t&&t.remove()}function yo(t){const n=["rgba(244,114,182,1)","rgba(56,189,248,1)","rgba(34,197,94,1)","rgba(234,179,8,1)","rgba(129,140,248,1)"];for(let l=0;l<40;l++){const c=document.createElement("div");c.className="cbsgoConfettiPiece";const d=10+Math.random()*80,u=Math.random()*.6,p=1+Math.random()*.8;c.style.left=`${d}%`,c.style.top="-10px",c.style.background=n[Math.floor(Math.random()*n.length)],c.style.animationDelay=`${u}s`,c.style.animationDuration=`${p}s`,t.appendChild(c),setTimeout(()=>c.remove(),(u+p+.3)*1e3)}}function ir(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function go(t){xo(),Ln();const n=Number(t?.from||1),o=Number(t?.to||n+1),l=document.createElement("div");l.id=Tn,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999998",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,0.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.innerHTML=`
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
  `,document.body.appendChild(l);const c=l.querySelector("#cbsgoLevelUpConfettiHost");c&&yo(c);const d=()=>Ln(),u=l.querySelector("#cbsgoLevelUpClose"),p=l.querySelector("#cbsgoLevelUpContinue"),g=l.querySelector("#cbsgoLevelUpShareX"),x=l.querySelector("#cbsgoLevelUpCopyLink"),h=l.querySelector("#cbsgoLevelUpMsg");u&&(u.onclick=d),p&&(p.onclick=d),g&&(g.onclick=()=>{const y=`I just reached Level ${o} in CBS-GO 🎉 Exploring the real world, step by step. Join us: ${Mn}`,_=`https://twitter.com/intent/tweet?text=${encodeURIComponent(y)}`;window.open(_,"_blank","noopener,noreferrer")}),x&&(x.onclick=async()=>{try{await navigator.clipboard.writeText(Mn),h&&(h.textContent="✅ Link copied. Share it with your friends.")}catch{h&&(h.textContent="Could not copy link. You can share it manually: "+Mn)}}),setTimeout(()=>{document.getElementById(Tn)&&Ln()},1e4)}typeof window<"u"&&!window.__cbsgo_levelUpListener&&(window.__cbsgo_levelUpListener=!0,window.addEventListener("cbsgo:levelUp",t=>{go(t?.detail||{})}));const bo=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],wr="cbsgo_state_v6";function ho(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function mo(){return{xp:0,completed:{},updatedAt:Date.now()}}function Ut(){const t=localStorage.getItem(wr);return ho(t,mo())}function vr(t){t.updatedAt=Date.now(),localStorage.setItem(wr,JSON.stringify(t))}function Un(t){return 100+(Math.max(1,Number(t||1))-1)*40}function fn(){return Number(Ut().xp||0)}function Gt(){const t=fn();let n=1,o=t;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return n}function _r(){const t=fn();let n=1,o=t;for(;;){const l=Un(n);if(o<l||(o-=l,n+=1,n>999))break}return o}function Sr(){return Un(Gt())}function Dt(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Ut();const o=Gt(),l=Ut();l.xp=Number(l.xp||0)+n,vr(l);const c=Gt();return window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:l.xp,level:c}})),c>o&&(window.dispatchEvent(new CustomEvent("cbsgo:levelUp",{detail:{from:o,to:c,xp:l.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:levelChanged",{detail:{level:c,xp:l.xp}}))),l}function kr(t){const n=String(t||"");if(!n)return!1;const o=Ut();return!!(o.completed&&o.completed[n])}function Cr(t){const n=String(t||"");if(!n)return;const o=Ut();o.completed||(o.completed={}),o.completed[n]=Date.now(),vr(o),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:n}}))}const wo=Object.freeze(Object.defineProperty({__proto__:null,addXp:Dt,completeNode:Cr,getLevel:Gt,getXp:fn,getXpIntoLevel:_r,getXpNeededThisLevel:Sr,isNodeCompleted:kr},Symbol.toStringTag,{value:"Module"})),Er="cbsgoPuzzleModal";function vo(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function An(){const t=document.getElementById(Er);t&&t.remove()}function $n(t){An();const n=6,o=6,l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],c=["🍬","💎","⭐","🍀","🔮"],d=180,u=18,p=l.length,g=.01;let x=[],h=null,y=0,_=u,B=!1,O=!1,M=null;const I=t?.name||"CBS GO Puzzle",D=document.createElement("div");D.id=Er,D.style.position="fixed",D.style.inset="0",D.style.zIndex="999999",D.style.display="flex",D.style.alignItems="center",D.style.justifyContent="center",D.style.padding="16px",D.style.background="rgba(0,0,0,.70)",D.style.backdropFilter="blur(12px)",D.style.fontFamily="system-ui, sans-serif",D.style.color="#fff",D.innerHTML=`
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
          ${vo(I)}
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
  `,document.body.appendChild(D);const X=document.getElementById("cbsgoBoard"),pe=document.getElementById("cbsgoScore"),ne=document.getElementById("cbsgoMoves"),ce=document.getElementById("cbsgoStatus"),ke=document.getElementById("cbsgoPuzzleClose"),Be=document.getElementById("cbsgoPuzzleOk"),Te=document.getElementById("cbsgoConfettiLayer");function Ce(F){ce&&(ce.textContent=F||"")}function He(){if(!Te)return;Te.style.display="block",Te.innerHTML="";const F=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],Y=40;for(let q=0;q<Y;q++){const j=document.createElement("div"),te=6+Math.floor(Math.random()*6),me=Math.random()*100,Ee=Math.random()*.6,Me=1+Math.random()*.6,gt=Math.random()*360;j.style.position="absolute",j.style.top="-10%",j.style.left=`${me}%`,j.style.width=`${te}px`,j.style.height=`${te*2}px`,j.style.background=F[q%F.length],j.style.opacity="0.9",j.style.borderRadius="2px",j.style.transform=`rotate(${gt}deg)`,j.style.animation=`cbsgoConfettiFall ${Me}s ease-out ${Ee}s forwards`,Te.appendChild(j)}}function at(){return Math.floor(Math.random()*l.length)}function Bt(){x=[];for(let F=0;F<n;F++){const Y=[];for(let q=0;q<o;q++)Math.random()<g?Y.push(p):Y.push(at());x.push(Y)}}function st(F){return F===p}function Oe(){if(X){X.innerHTML="";for(let F=0;F<n;F++)for(let Y=0;Y<o;Y++){const q=x[F][Y],j=document.createElement("div");j.dataset.row=String(F),j.dataset.col=String(Y),j.style.borderRadius="12px",j.style.display="flex",j.style.alignItems="center",j.style.justifyContent="center",j.style.cursor=O?"default":"pointer",j.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",j.style.fontSize="20px",st(q)?(j.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",j.textContent="💥"):(j.style.background=l[q]||"#444",j.textContent=c[q]||"⬛"),h&&h.row===F&&h.col===Y&&(j.style.outline="2px solid #fff",j.style.outlineOffset="2px"),j.addEventListener("click",()=>{Re(F,Y)}),j.addEventListener("touchstart",te=>{if(O)return;const me=te.touches[0];M={row:F,col:Y,x:me.clientX,y:me.clientY}}),j.addEventListener("touchend",te=>{if(!M||O)return;const me=te.changedTouches[0],Ee=me.clientX-M.x,Me=me.clientY-M.y;if(Math.sqrt(Ee*Ee+Me*Me)<18){Re(F,Y),M=null;return}let Ye=M.row,tt=M.col;Math.abs(Ee)>Math.abs(Me)?Ee>0?tt+=1:tt-=1:Me>0?Ye+=1:Ye-=1,Ye>=0&&Ye<n&&tt>=0&&tt<o&&je(M.row,M.col,Ye,tt),M=null,te.preventDefault()}),X.appendChild(j)}}}function ut(F,Y){if(!F||!Y)return!1;const q=Math.abs(F.row-Y.row),j=Math.abs(F.col-Y.col);return q+j===1}function Ge(F,Y){const q=x[F.row][F.col];x[F.row][F.col]=x[Y.row][Y.col],x[Y.row][Y.col]=q}function xt(){const F=new Set;for(let Y=0;Y<n;Y++){let q=x[Y][0],j=0;for(let te=1;te<=o;te++){const me=te<o?x[Y][te]:null;if(me===q)continue;const Ee=te-j;if(q!=null&&Ee>=3)for(let Me=j;Me<te;Me++)F.add(`${Y},${Me}`);q=me,j=te}}for(let Y=0;Y<o;Y++){let q=x[0][Y],j=0;for(let te=1;te<=n;te++){const me=te<n?x[te][Y]:null;if(me===q)continue;const Ee=te-j;if(q!=null&&Ee>=3)for(let Me=j;Me<te;Me++)F.add(`${Me},${Y}`);q=me,j=te}}return F}function Ke(F){if(!F||!F.size)return 0;const Y=F.size;y+=Y*4,pe&&(pe.textContent=String(y)),!O&&y>=d&&yt(!0);for(const q of F){const[j,te]=q.split(","),me=Number(j),Ee=Number(te);x[me][Ee]=null}for(let q=0;q<o;q++){let j=n-1;for(let te=n-1;te>=0;te--)x[te][q]!=null&&(x[j][q]=x[te][q],j--);for(let te=j;te>=0;te--)Math.random()<g?x[te][q]=p:x[te][q]=at()}return Y}function et(F,Y){const q=new Set;for(let j=0;j<o;j++)q.add(`${F},${j}`);for(let j=0;j<n;j++)q.add(`${j},${Y}`);Ke(q),Oe(),O||setTimeout(()=>zt(!1),120)}function zt(F=!1){if(O)return;B=!0;const Y=()=>{if(O){B=!0;return}const q=xt();if(!q.size){B=!1,Oe(),F&&!O&&(_<=0?Xe():Ce("Nice! Keep matching."));return}Ke(q),Oe(),setTimeout(Y,120)};Y()}function yt(F){if(!O)if(O=!0,B=!0,F){Ce("Great job! Puzzle completed 🎉");try{t?.id&&Cr(t.id),Dt(10)}catch{}He(),setTimeout(()=>{An()},1600)}else Ce("Out of moves. Try again next time 🙂")}function Xe(){y>=d?yt(!0):_<=0&&yt(!1)}function je(F,Y,q,j){if(B||O)return;if(_<=0){Xe();return}const te={row:F,col:Y},me={row:q,col:j};if(!ut(te,me))return;const Ee=x[F][Y],Me=x[q][j],gt=st(Ee)||st(Me);if(Ge(te,me),h=null,_--,ne&&(ne.textContent=String(_)),gt){Oe();const Ye=st(x[F][Y])?{row:F,col:Y}:{row:q,col:j};et(Ye.row,Ye.col),Xe();return}if(!xt().size){Ge(te,me),Oe(),Ce("No match… try another swap."),Xe();return}Ce(""),Oe(),zt(!0)}function Re(F,Y){if(B||O)return;if(_<=0){Xe();return}const q={row:F,col:Y};if(!h){h=q,Oe();return}if(h.row===F&&h.col===Y){h=null,Oe();return}if(!ut(h,q)){h=q,Oe();return}je(h.row,h.col,q.row,q.col)}function fe(){An()}ke&&(ke.onclick=fe),Be&&(Be.onclick=()=>{fe()}),Bt(),Oe(),Ce("Tap or swipe two neighboring tiles to swap them.")}const Mr="cbsgo_inventory_v2";function _o(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function So(){return{tickets:0,cbs:0,cards:{}}}function Pe(){const t=localStorage.getItem(Mr),n=_o(t,So());return typeof n.tickets!="number"&&(n.tickets=0),typeof n.cbs!="number"&&(n.cbs=0),(!n.cards||typeof n.cards!="object")&&(n.cards={}),n}function Mt(t){const n={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0),cards:t.cards&&typeof t.cards=="object"?t.cards:{}};localStorage.setItem(Mr,JSON.stringify(n))}function Lr(){return Number(Pe().tickets||0)}function Ar(){return Number(Pe().cbs||0)}function Lt(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Pe();const o=Pe();return o.tickets=Number(o.tickets||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function pn(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Pe();const o=Pe();return o.cbs=Number(o.cbs||0)+n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function ko(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Pe();const o=Pe(),l=Number(o.tickets||0);if(l<n)throw new Error("Not enough tickets.");return o.tickets=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function Co(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return Pe();const o=Pe(),l=Number(o.cbs||0);if(l<n)throw new Error("Not enough CBS.");return o.cbs=l-n,Mt(o),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...o}})),o}function Eo(){return{...Pe().cards||{}}}function Mo(t){const n=String(t||"").trim();if(!n)return 0;const o=Eo();return Number(o[n]||0)}function Br(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Pe();const c=Pe();return c.cards||(c.cards={}),c.cards[o]=Number(c.cards[o]||0)+l,Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}function Lo(t,n=1){const o=String(t||"").trim(),l=Number(n||1);if(!o||!Number.isFinite(l)||l<=0)return Pe();const c=Pe();if(!c.cards||typeof c.cards[o]!="number")throw new Error("Not enough of that card in your collection.");const d=Number(c.cards[o]||0);if(d<l)throw new Error("Not enough of that card in your collection.");return c.cards[o]=d-l,c.cards[o]<=0&&delete c.cards[o],Mt(c),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...c}})),c}const zr="cbsgo_steps_v6",Ao="cbsgo_steps_v5",Bo="cbsgo_gps_autostart_v2",Nr="cbsgo_daily_puzzle_v1",zo=.75,kt=5e3,on=7,Pn=100,No=1e3,Io=.5,To=2e3,$o=4.5,Bn=1500,zn=200,Po=.25,Oo=.05,jo=.3;let Jt=null,en=!1,mt={msg:"init"};function On(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}const Ir="cbsgo_cards_v1",Ro=[{id:"walk_sun_1",name:"Sunny Walk",emoji:"☀️",rarity:"common"},{id:"cbs_heart_1",name:"CBS Heart",emoji:"❤️",rarity:"rare"}];function Fo(t){if(!t)return null;const n=String(t);return n==="sunny_walker"?"walk_sun_1":n==="cbs_heart"?"cbs_heart_1":n}function Uo(t){return Ro.find(n=>n.id===t)||{id:t,name:t,emoji:"🃏",rarity:"common"}}function Go(){try{const t=localStorage.getItem(Ir),n=On(t,{});if(n&&typeof n.counts=="object"&&n.counts!==null)return{counts:{...n.counts}};if(n&&typeof n=="object"&&!Array.isArray(n)){const o={};for(const[l,c]of Object.entries(n))if(c&&typeof c=="object"&&"count"in c){const d=Number(c.count);Number.isFinite(d)&&d>0&&(o[l]=d)}if(Object.keys(o).length>0)return{counts:o}}return{counts:{}}}catch{return{counts:{}}}}function Wo(t){try{const n=t&&t.counts&&typeof t.counts=="object"?t.counts:{},o={};for(const[c,d]of Object.entries(n)){const u=Number(d||0);Number.isFinite(u)&&u>0&&(o[c]=u)}const l={counts:o};localStorage.setItem(Ir,JSON.stringify(l))}catch{}}function Do(t,n=1){const o=Fo(t);if(!o)return null;const l=Number(n||0);if(!Number.isFinite(l)||l<=0)return null;const d={...Go().counts||{}},p=Number(d[o]||0)+l;d[o]=p,Wo({counts:d});const g=Uo(o);try{window.dispatchEvent(new CustomEvent("cbsgo:cardsChanged",{detail:{counts:d}})),window.dispatchEvent(new CustomEvent("cbsgo:cardFound",{detail:{cardId:o,count:p,card:g}})),window.dispatchEvent(new CustomEvent("cbsgo:bagChanged",{detail:{reason:"cardDrop",card:g}}))}catch{}return{cardId:o,count:p,card:g}}function it(){const t=new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Yo(t){if(!t||typeof t!="string")return null;const n=t.split("-").map(Number);if(n.length!==3)return null;const[o,l,c]=n,d=new Date(o,l-1,c);return Number.isNaN(d.getTime())?null:d}function qo(t){const n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${l}`}function Tr(t,n){const o=Yo(t);if(!o)return[];const l=[];for(let c=n-1;c>=0;c--){const d=new Date(o.getTime());d.setDate(d.getDate()-c),l.push(qo(d))}return l}function an(){return{steps:0,meters:0,totalMeters:0,lastPos:null,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,dayKey:it(),daySteps:0,dayMeters:0,dailyGoalSteps:kt,dailyGoalReached:!1,streak:{},lastStreakRewardDate:null,dailyVersion:1,updatedAt:Date.now()}}function Ho(t){const n=it();return!t||typeof t!="object"?an():(typeof t.steps!="number"&&(t.steps=0),typeof t.meters!="number"&&(t.meters=0),typeof t.chestMeters!="number"&&(t.chestMeters=0),typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketChunksAwarded!="number"&&(t.ticketChunksAwarded=0),typeof t.totalMeters!="number"&&(t.totalMeters=Number(t.meters||0)),typeof t.dailyVersion!="number"||t.dailyVersion<1?(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=t.steps||0),typeof t.dayMeters!="number"&&(t.dayMeters=t.meters||0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null),t.dailyVersion=1):(t.dayKey||(t.dayKey=n),typeof t.daySteps!="number"&&(t.daySteps=0),typeof t.dayMeters!="number"&&(t.dayMeters=0),(typeof t.dailyGoalSteps!="number"||t.dailyGoalSteps<=0)&&(t.dailyGoalSteps=kt),typeof t.dailyGoalReached!="boolean"&&(t.dailyGoalReached=!1),(!t.streak||typeof t.streak!="object")&&(t.streak={}),typeof t.lastStreakRewardDate!="string"&&(t.lastStreakRewardDate=null)),t)}function un(t){t.updatedAt=Date.now(),localStorage.setItem(zr,JSON.stringify(t))}function Ko(t,n){if(!n)return;const o=Tr(n,on);!o.length||!o.every(c=>!!t.streak[c])||t.lastStreakRewardDate!==n&&(pn(Pn),Yt(),t.lastStreakRewardDate=n,window.dispatchEvent(new CustomEvent("cbsgo:streakReward",{detail:{days:on,rewardCbs:Pn,lastDayKey:n}})))}function ar(t){t=Ho(t||an());const n=it();if(t.dayKey!==n){const o=t.dayKey;o&&(t.streak||(t.streak={}),t.streak[o]=!!t.dailyGoalReached,Ko(t,o)),t.dayKey=n,t.daySteps=0,t.dayMeters=0,t.dailyGoalReached=!1,un(t)}return t}function pt(){let t=localStorage.getItem(zr);if(!t){const o=localStorage.getItem(Ao);if(o){const l=On(o,an()),c=ar(l);return un(c),c}}const n=On(t,an());return ar(n)}function tn(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Xo()}}))}function Gn(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function Yt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function Wn(t,n,o,l){const c=Number(t||0),d=Number(n||0),u=0;if(!(!c&&!d&&!u))try{window.dispatchEvent(new CustomEvent("cbsgo:stepReward",{detail:{xp:c,tickets:d,cbs:u,reason:l||"distance"}}))}catch{}}function Xo(){const t=pt();return Number(t.daySteps!=null?t.daySteps:t.steps||0)}function Vo(){const t=pt(),n=t.dayMeters!=null?t.dayMeters:t.meters||0;return Number(n||0)}function Zo(){return Vo()/1e3}function Qo(){const t=pt(),n=Number(t.daySteps!=null?t.daySteps:t.steps||0),o=Number(t.dailyGoalSteps||kt),l=!!t.dailyGoalReached,c=t.dayKey||it(),d=t.streak||{},p=Tr(c,on).map(g=>{let x=!1;return g===c?x=l:x=!!d[g],{dateKey:g,reached:x}});return{stepsToday:n,goalSteps:o,goalReached:l,streak:p,todayKey:c,streakLength:on,rewardPerStreak:Pn}}function sr(){return!!en}function Jo(){try{return localStorage.getItem(Nr)===it()}catch{return!1}}function ei(){try{localStorage.setItem(Nr,it())}catch{}}function ti(t,n){return Jo()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:n,date:it()}})),ei(),!0)}function lr(){const t=pt(),n=Number(t.boostUntil||0);return Math.max(0,n-Date.now())}function ni(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const o=Number(t.boostLastStep||0),l=Number(t.steps||0);if(!Number.isFinite(o)){t.boostLastStep=l;return}const c=l-o;if(!Number.isFinite(c)||c<Bn)return;const d=Math.floor(c/Bn);d<=0||(Lt(d),Yt(),Wn(0,d,0,"boost"),t.boostLastStep=o+d*Bn)}function ri(t){let n=Number(t.chestMeters||0);if(Number.isFinite(n)||(n=0),n<zn){t.chestMeters=n;return}let o=0;for(;n>=zn&&o<5;)if(n-=zn,o+=1,Math.random()<Po){const l=Math.random()<Oo,c=l?10:3,d=l?2:1;Dt(c),Gn(),Lt(d),Yt();const u=l&&Math.random()<jo;Wn(c,d,0,l?"treasure-rare":"treasure"),window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:c,tickets:d,rare:l,hasCBSFlag:u}}));break}t.chestMeters=n}function oi(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),g=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function ii(t){const n=Number((t.totalMeters!=null?t.totalMeters:t.meters)||0);if(!Number.isFinite(n)||n<=0)return;let o=0,l=0;const c=Math.floor(n/1e3),d=Number(t.xpKmAwarded||0);if(c>d){const x=c-d;x>0&&(Dt(x),Gn(),t.xpKmAwarded=c,o+=x)}const p=Math.floor(n/2500),g=Number(t.ticketChunksAwarded||0);if(p>g){const x=p-g;x>0&&(Lt(x),Yt(),t.ticketChunksAwarded=p,l+=x)}(o>0||l>0)&&Wn(o,l,0,"distance")}function ai(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return pt();const o=pt();o.totalMeters=Number(o.totalMeters||0)+n,o.meters=Number(o.meters||0)+n,o.dayMeters=Number(o.dayMeters||0)+n,o.chestMeters=Number(o.chestMeters||0)+n;const l=Number(o.steps||0),c=Math.floor((o.meters||0)/zo);if(c>l){const d=c-l;o.steps=c,o.daySteps=Number(o.daySteps||0)+d}return!o.dailyGoalReached&&o.daySteps>=(o.dailyGoalSteps||kt)&&(o.dailyGoalReached=!0,window.dispatchEvent(new CustomEvent("cbsgo:dailyGoalReached",{detail:{dayKey:o.dayKey||it(),steps:o.daySteps,goal:o.dailyGoalSteps||kt}}))),ii(o),ni(o),ri(o),un(o),tn(),o}function si(){Jt!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Jt),Jt=null}async function cr(t={}){const n=!!t.silent;if(!navigator.geolocation)return mt={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Bo,"1")}catch{}si(),en=!0,mt={msg:"requesting",t:Date.now()};try{return Jt=navigator.geolocation.watchPosition(o=>{const l=o.coords.latitude,c=o.coords.longitude,d=o.coords.accuracy||999,u=Date.now(),p=pt(),g=p.lastPos;p.lastPos={lat:l,lng:c,t:u},un(p);const x=Number.isFinite(o.coords.heading)?o.coords.heading:null,h=Number.isFinite(o.coords.speed)?o.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:l,lng:c,acc:d,heading:x,speed:h,t:u}})),d>No){mt={lat:l,lng:c,acc:d,t:u,reason:"accuracy",boostMs:lr()},tn();return}ti(l,c);let y=0,_=0,B=0,O=0,M="no-last";g&&typeof g.lat=="number"&&typeof g.lng=="number"&&typeof g.t=="number"&&(y=oi({lat:g.lat,lng:g.lng},{lat:l,lng:c}),_=Math.max(1,(u-g.t)/1e3),B=y/_,y<Io?M="jitter":y>To?M="teleport":B>$o?M="too-fast":(ai(y),O=y,M="ok")),mt={lat:l,lng:c,acc:d,t:u,dist:Math.round(y),dt:Math.round(_),speed:Number.isFinite(B)?Number(B.toFixed(2)):0,added:Math.round(O),reason:M,boostMs:lr()},tn()},o=>{en=!1,mt={err:o?.message||"GPS blocked",t:Date.now()},tn()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return en=!1,mt={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function li(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>sr()||await cr({silent:!0}))();const n=async()=>{sr()||await cr({silent:!0}),window.removeEventListener("pointerdown",n),window.removeEventListener("touchstart",n),window.removeEventListener("click",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("touchstart",n,{once:!0}),window.addEventListener("click",n,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const n=t?.detail||{},o=Number(n.xp||0),l=Number(n.tickets||0),c=Number(n.cbs||0);o>0&&(Dt(o),Gn()),(l>0||c>0)&&(l>0&&Lt(l),c>0&&pn(c),Yt());const d=n.cardId||n.card_id;if(d)try{const u=Number(n.cardCount||n.count||1)>0?Number(n.cardCount||n.count||1):1;Do(d,u)}catch(u){console.warn("CBS GO: grantCard from lootReward failed",u)}}));function $r(){const t=fn(),n=Gt(),o=_r(),l=Sr(),c=Zo(),d=l>0?Math.min(100,Math.round(o/l*100)):0;return`
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
  `}function Pr(){const{stepsToday:t,goalSteps:n,goalReached:o,streak:l,streakLength:c,rewardPerStreak:d}=Qo(),u=n>0?Math.min(100,Math.round(t/n*100)):0,p=(l||[]).map(x=>x.reached?"★":"☆").join(" ");return`
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
  `}function Or(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ci(){try{const t=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>localStorage.removeItem(n))}catch{}try{const t=[];for(let n=0;n<sessionStorage.length;n++){const o=sessionStorage.key(n);o&&o.startsWith("cbsgo_")&&t.push(o)}t.forEach(n=>sessionStorage.removeItem(n))}catch{}window.location.reload()}const jr="cbsgo_player_name_v2",Dn="cbsgo_player_avatar_v2";function At(){try{return localStorage.getItem(jr)||"Sovereign"}catch{return"Sovereign"}}function Rr(t){const n=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(jr,n)}catch{}return n}function Yn(){try{return localStorage.getItem(Dn)||""}catch{return""}}function di(t){const n=String(t||"");try{localStorage.setItem(Dn,n)}catch{}return n}function fi(){try{localStorage.removeItem(Dn)}catch{}}let K=null,nt=null,rt=null,Pt=null,jt=null,De=null,$e=null,wt=0,dt=!1,Je=!0,We=null;const Ze=new Map;let Qe=!0,Rt={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const pi="48a387bba00043ac4ba5823371abc9d2",Wt=80,ui=6,xi=80,yi=220,gi=6e4,bi=5*6e4,hi=300,mi=.35,Nn=["walk_sun_1","walk_rain_1","walk_city_1","cbs_heart_1"],wi=350,vi=.35,_i=120;let sn=0,vt=0,nn=null,jn=!1,St=[];function ft(t){return document.getElementById(t)}function _t(t){const n=ft("cbsgoMapHost");if(!n)return;let o=ft("cbsgoMapMsg");o||(o=document.createElement("div"),o.id="cbsgoMapMsg",o.style.position="absolute",o.style.left="12px",o.style.right="12px",o.style.bottom="16px",o.style.zIndex="9999",o.style.padding="10px 12px",o.style.borderRadius="14px",o.style.border="1px solid rgba(255,255,255,.14)",o.style.background="rgba(0,0,0,.40)",o.style.color="#fff",o.style.fontFamily="system-ui, sans-serif",o.style.fontSize="13px",o.style.backdropFilter="blur(10px)",n.appendChild(o)),o.textContent=t||""}function Si(){const t=String(At()||"").trim();return t?t[0].toUpperCase():"🙂"}function Rn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(t,n){const l=x=>x*Math.PI/180,c=l(n.lat-t.lat),d=l(n.lng-t.lng),u=l(t.lat),p=l(n.lat),g=Math.sin(c/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(d/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function Fr(t,n,o){const l=n+Math.random()*(o-n),c=Math.random()*2*Math.PI,d=l*Math.cos(c)/111111,u=l*Math.sin(c)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+d,lng:t.lng+u}}function ki(t,n){const o=x=>x*Math.PI/180,l=o(t.lat),c=o(n.lat),d=o(n.lng-t.lng),u=Math.sin(d)*Math.cos(c),p=Math.cos(l)*Math.sin(c)-Math.sin(l)*Math.cos(c)*Math.cos(d);let g=Math.atan2(u,p);return g=g*180/Math.PI,g=(g+360)%360,g}function Ci(t,n,o){const c=n/6371e3,d=o*Math.PI/180,u=t[0]*Math.PI/180,p=t[1]*Math.PI/180,g=Math.sin(u),x=Math.cos(u),h=Math.sin(c),y=Math.cos(c),_=Math.asin(g*y+x*h*Math.cos(d)),B=p+Math.atan2(Math.sin(d)*h*x,y-g*Math.sin(_));return[_*180/Math.PI,B*180/Math.PI]}function Ei(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function Ur(){const{temp:t,iconEmoji:n}=Rt;return t==null?"⛅ …°":`${n} ${Math.round(t)}°`}function Gr(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;Ei();const{condition:n,isNight:o}=Rt;t.style.background=o?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let l="";if(n==="rain"||n==="storm"){const d=[];for(let u=0;u<48;u++){const p=Math.random()*100,g=Math.random()*16-8,x=Math.random()*2.5,h=2+Math.random()*1.5;d.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${p}%;
            --xEnd:${p+g}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=d.join("")}else if(n==="snow"){const d=[];for(let u=0;u<42;u++){const p=Math.random()*100,g=Math.random()*20-10,x=Math.random()*4,h=6+Math.random()*4;d.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${p}%;
            --xEnd:${p+g}%;
            left:0;
            animation-delay:${x}s;
            animation-duration:${h}s;
          "
        ></div>
      `)}l=d.join("")}else l="";t.innerHTML=l}async function Mi(t,n){const o=Date.now();if(!(Rt.lastUpdated&&o-Rt.lastUpdated<300*1e3))try{const l=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${pi}&units=metric`,c=await fetch(l);if(!c.ok)throw new Error("HTTP "+c.status);const d=await c.json(),u=d?.main?.temp,p=d?.weather?.[0]?.icon||"01d",g=String(d?.weather?.[0]?.main||"").toLowerCase();let x=p.endsWith("n"),h="⛅",y="clear";p.startsWith("01")||p.startsWith("02")?y="clear":p.startsWith("03")||p.startsWith("04")?(h="☁️",y="clouds"):p.startsWith("09")||p.startsWith("10")?(h="🌧️",y="rain"):p.startsWith("11")?(h="⛈️",y="storm"):p.startsWith("13")?(h="❄️",y="snow"):p.startsWith("50")&&(h="🌫️",y="mist"),g.includes("rain")&&(y="rain"),g.includes("snow")&&(y="snow"),g.includes("thunder")&&(y="storm");try{const B=Number(d?.dt||0),O=Number(d?.timezone||0);if(B&&Number.isFinite(O)){const I=((B+O)/3600%24+24)%24;x=I<7||I>=19}}catch{}y==="clear"?h=x?"🌙":"☀️":y==="clouds"?h="☁️":y==="rain"?h="🌧️":y==="storm"?h="⛈️":y==="snow"?h="❄️":y==="mist"&&(h="🌫️"),Rt={temp:u,iconEmoji:h,condition:y,isNight:x,lastUpdated:o};const _=document.getElementById("cbsgoWeatherLabel");_&&(_.textContent=Ur()),Gr()}catch(l){console.warn("Weather fetch failed",l)}}function Li(t){const n=Yn();if(n){const c=`
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
    ">${Rn(Si())}</div>
  `;return t.divIcon({html:l,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function dr(t,n){const o=`
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
        background-image:url('${Rn(o)}');
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
    ">${Rn(c)}</div>
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Ni(){const t=Math.random();return t<.6?"small":t<.9?"medium":t<.98?"large":"jackpot"}function Ii(){if(!Nn.length)return null;const t=Math.floor(Math.random()*Nn.length);return Nn[t]}function Ti(t){const n=t||"small";let o,l,c;n==="jackpot"?(o=30+Math.floor(Math.random()*31),l=2+Math.floor(Math.random()*2),c=20+Math.floor(Math.random()*31)):n==="large"?(o=20+Math.floor(Math.random()*21),l=1+Math.floor(Math.random()*2),c=10+Math.floor(Math.random()*16)):n==="medium"?(o=10+Math.floor(Math.random()*16),l=Math.random()<.7?1:0,c=Math.random()<.5?5+Math.floor(Math.random()*11):0):(o=5+Math.floor(Math.random()*11),l=Math.random()<.25?1:0,c=Math.random()<.25?3+Math.floor(Math.random()*8):0);let d=null,u=0;if(Math.random()<mi){const p=Ii();p&&(d=p,u=1)}return{xp:o,tickets:l,cbs:c,cardId:d,cardCount:u}}function $i(t){if(!K||!De||!t)return;const n=Date.now();if(n-sn<gi||De.getLayers().length>=ui)return;const l=window.L;if(!l)return;const c=Ni(),d=Ti(c),u=Fr(t,xi,yi),p=Bi(l),g=l.marker([u.lat,u.lng],{icon:p,pane:"cbsgo-loot-pane"}),h={marker:g,createdAt:n,lat:u.lat,lng:u.lng,reward:d};St.push(h),g.on("click",()=>{if(!$e){alert("GPS not ready yet. Wait until your player marker appears.");return}const y={lat:$e[0],lng:$e[1]},_={lat:u.lat,lng:u.lng},B=Ct(y,_);if(B>Wt){alert(`Too far to open this gift.

Distance: ${Math.round(B)}m
Needed: ≤ ${Wt}m`);return}De.removeLayer(g),St=St.filter(ke=>ke.marker!==g);const{xp:O,tickets:M,cbs:I,cardId:D,cardCount:X}=d,pe=[];O&&pe.push(`+${O} XP`),M&&pe.push(`+${M} ticket${M===1?"":"s"}`),I&&pe.push(`+${I} CBS`),D&&X>0&&pe.push(`+${X} card${X===1?"":"s"}`);const ne=pe.length?pe.join(" · "):"Nothing? That's weird…";alert(`You opened a mystery gift!

${ne}`);const ce={kind:"mystery",xp:O||0,tickets:M||0,cbs:I||0,cardId:D||null,cardCount:X||0};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:ce}))}catch{}}),g.addTo(De),sn=n}function Pi(t){if(!K||!De||!t)return;const n=Date.now();let o=0;St=St.filter(l=>{if(!l||!l.marker||!De.hasLayer(l.marker))return!1;if(n-(l.createdAt||0)>bi)return De.removeLayer(l.marker),o+=1,!1;const d=Ct({lat:t.lat,lng:t.lng},{lat:l.lat,lng:l.lng});return Number.isFinite(d)&&d>hi?(De.removeLayer(l.marker),o+=1,!1):!0}),o>0&&De.getLayers().length===0&&(sn=0)}function Oi(t){if(!K||!jt||!t||nn)return;const n=window.L;if(!n)return;if(jn){if(vt<wi||Math.random()>vi)return;vt=0}else{if(vt<_i)return;vt=0,jn=!0}const o=Fr(t,60,140),l=zi(n),c=n.marker([o.lat,o.lng],{icon:l,pane:"cbsgo-puzzle-pane"});c.on("click",()=>{if(!$e){alert("GPS not ready yet. Wait until your player marker appears.");return}const d={lat:$e[0],lng:$e[1]},u={lat:o.lat,lng:o.lng},p=Ct(d,u);if(p>Wt){alert(`Too far to start this puzzle.

Distance: ${Math.round(p)}m
Needed: ≤ ${Wt}m`);return}jt.removeLayer(c),nn=null,$n({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),c.addTo(jt),nn=c}function ji(t){const n=window.L;if(!n||!K||!t)return;const o=Wt;Pt?(Pt.setLatLng(t),Pt.setRadius(o)):Pt=n.circle(t,{radius:o,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(K)}function Ri(t){const n=window.L;if(!n||!K)return;const o=Li(n);if(nt?(nt.setIcon(o),nt.setLatLng(t)):(nt=n.marker(t,{icon:o,pane:"cbsgo-player-pane"}).addTo(K),K.setView(t,19)),rt?(rt.setIcon(dr(n,wt)),rt.setLatLng(t)):rt=n.marker(t,{icon:dr(n,wt),interactive:!1,pane:"cbsgo-player-pane"}).addTo(K),nt&&nt.bringToFront&&nt.bringToFront(),rt&&rt.bringToFront&&rt.bringToFront(),ji(t),Je&&!dt&&K)try{const l=K.getZoom()||19;let c=t;Number.isFinite(wt)&&(c=Ci(t,40,wt));const d=K.getCenter(),u=Ct({lat:d.lat,lng:d.lng},{lat:c[0],lng:c[1]});(!Number.isFinite(u)||u>20)&&K.setView(c,l)}catch{}}function Wr(){const t=window.L;return!t||!K?null:(We?(Qe&&!K.hasLayer(We)&&We.addTo(K),!Qe&&K.hasLayer(We)&&K.removeLayer(We)):(We=t.layerGroup(),Qe&&We.addTo(K)),We)}function Fi(t){if(!Array.isArray(t)||!K)return[];const n=K.getZoom()||3;let o;n>=15?o=100:n>=10?o=50:n>=6?o=25:o=10;const l=new Map;t.forEach(d=>{if(!d||d.isMe||typeof d.lat!="number"||typeof d.lng!="number")return;const u=Math.round(d.lat*o)/o,p=Math.round(d.lng*o)/o,g=`${u}_${p}`;l.has(g)||l.set(g,[]),l.get(g).push(d)});const c=[];for(const[d,u]of l.entries())if(u.length)if(u.length===1){const p=u[0];c.push({id:p.wallet_pk||d,lat:p.lat,lng:p.lng,count:1,nickname:p.nickname||"Anon",avatar:p.avatar||"",isCluster:!1})}else{let p=0,g=0;u.forEach(y=>{p+=y.lat,g+=y.lng});const x=p/u.length,h=g/u.length;c.push({id:`cluster_${d}`,lat:x,lng:h,count:u.length,nickname:`${u.length} players`,avatar:"",isCluster:!0})}return c}function Ui(t){const n=window.L;if(!n||!K)return;const o=Wr();if(!o)return;if(!Qe){for(const[d,u]of Ze.entries())o.removeLayer(u),Ze.delete(d);return}const l=Fi(t),c=new Set;l.forEach(d=>{if(!d||typeof d.lat!="number"||typeof d.lng!="number")return;const u=d.id||`${d.lat},${d.lng}`;c.add(u);const p=[d.lat,d.lng];let g=Ze.get(u);if(g)g.setLatLng(p);else{const x=d.isCluster&&d.count>1?String(d.count):d.nickname||"Anon",h=Ai(n,x,d.avatar,d.isCluster);g=n.marker(p,{icon:h,pane:"cbsgo-others-pane"});const y=d.isCluster&&d.count>1?`${d.count} CBS-GO explorers nearby`:`${d.nickname||"CBS-GO explorer"}`;g.bindPopup(y),g.addTo(o),Ze.set(u,g)}});for(const[d,u]of Ze.entries())c.has(d)||(o.removeLayer(u),Ze.delete(d))}function Gi(){return`
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
  `}function Wi(){try{K&&K.remove()}catch{}K=null,nt=null,rt=null,Pt=null,jt=null,De=null,$e=null,dt=!1,Je=!0,sn=0,vt=0,nn=null,jn=!1,We=null,Ze.clear(),St=[]}function Di(){const t=window.L,n=ft("cbsgoMap");if(!t||!n)return!1;Wi();const o=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));K=t.map(n,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:o,maxBoundsViscosity:1,minZoom:1,maxZoom:19});const l=K.createPane("cbsgo-player-pane");l.style.zIndex="650";const c=K.createPane("cbsgo-others-pane");c.style.zIndex="640";const d=K.createPane("cbsgo-loot-pane");d.style.zIndex="630";const u=K.createPane("cbsgo-puzzle-pane");return u.style.zIndex="630",t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:o}).addTo(K),K.setMaxBounds(o),K.setView([51.687,4.87],16),jt=t.layerGroup().addTo(K),De=t.layerGroup().addTo(K),K.on("dragstart",()=>{Je=!1}),K.on("zoomstart",()=>{Je=!1}),!0}function Yi(){!navigator.geolocation||!K||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:o,accuracy:l,heading:c}=t.coords,d={lat:n,lng:o},u=$e?{lat:$e[0],lng:$e[1]}:null;if($e=[n,o],Number.isFinite(c))wt=c;else if(u){const p=Ct(u,d);Number.isFinite(p)&&p>2&&(wt=ki(u,d))}if(Ri([n,o]),u){const p=Ct(u,d);if(Number.isFinite(p)&&p>1&&(vt+=p),Number.isFinite(p)&&p>20&&!Je&&!dt&&K){Je=!0;const g=K.getZoom()||19;K.setView([n,o],g)}}Oi(d),$i(d),Pi(d),Mi(n,o),_t(`GPS OK • accuracy ~${Math.round(l)}m`)},t=>{_t(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function qi(){let t=0;const n=120,o=()=>{if(t++,!ft("cbsgoMap"))return t<n?setTimeout(o,100):void 0;if(!window.L){if(_t("Loading map engine…"),t<n)return setTimeout(o,100);_t("Map engine failed (Leaflet not found). Refresh.");return}if(!Di()){_t("Could not init map. Refresh.");return}const c=ft("cbsgoCenterBtn");c&&(c.onclick=()=>{K&&$e&&(Je=!0,dt=!1,K.setView($e,19))});const d=ft("cbsgoCompassBtn");d&&(d.onclick=()=>{K&&(dt=!dt,dt?(Je=!1,K.setView([51.687,4.87],3)):$e&&(Je=!0,K.setView($e,16)))});const u=ft("cbsgoOnlineToggleBtn");if(u){const p=()=>{Qe?(u.style.borderColor="rgba(251,191,36,0.95)",u.style.boxShadow="0 0 12px rgba(251,191,36,0.7)"):(u.style.borderColor="rgba(255,255,255,0.18)",u.style.boxShadow="none")};p(),u.onclick=()=>{Qe=!Qe;const g=Wr();if(g&&K&&(Qe?K.hasLayer(g)||g.addTo(K):K.hasLayer(g)&&K.removeLayer(g)),p(),!Qe&&We){for(const[x,h]of Ze.entries())We.removeLayer(h);Ze.clear()}}}window.__cbsgo_onlinePlayers_listener||(window.__cbsgo_onlinePlayers_listener=!0,window.addEventListener("cbsgo:onlinePlayers",p=>{const g=p?.detail?.players||[];Ui(g)})),Gr(),_t("Loading GPS…"),Yi()};o()}const Hi="cbsgo_cards_v1";function Ki(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function qn(){return[{id:"walk_sun_1",set:"Walking",name:"Sunny Walk",emoji:"🚶‍♂️☀️",rarity:"common"},{id:"walk_rain_1",set:"Walking",name:"Rainy Walk",emoji:"🚶‍♂️🌧️",rarity:"common"},{id:"walk_night_1",set:"Walking",name:"Night Walk",emoji:"🚶‍♀️🌙",rarity:"uncommon"},{id:"walk_city_1",set:"Walking",name:"City Steps",emoji:"🚶‍♂️🏙️",rarity:"uncommon"},{id:"walk_nature_1",set:"Walking",name:"Forest Trail",emoji:"🚶‍♀️🌲",rarity:"rare"},{id:"walk_beach_1",set:"Walking",name:"Beach Walk",emoji:"🚶‍♂️🏖️",rarity:"rare"},{id:"cbs_heart_1",set:"CBS",name:"CBS Heart",emoji:"💛🪙",rarity:"rare"},{id:"cbs_chain_1",set:"CBS",name:"Break the Chain",emoji:"⛓️✨",rarity:"epic"},{id:"cbs_fire_1",set:"CBS",name:"Builder Flame",emoji:"🔥🛠️",rarity:"epic"},{id:"cbs_go_1",set:"CBS",name:"CBS-GO Explorer",emoji:"🗺️🪙",rarity:"legendary"},{id:"walk_morning_1",set:"Walking",name:"Morning Steps",emoji:"🌅🚶‍♂️",rarity:"common"},{id:"walk_evening_1",set:"Walking",name:"Evening Glow",emoji:"🌇🚶‍♀️",rarity:"common"},{id:"walk_park_1",set:"Walking",name:"Park Loop",emoji:"🌳🚶‍♂️",rarity:"uncommon"},{id:"walk_bridge_1",set:"Walking",name:"River Bridge",emoji:"🌉🚶‍♀️",rarity:"uncommon"},{id:"cbs_star_1",set:"CBS",name:"Community Star",emoji:"⭐🪙",rarity:"rare"},{id:"cbs_glow_1",set:"CBS",name:"Glow Ticket",emoji:"🎟️✨",rarity:"rare"},{id:"cbs_team_1",set:"CBS",name:"Builder Squad",emoji:"🧑‍💻🧑‍💻",rarity:"epic"},{id:"cbs_legend_1",set:"CBS",name:"CBS Legend",emoji:"👑🪙",rarity:"legendary"},{id:"walk_placeholder_1",set:"Walking",name:"Mystery Walk I",emoji:"🚶‍♂️❓",rarity:"common"},{id:"walk_placeholder_2",set:"Walking",name:"Mystery Walk II",emoji:"🚶‍♀️❓",rarity:"common"},{id:"cbs_placeholder_1",set:"CBS",name:"Mystery CBS I",emoji:"🪙❓",rarity:"rare"},{id:"cbs_placeholder_2",set:"CBS",name:"Mystery CBS II",emoji:"🪙❓",rarity:"rare"}]}function Hn(){const t=localStorage.getItem(Hi),n=Ki(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function ot(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Dr(t){return t==="legendary"?"rgba(251,191,36,.95)":t==="epic"?"rgba(147,51,234,.9)":t==="rare"?"rgba(56,189,248,.9)":"rgba(148,163,184,.9)"}function Xi(){const t=qn(),n=Hn();let o=0;return t.forEach(l=>{n[l.id]>0&&(o+=1)}),{collected:o,total:t.length}}function Vi(){const t=qn(),n=Hn();return t.length?`
    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
      gap:8px;
    ">
      ${t.map(l=>{const c=Number(n[l.id]||0),d=Number.isFinite(c)&&c>0,u=Dr(l.rarity),p=d?u:"rgba(31,41,55,.9)",g=d?"radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.95))":"rgba(15,23,42,1)",x=d?l.emoji||"🃏":"❓",h=d?ot(l.name||"Card"):'<span style="opacity:.6;">Unknown card</span>',y=ot(l.set||"Set"),_=d?`<div style="
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
          data-card-id="${ot(l.id)}"
          style="
            position:relative;
            border-radius:14px;
            border:1px solid ${p};
            background:${g};
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
            ${ot(x)}
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
    `}function Zi(){const t=Xi(),{collected:n,total:o}=t,l=`${n}/${o} cards collected`,c=o>0?Math.round(n/o*100):0;return`
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
  `,n.appendChild(o),t.appendChild(n),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateY(0) scale(1)"});const l=()=>{o.style.opacity="0",o.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{t.innerHTML=""},220)},c=document.getElementById("cbsgoCardsCloseBtn");c&&(c.onclick=l),n.addEventListener("click",x=>{x.target===n&&l()});const d=qn(),u=new Map(d.map(x=>[x.id,x]));function p(x){const h=u.get(x);if(!h)return;const y=Hn(),_=Number(y[x]||0),B=Number.isFinite(_)&&_>0,O=B?h.emoji||"🃏":"❓",M=B?h.name||"Card":"Unknown card",I=h.set||"Set",D=h.rarity||"common",X=Dr(D),pe={common:"Common",rare:"Rare",epic:"Epic",legendary:"Legendary"}[D]||"Common",ne=document.createElement("div");ne.style.position="fixed",ne.style.inset="0",ne.style.display="flex",ne.style.alignItems="center",ne.style.justifyContent="center",ne.style.background="rgba(0,0,0,0.65)",ne.style.pointerEvents="auto",ne.style.zIndex="8600";const ce=document.createElement("div");ce.style.width="min(260px, 82vw)",ce.style.borderRadius="20px",ce.style.border=`1px solid ${X}`,ce.style.background="radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,.96))",ce.style.boxShadow="0 28px 90px rgba(0,0,0,.95)",ce.style.padding="16px 14px 14px 14px",ce.style.textAlign="center",ce.style.color="#fff",ce.style.fontFamily="system-ui,sans-serif",ce.style.opacity="0",ce.style.transform="translateY(14px) scale(0.96)",ce.style.transition="opacity .2s ease-out, transform .2s ease-out";const ke=B?`<div style="font-size:11px;opacity:.8;margin-top:4px;">You own <b>x${_}</b></div>`:'<div style="font-size:11px;opacity:.8;margin-top:4px;">Not collected yet.</div>',Be=B?`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Trade or keep walking to complete more cards in this set.
        </div>`:`<div style="font-size:10px;opacity:.75;margin-top:8px;">
          Find this card by walking, opening gifts or later by swapping cards with friends.
        </div>`;ce.innerHTML=`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:6px;
      ">
        <div style="font-size:11px;opacity:.75;text-align:left;">
          ${ot(I)} set
        </div>
        <div style="
          padding:3px 7px;
          border-radius:999px;
          border:1px solid ${X};
          font-size:10px;
        ">
          ${ot(pe)}
        </div>
      </div>

      <div style="
        margin:6px auto 8px auto;
        width:90px;
        height:90px;
        border-radius:18px;
        border:1px solid ${X};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:48px;
        background:rgba(15,23,42,1);
      ">
        ${ot(O)}
      </div>

      <div style="font-size:15px;font-weight:800;margin-top:4px;">
        ${ot(M)}
      </div>

      ${ke}
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
    `,ne.appendChild(ce),document.body.appendChild(ne),requestAnimationFrame(()=>{ce.style.opacity="1",ce.style.transform="translateY(0) scale(1)"});const Te=()=>{ce.style.opacity="0",ce.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{document.body.removeChild(ne)},200)},Ce=ce.querySelector("#cbsgoCardPreviewCloseBtn");Ce&&(Ce.onclick=Te),ne.addEventListener("click",He=>{He.target===ne&&Te()})}o.querySelectorAll(".cbsgoCardTile").forEach(x=>{x.addEventListener("click",()=>{const h=x.getAttribute("data-card-id");h&&p(h)})})}function Ji(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function ea(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var n=t.default;if(typeof n=="function"){var o=function l(){var c=!1;try{c=this instanceof l}catch{}return c?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};o.prototype=n.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(l){var c=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(o,l,c.get?c:{enumerable:!0,get:function(){return t[l]}})}),o}function ta(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var In={exports:{}};const na={},ra=Object.freeze(Object.defineProperty({__proto__:null,default:na},Symbol.toStringTag,{value:"Module"})),oa=ea(ra);var fr;function ia(){return fr||(fr=1,(function(t){(function(n){var o=function(r){var a,i=new Float64Array(16);if(r)for(a=0;a<r.length;a++)i[a]=r[a];return i},l=function(){throw new Error("no PRNG")},c=new Uint8Array(16),d=new Uint8Array(32);d[0]=9;var u=o(),p=o([1]),g=o([56129,1]),x=o([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),h=o([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),y=o([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),_=o([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),B=o([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function O(r,a,i,e){r[a]=i>>24&255,r[a+1]=i>>16&255,r[a+2]=i>>8&255,r[a+3]=i&255,r[a+4]=e>>24&255,r[a+5]=e>>16&255,r[a+6]=e>>8&255,r[a+7]=e&255}function M(r,a,i,e,s){var b,m=0;for(b=0;b<s;b++)m|=r[a+b]^i[e+b];return(1&m-1>>>8)-1}function I(r,a,i,e){return M(r,a,i,e,16)}function D(r,a,i,e){return M(r,a,i,e,32)}function X(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,A=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,N=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,W=b,T=m,R=k,U=A,z=G,w=N,v=ye,E=$,S=V,C=Z,L=oe,H=re,ie=Q,se=ee,ae=J,f,de=0;de<20;de+=2)f=P+H|0,U^=f<<7|f>>>25,f=U+P|0,E^=f<<9|f>>>23,f=E+U|0,H^=f<<13|f>>>19,f=H+E|0,P^=f<<18|f>>>14,f=z+W|0,S^=f<<7|f>>>25,f=S+z|0,ie^=f<<9|f>>>23,f=ie+S|0,W^=f<<13|f>>>19,f=W+ie|0,z^=f<<18|f>>>14,f=C+w|0,se^=f<<7|f>>>25,f=se+C|0,T^=f<<9|f>>>23,f=T+se|0,w^=f<<13|f>>>19,f=w+T|0,C^=f<<18|f>>>14,f=ae+L|0,R^=f<<7|f>>>25,f=R+ae|0,v^=f<<9|f>>>23,f=v+R|0,L^=f<<13|f>>>19,f=L+v|0,ae^=f<<18|f>>>14,f=P+R|0,W^=f<<7|f>>>25,f=W+P|0,T^=f<<9|f>>>23,f=T+W|0,R^=f<<13|f>>>19,f=R+T|0,P^=f<<18|f>>>14,f=z+U|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,U^=f<<13|f>>>19,f=U+v|0,z^=f<<18|f>>>14,f=C+S|0,L^=f<<7|f>>>25,f=L+C|0,E^=f<<9|f>>>23,f=E+L|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=ae+se|0,H^=f<<7|f>>>25,f=H+ae|0,ie^=f<<9|f>>>23,f=ie+H|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;P=P+s|0,W=W+b|0,T=T+m|0,R=R+k|0,U=U+A|0,z=z+G|0,w=w+N|0,v=v+ye|0,E=E+$|0,S=S+V|0,C=C+Z|0,L=L+oe|0,H=H+re|0,ie=ie+Q|0,se=se+ee|0,ae=ae+J|0,r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=W>>>0&255,r[5]=W>>>8&255,r[6]=W>>>16&255,r[7]=W>>>24&255,r[8]=T>>>0&255,r[9]=T>>>8&255,r[10]=T>>>16&255,r[11]=T>>>24&255,r[12]=R>>>0&255,r[13]=R>>>8&255,r[14]=R>>>16&255,r[15]=R>>>24&255,r[16]=U>>>0&255,r[17]=U>>>8&255,r[18]=U>>>16&255,r[19]=U>>>24&255,r[20]=z>>>0&255,r[21]=z>>>8&255,r[22]=z>>>16&255,r[23]=z>>>24&255,r[24]=w>>>0&255,r[25]=w>>>8&255,r[26]=w>>>16&255,r[27]=w>>>24&255,r[28]=v>>>0&255,r[29]=v>>>8&255,r[30]=v>>>16&255,r[31]=v>>>24&255,r[32]=E>>>0&255,r[33]=E>>>8&255,r[34]=E>>>16&255,r[35]=E>>>24&255,r[36]=S>>>0&255,r[37]=S>>>8&255,r[38]=S>>>16&255,r[39]=S>>>24&255,r[40]=C>>>0&255,r[41]=C>>>8&255,r[42]=C>>>16&255,r[43]=C>>>24&255,r[44]=L>>>0&255,r[45]=L>>>8&255,r[46]=L>>>16&255,r[47]=L>>>24&255,r[48]=H>>>0&255,r[49]=H>>>8&255,r[50]=H>>>16&255,r[51]=H>>>24&255,r[52]=ie>>>0&255,r[53]=ie>>>8&255,r[54]=ie>>>16&255,r[55]=ie>>>24&255,r[56]=se>>>0&255,r[57]=se>>>8&255,r[58]=se>>>16&255,r[59]=se>>>24&255,r[60]=ae>>>0&255,r[61]=ae>>>8&255,r[62]=ae>>>16&255,r[63]=ae>>>24&255}function pe(r,a,i,e){for(var s=e[0]&255|(e[1]&255)<<8|(e[2]&255)<<16|(e[3]&255)<<24,b=i[0]&255|(i[1]&255)<<8|(i[2]&255)<<16|(i[3]&255)<<24,m=i[4]&255|(i[5]&255)<<8|(i[6]&255)<<16|(i[7]&255)<<24,k=i[8]&255|(i[9]&255)<<8|(i[10]&255)<<16|(i[11]&255)<<24,A=i[12]&255|(i[13]&255)<<8|(i[14]&255)<<16|(i[15]&255)<<24,G=e[4]&255|(e[5]&255)<<8|(e[6]&255)<<16|(e[7]&255)<<24,N=a[0]&255|(a[1]&255)<<8|(a[2]&255)<<16|(a[3]&255)<<24,ye=a[4]&255|(a[5]&255)<<8|(a[6]&255)<<16|(a[7]&255)<<24,$=a[8]&255|(a[9]&255)<<8|(a[10]&255)<<16|(a[11]&255)<<24,V=a[12]&255|(a[13]&255)<<8|(a[14]&255)<<16|(a[15]&255)<<24,Z=e[8]&255|(e[9]&255)<<8|(e[10]&255)<<16|(e[11]&255)<<24,oe=i[16]&255|(i[17]&255)<<8|(i[18]&255)<<16|(i[19]&255)<<24,re=i[20]&255|(i[21]&255)<<8|(i[22]&255)<<16|(i[23]&255)<<24,Q=i[24]&255|(i[25]&255)<<8|(i[26]&255)<<16|(i[27]&255)<<24,ee=i[28]&255|(i[29]&255)<<8|(i[30]&255)<<16|(i[31]&255)<<24,J=e[12]&255|(e[13]&255)<<8|(e[14]&255)<<16|(e[15]&255)<<24,P=s,W=b,T=m,R=k,U=A,z=G,w=N,v=ye,E=$,S=V,C=Z,L=oe,H=re,ie=Q,se=ee,ae=J,f,de=0;de<20;de+=2)f=P+H|0,U^=f<<7|f>>>25,f=U+P|0,E^=f<<9|f>>>23,f=E+U|0,H^=f<<13|f>>>19,f=H+E|0,P^=f<<18|f>>>14,f=z+W|0,S^=f<<7|f>>>25,f=S+z|0,ie^=f<<9|f>>>23,f=ie+S|0,W^=f<<13|f>>>19,f=W+ie|0,z^=f<<18|f>>>14,f=C+w|0,se^=f<<7|f>>>25,f=se+C|0,T^=f<<9|f>>>23,f=T+se|0,w^=f<<13|f>>>19,f=w+T|0,C^=f<<18|f>>>14,f=ae+L|0,R^=f<<7|f>>>25,f=R+ae|0,v^=f<<9|f>>>23,f=v+R|0,L^=f<<13|f>>>19,f=L+v|0,ae^=f<<18|f>>>14,f=P+R|0,W^=f<<7|f>>>25,f=W+P|0,T^=f<<9|f>>>23,f=T+W|0,R^=f<<13|f>>>19,f=R+T|0,P^=f<<18|f>>>14,f=z+U|0,w^=f<<7|f>>>25,f=w+z|0,v^=f<<9|f>>>23,f=v+w|0,U^=f<<13|f>>>19,f=U+v|0,z^=f<<18|f>>>14,f=C+S|0,L^=f<<7|f>>>25,f=L+C|0,E^=f<<9|f>>>23,f=E+L|0,S^=f<<13|f>>>19,f=S+E|0,C^=f<<18|f>>>14,f=ae+se|0,H^=f<<7|f>>>25,f=H+ae|0,ie^=f<<9|f>>>23,f=ie+H|0,se^=f<<13|f>>>19,f=se+ie|0,ae^=f<<18|f>>>14;r[0]=P>>>0&255,r[1]=P>>>8&255,r[2]=P>>>16&255,r[3]=P>>>24&255,r[4]=z>>>0&255,r[5]=z>>>8&255,r[6]=z>>>16&255,r[7]=z>>>24&255,r[8]=C>>>0&255,r[9]=C>>>8&255,r[10]=C>>>16&255,r[11]=C>>>24&255,r[12]=ae>>>0&255,r[13]=ae>>>8&255,r[14]=ae>>>16&255,r[15]=ae>>>24&255,r[16]=w>>>0&255,r[17]=w>>>8&255,r[18]=w>>>16&255,r[19]=w>>>24&255,r[20]=v>>>0&255,r[21]=v>>>8&255,r[22]=v>>>16&255,r[23]=v>>>24&255,r[24]=E>>>0&255,r[25]=E>>>8&255,r[26]=E>>>16&255,r[27]=E>>>24&255,r[28]=S>>>0&255,r[29]=S>>>8&255,r[30]=S>>>16&255,r[31]=S>>>24&255}function ne(r,a,i,e){X(r,a,i,e)}function ce(r,a,i,e){pe(r,a,i,e)}var ke=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function Be(r,a,i,e,s,b,m){var k=new Uint8Array(16),A=new Uint8Array(64),G,N;for(N=0;N<16;N++)k[N]=0;for(N=0;N<8;N++)k[N]=b[N];for(;s>=64;){for(ne(A,k,m,ke),N=0;N<64;N++)r[a+N]=i[e+N]^A[N];for(G=1,N=8;N<16;N++)G=G+(k[N]&255)|0,k[N]=G&255,G>>>=8;s-=64,a+=64,e+=64}if(s>0)for(ne(A,k,m,ke),N=0;N<s;N++)r[a+N]=i[e+N]^A[N];return 0}function Te(r,a,i,e,s){var b=new Uint8Array(16),m=new Uint8Array(64),k,A;for(A=0;A<16;A++)b[A]=0;for(A=0;A<8;A++)b[A]=e[A];for(;i>=64;){for(ne(m,b,s,ke),A=0;A<64;A++)r[a+A]=m[A];for(k=1,A=8;A<16;A++)k=k+(b[A]&255)|0,b[A]=k&255,k>>>=8;i-=64,a+=64}if(i>0)for(ne(m,b,s,ke),A=0;A<i;A++)r[a+A]=m[A];return 0}function Ce(r,a,i,e,s){var b=new Uint8Array(32);ce(b,e,s,ke);for(var m=new Uint8Array(8),k=0;k<8;k++)m[k]=e[k+16];return Te(r,a,i,m,b)}function He(r,a,i,e,s,b,m){var k=new Uint8Array(32);ce(k,b,m,ke);for(var A=new Uint8Array(8),G=0;G<8;G++)A[G]=b[G+16];return Be(r,a,i,e,s,A,k)}var at=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var a,i,e,s,b,m,k,A;a=r[0]&255|(r[1]&255)<<8,this.r[0]=a&8191,i=r[2]&255|(r[3]&255)<<8,this.r[1]=(a>>>13|i<<3)&8191,e=r[4]&255|(r[5]&255)<<8,this.r[2]=(i>>>10|e<<6)&7939,s=r[6]&255|(r[7]&255)<<8,this.r[3]=(e>>>7|s<<9)&8191,b=r[8]&255|(r[9]&255)<<8,this.r[4]=(s>>>4|b<<12)&255,this.r[5]=b>>>1&8190,m=r[10]&255|(r[11]&255)<<8,this.r[6]=(b>>>14|m<<2)&8191,k=r[12]&255|(r[13]&255)<<8,this.r[7]=(m>>>11|k<<5)&8065,A=r[14]&255|(r[15]&255)<<8,this.r[8]=(k>>>8|A<<8)&8191,this.r[9]=A>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};at.prototype.blocks=function(r,a,i){for(var e=this.fin?0:2048,s,b,m,k,A,G,N,ye,$,V,Z,oe,re,Q,ee,J,P,W,T,R=this.h[0],U=this.h[1],z=this.h[2],w=this.h[3],v=this.h[4],E=this.h[5],S=this.h[6],C=this.h[7],L=this.h[8],H=this.h[9],ie=this.r[0],se=this.r[1],ae=this.r[2],f=this.r[3],de=this.r[4],ge=this.r[5],be=this.r[6],le=this.r[7],ue=this.r[8],xe=this.r[9];i>=16;)s=r[a+0]&255|(r[a+1]&255)<<8,R+=s&8191,b=r[a+2]&255|(r[a+3]&255)<<8,U+=(s>>>13|b<<3)&8191,m=r[a+4]&255|(r[a+5]&255)<<8,z+=(b>>>10|m<<6)&8191,k=r[a+6]&255|(r[a+7]&255)<<8,w+=(m>>>7|k<<9)&8191,A=r[a+8]&255|(r[a+9]&255)<<8,v+=(k>>>4|A<<12)&8191,E+=A>>>1&8191,G=r[a+10]&255|(r[a+11]&255)<<8,S+=(A>>>14|G<<2)&8191,N=r[a+12]&255|(r[a+13]&255)<<8,C+=(G>>>11|N<<5)&8191,ye=r[a+14]&255|(r[a+15]&255)<<8,L+=(N>>>8|ye<<8)&8191,H+=ye>>>5|e,$=0,V=$,V+=R*ie,V+=U*(5*xe),V+=z*(5*ue),V+=w*(5*le),V+=v*(5*be),$=V>>>13,V&=8191,V+=E*(5*ge),V+=S*(5*de),V+=C*(5*f),V+=L*(5*ae),V+=H*(5*se),$+=V>>>13,V&=8191,Z=$,Z+=R*se,Z+=U*ie,Z+=z*(5*xe),Z+=w*(5*ue),Z+=v*(5*le),$=Z>>>13,Z&=8191,Z+=E*(5*be),Z+=S*(5*ge),Z+=C*(5*de),Z+=L*(5*f),Z+=H*(5*ae),$+=Z>>>13,Z&=8191,oe=$,oe+=R*ae,oe+=U*se,oe+=z*ie,oe+=w*(5*xe),oe+=v*(5*ue),$=oe>>>13,oe&=8191,oe+=E*(5*le),oe+=S*(5*be),oe+=C*(5*ge),oe+=L*(5*de),oe+=H*(5*f),$+=oe>>>13,oe&=8191,re=$,re+=R*f,re+=U*ae,re+=z*se,re+=w*ie,re+=v*(5*xe),$=re>>>13,re&=8191,re+=E*(5*ue),re+=S*(5*le),re+=C*(5*be),re+=L*(5*ge),re+=H*(5*de),$+=re>>>13,re&=8191,Q=$,Q+=R*de,Q+=U*f,Q+=z*ae,Q+=w*se,Q+=v*ie,$=Q>>>13,Q&=8191,Q+=E*(5*xe),Q+=S*(5*ue),Q+=C*(5*le),Q+=L*(5*be),Q+=H*(5*ge),$+=Q>>>13,Q&=8191,ee=$,ee+=R*ge,ee+=U*de,ee+=z*f,ee+=w*ae,ee+=v*se,$=ee>>>13,ee&=8191,ee+=E*ie,ee+=S*(5*xe),ee+=C*(5*ue),ee+=L*(5*le),ee+=H*(5*be),$+=ee>>>13,ee&=8191,J=$,J+=R*be,J+=U*ge,J+=z*de,J+=w*f,J+=v*ae,$=J>>>13,J&=8191,J+=E*se,J+=S*ie,J+=C*(5*xe),J+=L*(5*ue),J+=H*(5*le),$+=J>>>13,J&=8191,P=$,P+=R*le,P+=U*be,P+=z*ge,P+=w*de,P+=v*f,$=P>>>13,P&=8191,P+=E*ae,P+=S*se,P+=C*ie,P+=L*(5*xe),P+=H*(5*ue),$+=P>>>13,P&=8191,W=$,W+=R*ue,W+=U*le,W+=z*be,W+=w*ge,W+=v*de,$=W>>>13,W&=8191,W+=E*f,W+=S*ae,W+=C*se,W+=L*ie,W+=H*(5*xe),$+=W>>>13,W&=8191,T=$,T+=R*xe,T+=U*ue,T+=z*le,T+=w*be,T+=v*ge,$=T>>>13,T&=8191,T+=E*de,T+=S*f,T+=C*ae,T+=L*se,T+=H*ie,$+=T>>>13,T&=8191,$=($<<2)+$|0,$=$+V|0,V=$&8191,$=$>>>13,Z+=$,R=V,U=Z,z=oe,w=re,v=Q,E=ee,S=J,C=P,L=W,H=T,a+=16,i-=16;this.h[0]=R,this.h[1]=U,this.h[2]=z,this.h[3]=w,this.h[4]=v,this.h[5]=E,this.h[6]=S,this.h[7]=C,this.h[8]=L,this.h[9]=H},at.prototype.finish=function(r,a){var i=new Uint16Array(10),e,s,b,m;if(this.leftover){for(m=this.leftover,this.buffer[m++]=1;m<16;m++)this.buffer[m]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(e=this.h[1]>>>13,this.h[1]&=8191,m=2;m<10;m++)this.h[m]+=e,e=this.h[m]>>>13,this.h[m]&=8191;for(this.h[0]+=e*5,e=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=e,e=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=e,i[0]=this.h[0]+5,e=i[0]>>>13,i[0]&=8191,m=1;m<10;m++)i[m]=this.h[m]+e,e=i[m]>>>13,i[m]&=8191;for(i[9]-=8192,s=(e^1)-1,m=0;m<10;m++)i[m]&=s;for(s=~s,m=0;m<10;m++)this.h[m]=this.h[m]&s|i[m];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,b=this.h[0]+this.pad[0],this.h[0]=b&65535,m=1;m<8;m++)b=(this.h[m]+this.pad[m]|0)+(b>>>16)|0,this.h[m]=b&65535;r[a+0]=this.h[0]>>>0&255,r[a+1]=this.h[0]>>>8&255,r[a+2]=this.h[1]>>>0&255,r[a+3]=this.h[1]>>>8&255,r[a+4]=this.h[2]>>>0&255,r[a+5]=this.h[2]>>>8&255,r[a+6]=this.h[3]>>>0&255,r[a+7]=this.h[3]>>>8&255,r[a+8]=this.h[4]>>>0&255,r[a+9]=this.h[4]>>>8&255,r[a+10]=this.h[5]>>>0&255,r[a+11]=this.h[5]>>>8&255,r[a+12]=this.h[6]>>>0&255,r[a+13]=this.h[6]>>>8&255,r[a+14]=this.h[7]>>>0&255,r[a+15]=this.h[7]>>>8&255},at.prototype.update=function(r,a,i){var e,s;if(this.leftover){for(s=16-this.leftover,s>i&&(s=i),e=0;e<s;e++)this.buffer[this.leftover+e]=r[a+e];if(i-=s,a+=s,this.leftover+=s,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(i>=16&&(s=i-i%16,this.blocks(r,a,s),a+=s,i-=s),i){for(e=0;e<i;e++)this.buffer[this.leftover+e]=r[a+e];this.leftover+=i}};function Bt(r,a,i,e,s,b){var m=new at(b);return m.update(i,e,s),m.finish(r,a),0}function st(r,a,i,e,s,b){var m=new Uint8Array(16);return Bt(m,0,i,e,s,b),I(r,a,m,0)}function Oe(r,a,i,e,s){var b;if(i<32)return-1;for(He(r,0,a,0,i,e,s),Bt(r,16,r,32,i-32,r),b=0;b<16;b++)r[b]=0;return 0}function ut(r,a,i,e,s){var b,m=new Uint8Array(32);if(i<32||(Ce(m,0,32,e,s),st(a,16,a,32,i-32,m)!==0))return-1;for(He(r,0,a,0,i,e,s),b=0;b<32;b++)r[b]=0;return 0}function Ge(r,a){var i;for(i=0;i<16;i++)r[i]=a[i]|0}function xt(r){var a,i,e=1;for(a=0;a<16;a++)i=r[a]+e+65535,e=Math.floor(i/65536),r[a]=i-e*65536;r[0]+=e-1+37*(e-1)}function Ke(r,a,i){for(var e,s=~(i-1),b=0;b<16;b++)e=s&(r[b]^a[b]),r[b]^=e,a[b]^=e}function et(r,a){var i,e,s,b=o(),m=o();for(i=0;i<16;i++)m[i]=a[i];for(xt(m),xt(m),xt(m),e=0;e<2;e++){for(b[0]=m[0]-65517,i=1;i<15;i++)b[i]=m[i]-65535-(b[i-1]>>16&1),b[i-1]&=65535;b[15]=m[15]-32767-(b[14]>>16&1),s=b[15]>>16&1,b[14]&=65535,Ke(m,b,1-s)}for(i=0;i<16;i++)r[2*i]=m[i]&255,r[2*i+1]=m[i]>>8}function zt(r,a){var i=new Uint8Array(32),e=new Uint8Array(32);return et(i,r),et(e,a),D(i,0,e,0)}function yt(r){var a=new Uint8Array(32);return et(a,r),a[0]&1}function Xe(r,a){var i;for(i=0;i<16;i++)r[i]=a[2*i]+(a[2*i+1]<<8);r[15]&=32767}function je(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]+i[e]}function Re(r,a,i){for(var e=0;e<16;e++)r[e]=a[e]-i[e]}function fe(r,a,i){var e,s,b=0,m=0,k=0,A=0,G=0,N=0,ye=0,$=0,V=0,Z=0,oe=0,re=0,Q=0,ee=0,J=0,P=0,W=0,T=0,R=0,U=0,z=0,w=0,v=0,E=0,S=0,C=0,L=0,H=0,ie=0,se=0,ae=0,f=i[0],de=i[1],ge=i[2],be=i[3],le=i[4],ue=i[5],xe=i[6],Se=i[7],he=i[8],we=i[9],ve=i[10],_e=i[11],Le=i[12],ze=i[13],Ne=i[14],Ie=i[15];e=a[0],b+=e*f,m+=e*de,k+=e*ge,A+=e*be,G+=e*le,N+=e*ue,ye+=e*xe,$+=e*Se,V+=e*he,Z+=e*we,oe+=e*ve,re+=e*_e,Q+=e*Le,ee+=e*ze,J+=e*Ne,P+=e*Ie,e=a[1],m+=e*f,k+=e*de,A+=e*ge,G+=e*be,N+=e*le,ye+=e*ue,$+=e*xe,V+=e*Se,Z+=e*he,oe+=e*we,re+=e*ve,Q+=e*_e,ee+=e*Le,J+=e*ze,P+=e*Ne,W+=e*Ie,e=a[2],k+=e*f,A+=e*de,G+=e*ge,N+=e*be,ye+=e*le,$+=e*ue,V+=e*xe,Z+=e*Se,oe+=e*he,re+=e*we,Q+=e*ve,ee+=e*_e,J+=e*Le,P+=e*ze,W+=e*Ne,T+=e*Ie,e=a[3],A+=e*f,G+=e*de,N+=e*ge,ye+=e*be,$+=e*le,V+=e*ue,Z+=e*xe,oe+=e*Se,re+=e*he,Q+=e*we,ee+=e*ve,J+=e*_e,P+=e*Le,W+=e*ze,T+=e*Ne,R+=e*Ie,e=a[4],G+=e*f,N+=e*de,ye+=e*ge,$+=e*be,V+=e*le,Z+=e*ue,oe+=e*xe,re+=e*Se,Q+=e*he,ee+=e*we,J+=e*ve,P+=e*_e,W+=e*Le,T+=e*ze,R+=e*Ne,U+=e*Ie,e=a[5],N+=e*f,ye+=e*de,$+=e*ge,V+=e*be,Z+=e*le,oe+=e*ue,re+=e*xe,Q+=e*Se,ee+=e*he,J+=e*we,P+=e*ve,W+=e*_e,T+=e*Le,R+=e*ze,U+=e*Ne,z+=e*Ie,e=a[6],ye+=e*f,$+=e*de,V+=e*ge,Z+=e*be,oe+=e*le,re+=e*ue,Q+=e*xe,ee+=e*Se,J+=e*he,P+=e*we,W+=e*ve,T+=e*_e,R+=e*Le,U+=e*ze,z+=e*Ne,w+=e*Ie,e=a[7],$+=e*f,V+=e*de,Z+=e*ge,oe+=e*be,re+=e*le,Q+=e*ue,ee+=e*xe,J+=e*Se,P+=e*he,W+=e*we,T+=e*ve,R+=e*_e,U+=e*Le,z+=e*ze,w+=e*Ne,v+=e*Ie,e=a[8],V+=e*f,Z+=e*de,oe+=e*ge,re+=e*be,Q+=e*le,ee+=e*ue,J+=e*xe,P+=e*Se,W+=e*he,T+=e*we,R+=e*ve,U+=e*_e,z+=e*Le,w+=e*ze,v+=e*Ne,E+=e*Ie,e=a[9],Z+=e*f,oe+=e*de,re+=e*ge,Q+=e*be,ee+=e*le,J+=e*ue,P+=e*xe,W+=e*Se,T+=e*he,R+=e*we,U+=e*ve,z+=e*_e,w+=e*Le,v+=e*ze,E+=e*Ne,S+=e*Ie,e=a[10],oe+=e*f,re+=e*de,Q+=e*ge,ee+=e*be,J+=e*le,P+=e*ue,W+=e*xe,T+=e*Se,R+=e*he,U+=e*we,z+=e*ve,w+=e*_e,v+=e*Le,E+=e*ze,S+=e*Ne,C+=e*Ie,e=a[11],re+=e*f,Q+=e*de,ee+=e*ge,J+=e*be,P+=e*le,W+=e*ue,T+=e*xe,R+=e*Se,U+=e*he,z+=e*we,w+=e*ve,v+=e*_e,E+=e*Le,S+=e*ze,C+=e*Ne,L+=e*Ie,e=a[12],Q+=e*f,ee+=e*de,J+=e*ge,P+=e*be,W+=e*le,T+=e*ue,R+=e*xe,U+=e*Se,z+=e*he,w+=e*we,v+=e*ve,E+=e*_e,S+=e*Le,C+=e*ze,L+=e*Ne,H+=e*Ie,e=a[13],ee+=e*f,J+=e*de,P+=e*ge,W+=e*be,T+=e*le,R+=e*ue,U+=e*xe,z+=e*Se,w+=e*he,v+=e*we,E+=e*ve,S+=e*_e,C+=e*Le,L+=e*ze,H+=e*Ne,ie+=e*Ie,e=a[14],J+=e*f,P+=e*de,W+=e*ge,T+=e*be,R+=e*le,U+=e*ue,z+=e*xe,w+=e*Se,v+=e*he,E+=e*we,S+=e*ve,C+=e*_e,L+=e*Le,H+=e*ze,ie+=e*Ne,se+=e*Ie,e=a[15],P+=e*f,W+=e*de,T+=e*ge,R+=e*be,U+=e*le,z+=e*ue,w+=e*xe,v+=e*Se,E+=e*he,S+=e*we,C+=e*ve,L+=e*_e,H+=e*Le,ie+=e*ze,se+=e*Ne,ae+=e*Ie,b+=38*W,m+=38*T,k+=38*R,A+=38*U,G+=38*z,N+=38*w,ye+=38*v,$+=38*E,V+=38*S,Z+=38*C,oe+=38*L,re+=38*H,Q+=38*ie,ee+=38*se,J+=38*ae,s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=A+s+65535,s=Math.floor(e/65536),A=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=N+s+65535,s=Math.floor(e/65536),N=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,b+=s-1+37*(s-1),s=1,e=b+s+65535,s=Math.floor(e/65536),b=e-s*65536,e=m+s+65535,s=Math.floor(e/65536),m=e-s*65536,e=k+s+65535,s=Math.floor(e/65536),k=e-s*65536,e=A+s+65535,s=Math.floor(e/65536),A=e-s*65536,e=G+s+65535,s=Math.floor(e/65536),G=e-s*65536,e=N+s+65535,s=Math.floor(e/65536),N=e-s*65536,e=ye+s+65535,s=Math.floor(e/65536),ye=e-s*65536,e=$+s+65535,s=Math.floor(e/65536),$=e-s*65536,e=V+s+65535,s=Math.floor(e/65536),V=e-s*65536,e=Z+s+65535,s=Math.floor(e/65536),Z=e-s*65536,e=oe+s+65535,s=Math.floor(e/65536),oe=e-s*65536,e=re+s+65535,s=Math.floor(e/65536),re=e-s*65536,e=Q+s+65535,s=Math.floor(e/65536),Q=e-s*65536,e=ee+s+65535,s=Math.floor(e/65536),ee=e-s*65536,e=J+s+65535,s=Math.floor(e/65536),J=e-s*65536,e=P+s+65535,s=Math.floor(e/65536),P=e-s*65536,b+=s-1+37*(s-1),r[0]=b,r[1]=m,r[2]=k,r[3]=A,r[4]=G,r[5]=N,r[6]=ye,r[7]=$,r[8]=V,r[9]=Z,r[10]=oe,r[11]=re,r[12]=Q,r[13]=ee,r[14]=J,r[15]=P}function F(r,a){fe(r,a,a)}function Y(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=253;e>=0;e--)F(i,i),e!==2&&e!==4&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function q(r,a){var i=o(),e;for(e=0;e<16;e++)i[e]=a[e];for(e=250;e>=0;e--)F(i,i),e!==1&&fe(i,i,a);for(e=0;e<16;e++)r[e]=i[e]}function j(r,a,i){var e=new Uint8Array(32),s=new Float64Array(80),b,m,k=o(),A=o(),G=o(),N=o(),ye=o(),$=o();for(m=0;m<31;m++)e[m]=a[m];for(e[31]=a[31]&127|64,e[0]&=248,Xe(s,i),m=0;m<16;m++)A[m]=s[m],N[m]=k[m]=G[m]=0;for(k[0]=N[0]=1,m=254;m>=0;--m)b=e[m>>>3]>>>(m&7)&1,Ke(k,A,b),Ke(G,N,b),je(ye,k,G),Re(k,k,G),je(G,A,N),Re(A,A,N),F(N,ye),F($,k),fe(k,G,k),fe(G,A,ye),je(ye,k,G),Re(k,k,G),F(A,k),Re(G,N,$),fe(k,G,g),je(k,k,N),fe(G,G,k),fe(k,N,$),fe(N,A,s),F(A,ye),Ke(k,A,b),Ke(G,N,b);for(m=0;m<16;m++)s[m+16]=k[m],s[m+32]=G[m],s[m+48]=A[m],s[m+64]=N[m];var V=s.subarray(32),Z=s.subarray(16);return Y(V,V),fe(Z,Z,V),et(r,Z),0}function te(r,a){return j(r,a,d)}function me(r,a){return l(a,32),te(r,a)}function Ee(r,a,i){var e=new Uint8Array(32);return j(e,i,a),ce(r,c,e,ke)}var Me=Oe,gt=ut;function gn(r,a,i,e,s,b){var m=new Uint8Array(32);return Ee(m,s,b),Me(r,a,i,e,m)}function Ye(r,a,i,e,s,b){var m=new Uint8Array(32);return Ee(m,s,b),gt(r,a,i,e,m)}var tt=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Zn(r,a,i,e){for(var s=new Int32Array(16),b=new Int32Array(16),m,k,A,G,N,ye,$,V,Z,oe,re,Q,ee,J,P,W,T,R,U,z,w,v,E,S,C,L,H=r[0],ie=r[1],se=r[2],ae=r[3],f=r[4],de=r[5],ge=r[6],be=r[7],le=a[0],ue=a[1],xe=a[2],Se=a[3],he=a[4],we=a[5],ve=a[6],_e=a[7],Le=0;e>=128;){for(U=0;U<16;U++)z=8*U+Le,s[U]=i[z+0]<<24|i[z+1]<<16|i[z+2]<<8|i[z+3],b[U]=i[z+4]<<24|i[z+5]<<16|i[z+6]<<8|i[z+7];for(U=0;U<80;U++)if(m=H,k=ie,A=se,G=ae,N=f,ye=de,$=ge,V=be,Z=le,oe=ue,re=xe,Q=Se,ee=he,J=we,P=ve,W=_e,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=(f>>>14|he<<18)^(f>>>18|he<<14)^(he>>>9|f<<23),v=(he>>>14|f<<18)^(he>>>18|f<<14)^(f>>>9|he<<23),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=f&de^~f&ge,v=he&we^~he&ve,E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=tt[U*2],v=tt[U*2+1],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=s[U%16],v=b[U%16],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,T=C&65535|L<<16,R=E&65535|S<<16,w=T,v=R,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=(H>>>28|le<<4)^(le>>>2|H<<30)^(le>>>7|H<<25),v=(le>>>28|H<<4)^(H>>>2|le<<30)^(H>>>7|le<<25),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,w=H&ie^H&se^ie&se,v=le&ue^le&xe^ue&xe,E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,V=C&65535|L<<16,W=E&65535|S<<16,w=G,v=Q,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=T,v=R,E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,G=C&65535|L<<16,Q=E&65535|S<<16,ie=m,se=k,ae=A,f=G,de=N,ge=ye,be=$,H=V,ue=Z,xe=oe,Se=re,he=Q,we=ee,ve=J,_e=P,le=W,U%16===15)for(z=0;z<16;z++)w=s[z],v=b[z],E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=s[(z+9)%16],v=b[(z+9)%16],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,T=s[(z+1)%16],R=b[(z+1)%16],w=(T>>>1|R<<31)^(T>>>8|R<<24)^T>>>7,v=(R>>>1|T<<31)^(R>>>8|T<<24)^(R>>>7|T<<25),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,T=s[(z+14)%16],R=b[(z+14)%16],w=(T>>>19|R<<13)^(R>>>29|T<<3)^T>>>6,v=(R>>>19|T<<13)^(T>>>29|R<<3)^(R>>>6|T<<26),E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,s[z]=C&65535|L<<16,b[z]=E&65535|S<<16;w=H,v=le,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[0],v=a[0],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[0]=H=C&65535|L<<16,a[0]=le=E&65535|S<<16,w=ie,v=ue,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[1],v=a[1],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[1]=ie=C&65535|L<<16,a[1]=ue=E&65535|S<<16,w=se,v=xe,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[2],v=a[2],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[2]=se=C&65535|L<<16,a[2]=xe=E&65535|S<<16,w=ae,v=Se,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[3],v=a[3],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[3]=ae=C&65535|L<<16,a[3]=Se=E&65535|S<<16,w=f,v=he,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[4],v=a[4],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[4]=f=C&65535|L<<16,a[4]=he=E&65535|S<<16,w=de,v=we,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[5],v=a[5],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[5]=de=C&65535|L<<16,a[5]=we=E&65535|S<<16,w=ge,v=ve,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[6],v=a[6],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[6]=ge=C&65535|L<<16,a[6]=ve=E&65535|S<<16,w=be,v=_e,E=v&65535,S=v>>>16,C=w&65535,L=w>>>16,w=r[7],v=a[7],E+=v&65535,S+=v>>>16,C+=w&65535,L+=w>>>16,S+=E>>>16,C+=S>>>16,L+=C>>>16,r[7]=be=C&65535|L<<16,a[7]=_e=E&65535|S<<16,Le+=128,e-=128}return e}function lt(r,a,i){var e=new Int32Array(8),s=new Int32Array(8),b=new Uint8Array(256),m,k=i;for(e[0]=1779033703,e[1]=3144134277,e[2]=1013904242,e[3]=2773480762,e[4]=1359893119,e[5]=2600822924,e[6]=528734635,e[7]=1541459225,s[0]=4089235720,s[1]=2227873595,s[2]=4271175723,s[3]=1595750129,s[4]=2917565137,s[5]=725511199,s[6]=4215389547,s[7]=327033209,Zn(e,s,a,i),i%=128,m=0;m<i;m++)b[m]=a[k-i+m];for(b[i]=128,i=256-128*(i<112?1:0),b[i-9]=0,O(b,i-8,k/536870912|0,k<<3),Zn(e,s,b,i),m=0;m<8;m++)O(r,8*m,e[m],s[m]);return 0}function Ht(r,a){var i=o(),e=o(),s=o(),b=o(),m=o(),k=o(),A=o(),G=o(),N=o();Re(i,r[1],r[0]),Re(N,a[1],a[0]),fe(i,i,N),je(e,r[0],r[1]),je(N,a[0],a[1]),fe(e,e,N),fe(s,r[3],a[3]),fe(s,s,h),fe(b,r[2],a[2]),je(b,b,b),Re(m,e,i),Re(k,b,s),je(A,b,s),je(G,e,i),fe(r[0],m,k),fe(r[1],G,A),fe(r[2],A,k),fe(r[3],m,G)}function Qn(r,a,i){var e;for(e=0;e<4;e++)Ke(r[e],a[e],i)}function bn(r,a){var i=o(),e=o(),s=o();Y(s,a[2]),fe(i,a[0],s),fe(e,a[1],s),et(r,e),r[31]^=yt(i)<<7}function hn(r,a,i){var e,s;for(Ge(r[0],u),Ge(r[1],p),Ge(r[2],p),Ge(r[3],u),s=255;s>=0;--s)e=i[s/8|0]>>(s&7)&1,Qn(r,a,e),Ht(a,r),Ht(r,r),Qn(r,a,e)}function Kt(r,a){var i=[o(),o(),o(),o()];Ge(i[0],y),Ge(i[1],_),Ge(i[2],p),fe(i[3],y,_),hn(r,i,a)}function mn(r,a,i){var e=new Uint8Array(64),s=[o(),o(),o(),o()],b;for(i||l(a,32),lt(e,a,32),e[0]&=248,e[31]&=127,e[31]|=64,Kt(s,e),bn(r,s),b=0;b<32;b++)a[b+32]=r[b];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function wn(r,a){var i,e,s,b;for(e=63;e>=32;--e){for(i=0,s=e-32,b=e-12;s<b;++s)a[s]+=i-16*a[e]*Xt[s-(e-32)],i=Math.floor((a[s]+128)/256),a[s]-=i*256;a[s]+=i,a[e]=0}for(i=0,s=0;s<32;s++)a[s]+=i-(a[31]>>4)*Xt[s],i=a[s]>>8,a[s]&=255;for(s=0;s<32;s++)a[s]-=i*Xt[s];for(e=0;e<32;e++)a[e+1]+=a[e]>>8,r[e]=a[e]&255}function vn(r){var a=new Float64Array(64),i;for(i=0;i<64;i++)a[i]=r[i];for(i=0;i<64;i++)r[i]=0;wn(r,a)}function Jn(r,a,i,e){var s=new Uint8Array(64),b=new Uint8Array(64),m=new Uint8Array(64),k,A,G=new Float64Array(64),N=[o(),o(),o(),o()];lt(s,e,32),s[0]&=248,s[31]&=127,s[31]|=64;var ye=i+64;for(k=0;k<i;k++)r[64+k]=a[k];for(k=0;k<32;k++)r[32+k]=s[32+k];for(lt(m,r.subarray(32),i+32),vn(m),Kt(N,m),bn(r,N),k=32;k<64;k++)r[k]=e[k];for(lt(b,r,i+64),vn(b),k=0;k<64;k++)G[k]=0;for(k=0;k<32;k++)G[k]=m[k];for(k=0;k<32;k++)for(A=0;A<32;A++)G[k+A]+=b[k]*s[A];return wn(r.subarray(32),G),ye}function io(r,a){var i=o(),e=o(),s=o(),b=o(),m=o(),k=o(),A=o();return Ge(r[2],p),Xe(r[1],a),F(s,r[1]),fe(b,s,x),Re(s,s,r[2]),je(b,r[2],b),F(m,b),F(k,m),fe(A,k,m),fe(i,A,s),fe(i,i,b),q(i,i),fe(i,i,s),fe(i,i,b),fe(i,i,b),fe(r[0],i,b),F(e,r[0]),fe(e,e,b),zt(e,s)&&fe(r[0],r[0],B),F(e,r[0]),fe(e,e,b),zt(e,s)?-1:(yt(r[0])===a[31]>>7&&Re(r[0],u,r[0]),fe(r[3],r[0],r[1]),0)}function _n(r,a,i,e){var s,b=new Uint8Array(32),m=new Uint8Array(64),k=[o(),o(),o(),o()],A=[o(),o(),o(),o()];if(i<64||io(A,e))return-1;for(s=0;s<i;s++)r[s]=a[s];for(s=0;s<32;s++)r[s+32]=e[s];if(lt(m,r,i),vn(m),hn(k,A,m),Kt(A,a.subarray(32)),Ht(k,A),bn(b,k),i-=64,D(a,0,b,0)){for(s=0;s<i;s++)r[s]=0;return-1}for(s=0;s<i;s++)r[s]=a[s+64];return i}var Sn=32,Vt=24,Nt=32,bt=16,It=32,Zt=32,Tt=32,$t=32,kn=32,er=Vt,ao=Nt,so=bt,Ve=64,ct=32,ht=64,Cn=32,En=64;n.lowlevel={crypto_core_hsalsa20:ce,crypto_stream_xor:He,crypto_stream:Ce,crypto_stream_salsa20_xor:Be,crypto_stream_salsa20:Te,crypto_onetimeauth:Bt,crypto_onetimeauth_verify:st,crypto_verify_16:I,crypto_verify_32:D,crypto_secretbox:Oe,crypto_secretbox_open:ut,crypto_scalarmult:j,crypto_scalarmult_base:te,crypto_box_beforenm:Ee,crypto_box_afternm:Me,crypto_box:gn,crypto_box_open:Ye,crypto_box_keypair:me,crypto_hash:lt,crypto_sign:Jn,crypto_sign_keypair:mn,crypto_sign_open:_n,crypto_secretbox_KEYBYTES:Sn,crypto_secretbox_NONCEBYTES:Vt,crypto_secretbox_ZEROBYTES:Nt,crypto_secretbox_BOXZEROBYTES:bt,crypto_scalarmult_BYTES:It,crypto_scalarmult_SCALARBYTES:Zt,crypto_box_PUBLICKEYBYTES:Tt,crypto_box_SECRETKEYBYTES:$t,crypto_box_BEFORENMBYTES:kn,crypto_box_NONCEBYTES:er,crypto_box_ZEROBYTES:ao,crypto_box_BOXZEROBYTES:so,crypto_sign_BYTES:Ve,crypto_sign_PUBLICKEYBYTES:ct,crypto_sign_SECRETKEYBYTES:ht,crypto_sign_SEEDBYTES:Cn,crypto_hash_BYTES:En,gf:o,D:x,L:Xt,pack25519:et,unpack25519:Xe,M:fe,A:je,S:F,Z:Re,pow2523:q,add:Ht,set25519:Ge,modL:wn,scalarmult:hn,scalarbase:Kt};function tr(r,a){if(r.length!==Sn)throw new Error("bad key size");if(a.length!==Vt)throw new Error("bad nonce size")}function lo(r,a){if(r.length!==Tt)throw new Error("bad public key size");if(a.length!==$t)throw new Error("bad secret key size")}function Ue(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function nr(r){for(var a=0;a<r.length;a++)r[a]=0}n.randomBytes=function(r){var a=new Uint8Array(r);return l(a,r),a},n.secretbox=function(r,a,i){Ue(r,a,i),tr(i,a);for(var e=new Uint8Array(Nt+r.length),s=new Uint8Array(e.length),b=0;b<r.length;b++)e[b+Nt]=r[b];return Oe(s,e,e.length,a,i),s.subarray(bt)},n.secretbox.open=function(r,a,i){Ue(r,a,i),tr(i,a);for(var e=new Uint8Array(bt+r.length),s=new Uint8Array(e.length),b=0;b<r.length;b++)e[b+bt]=r[b];return e.length<32||ut(s,e,e.length,a,i)!==0?null:s.subarray(Nt)},n.secretbox.keyLength=Sn,n.secretbox.nonceLength=Vt,n.secretbox.overheadLength=bt,n.scalarMult=function(r,a){if(Ue(r,a),r.length!==Zt)throw new Error("bad n size");if(a.length!==It)throw new Error("bad p size");var i=new Uint8Array(It);return j(i,r,a),i},n.scalarMult.base=function(r){if(Ue(r),r.length!==Zt)throw new Error("bad n size");var a=new Uint8Array(It);return te(a,r),a},n.scalarMult.scalarLength=Zt,n.scalarMult.groupElementLength=It,n.box=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox(r,a,s)},n.box.before=function(r,a){Ue(r,a),lo(r,a);var i=new Uint8Array(kn);return Ee(i,r,a),i},n.box.after=n.secretbox,n.box.open=function(r,a,i,e){var s=n.box.before(i,e);return n.secretbox.open(r,a,s)},n.box.open.after=n.secretbox.open,n.box.keyPair=function(){var r=new Uint8Array(Tt),a=new Uint8Array($t);return me(r,a),{publicKey:r,secretKey:a}},n.box.keyPair.fromSecretKey=function(r){if(Ue(r),r.length!==$t)throw new Error("bad secret key size");var a=new Uint8Array(Tt);return te(a,r),{publicKey:a,secretKey:new Uint8Array(r)}},n.box.publicKeyLength=Tt,n.box.secretKeyLength=$t,n.box.sharedKeyLength=kn,n.box.nonceLength=er,n.box.overheadLength=n.secretbox.overheadLength,n.sign=function(r,a){if(Ue(r,a),a.length!==ht)throw new Error("bad secret key size");var i=new Uint8Array(Ve+r.length);return Jn(i,r,r.length,a),i},n.sign.open=function(r,a){if(Ue(r,a),a.length!==ct)throw new Error("bad public key size");var i=new Uint8Array(r.length),e=_n(i,r,r.length,a);if(e<0)return null;for(var s=new Uint8Array(e),b=0;b<s.length;b++)s[b]=i[b];return s},n.sign.detached=function(r,a){for(var i=n.sign(r,a),e=new Uint8Array(Ve),s=0;s<e.length;s++)e[s]=i[s];return e},n.sign.detached.verify=function(r,a,i){if(Ue(r,a,i),a.length!==Ve)throw new Error("bad signature size");if(i.length!==ct)throw new Error("bad public key size");var e=new Uint8Array(Ve+r.length),s=new Uint8Array(Ve+r.length),b;for(b=0;b<Ve;b++)e[b]=a[b];for(b=0;b<r.length;b++)e[b+Ve]=r[b];return _n(s,e,e.length,i)>=0},n.sign.keyPair=function(){var r=new Uint8Array(ct),a=new Uint8Array(ht);return mn(r,a),{publicKey:r,secretKey:a}},n.sign.keyPair.fromSecretKey=function(r){if(Ue(r),r.length!==ht)throw new Error("bad secret key size");for(var a=new Uint8Array(ct),i=0;i<a.length;i++)a[i]=r[32+i];return{publicKey:a,secretKey:new Uint8Array(r)}},n.sign.keyPair.fromSeed=function(r){if(Ue(r),r.length!==Cn)throw new Error("bad seed size");for(var a=new Uint8Array(ct),i=new Uint8Array(ht),e=0;e<32;e++)i[e]=r[e];return mn(a,i,!0),{publicKey:a,secretKey:i}},n.sign.publicKeyLength=ct,n.sign.secretKeyLength=ht,n.sign.seedLength=Cn,n.sign.signatureLength=Ve,n.hash=function(r){Ue(r);var a=new Uint8Array(En);return lt(a,r,r.length),a},n.hash.hashLength=En,n.verify=function(r,a){return Ue(r,a),r.length===0||a.length===0||r.length!==a.length?!1:M(r,0,a,0,r.length)===0},n.setPRNG=function(r){l=r},(function(){var r=typeof self<"u"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var a=65536;n.setPRNG(function(i,e){var s,b=new Uint8Array(e);for(s=0;s<e;s+=a)r.getRandomValues(b.subarray(s,s+Math.min(e-s,a)));for(s=0;s<e;s++)i[s]=b[s];nr(b)})}else typeof ta<"u"&&(r=oa,r&&r.randomBytes&&n.setPRNG(function(i,e){var s,b=r.randomBytes(e);for(s=0;s<e;s++)i[s]=b[s];nr(b)}))})()})(t.exports?t.exports:self.nacl=self.nacl||{})})(In)),In.exports}var aa=ia();const sa=Ji(aa);function la(t){if(t.length>=255)throw new TypeError("Alphabet too long");const n=new Uint8Array(256);for(let x=0;x<n.length;x++)n[x]=255;for(let x=0;x<t.length;x++){const h=t.charAt(x),y=h.charCodeAt(0);if(n[y]!==255)throw new TypeError(h+" is ambiguous");n[y]=x}const o=t.length,l=t.charAt(0),c=Math.log(o)/Math.log(256),d=Math.log(256)/Math.log(o);function u(x){if(x instanceof Uint8Array||(ArrayBuffer.isView(x)?x=new Uint8Array(x.buffer,x.byteOffset,x.byteLength):Array.isArray(x)&&(x=Uint8Array.from(x))),!(x instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(x.length===0)return"";let h=0,y=0,_=0;const B=x.length;for(;_!==B&&x[_]===0;)_++,h++;const O=(B-_)*d+1>>>0,M=new Uint8Array(O);for(;_!==B;){let X=x[_],pe=0;for(let ne=O-1;(X!==0||pe<y)&&ne!==-1;ne--,pe++)X+=256*M[ne]>>>0,M[ne]=X%o>>>0,X=X/o>>>0;if(X!==0)throw new Error("Non-zero carry");y=pe,_++}let I=O-y;for(;I!==O&&M[I]===0;)I++;let D=l.repeat(h);for(;I<O;++I)D+=t.charAt(M[I]);return D}function p(x){if(typeof x!="string")throw new TypeError("Expected String");if(x.length===0)return new Uint8Array;let h=0,y=0,_=0;for(;x[h]===l;)y++,h++;const B=(x.length-h)*c+1>>>0,O=new Uint8Array(B);for(;h<x.length;){const X=x.charCodeAt(h);if(X>255)return;let pe=n[X];if(pe===255)return;let ne=0;for(let ce=B-1;(pe!==0||ne<_)&&ce!==-1;ce--,ne++)pe+=o*O[ce]>>>0,O[ce]=pe%256>>>0,pe=pe/256>>>0;if(pe!==0)throw new Error("Non-zero carry");_=ne,h++}let M=B-_;for(;M!==B&&O[M]===0;)M++;const I=new Uint8Array(y+(B-M));let D=y;for(;M!==B;)I[D++]=O[M++];return I}function g(x){const h=p(x);if(h)return h;throw new Error("Non-base"+o+" character")}return{encode:u,decodeUnsafe:p,decode:g}}var ca="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const pr=la(ca),Kn="cbsgo_wallet_v3",xn="cbsgo_wallet_unlocked_v3";function qt(){try{const t=localStorage.getItem(Kn);if(!t)return null;const n=JSON.parse(t);return!n||typeof n!="object"||!n.pk||!n.sk||!n.pin?null:{pk:String(n.pk),sk:String(n.sk),pin:String(n.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function da(t){localStorage.setItem(Kn,JSON.stringify({pk:String(t.pk),sk:String(t.sk),pin:String(t.pin)}))}function fa(){const t=sa.sign.keyPair(),n=pr.encode(t.publicKey),o=pr.encode(t.secretKey);return{pk:n,sk:o}}function Yr(){return!!qt()}function pa(){return qt()?sessionStorage.getItem(xn)==="1":!1}function ua(t){const n=String(t||"");if(n.length<4)throw new Error("PIN too short");qt()&&console.warn("CBS GO: overwriting existing wallet (v3)");const{pk:l,sk:c}=fa();return da({pk:l,sk:c,pin:n}),sessionStorage.setItem(xn,"1"),l}function xa(t){const n=qt();if(!n)throw new Error("No wallet");if(String(t||"")!==n.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(xn,"1"),n.pk}function qe(){const t=qt();return t?t.pk:""}function ya(){localStorage.removeItem(Kn),sessionStorage.removeItem(xn)}typeof window<"u"&&(window.cbsgoDevResetWallet=ya);const qr="cbsgoLoginModal";function Hr(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Kr(){const t=document.getElementById(qr);t&&t.remove()}function ga(t){Kr();const n=document.createElement("div");return n.id=qr,n.style.position="fixed",n.style.inset="0",n.style.zIndex="999999",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="16px",n.style.background="rgba(0,0,0,.70)",n.style.backdropFilter="blur(12px)",n.innerHTML=t,document.body.appendChild(n),n}function ba(t,n){return`
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
      ">${Hr(t)}</div>

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
  `}function ha(){const t=!Yr();let n="";try{const h=At();t?h&&h!=="Sovereign"?n=h:n="":n=h||""}catch{n=""}const o=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved locally on this device.
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Hr(n)}" style="${Qt()}" placeholder="Kevin" />
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
    `,l=ga(ba(t?"Welcome to CBS-GO":"Unlock Wallet",o)),c=l.querySelector("#cbsgoLoginMsg"),d=h=>{c&&(c.textContent=h||"")},u=l.querySelector("#cbsgoPin"),p=l.querySelector("#cbsgoPin2"),g=l.querySelector("#cbsgoNick"),x=()=>{Kr(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const h=l.querySelector("#cbsgoCreateBtn");h&&(h.onclick=async()=>{try{const y=String(g?.value||"").trim(),_=String(u?.value||"").trim(),B=String(p?.value||"").trim();if(y.length<2)return d("⛔ Nickname too short.");if(_.length<4)return d("⛔ PIN must be at least 4 digits.");if(_!==B)return d("⛔ PINs do not match.");d("Creating wallet…"),Rr(y),await ua(_),d("✅ Wallet created. Starting…"),x()}catch(y){d(`⛔ ${String(y?.message||y)}`)}})}else{const h=l.querySelector("#cbsgoUnlockBtn");h&&(h.onclick=async()=>{try{const y=String(u?.value||"").trim();if(y.length<4)return d("⛔ PIN must be at least 4 digits.");d("Unlocking…"),await xa(y),d("✅ Unlocked."),x()}catch{d("⛔ Wrong PIN (or wallet data missing).")}})}}const ma="https://cxfedvowjgkqrakkkjpi.supabase.co",wa="sb_publishable_Eed_27P11ry75z-QL7gGCg_6VQ4WTqT",Fe=co(ma,wa);function va(){const t=qe();if(!t)return null;const n=At(),o=Yn();return{wallet_pk:t,nickname:n,avatar:o}}async function rn(t={}){try{const n=va();if(!n){console.warn("CBS GO: no local wallet, skip profile sync");return}const o={...n,...t,last_seen:new Date().toISOString()},{error:l}=await Fe.from("players").upsert(o,{onConflict:"wallet_pk"});l&&console.warn("CBS GO: failed to sync player profile",l)}catch(n){console.warn("CBS GO: syncPlayerProfile crashed",n)}}const _a=15e3,Sa=1e4,ka=300*1e3;let Ot=null,xr=0,yr=0;function Ca(t){const n=t?.detail||{};typeof n.lat!="number"||typeof n.lng!="number"||(Ot={lat:n.lat,lng:n.lng,heading:typeof n.heading=="number"?n.heading:null,acc:typeof n.acc=="number"?n.acc:null,t:typeof n.t=="number"?n.t:Date.now()})}typeof window<"u"&&!window.__cbsgo_playerPos_listener&&(window.__cbsgo_playerPos_listener=!0,window.addEventListener("cbsgo:playerPos",Ca));async function Ea(){const t=qe();if(!t||!Ot)return;const n=Date.now();if(n-xr<5e3)return;xr=n;const l=(At()||"").trim()||"Anon",c={wallet_pk:t,nickname:l,lat:Ot.lat,lng:Ot.lng,heading:Ot.heading,last_seen:new Date().toISOString()};try{const{data:d,error:u}=await Fe.from("player_state").select("id").eq("wallet_pk",t).limit(1);if(u){console.warn("CBS GO: player_state select failed",u);return}if(d&&d.length>0){const p=d[0].id,{error:g}=await Fe.from("player_state").update(c).eq("id",p);g&&console.warn("CBS GO: player_state update failed",g)}else{const{error:p}=await Fe.from("player_state").insert(c);p&&console.warn("CBS GO: player_state insert failed",p)}}catch(d){console.warn("CBS GO: pushMyState error",d)}}async function Ma(){const t=qe();if(!t)return;const n=Date.now();if(n-yr<3e3)return;yr=n;const o=new Date(Date.now()-ka).toISOString();try{const{data:l,error:c}=await Fe.from("player_state").select("wallet_pk, nickname, lat, lng, heading, last_seen").gt("last_seen",o);if(c){console.warn("CBS GO: fetch online players failed",c);return}const d=Array.isArray(l)?l:[],u=Array.from(new Set(d.map(x=>x.wallet_pk).filter(x=>typeof x=="string"&&x.length>0)));let p=new Map;if(u.length>0){const{data:x,error:h}=await Fe.from("players").select("wallet_pk, avatar, nickname").in("wallet_pk",u);h?console.warn("CBS GO: fetch player profiles failed",h):Array.isArray(x)&&(p=new Map(x.map(y=>[y.wallet_pk,y])))}const g=d.map(x=>{const h=x.lat,y=x.lng,_=typeof h=="number"?h:parseFloat(h),B=typeof y=="number"?y:parseFloat(y);if(!Number.isFinite(_)||!Number.isFinite(B))return null;const O=p.get(x.wallet_pk)||null,M=O&&O.nickname||x.nickname||"Anon",I=O&&O.avatar?String(O.avatar):"";return{wallet_pk:x.wallet_pk||"",nickname:M,avatar:I,lat:_,lng:B,heading:typeof x.heading=="number"?x.heading:null,last_seen:x.last_seen,isMe:x.wallet_pk===t}}).filter(Boolean);typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:onlinePlayers",{detail:{players:g}}))}catch(l){console.warn("CBS GO: fetchOnlinePlayers error",l)}}function La(){typeof window>"u"||window.__cbsgo_playerSync_started||(window.__cbsgo_playerSync_started=!0,setInterval(()=>{Ea()},_a),setInterval(()=>{Ma()},Sa))}La();function Xr(){const t=qe();if(!t)throw new Error("No local CBS-GO wallet found. Create / unlock your wallet first.");return t}function ln(t,n){console.warn(`CBS GO friends: ${t} failed`,n)}async function Aa(t){const n=Xr(),o=String(t||"").trim();if(!o)throw new Error("Wallet address is required.");if(o===n)throw new Error("You cannot add yourself as a friend.");if(o.length<20)throw new Error("That does not look like a valid wallet address.");const{error:l}=await Fe.from("friends").insert({a_wallet:n,b_wallet:o,status:"pending"});if(l)throw ln("sendFriendRequest",l),l.message&&l.message.toLowerCase().includes("duplicate")?new Error("You already have a pending or accepted friendship with this wallet."):new Error("Could not send friend request (permissions or network issue).");return{ok:!0}}async function Ba(t){const n=Xr(),o=t;if(!o)throw new Error("Invalid friend request id.");const{data:l,error:c}=await Fe.from("friends").update({status:"accepted"}).eq("id",o).eq("b_wallet",n).select("*").maybeSingle();if(c)throw ln("acceptFriendRequest",c),new Error("Could not accept friend (permissions or network issue).");if(!l)throw new Error("Friend request not found or not meant for this wallet.");return{ok:!0,friend:l}}async function Vr(){const t=qe();if(!t)return{incoming:[],accepted:[]};const{data:n,error:o}=await Fe.from("friends").select("*").or(`a_wallet.eq.${t},b_wallet.eq.${t}`).order("created_at",{ascending:!1});if(o)throw ln("loadFriendsOverview",o),new Error("Could not load friends (permissions or network issue).");const l=Array.isArray(n)?n:[],c=[],d=[];for(const p of l){const g=p.b_wallet===t&&p.status==="pending",x=p.status==="accepted"&&(p.a_wallet===t||p.b_wallet===t);if(!g&&!x)continue;const h=p.a_wallet===t?p.b_wallet:p.a_wallet,y={id:p.id,a_wallet:p.a_wallet,b_wallet:p.b_wallet,status:p.status,created_at:p.created_at,otherWallet:h,nickname:null,avatar:""};g&&c.push(y),x&&d.push(y)}const u=Array.from(new Set([...c,...d].map(p=>p.otherWallet).filter(Boolean)));if(u.length>0){const{data:p,error:g}=await Fe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",u);if(!g&&Array.isArray(p)){const x=new Map;for(const y of p)y.wallet_pk&&x.set(String(y.wallet_pk),{nickname:y.nickname||null,avatar:y.avatar||""});const h=y=>{y.forEach(_=>{const B=x.get(_.otherWallet);B&&(_.nickname=B.nickname||null,_.avatar=B.avatar||"")})};h(c),h(d)}else g&&ln("loadFriendsOverview:players",g)}return{incoming:c,accepted:d}}let Ft=null;async function Zr(){try{"wakeLock"in navigator&&navigator.wakeLock?.request?(Ft=await navigator.wakeLock.request("screen"),console.log("CBS-GO: wake lock actief"),Ft.addEventListener("release",()=>{console.log("CBS-GO: wake lock vrijgegeven")})):console.log("CBS-GO: wake lock niet ondersteund in deze browser")}catch(t){console.warn("CBS-GO: wake lock request faalde",t)}}async function za(){try{Ft&&(await Ft.release(),Ft=null,console.log("CBS-GO: wake lock handmatig vrijgegeven"))}catch(t){console.warn("CBS-GO: wake lock release faalde",t)}}function Na(){"wakeLock"in navigator&&document.addEventListener("visibilitychange",async()=>{try{document.visibilityState==="visible"?await Zr():await za()}catch(t){console.warn("CBS-GO: visibility wake lock error",t)}})}function Ia(){const t=qe();if(!t)throw new Error("No CBS-GO wallet found. Unlock or create your wallet first.");return t}function Ta(t){return String(t||"").trim()}async function Qr(t,n={}){const o=Ia(),l=Ta(t),c=Math.max(0,Math.floor(Number(n.tickets!=null?n.tickets:0))),d=Math.max(0,Math.floor(Number(n.cbs!=null?n.cbs:0))),u=n.cardId?String(n.cardId||"").trim():"",p=Math.max(0,Math.floor(Number(n.cardQty!=null?n.cardQty:0)));if(!l)throw new Error("Wallet address is required.");if(l===o)throw new Error("You cannot send a gift to your own wallet.");if(l.length<20)throw new Error("That does not look like a valid wallet address.");if(!c&&!d&&!p)throw new Error("Set tickets, CBS and/or cards above 0.");if(p>0&&!u)throw new Error("Select a card to send.");if(c>0&&Lr()<c)throw new Error("Not enough tickets in your bag.");if(d>0&&Ar()<d)throw new Error("Not enough CBS (play money) in your bag.");if(p>0&&Mo(u)<p)throw new Error("Not enough of that card in your collection.");let g=0,x=0,h=null,y=0;try{c>0&&(ko(c),g=c),d>0&&(Co(d),x=d),p>0&&u&&(Lo(u,p),h=u,y=p);const{error:_}=await Fe.from("trades").insert({from_wallet:o,to_wallet:l,tickets:c||0,cbs:d||0,card_id:u||null,card_qty:p||null,status:"sent"});if(_)throw g>0&&Lt(g),x>0&&pn(x),h&&y>0&&Br(h,y),console.warn("CBS GO sendGiftToWallet Supabase error",_),new Error(_.message||"Could not save gift to Supabase (permissions or network issue).");if(typeof window<"u")try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftSent",{detail:{toWallet:l,tickets:c,cbs:d,cardId:u||null,cardQty:p||0}}))}catch(B){console.warn("CBS GO: dispatch friendGiftSent failed",B)}return{ok:!0}}catch(_){throw _ instanceof Error?_:new Error(String(_?.message||_)||"Failed to send gift.")}}async function cn(){const t=qe();if(t)try{const{data:n,error:o}=await Fe.from("trades").select("*").eq("to_wallet",t).in("status",["sent","pending"]).order("created_at",{ascending:!0});if(o){console.warn("CBS GO pullIncomingGifts Supabase error",o);return}if(!Array.isArray(n)||n.length===0)return;let l=new Map;try{const d=Array.from(new Set(n.map(u=>u&&u.from_wallet).filter(u=>typeof u=="string"&&u.trim().length>0)));if(d.length>0){const{data:u,error:p}=await Fe.from("players").select("wallet_pk, nickname, avatar").in("wallet_pk",d);!p&&Array.isArray(u)?l=new Map(u.filter(g=>g&&g.wallet_pk).map(g=>[String(g.wallet_pk),{nickname:g.nickname||null,avatar:g.avatar||""}])):p&&console.warn("CBS GO pullIncomingGifts players error",p)}}catch(d){console.warn("CBS GO pullIncomingGifts: sender profile lookup failed",d)}const c=[];for(const d of n){if(!d)continue;const u=Number(d.tickets||0),p=Number(d.cbs||0),g=d.card_id?String(d.card_id||"").trim():"",x=Math.max(0,Number(d.card_qty||0));if(u>0&&Lt(u),p>0&&pn(p),g&&x>0&&Br(g,x),(u>0||p>0||g&&x>0)&&typeof window<"u"){const h=l.get(d.from_wallet)||{nickname:null,avatar:""},y={id:d.id||null,fromWallet:d.from_wallet||"",toWallet:d.to_wallet||"",tickets:u,cbs:p,cardId:g||null,cardQty:x||0,createdAt:d.created_at||null,senderNickname:h.nickname||null,senderAvatar:h.avatar||""};try{window.dispatchEvent(new CustomEvent("cbsgo:friendGiftReceived",{detail:y}))}catch(_){console.warn("CBS GO: dispatch friendGiftReceived failed",_)}}d.id&&c.push(d.id)}if(c.length>0){const{error:d}=await Fe.from("trades").update({status:"claimed"}).in("id",c);d&&console.warn("CBS GO pullIncomingGifts update status error",d)}}catch(n){console.warn("CBS GO pullIncomingGifts failed",n)}}typeof window<"u"&&(window.cbsgoSendGift=(t,n=0,o=0,l=null,c=0)=>Qr(t,{tickets:n,cbs:o,cardId:l,cardQty:c}),window.cbsgoPullGifts=cn);function Ae(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Xn(t,n=30){const o=t?`background-image:url('${t}');`:"";return`
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
  `}const Jr="cbsgo_cards_v1";function $a(t,n){try{const o=JSON.parse(t);return o&&typeof o=="object"?o:n}catch{return n}}function Vn(){const t=localStorage.getItem(Jr),n=$a(t,{});let o={};return n&&typeof n.counts=="object"&&n.counts!==null?o={...n.counts}:Array.isArray(n.cards)&&n.cards.forEach(l=>{if(!l||!l.id)return;const c=Number(l.count||0);Number.isFinite(c)&&c>0&&(o[l.id]=c)}),o}function eo(t){try{const n={};for(const[l,c]of Object.entries(t||{})){const d=Number(c||0);Number.isFinite(d)&&d>0&&(n[l]=d)}const o={counts:n};localStorage.setItem(Jr,JSON.stringify(o))}catch(n){console.warn("CBS GO: saveBagCardCounts failed",n)}}const Pa=[{id:"walk_sun_1",label:"Sunny Walk"},{id:"walk_rain_1",label:"Rainy Walk"},{id:"walk_night_1",label:"Night Walk"},{id:"walk_city_1",label:"City Steps"},{id:"walk_nature_1",label:"Forest Trail"},{id:"walk_beach_1",label:"Beach Walk"},{id:"cbs_heart_1",label:"CBS Heart"},{id:"cbs_chain_1",label:"Break the Chain"},{id:"cbs_fire_1",label:"Builder Flame"},{id:"cbs_go_1",label:"CBS-GO Explorer"},{id:"walk_morning_1",label:"Morning Steps"},{id:"walk_evening_1",label:"Evening Glow"},{id:"walk_park_1",label:"Park Loop"},{id:"walk_bridge_1",label:"River Bridge"},{id:"cbs_star_1",label:"Community Star"},{id:"cbs_glow_1",label:"Glow Ticket"},{id:"cbs_team_1",label:"Builder Squad"},{id:"cbs_legend_1",label:"CBS Legend"},{id:"walk_placeholder_1",label:"Mystery Walk I"},{id:"walk_placeholder_2",label:"Mystery Walk II"},{id:"cbs_placeholder_1",label:"Mystery CBS I"},{id:"cbs_placeholder_2",label:"Mystery CBS II"}];function to(){const t=Vn();let n=0,o=0;const l=[];for(const c of Pa){const d=Number(t[c.id]||0);Number.isFinite(d)&&d>0&&(n+=1,o+=d,l.push({id:c.id,count:d,label:c.label}))}return{cardTypes:n,cardTotal:o,sendable:l}}function yn(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Fn(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function gr(t,n){return`
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
  `}function Oa(){const t=At(),n=Yn(),o=qe();return`
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
        ${Xn(n,64)}

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
  `}function ja(){const t=document.querySelector("#profileName"),n=document.querySelector("#profileAvatar"),o=document.querySelector("#profileRemoveAvatar");let l=null;const c=M=>{const I=document.querySelector("#profileMsg");I&&(I.textContent=M||"")};t&&c(t.value?`✅ Profile loaded: ${t.value}`:"");const d=()=>{if(!t)return;const M=Rr(t.value);c(`✅ Name saved: ${M}`);try{rn()}catch(I){console.warn("CBS GO: failed to sync profile after name change",I)}};t&&(t.addEventListener("input",()=>{c("Saving…"),l&&clearTimeout(l),l=setTimeout(d,300)}),t.addEventListener("blur",()=>{l&&clearTimeout(l),d()})),n&&n.addEventListener("change",()=>{const M=n.files&&n.files[0];if(!M)return;if(M.size>15e5){c("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}c("Uploading photo…");const I=new FileReader;I.onload=()=>{di(String(I.result||"")),c("✅ Photo saved"),Et();try{rn()}catch(D){console.warn("CBS GO: failed to sync profile after avatar change",D)}},I.onerror=()=>c("⛔ Failed to read image."),I.readAsDataURL(M)}),o&&(o.onclick=()=>{fi(),c("✅ Photo removed"),Et();try{rn()}catch(M){console.warn("CBS GO: failed to sync profile after avatar removal",M)}});const u=document.querySelector("#friendWalletInput"),p=document.querySelector("#friendSendBtn"),g=document.querySelector("#friendsMsg"),x=document.querySelector("#friendsIncomingList"),h=document.querySelector("#friendsAcceptedList"),y=M=>{g&&(g.textContent=M||"")},_=M=>{if(!M)return"";const I=String(M);return I.length<=12?I:`${I.slice(0,5)}…${I.slice(-4)}`},B=(M,I="")=>{const D=M.nickname&&M.nickname.trim()?M.nickname.trim():_(M.otherWallet),X=_(M.otherWallet);return`
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
          ${Xn(M.avatar||"",32)}
          <div style="min-width:0;">
            <div style="
              font-size:12px;
              font-weight:600;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            ">
              ${Ae(D||"Friend")}
            </div>
            ${X?`<div style="font-size:11px;opacity:.7;">${Ae(X)}</div>`:""}
          </div>
        </div>
        <div style="flex-shrink:0;">
          ${I||""}
        </div>
      </div>
    `};async function O(){if(!(!x||!h))try{x.textContent="Loading…",h.textContent="Loading…";const M=await Vr();M.incoming.length?x.innerHTML=M.incoming.map(I=>{const D=`
              <div style="display:flex;gap:6px;align-items:center;">
                <button
                  type="button"
                  class="friendCopyBtn"
                  data-wallet="${I.otherWallet}"
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
                  data-friend-id="${I.id}"
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
            `;return B(I,D)}).join(""):x.textContent="No incoming requests.",M.accepted.length?h.innerHTML=M.accepted.map(I=>{const D=`
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
                  data-wallet="${I.otherWallet}"
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
            `;return B(I,D)}).join(""):h.textContent="No friends yet.",document.querySelectorAll(".friendAcceptBtn").forEach(I=>{I.addEventListener("click",async()=>{const D=I.getAttribute("data-friend-id");if(D){y("Accepting friend…"),I.disabled=!0;try{await Ba(D),y("✅ Friend added."),await O()}catch(X){console.warn(X),y(`⛔ ${X.message||X}`),I.disabled=!1}}})}),document.querySelectorAll(".friendCopyBtn").forEach(I=>{I.addEventListener("click",async()=>{const D=I.getAttribute("data-wallet")||"";if(D)try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(D),y("✅ Friend wallet copied.")):y("📋 Copy not supported in this browser.")}catch(X){console.warn("CBS GO: copy friend wallet failed",X),y("⛔ Could not copy wallet address.")}})})}catch(M){console.warn("CBS GO: refreshFriends failed",M),x.textContent="Could not load friends.",h.textContent=""}}p&&u&&p.addEventListener("click",async()=>{const M=u.value.trim();if(!M){y("Enter a wallet address first.");return}y("Sending friend request…"),p.disabled=!0;try{await Aa(M),y("✅ Friend request sent."),u.value="",await O()}catch(I){console.warn(I),y(`⛔ ${I.message||I}`)}finally{p.disabled=!1}}),O().catch(()=>{})}function Ra(){const t=Lr(),n=Ar(),o=qe(),{cardTypes:l,cardTotal:c,sendable:d}=to(),u=c>0?`You own ${c} cards (${l} different). You can also send some to friends as gifts.`:"You don’t have any cards yet to send.",g=d.length>0?`
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

          <!-- vriend kiezen uit lijst -->
          <div>
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
              <option value="">Choose a friend</option>
            </select>
            <div id="giftFriendMsg" style="font-size:10px;opacity:.65;margin-top:2px;"></div>
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

          ${g}

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
  `}function Fa(){const t=document.querySelector("#cbsgoCopyWalletBtn"),n=document.querySelector("#bagMsg"),o=document.querySelector("#cbsgoOpenCardsBtn");o&&(o.onclick=()=>{try{Qi()}catch(M){console.warn("CBS GO: openCardsPanel failed",M)}});const l=qe(),c=document.querySelector("#giftWalletInput"),d=document.querySelector("#giftFriendSelect"),u=document.querySelector("#giftFriendMsg"),p=document.querySelector("#giftTicketsInput"),g=document.querySelector("#giftCbsInput"),x=document.querySelector("#giftCardSelect"),h=document.querySelector("#giftCardQtyInput"),y=document.querySelector("#giftSendBtn"),_=document.querySelector("#giftMsg"),B=M=>{_&&(_.textContent=M||"")};if(d&&u&&((async()=>{try{u.textContent="Loading your friends…";const I=(await Vr()).accepted||[];if(!I.length){u.textContent="You have no friends yet. Add them in your Profile.";return}d.innerHTML=`
          <option value="">Choose a friend</option>
          ${I.map(D=>{const X=D.nickname&&D.nickname.trim()?D.nickname.trim():D.otherWallet,pe=D.otherWallet||"",ne=pe&&pe.length>12?`${pe.slice(0,5)}…${pe.slice(-4)}`:pe;return`<option value="${Ae(pe)}">${Ae(X)} (${Ae(ne)})</option>`}).join("")}
        `,u.textContent=""}catch(M){console.warn("CBS GO: load friends for gift failed",M),u.textContent="Could not load friends list."}})(),d.addEventListener("change",()=>{const M=d.value||"";M&&c&&(c.value=M)})),y&&c&&y.addEventListener("click",async()=>{const M=c.value.trim(),I=p?.value??"",D=g?.value??"",X=x?x.value.trim():"",pe=h?.value??"",ne=Number(pe||"0"),ce=Number(I||"0"),ke=Number(D||"0");if(!M){B("Enter a wallet address first or pick a friend.");return}if((!ce||ce<=0)&&(!ke||ke<=0)&&!X){B("Set tickets and/or CBS above 0, or choose a card.");return}if(X&&(!ne||ne<=0)){B("Set card quantity above 0.");return}if(X&&ne>0){const{sendable:Be}=to(),Te=Be.find(He=>He.id===X),Ce=Te?Number(Te.count||0):0;if(!Ce||ne>Ce){B(Ce?`You only have ${Ce} of this card.`:"You don’t own this card (anymore).");return}}y.disabled=!0,B("Sending gift…");try{if(await Qr(M,{tickets:ce,cbs:ke,cardId:X||null,cardQty:X?ne:0}),X&&ne>0){const Be=Vn(),Te=Number(Be[X]||0),Ce=Math.max(0,Te-ne);Be[X]=Ce,eo(Be),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged"))}B("✅ Gift sent."),p&&(p.value=""),g&&(g.value=""),h&&(h.value=""),x&&(x.value=""),d&&(d.value=""),c&&(c.value=""),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:tradePopup",{detail:{direction:"sent",toWallet:M,tickets:ce,cbs:ke,cardId:X||null,cardQty:X?ne:0}}))}catch(Be){console.warn(Be),B(`⛔ ${Be.message||"Could not send gift."}`)}finally{y.disabled=!1}}),!t||!l){cn().catch(()=>{});return}const O=M=>{n&&(n.textContent=M||"")};t.onclick=async()=>{try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(l),O("✅ Wallet address copied to clipboard.")):O("📋 Copy not supported in this browser.")}catch{O("⛔ Failed to copy address.")}},cn().catch(()=>{})}function no(){const t=yn();return t==="profile"?gr("Profile",`<div id="profileMount">${Oa()}</div>`):t==="bag"?gr("Bag",`<div id="bagMount">${Ra()}</div>`):""}function Ua(){return`
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

      <!-- Panel-root -->
      <div id="panelRoot">
        ${no()}
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
  `}function Et(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=no();const n=yn();n==="profile"&&ja(),n==="bag"&&Fa();const o=document.querySelector("#cbsgoClosePanel");o&&o.addEventListener("click",()=>{Fn("map"),Et()})}function Ga(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-panel"),o=yn();Fn(o===n?"map":n||"map"),Et()})})}function br(t){const n=document.querySelector("#cbsgoLootOverlayHost");if(!n)return;const{direction:o="received",fromNickname:l,fromAvatar:c,toWallet:d,tickets:u=0,cbs:p=0,cardId:g=null,cardQty:x=0}=t||{};if(!u&&!p&&!(g&&x))return;n.innerHTML="";const h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.78)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(320px, 90vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(56,189,248,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 24px 80px rgba(0,0,0,.88)",y.style.padding="18px 16px 14px 16px",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",y.style.transition="opacity .22s ease-out, transform .22s ease-out";const _=At(),B=o==="sent"?"Gift sent":"You received a gift",O=[];u&&O.push(`🎟️ ${u} ticket${u===1?"":"s"}`),p&&O.push(`🪙 ${p} CBS`),g&&x&&O.push(`🃏 ${x} card${x===1?"":"s"}`);const M=o==="sent"?`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          Sent from <b>${Ae(_)}</b> to <span style="opacity:.9;">${Ae(d||"")}</span>
        </div>
      `:`
        <div style="font-size:11px;opacity:.8;margin-bottom:6px;">
          From <b>${Ae(l||"Friend")}</b>
        </div>
      `,I=o==="sent"?`
        <div style="
          width:40px;height:40px;
          border-radius:999px;
          border:1px solid rgba(56,189,248,.8);
          background:rgba(15,23,42,.96);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
        ">
          🎁
        </div>
      `:Xn(c||"",40);y.innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      ${I}
      <div>
        <div style="font-size:15px;font-weight:800;">${Ae(B)}</div>
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
  `,h.appendChild(y),n.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const D=()=>{y.style.opacity="0",y.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{n.innerHTML=""},220)},X=document.getElementById("cbsgoTradePopupCloseBtn");X&&(X.onclick=D),h.addEventListener("click",pe=>{pe.target===h&&D()})}function hr(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=Ua();try{Zr(),Na()}catch(u){console.warn("CBS GO: wake lock niet beschikbaar",u)}try{rn()}catch(u){console.warn("CBS GO: failed to sync player profile (ignored)",u)}if(Ga(),qi(),li(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const u=()=>{const p=document.querySelector("#stepsMount");p&&(p.innerHTML=Pr())};window.addEventListener("cbsgo:stepsChanged",u)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const u=()=>{const p=document.querySelector("#xpMount");p&&(p.innerHTML=$r())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(p=>{window.addEventListener(p,u)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const u=()=>{yn()==="bag"&&Et()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(p=>{window.addEventListener(p,u)})}let n=null;function o(u){const p=document.querySelector("#cbsgoToastHost");if(!p)return;let g=p.querySelector(".cbsgoToastBox");g||(g=document.createElement("div"),g.className="cbsgoToastBox",g.style.pointerEvents="auto",g.style.padding="8px 12px",g.style.borderRadius="999px",g.style.border="1px solid rgba(255,255,255,.25)",g.style.background="rgba(10,12,18,.88)",g.style.backdropFilter="blur(10px)",g.style.color="#fff",g.style.fontFamily="system-ui,sans-serif",g.style.fontSize="11px",g.style.boxShadow="0 10px 30px rgba(0,0,0,.6)",g.style.opacity="0",g.style.transform="translateY(10px)",g.style.transition="opacity .25s ease-out, transform .25s ease-out",p.appendChild(g)),g.textContent=u||"",g.style.opacity="1",g.style.transform="translateY(0)",n&&clearTimeout(n),n=setTimeout(()=>{g.style.opacity="0",g.style.transform="translateY(10px)"},2500)}window.__cbsgo_stepReward_toast_listener||(window.__cbsgo_stepReward_toast_listener=!0,window.addEventListener("cbsgo:stepReward",u=>{const p=u?.detail||{},g=Number(p.xp||0),x=Number(p.tickets||0),h=Number(p.cbs||0);if(!g&&!x&&!h)return;const y=[];g&&y.push(`+${g} XP`),x&&y.push(`+${x} ticket${x===1?"":"s"}`),h&&y.push(`+${h} CBS`);let _="Walking reward";p.reason==="boost"?_="Glow boost":p.reason==="treasure"||p.reason==="treasure-rare"?_="Treasure reward":p.reason==="distance"&&(_="Distance reward"),o(`${_}: ${y.join(" · ")}`)}));function l(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const g=Number(u?.steps||0),x=Number(u?.goal||0),h=u?.dayKey||"",y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.80)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(340px, 92vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(56,189,248,.85)",_.style.background="rgba(10,12,18,0.98)",_.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",_.style.padding="20px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const B=x?`${g}/${x} steps`:`${g} steps`;_.innerHTML=`
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
        ${B}
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
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"});const O=()=>{_.style.opacity="0",_.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},M=document.getElementById("cbsgoDailyGoalCloseBtn");M&&(M.onclick=O),y.addEventListener("click",I=>{I.target===y&&O()})}window.__cbsgo_daily_goal_toast_listener||(window.__cbsgo_daily_goal_toast_listener=!0,window.addEventListener("cbsgo:dailyGoalReached",u=>{l(u?.detail||{})}));function c(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;const g=Number(u?.xp||0),x=Number(u?.tickets||0),h=Number(u?.cbs||0);if(!g&&!x&&!h)return;p.innerHTML="";const y=document.createElement("div");y.style.position="fixed",y.style.inset="0",y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.background="rgba(5,7,11,0.75)",y.style.pointerEvents="auto";const _=document.createElement("div");_.style.width="min(320px, 90vw)",_.style.borderRadius="22px",_.style.border="1px solid rgba(255,255,255,.4)",_.style.background="rgba(10,12,18,0.96)",_.style.boxShadow="0 24px 80px rgba(0,0,0,.85)",_.style.padding="18px 18px 16px 18px",_.style.textAlign="center",_.style.color="#fff",_.style.fontFamily="system-ui,sans-serif",_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",_.style.transition="opacity .25s ease-out, transform .25s ease-out";const B=[];g&&B.push(`+${g} XP`),x&&B.push(`+${x} ticket${x===1?"":"s"}`),h&&B.push(`+${h} CBS`),_.innerHTML=`
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
        ${Ae(B.join(" · "))}
      </div>
      <div style="font-size:11px;opacity:.7;">
        Keep walking to find more gifts.
      </div>
    `,y.appendChild(_),p.appendChild(y),requestAnimationFrame(()=>{_.style.opacity="1",_.style.transform="translateY(0) scale(1)"}),setTimeout(()=>{_.style.opacity="0",_.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.innerHTML=""},250)},2600)}window.__cbsgo_loot_overlay_listener||(window.__cbsgo_loot_overlay_listener=!0,window.addEventListener("cbsgo:lootReward",u=>{c(u?.detail||{})}));function d(u){const p=document.querySelector("#cbsgoLootOverlayHost");if(!p)return;p.innerHTML="";const g=Number(u?.days||7),x=Number(u?.rewardCbs||0),h=document.createElement("div");h.style.position="fixed",h.style.inset="0",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.background="rgba(5,7,11,0.80)",h.style.pointerEvents="auto";const y=document.createElement("div");y.style.width="min(340px, 92vw)",y.style.borderRadius="22px",y.style.border="1px solid rgba(251,191,36,.85)",y.style.background="rgba(10,12,18,0.98)",y.style.boxShadow="0 28px 90px rgba(0,0,0,.9)",y.style.padding="20px 18px 16px 18px",y.style.textAlign="center",y.style.color="#fff",y.style.fontFamily="system-ui,sans-serif",y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",y.style.transition="opacity .25s ease-out, transform .25s ease-out",y.innerHTML=`
      <div style="font-size:32px;margin-bottom:8px;">🔥</div>
      <div style="font-weight:800;font-size:17px;margin-bottom:4px;">
        ${g}-day streak!
      </div>
      <div style="font-size:12px;opacity:.85;margin-bottom:10px;">
        You hit your daily goal ${g} days in a row.
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
    `,h.appendChild(y),p.appendChild(h),requestAnimationFrame(()=>{y.style.opacity="1",y.style.transform="translateY(0) scale(1)"});const _=()=>{y.style.opacity="0",y.style.transform="translateY(14px) scale(0.96)",setTimeout(()=>{p.innerHTML=""},250)},B=document.getElementById("cbsgoStreakCloseBtn");B&&(B.onclick=_),h.addEventListener("click",O=>{O.target===h&&_()})}if(window.__cbsgo_streak_overlay_listener||(window.__cbsgo_streak_overlay_listener=!0,window.addEventListener("cbsgo:streakReward",u=>{d(u?.detail||{})})),window.__cbsgo_trade_popup_listener||(window.__cbsgo_trade_popup_listener=!0,window.addEventListener("cbsgo:tradePopup",u=>{br(u?.detail||{})})),window.__cbsgo_friendGift_popup_bridge||(window.__cbsgo_friendGift_popup_bridge=!0,window.addEventListener("cbsgo:friendGiftReceived",u=>{const p=u?.detail||{};if(p.cardId&&p.cardQty){const g=Vn(),x=Number(g[p.cardId]||0);g[p.cardId]=x+Number(p.cardQty||0),eo(g),typeof window<"u"&&window.dispatchEvent(new CustomEvent("cbsgo:bagChanged"))}br({direction:"received",fromNickname:p.senderNickname||"",fromAvatar:p.senderAvatar||"",toWallet:p.toWallet||"",tickets:p.tickets||0,cbs:p.cbs||0,cardId:p.cardId||null,cardQty:p.cardQty||0})})),Et(),Or()){const u=document.querySelector("#resetBtn");u&&u.addEventListener("click",ci)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",u=>{const p=u?.detail?.id;if(!p)return;if(p==="__daily__"){$n({id:"__daily__",name:"Daily Glow"});return}if(kr(p))return;const g=bo.find(x=>x.id===p);g&&$n(g)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",u=>{const p=u?.detail?.id;p&&uo(async()=>{const{completeNode:g}=await Promise.resolve().then(()=>wo);return{completeNode:g}},void 0).then(({completeNode:g})=>{g(p),ro()})})),cn().catch(()=>{})}function ro(){if(!document.querySelector("#app"))return;if(Yr()&&pa()){hr();return}ha();const n=()=>{window.removeEventListener("cbsgo:loginDone",n),hr()};window.addEventListener("cbsgo:loginDone",n)}function oo(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function dn(t){const n=oo();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";dn(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{dn(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function mr(){try{if(!document.getElementById("app")){dn("❌ #app not found in index.html");return}ro();const n=oo();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){dn(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mr,{once:!0}):mr();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(n=>{console.log("[CBS GO] Service worker registered:",n.scope)}).catch(n=>{console.error("[CBS GO] Service worker registration failed:",n)})});
