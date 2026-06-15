import{s as m,j as e}from"./index-C9gOBfM4.js";import{r as t}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";function h(){const[o,n]=t.useState([]),[r,c]=t.useState(""),[d,l]=t.useState(!0);t.useEffect(()=>{m.from("student_library").select("*").eq("active",!0).eq("category","dictionary").order("title").then(({data:a})=>{n(a||[]),l(!1)})},[]);const i=o.filter(a=>{var s;return!r.trim()||a.title.toLowerCase().includes(r.toLowerCase())||((s=a.body)==null?void 0:s.toLowerCase().includes(r.toLowerCase()))});return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:840},children:[e.jsxs("header",{className:"text-center",style:{maxWidth:640,margin:"0 auto"},children:[e.jsx("span",{className:"tag lavanda",children:"Diccionario"}),e.jsx("h1",{className:"mt-2",children:"Diccionario de emociones"}),e.jsx("p",{className:"lede",children:"A veces no sabemos qué nombre darle a lo que sentimos. Aquí encuentras un vocabulario emocional cuidado para ayudarte a identificar y validar tu experiencia."})]}),e.jsx("div",{className:"search-bar mt-4",children:e.jsx("input",{type:"search",placeholder:"Buscar emoción…",value:r,onChange:a=>c(a.target.value)})}),d?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):e.jsx("div",{className:"emo-grid mt-3",children:i.length===0?e.jsx("p",{className:"note text-center",children:r?"No encontramos esa emoción. Prueba con otro término.":"Aún no hay emociones cargadas."}):i.map(a=>{var s;return e.jsxs("article",{className:"emo-card",children:[e.jsx("h3",{children:a.title}),e.jsx("p",{children:a.body}),((s=a.meta)==null?void 0:s.synonyms)&&e.jsxs("small",{children:[e.jsx("strong",{children:"También:"})," ",a.meta.synonyms]})]},a.id)})})]}),e.jsx("style",{children:`
        .search-bar { display: flex; justify-content: center; }
        .search-bar input {
          width: 100%; max-width: 420px;
          padding: 10px 16px;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.95rem;
        }
        .emo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }
        .emo-card {
          background: linear-gradient(135deg, var(--c-lavanda-100), #fff);
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 16px 18px;
        }
        .emo-card h3 {
          font-family: var(--ff-serif);
          font-size: 1.15rem;
          color: var(--c-azul-800);
          margin: 0 0 6px;
        }
        .emo-card p { color: var(--c-texto-soft); font-size: 0.92rem; margin: 0 0 6px; }
        .emo-card small { color: var(--c-gris); font-size: 0.82rem; }
      `})]})}export{h as default};
