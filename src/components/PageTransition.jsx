// =============================================================
// AURA — Page transitions
// Transiciones suaves entre rutas usando View Transitions API
// donde esté disponible (Chrome/Edge moderno) y fallback CSS
// (opacity + slide) para Safari/Firefox.
//
// Wrapper en App.jsx que detecta cambios de location.pathname
// y dispara la transición.
//
// Excluye rutas sobrias (/evaluacion, /admin/login) para no
// distraer en formularios.
// =============================================================

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const NO_TRANSITION_ROUTES = [
  '/evaluacion',
  '/admin/login',
];

function shouldSkip(pathname) {
  return NO_TRANSITION_ROUTES.some(r => pathname.startsWith(r));
}

export default function PageTransition({ children }) {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;
    if (shouldSkip(location.pathname)) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // Fallback CSS: animación de fade-in cada vez que cambia la ruta
    const el = wrapperRef.current;
    if (!el) return;
    el.classList.remove('page-enter');
    // Force reflow para reiniciar animación
    void el.offsetWidth;
    el.classList.add('page-enter');
  }, [location.pathname]);

  return (
    <div ref={wrapperRef} className="page-transition-wrap">
      {children}
      <style>{`
        .page-transition-wrap { min-height: 100%; }

        @keyframes pageEnter {
          0%   { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.99); filter: blur(4px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: none;                       filter: blur(0); }
        }
        .page-transition-wrap.page-enter {
          animation: pageEnter 0.55s cubic-bezier(.2,.7,.2,1) both;
        }

        /* View Transitions API (Chrome/Edge) — más natural */
        @media (prefers-reduced-motion: no-preference) {
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation-duration: 0.45s;
            animation-timing-function: cubic-bezier(.2,.7,.2,1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .page-transition-wrap.page-enter { animation: none; }
        }
      `}</style>
    </div>
  );
}
