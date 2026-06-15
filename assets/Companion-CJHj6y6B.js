import{u as w,j as e,b as y,s as z}from"./index-B7qB7HWf.js";import{b as S,r as n,L as k}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";const E=["Me ha costado dormir últimamente","Estoy presionado(a) por los exámenes","Me siento desconectado(a) de mis amigos","No sé por qué me siento triste","Quiero empezar a cuidarme más"];function R(){const{student:r}=w(),p=S(),[c,l]=n.useState([]),[d,u]=n.useState(""),[m,j]=n.useState(null),[i,x]=n.useState(!1),[h,g]=n.useState(null),b=n.useRef(null);n.useEffect(()=>{r!=null&&r.code?l([{role:"assistant",content:"Hola. Soy **Pum-AI**, tu acompañante. Aquí puedes contarme cómo estás. No soy terapeuta ni te voy a diagnosticar — solo escucho y te oriento. Recuerda: puedes hablar con alguien profesional en /apoyo cuando lo necesites. ¿Cómo te sientes hoy?"}]):p("/mi-historia",{state:{from:"/companion"}})},[r,p]),n.useEffect(()=>{var s;(s=b.current)==null||s.scrollIntoView({behavior:"smooth"})},[c]);async function f(s){const t=(s||d).trim();if(!(!t||i)){g(null),l(a=>[...a,{role:"user",content:t}]),u(""),x(!0);try{const{data:a,error:o}=await z.functions.invoke("chat-companion",{body:{anonymous_code:r.code,message:t,session_id:m}});if(o)throw o;if(a!=null&&a.error)throw new Error(a.error);a.session_id&&!m&&j(a.session_id),l(v=>[...v,{role:"assistant",content:a.assistant,crisis:a.crisis}])}catch(a){g(a.message||"Error"),l(o=>o.filter((v,N)=>N!==o.length-1))}finally{x(!1)}}}return r!=null&&r.code?e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:760},children:[e.jsx(y,{variant:"slideUp",children:e.jsxs("header",{className:"comp-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Pum-AI · Acompañante"}),e.jsx("h1",{className:"mt-2",children:"Aquí te escucho 🤝"})]}),e.jsxs("div",{className:"badges",children:[e.jsx("span",{className:"badge",children:"Anónimo"}),e.jsx("span",{className:"badge warm",children:"No es terapia"})]})]})}),e.jsx(y,{variant:"zoomIn",delay:.1,children:e.jsxs("div",{className:"chat-card",children:[e.jsxs("div",{className:"chat-stream",children:[c.map((s,t)=>e.jsxs("article",{className:`bubble ${s.role}`,children:[e.jsx("div",{className:"content",children:s.content}),s.crisis&&e.jsxs("div",{className:"crisis-actions",children:[e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral btn-sm",children:"📞 Llamar 800 290 0024"}),e.jsx(k,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver opciones"})]})]},t)),i&&e.jsx("article",{className:"bubble assistant",children:e.jsxs("div",{className:"content typing",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})}),e.jsx("div",{ref:b})]}),h&&e.jsx("div",{className:"chat-error",children:h}),c.length<=1&&e.jsxs("div",{className:"suggestions",children:[e.jsx("small",{children:"O empieza con:"}),E.map(s=>e.jsx("button",{className:"sg",onClick:()=>f(s),disabled:i,children:s},s))]}),e.jsxs("form",{className:"chat-input",onSubmit:s=>{s.preventDefault(),f()},children:[e.jsx("input",{type:"text",value:d,onChange:s=>u(s.target.value),placeholder:"Escribe lo que sientes…",maxLength:1e3,disabled:i}),e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:i||!d.trim(),children:i?"…":"Enviar"})]}),e.jsx("p",{className:"note text-center mt-2",children:e.jsxs("small",{children:["Esta conversación es anónima pero puede ser auditada por el equipo del programa. Si estás en crisis, llama directamente a ",e.jsx("a",{href:"tel:8002900024",children:"800 290 0024"}),"."]})})]})})]}),e.jsx("style",{children:`
        .comp-head { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
        .badges { display: flex; gap: 6px; }
        .badge {
          background: var(--c-azul-100); color: var(--c-azul-800);
          padding: 4px 10px; border-radius: 999px;
          font-size: 0.78rem; font-weight: 700;
        }
        .badge.warm { background: var(--c-coral-100); color: #93362A; }

        .chat-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          box-shadow: var(--sh-md);
          display: flex; flex-direction: column;
          height: 70vh; min-height: 480px; max-height: 720px;
        }
        .chat-stream {
          flex: 1; overflow-y: auto;
          padding: 20px; display: flex; flex-direction: column; gap: 12px;
        }
        .bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .bubble.user {
          align-self: flex-end;
          background: linear-gradient(135deg, var(--c-azul-800), var(--c-azul-700));
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .bubble.assistant {
          align-self: flex-start;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-bottom-left-radius: 4px;
        }
        .bubble .content :global(strong),
        .bubble .content strong { font-weight: 700; }

        .crisis-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }

        .typing { display: inline-flex; gap: 4px; }
        .typing span {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--c-gris); animation: bouncing 1.2s infinite;
        }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bouncing { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }

        .chat-error {
          background: var(--c-coral-100); color: #93362A;
          padding: 8px 14px; margin: 0 16px;
          border-radius: 10px; font-size: 0.86rem;
        }

        .suggestions {
          padding: 0 16px 12px;
          display: flex; flex-wrap: wrap; gap: 6px;
          align-items: center;
        }
        .suggestions small { color: var(--c-gris); font-size: 0.84rem; }
        .sg {
          background: var(--c-azul-100); color: var(--c-azul-800);
          border: 1px solid rgba(16,36,62,0.15);
          padding: 6px 10px; border-radius: 999px;
          font-size: 0.84rem; cursor: pointer;
        }
        .sg:hover { background: var(--c-azul-800); color: #fff; }

        .chat-input {
          display: flex; gap: 8px;
          padding: 14px 16px;
          border-top: 1px solid var(--c-borde-soft);
        }
        .chat-input input {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.95rem;
        }
        .chat-input input:focus { outline: none; border-color: var(--c-azul-800); }
      `})]}):null}export{R as default};
