(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const H="cbsgo_state_v6";function ie(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function se(){return{xp:0,completed:{},updatedAt:Date.now()}}function P(){const e=localStorage.getItem(H);return ie(e,se())}function ae(e){e.updatedAt=Date.now(),localStorage.setItem(H,JSON.stringify(e))}function W(e){return 100+(Math.max(1,Number(e||1))-1)*40}function $(){return Number(P().xp||0)}function z(){const e=$();let t=1,n=e;for(;;){const o=W(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function le(){const e=$();let t=1,n=e;for(;;){const o=W(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function de(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return P();const n=P();return n.xp=Number(n.xp||0)+t,ae(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:z()}})),n}function j(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function ce(){const e=Number($()||0),t=Number(z()||1),n=Number(le()||0),o=j(n,0,100),r=j(o/100*100,0,100);return`
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
  `}const Y="cbsgo_inventory_v1";function pe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ue(){return{tickets:0}}function C(){const e=localStorage.getItem(Y);return pe(e,ue())}function ge(e){localStorage.setItem(Y,JSON.stringify(e))}function U(){return Number(C().tickets||0)}function fe(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return C();const n=C();return n.tickets=Number(n.tickets||0)+t,ge(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const V="cbsgo_steps_v6",be="cbsgo_gps_autostart_v3";let h=null,w=!1,u={msg:"idle"};function me(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ye(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function k(){const e=localStorage.getItem(V);return me(e,ye())}function Z(e){e.updatedAt=Date.now(),localStorage.setItem(V,JSON.stringify(e))}function S(){const e=k();return Number(e.steps||0)}function _(){return!!w}function ve(){return u}function xe(e,t){const o=p=>p*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),a=o(e.lat),s=o(t.lat),l=Math.sin(r/2)**2+Math.cos(a)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}function he(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,de(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,fe(1))}function we(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return k();const n=k();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/.75);return o>n.steps&&(n.steps=o),he(n),Z(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Se(){if(h!=null&&navigator.geolocation)try{navigator.geolocation.clearWatch(h)}catch{}h=null}async function q(e={}){const t=!!e.silent;if(!navigator.geolocation)return u={err:"GPS not supported",t:Date.now()},t||alert("GPS niet ondersteund op dit apparaat."),{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(be,"1")}catch{}Se(),w=!0,u={msg:"requesting",t:Date.now()};const n=40,o=3,r=80,i=.4,a=2.8;try{return h=navigator.geolocation.watchPosition(s=>{const l=s.coords.latitude,p=s.coords.longitude,v=s.coords.accuracy||999,N=Date.now();let c={lat:l,lng:p,acc:v,t:N};window.dispatchEvent(new CustomEvent("cbsgo:gps",{detail:{lat:l,lng:p,acc:v}}));const I=k(),g=I.lastPos;if(I.lastPos={lat:l,lng:p,t:N},Z(I),v>n){c.reason="accuracy too low",u=c,window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:S()}}));return}if(g&&typeof g.lat=="number"&&typeof g.lng=="number"){const f=xe({lat:g.lat,lng:g.lng},{lat:l,lng:p}),R=(N-g.t)/1e3,L=R>0?f/R:0;if(c.dist=f,c.speed=L,f<o)c.reason="too small (jitter)";else if(f>r)c.reason="too big (teleport)";else if(L<i||L>a)c.reason="weird speed";else{c.added=f;const re=we(f);c.steps=re.steps}}u=c,window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:S()}}))},s=>{w=!1,u={err:s?.message||"GPS blocked",t:Date.now()},t||console.warn("GPS error",s),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:S()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(s){return w=!1,u={err:String(s?.message||s),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ke(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>_()||await q({silent:!0}))();const t=async()=>{_()||await q({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function _e(){const e=ve();return e?.err?"🔴":e?.lat&&_()?"🟢":_()?"🟡":"⚪"}function Q(){const e=S(),t=U();return`
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
      <span style="opacity:.9;">${_e()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}const B="cbsgo_leaderboard_v2",ee="cbsgo_player_name_v2",O="cbsgo_player_avatar_v2";function te(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function Ee(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function T(){try{return localStorage.getItem(ee)||"Sovereign"}catch{return"Sovereign"}}function Me(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ee,t)}catch{}return t}function F(){try{return localStorage.getItem(O)||""}catch{return""}}function $e(e){const t=String(e||"");try{localStorage.setItem(O,t)}catch{}return t}function Ne(){try{localStorage.removeItem(O)}catch{}}function Ie(e=10){const t=te(B,[]);return Array.isArray(t)?t.slice(0,e):[]}function Le(){const e=T(),t=F(),n=$(),o=z(),r=te(B,[]),i=Array.isArray(r)?r:[],a=i.find(s=>s.name===e);return a?(a.xp=n,a.level=o,a.avatar=t,a.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((s,l)=>Number(l.xp||0)-Number(s.xp||0)),Ee(B,i),{name:e,xp:n,level:o,avatar:t}}let d=null,x=null,m=!0;const A=[[-85,-180],[85,180]];function Ae(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function b(e){const t=document.getElementById("cbsgoMapHost");if(!t)return;let n=document.getElementById("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Pe(){const e=String(T()||"").trim();return e?e[0].toUpperCase():"🙂"}function Ce(e){const t=F();if(t){const r=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${t}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return e.divIcon({html:r,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const n=Pe(),o=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${Ae(n)}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function Be(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <button id="cbsgoFollowBtn" type="button" style="
        position:absolute;
        right:12px;
        bottom:92px;
        z-index:9999;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.72);
        color:#fff;
        backdrop-filter: blur(10px);
        padding:10px 12px;
        border-radius:14px;
        font-weight:900;
        cursor:pointer;
      ">Following</button>
    </div>
  `}function ze(){try{d&&(d.remove(),d=null,x=null)}catch{}}function Oe(){const e=window.L,t=document.getElementById("cbsgoMap");return!e||!t?!1:(ze(),d=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!1}),d.setMaxBounds(A),d.on("drag",()=>d.panInsideBounds(A,{animate:!1})),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,minZoom:1,noWrap:!0,bounds:A}).addTo(d),d.setView([51.687,4.87],16),d.on("dragstart",()=>{m=!1;const n=document.getElementById("cbsgoFollowBtn");n&&(n.textContent="Free look")}),d.on("zoomstart",()=>{m=!1;const n=document.getElementById("cbsgoFollowBtn");n&&(n.textContent="Free look")}),!0)}function Te(e){const t=window.L;if(!t||!d)return;const n=Ce(t);if(!x){x=t.marker(e,{icon:n}).addTo(d),d.setView(e,18);return}x.setIcon(n),x.setLatLng(e)}function Fe(){let e=0;const t=80,n=()=>{if(e++,!document.getElementById("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(b("Loading map engine…"),e<t)return setTimeout(n,100);b("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Oe()){b("Could not init map. Refresh.");return}b("Waiting for GPS…");const r=document.getElementById("cbsgoFollowBtn");r&&(r.onclick=()=>{m=!m,r.textContent=m?"Following":"Free look"}),window.__cbsgo_map_gps_listener||(window.__cbsgo_map_gps_listener=!0,window.addEventListener("cbsgo:gps",i=>{const{lat:a,lng:s,acc:l}=i.detail||{};if(typeof a!="number"||typeof s!="number")return;const p=[a,s];if(Te(p),m&&d){const v=Math.max(d.getZoom(),17);d.setView(p,v,{animate:!0})}b(typeof l=="number"?`GPS OK • accuracy ~${Math.round(l)}m`:"GPS OK")}))};n()}function ne(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function De(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}function E(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function X(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function D(){try{return sessionStorage.getItem("cbsgo_selected_tab_v6")||"map"}catch{return"map"}}function G(e){try{sessionStorage.setItem("cbsgo_selected_tab_v6",e)}catch{}}function Re(){const e=D(),t=(n,o,r)=>`
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
      <div style="font-size:11px;">${E(o)}</div>
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
  `}function J(e,t){return`
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
          <div style="font-weight:900;">${E(e)}</div>
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
  `}function je(){const e=Ie(10),t=T(),n=F();return`
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
          ${X(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${E(t)}" maxlength="24" style="
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
                      ${X(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${E(o.name)}
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
  `}function qe(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=s=>{const l=document.querySelector("#lbMsg");l&&(l.textContent=s||"")};e&&i(`✅ Profile loaded: ${e.value}`);const a=()=>{if(!e)return;const s=Me(e.value);i(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(a,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),a()})),n&&n.addEventListener("change",()=>{const s=n.files&&n.files[0];if(!s)return;if(s.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const l=new FileReader;l.onload=()=>{$e(String(l.result||"")),i("✅ Photo saved"),y()},l.onerror=()=>i("⛔ Failed to read image."),l.readAsDataURL(s)}),o&&(o.onclick=()=>{Ne(),i("✅ Photo removed"),y()}),t&&(t.onclick=()=>{e&&a();const s=Le();i(`✅ Saved: ${s.name} – ${s.xp} XP`),y()})}function Xe(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected while walking.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${U()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (later)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Ge(){const e=D();return e==="profile"?J("Profile",`<div id="lbMount">${je()}</div>`):e==="bag"?J("Bag",`<div id="bagMount">${Xe()}</div>`):""}function Je(){const e=ne();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Be()}
      </div>

      <!-- TOPBAR: alleen rechts XP + Steps -->
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
        <div style="pointer-events:auto; display:flex; flex-direction:column; align-items:stretch;">
          <div id="xpMount" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
          ">
            ${ce()}
          </div>

          <div id="stepsMount">
            ${Q()}
          </div>
        </div>
      </header>

      ${Re()}
      ${Ge()}

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
  `}function Ke(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");G(n||"map"),y()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{G("map"),y()})}function y(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Je(),Ke(),Fe(),ke(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=Q())};window.addEventListener("cbsgo:stepsChanged",n)}if(D()==="profile"&&qe(),ne()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",De)}}function oe(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function M(e){const t=oe();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";M(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{M(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function K(){try{if(!document.getElementById("app")){M("❌ #app not found in index.html");return}y();const t=oe();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){M(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",K,{once:!0}):K();
