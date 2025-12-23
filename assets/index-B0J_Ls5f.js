(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const le=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],Y="cbsgo_state_v3";function de(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ce(){return{xp:0,completed:{}}}function A(){const e=localStorage.getItem(Y);return de(e,ce())}function K(e){localStorage.setItem(Y,JSON.stringify(e))}function T(){return Number(A().xp||0)}function W(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function pe(e){return Math.max(0,Number(e||0))%100}function V(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=A();return n.xp=Number(n.xp||0)+t,K(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function _(e){const t=String(e||"");return t?!!A().completed?.[t]:!1}function ue(e){const t=String(e||"");if(!t)return!1;const n=A();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),K(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function E(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function U(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function ge(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&z()}),document.body.appendChild(e),e)}function z(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function fe(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(U).filter(Boolean)}function be(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function me(e){return e?.hint||e?.puzzle?.hint||""}function ye(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function ve(e){const t=ge(),n=String(e?.id||""),o=_(n),r=be(e),i=me(e),s=ye(e),a=fe(e);t.style.display="flex",t.innerHTML=`
    <div style="
      width:min(640px, 96vw);
      border-radius:18px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 22px 60px rgba(0,0,0,.55);
      padding:16px;
      color:#fff;
    ">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:18px; font-weight:800;">${E(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${s} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${E(r)}</div>
        ${i?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${E(i)}</div>`:""}
      </div>

      ${o?`
            <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(0,255,128,.20); background:rgba(0,255,128,.08);">
              ✅ Completed. This node can’t give XP again.
            </div>
          `:`
            <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <input id="cbsgoAnswer" placeholder="Type your answer…" style="
                flex:1; min-width:220px;
                padding:12px 12px;
                border-radius:14px;
                border:1px solid rgba(255,255,255,.14);
                background:rgba(255,255,255,.06);
                color:#fff;
              "/>
              <button id="cbsgoSubmit" class="btn" type="button">Submit</button>
            </div>
            <div id="cbsgoMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>
          `}
    </div>
  `;const l=t.querySelector("#cbsgoClose");if(l&&(l.onclick=z),o)return;const m=t.querySelector("#cbsgoMsg"),p=t.querySelector("#cbsgoAnswer"),M=t.querySelector("#cbsgoSubmit"),u=y=>{m&&(m.textContent=y||"")},R=()=>{if(!n)return;if(_(n)){u("✅ Already completed.");return}const y=U(p?.value||"");if(a.length===0){u("⚠️ This node has no answers configured yet.");return}if(!a.includes(y)){u("❌ Not correct. Try again.");return}if(!ue(n)){u("✅ Already completed.");return}V(s),u(`✅ Correct! +${s} XP`),setTimeout(()=>z(),550)};M&&(M.onclick=R),p&&(p.addEventListener("keydown",y=>{y.key==="Enter"&&R()}),setTimeout(()=>p.focus(),50))}function xe(){const e=T(),t=W(e),n=pe(e),o=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${o}%"></div>
      </div>
    </div>
  `}const Q="cbsgo_inventory_v1";function he(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function we(){return{tickets:0}}function L(){const e=localStorage.getItem(Q);return he(e,we())}function Se(e){localStorage.setItem(Q,JSON.stringify(e))}function I(){return Number(L().tickets||0)}function ke(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return L();const n=L();return n.tickets=Number(n.tickets||0)+t,Se(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Z="cbsgo_steps_v1",ee="cbsgo_steps_enabled_v1",Ae=.78;let h=null,g=null,c={msg:"idle",t:0,lat:null,lng:null,acc:null,err:null};function $e(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Me(){return{steps:0,meters:0,last5kAwardAt:0,last10kAwardAt:0}}function N(){const e=localStorage.getItem(Z);return $e(e,Me())}function Ee(e){localStorage.setItem(Z,JSON.stringify(e))}function _e(){return Number(N().steps||0)}function te(){try{return localStorage.getItem(ee)==="1"}catch{return!1}}function v(e){try{localStorage.setItem(ee,e?"1":"0")}catch{}}function ze(){return c}function Le(e,t){const o=u=>u*Math.PI/180,r=o(e.lat),i=o(t.lat),s=o(t.lat-e.lat),a=o(t.lng-e.lng),l=Math.sin(s/2),m=Math.sin(a/2),p=l*l+Math.cos(r)*Math.cos(i)*m*m;return 6371e3*(2*Math.atan2(Math.sqrt(p),Math.sqrt(1-p)))}function Ne(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return N();const n=N();n.meters=Number(n.meters||0)+t;const o=Math.floor(t/Ae);o>0&&(n.steps=Number(n.steps||0)+o);const r=Number(n.steps||0),i=Math.floor(r/5e3)*5e3;if(i>=5e3&&i>Number(n.last5kAwardAt||0)){for(let a=Number(n.last5kAwardAt||0)+5e3;a<=i;a+=5e3)V(20);n.last5kAwardAt=i}const s=Math.floor(r/1e4)*1e4;if(s>=1e4&&s>Number(n.last10kAwardAt||0)){for(let a=Number(n.last10kAwardAt||0)+1e4;a<=s;a+=1e4)ke(1);n.last10kAwardAt=s}return Ee(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps,meters:n.meters,tickets:I()}})),n}async function Ce(){return navigator.geolocation?h!=null?(v(!0),c={...c,msg:"already_enabled",t:Date.now(),err:null},{ok:!0}):(g=null,c={msg:"starting",t:Date.now(),lat:null,lng:null,acc:null,err:null},h=navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords;c={msg:"ok",t:Date.now(),lat:t,lng:n,acc:o,err:null};const r={lat:t,lng:n};if(!g){g=r,v(!0),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"));return}const i=Le(g,r);i>=2&&(Ne(i),g=r,window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps")))},e=>{c={msg:"error",t:Date.now(),lat:null,lng:null,acc:null,err:e?.message||String(e)},v(!1),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4}),v(!0),{ok:!0}):(c={msg:"geolocation_not_supported",t:Date.now(),lat:null,lng:null,acc:null,err:"Geolocation not supported"},{ok:!1,reason:"Geolocation not supported"})}function Pe(){try{h!=null&&navigator.geolocation.clearWatch(h)}catch{}h=null,g=null,v(!1),c={msg:"disabled",t:Date.now(),lat:null,lng:null,acc:null,err:null},window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))}function D(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Te(e){try{return new Date(e).toLocaleTimeString()}catch{return""}}function ne(){const e=_e(),t=I(),n=te(),o=ze(),r=o?.err?`❌ ${D(o.err)}`:o?.lat?`✅ ${Te(o.t)} acc=${Math.round(o.acc||0)}m`:o?.msg?`ℹ️ ${D(o.msg)}`:"…";return`
    <div style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <div>
          <div style="font-weight:800; font-size:15px;">Steps & Tickets</div>
          <div style="opacity:.75; font-size:12px; margin-top:2px;">
            Uses GPS distance to estimate steps (Android-friendly).
          </div>
          <div style="opacity:.75; font-size:12px; margin-top:4px;">
            GPS Status: <b>${n?"ENABLED":"OFF"}</b> • ${r}
          </div>
          <div style="opacity:.6; font-size:12px; margin-top:4px;">
            Milestones: <b>5,000 steps</b> → +20 XP • <b>10,000 steps</b> → +1 Ticket
          </div>
        </div>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <div class="pill">Steps: <b>${e}</b></div>
          <div class="pill">Tickets: <b>${t}</b></div>
          <button id="enableStepsBtn" class="btn ${n?"secondary":""}" type="button">
            ${n?"Disable GPS Steps":"Enable GPS Steps"}
          </button>
        </div>
      </div>

      <div style="margin-top:10px; opacity:.75; font-size:12px;">
        Tip: open on your phone on HTTPS (GitHub Pages is perfect) and walk outside for real GPS.
      </div>
    </div>
  `}function j(){const t=(document.querySelector("#stepsMount")||document).querySelector("#enableStepsBtn");t&&(t.__cbsgo_bound||(t.__cbsgo_bound=!0,t.addEventListener("click",async()=>{if(te()){Pe(),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"));return}const n=await Ce();n?.ok||alert(n?.reason||"Could not enable GPS steps."),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))})))}function oe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Ie(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const C="cbsgo_leaderboard_v2",re="cbsgo_player_name_v2",q="cbsgo_player_avatar_v2";function ie(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function qe(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function B(){try{return localStorage.getItem(re)||"Sovereign"}catch{return"Sovereign"}}function Be(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(re,t)}catch{}return t}function $(){try{return localStorage.getItem(q)||""}catch{return""}}function Oe(e){const t=String(e||"");try{localStorage.setItem(q,t)}catch{}return t}function Re(){try{localStorage.removeItem(q)}catch{}}function De(e=10){const t=ie(C,[]);return Array.isArray(t)?t.slice(0,e):[]}function je(){const e=B(),t=$(),n=T(),o=W(n),r=ie(C,[]),i=Array.isArray(r)?r:[],s=i.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((a,l)=>Number(l.xp||0)-Number(a.xp||0)),qe(C,i),{name:e,xp:n,level:o,avatar:t}}let d=null,x=null;function w(e){return document.getElementById(e)}function f(e){const t=w("cbsgoMapHost");if(!t)return;let n=w("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function se(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function He(){try{d&&(d.remove(),d=null,x=null)}catch{}}function H(e){const t=$(),o=((B()||"You").trim()[0]||"Y").toUpperCase();if(t){const i=`
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${t}');
        background-size:cover;
        background-position:center;
        background-color:rgba(255,255,255,.10);
      "></div>
    `;return e.divIcon({html:i,className:"",iconSize:[44,44],iconAnchor:[22,22]})}const r=`
    <div style="
      width:40px;height:40px;border-radius:999px;
      border:2px solid rgba(255,255,255,.95);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-family:system-ui, sans-serif;
      font-weight:900;
      color:#fff;
    ">${o}</div>
  `;return e.divIcon({html:r,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Ge(){const e=window.L,t=w("cbsgoMap");return!e||!t?!1:(He(),d=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(d),d.setView([51.687,4.87],16),!0)}function Fe(){!navigator.geolocation||!d||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r=window.L,i=[t,n];if(x){x.setLatLng(i);try{const s=H(r);x.setIcon(s)}catch{}}else{const s=H(r);x=r.marker(i,{icon:s}).addTo(d),d.setView(i,18)}f(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{f(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function G(){let e=0;const t=80,n=()=>{if(e++,!w("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(f("Loading map engine…"),e<t)return setTimeout(n,100);f("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Ge()){f("Could not init map. Refresh.");return}f("Loading GPS…"),Fe()};n()}function S(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function P(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function O(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function F(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Xe(){const e=O(),t=(n,o,r)=>`
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
      <div style="font-size:18px; line-height:18px;">${r}</div>
      <div style="font-size:11px;">${S(o)}</div>
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
  `}function X(e,t){return`
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
          <div style="font-weight:900;">${S(e)}</div>
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
  `}function Je(){const e=De(10),t=B(),n=$();return`
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
          ${P(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${S(t)}" maxlength="24" style="
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
            <div style="margin-top:6px; font-size:12px; opacity:.7;">
              Local only (this browser). Later we’ll make it global + map-ready.
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:10px;">
        ${e.length===0?'<div style="opacity:.75; font-size:13px;">No scores yet. Click “Save my score”.</div>':`
              <ol style="margin:0; padding-left:18px;">
                ${e.map((o,r)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${r+1}</div>
                      ${P(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${S(o.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">
                          Level ${Number(o.level||1)}
                        </div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">
                      ${Number(o.xp||0)} XP
                    </div>
                  </li>
                `).join("")}
              </ol>
            `}
      </div>
    </section>
  `}function Ye(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=a=>{const l=document.querySelector("#lbMsg");l&&(l.textContent=a||"")};e&&i(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const a=Be(e.value);i(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(s,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){i("❌ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const l=new FileReader;l.onload=()=>{Oe(String(l.result||"")),i("✅ Photo saved"),b()},l.onerror=()=>i("❌ Failed to read image."),l.readAsDataURL(a)}),o&&(o.onclick=()=>{Re(),i("✅ Photo removed"),b()}),t&&(t.onclick=()=>{e&&s();const a=je();i(`✅ Saved: ${a.name} – ${a.xp} XP`),b()})}function Ke(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">
        Items you collected in the real world.
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${I()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Next: add item bag (fireworks beacon) + loot drops on the map.
      </div>
    </div>
  `}function We(){const e=O();return e==="profile"?X("Profile",`<div id="lbMount">${Je()}</div>`):e==="bag"?X("Bag",`<div id="bagMount">${Ke()}</div>`):""}function Ve(){const e=oe(),t=$();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${se()}
      </div>

      <!-- TOPBAR -->
      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:center;
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
          ${P(t,32)}
          <div>
            <div style="font-weight:900; line-height:1;">CBS GO</div>
            <div style="opacity:.8; font-size:12px;">Made by CBS Coin</div>
          </div>
        </div>

        <div id="xpMount" style="
          pointer-events:auto;
          padding:10px 12px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter: blur(10px);
        ">
          ${xe()}
        </div>
      </header>

      <!-- STEPS overlay ALWAYS on map -->
      <div style="
        position:absolute;
        left:12px;
        right:12px;
        top:72px;
        z-index:4200;
        pointer-events:none;
      ">
        <div style="pointer-events:auto; width:min(860px, 96vw); margin:0 auto;">
          <div id="stepsOverlay">
            ${ne()}
          </div>
        </div>
      </div>

      ${Xe()}
      ${We()}

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
  `}function Ue(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");F(n||"map"),b()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{F("map"),b()})}function b(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Ve(),Ue(),G(),j(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsOverlay");o&&(o.innerHTML=ne(),j())};window.addEventListener("cbsgo:rerenderSteps",n),window.addEventListener("cbsgo:stepsChanged",n)}if(O()==="profile"&&Ye(),oe()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",Ie)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||_(o))return;const r=le.find(i=>i.id===o);r&&ve(r)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const n=()=>{const o=document.querySelector("#mapMount");o&&(o.innerHTML=se(),G())};window.addEventListener("cbsgo:rerenderMap",n),window.addEventListener("cbsgo:nodeCompleted",n)}}function ae(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function k(e){const t=ae();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";k(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{k(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function J(){try{if(!document.getElementById("app")){k("❌ #app not found in index.html");return}b();const t=ae();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){k(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",J,{once:!0}):J();
