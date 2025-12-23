(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const ae=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],X="cbsgo_state_v3";function le(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function de(){return{xp:0,completed:{}}}function A(){const e=localStorage.getItem(X);return le(e,de())}function J(e){localStorage.setItem(X,JSON.stringify(e))}function P(){return Number(A().xp||0)}function K(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function ce(e){return Math.max(0,Number(e||0))%100}function Y(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return P();const n=A();return n.xp=Number(n.xp||0)+t,J(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function E(e){const t=String(e||"");return t?!!A().completed?.[t]:!1}function pe(e){const t=String(e||"");if(!t)return!1;const n=A();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),J(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function M(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function W(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function ue(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&_()}),document.body.appendChild(e),e)}function _(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function ge(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(W).filter(Boolean)}function fe(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function be(e){return e?.hint||e?.puzzle?.hint||""}function me(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function ye(e){const t=ue(),n=String(e?.id||""),o=E(n),r=fe(e),i=be(e),a=me(e),s=ge(e);t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${M(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${a} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${M(r)}</div>
        ${i?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${M(i)}</div>`:""}
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
  `;const l=t.querySelector("#cbsgoClose");if(l&&(l.onclick=_),o)return;const m=t.querySelector("#cbsgoMsg"),p=t.querySelector("#cbsgoAnswer"),$=t.querySelector("#cbsgoSubmit"),u=y=>{m&&(m.textContent=y||"")},O=()=>{if(!n)return;if(E(n)){u("✅ Already completed.");return}const y=W(p?.value||"");if(s.length===0){u("⚠️ This node has no answers configured yet.");return}if(!s.includes(y)){u("❌ Not correct. Try again.");return}if(!pe(n)){u("✅ Already completed.");return}Y(a),u(`✅ Correct! +${a} XP`),setTimeout(()=>_(),550)};$&&($.onclick=O),p&&(p.addEventListener("keydown",y=>{y.key==="Enter"&&O()}),setTimeout(()=>p.focus(),50))}function ve(){const e=P(),t=K(e),n=ce(e),o=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${o}%"></div>
      </div>
    </div>
  `}const V="cbsgo_inventory_v1";function xe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function we(){return{tickets:0}}function L(){const e=localStorage.getItem(V);return xe(e,we())}function he(e){localStorage.setItem(V,JSON.stringify(e))}function T(){return Number(L().tickets||0)}function Se(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return L();const n=L();return n.tickets=Number(n.tickets||0)+t,he(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const U="cbsgo_steps_v1",Q="cbsgo_steps_enabled_v1",ke=.78;let x=null,g=null,c={msg:"idle",t:0,lat:null,lng:null,acc:null,err:null};function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function $e(){return{steps:0,meters:0,last5kAwardAt:0,last10kAwardAt:0}}function z(){const e=localStorage.getItem(U);return Ae(e,$e())}function Me(e){localStorage.setItem(U,JSON.stringify(e))}function Ee(){return Number(z().steps||0)}function Z(){try{return localStorage.getItem(Q)==="1"}catch{return!1}}function v(e){try{localStorage.setItem(Q,e?"1":"0")}catch{}}function _e(){return c}function Le(e,t){const o=u=>u*Math.PI/180,r=o(e.lat),i=o(t.lat),a=o(t.lat-e.lat),s=o(t.lng-e.lng),l=Math.sin(a/2),m=Math.sin(s/2),p=l*l+Math.cos(r)*Math.cos(i)*m*m;return 6371e3*(2*Math.atan2(Math.sqrt(p),Math.sqrt(1-p)))}function ze(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return z();const n=z();n.meters=Number(n.meters||0)+t;const o=Math.floor(t/ke);o>0&&(n.steps=Number(n.steps||0)+o);const r=Number(n.steps||0),i=Math.floor(r/5e3)*5e3;if(i>=5e3&&i>Number(n.last5kAwardAt||0)){for(let s=Number(n.last5kAwardAt||0)+5e3;s<=i;s+=5e3)Y(20);n.last5kAwardAt=i}const a=Math.floor(r/1e4)*1e4;if(a>=1e4&&a>Number(n.last10kAwardAt||0)){for(let s=Number(n.last10kAwardAt||0)+1e4;s<=a;s+=1e4)Se(1);n.last10kAwardAt=a}return Me(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps,meters:n.meters,tickets:T()}})),n}async function Ne(){return navigator.geolocation?x!=null?(v(!0),c={...c,msg:"already_enabled",t:Date.now(),err:null},{ok:!0}):(g=null,c={msg:"starting",t:Date.now(),lat:null,lng:null,acc:null,err:null},x=navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords;c={msg:"ok",t:Date.now(),lat:t,lng:n,acc:o,err:null};const r={lat:t,lng:n};if(!g){g=r,v(!0),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"));return}const i=Le(g,r);i>=2&&(ze(i),g=r,window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps")))},e=>{c={msg:"error",t:Date.now(),lat:null,lng:null,acc:null,err:e?.message||String(e)},v(!1),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4}),v(!0),{ok:!0}):(c={msg:"geolocation_not_supported",t:Date.now(),lat:null,lng:null,acc:null,err:"Geolocation not supported"},{ok:!1,reason:"Geolocation not supported"})}function Ce(){try{x!=null&&navigator.geolocation.clearWatch(x)}catch{}x=null,g=null,v(!1),c={msg:"disabled",t:Date.now(),lat:null,lng:null,acc:null,err:null},window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))}function R(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Pe(e){try{return new Date(e).toLocaleTimeString()}catch{return""}}function ee(){const e=Ee(),t=T(),n=Z(),o=_e(),r=o?.err?`❌ ${R(o.err)}`:o?.lat?`✅ ${Pe(o.t)} acc=${Math.round(o.acc||0)}m`:o?.msg?`ℹ️ ${R(o.msg)}`:"…";return`
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
  `}function D(){const t=(document.querySelector("#stepsMount")||document).querySelector("#enableStepsBtn");t&&(t.__cbsgo_bound||(t.__cbsgo_bound=!0,t.addEventListener("click",async()=>{if(Z()){Ce(),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"));return}const n=await Ne();n?.ok||alert(n?.reason||"Could not enable GPS steps."),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))})))}function te(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Te(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const N="cbsgo_leaderboard_v2",ne="cbsgo_player_name_v2",q="cbsgo_player_avatar_v2";function oe(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function qe(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function re(){try{return localStorage.getItem(ne)||"Sovereign"}catch{return"Sovereign"}}function Ie(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ne,t)}catch{}return t}function I(){try{return localStorage.getItem(q)||""}catch{return""}}function Be(e){const t=String(e||"");try{localStorage.setItem(q,t)}catch{}return t}function Oe(){try{localStorage.removeItem(q)}catch{}}function Re(e=10){const t=oe(N,[]);return Array.isArray(t)?t.slice(0,e):[]}function De(){const e=re(),t=I(),n=P(),o=K(n),r=oe(N,[]),i=Array.isArray(r)?r:[],a=i.find(s=>s.name===e);return a?(a.xp=n,a.level=o,a.avatar=t,a.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((s,l)=>Number(l.xp||0)-Number(s.xp||0)),qe(N,i),{name:e,xp:n,level:o,avatar:t}}let d=null,w=null,He=null;function h(e){return document.getElementById(e)}function f(e){const t=h("cbsgoMapHost");if(!t)return;let n=h("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function ie(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function je(){try{d&&(d.remove(),d=null,w=null,He=null)}catch{}}function Ge(){const e=window.L,t=h("cbsgoMap");return!e||!t?!1:(je(),d=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(d),d.setView([51.687,4.87],16),!0)}function Fe(){!navigator.geolocation||!d||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r=window.L,i=[t,n];w?w.setLatLng(i):(w=r.circleMarker(i,{radius:8,weight:2,opacity:.9,fillOpacity:.6}).addTo(d),d.setView(i,18)),f(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{f(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function H(){let e=0;const t=80,n=()=>{if(e++,!h("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(f("Loading map engine…"),e<t)return setTimeout(n,100);f("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Ge()){f("Could not init map. Refresh.");return}f("Loading GPS…"),Fe()};n()}function S(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function C(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function B(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function j(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Xe(){const e=B(),t=(n,o,r)=>`
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
  `}function G(e,t){return`
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
  `}function Je(){const e=Re(10),t=re(),n=I();return`
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
          ${C(n,44)}

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
                      ${C(o.avatar,28)}
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
  `}function Ke(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=s=>{const l=document.querySelector("#lbMsg");l&&(l.textContent=s||"")};e&&i(`✅ Profile loaded: ${e.value}`);const a=()=>{if(!e)return;const s=Ie(e.value);i(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(a,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),a()})),n&&n.addEventListener("change",()=>{const s=n.files&&n.files[0];if(!s)return;if(s.size>15e5){i("❌ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const l=new FileReader;l.onload=()=>{Be(String(l.result||"")),i("✅ Photo saved"),b()},l.onerror=()=>i("❌ Failed to read image."),l.readAsDataURL(s)}),o&&(o.onclick=()=>{Oe(),i("✅ Photo removed"),b()}),t&&(t.onclick=()=>{e&&a();const s=De();i(`✅ Saved: ${s.name} – ${s.xp} XP`),b()})}function Ye(){return`
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
        <div class="pill">🎟️ Tickets: <b>${T()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Next: add item bag (fireworks beacon) + loot drops on the map.
      </div>
    </div>
  `}function We(){const e=B();return e==="profile"?G("Profile",`<div id="lbMount">${Je()}</div>`):e==="bag"?G("Bag",`<div id="bagMount">${Ye()}</div>`):""}function Ve(){const e=te(),t=I();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${ie()}
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
          ${C(t,32)}
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
          ${ve()}
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
            ${ee()}
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
  `}function Ue(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");j(n||"map"),b()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{j("map"),b()})}function b(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Ve(),Ue(),H(),D(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsOverlay");o&&(o.innerHTML=ee(),D())};window.addEventListener("cbsgo:rerenderSteps",n),window.addEventListener("cbsgo:stepsChanged",n)}if(B()==="profile"&&Ke(),te()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",Te)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||E(o))return;const r=ae.find(i=>i.id===o);r&&ye(r)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const n=()=>{const o=document.querySelector("#mapMount");o&&(o.innerHTML=ie(),H())};window.addEventListener("cbsgo:rerenderMap",n),window.addEventListener("cbsgo:nodeCompleted",n)}}function se(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function k(e){const t=se();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";k(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{k(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function F(){try{if(!document.getElementById("app")){k("❌ #app not found in index.html");return}b();const t=se();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){k(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",F,{once:!0}):F();
