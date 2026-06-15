import{i as u,s as o,j as e,S as g}from"./index-DwWWv2XG.js";import{r as i,L as d}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";function y(){const[s,p]=i.useState([]),[m,h]=i.useState([]),[r,c]=i.useState("all");i.useEffect(()=>{u&&Promise.all([o.from("specialists").select("*").eq("active",!0).order("full_name"),o.from("content_blocks").select("*").eq("page","support").eq("active",!0).order("order_idx")]).then(([a,l])=>{p(a.data||[]),h(l.data||[])})},[]);const t=[...new Set(s.map(a=>a.specialty))],n=r==="all"?s:s.filter(a=>a.specialty===r);return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:920},children:[e.jsxs("header",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag coral",children:"Pedir apoyo"}),e.jsx("h1",{className:"mt-2",children:"No estás solo(a). Hay rutas de apoyo"}),e.jsx("p",{className:"lede",children:"Si sientes que necesitas hablar con alguien, aquí están los servicios disponibles dentro de la UNAM y líneas de emergencia. Ningún paso es obligatorio — tú decides cómo y cuándo."})]}),e.jsx("div",{className:"crisis-card mt-4",role:"alert",children:e.jsxs("div",{children:[e.jsx("span",{className:"emoji","aria-hidden":"true",children:"📞"}),e.jsx("h2",{children:"Línea de la Vida — 800 290 0024"}),e.jsxs("p",{children:["Servicio de orientación emocional ",e.jsx("strong",{children:"gratuito, confidencial y disponible 24 horas, todos los días"}),". Si estás en una situación de crisis o piensas en hacerte daño, llama ahora."]}),e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral btn-lg",children:"📞 Llamar ahora"})]})}),e.jsxs("section",{className:"panel mt-4",children:[e.jsx("h2",{children:"Servicios universitarios"}),e.jsx("p",{className:"lede",children:"Especialistas y áreas de orientación dentro de la UNAM. Su atención es gratuita para la comunidad."}),t.length>1&&e.jsxs("div",{className:"filters mt-2",children:[e.jsx("button",{className:`chip ${r==="all"?"active":""}`,onClick:()=>c("all"),children:"Todos"}),t.map(a=>e.jsx("button",{className:`chip ${r===a?"active":""}`,onClick:()=>c(a),children:a},a))]}),n.length===0?e.jsxs("p",{className:"note mt-3",children:["Aún no hay especialistas registrados. Mientras tanto, en ",e.jsx(d,{to:"/recursos",children:"Recursos"})," encuentras servicios universitarios."]}):e.jsx("div",{className:"spec-grid mt-3",children:n.map(a=>e.jsxs("article",{className:"spec-card",children:[e.jsx("span",{className:"spec-tag",children:a.specialty}),e.jsx("h3",{children:a.full_name}),a.faculty&&e.jsxs("small",{children:["📍 ",a.faculty]}),a.modality&&e.jsxs("small",{children:["🌐 ",a.modality]}),a.schedule&&e.jsxs("small",{children:["🕐 ",a.schedule]}),a.email&&e.jsx("a",{href:`mailto:${a.email}`,className:"btn btn-ghost btn-sm",children:"📧 Escribir"}),a.phone&&e.jsx("a",{href:`tel:${a.phone}`,className:"btn btn-primary btn-sm",children:"📞 Llamar"})]},a.id))})]}),m.map(a=>e.jsxs("section",{className:"panel mt-4",children:[e.jsxs("h2",{children:[a.emoji," ",a.title]}),a.body&&e.jsx("p",{className:"lede",children:a.body}),Array.isArray(a.list_items)&&a.list_items.length>0&&e.jsx("ol",{style:{lineHeight:1.8},children:a.list_items.map((l,x)=>e.jsx("li",{dangerouslySetInnerHTML:{__html:f(l)}},x))})]},a.id)),e.jsxs(g,{variant:"warm",children:[e.jsx("strong",{children:"Si estás en peligro inmediato"})," o experimentas una emergencia médica, marca al ",e.jsx("strong",{children:"911"}),"."]}),e.jsx("p",{className:"text-center mt-4",children:e.jsx(d,{to:"/",className:"btn btn-ghost",children:"Volver al inicio"})})]}),e.jsx("style",{children:`
        .crisis-card {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border: 2px solid var(--c-coral-500);
          border-radius: var(--r-xl);
          padding: 28px;
          text-align: center;
          box-shadow: var(--sh-md);
        }
        .crisis-card .emoji { font-size: 2.4rem; display: block; margin-bottom: 8px; }
        .crisis-card h2 { color: #93362A; margin: 0 0 8px; font-size: 1.6rem; }
        .crisis-card p { color: #5C2018; max-width: 540px; margin: 0 auto 14px; }

        .filters { display: flex; gap: 6px; flex-wrap: wrap; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 5px 12px;
          font-size: 0.84rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }

        .spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }
        .spec-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          display: grid;
          gap: 6px;
        }
        .spec-card h3 { color: var(--c-azul-800); margin: 4px 0; font-size: 1.05rem; }
        .spec-card small { color: var(--c-gris); font-size: 0.84rem; }
        .spec-tag {
          background: var(--c-azul-100);
          color: var(--c-azul-800);
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          width: fit-content;
        }
        .spec-card .btn { margin-top: 6px; }
      `})]})}function f(s){return s?String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/`(.+?)`/g,"<code>$1</code>"):""}export{y as default};
