(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const yt="modulepreload",ht=function(e){return"/cbs-go/"+e},Ie={},xt=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let p=function(f){return Promise.all(f.map(b=>Promise.resolve(b).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var u=p;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),m=d?.nonce||d?.getAttribute("nonce");r=p(n.map(f=>{if(f=ht(f),f in Ie)return;Ie[f]=!0;const b=f.endsWith(".css"),h=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${h}`))return;const y=document.createElement("link");if(y.rel=b?"stylesheet":yt,b||(y.as="script"),y.crossOrigin="",y.href=f,m&&y.setAttribute("nonce",m),document.head.appendChild(y),b)return new Promise((x,v)=>{y.addEventListener("load",x),y.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(d){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=d,window.dispatchEvent(m),!m.defaultPrevented)throw d}return r.then(d=>{for(const m of d||[])m.status==="rejected"&&i(m.reason);return t().catch(i)})},Re=[{id:"node-1",type:"puzzle",name:"Signal vs Noise",description:"Logic puzzle (2 min).",xp:60,puzzle:{type:"mcq",q:`A scammer always lies. A builder always tells the truth.

You meet two people. One says: “We are both scammers.”
What are they?`,options:["Both scammers","Both builders","One scammer + one builder","Impossible to know"],answerIndex:2,explain:"If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder."}},{id:"node-2",type:"puzzle",name:"Riddle: The Key",description:"Short riddle (1 min).",xp:40,puzzle:{type:"input",q:`I have keys but no locks.
I have space but no rooms.
You can enter, but you can’t go outside.
What am I?`,answers:["keyboard","a keyboard"],explain:"A keyboard has keys, a space bar, and an enter key."}},{id:"node-3",type:"puzzle",name:"Mini Cipher",description:"Decode it (2–3 min).",xp:80,puzzle:{type:"code",q:`Decode this Caesar shift (+1):

DBT

(Each letter is shifted +1 from the original.)`,hint:"Try shifting letters back by 1.",code:"CAS",explain:"DBT shifted back by 1 → CAS."}},{id:"node-4",type:"puzzle",name:"Steps Math",description:"Quick math check.",xp:50,puzzle:{type:"input",q:"If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)",answers:["2500"],explain:"2000m / 0.8m ≈ 2500 steps."}},{id:"node-5",type:"puzzle",name:"CBS Motto",description:"Community memory.",xp:30,puzzle:{type:"code",q:"Type the CBS motto (3 words):",hint:"C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _",code:"COMMUNITY BUILDS SOVEREIGNTY",explain:"CBS = Community Builds Sovereignty."}}],je="cbsgo_state_v6";function vt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function wt(){return{xp:0,completed:{},updatedAt:Date.now()}}function K(){const e=localStorage.getItem(je);return vt(e,wt())}function Fe(e){e.updatedAt=Date.now(),localStorage.setItem(je,JSON.stringify(e))}function Ke(e){return 100+(Math.max(1,Number(e||1))-1)*40}function te(){return Number(K().xp||0)}function de(){const e=te();let t=1,n=e;for(;;){const o=Ke(t);if(n<o||(n-=o,t+=1,t>999))break}return t}function He(){const e=te();let t=1,n=e;for(;;){const o=Ke(t);if(n<o||(n-=o,t+=1,t>999))break}return n}function G(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return K();const n=K();return n.xp=Number(n.xp||0)+t,Fe(n),window.dispatchEvent(new CustomEvent("cbsgo:xpChanged",{detail:{xp:n.xp,level:de()}})),n}function ue(e){const t=String(e||"");if(!t)return!1;const n=K();return!!(n.completed&&n.completed[t])}function qe(e){const t=String(e||"");if(!t)return;const n=K();n.completed||(n.completed={}),n.completed[t]=Date.now(),Fe(n),window.dispatchEvent(new CustomEvent("cbsgo:nodeCompleted",{detail:{id:t}}))}const _t=Object.freeze(Object.defineProperty({__proto__:null,addXp:G,completeNode:qe,getLevel:de,getXp:te,getXpIntoLevel:He,isNodeCompleted:ue},Symbol.toStringTag,{value:"Module"})),Ge="cbsgoPuzzleModal";function St(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function re(){const e=document.getElementById(Ge);e&&e.remove()}function Q(e){re();const t=6,n=6,o=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7"],r=["🍬","💎","⭐","🍀","🔮"],i=180,u=18,d=o.length,m=.01;let p=[],f=null,b=0,h=u,y=!1,x=!1,v=null;const N=e?.name||"CBS GO Puzzle",S=document.createElement("div");S.id=Ge,S.style.position="fixed",S.style.inset="0",S.style.zIndex="999999",S.style.display="flex",S.style.alignItems="center",S.style.justifyContent="center",S.style.padding="16px",S.style.background="rgba(0,0,0,.70)",S.style.backdropFilter="blur(12px)",S.style.fontFamily="system-ui, sans-serif",S.style.color="#fff",S.innerHTML=`
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
          ${St(N)}
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
          <div>Moves left: <span id="cbsgoMoves">${u}</span></div>
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
  `,document.body.appendChild(S);const D=document.getElementById("cbsgoBoard"),ye=document.getElementById("cbsgoScore"),he=document.getElementById("cbsgoMoves"),xe=document.getElementById("cbsgoStatus"),ve=document.getElementById("cbsgoPuzzleClose"),we=document.getElementById("cbsgoPuzzleOk"),U=document.getElementById("cbsgoConfettiLayer");function A(c){xe&&(xe.textContent=c||"")}function ft(){if(!U)return;U.style.display="block",U.innerHTML="";const c=["#f97373","#facc15","#4ade80","#60a5fa","#a855f7","#ffffff"],a=40;for(let l=0;l<a;l++){const s=document.createElement("div"),g=6+Math.floor(Math.random()*6),_=Math.random()*100,M=Math.random()*.6,k=1+Math.random()*.6,W=Math.random()*360;s.style.position="absolute",s.style.top="-10%",s.style.left=`${_}%`,s.style.width=`${g}px`,s.style.height=`${g*2}px`,s.style.background=c[l%c.length],s.style.opacity="0.9",s.style.borderRadius="2px",s.style.transform=`rotate(${W}deg)`,s.style.animation=`cbsgoConfettiFall ${k}s ease-out ${M}s forwards`,U.appendChild(s)}}function _e(){return Math.floor(Math.random()*o.length)}function gt(){p=[];for(let c=0;c<t;c++){const a=[];for(let l=0;l<n;l++)Math.random()<m?a.push(d):a.push(_e());p.push(a)}}function Y(c){return c===d}function E(){if(D){D.innerHTML="";for(let c=0;c<t;c++)for(let a=0;a<n;a++){const l=p[c][a],s=document.createElement("div");s.dataset.row=String(c),s.dataset.col=String(a),s.style.borderRadius="12px",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.cursor=x?"default":"pointer",s.style.boxShadow="0 0 0 1px rgba(0,0,0,.18) inset",s.style.fontSize="20px",Y(l)?(s.style.background="radial-gradient(circle at 30% 30%, #f97373, #a855f7)",s.textContent="💥"):(s.style.background=o[l]||"#444",s.textContent=r[l]||"⬛"),f&&f.row===c&&f.col===a&&(s.style.outline="2px solid #fff",s.style.outlineOffset="2px"),s.addEventListener("click",()=>{Ne(c,a)}),s.addEventListener("touchstart",g=>{if(x)return;const _=g.touches[0];v={row:c,col:a,x:_.clientX,y:_.clientY}}),s.addEventListener("touchend",g=>{if(!v||x)return;const _=g.changedTouches[0],M=_.clientX-v.x,k=_.clientY-v.y;if(Math.sqrt(M*M+k*k)<18){Ne(c,a),v=null;return}let z=v.row,j=v.col;Math.abs(M)>Math.abs(k)?M>0?j+=1:j-=1:k>0?z+=1:z-=1,z>=0&&z<t&&j>=0&&j<n&&Ce(v.row,v.col,z,j),v=null,g.preventDefault()}),D.appendChild(s)}}}function Se(c,a){if(!c||!a)return!1;const l=Math.abs(c.row-a.row),s=Math.abs(c.col-a.col);return l+s===1}function ke(c,a){const l=p[c.row][c.col];p[c.row][c.col]=p[a.row][a.col],p[a.row][a.col]=l}function Me(){const c=new Set;for(let a=0;a<t;a++){let l=p[a][0],s=0;for(let g=1;g<=n;g++){const _=g<n?p[a][g]:null;if(_===l)continue;const M=g-s;if(l!=null&&M>=3)for(let k=s;k<g;k++)c.add(`${a},${k}`);l=_,s=g}}for(let a=0;a<n;a++){let l=p[0][a],s=0;for(let g=1;g<=t;g++){const _=g<t?p[g][a]:null;if(_===l)continue;const M=g-s;if(l!=null&&M>=3)for(let k=s;k<g;k++)c.add(`${k},${a}`);l=_,s=g}}return c}function Ee(c){if(!c||!c.size)return 0;const a=c.size;b+=a*4,ye&&(ye.textContent=String(b)),!x&&b>=i&&oe(!0);for(const l of c){const[s,g]=l.split(","),_=Number(s),M=Number(g);p[_][M]=null}for(let l=0;l<n;l++){let s=t-1;for(let g=t-1;g>=0;g--)p[g][l]!=null&&(p[s][l]=p[g][l],s--);for(let g=s;g>=0;g--)Math.random()<m?p[g][l]=d:p[g][l]=_e()}return a}function bt(c,a){const l=new Set;for(let s=0;s<n;s++)l.add(`${c},${s}`);for(let s=0;s<t;s++)l.add(`${s},${a}`);Ee(l),E(),x||setTimeout(()=>Le(!1),120)}function Le(c=!1){if(x)return;y=!0;const a=()=>{if(x){y=!0;return}const l=Me();if(!l.size){y=!1,E(),c&&!x&&(h<=0?R():A("Nice! Keep matching."));return}Ee(l),E(),setTimeout(a,120)};a()}function oe(c){if(!x)if(x=!0,y=!0,c){A("Great job! Puzzle completed 🎉");try{e?.id&&qe(e.id),G(10)}catch{}ft(),setTimeout(()=>{re()},1600)}else A("Out of moves. Try again next time 🙂")}function R(){b>=i?oe(!0):h<=0&&oe(!1)}function Ce(c,a,l,s){if(y||x)return;if(h<=0){R();return}const g={row:c,col:a},_={row:l,col:s};if(!Se(g,_))return;const M=p[c][a],k=p[l][s],W=Y(M)||Y(k);if(ke(g,_),f=null,h--,he&&(he.textContent=String(h)),W){E();const z=Y(p[c][a])?{row:c,col:a}:{row:l,col:s};bt(z.row,z.col),R();return}if(!Me().size){ke(g,_),E(),A("No match… try another swap."),R();return}A(""),E(),Le(!0)}function Ne(c,a){if(y||x)return;if(h<=0){R();return}const l={row:c,col:a};if(!f){f=l,E();return}if(f.row===c&&f.col===a){f=null,E();return}if(!Se(f,l)){f=l,E();return}Ce(f.row,f.col,l.row,l.col)}function ze(){re()}ve&&(ve.onclick=ze),we&&(we.onclick=()=>{ze()}),gt(),E(),A("Tap or swipe two neighboring tiles to swap them.")}const Ue="cbsgo_inventory_v1";function kt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Mt(){return{tickets:0,cbs:0}}function O(){const e=localStorage.getItem(Ue),t=kt(e,Mt());return typeof t.tickets!="number"&&(t.tickets=0),typeof t.cbs!="number"&&(t.cbs=0),t}function Ye(e){const t={tickets:Number(e.tickets||0),cbs:Number(e.cbs||0)};localStorage.setItem(Ue,JSON.stringify(t))}function Et(){return Number(O().tickets||0)}function Lt(){return Number(O().cbs||0)}function ne(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.tickets=Number(n.tickets||0)+t,Ye(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}function Ct(e=1){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return O();const n=O();return n.cbs=Number(n.cbs||0)+t,Ye(n),window.dispatchEvent(new CustomEvent("cbsgo:inventoryChanged",{detail:{...n}})),n}const We="cbsgo_steps_v6",Nt="cbsgo_gps_autostart_v2",Xe="cbsgo_daily_puzzle_v1",zt=.75,It=200,At=.3,Pt=400,Tt=20,ie=1500,se=200,$t=.25,Bt=.05,Ot=.3;let X=null,V=!1,P={msg:"init"};function Dt(e,t){try{const n=JSON.parse(e);return n&&typeof n=="object"?n:t}catch{return t}}function Rt(){return{steps:0,meters:0,lastPos:null,rewarded5k:!1,rewarded10k:!1,boostUntil:0,boostLastStep:0,chestMeters:0,xpKmAwarded:0,ticketChunksAwarded:0,updatedAt:Date.now()}}function H(){const e=localStorage.getItem(We);return Dt(e,Rt())}function Ve(e){e.updatedAt=Date.now(),localStorage.setItem(We,JSON.stringify(e))}function J(){return Number(H().steps||0)}function Ae(){return!!V}function pe(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${o}`}function jt(){try{return localStorage.getItem(Xe)===pe()}catch{return!1}}function Ft(){try{localStorage.setItem(Xe,pe())}catch{}}function Kt(e,t){return jt()?!1:(window.dispatchEvent(new CustomEvent("cbsgo:dailyPuzzle",{detail:{lat:e,lng:t,date:pe()}})),Ft(),!0)}function Pe(){const e=H(),t=Number(e.boostUntil||0);return Math.max(0,t-Date.now())}function Ht(e){if(!Math.max(0,Number(e.boostUntil||0)-Date.now()))return;const n=Number(e.boostLastStep||0),o=Number(e.steps||0);if(!Number.isFinite(n)){e.boostLastStep=o;return}const r=o-n;if(!Number.isFinite(r)||r<ie)return;const i=Math.floor(r/ie);i<=0||(ne(i),e.boostLastStep=n+i*ie)}function qt(e){let t=Number(e.chestMeters||0);if(Number.isFinite(t)||(t=0),t<se){e.chestMeters=t;return}let n=0;for(;t>=se&&n<5;)if(t-=se,n+=1,Math.random()<$t){const o=Math.random()<Bt,r=o?10:3,i=o?2:1;G(r),ne(i);const u=o&&Math.random()<Ot;window.dispatchEvent(new CustomEvent("cbsgo:treasureFound",{detail:{xp:r,tickets:i,rare:o,hasCBSFlag:u}}));break}e.chestMeters=t}function Gt(e,t){const o=p=>p*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),u=o(e.lat),d=o(t.lat),m=Math.sin(r/2)**2+Math.cos(u)*Math.cos(d)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(m))}function Ut(e){const t=Number(e.meters||0);if(!Number.isFinite(t)||t<=0)return;const n=Math.floor(t/1e3),o=Number(e.xpKmAwarded||0);if(n>o){const d=n-o;d>0&&(G(d),e.xpKmAwarded=n)}const i=Math.floor(t/2500),u=Number(e.ticketChunksAwarded||0);if(i>u){const d=i-u;d>0&&(ne(d),e.ticketChunksAwarded=i)}}function Yt(e){const t=Number(e||0);if(!Number.isFinite(t)||t<=0)return H();const n=H();n.meters=Number(n.meters||0)+t,n.chestMeters=Number(n.chestMeters||0)+t;const o=Math.floor((n.meters||0)/zt);return o>n.steps&&(n.steps=o),Ut(n),Ht(n),qt(n),Ve(n),window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:n.steps}})),n}function Wt(){X!=null&&navigator.geolocation&&navigator.geolocation.clearWatch(X),X=null}async function Te(e={}){const t=!!e.silent;if(!navigator.geolocation)return P={err:"GPS not supported",t:Date.now()},{ok:!1,reason:"GPS not supported"};try{localStorage.setItem(Nt,"1")}catch{}Wt(),V=!0,P={msg:"requesting",t:Date.now()};try{return X=navigator.geolocation.watchPosition(n=>{const o=n.coords.latitude,r=n.coords.longitude,i=n.coords.accuracy||999,u=Date.now(),d=H(),m=d.lastPos;d.lastPos={lat:o,lng:r,t:u},Ve(d);const p=Number.isFinite(n.coords.heading)?n.coords.heading:null,f=Number.isFinite(n.coords.speed)?n.coords.speed:null;if(window.dispatchEvent(new CustomEvent("cbsgo:playerPos",{detail:{lat:o,lng:r,acc:i,heading:p,speed:f,t:u}})),i>It){P={lat:o,lng:r,acc:i,t:u,reason:"accuracy",boostMs:Pe()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:J()}}));return}Kt(o,r);let b=0,h=0,y=0,x=0,v="no-last";m&&typeof m.lat=="number"&&typeof m.lng=="number"&&typeof m.t=="number"&&(b=Gt({lat:m.lat,lng:m.lng},{lat:o,lng:r}),h=Math.max(1,(u-m.t)/1e3),y=b/h,b<At?v="jitter":b>Pt?v="teleport":y>Tt?v="too-fast":(Yt(b),x=b,v="ok")),P={lat:o,lng:r,acc:i,t:u,dist:Math.round(b),dt:Math.round(h),speed:Number(y.toFixed(2)),added:Math.round(x),reason:v,boostMs:Pe()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:J()}}))},n=>{V=!1,P={err:n?.message||"GPS blocked",t:Date.now()},window.dispatchEvent(new CustomEvent("cbsgo:stepsChanged",{detail:{steps:J()}}))},{enableHighAccuracy:!0,maximumAge:1e3,timeout:12e3}),{ok:!0}}catch(n){return V=!1,P={err:String(n?.message||n),t:Date.now()},{ok:!1,reason:"Failed to start GPS"}}}function Xt(){if(window.__cbsgo_try_autostart)return;window.__cbsgo_try_autostart=!0,(async()=>Ae()||await Te({silent:!0}))();const t=async()=>{Ae()||await Te({silent:!0}),window.removeEventListener("pointerdown",t),window.removeEventListener("touchstart",t),window.removeEventListener("click",t)};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("touchstart",t,{once:!0}),window.addEventListener("click",t,{once:!0})}window.__cbsgo_loot_reward_listener_v1||(window.__cbsgo_loot_reward_listener_v1=!0,window.addEventListener("cbsgo:lootReward",e=>{const t=e?.detail||{},n=Number(t.xp||0),o=Number(t.tickets||0),r=Number(t.cbs||0);n>0&&G(n),o>0&&ne(o),r>0&&Ct(r)}));function $e(e,t,n){const o=Number(e||0);return Number.isFinite(o)?Math.max(t,Math.min(n,o)):t}function Vt(e){const t=Number(e||0);if(!Number.isFinite(t))return"0";try{return t.toLocaleString()}catch{return String(t)}}function Je(){const e=Number(te()||0),t=Number(de()||1),n=Number(He()||0),o=Number(J()||0),r=$e(n,0,100),i=$e(r/100*100,0,100),u=Vt(o);return`
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
  `}if(!window.__cbsgo_xpbar_listener_v1){window.__cbsgo_xpbar_listener_v1=!0;const e=()=>{const t=document.querySelector("#xpMount");t&&(t.innerHTML=Je())};window.addEventListener("cbsgo:xpChanged",e),window.addEventListener("cbsgo:stepsChanged",e)}function Ze(){return""}function Qe(){try{return new URLSearchParams(window.location.search).get("dev")==="1"}catch{return!1}}function Jt(){try{const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>localStorage.removeItem(t))}catch{}try{const e=[];for(let t=0;t<sessionStorage.length;t++){const n=sessionStorage.key(t);n&&n.startsWith("cbsgo_")&&e.push(n)}e.forEach(t=>sessionStorage.removeItem(t))}catch{}window.location.reload()}const et="cbsgo_player_name_v2",fe="cbsgo_player_avatar_v2";function tt(){try{return localStorage.getItem(et)||"Sovereign"}catch{return"Sovereign"}}function Zt(e){const t=String(e||"").trim().slice(0,24)||"Sovereign";try{localStorage.setItem(et,t)}catch{}return t}function nt(){try{return localStorage.getItem(fe)||""}catch{return""}}function Qt(e){const t=String(e||"");try{localStorage.setItem(fe,t)}catch{}return t}function en(){try{localStorage.removeItem(fe)}catch{}}let w=null,F=null,L=null,I=null,T=null,C=null,Z=!1;const ae="cbsgo_nodes_pos_v3",ot="cbsgo_daily_marker_v1",tn=4,nn=6,on=80,rn=220,sn=6e4,Be=65;let ce=0;function B(e){return document.getElementById(e)}function $(e){const t=B("cbsgoMapHost");if(!t)return;let n=B("cbsgoMapMsg");n||(n=document.createElement("div"),n.id="cbsgoMapMsg",n.style.position="absolute",n.style.left="12px",n.style.right="12px",n.style.bottom="16px",n.style.zIndex="9999",n.style.padding="10px 12px",n.style.borderRadius="14px",n.style.border="1px solid rgba(255,255,255,.14)",n.style.background="rgba(0,0,0,.40)",n.style.color="#fff",n.style.fontFamily="system-ui, sans-serif",n.style.fontSize="13px",n.style.backdropFilter="blur(10px)",t.appendChild(n)),n.textContent=e||""}function an(){const e=String(tt()||"").trim();return e?e[0].toUpperCase():"🙂"}function cn(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ge(e,t){const o=p=>p*Math.PI/180,r=o(t.lat-e.lat),i=o(t.lng-e.lng),u=o(e.lat),d=o(t.lat),m=Math.sin(r/2)**2+Math.cos(u)*Math.cos(d)*Math.sin(i/2)**2;return 2*6371e3*Math.asin(Math.sqrt(m))}function rt(){return new Date().toISOString().slice(0,10)}function be(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function it(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function st(){return Re.filter(e=>e.type!=="group"&&!ue(e.id))}function ln(e){const t=nt();if(t){const r=`
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
    ">${cn(an())}</div>
  `;return e.divIcon({html:o,className:"",iconSize:[38,38],iconAnchor:[19,19]})}function dn(e,t=!1){const n=`
    <div style="
      width:44px;height:44px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(10,12,18,.55);
      backdrop-filter: blur(8px);
      box-shadow:${t?"0 0 18px rgba(120,220,255,.55), 0 10px 22px rgba(0,0,0,.35)":"0 10px 22px rgba(0,0,0,.35)"};
      font-size:22px;
    ">🧩</div>
  `;return e.divIcon({html:n,className:"",iconSize:[44,44],iconAnchor:[22,22]})}function un(e){return e.divIcon({html:`
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
  `,className:"",iconSize:[52,52],iconAnchor:[26,26]})}function pn(e,t){let n="⭐";t==="ticket"&&(n="🎟️"),t==="cbs"&&(n="🪙");const o=`
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
  `;return e.divIcon({html:o,className:"",iconSize:[40,40],iconAnchor:[20,20]})}function fn(){const e=new Date().getHours(),t=e<7||e>=19;return`${t?"🌙":"☀️"} ${t?"-1°":"3°"}`}function gn(e){const t=be(ae,null);if(t&&t.seed&&t.posById)return t;const n=st(),o={},r=[],i=90,u=180,d=520,m=5e3;function p(h,y,x){const v=y*Math.cos(x)/111111,N=y*Math.sin(x)/(111111*Math.cos(h*Math.PI/180));return{dLat:v,dLng:N}}let f=0;for(const h of n){let y=!1;for(;!y&&f<m;){f++;const x=u+Math.random()*(d-u),v=Math.random()*Math.PI*2,N=p(e.lat,x,v),S={lat:e.lat+N.dLat,lng:e.lng+N.dLng};y=r.every(D=>ge(D,S)>=i),y&&(r.push(S),o[h.id]={dLat:N.dLat,dLng:N.dLng})}if(!o[h.id]){const x=p(e.lat,u,Math.random()*Math.PI*2);o[h.id]={dLat:x.dLat,dLng:x.dLng}}}const b={seed:e,posById:o,createdAt:Date.now()};return it(ae,b),b}function bn(e,t){const n=be(ae,null),o=n?.seed||t,r=n?.posById?.[e.id];return!o||!r?null:{lat:o.lat+r.dLat,lng:o.lng+r.dLng}}function mn(e,t,n){const o=t+Math.random()*(n-t),r=Math.random()*2*Math.PI,i=o*Math.cos(r)/111111,u=o*Math.sin(r)/(111111*Math.cos(e.lat*Math.PI/180));return{lat:e.lat+i,lng:e.lng+u}}function yn(){const e=Math.random();return e<.7?"xp":e<.95?"ticket":"cbs"}function hn(e){if(e==="xp"){const n=10+Math.floor(Math.random()*21);return{xp:n,tickets:0,cbs:0,text:`+${n} XP`}}if(e==="ticket")return{xp:0,tickets:1,cbs:0,text:"+1 ticket"};const t=5+Math.floor(Math.random()*11);return{xp:0,tickets:0,cbs:t,text:`+${t} CBS Coin`}}function xn(e){if(!w||!T||!e)return;const t=Date.now();if(t-ce<sn||T.getLayers().length>=nn)return;const o=window.L;if(!o)return;const r=yn(),i=mn(e,on,rn),u=pn(o,r),d=o.marker([i.lat,i.lng],{icon:u});d.on("click",()=>{if(!C){alert("GPS not ready yet. Wait until your player marker appears.");return}const m={lat:C[0],lng:C[1]},p={lat:i.lat,lng:i.lng},f=ge(m,p);if(f>Be){alert(`Too far to open this gift.

Distance: ${Math.round(f)}m
Needed: ≤ ${Be}m`);return}T.removeLayer(d);const b=hn(r),h=`You found a gift!

Reward: ${b.text}`;alert(h);const y={kind:r,...b};try{window.dispatchEvent(new CustomEvent("cbsgo:lootReward",{detail:y}))}catch{}}),d.addTo(T),ce=t}function vn(){return`
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
        <span>${fn()}</span>
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
  `}function wn(){try{w&&(w.remove(),w=null,F=null,L=null,I=null,T=null,C=null,Z=!1,ce=0)}catch{}}function _n(){const e=window.L,t=B("cbsgoMap");if(!e||!t)return!1;wn();const n=e.latLngBounds(e.latLng(-85,-180),e.latLng(85,180));return w=e.map(t,{zoomControl:!1,attributionControl:!1,worldCopyJump:!0,maxBounds:n,maxBoundsViscosity:1,minZoom:1,maxZoom:19}),e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,noWrap:!0,bounds:n}).addTo(w),w.setView([51.687,4.87],16),L=e.layerGroup().addTo(w),T=e.layerGroup().addTo(w),!0}function Sn(e){const t=window.L;if(!t||!w)return;const n=ln(t);if(!F){F=t.marker(e,{icon:n}).addTo(w),w.setView(e,18);return}F.setIcon(n),F.setLatLng(e)}function kn(e){const t=window.L;if(!t||!w||!L)return;const n=I;L.clearLayers(),n&&(I=n,I.addTo(L));const o=gn(e),r=st(),i=65,u=1600,d=[];for(const p of r){const f=bn(p,o.seed);if(!f)continue;const b=Math.round(ge(e,f));b>u||d.push({node:p,ll:f,dist:b})}d.sort((p,f)=>p.dist-f.dist),d.slice(0,tn).forEach(({node:p,ll:f,dist:b})=>{const h=t.marker([f.lat,f.lng],{icon:dn(t,b<=i)});h.on("click",()=>{if(b>i){alert(`Too far.

Go closer to open:
${p.name}
Distance: ${b}m
Required: ≤ ${i}m`);return}Q(p)}),h.addTo(L)})}function Mn(){return be(ot,{date:"",shown:!1})}function at(e){it(ot,e)}function ct(e){const t=window.L;if(!t||!w||!L)return;const n=Mn(),o=rt();n.date===o&&n.shown===!1||(n.date!==o&&at({date:o,shown:!0}),!I&&(I=t.marker([e.lat,e.lng],{icon:un(t)}).addTo(L),I.on("click",()=>{Q({id:"__daily__",name:"Daily puzzle"})})))}window.__cbsgo_daily_marker_listener_v1||(window.__cbsgo_daily_marker_listener_v1=!0,window.addEventListener("cbsgo:dailyPuzzle",e=>{const t=e?.detail||{};!t.lat||!t.lng||(at({date:rt(),shown:!0}),w&&window.L&&L&&ct({lat:t.lat,lng:t.lng}))}));function En(){!navigator.geolocation||!w||!window.L||navigator.geolocation.watchPosition(e=>{const{latitude:t,longitude:n,accuracy:o}=e.coords,r={lat:t,lng:n};C=[t,n],Sn([t,n]),ct(r),kn(r),xn(r),$(`GPS OK • accuracy ~${Math.round(o)}m`)},e=>{$(`GPS error: ${e?.message||e?.code||"unknown"}`)},{enableHighAccuracy:!0,maximumAge:0,timeout:2e4})}function Ln(){let e=0;const t=120,n=()=>{if(e++,!B("cbsgoMap"))return e<t?setTimeout(n,100):void 0;if(!window.L){if($("Loading map engine…"),e<t)return setTimeout(n,100);$("Map engine failed to load (Leaflet not found). Refresh.");return}if(!_n()){$("Could not init map. Refresh.");return}const r=B("cbsgoCenterBtn");r&&(r.onclick=()=>{w&&C&&w.setView(C,18)});const i=B("cbsgoCompassBtn");i&&(i.onclick=()=>{w&&(Z=!Z,Z?w.setView([51.687,4.87],3):C&&w.setView(C,16))}),$("Loading GPS…"),En()};n()}function lt(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Cn(e,t=30){const n=e?`background-image:url('${e}');`:"";return`
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
  `}function me(){try{return sessionStorage.getItem("cbsgo_selected_tab_v5")||"map"}catch{return"map"}}function le(e){try{sessionStorage.setItem("cbsgo_selected_tab_v5",e)}catch{}}function Oe(e,t){return`
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
          <div style="font-weight:900; font-size:15px;">${lt(e)}</div>
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
  `}function Nn(){const e=tt(),t=nt();return`
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
        ${Cn(t,64)}

        <div style="flex:1; min-width:220px;">
          <label for="profileName" style="font-size:12px; opacity:.8;">Nickname</label>
          <input id="profileName" value="${lt(e)}" maxlength="24" style="
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
  `}function zn(){const e=document.querySelector("#profileName"),t=document.querySelector("#profileAvatar"),n=document.querySelector("#profileRemoveAvatar");let o=null;const r=u=>{const d=document.querySelector("#profileMsg");d&&(d.textContent=u||"")};e&&r(e.value?`✅ Profile loaded: ${e.value}`:"");const i=()=>{if(!e)return;const u=Zt(e.value);r(`✅ Name saved: ${u}`)};e&&(e.addEventListener("input",()=>{r("Saving…"),o&&clearTimeout(o),o=setTimeout(i,300)}),e.addEventListener("blur",()=>{o&&clearTimeout(o),i()})),t&&t.addEventListener("change",()=>{const u=t.files&&t.files[0];if(!u)return;if(u.size>15e5){r("⛔ Image too large. Please choose a smaller photo (max ~1.5MB)."),t.value="";return}r("Uploading photo…");const d=new FileReader;d.onload=()=>{Qt(String(d.result||"")),r("✅ Photo saved"),q()},d.onerror=()=>r("⛔ Failed to read image."),d.readAsDataURL(u)}),n&&(n.onclick=()=>{en(),r("✅ Photo removed"),q()})}function In(){const e=Et(),t=Lt();return`
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
  `}function dt(){const e=me();return e==="profile"?Oe("Profile",`<div id="profileMount">${Nn()}</div>`):e==="bag"?Oe("Bag",`<div id="bagMount">${In()}</div>`):""}function An(){return`
    <div class="app-shell" style="
      position:fixed; inset:0;
      width:100vw; height:100vh;
      overflow:hidden;
      background:#05070b;
    ">
      <!-- Map -->
      <div id="mapMount" style="position:absolute; inset:0; z-index:1;">
        ${vn()}
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
          ${Ze()}
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
        ${dt()}
      </div>

      ${Qe()?`<button id="resetBtn" type="button" style="
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
  `}function q(){const e=document.querySelector("#panelRoot");if(!e)return;e.innerHTML=dt(),me()==="profile"&&zn();const n=document.querySelector("#cbsgoClosePanel");n&&n.addEventListener("click",()=>{le("map"),q()})}function Pn(){document.querySelectorAll("[data-panel]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-panel"),n=me();le(n===t?"map":t||"map"),q()})})}function ut(){const e=document.querySelector("#app");if(e){if(e.innerHTML=An(),Pn(),Ln(),Xt(),!window.__cbsgo_steps_rerender_listener){window.__cbsgo_steps_rerender_listener=!0;const t=()=>{const n=document.querySelector("#stepsMount");n&&(n.innerHTML=Ze())};window.addEventListener("cbsgo:stepsChanged",t)}if(q(),Qe()){const t=document.querySelector("#resetBtn");t&&t.addEventListener("click",Jt)}window.__cbsgo_openNode_listener||(window.__cbsgo_openNode_listener=!0,window.addEventListener("cbsgo:openNode",t=>{const n=t?.detail?.id;if(!n)return;if(n==="__daily__"){Q({id:"__daily__",name:"Daily Glow"});return}if(ue(n))return;const o=Re.find(r=>r.id===n);o&&Q(o)})),window.__cbsgo_complete_listener_v1||(window.__cbsgo_complete_listener_v1=!0,window.addEventListener("cbsgo:completeNode",t=>{const n=t?.detail?.id;n&&xt(async()=>{const{completeNode:o}=await Promise.resolve().then(()=>_t);return{completeNode:o}},void 0).then(({completeNode:o})=>{o(n),ut()})}))}}function pt(){let e=document.getElementById("cbsgoHud");return e||(e=document.createElement("div"),e.id="cbsgoHud",e.style.position="fixed",e.style.left="10px",e.style.right="10px",e.style.bottom="10px",e.style.zIndex="999999",e.style.padding="10px 12px",e.style.borderRadius="14px",e.style.border="1px solid rgba(255,255,255,.18)",e.style.background="rgba(0,0,0,.55)",e.style.backdropFilter="blur(10px)",e.style.color="#fff",e.style.fontFamily="system-ui, sans-serif",e.style.fontSize="12px",e.style.whiteSpace="pre-wrap",e.style.display="none",document.body.appendChild(e),e)}function ee(e){const t=pt();t.textContent=String(e||""),t.style.display="block"}window.addEventListener("error",e=>{const t=e?.filename?`${e.filename}:${e.lineno||0}:${e.colno||0}`:"";ee(`❌ Error
${e?.message||e}
${t}`)});window.addEventListener("unhandledrejection",e=>{ee(`❌ Unhandled promise rejection
${e?.reason?.message||e?.reason||e}`)});function De(){try{if(!document.getElementById("app")){ee("❌ #app not found in index.html");return}ut();const t=pt();t.textContent="✅ boot ok",t.style.display="block",setTimeout(()=>{t.style.display="none"},1e3)}catch(e){ee(`❌ Boot crash
${e?.message||e}
${e?.stack||""}`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",De,{once:!0}):De();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/cbs-go/sw.js").then(t=>{console.log("[CBS GO] Service worker registered:",t.scope)}).catch(t=>{console.error("[CBS GO] Service worker registration failed:",t)})});
