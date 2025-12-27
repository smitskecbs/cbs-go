(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const nt="modulepreload",ot=function(e){return"/cbs-go/"+e},ge={},rt=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let m=function(p){return Promise.all(p.map(b=>Promise.resolve(b).then(l=>({status:"fulfilled",value:l}),l=>({status:"rejected",reason:l}))))};var s=m;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),f=a?.nonce||a?.getAttribute("nonce");r=m(n.map(p=>{if(p=ot(p),p in ge)return;ge[p]=!0;const b=p.endsWith(".css"),l=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${l}`))return;const h=document.createElement("link");if(h.rel=b?"stylesheet":nt,b||(h.as="script"),h.crossOrigin="",h.href=p,f&&h.setAttribute("nonce",f),document.head.appendChild(h),b)return new Promise((v,w)=>{h.addEventListener("load",v),h.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(a){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=a,window.dispatchEvent(f),!f.defaultPrevented)throw a}return r.then(a=>{for(const f of a||[])f.status==="rejected"&&i(f.reason);return t().catch(i)})},Se=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],ke="cbsgo_state_v6";function it(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function st(){return{xp:0,completed:{},updatedAt:Date.now()}}function D(){const e=localStorage.getItem(ke);return it(e,st())}function Me(e){e.updatedAt=Date.now(),localStorage.setItem(ke,JSON.stringify(e))}function Ee(e){return 100+(Math.max(1,Number(e||1))-1)*40}function X(){return Number(D().xp||0)}function ne(){const e=X();let t=1,n=e;for(;;){const o=Ee(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function Le(){const e=X();let t=1,n=e;for(;;){const o=Ee(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function F(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return D();const n=D();return n.xp=Number(n.xp||0)+t,Me(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:ne()}})),n}function oe(e){const t=String(e||"");if(!t)return!1;const n=D();return!!(n.completed&&n.completed[t])}function Ce(e){const t=String(e||"");if(!t)return;const n=D();n.completed||(n.completed={}),n.completed[t]=Date.now(),Me(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const at=Object.freeze(Object.defineProperty({__proto__:null,addXp:F,completeNode:Ce,getLevel:ne,getXp:X,getXpIntoLevel:Le,isNodeCompleted:oe},Symbol.toStringTag,{value:"Module"})),Ne="cbsgoPuzzleModal";function ct(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function be(){const e=document.getElementById(Ne);e&&e.remove()}function W(e){be();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=80,i=15;let s=[],a=null,f=0,m=i,p=!1;const b=e?.name||"CBS GO Puzzle",l=document.createElement("div");l.id=Ne,l.style.position="fixed",l.style.inset="0",l.style.zIndex="999999",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="16px",l.style.background="rgba(0,0,0,.70)",l.style.backdropFilter="blur(12px)",l.style.fontFamily="system-ui, sans-serif",l.style.color="#fff",l.innerHTML=`
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
    ">
      <div style="
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.12);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      ">
        <div style="font-weight:900; font-size:15px;">
          ${ct(b)}
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
        Reach the target score before you run out of moves.
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
          <div>Target: <span id="cbsgoTargetScore">${r}</span></div>
        </div>
        <div style="text-align:right;">
          <div>Moves left: <span id="cbsgoMoves">${i}</span></div>
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
  `,document.body.appendChild(l);const h=document.getElementById("cbsgoBoard"),v=document.getElementById("cbsgoScore"),w=document.getElementById("cbsgoMoves"),_=document.getElementById("cbsgoStatus"),$=document.getElementById("cbsgoPuzzleClose"),K=document.getElementById("cbsgoPuzzleOk");function N(d){_&&(_.textContent=d||"")}function le(){return Math.floor(Math.random()*o.length)}function Je(){s=[];for(let d=0;d<t;d++){const c=[];for(let u=0;u<n;u++)c.push(le());s.push(c)}}function M(){if(h){h.innerHTML="";for(let d=0;d<t;d++)for(let c=0;c<n;c++){const u=s[d][c],g=document.createElement("div");g.dataset.row=String(d),g.dataset.col=String(c),g.style.borderRadius="12px",g.style.background=o[u]||"#444",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.cursor="pointer",g.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",a&&a.row===d&&a.col===c&&(g.style.outline="2px solid #fff",g.style.outlineOffset="2px"),g.addEventListener("click",()=>tt(d,c)),h.appendChild(g)}}}function Ze(d,c){if(!d||!c)return!1;const u=Math.abs(d.row-c.row),g=Math.abs(d.col-c.col);return u+g===1}function de(d,c){const u=s[d.row][d.col];s[d.row][d.col]=s[c.row][c.col],s[c.row][c.col]=u}function ue(){const d=new Set;for(let c=0;c<t;c++){let u=s[c][0],g=0;for(let y=1;y<=n;y++){const E=y<n?s[c][y]:null;if(E===u)continue;const B=y-g;if(u!=null&&B>=3)for(let L=g;L<y;L++)d.add(`${c},${L}`);u=E,g=y}}for(let c=0;c<n;c++){let u=s[0][c],g=0;for(let y=1;y<=t;y++){const E=y<t?s[y][c]:null;if(E===u)continue;const B=y-g;if(u!=null&&B>=3)for(let L=g;L<y;L++)d.add(`${L},${c}`);u=E,g=y}}return d}function Qe(d){if(!d||!d.size)return 0;const c=d.size;f+=c*5,v&&(v.textContent=String(f));for(const u of d){const[g,y]=u.split(","),E=Number(g),B=Number(y);s[E][B]=null}for(let u=0;u<n;u++){let g=t-1;for(let y=t-1;y>=0;y--)s[y][u]!=null&&(s[g][u]=s[y][u],g--);for(let y=g;y>=0;y--)s[y][u]=le()}return c}function et(d=!1){p=!0;const c=()=>{const u=ue();if(!u.size){p=!1,M(),d&&(m<=0?pe():N("Nice! Keep matching."));return}Qe(u),M(),setTimeout(c,120)};c()}function pe(){if(f>=r){N("Great job! Puzzle completed 🎉");try{e?.id&&Ce(e.id),F(10)}catch{}}else N("Out of moves. Try again next time 🙂")}function tt(d,c){if(p)return;const u={row:d,col:c};if(!a){a=u,M();return}if(a.row===d&&a.col===c){a=null,M();return}if(!Ze(a,u)){a=u,M();return}if(de(a,u),a=null,m--,w&&(w.textContent=String(m)),!ue().size){de({row:d,col:c},{row:u.row,col:u.col}),M(),N("No match… try another swap."),m<=0&&pe();return}N(""),M(),et(!0)}function fe(){be()}$&&($.onclick=fe),K&&(K.onclick=()=>{fe()}),Je(),M(),N("Tap two neighboring tiles to swap them.")}const ze="cbsgo_inventory_v1";function lt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function dt(){return{tickets:0,cbs:0}}function T(){const e=localStorage.getItem(ze),t=lt(e,dt());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Ae(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(ze,JSON.stringify(t))}function ut(){return Number(T().tickets||0)}function pt(){return Number(T().cbs||0)}function V(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+t,Ae(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function ft(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.cbs=Number(n.cbs||0)+t,Ae(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Ie="cbsgo_steps_v6",gt="cbsgo_gps_autostart_v2",Pe="cbsgo_daily_puzzle_v1",bt=.75,mt=200,yt=.3,ht=400,xt=20,J=1500,Z=200,vt=.25,wt=.05,_t=.3;let q=null,H=!1,z={msg:"init"};function St(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function kt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function R(){const e=localStorage.getItem(Ie);return St(e,kt())}function Te(e){e.updatedAt=Date.now(),localStorage.setItem(Ie,JSON.stringify(e))}function G(){return Number(R().steps||0)}function me(){return!!H}function re(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Mt(){try{return localStorage.getItem(Pe)===re()}catch{return!1}}function Et(){try{localStorage.setItem(Pe,re())}catch{}}function Lt(e,t){return Mt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:re()}})),Et(),!0)}function ye(){const e=R(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ct(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<J)return;const i=Math.floor(r/J);i<=0||(V(i),e.boostLastStep=n+i*J)}function Nt(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<Z){e.chestMeters=t;return}let n=0;for(;t>=Z&&n<5;)if(t-=Z,n+=1,Math.random()<vt){const o=Math.random()<wt,r=o?10:3,i=o?2:1;F(r),V(i);const s=o&&Math.random()<_t;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function zt(e,t){const o=m=>m*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),f=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(f))}function At(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const a=n-o;a>0&&(F(a),e.xpKmAwarded=n)}const i=Math.floor(t/2500),s=Number(e.ticketChunksAwarded||0);if(i>s){const a=i-s;a>0&&(V(a),e.ticketChunksAwarded=i)}}function It(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return R();const n=R();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/bt);return o>n.steps&&(n.steps=o),At(n),Ct(n),Nt(n),Te(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Pt(){q!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(q),q=null}async function he(e={}){const t=!!e.silent;if(!navigator.geolocation)return z={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(gt,"1")}catch{}Pt(),H=!0,z={msg:"requesting",t:Date.now()};try{return q=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),a=R(),f=a.lastPos;a.lastPos={lat:o,lng:r,t:s},Te(a);const m=Number.isFinite(n.coords.heading)?n.coords.heading:null,p=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:m,speed:p,t:s}})),i>mt){z={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:ye()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:G()}}));return}Lt(o,r);let b=0,l=0,h=0,v=0,w="no-last";f&&typeof f.lat=="number"&&typeof f.lng=="number"&&typeof f.t=="number"&&(b=zt({lat:f.lat,lng:f.lng},{lat:o,lng:r}),l=Math.max(1,(s-f.t)/1e3),h=b/l,b<yt?w="jitter":b>ht?w="teleport":h>xt?w="too-fast":(It(b),v=b,w="ok")),z={lat:o,lng:r,acc:i,t:s,dist:Math.round(b),dt:Math.round(l),speed:Number(h.toFixed(2)),added:Math.round(v),reason:w,boostMs:ye()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:G()}}))},n=>{H=!1,z={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:G()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return H=!1,z={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Tt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>me()||await he({silent:!0}))();const t=async()=>{me()||await he({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&F(n),o>0&&V(o),r>0&&ft(r)}));function xe(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function $t(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function $e(){const e=Number(X()||0),t=Number(ne()||1),n=Number(Le()||0),o=Number(G()||0),r=xe(n,0,100),i=xe(r/100*100,0,100),s=$t(o);return`
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
          width:${i}%;
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
          <span>${s} steps</span>
        </div>
      </div>
    </div>
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=$e())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function Be(){return""}function Oe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Bt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const De="cbsgo_player_name_v2",ie="cbsgo_player_avatar_v2";function Re(){try{return localStorage.getItem(De)||"Sovereign"}catch{return"Sovereign"}}function Ot(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(De,t)}catch{}return t}function je(){try{return localStorage.getItem(ie)||""}catch{return""}}function Dt(e){const t=String(e||"");try{localStorage.setItem(ie,t)}catch{}return t}function Rt(){try{localStorage.removeItem(ie)}catch{}}let x=null,O=null,S=null,C=null,A=null,k=null,U=!1;const Q="cbsgo_nodes_pos_v3",Fe="cbsgo_daily_marker_v1",jt=4,Ft=6,Kt=80,qt=220,Ht=6e4,ve=65;let ee=0;function P(e){return document.getElementById(e)}function I(e){const t=P("cbsgoMapHost");if(!t)return;let n=P("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Gt(){const e=String(Re()||"").trim();return e?e[0].toUpperCase():"🙂"}function Ut(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function se(e,t){const o=m=>m*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),f=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(f))}function Ke(){return new Date().toISOString().slice(0,10)}function ae(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function qe(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function He(){return Se.filter(e=>e.type!=="group"&&!oe(e.id))}function Wt(e){const t=je();if(t){const r=`
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
    ">${Ut(Gt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function Yt(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"};
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function Xt(e){return e.divIcon({html:`
    <div style="
      width:52px;height:52px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 22px rgba(120,220,255,.70), 0 0 40px rgba(120,220,255,.35), 0 12px 26px rgba(0,0,0,.40);
      font-size:22px;
    ">
      ✨🧩
    </div>
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function Vt(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Jt(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function Zt(e){const t=ae(Q,null);if(t&&t.seed&&t.posById)return t;const n=He(),o={},r=[],i=90,s=180,a=520,f=5e3;function m(l,h,v){const w=h*Math.cos(v)/111111,_=h*Math.sin(v)/(111111*Math.cos(l*Math.PI/180));return{dLat:w,dLng:_}}let p=0;for(const l of n){let h=!1;for(;!h&&p<f;){p++;const v=s+Math.random()*(a-s),w=Math.random()*Math.PI*2,_=m(e.lat,v,w),$={lat:e.lat+_.dLat,lng:e.lng+_.dLng};h=r.every(K=>se(K,$)>=i),h&&(r.push($),o[l.id]={dLat:_.dLat,dLng:_.dLng})}if(!o[l.id]){const v=m(e.lat,s,Math.random()*Math.PI*2);o[l.id]={dLat:v.dLat,dLng:v.dLng}}}const b={seed:e,posById:o,createdAt:Date.now()};return qe(Q,b),b}function Qt(e,t){const n=ae(Q,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function en(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,s=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+s}}function tn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function nn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function on(e){if(!x||!A||!e)return;const t=Date.now();if(t-ee<Ht||A.getLayers().length>=Ft)return;const o=window.L;if(!o)return;const r=tn(),i=en(e,Kt,qt),s=Vt(o,r),a=o.marker([i.lat,i.lng],{icon:s});a.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const f={lat:k[0],lng:k[1]},m={lat:i.lat,lng:i.lng},p=se(f,m);if(p>ve){alert(`Too far to open this gift.

Distance: ${Math.round(p)}m
Needed: ≤ ${ve}m`);return}A.removeLayer(a);const b=nn(r),l=`You found a gift!

Reward: ${b.text}`;alert(l);const h={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:h}))}catch{}}),a.addTo(A),ee=t}function rn(){return`
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
        <span>${Jt()}</span>
      </div>

      <!-- Kompas + centreer-player RECHTSONDER, groot als Profile/Bag -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;
        bottom:148px;            /* net boven je 👤/🎒 (die staan rond 80px) */
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
  `}function sn(){try{x&&(x.remove(),x=null,O=null,S=null,C=null,A=null,k=null,U=!1,ee=0)}catch{}}function an(){const e=window.L,t=P("cbsgoMap");if(!e||!t)return!1;sn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return x=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(x),x.setView([51.687,4.87],16),S=e.layerGroup().addTo(x),A=e.layerGroup().addTo(x),!0}function cn(e){const t=window.L;if(!t||!x)return;const n=Wt(t);if(!O){O=t.marker(e,{icon:n}).addTo(x),x.setView(e,18);return}O.setIcon(n),O.setLatLng(e)}function ln(e){const t=window.L;if(!t||!x||!S)return;const n=C;S.clearLayers(),n&&(C=n,C.addTo(S));const o=Zt(e),r=He(),i=65,s=1600,a=[];for(const m of r){const p=Qt(m,o.seed);if(!p)continue;const b=Math.round(se(e,p));b>s||a.push({node:m,ll:p,dist:b})}a.sort((m,p)=>m.dist-p.dist),a.slice(0,jt).forEach(({node:m,ll:p,dist:b})=>{const l=t.marker([p.lat,p.lng],{icon:Yt(t,b<=i)});l.on("click",()=>{if(b>i){alert(`Too far.

Go closer to open:
${m.name}
Distance: ${b}m
Required: ≤ ${i}m`);return}W(m)}),l.addTo(S)})}function dn(){return ae(Fe,{date:"",shown:!1})}function Ge(e){qe(Fe,e)}function Ue(e){const t=window.L;if(!t||!x||!S)return;const n=dn(),o=Ke();n.date===o&&n.shown===!1||(n.date!==o&&Ge({date:o,shown:!0}),!C&&(C=t.marker([e.lat,e.lng],{icon:Xt(t)}).addTo(S),C.on("click",()=>{W({id:"__daily__",name:"Daily puzzle"})})))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Ge({date:Ke(),shown:!0}),x&&window.L&&S&&Ue({lat:t.lat,lng:t.lng}))}));function un(){!navigator.geolocation||!x||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};k=[t,n],cn([t,n]),Ue(r),ln(r),on(r),I(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{I(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function pn(){let e=0;const t=120,n=()=>{if(e++,!P("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(I("Loading map engine…"),e<t)return setTimeout(n,100);I("Map engine failed to load (Leaflet not found). Refresh.");return}if(!an()){I("Could not init map. Refresh.");return}const r=P("cbsgoCenterBtn");r&&(r.onclick=()=>{x&&k&&x.setView(k,18)});const i=P("cbsgoCompassBtn");i&&(i.onclick=()=>{x&&(U=!U,U?x.setView([51.687,4.87],3):k&&x.setView(k,16))}),I("Loading GPS…"),un()};n()}function We(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fn(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function ce(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function te(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function we(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${We(e)}</div>
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
  `}function gn(){const e=Re(),t=je();return`
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
        ${fn(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${We(e)}" maxlength="24" style="
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
  `}function bn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#profileMsg");a&&(a.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=Ot(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{Dt(String(a.result||"")),r("✅ Photo saved"),j()},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{Rt(),r("✅ Photo removed"),j()})}function mn(){const e=ut(),t=pt();return`
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
  `}function Ye(){const e=ce();return e==="profile"?we("Profile",`<div id="profileMount">${gn()}</div>`):e==="bag"?we("Bag",`<div id="bagMount">${mn()}</div>`):""}function yn(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${rn()}
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
          ${$e()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Be()}
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
        ${Ye()}
      </div>

      ${Oe()?`<button id="resetBtn" type="button" style="
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
  `}function j(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=Ye(),ce()==="profile"&&bn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{te("map"),j()})}function hn(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=ce();te(n===t?"map":t||"map"),j()})})}function Xe(){const e=document.querySelector("#app");if(e){if(e.innerHTML=yn(),hn(),pn(),Tt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Be())};window.addEventListener("cbsgo:stepsChanged",t)}if(j(),Oe()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Bt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){W({id:"__daily__",name:"Daily Glow"});return}if(oe(n))return;const o=Se.find(r=>r.id===n);o&&W(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&rt(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>at);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),Xe()})}))}}function Ve(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function Y(e){const t=Ve();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";Y(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{Y(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function _e(){try{if(!document.getElementById("app")){Y("❌ #app not found in index.html");return}Xe();const t=Ve();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){Y(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_e,{once:!0}):_e();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
