import{u,s as x,j as a}from"./index-wJsHvUnp.js";import{b as g,r as i}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";const b=[{id:"all",label:"Todo",icon:"✨"},{id:"breathing",label:"Respiración",icon:"🌬"},{id:"sound",label:"Sonidos",icon:"🎧"},{id:"video",label:"Videos",icon:"🎬"},{id:"dictionary",label:"Diccionario",icon:"📖"},{id:"quote",label:"Frases",icon:"💭"},{id:"challenge",label:"Retos",icon:"🎯"}];function S(){const{student:e}=u(),o=g(),[s,c]=i.useState([]),[t,d]=i.useState("all"),[p,n]=i.useState(!0);i.useEffect(()=>{if(!(e!=null&&e.code)){o("/mi-historia",{state:{from:"/biblioteca"}});return}m()},[e==null?void 0:e.code]);async function m(){n(!0);const{data:r}=await x.from("student_library").select("*").eq("active",!0).order("category").order("title");c(r||[]),n(!1)}if(!(e!=null&&e.code))return null;const l=t==="all"?s:s.filter(r=>r.category===t);return a.jsxs("section",{className:"section",children:[a.jsxs("div",{className:"container",style:{maxWidth:980},children:[a.jsxs("header",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[a.jsx("span",{className:"tag sage",children:"Biblioteca"}),a.jsx("h1",{className:"mt-2",children:"Tu rincón de bienestar"}),a.jsx("p",{className:"lede",children:"Audio, video, ejercicios, lectura. Recursos curados para acompañarte en momentos de tranquilidad, concentración o desahogo."})]}),a.jsx("div",{className:"filters mt-4",children:b.map(r=>a.jsxs("button",{className:`chip ${t===r.id?"active":""}`,onClick:()=>d(r.id),children:[a.jsx("span",{children:r.icon})," ",r.label]},r.id))}),p?a.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):a.jsx("div",{className:"lib-grid mt-3",children:l.length===0?a.jsx("p",{className:"note",children:"Aún no hay contenido en esta categoría. Tu equipo de AURA está agregando más."}):l.map(r=>a.jsx(y,{item:r},r.id))})]}),a.jsx("style",{children:`
        .filters { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 8px 14px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .lib-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
      `})]})}function f(e){return e?/^(https?:|data:|blob:)/.test(e)?e:"/aura-fesi/"+e.replace(/^\/+/,""):""}function h(e){if(!e)return"";const o=Math.floor(e/60),s=e%60;return`${o}:${String(s).padStart(2,"0")}`}function y({item:e}){var s;const o=f(e.media_url);return a.jsxs("article",{className:"lib-item",children:[a.jsxs("header",{children:[a.jsxs("span",{className:"cat-badge",children:[v(e.category)," ",j(e.category)]}),e.duration_sec&&a.jsxs("small",{children:["⏱ ",h(e.duration_sec)]})]}),a.jsx("h3",{children:e.title}),e.body&&a.jsx("p",{children:e.body}),((s=e.meta)==null?void 0:s.recommended_state)&&a.jsxs("p",{style:{fontSize:"0.84rem",color:"var(--c-gris)",fontStyle:"italic"},children:["💡 ",a.jsx("strong",{children:"Recomendado para:"})," ",e.meta.recommended_state]}),e.meta&&(e.meta.tempo||e.meta.key)&&a.jsxs("div",{className:"audio-params",children:[e.meta.tempo&&a.jsxs("small",{children:["🎵 ",e.meta.tempo]}),e.meta.key&&a.jsxs("small",{children:["♪ ",e.meta.key]}),e.meta.energy&&a.jsxs("small",{children:["⚡ Energía ",e.meta.energy.toLowerCase()]})]}),e.media_url&&(e.category==="video"?a.jsx("video",{controls:!0,src:o,style:{width:"100%",borderRadius:8,marginTop:8}}):e.category==="sound"?a.jsx("audio",{controls:!0,preload:"none",src:o,style:{width:"100%",marginTop:8}}):a.jsx("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Abrir recurso →"})),a.jsx("style",{jsx:!0,children:`
        .lib-item {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          display: flex; flex-direction: column;
        }
        .lib-item header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .cat-badge {
          background: var(--c-azul-100); color: var(--c-azul-800);
          padding: 3px 10px; border-radius: 999px;
          font-size: 0.74rem; font-weight: 700;
        }
        .lib-item small { color: var(--c-gris); font-size: 0.78rem; }
        .lib-item h3 { color: var(--c-azul-800); margin: 4px 0; font-size: 1rem; }
        .lib-item p { color: var(--c-texto-soft); font-size: 0.92rem; margin: 0 0 8px; }
        .audio-params { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0; padding: 6px 0; border-top: 1px dashed var(--c-borde-soft); }
        .audio-params small { background: var(--c-azul-100); padding: 2px 8px; border-radius: 999px; font-size: 0.74rem; color: var(--c-azul-800); }
      `})]})}function j(e){return{breathing:"Respiración",sound:"Sonido",video:"Video",dictionary:"Emoción",quote:"Frase",challenge:"Reto"}[e]||e}function v(e){return{breathing:"🌬",sound:"🎧",video:"🎬",dictionary:"📖",quote:"💭",challenge:"🎯"}[e]||"✨"}export{S as default};
