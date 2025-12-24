(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const ae=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],de="cbsgo_state_v6";function Ie(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ae(){return{xp:0,completed:{},updatedAt:Date.now()}}function _(){const e=localStorage.getItem(de);return Ie(e,Ae())}function le(e){e.updatedAt=Date.now(),localStorage.setItem(de,JSON.stringify(e))}function ce(e){return 100+(Math.max(1,Number(e||1))-1)*40}function P(){return Number(_().xp||0)}function K(){const e=P();let t=1,n=e;for(;;){const o=ce(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function $e(){const e=P();let t=1,n=e;for(;;){const o=ce(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function U(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=_();return n.xp=Number(n.xp||0)+t,le(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:K()}})),n}function pe(e){const t=String(e||"");if(!t)return!1;const n=_();return!!(n.completed&&n.completed[t])}function Ce(e){const t=String(e||"");if(!t)return;const n=_();n.completed||(n.completed={}),n.completed[t]=Date.now(),le(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const ue="cbsgo_inventory_v1";function Pe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Te(){return{tickets:0}}function R(){const e=localStorage.getItem(ue);return Pe(e,Te())}function De(e){localStorage.setItem(ue,JSON.stringify(e))}function ge(){return Number(R().tickets||0)}function fe(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return R();const n=R();return n.tickets=Number(n.tickets||0)+t,De(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const be="cbsgo_steps_v6",Oe="cbsgo_gps_autostart_v3",ye="cbsgo_daily_done_v2",Z=60,B=1500;let L=null,M=!1,h={msg:"init"};function Be(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Re(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function z(){const e=localStorage.getItem(be);return Be(e,Re())}function Y(e){e.updatedAt=Date.now(),localStorage.setItem(be,JSON.stringify(e))}function N(){return Number(z().steps||0)}function qe(){return h}function E(){return!!M}function I(){return new Date().toISOString().slice(0,10)}function T(){try{return localStorage.getItem(ye)===I()}catch{return!1}}function Ge(){try{localStorage.setItem(ye,I())}catch{}window.dispatchEvent(new CustomEvent("cbsgo:dailyDone",{detail:{date:I()}}))}function je(e,t){const o=l=>l*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(i/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function Ke(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,U(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,fe(1))}function Ue(e=Z){const t=z(),o=Date.now()+Number(e||Z)*60*1e3;t.boostUntil=Math.max(Number(t.boostUntil||0),o),t.boostLastStep=Number(t.steps||0),Y(t),window.dispatchEvent(new CustomEvent("cbsgo:boostChanged",{detail:{until:t.boostUntil}}))}function Ye(e){const t=Number(e.boostUntil||0);if(!t||Date.now()>t)return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0)-n;if(o<B)return;const i=Math.floor(o/B);fe(i),e.boostLastStep=n+i*B}function Fe(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return z();const n=z();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/.75);return o>(n.steps||0)&&(n.steps=o),Ke(n),Ye(n),Y(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Je(e,t){T()||window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:I()}}))}function We(){L!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(L),L=null}async function Q(e={}){const t=!!e.silent;if(!navigator.geolocation)return h={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Oe,"1")}catch{}We(),M=!0,h={msg:"requesting",t:Date.now()};const n=120;try{return L=navigator.geolocation.watchPosition(o=>{const i=o.coords.latitude,r=o.coords.longitude,s=o.coords.accuracy||999,a=Date.now(),d=z(),l=d.lastPos;if(d.lastPos={lat:i,lng:r,t:a},Y(d),h={lat:i,lng:r,acc:s,t:a},s<=n&&Je(i,r),s>n){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:N()}}));return}if(l&&typeof l.lat=="number"&&typeof l.lng=="number"&&typeof l.t=="number"){const c=je({lat:l.lat,lng:l.lng},{lat:i,lng:r}),g=Math.max(.5,(a-l.t)/1e3),f=c/g;c>=3&&c<=80&&f<=3.2&&Fe(c)}window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:N()}}))},o=>{M=!1,h={err:o?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:N()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return M=!1,h={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Xe(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>E()||await Q({silent:!0}))();const t=async()=>{E()||await Q({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}let F=!1;function ee(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function w(){const e=document.querySelector("#cbsgoPuzzleModal");e&&e.remove(),F=!1}function te(e){w();const t=document.createElement("div");t.id="cbsgoPuzzleModal",t.innerHTML=e,document.body.appendChild(t),F=!0;const n=document.querySelector("#pmClose");n&&(n.onclick=w);const o=document.querySelector("#pmOverlay");o&&(o.onclick=i=>{i.target===o&&w()})}function He(e){return T()?"":`
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
  `}function Ve(){const e=document.querySelector("#dailyAnswer"),t=document.querySelector("#dailySubmit"),n=document.querySelector("#dailyMsg"),o=r=>{n&&(n.textContent=r||"")},i=()=>{if(String(e?.value||"").trim().toUpperCase()!=="GLOW"){o("❌ Not correct. Type GLOW.");return}Ge(),Ue(60),U(10),o("✅ Glow activated! 1 hour boost is ON (+10 XP)."),setTimeout(()=>w(),650)};t&&(t.onclick=i),e&&e.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}function Ze(e){const t=e?.name||"Puzzle",n=String(e?.id||"");return`
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
  `}function Qe(e){const t=document.querySelector("#nodeAnswer"),n=document.querySelector("#nodeSubmit"),o=document.querySelector("#nodeMsg"),i=s=>{o&&(o.textContent=s||"")},r=()=>{if(String(t?.value||"").trim().toUpperCase()!=="CBS"){i("❌ Not correct. Type CBS.");return}Ce(e.id),U(5),i("✅ Completed! (+5 XP)"),setTimeout(()=>w(),650)};n&&(n.onclick=r),t&&t.addEventListener("keydown",s=>{s.key==="Enter"&&r()})}function ne(e){if(F&&w(),String(e?.type||"")==="daily"){if(T())return;const o=He();if(!o)return;te(o),Ve();return}const n=Ze(e);te(n),Qe(e)}function oe(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function et(){const e=Number(P()||0),t=Number(K()||1),n=Number($e()||0),o=oe(n,0,100),i=oe(o/100*100,0,100);return`
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
  `}function tt(){const e=qe();return e?.err?"🔴":e?.lat&&E()?"🟢":E()?"🟡":"⚪"}function me(){const e=N(),t=ge(),n=T();return`
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
      <span style="opacity:.9;">
        ${tt()} <b>${e}</b> steps
        ${n?'<span style="opacity:.65; margin-left:8px;">(daily ✅)</span>':""}
      </span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function xe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function nt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const q="cbsgo_leaderboard_v2",ve="cbsgo_player_name_v2",J="cbsgo_player_avatar_v2";function he(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ot(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function W(){try{return localStorage.getItem(ve)||"Sovereign"}catch{return"Sovereign"}}function it(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ve,t)}catch{}return t}function D(){try{return localStorage.getItem(J)||""}catch{return""}}function rt(e){const t=String(e||"");try{localStorage.setItem(J,t)}catch{}return t}function st(){try{localStorage.removeItem(J)}catch{}}function at(e=10){const t=he(q,[]);return Array.isArray(t)?t.slice(0,e):[]}function dt(){const e=W(),t=D(),n=P(),o=K(),i=he(q,[]),r=Array.isArray(i)?i:[],s=r.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):r.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),r.sort((a,d)=>Number(d.xp||0)-Number(a.xp||0)),ot(q,r),{name:e,xp:n,level:o,avatar:t}}let p=null,k=null,u=null,m=null;const G="cbsgo_nodes_pos_v3",we="cbsgo_daily_marker_v1";function A(e){return document.getElementById(e)}function y(e){const t=A("cbsgoMapHost");if(!t)return;let n=A("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function lt(){const e=String(W()||"").trim();return e?e[0].toUpperCase():"🙂"}function ct(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Se(e,t){const o=l=>l*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(i/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function ke(){return new Date().toISOString().slice(0,10)}function X(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function _e(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function ze(){return ae.filter(e=>e.type!=="group"&&!pe(e.id))}function pt(e){const t=D();if(t){const i=`
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
    ">${ct(lt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function ut(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"};
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function gt(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function ft(e){const t=X(G,null);if(t&&t.seed&&t.posById)return t;const n=ze(),o={},i=[],r=90,s=180,a=520,d=5e3;function l(f,x,b){const O=x*Math.cos(b)/111111,v=x*Math.sin(b)/(111111*Math.cos(f*Math.PI/180));return{dLat:O,dLng:v}}let c=0;for(const f of n){let x=!1;for(;!x&&c<d;){c++;const b=s+Math.random()*(a-s),O=Math.random()*Math.PI*2,v=l(e.lat,b,O),V={lat:e.lat+v.dLat,lng:e.lng+v.dLng};x=i.every(Ee=>Se(Ee,V)>=r),x&&(i.push(V),o[f.id]={dLat:v.dLat,dLng:v.dLng})}if(!o[f.id]){const b=l(e.lat,s,Math.random()*Math.PI*2);o[f.id]={dLat:b.dLat,dLng:b.dLng}}}const g={seed:e,posById:o,createdAt:Date.now()};return _e(G,g),g}function bt(e,t){const n=X(G,null),o=n?.seed||t,i=n?.posById?.[e.id];return!o||!i?null:{lat:o.lat+i.dLat,lng:o.lng+i.dLng}}function yt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function mt(){try{p&&(p.remove(),p=null,k=null,u=null,m=null)}catch{}}function xt(){const e=window.L,t=A("cbsgoMap");if(!e||!t)return!1;mt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return p=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(p),p.setView([51.687,4.87],16),u=e.layerGroup().addTo(p),!0}function vt(e){const t=window.L;if(!t||!p)return;const n=pt(t);if(!k){k=t.marker(e,{icon:n}).addTo(p),p.setView(e,18);return}k.setIcon(n),k.setLatLng(e)}function ht(e){const t=window.L;if(!t||!p||!u)return;const n=m;u.clearLayers(),n&&(m=n,m.addTo(u));const o=ft(e),i=ze(),r=65,s=1600,a=[];for(const d of i){const l=bt(d,o.seed);if(!l)continue;const c=Math.round(Se(e,l));c>s||a.push({node:d,ll:l,dist:c})}a.sort((d,l)=>d.dist-l.dist),a.forEach(({node:d,ll:l,dist:c})=>{const g=t.marker([l.lat,l.lng],{icon:ut(t,c<=r)});g.on("click",()=>{if(c>r){alert(`Too far.

Go closer to open:
${d.name}
Distance: ${c}m
Required: ≤ ${r}m`);return}window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:d.id}}))}),g.addTo(u)})}function wt(){return X(we,{date:"",shown:!1})}function Le(e){_e(we,e)}function Me(e){const t=window.L;if(!t||!p||!u)return;const n=wt(),o=ke();n.date===o&&n.shown===!1||(n.date!==o&&Le({date:o,shown:!0}),!m&&(m=t.marker([e.lat,e.lng],{icon:gt(t)}).addTo(u),m.on("click",()=>{window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:"__daily__"}}))}),y("✨ Daily Glow puzzle spawned on you (1x/day). Tap it to play.")))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Le({date:ke(),shown:!0}),p&&window.L&&u&&Me({lat:t.lat,lng:t.lng}))}));function St(){!navigator.geolocation||!p||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,i={lat:t,lng:n};vt([t,n]),Me(i),ht(i),y(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{y(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function kt(){let e=0;const t=120,n=()=>{if(e++,!A("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(y("Loading map engine…"),e<t)return setTimeout(n,100);y("Map engine failed to load (Leaflet not found). Refresh.");return}if(!xt()){y("Could not init map. Refresh.");return}y("Loading GPS…"),St()};n()}function $(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function j(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function H(){try{return sessionStorage.getItem("cbsgo_selected_tab_v6")||"map"}catch{return"map"}}function ie(e){try{sessionStorage.setItem("cbsgo_selected_tab_v6",e)}catch{}}function _t(){const e=H(),t=(n,o,i)=>`
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
      <div style="font-size:11px;">${$(o)}</div>
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
  `}function re(e,t){return`
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
          <div style="font-weight:900;">${$(e)}</div>
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
  `}function zt(){const e=at(10),t=W(),n=D();return`
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
          ${j(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${$(t)}" maxlength="24" style="
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
                      ${j(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${$(o.name)}
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
  `}function Lt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let i=null;const r=a=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=a||"")};e&&r(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const a=it(e.value);r(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),i&&clearTimeout(i),i=setTimeout(s,300)}),e.addEventListener("blur",()=>{i&&clearTimeout(i),s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}r("Uploading photo…");const d=new FileReader;d.onload=()=>{rt(String(d.result||"")),r("✅ Photo saved"),S()},d.onerror=()=>r("⛔ Failed to read image."),d.readAsDataURL(a)}),o&&(o.onclick=()=>{st(),r("✅ Photo removed"),S()}),t&&(t.onclick=()=>{e&&s();const a=dt();r(`✅ Saved: ${a.name} – ${a.xp} XP`),S()})}function Mt(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${ge()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Nt(){const e=H();return e==="profile"?re("Profile",`<div id="lbMount">${zt()}</div>`):e==="bag"?re("Bag",`<div id="bagMount">${Mt()}</div>`):""}function Et(){const e=xe(),t=D();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${yt()}
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
          ${j(t,32)}
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
            ${et()}
          </div>

          <div id="stepsMount">
            ${me()}
          </div>
        </div>
      </header>

      ${_t()}
      ${Nt()}

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
  `}function It(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");ie(n||"map"),S()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{ie("map"),S()})}function S(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Et(),It(),kt(),Xe(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=me())};window.addEventListener("cbsgo:stepsChanged",n),window.addEventListener("cbsgo:dailyDone",n)}if(H()==="profile"&&Lt(),xe()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",nt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||pe(o))return;const i=ae.find(r=>r.id===o);i&&ne(i)})),window.__cbsgo_daily_listener||(window.__cbsgo_daily_listener=!0,window.addEventListener("cbsgo:dailyPuzzle",n=>{const i={id:`daily-${n?.detail?.date||"today"}`,type:"daily",name:"Daily Glow Puzzle"};ne(i)}))}function Ne(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function C(e){const t=Ne();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";C(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{C(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function se(){try{if(!document.getElementById("app")){C("❌ #app not found in index.html");return}S();const t=Ne();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){C(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",se,{once:!0}):se();
