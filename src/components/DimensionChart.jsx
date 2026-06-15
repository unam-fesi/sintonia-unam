import { LEVEL_LABELS } from '../utils/constants.js';
import { useInView } from '../utils/dynamicMotion.js';
import Counter from './Counter.jsx';
import './DimensionChart.css';

export default function DimensionChart({ dimensions }) {
  const entries = Object.entries(dimensions);
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className="dim-chart" role="list">
      {entries.map(([id, dim], i) => (
        <div key={id} className="dim-row" role="listitem" style={{ animationDelay: `${i * 0.08}s` }}>
          <div className="dim-label">{dim.label}</div>
          <div className="dim-track" aria-label={`Puntaje ${dim.score} de 100`}>
            <span
              className={`dim-fill lvl-bg-${dim.level}`}
              style={{
                width: inView ? `${dim.score}%` : '0%',
                transitionDelay: `${0.2 + i * 0.12}s`,
              }}
            />
          </div>
          <div className={`dim-value lvl-${dim.level}`}>
            <Counter to={Number(dim.score) || 0} duration={1400 + i * 100} />
            <small>{LEVEL_LABELS[dim.level]}</small>
          </div>
        </div>
      ))}
      <style>{`
        .dim-fill {
          transition: width 1.4s cubic-bezier(.2,.7,.2,1);
          will-change: width;
        }
        @media (prefers-reduced-motion: reduce) {
          .dim-fill { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
