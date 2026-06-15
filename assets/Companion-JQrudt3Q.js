import{j as e,u as N,b as j,s as z}from"./index-DwWWv2XG.js";import{r as o,b as k,L as S}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";function E({children:t,speed:u=32,startDelay:l=0,cursor:p=!0,onDone:n,as:b="span",className:h="",style:y={}}){const a=typeof t=="string"?t:String(t),[m,x]=o.useState(0);o.useEffect(()=>{var s;if((s=window.matchMedia)!=null&&s.call(window,"(prefers-reduced-motion: reduce)").matches){x(a.length),n==null||n();return}let c;const f=setTimeout(()=>{let i=0;c=setInterval(()=>{i++,x(i),i>=a.length&&(clearInterval(c),n==null||n())},u)},l);return()=>{clearTimeout(f),c&&clearInterval(c)}},[a,u,l]);const g=m>=a.length;return e.jsxs(b,{className:`typewriter ${h}`,style:y,"aria-label":a,children:[e.jsx("span",{"aria-hidden":"true",children:a.slice(0,m)}),p&&!g&&e.jsx("span",{className:"tw-cursor",children:"▍"}),e.jsx("style",{children:`
        .tw-cursor {
          display: inline-block;
          animation: tw-blink 0.9s steps(2, end) infinite;
          color: var(--c-lavanda-600);
          margin-left: 1px;
        }
        @keyframes tw-blink {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tw-cursor { animation: none; }
        }
      `})]})}const I=["Me ha costado dormir últimamente","Estoy presionado(a) por los exámenes","Me siento desconectado(a) de mis amigos","No sé por qué me siento triste","Quiero empezar a cuidarme más"];function q(){const{student:t}=N(),u=k(),[l,p]=o.useState([]),[n,b]=o.useState(""),[h,y]=o.useState(null),[a,m]=o.useState(!1),[x,g]=o.useState(null),c=o.useRef(null);o.useEffect(()=>{t!=null&&t.code?p([{role:"assistant",content:"Hola. Soy **Pum-AI**, tu acompañante. Aquí puedes contarme cómo estás. No soy terapeuta ni te voy a diagnosticar — solo escucho y te oriento. Recuerda: puedes hablar con alguien profesional en /apoyo cuando lo necesites. ¿Cómo te sientes hoy?"}]):u("/mi-historia",{state:{from:"/companion"}})},[t,u]),o.useEffect(()=>{var s;(s=c.current)==null||s.scrollIntoView({behavior:"smooth"})},[l]);async function f(s){const i=(s||n).trim();if(!(!i||a)){g(null),p(r=>[...r,{role:"user",content:i}]),b(""),m(!0);try{const{data:r,error:d}=await z.functions.invoke("chat-companion",{body:{anonymous_code:t.code,message:i,session_id:h}});if(d)throw d;if(r!=null&&r.error)throw new Error(r.error);r.session_id&&!h&&y(r.session_id),p(v=>[...v,{role:"assistant",content:r.assistant,crisis:r.crisis}])}catch(r){g(r.message||"Error"),p(d=>d.filter((v,w)=>w!==d.length-1))}finally{m(!1)}}}return t!=null&&t.code?e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:760},children:[e.jsx(j,{variant:"slideUp",children:e.jsxs("header",{className:"comp-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"tag azul",children:"Pum-AI · Acompañante"}),e.jsx("h1",{className:"mt-2",children:"Aquí te escucho 🤝"})]}),e.jsxs("div",{className:"badges",children:[e.jsx("span",{className:"badge",children:"Anónimo"}),e.jsx("span",{className:"badge warm",children:"No es terapia"})]})]})}),e.jsx(j,{variant:"zoomIn",delay:.1,children:e.jsxs("div",{className:"chat-card",children:[e.jsxs("div",{className:"chat-stream",children:[l.map((s,i)=>{const d=i===l.length-1&&s.role==="assistant"&&i>0;return e.jsxs("article",{className:`bubble ${s.role}`,style:{animationDelay:`${i*.04}s`},children:[e.jsx("div",{className:"content",children:d?e.jsx(E,{speed:22,children:s.content}):s.content}),s.crisis&&e.jsxs("div",{className:"crisis-actions",children:[e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral btn-sm",children:"📞 Llamar 800 290 0024"}),e.jsx(S,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver opciones"})]})]},i)}),a&&e.jsx("article",{className:"bubble assistant",children:e.jsxs("div",{className:"content typing",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})}),e.jsx("div",{ref:c})]}),x&&e.jsx("div",{className:"chat-error",children:x}),l.length<=1&&e.jsxs("div",{className:"suggestions",children:[e.jsx("small",{children:"O empieza con:"}),I.map(s=>e.jsx("button",{className:"sg",onClick:()=>f(s),disabled:a,children:s},s))]}),e.jsxs("form",{className:"chat-input",onSubmit:s=>{s.preventDefault(),f()},children:[e.jsx("input",{type:"text",value:n,onChange:s=>b(s.target.value),placeholder:"Escribe lo que sientes…",maxLength:1e3,disabled:a}),e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:a||!n.trim(),children:a?"…":"Enviar"})]}),e.jsx("p",{className:"note text-center mt-2",children:e.jsxs("small",{children:["Esta conversación es anónima pero puede ser auditada por el equipo del programa. Si estás en crisis, llama directamente a ",e.jsx("a",{href:"tel:8002900024",children:"800 290 0024"}),"."]})})]})})]}),e.jsx("style",{children:`
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
          animation: bubblePop 0.4s cubic-bezier(.4, 1.4, .6, 1) both;
          transform-origin: bottom left;
        }
        .bubble.user { transform-origin: bottom right; }
        @keyframes bubblePop {
          0%   { opacity: 0; transform: translateY(8px) scale(0.7); }
          70%  { opacity: 1; transform: translateY(0)   scale(1.04); }
          100% { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bubble { animation: none; }
        }
        .bubble.user {
          align-self: flex-end;
          background: linear-gradient(135deg, var(--c-azul-800), var(--c-azul-700));
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 14px rgba(16,36,62,0.18);
        }
        .bubble.assistant {
          align-self: flex-start;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-bottom-left-radius: 4px;
          box-shadow: 0 4px 14px rgba(108,80,124,0.08);
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
      `})]}):null}export{q as default};
