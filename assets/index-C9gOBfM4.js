const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Resources-Ccz6f36-.js","assets/vendor-react-Be-nUyB0.js","assets/vendor-supabase-J7ITh-P0.js","assets/Resources-Da2drgDA.css","assets/Privacy-BLp3sJXt.js","assets/MyHistory-B_N9C8po.js","assets/CheckIn-Bn54uEHS.js","assets/Journal-DY6QrtlV.js","assets/Support-CBSJgrfn.js","assets/WellnessRoute-DW0Soqam.js","assets/Companion-kuHQSyv8.js","assets/Library-8yKji66A.js","assets/Emotions-BwlVvF-v.js","assets/MapPage-D7Z5lRlx.js","assets/Trees-B1jVOhL5.js","assets/Buddy-mTf1ex9w.js","assets/Adventure-CI6ilaRR.js","assets/Calendar-Bu9nAWwr.js","assets/Admin-BlYDzxPI.js","assets/authService-DFMeUH1U.js","assets/AdminLogin-CLbXWomW.js"])))=>i.map(i=>d[i]);
import{r as t,a as ie,u as I,L as b,N as x,b as P,R as he,c as g,d as Y,e as fe,B as ge}from"./vendor-react-Be-nUyB0.js";import{c as be}from"./vendor-supabase-J7ITh-P0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();var re={exports:{}},M={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ve=t,je=Symbol.for("react.element"),ye=Symbol.for("react.fragment"),_e=Object.prototype.hasOwnProperty,Ne=ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,we={key:!0,ref:!0,__self:!0,__source:!0};function te(a,s,n){var i,r={},o=null,c=null;n!==void 0&&(o=""+n),s.key!==void 0&&(o=""+s.key),s.ref!==void 0&&(c=s.ref);for(i in s)_e.call(s,i)&&!we.hasOwnProperty(i)&&(r[i]=s[i]);if(a&&a.defaultProps)for(i in s=a.defaultProps,s)r[i]===void 0&&(r[i]=s[i]);return{$$typeof:je,type:a,key:o,ref:c,props:r,_owner:Ne.current}}M.Fragment=ye;M.jsx=te;M.jsxs=te;re.exports=M;var e=re.exports,oe,K=ie;oe=K.createRoot,K.hydrateRoot;const Se="modulepreload",ke=function(a){return"/aura-fesi/"+a},J={},N=function(s,n,i){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));r=Promise.allSettled(n.map(h=>{if(h=ke(h),h in J)return;J[h]=!0;const p=h.endsWith(".css"),d=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${d}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":Se,p||(m.as="script"),m.crossOrigin="",m.href=h,u&&m.setAttribute("nonce",u),document.head.appendChild(m),p)return new Promise((l,f)=>{m.addEventListener("load",l),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(c){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=c,window.dispatchEvent(u),!u.defaultPrevented)throw c}return r.then(c=>{for(const u of c||[])u.status==="rejected"&&o(u.reason);return s().catch(o)})},Q="1.0.0",G={bajo:{max:33},moderado:{max:66}},B={bajo:"Bajo nivel de atención",moderado:"Atención moderada",prioritario:"Atención prioritaria"},A={ANSWERS:"aura.answers",CONSENT:"aura.consent",RESULT:"aura.result",ANON_CODE:"aura.anon_code"},ce="generate-orientation",O="aura.student";function X(){try{const a=sessionStorage.getItem(O);if(a)return JSON.parse(a);const s=sessionStorage.getItem(A.ANON_CODE);return s?{code:s,password:null}:null}catch{return null}}function Ae(a){a?sessionStorage.setItem(O,JSON.stringify(a)):sessionStorage.removeItem(O),window.dispatchEvent(new Event("sintonia:student"))}function Ee(){sessionStorage.removeItem(O),sessionStorage.removeItem(A.ANON_CODE),window.dispatchEvent(new Event("sintonia:student"))}function U(){const[a,s]=t.useState(X),n=t.useCallback(()=>s(X()),[]);return t.useEffect(()=>{const i=()=>n();return window.addEventListener("sintonia:student",i),window.addEventListener("storage",i),()=>{window.removeEventListener("sintonia:student",i),window.removeEventListener("storage",i)}},[n]),{student:a,setStudent:i=>{Ae(i),n()},clearStudent:()=>{Ee(),n()}}}function Ce(){const{student:a,clearStudent:s}=U(),n=!!(a!=null&&a.code),i=I(),[r,o]=t.useState(null),[c,u]=t.useState(!1),h=t.useRef(null);t.useEffect(()=>{o(null),u(!1)},[i.pathname]),t.useEffect(()=>{function f(v){var w;(w=h.current)!=null&&w.contains(v.target)||o(null)}return document.addEventListener("click",f),()=>document.removeEventListener("click",f)},[]),t.useEffect(()=>(document.body.style.overflow=c?"hidden":"",document.body.classList.toggle("drawer-open",c),()=>{document.body.style.overflow="",document.body.classList.remove("drawer-open")}),[c]);function p(f){o(v=>v===f?null:f)}function d(){u(!1)}function m(){u(!1),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(s(),window.location.assign("/aura-fesi/"))}const l=n?a.code.split("-").map(f=>f[0]).join("").slice(0,3):"";return e.jsxs("header",{className:"site-header",children:[e.jsxs("div",{className:"container topbar",children:[e.jsxs(b,{to:"/",className:"brand","aria-label":"AURA, ir al inicio",children:[e.jsx("img",{src:"/aura-fesi/Aura-icon192.png",srcSet:"/aura-fesi/Aura-icon192.png 1x, /aura-fesi/Aura-icon512.png 2x",alt:"AURA",className:"brand-logo",width:"56",height:"56"}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("strong",{children:"AURA"}),e.jsx("span",{children:"Bienestar emocional universitario"})]})]}),e.jsx("button",{type:"button",className:"mobile-toggle",onClick:()=>u(!0),"aria-label":"Abrir menú",children:"☰"}),e.jsxs("nav",{className:"nav","aria-label":"Navegación principal",ref:h,children:[e.jsx(x,{to:"/",end:!0,className:"nav-link",children:"Inicio"}),e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${r==="discover"?"active":""}`,onClick:()=>p("discover"),"aria-haspopup":"true","aria-expanded":r==="discover",children:"Conocer ▾"}),r==="discover"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(x,{to:"/recursos",children:"📌 Recursos"}),e.jsx(x,{to:"/calendario",children:"📅 Calendario"}),e.jsx(x,{to:"/mapa",children:"🗺 Mapa"}),e.jsx(x,{to:"/emociones",children:"📖 Emociones"})]})]}),e.jsx(x,{to:"/apoyo",className:"nav-link",children:"🆘 Apoyo"}),n&&e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${r==="mine"?"active":""}`,onClick:()=>p("mine"),"aria-haspopup":"true","aria-expanded":r==="mine",children:"Mi rincón ▾"}),r==="mine"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(x,{to:"/mi-historia",children:"📊 Mi historia"}),e.jsx(x,{to:"/check-in",children:"📝 Check-in"}),e.jsx(x,{to:"/diario",children:"📔 Diario"}),e.jsx(x,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(x,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(x,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(x,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(x,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(x,{to:"/arboles",children:"🌳 Mis árboles"})]})]}),!n&&e.jsx(x,{to:"/mi-historia",className:"nav-link",children:"Mi historia"}),e.jsx(x,{to:"/privacidad",className:"nav-link nav-tiny",children:"Privacidad"}),n?e.jsxs("div",{className:"dropdown",children:[e.jsxs("button",{type:"button",className:`user-chip ${r==="user"?"active":""}`,onClick:()=>p("user"),"aria-haspopup":"true","aria-expanded":r==="user",title:"Abrir menú",children:[e.jsx("span",{className:"initials",children:l}),e.jsx("small",{children:a.code}),e.jsx("span",{className:"chev","aria-hidden":"true",children:"▾"})]}),r==="user"&&e.jsxs("div",{className:"drop-panel user-drop",children:[e.jsx(x,{to:"/mi-historia",end:!0,children:"📊 Mi panel"}),e.jsx(x,{to:"/check-in",children:"📝 Check-in semanal"}),e.jsx(x,{to:"/diario",children:"📔 Diario emocional"}),e.jsx(x,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(x,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(x,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(x,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(x,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(x,{to:"/arboles",children:"🌳 Mis árboles"}),e.jsx("hr",{style:{margin:"6px 0",border:0,borderTop:"1px solid var(--c-borde-soft)"}}),e.jsx("button",{type:"button",className:"logout-link",onClick:()=>{o(null),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(s(),window.location.assign("/aura-fesi/"))},children:"↩ Cerrar sesión"})]})]}):e.jsx(b,{to:"/consentimiento",className:"btn btn-primary btn-sm nav-cta",children:"Iniciar orientación"})]})]}),c&&ie.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mobile-overlay",onClick:d}),e.jsxs("aside",{className:"mobile-drawer",role:"dialog","aria-label":"Menú principal",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"Menú"}),e.jsx("button",{className:"close-x",onClick:d,"aria-label":"Cerrar",children:"✕"})]}),n&&e.jsxs("div",{className:"m-user",children:[e.jsx("span",{className:"m-initials",children:l}),e.jsxs("div",{children:[e.jsx("strong",{children:"Tu código"}),e.jsx("code",{children:a.code})]})]}),e.jsxs("nav",{className:"m-nav",children:[e.jsx(x,{to:"/",end:!0,onClick:d,children:"🏠 Inicio"}),e.jsx("h4",{children:"Conocer"}),e.jsx(x,{to:"/recursos",onClick:d,children:"📌 Recursos"}),e.jsx(x,{to:"/calendario",onClick:d,children:"📅 Calendario"}),e.jsx(x,{to:"/mapa",onClick:d,children:"🗺 Mapa"}),e.jsx(x,{to:"/emociones",onClick:d,children:"📖 Emociones"}),e.jsx("h4",{children:"Apoyo"}),e.jsx(x,{to:"/apoyo",onClick:d,children:"🆘 Apoyo y canalización"}),n&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Mi rincón"}),e.jsx(x,{to:"/mi-historia",onClick:d,children:"📊 Mi panel"}),e.jsx(x,{to:"/check-in",onClick:d,children:"📝 Check-in semanal"}),e.jsx(x,{to:"/diario",onClick:d,children:"📔 Diario"}),e.jsx(x,{to:"/ruta",onClick:d,children:"🛤 Mi ruta"}),e.jsx(x,{to:"/companion",onClick:d,children:"🤝 Pum-AI"}),e.jsx(x,{to:"/biblioteca",onClick:d,children:"📚 Biblioteca"}),e.jsx(x,{to:"/aventura",onClick:d,children:"🗺 Aventura"}),e.jsx(x,{to:"/buddy",onClick:d,children:"🫂 Buddy"}),e.jsx(x,{to:"/arboles",onClick:d,children:"🌳 Mis árboles"})]}),e.jsx("h4",{children:"Información"}),e.jsx(x,{to:"/privacidad",onClick:d,children:"🔒 Privacidad"}),e.jsx("div",{className:"m-cta",children:n?e.jsx("button",{type:"button",className:"btn btn-coral",onClick:m,children:"↩ Cerrar sesión"}):e.jsx(b,{to:"/consentimiento",onClick:d,className:"btn btn-primary btn-lg",children:"Iniciar orientación"})})]})]})]}),document.body)]})}function ze(){const a=new Date().getFullYear();return e.jsx("footer",{className:"site-footer",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-card",children:[e.jsxs("div",{children:[e.jsx("h4",{children:"AURA"}),e.jsx("p",{children:"Plataforma universitaria de orientación para el bienestar emocional. No constituye diagnóstico ni sustituye atención profesional."})]}),e.jsxs("div",{className:"footer-links",children:[e.jsx(b,{to:"/privacidad",children:"Aviso de privacidad"}),e.jsx(b,{to:"/recursos",children:"Recursos de apoyo"}),e.jsx(b,{to:"/admin",children:"Acceso interno"})]})]}),e.jsxs("p",{className:"footer-credits",children:["© Universidad Nacional Autónoma de México, ",a,"."]})]})})}const $="aura.crisis_visible";function Re(){const a=I(),[s,n]=t.useState(!1),[i,r]=t.useState(!1),o=a.pathname.startsWith("/admin")||a.pathname.startsWith("/apoyo");t.useEffect(()=>{try{const u=JSON.parse(sessionStorage.getItem(A.RESULT)||"null");u&&u.general_level==="prioritario"&&localStorage.setItem($,"1")}catch{}n(localStorage.getItem($)==="1")},[a.pathname]);function c(){localStorage.setItem($,"0"),n(!1),r(!1)}return!s||o?null:e.jsxs(e.Fragment,{children:[i&&e.jsxs("div",{className:"crisis-panel",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"🆘 Apoyo inmediato"}),e.jsx("button",{onClick:()=>r(!1),"aria-label":"Cerrar",children:"✕"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Línea de la Vida"})," — orientación gratuita, confidencial, 24/7."]}),e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral",children:"📞 800 290 0024"}),e.jsx(b,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver más opciones"}),e.jsx("button",{className:"dismiss",onClick:c,children:"Ocultar este botón"})]}),e.jsx("button",{className:`crisis-fab ${i?"open":""}`,onClick:()=>r(u=>!u),title:"Apoyo inmediato","aria-label":"Abrir apoyo inmediato",children:"🆘"}),e.jsx("style",{children:`
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
      `})]})}const qe="https://knblatuzbgzgnugwkxdp.supabase.co",le="sb_publishable_yBtfhxGitkJdS9jXO4CGxg_qmMkg3RF";function Ie(){try{const a=sessionStorage.getItem("aura.student");return a?JSON.parse(a).code||"":sessionStorage.getItem("aura.anon_code")||""}catch{return""}}const j=be(qe,le,{auth:{storageKey:"aura.auth",persistSession:!0,autoRefreshToken:!0},global:{fetch:(a,s={})=>{const n=Ie(),i=new Headers(s.headers||{});return n&&i.set("X-Anon-Code",n),fetch(a,{...s,headers:i})}}}),E=!!le,Z="aura.webinar_dismissed_",Te=24;function Le(){const{student:a}=U(),s=I(),[n,i]=t.useState(null),[r,o]=t.useState(!1),[c,u]=t.useState(!1),[h,p]=t.useState(!1),m=["/admin","/evaluacion","/consentimiento"].some(_=>s.pathname.startsWith(_));t.useEffect(()=>{E&&(async()=>{const{data:_}=await j.from("view_upcoming_webinars").select("*").order("starts_at").limit(1).maybeSingle();if(_){try{const q=localStorage.getItem(Z+_.id);if(q){const C=Number(q);if(Date.now()-C<Te*3600*1e3)return}}catch{}i(_),setTimeout(()=>o(!0),2500)}})()},[]),t.useEffect(()=>{!n||!(a!=null&&a.code)||j.from("event_rsvp").select("id").eq("event_id",n.id).eq("anonymous_code",a.code).maybeSingle().then(({data:_})=>p(!!_))},[n,a==null?void 0:a.code]);function l(){if(n!=null&&n.id)try{localStorage.setItem(Z+n.id,String(Date.now()))}catch{}o(!1)}async function f(){if(!(a!=null&&a.code)){window.location.assign("/aura-fesi/mi-historia");return}u(!0),await j.from("event_rsvp").upsert({event_id:n.id,anonymous_code:a.code},{onConflict:"event_id,anonymous_code"}),p(!0),u(!1)}if(!n||m)return null;const w=new Date(n.starts_at).toLocaleString("es-MX",{weekday:"long",day:"2-digit",month:"long",hour:"2-digit",minute:"2-digit"});return e.jsxs(e.Fragment,{children:[!r&&e.jsxs("button",{className:"webinar-pill",onClick:()=>o(!0),"aria-label":"Abrir aviso de webinar",children:["📡 ",e.jsx("span",{children:"Webinar próximo"})]}),r&&e.jsxs("div",{className:"webinar-toast",role:"dialog","aria-label":"Próximo webinar",children:[e.jsx("button",{className:"dismiss-btn",onClick:l,"aria-label":"Cerrar",children:"✕"}),n.image_url&&e.jsx("img",{src:n.image_url,alt:"",className:"webinar-img"}),e.jsxs("div",{className:"webinar-body",children:[e.jsx("span",{className:"webinar-tag",children:"📡 Próximo webinar"}),e.jsx("h3",{children:n.title}),n.speaker&&e.jsxs("small",{children:["👤 ",n.speaker]}),e.jsxs("small",{children:["🗓 ",w]}),n.location&&e.jsxs("small",{children:["📍 ",n.location]}),n.description&&e.jsx("p",{className:"webinar-desc",children:n.description}),e.jsxs("div",{className:"webinar-actions",children:[h?e.jsx("span",{className:"rsvped-chip",children:"✓ Apuntado(a)"}):e.jsx("button",{className:"btn btn-primary btn-sm",onClick:f,disabled:c,children:c?"…":a!=null&&a.code?"✋ Me interesa":"✋ Crear código y apuntarme"}),n.url&&e.jsx("a",{href:n.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Más info →"})]})]})]}),e.jsx("style",{children:`
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
      `})]})}function Oe(){const a=t.useRef(null);return t.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=null;function i(){if(!a.current)return;const o=window.scrollY;a.current.style.transform=`translate3d(0, ${o*-.1}px, 0)`,n=null}function r(){n==null&&(n=requestAnimationFrame(i))}return i(),window.addEventListener("scroll",r,{passive:!0}),()=>{window.removeEventListener("scroll",r),n&&cancelAnimationFrame(n)}},[]),e.jsxs("div",{ref:a,className:"wellness-bg","aria-hidden":"true",children:[e.jsx("div",{className:"bg-wash"}),e.jsx("div",{className:"bg-blob bg-blob-lavender"}),e.jsx("div",{className:"bg-blob bg-blob-peach"}),e.jsx("div",{className:"bg-blob bg-blob-durazno"}),e.jsx("div",{className:"bg-blob bg-blob-rosa"}),e.jsx("div",{className:"bg-blob bg-blob-coral"}),e.jsx("style",{children:`
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
      `})]})}const de="aura.buddyToast.dismissed",Pe=30*60*1e3;function Me(){try{const a=Number(sessionStorage.getItem(de)||0);return a&&Date.now()-a<Pe}catch{return!1}}function Ue(){const{student:a}=U(),s=P(),n=I(),[i,r]=t.useState(!1),[o,c]=t.useState(0),u=t.useRef(null),h=t.useRef(0),p=(a==null?void 0:a.code)||null,d=n.pathname.startsWith("/admin"),m=n.pathname==="/buddy",l=n.pathname==="/evaluacion";t.useEffect(()=>{if(!p||d||m||l){r(!1);return}let w=!0;async function _(){const{count:C}=await j.from("buddy_queue").select("*",{count:"exact",head:!0}).neq("anonymous_code",p);if(!w)return;const z=C??0;c(z);const{data:y}=await j.from("buddy_pairs").select("id").or(`code_a.eq.${p},code_b.eq.${p}`).eq("active",!0).limit(1).maybeSingle();if(!w)return;const k=z>0&&!y&&!Me();k&&Date.now()-h.current>6e4?(r(!0),h.current=Date.now(),u.current&&clearTimeout(u.current),u.current=setTimeout(()=>r(!1),25e3)):k||r(!1)}_();const q=j.channel("buddy-queue-watch").on("postgres_changes",{event:"INSERT",schema:"public",table:"buddy_queue"},C=>{var z;((z=C.new)==null?void 0:z.anonymous_code)!==p&&_()}).on("postgres_changes",{event:"DELETE",schema:"public",table:"buddy_queue"},()=>_()).subscribe();return()=>{w=!1,u.current&&clearTimeout(u.current),j.removeChannel(q)}},[p,d,m,l]);function f(){r(!1);try{sessionStorage.setItem(de,String(Date.now()))}catch{}}function v(){r(!1),s("/buddy")}return i?e.jsxs("div",{className:"bud-toast",role:"status","aria-live":"polite",children:[e.jsx("div",{className:"bud-toast-icon",children:"🤝"}),e.jsxs("div",{className:"bud-toast-body",children:[e.jsx("strong",{children:"Alguien busca un buddy ahora"}),e.jsxs("p",{children:[o===1?"Otro estudiante anónimo está esperando en la cola.":`Hay ${o} estudiantes anónimos esperando.`," ¿Conectamos?"]}),e.jsxs("div",{className:"bud-toast-actions",children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:v,children:"Sí, conectar"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:f,children:"Ahora no"})]})]}),e.jsx("button",{className:"bud-toast-close",onClick:f,"aria-label":"Cerrar",children:"×"}),e.jsx("style",{children:`
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
      `})]}):null}const De=["/evaluacion","/admin/login"];function $e(a){return De.some(s=>a.startsWith(s))}function Fe({children:a}){const s=I(),n=t.useRef(s.pathname),i=t.useRef(null);return t.useEffect(()=>{var o;if(n.current===s.pathname||(n.current=s.pathname,$e(s.pathname))||(o=window.matchMedia)!=null&&o.call(window,"(prefers-reduced-motion: reduce)").matches)return;const r=i.current;r&&(r.classList.remove("page-enter"),r.offsetWidth,r.classList.add("page-enter"))},[s.pathname]),e.jsxs("div",{ref:i,className:"page-transition-wrap",children:[a,e.jsx("style",{children:`
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
      `})]})}function Be(){return e.jsx("section",{className:"hero",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-card card fade-in",children:[e.jsx("span",{className:"tag",children:"Programa universitario · FES Iztacala"}),e.jsxs("h1",{className:"mt-2",children:["Sintonízate contigo, con tu ",e.jsx("span",{style:{color:"var(--c-oro-700)"},children:"comunidad"})," ","y con tu bienestar."]}),e.jsx("p",{className:"lede",children:"Una autoevaluación breve, anónima y con recomendaciones personalizadas para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo en FES Iztacala y la UNAM."}),e.jsxs("ul",{className:"hero-checks",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"20 preguntas"})," en 7 a 10 minutos"]}),e.jsxs("li",{children:["Resultado ",e.jsx("strong",{children:"informativo, anónimo y confidencial"})]}),e.jsxs("li",{children:["Recomendaciones y vinculación con ",e.jsx("strong",{children:"recursos universitarios"})]})]}),e.jsxs("div",{className:"hero-actions",children:[e.jsx(b,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(b,{to:"/privacidad",className:"btn btn-ghost",children:"Aviso de privacidad"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"20"}),e.jsx("span",{children:"preguntas"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"7-10"}),e.jsx("span",{children:"minutos"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"0"}),e.jsx("span",{children:"datos personales"})]})]})]}),e.jsx("aside",{className:"hero-visual fade-in","aria-hidden":"true",children:e.jsx("div",{className:"hero-logo-wrap",children:e.jsx("img",{className:"hero-logo",src:"/aura-fesi/Aura.png",alt:"AURA",loading:"eager",decoding:"async"})})})]})})})}function Ve({icon:a="✦",title:s,children:n,accent:i="azul"}){return e.jsxs("article",{className:`info-card accent-${i}`,children:[e.jsx("div",{className:"info-icon","aria-hidden":"true",children:a}),e.jsx("h3",{children:s}),e.jsx("p",{children:n})]})}function D({variant:a="default",children:s}){return e.jsxs("aside",{className:`safety-notice safety-${a}`,role:"note",children:[e.jsx("span",{className:"safety-icon","aria-hidden":"true",children:"ⓘ"}),e.jsx("div",{children:s||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," No constituye un diagnóstico médico ni psicológico, ni reemplaza la atención profesional. Si necesitas apoyo, acércate a los servicios de orientación y salud de la UNAM."]})})]})}function V(){const a=new Date;return a.getFullYear()*1e3+a.getMonth()*32+a.getDate()}function ue(a){return!a||a.length===0?null:a[V()%a.length]}function He({compact:a=!1}){const[s,n]=t.useState(null);return t.useEffect(()=>{j.from("student_library").select("id, title, body, meta").eq("category","quote").eq("active",!0).then(({data:i})=>n(ue(i)))},[]),s?e.jsxs("div",{className:`daily-quote ${a?"compact":""}`,children:[e.jsx("small",{children:"💭 Frase del día"}),e.jsxs("blockquote",{children:['"',s.title,'"']}),s.body&&e.jsxs("cite",{children:["— ",s.body]}),e.jsx("style",{children:`
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
      `})]}):null}function We(){const{student:a}=U(),[s,n]=t.useState(null),[i,r]=t.useState(!1);t.useEffect(()=>{j.from("student_library").select("id, title, body").eq("category","challenge").eq("active",!0).then(({data:c})=>n(ue(c)))},[]),t.useEffect(()=>{if(!s||!(a!=null&&a.code))return;const c=`challenge_${V()}_${s.id}`;j.from("student_achievements").select("id").eq("anonymous_code",a.code).eq("achievement_key",c).maybeSingle().then(({data:u})=>r(!!u))},[s,a==null?void 0:a.code]);async function o(){if(!(a!=null&&a.code)||!s)return;const c=`challenge_${V()}_${s.id}`;await j.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:c}),r(!0)}return s?e.jsxs("div",{className:"daily-challenge",children:[e.jsx("small",{children:"🎯 Reto del día"}),e.jsx("h3",{children:s.title}),s.body&&e.jsx("p",{children:s.body}),(a==null?void 0:a.code)&&e.jsx("button",{className:`btn ${i?"btn-ghost":"btn-coral"} btn-sm`,onClick:o,disabled:i,children:i?"✓ ¡Lo hiciste!":"Marcar como hecho"}),e.jsx("style",{children:`
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
      `})]}):null}let R=null;const T=new WeakMap;function me(){var a;return typeof window>"u"?!1:(a=window.matchMedia)==null?void 0:a.call(window,"(prefers-reduced-motion: reduce)").matches}function Ye(a,s={}){var c;if(!a)return()=>{};if(me())return a.classList.add("in-view"),(c=s.onEnter)==null||c.call(s,a),()=>{};const{threshold:n=.15,rootMargin:i="0px 0px -10% 0px",once:r=!0,onEnter:o}=s;return R||(R=new IntersectionObserver(u=>{var h;for(const p of u)if(p.isIntersecting){p.target.classList.add("in-view");const d=T.get(p.target);(h=d==null?void 0:d.onEnter)==null||h.call(d,p.target),(d==null?void 0:d.once)!==!1&&(R.unobserve(p.target),T.delete(p.target))}},{threshold:n,rootMargin:i})),T.set(a,{onEnter:o,once:r}),R.observe(a),()=>{R==null||R.unobserve(a),T.delete(a)}}function Ua(a,s,n={}){if(!a)return;if(me()){a.textContent=(n.prefix||"")+(n.format?n.format(s):String(s))+(n.suffix||"");return}const{duration:i=1400,suffix:r="",prefix:o="",format:c}=n,u=performance.now();function h(p){const d=Math.min(1,(p-u)/i),m=1-Math.pow(1-d,3),l=Math.round(s*m);a.textContent=o+(c?c(l):String(l))+r,d<1&&requestAnimationFrame(h)}requestAnimationFrame(h)}function S({children:a,as:s="div",variant:n="slideUp",delay:i=0,threshold:r=.15,rootMargin:o="0px 0px -10% 0px",className:c="",style:u={},...h}){const p=t.useRef(null);return t.useEffect(()=>{if(p.current)return i&&(p.current.style.transitionDelay=`${i}s`),Ye(p.current,{threshold:r,rootMargin:o})},[i,r,o]),e.jsxs(s,{ref:p,className:`reveal reveal-${n} ${c}`,style:u,...h,children:[a,e.jsx("style",{children:`
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
      `})]})}const Ke=[{icon:"📝",accent:"azul",title:"Evaluación breve",text:"Veinte preguntas en aproximadamente siete a diez minutos."},{icon:"📊",accent:"oro",title:"Resultado informativo",text:"Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas."},{icon:"🌿",accent:"mint",title:"Recomendaciones personalizadas",text:"Acciones de autocuidado y vinculación con actividades universitarias."},{icon:"🏛",accent:"coral",title:"Recursos universitarios",text:"Orientación psicológica, deporte, cultura, comunidad y bienestar verde."},{icon:"🤝",accent:"lavanda",title:"IA con responsabilidad",text:"Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional."}],Je=[{icon:"🧠",tone:"azul",label:"Psicología"},{icon:"⚖️",tone:"oro",label:"Equilibrio"},{icon:"🌿",tone:"mint",label:"Calma"},{icon:"🤝",tone:"coral",label:"Comunidad"},{icon:"✨",tone:"lavanda",label:"AURA"},{icon:"🎨",tone:"rosa",label:"Arte"},{icon:"🏃",tone:"durazno",label:"Deporte"},{icon:"📚",tone:"azul",label:"Estudio"},{icon:"💛",tone:"peach",label:"Bienestar"}];function Qe(){return e.jsxs(e.Fragment,{children:[e.jsx(Be,{}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",children:[e.jsx(S,{variant:"slideUp",children:e.jsxs("div",{className:"text-center",style:{maxWidth:640,margin:"0 auto"},children:[e.jsx("span",{className:"tag lavanda",children:"Áreas que acompañamos"}),e.jsx("h2",{className:"mt-2",style:{fontSize:"clamp(1.3rem, 2vw, 1.8rem)"},children:"Lo que cuida AURA"})]})}),e.jsx("div",{className:"areas-grid",children:Je.map((a,s)=>e.jsx(S,{variant:"slideUp",delay:.06*s,children:e.jsxs("div",{className:`area-chip area-${a.tone}`,children:[e.jsx("span",{className:"area-icon","aria-hidden":"true",children:a.icon}),e.jsx("span",{className:"area-label",children:a.label})]})},a.label))}),e.jsx("style",{children:`
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
          `})]})}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",style:{maxWidth:980},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsx(He,{}),e.jsx(We,{})]}),e.jsx("style",{children:`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `})]})}),e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsx(S,{variant:"slideUp",children:e.jsxs("div",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Cómo te acompaña AURA"}),e.jsx("h2",{className:"mt-2",children:"Una orientación clara, anónima y con sentido comunitario"}),e.jsx("p",{className:"lede",children:"AURA es una plataforma para reflexionar sobre tu bienestar emocional, identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM."})]})}),e.jsx("div",{className:"pillars",children:Ke.map((a,s)=>e.jsx(S,{variant:"slideUp",delay:.12*s,children:e.jsx(Ve,{icon:a.icon,title:a.title,accent:a.accent,children:a.text})},a.title))}),e.jsx(S,{variant:"zoomIn",delay:.1,children:e.jsxs("div",{className:"continuity-card",children:[e.jsx("div",{className:"continuity-icon","aria-hidden":"true",children:"🔁"}),e.jsxs("div",{children:[e.jsx("span",{className:"tag sage",children:"¿Quieres seguir cuidándote?"}),e.jsx("h3",{className:"mt-2",children:"Tu código anónimo te abre un rincón propio"}),e.jsxs("p",{children:["Si guardas tu código (ej. ",e.jsx("code",{children:"SIN-XXX-####"}),") puedes regresar cuando quieras y obtener acceso a:"]}),e.jsxs("ul",{className:"continuity-list",children:[e.jsxs("li",{children:["📝 ",e.jsx("strong",{children:"Check-in semanal"})," de 30 segundos"]}),e.jsxs("li",{children:["📔 ",e.jsx("strong",{children:"Diario emocional"})," rápido (1 línea/día)"]}),e.jsxs("li",{children:["🛤 ",e.jsx("strong",{children:"Ruta de bienestar"})," de 7 o 14 días personalizada"]}),e.jsxs("li",{children:["🤝 ",e.jsx("strong",{children:"Pum-AI acompañante"})," para conversar cuando lo necesites"]}),e.jsxs("li",{children:["📚 ",e.jsx("strong",{children:"Biblioteca"})," de respiraciones, sonidos y videos"]}),e.jsxs("li",{children:["🗺 ",e.jsx("strong",{children:"Aventura"})," con pistas en el campus"]}),e.jsxs("li",{children:["🌳 ",e.jsx("strong",{children:"Adopta un árbol"})," y cuídalo"]}),e.jsxs("li",{children:["🫂 ",e.jsx("strong",{children:"Buddy anónimo"})," para conectar con otra persona"]}),e.jsxs("li",{children:["📅 ",e.jsx("strong",{children:"Calendario"})," de eventos universitarios"]}),e.jsxs("li",{children:["📊 ",e.jsx("strong",{children:"Tu evolución"})," a lo largo del tiempo"]})]}),e.jsxs("p",{className:"note",children:["Sigue siendo ",e.jsx("strong",{children:"100% anónimo"}),": solo tu código y, si quieres, una contraseña. Nada de nombre, correo ni datos personales."]}),e.jsxs("div",{className:"continuity-actions",children:[e.jsx(b,{to:"/mi-historia",className:"btn btn-gold",children:"Crear mi código anónimo"}),e.jsx(b,{to:"/consentimiento",className:"btn btn-ghost",children:"Solo hacer el test"})]})]})]})})]}),e.jsx("style",{children:`
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
        `})]}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"cta-band",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"¿Listo para iniciar?"}),e.jsx("p",{children:"La orientación es anónima. No solicitamos nombre, correo, teléfono ni número de cuenta. Tus respuestas se procesan para devolverte un panorama útil y recomendaciones."})]}),e.jsxs("div",{className:"cta-actions",children:[e.jsx(b,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(b,{to:"/recursos",className:"btn btn-ghost",children:"Ver recursos de apoyo"})]})]}),e.jsx("div",{className:"mt-4",children:e.jsx(D,{})})]})}),e.jsx("style",{children:`
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
      `})]})}function Ge(){const a=P(),[s,n]=t.useState(!1);function i(){s&&(sessionStorage.setItem(A.CONSENT,JSON.stringify({accepted:!0,timestamp:new Date().toISOString()})),a("/evaluacion"))}return e.jsxs("section",{className:"section",children:[e.jsx("div",{className:"container",style:{maxWidth:820},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag",children:"Antes de iniciar"}),e.jsx("h1",{className:"mt-2",children:"Consentimiento informado"}),e.jsx("p",{className:"lede",children:"Antes de comenzar, te invitamos a leer las siguientes consideraciones. Tu participación es libre y puedes detenerla en cualquier momento."}),e.jsx("h2",{className:"mt-4",children:"¿Qué es AURA?"}),e.jsxs("p",{children:["AURA es una herramienta ",e.jsx("strong",{children:"informativa"})," de orientación para el bienestar emocional.",e.jsx("strong",{children:" No es un servicio médico, terapéutico ni de atención clínica."}),"Su propósito es ayudarte a reflexionar sobre cómo te has sentido y conocer recursos de apoyo dentro de la universidad."]}),e.jsx("h2",{className:"mt-4",children:"¿Qué pasará con tus respuestas?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"No te pediremos datos personales"}),": ni nombre, ni correo, ni teléfono, ni número de cuenta, ni cualquier información que te identifique directamente."]}),e.jsxs("li",{children:["Generamos un ",e.jsx("strong",{children:"código anónimo"})," (por ejemplo: SIN-KQT-2856) que tú decides guardar si quieres consultar tu resultado más tarde."]}),e.jsxs("li",{children:["Tus respuestas se almacenan de forma ",e.jsx("strong",{children:"anónima y agregada"})," con fines de mejora del programa y análisis estadístico."]}),e.jsxs("li",{children:["Para generar tu orientación amigable, enviamos a un modelo de inteligencia artificial",e.jsx("strong",{children:" únicamente datos agregados"})," (puntajes y dimensiones), nunca información personal."]})]}),e.jsx("h2",{className:"mt-4",children:"Limitaciones"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["El resultado es ",e.jsx("strong",{children:"informativo, no diagnóstico"}),"."]}),e.jsx("li",{children:"No reemplaza la atención psicológica o médica profesional."}),e.jsx("li",{children:"Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios de orientación."})]}),e.jsxs(D,{variant:"gold",children:["Si en este momento estás atravesando una crisis o piensas en hacerte daño, comunícate de inmediato a la ",e.jsx("strong",{children:"Línea de la Vida: 800 290 0024"})," (24 horas, gratuito)."]}),e.jsx("div",{className:"consent-box mt-4",children:e.jsxs("label",{className:"consent-label",children:[e.jsx("input",{type:"checkbox",checked:s,onChange:r=>n(r.target.checked)}),e.jsx("span",{children:"He leído y acepto continuar con esta orientación informativa."})]})}),e.jsxs("div",{className:"actions mt-4",children:[e.jsx("button",{type:"button",className:"btn btn-primary btn-lg",onClick:i,disabled:!s,children:"Continuar →"}),e.jsx(b,{to:"/",className:"btn btn-ghost",children:"Volver al inicio"})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Xe({current:a,total:s}){const n=s?Math.round(a/s*100):0;return e.jsxs("div",{className:"progress-wrap","aria-label":`Progreso ${n}%`,children:[e.jsxs("div",{className:"progress-meta",children:[e.jsxs("span",{children:["Pregunta ",e.jsx("strong",{children:a})," de ",e.jsx("strong",{children:s})]}),e.jsxs("span",{children:[n,"%"]})]}),e.jsx("div",{className:"progress-bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":n,children:e.jsx("span",{style:{width:`${n}%`}})})]})}const ee=[{id:"estado_emocional",label:"Estado emocional"},{id:"estres_academico",label:"Estrés académico"},{id:"sueno_descanso",label:"Sueño y descanso"},{id:"apoyo_social",label:"Convivencia y apoyo social"},{id:"motivacion_pertenencia",label:"Motivación y pertenencia"}],ae=[{id:"q01",sort_order:1,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?"},{id:"q02",sort_order:2,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"¿Has sentido nervios o preocupación que te cuesta calmar?"},{id:"q03",sort_order:3,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has logrado disfrutar momentos pequeños de tu día a día?"},{id:"q04",sort_order:4,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?"},{id:"q05",sort_order:5,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Has sentido que tus actividades académicas o personales te rebasan?"},{id:"q06",sort_order:6,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Te ha costado concentrarte al estudiar o atender tus clases?"},{id:"q07",sort_order:7,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?"},{id:"q08",sort_order:8,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has podido afrontar exámenes o entregas con relativa calma?"},{id:"q09",sort_order:9,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?"},{id:"q10",sort_order:10,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has mantenido un horario de sueño relativamente constante?"},{id:"q11",sort_order:11,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Te has despertado cansado(a) o con poca energía?"},{id:"q12",sort_order:12,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?"},{id:"q13",sort_order:13,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has contado con alguien con quien hablar cuando lo necesitas?"},{id:"q14",sort_order:14,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has compartido tiempo con familiares o amistades que te hacen bien?"},{id:"q15",sort_order:15,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Te has sentido solo(a) o con poca conexión con quienes te rodean?"},{id:"q16",sort_order:16,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Has evitado actividades sociales que antes disfrutabas?"},{id:"q17",sort_order:17,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has sentido motivación para participar en tus actividades universitarias?"},{id:"q18",sort_order:18,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?"},{id:"q19",sort_order:19,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Te has sentido parte de tu comunidad universitaria?"},{id:"q20",sort_order:20,dimension:"motivacion_pertenencia",is_reverse_scored:!1,question_text:"¿Has perdido interés o entusiasmo por metas que antes te importaban?"}],Ze=[{value:0,label:"Nunca"},{value:1,label:"Casi nunca"},{value:2,label:"Algunas veces"},{value:3,label:"Frecuentemente"},{value:4,label:"Casi siempre"}];function ea({question:a,value:s,onChange:n,index:i}){return e.jsxs("article",{className:"question-card",children:[e.jsxs("span",{className:"question-number",children:["PREGUNTA ",i+1]}),e.jsx("h2",{className:"question-text",children:a.question_text}),e.jsx("div",{className:"options",role:"radiogroup","aria-label":"Opciones de respuesta",children:Ze.map(r=>e.jsxs("button",{type:"button",role:"radio","aria-checked":s===r.value,className:`option ${s===r.value?"selected":""}`,onClick:()=>n(r.value),children:[e.jsx("span",{className:"opt-mark","aria-hidden":"true"}),e.jsx("span",{children:r.label})]},r.value))})]},a.id)}const Da=[{id:"orientacion_psicologica",label:"Orientación psicológica",icon:"🧠"},{id:"tutoria_academica",label:"Tutoría académica",icon:"📚"},{id:"deporte",label:"Actividades deportivas",icon:"🏃"},{id:"cultura",label:"Actividades culturales",icon:"🎭"},{id:"comunidad",label:"Integración comunitaria",icon:"🤝"},{id:"medico",label:"Servicios médicos",icon:"🩺"},{id:"emergencia",label:"Atención de emergencia",icon:"☎️"},{id:"sustentabilidad",label:"Bienestar verde",icon:"🌿"}],se=[{id:"r-uepi",name:"Unidad de Evaluación Psicológica Iztacala (UEPI)",type:"orientacion_psicologica",description:"Acompañamiento psicológico para la comunidad universitaria. Atención individual y grupal.",audience:"Estudiantes UNAM",modality:"Presencial / a distancia",location:"FES Iztacala",schedule:"Lunes a viernes, 9:00 a 17:00",contact:"uepi@iztacala.unam.mx",tags:["psicología","atención","orientación"]},{id:"r-tutorias",name:"Programa Institucional de Tutorías",type:"tutoria_academica",description:"Tutorías académicas y de trayectoria escolar. Acompañamiento para mejorar tu desempeño.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu facultad o escuela",schedule:"Según agenda del tutor",contact:"Coordinación de tutorías de tu plantel",tags:["académico","tutoría","desempeño"]},{id:"r-deporte",name:"Activación física comunitaria",type:"deporte",description:"Sesiones abiertas de yoga, baile y movimiento físico en explanadas universitarias.",audience:"Comunidad UNAM",modality:"Presencial",location:"Explanadas en distintos planteles",schedule:"Martes y jueves, 8:00",contact:"Difusión cultural y deportiva",tags:["deporte","movimiento","comunidad"]},{id:"r-cultura",name:"Talleres culturales",type:"cultura",description:"Talleres de música, escritura, pintura, teatro y otros oficios artísticos abiertos a estudiantes.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Casa del Tiempo y centros culturales",schedule:"Calendario semestral",contact:"Difusión cultural UNAM",tags:["arte","cultura","comunidad"]},{id:"r-comunidad",name:"Círculos de bienestar AURA",type:"comunidad",description:"Encuentros guiados para compartir experiencias y construir comunidad.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu plantel",schedule:"Miércoles 17:00",contact:"sintonia@unam.mx",tags:["comunidad","apoyo","pertenencia"]},{id:"r-medico",name:"Servicios médicos universitarios",type:"medico",description:"Consulta médica general gratuita para personal y estudiantes.",audience:"Comunidad UNAM",modality:"Presencial",location:"Centros médicos por plantel",schedule:"Lunes a viernes",contact:"Servicios médicos de tu plantel",tags:["salud","medicina","consulta"]},{id:"r-emergencia",name:"Línea de la Vida (24/7)",type:"emergencia",description:"Servicio de orientación emocional gratuito y confidencial, disponible las 24 horas.",audience:"Cualquier persona",modality:"Telefónica",location:"Nacional",schedule:"24 horas, todos los días",contact:"800 290 0024",tags:["emergencia","crisis","apoyo inmediato"]},{id:"r-sustenta",name:"Bienestar verde — caminatas y jardines",type:"sustentabilidad",description:"Actividades en espacios verdes de Ciudad Universitaria: caminatas, jardines polinizadores, talleres de plantas medicinales.",audience:"Comunidad UNAM",modality:"Presencial",location:"Ciudad Universitaria",schedule:"Sábados 10:00",contact:"sustentabilidad@unam.mx",tags:["sustentabilidad","naturaleza","autocuidado"]}],H=[{dimension:"estado_emocional",level:"bajo",title:"Sigue cultivando tus rutinas de bienestar",description:"Tus respuestas sugieren un buen equilibrio emocional. Mantener pequeñas pausas, gratitud diaria o momentos de movimiento te ayudará a sostenerlo."},{dimension:"estado_emocional",level:"moderado",title:"Espacio para reconocer tus emociones",description:"Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva."},{dimension:"estado_emocional",level:"prioritario",title:"Acércate a un servicio universitario de orientación",description:"Sentir tristeza o nervios sostenidos amerita acompañamiento. Te recomendamos contactar los servicios de orientación psicológica de tu plantel."},{dimension:"estres_academico",level:"bajo",title:"Tu carga académica parece manejable",description:"Conserva tus rutinas de organización. Una agenda y bloques de estudio cortos pueden sostener este ritmo."},{dimension:"estres_academico",level:"moderado",title:"Pequeños ajustes para liberar presión",description:"Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora de estudio."},{dimension:"estres_academico",level:"prioritario",title:"Considera apoyo académico y orientación",description:"Sentirte rebasado(a) puede afectar tu desempeño y tu salud. Las tutorías académicas y la orientación universitaria pueden ser un buen primer paso."},{dimension:"sueno_descanso",level:"bajo",title:"Tu descanso es un recurso valioso",description:"Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia."},{dimension:"sueno_descanso",level:"moderado",title:"Refuerza tu higiene del sueño",description:"Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía."},{dimension:"sueno_descanso",level:"prioritario",title:"El descanso necesita atención",description:"Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios para descartar causas atendibles."},{dimension:"apoyo_social",level:"bajo",title:"Tu red de apoyo te acompaña",description:"Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti."},{dimension:"apoyo_social",level:"moderado",title:"Reconecta con personas de confianza",description:"Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias universitarias también ayudan."},{dimension:"apoyo_social",level:"prioritario",title:"Buscar compañía es un acto de cuidado",description:"Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas universitarias y, si lo prefieres, a grupos de orientación."},{dimension:"motivacion_pertenencia",level:"bajo",title:"Tu motivación es un buen aliado",description:"Conserva los proyectos y actividades que te dan propósito. Compartir lo que disfrutas con otros lo amplifica."},{dimension:"motivacion_pertenencia",level:"moderado",title:"Reactiva pequeños propósitos",description:"Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus."},{dimension:"motivacion_pertenencia",level:"prioritario",title:"Espacios universitarios para reencontrarte",description:"Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia. Acércate a las actividades comunitarias de tu facultad."}];function aa(a){return H.filter(s=>{var n;return((n=a[s.dimension])==null?void 0:n.level)===s.level})}async function sa(){if(!E)return ae;const{data:a,error:s}=await j.from("questions").select("id, dimension, question_text, is_reverse_scored, sort_order").eq("active",!0).order("sort_order");return s||!a||a.length===0?(s&&console.warn("[supabase] questions →",s.message),ae):a}async function $a(){if(!E)return se;const{data:a,error:s}=await j.from("resources").select("*").eq("active",!0).order("name");return s||!a||a.length===0?(s&&console.warn("[supabase] resources →",s.message),se):a}async function na(){if(!E)return H;const{data:a,error:s}=await j.from("recommendations").select("dimension, level, title, description").eq("active",!0);return s||!a||a.length===0?(s&&console.warn("[supabase] recommendations →",s.message),H):a}async function ia(a){if(!E)return{saved:!1,id:null};const s=window.crypto&&crypto.randomUUID?crypto.randomUUID():"sin-"+Date.now()+"-"+Math.random().toString(36).slice(2,10),{error:n}=await j.from("assessment_sessions").insert({id:s,...a});return n?(console.warn("[supabase] saveSession →",n.message),{saved:!1,error:n.message,id:s}):{saved:!0,id:s}}async function ra(a,s){if(!E||!a)return{saved:!1};const n=s.map(r=>({session_id:a,...r})),{error:i}=await j.from("assessment_answers").insert(n);return i?(console.warn("[supabase] saveAnswers →",i.message),{saved:!1,error:i.message}):{saved:!0}}async function Fa(){if(!E)return{ok:!1,reason:"not_configured"};try{const{error:a}=await j.from("questions").select("id",{head:!0,count:"exact"});return a?{ok:!1,reason:a.message}:{ok:!0}}catch(a){return{ok:!1,reason:a.message}}}const L=4;function ta(a,s){const n=Math.max(0,Math.min(L,Number(s)));return a.is_reverse_scored?(L-n)/L:n/L}function F(a){return a<=G.bajo.max?"bajo":a<=G.moderado.max?"moderado":"prioritario"}function oa(a,s){var d;const n=Object.create(null);for(const m of ee)n[m.id]={sum:0,n:0};let i=0,r=0;const o={};for(const m of a){const l=s[m.id];if(l==null)continue;const f=ta(m,l);o[m.id]=f,n[m.dimension]||(n[m.dimension]={sum:0,n:0}),n[m.dimension].sum+=f,n[m.dimension].n+=1,i+=f,r+=1}const c={};for(const[m,l]of Object.entries(n)){const f=l.n?Math.round(l.sum/l.n*100):0;c[m]={score:f,level:F(f),level_label:B[F(f)],label:((d=ee.find(v=>v.id===m))==null?void 0:d.label)||m}}const u=r?Math.round(i/r*100):0,h=F(u),p=Object.entries(c).filter(([,m])=>m.level!=="bajo").sort((m,l)=>l[1].score-m[1].score).map(([m,l])=>({id:m,label:l.label,score:l.score,level:l.level}));return{total_score:u,general_level:h,general_level_label:B[h],dimensions:c,top_attention_areas:p,normalized_by_question:o}}const ca="ABCDEFGHJKLMNPQRSTUVWXYZ",la="23456789";function ne(a,s){let n="";const i=new Uint32Array(s);crypto.getRandomValues(i);for(let r=0;r<s;r++)n+=a[i[r]%a.length];return n}function pe(){return`SIN-${ne(ca,3)}-${ne(la,4)}`}async function da(a){if(!E)return null;try{const{data:s,error:n}=await j.functions.invoke(ce,{body:a});return n?(console.warn("[gemini] error →",n.message),null):!s||typeof s!="object"||s.error?null:s}catch(s){return console.warn("[gemini] excepción →",s.message),null}}async function Ba(){if(!E)return{ok:!1,reason:"not_configured"};try{const{error:a}=await j.functions.invoke(ce,{body:{ping:!0}});return{ok:!a,reason:a==null?void 0:a.message}}catch(a){return{ok:!1,reason:a.message}}}async function ua({questions:a,answers:s,anonymousCode:n}){const i=oa(a,s),r=n||pe(),o={anonymous_code:r,test_version:Q,total_score:i.total_score,general_level:i.general_level,dimension_scores:i.dimensions,top_attention_areas:i.top_attention_areas},{id:c}=await ia(o);if(c){const p=Object.entries(s).map(([d,m])=>({question_id:d,answer_value:Number(m),normalized_value:i.normalized_by_question[d]??null}));await ra(c,p)}const u=await na(),h=await da({session_id:c,test_version:Q,general_level:i.general_level,dimensions:i.dimensions,top_attention_areas:i.top_attention_areas,recommendation_catalog:u.slice(0,30)});return{session_id:c||null,anonymous_code:r,created_at:new Date().toISOString(),...i,ai:h||null,base_recommendations:u}}function ma(){const a=P(),[s,n]=t.useState([]),[i,r]=t.useState({}),[o,c]=t.useState(0),[u,h]=t.useState(!0),[p,d]=t.useState(!1),[m,l]=t.useState(null);t.useEffect(()=>{if(!sessionStorage.getItem(A.CONSENT)){a("/consentimiento",{replace:!0});return}let k=!0;return sa().then(xe=>{if(k){n(xe);try{const W=sessionStorage.getItem(A.ANSWERS);W&&r(JSON.parse(W))}catch{}h(!1)}}),()=>{k=!1}},[]),t.useEffect(()=>{if(!u)try{sessionStorage.setItem(A.ANSWERS,JSON.stringify(i))}catch{}},[i,u]);const f=s.length,v=s[o],w=t.useMemo(()=>s.every(y=>i[y.id]!==void 0),[s,i]);function _(y){v&&r(k=>({...k,[v.id]:y}))}function q(){o<f-1&&c(y=>y+1)}function C(){o>0&&c(y=>y-1)}async function z(){if(!w){const y=s.findIndex(k=>i[k.id]===void 0);y!==-1&&c(y);return}d(!0),l(null);try{const y=pe(),k=await ua({questions:s,answers:i,anonymousCode:y});sessionStorage.setItem(A.RESULT,JSON.stringify(k)),sessionStorage.setItem(A.ANON_CODE,y),sessionStorage.removeItem(A.ANSWERS),a("/resultado")}catch(y){console.error(y),l("No pudimos generar tu resultado en este momento. Intenta nuevamente en unos segundos.")}finally{d(!1)}}return u?e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{maxWidth:720,textAlign:"center"},children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto 18px"}}),e.jsx("p",{className:"lede",children:"Preparando preguntas…"})]})}):e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:820},children:[e.jsx(Xe,{current:o+1,total:f}),v&&e.jsx(ea,{index:o,question:v,value:i[v.id],onChange:_}),e.jsxs("div",{className:"assess-actions mt-3",children:[e.jsx("button",{className:"btn btn-ghost",onClick:C,disabled:o===0,children:"← Anterior"}),o<f-1?e.jsx("button",{className:"btn btn-primary",onClick:q,disabled:i[v==null?void 0:v.id]===void 0,children:"Siguiente →"}):e.jsx("button",{className:"btn btn-coral btn-lg",onClick:z,disabled:p||!w,children:p?"Generando orientación…":"Finalizar y ver resultado"})]}),!w&&o===f-1&&e.jsx("p",{className:"note text-center mt-3",children:'Te faltan algunas preguntas por contestar. Usa "Anterior" para revisarlas.'}),m&&e.jsx("div",{className:"mt-4",children:e.jsx(D,{variant:"warm",children:m})}),e.jsx("p",{className:"text-center mt-4",children:e.jsx(b,{to:"/",className:"note",children:"Salir y descartar respuestas"})})]}),e.jsx("style",{children:`
        .assess-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
      `})]})}function pa({result:a}){if(!a)return null;const{total_score:s,general_level_label:n,anonymous_code:i,ai:r}=a;return e.jsx("section",{className:"result-card",children:e.jsxs("div",{className:"result-hero",children:[e.jsxs("div",{className:"result-score",children:[e.jsx("span",{className:"result-score-num",children:s}),e.jsx("span",{className:"result-score-label",children:"/ 100"})]}),e.jsxs("div",{className:"result-meta",children:[e.jsx("span",{className:"tag",children:"Tu orientación"}),e.jsx("h1",{className:"mt-2",children:n}),e.jsx("p",{className:"result-summary",children:(r==null?void 0:r.friendly_summary)||"Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico."}),i&&e.jsxs("p",{className:"anon-code",children:["Tu código anónimo: ",e.jsx("strong",{children:i}),e.jsx("small",{children:"Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde."})]})]})]})})}function xa({dimensions:a}){const s=Object.entries(a);return e.jsx("div",{className:"dim-chart",role:"list",children:s.map(([n,i])=>e.jsxs("div",{className:"dim-row",role:"listitem",children:[e.jsx("div",{className:"dim-label",children:i.label}),e.jsx("div",{className:"dim-track","aria-label":`Puntaje ${i.score} de 100`,children:e.jsx("span",{className:`dim-fill lvl-bg-${i.level}`,style:{width:`${i.score}%`}})}),e.jsxs("div",{className:`dim-value lvl-${i.level}`,children:[i.score,e.jsx("small",{children:B[i.level]})]})]},n))})}function ha({sessionId:a}){const[s,n]=t.useState(0),[i,r]=t.useState(0),[o,c]=t.useState(""),[u,h]=t.useState(!1),[p,d]=t.useState(!1);async function m(){if(s!==0){if(d(!0),E)try{await j.from("assessment_feedback").insert({session_id:a||null,rating:s,comment:o.trim()||null})}catch(l){console.warn(l)}h(!0),d(!1)}}return u?e.jsx("div",{className:"feedback-thanks",children:e.jsxs("p",{children:["✨ ",e.jsx("strong",{children:"Gracias por tu retroalimentación."})," Nos ayuda a mejorar el programa."]})}):e.jsxs("div",{className:"feedback-box",children:[e.jsx("h3",{children:"¿Cómo te pareció esta orientación?"}),e.jsx("div",{className:"stars",role:"radiogroup","aria-label":"Calificación",children:[1,2,3,4,5].map(l=>e.jsx("button",{type:"button",role:"radio","aria-checked":s===l,className:`star ${(i||s)>=l?"active":""}`,onMouseEnter:()=>r(l),onMouseLeave:()=>r(0),onClick:()=>n(l),children:"★"},l))}),e.jsx("textarea",{placeholder:"Comentario opcional…",value:o,onChange:l=>c(l.target.value),rows:2}),e.jsx("button",{className:"btn btn-primary btn-sm",disabled:s===0||p,onClick:m,children:p?"Enviando…":"Enviar"}),e.jsx("style",{children:`
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
      `})]})}function fa(){var h,p,d,m;const a=P(),[s,n]=t.useState(null);if(t.useEffect(()=>{try{const l=sessionStorage.getItem(A.RESULT);if(!l)return a("/",{replace:!0});n(JSON.parse(l))}catch{a("/",{replace:!0})}},[a]),!s)return null;const i=((h=s.ai)==null?void 0:h.suggested_actions)||[],r=((p=s.ai)==null?void 0:p.recommended_resources)||[],o=(d=s.ai)==null?void 0:d.safety_note,c=s.base_recommendations?aa(s.dimensions).map(l=>({title:l.title,description:l.description})):[];function u(){var f,v,w;const l=["AURA — Tu orientación",`Código anónimo: ${s.anonymous_code}`,`Nivel general: ${s.general_level_label} (${s.total_score}/100)`,"","Dimensiones:",...Object.entries(s.dimensions).map(([,_])=>`  • ${_.label}: ${_.score} (${_.level_label})`),"",((f=s.ai)==null?void 0:f.friendly_summary)||"",((v=s.ai)==null?void 0:v.safety_note)||"Esta orientación es informativa y no sustituye atención profesional."].join(`
`);(w=navigator.clipboard)==null||w.writeText(l).catch(()=>{})}return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:1e3},children:[e.jsx(S,{variant:"blurIn",children:e.jsx(pa,{result:s})}),s.general_level==="prioritario"&&e.jsx(S,{variant:"slideUp",delay:.1,children:e.jsxs("div",{className:"crisis-banner",children:[e.jsx("strong",{children:"📞 Tus respuestas sugieren acercarte a apoyo profesional."}),e.jsxs("p",{children:["Hay servicios universitarios y la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," disponibles 24/7."]}),e.jsx(b,{to:"/apoyo",className:"btn btn-coral btn-sm",children:"Ver opciones de apoyo →"})]})}),e.jsx(S,{variant:"slideUp",delay:.15,children:e.jsxs("div",{className:"route-cta mt-3",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"✨ Crea tu ruta de bienestar"}),e.jsx("small",{children:"Pum-AI te puede generar un plan diario de 7 o 14 días personalizado a tu resultado."})]}),e.jsx(b,{to:"/ruta",className:"btn btn-gold",children:"Comenzar mi ruta →"})]})}),e.jsx(S,{variant:"fadeIn",delay:.2,children:e.jsx(D,{children:o||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado, pero no constituyen un diagnóstico clínico. Si lo necesitas, acércate a un servicio de orientación universitario."]})})}),e.jsxs("div",{className:"results-grid mt-4",children:[e.jsx(S,{variant:"slideRight",children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag azul",children:"Tus dimensiones"}),e.jsx("h2",{className:"mt-2",children:"Cómo se ve tu bienestar por área"}),e.jsx("p",{className:"lede",children:"Cada barra representa el nivel de atención que sugieren tus respuestas en esa área. Mayor puntaje = mayor invitación al autocuidado."}),e.jsx(xa,{dimensions:s.dimensions})]})}),e.jsx(S,{variant:"slideLeft",delay:.15,children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag coral",children:"Acciones sugeridas"}),e.jsx("h2",{className:"mt-2",children:"Pasos pequeños y útiles"}),i.length>0?e.jsx("ul",{className:"rec-list",children:i.map((l,f)=>e.jsxs("li",{children:["✦ ",l]},f))}):e.jsxs("ul",{className:"rec-list",children:[c.length===0&&e.jsx("li",{children:"Sigue cultivando tus rutinas de bienestar. Tus respuestas no muestran áreas urgentes hoy."}),c.map((l,f)=>e.jsxs("li",{children:[e.jsxs("strong",{children:[l.title,"."]})," ",l.description]},f))]})]})})]}),e.jsx(S,{variant:"zoomIn",children:e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag mint",children:"Recursos sugeridos"}),e.jsx("h2",{className:"mt-2",children:"Recursos universitarios para ti"}),r.length>0?e.jsx("ul",{className:"rec-list",children:r.map((l,f)=>e.jsxs("li",{children:["📌 ",l]},f))}):e.jsxs("p",{children:["Visita la sección de ",e.jsx(b,{to:"/recursos",children:"Recursos de apoyo"})," para ver el catálogo completo."]})]})}),((m=s.top_attention_areas)==null?void 0:m.length)>0&&e.jsx(S,{variant:"slideUp",children:e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag",children:"Áreas con mayor atención sugerida"}),e.jsx("h2",{className:"mt-2",children:"Dónde poner foco"}),e.jsx("ul",{className:"rec-list",children:s.top_attention_areas.map(l=>e.jsxs("li",{children:[e.jsx("strong",{children:l.label})," — Puntaje: ",l.score,", nivel: ",l.level==="prioritario"?"prioritario":"moderado","."]},l.id))})]})}),e.jsx(S,{variant:"fadeIn",children:e.jsx(ha,{sessionId:s.session_id})}),e.jsx(S,{variant:"slideUp",delay:.1,children:e.jsxs("div",{className:"results-actions mt-4",children:[e.jsx("button",{className:"btn btn-gold",onClick:u,children:"📋 Copiar resultado"}),e.jsx(b,{to:"/recursos",className:"btn btn-secondary btn-primary",children:"Ver recursos universitarios"}),e.jsx(b,{to:"/evaluacion",className:"btn btn-ghost",children:"Volver a evaluar"}),e.jsx(b,{to:"/",className:"btn btn-ghost",children:"Ir al inicio"})]})})]}),e.jsx("style",{children:`
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
      `})]})}const ga=t.lazy(()=>N(()=>import("./Resources-Ccz6f36-.js"),__vite__mapDeps([0,1,2,3]))),ba=t.lazy(()=>N(()=>import("./Privacy-BLp3sJXt.js"),__vite__mapDeps([4,1,2]))),va=t.lazy(()=>N(()=>import("./MyHistory-B_N9C8po.js"),__vite__mapDeps([5,1,2]))),ja=t.lazy(()=>N(()=>import("./CheckIn-Bn54uEHS.js"),__vite__mapDeps([6,1,2]))),ya=t.lazy(()=>N(()=>import("./Journal-DY6QrtlV.js"),__vite__mapDeps([7,1,2]))),_a=t.lazy(()=>N(()=>import("./Support-CBSJgrfn.js"),__vite__mapDeps([8,1,2]))),Na=t.lazy(()=>N(()=>import("./WellnessRoute-DW0Soqam.js"),__vite__mapDeps([9,1,2]))),wa=t.lazy(()=>N(()=>import("./Companion-kuHQSyv8.js"),__vite__mapDeps([10,1,2]))),Sa=t.lazy(()=>N(()=>import("./Library-8yKji66A.js"),__vite__mapDeps([11,1,2]))),ka=t.lazy(()=>N(()=>import("./Emotions-BwlVvF-v.js"),__vite__mapDeps([12,1,2]))),Aa=t.lazy(()=>N(()=>import("./MapPage-D7Z5lRlx.js"),__vite__mapDeps([13,1,2]))),Ea=t.lazy(()=>N(()=>import("./Trees-B1jVOhL5.js"),__vite__mapDeps([14,1,2]))),Ca=t.lazy(()=>N(()=>import("./Buddy-mTf1ex9w.js"),__vite__mapDeps([15,1,2]))),za=t.lazy(()=>N(()=>import("./Adventure-CI6ilaRR.js"),__vite__mapDeps([16,1,2]))),Ra=t.lazy(()=>N(()=>import("./Calendar-Bu9nAWwr.js"),__vite__mapDeps([17,1,2]))),qa=t.lazy(()=>N(()=>import("./Admin-BlYDzxPI.js"),__vite__mapDeps([18,1,19,2]))),Ia=t.lazy(()=>N(()=>import("./AdminLogin-CLbXWomW.js"),__vite__mapDeps([20,1,19,2])));function Ta(){return e.jsx("div",{style:{display:"grid",placeItems:"center",minHeight:"40vh"},children:e.jsx("div",{className:"spinner"})})}function La(){const a=I(),s=a.pathname.startsWith("/admin"),n=!s&&a.pathname!=="/evaluacion";return e.jsxs(e.Fragment,{children:[n&&e.jsx(Oe,{}),!s&&e.jsx(Ce,{}),e.jsx("main",{children:e.jsx(t.Suspense,{fallback:e.jsx(Ta,{}),children:e.jsx(Fe,{children:e.jsxs(he,{children:[e.jsx(g,{path:"/",element:e.jsx(Qe,{})}),e.jsx(g,{path:"/consentimiento",element:e.jsx(Ge,{})}),e.jsx(g,{path:"/evaluacion",element:e.jsx(ma,{})}),e.jsx(g,{path:"/resultado",element:e.jsx(fa,{})}),e.jsx(g,{path:"/recursos",element:e.jsx(ga,{})}),e.jsx(g,{path:"/privacidad",element:e.jsx(ba,{})}),e.jsx(g,{path:"/mi-historia",element:e.jsx(va,{})}),e.jsx(g,{path:"/check-in",element:e.jsx(ja,{})}),e.jsx(g,{path:"/diario",element:e.jsx(ya,{})}),e.jsx(g,{path:"/apoyo",element:e.jsx(_a,{})}),e.jsx(g,{path:"/ruta",element:e.jsx(Na,{})}),e.jsx(g,{path:"/companion",element:e.jsx(wa,{})}),e.jsx(g,{path:"/biblioteca",element:e.jsx(Sa,{})}),e.jsx(g,{path:"/emociones",element:e.jsx(ka,{})}),e.jsx(g,{path:"/mapa",element:e.jsx(Aa,{})}),e.jsx(g,{path:"/arboles",element:e.jsx(Ea,{})}),e.jsx(g,{path:"/buddy",element:e.jsx(Ca,{})}),e.jsx(g,{path:"/aventura",element:e.jsx(za,{})}),e.jsx(g,{path:"/calendario",element:e.jsx(Ra,{})}),e.jsx(g,{path:"/docentes",element:e.jsx(Y,{to:"/admin/login",replace:!0})}),e.jsx(g,{path:"/admin/login",element:e.jsx(Ia,{})}),e.jsx(g,{path:"/admin/*",element:e.jsx(qa,{})}),e.jsx(g,{path:"*",element:e.jsx(Y,{to:"/",replace:!0})})]})})})}),!s&&e.jsx(ze,{}),!s&&e.jsx(Re,{}),!s&&e.jsx(Le,{}),!s&&e.jsx(Ue,{})]})}(function(){const s=new URLSearchParams(window.location.search),n=s.get("p");if(n!==null){const i=s.get("q"),r=window.location.pathname.replace(/\/$/,"")+n+(i?"?"+i.replace(/~and~/g,"&"):"")+window.location.hash;window.history.replaceState(null,"",r)}})();const Oa="/aura-fesi/".replace(/\/$/,"");oe(document.getElementById("root")).render(e.jsx(fe.StrictMode,{children:e.jsx(ge,{basename:Oa,children:e.jsx(La,{})})}));export{ee as D,Da as R,D as S,Ae as a,S as b,Ee as c,A as d,Fa as e,$a as f,X as g,Ba as h,E as i,e as j,Ua as k,j as s,U as u};
