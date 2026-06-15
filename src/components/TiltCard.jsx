// =============================================================
// AURA — <TiltCard>
// Wrapper para cards con tilt 3D + glow lumínico siguiendo cursor.
//
// Uso:
//   <TiltCard className="panel">
//     <h3>Card title</h3>
//     <p>Contenido...</p>
//   </TiltCard>
// =============================================================

import { useTilt3D } from '../utils/dynamicMotion.js';

export default function TiltCard({
  children,
  as: Tag = 'div',
  max = 14,
  scale = 1.03,
  glow = true,
  glowColor = 'rgba(183, 168, 217, 0.45)',   // lavanda
  className = '',
  style = {},
  ...rest
}) {
  const ref = useTilt3D({ max, scale, glow });
  return (
    <Tag
      ref={ref}
      className={`tilt-card ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.05s linear, box-shadow 0.3s ease',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {children}
      {glow && (
        <div className="tilt-glow" aria-hidden="true" />
      )}

      <style>{`
        .tilt-card { --tilt-x: 50%; --tilt-y: 50%; }
        .tilt-card .tilt-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(circle at var(--tilt-x) var(--tilt-y), ${glowColor} 0%, transparent 45%);
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
          z-index: 0;
        }
        .tilt-card:hover .tilt-glow { opacity: 1; }
        .tilt-card > * { position: relative; z-index: 1; }
        @media (prefers-reduced-motion: reduce) {
          .tilt-card { transform: none !important; }
          .tilt-card .tilt-glow { display: none; }
        }
        @media (hover: none) {
          /* En táctil sin tilt 3D para no marear */
          .tilt-card .tilt-glow { display: none; }
        }
      `}</style>
    </Tag>
  );
}
