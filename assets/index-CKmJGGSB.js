(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const F=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],j="cbsgo_state_v3";function st(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function it(){return{xp:0,completed:{}}}function k(){const t=localStorage.getItem(j);return st(t,it())}function J(t){localStorage.setItem(j,JSON.stringify(t))}function D(){return Number(k().xp||0)}function at(t){const e=Math.max(0,Number(t||0));return Math.floor(e/100)+1}function ct(t){return Math.max(0,Number(t||0))%100}function K(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return D();const n=k();return n.xp=Number(n.xp||0)+e,J(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:e}})),n.xp}function S(t){const e=String(t||"");return e?!!k().completed?.[e]:!1}function lt(t){const e=String(t||"");if(!e)return!1;const n=k();return n.completed?.[e]?!1:(n.completed[e]=Date.now(),J(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:e}})),!0)}function A(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function X(t){return String(t||"").toLowerCase().trim().replace(/\s+/g," ")}function dt(){let t=document.querySelector("#cbsgoModal");return t||(t=document.createElement("div"),t.id="cbsgoModal",t.style.position="fixed",t.style.inset="0",t.style.zIndex="9999",t.style.display="none",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="18px",t.style.background="rgba(0,0,0,.55)",t.addEventListener("click",e=>{e.target===t&&L()}),document.body.appendChild(t),t)}function L(){const t=document.querySelector("#cbsgoModal");t&&(t.style.display="none",t.innerHTML="")}function pt(t){return(Array.isArray(t?.answers)?t.answers:t?.answer?[t.answer]:[]).map(X).filter(Boolean)}function ut(t){return t?.question||t?.puzzle?.question||`Solve the node: ${t?.name||""}`}function ft(t){return t?.hint||t?.puzzle?.hint||""}function gt(t){const e=Number(t?.xp??t?.rewardXp??50);return Number.isFinite(e)?e:50}function Y(t){const e=dt(),n=String(t?.id||""),r=S(n),o=ut(t),i=ft(t),s=gt(t),a=pt(t);e.style.display="flex",e.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${A(t?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${s} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${A(o)}</div>
        ${i?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${A(i)}</div>`:""}
      </div>

      ${r?`
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
  `;const l=e.querySelector("#cbsgoClose");if(l&&(l.onclick=L),r)return;const c=e.querySelector("#cbsgoMsg"),b=e.querySelector("#cbsgoAnswer"),f=e.querySelector("#cbsgoSubmit"),p=u=>{c&&(c.textContent=u||"")},g=()=>{if(!n)return;if(S(n)){p("✅ Already completed.");return}const u=X(b?.value||"");if(a.length===0){p("⚠️ This node has no answers configured yet.");return}if(!a.includes(u)){p("❌ Not correct. Try again.");return}if(!lt(n)){p("✅ Already completed.");return}K(s),p(`✅ Correct! +${s} XP`),setTimeout(()=>L(),550)};f&&(f.onclick=g),b&&(b.addEventListener("keydown",u=>{u.key==="Enter"&&g()}),setTimeout(()=>b.focus(),50))}function bt(){const t=D(),e=at(t),n=ct(t),r=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${e}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${r}%"></div>
      </div>
    </div>
  `}function H(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function mt(){try{const t=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>localStorage.removeItem(e))}catch{}try{const t=[];for(let e=0;e<sessionStorage.length;e++){const n=sessionStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>sessionStorage.removeItem(e))}catch{}window.location.reload()}const yt="cbsgo_player_name_v2",xt="cbsgo_player_avatar_v2";function vt(){try{return localStorage.getItem(yt)||"Sovereign"}catch{return"Sovereign"}}function E(){try{return localStorage.getItem(xt)||""}catch{return""}}const V="cbsgo_inventory_v1";function ht(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function wt(){return{tickets:0}}function O(){const t=localStorage.getItem(V);return ht(t,wt())}function St(t){localStorage.setItem(V,JSON.stringify(t))}function _t(t=1){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return O();const n=O();return n.tickets=Number(n.tickets||0)+e,St(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const W="cbsgo_steps_v1";function kt(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function Mt(){return{steps:0,meters:0,last5kAwardAt:0,last10kAwardAt:0}}function _(){const t=localStorage.getItem(W);return kt(t,Mt())}function At(t){localStorage.setItem(W,JSON.stringify(t))}const Lt=.78;function Nt(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return _();const n=_();n.meters=Number(n.meters||0)+e;const r=Number(n.steps||0),o=Math.floor(Number(n.meters||0)/Lt);n.steps=o;const i=Number(n.steps||0),s=i-r,a=Math.floor(i/5e3)*5e3;if(a>=5e3&&a>Number(n.last5kAwardAt||0)){for(let c=Number(n.last5kAwardAt||0)+5e3;c<=a;c+=5e3)K(20);n.last5kAwardAt=a}const l=Math.floor(i/1e4)*1e4;if(l>=1e4&&l>Number(n.last10kAwardAt||0)){for(let c=Number(n.last10kAwardAt||0)+1e4;c<=l;c+=1e4)_t(1);n.last10kAwardAt=l}return At(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps,meters:n.meters,addedSteps:s}})),n}const N="cbsgo_last_pos_v3",z="cbsgo_nodes_pos_v2",Z="cbsgo_gps_autostart_v1",Q="cbsgo_follow_me_v1";function M(t,e){try{const n=localStorage.getItem(t);return n?JSON.parse(n):e}catch{return e}}function U(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function zt(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function T(t,e){const r=c=>c*Math.PI/180,o=r(e.lat-t.lat),i=r(e.lng-t.lng),s=r(t.lat),a=r(e.lat),l=Math.sin(o/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}let d=null,h=null,w=null,x=null,y=null;function P(){const t=window.L;return t&&typeof t.map=="function"?t:null}function tt(){w!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(w),w=null}function q(){try{const t=localStorage.getItem(Q);return t==null?!0:t==="1"}catch{return!0}}function $(t){try{localStorage.setItem(Q,t?"1":"0")}catch{}}function et(){return F.filter(t=>t.type!=="group"&&!S(t.id))}function $t(t){const e=M(z,null);if(e&&e.seed&&e.posById)return e;const n=et(),r={},o=[],i=90,s=160,a=420,l=4e3;function c(p,g,u){const v=g*Math.cos(u)/111111,m=g*Math.sin(u)/(111111*Math.cos(p*Math.PI/180));return{dLat:v,dLng:m}}let b=0;for(const p of n){let g=!1;for(;!g&&b<l;){b++;const u=s+Math.random()*(a-s),v=Math.random()*Math.PI*2,m=c(t.lat,u,v),C={lat:t.lat+m.dLat,lng:t.lng+m.dLng};g=o.every(rt=>T(rt,C)>=i),g&&(o.push(C),r[p.id]={dLat:m.dLat,dLng:m.dLng})}if(!r[p.id]){const u=c(t.lat,s,Math.random()*Math.PI*2);r[p.id]={dLat:u.dLat,dLng:u.dLng}}}const f={seed:t,posById:r,createdAt:Date.now()};return U(z,f),f}function It(t,e){const n=M(z,null),r=n?.seed||e,o=n?.posById?.[t.id];return!r||!o?null:{lat:r.lat+o.dLat,lng:r.lng+o.dLng}}function B(t){const e=document.querySelector("#nearInfo");e&&(e.textContent=t||"")}function Et(t){const e=E();if(!e)return null;const n=`
    <div style="
      width:42px;height:42px;border-radius:999px;
      border:2px solid rgba(255,255,255,.95);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background-image:url('${e}');
      background-size:cover;
      background-position:center;
    "></div>
  `;return t.divIcon({html:n,className:"",iconSize:[42,42],iconAnchor:[21,21]})}function Tt(){const t=vt()||"You",e=E(),n=q()?"Following ✅":"Free look 👀",r=_().steps||0;return`
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
          <div style="opacity:.75; font-size:13px;">Distance → steps. 5k steps = +20 XP. 10k steps = +1 🎟.</div>
          <div id="stepsLine" style="opacity:.85; font-size:13px; margin-top:6px;">Steps: <b>${Number(r)}</b></div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <div style="
            width:28px;height:28px;border-radius:999px;
            border:1px solid rgba(255,255,255,.18);
            background:rgba(255,255,255,.06);
            ${e?`background-image:url('${e}'); background-size:cover; background-position:center;`:""}
            display:flex;align-items:center;justify-content:center;
            overflow:hidden;
          ">${e?"":"👤"}</div>
          <div style="opacity:.75; font-size:13px;">${zt(t)}</div>
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
  `}function Pt(t){const e=P();if(!e||!d)return;h||(h=e.layerGroup().addTo(d)),h.clearLayers();const n=et(),r=$t(t),o=[];for(const s of n){const a=It(s,r.seed);if(!a)continue;const l=Math.round(T(t,a));l>1200||o.push({node:s,ll:a,dist:l})}o.sort((s,a)=>s.dist-a.dist),o.length===0?B("No nodes nearby (walk a bit)."):B(`Nearest: ${o[0].node.name} • ${o[0].dist}m • Visible: ${o.length} (must be close to open)`);const i=60;o.forEach(({node:s,ll:a,dist:l})=>{const c=e.circleMarker([a.lat,a.lng],{radius:11,weight:2});c.bindTooltip(`${s.name} • ${l}m`,{direction:"top",offset:[0,-10]}),c.on("click",()=>{if(l>i){alert(`Too far.

Go closer to open:
${s.name}
Distance: ${l}m
Required: ≤ ${i}m`);return}Y(s)}),c.addTo(h)})}function qt(t){const e=P();return e?(d?setTimeout(()=>d.invalidateSize(),80):(d=e.map(t,{zoomControl:!0}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap"}).addTo(d),d.setView([51.687,4.867],16),d.on("dragstart",()=>{$(!1);const n=document.querySelector("#followBtn");n&&(n.textContent="Free look 👀")}),d.on("zoomstart",()=>{$(!1);const n=document.querySelector("#followBtn");n&&(n.textContent="Free look 👀")})),!0):!1}function I(){const t=document.querySelector("#stepsLine");if(!t)return;const e=_();t.innerHTML=`Steps: <b>${Number(e.steps||0)}</b>`}function R(t){if(!navigator.geolocation){t("❌ GPS not supported.");return}try{localStorage.setItem(Z,"1")}catch{}t("Requesting GPS…");const e=80;tt(),w=navigator.geolocation.watchPosition(n=>{const r=n.coords.latitude,o=n.coords.longitude,i=n.coords.accuracy||999;if(i>e){t(`GPS OK but accuracy low (${Math.round(i)}m). Move outside.`);return}t(`✅ GPS active (±${Math.round(i)}m)`);const s={lat:r,lng:o},a=P();if(a&&d){const c=Et(a);c&&(!y||JSON.stringify(y?.options)!==JSON.stringify(c?.options))&&(y=c,x&&x.setIcon(y)),x?x.setLatLng([r,o]):x=y?a.marker([r,o],{icon:y}).addTo(d):a.circleMarker([r,o],{radius:8,weight:2}).addTo(d)}d&&q()&&d.setView([r,o],Math.max(d.getZoom(),17),{animate:!0});const l=M(N,null);if(l){const c=T(l,s);c>=6&&c<=90&&(Nt(c),I())}U(N,s),Pt(s)},n=>{t(`❌ GPS blocked: ${n?.message||"error"}`)},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3})}function Ct(){const t=document.querySelector("#mapMount")||document,e=t.querySelector("#leafletMap"),n=t.querySelector("#gpsStartBtn"),r=t.querySelector("#gpsStopBtn"),o=t.querySelector("#gpsStatus"),i=t.querySelector("#followBtn");if(!e)return;const s=c=>{o&&(o.textContent=c||"")};let a=0;const l=()=>{if(a++,!qt(e)){s("Loading map engine…"),a<30?setTimeout(l,150):s("❌ Leaflet not loaded. Check index.html CDN.");return}s("Map ready. Enable GPS."),i&&(i.onclick=()=>{const f=!q();if($(f),i.textContent=f?"Following ✅":"Free look 👀",f&&d){const p=M(N,null);p&&d.setView([p.lat,p.lng],Math.max(d.getZoom(),17),{animate:!0})}}),n&&(n.onclick=()=>R(s)),r&&(r.onclick=()=>{tt(),s("GPS stopped.")}),I(),(()=>{try{return localStorage.getItem(Z)==="1"}catch{return!1}})()&&R(s),window.__cbsgo_steps_listener_v1||(window.__cbsgo_steps_listener_v1=!0,window.addEventListener("cbsgo:stepsChanged",I))};l()}function nt(){return Tt()}function G(){return Ct()}function Ot(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Bt(t,e=30){const n=t?`background-image:url('${t}');`:"";return`
    <div style="
      width:${e}px;height:${e}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${n}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">${t?"":"👤"}</div>
  `}function Rt(){try{return sessionStorage.getItem("cbsgo_selected_tab_v2")||"map"}catch{return"map"}}function Gt(t){try{sessionStorage.setItem("cbsgo_selected_tab_v2",t)}catch{}}function Ft(){const t=Rt(),e=(n,r,o)=>`
    <button type="button" data-tab="${n}" style="
      flex:1;
      height:56px;
      border:0;
      background:transparent;
      color:#fff;
      opacity:${t===n?"1":".72"};
      font:inherit;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:2px;
    ">
      <div style="font-size:18px; line-height:18px;">${o}</div>
      <div style="font-size:11px;">${Ot(r)}</div>
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
        ${e("map","Map","🗺️")}
        ${e("profile","Profile","👤")}
        ${e("bag","Bag","🎒")}
      </div>
    </nav>
  `}function jt(){const t=H(),e=E();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP always fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${nt()}
      </div>

      <!-- TOPBAR overlay -->
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
          ${Bt(e,32)}
          <div>
            <div style="font-weight:900; line-height:1;">CBS GO</div>
            <div style="opacity:.8; font-size:12px;">Explore Web2 × Web3, IRL</div>
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
          ${bt()}
        </div>
      </header>

      ${Ft()}

      ${t?`<button id="resetBtn" type="button" style="
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
  `}function Jt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-tab");Gt(e),ot()})})}function ot(){const t=document.querySelector("#app");if(t){if(t.innerHTML=jt(),Jt(),G(),H()){const e=document.querySelector("#resetBtn");e&&e.addEventListener("click",mt)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",e=>{const n=e?.detail?.id;if(!n||S(n))return;const r=F.find(o=>o.id===n);r&&Y(r)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const e=()=>{const n=document.querySelector("#mapMount");n&&(n.innerHTML=nt(),G())};window.addEventListener("cbsgo:rerenderMap",e),window.addEventListener("cbsgo:nodeCompleted",e)}}}ot();document.getElementById("startBtn").addEventListener("click",()=>{alert("CBS GO coming online…")});
