(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const l=[{id:"stop-1",type:"solo",color:"#35d07f",name:"Old Clock Tower",desc:"A weathered plaque and a silent bell. Something here keeps perfect time.",xp:60,question:"The tower chimes once every 60 minutes. How many chimes in 6 hours?",hint:"One chime per hour. Multiply.",acceptedAnswers:["6","six"],loot:{tickets:{min:1,max:2},bonusXpChance:.25,bonusXp:{min:10,max:25}}},{id:"stop-2",type:"solo",color:"#b47cff",name:"Abandoned Square",desc:"Faded markings on the ground. A pattern remains.",xp:70,question:"A square has 4 sides. If you walk around it twice, how many sides do you pass?",hint:"One lap = 4 sides. Two laps = 4 × 2.",acceptedAnswers:["8","eight"],loot:{tickets:{min:0,max:3},bonusXpChance:.35,bonusXp:{min:10,max:30}}},{id:"stop-3",type:"solo",color:"#ffd86b",name:"River Marker",desc:"A small marker near the waterline with a number scratched in.",xp:80,question:"You find a marker: “North 3, East 4”. What is the distance from start (straight line)?",hint:"Think of a 3-4-5 triangle.",acceptedAnswers:["5","five"],loot:{tickets:{min:1,max:4},bonusXpChance:.4,bonusXp:{min:15,max:40}}}];function N(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function tt(){return Number(localStorage.getItem("cbsgo_xp")||0)}function et(e){const t=tt()+Number(e||0);localStorage.setItem("cbsgo_xp",String(t)),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged"))}const nt={"stop-1":{question:`CBS GO is built on a fast blockchain.
Which blockchain is known for high speed and low transaction costs?`,answers:["solana"],hint:"It starts with “So” and is often compared to Ethereum.",xp:50},"stop-2":{question:`On Solana, you don’t log in with an email.
What do you use instead to own and control your assets?`,answers:["wallet","crypto wallet"],hint:"It holds your keys, not your password.",xp:60},"stop-3":{question:`On Solana, projects can create their own assets.
What is the name for a custom asset built on a blockchain?`,answers:["token","crypto token"],hint:"Not Bitcoin, not Solana itself — something built on top.",xp:70}};function ot(e){const t=nt[e.id];if(!t){alert(`This node is not active yet.
More puzzles coming soon.`);return}const n=document.createElement("div");n.style=`
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.6);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
  `,n.innerHTML=`
    <div style="
      width:100%;
      max-width:420px;
      padding:20px;
      border-radius:16px;
      background:#0f1115;
      color:#fff;
      border:1px solid rgba(255,255,255,.12);
      box-shadow:0 30px 60px rgba(0,0,0,.5);
    ">
      <h2 style="margin-top:0;">${N(e.name)}</h2>

      <p style="white-space:pre-line; opacity:.9;">
        ${N(t.question)}
      </p>

      <input
        id="puzzleAnswer"
        placeholder="Your answer…"
        style="
          width:100%;
          margin-top:12px;
          padding:10px;
          border-radius:10px;
          border:1px solid rgba(255,255,255,.2);
          background:#111;
          color:#fff;
        "
      />

      <div id="puzzleMsg" style="margin-top:10px; font-size:13px; opacity:.85;"></div>

      <div style="display:flex; gap:10px; margin-top:14px;">
        <button id="puzzleSubmit" class="btn">Submit</button>
        <button id="puzzleClose" class="btn secondary">Close</button>
      </div>
    </div>
  `,document.body.appendChild(n);const r=n.querySelector("#puzzleAnswer"),o=n.querySelector("#puzzleMsg");function i(){n.remove()}n.querySelector("#puzzleClose").onclick=i,n.querySelector("#puzzleSubmit").onclick=()=>{const a=String(r.value||"").trim().toLowerCase();if(!a){o.textContent="Please enter an answer.";return}t.answers.some(c=>c.toLowerCase()===a)?(et(t.xp),o.textContent=`✅ Correct! +${t.xp} XP`,setTimeout(i,900)):o.textContent=`❌ Not correct. Hint: ${t.hint}`}}const rt="cbsgo_state_v1";function S(){return{xp:50,completed:{},completedOnce:{},lastUpdated:Date.now()}}function it(){try{const e=localStorage.getItem(rt);if(!e)return S();const t=JSON.parse(e);return!t||typeof t!="object"?S():{xp:Number(t.xp||0),completed:t.completed&&typeof t.completed=="object"?t.completed:{},completedOnce:t.completedOnce&&typeof t.completedOnce=="object"?t.completedOnce:{},lastUpdated:Number(t.lastUpdated||Date.now())}}catch{return S()}}function C(e){return!!it().completed?.[e]}function T(e){return e?typeof e=="string"?document.querySelector(e)||document:e===window?document:e.addEventListener&&e.querySelector?e:document:document}function O(e){if(typeof C=="function")return!!C(e);try{const t=localStorage.getItem("cbsgo_state_v1");return t?!!JSON.parse(t)?.completed?.[e]:!1}catch{return!1}}function $(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function at(e){return'<span class="pill puzzle">Puzzle Node</span>'}function st(e){const t=O(e.id);return`
    <div class="row actions">
      <button class="btn" data-action="open" data-node-id="${$(e.id)}">${t?"Replay":"Open"}</button>
    </div>
  `}function q(e){const t=T(e),n=t.querySelector("#nodesList")||t.querySelector('[data-view="nodes"]')||t,o=l.filter(i=>i.type!=="group").map(i=>{const a=O(i.id);return`
      <div class="nodeCard" data-node-card="1">
        <div class="nodeTop">
          <div>
            <div class="nodeTitle">${$(i.name)}</div>
            <div class="nodeDesc">${$(i.desc||"")}</div>
          </div>
        </div>

        <div class="nodeMeta">
          ${at()}
          <span class="muted">XP: ${Number(i.xp||50)} (Solo)</span>
          ${a?'<span class="badge ok">Completed</span>':""}
        </div>

        ${st(i)}
      </div>
    `}).join("");n&&n!==t?n.innerHTML=o:t.innerHTML=o}function ct(e){const t=T(e);t.__cbsgo_nodes_bound||(t.__cbsgo_nodes_bound=!0,t.addEventListener("click",n=>{const r=n.target;if(!r)return;const o=r.closest?.("[data-action][data-node-id]"),i=r.closest?.("[data-node-id], [data-node], [data-node-name]");if(o){const a=o.getAttribute("data-action"),s=o.getAttribute("data-node-id"),c=l.find(d=>d.id===s);if(!c)return;if(a==="open"){window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:c.id}}));return}}if(i){const a=i.getAttribute("data-node-id")||i.getAttribute("data-node")||i.getAttribute("data-node-name");if(!a)return;window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:a}}))}}),window.addEventListener("cbsgo:rerender",()=>{try{q(document)}catch{}}))}const dt="cbsgo_xp";function lt(){try{return Number(localStorage.getItem(dt)||0)||0}catch{return 0}}function pt(e){const t=Math.max(0,Number(e)||0);return t<100?1:t<250?2:t<450?3:t<700?4:5+Math.floor((t-700)/400)}function ut(e){const t=Math.max(0,Number(e)||0),n=[{lvl:1,from:0,to:100},{lvl:2,from:100,to:250},{lvl:3,from:250,to:450},{lvl:4,from:450,to:700}];for(const s of n)if(t>=s.from&&t<s.to){const c=(t-s.from)/(s.to-s.from)*100;return{level:s.lvl,pct:c,nextAt:s.to}}const r=pt(t),o=700+(r-5)*400,i=o+400,a=(t-o)/(i-o)*100;return{level:r,pct:a,nextAt:i}}function I(){const e=lt(),t=ut(e);return`
    <div class="xpBarWrap" style="
      display:flex;
      flex-direction:column;
      align-items:flex-end;
      gap:6px;
      min-width:180px;
    ">
      <div style="display:flex; gap:10px; align-items:center;">
        <span style="font-weight:800;">Level ${t.level}</span>
        <span style="opacity:.8;">${e} XP</span>
      </div>

      <div style="
        width:180px;
        height:10px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
        border:1px solid rgba(255,255,255,.10);
      ">
        <div style="
          height:100%;
          width:${Math.max(0,Math.min(100,t.pct)).toFixed(1)}%;
          background:rgba(80, 220, 160, .85);
        "></div>
      </div>

      <div style="font-size:12px; opacity:.7;">
        Next level at ${t.nextAt} XP
      </div>
    </div>
  `}window.__cbsgo_xpbar_listener_added||(window.__cbsgo_xpbar_listener_added=!0,window.addEventListener("cbsgo:xpChanged",()=>{const e=document.querySelector("#xpMount");e&&(e.innerHTML=I())}));function D(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function gt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const X="cbsgo_player_name_v1",k="cbsgo_player_avatar_v1",B="cbsgo_leaderboard_v1",ft="cbsgo_xp";function R(e){const t=String(e||"").trim();return t?t.slice(0,24):"Sovereign"}function x(){try{return R(localStorage.getItem(X)||"Sovereign")}catch{return"Sovereign"}}function mt(e){const t=R(e);try{localStorage.setItem(X,t)}catch{}return t}function h(){try{return localStorage.getItem(k)||""}catch{return""}}function bt(e){try{localStorage.setItem(k,String(e||""))}catch{}}function yt(){try{localStorage.removeItem(k)}catch{}}function vt(){try{return Number(localStorage.getItem(ft)||0)||0}catch{return 0}}function xt(e){const t=Math.max(0,Number(e)||0);return t<100?1:t<250?2:t<450?3:t<700?4:5+Math.floor((t-700)/400)}function G(){try{const e=localStorage.getItem(B);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function ht(e){try{localStorage.setItem(B,JSON.stringify(e))}catch{}}function wt(e=10){const t=G();return t.sort((n,r)=>Number(r.xp||0)-Number(n.xp||0)),t.slice(0,e)}function St(){const e=x(),t=h(),n=vt(),r=xt(n),o=G(),i=o.findIndex(s=>String(s.name||"").toLowerCase()===e.toLowerCase()),a={name:e,avatar:t,xp:n,level:r,updatedAt:Date.now()};return i>=0?o[i]=a:o.push(a),o.sort((s,c)=>Number(c.xp||0)-Number(s.xp||0)),ht(o.slice(0,50)),a}function p(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function _t(e,t=22){const n=e?`background-image:url('${e}');`:"";return`
    <span style="
      width:${t}px;height:${t}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${n}
      background-size:cover;
      background-position:center;
      display:inline-flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:12px;
      flex:0 0 auto;
    ">${e?"":"★"}</span>
  `}function K(e){return[...e].sort((t,n)=>String(t.id||"").localeCompare(String(n.id||"")))}const Et=[{x:28,y:54},{x:58,y:40},{x:76,y:58},{x:40,y:26},{x:66,y:72},{x:22,y:32},{x:82,y:34}];function P(e){const t=String(e||"");let n=2166136261;for(let r=0;r<t.length;r++)n^=t.charCodeAt(r),n=Math.imul(n,16777619);return(n>>>0)%1e4/1e4}function $t(e){const t=K(e),n={};for(let r=0;r<t.length;r++){const o=t[r],i=Et[r];if(i){n[o.id]={x:i.x,y:i.y};continue}const a=P(o.id+":x"),s=P(o.id+":y"),c=12+Math.floor(a*70),d=18+Math.floor(s*60);n[o.id]={x:c,y:d}}return n}function At(e,t,n){const r=e.color||"#35d07f";return`
    <button
      type="button"
      class="mapPin"
      data-node-id="${p(e.id)}"
      title="${p(e.name)}"
      style="
        position:absolute;
        left:${t}%;
        top:${n}%;
        transform:translate(-50%,-50%);
        cursor:pointer;
        border:0;
        background:transparent;
        padding:0;
      "
    >
      <span style="
        display:inline-flex;
        align-items:center;
        gap:10px;
        padding:10px 14px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(0,0,0,.18);
        box-shadow:0 12px 26px rgba(0,0,0,.35);
        backdrop-filter: blur(6px);
      ">
        <span style="
          width:12px;height:12px;border-radius:999px;
          background:${r};
          box-shadow:0 0 0 6px rgba(255,255,255,.05);
          flex:0 0 auto;
        "></span>
        <span style="color:#fff; font-size:13px; white-space:nowrap;">
          ${p(e.name)}
        </span>
      </span>
    </button>
  `}function kt(){const e=x()||"You",t=h();return`
    <div style="
      position:absolute;
      left:50%;
      top:86%;
      transform:translate(-50%,-50%);
      display:flex;
      align-items:center;
      gap:10px;
      padding:10px 14px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(0,0,0,.18);
      box-shadow:0 12px 26px rgba(0,0,0,.35);
      backdrop-filter: blur(6px);
      pointer-events:none;
    ">
      ${_t(t,22)}
      <span style="color:#fff; font-size:13px; white-space:nowrap;">
        ${p(e)}
      </span>
    </div>
  `}function Mt(){const e=x()||"You",t=l.filter(r=>r.type!=="group"),n=$t(t);return`
    <section class="mapCard" style="
      margin-top:14px;
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.03);
    ">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:18px; font-weight:700; margin:0;">Map</div>
          <div style="opacity:.75; font-size:13px;">Fake map for now (next: GPS + real map)</div>
          <div style="opacity:.75; font-size:13px; margin-top:6px;">Tip: click a pin to open the node.</div>
        </div>
        <div style="opacity:.75; font-size:13px;">You: <b style="opacity:1">${p(e)}</b></div>
      </div>

      <div id="fakeMap" style="
        position:relative;
        margin-top:12px;
        width:100%;
        height:420px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.10);
        overflow:hidden;
        background:
          radial-gradient(circle at 15% 20%, rgba(18, 97, 66,.35), transparent 45%),
          radial-gradient(circle at 70% 30%, rgba(98, 69, 160,.28), transparent 48%),
          radial-gradient(circle at 40% 85%, rgba(255, 216, 107,.12), transparent 50%),
          linear-gradient(135deg, rgba(0,0,0,.25), rgba(0,0,0,.55));
      ">
        <!-- grid -->
        <div style="
          position:absolute; inset:0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size:40px 40px;
          opacity:.35;
          pointer-events:none;
        "></div>

        ${K(t).map(r=>{const o=n[r.id]||{x:50,y:50};return At(r,o.x,o.y)}).join("")}

        ${kt()}
      </div>
    </section>
  `}function Nt(){const t=(document.querySelector("#mapMount")||document).querySelector("#fakeMap");t&&(t.__cbsgo_map_bound||(t.__cbsgo_map_bound=!0,t.addEventListener("click",n=>{const o=n.target?.closest?.("[data-node-id]");if(!o)return;const i=o.getAttribute("data-node-id");i&&(console.log("[MAP CLICK]",{id:i,name:o.getAttribute("title")||""}),window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:i}})))})))}const Y="cbsgo_xp",j="cbsgo_steps_v1",H="cbsgo_tickets_v1",W="cbsgo_drops_v1",_="cbsgo_last_spawn_steps_v1",Ct="cbsgo_gps_debug_v1";let F=!1,g=null;const Pt=.78,Lt=3,zt=20,Tt=3;function w(e,t=0){try{const n=Number(localStorage.getItem(e));return Number.isFinite(n)?n:t}catch{return t}}function u(e,t){try{localStorage.setItem(e,String(t))}catch{}}function Ot(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function qt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function m(e){try{localStorage.setItem(Ct,JSON.stringify(e))}catch{}}function It(){return w(Y,0)}function Dt(e){u(Y,It()+Number(e||0)),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged"))}function J(){return w(j,0)}function Xt(e){u(j,e),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged"))}function U(){return w(H,0)}function Bt(e){u(H,U()+Number(e||0)),window.dispatchEvent(new CustomEvent("cbsgo:ticketsChanged"))}function M(){const e=Ot(W,[]);return Array.isArray(e)?e:[]}function V(e){qt(W,e),window.dispatchEvent(new CustomEvent("cbsgo:dropsChanged"))}function Rt(){if(Math.random()<.3)return{id:"drop_"+crypto.randomUUID(),type:"ticket",value:1,label:"🎟️ Ticket Found",createdAt:Date.now()};const t=5+Math.floor(Math.random()*16);return{id:"drop_"+crypto.randomUUID(),type:"xp",value:t,label:`✨ XP Drop (+${t})`,createdAt:Date.now()}}function Gt(e){const t=w(_,0);if(e<t+zt)return;const n=M();if(n.length>=Tt){u(_,e);return}V([...n,Rt()]),u(_,e)}function Kt(e){const t=M(),n=t.find(r=>r.id===e);return n?(n.type==="xp"&&Dt(n.value),n.type==="ticket"&&Bt(n.value),V(t.filter(r=>r.id!==e)),n):null}function f(e){return e*Math.PI/180}function Yt(e,t){const r=f(t.lat-e.lat),o=f(t.lng-e.lng),i=f(e.lat),a=f(t.lat),s=Math.sin(r/2)**2+Math.cos(i)*Math.cos(a)*Math.sin(o/2)**2;return 2*6371e3*Math.asin(Math.sqrt(s))}function jt(e){const t=e.coords.latitude,n=e.coords.longitude,r=e.coords.accuracy;m({t:Date.now(),lat:t,lng:n,acc:r});const o={lat:t,lng:n};if(!g){g=o;return}const i=Yt(g,o);if(i<Lt)return;g=o;const a=Math.max(1,Math.floor(i/Pt)),s=J()+a;Xt(s),Gt(s)}async function Ht(){return navigator.geolocation?(F=!0,m({t:Date.now(),msg:"watchPosition started"}),navigator.geolocation.watchPosition(jt,e=>{m({t:Date.now(),err:e?.message||String(e),code:e?.code}),window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:15e3}),{ok:!0}):(m({t:Date.now(),err:"Geolocation not supported"}),{ok:!1,reason:"GPS not supported on this device."})}function Wt(){return F}function E(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ft(){try{const e=localStorage.getItem("cbsgo_gps_debug_v1");return e?JSON.parse(e):null}catch{return null}}function Z(){const e=J(),t=U(),n=M(),r=Wt(),o=Ft();return`
    <section style="
      margin-top:14px;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div>
          <div style="font-weight:800; font-size:15px;">Steps & Drops</div>
          <div style="opacity:.75; font-size:12px;">
            Uses GPS distance to estimate steps (Android-friendly).
          </div>
          <div style="opacity:.7; font-size:12px; margin-top:6px;">
            GPS Status: <b>${r?"ENABLED":"OFF"}</b>
            ${o?.t?` • last update: ${new Date(o.t).toLocaleTimeString()}`:""}
            ${o?.acc!=null?` • acc: ${Math.round(o.acc)}m`:""}
          </div>
          ${o?.err?`<div style="opacity:.85; font-size:12px; margin-top:6px;">⚠️ ${E(o.err)}</div>`:""}
        </div>

        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <div class="pill">Steps: <b>${e}</b></div>
          <div class="pill">Tickets: <b>${t}</b></div>
          <button id="enableStepsBtn" class="btn ${r?"secondary":""}" type="button">
            ${r?"GPS Steps Enabled":"Enable GPS Steps"}
          </button>
        </div>
      </div>

      <div style="margin-top:10px;">
        ${n.length===0?`
          <div style="opacity:.75; font-size:13px;">
            No drops yet. Enable GPS steps, then walk ~20 steps.
          </div>
        `:`
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${n.map(i=>`
              <div style="
                padding:10px;
                border-radius:14px;
                border:1px solid rgba(255,255,255,.10);
                background:rgba(0,0,0,.18);
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:10px;
              ">
                <div style="min-width:0;">
                  <div style="font-weight:700;">${E(i.label)}</div>
                  <div style="opacity:.7; font-size:12px;">Tap claim to collect.</div>
                </div>
                <button class="btn" data-claim-drop="${E(i.id)}" type="button">Claim</button>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    </section>
  `}function L(){const e=document.querySelector("#stepsMount")||document;if(!e)return;const t=e.querySelector("#enableStepsBtn");t&&!t.__bound&&(t.__bound=!0,t.addEventListener("click",async()=>{t.textContent="Enabling…";const n=await Ht();if(!n.ok){t.textContent="Enable GPS Steps",alert(n.reason||"Could not enable GPS steps.");return}window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))})),e.querySelectorAll("[data-claim-drop]").forEach(n=>{n.__bound||(n.__bound=!0,n.addEventListener("click",()=>{const r=n.getAttribute("data-claim-drop");Kt(r)&&window.dispatchEvent(new CustomEvent("cbsgo:rerenderSteps"))}))})}function z(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function A(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function b(){const e=wt(10),t=x(),n=h();return`
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
          ${A(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${z(t)}" maxlength="24" style="
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
                ${e.map((r,o)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${o+1}</div>
                      ${A(r.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${z(r.name)}
                        </div>
                        <div style="font-size:12px; opacity:.75;">
                          Level ${Number(r.level||1)}
                        </div>
                      </div>
                    </div>
                    <div style="opacity:.9; white-space:nowrap;">
                      ${Number(r.xp||0)} XP
                    </div>
                  </li>
                `).join("")}
              </ol>
            `}
      </div>
    </section>
  `}function y(){const e=document.querySelector("#lbMount"),t=document.querySelector("#lbName"),n=document.querySelector("#lbSubmit"),r=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let i=null;const a=c=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=c||"")};t&&a(`✅ Profile loaded: ${t.value}`);const s=()=>{if(!t)return;const c=mt(t.value);a(`✅ Name saved: ${c}`)};t&&(t.addEventListener("input",()=>{a("Saving…"),i&&clearTimeout(i),i=setTimeout(s,300)}),t.addEventListener("blur",()=>{i&&clearTimeout(i),s()})),r&&r.addEventListener("change",()=>{const c=r.files&&r.files[0];if(!c)return;if(c.size>15e5){a("❌ Image too large. Please choose a smaller photo (max ~1.5MB)."),r.value="";return}a("Uploading photo…");const d=new FileReader;d.onload=()=>{bt(String(d.result||"")),e&&(e.innerHTML=b()),y(),a("✅ Photo saved"),v()},d.onerror=()=>a("❌ Failed to read image."),d.readAsDataURL(c)}),o&&(o.onclick=()=>{yt(),e&&(e.innerHTML=b()),y(),a("✅ Photo removed"),v()}),n&&(n.onclick=()=>{t&&s();const c=St();e&&(e.innerHTML=b()),y(),a(`✅ Saved: ${c.name} – ${c.xp} XP`)})}function Q(){try{return sessionStorage.getItem("cbsgo_selected_tab_v1")||"nodes"}catch{return"nodes"}}function Jt(e){try{sessionStorage.setItem("cbsgo_selected_tab_v1",e)}catch{}}function Ut(){const e=Q(),t=(n,r)=>`
    <button class="btn secondary" type="button"
      data-tab="${n}"
      style="opacity:${e===n?"1":".75"};">
      ${r}
    </button>
  `;return`
    <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:10px;">
      ${t("nodes","Nodes")}
      ${t("map","Map")}
    </div>
  `}function Vt(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tab");Jt(t),v()})})}function Zt(e){const t=String(e||"").trim();if(!t)return null;let n=l.find(o=>o.id===t);if(n||(n=l.find(o=>(o.name||"").toLowerCase()===t.toLowerCase()),n))return n;const r=o=>String(o||"").toLowerCase().replace(/\s+/g," ").trim();return n=l.find(o=>r(o.name)===r(t)),n||null}function Qt(){const e=D(),t=h(),n=Q();return`
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-left" style="display:flex; gap:10px; align-items:center;">
          ${A(t,32)}
          <div>
            <h1 style="margin:0;">CBS GO</h1>
            <span class="tagline">Mind & Motion</span>
          </div>
        </div>

        <div class="topbar-right" id="xpMount">
          ${I()}
        </div>
      </header>

      <main class="main">
        <p>Welcome Sovereign 👋</p>
        <p>Explore the real world. Unlock Nodes. Solve puzzles.</p>

        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <button id="startBtn" type="button">Start Exploring</button>
          ${e?'<button id="resetBtn" class="btn secondary" type="button">Reset Demo (Hard)</button>':""}
        </div>

        ${e?'<p style="opacity:.65; font-size:12px; margin-top:8px;">Dev mode enabled (?dev=1)</p>':""}

        ${Ut()}

        <section id="tabNodes" style="display:${n==="nodes"?"block":"none"};">
          <div id="nodesMount" class="mount">
            ${q()}
          </div>

          <div id="stepsMount">
            ${Z()}
          </div>

          <aside id="lbMount">
            ${b()}
          </aside>
        </section>

        <section id="tabMap" style="display:${n==="map"?"block":"none"};">
          <div id="mapMount">
            ${Mt()}
          </div>
        </section>
      </main>
    </div>
  `}function v(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Qt(),Vt(),ct("#nodesMount"),y(),L(),Nt(),D()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",gt)}if(!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Z(),L())};window.addEventListener("cbsgo:rerenderSteps",t),window.addEventListener("cbsgo:stepsChanged",t),window.addEventListener("cbsgo:ticketsChanged",t),window.addEventListener("cbsgo:dropsChanged",t)}window.__cbsgo_openNode_listener_added||(window.__cbsgo_openNode_listener_added=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id??t?.detail?.name,r=Zt(n);r&&ot(r)}))}}console.log("ENV CHECK:","TEST_TOKEN");alert("ENV CHECK: TEST_TOKEN");v();document.getElementById("startBtn").addEventListener("click",()=>{alert("CBS GO coming online…")});
