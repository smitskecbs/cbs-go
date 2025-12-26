(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Ie="modulepreload",Pe=function(e){return"/cbs-go/"+e},H={},Ne=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(c){return Promise.all(c.map(a=>Promise.resolve(a).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var s=f;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=f(n.map(c=>{if(c=Pe(c),c in H)return;H[c]=!0;const a=c.endsWith(".css"),g=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${g}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":Ie,a||(u.as="script"),u.crossOrigin="",u.href=c,d&&u.setAttribute("nonce",d),document.head.appendChild(u),a)return new Promise((w,m)=>{u.addEventListener("load",w),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(l){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=l,window.dispatchEvent(d),!d.defaultPrevented)throw l}return r.then(l=>{for(const d of l||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})},Me=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],oe="cbsgo_state_v6";function Le(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function $e(){return{xp:0,completed:{},updatedAt:Date.now()}}function h(){const e=localStorage.getItem(oe);return Le(e,$e())}function re(e){e.updatedAt=Date.now(),localStorage.setItem(oe,JSON.stringify(e))}function ie(e){return 100+(Math.max(1,Number(e||1))-1)*40}function M(){return Number(h().xp||0)}function O(){const e=M();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function se(){const e=M();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function D(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return h();const n=h();return n.xp=Number(n.xp||0)+t,re(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:O()}})),n}function ae(e){const t=String(e||"");if(!t)return!1;const n=h();return!!(n.completed&&n.completed[t])}function le(e){const t=String(e||"");if(!t)return;const n=h();n.completed||(n.completed={}),n.completed[t]=Date.now(),re(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Ae=Object.freeze(Object.defineProperty({__proto__:null,addXp:D,completeNode:le,getLevel:O,getXp:M,getXpIntoLevel:se,isNodeCompleted:ae},Symbol.toStringTag,{value:"Module"})),de="cbsgoPuzzleModal";function K(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Y(){const e=document.getElementById(de);e&&e.remove()}function X(e){Y();const t=document.createElement("div");t.id=de,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
          ${K(n)}
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
          ${K(o)}
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{Y()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&le(e.id),D(5)}catch{}s()})}function V(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Be(){const e=Number(M()||0),t=Number(O()||1),n=Number(se()||0),o=V(n,0,100),r=V(o/100*100,0,100);return`
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
  `}const ce="cbsgo_inventory_v1";function Te(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Oe(){return{tickets:0}}function T(){const e=localStorage.getItem(ce);return Te(e,Oe())}function De(e){localStorage.setItem(ce,JSON.stringify(e))}function pe(){return Number(T().tickets||0)}function ue(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+t,De(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ge="cbsgo_steps_v6",Re="cbsgo_gps_autostart_v2",fe="cbsgo_daily_puzzle_v1",We=.75,qe=200,je=.5,Fe=200,Ge=10,A=1500;let k=null,_=!1,b={msg:"init"};function Ue(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function He(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function x(){const e=localStorage.getItem(ge);return Ue(e,He())}function me(e){e.updatedAt=Date.now(),localStorage.setItem(ge,JSON.stringify(e))}function B(){return Number(x().steps||0)}function Ke(){return Number(x().meters||0)}function Ye(){return Ke()/1e3}function z(){return!!_}function Xe(){return b}function R(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ve(){try{return localStorage.getItem(fe)===R()}catch{return!1}}function Ze(){try{localStorage.setItem(fe,R())}catch{}}function Je(e,t){return Ve()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:R()}})),Ze(),!0)}function Z(){const e=x(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Qe(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<A)return;const i=Math.floor(r/A);i<=0||(ue(i),e.boostLastStep=n+i*A)}function et(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),l=o(t.lat),d=Math.sin(r/2)**2+Math.cos(s)*Math.cos(l)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function tt(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,D(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ue(1))}function nt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return x();const n=x();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/We);return o>n.steps&&(n.steps=o),tt(n),Qe(n),me(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function ot(){k!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(k),k=null}async function J(e={}){const t=!!e.silent;if(!navigator.geolocation)return b={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Re,"1")}catch{}ot(),_=!0,b={msg:"requesting",t:Date.now()};try{return k=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),l=x(),d=l.lastPos;l.lastPos={lat:o,lng:r,t:s},me(l);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,c=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:f,speed:c,t:s}})),i>qe){b={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:B()}}));return}Je(o,r);let a=0,g=0,u=0,w=0,m="no-last";d&&typeof d.lat=="number"&&typeof d.lng=="number"&&typeof d.t=="number"&&(a=et({lat:d.lat,lng:d.lng},{lat:o,lng:r}),g=Math.max(1,(s-d.t)/1e3),u=a/g,a<je?m="jitter":a>Fe?m="teleport":u>Ge?m="too-fast":(nt(a),w=a,m="ok")),b={lat:o,lng:r,acc:i,t:s,dist:Math.round(a),dt:Math.round(g),speed:Number(u.toFixed(2)),added:Math.round(w),reason:m,boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:B()}}))},n=>{_=!1,b={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:B()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return _=!1,b={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function rt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>z()||await J({silent:!0}))();const t=async()=>{z()||await J({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function it(){const e=Xe();return e?.err?"🔴":e?.lat&&z()?"🟢":z()?"🟡":"⚪"}function st(){const e=Number(Ye()||0);return Number.isFinite(e)?e<1?`${Math.round(e*1e3)} m`:`${e.toFixed(2)} km`:"0 m"}function be(){const e=st(),t=pe();return`
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
      <span style="opacity:.9;">${it()} <b>${e}</b></span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function ye(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function at(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const xe="cbsgo_player_name_v2",W="cbsgo_player_avatar_v2";function q(){try{return localStorage.getItem(xe)||"Sovereign"}catch{return"Sovereign"}}function ve(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(xe,t)}catch{}return t}function he(){try{return localStorage.getItem(W)||""}catch{return""}}function lt(e){const t=String(e||"");try{localStorage.setItem(W,t)}catch{}return t}function dt(){try{localStorage.removeItem(W)}catch{}}let p=null,v=null,E=null,C=!0,Q=0;function I(e){return document.getElementById(e)}function y(e){const t=I("cbsgoMapHost");if(!t)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function ct(){const e=String(q()||"").trim();return e?e[0].toUpperCase():"🙂"}function pt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ut(e){const t=he();if(t){const r=`
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
    ">${pt(ct())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function gt(){return`
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
  `}function ft(){try{p&&(p.remove(),p=null,v=null,E=null)}catch{}}function mt(){const e=window.L,t=I("cbsgoMap");if(!e||!t)return!1;ft();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return p=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),p.on("dragstart",()=>{C=!1}),p.on("zoomstart",()=>{C=!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(p),p.setView([51.687,4.87],16),!0}function bt(e){const t=window.L;if(!t||!p)return;const n=ut(t);if(!v){v=t.marker(e,{icon:n}).addTo(p),p.setView(e,18);return}v.setIcon(n),v.setLatLng(e)}function yt(e){const t=document.getElementById("cbsgoNightOverlay");t&&(t.style.background=e?"rgba(0,0,0,0.45)":"rgba(0,0,0,0.0)")}function xt(e,t){return e===0?t?"☀️":"🌙":e===1||e===2?t?"🌤️":"🌙":e===3?"☁️":e===45||e===48?"🌫️":e>=51&&e<=67?"🌦️":e>=80&&e<=82?"🌧️":e>=71&&e<=77?"🌨️":e>=95?"⛈️":t?"☀️":"🌙"}async function vt(e){const t=Date.now();if(!(t-Q<300*1e3)){Q=t;try{const n=`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(e.lat)}&longitude=${encodeURIComponent(e.lng)}&current_weather=true&timezone=auto`,o=await fetch(n);if(!o.ok)return;const i=(await o.json())?.current_weather;if(!i)return;const s=i.temperature,l=i.weathercode,d=i.is_day===1,f=xt(l,d),c=document.getElementById("cbsgoWeatherIcon"),a=document.getElementById("cbsgoWeatherTemp");c&&(c.textContent=f),a&&(a.textContent=`${Math.round(s)}°C`),yt(!d)}catch(n){console.warn("CBS GO weather fetch failed",n)}}}function ht(){!navigator.geolocation||!p||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};if(E=r,bt([t,n]),C&&p){const i=p.getZoom()||16,s=Math.max(i,16);p.setView(r,s)}vt(r),y(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{y(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function wt(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function St(){let e=0;const t=120,n=()=>{if(e++,!I("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(y("Loading map engine…"),e<t)return setTimeout(n,100);y("Map engine failed to load (Leaflet not found). Refresh.");return}if(!mt()){y("Could not init map. Refresh.");return}wt();const r=document.getElementById("cbsgoRecenterBtn");r&&(r.onclick=()=>{if(C=!0,E&&p){const i=p.getZoom()||16,s=Math.max(i,16);p.setView(E,s)}}),y("Loading GPS…"),ht()};n()}const j="cbsgo_wallet_v2",L="cbsgo_wallet_unlocked_v2";function $(){try{const e=localStorage.getItem(j);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function kt(e){localStorage.setItem(j,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function _t(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function F(){return!!$()}function zt(){return $()?sessionStorage.getItem(L)==="1":!1}function Et(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");$()&&console.warn("CBS GO: overwriting existing wallet");const o=_t();return kt({pk:o,pin:t}),sessionStorage.setItem(L,"1"),o}function Ct(e){const t=$();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(L,"1"),t.pk}function It(){localStorage.removeItem(j),sessionStorage.removeItem(L)}typeof window<"u"&&(window.cbsgoDevResetWallet=It);const we="cbsgoLoginModal";function Se(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ke(){const e=document.getElementById(we);e&&e.remove()}function Pt(e){ke();const t=document.createElement("div");return t.id=we,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.innerHTML=e,document.body.appendChild(t),t}function Nt(e,t){return`
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
      ">${Se(e)}</div>

      <div style="padding:14px 16px;">
        ${t}
      </div>
    </div>
  `}function S(){return`
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
  `}function Mt(){const e=!F(),t=q()||"",n=e?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Se(t)}" style="${S()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${S()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${S()}" placeholder="••••" />
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
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${S()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${ee(!0)}">Unlock</button>
      </div>
    `,o=Pt(Nt(e?"Welcome to CBS-GO":"Unlock Wallet",n)),r=o.querySelector("#cbsgoLoginMsg"),i=c=>{r&&(r.textContent=c||"")},s=o.querySelector("#cbsgoPin"),l=o.querySelector("#cbsgoPin2"),d=o.querySelector("#cbsgoNick"),f=()=>{ke(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const c=o.querySelector("#cbsgoCreateBtn");c&&(c.onclick=async()=>{try{const a=String(d?.value||"").trim(),g=String(s?.value||"").trim(),u=String(l?.value||"").trim();if(a.length<2)return i("⛔ Nickname too short.");if(g.length<4)return i("⛔ PIN must be at least 4 digits.");if(g!==u)return i("⛔ PINs do not match.");i("Creating wallet…"),ve(a),await Et(g),i("✅ Wallet created. Starting…"),f()}catch(a){i(`⛔ ${String(a?.message||a)}`)}})}else{const c=o.querySelector("#cbsgoUnlockBtn");c&&(c.onclick=async()=>{try{const a=String(s?.value||"").trim();if(a.length<4)return i("⛔ PIN must be at least 4 digits.");i("Unlocking…"),await Ct(a),i("✅ Unlocked."),f()}catch{i("⛔ Wrong PIN (or wallet data missing).")}})}}function G(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Lt(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function U(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function _e(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function $t(){const e=U(),t=(n,o,r)=>`
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
  `}function At(){const e=q(),t=he(),n=F();return`
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
          ${Lt(t,52)}

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
  `}function Bt(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbAvatar"),n=document.querySelector("#lbRemoveAvatar");let o=null;const r=s=>{const l=document.querySelector("#lbMsg");l&&(l.textContent=s||"")};e&&r(`✅ Profile loaded: ${e.value}`);const i=()=>{if(!e)return;const s=ve(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const l=new FileReader;l.onload=()=>{lt(String(l.result||"")),r("✅ Photo saved (reopen Profile to refresh image)")},l.onerror=()=>r("⛔ Failed to read image."),l.readAsDataURL(s)}),n&&(n.onclick=()=>{dt(),r("✅ Photo removed (reopen Profile to refresh image)")})}function Tt(){return`
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
  `}function ze(){const e=U();return e==="profile"?te("Profile",`<div id="lbMount">${At()}</div>`):e==="bag"?te("Bag",`<div id="bagMount">${Tt()}</div>`):""}function Ot(){const e=ye();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${gt()}
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
            ${Be()}
          </div>

          <div id="stepsMount">
            ${be()}
          </div>
        </div>
      </header>

      ${$t()}
      <div id="cbsgoPanelRoot">
        ${ze()}
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
  `}function P(){const e=U();document.querySelectorAll("[data-tab]").forEach(o=>{const r=o.getAttribute("data-tab")||"map";o.style.background=r===e?"rgba(15,185,120,.95)":"rgba(10,12,18,.80)"});const t=document.querySelector("#cbsgoPanelRoot");t&&(t.innerHTML=ze());const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{_e("map"),P()}),e==="profile"&&Bt()}function Dt(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tab")||"map";_e(t),P()})}),P()}function Ee(){const e=document.querySelector("#app");if(e){if(!F()||!zt()){e.innerHTML=`
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
    `,setTimeout(()=>Mt(),80),window.__cbsgo_login_listener_v1||(window.__cbsgo_login_listener_v1=!0,window.addEventListener("cbsgo:loginDone",()=>{Ee()}));return}if(e.innerHTML=Ot(),Dt(),St(),rt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=be())};window.addEventListener("cbsgo:stepsChanged",t)}if(ye()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",at)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){X({id:"__daily__",name:"Daily Glow"});return}if(ae(n))return;const o=Me.find(r=>r.id===n);o&&X(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&Ne(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Ae);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),P()})}))}}function Ce(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function N(e){const t=Ce();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";N(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{N(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ne(){try{if(!document.getElementById("app")){N("❌ #app not found in index.html");return}Ee();const t=Ce();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){N(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ne,{once:!0}):ne();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
