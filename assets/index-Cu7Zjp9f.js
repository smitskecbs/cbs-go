(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const ie=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],X="cbsgo_state_v3";function re(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ae(){return{xp:0,completed:{}}}function h(){const e=localStorage.getItem(X);return re(e,ae())}function D(e){localStorage.setItem(X,JSON.stringify(e))}function M(){return Number(h().xp||0)}function Y(e){const t=Math.max(0,Number(e||0));return Math.floor(t/100)+1}function se(e){return Math.max(0,Number(e||0))%100}function de(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return M();const n=h();return n.xp=Number(n.xp||0)+t,D(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,delta:t}})),n.xp}function C(e){const t=String(e||"");return t?!!h().completed?.[t]:!1}function le(e){const t=String(e||"");if(!t)return!1;const n=h();return n.completed?.[t]?!1:(n.completed[t]=Date.now(),D(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}})),!0)}function u(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function P(e){return String(e||"").trim().replace(/\s+/g," ").toLowerCase()}function T(e){return String(e||"").trim().replace(/\s+/g," ").toUpperCase()}function N(){let e=document.getElementById("cbsgoPuzzleModal");return e||(e=document.createElement("div"),e.id="cbsgoPuzzleModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9000",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="14px",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",document.body.appendChild(e),e)}function z(){const e=N();e.style.display="none",e.innerHTML=""}function F(e,t){return`
    <div style="
      width:min(720px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      color:#fff;
      box-shadow:0 18px 80px rgba(0,0,0,.6);
      overflow:hidden;
      font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        gap:10px;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
      ">
        <div style="font-weight:900;">${u(e)}</div>
        <button id="pmClose" type="button" style="
          border:0;
          padding:8px 10px;
          border-radius:12px;
          background:rgba(255,255,255,.08);
          color:#fff;
        ">Close</button>
      </div>

      <div style="padding:14px;">
        ${t}
      </div>
    </div>
  `}function K(e){return`
    <div style="opacity:.9; white-space:pre-wrap; line-height:1.35;">${u(e.q)}</div>

    <div style="margin-top:12px; display:flex; flex-direction:column; gap:10px;">
      ${e.options.map((t,n)=>`
        <label style="
          display:flex; gap:10px; align-items:flex-start;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.04);
          cursor:pointer;
        ">
          <input type="radio" name="pmOpt" value="${n}" style="margin-top:3px;" />
          <div>${u(t)}</div>
        </label>
      `).join("")}
    </div>

    <div style="margin-top:14px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <button id="pmSubmit" class="btn" type="button" style="
        border:0; padding:10px 12px; border-radius:14px;
        background:rgba(255,255,255,.14); color:#fff;
      ">Submit</button>
      <div id="pmMsg" style="opacity:.85; font-size:13px;"></div>
    </div>
  `}function U(e){return`
    <div style="opacity:.9; white-space:pre-wrap; line-height:1.35;">${u(e.q)}</div>

    <div style="margin-top:12px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <input id="pmInput" placeholder="Type your answer…" style="
        flex:1; min-width:220px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        color:#fff;
      "/>
      <button id="pmSubmit" class="btn" type="button" style="
        border:0; padding:10px 12px; border-radius:14px;
        background:rgba(255,255,255,.14); color:#fff;
      ">Submit</button>
    </div>

    <div id="pmHint" style="margin-top:10px; opacity:.7; font-size:12px;"></div>
    <div id="pmMsg" style="margin-top:8px; opacity:.85; font-size:13px;"></div>
  `}function J(e){return`
    <div style="opacity:.9; white-space:pre-wrap; line-height:1.35;">${u(e.q)}</div>

    <div style="margin-top:12px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <input id="pmInput" placeholder="Type the code…" style="
        flex:1; min-width:220px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(255,255,255,.06);
        color:#fff;
      "/>
      <button id="pmSubmit" class="btn" type="button" style="
        border:0; padding:10px 12px; border-radius:14px;
        background:rgba(255,255,255,.14); color:#fff;
      ">Submit</button>
    </div>

    ${e.hint?`<div id="pmHint" style="margin-top:10px; opacity:.7; font-size:12px;">Hint: ${u(e.hint)}</div>`:'<div id="pmHint" style="margin-top:10px; opacity:.7; font-size:12px;"></div>'}

    <div id="pmMsg" style="margin-top:8px; opacity:.85; font-size:13px;"></div>
  `}function pe(e){const t=e?.puzzle;return t?C(e.id)?`
      <div style="opacity:.95; font-weight:800;">✅ Already completed</div>
      <div style="margin-top:10px; opacity:.8;">
        You can replay for fun, but you won’t earn XP again.
      </div>
      <div style="margin-top:14px;">
        <button id="pmReplay" type="button" style="
          border:0; padding:10px 12px; border-radius:14px;
          background:rgba(255,255,255,.14); color:#fff;
        ">Replay puzzle</button>
      </div>
    `:t.type==="mcq"?K(t):t.type==="input"?U(t):t.type==="code"?J(t):`<div style="opacity:.9;">Unknown puzzle type: ${u(t.type)}</div>`:`
      <div style="opacity:.9;">No puzzle configured for this node.</div>
      <div style="margin-top:12px; opacity:.7;">(Add puzzle in src/data/nodes.js)</div>
    `}function G(e){const t=N(),n=t.querySelector("#pmClose");n&&(n.onclick=z);const i=t.querySelector("#pmReplay");if(i){i.onclick=()=>{t.innerHTML=F(e.name,(()=>{const a=e.puzzle;return a?a.type==="mcq"?K(a):a.type==="input"?U(a):a.type==="code"?J(a):"<div>Unknown puzzle type.</div>":"<div>No puzzle.</div>"})()),G(e)};return}const o=e?.puzzle,r=t.querySelector("#pmSubmit"),s=t.querySelector("#pmMsg"),d=t.querySelector("#pmHint"),l=t.querySelector("#pmInput"),c=a=>{s&&(s.textContent=a||"")},A=a=>{d&&(d.textContent=a||"")};function S(){if(!le(e.id)){c("✅ Completed already (no extra XP).");return}const f=Number(e.xp||0);f>0&&de(f),c(`✅ Correct! +${f} XP`),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:e.id}})),window.dispatchEvent(new CustomEvent("cbsgo:rerenderMap")),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged")),setTimeout(z,650)}function k(a){c("❌ Not correct. Try again."),a&&A(a)}r&&(r.onclick=()=>{if(o){if(C(e.id)){c("✅ Completed already (no extra XP).");return}if(o.type==="mcq"){const a=t.querySelector('input[name="pmOpt"]:checked');if(!a)return c("Pick an option.");Number(a.value)===Number(o.answerIndex)?S():k(o.explain?`Tip: ${o.explain}`:"");return}if(o.type==="input"){const a=P(l?.value||"");if(!a)return c("Type an answer.");(o.answers||[]).some(oe=>P(oe)===a)?S():k(o.explain?`Tip: ${o.explain}`:"");return}if(o.type==="code"){const a=T(l?.value||"");if(!a)return c("Type the code.");T(o.code)===a?S():k(o.hint?`Hint: ${o.hint}`:"");return}}},l&&l.addEventListener("keydown",a=>{a.key==="Enter"&&r.click()}),c(""),A(""))}function ce(e){const t=N();t.style.display="flex",t.innerHTML=F(e?.name||"Puzzle",pe(e)),t.onclick=n=>{n.target===t&&z()},G(e)}function q(e,t,n){const i=Number(e||0);return Number.isFinite(i)?Math.max(t,Math.min(n,i)):t}function ue(){const e=Number(M()||0),t=Number(Y(e)||1),n=Number(se(e)||0),i=q(n,0,100),o=q(i/100*100,0,100);return`
    <div style="min-width:180px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; line-height:1;">Level ${t}</div>
        <div style="opacity:.85; font-size:12px; white-space:nowrap;">
          ${i}/100 XP
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
          width:${o}%;
          background:rgba(255,255,255,.75);
        "></div>
      </div>

      <div style="margin-top:6px; font-size:11px; opacity:.65;">
        Total XP: ${e}
      </div>
    </div>
  `}const fe="cbsgo_inventory_v1";function ge(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function be(){return{tickets:0}}function ye(){const e=localStorage.getItem(fe);return ge(e,be())}function W(){return Number(ye().tickets||0)}const me="cbsgo_steps_v4";function xe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ve(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function he(){const e=localStorage.getItem(me);return xe(e,ve())}function we(){return Number(he().steps||0)}function V(){const e=Number(we()||0),t=Number(W()||0);return`
    <div style="
      display:flex;
      align-items:center;
      gap:8px;
      font-size:12px;
      line-height:1;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    ">
      <span>👣 <b>${e}</b></span>
      <span style="opacity:.6;">•</span>
      <span>🎟️ <b>${t}</b></span>
    </div>
  `}function Q(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Se(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const $="cbsgo_leaderboard_v2",Z="cbsgo_player_name_v2",L="cbsgo_player_avatar_v2";function ee(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ke(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function I(){try{return localStorage.getItem(Z)||"Sovereign"}catch{return"Sovereign"}}function ze(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Z,t)}catch{}return t}function w(){try{return localStorage.getItem(L)||""}catch{return""}}function $e(e){const t=String(e||"");try{localStorage.setItem(L,t)}catch{}return t}function _e(){try{localStorage.removeItem(L)}catch{}}function Me(e=10){const t=ee($,[]);return Array.isArray(t)?t.slice(0,e):[]}function Ce(){const e=I(),t=w(),n=M(),i=Y(n),o=ee($,[]),r=Array.isArray(o)?o:[],s=r.find(d=>d.name===e);return s?(s.xp=n,s.level=i,s.avatar=t,s.t=Date.now()):r.push({name:e,xp:n,level:i,avatar:t,t:Date.now()}),r.sort((d,l)=>Number(l.xp||0)-Number(d.xp||0)),ke($,r),{name:e,xp:n,level:i,avatar:t}}let p=null,y=null;function m(e){return document.getElementById(e)}function g(e){const t=m("cbsgoMapHost");if(!t)return;let n=m("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function te(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function Ne(){try{p&&(p.remove(),p=null,y=null)}catch{}}function B(e){const t=w(),i=((I()||"You").trim()[0]||"Y").toUpperCase();if(t){const r=`
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${t}');
        background-size:cover;
        background-position:center;
        background-color:rgba(255,255,255,.10);
      "></div>
    `;return e.divIcon({html:r,className:"",iconSize:[44,44],iconAnchor:[22,22]})}const o=`
    <div style="
      width:40px;height:40px;border-radius:999px;
      border:2px solid rgba(255,255,255,.95);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-family:system-ui, sans-serif;
      font-weight:900;
      color:#fff;
    ">${i}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Le(){const e=window.L,t=m("cbsgoMap");return!e||!t?!1:(Ne(),p=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(p),p.setView([51.687,4.87],16),!0)}function Ie(){!navigator.geolocation||!p||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:i}=e.coords,o=window.L,r=[t,n];if(y){y.setLatLng(r);try{const s=B(o);y.setIcon(s)}catch{}}else{const s=B(o);y=o.marker(r,{icon:s}).addTo(p),p.setView(r,18)}g(`GPS OK • accuracy ~${Math.round(i)}m`)},e=>{g(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function O(){let e=0;const t=80,n=()=>{if(e++,!m("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(g("Loading map engine…"),e<t)return setTimeout(n,100);g("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Le()){g("Could not init map. Refresh.");return}g("Loading GPS…"),Ie()};n()}function x(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function _(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function E(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function R(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Ee(){const e=E(),t=(n,i,o)=>`
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
      <div style="font-size:11px;">${x(i)}</div>
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
          <div style="font-weight:900;">${x(e)}</div>
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
  `}function Ae(){const e=Me(10),t=I(),n=w();return`
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
          ${_(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${x(t)}" maxlength="24" style="
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
                ${e.map((i,o)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${o+1}</div>
                      ${_(i.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${x(i.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">
                          Level ${Number(i.level||1)}
                        </div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">
                      ${Number(i.xp||0)} XP
                    </div>
                  </li>
                `).join("")}
              </ol>
            `}
      </div>
    </section>
  `}function Pe(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),i=document.querySelector("#lbRemoveAvatar");let o=null;const r=d=>{const l=document.querySelector("#lbMsg");l&&(l.textContent=d||"")};e&&r(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const d=ze(e.value);r(`✅ Name saved: ${d}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(s,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),s()})),n&&n.addEventListener("change",()=>{const d=n.files&&n.files[0];if(!d)return;if(d.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}r("Uploading photo…");const l=new FileReader;l.onload=()=>{$e(String(l.result||"")),r("✅ Photo saved"),b()},l.onerror=()=>r("⛔ Failed to read image."),l.readAsDataURL(d)}),i&&(i.onclick=()=>{_e(),r("✅ Photo removed"),b()}),t&&(t.onclick=()=>{e&&s();const d=Ce();r(`✅ Saved: ${d.name} – ${d.xp} XP`),b()})}function Te(){return`
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
        <div class="pill">🎟️ Tickets: <b>${W()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>

      <div style="opacity:.7; font-size:12px; margin-top:10px;">
        Next: add item bag (fireworks beacon) + loot drops on the map.
      </div>
    </div>
  `}function qe(){const e=E();return e==="profile"?H("Profile",`<div id="lbMount">${Ae()}</div>`):e==="bag"?H("Bag",`<div id="bagMount">${Te()}</div>`):""}function Be(){const e=Q(),t=w();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${te()}
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
        <!-- LEFT: only avatar for space -->
        <div style="
          pointer-events:auto;
          padding:8px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter: blur(10px);
          display:flex; align-items:center; justify-content:center;
        ">
          ${_(t,32)}
        </div>

        <!-- RIGHT: XP + Steps/Tickets under it -->
        <div style="
          pointer-events:auto;
          display:flex;
          flex-direction:column;
          align-items:flex-end;
          gap:6px;
          margin-left:auto;
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
            padding:8px 10px;
            border-radius:16px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
            white-space:nowrap;
            max-width:72vw;
            overflow:hidden;
            text-overflow:ellipsis;
          ">
            ${V()}
          </div>
        </div>
      </header>

      ${Ee()}
      ${qe()}

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
  `}function Oe(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");R(n||"map"),b()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{R("map"),b()})}function b(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Be(),Oe(),O(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const i=document.querySelector("#stepsOverlay");i&&(i.innerHTML=V())};window.addEventListener("cbsgo:rerenderSteps",n),window.addEventListener("cbsgo:stepsChanged",n)}if(E()==="profile"&&Pe(),Q()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",Se)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const i=n?.detail?.id;if(!i||C(i))return;const o=ie.find(r=>r.id===i);o&&ce(o)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const n=()=>{const i=document.querySelector("#mapMount");i&&(i.innerHTML=te(),O())};window.addEventListener("cbsgo:rerenderMap",n),window.addEventListener("cbsgo:nodeCompleted",n)}}function ne(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function v(e){const t=ne();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";v(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{v(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function j(){try{if(!document.getElementById("app")){v("❌ #app not found in index.html");return}b();const t=ne();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){v(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",j,{once:!0}):j();
