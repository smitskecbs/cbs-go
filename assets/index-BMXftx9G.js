(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const ut="modulepreload",pt=function(e){return"/cbs-go/"+e},Le={},ft=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(g){return Promise.all(g.map(m=>Promise.resolve(m).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var d=f;document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),b=u?.nonce||u?.getAttribute("nonce");r=f(n.map(g=>{if(g=pt(g),g in Le)return;Le[g]=!0;const m=g.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${v}`))return;const y=document.createElement("link");if(y.rel=m?"stylesheet":ut,m||(y.as="script"),y.crossOrigin="",y.href=g,b&&y.setAttribute("nonce",b),document.head.appendChild(y),m)return new Promise((S,w)=>{y.addEventListener("load",S),y.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${g}`)))})}))}function s(u){const b=new Event("vite:preloadError",{cancelable:!0});if(b.payload=u,window.dispatchEvent(b),!b.defaultPrevented)throw u}return r.then(u=>{for(const b of u||[])b.status==="rejected"&&s(b.reason);return t().catch(s)})},gt=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Oe="cbsgo_state_v6";function bt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function mt(){return{xp:0,completed:{},updatedAt:Date.now()}}function D(){const e=localStorage.getItem(Oe);return bt(e,mt())}function Re(e){e.updatedAt=Date.now(),localStorage.setItem(Oe,JSON.stringify(e))}function De(e){return 100+(Math.max(1,Number(e||1))-1)*40}function Q(){return Number(D().xp||0)}function ce(){const e=Q();let t=1,n=e;for(;;){const o=De(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function Fe(){const e=Q();let t=1,n=e;for(;;){const o=De(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function H(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return D();const n=D();return n.xp=Number(n.xp||0)+t,Re(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:ce()}})),n}function je(e){const t=String(e||"");if(!t)return!1;const n=D();return!!(n.completed&&n.completed[t])}function He(e){const t=String(e||"");if(!t)return;const n=D();n.completed||(n.completed={}),n.completed[t]=Date.now(),Re(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const yt=Object.freeze(Object.defineProperty({__proto__:null,addXp:H,completeNode:He,getLevel:ce,getXp:Q,getXpIntoLevel:Fe,isNodeCompleted:je},Symbol.toStringTag,{value:"Module"})),Ke="cbsgoPuzzleModal";function ht(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oe(){const e=document.getElementById(Ke);e&&e.remove()}function se(e){oe();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],s=180,d=18,u=o.length,b=.01;let f=[],g=null,m=0,v=d,y=!1,S=!1,w=null;const st=e?.name||"CBS GO Puzzle",M=document.createElement("div");M.id=Ke,M.style.position="fixed",M.style.inset="0",M.style.zIndex="999999",M.style.display="flex",M.style.alignItems="center",M.style.justifyContent="center",M.style.padding="16px",M.style.background="rgba(0,0,0,.70)",M.style.backdropFilter="blur(12px)",M.style.fontFamily="system-ui, sans-serif",M.style.color="#fff",M.innerHTML=`
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
          ${ht(st)}
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
  `,document.body.appendChild(M);const te=document.getElementById("cbsgoBoard"),ge=document.getElementById("cbsgoScore"),be=document.getElementById("cbsgoMoves"),me=document.getElementById("cbsgoStatus"),ye=document.getElementById("cbsgoPuzzleClose"),he=document.getElementById("cbsgoPuzzleOk"),K=document.getElementById("cbsgoConfettiLayer");function z(l){me&&(me.textContent=l||"")}function at(){if(!K)return;K.style.display="block",K.innerHTML="";const l=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],a=40;for(let c=0;c<a;c++){const i=document.createElement("div"),p=6+Math.floor(Math.random()*6),x=Math.random()*100,E=Math.random()*.6,_=1+Math.random()*.6,q=Math.random()*360;i.style.position="absolute",i.style.top="-10%",i.style.left=`${x}%`,i.style.width=`${p}px`,i.style.height=`${p*2}px`,i.style.background=l[c%l.length],i.style.opacity="0.9",i.style.borderRadius="2px",i.style.transform=`rotate(${q}deg)`,i.style.animation=`cbsgoConfettiFall ${_}s ease-out ${E}s forwards`,K.appendChild(i)}}function xe(){return Math.floor(Math.random()*o.length)}function lt(){f=[];for(let l=0;l<t;l++){const a=[];for(let c=0;c<n;c++)Math.random()<b?a.push(u):a.push(xe());f.push(a)}}function U(l){return l===u}function C(){if(te){te.innerHTML="";for(let l=0;l<t;l++)for(let a=0;a<n;a++){const c=f[l][a],i=document.createElement("div");i.dataset.row=String(l),i.dataset.col=String(a),i.style.borderRadius="12px",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center",i.style.cursor=S?"default":"pointer",i.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",i.style.fontSize="20px",U(c)?(i.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",i.textContent="💥"):(i.style.background=o[c]||"#444",i.textContent=r[c]||"⬛"),g&&g.row===l&&g.col===a&&(i.style.outline="2px solid #fff",i.style.outlineOffset="2px"),i.addEventListener("click",()=>{Ee(l,a)}),i.addEventListener("touchstart",p=>{if(S)return;const x=p.touches[0];w={row:l,col:a,x:x.clientX,y:x.clientY}}),i.addEventListener("touchend",p=>{if(!w||S)return;const x=p.changedTouches[0],E=x.clientX-w.x,_=x.clientY-w.y;if(Math.sqrt(E*E+_*_)<18){Ee(l,a),w=null;return}let L=w.row,B=w.col;Math.abs(E)>Math.abs(_)?E>0?B+=1:B-=1:_>0?L+=1:L-=1,L>=0&&L<t&&B>=0&&B<n&&Me(w.row,w.col,L,B),w=null,p.preventDefault()}),te.appendChild(i)}}}function ve(l,a){if(!l||!a)return!1;const c=Math.abs(l.row-a.row),i=Math.abs(l.col-a.col);return c+i===1}function we(l,a){const c=f[l.row][l.col];f[l.row][l.col]=f[a.row][a.col],f[a.row][a.col]=c}function Se(){const l=new Set;for(let a=0;a<t;a++){let c=f[a][0],i=0;for(let p=1;p<=n;p++){const x=p<n?f[a][p]:null;if(x===c)continue;const E=p-i;if(c!=null&&E>=3)for(let _=i;_<p;_++)l.add(`${a},${_}`);c=x,i=p}}for(let a=0;a<n;a++){let c=f[0][a],i=0;for(let p=1;p<=t;p++){const x=p<t?f[p][a]:null;if(x===c)continue;const E=p-i;if(c!=null&&E>=3)for(let _=i;_<p;_++)l.add(`${_},${a}`);c=x,i=p}}return l}function _e(l){if(!l||!l.size)return 0;const a=l.size;m+=a*4,ge&&(ge.textContent=String(m)),!S&&m>=s&&ne(!0);for(const c of l){const[i,p]=c.split(","),x=Number(i),E=Number(p);f[x][E]=null}for(let c=0;c<n;c++){let i=t-1;for(let p=t-1;p>=0;p--)f[p][c]!=null&&(f[i][c]=f[p][c],i--);for(let p=i;p>=0;p--)Math.random()<b?f[p][c]=u:f[p][c]=xe()}return a}function ct(l,a){const c=new Set;for(let i=0;i<n;i++)c.add(`${l},${i}`);for(let i=0;i<t;i++)c.add(`${i},${a}`);_e(c),C(),S||setTimeout(()=>ke(!1),120)}function ke(l=!1){if(S)return;y=!0;const a=()=>{if(S){y=!0;return}const c=Se();if(!c.size){y=!1,C(),l&&!S&&(v<=0?$():z("Nice! Keep matching."));return}_e(c),C(),setTimeout(a,120)};a()}function ne(l){if(!S)if(S=!0,y=!0,l){z("Great job! Puzzle completed 🎉");try{e?.id&&He(e.id),H(10)}catch{}at(),setTimeout(()=>{oe()},1600)}else z("Out of moves. Try again next time 🙂")}function $(){m>=s?ne(!0):v<=0&&ne(!1)}function Me(l,a,c,i){if(y||S)return;if(v<=0){$();return}const p={row:l,col:a},x={row:c,col:i};if(!ve(p,x))return;const E=f[l][a],_=f[c][i],q=U(E)||U(_);if(we(p,x),g=null,v--,be&&(be.textContent=String(v)),q){C();const L=U(f[l][a])?{row:l,col:a}:{row:c,col:i};ct(L.row,L.col),$();return}if(!Se().size){we(p,x),C(),z("No match… try another swap."),$();return}z(""),C(),ke(!0)}function Ee(l,a){if(y||S)return;if(v<=0){$();return}const c={row:l,col:a};if(!g){g=c,C();return}if(g.row===l&&g.col===a){g=null,C();return}if(!ve(g,c)){g=c,C();return}Me(g.row,g.col,c.row,c.col)}function Ce(){oe()}ye&&(ye.onclick=Ce),he&&(he.onclick=()=>{Ce()}),lt(),C(),z("Tap or swipe two neighboring tiles to swap them.")}const Ue="cbsgo_inventory_v1";function xt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function vt(){return{tickets:0,cbs:0}}function T(){const e=localStorage.getItem(Ue),t=xt(e,vt());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function qe(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Ue,JSON.stringify(t))}function wt(){return Number(T().tickets||0)}function St(){return Number(T().cbs||0)}function ee(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+t,qe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function _t(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.cbs=Number(n.cbs||0)+t,qe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Ge="cbsgo_steps_v6",kt="cbsgo_gps_autostart_v2",We="cbsgo_daily_puzzle_v1",Mt=.75,Et=200,Ct=.3,Lt=400,zt=20,re=1500,ie=200,Nt=.25,Pt=.05,At=.3;let G=null,W=!1,N={msg:"init"};function It(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Tt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function F(){const e=localStorage.getItem(Ge);return It(e,Tt())}function Xe(e){e.updatedAt=Date.now(),localStorage.setItem(Ge,JSON.stringify(e))}function X(){return Number(F().steps||0)}function ze(){return!!W}function de(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function $t(){try{return localStorage.getItem(We)===de()}catch{return!1}}function Bt(){try{localStorage.setItem(We,de())}catch{}}function Ot(e,t){return $t()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:de()}})),Bt(),!0)}function Ne(){const e=F(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Rt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<re)return;const s=Math.floor(r/re);s<=0||(ee(s),e.boostLastStep=n+s*re)}function Dt(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<ie){e.chestMeters=t;return}let n=0;for(;t>=ie&&n<5;)if(t-=ie,n+=1,Math.random()<Nt){const o=Math.random()<Pt,r=o?10:3,s=o?2:1;H(r),ee(s);const d=o&&Math.random()<At;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:s,rare:o,hasCBSFlag:d}}));break}e.chestMeters=t}function Ft(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),s=o(t.lng-e.lng),d=o(e.lat),u=o(t.lat),b=Math.sin(r/2)**2+Math.cos(d)*Math.cos(u)*Math.sin(s/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function jt(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const u=n-o;u>0&&(H(u),e.xpKmAwarded=n)}const s=Math.floor(t/2500),d=Number(e.ticketChunksAwarded||0);if(s>d){const u=s-d;u>0&&(ee(u),e.ticketChunksAwarded=s)}}function Ht(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return F();const n=F();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Mt);return o>n.steps&&(n.steps=o),jt(n),Rt(n),Dt(n),Xe(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Kt(){G!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(G),G=null}async function Pe(e={}){const t=!!e.silent;if(!navigator.geolocation)return N={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(kt,"1")}catch{}Kt(),W=!0,N={msg:"requesting",t:Date.now()};try{return G=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,s=n.coords.accuracy||999,d=Date.now(),u=F(),b=u.lastPos;u.lastPos={lat:o,lng:r,t:d},Xe(u);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,g=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:s,heading:f,speed:g,t:d}})),s>Et){N={lat:o,lng:r,acc:s,t:d,reason:"accuracy",boostMs:Ne()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}));return}Ot(o,r);let m=0,v=0,y=0,S=0,w="no-last";b&&typeof b.lat=="number"&&typeof b.lng=="number"&&typeof b.t=="number"&&(m=Ft({lat:b.lat,lng:b.lng},{lat:o,lng:r}),v=Math.max(1,(d-b.t)/1e3),y=m/v,m<Ct?w="jitter":m>Lt?w="teleport":y>zt?w="too-fast":(Ht(m),S=m,w="ok")),N={lat:o,lng:r,acc:s,t:d,dist:Math.round(m),dt:Math.round(v),speed:Number(y.toFixed(2)),added:Math.round(S),reason:w,boostMs:Ne()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},n=>{W=!1,N={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return W=!1,N={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Ut(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ze()||await Pe({silent:!0}))();const t=async()=>{ze()||await Pe({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&H(n),o>0&&ee(o),r>0&&_t(r)}));function Ae(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function qt(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function Ye(){const e=Number(Q()||0),t=Number(ce()||1),n=Number(Fe()||0),o=Number(X()||0),r=Ae(n,0,100),s=Ae(r/100*100,0,100),d=qt(o);return`
    <div style="min-width:180px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; line-height:1;">Level ${t}</div>
        <div style="opacity:.85; font-size:12px; white-space:nowrap;">
          ${r}/100 XP
        </div>
      </div>

      <div style="
        margin-top:8px;
        height:8px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
      ">
        <div style="
          height:100%;
          width:${s}%;
          background:rgba(255,255,255,.75);
        "></div>
      </div>

      <div style="
        margin-top:6px;
        font-size:11px;
        opacity:.75;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:8px;
      ">
        <div>Total XP: ${e}</div>
        <div style="
          font-size:11px;
          opacity:.8;
          white-space:nowrap;
          display:flex;
          align-items:center;
          gap:4px;
        ">
          <span>👟</span>
          <span>${d} steps</span>
        </div>
      </div>
    </div>
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=Ye())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function Ve(){return""}function Ze(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Gt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const Je="cbsgo_player_name_v2",ue="cbsgo_player_avatar_v2";function Qe(){try{return localStorage.getItem(Je)||"Sovereign"}catch{return"Sovereign"}}function Wt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Je,t)}catch{}return t}function et(){try{return localStorage.getItem(ue)||""}catch{return""}}function Xt(e){const t=String(e||"");try{localStorage.setItem(ue,t)}catch{}return t}function Yt(){try{localStorage.removeItem(ue)}catch{}}let h=null,O=null,R=null,P=null,k=null,Y=!1;const Vt=6,Zt=80,Jt=220,Qt=6e4,Ie=65,Te=70,en=350,tn=.35;let ae=0,Z=0,V=null;function I(e){return document.getElementById(e)}function A(e){const t=I("cbsgoMapHost");if(!t)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function nn(){const e=String(Qe()||"").trim();return e?e[0].toUpperCase():"🙂"}function on(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function pe(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),s=o(t.lng-e.lng),d=o(e.lat),u=o(t.lat),b=Math.sin(r/2)**2+Math.cos(d)*Math.cos(u)*Math.sin(s/2)**2;return 2*6371e3*Math.asin(Math.sqrt(b))}function rn(e){const t=et();if(t){const r=`
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
    ">${on(nn())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function sn(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function an(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function ln(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"2°":"5°"}`}function tt(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,s=o*Math.cos(r)/111111,d=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+s,lng:e.lng+d}}function cn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function dn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function un(e){if(!h||!P||!e)return;const t=Date.now();if(t-ae<Qt||P.getLayers().length>=Vt)return;const o=window.L;if(!o)return;const r=cn(),s=tt(e,Zt,Jt),d=an(o,r),u=o.marker([s.lat,s.lng],{icon:d});u.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const b={lat:k[0],lng:k[1]},f={lat:s.lat,lng:s.lng},g=pe(b,f);if(g>Ie){alert(`Too far to open this gift.

Distance: ${Math.round(g)}m
Needed: ≤ ${Ie}m`);return}P.removeLayer(u);const m=dn(r),v=`You found a gift!

Reward: ${m.text}`;alert(v);const y={kind:r,...m};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:y}))}catch{}}),u.addTo(P),ae=t}function pn(e){if(!h||!R||!e||V||Z<en||Math.random()>tn)return;Z=0;const t=window.L;if(!t)return;const n=tt(e,60,140),o=sn(t),r=t.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const s={lat:k[0],lng:k[1]},d={lat:n.lat,lng:n.lng},u=pe(s,d);if(u>Te){alert(`Too far to start this puzzle.

Distance: ${Math.round(u)}m
Needed: ≤ ${Te}m`);return}R.removeLayer(r),V=null,se({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(R),V=r}function fn(){return`
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
        <span>${ln()}</span>
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
  `}function gn(){try{h&&(h.remove(),h=null,O=null,R=null,P=null,k=null,Y=!1,ae=0,Z=0,V=null)}catch{}}function bn(){const e=window.L,t=I("cbsgoMap");if(!e||!t)return!1;gn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return h=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(h),h.setMaxBounds(n),h.setView([51.687,4.87],16),R=e.layerGroup().addTo(h),P=e.layerGroup().addTo(h),!0}function mn(e){const t=window.L;if(!t||!h)return;const n=rn(t);if(!O){O=t.marker(e,{icon:n}).addTo(h),h.setView(e,18);return}O.setIcon(n),O.setLatLng(e)}function yn(){!navigator.geolocation||!h||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n},s=k?{lat:k[0],lng:k[1]}:null;if(k=[t,n],mn([t,n]),s){const d=pe(s,r);Number.isFinite(d)&&d>1&&(Z+=d)}pn(r),un(r),A(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{A(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function hn(){let e=0;const t=120,n=()=>{if(e++,!I("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(A("Loading map engine…"),e<t)return setTimeout(n,100);A("Map engine failed to load (Leaflet not found). Refresh.");return}if(!bn()){A("Could not init map. Refresh.");return}const r=I("cbsgoCenterBtn");r&&(r.onclick=()=>{h&&k&&h.setView(k,18)});const s=I("cbsgoCompassBtn");s&&(s.onclick=()=>{h&&(Y=!Y,Y?h.setView([51.687,4.87],3):k&&h.setView(k,16))}),A("Loading GPS…"),yn()};n()}function nt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function xn(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function fe(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function le(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function $e(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${nt(e)}</div>
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
  `}function vn(){const e=Qe(),t=et();return`
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
        ${xn(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${nt(e)}" maxlength="24" style="
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
  `}function wn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=d=>{const u=document.querySelector("#profileMsg");u&&(u.textContent=d||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const s=()=>{if(!e)return;const d=Wt(e.value);r(`✅ Name saved: ${d}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(s,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),s()})),t&&t.addEventListener("change",()=>{const d=t.files&&t.files[0];if(!d)return;if(d.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const u=new FileReader;u.onload=()=>{Xt(String(u.result||"")),r("✅ Photo saved"),j()},u.onerror=()=>r("⛔ Failed to read image."),u.readAsDataURL(d)}),n&&(n.onclick=()=>{Yt(),r("✅ Photo removed"),j()})}function Sn(){const e=wt(),t=St();return`
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
  `}function ot(){const e=fe();return e==="profile"?$e("Profile",`<div id="profileMount">${vn()}</div>`):e==="bag"?$e("Bag",`<div id="bagMount">${Sn()}</div>`):""}function _n(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${fn()}
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
          ${Ye()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Ve()}
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
        ${ot()}
      </div>

      ${Ze()?`<button id="resetBtn" type="button" style="
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
  `}function j(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=ot(),fe()==="profile"&&wn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{le("map"),j()})}function kn(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=fe();le(n===t?"map":t||"map"),j()})})}function rt(){const e=document.querySelector("#app");if(e){if(e.innerHTML=_n(),kn(),hn(),Ut(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Ve())};window.addEventListener("cbsgo:stepsChanged",t)}if(j(),Ze()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Gt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){se({id:"__daily__",name:"Daily Glow"});return}if(je(n))return;const o=gt.find(r=>r.id===n);o&&se(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&ft(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>yt);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),rt()})}))}}function it(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function J(e){const t=it();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";J(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{J(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Be(){try{if(!document.getElementById("app")){J("❌ #app not found in index.html");return}rt();const t=it();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){J(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Be,{once:!0}):Be();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
