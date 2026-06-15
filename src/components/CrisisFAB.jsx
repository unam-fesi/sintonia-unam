// =============================================================
// AURA — Botón flotante de Apoyo Inmediato
// Aparece cuando: el último resultado fue prioritario, O cuando
// el usuario lo activa manualmente desde /apoyo.
// =============================================================

import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { STORAGE_KEYS } from '../utils/constants.js';

const KEY = 'aura.crisis_visible';

export default function CrisisFAB() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // No mostrar en admin ni en /apoyo (ya tiene lo mismo)
  const hide = location.pathname.startsWith('/admin') || location.pathname.startsWith('/apoyo');

  useEffect(() => {
    // Activar si último resultado fue prioritario
    try {
      const r = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.RESULT) || 'null');
      if (r && r.general_level === 'prioritario') {
        localStorage.setItem(KEY, '1');
      }
    } catch { /* noop */ }
    setVisible(localStorage.getItem(KEY) === '1');
  }, [location.pathname]);

  function dismiss() {
    localStorage.setItem(KEY, '0');
    setVisible(false);
    setOpen(false);
  }

  if (!visible || hide) return null;

  return (
    <>
      {open && (
        <div className="crisis-panel">
          <header>
            <strong>🆘 Apoyo inmediato</strong>
            <button onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
          </header>
          <p>
            <strong>Línea de la Vida</strong> — orientación gratuita, confidencial, 24/7.
          </p>
          <a href="tel:8002900024" className="btn btn-coral">📞 800 290 0024</a>
          <Link to="/apoyo" className="btn btn-ghost btn-sm">Ver más opciones</Link>
          <button className="dismiss" onClick={dismiss}>Ocultar este botón</button>
        </div>
      )}
      <button
        className={`crisis-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Apoyo inmediato"
        aria-label="Abrir apoyo inmediato"
      >
        🆘
      </button>

      <style>{`
        .crisis-fab {
          position: fixed;
          bottom: 20px; right: 20px;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--c-coral-500), var(--c-coral-600));
          color: #fff;
          font-size: 1.6rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(214,59,57,0.4);
          z-index: 60;
          transition: transform 0.2s;
          animation: pulse 2.6s ease-in-out infinite;
        }
        .crisis-fab:hover { transform: scale(1.08); }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 12px 30px rgba(214,59,57,0.4), 0 0 0 0 rgba(214,59,57,0.4); }
          50%      { box-shadow: 0 12px 30px rgba(214,59,57,0.4), 0 0 0 18px rgba(214,59,57,0); }
        }
        .crisis-panel {
          position: fixed;
          bottom: 90px; right: 20px;
          width: 280px;
          background: #fff;
          border: 2px solid var(--c-coral-500);
          border-radius: var(--r-md);
          padding: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          z-index: 60;
          display: grid; gap: 10px;
        }
        .crisis-panel header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .crisis-panel header strong { color: #93362A; }
        .crisis-panel header button {
          background: transparent; border: 0; cursor: pointer;
          font-size: 1rem; color: var(--c-gris);
        }
        .crisis-panel p { margin: 0; font-size: 0.92rem; color: var(--c-texto); }
        .crisis-panel .dismiss {
          background: transparent; border: 0; cursor: pointer;
          font-size: 0.78rem; color: var(--c-gris); text-decoration: underline;
          margin-top: 4px;
        }
      `}</style>
    </>
  );
}
