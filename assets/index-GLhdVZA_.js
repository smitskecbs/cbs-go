(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Ne="modulepreload",Ce=function(e){return"/cbs-go/"+e},K={},Me=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var s=f;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");r=f(n.map(c=>{if(c=Ce(c),c in K)return;K[c]=!0;const d=c.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${g}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Ne,d||(u.as="script"),u.crossOrigin="",u.href=c,l&&u.setAttribute("nonce",l),document.head.appendChild(u),d)return new Promise((S,b)=>{u.addEventListener("load",S),u.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return r.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Ie=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],oe="cbsgo_state_v6";function Pe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ae(){return{xp:0,completed:{},updatedAt:Date.now()}}function k(){const e=localStorage.getItem(oe);return Pe(e,Ae())}function re(e){e.updatedAt=Date.now(),localStorage.setItem(oe,JSON.stringify(e))}function ie(e){return 100+(Math.max(1,Number(e||1))-1)*40}function L(){return Number(k().xp||0)}function D(){const e=L();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function se(){const e=L();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function R(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return k();const n=k();return n.xp=Number(n.xp||0)+t,re(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:D()}})),n}function ae(e){const t=String(e||"");if(!t)return!1;const n=k();return!!(n.completed&&n.completed[t])}function le(e){const t=String(e||"");if(!t)return;const n=k();n.completed||(n.completed={}),n.completed[t]=Date.now(),re(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Le=Object.freeze(Object.defineProperty({__proto__:null,addXp:R,completeNode:le,getLevel:D,getXp:L,getXpIntoLevel:se,isNodeCompleted:ae},Symbol.toStringTag,{value:"Module"})),de="cbsgoPuzzleModal";function H(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function X(){const e=document.getElementById(de);e&&e.remove()}function Y(e){X();const t=document.createElement("div");t.id=de,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
          ${H(n)}
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
          ${H(o)}
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{X()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&le(e.id),R(5)}catch{}s()})}function V(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function $e(){const e=Number(L()||0),t=Number(D()||1),n=Number(se()||0),o=V(n,0,100),r=V(o/100*100,0,100);return`
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
  `}const ce="cbsgo_inventory_v1";function Be(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Te(){return{tickets:0}}function O(){const e=localStorage.getItem(ce);return Be(e,Te())}function Oe(e){localStorage.setItem(ce,JSON.stringify(e))}function pe(){return Number(O().tickets||0)}function ue(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.tickets=Number(n.tickets||0)+t,Oe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ge="cbsgo_steps_v6",De="cbsgo_gps_autostart_v2",Re=.75,We=200,qe=1.5,je=250,Fe=3.6,T=1500;let E=null,z=!1,y={msg:"init"};function Ge(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ue(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,xpKmAwarded:0,ticketSegmentsAwarded:0,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function m(){const e=localStorage.getItem(ge),t=Ge(e,Ue());return typeof t.xpKmAwarded!="number"&&(t.xpKmAwarded=0),typeof t.ticketSegmentsAwarded!="number"&&(t.ticketSegmentsAwarded=0),typeof t.meters!="number"&&(t.meters=0),typeof t.steps!="number"&&(t.steps=0),t}function fe(e){e.updatedAt=Date.now(),localStorage.setItem(ge,JSON.stringify(e))}function Ke(){const e=m();return Number(e.meters||0)}function He(){return Ke()/1e3}function N(){return!!z}function Xe(){return y}function J(){const e=m(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ye(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<T)return;const i=Math.floor(r/T);i<=0||(ue(i),e.boostLastStep=n+i*T)}function Ve(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),l=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}function Je(e){const t=Number(e.meters||0),n=t/1e3,o=Math.floor(n),r=Number(e.xpKmAwarded||0),i=o-r;i>0&&(R(i),e.xpKmAwarded=o);const s=Math.floor(t/2500),a=Number(e.ticketSegmentsAwarded||0),l=s-a;l>0&&(ue(l),e.ticketSegmentsAwarded=s)}function Ze(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return m();const n=m();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/Re);return o>n.steps&&(n.steps=o),Je(n),Ye(n),fe(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps,meters:n.meters,km:n.meters/1e3}})),n}function Qe(){E!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(E),E=null}async function Z(e={}){const t=!!e.silent;if(!navigator.geolocation)return y={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(De,"1")}catch{}Qe(),z=!0,y={msg:"requesting",t:Date.now()};try{return E=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),a=m(),l=a.lastPos;a.lastPos={lat:o,lng:r,t:s},fe(a);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,c=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:f,speed:c,t:s}})),i>We){const h=m();y={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:J(),meters:Math.round(h.meters||0),km:(h.meters||0)/1e3},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:h.steps,meters:h.meters,km:h.meters/1e3}}));return}let d=0,g=0,u=0,S=0,b="no-last";l&&typeof l.lat=="number"&&typeof l.lng=="number"&&typeof l.t=="number"&&(d=Ve({lat:l.lat,lng:l.lng},{lat:o,lng:r}),g=Math.max(1,(s-l.t)/1e3),u=d/g,d<qe?b="jitter":d>je?b="teleport":u>Fe?b="too-fast":(Ze(d),S=d,b="ok"));const v=m();y={lat:o,lng:r,acc:i,t:s,dist:Math.round(d),dt:Math.round(g),speed:Number(u.toFixed(2)),added:Math.round(S),reason:b,boostMs:J(),meters:Math.round(v.meters||0),km:(v.meters||0)/1e3},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:v.steps,meters:v.meters,km:v.meters/1e3}}))},n=>{z=!1,y={err:n?.message||"GPS blocked",t:Date.now()};const o=m();window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:o.steps,meters:o.meters,km:o.meters/1e3}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return z=!1,y={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function et(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>N()||await Z({silent:!0}))();const t=async()=>{N()||await Z({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function tt(){const e=Xe();return e?.err?"🔴":e?.lat&&N()?"🟢":N()?"🟡":"⚪"}function nt(){const e=Number(He()||0);return Number.isFinite(e)?e<1?`${Math.round(e*1e3)} m`:`${e.toFixed(2)} km`:"0 m"}function me(){const e=nt(),t=pe();return`
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
      <span style="opacity:.9;">${tt()} <b>${e}</b></span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function be(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function ot(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const ye="cbsgo_player_name_v2",W="cbsgo_player_avatar_v2";function q(){try{return localStorage.getItem(ye)||"Sovereign"}catch{return"Sovereign"}}function xe(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ye,t)}catch{}return t}function ve(){try{return localStorage.getItem(W)||""}catch{return""}}function rt(e){const t=String(e||"");try{localStorage.setItem(W,t)}catch{}return t}function it(){try{localStorage.removeItem(W)}catch{}}let p=null,w=null,C=null,M=!0,Q=0;function I(e){return document.getElementById(e)}function x(e){const t=I("cbsgoMapHost");if(!t)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function st(){const e=String(q()||"").trim();return e?e[0].toUpperCase():"🙂"}function at(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function lt(e){const t=ve();if(t){const r=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function dt(){return`
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
  `}function ct(){try{p&&(p.remove(),p=null,w=null,C=null)}catch{}}function pt(){const e=window.L,t=I("cbsgoMap");if(!e||!t)return!1;ct();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return p=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),p.on("dragstart",()=>{M=!1}),p.on("zoomstart",()=>{M=!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(p),p.setView([51.687,4.87],16),!0}function ut(e){const t=window.L;if(!t||!p)return;const n=lt(t);if(!w){w=t.marker(e,{icon:n}).addTo(p),p.setView(e,18);return}w.setIcon(n),w.setLatLng(e)}function gt(e){const t=document.getElementById("cbsgoNightOverlay");t&&(t.style.background=e?"rgba(0,0,0,0.45)":"rgba(0,0,0,0.0)")}function ft(e,t){return e===0?t?"☀️":"🌙":e===1||e===2?t?"🌤️":"🌙":e===3?"☁️":e===45||e===48?"🌫️":e>=51&&e<=67?"🌦️":e>=80&&e<=82?"🌧️":e>=71&&e<=77?"🌨️":e>=95?"⛈️":t?"☀️":"🌙"}async function mt(e){const t=Date.now();if(!(t-Q<300*1e3)){Q=t;try{const n=`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(e.lat)}&longitude=${encodeURIComponent(e.lng)}&current_weather=true&timezone=auto`,o=await fetch(n);if(!o.ok)return;const i=(await o.json())?.current_weather;if(!i)return;const s=i.temperature,a=i.weathercode,l=i.is_day===1,f=ft(a,l),c=document.getElementById("cbsgoWeatherIcon"),d=document.getElementById("cbsgoWeatherTemp");c&&(c.textContent=f),d&&(d.textContent=`${Math.round(s)}°C`),gt(!l)}catch(n){console.warn("CBS GO weather fetch failed",n)}}}function bt(){!navigator.geolocation||!p||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};if(C=r,ut([t,n]),M&&p){const i=p.getZoom()||16,s=Math.max(i,16);p.setView(r,s)}mt(r),x(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{x(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function yt(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function xt(){let e=0;const t=120,n=()=>{if(e++,!I("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(x("Loading map engine…"),e<t)return setTimeout(n,100);x("Map engine failed to load (Leaflet not found). Refresh.");return}if(!pt()){x("Could not init map. Refresh.");return}yt();const r=document.getElementById("cbsgoRecenterBtn");r&&(r.onclick=()=>{if(M=!0,C&&p){const i=p.getZoom()||16,s=Math.max(i,16);p.setView(C,s)}}),x("Loading GPS…"),bt()};n()}const j="cbsgo_wallet_v2",$="cbsgo_wallet_unlocked_v2";function B(){try{const e=localStorage.getItem(j);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function vt(e){localStorage.setItem(j,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function ht(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function F(){return!!B()}function wt(){return B()?sessionStorage.getItem($)==="1":!1}function kt(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");B()&&console.warn("CBS GO: overwriting existing wallet");const o=ht();return vt({pk:o,pin:t}),sessionStorage.setItem($,"1"),o}function St(e){const t=B();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem($,"1"),t.pk}function _t(){localStorage.removeItem(j),sessionStorage.removeItem($)}typeof window<"u"&&(window.cbsgoDevResetWallet=_t);const he="cbsgoLoginModal";function we(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ke(){const e=document.getElementById(he);e&&e.remove()}function Et(e){ke();const t=document.createElement("div");return t.id=he,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.innerHTML=e,document.body.appendChild(t),t}function zt(e,t){return`
    <div style="
      width:min(720px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.55);
      color:#fff;
      font-family:system-ui, sans-serif;
      overflow:hidden;
    ">
      <div style="
        padding:14px 16px;
        border-bottom:1px solid rgba(255,255,255,.10);
        font-weight:900;
        font-size:16px;
      ">${we(e)}</div>

      <div style="padding:14px 16px;">
        ${t}
      </div>
    </div>
  `}function _(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function ee(e=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${e?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function Nt(){const e=!F(),t=q()||"",n=e?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${we(t)}" style="${_()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${_()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${_()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${ee(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${_()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${ee(!0)}">Unlock</button>
      </div>
    `,o=Et(zt(e?"Welcome to CBS-GO":"Unlock Wallet",n)),r=o.querySelector("#cbsgoLoginMsg"),i=c=>{r&&(r.textContent=c||"")},s=o.querySelector("#cbsgoPin"),a=o.querySelector("#cbsgoPin2"),l=o.querySelector("#cbsgoNick"),f=()=>{ke(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const c=o.querySelector("#cbsgoCreateBtn");c&&(c.onclick=async()=>{try{const d=String(l?.value||"").trim(),g=String(s?.value||"").trim(),u=String(a?.value||"").trim();if(d.length<2)return i("⛔ Nickname too short.");if(g.length<4)return i("⛔ PIN must be at least 4 digits.");if(g!==u)return i("⛔ PINs do not match.");i("Creating wallet…"),xe(d),await kt(g),i("✅ Wallet created. Starting…"),f()}catch(d){i(`⛔ ${String(d?.message||d)}`)}})}else{const c=o.querySelector("#cbsgoUnlockBtn");c&&(c.onclick=async()=>{try{const d=String(s?.value||"").trim();if(d.length<4)return i("⛔ PIN must be at least 4 digits.");i("Unlocking…"),await St(d),i("✅ Unlocked."),f()}catch{i("⛔ Wrong PIN (or wallet data missing).")}})}}function G(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ct(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function U(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Se(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Mt(){const e=U(),t=(n,o,r)=>`
    <button type="button" data-tab="${n}" style="
      width:52px;
      height:52px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.22);
      background:${e===n?"rgba(15,185,120,.95)":"rgba(10,12,18,.80)"};
      color:#fff;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:2px;
      font:inherit;
      font-size:11px;
      box-shadow:0 10px 26px rgba(0,0,0,.65);
    ">
      <div style="font-size:18px; line-height:18px;">${r}</div>
      <div style="font-size:10px;">${G(o)}</div>
    </button>
  `;return`
    <div style="
      position:fixed;
      right:12px;
      bottom:86px;
      z-index:5000;
      display:flex;
      flex-direction:column;
      gap:10px;
    ">
      ${t("profile","Profile","👤")}
      ${t("bag","Bag","🎒")}
    </div>
  `}function te(e,t){return`
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
          <div style="font-weight:900;">${G(e)}</div>
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
  `}function It(){const e=q(),t=ve(),n=F();return`
    <section style="
      display:flex;
      flex-direction:column;
      gap:14px;
    ">
      <div style="
        padding:12px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.04);
      ">
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          ${Ct(t,52)}

          <div style="flex:1; min-width:220px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
            <input id="lbName" value="${G(e)}" maxlength="24" style="
              flex:1; min-width:180px;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            "/>

            <div id="lbMsg" style="margin-top:8px; font-size:12px; opacity:.9;"></div>
          </div>
        </div>

        <div style="margin-top:12px;">
          <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Profile photo</div>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <input id="lbAvatar" type="file" accept="image/*" />
            <button class="btn secondary" id="lbRemoveAvatar" type="button" style="
              padding:8px 10px;
              border-radius:10px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.08);
              color:#fff;
              font-size:12px;
            ">Remove photo</button>
          </div>
        </div>
      </div>

      <div style="
        padding:12px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.04);
      ">
        <div style="font-weight:900; font-size:15px; margin-bottom:4px;">CBS-GO Wallet</div>
        <div style="font-size:12px; opacity:.75; margin-bottom:6px;">
          This wallet lives only on this device (encrypted). It will be used for CBS-GO rewards later.
        </div>
        <div style="
          padding:8px 10px;
          border-radius:10px;
          border:1px solid rgba(255,255,255,.16);
          background:rgba(0,0,0,.35);
          font-family:monospace;
          font-size:12px;
          word-break:break-all;
        ">
          ${n?"Local CBS-GO wallet is active on this device.":"No wallet detected."}
        </div>
      </div>
    </section>
  `}function Pt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbAvatar"),n=document.querySelector("#lbRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#lbMsg");a&&(a.textContent=s||"")};e&&r(`✅ Profile loaded: ${e.value}`);const i=()=>{if(!e)return;const s=xe(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{rt(String(a.result||"")),r("✅ Photo saved (reopen Profile to refresh image)")},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{it(),r("✅ Photo removed (reopen Profile to refresh image)")})}function At(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">
        Items you collected while walking in the real world.
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill" style="
          padding:6px 10px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(0,0,0,.35);
          font-size:13px;
        ">
          🎟️ Tickets: <b>${pe()}</b>
        </div>
      </div>

      <div style="margin-top:10px; font-size:12px; opacity:.65;">
        Later we can add fireworks, CBS/SOL/MON loot and more CBS-GO items here.
      </div>
    </div>
  `}function _e(){const e=U();return e==="profile"?te("Profile",`<div id="lbMount">${It()}</div>`):e==="bag"?te("Bag",`<div id="bagMount">${At()}</div>`):""}function Lt(){const e=be();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${dt()}
      </div>

      <!-- Header alleen rechtsboven XP + stappen -->
      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:flex-start;
        justify-content:flex-end;
        gap:10px;
        pointer-events:none;
      ">
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
            ${me()}
          </div>
        </div>
      </header>

      ${Mt()}
      <div id="cbsgoPanelRoot">
        ${_e()}
      </div>

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
  `}function P(){const e=U();document.querySelectorAll("[data-tab]").forEach(o=>{const r=o.getAttribute("data-tab")||"map";o.style.background=r===e?"rgba(15,185,120,.95)":"rgba(10,12,18,.80)"});const t=document.querySelector("#cbsgoPanelRoot");t&&(t.innerHTML=_e());const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{Se("map"),P()}),e==="profile"&&Pt()}function $t(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tab")||"map";Se(t),P()})}),P()}function Ee(){const e=document.querySelector("#app");if(e){if(!F()||!wt()){e.innerHTML=`
      <div style="
        position:fixed; inset:0;
        display:flex; align-items:center; justify-content:center;
        background:#05070b;
        color:#fff;
        font-family:system-ui, sans-serif;
        padding:18px;
        text-align:center;
      ">
        <div style="max-width:520px;">
          <div style="font-weight:900; font-size:20px;">CBS GO</div>
          <div style="opacity:.8; margin-top:8px;">Preparing secure local wallet…</div>
          <div style="opacity:.65; margin-top:6px; font-size:13px;">A PIN is required to unlock.</div>
        </div>
      </div>
    `,setTimeout(()=>Nt(),80),window.__cbsgo_login_listener_v1||(window.__cbsgo_login_listener_v1=!0,window.addEventListener("cbsgo:loginDone",()=>{Ee()}));return}if(e.innerHTML=Lt(),$t(),xt(),et(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=me())};window.addEventListener("cbsgo:stepsChanged",t)}if(be()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",ot)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){Y({id:"__daily__",name:"Daily Glow"});return}if(ae(n))return;const o=Ie.find(r=>r.id===n);o&&Y(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&Me(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Le);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),P()})}))}}function ze(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function A(e){const t=ze();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";A(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{A(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ne(){try{if(!document.getElementById("app")){A("❌ #app not found in index.html");return}Ee();const t=ze();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){A(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ne,{once:!0}):ne();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
