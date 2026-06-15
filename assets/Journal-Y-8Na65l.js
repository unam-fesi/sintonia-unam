import{u as L,s as p,j as e}from"./index-DwWWv2XG.js";import{b as F,r as o,L as y}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";const T=["Calma","Alegría","Gratitud","Cansancio","Ansiedad","Tristeza","Enojo","Confusión","Esperanza"];function A(a){return a?/^(https?:|data:|blob:)/.test(a)?a:"/aura-fesi/"+a.replace(/^\/+/,""):""}function U(){const{student:a}=L(),t=F(),[d,u]=o.useState([]),[l,g]=o.useState(""),[h,v]=o.useState(""),[E,j]=o.useState(!0),[N,k]=o.useState(!1),[n,m]=o.useState(null),[x,w]=o.useState(!1),z=o.useRef(null);o.useEffect(()=>{if(!(a!=null&&a.code)){t("/mi-historia",{state:{from:"/diario"}});return}b()},[a==null?void 0:a.code]),o.useEffect(()=>{(n||x)&&requestAnimationFrame(()=>{var s;(s=z.current)==null||s.scrollIntoView({behavior:"smooth",block:"center"})})},[n,x]);async function b(){j(!0);const{data:s}=await p.from("student_journal").select("id, entry, emotion_tag, created_at").eq("anonymous_code",a.code).order("created_at",{ascending:!1}).limit(40);u(s||[]),j(!1)}async function _(){if(!l.trim())return;k(!0);const s=l.trim(),c=h||null;await p.from("student_journal").insert({anonymous_code:a.code,entry:s,emotion_tag:c}),g(""),v(""),await b(),k(!1),S(s,c)}async function S(s,c){w(!0),m(null);let f=!1;try{const{data:r,error:i}=await p.functions.invoke("journal-suggest",{body:{anonymous_code:a.code,entry:s,emotion_tag:c}});!i&&r&&!r.error?r.crisis?m({kind:"crisis",message:r.message}):r.suggestion?m({kind:"resource",item:r.suggestion,reason:r.reason,fallback:!!r.fallback}):f=!0:(f=!0,(i||r!=null&&r.error)&&console.warn("[journal-suggest] error",i||r.error))}catch(r){console.warn("[journal-suggest] exception",r),f=!0}if(f)try{const r=R(c),{data:i}=await p.from("student_library").select("id, category, title, body, media_url, duration_sec, meta").eq("active",!0).in("category",r).limit(40);if(i&&i.length>0){const q=i[Math.floor(Math.random()*i.length)];m({kind:"resource",item:q,reason:V(c),fallback:!0})}}catch(r){console.warn(r)}w(!1)}async function C(s){confirm("¿Eliminar esta entrada?")&&(await p.from("student_journal").delete().eq("id",s).eq("anonymous_code",a.code),b())}return a!=null&&a.code?e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:720},children:[e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag sage",children:"Diario"}),e.jsx("h1",{className:"mt-2",children:"Una línea sobre cómo te sientes hoy"}),e.jsx("p",{className:"lede",children:"Escribir aunque sea una frase ayuda a procesar lo que sientes. No tiene que ser perfecto."}),e.jsx("div",{className:"field",children:e.jsx("input",{value:l,onChange:s=>g(s.target.value),placeholder:"Hoy me sentí…",maxLength:240,onKeyDown:s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),_())}})}),e.jsxs("div",{className:"emo-pills",children:[e.jsx("small",{children:"Emoción dominante (opcional):"}),T.map(s=>e.jsx("button",{className:`emo-pill ${h===s?"on":""}`,onClick:()=>v(h===s?"":s),children:s},s))]}),e.jsx("button",{className:"btn btn-primary mt-2",disabled:N||!l.trim(),onClick:_,children:N?"Guardando…":"Agregar entrada"}),(x||n)&&e.jsxs("div",{className:"suggest-area mt-3",ref:z,children:[x&&e.jsxs("div",{className:"suggest-loading",children:[e.jsx("div",{className:"spinner small"}),e.jsx("span",{children:"Pum-AI está eligiendo algo para ti…"})]}),(n==null?void 0:n.kind)==="crisis"&&e.jsxs("div",{className:"suggest-card crisis",children:[e.jsx("strong",{children:n.message}),e.jsxs("p",{children:["Te invitamos a llamar a la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," y revisar las opciones en /apoyo."]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:8},children:[e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral btn-sm",children:"📞 Llamar"}),e.jsx(y,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver apoyos"})]})]}),(n==null?void 0:n.kind)==="resource"&&e.jsx(D,{item:n.item,reason:n.reason,onDismiss:()=>m(null)})]})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsxs("h2",{children:["Tus entradas (",d.length,")"]}),E?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):d.length===0?e.jsx("p",{className:"note",children:"Aún no has escrito nada. ¡Empieza con una línea!"}):e.jsx("ul",{className:"entry-list",children:d.map(s=>e.jsxs("li",{className:"entry-item",children:[e.jsxs("div",{className:"entry-meta",children:[e.jsx("small",{children:new Date(s.created_at).toLocaleString("es-MX",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}),s.emotion_tag&&e.jsx("span",{className:"emo-tag",children:s.emotion_tag}),e.jsx("button",{className:"del-btn",onClick:()=>C(s.id),title:"Eliminar",children:"🗑"})]}),e.jsxs("p",{children:['"',s.entry,'"']})]},s.id))})]}),e.jsx("p",{className:"text-center mt-3",children:e.jsx(y,{to:"/mi-historia",className:"note",children:"← Volver a mi historia"})})]}),e.jsx("style",{children:`
        .suggest-area { animation: fadeInUp 0.3s ease; }
        .suggest-loading {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: var(--c-azul-100);
          border-radius: 12px;
          color: var(--c-azul-800);
          font-size: 0.92rem;
        }
        .spinner.small { width: 18px; height: 18px; border-width: 2px; margin: 0; }
        .suggest-card {
          background: linear-gradient(135deg, var(--c-oro-100), var(--c-salvia-100));
          border: 1px solid var(--c-oro-600);
          border-radius: var(--r-md);
          padding: 16px 18px;
          position: relative;
        }
        .suggest-card.crisis {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border-color: var(--c-coral-500);
          color: #5C2018;
        }
        .suggest-card.crisis strong { color: #93362A; display: block; margin-bottom: 4px; }
        .suggest-card .badge {
          display: inline-block;
          background: var(--c-azul-800); color: var(--c-oro-400);
          padding: 3px 10px; border-radius: 999px;
          font-size: 0.74rem; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .suggest-card h4 { color: var(--c-azul-800); margin: 8px 0 4px; font-size: 1.05rem; }
        .suggest-card p { margin: 4px 0; font-size: 0.92rem; color: var(--c-texto-soft); }
        .suggest-card .reason {
          font-style: italic;
          background: rgba(255,255,255,0.7);
          padding: 10px 12px;
          border-radius: 10px;
          margin: 8px 0;
          color: var(--c-azul-800);
        }
        .suggest-card .dismiss {
          position: absolute; top: 8px; right: 8px;
          background: transparent; border: 0; cursor: pointer;
          font-size: 0.92rem; color: var(--c-gris);
        }
        .emo-pills { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin: 8px 0 4px; }
        .emo-pills small { color: var(--c-gris); font-size: 0.84rem; margin-right: 6px; }
        .emo-pill {
          padding: 5px 10px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.82rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .emo-pill.on { background: var(--c-salvia-400); color: #1F3829; border-color: var(--c-salvia-600); }

        .entry-list { list-style: none; padding: 0; display: grid; gap: 10px; }
        .entry-item {
          padding: 14px 16px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 12px;
        }
        .entry-meta { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
        .entry-meta small { color: var(--c-gris); font-size: 0.78rem; flex: 1; }
        .emo-tag {
          background: var(--c-salvia-100);
          color: #2F8770;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .del-btn {
          background: transparent; border: none; cursor: pointer;
          font-size: 0.86rem; opacity: 0.5;
        }
        .del-btn:hover { opacity: 1; }
        .entry-item p { margin: 0; font-family: var(--ff-serif); font-size: 1.02rem; color: var(--c-azul-800); font-style: italic; }
      `})]}):null}function R(a){const t=(a||"").toLowerCase();return/triste|cansancio|apat|soledad/.test(t)?["sound","breathing","quote"]:/ansie|nerv|estr|enojo|conf/.test(t)?["breathing","sound"]:/calma|gratitud|esperanza|aleg/.test(t)?["challenge","quote","sound"]:["sound","breathing","quote","challenge"]}function V(a){const t=(a||"").toLowerCase();return/triste|cansancio|apat|soledad/.test(t)?"Para acompañarte en este momento sin presión. Solo escucha.":/ansie|nerv|estr/.test(t)?"Esto puede ayudarte a regular el ritmo y soltar un poco la tensión.":/calma|gratitud|esperanza|aleg/.test(t)?"¡Ese estado es valioso! Aprovéchalo con un pequeño reto.":"Quizás esto resuena con cómo te sientes hoy."}function D({item:a,reason:t,onDismiss:d}){var g;const u=A(a.media_url),l={sound:"🎧 Sonido",video:"🎬 Video",breathing:"🌬 Respiración",challenge:"🎯 Reto",quote:"💭 Frase",dictionary:"📖 Emoción"}[a.category]||"✨ Recurso";return e.jsxs("div",{className:"suggest-card",children:[e.jsx("button",{className:"dismiss",onClick:d,"aria-label":"Cerrar",children:"✕"}),e.jsxs("span",{className:"badge",children:["✨ Pum-AI te sugiere · ",l]}),e.jsx("h4",{children:a.title}),a.body&&e.jsx("p",{children:a.body}),t&&e.jsxs("p",{className:"reason",children:['"',t,'"']}),a.media_url&&a.category==="sound"&&e.jsx("audio",{controls:!0,preload:"metadata",src:u,style:{width:"100%",marginTop:6}}),a.media_url&&a.category==="video"&&e.jsx("video",{controls:!0,preload:"metadata",src:u,style:{width:"100%",borderRadius:8,marginTop:6}}),a.media_url&&!["sound","video"].includes(a.category)&&e.jsx("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",style:{marginTop:6},children:"Abrir recurso →"}),((g=a.meta)==null?void 0:g.tempo)&&e.jsxs("small",{style:{display:"block",marginTop:8,color:"var(--c-gris)"},children:["🎵 ",a.meta.tempo," · ",a.meta.energy?`Energía ${a.meta.energy.toLowerCase()}`:""]}),e.jsx("div",{style:{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"},children:e.jsx(y,{to:"/biblioteca",className:"btn btn-ghost btn-sm",children:"Ver más en biblioteca →"})})]})}export{U as default};
