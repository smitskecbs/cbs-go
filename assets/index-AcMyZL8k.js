(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const j=[{id:"stop-a1",name:"Clock Code",type:"puzzle",description:"A tiny plate shows 3 letters.",xp:40,question:"Type: cbs",hint:"lowercase",answers:["cbs"]},{id:"stop-a2",name:"Bridge Marker",type:"puzzle",description:"The river reflects the truth.",xp:45,question:"Type: sovereign",hint:"lowercase",answers:["sovereign"]},{id:"stop-a3",name:"Stone Sign",type:"puzzle",description:"An old stone has one word.",xp:35,question:"Type: freedom",hint:"lowercase",answers:["freedom"]},{id:"stop-a4",name:"Hidden Initials",type:"puzzle",description:"Look for the initials.",xp:35,question:"Type: unity",hint:"lowercase",answers:["unity"]},{id:"stop-a5",name:"Red Door",type:"puzzle",description:"A door has a sticker with a number.",xp:30,question:"Type: 12",hint:"just the number",answers:["12"]},{id:"stop-a6",name:"Green Bench",type:"puzzle",description:"Bench plaque has one word.",xp:30,question:"Type: community",hint:"lowercase",answers:["community"]},{id:"stop-a7",name:"Old Map Pin",type:"puzzle",description:"A torn paper shows a short code.",xp:40,question:"Type: go",hint:"lowercase",answers:["go"]},{id:"stop-a8",name:"Blue Fence",type:"puzzle",description:"Count the bars.",xp:35,question:"Type: 7",hint:"just the number",answers:["7"]},{id:"stop-a9",name:"Street Lantern",type:"puzzle",description:"Lantern sticker shows a letter.",xp:30,question:"Type: s",hint:"lowercase letter",answers:["s"]},{id:"stop-a10",name:"Sovereign Seal",type:"puzzle",description:"A seal with 3 letters.",xp:50,question:"Type: dao",hint:"lowercase",answers:["dao"]}],Z="cbsgo_state_v3";function ke(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ae(){return{xp:0,completed:{}}}function L(){const e=localStorage.getItem(Z);return ke(e,Ae())}function ee(e){localStorage.setItem(Z,JSON.stringify(e))}function B(){return Number(L().xp||0)}function te(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function Ee(e){return Math.max(0,Number(e||0))%100}function ne(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return B();const n=L();return n.xp=Number(n.xp||0)+t,ee(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function E(e){const t=String(e||"");return t?!!L().completed?.[t]:!1}function oe(e){return E(e)}function Me(e){const t=String(e||"");if(!t)return!1;const n=L();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),ee(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function P(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function re(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function _e(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&T()}),document.body.appendChild(e),e)}function T(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function Ne(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(re).filter(Boolean)}function Ce(e){return e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`}function Le(e){return e?.hint||e?.puzzle?.hint||""}function ze(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function se(e){const t=_e(),n=String(e?.id||""),o=E(n),r=Ce(e),s=Le(e),i=ze(e),a=Ne(e);t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${P(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${i} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${P(r)}</div>
        ${s?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${P(s)}</div>`:""}
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
  `;const l=t.querySelector("#cbsgoClose");if(l&&(l.onclick=T),o)return;const c=t.querySelector("#cbsgoMsg"),u=t.querySelector("#cbsgoAnswer"),z=t.querySelector("#cbsgoSubmit"),g=v=>{c&&(c.textContent=v||"")},J=()=>{if(!n)return;if(E(n)){g("✅ Already completed.");return}const v=re(u?.value||"");if(a.length===0){g("⚠️ This node has no answers configured yet.");return}if(!a.includes(v)){g("❌ Not correct. Try again.");return}if(!Me(n)){g("✅ Already completed.");return}ne(i),g(`✅ Correct! +${i} XP`),setTimeout(()=>T(),550)};z&&(z.onclick=J),u&&(u.addEventListener("keydown",v=>{v.key==="Enter"&&J()}),setTimeout(()=>u.focus(),50))}function ie(e){return(e?.name||e?.id||"").toString().trim().toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}const D="cbsgo_group_roles_v1";function Pe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}const $=(()=>{const e="cbsgo_tab_id_v1";let t=sessionStorage.getItem(e);return t||(t=`${Date.now()}-${Math.random().toString(16).slice(2)}`,sessionStorage.setItem(e,t)),t})();function ae(){try{const e=localStorage.getItem(D);if(!e)return{};const t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Te(e){try{localStorage.setItem(D,JSON.stringify(e))}catch{}}function y(e){const n=ae()[e];return n&&typeof n=="object"?n:{}}function k(e,t){const n=ae();n[e]=t,Te(n)}function G(e){const t=y(e),n=Object.entries(t).find(([,o])=>o===$);return n?n[0]:null}function le(e){const t=y(e),n=["A","B","C","D","E"];let o=0;for(const r of n)t[r]&&o++;return o}function ce(e){const t=["A","B","C","D","E"],n=y(e),o=Object.entries(n).find(([,s])=>s===$);if(o)return o[0];const r=t.find(s=>!n[s]);return r?(n[r]=$,k(e,n),r):null}function qe(e){const t=y(e);let n=!1;for(const[o,r]of Object.entries(t))r===$&&(delete t[o],n=!0);n&&k(e,t)}function Ie(e){const t=["A","B","C","D","E"],n=y(e);let o=G(e);o||(o=ce(e),o||(n.A=$,o="A",k(e,n)));const r=y(e);for(const s of t)s!==o&&(r[s]=r[s]||`DEV_${s}`);return k(e,r),o}function Re(e){k(e,{})}const h={joinedGroupNodeIds:new Set};function w(e){const t=document.querySelector(e);t&&(t.innerHTML=de(),pe(e))}function Oe(e){if(h.joinedGroupNodeIds.has(e)){h.joinedGroupNodeIds.delete(e),qe(e),w("#nodesMount");return}if(!ce(e)){alert("This group is full (roles A–E already taken).");return}h.joinedGroupNodeIds.add(e),w("#nodesMount")}function X(e){return oe(ie(e))?'<span class="pill ok">✅ Completed</span>':""}function je(e){const t=oe(ie(e));if(e.type==="group"){const o=e.requiredPlayers??5,r=le(e.id),s=r>=o,i=h.joinedGroupNodeIds.has(e.id),a=e.xp??150,l=G(e.id),c=Pe();return`
      <li class="node group">
        <div class="node-row">
          <div class="node-main">
            <strong>${e.name}</strong>
            <small>${e.description}</small>

            <div class="meta">
              <span class="badge">👥 Group Node</span>
              <span class="pill">Players: ${r}/${o}</span>
              <span class="pill ${s?"ok":""}">
                ${s?"Unlocked":"Locked"}
              </span>
              <span class="pill">XP: ${a} (Group)</span>
              ${l?`<span class="pill ok">Role: ${l}</span>`:""}
              ${X(e)}
              ${c?'<span class="pill">DEV</span>':""}
            </div>

            ${c?`
              <div class="meta" style="margin-top:8px;">
                <button class="btn secondary" data-action="devClear" data-id="${e.id}">DEV: Clear</button>
                <button class="btn secondary" data-action="devFill" data-id="${e.id}">DEV: Fill A–E (keep my role)</button>
              </div>
            `:""}
          </div>

          <div class="node-actions">
            <button class="btn secondary" data-action="join" data-id="${e.id}">
              ${i?"Leave":"Join"}
            </button>

            ${s?`<button class="btn" data-action="open" data-id="${e.id}">
                  ${t?"Replay":"Open"}
                </button>`:""}
          </div>
        </div>
      </li>
    `}const n=e.xp??50;return`
    <li class="node puzzle">
      <div class="node-row">
        <div class="node-main">
          <strong>${e.name}</strong>
          <small>${e.description}</small>

          <div class="meta">
            <span class="badge">🧩 Puzzle Node</span>
            <span class="pill">XP: ${n} (Solo)</span>
            ${X(e)}
          </div>
        </div>

        <div class="node-actions">
          <button class="btn" data-action="open" data-id="${e.id}">
            ${t?"Replay":"Open"}
          </button>
        </div>
      </div>
    </li>
  `}function de(){return`
    <section class="nodes">
      <h2>Nearby Nodes</h2>
      <ul class="node-list">
        ${j.map(je).join("")}
      </ul>
    </section>
  `}function pe(e="#nodesMount"){const t=document.querySelector(e);t&&(window.addEventListener("storage",n=>{n.key===D&&w("#nodesMount")}),t.addEventListener("click",n=>{const o=n.target.closest("button[data-action]");if(!o)return;const r=o.dataset.action,s=o.dataset.id;if(r==="join"){Oe(s);return}if(r==="devClear"){Re(s),w("#nodesMount");return}if(r==="devFill"){Ie(s),h.joinedGroupNodeIds.add(s),w("#nodesMount");return}if(r==="open"){const i=j.find(a=>a.id===s);if(!i)return;if(i.type==="group"){const a=i.requiredPlayers??5,l=le(i.id);if(l<a){alert(`This Group Node requires ${a} players.
Currently: ${l}/${a}`);return}if(!G(i.id)){alert("Join this Group Node first to receive a role (A–E).");return}}se(i)}}))}function Be(){const e=B(),t=te(e),n=Ee(e),o=Math.min(100,Math.max(0,n));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${o}%"></div>
      </div>
    </div>
  `}const ue="cbsgo_inventory_v1";function De(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ge(){return{tickets:0}}function q(){const e=localStorage.getItem(ue);return De(e,Ge())}function He(e){localStorage.setItem(ue,JSON.stringify(e))}function ge(){return Number(q().tickets||0)}function Fe(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return q();const n=q();return n.tickets=Number(n.tickets||0)+t,He(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const fe="cbsgo_steps_v1",be="cbsgo_steps_enabled_v1",Je=.78;let S=null,f=null,p={msg:"idle",t:0,lat:null,lng:null,acc:null,err:null};function Xe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ke(){return{steps:0,meters:0,last5kAwardAt:0,last10kAwardAt:0}}function I(){const e=localStorage.getItem(fe);return Xe(e,Ke())}function Ve(e){localStorage.setItem(fe,JSON.stringify(e))}function Ye(){return Number(I().steps||0)}function me(){try{return localStorage.getItem(be)==="1"}catch{return!1}}function x(e){try{localStorage.setItem(be,e?"1":"0")}catch{}}function We(){return p}function Ue(e,t){const o=g=>g*Math.PI/180,r=o(e.lat),s=o(t.lat),i=o(t.lat-e.lat),a=o(t.lng-e.lng),l=Math.sin(i/2),c=Math.sin(a/2),u=l*l+Math.cos(r)*Math.cos(s)*c*c;return 6371e3*(2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u)))}function Qe(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return I();const n=I();n.meters=Number(n.meters||0)+t;const o=Math.floor(t/Je);o>0&&(n.steps=Number(n.steps||0)+o);const r=Number(n.steps||0),s=Math.floor(r/5e3)*5e3;if(s>=5e3&&s>Number(n.last5kAwardAt||0)){for(let a=Number(n.last5kAwardAt||0)+5e3;a<=s;a+=5e3)ne(20);n.last5kAwardAt=s}const i=Math.floor(r/1e4)*1e4;if(i>=1e4&&i>Number(n.last10kAwardAt||0)){for(let a=Number(n.last10kAwardAt||0)+1e4;a<=i;a+=1e4)Fe(1);n.last10kAwardAt=i}return Ve(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps,meters:n.meters,tickets:ge()}})),n}async function Ze(){return navigator.geolocation?S!=null?(x(!0),p={...p,msg:"already_enabled",t:Date.now(),err:null},{ok:!0}):(f=null,p={msg:"starting",t:Date.now(),lat:null,lng:null,acc:null,err:null},S=navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords;p={msg:"ok",t:Date.now(),lat:t,lng:n,acc:o,err:null};const r={lat:t,lng:n};if(!f){f=r,x(!0),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"));return}const s=Ue(f,r);s>=2&&(Qe(s),f=r,window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps")))},e=>{p={msg:"error",t:Date.now(),lat:null,lng:null,acc:null,err:e?.message||String(e)},x(!1),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4}),x(!0),{ok:!0}):(p={msg:"geolocation_not_supported",t:Date.now(),lat:null,lng:null,acc:null,err:"Geolocation not supported"},{ok:!1,reason:"Geolocation not supported"})}function et(){try{S!=null&&navigator.geolocation.clearWatch(S)}catch{}S=null,f=null,x(!1),p={msg:"disabled",t:Date.now(),lat:null,lng:null,acc:null,err:null},window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))}function K(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function tt(e){try{return new Date(e).toLocaleTimeString()}catch{return""}}function ye(){const e=Ye(),t=ge(),n=me(),o=We(),r=o?.err?`❌ ${K(o.err)}`:o?.lat?`✅ ${tt(o.t)} acc=${Math.round(o.acc||0)}m`:o?.msg?`ℹ️ ${K(o.msg)}`:"…";return`
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
  `}function V(){const t=(document.querySelector("#stepsMount")||document).querySelector("#enableStepsBtn");t&&(t.__cbsgo_bound||(t.__cbsgo_bound=!0,t.addEventListener("click",async()=>{if(me()){et(),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"));return}const n=await Ze();n?.ok||alert(n?.reason||"Could not enable GPS steps."),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))})))}function ve(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function nt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const R="cbsgo_leaderboard_v2",xe="cbsgo_player_name_v2",H="cbsgo_player_avatar_v2";function he(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ot(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function we(){try{return localStorage.getItem(xe)||"Sovereign"}catch{return"Sovereign"}}function rt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(xe,t)}catch{}return t}function F(){try{return localStorage.getItem(H)||""}catch{return""}}function st(e){const t=String(e||"");try{localStorage.setItem(H,t)}catch{}return t}function it(){try{localStorage.removeItem(H)}catch{}}function at(e=10){const t=he(R,[]);return Array.isArray(t)?t.slice(0,e):[]}function lt(){const e=we(),t=F(),n=B(),o=te(n),r=he(R,[]),s=Array.isArray(r)?r:[],i=s.find(a=>a.name===e);return i?(i.xp=n,i.level=o,i.avatar=t,i.t=Date.now()):s.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),s.sort((a,l)=>Number(l.xp||0)-Number(a.xp||0)),ot(R,s),{name:e,xp:n,level:o,avatar:t}}let d=null,A=null,ct=null;function M(e){return document.getElementById(e)}function b(e){const t=M("cbsgoMapHost");if(!t)return;let n=M("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Se(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function dt(){try{d&&(d.remove(),d=null,A=null,ct=null)}catch{}}function pt(){const e=window.L,t=M("cbsgoMap");return!e||!t?!1:(dt(),d=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(d),d.setView([51.687,4.87],16),!0)}function ut(){!navigator.geolocation||!d||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r=window.L,s=[t,n];A?A.setLatLng(s):(A=r.circleMarker(s,{radius:8,weight:2,opacity:.9,fillOpacity:.6}).addTo(d),d.setView(s,18)),b(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{b(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Y(){let e=0;const t=80,n=()=>{if(e++,!M("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(b("Loading map engine…"),e<t)return setTimeout(n,100);b("Map engine failed to load (Leaflet not found). Refresh.");return}if(!pt()){b("Could not init map. Refresh.");return}b("Loading GPS…"),ut()};n()}function _(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function O(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function N(){try{return sessionStorage.getItem("cbsgo_selected_tab_v4")||"map"}catch{return"map"}}function W(e){try{sessionStorage.setItem("cbsgo_selected_tab_v4",e)}catch{}}function gt(){const e=N(),t=(n,o,r)=>`
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
      <div style="font-size:11px;">${_(o)}</div>
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
  `}function U(e,t){return`
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
          <div style="font-weight:900;">${_(e)}</div>
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
  `}function ft(){const e=at(10),t=we(),n=F();return`
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
          ${O(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${_(t)}" maxlength="24" style="
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
                      ${O(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${_(o.name)}
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
  `}function bt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const s=a=>{const l=document.querySelector("#lbMsg");l&&(l.textContent=a||"")};e&&s(`✅ Profile loaded: ${e.value}`);const i=()=>{if(!e)return;const a=rt(e.value);s(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{s("Saving…"),r&&clearTimeout(r),r=setTimeout(i,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),i()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){s("❌ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}s("Uploading photo…");const l=new FileReader;l.onload=()=>{st(String(l.result||"")),s("✅ Photo saved"),m()},l.onerror=()=>s("❌ Failed to read image."),l.readAsDataURL(a)}),o&&(o.onclick=()=>{it(),s("✅ Photo removed"),m()}),t&&(t.onclick=()=>{e&&i();const a=lt();s(`✅ Saved: ${a.name} – ${a.xp} XP`),m()})}function mt(){const e=N();return e==="profile"?U("Profile",`
      <div id="nodesMount">
        ${de()}
      </div>
      <div id="lbMount">
        ${ft()}
      </div>
    `):e==="bag"?U("Bag",`
      <div id="stepsMount">
        ${ye()}
      </div>
    `):""}function yt(){const e=ve(),t=F();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP always fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Se()}
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
          ${O(t,32)}
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
          ${Be()}
        </div>
      </header>

      ${gt()}
      ${mt()}

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
  `}function vt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");W(n||"map"),m()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{W("map"),m()})}function m(){const e=document.querySelector("#app");if(!e)return;e.innerHTML=yt(),vt(),Y();const t=N();if(t==="profile"&&(pe("#nodesMount"),bt()),t==="bag"&&(V(),window.__cbsgo_steps_rerender_listener||(window.__cbsgo_steps_rerender_listener=!0,window.addEventListener("cbsgo:rerenderSteps",()=>{if(N()!=="bag")return;const n=document.querySelector("#stepsMount");n&&(n.innerHTML=ye(),V())}))),ve()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",nt)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||E(o))return;const r=j.find(s=>s.id===o);r&&se(r)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const n=()=>{const o=document.querySelector("#mapMount");o&&(o.innerHTML=Se(),Y())};window.addEventListener("cbsgo:rerenderMap",n),window.addEventListener("cbsgo:nodeCompleted",n)}}function $e(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function C(e){const t=$e();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";C(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{C(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Q(){try{if(!document.getElementById("app")){C("❌ #app not found in index.html");return}m();const t=$e();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){C(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Q,{once:!0}):Q();
