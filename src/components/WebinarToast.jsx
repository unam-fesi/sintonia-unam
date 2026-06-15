// =============================================================
// AURA — Toast flotante de próximos webinars
// =============================================================

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

const DISMISS_PREFIX = 'aura.webinar_dismissed_';
const DISMISS_HOURS = 24;

export default function WebinarToast() {
  const { student } = useStudent();
  const location = useLocation();
  const [webinar, setWebinar] = useState(null);
  const [open, setOpen] = useState(false);
  const [rsvping, setRsvping] = useState(false);
  const [rsvped, setRsvped] = useState(false);

  // No mostrar dentro de admin ni durante el flujo del test
  const hideOn = ['/admin', '/evaluacion', '/consentimiento'];
  const hide = hideOn.some(p => location.pathname.startsWith(p));

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    (async () => {
      const { data } = await supabase
        .from('view_upcoming_webinars')
        .select('*')
        .order('starts_at')
        .limit(1)
        .maybeSingle();
      if (!data) return;

      // ¿Fue dismiss recientemente?
      try {
        const raw = localStorage.getItem(DISMISS_PREFIX + data.id);
        if (raw) {
          const ts = Number(raw);
          if (Date.now() - ts < DISMISS_HOURS * 3600 * 1000) return;
        }
      } catch { /* noop */ }

      setWebinar(data);
      setTimeout(() => setOpen(true), 2500); // suave entrada después de 2.5s
    })();
  }, []);

  // ¿Ya hizo RSVP?
  useEffect(() => {
    if (!webinar || !student?.code) return;
    supabase.from('event_rsvp')
      .select('id').eq('event_id', webinar.id).eq('anonymous_code', student.code)
      .maybeSingle()
      .then(({ data }) => setRsvped(!!data));
  }, [webinar, student?.code]);

  function dismiss() {
    if (webinar?.id) {
      try { localStorage.setItem(DISMISS_PREFIX + webinar.id, String(Date.now())); } catch { /* noop */ }
    }
    setOpen(false);
  }

  async function rsvp() {
    if (!student?.code) {
      window.location.assign(import.meta.env.BASE_URL + 'mi-historia');
      return;
    }
    setRsvping(true);
    await supabase.from('event_rsvp').upsert({
      event_id: webinar.id,
      anonymous_code: student.code,
    }, { onConflict: 'event_id,anonymous_code' });
    setRsvped(true);
    setRsvping(false);
  }

  if (!webinar || hide) return null;

  const startsAt = new Date(webinar.starts_at);
  const dateLabel = startsAt.toLocaleString('es-MX', {
    weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit',
  });

  return (
    <>
      {!open && (
        <button
          className="webinar-pill"
          onClick={() => setOpen(true)}
          aria-label="Abrir aviso de webinar"
        >
          📡 <span>Webinar próximo</span>
        </button>
      )}

      {open && (
        <div className="webinar-toast" role="dialog" aria-label="Próximo webinar">
          <button className="dismiss-btn" onClick={dismiss} aria-label="Cerrar">✕</button>

          {webinar.image_url && (
            <img src={webinar.image_url} alt="" className="webinar-img" />
          )}

          <div className="webinar-body">
            <span className="webinar-tag">📡 Próximo webinar</span>
            <h3>{webinar.title}</h3>
            {webinar.speaker && <small>👤 {webinar.speaker}</small>}
            <small>🗓 {dateLabel}</small>
            {webinar.location && <small>📍 {webinar.location}</small>}
            {webinar.description && <p className="webinar-desc">{webinar.description}</p>}

            <div className="webinar-actions">
              {rsvped ? (
                <span className="rsvped-chip">✓ Apuntado(a)</span>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={rsvp} disabled={rsvping}>
                  {rsvping ? '…' : student?.code ? '✋ Me interesa' : '✋ Crear código y apuntarme'}
                </button>
              )}
              {webinar.url && (
                <a href={webinar.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  Más info →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .webinar-pill {
          position: fixed;
          bottom: 86px;
          right: 20px;
          background: linear-gradient(135deg, var(--c-azul-800), var(--c-azul-700));
          color: #fff;
          border: 0;
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(16,36,62,0.30);
          z-index: 55;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          animation: gentleBounce 3.8s ease-in-out infinite;
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .webinar-pill:hover { transform: translateY(-2px); }

        .webinar-toast {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 360px;
          max-width: calc(100vw - 40px);
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          box-shadow: 0 24px 60px rgba(0,0,0,0.30);
          overflow: hidden;
          z-index: 55;
          animation: slideIn 0.4s cubic-bezier(.2,.7,.2,1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translate(20px, 20px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        .dismiss-btn {
          position: absolute; top: 10px; right: 10px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
          border: 0;
          cursor: pointer;
          font-size: 0.92rem;
          color: var(--c-azul-800);
          z-index: 2;
        }
        .dismiss-btn:hover { background: #fff; }

        .webinar-img {
          width: 100%; height: 130px;
          object-fit: cover;
          display: block;
        }
        .webinar-body { padding: 18px; }
        .webinar-tag {
          display: inline-block;
          background: var(--c-oro-100);
          color: #7B5E14;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .webinar-toast h3 {
          margin: 6px 0 4px;
          color: var(--c-azul-800);
          font-size: 1.08rem;
        }
        .webinar-body small {
          display: block;
          color: var(--c-gris);
          font-size: 0.84rem;
          margin: 2px 0;
        }
        .webinar-desc {
          font-size: 0.92rem;
          color: var(--c-texto-soft);
          margin: 8px 0;
        }
        .webinar-actions {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-top: 10px;
        }
        .rsvped-chip {
          padding: 5px 12px;
          background: var(--c-salvia-100);
          color: #2F8770;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
