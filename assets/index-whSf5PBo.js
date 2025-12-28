(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const pt="modulepreload",ft=function(e){return"/cbs-go/"+e},Ne={},gt=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(m){return Promise.all(m.map(b=>Promise.resolve(b).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var u=g;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),f=l?.nonce||l?.getAttribute("nonce");r=g(n.map(m=>{if(m=ft(m),m in Ne)return;Ne[m]=!0;const b=m.endsWith(".css"),v=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${v}`))return;const y=document.createElement("link");if(y.rel=b?"stylesheet":pt,b||(y.as="script"),y.crossOrigin="",y.href=m,f&&y.setAttribute("nonce",f),document.head.appendChild(y),b)return new Promise((S,w)=>{y.addEventListener("load",S),y.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${m}`)))})}))}function i(l){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=l,window.dispatchEvent(f),!f.defaultPrevented)throw l}return r.then(l=>{for(const f of l||[])f.status==="rejected"&&i(f.reason);return t().catch(i)})},mt=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Re="cbsgo_state_v6";function bt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function yt(){return{xp:0,completed:{},updatedAt:Date.now()}}function W(){const e=localStorage.getItem(Re);return bt(e,yt())}function De(e){e.updatedAt=Date.now(),localStorage.setItem(Re,JSON.stringify(e))}function ue(e){return 100+(Math.max(1,Number(e||1))-1)*40}function ee(){return Number(W().xp||0)}function te(){const e=ee();let t=1,n=e;for(;;){const o=ue(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function We(){const e=ee();let t=1,n=e;for(;;){const o=ue(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function je(){return ue(te())}function F(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return W();const n=W();return n.xp=Number(n.xp||0)+t,De(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:te()}})),n}function Fe(e){const t=String(e||"");if(!t)return!1;const n=W();return!!(n.completed&&n.completed[t])}function Ue(e){const t=String(e||"");if(!t)return;const n=W();n.completed||(n.completed={}),n.completed[t]=Date.now(),De(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const ht=Object.freeze(Object.defineProperty({__proto__:null,addXp:F,completeNode:Ue,getLevel:te,getXp:ee,getXpIntoLevel:We,getXpNeededThisLevel:je,isNodeCompleted:Fe},Symbol.toStringTag,{value:"Module"})),He="cbsgoPuzzleModal";function xt(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ie(){const e=document.getElementById(He);e&&e.remove()}function le(e){ie();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],i=180,u=18,l=o.length,f=.01;let g=[],m=null,b=0,v=u,y=!1,S=!1,w=null;const at=e?.name||"CBS GO Puzzle",M=document.createElement("div");M.id=He,M.style.position="fixed",M.style.inset="0",M.style.zIndex="999999",M.style.display="flex",M.style.alignItems="center",M.style.justifyContent="center",M.style.padding="16px",M.style.background="rgba(0,0,0,.70)",M.style.backdropFilter="blur(12px)",M.style.fontFamily="system-ui, sans-serif",M.style.color="#fff",M.innerHTML=`
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
          ${xt(at)}
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
          <div>Target: <span id="cbsgoTargetScore">${i}</span></div>
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
  `,document.body.appendChild(M);const oe=document.getElementById("cbsgoBoard"),be=document.getElementById("cbsgoScore"),ye=document.getElementById("cbsgoMoves"),he=document.getElementById("cbsgoStatus"),xe=document.getElementById("cbsgoPuzzleClose"),ve=document.getElementById("cbsgoPuzzleOk"),U=document.getElementById("cbsgoConfettiLayer");function z(c){he&&(he.textContent=c||"")}function lt(){if(!U)return;U.style.display="block",U.innerHTML="";const c=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],a=40;for(let d=0;d<a;d++){const s=document.createElement("div"),p=6+Math.floor(Math.random()*6),x=Math.random()*100,E=Math.random()*.6,_=1+Math.random()*.6,K=Math.random()*360;s.style.position="absolute",s.style.top="-10%",s.style.left=`${x}%`,s.style.width=`${p}px`,s.style.height=`${p*2}px`,s.style.background=c[d%c.length],s.style.opacity="0.9",s.style.borderRadius="2px",s.style.transform=`rotate(${K}deg)`,s.style.animation=`cbsgoConfettiFall ${_}s ease-out ${E}s forwards`,U.appendChild(s)}}function we(){return Math.floor(Math.random()*o.length)}function ct(){g=[];for(let c=0;c<t;c++){const a=[];for(let d=0;d<n;d++)Math.random()<f?a.push(l):a.push(we());g.push(a)}}function H(c){return c===l}function C(){if(oe){oe.innerHTML="";for(let c=0;c<t;c++)for(let a=0;a<n;a++){const d=g[c][a],s=document.createElement("div");s.dataset.row=String(c),s.dataset.col=String(a),s.style.borderRadius="12px",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.cursor=S?"default":"pointer",s.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",s.style.fontSize="20px",H(d)?(s.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",s.textContent="💥"):(s.style.background=o[d]||"#444",s.textContent=r[d]||"⬛"),m&&m.row===c&&m.col===a&&(s.style.outline="2px solid #fff",s.style.outlineOffset="2px"),s.addEventListener("click",()=>{Le(c,a)}),s.addEventListener("touchstart",p=>{if(S)return;const x=p.touches[0];w={row:c,col:a,x:x.clientX,y:x.clientY}}),s.addEventListener("touchend",p=>{if(!w||S)return;const x=p.changedTouches[0],E=x.clientX-w.x,_=x.clientY-w.y;if(Math.sqrt(E*E+_*_)<18){Le(c,a),w=null;return}let L=w.row,O=w.col;Math.abs(E)>Math.abs(_)?E>0?O+=1:O-=1:_>0?L+=1:L-=1,L>=0&&L<t&&O>=0&&O<n&&Ce(w.row,w.col,L,O),w=null,p.preventDefault()}),oe.appendChild(s)}}}function Se(c,a){if(!c||!a)return!1;const d=Math.abs(c.row-a.row),s=Math.abs(c.col-a.col);return d+s===1}function _e(c,a){const d=g[c.row][c.col];g[c.row][c.col]=g[a.row][a.col],g[a.row][a.col]=d}function ke(){const c=new Set;for(let a=0;a<t;a++){let d=g[a][0],s=0;for(let p=1;p<=n;p++){const x=p<n?g[a][p]:null;if(x===d)continue;const E=p-s;if(d!=null&&E>=3)for(let _=s;_<p;_++)c.add(`${a},${_}`);d=x,s=p}}for(let a=0;a<n;a++){let d=g[0][a],s=0;for(let p=1;p<=t;p++){const x=p<t?g[p][a]:null;if(x===d)continue;const E=p-s;if(d!=null&&E>=3)for(let _=s;_<p;_++)c.add(`${_},${a}`);d=x,s=p}}return c}function Me(c){if(!c||!c.size)return 0;const a=c.size;b+=a*4,be&&(be.textContent=String(b)),!S&&b>=i&&re(!0);for(const d of c){const[s,p]=d.split(","),x=Number(s),E=Number(p);g[x][E]=null}for(let d=0;d<n;d++){let s=t-1;for(let p=t-1;p>=0;p--)g[p][d]!=null&&(g[s][d]=g[p][d],s--);for(let p=s;p>=0;p--)Math.random()<f?g[p][d]=l:g[p][d]=we()}return a}function dt(c,a){const d=new Set;for(let s=0;s<n;s++)d.add(`${c},${s}`);for(let s=0;s<t;s++)d.add(`${s},${a}`);Me(d),C(),S||setTimeout(()=>Ee(!1),120)}function Ee(c=!1){if(S)return;y=!0;const a=()=>{if(S){y=!0;return}const d=ke();if(!d.size){y=!1,C(),c&&!S&&(v<=0?B():z("Nice! Keep matching."));return}Me(d),C(),setTimeout(a,120)};a()}function re(c){if(!S)if(S=!0,y=!0,c){z("Great job! Puzzle completed 🎉");try{e?.id&&Ue(e.id),F(10)}catch{}lt(),setTimeout(()=>{ie()},1600)}else z("Out of moves. Try again next time 🙂")}function B(){b>=i?re(!0):v<=0&&re(!1)}function Ce(c,a,d,s){if(y||S)return;if(v<=0){B();return}const p={row:c,col:a},x={row:d,col:s};if(!Se(p,x))return;const E=g[c][a],_=g[d][s],K=H(E)||H(_);if(_e(p,x),m=null,v--,ye&&(ye.textContent=String(v)),K){C();const L=H(g[c][a])?{row:c,col:a}:{row:d,col:s};dt(L.row,L.col),B();return}if(!ke().size){_e(p,x),C(),z("No match… try another swap."),B();return}z(""),C(),Ee(!0)}function Le(c,a){if(y||S)return;if(v<=0){B();return}const d={row:c,col:a};if(!m){m=d,C();return}if(m.row===c&&m.col===a){m=null,C();return}if(!Se(m,d)){m=d,C();return}Ce(m.row,m.col,d.row,d.col)}function ze(){ie()}xe&&(xe.onclick=ze),ve&&(ve.onclick=()=>{ze()}),ct(),C(),z("Tap or swipe two neighboring tiles to swap them.")}const Ke="cbsgo_inventory_v1";function vt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function wt(){return{tickets:0,cbs:0}}function T(){const e=localStorage.getItem(Ke),t=vt(e,wt());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function qe(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Ke,JSON.stringify(t))}function St(){return Number(T().tickets||0)}function _t(){return Number(T().cbs||0)}function ne(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+t,qe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function kt(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.cbs=Number(n.cbs||0)+t,qe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Ge="cbsgo_steps_v6",Mt="cbsgo_gps_autostart_v2",Xe="cbsgo_daily_puzzle_v1",Et=.75,Ct=200,Lt=.3,zt=400,Nt=20,se=1500,ae=200,Pt=.25,At=.05,It=.3;let q=null,G=!1,N={msg:"init"};function Tt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function $t(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function $(){const e=localStorage.getItem(Ge);return Tt(e,$t())}function Ye(e){e.updatedAt=Date.now(),localStorage.setItem(Ge,JSON.stringify(e))}function X(){return Number($().steps||0)}function Bt(){const e=$();return Number(e.meters||0)}function Ot(){return Bt()/1e3}function Pe(){return!!G}function pe(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Rt(){try{return localStorage.getItem(Xe)===pe()}catch{return!1}}function Dt(){try{localStorage.setItem(Xe,pe())}catch{}}function Wt(e,t){return Rt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:pe()}})),Dt(),!0)}function Ae(){const e=$(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function jt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<se)return;const i=Math.floor(r/se);i<=0||(ne(i),e.boostLastStep=n+i*se)}function Ft(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<ae){e.chestMeters=t;return}let n=0;for(;t>=ae&&n<5;)if(t-=ae,n+=1,Math.random()<Pt){const o=Math.random()<At,r=o?10:3,i=o?2:1;F(r),ne(i);const u=o&&Math.random()<It;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:u}}));break}e.chestMeters=t}function Ut(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),u=o(e.lat),l=o(t.lat),f=Math.sin(r/2)**2+Math.cos(u)*Math.cos(l)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(f))}function Ht(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const l=n-o;l>0&&(F(l),e.xpKmAwarded=n)}const i=Math.floor(t/2500),u=Number(e.ticketChunksAwarded||0);if(i>u){const l=i-u;l>0&&(ne(l),e.ticketChunksAwarded=i)}}function Kt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return $();const n=$();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Et);return o>n.steps&&(n.steps=o),Ht(n),jt(n),Ft(n),Ye(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function qt(){q!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(q),q=null}async function Ie(e={}){const t=!!e.silent;if(!navigator.geolocation)return N={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Mt,"1")}catch{}qt(),G=!0,N={msg:"requesting",t:Date.now()};try{return q=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,u=Date.now(),l=$(),f=l.lastPos;l.lastPos={lat:o,lng:r,t:u},Ye(l);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,m=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:m,t:u}})),i>Ct){N={lat:o,lng:r,acc:i,t:u,reason:"accuracy",boostMs:Ae()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}));return}Wt(o,r);let b=0,v=0,y=0,S=0,w="no-last";f&&typeof f.lat=="number"&&typeof f.lng=="number"&&typeof f.t=="number"&&(b=Ut({lat:f.lat,lng:f.lng},{lat:o,lng:r}),v=Math.max(1,(u-f.t)/1e3),y=b/v,b<Lt?w="jitter":b>zt?w="teleport":y>Nt?w="too-fast":(Kt(b),S=b,w="ok")),N={lat:o,lng:r,acc:i,t:u,dist:Math.round(b),dt:Math.round(v),speed:Number(y.toFixed(2)),added:Math.round(S),reason:w,boostMs:Ae()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},n=>{G=!1,N={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return G=!1,N={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Gt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>Pe()||await Ie({silent:!0}))();const t=async()=>{Pe()||await Ie({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&F(n),o>0&&ne(o),r>0&&kt(r)}));function Xt(){const e=ee(),t=te(),n=We(),o=je(),r=X(),i=Ot(),u=o>0?Math.min(100,Math.round(n/o*100)):0;return`
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
          width:${u}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 10px rgba(168,85,247,.65);
          transition:width .25s ease-out;
        "></div>
      </div>

      <!-- Tekst onder de balk: XP + stappen -->
      <div id="cbsgoXpText" style="
        margin-top:3px;
        opacity:.9;
        text-align:right;
        line-height:1.3;
      ">
        <div>${n}/${o} XP · total ${e}</div>
        <div>${r} steps · ${i.toFixed(2)} km</div>
      </div>
    </div>
  `}function Ve(){return""}function Ze(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Yt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const Je="cbsgo_player_name_v2",fe="cbsgo_player_avatar_v2";function Qe(){try{return localStorage.getItem(Je)||"Sovereign"}catch{return"Sovereign"}}function Vt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Je,t)}catch{}return t}function et(){try{return localStorage.getItem(fe)||""}catch{return""}}function Zt(e){const t=String(e||"");try{localStorage.setItem(fe,t)}catch{}return t}function Jt(){try{localStorage.removeItem(fe)}catch{}}let h=null,R=null,D=null,P=null,k=null,Y=!1,V={temp:null,iconEmoji:"⛅",lastUpdated:0};const Qt="48a387bba00043ac4ba5823371abc9d2",en=6,tn=80,nn=220,on=6e4,Te=65,$e=70,rn=350,sn=.35;let ce=0,J=0,Z=null;function I(e){return document.getElementById(e)}function A(e){const t=I("cbsgoMapHost");if(!t)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function an(){const e=String(Qe()||"").trim();return e?e[0].toUpperCase():"🙂"}function ln(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ge(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),u=o(e.lat),l=o(t.lat),f=Math.sin(r/2)**2+Math.cos(u)*Math.cos(l)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(f))}function cn(e){const t=et();if(t){const r=`
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
    ">${ln(an())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function dn(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function un(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function tt(){const{temp:e,iconEmoji:t}=V;return e==null?"⛅ …°":`${t} ${Math.round(e)}°`}async function pn(e,t){const n=Date.now();if(!(V.lastUpdated&&n-V.lastUpdated<300*1e3))try{const o=`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&appid=${Qt}&units=metric`,r=await fetch(o);if(!r.ok)throw new Error("HTTP "+r.status);const i=await r.json(),u=i?.main?.temp,l=i?.weather?.[0]?.icon||"01d";let f="⛅";l.startsWith("01")?f="☀️":l.startsWith("02")?f="🌤️":l.startsWith("03")||l.startsWith("04")?f="☁️":l.startsWith("09")||l.startsWith("10")?f="🌧️":l.startsWith("11")?f="⛈️":l.startsWith("13")?f="❄️":l.startsWith("50")&&(f="🌫️"),V={temp:u,iconEmoji:f,lastUpdated:n};const g=document.getElementById("cbsgoWeather");if(g){const m=g.querySelector("span");m&&(m.textContent=tt())}}catch(o){console.warn("Weather fetch failed",o)}}function nt(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,u=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+u}}function fn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function gn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function mn(e){if(!h||!P||!e)return;const t=Date.now();if(t-ce<on||P.getLayers().length>=en)return;const o=window.L;if(!o)return;const r=fn(),i=nt(e,tn,nn),u=un(o,r),l=o.marker([i.lat,i.lng],{icon:u});l.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:k[0],lng:k[1]},g={lat:i.lat,lng:i.lng},m=ge(f,g);if(m>Te){alert(`Too far to open this gift.

Distance: ${Math.round(m)}m
Needed: ≤ ${Te}m`);return}P.removeLayer(l);const b=gn(r),v=`You found a gift!

Reward: ${b.text}`;alert(v);const y={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:y}))}catch{}}),l.addTo(P),ce=t}function bn(e){if(!h||!D||!e||Z||J<rn||Math.random()>sn)return;J=0;const t=window.L;if(!t)return;const n=nt(e,60,140),o=dn(t),r=t.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const i={lat:k[0],lng:k[1]},u={lat:n.lat,lng:n.lng},l=ge(i,u);if(l>$e){alert(`Too far to start this puzzle.

Distance: ${Math.round(l)}m
Needed: ≤ ${$e}m`);return}D.removeLayer(r),Z=null,le({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(D),Z=r}function yn(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

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
        <span>${tt()}</span>
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
  `}function hn(){try{h&&(h.remove(),h=null,R=null,D=null,P=null,k=null,Y=!1,ce=0,J=0,Z=null)}catch{}}function xn(){const e=window.L,t=I("cbsgoMap");if(!e||!t)return!1;hn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return h=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(h),h.setMaxBounds(n),h.setView([51.687,4.87],16),D=e.layerGroup().addTo(h),P=e.layerGroup().addTo(h),!0}function vn(e){const t=window.L;if(!t||!h)return;const n=cn(t);if(!R){R=t.marker(e,{icon:n}).addTo(h),h.setView(e,18);return}R.setIcon(n),R.setLatLng(e)}function wn(){!navigator.geolocation||!h||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n},i=k?{lat:k[0],lng:k[1]}:null;if(k=[t,n],vn([t,n]),i){const u=ge(i,r);Number.isFinite(u)&&u>1&&(J+=u)}bn(r),mn(r),pn(t,n),A(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{A(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Sn(){let e=0;const t=120,n=()=>{if(e++,!I("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(A("Loading map engine…"),e<t)return setTimeout(n,100);A("Map engine failed to load (Leaflet not found). Refresh.");return}if(!xn()){A("Could not init map. Refresh.");return}const r=I("cbsgoCenterBtn");r&&(r.onclick=()=>{h&&k&&h.setView(k,18)});const i=I("cbsgoCompassBtn");i&&(i.onclick=()=>{h&&(Y=!Y,Y?h.setView([51.687,4.87],3):k&&h.setView(k,16))}),A("Loading GPS…"),wn()};n()}function ot(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function _n(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function me(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function de(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Be(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${ot(e)}</div>
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
  `}function kn(){const e=Qe(),t=et();return`
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
        ${_n(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${ot(e)}" maxlength="24" style="
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
  `}function Mn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=u=>{const l=document.querySelector("#profileMsg");l&&(l.textContent=u||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const u=Vt(e.value);r(`✅ Name saved: ${u}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const u=t.files&&t.files[0];if(!u)return;if(u.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const l=new FileReader;l.onload=()=>{Zt(String(l.result||"")),r("✅ Photo saved"),j()},l.onerror=()=>r("⛔ Failed to read image."),l.readAsDataURL(u)}),n&&(n.onclick=()=>{Jt(),r("✅ Photo removed"),j()})}function En(){const e=St(),t=_t();return`
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
  `}function rt(){const e=me();return e==="profile"?Be("Profile",`<div id="profileMount">${kn()}</div>`):e==="bag"?Be("Bag",`<div id="bagMount">${En()}</div>`):""}function Cn(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${yn()}
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
          ${Xt()}
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
        ${rt()}
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
  `}function j(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=rt(),me()==="profile"&&Mn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{de("map"),j()})}function Ln(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=me();de(n===t?"map":t||"map"),j()})})}function it(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Cn(),Ln(),Sn(),Gt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Ve())};window.addEventListener("cbsgo:stepsChanged",t)}if(j(),Ze()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Yt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){le({id:"__daily__",name:"Daily Glow"});return}if(Fe(n))return;const o=mt.find(r=>r.id===n);o&&le(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&gt(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>ht);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),it()})}))}}function st(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function Q(e){const t=st();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";Q(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{Q(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Oe(){try{if(!document.getElementById("app")){Q("❌ #app not found in index.html");return}it();const t=st();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){Q(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Oe,{once:!0}):Oe();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
