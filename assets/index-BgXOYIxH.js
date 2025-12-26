(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const ve="modulepreload",we=function(e){return"/cbs-go/"+e},H={},_e=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let m=function(p){return Promise.all(p.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=m;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");r=m(n.map(p=>{if(p=we(p),p in H)return;H[p]=!0;const d=p.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${f}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":ve,d||(u.as="script"),u.crossOrigin="",u.href=p,l&&u.setAttribute("nonce",l),document.head.appendChild(u),d)return new Promise((S,g)=>{u.addEventListener("load",S),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return r.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},ke=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Z="cbsgo_state_v6";function Se(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ee(){return{xp:0,completed:{},updatedAt:Date.now()}}function w(){const e=localStorage.getItem(Z);return Se(e,Ee())}function Q(e){e.updatedAt=Date.now(),localStorage.setItem(Z,JSON.stringify(e))}function ee(e){return 100+(Math.max(1,Number(e||1))-1)*40}function L(){return Number(w().xp||0)}function D(){const e=L();let t=1,n=e;for(;;){const o=ee(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function te(){const e=L();let t=1,n=e;for(;;){const o=ee(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function A(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return w();const n=w();return n.xp=Number(n.xp||0)+t,Q(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:D()}})),n}function ne(e){const t=String(e||"");if(!t)return!1;const n=w();return!!(n.completed&&n.completed[t])}function oe(e){const t=String(e||"");if(!t)return;const n=w();n.completed||(n.completed={}),n.completed[t]=Date.now(),Q(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const ze=Object.freeze(Object.defineProperty({__proto__:null,addXp:A,completeNode:oe,getLevel:D,getXp:L,getXpIntoLevel:te,isNodeCompleted:ne},Symbol.toStringTag,{value:"Module"})),re="cbsgoPuzzleModal";function G(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function U(){const e=document.getElementById(re);e&&e.remove()}function Y(e){U();const t=document.createElement("div");t.id=re,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
          ${G(n)}
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
          ${G(o)}
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{U()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&oe(e.id),A(5)}catch{}s()})}function K(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Me(){const e=Number(L()||0),t=Number(D()||1),n=Number(te()||0),o=K(n,0,100),r=K(o/100*100,0,100);return`
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
  `}const ie="cbsgo_inventory_v1";function Ce(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Pe(){return{tickets:0}}function T(){const e=localStorage.getItem(ie);return Ce(e,Pe())}function Ne(e){localStorage.setItem(ie,JSON.stringify(e))}function se(){return Number(T().tickets||0)}function O(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+t,Ne(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ae="cbsgo_steps_v6",Le="cbsgo_gps_autostart_v2",le="cbsgo_daily_puzzle_v1",Ae=.75,Ie=200,$e=.3,Te=400,Be=20,I=1500,$=200,De=.25,Oe=.05,Re=.3;let E=null,z=!1,b={msg:"init"};function Fe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function je(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function _(){const e=localStorage.getItem(ae);return Fe(e,je())}function ce(e){e.updatedAt=Date.now(),localStorage.setItem(ae,JSON.stringify(e))}function M(){return Number(_().steps||0)}function P(){return!!z}function qe(){return b}function R(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function He(){try{return localStorage.getItem(le)===R()}catch{return!1}}function Ge(){try{localStorage.setItem(le,R())}catch{}}function Ue(e,t){return He()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:R()}})),Ge(),!0)}function W(){const e=_(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ye(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<I)return;const i=Math.floor(r/I);i<=0||(O(i),e.boostLastStep=n+i*I)}function Ke(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<$){e.chestMeters=t;return}let n=0;for(;t>=$&&n<5;)if(t-=$,n+=1,Math.random()<De){const o=Math.random()<Oe,r=o?10:3,i=o?2:1;A(r),O(i);const s=o&&Math.random()<Re;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function We(e,t){const o=m=>m*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),l=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}function Ve(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,A(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,O(1))}function Xe(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=_();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Ae);return o>n.steps&&(n.steps=o),Ve(n),Ye(n),Ke(n),ce(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Je(){E!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(E),E=null}async function V(e={}){const t=!!e.silent;if(!navigator.geolocation)return b={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Le,"1")}catch{}Je(),z=!0,b={msg:"requesting",t:Date.now()};try{return E=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),a=_(),l=a.lastPos;a.lastPos={lat:o,lng:r,t:s},ce(a);const m=Number.isFinite(n.coords.heading)?n.coords.heading:null,p=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:m,speed:p,t:s}})),i>Ie){b={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:W()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}));return}Ue(o,r);let d=0,f=0,u=0,S=0,g="no-last";l&&typeof l.lat=="number"&&typeof l.lng=="number"&&typeof l.t=="number"&&(d=We({lat:l.lat,lng:l.lng},{lat:o,lng:r}),f=Math.max(1,(s-l.t)/1e3),u=d/f,d<$e?g="jitter":d>Te?g="teleport":u>Be?g="too-fast":(Xe(d),S=d,g="ok")),b={lat:o,lng:r,acc:i,t:s,dist:Math.round(d),dt:Math.round(f),speed:Number(u.toFixed(2)),added:Math.round(S),reason:g,boostMs:W()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}))},n=>{z=!1,b={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:M()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return z=!1,b={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Ze(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>P()||await V({silent:!0}))();const t=async()=>{P()||await V({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function Qe(){const e=qe();return e?.err?"🔴":e?.lat&&P()?"🟢":P()?"🟡":"⚪"}function de(){const e=M(),t=se();return`
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
      <span style="opacity:.9;">${Qe()} <b>${Number(e||0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function pe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function et(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const ue="cbsgo_player_name_v2",F="cbsgo_player_avatar_v2";function fe(){try{return localStorage.getItem(ue)||"Sovereign"}catch{return"Sovereign"}}function tt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ue,t)}catch{}return t}function ge(){try{return localStorage.getItem(F)||""}catch{return""}}function nt(e){const t=String(e||"");try{localStorage.setItem(F,t)}catch{}return t}function ot(){try{localStorage.removeItem(F)}catch{}}let c=null,v=null,j=null,rt=null,y=null,C=!1;const it="cbsgo_daily_marker_v1";function h(e){return document.getElementById(e)}function x(e){const t=h("cbsgoMapHost");if(!t)return;let n=h("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function st(){const e=String(fe()||"").trim();return e?e[0].toUpperCase():"🙂"}function at(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function lt(){return new Date().toISOString().slice(0,10)}function ct(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function dt(e){const t=ge();if(t){const r=`
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
    ">${at(st())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function be(){const e=new Date().getHours();return e<7||e>=19}function pt(){const e=be();return`${e?"🌙":"☀️"} ${e?"-1°":"3°"}`}function ut(){const e=pt();return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Night overlay: maakt de kaart donker in de avond/nacht -->
      <div id="cbsgoNightOverlay" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        z-index:1500;
        background:${be()?"rgba(0,0,0,.45)":"transparent"};
        transition: background .4s ease;
      "></div>

      <!-- Weer-bolletje linksboven -->
      <div id="cbsgoWeather" style="
        position:absolute;
        top:16px;
        left:12px;
        z-index:3000;
        padding:6px 10px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.18);
        background:rgba(10,12,18,.78);
        backdrop-filter: blur(10px);
        font-size:12px;
        color:#fff;
        font-family:system-ui,sans-serif;
        display:inline-flex;
        align-items:center;
        gap:6px;
      ">
        <span>${e}</span>
      </div>

      <!-- Kompas + centreer-player RECHTSONDER, groot als Profile/Bag -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;              
        bottom:148px;            
        z-index:3000;
        display:flex;
        flex-direction:row;
        gap:10px;
      ">
        <button id="cbsgoCompassBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          color:#fff;
          font-size:22px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">🧭</button>
        <button id="cbsgoCenterBtn" type="button" style="
          width:52px;height:52px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          color:#fff;
          font-size:22px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">🎯</button>
      </div>
    </div>
  `}function ft(){try{c&&(c.remove(),c=null,v=null,j=null,rt=null,y=null,C=!1)}catch{}}function gt(){const e=window.L,t=h("cbsgoMap");if(!e||!t)return!1;ft();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return c=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(c),c.setView([51.687,4.87],16),j=e.layerGroup().addTo(c),!0}function bt(e){const t=window.L;if(!t||!c)return;const n=dt(t);if(!v){v=t.marker(e,{icon:n}).addTo(c),c.setView(e,18);return}v.setIcon(n),v.setLatLng(e)}function mt(e){ct(it,e)}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(mt({date:lt(),shown:!0}),c&&window.L&&j&&(t.lat,t.lng,void 0))}));function yt(){!navigator.geolocation||!c||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords;y=[t,n],bt([t,n]),x(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{x(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function xt(){let e=0;const t=120,n=()=>{if(e++,!h("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(x("Loading map engine…"),e<t)return setTimeout(n,100);x("Map engine failed to load (Leaflet not found). Refresh.");return}if(!gt()){x("Could not init map. Refresh.");return}const r=h("cbsgoCenterBtn");r&&(r.onclick=()=>{c&&y&&c.setView(y,18)});const i=h("cbsgoCompassBtn");i&&(i.onclick=()=>{c&&(C=!C,C?c.setView([51.687,4.87],3):y&&c.setView(y,16))}),x("Loading GPS…"),yt()};n()}function me(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ht(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function q(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function B(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function X(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${me(e)}</div>
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
  `}function vt(){const e=fe(),t=ge();return`
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
        ${ht(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${me(e)}" maxlength="24" style="
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
  `}function wt(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#profileMsg");a&&(a.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=tt(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{nt(String(a.result||"")),r("✅ Photo saved"),k()},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{ot(),r("✅ Photo removed"),k()})}function _t(){return`
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
          🎟️ Tickets: <b>${se()}</b>
        </div>
      </div>
    </section>
  `}function ye(){const e=q();return e==="profile"?X("Profile",`<div id="profileMount">${vt()}</div>`):e==="bag"?X("Bag",`<div id="bagMount">${_t()}</div>`):""}function kt(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${ut()}
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
          ${Me()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${de()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag, naast elkaar, NET boven GPS -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:64px; /* ⬅ iets omhoog gezet zodat ze netjes tussen 🎯/🧭 en GPS-balk zitten */
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
        ${ye()}
      </div>

      ${pe()?`<button id="resetBtn" type="button" style="
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
  `}function k(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=ye(),q()==="profile"&&wt();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{B("map"),k()})}function St(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=q();B(n===t?"map":t||"map"),k()})})}function xe(){const e=document.querySelector("#app");if(e){if(e.innerHTML=kt(),St(),xt(),Ze(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=de())};window.addEventListener("cbsgo:stepsChanged",t)}if(k(),pe()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",et)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){Y({id:"__daily__",name:"Daily Glow"});return}if(ne(n))return;const o=ke.find(r=>r.id===n);o&&Y(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&_e(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>ze);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),xe()})}))}}function he(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function N(e){const t=he();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";N(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{N(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function J(){try{if(!document.getElementById("app")){N("❌ #app not found in index.html");return}xe();const t=he();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){N(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",J,{once:!0}):J();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
