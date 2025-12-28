(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const be="modulepreload",he=function(t){return"/cbs-go/"+t},$t={},ye=function(e,n,o){let r=Promise.resolve();if(n&&n.length>0){let p=function(f){return Promise.all(f.map(b=>Promise.resolve(b).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};var l=p;document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),g=s?.nonce||s?.getAttribute("nonce");r=p(n.map(f=>{if(f=he(f),f in $t)return;$t[f]=!0;const b=f.endsWith(".css"),x=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${x}`))return;const h=document.createElement("link");if(h.rel=b?"stylesheet":be,b||(h.as="script"),h.crossOrigin="",h.href=f,g&&h.setAttribute("nonce",g),document.head.appendChild(h),b)return new Promise((v,w)=>{h.addEventListener("load",v),h.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(s){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=s,window.dispatchEvent(g),!g.defaultPrevented)throw s}return r.then(s=>{for(const g of s||[])g.status==="rejected"&&i(g.reason);return e().catch(i)})},xe=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],jt="cbsgo_state_v6";function ve(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function we(){return{xp:0,completed:{},updatedAt:Date.now()}}function H(){const t=localStorage.getItem(jt);return ve(t,we())}function Ht(t){t.updatedAt=Date.now(),localStorage.setItem(jt,JSON.stringify(t))}function ht(t){return 100+(Math.max(1,Number(t||1))-1)*40}function st(){return Number(H().xp||0)}function at(){const t=st();let e=1,n=t;for(;;){const o=ht(e);if(n<o||(n-=o,e+=1,e>999))break}return e}function Ut(){const t=st();let e=1,n=t;for(;;){const o=ht(e);if(n<o||(n-=o,e+=1,e>999))break}return n}function Kt(){return ht(at())}function q(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return H();const n=H();return n.xp=Number(n.xp||0)+e,Ht(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:at()}})),n}function qt(t){const e=String(t||"");if(!e)return!1;const n=H();return!!(n.completed&&n.completed[e])}function Gt(t){const e=String(t||"");if(!e)return;const n=H();n.completed||(n.completed={}),n.completed[e]=Date.now(),Ht(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:e}}))}const Se=Object.freeze(Object.defineProperty({__proto__:null,addXp:q,completeNode:Gt,getLevel:at,getXp:st,getXpIntoLevel:Ut,getXpNeededThisLevel:Kt,isNodeCompleted:qt},Symbol.toStringTag,{value:"Module"})),Xt="cbsgoPuzzleModal";function ke(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ut(){const t=document.getElementById(Xt);t&&t.remove()}function gt(t){ut();const e=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],i=180,l=18,s=o.length,g=.01;let p=[],f=null,b=0,x=l,h=!1,v=!1,w=null;const G=t?.name||"CBS GO Puzzle",_=document.createElement("div");_.id=Xt,_.style.position="fixed",_.style.inset="0",_.style.zIndex="999999",_.style.display="flex",_.style.alignItems="center",_.style.justifyContent="center",_.style.padding="16px",_.style.background="rgba(0,0,0,.70)",_.style.backdropFilter="blur(12px)",_.style.fontFamily="system-ui, sans-serif",_.style.color="#fff",_.innerHTML=`
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
          ${ke(G)}
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
          <div>Moves left: <span id="cbsgoMoves">${l}</span></div>
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
          grid-template-rows:repeat(${e}, 1fr);
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
  `,document.body.appendChild(_);const ct=document.getElementById("cbsgoBoard"),wt=document.getElementById("cbsgoScore"),St=document.getElementById("cbsgoMoves"),kt=document.getElementById("cbsgoStatus"),Mt=document.getElementById("cbsgoPuzzleClose"),_t=document.getElementById("cbsgoPuzzleOk"),X=document.getElementById("cbsgoConfettiLayer");function z(d){kt&&(kt.textContent=d||"")}function pe(){if(!X)return;X.style.display="block",X.innerHTML="";const d=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],c=40;for(let u=0;u<c;u++){const a=document.createElement("div"),m=6+Math.floor(Math.random()*6),S=Math.random()*100,E=Math.random()*.6,k=1+Math.random()*.6,V=Math.random()*360;a.style.position="absolute",a.style.top="-10%",a.style.left=`${S}%`,a.style.width=`${m}px`,a.style.height=`${m*2}px`,a.style.background=d[u%d.length],a.style.opacity="0.9",a.style.borderRadius="2px",a.style.transform=`rotate(${V}deg)`,a.style.animation=`cbsgoConfettiFall ${k}s ease-out ${E}s forwards`,X.appendChild(a)}}function Et(){return Math.floor(Math.random()*o.length)}function fe(){p=[];for(let d=0;d<e;d++){const c=[];for(let u=0;u<n;u++)Math.random()<g?c.push(s):c.push(Et());p.push(c)}}function Y(d){return d===s}function C(){if(ct){ct.innerHTML="";for(let d=0;d<e;d++)for(let c=0;c<n;c++){const u=p[d][c],a=document.createElement("div");a.dataset.row=String(d),a.dataset.col=String(c),a.style.borderRadius="12px",a.style.display="flex",a.style.alignItems="center",a.style.justifyContent="center",a.style.cursor=v?"default":"pointer",a.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",a.style.fontSize="20px",Y(u)?(a.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",a.textContent="💥"):(a.style.background=o[u]||"#444",a.textContent=r[u]||"⬛"),f&&f.row===d&&f.col===c&&(a.style.outline="2px solid #fff",a.style.outlineOffset="2px"),a.addEventListener("click",()=>{It(d,c)}),a.addEventListener("touchstart",m=>{if(v)return;const S=m.touches[0];w={row:d,col:c,x:S.clientX,y:S.clientY}}),a.addEventListener("touchend",m=>{if(!w||v)return;const S=m.changedTouches[0],E=S.clientX-w.x,k=S.clientY-w.y;if(Math.sqrt(E*E+k*k)<18){It(d,c),w=null;return}let L=w.row,R=w.col;Math.abs(E)>Math.abs(k)?E>0?R+=1:R-=1:k>0?L+=1:L-=1,L>=0&&L<e&&R>=0&&R<n&&At(w.row,w.col,L,R),w=null,m.preventDefault()}),ct.appendChild(a)}}}function Ct(d,c){if(!d||!c)return!1;const u=Math.abs(d.row-c.row),a=Math.abs(d.col-c.col);return u+a===1}function Lt(d,c){const u=p[d.row][d.col];p[d.row][d.col]=p[c.row][c.col],p[c.row][c.col]=u}function zt(){const d=new Set;for(let c=0;c<e;c++){let u=p[c][0],a=0;for(let m=1;m<=n;m++){const S=m<n?p[c][m]:null;if(S===u)continue;const E=m-a;if(u!=null&&E>=3)for(let k=a;k<m;k++)d.add(`${c},${k}`);u=S,a=m}}for(let c=0;c<n;c++){let u=p[0][c],a=0;for(let m=1;m<=e;m++){const S=m<e?p[m][c]:null;if(S===u)continue;const E=m-a;if(u!=null&&E>=3)for(let k=a;k<m;k++)d.add(`${k},${c}`);u=S,a=m}}return d}function Nt(d){if(!d||!d.size)return 0;const c=d.size;b+=c*4,wt&&(wt.textContent=String(b)),!v&&b>=i&&dt(!0);for(const u of d){const[a,m]=u.split(","),S=Number(a),E=Number(m);p[S][E]=null}for(let u=0;u<n;u++){let a=e-1;for(let m=e-1;m>=0;m--)p[m][u]!=null&&(p[a][u]=p[m][u],a--);for(let m=a;m>=0;m--)Math.random()<g?p[m][u]=s:p[m][u]=Et()}return c}function ge(d,c){const u=new Set;for(let a=0;a<n;a++)u.add(`${d},${a}`);for(let a=0;a<e;a++)u.add(`${a},${c}`);Nt(u),C(),v||setTimeout(()=>Pt(!1),120)}function Pt(d=!1){if(v)return;h=!0;const c=()=>{if(v){h=!0;return}const u=zt();if(!u.size){h=!1,C(),d&&!v&&(x<=0?B():z("Nice! Keep matching."));return}Nt(u),C(),setTimeout(c,120)};c()}function dt(d){if(!v)if(v=!0,h=!0,d){z("Great job! Puzzle completed 🎉");try{t?.id&&Gt(t.id),q(10)}catch{}pe(),setTimeout(()=>{ut()},1600)}else z("Out of moves. Try again next time 🙂")}function B(){b>=i?dt(!0):x<=0&&dt(!1)}function At(d,c,u,a){if(h||v)return;if(x<=0){B();return}const m={row:d,col:c},S={row:u,col:a};if(!Ct(m,S))return;const E=p[d][c],k=p[u][a],V=Y(E)||Y(k);if(Lt(m,S),f=null,x--,St&&(St.textContent=String(x)),V){C();const L=Y(p[d][c])?{row:d,col:c}:{row:u,col:a};ge(L.row,L.col),B();return}if(!zt().size){Lt(m,S),C(),z("No match… try another swap."),B();return}z(""),C(),Pt(!0)}function It(d,c){if(h||v)return;if(x<=0){B();return}const u={row:d,col:c};if(!f){f=u,C();return}if(f.row===d&&f.col===c){f=null,C();return}if(!Ct(f,u)){f=u,C();return}At(f.row,f.col,u.row,u.col)}function Tt(){ut()}Mt&&(Mt.onclick=Tt),_t&&(_t.onclick=()=>{Tt()}),fe(),C(),z("Tap or swipe two neighboring tiles to swap them.")}const Yt="cbsgo_inventory_v1";function Me(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function _e(){return{tickets:0,cbs:0}}function T(){const t=localStorage.getItem(Yt),e=Me(t,_e());return typeof e.tickets!="number"&&(e.tickets=0),typeof e.cbs!="number"&&(e.cbs=0),e}function Vt(t){const e={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0)};localStorage.setItem(Yt,JSON.stringify(e))}function Ee(){return Number(T().tickets||0)}function Ce(){return Number(T().cbs||0)}function lt(t=1){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+e,Vt(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function Le(t=1){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return T();const n=T();return n.cbs=Number(n.cbs||0)+e,Vt(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Zt="cbsgo_steps_v6",ze="cbsgo_gps_autostart_v2",Jt="cbsgo_daily_puzzle_v1",Ne=.75,Pe=200,Ae=.3,Ie=400,Te=20,pt=1500,ft=200,$e=.25,Be=.05,Re=.3;let Z=null,J=!1,N={msg:"init"};function Oe(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function De(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function $(){const t=localStorage.getItem(Zt);return Oe(t,De())}function Qt(t){t.updatedAt=Date.now(),localStorage.setItem(Zt,JSON.stringify(t))}function Q(){return Number($().steps||0)}function Fe(){const t=$();return Number(t.meters||0)}function We(){return Fe()/1e3}function Bt(){return!!J}function yt(){const t=new Date,e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${o}`}function je(){try{return localStorage.getItem(Jt)===yt()}catch{return!1}}function He(){try{localStorage.setItem(Jt,yt())}catch{}}function Ue(t,e){return je()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:e,date:yt()}})),He(),!0)}function Rt(){const t=$(),e=Number(t.boostUntil||0);return Math.max(0,e-Date.now())}function Ke(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const n=Number(t.boostLastStep||0),o=Number(t.steps||0);if(!Number.isFinite(n)){t.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<pt)return;const i=Math.floor(r/pt);i<=0||(lt(i),t.boostLastStep=n+i*pt)}function qe(t){let e=Number(t.chestMeters||0);if(Number.isFinite(e)||(e=0),e<ft){t.chestMeters=e;return}let n=0;for(;e>=ft&&n<5;)if(e-=ft,n+=1,Math.random()<$e){const o=Math.random()<Be,r=o?10:3,i=o?2:1;q(r),lt(i);const l=o&&Math.random()<Re;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:l}}));break}t.chestMeters=e}function Ge(t,e){const o=p=>p*Math.PI/180,r=o(e.lat-t.lat),i=o(e.lng-t.lng),l=o(t.lat),s=o(e.lat),g=Math.sin(r/2)**2+Math.cos(l)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function Xe(t){const e=Number(t.meters||0);if(!Number.isFinite(e)||e<=0)return;const n=Math.floor(e/1e3),o=Number(t.xpKmAwarded||0);if(n>o){const s=n-o;s>0&&(q(s),t.xpKmAwarded=n)}const i=Math.floor(e/2500),l=Number(t.ticketChunksAwarded||0);if(i>l){const s=i-l;s>0&&(lt(s),t.ticketChunksAwarded=i)}}function Ye(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return $();const n=$();n.meters=Number(n.meters||0)+e,n.chestMeters=Number(n.chestMeters||0)+e;const o=Math.floor((n.meters||0)/Ne);return o>n.steps&&(n.steps=o),Xe(n),Ke(n),qe(n),Qt(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Ve(){Z!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Z),Z=null}async function Ot(t={}){const e=!!t.silent;if(!navigator.geolocation)return N={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(ze,"1")}catch{}Ve(),J=!0,N={msg:"requesting",t:Date.now()};try{return Z=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,l=Date.now(),s=$(),g=s.lastPos;s.lastPos={lat:o,lng:r,t:l},Qt(s);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,f=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:p,speed:f,t:l}})),i>Pe){N={lat:o,lng:r,acc:i,t:l,reason:"accuracy",boostMs:Rt()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Q()}}));return}Ue(o,r);let b=0,x=0,h=0,v=0,w="no-last";g&&typeof g.lat=="number"&&typeof g.lng=="number"&&typeof g.t=="number"&&(b=Ge({lat:g.lat,lng:g.lng},{lat:o,lng:r}),x=Math.max(1,(l-g.t)/1e3),h=b/x,b<Ae?w="jitter":b>Ie?w="teleport":h>Te?w="too-fast":(Ye(b),v=b,w="ok")),N={lat:o,lng:r,acc:i,t:l,dist:Math.round(b),dt:Math.round(x),speed:Number(h.toFixed(2)),added:Math.round(v),reason:w,boostMs:Rt()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Q()}}))},n=>{J=!1,N={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:Q()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return J=!1,N={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Ze(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>Bt()||await Ot({silent:!0}))();const e=async()=>{Bt()||await Ot({silent:!0}),window.removeEventListener("pointerdown",e),window.removeEventListener("touchstart",e),window.removeEventListener("click",e)};window.addEventListener("pointerdown",e,{once:!0}),window.addEventListener("touchstart",e,{once:!0}),window.addEventListener("click",e,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const e=t?.detail||{},n=Number(e.xp||0),o=Number(e.tickets||0),r=Number(e.cbs||0);n>0&&q(n),o>0&&lt(o),r>0&&Le(r)}));function Je(){const t=st(),e=at(),n=Ut(),o=Kt(),r=Q(),i=We(),l=o>0?Math.min(100,Math.round(n/o*100)):0;return`
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
        Level ${e}
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
          width:${l}%;
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
        <div>${n}/${o} XP · total ${t}</div>
        <div>${r} steps · ${i.toFixed(2)} km</div>
      </div>
    </div>
  `}function te(){return""}function ee(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Qe(){try{const t=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>localStorage.removeItem(e))}catch{}try{const t=[];for(let e=0;e<sessionStorage.length;e++){const n=sessionStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>sessionStorage.removeItem(e))}catch{}window.location.reload()}const ne="cbsgo_player_name_v2",xt="cbsgo_player_avatar_v2";function oe(){try{return localStorage.getItem(ne)||"Sovereign"}catch{return"Sovereign"}}function tn(t){const e=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ne,e)}catch{}return e}function re(){try{return localStorage.getItem(xt)||""}catch{return""}}function en(t){const e=String(t||"");try{localStorage.setItem(xt,e)}catch{}return e}function nn(){try{localStorage.removeItem(xt)}catch{}}let y=null,O=null,D=null,F=null,W=null,P=null,M=null,nt=0,tt=!1,j={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const on="48a387bba00043ac4ba5823371abc9d2",U=35,rn=6,sn=80,an=220,ln=6e4,cn=350,dn=.35;let mt=0,ot=0,et=null;function I(t){return document.getElementById(t)}function A(t){const e=I("cbsgoMapHost");if(!e)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",e.appendChild(n)),n.textContent=t||""}function un(){const t=String(oe()||"").trim();return t?t[0].toUpperCase():"🙂"}function pn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function rt(t,e){const o=p=>p*Math.PI/180,r=o(e.lat-t.lat),i=o(e.lng-t.lng),l=o(t.lat),s=o(e.lat),g=Math.sin(r/2)**2+Math.cos(l)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function ie(t,e,n){const o=e+Math.random()*(n-e),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,l=o*Math.sin(r)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+i,lng:t.lng+l}}function fn(t,e){const n=p=>p*Math.PI/180,o=n(t.lat),r=n(e.lat),i=n(e.lng-t.lng),l=Math.sin(i)*Math.cos(r),s=Math.cos(o)*Math.sin(r)-Math.sin(o)*Math.cos(r)*Math.cos(i);let g=Math.atan2(l,s);return g=g*180/Math.PI,g=(g+360)%360,g}function gn(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function se(){const{temp:t,iconEmoji:e}=j;return t==null?"⛅ …°":`${e} ${Math.round(t)}°`}function ae(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;gn();const{condition:e,isNight:n}=j;t.style.background=n?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let o="";if(e==="rain"||e==="storm"){const i=[];for(let l=0;l<48;l++){const s=Math.random()*100,g=Math.random()*16-8,p=Math.random()*2.5,f=2+Math.random()*1.5;i.push(`
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
      `)}o=i.join("")}else if(e==="snow"){const i=[];for(let l=0;l<42;l++){const s=Math.random()*100,g=Math.random()*20-10,p=Math.random()*4,f=6+Math.random()*4;i.push(`
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
      `)}o=i.join("")}else o="";t.innerHTML=o}async function mn(t,e){const n=Date.now();if(!(j.lastUpdated&&n-j.lastUpdated<300*1e3))try{const o=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${e}&appid=${on}&units=metric`,r=await fetch(o);if(!r.ok)throw new Error("HTTP "+r.status);const i=await r.json(),l=i?.main?.temp,s=i?.weather?.[0]?.icon||"01d",g=String(i?.weather?.[0]?.main||"").toLowerCase();let p="⛅",f="clear";s.startsWith("01")?(p="☀️",f="clear"):s.startsWith("02")?(p="🌤️",f="clear"):s.startsWith("03")||s.startsWith("04")?(p="☁️",f="clouds"):s.startsWith("09")||s.startsWith("10")?(p="🌧️",f="rain"):s.startsWith("11")?(p="⛈️",f="storm"):s.startsWith("13")?(p="❄️",f="snow"):s.startsWith("50")&&(p="🌫️",f="mist"),g.includes("rain")&&(f="rain"),g.includes("snow")&&(f="snow"),g.includes("thunder")&&(f="storm");let b=!1;try{const h=Number(i?.dt||0),v=Number(i?.timezone||0);if(h&&Number.isFinite(v)){const G=((h+v)/3600%24+24)%24;b=G<7||G>=19}}catch{b=!1}j={temp:l,iconEmoji:p,condition:f,isNight:b,lastUpdated:n};const x=document.getElementById("cbsgoWeatherLabel");x&&(x.textContent=se()),ae()}catch(o){console.warn("Weather fetch failed",o)}}function bn(t){const e=re();if(e){const r=`
      <div style="
        width:42px;height:42px;border-radius:999px;
        border:2px solid rgba(255,255,255,.95);
        box-shadow:0 10px 24px rgba(0,0,0,.45);
        background-image:url('${e}');
        background-size:cover;
        background-position:center;
      "></div>
    `;return t.divIcon({html:r,className:"",iconSize:[42,42],iconAnchor:[21,21]})}const o=`
    <div style="
      width:38px;height:38px;border-radius:999px;
      border:2px solid rgba(255,255,255,.90);
      box-shadow:0 10px 24px rgba(0,0,0,.45);
      background:rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      font-weight:900;font-size:16px;color:#fff;
    ">${pn(un())}</div>
  `;return t.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function Dt(t,e){const n=`
    <div style="
      width:24px;height:24px;
      transform: rotate(${e}deg);
      transform-origin:center center;
      filter:drop-shadow(0 2px 4px rgba(0,0,0,.6));
      display:flex;align-items:center;justify-content:center;
      font-size:22px;
    ">
      ⬆️
    </div>
  `;return t.divIcon({html:n,className:"",iconSize:[24,24],iconAnchor:[12,22]})}function hn(t,e){let n="⭐";e==="ticket"&&(n="🎟️"),e==="cbs"&&(n="🪙");const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function yn(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function xn(){const t=Math.random();return t<.7?"xp":t<.95?"ticket":"cbs"}function vn(t){if(t==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(t==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const e=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:e,text:`+${e} CBS Coin`}}function wn(t){if(!y||!P||!t)return;const e=Date.now();if(e-mt<ln||P.getLayers().length>=rn)return;const o=window.L;if(!o)return;const r=xn(),i=ie(t,sn,an),l=hn(o,r),s=o.marker([i.lat,i.lng],{icon:l});s.on("click",()=>{if(!M){alert("GPS not ready yet. Wait until your player marker appears.");return}const g={lat:M[0],lng:M[1]},p={lat:i.lat,lng:i.lng},f=rt(g,p);if(f>U){alert(`Too far to open this gift.

Distance: ${Math.round(f)}m
Needed: ≤ ${U}m`);return}P.removeLayer(s);const b=vn(r),x=`You found a gift!

Reward: ${b.text}`;alert(x);const h={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:h}))}catch{}}),s.addTo(P),mt=e}function Sn(t){if(!y||!W||!t||et||ot<cn||Math.random()>dn)return;ot=0;const e=window.L;if(!e)return;const n=ie(t,60,140),o=yn(e),r=e.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!M){alert("GPS not ready yet. Wait until your player marker appears.");return}const i={lat:M[0],lng:M[1]},l={lat:n.lat,lng:n.lng},s=rt(i,l);if(s>U){alert(`Too far to start this puzzle.

Distance: ${Math.round(s)}m
Needed: ≤ ${U}m`);return}W.removeLayer(r),et=null,gt({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(W),et=r}function kn(t){const e=window.L;if(!e||!y||!t)return;const n=U;F?(F.setLatLng(t),F.setRadius(n)):F=e.circle(t,{radius:n,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(y)}function Mn(t){const e=window.L;if(!e||!y)return;const n=bn(e);O?(O.setIcon(n),O.setLatLng(t)):(O=e.marker(t,{icon:n}).addTo(y),y.setView(t,19)),D?(D.setIcon(Dt(e,nt)),D.setLatLng(t)):D=e.marker(t,{icon:Dt(e,nt),interactive:!1}).addTo(y),kn(t)}function _n(){return`
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
        <span id="cbsgoWeatherLabel">${se()}</span>
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
  `}function En(){try{y&&y.remove()}catch{}y=null,O=null,D=null,F=null,W=null,P=null,M=null,tt=!1,mt=0,ot=0,et=null}function Cn(){const t=window.L,e=I("cbsgoMap");if(!t||!e)return!1;En();const n=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));return y=t.map(e,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(y),y.setMaxBounds(n),y.setView([51.687,4.87],16),W=t.layerGroup().addTo(y),P=t.layerGroup().addTo(y),!0}function Ln(){!navigator.geolocation||!y||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:e,longitude:n,accuracy:o,heading:r}=t.coords,i={lat:e,lng:n},l=M?{lat:M[0],lng:M[1]}:null;if(M=[e,n],Number.isFinite(r))nt=r;else if(l){const s=rt(l,i);Number.isFinite(s)&&s>2&&(nt=fn(l,i))}if(Mn([e,n]),l){const s=rt(l,i);Number.isFinite(s)&&s>1&&(ot+=s)}Sn(i),wn(i),mn(e,n),A(`GPS OK • accuracy ~${Math.round(o)}m`)},t=>{A(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function zn(){let t=0;const e=120,n=()=>{if(t++,!I("cbsgoMap"))return t<e?setTimeout(n,100):void 0;if(!window.L){if(A("Loading map engine…"),t<e)return setTimeout(n,100);A("Map engine failed to load (Leaflet not found). Refresh.");return}if(!Cn()){A("Could not init map. Refresh.");return}const r=I("cbsgoCenterBtn");r&&(r.onclick=()=>{y&&M&&y.setView(M,19)});const i=I("cbsgoCompassBtn");i&&(i.onclick=()=>{y&&(tt=!tt,tt?y.setView([51.687,4.87],3):M&&y.setView(M,16))}),ae(),A("Loading GPS…"),Ln()};n()}function le(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Nn(t,e=30){const n=t?`background-image:url('${t}');`:"";return`
    <div style="
      width:${e}px;height:${e}px;border-radius:999px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      ${n}
      background-size:cover;
      background-position:center;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      font-size:16px;
    ">${t?"":"👤"}</div>
  `}function vt(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function bt(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function Ft(t,e){return`
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
          <div style="font-weight:900; font-size:15px;">${le(t)}</div>
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
          ${e}
        </div>
      </div>
    </div>
  `}function Pn(){const t=oe(),e=re();return`
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
        ${Nn(e,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${le(t)}" maxlength="24" style="
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
  `}function An(){const t=document.querySelector("#profileName"),e=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=l=>{const s=document.querySelector("#profileMsg");s&&(s.textContent=l||"")};t&&r(t.value?`✅ Profile loaded: ${t.value}`:"");const i=()=>{if(!t)return;const l=tn(t.value);r(`✅ Name saved: ${l}`)};t&&(t.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),t.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),e&&e.addEventListener("change",()=>{const l=e.files&&e.files[0];if(!l)return;if(l.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),e.value="";return}r("Uploading photo…");const s=new FileReader;s.onload=()=>{en(String(s.result||"")),r("✅ Photo saved"),K()},s.onerror=()=>r("⛔ Failed to read image."),s.readAsDataURL(l)}),n&&(n.onclick=()=>{nn(),r("✅ Photo removed"),K()})}function In(){const t=Ee(),e=Ce();return`
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
          🎟️ Tickets: <b>${t}</b>
        </div>

        <div style="
          padding:8px 14px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(10,12,18,.9);
          font-size:13px;
        ">
          🪙 CBS (play money): <b>${e}</b>
        </div>
      </div>
    </section>
  `}function ce(){const t=vt();return t==="profile"?Ft("Profile",`<div id="profileMount">${Pn()}</div>`):t==="bag"?Ft("Bag",`<div id="bagMount">${In()}</div>`):""}function Tn(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${_n()}
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
          ${Je()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${te()}
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
        ${ce()}
      </div>

      ${ee()?`<button id="resetBtn" type="button" style="
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
  `}function K(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=ce(),vt()==="profile"&&An();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{bt("map"),K()})}function $n(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-panel"),n=vt();bt(n===e?"map":e||"map"),K()})})}function de(){const t=document.querySelector("#app");if(t){if(t.innerHTML=Tn(),$n(),zn(),Ze(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const e=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=te())};window.addEventListener("cbsgo:stepsChanged",e)}if(K(),ee()){const e=document.querySelector("#resetBtn");e&&e.addEventListener("click",Qe)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",e=>{const n=e?.detail?.id;if(!n)return;if(n==="__daily__"){gt({id:"__daily__",name:"Daily Glow"});return}if(qt(n))return;const o=xe.find(r=>r.id===n);o&&gt(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",e=>{const n=e?.detail?.id;n&&ye(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Se);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),de()})}))}}function ue(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function it(t){const e=ue();e.textContent=String(t||""),e.style.display="block"}window.addEventListener("error",t=>{const e=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";it(`❌ Error
${t?.message||t}
${e}`)});window.addEventListener("unhandledrejection",t=>{it(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function Wt(){try{if(!document.getElementById("app")){it("❌ #app not found in index.html");return}de();const e=ue();e.textContent="✅ boot ok",e.style.display="block",setTimeout(()=>{e.style.display="none"},1e3)}catch(t){it(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Wt,{once:!0}):Wt();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(e=>{console.log("[CBS GO] Service worker registered:",e.scope)}).catch(e=>{console.error("[CBS GO] Service worker registration failed:",e)})});
