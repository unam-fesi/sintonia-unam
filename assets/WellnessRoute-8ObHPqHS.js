import{u as L,s as c,j as e,b as $,S as W,d as G}from"./index-_3iXpDrL.js";import{b as M,r as p,L as y}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";const B={respiracion:"🌬",movimiento:"🏃",social:"🤝",arte:"🎨",sueno:"🌙",sustentabilidad:"🌿",reflexion:"📓",comunidad:"👥",flexible:"✨"};function Y(){var S,R,z,C,E;const{student:d}=L(),O=M(),[n,f]=p.useState(null),[T,v]=p.useState(!0),[u,b]=p.useState(!1),[g,h]=p.useState({}),[j,_]=p.useState(null);p.useEffect(()=>{if(!(d!=null&&d.code)){O("/mi-historia",{state:{from:"/ruta"}});return}D()},[d==null?void 0:d.code]);async function D(){v(!0);const{data:s}=await c.from("wellness_routes").select("*").eq("anonymous_code",d.code).order("started_at",{ascending:!1}).limit(1).maybeSingle();if(s){f(s);const{data:a}=await c.from("wellness_route_progress").select("*").eq("route_id",s.id),r={};for(const t of a||[])r[`${t.day}-${t.activity_index}`]=t.done;h(r)}v(!1)}async function x(s){b(!0),_(null);try{const a=JSON.parse(sessionStorage.getItem(G.RESULT)||"null"),r={anonymous_code:d.code,session_id:(a==null?void 0:a.session_id)||null,duration_days:s,general_level:(a==null?void 0:a.general_level)||"moderado",dimensions:(a==null?void 0:a.dimensions)||{},top_attention_areas:(a==null?void 0:a.top_attention_areas)||[],force_regenerate:!!n},{data:t,error:l}=await c.functions.invoke("generate-wellness-route",{body:r});if(l){let i=l.message||"Error desconocido";try{const o=l.context;if(o!=null&&o.json){const m=await o.json();i=m.error||m.detail||i}else o!=null&&o.text?i=await o.text():o!=null&&o.body&&(i=JSON.stringify(o.body))}catch{}throw new Error(i)}if(t!=null&&t.error)throw new Error(`${t.error}${t.detail?": "+t.detail:""}`);f(t.route),h({})}catch(a){_(a.message||"No pudimos generar tu ruta.")}finally{b(!1)}}async function q(s,a,r){const t=`${s}-${a}`,l=!r;if(h(i=>({...i,[t]:l})),await c.from("wellness_route_progress").upsert({route_id:n.id,day:s,activity_index:a,done:l,done_at:l?new Date().toISOString():null},{onConflict:"route_id,day,activity_index"}),l&&s===1&&await c.from("student_achievements").upsert({anonymous_code:d.code,achievement_key:"first_day_route"}),l){const i=n.plan.days.reduce((m,I)=>m+I.activities.length,0);Object.values({...g,[t]:l}).filter(Boolean).length===i&&(await c.from("student_achievements").upsert({anonymous_code:d.code,achievement_key:n.duration_days===7?"seven_day_route":"fourteen_day_route"}),await c.from("wellness_routes").update({completed_at:new Date().toISOString()}).eq("id",n.id))}}if(T)return e.jsx("div",{className:"spinner",style:{margin:"80px auto"}});if(!n)return e.jsx("section",{className:"section",children:e.jsx("div",{className:"container",style:{maxWidth:620},children:e.jsxs("div",{className:"panel text-center",children:[e.jsx("span",{className:"tag sage",children:"Ruta de bienestar"}),e.jsx("h1",{className:"mt-2",children:"Tu plan de cuidado personalizado"}),e.jsxs("p",{className:"lede",children:["Pum-AI puede generarte una ruta de actividades pequeñas y accesibles para los próximos",e.jsx("strong",{children:" 7 o 14 días"}),", basada en tu evaluación más reciente."]}),j&&e.jsx("div",{className:"login-error mt-2",children:j}),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:20},children:[e.jsx("button",{className:"btn btn-primary btn-lg",onClick:()=>x(7),disabled:u,children:u?"Generando…":"7 días — Empezar"}),e.jsx("button",{className:"btn btn-gold btn-lg",onClick:()=>x(14),disabled:u,children:"14 días — Más profundo"})]}),e.jsxs("p",{className:"note mt-3",children:["Si aún no has hecho el test, te recomiendo ",e.jsx(y,{to:"/consentimiento",children:"empezar por ahí"})," ","para que la ruta sea más personalizada."]})]})})});const N=((R=(S=n.plan)==null?void 0:S.days)==null?void 0:R.reduce((s,a)=>{var r;return s+(((r=a.activities)==null?void 0:r.length)||0)},0))||1,w=Object.values(g).filter(Boolean).length,k=Math.round(w/N*100),A=!!n.completed_at;return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:880},children:[e.jsx($,{variant:"blurIn",children:e.jsxs("header",{className:"panel",style:{background:"linear-gradient(135deg, var(--c-azul-100), var(--c-salvia-100))"},children:[e.jsx("span",{className:"tag mint",children:"Tu ruta"}),e.jsx("h1",{className:"mt-2",children:((z=n.plan)==null?void 0:z.title)||`Ruta de ${n.duration_days} días`}),e.jsx("p",{className:"lede",children:(C=n.plan)==null?void 0:C.summary}),e.jsx("div",{className:"progress-bar mt-3",children:e.jsx("span",{style:{width:`${k}%`}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:8},children:[e.jsxs("small",{className:"note",children:[w," de ",N," actividades"]}),e.jsxs("small",{className:"note",children:[k,"%"]})]}),A&&e.jsxs("div",{className:"completed-badge",children:["🎉 Ruta completada el ",new Date(n.completed_at).toLocaleDateString("es-MX")]}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>x(n.duration_days),disabled:u,children:u?"Regenerando…":"🔄 Regenerar ruta"}),e.jsx(y,{to:"/check-in",className:"btn btn-primary btn-sm",children:"📝 Hacer check-in"})]})]})}),e.jsx("div",{className:"days-list mt-3",children:(((E=n.plan)==null?void 0:E.days)||[]).map((s,a)=>e.jsx($,{variant:"slideUp",delay:Math.min(.5,a*.06),children:e.jsxs("article",{className:"day-card",children:[e.jsxs("header",{children:[e.jsxs("span",{className:"day-num",children:["Día ",s.day]}),e.jsx("h3",{children:s.focus})]}),e.jsx("ul",{className:"activities",children:(s.activities||[]).map((r,t)=>{const l=`${s.day}-${t}`,i=!!g[l];return e.jsxs("li",{className:`activity ${i?"done":""}`,children:[e.jsx("button",{className:"check",onClick:()=>q(s.day,t,i),"aria-label":i?"Desmarcar":"Completar",children:i?"✓":""}),e.jsxs("div",{className:"act-body",children:[e.jsxs("strong",{children:[B[r.category]||"✨"," ",r.title]}),e.jsx("p",{children:r.detail}),e.jsxs("small",{children:[r.time&&e.jsxs("span",{children:["🕐 ",r.time]}),r.duration_min&&e.jsxs("span",{children:["⏱ ",r.duration_min," min"]})]})]})]},t)})})]})},s.day))}),e.jsxs(W,{variant:"gold",children:[e.jsx("strong",{children:"Recuerda:"})," esta ruta es orientativa. Si no logras hacer alguna actividad, no es un fracaso — vuelve mañana. Si necesitas apoyo profesional,"," ",e.jsx(y,{to:"/apoyo",children:"aquí están las rutas de canalización"}),"."]})]}),e.jsx("style",{children:`
        .login-error { background: var(--c-coral-100); color: #93362A; padding: 10px 14px; border-radius: 12px; }
        .progress-bar {
          height: 12px;
          background: rgba(255,255,255,0.5);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-bar > span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--c-azul-800), var(--c-oro-600));
          border-radius: 999px;
          transition: width 0.4s;
        }
        .completed-badge {
          margin-top: 12px;
          padding: 10px 14px;
          background: var(--c-oro-600);
          color: var(--c-azul-800);
          border-radius: 12px;
          font-weight: 700;
          text-align: center;
        }

        .days-list { display: grid; gap: 14px; }
        .day-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px 22px;
        }
        .day-card header { display: flex; gap: 12px; align-items: baseline; margin-bottom: 8px; }
        .day-num {
          font-family: var(--ff-serif);
          font-weight: 800;
          color: var(--c-oro-600);
          font-size: 0.86rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .day-card h3 { color: var(--c-azul-800); margin: 0; }

        .activities { list-style: none; padding: 0; display: grid; gap: 8px; margin: 0; }
        .activity {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 12px;
          align-items: start;
          padding: 12px;
          background: var(--c-marfil);
          border-radius: 10px;
        }
        .activity.done { background: var(--c-salvia-100); }
        .activity.done .act-body strong, .activity.done .act-body p { text-decoration: line-through; opacity: 0.7; }
        .check {
          width: 26px; height: 26px;
          border-radius: 8px;
          border: 2px solid var(--c-borde);
          background: #fff;
          cursor: pointer;
          font-weight: 800;
          color: var(--c-salvia-600);
          display: grid; place-items: center;
        }
        .activity.done .check {
          background: var(--c-salvia-600);
          color: #fff;
          border-color: var(--c-salvia-600);
        }
        .act-body strong { color: var(--c-azul-800); display: block; }
        .act-body p { margin: 4px 0; font-size: 0.92rem; color: var(--c-texto-soft); }
        .act-body small { color: var(--c-gris); font-size: 0.78rem; display: flex; gap: 10px; }
      `})]})}export{Y as default};
