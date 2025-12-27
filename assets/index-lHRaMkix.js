(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const _e="modulepreload",Se=function(e){return"/cbs-go/"+e},U={},ke=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(p){return Promise.all(p.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=g;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");r=g(n.map(p=>{if(p=Se(p),p in U)return;U[p]=!0;const d=p.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${f}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":_e,d||(u.as="script"),u.crossOrigin="",u.href=p,l&&u.setAttribute("nonce",l),document.head.appendChild(u),d)return new Promise((L,m)=>{u.addEventListener("load",L),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return r.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Me=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],te="cbsgo_state_v6";function Ee(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Le(){return{xp:0,completed:{},updatedAt:Date.now()}}function _(){const e=localStorage.getItem(te);return Ee(e,Le())}function ne(e){e.updatedAt=Date.now(),localStorage.setItem(te,JSON.stringify(e))}function oe(e){return 100+(Math.max(1,Number(e||1))-1)*40}function I(){return Number(_().xp||0)}function R(){const e=I();let t=1,n=e;for(;;){const o=oe(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function re(){const e=I();let t=1,n=e;for(;;){const o=oe(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function E(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=_();return n.xp=Number(n.xp||0)+t,ne(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:R()}})),n}function ie(e){const t=String(e||"");if(!t)return!1;const n=_();return!!(n.completed&&n.completed[t])}function se(e){const t=String(e||"");if(!t)return;const n=_();n.completed||(n.completed={}),n.completed[t]=Date.now(),ne(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const ze=Object.freeze(Object.defineProperty({__proto__:null,addXp:E,completeNode:se,getLevel:R,getXp:I,getXpIntoLevel:re,isNodeCompleted:ie},Symbol.toStringTag,{value:"Module"})),ae="cbsgoPuzzleModal";function Y(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function G(){const e=document.getElementById(ae);e&&e.remove()}function K(e){G();const t=document.createElement("div");t.id=ae,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
          ${Y(n)}
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
          ${Y(o)}
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{G()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&se(e.id),E(5)}catch{}s()})}const le="cbsgo_inventory_v1";function Ce(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ne(){return{tickets:0,cbs:0}}function S(){const e=localStorage.getItem(le);return Ce(e,Ne())}function ce(e){localStorage.setItem(le,JSON.stringify(e))}function Pe(){return Number(S().tickets||0)}function T(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();return n.tickets=Number(n.tickets||0)+t,ce(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function Ae(e=0){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();return n.cbs=Number(n.cbs||0)+t,ce(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const de="cbsgo_steps_v6",Ie="cbsgo_gps_autostart_v2",pe="cbsgo_daily_puzzle_v1",Te=.75,$e=200,Be=.3,Oe=400,De=20,$=1500,B=200,Re=.25,Fe=.05,je=.3;let z=null,C=!1,y={msg:"init"};function qe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function He(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function k(){const e=localStorage.getItem(de);return qe(e,He())}function ue(e){e.updatedAt=Date.now(),localStorage.setItem(de,JSON.stringify(e))}function N(){return Number(k().steps||0)}function W(){return!!C}function F(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ue(){try{return localStorage.getItem(pe)===F()}catch{return!1}}function Ye(){try{localStorage.setItem(pe,F())}catch{}}function Ge(e,t){return Ue()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:F()}})),Ye(),!0)}function X(){const e=k(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ke(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<$)return;const i=Math.floor(r/$);i<=0||(T(i),e.boostLastStep=n+i*$)}function We(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<B){e.chestMeters=t;return}let n=0;for(;t>=B&&n<5;)if(t-=B,n+=1,Math.random()<Re){const o=Math.random()<Fe,r=o?10:3,i=o?2:1;E(r),T(i);const s=o&&Math.random()<je;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function Xe(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),l=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}function Ve(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,E(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,T(1))}function Je(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return k();const n=k();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Te);return o>n.steps&&(n.steps=o),Ve(n),Ke(n),We(n),ue(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Ze(){z!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(z),z=null}async function V(e={}){const t=!!e.silent;if(!navigator.geolocation)return y={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Ie,"1")}catch{}Ze(),C=!0,y={msg:"requesting",t:Date.now()};try{return z=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),a=k(),l=a.lastPos;a.lastPos={lat:o,lng:r,t:s},ue(a);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,p=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:p,t:s}})),i>$e){y={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:X()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:N()}}));return}Ge(o,r);let d=0,f=0,u=0,L=0,m="no-last";l&&typeof l.lat=="number"&&typeof l.lng=="number"&&typeof l.t=="number"&&(d=Xe({lat:l.lat,lng:l.lng},{lat:o,lng:r}),f=Math.max(1,(s-l.t)/1e3),u=d/f,d<Be?m="jitter":d>Oe?m="teleport":u>De?m="too-fast":(Je(d),L=d,m="ok")),y={lat:o,lng:r,acc:i,t:s,dist:Math.round(d),dt:Math.round(f),speed:Number(u.toFixed(2)),added:Math.round(L),reason:m,boostMs:X()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:N()}}))},n=>{C=!1,y={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:N()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return C=!1,y={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Qe(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>W()||await V({silent:!0}))();const t=async()=>{W()||await V({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_listener_v1||(window.__cbsgo_loot_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&E(n),o>0&&T(o),r>0&&Ae(r)}));function J(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function et(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function fe(){const e=Number(I()||0),t=Number(R()||1),n=Number(re()||0),o=Number(N()||0),r=J(n,0,100),i=J(r/100*100,0,100),s=et(o);return`
    <div style="min-width:180px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; line-height:1;">Level ${t}</div>
        <div style="opacity:.85; font-size:12px; white-space:nowrap;">
          ${r}/100 XP
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
          width:${i}%;
          background:rgba(255,255,255,.75);
        "></div>
      </div>

      <div style="
        margin-top:6px;
        font-size:11px;
        opacity:.75;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:8px;
      ">
        <div>Total XP: ${e}</div>
        <div style="
          font-size:11px;
          opacity:.8;
          white-space:nowrap;
          display:flex;
          align-items:center;
          gap:4px;
        ">
          <span>👟</span>
          <span>${s} steps</span>
        </div>
      </div>
    </div>
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=fe())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function ge(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function tt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const be="cbsgo_player_name_v2",j="cbsgo_player_avatar_v2";function me(){try{return localStorage.getItem(be)||"Sovereign"}catch{return"Sovereign"}}function nt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(be,t)}catch{}return t}function ye(){try{return localStorage.getItem(j)||""}catch{return""}}function ot(e){const t=String(e||"");try{localStorage.setItem(j,t)}catch{}return t}function rt(){try{localStorage.removeItem(j)}catch{}}let c=null,w=null,q=null,it=null,x=null,b=null,P=!1;const st="cbsgo_daily_marker_v1",at=6,lt=80,ct=220,dt=6e4,Z=65;let O=0;function v(e){return document.getElementById(e)}function h(e){const t=v("cbsgoMapHost");if(!t)return;let n=v("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function pt(){const e=String(me()||"").trim();return e?e[0].toUpperCase():"🙂"}function ut(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ft(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),l=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(l))}function gt(){return new Date().toISOString().slice(0,10)}function bt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function mt(e){const t=ye();if(t){const r=`
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
    ">${ut(pt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function yt(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function xt(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function ht(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,s=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+s}}function vt(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function wt(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function _t(e){if(!c||!x||!e)return;const t=Date.now();if(t-O<dt||x.getLayers().length>=at)return;const o=window.L;if(!o)return;const r=vt(),i=ht(e,lt,ct),s=yt(o,r),a=o.marker([i.lat,i.lng],{icon:s});a.on("click",()=>{if(!b){alert("GPS not ready yet. Wait until your player marker appears.");return}const l={lat:b[0],lng:b[1]},g={lat:i.lat,lng:i.lng},p=ft(l,g);if(p>Z){alert(`Too far to open this gift.

Distance: ${Math.round(p)}m
Needed: ≤ ${Z}m`);return}x.removeLayer(a);const d=wt(r),f=`You found a gift!

Reward: ${d.text}`;alert(f);const u={kind:r,...d};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:u}))}catch{}}),a.addTo(x),O=t}function St(){return`
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
        <span>${xt()}</span>
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
  `}function kt(){try{c&&(c.remove(),c=null,w=null,q=null,it=null,x=null,b=null,P=!1,O=0)}catch{}}function Mt(){const e=window.L,t=v("cbsgoMap");if(!e||!t)return!1;kt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return c=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(c),c.setView([51.687,4.87],16),q=e.layerGroup().addTo(c),x=e.layerGroup().addTo(c),!0}function Et(e){const t=window.L;if(!t||!c)return;const n=mt(t);if(!w){w=t.marker(e,{icon:n}).addTo(c),c.setView(e,18);return}w.setIcon(n),w.setLatLng(e)}function Lt(e){bt(st,e)}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Lt({date:gt(),shown:!0}),c&&window.L&&q&&(t.lat,t.lng,void 0))}));function zt(){!navigator.geolocation||!c||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};b=[t,n],Et([t,n]),_t(r),h(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{h(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Ct(){let e=0;const t=120,n=()=>{if(e++,!v("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(h("Loading map engine…"),e<t)return setTimeout(n,100);h("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Mt()){h("Could not init map. Refresh.");return}const r=v("cbsgoCenterBtn");r&&(r.onclick=()=>{c&&b&&c.setView(b,18)});const i=v("cbsgoCompassBtn");i&&(i.onclick=()=>{c&&(P=!P,P?c.setView([51.687,4.87],3):b&&c.setView(b,16))}),h("Loading GPS…"),zt()};n()}function xe(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nt(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function H(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function D(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Q(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${xe(e)}</div>
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
  `}function Pt(){const e=me(),t=ye();return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
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
          <input id="profileName" value="${xe(e)}" maxlength="24" style="
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
  `}function At(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#profileMsg");a&&(a.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=nt(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{ot(String(a.result||"")),r("✅ Photo saved"),M()},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{rt(),r("✅ Photo removed"),M()})}function It(){return`
    <section style="
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.12);
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
          🎟️ Tickets: <b>${Pe()}</b>
        </div>
      </div>
    </section>
  `}function he(){const e=H();return e==="profile"?Q("Profile",`<div id="profileMount">${Pt()}</div>`):e==="bag"?Q("Bag",`<div id="bagMount">${It()}</div>`):""}function Tt(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${St()}
      </div>

      <!-- Header rechtsboven: alleen XP (incl. steps-info in xpBar) -->
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
          ${fe()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px;
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
        ${he()}
      </div>

      ${ge()?`<button id="resetBtn" type="button" style="
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
  `}function M(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=he(),H()==="profile"&&At();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{D("map"),M()})}function $t(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=H();D(n===t?"map":t||"map"),M()})})}function ve(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Tt(),$t(),Ct(),Qe(),M(),ge()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",tt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){K({id:"__daily__",name:"Daily Glow"});return}if(ie(n))return;const o=Me.find(r=>r.id===n);o&&K(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&ke(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>ze);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),ve()})}))}}function we(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function A(e){const t=we();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";A(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{A(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ee(){try{if(!document.getElementById("app")){A("❌ #app not found in index.html");return}ve();const t=we();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){A(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ee,{once:!0}):ee();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
