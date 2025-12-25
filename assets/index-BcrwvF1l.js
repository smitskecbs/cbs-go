(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Pe="modulepreload",Le=function(e){return"/cbs-go/"+e},Z={},Ae=function(t,n,o){let i=Promise.resolve();if(n&&n.length>0){let f=function(c){return Promise.all(c.map(a=>Promise.resolve(a).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var s=f;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),l=d?.nonce||d?.getAttribute("nonce");i=f(n.map(c=>{if(c=Le(c),c in Z)return;Z[c]=!0;const a=c.endsWith(".css"),g=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${g}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":Pe,a||(u.as="script"),u.crossOrigin="",u.href=c,l&&u.setAttribute("nonce",l),document.head.appendChild(u),a)return new Promise((_,b)=>{u.addEventListener("load",_),u.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return i.then(d=>{for(const l of d||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})},$e=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],le="cbsgo_state_v6";function Te(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Be(){return{xp:0,completed:{},updatedAt:Date.now()}}function S(){const e=localStorage.getItem(le);return Te(e,Be())}function ce(e){e.updatedAt=Date.now(),localStorage.setItem(le,JSON.stringify(e))}function pe(e){return 100+(Math.max(1,Number(e||1))-1)*40}function $(){return Number(S().xp||0)}function R(){const e=$();let t=1,n=e;for(;;){const o=pe(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function ue(){const e=$();let t=1,n=e;for(;;){const o=pe(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function T(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();return n.xp=Number(n.xp||0)+t,ce(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:R()}})),n}function ge(e){const t=String(e||"");if(!t)return!1;const n=S();return!!(n.completed&&n.completed[t])}function fe(e){const t=String(e||"");if(!t)return;const n=S();n.completed||(n.completed={}),n.completed[t]=Date.now(),ce(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Oe=Object.freeze(Object.defineProperty({__proto__:null,addXp:T,completeNode:fe,getLevel:R,getXp:$,getXpIntoLevel:ue,isNodeCompleted:ge},Symbol.toStringTag,{value:"Module"})),be="cbsgo_inventory_v1";function De(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function qe(){return{tickets:0}}function q(){const e=localStorage.getItem(be);return De(e,qe())}function Re(e){localStorage.setItem(be,JSON.stringify(e))}function me(){return Number(q().tickets||0)}function ye(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return q();const n=q();return n.tickets=Number(n.tickets||0)+t,Re(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const xe="cbsgo_steps_v6",We="cbsgo_gps_autostart_v2",ve="cbsgo_daily_puzzle_v1",he="cbsgo_daily_done_v1",Ue=.7,Ge=200,je=1,Fe=250,Ke=5,V=60,D=1500;let E=null,C=!1,m={msg:"init"};function Ye(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function He(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function h(){const e=localStorage.getItem(xe);return Ye(e,He())}function W(e){e.updatedAt=Date.now(),localStorage.setItem(xe,JSON.stringify(e))}function M(){return Number(h().steps||0)}function N(){return!!C}function Xe(){return m}function k(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ze(){try{return localStorage.getItem(ve)===k()}catch{return!1}}function Ve(){try{localStorage.setItem(ve,k())}catch{}}function Je(e,t){return Ze()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:k()}})),Ve(),!0)}function we(){try{return localStorage.getItem(he)===k()}catch{return!1}}function Qe(){try{localStorage.setItem(he,k())}catch{}}function J(){const e=h(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function et(e=V){const t=Number(e),n=(Number.isFinite(t)&&t>0?t:V)*60*1e3,o=h(),r=Date.now()+n;return o.boostUntil=Math.max(Number(o.boostUntil||0),r),o.boostLastStep=Number(o.steps||0),W(o),window.dispatchEvent(new CustomEvent("cbsgo:boostChanged",{detail:{boostUntil:o.boostUntil}})),{ok:!0,boostUntil:o.boostUntil}}function tt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const i=o-n;if(!Number.isFinite(i)||i<D)return;const r=Math.floor(i/D);r<=0||(ye(r),e.boostLastStep=n+r*D)}function nt(e,t){const o=f=>f*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),s=o(e.lat),d=o(t.lat),l=Math.sin(i/2)**2+Math.cos(s)*Math.cos(d)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}function ot(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,T(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ye(1))}function it(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return h();const n=h();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/Ue);return o>n.steps&&(n.steps=o),ot(n),tt(n),W(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function rt(){E!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(E),E=null}async function Q(e={}){const t=!!e.silent;if(!navigator.geolocation)return m={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(We,"1")}catch{}rt(),C=!0,m={msg:"requesting",t:Date.now()};try{return E=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,i=n.coords.longitude,r=n.coords.accuracy||999,s=Date.now(),d=h(),l=d.lastPos;d.lastPos={lat:o,lng:i,t:s},W(d);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,c=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:i,acc:r,heading:f,speed:c,t:s}})),window.dispatchEvent(new CustomEvent("cbsgo:gps",{detail:{lat:o,lng:i,acc:r}})),r>Ge){m={lat:o,lng:i,acc:r,t:s,reason:"accuracy",boostMs:J()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}));return}Je(o,i);let a=0,g=0,u=0,_=0,b="no-last";l&&typeof l.lat=="number"&&typeof l.lng=="number"&&typeof l.t=="number"&&(a=nt({lat:l.lat,lng:l.lng},{lat:o,lng:i}),g=Math.max(1,(s-l.t)/1e3),u=a/g,a<je?b="jitter":a>Fe?b="teleport":u>Ke?b="too-fast":(it(a),_=a,b="ok")),m={lat:o,lng:i,acc:r,t:s,dist:Math.round(a),dt:Math.round(g),speed:Number(u.toFixed(2)),added:Math.round(_),reason:b,boostMs:J()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}))},n=>{C=!1,m={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return C=!1,m={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function st(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>N()||await Q({silent:!0}))();const t=async()=>{N()||await Q({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}let U=!1;function ee(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function v(){const e=document.querySelector("#cbsgoPuzzleModal");e&&e.remove(),U=!1}function te(e){v();const t=document.createElement("div");t.id="cbsgoPuzzleModal",t.innerHTML=e,document.body.appendChild(t),U=!0;const n=document.querySelector("#pmClose");n&&(n.onclick=v);const o=document.querySelector("#pmOverlay");o&&(o.onclick=i=>{i.target===o&&v()})}function at(e){return we()?"":`
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
  `}function dt(){const e=document.querySelector("#dailyAnswer"),t=document.querySelector("#dailySubmit"),n=document.querySelector("#dailyMsg"),o=r=>{n&&(n.textContent=r||"")},i=()=>{if(String(e?.value||"").trim().toUpperCase()!=="GLOW"){o("❌ Not correct. Type GLOW.");return}Qe(),et(60),T(10),o("✅ Glow activated! 1 hour boost is ON (+10 XP)."),setTimeout(()=>v(),650)};t&&(t.onclick=i),e&&e.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}function lt(e){const t=e?.name||"Puzzle",n=String(e?.id||"");return`
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
        <div style="font-weight:900;">🧩 ${ee(t)}</div>
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
        <span>Node ID: ${ee(n)}</span>
        <span>Reward: +5 XP</span>
      </div>
    </div>
  </div>
  `}function ct(e){const t=document.querySelector("#nodeAnswer"),n=document.querySelector("#nodeSubmit"),o=document.querySelector("#nodeMsg"),i=s=>{o&&(o.textContent=s||"")},r=()=>{if(String(t?.value||"").trim().toUpperCase()!=="CBS"){i("❌ Not correct. Type CBS.");return}fe(e.id),T(5),i("✅ Completed! (+5 XP)"),setTimeout(()=>v(),650)};n&&(n.onclick=r),t&&t.addEventListener("keydown",s=>{s.key==="Enter"&&r()})}function ne(e){if(U&&v(),String(e?.type||"")==="daily"){if(we())return;const o=at();if(!o)return;te(o),dt();return}const n=lt(e);te(n),ct(e)}function oe(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function pt(){const e=Number($()||0),t=Number(R()||1),n=Number(ue()||0),o=oe(n,0,100),i=oe(o/100*100,0,100);return`
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
  `}function ut(){const e=Xe()||{};return e.err?"🔴":e.lat&&N()?"🟢":N()?"🟡":"⚪"}function Se(){const e=M(),t=me();return`
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
      <span style="opacity:.9;">${ut()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function ke(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function gt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const _e="cbsgo_player_name_v2",G="cbsgo_player_avatar_v2";function j(){try{return localStorage.getItem(_e)||"Sovereign"}catch{return"Sovereign"}}function ze(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(_e,t)}catch{}return t}function F(){try{return localStorage.getItem(G)||""}catch{return""}}function ft(e){const t=String(e||"");try{localStorage.setItem(G,t)}catch{}return t}function bt(){try{localStorage.removeItem(G)}catch{}}let p=null,w=null,I=null,P=!0,ie=0;function L(e){return document.getElementById(e)}function x(e){const t=L("cbsgoMapHost");if(!t)return;let n=L("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function mt(){const e=String(j()||"").trim();return e?e[0].toUpperCase():"🙂"}function yt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function xt(e){const t=F();if(t){const i=`
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
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${yt(mt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function vt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Night overlay (wordt donker bij nacht) -->
      <div id="cbsgoNightOverlay" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        background:rgba(0,0,0,0.0);
        mix-blend-mode:multiply;
        transition:background .3s ease-out;
        z-index:3000;
      "></div>

      <!-- overlay: kompas + weer + recenter, linksboven -->
      <div style="
        position:absolute;
        top:12px;
        left:12px;
        z-index:4000;
        display:flex;
        flex-direction:column;
        gap:10px;
      ">
        <div style="display:flex; gap:8px;">
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

          <div id="cbsgoWeather" style="
            min-width:64px;
            height:52px;
            border-radius:999px;
            border:1px solid rgba(255,255,255,.55);
            background:rgba(0,0,0,.65);
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding:2px 8px;
            font-size:12px;
            color:#fff;
            backdrop-filter:blur(12px);
            box-sizing:border-box;
          ">
            <div id="cbsgoWeatherIcon" style="font-size:18px; line-height:18px;">☀️</div>
            <div id="cbsgoWeatherTemp" style="margin-top:2px; font-size:11px; opacity:.9;">--°C</div>
          </div>
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
  `}function ht(){try{p&&(p.remove(),p=null,w=null,I=null)}catch{}}function wt(){const e=window.L,t=L("cbsgoMap");if(!e||!t)return!1;ht();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return p=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),p.on("dragstart",()=>{P=!1}),p.on("zoomstart",()=>{P=!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(p),p.setView([51.687,4.87],16),!0}function St(e){const t=window.L;if(!t||!p)return;const n=xt(t);if(!w){w=t.marker(e,{icon:n}).addTo(p),p.setView(e,18);return}w.setIcon(n),w.setLatLng(e)}function kt(e){const t=document.getElementById("cbsgoNightOverlay");t&&(t.style.background=e?"rgba(0,0,0,0.45)":"rgba(0,0,0,0.0)")}function _t(e,t){return e===0?t?"☀️":"🌙":e===1||e===2?t?"🌤️":"🌙":e===3?"☁️":e===45||e===48?"🌫️":e>=51&&e<=67?"🌦️":e>=80&&e<=82?"🌧️":e>=71&&e<=77?"🌨️":e>=95?"⛈️":t?"☀️":"🌙"}async function zt(e){const t=Date.now();if(!(t-ie<300*1e3)){ie=t;try{const n=`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(e.lat)}&longitude=${encodeURIComponent(e.lng)}&current_weather=true&timezone=auto`,o=await fetch(n);if(!o.ok)return;const r=(await o.json())?.current_weather;if(!r)return;const s=r.temperature,d=r.weathercode,l=r.is_day===1,f=_t(d,l),c=document.getElementById("cbsgoWeatherIcon"),a=document.getElementById("cbsgoWeatherTemp");c&&(c.textContent=f),a&&(a.textContent=`${Math.round(s)}°C`),kt(!l)}catch(n){console.warn("CBS GO weather fetch failed",n)}}}function Et(){!navigator.geolocation||!p||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,i={lat:t,lng:n};if(I=i,St([t,n]),P&&p){const r=p.getZoom()||16,s=Math.max(r,16);p.setView(i,s)}zt(i),x(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{x(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Ct(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function Mt(){let e=0;const t=120,n=()=>{if(e++,!L("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(x("Loading map engine…"),e<t)return setTimeout(n,100);x("Map engine failed to load (Leaflet not found). Refresh.");return}if(!wt()){x("Could not init map. Refresh.");return}Ct();const i=document.getElementById("cbsgoRecenterBtn");i&&(i.onclick=()=>{if(P=!0,I&&p){const r=p.getZoom()||16,s=Math.max(r,16);p.setView(I,s)}}),x("Loading GPS…"),Et()};n()}const K="cbsgo_wallet_v2",B="cbsgo_wallet_unlocked_v2";function O(){try{const e=localStorage.getItem(K);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function Nt(e){localStorage.setItem(K,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function It(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function Y(){return!!O()}function Pt(){return O()?sessionStorage.getItem(B)==="1":!1}function Lt(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");O()&&console.warn("CBS GO: overwriting existing wallet");const o=It();return Nt({pk:o,pin:t}),sessionStorage.setItem(B,"1"),o}function At(e){const t=O();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(B,"1"),t.pk}function $t(){localStorage.removeItem(K),sessionStorage.removeItem(B)}typeof window<"u"&&(window.cbsgoDevResetWallet=$t);const Ee="cbsgoLoginModal";function Ce(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Me(){const e=document.getElementById(Ee);e&&e.remove()}function Tt(e){Me();const t=document.createElement("div");return t.id=Ee,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.innerHTML=e,document.body.appendChild(t),t}function Bt(e,t){return`
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
  `}function Ot(){const e=!Y(),t=j()||"",n=e?`
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
    `,o=Tt(Bt(e?"Welcome to CBS-GO":"Unlock Wallet",n)),i=o.querySelector("#cbsgoLoginMsg"),r=c=>{i&&(i.textContent=c||"")},s=o.querySelector("#cbsgoPin"),d=o.querySelector("#cbsgoPin2"),l=o.querySelector("#cbsgoNick"),f=()=>{Me(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const c=o.querySelector("#cbsgoCreateBtn");c&&(c.onclick=async()=>{try{const a=String(l?.value||"").trim(),g=String(s?.value||"").trim(),u=String(d?.value||"").trim();if(a.length<2)return r("⛔ Nickname too short.");if(g.length<4)return r("⛔ PIN must be at least 4 digits.");if(g!==u)return r("⛔ PINs do not match.");r("Creating wallet…"),ze(a),await Lt(g),r("✅ Wallet created. Starting…"),f()}catch(a){r(`⛔ ${String(a?.message||a)}`)}})}else{const c=o.querySelector("#cbsgoUnlockBtn");c&&(c.onclick=async()=>{try{const a=String(s?.value||"").trim();if(a.length<4)return r("⛔ PIN must be at least 4 digits.");r("Unlocking…"),await At(a),r("✅ Unlocked."),f()}catch{r("⛔ Wrong PIN (or wallet data missing).")}})}}function H(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ne(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function X(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function se(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Dt(){const e=X(),t=(n,o,i)=>`
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
      <div style="font-size:11px;">${H(o)}</div>
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
  `}function ae(e,t){return`
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
          <div style="font-weight:900;">${H(e)}</div>
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
  `}function qt(){const e=j(),t=F(),n=Y();return`
    <section style="
      display:flex;
      flex-direction:column;
      gap:14px;
    ">
      <div style="
        padding:12px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.04);
      ">
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          ${Ne(t,52)}

          <div style="flex:1; min-width:220px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
            <input id="lbName" value="${H(e)}" maxlength="24" style="
              flex:1; min-width:180px;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            "/>

            <div id="lbMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
          </div>
        </div>

        <div style="margin-top:12px;">
          <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Profile photo</div>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <input id="lbAvatar" type="file" accept="image/*" />
            <button class="btn secondary" id="lbRemoveAvatar" type="button" style="
              padding:8px 10px;
              border-radius:10px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.08);
              color:#fff;
              font-size:12px;
            ">Remove photo</button>
          </div>
        </div>
      </div>

      <div style="
        padding:12px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.04);
      ">
        <div style="font-weight:900; font-size:15px; margin-bottom:4px;">CBS-GO Wallet</div>
        <div style="font-size:12px; opacity:.75; margin-bottom:6px;">
          This wallet lives only on this device (encrypted). It will be used for CBS-GO rewards later.
        </div>
        <div style="
          padding:8px 10px;
          border-radius:10px;
          border:1px solid rgba(255,255,255,.16);
          background:rgba(0,0,0,.35);
          font-family:monospace;
          font-size:12px;
          word-break:break-all;
        ">
          ${n?"Local CBS-GO wallet is active on this device.":"No wallet detected."}
        </div>
      </div>
    </section>
  `}function Rt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbAvatar"),n=document.querySelector("#lbRemoveAvatar");let o=null;const i=s=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=s||"")};e&&i(`✅ Profile loaded: ${e.value}`);const r=()=>{if(!e)return;const s=ze(e.value);i(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),o&&clearTimeout(o),o=setTimeout(r,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),r()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}i("Uploading photo…");const d=new FileReader;d.onload=()=>{ft(String(d.result||"")),i("✅ Photo saved"),y()},d.onerror=()=>i("⛔ Failed to read image."),d.readAsDataURL(s)}),n&&(n.onclick=()=>{bt(),i("✅ Photo removed"),y()})}function Wt(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">
        Items you collected while walking in the real world.
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill" style="
          padding:6px 10px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(0,0,0,.35);
          font-size:13px;
        ">
          🎟️ Tickets: <b>${me()}</b>
        </div>
      </div>

      <div style="margin-top:10px; font-size:12px; opacity:.65;">
        Later we can add fireworks, CBS/SOL/MON loot and more CBS-GO items here.
      </div>
    </div>
  `}function Ut(){const e=X();return e==="profile"?ae("Profile",`<div id="lbMount">${qt()}</div>`):e==="bag"?ae("Bag",`<div id="bagMount">${Wt()}</div>`):""}function Gt(){const e=ke(),t=F();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${vt()}
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
          ${Ne(t,32)}
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
            ${pt()}
          </div>

          <div id="stepsMount">
            ${Se()}
          </div>
        </div>
      </header>

      ${Dt()}
      ${Ut()}

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
  `}function jt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");se(n||"map"),y()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{se("map"),y()})}function y(){const e=document.querySelector("#app");if(!e)return;if(!Y()||!Pt()){e.innerHTML=`
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
    `,setTimeout(()=>Ot(),80),window.__cbsgo_login_listener_v1||(window.__cbsgo_login_listener_v1=!0,window.addEventListener("cbsgo:loginDone",()=>{y()}));return}if(e.innerHTML=Gt(),jt(),Mt(),st(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=Se())};window.addEventListener("cbsgo:stepsChanged",n)}if(X()==="profile"&&Rt(),ke()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",gt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o)return;if(o==="__daily__"){ne({id:"__daily__",name:"Daily Glow"});return}if(ge(o))return;const i=$e.find(r=>r.id===o);i&&ne(i)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",n=>{const o=n?.detail?.id;o&&Ae(async()=>{const{completeNode:i}=await Promise.resolve().then(()=>Oe);return{completeNode:i}},void 0).then(({completeNode:i})=>{i(o),y()})}))}function Ie(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function A(e){const t=Ie();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";A(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{A(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function de(){try{if(!document.getElementById("app")){A("❌ #app not found in index.html");return}y();const t=Ie();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){A(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",de,{once:!0}):de();
