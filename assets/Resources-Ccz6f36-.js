import{R as n,j as e,f as x,S as p}from"./index-C9gOBfM4.js";import{r}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";function m({resource:s}){const t=n.find(i=>i.id===s.type)||{label:s.type,icon:"✦"};return e.jsxs("article",{className:"resource-card",children:[e.jsx("div",{className:"resource-icon","aria-hidden":"true",children:t.icon}),e.jsxs("div",{className:"resource-body",children:[e.jsx("span",{className:"tag",children:t.label}),e.jsx("h3",{className:"mt-2",children:s.name}),e.jsx("p",{children:s.description}),e.jsxs("ul",{className:"resource-meta",children:[s.audience&&e.jsxs("li",{children:[e.jsx("strong",{children:"Público:"})," ",s.audience]}),s.modality&&e.jsxs("li",{children:[e.jsx("strong",{children:"Modalidad:"})," ",s.modality]}),s.location&&e.jsxs("li",{children:[e.jsx("strong",{children:"Ubicación:"})," ",s.location]}),s.schedule&&e.jsxs("li",{children:[e.jsx("strong",{children:"Horario:"})," ",s.schedule]}),s.contact&&e.jsxs("li",{children:[e.jsx("strong",{children:"Contacto:"})," ",s.contact]})]})]})]})}function g(){const[s,t]=r.useState([]),[i,l]=r.useState("all"),[o,d]=r.useState(!0);r.useEffect(()=>{let a=!0;return x().then(h=>{a&&(t(h),d(!1))}),()=>{a=!1}},[]);const c=r.useMemo(()=>i==="all"?s:s.filter(a=>a.type===i),[i,s]);return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsxs("header",{style:{textAlign:"center",maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Recursos de apoyo"}),e.jsx("h1",{className:"mt-2",children:"Espacios universitarios para tu bienestar"}),e.jsx("p",{className:"lede",children:"Conoce orientaciones, actividades y servicios disponibles dentro de la UNAM para acompañarte en tu vida universitaria."})]}),e.jsxs("div",{className:"filters mt-4",children:[e.jsx("button",{className:`chip ${i==="all"?"active":""}`,onClick:()=>l("all"),children:"Todos"}),n.map(a=>e.jsxs("button",{className:`chip ${i===a.id?"active":""}`,onClick:()=>l(a.id),children:[e.jsx("span",{"aria-hidden":"true",children:a.icon})," ",a.label]},a.id))]}),o?e.jsx("p",{className:"text-center mt-4 lede",children:"Cargando recursos…"}):c.length===0?e.jsx("p",{className:"text-center mt-4 note",children:"No hay recursos en esta categoría todavía."}):e.jsx("div",{className:"resource-grid mt-4",children:c.map(a=>e.jsx(m,{resource:a},a.id))}),e.jsx("div",{className:"mt-4",children:e.jsxs(p,{variant:"gold",children:["¿Estás en una situación de crisis? Llama a la ",e.jsx("strong",{children:"Línea de la Vida"})," al",e.jsx("strong",{children:" 800 290 0024"}),", gratuita y disponible las 24 horas, todos los días."]})})]}),e.jsx("style",{children:`
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 8px 14px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--c-azul-800);
          cursor: pointer;
          transition: all var(--t);
        }
        .chip:hover { border-color: var(--c-azul-800); }
        .chip.active {
          background: var(--c-azul-800);
          color: #fff;
          border-color: var(--c-azul-800);
        }
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
      `})]})}export{g as default};
