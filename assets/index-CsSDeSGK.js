(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const V="cbsgo_state_v3";function pt(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function ut(){return{xp:0,completed:{}}}function h(){const t=localStorage.getItem(V);return pt(t,ut())}function W(t){localStorage.setItem(V,JSON.stringify(t))}function L(){return Number(h().xp||0)}function R(t){const e=Math.max(0,Number(t||0));return Math.floor(e/100)+1}function gt(t){return Math.max(0,Number(t||0))%100}function U(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return L();const n=h();return n.xp=Number(n.xp||0)+e,W(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:e}})),n.xp}function z(t){const e=String(t||"");return e?!!h().completed?.[e]:!1}function ft(t){const e=String(t||"");if(!e)return!1;const n=h();return n.completed?.[e]?!1:(n.completed[e]=Date.now(),W(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:e}})),!0)}function Z(){const t=L(),e=R(t),n=gt(t),r=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${e}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${r}%"></div>
      </div>
    </div>
  `}function Q(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function mt(){try{const t=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>localStorage.removeItem(e))}catch{}try{const t=[];for(let e=0;e<sessionStorage.length;e++){const n=sessionStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>sessionStorage.removeItem(e))}catch{}window.location.reload()}const I="cbsgo_leaderboard_v2",tt="cbsgo_player_name_v2",G="cbsgo_player_avatar_v2";function et(t,e){try{const n=localStorage.getItem(t);return n?JSON.parse(n):e}catch{return e}}function yt(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function F(){try{return localStorage.getItem(tt)||"Sovereign"}catch{return"Sovereign"}}function bt(t){const e=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(tt,e)}catch{}return e}function w(){try{return localStorage.getItem(G)||""}catch{return""}}function vt(t){const e=String(t||"");try{localStorage.setItem(G,e)}catch{}return e}function xt(){try{localStorage.removeItem(G)}catch{}}function ht(t=10){const e=et(I,[]);return Array.isArray(e)?e.slice(0,t):[]}function wt(){const t=F(),e=w(),n=L(),r=R(n),o=et(I,[]),i=Array.isArray(o)?o:[],s=i.find(a=>a.name===t);return s?(s.xp=n,s.level=r,s.avatar=e,s.t=Date.now()):i.push({name:t,xp:n,level:r,avatar:e,t:Date.now()}),i.sort((a,c)=>Number(c.xp||0)-Number(a.xp||0)),yt(I,i),{name:t,xp:n,level:r,avatar:e}}const St=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}];function N(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function nt(t){return String(t||"").toLowerCase().trim().replace(/\s+/g," ")}function kt(){let t=document.querySelector("#cbsgoModal");return t||(t=document.createElement("div"),t.id="cbsgoModal",t.style.position="fixed",t.style.inset="0",t.style.zIndex="9999",t.style.display="none",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="18px",t.style.background="rgba(0,0,0,.55)",t.addEventListener("click",e=>{e.target===t&&E()}),document.body.appendChild(t),t)}function E(){const t=document.querySelector("#cbsgoModal");t&&(t.style.display="none",t.innerHTML="")}function $t(t){return(Array.isArray(t?.answers)?t.answers:t?.answer?[t.answer]:[]).map(nt).filter(Boolean)}function Mt(t){return t?.question||t?.puzzle?.question||`Solve the node: ${t?.name||""}`}function _t(t){return t?.hint||t?.puzzle?.hint||""}function Lt(t){const e=Number(t?.xp??t?.rewardXp??50);return Number.isFinite(e)?e:50}function At(t){const e=kt(),n=String(t?.id||""),r=z(n),o=Mt(t),i=_t(t),s=Lt(t),a=$t(t);e.style.display="flex",e.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${N(t?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${s} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${N(o)}</div>
        ${i?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${N(i)}</div>`:""}
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
  `;const c=e.querySelector("#cbsgoClose");if(c&&(c.onclick=E),r)return;const l=e.querySelector("#cbsgoMsg"),m=e.querySelector("#cbsgoAnswer"),g=e.querySelector("#cbsgoSubmit"),p=u=>{l&&(l.textContent=u||"")},f=()=>{if(!n)return;if(z(n)){p("✅ Already completed.");return}const u=nt(m?.value||"");if(a.length===0){p("⚠️ This node has no answers configured yet.");return}if(!a.includes(u)){p("❌ Not correct. Try again.");return}if(!ft(n)){p("✅ Already completed.");return}U(s),p(`✅ Correct! +${s} XP`),setTimeout(()=>E(),550)};g&&(g.onclick=f),m&&(m.addEventListener("keydown",u=>{u.key==="Enter"&&f()}),setTimeout(()=>m.focus(),50))}const ot="cbsgo_inventory_v1";function Nt(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function zt(){return{tickets:0,fireworks:0,chests:0}}function P(){const t=localStorage.getItem(ot);return Nt(t,zt())}function It(t){localStorage.setItem(ot,JSON.stringify(t))}function Et(){return P()}function Pt(t){const e=Number(t);if(!Number.isFinite(e)||e===0)return P();const n=P();return n.tickets=Math.max(0,Number(n.tickets||0)+e),It(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{inv:n}})),n}const rt="cbsgo_steps_v1";function Tt(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function qt(){return{steps:0,meters:0,last5kAwardAt:0,last10kAwardAt:0}}function M(){const t=localStorage.getItem(rt);return Tt(t,qt())}function Ct(t){localStorage.setItem(rt,JSON.stringify(t))}const Ot=.78;function Bt(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return M();const n=M();n.meters=Number(n.meters||0)+e;const r=Math.floor(e/Ot);r>0&&(n.steps=Number(n.steps||0)+r);const o=Number(n.steps||0),i=Math.floor(o/5e3)*5e3;if(i>=5e3&&i>Number(n.last5kAwardAt||0)){for(let a=Number(n.last5kAwardAt||0)+5e3;a<=i;a+=5e3)U(20);n.last5kAwardAt=i}const s=Math.floor(o/1e4)*1e4;if(s>=1e4&&s>Number(n.last10kAwardAt||0)){for(let a=Number(n.last10kAwardAt||0)+1e4;a<=s;a+=1e4)Pt(1);n.last10kAwardAt=s}return Ct(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps,meters:n.meters}})),n}const T="cbsgo_last_pos_v3",q="cbsgo_nodes_pos_v2",it="cbsgo_gps_autostart_v1",st="cbsgo_follow_me_v1";function A(t,e){try{const n=localStorage.getItem(t);return n?JSON.parse(n):e}catch{return e}}function at(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Rt(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function J(t,e){const r=l=>l*Math.PI/180,o=r(e.lat-t.lat),i=r(e.lng-t.lng),s=r(t.lat),a=r(e.lat),c=Math.sin(o/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(c))}let d=null,k=null,$=null,x=null,b=null;function j(){const t=window.L;return t&&typeof t.map=="function"?t:null}function ct(){$!=null&&navigator.geolocation&&navigator.geolocation.clearWatch($),$=null}function D(){try{const t=localStorage.getItem(st);return t==null?!0:t==="1"}catch{return!0}}function C(t){try{localStorage.setItem(st,t?"1":"0")}catch{}}function lt(){return St.filter(t=>t.type!=="group"&&!z(t.id))}function Gt(t){const e=A(q,null);if(e&&e.seed&&e.posById)return e;const n=lt(),r={},o=[],i=90,s=160,a=420,c=4e3;function l(p,f,u){const S=f*Math.cos(u)/111111,y=f*Math.sin(u)/(111111*Math.cos(p*Math.PI/180));return{dLat:S,dLng:y}}let m=0;for(const p of n){let f=!1;for(;!f&&m<c;){m++;const u=s+Math.random()*(a-s),S=Math.random()*Math.PI*2,y=l(t.lat,u,S),Y={lat:t.lat+y.dLat,lng:t.lng+y.dLng};f=o.every(dt=>J(dt,Y)>=i),f&&(o.push(Y),r[p.id]={dLat:y.dLat,dLng:y.dLng})}if(!r[p.id]){const u=l(t.lat,s,Math.random()*Math.PI*2);r[p.id]={dLat:u.dLat,dLng:u.dLng}}}const g={seed:t,posById:r,createdAt:Date.now()};return at(q,g),g}function Ft(t,e){const n=A(q,null),r=n?.seed||e,o=n?.posById?.[t.id];return!r||!o?null:{lat:r.lat+o.dLat,lng:r.lng+o.dLng}}function K(t){const e=document.querySelector("#nearInfo");e&&(e.textContent=t||"")}function Jt(t){const e=w();if(!e)return null;const n=`
    <div style="
      width:42px;height:42px;border-radius:999px;
      border:2px solid rgba(255,255,255,.95);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background-image:url('${e}');
      background-size:cover;
      background-position:center;
    "></div>
  `;return t.divIcon({html:n,className:"",iconSize:[42,42],iconAnchor:[21,21]})}function jt(){const t=F()||"You",e=w(),n=D()?"Following ✅":"Free look 👀",r=M().steps||0;return`
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
          <div style="opacity:.75; font-size:13px;">${Rt(t)}</div>
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
  `}function Dt(t){const e=j();if(!e||!d)return;k||(k=e.layerGroup().addTo(d)),k.clearLayers();const n=lt(),r=Gt(t),o=[];for(const s of n){const a=Ft(s,r.seed);if(!a)continue;const c=Math.round(J(t,a));c>1200||o.push({node:s,ll:a,dist:c})}o.sort((s,a)=>s.dist-a.dist),o.length===0?K("No nodes nearby (walk a bit)."):K(`Nearest: ${o[0].node.name} • ${o[0].dist}m • Visible: ${o.length} (must be close to open)`);const i=60;o.forEach(({node:s,ll:a,dist:c})=>{const l=e.circleMarker([a.lat,a.lng],{radius:11,weight:2});l.bindTooltip(`${s.name} • ${c}m`,{direction:"top",offset:[0,-10]}),l.on("click",()=>{if(c>i){alert(`Too far.

