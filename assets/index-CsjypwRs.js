(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const O=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],A="cbsgo_state_v3";function H(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function R(){return{xp:0,completed:{}}}function b(){const e=localStorage.getItem(A);return H(e,R())}function T(e){localStorage.setItem(A,JSON.stringify(e))}function _(){return Number(b().xp||0)}function j(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function X(e){return Math.max(0,Number(e||0))%100}function F(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=b();return n.xp=Number(n.xp||0)+t,T(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function m(e){const t=String(e||"");return t?!!b().completed?.[t]:!1}function G(e){const t=String(e||"");if(!t)return!1;const n=b();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),T(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function y(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function E(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function D(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&x()}),document.body.appendChild(e),e)}function x(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function V(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(E).filter(Boolean)}function K(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function W(e){return e?.hint||e?.puzzle?.hint||""}function J(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function Q(e){const t=D(),n=String(e?.id||""),i=m(n),o=K(e),r=W(e),a=J(e),h=V(e);t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${y(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${a} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${y(o)}</div>
        ${r?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${y(r)}</div>`:""}
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
  `;const w=t.querySelector("#cbsgoClose");if(w&&(w.onclick=x),i)return;const S=t.querySelector("#cbsgoMsg"),p=t.querySelector("#cbsgoAnswer"),k=t.querySelector("#cbsgoSubmit"),l=c=>{S&&(S.textContent=c||"")},z=()=>{if(!n)return;if(m(n)){l("✅ Already completed.");return}const c=E(p?.value||"");if(h.length===0){l("⚠️ This node has no answers configured yet.");return}if(!h.includes(c)){l("❌ Not correct. Try again.");return}if(!G(n)){l("✅ Already completed.");return}F(a),l(`✅ Correct! +${a} XP`),setTimeout(()=>x(),550)};k&&(k.onclick=z),p&&(p.addEventListener("keydown",c=>{c.key==="Enter"&&z()}),setTimeout(()=>p.focus(),50))}function Y(){const e=_(),t=j(e),n=X(e),i=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${i}%"></div>
      </div>
    </div>
  `}function q(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Z(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const U="cbsgo_player_avatar_v2";function ee(){try{return localStorage.getItem(U)||""}catch{return""}}let s=null,u=null,te=null;function g(e){return document.getElementById(e)}function d(e){const t=g("cbsgoMapHost");if(!t)return;let n=g("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function P(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function ne(){try{s&&(s.remove(),s=null,u=null,te=null)}catch{}}function oe(){const e=window.L,t=g("cbsgoMap");return!e||!t?!1:(ne(),s=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(s),s.setView([51.687,4.87],16),!0)}function re(){!navigator.geolocation||!s||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:i}=e.coords,o=window.L,r=[t,n];u?u.setLatLng(r):(u=o.circleMarker(r,{radius:8,weight:2,opacity:.9,fillOpacity:.6}).addTo(s),s.setView(r,18)),d(`GPS OK • accuracy ~${Math.round(i)}m`)},e=>{d(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function M(){let e=0;const t=80,n=()=>{if(e++,!g("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(d("Loading map engine…"),e<t)return setTimeout(n,100);d("Map engine failed to load (Leaflet not found). Refresh.");return}if(!oe()){d("Could not init map. Refresh.");return}d("Loading GPS…"),re()};n()}function N(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ie(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function B(){try{return sessionStorage.getItem("cbsgo_selected_tab_v3")||"map"}catch{return"map"}}function L(e){try{sessionStorage.setItem("cbsgo_selected_tab_v3",e)}catch{}}function se(){const e=B(),t=(n,i,o)=>`
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
      <div style="font-size:11px;">${N(i)}</div>
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
  `}function $(e,t){return`
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
        width:min(720px, 96vw);
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
          <div style="font-weight:900;">${N(e)}</div>
          <button type="button" id="cbsgoClosePanel" style="
            border:0;
            padding:8px 10px;
            border-radius:12px;
            background:rgba(255,255,255,.08);
            color:#fff;
          ">Close</button>
        </div>
        <div style="padding:12px 14px;">
          ${t}
        </div>
      </div>
    </div>
  `}function ae(){const e=B();return e==="profile"?$("Profile",`
      <div style="opacity:.9; font-size:13px; line-height:1.35;">
        Profile panel is live. Next step we add: name + photo editor (saved local).
      </div>
    `):e==="bag"?$("Bag",`
      <div style="opacity:.9; font-size:13px; line-height:1.35;">
        Bag panel is live. Next step we show: tickets, steps, loot items.
      </div>
    `):""}function de(){const e=q(),t=ee();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP always fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${P()}
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
          ${ie(t,32)}
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
          ${Y()}
        </div>
      </header>

      ${se()}
      ${ae()}

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
  `}function le(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");L(n||"map"),v()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{L("map"),v()})}function v(){const e=document.querySelector("#app");if(e){if(e.innerHTML=de(),le(),M(),q()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Z)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n||m(n))return;const i=O.find(o=>o.id===n);i&&Q(i)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const t=()=>{const n=document.querySelector("#mapMount");n&&(n.innerHTML=P(),M())};window.addEventListener("cbsgo:rerenderMap",t),window.addEventListener("cbsgo:nodeCompleted",t)}}}function I(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function f(e){const t=I();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";f(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{f(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function C(){try{if(!document.getElementById("app")){f("❌ #app not found in index.html");return}v();const t=I();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){f(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C,{once:!0}):C();
