// =============================================================
// AURA — DimensionBubbles 3D
// Esferas distribuidas en una esfera virtual.
// Rotación ambiental lenta + drag con mouse en horizontal y vertical.
// =============================================================

import { useEffect, useMemo, useRef, useState } from 'react';

const COLORS = {
  estado_emocional:        ['#1A3358', '#10243E'],
  estres_academico:        ['#D26B53', '#B5403E'],
  sueno_descanso:          ['#B7A8D9', '#6E5BA0'],
  apoyo_social:            ['#8FB8A0', '#4FA88E'],
  motivacion_pertenencia:  ['#E5C868', '#B08F1F'],
};
const DEFAULT_GRADIENT = ['#1A3358', '#10243E'];

const VIEW_W   = 720;
const VIEW_H   = 460;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = VIEW_H / 2;
const SPHERE_R = 160;        // radio de la esfera virtual
const PERSPECTIVE = 600;     // factor de perspectiva (mayor = menos efecto 3D)
const AMBIENT_SPEED = 0.00018; // rad/ms

function lighten(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.round(2.55 * percent));
  const g = Math.min(255, ((n >> 8)  & 0xff) + Math.round(2.55 * percent));
  const b = Math.min(255, (n & 0xff) + Math.round(2.55 * percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default function DimensionBubbles({ data = [] }) {
  const svgRef = useRef(null);
  const ambientStateRef = useRef({ rotY: 0, rotX: 0.25 });
  const [tick, setTick] = useState(0);
  const [drag, setDrag] = useState(null); // {startX, startY, startRotX, startRotY}

  // Posiciones 3D fijas usando Fibonacci sphere para distribución uniforme
  const items3D = useMemo(() => {
    const n = data.length || 1;
    return data.map((d, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        ...d,
        p: {
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.sin(phi) * Math.sin(theta),
          z: Math.cos(phi),
        },
      };
    });
  }, [data]);

  // Tamaño de cada esfera proporcional a menciones
  const max = Math.max(1, ...data.map(d => d.mentions || 0));
  const min = Math.min(...data.map(d => d.mentions || 0));
  const baseRadius = (m) => max === min ? 38 : 30 + ((m - min) / (max - min)) * 28;

  // Ambient rotation loop
  useEffect(() => {
    let raf;
    let last = performance.now();
    const loop = (now) => {
      const dt = now - last;
      last = now;
      if (!drag) {
        ambientStateRef.current.rotY += dt * AMBIENT_SPEED;
      }
      setTick(t => t + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [drag]);

  // Pointer handlers (mouse + touch)
  function onPointerDown(e) {
    e.preventDefault();
    const { rotX, rotY } = ambientStateRef.current;
    setDrag({ startX: e.clientX, startY: e.clientY, startRotX: rotX, startRotY: rotY });
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    ambientStateRef.current.rotY = drag.startRotY + dx * 0.006;
    ambientStateRef.current.rotX = clamp(drag.startRotX + dy * 0.005, -1.2, 1.2);
  }
  function onPointerUp(e) {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setDrag(null);
  }

  // Proyección 3D → 2D con perspectiva
  const { rotX, rotY } = ambientStateRef.current;
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

  const projected = items3D.map(b => {
    const { x, y, z } = b.p;
    // Rotación Y
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;
    const y1 = y;
    // Rotación X
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;
    const x2 = x1;
    // Perspectiva (z -> escala)
    const zPx = z2 * SPHERE_R;
    const scale = PERSPECTIVE / (PERSPECTIVE - zPx);
    return {
      ...b,
      sx: CENTER_X + x2 * SPHERE_R * scale,
      sy: CENTER_Y + y2 * SPHERE_R * scale,
      depth: z2,
      scale,
    };
  });

  // Sort: las más al fondo se dibujan primero
  projected.sort((a, b) => a.depth - b.depth);

  if (!data.length) {
    return (
      <div className="empty-bubbles">
        <p className="note">Aún no hay datos suficientes para construir el modelo dimensional. En cuanto lleguen sesiones, las esferas tomarán forma.</p>
      </div>
    );
  }

  return (
    <div className="bubbles-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className={`bubbles-svg ${drag ? 'dragging' : ''}`}
        role="img"
        aria-label="Modelo dimensional 3D del bienestar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{cursor: drag ? 'grabbing' : 'grab', touchAction: 'none'}}
      >
        <defs>
          {projected.map((b) => {
            const [c1, c2] = COLORS[b.dimension_id] || DEFAULT_GRADIENT;
            return (
              <radialGradient
                key={`grad-${b.dimension_id}`}
                id={`grad-${b.dimension_id}`}
                cx="32%" cy="28%" r="75%"
              >
                <stop offset="0%"  stopColor={lighten(c1, 35)} />
                <stop offset="55%" stopColor={c1} />
                <stop offset="100%" stopColor={c2} />
              </radialGradient>
            );
          })}
          <filter id="bubble-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#10243E" floodOpacity="0.30"/>
          </filter>
          <radialGradient id="aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#C9A227" stopOpacity="0.18"/>
            <stop offset="60%"  stopColor="#C9A227" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* aura central */}
        <circle cx={CENTER_X} cy={CENTER_Y} r={SPHERE_R + 60} fill="url(#aura)" />

        {/* "AURA" centro */}
        <circle cx={CENTER_X} cy={CENTER_Y} r="10" fill="#C9A227" opacity="0.85"/>
        <text
          x={CENTER_X} y={CENTER_Y + 26}
          textAnchor="middle" fontSize="11"
          fill="#10243E" fontWeight="700"
          style={{userSelect: 'none', pointerEvents: 'none'}}
        >
          AURA
        </text>

        {/* esferas */}
        {projected.map((b) => {
          const r = baseRadius(b.mentions || 0) * b.scale;
          const opacity = 0.55 + (b.depth + 1) * 0.225; // .55..1
          return (
            <g
              key={b.dimension_id}
              transform={`translate(${b.sx}, ${b.sy})`}
              style={{opacity}}
            >
              <circle
                r={r}
                fill={`url(#grad-${b.dimension_id})`}
                filter="url(#bubble-shadow)"
              />
              {/* reflejo */}
              <ellipse
                cx={-r * 0.32}
                cy={-r * 0.42}
                rx={r * 0.34}
                ry={r * 0.18}
                fill="white"
                opacity="0.35"
              />
              {b.depth > -0.1 && (
                <>
                  <text
                    y={r + 16}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#10243E"
                    style={{userSelect: 'none', pointerEvents: 'none'}}
                  >
                    {b.dimension_label || b.dimension_id}
                  </text>
                  <text
                    y={r + 28}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#6B7280"
                    style={{userSelect: 'none', pointerEvents: 'none'}}
                  >
                    {b.mentions} {b.mentions === 1 ? 'mención' : 'menciones'}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* hint de interacción */}
        <text
          x={VIEW_W - 12} y={VIEW_H - 12}
          textAnchor="end" fontSize="10"
          fill="#9CA3AF"
          style={{userSelect: 'none', pointerEvents: 'none'}}
        >
          {drag ? 'Soltando para volver a animación' : 'Arrastra para rotar ↻'}
        </text>
      </svg>

      <div className="bubbles-legend">
        {data.map(d => {
          const [c1] = COLORS[d.dimension_id] || DEFAULT_GRADIENT;
          return (
            <div key={d.dimension_id} className="legend-item">
              <span className="legend-dot" style={{background: c1}} />
              <div>
                <strong>{d.dimension_label}</strong>
                <small>
                  {d.mentions} {d.mentions === 1 ? 'mención' : 'menciones'}
                  {' · '}Promedio: {d.avg_score}
                </small>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .bubbles-wrap {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .bubbles-svg {
          width: 100%;
          height: auto;
          background: radial-gradient(ellipse at center, #FFFAF5, #ffffff 75%);
          border-radius: var(--r-xl);
          border: 1px solid var(--c-borde);
          user-select: none;
        }
        .bubbles-svg.dragging { background: radial-gradient(ellipse at center, #FBF1D2, #ffffff 75%); }
        .empty-bubbles {
          padding: 48px;
          text-align: center;
          background: var(--c-marfil);
          border: 1px dashed var(--c-borde);
          border-radius: var(--r-xl);
        }
        .bubbles-legend {
          display: grid;
          gap: 10px;
        }
        .legend-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: 12px;
          font-size: 0.92rem;
        }
        .legend-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          box-shadow:
            inset -3px -3px 4px rgba(0,0,0,0.18),
            0 2px 4px rgba(0,0,0,0.12);
        }
        .legend-item strong { color: var(--c-azul-800); display: block; }
        .legend-item small  { color: var(--c-gris); font-size: 0.82rem; }

        @media (max-width: 880px) {
          .bubbles-wrap { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
