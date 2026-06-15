// =============================================================
// AURA — <AnimatedBar>
// Barra horizontal que se rellena al entrar al viewport.
// Útil para dimensiones de bienestar, KPIs, etc.
// =============================================================

import { useInView } from '../utils/dynamicMotion.js';

export default function AnimatedBar({
  value,                 // 0-100
  max = 100,
  color = 'var(--c-lavanda-600)',
  trackColor = 'rgba(108, 80, 124, 0.08)',
  height = 10,
  duration = 1.2,
  delay = 0,
  rounded = true,
  showValue = false,
  label = null,
  className = '',
  style = {},
}) {
  const [refInView, inView] = useInView();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div ref={refInView} className={`animated-bar ${className}`} style={style}>
      {label && (
        <div className="ab-head">
          <span className="ab-label">{label}</span>
          {showValue && <span className="ab-value">{Math.round(value)}</span>}
        </div>
      )}
      <div
        className="ab-track"
        style={{
          background: trackColor,
          height: `${height}px`,
          borderRadius: rounded ? height : 0,
        }}
      >
        <div
          className="ab-fill"
          style={{
            width: inView ? `${pct}%` : '0%',
            background: color,
            transitionDuration: `${duration}s`,
            transitionDelay: `${delay}s`,
          }}
        />
      </div>
      <style>{`
        .animated-bar { width: 100%; }
        .ab-head { display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px; }
        .ab-label { color: var(--c-texto-soft); }
        .ab-value { color: var(--c-azul-800); font-weight: 700; }
        .ab-track {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .ab-fill {
          height: 100%;
          border-radius: inherit;
          transition: width cubic-bezier(.2,.7,.2,1);
          will-change: width;
          box-shadow: 0 0 12px rgba(157,123,217,0.25);
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-fill { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
