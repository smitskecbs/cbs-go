(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const N=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],L="cbsgo_state_v3";function P(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function I(){return{xp:0,completed:{}}}function y(){const e=localStorage.getItem(L);return P(e,I())}function $(e){localStorage.setItem(L,JSON.stringify(e))}function A(){return Number(y().xp||0)}function B(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function O(e){return Math.max(0,Number(e||0))%100}function H(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return A();const n=y();return n.xp=Number(n.xp||0)+t,$(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function m(e){const t=String(e||"");return t?!!y().completed?.[t]:!1}function R(e){const t=String(e||"");if(!t)return!1;const n=y();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),$(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function b(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function C(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function j(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&x()}),document.body.appendChild(e),e)}function x(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function X(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(C).filter(Boolean)}function F(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function G(e){return e?.hint||e?.puzzle?.hint||""}function D(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function V(e){const t=j(),n=String(e?.id||""),i=m(n),o=F(e),r=G(e),a=D(e),h=X(e);t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${b(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${a} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${b(o)}</div>
        ${r?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${b(r)}</div>`:""}
      </div>

      ${i?`
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
  `;const v=t.querySelector("#cbsgoClose");if(v&&(v.onclick=x),i)return;const w=t.querySelector("#cbsgoMsg"),p=t.querySelector("#cbsgoAnswer"),S=t.querySelector("#cbsgoSubmit"),l=c=>{w&&(w.textContent=c||"")},z=()=>{if(!n)return;if(m(n)){l("✅ Already completed.");return}const c=C(p?.value||"");if(h.length===0){l("⚠️ This node has no answers configured yet.");return}if(!h.includes(c)){l("❌ Not correct. Try again.");return}if(!R(n)){l("✅ Already completed.");return}H(a),l(`✅ Correct! +${a} XP`),setTimeout(()=>x(),550)};S&&(S.onclick=z),p&&(p.addEventListener("keydown",c=>{c.key==="Enter"&&z()}),setTimeout(()=>p.focus(),50))}function K(){const e=A(),t=B(e),n=O(e),i=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${i}%"></div>
      </div>
    </div>
  `}function T(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function W(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const J="cbsgo_player_avatar_v2";function Q(){try{return localStorage.getItem(J)||""}catch{return""}}let s=null,u=null,Y=null;function g(e){return document.getElementById(e)}function d(e){const t=g("cbsgoMapHost");if(!t)return;let n=g("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function _(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function Z(){try{s&&(s.remove(),s=null,u=null,Y=null)}catch{}}function U(){const e=window.L,t=g("cbsgoMap");return!e||!t?!1:(Z(),s=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(s),s.setView([51.687,4.87],16),!0)}function ee(){!navigator.geolocation||!s||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:i}=e.coords,o=window.L,r=[t,n];u?u.setLatLng(r):(u=o.circleMarker(r,{radius:8,weight:2,opacity:.9,fillOpacity:.6}).addTo(s),s.setView(r,18)),d(`GPS OK • accuracy ~${Math.round(i)}m`)},e=>{d(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function k(){let e=0;const t=80,n=()=>{if(e++,!g("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(d("Loading map engine…"),e<t)return setTimeout(n,100);d("Map engine failed to load (Leaflet not found). Refresh.");return}if(!U()){d("Could not init map. Refresh.");return}d("Loading GPS…"),ee()};n()}function te(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ne(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function oe(){try{return sessionStorage.getItem("cbsgo_selected_tab_v2")||"map"}catch{return"map"}}function re(e){try{sessionStorage.setItem("cbsgo_selected_tab_v2",e)}catch{}}function ie(){const e=oe(),t=(n,i,o)=>`
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
      <div style="font-size:18px; line-height:18px;">${o}</div>
      <div style="font-size:11px;">${te(i)}</div>
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
  `}function se(){const e=T(),t=Q();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP always fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${_()}
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
          ${ne(t,32)}
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
          ${K()}
        </div>
      </header>

      ${ie()}

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
  `}function ae(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tab");re(t),E()})})}function E(){const e=document.querySelector("#app");if(e){if(e.innerHTML=se(),ae(),k(),T()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",W)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n||m(n))return;const i=N.find(o=>o.id===n);i&&V(i)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const t=()=>{const n=document.querySelector("#mapMount");n&&(n.innerHTML=_(),k())};window.addEventListener("cbsgo:rerenderMap",t),window.addEventListener("cbsgo:nodeCompleted",t)}}}function q(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function f(e){const t=q();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";f(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{f(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function M(){try{if(!document.getElementById("app")){f("❌ #app not found in index.html");return}E();const t=q();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){f(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",M,{once:!0}):M();
