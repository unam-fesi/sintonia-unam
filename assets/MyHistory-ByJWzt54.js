import{s as C,j as e,g as q,c as _,a as L,b as v,C as F,S as A}from"./index-J749e2QC.js";import{r as p,L as g}from"./vendor-react-Be-nUyB0.js";import{I as h}from"./Icon-CGXkFkUv.js";import"./vendor-supabase-J7ITh-P0.js";function M({code:a}){const[s,r]=p.useState({mood:3,level:"moderado",name:null});p.useEffect(()=>{a&&(async()=>{const[{data:n},{data:l}]=await Promise.all([C.from("assessment_sessions").select("general_level").eq("anonymous_code",a).order("created_at",{ascending:!1}).limit(1).maybeSingle(),C.from("weekly_checkins").select("mood").eq("anonymous_code",a).order("created_at",{ascending:!1}).limit(1).maybeSingle()]);r({mood:(l==null?void 0:l.mood)??3,level:(n==null?void 0:n.general_level)??"moderado",name:P(a)})})()},[a]);const t=D(s);return e.jsxs("div",{className:"avatar-card",children:[e.jsxs("div",{className:"avatar-stage",children:[e.jsxs("svg",{viewBox:"0 0 240 240",className:"avatar-svg",role:"img","aria-label":"Tu estado de bienestar",children:[e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"aura-grad",cx:"50%",cy:"55%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:t.color,stopOpacity:"0.32"}),e.jsx("stop",{offset:"55%",stopColor:t.color,stopOpacity:"0.10"}),e.jsx("stop",{offset:"100%",stopColor:t.color,stopOpacity:"0"})]}),e.jsxs("radialGradient",{id:"body-grad",cx:"32%",cy:"28%",r:"78%",children:[e.jsx("stop",{offset:"0%",stopColor:t.colorLight}),e.jsx("stop",{offset:"55%",stopColor:t.color}),e.jsx("stop",{offset:"100%",stopColor:t.colorDark})]}),e.jsx("filter",{id:"body-shadow",x:"-30%",y:"-30%",width:"160%",height:"160%",children:e.jsx("feDropShadow",{dx:"0",dy:"10",stdDeviation:"12",floodColor:"#10243E",floodOpacity:"0.22"})}),e.jsxs("radialGradient",{id:"eye-grad",cx:"35%",cy:"35%",r:"65%",children:[e.jsx("stop",{offset:"0%",stopColor:"#3A4055"}),e.jsx("stop",{offset:"100%",stopColor:"#0F1623"})]})]}),e.jsx("circle",{cx:"120",cy:"125",r:"115",fill:"url(#aura-grad)",className:"aura-pulse"}),s.mood>=5&&e.jsxs("g",{className:"sparkles",children:[e.jsx(E,{cx:200,cy:70,size:6,delay:0}),e.jsx(E,{cx:50,cy:90,size:5,delay:.6}),e.jsx(E,{cx:210,cy:150,size:4,delay:1.2}),e.jsx(E,{cx:30,cy:170,size:5,delay:1.8}),e.jsx(E,{cx:135,cy:40,size:4,delay:.3})]}),s.mood===1&&e.jsxs("g",{className:"zzz",children:[e.jsx("text",{x:"180",y:"60",fontFamily:"Georgia",fontSize:"18",fill:t.color,opacity:"0.7",children:"z"}),e.jsx("text",{x:"195",y:"48",fontFamily:"Georgia",fontSize:"14",fill:t.color,opacity:"0.5",children:"z"})]}),e.jsx("g",{className:"body-breath",filter:"url(#body-shadow)",children:e.jsx("path",{d:t.bodyPath,fill:"url(#body-grad)"})}),e.jsx("ellipse",{cx:"92",cy:"92",rx:"26",ry:"14",fill:"white",opacity:"0.36"}),s.mood>=4&&e.jsxs("g",{className:"blush",children:[e.jsx("ellipse",{cx:"80",cy:"148",rx:"11",ry:"6",fill:"#E8826B",opacity:"0.55"}),e.jsx("ellipse",{cx:"160",cy:"148",rx:"11",ry:"6",fill:"#E8826B",opacity:"0.55"})]}),s.mood>=2?e.jsxs("g",{className:"eyes",children:[e.jsx("ellipse",{cx:"93",cy:"118",rx:"11",ry:s.mood===2?6:13,fill:"url(#eye-grad)"}),e.jsx("ellipse",{cx:"147",cy:"118",rx:"11",ry:s.mood===2?6:13,fill:"url(#eye-grad)"}),e.jsx("circle",{cx:"97",cy:"113",r:"4",fill:"white",opacity:"0.95"}),e.jsx("circle",{cx:"151",cy:"113",r:"4",fill:"white",opacity:"0.95"}),e.jsx("circle",{cx:"89",cy:"121",r:"2",fill:"white",opacity:"0.6"}),e.jsx("circle",{cx:"143",cy:"121",r:"2",fill:"white",opacity:"0.6"}),s.mood>=3&&e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M82 105 L 86 100",stroke:"#0F1623",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("path",{d:"M93 100 L 93 96",stroke:"#0F1623",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("path",{d:"M104 105 L 100 100",stroke:"#0F1623",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("path",{d:"M136 105 L 140 100",stroke:"#0F1623",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("path",{d:"M147 100 L 147 96",stroke:"#0F1623",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("path",{d:"M158 105 L 154 100",stroke:"#0F1623",strokeWidth:"2",strokeLinecap:"round"})]})]}):e.jsxs("g",{children:[e.jsx("path",{d:"M82 120 Q 93 128 104 120",stroke:"#0F1623",strokeWidth:"3.5",fill:"none",strokeLinecap:"round"}),e.jsx("path",{d:"M136 120 Q 147 128 158 120",stroke:"#0F1623",strokeWidth:"3.5",fill:"none",strokeLinecap:"round"})]}),e.jsx("g",{className:"mouth",children:t.mouth})]}),e.jsx("div",{className:`mood-chip mood-${s.mood}`,children:W(s.mood)})]}),e.jsx("p",{className:"avatar-greeting",children:t.greeting}),s.name&&e.jsxs("p",{className:"avatar-name",children:["Tu compañero ",s.name]}),e.jsx("style",{children:`
        .avatar-card {
          background: linear-gradient(160deg, #ffffff, var(--c-marfil));
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          padding: 22px 18px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .avatar-stage {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto;
        }
        .avatar-svg { width: 100%; height: 100%; }

        .body-breath { transform-origin: center; animation: breathe 4.2s ease-in-out infinite; }
        @keyframes breathe {
          0%, 100% { transform: translateY(0)    scaleY(1); }
          50%      { transform: translateY(-3px) scaleY(1.03); }
        }
        .aura-pulse { transform-origin: center; animation: aura 6s ease-in-out infinite; }
        @keyframes aura {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%      { transform: scale(1.08); opacity: 0.85; }
        }

        .eyes { transform-origin: 120px 118px; animation: blink 6s steps(1, end) infinite; }
        @keyframes blink {
          0%, 92%, 100% { transform: scaleY(1); }
          94%           { transform: scaleY(0.1); }
          96%           { transform: scaleY(1); }
        }

        .sparkles g { animation: sparkleFloat 4s ease-in-out infinite; }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0)  scale(0.85); opacity: 0.6; }
          50%      { transform: translateY(-5px) scale(1.1); opacity: 1; }
        }

        .zzz text { animation: floatUp 3s ease-in-out infinite; }
        @keyframes floatUp {
          0%   { transform: translateY(0);    opacity: 0; }
          25%  { opacity: 0.7; }
          100% { transform: translateY(-30px); opacity: 0; }
        }

        .mood-chip {
          position: absolute;
          bottom: -6px; left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          padding: 4px 14px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: var(--sh-sm);
        }
        .mood-chip.mood-1 { color: #6E5BA0; border-color: var(--c-lavanda-500); }
        .mood-chip.mood-2 { color: #4FA88E; border-color: var(--c-salvia-400); }
        .mood-chip.mood-3 { color: #7B5E14; border-color: var(--c-oro-600); }
        .mood-chip.mood-4 { color: #2F8770; border-color: var(--c-salvia-600); }
        .mood-chip.mood-5 { color: #93362A; border-color: var(--c-coral-500); }

        .avatar-greeting {
          font-family: var(--ff-serif);
          font-size: 1.05rem;
          color: var(--c-azul-800);
          margin: 18px 0 4px;
          font-style: italic;
        }
        .avatar-name {
          color: var(--c-gris);
          font-size: 0.78rem;
          margin: 0;
          letter-spacing: 0.03em;
        }
      `})]})}function D({mood:a,level:s}){const r=Number(a)||3,t={1:{color:"#A98FD9",light:"#D7C7F0",dark:"#6E5BA0"},2:{color:"#9CC4AB",light:"#C9E1D2",dark:"#5A8770"},3:{color:"#E5C868",light:"#F4E3A8",dark:"#B08F1F"},4:{color:"#8FB8A0",light:"#BFD9C8",dark:"#4FA88E"},5:{color:"#F0A87A",light:"#FBD3B8",dark:"#D26B53"}},n=t[r]||t[3];let l=1;s==="prioritario"?l=.96:s==="bajo"&&(l=1.02);const d=B(120,130,78,75*l),i=a>=5?e.jsx("path",{d:"M85 158 Q 120 192 155 158",stroke:"#0F1623",strokeWidth:"4.2",fill:"none",strokeLinecap:"round"}):a===4?e.jsx("path",{d:"M92 162 Q 120 178 148 162",stroke:"#0F1623",strokeWidth:"4",fill:"none",strokeLinecap:"round"}):a===3?e.jsx("path",{d:"M100 165 Q 120 172 140 165",stroke:"#0F1623",strokeWidth:"4",fill:"none",strokeLinecap:"round"}):a===2?e.jsx("path",{d:"M100 168 L 140 168",stroke:"#0F1623",strokeWidth:"4",fill:"none",strokeLinecap:"round"}):e.jsx("path",{d:"M100 172 Q 120 162 140 172",stroke:"#0F1623",strokeWidth:"4",fill:"none",strokeLinecap:"round"}),c={5:"¡Tu energía hoy se siente plena!",4:"Estás en un buen ritmo 🌿",3:"Vas a tu propio ritmo. Respira.",2:"Hoy puedes ir despacito. Está bien.",1:"Permítete descansar 💛"};return{color:n.color,colorLight:n.light,colorDark:n.dark,bodyPath:d,mouth:i,greeting:c[r]||c[3]}}function B(a,s,r,t){const n=[a,s-t],l=[a+r*1.02,s+4],d=[a,s+t],i=[a-r*.98,s-4],c=[a+r*.55,s-t*.95],y=[a+r*1.05,s-t*.45],m=[a+r*1.02,s+t*.5],N=[a+r*.55,s+t*.97],b=[a-r*.55,s+t*.97],k=[a-r*1,s+t*.5],z=[a-r*1.02,s-t*.45],f=[a-r*.55,s-t*.95];return[`M ${n[0]} ${n[1]}`,`C ${c[0]} ${c[1]}, ${y[0]} ${y[1]}, ${l[0]} ${l[1]}`,`C ${m[0]} ${m[1]}, ${N[0]} ${N[1]}, ${d[0]} ${d[1]}`,`C ${b[0]} ${b[1]}, ${k[0]} ${k[1]}, ${i[0]} ${i[1]}`,`C ${z[0]} ${z[1]}, ${f[0]} ${f[1]}, ${n[0]} ${n[1]}`,"Z"].join(" ")}function W(a){const s={5:"✨ Pleno",4:"🌿 Bien",3:"🌤 Neutral",2:"🍃 Bajo",1:"🌙 Cansado"};return s[a]||s[3]}function E({cx:a,cy:s,size:r=5,delay:t=0}){return e.jsxs("g",{transform:`translate(${a} ${s})`,style:{animationDelay:`${t}s`},children:[e.jsx("path",{d:`M0 -${r} L ${r*.3} 0 L 0 ${r} L -${r*.3} 0 Z`,fill:"#C9A227"}),e.jsx("path",{d:`M-${r} 0 L 0 ${r*.3} L ${r} 0 L 0 -${r*.3} Z`,fill:"#E5C868"})]})}function P(a){if(!a)return null;const s=["Sintón","Alma","Lumi","Cielo","Eko","Saya","Nuna","Lía","Astro","Vibra","Calma","Kiko","Pumi","Soto"];let r=0;for(let t=0;t<a.length;t++)r=r*31+a.charCodeAt(t)|0;return s[Math.abs(r)%s.length]}async function $(a){try{if(a!=null&&a.context&&typeof a.context.json=="function"){const s=await a.context.json();if(s!=null&&s.detail)return`${s.error||"Error"} — ${s.detail}`;if(s!=null&&s.error)return s.error}if(a!=null&&a.context&&typeof a.context.text=="function"){const s=await a.context.text();if(s)return s.slice(0,280)}}catch{}return(a==null?void 0:a.message)||null}function O(){const a=q(),[s,r]=p.useState(a!=null&&a.code?"loading":"login"),[t,n]=p.useState((a==null?void 0:a.code)||""),[l,d]=p.useState((a==null?void 0:a.password)||""),[i,c]=p.useState(null),[y,m]=p.useState(null),[N,b]=p.useState(!1);p.useEffect(()=>{a!=null&&a.code&&(async()=>{try{const{data:o,error:j}=await C.functions.invoke("anon-auth",{body:{action:"history",anonymous_code:a.code,password:a.password||""}});if(j)throw j;if(o!=null&&o.error)throw new Error(o.error);c(o),r("history")}catch(o){r("login"),m(o.message)}})()},[]);async function k(){b(!0),m(null);try{const{data:o,error:j}=await C.functions.invoke("anon-auth",{body:{action:"login",anonymous_code:t,password:l}});if(j){const w=await $(j);throw new Error(w||"Edge Function falló")}if(o!=null&&o.error)throw new Error(o.detail?`${o.error} — ${o.detail}`:o.error);const{data:x,error:u}=await C.functions.invoke("anon-auth",{body:{action:"history",anonymous_code:t,password:l}});if(u){const w=await $(u);throw new Error(w||"Edge Function falló")}if(x!=null&&x.error)throw new Error(x.detail?`${x.error} — ${x.detail}`:x.error);c(x),L({code:t,password:l||null}),r("history")}catch(o){console.error("[login] error completo:",o),m(o.message||"Error de inicio de sesión")}finally{b(!1)}}async function z(o,j){b(!0),m(null);const x=X();try{const{data:u,error:w}=await C.functions.invoke("anon-auth",{body:{action:"register",anonymous_code:x,password:j,faculty:o}});if(w){const S=await $(w);throw new Error(S||w.message||"Edge Function falló")}if(u!=null&&u.error)throw new Error(u.detail?`${u.error} — ${u.detail}`:u.error);n(x),L({code:x,password:j||null}),c({created:x}),r("registered")}catch(u){console.error("[register] error completo:",u),m(u.message||"No pudimos crear tu cuenta")}finally{b(!1)}}if(s==="loading")return e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container text-center",style:{maxWidth:520},children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}),e.jsx("p",{className:"lede",children:"Cargando tu rincón…"})]})});async function f(){r("loading"),m(null);try{const{data:o,error:j}=await C.functions.invoke("anon-auth",{body:{action:"history",anonymous_code:t,password:l||""}});if(j)throw j;if(o!=null&&o.error)throw new Error(o.error);c(o),r("history")}catch(o){m(o.message),r("login")}}return s==="history"&&i?e.jsx(R,{data:i,code:t,onLogout:()=>{_(),r("login"),c(null),n(""),d("")}}):s==="registered"?e.jsx(T,{code:t,onContinue:f}):s==="register"?e.jsx(Y,{onRegister:z,onCancel:()=>r("login"),loading:N,err:y}):e.jsxs("section",{className:"section",children:[e.jsx("div",{className:"container",style:{maxWidth:520},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag",children:"Mi historia"}),e.jsx("h1",{className:"mt-2",children:"Consulta tu evolución"}),e.jsxs("p",{className:"lede",children:["Si ya hiciste un test antes y guardaste tu código anónimo (ej. ",e.jsx("code",{children:"SIN-XJS-4278"}),"), ingrésalo para ver tu histórico de evaluaciones, check-ins y diario."]}),y&&e.jsx("div",{className:"login-error",children:y}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Tu código anónimo"}),e.jsx("input",{value:t,onChange:o=>n(o.target.value.toUpperCase()),placeholder:"SIN-XXX-####",style:{fontFamily:"var(--ff-serif)",letterSpacing:"0.05em"}})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Contraseña (si la registraste)"}),e.jsx("input",{type:"password",value:l,onChange:o=>d(o.target.value),placeholder:"(deja vacío si no tienes)"})]}),e.jsx("button",{className:"btn btn-primary",disabled:N||!t,onClick:k,style:{width:"100%"},children:N?"Verificando…":"Entrar"}),e.jsx("div",{className:"divider"}),e.jsxs("p",{className:"text-center",children:[e.jsx("strong",{children:"¿Primera vez?"})," Crea tu código anónimo (sin pedirte datos personales) para empezar a guardar tus check-ins y diario."]}),e.jsx("button",{className:"btn btn-ghost",style:{width:"100%"},onClick:()=>r("register"),children:"Crear mi código anónimo"}),e.jsx("p",{className:"text-center mt-3",children:e.jsx(g,{to:"/",className:"note",children:"← Volver al inicio"})})]})}),e.jsx("style",{children:`
        .login-error {
          background: var(--c-coral-100); color: #93362A;
          padding: 10px 14px; border-radius: 12px; font-size: 0.92rem; margin-bottom: 12px;
        }
      `})]})}function Y({onRegister:a,onCancel:s,loading:r,err:t}){const[n,l]=p.useState(""),[d,i]=p.useState(""),[c,y]=p.useState(""),[m,N]=p.useState(!0),[b,k]=p.useState(null);function z(){if(k(null),m){if(d.length<6)return k("Mínimo 6 caracteres");if(d!==c)return k("Las contraseñas no coinciden")}a(n.trim()||null,m?d:"")}return e.jsx("section",{className:"section",children:e.jsx("div",{className:"container",style:{maxWidth:520},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag sage",children:"Cuenta anónima"}),e.jsx("h1",{className:"mt-2",children:"Crear mi código"}),e.jsxs("p",{className:"lede",children:["Te generaremos un código tipo ",e.jsx("code",{children:"SIN-XXX-####"})," que solo tú conoces.",e.jsx("strong",{children:" No solicitamos nombre, correo ni número de cuenta."})]}),(t||b)&&e.jsx("div",{className:"login-error",children:t||b}),e.jsxs("div",{className:"field",children:[e.jsxs("label",{children:["Facultad o Escuela ",e.jsx("small",{className:"note",children:"(opcional, sirve para reportes anónimos)"})]}),e.jsxs("select",{value:n,onChange:f=>l(f.target.value),children:[e.jsx("option",{value:"",children:"— Prefiero no decir —"}),e.jsx("option",{children:"FES Iztacala"}),e.jsx("option",{children:"FES Cuautitlán"}),e.jsx("option",{children:"FES Aragón"}),e.jsx("option",{children:"FES Acatlán"}),e.jsx("option",{children:"FES Zaragoza"}),e.jsx("option",{children:"Facultad de Filosofía y Letras"}),e.jsx("option",{children:"Facultad de Psicología"}),e.jsx("option",{children:"Facultad de Medicina"}),e.jsx("option",{children:"Facultad de Ingeniería"}),e.jsx("option",{children:"Otra"})]})]}),e.jsx("div",{className:"field",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:m,onChange:f=>N(f.target.checked)})," ","Quiero proteger mi código con una contraseña"]})}),m&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Contraseña"}),e.jsx("input",{type:"password",value:d,onChange:f=>i(f.target.value),minLength:6})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{children:"Confirmar contraseña"}),e.jsx("input",{type:"password",value:c,onChange:f=>y(f.target.value),minLength:6})]})]}),e.jsx("button",{className:"btn btn-primary",disabled:r,onClick:z,style:{width:"100%"},children:r?"Creando…":"Crear mi cuenta anónima"}),e.jsx("button",{className:"btn btn-ghost",onClick:s,style:{width:"100%",marginTop:8},children:"Volver"})]})})})}function T({code:a,onContinue:s}){return e.jsx("section",{className:"section",children:e.jsx("div",{className:"container",style:{maxWidth:520},children:e.jsxs("div",{className:"panel text-center",children:[e.jsx("span",{className:"tag sage",children:"¡Listo!"}),e.jsx("h1",{className:"mt-2",children:"Tu código anónimo"}),e.jsx("div",{style:{fontFamily:"var(--ff-serif)",fontSize:"2.6rem",fontWeight:800,letterSpacing:"0.08em",color:"var(--c-azul-800)",background:"var(--c-oro-100)",padding:"20px",borderRadius:16,margin:"20px 0"},children:a}),e.jsxs(A,{variant:"gold",children:[e.jsx("strong",{children:"¡Guárdalo en un lugar seguro!"})," Sin él (y la contraseña que pusiste) no podrás recuperar tu histórico. No lo recuperamos por ti — es tu garantía de anonimato."]}),e.jsx("button",{className:"btn btn-primary mt-3",onClick:s,children:"Ir a mi panel →"})]})})})}function R({data:a,code:s,onLogout:r}){return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsx(v,{variant:"slideUp",children:e.jsxs("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("span",{className:"tag",children:"Mi historia"}),e.jsxs("h1",{className:"mt-2",children:["Tu evolución, código ",e.jsx("code",{children:s})]})]}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:r,children:"Cerrar sesión"})]})}),e.jsx(v,{variant:"zoomIn",delay:.1,children:e.jsxs("div",{className:"avatar-row mt-3",children:[e.jsx(M,{code:s}),e.jsxs("div",{className:"quick-stats",children:[e.jsxs("div",{className:"qs-card qs-peach",children:[e.jsx(F,{to:a.sessions.length,className:"qs-num"}),e.jsx("span",{className:"qs-lbl",children:"evaluaciones"})]}),e.jsxs("div",{className:"qs-card qs-mint",children:[e.jsx(F,{to:a.checkins.length,className:"qs-num"}),e.jsx("span",{className:"qs-lbl",children:"check-ins"})]}),e.jsxs("div",{className:"qs-card qs-lavanda",children:[e.jsx(F,{to:a.journal.length,className:"qs-num"}),e.jsx("span",{className:"qs-lbl",children:"entradas diario"})]}),e.jsxs("div",{className:"qs-card qs-oro",children:[e.jsx(F,{to:a.achievements.length,className:"qs-num"}),e.jsx("span",{className:"qs-lbl",children:"logros"})]})]})]})}),e.jsx(v,{variant:"slideUp",delay:.15,children:e.jsxs("div",{className:"bento-section mt-4",children:[e.jsx("div",{className:"bento-cat",children:"Tu cuidado diario"}),e.jsxs("div",{className:"bento-grid-daily",children:[e.jsxs(g,{to:"/check-in",className:"bento-card bento-lg bento-peach",children:[e.jsx("div",{className:"bento-icon",children:e.jsx(h,{name:"check-list",size:26})}),e.jsx("div",{className:"bento-title",children:"Check-in semanal"}),e.jsx("div",{className:"bento-desc",children:"30 segundos. Mide tu ánimo y estrés esta semana."}),e.jsxs("div",{className:"bento-cta",children:["Hacer ahora ",e.jsx(h,{name:"arrow-right",size:14})]})]}),e.jsxs(g,{to:"/diario",className:"bento-card bento-lg bento-coral",children:[e.jsx("div",{className:"bento-icon",children:e.jsx(h,{name:"notebook",size:26})}),e.jsx("div",{className:"bento-title",children:"Diario emocional"}),e.jsx("div",{className:"bento-desc",children:"Una línea sobre cómo te sientes hoy."}),e.jsxs("div",{className:"bento-cta",children:["Escribir ",e.jsx(h,{name:"arrow-right",size:14})]})]})]}),e.jsxs(g,{to:"/companion",className:"bento-card bento-hero bento-lavanda mt-3",children:[e.jsx("div",{className:"bento-icon-lg",children:e.jsx(h,{name:"message-heart",size:36})}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"bento-title",children:"Hablar con Pum-AI"}),e.jsx("div",{className:"bento-desc",children:"Te escucha sin juzgar. No es terapia, pero ayuda a poner en palabras lo que sientes."})]}),e.jsxs("div",{className:"bento-cta-pill",children:["Iniciar conversación ",e.jsx(h,{name:"arrow-right",size:14})]})]})]})}),e.jsx(v,{variant:"slideUp",delay:.2,children:e.jsxs("div",{className:"bento-section mt-4",children:[e.jsx("div",{className:"bento-cat",children:"Tu proceso"}),e.jsxs("div",{className:"bento-grid-md",children:[e.jsxs(g,{to:"/ruta",className:"bento-card bento-md bento-durazno",children:[e.jsx("div",{className:"bento-icon",children:e.jsx(h,{name:"route",size:22})}),e.jsx("div",{className:"bento-title-sm",children:"Mi ruta"}),e.jsx("div",{className:"bento-desc-sm",children:"Plan de bienestar 7 días"})]}),e.jsxs(g,{to:"/arboles",className:"bento-card bento-md bento-mint",children:[e.jsx("div",{className:"bento-icon",children:e.jsx(h,{name:"tree",size:22})}),e.jsx("div",{className:"bento-title-sm",children:"Mis árboles"}),e.jsx("div",{className:"bento-desc-sm",children:"Adopta y cuida"})]}),e.jsxs(g,{to:"/mi-historia#logros",className:"bento-card bento-md bento-oro",children:[e.jsx("div",{className:"bento-icon",children:e.jsx(h,{name:"trophy",size:22})}),e.jsx("div",{className:"bento-title-sm",children:"Logros"}),e.jsxs("div",{className:"bento-desc-sm",children:[a.achievements.length," desbloqueados"]})]})]})]})}),e.jsx(v,{variant:"slideUp",delay:.25,children:e.jsxs("div",{className:"bento-section mt-4",children:[e.jsx("div",{className:"bento-cat",children:"Explora"}),e.jsxs("div",{className:"bento-grid-sm",children:[e.jsxs(g,{to:"/biblioteca",className:"bento-chip",children:[e.jsx(h,{name:"books",size:18}),e.jsx("span",{children:"Biblioteca"})]}),e.jsxs(g,{to:"/mapa",className:"bento-chip",children:[e.jsx(h,{name:"map-pin",size:18}),e.jsx("span",{children:"Mapa"})]}),e.jsxs(g,{to:"/buddy",className:"bento-chip",children:[e.jsx(h,{name:"friends",size:18}),e.jsx("span",{children:"Buddy"})]}),e.jsxs(g,{to:"/calendario",className:"bento-chip",children:[e.jsx(h,{name:"calendar",size:18}),e.jsx("span",{children:"Eventos"})]}),e.jsxs(g,{to:"/aventura",className:"bento-chip",children:[e.jsx(h,{name:"compass",size:18}),e.jsx("span",{children:"Aventura"})]})]})]})}),e.jsxs("div",{className:"hist-grid mt-3",children:[e.jsx(v,{variant:"slideRight",children:e.jsxs("section",{className:"panel",children:[e.jsxs("h2",{children:["Evaluaciones (",a.sessions.length,")"]}),a.sessions.length===0&&e.jsxs("p",{className:"note",children:["Aún no has hecho ningún test. ",e.jsx(g,{to:"/consentimiento",children:"Empieza ahora"}),"."]}),e.jsx("ul",{className:"hist-list",children:a.sessions.map(t=>e.jsxs("li",{children:[e.jsxs("strong",{children:[t.total_score,"/100"]})," ",e.jsx("span",{className:`lvl-bg-${t.general_level}`,style:{padding:"2px 8px",borderRadius:6,fontSize:"0.78rem"},children:t.general_level}),e.jsx("small",{children:new Date(t.created_at).toLocaleDateString("es-MX")})]},t.id))})]})}),e.jsx(v,{variant:"slideUp",delay:.12,children:e.jsxs("section",{className:"panel",children:[e.jsxs("h2",{children:["Check-ins (",a.checkins.length,")"]}),a.checkins.length===0&&e.jsx("p",{className:"note",children:"Aún no has hecho check-in semanal."}),e.jsx("ul",{className:"hist-list",children:a.checkins.slice(0,8).map((t,n)=>e.jsxs("li",{children:["Ánimo ",t.mood,"/5 · Energía ",t.energy,"/5 · Estrés ",t.stress,"/5",e.jsx("small",{children:new Date(t.created_at).toLocaleDateString("es-MX")})]},n))})]})}),e.jsx(v,{variant:"slideLeft",delay:.18,children:e.jsxs("section",{className:"panel",children:[e.jsxs("h2",{children:["Diario (",a.journal.length,")"]}),a.journal.length===0&&e.jsx("p",{className:"note",children:"Aún no tienes entradas."}),e.jsx("ul",{className:"hist-list",children:a.journal.slice(0,6).map((t,n)=>e.jsxs("li",{children:['"',t.entry,'"',e.jsx("small",{children:new Date(t.created_at).toLocaleDateString("es-MX")})]},n))})]})}),e.jsx(v,{variant:"zoomIn",delay:.24,children:e.jsxs("section",{className:"panel",children:[e.jsx("h2",{children:"Logros y retos"}),e.jsx(I,{achievements:a.achievements||[]}),e.jsxs("h3",{className:"mt-3",style:{fontSize:"0.94rem"},children:["🏆 Otros logros (",a.achievements.filter(t=>!t.achievement_key.startsWith("challenge_")).length,")"]}),a.achievements.filter(t=>!t.achievement_key.startsWith("challenge_")).length===0?e.jsx("p",{className:"note",children:"Aún sin logros — ¡sigue cuidándote!"}):e.jsx("ul",{className:"hist-list",children:a.achievements.filter(t=>!t.achievement_key.startsWith("challenge_")).map((t,n)=>e.jsxs("li",{children:["🏆 ",U(t.achievement_key)]},n))})]})})]})]}),e.jsx("style",{children:`
        .avatar-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 18px;
          align-items: center;
        }
        @media (max-width: 720px) { .avatar-row { grid-template-columns: 1fr; } }

        /* ===== KPI cards arriba ===== */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        @media (max-width: 720px) { .quick-stats { grid-template-columns: repeat(2, 1fr); } }
        .qs-card {
          padding: 12px 16px;
          border-radius: 14px;
          text-align: center;
          border: 1px solid;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .qs-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(108,80,124,0.10); }
        .qs-num { display: block; font-family: var(--ff-serif); font-size: 1.7rem; font-weight: 800; }
        .qs-lbl { display: block; font-size: 0.72rem; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 2px; }
        .qs-peach   { background: var(--c-peach-100);   border-color: rgba(255,154,123,0.35); }
        .qs-peach   .qs-num, .qs-peach   .qs-lbl { color: var(--c-peach-700); }
        .qs-mint    { background: var(--c-mint-100);    border-color: rgba(125,196,174,0.40); }
        .qs-mint    .qs-num, .qs-mint    .qs-lbl { color: var(--c-mint-700); }
        .qs-lavanda { background: var(--c-lavanda-100); border-color: rgba(157,123,217,0.30); }
        .qs-lavanda .qs-num, .qs-lavanda .qs-lbl { color: var(--c-lavanda-700); }
        .qs-oro     { background: var(--c-oro-100);     border-color: rgba(201,162,39,0.30); }
        .qs-oro     .qs-num, .qs-oro     .qs-lbl { color: var(--c-oro-700); }

        /* ===== Bento grid ===== */
        .bento-section { }
        .bento-cat {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--c-gris);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
          padding-left: 4px;
        }
        .bento-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 18px 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.94);
          border: 1px solid var(--c-borde-soft);
          text-decoration: none;
          color: var(--c-texto);
          transition: transform 0.25s cubic-bezier(.2,.7,.2,1), box-shadow 0.25s ease, border-color 0.25s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(108,80,124,0.14);
        }
        .bento-icon { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; margin-bottom: 4px; }
        .bento-icon-lg { width: 60px; height: 60px; border-radius: 18px; display: grid; place-items: center; flex-shrink: 0; }
        .bento-title { font-family: var(--ff-serif); font-size: 1.18rem; font-weight: 700; }
        .bento-title-sm { font-family: var(--ff-serif); font-size: 1rem; font-weight: 700; margin-top: 2px; }
        .bento-desc { font-size: 0.92rem; color: var(--c-texto-soft); line-height: 1.45; }
        .bento-desc-sm { font-size: 0.78rem; color: var(--c-texto-soft); }
        .bento-cta {
          font-size: 0.85rem; font-weight: 700; margin-top: 6px;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .bento-cta-pill {
          background: var(--c-azul-800); color: white;
          padding: 10px 18px; border-radius: 999px;
          font-size: 0.86rem; font-weight: 700;
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .bento-card:hover .bento-cta-pill { background: var(--c-azul-900); }

        .bento-grid-daily { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 720px) { .bento-grid-daily { grid-template-columns: 1fr; } }
        .bento-grid-md { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 540px) { .bento-grid-md { grid-template-columns: 1fr; } }
        .bento-grid-sm {
          display: grid; gap: 8px;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }

        /* Hero card del companion — destacada */
        .bento-hero {
          display: flex !important;
          flex-direction: row !important;
          gap: 18px;
          align-items: center;
          background: linear-gradient(135deg, rgba(157,123,217,0.10), rgba(255,184,156,0.10));
          border: 1px solid rgba(157,123,217,0.30);
        }
        @media (max-width: 640px) {
          .bento-hero { flex-direction: column !important; align-items: flex-start; }
          .bento-hero .bento-cta-pill { width: 100%; justify-content: center; }
        }

        /* Variants de color */
        .bento-peach   .bento-icon { background: var(--c-peach-100);   color: var(--c-peach-700); }
        .bento-peach:hover { border-color: var(--c-peach-500); }
        .bento-coral   .bento-icon { background: var(--c-coral-100);   color: var(--c-coral-700); }
        .bento-coral:hover { border-color: var(--c-coral-500); }
        .bento-lavanda .bento-icon-lg { background: var(--c-lavanda-100); color: var(--c-lavanda-700); }
        .bento-durazno .bento-icon { background: var(--c-durazno-100); color: var(--c-durazno-700); }
        .bento-mint    .bento-icon { background: var(--c-mint-100);    color: var(--c-mint-700); }
        .bento-oro     .bento-icon { background: var(--c-oro-100);     color: var(--c-oro-700); }

        /* Chips de "explora" */
        .bento-chip {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.88);
          border: 1px solid var(--c-borde-soft);
          text-decoration: none; color: var(--c-azul-800);
          font-weight: 600; font-size: 0.92rem;
          transition: all 0.2s ease;
        }
        .bento-chip:hover {
          transform: translateY(-2px);
          background: rgba(157,123,217,0.08);
          border-color: rgba(157,123,217,0.30);
        }

        .hist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .hist-list { list-style: none; padding: 0; display: grid; gap: 8px; }
        .hist-list li {
          padding: 10px 12px;
          background: var(--c-marfil);
          border-radius: 10px;
          font-size: 0.92rem;
        }
        .hist-list small { display: block; color: var(--c-gris); font-size: 0.78rem; margin-top: 2px; }
      `})]})}function I({achievements:a}){const s=a.filter(i=>i.achievement_key.startsWith("challenge_")).map(i=>({key:i.achievement_key,day:parseInt(i.achievement_key.split("_")[1]||"0"),date:i.awarded_at?new Date(i.awarded_at):null})).sort((i,c)=>c.day-i.day),r=s.length,t=(()=>{const i=new Date;return i.getFullYear()*1e3+i.getMonth()*32+i.getDate()})();let n=0;const l=[...new Set(s.map(i=>i.day))].sort((i,c)=>c-i);let d=t;for(const i of l)if(i===d||i===d-1)n++,d=i-1;else if(i<d-1)break;return e.jsxs("div",{className:"challenges-tracker",children:[e.jsxs("div",{className:"ct-row",children:[e.jsxs("div",{className:"ct-stat",children:[e.jsx("span",{className:"ct-num",children:r}),e.jsx("small",{children:"retos completados"})]}),e.jsxs("div",{className:"ct-stat",children:[e.jsx("span",{className:"ct-num",children:n}),e.jsx("small",{children:"días seguidos"})]}),n>=3&&e.jsx("div",{className:"ct-fire",children:"🔥"})]}),n>=7&&e.jsx("p",{className:"note",style:{textAlign:"center",color:"#7B5E14"},children:"✨ Una semana completa de retos. ¡Eso es disciplina con cariño!"}),n===0&&r>0&&e.jsx("p",{className:"note",style:{textAlign:"center"},children:"Hoy es buen día para retomar tu reto diario."}),e.jsx("style",{children:`
        .challenges-tracker { background: linear-gradient(135deg, var(--c-oro-100), var(--c-marfil)); padding: 14px; border-radius: 12px; }
        .ct-row { display: flex; gap: 18px; align-items: center; justify-content: center; }
        .ct-stat { text-align: center; }
        .ct-num { display: block; font-family: var(--ff-serif); font-size: 1.8rem; font-weight: 800; color: var(--c-azul-800); }
        .ct-stat small { color: var(--c-gris); font-size: 0.78rem; }
        .ct-fire { font-size: 2rem; animation: bounce 1.6s ease-in-out infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `})]})}function U(a){return{first_checkin:"Primer check-in semanal",first_day_route:"Día 1 de tu ruta de bienestar",seven_day_route:"🎉 Ruta de 7 días completa",fourteen_day_route:"🎉🎉 Ruta de 14 días completa",tree_adopted:"Adoptaste un árbol 🌳",wellness_walk:"Caminata de bienestar",journal_streak_7:"7 días de diario seguidos",community_visit:"Visitaste una actividad comunitaria"}[a]||a}function X(){const a="ABCDEFGHJKLMNPQRSTUVWXYZ",s="23456789",r=new Uint32Array(7);return crypto.getRandomValues(r),`SIN-${a[r[0]%a.length]}${a[r[1]%a.length]}${a[r[2]%a.length]}-${s[r[3]%s.length]}${s[r[4]%s.length]}${s[r[5]%s.length]}${s[r[6]%s.length]}`}export{O as default};
