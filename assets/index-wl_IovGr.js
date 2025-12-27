(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Me="modulepreload",Ee=function(e){return"/cbs-go/"+e},U={},Le=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(p){return Promise.all(p.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=g;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");r=g(n.map(p=>{if(p=Ee(p),p in U)return;U[p]=!0;const d=p.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${f}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Me,d||(u.as="script"),u.crossOrigin="",u.href=p,c&&u.setAttribute("nonce",c),document.head.appendChild(u),d)return new Promise((C,m)=>{u.addEventListener("load",C),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return r.then(a=>{for(const c of a||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})},Ce=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],oe="cbsgo_state_v6";function ze(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ne(){return{xp:0,completed:{},updatedAt:Date.now()}}function k(){const e=localStorage.getItem(oe);return ze(e,Ne())}function re(e){e.updatedAt=Date.now(),localStorage.setItem(oe,JSON.stringify(e))}function ie(e){return 100+(Math.max(1,Number(e||1))-1)*40}function T(){return Number(k().xp||0)}function j(){const e=T();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function se(){const e=T();let t=1,n=e;for(;;){const o=ie(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function L(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return k();const n=k();return n.xp=Number(n.xp||0)+t,re(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:j()}})),n}function ae(e){const t=String(e||"");if(!t)return!1;const n=k();return!!(n.completed&&n.completed[t])}function ce(e){const t=String(e||"");if(!t)return;const n=k();n.completed||(n.completed={}),n.completed[t]=Date.now(),re(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Pe=Object.freeze(Object.defineProperty({__proto__:null,addXp:L,completeNode:ce,getLevel:j,getXp:T,getXpIntoLevel:se,isNodeCompleted:ae},Symbol.toStringTag,{value:"Module"})),le="cbsgoPuzzleModal";function Y(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function K(){const e=document.getElementById(le);e&&e.remove()}function X(e){K();const t=document.createElement("div");t.id=le,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.style.fontFamily="system-ui, sans-serif",t.style.color="#fff";const n=e?.name||"CBS GO Puzzle",o="Puzzels komen later terug. Voor nu focussen we op lopen, XP en tickets.";t.innerHTML=`
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
  `,document.body.appendChild(t);const r=document.getElementById("cbsgoPuzzleClose"),i=document.getElementById("cbsgoPuzzleOk"),s=()=>{K()};r&&(r.onclick=s),i&&(i.onclick=()=>{try{e?.id&&ce(e.id),L(5)}catch{}s()})}const de="cbsgo_inventory_v1";function Ae(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ie(){return{tickets:0,cbs:0}}function w(){const e=localStorage.getItem(de);return Ae(e,Ie())}function pe(e){localStorage.setItem(de,JSON.stringify(e))}function ue(){return Number(w().tickets||0)}function Te(){return Number(w().cbs||0)}function $(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return w();const n=w();return n.tickets=Number(n.tickets||0)+t,pe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function $e(e=0){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return w();const n=w();return n.cbs=Number(n.cbs||0)+t,pe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const fe="cbsgo_steps_v6",Be="cbsgo_gps_autostart_v2",ge="cbsgo_daily_puzzle_v1",De=.75,Oe=200,Re=.3,je=400,Fe=20,B=1500,D=200,qe=.25,He=.05,Ge=.3;let z=null,N=!1,y={msg:"init"};function We(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ue(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,updatedAt:Date.now()}}function M(){const e=localStorage.getItem(fe);return We(e,Ue())}function be(e){e.updatedAt=Date.now(),localStorage.setItem(fe,JSON.stringify(e))}function S(){return Number(M().steps||0)}function A(){return!!N}function Ye(){return y}function F(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ke(){try{return localStorage.getItem(ge)===F()}catch{return!1}}function Xe(){try{localStorage.setItem(ge,F())}catch{}}function Ve(e,t){return Ke()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:F()}})),Xe(),!0)}function V(){const e=M(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Je(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<B)return;const i=Math.floor(r/B);i<=0||($(i),e.boostLastStep=n+i*B)}function Ze(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<D){e.chestMeters=t;return}let n=0;for(;t>=D&&n<5;)if(t-=D,n+=1,Math.random()<qe){const o=Math.random()<He,r=o?10:3,i=o?2:1;L(r),$(i);const s=o&&Math.random()<Ge;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function Qe(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),c=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(c))}function et(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,L(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,$(1))}function tt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return M();const n=M();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/De);return o>n.steps&&(n.steps=o),et(n),Je(n),Ze(n),be(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function nt(){z!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(z),z=null}async function J(e={}){const t=!!e.silent;if(!navigator.geolocation)return y={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Be,"1")}catch{}nt(),N=!0,y={msg:"requesting",t:Date.now()};try{return z=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),a=M(),c=a.lastPos;a.lastPos={lat:o,lng:r,t:s},be(a);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,p=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:p,t:s}})),i>Oe){y={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:V()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:S()}}));return}Ve(o,r);let d=0,f=0,u=0,C=0,m="no-last";c&&typeof c.lat=="number"&&typeof c.lng=="number"&&typeof c.t=="number"&&(d=Qe({lat:c.lat,lng:c.lng},{lat:o,lng:r}),f=Math.max(1,(s-c.t)/1e3),u=d/f,d<Re?m="jitter":d>je?m="teleport":u>Fe?m="too-fast":(tt(d),C=d,m="ok")),y={lat:o,lng:r,acc:i,t:s,dist:Math.round(d),dt:Math.round(f),speed:Number(u.toFixed(2)),added:Math.round(C),reason:m,boostMs:V()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:S()}}))},n=>{N=!1,y={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:S()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return N=!1,y={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function ot(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>A()||await J({silent:!0}))();const t=async()=>{A()||await J({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_listener_v1||(window.__cbsgo_loot_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&L(n),o>0&&$(o),r>0&&$e(r)}));function Z(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function rt(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function me(){const e=Number(T()||0),t=Number(j()||1),n=Number(se()||0),o=Number(S()||0),r=Z(n,0,100),i=Z(r/100*100,0,100),s=rt(o);return`
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
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=me())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function it(){const e=Ye();return e?.err?"🔴":e?.lat&&A()?"🟢":A()?"🟡":"⚪"}function q(){const e=S(),t=ue();return`
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
      <span style="opacity:.9;">${it()} <b>${Number(e||0)}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${Number(t||0)}</b></span>
    </div>
  `}function Q(){if(typeof window>"u"||window.__cbsgo_steps_widget_bound)return;window.__cbsgo_steps_widget_bound=!0;const e=()=>{const t=document.querySelector("#stepsMount");t&&(t.innerHTML=q())};window.addEventListener("cbsgo:stepsChanged",e),window.addEventListener("cbsgo:inventoryChanged",e)}function ye(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function st(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const xe="cbsgo_player_name_v2",H="cbsgo_player_avatar_v2";function he(){try{return localStorage.getItem(xe)||"Sovereign"}catch{return"Sovereign"}}function at(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(xe,t)}catch{}return t}function ve(){try{return localStorage.getItem(H)||""}catch{return""}}function ct(e){const t=String(e||"");try{localStorage.setItem(H,t)}catch{}return t}function lt(){try{localStorage.removeItem(H)}catch{}}let l=null,_=null,G=null,dt=null,x=null,b=null,P=!1;const pt="cbsgo_daily_marker_v1",ut=6,ft=80,gt=220,bt=6e4,ee=65;let O=0;function v(e){return document.getElementById(e)}function h(e){const t=v("cbsgoMapHost");if(!t)return;let n=v("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function mt(){const e=String(he()||"").trim();return e?e[0].toUpperCase():"🙂"}function yt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function xt(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),c=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(c))}function ht(){return new Date().toISOString().slice(0,10)}function vt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function wt(e){const t=ve();if(t){const r=`
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
    ">${yt(mt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function _t(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function St(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function kt(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,s=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+s}}function Mt(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function Et(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function Lt(e){if(!l||!x||!e)return;const t=Date.now();if(t-O<bt||x.getLayers().length>=ut)return;const o=window.L;if(!o)return;const r=Mt(),i=kt(e,ft,gt),s=_t(o,r),a=o.marker([i.lat,i.lng],{icon:s});a.on("click",()=>{if(!b){alert("GPS not ready yet. Wait until your player marker appears.");return}const c={lat:b[0],lng:b[1]},g={lat:i.lat,lng:i.lng},p=xt(c,g);if(p>ee){alert(`Too far to open this gift.

Distance: ${Math.round(p)}m
Needed: ≤ ${ee}m`);return}x.removeLayer(a);const d=Et(r),f=`You found a gift!

Reward: ${d.text}`;alert(f);const u={kind:r,...d};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:u}))}catch{}}),a.addTo(x),O=t}function Ct(){return`
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
        <span>${St()}</span>
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
  `}function zt(){try{l&&(l.remove(),l=null,_=null,G=null,dt=null,x=null,b=null,P=!1,O=0)}catch{}}function Nt(){const e=window.L,t=v("cbsgoMap");if(!e||!t)return!1;zt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return l=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(l),l.setView([51.687,4.87],16),G=e.layerGroup().addTo(l),x=e.layerGroup().addTo(l),!0}function Pt(e){const t=window.L;if(!t||!l)return;const n=wt(t);if(!_){_=t.marker(e,{icon:n}).addTo(l),l.setView(e,18);return}_.setIcon(n),_.setLatLng(e)}function At(e){vt(pt,e)}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(At({date:ht(),shown:!0}),l&&window.L&&G&&(t.lat,t.lng,void 0))}));function It(){!navigator.geolocation||!l||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};b=[t,n],Pt([t,n]),Lt(r),h(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{h(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Tt(){let e=0;const t=120,n=()=>{if(e++,!v("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(h("Loading map engine…"),e<t)return setTimeout(n,100);h("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Nt()){h("Could not init map. Refresh.");return}const r=v("cbsgoCenterBtn");r&&(r.onclick=()=>{l&&b&&l.setView(b,18)});const i=v("cbsgoCompassBtn");i&&(i.onclick=()=>{l&&(P=!P,P?l.setView([51.687,4.87],3):b&&l.setView(b,16))}),h("Loading GPS…"),It()};n()}function we(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function $t(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function W(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function R(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function te(e,t){return`
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
  `}function Bt(){const e=he(),t=ve();return`
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
        ${$t(t,64)}

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
  `}function Dt(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#profileMsg");a&&(a.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=at(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{ct(String(a.result||"")),r("✅ Photo saved"),E()},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{lt(),r("✅ Photo removed"),E()})}function Ot(){const e=ue(),t=Te();return`
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
          🎟️ Tickets: <b>${e}</b>
        </div>

        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🪙 CBS (play): <b>${t}</b>
        </div>
      </div>
    </section>
  `}function _e(){const e=W();return e==="profile"?te("Profile",`<div id="profileMount">${Bt()}</div>`):e==="bag"?te("Bag",`<div id="bagMount">${Ot()}</div>`):""}function Rt(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ct()}
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
          ${me()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${q()}
        </div>
      </header>

      <!-- Floating knoppen rechtsonder: Profile + Bag, naast elkaar, NET boven GPS -->
      <div id="fabNav" style="
        position:absolute;
        right:16px;
        bottom:80px; /* netjes tussen 🎯/🧭 en GPS-balk */
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

      ${ye()?`<button id="resetBtn" type="button" style="
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
  `}function E(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=_e(),W()==="profile"&&Dt();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{R("map"),E()})}function jt(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=W();R(n===t?"map":t||"map"),E()})})}function Se(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Rt(),jt(),Tt(),ot(),Q(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=q(),Q())};window.addEventListener("cbsgo:stepsChanged",t)}if(E(),ye()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",st)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){X({id:"__daily__",name:"Daily Glow"});return}if(ae(n))return;const o=Ce.find(r=>r.id===n);o&&X(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&Le(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Pe);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),Se()})}))}}function ke(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function I(e){const t=ke();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";I(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{I(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ne(){try{if(!document.getElementById("app")){I("❌ #app not found in index.html");return}Se();const t=ke();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){I(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ne,{once:!0}):ne();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
