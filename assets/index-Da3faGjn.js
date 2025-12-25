(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Ae="modulepreload",$e=function(e){return"/cbs-go/"+e},Z={},Te=function(t,n,o){let i=Promise.resolve();if(n&&n.length>0){let p=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var l=p;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");i=p(n.map(d=>{if(d=$e(d),d in Z)return;Z[d]=!0;const c=d.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":Ae,c||(g.as="script"),g.crossOrigin="",g.href=d,s&&g.setAttribute("nonce",s),document.head.appendChild(g),c)return new Promise((E,y)=>{g.addEventListener("load",E),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(a){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return i.then(a=>{for(const s of a||[])s.status==="rejected"&&r(s.reason);return t().catch(r)})},Oe=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],de="cbsgo_state_v6";function Be(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function De(){return{xp:0,completed:{},updatedAt:Date.now()}}function k(){const e=localStorage.getItem(de);return Be(e,De())}function ce(e){e.updatedAt=Date.now(),localStorage.setItem(de,JSON.stringify(e))}function pe(e){return 100+(Math.max(1,Number(e||1))-1)*40}function _(){return Number(k().xp||0)}function T(){const e=_();let t=1,n=e;for(;;){const o=pe(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function ue(){const e=_();let t=1,n=e;for(;;){const o=pe(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function O(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return k();const n=k();return n.xp=Number(n.xp||0)+t,ce(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:T()}})),n}function ge(e){const t=String(e||"");if(!t)return!1;const n=k();return!!(n.completed&&n.completed[t])}function fe(e){const t=String(e||"");if(!t)return;const n=k();n.completed||(n.completed={}),n.completed[t]=Date.now(),ce(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const qe=Object.freeze(Object.defineProperty({__proto__:null,addXp:O,completeNode:fe,getLevel:T,getXp:_,getXpIntoLevel:ue,isNodeCompleted:ge},Symbol.toStringTag,{value:"Module"})),be="cbsgo_inventory_v1";function Re(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ue(){return{tickets:0}}function W(){const e=localStorage.getItem(be);return Re(e,Ue())}function je(e){localStorage.setItem(be,JSON.stringify(e))}function me(){return Number(W().tickets||0)}function ye(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return W();const n=W();return n.tickets=Number(n.tickets||0)+t,je(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ve="cbsgo_steps_v6",We="cbsgo_gps_autostart_v2",xe="cbsgo_daily_puzzle_v1",he="cbsgo_daily_done_v1",Fe=.7,Ge=200,Ke=1,Ye=250,He=5,V=60,U=1500;let M=null,C=!1,v={msg:"init"};function Xe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Je(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function w(){const e=localStorage.getItem(ve);return Xe(e,Je())}function Y(e){e.updatedAt=Date.now(),localStorage.setItem(ve,JSON.stringify(e))}function I(){return Number(w().steps||0)}function P(){return!!C}function Ze(){return v}function N(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ve(){try{return localStorage.getItem(xe)===N()}catch{return!1}}function Qe(){try{localStorage.setItem(xe,N())}catch{}}function et(e,t){return Ve()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:N()}})),Qe(),!0)}function we(){try{return localStorage.getItem(he)===N()}catch{return!1}}function tt(){try{localStorage.setItem(he,N())}catch{}}function Q(){const e=w(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function nt(e=V){const t=Number(e),n=(Number.isFinite(t)&&t>0?t:V)*60*1e3,o=w(),r=Date.now()+n;return o.boostUntil=Math.max(Number(o.boostUntil||0),r),o.boostLastStep=Number(o.steps||0),Y(o),window.dispatchEvent(new CustomEvent("cbsgo:boostChanged",{detail:{boostUntil:o.boostUntil}})),{ok:!0,boostUntil:o.boostUntil}}function ot(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const i=o-n;if(!Number.isFinite(i)||i<U)return;const r=Math.floor(i/U);r<=0||(ye(r),e.boostLastStep=n+r*U)}function it(e,t){const o=p=>p*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),l=o(e.lat),a=o(t.lat),s=Math.sin(i/2)**2+Math.cos(l)*Math.cos(a)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(s))}function rt(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,O(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ye(1))}function st(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return w();const n=w();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/Fe);return o>n.steps&&(n.steps=o),rt(n),ot(n),Y(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function at(){M!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(M),M=null}async function ee(e={}){const t=!!e.silent;if(!navigator.geolocation)return v={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(We,"1")}catch{}at(),C=!0,v={msg:"requesting",t:Date.now()};try{return M=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,i=n.coords.longitude,r=n.coords.accuracy||999,l=Date.now(),a=w(),s=a.lastPos;a.lastPos={lat:o,lng:i,t:l},Y(a);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,d=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:i,acc:r,heading:p,speed:d,t:l}})),window.dispatchEvent(new CustomEvent("cbsgo:gps",{detail:{lat:o,lng:i,acc:r}})),r>Ge){v={lat:o,lng:i,acc:r,t:l,reason:"accuracy",boostMs:Q()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:I()}}));return}et(o,i);let c=0,f=0,g=0,E=0,y="no-last";s&&typeof s.lat=="number"&&typeof s.lng=="number"&&typeof s.t=="number"&&(c=it({lat:s.lat,lng:s.lng},{lat:o,lng:i}),f=Math.max(1,(l-s.t)/1e3),g=c/f,c<Ke?y="jitter":c>Ye?y="teleport":g>He?y="too-fast":(st(c),E=c,y="ok")),v={lat:o,lng:i,acc:r,t:l,dist:Math.round(c),dt:Math.round(f),speed:Number(g.toFixed(2)),added:Math.round(E),reason:y,boostMs:Q()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:I()}}))},n=>{C=!1,v={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:I()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return C=!1,v={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function lt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>P()||await ee({silent:!0}))();const t=async()=>{P()||await ee({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}let H=!1;function te(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function h(){const e=document.querySelector("#cbsgoPuzzleModal");e&&e.remove(),H=!1}function ne(e){h();const t=document.createElement("div");t.id="cbsgoPuzzleModal",t.innerHTML=e,document.body.appendChild(t),H=!0;const n=document.querySelector("#pmClose");n&&(n.onclick=h);const o=document.querySelector("#pmOverlay");o&&(o.onclick=i=>{i.target===o&&h()})}function dt(e){return we()?"":`
  <div id="pmOverlay" style="
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,.55);
    backdrop-filter: blur(10px);
    display:flex; align-items:center; justify-content:center;
    padding:16px;
  ">
    <div style="
      width:min(520px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.6);
      overflow:hidden;
      color:#fff;
      font-family:system-ui, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
      ">
        <div style="font-weight:900;">✨ Daily Glow Puzzle</div>
        <button id="pmClose" type="button" style="
          border:0; padding:8px 10px; border-radius:12px;
          background:rgba(255,255,255,.08); color:#fff;
        ">Close</button>
      </div>

      <div style="padding:14px;">
        <div style="opacity:.9; font-size:13px;">
          This one spawns <b>on your location</b> so you can always do at least one puzzle even in bad weather.
        </div>

        <div style="
          margin-top:12px;
          padding:12px;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.04);
        ">
          <div style="font-weight:900; font-size:14px;">Mini-challenge</div>
          <div style="opacity:.85; font-size:13px; margin-top:6px;">
            Type <b>GLOW</b> to activate your 1-hour glow boost.
          </div>

          <div style="display:flex; gap:8px; margin-top:10px;">
            <input id="dailyAnswer" placeholder="Type GLOW" style="
              flex:1;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            "/>
            <button id="dailySubmit" class="btn" type="button" style="
              border:0;
              padding:10px 12px;
              border-radius:12px;
              background:rgba(255,255,255,.12);
              color:#fff;
              font-weight:800;
            ">OK</button>
          </div>

          <div id="dailyMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>
        </div>

        <div style="
          margin-top:12px;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.10);
          background:rgba(0,0,0,.18);
          font-size:12px;
          opacity:.85;
        ">
          Reward: <b>Glow Boost</b> (1 hour) → every <b>1500 steps</b> gives <b>+1 ticket</b>.
        </div>
      </div>
    </div>
  </div>
  `}function ct(){const e=document.querySelector("#dailyAnswer"),t=document.querySelector("#dailySubmit"),n=document.querySelector("#dailyMsg"),o=r=>{n&&(n.textContent=r||"")},i=()=>{if(String(e?.value||"").trim().toUpperCase()!=="GLOW"){o("❌ Not correct. Type GLOW.");return}tt(),nt(60),O(10),o("✅ Glow activated! 1 hour boost is ON (+10 XP)."),setTimeout(()=>h(),650)};t&&(t.onclick=i),e&&e.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}function pt(e){const t=e?.name||"Puzzle",n=String(e?.id||"");return`
  <div id="pmOverlay" style="
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,.55);
    backdrop-filter: blur(10px);
    display:flex; align-items:center; justify-content:center;
    padding:16px;
  ">
    <div style="
      width:min(520px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.6);
      overflow:hidden;
      color:#fff;
      font-family:system-ui, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
      ">
        <div style="font-weight:900;">🧩 ${te(t)}</div>
        <button id="pmClose" type="button" style="
          border:0; padding:8px 10px; border-radius:12px;
          background:rgba(255,255,255,.08); color:#fff;
        ">Close</button>
      </div>

      <div style="padding:14px;">
        <div style="opacity:.85; font-size:13px;">
          Quick puzzle. Answer correctly to complete this node (then it disappears).
        </div>

        <div style="
          margin-top:12px;
          padding:12px;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.04);
        ">
          <div style="font-weight:900; font-size:14px;">Mini-challenge</div>
          <div style="opacity:.85; font-size:13px; margin-top:6px;">
            Type <b>CBS</b> to complete this node.
          </div>

          <div style="display:flex; gap:8px; margin-top:10px;">
            <input id="nodeAnswer" placeholder="Type CBS" style="
              flex:1;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            "/>
            <button id="nodeSubmit" type="button" style="
              border:0;
              padding:10px 12px;
              border-radius:12px;
              background:rgba(255,255,255,.12);
              color:#fff;
              font-weight:800;
            ">OK</button>
          </div>

          <div id="nodeMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>
        </div>
      </div>

      <div style="
        padding:10px 14px;
        border-top:1px solid rgba(255,255,255,.10);
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:12px;
        opacity:.8;
      ">
        <span>Node ID: ${te(n)}</span>
        <span>Reward: +5 XP</span>
      </div>
    </div>
  </div>
  `}function ut(e){const t=document.querySelector("#nodeAnswer"),n=document.querySelector("#nodeSubmit"),o=document.querySelector("#nodeMsg"),i=l=>{o&&(o.textContent=l||"")},r=()=>{if(String(t?.value||"").trim().toUpperCase()!=="CBS"){i("❌ Not correct. Type CBS.");return}fe(e.id),O(5),i("✅ Completed! (+5 XP)"),setTimeout(()=>h(),650)};n&&(n.onclick=r),t&&t.addEventListener("keydown",l=>{l.key==="Enter"&&r()})}function oe(e){if(H&&h(),String(e?.type||"")==="daily"){if(we())return;const o=dt();if(!o)return;ne(o),ct();return}const n=pt(e);ne(n),ut(e)}function ie(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function gt(){const e=Number(_()||0),t=Number(T()||1),n=Number(ue()||0),o=ie(n,0,100),i=ie(o/100*100,0,100);return`
    <div style="min-width:180px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; line-height:1;">Level ${t}</div>
        <div style="opacity:.85; font-size:12px; white-space:nowrap;">
          ${o}/100 XP
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

      <div style="margin-top:6px; font-size:11px; opacity:.65;">
        Total XP: ${e}
      </div>
    </div>
  `}function ft(){const e=Ze()||{};return e.err?"🔴":e.lat&&P()?"🟢":P()?"🟡":"⚪"}function Se(){const e=I(),t=me();return`
    <div style="
      margin-top:6px;
      padding:8px 10px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      white-space:nowrap;
      font-size:12px;
    ">
      <span style="opacity:.9;">${ft()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function ke(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function bt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const F="cbsgo_leaderboard_v2",_e="cbsgo_player_name_v2",X="cbsgo_player_avatar_v2";function Ne(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function mt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function B(){try{return localStorage.getItem(_e)||"Sovereign"}catch{return"Sovereign"}}function Ee(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(_e,t)}catch{}return t}function D(){try{return localStorage.getItem(X)||""}catch{return""}}function yt(e){const t=String(e||"");try{localStorage.setItem(X,t)}catch{}return t}function vt(){try{localStorage.removeItem(X)}catch{}}function xt(e=10){const t=Ne(F,[]);return Array.isArray(t)?t.slice(0,e):[]}function ht(){const e=B(),t=D(),n=_(),o=T(),i=Ne(F,[]),r=Array.isArray(i)?i:[],l=r.find(a=>a.name===e);return l?(l.xp=n,l.level=o,l.avatar=t,l.t=Date.now()):r.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),r.sort((a,s)=>Number(s.xp||0)-Number(a.xp||0)),mt(F,r),{name:e,xp:n,level:o,avatar:t}}let u=null,S=null,b=null,L=!0;function A(e){return document.getElementById(e)}function x(e){const t=A("cbsgoMapHost");if(!t)return;let n=A("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="6000",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function wt(){const e=String(B()||"").trim();return e?e[0].toUpperCase():"🙂"}function St(e){const t=D();if(t){const i=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${t}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return e.divIcon({html:i,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const o=`
    <div style="
      width:42px;height:42px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.60);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:18px;color:#fff;
    ">${wt()}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[42,42],iconAnchor:[21,21]})}function kt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- overlay UI: kompas + recenter, linksboven -->
      <div style="
        position:absolute;
        top:12px;
        left:12px;
        z-index:6000;
        display:flex;
        flex-direction:column;
        gap:10px;
      ">
        <div id="cbsgoCompass" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.55);
          background:rgba(0,0,0,.65);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:20px;
          color:#fff;
          backdrop-filter:blur(12px);
        ">
          <div id="cbsgoCompassArrow" style="
            transition: transform .15s ease-out;
          ">🧭</div>
        </div>

        <button id="cbsgoRecenterBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.55);
          background:rgba(0,0,0,.75);
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          backdrop-filter:blur(12px);
        ">
          ⌖
        </button>
      </div>
    </div>
  `}function _t(){try{u&&(u.remove(),u=null,S=null)}catch{}}function Nt(){const e=window.L,t=A("cbsgoMap");return!e||!t?!1:(_t(),u=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(u),u.setView([51.687,4.87],15),u.on("dragstart",()=>{L=!1}),u.on("zoomstart",()=>{L=!1}),!0)}function j(e,t){if(!u||!window.L)return;const n=window.L,o=St(n);if(S?(S.setIcon(o),S.setLatLng([e,t])):S=n.marker([e,t],{icon:o}).addTo(u),L){const i=u.getZoom()||15,r=Math.max(i,16);u.setView([e,t],r,{animate:!0})}}function Et(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function zt(){let e=0;const t=80,n=()=>{if(e++,!A("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(x("Loading map engine…"),e<t)return setTimeout(n,100);x("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Nt()){x("Could not init map. Refresh.");return}b||(b={lat:51.687,lng:4.87,acc:null},j(b.lat,b.lng)),x("Waiting for GPS…"),Et();const i=document.getElementById("cbsgoRecenterBtn");i&&(i.onclick=()=>{if(L=!0,b&&u){const{lat:l,lng:a}=b,s=u.getZoom()||15,p=Math.max(s,16);u.setView([l,a],p,{animate:!0})}});const r=l=>{const a=l?.detail||{},s=Number(a.lat),p=Number(a.lng),d=Number(a.acc);!Number.isFinite(s)||!Number.isFinite(p)||(b={lat:s,lng:p,acc:d},j(s,p),Number.isFinite(d)?x(`GPS • ±${Math.round(d)}m`):x("GPS active"))};window.addEventListener("cbsgo:gps",r),b&&j(b.lat,b.lng)};n()}const J="cbsgo_wallet_v2",q="cbsgo_wallet_unlocked_v2";function R(){try{const e=localStorage.getItem(J);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function Mt(e){localStorage.setItem(J,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function Ct(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function ze(){return!!R()}function It(){return R()?sessionStorage.getItem(q)==="1":!1}function Pt(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");R()&&console.warn("CBS GO: overwriting existing wallet");const o=Ct();return Mt({pk:o,pin:t}),sessionStorage.setItem(q,"1"),o}function Lt(e){const t=R();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(q,"1"),t.pk}function At(){localStorage.removeItem(J),sessionStorage.removeItem(q)}typeof window<"u"&&(window.cbsgoDevResetWallet=At);const Me="cbsgoLoginModal";function Ce(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ie(){const e=document.getElementById(Me);e&&e.remove()}function $t(e){Ie();const t=document.createElement("div");return t.id=Me,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.innerHTML=e,document.body.appendChild(t),t}function Tt(e,t){return`
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
      ">${Ce(e)}</div>

      <div style="padding:14px 16px;">
        ${t}
      </div>
    </div>
  `}function z(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function re(e=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${e?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function Ot(){const e=!ze(),t=B()||"",n=e?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Ce(t)}" style="${z()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${z()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${z()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${re(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${z()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${re(!0)}">Unlock</button>
      </div>
    `,o=$t(Tt(e?"Welcome to CBS-GO":"Unlock Wallet",n)),i=o.querySelector("#cbsgoLoginMsg"),r=d=>{i&&(i.textContent=d||"")},l=o.querySelector("#cbsgoPin"),a=o.querySelector("#cbsgoPin2"),s=o.querySelector("#cbsgoNick"),p=()=>{Ie(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const d=o.querySelector("#cbsgoCreateBtn");d&&(d.onclick=async()=>{try{const c=String(s?.value||"").trim(),f=String(l?.value||"").trim(),g=String(a?.value||"").trim();if(c.length<2)return r("⛔ Nickname too short.");if(f.length<4)return r("⛔ PIN must be at least 4 digits.");if(f!==g)return r("⛔ PINs do not match.");r("Creating wallet…"),Ee(c),await Pt(f),r("✅ Wallet created. Starting…"),p()}catch(c){r(`⛔ ${String(c?.message||c)}`)}})}else{const d=o.querySelector("#cbsgoUnlockBtn");d&&(d.onclick=async()=>{try{const c=String(l?.value||"").trim();if(c.length<4)return r("⛔ PIN must be at least 4 digits.");r("Unlocking…"),await Lt(c),r("✅ Unlocked."),p()}catch{r("⛔ Wrong PIN (or wallet data missing).")}})}}function G(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function K(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function Pe(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function se(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function ae(e,t){return`
    <div style="
      position:fixed;
      left:0; right:0;
      bottom:0;
      z-index:6500;
      padding:12px 12px calc(86px + env(safe-area-inset-bottom));
      pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px, 96vw);
        margin:0 auto;
        border-radius:22px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.86);
        backdrop-filter: blur(12px);
        box-shadow:0 18px 60px rgba(0,0,0,.55);
        overflow:hidden;
      ">
        <div style="
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 14px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-weight:900;">${G(e)}</div>
          <button type="button" id="cbsgoClosePanel" style="
            border:0;
            padding:8px 10px;
            border-radius:12px;
            background:rgba(255,255,255,.08);
            color:#fff;
          ">Close</button>
        </div>

        <div style="
          max-height: min(70vh, 560px);
          overflow:auto;
          padding:12px 14px;
        ">
          ${t}
        </div>
      </div>
    </div>
  `}function Bt(){const e=xt(10),t=B(),n=D();return`
    <section class="lb" style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <h3 style="margin:0; font-size:16px;">Leaderboard</h3>
        <span class="pill">Local</span>
      </div>

      <div style="
        margin-top:10px;
        padding:10px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.10);
        background:rgba(0,0,0,.18);
      ">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Profile (auto-saves)</div>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          ${K(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${G(t)}" maxlength="24" style="
                flex:1; min-width:180px;
                padding:10px 10px;
                border-radius:12px;
                border:1px solid rgba(255,255,255,.14);
                background:rgba(255,255,255,.06);
                color:#fff;
              "/>
              <button class="btn" id="lbSubmit" type="button">Save my score</button>
            </div>

            <div style="margin-top:8px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbAvatar" type="file" accept="image/*" />
              <button class="btn secondary" id="lbRemoveAvatar" type="button">Remove photo</button>
            </div>

            <div id="lbMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
          </div>
        </div>
      </div>

      <div style="margin-top:10px;">
        ${e.length===0?'<div style="opacity:.75; font-size:13px;">No scores yet. Click “Save my score”.</div>':`
              <ol style="margin:0; padding-left:18px;">
                ${e.map((o,i)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${i+1}</div>
                      ${K(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${G(o.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">Level ${Number(o.level||1)}</div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">${Number(o.xp||0)} XP</div>
                  </li>
                `).join("")}
              </ol>
            `}
      </div>
    </section>
  `}function Dt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let i=null;const r=a=>{const s=document.querySelector("#lbMsg");s&&(s.textContent=a||"")};e&&r(`✅ Profile loaded: ${e.value}`);const l=()=>{if(!e)return;const a=Ee(e.value);r(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),i&&clearTimeout(i),i=setTimeout(l,300)}),e.addEventListener("blur",()=>{i&&clearTimeout(i),l()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}r("Uploading photo…");const s=new FileReader;s.onload=()=>{yt(String(s.result||"")),r("✅ Photo saved"),m()},s.onerror=()=>r("⛔ Failed to read image."),s.readAsDataURL(a)}),o&&(o.onclick=()=>{vt(),r("✅ Photo removed"),m()}),t&&(t.onclick=()=>{e&&l();const a=ht();r(`✅ Saved: ${a.name} – ${a.xp} XP`),m()})}function qt(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${me()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Rt(){const e=Pe();return e==="profile"?ae("Profile",`<div id="lbMount">${Bt()}</div>`):e==="bag"?ae("Bag",`<div id="bagMount">${qt()}</div>`):""}function Ut(){return`
    <div style="
      position:fixed;
      left:12px;
      bottom:90px;
      z-index:5500;
      display:flex;
      flex-direction:column;
      gap:10px;
      pointer-events:none;
    ">
      <button type="button" data-tab="profile" style="
        pointer-events:auto;
        width:52px; height:52px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.32);
        background:rgba(0,0,0,.70);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:22px;
        color:#fff;
        box-shadow:0 10px 26px rgba(0,0,0,.55);
        backdrop-filter:blur(12px);
      ">👤</button>

      <button type="button" data-tab="bag" style="
        pointer-events:auto;
        width:52px; height:52px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.32);
        background:rgba(0,0,0,.70);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:22px;
        color:#fff;
        box-shadow:0 10px 26px rgba(0,0,0,.55);
        backdrop-filter:blur(12px);
      ">🎒</button>
    </div>
  `}function jt(){const e=ke(),t=D();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${kt()}
      </div>

      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap:10px;
        pointer-events:none;
      ">
        <div style="
          display:flex; gap:10px; align-items:center;
          pointer-events:auto;
          padding:10px 12px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter: blur(10px);
        ">
          ${K(t,32)}
          <div style="font-weight:900; line-height:1;">CBS GO</div>
        </div>

        <div style="pointer-events:auto; display:flex; flex-direction:column; align-items:stretch;">
          <div id="xpMount" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
          ">
            ${gt()}
          </div>

          <div id="stepsMount">
            ${Se()}
          </div>
        </div>
      </header>

      ${Ut()}
      ${Rt()}

      ${e?`<button id="resetBtn" type="button" style="
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
  `}function Wt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");se(n||"map"),m()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{se("map"),m()})}function m(){const e=document.querySelector("#app");if(!e)return;if(!ze()||!It()){e.innerHTML=`
      <div style="
        position:fixed; inset:0;
        display:flex; align-items:center; justify-content:center;
        background:#05070b;
        color:#fff;
        font-family:system-ui, sans-serif;
        padding:18px;
        text-align:center;
      ">
        <div style="max-width:520px;">
          <div style="font-weight:900; font-size:20px;">CBS GO</div>
          <div style="opacity:.8; margin-top:8px;">Preparing secure local wallet…</div>
          <div style="opacity:.65; margin-top:6px; font-size:13px;">A PIN is required to unlock.</div>
        </div>
      </div>
    `,setTimeout(()=>Ot(),80),window.__cbsgo_login_listener_v1||(window.__cbsgo_login_listener_v1=!0,window.addEventListener("cbsgo:loginDone",()=>{m()}));return}if(e.innerHTML=jt(),Wt(),zt(),lt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=Se())};window.addEventListener("cbsgo:stepsChanged",n)}if(Pe()==="profile"&&Dt(),ke()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",bt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o)return;if(o==="__daily__"){oe({id:"__daily__",name:"Daily Glow"});return}if(ge(o))return;const i=Oe.find(r=>r.id===o);i&&oe(i)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",n=>{const o=n?.detail?.id;o&&Te(async()=>{const{completeNode:i}=await Promise.resolve().then(()=>qe);return{completeNode:i}},void 0).then(({completeNode:i})=>{i(o),m()})}))}function Le(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function $(e){const t=Le();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";$(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{$(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function le(){try{if(!document.getElementById("app")){$("❌ #app not found in index.html");return}m();const t=Le();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){$(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",le,{once:!0}):le();
