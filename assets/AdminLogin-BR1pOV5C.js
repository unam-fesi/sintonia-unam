import{j as a}from"./index-DwWWv2XG.js";import{b as u,r,L as b}from"./vendor-react-Be-nUyB0.js";import{g as m,a as h}from"./authService-CIxnxZhs.js";import"./vendor-supabase-J7ITh-P0.js";function y(){const i=u(),[o,p]=r.useState(""),[n,x]=r.useState(""),[l,t]=r.useState(null),[s,d]=r.useState(!1);r.useEffect(()=>{(async()=>await m().catch(()=>null)&&i("/admin",{replace:!0}))()},[i]);async function g(e){e.preventDefault(),t(null),d(!0);try{if(await h(o.trim(),n),!await m()){t("Esta cuenta no tiene permisos administrativos.");return}i("/admin",{replace:!0})}catch(c){t(c.message||"Credenciales incorrectas.")}finally{d(!1)}}return a.jsxs("section",{className:"login-shell",children:[a.jsxs("div",{className:"login-bg","aria-hidden":"true",children:[a.jsx("div",{className:"lb-blob lb-lavender"}),a.jsx("div",{className:"lb-blob lb-peach"}),a.jsx("div",{className:"lb-blob lb-rosa"}),a.jsx("div",{className:"lb-blob lb-durazno"})]}),a.jsxs("div",{className:"login-stack",children:[a.jsx("img",{src:"/aura-fesi/Aura.png",alt:"AURA",className:"login-logo",loading:"eager",decoding:"async"}),a.jsxs("div",{className:"login-card",children:[a.jsx("h1",{children:"Acceso interno"}),a.jsx("p",{className:"lede text-center",children:"Panel administrativo · AURA"}),l&&a.jsx("div",{className:"login-error",children:l}),a.jsxs("form",{onSubmit:g,autoComplete:"off",children:[a.jsxs("div",{className:"field",children:[a.jsx("label",{htmlFor:"email",children:"Correo institucional"}),a.jsx("input",{id:"email",type:"email",required:!0,autoComplete:"username",value:o,onChange:e=>p(e.target.value),placeholder:"usuario@unam.mx"})]}),a.jsxs("div",{className:"field",children:[a.jsx("label",{htmlFor:"password",children:"Contraseña"}),a.jsx("input",{id:"password",type:"password",required:!0,autoComplete:"current-password",value:n,onChange:e=>x(e.target.value)})]}),a.jsx("button",{type:"submit",className:"btn btn-primary",style:{width:"100%"},disabled:s,children:s?"Verificando…":"Iniciar sesión"})]}),a.jsx("p",{className:"note text-center mt-3",children:"Solo personal autorizado. Si tu cuenta no aparece, contacta a la coordinación del programa."}),a.jsx("p",{className:"text-center mt-2",children:a.jsx(b,{to:"/",className:"note",children:"← Volver al sitio público"})})]})]}),a.jsx("style",{children:`
        .login-shell {
          position: relative;
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 20px;
          overflow: hidden;
          background: linear-gradient(180deg, #FFFAF5 0%, #FFF0E8 100%);
        }
        /* Marea ATardecer abrazo en el fondo */
        .login-bg {
          position: absolute;
          inset: -10vh -10vw;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .lb-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          mix-blend-mode: multiply;
        }
        .lb-lavender {
          width: 70vmax; height: 70vmax;
          top: -20vmax; left: -15vmax;
          background: radial-gradient(circle, var(--c-lavanda-500) 0%, transparent 58%);
          opacity: 0.7;
        }
        .lb-peach {
          width: 65vmax; height: 65vmax;
          bottom: -20vmax; right: -15vmax;
          background: radial-gradient(circle, var(--c-peach-500) 0%, transparent 60%);
          opacity: 0.65;
        }
        .lb-rosa {
          width: 50vmax; height: 50vmax;
          top: 40%; right: -10vmax;
          background: radial-gradient(circle, var(--c-rosa-500) 0%, transparent 60%);
          opacity: 0.5;
        }
        .lb-durazno {
          width: 55vmax; height: 55vmax;
          bottom: 10%; left: -10vmax;
          background: radial-gradient(circle, var(--c-durazno-500) 0%, transparent 60%);
          opacity: 0.55;
        }

        .login-stack {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 460px;
        }

        .login-logo {
          width: 100%;
          max-width: 320px;
          height: auto;
          display: block;
          filter: drop-shadow(0 18px 38px rgba(108,80,124,0.22))
                  drop-shadow(0 6px 14px rgba(108,80,124,0.12));
          animation: loginLogoFloat 6s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes loginLogoFloat {
          0%, 100% { transform: translateY(0)   rotate(-0.5deg); }
          50%      { transform: translateY(-6px) rotate(0.5deg); }
        }

        .login-card {
          width: 100%;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(14px) saturate(1.2);
          -webkit-backdrop-filter: blur(14px) saturate(1.2);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: var(--r-xl);
          padding: 36px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 24px 60px rgba(108,80,124,0.18),
            0 8px 22px rgba(108,80,124,0.10);
        }
        .login-card h1 {
          text-align: center;
          font-size: 1.6rem;
          margin: 0 0 4px;
        }
        .login-error {
          background: var(--c-coral-100);
          color: var(--c-coral-700);
          border: 1px solid rgba(232,130,107,0.4);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 0.92rem;
          margin: 12px 0;
        }

        @media (max-width: 540px) {
          .login-logo { max-width: 220px; }
          .login-card { padding: 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .login-logo { animation: none; }
        }
      `})]})}export{y as default};
