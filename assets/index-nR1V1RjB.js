(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const ze="modulepreload",Ce=function(e){return"/cbs-go/"+e},F={},Ie=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var s=f;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");r=f(n.map(l=>{if(l=Ce(l),l in F)return;F[l]=!0;const d=l.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${g}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":ze,d||(u.as="script"),u.crossOrigin="",u.href=l,c&&u.setAttribute("nonce",c),document.head.appendChild(u),d)return new Promise((A,h)=>{u.addEventListener("load",A),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return r.then(a=>{for(const c of a||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})},Ee=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],te="cbsgo_state_v6";function Pe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ne(){return{xp:0,completed:{},updatedAt:Date.now()}}function v(){const e=localStorage.getItem(te);return Pe(e,Ne())}function ne(e){e.updatedAt=Date.now(),localStorage.setItem(te,JSON.stringify(e))}function oe(e){return 100+(Math.max(1,Number(e||1))-1)*40}function N(){return Number(v().xp||0)}function O(){const e=N();let t=1,n=e;for(;;){const o=oe(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function re(){const e=N();let t=1,n=e;for(;;){const o=oe(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function T(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return v();const n=v();return n.xp=Number(n.xp||0)+t,ne(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:O()}})),n}function ie(e){const t=String(e||"");if(!t)return!1;const n=v();return!!(n.completed&&n.completed[t])}function se(e){const t=String(e||"");if(!t)return;const n=v();n.completed||(n.completed={}),n.completed[t]=Date.now(),ne(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Me=Object.freeze(Object.defineProperty({__proto__:null,addXp:T,completeNode:se,getLevel:O,getXp:N,getXpIntoLevel:re,isNodeCompleted:ie},Symbol.toStringTag,{value:"Module"})),ae="cbsgoPuzzleModal";function H(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function K(){const e=document.getElementById(ae);e&&e.remove()}function X(e){K();const t=document.createElement("div");t.id=ae,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{K()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&se(e.id),T(5)}catch{}s()})}function Y(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Le(){const e=Number(N()||0),t=Number(O()||1),n=Number(re()||0),o=Y(n,0,100),r=Y(o/100*100,0,100);return`
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
  `}const le="cbsgo_inventory_v1";function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function $e(){return{tickets:0}}function $(){const e=localStorage.getItem(le);return Ae(e,$e())}function Be(e){localStorage.setItem(le,JSON.stringify(e))}function de(){return Number($().tickets||0)}function Oe(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return $();const n=$();return n.tickets=Number(n.tickets||0)+t,Be(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ce="cbsgo_steps_v7",pe="cbsgo_gps_autostart_v3";let S=null,B=!1,b={msg:"init"};function w(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,updatedAt:Date.now()}}function R(){try{const e=localStorage.getItem(ce);if(!e)return w();const t=JSON.parse(e);return!t||typeof t!="object"?w():{...w(),...t}}catch{return w()}}function ue(e){e.updatedAt=Date.now();try{localStorage.setItem(ce,JSON.stringify(e))}catch{}}function y(){const e=R();return Number(e.steps||0)}function _(){return!!B}function Te(){return b}function Re(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),c=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(c))}function We(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,T(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,Oe(1))}function qe(e){const t=R(),n=Number(e||0);if(!Number.isFinite(n)||n<=0)return t;t.meters=Number(t.meters||0)+n;const o=Math.floor(t.meters/.75);return o>t.steps&&(t.steps=o),We(t),ue(t),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:t.steps}})),t}function De(){S!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(S),S=null}async function V(e={}){const t=!!e.silent;if(!navigator.geolocation)return b={err:"GPS not supported",t:Date.now()},t||console.warn("CBS GO: GPS not supported"),{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(pe,"1")}catch{}De(),B=!0,b={msg:"requesting",t:Date.now()};const n=300,o=1,r=250,i=4.5;return S=navigator.geolocation.watchPosition(s=>{const a=s.coords.latitude,c=s.coords.longitude,f=s.coords.accuracy||999,l=Date.now(),d=R(),g=d.lastPos;if(b={lat:a,lng:c,acc:f,t:l,reason:"",dist:0,added:0,speed:0},d.lastPos={lat:a,lng:c,t:l},ue(d),f>n){b.reason="accuracy too low",window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:y()}}));return}if(g&&typeof g.lat=="number"&&typeof g.lng=="number"){const u=Re({lat:g.lat,lng:g.lng},{lat:a,lng:c}),A=(l-g.t)/1e3||1,h=u/A;b.dist=u,b.speed=h,u>=o&&u<=r&&h<=i?(b.added=u,qe(u)):(b.reason="filtered",window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:y()}})))}else window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:y()}}))},s=>{B=!1,b={err:s?.message||"GPS blocked",t:Date.now()},t||console.warn("CBS GO: GPS error",s),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:y()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}function je(){try{return localStorage.getItem(pe)==="1"}catch{return!1}}function Ge(){if(typeof window>"u"||window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>_()||je()&&await V({silent:!0}))();const t=async()=>{_()||await V({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function Ue(){const e=Te()||{};return e.err?"🔴":e.lat&&_()?"🟢":_()?"🟡":"⚪"}function ge(){const e=y(),t=de();return`
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
      <span style="opacity:.9;">${Ue()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function fe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Fe(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const be="cbsgo_player_name_v2",W="cbsgo_player_avatar_v2";function q(){try{return localStorage.getItem(be)||"Sovereign"}catch{return"Sovereign"}}function me(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(be,t)}catch{}return t}function ye(){try{return localStorage.getItem(W)||""}catch{return""}}function He(e){const t=String(e||"");try{localStorage.setItem(W,t)}catch{}return t}function Ke(){try{localStorage.removeItem(W)}catch{}}let p=null,x=null,z=null,C=!0,J=0;function I(e){return document.getElementById(e)}function m(e){const t=I("cbsgoMapHost");if(!t)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Xe(){const e=String(q()||"").trim();return e?e[0].toUpperCase():"🙂"}function Ye(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ve(e){const t=ye();if(t){const r=`
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
    ">${Ye(Xe())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function Je(){return`
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
  `}function Ze(){try{p&&(p.remove(),p=null,x=null,z=null)}catch{}}function Qe(){const e=window.L,t=I("cbsgoMap");if(!e||!t)return!1;Ze();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return p=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),p.on("dragstart",()=>{C=!1}),p.on("zoomstart",()=>{C=!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(p),p.setView([51.687,4.87],16),!0}function et(e){const t=window.L;if(!t||!p)return;const n=Ve(t);if(!x){x=t.marker(e,{icon:n}).addTo(p),p.setView(e,18);return}x.setIcon(n),x.setLatLng(e)}function tt(e){const t=document.getElementById("cbsgoNightOverlay");t&&(t.style.background=e?"rgba(0,0,0,0.45)":"rgba(0,0,0,0.0)")}function nt(e,t){return e===0?t?"☀️":"🌙":e===1||e===2?t?"🌤️":"🌙":e===3?"☁️":e===45||e===48?"🌫️":e>=51&&e<=67?"🌦️":e>=80&&e<=82?"🌧️":e>=71&&e<=77?"🌨️":e>=95?"⛈️":t?"☀️":"🌙"}async function ot(e){const t=Date.now();if(!(t-J<300*1e3)){J=t;try{const n=`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(e.lat)}&longitude=${encodeURIComponent(e.lng)}&current_weather=true&timezone=auto`,o=await fetch(n);if(!o.ok)return;const i=(await o.json())?.current_weather;if(!i)return;const s=i.temperature,a=i.weathercode,c=i.is_day===1,f=nt(a,c),l=document.getElementById("cbsgoWeatherIcon"),d=document.getElementById("cbsgoWeatherTemp");l&&(l.textContent=f),d&&(d.textContent=`${Math.round(s)}°C`),tt(!c)}catch(n){console.warn("CBS GO weather fetch failed",n)}}}function rt(){!navigator.geolocation||!p||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};if(z=r,et([t,n]),C&&p){const i=p.getZoom()||16,s=Math.max(i,16);p.setView(r,s)}ot(r),m(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{m(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function it(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function st(){let e=0;const t=120,n=()=>{if(e++,!I("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(m("Loading map engine…"),e<t)return setTimeout(n,100);m("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Qe()){m("Could not init map. Refresh.");return}it();const r=document.getElementById("cbsgoRecenterBtn");r&&(r.onclick=()=>{if(C=!0,z&&p){const i=p.getZoom()||16,s=Math.max(i,16);p.setView(z,s)}}),m("Loading GPS…"),rt()};n()}const D="cbsgo_wallet_v2",M="cbsgo_wallet_unlocked_v2";function L(){try{const e=localStorage.getItem(D);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function at(e){localStorage.setItem(D,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function lt(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function j(){return!!L()}function dt(){return L()?sessionStorage.getItem(M)==="1":!1}function ct(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");L()&&console.warn("CBS GO: overwriting existing wallet");const o=lt();return at({pk:o,pin:t}),sessionStorage.setItem(M,"1"),o}function pt(e){const t=L();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(M,"1"),t.pk}function ut(){localStorage.removeItem(D),sessionStorage.removeItem(M)}typeof window<"u"&&(window.cbsgoDevResetWallet=ut);const xe="cbsgoLoginModal";function ve(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function he(){const e=document.getElementById(xe);e&&e.remove()}function gt(e){he();const t=document.createElement("div");return t.id=xe,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.innerHTML=e,document.body.appendChild(t),t}function ft(e,t){return`
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
      ">${ve(e)}</div>

      <div style="padding:14px 16px;">
        ${t}
      </div>
    </div>
  `}function k(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function Z(e=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${e?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function bt(){const e=!j(),t=q()||"",n=e?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${ve(t)}" style="${k()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${k()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${k()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${Z(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${k()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${Z(!0)}">Unlock</button>
      </div>
    `,o=gt(ft(e?"Welcome to CBS-GO":"Unlock Wallet",n)),r=o.querySelector("#cbsgoLoginMsg"),i=l=>{r&&(r.textContent=l||"")},s=o.querySelector("#cbsgoPin"),a=o.querySelector("#cbsgoPin2"),c=o.querySelector("#cbsgoNick"),f=()=>{he(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const l=o.querySelector("#cbsgoCreateBtn");l&&(l.onclick=async()=>{try{const d=String(c?.value||"").trim(),g=String(s?.value||"").trim(),u=String(a?.value||"").trim();if(d.length<2)return i("⛔ Nickname too short.");if(g.length<4)return i("⛔ PIN must be at least 4 digits.");if(g!==u)return i("⛔ PINs do not match.");i("Creating wallet…"),me(d),await ct(g),i("✅ Wallet created. Starting…"),f()}catch(d){i(`⛔ ${String(d?.message||d)}`)}})}else{const l=o.querySelector("#cbsgoUnlockBtn");l&&(l.onclick=async()=>{try{const d=String(s?.value||"").trim();if(d.length<4)return i("⛔ PIN must be at least 4 digits.");i("Unlocking…"),await pt(d),i("✅ Unlocked."),f()}catch{i("⛔ Wrong PIN (or wallet data missing).")}})}}function G(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function mt(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function U(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function we(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function yt(){const e=U(),t=(n,o,r)=>`
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
  `}function Q(e,t){return`
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
  `}function xt(){const e=q(),t=ye(),n=j();return`
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
          ${mt(t,52)}

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
  `}function vt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbAvatar"),n=document.querySelector("#lbRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#lbMsg");a&&(a.textContent=s||"")};e&&r(`✅ Profile loaded: ${e.value}`);const i=()=>{if(!e)return;const s=me(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{He(String(a.result||"")),r("✅ Photo saved (reopen Profile to refresh image)")},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{Ke(),r("✅ Photo removed (reopen Profile to refresh image)")})}function ht(){return`
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
          🎟️ Tickets: <b>${de()}</b>
        </div>
      </div>

      <div style="margin-top:10px; font-size:12px; opacity:.65;">
        Later we can add fireworks, CBS/SOL/MON loot and more CBS-GO items here.
      </div>
    </div>
  `}function ke(){const e=U();return e==="profile"?Q("Profile",`<div id="lbMount">${xt()}</div>`):e==="bag"?Q("Bag",`<div id="bagMount">${ht()}</div>`):""}function wt(){const e=fe();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Je()}
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
            ${Le()}
          </div>

          <div id="stepsMount">
            ${ge()}
          </div>
        </div>
      </header>

      ${yt()}
      <div id="cbsgoPanelRoot">
        ${ke()}
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
  `}function E(){const e=U();document.querySelectorAll("[data-tab]").forEach(o=>{const r=o.getAttribute("data-tab")||"map";o.style.background=r===e?"rgba(15,185,120,.95)":"rgba(10,12,18,.80)"});const t=document.querySelector("#cbsgoPanelRoot");t&&(t.innerHTML=ke());const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{we("map"),E()}),e==="profile"&&vt()}function kt(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tab")||"map";we(t),E()})}),E()}function Se(){const e=document.querySelector("#app");if(e){if(!j()||!dt()){e.innerHTML=`
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
    `,setTimeout(()=>bt(),80),window.__cbsgo_login_listener_v1||(window.__cbsgo_login_listener_v1=!0,window.addEventListener("cbsgo:loginDone",()=>{Se()}));return}if(e.innerHTML=wt(),kt(),st(),Ge(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=ge())};window.addEventListener("cbsgo:stepsChanged",t)}if(fe()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Fe)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){X({id:"__daily__",name:"Daily Glow"});return}if(ie(n))return;const o=Ee.find(r=>r.id===n);o&&X(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&Ie(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Me);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),E()})}))}}function _e(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function P(e){const t=_e();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";P(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{P(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ee(){try{if(!document.getElementById("app")){P("❌ #app not found in index.html");return}Se();const t=_e();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){P(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ee,{once:!0}):ee();
