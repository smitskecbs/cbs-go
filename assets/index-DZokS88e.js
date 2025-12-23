(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const ee=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],F="cbsgo_state_v3";function te(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ne(){return{xp:0,completed:{}}}function v(){const e=localStorage.getItem(F);return te(e,ne())}function D(e){localStorage.setItem(F,JSON.stringify(e))}function N(){return Number(v().xp||0)}function G(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function oe(e){return Math.max(0,Number(e||0))%100}function re(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return N();const n=v();return n.xp=Number(n.xp||0)+t,D(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function S(e){const t=String(e||"");return t?!!v().completed?.[t]:!1}function ie(e){const t=String(e||"");if(!t)return!1;const n=v();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),D(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function w(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function J(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function se(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&k()}),document.body.appendChild(e),e)}function k(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function ae(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(J).filter(Boolean)}function de(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function le(e){return e?.hint||e?.puzzle?.hint||""}function ce(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function pe(e){const t=se(),n=String(e?.id||""),o=S(n),r=de(e),i=le(e),s=ce(e),a=ae(e);t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${w(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${s} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${w(r)}</div>
        ${i?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${w(i)}</div>`:""}
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
  `;const d=t.querySelector("#cbsgoClose");if(d&&(d.onclick=k),o)return;const E=t.querySelector("#cbsgoMsg"),b=t.querySelector("#cbsgoAnswer"),C=t.querySelector("#cbsgoSubmit"),u=g=>{E&&(E.textContent=g||"")},P=()=>{if(!n)return;if(S(n)){u("✅ Already completed.");return}const g=J(b?.value||"");if(a.length===0){u("⚠️ This node has no answers configured yet.");return}if(!a.includes(g)){u("❌ Not correct. Try again.");return}if(!ie(n)){u("✅ Already completed.");return}re(s),u(`✅ Correct! +${s} XP`),setTimeout(()=>k(),550)};C&&(C.onclick=P),b&&(b.addEventListener("keydown",g=>{g.key==="Enter"&&P()}),setTimeout(()=>b.focus(),50))}function I(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function ue(){const e=Number(N()||0),t=Number(G(e)||1),n=Number(oe(e)||0),o=I(n,0,100),r=I(o/100*100,0,100);return`
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
  `}const ge="cbsgo_inventory_v1";function fe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function be(){return{tickets:0}}function ye(){const e=localStorage.getItem(ge);return fe(e,be())}function K(){return Number(ye().tickets||0)}const me="cbsgo_steps_v4";let xe={msg:"init"};function ve(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function he(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function $(){const e=localStorage.getItem(me);return ve(e,he())}function q(){return Number($().steps||0)}function B(){return xe}function z(e){const t=Number(e||0);return Number.isFinite(t)?t:0}function we(){return typeof q=="function"?z(q()):typeof $=="function"?z($()?.steps):0}function Se(){try{if(typeof B!="function")return"";const e=B();return e?.err?"🔴":e?.lat?"🟢":"🟡"}catch{return""}}function Y(){const e=we(),t=z(K?.()??0);return`
    <div style="
      display:flex;
      align-items:center;
      gap:10px;
      font-size:12px;
      opacity:.92;
      white-space:nowrap;
    ">
      <span style="opacity:.85;">${Se()}</span>
      <span class="pill" style="padding:6px 10px;">👟 <b>${e}</b></span>
      <span class="pill" style="padding:6px 10px;">🎟 <b>${t}</b></span>
    </div>
  `}function V(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ke(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const L="cbsgo_leaderboard_v2",W="cbsgo_player_name_v2",_="cbsgo_player_avatar_v2";function U(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function $e(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function A(){try{return localStorage.getItem(W)||"Sovereign"}catch{return"Sovereign"}}function ze(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(W,t)}catch{}return t}function h(){try{return localStorage.getItem(_)||""}catch{return""}}function Le(e){const t=String(e||"");try{localStorage.setItem(_,t)}catch{}return t}function Me(){try{localStorage.removeItem(_)}catch{}}function Ne(e=10){const t=U(L,[]);return Array.isArray(t)?t.slice(0,e):[]}function _e(){const e=A(),t=h(),n=N(),o=G(n),r=U(L,[]),i=Array.isArray(r)?r:[],s=i.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((a,d)=>Number(d.xp||0)-Number(a.xp||0)),$e(L,i),{name:e,xp:n,level:o,avatar:t}}let l=null,f=null;function y(e){return document.getElementById(e)}function c(e){const t=y("cbsgoMapHost");if(!t)return;let n=y("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Q(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function Ae(){try{l&&(l.remove(),l=null,f=null)}catch{}}function O(e){const t=h(),o=((A()||"You").trim()[0]||"Y").toUpperCase();if(t){const i=`
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
  `;return e.divIcon({html:r,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Te(){const e=window.L,t=y("cbsgoMap");return!e||!t?!1:(Ae(),l=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(l),l.setView([51.687,4.87],16),!0)}function Ee(){!navigator.geolocation||!l||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r=window.L,i=[t,n];if(f){f.setLatLng(i);try{const s=O(r);f.setIcon(s)}catch{}}else{const s=O(r);f=r.marker(i,{icon:s}).addTo(l),l.setView(i,18)}c(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{c(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function R(){let e=0;const t=80,n=()=>{if(e++,!y("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(c("Loading map engine…"),e<t)return setTimeout(n,100);c("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Te()){c("Could not init map. Refresh.");return}c("Loading GPS…"),Ee()};n()}function m(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function M(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
      flex:0 0 auto;
    ">${e?"":"👤"}</div>
  `}function T(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function j(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Ce(){const e=T(),t=(n,o,r)=>`
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
      <div style="font-size:11px;">${m(o)}</div>
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
  `}function H(e,t){return`
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
          <div style="font-weight:900;">${m(e)}</div>
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
  `}function Pe(){const e=Ne(10),t=A(),n=h();return`
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
          ${M(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${m(t)}" maxlength="24" style="
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
                      ${M(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${m(o.name)}
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
  `}function Ie(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=a=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=a||"")};e&&i(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const a=ze(e.value);i(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(s,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const d=new FileReader;d.onload=()=>{Le(String(d.result||"")),i("✅ Photo saved"),p()},d.onerror=()=>i("⛔ Failed to read image."),d.readAsDataURL(a)}),o&&(o.onclick=()=>{Me(),i("✅ Photo removed"),p()}),t&&(t.onclick=()=>{e&&s();const a=_e();i(`✅ Saved: ${a.name} – ${a.xp} XP`),p()})}function qe(){return`
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
        <div class="pill">🎟️ Tickets: <b>${K()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Next: add item bag (fireworks beacon) + loot drops on the map.
      </div>
    </div>
  `}function Be(){const e=T();return e==="profile"?H("Profile",`<div id="lbMount">${Pe()}</div>`):e==="bag"?H("Bag",`<div id="bagMount">${qe()}</div>`):""}function Oe(){const e=V(),t=h();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Q()}
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
        <!-- LEFT (compact) -->
        <div style="
          display:flex; gap:10px; align-items:center;
          pointer-events:auto;
          padding:10px 12px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter: blur(10px);
          min-width:0;
          flex:0 0 auto;
        ">
          ${M(t,30)}
          <div style="font-weight:900; line-height:1; white-space:nowrap;">CBS GO</div>
        </div>

        <!-- RIGHT (XP + Steps/Tickets compact) -->
        <div style="
          pointer-events:auto;
          display:flex;
          align-items:flex-start;
          gap:10px;
          min-width:0;
        ">
          <div id="xpMount" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
          ">
            ${ue()}
          </div>

          <div id="stepsOverlay" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
            white-space:nowrap;
          ">
            ${Y()}
          </div>
        </div>
      </header>

      ${Ce()}
      ${Be()}

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
  `}function Re(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");j(n||"map"),p()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{j("map"),p()})}function p(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Oe(),Re(),R(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsOverlay");o&&(o.innerHTML=Y())};window.addEventListener("cbsgo:rerenderSteps",n),window.addEventListener("cbsgo:stepsChanged",n)}if(T()==="profile"&&Ie(),V()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",ke)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||S(o))return;const r=ee.find(i=>i.id===o);r&&pe(r)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const n=()=>{const o=document.querySelector("#mapMount");o&&(o.innerHTML=Q(),R())};window.addEventListener("cbsgo:rerenderMap",n),window.addEventListener("cbsgo:nodeCompleted",n)}}function Z(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function x(e){const t=Z();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";x(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{x(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function X(){try{if(!document.getElementById("app")){x("❌ #app not found in index.html");return}p();const t=Z();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){x(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",X,{once:!0}):X();
