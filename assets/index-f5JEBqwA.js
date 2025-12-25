(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Y="cbsgo_state_v6";function se(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ae(){return{xp:0,completed:{},updatedAt:Date.now()}}function _(){const e=localStorage.getItem(Y);return se(e,ae())}function de(e){e.updatedAt=Date.now(),localStorage.setItem(Y,JSON.stringify(e))}function Z(e){return 100+(Math.max(1,Number(e||1))-1)*40}function M(){return Number(_().xp||0)}function P(){const e=M();let t=1,n=e;for(;;){const o=Z(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function ce(){const e=M();let t=1,n=e;for(;;){const o=Z(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function le(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return _();const n=_();return n.xp=Number(n.xp||0)+t,de(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:P()}})),n}function B(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function pe(){const e=Number(M()||0),t=Number(P()||1),n=Number(ce()||0),o=B(n,0,100),r=B(o/100*100,0,100);return`
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
          width:${r}%;
          background:rgba(255,255,255,.75);
        "></div>
      </div>

      <div style="margin-top:6px; font-size:11px; opacity:.65;">
        Total XP: ${e}
      </div>
    </div>
  `}const U="cbsgo_inventory_v1";function ue(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function fe(){return{tickets:0}}function L(){const e=localStorage.getItem(U);return ue(e,fe())}function ge(e){localStorage.setItem(U,JSON.stringify(e))}function V(){return Number(L().tickets||0)}function be(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return L();const n=L();return n.tickets=Number(n.tickets||0)+t,ge(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Q="cbsgo_steps_v7",me="cbsgo_gps_autostart_v3";let y=null,I=!1,p={msg:"init"};const D=120,R=1.5,F=150,j=.2,G=3.5;function v(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function h(){try{const e=localStorage.getItem(Q);if(!e)return v();const t=JSON.parse(e);return!t||typeof t!="object"?v():{...v(),...t}}catch{return v()}}function ee(e){e.updatedAt=Date.now();try{localStorage.setItem(Q,JSON.stringify(e))}catch{}}function x(){const e=h();return Number(e.steps||0)}function w(){return!!I}function ve(){return p}function ye(e,t){const o=l=>l*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),d=o(e.lat),s=o(t.lat),a=Math.sin(r/2)**2+Math.cos(d)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function xe(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,le(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,be(1))}function he(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return h();const n=h(),o=Number(n.meters||0);n.meters=o+t;const r=Math.floor(n.meters/.75);return r>n.steps&&(n.steps=r),xe(n),ee(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function we(){y!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(y),y=null}async function q(e={}){const t=!!e.silent;if(!navigator.geolocation)return p={err:"GPS not supported",t:Date.now()},t||console.warn("CBS GO: GPS not supported"),{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(me,"1")}catch{}return we(),I=!0,p={msg:"requesting",t:Date.now()},y=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,d=Date.now(),s=h(),a=s.lastPos;if(p={lat:o,lng:r,acc:i,t:d},s.lastPos={lat:o,lng:r,t:d},ee(s),window.dispatchEvent(new CustomEvent("cbsgo:gps",{detail:{lat:o,lng:r,acc:i}})),i>D){p.reason=`acc > ${D}`,window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:x()}}));return}if(a&&typeof a.lat=="number"&&typeof a.lng=="number"){const l=ye({lat:a.lat,lng:a.lng},{lat:o,lng:r}),b=(d-a.t)/1e3||1,N=l/b;if(p.dist=l,p.speed=N,l<R)p.reason=`dist < ${R}`;else if(l>F)p.reason=`dist > ${F}`;else if(N<j)p.reason=`speed < ${j}`;else if(N>G)p.reason=`speed > ${G}`;else{p.reason="ok",p.added=l,he(l);return}}window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:x()}}))},n=>{I=!1,p={err:n?.message||"GPS blocked",t:Date.now()},t||console.warn("CBS GO: GPS error",n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:x()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}function Se(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>w()||await q({silent:!0}))();const t=async()=>{w()||await q({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t),window.removeEventListener("touchend",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function ke(){const e=ve();return e?.err?"🔴":e?.lat&&w()?"🟢":w()?"🟡":"⚪"}function te(){const e=x(),t=V();return`
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
      <span style="opacity:.9;">${ke()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function ne(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function $e(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const A="cbsgo_leaderboard_v2",oe="cbsgo_player_name_v2",C="cbsgo_player_avatar_v2";function re(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function Ee(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function z(){try{return localStorage.getItem(oe)||"Sovereign"}catch{return"Sovereign"}}function Me(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(oe,t)}catch{}return t}function T(){try{return localStorage.getItem(C)||""}catch{return""}}function Ne(e){const t=String(e||"");try{localStorage.setItem(C,t)}catch{}return t}function _e(){try{localStorage.removeItem(C)}catch{}}function Le(e=10){const t=re(A,[]);return Array.isArray(t)?t.slice(0,e):[]}function Ie(){const e=z(),t=T(),n=M(),o=P(),r=re(A,[]),i=Array.isArray(r)?r:[],d=i.find(s=>s.name===e);return d?(d.xp=n,d.level=o,d.avatar=t,d.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((s,a)=>Number(a.xp||0)-Number(s.xp||0)),Ee(A,i),{name:e,xp:n,level:o,avatar:t}}let c=null,m=null,u=null,S=!0;function k(e){return document.getElementById(e)}function f(e){const t=k("cbsgoMapHost");if(!t)return;let n=k("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="6000",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Ae(){const e=String(z()||"").trim();return e?e[0].toUpperCase():"🙂"}function Pe(e){const t=T();if(t){const r=`
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
      width:42px;height:42px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.60);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:18px;color:#fff;
    ">${Ae()}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[42,42],iconAnchor:[21,21]})}function Ce(){return`
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
  `}function ze(){try{c&&(c.remove(),c=null,m=null)}catch{}}function Te(){const e=window.L,t=k("cbsgoMap");return!e||!t?!1:(ze(),c=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(c),c.setView([51.687,4.87],15),c.on("dragstart",()=>{S=!1}),c.on("zoomstart",()=>{S=!1}),!0)}function X(e,t){if(!c||!window.L)return;const n=window.L,o=Pe(n);if(m?(m.setIcon(o),m.setLatLng([e,t])):m=n.marker([e,t],{icon:o}).addTo(c),S){const r=c.getZoom()||15,i=Math.max(r,16);c.setView([e,t],i,{animate:!0})}}function Oe(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function Be(){let e=0;const t=80,n=()=>{if(e++,!k("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(f("Loading map engine…"),e<t)return setTimeout(n,100);f("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Te()){f("Could not init map. Refresh.");return}f("Waiting for GPS…"),Oe();const r=document.getElementById("cbsgoRecenterBtn");r&&(r.onclick=()=>{if(S=!0,u&&c){const{lat:d,lng:s}=u,a=c.getZoom()||15,l=Math.max(a,16);c.setView([d,s],l,{animate:!0})}});const i=d=>{const s=d?.detail||{},a=Number(s.lat),l=Number(s.lng),b=Number(s.acc);!Number.isFinite(a)||!Number.isFinite(l)||(u={lat:a,lng:l,acc:b},X(a,l),Number.isFinite(b)?f(`GPS • ±${Math.round(b)}m`):f("GPS active"))};window.addEventListener("cbsgo:gps",i),u&&X(u.lat,u.lng)};n()}function $(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function O(){try{return sessionStorage.getItem("cbsgo_selected_tab_v6")||"map"}catch{return"map"}}function H(e){try{sessionStorage.setItem("cbsgo_selected_tab_v6",e)}catch{}}function De(){const e=O(),t=(n,o,r)=>{const i=e===n;return`
      <button type="button" data-tab="${n}" style="
        width:52px;
        height:52px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,${i?".85":".35"});
        background:${i?"rgba(0,0,0,.85)":"rgba(0,0,0,.55)"};
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:22px;
        backdrop-filter:blur(12px);
      " title="${$(o)}">
        ${r}
      </button>
    `};return`
    <nav style="
      position:fixed;
      left:12px;
      top:calc(96px + env(safe-area-inset-top));
      z-index:5500;
      display:flex;
      flex-direction:column;
      gap:10px;
    ">
      ${t("map","Map","🗺️")}
      ${t("profile","Profile","👤")}
      ${t("bag","Bag","🎒")}
    </nav>
  `}function J(e,t){return`
    <div style="
      position:fixed;
      left:0; right:0;
      bottom:0;
      z-index:6500;
      padding:12px 12px calc(20px + env(safe-area-inset-bottom));
      pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px, 96vw);
        margin:0 auto;
        border-radius:22px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.92);
        backdrop-filter: blur(14px);
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
  `}function K(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function Re(){const e=Le(10),t=z(),n=T();return`
    <section class="lb" style="
      margin-top:4px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <h3 style="margin:0; font-size:16px;">Profile & leaderboard</h3>
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
                ${e.map((o,r)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${r+1}</div>
                      ${K(o.avatar,28)}
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
  `}function Fe(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=s=>{const a=document.querySelector("#lbMsg");a&&(a.textContent=s||"")};e&&i(`✅ Profile loaded: ${e.value}`);const d=()=>{if(!e)return;const s=Me(e.value);i(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(d,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),d()})),n&&n.addEventListener("change",()=>{const s=n.files&&n.files[0];if(!s)return;if(s.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const a=new FileReader;a.onload=()=>{Ne(String(a.result||"")),i("✅ Photo saved"),g()},a.onerror=()=>i("⛔ Failed to read image."),a.readAsDataURL(s)}),o&&(o.onclick=()=>{_e(),i("✅ Photo removed"),g()}),t&&(t.onclick=()=>{e&&d();const s=Ie();i(`✅ Saved: ${s.name} – ${s.xp} XP`),g()})}function je(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${V()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Ge(){const e=O();return e==="profile"?J("Profile",`<div id="lbMount">${Re()}</div>`):e==="bag"?J("Bag",`<div id="bagMount">${je()}</div>`):""}function qe(){const e=ne();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ce()}
      </div>

      <!-- TOP-RIGHT: XP + steps -->
      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:flex-start;
        justify-content:flex-end;
        gap:10px;
        pointer-events:none;
      ">
        <div style="pointer-events:auto; display:flex; flex-direction:column; align-items:stretch; gap:6px;">
          <div id="xpMount" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.80);
            backdrop-filter: blur(10px);
          ">
            ${pe()}
          </div>

          <div id="stepsMount">
            ${te()}
          </div>
        </div>
      </header>

      ${De()}
      ${Ge()}

      ${e?`<button id="resetBtn" type="button" style="
               position:fixed;
               right:12px;
               bottom:20px;
               z-index:6000;
               padding:10px 12px;
               border-radius:14px;
               border:1px solid rgba(255,255,255,.14);
               background:rgba(0,0,0,.55);
               color:#fff;
             ">Reset Demo</button>`:""}
    </div>
  `}function Xe(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");H(n||"map"),g()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{H("map"),g()})}function g(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=qe(),Xe(),Be(),Se(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=te())};window.addEventListener("cbsgo:stepsChanged",n)}if(O()==="profile"&&Fe(),ne()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",$e)}}function ie(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function E(e){const t=ie();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";E(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{E(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function W(){try{if(!document.getElementById("app")){E("❌ #app not found in index.html");return}g();const t=ie();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){E(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",W,{once:!0}):W();
