// =============================================================
// AURA — Toast: "alguien quiere un buddy ahora"
// Suscribe en realtime a buddy_queue. Cuando alguien NUEVO se
// mete en cola Y no eres tú Y no tienes pareja activa, muestra
// un toast discreto invitando a conectar.
// =============================================================

import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

const DISMISS_KEY = 'aura.buddyToast.dismissed';
const DISMISS_TTL_MS = 30 * 60 * 1000; // 30 min de "ya no me molestes"

function recentlyDismissed() {
  try {
    const t = Number(sessionStorage.getItem(DISMISS_KEY) || 0);
    return t && (Date.now() - t) < DISMISS_TTL_MS;
  } catch { return false; }
}

export default function BuddyAvailableToast() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const hideTimeoutRef = useRef(null);
  const lastShownRef = useRef(0);

  const code = student?.code || null;
  const isAdmin    = location.pathname.startsWith('/admin');
  const isOnBuddy  = location.pathname === '/buddy';
  const isOnTest   = location.pathname === '/evaluacion';

  useEffect(() => {
    // Sólo si: hay código anónimo + no admin + no en /buddy + no en test
    if (!code || isAdmin || isOnBuddy || isOnTest) {
      setVisible(false);
      return;
    }

    let active = true;

    async function refreshCount() {
      // ¿hay alguien en cola que no soy yo?
      const { count: qCount } = await supabase
        .from('buddy_queue')
        .select('*', { count: 'exact', head: true })
        .neq('anonymous_code', code);

      if (!active) return;

      const n = qCount ?? 0;
      setCount(n);

      // ¿yo ya tengo pareja activa? — si sí, NO molestamos
      const { data: myPair } = await supabase.from('buddy_pairs')
        .select('id').or(`code_a.eq.${code},code_b.eq.${code}`)
        .eq('active', true).limit(1).maybeSingle();
      if (!active) return;

      const eligible = n > 0 && !myPair && !recentlyDismissed();

      // No mostrar de nuevo si ya lo mostramos hace <60s (evita parpadeo)
      if (eligible && Date.now() - lastShownRef.current > 60000) {
        setVisible(true);
        lastShownRef.current = Date.now();
        // Auto-ocultar tras 25s
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setVisible(false), 25000);
      } else if (!eligible) {
        setVisible(false);
      }
    }

    // Verificación inicial al montar (por si ya hay alguien esperando)
    refreshCount();

    // Suscripción realtime: cuando alguien NUEVO entra a la cola
    const channel = supabase
      .channel('buddy-queue-watch')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'buddy_queue' },
        (payload) => {
          // Ignorar si soy yo el que se metió
          if (payload.new?.anonymous_code === code) return;
          refreshCount();
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'buddy_queue' },
        () => refreshCount()
      )
      .subscribe();

    return () => {
      active = false;
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      supabase.removeChannel(channel);
    };
  }, [code, isAdmin, isOnBuddy, isOnTest]);

  function dismiss() {
    setVisible(false);
    try { sessionStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
  }

  function connect() {
    setVisible(false);
    navigate('/buddy');
  }

  if (!visible) return null;

  return (
    <div className="bud-toast" role="status" aria-live="polite">
      <div className="bud-toast-icon">🤝</div>
      <div className="bud-toast-body">
        <strong>Alguien busca un buddy ahora</strong>
        <p>
          {count === 1
            ? 'Otro estudiante anónimo está esperando en la cola.'
            : `Hay ${count} estudiantes anónimos esperando.`} ¿Conectamos?
        </p>
        <div className="bud-toast-actions">
          <button className="btn btn-primary btn-sm" onClick={connect}>Sí, conectar</button>
          <button className="btn btn-ghost btn-sm" onClick={dismiss}>Ahora no</button>
        </div>
      </div>
      <button className="bud-toast-close" onClick={dismiss} aria-label="Cerrar">×</button>

      <style>{`
        .bud-toast {
          position: fixed;
          right: 18px;
          bottom: 100px;
          z-index: 9000;
          width: min(360px, calc(100vw - 36px));
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(10px) saturate(1.2);
          -webkit-backdrop-filter: blur(10px) saturate(1.2);
          border: 1px solid rgba(232,200,104,0.55);
          border-radius: 16px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.7) inset,
            0 18px 38px rgba(16,36,62,0.20),
            0 6px 14px rgba(16,36,62,0.10);
          padding: 14px 16px 14px 14px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          animation: budToastIn 0.32s ease both;
        }
        .bud-toast-icon {
          flex-shrink: 0;
          width: 42px; height: 42px;
          background: var(--c-oro-100);
          border-radius: 50%;
          display: grid; place-items: center;
          font-size: 1.2rem;
        }
        .bud-toast-body { flex: 1; min-width: 0; }
        .bud-toast-body strong {
          display: block;
          color: var(--c-azul-800);
          font-size: 0.95rem;
          margin-bottom: 2px;
        }
        .bud-toast-body p {
          margin: 0 0 10px;
          font-size: 0.86rem;
          color: var(--c-texto-soft, var(--c-texto));
          line-height: 1.4;
        }
        .bud-toast-actions {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .bud-toast-actions .btn {
          padding: 7px 14px;
          font-size: 0.84rem;
        }
        .bud-toast-close {
          background: transparent; border: 0;
          font-size: 1.4rem; line-height: 1;
          color: var(--c-gris);
          cursor: pointer;
          padding: 0 4px;
          align-self: flex-start;
        }
        .bud-toast-close:hover { color: var(--c-azul-800); }

        @keyframes budToastIn {
          from { opacity: 0; transform: translate3d(0, 14px, 0) scale(0.97); }
          to   { opacity: 1; transform: translate3d(0, 0, 0)    scale(1); }
        }

        @media (max-width: 540px) {
          .bud-toast {
            right: 12px; left: 12px; bottom: 92px;
            width: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bud-toast { animation: none; }
        }
      `}</style>
    </div>
  );
}
