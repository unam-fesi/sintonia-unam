import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';
import ScrollReveal from '../components/ScrollReveal.jsx';

const SUGGESTIONS = [
  'Me ha costado dormir últimamente',
  'Estoy presionado(a) por los exámenes',
  'Me siento desconectado(a) de mis amigos',
  'No sé por qué me siento triste',
  'Quiero empezar a cuidarme más',
];

export default function Companion() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/companion' } });
    } else {
      // Mensaje de bienvenida
      setMessages([{
        role: 'assistant',
        content: `Hola. Soy **Pum-AI**, tu acompañante. Aquí puedes contarme cómo estás. No soy terapeuta ni te voy a diagnosticar — solo escucho y te oriento. Recuerda: puedes hablar con alguien profesional en /apoyo cuando lo necesites. ¿Cómo te sientes hoy?`,
      }]);
    }
  }, [student, navigate]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text) {
    const message = (text || input).trim();
    if (!message || sending) return;
    setErr(null);

    setMessages(m => [...m, { role: 'user', content: message }]);
    setInput('');
    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-companion', {
        body: { anonymous_code: student.code, message, session_id: sessionId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data.session_id && !sessionId) setSessionId(data.session_id);
      setMessages(m => [...m, {
        role: 'assistant',
        content: data.assistant,
        crisis: data.crisis,
      }]);
    } catch (e) {
      setErr(e.message || 'Error');
      setMessages(m => m.filter((_, i) => i !== m.length - 1)); // saca el último user para reintentar
    } finally {
      setSending(false);
    }
  }

  if (!student?.code) return null;

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 760}}>
        <ScrollReveal variant="slideUp">
          <header className="comp-head">
            <div>
              <span className="tag azul">Pum-AI · Acompañante</span>
              <h1 className="mt-2">Aquí te escucho 🤝</h1>
            </div>
            <div className="badges">
              <span className="badge">Anónimo</span>
              <span className="badge warm">No es terapia</span>
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal variant="zoomIn" delay={0.1}>
        <div className="chat-card">
          <div className="chat-stream">
            {messages.map((m, i) => (
              <article key={i} className={`bubble ${m.role}`}>
                <div className="content">{m.content}</div>
                {m.crisis && (
                  <div className="crisis-actions">
                    <a href="tel:8002900024" className="btn btn-coral btn-sm">📞 Llamar 800 290 0024</a>
                    <Link to="/apoyo" className="btn btn-ghost btn-sm">Ver opciones</Link>
                  </div>
                )}
              </article>
            ))}
            {sending && (
              <article className="bubble assistant">
                <div className="content typing"><span></span><span></span><span></span></div>
              </article>
            )}
            <div ref={endRef} />
          </div>

          {err && <div className="chat-error">{err}</div>}

          {messages.length <= 1 && (
            <div className="suggestions">
              <small>O empieza con:</small>
              {SUGGESTIONS.map(s => (
                <button key={s} className="sg" onClick={() => send(s)} disabled={sending}>{s}</button>
              ))}
            </div>
          )}

          <form className="chat-input" onSubmit={e => { e.preventDefault(); send(); }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe lo que sientes…"
              maxLength={1000}
              disabled={sending}
            />
            <button type="submit" className="btn btn-primary" disabled={sending || !input.trim()}>
              {sending ? '…' : 'Enviar'}
            </button>
          </form>

          <p className="note text-center mt-2">
            <small>Esta conversación es anónima pero puede ser auditada por el equipo del programa.
            Si estás en crisis, llama directamente a <a href="tel:8002900024">800 290 0024</a>.</small>
          </p>
        </div>
        </ScrollReveal>
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
}
