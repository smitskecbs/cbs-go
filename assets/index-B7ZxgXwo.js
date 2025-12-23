(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const W="cbsgo_state_v3";function de(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function pe(){return{xp:0,completed:{}}}function S(){const e=localStorage.getItem(W);return de(e,pe())}function H(e){localStorage.setItem(W,JSON.stringify(e))}function z(){return Number(S().xp||0)}function O(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function ue(e){return Math.max(0,Number(e||0))%100}function V(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return z();const n=S();return n.xp=Number(n.xp||0)+t,H(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function I(e){const t=String(e||"");return t?!!S().completed?.[t]:!1}function ge(e){const t=String(e||"");if(!t)return!1;const n=S();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),H(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function U(){const e=z(),t=O(e),n=ue(e),o=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${o}%"></div>
      </div>
    </div>
  `}function Z(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function fe(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const T="cbsgo_leaderboard_v2",Q="cbsgo_player_name_v2",R="cbsgo_player_avatar_v2";function ee(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function me(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function X(){try{return localStorage.getItem(Q)||"Sovereign"}catch{return"Sovereign"}}function ye(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Q,t)}catch{}return t}function k(){try{return localStorage.getItem(R)||""}catch{return""}}function be(e){const t=String(e||"");try{localStorage.setItem(R,t)}catch{}return t}function ve(){try{localStorage.removeItem(R)}catch{}}function xe(e=10){const t=ee(T,[]);return Array.isArray(t)?t.slice(0,e):[]}function he(){const e=X(),t=k(),n=z(),o=O(n),r=ee(T,[]),i=Array.isArray(r)?r:[],s=i.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((a,c)=>Number(c.xp||0)-Number(a.xp||0)),me(T,i),{name:e,xp:n,level:o,avatar:t}}const we=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}];function N(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function te(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function Se(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&P()}),document.body.appendChild(e),e)}function P(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function ke(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(te).filter(Boolean)}function $e(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function _e(e){return e?.hint||e?.puzzle?.hint||""}function Le(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function Me(e){const t=Se(),n=String(e?.id||""),o=I(n),r=$e(e),i=_e(e),s=Le(e),a=ke(e);t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${N(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${s} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${N(r)}</div>
        ${i?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${N(i)}</div>`:""}
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
  `;const c=t.querySelector("#cbsgoClose");if(c&&(c.onclick=P),o)return;const l=t.querySelector("#cbsgoMsg"),g=t.querySelector("#cbsgoAnswer"),d=t.querySelector("#cbsgoSubmit"),u=f=>{l&&(l.textContent=f||"")},m=()=>{if(!n)return;if(I(n)){u("✅ Already completed.");return}const f=te(g?.value||"");if(a.length===0){u("⚠️ This node has no answers configured yet.");return}if(!a.includes(f)){u("❌ Not correct. Try again.");return}if(!ge(n)){u("✅ Already completed.");return}V(s),u(`✅ Correct! +${s} XP`),setTimeout(()=>P(),550)};d&&(d.onclick=m),g&&(g.addEventListener("keydown",f=>{f.key==="Enter"&&m()}),setTimeout(()=>g.focus(),50))}const ne="cbsgo_inventory_v1";function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ze(){return{tickets:0,fireworks:0,chests:0}}function E(){const e=localStorage.getItem(ne);return Ae(e,ze())}function Ne(e){localStorage.setItem(ne,JSON.stringify(e))}function Ie(){return E()}function Te(e){const t=Number(e||0);if(!Number.isFinite(t)||t===0)return E();const n=E();return n.tickets=Math.max(0,Number(n.tickets||0)+t),Ne(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{inv:n}})),n}const M="cbsgo_last_pos_v2",oe="cbsgo_walk_v1",q="cbsgo_nodes_pos_v1",re="cbsgo_gps_autostart_v1",ie="cbsgo_follow_me_v1";function h(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function F(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Pe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function G(e,t){const o=l=>l*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),c=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(c))}let p=null,_=null,L=null,b=null,v=null;function j(){const e=window.L;return e&&typeof e.map=="function"?e:null}function se(){L!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(L),L=null}function ae(){return we.filter(e=>e.type!=="group"&&!I(e.id))}function Ee(e){const t=h(q,null);if(t&&t.seed&&t.posById)return t;const n=ae(),o={},r=[],i=70,s=140,a=320,c=2500;function l(u,m,f){const $=m*Math.cos(f)/111111,y=m*Math.sin(f)/(111111*Math.cos(u*Math.PI/180));return{dLat:$,dLng:y}}let g=0;for(const u of n){let m=!1;for(;!m&&g<c;){g++;const f=s+Math.random()*(a-s),$=Math.random()*Math.PI*2,y=l(e.lat,f,$),K={lat:e.lat+y.dLat,lng:e.lng+y.dLng};m=r.every(le=>G(le,K)>=i),m&&(r.push(K),o[u.id]={dLat:y.dLat,dLng:y.dLng})}if(!o[u.id]){const f=l(e.lat,s,Math.random()*Math.PI*2);o[u.id]={dLat:f.dLat,dLng:f.dLng}}}const d={seed:e,posById:o,createdAt:Date.now()};return F(q,d),d}function qe(e,t){const n=h(q,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function Ce(){return h(oe,{metersTotal:0,metersSinceTicket:0,metersSinceXp:0})}function Be(e){F(oe,e)}function Oe(e){const t=Ce();t.metersTotal+=e,t.metersSinceTicket+=e,t.metersSinceXp+=e;let n=0,o=0;for(;t.metersSinceTicket>=80;)t.metersSinceTicket-=80,n+=1;for(;t.metersSinceXp>=180;)t.metersSinceXp-=180,o+=5;return Be(t),n>0&&Te(n),o>0&&V(o),{ticketEarned:n,xpEarned:o,metersTotal:t.metersTotal}}function J(){try{const e=localStorage.getItem(ie);return e==null?!0:e==="1"}catch{return!0}}function C(e){try{localStorage.setItem(ie,e?"1":"0")}catch{}}function w(e){const t=document.querySelector("#nearInfo");t&&(t.textContent=e||"")}function Re(){const e=X()||"You",t=k(),n=J()?"Following ✅":"Free look 👀";return`
    <section class="mapCard" style="
      margin-top:14px;
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.03);
    ">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:18px; font-weight:900; margin:0;">Live Map (GPS)</div>
          <div style="opacity:.75; font-size:13px;">Walk to earn 🎟 tickets + XP.</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <div style="
            width:28px;height:28px;border-radius:999px;
            border:1px solid rgba(255,255,255,.18);
            background:rgba(255,255,255,.06);
            ${t?`background-image:url('${t}'); background-size:cover; background-position:center;`:""}
            display:flex;align-items:center;justify-content:center;
            overflow:hidden;
          ">${t?"":"👤"}</div>
          <div style="opacity:.75; font-size:13px;">${Pe(e)}</div>
        </div>
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:12px;">
        <button id="gpsStartBtn" class="btn" type="button">Enable GPS</button>
        <button id="gpsStopBtn" class="btn secondary" type="button">Stop GPS</button>

        <button id="followBtn" class="btn secondary" type="button">${n}</button>

        <span id="gpsStatus" style="opacity:.85; font-size:13px;"></span>
      </div>

      <div id="nearInfo" style="margin-top:10px; opacity:.85; font-size:13px;"></div>

      <div id="leafletMap" style="
        margin-top:12px;
        width:100%;
        height:540px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.10);
        overflow:hidden;
      "></div>
    </section>
  `}function ce(e){const t=j();if(!t||!p)return;_||(_=t.layerGroup().addTo(p)),_.clearLayers();const n=ae(),o=Ee(e),r=[];for(const i of n){const s=qe(i,o.seed);if(!s)continue;const a=Math.round(G(e,s));a>900||r.push({node:i,ll:s,dist:a})}r.sort((i,s)=>i.dist-s.dist),r.length===0?w("No nodes nearby (walk a bit)."):w(`Nearest: ${r[0].node.name} • ${r[0].dist}m • Visible: ${r.length}`),r.forEach(({node:i,ll:s,dist:a})=>{const c=t.circleMarker([s.lat,s.lng],{radius:11,weight:2});c.bindTooltip(`${i.name} • ${a}m`,{direction:"top",offset:[0,-10]}),c.on("click",()=>Me(i)),c.addTo(_)})}function Xe(e){const t=k();if(!t)return null;const n=`
    <div style="
      width:42px;height:42px;border-radius:999px;
      border:2px solid rgba(255,255,255,.95);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background-image:url('${t}');
      background-size:cover;
      background-position:center;
    "></div>
  `;return e.divIcon({html:n,className:"",iconSize:[42,42],iconAnchor:[21,21]})}function Fe(e){const t=j();return t?(p?setTimeout(()=>p.invalidateSize(),80):(p=t.map(e,{zoomControl:!0}),t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap"}).addTo(p),p.setView([51.687,4.867],16),p.on("dragstart",()=>{C(!1);const n=document.querySelector("#followBtn");n&&(n.textContent="Free look 👀")}),p.on("zoomstart",()=>{C(!1);const n=document.querySelector("#followBtn");n&&(n.textContent="Free look 👀")})),!0):!1}function Y(e){if(!navigator.geolocation){e("❌ GPS not supported.");return}try{localStorage.setItem(re,"1")}catch{}e("Requesting GPS…");const t=80;se(),L=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999;if(i>t){e(`GPS OK but accuracy low (${Math.round(i)}m). Move outside.`);return}e(`✅ GPS active (±${Math.round(i)}m)`);const s={lat:o,lng:r},a=j();if(a&&p){const l=Xe(a);l&&(!v||JSON.stringify(v?.options)!==JSON.stringify(l?.options))&&(v=l,b&&b.setIcon(v)),b?b.setLatLng([o,r]):v?b=a.marker([o,r],{icon:v}).addTo(p):b=a.circleMarker([o,r],{radius:8,weight:2}).addTo(p)}p&&J()&&p.setView([o,r],Math.max(p.getZoom(),17),{animate:!0});const c=h(M,null);if(c){const l=G(c,s);if(l>=6&&l<=80){const{ticketEarned:g,xpEarned:d}=Oe(l);(g||d)&&(g&&d?w(`+${g} 🎟 and +${d} XP for walking`):g?w(`+${g} 🎟 for walking`):d&&w(`+${d} XP for walking`))}}F(M,s),ce(s)},n=>{e(`❌ GPS blocked: ${n?.message||"error"}`)},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3})}function Ge(){const e=document.querySelector("#mapMount")||document,t=e.querySelector("#leafletMap"),n=e.querySelector("#gpsStartBtn"),o=e.querySelector("#gpsStopBtn"),r=e.querySelector("#gpsStatus"),i=e.querySelector("#followBtn");if(!t)return;const s=l=>{r&&(r.textContent=l||"")};let a=0;const c=()=>{if(a++,!Fe(t)){s("Loading map engine…"),a<30?setTimeout(c,150):s("❌ Leaflet not loaded. Check index.html CDN.");return}s("Map ready. Enable GPS."),i&&(i.onclick=()=>{const d=!J();if(C(d),i.textContent=d?"Following ✅":"Free look 👀",d&&p){const u=h(M,null);u&&p.setView([u.lat,u.lng],Math.max(p.getZoom(),17),{animate:!0})}}),n&&(n.onclick=()=>Y(s)),o&&(o.onclick=()=>{se(),s("GPS stopped.")}),(()=>{try{return localStorage.getItem(re)==="1"}catch{return!1}})()&&Y(s),window.__cbsgo_realmap_refresh_v2||(window.__cbsgo_realmap_refresh_v2=!0,window.addEventListener("cbsgo:nodeCompleted",()=>{const d=h(M,null);d&&ce(d)}))};c()}function je(){return Re()}function Je(){return Ge()}function B(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function D(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function A(){try{return sessionStorage.getItem("cbsgo_selected_tab_v2")||"map"}catch{return"map"}}function De(e){try{sessionStorage.setItem("cbsgo_selected_tab_v2",e)}catch{}}function Ke(){const e=A(),t=(n,o)=>`
    <button class="btn secondary" type="button"
      data-tab="${n}"
      style="opacity:${e===n?"1":".75"};">
      ${o}
    </button>
  `;return`
    <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:10px;">
      ${t("map","Map")}
      ${t("profile","Profile")}
      ${t("bag","Bag")}
    </div>
  `}function Ye(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tab");De(t),x()})})}function We(){const e=xe(10);return`
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

      <div style="margin-top:10px;">
        ${e.length===0?'<div style="opacity:.75; font-size:13px;">No scores yet. Click “Save my score”.</div>':`
              <ol style="margin:0; padding-left:18px;">
                ${e.map((t,n)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${n+1}</div>
                      ${D(t.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${B(t.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">Level ${Number(t.level||1)}</div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">${Number(t.xp||0)} XP</div>
                  </li>
                `).join("")}
              </ol>
            `}
      </div>
    </section>
  `}function He(){const e=X(),t=k(),n=z(),o=O(n),r=S(),i=r?.completed?Object.keys(r.completed).length:0;return`
    <section style="
      margin-top:14px;
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.03);
    ">
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        ${D(t,56)}
        <div style="flex:1; min-width:220px;">
          <div style="font-size:18px; font-weight:900;">${B(e)}</div>
          <div style="opacity:.8; margin-top:2px;">Level <b>${o}</b> • Total XP <b>${n}</b></div>
          <div style="opacity:.75; margin-top:2px;">Nodes completed: <b>${i}</b></div>
        </div>
      </div>

      <div style="
        margin-top:12px;
        padding:12px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.10);
        background:rgba(0,0,0,.16);
      ">
        <div style="font-weight:900; margin-bottom:8px;">Edit profile</div>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <input id="pfName" value="${B(e)}" maxlength="24" style="
            flex:1; min-width:200px;
            padding:10px 10px;
            border-radius:12px;
            border:1px solid rgba(255,255,255,.14);
            background:rgba(255,255,255,.06);
            color:#fff;
          "/>
          <button class="btn" id="pfSaveScore" type="button">Save my score</button>
        </div>

        <div style="margin-top:10px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <input id="pfAvatar" type="file" accept="image/*" />
          <button class="btn secondary" id="pfRemoveAvatar" type="button">Remove photo</button>
        </div>

        <div id="pfMsg" style="margin-top:10px; font-size:12px; opacity:.9;"></div>
      </div>

      ${We()}
    </section>
  `}function Ve(){const e=document.querySelector("#pfName"),t=document.querySelector("#pfSaveScore"),n=document.querySelector("#pfAvatar"),o=document.querySelector("#pfRemoveAvatar"),r=document.querySelector("#pfMsg"),i=a=>{r&&(r.textContent=a||"")},s=()=>{if(!e)return;const a=ye(e.value);i(`✅ Name saved: ${a}`)};e&&(e.addEventListener("blur",s),e.addEventListener("keydown",a=>{a.key==="Enter"&&s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){i("❌ Image too large (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const c=new FileReader;c.onload=()=>{be(String(c.result||"")),i("✅ Photo saved"),x()},c.onerror=()=>i("❌ Failed to read image."),c.readAsDataURL(a)}),o&&(o.onclick=()=>{ve(),i("✅ Photo removed"),x()}),t&&(t.onclick=()=>{s();const a=he();i(`✅ Saved: ${a.name} – ${a.xp} XP (Level ${a.level})`),x()})}function Ue(){const e=Ie(),t=(n,o,r)=>`
    <div style="
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      padding:12px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(0,0,0,.16);
    ">
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="font-size:18px;">${r}</div>
        <div style="font-weight:900;">${n}</div>
      </div>
      <div style="font-weight:900; font-size:16px;">${Number(o||0)}</div>
    </div>
  `;return`
    <section style="
      margin-top:14px;
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.03);
    ">
      <div style="font-size:18px; font-weight:900;">🎒 Bag</div>
      <div style="opacity:.8; margin-top:6px;">Your items (local demo). Walking rewards come next.</div>

      <div style="margin-top:12px; display:grid; gap:10px;">
        ${t("Tickets",e.tickets,"🎟")}
        ${t("Fireworks",e.fireworks,"🎆")}
        ${t("Chests",e.chests,"🧰")}
      </div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Next step: walking → earn tickets, and chests spawn on the map.
      </div>
    </section>
  `}function Ze(){const e=Z(),t=k(),n=A();return`
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-left" style="display:flex; gap:10px; align-items:center;">
          ${D(t,32)}
          <div>
            <h1 style="margin:0;">CBS GO</h1>
            <span class="tagline">Mind & Motion</span>
          </div>
        </div>

        <div class="topbar-right" id="xpMount">
          ${U()}
        </div>
      </header>

      <main class="main">
        <p>Explore the real world. Unlock nodes. Collect loot.</p>

        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <button id="startBtn" type="button">Start Exploring</button>
          ${e?'<button id="resetBtn" class="btn secondary" type="button">Reset Demo (Hard)</button>':""}
        </div>

        ${e?'<p style="opacity:.65; font-size:12px; margin-top:8px;">Dev mode enabled (?dev=1)</p>':""}

        ${Ke()}

        <section id="tabMap" style="display:${n==="map"?"block":"none"};">
          <div id="mapMount">${je()}</div>
        </section>

        <section id="tabProfile" style="display:${n==="profile"?"block":"none"};">
          ${He()}
        </section>

        <section id="tabBag" style="display:${n==="bag"?"block":"none"};">
          ${Ue()}
        </section>
      </main>
    </div>
  `}function x(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Ze(),Ye(),Je(),A()==="profile"&&Ve(),Z()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",fe)}if(!window.__cbsgo_xp_listener_v2){window.__cbsgo_xp_listener_v2=!0;const n=()=>{const o=document.querySelector("#xpMount");o&&(o.innerHTML=U())};window.addEventListener("cbsgo:xpChanged",n),window.addEventListener("cbsgo:nodeCompleted",n)}window.__cbsgo_bag_listener_v1||(window.__cbsgo_bag_listener_v1=!0,window.addEventListener("cbsgo:inventoryChanged",()=>{A()==="bag"&&x()}))}x();document.getElementById("startBtn").addEventListener("click",()=>{alert("CBS GO coming online…")});
