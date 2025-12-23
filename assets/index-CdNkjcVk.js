(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const E="cbsgo_state_v3";function R(t,n){try{const e=JSON.parse(t);return e&&typeof e=="object"?e:n}catch{return n}}function F(){return{xp:0,completed:{}}}function I(){const t=localStorage.getItem(E);return R(t,F())}function H(t){localStorage.setItem(E,JSON.stringify(t))}function L(){return Number(I().xp||0)}function j(t){const n=Math.max(0,Number(t||0));return Math.floor(n/100)+1}function K(t){return Math.max(0,Number(t||0))%100}function Y(t){const n=Number(t);if(!Number.isFinite(n)||n<=0)return L();const e=I();return e.xp=Number(e.xp||0)+n,H(e),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:e.xp,delta:n}})),e.xp}function $(t,n,e){const o=Number(t||0);return Number.isFinite(o)?Math.max(n,Math.min(e,o)):n}function q(){const t=Number(L()||0),n=Number(j(t)||1),e=Number(K(t)||0),o=$(e,0,100),r=$(o/100*100,0,100);return`
    <div style="min-width:180px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; line-height:1;">Level ${n}</div>
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
        Total XP: ${t}
      </div>
    </div>
  `}const A="cbsgo_inventory_v1";function X(t,n){try{const e=JSON.parse(t);return e&&typeof e=="object"?e:n}catch{return n}}function J(){return{tickets:0}}function w(){const t=localStorage.getItem(A);return X(t,J())}function V(t){localStorage.setItem(A,JSON.stringify(t))}function C(){return Number(w().tickets||0)}function W(t=1){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return w();const e=w();return e.tickets=Number(e.tickets||0)+n,V(e),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...e}})),e}const z="cbsgo_steps_v5",U="cbsgo_gps_autostart_v2";let x=null,f=!1,l={msg:"init",t:Date.now()};function Z(t,n){try{const e=JSON.parse(t);return e&&typeof e=="object"?e:n}catch{return n}}function Q(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function m(){const t=localStorage.getItem(z);return Z(t,Q())}function S(t){t.updatedAt=Date.now(),localStorage.setItem(z,JSON.stringify(t))}function k(){return Number(m().steps||0)}function tt(){return!!f}function T(){return l}function et(t,n){const o=c=>c*Math.PI/180,r=o(n.lat-t.lat),s=o(n.lng-t.lng),i=o(t.lat),p=o(n.lat),y=Math.sin(r/2)**2+Math.cos(i)*Math.cos(p)*Math.sin(s/2)**2;return 2*6371e3*Math.asin(Math.sqrt(y))}function nt(t){!t.rewarded5k&&t.steps>=5e3&&(t.rewarded5k=!0,Y(20)),!t.rewarded10k&&t.steps>=1e4&&(t.rewarded10k=!0,W(1))}function ot(t){const n=Number(t||0);if(!Number.isFinite(n)||n<=0)return m();const e=m();e.meters=Number(e.meters||0)+n;const o=Math.floor((e.meters||0)/.75);return o>e.steps&&(e.steps=o),nt(e),S(e),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:e.steps}})),e}function rt(){x!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(x),x=null}async function st(t={}){const n=!!t.silent;if(!navigator.geolocation)return f=!1,l={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(U,"1")}catch{}rt(),f=!0,l={msg:"requesting",t:Date.now()};const e=100;try{return x=navigator.geolocation.watchPosition(o=>{const r=o.coords.latitude,s=o.coords.longitude,i=o.coords.accuracy||999,p=Date.now(),y={lat:r,lng:s,t:p};if(i>e){l={msg:`low accuracy ${Math.round(i)}m`,acc:i,t:p},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:k()}}));const d=m();d.lastPos=y,S(d);return}l={lat:r,lng:s,acc:i,t:p};let c=m();const g=c.lastPos;if(g&&typeof g.lat=="number"&&typeof g.lng=="number"){const d=et({lat:g.lat,lng:g.lng},{lat:r,lng:s});d>=6&&d<=90&&(c=ot(d))}c.lastPos=y,S(c),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:c.steps}}))},o=>{f=!1,l={err:o?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:k()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return f=!1,l={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function O(){return st({silent:!0})}function it(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function at(){const t=T();return t?.err?"🔴":t?.lat?"🟢":tt()?"🟡":"⚪"}function ct(){const t=Number(k()||0),n=Number(C()||0),e=T(),o=e?.err?`GPS: ${e.err}`:e?.lat?`GPS OK ±${Math.round(e.acc||0)}m`:e?.msg?`GPS: ${e.msg}`:"GPS";return`
    <button id="stepsMiniBtn" type="button" title="${it(o)}" style="
      display:flex;
      align-items:center;
      gap:8px;
      padding:8px 10px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      color:#fff;
      font:inherit;
      cursor:pointer;
      white-space:nowrap;
    ">
      <span style="font-size:14px; line-height:14px;">${at()}</span>
      <span style="font-size:12px; opacity:.9;">👣 <b>${t}</b></span>
      <span style="font-size:12px; opacity:.9;">🎟️ <b>${n}</b></span>
    </button>
  `}function lt(){const t=document.querySelector("#stepsMiniBtn");t&&(t.__cbsgo_bound||(t.__cbsgo_bound=!0,t.addEventListener("click",async()=>{await O()})))}const dt="cbsgo_player_name_v2",ut="cbsgo_player_avatar_v2";function pt(){try{return localStorage.getItem(dt)||"Sovereign"}catch{return"Sovereign"}}function G(){try{return localStorage.getItem(ut)||""}catch{return""}}let a=null,b=null;function v(t){return document.getElementById(t)}function u(t){const n=v("cbsgoMapHost");if(!n)return;let e=v("cbsgoMapMsg");e||(e=document.createElement("div"),e.id="cbsgoMapMsg",e.style.position="absolute",e.style.left="12px",e.style.right="12px",e.style.bottom="86px",e.style.zIndex="9999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.14)",e.style.background="rgba(0,0,0,.40)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="13px",e.style.backdropFilter="blur(10px)",n.appendChild(e)),e.textContent=t||""}function gt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function ft(){try{a&&(a.remove(),a=null,b=null)}catch{}}function _(t){const n=G(),o=((pt()||"You").trim()[0]||"Y").toUpperCase();if(n){const s=`
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${n}');
        background-size:cover;
        background-position:center;
        background-color:rgba(255,255,255,.10);
      "></div>
    `;return t.divIcon({html:s,className:"",iconSize:[44,44],iconAnchor:[22,22]})}const r=`
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
  `;return t.divIcon({html:r,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function bt(){const t=window.L,n=v("cbsgoMap");return!t||!n?!1:(ft(),a=t.map(n,{zoomControl:!1,attributionControl:!1}),t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(a),a.setView([51.687,4.87],16),!0)}function mt(){!navigator.geolocation||!a||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:n,longitude:e,accuracy:o}=t.coords,r=window.L,s=[n,e];if(b){b.setLatLng(s);try{const i=_(r);b.setIcon(i)}catch{}}else{const i=_(r);b=r.marker(s,{icon:i}).addTo(a),a.setView(s,18)}u(`GPS OK • accuracy ~${Math.round(o)}m`)},t=>{u(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function yt(){let t=0;const n=80,e=()=>{if(t++,!v("cbsgoMap"))return t<n?setTimeout(e,100):void 0;if(!window.L){if(u("Loading map engine…"),t<n)return setTimeout(e,100);u("Map engine failed to load (Leaflet not found). Refresh.");return}if(!bt()){u("Could not init map. Refresh.");return}u("Loading GPS…"),mt()};e()}function B(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function N(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function xt(){const t=B(),n=(e,o,r)=>`
    <button type="button" data-tab="${e}" style="
      flex:1;height:56px;border:0;background:transparent;
      color:#fff;opacity:${t===e?"1":".7"};
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:2px;
    ">
      <div style="font-size:18px;">${r}</div>
      <div style="font-size:11px;">${o}</div>
    </button>
  `;return`
    <nav style="
      position:fixed;left:0;right:0;bottom:0;z-index:5000;
      padding:10px;background:rgba(10,12,18,.72);
      backdrop-filter:blur(10px);
      border-top:1px solid rgba(255,255,255,.1);
    ">
      <div style="
        display:flex;gap:8px;border-radius:18px;
        border:1px solid rgba(255,255,255,.1);
        background:rgba(0,0,0,.2);
      ">
        ${n("map","Map","🗺️")}
        ${n("profile","Profile","👤")}
        ${n("bag","Bag","🎒")}
      </div>
    </nav>
  `}function vt(t,n){return`
    <div style="
      position:fixed;left:0;right:0;bottom:0;z-index:6500;
      padding:12px 12px 86px;pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px,96vw);margin:0 auto;
        border-radius:22px;border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.86);backdrop-filter:blur(12px);
      ">
        <div style="
          padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.1);
          display:flex;justify-content:space-between;
        ">
          <b>${t}</b>
          <button id="cbsgoClosePanel">Close</button>
        </div>
        <div style="padding:12px 14px;max-height:70vh;overflow:auto;">
          ${n}
        </div>
      </div>
    </div>
  `}function ht(){return`
    <div>
      <div class="pill">🎟️ Tickets: <b>${C()}</b></div>
      <div class="pill" style="opacity:.6">🎆 Fireworks (soon)</div>
    </div>
  `}function wt(){return B()==="bag"?vt("Bag",ht()):""}function St(){return G(),`
    <div style="position:fixed;inset:0;background:#05070b;overflow:hidden">

      <div id="mapMount" style="position:absolute;inset:0;z-index:1">
        ${gt()}
      </div>

      <!-- TOP RIGHT -->
      <div style="
        position:absolute;top:10px;right:10px;z-index:4000;
        display:flex;flex-direction:column;gap:6px;
      ">
        <div style="
          padding:10px 12px;border-radius:18px;
          background:rgba(10,12,18,.72);
          border:1px solid rgba(255,255,255,.12);
        ">
          ${q()}
        </div>

        <div id="stepsMount">
          ${ct()}
        </div>
      </div>

      ${xt()}
      ${wt()}
    </div>
  `}function M(){const t=document.querySelector("#app");if(!t)return;t.innerHTML=St(),yt(),lt(),window.__cbsgo_steps_autostart||(window.__cbsgo_steps_autostart=!0,O()),document.querySelectorAll("[data-tab]").forEach(e=>{e.onclick=()=>{N(e.dataset.tab),M()}});const n=document.querySelector("#cbsgoClosePanel");n&&(n.onclick=()=>{N("map"),M()})}function D(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function h(t){const n=D();n.textContent=String(t||""),n.style.display="block"}window.addEventListener("error",t=>{const n=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";h(`❌ Error
${t?.message||t}
${n}`)});window.addEventListener("unhandledrejection",t=>{h(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function P(){try{if(!document.getElementById("app")){h("❌ #app not found in index.html");return}M();const n=D();n.textContent="✅ boot ok",n.style.display="block",setTimeout(()=>{n.style.display="none"},1e3)}catch(t){h(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",P,{once:!0}):P();
