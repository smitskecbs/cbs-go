(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Me="modulepreload",Ce=function(e){return"/cbs-go/"+e},J={},Ne=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(p){return Promise.all(p.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=g;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),a=l?.nonce||l?.getAttribute("nonce");r=g(n.map(p=>{if(p=Ce(p),p in J)return;J[p]=!0;const d=p.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${f}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Me,d||(u.as="script"),u.crossOrigin="",u.href=p,a&&u.setAttribute("nonce",a),document.head.appendChild(u),d)return new Promise((M,m)=>{u.addEventListener("load",M),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(l){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=l,window.dispatchEvent(a),!a.defaultPrevented)throw l}return r.then(l=>{for(const a of l||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},ze=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],ce="cbsgo_state_v6";function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Le(){return{xp:0,completed:{},updatedAt:Date.now()}}function k(){const e=localStorage.getItem(ce);return Ae(e,Le())}function de(e){e.updatedAt=Date.now(),localStorage.setItem(ce,JSON.stringify(e))}function pe(e){return 100+(Math.max(1,Number(e||1))-1)*40}function _(){return Number(k().xp||0)}function T(){const e=_();let t=1,n=e;for(;;){const o=pe(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function ue(){const e=_();let t=1,n=e;for(;;){const o=pe(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function E(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return k();const n=k();return n.xp=Number(n.xp||0)+t,de(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:T()}})),n}function fe(e){const t=String(e||"");if(!t)return!1;const n=k();return!!(n.completed&&n.completed[t])}function ge(e){const t=String(e||"");if(!t)return;const n=k();n.completed||(n.completed={}),n.completed[t]=Date.now(),de(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const $e=Object.freeze(Object.defineProperty({__proto__:null,addXp:E,completeNode:ge,getLevel:T,getXp:_,getXpIntoLevel:ue,isNodeCompleted:fe},Symbol.toStringTag,{value:"Module"})),me="cbsgoPuzzleModal";function Z(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Q(){const e=document.getElementById(me);e&&e.remove()}function ee(e){Q();const t=document.createElement("div");t.id=me,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
          ${Z(n)}
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
          ${Z(o)}
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{Q()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&ge(e.id),E(5)}catch{}s()})}function te(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Pe(){const e=Number(_()||0),t=Number(T()||1),n=Number(ue()||0),o=te(n,0,100),r=te(o/100*100,0,100);return`
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
  `}const be="cbsgo_inventory_v1";function Ie(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Te(){return{tickets:0}}function H(){const e=localStorage.getItem(be);return Ie(e,Te())}function Be(e){localStorage.setItem(be,JSON.stringify(e))}function ye(){return Number(H().tickets||0)}function B(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return H();const n=H();return n.tickets=Number(n.tickets||0)+t,Be(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const xe="cbsgo_steps_v6",Re="cbsgo_gps_autostart_v2",ve="cbsgo_daily_puzzle_v1",Oe=.75,De=200,Fe=.3,je=400,He=20,O=1500,D=200,qe=.25,Ue=.05,Ge=.3;let C=null,N=!1,b={msg:"init"};function We(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ke(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function w(){const e=localStorage.getItem(xe);return We(e,Ke())}function he(e){e.updatedAt=Date.now(),localStorage.setItem(xe,JSON.stringify(e))}function F(){return Number(w().steps||0)}function q(){const e=w();return Number(e.meters||0)}function Xe(){return q()/1e3}function z(){return!!N}function Ye(){return b}function W(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ve(){try{return localStorage.getItem(ve)===W()}catch{return!1}}function Je(){try{localStorage.setItem(ve,W())}catch{}}function Ze(e,t){return Ve()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:W()}})),Je(),!0)}function ne(){const e=w(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Qe(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<O)return;const i=Math.floor(r/O);i<=0||(B(i),e.boostLastStep=n+i*O)}function et(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<D){e.chestMeters=t;return}let n=0;for(;t>=D&&n<5;)if(t-=D,n+=1,Math.random()<qe){const o=Math.random()<Ue,r=o?10:3,i=o?2:1;E(r),B(i);const s=o&&Math.random()<Ge;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function tt(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),l=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(l)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function nt(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,E(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,B(1))}function ot(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return w();const n=w();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Oe);return o>n.steps&&(n.steps=o),nt(n),Qe(n),et(n),he(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function rt(){C!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(C),C=null}async function oe(e={}){const t=!!e.silent;if(!navigator.geolocation)return b={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Re,"1")}catch{}rt(),N=!0,b={msg:"requesting",t:Date.now()};try{return C=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),l=w(),a=l.lastPos;l.lastPos={lat:o,lng:r,t:s},he(l);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,p=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:p,t:s}})),i>De){b={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:ne()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:F()}}));return}Ze(o,r);let d=0,f=0,u=0,M=0,m="no-last";a&&typeof a.lat=="number"&&typeof a.lng=="number"&&typeof a.t=="number"&&(d=tt({lat:a.lat,lng:a.lng},{lat:o,lng:r}),f=Math.max(1,(s-a.t)/1e3),u=d/f,d<Fe?m="jitter":d>je?m="teleport":u>He?m="too-fast":(ot(d),M=d,m="ok")),b={lat:o,lng:r,acc:i,t:s,dist:Math.round(d),dt:Math.round(f),speed:Number(u.toFixed(2)),added:Math.round(M),reason:m,boostMs:ne()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:F()}}))},n=>{N=!1,b={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:F()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return N=!1,b={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function it(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>z()||await oe({silent:!0}))();const t=async()=>{z()||await oe({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function st(){const e=Ye();return e?.err?"🔴":e?.lat&&z()?"🟢":z()?"🟡":"⚪"}function at(){const e=Number(Xe()||0);return Number.isFinite(e)?e<1?`${Math.round(e*1e3)} m`:`${e.toFixed(2)} km`:"0 m"}function we(){const e=at(),t=ye();return`
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
      <span style="opacity:.9;">${st()} <b>${e}</b></span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function Se(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function lt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const U="cbsgo_leaderboard_v2",ke="cbsgo_player_name_v2",K="cbsgo_player_avatar_v2";function _e(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ct(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function X(){try{return localStorage.getItem(ke)||"Sovereign"}catch{return"Sovereign"}}function dt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ke,t)}catch{}return t}function R(){try{return localStorage.getItem(K)||""}catch{return""}}function pt(e){const t=String(e||"");try{localStorage.setItem(K,t)}catch{}return t}function ut(){try{localStorage.removeItem(K)}catch{}}function ft(e=10){const t=_e(U,[]);return Array.isArray(t)?t.slice(0,e):[]}function gt(){const e=X(),t=R(),n=_(),o=T(),r=_e(U,[]),i=Array.isArray(r)?r:[],s=i.find(l=>l.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):i.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),i.sort((l,a)=>Number(a.xp||0)-Number(l.xp||0)),ct(U,i),{name:e,xp:n,level:o,avatar:t}}let c=null,S=null,A=null,L=!0,re=0;function $(e){return document.getElementById(e)}function h(e){const t=$("cbsgoMapHost");if(!t)return;let n=$("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function mt(){const e=String(X()||"").trim();return e?e[0].toUpperCase():"🙂"}function bt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function yt(e){const t=R();if(t){const r=`
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
    ">${bt(mt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function xt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Night overlay (wordt donker bij nacht) -->
      <div id="cbsgoNightOverlay" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        background:rgba(0,0,0,0.0);
        mix-blend-mode:multiply;
        transition:background .3s ease-out;
        z-index:3000;
      "></div>

      <!-- overlay: kompas + weer + recenter, linksboven -->
      <div style="
        position:absolute;
        top:12px;
        left:12px;
        z-index:4000;
        display:flex;
        flex-direction:column;
        gap:10px;
      ">
        <div style="display:flex; gap:8px;">
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

          <div id="cbsgoWeather" style="
            min-width:64px;
            height:52px;
            border-radius:999px;
            border:1px solid rgba(255,255,255,.55);
            background:rgba(0,0,0,.65);
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding:2px 8px;
            font-size:12px;
            color:#fff;
            backdrop-filter:blur(12px);
            box-sizing:border-box;
          ">
            <div id="cbsgoWeatherIcon" style="font-size:18px; line-height:18px;">☀️</div>
            <div id="cbsgoWeatherTemp" style="margin-top:2px; font-size:11px; opacity:.9;">--°C</div>
          </div>
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
  `}function vt(){try{c&&(c.remove(),c=null,S=null,A=null)}catch{}}function ht(){const e=window.L,t=$("cbsgoMap");if(!e||!t)return!1;vt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return c=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),c.on("dragstart",()=>{L=!1}),c.on("zoomstart",()=>{L=!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(c),c.setView([51.687,4.87],16),!0}function wt(e){const t=window.L;if(!t||!c)return;const n=yt(t);if(!S){S=t.marker(e,{icon:n}).addTo(c),c.setView(e,18);return}S.setIcon(n),S.setLatLng(e)}function St(e){const t=document.getElementById("cbsgoNightOverlay");t&&(t.style.background=e?"rgba(0,0,0,0.45)":"rgba(0,0,0,0.0)")}function kt(e,t){return e===0?t?"☀️":"🌙":e===1||e===2?t?"🌤️":"🌙":e===3?"☁️":e===45||e===48?"🌫️":e>=51&&e<=67?"🌦️":e>=80&&e<=82?"🌧️":e>=71&&e<=77?"🌨️":e>=95?"⛈️":t?"☀️":"🌙"}async function _t(e){const t=Date.now();if(!(t-re<300*1e3)){re=t;try{const n=`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(e.lat)}&longitude=${encodeURIComponent(e.lng)}&current_weather=true&timezone=auto`,o=await fetch(n);if(!o.ok)return;const i=(await o.json())?.current_weather;if(!i)return;const s=i.temperature,l=i.weathercode,a=i.is_day===1,g=kt(l,a),p=document.getElementById("cbsgoWeatherIcon"),d=document.getElementById("cbsgoWeatherTemp");p&&(p.textContent=g),d&&(d.textContent=`${Math.round(s)}°C`),St(!a)}catch(n){console.warn("CBS GO weather fetch failed",n)}}}function Et(){!navigator.geolocation||!c||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};if(A=r,wt([t,n]),L&&c){const i=c.getZoom()||16,s=Math.max(i,16);c.setView(r,s)}_t(r),h(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{h(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Mt(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function Ct(){let e=0;const t=120,n=()=>{if(e++,!$("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(h("Loading map engine…"),e<t)return setTimeout(n,100);h("Map engine failed to load (Leaflet not found). Refresh.");return}if(!ht()){h("Could not init map. Refresh.");return}Mt();const r=document.getElementById("cbsgoRecenterBtn");r&&(r.onclick=()=>{if(L=!0,A&&c){const i=c.getZoom()||16,s=Math.max(i,16);c.setView(A,s)}}),h("Loading GPS…"),Et()};n()}function P(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function G(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function Y(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function ie(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Nt(){const e=Y(),t=(n,o,r)=>`
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
      <div style="font-size:11px;">${P(o)}</div>
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
          <div style="font-weight:900;">${P(e)}</div>
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
  `}const ae=200,zt=.25,At=.05,Lt=.3;let y=null,j=0,v=null;function $t(e){if(!Number.isFinite(e)||e<=0)return;j+=e;let t=0;for(;j>=ae&&t<5&&(j-=ae,t+=1,!y);)if(Math.random()<zt){const n=Math.random()<At,o=n?10:3,r=n?2:1,i=n&&Math.random()<Lt;y={xp:o,tickets:r,rare:n,hasCBSFlag:i},V();break}}function Pt(){const e=document.querySelector("#cbsgoTreasureBtn");e&&(e.onclick=()=>{if(!y)return;const{xp:t,tickets:n}=y;t&&t>0&&E(t),n&&n>0&&B(n),y=null,V()})}function V(){const e=document.querySelector("#treasureMount");if(!e)return;if(!y){e.innerHTML="";return}const{rare:t}=y;e.innerHTML=`
    <button id="cbsgoTreasureBtn" type="button" style="
      position:fixed;
      left:50%;
      bottom:90px;
      transform:translateX(-50%);
      z-index:5500;
      padding:10px 14px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.92);
      backdrop-filter:blur(12px);
      color:#fff;
      font-size:14px;
      display:inline-flex;
      align-items:center;
      gap:8px;
      box-shadow:0 10px 32px rgba(0,0,0,.6);
    ">
      <span style="font-size:18px;">🎁</span>
      <span>${t?"Rare chest! Tap to claim":"Gift found! Tap to open"}</span>
    </button>
  `,Pt()}function It(){const e=ft(10),t=X(),n=R();return`
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
          ${G(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${P(t)}" maxlength="24" style="
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

            <div style="margin-top:10px; font-size:12px; opacity:.75;">
              Local wallet: <b>active</b>
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
                      ${G(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${P(o.name)}
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
  `}function Tt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let r=null;const i=l=>{const a=document.querySelector("#lbMsg");a&&(a.textContent=l||"")};e&&i(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const l=dt(e.value);i(`✅ Name saved: ${l}`)};e&&(e.addEventListener("input",()=>{i("Saving…"),r&&clearTimeout(r),r=setTimeout(s,300)}),e.addEventListener("blur",()=>{r&&clearTimeout(r),s()})),n&&n.addEventListener("change",()=>{const l=n.files&&n.files[0];if(!l)return;if(l.size>15e5){i("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}i("Uploading photo…");const a=new FileReader;a.onload=()=>{pt(String(a.result||"")),i("✅ Photo saved"),x()},a.onerror=()=>i("⛔ Failed to read image."),a.readAsDataURL(l)}),o&&(o.onclick=()=>{ut(),i("✅ Photo removed"),x()}),t&&(t.onclick=()=>{e&&s();const l=gt();i(`✅ Saved: ${l.name} – ${l.xp} XP`),x()})}function Bt(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${ye()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function Rt(){const e=Y();return e==="profile"?se("Profile",`<div id="lbMount">${It()}</div>`):e==="bag"?se("Bag",`<div id="bagMount">${Bt()}</div>`):""}function Ot(){const e=Se(),t=R();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${xt()}
      </div>

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
          ${G(t,32)}
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
            ${Pe()}
          </div>

          <div id="stepsMount">
            ${we()}
          </div>
        </div>
      </header>

      <div id="treasureMount"></div>

      ${Nt()}
      ${Rt()}

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
  `}function Dt(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");ie(n||"map"),x()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{ie("map"),x()})}function x(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Ot(),Dt(),Ct(),it(),v===null&&(v=q()),V(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=we());const r=q();if(!Number.isFinite(r))return;v===null&&(v=r);const i=Math.max(0,r-v);v=r,$t(i)};window.addEventListener("cbsgo:stepsChanged",n)}if(Y()==="profile"&&Tt(),Se()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",lt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o)return;if(o==="__daily__"){ee({id:"__daily__",name:"Daily Glow"});return}if(fe(o))return;const r=ze.find(i=>i.id===o);r&&ee(r)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",n=>{const o=n?.detail?.id;o&&Ne(async()=>{const{completeNode:r}=await Promise.resolve().then(()=>$e);return{completeNode:r}},void 0).then(({completeNode:r})=>{r(o),x()})}))}function Ee(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function I(e){const t=Ee();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";I(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{I(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function le(){try{if(!document.getElementById("app")){I("❌ #app not found in index.html");return}x();const t=Ee();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){I(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",le,{once:!0}):le();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
