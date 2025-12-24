(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const le=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],de="cbsgo_state_v7";function ce(e){const t=Math.max(1,Number(e||1));if(t<=1)return 0;let n=0;for(let o=2;o<=t;o++)n+=80+o*20;return n}function pe(e){const t=Math.max(0,Number(e||0));let n=1;for(;ce(n+1)<=t;)n++;return n}function $e(){return{xp:0,level:1,completed:{},updatedAt:Date.now()}}function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function z(){const e=localStorage.getItem(de);return Ae(e,$e())}function ue(e){e.updatedAt=Date.now(),localStorage.setItem(de,JSON.stringify(e))}function G(){return Number(z().xp||0)}function Y(){const e=z(),t=Number(e.xp||0),n=pe(t),o=Number(e.level||1);return Math.max(1,o,n)}function Ce(){const e=G(),t=Y(),n=ce(t);return Math.max(0,e-n)}function Pe(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return z();const n=z();n.xp=Number(n.xp||0)+t;const o=pe(n.xp);return n.level=Math.max(Number(n.level||1),o,1),ue(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:n.level}})),n}function fe(e){const t=String(e||"").trim();if(!t)return!1;const n=z();return!!(n.completed&&n.completed[t])}function Te(e){const t=String(e||"").trim();if(!t)return z();const n=z();return n.completed||(n.completed={}),n.completed[t]=!0,ue(n),window.dispatchEvent(new CustomEvent("cbsgo:stateChanged",{detail:{type:"nodeCompleted",id:t}})),n}const ge="cbsgo_inventory_v1";function De(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Be(){return{tickets:0}}function q(){const e=localStorage.getItem(ge);return De(e,Be())}function Oe(e){localStorage.setItem(ge,JSON.stringify(e))}function be(){return Number(q().tickets||0)}function me(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return q();const n=q();return n.tickets=Number(n.tickets||0)+t,Oe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ye="cbsgo_steps_v6",Re="cbsgo_gps_autostart_v2",ve="cbsgo_daily_puzzle_v1",qe=.75,Fe=200,Ue=1.5,je=250,Ge=3.6,te=60,R=1500;let I=null,$=!1,k={msg:"init"};function Ye(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function He(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function E(){const e=localStorage.getItem(ye);return Ye(e,He())}function H(e){e.updatedAt=Date.now(),localStorage.setItem(ye,JSON.stringify(e))}function A(){return Number(E().steps||0)}function P(){return!!$}function Ke(){return k}function K(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Je(){try{return localStorage.getItem(ve)===K()}catch{return!1}}function Xe(){try{localStorage.setItem(ve,K())}catch{}}function We(e,t){return Je()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:K()}})),Xe(),!0)}function ne(){const e=E(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ve(e=te){const t=Number(e),n=(Number.isFinite(t)&&t>0?t:te)*60*1e3,o=E(),i=Date.now()+n;return o.boostUntil=Math.max(Number(o.boostUntil||0),i),o.boostLastStep=Number(o.steps||0),H(o),window.dispatchEvent(new CustomEvent("cbsgo:boostChanged",{detail:{boostUntil:o.boostUntil}})),{ok:!0,boostUntil:o.boostUntil}}function Ze(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<R)return;const i=Math.floor(r/R);i<=0||(me(i),e.boostLastStep=n+i*R)}function Qe(e,t){const o=p=>p*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),l=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(l)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function et(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,Pe(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,me(1))}function tt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return E();const n=E();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/qe);return o>n.steps&&(n.steps=o),et(n),Ze(n),H(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function nt(){I!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(I),I=null}async function oe(e={}){const t=!!e.silent;if(!navigator.geolocation)return k={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Re,"1")}catch{}nt(),$=!0,k={msg:"requesting",t:Date.now()};try{return I=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),l=E(),a=l.lastPos;l.lastPos={lat:o,lng:r,t:s},H(l);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,b=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:p,speed:b,t:s}})),i>Fe){k={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:ne()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:A()}}));return}We(o,r);let g=0,m=0,x=0,y=0,d="no-last";a&&typeof a.lat=="number"&&typeof a.lng=="number"&&typeof a.t=="number"&&(g=Qe({lat:a.lat,lng:a.lng},{lat:o,lng:r}),m=Math.max(1,(s-a.t)/1e3),x=g/m,g<Ue?d="jitter":g>je?d="teleport":x>Ge?d="too-fast":(tt(g),y=g,d="ok")),k={lat:o,lng:r,acc:i,t:s,dist:Math.round(g),dt:Math.round(m),speed:Number(x.toFixed(2)),added:Math.round(y),reason:d,boostMs:ne()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:A()}}))},n=>{$=!1,k={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:A()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return $=!1,k={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ot(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>P()||await oe({silent:!0}))();const t=async()=>{P()||await oe({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}const xe="cbsgoPuzzleModal",rt="__daily__";function it(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function L(){const e=document.getElementById(xe);e&&e.remove()}function st(){L();const e=document.createElement("div");e.id=xe,e.style.position="fixed",e.style.inset="0",e.style.zIndex="99999",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="16px",e.style.background="rgba(0,0,0,.62)",e.style.backdropFilter="blur(10px)",e.innerHTML=`
    <div style="
      width:min(720px, 96vw);
      max-height:min(82vh, 720px);
      overflow:auto;
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.55);
      color:#fff;
      font-family:system-ui, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
        position:sticky; top:0;
        background:rgba(10,12,18,.92);
        backdrop-filter: blur(10px);
        z-index:5;
      ">
        <div id="cbsgoPuzzleTitle" style="font-weight:900;">Puzzle</div>
        <button id="cbsgoPuzzleClose" type="button" style="
          border:0;
          padding:8px 10px;
          border-radius:12px;
          background:rgba(255,255,255,.08);
          color:#fff;
        ">Close</button>
      </div>

      <div id="cbsgoPuzzleBody" style="padding:14px;"></div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("#cbsgoPuzzleClose");return t&&(t.onclick=L),e.addEventListener("click",n=>{n.target===e&&L()}),window.addEventListener("keydown",n=>{n.key==="Escape"&&L()},{once:!0}),e}function at(e){const r=Array.from({length:25},()=>({mine:!1,revealed:!1,flagged:!1,n:0}));let i=0;for(;i<5;){const d=Math.floor(Math.random()*25);r[d].mine||(r[d].mine=!0,i++)}const s=(d,f)=>d*5+f,l=(d,f)=>d>=0&&f>=0&&d<5&&f<5;for(let d=0;d<5;d++)for(let f=0;f<5;f++){const h=s(d,f);if(r[h].mine)continue;let u=0;for(let c=-1;c<=1;c++)for(let w=-1;w<=1;w++){if(!c&&!w)continue;const Q=d+c,ee=f+w;l(Q,ee)&&r[s(Q,ee)].mine&&u++}r[h].n=u}const a=document.createElement("div"),p=document.createElement("div");p.style.marginBottom="10px",p.style.opacity=".85",p.style.fontSize="13px",p.innerHTML="Clear all safe tiles. <b>Win = 60 min Glow</b> (extra tickets while walking).",a.appendChild(p);const b=document.createElement("div");b.style.display="grid",b.style.gridTemplateColumns="repeat(5, 1fr)",b.style.gap="8px",b.style.userSelect="none",a.appendChild(b);const g=document.createElement("div");g.style.marginTop="12px",g.style.fontSize="13px",g.style.opacity=".9",a.appendChild(g);const m=d=>g.textContent=d||"";function x(){return r.filter(d=>d.revealed&&!d.mine).length}function y(){b.innerHTML="",x()>=20&&(m("✅ Glow cleared! Boost activated (60 min)."),e?.(),r.forEach(h=>h.revealed=!0));for(let h=0;h<25;h++){const u=r[h],c=document.createElement("button");c.type="button",c.style.aspectRatio="1 / 1",c.style.borderRadius="14px",c.style.border="1px solid rgba(255,255,255,.12)",c.style.background="rgba(255,255,255,.06)",c.style.color="#fff",c.style.fontWeight="900",c.style.fontSize="16px",c.style.display="flex",c.style.alignItems="center",c.style.justifyContent="center",c.style.boxShadow="0 10px 20px rgba(0,0,0,.25)",u.revealed?(c.style.background=u.mine?"rgba(255,80,80,.18)":"rgba(90,200,255,.18)",c.textContent=u.mine?"💥":u.n?String(u.n):""):u.flagged?c.textContent="🚩":c.textContent="",c.onclick=()=>{u.revealed||(u.flagged&&(u.flagged=!1),u.revealed=!0,u.mine?(r.forEach(w=>{w.mine&&(w.revealed=!0)}),m("⛔ Boom. Try again tomorrow (daily).")):m(""),y())},c.oncontextmenu=w=>(w.preventDefault(),u.revealed||(u.flagged=!u.flagged,y()),!1),b.appendChild(c)}}return m("Tip: long-press (or right-click) to flag."),y(),a}function lt(e){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-size:18px; font-weight:900;">${it(e?.name||"Puzzle")}</div>
      <div style="opacity:.8; font-size:13px; margin-top:6px;">
        Solve to mark this node as completed.
      </div>

      <button id="cbsgoSolveNode" type="button" style="
        margin-top:12px;
        width:100%;
        padding:12px 14px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(90,200,255,.18);
        color:#fff;
        font-weight:900;
      ">Solve</button>
    </div>
  `}function dt(e){const t=st(),n=t.querySelector("#cbsgoPuzzleTitle"),o=t.querySelector("#cbsgoPuzzleBody");if(e&&e.id===rt){if(n&&(n.textContent="Daily Glow Puzzle"),o){o.innerHTML="";const i=at(()=>{Ve(60),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged"))});o.appendChild(i)}return}n&&(n.textContent=e?.name?`Puzzle: ${e.name}`:"Puzzle"),o&&(o.innerHTML=lt(e));const r=document.getElementById("cbsgoSolveNode");r&&(r.onclick=()=>{e?.id&&window.dispatchEvent(new CustomEvent("cbsgo:completeNode",{detail:{id:e.id}})),L()})}function re(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function ct(){const e=Number(G()||0),t=Number(Y()||1),n=Number(Ce()||0),o=re(n,0,100),r=re(o/100*100,0,100);return`
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
  `}function pt(){const e=Ke();return e?.err?"🔴":e?.lat&&P()?"🟢":P()?"🟡":"⚪"}function he(){const e=A(),t=be();return`
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
      <span style="opacity:.9;">${pt()} <b>${Number(e||0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function we(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ut(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const F="cbsgo_leaderboard_v2",Se="cbsgo_player_name_v2",J="cbsgo_player_avatar_v2";function _e(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ft(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function X(){try{return localStorage.getItem(Se)||"Sovereign"}catch{return"Sovereign"}}function gt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Se,t)}catch{}return t}function O(){try{return localStorage.getItem(J)||""}catch{return""}}function bt(e){const t=String(e||"");try{localStorage.setItem(J,t)}catch{}return t}function mt(){try{localStorage.removeItem(J)}catch{}}function yt(e=10){const t=_e(F,[]);return Array.isArray(t)?t.slice(0,e):[]}function vt(){const e=X(),t=O(),n=G(),o=Y(),r=_e(F,[]),i=Array.isArray(r)?r:[],s=i.find(l=>l.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((l,a)=>Number(a.xp||0)-Number(l.xp||0)),ft(F,i),{name:e,xp:n,level:o,avatar:t}}let v=null,N=null,_=null,C=null;const U="cbsgo_nodes_pos_v3",ke="cbsgo_daily_marker_v1";function T(e){return document.getElementById(e)}function S(e){const t=T("cbsgoMapHost");if(!t)return;let n=T("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function xt(){const e=String(X()||"").trim();return e?e[0].toUpperCase():"🙂"}function ht(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Me(e,t){const o=p=>p*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),l=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(l)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function ze(){return new Date().toISOString().slice(0,10)}function W(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function Ee(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function V(){return le.filter(e=>e.type!=="group"&&!fe(e.id))}function wt(e){const t=O();if(t){const r=`
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
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${ht(xt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function St(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"};
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function _t(e){return e.divIcon({html:`
    <div style="
      width:52px;height:52px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 22px rgba(120,220,255,.70), 0 0 40px rgba(120,220,255,.35), 0 12px 26px rgba(0,0,0,.40);
      font-size:22px;
      position:relative;
    ">
      ✨🧩
    </div>
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function kt(e){const t=W(U,null);if(t&&t.seed&&t.posById)return t;const n=V(),o={},r=[],i=90,s=180,l=520,a=5e3;function p(m,x,y){const d=x*Math.cos(y)/111111,f=x*Math.sin(y)/(111111*Math.cos(m*Math.PI/180));return{dLat:d,dLng:f}}let b=0;for(const m of n){let x=!1;for(;!x&&b<a;){b++;const y=s+Math.random()*(l-s),d=Math.random()*Math.PI*2,f=p(e.lat,y,d),h={lat:e.lat+f.dLat,lng:e.lng+f.dLng};x=r.every(u=>Me(u,h)>=i),x&&(r.push(h),o[m.id]={dLat:f.dLat,dLng:f.dLng})}if(!o[m.id]){const y=p(e.lat,s,Math.random()*Math.PI*2);o[m.id]={dLat:y.dLat,dLng:y.dLng}}}const g={seed:e,posById:o,createdAt:Date.now()};return Ee(U,g),g}function Mt(e,t){const n=W(U,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function zt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function Et(){try{v&&(v.remove(),v=null,N=null,_=null,C=null)}catch{}}function Lt(){const e=window.L,t=T("cbsgoMap");return!e||!t?!1:(Et(),v=e.map(t,{zoomControl:!1,attributionControl:!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(v),v.setView([51.687,4.87],16),_=e.layerGroup().addTo(v),!0)}function Nt(e){const t=window.L;if(!t||!v)return;const n=wt(t);if(!N){N=t.marker(e,{icon:n}).addTo(v),v.setView(e,18);return}N.setIcon(n),N.setLatLng(e)}function It(e){const t=window.L;if(!t||!v||!_)return;_.clearLayers();const n=kt(e),o=V(),r=65,i=1600,s=[];for(const l of o){const a=Mt(l,n.seed);if(!a)continue;const p=Math.round(Me(e,a));p>i||s.push({node:l,ll:a,dist:p})}s.sort((l,a)=>l.dist-a.dist),s.length&&S(`Nearest puzzle: ${s[0].node.name} • ${s[0].dist}m (need ≤ ${r}m to open)`),s.forEach(({node:l,ll:a,dist:p})=>{const b=t.marker([a.lat,a.lng],{icon:St(t,p<=r)});b.on("click",()=>{if(p>r){alert(`Too far.

Go closer to open:
${l.name}
Distance: ${p}m
Required: ≤ ${r}m`);return}window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:l.id}}))}),b.addTo(_)})}function $t(){return W(ke,{date:"",shown:!1})}function Le(e){Ee(ke,e)}function Ne(e){const t=window.L;if(!t||!v||!_)return;const n=$t(),o=ze();n.date===o&&n.shown===!1||(n.date!==o&&Le({date:o,shown:!0}),!C&&(C=t.marker([e.lat,e.lng],{icon:_t(t)}).addTo(_),C.on("click",()=>{window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:"__daily__"}}))}),S("✨ Daily Glow puzzle spawned on you (1x/day). Tap it to play.")))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Le({date:ze(),shown:!0}),v&&window.L&&_&&Ne({lat:t.lat,lng:t.lng}))}));function At(){!navigator.geolocation||!v||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};Nt([t,n]),Ne(r),It(r),S(`GPS OK • accuracy ~${Math.round(o)}m • puzzles nearby: ${V().length}`)},e=>{S(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Ct(){let e=0;const t=120,n=()=>{if(e++,!T("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(S("Loading map engine…"),e<t)return setTimeout(n,100);S("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Lt()){S("Could not init map. Refresh.");return}S("Loading GPS…"),At()};n()}function D(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function j(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function Z(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function ie(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Pt(){const e=Z(),t=(n,o,r)=>`
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
      <div style="font-size:11px;">${D(o)}</div>
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
  `}function se(e,t){return`
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
          <div style="font-weight:900;">${D(e)}</div>
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
  `}function Tt(){const e=yt(10),t=X(),n=O();return`
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
          ${j(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${D(t)}" maxlength="24" style="
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
                      ${j(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${D(o.name)}
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
  `}function Dt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=l=>{const a=document.querySelector("#lbMsg");a&&(a.textContent=l||"")};e&&i(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const l=gt(e.value);i(`✅ Name saved: ${l}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(s,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),s()})),n&&n.addEventListener("change",()=>{const l=n.files&&n.files[0];if(!l)return;if(l.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const a=new FileReader;a.onload=()=>{bt(String(a.result||"")),i("✅ Photo saved"),M()},a.onerror=()=>i("⛔ Failed to read image."),a.readAsDataURL(l)}),o&&(o.onclick=()=>{mt(),i("✅ Photo removed"),M()}),t&&(t.onclick=()=>{e&&s();const l=vt();i(`✅ Saved: ${l.name} – ${l.xp} XP`),M()})}function Bt(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${be()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Ot(){const e=Z();return e==="profile"?se("Profile",`<div id="lbMount">${Tt()}</div>`):e==="bag"?se("Bag",`<div id="bagMount">${Bt()}</div>`):""}function Rt(){const e=we(),t=O();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${zt()}
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
          ${j(t,32)}
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
            ${ct()}
          </div>

          <div id="stepsMount">
            ${he()}
          </div>
        </div>
      </header>

      ${Pt()}
      ${Ot()}

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
  `}function qt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");ie(n||"map"),M()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{ie("map"),M()})}function M(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Rt(),qt(),Ct(),ot(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=he())};window.addEventListener("cbsgo:stepsChanged",n),window.addEventListener("cbsgo:boostChanged",n)}if(Z()==="profile"&&Dt(),we()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",ut)}window.__cbsgo_complete_node_listener_v1||(window.__cbsgo_complete_node_listener_v1=!0,window.addEventListener("cbsgo:completeNode",n=>{const o=n?.detail?.id;o&&(Te(o),M())})),window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||fe(o))return;const r=le.find(i=>i.id===o);r&&dt(r)}))}function Ie(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function B(e){const t=Ie();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";B(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{B(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ae(){try{if(!document.getElementById("app")){B("❌ #app not found in index.html");return}M();const t=Ie();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){B(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ae,{once:!0}):ae();
