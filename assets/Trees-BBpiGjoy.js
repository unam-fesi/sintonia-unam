import{u as j,j as e,s as o}from"./index-lF9CPj9B.js";import{r as t,L as v}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";function k(){const{student:a}=j(),[l,x]=t.useState([]),[d,g]=t.useState([]),[b,m]=t.useState(!0),[i,c]=t.useState("all");async function p(){m(!0);const{data:s}=await o.from("view_trees_with_care").select("*").order("planted_at",{ascending:!1});if(x(s||[]),a!=null&&a.code){const r=(s||[]).filter(n=>(n.caretakers||[]).includes(a.code));g(r)}m(!1)}t.useEffect(()=>{p()},[a==null?void 0:a.code]);async function f(s){if(!(a!=null&&a.code)){alert('Crea tu código anónimo desde "Mi historia" para adoptar árboles.');return}const{error:r}=await o.from("tree_caretakers").insert({tree_id:s,anonymous_code:a.code});if(r){r.code==="23505"?alert("Ya eres cuidador(a) de este árbol."):alert(r.message);return}await o.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:"tree_adopted"}),p()}async function u(s,r,n=""){a!=null&&a.code&&(await o.from("tree_care_log").insert({tree_id:s,anonymous_code:a.code,action:r,note:n}),r==="visita"&&await o.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:"wellness_walk"}))}const h=i==="mine"?d:i==="available"?l.filter(s=>!(s.caretakers||[]).includes(a==null?void 0:a.code)&&s.caretaker_count<5):l;return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:980},children:[e.jsxs("header",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag sage",children:"Bienestar verde"}),e.jsx("h1",{className:"mt-2",children:"Adopta un árbol, cuida tu bienestar 🌳"}),e.jsx("p",{className:"lede",children:"En la UNAM hay un proyecto de plantación. Cada árbol necesita ojos que lo visiten, lo rieguen y lo cuiden. Adoptar un árbol es un acto de cuidado mutuo: tú cuidas algo vivo y eso te cuida a ti."})]}),e.jsxs("div",{className:"filters mt-3",children:[e.jsxs("button",{className:`chip ${i==="all"?"active":""}`,onClick:()=>c("all"),children:["Todos (",l.length,")"]}),e.jsx("button",{className:`chip ${i==="available"?"active":""}`,onClick:()=>c("available"),children:"Sin adoptar"}),(a==null?void 0:a.code)&&e.jsxs("button",{className:`chip ${i==="mine"?"active":""}`,onClick:()=>c("mine"),children:["Mis árboles (",d.length,")"]})]}),b?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsx("div",{className:"trees-grid mt-3",children:h.length===0?e.jsx("p",{className:"note text-center",children:i==="mine"?"Aún no has adoptado árboles. ¡Adopta uno y empieza a cuidarlo!":"No hay árboles registrados en esta vista."}):h.map(s=>{const r=(s.caretakers||[]).includes(a==null?void 0:a.code);return e.jsxs("article",{className:"tree-card",children:[s.photo_url&&e.jsx("img",{src:s.photo_url,alt:s.species||"árbol"}),e.jsxs("div",{className:"tc-body",children:[e.jsxs("h3",{children:["🌳 ",s.species||"Árbol"]}),s.location_name&&e.jsxs("small",{children:["📍 ",s.location_name]}),s.planted_at&&e.jsxs("small",{children:["📅 Plantado el ",new Date(s.planted_at).toLocaleDateString("es-MX")]}),e.jsxs("small",{children:["👥 ",s.caretaker_count," cuidador",s.caretaker_count===1?"":"es"]}),s.notes&&e.jsx("p",{children:s.notes}),e.jsx("div",{className:"tc-actions",children:a!=null&&a.code?r?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-gold btn-sm",onClick:()=>u(s.id,"visita","Visita registrada"),children:"✓ Registrar visita"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>u(s.id,"riego","Lo regué"),children:"💧 Riego"})]}):s.caretaker_count>=5?e.jsx("small",{className:"note",children:"Cupo de cuidadores lleno"}):e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>f(s.id),children:"🤝 Adoptar"}):e.jsx(v,{to:"/mi-historia",className:"btn btn-ghost btn-sm",children:"Crear código para adoptar"})})]})]},s.id)})}),e.jsxs("section",{className:"panel mt-4",children:[e.jsx("h2",{children:"¿Cómo cuidar a tu árbol?"}),e.jsxs("ul",{style:{lineHeight:1.7,paddingLeft:20},children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Visítalo"})," al menos una vez por semana."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Riégalo"})," si lleva 5+ días sin lluvia y el suelo se ve seco."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Limpia"})," hojas secas o basura de su base."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Observa"})," si tiene plagas, hojas amarillas u otros signos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Comparte"})," tu visita en el Diario o con un buddy."]})]}),e.jsxs("p",{className:"note",children:["Visitar tu árbol es también una ",e.jsx("strong",{children:"caminata corta"}),": doble cuidado."]})]})]}),e.jsx("style",{children:`
        .filters { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
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
        .chip.active { background: var(--c-salvia-600); color: #fff; border-color: var(--c-salvia-600); }
        .trees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .tree-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .tree-card img { width: 100%; height: 160px; object-fit: cover; }
        .tc-body { padding: 16px; display: flex; flex-direction: column; gap: 4px; }
        .tc-body h3 { color: var(--c-azul-800); margin: 0; font-size: 1.05rem; }
        .tc-body small { color: var(--c-gris); font-size: 0.84rem; }
        .tc-body p { margin: 6px 0 0; font-size: 0.9rem; color: var(--c-texto-soft); }
        .tc-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
      `})]})}export{k as default};
