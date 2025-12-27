(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const mt="modulepreload",yt=function(e){return"/cbs-go/"+e},ze={},ht=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let g=function(m){return Promise.all(m.map(b=>Promise.resolve(b).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var p=g;document.getElementsByTagName("link");const f=document.querySelector("meta[property=csp-nonce]"),d=f?.nonce||f?.getAttribute("nonce");r=g(n.map(m=>{if(m=yt(m),m in ze)return;ze[m]=!0;const b=m.endsWith(".css"),h=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${h}`))return;const y=document.createElement("link");if(y.rel=b?"stylesheet":mt,b||(y.as="script"),y.crossOrigin="",y.href=m,d&&y.setAttribute("nonce",d),document.head.appendChild(y),b)return new Promise((x,M)=>{y.addEventListener("load",x),y.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${m}`)))})}))}function i(f){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=f,window.dispatchEvent(d),!d.defaultPrevented)throw f}return r.then(f=>{for(const d of f||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})},De=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Re="cbsgo_state_v6";function xt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function vt(){return{xp:0,completed:{},updatedAt:Date.now()}}function F(){const e=localStorage.getItem(Re);return xt(e,vt())}function je(e){e.updatedAt=Date.now(),localStorage.setItem(Re,JSON.stringify(e))}function Fe(e){return 100+(Math.max(1,Number(e||1))-1)*40}function te(){return Number(F().xp||0)}function le(){const e=te();let t=1,n=e;for(;;){const o=Fe(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function Ke(){const e=te();let t=1,n=e;for(;;){const o=Fe(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function q(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return F();const n=F();return n.xp=Number(n.xp||0)+t,je(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:le()}})),n}function de(e){const t=String(e||"");if(!t)return!1;const n=F();return!!(n.completed&&n.completed[t])}function He(e){const t=String(e||"");if(!t)return;const n=F();n.completed||(n.completed={}),n.completed[t]=Date.now(),je(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const wt=Object.freeze(Object.defineProperty({__proto__:null,addXp:q,completeNode:He,getLevel:le,getXp:te,getXpIntoLevel:Ke,isNodeCompleted:de},Symbol.toStringTag,{value:"Module"})),qe="cbsgoPuzzleModal";function _t(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oe(){const e=document.getElementById(qe);e&&e.remove()}function Q(e){oe();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=80,i=15,p=o.length,f=.06;let d=[],g=null,m=0,b=i,h=!1,y=!1,x=null;const M=e?.name||"CBS GO Puzzle",v=document.createElement("div");v.id=qe,v.style.position="fixed",v.style.inset="0",v.style.zIndex="999999",v.style.display="flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.padding="16px",v.style.background="rgba(0,0,0,.70)",v.style.backdropFilter="blur(12px)",v.style.fontFamily="system-ui, sans-serif",v.style.color="#fff",v.innerHTML=`
    <style>
      @keyframes cbsgoConfettiFall {
        0% {
          transform: translate3d(0, -100%, 0) rotateZ(0deg);
          opacity: 1;
        }
        100% {
          transform: translate3d(10px, 120%, 0) rotateZ(360deg);
          opacity: 0;
        }
      }
    </style>
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
      position:relative;
    ">
      <div id="cbsgoConfettiLayer" style="
        position:absolute;
        inset:0;
        pointer-events:none;
        overflow:hidden;
        display:none;
        z-index:10;
      "></div>

      <div style="
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.12);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        position:relative;
        z-index:11;
      ">
        <div style="font-weight:900; font-size:15px;">
          ${_t(M)}
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

      <div style="padding:10px 14px 4px; font-size:12px; opacity:.9; position:relative; z-index:11;">
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
        position:relative;
        z-index:11;
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
        position:relative;
        z-index:11;
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
        position:relative;
        z-index:11;
      "></div>

      <div style="padding:0 14px 12px; display:flex; gap:8px; flex-wrap:wrap; position:relative; z-index:11;">
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
  `,document.body.appendChild(v);const I=document.getElementById("cbsgoBoard"),G=document.getElementById("cbsgoScore"),me=document.getElementById("cbsgoMoves"),ye=document.getElementById("cbsgoStatus"),he=document.getElementById("cbsgoPuzzleClose"),xe=document.getElementById("cbsgoPuzzleOk"),U=document.getElementById("cbsgoConfettiLayer");function A(c){ye&&(ye.textContent=c||"")}function pt(){if(!U)return;U.style.display="block",U.innerHTML="";const c=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],a=40;for(let l=0;l<a;l++){const s=document.createElement("div"),u=6+Math.floor(Math.random()*6),_=Math.random()*100,k=Math.random()*.6,S=1+Math.random()*.6,W=Math.random()*360;s.style.position="absolute",s.style.top="-10%",s.style.left=`${_}%`,s.style.width=`${u}px`,s.style.height=`${u*2}px`,s.style.background=c[l%c.length],s.style.opacity="0.9",s.style.borderRadius="2px",s.style.transform=`rotate(${W}deg)`,s.style.animation=`cbsgoConfettiFall ${S}s ease-out ${k}s forwards`,U.appendChild(s)}}function ve(){return Math.floor(Math.random()*o.length)}function ft(){d=[];for(let c=0;c<t;c++){const a=[];for(let l=0;l<n;l++)Math.random()<f?a.push(p):a.push(ve());d.push(a)}}function Y(c){return c===p}function E(){if(I){I.innerHTML="";for(let c=0;c<t;c++)for(let a=0;a<n;a++){const l=d[c][a],s=document.createElement("div");s.dataset.row=String(c),s.dataset.col=String(a),s.style.borderRadius="12px",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.cursor=y?"default":"pointer",s.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",Y(l)?(s.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",s.textContent="💥",s.style.fontSize="20px"):s.style.background=o[l]||"#444",g&&g.row===c&&g.col===a&&(s.style.outline="2px solid #fff",s.style.outlineOffset="2px"),s.addEventListener("click",()=>{Ce(c,a)}),s.addEventListener("touchstart",u=>{if(y)return;const _=u.touches[0];x={row:c,col:a,x:_.clientX,y:_.clientY}}),s.addEventListener("touchend",u=>{if(!x||y)return;const _=u.changedTouches[0],k=_.clientX-x.x,S=_.clientY-x.y;if(Math.sqrt(k*k+S*S)<18){Ce(c,a),x=null;return}let N=x.row,R=x.col;Math.abs(k)>Math.abs(S)?k>0?R+=1:R-=1:S>0?N+=1:N-=1,N>=0&&N<t&&R>=0&&R<n&&Le(x.row,x.col,N,R),x=null,u.preventDefault()}),I.appendChild(s)}}}function we(c,a){if(!c||!a)return!1;const l=Math.abs(c.row-a.row),s=Math.abs(c.col-a.col);return l+s===1}function _e(c,a){const l=d[c.row][c.col];d[c.row][c.col]=d[a.row][a.col],d[a.row][a.col]=l}function Se(){const c=new Set;for(let a=0;a<t;a++){let l=d[a][0],s=0;for(let u=1;u<=n;u++){const _=u<n?d[a][u]:null;if(_===l)continue;const k=u-s;if(l!=null&&k>=3)for(let S=s;S<u;S++)c.add(`${a},${S}`);l=_,s=u}}for(let a=0;a<n;a++){let l=d[0][a],s=0;for(let u=1;u<=t;u++){const _=u<t?d[u][a]:null;if(_===l)continue;const k=u-s;if(l!=null&&k>=3)for(let S=s;S<u;S++)c.add(`${S},${a}`);l=_,s=u}}return c}function ke(c){if(!c||!c.size)return 0;const a=c.size;m+=a*5,G&&(G.textContent=String(m));for(const l of c){const[s,u]=l.split(","),_=Number(s),k=Number(u);d[_][k]=null}for(let l=0;l<n;l++){let s=t-1;for(let u=t-1;u>=0;u--)d[u][l]!=null&&(d[s][l]=d[u][l],s--);for(let u=s;u>=0;u--)Math.random()<f?d[u][l]=p:d[u][l]=ve()}return a}function gt(c,a){const l=new Set;for(let u=0;u<n;u++)l.add(`${c},${u}`);for(let u=0;u<t;u++)l.add(`${u},${a}`);const s=ke(l);E(),s>0&&setTimeout(()=>Me(!1),120)}function Me(c=!1){h=!0;const a=()=>{const l=Se();if(!l.size){h=!1,E(),c&&!y&&(b<=0||m>=r?D():A("Nice! Keep matching."));return}ke(l),E(),setTimeout(a,120)};a()}function Ee(c){if(!y)if(y=!0,h=!0,c){A("Great job! Puzzle completed 🎉");try{e?.id&&He(e.id),q(10)}catch{}pt(),setTimeout(()=>{oe()},1600)}else A("Out of moves. Try again next time 🙂")}function D(){m>=r?Ee(!0):b<=0&&Ee(!1)}function Le(c,a,l,s){if(h||y)return;if(b<=0){D();return}const u={row:c,col:a},_={row:l,col:s};if(!we(u,_))return;const k=d[c][a],S=d[l][s],W=Y(k)||Y(S);if(_e(u,_),g=null,b--,me&&(me.textContent=String(b)),W){E();const N=Y(d[c][a])?{row:c,col:a}:{row:l,col:s};gt(N.row,N.col),D();return}if(!Se().size){_e(u,_),E(),A("No match… try another swap."),D();return}A(""),E(),Me(!0)}function Ce(c,a){if(h||y)return;if(b<=0){D();return}const l={row:c,col:a};if(!g){g=l,E();return}if(g.row===c&&g.col===a){g=null,E();return}if(!we(g,l)){g=l,E();return}Le(g.row,g.col,l.row,l.col)}function Ne(){oe()}he&&(he.onclick=Ne),xe&&(xe.onclick=()=>{Ne()}),ft(),E(),A("Tap or swipe two neighboring tiles to swap them.")}const Ge="cbsgo_inventory_v1";function St(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function kt(){return{tickets:0,cbs:0}}function O(){const e=localStorage.getItem(Ge),t=St(e,kt());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Ue(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Ge,JSON.stringify(t))}function Mt(){return Number(O().tickets||0)}function Et(){return Number(O().cbs||0)}function ne(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.tickets=Number(n.tickets||0)+t,Ue(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function Lt(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.cbs=Number(n.cbs||0)+t,Ue(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Ye="cbsgo_steps_v6",Ct="cbsgo_gps_autostart_v2",We="cbsgo_daily_puzzle_v1",Nt=.75,zt=200,It=.3,At=400,Pt=20,re=1500,ie=200,Tt=.25,$t=.05,Bt=.3;let X=null,V=!1,P={msg:"init"};function Ot(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Dt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function K(){const e=localStorage.getItem(Ye);return Ot(e,Dt())}function Xe(e){e.updatedAt=Date.now(),localStorage.setItem(Ye,JSON.stringify(e))}function J(){return Number(K().steps||0)}function Ie(){return!!V}function ue(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Rt(){try{return localStorage.getItem(We)===ue()}catch{return!1}}function jt(){try{localStorage.setItem(We,ue())}catch{}}function Ft(e,t){return Rt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:ue()}})),jt(),!0)}function Ae(){const e=K(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Kt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<re)return;const i=Math.floor(r/re);i<=0||(ne(i),e.boostLastStep=n+i*re)}function Ht(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<ie){e.chestMeters=t;return}let n=0;for(;t>=ie&&n<5;)if(t-=ie,n+=1,Math.random()<Tt){const o=Math.random()<$t,r=o?10:3,i=o?2:1;q(r),ne(i);const p=o&&Math.random()<Bt;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:p}}));break}e.chestMeters=t}function qt(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),p=o(e.lat),f=o(t.lat),d=Math.sin(r/2)**2+Math.cos(p)*Math.cos(f)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function Gt(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const f=n-o;f>0&&(q(f),e.xpKmAwarded=n)}const i=Math.floor(t/2500),p=Number(e.ticketChunksAwarded||0);if(i>p){const f=i-p;f>0&&(ne(f),e.ticketChunksAwarded=i)}}function Ut(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return K();const n=K();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/Nt);return o>n.steps&&(n.steps=o),Gt(n),Kt(n),Ht(n),Xe(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Yt(){X!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(X),X=null}async function Pe(e={}){const t=!!e.silent;if(!navigator.geolocation)return P={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Ct,"1")}catch{}Yt(),V=!0,P={msg:"requesting",t:Date.now()};try{return X=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,p=Date.now(),f=K(),d=f.lastPos;f.lastPos={lat:o,lng:r,t:p},Xe(f);const g=Number.isFinite(n.coords.heading)?n.coords.heading:null,m=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:g,speed:m,t:p}})),i>zt){P={lat:o,lng:r,acc:i,t:p,reason:"accuracy",boostMs:Ae()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:J()}}));return}Ft(o,r);let b=0,h=0,y=0,x=0,M="no-last";d&&typeof d.lat=="number"&&typeof d.lng=="number"&&typeof d.t=="number"&&(b=qt({lat:d.lat,lng:d.lng},{lat:o,lng:r}),h=Math.max(1,(p-d.t)/1e3),y=b/h,b<It?M="jitter":b>At?M="teleport":y>Pt?M="too-fast":(Ut(b),x=b,M="ok")),P={lat:o,lng:r,acc:i,t:p,dist:Math.round(b),dt:Math.round(h),speed:Number(y.toFixed(2)),added:Math.round(x),reason:M,boostMs:Ae()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:J()}}))},n=>{V=!1,P={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:J()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return V=!1,P={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Wt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>Ie()||await Pe({silent:!0}))();const t=async()=>{Ie()||await Pe({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&q(n),o>0&&ne(o),r>0&&Lt(r)}));function Te(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Xt(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function Ve(){const e=Number(te()||0),t=Number(le()||1),n=Number(Ke()||0),o=Number(J()||0),r=Te(n,0,100),i=Te(r/100*100,0,100),p=Xt(o);return`
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
          <span>${p} steps</span>
        </div>
      </div>
    </div>
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=Ve())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function Je(){return""}function Ze(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Vt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const Qe="cbsgo_player_name_v2",pe="cbsgo_player_avatar_v2";function et(){try{return localStorage.getItem(Qe)||"Sovereign"}catch{return"Sovereign"}}function Jt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Qe,t)}catch{}return t}function tt(){try{return localStorage.getItem(pe)||""}catch{return""}}function Zt(e){const t=String(e||"");try{localStorage.setItem(pe,t)}catch{}return t}function Qt(){try{localStorage.removeItem(pe)}catch{}}let w=null,j=null,L=null,z=null,T=null,C=null,Z=!1;const se="cbsgo_nodes_pos_v3",nt="cbsgo_daily_marker_v1",en=4,tn=6,nn=80,on=220,rn=6e4,$e=65;let ae=0;function B(e){return document.getElementById(e)}function $(e){const t=B("cbsgoMapHost");if(!t)return;let n=B("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function sn(){const e=String(et()||"").trim();return e?e[0].toUpperCase():"🙂"}function an(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fe(e,t){const o=g=>g*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),p=o(e.lat),f=o(t.lat),d=Math.sin(r/2)**2+Math.cos(p)*Math.cos(f)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(d))}function ot(){return new Date().toISOString().slice(0,10)}function ge(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function rt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function it(){return De.filter(e=>e.type!=="group"&&!de(e.id))}function cn(e){const t=tt();if(t){const r=`
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
    ">${an(sn())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function ln(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"};
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function dn(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function un(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function pn(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function fn(e){const t=ge(se,null);if(t&&t.seed&&t.posById)return t;const n=it(),o={},r=[],i=90,p=180,f=520,d=5e3;function g(h,y,x){const M=y*Math.cos(x)/111111,v=y*Math.sin(x)/(111111*Math.cos(h*Math.PI/180));return{dLat:M,dLng:v}}let m=0;for(const h of n){let y=!1;for(;!y&&m<d;){m++;const x=p+Math.random()*(f-p),M=Math.random()*Math.PI*2,v=g(e.lat,x,M),I={lat:e.lat+v.dLat,lng:e.lng+v.dLng};y=r.every(G=>fe(G,I)>=i),y&&(r.push(I),o[h.id]={dLat:v.dLat,dLng:v.dLng})}if(!o[h.id]){const x=g(e.lat,p,Math.random()*Math.PI*2);o[h.id]={dLat:x.dLat,dLng:x.dLng}}}const b={seed:e,posById:o,createdAt:Date.now()};return rt(se,b),b}function gn(e,t){const n=ge(se,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function bn(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,p=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+p}}function mn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function yn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function hn(e){if(!w||!T||!e)return;const t=Date.now();if(t-ae<rn||T.getLayers().length>=tn)return;const o=window.L;if(!o)return;const r=mn(),i=bn(e,nn,on),p=un(o,r),f=o.marker([i.lat,i.lng],{icon:p});f.on("click",()=>{if(!C){alert("GPS not ready yet. Wait until your player marker appears.");return}const d={lat:C[0],lng:C[1]},g={lat:i.lat,lng:i.lng},m=fe(d,g);if(m>$e){alert(`Too far to open this gift.

Distance: ${Math.round(m)}m
Needed: ≤ ${$e}m`);return}T.removeLayer(f);const b=yn(r),h=`You found a gift!

Reward: ${b.text}`;alert(h);const y={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:y}))}catch{}}),f.addTo(T),ae=t}function xn(){return`
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
        <span>${pn()}</span>
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
  `}function vn(){try{w&&(w.remove(),w=null,j=null,L=null,z=null,T=null,C=null,Z=!1,ae=0)}catch{}}function wn(){const e=window.L,t=B("cbsgoMap");if(!e||!t)return!1;vn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return w=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(w),w.setView([51.687,4.87],16),L=e.layerGroup().addTo(w),T=e.layerGroup().addTo(w),!0}function _n(e){const t=window.L;if(!t||!w)return;const n=cn(t);if(!j){j=t.marker(e,{icon:n}).addTo(w),w.setView(e,18);return}j.setIcon(n),j.setLatLng(e)}function Sn(e){const t=window.L;if(!t||!w||!L)return;const n=z;L.clearLayers(),n&&(z=n,z.addTo(L));const o=fn(e),r=it(),i=65,p=1600,f=[];for(const g of r){const m=gn(g,o.seed);if(!m)continue;const b=Math.round(fe(e,m));b>p||f.push({node:g,ll:m,dist:b})}f.sort((g,m)=>g.dist-m.dist),f.slice(0,en).forEach(({node:g,ll:m,dist:b})=>{const h=t.marker([m.lat,m.lng],{icon:ln(t,b<=i)});h.on("click",()=>{if(b>i){alert(`Too far.

Go closer to open:
${g.name}
Distance: ${b}m
Required: ≤ ${i}m`);return}Q(g)}),h.addTo(L)})}function kn(){return ge(nt,{date:"",shown:!1})}function st(e){rt(nt,e)}function at(e){const t=window.L;if(!t||!w||!L)return;const n=kn(),o=ot();n.date===o&&n.shown===!1||(n.date!==o&&st({date:o,shown:!0}),!z&&(z=t.marker([e.lat,e.lng],{icon:dn(t)}).addTo(L),z.on("click",()=>{Q({id:"__daily__",name:"Daily puzzle"})})))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(st({date:ot(),shown:!0}),w&&window.L&&L&&at({lat:t.lat,lng:t.lng}))}));function Mn(){!navigator.geolocation||!w||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};C=[t,n],_n([t,n]),at(r),Sn(r),hn(r),$(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{$(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function En(){let e=0;const t=120,n=()=>{if(e++,!B("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if($("Loading map engine…"),e<t)return setTimeout(n,100);$("Map engine failed to load (Leaflet not found). Refresh.");return}if(!wn()){$("Could not init map. Refresh.");return}const r=B("cbsgoCenterBtn");r&&(r.onclick=()=>{w&&C&&w.setView(C,18)});const i=B("cbsgoCompassBtn");i&&(i.onclick=()=>{w&&(Z=!Z,Z?w.setView([51.687,4.87],3):C&&w.setView(C,16))}),$("Loading GPS…"),Mn()};n()}function ct(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Ln(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function be(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function ce(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Be(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${ct(e)}</div>
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
  `}function Cn(){const e=et(),t=tt();return`
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
        ${Ln(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${ct(e)}" maxlength="24" style="
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
  `}function Nn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=p=>{const f=document.querySelector("#profileMsg");f&&(f.textContent=p||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const p=Jt(e.value);r(`✅ Name saved: ${p}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const p=t.files&&t.files[0];if(!p)return;if(p.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const f=new FileReader;f.onload=()=>{Zt(String(f.result||"")),r("✅ Photo saved"),H()},f.onerror=()=>r("⛔ Failed to read image."),f.readAsDataURL(p)}),n&&(n.onclick=()=>{Qt(),r("✅ Photo removed"),H()})}function zn(){const e=Mt(),t=Et();return`
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
  `}function lt(){const e=be();return e==="profile"?Be("Profile",`<div id="profileMount">${Cn()}</div>`):e==="bag"?Be("Bag",`<div id="bagMount">${zn()}</div>`):""}function In(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${xn()}
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
          ${Ve()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Je()}
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
        ${lt()}
      </div>

      ${Ze()?`<button id="resetBtn" type="button" style="
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
  `}function H(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=lt(),be()==="profile"&&Nn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{ce("map"),H()})}function An(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=be();ce(n===t?"map":t||"map"),H()})})}function dt(){const e=document.querySelector("#app");if(e){if(e.innerHTML=In(),An(),En(),Wt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Je())};window.addEventListener("cbsgo:stepsChanged",t)}if(H(),Ze()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Vt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){Q({id:"__daily__",name:"Daily Glow"});return}if(de(n))return;const o=De.find(r=>r.id===n);o&&Q(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&ht(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>wt);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),dt()})}))}}function ut(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function ee(e){const t=ut();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";ee(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{ee(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Oe(){try{if(!document.getElementById("app")){ee("❌ #app not found in index.html");return}dt();const t=ut();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){ee(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Oe,{once:!0}):Oe();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
