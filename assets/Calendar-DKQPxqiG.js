import{u as j,j as e,s as o}from"./index-wJsHvUnp.js";import{r as i,L as x}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";const N=["todos","psicologia","deporte","arte","sustentabilidad","comunidad"],v={psicologia:"🧠",deporte:"🏃",arte:"🎨",sustentabilidad:"🌿",comunidad:"🤝"};function k(){const{student:t}=j(),[l,g]=i.useState([]),[n,u]=i.useState("todos"),[c,h]=i.useState(new Set),[f,d]=i.useState(!0);async function p(){d(!0);const{data:s}=await o.from("view_upcoming_events").select("*").limit(60);if(g(s||[]),t!=null&&t.code){const{data:r}=await o.from("event_rsvp").select("event_id").eq("anonymous_code",t.code);h(new Set((r||[]).map(a=>a.event_id)))}d(!1)}i.useEffect(()=>{p()},[t==null?void 0:t.code]);async function b(s){t!=null&&t.code&&(c.has(s)?await o.from("event_rsvp").delete().eq("event_id",s).eq("anonymous_code",t.code):await o.from("event_rsvp").insert({event_id:s,anonymous_code:t.code}),p())}const m=n==="todos"?l:l.filter(s=>s.category===n),y=m.reduce((s,r)=>{const a=new Date(r.starts_at).toLocaleDateString("es-MX",{weekday:"long",day:"2-digit",month:"long"});return(s[a]||(s[a]=[])).push(r),s},{});return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:880},children:[e.jsxs("header",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Calendario"}),e.jsx("h1",{className:"mt-2",children:"Bienestar en agenda"}),e.jsxs("p",{className:"lede",children:["Eventos universitarios de bienestar: talleres, círculos, deporte y actividades culturales.",(t==null?void 0:t.code)&&' Marca los que te interesan para verlos en "Mi historia".']})]}),e.jsx("div",{className:"filters mt-3",children:N.map(s=>e.jsxs("button",{className:`chip ${n===s?"active":""}`,onClick:()=>u(s),children:[v[s]||""," ",s.charAt(0).toUpperCase()+s.slice(1)]},s))}),f?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):m.length===0?e.jsx("div",{className:"panel text-center mt-3",children:e.jsxs("p",{className:"note",children:["No hay eventos próximos en esta categoría."," ",e.jsx(x,{to:"/recursos",children:"Mira los recursos disponibles →"})]})}):Object.entries(y).map(([s,r])=>e.jsxs("section",{className:"day-section",children:[e.jsx("h3",{className:"day-title",children:s}),e.jsx("div",{className:"day-events",children:r.map(a=>e.jsxs("article",{className:"event-card",children:[e.jsx("div",{className:"evt-icon","aria-hidden":"true",children:v[a.category]||"✨"}),e.jsxs("div",{className:"evt-body",children:[e.jsx("strong",{children:a.title}),e.jsxs("small",{children:["🕐 ",new Date(a.starts_at).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"}),a.ends_at&&` – ${new Date(a.ends_at).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})}`,a.location&&` · 📍 ${a.location}`]}),a.description&&e.jsx("p",{children:a.description}),a.organizer&&e.jsx("small",{className:"note",children:a.organizer}),e.jsxs("div",{className:"evt-actions",children:[(t==null?void 0:t.code)&&e.jsx("button",{className:`btn btn-sm ${c.has(a.id)?"btn-gold":"btn-primary"}`,onClick:()=>b(a.id),children:c.has(a.id)?"✓ Apuntado(a)":"Me interesa"}),a.url&&e.jsx("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Más info →"}),!(t!=null&&t.code)&&e.jsx(x,{to:"/mi-historia",className:"note",children:"Crea código para apuntarte →"})]})]})]},a.id))})]},s))]}),e.jsx("style",{children:`
        .filters { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 6px 14px;
          font-size: 0.84rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .day-section { margin-top: 22px; }
        .day-title {
          color: var(--c-azul-800);
          font-size: 1rem;
          text-transform: capitalize;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--c-borde-soft);
          margin-bottom: 10px;
        }
        .day-events { display: grid; gap: 10px; }
        .event-card {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 14px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 14px 16px;
        }
        .evt-icon {
          width: 44px; height: 44px;
          background: var(--c-azul-100);
          border-radius: 14px;
          display: grid; place-items: center;
          font-size: 1.4rem;
        }
        .evt-body strong { color: var(--c-azul-800); display: block; }
        .evt-body small { color: var(--c-gris); font-size: 0.84rem; display:block; margin-top: 2px; }
        .evt-body p { margin: 6px 0 0; font-size: 0.92rem; color: var(--c-texto-soft); }
        .evt-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; align-items: center; }
      `})]})}export{k as default};
