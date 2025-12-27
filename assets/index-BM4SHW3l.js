(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const gt="modulepreload",bt=function(e){return"/cbs-go/"+e},Ce={},mt=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(m){return Promise.all(m.map(b=>Promise.resolve(b).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var u=g;document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),a=p?.nonce||p?.getAttribute("nonce");r=g(n.map(m=>{if(m=bt(m),m in Ce)return;Ce[m]=!0;const b=m.endsWith(".css"),h=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${h}`))return;const y=document.createElement("link");if(y.rel=b?"stylesheet":gt,b||(y.as="script"),y.crossOrigin="",y.href=m,a&&y.setAttribute("nonce",a),document.head.appendChild(y),b)return new Promise((x,k)=>{y.addEventListener("load",x),y.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${m}`)))})}))}function i(p){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=p,window.dispatchEvent(a),!a.defaultPrevented)throw p}return r.then(p=>{for(const a of p||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},Oe=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],De="cbsgo_state_v6";function yt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function ht(){return{xp:0,completed:{},updatedAt:Date.now()}}function F(){const e=localStorage.getItem(De);return yt(e,ht())}function Re(e){e.updatedAt=Date.now(),localStorage.setItem(De,JSON.stringify(e))}function je(e){return 100+(Math.max(1,Number(e||1))-1)*40}function Q(){return Number(F().xp||0)}function se(){const e=Q();let t=1,n=e;for(;;){const o=je(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function Fe(){const e=Q();let t=1,n=e;for(;;){const o=je(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function H(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return F();const n=F();return n.xp=Number(n.xp||0)+t,Re(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:se()}})),n}function ae(e){const t=String(e||"");if(!t)return!1;const n=F();return!!(n.completed&&n.completed[t])}function Ke(e){const t=String(e||"");if(!t)return;const n=F();n.completed||(n.completed={}),n.completed[t]=Date.now(),Re(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const xt=Object.freeze(Object.defineProperty({__proto__:null,addXp:H,completeNode:Ke,getLevel:se,getXp:Q,getXpIntoLevel:Fe,isNodeCompleted:ae},Symbol.toStringTag,{value:"Module"})),qe="cbsgoPuzzleModal";function vt(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ne(){const e=document.getElementById(qe);e&&e.remove()}function J(e){Ne();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=80,i=15,u=o.length,p=.06;let a=[],g=null,m=0,b=i,h=!1,y=!1,x=null;const k=e?.name||"CBS GO Puzzle",v=document.createElement("div");v.id=qe,v.style.position="fixed",v.style.inset="0",v.style.zIndex="999999",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.padding="16px",v.style.background="rgba(0,0,0,.70)",v.style.backdropFilter="blur(12px)",v.style.fontFamily="system-ui, sans-serif",v.style.color="#fff",v.innerHTML=`
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
          ${vt(k)}
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
        You can <b>tap</b> or <b>swipe</b>.  
        The 💥 tile clears a whole row and column.
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
  `,document.body.appendChild(v);const I=document.getElementById("cbsgoBoard"),G=document.getElementById("cbsgoScore"),fe=document.getElementById("cbsgoMoves"),ge=document.getElementById("cbsgoStatus"),be=document.getElementById("cbsgoPuzzleClose"),me=document.getElementById("cbsgoPuzzleOk");function A(c){ge&&(ge.textContent=c||"")}function ye(){return Math.floor(Math.random()*o.length)}function ut(){a=[];for(let c=0;c<t;c++){const s=[];for(let l=0;l<n;l++)Math.random()<p?s.push(u):s.push(ye());a.push(s)}}function U(c){return c===u}function E(){if(I){I.innerHTML="";for(let c=0;c<t;c++)for(let s=0;s<n;s++){const l=a[c][s],f=document.createElement("div");f.dataset.row=String(c),f.dataset.col=String(s),f.style.borderRadius="12px",f.style.display="flex",f.style.alignItems="center",f.style.justifyContent="center",f.style.cursor=y?"default":"pointer",f.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",U(l)?(f.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",f.textContent="💥",f.style.fontSize="20px"):f.style.background=o[l]||"#444",g&&g.row===c&&g.col===s&&(f.style.outline="2px solid #fff",f.style.outlineOffset="2px"),f.addEventListener("click",()=>{Me(c,s)}),f.addEventListener("touchstart",d=>{if(y)return;const _=d.touches[0];x={row:c,col:s,x:_.clientX,y:_.clientY}}),f.addEventListener("touchend",d=>{if(!x||y)return;const _=d.changedTouches[0],M=_.clientX-x.x,S=_.clientY-x.y;if(Math.sqrt(M*M+S*S)<18){Me(c,s),x=null;return}let N=x.row,R=x.col;Math.abs(M)>Math.abs(S)?M>0?R+=1:R-=1:S>0?N+=1:N-=1,N>=0&&N<t&&R>=0&&R<n&&ke(x.row,x.col,N,R),x=null,d.preventDefault()}),I.appendChild(f)}}}function he(c,s){if(!c||!s)return!1;const l=Math.abs(c.row-s.row),f=Math.abs(c.col-s.col);return l+f===1}function xe(c,s){const l=a[c.row][c.col];a[c.row][c.col]=a[s.row][s.col],a[s.row][s.col]=l}function ve(){const c=new Set;for(let s=0;s<t;s++){let l=a[s][0],f=0;for(let d=1;d<=n;d++){const _=d<n?a[s][d]:null;if(_===l)continue;const M=d-f;if(l!=null&&M>=3)for(let S=f;S<d;S++)c.add(`${s},${S}`);l=_,f=d}}for(let s=0;s<n;s++){let l=a[0][s],f=0;for(let d=1;d<=t;d++){const _=d<t?a[d][s]:null;if(_===l)continue;const M=d-f;if(l!=null&&M>=3)for(let S=f;S<d;S++)c.add(`${S},${s}`);l=_,f=d}}return c}function we(c){if(!c||!c.size)return 0;const s=c.size;m+=s*5,G&&(G.textContent=String(m));for(const l of c){const[f,d]=l.split(","),_=Number(f),M=Number(d);a[_][M]=null}for(let l=0;l<n;l++){let f=t-1;for(let d=t-1;d>=0;d--)a[d][l]!=null&&(a[f][l]=a[d][l],f--);for(let d=f;d>=0;d--)Math.random()<p?a[d][l]=u:a[d][l]=ye()}return s}function pt(c,s){const l=new Set;for(let d=0;d<n;d++)l.add(`${c},${d}`);for(let d=0;d<t;d++)l.add(`${d},${s}`);const f=we(l);E(),f>0&&setTimeout(()=>_e(!1),120)}function _e(c=!1){h=!0;const s=()=>{const l=ve();if(!l.size){h=!1,E(),c&&!y&&(b<=0?D():A("Nice! Keep matching."));return}we(l),E(),setTimeout(s,120)};s()}function Se(c){if(!y)if(y=!0,h=!0,c){A("Great job! Puzzle completed 🎉");try{e?.id&&Ke(e.id),H(10)}catch{}}else A("Out of moves. Try again next time 🙂")}function D(){m>=r?Se(!0):b<=0&&Se(!1)}function ke(c,s,l,f){if(h||y)return;if(b<=0){D();return}const d={row:c,col:s},_={row:l,col:f};if(!he(d,_))return;const M=a[c][s],S=a[l][f],Le=U(M)||U(S);if(xe(d,_),g=null,b--,fe&&(fe.textContent=String(b)),Le){E();const N=U(a[c][s])?{row:c,col:s}:{row:l,col:f};pt(N.row,N.col),D();return}if(!ve().size){xe(d,_),E(),A("No match… try another swap."),D();return}A(""),E(),_e(!0)}function Me(c,s){if(h||y)return;if(b<=0){D();return}const l={row:c,col:s};if(!g){g=l,E();return}if(g.row===c&&g.col===s){g=null,E();return}if(!he(g,l)){g=l,E();return}ke(g.row,g.col,l.row,l.col)}function Ee(){Ne()}be&&(be.onclick=Ee),me&&(me.onclick=()=>{Ee()}),ut(),E(),A("Tap or swipe two neighboring tiles to swap them.")}const He="cbsgo_inventory_v1";function wt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function _t(){return{tickets:0,cbs:0}}function O(){const e=localStorage.getItem(He),t=wt(e,_t());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Ge(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(He,JSON.stringify(t))}function St(){return Number(O().tickets||0)}function kt(){return Number(O().cbs||0)}function ee(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.tickets=Number(n.tickets||0)+t,Ge(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function Mt(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.cbs=Number(n.cbs||0)+t,Ge(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Ue="cbsgo_steps_v6",Et="cbsgo_gps_autostart_v2",Ye="cbsgo_daily_puzzle_v1",Lt=.75,Ct=200,Nt=.3,zt=400,It=20,te=1500,ne=200,At=.25,Pt=.05,Tt=.3;let Y=null,W=!1,P={msg:"init"};function $t(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Bt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function K(){const e=localStorage.getItem(Ue);return $t(e,Bt())}function We(e){e.updatedAt=Date.now(),localStorage.setItem(Ue,JSON.stringify(e))}function X(){return Number(K().steps||0)}function ze(){return!!W}function ce(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Ot(){try{return localStorage.getItem(Ye)===ce()}catch{return!1}}function Dt(){try{localStorage.setItem(Ye,ce())}catch{}}function Rt(e,t){return Ot()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:ce()}})),Dt(),!0)}function Ie(){const e=K(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function jt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<te)return;const i=Math.floor(r/te);i<=0||(ee(i),e.boostLastStep=n+i*te)}function Ft(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<ne){e.chestMeters=t;return}let n=0;for(;t>=ne&&n<5;)if(t-=ne,n+=1,Math.random()<At){const o=Math.random()<Pt,r=o?10:3,i=o?2:1;H(r),ee(i);const u=o&&Math.random()<Tt;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:u}}));break}e.chestMeters=t}function Kt(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),u=o(e.lat),p=o(t.lat),a=Math.sin(r/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function qt(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const p=n-o;p>0&&(H(p),e.xpKmAwarded=n)}const i=Math.floor(t/2500),u=Number(e.ticketChunksAwarded||0);if(i>u){const p=i-u;p>0&&(ee(p),e.ticketChunksAwarded=i)}}function Ht(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return K();const n=K();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Lt);return o>n.steps&&(n.steps=o),qt(n),jt(n),Ft(n),We(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Gt(){Y!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Y),Y=null}async function Ae(e={}){const t=!!e.silent;if(!navigator.geolocation)return P={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Et,"1")}catch{}Gt(),W=!0,P={msg:"requesting",t:Date.now()};try{return Y=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,u=Date.now(),p=K(),a=p.lastPos;p.lastPos={lat:o,lng:r,t:u},We(p);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,m=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:m,t:u}})),i>Ct){P={lat:o,lng:r,acc:i,t:u,reason:"accuracy",boostMs:Ie()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}));return}Rt(o,r);let b=0,h=0,y=0,x=0,k="no-last";a&&typeof a.lat=="number"&&typeof a.lng=="number"&&typeof a.t=="number"&&(b=Kt({lat:a.lat,lng:a.lng},{lat:o,lng:r}),h=Math.max(1,(u-a.t)/1e3),y=b/h,b<Nt?k="jitter":b>zt?k="teleport":y>It?k="too-fast":(Ht(b),x=b,k="ok")),P={lat:o,lng:r,acc:i,t:u,dist:Math.round(b),dt:Math.round(h),speed:Number(y.toFixed(2)),added:Math.round(x),reason:k,boostMs:Ie()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},n=>{W=!1,P={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:X()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return W=!1,P={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Ut(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>ze()||await Ae({silent:!0}))();const t=async()=>{ze()||await Ae({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&H(n),o>0&&ee(o),r>0&&Mt(r)}));function Pe(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Yt(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function Xe(){const e=Number(Q()||0),t=Number(se()||1),n=Number(Fe()||0),o=Number(X()||0),r=Pe(n,0,100),i=Pe(r/100*100,0,100),u=Yt(o);return`
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
          <span>${u} steps</span>
        </div>
      </div>
    </div>
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=Xe())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function Ve(){return""}function Je(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Wt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const Ze="cbsgo_player_name_v2",le="cbsgo_player_avatar_v2";function Qe(){try{return localStorage.getItem(Ze)||"Sovereign"}catch{return"Sovereign"}}function Xt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Ze,t)}catch{}return t}function et(){try{return localStorage.getItem(le)||""}catch{return""}}function Vt(e){const t=String(e||"");try{localStorage.setItem(le,t)}catch{}return t}function Jt(){try{localStorage.removeItem(le)}catch{}}let w=null,j=null,L=null,z=null,T=null,C=null,V=!1;const oe="cbsgo_nodes_pos_v3",tt="cbsgo_daily_marker_v1",Zt=4,Qt=6,en=80,tn=220,nn=6e4,Te=65;let re=0;function B(e){return document.getElementById(e)}function $(e){const t=B("cbsgoMapHost");if(!t)return;let n=B("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function on(){const e=String(Qe()||"").trim();return e?e[0].toUpperCase():"🙂"}function rn(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function de(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),u=o(e.lat),p=o(t.lat),a=Math.sin(r/2)**2+Math.cos(u)*Math.cos(p)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function nt(){return new Date().toISOString().slice(0,10)}function ue(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ot(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function rt(){return Oe.filter(e=>e.type!=="group"&&!ae(e.id))}function sn(e){const t=et();if(t){const r=`
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
    ">${rn(on())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function an(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"};
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function cn(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function ln(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function dn(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function un(e){const t=ue(oe,null);if(t&&t.seed&&t.posById)return t;const n=rt(),o={},r=[],i=90,u=180,p=520,a=5e3;function g(h,y,x){const k=y*Math.cos(x)/111111,v=y*Math.sin(x)/(111111*Math.cos(h*Math.PI/180));return{dLat:k,dLng:v}}let m=0;for(const h of n){let y=!1;for(;!y&&m<a;){m++;const x=u+Math.random()*(p-u),k=Math.random()*Math.PI*2,v=g(e.lat,x,k),I={lat:e.lat+v.dLat,lng:e.lng+v.dLng};y=r.every(G=>de(G,I)>=i),y&&(r.push(I),o[h.id]={dLat:v.dLat,dLng:v.dLng})}if(!o[h.id]){const x=g(e.lat,u,Math.random()*Math.PI*2);o[h.id]={dLat:x.dLat,dLng:x.dLng}}}const b={seed:e,posById:o,createdAt:Date.now()};return ot(oe,b),b}function pn(e,t){const n=ue(oe,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function fn(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,u=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+u}}function gn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function bn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function mn(e){if(!w||!T||!e)return;const t=Date.now();if(t-re<nn||T.getLayers().length>=Qt)return;const o=window.L;if(!o)return;const r=gn(),i=fn(e,en,tn),u=ln(o,r),p=o.marker([i.lat,i.lng],{icon:u});p.on("click",()=>{if(!C){alert("GPS not ready yet. Wait until your player marker appears.");return}const a={lat:C[0],lng:C[1]},g={lat:i.lat,lng:i.lng},m=de(a,g);if(m>Te){alert(`Too far to open this gift.

Distance: ${Math.round(m)}m
Needed: ≤ ${Te}m`);return}T.removeLayer(p);const b=bn(r),h=`You found a gift!

Reward: ${b.text}`;alert(h);const y={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:y}))}catch{}}),p.addTo(T),re=t}function yn(){return`
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
        <span>${dn()}</span>
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
  `}function hn(){try{w&&(w.remove(),w=null,j=null,L=null,z=null,T=null,C=null,V=!1,re=0)}catch{}}function xn(){const e=window.L,t=B("cbsgoMap");if(!e||!t)return!1;hn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return w=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(w),w.setView([51.687,4.87],16),L=e.layerGroup().addTo(w),T=e.layerGroup().addTo(w),!0}function vn(e){const t=window.L;if(!t||!w)return;const n=sn(t);if(!j){j=t.marker(e,{icon:n}).addTo(w),w.setView(e,18);return}j.setIcon(n),j.setLatLng(e)}function wn(e){const t=window.L;if(!t||!w||!L)return;const n=z;L.clearLayers(),n&&(z=n,z.addTo(L));const o=un(e),r=rt(),i=65,u=1600,p=[];for(const g of r){const m=pn(g,o.seed);if(!m)continue;const b=Math.round(de(e,m));b>u||p.push({node:g,ll:m,dist:b})}p.sort((g,m)=>g.dist-m.dist),p.slice(0,Zt).forEach(({node:g,ll:m,dist:b})=>{const h=t.marker([m.lat,m.lng],{icon:an(t,b<=i)});h.on("click",()=>{if(b>i){alert(`Too far.

Go closer to open:
${g.name}
Distance: ${b}m
Required: ≤ ${i}m`);return}J(g)}),h.addTo(L)})}function _n(){return ue(tt,{date:"",shown:!1})}function it(e){ot(tt,e)}function st(e){const t=window.L;if(!t||!w||!L)return;const n=_n(),o=nt();n.date===o&&n.shown===!1||(n.date!==o&&it({date:o,shown:!0}),!z&&(z=t.marker([e.lat,e.lng],{icon:cn(t)}).addTo(L),z.on("click",()=>{J({id:"__daily__",name:"Daily puzzle"})})))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(it({date:nt(),shown:!0}),w&&window.L&&L&&st({lat:t.lat,lng:t.lng}))}));function Sn(){!navigator.geolocation||!w||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};C=[t,n],vn([t,n]),st(r),wn(r),mn(r),$(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{$(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function kn(){let e=0;const t=120,n=()=>{if(e++,!B("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if($("Loading map engine…"),e<t)return setTimeout(n,100);$("Map engine failed to load (Leaflet not found). Refresh.");return}if(!xn()){$("Could not init map. Refresh.");return}const r=B("cbsgoCenterBtn");r&&(r.onclick=()=>{w&&C&&w.setView(C,18)});const i=B("cbsgoCompassBtn");i&&(i.onclick=()=>{w&&(V=!V,V?w.setView([51.687,4.87],3):C&&w.setView(C,16))}),$("Loading GPS…"),Sn()};n()}function at(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Mn(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function pe(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function ie(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function $e(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${at(e)}</div>
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
  `}function En(){const e=Qe(),t=et();return`
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
        ${Mn(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${at(e)}" maxlength="24" style="
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
  `}function Ln(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=u=>{const p=document.querySelector("#profileMsg");p&&(p.textContent=u||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const u=Xt(e.value);r(`✅ Name saved: ${u}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const u=t.files&&t.files[0];if(!u)return;if(u.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const p=new FileReader;p.onload=()=>{Vt(String(p.result||"")),r("✅ Photo saved"),q()},p.onerror=()=>r("⛔ Failed to read image."),p.readAsDataURL(u)}),n&&(n.onclick=()=>{Jt(),r("✅ Photo removed"),q()})}function Cn(){const e=St(),t=kt();return`
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
  `}function ct(){const e=pe();return e==="profile"?$e("Profile",`<div id="profileMount">${En()}</div>`):e==="bag"?$e("Bag",`<div id="bagMount">${Cn()}</div>`):""}function Nn(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${yn()}
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
          ${Xe()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Ve()}
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
        ${ct()}
      </div>

      ${Je()?`<button id="resetBtn" type="button" style="
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
  `}function q(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=ct(),pe()==="profile"&&Ln();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{ie("map"),q()})}function zn(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=pe();ie(n===t?"map":t||"map"),q()})})}function lt(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Nn(),zn(),kn(),Ut(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Ve())};window.addEventListener("cbsgo:stepsChanged",t)}if(q(),Je()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Wt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){J({id:"__daily__",name:"Daily Glow"});return}if(ae(n))return;const o=Oe.find(r=>r.id===n);o&&J(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&mt(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>xt);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),lt()})}))}}function dt(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function Z(e){const t=dt();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";Z(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{Z(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Be(){try{if(!document.getElementById("app")){Z("❌ #app not found in index.html");return}lt();const t=dt();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){Z(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Be,{once:!0}):Be();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