Go closer to open:
${s.name}
Distance: ${c}m
Required: ≤ ${i}m`);return}At(s)}),l.addTo(k)})}function Xt(t){const e=j();return e?(d?setTimeout(()=>d.invalidateSize(),80):(d=e.map(t,{zoomControl:!0}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap"}).addTo(d),d.setView([51.687,4.867],16),d.on("dragstart",()=>{C(!1);const n=document.querySelector("#followBtn");n&&(n.textContent="Free look 👀")}),d.on("zoomstart",()=>{C(!1);const n=document.querySelector("#followBtn");n&&(n.textContent="Free look 👀")})),!0):!1}function O(){const t=document.querySelector("#stepsLine");if(!t)return;const e=M();t.innerHTML=`Steps: <b>${Number(e.steps||0)}</b>`}function H(t){if(!navigator.geolocation){t("❌ GPS not supported.");return}try{localStorage.setItem(it,"1")}catch{}t("Requesting GPS…");const e=80;ct(),$=navigator.geolocation.watchPosition(n=>{const r=n.coords.latitude,o=n.coords.longitude,i=n.coords.accuracy||999;if(i>e){t(`GPS OK but accuracy low (${Math.round(i)}m). Move outside.`);return}t(`✅ GPS active (±${Math.round(i)}m)`);const s={lat:r,lng:o},a=j();if(a&&d){const l=Jt(a);l&&(!b||JSON.stringify(b?.options)!==JSON.stringify(l?.options))&&(b=l,x&&x.setIcon(b)),x?x.setLatLng([r,o]):x=b?a.marker([r,o],{icon:b}).addTo(d):a.circleMarker([r,o],{radius:8,weight:2}).addTo(d)}d&&D()&&d.setView([r,o],Math.max(d.getZoom(),17),{animate:!0});const c=A(T,null);if(c){const l=J(c,s);l>=6&&l<=90&&(Bt(l),O())}at(T,s),Dt(s)},n=>{t(`❌ GPS blocked: ${n?.message||"error"}`)},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3})}function Yt(){const t=document.querySelector("#mapMount")||document,e=t.querySelector("#leafletMap"),n=t.querySelector("#gpsStartBtn"),r=t.querySelector("#gpsStopBtn"),o=t.querySelector("#gpsStatus"),i=t.querySelector("#followBtn");if(!e)return;const s=l=>{o&&(o.textContent=l||"")};let a=0;const c=()=>{if(a++,!Xt(e)){s("Loading map engine…"),a<30?setTimeout(c,150):s("❌ Leaflet not loaded. Check index.html CDN.");return}s("Map ready. Enable GPS."),i&&(i.onclick=()=>{const g=!D();if(C(g),i.textContent=g?"Following ✅":"Free look 👀",g&&d){const p=A(T,null);p&&d.setView([p.lat,p.lng],Math.max(d.getZoom(),17),{animate:!0})}}),n&&(n.onclick=()=>H(s)),r&&(r.onclick=()=>{ct(),s("GPS stopped.")}),O(),(()=>{try{return localStorage.getItem(it)==="1"}catch{return!1}})()&&H(s),window.__cbsgo_steps_listener_v1||(window.__cbsgo_steps_listener_v1=!0,window.addEventListener("cbsgo:stepsChanged",O))};c()}function Kt(){return jt()}function Ht(){return Yt()}function B(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function X(t,e=30){const n=t?`background-image:url('${t}');`:"";return`
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
  `}function _(){try{return sessionStorage.getItem("cbsgo_selected_tab_v2")||"map"}catch{return"map"}}function Vt(t){try{sessionStorage.setItem("cbsgo_selected_tab_v2",t)}catch{}}function Wt(){const t=_(),e=(n,r)=>`
    <button class="btn secondary" type="button"
      data-tab="${n}"
      style="opacity:${t===n?"1":".75"};">
      ${r}
    </button>
  `;return`
    <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:10px;">
      ${e("map","Map")}
      ${e("profile","Profile")}
      ${e("bag","Bag")}
    </div>
  `}function Ut(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-tab");Vt(e),v()})})}function Zt(){const t=ht(10);return`
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
        ${t.length===0?'<div style="opacity:.75; font-size:13px;">No scores yet. Click “Save my score”.</div>':`
              <ol style="margin:0; padding-left:18px;">
                ${t.map((e,n)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${n+1}</div>
                      ${X(e.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${B(e.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">Level ${Number(e.level||1)}</div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">${Number(e.xp||0)} XP</div>
                  </li>
                `).join("")}
              </ol>
            `}
      </div>
    </section>
  `}function Qt(){const t=F(),e=w(),n=L(),r=R(n),o=h(),i=o?.completed?Object.keys(o.completed).length:0;return`
    <section style="
      margin-top:14px;
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.03);
    ">
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        ${X(e,56)}
        <div style="flex:1; min-width:220px;">
          <div style="font-size:18px; font-weight:900;">${B(t)}</div>
          <div style="opacity:.8; margin-top:2px;">Level <b>${r}</b> • Total XP <b>${n}</b></div>
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
          <input id="pfName" value="${B(t)}" maxlength="24" style="
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

      ${Zt()}
    </section>
  `}function te(){const t=document.querySelector("#pfName"),e=document.querySelector("#pfSaveScore"),n=document.querySelector("#pfAvatar"),r=document.querySelector("#pfRemoveAvatar"),o=document.querySelector("#pfMsg"),i=a=>{o&&(o.textContent=a||"")},s=()=>{if(!t)return;const a=bt(t.value);i(`✅ Name saved: ${a}`)};t&&(t.addEventListener("blur",s),t.addEventListener("keydown",a=>{a.key==="Enter"&&s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){i("❌ Image too large (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const c=new FileReader;c.onload=()=>{vt(String(c.result||"")),i("✅ Photo saved"),v()},c.onerror=()=>i("❌ Failed to read image."),c.readAsDataURL(a)}),r&&(r.onclick=()=>{xt(),i("✅ Photo removed"),v()}),e&&(e.onclick=()=>{s();const a=wt();i(`✅ Saved: ${a.name} – ${a.xp} XP (Level ${a.level})`),v()})}function ee(){const t=Et(),e=(n,r,o)=>`
    <div style="
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      padding:12px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(0,0,0,.16);
    ">
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="font-size:18px;">${o}</div>
        <div style="font-weight:900;">${n}</div>
      </div>
      <div style="font-weight:900; font-size:16px;">${Number(r||0)}</div>
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
        ${e("Tickets",t.tickets,"🎟")}
        ${e("Fireworks",t.fireworks,"🎆")}
        ${e("Chests",t.chests,"🧰")}
      </div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Next step: walking → earn tickets, and chests spawn on the map.
      </div>
    </section>
  `}function ne(){const t=Q(),e=w(),n=_();return`
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-left" style="display:flex; gap:10px; align-items:center;">
          ${X(e,32)}
          <div>
            <h1 style="margin:0;">CBS GO</h1>
            <span class="tagline">Mind & Motion</span>
          </div>
        </div>

        <div class="topbar-right" id="xpMount">
          ${Z()}
        </div>
      </header>

      <main class="main">
        <p>Explore the real world. Unlock nodes. Collect loot.</p>

        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <button id="startBtn" type="button">Start Exploring</button>
          ${t?'<button id="resetBtn" class="btn secondary" type="button">Reset Demo (Hard)</button>':""}
        </div>

        ${t?'<p style="opacity:.65; font-size:12px; margin-top:8px;">Dev mode enabled (?dev=1)</p>':""}

        ${Wt()}

        <section id="tabMap" style="display:${n==="map"?"block":"none"};">
          <div id="mapMount">${Kt()}</div>
        </section>

        <section id="tabProfile" style="display:${n==="profile"?"block":"none"};">
          ${Qt()}
        </section>

        <section id="tabBag" style="display:${n==="bag"?"block":"none"};">
          ${ee()}
        </section>
      </main>
    </div>
  `}function v(){const t=document.querySelector("#app");if(!t)return;if(t.innerHTML=ne(),Ut(),Ht(),_()==="profile"&&te(),Q()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",mt)}if(!window.__cbsgo_xp_listener_v2){window.__cbsgo_xp_listener_v2=!0;const n=()=>{const r=document.querySelector("#xpMount");r&&(r.innerHTML=Z())};window.addEventListener("cbsgo:xpChanged",n),window.addEventListener("cbsgo:nodeCompleted",n)}window.__cbsgo_bag_listener_v1||(window.__cbsgo_bag_listener_v1=!0,window.addEventListener("cbsgo:inventoryChanged",()=>{_()==="bag"&&v()}))}v();document.getElementById("startBtn").addEventListener("click",()=>{alert("CBS GO coming online…")});
