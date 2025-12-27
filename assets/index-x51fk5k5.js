(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Ge="modulepreload",Ue=function(e){return"/cbs-go/"+e},ce={},We=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let h=function(b){return Promise.all(b.map(m=>Promise.resolve(m).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=h;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),p=a?.nonce||a?.getAttribute("nonce");r=h(n.map(b=>{if(b=Ue(b),b in ce)return;ce[b]=!0;const m=b.endsWith(".css"),f=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${b}"]${f}`))return;const x=document.createElement("link");if(x.rel=m?"stylesheet":Ge,m||(x.as="script"),x.crossOrigin="",x.href=b,p&&x.setAttribute("nonce",p),document.head.appendChild(x),m)return new Promise((S,v)=>{x.addEventListener("load",S),x.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${b}`)))})}))}function i(a){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=a,window.dispatchEvent(p),!p.defaultPrevented)throw a}return r.then(a=>{for(const p of a||[])p.status==="rejected"&&i(p.reason);return t().catch(i)})},Ye=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],xe="cbsgo_state_v6";function Xe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ve(){return{xp:0,completed:{},updatedAt:Date.now()}}function T(){const e=localStorage.getItem(xe);return Xe(e,Ve())}function he(e){e.updatedAt=Date.now(),localStorage.setItem(xe,JSON.stringify(e))}function ve(e){return 100+(Math.max(1,Number(e||1))-1)*40}function H(){return Number(T().xp||0)}function X(){const e=H();let t=1,n=e;for(;;){const o=ve(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function we(){const e=H();let t=1,n=e;for(;;){const o=ve(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function O(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return T();const n=T();return n.xp=Number(n.xp||0)+t,he(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:X()}})),n}function _e(e){const t=String(e||"");if(!t)return!1;const n=T();return!!(n.completed&&n.completed[t])}function Se(e){const t=String(e||"");if(!t)return;const n=T();n.completed||(n.completed={}),n.completed[t]=Date.now(),he(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Je=Object.freeze(Object.defineProperty({__proto__:null,addXp:O,completeNode:Se,getLevel:X,getXp:H,getXpIntoLevel:we,isNodeCompleted:_e},Symbol.toStringTag,{value:"Module"})),ke="cbsgoPuzzleModal";function Ze(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function le(){const e=document.getElementById(ke);e&&e.remove()}function de(e){le();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=80,i=15;let s=[],a=null,p=0,h=i,b=!1;const m=e?.name||"CBS GO Puzzle",f=document.createElement("div");f.id=ke,f.style.position="fixed",f.style.inset="0",f.style.zIndex="999999",f.style.display="flex",f.style.alignItems="center",f.style.justifyContent="center",f.style.padding="16px",f.style.background="rgba(0,0,0,.70)",f.style.backdropFilter="blur(12px)",f.style.fontFamily="system-ui, sans-serif",f.style.color="#fff",f.innerHTML=`
    <div style="
      width:min(420px, 96vw);
      border-radius:22px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(10,12,18,.96);
      box-shadow:0 18px 60px rgba(0,0,0,.65);
      overflow:hidden;
      display:flex;
      flex-direction:column;
      max-height:90vh;
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
          ${Ze(m)}
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

      <div style="padding:10px 14px 4px; font-size:12px; opacity:.9;">
        Match <b>3 or more</b> tiles in a row by swapping neighbors.  
        Reach the target score before you run out of moves.
      </div>

      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:4px 14px 10px;
        gap:10px;
        font-size:12px;
      ">
        <div>
          <div>Score: <span id="cbsgoScore">0</span></div>
          <div>Target: <span id="cbsgoTargetScore">${r}</span></div>
        </div>
        <div style="text-align:right;">
          <div>Moves left: <span id="cbsgoMoves">${i}</span></div>
        </div>
      </div>

      <div style="
        flex:1;
        padding:8px 14px 14px;
        display:flex;
        justify-content:center;
        align-items:center;
      ">
        <div id="cbsgoBoard" style="
          display:grid;
          grid-template-rows:repeat(${t}, 1fr);
          grid-template-columns:repeat(${n}, 1fr);
          gap:4px;
          width:min(320px, 90vw);
          aspect-ratio:1/1;
          touch-action:manipulation;
        "></div>
      </div>

      <div id="cbsgoStatus" style="
        padding:8px 14px 12px;
        font-size:12px;
        text-align:center;
        opacity:.85;
      "></div>

      <div style="padding:0 14px 12px; display:flex; gap:8px; flex-wrap:wrap;">
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
          Back to map
        </button>
      </div>
    </div>
  `,document.body.appendChild(f);const x=document.getElementById("cbsgoBoard"),S=document.getElementById("cbsgoScore"),v=document.getElementById("cbsgoMoves"),ee=document.getElementById("cbsgoStatus"),te=document.getElementById("cbsgoPuzzleClose"),ne=document.getElementById("cbsgoPuzzleOk");function E(l){ee&&(ee.textContent=l||"")}function oe(){return Math.floor(Math.random()*o.length)}function je(){s=[];for(let l=0;l<t;l++){const c=[];for(let d=0;d<n;d++)c.push(oe());s.push(c)}}function _(){if(x){x.innerHTML="";for(let l=0;l<t;l++)for(let c=0;c<n;c++){const d=s[l][c],u=document.createElement("div");u.dataset.row=String(l),u.dataset.col=String(c),u.style.borderRadius="12px",u.style.background=o[d]||"#444",u.style.display="flex",u.style.alignItems="center",u.style.justifyContent="center",u.style.cursor="pointer",u.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",a&&a.row===l&&a.col===c&&(u.style.outline="2px solid #fff",u.style.outlineOffset="2px"),u.addEventListener("click",()=>qe(l,c)),x.appendChild(u)}}}function Fe(l,c){if(!l||!c)return!1;const d=Math.abs(l.row-c.row),u=Math.abs(l.col-c.col);return d+u===1}function re(l,c){const d=s[l.row][l.col];s[l.row][l.col]=s[c.row][c.col],s[c.row][c.col]=d}function ie(){const l=new Set;for(let c=0;c<t;c++){let d=s[c][0],u=0;for(let g=1;g<=n;g++){const k=g<n?s[c][g]:null;if(k===d)continue;const P=g-u;if(d!=null&&P>=3)for(let M=u;M<g;M++)l.add(`${c},${M}`);d=k,u=g}}for(let c=0;c<n;c++){let d=s[0][c],u=0;for(let g=1;g<=t;g++){const k=g<t?s[g][c]:null;if(k===d)continue;const P=g-u;if(d!=null&&P>=3)for(let M=u;M<g;M++)l.add(`${M},${c}`);d=k,u=g}}return l}function Ke(l){if(!l||!l.size)return 0;const c=l.size;p+=c*5,S&&(S.textContent=String(p));for(const d of l){const[u,g]=d.split(","),k=Number(u),P=Number(g);s[k][P]=null}for(let d=0;d<n;d++){let u=t-1;for(let g=t-1;g>=0;g--)s[g][d]!=null&&(s[u][d]=s[g][d],u--);for(let g=u;g>=0;g--)s[g][d]=oe()}return c}function He(l=!1){b=!0;const c=()=>{const d=ie();if(!d.size){b=!1,_(),l&&(h<=0?se():E("Nice! Keep matching."));return}Ke(d),_(),setTimeout(c,120)};c()}function se(){if(p>=r){E("Great job! Puzzle completed 🎉");try{e?.id&&Se(e.id),O(10)}catch{}}else E("Out of moves. Try again next time 🙂")}function qe(l,c){if(b)return;const d={row:l,col:c};if(!a){a=d,_();return}if(a.row===l&&a.col===c){a=null,_();return}if(!Fe(a,d)){a=d,_();return}if(re(a,d),a=null,h--,v&&(v.textContent=String(h)),!ie().size){re({row:l,col:c},{row:d.row,col:d.col}),_(),E("No match… try another swap."),h<=0&&se();return}E(""),_(),He(!0)}function ae(){le()}te&&(te.onclick=ae),ne&&(ne.onclick=()=>{ae()}),je(),_(),E("Tap two neighboring tiles to swap them.")}const Me="cbsgo_inventory_v1";function Qe(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function et(){return{tickets:0,cbs:0}}function A(){const e=localStorage.getItem(Me),t=Qe(e,et());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Ee(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Me,JSON.stringify(t))}function tt(){return Number(A().tickets||0)}function nt(){return Number(A().cbs||0)}function q(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return A();const n=A();return n.tickets=Number(n.tickets||0)+t,Ee(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function ot(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return A();const n=A();return n.cbs=Number(n.cbs||0)+t,Ee(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Ce="cbsgo_steps_v6",rt="cbsgo_gps_autostart_v2",Le="cbsgo_daily_puzzle_v1",it=.75,st=200,at=.3,ct=400,lt=20,G=1500,U=200,dt=.25,ut=.05,pt=.3;let R=null,D=!1,C={msg:"init"};function ft(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function gt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function $(){const e=localStorage.getItem(Ce);return ft(e,gt())}function Ne(e){e.updatedAt=Date.now(),localStorage.setItem(Ce,JSON.stringify(e))}function j(){return Number($().steps||0)}function ue(){return!!D}function V(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function bt(){try{return localStorage.getItem(Le)===V()}catch{return!1}}function mt(){try{localStorage.setItem(Le,V())}catch{}}function yt(e,t){return bt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:V()}})),mt(),!0)}function pe(){const e=$(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function xt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<G)return;const i=Math.floor(r/G);i<=0||(q(i),e.boostLastStep=n+i*G)}function ht(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<U){e.chestMeters=t;return}let n=0;for(;t>=U&&n<5;)if(t-=U,n+=1,Math.random()<dt){const o=Math.random()<ut,r=o?10:3,i=o?2:1;O(r),q(i);const s=o&&Math.random()<pt;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:s}}));break}e.chestMeters=t}function vt(e,t){const o=h=>h*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),p=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(p))}function wt(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const a=n-o;a>0&&(O(a),e.xpKmAwarded=n)}const i=Math.floor(t/2500),s=Number(e.ticketChunksAwarded||0);if(i>s){const a=i-s;a>0&&(q(a),e.ticketChunksAwarded=i)}}function _t(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return $();const n=$();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/it);return o>n.steps&&(n.steps=o),wt(n),xt(n),ht(n),Ne(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function St(){R!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(R),R=null}async function fe(e={}){const t=!!e.silent;if(!navigator.geolocation)return C={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(rt,"1")}catch{}St(),D=!0,C={msg:"requesting",t:Date.now()};try{return R=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,s=Date.now(),a=$(),p=a.lastPos;a.lastPos={lat:o,lng:r,t:s},Ne(a);const h=Number.isFinite(n.coords.heading)?n.coords.heading:null,b=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:h,speed:b,t:s}})),i>st){C={lat:o,lng:r,acc:i,t:s,reason:"accuracy",boostMs:pe()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:j()}}));return}yt(o,r);let m=0,f=0,x=0,S=0,v="no-last";p&&typeof p.lat=="number"&&typeof p.lng=="number"&&typeof p.t=="number"&&(m=vt({lat:p.lat,lng:p.lng},{lat:o,lng:r}),f=Math.max(1,(s-p.t)/1e3),x=m/f,m<at?v="jitter":m>ct?v="teleport":x>lt?v="too-fast":(_t(m),S=m,v="ok")),C={lat:o,lng:r,acc:i,t:s,dist:Math.round(m),dt:Math.round(f),speed:Number(x.toFixed(2)),added:Math.round(S),reason:v,boostMs:pe()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:j()}}))},n=>{D=!1,C={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:j()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return D=!1,C={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function kt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ue()||await fe({silent:!0}))();const t=async()=>{ue()||await fe({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&O(n),o>0&&q(o),r>0&&ot(r)}));function ge(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Mt(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function ze(){const e=Number(H()||0),t=Number(X()||1),n=Number(we()||0),o=Number(j()||0),r=ge(n,0,100),i=ge(r/100*100,0,100),s=Mt(o);return`
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
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=ze())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function Ae(){return""}function Pe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Et(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const Ie="cbsgo_player_name_v2",J="cbsgo_player_avatar_v2";function Te(){try{return localStorage.getItem(Ie)||"Sovereign"}catch{return"Sovereign"}}function Ct(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Ie,t)}catch{}return t}function $e(){try{return localStorage.getItem(J)||""}catch{return""}}function Lt(e){const t=String(e||"");try{localStorage.setItem(J,t)}catch{}return t}function Nt(){try{localStorage.removeItem(J)}catch{}}let y=null,I=null,Z=null,zt=null,L=null,w=null,F=!1;const At="cbsgo_daily_marker_v1",Pt=6,It=80,Tt=220,$t=6e4,be=65;let W=0;function z(e){return document.getElementById(e)}function N(e){const t=z("cbsgoMapHost");if(!t)return;let n=z("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function Bt(){const e=String(Te()||"").trim();return e?e[0].toUpperCase():"🙂"}function Ot(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Rt(e,t){const o=h=>h*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),s=o(e.lat),a=o(t.lat),p=Math.sin(r/2)**2+Math.cos(s)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(p))}function Dt(){return new Date().toISOString().slice(0,10)}function jt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ft(e){const t=$e();if(t){const r=`
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
    ">${Ot(Bt())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function Kt(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function Ht(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function qt(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,s=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+s}}function Gt(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function Ut(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function Wt(e){if(!y||!L||!e)return;const t=Date.now();if(t-W<$t||L.getLayers().length>=Pt)return;const o=window.L;if(!o)return;const r=Gt(),i=qt(e,It,Tt),s=Kt(o,r),a=o.marker([i.lat,i.lng],{icon:s});a.on("click",()=>{if(!w){alert("GPS not ready yet. Wait until your player marker appears.");return}const p={lat:w[0],lng:w[1]},h={lat:i.lat,lng:i.lng},b=Rt(p,h);if(b>be){alert(`Too far to open this gift.

Distance: ${Math.round(b)}m
Needed: ≤ ${be}m`);return}L.removeLayer(a);const m=Ut(r),f=`You found a gift!

Reward: ${m.text}`;alert(f);const x={kind:r,...m};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:x}))}catch{}}),a.addTo(L),W=t}function Yt(){return`
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
        <span>${Ht()}</span>
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
  `}function Xt(){try{y&&(y.remove(),y=null,I=null,Z=null,zt=null,L=null,w=null,F=!1,W=0)}catch{}}function Vt(){const e=window.L,t=z("cbsgoMap");if(!e||!t)return!1;Xt();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return y=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(y),y.setView([51.687,4.87],16),Z=e.layerGroup().addTo(y),L=e.layerGroup().addTo(y),!0}function Jt(e){const t=window.L;if(!t||!y)return;const n=Ft(t);if(!I){I=t.marker(e,{icon:n}).addTo(y),y.setView(e,18);return}I.setIcon(n),I.setLatLng(e)}function Zt(e){jt(At,e)}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(Zt({date:Dt(),shown:!0}),y&&window.L&&Z&&(t.lat,t.lng,void 0))}));function Qt(){!navigator.geolocation||!y||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};w=[t,n],Jt([t,n]),Wt(r),N(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{N(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function en(){let e=0;const t=120,n=()=>{if(e++,!z("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(N("Loading map engine…"),e<t)return setTimeout(n,100);N("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Vt()){N("Could not init map. Refresh.");return}const r=z("cbsgoCenterBtn");r&&(r.onclick=()=>{y&&w&&y.setView(w,18)});const i=z("cbsgoCompassBtn");i&&(i.onclick=()=>{y&&(F=!F,F?y.setView([51.687,4.87],3):w&&y.setView(w,16))}),N("Loading GPS…"),Qt()};n()}function Be(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function tn(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function Q(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function Y(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function me(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${Be(e)}</div>
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
  `}function nn(){const e=Te(),t=$e();return`
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
        ${tn(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${Be(e)}" maxlength="24" style="
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
  `}function on(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=s=>{const a=document.querySelector("#profileMsg");a&&(a.textContent=s||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const s=Ct(e.value);r(`✅ Name saved: ${s}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const s=t.files&&t.files[0];if(!s)return;if(s.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{Lt(String(a.result||"")),r("✅ Photo saved"),B()},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(s)}),n&&(n.onclick=()=>{Nt(),r("✅ Photo removed"),B()})}function rn(){const e=tt(),t=nt();return`
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
          🪙 CBS (play money): <b>${t}</b>
        </div>
      </div>
    </section>
  `}function Oe(){const e=Q();return e==="profile"?me("Profile",`<div id="profileMount">${nn()}</div>`):e==="bag"?me("Bag",`<div id="bagMount">${rn()}</div>`):""}function sn(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Yt()}
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
          ${ze()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Ae()}
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
        ${Oe()}
      </div>

      ${Pe()?`<button id="resetBtn" type="button" style="
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
  `}function B(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=Oe(),Q()==="profile"&&on();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{Y("map"),B()})}function an(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=Q();Y(n===t?"map":t||"map"),B()})})}function Re(){const e=document.querySelector("#app");if(e){if(e.innerHTML=sn(),an(),en(),kt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Ae())};window.addEventListener("cbsgo:stepsChanged",t)}if(B(),Pe()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Et)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){de({id:"__daily__",name:"Daily Glow"});return}if(_e(n))return;const o=Ye.find(r=>r.id===n);o&&de(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&We(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Je);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),Re()})}))}}function De(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function K(e){const t=De();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";K(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{K(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function ye(){try{if(!document.getElementById("app")){K("❌ #app not found in index.html");return}Re();const t=De();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){K(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ye,{once:!0}):ye();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
