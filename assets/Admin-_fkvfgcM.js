import{j as e,s as N,D as $,R as ie,C as ae,S as qe,e as Ie,h as Le,i as Pe,b as O,k as $e}from"./index-lF9CPj9B.js";import{r as u,N as X,L as Fe,d as Ae,b as Te,R as De,c as R}from"./vendor-react-Be-nUyB0.js";import{R as ze,s as Be,c as Y,g as de}from"./authService-CdqwpFWS.js";import{I as re}from"./Icon-ANwq2TAS.js";import"./vendor-supabase-J7ITh-P0.js";const me={estado_emocional:["#1A3358","#10243E"],estres_academico:["#D26B53","#B5403E"],sueno_descanso:["#B7A8D9","#6E5BA0"],apoyo_social:["#8FB8A0","#4FA88E"],motivacion_pertenencia:["#E5C868","#B08F1F"]},ue=["#1A3358","#10243E"],le=720,oe=460,J=le/2,K=oe/2,Q=160,xe=600,Oe=18e-5;function Ue(s,a){const l=parseInt(s.slice(1),16),n=Math.min(255,(l>>16&255)+Math.round(2.55*a)),t=Math.min(255,(l>>8&255)+Math.round(2.55*a)),i=Math.min(255,(l&255)+Math.round(2.55*a));return`#${(n<<16|t<<8|i).toString(16).padStart(6,"0")}`}function Xe({data:s=[]}){const a=u.useRef(null),l=u.useRef({rotY:0,rotX:.25}),[n,t]=u.useState(0),[i,o]=u.useState(null),r=u.useMemo(()=>{const b=s.length||1;return s.map((k,C)=>{const E=Math.acos(1-2*(C+.5)/b),L=Math.PI*(1+Math.sqrt(5))*C;return{...k,p:{x:Math.sin(E)*Math.cos(L),y:Math.sin(E)*Math.sin(L),z:Math.cos(E)}}})},[s]),d=Math.max(1,...s.map(b=>b.mentions||0)),p=Math.min(...s.map(b=>b.mentions||0)),v=b=>d===p?38:30+(b-p)/(d-p)*28;u.useEffect(()=>{let b,k=performance.now();const C=E=>{const L=E-k;k=E,i||(l.current.rotY+=L*Oe),t(B=>B+1),b=requestAnimationFrame(C)};return b=requestAnimationFrame(C),()=>cancelAnimationFrame(b)},[i]);function x(b){var E,L;b.preventDefault();const{rotX:k,rotY:C}=l.current;o({startX:b.clientX,startY:b.clientY,startRotX:k,startRotY:C}),(L=(E=b.currentTarget).setPointerCapture)==null||L.call(E,b.pointerId)}function f(b){if(!i)return;const k=b.clientX-i.startX,C=b.clientY-i.startY;l.current.rotY=i.startRotY+k*.006,l.current.rotX=We(i.startRotX+C*.005,-1.2,1.2)}function m(b){var k,C;(C=(k=b.currentTarget).releasePointerCapture)==null||C.call(k,b.pointerId),o(null)}const{rotX:c,rotY:h}=l.current,_=Math.cos(h),y=Math.sin(h),w=Math.cos(c),g=Math.sin(c),j=r.map(b=>{const{x:k,y:C,z:E}=b.p,L=k*_+E*y,B=-k*y+E*_,S=C,M=S*w-B*g,A=S*g+B*w,I=L,F=A*Q,P=xe/(xe-F);return{...b,sx:J+I*Q*P,sy:K+M*Q*P,depth:A,scale:P}});return j.sort((b,k)=>b.depth-k.depth),s.length?e.jsxs("div",{className:"bubbles-wrap",children:[e.jsxs("svg",{ref:a,viewBox:`0 0 ${le} ${oe}`,className:`bubbles-svg ${i?"dragging":""}`,role:"img","aria-label":"Modelo dimensional 3D del bienestar",onPointerDown:x,onPointerMove:f,onPointerUp:m,onPointerCancel:m,style:{cursor:i?"grabbing":"grab",touchAction:"none"},children:[e.jsxs("defs",{children:[j.map(b=>{const[k,C]=me[b.dimension_id]||ue;return e.jsxs("radialGradient",{id:`grad-${b.dimension_id}`,cx:"32%",cy:"28%",r:"75%",children:[e.jsx("stop",{offset:"0%",stopColor:Ue(k,35)}),e.jsx("stop",{offset:"55%",stopColor:k}),e.jsx("stop",{offset:"100%",stopColor:C})]},`grad-${b.dimension_id}`)}),e.jsx("filter",{id:"bubble-shadow",x:"-30%",y:"-30%",width:"160%",height:"160%",children:e.jsx("feDropShadow",{dx:"0",dy:"8",stdDeviation:"14",floodColor:"#10243E",floodOpacity:"0.30"})}),e.jsxs("radialGradient",{id:"aura",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#C9A227",stopOpacity:"0.18"}),e.jsx("stop",{offset:"60%",stopColor:"#C9A227",stopOpacity:"0.05"}),e.jsx("stop",{offset:"100%",stopColor:"#C9A227",stopOpacity:"0"})]})]}),e.jsx("circle",{cx:J,cy:K,r:Q+60,fill:"url(#aura)"}),e.jsx("circle",{cx:J,cy:K,r:"10",fill:"#C9A227",opacity:"0.85"}),e.jsx("text",{x:J,y:K+26,textAnchor:"middle",fontSize:"11",fill:"#10243E",fontWeight:"700",style:{userSelect:"none",pointerEvents:"none"},children:"AURA"}),j.map(b=>{const k=v(b.mentions||0)*b.scale,C=.55+(b.depth+1)*.225;return e.jsxs("g",{transform:`translate(${b.sx}, ${b.sy})`,style:{opacity:C},children:[e.jsx("circle",{r:k,fill:`url(#grad-${b.dimension_id})`,filter:"url(#bubble-shadow)"}),e.jsx("ellipse",{cx:-k*.32,cy:-k*.42,rx:k*.34,ry:k*.18,fill:"white",opacity:"0.35"}),b.depth>-.1&&e.jsxs(e.Fragment,{children:[e.jsx("text",{y:k+16,textAnchor:"middle",fontSize:"11",fontWeight:"700",fill:"#10243E",style:{userSelect:"none",pointerEvents:"none"},children:b.dimension_label||b.dimension_id}),e.jsxs("text",{y:k+28,textAnchor:"middle",fontSize:"9",fill:"#6B7280",style:{userSelect:"none",pointerEvents:"none"},children:[b.mentions," ",b.mentions===1?"mención":"menciones"]})]})]},b.dimension_id)}),e.jsx("text",{x:le-12,y:oe-12,textAnchor:"end",fontSize:"10",fill:"#9CA3AF",style:{userSelect:"none",pointerEvents:"none"},children:i?"Soltando para volver a animación":"Arrastra para rotar ↻"})]}),e.jsx("div",{className:"bubbles-legend",children:s.map(b=>{const[k]=me[b.dimension_id]||ue;return e.jsxs("div",{className:"legend-item",children:[e.jsx("span",{className:"legend-dot",style:{background:k}}),e.jsxs("div",{children:[e.jsx("strong",{children:b.dimension_label}),e.jsxs("small",{children:[b.mentions," ",b.mentions===1?"mención":"menciones"," · ","Promedio: ",b.avg_score]})]})]},b.dimension_id)})}),e.jsx("style",{children:`
        .bubbles-wrap {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .bubbles-svg {
          width: 100%;
          height: auto;
          background: radial-gradient(ellipse at center, #FFFAF5, #ffffff 75%);
          border-radius: var(--r-xl);
          border: 1px solid var(--c-borde);
          user-select: none;
        }
        .bubbles-svg.dragging { background: radial-gradient(ellipse at center, #FBF1D2, #ffffff 75%); }
        .empty-bubbles {
          padding: 48px;
          text-align: center;
          background: var(--c-marfil);
          border: 1px dashed var(--c-borde);
          border-radius: var(--r-xl);
        }
        .bubbles-legend {
          display: grid;
          gap: 10px;
        }
        .legend-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: 12px;
          font-size: 0.92rem;
        }
        .legend-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          box-shadow:
            inset -3px -3px 4px rgba(0,0,0,0.18),
            0 2px 4px rgba(0,0,0,0.12);
        }
        .legend-item strong { color: var(--c-azul-800); display: block; }
        .legend-item small  { color: var(--c-gris); font-size: 0.82rem; }

        @media (max-width: 880px) {
          .bubbles-wrap { grid-template-columns: 1fr; }
        }
      `})]}):e.jsx("div",{className:"empty-bubbles",children:e.jsx("p",{className:"note",children:"Aún no hay datos suficientes para construir el modelo dimensional. En cuanto lleguen sesiones, las esferas tomarán forma."})})}function We(s,a,l){return Math.max(a,Math.min(l,s))}const he="aura.theme";function Ge(){const[s,a]=u.useState(()=>typeof window>"u"?!1:localStorage.getItem(he)==="dark");return u.useEffect(()=>{document.documentElement.dataset.theme=s?"dark":"light",localStorage.setItem(he,s?"dark":"light")},[s]),e.jsxs("button",{className:"theme-toggle",onClick:()=>a(l=>!l),title:s?"Cambiar a modo claro":"Cambiar a modo oscuro","aria-label":"Cambiar tema",children:[s?"☀️":"🌙",e.jsx("style",{children:`
        .theme-toggle {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 10px;
          margin-top: 12px;
          width: 100%;
          transition: background 0.2s;
        }
        .theme-toggle:hover { background: rgba(255,255,255,0.15); }
      `})]})}const Ee="aura.admin.sidebar.groups",pe=[{id:"home",items:[{to:"",end:!0,icon:"home",label:"Dashboard",hideForRoles:["docente"]}]},{id:"analytics",label:"Análisis",icon:"sparkles",items:[{to:"estadisticas",icon:"chart-bar",label:"Estadísticas",requires:"view_aggregated"},{to:"avanzado",icon:"brain",label:"Análisis avanzado",requires:"view_aggregated"},{to:"insights",icon:"wand",label:"Pum-AI Insights",requires:"view_insights"},{to:"exportar",icon:"download",label:"Exportar",requires:"view_aggregated"}]},{id:"people",label:"Personas",icon:"user-heart",items:[{to:"sesiones",icon:"check-list",label:"Sesiones",requires:"view_detail"},{to:"anonimos",icon:"friends",label:"Usuarios anónimos",requires:"view_detail"},{to:"buscar",icon:"search",label:"Buscar por código",requires:"view_detail"}]},{id:"content",label:"Contenido",icon:"notebook",items:[{to:"contenido",icon:"edit",label:"Editor de contenido",requires:"manage_content"},{to:"programa",icon:"tree",label:"Programa",requires:"manage_content"},{to:"docentes",icon:"books",label:"Kit docente",requires:"view_teachers_kit"}]},{id:"security",label:"Seguridad",icon:"shield",items:[{to:"operacion",icon:"lock",label:"Operación",requires:"manage_security"},{to:"seguridad",icon:"alert",label:"Eventos seguridad",requires:"manage_security"},{to:"costos-ai",icon:"coin",label:"Costos Pum-AI",requires:"manage_security"},{to:"auditoria",icon:"history",label:"Auditoría",requires:"manage_users"}]},{id:"system",label:"Sistema",icon:"settings",items:[{to:"sistema",icon:"settings",label:"Configuración",requires:"manage_config"},{to:"usuarios",icon:"user-cog",label:"Usuarios admin",requires:"manage_users"}]}],ge={"chart-bar":e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:"12",y1:"20",x2:"12",y2:"10"}),e.jsx("line",{x1:"18",y1:"20",x2:"18",y2:"4"}),e.jsx("line",{x1:"6",y1:"20",x2:"6",y2:"16"})]}),brain:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24 2.5 2.5 0 014.44-1.04z"}),e.jsx("path",{d:"M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24 2.5 2.5 0 00-4.44-1.04z"})]}),wand:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M15 4l5 5L9 20l-5-5z"}),e.jsx("line",{x1:"14",y1:"5",x2:"19",y2:"10"}),e.jsx("path",{d:"M5 3v2M3 5h4M19 17v2M17 19h4"})]}),download:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),edit:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),e.jsx("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4z"})]}),lock:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0110 0v4"})]}),alert:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"}),e.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),e.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),coin:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"}),e.jsx("line",{x1:"12",y1:"6",x2:"12",y2:"8"}),e.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"18"})]}),history:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polyline",{points:"12 6 12 12 16 14"})]}),shield:e.jsx(e.Fragment,{children:e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),"user-cog":e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"9",cy:"7",r:"4"}),e.jsx("path",{d:"M3 21v-2a4 4 0 014-4h4"}),e.jsx("circle",{cx:"18",cy:"15",r:"3"}),e.jsx("path",{d:"M18 11v1M18 19v-1M14.6 13l.9.5M21.5 16.5l-.9-.5M14.6 17l.9-.5M21.5 13.5l-.9.5"})]}),search:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})};function He(){try{const s=localStorage.getItem(Ee);return s?JSON.parse(s):null}catch{return null}}function Ve(s){try{localStorage.setItem(Ee,JSON.stringify(s))}catch{}}function W({name:s,size:a=18}){return ge[s]?e.jsx("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{display:"inline-block",verticalAlign:"middle",flexShrink:0},"aria-hidden":"true",children:ge[s]}):e.jsx(re,{name:s,size:a})}function Ye({ctx:s}){const a=s.admin.role,l=(s.admin.full_name||s.admin.email).split(/\s+/).map(r=>r[0]).filter(Boolean).slice(0,2).join("").toUpperCase(),[n,t]=u.useState(()=>{const r=He();if(r)return r;const d={};return pe.forEach((p,v)=>{d[p.id]=v===0||v===1}),d});u.useEffect(()=>{Ve(n)},[n]);function i(r){t(d=>({...d,[r]:!d[r]}))}function o(r){return r.filter(d=>{var p;return!((p=d.hideForRoles)!=null&&p.includes(a)||d.requires&&!Y(a,d.requires))})}return e.jsxs("aside",{className:"admin-side admin-side-v2",children:[e.jsx(X,{to:"",end:!0,className:"admin-brand","aria-label":"Inicio del panel",children:e.jsx("img",{src:"/aura-fesi/Aura.png",alt:"AURA",className:"admin-brand-logo",loading:"eager",decoding:"async"})}),e.jsxs(X,{to:"perfil",className:"profile-link",title:"Editar mi perfil",children:[e.jsx("span",{className:"avatar","aria-hidden":"true",children:l}),e.jsxs("div",{className:"profile-meta",children:[e.jsx("span",{className:"role-chip",children:ze[a]||a}),e.jsx("strong",{children:s.admin.full_name||s.admin.email}),e.jsx("small",{children:s.admin.email})]}),e.jsx("span",{className:"edit-icon","aria-hidden":"true",children:e.jsx(W,{name:"settings",size:14})})]}),e.jsxs("nav",{className:"admin-nav",children:[pe.map(r=>{const d=o(r.items);if(d.length===0)return null;if(!r.label)return e.jsx("div",{className:"nav-group nav-group-flat",children:d.map(v=>e.jsxs(X,{to:v.to,end:v.end,children:[e.jsx(W,{name:v.icon}),e.jsx("span",{children:v.label})]},v.to))},r.id);const p=!!n[r.id];return e.jsxs("div",{className:`nav-group ${p?"open":""}`,children:[e.jsxs("button",{type:"button",className:"nav-group-head",onClick:()=>i(r.id),children:[e.jsx(W,{name:r.icon}),e.jsx("span",{className:"nav-group-label",children:r.label}),e.jsx("span",{className:"nav-group-chev","aria-hidden":"true",children:e.jsx(re,{name:"chevron-down",size:14})})]}),e.jsx("div",{className:"nav-group-items","aria-hidden":!p,children:d.map(v=>e.jsxs(X,{to:v.to,end:v.end,children:[e.jsx(W,{name:v.icon}),e.jsx("span",{children:v.label})]},v.to))})]},r.id)}),e.jsx("div",{className:"nav-group nav-group-flat nav-group-footer",children:e.jsxs(X,{to:"perfil",children:[e.jsx(W,{name:"user-heart"}),e.jsx("span",{children:"Mi perfil"})]})})]}),e.jsx(Ge,{}),e.jsxs("button",{className:"logout",onClick:async()=>{await Be(),window.location.href="/aura-fesi/admin/login"},children:[e.jsx(re,{name:"logout",size:16}),e.jsx("span",{children:"Cerrar sesión"})]}),e.jsx("style",{children:`
        .admin-side-v2 .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 0;                 /* CERO espacio entre grupos */
          margin-top: 10px;
          padding-bottom: 12px;
          overflow-y: auto;
        }

        /* ===== Grupos (tema CLARO Atardecer) ===== */
        .nav-group {
          display: flex;
          flex-direction: column;
          margin: 0;              /* sin margin externo, los headers quedan pegados */
        }
        .nav-group-flat { gap: 2px; }
        .nav-group-flat > a {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: 10px;
          color: var(--c-azul-800);
          font-size: 0.92rem; font-weight: 600;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .nav-group-flat > a:hover { background: rgba(157,123,217,0.10); transform: translateX(2px); }
        .nav-group-flat > a.active {
          background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
          color: var(--c-azul-800);
          box-shadow: 0 4px 12px rgba(201,162,39,0.25);
        }

        /* ===== Header del grupo colapsable ===== */
        .nav-group-head {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          margin: 0;                /* sin margin para que los headers queden pegados */
          background: transparent;
          border: 0;
          color: var(--c-texto-soft);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 8px;
          transition: color 0.15s ease, background 0.15s ease;
          text-align: left;
          width: 100%;
        }
        .nav-group-head:hover {
          color: var(--c-azul-800);
          background: rgba(157,123,217,0.10);
        }
        .nav-group.open .nav-group-head {
          color: var(--c-azul-800);
          background: rgba(157,123,217,0.08);
        }
        .nav-group-label { flex: 1; }
        .nav-group-chev {
          display: inline-flex;
          transition: transform 0.25s cubic-bezier(.2,.7,.2,1);
          opacity: 0.7;
        }
        .nav-group.open .nav-group-chev { transform: rotate(0deg); }
        .nav-group:not(.open) .nav-group-chev { transform: rotate(-90deg); }

        /* ===== Items del grupo (colapsable) ===== */
        /* Usamos max-height (con un tope generoso) en lugar de grid-template-rows.
           max-height permite contraer a 0 PIXELES sin dejar residuos. */
        .nav-group-items {
          max-height: 600px;
          overflow: hidden;
          padding: 4px 0 4px 12px;
          margin-left: 14px;
          border-left: 1.5px solid rgba(157,123,217,0.30);
          opacity: 1;
          transition: max-height 0.32s cubic-bezier(.2,.7,.2,1),
                      padding 0.32s cubic-bezier(.2,.7,.2,1),
                      opacity 0.22s ease,
                      border-color 0.22s ease;
        }
        .nav-group:not(.open) .nav-group-items {
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          opacity: 0;
          border-left-color: transparent;
          pointer-events: none;
        }
        .nav-group-items > a {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 12px;
          margin: 1px 0;
          border-radius: 8px;
          color: var(--c-texto-soft);
          font-size: 0.88rem;
          font-weight: 500;
          transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
        }
        .nav-group-items > a:hover {
          background: rgba(157,123,217,0.10);
          color: var(--c-azul-800);
          transform: translateX(3px);
        }
        .nav-group-items > a.active {
          background: var(--c-oro-100);
          color: var(--c-oro-700);
          border-left: 3px solid var(--c-oro-600);
          padding-left: 9px;
        }

        /* ===== Logout con icono ===== */
        .admin-side-v2 .logout {
          display: flex; align-items: center; gap: 8px;
          justify-content: center;
          width: 100%;
          padding: 10px 12px;
          margin-top: 10px;
          background: transparent;
          border: 1px solid var(--c-coral-500);
          border-radius: 10px;
          color: var(--c-coral-700);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .admin-side-v2 .logout:hover {
          background: var(--c-coral-600);
          border-color: var(--c-coral-500);
          color: #fff;
        }

        .nav-group-footer {
          margin-top: 6px; padding-top: 6px;
          border-top: 1px solid var(--c-borde-soft);
        }

        /* ===== Mobile ===== */
        @media (max-width: 880px) {
          .admin-side-v2 { padding: 16px; }
          .nav-group-head { font-size: 0.72rem; }
        }
      `})]})}const je={admin:"Administrador",analista:"Analista",especialista:"Especialista",coordinador:"Coordinador"};function Je({ctx:s,onUpdated:a}){const[l,n]=u.useState(s.admin.full_name||""),[t,i]=u.useState(""),[o,r]=u.useState(""),[d,p]=u.useState(!1),[v,x]=u.useState(!1),[f,m]=u.useState(null);async function c(_){_.preventDefault(),m(null),p(!0);try{const{error:y}=await N.from("admin_users").update({full_name:l.trim()||null}).eq("id",s.admin.id);if(y)throw y;m({type:"ok",text:"Nombre actualizado."}),a==null||a()}catch(y){m({type:"error",text:y.message})}finally{p(!1)}}async function h(_){if(_.preventDefault(),m(null),t.length<8){m({type:"error",text:"La contraseña debe tener al menos 8 caracteres."});return}if(t!==o){m({type:"error",text:"Las contraseñas no coinciden."});return}x(!0);try{const{error:y}=await N.auth.updateUser({password:t});if(y)throw y;i(""),r(""),m({type:"ok",text:"Contraseña actualizada exitosamente."})}catch(y){m({type:"error",text:y.message})}finally{x(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Mi perfil"}),e.jsx("h1",{className:"mt-2",children:"Tu cuenta administrativa"}),e.jsxs("p",{className:"lede",children:["Eres ",e.jsx("strong",{children:je[s.admin.role]}),". Aquí puedes actualizar tu nombre y cambiar tu contraseña."]})]})}),f&&e.jsx("p",{className:`feedback ${f.type} mt-2`,role:"status",children:f.text}),e.jsxs("div",{className:"profile-grid",children:[e.jsxs("section",{className:"panel",children:[e.jsx("h2",{children:"Información"}),e.jsx("p",{className:"note",children:"El correo no se cambia desde aquí (lo gestiona la coordinación general)."}),e.jsxs("form",{onSubmit:c,className:"mt-3",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Correo"}),e.jsx("input",{type:"email",value:s.admin.email,disabled:!0})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Nombre completo"}),e.jsx("input",{type:"text",value:l,onChange:_=>n(_.target.value)})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Rol"}),e.jsx("input",{type:"text",value:je[s.admin.role],disabled:!0})]}),e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:d,children:d?"Guardando…":"Guardar cambios"})]})]}),e.jsxs("section",{className:"panel",children:[e.jsx("h2",{children:"Cambiar contraseña"}),e.jsx("p",{className:"note",children:"Mínimo 8 caracteres. Recomendamos usar una mezcla de letras, números y símbolos."}),e.jsxs("form",{onSubmit:h,className:"mt-3",autoComplete:"off",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Nueva contraseña"}),e.jsx("input",{type:"password",value:t,onChange:_=>i(_.target.value),minLength:8,required:!0,autoComplete:"new-password"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Confirmar contraseña"}),e.jsx("input",{type:"password",value:o,onChange:_=>r(_.target.value),minLength:8,required:!0,autoComplete:"new-password"})]}),e.jsx("button",{type:"submit",className:"btn btn-coral",disabled:v,children:v?"Actualizando…":"Cambiar contraseña"})]})]})]}),e.jsx("style",{children:`
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 12px;
        }
        .feedback {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.92rem;
          display: inline-block;
        }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F8770; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
        @media (max-width: 880px) {
          .profile-grid { grid-template-columns: 1fr; }
        }
      `})]})}async function z({ctx:s,action:a,entity:l,entity_id:n,before_data:t,after_data:i}){var o,r;try{await N.from("admin_audit_log").insert({admin_id:(o=s==null?void 0:s.admin)==null?void 0:o.id,admin_email:(r=s==null?void 0:s.admin)==null?void 0:r.email,action:a,entity:l,entity_id:n?String(n):null,before_data:t||null,after_data:i||null})}catch(d){console.warn("[audit]",d==null?void 0:d.message)}}const Ke=[{id:"general",label:"Sin contexto específico"},{id:"examenes",label:"Periodo de exámenes (parciales/finales)"},{id:"inicio_semestre",label:"Inicio de semestre"},{id:"fin_semestre",label:"Fin de semestre"},{id:"vacaciones",label:"Periodo vacacional"},{id:"regreso_clases",label:"Regreso de vacaciones"},{id:"invierno",label:"Temporada invernal"}];function Qe({onUse:s}){const[a,l]=u.useState(!1),[n,t]=u.useState($[0].id),[i,o]=u.useState("general"),[r,d]=u.useState(5),[p,v]=u.useState("cercano"),[x,f]=u.useState(!1),[m,c]=u.useState([]),[h,_]=u.useState(null);async function y(){f(!0),_(null),c([]);try{const{data:g,error:j}=await N.functions.invoke("suggest-questions",{body:{dimension:n,context:i,count:r,tone:p}});if(j)throw j;if(g!=null&&g.error)throw new Error(g.error);c((g==null?void 0:g.suggestions)||[])}catch(g){_((g==null?void 0:g.message)||"No pudimos generar sugerencias.")}finally{f(!1)}}function w(g){s==null||s({question_text:g.question_text,is_reverse_scored:g.is_reverse_scored,dimension:n}),l(!1)}return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-gold btn-sm",onClick:()=>l(!0),children:"✨ Sugerir con Pum-AI"}),a&&e.jsx("div",{className:"pumai-overlay",onClick:()=>l(!1),children:e.jsxs("div",{className:"pumai-modal",onClick:g=>g.stopPropagation(),children:[e.jsxs("header",{children:[e.jsx("h3",{children:"✨ Pum-AI · Sugerir preguntas"}),e.jsx("button",{className:"close",onClick:()=>l(!1),"aria-label":"Cerrar",children:"✕"})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Dimensión"}),e.jsx("select",{value:n,onChange:g=>t(g.target.value),children:$.map(g=>e.jsx("option",{value:g.id,children:g.label},g.id))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Contexto / época del año"}),e.jsx("select",{value:i,onChange:g=>o(g.target.value),children:Ke.map(g=>e.jsx("option",{value:g.id,children:g.label},g.id))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Tono"}),e.jsxs("select",{value:p,onChange:g=>v(g.target.value),children:[e.jsx("option",{value:"cercano",children:"Cercano (default)"}),e.jsx("option",{value:"neutral",children:"Neutral / formal"}),e.jsx("option",{value:"empatico",children:"Empático / suave"}),e.jsx("option",{value:"directo",children:"Directo / breve"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Cantidad"}),e.jsx("input",{type:"number",min:"1",max:"10",value:r,onChange:g=>d(Number(g.target.value))})]})]}),e.jsx("button",{className:"btn btn-primary",onClick:y,disabled:x,children:x?"Generando con Pum-AI…":"✨ Generar sugerencias"}),h&&e.jsx("p",{className:"error",children:h}),m.length>0&&e.jsxs("div",{className:"results",children:[e.jsxs("h4",{children:["Sugerencias (",m.length,")"]}),m.map((g,j)=>e.jsxs("article",{className:"suggestion",children:[e.jsxs("p",{className:"q-text",children:['"',g.question_text,'"']}),e.jsxs("div",{className:"meta",children:[e.jsx("span",{className:`badge ${g.is_reverse_scored?"pos":"neg"}`,children:g.is_reverse_scored?"↑ Positiva (más = bienestar)":"↓ Negativa (más = malestar)"}),g.rationale&&e.jsx("small",{children:g.rationale})]}),e.jsx("button",{className:"btn btn-coral btn-sm",onClick:()=>w(g),children:"＋ Usar esta"})]},j)),e.jsx("p",{className:"note text-center mt-2",children:"Pum-AI puede equivocarse. Revisa cada sugerencia antes de guardarla."})]})]})}),e.jsx("style",{children:`
        .pumai-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 25, 41, 0.6);
          backdrop-filter: blur(4px);
          display: grid;
          place-items: center;
          z-index: 100;
          padding: 16px;
          animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} }
        .pumai-modal {
          background: var(--c-blanco, #fff);
          border-radius: var(--r-xl);
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
        }
        .pumai-modal header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 14px;
        }
        .pumai-modal h3 { margin: 0; font-size: 1.2rem; color: var(--c-azul-800); }
        .pumai-modal .close {
          background: transparent; border: none; cursor: pointer;
          font-size: 1.4rem; color: var(--c-gris); padding: 4px 8px;
          border-radius: 8px;
        }
        .pumai-modal .close:hover { background: var(--c-azul-100); }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pumai-modal .error {
          background: var(--c-coral-100); color: #93362A;
          padding: 10px 14px; border-radius: 12px; font-size: 0.92rem;
          margin-top: 12px;
        }
        .results { margin-top: 24px; display: grid; gap: 10px; }
        .results h4 { color: var(--c-azul-800); margin: 0 0 6px; }
        .suggestion {
          padding: 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde);
          border-radius: 12px;
        }
        .suggestion .q-text {
          font-family: var(--ff-serif);
          font-size: 1.02rem;
          color: var(--c-azul-800);
          margin: 0 0 8px;
          font-style: italic;
        }
        .suggestion .meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
        .suggestion small { color: var(--c-gris); font-size: 0.82rem; }
        .badge {
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 700;
        }
        .badge.pos { background: var(--c-salvia-100); color: #2F8770; }
        .badge.neg { background: var(--c-coral-100); color: #93362A; }
        @media (max-width: 540px) {
          .form-grid { grid-template-columns: 1fr; }
        }
      `})]})}const Ze=[{id:"bajo",label:"Bajo (mantener)"},{id:"moderado",label:"Moderado (ajustar)"},{id:"prioritario",label:"Prioritario (acompañar)"}],ea=[{id:"autocuidado",label:"Autocuidado individual"},{id:"comunidad",label:"Comunidad / grupal"},{id:"ejercicio",label:"Ejercicio físico"},{id:"mindfulness",label:"Mindfulness / respiración"},{id:"arte",label:"Arte y expresión"},{id:"orientacion",label:"Orientación profesional"}];function aa({onUse:s}){const[a,l]=u.useState(!1),[n,t]=u.useState($[0].id),[i,o]=u.useState("moderado"),[r,d]=u.useState("autocuidado"),[p,v]=u.useState(3),[x,f]=u.useState(!1),[m,c]=u.useState([]),[h,_]=u.useState(null);async function y(){f(!0),_(null),c([]);try{const{data:g,error:j}=await N.functions.invoke("suggest-recommendations",{body:{dimension:n,level:i,type:r,count:p}});if(j)throw j;if(g!=null&&g.error)throw new Error(g.error);c((g==null?void 0:g.suggestions)||[])}catch(g){_((g==null?void 0:g.message)||"No pudimos generar sugerencias.")}finally{f(!1)}}function w(g){s==null||s({...g,dimension:n,level:i}),l(!1)}return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-gold btn-sm",onClick:()=>l(!0),children:"✨ Sugerir con Pum-AI"}),a&&e.jsx("div",{className:"pumai-overlay",onClick:()=>l(!1),children:e.jsxs("div",{className:"pumai-modal",onClick:g=>g.stopPropagation(),children:[e.jsxs("header",{children:[e.jsx("h3",{children:"✨ Pum-AI · Sugerir recomendaciones"}),e.jsx("button",{className:"close",onClick:()=>l(!1),children:"✕"})]}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Dimensión"}),e.jsx("select",{value:n,onChange:g=>t(g.target.value),children:$.map(g=>e.jsx("option",{value:g.id,children:g.label},g.id))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Nivel de atención"}),e.jsx("select",{value:i,onChange:g=>o(g.target.value),children:Ze.map(g=>e.jsx("option",{value:g.id,children:g.label},g.id))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Tipo de acción"}),e.jsx("select",{value:r,onChange:g=>d(g.target.value),children:ea.map(g=>e.jsx("option",{value:g.id,children:g.label},g.id))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Cantidad"}),e.jsx("input",{type:"number",min:"1",max:"6",value:p,onChange:g=>v(Number(g.target.value))})]})]}),e.jsx("button",{className:"btn btn-primary",onClick:y,disabled:x,children:x?"Generando con Pum-AI…":"✨ Generar sugerencias"}),h&&e.jsx("p",{className:"error",children:h}),m.length>0&&e.jsxs("div",{className:"results",children:[e.jsxs("h4",{children:["Sugerencias (",m.length,")"]}),m.map((g,j)=>e.jsxs("article",{className:"suggestion",children:[e.jsx("strong",{children:g.title}),e.jsx("p",{children:g.description}),e.jsx("button",{className:"btn btn-coral btn-sm",onClick:()=>w(g),children:"＋ Usar esta"})]},j)),e.jsx("p",{className:"note text-center mt-2",children:"Revisa cada sugerencia antes de guardarla."})]})]})}),e.jsx("style",{children:`
        .pumai-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 25, 41, 0.6);
          backdrop-filter: blur(4px);
          display: grid; place-items: center;
          z-index: 100; padding: 16px;
          animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} }
        .pumai-modal {
          background: #fff;
          border-radius: var(--r-xl);
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
        }
        .pumai-modal header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 14px;
        }
        .pumai-modal h3 { margin: 0; font-size: 1.2rem; color: var(--c-azul-800); }
        .pumai-modal .close {
          background: transparent; border: none; cursor: pointer;
          font-size: 1.4rem; color: var(--c-gris); padding: 4px 8px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pumai-modal .error {
          background: var(--c-coral-100); color: #93362A;
          padding: 10px 14px; border-radius: 12px; font-size: 0.92rem;
          margin-top: 12px;
        }
        .results { margin-top: 24px; display: grid; gap: 10px; }
        .results h4 { color: var(--c-azul-800); margin: 0 0 6px; }
        .suggestion {
          padding: 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde);
          border-radius: 12px;
        }
        .suggestion strong { color: var(--c-azul-800); display: block; margin-bottom: 4px; }
        .suggestion p { margin: 0 0 8px; font-size: 0.94rem; color: var(--c-texto-soft); }
        @media (max-width: 540px) { .form-grid { grid-template-columns: 1fr; } }
      `})]})}const sa=[{id:"questions",label:"Preguntas"},{id:"recommendations",label:"Recomendaciones"},{id:"resources",label:"Recursos"}];function G({k:s,sortBy:a,onSort:l,children:n}){const t=a.key===s,i=t?a.dir==="asc"?"▲":"▼":"↕";return e.jsxs("button",{type:"button",onClick:()=>l(s),style:{background:"transparent",border:0,cursor:"pointer",font:"inherit",color:"inherit",padding:0,display:"inline-flex",gap:4,alignItems:"center",opacity:t?1:.7},children:[n," ",e.jsx("span",{style:{fontSize:"0.7em"},children:i})]})}function ta({ctx:s}){const[a,l]=u.useState("questions");return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Contenido"}),e.jsx("h1",{className:"mt-2",children:"Editor de contenido"}),e.jsx("p",{className:"lede",children:"Gestiona las 20 preguntas, las recomendaciones por dimensión/nivel y el catálogo de recursos universitarios. Todos los cambios quedan en bitácora."})]})}),e.jsx("div",{className:"tabs",children:sa.map(n=>e.jsx("button",{className:`tab-btn ${a===n.id?"active":""}`,onClick:()=>l(n.id),children:n.label},n.id))}),e.jsxs("div",{className:"mt-4",children:[a==="questions"&&e.jsx(na,{ctx:s}),a==="recommendations"&&e.jsx(ia,{ctx:s}),a==="resources"&&e.jsx(ra,{ctx:s})]}),e.jsx("style",{children:`
        .tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          background: #fff;
          padding: 6px;
          border-radius: var(--r-pill);
          border: 1px solid var(--c-borde);
          width: fit-content;
        }
        .tab-btn {
          padding: 8px 18px;
          border-radius: var(--r-pill);
          background: transparent;
          border: 0;
          font-weight: 700;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .tab-btn.active { background: var(--c-azul-800); color: #fff; }

        .editor-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
        .editor-table th, .editor-table td {
          text-align: left; padding: 10px 12px;
          border-bottom: 1px solid var(--c-borde-soft);
        }
        .editor-table th {
          background: var(--c-azul-100);
          color: var(--c-azul-800);
          font-weight: 800;
          font-size: 0.78rem;
          text-transform: uppercase;
        }
        .editor-table input, .editor-table select, .editor-table textarea {
          width: 100%; padding: 6px 10px;
          border: 1px solid var(--c-borde);
          border-radius: 8px;
          background: #fff;
          font-size: 0.9rem;
        }
        .editor-table textarea { min-height: 60px; }
        .actions-cell { white-space: nowrap; display: flex; gap: 4px; }
        .icon-btn {
          background: transparent;
          border: 1px solid var(--c-borde);
          border-radius: 8px;
          padding: 6px 10px;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .icon-btn.primary { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
      `})]})}function na({ctx:s}){const[a,l]=u.useState([]),[n,t]=u.useState(null),[i,o]=u.useState({}),[r,d]=u.useState(!0),[p,v]=u.useState({key:"sort_order",dir:"asc"});async function x(){d(!0);const{data:j}=await N.from("questions").select("*");l(j||[]),d(!1)}u.useEffect(()=>{x()},[]);function f(j){v(b=>b.key===j?{key:j,dir:b.dir==="asc"?"desc":"asc"}:{key:j,dir:"asc"})}const m=[...a].sort((j,b)=>{const k=j[p.key],C=b[p.key];if(k===C)return 0;if(k==null)return 1;if(C==null)return-1;const E=typeof k=="number"?k-C:String(k).localeCompare(String(C));return p.dir==="asc"?E:-E});function c(){const j=a.length?Math.max(...a.map(b=>b.sort_order))+1:1;t("new"),o({sort_order:j,dimension:$[0].id,question_text:"",is_reverse_scored:!1,active:!0})}function h(j){const b=a.length?Math.max(...a.map(k=>k.sort_order))+1:1;t("new"),o({sort_order:b,dimension:j.dimension||$[0].id,question_text:j.question_text,is_reverse_scored:!!j.is_reverse_scored,active:!0})}function _(j){t(j.id),o({...j})}async function y(){var j;if((j=i.question_text)!=null&&j.trim()){if(n==="new"){const{data:b,error:k}=await N.from("questions").insert(i).select().single();k||await z({ctx:s,action:"create",entity:"questions",entity_id:b.id,after_data:b})}else{const b=a.find(C=>C.id===n),{error:k}=await N.from("questions").update(i).eq("id",n);k||await z({ctx:s,action:"update",entity:"questions",entity_id:n,before_data:b,after_data:i})}t(null),o({}),x()}}async function w(j){const{error:b}=await N.from("questions").update({active:!j.active}).eq("id",j.id);b||await z({ctx:s,action:"toggle",entity:"questions",entity_id:j.id,before_data:{active:j.active},after_data:{active:!j.active}}),x()}async function g(j){if(!confirm(`¿Eliminar pregunta #${j.sort_order}?

"${j.question_text}"`))return;const{error:b}=await N.from("questions").delete().eq("id",j.id);b||await z({ctx:s,action:"delete",entity:"questions",entity_id:j.id,before_data:j}),x()}return r?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsxs("div",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"},children:[e.jsxs("h2",{children:["Banco de preguntas (",a.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(Qe,{onUse:h}),n!=="new"&&e.jsx("button",{className:"btn btn-primary btn-sm",onClick:c,children:"＋ Nueva"})]})]}),n==="new"&&e.jsx(ve,{draft:i,setDraft:o,onSave:y,onCancel:()=>{t(null),o({})}}),e.jsx("div",{className:"table-wrap mt-3",style:{overflowX:"auto"},children:e.jsxs("table",{className:"editor-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:48},children:e.jsx(G,{k:"sort_order",sortBy:p,onSort:f,children:"#"})}),e.jsx("th",{children:e.jsx(G,{k:"question_text",sortBy:p,onSort:f,children:"Texto"})}),e.jsx("th",{style:{width:160},children:e.jsx(G,{k:"dimension",sortBy:p,onSort:f,children:"Dimensión"})}),e.jsx("th",{style:{width:80},children:e.jsx(G,{k:"is_reverse_scored",sortBy:p,onSort:f,children:"Inversa"})}),e.jsx("th",{style:{width:80},children:e.jsx(G,{k:"active",sortBy:p,onSort:f,children:"Activa"})}),e.jsx("th",{style:{width:140}})]})}),e.jsx("tbody",{children:m.map(j=>{var b;return n===j.id?e.jsx(ve,{draft:i,setDraft:o,onSave:y,onCancel:()=>{t(null),o({})}},j.id):e.jsxs("tr",{children:[e.jsx("td",{children:j.sort_order}),e.jsx("td",{children:j.question_text}),e.jsx("td",{children:((b=$.find(k=>k.id===j.dimension))==null?void 0:b.label)||j.dimension}),e.jsx("td",{children:j.is_reverse_scored?"✔":"—"}),e.jsx("td",{children:j.active?"✅":"⏸"}),e.jsxs("td",{className:"actions-cell",children:[e.jsx("button",{className:"icon-btn",onClick:()=>_(j),children:"✎"}),e.jsx("button",{className:"icon-btn",onClick:()=>w(j),children:j.active?"⏸":"▶"}),e.jsx("button",{className:"icon-btn danger",onClick:()=>g(j),children:"🗑"})]})]},j.id)})})]})})]})}function ve({draft:s,setDraft:a,onSave:l,onCancel:n}){return e.jsxs("tr",{style:{background:"var(--c-azul-100)"},children:[e.jsx("td",{children:e.jsx("input",{type:"number",min:"1",value:s.sort_order||1,onChange:t=>a({...s,sort_order:Number(t.target.value)})})}),e.jsx("td",{children:e.jsx("textarea",{value:s.question_text||"",onChange:t=>a({...s,question_text:t.target.value}),placeholder:"¿Pregunta?"})}),e.jsx("td",{children:e.jsx("select",{value:s.dimension,onChange:t=>a({...s,dimension:t.target.value}),children:$.map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))})}),e.jsx("td",{children:e.jsx("input",{type:"checkbox",checked:!!s.is_reverse_scored,onChange:t=>a({...s,is_reverse_scored:t.target.checked})})}),e.jsx("td",{children:e.jsx("input",{type:"checkbox",checked:!!s.active,onChange:t=>a({...s,active:t.target.checked})})}),e.jsxs("td",{className:"actions-cell",children:[e.jsx("button",{className:"icon-btn primary",onClick:l,children:"✓"}),e.jsx("button",{className:"icon-btn",onClick:n,children:"✕"})]})]})}function ia({ctx:s}){const[a,l]=u.useState([]),[n,t]=u.useState(!0),[i,o]=u.useState(null),[r,d]=u.useState({});async function p(){t(!0);const{data:h}=await N.from("recommendations").select("*").order("dimension").order("level");l(h||[]),t(!1)}u.useEffect(()=>{p()},[]);function v(){o("new"),d({dimension:$[0].id,level:"bajo",title:"",description:"",active:!0})}function x(h){o(h.id),d({...h})}function f(h){o("new"),d({dimension:h.dimension||$[0].id,level:h.level||"moderado",title:h.title,description:h.description,active:!0})}async function m(){var h;if((h=r.title)!=null&&h.trim()){if(i==="new"){const{data:_}=await N.from("recommendations").insert(r).select().single();_&&await z({ctx:s,action:"create",entity:"recommendations",entity_id:_.id,after_data:_})}else{const _=a.find(w=>w.id===i),{error:y}=await N.from("recommendations").update(r).eq("id",i);y||await z({ctx:s,action:"update",entity:"recommendations",entity_id:i,before_data:_,after_data:r})}o(null),d({}),p()}}async function c(h){if(!confirm(`¿Eliminar recomendación "${h.title}"?`))return;const{error:_}=await N.from("recommendations").delete().eq("id",h.id);_||await z({ctx:s,action:"delete",entity:"recommendations",entity_id:h.id,before_data:h}),p()}return n?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsxs("div",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"},children:[e.jsxs("h2",{children:["Catálogo de recomendaciones (",a.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(aa,{onUse:f}),i!=="new"&&e.jsx("button",{className:"btn btn-primary btn-sm",onClick:v,children:"＋ Nueva"})]})]}),i==="new"&&e.jsx(be,{draft:r,setDraft:d,onSave:m,onCancel:()=>{o(null),d({})}}),e.jsx("div",{className:"table-wrap mt-3",style:{overflowX:"auto"},children:e.jsxs("table",{className:"editor-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:160},children:"Dimensión"}),e.jsx("th",{style:{width:120},children:"Nivel"}),e.jsx("th",{children:"Título"}),e.jsx("th",{children:"Descripción"}),e.jsx("th",{style:{width:80},children:"Activa"}),e.jsx("th",{style:{width:120}})]})}),e.jsx("tbody",{children:a.map(h=>{var _;return i===h.id?e.jsx(be,{draft:r,setDraft:d,onSave:m,onCancel:()=>{o(null),d({})}},h.id):e.jsxs("tr",{children:[e.jsx("td",{children:((_=$.find(y=>y.id===h.dimension))==null?void 0:_.label)||h.dimension}),e.jsx("td",{children:e.jsx("span",{className:`lvl-bg-${h.level}`,style:{padding:"3px 8px",borderRadius:6,fontSize:"0.78rem",fontWeight:700},children:h.level})}),e.jsx("td",{children:h.title}),e.jsx("td",{children:e.jsx("small",{className:"note",children:h.description})}),e.jsx("td",{children:h.active?"✅":"⏸"}),e.jsxs("td",{className:"actions-cell",children:[e.jsx("button",{className:"icon-btn",onClick:()=>x(h),children:"✎"}),e.jsx("button",{className:"icon-btn danger",onClick:()=>c(h),children:"🗑"})]})]},h.id)})})]})})]})}function be({draft:s,setDraft:a,onSave:l,onCancel:n}){return e.jsxs("tr",{style:{background:"var(--c-azul-100)"},children:[e.jsx("td",{children:e.jsx("select",{value:s.dimension,onChange:t=>a({...s,dimension:t.target.value}),children:$.map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))})}),e.jsx("td",{children:e.jsxs("select",{value:s.level,onChange:t=>a({...s,level:t.target.value}),children:[e.jsx("option",{value:"bajo",children:"Bajo"}),e.jsx("option",{value:"moderado",children:"Moderado"}),e.jsx("option",{value:"prioritario",children:"Prioritario"})]})}),e.jsx("td",{children:e.jsx("input",{value:s.title||"",onChange:t=>a({...s,title:t.target.value})})}),e.jsx("td",{children:e.jsx("textarea",{value:s.description||"",onChange:t=>a({...s,description:t.target.value})})}),e.jsx("td",{children:e.jsx("input",{type:"checkbox",checked:!!s.active,onChange:t=>a({...s,active:t.target.checked})})}),e.jsxs("td",{className:"actions-cell",children:[e.jsx("button",{className:"icon-btn primary",onClick:l,children:"✓"}),e.jsx("button",{className:"icon-btn",onClick:n,children:"✕"})]})]})}function ra({ctx:s}){const[a,l]=u.useState([]),[n,t]=u.useState(!0),[i,o]=u.useState(null),[r,d]=u.useState({});async function p(){t(!0);const{data:c}=await N.from("resources").select("*").order("name");l(c||[]),t(!1)}u.useEffect(()=>{p()},[]);function v(){o("new"),d({name:"",type:ie[0].id,description:"",audience:"",modality:"",location:"",schedule:"",contact:"",active:!0})}function x(c){o(c.id),d({...c})}async function f(){var c;if((c=r.name)!=null&&c.trim()){if(i==="new"){const{data:h}=await N.from("resources").insert(r).select().single();h&&await z({ctx:s,action:"create",entity:"resources",entity_id:h.id,after_data:h})}else{const h=a.find(y=>y.id===i),{error:_}=await N.from("resources").update(r).eq("id",i);_||await z({ctx:s,action:"update",entity:"resources",entity_id:i,before_data:h,after_data:r})}o(null),d({}),p()}}async function m(c){if(!confirm(`¿Eliminar recurso "${c.name}"?`))return;const{error:h}=await N.from("resources").delete().eq("id",c.id);h||await z({ctx:s,action:"delete",entity:"resources",entity_id:c.id,before_data:c}),p()}return n?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsxs("div",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("h2",{children:["Recursos universitarios (",a.length,")"]}),i!=="new"&&e.jsx("button",{className:"btn btn-primary btn-sm",onClick:v,children:"＋ Nuevo"})]}),i==="new"&&e.jsx(fe,{draft:r,setDraft:d,onSave:f,onCancel:()=>{o(null),d({})}}),e.jsx("div",{className:"cards-grid mt-3",children:a.map(c=>{var h;return i===c.id?e.jsx("div",{className:"rcard editing",children:e.jsx(fe,{draft:r,setDraft:d,onSave:f,onCancel:()=>{o(null),d({})},inline:!0})},c.id):e.jsxs("div",{className:"rcard",children:[e.jsx("span",{className:"tag",children:((h=ie.find(_=>_.id===c.type))==null?void 0:h.label)||c.type}),e.jsx("h3",{className:"mt-2",children:c.name}),e.jsx("p",{className:"note",children:c.description}),c.location&&e.jsxs("small",{children:["📍 ",c.location]}),c.schedule&&e.jsxs("small",{children:["🕐 ",c.schedule]}),c.contact&&e.jsxs("small",{children:["📞 ",c.contact]}),e.jsxs("div",{className:"actions-cell mt-2",children:[e.jsx("button",{className:"icon-btn",onClick:()=>x(c),children:"✎ Editar"}),e.jsx("button",{className:"icon-btn danger",onClick:()=>m(c),children:"🗑"}),e.jsx("span",{style:{marginLeft:"auto",padding:"4px 8px",background:c.active?"var(--c-salvia-100)":"var(--c-coral-100)",borderRadius:8,fontSize:"0.78rem",fontWeight:700},children:c.active?"Activo":"Inactivo"})]})]},c.id)})}),e.jsx("style",{children:`
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
        .rcard {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 16px;
        }
        .rcard.editing { background: var(--c-azul-100); }
        .rcard h3 { margin: 6px 0; font-size: 1rem; color: var(--c-azul-800); }
        .rcard small { display:block; color: var(--c-gris); font-size: 0.84rem; margin-top: 4px; }
      `})]})}function fe({draft:s,setDraft:a,onSave:l,onCancel:n,inline:t}){return e.jsxs("div",{style:t?{}:{background:"var(--c-azul-100)",padding:14,borderRadius:12,marginTop:10},children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Nombre"}),e.jsx("input",{value:s.name||"",onChange:i=>a({...s,name:i.target.value})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Tipo"}),e.jsx("select",{value:s.type,onChange:i=>a({...s,type:i.target.value}),children:ie.map(i=>e.jsx("option",{value:i.id,children:i.label},i.id))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Activo"}),e.jsxs("select",{value:s.active?"1":"0",onChange:i=>a({...s,active:i.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Activo"}),e.jsx("option",{value:"0",children:"Inactivo"})]})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Descripción"}),e.jsx("textarea",{value:s.description||"",onChange:i=>a({...s,description:i.target.value})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Público"}),e.jsx("input",{value:s.audience||"",onChange:i=>a({...s,audience:i.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Modalidad"}),e.jsx("input",{value:s.modality||"",onChange:i=>a({...s,modality:i.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Ubicación"}),e.jsx("input",{value:s.location||"",onChange:i=>a({...s,location:i.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Horario"}),e.jsx("input",{value:s.schedule||"",onChange:i=>a({...s,schedule:i.target.value})})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Contacto"}),e.jsx("input",{value:s.contact||"",onChange:i=>a({...s,contact:i.target.value})})]}),e.jsxs("div",{className:"actions-cell",children:[e.jsx("button",{className:"icon-btn primary",onClick:l,children:"✓ Guardar"}),e.jsx("button",{className:"icon-btn",onClick:n,children:"✕ Cancelar"})]})]})}const la={create:"🆕 Creó",update:"✏️ Actualizó",delete:"🗑 Eliminó",toggle:"🔁 Cambió estado"},ye={questions:"pregunta",recommendations:"recomendación",resources:"recurso",admin_users:"usuario admin",prompt:"prompt Pum-AI",alerts:"alerta"};function oa(){const[s,a]=u.useState([]),[l,n]=u.useState(!0),[t,i]=u.useState("all");async function o(){n(!0);let r=N.from("admin_audit_log").select("*").order("created_at",{ascending:!1}).limit(200);t!=="all"&&(r=r.eq("entity",t));const{data:d}=await r;a(d||[]),n(!1)}return u.useEffect(()=>{o()},[t]),e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Auditoría"}),e.jsx("h1",{className:"mt-2",children:"Bitácora de cambios"}),e.jsx("p",{className:"lede",children:"Registro de todas las acciones administrativas (últimas 200)."})]})}),e.jsx("div",{className:"filters",children:["all","questions","recommendations","resources","admin_users","prompt"].map(r=>e.jsx("button",{className:`chip ${t===r?"active":""}`,onClick:()=>i(r),children:r==="all"?"Todo":ye[r]||r},r))}),e.jsx("section",{className:"panel mt-3",children:l?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsxs("div",{className:"audit-list",children:[s.length===0&&e.jsx("p",{className:"note text-center",children:"Sin registros aún."}),s.map(r=>{var d,p,v;return e.jsxs("div",{className:"audit-item",children:[e.jsx("div",{className:"audit-when",children:new Date(r.created_at).toLocaleString("es-MX")}),e.jsxs("div",{className:"audit-line",children:[e.jsx("strong",{children:r.admin_email||"Sistema"})," ",la[r.action]||r.action," ",ye[r.entity]||r.entity,r.entity_id&&e.jsxs("code",{children:[" #",r.entity_id.slice(0,8)]})]}),((d=r.after_data)==null?void 0:d.title)&&e.jsxs("small",{children:['"',r.after_data.title,'"']}),((p=r.after_data)==null?void 0:p.question_text)&&e.jsxs("small",{children:['"',r.after_data.question_text,'"']}),((v=r.after_data)==null?void 0:v.name)&&e.jsxs("small",{children:['"',r.after_data.name,'"']})]},r.id)})]})}),e.jsx("style",{children:`
        .filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 6px 14px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }

        .audit-list { display: grid; gap: 6px; }
        .audit-item {
          padding: 10px 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 10px;
        }
        .audit-when { font-size: 0.78rem; color: var(--c-gris); margin-bottom: 4px; }
        .audit-line { font-size: 0.94rem; color: var(--c-texto); }
        .audit-line code { background: var(--c-azul-100); padding: 2px 6px; border-radius: 6px; font-size: 0.84em; }
        .audit-item small { display:block; color: var(--c-gris); font-size: 0.84rem; margin-top: 4px; }
      `})]})}function Me({data:s,x:a="day",y:l="total",label:n,height:t=220}){var m,c;if(!s||s.length===0)return e.jsx("div",{className:"chart-empty",children:"Sin datos suficientes."});const i=700,o=t,r=32,d=s.map(h=>Number(h[l]||0)),p=Math.max(1,...d),v=s.map((h,_)=>({x:r+_/Math.max(1,s.length-1)*(i-2*r),y:o-r-Number(h[l]||0)/p*(o-2*r),label:h[a],val:h[l]})),x=v.map((h,_)=>`${_===0?"M":"L"} ${h.x},${h.y}`).join(" "),f=`${x} L ${v[v.length-1].x},${o-r} L ${v[0].x},${o-r} Z`;return e.jsxs("svg",{viewBox:`0 0 ${i} ${o}`,className:"chart-svg",role:"img","aria-label":n,children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"line-grad",x1:"0",x2:"0",y1:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#10243E",stopOpacity:"0.3"}),e.jsx("stop",{offset:"100%",stopColor:"#10243E",stopOpacity:"0"})]})}),[.25,.5,.75].map(h=>e.jsx("line",{x1:r,y1:r+h*(o-2*r),x2:i-r,y2:r+h*(o-2*r),stroke:"#E5E7EB",strokeDasharray:"4 4"},h)),e.jsx("path",{d:f,fill:"url(#line-grad)"}),e.jsx("path",{d:x,fill:"none",stroke:"#10243E",strokeWidth:"2"}),v.map((h,_)=>e.jsxs("g",{children:[e.jsx("circle",{cx:h.x,cy:h.y,r:"3.5",fill:"#C9A227",stroke:"#fff",strokeWidth:"1.5"}),e.jsxs("title",{children:[h.label,": ",h.val]})]},_)),e.jsx("text",{x:r,y:o-8,fontSize:"10",fill:"#6B7280",children:(m=v[0])==null?void 0:m.label}),e.jsx("text",{x:i-r,y:o-8,textAnchor:"end",fontSize:"10",fill:"#6B7280",children:(c=v[v.length-1])==null?void 0:c.label}),e.jsx("text",{x:r,y:r-8,fontSize:"10",fill:"#6B7280",children:p})]})}function Re({data:s,x:a="label",y:l="value",height:n=220,color:t="#1A3358"}){if(!s||s.length===0)return e.jsx("div",{className:"chart-empty",children:"Sin datos."});const i=700,o=n,r=32,d=s.map(x=>Number(x[l]||0)),p=Math.max(1,...d),v=(i-2*r)/s.length-8;return e.jsxs("svg",{viewBox:`0 0 ${i} ${o}`,className:"chart-svg",role:"img",children:[[.25,.5,.75].map(x=>e.jsx("line",{x1:r,y1:r+x*(o-2*r),x2:i-r,y2:r+x*(o-2*r),stroke:"#E5E7EB",strokeDasharray:"4 4"},x)),s.map((x,f)=>{const m=r+f*((i-2*r)/s.length)+4,c=Number(x[l]||0)/p*(o-2*r);return e.jsxs("g",{children:[e.jsx("rect",{x:m,y:o-r-c,width:v,height:c,fill:t,rx:"6",children:e.jsxs("title",{children:[x[a],": ",x[l]]})}),e.jsx("text",{x:m+v/2,y:o-10,textAnchor:"middle",fontSize:"9",fill:"#6B7280",children:String(x[a]).slice(0,12)}),e.jsx("text",{x:m+v/2,y:o-r-c-6,textAnchor:"middle",fontSize:"10",fontWeight:"700",fill:"#10243E",children:x[l]})]},f)})]})}function ca({data:s,height:a=280}){if(!s||s.length===0)return e.jsx("div",{className:"chart-empty",children:"Sin datos suficientes."});const l=700,n=a,t=36,i=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],o=(l-t*1.5)/24,r=(n-t*1.5)/7,d=Math.max(1,...s.map(v=>v.total||0));function p(v){const x=v/d,f=Math.round(16+185*x),m=Math.round(36+126*x),c=Math.round(62+-23*x);return`rgb(${f},${m},${c})`}return e.jsxs("svg",{viewBox:`0 0 ${l} ${n}`,className:"chart-svg",children:[i.map((v,x)=>e.jsx("text",{x:t-8,y:t+(x+.6)*r,textAnchor:"end",fontSize:"10",fill:"#6B7280",children:v},v)),Array.from({length:24}).map((v,x)=>x%3===0?e.jsxs("text",{x:t+(x+.5)*o,y:n-12,textAnchor:"middle",fontSize:"9",fill:"#6B7280",children:[x,"h"]},x):null),Array.from({length:7}).flatMap((v,x)=>Array.from({length:24}).map((f,m)=>{const c=s.find(_=>_.day_of_week===x&&_.hour_of_day===m),h=(c==null?void 0:c.total)||0;return e.jsx("rect",{x:t+m*o,y:t+x*r,width:o-1.5,height:r-1.5,fill:h?p(h):"#F4F7FB",rx:"3",children:e.jsxs("title",{children:[i[x]," ",m,"h: ",h]})},`${x}-${m}`)}))]})}function da({segments:s,label:a}){if(!s||s.length===0)return e.jsx("div",{className:"chart-empty",children:"Sin datos."});const l=s.reduce((p,v)=>p+v.value,0)||1,n=100,t=100,i=80,o=50;let r=0;function d(p,v){const x=n+i*Math.cos(p-Math.PI/2),f=t+i*Math.sin(p-Math.PI/2),m=n+i*Math.cos(v-Math.PI/2),c=t+i*Math.sin(v-Math.PI/2),h=n+o*Math.cos(v-Math.PI/2),_=t+o*Math.sin(v-Math.PI/2),y=n+o*Math.cos(p-Math.PI/2),w=t+o*Math.sin(p-Math.PI/2),g=v-p>Math.PI?1:0;return`M ${x} ${f} A ${i} ${i} 0 ${g} 1 ${m} ${c} L ${h} ${_} A ${o} ${o} 0 ${g} 0 ${y} ${w} Z`}return e.jsxs("svg",{viewBox:"0 0 200 200",className:"chart-svg",style:{maxWidth:220},children:[s.map((p,v)=>{const x=r/l*Math.PI*2;r+=p.value;const f=r/l*Math.PI*2;return e.jsx("path",{d:d(x,f),fill:p.color,children:e.jsxs("title",{children:[p.label,": ",p.value," (",Math.round(p.value/l*100),"%)"]})},v)}),e.jsx("text",{x:n,y:t-4,textAnchor:"middle",fontSize:"22",fontWeight:"800",fill:"#10243E",children:l}),e.jsx("text",{x:n,y:t+14,textAnchor:"middle",fontSize:"10",fill:"#6B7280",children:a})]})}function ma({steps:s}){if(!s||s.length===0)return e.jsx("div",{className:"chart-empty",children:"Sin datos."});const a=700,l=60*s.length+20,n=Math.max(1,...s.map(t=>t.value));return e.jsx("svg",{viewBox:`0 0 ${a} ${l}`,className:"chart-svg",children:s.map((t,i)=>{const o=t.value/n*(a-100),r=(a-o)/2,d=i*60+10,p=n?Math.round(t.value/n*100):0;return e.jsxs("g",{children:[e.jsx("rect",{x:r,y:d,width:o,height:48,rx:"8",fill:`rgba(16,36,62,${.85-i*.15})`}),e.jsx("text",{x:a/2,y:d+22,textAnchor:"middle",fontSize:"13",fontWeight:"700",fill:"#fff",children:t.label}),e.jsxs("text",{x:a/2,y:d+40,textAnchor:"middle",fontSize:"11",fill:"rgba(255,255,255,0.85)",children:[t.value," (",p,"%)"]})]},i)})})}function ua(){var n,t,i,o;const[s,a]=u.useState({loading:!0});if(u.useEffect(()=>{(async()=>{try{const[r,d,p,v,x,f]=await Promise.all([N.from("view_sessions_timeline").select("*").limit(60),N.from("view_hourly_distribution").select("*"),N.from("view_question_variance").select("*"),N.from("view_completion_funnel").select("*").single(),N.from("assessment_sessions").select("general_level"),N.from("view_pumai_metrics").select("*").single()]),m={bajo:0,moderado:0,prioritario:0};for(const h of x.data||[])m[h.general_level]!==void 0&&m[h.general_level]++;const c=(r.data||[]).slice().reverse();a({loading:!1,timeline:c,heatmap:d.data||[],variance:p.data||[],funnel:v.data||{started:0,completed:0,abandoned:0},levels:m,pumai:f.data||{}})}catch(r){console.warn(r),a({loading:!1,error:r.message})}})()},[]),s.loading)return e.jsx("div",{className:"spinner",style:{margin:"40px auto"}});const l=(n=s.pumai)!=null&&n.total_calls?Math.round(s.pumai.pumai_count/s.pumai.total_calls*100):null;return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Analítica"}),e.jsx("h1",{className:"mt-2",children:"Estadísticas y tendencias"}),e.jsx("p",{className:"lede",children:"Métricas agregadas para entender el comportamiento de la comunidad y la salud del sistema."})]})}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("section",{className:"panel",children:[e.jsx("h2",{children:"Tendencia de sesiones (últimos días)"}),e.jsx(Me,{data:s.timeline,x:"day",y:"total",label:"Sesiones por día"})]}),e.jsxs("section",{className:"panel",children:[e.jsx("h2",{children:"Distribución por nivel"}),e.jsx(da,{label:"sesiones",segments:[{label:"Bajo",value:s.levels.bajo,color:"#8FB8A0"},{label:"Moderado",value:s.levels.moderado,color:"#C9A227"},{label:"Prioritario",value:s.levels.prioritario,color:"#D26B53"}]})]})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Embudo de completación"}),e.jsx(ma,{steps:[{label:"Sesiones iniciadas",value:s.funnel.started||0},{label:"Tests completados",value:s.funnel.completed||0}]}),s.funnel.abandoned>0&&e.jsxs("p",{className:"note",children:[s.funnel.abandoned," sesiones quedaron sin completar."]})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Heatmap de horarios"}),e.jsx("p",{className:"note",children:"Cuándo se hacen los tests (día de la semana × hora)."}),e.jsx(ca,{data:s.heatmap})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Preguntas con mayor varianza"}),e.jsx("p",{className:"note",children:"Reactivos que diferencian más a la población — los más informativos del instrumento."}),e.jsx(Re,{data:(s.variance||[]).slice(0,8).map(r=>({label:`#${r.sort_order}`,value:Number(r.stddev||0),tip:r.question_text})),x:"label",y:"value",color:"#C9A227"}),e.jsxs("details",{className:"mt-2",children:[e.jsx("summary",{children:"Ver detalles"}),e.jsx("ul",{style:{paddingLeft:20,fontSize:"0.9rem"},children:(s.variance||[]).slice(0,10).map(r=>e.jsxs("li",{children:[e.jsxs("strong",{children:["#",r.sort_order]})," (",r.dimension,", σ=",Number(r.stddev||0).toFixed(2),"): ",r.question_text]},r.question_id))})]})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Métricas de Pum-AI"}),e.jsxs("div",{className:"kpi-grid",children:[e.jsx(Z,{label:"Llamadas totales",value:((t=s.pumai)==null?void 0:t.total_calls)??0}),e.jsx(Z,{label:"Pum-AI exitosa",value:((i=s.pumai)==null?void 0:i.pumai_count)??0,accent:"sage"}),e.jsx(Z,{label:"Fallback local",value:((o=s.pumai)==null?void 0:o.fallback_count)??0,accent:"coral"}),e.jsx(Z,{label:"Tasa de éxito",value:l!=null?l+"%":"—",accent:"gold"})]})]}),e.jsx("style",{children:`
        .stats-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
          align-items: start;
        }
        .chart-svg {
          width: 100%;
          height: auto;
        }
        .chart-empty {
          padding: 32px;
          text-align: center;
          color: var(--c-gris);
          background: var(--c-marfil);
          border-radius: 12px;
        }
        @media (max-width: 880px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `})]})}function Z({label:s,value:a,accent:l}){return e.jsxs("div",{className:`kpi-card ${l||""}`,children:[e.jsx("div",{className:"label",children:s}),e.jsx("div",{className:"value",children:a})]})}const xa=[{id:"sessions",label:"Sesiones",table:"assessment_sessions",columns:"id, anonymous_code, total_score, general_level, dimension_scores, top_attention_areas, created_at"},{id:"answers",label:"Respuestas individuales",table:"assessment_answers",columns:"id, session_id, question_id, answer_value, normalized_value, created_at",requiresRole:["admin","especialista"]},{id:"questions",label:"Preguntas",table:"questions",columns:"id, sort_order, dimension, question_text, is_reverse_scored, active"},{id:"recommendations",label:"Recomendaciones",table:"recommendations",columns:"id, dimension, level, title, description, active"},{id:"resources",label:"Recursos",table:"resources",columns:"id, name, type, description, audience, modality, location, schedule, contact, active"},{id:"feedback",label:"Feedback de usuarios",table:"assessment_feedback",columns:"id, session_id, rating, comment, created_at"},{id:"audit",label:"Auditoría",table:"admin_audit_log",columns:"id, admin_email, action, entity, entity_id, created_at",requiresRole:["admin"]}];function ha({ctx:s}){const[a,l]=u.useState(null),[n,t]=u.useState(null);async function i(o,r){l(`${o.id}-${r}`),t(null);try{const{data:d,error:p}=await N.from(o.table).select(o.columns);if(p)throw p;let v,x,f;r==="json"?(v=JSON.stringify(d||[],null,2),x="application/json",f="json"):(v=pa(d||[]),x="text/csv;charset=utf-8",f="csv");const m=new Blob([v],{type:x}),c=URL.createObjectURL(m),h=document.createElement("a");h.href=c;const _=new Date().toISOString().slice(0,10);h.download=`sintonia-${o.id}-${_}.${f}`,h.click(),URL.revokeObjectURL(c),t({type:"ok",text:`Descargado: ${(d==null?void 0:d.length)||0} registros.`})}catch(d){t({type:"error",text:d.message})}finally{l(null)}}return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Exportación"}),e.jsx("h1",{className:"mt-2",children:"Descarga de datos"}),e.jsx("p",{className:"lede",children:"Exporta cualquier dataset para análisis externo. Las descargas son anónimas. Para datos detallados se requiere rol de Especialista o Administrador."})]})}),n&&e.jsx("p",{className:`feedback ${n.type} mt-2`,children:n.text}),e.jsx("div",{className:"datasets-grid",children:xa.map(o=>{const r=!o.requiresRole||o.requiresRole.includes(s.admin.role);return e.jsxs("div",{className:`ds-card ${r?"":"locked"}`,children:[e.jsx("h3",{children:o.label}),e.jsxs("small",{className:"note",children:["tabla ",e.jsx("code",{children:o.table})]}),r?e.jsxs("div",{className:"ds-actions",children:[e.jsx("button",{className:"btn btn-primary btn-sm",disabled:a!==null,onClick:()=>i(o,"csv"),children:a===`${o.id}-csv`?"Exportando…":"⬇ CSV"}),e.jsx("button",{className:"btn btn-ghost btn-sm",disabled:a!==null,onClick:()=>i(o,"json"),children:a===`${o.id}-json`?"Exportando…":"⬇ JSON"})]}):e.jsx("p",{className:"note",children:"🔒 Tu rol no tiene permiso para este dataset."})]},o.id)})}),e.jsx("style",{children:`
        .datasets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
          margin-top: 16px;
        }
        .ds-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
        }
        .ds-card.locked { opacity: 0.5; }
        .ds-card h3 { margin: 0 0 4px; color: var(--c-azul-800); }
        .ds-card code { background: var(--c-azul-100); padding: 2px 6px; border-radius: 6px; font-size: 0.84em; }
        .ds-actions { display: flex; gap: 8px; margin-top: 12px; }
        .feedback { padding: 10px 14px; border-radius: 12px; font-size: 0.92rem; display: inline-block; }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F8770; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
      `})]})}function pa(s){if(!s||s.length===0)return"";const a=Object.keys(s[0]),l=a.join(","),n=s.map(t=>a.map(i=>{const o=t[i];if(o==null)return"";if(typeof o=="object")return`"${JSON.stringify(o).replace(/"/g,'""')}"`;const r=String(o);return/[",\n]/.test(r)?`"${r.replace(/"/g,'""')}"`:r}).join(",")).join(`
`);return`${l}
${n}`}function ga({ctx:s}){const[a,l]=u.useState(""),[n,t]=u.useState(null),[i,o]=u.useState(!1),[r,d]=u.useState(null);async function p(v){if(v==null||v.preventDefault(),!!a.trim()){o(!0),d(null),t(null);try{const{data:x,error:f}=await N.from("assessment_sessions").select("id, anonymous_code, total_score, general_level, dimension_scores, top_attention_areas, created_at").ilike("anonymous_code",`%${a.trim()}%`).order("created_at",{ascending:!1}).limit(20);if(f)throw f;t(x||[])}catch(x){d(x.message)}finally{o(!1)}}}return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Búsqueda"}),e.jsx("h1",{className:"mt-2",children:"Buscar por código anónimo"}),e.jsxs("p",{className:"lede",children:["Si una persona regresa con su código (ej. ",e.jsx("code",{children:"SIN-XJS-4278"}),"), aquí ves sus sesiones. Útil para acompañar evolución sin pedir datos personales."]})]})}),e.jsxs("form",{className:"panel",onSubmit:p,style:{display:"flex",gap:10,alignItems:"flex-end"},children:[e.jsxs("div",{className:"field",style:{flex:1,marginBottom:0},children:[e.jsx("label",{children:"Código anónimo"}),e.jsx("input",{value:a,onChange:v=>l(v.target.value.toUpperCase()),placeholder:"SIN-XXX-####",style:{fontFamily:"var(--ff-serif)",letterSpacing:"0.05em"}})]}),e.jsx("button",{className:"btn btn-primary",type:"submit",disabled:i,children:i?"Buscando…":"🔍 Buscar"})]}),r&&e.jsx("p",{className:"feedback error mt-2",children:r}),n&&e.jsxs("section",{className:"panel mt-3",children:[e.jsxs("h2",{children:["Resultados (",n.length,")"]}),n.length===0&&e.jsx("p",{className:"note",children:"No se encontraron sesiones con ese código."}),e.jsx("div",{className:"results-list",children:n.map(v=>e.jsx(ja,{session:v,ctx:s},v.id))})]}),e.jsx("style",{children:`
        .feedback.error { background: var(--c-coral-100); color: #93362A; padding: 10px 14px; border-radius: 12px; }
        .results-list { display: grid; gap: 14px; }
      `})]})}function ja({session:s,ctx:a}){const[l,n]=u.useState([]),[t,i]=u.useState(""),[o,r]=u.useState(!1),[d,p]=u.useState(!1);async function v(){const{data:m}=await N.from("session_notes").select("*").eq("session_id",s.id).order("created_at",{ascending:!1});n(m||[])}async function x(m){if(m.preventDefault(),!t.trim())return;p(!0);const{error:c}=await N.from("session_notes").insert({session_id:s.id,admin_id:a.admin.id,admin_name:a.admin.full_name||a.admin.email,note:t.trim()});c||(i(""),v()),p(!1)}function f(){r(m=>(m||v(),!m))}return e.jsxs("article",{className:"srow",children:[e.jsxs("header",{children:[e.jsx("code",{children:s.anonymous_code}),e.jsx("span",{className:`lvl-bg-${s.general_level}`,style:{padding:"3px 10px",borderRadius:8,fontSize:"0.78rem",fontWeight:700},children:s.general_level}),e.jsx("small",{children:new Date(s.created_at).toLocaleString("es-MX")}),e.jsxs("strong",{style:{marginLeft:"auto"},children:[s.total_score,"/100"]})]}),e.jsx("div",{className:"dims-mini",children:Object.entries(s.dimension_scores||{}).map(([m,c])=>e.jsxs("div",{children:[e.jsx("small",{children:c.label}),e.jsx("span",{className:`lvl-${c.level}`,children:c.score})]},m))}),e.jsxs("button",{className:"btn btn-ghost btn-sm mt-2",onClick:f,children:[o?"Ocultar":"Ver/agregar"," notas internas"]}),o&&e.jsxs("div",{className:"notes-area",children:[e.jsxs("form",{onSubmit:x,style:{display:"flex",gap:8},children:[e.jsx("input",{value:t,onChange:m=>i(m.target.value),placeholder:"Anotación visible solo para el equipo…",style:{flex:1,padding:"8px 10px",border:"1px solid var(--c-borde)",borderRadius:8}}),e.jsx("button",{className:"btn btn-primary btn-sm",disabled:d||!t.trim(),children:d?"…":"Agregar"})]}),e.jsxs("ul",{className:"notes-list",children:[l.length===0&&e.jsx("li",{className:"note",children:"Aún no hay notas."}),l.map(m=>e.jsxs("li",{children:[e.jsx("strong",{children:m.admin_name||"Anónimo"}),e.jsx("small",{children:new Date(m.created_at).toLocaleString("es-MX")}),e.jsx("p",{children:m.note})]},m.id))]})]}),e.jsx("style",{children:`
        .srow {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 16px;
        }
        .srow header {
          display: flex; gap: 10px; align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .srow header code { color: var(--c-azul-800); font-weight: 700; }
        .srow header small { color: var(--c-gris); font-size: 0.82rem; }
        .dims-mini { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
        .dims-mini > div { padding: 6px 8px; background: var(--c-marfil); border-radius: 8px; }
        .dims-mini small { display:block; color: var(--c-gris); font-size: 0.78rem; }
        .dims-mini span { font-weight: 800; }

        .notes-area { background: var(--c-azul-100); padding: 12px; border-radius: 12px; margin-top: 10px; }
        .notes-list { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 8px; }
        .notes-list li { background: #fff; padding: 8px 12px; border-radius: 8px; }
        .notes-list strong { font-size: 0.86rem; color: var(--c-azul-800); }
        .notes-list small { color: var(--c-gris); font-size: 0.78rem; margin-left: 6px; }
        .notes-list p { margin: 4px 0 0; font-size: 0.92rem; }
      `})]})}function va({ctx:s}){return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Sistema"}),e.jsx("h1",{className:"mt-2",children:"Configuración"}),e.jsx("p",{className:"lede",children:"Editor del prompt de Pum-AI y reglas de alertas operativas."})]})}),e.jsx(ba,{ctx:s}),e.jsx(fa,{ctx:s})]})}function ba({ctx:s}){const[a,l]=u.useState(null),[n,t]=u.useState(!0),[i,o]=u.useState(null);u.useEffect(()=>{r()},[]);async function r(){t(!0);const{data:p}=await N.from("system_config").select("*").eq("id","pumai_prompt").maybeSingle();l((p==null?void 0:p.data)||{}),t(!1)}async function d(){o(null);const{data:p}=await N.from("system_config").select("data").eq("id","pumai_prompt").single(),{error:v}=await N.from("system_config").upsert({id:"pumai_prompt",data:a,updated_by:s.admin.id,updated_at:new Date().toISOString()});v?o({type:"error",text:v.message}):(await z({ctx:s,action:"update",entity:"prompt",entity_id:"pumai_prompt",before_data:p==null?void 0:p.data,after_data:a}),o({type:"ok",text:"Configuración guardada. Tomará efecto en la siguiente invocación de la Edge Function."}))}return n?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Prompt de Pum-AI"}),e.jsx("p",{className:"note",children:"Define las reglas y tono que la IA debe seguir al generar la orientación. Cambios aplican a partir de la próxima sesión."}),e.jsxs("div",{className:"field mt-3",children:[e.jsx("label",{children:"Instrucción del sistema"}),e.jsx("textarea",{value:(a==null?void 0:a.system)||"",onChange:p=>l({...a,system:p.target.value}),rows:8})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12},children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Temperatura (0-1)"}),e.jsx("input",{type:"number",min:"0",max:"1",step:"0.05",value:(a==null?void 0:a.temperature)??.4,onChange:p=>l({...a,temperature:Number(p.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Max tokens"}),e.jsx("input",{type:"number",min:"256",max:"8192",step:"128",value:(a==null?void 0:a.max_tokens)??2048,onChange:p=>l({...a,max_tokens:Number(p.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Activado"}),e.jsxs("select",{value:a!=null&&a.enabled?"1":"0",onChange:p=>l({...a,enabled:p.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Sí"}),e.jsx("option",{value:"0",children:"No (solo fallback)"})]})]})]}),e.jsx("button",{className:"btn btn-primary",onClick:d,children:"Guardar"}),i&&e.jsx("p",{className:`feedback ${i.type}`,children:i.text}),e.jsxs("p",{className:"note mt-3",children:["⚠ Para que estos cambios tomen efecto, la Edge Function debe leer ",e.jsx("code",{children:"system_config"})," al iniciar cada llamada. Puedo enviarte la versión actualizada de la function que lo hace cuando me digas."]}),e.jsx("style",{children:`
        .feedback { padding: 10px 14px; border-radius: 12px; margin-top: 12px; font-size: 0.92rem; display: inline-block; }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F8770; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
      `})]})}function fa({ctx:s}){const[a,l]=u.useState(null),[n,t]=u.useState(!0),[i,o]=u.useState(null);u.useEffect(()=>{r()},[]);async function r(){t(!0);const{data:p}=await N.from("system_config").select("*").eq("id","alerts_rules").maybeSingle();l((p==null?void 0:p.data)||{priority_threshold:30,priority_window_days:7,notify_email:"",enabled:!1}),t(!1)}async function d(){o(null);const{data:p}=await N.from("system_config").select("data").eq("id","alerts_rules").single(),{error:v}=await N.from("system_config").upsert({id:"alerts_rules",data:a,updated_by:s.admin.id,updated_at:new Date().toISOString()});v?o({type:"error",text:v.message}):(await z({ctx:s,action:"update",entity:"alerts",entity_id:"alerts_rules",before_data:p==null?void 0:p.data,after_data:a}),o({type:"ok",text:"Reglas guardadas."}))}return n?null:e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Alertas operativas"}),e.jsx("p",{className:"note",children:"Define umbrales para que el sistema notifique cuando demasiadas sesiones llegan a nivel prioritario en una ventana de tiempo. (Las notificaciones por email requieren configurar el envío de email del backend con un proveedor SMTP — Fase 2.)"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12},children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"% de sesiones en nivel prioritario que disparan alerta"}),e.jsx("input",{type:"number",min:"1",max:"100",value:a.priority_threshold,onChange:p=>l({...a,priority_threshold:Number(p.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Ventana en días"}),e.jsx("input",{type:"number",min:"1",max:"90",value:a.priority_window_days,onChange:p=>l({...a,priority_window_days:Number(p.target.value)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Email de notificación"}),e.jsx("input",{type:"email",value:a.notify_email||"",onChange:p=>l({...a,notify_email:p.target.value}),placeholder:"alertas@unam.mx"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Estado"}),e.jsxs("select",{value:a.enabled?"1":"0",onChange:p=>l({...a,enabled:p.target.value==="1"}),children:[e.jsx("option",{value:"0",children:"Desactivadas"}),e.jsx("option",{value:"1",children:"Activas"})]})]})]}),e.jsx("button",{className:"btn btn-primary mt-2",onClick:d,children:"Guardar"}),i&&e.jsx("p",{className:`feedback ${i.type}`,children:i.text})]})}function ya(){var h;const[s,a]=u.useState(null),[l,n]=u.useState(null),[t,i]=u.useState(null),[o,r]=u.useState([]),[d,p]=u.useState({}),[v,x]=u.useState(null);u.useEffect(()=>{N.from("view_pumai_cost").select("*").limit(30).then(({data:_})=>r(_||[])),Promise.all([N.from("ai_insights").select("*").eq("kind","executive_report").order("generated_at",{ascending:!1}).limit(1).maybeSingle(),N.from("ai_insights").select("*").eq("kind","qualitative_feedback").order("generated_at",{ascending:!1}).limit(1).maybeSingle(),N.from("ai_insights").select("*").eq("kind","anomaly_detection").order("generated_at",{ascending:!1}).limit(1).maybeSingle()]).then(([_,y,w])=>{var g,j,b;a((g=_.data)!=null&&g.data?{..._.data.data,generated_at:_.data.generated_at}:null),n((j=y.data)!=null&&j.data?{...y.data.data,generated_at:y.data.generated_at}:null),i((b=w.data)!=null&&b.data?{...w.data.data,generated_at:w.data.generated_at}:null)})},[]);async function f(_,y=!1){p(w=>({...w,[_]:!0})),x(null);try{const{data:w,error:g}=await N.functions.invoke("ai-insights",{body:{kind:_,cache:!y}});if(g)throw g;if(w!=null&&w.error)throw new Error(w.error);_==="executive_report"&&a(w),_==="qualitative_feedback"&&n(w),_==="anomaly_detection"&&i(w)}catch(w){x(`${_}: ${w.message}`)}finally{p(w=>({...w,[_]:!1}))}}const m=o.reduce((_,y)=>_+Number(y.cost_total_usd||0),0),c=o.reduce((_,y)=>_+(y.calls||0),0);return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Pum-AI Insights"}),e.jsx("h1",{className:"mt-2",children:"Inteligencia y costo del programa"}),e.jsx("p",{className:"lede",children:"Reportes ejecutivos, análisis cualitativo y detección de anomalías generados por Pum-AI. Los reportes se cachean 24h para no gastar créditos."})]})}),v&&e.jsx("p",{className:"feedback error",children:v}),e.jsxs("section",{className:"panel",children:[e.jsxs("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8},children:[e.jsx("h2",{children:"📊 Reporte ejecutivo"}),e.jsx("div",{style:{display:"flex",gap:6},children:e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>f("executive_report",!0),disabled:d.executive_report,children:d.executive_report?"Generando…":"🔄 Regenerar"})})]}),s?e.jsx(_a,{data:s}):e.jsx("button",{className:"btn btn-primary mt-2",onClick:()=>f("executive_report"),disabled:d.executive_report,children:d.executive_report?"Generando…":"✨ Generar reporte ejecutivo"})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsxs("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8},children:[e.jsx("h2",{children:"💬 Análisis cualitativo del feedback"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>f("qualitative_feedback",!0),disabled:d.qualitative_feedback,children:d.qualitative_feedback?"Generando…":"🔄 Regenerar"})]}),l?e.jsx(Na,{data:l}):e.jsx("button",{className:"btn btn-primary mt-2",onClick:()=>f("qualitative_feedback"),disabled:d.qualitative_feedback,children:d.qualitative_feedback?"Generando…":"✨ Analizar comentarios"})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsxs("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8},children:[e.jsx("h2",{children:"⚠️ Detección de anomalías"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>f("anomaly_detection",!0),disabled:d.anomaly_detection,children:d.anomaly_detection?"Generando…":"🔄 Regenerar"})]}),t?e.jsx(wa,{data:t}):e.jsx("button",{className:"btn btn-primary mt-2",onClick:()=>f("anomaly_detection"),disabled:d.anomaly_detection,children:d.anomaly_detection?"Generando…":"✨ Detectar anomalías"})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"💰 Consumo Pum-AI (últimos 30 días)"}),e.jsxs("div",{className:"kpi-grid mt-2",children:[e.jsx(te,{label:"Llamadas",value:c}),e.jsx(te,{label:"Costo USD",value:"$"+m.toFixed(4),accent:"gold"}),e.jsx(te,{label:"Modelo",value:((h=o[0])==null?void 0:h.model)||"pum-ai-flash"})]}),o.length>0&&e.jsx("div",{className:"table-wrap mt-2",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Día"}),e.jsx("th",{children:"Modelo"}),e.jsx("th",{children:"Llamadas"}),e.jsx("th",{children:"Tokens in"}),e.jsx("th",{children:"Tokens out"}),e.jsx("th",{children:"USD"})]})}),e.jsx("tbody",{children:o.slice(0,14).map((_,y)=>e.jsxs("tr",{children:[e.jsx("td",{children:_.day}),e.jsx("td",{children:e.jsx("code",{children:_.model})}),e.jsx("td",{children:_.calls}),e.jsx("td",{children:_.tokens_in}),e.jsx("td",{children:_.tokens_out}),e.jsxs("td",{children:["$",Number(_.cost_total_usd).toFixed(4)]})]},y))})]})}),e.jsx("p",{className:"note mt-2",children:"Precios estimados: Pum-AI ≈ $0.075/1M tokens entrada, $0.30/1M salida (USD)."})]}),e.jsx("style",{children:`
        .feedback.error { background: var(--c-coral-100); color: #93362A; padding: 10px 14px; border-radius: 12px; }
      `})]})}function _a({data:s}){const a=s.tone||"estable",l=a==="alerta"?"var(--c-coral-500)":a==="atender"?"var(--c-oro-600)":"var(--c-salvia-600)";return e.jsxs("div",{className:"mt-2",children:[e.jsx("span",{style:{padding:"3px 10px",borderRadius:8,background:l,color:"#fff",fontSize:"0.78rem",fontWeight:700,textTransform:"uppercase"},children:a}),e.jsx("p",{className:"lede mt-2",children:s.summary}),e.jsx("h3",{children:"Hallazgos clave"}),e.jsx("ul",{children:(s.key_findings||[]).map((n,t)=>e.jsx("li",{children:n},t))}),e.jsx("h3",{children:"Recomendaciones"}),e.jsx("ul",{children:(s.recommendations||[]).map((n,t)=>e.jsx("li",{children:n},t))}),e.jsxs("small",{className:"note",children:["Generado: ",s.generated_at?new Date(s.generated_at).toLocaleString("es-MX"):"recién"," · Periodo: ",s.period_label]})]})}function Na({data:s}){var a,l,n;return e.jsxs("div",{className:"mt-2",children:[e.jsxs("p",{className:"note",children:[s.total_comments||0," comentarios analizados."]}),e.jsxs("div",{className:"sentiment-row",children:[e.jsx(se,{label:"Positivo",pct:((a=s.sentiment)==null?void 0:a.positive_pct)||0,color:"var(--c-salvia-600)"}),e.jsx(se,{label:"Neutral",pct:((l=s.sentiment)==null?void 0:l.neutral_pct)||0,color:"var(--c-azul-700)"}),e.jsx(se,{label:"Negativo",pct:((n=s.sentiment)==null?void 0:n.negative_pct)||0,color:"var(--c-coral-500)"})]}),e.jsx("h3",{className:"mt-3",children:"Temas recurrentes"}),e.jsx("div",{className:"themes",children:(s.themes||[]).map((t,i)=>e.jsxs("div",{className:"theme",children:[e.jsxs("strong",{children:[t.label," ",e.jsxs("small",{children:["(",t.count,")"]})]}),t.sample_quote&&e.jsxs("em",{children:['"',t.sample_quote,'"']})]},i))}),e.jsx("h3",{className:"mt-3",children:"Sugerencias de mejora"}),e.jsx("ul",{children:(s.improvement_suggestions||[]).map((t,i)=>e.jsx("li",{children:t},i))}),e.jsx("style",{children:`
        .sentiment-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 10px; }
        .themes { display: grid; gap: 8px; margin-top: 8px; }
        .theme { background: var(--c-marfil); padding: 12px 14px; border-radius: 10px; }
        .theme em { display: block; color: var(--c-texto-soft); font-size: 0.92rem; margin-top: 4px; }
      `})]})}function se({label:s,pct:a,color:l}){return e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{height:60,display:"flex",alignItems:"flex-end"},children:e.jsx("div",{style:{width:"100%",height:`${a}%`,background:l,borderRadius:6,minHeight:4}})}),e.jsxs("small",{children:[e.jsxs("strong",{children:[a,"%"]})," ",s]})]})}function wa({data:s}){const a=s.overall_status||"estable",l=a==="alerta"?"#93362A":a==="atender"?"#7B5E14":"#2F8770";return e.jsxs("div",{className:"mt-2",children:[e.jsx("span",{style:{padding:"4px 12px",borderRadius:8,background:l,color:"#fff",fontSize:"0.84rem",fontWeight:700,textTransform:"uppercase"},children:a}),e.jsx("p",{className:"lede mt-2",children:s.summary}),s.recent&&s.baseline&&e.jsxs("div",{className:"mt-2 note",children:["Últimos 7 días: ",e.jsx("strong",{children:s.recent.total})," sesiones,"," ",e.jsxs("strong",{children:[(s.recent.priorityRate*100).toFixed(1),"%"]})," prioritario,"," ","promedio ",e.jsx("strong",{children:s.recent.avgScore}),". Baseline: ",e.jsx("strong",{children:s.baseline.total}),","," ",e.jsxs("strong",{children:[(s.baseline.priorityRate*100).toFixed(1),"%"]})," prioritario,"," ","promedio ",e.jsx("strong",{children:s.baseline.avgScore}),"."]}),(s.anomalies||[]).length===0?e.jsx("p",{className:"note",children:"No se detectaron anomalías relevantes."}):e.jsx("div",{className:"anom-list mt-2",children:s.anomalies.map((n,t)=>e.jsxs("article",{className:`anom sev-${n.severity}`,children:[e.jsx("strong",{children:n.title}),e.jsx("p",{children:n.description}),n.suggestion&&e.jsxs("small",{children:["💡 ",n.suggestion]})]},t))}),e.jsx("style",{children:`
        .anom-list { display: grid; gap: 10px; }
        .anom { padding: 14px; background: var(--c-marfil); border-left: 3px solid var(--c-azul-700); border-radius: 8px; }
        .anom.sev-alerta { border-color: var(--c-coral-500); }
        .anom.sev-atender { border-color: var(--c-oro-600); }
        .anom strong { color: var(--c-azul-800); }
        .anom p { margin: 4px 0; font-size: 0.94rem; }
        .anom small { color: var(--c-gris); }
      `})]})}function te({label:s,value:a,accent:l}){return e.jsxs("div",{className:`kpi-card ${l||""}`,children:[e.jsx("div",{className:"label",children:s}),e.jsx("div",{className:"value",children:a})]})}function ka({ctx:s}){const[a,l]=u.useState("audit");return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Operación"}),e.jsx("h1",{className:"mt-2",children:"Seguridad y bitácora"}),e.jsx("p",{className:"lede",children:"Auditoría de cambios, IPs sospechosas y bloqueos."})]})}),e.jsxs("div",{className:"tabs",children:[e.jsx("button",{className:`tab-btn ${a==="audit"?"active":""}`,onClick:()=>l("audit"),children:"🧾 Auditoría"}),e.jsx("button",{className:`tab-btn ${a==="ips"?"active":""}`,onClick:()=>l("ips"),children:"🔒 IPs sospechosas"}),e.jsx("button",{className:`tab-btn ${a==="blocked"?"active":""}`,onClick:()=>l("blocked"),children:"🚫 Bloqueadas"})]}),e.jsxs("div",{className:"mt-3",children:[a==="audit"&&e.jsx(Sa,{}),a==="ips"&&e.jsx(Ca,{}),a==="blocked"&&e.jsx(Aa,{ctx:s})]}),e.jsx("style",{children:`
        .tabs { display: flex; gap: 8px; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: var(--r-pill); border: 1px solid var(--c-borde); width: fit-content; }
        .tab-btn { padding: 8px 18px; border-radius: var(--r-pill); background: transparent; border: 0; font-weight: 700; color: var(--c-azul-800); cursor: pointer; }
        .tab-btn.active { background: var(--c-azul-800); color: #fff; }
      `})]})}function Sa(){const[s,a]=u.useState([]),[l,n]=u.useState(""),[t,i]=u.useState("all"),[o,r]=u.useState(!0);async function d(){r(!0);let x=N.from("admin_audit_log").select("*").order("created_at",{ascending:!1}).limit(500);t!=="all"&&(x=x.eq("entity",t));const{data:f}=await x;a(f||[]),r(!1)}u.useEffect(()=>{d()},[t]);const p=s.filter(x=>!l||(x.admin_email||"").toLowerCase().includes(l.toLowerCase())||(x.entity_id||"").includes(l)||JSON.stringify(x.after_data||{}).toLowerCase().includes(l.toLowerCase()));function v(){const x=["created_at","admin_email","action","entity","entity_id"],f=x.join(",")+`
`+p.map(h=>x.map(_=>`"${String(h[_]??"").replace(/"/g,'""')}"`).join(",")).join(`
`),m=new Blob([f],{type:"text/csv;charset=utf-8"}),c=document.createElement("a");c.href=URL.createObjectURL(m),c.download=`audit-${new Date().toISOString().slice(0,10)}.csv`,c.click()}return e.jsxs("section",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12},children:[e.jsx("input",{className:"input",placeholder:"Buscar admin, ID, contenido…",value:l,onChange:x=>n(x.target.value),style:{maxWidth:300}}),e.jsxs("select",{value:t,onChange:x=>i(x.target.value),children:[e.jsx("option",{value:"all",children:"Todas las entidades"}),e.jsx("option",{value:"questions",children:"Preguntas"}),e.jsx("option",{value:"recommendations",children:"Recomendaciones"}),e.jsx("option",{value:"resources",children:"Recursos"}),e.jsx("option",{value:"admin_users",children:"Usuarios admin"}),e.jsx("option",{value:"prompt",children:"Prompt Pum-AI"}),e.jsx("option",{value:"alerts",children:"Alertas"})]}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:v,children:"⬇ Exportar CSV"})]}),o?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsx("div",{className:"table-wrap",style:{maxHeight:600,overflowY:"auto"},children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Cuándo"}),e.jsx("th",{children:"Quién"}),e.jsx("th",{children:"Acción"}),e.jsx("th",{children:"Entidad"}),e.jsx("th",{children:"ID"})]})}),e.jsx("tbody",{children:p.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"note text-center",children:"Sin registros."})}):p.map(x=>{var f;return e.jsxs("tr",{children:[e.jsx("td",{children:new Date(x.created_at).toLocaleString("es-MX")}),e.jsx("td",{children:x.admin_email||"—"}),e.jsx("td",{children:x.action}),e.jsx("td",{children:x.entity}),e.jsx("td",{children:e.jsx("code",{children:((f=x.entity_id)==null?void 0:f.slice(0,8))||"—"})})]},x.id)})})]})})]})}function Ca(){const[s,a]=u.useState([]),[l,n]=u.useState(!0);async function t(){n(!0);const{data:r}=await N.from("view_suspicious_ips").select("*");a(r||[]),n(!1)}u.useEffect(()=>{t()},[]);async function i(r){confirm("¿Bloquear esta IP? No podrá registrar nuevas cuentas anónimas ni usar el chat.")&&(await N.from("ip_blocklist").upsert({ip_hash:r,reason:"manual block by admin"}),t())}async function o(r){confirm("¿Limpiar el historial de esta IP? Resetea el contador de rate limit (útil para testing).")&&(await N.from("ip_log").delete().eq("ip_hash",r),t())}return e.jsxs("section",{className:"panel",children:[e.jsx("p",{className:"note",children:"IPs (hasheadas) que crearon más de 5 códigos anónimos en las últimas 24h."}),l?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):s.length===0?e.jsx("p",{className:"note text-center",children:"Sin IPs sospechosas en este momento. 🟢"}):e.jsx("div",{className:"table-wrap mt-2",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Prefix"}),e.jsx("th",{children:"Hash"}),e.jsx("th",{children:"Eventos"}),e.jsx("th",{children:"Códigos distintos"}),e.jsx("th",{children:"Endpoints"}),e.jsx("th",{children:"Última actividad"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:s.map(r=>e.jsxs("tr",{children:[e.jsx("td",{children:r.ip_prefix||"—"}),e.jsx("td",{children:e.jsxs("code",{style:{fontSize:"0.74rem"},children:[r.ip_hash.slice(0,12),"…"]})}),e.jsx("td",{children:r.total_events}),e.jsx("td",{children:e.jsx("strong",{children:r.distinct_codes})}),e.jsx("td",{children:e.jsx("small",{children:(r.endpoints||[]).join(", ")})}),e.jsx("td",{children:new Date(r.last_at).toLocaleString("es-MX")}),e.jsxs("td",{style:{whiteSpace:"nowrap"},children:[e.jsx("button",{className:"icon-btn",onClick:()=>o(r.ip_hash),title:"Borra logs y resetea rate limit",children:"🧹 Limpiar"})," ",e.jsx("button",{className:"icon-btn danger",onClick:()=>i(r.ip_hash),children:"🚫 Bloquear"})]})]},r.ip_hash))})]})}),e.jsx("style",{children:`
        .icon-btn { background:transparent; border: 1px solid var(--c-borde); padding: 6px 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
      `})]})}function Aa(){const[s,a]=u.useState([]),[l,n]=u.useState(!0),[t,i]=u.useState(!1),[o,r]=u.useState(null);async function d(){n(!0);const{data:x}=await N.from("ip_blocklist").select("*").order("blocked_at",{ascending:!1});a(x||[]),n(!1)}u.useEffect(()=>{d()},[]);async function p(x){confirm("¿Desbloquear esta IP? También limpiará su historial de logs (para evitar re-bloqueo automático).")&&(await N.from("ip_blocklist").delete().eq("ip_hash",x),await N.from("ip_log").delete().eq("ip_hash",x),d())}async function v(){var x,f;if(confirm(`⚠️ MODO TESTING

¿Borrar TODOS los logs de IP de las últimas 24h y desbloquear TODAS las IPs?

Esto resetea los rate limits de toda la plataforma. Útil cuando estás probando con tu propia conexión y quieres seguir registrando códigos.`)){i(!0),r(null);try{const m=new Date(Date.now()-864e5).toISOString(),[c,h]=await Promise.all([N.from("ip_log").delete().gte("created_at",m),N.from("ip_blocklist").delete().gte("blocked_at",m)]);if(c.error||h.error)throw new Error(((x=c.error)==null?void 0:x.message)||((f=h.error)==null?void 0:f.message));r("✅ Logs de IP y blocklist de las últimas 24h limpiados. Ya puedes volver a registrar."),d()}catch(m){r("❌ "+(m.message||"Error al resetear"))}finally{i(!1)}}}return e.jsxs("section",{className:"panel",children:[e.jsx("p",{className:"note",children:"IPs bloqueadas para nuevas operaciones públicas (registro/chat). Auto-bloqueo después de más de 5 registros en 24h."}),l?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):s.length===0?e.jsx("p",{className:"note text-center",children:"Ninguna IP bloqueada. 🟢"}):e.jsx("div",{className:"table-wrap mt-2",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Hash"}),e.jsx("th",{children:"Razón"}),e.jsx("th",{children:"Bloqueada"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:s.map(x=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("code",{style:{fontSize:"0.74rem"},children:[x.ip_hash.slice(0,16),"…"]})}),e.jsx("td",{children:e.jsx("small",{children:x.reason})}),e.jsx("td",{children:new Date(x.blocked_at).toLocaleString("es-MX")}),e.jsx("td",{children:e.jsx("button",{className:"icon-btn",onClick:()=>p(x.ip_hash),children:"✓ Desbloquear y limpiar logs"})})]},x.ip_hash))})]})}),e.jsxs("div",{className:"testing-box mt-4",children:[e.jsx("h3",{children:"🧪 Modo testing — resetear rate limits"}),e.jsxs("p",{className:"note",children:["Cuando estás probando registros con tu propia IP y te auto-bloqueas, este botón limpia todos los logs y desbloqueos de las últimas 24h. ",e.jsx("strong",{children:"No usar en producción real."})]}),e.jsx("button",{className:"btn btn-ghost",onClick:v,disabled:t,children:t?"Reseteando…":"🧹 Resetear rate limits de las últimas 24h"}),o&&e.jsx("p",{className:"note mt-2",children:e.jsx("strong",{children:o})})]}),e.jsx("style",{children:`
        .icon-btn { background:transparent; border: 1px solid var(--c-borde); padding: 6px 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
        .testing-box {
          margin-top: 20px;
          padding: 16px 18px;
          background: var(--c-oro-100);
          border: 1px dashed var(--c-oro-600);
          border-radius: 12px;
        }
        .testing-box h3 { margin: 0 0 6px; font-size: 1rem; color: #7B5E14; }
      `})]})}const za={estado_emocional:"Estado emocional",estres_academico:"Estrés académico",sueno_descanso:"Sueño y descanso",apoyo_social:"Apoyo social",motivacion_pertenencia:"Motivación"};function Ea(){const[s,a]=u.useState([]),[l,n]=u.useState([]),[t,i]=u.useState([]),[o,r]=u.useState(!0);if(u.useEffect(()=>{(async()=>{const[x,f,m]=await Promise.all([N.from("view_cohorts_monthly").select("*").limit(12),N.from("view_dimension_heatmap").select("*").limit(80),N.from("view_feedback_summary").select("*").limit(30)]);a(x.data||[]),n(f.data||[]),i(m.data||[]),r(!1)})()},[]),o)return e.jsx("div",{className:"spinner",style:{margin:"80px auto"}});const d=[...new Set(l.map(x=>x.week))].sort().slice(-12),v=[...new Set(l.map(x=>x.dimension_id))].map(x=>({dimension:x,cells:d.map(f=>{const m=l.find(c=>c.week===f&&c.dimension_id===x);return{week:f,score:(m==null?void 0:m.avg_score)??null,samples:(m==null?void 0:m.samples)??0}})}));return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Análisis avanzado"}),e.jsx("h1",{className:"mt-2",children:"Cohortes, tendencias y benchmarks"}),e.jsx("p",{className:"lede",children:"Comparativas mensuales, heatmap dimensión × tiempo, y feedback agregado."})]})}),e.jsxs("section",{className:"panel",children:[e.jsx("h2",{children:"Cohortes mensuales"}),e.jsx("p",{className:"note",children:"Cómo se compara cada mes con los anteriores en participación y nivel general."}),e.jsx(Re,{data:s.slice(0,6).reverse().map(x=>({label:x.cohort,value:x.total})),x:"label",y:"value",color:"#1A3358"}),e.jsx("div",{className:"table-wrap mt-2",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Mes"}),e.jsx("th",{children:"Total"}),e.jsx("th",{children:"Promedio"}),e.jsx("th",{children:"Bajo"}),e.jsx("th",{children:"Moderado"}),e.jsx("th",{children:"Prioritario"})]})}),e.jsx("tbody",{children:s.map(x=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:x.cohort})}),e.jsx("td",{children:x.total}),e.jsx("td",{children:x.avg_score}),e.jsx("td",{children:e.jsx("span",{className:"lvl-bg-bajo",style:{padding:"2px 8px",borderRadius:6},children:x.bajo})}),e.jsx("td",{children:e.jsx("span",{className:"lvl-bg-moderado",style:{padding:"2px 8px",borderRadius:6},children:x.moderado})}),e.jsx("td",{children:e.jsx("span",{className:"lvl-bg-prioritario",style:{padding:"2px 8px",borderRadius:6},children:x.prioritario})})]},x.cohort))})]})})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Heatmap: dimensiones × semanas"}),e.jsx("p",{className:"note",children:"Color = puntaje promedio (más oscuro = mayor atención requerida)."}),e.jsx("div",{className:"hm-wrap",style:{overflowX:"auto"},children:e.jsxs("table",{className:"hm-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Dimensión"}),d.map(x=>e.jsx("th",{className:"hm-col",children:new Date(x).toLocaleDateString("es-MX",{day:"2-digit",month:"short"})},x))]})}),e.jsx("tbody",{children:v.map(x=>e.jsxs("tr",{children:[e.jsx("td",{className:"hm-row-label",children:za[x.dimension]||x.dimension}),x.cells.map((f,m)=>e.jsx("td",{className:"hm-cell",style:{background:f.score===null?"#F4F7FB":Ma(f.score),color:f.score&&f.score>50?"#fff":"var(--c-azul-800)"},title:`${f.score??"—"} (n=${f.samples})`,children:f.score??"—"},m))]},x.dimension))})]})}),e.jsx("style",{children:`
          .hm-table { border-collapse: collapse; font-size: 0.86rem; }
          .hm-table th, .hm-table td { padding: 8px 10px; border: 1px solid var(--c-borde-soft); text-align: center; min-width: 56px; }
          .hm-row-label { text-align: left !important; font-weight: 700; color: var(--c-azul-800); white-space: nowrap; min-width: 160px; }
          .hm-col { font-size: 0.74rem; color: var(--c-gris); white-space: nowrap; }
          .hm-cell { font-weight: 700; }
        `})]}),t.length>0&&e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Tendencia de feedback"}),e.jsx("p",{className:"note",children:"Calificaciones diarias (1-5)."}),e.jsx(Me,{data:t.slice(0,14).reverse().map(x=>({day:x.day,total:x.avg_rating,raw:x})),x:"day",y:"total",label:"Promedio diario de feedback"})]})]})}function Ma(s){const a=Math.max(0,Math.min(1,s/100)),l=Math.round(143+67*a),n=Math.round(184+-77*a),t=Math.round(160+-77*a);return`rgb(${l},${n},${t})`}const Ra=[{id:"trees",label:"🌳 Árboles"},{id:"events",label:"📅 Eventos"},{id:"webinars",label:"📡 Webinars"},{id:"hunts",label:"🗺 Treasure Hunts"},{id:"library",label:"📚 Biblioteca"},{id:"specialists",label:"🩺 Especialistas"},{id:"blocks",label:"📄 Bloques de página"}];function qa({ctx:s}){const[a,l]=u.useState("trees");return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag sage",children:"Programa"}),e.jsx("h1",{className:"mt-2",children:"Gestión del programa"}),e.jsx("p",{className:"lede",children:"Administra el contenido vivo del proyecto: árboles, eventos, aventuras, biblioteca y especialistas."})]})}),e.jsx("div",{className:"tabs",children:Ra.map(n=>e.jsx("button",{className:`tab-btn ${a===n.id?"active":""}`,onClick:()=>l(n.id),children:n.label},n.id))}),e.jsxs("div",{className:"mt-3",children:[a==="trees"&&e.jsx(Ia,{ctx:s}),a==="events"&&e.jsx(La,{ctx:s}),a==="webinars"&&e.jsx(Pa,{ctx:s}),a==="hunts"&&e.jsx(Ta,{ctx:s}),a==="library"&&e.jsx(Fa,{ctx:s}),a==="specialists"&&e.jsx($a,{ctx:s}),a==="blocks"&&e.jsx(Ba,{ctx:s})]}),e.jsx("style",{children:`
        .tabs { display: flex; gap: 6px; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: var(--r-pill); border: 1px solid var(--c-borde); width: fit-content; }
        .tab-btn { padding: 8px 16px; border-radius: var(--r-pill); background: transparent; border: 0; font-weight: 700; color: var(--c-azul-800); cursor: pointer; font-size: 0.9rem; }
        .tab-btn.active { background: var(--c-azul-800); color: #fff; }
        .grid-form { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 720px) { .grid-form { grid-template-columns: 1fr; } }
      `})]})}function Ia({ctx:s}){return e.jsx(ee,{ctx:s,table:"tree_plantings",entity:"trees",title:"Árboles plantados",columns:[{key:"species",label:"Especie"},{key:"location_name",label:"Ubicación"},{key:"planted_at",label:"Plantado",format:a=>a?new Date(a).toLocaleDateString("es-MX"):"—"}],defaultRow:{species:"",planted_at:"",location_name:"",location_lat:"",location_lng:"",notes:"",photo_url:""},Form:({draft:a,setDraft:l})=>e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Especie"}),e.jsx("input",{value:a.species||"",onChange:n=>l({...a,species:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Plantado el"}),e.jsx("input",{type:"date",value:a.planted_at||"",onChange:n=>l({...a,planted_at:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Ubicación"}),e.jsx("input",{value:a.location_name||"",onChange:n=>l({...a,location_name:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Foto URL"}),e.jsx("input",{value:a.photo_url||"",onChange:n=>l({...a,photo_url:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Latitud"}),e.jsx("input",{type:"number",step:"0.0001",value:a.location_lat||"",onChange:n=>l({...a,location_lat:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Longitud"}),e.jsx("input",{type:"number",step:"0.0001",value:a.location_lng||"",onChange:n=>l({...a,location_lng:n.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1 / -1"},children:[e.jsx("label",{children:"Notas"}),e.jsx("textarea",{value:a.notes||"",onChange:n=>l({...a,notes:n.target.value})})]})]})})}function La({ctx:s}){return e.jsx(ee,{ctx:s,table:"wellness_events",entity:"wellness_events",title:"Eventos universitarios",columns:[{key:"title",label:"Título"},{key:"category",label:"Categoría"},{key:"starts_at",label:"Inicia",format:a=>a?new Date(a).toLocaleString("es-MX"):"—"},{key:"active",label:"Activo",format:a=>a?"✅":"⏸"}],defaultRow:{title:"",description:"",category:"comunidad",starts_at:"",ends_at:"",location:"",faculty:"",organizer:"",url:"",capacity:"",active:!0},Form:({draft:a,setDraft:l})=>e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Título"}),e.jsx("input",{value:a.title||"",onChange:n=>l({...a,title:n.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Descripción"}),e.jsx("textarea",{value:a.description||"",onChange:n=>l({...a,description:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Categoría"}),e.jsxs("select",{value:a.category||"comunidad",onChange:n=>l({...a,category:n.target.value}),children:[e.jsx("option",{value:"psicologia",children:"Psicología"}),e.jsx("option",{value:"deporte",children:"Deporte"}),e.jsx("option",{value:"arte",children:"Arte"}),e.jsx("option",{value:"sustentabilidad",children:"Sustentabilidad"}),e.jsx("option",{value:"comunidad",children:"Comunidad"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Capacidad"}),e.jsx("input",{type:"number",value:a.capacity||"",onChange:n=>l({...a,capacity:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Inicia"}),e.jsx("input",{type:"datetime-local",value:U(a.starts_at),onChange:n=>l({...a,starts_at:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Termina"}),e.jsx("input",{type:"datetime-local",value:U(a.ends_at),onChange:n=>l({...a,ends_at:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Ubicación"}),e.jsx("input",{value:a.location||"",onChange:n=>l({...a,location:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Facultad"}),e.jsx("input",{value:a.faculty||"",onChange:n=>l({...a,faculty:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Organizador"}),e.jsx("input",{value:a.organizer||"",onChange:n=>l({...a,organizer:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"URL"}),e.jsx("input",{value:a.url||"",onChange:n=>l({...a,url:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Activo"}),e.jsxs("select",{value:a.active?"1":"0",onChange:n=>l({...a,active:n.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Sí"}),e.jsx("option",{value:"0",children:"No"})]})]})]})})}function U(s){if(!s)return"";const a=new Date(s);if(isNaN(a))return"";const l=a.getTimezoneOffset();return new Date(a.getTime()-l*6e4).toISOString().slice(0,16)}function Pa({ctx:s}){const[a,l]=u.useState([]),[n,t]=u.useState(null),[i,o]=u.useState({}),[r,d]=u.useState(!0);async function p(){d(!0);const{data:c}=await N.from("wellness_events").select("*").eq("category","webinar").order("starts_at",{ascending:!1});l(c||[]),d(!1)}u.useEffect(()=>{p()},[]);function v(){t("new"),o({title:"",description:"",speaker:"",category:"webinar",starts_at:"",ends_at:"",location:"En línea",url:"",image_url:"",capacity:"",is_featured:!0,active:!0})}function x(c){t(c.id),o({...c})}async function f(){const c={...i,category:"webinar",capacity:i.capacity===""?null:Number(i.capacity),starts_at:i.starts_at||null,ends_at:i.ends_at||null};if(n==="new"){const{data:h,error:_}=await N.from("wellness_events").insert(c).select().single();if(_)return alert(_.message);await z({ctx:s,action:"create",entity:"webinars",entity_id:h.id,after_data:h})}else{const h=a.find(y=>y.id===n),{error:_}=await N.from("wellness_events").update(c).eq("id",n);if(_)return alert(_.message);await z({ctx:s,action:"update",entity:"webinars",entity_id:n,before_data:h,after_data:c})}t(null),o({}),p()}async function m(c){confirm(`¿Eliminar webinar "${c.title}"?`)&&(await N.from("wellness_events").delete().eq("id",c.id),await z({ctx:s,action:"delete",entity:"webinars",entity_id:c.id,before_data:c}),p())}return r?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsxs("section",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"},children:[e.jsxs("h2",{children:["Webinars (",a.length,")"]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:v,children:"＋ Nuevo webinar"})]}),e.jsx("p",{className:"note",children:"Los webinars activos próximos aparecerán como notificación flotante en el sitio público. El más cercano se muestra primero."}),(n==="new"||n)&&e.jsxs("div",{className:"edit-area mt-3",children:[e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Título"}),e.jsx("input",{value:i.title||"",onChange:c=>o({...i,title:c.target.value}),placeholder:"ej. Manejo del estrés en exámenes finales"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Ponente"}),e.jsx("input",{value:i.speaker||"",onChange:c=>o({...i,speaker:c.target.value}),placeholder:"Mtro. Juan Pérez"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Capacidad"}),e.jsx("input",{type:"number",value:i.capacity||"",onChange:c=>o({...i,capacity:c.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Inicia"}),e.jsx("input",{type:"datetime-local",value:U(i.starts_at),onChange:c=>o({...i,starts_at:c.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Termina"}),e.jsx("input",{type:"datetime-local",value:U(i.ends_at),onChange:c=>o({...i,ends_at:c.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Ubicación / Plataforma"}),e.jsx("input",{value:i.location||"",onChange:c=>o({...i,location:c.target.value}),placeholder:"Zoom, presencial, etc."})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"URL de inscripción"}),e.jsx("input",{value:i.url||"",onChange:c=>o({...i,url:c.target.value}),placeholder:"https://..."})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"URL de imagen (banner del toast)"}),e.jsx("input",{value:i.image_url||"",onChange:c=>o({...i,image_url:c.target.value}),placeholder:"https://..."})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Descripción"}),e.jsx("textarea",{rows:3,value:i.description||"",onChange:c=>o({...i,description:c.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Activo"}),e.jsxs("select",{value:i.active?"1":"0",onChange:c=>o({...i,active:c.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Sí"}),e.jsx("option",{value:"0",children:"No"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Destacado (toast)"}),e.jsxs("select",{value:i.is_featured?"1":"0",onChange:c=>o({...i,is_featured:c.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Sí"}),e.jsx("option",{value:"0",children:"No"})]})]})]}),i.image_url&&e.jsx("img",{src:i.image_url,alt:"preview",style:{maxWidth:240,height:"auto",borderRadius:12,marginTop:12}}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:f,children:"✓ Guardar"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{t(null),o({})},children:"Cancelar"})]})]}),e.jsxs("div",{className:"cards-grid mt-3",children:[a.map(c=>e.jsxs("article",{className:"rcard",children:[c.image_url&&e.jsx("img",{src:c.image_url,alt:"",style:{width:"100%",height:120,objectFit:"cover",borderRadius:12,marginBottom:8}}),e.jsx("span",{className:"tag",children:"📡 Webinar"}),e.jsx("h3",{className:"mt-2",children:c.title}),c.speaker&&e.jsxs("small",{children:["👤 ",c.speaker]}),e.jsxs("small",{children:["🗓 ",c.starts_at?new Date(c.starts_at).toLocaleString("es-MX"):"—"]}),c.location&&e.jsxs("small",{children:["📍 ",c.location]}),c.description&&e.jsx("p",{className:"note",children:c.description}),e.jsxs("div",{className:"actions-cell mt-2",children:[e.jsx("button",{className:"icon-btn",onClick:()=>x(c),children:"✎ Editar"}),e.jsx("button",{className:"icon-btn danger",onClick:()=>m(c),children:"🗑"}),e.jsx("span",{style:{marginLeft:"auto",padding:"4px 8px",background:c.active?"var(--c-salvia-100)":"var(--c-coral-100)",borderRadius:8,fontSize:"0.78rem",fontWeight:700},children:c.active?"Activo":"Inactivo"})]})]},c.id)),a.length===0&&e.jsx("p",{className:"note text-center",style:{gridColumn:"1/-1"},children:"Aún no hay webinars. Crea el primero."})]})]})}function $a({ctx:s}){return e.jsx(ee,{ctx:s,table:"specialists",entity:"specialists",title:"Especialistas para canalización",columns:[{key:"full_name",label:"Nombre"},{key:"specialty",label:"Especialidad"},{key:"faculty",label:"Facultad"},{key:"active",label:"Activo",format:a=>a?"✅":"⏸"}],defaultRow:{full_name:"",specialty:"Psicología",email:"",phone:"",schedule:"",modality:"",faculty:"",active:!0},Form:({draft:a,setDraft:l})=>e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Nombre / Servicio"}),e.jsx("input",{value:a.full_name||"",onChange:n=>l({...a,full_name:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Especialidad"}),e.jsx("input",{value:a.specialty||"",onChange:n=>l({...a,specialty:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Facultad"}),e.jsx("input",{value:a.faculty||"",onChange:n=>l({...a,faculty:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Email"}),e.jsx("input",{type:"email",value:a.email||"",onChange:n=>l({...a,email:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Teléfono"}),e.jsx("input",{value:a.phone||"",onChange:n=>l({...a,phone:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Horario"}),e.jsx("input",{value:a.schedule||"",onChange:n=>l({...a,schedule:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Modalidad"}),e.jsx("input",{value:a.modality||"",onChange:n=>l({...a,modality:n.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Activo"}),e.jsxs("select",{value:a.active?"1":"0",onChange:n=>l({...a,active:n.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Sí"}),e.jsx("option",{value:"0",children:"No"})]})]})]})})}function Fa({ctx:s}){return e.jsx(ee,{ctx:s,table:"student_library",entity:"student_library",title:"Biblioteca para estudiantes",columns:[{key:"category",label:"Categoría"},{key:"title",label:"Título"},{key:"duration_sec",label:"Duración (seg)"},{key:"active",label:"Activo",format:a=>a?"✅":"⏸"}],defaultRow:{category:"breathing",title:"",body:"",media_url:"",duration_sec:"",active:!0,meta:null},Form:({draft:a,setDraft:l})=>e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Categoría"}),e.jsxs("select",{value:a.category||"breathing",onChange:n=>l({...a,category:n.target.value}),children:[e.jsx("option",{value:"breathing",children:"Respiración"}),e.jsx("option",{value:"sound",children:"Sonido"}),e.jsx("option",{value:"video",children:"Video"}),e.jsx("option",{value:"dictionary",children:"Diccionario emoción"}),e.jsx("option",{value:"quote",children:"Frase"}),e.jsx("option",{value:"challenge",children:"Reto"}),e.jsx("option",{value:"teachers_kit",children:"Kit docente"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Duración (seg)"}),e.jsx("input",{type:"number",value:a.duration_sec||"",onChange:n=>l({...a,duration_sec:n.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Título"}),e.jsx("input",{value:a.title||"",onChange:n=>l({...a,title:n.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Contenido / instrucciones"}),e.jsx("textarea",{rows:4,value:a.body||"",onChange:n=>l({...a,body:n.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"URL del media (audio/video)"}),e.jsx("input",{value:a.media_url||"",onChange:n=>l({...a,media_url:n.target.value}),placeholder:"https://..."})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Activo"}),e.jsxs("select",{value:a.active?"1":"0",onChange:n=>l({...a,active:n.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Sí"}),e.jsx("option",{value:"0",children:"No"})]})]})]})})}function Ta({ctx:s}){const[a,l]=u.useState([]),[n,t]=u.useState(null),[i,o]=u.useState(!0);async function r(){o(!0);const{data:d}=await N.from("game_events").select("*, clues:game_clues(*)").order("starts_at",{ascending:!1});l(d||[]),o(!1)}return u.useEffect(()=>{r()},[]),i?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsxs("section",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("h2",{children:["Treasure Hunts (",a.length,")"]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>t("new"),children:"＋ Nueva aventura"})]}),e.jsx("div",{className:"hunts-list mt-2",children:a.map(d=>{var p;return e.jsxs("article",{className:"hunt-item",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsx("strong",{children:d.title}),e.jsxs("small",{children:[d.active?"🟢 activo":"⏸ inactivo"," · ",((p=d.clues)==null?void 0:p.length)||0," pistas"]})]}),e.jsx("button",{className:"icon-btn",onClick:()=>t(d.id),children:"✎ Editar"})]}),d.description&&e.jsx("p",{className:"note",children:d.description})]},d.id)})}),n&&e.jsx(Da,{ctx:s,hunt:n==="new"?null:a.find(d=>d.id===n),onClose:()=>{t(null),r()}}),e.jsx("style",{children:`
        .hunts-list { display: grid; gap: 10px; }
        .hunt-item { background: #fff; border: 1px solid var(--c-borde); border-radius: 12px; padding: 14px 16px; }
        .hunt-item header { display: flex; justify-content: space-between; align-items: flex-start; }
        .hunt-item small { display: block; color: var(--c-gris); font-size: 0.82rem; }
        .icon-btn { background: transparent; border: 1px solid var(--c-borde); padding: 6px 10px; border-radius: 8px; cursor: pointer; }
      `})]})}function Da({ctx:s,hunt:a,onClose:l}){var f;const[n,t]=u.useState(a||{title:"",description:"",reward_label:"",reward_image:"",starts_at:"",ends_at:"",active:!0,clues:[]}),[i,o]=u.useState(!1);function r(){t(m=>{var c;return{...m,clues:[...m.clues||[],{clue_order:(((c=m.clues)==null?void 0:c.length)||0)+1,riddle:"",hint:"",unlock_after:"always"}]}})}function d(m,c,h){t(_=>({..._,clues:_.clues.map((y,w)=>w===m?{...y,[c]:h}:y)}))}function p(m){t(c=>({...c,clues:c.clues.filter((h,_)=>_!==m)}))}async function v(){o(!0);try{let m=a==null?void 0:a.id;const c={title:n.title,description:n.description,reward_label:n.reward_label,reward_image:n.reward_image,starts_at:n.starts_at,ends_at:n.ends_at,active:n.active};if(m){const{error:h}=await N.from("game_events").update(c).eq("id",m);if(h)throw h;await z({ctx:s,action:"update",entity:"game_events",entity_id:m,after_data:c})}else{const{data:h,error:_}=await N.from("game_events").insert(c).select().single();if(_)throw _;m=h.id,await z({ctx:s,action:"create",entity:"game_events",entity_id:m,after_data:h})}await N.from("game_clues").delete().eq("event_id",m);for(const h of n.clues)await N.from("game_clues").insert({event_id:m,clue_order:h.clue_order,riddle:h.riddle,hint:h.hint,unlock_after:h.unlock_after,reveal_at_lat:h.reveal_at_lat||null,reveal_at_lng:h.reveal_at_lng||null});l()}catch(m){alert(m.message)}finally{o(!1)}}async function x(){a!=null&&a.id&&confirm(`¿Eliminar la aventura "${a.title}"?`)&&(await N.from("game_events").delete().eq("id",a.id),await z({ctx:s,action:"delete",entity:"game_events",entity_id:a.id,before_data:a}),l())}return e.jsxs("div",{className:"overlay",onClick:l,children:[e.jsxs("div",{className:"modal",onClick:m=>m.stopPropagation(),children:[e.jsxs("header",{children:[e.jsx("h3",{children:a?"✏️ Editar aventura":"✨ Nueva aventura"}),e.jsx("button",{onClick:l,children:"✕"})]}),e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Título"}),e.jsx("input",{value:n.title,onChange:m=>t({...n,title:m.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Descripción"}),e.jsx("textarea",{value:n.description||"",onChange:m=>t({...n,description:m.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Inicio"}),e.jsx("input",{type:"datetime-local",value:U(n.starts_at),onChange:m=>t({...n,starts_at:m.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Fin"}),e.jsx("input",{type:"datetime-local",value:U(n.ends_at),onChange:m=>t({...n,ends_at:m.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Recompensa"}),e.jsx("input",{value:n.reward_label||"",onChange:m=>t({...n,reward_label:m.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Activo"}),e.jsxs("select",{value:n.active?"1":"0",onChange:m=>t({...n,active:m.target.value==="1"}),children:[e.jsx("option",{value:"1",children:"Sí"}),e.jsx("option",{value:"0",children:"No"})]})]})]}),e.jsx("h4",{className:"mt-3",children:"Pistas"}),((f=n.clues)==null?void 0:f.length)===0&&e.jsx("p",{className:"note",children:"Aún sin pistas. Agrega al menos 1."}),(n.clues||[]).map((m,c)=>e.jsxs("div",{className:"clue-edit",children:[e.jsxs("header",{children:[e.jsxs("strong",{children:["Pista #",m.clue_order]}),e.jsx("button",{onClick:()=>p(c),className:"icon-btn",children:"🗑"})]}),e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Orden"}),e.jsx("input",{type:"number",value:m.clue_order,onChange:h=>d(c,"clue_order",Number(h.target.value))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Desbloquea con"}),e.jsxs("select",{value:m.unlock_after||"always",onChange:h=>d(c,"unlock_after",h.target.value),children:[e.jsx("option",{value:"always",children:"Disponible al inicio"}),e.jsx("option",{value:"checkin_count:1",children:"1 check-in"}),e.jsx("option",{value:"checkin_count:2",children:"2 check-ins"}),e.jsx("option",{value:"checkin_count:3",children:"3 check-ins"}),e.jsx("option",{value:"wellness_route_done",children:"Completar ruta de bienestar"})]})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Adivinanza / pista"}),e.jsx("textarea",{value:m.riddle||"",onChange:h=>d(c,"riddle",h.target.value)})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Hint adicional (opcional)"}),e.jsx("input",{value:m.hint||"",onChange:h=>d(c,"hint",h.target.value)})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Lat (opcional)"}),e.jsx("input",{type:"number",step:"0.0001",value:m.reveal_at_lat||"",onChange:h=>d(c,"reveal_at_lat",h.target.value)})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Lng (opcional)"}),e.jsx("input",{type:"number",step:"0.0001",value:m.reveal_at_lng||"",onChange:h=>d(c,"reveal_at_lng",h.target.value)})]})]})]},c)),e.jsx("button",{className:"btn btn-ghost btn-sm mt-2",onClick:r,children:"＋ Agregar pista"}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:18},children:[e.jsx("button",{className:"btn btn-primary",onClick:v,disabled:i,children:i?"Guardando…":"✓ Guardar aventura"}),e.jsx("button",{className:"btn btn-ghost",onClick:l,children:"Cancelar"}),a&&e.jsx("button",{className:"btn btn-coral",onClick:x,style:{marginLeft:"auto"},children:"🗑 Eliminar"})]})]}),e.jsx("style",{children:`
        .overlay { position: fixed; inset: 0; background: rgba(10,25,41,0.5); display: grid; place-items: center; z-index: 100; padding: 16px; }
        .modal { background: #fff; border-radius: var(--r-xl); padding: 24px; max-width: 760px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .modal header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .modal header h3 { margin: 0; }
        .modal header button { background: transparent; border: 0; cursor: pointer; font-size: 1.4rem; color: var(--c-gris); }
        .clue-edit { background: var(--c-marfil); border: 1px solid var(--c-borde-soft); border-radius: 12px; padding: 14px; margin-top: 10px; }
        .clue-edit header { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .icon-btn { background: transparent; border: 1px solid var(--c-borde); padding: 4px 8px; border-radius: 6px; cursor: pointer; }
      `})]})}function Ba({ctx:s}){const[a,l]=u.useState([]),[n,t]=u.useState(null),[i,o]=u.useState({}),[r,d]=u.useState("all"),[p,v]=u.useState(!0);async function x(){v(!0);const{data:j}=await N.from("content_blocks").select("*").order("page").order("order_idx");l(j||[]),v(!1)}u.useEffect(()=>{x()},[]);function f(){t("new"),o({page:"support",section_key:"",title:"",body:"",list_items:[],emoji:"",order_idx:(a.length||0)+1,active:!0})}function m(j){t(j.id),o({...j,list_items:Array.isArray(j.list_items)?j.list_items:[]})}async function c(){var b;const j={...i,updated_at:new Date().toISOString(),updated_by:s.admin.id,list_items:(b=i.list_items)!=null&&b.length?i.list_items:null};if(n==="new"){const{data:k,error:C}=await N.from("content_blocks").insert(j).select().single();if(C)return alert(C.message);await z({ctx:s,action:"create",entity:"content_blocks",entity_id:k.id,after_data:k})}else{const k=a.find(E=>E.id===n),{error:C}=await N.from("content_blocks").update(j).eq("id",n);if(C)return alert(C.message);await z({ctx:s,action:"update",entity:"content_blocks",entity_id:n,before_data:k,after_data:j})}t(null),o({}),x()}async function h(j){confirm(`¿Eliminar bloque "${j.title}"?`)&&(await N.from("content_blocks").delete().eq("id",j.id),await z({ctx:s,action:"delete",entity:"content_blocks",entity_id:j.id,before_data:j}),x())}function _(){o(j=>({...j,list_items:[...j.list_items||[],""]}))}function y(j,b){o(k=>({...k,list_items:k.list_items.map((C,E)=>E===j?b:C)}))}function w(j){o(b=>({...b,list_items:b.list_items.filter((k,C)=>C!==j)}))}const g=r==="all"?a:a.filter(j=>j.page===r);return p?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsxs("section",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"},children:[e.jsxs("h2",{children:["Bloques de contenido (",a.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsxs("select",{value:r,onChange:j=>d(j.target.value),children:[e.jsx("option",{value:"all",children:"Todas las páginas"}),e.jsx("option",{value:"support",children:"Apoyo (/apoyo)"}),e.jsx("option",{value:"teachers",children:"Docentes (/admin/docentes)"}),e.jsx("option",{value:"home",children:"Inicio"})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:f,children:"＋ Nuevo bloque"})]})]}),e.jsxs("p",{className:"note mt-2",children:["Los bloques aparecen en las páginas públicas correspondientes ordenados por ",e.jsx("code",{children:"order_idx"}),". Soporta ",e.jsx("code",{children:"**negritas**"})," en items de lista."]}),(n==="new"||n)&&e.jsxs("div",{className:"edit-area mt-3",children:[e.jsxs("div",{className:"grid-form",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Página"}),e.jsxs("select",{value:i.page,onChange:j=>o({...i,page:j.target.value}),children:[e.jsx("option",{value:"support",children:"Apoyo (/apoyo)"}),e.jsx("option",{value:"teachers",children:"Docentes (/admin/docentes)"}),e.jsx("option",{value:"home",children:"Inicio"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Section key (slug)"}),e.jsx("input",{value:i.section_key||"",onChange:j=>o({...i,section_key:j.target.value.replace(/\s+/g,"_").toLowerCase()}),placeholder:"ej. alertas"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Emoji"}),e.jsx("input",{value:i.emoji||"",onChange:j=>o({...i,emoji:j.target.value}),placeholder:"🎯"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Orden"}),e.jsx("input",{type:"number",value:i.order_idx||0,onChange:j=>o({...i,order_idx:Number(j.target.value)})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Título"}),e.jsx("input",{value:i.title||"",onChange:j=>o({...i,title:j.target.value})})]}),e.jsxs("div",{className:"field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{children:"Texto introductorio (opcional)"}),e.jsx("textarea",{rows:2,value:i.body||"",onChange:j=>o({...i,body:j.target.value})})]})]}),e.jsxs("div",{className:"field",style:{marginTop:12},children:[e.jsx("label",{children:"Items de lista (bullets)"}),(i.list_items||[]).map((j,b)=>e.jsxs("div",{style:{display:"flex",gap:6,marginBottom:6},children:[e.jsx("input",{value:j,onChange:k=>y(b,k.target.value),placeholder:`Item ${b+1}`}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>w(b),type:"button",children:"✕"})]},b)),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:_,type:"button",children:"＋ Agregar item"})]}),e.jsx("div",{className:"field",style:{marginTop:12},children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:!!i.active,onChange:j=>o({...i,active:j.target.checked})})," Activo"]})}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:10},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:c,children:"✓ Guardar"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{t(null),o({})},children:"Cancelar"})]})]}),e.jsx("div",{className:"table-wrap mt-3",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Página"}),e.jsx("th",{children:"Section"}),e.jsx("th",{children:"Título"}),e.jsx("th",{children:"Items"}),e.jsx("th",{children:"Orden"}),e.jsx("th",{children:"Activo"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:g.map(j=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:j.page})}),e.jsx("td",{children:e.jsx("code",{children:j.section_key})}),e.jsxs("td",{children:[j.emoji," ",j.title]}),e.jsx("td",{children:Array.isArray(j.list_items)?j.list_items.length:0}),e.jsx("td",{children:j.order_idx}),e.jsx("td",{children:j.active?"✅":"⏸"}),e.jsxs("td",{className:"actions-cell",children:[e.jsx("button",{className:"icon-btn",onClick:()=>m(j),children:"✎"}),e.jsx("button",{className:"icon-btn danger",onClick:()=>h(j),children:"🗑"})]})]},j.id))})]})}),e.jsx("style",{children:`
        .edit-area { background: var(--c-azul-100); padding: 14px; border-radius: 12px; }
        .actions-cell { display: flex; gap: 4px; }
        .icon-btn { background: transparent; border: 1px solid var(--c-borde); padding: 4px 8px; border-radius: 6px; cursor: pointer; }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
        .grid-form { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 720px) { .grid-form { grid-template-columns: 1fr; } }
      `})]})}function ee({ctx:s,table:a,entity:l,title:n,columns:t,defaultRow:i,Form:o}){const[r,d]=u.useState([]),[p,v]=u.useState(null),[x,f]=u.useState({}),[m,c]=u.useState(!0);async function h(){c(!0);const{data:b}=await N.from(a).select("*");d(b||[]),c(!1)}u.useEffect(()=>{h()},[a]);function _(){v("new"),f({...i})}function y(b){v(b.id),f({...b})}async function w(){const b=j(x);if(p==="new"){const{data:k,error:C}=await N.from(a).insert(b).select().single();if(C)return alert(C.message);await z({ctx:s,action:"create",entity:l,entity_id:k.id,after_data:k})}else{const k=r.find(E=>E.id===p),{error:C}=await N.from(a).update(b).eq("id",p);if(C)return alert(C.message);await z({ctx:s,action:"update",entity:l,entity_id:p,before_data:k,after_data:b})}v(null),f({}),h()}async function g(b){confirm("¿Eliminar este registro?")&&(await N.from(a).delete().eq("id",b.id),await z({ctx:s,action:"delete",entity:l,entity_id:b.id,before_data:b}),h())}function j(b){const k={...b};for(const C in k)k[C]===""&&(C.endsWith("_at")||C.endsWith("_lat")||C.endsWith("_lng")||C==="capacity"||C==="duration_sec")&&(k[C]=null);return k}return m?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsxs("section",{className:"panel",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8},children:[e.jsxs("h2",{children:[n," (",r.length,")"]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:_,children:"＋ Nuevo"})]}),(p==="new"||p)&&e.jsxs("div",{className:"edit-area mt-3",children:[e.jsx(o,{draft:x,setDraft:f}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:10},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:w,children:"✓ Guardar"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{v(null),f({})},children:"Cancelar"})]})]}),e.jsx("div",{className:"table-wrap mt-3",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[t.map(b=>e.jsx("th",{children:b.label},b.key)),e.jsx("th",{})]})}),e.jsx("tbody",{children:r.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:t.length+1,className:"note text-center",children:"Sin registros aún."})}):r.map(b=>e.jsxs("tr",{children:[t.map(k=>e.jsx("td",{children:k.format?k.format(b[k.key]):b[k.key]??"—"},k.key)),e.jsxs("td",{className:"actions-cell",children:[e.jsx("button",{className:"icon-btn",onClick:()=>y(b),children:"✎"}),e.jsx("button",{className:"icon-btn danger",onClick:()=>g(b),children:"🗑"})]})]},b.id))})]})}),e.jsx("style",{children:`
        .edit-area { background: var(--c-azul-100); padding: 14px; border-radius: 12px; }
        .actions-cell { display: flex; gap: 4px; }
        .icon-btn { background: transparent; border: 1px solid var(--c-borde); padding: 4px 8px; border-radius: 6px; cursor: pointer; }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
      `})]})}const H=24*3600*1e3,_e=["#10243E","#C9A227","#8FB8A0","#D26B53","#B7A8D9","#1A3358","#4FA88E"];function Oa({ctx:s}){var B;const a=((B=s==null?void 0:s.admin)==null?void 0:B.role)==="admin",[l,n]=u.useState([]),[t,i]=u.useState(null),[o,r]=u.useState([]),[d,p]=u.useState(!0),[v,x]=u.useState(""),[f,m]=u.useState("all"),[c,h]=u.useState({key:"engagement_score",dir:"desc"}),[_,y]=u.useState(null),[w,g]=u.useState(!1);async function j(){p(!0);const[S,M,A]=await Promise.all([N.from("view_student_activity").select("*"),N.from("view_anonymous_kpis").select("*").maybeSingle(),N.from("view_faculty_distribution").select("*")]);n(S.data||[]),i(M.data||{}),r(A.data||[]),p(!1)}u.useEffect(()=>{j()},[]);const b=u.useMemo(()=>{const S=Date.now()-30*H;return l.filter(M=>!M.last_activity_at||new Date(M.last_activity_at).getTime()<S).length},[l]),k=u.useMemo(()=>{let S=l;if(v){const A=v.toLowerCase();S=S.filter(I=>I.anonymous_code.toLowerCase().includes(A)||(I.faculty||"").toLowerCase().includes(A)||(I.career||"").toLowerCase().includes(A))}const M=Date.now();return f==="active7"&&(S=S.filter(A=>A.last_activity_at&&new Date(A.last_activity_at).getTime()>M-7*H)),f==="active30"&&(S=S.filter(A=>A.last_activity_at&&new Date(A.last_activity_at).getTime()>M-30*H)),f==="inactive30"&&(S=S.filter(A=>!A.last_activity_at||new Date(A.last_activity_at).getTime()<M-30*H)),f==="flagged"&&(S=S.filter(A=>A.chat_flagged_count>0)),S=[...S].sort((A,I)=>{const F=A[c.key],P=I[c.key];if(F===P)return 0;if(F==null)return 1;if(P==null)return-1;const ce=typeof F=="number"?F-P:String(F).localeCompare(String(P));return c.dir==="asc"?ce:-ce}),S},[l,v,f,c]);function C(S){h(M=>M.key===S?{key:S,dir:M.dir==="asc"?"desc":"asc"}:{key:S,dir:"desc"})}function E(){const S=["anonymous_code","faculty","career","registered_at","last_activity_at","sessions_count","checkins_count","journal_count","achievements_count","routes_completed","trees_adopted","events_rsvped","chat_messages_count","engagement_score"],M=S.join(",")+`
`+k.map(F=>S.map(P=>`"${String(F[P]??"").replace(/"/g,'""')}"`).join(",")).join(`
`),A=new Blob([M],{type:"text/csv;charset=utf-8"}),I=document.createElement("a");I.href=URL.createObjectURL(A),I.download=`usuarios-anonimos-${new Date().toISOString().slice(0,10)}.csv`,I.click()}async function L(S){if(!a)return alert("Solo el rol Administrador puede borrar usuarios.");if(confirm(`⚠ ELIMINAR ${S}

Esta acción borra DEFINITIVAMENTE:
· Su perfil anónimo
· Todas sus evaluaciones, respuestas y resultados
· Todos sus check-ins y entradas de diario
· Sus rutas de bienestar y logros
· Sus chats con Pum-AI y conversaciones de buddy
· Adopciones de árboles, RSVPs y progreso de aventuras

Esta acción quedará registrada en auditoría. ¿Confirmar?`)){g(!0);try{const{data:A,error:I}=await N.functions.invoke("admin-delete-anonymous",{body:{anonymous_code:S}});if(I||A!=null&&A.error)throw new Error((A==null?void 0:A.error)||I.message);alert(`✓ Usuario ${S} eliminado.
`+Object.entries(A.counts||{}).map(([F,P])=>`${P} ${F}`).join(`
`)),y(null),j()}catch(A){alert("Error: "+A.message)}finally{g(!1)}}}return d?e.jsx("div",{className:"spinner",style:{margin:"80px auto"}}):e.jsxs(e.Fragment,{children:[e.jsxs("header",{className:"page-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Comunidad anónima"}),e.jsx("h1",{className:"mt-2",children:"Usuarios anónimos"}),e.jsx("p",{className:"lede",children:"Quiénes están usando AURA. Sin nombres ni identificadores personales — solo códigos y métricas."})]}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:E,children:"⬇ Exportar CSV"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsx(D,{icon:"👥",label:"Total registrados",value:(t==null?void 0:t.total_registered)??0,accent:"azul"}),e.jsx(D,{icon:"🌿",label:"Activos esta semana",value:(t==null?void 0:t.active_7d)??0,sub:`${Ne(t==null?void 0:t.active_7d,t==null?void 0:t.total_registered)}% del total`,accent:"sage"}),e.jsx(D,{icon:"📅",label:"Activos último mes",value:(t==null?void 0:t.active_30d)??0,sub:`${Ne(t==null?void 0:t.active_30d,t==null?void 0:t.total_registered)}% del total`,accent:"gold"}),e.jsx(D,{icon:"⏰",label:"Inactivos +1 mes",value:b,sub:"Sin actividad reciente",accent:"coral",actionLabel:b>0?"Filtrar →":null,onAction:()=>m("inactive30")}),e.jsx(D,{icon:"🔐",label:"Con contraseña",value:(t==null?void 0:t.with_password)??0,sub:"Pueden volver con su clave"}),e.jsx(D,{icon:"📝",label:"Check-ins totales",value:(t==null?void 0:t.total_checkins)??0}),e.jsx(D,{icon:"📔",label:"Diario",value:(t==null?void 0:t.total_journal_entries)??0,sub:"Entradas escritas"}),e.jsx(D,{icon:"🌳",label:"Árboles adoptados",value:(t==null?void 0:t.total_tree_adoptions)??0,accent:"sage"})]}),o.length>0&&e.jsxs("section",{className:"panel mt-3",children:[e.jsx("h2",{children:"Distribución por facultad"}),e.jsx("div",{className:"faculty-grid",children:o.slice(0,8).map((S,M)=>e.jsx(Ua,{f:S,color:_e[M%_e.length],total:(t==null?void 0:t.total_registered)||1},S.faculty))})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsxs("div",{className:"filter-row",children:[e.jsx("input",{className:"search",placeholder:"🔍 Buscar código, facultad, carrera…",value:v,onChange:S=>x(S.target.value)}),e.jsx("div",{className:"chips",children:[{id:"all",label:`Todos (${l.length})`},{id:"active7",label:"Activos 7d"},{id:"active30",label:"Activos 30d"},{id:"inactive30",label:`💤 Inactivos +1mes (${b})`,accent:"coral"},{id:"flagged",label:"⚠ Flaggeados"}].map(S=>e.jsx("button",{className:`chip ${f===S.id?"active":""} ${S.accent||""}`,onClick:()=>m(S.id),children:S.label},S.id))}),e.jsxs("small",{className:"note",children:["Mostrando ",e.jsx("strong",{children:k.length})," de ",l.length]})]}),e.jsx("div",{className:"table-wrap mt-3",style:{maxHeight:600,overflowY:"auto"},children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx(T,{k:"anonymous_code",sortBy:c,onSort:C,children:"Código"})}),e.jsx("th",{children:e.jsx(T,{k:"faculty",sortBy:c,onSort:C,children:"Facultad"})}),e.jsx("th",{children:e.jsx(T,{k:"sessions_count",sortBy:c,onSort:C,children:"Tests"})}),e.jsx("th",{children:e.jsx(T,{k:"checkins_count",sortBy:c,onSort:C,children:"Check-ins"})}),e.jsx("th",{children:e.jsx(T,{k:"journal_count",sortBy:c,onSort:C,children:"Diario"})}),e.jsx("th",{children:e.jsx(T,{k:"routes_completed",sortBy:c,onSort:C,children:"Rutas ✓"})}),e.jsx("th",{children:e.jsx(T,{k:"chat_messages_count",sortBy:c,onSort:C,children:"💬"})}),e.jsx("th",{children:e.jsx(T,{k:"engagement_score",sortBy:c,onSort:C,children:"Score"})}),e.jsx("th",{children:e.jsx(T,{k:"last_activity_at",sortBy:c,onSort:C,children:"Última actividad"})}),e.jsx("th",{})]})}),e.jsxs("tbody",{children:[k.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:10,className:"note text-center",children:"Sin usuarios con esos filtros."})}),k.map(S=>{const M=!S.last_activity_at||Date.now()-new Date(S.last_activity_at).getTime()>30*H;return e.jsxs("tr",{className:M?"row-inactive":"",children:[e.jsxs("td",{children:[e.jsx("code",{style:{cursor:"pointer"},onClick:()=>y(S),children:S.anonymous_code}),M&&e.jsx("span",{title:"Inactivo +1mes",style:{marginLeft:6,fontSize:"0.8rem"},children:"💤"})]}),e.jsx("td",{children:e.jsx("small",{children:S.faculty||"—"})}),e.jsx("td",{children:S.sessions_count}),e.jsx("td",{children:S.checkins_count}),e.jsx("td",{children:S.journal_count}),e.jsx("td",{children:S.routes_completed}),e.jsxs("td",{children:[S.chat_messages_count,S.chat_flagged_count>0&&e.jsx("span",{title:"Flaggeado",style:{color:"#93362A",marginLeft:4},children:"⚠"})]}),e.jsx("td",{children:e.jsx("strong",{style:{color:S.engagement_score>50?"var(--c-salvia-600)":S.engagement_score>10?"var(--c-azul-800)":"var(--c-gris)"},children:S.engagement_score})}),e.jsx("td",{children:e.jsx("small",{children:S.last_activity_at?new Date(S.last_activity_at).toLocaleString("es-MX",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit"}):"—"})}),e.jsxs("td",{className:"row-actions",children:[e.jsx("button",{className:"icon-btn",onClick:()=>y(S),title:"Ver detalle",children:"👁"}),a&&e.jsx("button",{className:"icon-btn danger",onClick:()=>L(S.anonymous_code),disabled:w,title:"Eliminar usuario",children:"🗑"})]})]},S.anonymous_code)})]})]})})]}),_&&e.jsx(Xa,{user:_,isFullAdmin:a,onClose:()=>y(null),onDelete:()=>L(_.anonymous_code),busy:w}),e.jsx("style",{children:`
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          margin-bottom: 14px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          position: relative;
          transition: transform .2s, box-shadow .2s;
        }
        .stat-card.has-action { cursor: pointer; }
        .stat-card.has-action:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }
        .stat-card .icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--c-azul-100);
          display: grid; place-items: center;
          font-size: 1.4rem;
          margin-bottom: 8px;
        }
        .stat-card.azul   .icon { background: var(--c-azul-100);   }
        .stat-card.sage   .icon { background: var(--c-salvia-100); }
        .stat-card.gold   .icon { background: var(--c-oro-100);    }
        .stat-card.coral  .icon { background: var(--c-coral-100);  }
        .stat-card .label {
          font-size: 0.84rem;
          color: var(--c-gris);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-card .value {
          font-family: var(--ff-serif);
          font-size: 2.2rem;
          color: var(--c-azul-800);
          font-weight: 800;
          line-height: 1;
        }
        .stat-card .sub { font-size: 0.82rem; color: var(--c-texto-soft); margin-top: 6px; }
        .stat-card .action {
          margin-top: 10px;
          background: transparent;
          border: 1px solid var(--c-coral-500);
          color: #93362A;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }
        .stat-card .action:hover { background: var(--c-coral-100); }

        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }
        .faculty-card {
          background: var(--c-marfil);
          border-radius: var(--r-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .faculty-card .fc-bar {
          height: 8px;
          border-radius: 4px;
          background: rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .faculty-card .fc-bar > span { display: block; height: 100%; border-radius: 4px; transition: width 0.6s; }
        .faculty-card .fc-stats { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--c-gris); }
        .faculty-card .fc-stats strong { color: var(--c-azul-800); }
        .faculty-card .fc-name { font-weight: 700; color: var(--c-azul-800); font-size: 0.9rem; }

        .filter-row {
          display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
        }
        .search {
          flex: 1; min-width: 240px;
          padding: 9px 14px;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.92rem;
        }
        .chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 6px 12px;
          font-size: 0.82rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .chip.coral.active { background: var(--c-coral-500); border-color: var(--c-coral-500); }

        .row-inactive { background: rgba(214, 59, 57, 0.04); }
        .row-actions { display: flex; gap: 4px; white-space: nowrap; }
        .icon-btn {
          background: transparent;
          border: 1px solid var(--c-borde);
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
        .icon-btn.danger:hover { background: var(--c-coral-100); }
        .icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `})]})}function Ne(s,a){return a?Math.round(s/a*100):0}function D({icon:s,label:a,value:l,sub:n,accent:t,actionLabel:i,onAction:o}){const r=`stat-card ${t||""} ${o?"has-action":""}`;return e.jsxs("div",{className:r,onClick:o||(()=>{}),children:[e.jsx("div",{className:"icon",children:s}),e.jsx("div",{className:"label",children:a}),e.jsx("div",{className:"value",children:l}),n&&e.jsx("div",{className:"sub",children:n}),i&&e.jsx("button",{className:"action",onClick:d=>{d.stopPropagation(),o==null||o()},children:i})]})}function Ua({f:s,color:a,total:l}){const n=l?Math.round(s.total/l*100):0;return e.jsxs("div",{className:"faculty-card",style:{borderLeft:`3px solid ${a}`},children:[e.jsx("div",{className:"fc-name",children:s.faculty}),e.jsx("div",{className:"fc-bar",children:e.jsx("span",{style:{width:`${n}%`,background:a}})}),e.jsxs("div",{className:"fc-stats",children:[e.jsxs("span",{children:[e.jsx("strong",{children:s.total})," registrados"]}),e.jsxs("span",{children:[s.active_7d," activos 7d"]})]})]})}function T({k:s,sortBy:a,onSort:l,children:n}){const t=a.key===s,i=t?a.dir==="asc"?"▲":"▼":"↕";return e.jsxs("button",{type:"button",onClick:()=>l(s),style:{background:"transparent",border:0,cursor:"pointer",font:"inherit",color:"inherit",padding:0,display:"inline-flex",gap:4,opacity:t?1:.7},children:[n," ",e.jsx("span",{style:{fontSize:"0.7em"},children:i})]})}function Xa({user:s,onClose:a,onDelete:l,busy:n,isFullAdmin:t}){const[i,o]=u.useState({loading:!0});return u.useEffect(()=>{(async()=>{var h;const r=s.anonymous_code,[d,p,v,x,f,m,c]=await Promise.all([N.from("assessment_sessions").select("id, total_score, general_level, dimension_scores, top_attention_areas, created_at").eq("anonymous_code",r).order("created_at",{ascending:!1}),N.from("weekly_checkins").select("mood, energy, stress, social, free_text, week_iso, created_at").eq("anonymous_code",r).order("created_at",{ascending:!1}),N.from("student_journal").select("entry, emotion_tag, created_at").eq("anonymous_code",r).order("created_at",{ascending:!1}).limit(20),N.from("student_achievements").select("achievement_key, awarded_at").eq("anonymous_code",r),N.from("wellness_routes").select("id, duration_days, started_at, completed_at, plan").eq("anonymous_code",r),N.from("chat_sessions").select("id, message_count, flagged, flag_reason, created_at, last_at").eq("anonymous_code",r),N.from("session_notes").select("admin_name, note, created_at").in("session_id",((h=(await N.from("assessment_sessions").select("id").eq("anonymous_code",r)).data)==null?void 0:h.map(_=>_.id))||[])]);o({loading:!1,sessions:d.data||[],checkins:p.data||[],journal:v.data||[],achievements:x.data||[],routes:f.data||[],chats:m.data||[],notes:c.data||[]})})()},[s.anonymous_code]),e.jsxs("div",{className:"overlay",onClick:a,children:[e.jsxs("div",{className:"modal",onClick:r=>r.stopPropagation(),children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsxs("h2",{children:["👤 ",e.jsx("code",{children:s.anonymous_code})]}),e.jsxs("small",{children:[s.faculty||"Sin facultad"," · Registrado: ",s.registered_at?new Date(s.registered_at).toLocaleDateString("es-MX"):"—"]})]}),e.jsx("button",{onClick:a,children:"✕"})]}),i.loading?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"quick-kpis",children:[e.jsxs("span",{children:[e.jsx("strong",{children:i.sessions.length})," tests"]}),e.jsxs("span",{children:[e.jsx("strong",{children:i.checkins.length})," check-ins"]}),e.jsxs("span",{children:[e.jsx("strong",{children:i.journal.length})," diario"]}),e.jsxs("span",{children:[e.jsx("strong",{children:i.achievements.length})," logros"]}),e.jsxs("span",{children:[e.jsxs("strong",{children:[i.routes.filter(r=>r.completed_at).length,"/",i.routes.length]})," rutas"]}),e.jsxs("span",{children:[e.jsx("strong",{children:i.chats.length})," chats"]})]}),e.jsx("h3",{children:"📊 Tests realizados"}),i.sessions.length===0?e.jsx("p",{className:"note",children:"Sin tests."}):e.jsx("ul",{className:"detail-list",children:i.sessions.map(r=>e.jsxs("li",{children:[e.jsxs("strong",{children:[r.total_score,"/100"]})," ",e.jsx("span",{className:`lvl-bg-${r.general_level}`,style:{padding:"2px 8px",borderRadius:6,fontSize:"0.78rem"},children:r.general_level}),e.jsx("small",{children:new Date(r.created_at).toLocaleString("es-MX")})]},r.id))}),e.jsx("h3",{children:"📝 Check-ins"}),i.checkins.length===0?e.jsx("p",{className:"note",children:"Sin check-ins."}):e.jsx("ul",{className:"detail-list",children:i.checkins.slice(0,8).map((r,d)=>e.jsxs("li",{children:["Ánimo ",r.mood,"/5 · Energía ",r.energy,"/5 · Estrés ",r.stress,"/5 · Social ",r.social,"/5",e.jsxs("small",{children:[r.week_iso," · ",new Date(r.created_at).toLocaleDateString("es-MX")]}),r.free_text&&e.jsxs("em",{style:{display:"block",marginTop:4},children:['"',r.free_text,'"']})]},d))}),e.jsx("h3",{children:"📔 Diario"}),i.journal.length===0?e.jsx("p",{className:"note",children:"Sin entradas."}):e.jsx("ul",{className:"detail-list",children:i.journal.slice(0,8).map((r,d)=>e.jsxs("li",{children:[e.jsxs("em",{children:['"',r.entry,'"']}),e.jsxs("small",{children:[r.emotion_tag||"—"," · ",new Date(r.created_at).toLocaleDateString("es-MX")]})]},d))}),i.achievements.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("h3",{children:["🏆 Logros (",i.achievements.length,")"]}),e.jsx("div",{className:"achievements-list",children:i.achievements.map((r,d)=>e.jsxs("span",{className:"achievement",children:["🏆 ",r.achievement_key]},d))})]}),i.chats.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"💬 Chat con Pum-AI"}),e.jsx("ul",{className:"detail-list",children:i.chats.map(r=>e.jsxs("li",{children:[e.jsx("strong",{children:r.message_count})," mensajes",r.flagged&&e.jsxs("span",{style:{color:"#93362A",marginLeft:6},children:["⚠ ",r.flag_reason]}),e.jsx("small",{children:new Date(r.created_at).toLocaleString("es-MX")})]},r.id))})]}),i.notes.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"🗒 Notas del equipo"}),e.jsx("ul",{className:"detail-list",children:i.notes.map((r,d)=>e.jsxs("li",{children:[e.jsx("strong",{children:r.admin_name||"Anónimo"}),e.jsx("small",{children:new Date(r.created_at).toLocaleString("es-MX")}),e.jsx("p",{style:{margin:"4px 0 0"},children:r.note})]},d))})]}),t&&e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"btn btn-coral",onClick:l,disabled:n,children:n?"Borrando…":"🗑 Eliminar usuario y todos sus datos"}),e.jsx("small",{className:"note",children:"Esta acción es irreversible. Quedará registrada en auditoría."})]})]})]}),e.jsx("style",{children:`
        .overlay { position: fixed; inset: 0; background: rgba(10,25,41,0.55); z-index: 100; display: grid; place-items: center; padding: 16px; }
        .modal { background: #fff; border-radius: var(--r-xl); padding: 24px; max-width: 760px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .modal header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .modal header h2 { margin: 0; font-size: 1.4rem; }
        .modal header small { color: var(--c-gris); font-size: 0.84rem; }
        .modal header button { background: transparent; border: 0; cursor: pointer; font-size: 1.4rem; color: var(--c-gris); }
        .modal h3 { color: var(--c-azul-800); margin: 18px 0 8px; font-size: 1.05rem; }

        .quick-kpis { display: flex; gap: 14px; flex-wrap: wrap; padding: 12px 16px; background: var(--c-azul-100); border-radius: 12px; margin-bottom: 6px; }
        .quick-kpis span { font-size: 0.92rem; }
        .quick-kpis strong { color: var(--c-azul-800); font-family: var(--ff-serif); font-size: 1.1rem; }

        .detail-list { list-style: none; padding: 0; display: grid; gap: 6px; }
        .detail-list li {
          background: var(--c-marfil); border: 1px solid var(--c-borde-soft);
          padding: 8px 12px; border-radius: 8px;
          font-size: 0.92rem;
        }
        .detail-list small { color: var(--c-gris); font-size: 0.78rem; display:block; margin-top: 2px; }

        .achievements-list { display: flex; gap: 6px; flex-wrap: wrap; }
        .achievement { background: var(--c-oro-100); color: #7B5E14; padding: 4px 10px; border-radius: 999px; font-size: 0.84rem; font-weight: 700; }

        .modal-actions {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--c-borde-soft);
          display: flex; flex-direction: column; gap: 6px;
          align-items: flex-start;
        }
      `})]})}const we={low:{bg:"var(--c-mint-100)",fg:"var(--c-mint-700)"},medium:{bg:"var(--c-oro-100)",fg:"var(--c-oro-700)"},high:{bg:"var(--c-peach-100)",fg:"var(--c-peach-700)"},critical:{bg:"var(--c-coral-100)",fg:"var(--c-coral-700)"}},ke={honeypot:"Honeypot",prompt_injection:"Inyección de prompt",rate_limit:"Rate limit",rls_violation:"Violación RLS",auth_failure:"Auth fallida",abuse_detected:"Abuso",pii_detected:"PII detectada",crisis_signal:"Señal crisis",quota_exceeded:"Quota excedida",suspicious_pattern:"Patrón sospechoso"};function Wa(){const[s,a]=u.useState([]),[l,n]=u.useState(!0),[t,i]=u.useState("all"),[o,r]=u.useState("all"),[d,p]=u.useState("24h"),[v,x]=u.useState({total:0,by_severity:{},by_category:{}});async function f(){n(!0);let m=N.from("security_events").select("*");const c=new Date(Date.now()-(d==="24h"?24:d==="7d"?168:720)*3600*1e3).toISOString();m=m.gte("created_at",c),t!=="all"&&(m=m.eq("severity",t)),o!=="all"&&(m=m.eq("category",o)),m=m.order("created_at",{ascending:!1}).limit(200);const{data:h}=await m;a(h||[]);const _={},y={};for(const w of h||[])_[w.severity]=(_[w.severity]||0)+1,y[w.category]=(y[w.category]||0)+1;x({total:(h==null?void 0:h.length)||0,by_severity:_,by_category:y}),n(!1)}return u.useEffect(()=>{f()},[t,o,d]),e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag coral",children:"Seguridad"}),e.jsx("h1",{className:"mt-2",children:"Eventos de seguridad"}),e.jsx("p",{className:"lede",children:"Honeypots, intentos de inyección, brute force, violaciones RLS y otros incidentes registrados por las defensas de AURA. Datos hasheados — sin PII."})]})}),e.jsxs("div",{className:"sec-filters",children:[e.jsxs("div",{className:"sec-filter-group",children:[e.jsx("label",{children:"Rango"}),e.jsxs("select",{value:d,onChange:m=>p(m.target.value),children:[e.jsx("option",{value:"24h",children:"Últimas 24h"}),e.jsx("option",{value:"7d",children:"Últimos 7 días"}),e.jsx("option",{value:"30d",children:"Últimos 30 días"})]})]}),e.jsxs("div",{className:"sec-filter-group",children:[e.jsx("label",{children:"Severidad"}),e.jsxs("select",{value:t,onChange:m=>i(m.target.value),children:[e.jsx("option",{value:"all",children:"Todas"}),e.jsx("option",{value:"critical",children:"Crítica"}),e.jsx("option",{value:"high",children:"Alta"}),e.jsx("option",{value:"medium",children:"Media"}),e.jsx("option",{value:"low",children:"Baja"})]})]}),e.jsxs("div",{className:"sec-filter-group",children:[e.jsx("label",{children:"Categoría"}),e.jsxs("select",{value:o,onChange:m=>r(m.target.value),children:[e.jsx("option",{value:"all",children:"Todas"}),Object.entries(ke).map(([m,c])=>e.jsx("option",{value:m,children:c},m))]})]}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:f,children:"Actualizar"})]}),e.jsxs("div",{className:"sec-stats mt-3",children:[e.jsxs("div",{className:"sec-stat",children:[e.jsx("div",{className:"sec-stat-num",children:v.total}),e.jsx("div",{className:"sec-stat-lbl",children:"Eventos"})]}),e.jsxs("div",{className:"sec-stat sec-coral",children:[e.jsx("div",{className:"sec-stat-num",children:v.by_severity.critical||0}),e.jsx("div",{className:"sec-stat-lbl",children:"Críticos"})]}),e.jsxs("div",{className:"sec-stat sec-peach",children:[e.jsx("div",{className:"sec-stat-num",children:v.by_severity.high||0}),e.jsx("div",{className:"sec-stat-lbl",children:"Altos"})]}),e.jsxs("div",{className:"sec-stat sec-oro",children:[e.jsx("div",{className:"sec-stat-num",children:v.by_severity.medium||0}),e.jsx("div",{className:"sec-stat-lbl",children:"Medios"})]}),e.jsxs("div",{className:"sec-stat sec-mint",children:[e.jsx("div",{className:"sec-stat-num",children:v.by_severity.low||0}),e.jsx("div",{className:"sec-stat-lbl",children:"Bajos"})]})]}),e.jsx("section",{className:"panel mt-4",children:l?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):s.length===0?e.jsx("p",{className:"note text-center",children:"Sin eventos para este filtro. 🟢"}):e.jsx("div",{className:"table-wrap",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Cuándo"}),e.jsx("th",{children:"Sev"}),e.jsx("th",{children:"Categoría"}),e.jsx("th",{children:"Fuente"}),e.jsx("th",{children:"IP (prefix)"}),e.jsx("th",{children:"Scope"}),e.jsx("th",{children:"Detalle"})]})}),e.jsx("tbody",{children:s.map(m=>{var h;const c=we[m.severity]||we.low;return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("small",{style:{whiteSpace:"nowrap"},children:new Date(m.created_at).toLocaleString("es-MX",{hour12:!1})})}),e.jsx("td",{children:e.jsx("span",{className:"sev-pill",style:{background:c.bg,color:c.fg},children:m.severity})}),e.jsx("td",{children:ke[m.category]||m.category}),e.jsx("td",{children:e.jsx("code",{style:{fontSize:"0.74rem"},children:m.source})}),e.jsx("td",{children:e.jsx("small",{children:m.ip_prefix||"—"})}),e.jsx("td",{children:e.jsx("small",{children:m.scope?`${m.scope}=${(h=m.scope_value)==null?void 0:h.slice(0,12)}…`:"—"})}),e.jsx("td",{children:e.jsxs("details",{children:[e.jsx("summary",{style:{cursor:"pointer",fontSize:"0.84rem"},children:"Ver"}),e.jsx("pre",{style:{fontSize:"0.72rem",maxWidth:300,overflow:"auto",margin:"4px 0 0",background:"var(--c-marfil)",padding:"8px",borderRadius:6},children:JSON.stringify(m.detail||{},null,2).slice(0,600)})]})})]},m.id)})})]})})}),e.jsx("style",{children:`
        .sec-filters {
          display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;
          margin-top: 12px;
        }
        .sec-filter-group { display: flex; flex-direction: column; gap: 4px; }
        .sec-filter-group label { font-size: 0.74rem; color: var(--c-gris); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .sec-filter-group select { padding: 8px 12px; border: 1px solid var(--c-borde); border-radius: 8px; background: white; }

        .sec-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        @media (max-width: 720px) { .sec-stats { grid-template-columns: repeat(2, 1fr); } }
        .sec-stat {
          padding: 14px 18px; border-radius: 14px;
          background: var(--c-azul-100); border: 1px solid var(--c-borde-soft);
          text-align: center;
        }
        .sec-stat-num { font-family: var(--ff-serif); font-size: 1.8rem; font-weight: 800; color: var(--c-azul-800); }
        .sec-stat-lbl { font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--c-gris); }
        .sec-coral  { background: var(--c-coral-100); border-color: rgba(232,130,107,0.30); }
        .sec-coral  .sec-stat-num { color: var(--c-coral-700); }
        .sec-peach  { background: var(--c-peach-100); border-color: rgba(255,154,123,0.30); }
        .sec-peach  .sec-stat-num { color: var(--c-peach-700); }
        .sec-oro    { background: var(--c-oro-100);   border-color: rgba(201,162,39,0.30); }
        .sec-oro    .sec-stat-num { color: var(--c-oro-700); }
        .sec-mint   { background: var(--c-mint-100);  border-color: rgba(125,196,174,0.40); }
        .sec-mint   .sec-stat-num { color: var(--c-mint-700); }

        .sev-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      `})]})}const Ga={chat_companion:"Companion",buddy_ai:"Buddy IA",journal_suggest:"Diario sugerencias",orientation:"Orientación post-test",wellness_route:"Ruta de bienestar"},Ha={chat_companion:"var(--c-azul-800)",buddy_ai:"var(--c-lavanda-600)",journal_suggest:"var(--c-peach-600)",orientation:"var(--c-mint-600)",wellness_route:"var(--c-oro-600)"};function Va(){const[s,a]=u.useState("7d"),[l,n]=u.useState(!0),[t,i]=u.useState({total:0,calls:0,tokens_in:0,tokens_out:0,by_feature:[],by_day:[]});async function o(){n(!0);const d=s==="24h"?24:s==="7d"?168:720,p=new Date(Date.now()-d*3600*1e3).toISOString(),{data:v}=await N.from("pumai_usage").select("feature, tokens_in, tokens_out, cost_usd_est, ok, created_at").gte("created_at",p).limit(5e3);let x=0,f=0,m=0,c=0;const h={},_={};for(const y of v||[]){f++,m+=Number(y.tokens_in)||0,c+=Number(y.tokens_out)||0,x+=Number(y.cost_usd_est)||0;const w=y.feature||"unknown";h[w]=h[w]||{feature:w,calls:0,tokens_in:0,tokens_out:0,cost:0},h[w].calls++,h[w].tokens_in+=Number(y.tokens_in)||0,h[w].tokens_out+=Number(y.tokens_out)||0,h[w].cost+=Number(y.cost_usd_est)||0;const g=String(y.created_at).slice(0,10);_[g]=_[g]||{day:g,calls:0,cost:0},_[g].calls++,_[g].cost+=Number(y.cost_usd_est)||0}i({total:x,calls:f,tokens_in:m,tokens_out:c,by_feature:Object.values(h).sort((y,w)=>w.cost-y.cost),by_day:Object.values(_).sort((y,w)=>y.day.localeCompare(w.day))}),n(!1)}u.useEffect(()=>{o()},[s]);const r=Math.max(1e-4,...t.by_day.map(d=>d.cost));return e.jsxs(e.Fragment,{children:[e.jsxs("header",{className:"page-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"tag oro",children:"Pum-AI"}),e.jsx("h1",{className:"mt-2",children:"Costos y uso de IA"}),e.jsxs("p",{className:"lede",children:["Cuánto se ha usado Pum-AI por feature y día. Cuotas activas: ver sección Operación. Los datos se calculan client-side desde ",e.jsx("code",{children:"pumai_usage"}),"."]})]}),e.jsx("div",{children:e.jsxs("select",{value:s,onChange:d=>a(d.target.value),style:{padding:"8px 12px",borderRadius:8,border:"1px solid var(--c-borde)"},children:[e.jsx("option",{value:"24h",children:"Últimas 24h"}),e.jsx("option",{value:"7d",children:"Últimos 7 días"}),e.jsx("option",{value:"30d",children:"Últimos 30 días"})]})})]}),e.jsxs("div",{className:"aicost-kpis mt-3",children:[e.jsxs("div",{className:"aic-card",children:[e.jsx("div",{className:"aic-num",children:e.jsx(ae,{to:t.calls,duration:900})}),e.jsx("div",{className:"aic-lbl",children:"Llamadas"})]}),e.jsxs("div",{className:"aic-card",children:[e.jsxs("div",{className:"aic-num",children:[e.jsx(ae,{to:Math.round(t.tokens_in/1e3),duration:900}),"k"]}),e.jsx("div",{className:"aic-lbl",children:"Tokens entrada"})]}),e.jsxs("div",{className:"aic-card",children:[e.jsxs("div",{className:"aic-num",children:[e.jsx(ae,{to:Math.round(t.tokens_out/1e3),duration:900}),"k"]}),e.jsx("div",{className:"aic-lbl",children:"Tokens salida"})]}),e.jsxs("div",{className:"aic-card aic-highlight",children:[e.jsxs("div",{className:"aic-num",children:["$",t.total.toFixed(4)]}),e.jsx("div",{className:"aic-lbl",children:"Costo estimado USD"})]})]}),e.jsxs("section",{className:"panel mt-4",children:[e.jsx("h2",{children:"Uso por feature"}),l?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):t.by_feature.length===0?e.jsx("p",{className:"note text-center",children:"Sin datos."}):e.jsx("div",{className:"table-wrap mt-2",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Feature"}),e.jsx("th",{children:"Llamadas"}),e.jsx("th",{children:"Tokens in"}),e.jsx("th",{children:"Tokens out"}),e.jsx("th",{children:"Costo USD est."})]})}),e.jsx("tbody",{children:t.by_feature.map(d=>e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:Ha[d.feature],marginRight:8}}),Ga[d.feature]||d.feature]}),e.jsx("td",{children:e.jsx("strong",{children:d.calls})}),e.jsx("td",{children:d.tokens_in.toLocaleString()}),e.jsx("td",{children:d.tokens_out.toLocaleString()}),e.jsx("td",{children:e.jsxs("strong",{children:["$",d.cost.toFixed(4)]})})]},d.feature))})]})})]}),e.jsxs("section",{className:"panel mt-4",children:[e.jsx("h2",{children:"Costo por día"}),e.jsx("div",{className:"day-bars",children:t.by_day.map(d=>{const p=Math.max(2,d.cost/r*100);return e.jsxs("div",{className:"day-bar",title:`${d.day}: ${d.calls} calls, $${d.cost.toFixed(4)}`,children:[e.jsx("div",{className:"day-bar-fill",style:{height:`${p}%`}}),e.jsx("small",{children:d.day.slice(5)})]},d.day)})})]}),e.jsx("style",{children:`
        .aicost-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        @media (max-width: 720px) { .aicost-kpis { grid-template-columns: repeat(2, 1fr); } }
        .aic-card {
          padding: 16px 18px; border-radius: 14px;
          background: var(--c-azul-100); border: 1px solid var(--c-borde-soft);
          text-align: center;
        }
        .aic-num { font-family: var(--ff-serif); font-size: 1.9rem; font-weight: 800; color: var(--c-azul-800); }
        .aic-lbl { font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--c-gris); margin-top: 2px; }
        .aic-highlight { background: linear-gradient(135deg, var(--c-oro-100), var(--c-peach-100)); border-color: var(--c-oro-600); }
        .aic-highlight .aic-num { color: var(--c-oro-700); }

        .day-bars { display: flex; gap: 6px; align-items: flex-end; height: 200px; margin-top: 16px; padding: 8px; }
        .day-bar { flex: 1; min-width: 32px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; gap: 4px; }
        .day-bar-fill {
          width: 100%; min-height: 2px;
          background: linear-gradient(180deg, var(--c-oro-600), var(--c-peach-600));
          border-radius: 6px 6px 0 0;
          transition: height 0.6s cubic-bezier(.2,.7,.2,1);
        }
        .day-bar small { font-size: 0.68rem; color: var(--c-gris); }
      `})]})}function Se(){const[s,a]=u.useState([]),[l,n]=u.useState([]),[t,i]=u.useState(!0);return u.useEffect(()=>{Promise.all([N.from("content_blocks").select("*").eq("page","teachers").eq("active",!0).order("order_idx"),N.from("student_library").select("*").eq("category","teachers_kit").eq("active",!0).order("title")]).then(([o,r])=>{a(o.data||[]),n(r.data||[]),i(!1)})},[]),e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:840},children:[e.jsxs("header",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag azul",children:"Para docentes y tutores"}),e.jsx("h1",{className:"mt-2",children:"Kit pedagógico de bienestar"}),e.jsx("p",{className:"lede",children:"Recursos para acompañar a estudiantes desde tu rol docente. Orientaciones, dinámicas de integración, señales generales (no diagnósticas) y rutas de canalización dentro de la UNAM."})]}),t?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsx("div",{className:"kit-grid mt-4",children:s.length===0?e.jsx("p",{className:"note text-center",style:{gridColumn:"1/-1"},children:"Aún no hay bloques de contenido configurados. La coordinación los está agregando."}):s.map(o=>e.jsxs("article",{className:"kit-section",children:[e.jsxs("h2",{children:[o.emoji," ",o.title]}),o.body&&e.jsx("p",{className:"note",children:o.body}),Array.isArray(o.list_items)&&o.list_items.length>0&&e.jsx("ul",{style:{lineHeight:1.7},children:o.list_items.map((r,d)=>e.jsx("li",{dangerouslySetInnerHTML:{__html:Ya(r)}},d))})]},o.id))}),l.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-center mt-4",children:"📚 Material complementario"}),e.jsx("div",{className:"kit-grid mt-2",children:l.map(o=>e.jsxs("article",{className:"kit-section",children:[e.jsx("h3",{children:o.title}),o.body&&e.jsx("p",{children:o.body}),o.media_url&&e.jsx("a",{href:o.media_url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Ver recurso →"})]},o.id))})]}),e.jsxs(qe,{variant:"gold",children:["Este material es ",e.jsx("strong",{children:"educativo"}),", no clínico. Tu rol como docente es acompañar y canalizar, no diagnosticar ni intervenir clínicamente. Si tú mismo necesitas apoyo, también puedes acudir a ",e.jsx(Fe,{to:"/apoyo",children:"los servicios universitarios"}),"."]})]}),e.jsx("style",{children:`
        .kit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 14px;
        }
        .kit-section {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 22px 26px;
        }
        .kit-section h2, .kit-section h3 {
          color: var(--c-azul-800);
          margin: 0 0 8px;
        }
        .kit-section h2 { font-size: 1.15rem; }
        .kit-section ol, .kit-section ul {
          padding-left: 20px;
        }
        .kit-section p { color: var(--c-texto-soft); }
        .kit-section ul li strong { color: var(--c-azul-800); }
      `})]})}function Ya(s){return s?String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/`(.+?)`/g,"<code>$1</code>"):""}function q({ctx:s,permission:a,role:l,children:n}){var i;const t=(i=s==null?void 0:s.admin)==null?void 0:i.role;return t?l&&t!==l?e.jsx(Ce,{role:t}):a&&!Y(t,a)?e.jsx(Ce,{role:t}):n:e.jsx(Ae,{to:"/admin/login",replace:!0})}function Ce({role:s}){return e.jsx("section",{className:"section",children:e.jsx("div",{className:"container text-center",style:{maxWidth:520},children:e.jsxs("div",{className:"panel",children:[e.jsx("h1",{children:"🔒 Acceso restringido"}),e.jsxs("p",{className:"lede",children:["Tu rol ",e.jsx("strong",{children:s})," no tiene permiso para ver esta sección."]}),e.jsx("p",{className:"note",children:"Si crees que esto es un error, contacta a la coordinación del programa."}),e.jsx("a",{href:"/aura-fesi/admin",className:"btn btn-primary",children:"← Volver al panel"})]})})})}function is(){const s=Te(),[a,l]=u.useState(null),[n,t]=u.useState(!0);if(u.useEffect(()=>{(async()=>{const o=await de().catch(()=>null);if(!o){s("/admin/login",{replace:!0});return}l(o),t(!1)})()},[s]),n)return e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container text-center",children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto 18px"}}),e.jsx("p",{className:"lede",children:"Verificando sesión…"})]})});if(!a)return null;async function i(){const o=await de().catch(()=>null);o&&l(o)}return e.jsxs("div",{className:"admin-shell",children:[e.jsx(Ye,{ctx:a}),e.jsx("main",{className:"admin-main",children:e.jsxs(De,{children:[e.jsx(R,{index:!0,element:a.admin.role==="docente"?e.jsx(Se,{}):e.jsx(Ja,{ctx:a})}),e.jsx(R,{path:"perfil",element:e.jsx(Je,{ctx:a,onUpdated:i})}),e.jsx(R,{path:"estadisticas",element:e.jsx(q,{ctx:a,permission:"view_aggregated",children:e.jsx(ua,{})})}),e.jsx(R,{path:"avanzado",element:e.jsx(q,{ctx:a,permission:"view_aggregated",children:e.jsx(Ea,{})})}),e.jsx(R,{path:"insights",element:e.jsx(q,{ctx:a,permission:"view_insights",children:e.jsx(ya,{})})}),e.jsx(R,{path:"sesiones",element:e.jsx(q,{ctx:a,permission:"view_detail",children:e.jsx(Qa,{})})}),e.jsx(R,{path:"buscar",element:e.jsx(q,{ctx:a,permission:"view_detail",children:e.jsx(ga,{ctx:a})})}),e.jsx(R,{path:"anonimos",element:e.jsx(q,{ctx:a,permission:"view_detail",children:e.jsx(Oa,{ctx:a})})}),e.jsx(R,{path:"contenido",element:e.jsx(q,{ctx:a,permission:"manage_content",children:e.jsx(ta,{ctx:a})})}),e.jsx(R,{path:"programa",element:e.jsx(q,{ctx:a,permission:"manage_content",children:e.jsx(qa,{ctx:a})})}),e.jsx(R,{path:"exportar",element:e.jsx(q,{ctx:a,permission:"view_aggregated",children:e.jsx(ha,{ctx:a})})}),e.jsx(R,{path:"sistema",element:e.jsx(q,{ctx:a,permission:"manage_config",children:e.jsx(va,{ctx:a})})}),e.jsx(R,{path:"operacion",element:e.jsx(q,{ctx:a,permission:"manage_security",children:e.jsx(ka,{ctx:a})})}),e.jsx(R,{path:"seguridad",element:e.jsx(q,{ctx:a,permission:"manage_security",children:e.jsx(Wa,{})})}),e.jsx(R,{path:"costos-ai",element:e.jsx(q,{ctx:a,permission:"manage_security",children:e.jsx(Va,{})})}),e.jsx(R,{path:"usuarios",element:e.jsx(q,{ctx:a,permission:"manage_users",children:e.jsx(Za,{ctx:a})})}),e.jsx(R,{path:"auditoria",element:e.jsx(q,{ctx:a,permission:"manage_users",children:e.jsx(oa,{})})}),e.jsx(R,{path:"docentes",element:e.jsx(q,{ctx:a,permission:"view_teachers_kit",children:e.jsx(Se,{})})}),e.jsx(R,{path:"*",element:e.jsx(Ae,{to:"",replace:!0})})]})}),e.jsx("style",{children:`
        .admin-shell {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: calc(100vh - 80px);
        }
        /* ===== Sidebar — paleta Atardecer con contraste vs contenido ===== */
        .admin-side {
          /* Lavanda + peach SATURADO para que destaque vs el marfil del contenido */
          background:
            linear-gradient(180deg,
              rgba(239, 235, 247, 1) 0%,
              rgba(255, 234, 241, 1) 60%,
              rgba(255, 232, 221, 1) 100%);
          color: var(--c-azul-800);
          padding: 24px 18px;
          border-right: 2px solid rgba(157, 123, 217, 0.20);
          box-shadow: 4px 0 18px rgba(108, 80, 124, 0.06);
          position: relative;
        }
        /* Halo lavanda detrás del logo para no perderse */
        .admin-side::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 200px;
          background:
            radial-gradient(circle at 50% 30%, rgba(157,123,217,0.28), transparent 70%),
            radial-gradient(circle at 50% 90%, rgba(255,184,156,0.18), transparent 60%);
          pointer-events: none;
        }
        .admin-side > * { position: relative; z-index: 1; }

        .admin-brand {
          display: block;
          margin: -8px -6px 18px;
          padding: 10px 6px 14px;
          border-bottom: 1px solid rgba(108,80,124,0.10);
          text-align: center;
          transition: opacity 0.2s;
        }
        .admin-brand:hover { opacity: 0.92; }
        .admin-brand-logo {
          display: block;
          width: 100%;
          max-width: 180px;
          height: auto;
          margin: 0 auto;
          /* Sin filter de drop-shadow oscuro — el logo se ve limpio sobre fondo claro */
          filter: drop-shadow(0 8px 18px rgba(108,80,124,0.18))
                  drop-shadow(0 2px 6px rgba(108,80,124,0.10));
        }
        .admin-side .role-chip {
          display: inline-block;
          padding: 3px 8px;
          background: var(--c-oro-600);
          color: var(--c-azul-800);
          border-radius: 999px;
          font-size: 0.66rem;
          font-weight: 800;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .profile-link {
          display: grid;
          grid-template-columns: 42px 1fr 22px;
          gap: 10px;
          align-items: center;
          padding: 10px;
          margin-bottom: 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid var(--c-borde-soft);
          color: var(--c-azul-800) !important;
          transition: background 0.2s, border-color 0.2s;
        }
        .profile-link:hover { background: rgba(255,255,255,0.9); border-color: rgba(157,123,217,0.30); }
        .profile-link .avatar {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
          color: var(--c-azul-800);
          font-family: var(--ff-serif);
          font-weight: 800;
          font-size: 1.1rem;
          display: grid; place-items: center;
        }
        .profile-link .profile-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .profile-link .profile-meta strong {
          font-size: 0.92rem;
          color: var(--c-azul-800);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .profile-link .profile-meta small {
          font-size: 0.74rem;
          color: var(--c-gris);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .profile-link .edit-icon {
          opacity: 0.55;
          color: var(--c-azul-800);
        }
        .profile-link.active {
          background: var(--c-oro-100);
          border-color: var(--c-oro-600);
        }
        .admin-nav { display: grid; gap: 4px; }
        .admin-nav a {
          padding: 10px 14px;
          border-radius: 10px;
          color: var(--c-azul-800);
          font-size: 0.94rem;
          font-weight: 600;
          transition: background 0.2s, transform 0.15s;
        }
        .admin-nav a:hover { background: rgba(157,123,217,0.10); transform: translateX(2px); }
        .admin-nav a.active {
          background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
          color: var(--c-azul-800);
          box-shadow: 0 4px 12px rgba(201,162,39,0.25);
        }
        .admin-side .logout {
          margin-top: 20px;
          background: transparent;
          border: 1px solid var(--c-coral-500);
          color: var(--c-coral-700);
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }
        .admin-side .logout:hover { background: var(--c-coral-600); border-color: var(--c-coral-500); color: #fff; }
        .admin-main { padding: 28px 32px 60px; background: var(--c-marfil); }

        @media (max-width: 880px) {
          .admin-shell { grid-template-columns: 1fr; }
          .admin-side { padding: 16px; }
        }
      `})]})}function Ja({ctx:s}){var o,r,d,p,v,x;const a=s.admin.role,[l,n]=u.useState({}),[t,i]=u.useState({loading:!0});return u.useEffect(()=>{(async()=>{const[f,m]=await Promise.all([Ie(),Le()]);n({supabase:f,pumai:m})})()},[]),u.useEffect(()=>{if(!Pe){i({loading:!1});return}if(!Y(a,"view_aggregated")){i({loading:!1});return}(async()=>{try{const[{count:f},m,c]=await Promise.all([N.from("assessment_sessions").select("*",{count:"exact",head:!0}),N.from("view_dimension_impact").select("*"),N.from("assessment_sessions").select("id, anonymous_code, total_score, general_level, top_attention_areas, created_at").order("created_at",{ascending:!1}).limit(10)]),h=c.data||[],_=h.length?Math.round(h.reduce((g,j)=>g+(j.total_score||0),0)/h.length):null,y={bajo:0,moderado:0,prioritario:0},w=await N.from("assessment_sessions").select("general_level").not("general_level","is",null);for(const g of w.data||[])y[g.general_level]!==void 0&&y[g.general_level]++;i({loading:!1,total:f??0,avg:_,recent:h,dimensions:m.data||[],levels:y})}catch(f){console.warn(f),i({loading:!1,error:f.message})}})()},[a]),e.jsxs(e.Fragment,{children:[e.jsxs("header",{className:"page-head dashboard-head",children:[e.jsxs("div",{className:"dashboard-welcome",children:[e.jsx("img",{src:"/aura-fesi/Aura.png",alt:"AURA",className:"dashboard-logo",loading:"eager",decoding:"async"}),e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Panel administrativo"}),e.jsx("h1",{className:"mt-2",children:"Bienvenida, bienvenido"}),e.jsxs("p",{className:"lede",children:["Como ",e.jsx("strong",{children:ze[a]}),", accedes a ",Ka(a),"."]})]})]}),e.jsxs("div",{className:"health",children:[e.jsx(ne,{label:"Backend",ok:(o=l.supabase)==null?void 0:o.ok}),e.jsx(ne,{label:"BD",ok:(r=l.supabase)==null?void 0:r.ok}),e.jsx(ne,{label:"Pum-AI",ok:(d=l.pumai)==null?void 0:d.ok})]}),e.jsx("style",{children:`
          .dashboard-welcome {
            display: flex;
            align-items: center;
            gap: 22px;
          }
          .dashboard-logo {
            width: 140px;
            height: auto;
            flex-shrink: 0;
            filter: drop-shadow(0 10px 24px rgba(108,80,124,0.18))
                    drop-shadow(0 4px 10px rgba(108,80,124,0.10));
            animation: dashLogoFloat 7s ease-in-out infinite;
            will-change: transform;
          }
          @keyframes dashLogoFloat {
            0%, 100% { transform: translateY(0)   rotate(-0.5deg); }
            50%      { transform: translateY(-5px) rotate(0.5deg); }
          }
          @media (max-width: 720px) {
            .dashboard-welcome { flex-direction: column; align-items: flex-start; gap: 12px; }
            .dashboard-logo { width: 110px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .dashboard-logo { animation: none; }
          }
        `})]}),t.loading?e.jsx("div",{className:"text-center mt-4",children:e.jsx("div",{className:"spinner",style:{margin:"0 auto"}})}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"kpi-grid",children:[e.jsxs(O,{variant:"slideUp",delay:0,children:["    ",e.jsx(V,{label:"Sesiones totales",value:t.total??"—",animated:!0})]}),e.jsxs(O,{variant:"slideUp",delay:.07,children:[" ",e.jsx(V,{label:"Promedio reciente",value:t.avg??"—",suffix:"/100",animated:!0})]}),e.jsxs(O,{variant:"slideUp",delay:.14,children:[" ",e.jsx(V,{label:"Nivel bajo",value:((p=t.levels)==null?void 0:p.bajo)??0,accent:"sage",animated:!0})]}),e.jsxs(O,{variant:"slideUp",delay:.21,children:[" ",e.jsx(V,{label:"Nivel moderado",value:((v=t.levels)==null?void 0:v.moderado)??0,accent:"gold",animated:!0})]}),e.jsxs(O,{variant:"slideUp",delay:.28,children:[" ",e.jsx(V,{label:"Nivel prioritario",value:((x=t.levels)==null?void 0:x.prioritario)??0,accent:"coral",animated:!0})]})]}),e.jsx(O,{variant:"zoomIn",delay:.1,children:e.jsxs("section",{className:"panel mt-4",children:[e.jsx("span",{className:"tag",children:"Modelo dimensional de impacto"}),e.jsx("h2",{className:"mt-2",children:"Esferas de bienestar"}),e.jsx("p",{className:"lede",children:"Cada esfera representa una dimensión del bienestar. El tamaño es proporcional al número de menciones en áreas de atención de las sesiones completadas. Esto te ayuda a identificar dónde está el mayor impacto."}),e.jsx(Xe,{data:t.dimensions||[]})]})}),Y(a,"view_aggregated")&&e.jsxs("section",{className:"panel mt-4",children:[e.jsx("h2",{children:"Sesiones recientes"}),e.jsx("p",{className:"note",children:Y(a,"view_detail")?'Vista agregada. Para ver el detalle por sesión, ve a "Sesiones detalladas".':"Vista agregada — los detalles individuales requieren rol de Especialista o Administrador."}),e.jsx("div",{className:"table-wrap mt-2",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Fecha"}),e.jsx("th",{children:"Código"}),e.jsx("th",{children:"Puntaje"}),e.jsx("th",{children:"Nivel"})]})}),e.jsx("tbody",{children:(t.recent||[]).length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"note text-center",children:"Sin registros aún."})}):t.recent.map(f=>e.jsxs("tr",{children:[e.jsx("td",{children:new Date(f.created_at).toLocaleString("es-MX")}),e.jsx("td",{children:e.jsx("code",{children:f.anonymous_code})}),e.jsx("td",{children:f.total_score??"—"}),e.jsx("td",{children:e.jsx("span",{className:`lvl-bg-${f.general_level}`,style:{padding:"4px 10px",borderRadius:8,fontWeight:700},children:f.general_level||"—"})})]},f.id))})]})})]})]}),e.jsx("style",{children:`
        .page-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }
        .page-head h1 { margin: 0 0 6px; }
        .health { display: flex; gap: 8px; flex-wrap: wrap; }
        .conn-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--r-pill);
          font-size: 0.84rem;
          font-weight: 700;
        }
        .conn-chip.ok      { background: var(--c-salvia-100); color: #2F8770; }
        .conn-chip.fail    { background: var(--c-coral-100); color: #93362A; }
        .conn-chip.unknown { background: var(--c-azul-100); color: var(--c-azul-800); }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
        }
        .kpi-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
        }
        .kpi-card .label { font-size: 0.84rem; color: var(--c-gris); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
        .kpi-card .value {
          font-family: var(--ff-serif);
          font-size: 2rem;
          color: var(--c-azul-800);
          margin-top: 4px;
          font-weight: 800;
        }
        .kpi-card.sage  { border-color: var(--c-salvia-400); }
        .kpi-card.gold  { border-color: var(--c-oro-600); }
        .kpi-card.coral { border-color: var(--c-coral-500); }

        .table-wrap {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
        .admin-table th, .admin-table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--c-borde-soft); }
        .admin-table th { background: var(--c-azul-100); color: var(--c-azul-800); font-weight: 800; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.03em; }
      `})]})}function Ka(s){switch(s){case"admin":return"control total: gestión de usuarios, contenido, sistema, operación y todas las métricas";case"especialista":return"detalle de sesiones individuales, búsqueda por código, métricas agregadas e insights de Pum-AI";case"analista":return"métricas agregadas, análisis avanzado e insights de Pum-AI (sin acceso individual)";case"coordinador":return"gestión de contenido y programa (preguntas, recursos, eventos, árboles, etc.) + métricas agregadas";case"docente":return"el kit pedagógico para acompañar a tus estudiantes";default:return"el panel administrativo"}}function V({label:s,value:a,suffix:l,accent:n,animated:t}){const i=u.useRef(null);return u.useEffect(()=>{if(!t||!i.current)return;const o=typeof a=="number"?a:Number(a);if(!Number.isFinite(o)){i.current.textContent=String(a);return}$e(i.current,o,{duration:1100})},[t,a]),e.jsxs("div",{className:`kpi-card ${n||""}`,children:[e.jsx("div",{className:"label",children:s}),e.jsxs("div",{className:"value",children:[t&&Number.isFinite(Number(a))?e.jsx("span",{ref:i,children:"0"}):a,l&&e.jsx("small",{style:{fontSize:"0.55em",marginLeft:4,color:"var(--c-gris)"},children:l})]})]})}function ne({label:s,ok:a}){let l="unknown",n="⏳";return a===!0?(l="ok",n="✓"):a===!1&&(l="fail",n="✗"),e.jsxs("span",{className:`conn-chip ${l}`,children:[n," ",s]})}function Qa(){const[s,a]=u.useState([]),[l,n]=u.useState(!0);return u.useEffect(()=>{(async()=>{const{data:t}=await N.from("assessment_sessions").select("id, anonymous_code, total_score, general_level, dimension_scores, top_attention_areas, created_at").order("created_at",{ascending:!1}).limit(40);a(t||[]),n(!1)})()},[]),e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag coral",children:"Detalle"}),e.jsx("h1",{className:"mt-2",children:"Sesiones individuales"}),e.jsx("p",{className:"lede",children:"Cada sesión es anónima. No mostramos información que pueda identificar a la persona."})]})}),l?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsxs("div",{className:"sessions-grid",children:[s.length===0&&e.jsx("p",{className:"note",children:"Aún no hay sesiones para mostrar."}),s.map(t=>e.jsxs("article",{className:"session-card",children:[e.jsxs("header",{children:[e.jsx("code",{children:t.anonymous_code}),e.jsx("span",{className:`lvl-bg-${t.general_level}`,style:{padding:"3px 10px",borderRadius:8,fontSize:"0.78rem",fontWeight:700},children:t.general_level})]}),e.jsxs("div",{className:"score",children:[t.total_score," ",e.jsx("small",{children:"/100"})]}),e.jsx("small",{className:"date",children:new Date(t.created_at).toLocaleString("es-MX")}),e.jsx("div",{className:"dims",children:Object.entries(t.dimension_scores||{}).map(([i,o])=>e.jsxs("div",{className:"dim-row",children:[e.jsx("span",{children:o.label}),e.jsx("span",{className:`lvl-${o.level}`,children:o.score})]},i))})]},t.id))]}),e.jsx("style",{children:`
        .sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .session-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
        }
        .session-card header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }
        .session-card code { font-size: 0.86rem; color: var(--c-azul-800); font-weight: 700; }
        .session-card .score { font-family: var(--ff-serif); font-size: 1.8rem; font-weight: 800; color: var(--c-azul-800); }
        .session-card .score small { font-size: 0.6em; color: var(--c-gris); }
        .session-card .date { color: var(--c-gris); font-size: 0.78rem; display: block; margin-bottom: 10px; }
        .dims { display: grid; gap: 4px; padding-top: 10px; border-top: 1px solid var(--c-borde-soft); }
        .dim-row { display: flex; justify-content: space-between; font-size: 0.86rem; }
        .dim-row span:first-child { color: var(--c-texto-soft); }
        .dim-row span:last-child { font-weight: 700; }
      `})]})}function Za({ctx:s}){const[a,l]=u.useState([]),[n,t]=u.useState(!0),[i,o]=u.useState({email:"",full_name:"",role:"analista",password:""}),[r,d]=u.useState(null),[p,v]=u.useState(!1);async function x(){t(!0);const{data:y}=await N.from("admin_users").select("id, email, full_name, role, active, last_access, created_at").order("created_at",{ascending:!1});l(y||[]),t(!1)}u.useEffect(()=>{x()},[]);function f(){const y="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789",w="!@#$%&*",g=new Uint32Array(14);crypto.getRandomValues(g);let j="";for(let b=0;b<14;b++)j+=y[g[b]%y.length];j+=w[g[0]%w.length],o(b=>({...b,password:j}))}async function m(y){var w;y.preventDefault(),d(null),v(!0);try{const{data:g,error:j}=await N.functions.invoke("admin-create-user",{body:{email:i.email.trim(),full_name:i.full_name.trim(),role:i.role,password:i.password||void 0}});if(j||g!=null&&g.error){let b=(g==null?void 0:g.error)||j.message;try{(w=j==null?void 0:j.context)!=null&&w.json&&(b=(await j.context.json()).error||b)}catch{}throw new Error(b)}d({type:"ok",text:`✓ ${i.email} ${g.password_set?"(con contraseña)":""} guardado como ${i.role}.`}),o({email:"",full_name:"",role:"analista",password:""}),x()}catch(g){d({type:"error",text:g.message})}finally{v(!1)}}async function c(y){const w=prompt(`Nueva contraseña para ${y.email}
(mínimo 8 caracteres, deja vacío para cancelar)`);if(!(!w||w.length<8)){v(!0);try{const{data:g,error:j}=await N.functions.invoke("admin-create-user",{body:{email:y.email,full_name:y.full_name||"",role:y.role,password:w}});if(j||g!=null&&g.error)throw new Error((g==null?void 0:g.error)||j.message);d({type:"ok",text:`✓ Contraseña actualizada para ${y.email}`})}catch(g){d({type:"error",text:g.message})}finally{v(!1)}}}async function h(y,w){const{error:g}=await N.from("admin_users").update({role:w}).eq("id",y);g?d({type:"error",text:g.message}):x()}async function _(y,w){const{error:g}=await N.from("admin_users").update({active:w}).eq("id",y);g?d({type:"error",text:g.message}):x()}return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"page-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Usuarios"}),e.jsx("h1",{className:"mt-2",children:"Gestión de equipo administrativo"}),e.jsxs("p",{className:"lede",children:["Define quién accede al panel y con qué permisos. Solo el rol"," ",e.jsx("strong",{children:"Administrador"})," puede modificar esta sección."]})]})}),e.jsxs("section",{className:"panel",children:[e.jsx("h2",{children:"Agregar / actualizar miembro"}),e.jsx("p",{className:"note",children:"Crea el usuario completo (autenticación + rol) en una sola pasada. Si ya existe un usuario con ese correo, solo se actualizará rol/nombre. Para cambiar contraseña a un usuario existente, usa el botón 🔑 en la tabla de abajo."}),e.jsxs("form",{onSubmit:m,className:"user-form mt-2",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Correo"}),e.jsx("input",{type:"email",required:!0,value:i.email,onChange:y=>o(w=>({...w,email:y.target.value})),placeholder:"usuario@unam.mx"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Nombre completo"}),e.jsx("input",{type:"text",value:i.full_name,onChange:y=>o(w=>({...w,full_name:y.target.value}))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Rol"}),e.jsxs("select",{value:i.role,onChange:y=>o(w=>({...w,role:y.target.value})),children:[e.jsx("option",{value:"analista",children:"Analista"}),e.jsx("option",{value:"especialista",children:"Especialista"}),e.jsx("option",{value:"coordinador",children:"Coordinador"}),e.jsx("option",{value:"docente",children:"Docente"}),e.jsx("option",{value:"admin",children:"Administrador"})]})]}),e.jsxs("div",{className:"field pw-field",children:[e.jsx("label",{children:"Contraseña inicial"}),e.jsxs("div",{className:"pw-input",children:[e.jsx("input",{type:"text",value:i.password,onChange:y=>o(w=>({...w,password:y.target.value})),placeholder:"mínimo 8 chars",minLength:8}),e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",onClick:f,children:"🎲 Generar"})]}),e.jsx("small",{className:"note",children:"Obligatoria si el usuario es nuevo. Opcional si ya existe."})]}),e.jsx("button",{className:"btn btn-primary",type:"submit",disabled:p,children:p?"Guardando…":"Guardar"})]}),r&&e.jsx("p",{className:`feedback ${r.type}`,children:r.text})]}),e.jsxs("section",{className:"panel mt-4",children:[e.jsx("h2",{children:"Equipo actual"}),n?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):e.jsx("div",{className:"table-wrap mt-2",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Nombre"}),e.jsx("th",{children:"Correo"}),e.jsx("th",{children:"Rol"}),e.jsx("th",{children:"Activo"}),e.jsx("th",{children:"Último acceso"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:a.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"note text-center",children:"Aún no hay miembros."})}):a.map(y=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:y.full_name||"—"})}),e.jsx("td",{children:y.email}),e.jsx("td",{children:e.jsxs("select",{value:y.role,onChange:w=>h(y.id,w.target.value),disabled:y.id===s.admin.id,children:[e.jsx("option",{value:"analista",children:"Analista"}),e.jsx("option",{value:"especialista",children:"Especialista"}),e.jsx("option",{value:"coordinador",children:"Coordinador"}),e.jsx("option",{value:"docente",children:"Docente"}),e.jsx("option",{value:"admin",children:"Administrador"})]})}),e.jsx("td",{children:e.jsxs("label",{className:"toggle",children:[e.jsx("input",{type:"checkbox",checked:y.active,onChange:w=>_(y.id,w.target.checked),disabled:y.id===s.admin.id}),e.jsx("span",{children:y.active?"Activo":"Inactivo"})]})}),e.jsx("td",{children:e.jsx("small",{className:"note",children:y.last_access?new Date(y.last_access).toLocaleString("es-MX"):"Sin acceso aún"})}),e.jsx("td",{children:e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",onClick:()=>c(y),disabled:p||y.id===s.admin.id,title:"Resetear contraseña",children:"🔑"})})]},y.id))})]})})]}),e.jsx("style",{children:`
        .user-form {
          display: grid;
          grid-template-columns: 1.4fr 1.4fr 1fr 1.6fr auto;
          gap: 12px;
          align-items: end;
        }
        .pw-field { grid-column: span 1; }
        .pw-input { display: flex; gap: 6px; align-items: stretch; }
        .pw-input input { flex: 1; }
        .pw-input .btn { white-space: nowrap; }

        .feedback {
          padding: 10px 14px;
          border-radius: 12px;
          margin-top: 12px;
          font-size: 0.92rem;
        }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F8770; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
        .toggle { display: inline-flex; align-items: center; gap: 6px; }

        @media (max-width: 1100px) {
          .user-form { grid-template-columns: 1fr 1fr; }
          .pw-field { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .user-form { grid-template-columns: 1fr; }
        }
      `})]})}export{is as default};
