(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Z=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],ee="cbsgo_state_v3";function ve(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function xe(){return{xp:0,completed:{}}}function I(){const e=localStorage.getItem(ee);return ve(e,xe())}function te(e){localStorage.setItem(ee,JSON.stringify(e))}function j(){return Number(I().xp||0)}function ne(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function he(e){return Math.max(0,Number(e||0))%100}function T(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return j();const n=I();return n.xp=Number(n.xp||0)+t,te(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function Y(e){const t=String(e||"");return t?!!I().completed?.[t]:!1}function we(e){const t=String(e||"");if(!t)return!1;const n=I();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),te(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}const oe="cbsgo_inventory_v1";function Se(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ke(){return{tickets:0}}function B(){const e=localStorage.getItem(oe);return Se(e,ke())}function _e(e){localStorage.setItem(oe,JSON.stringify(e))}function re(){return Number(B().tickets||0)}function ie(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return B();const n=B();return n.tickets=Number(n.tickets||0)+t,_e(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}let O=!1;function F(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function S(){const e=document.getElementById("cbsgoModal");e&&e.remove(),O=!1}function Me(e,t){return`
    <div id="cbsgoModal" style="
      position:fixed; inset:0;
      z-index:99999;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:16px;
      background:rgba(0,0,0,.62);
      backdrop-filter: blur(6px);
    ">
      <div style="
        width:min(520px, 96vw);
        border-radius:20px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.92);
        box-shadow:0 24px 80px rgba(0,0,0,.55);
        overflow:hidden;
        color:#fff;
        font-family:system-ui, sans-serif;
      ">
        <div style="
          padding:14px 14px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-weight:900;">${F(e)}</div>
          <button id="cbsgoModalClose" type="button" style="
            border:0;
            padding:8px 10px;
            border-radius:12px;
            background:rgba(255,255,255,.08);
            color:#fff;
          ">Close</button>
        </div>

        <div style="padding:14px 14px;">
          ${t}
        </div>
      </div>
    </div>
  `}function Ee(e){return`
    <div style="opacity:.85; font-size:14px;">
      ✅ You already completed <b>${F(e?.name||"this node")}</b>.
    </div>
    <div style="opacity:.7; font-size:12px; margin-top:10px;">
      Go to another puzzle node on the map.
    </div>
  `}function Le(e){return`
    <div style="opacity:.9; font-size:14px;">
      Puzzle: <b>${F(e?.name||"Puzzle")}</b>
    </div>
    <div style="opacity:.72; font-size:12px; margin-top:6px;">
      Type the correct answer to complete this node.
    </div>

    <div style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:800;">Question</div>
      <div style="opacity:.85; margin-top:6px;">
        Type <b>5</b>
      </div>

      <div style="display:flex; gap:10px; margin-top:12px; align-items:center; flex-wrap:wrap;">
        <input id="cbsgoAnswer" inputmode="numeric" placeholder="Answer…" style="
          flex:1; min-width:160px;
          padding:10px 10px;
          border-radius:12px;
          border:1px solid rgba(255,255,255,.14);
          background:rgba(255,255,255,.06);
          color:#fff;
          outline:none;
        "/>
        <button id="cbsgoSubmit" class="btn" type="button" style="
          border:0;
          padding:10px 12px;
          border-radius:12px;
          background:rgba(255,255,255,.14);
          color:#fff;
          font-weight:800;
        ">Submit</button>
      </div>

      <div id="cbsgoResult" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Rewards:
        <br/>❌ Fail: <b>+1 XP</b>
        <br/>✅ Success: <b>+5 XP</b> + <b>+1 Ticket</b> (once per node)
      </div>
    </div>
  `}function ze(e){if(O)return;O=!0;const t=String(e?.id||""),n=t?Y(t):!1,o=n?Ee(e):Le(e);document.body.insertAdjacentHTML("beforeend",Me(e?.name||"Puzzle",o));const r=document.getElementById("cbsgoModal"),i=document.getElementById("cbsgoModalClose");if(i&&(i.onclick=S),r&&r.addEventListener("click",c=>{c.target===r&&S()}),n)return;const s=document.getElementById("cbsgoAnswer"),a=document.getElementById("cbsgoSubmit"),d=document.getElementById("cbsgoResult"),l=c=>{d&&(d.innerHTML=c||"")},b=()=>{if(String(s?.value||"").trim()!=="5"){T(1),l("❌ Wrong. <b>+1 XP</b>"),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged"));return}if(!we(t)){l("✅ Already completed earlier.");return}T(5),ie(1),l("✅ Correct! <b>+5 XP</b> + <b>+1 Ticket</b>"),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged")),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),setTimeout(()=>S(),650)};a&&(a.onclick=b),s&&(s.focus(),s.addEventListener("keydown",c=>{c.key==="Enter"&&b(),c.key==="Escape"&&S()}))}function K(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function $e(){const e=Number(j()||0),t=Number(ne(e)||1),n=Number(he(e)||0),o=K(n,0,100),r=K(o/100*100,0,100);return`
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
  `}const se="cbsgo_steps_v4",Ne="cbsgo_gps_autostart_v2";let k=null,_=!1,v={msg:"init"};function Ie(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ae(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function E(){const e=localStorage.getItem(se);return Ie(e,Ae())}function ae(e){e.updatedAt=Date.now(),localStorage.setItem(se,JSON.stringify(e))}function M(){return Number(E().steps||0)}function L(){return!!_}function Ce(){return v}function Pe(e,t){const o=l=>l*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function Te(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,T(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ie(1))}function Be(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return E();const n=E();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/.75);return o>n.steps&&(n.steps=o),Te(n),ae(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Oe(){k!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(k),k=null}async function W(e={}){const t=!!e.silent;if(!navigator.geolocation)return v={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Ne,"1")}catch{}Oe(),_=!0,v={msg:"requesting",t:Date.now()};const n=200;try{return k=navigator.geolocation.watchPosition(o=>{const r=o.coords.latitude,i=o.coords.longitude,s=o.coords.accuracy||999;v={lat:r,lng:i,acc:s,t:Date.now()};const a=E(),d=a.lastPos;if(a.lastPos={lat:r,lng:i,t:Date.now()},ae(a),s>n){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}));return}if(d&&typeof d.lat=="number"&&typeof d.lng=="number"){const l=Pe({lat:d.lat,lng:d.lng},{lat:r,lng:i});l>=2&&l<=60&&Be(l)}window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}))},o=>{_=!1,v={err:o?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(o){return _=!1,v={err:String(o?.message||o),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Re(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>L()||await W({silent:!0}))();const t=async()=>{L()||await W({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function De(){const e=Ce();return e?.err?"🔴":e?.lat&&L()?"🟢":L()?"🟡":"⚪"}function de(){const e=M(),t=re();return`
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
      <span style="opacity:.9;">${De()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function le(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function qe(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const R="cbsgo_leaderboard_v2",ce="cbsgo_player_name_v2",G="cbsgo_player_avatar_v2";function pe(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function je(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function X(){try{return localStorage.getItem(ce)||"Sovereign"}catch{return"Sovereign"}}function Ye(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ce,t)}catch{}return t}function A(){try{return localStorage.getItem(G)||""}catch{return""}}function Fe(e){const t=String(e||"");try{localStorage.setItem(G,t)}catch{}return t}function Ge(){try{localStorage.removeItem(G)}catch{}}function Xe(e=10){const t=pe(R,[]);return Array.isArray(t)?t.slice(0,e):[]}function Je(){const e=X(),t=A(),n=j(),o=ne(n),r=pe(R,[]),i=Array.isArray(r)?r:[],s=i.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((a,d)=>Number(d.xp||0)-Number(a.xp||0)),je(R,i),{name:e,xp:n,level:o,avatar:t}}let p=null,h=null,w=null;const He="cbsgo_last_pos_v6",D="cbsgo_nodes_pos_v6",Ke=1200,P=60,We=180;function z(e){return document.getElementById(e)}function ue(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ge(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function g(e){const t=z("cbsgoMapHost");if(!t)return;let n=z("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function fe(e,t){const o=l=>l*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function be(){return Z.filter(e=>e.type!=="group"&&!Y(String(e.id)))}function Ue(e){const t=ue(D,null);if(t&&t.seed&&t.posById)return t;const n=be(),o={},r=[],i=90,s=160,a=420,d=4e3;function l(u,m,f){const C=m*Math.cos(f)/111111,y=m*Math.sin(f)/(111111*Math.cos(u*Math.PI/180));return{dLat:C,dLng:y}}let b=0;for(const u of n){let m=!1;for(;!m&&b<d;){b++;const f=s+Math.random()*(a-s),C=Math.random()*Math.PI*2,y=l(e.lat,f,C),H={lat:e.lat+y.dLat,lng:e.lng+y.dLng};m=r.every(ye=>fe(ye,H)>=i),m&&(r.push(H),o[u.id]={dLat:y.dLat,dLng:y.dLng})}if(!o[u.id]){const f=l(e.lat,s,Math.random()*Math.PI*2);o[u.id]={dLat:f.dLat,dLng:f.dLng}}}const c={seed:e,posById:o,createdAt:Date.now()};return ge(D,c),c}function Ve(e,t){const n=ue(D,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function Qe(e){const t=String(e).trim();if(!t)return"U";const n=t.split(/\s+/).filter(Boolean),o=n[0]?.[0]||"U",r=n[1]?.[0]||"";return(o+r).toUpperCase()}function Ze(e){const t=A(),n=X()||"You",o=Qe(n),r=t?`
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${t}');
        background-size:cover;
        background-position:center;
      "></div>
    `:`
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background:rgba(20,24,36,.85);
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-weight:900;
        font-family:system-ui, sans-serif;
      ">${o}</div>
    `;return e.divIcon({html:r,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function et(e,t=!1){const n=`
    <div style="
      width:34px;height:34px;border-radius:12px;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(8px);
      box-shadow:0 10px 24px rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-size:18px;
      transform: translateY(-2px);
    ">
      ${t?"🎟️":"🧩"}
    </div>
  `;return e.divIcon({html:n,className:"",iconSize:[34,34],iconAnchor:[17,17]})}function tt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function nt(){try{p&&(p.remove(),p=null,h=null,w=null)}catch{}}function ot(){const e=window.L,t=z("cbsgoMap");return!e||!t?!1:(nt(),p=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(p),p.setView([51.687,4.87],16),w=e.layerGroup().addTo(p),!0)}function rt(e){const t=window.L;if(!t||!p||!w)return;w.clearLayers();const n=Ue(e),o=be(),r=[];for(const s of o){const a=Ve(s,n.seed);if(!a)continue;const d=Math.round(fe(e,a));d>Ke||r.push({node:s,ll:a,dist:d})}if(r.sort((s,a)=>s.dist-a.dist),r.length===0){g("No puzzle nodes nearby yet. Walk a bit (GPS) or zoom out slightly.");return}const i=r[0];g(`Nearest puzzle: ${i.node.name} • ${i.dist}m • Open within ${P}m`),r.forEach(({node:s,ll:a,dist:d},l)=>{const c=et(t,!1),u=t.marker([a.lat,a.lng],{icon:c});u.bindTooltip(`${s.name} • ${d}m`,{direction:"top",offset:[0,-10]}),u.on("click",()=>{if(d>P){alert(`Too far.

Go closer to open:
${s.name}
Distance: ${d}m
Required: ≤ ${P}m`);return}window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:String(s.id)}}))}),u.addTo(w)})}function it(e,t){const n=window.L;if(!n||!p)return;const o=[e,t],r=Ze(n);h?(h.setLatLng(o),h.setIcon(r)):(h=n.marker(o,{icon:r}).addTo(p),p.setView(o,18))}function st(){!navigator.geolocation||!p||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords;if(o&&o>We){g(`GPS OK • accuracy ~${Math.round(o)}m (move outside for better)`);return}const r={lat:t,lng:n};ge(He,{...r,t:Date.now(),acc:o}),it(t,n),rt(r)},e=>{g(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function at(){let e=0;const t=80,n=()=>{if(e++,!z("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(g("Loading map engine…"),e<t)return setTimeout(n,100);g("Map engine failed to load (Leaflet not found). Refresh.");return}if(!ot()){g("Could not init map. Refresh.");return}g("Loading GPS…"),st()};n()}function $(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function q(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function J(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function U(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function dt(){const e=J(),t=(n,o,r)=>`
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
      <div style="font-size:11px;">${$(o)}</div>
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
  `}function V(e,t){return`
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
          <div style="font-weight:900;">${$(e)}</div>
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
  `}function lt(){const e=Xe(10),t=X(),n=A();return`
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
          ${q(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${$(t)}" maxlength="24" style="
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
                      ${q(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${$(o.name)}
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
  `}function ct(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=a=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=a||"")};e&&i(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const a=Ye(e.value);i(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(s,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const d=new FileReader;d.onload=()=>{Fe(String(d.result||"")),i("✅ Photo saved"),x()},d.onerror=()=>i("⛔ Failed to read image."),d.readAsDataURL(a)}),o&&(o.onclick=()=>{Ge(),i("✅ Photo removed"),x()}),t&&(t.onclick=()=>{e&&s();const a=Je();i(`✅ Saved: ${a.name} – ${a.xp} XP`),x()})}function pt(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${re()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function ut(){const e=J();return e==="profile"?V("Profile",`<div id="lbMount">${lt()}</div>`):e==="bag"?V("Bag",`<div id="bagMount">${pt()}</div>`):""}function gt(){const e=le(),t=A();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${tt()}
      </div>

      <!-- TOPBAR -->
      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:flex-start;
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
          ${q(t,32)}
          <div style="font-weight:900; line-height:1;">CBS GO</div>
        </div>

        <div style="pointer-events:auto; display:flex; flex-direction:column; align-items:stretch;">
          <div id="xpMount" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
          ">
            ${$e()}
          </div>

          <div id="stepsMount">
            ${de()}
          </div>
        </div>
      </header>

      ${dt()}
      ${ut()}

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
  `}function ft(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");U(n||"map"),x()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{U("map"),x()})}function x(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=gt(),ft(),at(),Re(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=de())};window.addEventListener("cbsgo:stepsChanged",n)}if(J()==="profile"&&ct(),le()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",qe)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||Y(o))return;const r=Z.find(i=>i.id===o);r&&ze(r)}))}function me(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function N(e){const t=me();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";N(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{N(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Q(){try{if(!document.getElementById("app")){N("❌ #app not found in index.html");return}x();const t=me();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){N(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Q,{once:!0}):Q();
