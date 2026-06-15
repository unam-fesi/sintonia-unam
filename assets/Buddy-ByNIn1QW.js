import{u as I,s,j as a,S as M}from"./index-B7qB7HWf.js";import{b as A,r as d}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";function W(){const{student:e}=I(),_=A(),[i,p]=d.useState(null),[g,j]=d.useState(!1),[v,x]=d.useState([]),[f,m]=d.useState(""),[N,b]=d.useState(!0),w=d.useRef(null),c=d.useRef(null),S=d.useRef(0),E=d.useRef(""),y=d.useRef(null),[z,q]=d.useState(!1);d.useEffect(()=>{E.current=f},[f]),d.useEffect(()=>{if(!(e!=null&&e.code)){_("/mi-historia",{state:{from:"/buddy"}});return}h({silent:!1});const t=setInterval(()=>{document.activeElement!==c.current&&(E.current.length>0||Date.now()-S.current<5e3||R())},15e3);return()=>clearInterval(t)},[e==null?void 0:e.code]),d.useEffect(()=>{if(!(i!=null&&i.id))return;const t=s.channel(`buddy-msgs-${i.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"buddy_messages",filter:`pair_id=eq.${i.id}`},o=>{const n=o.new;x(r=>{if(r.some(l=>l.id===n.id))return r;const u=r.findIndex(l=>l._optimistic&&l.sender_code===n.sender_code&&l.message===n.message);if(u>=0){const l=r.slice();return l[u]=n,l}return[...r,n]}),n.sender_code!==(e==null?void 0:e.code)&&(q(!1),y.current&&clearTimeout(y.current))}).subscribe();return()=>{s.removeChannel(t)}},[i==null?void 0:i.id,e==null?void 0:e.code]),d.useEffect(()=>{if(!g||!(e!=null&&e.code))return;const t=setTimeout(async()=>{const{data:o}=await s.from("buddy_pairs").select("id").or(`code_a.eq.${e.code},code_b.eq.${e.code}`).eq("active",!0).maybeSingle();if(o)return;const n=`BUDDY-AI-${Math.random().toString(36).slice(2,6).toUpperCase()}`,{data:r,error:u}=await s.from("buddy_pairs").insert({code_a:e.code,code_b:n,active:!0,is_ai_buddy:!0}).select().single();if(u){console.warn(u);return}await s.from("buddy_queue").delete().eq("anonymous_code",e.code),await s.functions.invoke("buddy-ai-reply",{body:{pair_id:r.id}}).catch(()=>{}),h()},8e3);return()=>clearTimeout(t)},[g,e==null?void 0:e.code]),d.useEffect(()=>{var t;(t=w.current)==null||t.scrollIntoView({behavior:"smooth"})},[v]);async function h({silent:t=!1}={}){if(!(e!=null&&e.code))return;t||b(!0);const{data:o}=await s.from("buddy_pairs").select("*").or(`code_a.eq.${e.code},code_b.eq.${e.code}`).eq("active",!0).order("paired_at",{ascending:!1}).limit(1).maybeSingle();if(o){p(r=>(r==null?void 0:r.id)===o.id?r:o);const{data:n}=await s.from("buddy_messages").select("*").eq("pair_id",o.id).order("created_at");x(r=>{var l,C;const u=n||[];return r.length===u.length&&((l=r[r.length-1])==null?void 0:l.id)===((C=u[u.length-1])==null?void 0:C.id)?r:u}),j(!1)}else{p(null),x([]);const{data:n}=await s.from("buddy_queue").select("id").eq("anonymous_code",e.code).maybeSingle();j(!!n)}t||b(!1)}async function R(){if(!(e!=null&&e.code))return;const{data:t}=await s.from("buddy_pairs").select("id, active, code_a, code_b, is_ai_buddy, paired_at").or(`code_a.eq.${e.code},code_b.eq.${e.code}`).eq("active",!0).order("paired_at",{ascending:!1}).limit(1).maybeSingle();t?p(o=>(o==null?void 0:o.id)===t.id?o:t):i&&h({silent:!0})}async function $(){const{data:t}=await s.from("buddy_queue").select("*").neq("anonymous_code",e.code).order("joined_at",{ascending:!0}).limit(1).maybeSingle();if(t){const{error:o}=await s.from("buddy_pairs").insert({code_a:t.anonymous_code,code_b:e.code,active:!0});o||await s.from("buddy_queue").delete().eq("anonymous_code",t.anonymous_code)}else await s.from("buddy_queue").upsert({anonymous_code:e.code});h({silent:!1})}async function k(){await s.from("buddy_queue").delete().eq("anonymous_code",e.code),h({silent:!1})}async function D(){i&&confirm("¿Terminar la conversación con tu buddy? Podrás emparejarte de nuevo después.")&&(await s.from("buddy_pairs").update({active:!1}).eq("id",i.id),h({silent:!1}))}async function T(){if(!f.trim()||!i)return;const t=f.trim().slice(0,1e3);m("");const o={id:`tmp-${Date.now()}`,pair_id:i.id,sender_code:e.code,message:t,created_at:new Date().toISOString(),_optimistic:!0};if(x(n=>[...n,o]),s.from("buddy_messages").insert({pair_id:i.id,sender_code:e.code,message:t}).then(({error:n})=>{n&&console.warn("insert msg",n)}),i.is_ai_buddy){y.current&&clearTimeout(y.current);const n=1e3+Math.random()*800;y.current=setTimeout(()=>q(!0),n),setTimeout(()=>{s.functions.invoke("buddy-ai-reply",{body:{pair_id:i.id}}).catch(()=>{}).finally(()=>{setTimeout(()=>q(!1),15e3)})},200+Math.random()*400)}}return e!=null&&e.code?a.jsx("section",{className:"section",children:a.jsxs("div",{className:"container",style:{maxWidth:720},children:[a.jsxs("header",{className:"text-center",style:{maxWidth:640,margin:"0 auto"},children:[a.jsx("span",{className:"tag lavanda",children:"Buddy anónimo"}),a.jsx("h1",{className:"mt-2",children:"Conecta con alguien que también está cuidándose"}),a.jsx("p",{className:"lede",children:"Conversa con otro estudiante de la UNAM completamente anónimo. Hablen sin presión. A veces saber que no estás solo(a) es la mejor medicina."})]}),N?a.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):i?a.jsx(Q,{pair:i,student:e,messages:v,input:f,setInput:m,send:T,endPair:D,endRef:w,inputRef:c,aiTyping:z,onTyping:()=>{S.current=Date.now()}}):g?a.jsx(P,{onLeave:k}):a.jsx(L,{onJoin:$}),a.jsxs(M,{variant:"warm",children:[a.jsx("strong",{children:"Reglas básicas:"})," respeto siempre. Sin compartir datos personales. Sin lenguaje discriminatorio. El equipo del programa puede revisar mensajes en caso de reportes. Si te sientes incómodo(a), termina y reporta."]})]})}):null}function L({onJoin:e}){return a.jsxs("div",{className:"panel text-center mt-3",children:[a.jsx("h2",{children:"¿Listo(a) para conectarte?"}),a.jsx("p",{className:"lede",children:"Te pondremos en cola. En cuanto otra persona se conecte, los enlazamos. Tu código y conversación son anónimos."}),a.jsx("button",{className:"btn btn-primary btn-lg",onClick:e,children:"🤝 Quiero un buddy"})]})}function P({onLeave:e}){return a.jsxs("div",{className:"panel text-center mt-3",children:[a.jsx("div",{className:"spinner",style:{margin:"0 auto 14px"}}),a.jsx("h2",{children:"Esperando a alguien…"}),a.jsx("p",{className:"lede",children:"Estás en cola. Mantente en esta página. Te conectaremos automáticamente."}),a.jsx("button",{className:"btn btn-ghost",onClick:e,children:"Salir de la cola"})]})}function Q({pair:e,student:_,messages:i,input:p,setInput:g,send:j,endPair:v,endRef:x,inputRef:f,onTyping:m,aiTyping:N}){const b=e.code_a===_.code?e.code_b:e.code_a,w=(b==null?void 0:b.length)>12?b.slice(0,8)+"…":b;return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"buddy-chat mt-3",children:[a.jsxs("header",{children:[a.jsx("strong",{children:"Conversando con"}),a.jsx("code",{children:w}),a.jsx("button",{className:"btn btn-ghost btn-sm",onClick:v,children:"Terminar"})]}),a.jsxs("div",{className:"chat-stream",children:[i.length===0&&a.jsx("p",{className:"note text-center",children:"Salúdense. Cualquier paso es bueno."}),i.map(c=>a.jsxs("div",{className:`bubble ${c.sender_code===_.code?"mine":"theirs"} ${c._optimistic?"pending":""}`,children:[a.jsx("p",{children:c.message}),a.jsx("small",{children:new Date(c.created_at).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})})]},c.id)),N&&a.jsxs("div",{className:"bubble theirs typing","aria-label":"está escribiendo",children:[a.jsx("span",{className:"dot"}),a.jsx("span",{className:"dot"}),a.jsx("span",{className:"dot"})]}),a.jsx("div",{ref:x})]}),a.jsxs("form",{className:"chat-input",onSubmit:c=>{c.preventDefault(),j()},children:[a.jsx("input",{ref:f,value:p,onChange:c=>{g(c.target.value),m==null||m()},onKeyDown:()=>m==null?void 0:m(),maxLength:1e3,placeholder:"Escribe a tu buddy…",autoComplete:"off",autoCorrect:"on",inputMode:"text"}),a.jsx("button",{className:"btn btn-primary",type:"submit",disabled:!p.trim(),children:"Enviar"})]})]}),a.jsx("style",{children:`
        .buddy-chat {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          display: flex; flex-direction: column;
          height: 60vh; min-height: 420px; max-height: 680px;
        }
        .buddy-chat header {
          display: flex; gap: 10px; align-items: center;
          padding: 14px 18px;
          border-bottom: 1px solid var(--c-borde-soft);
        }
        .buddy-chat header strong { color: var(--c-azul-800); font-size: 0.92rem; }
        .buddy-chat header code { color: var(--c-oro-700); flex: 1; }
        .chat-stream {
          flex: 1; overflow-y: auto;
          padding: 16px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 14px;
        }
        .bubble.mine {
          align-self: flex-end;
          background: var(--c-azul-800); color: #fff;
          border-bottom-right-radius: 4px;
        }
        .bubble.theirs {
          align-self: flex-start;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-bottom-left-radius: 4px;
        }
        .bubble.pending { opacity: 0.6; }
        .bubble.typing { display: inline-flex; gap: 4px; padding: 12px 14px; }
        .bubble.typing .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c-azul-700);
          opacity: 0.5;
          animation: typingDot 1.2s infinite ease-in-out;
        }
        .bubble.typing .dot:nth-child(2) { animation-delay: 0.15s; }
        .bubble.typing .dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30%           { opacity: 1;   transform: translateY(-3px); }
        }
        .bubble p { margin: 0; font-size: 0.94rem; white-space: pre-wrap; }
        .bubble small { display:block; margin-top: 4px; font-size: 0.72rem; opacity: 0.7; }
        .chat-input {
          display: flex; gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--c-borde-soft);
        }
        .chat-input input {
          flex: 1; padding: 10px 14px;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          font-size: 16px; /* evita zoom de iOS */
        }
        @media (max-width: 540px) {
          .buddy-chat header code { font-size: 0.78rem; }
          .buddy-chat header .btn { padding: 6px 10px; font-size: 0.78rem; }
          .chat-input { padding: 10px; }
          .chat-input .btn { padding: 10px 14px; font-size: 0.88rem; }
        }
      `})]})}export{W as default};
