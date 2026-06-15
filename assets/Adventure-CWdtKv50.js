import{u as y,s as i,j as e}from"./index-OEocqfh1.js";import{b as w,r as u,L as N}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";function L(){const{student:a}=y(),l=w(),[n,f]=u.useState([]),[v,b]=u.useState({}),[m,j]=u.useState({checkins:0,routes:0}),[_,p]=u.useState(!0);u.useEffect(()=>{if(!(a!=null&&a.code)){l("/mi-historia",{state:{from:"/aventura"}});return}x()},[a==null?void 0:a.code]);async function x(){p(!0);const{data:s}=await i.from("game_events").select("*, clues:game_clues(*)").eq("active",!0).lte("starts_at",new Date().toISOString()).gte("ends_at",new Date().toISOString()).order("starts_at");f(s||[]);const{data:t}=await i.from("game_progress").select("*").eq("anonymous_code",a.code),o={};for(const d of t||[])o[d.event_id]=d;b(o);const[{count:c},{count:r}]=await Promise.all([i.from("weekly_checkins").select("*",{count:"exact",head:!0}).eq("anonymous_code",a.code),i.from("wellness_routes").select("*",{count:"exact",head:!0}).eq("anonymous_code",a.code).not("completed_at","is",null)]);j({checkins:c??0,routes:r??0}),p(!1)}function h(s){if(!s.unlock_after)return!0;const[t,o]=s.unlock_after.split(":"),c=parseInt(o)||0;return t==="checkin_count"?m.checkins>=c:t==="wellness_route_done"?m.routes>=1:t==="always"}async function k(s){confirm("¿Lo encontraste? Solo confírmalo si realmente fuiste al lugar.")&&(await i.from("game_progress").upsert({anonymous_code:a.code,event_id:s,found_at:new Date().toISOString()},{onConflict:"anonymous_code,event_id"}),await i.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:`adventure_${s}`}),x())}return a!=null&&a.code?_?e.jsx("div",{className:"spinner",style:{margin:"80px auto"}}):e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:920},children:[e.jsxs("header",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag coral",children:"Aventura"}),e.jsx("h1",{className:"mt-2",children:"🗺 Búsqueda del Tesoro AURA"}),e.jsx("p",{className:"lede",children:"Pum-AI ha escondido objetos especiales en el campus. Cada check-in y actividad de cuidado te desbloquea una pista. Caminar, observar y descubrir es ya un acto de bienestar."})]}),n.length===0?e.jsxs("div",{className:"panel text-center mt-3",children:[e.jsx("h2",{children:"No hay aventuras activas en este momento"}),e.jsx("p",{className:"lede",children:"Pronto tu equipo de AURA publicará una nueva ruta misteriosa."}),e.jsx("p",{className:"note",children:"Mientras tanto, sigue acumulando check-ins. Cada uno se contará para futuras aventuras."})]}):n.map(s=>{const t=v[s.id],o=!!(t!=null&&t.found_at),c=[...s.clues||[]].sort((r,d)=>r.clue_order-d.clue_order);return e.jsxs("article",{className:"adv-card",children:[e.jsxs("header",{children:[e.jsx("h2",{children:s.title}),e.jsxs("small",{children:["Termina: ",new Date(s.ends_at).toLocaleDateString("es-MX")]})]}),e.jsx("p",{className:"lede",children:s.description}),s.reward_label&&e.jsxs("div",{className:"reward",children:["🎁 ",e.jsx("strong",{children:"Recompensa:"})," ",s.reward_label]}),o?e.jsxs("div",{className:"found-badge",children:["🎉 ¡Lo encontraste el ",new Date(t.found_at).toLocaleDateString("es-MX"),"!"]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"clues",children:c.map((r,d)=>{const g=h(r);return e.jsxs("div",{className:`clue ${g?"open":"locked"}`,children:[e.jsx("div",{className:"clue-num",children:r.clue_order}),e.jsx("div",{children:g?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"riddle",children:r.riddle}),r.hint&&e.jsxs("small",{children:["💡 ",r.hint]})]}):e.jsxs("small",{children:["🔒 Desbloquea con: ",S(r.unlock_after)]})})]},r.id)})}),c.every(h)&&e.jsx("button",{className:"btn btn-coral btn-lg mt-3",onClick:()=>k(s.id),children:"✨ Lo encontré"})]})]},s.id)}),e.jsxs("div",{className:"hint-stats mt-3",children:[e.jsxs("span",{children:["📝 Check-ins: ",e.jsx("strong",{children:m.checkins})]}),e.jsxs("span",{children:["🛤 Rutas completadas: ",e.jsx("strong",{children:m.routes})]}),e.jsx(N,{to:"/check-in",className:"btn btn-ghost btn-sm",children:"Hacer check-in"})]})]}),e.jsx("style",{children:`
        .adv-card {
          background: linear-gradient(135deg, var(--c-coral-100), var(--c-oro-100));
          border: 1px solid var(--c-oro-600);
          border-radius: var(--r-xl);
          padding: 24px 28px;
          margin-top: 16px;
        }
        .adv-card header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
        .adv-card h2 { margin: 0; }
        .adv-card small { color: var(--c-gris); }
        .reward {
          background: var(--c-oro-600);
          color: var(--c-azul-800);
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 0.94rem;
          margin: 12px 0;
        }
        .found-badge {
          background: var(--c-salvia-100);
          color: #2F8770;
          padding: 14px 18px;
          border-radius: 12px;
          font-weight: 700;
          text-align: center;
          margin: 12px 0;
        }
        .clues { display: grid; gap: 10px; margin-top: 14px; }
        .clue {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.7);
          border-radius: 10px;
          align-items: start;
        }
        .clue.locked { opacity: 0.55; }
        .clue-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--c-azul-800);
          color: var(--c-oro-400);
          display: grid; place-items: center;
          font-weight: 800;
        }
        .clue.locked .clue-num { background: var(--c-gris); }
        .riddle { font-family: var(--ff-serif); font-style: italic; color: var(--c-azul-800); margin: 0; }
        .clue small { color: var(--c-texto-soft); font-size: 0.86rem; display:block; margin-top: 4px; }

        .hint-stats {
          display: flex; gap: 14px; align-items: center; flex-wrap: wrap;
          background: var(--c-marfil);
          border-radius: 12px;
          padding: 12px 16px;
        }
        .hint-stats span { font-size: 0.92rem; }
      `})]}):null}function S(a){if(!a)return"—";const[l,n]=a.split(":");return l==="checkin_count"?`${n} check-in${n==="1"?"":"s"} semanal${n==="1"?"":"es"}`:l==="wellness_route_done"?"completar una ruta de bienestar":l==="always"?"disponible":a}export{L as default};
