(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const dt="modulepreload",ut=function(e){return"/cbs-go/"+e},Ne={},pt=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(g){return Promise.all(g.map(m=>Promise.resolve(m).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var d=f;document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),b=u?.nonce||u?.getAttribute("nonce");r=f(n.map(g=>{if(g=ut(g),g in Ne)return;Ne[g]=!0;const m=g.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${v}`))return;const y=document.createElement("link");if(y.rel=m?"stylesheet":dt,m||(y.as="script"),y.crossOrigin="",y.href=g,b&&y.setAttribute("nonce",b),document.head.appendChild(y),m)return new Promise((S,w)=>{y.addEventListener("load",S),y.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${g}`)))})}))}function s(u){const b=new Event("vite:preloadError",{cancelable:!0});if(b.payload=u,window.dispatchEvent(b),!b.defaultPrevented)throw u}return r.then(u=>{for(const b of u||[])b.status==="rejected"&&s(b.reason);return t().catch(s)})},ft=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Oe="cbsgo_state_v6";function gt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function bt(){return{xp:0,completed:{},updatedAt:Date.now()}}function F(){const e=localStorage.getItem(Oe);return gt(e,bt())}function De(e){e.updatedAt=Date.now(),localStorage.setItem(Oe,JSON.stringify(e))}function ue(e){return 100+(Math.max(1,Number(e||1))-1)*40}function Q(){return Number(F().xp||0)}function ee(){const e=Q();let t=1,n=e;for(;;){const o=ue(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function Re(){const e=Q();let t=1,n=e;for(;;){const o=ue(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function Fe(){return ue(ee())}function G(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return F();const n=F();return n.xp=Number(n.xp||0)+t,De(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:ee()}})),n}function je(e){const t=String(e||"");if(!t)return!1;const n=F();return!!(n.completed&&n.completed[t])}function Ge(e){const t=String(e||"");if(!t)return;const n=F();n.completed||(n.completed={}),n.completed[t]=Date.now(),De(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const mt=Object.freeze(Object.defineProperty({__proto__:null,addXp:G,completeNode:Ge,getLevel:ee,getXp:Q,getXpIntoLevel:Re,getXpNeededThisLevel:Fe,isNodeCompleted:je},Symbol.toStringTag,{value:"Module"})),He="cbsgoPuzzleModal";function yt(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function re(){const e=document.getElementById(He);e&&e.remove()}function ae(e){re();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],s=180,d=18,u=o.length,b=.01;let f=[],g=null,m=0,v=d,y=!1,S=!1,w=null;const it=e?.name||"CBS GO Puzzle",M=document.createElement("div");M.id=He,M.style.position="fixed",M.style.inset="0",M.style.zIndex="999999",M.style.display="flex",M.style.alignItems="center",M.style.justifyContent="center",M.style.padding="16px",M.style.background="rgba(0,0,0,.70)",M.style.backdropFilter="blur(12px)",M.style.fontFamily="system-ui, sans-serif",M.style.color="#fff",M.innerHTML=`
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
          ${yt(it)}
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
          <div>Target: <span id="cbsgoTargetScore">${s}</span></div>
        </div>
        <div style="text-align:right;">
          <div>Moves left: <span id="cbsgoMoves">${d}</span></div>
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
          grid-template-rows:repeat(${t}, 1fr);
          grid-template-columns:repeat(${n}, 1fr);
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
  `,document.body.appendChild(M);const ne=document.getElementById("cbsgoBoard"),me=document.getElementById("cbsgoScore"),ye=document.getElementById("cbsgoMoves"),he=document.getElementById("cbsgoStatus"),xe=document.getElementById("cbsgoPuzzleClose"),ve=document.getElementById("cbsgoPuzzleOk"),H=document.getElementById("cbsgoConfettiLayer");function N(l){he&&(he.textContent=l||"")}function st(){if(!H)return;H.style.display="block",H.innerHTML="";const l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],a=40;for(let c=0;c<a;c++){const i=document.createElement("div"),p=6+Math.floor(Math.random()*6),x=Math.random()*100,E=Math.random()*.6,_=1+Math.random()*.6,U=Math.random()*360;i.style.position="absolute",i.style.top="-10%",i.style.left=`${x}%`,i.style.width=`${p}px`,i.style.height=`${p*2}px`,i.style.background=l[c%l.length],i.style.opacity="0.9",i.style.borderRadius="2px",i.style.transform=`rotate(${U}deg)`,i.style.animation=`cbsgoConfettiFall ${_}s ease-out ${E}s forwards`,H.appendChild(i)}}function we(){return Math.floor(Math.random()*o.length)}function at(){f=[];for(let l=0;l<t;l++){const a=[];for(let c=0;c<n;c++)Math.random()<b?a.push(u):a.push(we());f.push(a)}}function K(l){return l===u}function C(){if(ne){ne.innerHTML="";for(let l=0;l<t;l++)for(let a=0;a<n;a++){const c=f[l][a],i=document.createElement("div");i.dataset.row=String(l),i.dataset.col=String(a),i.style.borderRadius="12px",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center",i.style.cursor=S?"default":"pointer",i.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",i.style.fontSize="20px",K(c)?(i.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",i.textContent="💥"):(i.style.background=o[c]||"#444",i.textContent=r[c]||"⬛"),g&&g.row===l&&g.col===a&&(i.style.outline="2px solid #fff",i.style.outlineOffset="2px"),i.addEventListener("click",()=>{ze(l,a)}),i.addEventListener("touchstart",p=>{if(S)return;const x=p.touches[0];w={row:l,col:a,x:x.clientX,y:x.clientY}}),i.addEventListener("touchend",p=>{if(!w||S)return;const x=p.changedTouches[0],E=x.clientX-w.x,_=x.clientY-w.y;if(Math.sqrt(E*E+_*_)<18){ze(l,a),w=null;return}let z=w.row,O=w.col;Math.abs(E)>Math.abs(_)?E>0?O+=1:O-=1:_>0?z+=1:z-=1,z>=0&&z<t&&O>=0&&O<n&&Ce(w.row,w.col,z,O),w=null,p.preventDefault()}),ne.appendChild(i)}}}function Se(l,a){if(!l||!a)return!1;const c=Math.abs(l.row-a.row),i=Math.abs(l.col-a.col);return c+i===1}function _e(l,a){const c=f[l.row][l.col];f[l.row][l.col]=f[a.row][a.col],f[a.row][a.col]=c}function ke(){const l=new Set;for(let a=0;a<t;a++){let c=f[a][0],i=0;for(let p=1;p<=n;p++){const x=p<n?f[a][p]:null;if(x===c)continue;const E=p-i;if(c!=null&&E>=3)for(let _=i;_<p;_++)l.add(`${a},${_}`);c=x,i=p}}for(let a=0;a<n;a++){let c=f[0][a],i=0;for(let p=1;p<=t;p++){const x=p<t?f[p][a]:null;if(x===c)continue;const E=p-i;if(c!=null&&E>=3)for(let _=i;_<p;_++)l.add(`${_},${a}`);c=x,i=p}}return l}function Me(l){if(!l||!l.size)return 0;const a=l.size;m+=a*4,me&&(me.textContent=String(m)),!S&&m>=s&&oe(!0);for(const c of l){const[i,p]=c.split(","),x=Number(i),E=Number(p);f[x][E]=null}for(let c=0;c<n;c++){let i=t-1;for(let p=t-1;p>=0;p--)f[p][c]!=null&&(f[i][c]=f[p][c],i--);for(let p=i;p>=0;p--)Math.random()<b?f[p][c]=u:f[p][c]=we()}return a}function lt(l,a){const c=new Set;for(let i=0;i<n;i++)c.add(`${l},${i}`);for(let i=0;i<t;i++)c.add(`${i},${a}`);Me(c),C(),S||setTimeout(()=>Ee(!1),120)}function Ee(l=!1){if(S)return;y=!0;const a=()=>{if(S){y=!0;return}const c=ke();if(!c.size){y=!1,C(),l&&!S&&(v<=0?B():N("Nice! Keep matching."));return}Me(c),C(),setTimeout(a,120)};a()}function oe(l){if(!S)if(S=!0,y=!0,l){N("Great job! Puzzle completed 🎉");try{e?.id&&Ge(e.id),G(10)}catch{}st(),setTimeout(()=>{re()},1600)}else N("Out of moves. Try again next time 🙂")}function B(){m>=s?oe(!0):v<=0&&oe(!1)}function Ce(l,a,c,i){if(y||S)return;if(v<=0){B();return}const p={row:l,col:a},x={row:c,col:i};if(!Se(p,x))return;const E=f[l][a],_=f[c][i],U=K(E)||K(_);if(_e(p,x),g=null,v--,ye&&(ye.textContent=String(v)),U){C();const z=K(f[l][a])?{row:l,col:a}:{row:c,col:i};lt(z.row,z.col),B();return}if(!ke().size){_e(p,x),C(),N("No match… try another swap."),B();return}N(""),C(),Ee(!0)}function ze(l,a){if(y||S)return;if(v<=0){B();return}const c={row:l,col:a};if(!g){g=c,C();return}if(g.row===l&&g.col===a){g=null,C();return}if(!Se(g,c)){g=c,C();return}Ce(g.row,g.col,c.row,c.col)}function Le(){re()}xe&&(xe.onclick=Le),ve&&(ve.onclick=()=>{Le()}),at(),C(),N("Tap or swipe two neighboring tiles to swap them.")}function ht(){const e=Q(),t=ee(),n=Re(),o=Fe(),r=o>0?Math.min(100,Math.round(n/o*100)):0;return`
    <div id="cbsgoXpBarInner" style="
      min-width:140px;
      max-width:210px;
      font-family:system-ui,sans-serif;
      color:#fff;
      font-size:11px;
    ">
      <div id="cbsgoXpLabel" style="
        font-weight:700;
        font-size:11px;
        margin-bottom:4px;
        text-align:right;
      ">
        Level ${t}
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
          width:${r}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 10px rgba(168,85,247,.65);
          transition:width .25s ease-out;
        "></div>
      </div>

      <div id="cbsgoXpText" style="
        margin-top:3px;
        opacity:.8;
        text-align:right;
      ">
        ${n}/${o} XP · total ${e}
      </div>
    </div>
  `}const Ke="cbsgo_inventory_v1";function xt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function vt(){return{tickets:0,cbs:0}}function T(){const e=localStorage.getItem(Ke),t=xt(e,vt());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Ue(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Ke,JSON.stringify(t))}function wt(){return Number(T().tickets||0)}function St(){return Number(T().cbs||0)}function te(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+t,Ue(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function _t(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.cbs=Number(n.cbs||0)+t,Ue(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const qe="cbsgo_steps_v6",kt="cbsgo_gps_autostart_v2",We="cbsgo_daily_puzzle_v1",Mt=.75,Et=200,Ct=.3,zt=400,Lt=20,ie=1500,se=200,Nt=.25,Pt=.05,At=.3;let q=null,W=!1,L={msg:"init"};function It(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Tt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function $(){const e=localStorage.getItem(qe);return It(e,Tt())}function Xe(e){e.updatedAt=Date.now(),localStorage.setItem(qe,JSON.stringify(e))}function X(){return Number($().steps||0)}function $t(){const e=$();return Number(e.meters||0)}function Bt(){return $t()/1e3}function le(){return!!W}function Ot(){return L}function pe(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Dt(){try{return localStorage.getItem(We)===pe()}catch{return!1}}function Rt(){try{localStorage.setItem(We,pe())}catch{}}function Ft(e,t){return Dt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:pe()}})),Rt(),!0)}function Pe(){const e=$(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function jt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<ie)return;const s=Math.floor(r/ie);s<=0||(te(s),e.boostLastStep=n+s*ie)}function Gt(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<se){e.chestMeters=t;return}let n=0;for(;t>=se&&n<5;)if(t-=se,n+=1,Math.random()<Nt){const o=Math.random()<Pt,r=o?10:3,s=o?2:1;G(r),te(s);const d=o&&Math.random()<At;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:s,rare:o,hasCBSFlag:d}}));break}e.chestMeters=t}function Ht(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),s=o(t.lng-e.lng),d=o(e.lat),u=o(t.lat),b=Math.sin(r/2)**2+Math.cos(d)*Math.cos(u)*Math.sin(s/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function Kt(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const u=n-o;u>0&&(G(u),e.xpKmAwarded=n)}const s=Math.floor(t/2500),d=Number(e.ticketChunksAwarded||0);if(s>d){const u=s-d;u>0&&(te(u),e.ticketChunksAwarded=s)}}function Ut(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return $();const n=$();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Mt);return o>n.steps&&(n.steps=o),Kt(n),jt(n),Gt(n),Xe(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function qt(){q!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(q),q=null}async function Ae(e={}){const t=!!e.silent;if(!navigator.geolocation)return L={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(kt,"1")}catch{}qt(),W=!0,L={msg:"requesting",t:Date.now()};try{return q=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,s=n.coords.accuracy||999,d=Date.now(),u=$(),b=u.lastPos;u.lastPos={lat:o,lng:r,t:d},Xe(u);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,g=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:s,heading:f,speed:g,t:d}})),s>Et){L={lat:o,lng:r,acc:s,t:d,reason:"accuracy",boostMs:Pe()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}));return}Ft(o,r);let m=0,v=0,y=0,S=0,w="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(m=Ht({lat:b.lat,lng:b.lng},{lat:o,lng:r}),v=Math.max(1,(d-b.t)/1e3),y=m/v,m<Ct?w="jitter":m>zt?w="teleport":y>Lt?w="too-fast":(Ut(m),S=m,w="ok")),L={lat:o,lng:r,acc:s,t:d,dist:Math.round(m),dt:Math.round(v),speed:Number(y.toFixed(2)),added:Math.round(S),reason:w,boostMs:Pe()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},n=>{W=!1,L={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return W=!1,L={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Wt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>le()||await Ae({silent:!0}))();const t=async()=>{le()||await Ae({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&G(n),o>0&&te(o),r>0&&_t(r)}));function Xt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ye(){const e=X(),t=Bt(),n=le(),o=Ot()||{};let r="";return n?o.err?r=`GPS error: ${o.err}`:o.reason==="accuracy"?r="GPS active • low accuracy":r="GPS active":r="GPS paused",`
    <div id="cbsgoStepsCard" style="
      min-width:150px;
      max-width:210px;
      font-family:system-ui,sans-serif;
      font-size:11px;

      /* kaartje zelf: licht, zodat donkere tekst goed leesbaar is */
      background:rgba(255,255,255,0.9);
      color:#111827;
      border-radius:14px;
      padding:8px 10px;
      box-shadow:0 10px 24px rgba(0,0,0,.35);
    ">
      <div style="
        font-weight:800;
        font-size:11px;
        margin-bottom:4px;
      ">
        Steps
      </div>

      <div style="
        display:flex;
        align-items:baseline;
        gap:6px;
      ">
        <div style="font-size:20px; font-weight:900;">
          ${e}
        </div>
        <div style="font-size:11px; color:#374151;">
          steps · ${t.toFixed(2)} km
        </div>
      </div>

      <div style="
        margin-top:3px;
        font-size:10px;
        color:#4b5563;
      ">
        ${Xt(r)}
      </div>
    </div>
  `}function Ve(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Yt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const Ze="cbsgo_player_name_v2",fe="cbsgo_player_avatar_v2";function Je(){try{return localStorage.getItem(Ze)||"Sovereign"}catch{return"Sovereign"}}function Vt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Ze,t)}catch{}return t}function Qe(){try{return localStorage.getItem(fe)||""}catch{return""}}function Zt(e){const t=String(e||"");try{localStorage.setItem(fe,t)}catch{}return t}function Jt(){try{localStorage.removeItem(fe)}catch{}}let h=null,D=null,R=null,P=null,k=null,Y=!1;const Qt=6,en=80,tn=220,nn=6e4,Ie=65,Te=70,on=350,rn=.35;let ce=0,Z=0,V=null;function I(e){return document.getElementById(e)}function A(e){const t=I("cbsgoMapHost");if(!t)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function sn(){const e=String(Je()||"").trim();return e?e[0].toUpperCase():"🙂"}function an(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ge(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),s=o(t.lng-e.lng),d=o(e.lat),u=o(t.lat),b=Math.sin(r/2)**2+Math.cos(d)*Math.cos(u)*Math.sin(s/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function ln(e){const t=Qe();if(t){const r=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${t}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return e.divIcon({html:r,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const o=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${an(sn())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function cn(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function dn(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
        background:rgba(0,0,0,.85);
        display:flex;align-items:center;justify-content:center;
        font-size:11px;
      ">
        ${n}
      </div>
    </div>
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function un(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"2°":"5°"}`}function et(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,s=o*Math.cos(r)/111111,d=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+s,lng:e.lng+d}}function pn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function fn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function gn(e){if(!h||!P||!e)return;const t=Date.now();if(t-ce<nn||P.getLayers().length>=Qt)return;const o=window.L;if(!o)return;const r=pn(),s=et(e,en,tn),d=dn(o,r),u=o.marker([s.lat,s.lng],{icon:d});u.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const b={lat:k[0],lng:k[1]},f={lat:s.lat,lng:s.lng},g=ge(b,f);if(g>Ie){alert(`Too far to open this gift.

Distance: ${Math.round(g)}m
Needed: ≤ ${Ie}m`);return}P.removeLayer(u);const m=fn(r),v=`You found a gift!

Reward: ${m.text}`;alert(v);const y={kind:r,...m};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:y}))}catch{}}),u.addTo(P),ce=t}function bn(e){if(!h||!R||!e||V||Z<on||Math.random()>rn)return;Z=0;const t=window.L;if(!t)return;const n=et(e,60,140),o=cn(t),r=t.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const s={lat:k[0],lng:k[1]},d={lat:n.lat,lng:n.lng},u=ge(s,d);if(u>Te){alert(`Too far to start this puzzle.

Distance: ${Math.round(u)}m
Needed: ≤ ${Te}m`);return}R.removeLayer(r),V=null,ae({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(R),V=r}function mn(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Weer-bolletje linksboven (fake) -->
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
        <span>${un()}</span>
      </div>

      <!-- Kompas + centreer-player RECHTSONDER, groot als Profile/Bag -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;
        bottom:148px;
        z-index:3000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
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
  `}function yn(){try{h&&(h.remove(),h=null,D=null,R=null,P=null,k=null,Y=!1,ce=0,Z=0,V=null)}catch{}}function hn(){const e=window.L,t=I("cbsgoMap");if(!e||!t)return!1;yn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return h=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(h),h.setMaxBounds(n),h.setView([51.687,4.87],16),R=e.layerGroup().addTo(h),P=e.layerGroup().addTo(h),!0}function xn(e){const t=window.L;if(!t||!h)return;const n=ln(t);if(!D){D=t.marker(e,{icon:n}).addTo(h),h.setView(e,18);return}D.setIcon(n),D.setLatLng(e)}function vn(){!navigator.geolocation||!h||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n},s=k?{lat:k[0],lng:k[1]}:null;if(k=[t,n],xn([t,n]),s){const d=ge(s,r);Number.isFinite(d)&&d>1&&(Z+=d)}bn(r),gn(r),A(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{A(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function wn(){let e=0;const t=120,n=()=>{if(e++,!I("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(A("Loading map engine…"),e<t)return setTimeout(n,100);A("Map engine failed to load (Leaflet not found). Refresh.");return}if(!hn()){A("Could not init map. Refresh.");return}const r=I("cbsgoCenterBtn");r&&(r.onclick=()=>{h&&k&&h.setView(k,18)});const s=I("cbsgoCompassBtn");s&&(s.onclick=()=>{h&&(Y=!Y,Y?h.setView([51.687,4.87],3):k&&h.setView(k,16))}),A("Loading GPS…"),vn()};n()}function tt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Sn(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
    <div style="
      width:${t}px;height:${t}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${n}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">${e?"":"👤"}</div>
  `}function be(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function de(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function $e(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${tt(e)}</div>
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
          ${t}
        </div>
      </div>
    </div>
  `}function _n(){const e=Je(),t=Qe();return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      /* 🔧 binnenste kaart transparanter (ongeveer 70% transparant) */
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Profile</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your nickname and avatar stay on this device only.
      </p>

      <div style="
        display:flex;
        gap:14px;
        align-items:center;
        flex-wrap:wrap;
      ">
        ${Sn(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${tt(e)}" maxlength="24" style="
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

          <div id="profileMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
        </div>
      </div>
    </section>
  `}function kn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=d=>{const u=document.querySelector("#profileMsg");u&&(u.textContent=d||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const s=()=>{if(!e)return;const d=Vt(e.value);r(`✅ Name saved: ${d}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(s,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),s()})),t&&t.addEventListener("change",()=>{const d=t.files&&t.files[0];if(!d)return;if(d.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const u=new FileReader;u.onload=()=>{Zt(String(u.result||"")),r("✅ Photo saved"),j()},u.onerror=()=>r("⛔ Failed to read image."),u.readAsDataURL(d)}),n&&(n.onclick=()=>{Jt(),r("✅ Photo removed"),j()})}function Mn(){const e=wt(),t=St();return`
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
          🎟️ Tickets: <b>${e}</b>
        </div>

        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🪙 CBS (play money): <b>${t}</b>
        </div>
      </div>
    </section>
  `}function nt(){const e=be();return e==="profile"?$e("Profile",`<div id="profileMount">${_n()}</div>`):e==="bag"?$e("Bag",`<div id="bagMount">${Mn()}</div>`):""}function En(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${mn()}
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
          ${ht()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Ye()}
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
        ${nt()}
      </div>

      ${Ve()?`<button id="resetBtn" type="button" style="
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
  `}function j(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=nt(),be()==="profile"&&kn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{de("map"),j()})}function Cn(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=be();de(n===t?"map":t||"map"),j()})})}function ot(){const e=document.querySelector("#app");if(e){if(e.innerHTML=En(),Cn(),wn(),Wt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Ye())};window.addEventListener("cbsgo:stepsChanged",t)}if(j(),Ve()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Yt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){ae({id:"__daily__",name:"Daily Glow"});return}if(je(n))return;const o=ft.find(r=>r.id===n);o&&ae(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&pt(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>mt);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),ot()})}))}}function rt(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function J(e){const t=rt();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";J(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{J(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Be(){try{if(!document.getElementById("app")){J("❌ #app not found in index.html");return}ot();const t=rt();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){J(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Be,{once:!0}):Be();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
