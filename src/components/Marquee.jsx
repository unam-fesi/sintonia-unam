// =============================================================
// AURA — <Marquee>
// Banda de texto rolando infinito. Útil para frases inspiracionales
// o tickers de información del programa.
//
// Uso:
//   <Marquee>
//     <span>Respira ·</span><span>Te acompañamos ·</span><span>No estás solo</span>
//   </Marquee>
//   <Marquee speed={40} reverse>...</Marquee>
// =============================================================

export default function Marquee({
  children,
  speed = 28,           // segundos para una vuelta completa
  reverse = false,
  pauseOnHover = true,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`marquee-wrap ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className={`marquee-track ${reverse ? 'reverse' : ''} ${pauseOnHover ? 'pause-hover' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group">{children}</div>
      </div>
      <style>{`
        .marquee-wrap {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .marquee-wrap::before,
        .marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrap::before {
          left: 0;
          background: linear-gradient(to right, rgba(255,250,245,1), transparent);
        }
        .marquee-wrap::after {
          right: 0;
          background: linear-gradient(to left, rgba(255,250,245,1), transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeRoll linear infinite;
        }
        .marquee-track.reverse { animation-direction: reverse; }
        .marquee-track.pause-hover:hover { animation-play-state: paused; }
        .marquee-group {
          display: flex;
          align-items: center;
          gap: 36px;
          padding: 0 18px;
        }
        @keyframes marqueeRoll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
