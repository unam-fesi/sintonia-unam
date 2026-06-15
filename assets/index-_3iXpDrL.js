const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Resources-CK_9vmSJ.js","assets/vendor-react-Be-nUyB0.js","assets/vendor-supabase-J7ITh-P0.js","assets/Resources-Da2drgDA.css","assets/Privacy-C9Epa9PB.js","assets/MyHistory-Cs3QtOXe.js","assets/CheckIn-C6M5QFf_.js","assets/Journal-DBmPpNgK.js","assets/Support-btcUoYwV.js","assets/WellnessRoute-8ObHPqHS.js","assets/Companion-BZXD7Vvr.js","assets/Library-C16tykX-.js","assets/Emotions-ByaUakm5.js","assets/MapPage-DbFQQKXC.js","assets/Trees-vqQhTLYR.js","assets/Buddy-L6NatO73.js","assets/Adventure-CIKclcpA.js","assets/Calendar-Bz73tvc4.js","assets/Admin-BQEAEGbd.js","assets/authService-A90Sb5Gi.js","assets/AdminLogin-BB7-1O0n.js"])))=>i.map(i=>d[i]);
import{r as c,a as pe,u as T,L as N,N as g,b as B,R as Ne,c as w,d as ee,e as Se,B as ke}from"./vendor-react-Be-nUyB0.js";import{c as Ee}from"./vendor-supabase-J7ITh-P0.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();var xe={exports:{}},V={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ae=c,Ce=Symbol.for("react.element"),ze=Symbol.for("react.fragment"),qe=Object.prototype.hasOwnProperty,Re=Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ie={key:!0,ref:!0,__self:!0,__source:!0};function he(a,n,r){var t,s={},i=null,o=null;r!==void 0&&(i=""+r),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(o=n.ref);for(t in n)qe.call(n,t)&&!Ie.hasOwnProperty(t)&&(s[t]=n[t]);if(a&&a.defaultProps)for(t in n=a.defaultProps,n)s[t]===void 0&&(s[t]=n[t]);return{$$typeof:Ce,type:a,key:i,ref:o,props:s,_owner:Re.current}}V.Fragment=ze;V.jsx=he;V.jsxs=he;xe.exports=V;var e=xe.exports,fe,ae=pe;fe=ae.createRoot,ae.hydrateRoot;const Le="modulepreload",Te=function(a){return"/aura-fesi/"+a},ne={},E=function(n,r,t){let s=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),d=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(r.map(p=>{if(p=Te(p),p in ne)return;ne[p]=!0;const x=p.endsWith(".css"),m=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${m}`))return;const h=document.createElement("link");if(h.rel=x?"stylesheet":Le,x||(h.as="script"),h.crossOrigin="",h.href=p,d&&h.setAttribute("nonce",d),document.head.appendChild(h),x)return new Promise((l,u)=>{h.addEventListener("load",l),h.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return s.then(o=>{for(const d of o||[])d.status==="rejected"&&i(d.reason);return n().catch(i)})},re="1.0.0",se={bajo:{max:33},moderado:{max:66}},K={bajo:"Bajo nivel de atención",moderado:"Atención moderada",prioritario:"Atención prioritaria"},q={ANSWERS:"aura.answers",CONSENT:"aura.consent",RESULT:"aura.result",ANON_CODE:"aura.anon_code"},ge="generate-orientation",$="aura.student";function te(){try{const a=sessionStorage.getItem($);if(a)return JSON.parse(a);const n=sessionStorage.getItem(q.ANON_CODE);return n?{code:n,password:null}:null}catch{return null}}function Me(a){a?sessionStorage.setItem($,JSON.stringify(a)):sessionStorage.removeItem($),window.dispatchEvent(new Event("sintonia:student"))}function Oe(){sessionStorage.removeItem($),sessionStorage.removeItem(q.ANON_CODE),window.dispatchEvent(new Event("sintonia:student"))}function H(){const[a,n]=c.useState(te),r=c.useCallback(()=>n(te()),[]);return c.useEffect(()=>{const t=()=>r();return window.addEventListener("sintonia:student",t),window.addEventListener("storage",t),()=>{window.removeEventListener("sintonia:student",t),window.removeEventListener("storage",t)}},[r]),{student:a,setStudent:t=>{Me(t),r()},clearStudent:()=>{Oe(),r()}}}function Pe(){const{student:a,clearStudent:n}=H(),r=!!(a!=null&&a.code),t=T(),[s,i]=c.useState(null),[o,d]=c.useState(!1),p=c.useRef(null);c.useEffect(()=>{i(null),d(!1)},[t.pathname]),c.useEffect(()=>{function u(f){var v;(v=p.current)!=null&&v.contains(f.target)||i(null)}return document.addEventListener("click",u),()=>document.removeEventListener("click",u)},[]),c.useEffect(()=>(document.body.style.overflow=o?"hidden":"",document.body.classList.toggle("drawer-open",o),()=>{document.body.style.overflow="",document.body.classList.remove("drawer-open")}),[o]);function x(u){i(f=>f===u?null:u)}function m(){d(!1)}function h(){d(!1),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(n(),window.location.assign("/aura-fesi/"))}const l=r?a.code.split("-").map(u=>u[0]).join("").slice(0,3):"";return e.jsxs("header",{className:"site-header",children:[e.jsxs("div",{className:"container topbar",children:[e.jsxs(N,{to:"/",className:"brand","aria-label":"AURA, ir al inicio",children:[e.jsx("img",{src:"/aura-fesi/Aura-icon192.png",srcSet:"/aura-fesi/Aura-icon192.png 1x, /aura-fesi/Aura-icon512.png 2x",alt:"AURA",className:"brand-logo",width:"56",height:"56"}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("strong",{children:"AURA"}),e.jsx("span",{children:"Bienestar emocional universitario"})]})]}),e.jsx("button",{type:"button",className:"mobile-toggle",onClick:()=>d(!0),"aria-label":"Abrir menú",children:"☰"}),e.jsxs("nav",{className:"nav","aria-label":"Navegación principal",ref:p,children:[e.jsx(g,{to:"/",end:!0,className:"nav-link",children:"Inicio"}),e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${s==="discover"?"active":""}`,onClick:()=>x("discover"),"aria-haspopup":"true","aria-expanded":s==="discover",children:"Conocer ▾"}),s==="discover"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(g,{to:"/recursos",children:"📌 Recursos"}),e.jsx(g,{to:"/calendario",children:"📅 Calendario"}),e.jsx(g,{to:"/mapa",children:"🗺 Mapa"}),e.jsx(g,{to:"/emociones",children:"📖 Emociones"})]})]}),e.jsx(g,{to:"/apoyo",className:"nav-link",children:"🆘 Apoyo"}),r&&e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${s==="mine"?"active":""}`,onClick:()=>x("mine"),"aria-haspopup":"true","aria-expanded":s==="mine",children:"Mi rincón ▾"}),s==="mine"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(g,{to:"/mi-historia",children:"📊 Mi historia"}),e.jsx(g,{to:"/check-in",children:"📝 Check-in"}),e.jsx(g,{to:"/diario",children:"📔 Diario"}),e.jsx(g,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(g,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(g,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(g,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(g,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(g,{to:"/arboles",children:"🌳 Mis árboles"})]})]}),!r&&e.jsx(g,{to:"/mi-historia",className:"nav-link",children:"Mi historia"}),e.jsx(g,{to:"/privacidad",className:"nav-link nav-tiny",children:"Privacidad"}),r?e.jsxs("div",{className:"dropdown",children:[e.jsxs("button",{type:"button",className:`user-chip ${s==="user"?"active":""}`,onClick:()=>x("user"),"aria-haspopup":"true","aria-expanded":s==="user",title:"Abrir menú",children:[e.jsx("span",{className:"initials",children:l}),e.jsx("small",{children:a.code}),e.jsx("span",{className:"chev","aria-hidden":"true",children:"▾"})]}),s==="user"&&e.jsxs("div",{className:"drop-panel user-drop",children:[e.jsx(g,{to:"/mi-historia",end:!0,children:"📊 Mi panel"}),e.jsx(g,{to:"/check-in",children:"📝 Check-in semanal"}),e.jsx(g,{to:"/diario",children:"📔 Diario emocional"}),e.jsx(g,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(g,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(g,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(g,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(g,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(g,{to:"/arboles",children:"🌳 Mis árboles"}),e.jsx("hr",{style:{margin:"6px 0",border:0,borderTop:"1px solid var(--c-borde-soft)"}}),e.jsx("button",{type:"button",className:"logout-link",onClick:()=>{i(null),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(n(),window.location.assign("/aura-fesi/"))},children:"↩ Cerrar sesión"})]})]}):e.jsx(N,{to:"/consentimiento",className:"btn btn-primary btn-sm nav-cta",children:"Iniciar orientación"})]})]}),o&&pe.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mobile-overlay",onClick:m}),e.jsxs("aside",{className:"mobile-drawer",role:"dialog","aria-label":"Menú principal",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"Menú"}),e.jsx("button",{className:"close-x",onClick:m,"aria-label":"Cerrar",children:"✕"})]}),r&&e.jsxs("div",{className:"m-user",children:[e.jsx("span",{className:"m-initials",children:l}),e.jsxs("div",{children:[e.jsx("strong",{children:"Tu código"}),e.jsx("code",{children:a.code})]})]}),e.jsxs("nav",{className:"m-nav",children:[e.jsx(g,{to:"/",end:!0,onClick:m,children:"🏠 Inicio"}),e.jsx("h4",{children:"Conocer"}),e.jsx(g,{to:"/recursos",onClick:m,children:"📌 Recursos"}),e.jsx(g,{to:"/calendario",onClick:m,children:"📅 Calendario"}),e.jsx(g,{to:"/mapa",onClick:m,children:"🗺 Mapa"}),e.jsx(g,{to:"/emociones",onClick:m,children:"📖 Emociones"}),e.jsx("h4",{children:"Apoyo"}),e.jsx(g,{to:"/apoyo",onClick:m,children:"🆘 Apoyo y canalización"}),r&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Mi rincón"}),e.jsx(g,{to:"/mi-historia",onClick:m,children:"📊 Mi panel"}),e.jsx(g,{to:"/check-in",onClick:m,children:"📝 Check-in semanal"}),e.jsx(g,{to:"/diario",onClick:m,children:"📔 Diario"}),e.jsx(g,{to:"/ruta",onClick:m,children:"🛤 Mi ruta"}),e.jsx(g,{to:"/companion",onClick:m,children:"🤝 Pum-AI"}),e.jsx(g,{to:"/biblioteca",onClick:m,children:"📚 Biblioteca"}),e.jsx(g,{to:"/aventura",onClick:m,children:"🗺 Aventura"}),e.jsx(g,{to:"/buddy",onClick:m,children:"🫂 Buddy"}),e.jsx(g,{to:"/arboles",onClick:m,children:"🌳 Mis árboles"})]}),e.jsx("h4",{children:"Información"}),e.jsx(g,{to:"/privacidad",onClick:m,children:"🔒 Privacidad"}),e.jsx("div",{className:"m-cta",children:r?e.jsx("button",{type:"button",className:"btn btn-coral",onClick:h,children:"↩ Cerrar sesión"}):e.jsx(N,{to:"/consentimiento",onClick:m,className:"btn btn-primary btn-lg",children:"Iniciar orientación"})})]})]})]}),document.body)]})}function Fe(){const a=new Date().getFullYear();return e.jsx("footer",{className:"site-footer",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-card",children:[e.jsxs("div",{children:[e.jsx("h4",{children:"AURA"}),e.jsx("p",{children:"Plataforma universitaria de orientación para el bienestar emocional. No constituye diagnóstico ni sustituye atención profesional."})]}),e.jsxs("div",{className:"footer-links",children:[e.jsx(N,{to:"/privacidad",children:"Aviso de privacidad"}),e.jsx(N,{to:"/recursos",children:"Recursos de apoyo"}),e.jsx(N,{to:"/admin",children:"Acceso interno"})]})]}),e.jsxs("p",{className:"footer-credits",children:["© Universidad Nacional Autónoma de México, ",a,"."]})]})})}const Y="aura.crisis_visible";function $e(){const a=T(),[n,r]=c.useState(!1),[t,s]=c.useState(!1),i=a.pathname.startsWith("/admin")||a.pathname.startsWith("/apoyo");c.useEffect(()=>{try{const d=JSON.parse(sessionStorage.getItem(q.RESULT)||"null");d&&d.general_level==="prioritario"&&localStorage.setItem(Y,"1")}catch{}r(localStorage.getItem(Y)==="1")},[a.pathname]);function o(){localStorage.setItem(Y,"0"),r(!1),s(!1)}return!n||i?null:e.jsxs(e.Fragment,{children:[t&&e.jsxs("div",{className:"crisis-panel",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"🆘 Apoyo inmediato"}),e.jsx("button",{onClick:()=>s(!1),"aria-label":"Cerrar",children:"✕"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Línea de la Vida"})," — orientación gratuita, confidencial, 24/7."]}),e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral",children:"📞 800 290 0024"}),e.jsx(N,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver más opciones"}),e.jsx("button",{className:"dismiss",onClick:o,children:"Ocultar este botón"})]}),e.jsx("button",{className:`crisis-fab ${t?"open":""}`,onClick:()=>s(d=>!d),title:"Apoyo inmediato","aria-label":"Abrir apoyo inmediato",children:"🆘"}),e.jsx("style",{children:`
        .crisis-fab {
          position: fixed;
          bottom: 20px; right: 20px;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--c-coral-500), var(--c-coral-600));
          color: #fff;
          font-size: 1.6rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(214,59,57,0.4);
          z-index: 60;
          transition: transform 0.2s;
          animation: pulse 2.6s ease-in-out infinite;
        }
        .crisis-fab:hover { transform: scale(1.08); }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 12px 30px rgba(214,59,57,0.4), 0 0 0 0 rgba(214,59,57,0.4); }
          50%      { box-shadow: 0 12px 30px rgba(214,59,57,0.4), 0 0 0 18px rgba(214,59,57,0); }
        }
        .crisis-panel {
          position: fixed;
          bottom: 90px; right: 20px;
          width: 280px;
          background: #fff;
          border: 2px solid var(--c-coral-500);
          border-radius: var(--r-md);
          padding: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          z-index: 60;
          display: grid; gap: 10px;
        }
        .crisis-panel header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .crisis-panel header strong { color: #93362A; }
        .crisis-panel header button {
          background: transparent; border: 0; cursor: pointer;
          font-size: 1rem; color: var(--c-gris);
        }
        .crisis-panel p { margin: 0; font-size: 0.92rem; color: var(--c-texto); }
        .crisis-panel .dismiss {
          background: transparent; border: 0; cursor: pointer;
          font-size: 0.78rem; color: var(--c-gris); text-decoration: underline;
          margin-top: 4px;
        }
      `})]})}const De="https://knblatuzbgzgnugwkxdp.supabase.co",ve="sb_publishable_yBtfhxGitkJdS9jXO4CGxg_qmMkg3RF";function Ue(){try{const a=sessionStorage.getItem("aura.student");return a?JSON.parse(a).code||"":sessionStorage.getItem("aura.anon_code")||""}catch{return""}}const S=Ee(De,ve,{auth:{storageKey:"aura.auth",persistSession:!0,autoRefreshToken:!0},global:{fetch:(a,n={})=>{const r=Ue(),t=new Headers(n.headers||{});return r&&t.set("X-Anon-Code",r),fetch(a,{...n,headers:t})}}}),R=!!ve,ie="aura.webinar_dismissed_",Be=24;function Ve(){const{student:a}=H(),n=T(),[r,t]=c.useState(null),[s,i]=c.useState(!1),[o,d]=c.useState(!1),[p,x]=c.useState(!1),h=["/admin","/evaluacion","/consentimiento"].some(b=>n.pathname.startsWith(b));c.useEffect(()=>{R&&(async()=>{const{data:b}=await S.from("view_upcoming_webinars").select("*").order("starts_at").limit(1).maybeSingle();if(b){try{const j=localStorage.getItem(ie+b.id);if(j){const _=Number(j);if(Date.now()-_<Be*3600*1e3)return}}catch{}t(b),setTimeout(()=>i(!0),2500)}})()},[]),c.useEffect(()=>{!r||!(a!=null&&a.code)||S.from("event_rsvp").select("id").eq("event_id",r.id).eq("anonymous_code",a.code).maybeSingle().then(({data:b})=>x(!!b))},[r,a==null?void 0:a.code]);function l(){if(r!=null&&r.id)try{localStorage.setItem(ie+r.id,String(Date.now()))}catch{}i(!1)}async function u(){if(!(a!=null&&a.code)){window.location.assign("/aura-fesi/mi-historia");return}d(!0),await S.from("event_rsvp").upsert({event_id:r.id,anonymous_code:a.code},{onConflict:"event_id,anonymous_code"}),x(!0),d(!1)}if(!r||h)return null;const v=new Date(r.starts_at).toLocaleString("es-MX",{weekday:"long",day:"2-digit",month:"long",hour:"2-digit",minute:"2-digit"});return e.jsxs(e.Fragment,{children:[!s&&e.jsxs("button",{className:"webinar-pill",onClick:()=>i(!0),"aria-label":"Abrir aviso de webinar",children:["📡 ",e.jsx("span",{children:"Webinar próximo"})]}),s&&e.jsxs("div",{className:"webinar-toast",role:"dialog","aria-label":"Próximo webinar",children:[e.jsx("button",{className:"dismiss-btn",onClick:l,"aria-label":"Cerrar",children:"✕"}),r.image_url&&e.jsx("img",{src:r.image_url,alt:"",className:"webinar-img"}),e.jsxs("div",{className:"webinar-body",children:[e.jsx("span",{className:"webinar-tag",children:"📡 Próximo webinar"}),e.jsx("h3",{children:r.title}),r.speaker&&e.jsxs("small",{children:["👤 ",r.speaker]}),e.jsxs("small",{children:["🗓 ",v]}),r.location&&e.jsxs("small",{children:["📍 ",r.location]}),r.description&&e.jsx("p",{className:"webinar-desc",children:r.description}),e.jsxs("div",{className:"webinar-actions",children:[p?e.jsx("span",{className:"rsvped-chip",children:"✓ Apuntado(a)"}):e.jsx("button",{className:"btn btn-primary btn-sm",onClick:u,disabled:o,children:o?"…":a!=null&&a.code?"✋ Me interesa":"✋ Crear código y apuntarme"}),r.url&&e.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Más info →"})]})]})]}),e.jsx("style",{children:`
        .webinar-pill {
          position: fixed;
          bottom: 86px;
          right: 20px;
          background: linear-gradient(135deg, var(--c-azul-800), var(--c-azul-700));
          color: #fff;
          border: 0;
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(16,36,62,0.30);
          z-index: 55;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          animation: gentleBounce 3.8s ease-in-out infinite;
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .webinar-pill:hover { transform: translateY(-2px); }

        .webinar-toast {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 360px;
          max-width: calc(100vw - 40px);
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          box-shadow: 0 24px 60px rgba(0,0,0,0.30);
          overflow: hidden;
          z-index: 55;
          animation: slideIn 0.4s cubic-bezier(.2,.7,.2,1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translate(20px, 20px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        .dismiss-btn {
          position: absolute; top: 10px; right: 10px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
          border: 0;
          cursor: pointer;
          font-size: 0.92rem;
          color: var(--c-azul-800);
          z-index: 2;
        }
        .dismiss-btn:hover { background: #fff; }

        .webinar-img {
          width: 100%; height: 130px;
          object-fit: cover;
          display: block;
        }
        .webinar-body { padding: 18px; }
        .webinar-tag {
          display: inline-block;
          background: var(--c-oro-100);
          color: #7B5E14;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .webinar-toast h3 {
          margin: 6px 0 4px;
          color: var(--c-azul-800);
          font-size: 1.08rem;
        }
        .webinar-body small {
          display: block;
          color: var(--c-gris);
          font-size: 0.84rem;
          margin: 2px 0;
        }
        .webinar-desc {
          font-size: 0.92rem;
          color: var(--c-texto-soft);
          margin: 8px 0;
        }
        .webinar-actions {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-top: 10px;
        }
        .rsvped-chip {
          padding: 5px 12px;
          background: var(--c-salvia-100);
          color: #2F8770;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
        }
      `})]})}function He(){const a=c.useRef(null);return c.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let r=null;function t(){if(!a.current)return;const i=window.scrollY;a.current.style.transform=`translate3d(0, ${i*-.1}px, 0)`,r=null}function s(){r==null&&(r=requestAnimationFrame(t))}return t(),window.addEventListener("scroll",s,{passive:!0}),()=>{window.removeEventListener("scroll",s),r&&cancelAnimationFrame(r)}},[]),e.jsxs("div",{ref:a,className:"wellness-bg","aria-hidden":"true",children:[e.jsx("div",{className:"bg-wash"}),e.jsx("div",{className:"bg-blob bg-blob-lavender"}),e.jsx("div",{className:"bg-blob bg-blob-peach"}),e.jsx("div",{className:"bg-blob bg-blob-durazno"}),e.jsx("div",{className:"bg-blob bg-blob-rosa"}),e.jsx("div",{className:"bg-blob bg-blob-coral"}),e.jsx("style",{children:`
        .wellness-bg {
          position: fixed;
          inset: -10vh -10vw;     /* Sobre-cubre los bordes para que el parallax no muestre vacío */
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          will-change: transform;
        }

        /* ===== Wash base — Atardecer abrazo:
                lavanda → peach → rosa pastel → durazno ===== */
        .bg-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg,
              rgba(183, 168, 217, 0.55) 0%,    /* lavanda */
              rgba(255, 184, 156, 0.50) 35%,   /* peach */
              rgba(255, 199, 216, 0.45) 65%,   /* rosa pastel */
              rgba(255, 216, 158, 0.42) 100%   /* durazno */
            );
          background-size: 250% 250%;
          animation: washShift 32s ease-in-out infinite;
          opacity: 0.88;
        }
        @keyframes washShift {
          0%   { background-position:   0%   0%; }
          25%  { background-position: 100%  30%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position:   0%  70%; }
          100% { background-position:   0%   0%; }
        }

        /* ===== Blobs de color que se mezclan ===== */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          mix-blend-mode: multiply;
          will-change: transform;
        }

        /* Lavanda — dominante (calma, introspección) */
        .bg-blob-lavender {
          width: 90vmax; height: 90vmax;
          top: -25vmax; left: -25vmax;
          background: radial-gradient(circle, var(--c-lavanda-500) 0%, transparent 55%);
          opacity: 0.75;
          animation: drift-1 38s ease-in-out infinite;
        }
        /* Peach — calidez, abrazo (reemplaza la salvia) */
        .bg-blob-peach {
          width: 80vmax; height: 80vmax;
          bottom: -20vmax; right: -15vmax;
          background: radial-gradient(circle, var(--c-peach-500) 0%, transparent 58%);
          opacity: 0.72;
          animation: drift-2 42s ease-in-out infinite;
        }
        /* Durazno — alegría dorada (sustituye al oro como blob) */
        .bg-blob-durazno {
          width: 70vmax; height: 70vmax;
          top: 20vh; right: -15vmax;
          background: radial-gradient(circle, var(--c-durazno-500) 0%, transparent 60%);
          opacity: 0.6;
          animation: drift-3 36s ease-in-out infinite;
        }
        /* Rosa pastel — ternura, juventud (reemplaza al azul) */
        .bg-blob-rosa {
          width: 65vmax; height: 65vmax;
          top: 50vh; left: 30vw;
          background: radial-gradient(circle, var(--c-rosa-500) 0%, transparent 60%);
          opacity: 0.55;
          animation: drift-5 50s ease-in-out infinite;
        }
        /* Coral — chispa cálida (mantenido, más sutil) */
        .bg-blob-coral {
          width: 60vmax; height: 60vmax;
          bottom: 10vh; left: -10vmax;
          background: radial-gradient(circle, var(--c-coral-500) 0%, transparent 62%);
          opacity: 0.42;
          animation: drift-4 44s ease-in-out infinite;
        }

        @keyframes drift-1 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          25%      { transform: translate(20vw, 25vh)        scale(1.10); }
          50%      { transform: translate(40vw, -10vh)       scale(0.95); }
          75%      { transform: translate(-10vw, 30vh)       scale(1.05); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          33%      { transform: translate(-25vw, -20vh)      scale(1.08); }
          66%      { transform: translate(15vw, -10vh)       scale(0.92); }
        }
        @keyframes drift-3 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          50%      { transform: translate(-30vw, 25vh)       scale(1.15); }
        }
        @keyframes drift-4 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          33%      { transform: translate(35vw, -15vh)       scale(0.90); }
          66%      { transform: translate(20vw, 20vh)        scale(1.10); }
        }
        @keyframes drift-5 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          50%      { transform: translate(-20vw, -25vh)      scale(1.20); }
        }

        /* ===== Reduced motion: sin animación pero mantenemos colores ===== */
        @media (prefers-reduced-motion: reduce) {
          .bg-wash, .bg-blob { animation: none; }
        }

        /* ===== Mobile: bajamos blur para mejor performance ===== */
        @media (max-width: 720px) {
          .bg-blob { filter: blur(60px); }
          .bg-blob-rosa  { display: none; }
          .bg-blob-coral { display: none; }
        }
      `})]})}const be="aura.buddyToast.dismissed",We=30*60*1e3;function Ye(){try{const a=Number(sessionStorage.getItem(be)||0);return a&&Date.now()-a<We}catch{return!1}}function Xe(){const{student:a}=H(),n=B(),r=T(),[t,s]=c.useState(!1),[i,o]=c.useState(0),d=c.useRef(null),p=c.useRef(0),x=(a==null?void 0:a.code)||null,m=r.pathname.startsWith("/admin"),h=r.pathname==="/buddy",l=r.pathname==="/evaluacion";c.useEffect(()=>{if(!x||m||h||l){s(!1);return}let v=!0;async function b(){const{count:_}=await S.from("buddy_queue").select("*",{count:"exact",head:!0}).neq("anonymous_code",x);if(!v)return;const A=_??0;o(A);const{data:y}=await S.from("buddy_pairs").select("id").or(`code_a.eq.${x},code_b.eq.${x}`).eq("active",!0).limit(1).maybeSingle();if(!v)return;const k=A>0&&!y&&!Ye();k&&Date.now()-p.current>6e4?(s(!0),p.current=Date.now(),d.current&&clearTimeout(d.current),d.current=setTimeout(()=>s(!1),25e3)):k||s(!1)}b();const j=S.channel("buddy-queue-watch").on("postgres_changes",{event:"INSERT",schema:"public",table:"buddy_queue"},_=>{var A;((A=_.new)==null?void 0:A.anonymous_code)!==x&&b()}).on("postgres_changes",{event:"DELETE",schema:"public",table:"buddy_queue"},()=>b()).subscribe();return()=>{v=!1,d.current&&clearTimeout(d.current),S.removeChannel(j)}},[x,m,h,l]);function u(){s(!1);try{sessionStorage.setItem(be,String(Date.now()))}catch{}}function f(){s(!1),n("/buddy")}return t?e.jsxs("div",{className:"bud-toast",role:"status","aria-live":"polite",children:[e.jsx("div",{className:"bud-toast-icon",children:"🤝"}),e.jsxs("div",{className:"bud-toast-body",children:[e.jsx("strong",{children:"Alguien busca un buddy ahora"}),e.jsxs("p",{children:[i===1?"Otro estudiante anónimo está esperando en la cola.":`Hay ${i} estudiantes anónimos esperando.`," ¿Conectamos?"]}),e.jsxs("div",{className:"bud-toast-actions",children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:f,children:"Sí, conectar"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:u,children:"Ahora no"})]})]}),e.jsx("button",{className:"bud-toast-close",onClick:u,"aria-label":"Cerrar",children:"×"}),e.jsx("style",{children:`
        .bud-toast {
          position: fixed;
          right: 18px;
          bottom: 100px;
          z-index: 9000;
          width: min(360px, calc(100vw - 36px));
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(10px) saturate(1.2);
          -webkit-backdrop-filter: blur(10px) saturate(1.2);
          border: 1px solid rgba(232,200,104,0.55);
          border-radius: 16px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.7) inset,
            0 18px 38px rgba(16,36,62,0.20),
            0 6px 14px rgba(16,36,62,0.10);
          padding: 14px 16px 14px 14px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          animation: budToastIn 0.32s ease both;
        }
        .bud-toast-icon {
          flex-shrink: 0;
          width: 42px; height: 42px;
          background: var(--c-oro-100);
          border-radius: 50%;
          display: grid; place-items: center;
          font-size: 1.2rem;
        }
        .bud-toast-body { flex: 1; min-width: 0; }
        .bud-toast-body strong {
          display: block;
          color: var(--c-azul-800);
          font-size: 0.95rem;
          margin-bottom: 2px;
        }
        .bud-toast-body p {
          margin: 0 0 10px;
          font-size: 0.86rem;
          color: var(--c-texto-soft, var(--c-texto));
          line-height: 1.4;
        }
        .bud-toast-actions {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .bud-toast-actions .btn {
          padding: 7px 14px;
          font-size: 0.84rem;
        }
        .bud-toast-close {
          background: transparent; border: 0;
          font-size: 1.4rem; line-height: 1;
          color: var(--c-gris);
          cursor: pointer;
          padding: 0 4px;
          align-self: flex-start;
        }
        .bud-toast-close:hover { color: var(--c-azul-800); }

        @keyframes budToastIn {
          from { opacity: 0; transform: translate3d(0, 14px, 0) scale(0.97); }
          to   { opacity: 1; transform: translate3d(0, 0, 0)    scale(1); }
        }

        @media (max-width: 540px) {
          .bud-toast {
            right: 12px; left: 12px; bottom: 92px;
            width: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bud-toast { animation: none; }
        }
      `})]}):null}const Ke=["/evaluacion","/admin/login"];function Je(a){return Ke.some(n=>a.startsWith(n))}function Qe({children:a}){const n=T(),r=c.useRef(n.pathname),t=c.useRef(null);return c.useEffect(()=>{var i;if(r.current===n.pathname||(r.current=n.pathname,Je(n.pathname))||(i=window.matchMedia)!=null&&i.call(window,"(prefers-reduced-motion: reduce)").matches)return;const s=t.current;s&&(s.classList.remove("page-enter"),s.offsetWidth,s.classList.add("page-enter"))},[n.pathname]),e.jsxs("div",{ref:t,className:"page-transition-wrap",children:[a,e.jsx("style",{children:`
        .page-transition-wrap { min-height: 100%; }

        @keyframes pageEnter {
          0%   { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.99); filter: blur(4px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: none;                       filter: blur(0); }
        }
        .page-transition-wrap.page-enter {
          animation: pageEnter 0.55s cubic-bezier(.2,.7,.2,1) both;
        }

        /* View Transitions API (Chrome/Edge) — más natural */
        @media (prefers-reduced-motion: no-preference) {
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation-duration: 0.45s;
            animation-timing-function: cubic-bezier(.2,.7,.2,1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .page-transition-wrap.page-enter { animation: none; }
        }
      `})]})}const oe=["rgba(183, 168, 217, 0.55)","rgba(255, 184, 156, 0.50)","rgba(255, 199, 216, 0.50)","rgba(255, 216, 158, 0.50)"];function Ge({density:a=28,maxRadius:n=4}){const r=c.useRef(null);return c.useEffect(()=>{var h,l;if(typeof window>"u"||(h=window.matchMedia)!=null&&h.call(window,"(prefers-reduced-motion: reduce)").matches||(l=window.matchMedia)!=null&&l.call(window,"(max-width: 720px)").matches)return;const t=r.current;if(!t)return;const s=t.getContext("2d");let i=t.width=window.innerWidth,o=t.height=window.innerHeight;const d=Array.from({length:a}).map(()=>({x:Math.random()*i,y:Math.random()*o,r:1.4+Math.random()*n,vx:(Math.random()-.5)*.18,vy:-.15-Math.random()*.25,color:oe[Math.floor(Math.random()*oe.length)],pulse:Math.random()*Math.PI*2}));let p=null;function x(){s.clearRect(0,0,i,o);for(const u of d){u.x+=u.vx,u.y+=u.vy,u.pulse+=.014,u.y<-10&&(u.y=o+10,u.x=Math.random()*i),u.x<-10&&(u.x=i+10),u.x>i+10&&(u.x=-10);const f=.6+Math.sin(u.pulse)*.4;s.beginPath(),s.arc(u.x,u.y,u.r,0,Math.PI*2),s.fillStyle=u.color.replace("0.55",String(.35+f*.25)),s.fill()}p=requestAnimationFrame(x)}p=requestAnimationFrame(x);function m(){i=t.width=window.innerWidth,o=t.height=window.innerHeight}return window.addEventListener("resize",m),()=>{window.removeEventListener("resize",m),p&&cancelAnimationFrame(p)}},[a,n]),e.jsx("canvas",{ref:r,"aria-hidden":"true",style:{position:"fixed",inset:0,width:"100vw",height:"100vh",pointerEvents:"none",zIndex:0,mixBlendMode:"multiply"}})}function Ze(){const a=c.useRef(null),n=c.useRef(null);return c.useEffect(()=>{var u,f;if(typeof window>"u"||(u=window.matchMedia)!=null&&u.call(window,"(prefers-reduced-motion: reduce)").matches||(f=window.matchMedia)!=null&&f.call(window,"(pointer: coarse)").matches)return;const r=a.current,t=n.current;if(!r||!t)return;let s=null,i=window.innerWidth/2,o=window.innerHeight/2,d=i,p=o,x=!1;function m(v){i=v.clientX,o=v.clientY,t.style.transform=`translate3d(${i}px, ${o}px, 0) translate(-50%, -50%)`,s||(s=requestAnimationFrame(h))}function h(){d+=(i-d)*.18,p+=(o-p)*.18,r.style.transform=`translate3d(${d}px, ${p}px, 0) translate(-50%, -50%) scale(${x?1.6:1})`,Math.abs(i-d)>.2||Math.abs(o-p)>.2?s=requestAnimationFrame(h):s=null}function l(v){var j,_;x=!!((_=(j=v.target)==null?void 0:j.closest)==null?void 0:_.call(j,"a, button, [role=button], input, textarea, select, .tilt-card, .area-chip")),s||(s=requestAnimationFrame(h))}return window.addEventListener("mousemove",m,{passive:!0}),window.addEventListener("mouseover",l,{passive:!0}),document.body.classList.add("has-cursor-follower"),()=>{window.removeEventListener("mousemove",m),window.removeEventListener("mouseover",l),s&&cancelAnimationFrame(s),document.body.classList.remove("has-cursor-follower")}},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:a,className:"cursor-ring","aria-hidden":"true"}),e.jsx("div",{ref:n,className:"cursor-dot","aria-hidden":"true"}),e.jsx("style",{children:`
        .cursor-ring, .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: multiply;
          will-change: transform;
        }
        .cursor-ring {
          width: 36px; height: 36px;
          border: 1.5px solid var(--c-lavanda-600);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(157,123,217,0.10), transparent 70%);
          transition: transform 0.06s linear, background 0.25s;
        }
        .cursor-dot {
          width: 6px; height: 6px;
          background: var(--c-lavanda-700);
          border-radius: 50%;
        }
        body.has-cursor-follower,
        body.has-cursor-follower * { cursor: none !important; }
        body.has-cursor-follower a,
        body.has-cursor-follower button,
        body.has-cursor-follower input,
        body.has-cursor-follower textarea,
        body.has-cursor-follower select { cursor: none !important; }
        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .cursor-ring, .cursor-dot { display: none; }
          body.has-cursor-follower,
          body.has-cursor-follower * { cursor: auto !important; }
        }
      `})]})}function ye(){var a;return typeof window>"u"?!1:(a=window.matchMedia)==null?void 0:a.call(window,"(prefers-reduced-motion: reduce)").matches}function ea({max:a=14,scale:n=1.03,glow:r=!0}={}){const t=c.useRef(null);return c.useEffect(()=>{if(!t.current||ye())return;const s=t.current;let i=null,o=0,d=0,p=0,x=0,m=50,h=50,l=!1;function u(j){const _=s.getBoundingClientRect(),A=(j.clientX-_.left)/_.width,y=(j.clientY-_.top)/_.height;o=(y-.5)*-2*a,d=(A-.5)*2*a,m=A*100,h=y*100,i||(i=requestAnimationFrame(b))}function f(){l=!0,s.style.willChange="transform"}function v(){l=!1,o=0,d=0,i||(i=requestAnimationFrame(b))}function b(){p+=(o-p)*.18,x+=(d-x)*.18;const j=l?n:1;s.style.transform=`perspective(900px) rotateX(${p.toFixed(2)}deg) rotateY(${x.toFixed(2)}deg) scale3d(${j},${j},${j})`,r&&(s.style.setProperty("--tilt-x",`${m}%`),s.style.setProperty("--tilt-y",`${h}%`)),Math.abs(o-p)>.05||Math.abs(d-x)>.05?i=requestAnimationFrame(b):(i=null,l||(s.style.willChange=""))}return s.addEventListener("mousemove",u),s.addEventListener("mouseenter",f),s.addEventListener("mouseleave",v),()=>{s.removeEventListener("mousemove",u),s.removeEventListener("mouseenter",f),s.removeEventListener("mouseleave",v),i&&cancelAnimationFrame(i)}},[a,n,r]),t}function G({threshold:a=.15,rootMargin:n="0px 0px -10% 0px",once:r=!0}={}){const t=c.useRef(null),[s,i]=c.useState(!1);return c.useEffect(()=>{if(!t.current)return;if(ye()){i(!0);return}const o=new IntersectionObserver(([d])=>{d.isIntersecting?(i(!0),r&&o.unobserve(d.target)):r||i(!1)},{threshold:a,rootMargin:n});return o.observe(t.current),()=>o.disconnect()},[a,n,r]),[t,s]}function L({children:a,as:n="span",splitBy:r="word",stagger:t=.06,variant:s="slideUp",delay:i=0,className:o="",style:d={},once:p=!0,...x}){const[m,h]=G({once:p}),l=typeof a=="string"?a:String(a),u=r==="char"?l.split(""):l.split(/(\s+)/);return e.jsxs(n,{ref:m,className:`split-text split-${s} ${h?"split-in":""} ${o}`,style:d,"aria-label":l,...x,children:[u.map((f,v)=>/^\s+$/.test(f)?e.jsx("span",{children:f},v):e.jsx("span",{className:"split-part",style:{transitionDelay:`${i+v*t}s`,animationDelay:`${i+v*t}s`},"aria-hidden":"true",children:f},v)),e.jsx("style",{children:`
        .split-text { display: inline-block; }
        .split-part {
          display: inline-block;
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(.2,.7,.2,1), transform 0.7s cubic-bezier(.2,.7,.2,1), filter 0.7s cubic-bezier(.2,.7,.2,1);
          will-change: opacity, transform, filter;
        }
        .split-text.split-in .split-part { opacity: 1; transform: none !important; filter: none !important; }

        .split-slideUp    .split-part { transform: translate3d(0, 1em, 0); }
        .split-slideRight .split-part { transform: translate3d(-1em, 0, 0); }
        .split-zoomIn     .split-part { transform: scale(0.6); }
        .split-blurIn     .split-part { filter: blur(10px); }
        .split-fadeIn     .split-part { /* solo opacity */ }

        @media (prefers-reduced-motion: reduce) {
          .split-part { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
        }
      `})]})}function D({children:a,as:n="span",variant:r="aurora",speed:t=6,className:s="",style:i={},...o}){const d={aurora:"linear-gradient(110deg, var(--c-lavanda-600) 10%, var(--c-peach-600) 40%, var(--c-durazno-600) 65%, var(--c-rosa-600) 90%)",oro:"linear-gradient(110deg, var(--c-oro-700) 10%, var(--c-oro-400) 50%, var(--c-oro-600) 90%)",sunset:"linear-gradient(110deg, var(--c-coral-600) 10%, var(--c-peach-600) 40%, var(--c-durazno-600) 65%, var(--c-coral-600) 90%)",mint:"linear-gradient(110deg, var(--c-mint-700) 10%, var(--c-mint-500) 50%, var(--c-mint-600) 90%)"},p=d[r]||d.aurora;return e.jsxs(n,{className:`shimmer-text shimmer-${r} ${s}`,style:{background:p,backgroundSize:"300% auto",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent",animation:`shimmerFlow ${t}s linear infinite`,display:"inline-block",...i},...o,children:[a,e.jsx("style",{children:`
        @keyframes shimmerFlow {
          0%   { background-position:   0% center; }
          100% { background-position: 300% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer-text { animation: none !important; background-position: 50% center; }
        }
      `})]})}function ce({children:a,as:n="button",strength:r=.38,innerStrength:t=.7,radius:s=110,className:i="",style:o={},...d}){const p=c.useRef(null),x=c.useRef(null);return c.useEffect(()=>{var y;if(!p.current||(y=window.matchMedia)!=null&&y.call(window,"(prefers-reduced-motion: reduce)").matches)return;const m=p.current,h=x.current;let l=null,u=0,f=0,v=0,b=0;function j(k){const z=m.getBoundingClientRect(),M=k.clientX-(z.left+z.width/2),Z=k.clientY-(z.top+z.height/2);Math.hypot(M,Z)>s?(u=0,f=0):(u=M*r,f=Z*r),l||(l=requestAnimationFrame(A))}function _(){u=0,f=0,l||(l=requestAnimationFrame(A))}function A(){if(v+=(u-v)*.22,b+=(f-b)*.22,m.style.transform=`translate3d(${v.toFixed(2)}px, ${b.toFixed(2)}px, 0)`,h){const k=v*t,z=b*t;h.style.transform=`translate3d(${k.toFixed(2)}px, ${z.toFixed(2)}px, 0)`}Math.abs(u-v)>.1||Math.abs(f-b)>.1?l=requestAnimationFrame(A):l=null}return window.addEventListener("mousemove",j),m.addEventListener("mouseleave",_),()=>{window.removeEventListener("mousemove",j),m.removeEventListener("mouseleave",_),l&&cancelAnimationFrame(l)}},[r,t,s]),e.jsx(n,{ref:p,className:`magnetic-btn ${i}`,style:{display:"inline-flex",willChange:"transform",transition:"box-shadow 0.3s ease",...o},...d,children:e.jsx("span",{ref:x,className:"magnetic-inner",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"inherit",willChange:"transform",pointerEvents:"none"},children:a})})}function U({to:a,from:n=0,duration:r=1400,prefix:t="",suffix:s="",format:i=null,decimals:o=0,as:d="span",className:p="",style:x={}}){const[m,h]=G(),[l,u]=c.useState(n),f=c.useRef(null);c.useEffect(()=>{if(!h)return;const b=performance.now(),j=Number(a);if(!Number.isFinite(j)){u(j);return}function _(A){const y=Math.min(1,(A-b)/r),k=1-Math.pow(1-y,3),z=n+(j-n)*k;u(o?Number(z.toFixed(o)):Math.round(z)),y<1&&(f.current=requestAnimationFrame(_))}return f.current=requestAnimationFrame(_),()=>{f.current&&cancelAnimationFrame(f.current)}},[h,a,n,r,o]);const v=i?i(l):String(l);return e.jsxs(d,{ref:m,className:`counter ${p}`,style:x,children:[t,v,s]})}function aa(){const a=c.useRef(null);return c.useEffect(()=>{var s;if((s=window.matchMedia)!=null&&s.call(window,"(prefers-reduced-motion: reduce)").matches)return;let n=null;function r(){if(!a.current)return;const i=window.scrollY,o=Math.min(8,i*.02),d=i*-.25,p=Math.max(.85,1-i*5e-4);a.current.style.transform=`translate3d(0, ${d}px, 0) rotate(${o}deg) scale(${p})`,n=null}function t(){n||(n=requestAnimationFrame(r))}return r(),window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),e.jsx("section",{className:"hero",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-card card fade-in",children:[e.jsx("span",{className:"tag",children:"Programa universitario · FES Iztacala"}),e.jsxs("h1",{className:"mt-2 hero-h1",children:[e.jsx(L,{as:"span",splitBy:"word",stagger:.05,variant:"slideUp",children:"Sintonízate contigo, con tu"})," ",e.jsx(D,{as:"span",variant:"aurora",speed:5,children:"comunidad"})," ",e.jsx(L,{as:"span",splitBy:"word",stagger:.05,delay:.3,variant:"slideUp",children:"y con tu bienestar."})]}),e.jsx("p",{className:"lede",children:"Una autoevaluación breve, anónima y con recomendaciones personalizadas para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo en FES Iztacala y la UNAM."}),e.jsxs("ul",{className:"hero-checks",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"20 preguntas"})," en 7 a 10 minutos"]}),e.jsxs("li",{children:["Resultado ",e.jsx("strong",{children:"informativo, anónimo y confidencial"})]}),e.jsxs("li",{children:["Recomendaciones y vinculación con ",e.jsx("strong",{children:"recursos universitarios"})]})]}),e.jsxs("div",{className:"hero-actions",children:[e.jsx(ce,{as:N,to:"/consentimiento",className:"btn btn-primary btn-lg",strength:.35,children:"Iniciar orientación"}),e.jsx(ce,{as:N,to:"/privacidad",className:"btn btn-ghost",strength:.25,children:"Aviso de privacidad"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx(U,{as:"strong",to:20,duration:1100}),e.jsx("span",{children:"preguntas"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"7-10"}),e.jsx("span",{children:"minutos"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx(U,{as:"strong",to:0,from:5,duration:900}),e.jsx("span",{children:"datos personales"})]})]})]}),e.jsx("aside",{className:"hero-visual fade-in","aria-hidden":"true",children:e.jsx("div",{className:"hero-logo-wrap",children:e.jsx("img",{ref:a,className:"hero-logo",src:"/aura-fesi/Aura.png",alt:"AURA",loading:"eager",decoding:"async"})})})]})})})}function na({icon:a="✦",title:n,children:r,accent:t="azul"}){return e.jsxs("article",{className:`info-card accent-${t}`,children:[e.jsx("div",{className:"info-icon","aria-hidden":"true",children:a}),e.jsx("h3",{children:n}),e.jsx("p",{children:r})]})}function W({variant:a="default",children:n}){return e.jsxs("aside",{className:`safety-notice safety-${a}`,role:"note",children:[e.jsx("span",{className:"safety-icon","aria-hidden":"true",children:"ⓘ"}),e.jsx("div",{children:n||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," No constituye un diagnóstico médico ni psicológico, ni reemplaza la atención profesional. Si necesitas apoyo, acércate a los servicios de orientación y salud de la UNAM."]})})]})}function J(){const a=new Date;return a.getFullYear()*1e3+a.getMonth()*32+a.getDate()}function je(a){return!a||a.length===0?null:a[J()%a.length]}function ra({compact:a=!1}){const[n,r]=c.useState(null);return c.useEffect(()=>{S.from("student_library").select("id, title, body, meta").eq("category","quote").eq("active",!0).then(({data:t})=>r(je(t)))},[]),n?e.jsxs("div",{className:`daily-quote ${a?"compact":""}`,children:[e.jsx("small",{children:"💭 Frase del día"}),e.jsxs("blockquote",{children:['"',n.title,'"']}),n.body&&e.jsxs("cite",{children:["— ",n.body]}),e.jsx("style",{children:`
        .daily-quote {
          background: linear-gradient(135deg, var(--c-azul-100), var(--c-lavanda-100));
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin: 12px 0;
        }
        .daily-quote.compact { padding: 12px 16px; }
        .daily-quote small { color: var(--c-gris); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .daily-quote blockquote {
          font-family: var(--ff-serif);
          font-size: 1.15rem;
          color: var(--c-azul-800);
          font-style: italic;
          margin: 8px 0 4px;
        }
        .daily-quote cite { color: var(--c-texto-soft); font-size: 0.86rem; font-style: normal; }
      `})]}):null}function sa(){const{student:a}=H(),[n,r]=c.useState(null),[t,s]=c.useState(!1);c.useEffect(()=>{S.from("student_library").select("id, title, body").eq("category","challenge").eq("active",!0).then(({data:o})=>r(je(o)))},[]),c.useEffect(()=>{if(!n||!(a!=null&&a.code))return;const o=`challenge_${J()}_${n.id}`;S.from("student_achievements").select("id").eq("anonymous_code",a.code).eq("achievement_key",o).maybeSingle().then(({data:d})=>s(!!d))},[n,a==null?void 0:a.code]);async function i(){if(!(a!=null&&a.code)||!n)return;const o=`challenge_${J()}_${n.id}`;await S.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:o}),s(!0)}return n?e.jsxs("div",{className:"daily-challenge",children:[e.jsx("small",{children:"🎯 Reto del día"}),e.jsx("h3",{children:n.title}),n.body&&e.jsx("p",{children:n.body}),(a==null?void 0:a.code)&&e.jsx("button",{className:`btn ${t?"btn-ghost":"btn-coral"} btn-sm`,onClick:i,disabled:t,children:t?"✓ ¡Lo hiciste!":"Marcar como hecho"}),e.jsx("style",{children:`
        .daily-challenge {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border: 1px solid rgba(232,130,107,0.3);
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin: 12px 0;
        }
        .daily-challenge small { color: #93362A; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .daily-challenge h3 { color: var(--c-azul-800); margin: 6px 0 4px; }
        .daily-challenge p { color: var(--c-texto-soft); margin: 0 0 10px; font-size: 0.94rem; }
      `})]}):null}let I=null;const O=new WeakMap;function we(){var a;return typeof window>"u"?!1:(a=window.matchMedia)==null?void 0:a.call(window,"(prefers-reduced-motion: reduce)").matches}function ta(a,n={}){var o;if(!a)return()=>{};if(we())return a.classList.add("in-view"),(o=n.onEnter)==null||o.call(n,a),()=>{};const{threshold:r=.15,rootMargin:t="0px 0px -10% 0px",once:s=!0,onEnter:i}=n;return I||(I=new IntersectionObserver(d=>{var p;for(const x of d)if(x.isIntersecting){x.target.classList.add("in-view");const m=O.get(x.target);(p=m==null?void 0:m.onEnter)==null||p.call(m,x.target),(m==null?void 0:m.once)!==!1&&(I.unobserve(x.target),O.delete(x.target))}},{threshold:r,rootMargin:t})),O.set(a,{onEnter:i,once:s}),I.observe(a),()=>{I==null||I.unobserve(a),O.delete(a)}}function Za(a,n,r={}){if(!a)return;if(we()){a.textContent=(r.prefix||"")+(r.format?r.format(n):String(n))+(r.suffix||"");return}const{duration:t=1400,suffix:s="",prefix:i="",format:o}=r,d=performance.now();function p(x){const m=Math.min(1,(x-d)/t),h=1-Math.pow(1-m,3),l=Math.round(n*h);a.textContent=i+(o?o(l):String(l))+s,m<1&&requestAnimationFrame(p)}requestAnimationFrame(p)}function C({children:a,as:n="div",variant:r="slideUp",delay:t=0,threshold:s=.15,rootMargin:i="0px 0px -10% 0px",className:o="",style:d={},...p}){const x=c.useRef(null);return c.useEffect(()=>{if(x.current)return t&&(x.current.style.transitionDelay=`${t}s`),ta(x.current,{threshold:s,rootMargin:i})},[t,s,i]),e.jsxs(n,{ref:x,className:`reveal reveal-${r} ${o}`,style:d,...p,children:[a,e.jsx("style",{children:`
        .reveal {
          opacity: 0;
          transition:
            opacity 0.9s cubic-bezier(.2,.7,.2,1),
            transform 0.9s cubic-bezier(.2,.7,.2,1),
            filter 0.9s cubic-bezier(.2,.7,.2,1);
          will-change: opacity, transform, filter;
        }
        .reveal.in-view {
          opacity: 1;
          transform: none !important;
          filter: none !important;
        }
        .reveal-slideUp    { transform: translate3d(0, 30px, 0); }
        .reveal-slideRight { transform: translate3d(-40px, 0, 0); }
        .reveal-slideLeft  { transform: translate3d(40px, 0, 0); }
        .reveal-fadeIn     { /* solo opacity */ }
        .reveal-zoomIn     { transform: scale(0.95); }
        .reveal-blurIn     { filter: blur(12px); opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }
      `})]})}function P({children:a,as:n="div",max:r=14,scale:t=1.03,glow:s=!0,glowColor:i="rgba(183, 168, 217, 0.45)",className:o="",style:d={},...p}){const x=ea({max:r,scale:t,glow:s});return e.jsxs(n,{ref:x,className:`tilt-card ${o}`,style:{transformStyle:"preserve-3d",transition:"transform 0.05s linear, box-shadow 0.3s ease",position:"relative",...d},...p,children:[a,s&&e.jsx("div",{className:"tilt-glow","aria-hidden":"true"}),e.jsx("style",{children:`
        .tilt-card { --tilt-x: 50%; --tilt-y: 50%; }
        .tilt-card .tilt-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(circle at var(--tilt-x) var(--tilt-y), ${i} 0%, transparent 45%);
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
          z-index: 0;
        }
        .tilt-card:hover .tilt-glow { opacity: 1; }
        .tilt-card > * { position: relative; z-index: 1; }
        @media (prefers-reduced-motion: reduce) {
          .tilt-card { transform: none !important; }
          .tilt-card .tilt-glow { display: none; }
        }
        @media (hover: none) {
          /* En táctil sin tilt 3D para no marear */
          .tilt-card .tilt-glow { display: none; }
        }
      `})]})}function ia({children:a,speed:n=28,reverse:r=!1,pauseOnHover:t=!0,className:s="",style:i={}}){return e.jsxs("div",{className:`marquee-wrap ${s}`,style:i,"aria-hidden":"true",children:[e.jsxs("div",{className:`marquee-track ${r?"reverse":""} ${t?"pause-hover":""}`,style:{animationDuration:`${n}s`},children:[e.jsx("div",{className:"marquee-group",children:a}),e.jsx("div",{className:"marquee-group",children:a})]}),e.jsx("style",{children:`
        .marquee-wrap {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .marquee-wrap::before,
        .marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrap::before {
          left: 0;
          background: linear-gradient(to right, rgba(255,250,245,1), transparent);
        }
        .marquee-wrap::after {
          right: 0;
          background: linear-gradient(to left, rgba(255,250,245,1), transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeRoll linear infinite;
        }
        .marquee-track.reverse { animation-direction: reverse; }
        .marquee-track.pause-hover:hover { animation-play-state: paused; }
        .marquee-group {
          display: flex;
          align-items: center;
          gap: 36px;
          padding: 0 18px;
        }
        @keyframes marqueeRoll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `})]})}const oa=[{icon:"📝",accent:"azul",title:"Evaluación breve",text:"Veinte preguntas en aproximadamente siete a diez minutos."},{icon:"📊",accent:"oro",title:"Resultado informativo",text:"Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas."},{icon:"🌿",accent:"mint",title:"Recomendaciones personalizadas",text:"Acciones de autocuidado y vinculación con actividades universitarias."},{icon:"🏛",accent:"coral",title:"Recursos universitarios",text:"Orientación psicológica, deporte, cultura, comunidad y bienestar verde."},{icon:"🤝",accent:"lavanda",title:"IA con responsabilidad",text:"Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional."}],ca=[{icon:"🧠",tone:"azul",label:"Psicología"},{icon:"⚖️",tone:"oro",label:"Equilibrio"},{icon:"🌿",tone:"mint",label:"Calma"},{icon:"🤝",tone:"coral",label:"Comunidad"},{icon:"✨",tone:"lavanda",label:"AURA"},{icon:"🎨",tone:"rosa",label:"Arte"},{icon:"🏃",tone:"durazno",label:"Deporte"},{icon:"📚",tone:"azul",label:"Estudio"},{icon:"💛",tone:"peach",label:"Bienestar"}];function la(){return e.jsxs(e.Fragment,{children:[e.jsx(aa,{}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",children:[e.jsx(C,{variant:"slideUp",children:e.jsxs("div",{className:"text-center",style:{maxWidth:640,margin:"0 auto"},children:[e.jsx("span",{className:"tag lavanda",children:"Áreas que acompañamos"}),e.jsxs("h2",{className:"mt-2",style:{fontSize:"clamp(1.3rem, 2vw, 1.8rem)"},children:[e.jsx(L,{splitBy:"word",stagger:.07,children:"Lo que cuida"})," ",e.jsx(D,{variant:"aurora",speed:5,children:"AURA"})]})]})}),e.jsx("div",{className:"areas-grid",children:ca.map((a,n)=>e.jsx(C,{variant:"slideUp",delay:.06*n,children:e.jsxs(P,{className:`area-chip area-${a.tone}`,max:18,scale:1.05,glowColor:"rgba(157,123,217,0.35)",children:[e.jsx("span",{className:"area-icon","aria-hidden":"true",children:a.icon}),e.jsx("span",{className:"area-label",children:a.label})]})},a.label))}),e.jsx("style",{children:`
            .areas-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
              gap: 12px;
              margin-top: 22px;
              max-width: 980px;
              margin-left: auto;
              margin-right: auto;
            }
            .area-chip {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 14px 18px;
              border-radius: 16px;
              background: rgba(255,255,255,0.85);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(255,255,255,0.6);
              box-shadow: 0 4px 14px rgba(108,80,124,0.06);
              font-weight: 600;
              transition: transform 0.25s ease, box-shadow 0.25s ease;
            }
            .area-chip:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(108,80,124,0.12); }
            .area-icon { font-size: 1.4rem; }
            .area-label { font-family: var(--ff-serif); font-size: 1rem; }

            .area-azul    { color: var(--c-azul-800);     border-color: rgba(16,36,62,0.18); }
            .area-oro     { color: var(--c-oro-700);      border-color: rgba(201,162,39,0.30); }
            .area-mint    { color: var(--c-mint-700);     border-color: rgba(125,196,174,0.45); }
            .area-coral   { color: var(--c-coral-700);    border-color: rgba(232,130,107,0.40); }
            .area-lavanda { color: var(--c-lavanda-700);  border-color: rgba(157,123,217,0.35); }
            .area-rosa    { color: var(--c-rosa-700);     border-color: rgba(232,130,159,0.40); }
            .area-durazno { color: var(--c-durazno-700);  border-color: rgba(224,172,74,0.40); }
            .area-peach   { color: var(--c-peach-700);    border-color: rgba(255,154,123,0.40); }

            @media (max-width: 540px) {
              .areas-grid { grid-template-columns: repeat(2, 1fr); }
              .area-chip { padding: 11px 14px; }
              .area-label { font-size: 0.92rem; }
              .area-icon { font-size: 1.2rem; }
            }
          `})]})}),e.jsx("section",{className:"section-sm",style:{padding:"8px 0 24px"},children:e.jsxs(ia,{speed:36,children:[e.jsx("span",{style:{fontFamily:"var(--ff-serif)",fontSize:"1.2rem",color:"var(--c-lavanda-700)"},children:"✦ Respira"}),e.jsx("span",{style:{fontFamily:"var(--ff-serif)",fontSize:"1.2rem",color:"var(--c-peach-700)"},children:"✦ Cuida tu cuerpo"}),e.jsx("span",{style:{fontFamily:"var(--ff-serif)",fontSize:"1.2rem",color:"var(--c-mint-700)"},children:"✦ Habla con alguien"}),e.jsx("span",{style:{fontFamily:"var(--ff-serif)",fontSize:"1.2rem",color:"var(--c-coral-700)"},children:"✦ No estás solo"}),e.jsx("span",{style:{fontFamily:"var(--ff-serif)",fontSize:"1.2rem",color:"var(--c-durazno-700)"},children:"✦ Una pausa es válida"}),e.jsx("span",{style:{fontFamily:"var(--ff-serif)",fontSize:"1.2rem",color:"var(--c-rosa-700)"},children:"✦ Pide ayuda cuando la necesites"}),e.jsx("span",{style:{fontFamily:"var(--ff-serif)",fontSize:"1.2rem",color:"var(--c-azul-800)"},children:"✦ Tu bienestar importa"})]})}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",style:{maxWidth:980},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsx(P,{max:8,scale:1.02,glow:!1,children:e.jsx(ra,{})}),e.jsx(P,{max:8,scale:1.02,glow:!1,children:e.jsx(sa,{})})]}),e.jsx("style",{children:`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `})]})}),e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsx(C,{variant:"slideUp",children:e.jsxs("div",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Cómo te acompaña AURA"}),e.jsxs("h2",{className:"mt-2",children:[e.jsx(L,{splitBy:"word",stagger:.05,children:"Una orientación clara,"})," ",e.jsx(D,{variant:"sunset",speed:6,children:"anónima"})," ",e.jsx(L,{splitBy:"word",stagger:.05,delay:.3,children:"y con sentido comunitario"})]}),e.jsx("p",{className:"lede",children:"AURA es una plataforma para reflexionar sobre tu bienestar emocional, identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM."})]})}),e.jsx("div",{className:"pillars",children:oa.map((a,n)=>e.jsx(C,{variant:"slideUp",delay:.12*n,children:e.jsx(P,{max:10,scale:1.025,glowColor:"rgba(255,184,156,0.35)",children:e.jsx(na,{icon:a.icon,title:a.title,accent:a.accent,children:a.text})})},a.title))}),e.jsx(C,{variant:"zoomIn",delay:.1,children:e.jsxs("div",{className:"continuity-card",children:[e.jsx("div",{className:"continuity-icon","aria-hidden":"true",children:"🔁"}),e.jsxs("div",{children:[e.jsx("span",{className:"tag sage",children:"¿Quieres seguir cuidándote?"}),e.jsx("h3",{className:"mt-2",children:"Tu código anónimo te abre un rincón propio"}),e.jsxs("p",{children:["Si guardas tu código (ej. ",e.jsx("code",{children:"SIN-XXX-####"}),") puedes regresar cuando quieras y obtener acceso a:"]}),e.jsxs("ul",{className:"continuity-list",children:[e.jsxs("li",{children:["📝 ",e.jsx("strong",{children:"Check-in semanal"})," de 30 segundos"]}),e.jsxs("li",{children:["📔 ",e.jsx("strong",{children:"Diario emocional"})," rápido (1 línea/día)"]}),e.jsxs("li",{children:["🛤 ",e.jsx("strong",{children:"Ruta de bienestar"})," de 7 o 14 días personalizada"]}),e.jsxs("li",{children:["🤝 ",e.jsx("strong",{children:"Pum-AI acompañante"})," para conversar cuando lo necesites"]}),e.jsxs("li",{children:["📚 ",e.jsx("strong",{children:"Biblioteca"})," de respiraciones, sonidos y videos"]}),e.jsxs("li",{children:["🗺 ",e.jsx("strong",{children:"Aventura"})," con pistas en el campus"]}),e.jsxs("li",{children:["🌳 ",e.jsx("strong",{children:"Adopta un árbol"})," y cuídalo"]}),e.jsxs("li",{children:["🫂 ",e.jsx("strong",{children:"Buddy anónimo"})," para conectar con otra persona"]}),e.jsxs("li",{children:["📅 ",e.jsx("strong",{children:"Calendario"})," de eventos universitarios"]}),e.jsxs("li",{children:["📊 ",e.jsx("strong",{children:"Tu evolución"})," a lo largo del tiempo"]})]}),e.jsxs("p",{className:"note",children:["Sigue siendo ",e.jsx("strong",{children:"100% anónimo"}),": solo tu código y, si quieres, una contraseña. Nada de nombre, correo ni datos personales."]}),e.jsxs("div",{className:"continuity-actions",children:[e.jsx(N,{to:"/mi-historia",className:"btn btn-gold",children:"Crear mi código anónimo"}),e.jsx(N,{to:"/consentimiento",className:"btn btn-ghost",children:"Solo hacer el test"})]})]})]})})]}),e.jsx("style",{children:`
          .continuity-card {
            background: linear-gradient(135deg, var(--c-azul-100), var(--c-salvia-100));
            border: 1px solid rgba(255,184,156,0.4);
            border-radius: var(--r-xl);
            padding: 32px;
            margin-top: 28px;
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: start;
          }
          .continuity-icon {
            width: 72px; height: 72px;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
            display: grid; place-items: center;
            font-size: 2rem;
          }
          .continuity-card h3 {
            font-size: 1.4rem;
            color: var(--c-azul-800);
          }
          .continuity-list {
            list-style: none;
            padding: 0;
            margin: 14px 0 16px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 6px 16px;
          }
          .continuity-list li {
            font-size: 0.94rem;
            color: var(--c-texto);
          }
          .continuity-actions {
            display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;
          }
          @media (max-width: 720px) {
            .continuity-card { grid-template-columns: 1fr; padding: 22px; }
            .continuity-icon { width: 60px; height: 60px; font-size: 1.6rem; }
          }
        `})]}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"cta-band",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"¿Listo para iniciar?"}),e.jsx("p",{children:"La orientación es anónima. No solicitamos nombre, correo, teléfono ni número de cuenta. Tus respuestas se procesan para devolverte un panorama útil y recomendaciones."})]}),e.jsxs("div",{className:"cta-actions",children:[e.jsx(N,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(N,{to:"/recursos",className:"btn btn-ghost",children:"Ver recursos de apoyo"})]})]}),e.jsx("div",{className:"mt-4",children:e.jsx(W,{})})]})}),e.jsx("style",{children:`
        .pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 28px;
        }
        .cta-band {
          background: linear-gradient(135deg, var(--c-azul-100), var(--c-oro-100));
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          padding: 36px;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
        @media (max-width: 740px) {
          .cta-band { grid-template-columns: 1fr; padding: 24px; }
          .cta-actions { justify-content: flex-start; }
        }
      `})]})}function da(){const a=B(),[n,r]=c.useState(!1);function t(){n&&(sessionStorage.setItem(q.CONSENT,JSON.stringify({accepted:!0,timestamp:new Date().toISOString()})),a("/evaluacion"))}return e.jsxs("section",{className:"section",children:[e.jsx("div",{className:"container",style:{maxWidth:820},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag",children:"Antes de iniciar"}),e.jsx("h1",{className:"mt-2",children:"Consentimiento informado"}),e.jsx("p",{className:"lede",children:"Antes de comenzar, te invitamos a leer las siguientes consideraciones. Tu participación es libre y puedes detenerla en cualquier momento."}),e.jsx("h2",{className:"mt-4",children:"¿Qué es AURA?"}),e.jsxs("p",{children:["AURA es una herramienta ",e.jsx("strong",{children:"informativa"})," de orientación para el bienestar emocional.",e.jsx("strong",{children:" No es un servicio médico, terapéutico ni de atención clínica."}),"Su propósito es ayudarte a reflexionar sobre cómo te has sentido y conocer recursos de apoyo dentro de la universidad."]}),e.jsx("h2",{className:"mt-4",children:"¿Qué pasará con tus respuestas?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"No te pediremos datos personales"}),": ni nombre, ni correo, ni teléfono, ni número de cuenta, ni cualquier información que te identifique directamente."]}),e.jsxs("li",{children:["Generamos un ",e.jsx("strong",{children:"código anónimo"})," (por ejemplo: SIN-KQT-2856) que tú decides guardar si quieres consultar tu resultado más tarde."]}),e.jsxs("li",{children:["Tus respuestas se almacenan de forma ",e.jsx("strong",{children:"anónima y agregada"})," con fines de mejora del programa y análisis estadístico."]}),e.jsxs("li",{children:["Para generar tu orientación amigable, enviamos a un modelo de inteligencia artificial",e.jsx("strong",{children:" únicamente datos agregados"})," (puntajes y dimensiones), nunca información personal."]})]}),e.jsx("h2",{className:"mt-4",children:"Limitaciones"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["El resultado es ",e.jsx("strong",{children:"informativo, no diagnóstico"}),"."]}),e.jsx("li",{children:"No reemplaza la atención psicológica o médica profesional."}),e.jsx("li",{children:"Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios de orientación."})]}),e.jsxs(W,{variant:"gold",children:["Si en este momento estás atravesando una crisis o piensas en hacerte daño, comunícate de inmediato a la ",e.jsx("strong",{children:"Línea de la Vida: 800 290 0024"})," (24 horas, gratuito)."]}),e.jsx("div",{className:"consent-box mt-4",children:e.jsxs("label",{className:"consent-label",children:[e.jsx("input",{type:"checkbox",checked:n,onChange:s=>r(s.target.checked)}),e.jsx("span",{children:"He leído y acepto continuar con esta orientación informativa."})]})}),e.jsxs("div",{className:"actions mt-4",children:[e.jsx("button",{type:"button",className:"btn btn-primary btn-lg",onClick:t,disabled:!n,children:"Continuar →"}),e.jsx(N,{to:"/",className:"btn btn-ghost",children:"Volver al inicio"})]})]})}),e.jsx("style",{children:`
        .consent-box {
          background: var(--c-azul-100);
          border-radius: 14px;
          padding: 16px 18px;
        }
        .consent-label {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-weight: 500;
          color: var(--c-texto);
          cursor: pointer;
        }
        .consent-label input { margin-top: 4px; transform: scale(1.2); accent-color: var(--c-azul-800); }
        .actions { display: flex; gap: 12px; flex-wrap: wrap; }
      `})]})}function ua({current:a,total:n}){const r=n?Math.round(a/n*100):0;return e.jsxs("div",{className:"progress-wrap","aria-label":`Progreso ${r}%`,children:[e.jsxs("div",{className:"progress-meta",children:[e.jsxs("span",{children:["Pregunta ",e.jsx("strong",{children:a})," de ",e.jsx("strong",{children:n})]}),e.jsxs("span",{children:[r,"%"]})]}),e.jsx("div",{className:"progress-bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":r,children:e.jsx("span",{style:{width:`${r}%`}})})]})}const le=[{id:"estado_emocional",label:"Estado emocional"},{id:"estres_academico",label:"Estrés académico"},{id:"sueno_descanso",label:"Sueño y descanso"},{id:"apoyo_social",label:"Convivencia y apoyo social"},{id:"motivacion_pertenencia",label:"Motivación y pertenencia"}],de=[{id:"q01",sort_order:1,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?"},{id:"q02",sort_order:2,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"¿Has sentido nervios o preocupación que te cuesta calmar?"},{id:"q03",sort_order:3,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has logrado disfrutar momentos pequeños de tu día a día?"},{id:"q04",sort_order:4,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?"},{id:"q05",sort_order:5,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Has sentido que tus actividades académicas o personales te rebasan?"},{id:"q06",sort_order:6,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Te ha costado concentrarte al estudiar o atender tus clases?"},{id:"q07",sort_order:7,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?"},{id:"q08",sort_order:8,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has podido afrontar exámenes o entregas con relativa calma?"},{id:"q09",sort_order:9,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?"},{id:"q10",sort_order:10,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has mantenido un horario de sueño relativamente constante?"},{id:"q11",sort_order:11,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Te has despertado cansado(a) o con poca energía?"},{id:"q12",sort_order:12,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?"},{id:"q13",sort_order:13,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has contado con alguien con quien hablar cuando lo necesitas?"},{id:"q14",sort_order:14,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has compartido tiempo con familiares o amistades que te hacen bien?"},{id:"q15",sort_order:15,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Te has sentido solo(a) o con poca conexión con quienes te rodean?"},{id:"q16",sort_order:16,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Has evitado actividades sociales que antes disfrutabas?"},{id:"q17",sort_order:17,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has sentido motivación para participar en tus actividades universitarias?"},{id:"q18",sort_order:18,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?"},{id:"q19",sort_order:19,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Te has sentido parte de tu comunidad universitaria?"},{id:"q20",sort_order:20,dimension:"motivacion_pertenencia",is_reverse_scored:!1,question_text:"¿Has perdido interés o entusiasmo por metas que antes te importaban?"}],ma=[{value:0,label:"Nunca"},{value:1,label:"Casi nunca"},{value:2,label:"Algunas veces"},{value:3,label:"Frecuentemente"},{value:4,label:"Casi siempre"}];function pa({question:a,value:n,onChange:r,index:t}){return e.jsxs("article",{className:"question-card",children:[e.jsxs("span",{className:"question-number",children:["PREGUNTA ",t+1]}),e.jsx("h2",{className:"question-text",children:a.question_text}),e.jsx("div",{className:"options",role:"radiogroup","aria-label":"Opciones de respuesta",children:ma.map(s=>e.jsxs("button",{type:"button",role:"radio","aria-checked":n===s.value,className:`option ${n===s.value?"selected":""}`,onClick:()=>r(s.value),children:[e.jsx("span",{className:"opt-mark","aria-hidden":"true"}),e.jsx("span",{children:s.label})]},s.value))})]},a.id)}const en=[{id:"orientacion_psicologica",label:"Orientación psicológica",icon:"🧠"},{id:"tutoria_academica",label:"Tutoría académica",icon:"📚"},{id:"deporte",label:"Actividades deportivas",icon:"🏃"},{id:"cultura",label:"Actividades culturales",icon:"🎭"},{id:"comunidad",label:"Integración comunitaria",icon:"🤝"},{id:"medico",label:"Servicios médicos",icon:"🩺"},{id:"emergencia",label:"Atención de emergencia",icon:"☎️"},{id:"sustentabilidad",label:"Bienestar verde",icon:"🌿"}],ue=[{id:"r-uepi",name:"Unidad de Evaluación Psicológica Iztacala (UEPI)",type:"orientacion_psicologica",description:"Acompañamiento psicológico para la comunidad universitaria. Atención individual y grupal.",audience:"Estudiantes UNAM",modality:"Presencial / a distancia",location:"FES Iztacala",schedule:"Lunes a viernes, 9:00 a 17:00",contact:"uepi@iztacala.unam.mx",tags:["psicología","atención","orientación"]},{id:"r-tutorias",name:"Programa Institucional de Tutorías",type:"tutoria_academica",description:"Tutorías académicas y de trayectoria escolar. Acompañamiento para mejorar tu desempeño.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu facultad o escuela",schedule:"Según agenda del tutor",contact:"Coordinación de tutorías de tu plantel",tags:["académico","tutoría","desempeño"]},{id:"r-deporte",name:"Activación física comunitaria",type:"deporte",description:"Sesiones abiertas de yoga, baile y movimiento físico en explanadas universitarias.",audience:"Comunidad UNAM",modality:"Presencial",location:"Explanadas en distintos planteles",schedule:"Martes y jueves, 8:00",contact:"Difusión cultural y deportiva",tags:["deporte","movimiento","comunidad"]},{id:"r-cultura",name:"Talleres culturales",type:"cultura",description:"Talleres de música, escritura, pintura, teatro y otros oficios artísticos abiertos a estudiantes.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Casa del Tiempo y centros culturales",schedule:"Calendario semestral",contact:"Difusión cultural UNAM",tags:["arte","cultura","comunidad"]},{id:"r-comunidad",name:"Círculos de bienestar AURA",type:"comunidad",description:"Encuentros guiados para compartir experiencias y construir comunidad.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu plantel",schedule:"Miércoles 17:00",contact:"sintonia@unam.mx",tags:["comunidad","apoyo","pertenencia"]},{id:"r-medico",name:"Servicios médicos universitarios",type:"medico",description:"Consulta médica general gratuita para personal y estudiantes.",audience:"Comunidad UNAM",modality:"Presencial",location:"Centros médicos por plantel",schedule:"Lunes a viernes",contact:"Servicios médicos de tu plantel",tags:["salud","medicina","consulta"]},{id:"r-emergencia",name:"Línea de la Vida (24/7)",type:"emergencia",description:"Servicio de orientación emocional gratuito y confidencial, disponible las 24 horas.",audience:"Cualquier persona",modality:"Telefónica",location:"Nacional",schedule:"24 horas, todos los días",contact:"800 290 0024",tags:["emergencia","crisis","apoyo inmediato"]},{id:"r-sustenta",name:"Bienestar verde — caminatas y jardines",type:"sustentabilidad",description:"Actividades en espacios verdes de Ciudad Universitaria: caminatas, jardines polinizadores, talleres de plantas medicinales.",audience:"Comunidad UNAM",modality:"Presencial",location:"Ciudad Universitaria",schedule:"Sábados 10:00",contact:"sustentabilidad@unam.mx",tags:["sustentabilidad","naturaleza","autocuidado"]}],Q=[{dimension:"estado_emocional",level:"bajo",title:"Sigue cultivando tus rutinas de bienestar",description:"Tus respuestas sugieren un buen equilibrio emocional. Mantener pequeñas pausas, gratitud diaria o momentos de movimiento te ayudará a sostenerlo."},{dimension:"estado_emocional",level:"moderado",title:"Espacio para reconocer tus emociones",description:"Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva."},{dimension:"estado_emocional",level:"prioritario",title:"Acércate a un servicio universitario de orientación",description:"Sentir tristeza o nervios sostenidos amerita acompañamiento. Te recomendamos contactar los servicios de orientación psicológica de tu plantel."},{dimension:"estres_academico",level:"bajo",title:"Tu carga académica parece manejable",description:"Conserva tus rutinas de organización. Una agenda y bloques de estudio cortos pueden sostener este ritmo."},{dimension:"estres_academico",level:"moderado",title:"Pequeños ajustes para liberar presión",description:"Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora de estudio."},{dimension:"estres_academico",level:"prioritario",title:"Considera apoyo académico y orientación",description:"Sentirte rebasado(a) puede afectar tu desempeño y tu salud. Las tutorías académicas y la orientación universitaria pueden ser un buen primer paso."},{dimension:"sueno_descanso",level:"bajo",title:"Tu descanso es un recurso valioso",description:"Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia."},{dimension:"sueno_descanso",level:"moderado",title:"Refuerza tu higiene del sueño",description:"Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía."},{dimension:"sueno_descanso",level:"prioritario",title:"El descanso necesita atención",description:"Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios para descartar causas atendibles."},{dimension:"apoyo_social",level:"bajo",title:"Tu red de apoyo te acompaña",description:"Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti."},{dimension:"apoyo_social",level:"moderado",title:"Reconecta con personas de confianza",description:"Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias universitarias también ayudan."},{dimension:"apoyo_social",level:"prioritario",title:"Buscar compañía es un acto de cuidado",description:"Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas universitarias y, si lo prefieres, a grupos de orientación."},{dimension:"motivacion_pertenencia",level:"bajo",title:"Tu motivación es un buen aliado",description:"Conserva los proyectos y actividades que te dan propósito. Compartir lo que disfrutas con otros lo amplifica."},{dimension:"motivacion_pertenencia",level:"moderado",title:"Reactiva pequeños propósitos",description:"Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus."},{dimension:"motivacion_pertenencia",level:"prioritario",title:"Espacios universitarios para reencontrarte",description:"Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia. Acércate a las actividades comunitarias de tu facultad."}];function xa(a){return Q.filter(n=>{var r;return((r=a[n.dimension])==null?void 0:r.level)===n.level})}async function ha(){if(!R)return de;const{data:a,error:n}=await S.from("questions").select("id, dimension, question_text, is_reverse_scored, sort_order").eq("active",!0).order("sort_order");return n||!a||a.length===0?(n&&console.warn("[supabase] questions →",n.message),de):a}async function an(){if(!R)return ue;const{data:a,error:n}=await S.from("resources").select("*").eq("active",!0).order("name");return n||!a||a.length===0?(n&&console.warn("[supabase] resources →",n.message),ue):a}async function fa(){if(!R)return Q;const{data:a,error:n}=await S.from("recommendations").select("dimension, level, title, description").eq("active",!0);return n||!a||a.length===0?(n&&console.warn("[supabase] recommendations →",n.message),Q):a}async function ga(a){if(!R)return{saved:!1,id:null};const n=window.crypto&&crypto.randomUUID?crypto.randomUUID():"sin-"+Date.now()+"-"+Math.random().toString(36).slice(2,10),{error:r}=await S.from("assessment_sessions").insert({id:n,...a});return r?(console.warn("[supabase] saveSession →",r.message),{saved:!1,error:r.message,id:n}):{saved:!0,id:n}}async function va(a,n){if(!R||!a)return{saved:!1};const r=n.map(s=>({session_id:a,...s})),{error:t}=await S.from("assessment_answers").insert(r);return t?(console.warn("[supabase] saveAnswers →",t.message),{saved:!1,error:t.message}):{saved:!0}}async function nn(){if(!R)return{ok:!1,reason:"not_configured"};try{const{error:a}=await S.from("questions").select("id",{head:!0,count:"exact"});return a?{ok:!1,reason:a.message}:{ok:!0}}catch(a){return{ok:!1,reason:a.message}}}const F=4;function ba(a,n){const r=Math.max(0,Math.min(F,Number(n)));return a.is_reverse_scored?(F-r)/F:r/F}function X(a){return a<=se.bajo.max?"bajo":a<=se.moderado.max?"moderado":"prioritario"}function ya(a,n){var m;const r=Object.create(null);for(const h of le)r[h.id]={sum:0,n:0};let t=0,s=0;const i={};for(const h of a){const l=n[h.id];if(l==null)continue;const u=ba(h,l);i[h.id]=u,r[h.dimension]||(r[h.dimension]={sum:0,n:0}),r[h.dimension].sum+=u,r[h.dimension].n+=1,t+=u,s+=1}const o={};for(const[h,l]of Object.entries(r)){const u=l.n?Math.round(l.sum/l.n*100):0;o[h]={score:u,level:X(u),level_label:K[X(u)],label:((m=le.find(f=>f.id===h))==null?void 0:m.label)||h}}const d=s?Math.round(t/s*100):0,p=X(d),x=Object.entries(o).filter(([,h])=>h.level!=="bajo").sort((h,l)=>l[1].score-h[1].score).map(([h,l])=>({id:h,label:l.label,score:l.score,level:l.level}));return{total_score:d,general_level:p,general_level_label:K[p],dimensions:o,top_attention_areas:x,normalized_by_question:i}}const ja="ABCDEFGHJKLMNPQRSTUVWXYZ",wa="23456789";function me(a,n){let r="";const t=new Uint32Array(n);crypto.getRandomValues(t);for(let s=0;s<n;s++)r+=a[t[s]%a.length];return r}function _e(){return`SIN-${me(ja,3)}-${me(wa,4)}`}async function _a(a){if(!R)return null;try{const{data:n,error:r}=await S.functions.invoke(ge,{body:a});return r?(console.warn("[gemini] error →",r.message),null):!n||typeof n!="object"||n.error?null:n}catch(n){return console.warn("[gemini] excepción →",n.message),null}}async function rn(){if(!R)return{ok:!1,reason:"not_configured"};try{const{error:a}=await S.functions.invoke(ge,{body:{ping:!0}});return{ok:!a,reason:a==null?void 0:a.message}}catch(a){return{ok:!1,reason:a.message}}}async function Na({questions:a,answers:n,anonymousCode:r}){const t=ya(a,n),s=r||_e(),i={anonymous_code:s,test_version:re,total_score:t.total_score,general_level:t.general_level,dimension_scores:t.dimensions,top_attention_areas:t.top_attention_areas},{id:o}=await ga(i);if(o){const x=Object.entries(n).map(([m,h])=>({question_id:m,answer_value:Number(h),normalized_value:t.normalized_by_question[m]??null}));await va(o,x)}const d=await fa(),p=await _a({session_id:o,test_version:re,general_level:t.general_level,dimensions:t.dimensions,top_attention_areas:t.top_attention_areas,recommendation_catalog:d.slice(0,30)});return{session_id:o||null,anonymous_code:s,created_at:new Date().toISOString(),...t,ai:p||null,base_recommendations:d}}function Sa(){const a=B(),[n,r]=c.useState([]),[t,s]=c.useState({}),[i,o]=c.useState(0),[d,p]=c.useState(!0),[x,m]=c.useState(!1),[h,l]=c.useState(null);c.useEffect(()=>{if(!sessionStorage.getItem(q.CONSENT)){a("/consentimiento",{replace:!0});return}let k=!0;return ha().then(z=>{if(k){r(z);try{const M=sessionStorage.getItem(q.ANSWERS);M&&s(JSON.parse(M))}catch{}p(!1)}}),()=>{k=!1}},[]),c.useEffect(()=>{if(!d)try{sessionStorage.setItem(q.ANSWERS,JSON.stringify(t))}catch{}},[t,d]);const u=n.length,f=n[i],v=c.useMemo(()=>n.every(y=>t[y.id]!==void 0),[n,t]);function b(y){f&&s(k=>({...k,[f.id]:y}))}function j(){i<u-1&&o(y=>y+1)}function _(){i>0&&o(y=>y-1)}async function A(){if(!v){const y=n.findIndex(k=>t[k.id]===void 0);y!==-1&&o(y);return}m(!0),l(null);try{const y=_e(),k=await Na({questions:n,answers:t,anonymousCode:y});sessionStorage.setItem(q.RESULT,JSON.stringify(k)),sessionStorage.setItem(q.ANON_CODE,y),sessionStorage.removeItem(q.ANSWERS),a("/resultado")}catch(y){console.error(y),l("No pudimos generar tu resultado en este momento. Intenta nuevamente en unos segundos.")}finally{m(!1)}}return d?e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{maxWidth:720,textAlign:"center"},children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto 18px"}}),e.jsx("p",{className:"lede",children:"Preparando preguntas…"})]})}):e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:820},children:[e.jsx(ua,{current:i+1,total:u}),f&&e.jsx(pa,{index:i,question:f,value:t[f.id],onChange:b}),e.jsxs("div",{className:"assess-actions mt-3",children:[e.jsx("button",{className:"btn btn-ghost",onClick:_,disabled:i===0,children:"← Anterior"}),i<u-1?e.jsx("button",{className:"btn btn-primary",onClick:j,disabled:t[f==null?void 0:f.id]===void 0,children:"Siguiente →"}):e.jsx("button",{className:"btn btn-coral btn-lg",onClick:A,disabled:x||!v,children:x?"Generando orientación…":"Finalizar y ver resultado"})]}),!v&&i===u-1&&e.jsx("p",{className:"note text-center mt-3",children:'Te faltan algunas preguntas por contestar. Usa "Anterior" para revisarlas.'}),h&&e.jsx("div",{className:"mt-4",children:e.jsx(W,{variant:"warm",children:h})}),e.jsx("p",{className:"text-center mt-4",children:e.jsx(N,{to:"/",className:"note",children:"Salir y descartar respuestas"})})]}),e.jsx("style",{children:`
        .assess-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
      `})]})}function ka({result:a}){if(!a)return null;const{total_score:n,general_level_label:r,anonymous_code:t,ai:s}=a;return e.jsx("section",{className:"result-card",children:e.jsxs("div",{className:"result-hero",children:[e.jsxs("div",{className:"result-score",children:[e.jsx(U,{as:"span",to:Number(n)||0,duration:1800,className:"result-score-num"}),e.jsx("span",{className:"result-score-label",children:"/ 100"})]}),e.jsxs("div",{className:"result-meta",children:[e.jsx("span",{className:"tag",children:"Tu orientación"}),e.jsx("h1",{className:"mt-2",children:e.jsx(D,{variant:"aurora",speed:6,children:r})}),e.jsx("p",{className:"result-summary",children:s!=null&&s.friendly_summary?e.jsx(L,{splitBy:"word",stagger:.018,delay:.2,children:s.friendly_summary}):"Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico."}),t&&e.jsxs("p",{className:"anon-code",children:["Tu código anónimo: ",e.jsx("strong",{children:t}),e.jsx("small",{children:"Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde."})]})]})]})})}function Ea({dimensions:a}){const n=Object.entries(a),[r,t]=G();return e.jsxs("div",{ref:r,className:"dim-chart",role:"list",children:[n.map(([s,i],o)=>e.jsxs("div",{className:"dim-row",role:"listitem",style:{animationDelay:`${o*.08}s`},children:[e.jsx("div",{className:"dim-label",children:i.label}),e.jsx("div",{className:"dim-track","aria-label":`Puntaje ${i.score} de 100`,children:e.jsx("span",{className:`dim-fill lvl-bg-${i.level}`,style:{width:t?`${i.score}%`:"0%",transitionDelay:`${.2+o*.12}s`}})}),e.jsxs("div",{className:`dim-value lvl-${i.level}`,children:[e.jsx(U,{to:Number(i.score)||0,duration:1400+o*100}),e.jsx("small",{children:K[i.level]})]})]},s)),e.jsx("style",{children:`
        .dim-fill {
          transition: width 1.4s cubic-bezier(.2,.7,.2,1);
          will-change: width;
        }
        @media (prefers-reduced-motion: reduce) {
          .dim-fill { transition: none !important; }
        }
      `})]})}function Aa({sessionId:a}){const[n,r]=c.useState(0),[t,s]=c.useState(0),[i,o]=c.useState(""),[d,p]=c.useState(!1),[x,m]=c.useState(!1);async function h(){if(n!==0){if(m(!0),R)try{await S.from("assessment_feedback").insert({session_id:a||null,rating:n,comment:i.trim()||null})}catch(l){console.warn(l)}p(!0),m(!1)}}return d?e.jsx("div",{className:"feedback-thanks",children:e.jsxs("p",{children:["✨ ",e.jsx("strong",{children:"Gracias por tu retroalimentación."})," Nos ayuda a mejorar el programa."]})}):e.jsxs("div",{className:"feedback-box",children:[e.jsx("h3",{children:"¿Cómo te pareció esta orientación?"}),e.jsx("div",{className:"stars",role:"radiogroup","aria-label":"Calificación",children:[1,2,3,4,5].map(l=>e.jsx("button",{type:"button",role:"radio","aria-checked":n===l,className:`star ${(t||n)>=l?"active":""}`,onMouseEnter:()=>s(l),onMouseLeave:()=>s(0),onClick:()=>r(l),children:"★"},l))}),e.jsx("textarea",{placeholder:"Comentario opcional…",value:i,onChange:l=>o(l.target.value),rows:2}),e.jsx("button",{className:"btn btn-primary btn-sm",disabled:n===0||x,onClick:h,children:x?"Enviando…":"Enviar"}),e.jsx("style",{children:`
        .feedback-box {
          background: var(--c-marfil);
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          margin-top: 16px;
          text-align: center;
        }
        .feedback-box h3 { margin: 0 0 10px; color: var(--c-azul-800); font-size: 1.05rem; }
        .stars { display: inline-flex; gap: 4px; margin-bottom: 10px; }
        .star {
          background: transparent;
          border: 0;
          cursor: pointer;
          font-size: 2rem;
          color: var(--c-borde);
          transition: color var(--t), transform var(--t);
        }
        .star:hover { transform: scale(1.15); }
        .star.active { color: var(--c-oro-600); }
        .feedback-box textarea {
          width: 100%;
          margin: 8px 0;
          padding: 8px 12px;
          border: 1px solid var(--c-borde);
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.92rem;
          resize: vertical;
        }
        .feedback-thanks {
          background: var(--c-salvia-100);
          color: #2F8770;
          padding: 14px 18px;
          border-radius: var(--r-md);
          margin-top: 16px;
          text-align: center;
        }
      `})]})}function Ca(){var p,x,m,h;const a=B(),[n,r]=c.useState(null);if(c.useEffect(()=>{try{const l=sessionStorage.getItem(q.RESULT);if(!l)return a("/",{replace:!0});r(JSON.parse(l))}catch{a("/",{replace:!0})}},[a]),!n)return null;const t=((p=n.ai)==null?void 0:p.suggested_actions)||[],s=((x=n.ai)==null?void 0:x.recommended_resources)||[],i=(m=n.ai)==null?void 0:m.safety_note,o=n.base_recommendations?xa(n.dimensions).map(l=>({title:l.title,description:l.description})):[];function d(){var u,f,v;const l=["AURA — Tu orientación",`Código anónimo: ${n.anonymous_code}`,`Nivel general: ${n.general_level_label} (${n.total_score}/100)`,"","Dimensiones:",...Object.entries(n.dimensions).map(([,b])=>`  • ${b.label}: ${b.score} (${b.level_label})`),"",((u=n.ai)==null?void 0:u.friendly_summary)||"",((f=n.ai)==null?void 0:f.safety_note)||"Esta orientación es informativa y no sustituye atención profesional."].join(`
`);(v=navigator.clipboard)==null||v.writeText(l).catch(()=>{})}return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:1e3},children:[e.jsx(C,{variant:"blurIn",children:e.jsx(ka,{result:n})}),n.general_level==="prioritario"&&e.jsx(C,{variant:"slideUp",delay:.1,children:e.jsxs("div",{className:"crisis-banner",children:[e.jsx("strong",{children:"📞 Tus respuestas sugieren acercarte a apoyo profesional."}),e.jsxs("p",{children:["Hay servicios universitarios y la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," disponibles 24/7."]}),e.jsx(N,{to:"/apoyo",className:"btn btn-coral btn-sm",children:"Ver opciones de apoyo →"})]})}),e.jsx(C,{variant:"slideUp",delay:.15,children:e.jsxs("div",{className:"route-cta mt-3",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"✨ Crea tu ruta de bienestar"}),e.jsx("small",{children:"Pum-AI te puede generar un plan diario de 7 o 14 días personalizado a tu resultado."})]}),e.jsx(N,{to:"/ruta",className:"btn btn-gold",children:"Comenzar mi ruta →"})]})}),e.jsx(C,{variant:"fadeIn",delay:.2,children:e.jsx(W,{children:i||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado, pero no constituyen un diagnóstico clínico. Si lo necesitas, acércate a un servicio de orientación universitario."]})})}),e.jsxs("div",{className:"results-grid mt-4",children:[e.jsx(C,{variant:"slideRight",children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag azul",children:"Tus dimensiones"}),e.jsx("h2",{className:"mt-2",children:"Cómo se ve tu bienestar por área"}),e.jsx("p",{className:"lede",children:"Cada barra representa el nivel de atención que sugieren tus respuestas en esa área. Mayor puntaje = mayor invitación al autocuidado."}),e.jsx(Ea,{dimensions:n.dimensions})]})}),e.jsx(C,{variant:"slideLeft",delay:.15,children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag coral",children:"Acciones sugeridas"}),e.jsx("h2",{className:"mt-2",children:"Pasos pequeños y útiles"}),t.length>0?e.jsx("ul",{className:"rec-list",children:t.map((l,u)=>e.jsxs("li",{children:["✦ ",l]},u))}):e.jsxs("ul",{className:"rec-list",children:[o.length===0&&e.jsx("li",{children:"Sigue cultivando tus rutinas de bienestar. Tus respuestas no muestran áreas urgentes hoy."}),o.map((l,u)=>e.jsxs("li",{children:[e.jsxs("strong",{children:[l.title,"."]})," ",l.description]},u))]})]})})]}),e.jsx(C,{variant:"zoomIn",children:e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag mint",children:"Recursos sugeridos"}),e.jsx("h2",{className:"mt-2",children:"Recursos universitarios para ti"}),s.length>0?e.jsx("ul",{className:"rec-list",children:s.map((l,u)=>e.jsxs("li",{children:["📌 ",l]},u))}):e.jsxs("p",{children:["Visita la sección de ",e.jsx(N,{to:"/recursos",children:"Recursos de apoyo"})," para ver el catálogo completo."]})]})}),((h=n.top_attention_areas)==null?void 0:h.length)>0&&e.jsx(C,{variant:"slideUp",children:e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag",children:"Áreas con mayor atención sugerida"}),e.jsx("h2",{className:"mt-2",children:"Dónde poner foco"}),e.jsx("ul",{className:"rec-list",children:n.top_attention_areas.map(l=>e.jsxs("li",{children:[e.jsx("strong",{children:l.label})," — Puntaje: ",l.score,", nivel: ",l.level==="prioritario"?"prioritario":"moderado","."]},l.id))})]})}),e.jsx(C,{variant:"fadeIn",children:e.jsx(Aa,{sessionId:n.session_id})}),e.jsx(C,{variant:"slideUp",delay:.1,children:e.jsxs("div",{className:"results-actions mt-4",children:[e.jsx("button",{className:"btn btn-gold",onClick:d,children:"📋 Copiar resultado"}),e.jsx(N,{to:"/recursos",className:"btn btn-secondary btn-primary",children:"Ver recursos universitarios"}),e.jsx(N,{to:"/evaluacion",className:"btn btn-ghost",children:"Volver a evaluar"}),e.jsx(N,{to:"/",className:"btn btn-ghost",children:"Ir al inicio"})]})})]}),e.jsx("style",{children:`
        .crisis-banner {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border: 2px solid var(--c-coral-500);
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin-top: 16px;
          display: grid; grid-template-columns: 1fr auto;
          gap: 14px; align-items: center;
        }
        .crisis-banner strong { color: #93362A; display: block; font-size: 1.05rem; }
        .crisis-banner p { color: #5C2018; margin: 4px 0 0; font-size: 0.92rem; }
        .route-cta {
          background: linear-gradient(135deg, var(--c-oro-100), var(--c-salvia-100));
          border: 1px solid var(--c-oro-600);
          border-radius: var(--r-md);
          padding: 16px 20px;
          display: grid; grid-template-columns: 1fr auto;
          gap: 14px; align-items: center;
        }
        .route-cta strong { color: var(--c-azul-800); }
        .route-cta small { display: block; color: var(--c-texto-soft); font-size: 0.88rem; margin-top: 2px; }
        @media (max-width: 640px) {
          .crisis-banner, .route-cta { grid-template-columns: 1fr; }
        }
        .results-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }
        .rec-list {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          display: grid;
          gap: 12px;
        }
        .rec-list li {
          padding: 12px 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 12px;
        }
        .results-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 880px) {
          .results-grid { grid-template-columns: 1fr; }
        }
      `})]})}const za=c.lazy(()=>E(()=>import("./Resources-CK_9vmSJ.js"),__vite__mapDeps([0,1,2,3]))),qa=c.lazy(()=>E(()=>import("./Privacy-C9Epa9PB.js"),__vite__mapDeps([4,1,2]))),Ra=c.lazy(()=>E(()=>import("./MyHistory-Cs3QtOXe.js"),__vite__mapDeps([5,1,2]))),Ia=c.lazy(()=>E(()=>import("./CheckIn-C6M5QFf_.js"),__vite__mapDeps([6,1,2]))),La=c.lazy(()=>E(()=>import("./Journal-DBmPpNgK.js"),__vite__mapDeps([7,1,2]))),Ta=c.lazy(()=>E(()=>import("./Support-btcUoYwV.js"),__vite__mapDeps([8,1,2]))),Ma=c.lazy(()=>E(()=>import("./WellnessRoute-8ObHPqHS.js"),__vite__mapDeps([9,1,2]))),Oa=c.lazy(()=>E(()=>import("./Companion-BZXD7Vvr.js"),__vite__mapDeps([10,1,2]))),Pa=c.lazy(()=>E(()=>import("./Library-C16tykX-.js"),__vite__mapDeps([11,1,2]))),Fa=c.lazy(()=>E(()=>import("./Emotions-ByaUakm5.js"),__vite__mapDeps([12,1,2]))),$a=c.lazy(()=>E(()=>import("./MapPage-DbFQQKXC.js"),__vite__mapDeps([13,1,2]))),Da=c.lazy(()=>E(()=>import("./Trees-vqQhTLYR.js"),__vite__mapDeps([14,1,2]))),Ua=c.lazy(()=>E(()=>import("./Buddy-L6NatO73.js"),__vite__mapDeps([15,1,2]))),Ba=c.lazy(()=>E(()=>import("./Adventure-CIKclcpA.js"),__vite__mapDeps([16,1,2]))),Va=c.lazy(()=>E(()=>import("./Calendar-Bz73tvc4.js"),__vite__mapDeps([17,1,2]))),Ha=c.lazy(()=>E(()=>import("./Admin-BQEAEGbd.js"),__vite__mapDeps([18,1,19,2]))),Wa=c.lazy(()=>E(()=>import("./AdminLogin-BB7-1O0n.js"),__vite__mapDeps([20,1,19,2])));function Ya(){return e.jsx("div",{style:{display:"grid",placeItems:"center",minHeight:"40vh"},children:e.jsx("div",{className:"spinner"})})}function Xa(){const a=T(),n=a.pathname.startsWith("/admin"),r=!n&&a.pathname!=="/evaluacion";return e.jsxs(e.Fragment,{children:[r&&e.jsx(He,{}),r&&e.jsx(Ge,{density:26}),!n&&e.jsx(Ze,{}),!n&&e.jsx(Pe,{}),e.jsx("main",{children:e.jsx(c.Suspense,{fallback:e.jsx(Ya,{}),children:e.jsx(Qe,{children:e.jsxs(Ne,{children:[e.jsx(w,{path:"/",element:e.jsx(la,{})}),e.jsx(w,{path:"/consentimiento",element:e.jsx(da,{})}),e.jsx(w,{path:"/evaluacion",element:e.jsx(Sa,{})}),e.jsx(w,{path:"/resultado",element:e.jsx(Ca,{})}),e.jsx(w,{path:"/recursos",element:e.jsx(za,{})}),e.jsx(w,{path:"/privacidad",element:e.jsx(qa,{})}),e.jsx(w,{path:"/mi-historia",element:e.jsx(Ra,{})}),e.jsx(w,{path:"/check-in",element:e.jsx(Ia,{})}),e.jsx(w,{path:"/diario",element:e.jsx(La,{})}),e.jsx(w,{path:"/apoyo",element:e.jsx(Ta,{})}),e.jsx(w,{path:"/ruta",element:e.jsx(Ma,{})}),e.jsx(w,{path:"/companion",element:e.jsx(Oa,{})}),e.jsx(w,{path:"/biblioteca",element:e.jsx(Pa,{})}),e.jsx(w,{path:"/emociones",element:e.jsx(Fa,{})}),e.jsx(w,{path:"/mapa",element:e.jsx($a,{})}),e.jsx(w,{path:"/arboles",element:e.jsx(Da,{})}),e.jsx(w,{path:"/buddy",element:e.jsx(Ua,{})}),e.jsx(w,{path:"/aventura",element:e.jsx(Ba,{})}),e.jsx(w,{path:"/calendario",element:e.jsx(Va,{})}),e.jsx(w,{path:"/docentes",element:e.jsx(ee,{to:"/admin/login",replace:!0})}),e.jsx(w,{path:"/admin/login",element:e.jsx(Wa,{})}),e.jsx(w,{path:"/admin/*",element:e.jsx(Ha,{})}),e.jsx(w,{path:"*",element:e.jsx(ee,{to:"/",replace:!0})})]})})})}),!n&&e.jsx(Fe,{}),!n&&e.jsx($e,{}),!n&&e.jsx(Ve,{}),!n&&e.jsx(Xe,{})]})}(function(){const n=new URLSearchParams(window.location.search),r=n.get("p");if(r!==null){const t=n.get("q"),s=window.location.pathname.replace(/\/$/,"")+r+(t?"?"+t.replace(/~and~/g,"&"):"")+window.location.hash;window.history.replaceState(null,"",s)}})();const Ka="/aura-fesi/".replace(/\/$/,"");fe(document.getElementById("root")).render(e.jsx(Se.StrictMode,{children:e.jsx(ke,{basename:Ka,children:e.jsx(Xa,{})})}));export{le as D,en as R,W as S,Me as a,C as b,Oe as c,q as d,nn as e,an as f,te as g,rn as h,R as i,e as j,Za as k,S as s,H as u};
