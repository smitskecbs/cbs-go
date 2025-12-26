(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Ie="modulepreload",Ae=function(e){return"/cbs-go/"+e},K={},Ce=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let d=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=d;document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),a=c?.nonce||c?.getAttribute("nonce");r=d(n.map(l=>{if(l=Ae(l),l in K)return;K[l]=!0;const u=l.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Ie,u||(p.as="script"),p.crossOrigin="",p.href=l,a&&p.setAttribute("nonce",a),document.head.appendChild(p),u)return new Promise((m,b)=>{p.addEventListener("load",m),p.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(c){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=c,window.dispatchEvent(a),!a.defaultPrevented)throw c}return r.then(c=>{for(const a of c||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},ne=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],oe="cbsgo_state_v6";function $e(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Te(){return{xp:0,completed:{},updatedAt:Date.now()}}function S(){const e=localStorage.getItem(oe);return $e(e,Te())}function re(e){e.updatedAt=Date.now(),localStorage.setItem(oe,JSON.stringify(e))}function ie(e){return 100+(Math.max(1,Number(e||1))-1)*40}function A(){return Number(S().xp||0)}function O(){const e=A();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function se(){const e=A();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function C(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();return n.xp=Number(n.xp||0)+t,re(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:O()}})),n}function F(e){const t=String(e||"");if(!t)return!1;const n=S();return!!(n.completed&&n.completed[t])}function ae(e){const t=String(e||"");if(!t)return;const n=S();n.completed||(n.completed={}),n.completed[t]=Date.now(),re(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const De=Object.freeze(Object.defineProperty({__proto__:null,addXp:C,completeNode:ae,getLevel:O,getXp:A,getXpIntoLevel:se,isNodeCompleted:F},Symbol.toStringTag,{value:"Module"})),ce="cbsgoPuzzleModal";function X(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function W(){const e=document.getElementById(ce);e&&e.remove()}function J(e){W();const t=document.createElement("div");t.id=ce,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
    <div style="
      width:min(420px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(10,12,18,.96);
      box-shadow:0 18px 60px rgba(0,0,0,.65);
      overflow:hidden;
    ">
      <div style="
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.12);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      ">
        <div style="font-weight:900; font-size:15px;">
          ${X(n)}
        </div>
        <button type="button" id="cbsgoPuzzleClose" style="
          padding:6px 10px;
          border-radius:12px;
          border:0;
          background:rgba(255,255,255,.10);
          color:#fff;
          font-size:13px;
        ">Close</button>
      </div>

      <div style="padding:14px 16px;">
        <div style="font-size:13px; opacity:.9; margin-bottom:10px;">
          ${X(o)}
        </div>

        <div style="
          margin-top:10px;
          font-size:12px;
          opacity:.75;
        ">
          Voor nu kun je gewoon stappen zetten, XP verdienen en tickets sparen.
        </div>

        <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" id="cbsgoPuzzleOk" style="
            flex:1;
            padding:10px 12px;
            border-radius:16px;
            border:0;
            background:rgba(34,197,94,.25);
            color:#fff;
            font-weight:900;
            font-size:14px;
          ">
            Oke, terug naar map
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{W()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&ae(e.id),C(5)}catch{}s()})}function V(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Be(){const e=Number(A()||0),t=Number(O()||1),n=Number(se()||0),o=V(n,0,100),r=V(o/100*100,0,100);return`
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
  `}const le="cbsgo_inventory_v1";function Re(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Oe(){return{tickets:0}}function D(){const e=localStorage.getItem(le);return Re(e,Oe())}function Fe(e){localStorage.setItem(le,JSON.stringify(e))}function de(){return Number(D().tickets||0)}function q(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return D();const n=D();return n.tickets=Number(n.tickets||0)+t,Fe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ue="cbsgo_steps_v6",qe="cbsgo_gps_autostart_v2",pe="cbsgo_daily_puzzle_v1",je=.75,Ge=200,He=.3,Ue=400,Ye=20,$=1500,T=200,Ke=.25,Xe=.05,We=.3;let E=null,L=!1,h={msg:"init"};function Je(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ve(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function k(){const e=localStorage.getItem(ue);return Je(e,Ve())}function fe(e){e.updatedAt=Date.now(),localStorage.setItem(ue,JSON.stringify(e))}function z(){return Number(k().steps||0)}function N(){return!!L}function Ze(){return h}function j(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Qe(){try{return localStorage.getItem(pe)===j()}catch{return!1}}function et(){try{localStorage.setItem(pe,j())}catch{}}function tt(e,t){return Qe()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:j()}})),et(),!0)}function Z(){const e=k(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function nt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<$)return;const i=Math.floor(r/$);i<=0||(q(i),e.boostLastStep=n+i*$)}function ot(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<T){e.chestMeters=t;return}let n=0;for(;t>=T&&n<5;)if(t-=T,n+=1,Math.random()<Ke){const o=Math.random()<Xe,r=o?10:3,i=o?2:1;C(r),q(i);const s=o&&Math.random()<We;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function rt(e,t){const o=d=>d*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),c=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(c)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function it(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,C(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,q(1))}function st(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return k();const n=k();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/je);return o>n.steps&&(n.steps=o),it(n),nt(n),ot(n),fe(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function at(){E!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(E),E=null}async function Q(e={}){const t=!!e.silent;if(!navigator.geolocation)return h={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(qe,"1")}catch{}at(),L=!0,h={msg:"requesting",t:Date.now()};try{return E=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),c=k(),a=c.lastPos;c.lastPos={lat:o,lng:r,t:s},fe(c);const d=Number.isFinite(n.coords.heading)?n.coords.heading:null,l=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:d,speed:l,t:s}})),i>Ge){h={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:z()}}));return}tt(o,r);let u=0,f=0,p=0,m=0,b="no-last";a&&typeof a.lat=="number"&&typeof a.lng=="number"&&typeof a.t=="number"&&(u=rt({lat:a.lat,lng:a.lng},{lat:o,lng:r}),f=Math.max(1,(s-a.t)/1e3),p=u/f,u<He?b="jitter":u>Ue?b="teleport":p>Ye?b="too-fast":(st(u),m=u,b="ok")),h={lat:o,lng:r,acc:i,t:s,dist:Math.round(u),dt:Math.round(f),speed:Number(p.toFixed(2)),added:Math.round(m),reason:b,boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:z()}}))},n=>{L=!1,h={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:z()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return L=!1,h={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ct(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>N()||await Q({silent:!0}))();const t=async()=>{N()||await Q({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function lt(){const e=Ze();return e?.err?"🔴":e?.lat&&N()?"🟢":N()?"🟡":"⚪"}function ge(){const e=z(),t=de();return`
    <div style="
      /* weer normaal: dicht onder de XP-balk */
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
      <span style="opacity:.9;">${lt()} <b>${Number(e||0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function me(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function dt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const be="cbsgo_player_name_v2",G="cbsgo_player_avatar_v2";function ye(){try{return localStorage.getItem(be)||"Sovereign"}catch{return"Sovereign"}}function ut(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(be,t)}catch{}return t}function he(){try{return localStorage.getItem(G)||""}catch{return""}}function pt(e){const t=String(e||"");try{localStorage.setItem(G,t)}catch{}return t}function ft(){try{localStorage.removeItem(G)}catch{}}let g=null,_=null,y=null,v=null;const B="cbsgo_nodes_pos_v3",xe="cbsgo_daily_marker_v1";function P(e){return document.getElementById(e)}function x(e){const t=P("cbsgoMapHost");if(!t)return;let n=P("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="48px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function gt(){const e=String(ye()||"").trim();return e?e[0].toUpperCase():"🙂"}function mt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ve(e,t){const o=d=>d*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),c=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(c)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function we(){return new Date().toISOString().slice(0,10)}function H(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function _e(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Se(){return ne.filter(e=>e.type!=="group"&&!F(e.id))}function bt(e){const t=he();if(t){const r=`
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
    ">${mt(gt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function yt(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"}; 
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function ht(e){return e.divIcon({html:`
    <div style="
      width:52px;height:52px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 22px rgba(120,220,255,.70), 0 0 40px rgba(120,220,255,.35), 0 12px 26px rgba(0,0,0,.40);
      font-size:22px;
    ">
      ✨🧩
    </div>
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function xt(e){const t=H(B,null);if(t&&t.seed&&t.posById)return t;const n=Se(),o={},r=[],i=90,s=180,c=520,a=5e3;function d(f,p,m){const b=p*Math.cos(m)/111111,w=p*Math.sin(m)/(111111*Math.cos(f*Math.PI/180));return{dLat:b,dLng:w}}let l=0;for(const f of n){let p=!1;for(;!p&&l<a;){l++;const m=s+Math.random()*(c-s),b=Math.random()*Math.PI*2,w=d(e.lat,m,b),Y={lat:e.lat+w.dLat,lng:e.lng+w.dLng};p=r.every(Pe=>ve(Pe,Y)>=i),p&&(r.push(Y),o[f.id]={dLat:w.dLat,dLng:w.dLng})}if(!o[f.id]){const m=d(e.lat,s,Math.random()*Math.PI*2);o[f.id]={dLat:m.dLat,dLng:m.dLng}}}const u={seed:e,posById:o,createdAt:Date.now()};return _e(B,u),u}function vt(e,t){const n=H(B,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function wt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>
    </div>
  `}function _t(){try{g&&(g.remove(),g=null,_=null,y=null,v=null)}catch{}}function St(){const e=window.L,t=P("cbsgoMap");if(!e||!t)return!1;_t();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return g=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(g),g.setView([51.687,4.87],16),y=e.layerGroup().addTo(g),!0}function kt(e){const t=window.L;if(!t||!g)return;const n=bt(t);if(!_){_=t.marker(e,{icon:n}).addTo(g),g.setView(e,18);return}_.setIcon(n),_.setLatLng(e)}function Mt(e){const t=window.L;if(!t||!g||!y)return;const n=v;y.clearLayers(),n&&(v=n,v.addTo(y));const o=xt(e),r=Se(),i=65,s=1600,c=[];for(const a of r){const d=vt(a,o.seed);if(!d)continue;const l=Math.round(ve(e,d));l>s||c.push({node:a,ll:d,dist:l})}c.sort((a,d)=>a.dist-d.dist),c.forEach(({node:a,ll:d,dist:l})=>{const u=t.marker([d.lat,d.lng],{icon:yt(t,l<=i)});u.on("click",()=>{if(l>i){alert(`Too far.

Go closer to open:
${a.name}
Distance: ${l}m
Required: ≤ ${i}m`);return}window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:a.id}}))}),u.addTo(y)})}function Et(){return H(xe,{date:"",shown:!1})}function ke(e){_e(xe,e)}function Me(e){const t=window.L;if(!t||!g||!y)return;const n=Et(),o=we();n.date===o&&n.shown===!1||(n.date!==o&&ke({date:o,shown:!0}),!v&&(v=t.marker([e.lat,e.lng],{icon:ht(t)}).addTo(y),v.on("click",()=>{window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:"__daily__"}}))}),x("✨ Daily Glow puzzle spawned on you (1x/day). Tap it to play.")))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(ke({date:we(),shown:!0}),g&&window.L&&y&&Me({lat:t.lat,lng:t.lng}))}));function Lt(){!navigator.geolocation||!g||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};kt([t,n]),Me(r),Mt(r),x(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{x(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function zt(){let e=0;const t=120,n=()=>{if(e++,!P("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(x("Loading map engine…"),e<t)return setTimeout(n,100);x("Map engine failed to load (Leaflet not found). Refresh.");return}if(!St()){x("Could not init map. Refresh.");return}x("Loading GPS…"),Lt()};n()}function Ee(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nt(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function U(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function R(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function ee(e,t){return`
    <div style="
      position:fixed;
      left:0; right:0;
      bottom:0;
      z-index:6500;
      padding:12px 12px calc(16px + env(safe-area-inset-bottom));
      pointer-events:none;
    ">
      <div style="
        pointer-events:auto;
        width:min(860px, 96vw);
        margin:0 auto;
        border-radius:22px;
        /* 🔧 buitenste rand + achtergrond transparanter gemaakt */
        border:1px solid rgba(255,255,255,.30);
        background:rgba(10,12,18,.30);
        backdrop-filter: blur(14px);
        box-shadow:0 18px 60px rgba(0,0,0,.55);
        overflow:hidden;
      ">
        <div style="
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 16px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-weight:900; font-size:15px;">${Ee(e)}</div>
          <button type="button" id="cbsgoClosePanel" style="
            border:0;
            padding:6px 10px;
            border-radius:999px;
            background:rgba(255,255,255,.1);
            color:#fff;
            font-size:12px;
          ">Close</button>
        </div>

        <div style="
          max-height: min(70vh, 560px);
          overflow:auto;
          padding:14px 16px 16px 16px;
        ">
          ${t}
        </div>
      </div>
    </div>
  `}function Pt(){const e=ye(),t=he();return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      /* 🔧 binnenste kaart transparanter (ongeveer 70% transparant) */
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Profile</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your nickname and avatar stay on this device only.
      </p>

      <div style="
        display:flex;
        gap:14px;
        align-items:center;
        flex-wrap:wrap;
      ">
        ${Nt(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Ee(e)}" maxlength="24" style="
            width:100%;
            margin-top:4px;
            padding:10px 10px;
            border-radius:12px;
            border:1px solid rgba(255,255,255,.14);
            background:rgba(255,255,255,.06);
            color:#fff;
          " placeholder="Your nickname"/>

          <div style="margin-top:12px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:4px;">Photo</div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="profileAvatar" type="file" accept="image/*" />
              <button class="btn secondary" id="profileRemoveAvatar" type="button">Remove photo</button>
            </div>
          </div>

          <div id="profileMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
        </div>
      </div>
    </section>
  `}function It(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const c=document.querySelector("#profileMsg");c&&(c.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=ut(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const c=new FileReader;c.onload=()=>{pt(String(c.result||"")),r("✅ Photo saved"),M()},c.onerror=()=>r("⛔ Failed to read image."),c.readAsDataURL(s)}),n&&(n.onclick=()=>{ft(),r("✅ Photo removed"),M()})}function At(){return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
      /* 🔧 zelfde transparantie als profile */
      background:rgba(8,10,16,.30);
    ">
      <h3 style="margin:0 0 8px 0; font-size:16px;">Bag</h3>
      <p style="margin:0 0 14px 0; font-size:12px; opacity:.75;">
        Your collected items in the real world.
      </p>

      <div style="
        display:flex;
        flex-wrap:wrap;
        gap:10px;
      ">
        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🎟️ Tickets: <b>${de()}</b>
        </div>
      </div>
    </section>
  `}function Le(){const e=U();return e==="profile"?ee("Profile",`<div id="profileMount">${Pt()}</div>`):e==="bag"?ee("Bag",`<div id="bagMount">${At()}</div>`):""}function Ct(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${wt()}
      </div>

      <!-- Header rechtsboven: XP + stappen -->
      <header style="
        position:absolute; top:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        flex-direction:column;
        align-items:flex-end;
        gap:8px;
        pointer-events:none;
      ">
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

        <div id="stepsMount" style="pointer-events:auto;">
          ${ge()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag, naast elkaar, NET boven GPS -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:112px;
        z-index:5000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
        <button type="button" data-panel="profile" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#fff;
        ">👤</button>

        <button type="button" data-panel="bag" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#fff;
        ">🎒</button>
      </div>

      <!-- Panel-root: alleen deze wordt gewisseld bij tabs -->
      <div id="panelRoot">
        ${Le()}
      </div>

      ${me()?`<button id="resetBtn" type="button" style="
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
  `}function M(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=Le(),U()==="profile"&&It();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{R("map"),M()})}function $t(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=U();R(n===t?"map":t||"map"),M()})})}function ze(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Ct(),$t(),zt(),ct(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=ge())};window.addEventListener("cbsgo:stepsChanged",t)}if(M(),me()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",dt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){J({id:"__daily__",name:"Daily Glow"});return}if(F(n))return;const o=ne.find(r=>r.id===n);o&&J(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&Ce(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>De);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),ze()})}))}}function Ne(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function I(e){const t=Ne();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";I(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{I(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function te(){try{if(!document.getElementById("app")){I("❌ #app not found in index.html");return}ze();const t=Ne();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){I(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",te,{once:!0}):te();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
