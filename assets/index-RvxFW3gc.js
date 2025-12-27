(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const _e="modulepreload",Se=function(e){return"/cbs-go/"+e},q={},ke=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var s=f;document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),a=c?.nonce||c?.getAttribute("nonce");r=f(n.map(u=>{if(u=Se(u),u in q)return;q[u]=!0;const l=u.endsWith(".css"),g=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${g}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":_e,l||(p.as="script"),p.crossOrigin="",p.href=u,a&&p.setAttribute("nonce",a),document.head.appendChild(p),l)return new Promise((k,m)=>{p.addEventListener("load",k),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(c){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=c,window.dispatchEvent(a),!a.defaultPrevented)throw c}return r.then(c=>{for(const a of c||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},Me=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],ee="cbsgo_state_v6";function Ee(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Le(){return{xp:0,completed:{},updatedAt:Date.now()}}function _(){const e=localStorage.getItem(ee);return Ee(e,Le())}function te(e){e.updatedAt=Date.now(),localStorage.setItem(ee,JSON.stringify(e))}function ne(e){return 100+(Math.max(1,Number(e||1))-1)*40}function P(){return Number(_().xp||0)}function D(){const e=P();let t=1,n=e;for(;;){const o=ne(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function oe(){const e=P();let t=1,n=e;for(;;){const o=ne(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function A(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=_();return n.xp=Number(n.xp||0)+t,te(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:D()}})),n}function re(e){const t=String(e||"");if(!t)return!1;const n=_();return!!(n.completed&&n.completed[t])}function ie(e){const t=String(e||"");if(!t)return;const n=_();n.completed||(n.completed={}),n.completed[t]=Date.now(),te(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Ce=Object.freeze(Object.defineProperty({__proto__:null,addXp:A,completeNode:ie,getLevel:D,getXp:P,getXpIntoLevel:oe,isNodeCompleted:re},Symbol.toStringTag,{value:"Module"})),se="cbsgoPuzzleModal";function W(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function G(){const e=document.getElementById(se);e&&e.remove()}function K(e){G();const t=document.createElement("div");t.id=se,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
          ${W(n)}
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
          ${W(o)}
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{G()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&ie(e.id),A(5)}catch{}s()})}function Y(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function ae(){const e=Number(P()||0),t=Number(D()||1),n=Number(oe()||0),o=Y(n,0,100),r=Y(o/100*100,0,100);return`
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
  `}function ze(){if(typeof window>"u"||window.__cbsgo_xp_rerender_bound)return;window.__cbsgo_xp_rerender_bound=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=ae())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e),window.addEventListener("cbsgo:inventoryChanged",e),setInterval(e,1e3)}ze();const ce="cbsgo_inventory_v1";function Ne(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Pe(){return{tickets:0}}function $(){const e=localStorage.getItem(ce);return Ne(e,Pe())}function Ae(e){localStorage.setItem(ce,JSON.stringify(e))}function de(){return Number($().tickets||0)}function R(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return $();const n=$();return n.tickets=Number(n.tickets||0)+t,Ae(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const le="cbsgo_steps_v6",Ie="cbsgo_gps_autostart_v2",ue="cbsgo_daily_puzzle_v1",Te=.75,$e=200,Be=.3,Oe=400,De=20,I=1500,T=200,Re=.25,Fe=.05,He=.3;let M=null,E=!1,y={msg:"init"};function je(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function qe(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function S(){const e=localStorage.getItem(le);return je(e,qe())}function pe(e){e.updatedAt=Date.now(),localStorage.setItem(le,JSON.stringify(e))}function L(){return Number(S().steps||0)}function z(){return!!E}function We(){return y}function F(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ge(){try{return localStorage.getItem(ue)===F()}catch{return!1}}function Ke(){try{localStorage.setItem(ue,F())}catch{}}function Ye(e,t){return Ge()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:F()}})),Ke(),!0)}function U(){const e=S(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ue(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<I)return;const i=Math.floor(r/I);i<=0||(R(i),e.boostLastStep=n+i*I)}function Xe(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<T){e.chestMeters=t;return}let n=0;for(;t>=T&&n<5;)if(t-=T,n+=1,Math.random()<Re){const o=Math.random()<Fe,r=o?10:3,i=o?2:1;A(r),R(i);const s=o&&Math.random()<He;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function Ve(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),c=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(c)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function Je(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,A(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,R(1))}function Ze(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Te);return o>n.steps&&(n.steps=o),Je(n),Ue(n),Xe(n),pe(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Qe(){M!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(M),M=null}async function X(e={}){const t=!!e.silent;if(!navigator.geolocation)return y={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Ie,"1")}catch{}Qe(),E=!0,y={msg:"requesting",t:Date.now()};try{return M=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),c=S(),a=c.lastPos;c.lastPos={lat:o,lng:r,t:s},pe(c);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,u=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:f,speed:u,t:s}})),i>$e){y={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:U()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:L()}}));return}Ye(o,r);let l=0,g=0,p=0,k=0,m="no-last";a&&typeof a.lat=="number"&&typeof a.lng=="number"&&typeof a.t=="number"&&(l=Ve({lat:a.lat,lng:a.lng},{lat:o,lng:r}),g=Math.max(1,(s-a.t)/1e3),p=l/g,l<Be?m="jitter":l>Oe?m="teleport":p>De?m="too-fast":(Ze(l),k=l,m="ok")),y={lat:o,lng:r,acc:i,t:s,dist:Math.round(l),dt:Math.round(g),speed:Number(p.toFixed(2)),added:Math.round(k),reason:m,boostMs:U()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:L()}}))},n=>{E=!1,y={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:L()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return E=!1,y={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function et(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>z()||await X({silent:!0}))();const t=async()=>{z()||await X({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function tt(){const e=We();return e?.err?"🔴":e?.lat&&z()?"🟢":z()?"🟡":"⚪"}function H(){const e=L(),t=de();return`
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
      <span style="opacity:.9;">${tt()} <b>${Number(e||0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function V(){if(typeof window>"u"||window.__cbsgo_steps_widget_bound)return;window.__cbsgo_steps_widget_bound=!0;const e=()=>{const t=document.querySelector("#stepsMount");t&&(t.innerHTML=H())};window.addEventListener("cbsgo:stepsChanged",e),window.addEventListener("cbsgo:inventoryChanged",e)}function ge(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function nt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const ot="cbsgo_player_name_v2",rt="cbsgo_player_avatar_v2";function fe(){try{return localStorage.getItem(ot)||"Sovereign"}catch{return"Sovereign"}}function be(){try{return localStorage.getItem(rt)||""}catch{return""}}let d=null,v=null,j=null,it=null,h=null,b=null,C=!1;const st="cbsgo_daily_marker_v1",at=6,ct=80,dt=220,lt=6e4,J=65;let B=0;function w(e){return document.getElementById(e)}function x(e){const t=w("cbsgoMapHost");if(!t)return;let n=w("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function ut(){const e=String(fe()||"").trim();return e?e[0].toUpperCase():"🙂"}function pt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function gt(e,t){const o=f=>f*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),c=o(t.lat),a=Math.sin(r/2)**2+Math.cos(s)*Math.cos(c)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function ft(){return new Date().toISOString().slice(0,10)}function bt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function mt(e){const t=be();if(t){const r=`
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
    ">${pt(ut())}</div>
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function ht(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function xt(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,s=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+s}}function wt(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function vt(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function _t(e){if(!d||!h||!e)return;const t=Date.now();if(t-B<lt||h.getLayers().length>=at)return;const o=window.L;if(!o)return;const r=wt(),i=xt(e,ct,dt),s=yt(o,r),c=o.marker([i.lat,i.lng],{icon:s});c.on("click",()=>{if(!b){alert("GPS not ready yet. Wait until your player marker appears.");return}const a={lat:b[0],lng:b[1]},f={lat:i.lat,lng:i.lng},u=gt(a,f);if(u>J){alert(`Too far to open this gift.

Distance: ${Math.round(u)}m
Needed: ≤ ${J}m`);return}h.removeLayer(c);const l=vt(r),g=`You found a gift!

Reward: ${l.text}`;alert(g);const p={kind:r,...l};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:p}))}catch{}}),c.addTo(h),B=t}function St(){return`
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
        <span>${ht()}</span>
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
  `}function kt(){try{d&&(d.remove(),d=null,v=null,j=null,it=null,h=null,b=null,C=!1,B=0)}catch{}}function Mt(){const e=window.L,t=w("cbsgoMap");if(!e||!t)return!1;kt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return d=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(d),d.setView([51.687,4.87],16),j=e.layerGroup().addTo(d),h=e.layerGroup().addTo(d),!0}function Et(e){const t=window.L;if(!t||!d)return;const n=mt(t);if(!v){v=t.marker(e,{icon:n}).addTo(d),d.setView(e,18);return}v.setIcon(n),v.setLatLng(e)}function Lt(e){bt(st,e)}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Lt({date:ft(),shown:!0}),d&&window.L&&j&&(t.lat,t.lng,void 0))}));function Ct(){!navigator.geolocation||!d||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};b=[t,n],Et([t,n]),_t(r),x(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{x(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function zt(){let e=0;const t=120,n=()=>{if(e++,!w("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(x("Loading map engine…"),e<t)return setTimeout(n,100);x("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Mt()){x("Could not init map. Refresh.");return}const r=w("cbsgoCenterBtn");r&&(r.onclick=()=>{d&&b&&d.setView(b,18)});const i=w("cbsgoCompassBtn");i&&(i.onclick=()=>{d&&(C=!C,C?d.setView([51.687,4.87],3):b&&d.setView(b,16))}),x("Loading GPS…"),Ct()};n()}function me(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ye(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function he(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Nt(){return`
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

      <div style="display:flex; gap:10px;">
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
  `}function Pt(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function At(){const e=fe(),t=be();return`
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

      <div style="display:flex; gap:14px; align-items:center;">
        ${Pt(t,64)}

        <div style="flex:1;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${me(e)}" maxlength="24" style="
            width:100%;
            margin-top:4px;
            padding:10px;
            border-radius:12px;
            border:1px solid rgba(255,255,255,.14);
            background:rgba(255,255,255,.06);
            color:#fff;
          " placeholder="Your nickname"/>

          <div style="margin-top:12px;">
            <div style="font-size:12px; opacity:.8; margin-bottom:4px;">Photo</div>
            <div style="display:flex; gap:8px;">
              <input id="profileAvatar" type="file" accept="image/*" />
              <button id="profileRemoveAvatar" type="button">Remove photo</button>
            </div>
          </div>

          <div id="profileMsg" style="margin-top:8px; font-size:12px;"></div>
        </div>
      </div>
    </section>
  `}function Z(e,t){return`
    <div style="
      position:fixed; left:0; right:0; bottom:0;
      z-index:6500;
      padding:12px;
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
        overflow:hidden;
      ">
        <div style="
          display:flex; justify-content:space-between; align-items:center;
          padding:12px 16px;
          border-bottom:1px solid rgba(255,255,255,.10);
        ">
          <div style="font-size:15px; font-weight:900;">${me(e)}</div>
          <button id="cbsgoClosePanel" type="button">Close</button>
        </div>

        <div style="max-height:min(70vh,560px); overflow:auto; padding:16px;">
          ${t}
        </div>
      </div>
    </div>
  `}function xe(){const e=ye();return e==="profile"?Z("Profile",`<div id="profileMount">${At()}</div>`):e==="bag"?Z("Bag",`<div id="bagMount">${Nt()}</div>`):""}function It(){return`
    <div class="app-shell" style="position:fixed; inset:0; background:#05070b;">
      
      <!-- MAP -->
      <div id="mapMount" style="position:absolute; inset:0;">
        ${St()}
      </div>

      <!-- XP RECHTSBOVEN -->
      <div style="
        position:absolute;
        top:0; right:0;
        padding:10px 12px;
        padding-top:calc(10px + env(safe-area-inset-top));
        z-index:4000;
        pointer-events:none;
      ">
        <div id="xpMount" style="
          pointer-events:auto;
          padding:10px 12px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(10,12,18,.72);
          backdrop-filter:blur(10px);
        ">
          ${ae()}
        </div>
      </div>

      <!-- ⬅️ NIEUW: STEPS LINKS ONDER WEATHER -->
      <div style="
        position:absolute;
        left:12px;
        top:64px; /* weather zit ~16px van top, dit komt er net onder */
        z-index:4000;
        pointer-events:auto;
      ">
        <div id="stepsMount">
          ${H()}
        </div>
      </div>

      <!-- Floating Profile & Bag rechtsonder -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px;
        z-index:5000;
        display:flex;
        gap:10px;
      ">
        <button data-panel="profile" style="width:52px;height:52px;border-radius:999px;">👤</button>
        <button data-panel="bag" style="width:52px;height:52px;border-radius:999px;">🎒</button>
      </div>

      <div id="panelRoot">
        ${xe()}
      </div>

      ${ge()?`<button id="resetBtn" type="button" style="
               position:fixed; right:12px; bottom:90px; z-index:6000;
             ">Reset Demo</button>`:""}
    </div>
  `}function O(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=xe();const t=document.querySelector("#cbsgoClosePanel");t&&(t.onclick=()=>{he("map"),O()})}function we(){const e=document.querySelector("#app");if(e){if(e.innerHTML=It(),document.querySelectorAll("[data-panel]").forEach(t=>{t.onclick=()=>{const n=t.getAttribute("data-panel");he(ye()===n?"map":n),O()}}),zt(),et(),V(),window.__cbsgo_steps_rerender_listener||(window.__cbsgo_steps_rerender_listener=!0,window.addEventListener("cbsgo:stepsChanged",()=>{const t=document.querySelector("#stepsMount");t&&(t.innerHTML=H(),V())})),O(),ge()){const t=document.querySelector("#resetBtn");t&&(t.onclick=nt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n||re(n))return;if(n==="__daily__")return K({id:n,name:"Daily Glow"});const o=Me.find(r=>r.id===n);o&&K(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&ke(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Ce);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),we()})}))}}function ve(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function N(e){const t=ve();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";N(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{N(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Q(){try{if(!document.getElementById("app")){N("❌ #app not found in index.html");return}we();const t=ve();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){N(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Q,{once:!0}):Q();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
