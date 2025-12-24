(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const ke=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],se="cbsgo_state_v7";function ae(e){const t=Math.max(1,Number(e||1));if(t<=1)return 0;let n=0;for(let o=2;o<=t;o++)n+=80+o*20;return n}function de(e){const t=Math.max(0,Number(e||0));let n=1;for(;ae(n+1)<=t;)n++;return n}function Me(){return{xp:0,level:1,completed:{},updatedAt:Date.now()}}function Ne(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function _(){const e=localStorage.getItem(se);return Ne(e,Me())}function le(e){e.updatedAt=Date.now(),localStorage.setItem(se,JSON.stringify(e))}function j(){return Number(_().xp||0)}function H(){const e=_(),t=Number(e.xp||0),n=de(t),o=Number(e.level||1);return Math.max(1,o,n)}function ze(){const e=j(),t=H(),n=ae(t);return Math.max(0,e-n)}function Ee(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return _();const n=_();n.xp=Number(n.xp||0)+t;const o=de(n.xp);return n.level=Math.max(Number(n.level||1),o,1),le(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:n.level}})),n}function Ce(e){const t=String(e||"").trim();if(!t)return!1;const n=_();return!!(n.completed&&n.completed[t])}function Le(e){const t=String(e||"").trim();if(!t)return _();const n=_();return n.completed||(n.completed={}),n.completed[t]=!0,le(n),window.dispatchEvent(new CustomEvent("cbsgo:stateChanged",{detail:{type:"nodeCompleted",id:t}})),n}const ce="cbsgo_inventory_v1";function $e(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Pe(){return{tickets:0}}function R(){const e=localStorage.getItem(ce);return $e(e,Pe())}function Ie(e){localStorage.setItem(ce,JSON.stringify(e))}function pe(){return Number(R().tickets||0)}function ue(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return R();const n=R();return n.tickets=Number(n.tickets||0)+t,Ie(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const fe="cbsgo_steps_v6",Te="cbsgo_gps_autostart_v2",ge="cbsgo_daily_puzzle_v1",Ae=.75,De=200,Be=1.5,Fe=250,Oe=3.6,Q=60,F=1500;let $=null,P=!1,h={msg:"init"};function Re(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function qe(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function M(){const e=localStorage.getItem(fe);return Re(e,qe())}function U(e){e.updatedAt=Date.now(),localStorage.setItem(fe,JSON.stringify(e))}function I(){return Number(M().steps||0)}function C(){return!!P}function Y(){return h}function K(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ge(){try{return localStorage.getItem(ge)===K()}catch{return!1}}function je(){try{localStorage.setItem(ge,K())}catch{}}function He(e,t){return Ge()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:K()}})),je(),!0)}function ee(){const e=M(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ue(e=Q){const t=Number(e),n=(Number.isFinite(t)&&t>0?t:Q)*60*1e3,o=M(),r=Date.now()+n;return o.boostUntil=Math.max(Number(o.boostUntil||0),r),o.boostLastStep=Number(o.steps||0),U(o),window.dispatchEvent(new CustomEvent("cbsgo:boostChanged",{detail:{boostUntil:o.boostUntil}})),{ok:!0,boostUntil:o.boostUntil}}function Ye(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const i=o-n;if(!Number.isFinite(i)||i<F)return;const r=Math.floor(i/F);r<=0||(ue(r),e.boostLastStep=n+r*F)}function Ke(e,t){const o=p=>p*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),d=Math.sin(i/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function Xe(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,Ee(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ue(1))}function We(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return M();const n=M();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/Ae);return o>n.steps&&(n.steps=o),Xe(n),Ye(n),U(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Je(){$!=null&&navigator.geolocation&&navigator.geolocation.clearWatch($),$=null}async function te(e={}){const t=!!e.silent;if(!navigator.geolocation)return h={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Te,"1")}catch{}Je(),P=!0,h={msg:"requesting",t:Date.now()};try{return $=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,i=n.coords.longitude,r=n.coords.accuracy||999,s=Date.now(),a=M(),d=a.lastPos;a.lastPos={lat:o,lng:i,t:s},U(a);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,f=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:i,acc:r,heading:p,speed:f,t:s}})),r>De){h={lat:o,lng:i,acc:r,t:s,reason:"accuracy",boostMs:ee()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:I()}}));return}He(o,i);let g=0,v=0,N=0,k=0,l="no-last";d&&typeof d.lat=="number"&&typeof d.lng=="number"&&typeof d.t=="number"&&(g=Ke({lat:d.lat,lng:d.lng},{lat:o,lng:i}),v=Math.max(1,(s-d.t)/1e3),N=g/v,g<Be?l="jitter":g>Fe?l="teleport":N>Oe?l="too-fast":(We(g),k=g,l="ok")),h={lat:o,lng:i,acc:r,t:s,dist:Math.round(g),dt:Math.round(v),speed:Number(N.toFixed(2)),added:Math.round(k),reason:l,boostMs:ee()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:I()}}))},n=>{P=!1,h={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:I()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return P=!1,h={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Ve(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>C()||await te({silent:!0}))();const t=async()=>{C()||await te({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}const be="cbsgoPuzzleModal",me="__daily__";function Ze(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function z(){const e=document.getElementById(be);e&&e.remove()}function Qe(){z();const e=document.createElement("div");e.id=be,e.style.position="fixed",e.style.inset="0",e.style.zIndex="99999",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="16px",e.style.background="rgba(0,0,0,.62)",e.style.backdropFilter="blur(10px)",e.innerHTML=`
    <div style="
      width:min(720px, 96vw);
      max-height:min(82vh, 720px);
      overflow:auto;
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.55);
      color:#fff;
      font-family:system-ui, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
        position:sticky; top:0;
        background:rgba(10,12,18,.92);
        backdrop-filter: blur(10px);
        z-index:5;
      ">
        <div id="cbsgoPuzzleTitle" style="font-weight:900;">Puzzle</div>
        <button id="cbsgoPuzzleClose" type="button" style="
          border:0;
          padding:8px 10px;
          border-radius:12px;
          background:rgba(255,255,255,.08);
          color:#fff;
        ">Close</button>
      </div>

      <div id="cbsgoPuzzleBody" style="padding:14px;"></div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("#cbsgoPuzzleClose");return t&&(t.onclick=z),e.addEventListener("click",n=>{n.target===e&&z()}),window.addEventListener("keydown",n=>{n.key==="Escape"&&z()},{once:!0}),e}function et(e){const i=Array.from({length:25},()=>({mine:!1,revealed:!1,flagged:!1,n:0}));let r=0;for(;r<5;){const l=Math.floor(Math.random()*25);i[l].mine||(i[l].mine=!0,r++)}const s=(l,b)=>l*5+b,a=(l,b)=>l>=0&&b>=0&&l<5&&b<5;for(let l=0;l<5;l++)for(let b=0;b<5;b++){const x=s(l,b);if(i[x].mine)continue;let u=0;for(let c=-1;c<=1;c++)for(let m=-1;m<=1;m++){if(!c&&!m)continue;const V=l+c,Z=b+m;a(V,Z)&&i[s(V,Z)].mine&&u++}i[x].n=u}const d=document.createElement("div"),p=document.createElement("div");p.style.marginBottom="10px",p.style.opacity=".85",p.style.fontSize="13px",p.innerHTML="Clear all safe tiles. <b>Win = 60 min Glow</b> (extra tickets while walking).",d.appendChild(p);const f=document.createElement("div");f.style.display="grid",f.style.gridTemplateColumns="repeat(5, 1fr)",f.style.gap="8px",f.style.userSelect="none",d.appendChild(f);const g=document.createElement("div");g.style.marginTop="12px",g.style.fontSize="13px",g.style.opacity=".9",d.appendChild(g);function v(l){g.textContent=l||""}function N(){return i.filter(l=>l.revealed&&!l.mine).length}function k(){f.innerHTML="",N()>=20&&(v("✅ Glow cleared! Boost activated."),e?.(),i.forEach(x=>{x.revealed=!0}));for(let x=0;x<25;x++){const u=i[x],c=document.createElement("button");c.type="button",c.style.aspectRatio="1 / 1",c.style.borderRadius="14px",c.style.border="1px solid rgba(255,255,255,.12)",c.style.background="rgba(255,255,255,.06)",c.style.color="#fff",c.style.fontWeight="900",c.style.fontSize="16px",c.style.display="flex",c.style.alignItems="center",c.style.justifyContent="center",c.style.boxShadow="0 10px 20px rgba(0,0,0,.25)",u.revealed?(c.style.background=u.mine?"rgba(255,80,80,.18)":"rgba(90,200,255,.18)",c.textContent=u.mine?"💥":u.n?String(u.n):""):u.flagged?c.textContent="🚩":c.textContent="",c.onclick=()=>{u.revealed||(u.flagged&&(u.flagged=!1),u.revealed=!0,u.mine?(i.forEach(m=>{m.mine&&(m.revealed=!0)}),v("⛔ Boom. Try again tomorrow (daily).")):v(""),k())},c.oncontextmenu=m=>(m.preventDefault(),u.revealed||(u.flagged=!u.flagged,k()),!1),f.appendChild(c)}}return v("Tip: long-press (or right-click) to flag."),k(),d}function tt(e){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-size:18px; font-weight:900;">${Ze(e?.name||"Puzzle")}</div>
      <div style="opacity:.8; font-size:13px; margin-top:6px;">
        Solve to mark this node as completed.
      </div>

      <button id="cbsgoSolveNode" type="button" style="
        margin-top:12px;
        width:100%;
        padding:12px 14px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(90,200,255,.18);
        color:#fff;
        font-weight:900;
      ">Solve</button>
    </div>
  `}function ye(e){const t=Qe(),n=t.querySelector("#cbsgoPuzzleTitle"),o=t.querySelector("#cbsgoPuzzleBody");if(e&&e.id===me){if(n&&(n.textContent="Daily Glow Puzzle"),o){o.innerHTML="";const r=et(()=>{Ue(60),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged"))});o.appendChild(r)}return}n&&(n.textContent=e?.name?`Puzzle: ${e.name}`:"Puzzle"),o&&(o.innerHTML=tt(e));const i=document.getElementById("cbsgoSolveNode");i&&(i.onclick=()=>{e?.id&&window.dispatchEvent(new CustomEvent("cbsgo:completeNode",{detail:{id:e.id}})),z()})}window.__cbsgo_daily_listener_v2||(window.__cbsgo_daily_listener_v2=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};ye({id:me,name:"Daily Glow Puzzle",lat:t.lat,lng:t.lng})}));function ne(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function nt(){const e=Number(j()||0),t=Number(H()||1),n=Number(ze()||0),o=ne(n,0,100),i=ne(o/100*100,0,100);return`
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
          width:${i}%;
          background:rgba(255,255,255,.75);
        "></div>
      </div>

      <div style="margin-top:6px; font-size:11px; opacity:.65;">
        Total XP: ${e}
      </div>
    </div>
  `}function ot(){const e=Y();return e?.err?"🔴":e?.lat&&C()?"🟢":C()?"🟡":"⚪"}function it(e,t=0){const n=Number(e);return Number.isFinite(n)?n.toFixed(t):""}function rt(e){const t=Math.max(0,Number(e||0)),n=Math.floor(t/1e3),o=Math.floor(n/60),i=n%60;return`${o}:${String(i).padStart(2,"0")}`}function st(){const e=Y()||{};return Number.isFinite(e.boostMs)?Number(e.boostMs):0}function at(){const e=st();return e<=0?"":`✨ Glow: <b>${rt(e)}</b> left · 🎟️ +1 / 1500 steps`}function dt(){const e=Y()||{};if(e.err)return`GPS: ${e.err}`;if(!C())return"GPS: off";if(!e.lat)return"GPS: starting…";const t=[];return Number.isFinite(e.acc)&&t.push(`acc ${Math.round(e.acc)}m`),e.reason&&t.push(e.reason),Number.isFinite(e.added)&&t.push(`+${Math.round(e.added)}m`),Number.isFinite(e.dist)&&t.push(`d ${Math.round(e.dist)}m`),Number.isFinite(e.speed)&&t.push(`${it(e.speed,1)} m/s`),t.length?`GPS: ${t.join(" · ")}`:"GPS: ok"}function ve(){const e=I(),t=pe(),n=at();return`
    <div style="
      margin-top:6px;
      padding:8px 10px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(10,12,18,.72);
      backdrop-filter: blur(10px);
      display:flex;
      flex-direction:column;
      gap:6px;
      white-space:nowrap;
      font-size:12px;
      min-width: 210px;
    ">
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      ">
        <span style="opacity:.9;">${ot()} <b>${e}</b> steps</span>
        <span style="opacity:.9;">🎟️ <b>${t}</b></span>
      </div>

      ${n?`<div style="
              opacity:.95;
              font-size:11px;
              line-height:1.1;
              border-radius:10px;
              padding:6px 8px;
              border:1px solid rgba(120,220,255,.22);
              background:rgba(90,200,255,.10);
              box-shadow:0 0 18px rgba(90,200,255,.10);
            ">${n}</div>`:""}

      <div style="
        opacity:.75;
        font-size:11px;
        line-height:1;
      ">
        ${dt()}
      </div>
    </div>
  `}function xe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function lt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const q="cbsgo_leaderboard_v2",he="cbsgo_player_name_v2",X="cbsgo_player_avatar_v2";function we(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ct(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function W(){try{return localStorage.getItem(he)||"Sovereign"}catch{return"Sovereign"}}function pt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(he,t)}catch{}return t}function B(){try{return localStorage.getItem(X)||""}catch{return""}}function ut(e){const t=String(e||"");try{localStorage.setItem(X,t)}catch{}return t}function ft(){try{localStorage.removeItem(X)}catch{}}function gt(e=10){const t=we(q,[]);return Array.isArray(t)?t.slice(0,e):[]}function bt(){const e=W(),t=B(),n=j(),o=H(),i=we(q,[]),r=Array.isArray(i)?i:[],s=r.find(a=>a.name===e);return s?(s.xp=n,s.level=o,s.avatar=t,s.t=Date.now()):r.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),r.sort((a,d)=>Number(d.xp||0)-Number(a.xp||0)),ct(q,r),{name:e,xp:n,level:o,avatar:t}}let y=null,E=null,O=null,Se=null;function L(e){return document.getElementById(e)}function w(e){const t=L("cbsgoMapHost");if(!t)return;let n=L("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function T(e){const t=Number(e);return Number.isFinite(t)?(t%360+360)%360:null}function mt(e,t){const n=f=>f*Math.PI/180,o=f=>f*180/Math.PI,i=n(e.lat),r=n(t.lat),s=n(t.lng-e.lng),a=Math.sin(s)*Math.cos(r),d=Math.cos(i)*Math.sin(r)-Math.sin(i)*Math.cos(r)*Math.cos(s);let p=o(Math.atan2(a,d));return p=(p+360)%360,p}function yt(){const e=String(W()||"").trim();return e?e[0].toUpperCase():"🙂"}function vt(e,t){const n=B(),o=yt(),i=Number.isFinite(t)?`transform: rotate(${t}deg);`:"",r=n?`
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${n}');
        background-size:cover;
        background-position:center;
      "></div>
    `:`
      <div style="
        width:44px;height:44px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background:rgba(0,0,0,.35);
        display:flex;align-items:center;justify-content:center;
        font-weight:900;font-size:16px;color:#fff;
      ">${o}</div>
    `,s=`
    <div style="position:relative; width:54px; height:54px;">
      <div style="
        position:absolute;
        left:50%; top:-2px;
        width:0; height:0;
        border-left:9px solid transparent;
        border-right:9px solid transparent;
        border-bottom:16px solid rgba(90,200,255,.95);
        filter: drop-shadow(0 6px 10px rgba(0,0,0,.35));
        transform-origin: 50% 22px;
        ${i}
      "></div>

      <div style="
        position:absolute; inset:4px;
        border-radius:999px;
        box-shadow:0 0 18px rgba(90,200,255,.25);
        border:1px solid rgba(90,200,255,.20);
      "></div>

      <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);">
        ${r}
      </div>
    </div>
  `;return e.divIcon({html:s,className:"",iconSize:[54,54],iconAnchor:[27,27]})}function xt(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Compass overlay -->
      <div id="cbsgoCompass" style="
        position:absolute;
        right:12px;
        bottom: calc(86px + 12px);
        z-index: 9999;
        width:44px; height:44px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.14);
        background:rgba(10,12,18,.70);
        backdrop-filter: blur(10px);
        display:flex;
        align-items:center;
        justify-content:center;
        user-select:none;
        pointer-events:none;
      ">
        <div id="cbsgoCompassNeedle" style="
          width:0; height:0;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-bottom:18px solid rgba(255,70,70,.95);
          transform-origin: 50% 16px;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,.4));
        "></div>
      </div>
    </div>
  `}function ht(){try{y&&(y.remove(),y=null,E=null)}catch{}}function wt(){const e=window.L,t=L("cbsgoMap");return!e||!t?!1:(ht(),y=e.map(t,{zoomControl:!1,attributionControl:!1,minZoom:2,maxZoom:19,worldCopyJump:!0}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(y),y.setView([51.687,4.87],16),!0)}function St(e){const t=L("cbsgoCompassNeedle");if(!t)return;const n=T(e);Number.isFinite(n)&&(t.style.transform=`rotate(${n}deg)`)}function _t(e,t,n){const o=window.L;if(!o||!y)return;const i=vt(o,n);if(!E){E=o.marker([e,t],{icon:i}).addTo(y),y.setView([e,t],18);return}E.setIcon(i),E.setLatLng([e,t])}async function kt(){const e=async()=>{try{if(typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"&&await DeviceOrientationEvent.requestPermission()!=="granted")return;window.addEventListener("deviceorientation",Mt,!0),w("Compass ready.")}catch{}},t=async()=>{window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t),await e()};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}function Mt(e){Number.isFinite(e.alpha)&&(Se=T(e.alpha))}function Nt(){let e=0;const t=80,n=()=>{if(e++,!L("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(w("Loading map engine…"),e<t)return setTimeout(n,100);w("Map engine failed to load (Leaflet not found). Refresh.");return}if(!wt()){w("Could not init map. Refresh.");return}w("Waiting for GPS (steps.js)… Tap once for compass."),kt(),window.__cbsgo_playerpos_listener_mapview||(window.__cbsgo_playerpos_listener_mapview=!0,window.addEventListener("cbsgo:playerPos",i=>{const r=i?.detail||{},s=Number(r.lat),a=Number(r.lng),d=Number(r.acc);if(!Number.isFinite(s)||!Number.isFinite(a))return;let p=T(Se);Number.isFinite(p)||(p=T(r.heading)),!Number.isFinite(p)&&O&&(p=mt(O,{lat:s,lng:a})),O={lat:s,lng:a,t:r.t||Date.now()},_t(s,a,p),Number.isFinite(p)&&St(p),Number.isFinite(d)?w(`GPS OK • accuracy ~${Math.round(d)}m`):w("GPS OK")}))};n()}function A(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function G(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function J(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function oe(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function zt(){const e=J(),t=(n,o,i)=>`
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
      <div style="font-size:18px; line-height:18px;">${i}</div>
      <div style="font-size:11px;">${A(o)}</div>
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
  `}function ie(e,t){return`
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
          <div style="font-weight:900;">${A(e)}</div>
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
  `}function Et(){const e=gt(10),t=W(),n=B();return`
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
              <input id="lbName" value="${A(t)}" maxlength="24" style="
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
          </div>
        </div>
      </div>

      <div style="margin-top:10px;">
        ${e.length===0?'<div style="opacity:.75; font-size:13px;">No scores yet. Click “Save my score”.</div>':`
              <ol style="margin:0; padding-left:18px;">
                ${e.map((o,i)=>`
                  <li style="
                    display:flex; align-items:center; justify-content:space-between; gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                  ">
                    <div style="display:flex; gap:10px; align-items:center; min-width:0;">
                      <div style="opacity:.8; width:26px;">#${i+1}</div>
                      ${G(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${A(o.name)}
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
  `}function Ct(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let i=null;const r=a=>{const d=document.querySelector("#lbMsg");d&&(d.textContent=a||"")};e&&r(`✅ Profile loaded: ${e.value}`);const s=()=>{if(!e)return;const a=pt(e.value);r(`✅ Name saved: ${a}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),i&&clearTimeout(i),i=setTimeout(s,300)}),e.addEventListener("blur",()=>{i&&clearTimeout(i),s()})),n&&n.addEventListener("change",()=>{const a=n.files&&n.files[0];if(!a)return;if(a.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}r("Uploading photo…");const d=new FileReader;d.onload=()=>{ut(String(d.result||"")),r("✅ Photo saved"),S()},d.onerror=()=>r("⛔ Failed to read image."),d.readAsDataURL(a)}),o&&(o.onclick=()=>{ft(),r("✅ Photo removed"),S()}),t&&(t.onclick=()=>{e&&s();const a=bt();r(`✅ Saved: ${a.name} – ${a.xp} XP`),S()})}function Lt(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${pe()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function $t(){const e=J();return e==="profile"?ie("Profile",`<div id="lbMount">${Et()}</div>`):e==="bag"?ie("Bag",`<div id="bagMount">${Lt()}</div>`):""}function Pt(){const e=xe(),t=B();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- MAP fullscreen -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${xt()}
      </div>

      <!-- TOPBAR -->
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
            ${nt()}
          </div>

          <div id="stepsMount">
            ${ve()}
          </div>
        </div>
      </header>

      ${zt()}
      ${$t()}

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
  `}function It(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");oe(n||"map"),S()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{oe("map"),S()})}function S(){const e=document.querySelector("#app");if(!e)return;if(e.innerHTML=Pt(),It(),Nt(),Ve(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=ve())};window.addEventListener("cbsgo:stepsChanged",n),window.addEventListener("cbsgo:boostChanged",n)}if(J()==="profile"&&Ct(),xe()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",lt)}window.__cbsgo_complete_node_listener_v1||(window.__cbsgo_complete_node_listener_v1=!0,window.addEventListener("cbsgo:completeNode",n=>{const o=n?.detail?.id;o&&(Le(o),S())})),window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o||Ce(o))return;const i=ke.find(r=>r.id===o);i&&ye(i)}))}function _e(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function D(e){const t=_e();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";D(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{D(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function re(){try{if(!document.getElementById("app")){D("❌ #app not found in index.html");return}S();const t=_e();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){D(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",re,{once:!0}):re();
