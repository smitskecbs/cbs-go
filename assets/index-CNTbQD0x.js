(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const ft="modulepreload",gt=function(e){return"/cbs-go/"+e},Ae={},mt=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(m){return Promise.all(m.map(b=>Promise.resolve(b).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};var d=f;document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),g=u?.nonce||u?.getAttribute("nonce");r=f(n.map(m=>{if(m=gt(m),m in Ae)return;Ae[m]=!0;const b=m.endsWith(".css"),w=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${w}`))return;const h=document.createElement("link");if(h.rel=b?"stylesheet":ft,b||(h.as="script"),h.crossOrigin="",h.href=m,g&&h.setAttribute("nonce",g),document.head.appendChild(h),b)return new Promise((v,x)=>{h.addEventListener("load",v),h.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${m}`)))})}))}function s(u){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=u,window.dispatchEvent(g),!g.defaultPrevented)throw u}return r.then(u=>{for(const g of u||[])g.status==="rejected"&&s(g.reason);return t().catch(s)})},bt=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Fe="cbsgo_state_v6";function ht(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function yt(){return{xp:0,completed:{},updatedAt:Date.now()}}function R(){const e=localStorage.getItem(Fe);return ht(e,yt())}function He(e){e.updatedAt=Date.now(),localStorage.setItem(Fe,JSON.stringify(e))}function de(e){return 100+(Math.max(1,Number(e||1))-1)*40}function J(){return Number(R().xp||0)}function Q(){const e=J();let t=1,n=e;for(;;){const o=de(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function je(){const e=J();let t=1,n=e;for(;;){const o=de(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function Ke(){return de(Q())}function F(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return R();const n=R();return n.xp=Number(n.xp||0)+t,He(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:Q()}})),n}function Ue(e){const t=String(e||"");if(!t)return!1;const n=R();return!!(n.completed&&n.completed[t])}function qe(e){const t=String(e||"");if(!t)return;const n=R();n.completed||(n.completed={}),n.completed[t]=Date.now(),He(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const xt=Object.freeze(Object.defineProperty({__proto__:null,addXp:F,completeNode:qe,getLevel:Q,getXp:J,getXpIntoLevel:je,getXpNeededThisLevel:Ke,isNodeCompleted:Ue},Symbol.toStringTag,{value:"Module"})),We="cbsgoPuzzleModal";function vt(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oe(){const e=document.getElementById(We);e&&e.remove()}function se(e){oe();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],s=180,d=18,u=o.length,g=.01;let f=[],m=null,b=0,w=d,h=!1,v=!1,x=null;const ct=e?.name||"CBS GO Puzzle",_=document.createElement("div");_.id=We,_.style.position="fixed",_.style.inset="0",_.style.zIndex="999999",_.style.display="flex",_.style.alignItems="center",_.style.justifyContent="center",_.style.padding="16px",_.style.background="rgba(0,0,0,.70)",_.style.backdropFilter="blur(12px)",_.style.fontFamily="system-ui, sans-serif",_.style.color="#fff",_.innerHTML=`
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
          ${vt(ct)}
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
  `,document.body.appendChild(_);const te=document.getElementById("cbsgoBoard"),he=document.getElementById("cbsgoScore"),ye=document.getElementById("cbsgoMoves"),xe=document.getElementById("cbsgoStatus"),ve=document.getElementById("cbsgoPuzzleClose"),we=document.getElementById("cbsgoPuzzleOk"),H=document.getElementById("cbsgoConfettiLayer");function z(c){xe&&(xe.textContent=c||"")}function lt(){if(!H)return;H.style.display="block",H.innerHTML="";const c=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],a=40;for(let l=0;l<a;l++){const i=document.createElement("div"),p=6+Math.floor(Math.random()*6),y=Math.random()*100,k=Math.random()*.6,S=1+Math.random()*.6,K=Math.random()*360;i.style.position="absolute",i.style.top="-10%",i.style.left=`${y}%`,i.style.width=`${p}px`,i.style.height=`${p*2}px`,i.style.background=c[l%c.length],i.style.opacity="0.9",i.style.borderRadius="2px",i.style.transform=`rotate(${K}deg)`,i.style.animation=`cbsgoConfettiFall ${S}s ease-out ${k}s forwards`,H.appendChild(i)}}function Se(){return Math.floor(Math.random()*o.length)}function dt(){f=[];for(let c=0;c<t;c++){const a=[];for(let l=0;l<n;l++)Math.random()<g?a.push(u):a.push(Se());f.push(a)}}function j(c){return c===u}function C(){if(te){te.innerHTML="";for(let c=0;c<t;c++)for(let a=0;a<n;a++){const l=f[c][a],i=document.createElement("div");i.dataset.row=String(c),i.dataset.col=String(a),i.style.borderRadius="12px",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center",i.style.cursor=v?"default":"pointer",i.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",i.style.fontSize="20px",j(l)?(i.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",i.textContent="💥"):(i.style.background=o[l]||"#444",i.textContent=r[l]||"⬛"),m&&m.row===c&&m.col===a&&(i.style.outline="2px solid #fff",i.style.outlineOffset="2px"),i.addEventListener("click",()=>{ze(c,a)}),i.addEventListener("touchstart",p=>{if(v)return;const y=p.touches[0];x={row:c,col:a,x:y.clientX,y:y.clientY}}),i.addEventListener("touchend",p=>{if(!x||v)return;const y=p.changedTouches[0],k=y.clientX-x.x,S=y.clientY-x.y;if(Math.sqrt(k*k+S*S)<18){ze(c,a),x=null;return}let L=x.row,T=x.col;Math.abs(k)>Math.abs(S)?k>0?T+=1:T-=1:S>0?L+=1:L-=1,L>=0&&L<t&&T>=0&&T<n&&Le(x.row,x.col,L,T),x=null,p.preventDefault()}),te.appendChild(i)}}}function _e(c,a){if(!c||!a)return!1;const l=Math.abs(c.row-a.row),i=Math.abs(c.col-a.col);return l+i===1}function ke(c,a){const l=f[c.row][c.col];f[c.row][c.col]=f[a.row][a.col],f[a.row][a.col]=l}function Me(){const c=new Set;for(let a=0;a<t;a++){let l=f[a][0],i=0;for(let p=1;p<=n;p++){const y=p<n?f[a][p]:null;if(y===l)continue;const k=p-i;if(l!=null&&k>=3)for(let S=i;S<p;S++)c.add(`${a},${S}`);l=y,i=p}}for(let a=0;a<n;a++){let l=f[0][a],i=0;for(let p=1;p<=t;p++){const y=p<t?f[p][a]:null;if(y===l)continue;const k=p-i;if(l!=null&&k>=3)for(let S=i;S<p;S++)c.add(`${S},${a}`);l=y,i=p}}return c}function Ee(c){if(!c||!c.size)return 0;const a=c.size;b+=a*4,he&&(he.textContent=String(b)),!v&&b>=s&&ne(!0);for(const l of c){const[i,p]=l.split(","),y=Number(i),k=Number(p);f[y][k]=null}for(let l=0;l<n;l++){let i=t-1;for(let p=t-1;p>=0;p--)f[p][l]!=null&&(f[i][l]=f[p][l],i--);for(let p=i;p>=0;p--)Math.random()<g?f[p][l]=u:f[p][l]=Se()}return a}function ut(c,a){const l=new Set;for(let i=0;i<n;i++)l.add(`${c},${i}`);for(let i=0;i<t;i++)l.add(`${i},${a}`);Ee(l),C(),v||setTimeout(()=>Ce(!1),120)}function Ce(c=!1){if(v)return;h=!0;const a=()=>{if(v){h=!0;return}const l=Me();if(!l.size){h=!1,C(),c&&!v&&(w<=0?$():z("Nice! Keep matching."));return}Ee(l),C(),setTimeout(a,120)};a()}function ne(c){if(!v)if(v=!0,h=!0,c){z("Great job! Puzzle completed 🎉");try{e?.id&&qe(e.id),F(10)}catch{}lt(),setTimeout(()=>{oe()},1600)}else z("Out of moves. Try again next time 🙂")}function $(){b>=s?ne(!0):w<=0&&ne(!1)}function Le(c,a,l,i){if(h||v)return;if(w<=0){$();return}const p={row:c,col:a},y={row:l,col:i};if(!_e(p,y))return;const k=f[c][a],S=f[l][i],K=j(k)||j(S);if(ke(p,y),m=null,w--,ye&&(ye.textContent=String(w)),K){C();const L=j(f[c][a])?{row:c,col:a}:{row:l,col:i};ut(L.row,L.col),$();return}if(!Me().size){ke(p,y),C(),z("No match… try another swap."),$();return}z(""),C(),Ce(!0)}function ze(c,a){if(h||v)return;if(w<=0){$();return}const l={row:c,col:a};if(!m){m=l,C();return}if(m.row===c&&m.col===a){m=null,C();return}if(!_e(m,l)){m=l,C();return}Le(m.row,m.col,l.row,l.col)}function Ne(){oe()}ve&&(ve.onclick=Ne),we&&(we.onclick=()=>{Ne()}),dt(),C(),z("Tap or swipe two neighboring tiles to swap them.")}const Ge="cbsgo_inventory_v1";function wt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function St(){return{tickets:0,cbs:0}}function P(){const e=localStorage.getItem(Ge),t=wt(e,St());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Ye(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Ge,JSON.stringify(t))}function _t(){return Number(P().tickets||0)}function kt(){return Number(P().cbs||0)}function ee(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return P();const n=P();return n.tickets=Number(n.tickets||0)+t,Ye(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function Mt(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return P();const n=P();return n.cbs=Number(n.cbs||0)+t,Ye(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Xe="cbsgo_steps_v6",Et="cbsgo_gps_autostart_v2",Ze="cbsgo_daily_puzzle_v1",Ct=.75,Lt=200,zt=.3,Nt=400,At=20,re=1500,ie=200,Pt=.25,It=.05,$t=.3;let U=null,q=!1,N={msg:"init"};function Tt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Bt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function I(){const e=localStorage.getItem(Xe);return Tt(e,Bt())}function Ve(e){e.updatedAt=Date.now(),localStorage.setItem(Xe,JSON.stringify(e))}function W(){return Number(I().steps||0)}function Ot(){const e=I();return Number(e.meters||0)}function Rt(){return Ot()/1e3}function Pe(){return!!q}function ue(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Dt(){try{return localStorage.getItem(Ze)===ue()}catch{return!1}}function Ft(){try{localStorage.setItem(Ze,ue())}catch{}}function Ht(e,t){return Dt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:ue()}})),Ft(),!0)}function Ie(){const e=I(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function jt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<re)return;const s=Math.floor(r/re);s<=0||(ee(s),e.boostLastStep=n+s*re)}function Kt(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<ie){e.chestMeters=t;return}let n=0;for(;t>=ie&&n<5;)if(t-=ie,n+=1,Math.random()<Pt){const o=Math.random()<It,r=o?10:3,s=o?2:1;F(r),ee(s);const d=o&&Math.random()<$t;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:s,rare:o,hasCBSFlag:d}}));break}e.chestMeters=t}function Ut(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),s=o(t.lng-e.lng),d=o(e.lat),u=o(t.lat),g=Math.sin(r/2)**2+Math.cos(d)*Math.cos(u)*Math.sin(s/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function qt(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const u=n-o;u>0&&(F(u),e.xpKmAwarded=n)}const s=Math.floor(t/2500),d=Number(e.ticketChunksAwarded||0);if(s>d){const u=s-d;u>0&&(ee(u),e.ticketChunksAwarded=s)}}function Wt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return I();const n=I();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Ct);return o>n.steps&&(n.steps=o),qt(n),jt(n),Kt(n),Ve(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Gt(){U!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(U),U=null}async function $e(e={}){const t=!!e.silent;if(!navigator.geolocation)return N={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Et,"1")}catch{}Gt(),q=!0,N={msg:"requesting",t:Date.now()};try{return U=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,s=n.coords.accuracy||999,d=Date.now(),u=I(),g=u.lastPos;u.lastPos={lat:o,lng:r,t:d},Ve(u);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,m=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:s,heading:f,speed:m,t:d}})),s>Lt){N={lat:o,lng:r,acc:s,t:d,reason:"accuracy",boostMs:Ie()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:W()}}));return}Ht(o,r);let b=0,w=0,h=0,v=0,x="no-last";g&&typeof g.lat=="number"&&typeof g.lng=="number"&&typeof g.t=="number"&&(b=Ut({lat:g.lat,lng:g.lng},{lat:o,lng:r}),w=Math.max(1,(d-g.t)/1e3),h=b/w,b<zt?x="jitter":b>Nt?x="teleport":h>At?x="too-fast":(Wt(b),v=b,x="ok")),N={lat:o,lng:r,acc:s,t:d,dist:Math.round(b),dt:Math.round(w),speed:Number(h.toFixed(2)),added:Math.round(v),reason:x,boostMs:Ie()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:W()}}))},n=>{q=!1,N={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:W()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return q=!1,N={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Yt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>Pe()||await $e({silent:!0}))();const t=async()=>{Pe()||await $e({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&F(n),o>0&&ee(o),r>0&&Mt(r)}));function Xt(){const e=J(),t=Q(),n=je(),o=Ke(),r=W(),s=Rt(),d=o>0?Math.min(100,Math.round(n/o*100)):0;return`
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
          width:${d}%;
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
        <div>${r} steps · ${s.toFixed(2)} km</div>
      </div>
    </div>
  `}function Je(){return""}function Qe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Zt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const et="cbsgo_player_name_v2",pe="cbsgo_player_avatar_v2";function tt(){try{return localStorage.getItem(et)||"Sovereign"}catch{return"Sovereign"}}function Vt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(et,t)}catch{}return t}function nt(){try{return localStorage.getItem(pe)||""}catch{return""}}function Jt(e){const t=String(e||"");try{localStorage.setItem(pe,t)}catch{}return t}function Qt(){try{localStorage.removeItem(pe)}catch{}}let M=null,B=null,O=null,G=null,X=null,A=null,E=null,ae=0,Te=0,fe=0,Y=null;const en="48a387bba00043ac4ba5823371abc9d2",ge=35,tn=6,nn=6e4,on=350,rn=.35;function Z(e){return document.getElementById(e)}function ce(e){const t=Z("cbsgoMapHost");if(!t)return;let n=Z("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e}function sn(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function an(){const e=String(tt()||"").trim();return e?e[0].toUpperCase():"🙂"}function me(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),s=o(t.lng-e.lng),d=o(e.lat),u=o(t.lat),g=Math.sin(r/2)**2+Math.cos(d)*Math.cos(u)*Math.sin(s/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function ot(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,s=o*Math.cos(r)/111111,d=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+s,lng:e.lng+d}}function Be(e){const t=Z("cbsgoWeatherLabel");t&&(t.textContent=e)}async function cn(e,t){try{const n=`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&appid=${en}&units=metric`,r=await(await fetch(n)).json(),s=Math.round(r.main.temp),d=r.weather?.[0]?.icon?.includes("n")?"🌙":"☀️";Be(`${d} ${s}°`)}catch{Be("⛅")}}function ln(e){const t=nt();if(t)return e.divIcon({className:"",html:`<div style="
        width:40px;height:40px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 8px 18px rgba(0,0,0,.45);
        background:url('${t}') center/cover;
      "></div>`,iconSize:[40,40],iconAnchor:[20,20]});const n=sn(an());return e.divIcon({className:"",html:`<div style="
      width:36px;height:36px;border-radius:999px;
      border:2px solid rgba(255,255,255,.9);
      background:rgba(0,0,0,.35);
      box-shadow:0 8px 18px rgba(0,0,0,.45);
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-weight:900;font-size:16px;
    ">${n}</div>`,iconSize:[36,36],iconAnchor:[18,18]})}function Oe(e,t=0){return e.divIcon({className:"",html:`<div style="
      width:24px;height:24px;
      transform:rotate(${t}deg);
      transform-origin:center center;
      filter:drop-shadow(0 2px 4px rgba(0,0,0,.6));
    ">⬆️</div>`,iconSize:[24,24],iconAnchor:[12,28]})}function dn(e,t){let n="⭐";return t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙"),e.divIcon({className:"",html:`<div style="
      position:relative;width:40px;height:40px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.8);
      backdrop-filter:blur(10px);
      display:flex;align-items:center;justify-content:center;
      font-size:22px;box-shadow:0 10px 22px rgba(0,0,0,.45);
    ">🎁<div style="
      position:absolute;right:-4px;bottom:-4px;
      width:20px;height:20px;border-radius:999px;
      background:#000;display:flex;align-items:center;justify-content:center;
      font-size:11px;
    ">${n}</div></div>`,iconSize:[40,40],iconAnchor:[20,20]})}function un(e){return e.divIcon({className:"",html:`<div style="
      width:46px;height:46px;border-radius:18px;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.78);
      backdrop-filter:blur(10px);
      display:flex;align-items:center;justify-content:center;
      font-size:22px;
      box-shadow:0 0 20px rgba(96,165,250,.65);
    ">🧩</div>`,iconSize:[46,46],iconAnchor:[23,23]})}function pn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function fn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function gn(e){if(!M||!A)return;const t=Date.now();if(t-Te<nn||A.getLayers().length>=tn)return;const n=window.L,o=pn(),r=ot(e,80,220),s=dn(n,o),d=n.marker([r.lat,r.lng],{icon:s});d.on("click",()=>{if(!E)return;const u=me({lat:E[0],lng:E[1]},r);if(u>ge){alert(`Too far to open this gift.
Distance ${Math.round(u)}m`);return}A.removeLayer(d);const g=fn(o);alert(`You found a gift!

Reward: ${g.text}`);try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:{kind:o,...g}}))}catch{}}),d.addTo(A),Te=t}function mn(e){if(Y||fe<on||Math.random()>rn)return;const t=window.L,n=ot(e,60,140),o=un(t),r=t.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!E)return;const s=me({lat:E[0],lng:E[1]},n);if(s>ge){alert(`Too far to start this puzzle.
Distance ${Math.round(s)}m`);return}X.removeLayer(r),Y=null,se({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(X),Y=r}function bn(e){const t=window.L,n=ln(t);B?(B.setIcon(n),B.setLatLng(e)):B=t.marker(e,{icon:n}).addTo(M),O?(O.setIcon(Oe(t,ae)),O.setLatLng(e)):O=t.marker(e,{icon:Oe(t,ae),interactive:!1}).addTo(M),G?G.setLatLng(e):G=t.circle(e,{radius:ge,color:"rgba(120,220,255,.85)",fillColor:"rgba(120,220,255,.18)",fillOpacity:.35,weight:1}).addTo(M)}function hn(){return`
    <div id="cbsgoWeather" style="
      position:absolute;top:16px;left:12px;z-index:3000;
      padding:6px 10px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.78);
      backdrop-filter:blur(10px);
      color:#fff;font-size:12px;
      display:flex;align-items:center;gap:6px;
    ">
      <span id="cbsgoWeatherLabel">⛅</span>
    </div>`}function yn(){return`
  <div id="cbsgoMapHost" style="position:relative;width:100%;height:100%;">
    <div id="cbsgoMap" style="position:absolute;inset:0;"></div>
    ${hn()}
  </div>`}function xn(){const e=window.L;return vn(),M=e.map("cbsgoMap",{zoomControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(M),M.setView([51.687,4.87],16),X=e.layerGroup().addTo(M),A=e.layerGroup().addTo(M),!0}function vn(){try{M&&M.remove()}catch{}M=null,B=null,O=null,G=null,X=null,A=null,E=null,fe=0,Y=null}function wn(){navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o,heading:r}=e.coords,s={lat:t,lng:n};Number.isFinite(r)&&(ae=r);const d=E?{lat:E[0],lng:E[1]}:null;if(E=[t,n],bn(E),d){const u=me(d,s);u>1&&(fe+=u)}mn(s),gn(s),cn(t,n),ce(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>ce(`GPS error: ${e.message}`),{enableHighAccuracy:!0,timeout:2e4})}function Sn(){let e=0;const t=()=>{if(Z("cbsgoMap")){if(!window.L)return++e<40?setTimeout(t,200):ce("Map engine failed");xn()&&wn()}};t()}function rt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function _n(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function be(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function le(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Re(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${rt(e)}</div>
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
  `}function kn(){const e=tt(),t=nt();return`
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
          <input id="profileName" value="${rt(e)}" maxlength="24" style="
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
  `}function Mn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=d=>{const u=document.querySelector("#profileMsg");u&&(u.textContent=d||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const s=()=>{if(!e)return;const d=Vt(e.value);r(`✅ Name saved: ${d}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(s,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),s()})),t&&t.addEventListener("change",()=>{const d=t.files&&t.files[0];if(!d)return;if(d.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const u=new FileReader;u.onload=()=>{Jt(String(u.result||"")),r("✅ Photo saved"),D()},u.onerror=()=>r("⛔ Failed to read image."),u.readAsDataURL(d)}),n&&(n.onclick=()=>{Qt(),r("✅ Photo removed"),D()})}function En(){const e=_t(),t=kt();return`
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
  `}function it(){const e=be();return e==="profile"?Re("Profile",`<div id="profileMount">${kn()}</div>`):e==="bag"?Re("Bag",`<div id="bagMount">${En()}</div>`):""}function Cn(){return`
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
          ${Je()}
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
        ${it()}
      </div>

      ${Qe()?`<button id="resetBtn" type="button" style="
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
  `}function D(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=it(),be()==="profile"&&Mn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{le("map"),D()})}function Ln(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=be();le(n===t?"map":t||"map"),D()})})}function st(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Cn(),Ln(),Sn(),Yt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Je())};window.addEventListener("cbsgo:stepsChanged",t)}if(D(),Qe()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Zt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){se({id:"__daily__",name:"Daily Glow"});return}if(Ue(n))return;const o=bt.find(r=>r.id===n);o&&se(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&mt(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>xt);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),st()})}))}}function at(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function V(e){const t=at();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";V(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{V(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function De(){try{if(!document.getElementById("app")){V("❌ #app not found in index.html");return}st();const t=at();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){V(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",De,{once:!0}):De();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
