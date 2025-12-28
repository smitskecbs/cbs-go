(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const pe="modulepreload",fe=function(t){return"/cbs-go/"+t},Pt={},ge=function(e,n,o){let r=Promise.resolve();if(n&&n.length>0){let f=function(p){return Promise.all(p.map(h=>Promise.resolve(h).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var c=f;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),m=a?.nonce||a?.getAttribute("nonce");r=f(n.map(p=>{if(p=fe(p),p in Pt)return;Pt[p]=!0;const h=p.endsWith(".css"),y=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${y}`))return;const b=document.createElement("link");if(b.rel=h?"stylesheet":pe,h||(b.as="script"),b.crossOrigin="",b.href=p,m&&b.setAttribute("nonce",m),document.head.appendChild(b),h)return new Promise((x,w)=>{b.addEventListener("load",x),b.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(a){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=a,window.dispatchEvent(m),!m.defaultPrevented)throw a}return r.then(a=>{for(const m of a||[])m.status==="rejected"&&i(m.reason);return e().catch(i)})},me=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],Dt="cbsgo_state_v6";function be(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function he(){return{xp:0,completed:{},updatedAt:Date.now()}}function W(){const t=localStorage.getItem(Dt);return be(t,he())}function Ft(t){t.updatedAt=Date.now(),localStorage.setItem(Dt,JSON.stringify(t))}function pt(t){return 100+(Math.max(1,Number(t||1))-1)*40}function et(){return Number(W().xp||0)}function nt(){const t=et();let e=1,n=t;for(;;){const o=pt(e);if(n<o||(n-=o,e+=1,e>999))break}return e}function Wt(){const t=et();let e=1,n=t;for(;;){const o=pt(e);if(n<o||(n-=o,e+=1,e>999))break}return n}function jt(){return pt(nt())}function H(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return W();const n=W();return n.xp=Number(n.xp||0)+e,Ft(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:nt()}})),n}function Ht(t){const e=String(t||"");if(!e)return!1;const n=W();return!!(n.completed&&n.completed[e])}function Ut(t){const e=String(t||"");if(!e)return;const n=W();n.completed||(n.completed={}),n.completed[e]=Date.now(),Ft(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:e}}))}const ye=Object.freeze(Object.defineProperty({__proto__:null,addXp:H,completeNode:Ut,getLevel:nt,getXp:et,getXpIntoLevel:Wt,getXpNeededThisLevel:jt,isNodeCompleted:Ht},Symbol.toStringTag,{value:"Module"})),Kt="cbsgoPuzzleModal";function xe(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function st(){const t=document.getElementById(Kt);t&&t.remove()}function ct(t){st();const e=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],i=180,c=18,a=o.length,m=.01;let f=[],p=null,h=0,y=c,b=!1,x=!1,w=null;const U=t?.name||"CBS GO Puzzle",M=document.createElement("div");M.id=Kt,M.style.position="fixed",M.style.inset="0",M.style.zIndex="999999",M.style.display="flex",M.style.alignItems="center",M.style.justifyContent="center",M.style.padding="16px",M.style.background="rgba(0,0,0,.70)",M.style.backdropFilter="blur(12px)",M.style.fontFamily="system-ui, sans-serif",M.style.color="#fff",M.innerHTML=`
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
          ${xe(U)}
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
  `,document.body.appendChild(M);const rt=document.getElementById("cbsgoBoard"),ht=document.getElementById("cbsgoScore"),yt=document.getElementById("cbsgoMoves"),xt=document.getElementById("cbsgoStatus"),vt=document.getElementById("cbsgoPuzzleClose"),wt=document.getElementById("cbsgoPuzzleOk"),K=document.getElementById("cbsgoConfettiLayer");function z(d){xt&&(xt.textContent=d||"")}function le(){if(!K)return;K.style.display="block",K.innerHTML="";const d=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],l=40;for(let u=0;u<l;u++){const s=document.createElement("div"),g=6+Math.floor(Math.random()*6),S=Math.random()*100,E=Math.random()*.6,_=1+Math.random()*.6,G=Math.random()*360;s.style.position="absolute",s.style.top="-10%",s.style.left=`${S}%`,s.style.width=`${g}px`,s.style.height=`${g*2}px`,s.style.background=d[u%d.length],s.style.opacity="0.9",s.style.borderRadius="2px",s.style.transform=`rotate(${G}deg)`,s.style.animation=`cbsgoConfettiFall ${_}s ease-out ${E}s forwards`,K.appendChild(s)}}function St(){return Math.floor(Math.random()*o.length)}function ce(){f=[];for(let d=0;d<e;d++){const l=[];for(let u=0;u<n;u++)Math.random()<m?l.push(a):l.push(St());f.push(l)}}function q(d){return d===a}function C(){if(rt){rt.innerHTML="";for(let d=0;d<e;d++)for(let l=0;l<n;l++){const u=f[d][l],s=document.createElement("div");s.dataset.row=String(d),s.dataset.col=String(l),s.style.borderRadius="12px",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.cursor=x?"default":"pointer",s.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",s.style.fontSize="20px",q(u)?(s.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",s.textContent="💥"):(s.style.background=o[u]||"#444",s.textContent=r[u]||"⬛"),p&&p.row===d&&p.col===l&&(s.style.outline="2px solid #fff",s.style.outlineOffset="2px"),s.addEventListener("click",()=>{zt(d,l)}),s.addEventListener("touchstart",g=>{if(x)return;const S=g.touches[0];w={row:d,col:l,x:S.clientX,y:S.clientY}}),s.addEventListener("touchend",g=>{if(!w||x)return;const S=g.changedTouches[0],E=S.clientX-w.x,_=S.clientY-w.y;if(Math.sqrt(E*E+_*_)<18){zt(d,l),w=null;return}let L=w.row,O=w.col;Math.abs(E)>Math.abs(_)?E>0?O+=1:O-=1:_>0?L+=1:L-=1,L>=0&&L<e&&O>=0&&O<n&&Lt(w.row,w.col,L,O),w=null,g.preventDefault()}),rt.appendChild(s)}}}function _t(d,l){if(!d||!l)return!1;const u=Math.abs(d.row-l.row),s=Math.abs(d.col-l.col);return u+s===1}function kt(d,l){const u=f[d.row][d.col];f[d.row][d.col]=f[l.row][l.col],f[l.row][l.col]=u}function Mt(){const d=new Set;for(let l=0;l<e;l++){let u=f[l][0],s=0;for(let g=1;g<=n;g++){const S=g<n?f[l][g]:null;if(S===u)continue;const E=g-s;if(u!=null&&E>=3)for(let _=s;_<g;_++)d.add(`${l},${_}`);u=S,s=g}}for(let l=0;l<n;l++){let u=f[0][l],s=0;for(let g=1;g<=e;g++){const S=g<e?f[g][l]:null;if(S===u)continue;const E=g-s;if(u!=null&&E>=3)for(let _=s;_<g;_++)d.add(`${_},${l}`);u=S,s=g}}return d}function Et(d){if(!d||!d.size)return 0;const l=d.size;h+=l*4,ht&&(ht.textContent=String(h)),!x&&h>=i&&it(!0);for(const u of d){const[s,g]=u.split(","),S=Number(s),E=Number(g);f[S][E]=null}for(let u=0;u<n;u++){let s=e-1;for(let g=e-1;g>=0;g--)f[g][u]!=null&&(f[s][u]=f[g][u],s--);for(let g=s;g>=0;g--)Math.random()<m?f[g][u]=a:f[g][u]=St()}return l}function de(d,l){const u=new Set;for(let s=0;s<n;s++)u.add(`${d},${s}`);for(let s=0;s<e;s++)u.add(`${s},${l}`);Et(u),C(),x||setTimeout(()=>Ct(!1),120)}function Ct(d=!1){if(x)return;b=!0;const l=()=>{if(x){b=!0;return}const u=Mt();if(!u.size){b=!1,C(),d&&!x&&(y<=0?B():z("Nice! Keep matching."));return}Et(u),C(),setTimeout(l,120)};l()}function it(d){if(!x)if(x=!0,b=!0,d){z("Great job! Puzzle completed 🎉");try{t?.id&&Ut(t.id),H(10)}catch{}le(),setTimeout(()=>{st()},1600)}else z("Out of moves. Try again next time 🙂")}function B(){h>=i?it(!0):y<=0&&it(!1)}function Lt(d,l,u,s){if(b||x)return;if(y<=0){B();return}const g={row:d,col:l},S={row:u,col:s};if(!_t(g,S))return;const E=f[d][l],_=f[u][s],G=q(E)||q(_);if(kt(g,S),p=null,y--,yt&&(yt.textContent=String(y)),G){C();const L=q(f[d][l])?{row:d,col:l}:{row:u,col:s};de(L.row,L.col),B();return}if(!Mt().size){kt(g,S),C(),z("No match… try another swap."),B();return}z(""),C(),Ct(!0)}function zt(d,l){if(b||x)return;if(y<=0){B();return}const u={row:d,col:l};if(!p){p=u,C();return}if(p.row===d&&p.col===l){p=null,C();return}if(!_t(p,u)){p=u,C();return}Lt(p.row,p.col,u.row,u.col)}function Nt(){st()}vt&&(vt.onclick=Nt),wt&&(wt.onclick=()=>{Nt()}),ce(),C(),z("Tap or swipe two neighboring tiles to swap them.")}const qt="cbsgo_inventory_v1";function ve(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function we(){return{tickets:0,cbs:0}}function T(){const t=localStorage.getItem(qt),e=ve(t,we());return typeof e.tickets!="number"&&(e.tickets=0),typeof e.cbs!="number"&&(e.cbs=0),e}function Gt(t){const e={tickets:Number(t.tickets||0),cbs:Number(t.cbs||0)};localStorage.setItem(qt,JSON.stringify(e))}function Se(){return Number(T().tickets||0)}function _e(){return Number(T().cbs||0)}function ot(t=1){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return T();const n=T();return n.tickets=Number(n.tickets||0)+e,Gt(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function ke(t=1){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return T();const n=T();return n.cbs=Number(n.cbs||0)+e,Gt(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const Xt="cbsgo_steps_v6",Me="cbsgo_gps_autostart_v2",Yt="cbsgo_daily_puzzle_v1",Ee=.75,Ce=200,Le=.3,ze=400,Ne=20,at=1500,lt=200,Pe=.25,Ae=.05,Ie=.3;let X=null,Y=!1,N={msg:"init"};function Te(t,e){try{const n=JSON.parse(t);return n&&typeof n=="object"?n:e}catch{return e}}function $e(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function $(){const t=localStorage.getItem(Xt);return Te(t,$e())}function Vt(t){t.updatedAt=Date.now(),localStorage.setItem(Xt,JSON.stringify(t))}function V(){return Number($().steps||0)}function Be(){const t=$();return Number(t.meters||0)}function Oe(){return Be()/1e3}function At(){return!!Y}function ft(){const t=new Date,e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${o}`}function Re(){try{return localStorage.getItem(Yt)===ft()}catch{return!1}}function De(){try{localStorage.setItem(Yt,ft())}catch{}}function Fe(t,e){return Re()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:t,lng:e,date:ft()}})),De(),!0)}function It(){const t=$(),e=Number(t.boostUntil||0);return Math.max(0,e-Date.now())}function We(t){if(!Math.max(0,Number(t.boostUntil||0)-Date.now()))return;const n=Number(t.boostLastStep||0),o=Number(t.steps||0);if(!Number.isFinite(n)){t.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<at)return;const i=Math.floor(r/at);i<=0||(ot(i),t.boostLastStep=n+i*at)}function je(t){let e=Number(t.chestMeters||0);if(Number.isFinite(e)||(e=0),e<lt){t.chestMeters=e;return}let n=0;for(;e>=lt&&n<5;)if(e-=lt,n+=1,Math.random()<Pe){const o=Math.random()<Ae,r=o?10:3,i=o?2:1;H(r),ot(i);const c=o&&Math.random()<Ie;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:c}}));break}t.chestMeters=e}function He(t,e){const o=f=>f*Math.PI/180,r=o(e.lat-t.lat),i=o(e.lng-t.lng),c=o(t.lat),a=o(e.lat),m=Math.sin(r/2)**2+Math.cos(c)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(m))}function Ue(t){const e=Number(t.meters||0);if(!Number.isFinite(e)||e<=0)return;const n=Math.floor(e/1e3),o=Number(t.xpKmAwarded||0);if(n>o){const a=n-o;a>0&&(H(a),t.xpKmAwarded=n)}const i=Math.floor(e/2500),c=Number(t.ticketChunksAwarded||0);if(i>c){const a=i-c;a>0&&(ot(a),t.ticketChunksAwarded=i)}}function Ke(t){const e=Number(t||0);if(!Number.isFinite(e)||e<=0)return $();const n=$();n.meters=Number(n.meters||0)+e,n.chestMeters=Number(n.chestMeters||0)+e;const o=Math.floor((n.meters||0)/Ee);return o>n.steps&&(n.steps=o),Ue(n),We(n),je(n),Vt(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function qe(){X!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(X),X=null}async function Tt(t={}){const e=!!t.silent;if(!navigator.geolocation)return N={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Me,"1")}catch{}qe(),Y=!0,N={msg:"requesting",t:Date.now()};try{return X=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,c=Date.now(),a=$(),m=a.lastPos;a.lastPos={lat:o,lng:r,t:c},Vt(a);const f=Number.isFinite(n.coords.heading)?n.coords.heading:null,p=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:f,speed:p,t:c}})),i>Ce){N={lat:o,lng:r,acc:i,t:c,reason:"accuracy",boostMs:It()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:V()}}));return}Fe(o,r);let h=0,y=0,b=0,x=0,w="no-last";m&&typeof m.lat=="number"&&typeof m.lng=="number"&&typeof m.t=="number"&&(h=He({lat:m.lat,lng:m.lng},{lat:o,lng:r}),y=Math.max(1,(c-m.t)/1e3),b=h/y,h<Le?w="jitter":h>ze?w="teleport":b>Ne?w="too-fast":(Ke(h),x=h,w="ok")),N={lat:o,lng:r,acc:i,t:c,dist:Math.round(h),dt:Math.round(y),speed:Number(b.toFixed(2)),added:Math.round(x),reason:w,boostMs:It()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:V()}}))},n=>{Y=!1,N={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:V()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return Y=!1,N={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Ge(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>At()||await Tt({silent:!0}))();const e=async()=>{At()||await Tt({silent:!0}),window.removeEventListener("pointerdown",e),window.removeEventListener("touchstart",e),window.removeEventListener("click",e)};window.addEventListener("pointerdown",e,{once:!0}),window.addEventListener("touchstart",e,{once:!0}),window.addEventListener("click",e,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",t=>{const e=t?.detail||{},n=Number(e.xp||0),o=Number(e.tickets||0),r=Number(e.cbs||0);n>0&&H(n),o>0&&ot(o),r>0&&ke(r)}));function Xe(){const t=et(),e=nt(),n=Wt(),o=jt(),r=V(),i=Oe(),c=o>0?Math.min(100,Math.round(n/o*100)):0;return`
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
        <div>${n}/${o} XP · total ${t}</div>
        <div>${r} steps · ${i.toFixed(2)} km</div>
      </div>
    </div>
  `}function Zt(){return""}function Jt(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Ye(){try{const t=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>localStorage.removeItem(e))}catch{}try{const t=[];for(let e=0;e<sessionStorage.length;e++){const n=sessionStorage.key(e);n&&n.startsWith("cbsgo_")&&t.push(n)}t.forEach(e=>sessionStorage.removeItem(e))}catch{}window.location.reload()}const Qt="cbsgo_player_name_v2",gt="cbsgo_player_avatar_v2";function te(){try{return localStorage.getItem(Qt)||"Sovereign"}catch{return"Sovereign"}}function Ve(t){const e=String(t||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(Qt,e)}catch{}return e}function ee(){try{return localStorage.getItem(gt)||""}catch{return""}}function Ze(t){const e=String(t||"");try{localStorage.setItem(gt,e)}catch{}return e}function Je(){try{localStorage.removeItem(gt)}catch{}}let v=null,R=null,D=null,P=null,k=null,Z=!1,F={temp:null,iconEmoji:"⛅",condition:"clear",isNight:!1,lastUpdated:0};const Qe="48a387bba00043ac4ba5823371abc9d2",tn=6,en=80,nn=220,on=6e4,$t=65,Bt=70,rn=350,sn=.35;let dt=0,Q=0,J=null;function I(t){return document.getElementById(t)}function A(t){const e=I("cbsgoMapHost");if(!e)return;let n=I("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",e.appendChild(n)),n.textContent=t||""}function an(){const t=String(te()||"").trim();return t?t[0].toUpperCase():"🙂"}function ln(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function mt(t,e){const o=f=>f*Math.PI/180,r=o(e.lat-t.lat),i=o(e.lng-t.lng),c=o(t.lat),a=o(e.lat),m=Math.sin(r/2)**2+Math.cos(c)*Math.cos(a)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(m))}function cn(t){const e=ee();if(e){const r=`
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
    ">${ln(an())}</div>
  `;return t.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function dn(t){return t.divIcon({html:`
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
  `,className:"",iconSize:[46,46],iconAnchor:[23,23]})}function un(t,e){let n="⭐";e==="ticket"&&(n="🎟️"),e==="cbs"&&(n="🪙");const o=`
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
  `;return t.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function ne(){const{temp:t,iconEmoji:e}=F;return t==null?"⛅ …°":`${e} ${Math.round(t)}°`}function pn(){if(document.getElementById("cbsgoWeatherFxStyles"))return;const t=document.createElement("style");t.id="cbsgoWeatherFxStyles",t.textContent=`
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
  `,document.head.appendChild(t)}function fn(){const t=document.getElementById("cbsgoWeatherFx");if(!t)return;pn();const{condition:e,isNight:n}=F;t.style.background=n?"radial-gradient(ellipse at top, rgba(0,0,0,0.45), rgba(0,0,0,0.85))":"transparent";let o="";if(e==="rain"||e==="storm"){const i=[];for(let c=0;c<48;c++){const a=Math.random()*100,m=Math.random()*16-8,f=Math.random()*2.5,p=2+Math.random()*1.5;i.push(`
        <div
          class="cbsgoRainDrop"
          style="
            --x:${a}%;
            --xEnd:${a+m}%;
            left:0;
            animation-delay:${f}s;
            animation-duration:${p}s;
          "
        ></div>
      `)}o=i.join("")}else if(e==="snow"){const i=[];for(let c=0;c<42;c++){const a=Math.random()*100,m=Math.random()*20-10,f=Math.random()*4,p=6+Math.random()*4;i.push(`
        <div
          class="cbsgoSnowFlake"
          style="
            --x:${a}%;
            --xEnd:${a+m}%;
            left:0;
            animation-delay:${f}s;
            animation-duration:${p}s;
          "
        ></div>
      `)}o=i.join("")}else o="";t.innerHTML=o}async function gn(t,e){const n=Date.now();if(!(F.lastUpdated&&n-F.lastUpdated<300*1e3))try{const o=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${e}&appid=${Qe}&units=metric`,r=await fetch(o);if(!r.ok)throw new Error("HTTP "+r.status);const i=await r.json(),c=i?.main?.temp,a=i?.weather?.[0]?.icon||"01d",m=String(i?.weather?.[0]?.main||"").toLowerCase();let f="⛅",p="clear";a.startsWith("01")?(f="☀️",p="clear"):a.startsWith("02")?(f="🌤️",p="clear"):a.startsWith("03")||a.startsWith("04")?(f="☁️",p="clouds"):a.startsWith("09")||a.startsWith("10")?(f="🌧️",p="rain"):a.startsWith("11")?(f="⛈️",p="storm"):a.startsWith("13")?(f="❄️",p="snow"):a.startsWith("50")&&(f="🌫️",p="mist"),m.includes("rain")&&(p="rain"),m.includes("snow")&&(p="snow"),m.includes("thunder")&&(p="storm");let h=!1;try{const b=Number(i?.dt||0),x=Number(i?.timezone||0);if(b&&Number.isFinite(x)){const U=((b+x)/3600%24+24)%24;h=U<7||U>=19}}catch{h=!1}F={temp:c,iconEmoji:f,condition:p,isNight:h,lastUpdated:n};const y=document.getElementById("cbsgoWeather");if(y){const b=y.querySelector("span");b&&(b.textContent=ne())}fn()}catch(o){console.warn("Weather fetch failed",o)}}function oe(t,e,n){const o=e+Math.random()*(n-e),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,c=o*Math.sin(r)/(111111*Math.cos(t.lat*Math.PI/180));return{lat:t.lat+i,lng:t.lng+c}}function mn(){const t=Math.random();return t<.7?"xp":t<.95?"ticket":"cbs"}function bn(t){if(t==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(t==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const e=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:e,text:`+${e} CBS Coin`}}function hn(t){if(!v||!P||!t)return;const e=Date.now();if(e-dt<on||P.getLayers().length>=tn)return;const o=window.L;if(!o)return;const r=mn(),i=oe(t,en,nn),c=un(o,r),a=o.marker([i.lat,i.lng],{icon:c});a.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const m={lat:k[0],lng:k[1]},f={lat:i.lat,lng:i.lng},p=mt(m,f);if(p>$t){alert(`Too far to open this gift.

Distance: ${Math.round(p)}m
Needed: ≤ ${$t}m`);return}P.removeLayer(a);const h=bn(r),y=`You found a gift!

Reward: ${h.text}`;alert(y);const b={kind:r,...h};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:b}))}catch{}}),a.addTo(P),dt=e}function yn(t){if(!v||!D||!t||J||Q<rn||Math.random()>sn)return;Q=0;const e=window.L;if(!e)return;const n=oe(t,60,140),o=dn(e),r=e.marker([n.lat,n.lng],{icon:o});r.on("click",()=>{if(!k){alert("GPS not ready yet. Wait until your player marker appears.");return}const i={lat:k[0],lng:k[1]},c={lat:n.lat,lng:n.lng},a=mt(i,c);if(a>Bt){alert(`Too far to start this puzzle.

Distance: ${Math.round(a)}m
Needed: ≤ ${Bt}m`);return}D.removeLayer(r),J=null,ct({id:`puzzle-${Date.now()}`,name:"CBS GO Puzzle"})}),r.addTo(D),J=r}function xn(){return`
    <div id="cbsgoMapHost" style="position:relative; width:100%; height:100%;">
      <div id="cbsgoMap" style="position:absolute; inset:0;"></div>

      <!-- Weer-effect-laag over de map (regen/sneeuw + nacht-dimming) -->
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
        <span>${ne()}</span>
      </div>

      <!-- Kompas + centreer-player RECHTSONDER, groot als Profile/Bag -->
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
  `}function vn(){try{v&&(v.remove(),v=null,R=null,D=null,P=null,k=null,Z=!1,dt=0,Q=0,J=null)}catch{}}function wn(){const t=window.L,e=I("cbsgoMap");if(!t||!e)return!1;vn();const n=t.latLngBounds(t.latLng(-85,-180),t.latLng(85,180));return v=t.map(e,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(v),v.setMaxBounds(n),v.setView([51.687,4.87],16),D=t.layerGroup().addTo(v),P=t.layerGroup().addTo(v),!0}function Sn(t){const e=window.L;if(!e||!v)return;const n=cn(e);if(!R){R=e.marker(t,{icon:n}).addTo(v),v.setView(t,18);return}R.setIcon(n),R.setLatLng(t)}function _n(){!navigator.geolocation||!v||!window.L||navigator.geolocation.watchPosition(t=>{const{latitude:e,longitude:n,accuracy:o}=t.coords,r={lat:e,lng:n},i=k?{lat:k[0],lng:k[1]}:null;if(k=[e,n],Sn([e,n]),i){const c=mt(i,r);Number.isFinite(c)&&c>1&&(Q+=c)}yn(r),hn(r),gn(e,n),A(`GPS OK • accuracy ~${Math.round(o)}m`)},t=>{A(`GPS error: ${t?.message||t?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function kn(){let t=0;const e=120,n=()=>{if(t++,!I("cbsgoMap"))return t<e?setTimeout(n,100):void 0;if(!window.L){if(A("Loading map engine…"),t<e)return setTimeout(n,100);A("Map engine failed to load (Leaflet not found). Refresh.");return}if(!wn()){A("Could not init map. Refresh.");return}const r=I("cbsgoCenterBtn");r&&(r.onclick=()=>{v&&k&&v.setView(k,18)});const i=I("cbsgoCompassBtn");i&&(i.onclick=()=>{v&&(Z=!Z,Z?v.setView([51.687,4.87],3):k&&v.setView(k,16))}),A("Loading GPS…"),_n()};n()}function re(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Mn(t,e=30){const n=t?`background-image:url('${t}');`:"";return`
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
  `}function bt(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function ut(t){try{sessionStorage.setItem("cbsgo_selected_tab_v5",t)}catch{}}function Ot(t,e){return`
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
          <div style="font-weight:900; font-size:15px;">${re(t)}</div>
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
  `}function En(){const t=te(),e=ee();return`
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
        ${Mn(e,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${re(t)}" maxlength="24" style="
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
  `}function Cn(){const t=document.querySelector("#profileName"),e=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=c=>{const a=document.querySelector("#profileMsg");a&&(a.textContent=c||"")};t&&r(t.value?`✅ Profile loaded: ${t.value}`:"");const i=()=>{if(!t)return;const c=Ve(t.value);r(`✅ Name saved: ${c}`)};t&&(t.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),t.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),e&&e.addEventListener("change",()=>{const c=e.files&&e.files[0];if(!c)return;if(c.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),e.value="";return}r("Uploading photo…");const a=new FileReader;a.onload=()=>{Ze(String(a.result||"")),r("✅ Photo saved"),j()},a.onerror=()=>r("⛔ Failed to read image."),a.readAsDataURL(c)}),n&&(n.onclick=()=>{Je(),r("✅ Photo removed"),j()})}function Ln(){const t=Se(),e=_e();return`
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
  `}function ie(){const t=bt();return t==="profile"?Ot("Profile",`<div id="profileMount">${En()}</div>`):t==="bag"?Ot("Bag",`<div id="bagMount">${Ln()}</div>`):""}function zn(){return`
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
          ${Xe()}
        </div>

        <div id="stepsMount" style="pointer-events:auto;">
          ${Zt()}
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
        ${ie()}
      </div>

      ${Jt()?`<button id="resetBtn" type="button" style="
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
  `}function j(){const t=document.querySelector("#panelRoot");if(!t)return;t.innerHTML=ie(),bt()==="profile"&&Cn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{ut("map"),j()})}function Nn(){document.querySelectorAll("[data-panel]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-panel"),n=bt();ut(n===e?"map":e||"map"),j()})})}function se(){const t=document.querySelector("#app");if(t){if(t.innerHTML=zn(),Nn(),kn(),Ge(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const e=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Zt())};window.addEventListener("cbsgo:stepsChanged",e)}if(j(),Jt()){const e=document.querySelector("#resetBtn");e&&e.addEventListener("click",Ye)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",e=>{const n=e?.detail?.id;if(!n)return;if(n==="__daily__"){ct({id:"__daily__",name:"Daily Glow"});return}if(Ht(n))return;const o=me.find(r=>r.id===n);o&&ct(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",e=>{const n=e?.detail?.id;n&&ge(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>ye);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),se()})}))}}function ae(){let t=document.getElementById("cbsgoHud");return t||(t=document.createElement("div"),t.id="cbsgoHud",t.style.position="fixed",t.style.left="10px",t.style.right="10px",t.style.bottom="10px",t.style.zIndex="999999",t.style.padding="10px 12px",t.style.borderRadius="14px",t.style.border="1px solid rgba(255,255,255,.18)",t.style.background="rgba(0,0,0,.55)",t.style.backdropFilter="blur(10px)",t.style.color="#fff",t.style.fontFamily="system-ui, sans-serif",t.style.fontSize="12px",t.style.whiteSpace="pre-wrap",t.style.display="none",document.body.appendChild(t),t)}function tt(t){const e=ae();e.textContent=String(t||""),e.style.display="block"}window.addEventListener("error",t=>{const e=t?.filename?`${t.filename}:${t.lineno||0}:${t.colno||0}`:"";tt(`❌ Error
${t?.message||t}
${e}`)});window.addEventListener("unhandledrejection",t=>{tt(`❌ Unhandled promise rejection
${t?.reason?.message||t?.reason||t}`)});function Rt(){try{if(!document.getElementById("app")){tt("❌ #app not found in index.html");return}se();const e=ae();e.textContent="✅ boot ok",e.style.display="block",setTimeout(()=>{e.style.display="none"},1e3)}catch(t){tt(`❌ Boot crash
${t?.message||t}
${t?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Rt,{once:!0}):Rt();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(e=>{console.log("[CBS GO] Service worker registered:",e.scope)}).catch(e=>{console.error("[CBS GO] Service worker registration failed:",e)})});
