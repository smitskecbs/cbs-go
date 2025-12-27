(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Me="modulepreload",Ee=function(e){return"/cbs-go/"+e},Y={},Le=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=g;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");r=g(n.map(u=>{if(u=Ee(u),u in Y)return;Y[u]=!0;const l=u.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${f}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Me,l||(p.as="script"),p.crossOrigin="",p.href=u,c&&p.setAttribute("nonce",c),document.head.appendChild(p),l)return new Promise((M,m)=>{p.addEventListener("load",M),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return r.then(a=>{for(const c of a||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})},ze=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],re="cbsgo_state_v6";function Ce(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Pe(){return{xp:0,completed:{},updatedAt:Date.now()}}function _(){const e=localStorage.getItem(re);return Ce(e,Pe())}function ie(e){e.updatedAt=Date.now(),localStorage.setItem(re,JSON.stringify(e))}function se(e){return 100+(Math.max(1,Number(e||1))-1)*40}function A(){return Number(_().xp||0)}function j(){const e=A();let t=1,n=e;for(;;){const o=se(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function ae(){const e=A();let t=1,n=e;for(;;){const o=se(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function I(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=_();return n.xp=Number(n.xp||0)+t,ie(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:j()}})),n}function ce(e){const t=String(e||"");if(!t)return!1;const n=_();return!!(n.completed&&n.completed[t])}function de(e){const t=String(e||"");if(!t)return;const n=_();n.completed||(n.completed={}),n.completed[t]=Date.now(),ie(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Ne=Object.freeze(Object.defineProperty({__proto__:null,addXp:I,completeNode:de,getLevel:j,getXp:A,getXpIntoLevel:ae,isNodeCompleted:ce},Symbol.toStringTag,{value:"Module"})),le="cbsgoPuzzleModal";function K(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function X(){const e=document.getElementById(le);e&&e.remove()}function V(e){X();const t=document.createElement("div");t.id=le,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{X()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&de(e.id),I(5)}catch{}s()})}function J(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function q(){const e=Number(A()||0),t=Number(j()||1),n=Number(ae()||0),o=J(n,0,100),r=J(o/100*100,0,100);return`
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
  `}function Ae(){if(typeof window>"u"||window.__cbsgo_xp_rerender_bound)return;window.__cbsgo_xp_rerender_bound=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=q())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e),window.addEventListener("cbsgo:inventoryChanged",e),setInterval(e,1e3)}Ae();const ue="cbsgo_inventory_v1";function Ie(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Te(){return{tickets:0}}function D(){const e=localStorage.getItem(ue);return Ie(e,Te())}function $e(e){localStorage.setItem(ue,JSON.stringify(e))}function pe(){return Number(D().tickets||0)}function F(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return D();const n=D();return n.tickets=Number(n.tickets||0)+t,$e(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const fe="cbsgo_steps_v6",Be="cbsgo_gps_autostart_v2",ge="cbsgo_daily_puzzle_v1",De=.75,Oe=200,Re=.3,je=400,qe=20,$=1500,B=200,Fe=.25,He=.05,Ge=.3;let E=null,L=!1,y={msg:"init"};function We(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ue(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function S(){const e=localStorage.getItem(fe);return We(e,Ue())}function be(e){e.updatedAt=Date.now(),localStorage.setItem(fe,JSON.stringify(e))}function z(){return Number(S().steps||0)}function P(){return!!L}function Ye(){return y}function H(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ke(){try{return localStorage.getItem(ge)===H()}catch{return!1}}function Xe(){try{localStorage.setItem(ge,H())}catch{}}function Ve(e,t){return Ke()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:H()}})),Xe(),!0)}function Z(){const e=S(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Je(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<$)return;const i=Math.floor(r/$);i<=0||(F(i),e.boostLastStep=n+i*$)}function Ze(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<B){e.chestMeters=t;return}let n=0;for(;t>=B&&n<5;)if(t-=B,n+=1,Math.random()<Fe){const o=Math.random()<He,r=o?10:3,i=o?2:1;I(r),F(i);const s=o&&Math.random()<Ge;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function Qe(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),c=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(c))}function et(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,I(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,F(1))}function tt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return S();const n=S();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/De);return o>n.steps&&(n.steps=o),et(n),Je(n),Ze(n),be(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function nt(){E!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(E),E=null}async function Q(e={}){const t=!!e.silent;if(!navigator.geolocation)return y={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Be,"1")}catch{}nt(),L=!0,y={msg:"requesting",t:Date.now()};try{return E=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),a=S(),c=a.lastPos;a.lastPos={lat:o,lng:r,t:s},be(a);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,u=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:u,t:s}})),i>Oe){y={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:z()}}));return}Ve(o,r);let l=0,f=0,p=0,M=0,m="no-last";c&&typeof c.lat=="number"&&typeof c.lng=="number"&&typeof c.t=="number"&&(l=Qe({lat:c.lat,lng:c.lng},{lat:o,lng:r}),f=Math.max(1,(s-c.t)/1e3),p=l/f,l<Re?m="jitter":l>je?m="teleport":p>qe?m="too-fast":(tt(l),M=l,m="ok")),y={lat:o,lng:r,acc:i,t:s,dist:Math.round(l),dt:Math.round(f),speed:Number(p.toFixed(2)),added:Math.round(M),reason:m,boostMs:Z()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:z()}}))},n=>{L=!1,y={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:z()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return L=!1,y={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ot(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>P()||await Q({silent:!0}))();const t=async()=>{P()||await Q({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function rt(){const e=Ye();return e?.err?"🔴":e?.lat&&P()?"🟢":P()?"🟡":"⚪"}function G(){const e=z(),t=pe();return`
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
      <span style="opacity:.9;">${rt()} <b>${Number(e||0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function ee(){if(typeof window>"u"||window.__cbsgo_steps_widget_bound)return;window.__cbsgo_steps_widget_bound=!0;const e=()=>{const t=document.querySelector("#stepsMount");t&&(t.innerHTML=G())};window.addEventListener("cbsgo:stepsChanged",e),window.addEventListener("cbsgo:inventoryChanged",e)}function me(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function it(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const ye="cbsgo_player_name_v2",W="cbsgo_player_avatar_v2";function xe(){try{return localStorage.getItem(ye)||"Sovereign"}catch{return"Sovereign"}}function st(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ye,t)}catch{}return t}function he(){try{return localStorage.getItem(W)||""}catch{return""}}function at(e){const t=String(e||"");try{localStorage.setItem(W,t)}catch{}return t}function ct(){try{localStorage.removeItem(W)}catch{}}let d=null,v=null,U=null,dt=null,x=null,b=null,C=!1;const lt="cbsgo_daily_marker_v1",ut=6,pt=80,ft=220,gt=6e4,te=65;let O=0;function w(e){return document.getElementById(e)}function h(e){const t=w("cbsgoMapHost");if(!t)return;let n=w("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function bt(){const e=String(xe()||"").trim();return e?e[0].toUpperCase():"🙂"}function mt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function yt(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),c=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(c))}function xt(){return new Date().toISOString().slice(0,10)}function ht(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function wt(e){const t=he();if(t){const r=`
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
    ">${mt(bt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function vt(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function _t(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function St(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,s=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+s}}function kt(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function Mt(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function Et(e){if(!d||!x||!e)return;const t=Date.now();if(t-O<gt||x.getLayers().length>=ut)return;const o=window.L;if(!o)return;const r=kt(),i=St(e,pt,ft),s=vt(o,r),a=o.marker([i.lat,i.lng],{icon:s});a.on("click",()=>{if(!b){alert("GPS not ready yet. Wait until your player marker appears.");return}const c={lat:b[0],lng:b[1]},g={lat:i.lat,lng:i.lng},u=yt(c,g);if(u>te){alert(`Too far to open this gift.

Distance: ${Math.round(u)}m
Needed: ≤ ${te}m`);return}x.removeLayer(a);const l=Mt(r),f=`You found a gift!

Reward: ${l.text}`;alert(f);const p={kind:r,...l};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:p}))}catch{}}),a.addTo(x),O=t}function Lt(){return`
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
        <span>${_t()}</span>
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
  `}function zt(){try{d&&(d.remove(),d=null,v=null,U=null,dt=null,x=null,b=null,C=!1,O=0)}catch{}}function Ct(){const e=window.L,t=w("cbsgoMap");if(!e||!t)return!1;zt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return d=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(d),d.setView([51.687,4.87],16),U=e.layerGroup().addTo(d),x=e.layerGroup().addTo(d),!0}function Pt(e){const t=window.L;if(!t||!d)return;const n=wt(t);if(!v){v=t.marker(e,{icon:n}).addTo(d),d.setView(e,18);return}v.setIcon(n),v.setLatLng(e)}function Nt(e){ht(lt,e)}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Nt({date:xt(),shown:!0}),d&&window.L&&U&&(t.lat,t.lng,void 0))}));function At(){!navigator.geolocation||!d||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};b=[t,n],Pt([t,n]),Et(r),h(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{h(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function It(){let e=0;const t=120,n=()=>{if(e++,!w("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(h("Loading map engine…"),e<t)return setTimeout(n,100);h("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Ct()){h("Could not init map. Refresh.");return}const r=w("cbsgoCenterBtn");r&&(r.onclick=()=>{d&&b&&d.setView(b,18)});const i=w("cbsgoCompassBtn");i&&(i.onclick=()=>{d&&(C=!C,C?d.setView([51.687,4.87],3):b&&d.setView(b,16))}),h("Loading GPS…"),At()};n()}function we(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Tt(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function T(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function R(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function ne(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${we(e)}</div>
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
  `}function $t(){const e=xe(),t=he();return`
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
        ${Tt(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${we(e)}" maxlength="24" style="
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
  `}function Bt(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#profileMsg");a&&(a.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=st(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{at(String(a.result||"")),r("✅ Photo saved"),k()},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{ct(),r("✅ Photo removed"),k()})}function ve(){return`
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
  `}function _e(){const e=T();return e==="profile"?ne("Profile",`<div id="profileMount">${$t()}</div>`):e==="bag"?ne("Bag",`<div id="bagMount">${ve()}</div>`):""}function Dt(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Lt()}
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
          ${q()}
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
        ${_e()}
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
  `}function k(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=_e(),T()==="profile"&&Bt();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{R("map"),k()})}function Ot(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=T();R(n===t?"map":t||"map"),k()})})}function Se(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Dt(),Ot(),It(),ot(),ee(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=G(),ee())};window.addEventListener("cbsgo:stepsChanged",t)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const t=()=>{const n=document.querySelector("#xpMount");n&&(n.innerHTML=q())};window.addEventListener("cbsgo:xpChanged",t)}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const t=()=>{if(T()!=="bag")return;const n=document.querySelector("#bagMount");n&&(n.innerHTML=ve())};window.addEventListener("cbsgo:inventoryChanged",t)}if(k(),me()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",it)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){V({id:"__daily__",name:"Daily Glow"});return}if(ce(n))return;const o=ze.find(r=>r.id===n);o&&V(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&Le(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Ne);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),Se()})}))}}function ke(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function N(e){const t=ke();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";N(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{N(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function oe(){try{if(!document.getElementById("app")){N("❌ #app not found in index.html");return}Se();const t=ke();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){N(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",oe,{once:!0}):oe();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
