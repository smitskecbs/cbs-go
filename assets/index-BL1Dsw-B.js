(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const de=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],Y="cbsgo_state_v3";function ce(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function le(){return{xp:0,completed:{}}}function $(){const e=localStorage.getItem(Y);return ce(e,le())}function K(e){localStorage.setItem(Y,JSON.stringify(e))}function T(){return Number($().xp||0)}function V(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function pe(e){return Math.max(0,Number(e||0))%100}function W(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=$();return n.xp=Number(n.xp||0)+t,K(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function _(e){const t=String(e||"");return t?!!$().completed?.[t]:!1}function ue(e){const t=String(e||"");if(!t)return!1;const n=$();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),K(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function z(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function U(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function ge(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&L()}),document.body.appendChild(e),e)}function L(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function fe(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(U).filter(Boolean)}function be(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function ye(e){return e?.hint||e?.puzzle?.hint||""}function me(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function ve(e){const t=ge(),n=String(e?.id||""),o=_(n),r=be(e),i=ye(e),s=me(e),a=fe(e);t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${z(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${s} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${z(r)}</div>
        ${i?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${z(i)}</div>`:""}
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
  `;const d=t.querySelector("#cbsgoClose");if(d&&(d.onclick=L),o)return;const c=t.querySelector("#cbsgoMsg"),p=t.querySelector("#cbsgoAnswer"),O=t.querySelector("#cbsgoSubmit"),y=m=>{c&&(c.textContent=m||"")},R=()=>{if(!n)return;if(_(n)){y("✅ Already completed.");return}const m=U(p?.value||"");if(a.length===0){y("⚠️ This node has no answers configured yet.");return}if(!a.includes(m)){y("❌ Not correct. Try again.");return}if(!ue(n)){y("✅ Already completed.");return}W(s),y(`✅ Correct! +${s} XP`),setTimeout(()=>L(),550)};O&&(O.onclick=R),p&&(p.addEventListener("keydown",m=>{m.key==="Enter"&&R()}),setTimeout(()=>p.focus(),50))}function xe(){const e=T(),t=V(e),n=pe(e),o=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${o}%"></div>
      </div>
    </div>
  `}const Q="cbsgo_inventory_v1";function he(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function we(){return{tickets:0}}function N(){const e=localStorage.getItem(Q);return he(e,we())}function Se(e){localStorage.setItem(Q,JSON.stringify(e))}function Z(){return Number(N().tickets||0)}function ke(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return N();const n=N();return n.tickets=Number(n.tickets||0)+t,Se(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ee="cbsgo_steps_v4",$e="cbsgo_gps_autostart_v2";let h=null,A=!1,u={msg:"init"};function Me(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ze(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function b(){const e=localStorage.getItem(ee);return Me(e,ze())}function te(e){e.updatedAt=Date.now(),localStorage.setItem(ee,JSON.stringify(e))}function x(){return Number(b().steps||0)}function D(){return u}function Ae(e,t){const o=c=>c*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function _e(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,W(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ke(1))}function Le(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return b();const n=b();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/.75);return o>n.steps&&(n.steps=o),_e(n),te(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Ne(){h!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(h),h=null}async function j(e={}){const t=!!e.silent;if(!navigator.geolocation)return u={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem($e,"1")}catch{}Ne(),A=!0,u={msg:"requesting",t:Date.now()};const n=80;try{return h=navigator.geolocation.watchPosition(o=>{const r=o.coords.latitude,i=o.coords.longitude,s=o.coords.accuracy||999,a={lat:r,lng:i,t:Date.now()};if(s>n){u={msg:`low accuracy ${Math.round(s)}m`,acc:s,t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:x()}}));return}u={lat:r,lng:i,acc:s,t:Date.now()};const d=b(),c=d.lastPos;if(c&&typeof c.lat=="number"&&typeof c.lng=="number"){const p=Ae({lat:c.lat,lng:c.lng},{lat:r,lng:i});p>=6&&p<=90&&Le(p)}d.lastPos={lat:r,lng:i,t:Date.now()},te(d),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:x()}}))},o=>{A=!1,u={err:o?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:x()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return A=!1,u={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function C(e){const t=Number(e||0);return Number.isFinite(t)?t:0}function Ce(){return typeof x=="function"?C(x()):typeof b=="function"?C(b()?.steps):0}function Ee(){try{if(typeof D!="function")return"";const e=D();return e?.err?"🔴":e?.lat?"🟢":"🟡"}catch{return""}}function Pe(){try{typeof j=="function"&&j()}catch{}}function ne(){const e=Ce(),t=C(Z?.()??0);return`
    <div style="
      display:flex;
      align-items:center;
      gap:10px;
      font-size:12px;
      opacity:.92;
      white-space:nowrap;
    ">
      <span style="opacity:.85;">${Ee()}</span>
      <span class="pill" style="padding:6px 10px;">👟 <b>${e}</b></span>
      <span class="pill" style="padding:6px 10px;">🎟 <b>${t}</b></span>
    </div>
  `}function oe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Te(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const E="cbsgo_leaderboard_v2",re="cbsgo_player_name_v2",I="cbsgo_player_avatar_v2";function ie(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function Ie(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function q(){try{return localStorage.getItem(re)||"Sovereign"}catch{return"Sovereign"}}function qe(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(re,t)}catch{}return t}function M(){try{return localStorage.getItem(I)||""}catch{return""}}function Be(e){const t=String(e||"");try{localStorage.setItem(I,t)}catch{}return t}function Oe(){try{localStorage.removeItem(I)}catch{}}function Re(e=10){const t=ie(E,[]);return Array.isArray(t)?t.slice(0,e):[]}function De(){const e=q(),t=M(),n=T(),o=V(n),r=ie(E,[]),i=Array.isArray(r)?r:[],s=i.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((a,d)=>Number(d.xp||0)-Number(a.xp||0)),Ie(E,i),{name:e,xp:n,level:o,avatar:t}}let l=null,v=null;function w(e){return document.getElementById(e)}function g(e){const t=w("cbsgoMapHost");if(!t)return;let n=w("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function se(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function je(){try{l&&(l.remove(),l=null,v=null)}catch{}}function H(e){const t=M(),o=((q()||"You").trim()[0]||"Y").toUpperCase();if(t){const i=`
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
  `;return e.divIcon({html:r,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function He(){const e=window.L,t=w("cbsgoMap");return!e||!t?!1:(je(),l=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(l),l.setView([51.687,4.87],16),!0)}function Fe(){!navigator.geolocation||!l||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r=window.L,i=[t,n];if(v){v.setLatLng(i);try{const s=H(r);v.setIcon(s)}catch{}}else{const s=H(r);v=r.marker(i,{icon:s}).addTo(l),l.setView(i,18)}g(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{g(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function F(){let e=0;const t=80,n=()=>{if(e++,!w("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(g("Loading map engine…"),e<t)return setTimeout(n,100);g("Map engine failed to load (Leaflet not found). Refresh.");return}if(!He()){g("Could not init map. Refresh.");return}g("Loading GPS…"),Fe()};n()}function S(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function P(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function B(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function G(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Ge(){const e=B(),t=(n,o,r)=>`
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
  `}function Xe(){const e=Re(10),t=q(),n=M();return`
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
              Local only (this browser).
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
  `}function Je(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=a=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=a||"")};e&&i(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const a=qe(e.value);i(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(s,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const d=new FileReader;d.onload=()=>{Be(String(d.result||"")),i("✅ Photo saved"),f()},d.onerror=()=>i("⛔ Failed to read image."),d.readAsDataURL(a)}),o&&(o.onclick=()=>{Oe(),i("✅ Photo removed"),f()}),t&&(t.onclick=()=>{e&&s();const a=De();i(`✅ Saved: ${a.name} – ${a.xp} XP`),f()})}function Ye(){return`
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
        <div class="pill">🎟 Tickets: <b>${Z()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Ke(){const e=B();return e==="profile"?X("Profile",`<div id="lbMount">${Xe()}</div>`):e==="bag"?X("Bag",`<div id="bagMount">${Ye()}</div>`):""}function Ve(){const e=oe(),t=M();return`
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
          <div style="display:flex; align-items:center; gap:10px;">
            <div>${xe()}</div>
            <div id="stepsTopbar">${ne()}</div>
          </div>
        </div>
      </header>

      ${Ge()}
      ${Ke()}

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
  `}function We(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");G(n||"map"),f()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{G("map"),f()})}function f(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Ve(),We(),F(),Pe(),B()==="profile"&&Je(),oe()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",Te)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||_(o))return;const r=de.find(i=>i.id===o);r&&ve(r)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const n=()=>{const o=document.querySelector("#mapMount");o&&(o.innerHTML=se(),F())};window.addEventListener("cbsgo:rerenderMap",n),window.addEventListener("cbsgo:nodeCompleted",n)}if(!window.__cbsgo_steps_topbar_listener){window.__cbsgo_steps_topbar_listener=!0;const n=()=>{const o=document.querySelector("#stepsTopbar");o&&(o.innerHTML=ne())};window.addEventListener("cbsgo:stepsChanged",n),window.addEventListener("cbsgo:rerenderSteps",n)}}function ae(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function k(e){const t=ae();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";k(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{k(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function J(){try{if(!document.getElementById("app")){k("❌ #app not found in index.html");return}f();const t=ae();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){k(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",J,{once:!0}):J();
