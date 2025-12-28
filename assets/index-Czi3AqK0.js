(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Pe="modulepreload",Ae=function(t){return"/cbs-go/"+t},Ut={},$e=function(e,n,o){let r=Promise.resolve();if(n&&n.length>0){let p=function(c){return Promise.all(c.map(b=>Promise.resolve(b).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var l=p;document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),g=s?.nonce||s?.getAttribute("nonce");r=p(n.map(c=>{if(c=Ae(c),c in Ut)return;Ut[c]=!0;const b=c.endsWith(".css"),h=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const y=document.createElement("link");if(y.rel=b?"stylesheet":Pe,b||(y.as="script"),y.crossOrigin="",y.href=c,g&&y.setAttribute("nonce",g),document.head.appendChild(y),b)return new Promise((v,w)=>{y.addEventListener("load",v),y.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(s){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=s,window.dispatchEvent(g),!g.defaultPrevented)throw s}return r.then(s=>{for(const g of s||[])g.status==="rejected"&&i(g.reason);return e().catch(i)})},Te=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Jt="cbsgo_state_v6";function Be(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function Re(){return{xp:0,completed:{},updatedAt:Date.now()}}function q(){const t=localStorage.getItem(Jt);return Be(t,Re())}function Qt(t){t.updatedAt=Date.now(),localStorage.setItem(Jt,JSON.stringify(t))}function kt(t){return 100+(Math.max(1,Number(t||1))-1)*40}function at(){return Number(q().xp||0)}function lt(){const t=at();let e=1,n=t;for(;;){const o=kt(e);if(n<o||(n-=o,e+=1,e>999))break}return e}function te(){const t=at();let e=1,n=t;for(;;){const o=kt(e);if(n<o||(n-=o,e+=1,e>999))break}return n}function ee(){return kt(lt())}function G(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return q();const n=q();return n.xp=Number(n.xp||0)+e,Qt(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:lt()}})),n}function ne(t){const e=String(t||"");if(!e)return!1;const n=q();return!!(n.completed&&n.completed[e])}function oe(t){const e=String(t||"");if(!e)return;const n=q();n.completed||(n.completed={}),n.completed[e]=Date.now(),Qt(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:e}}))}const Oe=Object.freeze(Object.defineProperty({__proto__:null,addXp:G,completeNode:oe,getLevel:lt,getXp:at,getXpIntoLevel:te,getXpNeededThisLevel:ee,isNodeCompleted:ne},Symbol.toStringTag,{value:"Module"})),re="cbsgoPuzzleModal";function We(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function bt(){const t=document.getElementById(re);t&&t.remove()}function xt(t){bt();const e=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],i=180,l=18,s=o.length,g=.01;let p=[],c=null,b=0,h=l,y=!1,v=!1,w=null;const Y=t?.name||"CBS GO Puzzle",M=document.createElement("div");M.id=re,M.style.position="fixed",M.style.inset="0",M.style.zIndex="999999",M.style.display="flex",M.style.alignItems="center",M.style.justifyContent="center",M.style.padding="16px",M.style.background="rgba(0,0,0,.70)",M.style.backdropFilter="blur(12px)",M.style.fontFamily="system-ui, sans-serif",M.style.color="#fff",M.innerHTML=`
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
          ${We(Y)}
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
  `,document.body.appendChild(M);const gt=document.getElementById("cbsgoBoard"),Nt=document.getElementById("cbsgoScore"),zt=document.getElementById("cbsgoMoves"),It=document.getElementById("cbsgoStatus"),Pt=document.getElementById("cbsgoPuzzleClose"),At=document.getElementById("cbsgoPuzzleOk"),X=document.getElementById("cbsgoConfettiLayer");function N(u){It&&(It.textContent=u||"")}function Le(){if(!X)return;X.style.display="block",X.innerHTML="";const u=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],d=40;for(let f=0;f<d;f++){const a=document.createElement("div"),m=6+Math.floor(Math.random()*6),S=Math.random()*100,E=Math.random()*.6,k=1+Math.random()*.6,Z=Math.random()*360;a.style.position="absolute",a.style.top="-10%",a.style.left=`${S}%`,a.style.width=`${m}px`,a.style.height=`${m*2}px`,a.style.background=u[f%u.length],a.style.opacity="0.9",a.style.borderRadius="2px",a.style.transform=`rotate(${Z}deg)`,a.style.animation=`cbsgoConfettiFall ${k}s ease-out ${E}s forwards`,X.appendChild(a)}}function $t(){return Math.floor(Math.random()*o.length)}function Ne(){p=[];for(let u=0;u<e;u++){const d=[];for(let f=0;f<n;f++)Math.random()<g?d.push(s):d.push($t());p.push(d)}}function V(u){return u===s}function C(){if(gt){gt.innerHTML="";for(let u=0;u<e;u++)for(let d=0;d<n;d++){const f=p[u][d],a=document.createElement("div");a.dataset.row=String(u),a.dataset.col=String(d),a.style.borderRadius="12px",a.style.display="flex",a.style.alignItems="center",a.style.justifyContent="center",a.style.cursor=v?"default":"pointer",a.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",a.style.fontSize="20px",V(f)?(a.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",a.textContent="💥"):(a.style.background=o[f]||"#444",a.textContent=r[f]||"⬛"),c&&c.row===u&&c.col===d&&(a.style.outline="2px solid #fff",a.style.outlineOffset="2px"),a.addEventListener("click",()=>{Ft(u,d)}),a.addEventListener("touchstart",m=>{if(v)return;const S=m.touches[0];w={row:u,col:d,x:S.clientX,y:S.clientY}}),a.addEventListener("touchend",m=>{if(!w||v)return;const S=m.changedTouches[0],E=S.clientX-w.x,k=S.clientY-w.y;if(Math.sqrt(E*E+k*k)<18){Ft(u,d),w=null;return}let L=w.row,W=w.col;Math.abs(E)>Math.abs(k)?E>0?W+=1:W-=1:k>0?L+=1:L-=1,L>=0&&L<e&&W>=0&&W<n&&Dt(w.row,w.col,L,W),w=null,m.preventDefault()}),gt.appendChild(a)}}}function Tt(u,d){if(!u||!d)return!1;const f=Math.abs(u.row-d.row),a=Math.abs(u.col-d.col);return f+a===1}function Bt(u,d){const f=p[u.row][u.col];p[u.row][u.col]=p[d.row][d.col],p[d.row][d.col]=f}function Rt(){const u=new Set;for(let d=0;d<e;d++){let f=p[d][0],a=0;for(let m=1;m<=n;m++){const S=m<n?p[d][m]:null;if(S===f)continue;const E=m-a;if(f!=null&&E>=3)for(let k=a;k<m;k++)u.add(`${d},${k}`);f=S,a=m}}for(let d=0;d<n;d++){let f=p[0][d],a=0;for(let m=1;m<=e;m++){const S=m<e?p[m][d]:null;if(S===f)continue;const E=m-a;if(f!=null&&E>=3)for(let k=a;k<m;k++)u.add(`${k},${d}`);f=S,a=m}}return u}function Ot(u){if(!u||!u.size)return 0;const d=u.size;b+=d*4,Nt&&(Nt.textContent=String(b)),!v&&b>=i&&mt(!0);for(const f of u){const[a,m]=f.split(","),S=Number(a),E=Number(m);p[S][E]=null}for(let f=0;f<n;f++){let a=e-1;for(let m=e-1;m>=0;m--)p[m][f]!=null&&(p[a][f]=p[m][f],a--);for(let m=a;m>=0;m--)Math.random()<g?p[m][f]=s:p[m][f]=$t()}return d}function ze(u,d){const f=new Set;for(let a=0;a<n;a++)f.add(`${u},${a}`);for(let a=0;a<e;a++)f.add(`${a},${d}`);Ot(f),C(),v||setTimeout(()=>Wt(!1),120)}function Wt(u=!1){if(v)return;y=!0;const d=()=>{if(v){y=!0;return}const f=Rt();if(!f.size){y=!1,C(),u&&!v&&(h<=0?O():N("Nice! Keep matching."));return}Ot(f),C(),setTimeout(d,120)};d()}function mt(u){if(!v)if(v=!0,y=!0,u){N("Great job! Puzzle completed 🎉");try{t?.id&&oe(t.id),G(10)}catch{}Le(),setTimeout(()=>{bt()},1600)}else N("Out of moves. Try again next time 🙂")}function O(){b>=i?mt(!0):h<=0&&mt(!1)}function Dt(u,d,f,a){if(y||v)return;if(h<=0){O();return}const m={row:u,col:d},S={row:f,col:a};if(!Tt(m,S))return;const E=p[u][d],k=p[f][a],Z=V(E)||V(k);if(Bt(m,S),c=null,h--,zt&&(zt.textContent=String(h)),Z){C();const L=V(p[u][d])?{row:u,col:d}:{row:f,col:a};ze(L.row,L.col),O();return}if(!Rt().size){Bt(m,S),C(),N("No match… try another swap."),O();return}N(""),C(),Wt(!0)}function Ft(u,d){if(y||v)return;if(h<=0){O();return}const f={row:u,col:d};if(!c){c=f,C();return}if(c.row===u&&c.col===d){c=null,C();return}if(!Tt(c,f)){c=f,C();return}Dt(c.row,c.col,f.row,f.col)}function jt(){bt()}Pt&&(Pt.onclick=jt),At&&(At.onclick=()=>{jt()}),Ne(),C(),N("Tap or swipe two neighboring tiles to swap them.")}const ie="cbsgo_inventory_v1";function De(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function Fe(){return{tickets:0,cbs:0}}function T(){const t=localStorage.getItem(ie),e=De(t,Fe());return typeof e.tickets!="number"&&(e.tickets=0),typeof e.cbs!="number"&&(e.cbs=0),e}function se(t){const e={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0)};localStorage.setItem(ie,JSON.stringify(e))}function je(){return Number(T().tickets||0)}function Ue(){return Number(T().cbs||0)}function ct(t=1){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+e,se(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function He(t=1){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return T();const n=T();return n.cbs=Number(n.cbs||0)+e,se(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const ae="cbsgo_steps_v6",qe="cbsgo_gps_autostart_v2",le="cbsgo_daily_puzzle_v1",Ke=.75,Ge=1e3,Ye=.5,Xe=2e3,Ve=50,yt=1500,ht=200,Ze=.25,Je=.05,Qe=.3;let Q=null,tt=!1,z={msg:"init"};function tn(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function en(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function B(){const t=localStorage.getItem(ae);return tn(t,en())}function ce(t){t.updatedAt=Date.now(),localStorage.setItem(ae,JSON.stringify(t))}function et(){window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:de()}}))}function _t(){window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{}))}function dt(){window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{}))}function de(){return Number(B().steps||0)}function nn(){const t=B();return Number(t.meters||0)}function on(){return nn()/1e3}function Ht(){return!!tt}function Mt(){const t=new Date,e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${o}`}function rn(){try{return localStorage.getItem(le)===Mt()}catch{return!1}}function sn(){try{localStorage.setItem(le,Mt())}catch{}}function an(t,e){return rn()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:e,date:Mt()}})),sn(),!0)}function qt(){const t=B(),e=Number(t.boostUntil||0);return Math.max(0,e-Date.now())}function ln(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const n=Number(t.boostLastStep||0),o=Number(t.steps||0);if(!Number.isFinite(n)){t.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<yt)return;const i=Math.floor(r/yt);i<=0||(ct(i),dt(),t.boostLastStep=n+i*yt)}function cn(t){let e=Number(t.chestMeters||0);if(Number.isFinite(e)||(e=0),e<ht){t.chestMeters=e;return}let n=0;for(;e>=ht&&n<5;)if(e-=ht,n+=1,Math.random()<Ze){const o=Math.random()<Je,r=o?10:3,i=o?2:1;G(r),_t(),ct(i),dt();const l=o&&Math.random()<Qe;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:l}}));break}t.chestMeters=e}function dn(t,e){const o=p=>p*Math.PI/180,r=o(e.lat-t.lat),i=o(e.lng-t.lng),l=o(t.lat),s=o(e.lat),g=Math.sin(r/2)**2+Math.cos(l)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function un(t){const e=Number(t.meters||0);if(!Number.isFinite(e)||e<=0)return;const n=Math.floor(e/1e3),o=Number(t.xpKmAwarded||0);if(n>o){const s=n-o;s>0&&(G(s),_t(),t.xpKmAwarded=n)}const i=Math.floor(e/2500),l=Number(t.ticketChunksAwarded||0);if(i>l){const s=i-l;s>0&&(ct(s),dt(),t.ticketChunksAwarded=i)}}function pn(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return B();const n=B();n.meters=Number(n.meters||0)+e,n.chestMeters=Number(n.chestMeters||0)+e;const o=Math.floor((n.meters||0)/Ke);return o>n.steps&&(n.steps=o),un(n),ln(n),cn(n),ce(n),et(),n}function fn(){Q!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(Q),Q=null}async function Kt(t={}){const e=!!t.silent;if(!navigator.geolocation)return z={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(qe,"1")}catch{}fn(),tt=!0,z={msg:"requesting",t:Date.now()};try{return Q=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,l=Date.now(),s=B(),g=s.lastPos;s.lastPos={lat:o,lng:r,t:l},ce(s);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,c=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:p,speed:c,t:l}})),i>Ge){z={lat:o,lng:r,acc:i,t:l,reason:"accuracy",boostMs:qt()},et();return}an(o,r);let b=0,h=0,y=0,v=0,w="no-last";g&&typeof g.lat=="number"&&typeof g.lng=="number"&&typeof g.t=="number"&&(b=dn({lat:g.lat,lng:g.lng},{lat:o,lng:r}),h=Math.max(1,(l-g.t)/1e3),y=b/h,b<Ye?w="jitter":b>Xe?w="teleport":y>Ve?w="too-fast":(pn(b),v=b,w="ok")),z={lat:o,lng:r,acc:i,t:l,dist:Math.round(b),dt:Math.round(h),speed:Number.isFinite(y)?Number(y.toFixed(2)):0,added:Math.round(v),reason:w,boostMs:qt()},et()},n=>{tt=!1,z={err:n?.message||"GPS blocked",t:Date.now()},et()},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return tt=!1,z={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function gn(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>Ht()||await Kt({silent:!0}))();const e=async()=>{Ht()||await Kt({silent:!0}),window.removeEventListener("pointerdown",e),window.removeEventListener("touchstart",e),window.removeEventListener("click",e)};window.addEventListener("pointerdown",e,{once:!0}),window.addEventListener("touchstart",e,{once:!0}),window.addEventListener("click",e,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const e=t?.detail||{},n=Number(e.xp||0),o=Number(e.tickets||0),r=Number(e.cbs||0);n>0&&(G(n),_t()),(o>0||r>0)&&(o>0&&ct(o),r>0&&He(r),dt())}));function ue(){const t=at(),e=lt(),n=te(),o=ee(),r=de(),i=on(),l=o>0?Math.min(100,Math.round(n/o*100)):0;return`
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
  `}function pe(){return""}function fe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function mn(){try{const t=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>localStorage.removeItem(e))}catch{}try{const t=[];for(let e=0;e<sessionStorage.length;e++){const n=sessionStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>sessionStorage.removeItem(e))}catch{}window.location.reload()}const ge="cbsgo_player_name_v2",Et="cbsgo_player_avatar_v2";function Ct(){try{return localStorage.getItem(ge)||"Sovereign"}catch{return"Sovereign"}}function me(t){const e=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(ge,e)}catch{}return e}function be(){try{return localStorage.getItem(Et)||""}catch{return""}}function bn(t){const e=String(t||"");try{localStorage.setItem(Et,e)}catch{}return e}function yn(){try{localStorage.removeItem(Et)}catch{}}let x=null,D=null,F=null,j=null,U=null,I=null,_=null,rt=0,nt=!1,H={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const hn="48a387bba00043ac4ba5823371abc9d2",K=35,xn=6,vn=80,wn=220,Sn=6e4,kn=350,_n=.35,Mn=120;let vt=0,P=0,ot=null,wt=!1;function $(t){return document.getElementById(t)}function A(t){const e=$("cbsgoMapHost");if(!e)return;let n=$("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",e.appendChild(n)),n.textContent=t||""}function En(){const t=String(Ct()||"").trim();return t?t[0].toUpperCase():"🙂"}function Cn(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function it(t,e){const o=p=>p*Math.PI/180,r=o(e.lat-t.lat),i=o(e.lng-t.lng),l=o(t.lat),s=o(e.lat),g=Math.sin(r/2)**2+Math.cos(l)*Math.cos(s)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(g))}function ye(t,e,n){const o=e+Math.random()*(n-e),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,l=o*Math.sin(r)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+i,lng:t.lng+l}}function Ln(t,e){const n=p=>p*Math.PI/180,o=n(t.lat),r=n(e.lat),i=n(e.lng-t.lng),l=Math.sin(i)*Math.cos(r),s=Math.cos(o)*Math.sin(r)-Math.sin(o)*Math.cos(r)*Math.cos(i);let g=Math.atan2(l,s);return g=g*180/Math.PI,g=(g+360)%360,g}function Nn(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function he(){const{temp:t,iconEmoji:e}=H;return t==null?"⛅ …°":`${e} ${Math.round(t)}°`}function xe(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;Nn();const{condition:e,isNight:n}=H;t.style.background=n?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let o="";if(e==="rain"||e==="storm"){const i=[];for(let l=0;l<48;l++){const s=Math.random()*100,g=Math.random()*16-8,p=Math.random()*2.5,c=2+Math.random()*1.5;i.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${s}%;
            --xEnd:${s+g}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${c}s;
          "
        ></div>
      `)}o=i.join("")}else if(e==="snow"){const i=[];for(let l=0;l<42;l++){const s=Math.random()*100,g=Math.random()*20-10,p=Math.random()*4,c=6+Math.random()*4;i.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${s}%;
            --xEnd:${s+g}%;
            left:0;
            animation-delay:${p}s;
            animation-duration:${c}s;
          "
        ></div>
      `)}o=i.join("")}else o="";t.innerHTML=o}async function zn(t,e){const n=Date.now();if(!(H.lastUpdated&&n-H.lastUpdated<300*1e3))try{const o=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${e}&appid=${hn}&units=metric`,r=await fetch(o);if(!r.ok)throw new Error("HTTP "+r.status);const i=await r.json(),l=i?.main?.temp,s=i?.weather?.[0]?.icon||"01d",g=String(i?.weather?.[0]?.main||"").toLowerCase();let p="⛅",c="clear";s.startsWith("01")?(p="☀️",c="clear"):s.startsWith("02")?(p="🌤️",c="clear"):s.startsWith("03")||s.startsWith("04")?(p="☁️",c="clouds"):s.startsWith("09")||s.startsWith("10")?(p="🌧️",c="rain"):s.startsWith("11")?(p="⛈️",c="storm"):s.startsWith("13")?(p="❄️",c="snow"):s.startsWith("50")&&(p="🌫️",c="mist"),g.includes("rain")&&(c="rain"),g.includes("snow")&&(c="snow"),g.includes("thunder")&&(c="storm");let b=!1;try{const y=Number(i?.dt||0),v=Number(i?.timezone||0);if(y&&Number.isFinite(v)){const Y=((y+v)/3600%24+24)%24;b=Y<7||Y>=19}}catch{b=!1}H={temp:l,iconEmoji:p,condition:c,isNight:b,lastUpdated:n};const h=document.getElementById("cbsgoWeatherLabel");h&&(h.textContent=he()),xe()}catch(o){console.warn("Weather fetch failed",o)}}function In(t){const e=be();if(e){const r=`
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
    ">${Cn(En())}</div>
  `;return t.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function Gt(t,e){const n=`
    <div style="
      width:28px;
      height:28px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:18px;
      filter:drop-shadow(0 2px 3px rgba(0,0,0,.8));
      /* Eerst een beetje naar boven duwen, dan roteren -> pijltje draait rond de avatar */
      transform: rotate(${e}deg) translateY(-26px);
      transform-origin:center center;
    ">
      ▲
    </div>
  `;return t.divIcon({html:n,className:"",iconSize:[28,28],iconAnchor:[14,14]})}function Pn(t,e){let n="⭐";e==="ticket"&&(n="🎟️"),e==="cbs"&&(n="🪙");const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function An(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function $n(){const t=Math.random();return t<.7?"xp":t<.95?"ticket":"cbs"}function Tn(t){if(t==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(t==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const e=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:e,text:`+${e} CBS Coin`}}function Bn(t){if(!x||!I||!t)return;const e=Date.now();if(e-vt<Sn||I.getLayers().length>=xn)return;const o=window.L;if(!o)return;const r=$n(),i=ye(t,vn,wn),l=Pn(o,r),s=o.marker([i.lat,i.lng],{icon:l});s.on("click",()=>{if(!_){alert("GPS not ready yet. Wait until your player marker appears.");return}const g={lat:_[0],lng:_[1]},p={lat:i.lat,lng:i.lng},c=it(g,p);if(c>K){alert(`Too far to open this gift.

Distance: ${Math.round(c)}m
Needed: ≤ ${K}m`);return}I.removeLayer(s);const b=Tn(r),h=`You found a gift!

Reward: ${b.text}`;alert(h);const y={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:y}))}catch{}}),s.addTo(I),vt=e}function Rn(t){if(!x||!U||!t||ot)return;const e=window.L;if(!e)return;if(wt){if(P<kn||Math.random()>_n)return;P=0}else{if(P<Mn)return;P=0,wt=!0}const n=ye(t,60,140),o=An(e),r=e.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!_){alert("GPS not ready yet. Wait until your player marker appears.");return}const i={lat:_[0],lng:_[1]},l={lat:n.lat,lng:n.lng},s=it(i,l);if(s>K){alert(`Too far to start this puzzle.

Distance: ${Math.round(s)}m
Needed: ≤ ${K}m`);return}U.removeLayer(r),ot=null,xt({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(U),ot=r}function On(t){const e=window.L;if(!e||!x||!t)return;const n=K;j?(j.setLatLng(t),j.setRadius(n)):j=e.circle(t,{radius:n,color:"#38bdf8",weight:1,opacity:.9,fillColor:"#38bdf8",fillOpacity:.12,dashArray:"4 6"}).addTo(x)}function Wn(t){const e=window.L;if(!e||!x)return;const n=In(e);D?(D.setIcon(n),D.setLatLng(t)):(D=e.marker(t,{icon:n}).addTo(x),x.setView(t,19)),F?(F.setIcon(Gt(e,rt)),F.setLatLng(t)):F=e.marker(t,{icon:Gt(e,rt),interactive:!1}).addTo(x),On(t)}function Dn(){return`
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
        <span id="cbsgoWeatherLabel">${he()}</span>
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
  `}function Fn(){try{x&&x.remove()}catch{}x=null,D=null,F=null,j=null,U=null,I=null,_=null,nt=!1,vt=0,P=0,ot=null,wt=!1}function jn(){const t=window.L,e=$("cbsgoMap");if(!t||!e)return!1;Fn();const n=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));return x=t.map(e,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(x),x.setMaxBounds(n),x.setView([51.687,4.87],16),U=t.layerGroup().addTo(x),I=t.layerGroup().addTo(x),!0}function Un(){!navigator.geolocation||!x||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:e,longitude:n,accuracy:o,heading:r}=t.coords,i={lat:e,lng:n},l=_?{lat:_[0],lng:_[1]}:null;if(_=[e,n],Number.isFinite(r))rt=r;else if(l){const s=it(l,i);Number.isFinite(s)&&s>2&&(rt=Ln(l,i))}if(Wn([e,n]),l){const s=it(l,i);Number.isFinite(s)&&s>1&&(P+=s)}Rn(i),Bn(i),zn(e,n),A(`GPS OK • accuracy ~${Math.round(o)}m`)},t=>{A(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Hn(){let t=0;const e=120,n=()=>{if(t++,!$("cbsgoMap"))return t<e?setTimeout(n,100):void 0;if(!window.L){if(A("Loading map engine…"),t<e)return setTimeout(n,100);A("Map engine failed to load (Leaflet not found). Refresh.");return}if(!jn()){A("Could not init map. Refresh.");return}const r=$("cbsgoCenterBtn");r&&(r.onclick=()=>{x&&_&&x.setView(_,19)});const i=$("cbsgoCompassBtn");i&&(i.onclick=()=>{x&&(nt=!nt,nt?x.setView([51.687,4.87],3):_&&x.setView(_,16))}),xe(),A("Loading GPS…"),Un()};n()}const Lt="cbsgo_wallet_v2",ut="cbsgo_wallet_unlocked_v2";function pt(){try{const t=localStorage.getItem(Lt);if(!t)return null;const e=JSON.parse(t);return!e||typeof e!="object"||!e.pk||!e.pin?null:{pk:String(e.pk),pin:String(e.pin)}}catch(t){return console.warn("CBS GO: failed to load wallet from localStorage",t),null}}function qn(t){localStorage.setItem(Lt,JSON.stringify({pk:String(t.pk),pin:String(t.pin)}))}function Kn(){const t="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";let e="CBS";for(let n=0;n<36;n+=1){const o=Math.floor(Math.random()*t.length);e+=t[o]}return e}function ve(){return!!pt()}function Gn(){return pt()?sessionStorage.getItem(ut)==="1":!1}function Yn(t){const e=String(t||"");if(e.length<4)throw new Error("PIN too short");pt()&&console.warn("CBS GO: overwriting existing wallet");const o=Kn();return qn({pk:o,pin:e}),sessionStorage.setItem(ut,"1"),o}function Xn(t){const e=pt();if(!e)throw new Error("No wallet");if(String(t||"")!==e.pin)throw new Error("Incorrect PIN");return sessionStorage.setItem(ut,"1"),e.pk}function Vn(){localStorage.removeItem(Lt),sessionStorage.removeItem(ut)}typeof window<"u"&&(window.cbsgoDevResetWallet=Vn);const we="cbsgoLoginModal";function Se(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ke(){const t=document.getElementById(we);t&&t.remove()}function Zn(t){ke();const e=document.createElement("div");return e.id=we,e.style.position="fixed",e.style.inset="0",e.style.zIndex="999999",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="16px",e.style.background="rgba(0,0,0,.70)",e.style.backdropFilter="blur(12px)",e.innerHTML=t,document.body.appendChild(e),e}function Jn(t,e){return`
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
      ">${Se(t)}</div>

      <div style="padding:14px 16px;">
        ${e}
      </div>
    </div>
  `}function J(){return`
    width:100%;
    padding:12px 12px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);
    color:#fff;
    outline:none;
    font-size:14px;
  `}function Yt(t=!0){return`
    width:100%;
    padding:12px 14px;
    border-radius:16px;
    border:1px solid rgba(255,255,255,.14);
    background:${t?"rgba(90,200,255,.22)":"rgba(255,255,255,.08)"};
    color:#fff;
    font-weight:900;
    cursor:pointer;
  `}function Qn(){const t=!ve(),e=Ct()||"",n=t?`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Create your CBS-GO wallet now. It will be saved on this device (encrypted).
        <br/>If you lose the PIN or clear browser data, the wallet is gone.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Nickname</div>
        <input id="cbsgoNick" maxlength="24" value="${Se(e)}" style="${J()}" placeholder="Kevin" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Choose PIN (min 4)</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${J()}" placeholder="••••" />
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">Repeat PIN</div>
        <input id="cbsgoPin2" inputmode="numeric" type="password" style="${J()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px;">
        <button id="cbsgoCreateBtn" type="button" style="${Yt(!0)}">Create Wallet & Start</button>
      </div>
    `:`
      <div style="opacity:.85; font-size:13px; line-height:1.35;">
        Enter your PIN to unlock your local wallet.
      </div>

      <div style="margin-top:12px;">
        <div style="font-size:12px; opacity:.8; margin-bottom:6px;">PIN</div>
        <input id="cbsgoPin" inputmode="numeric" type="password" style="${J()}" placeholder="••••" />
      </div>

      <div id="cbsgoLoginMsg" style="margin-top:10px; font-size:13px; opacity:.9;"></div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="cbsgoUnlockBtn" type="button" style="${Yt(!0)}">Unlock</button>
      </div>
    `,o=Zn(Jn(t?"Welcome to CBS-GO":"Unlock Wallet",n)),r=o.querySelector("#cbsgoLoginMsg"),i=c=>{r&&(r.textContent=c||"")},l=o.querySelector("#cbsgoPin"),s=o.querySelector("#cbsgoPin2"),g=o.querySelector("#cbsgoNick"),p=()=>{ke(),window.dispatchEvent(new CustomEvent("cbsgo:loginDone",{detail:{}}))};if(t){const c=o.querySelector("#cbsgoCreateBtn");c&&(c.onclick=async()=>{try{const b=String(g?.value||"").trim(),h=String(l?.value||"").trim(),y=String(s?.value||"").trim();if(b.length<2)return i("⛔ Nickname too short.");if(h.length<4)return i("⛔ PIN must be at least 4 digits.");if(h!==y)return i("⛔ PINs do not match.");i("Creating wallet…"),me(b),await Yn(h),i("✅ Wallet created. Starting…"),p()}catch(b){i(`⛔ ${String(b?.message||b)}`)}})}else{const c=o.querySelector("#cbsgoUnlockBtn");c&&(c.onclick=async()=>{try{const b=String(l?.value||"").trim();if(b.length<4)return i("⛔ PIN must be at least 4 digits.");i("Unlocking…"),await Xn(b),i("✅ Unlocked."),p()}catch{i("⛔ Wrong PIN (or wallet data missing).")}})}}function _e(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function to(t,e=30){const n=t?`background-image:url('${t}');`:"";return`
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
  `}function ft(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function St(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function Xt(t,e){return`
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
          <div style="font-weight:900; font-size:15px;">${_e(t)}</div>
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
  `}function eo(){const t=Ct(),e=be();return`
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
        ${to(e,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${_e(t)}" maxlength="24" style="
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
  `}function no(){const t=document.querySelector("#profileName"),e=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=l=>{const s=document.querySelector("#profileMsg");s&&(s.textContent=l||"")};t&&r(t.value?`✅ Profile loaded: ${t.value}`:"");const i=()=>{if(!t)return;const l=me(t.value);r(`✅ Name saved: ${l}`)};t&&(t.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),t.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),e&&e.addEventListener("change",()=>{const l=e.files&&e.files[0];if(!l)return;if(l.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),e.value="";return}r("Uploading photo…");const s=new FileReader;s.onload=()=>{bn(String(s.result||"")),r("✅ Photo saved"),R()},s.onerror=()=>r("⛔ Failed to read image."),s.readAsDataURL(l)}),n&&(n.onclick=()=>{yn(),r("✅ Photo removed"),R()})}function oo(){const t=je(),e=Ue();return`
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
  `}function Me(){const t=ft();return t==="profile"?Xt("Profile",`<div id="profileMount">${eo()}</div>`):t==="bag"?Xt("Bag",`<div id="bagMount">${oo()}</div>`):""}function ro(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${Dn()}
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
          ${ue()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${pe()}
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
        ${Me()}
      </div>

      ${fe()?`<button id="resetBtn" type="button" style="
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
  `}function R(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=Me(),ft()==="profile"&&no();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{St("map"),R()})}function io(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-panel"),n=ft();St(n===e?"map":e||"map"),R()})})}function Vt(){const t=document.querySelector("#app");if(t){if(t.innerHTML=ro(),io(),Hn(),gn(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const e=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=pe())};window.addEventListener("cbsgo:stepsChanged",e)}if(!window.__cbsgo_xp_rerender_listener){window.__cbsgo_xp_rerender_listener=!0;const e=()=>{const n=document.querySelector("#xpMount");n&&(n.innerHTML=ue())};["cbsgo:xpChanged","cbsgo:levelChanged","cbsgo:stepsChanged"].forEach(n=>{window.addEventListener(n,e)})}if(!window.__cbsgo_inventory_rerender_listener){window.__cbsgo_inventory_rerender_listener=!0;const e=()=>{ft()==="bag"&&R()};["cbsgo:inventoryChanged","cbsgo:bagChanged"].forEach(n=>{window.addEventListener(n,e)})}if(R(),fe()){const e=document.querySelector("#resetBtn");e&&e.addEventListener("click",mn)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",e=>{const n=e?.detail?.id;if(!n)return;if(n==="__daily__"){xt({id:"__daily__",name:"Daily Glow"});return}if(ne(n))return;const o=Te.find(r=>r.id===n);o&&xt(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",e=>{const n=e?.detail?.id;n&&$e(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>Oe);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),Ee()})}))}}function Ee(){if(!document.querySelector("#app"))return;if(ve()&&Gn()){Vt();return}Qn();const e=()=>{window.removeEventListener("cbsgo:loginDone",e),Vt()};window.addEventListener("cbsgo:loginDone",e)}function Ce(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function st(t){const e=Ce();e.textContent=String(t||""),e.style.display="block"}window.addEventListener("error",t=>{const e=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";st(`❌ Error
${t?.message||t}
${e}`)});window.addEventListener("unhandledrejection",t=>{st(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function Zt(){try{if(!document.getElementById("app")){st("❌ #app not found in index.html");return}Ee();const e=Ce();e.textContent="✅ boot ok",e.style.display="block",setTimeout(()=>{e.style.display="none"},1e3)}catch(t){st(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Zt,{once:!0}):Zt();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(e=>{console.log("[CBS GO] Service worker registered:",e.scope)}).catch(e=>{console.error("[CBS GO] Service worker registration failed:",e)})});
