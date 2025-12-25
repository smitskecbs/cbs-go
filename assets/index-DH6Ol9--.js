(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const De="modulepreload",Ue=function(e){return"/cbs-go/"+e},Z={},je=function(t,n,o){let i=Promise.resolve();if(n&&n.length>0){let p=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};var d=p;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");i=p(n.map(l=>{if(l=Ue(l),l in Z)return;Z[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":De,c||(g.as="script"),g.crossOrigin="",g.href=l,s&&g.setAttribute("nonce",s),document.head.appendChild(g),c)return new Promise((v,y)=>{g.addEventListener("load",v),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return i.then(a=>{for(const s of a||[])s.status==="rejected"&&r(s.reason);return t().catch(r)})},qe=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],ce="cbsgo_state_v6";function Re(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ge(){return{xp:0,completed:{},updatedAt:Date.now()}}function E(){const e=localStorage.getItem(ce);return Re(e,Ge())}function pe(e){e.updatedAt=Date.now(),localStorage.setItem(ce,JSON.stringify(e))}function ue(e){return 100+(Math.max(1,Number(e||1))-1)*40}function k(){return Number(E().xp||0)}function C(){const e=k();let t=1,n=e;for(;;){const o=ue(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function ge(){const e=k();let t=1,n=e;for(;;){const o=ue(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function U(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return E();const n=E();return n.xp=Number(n.xp||0)+t,pe(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:C()}})),n}function fe(e){const t=String(e||"");if(!t)return!1;const n=E();return!!(n.completed&&n.completed[t])}function be(e){const t=String(e||"");if(!t)return;const n=E();n.completed||(n.completed={}),n.completed[t]=Date.now(),pe(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const We=Object.freeze(Object.defineProperty({__proto__:null,addXp:U,completeNode:be,getLevel:C,getXp:k,getXpIntoLevel:ge,isNodeCompleted:fe},Symbol.toStringTag,{value:"Module"})),ye="cbsgo_inventory_v1";function Fe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ye(){return{tickets:0}}function F(){const e=localStorage.getItem(ye);return Fe(e,Ye())}function Ke(e){localStorage.setItem(ye,JSON.stringify(e))}function me(){return Number(F().tickets||0)}function xe(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return F();const n=F();return n.tickets=Number(n.tickets||0)+t,Ke(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ve="cbsgo_steps_v6",He="cbsgo_gps_autostart_v2",he="cbsgo_daily_puzzle_v1",we="cbsgo_daily_done_v1",Xe=.7,Je=200,Ze=1,Ve=250,Qe=5,V=60,G=1500;let P=null,L=!1,x={msg:"init"};function et(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function tt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function S(){const e=localStorage.getItem(ve);return et(e,tt())}function Y(e){e.updatedAt=Date.now(),localStorage.setItem(ve,JSON.stringify(e))}function $(){return Number(S().steps||0)}function A(){return!!L}function nt(){return x}function I(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function ot(){try{return localStorage.getItem(he)===I()}catch{return!1}}function it(){try{localStorage.setItem(he,I())}catch{}}function rt(e,t){return ot()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:I()}})),it(),!0)}function Se(){try{return localStorage.getItem(we)===I()}catch{return!1}}function st(){try{localStorage.setItem(we,I())}catch{}}function Q(){const e=S(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function at(e=V){const t=Number(e),n=(Number.isFinite(t)&&t>0?t:V)*60*1e3,o=S(),r=Date.now()+n;return o.boostUntil=Math.max(Number(o.boostUntil||0),r),o.boostLastStep=Number(o.steps||0),Y(o),window.dispatchEvent(new CustomEvent("cbsgo:boostChanged",{detail:{boostUntil:o.boostUntil}})),{ok:!0,boostUntil:o.boostUntil}}function lt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const i=o-n;if(!Number.isFinite(i)||i<G)return;const r=Math.floor(i/G);r<=0||(xe(r),e.boostLastStep=n+r*G)}function dt(e,t){const o=p=>p*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),d=o(e.lat),a=o(t.lat),s=Math.sin(i/2)**2+Math.cos(d)*Math.cos(a)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(s))}function ct(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,U(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,xe(1))}function pt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/Xe);return o>n.steps&&(n.steps=o),ct(n),lt(n),Y(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function ut(){P!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(P),P=null}async function ee(e={}){const t=!!e.silent;if(!navigator.geolocation)return x={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(He,"1")}catch{}ut(),L=!0,x={msg:"requesting",t:Date.now()};try{return P=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,i=n.coords.longitude,r=n.coords.accuracy||999,d=Date.now(),a=S(),s=a.lastPos;a.lastPos={lat:o,lng:i,t:d},Y(a);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,l=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:i,acc:r,heading:p,speed:l,t:d}})),window.dispatchEvent(new CustomEvent("cbsgo:gps",{detail:{lat:o,lng:i,acc:r}})),r>Je){x={lat:o,lng:i,acc:r,t:d,reason:"accuracy",boostMs:Q()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:$()}}));return}rt(o,i);let c=0,u=0,g=0,v=0,y="no-last";s&&typeof s.lat=="number"&&typeof s.lng=="number"&&typeof s.t=="number"&&(c=dt({lat:s.lat,lng:s.lng},{lat:o,lng:i}),u=Math.max(1,(d-s.t)/1e3),g=c/u,c<Ze?y="jitter":c>Ve?y="teleport":g>Qe?y="too-fast":(pt(c),v=c,y="ok")),x={lat:o,lng:i,acc:r,t:d,dist:Math.round(c),dt:Math.round(u),speed:Number(g.toFixed(2)),added:Math.round(v),reason:y,boostMs:Q()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:$()}}))},n=>{L=!1,x={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:$()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return L=!1,x={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function gt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>A()||await ee({silent:!0}))();const t=async()=>{A()||await ee({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}let K=!1;function te(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function w(){const e=document.querySelector("#cbsgoPuzzleModal");e&&e.remove(),K=!1}function ne(e){w();const t=document.createElement("div");t.id="cbsgoPuzzleModal",t.innerHTML=e,document.body.appendChild(t),K=!0;const n=document.querySelector("#pmClose");n&&(n.onclick=w);const o=document.querySelector("#pmOverlay");o&&(o.onclick=i=>{i.target===o&&w()})}function ft(e){return Se()?"":`
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
  `}function bt(){const e=document.querySelector("#dailyAnswer"),t=document.querySelector("#dailySubmit"),n=document.querySelector("#dailyMsg"),o=r=>{n&&(n.textContent=r||"")},i=()=>{if(String(e?.value||"").trim().toUpperCase()!=="GLOW"){o("❌ Not correct. Type GLOW.");return}st(),at(60),U(10),o("✅ Glow activated! 1 hour boost is ON (+10 XP)."),setTimeout(()=>w(),650)};t&&(t.onclick=i),e&&e.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}function yt(e){const t=e?.name||"Puzzle",n=String(e?.id||"");return`
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
  `}function mt(e){const t=document.querySelector("#nodeAnswer"),n=document.querySelector("#nodeSubmit"),o=document.querySelector("#nodeMsg"),i=d=>{o&&(o.textContent=d||"")},r=()=>{if(String(t?.value||"").trim().toUpperCase()!=="CBS"){i("❌ Not correct. Type CBS.");return}be(e.id),U(5),i("✅ Completed! (+5 XP)"),setTimeout(()=>w(),650)};n&&(n.onclick=r),t&&t.addEventListener("keydown",d=>{d.key==="Enter"&&r()})}function oe(e){if(K&&w(),String(e?.type||"")==="daily"){if(Se())return;const o=ft();if(!o)return;ne(o),bt();return}const n=yt(e);ne(n),mt(e)}function ie(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function xt(){const e=Number(k()||0),t=Number(C()||1),n=Number(ge()||0),o=ie(n,0,100),i=ie(o/100*100,0,100);return`
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
  `}function vt(){const e=nt()||{};return e.err?"🔴":e.lat&&A()?"🟢":A()?"🟡":"⚪"}function ke(){const e=$(),t=me();return`
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
      <span style="opacity:.9;">${vt()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function _e(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ht(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const ze="cbsgo_leaderboard_v2",Ee="cbsgo_player_name_v2",H="cbsgo_player_avatar_v2",Ne="cbsgo_player_bio_v1";function wt(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function St(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function _(){try{const e=localStorage.getItem(Ee);return e&&e.trim()?e:"Sovereign"}catch{return"Sovereign"}}function Ce(e){let t=String(e||"").replace(/\s+/g," ").trim();t||(t="Sovereign"),t=t.slice(0,32);try{localStorage.setItem(Ee,t)}catch{}return t}function j(){try{return localStorage.getItem(H)||""}catch{return""}}function kt(e){const t=String(e||"");try{localStorage.setItem(H,t)}catch{}return t}function re(){try{localStorage.removeItem(H)}catch{}}function Ie(){try{return localStorage.getItem(Ne)||""}catch{return""}}function _t(e){let t=String(e||"").trim();t=t.replace(/\s+/g," ").slice(0,140);try{localStorage.setItem(Ne,t)}catch{}return t}function Me(){const e=wt(ze,[]);return Array.isArray(e)?e:[]}function zt(e){Array.isArray(e)&&St(ze,e)}function Et(e=10){const t=Me();return t.sort((n,o)=>Number(o.t||0)-Number(n.t||0)),e&&Number.isFinite(e)?t.slice(0,e):t}function Nt(){const e=_(),t=j(),n=Ie(),o=k(),i=C(),r=Me(),d=Date.now();let a=r.find(s=>s&&s.name===e&&s.avatar===t&&s.bio===n);return a?(a.xp=o,a.level=i,a.t=d):(a={name:e,avatar:t,bio:n,xp:o,level:i,t:d},r.push(a)),zt(r),{name:e,avatar:t,bio:n,xp:o,level:i}}let f=null,z=null,m=null,B=!0;function T(e){return document.getElementById(e)}function h(e){const t=T("cbsgoMapHost");if(!t)return;let n=T("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="6000",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Ct(){const e=String(_()||"").trim();return e?e[0].toUpperCase():"🙂"}function It(e){const t=j();if(t){const i=`
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
    ">${Ct()}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[42,42],iconAnchor:[21,21]})}function Mt(){return`
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
  `}function Pt(){try{f&&(f.remove(),f=null,z=null)}catch{}}function Lt(){const e=window.L,t=T("cbsgoMap");return!e||!t?!1:(Pt(),f=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(f),f.setView([51.687,4.87],15),f.on("dragstart",()=>{B=!1}),f.on("zoomstart",()=>{B=!1}),!0)}function W(e,t){if(!f||!window.L)return;const n=window.L,o=It(n);if(z?(z.setIcon(o),z.setLatLng([e,t])):z=n.marker([e,t],{icon:o}).addTo(f),B){const i=f.getZoom()||15,r=Math.max(i,16);f.setView([e,t],r,{animate:!0})}}function $t(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function At(){let e=0;const t=80,n=()=>{if(e++,!T("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(h("Loading map engine…"),e<t)return setTimeout(n,100);h("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Lt()){h("Could not init map. Refresh.");return}m||(m={lat:51.687,lng:4.87,acc:null},W(m.lat,m.lng)),h("Waiting for GPS…"),$t();const i=document.getElementById("cbsgoRecenterBtn");i&&(i.onclick=()=>{if(B=!0,m&&f){const{lat:d,lng:a}=m,s=f.getZoom()||15,p=Math.max(s,16);f.setView([d,a],p,{animate:!0})}});const r=d=>{const a=d?.detail||{},s=Number(a.lat),p=Number(a.lng),l=Number(a.acc);!Number.isFinite(s)||!Number.isFinite(p)||(m={lat:s,lng:p,acc:l},W(s,p),Number.isFinite(l)?h(`GPS • ±${Math.round(l)}m`):h("GPS active"))};window.addEventListener("cbsgo:gps",r),m&&W(m.lat,m.lng)};n()}const X="cbsgo_wallet_v2",q="cbsgo_wallet_unlocked_v2";function R(){try{const e=localStorage.getItem(X);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function Bt(e){localStorage.setItem(X,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function Tt(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function Pe(){return!!R()}function Ot(){return R()?sessionStorage.getItem(q)==="1":!1}function Dt(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");R()&&console.warn("CBS GO: overwriting existing wallet");const o=Tt();return Bt({pk:o,pin:t}),sessionStorage.setItem(q,"1"),o}function Ut(e){const t=R();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(q,"1"),t.pk}function jt(){localStorage.removeItem(X),sessionStorage.removeItem(q)}typeof window<"u"&&(window.cbsgoDevResetWallet=jt);const Le="cbsgoLoginModal";function $e(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ae(){const e=document.getElementById(Le);e&&e.remove()}function qt(e){Ae();const t=document.createElement("div");return t.id=Le,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.innerHTML=e,document.body.appendChild(t),t}function Rt(e,t){return`
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
      ">${$e(e)}</div>

      <div style="padding:14px 16px;">
        ${t}
      </div>
    </div>
  `}function M(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function se(e=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${e?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function Gt(){const e=!Pe(),t=_()||"",n=e?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${$e(t)}" style="${M()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${M()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${M()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${se(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${M()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${se(!0)}">Unlock</button>
      </div>
    `,o=qt(Rt(e?"Welcome to CBS-GO":"Unlock Wallet",n)),i=o.querySelector("#cbsgoLoginMsg"),r=l=>{i&&(i.textContent=l||"")},d=o.querySelector("#cbsgoPin"),a=o.querySelector("#cbsgoPin2"),s=o.querySelector("#cbsgoNick"),p=()=>{Ae(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const l=o.querySelector("#cbsgoCreateBtn");l&&(l.onclick=async()=>{try{const c=String(s?.value||"").trim(),u=String(d?.value||"").trim(),g=String(a?.value||"").trim();if(c.length<2)return r("⛔ Nickname too short.");if(u.length<4)return r("⛔ PIN must be at least 4 digits.");if(u!==g)return r("⛔ PINs do not match.");r("Creating wallet…"),Ce(c),await Dt(u),r("✅ Wallet created. Starting…"),p()}catch(c){r(`⛔ ${String(c?.message||c)}`)}})}else{const l=o.querySelector("#cbsgoUnlockBtn");l&&(l.onclick=async()=>{try{const c=String(d?.value||"").trim();if(c.length<4)return r("⛔ PIN must be at least 4 digits.");r("Unlocking…"),await Ut(c),r("✅ Unlocked."),p()}catch{r("⛔ Wrong PIN (or wallet data missing).")}})}}function b(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Wt(e,t=30,n="👤"){const o=e?`background-image:url('${e}');`:"",i=e?"":n;return`
    <div style="
      width:${t}px;height:${t}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${o}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:${Math.round(t*.55)}px;
    ">${i}</div>
  `}function O(e){const t=String(e||"").trim();return t?t[0].toUpperCase():"🙂"}function J(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function ae(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Ft(){const e=J(),t=(n,o,i)=>`
    <button type="button" data-tab="${n}" style="
      flex:1;
      height:56px;
      border:0;
      background:transparent;
      color:#fff;
      opacity:${e===n?"1":".72"};
      font:inherit;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:2px;
    ">
      <div style="font-size:18px; line-height:18px;">${i}</div>
      <div style="font-size:11px;">${b(o)}</div>
    </button>
  `;return`
    <nav style="
      position:fixed;
      left:0; right:0; bottom:0;
      z-index:5000;
      padding:10px 10px calc(10px + env(safe-area-inset-bottom));
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      border-top:1px solid rgba(255,255,255,.10);
    ">
      <div style="
        display:flex;
        gap:8px;
        border-radius:18px;
        border:1px solid rgba(255,255,255,.10);
        background:rgba(0,0,0,.18);
        overflow:hidden;
      ">
        ${t("map","Map","🗺️")}
        ${t("profile","Profile","👤")}
        ${t("bag","Bag","🎒")}
      </div>
    </nav>
  `}function le(e,t){return`
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
          <div style="font-weight:900;">${b(e)}</div>
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
  `}function Yt(){const e=_(),t=j(),n=Ie(),o=k(),i=C(),r=Et(20),d=t?`
      background-image:url('${b(t)}');
      background-size:cover;
      background-position:center;
    `:`
      background:#020617;
      display:flex;align-items:center;justify-content:center;
      font-size:22px;font-weight:900;
    `,a=t?"":b(O(e)),s=r.map(l=>{const c=b(l.name||"Sovereign"),u=b(l.bio||""),g=Number(l.level||1),v=Number(l.xp||0),y=l.avatar||"",Te=y?`<div style="
              width:36px;height:36px;border-radius:999px;
              border:1px solid rgba(255,255,255,.5);
              background-image:url('${b(y)}');
              background-size:cover;background-position:center;
            "></div>`:`<div style="
              width:36px;height:36px;border-radius:999px;
              border:1px solid rgba(255,255,255,.5);
              background:#020617;
              display:flex;align-items:center;justify-content:center;
              font-size:16px;font-weight:800;
            ">${b(O(c))}</div>`,Oe=u?`<div style="font-size:11px;opacity:.85;margin-top:2px;">“${u}”</div>`:"";return`
        <div style="
          display:flex;align-items:flex-start;gap:10px;
          padding:8px 10px;
          border-radius:12px;
          border:1px solid rgba(148,163,184,.28);
          background:rgba(15,23,42,.75);
        ">
          ${Te}
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;">${c}</div>
            <div style="font-size:11px;opacity:.8;margin-top:1px;">
              Level ${g} • ${v} XP
            </div>
            ${Oe}
          </div>
        </div>
      `}).join(""),p=r.length===0?`
      <p style="font-size:12px;opacity:.7;margin:4px 0 0;">
        Nobody else has walked here on this device yet.
        You are starting this journey — others will follow 🌱
      </p>
    `:`
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;">
        ${s}
      </div>
    `;return`
    <div style="
      font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      color:#e5e7eb;
    ">
      <div style="
        margin-bottom:10px;
        padding:10px 10px 12px;
        border-radius:18px;
        border:1px solid rgba(148,163,184,.45);
        background:radial-gradient(circle at top,#0f172a,#020617);
      ">
        <h2 style="margin:0 0 4px;font-size:16px;font-weight:700;">
          Your CBS-GO Identity
        </h2>
        <p style="margin:0 0 10px;font-size:12px;opacity:.85;max-width:420px;">
          Choose how you want to be seen in this world. No rankings, no competition —
          just people walking their own path toward sovereignty and freedom.
        </p>

        <div style="display:flex;gap:12px;align-items:center;margin-bottom:10px;flex-wrap:wrap;">
          <div id="profileAvatarPreview" style="
            width:64px;height:64px;border-radius:999px;
            border:2px solid rgba(248,250,252,.95);
            box-shadow:0 14px 40px rgba(0,0,0,.55);
            ${d}
          ">
            ${a}
          </div>

          <div style="flex:1;min-width:200px;">
            <label style="font-size:12px;opacity:.9;display:block;">
              Nickname
            </label>
            <input
              id="profileName"
              type="text"
              maxlength="32"
              value="${b(e)}"
              placeholder="Your name or alias"
              style="
                width:100%;margin-top:4px;
                padding:8px 10px;
                border-radius:10px;
                border:1px solid rgba(148,163,184,.7);
                background:rgba(15,23,42,.9);
                color:#e5e7eb;
                font-size:13px;
              "
            />
            <div style="font-size:11px;opacity:.7;margin-top:3px;">
              This is how others see you in CBS-GO.
            </div>
          </div>
        </div>

        <label style="font-size:12px;opacity:.9;display:block;margin-bottom:4px;">
          Short message / quote <span style="opacity:.8">(optional)</span>
        </label>
        <textarea
          id="profileBio"
          rows="2"
          maxlength="140"
          placeholder="Something small about you — your journey, values, or vision."
          style="
            width:100%;
            padding:8px 10px;
            border-radius:10px;
            border:1px solid rgba(148,163,184,.7);
            background:rgba(15,23,42,.9);
            color:#e5e7eb;
            font-size:12px;
            resize:none;
          "
        >${b(n)}</textarea>

        <div style="margin-top:10px;">
          <label style="font-size:12px;opacity:.9;display:block;margin-bottom:4px;">
            Avatar (image URL, optional)
          </label>
          <input
            id="profileAvatarUrl"
            type="url"
            value="${b(t)}"
            placeholder="https://… (leave empty to use your initial)"
            style="
              width:100%;
              padding:8px 10px;
              border-radius:10px;
              border:1px solid rgba(148,163,184,.7);
              background:rgba(15,23,42,.9);
              color:#e5e7eb;
              font-size:12px;
            "
          />
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap;">
            <button id="profileAvatarClear" type="button" style="
              padding:5px 9px;
              border-radius:999px;
              border:0;
              background:rgba(248,250,252,.12);
              color:#e5e7eb;
              font-size:11px;
            ">
              Use initial instead
            </button>
            <div style="font-size:11px;opacity:.7;">
              No upload — your avatar stays in your browser only.
            </div>
          </div>
        </div>

        <div style="
          margin-top:12px;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(94,234,212,.35);
          background:linear-gradient(135deg,rgba(34,197,94,.18),rgba(45,212,191,.10));
        ">
          <div style="font-size:12px;font-weight:600;margin-bottom:4px;">
            Your journey
          </div>
          <div style="font-size:12px;opacity:.9;">
            Level <b>${i}</b> • <b>${o}</b> XP
          </div>
          <div style="font-size:11px;opacity:.75;margin-top:4px;max-width:360px;">
            Every step you take is part of your story.
            You don’t have to outrun anyone — just keep moving in your own way.
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:12px;">
          <button id="profileSaveBtn" type="button" style="
            padding:8px 14px;
            border-radius:999px;
            border:0;
            background:linear-gradient(135deg,#22c55e,#14b8a6);
            color:#020617;
            font-size:13px;
            font-weight:800;
            box-shadow:0 10px 30px rgba(22,163,74,.45);
          ">
            Save identity
          </button>
        </div>

        <div id="profileMsg" style="margin-top:6px;font-size:11px;opacity:.8;"></div>
      </div>

      <div style="
        margin-top:8px;
        padding:10px;
        border-radius:16px;
        border:1px solid rgba(148,163,184,.35);
        background:rgba(15,23,42,.88);
      ">
        <div style="font-size:13px;font-weight:600;margin-bottom:2px;">
          People walking this journey (local)
        </div>
        <p style="font-size:11px;opacity:.8;margin:0 0 6px;max-width:380px;">
          This is a small community list stored on your device.
          It’s not a global ranking — just a reminder you’re not walking alone.
        </p>

        ${p}
      </div>
    </div>
  `}function Kt(){const e=document.getElementById("profileName"),t=document.getElementById("profileBio"),n=document.getElementById("profileAvatarUrl"),o=document.getElementById("profileAvatarPreview"),i=document.getElementById("profileSaveBtn"),r=document.getElementById("profileAvatarClear"),d=document.getElementById("profileMsg"),a=p=>{d&&(d.textContent=p||"")},s=()=>{if(!o||!e||!n)return;const p=(n.value||"").trim(),l=(e.value||_()).trim()||"Sovereign";p?(o.style.backgroundImage=`url('${p}')`,o.style.backgroundSize="cover",o.style.backgroundPosition="center",o.style.background="none",o.textContent=""):(o.style.backgroundImage="none",o.style.background="#020617",o.textContent=O(l))};e&&e.addEventListener("input",()=>{s(),a("Editing…")}),n&&n.addEventListener("input",()=>{s(),a("Editing…")}),r&&n&&r.addEventListener("click",()=>{n.value="",re(),s(),a("Using initial instead of photo.")}),i&&i.addEventListener("click",()=>{const p=e?.value||"",l=t?.value||"",c=n?.value||"",u=Ce(p);_t(l),c.trim()?kt(c.trim()):re(),Nt(),s(),a(`Saved: ${u}`),i.textContent="Saved ✓",i.disabled=!0,setTimeout(()=>{i.textContent="Save identity",i.disabled=!1},1200)}),s()}function Ht(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
      font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      color:#e5e7eb;
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${me()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Xt(){const e=J();return e==="profile"?le("Profile",`<div id="profileMount">${Yt()}</div>`):e==="bag"?le("Bag",`<div id="bagMount">${Ht()}</div>`):""}function Jt(){const e=_e(),t=j();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Mt()}
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
          ${Wt(t,32,O(_()))}
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
            ${xt()}
          </div>

          <div id="stepsMount">
            ${ke()}
          </div>
        </div>
      </header>

      ${Ft()}
      ${Xt()}

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
  `}function Zt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");ae(n||"map"),N()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{ae("map"),N()})}function N(){const e=document.querySelector("#app");if(!e)return;if(!Pe()||!Ot()){e.innerHTML=`
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
    `,setTimeout(()=>Gt(),80),window.__cbsgo_login_listener_v1||(window.__cbsgo_login_listener_v1=!0,window.addEventListener("cbsgo:loginDone",()=>{N()}));return}if(e.innerHTML=Jt(),Zt(),At(),gt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=ke())};window.addEventListener("cbsgo:stepsChanged",n)}if(J()==="profile"&&Kt(),_e()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",ht)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o)return;if(o==="__daily__"){oe({id:"__daily__",name:"Daily Glow"});return}if(fe(o))return;const i=qe.find(r=>r.id===o);i&&oe(i)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",n=>{const o=n?.detail?.id;o&&je(async()=>{const{completeNode:i}=await Promise.resolve().then(()=>We);return{completeNode:i}},void 0).then(({completeNode:i})=>{i(o),N()})}))}function Be(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function D(e){const t=Be();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";D(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{D(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function de(){try{if(!document.getElementById("app")){D("❌ #app not found in index.html");return}N();const t=Be();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){D(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",de,{once:!0}):de();
