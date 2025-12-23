(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const S=[{id:"stop-1",legacyId:"node-1",name:"Old Clock Tower",type:"puzzle",description:"A strange mechanism hides a code.",xp:50,question:"Type: cbs",hint:"Lowercase.",answers:["cbs"]},{id:"stop-2",legacyId:"node-2",name:"Abandoned Square",type:"group",requiredPlayers:5,description:"Requires multiple Sovereigns to unlock.",xp:150,question:"Type: unity",hint:"Lowercase.",answers:["unity"]},{id:"stop-3",legacyId:"node-3",name:"River Marker",type:"puzzle",description:"The water reflects the truth.",xp:80,question:"Type: sovereign",hint:"Lowercase.",answers:["sovereign"]}],V="cbsgo_state_v4";function ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function F(){return{xp:0,completed:{}}}function C(){try{return ae(localStorage.getItem(V),F())}catch{return F()}}function le(e){try{localStorage.setItem(V,JSON.stringify(e))}catch{}}function M(){return Number(C().xp||0)}function $(e){const t=String(e||"");return t?!!C().completed?.[t]:!1}function Y(e){return $(e)}function ce(e,t){const o=(Array.isArray(e)?e:[e]).map(a=>String(a||"")).filter(Boolean),i=Number(t||0);if(o.length===0)return{ok:!1,reason:"no_id",xp:M()};if(!Number.isFinite(i)||i<=0)return{ok:!1,reason:"bad_amount",xp:M()};const r=C();if(o.some(a=>!!r.completed?.[a]))return{ok:!1,reason:"already_completed",xp:Number(r.xp||0)};const s=Date.now();for(const a of o)r.completed[a]=s;return r.xp=Number(r.xp||0)+i,le(r),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:r.xp}})),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:o[0]}})),window.dispatchEvent(new CustomEvent("cbsgo:rerenderMap",{detail:{id:o[0]}})),{ok:!0,reason:"awarded",xp:r.xp}}function de(e){const t=Math.max(0,Number(e)||0);return Math.floor(t/100)+1}function pe(e){return Math.max(0,Number(e)||0)%100}function N(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function U(e){return String(e||"").toLowerCase().trim().replace(/\s+/g," ")}function ue(){let e=document.querySelector("#cbsgoModal");return e||(e=document.createElement("div"),e.id="cbsgoModal",e.style.position="fixed",e.style.inset="0",e.style.zIndex="9999",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="18px",e.style.background="rgba(0,0,0,.55)",e.addEventListener("click",t=>{t.target===e&&_()}),document.body.appendChild(e),e)}function _(){const e=document.querySelector("#cbsgoModal");e&&(e.style.display="none",e.innerHTML="")}function fe(e){return(Array.isArray(e?.answers)?e.answers:e?.answer?[e.answer]:[]).map(U).filter(Boolean)}function ge(e){const t=Number(e?.xp??e?.rewardXp??50);return Number.isFinite(t)?t:50}function W(e){const t=ue(),n=String(e?.id||""),o=String(e?.legacyId||""),i=[n,o].filter(Boolean),r=i.some(d=>$(d)),s=ge(e),a=fe(e),l=e?.question||e?.puzzle?.question||`Solve the node: ${e?.name||""}`,c=e?.hint||e?.puzzle?.hint||"";t.style.display="flex",t.innerHTML=`
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
          <div style="font-size:18px; font-weight:800;">${N(e?.name||"Node")}</div>
          <div style="opacity:.75; font-size:13px;">Reward: <b>${s} XP</b></div>
        </div>
        <button id="cbsgoClose" class="btn secondary" type="button">Close</button>
      </div>

      <div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.04);">
        <div style="font-size:14px; font-weight:700;">Question</div>
        <div style="margin-top:6px; opacity:.92; line-height:1.35;">${N(l)}</div>
        ${c?`<div style="margin-top:10px; font-size:13px; opacity:.8;"><b>Hint:</b> ${N(c)}</div>`:""}
      </div>

      ${r?`<div style="margin-top:12px; padding:12px; border-radius:14px; border:1px solid rgba(0,255,128,.20); background:rgba(0,255,128,.08);">
               ✅ Completed. This node can’t give XP again.
             </div>`:`
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
  `;const j=t.querySelector("#cbsgoClose");if(j&&(j.onclick=_),r)return;const B=t.querySelector("#cbsgoMsg"),b=t.querySelector("#cbsgoAnswer"),v=t.querySelector("#cbsgoSubmit"),y=d=>{B&&(B.textContent=d||"")};let D=!1;const G=()=>{if(D)return;const d=U(b?.value||"");if(a.length===0){y("⚠️ This node has no answers configured yet.");return}if(!a.includes(d)){y("❌ Not correct. Try again.");return}D=!0,v&&(v.disabled=!0);const X=ce(i,s);if(!X.ok){y(X.reason==="already_completed"?"✅ Already completed.":"❌ Could not award XP.");return}y(`✅ Correct! +${s} XP`),setTimeout(()=>_(),550)};v&&(v.onclick=G),b&&(b.addEventListener("keydown",d=>{d.key==="Enter"&&G()}),setTimeout(()=>b.focus(),50))}function Q(e){return(e?.name||e?.id||"").toString().trim().toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}const q="cbsgo_group_roles_v1";function me(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}const g=(()=>{const e="cbsgo_tab_id_v1";let t=sessionStorage.getItem(e);return t||(t=`${Date.now()}-${Math.random().toString(16).slice(2)}`,sessionStorage.setItem(e,t)),t})();function Z(){try{const e=localStorage.getItem(q);if(!e)return{};const t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function be(e){try{localStorage.setItem(q,JSON.stringify(e))}catch{}}function p(e){const n=Z()[e];return n&&typeof n=="object"?n:{}}function m(e,t){const n=Z();n[e]=t,be(n)}function P(e){const t=p(e),n=Object.entries(t).find(([,o])=>o===g);return n?n[0]:null}function ee(e){const t=p(e),n=["A","B","C","D","E"];let o=0;for(const i of n)t[i]&&o++;return o}function te(e){const t=["A","B","C","D","E"],n=p(e),o=Object.entries(n).find(([,r])=>r===g);if(o)return o[0];const i=t.find(r=>!n[r]);return i?(n[i]=g,m(e,n),i):null}function ve(e){const t=p(e);let n=!1;for(const[o,i]of Object.entries(t))i===g&&(delete t[o],n=!0);n&&m(e,t)}function ye(e){const t=["A","B","C","D","E"],n=p(e);let o=P(e);o||(o=te(e),o||(n.A=g,o="A",m(e,n)));const i=p(e);for(const r of t)r!==o&&(i[r]=i[r]||`DEV_${r}`);return m(e,i),o}function xe(e){m(e,{})}const u={joinedGroupNodeIds:new Set};function f(e){const t=document.querySelector(e);t&&(t.innerHTML=ne(),oe(e))}function he(e){if(u.joinedGroupNodeIds.has(e)){u.joinedGroupNodeIds.delete(e),ve(e),f("#nodesMount");return}if(!te(e)){alert("This group is full (roles A–E already taken).");return}u.joinedGroupNodeIds.add(e),f("#nodesMount")}function J(e){return Y(Q(e))?'<span class="pill ok">✅ Completed</span>':""}function we(e){const t=Y(Q(e));if(e.type==="group"){const o=e.requiredPlayers??5,i=ee(e.id),r=i>=o,s=u.joinedGroupNodeIds.has(e.id),a=e.xp??150,l=P(e.id),c=me();return`
      <li class="node group">
        <div class="node-row">
          <div class="node-main">
            <strong>${e.name}</strong>
            <small>${e.description}</small>

            <div class="meta">
              <span class="badge">👥 Group Node</span>
              <span class="pill">Players: ${i}/${o}</span>
              <span class="pill ${r?"ok":""}">
                ${r?"Unlocked":"Locked"}
              </span>
              <span class="pill">XP: ${a} (Group)</span>
              ${l?`<span class="pill ok">Role: ${l}</span>`:""}
              ${J(e)}
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
              ${s?"Leave":"Join"}
            </button>

            ${r?`<button class="btn" data-action="open" data-id="${e.id}">
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
            ${J(e)}
          </div>
        </div>

        <div class="node-actions">
          <button class="btn" data-action="open" data-id="${e.id}">
            ${t?"Replay":"Open"}
          </button>
        </div>
      </div>
    </li>
  `}function ne(){return`
    <section class="nodes">
      <h2>Nearby Nodes</h2>
      <ul class="node-list">
        ${S.map(we).join("")}
      </ul>
    </section>
  `}function oe(e="#nodesMount"){const t=document.querySelector(e);t&&(window.addEventListener("storage",n=>{n.key===q&&f("#nodesMount")}),t.addEventListener("click",n=>{const o=n.target.closest("button[data-action]");if(!o)return;const i=o.dataset.action,r=o.dataset.id;if(i==="join"){he(r);return}if(i==="devClear"){xe(r),f("#nodesMount");return}if(i==="devFill"){ye(r),u.joinedGroupNodeIds.add(r),f("#nodesMount");return}if(i==="open"){const s=S.find(a=>a.id===r);if(!s)return;if(s.type==="group"){const a=s.requiredPlayers??5,l=ee(s.id);if(l<a){alert(`This Group Node requires ${a} players.
Currently: ${l}/${a}`);return}if(!P(s.id)){alert("Join this Group Node first to receive a role (A–E).");return}}W(s)}}))}function Se(){const e=M(),t=de(e),n=pe(e),o=Math.min(100,Math.max(0,Number(n)||0));return`
    <div class="xpbar">
      <div class="xpbar-top">
        <span class="xp-level">Level ${t}</span>
        <span class="xp-text">${n}/100 XP</span>
      </div>
      <div class="xpbar-track">
        <div class="xpbar-fill" style="width:${o}%"></div>
      </div>
    </div>
  `}function re(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function $e(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const k="cbsgo_leaderboard_v2",E="cbsgo_player_name_v1",T="cbsgo_player_avatar_v1",Ne="cbsgo_state_v1";function z(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n)??t:t}catch{return t}}function Ae(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Me(){const e=["Sovereign","Builder","Runner","Scout","Mapper","Guardian","Wanderer","Cipher"],t=Math.random().toString(16).slice(2,6).toUpperCase();return`${e[Math.floor(Math.random()*e.length)]}-${t}`}function R(){let e="";try{e=localStorage.getItem(E)||""}catch{}if(!e){e=Me();try{localStorage.setItem(E,e)}catch{}}return e}function _e(e){const t=String(e||"").trim().slice(0,24);if(!t)return R();try{localStorage.setItem(E,t)}catch{}return t}function I(){try{return localStorage.getItem(T)||""}catch{return""}}function ke(e){const t=String(e||"");try{localStorage.setItem(T,t)}catch{}return t}function Ee(){try{localStorage.removeItem(T)}catch{}}function Le(){const e=z(Ne,{}),t=Number(e?.xp??0),n=Number(e?.level??1);return{xp:Number.isFinite(t)?t:0,level:Number.isFinite(n)?n:1}}function ie(e){return(Array.isArray(e)?e:[]).map(n=>({name:String(n?.name??"").slice(0,24),xp:Number(n?.xp??0)||0,level:Number(n?.level??1)||1,avatar:String(n?.avatar??""),ts:Number(n?.ts??0)||0})).filter(n=>n.name.length>0)}function Ce(e=10){const t=ie(z(k,[]));return t.sort((n,o)=>o.xp-n.xp||o.level-n.level||o.ts-n.ts),t.slice(0,e)}function qe(){const{xp:e,level:t}=Le(),n=R(),o=I(),i={name:n,xp:e,level:t,avatar:o,ts:Date.now()},r=ie(z(k,[])),s=r.findIndex(a=>a.name===n);return s>=0?i.xp>=Number(r[s]?.xp??0)?r[s]=i:o&&o!==r[s].avatar&&(r[s]={...r[s],avatar:o,ts:Date.now()}):r.push(i),r.sort((a,l)=>l.xp-a.xp||l.level-a.level||l.ts-a.ts),Ae(k,r.slice(0,50)),i}function A(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function se(){return`
    <div class="mount" style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:800;">Map</div>
      <div style="opacity:.75; margin-top:4px;">Fake map for now (next: GPS + real map)</div>
      <div style="opacity:.75; margin-top:6px;">Tip: click a pin to open the node.</div>

      <div id="cbsgoFakeMap" style="
        margin-top:12px;
        height:420px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.10);
        background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.06), rgba(0,0,0,.25));
        position:relative;
        overflow:hidden;
      ">
        ${S.map((e,t)=>{const n=$(e.id),o=[{left:"10%",top:"60%"},{left:"40%",top:"35%"},{left:"70%",top:"58%"},{left:"52%",top:"80%"}],i=o[t%o.length];return`
            <button
              type="button"
              class="cbsgo-pin"
              data-node-id="${A(e.id)}"
              style="
                position:absolute;
                left:${i.left}; top:${i.top};
                transform:translate(-50%, -50%);
                padding:10px 12px;
                border-radius:999px;
                border:1px solid rgba(255,255,255,.14);
                background:${n?"rgba(0,255,128,.12)":"rgba(255,255,255,.06)"};
                color:#fff;
                cursor:pointer;
              "
              title="${A(e.description||"")}"
            >
              ${n?"✅":"📍"} ${A(e.name)}
            </button>
          `}).join("")}
      </div>
    </div>
  `}function H(){const e=document.querySelector("#cbsgoFakeMap");e&&e.dataset.bound!=="1"&&(e.dataset.bound="1",e.addEventListener("click",t=>{const n=t.target.closest(".cbsgo-pin");if(!n)return;const o=n.getAttribute("data-node-id");o&&(console.log("[MAP CLICK]",{id:o}),window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:o}})))}))}function K(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function L(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function x(){const e=Ce(10),t=R(),n=I();return`
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
          ${L(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${K(t)}" maxlength="24" style="
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
                ${e.map((o,i)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${i+1}</div>
                      ${L(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${K(o.name)}
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
  `}function h(){const e=document.querySelector("#lbMount"),t=document.querySelector("#lbName"),n=document.querySelector("#lbSubmit"),o=document.querySelector("#lbAvatar"),i=document.querySelector("#lbRemoveAvatar");let r=null;const s=l=>{const c=document.querySelector("#lbMsg");c&&(c.textContent=l||"")};t&&s(`✅ Profile loaded: ${t.value}`);const a=()=>{if(!t)return;const l=_e(t.value);s(`✅ Name saved: ${l}`)};t&&(t.addEventListener("input",()=>{s("Saving…"),r&&clearTimeout(r),r=setTimeout(a,300)}),t.addEventListener("blur",()=>{r&&clearTimeout(r),a()})),o&&o.addEventListener("change",()=>{const l=o.files&&o.files[0];if(!l)return;if(l.size>15e5){s("❌ Image too large. Please choose a smaller photo (max ~1.5MB)."),o.value="";return}s("Uploading photo…");const c=new FileReader;c.onload=()=>{ke(String(c.result||"")),e&&(e.innerHTML=x()),h(),s("✅ Photo saved"),w()},c.onerror=()=>s("❌ Failed to read image."),c.readAsDataURL(l)}),i&&(i.onclick=()=>{Ee(),e&&(e.innerHTML=x()),h(),s("✅ Photo removed"),w()}),n&&(n.onclick=()=>{t&&a();const l=qe();e&&(e.innerHTML=x()),h(),s(`✅ Saved: ${l.name} – ${l.xp} XP`)})}function O(){try{return sessionStorage.getItem("cbsgo_selected_tab_v1")||"nodes"}catch{return"nodes"}}function Pe(e){try{sessionStorage.setItem("cbsgo_selected_tab_v1",e)}catch{}}function Te(){const e=O(),t=(n,o)=>`
    <button class="btn secondary" type="button"
      data-tab="${n}"
      style="opacity:${e===n?"1":".75"};">
      ${o}
    </button>
  `;return`
    <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:10px;">
      ${t("nodes","Nodes")}
      ${t("map","Map")}
    </div>
  `}function ze(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tab");Pe(t),w()})})}function Re(){const e=re(),t=I(),n=O();return`
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-left" style="display:flex; gap:10px; align-items:center;">
          ${L(t,32)}
          <div>
            <h1 style="margin:0;">CBS GO</h1>
            <span class="tagline">Mind & Motion</span>
          </div>
        </div>

        <div class="topbar-right" id="xpMount">
          ${Se()}
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

        ${Te()}

        <section id="tabNodes" style="display:${n==="nodes"?"block":"none"};">
          <div id="nodesMount" class="mount">
            ${ne()}
          </div>
          <aside id="lbMount">
            ${x()}
          </aside>
        </section>

        <section id="tabMap" style="display:${n==="map"?"block":"none"};">
          <div id="mapMount">
            ${se()}
          </div>
        </section>
      </main>
    </div>
  `}function w(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Re(),ze(),oe("#nodesMount"),h(),H(),re()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",$e)}if(window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n||$(n))return;const o=S.find(i=>i.id===n);o&&W(o)})),!window.__cbsgo_rerender_map_listener){window.__cbsgo_rerender_map_listener=!0;const t=()=>{if(O()!=="map")return;const o=document.querySelector("#mapMount");o&&(o.innerHTML=se(),H())};window.addEventListener("cbsgo:rerenderMap",t),window.addEventListener("cbsgo:nodeCompleted",t)}}}w();document.getElementById("startBtn").addEventListener("click",()=>{alert("CBS GO coming online…")});
