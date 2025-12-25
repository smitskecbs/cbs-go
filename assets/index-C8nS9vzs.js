(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const ee="cbsgo_state_v6";function ge(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function fe(){return{xp:0,completed:{},updatedAt:Date.now()}}function z(){const e=localStorage.getItem(ee);return ge(e,fe())}function be(e){e.updatedAt=Date.now(),localStorage.setItem(ee,JSON.stringify(e))}function te(e){return 100+(Math.max(1,Number(e||1))-1)*40}function $(){return Number(z().xp||0)}function j(){const e=$();let t=1,n=e;for(;;){const o=te(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function me(){const e=$();let t=1,n=e;for(;;){const o=te(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function ye(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return z();const n=z();return n.xp=Number(n.xp||0)+t,be(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:j()}})),n}function J(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function xe(){const e=Number($()||0),t=Number(j()||1),n=Number(me()||0),o=J(n,0,100),r=J(o/100*100,0,100);return`
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
  `}const ne="cbsgo_inventory_v1";function ve(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function we(){return{tickets:0}}function B(){const e=localStorage.getItem(ne);return ve(e,we())}function he(e){localStorage.setItem(ne,JSON.stringify(e))}function oe(){return Number(B().tickets||0)}function Se(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return B();const n=B();return n.tickets=Number(n.tickets||0)+t,he(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const re="cbsgo_steps_v7",ie="cbsgo_gps_autostart_v3";let E=null,W=!1,g={msg:"init"};function S(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function R(){try{const e=localStorage.getItem(re);if(!e)return S();const t=JSON.parse(e);return!t||typeof t!="object"?S():{...S(),...t}}catch{return S()}}function se(e){e.updatedAt=Date.now(),localStorage.setItem(re,JSON.stringify(e))}function v(){const e=R();return Number(e.steps||0)}function I(){return!!W}function ke(){return g}function Ee(e,t){const o=d=>d*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),a=o(e.lat),s=o(t.lat),l=Math.sin(r/2)**2+Math.cos(a)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}function Ie(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,ye(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,Se(1))}function Ne(e){const t=R(),n=Number(e||0);if(!Number.isFinite(n)||n<=0)return t;t.meters=Number(t.meters||0)+n;const o=Math.floor(t.meters/.7);return o>t.steps&&(t.steps=o),Ie(t),se(t),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:t.steps}})),t}function _e(){E!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(E),E=null}async function X(e={}){const t=!!e.silent;if(!navigator.geolocation)return g={err:"GPS not supported",t:Date.now()},t||console.warn("CBS GO: GPS not supported"),{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(ie,"1")}catch{}_e(),W=!0,g={msg:"requesting",t:Date.now()};const n=100,o=1,r=250,i=5;return E=navigator.geolocation.watchPosition(a=>{const s=a.coords.latitude,l=a.coords.longitude,d=a.coords.accuracy||999,p=Date.now();window.dispatchEvent(new CustomEvent("cbsgo:gps",{detail:{lat:s,lng:l,acc:d}}));const P=R(),b=P.lastPos;if(g={lat:s,lng:l,acc:d,t:p,reason:"",dist:0,added:0,speed:0},P.lastPos={lat:s,lng:l,t:p},se(P),d>n){g.reason="accuracy too low",window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:v()}}));return}if(b&&typeof b.lat=="number"&&typeof b.lng=="number"){const m=Ee({lat:b.lat,lng:b.lng},{lat:s,lng:l}),ue=(p-b.t)/1e3||1,K=m/ue;g.dist=m,g.speed=K,m>=o&&m<=r&&K<=i?(g.added=m,Ne(m)):(g.reason="filtered",window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:v()}})))}else window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:v()}}))},a=>{W=!1,g={err:a?.message||"GPS blocked",t:Date.now()},t||console.warn("CBS GO: GPS error",a),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:v()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}function Me(){try{return localStorage.getItem(ie)==="1"}catch{return!1}}function Ce(){if(typeof window>"u"||window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>I()||Me()&&await X({silent:!0}))();const t=async()=>{I()||await X({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function $e(){const e=ke()||{};return e.err?"🔴":e.lat&&I()?"🟢":I()?"🟡":"⚪"}function ae(){const e=v(),t=oe();return`
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
      <span style="opacity:.9;">${$e()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function le(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Le(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const T="cbsgo_leaderboard_v2",de="cbsgo_player_name_v2",D="cbsgo_player_avatar_v2";function ce(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function Pe(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function F(){try{return localStorage.getItem(de)||"Sovereign"}catch{return"Sovereign"}}function Ae(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(de,t)}catch{}return t}function G(){try{return localStorage.getItem(D)||""}catch{return""}}function ze(e){const t=String(e||"");try{localStorage.setItem(D,t)}catch{}return t}function Be(){try{localStorage.removeItem(D)}catch{}}function We(e=10){const t=ce(T,[]);return Array.isArray(t)?t.slice(0,e):[]}function Te(){const e=F(),t=G(),n=$(),o=j(),r=ce(T,[]),i=Array.isArray(r)?r:[],a=i.find(s=>s.name===e);return a?(a.xp=n,a.level=o,a.avatar=t,a.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((s,l)=>Number(l.xp||0)-Number(s.xp||0)),Pe(T,i),{name:e,xp:n,level:o,avatar:t}}let c=null,w=null,u=null,N=!0;function _(e){return document.getElementById(e)}function y(e){const t=_("cbsgoMapHost");if(!t)return;let n=_("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="6000",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Oe(){const e=String(F()||"").trim();return e?e[0].toUpperCase():"🙂"}function je(e){const t=G();if(t){const r=`
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
    ">${Oe()}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[42,42],iconAnchor:[21,21]})}function Re(){return`
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
  `}function De(){try{c&&(c.remove(),c=null,w=null)}catch{}}function Fe(){const e=window.L,t=_("cbsgoMap");return!e||!t?!1:(De(),c=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(c),c.setView([51.687,4.87],15),c.on("dragstart",()=>{N=!1}),c.on("zoomstart",()=>{N=!1}),!0)}function A(e,t){if(!c||!window.L)return;const n=window.L,o=je(n);if(w?(w.setIcon(o),w.setLatLng([e,t])):w=n.marker([e,t],{icon:o}).addTo(c),N){const r=c.getZoom()||15,i=Math.max(r,16);c.setView([e,t],i,{animate:!0})}}function Ge(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function Ue(){let e=0;const t=80,n=()=>{if(e++,!_("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(y("Loading map engine…"),e<t)return setTimeout(n,100);y("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Fe()){y("Could not init map. Refresh.");return}u||(u={lat:51.687,lng:4.87,acc:null},A(u.lat,u.lng)),y("Waiting for GPS…"),Ge();const r=document.getElementById("cbsgoRecenterBtn");r&&(r.onclick=()=>{if(N=!0,u&&c){const{lat:a,lng:s}=u,l=c.getZoom()||15,d=Math.max(l,16);c.setView([a,s],d,{animate:!0})}});const i=a=>{const s=a?.detail||{},l=Number(s.lat),d=Number(s.lng),p=Number(s.acc);!Number.isFinite(l)||!Number.isFinite(d)||(u={lat:l,lng:d,acc:p},A(l,d),Number.isFinite(p)?y(`GPS • ±${Math.round(p)}m`):y("GPS active"))};window.addEventListener("cbsgo:gps",i),u&&A(u.lat,u.lng)};n()}const U="cbsgo_wallet_v2",L="cbsgo_wallet_unlocked_v2";function h(){try{const e=localStorage.getItem(U);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function qe(e){localStorage.setItem(U,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function He(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function Ke(){return!!h()}function Je(){return h()?sessionStorage.getItem(L)==="1":!1}function Xe(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");h()&&console.warn("CBS GO: overwriting existing wallet");const o=He();return qe({pk:o,pin:t}),sessionStorage.setItem(L,"1"),o}function Ye(e){const t=h();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(L,"1"),t.pk}function q(){const e=h();return e?e.pk:""}function Ve(){localStorage.removeItem(U),sessionStorage.removeItem(L)}typeof window<"u"&&(window.cbsgoDevResetWallet=Ve);function Ze(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function O(e){return e?e.length<=10?e:e.slice(0,4)+"…"+e.slice(-4):""}function k(){const e=document.getElementById("cbsgoWalletModal");e&&e.parentNode&&e.parentNode.removeChild(e)}function f(e){const t=document.getElementById("cbsgoWalletMsg");t&&(t.textContent=e||"")}function Qe(){return`
    <div id="cbsgoWalletModal" style="
      position:fixed;
      inset:0;
      z-index:9999;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:16px;
      background:rgba(0,0,0,.72);
      backdrop-filter:blur(8px);
    ">
      <div style="
        width:100%;
        max-width:420px;
        border-radius:18px;
        border:1px solid rgba(255,255,255,.18);
        background:rgba(10,12,18,.96);
        color:#fff;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        box-shadow:0 18px 60px rgba(0,0,0,.65);
        padding:16px 18px 14px;
      ">
        <h2 style="margin:0 0 4px; font-size:18px;">CBS GO Wallet</h2>
        <p style="margin:0 0 10px; font-size:13px; opacity:.85;">
          We maken een lokale CBS GO wallet voor je. 
          Kies een <b>PIN</b> (min. 4 cijfers). Deze wordt alleen op dit apparaat gebruikt.
        </p>

        <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
          <label style="font-size:12px; opacity:.9;">
            PIN
            <input id="cbsgoPin1" type="password" inputmode="numeric" autocomplete="off" style="
              width:100%;
              margin-top:4px;
              padding:8px 10px;
              border-radius:10px;
              border:1px solid rgba(255,255,255,.20);
              background:rgba(0,0,0,.40);
              color:#fff;
            " />
          </label>

          <label style="font-size:12px; opacity:.9;">
            Confirm PIN
            <input id="cbsgoPin2" type="password" inputmode="numeric" autocomplete="off" style="
              width:100%;
              margin-top:4px;
              padding:8px 10px;
              border-radius:10px;
              border:1px solid rgba(255,255,255,.20);
              background:rgba(0,0,0,.40);
              color:#fff;
            " />
          </label>
        </div>

        <div id="cbsgoWalletMsg" style="margin-top:8px; font-size:12px; min-height:16px;"></div>

        <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:10px;">
          <button id="cbsgoWalletCancel" type="button" style="
            padding:8px 10px;
            border-radius:10px;
            border:0;
            background:rgba(255,255,255,.08);
            color:#fff;
            font-size:13px;
          ">Later</button>
          <button id="cbsgoWalletCreate" type="button" style="
            padding:8px 12px;
            border-radius:10px;
            border:0;
            background:linear-gradient(135deg,#22c55e,#16a34a);
            color:#020617;
            font-size:13px;
            font-weight:700;
          ">Create wallet</button>
        </div>
      </div>
    </div>
  `}function et(e){return`
    <div id="cbsgoWalletModal" style="
      position:fixed;
      inset:0;
      z-index:9999;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:16px;
      background:rgba(0,0,0,.72);
      backdrop-filter:blur(8px);
    ">
      <div style="
        width:100%;
        max-width:420px;
        border-radius:18px;
        border:1px solid rgba(255,255,255,.18);
        background:rgba(10,12,18,.96);
        color:#fff;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        box-shadow:0 18px 60px rgba(0,0,0,.65);
        padding:16px 18px 14px;
      ">
        <h2 style="margin:0 0 4px; font-size:18px;">CBS GO Wallet</h2>
        <p style="margin:0 0 6px; font-size:13px; opacity:.85;">
          Voer je PIN in om je lokale wallet te ontgrendelen.
        </p>
        <p style="margin:0 0 10px; font-size:12px; opacity:.75;">
          Address: <span style="font-family:monospace;">${Ze(O(e||""))}</span>
        </p>

        <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
          <label style="font-size:12px; opacity:.9;">
            PIN
            <input id="cbsgoPinUnlock" type="password" inputmode="numeric" autocomplete="off" style="
              width:100%;
              margin-top:4px;
              padding:8px 10px;
              border-radius:10px;
              border:1px solid rgba(255,255,255,.20);
              background:rgba(0,0,0,.40);
              color:#fff;
            " />
          </label>
        </div>

        <div id="cbsgoWalletMsg" style="margin-top:8px; font-size:12px; min-height:16px;"></div>

        <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:10px;">
          <button id="cbsgoWalletLater" type="button" style="
            padding:8px 10px;
            border-radius:10px;
            border:0;
            background:rgba(255,255,255,.08);
            color:#fff;
            font-size:13px;
          ">Later</button>
          <button id="cbsgoWalletUnlockBtn" type="button" style="
            padding:8px 12px;
            border-radius:10px;
            border:0;
            background:linear-gradient(135deg,#22c55e,#16a34a);
            color:#020617;
            font-size:13px;
            font-weight:700;
          ">Unlock</button>
        </div>
      </div>
    </div>
  `}function tt(){if(typeof window>"u")return;if(Je()){window.__cbsgo_wallet_checked=!0;return}if(window.__cbsgo_wallet_checked)return;window.__cbsgo_wallet_checked=!0;const e=document.body||document.documentElement;if(!e)return;const t=Ke(),n=t?et(q()):Qe(),o=document.createElement("div");if(o.innerHTML=n,e.appendChild(o.firstElementChild),t){const r=document.getElementById("cbsgoPinUnlock"),i=document.getElementById("cbsgoWalletUnlockBtn"),a=document.getElementById("cbsgoWalletLater");a&&(a.onclick=()=>{k()});const s=()=>{const l=r?.value||"";if(l.length<1){f("Enter your PIN.");return}try{const d=Ye(l);f(`✅ Unlocked: ${O(d)}`),setTimeout(()=>{k()},400)}catch(d){console.error(d),f("Incorrect PIN.")}};i&&(i.onclick=s),r&&(r.addEventListener("keyup",l=>{l.key==="Enter"&&s()}),r.focus())}else{const r=document.getElementById("cbsgoPin1"),i=document.getElementById("cbsgoPin2"),a=document.getElementById("cbsgoWalletCreate"),s=document.getElementById("cbsgoWalletCancel");s&&(s.onclick=()=>{k()}),a&&(a.onclick=()=>{const l=r?.value||"",d=i?.value||"";if(l.length<4){f("PIN too short (min. 4 digits).");return}if(l!==d){f("PINs do not match.");return}try{const p=Xe(l);f(`✅ Wallet created: ${O(p)}`),setTimeout(()=>{k()},600)}catch(p){console.error(p),f("Failed to create wallet.")}})}}function M(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function H(){try{return sessionStorage.getItem("cbsgo_selected_tab_v6")||"map"}catch{return"map"}}function Y(e){try{sessionStorage.setItem("cbsgo_selected_tab_v6",e)}catch{}}function nt(){const e=H(),t=(n,o,r)=>{const i=e===n;return`
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
      " title="${M(o)}">
        ${r}
      </button>
    `};return`
    <nav style="
      position:fixed;
      left:12px;
      /* iets lager gezet zodat het niet over de ⌖-knop valt */
      top:calc(150px + env(safe-area-inset-top));
      z-index:5500;
      display:flex;
      flex-direction:column;
      gap:10px;
    ">
      ${e==="map"?"":t("map","Map","🗺️")}
      ${t("profile","Profile","👤")}
      ${t("bag","Bag","🎒")}
    </nav>
  `}function V(e,t){return`
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
          <div style="font-weight:900;">${M(e)}</div>
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
  `}function Z(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function ot(){const e=We(10),t=F(),n=G();return`
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
          ${Z(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${M(t)}" maxlength="24" style="
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
                      ${Z(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${M(o.name)}
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
  `}function rt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=s=>{const l=document.querySelector("#lbMsg");l&&(l.textContent=s||"")};e&&i(`✅ Profile loaded: ${e.value}`);const a=()=>{if(!e)return;const s=Ae(e.value);i(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(a,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),a()})),n&&n.addEventListener("change",()=>{const s=n.files&&n.files[0];if(!s)return;if(s.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const l=new FileReader;l.onload=()=>{ze(String(l.result||"")),i("✅ Photo saved"),x()},l.onerror=()=>i("⛔ Failed to read image."),l.readAsDataURL(s)}),o&&(o.onclick=()=>{Be(),i("✅ Photo removed"),x()}),t&&(t.onclick=()=>{e&&a();const s=Te();i(`✅ Saved: ${s.name} – ${s.xp} XP`),x()})}function it(){const e=oe(),t=q();return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${e}</b></div>
      </div>

      <div style="margin-top:16px;">
        <div style="font-weight:900; font-size:14px;">CBS-GO Wallet</div>
        <div style="opacity:.8; font-size:12px; margin-top:4px; word-break:break-all;">
          ${t||"No wallet yet (will be created when you log in)."}
        </div>

        ${t?'<button id="copyAddr" class="btn secondary" style="margin-top:8px;">Copy address</button>':""}
      </div>
    </div>
  `}function st(){const e=H();return e==="profile"?V("Profile",`<div id="lbMount">${ot()}</div>`):e==="bag"?V("Bag",`<div id="bagMount">${it()}</div>`):""}function at(){const e=le();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Re()}
      </div>

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
            ${xe()}
          </div>

          <div id="stepsMount">
            ${ae()}
          </div>
        </div>
      </header>

      ${nt()}
      ${st()}

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
  `}function lt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");Y(n||"map"),x()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{Y("map"),x()})}function x(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=at(),lt(),Ue(),Ce(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=ae())};window.addEventListener("cbsgo:stepsChanged",n)}H()==="profile"&&rt();const t=document.querySelector("#copyAddr");if(t&&(t.onclick=()=>{const n=q();if(n)try{navigator.clipboard.writeText(n),alert("Wallet address copied 👍")}catch{alert("Could not copy address")}}),le()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",Le)}tt()}function pe(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function C(e){const t=pe();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";C(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{C(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Q(){try{if(!document.getElementById("app")){C("❌ #app not found in index.html");return}x();const t=pe();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){C(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Q,{once:!0}):Q();
