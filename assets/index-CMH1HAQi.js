(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const ke="modulepreload",Me=function(e){return"/cbs-go/"+e},U={},Ee=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(l){return Promise.all(l.map(p=>Promise.resolve(p).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=g;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),a=d?.nonce||d?.getAttribute("nonce");r=g(n.map(l=>{if(l=Me(l),l in U)return;U[l]=!0;const p=l.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const u=document.createElement("link");if(u.rel=p?"stylesheet":ke,p||(u.as="script"),u.crossOrigin="",u.href=l,a&&u.setAttribute("nonce",a),document.head.appendChild(u),p)return new Promise((E,b)=>{u.addEventListener("load",E),u.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(d){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=d,window.dispatchEvent(a),!a.defaultPrevented)throw d}return r.then(d=>{for(const a of d||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},Le=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],oe="cbsgo_state_v6";function ze(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ce(){return{xp:0,completed:{},updatedAt:Date.now()}}function _(){const e=localStorage.getItem(oe);return ze(e,Ce())}function re(e){e.updatedAt=Date.now(),localStorage.setItem(oe,JSON.stringify(e))}function ie(e){return 100+(Math.max(1,Number(e||1))-1)*40}function I(){return Number(_().xp||0)}function q(){const e=I();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function se(){const e=I();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function M(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=_();return n.xp=Number(n.xp||0)+t,re(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:q()}})),n}function ae(e){const t=String(e||"");if(!t)return!1;const n=_();return!!(n.completed&&n.completed[t])}function de(e){const t=String(e||"");if(!t)return;const n=_();n.completed||(n.completed={}),n.completed[t]=Date.now(),re(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Pe=Object.freeze(Object.defineProperty({__proto__:null,addXp:M,completeNode:de,getLevel:q,getXp:I,getXpIntoLevel:se,isNodeCompleted:ae},Symbol.toStringTag,{value:"Module"})),ce="cbsgoPuzzleModal";function K(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function X(){const e=document.getElementById(ce);e&&e.remove()}function V(e){X();const t=document.createElement("div");t.id=ce,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{X()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&de(e.id),M(5)}catch{}s()})}function J(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function F(){const e=Number(I()||0),t=Number(q()||1),n=Number(se()||0),o=J(n,0,100),r=J(o/100*100,0,100);return`
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
  `}function Ne(){if(typeof window>"u"||window.__cbsgo_xp_rerender_bound)return;window.__cbsgo_xp_rerender_bound=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=F())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e),window.addEventListener("cbsgo:inventoryChanged",e),setInterval(e,1e3)}Ne();const le="cbsgo_inventory_v1";function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ie(){return{tickets:0}}function O(){const e=localStorage.getItem(le);return Ae(e,Ie())}function Te(e){localStorage.setItem(le,JSON.stringify(e))}function pe(){return Number(O().tickets||0)}function T(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.tickets=Number(n.tickets||0)+t,Te(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ue="cbsgo_steps_v6",$e="cbsgo_gps_autostart_v2",fe="cbsgo_daily_puzzle_v1",Be=.75,De=200,Oe=.3,Re=400,je=20,B=1500,D=200,qe=.25,Fe=.05,He=.3;let L=null,z=!1,m={msg:"init"};function Ge(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function We(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function S(){const e=localStorage.getItem(ue);return Ge(e,We())}function ge(e){e.updatedAt=Date.now(),localStorage.setItem(ue,JSON.stringify(e))}function C(){return Number(S().steps||0)}function N(){return!!z}function Ye(){return m}function H(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ue(){try{return localStorage.getItem(fe)===H()}catch{return!1}}function Ke(){try{localStorage.setItem(fe,H())}catch{}}function Xe(e,t){return Ue()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:H()}})),Ke(),!0)}function Z(){const e=S(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ve(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<B)return;const i=Math.floor(r/B);i<=0||(T(i),e.boostLastStep=n+i*B)}function Je(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<D){e.chestMeters=t;return}let n=0;for(;t>=D&&n<5;)if(t-=D,n+=1,Math.random()<qe){const o=Math.random()<Fe,r=o?10:3,i=o?2:1;M(r),T(i);const s=o&&Math.random()<He;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function Ze(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),d=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(d)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function Qe(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,M(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,T(1))}function et(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Be);return o>n.steps&&(n.steps=o),Qe(n),Ve(n),Je(n),ge(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function tt(){L!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(L),L=null}async function Q(e={}){const t=!!e.silent;if(!navigator.geolocation)return m={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem($e,"1")}catch{}tt(),z=!0,m={msg:"requesting",t:Date.now()};try{return L=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),d=S(),a=d.lastPos;d.lastPos={lat:o,lng:r,t:s},ge(d);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,l=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:l,t:s}})),i>De){m={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:C()}}));return}Xe(o,r);let p=0,f=0,u=0,E=0,b="no-last";a&&typeof a.lat=="number"&&typeof a.lng=="number"&&typeof a.t=="number"&&(p=Ze({lat:a.lat,lng:a.lng},{lat:o,lng:r}),f=Math.max(1,(s-a.t)/1e3),u=p/f,p<Oe?b="jitter":p>Re?b="teleport":u>je?b="too-fast":(et(p),E=p,b="ok")),m={lat:o,lng:r,acc:i,t:s,dist:Math.round(p),dt:Math.round(f),speed:Number(u.toFixed(2)),added:Math.round(E),reason:b,boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:C()}}))},n=>{z=!1,m={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:C()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return z=!1,m={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function nt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>N()||await Q({silent:!0}))();const t=async()=>{N()||await Q({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function ot(){const e=Ye();return e?.err?"🔴":e?.lat&&N()?"🟢":N()?"🟡":"⚪"}function G(){const e=C(),t=pe();return`
    <div style="
      margin-top:88px;
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
      <span style="opacity:.9;">${ot()} <b>${Number(e||0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function ee(){if(typeof window>"u"||window.__cbsgo_steps_widget_bound)return;window.__cbsgo_steps_widget_bound=!0;const e=()=>{const t=document.querySelector("#stepsMount");t&&(t.innerHTML=G())};window.addEventListener("cbsgo:stepsChanged",e),window.addEventListener("cbsgo:inventoryChanged",e)}function be(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function rt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const me="cbsgo_player_name_v2",W="cbsgo_player_avatar_v2";function ye(){try{return localStorage.getItem(me)||"Sovereign"}catch{return"Sovereign"}}function it(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(me,t)}catch{}return t}function xe(){try{return localStorage.getItem(W)||""}catch{return""}}function st(e){const t=String(e||"");try{localStorage.setItem(W,t)}catch{}return t}function at(){try{localStorage.removeItem(W)}catch{}}let c=null,w=null,Y=null,dt=null,y=null,x=null,P=!1;const ct="cbsgo_daily_marker_v1",lt=6,pt=80,ut=220,ft=6e4;let R=0;function v(e){return document.getElementById(e)}function h(e){const t=v("cbsgoMapHost");if(!t)return;let n=v("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function gt(){const e=String(ye()||"").trim();return e?e[0].toUpperCase():"🙂"}function bt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function mt(){return new Date().toISOString().slice(0,10)}function yt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function xt(e){const t=xe();if(t){const r=`
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
    ">${bt(gt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function ht(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
    <div style="
      position:relative;
      width:40px;height:40px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.80);
      backdrop-filter: blur(10px);
      box-shadow:0 10px 22px rgba(0,0,0,.45);
      font-size:22px;
    ">
      🎁
      <div style="
        position:absolute;
        right:-4px;bottom:-4px;
        width:20px;height:20px;
        border-radius:999px;
        border:1px solid rgba(0,0,0,.7);
        background:rgba(0,0,0,.85);
        display:flex;align-items:center;justify-content:center;
        font-size:11px;
      ">
        ${n}
      </div>
    </div>
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function vt(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function wt(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,s=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+s}}function _t(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function St(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function kt(e){if(!c||!y||!e)return;const t=Date.now();if(t-R<ft||y.getLayers().length>=lt)return;const o=window.L;if(!o)return;const r=_t(),i=wt(e,pt,ut),s=ht(o,r),d=o.marker([i.lat,i.lng],{icon:s});d.on("click",()=>{y.removeLayer(d);const a=St(r),g=`You found a gift!

Reward: ${a.text}`;alert(g),a.xp&&M(a.xp),a.tickets&&T(a.tickets);const l={kind:r,...a};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:l}))}catch{}}),d.addTo(y),R=t}function Mt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

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
        <span>${vt()}</span>
      </div>

      <!-- Kompas + centreer-player RECHTSONDER, groot als Profile/Bag -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;
        bottom:148px;            /* net boven je 👤/🎒 (die staan rond 80px) */
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
  `}function Et(){try{c&&(c.remove(),c=null,w=null,Y=null,dt=null,y=null,x=null,P=!1,R=0)}catch{}}function Lt(){const e=window.L,t=v("cbsgoMap");if(!e||!t)return!1;Et();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return c=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(c),c.setView([51.687,4.87],16),Y=e.layerGroup().addTo(c),y=e.layerGroup().addTo(c),!0}function zt(e){const t=window.L;if(!t||!c)return;const n=xt(t);if(!w){w=t.marker(e,{icon:n}).addTo(c),c.setView(e,18);return}w.setIcon(n),w.setLatLng(e)}function Ct(e){yt(ct,e)}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Ct({date:mt(),shown:!0}),c&&window.L&&Y&&(t.lat,t.lng,void 0))}));function Pt(){!navigator.geolocation||!c||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};x=[t,n],zt([t,n]),kt(r),h(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{h(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Nt(){let e=0;const t=120,n=()=>{if(e++,!v("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(h("Loading map engine…"),e<t)return setTimeout(n,100);h("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Lt()){h("Could not init map. Refresh.");return}const r=v("cbsgoCenterBtn");r&&(r.onclick=()=>{c&&x&&c.setView(x,18)});const i=v("cbsgoCompassBtn");i&&(i.onclick=()=>{c&&(P=!P,P?c.setView([51.687,4.87],3):x&&c.setView(x,16))}),h("Loading GPS…"),Pt()};n()}function he(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function At(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function $(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function j(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function te(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${he(e)}</div>
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
  `}function It(){const e=ye(),t=xe();return`
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
        ${At(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${he(e)}" maxlength="24" style="
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
  `}function Tt(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const d=document.querySelector("#profileMsg");d&&(d.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=it(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const d=new FileReader;d.onload=()=>{st(String(d.result||"")),r("✅ Photo saved"),k()},d.onerror=()=>r("⛔ Failed to read image."),d.readAsDataURL(s)}),n&&(n.onclick=()=>{at(),r("✅ Photo removed"),k()})}function ve(){return`
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
          🎟️ Tickets: <b>${pe()}</b>
        </div>
      </div>
    </section>
  `}function we(){const e=$();return e==="profile"?te("Profile",`<div id="profileMount">${It()}</div>`):e==="bag"?te("Bag",`<div id="bagMount">${ve()}</div>`):""}function $t(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Mt()}
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
          ${F()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${G()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag, naast elkaar, NET boven GPS -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px; /* ⬅ iets omhoog gezet zodat ze netjes tussen 🎯/🧭 en GPS-balk zitten */
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
        ${we()}
      </div>

      ${be()?`<button id="resetBtn" type="button" style="
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
  `}function k(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=we(),$()==="profile"&&Tt();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{j("map"),k()})}function Bt(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=$();j(n===t?"map":t||"map"),k()})})}function _e(){const e=document.querySelector("#app");if(e){if(e.innerHTML=$t(),Bt(),Nt(),nt(),ee(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=G(),ee())};window.addEventListener("cbsgo:stepsChanged",t)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const t=()=>{const n=document.querySelector("#xpMount");n&&(n.innerHTML=F())};window.addEventListener("cbsgo:xpChanged",t)}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const t=()=>{if($()!=="bag")return;const n=document.querySelector("#bagMount");n&&(n.innerHTML=ve())};window.addEventListener("cbsgo:inventoryChanged",t)}if(k(),be()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",rt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){V({id:"__daily__",name:"Daily Glow"});return}if(ae(n))return;const o=Le.find(r=>r.id===n);o&&V(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&Ee(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Pe);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),_e()})}))}}function Se(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function A(e){const t=Se();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";A(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{A(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ne(){try{if(!document.getElementById("app")){A("❌ #app not found in index.html");return}_e();const t=Se();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){A(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ne,{once:!0}):ne();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
