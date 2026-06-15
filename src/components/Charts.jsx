// =============================================================
// AURA — Gráficas simples SVG (sin dependencias externas)
// =============================================================

// Línea temporal
export function LineChart({ data, x = 'day', y = 'total', label, height = 220 }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">Sin datos suficientes.</div>;
  }
  const W = 700, H = height, P = 32;
  const ys = data.map(d => Number(d[y] || 0));
  const maxY = Math.max(1, ...ys);
  const points = data.map((d, i) => ({
    x: P + (i / Math.max(1, data.length - 1)) * (W - 2 * P),
    y: H - P - (Number(d[y] || 0) / maxY) * (H - 2 * P),
    label: d[x],
    val: d[y],
  }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  const area = `${path} L ${points[points.length-1].x},${H - P} L ${points[0].x},${H - P} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label={label}>
      <defs>
        <linearGradient id="line-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10243E" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#10243E" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(t => (
        <line key={t} x1={P} y1={P + t*(H-2*P)} x2={W-P} y2={P + t*(H-2*P)} stroke="#E5E7EB" strokeDasharray="4 4"/>
      ))}
      <path d={area} fill="url(#line-grad)" />
      <path d={path} fill="none" stroke="#10243E" strokeWidth="2" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#C9A227" stroke="#fff" strokeWidth="1.5" />
          <title>{p.label}: {p.val}</title>
        </g>
      ))}
      <text x={P} y={H-8} fontSize="10" fill="#6B7280">{points[0]?.label}</text>
      <text x={W-P} y={H-8} textAnchor="end" fontSize="10" fill="#6B7280">{points[points.length-1]?.label}</text>
      <text x={P} y={P-8} fontSize="10" fill="#6B7280">{maxY}</text>
    </svg>
  );
}

// Barras
export function BarChart({ data, x = 'label', y = 'value', height = 220, color = '#1A3358' }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">Sin datos.</div>;
  }
  const W = 700, H = height, P = 32;
  const ys = data.map(d => Number(d[y] || 0));
  const maxY = Math.max(1, ...ys);
  const bw = (W - 2 * P) / data.length - 8;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img">
      {[0.25, 0.5, 0.75].map(t => (
        <line key={t} x1={P} y1={P + t*(H-2*P)} x2={W-P} y2={P + t*(H-2*P)} stroke="#E5E7EB" strokeDasharray="4 4"/>
      ))}
      {data.map((d, i) => {
        const xPos = P + i * ((W - 2 * P) / data.length) + 4;
        const h = (Number(d[y] || 0) / maxY) * (H - 2 * P);
        return (
          <g key={i}>
            <rect x={xPos} y={H - P - h} width={bw} height={h} fill={color} rx="6">
              <title>{d[x]}: {d[y]}</title>
            </rect>
            <text x={xPos + bw/2} y={H-10} textAnchor="middle" fontSize="9" fill="#6B7280">
              {String(d[x]).slice(0, 12)}
            </text>
            <text x={xPos + bw/2} y={H - P - h - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill="#10243E">
              {d[y]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Heatmap (día semana × hora del día)
export function HeatmapChart({ data, height = 280 }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">Sin datos suficientes.</div>;
  }
  const W = 700, H = height, P = 36;
  const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const cellW = (W - P*1.5) / 24;
  const cellH = (H - P*1.5) / 7;
  const max = Math.max(1, ...data.map(d => d.total || 0));

  function color(v) {
    const t = v / max;
    const r = Math.round(16 + (201 - 16) * t);
    const g = Math.round(36 + (162 - 36) * t);
    const b = Math.round(62 + (39 - 62) * t);
    return `rgb(${r},${g},${b})`;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg">
      {days.map((d, di) => (
        <text key={d} x={P-8} y={P + (di + 0.6) * cellH} textAnchor="end" fontSize="10" fill="#6B7280">{d}</text>
      ))}
      {Array.from({length: 24}).map((_, h) => (
        h % 3 === 0 ? <text key={h} x={P + (h + 0.5) * cellW} y={H-12} textAnchor="middle" fontSize="9" fill="#6B7280">{h}h</text> : null
      ))}
      {Array.from({length: 7}).flatMap((_, d) =>
        Array.from({length: 24}).map((_, h) => {
          const cell = data.find(c => c.day_of_week === d && c.hour_of_day === h);
          const v = cell?.total || 0;
          return (
            <rect
              key={`${d}-${h}`}
              x={P + h * cellW} y={P + d * cellH}
              width={cellW - 1.5} height={cellH - 1.5}
              fill={v ? color(v) : '#F4F7FB'}
              rx="3"
            >
              <title>{days[d]} {h}h: {v}</title>
            </rect>
          );
        })
      )}
    </svg>
  );
}

// Donut simple para distribución por nivel
export function DonutChart({ segments, label }) {
  // segments: [{label, value, color}]
  if (!segments || segments.length === 0) return <div className="chart-empty">Sin datos.</div>;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const cx = 100, cy = 100, R = 80, r = 50;
  let acc = 0;

  function arc(start, end) {
    const sx = cx + R * Math.cos(start - Math.PI/2);
    const sy = cy + R * Math.sin(start - Math.PI/2);
    const ex = cx + R * Math.cos(end - Math.PI/2);
    const ey = cy + R * Math.sin(end - Math.PI/2);
    const isx = cx + r * Math.cos(end - Math.PI/2);
    const isy = cy + r * Math.sin(end - Math.PI/2);
    const iex = cx + r * Math.cos(start - Math.PI/2);
    const iey = cy + r * Math.sin(start - Math.PI/2);
    const large = end - start > Math.PI ? 1 : 0;
    return `M ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey} L ${isx} ${isy} A ${r} ${r} 0 ${large} 0 ${iex} ${iey} Z`;
  }

  return (
    <svg viewBox="0 0 200 200" className="chart-svg" style={{maxWidth: 220}}>
      {segments.map((s, i) => {
        const start = (acc / total) * Math.PI * 2;
        acc += s.value;
        const end = (acc / total) * Math.PI * 2;
        return (
          <path key={i} d={arc(start, end)} fill={s.color}>
            <title>{s.label}: {s.value} ({Math.round(s.value/total*100)}%)</title>
          </path>
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="800" fill="#10243E">{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#6B7280">{label}</text>
    </svg>
  );
}

// Embudo
export function FunnelChart({ steps }) {
  // steps: [{label, value}]
  if (!steps || steps.length === 0) return <div className="chart-empty">Sin datos.</div>;
  const W = 700, H = 60 * steps.length + 20;
  const max = Math.max(1, ...steps.map(s => s.value));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg">
      {steps.map((s, i) => {
        const w = (s.value / max) * (W - 100);
        const x = (W - w) / 2;
        const y = i * 60 + 10;
        const pct = max ? Math.round((s.value / max) * 100) : 0;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={48} rx="8"
              fill={`rgba(16,36,62,${0.85 - i * 0.15})`} />
            <text x={W/2} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
              {s.label}
            </text>
            <text x={W/2} y={y + 40} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.85)">
              {s.value} ({pct}%)
            </text>
          </g>
        );
      })}
    </svg>
  );
}
