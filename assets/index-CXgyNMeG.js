(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Ye="modulepreload",Je=function(e){return"/cbs-go/"+e},ne={},He=function(t,n,o){let i=Promise.resolve();if(n&&n.length>0){let p=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var a=p;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),s=l?.nonce||l?.getAttribute("nonce");i=p(n.map(d=>{if(d=Je(d),d in ne)return;ne[d]=!0;const c=d.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":Ye,c||(g.as="script"),g.crossOrigin="",g.href=d,s&&g.setAttribute("nonce",s),document.head.appendChild(g),c)return new Promise((b,m)=>{g.addEventListener("load",b),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return i.then(l=>{for(const s of l||[])s.status==="rejected"&&r(s.reason);return t().catch(r)})},be=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],me="cbsgo_state_v6";function Xe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ve(){return{xp:0,completed:{},updatedAt:Date.now()}}function E(){const e=localStorage.getItem(me);return Xe(e,Ve())}function ye(e){e.updatedAt=Date.now(),localStorage.setItem(me,JSON.stringify(e))}function xe(e){return 100+(Math.max(1,Number(e||1))-1)*40}function N(){return Number(E().xp||0)}function B(){const e=N();let t=1,n=e;for(;;){const o=xe(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function ve(){const e=N();let t=1,n=e;for(;;){const o=xe(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function R(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return E();const n=E();return n.xp=Number(n.xp||0)+t,ye(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:B()}})),n}function J(e){const t=String(e||"");if(!t)return!1;const n=E();return!!(n.completed&&n.completed[t])}function he(e){const t=String(e||"");if(!t)return;const n=E();n.completed||(n.completed={}),n.completed[t]=Date.now(),ye(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Ze=Object.freeze(Object.defineProperty({__proto__:null,addXp:R,completeNode:he,getLevel:B,getXp:N,getXpIntoLevel:ve,isNodeCompleted:J},Symbol.toStringTag,{value:"Module"})),we="cbsgo_inventory_v1";function Qe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function et(){return{tickets:0}}function G(){const e=localStorage.getItem(we);return Qe(e,et())}function tt(e){localStorage.setItem(we,JSON.stringify(e))}function Se(){return Number(G().tickets||0)}function ke(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return G();const n=G();return n.tickets=Number(n.tickets||0)+t,tt(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const _e="cbsgo_steps_v6",nt="cbsgo_gps_autostart_v2",Me="cbsgo_daily_puzzle_v1",Ee="cbsgo_daily_done_v1",ot=.7,it=200,rt=1,st=250,at=5,oe=60,W=1500;let I=null,P=!1,v={msg:"init"};function lt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function dt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,updatedAt:Date.now()}}function _(){const e=localStorage.getItem(_e);return lt(e,dt())}function H(e){e.updatedAt=Date.now(),localStorage.setItem(_e,JSON.stringify(e))}function C(){return Number(_().steps||0)}function A(){return!!P}function ct(){return v}function z(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function pt(){try{return localStorage.getItem(Me)===z()}catch{return!1}}function ut(){try{localStorage.setItem(Me,z())}catch{}}function gt(e,t){return pt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:z()}})),ut(),!0)}function Ne(){try{return localStorage.getItem(Ee)===z()}catch{return!1}}function ft(){try{localStorage.setItem(Ee,z())}catch{}}function ie(){const e=_(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function bt(e=oe){const t=Number(e),n=(Number.isFinite(t)&&t>0?t:oe)*60*1e3,o=_(),r=Date.now()+n;return o.boostUntil=Math.max(Number(o.boostUntil||0),r),o.boostLastStep=Number(o.steps||0),H(o),window.dispatchEvent(new CustomEvent("cbsgo:boostChanged",{detail:{boostUntil:o.boostUntil}})),{ok:!0,boostUntil:o.boostUntil}}function mt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const i=o-n;if(!Number.isFinite(i)||i<W)return;const r=Math.floor(i/W);r<=0||(ke(r),e.boostLastStep=n+r*W)}function yt(e,t){const o=p=>p*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),a=o(e.lat),l=o(t.lat),s=Math.sin(i/2)**2+Math.cos(a)*Math.cos(l)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(s))}function xt(e){!e.rewarded5k&&e.steps>=5e3&&(e.rewarded5k=!0,R(20)),!e.rewarded10k&&e.steps>=1e4&&(e.rewarded10k=!0,ke(1))}function vt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return _();const n=_();n.meters=Number(n.meters||0)+t;const o=Math.floor((n.meters||0)/ot);return o>n.steps&&(n.steps=o),xt(n),mt(n),H(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function ht(){I!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(I),I=null}async function re(e={}){const t=!!e.silent;if(!navigator.geolocation)return v={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(nt,"1")}catch{}ht(),P=!0,v={msg:"requesting",t:Date.now()};try{return I=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,i=n.coords.longitude,r=n.coords.accuracy||999,a=Date.now(),l=_(),s=l.lastPos;l.lastPos={lat:o,lng:i,t:a},H(l);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,d=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:i,acc:r,heading:p,speed:d,t:a}})),window.dispatchEvent(new CustomEvent("cbsgo:gps",{detail:{lat:o,lng:i,acc:r}})),r>it){v={lat:o,lng:i,acc:r,t:a,reason:"accuracy",boostMs:ie()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:C()}}));return}gt(o,i);let c=0,f=0,g=0,b=0,m="no-last";s&&typeof s.lat=="number"&&typeof s.lng=="number"&&typeof s.t=="number"&&(c=yt({lat:s.lat,lng:s.lng},{lat:o,lng:i}),f=Math.max(1,(a-s.t)/1e3),g=c/f,c<rt?m="jitter":c>st?m="teleport":g>at?m="too-fast":(vt(c),b=c,m="ok")),v={lat:o,lng:i,acc:r,t:a,dist:Math.round(c),dt:Math.round(f),speed:Number(g.toFixed(2)),added:Math.round(b),reason:m,boostMs:ie()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:C()}}))},n=>{P=!1,v={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:C()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return P=!1,v={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function wt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>A()||await re({silent:!0}))();const t=async()=>{A()||await re({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}let X=!1;function se(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function k(){const e=document.querySelector("#cbsgoPuzzleModal");e&&e.remove(),X=!1}function ae(e){k();const t=document.createElement("div");t.id="cbsgoPuzzleModal",t.innerHTML=e,document.body.appendChild(t),X=!0;const n=document.querySelector("#pmClose");n&&(n.onclick=k);const o=document.querySelector("#pmOverlay");o&&(o.onclick=i=>{i.target===o&&k()})}function St(e){return Ne()?"":`
  <div id="pmOverlay" style="
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,.55);
    backdrop-filter: blur(10px);
    display:flex; align-items:center; justify-content:center;
    padding:16px;
  ">
    <div style="
      width:min(520px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.6);
      overflow:hidden;
      color:#fff;
      font-family:system-ui, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
      ">
        <div style="font-weight:900;">✨ Daily Glow Puzzle</div>
        <button id="pmClose" type="button" style="
          border:0; padding:8px 10px; border-radius:12px;
          background:rgba(255,255,255,.08); color:#fff;
        ">Close</button>
      </div>

      <div style="padding:14px;">
        <div style="opacity:.9; font-size:13px;">
          This one spawns <b>on your location</b> so you can always do at least one puzzle even in bad weather.
        </div>

        <div style="
          margin-top:12px;
          padding:12px;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.04);
        ">
          <div style="font-weight:900; font-size:14px;">Mini-challenge</div>
          <div style="opacity:.85; font-size:13px; margin-top:6px;">
            Type <b>GLOW</b> to activate your 1-hour glow boost.
          </div>

          <div style="display:flex; gap:8px; margin-top:10px;">
            <input id="dailyAnswer" placeholder="Type GLOW" style="
              flex:1;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            "/>
            <button id="dailySubmit" class="btn" type="button" style="
              border:0;
              padding:10px 12px;
              border-radius:12px;
              background:rgba(255,255,255,.12);
              color:#fff;
              font-weight:800;
            ">OK</button>
          </div>

          <div id="dailyMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>
        </div>

        <div style="
          margin-top:12px;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.10);
          background:rgba(0,0,0,.18);
          font-size:12px;
          opacity:.85;
        ">
          Reward: <b>Glow Boost</b> (1 hour) → every <b>1500 steps</b> gives <b>+1 ticket</b>.
        </div>
      </div>
    </div>
  </div>
  `}function kt(){const e=document.querySelector("#dailyAnswer"),t=document.querySelector("#dailySubmit"),n=document.querySelector("#dailyMsg"),o=r=>{n&&(n.textContent=r||"")},i=()=>{if(String(e?.value||"").trim().toUpperCase()!=="GLOW"){o("❌ Not correct. Type GLOW.");return}ft(),bt(60),R(10),o("✅ Glow activated! 1 hour boost is ON (+10 XP)."),setTimeout(()=>k(),650)};t&&(t.onclick=i),e&&e.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}function _t(e){const t=e?.name||"Puzzle",n=String(e?.id||"");return`
  <div id="pmOverlay" style="
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,.55);
    backdrop-filter: blur(10px);
    display:flex; align-items:center; justify-content:center;
    padding:16px;
  ">
    <div style="
      width:min(520px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(10,12,18,.92);
      box-shadow:0 18px 60px rgba(0,0,0,.6);
      overflow:hidden;
      color:#fff;
      font-family:system-ui, sans-serif;
    ">
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.10);
      ">
        <div style="font-weight:900;">🧩 ${se(t)}</div>
        <button id="pmClose" type="button" style="
          border:0; padding:8px 10px; border-radius:12px;
          background:rgba(255,255,255,.08); color:#fff;
        ">Close</button>
      </div>

      <div style="padding:14px;">
        <div style="opacity:.85; font-size:13px;">
          Quick puzzle. Answer correctly to complete this node (then it disappears).
        </div>

        <div style="
          margin-top:12px;
          padding:12px;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.04);
        ">
          <div style="font-weight:900; font-size:14px;">Mini-challenge</div>
          <div style="opacity:.85; font-size:13px; margin-top:6px;">
            Type <b>CBS</b> to complete this node.
          </div>

          <div style="display:flex; gap:8px; margin-top:10px;">
            <input id="nodeAnswer" placeholder="Type CBS" style="
              flex:1;
              padding:10px 10px;
              border-radius:12px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(255,255,255,.06);
              color:#fff;
            "/>
            <button id="nodeSubmit" type="button" style="
              border:0;
              padding:10px 12px;
              border-radius:12px;
              background:rgba(255,255,255,.12);
              color:#fff;
              font-weight:800;
            ">OK</button>
          </div>

          <div id="nodeMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>
        </div>
      </div>

      <div style="
        padding:10px 14px;
        border-top:1px solid rgba(255,255,255,.10);
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:12px;
        opacity:.8;
      ">
        <span>Node ID: ${se(n)}</span>
        <span>Reward: +5 XP</span>
      </div>
    </div>
  </div>
  `}function Mt(e){const t=document.querySelector("#nodeAnswer"),n=document.querySelector("#nodeSubmit"),o=document.querySelector("#nodeMsg"),i=a=>{o&&(o.textContent=a||"")},r=()=>{if(String(t?.value||"").trim().toUpperCase()!=="CBS"){i("❌ Not correct. Type CBS.");return}he(e.id),R(5),i("✅ Completed! (+5 XP)"),setTimeout(()=>k(),650)};n&&(n.onclick=r),t&&t.addEventListener("keydown",a=>{a.key==="Enter"&&r()})}function le(e){if(X&&k(),String(e?.type||"")==="daily"){if(Ne())return;const o=St();if(!o)return;ae(o),kt();return}const n=_t(e);ae(n),Mt(e)}function de(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Et(){const e=Number(N()||0),t=Number(B()||1),n=Number(ve()||0),o=de(n,0,100),i=de(o/100*100,0,100);return`
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
  `}function Nt(){const e=ct()||{};return e.err?"🔴":e.lat&&A()?"🟢":A()?"🟡":"⚪"}function ze(){const e=C(),t=Se();return`
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
      <span style="opacity:.9;">${Nt()} <b>${e}</b> steps</span>
      <span style="opacity:.9;">🎟️ <b>${t}</b></span>
    </div>
  `}function Le(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function zt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const F="cbsgo_leaderboard_v2",Ie="cbsgo_player_name_v2",V="cbsgo_player_avatar_v2";function Pe(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function Lt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function q(){try{return localStorage.getItem(Ie)||"Sovereign"}catch{return"Sovereign"}}function Ce(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Ie,t)}catch{}return t}function Z(){try{return localStorage.getItem(V)||""}catch{return""}}function It(e){const t=String(e||"");try{localStorage.setItem(V,t)}catch{}return t}function Pt(){try{localStorage.removeItem(V)}catch{}}function Ct(e=10){const t=Pe(F,[]);return Array.isArray(t)?t.slice(0,e):[]}function At(){const e=q(),t=Z(),n=N(),o=B(),i=Pe(F,[]),r=Array.isArray(i)?i:[],a=r.find(l=>l.name===e);return a?(a.xp=n,a.level=o,a.avatar=t,a.t=Date.now()):r.push({name:e,xp:n,level:o,avatar:t,t:Date.now()}),r.sort((l,s)=>Number(s.xp||0)-Number(l.xp||0)),Lt(F,r),{name:e,xp:n,level:o,avatar:t}}let u=null,M=null,y=null,w=null,$=null,T=!0;const K="cbsgo_nodes_pos_v3",Ae="cbsgo_daily_marker_v1";function D(e){return document.getElementById(e)}function h(e){const t=D("cbsgoMapHost");if(!t)return;let n=D("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="86px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function $t(){const e=String(q()||"").trim();return e?e[0].toUpperCase():"🙂"}function Tt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function $e(e,t){const o=p=>p*Math.PI/180,i=o(t.lat-e.lat),r=o(t.lng-e.lng),a=o(e.lat),l=o(t.lat),s=Math.sin(i/2)**2+Math.cos(a)*Math.cos(l)*Math.sin(r/2)**2;return 2*6371e3*Math.asin(Math.sqrt(s))}function Te(){return new Date().toISOString().slice(0,10)}function Q(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function De(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Oe(){return be.filter(e=>e.type!=="group"&&!J(e.id))}function Dt(e){const t=Z();if(t){const i=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${t}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return e.divIcon({html:i,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const o=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${Tt($t())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function Ot(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"};
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function Bt(e){return e.divIcon({html:`
    <div style="
      width:52px;height:52px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 22px rgba(120,220,255,.70), 0 0 40px rgba(120,220,255,.35), 0 12px 26px rgba(0,0,0,.40);
      font-size:22px;
    ">
      ✨🧩
    </div>
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function Rt(e){const t=Q(K,null);if(t&&t.seed&&t.posById)return t;const n=Oe(),o={},i=[],r=90,a=180,l=520,s=5e3;function p(f,g,b){const m=g*Math.cos(b)/111111,S=g*Math.sin(b)/(111111*Math.cos(f*Math.PI/180));return{dLat:m,dLng:S}}let d=0;for(const f of n){let g=!1;for(;!g&&d<s;){d++;const b=a+Math.random()*(l-a),m=Math.random()*Math.PI*2,S=p(e.lat,b,m),te={lat:e.lat+S.dLat,lng:e.lng+S.dLng};g=i.every(Ke=>$e(Ke,te)>=r),g&&(i.push(te),o[f.id]={dLat:S.dLat,dLng:S.dLng})}if(!o[f.id]){const b=p(e.lat,a,Math.random()*Math.PI*2);o[f.id]={dLat:b.dLat,dLng:b.dLng}}}const c={seed:e,posById:o,createdAt:Date.now()};return De(K,c),c}function qt(e,t){const n=Q(K,null),o=n?.seed||t,i=n?.posById?.[e.id];return!o||!i?null:{lat:o.lat+i.dLat,lng:o.lng+i.dLng}}function Ut(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- overlay: kompas + weer + recenter, linksboven -->
      <div style="
        position:absolute;
        top:12px;
        left:12px;
        z-index:6000;
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
            width:52px;height:52px;
            border-radius:999px;
            border:1px solid rgba(255,255,255,.55);
            background:rgba(0,0,0,.65);
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:22px;
            color:#fff;
            backdrop-filter:blur(12px);
          ">
            ☀️
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
  `}function jt(){try{u&&(u.remove(),u=null,M=null,y=null,w=null,$=null)}catch{}}function Wt(){const e=window.L,t=D("cbsgoMap");if(!e||!t)return!1;jt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return u=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),u.on("dragstart",()=>{T=!1}),u.on("zoomstart",()=>{T=!1}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(u),u.setView([51.687,4.87],16),y=e.layerGroup().addTo(u),!0}function Gt(e){const t=window.L;if(!t||!u)return;const n=Dt(t);if(!M){M=t.marker(e,{icon:n}).addTo(u),u.setView(e,18);return}M.setIcon(n),M.setLatLng(e)}function Ft(e){const t=window.L;if(!t||!u||!y)return;const n=w;y.clearLayers(),n&&(w=n,w.addTo(y));const o=Rt(e),i=Oe(),r=65,a=1600,l=[];for(const s of i){const p=qt(s,o.seed);if(!p)continue;const d=Math.round($e(e,p));d>a||l.push({node:s,ll:p,dist:d})}l.sort((s,p)=>s.dist-p.dist),l.forEach(({node:s,ll:p,dist:d})=>{const c=t.marker([p.lat,p.lng],{icon:Ot(t,d<=r)});c.on("click",()=>{if(d>r){alert(`Too far.

Go closer to open:
${s.name}
Distance: ${d}m
Required: ≤ ${r}m`);return}window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:s.id}}))}),c.addTo(y)})}function Kt(){return Q(Ae,{date:"",shown:!1})}function Be(e){De(Ae,e)}function Re(e){const t=window.L;if(!t||!u||!y)return;const n=Kt(),o=Te();n.date===o&&n.shown===!1||(n.date!==o&&Be({date:o,shown:!0}),!w&&(w=t.marker([e.lat,e.lng],{icon:Bt(t)}).addTo(y),w.on("click",()=>{window.dispatchEvent(new CustomEvent("cbsgo:openNode",{detail:{id:"__daily__"}}))}),h("✨ Daily Glow puzzle spawned on you (1x/day). Tap it to play.")))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Be({date:Te(),shown:!0}),u&&window.L&&y&&Re({lat:t.lat,lng:t.lng}))}));function Yt(){!navigator.geolocation||!u||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,i={lat:t,lng:n};if($=i,Gt([t,n]),Re(i),Ft(i),T&&u){const r=u.getZoom()||16,a=Math.max(r,16);u.setView(i,a)}h(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{h(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Jt(){const e=document.getElementById("cbsgoCompassArrow");if(!e||typeof window.DeviceOrientationEvent>"u")return;const t=n=>{let o=null;typeof n.webkitCompassHeading=="number"?o=n.webkitCompassHeading:typeof n.alpha=="number"&&(o=360-n.alpha),!(o==null||!Number.isFinite(o))&&(e.style.transform=`rotate(${o}deg)`)};window.addEventListener("deviceorientation",t,!0)}function Ht(){let e=0;const t=120,n=()=>{if(e++,!D("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(h("Loading map engine…"),e<t)return setTimeout(n,100);h("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Wt()){h("Could not init map. Refresh.");return}Jt();const i=document.getElementById("cbsgoRecenterBtn");i&&(i.onclick=()=>{if(T=!0,$&&u){const r=u.getZoom()||16,a=Math.max(r,16);u.setView($,a)}}),h("Loading GPS…"),Yt()};n()}const ee="cbsgo_wallet_v2",U="cbsgo_wallet_unlocked_v2";function j(){try{const e=localStorage.getItem(ee);if(!e)return null;const t=JSON.parse(e);return!t||typeof t!="object"||!t.pk||!t.pin?null:{pk:String(t.pk),pin:String(t.pin)}}catch(e){return console.warn("CBS GO: failed to load wallet from localStorage",e),null}}function Xt(e){localStorage.setItem(ee,JSON.stringify({pk:String(e.pk),pin:String(e.pin)}))}function Vt(){const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let t="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function qe(){return!!j()}function Zt(){return j()?sessionStorage.getItem(U)==="1":!1}function Qt(e){const t=String(e||"");if(t.length<4)throw new Error("PIN too short");j()&&console.warn("CBS GO: overwriting existing wallet");const o=Vt();return Xt({pk:o,pin:t}),sessionStorage.setItem(U,"1"),o}function en(e){const t=j();if(!t)throw new Error("No wallet");if(String(e||"")!==t.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(U,"1"),t.pk}function tn(){localStorage.removeItem(ee),sessionStorage.removeItem(U)}typeof window<"u"&&(window.cbsgoDevResetWallet=tn);const Ue="cbsgoLoginModal";function je(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function We(){const e=document.getElementById(Ue);e&&e.remove()}function nn(e){We();const t=document.createElement("div");return t.id=Ue,t.style.position="fixed",t.style.inset="0",t.style.zIndex="999999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="16px",t.style.background="rgba(0,0,0,.70)",t.style.backdropFilter="blur(12px)",t.innerHTML=e,document.body.appendChild(t),t}function on(e,t){return`
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
      ">${je(e)}</div>

      <div style="padding:14px 16px;">
        ${t}
      </div>
    </div>
  `}function L(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function ce(e=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${e?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function rn(){const e=!qe(),t=q()||"",n=e?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${je(t)}" style="${L()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${L()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${L()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${ce(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${L()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${ce(!0)}">Unlock</button>
      </div>
    `,o=nn(on(e?"Welcome to CBS-GO":"Unlock Wallet",n)),i=o.querySelector("#cbsgoLoginMsg"),r=d=>{i&&(i.textContent=d||"")},a=o.querySelector("#cbsgoPin"),l=o.querySelector("#cbsgoPin2"),s=o.querySelector("#cbsgoNick"),p=()=>{We(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(e){const d=o.querySelector("#cbsgoCreateBtn");d&&(d.onclick=async()=>{try{const c=String(s?.value||"").trim(),f=String(a?.value||"").trim(),g=String(l?.value||"").trim();if(c.length<2)return r("⛔ Nickname too short.");if(f.length<4)return r("⛔ PIN must be at least 4 digits.");if(f!==g)return r("⛔ PINs do not match.");r("Creating wallet…"),Ce(c),await Qt(f),r("✅ Wallet created. Starting…"),p()}catch(c){r(`⛔ ${String(c?.message||c)}`)}})}else{const d=o.querySelector("#cbsgoUnlockBtn");d&&(d.onclick=async()=>{try{const c=String(a?.value||"").trim();if(c.length<4)return r("⛔ PIN must be at least 4 digits.");r("Unlocking…"),await en(c),r("✅ Unlocked."),p()}catch{r("⛔ Wrong PIN (or wallet data missing).")}})}}function Y(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function pe(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function Ge(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function ue(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function ge(e,t){return`
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
          <div style="font-weight:900;">${Y(e)}</div>
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
  `}function sn(){const e=Ct(10),t=q(),n=Z();return`
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
          ${pe(n,44)}

          <div style="flex:1; min-width:220px;">
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input id="lbName" value="${Y(t)}" maxlength="24" style="
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
                      ${pe(o.avatar,28)}
                      <div style="min-width:0;">
                        <div style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${Y(o.name)}
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
  `}function an(){const e=document.querySelector("#lbName"),t=document.querySelector("#lbSubmit"),n=document.querySelector("#lbAvatar"),o=document.querySelector("#lbRemoveAvatar");let i=null;const r=l=>{const s=document.querySelector("#lbMsg");s&&(s.textContent=l||"")};e&&r(`✅ Profile loaded: ${e.value}`);const a=()=>{if(!e)return;const l=Ce(e.value);r(`✅ Name saved: ${l}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),i&&clearTimeout(i),i=setTimeout(a,300)}),e.addEventListener("blur",()=>{i&&clearTimeout(i),a()})),n&&n.addEventListener("change",()=>{const l=n.files&&n.files[0];if(!l)return;if(l.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),n.value="";return}r("Uploading photo…");const s=new FileReader;s.onload=()=>{It(String(s.result||"")),r("✅ Photo saved"),x()},s.onerror=()=>r("⛔ Failed to read image."),s.readAsDataURL(l)}),o&&(o.onclick=()=>{Pt(),r("✅ Photo removed"),x()}),t&&(t.onclick=()=>{e&&a();const l=At();r(`✅ Saved: ${l.name} – ${l.xp} XP`),x()})}function ln(){return`
    <div style="
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.04);
    ">
      <div style="font-weight:900; font-size:15px;">Inventory</div>
      <div style="opacity:.75; font-size:12px; margin-top:4px;">Items you collected in the real world.</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
        <div class="pill">🎟️ Tickets: <b>${Se()}</b></div>
        <div class="pill" style="opacity:.7;">🎆 Fireworks: <b>0</b> (soon)</div>
        <div class="pill" style="opacity:.7;">🪙 CBS / SOL / MON: <b>0</b> (later)</div>
      </div>
    </div>
  `}function dn(){const e=Ge();return e==="profile"?ge("Profile",`<div id="lbMount">${sn()}</div>`):e==="bag"?ge("Bag",`<div id="bagMount">${ln()}</div>`):""}function cn(){return`
    <div style="
      position:fixed;
      left:12px;
      bottom:90px;
      z-index:5500;
      display:flex;
      flex-direction:column;
      gap:10px;
      pointer-events:none;
    ">
      <button type="button" data-tab="profile" style="
        pointer-events:auto;
        width:52px; height:52px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.32);
        background:rgba(0,0,0,.70);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:22px;
        color:#fff;
        box-shadow:0 10px 26px rgba(0,0,0,.55);
        backdrop-filter:blur(12px);
      ">👤</button>

      <button type="button" data-tab="bag" style="
        pointer-events:auto;
        width:52px; height:52px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.32);
        background:rgba(0,0,0,.70);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:22px;
        color:#fff;
        box-shadow:0 10px 26px rgba(0,0,0,.55);
        backdrop-filter:blur(12px);
      ">🎒</button>
    </div>
  `}function pn(){const e=Le();return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Ut()}
      </div>

      <header style="
        position:absolute; top:0; left:0; right:0;
        z-index:4000;
        padding:10px 12px;
        padding-top: calc(10px + env(safe-area-inset-top));
        display:flex;
        align-items:flex-start;
        justify-content:flex-end; /* alleen rechts de XP/steps kaart */
        gap:10px;
        pointer-events:none;
      ">
        <div style="
          pointer-events:auto;
          display:flex;
          flex-direction:column;
          align-items:stretch;
        ">
          <div id="xpMount" style="
            padding:10px 12px;
            border-radius:18px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(10,12,18,.72);
            backdrop-filter: blur(10px);
          ">
            ${Et()}
          </div>

          <div id="stepsMount">
            ${ze()}
          </div>
        </div>
      </header>

      ${cn()}
      ${dn()}

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
  `}function un(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");ue(n||"map"),x()})});const e=document.querySelector("#cbsgoClosePanel");e&&e.addEventListener("click",()=>{ue("map"),x()})}function x(){const e=document.querySelector("#app");if(!e)return;if(!qe()||!Zt()){e.innerHTML=`
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
    `,setTimeout(()=>rn(),80),window.__cbsgo_login_listener_v1||(window.__cbsgo_login_listener_v1=!0,window.addEventListener("cbsgo:loginDone",()=>{x()}));return}if(e.innerHTML=pn(),un(),Ht(),wt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const n=()=>{const o=document.querySelector("#stepsMount");o&&(o.innerHTML=ze())};window.addEventListener("cbsgo:stepsChanged",n)}if(Ge()==="profile"&&an(),Le()){const n=document.querySelector("#resetBtn");n&&n.addEventListener("click",zt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",n=>{const o=n?.detail?.id;if(!o)return;if(o==="__daily__"){le({id:"__daily__",name:"Daily Glow"});return}if(J(o))return;const i=be.find(r=>r.id===o);i&&le(i)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",n=>{const o=n?.detail?.id;o&&He(async()=>{const{completeNode:i}=await Promise.resolve().then(()=>Ze);return{completeNode:i}},void 0).then(({completeNode:i})=>{i(o),x()})}))}function Fe(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function O(e){const t=Fe();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";O(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{O(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function fe(){try{if(!document.getElementById("app")){O("❌ #app not found in index.html");return}x();const t=Fe();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){O(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fe,{once:!0}):fe();
