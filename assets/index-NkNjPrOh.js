(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const wt="modulepreload",St=function(e){return"/cbs-go/"+e},Oe={},_t=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let p=function(f){return Promise.all(f.map(b=>Promise.resolve(b).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};var c=p;document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),g=s?.nonce||s?.getAttribute("nonce");r=p(n.map(f=>{if(f=St(f),f in Oe)return;Oe[f]=!0;const b=f.endsWith(".css"),x=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${x}`))return;const h=document.createElement("link");if(h.rel=b?"stylesheet":wt,b||(h.as="script"),h.crossOrigin="",h.href=f,g&&h.setAttribute("nonce",g),document.head.appendChild(h),b)return new Promise((v,w)=>{h.addEventListener("load",v),h.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(s){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=s,window.dispatchEvent(g),!g.defaultPrevented)throw s}return r.then(s=>{for(const g of s||[])g.status==="rejected"&&i(g.reason);return t().catch(i)})},Mt=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Ke="cbsgo_state_v6";function kt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Et(){return{xp:0,completed:{},updatedAt:Date.now()}}function K(){const e=localStorage.getItem(Ke);return kt(e,Et())}function qe(e){e.updatedAt=Date.now(),localStorage.setItem(Ke,JSON.stringify(e))}function ve(e){return 100+(Math.max(1,Number(e||1))-1)*40}function se(){return Number(K().xp||0)}function ae(){const e=se();let t=1,n=e;for(;;){const o=ve(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function Ge(){const e=se();let t=1,n=e;for(;;){const o=ve(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function Xe(){return ve(ae())}function G(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return K();const n=K();return n.xp=Number(n.xp||0)+t,qe(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:ae()}})),n}function Ye(e){const t=String(e||"");if(!t)return!1;const n=K();return!!(n.completed&&n.completed[t])}function Ve(e){const t=String(e||"");if(!t)return;const n=K();n.completed||(n.completed={}),n.completed[t]=Date.now(),qe(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const Ct=Object.freeze(Object.defineProperty({__proto__:null,addXp:G,completeNode:Ve,getLevel:ae,getXp:se,getXpIntoLevel:Ge,getXpNeededThisLevel:Xe,isNodeCompleted:Ye},Symbol.toStringTag,{value:"Module"})),Ze="cbsgoPuzzleModal";function Lt(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fe(){const e=document.getElementById(Ze);e&&e.remove()}function be(e){fe();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],i=180,c=18,s=o.length,g=.01;let p=[],f=null,b=0,x=c,h=!1,v=!1,w=null;const X=e?.name||"CBS GO Puzzle",k=document.createElement("div");k.id=Ze,k.style.position="fixed",k.style.inset="0",k.style.zIndex="999999",k.style.display="flex",k.style.alignItems="center",k.style.justifyContent="center",k.style.padding="16px",k.style.background="rgba(0,0,0,.70)",k.style.backdropFilter="blur(12px)",k.style.fontFamily="system-ui, sans-serif",k.style.color="#fff",k.innerHTML=`
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
        z-index:999;
      "></div>

      <div style="
        padding:12px 14px;
        border-bottom:1px solid rgba(255,255,255,.12);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      ">
        <div style="font-weight:900; font-size:15px;">
          ${Lt(X)}
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
        💥 clears a whole row and column.
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
          <div>Target: <span id="cbsgoTargetScore">${i}</span></div>
        </div>
        <div style="text-align:right;">
          <div>Moves left: <span id="cbsgoMoves">${c}</span></div>
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
  `,document.body.appendChild(k);const ue=document.getElementById("cbsgoBoard"),Me=document.getElementById("cbsgoScore"),ke=document.getElementById("cbsgoMoves"),Ee=document.getElementById("cbsgoStatus"),Ce=document.getElementById("cbsgoPuzzleClose"),Le=document.getElementById("cbsgoPuzzleOk"),Y=document.getElementById("cbsgoConfettiLayer");function z(d){Ee&&(Ee.textContent=d||"")}function ht(){if(!Y)return;Y.style.display="block",Y.innerHTML="";const d=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],l=40;for(let u=0;u<l;u++){const a=document.createElement("div"),m=6+Math.floor(Math.random()*6),S=Math.random()*100,E=Math.random()*.6,_=1+Math.random()*.6,Z=Math.random()*360;a.style.position="absolute",a.style.top="-10%",a.style.left=`${S}%`,a.style.width=`${m}px`,a.style.height=`${m*2}px`,a.style.background=d[u%d.length],a.style.opacity="0.9",a.style.borderRadius="2px",a.style.transform=`rotate(${Z}deg)`,a.style.animation=`cbsgoConfettiFall ${_}s ease-out ${E}s forwards`,Y.appendChild(a)}}function ze(){return Math.floor(Math.random()*o.length)}function yt(){p=[];for(let d=0;d<t;d++){const l=[];for(let u=0;u<n;u++)Math.random()<g?l.push(s):l.push(ze());p.push(l)}}function V(d){return d===s}function C(){if(ue){ue.innerHTML="";for(let d=0;d<t;d++)for(let l=0;l<n;l++){const u=p[d][l],a=document.createElement("div");a.dataset.row=String(d),a.dataset.col=String(l),a.style.borderRadius="12px",a.style.display="flex",a.style.alignItems="center",a.style.justifyContent="center",a.style.cursor=v?"default":"pointer",a.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",a.style.fontSize="20px",V(u)?(a.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",a.textContent="💥"):(a.style.background=o[u]||"#444",a.textContent=r[u]||"⬛"),f&&f.row===d&&f.col===l&&(a.style.outline="2px solid #fff",a.style.outlineOffset="2px"),a.addEventListener("click",()=>{Be(d,l)}),a.addEventListener("touchstart",m=>{if(v)return;const S=m.touches[0];w={row:d,col:l,x:S.clientX,y:S.clientY}}),a.addEventListener("touchend",m=>{if(!w||v)return;const S=m.changedTouches[0],E=S.clientX-w.x,_=S.clientY-w.y;if(Math.sqrt(E*E+_*_)<18){Be(d,l),w=null;return}let L=w.row,D=w.col;Math.abs(E)>Math.abs(_)?E>0?D+=1:D-=1:_>0?L+=1:L-=1,L>=0&&L<t&&D>=0&&D<n&&$e(w.row,w.col,L,D),w=null,m.preventDefault()}),ue.appendChild(a)}}}function Ne(d,l){if(!d||!l)return!1;const u=Math.abs(d.row-l.row),a=Math.abs(d.col-l.col);return u+a===1}function Pe(d,l){const u=p[d.row][d.col];p[d.row][d.col]=p[l.row][l.col],p[l.row][l.col]=u}function Ae(){const d=new Set;for(let l=0;l<t;l++){let u=p[l][0],a=0;for(let m=1;m<=n;m++){const S=m<n?p[l][m]:null;if(S===u)continue;const E=m-a;if(u!=null&&E>=3)for(let _=a;_<m;_++)d.add(`${l},${_}`);u=S,a=m}}for(let l=0;l<n;l++){let u=p[0][l],a=0;for(let m=1;m<=t;m++){const S=m<t?p[m][l]:null;if(S===u)continue;const E=m-a;if(u!=null&&E>=3)for(let _=a;_<m;_++)d.add(`${_},${l}`);u=S,a=m}}return d}function Ie(d){if(!d||!d.size)return 0;const l=d.size;b+=l*4,Me&&(Me.textContent=String(b)),!v&&b>=i&&pe(!0);for(const u of d){const[a,m]=u.split(","),S=Number(a),E=Number(m);p[S][E]=null}for(let u=0;u<n;u++){let a=t-1;for(let m=t-1;m>=0;m--)p[m][u]!=null&&(p[a][u]=p[m][u],a--);for(let m=a;m>=0;m--)Math.random()<g?p[m][u]=s:p[m][u]=ze()}return l}function xt(d,l){const u=new Set;for(let a=0;a<n;a++)u.add(`${d},${a}`);for(let a=0;a<t;a++)u.add(`${a},${l}`);Ie(u),C(),v||setTimeout(()=>Te(!1),120)}function Te(d=!1){if(v)return;h=!0;const l=()=>{if(v){h=!0;return}const u=Ae();if(!u.size){h=!1,C(),d&&!v&&(x<=0?O():z("Nice! Keep matching."));return}Ie(u),C(),setTimeout(l,120)};l()}function pe(d){if(!v)if(v=!0,h=!0,d){z("Great job! Puzzle completed 🎉");try{e?.id&&Ve(e.id),G(10)}catch{}ht(),setTimeout(()=>{fe()},1600)}else z("Out of moves. Try again next time 🙂")}function O(){b>=i?pe(!0):x<=0&&pe(!1)}function $e(d,l,u,a){if(h||v)return;if(x<=0){O();return}const m={row:d,col:l},S={row:u,col:a};if(!Ne(m,S))return;const E=p[d][l],_=p[u][a],Z=V(E)||V(_);if(Pe(m,S),f=null,x--,ke&&(ke.textContent=String(x)),Z){C();const L=V(p[d][l])?{row:d,col:l}:{row:u,col:a};xt(L.row,L.col),O();return}if(!Ae().size){Pe(m,S),C(),z("No match… try another swap."),O();return}z(""),C(),Te(!0)}function Be(d,l){if(h||v)return;if(x<=0){O();return}const u={row:d,col:l};if(!f){f=u,C();return}if(f.row===d&&f.col===l){f=null,C();return}if(!Ne(f,u)){f=u,C();return}$e(f.row,f.col,u.row,u.col)}function Re(){fe()}Ce&&(Ce.onclick=Re),Le&&(Le.onclick=()=>{Re()}),yt(),C(),z("Tap or swipe two neighboring tiles to swap them.")}const Je="cbsgo_inventory_v1";function zt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Nt(){return{tickets:0,cbs:0}}function $(){const e=localStorage.getItem(Je),t=zt(e,Nt());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Qe(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Je,JSON.stringify(t))}function Pt(){return Number($().tickets||0)}function At(){return Number($().cbs||0)}function ce(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return $();const n=$();return n.tickets=Number(n.tickets||0)+t,Qe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function It(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return $();const n=$();return n.cbs=Number(n.cbs||0)+t,Qe(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const et="cbsgo_steps_v6",Tt="cbsgo_gps_autostart_v2",tt="cbsgo_daily_puzzle_v1",$t=.75,Bt=1e3,Rt=.5,Ot=2e3,Dt=50,ge=1500,me=200,Ft=.25,Wt=.05,jt=.3;let J=null,Q=!1,N={msg:"init"};function Ht(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Ut(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function B(){const e=localStorage.getItem(et);return Ht(e,Ut())}function nt(e){e.updatedAt=Date.now(),localStorage.setItem(et,JSON.stringify(e))}function ee(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:ot()}}))}function we(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function le(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function ot(){return Number(B().steps||0)}function Kt(){const e=B();return Number(e.meters||0)}function qt(){return Kt()/1e3}function De(){return!!Q}function Se(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function Gt(){try{return localStorage.getItem(tt)===Se()}catch{return!1}}function Xt(){try{localStorage.setItem(tt,Se())}catch{}}function Yt(e,t){return Gt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:Se()}})),Xt(),!0)}function Fe(){const e=B(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Vt(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<ge)return;const i=Math.floor(r/ge);i<=0||(ce(i),le(),e.boostLastStep=n+i*ge)}function Zt(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<me){e.chestMeters=t;return}let n=0;for(;t>=me&&n<5;)if(t-=me,n+=1,Math.random()<Ft){const o=Math.random()<Wt,r=o?10:3,i=o?2:1;G(r),we(),ce(i),le();const c=o&&Math.random()<jt;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:c}}));break}e.chestMeters=t}function Jt(e,t){const o=p=>p*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),c=o(e.lat),s=o(t.lat),g=Math.sin(r/2)**2+Math.cos(c)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function Qt(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const s=n-o;s>0&&(G(s),we(),e.xpKmAwarded=n)}const i=Math.floor(t/2500),c=Number(e.ticketChunksAwarded||0);if(i>c){const s=i-c;s>0&&(ce(s),le(),e.ticketChunksAwarded=i)}}function en(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return B();const n=B();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/$t);return o>n.steps&&(n.steps=o),Qt(n),Vt(n),Zt(n),nt(n),ee(),n}function tn(){J!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(J),J=null}async function We(e={}){const t=!!e.silent;if(!navigator.geolocation)return N={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Tt,"1")}catch{}tn(),Q=!0,N={msg:"requesting",t:Date.now()};try{return J=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,c=Date.now(),s=B(),g=s.lastPos;s.lastPos={lat:o,lng:r,t:c},nt(s);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,f=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:p,speed:f,t:c}})),i>Bt){N={lat:o,lng:r,acc:i,t:c,reason:"accuracy",boostMs:Fe()},ee();return}Yt(o,r);let b=0,x=0,h=0,v=0,w="no-last";g&&typeof g.lat=="number"&&typeof g.lng=="number"&&typeof g.t=="number"&&(b=Jt({lat:g.lat,lng:g.lng},{lat:o,lng:r}),x=Math.max(1,(c-g.t)/1e3),h=b/x,b<Rt?w="jitter":b>Ot?w="teleport":h>Dt?w="too-fast":(en(b),v=b,w="ok")),N={lat:o,lng:r,acc:i,t:c,dist:Math.round(b),dt:Math.round(x),speed:Number.isFinite(h)?Number(h.toFixed(2)):0,added:Math.round(v),reason:w,boostMs:Fe()},ee()},n=>{Q=!1,N={err:n?.message||"GPS blocked",t:Date.now()},ee()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return Q=!1,N={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function nn(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>De()||await We({silent:!0}))();const t=async()=>{De()||await We({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&(G(n),we()),(o>0||r>0)&&(o>0&&ce(o),r>0&&It(r),le())}));function rt(){const e=se(),t=ae(),n=Ge(),o=Xe(),r=ot(),i=qt(),c=o>0?Math.min(100,Math.round(n/o*100)):0;return`
    <div id="cbsgoXpBarInner" style="
      min-width:160px;
      max-width:220px;
      font-family:system-ui,sans-serif;
      color:#fff;
      font-size:11px;
    ">
      <!-- Level + balk -->
      <div id="cbsgoXpLabel" style="
        font-weight:700;
        font-size:11px;
        margin-bottom:4px;
        text-align:right;
      ">
        Level ${t}
      </div>

      <div style="
        position:relative;
        height:7px;
        border-radius:999px;
        background:rgba(255,255,255,.10);
        overflow:hidden;
      ">
        <div id="cbsgoXpFill" style="
          position:absolute;
          inset:0;
          width:${c}%;
          background:linear-gradient(90deg,#22c55e,#a855f7);
          box-shadow:0 0 10px rgba(168,85,247,.65);
          transition:width .25s ease-out;
        "></div>
      </div>

      <!-- Tekst onder de balk: XP + stappen -->
      <div id="cbsgoXpText" style="
        margin-top:3px;
        opacity:.9;
        text-align:right;
        line-height:1.3;
      ">
        <div>${n}/${o} XP · total ${e}</div>
        <div>${r} steps · ${i.toFixed(2)} km</div>
      </div>
    </div>
  `}function it(){return""}function st(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function on(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const at="cbsgo_player_name_v2",_e="cbsgo_player_avatar_v2";function ct(){try{return localStorage.getItem(at)||"Sovereign"}catch{return"Sovereign"}}function rn(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(at,t)}catch{}return t}function lt(){try{return localStorage.getItem(_e)||""}catch{return""}}function sn(e){const t=String(e||"");try{localStorage.setItem(_e,t)}catch{}return t}function an(){try{localStorage.removeItem(_e)}catch{}}let y=null,F=null,W=null,j=null,H=null,P=null,M=null,oe=0,te=!1,U={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const cn="48a387bba00043ac4ba5823371abc9d2",q=35,ln=6,dn=80,un=220,pn=6e4,fn=350,gn=.35,mn=120;let he=0,A=0,ne=null,ye=!1;function T(e){return document.getElementById(e)}function I(e){const t=T("cbsgoMapHost");if(!t)return;let n=T("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function bn(){const e=String(ct()||"").trim();return e?e[0].toUpperCase():"🙂"}function hn(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function re(e,t){const o=p=>p*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),c=o(e.lat),s=o(t.lat),g=Math.sin(r/2)**2+Math.cos(c)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function dt(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,c=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+c}}function yn(e,t){const n=p=>p*Math.PI/180,o=n(e.lat),r=n(t.lat),i=n(t.lng-e.lng),c=Math.sin(i)*Math.cos(r),s=Math.cos(o)*Math.sin(r)-Math.sin(o)*Math.cos(r)*Math.cos(i);let g=Math.atan2(c,s);return g=g*180/Math.PI,g=(g+360)%360,g}function xn(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const e=document.createElement("style");e.id="cbsgoWeatherFxStyles",e.textContent=`
    @keyframes cbsgoRainFall {
      0%   { transform: translate3d(var(--x, 0%), -10%, 0); opacity: 0; }
      10%  { opacity: 1; }
      100% { transform: translate3d(var(--xEnd, 0%), 110%, 0); opacity: 0; }
    }

    @keyframes cbsgoSnowFall {
      0%   { transform: translate3d(var(--x, 0%), -10%, 0); opacity: 0; }
      15%  { opacity: 1; }
      100% { transform: translate3d(var(--xEnd, 0%), 110%, 0); opacity: 0.2; }
    }

    .cbsgoRainDrop {
      position:absolute;
      top:-10%;
      width:2px;
      height:22px;
      background:rgba(173,216,230,0.9);
      border-radius:999px;
      opacity:0;
      animation-name:cbsgoRainFall;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    }

    .cbsgoSnowFlake {
      position:absolute;
      top:-10%;
      width:10px;
      height:10px;
      border-radius:50%;
      background:rgba(255,255,255,0.95);
      box-shadow:0 0 6px rgba(255,255,255,0.9);
      opacity:0;
      animation-name:cbsgoSnowFall;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    }
  `,document.head.appendChild(e)}function ut(){const{temp:e,iconEmoji:t}=U;return e==null?"⛅ …°":`${t} ${Math.round(e)}°`}function pt(){const e=document.getElementById("cbsgoWeatherFx");if(!e)return;xn();const{condition:t,isNight:n}=U;e.style.background=n?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let o="";if(t==="rain"||t==="storm"){const i=[];for(let c=0;c<48;c++){const s=Math.random()*100,g=Math.random()*16-8,p=Math.random()*2.5,f=2+Math.random()*1.5;i.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${s}%;
            --xEnd:${s+g}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${f}s;
          "
        ></div>
      `)}o=i.join("")}else if(t==="snow"){const i=[];for(let c=0;c<42;c++){const s=Math.random()*100,g=Math.random()*20-10,p=Math.random()*4,f=6+Math.random()*4;i.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${s}%;
            --xEnd:${s+g}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${f}s;
          "
        ></div>
      `)}o=i.join("")}else o="";e.innerHTML=o}async function vn(e,t){const n=Date.now();if(!(U.lastUpdated&&n-U.lastUpdated<300*1e3))try{const o=`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&appid=${cn}&units=metric`,r=await fetch(o);if(!r.ok)throw new Error("HTTP "+r.status);const i=await r.json(),c=i?.main?.temp,s=i?.weather?.[0]?.icon||"01d",g=String(i?.weather?.[0]?.main||"").toLowerCase();let p="⛅",f="clear";s.startsWith("01")?(p="☀️",f="clear"):s.startsWith("02")?(p="🌤️",f="clear"):s.startsWith("03")||s.startsWith("04")?(p="☁️",f="clouds"):s.startsWith("09")||s.startsWith("10")?(p="🌧️",f="rain"):s.startsWith("11")?(p="⛈️",f="storm"):s.startsWith("13")?(p="❄️",f="snow"):s.startsWith("50")&&(p="🌫️",f="mist"),g.includes("rain")&&(f="rain"),g.includes("snow")&&(f="snow"),g.includes("thunder")&&(f="storm");let b=!1;try{const h=Number(i?.dt||0),v=Number(i?.timezone||0);if(h&&Number.isFinite(v)){const X=((h+v)/3600%24+24)%24;b=X<7||X>=19}}catch{b=!1}U={temp:c,iconEmoji:p,condition:f,isNight:b,lastUpdated:n};const x=document.getElementById("cbsgoWeatherLabel");x&&(x.textContent=ut()),pt()}catch(o){console.warn("Weather fetch failed",o)}}function wn(e){const t=lt();if(t){const r=`
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
    ">${hn(bn())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function je(e,t){const n=`
    <div style="
      width:28px;
      height:28px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:18px;
      filter:drop-shadow(0 2px 3px rgba(0,0,0,.8));
      /* Eerst een beetje naar boven duwen, dan roteren -> pijltje draait rond de avatar */
      transform: rotate(${t}deg) translateY(-26px);
      transform-origin:center center;
    ">
      ▲
    </div>
  `;return e.divIcon({html:n,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Sn(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function _n(e){return e.divIcon({html:`
    <div style="
      width:46px;height:46px;border-radius:18px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.22);
      background:rgba(10,12,18,.78);
      backdrop-filter: blur(10px);
      box-shadow:0 0 20px rgba(96,165,250,.65), 0 10px 22px rgba(0,0,0,.45);
      font-size:22px;
    ">
      🧩
    </div>
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function Mn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function kn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function En(e){if(!y||!P||!e)return;const t=Date.now();if(t-he<pn||P.getLayers().length>=ln)return;const o=window.L;if(!o)return;const r=Mn(),i=dt(e,dn,un),c=Sn(o,r),s=o.marker([i.lat,i.lng],{icon:c});s.on("click",()=>{if(!M){alert("GPS not ready yet. Wait until your player marker appears.");return}const g={lat:M[0],lng:M[1]},p={lat:i.lat,lng:i.lng},f=re(g,p);if(f>q){alert(`Too far to open this gift.

Distance: ${Math.round(f)}m
Needed: ≤ ${q}m`);return}P.removeLayer(s);const b=kn(r),x=`You found a gift!

Reward: ${b.text}`;alert(x);const h={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:h}))}catch{}}),s.addTo(P),he=t}function Cn(e){if(!y||!H||!e||ne)return;const t=window.L;if(!t)return;if(ye){if(A<fn||Math.random()>gn)return;A=0}else{if(A<mn)return;A=0,ye=!0}const n=dt(e,60,140),o=_n(t),r=t.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!M){alert("GPS not ready yet. Wait until your player marker appears.");return}const i={lat:M[0],lng:M[1]},c={lat:n.lat,lng:n.lng},s=re(i,c);if(s>q){alert(`Too far to start this puzzle.

Distance: ${Math.round(s)}m
Needed: ≤ ${q}m`);return}H.removeLayer(r),ne=null,be({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(H),ne=r}function Ln(e){const t=window.L;if(!t||!y||!e)return;const n=q;j?(j.setLatLng(e),j.setRadius(n)):j=t.circle(e,{radius:n,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(y)}function zn(e){const t=window.L;if(!t||!y)return;const n=wn(t);F?(F.setIcon(n),F.setLatLng(e)):(F=t.marker(e,{icon:n}).addTo(y),y.setView(e,19)),W?(W.setIcon(je(t,oe)),W.setLatLng(e)):W=t.marker(e,{icon:je(t,oe),interactive:!1}).addTo(y),Ln(e)}function Nn(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Weer-effect laag (regen/sneeuw/nacht) -->
      <div id="cbsgoWeatherFx" style="
        position:absolute;
        inset:0;
        z-index:2000;
        pointer-events:none;
        overflow:hidden;
      "></div>

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
        <span id="cbsgoWeatherLabel">${ut()}</span>
      </div>

      <!-- Kompas + centreer-player RECHTSONDER -->
      <div id="cbsgoMapControls" style="
        position:absolute;
        right:16px;
        bottom:148px;
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
  `}function Pn(){try{y&&y.remove()}catch{}y=null,F=null,W=null,j=null,H=null,P=null,M=null,te=!1,he=0,A=0,ne=null,ye=!1}function An(){const e=window.L,t=T("cbsgoMap");if(!e||!t)return!1;Pn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return y=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(y),y.setMaxBounds(n),y.setView([51.687,4.87],16),H=e.layerGroup().addTo(y),P=e.layerGroup().addTo(y),!0}function In(){!navigator.geolocation||!y||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o,heading:r}=e.coords,i={lat:t,lng:n},c=M?{lat:M[0],lng:M[1]}:null;if(M=[t,n],Number.isFinite(r))oe=r;else if(c){const s=re(c,i);Number.isFinite(s)&&s>2&&(oe=yn(c,i))}if(zn([t,n]),c){const s=re(c,i);Number.isFinite(s)&&s>1&&(A+=s)}Cn(i),En(i),vn(t,n),I(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{I(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Tn(){let e=0;const t=120,n=()=>{if(e++,!T("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if(I("Loading map engine…"),e<t)return setTimeout(n,100);I("Map engine failed to load (Leaflet not found). Refresh.");return}if(!An()){I("Could not init map. Refresh.");return}const r=T("cbsgoCenterBtn");r&&(r.onclick=()=>{y&&M&&y.setView(M,19)});const i=T("cbsgoCompassBtn");i&&(i.onclick=()=>{y&&(te=!te,te?y.setView([51.687,4.87],3):M&&y.setView(M,16))}),pt(),I("Loading GPS…"),In()};n()}function ft(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function $n(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function de(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function xe(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function He(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${ft(e)}</div>
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
  `}function Bn(){const e=ct(),t=lt();return`
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
        ${$n(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${ft(e)}" maxlength="24" style="
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
  `}function Rn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=c=>{const s=document.querySelector("#profileMsg");s&&(s.textContent=c||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const c=rn(e.value);r(`✅ Name saved: ${c}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const c=t.files&&t.files[0];if(!c)return;if(c.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const s=new FileReader;s.onload=()=>{sn(String(s.result||"")),r("✅ Photo saved"),R()},s.onerror=()=>r("⛔ Failed to read image."),s.readAsDataURL(c)}),n&&(n.onclick=()=>{an(),r("✅ Photo removed"),R()})}function On(){const e=Pt(),t=At();return`
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
  `}function gt(){const e=de();return e==="profile"?He("Profile",`<div id="profileMount">${Bn()}</div>`):e==="bag"?He("Bag",`<div id="bagMount">${On()}</div>`):""}function Dn(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Nn()}
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
          ${rt()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${it()}
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
          background:rgba(10,12,18,.85);
          backdrop-filter: blur(10px);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          color:#fff;
        ">🎒</button>
      </div>

      <!-- Panel-root: alleen deze wordt gewisseld bij tabs -->
      <div id="panelRoot">
        ${gt()}
      </div>

      ${st()?`<button id="resetBtn" type="button" style="
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
  `}function R(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=gt(),de()==="profile"&&Rn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{xe("map"),R()})}function Fn(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=de();xe(n===t?"map":t||"map"),R()})})}function mt(){const e=document.querySelector("#app");if(e){if(e.innerHTML=Dn(),Fn(),Tn(),nn(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=it())};window.addEventListener("cbsgo:stepsChanged",t)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const t=()=>{const n=document.querySelector("#xpMount");n&&(n.innerHTML=rt())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(n=>{window.addEventListener(n,t)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const t=()=>{de()==="bag"&&R()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(n=>{window.addEventListener(n,t)})}if(R(),st()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",on)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){be({id:"__daily__",name:"Daily Glow"});return}if(Ye(n))return;const o=Mt.find(r=>r.id===n);o&&be(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&_t(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Ct);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),mt()})}))}}function bt(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function ie(e){const t=bt();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";ie(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{ie(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function Ue(){try{if(!document.getElementById("app")){ie("❌ #app not found in index.html");return}mt();const t=bt();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){ie(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ue,{once:!0}):Ue();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
