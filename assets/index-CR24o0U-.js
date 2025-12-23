(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Q=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Z="cbsgo_state_v3";function ve(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function xe(){return{xp:0,completed:{}}}function A(){const e=localStorage.getItem(Z);return ve(e,xe())}function ee(e){localStorage.setItem(Z,JSON.stringify(e))}function q(){return Number(A().xp||0)}function te(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function he(e){return Math.max(0,Number(e||0))%100}function P(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return q();const n=A();return n.xp=Number(n.xp||0)+t,ee(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function j(e){const t=String(e||"");return t?!!A().completed?.[t]:!1}function we(e){const t=String(e||"");if(!t)return!1;const n=A();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),ee(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}const ne="cbsgo_inventory_v1";function Se(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ke(){return{tickets:0}}function T(){const e=localStorage.getItem(ne);return Se(e,ke())}function _e(e){localStorage.setItem(ne,JSON.stringify(e))}function oe(){return Number(T().tickets||0)}function ie(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+t,_e(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}let O=!1;function G(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function w(){const e=document.getElementById("cbsgoModal");e&&e.remove(),O=!1}function Me(e,t){return`
    <div id="cbsgoModal" style="
      position:fixed; inset:0;
      z-index:99999;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:16px;
      background:rgba(0,0,0,.62);
      backdrop-filter: blur(6px);
    ">
      <div style="
        width:min(520px, 96vw);
        border-radius:20px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.92);
        box-shadow:0 24px 80px rgba(0,0,0,.55);
        overflow:hidden;
        color:#fff;
        font-family:system-ui, sans-serif;
      ">
        <div style="
          padding:14px 14px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-weight:900;">${G(e)}</div>
          <button id="cbsgoModalClose" type="button" style="
            border:0;
            padding:8px 10px;
            border-radius:12px;
            background:rgba(255,255,255,.08);
            color:#fff;
          ">Close</button>
        </div>

        <div style="padding:14px 14px;">
          ${t}
        </div>
      </div>
    </div>
  `}function Ee(e){return`
    <div style="opacity:.85; font-size:14px;">
      ✅ You already completed <b>${G(e?.name||"this node")}</b>.
    </div>
    <div style="opacity:.7; font-size:12px; margin-top:10px;">
      Go to another puzzle node on the map.
    </div>
  `}function Le(e){return`
    <div style="opacity:.9; font-size:14px;">
      Puzzle: <b>${G(e?.name||"Puzzle")}</b>
    </div>
    <div style="opacity:.72; font-size:12px; margin-top:6px;">
      Type the correct answer to complete this node.
    </div>

    <div style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:800;">Question</div>
      <div style="opacity:.85; margin-top:6px;">
        Type <b>5</b>
      </div>

      <div style="display:flex; gap:10px; margin-top:12px; align-items:center; flex-wrap:wrap;">
        <input id="cbsgoAnswer" inputmode="numeric" placeholder="Answer…" style="
          flex:1; min-width:160px;
          padding:10px 10px;
          border-radius:12px;
          border:1px solid rgba(255,255,255,.14);
          background:rgba(255,255,255,.06);
          color:#fff;
          outline:none;
        "/>
        <button id="cbsgoSubmit" class="btn" type="button" style="
          border:0;
          padding:10px 12px;
          border-radius:12px;
          background:rgba(255,255,255,.14);
          color:#fff;
          font-weight:800;
        ">Submit</button>
      </div>

      <div id="cbsgoResult" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Rewards:
        <br/>❌ Fail: <b>+1 XP</b>
        <br/>✅ Success: <b>+5 XP</b> + <b>+1 Ticket</b> (once per node)
      </div>
    </div>
  `}function $e(e){if(O)return;O=!0;const t=String(e?.id||""),n=t?j(t):!1,o=n?Ee(e):Le(e);document.body.insertAdjacentHTML("beforeend",Me(e?.name||"Puzzle",o));const i=document.getElementById("cbsgoModal"),r=document.getElementById("cbsgoModalClose");if(r&&(r.onclick=w),i&&i.addEventListener("click",p=>{p.target===i&&w()}),n)return;const s=document.getElementById("cbsgoAnswer"),a=document.getElementById("cbsgoSubmit"),d=document.getElementById("cbsgoResult"),l=p=>{d&&(d.innerHTML=p||"")},x=()=>{if(String(s?.value||"").trim()!=="5"){P(1),l("❌ Wrong. <b>+1 XP</b>"),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged"));return}if(!we(t)){l("✅ Already completed earlier.");return}P(5),ie(1),l("✅ Correct! <b>+5 XP</b> + <b>+1 Ticket</b>"),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged")),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),setTimeout(()=>w(),650)};a&&(a.onclick=x),s&&(s.focus(),s.addEventListener("keydown",p=>{p.key==="Enter"&&x(),p.key==="Escape"&&w()}))}function H(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function ze(){const e=Number(q()||0),t=Number(te(e)||1),n=Number(he(e)||0),o=H(n,0,100),i=H(o/100*100,0,100);return`
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
  `}const re="cbsgo_steps_v4",Ne="cbsgo_gps_autostart_v2";let S=null,k=!1,y={msg:"init"};function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ie(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function E(){const e=localStorage.getItem(re);return Ae(e,Ie())}function se(e){e.updatedAt=Date.now(),localStorage.setItem(re,JSON.stringify(e))}function _(){return Number(E().steps||0)}function L(){return!!k}function Ce(){return y}function Pe(e,t){const o=l=>l*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(i/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function Te(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,P(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ie(1))}function Oe(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return E();const n=E();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/.75);return o>n.steps&&(n.steps=o),Te(n),se(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Be(){S!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(S),S=null}async function K(e={}){const t=!!e.silent;if(!navigator.geolocation)return y={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Ne,"1")}catch{}Be(),k=!0,y={msg:"requesting",t:Date.now()};const n=200;try{return S=navigator.geolocation.watchPosition(o=>{const i=o.coords.latitude,r=o.coords.longitude,s=o.coords.accuracy||999;y={lat:i,lng:r,acc:s,t:Date.now()};const a=E(),d=a.lastPos;if(a.lastPos={lat:i,lng:r,t:Date.now()},se(a),s>n){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:_()}}));return}if(d&&typeof d.lat=="number"&&typeof d.lng=="number"){const l=Pe({lat:d.lat,lng:d.lng},{lat:i,lng:r});l>=2&&l<=60&&Oe(l)}window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:_()}}))},o=>{k=!1,y={err:o?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:_()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return k=!1,y={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Re(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>L()||await K({silent:!0}))();const t=async()=>{L()||await K({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function De(){const e=Ce();return e?.err?"🔴":e?.lat&&L()?"🟢":L()?"🟡":"⚪"}function ae(){const e=_(),t=oe();return`
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
      <span style="opacity:.9;">${De()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function de(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function qe(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const B="cbsgo_leaderboard_v2",le="cbsgo_player_name_v2",Y="cbsgo_player_avatar_v2";function ce(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function je(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function pe(){try{return localStorage.getItem(le)||"Sovereign"}catch{return"Sovereign"}}function Ge(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(le,t)}catch{}return t}function F(){try{return localStorage.getItem(Y)||""}catch{return""}}function Ye(e){const t=String(e||"");try{localStorage.setItem(Y,t)}catch{}return t}function Fe(){try{localStorage.removeItem(Y)}catch{}}function Xe(e=10){const t=ce(B,[]);return Array.isArray(t)?t.slice(0,e):[]}function Je(){const e=pe(),t=F(),n=q(),o=te(n),i=ce(B,[]),r=Array.isArray(i)?i:[],s=r.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):r.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),r.sort((a,d)=>Number(d.xp||0)-Number(a.xp||0)),je(B,r),{name:e,xp:n,level:o,avatar:t}}let c=null,M=null,h=null;const He="cbsgo_last_pos_v5",R="cbsgo_nodes_pos_v5",Ke=1200,C=60,We=120;function $(e){return document.getElementById(e)}function ue(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ge(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function u(e){const t=$("cbsgoMapHost");if(!t)return;let n=$("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function fe(e,t){const o=l=>l*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(i/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function be(){return Q.filter(e=>e.type!=="group"&&!j(String(e.id)))}function Ue(e){const t=ue(R,null);if(t&&t.seed&&t.posById)return t;const n=be(),o={},i=[],r=90,s=160,a=420,d=4e3;function l(f,b,g){const I=b*Math.cos(g)/111111,m=b*Math.sin(g)/(111111*Math.cos(f*Math.PI/180));return{dLat:I,dLng:m}}let x=0;for(const f of n){let b=!1;for(;!b&&x<d;){x++;const g=s+Math.random()*(a-s),I=Math.random()*Math.PI*2,m=l(e.lat,g,I),J={lat:e.lat+m.dLat,lng:e.lng+m.dLng};b=i.every(ye=>fe(ye,J)>=r),b&&(i.push(J),o[f.id]={dLat:m.dLat,dLng:m.dLng})}if(!o[f.id]){const g=l(e.lat,s,Math.random()*Math.PI*2);o[f.id]={dLat:g.dLat,dLng:g.dLng}}}const p={seed:e,posById:o,createdAt:Date.now()};return ge(R,p),p}function Ve(e,t){const n=ue(R,null),o=n?.seed||t,i=n?.posById?.[e.id];return!o||!i?null:{lat:o.lat+i.dLat,lng:o.lng+i.dLng}}function Qe(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function Ze(){try{c&&(c.remove(),c=null,M=null,h=null)}catch{}}function et(){const e=window.L,t=$("cbsgoMap");return!e||!t?!1:(Ze(),c=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(c),c.setView([51.687,4.87],16),h=e.layerGroup().addTo(c),!0)}function tt(e){const t=window.L;if(!t||!c||!h)return;h.clearLayers();const n=Ue(e),o=be(),i=[];for(const s of o){const a=Ve(s,n.seed);if(!a)continue;const d=Math.round(fe(e,a));d>Ke||i.push({node:s,ll:a,dist:d})}if(i.sort((s,a)=>s.dist-a.dist),i.length===0){u("No puzzle nodes nearby yet. Walk a bit (GPS) or zoom out slightly.");return}const r=i[0];u(`Nearest puzzle: ${r.node.name} • ${r.dist}m • Open within ${C}m`),i.forEach(({node:s,ll:a,dist:d})=>{const l=t.circleMarker([a.lat,a.lng],{radius:11,weight:2,opacity:.95,fillOpacity:.35});l.bindTooltip(`${s.name} • ${d}m`,{direction:"top",offset:[0,-10]}),l.on("click",()=>{if(d>C){alert(`Too far.

Go closer to open:
${s.name}
Distance: ${d}m
Required: ≤ ${C}m`);return}window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:String(s.id)}}))}),l.addTo(h)})}function nt(){!navigator.geolocation||!c||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,i=window.L;if(o&&o>We){u(`GPS OK • accuracy ~${Math.round(o)}m (move outside for better)`);return}const r={lat:t,lng:n};ge(He,{...r,t:Date.now(),acc:o});const s=[t,n];M?M.setLatLng(s):(M=i.circleMarker(s,{radius:8,weight:2,opacity:.9,fillOpacity:.6}).addTo(c),c.setView(s,18)),tt(r)},e=>{u(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function ot(){let e=0;const t=80,n=()=>{if(e++,!$("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(u("Loading map engine…"),e<t)return setTimeout(n,100);u("Map engine failed to load (Leaflet not found). Refresh.");return}if(!et()){u("Could not init map. Refresh.");return}u("Loading GPS…"),nt()};n()}function z(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function D(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function X(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function W(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function it(){const e=X(),t=(n,o,i)=>`
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
      <div style="font-size:11px;">${z(o)}</div>
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
  `}function U(e,t){return`
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
          <div style="font-weight:900;">${z(e)}</div>
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
  `}function rt(){const e=Xe(10),t=pe(),n=F();return`
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
          ${D(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${z(t)}" maxlength="24" style="
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
                      ${D(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${z(o.name)}
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
  `}function st(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let i=null;const r=a=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=a||"")};e&&r(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const a=Ge(e.value);r(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),i&&clearTimeout(i),i=setTimeout(s,300)}),e.addEventListener("blur",()=>{i&&clearTimeout(i),s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}r("Uploading photo…");const d=new FileReader;d.onload=()=>{Ye(String(d.result||"")),r("✅ Photo saved"),v()},d.onerror=()=>r("⛔ Failed to read image."),d.readAsDataURL(a)}),o&&(o.onclick=()=>{Fe(),r("✅ Photo removed"),v()}),t&&(t.onclick=()=>{e&&s();const a=Je();r(`✅ Saved: ${a.name} – ${a.xp} XP`),v()})}function at(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${oe()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function dt(){const e=X();return e==="profile"?U("Profile",`<div id="lbMount">${rt()}</div>`):e==="bag"?U("Bag",`<div id="bagMount">${at()}</div>`):""}function lt(){const e=de(),t=F();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Qe()}
      </div>

      <!-- TOPBAR -->
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
          ${D(t,32)}
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
            ${ze()}
          </div>

          <div id="stepsMount">
            ${ae()}
          </div>
        </div>
      </header>

      ${it()}
      ${dt()}

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
  `}function ct(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");W(n||"map"),v()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{W("map"),v()})}function v(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=lt(),ct(),ot(),Re(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=ae())};window.addEventListener("cbsgo:stepsChanged",n)}if(X()==="profile"&&st(),de()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",qe)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||j(o))return;const i=Q.find(r=>r.id===o);i&&$e(i)}))}function me(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function N(e){const t=me();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";N(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{N(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function V(){try{if(!document.getElementById("app")){N("❌ #app not found in index.html");return}v();const t=me();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){N(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",V,{once:!0}):V();
