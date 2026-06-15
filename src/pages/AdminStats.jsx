import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { LineChart, BarChart, HeatmapChart, DonutChart, FunnelChart } from '../components/Charts.jsx';

export default function AdminStats() {
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    (async () => {
      try {
        const [timeline, heatmap, variance, funnel, levels, pumai] = await Promise.all([
          supabase.from('view_sessions_timeline').select('*').limit(60),
          supabase.from('view_hourly_distribution').select('*'),
          supabase.from('view_question_variance').select('*'),
          supabase.from('view_completion_funnel').select('*').single(),
          supabase.from('assessment_sessions').select('general_level'),
          supabase.from('view_pumai_metrics').select('*').single(),
        ]);

        const lvlCount = { bajo: 0, moderado: 0, prioritario: 0 };
        for (const r of levels.data || []) {
          if (lvlCount[r.general_level] !== undefined) lvlCount[r.general_level]++;
        }

        // Ordena timeline ASC para gráfica
        const tl = (timeline.data || []).slice().reverse();

        setData({
          loading: false,
          timeline: tl,
          heatmap: heatmap.data || [],
          variance: variance.data || [],
          funnel: funnel.data || { started: 0, completed: 0, abandoned: 0 },
          levels: lvlCount,
          pumai: pumai.data || {},
        });
      } catch (e) {
        console.warn(e);
        setData({ loading: false, error: e.message });
      }
    })();
  }, []);

  if (data.loading) return <div className="spinner" style={{margin:'40px auto'}} />;

  const pumaiSuccessRate = data.pumai?.total_calls
    ? Math.round((data.pumai.pumai_count / data.pumai.total_calls) * 100)
    : null;

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag">Analítica</span>
          <h1 className="mt-2">Estadísticas y tendencias</h1>
          <p className="lede">
            Métricas agregadas para entender el comportamiento de la comunidad y la salud del sistema.
          </p>
        </div>
      </header>

      <div className="stats-grid">
        <section className="panel">
          <h2>Tendencia de sesiones (últimos días)</h2>
          <LineChart data={data.timeline} x="day" y="total" label="Sesiones por día" />
        </section>

        <section className="panel">
          <h2>Distribución por nivel</h2>
          <DonutChart label="sesiones" segments={[
            { label: 'Bajo',        value: data.levels.bajo,        color: '#8FB8A0' },
            { label: 'Moderado',    value: data.levels.moderado,    color: '#C9A227' },
            { label: 'Prioritario', value: data.levels.prioritario, color: '#D26B53' },
          ]}/>
        </section>
      </div>

      <section className="panel mt-3">
        <h2>Embudo de completación</h2>
        <FunnelChart steps={[
          { label: 'Sesiones iniciadas',      value: data.funnel.started || 0 },
          { label: 'Tests completados',       value: data.funnel.completed || 0 },
        ]} />
        {data.funnel.abandoned > 0 && (
          <p className="note">{data.funnel.abandoned} sesiones quedaron sin completar.</p>
        )}
      </section>

      <section className="panel mt-3">
        <h2>Heatmap de horarios</h2>
        <p className="note">Cuándo se hacen los tests (día de la semana × hora).</p>
        <HeatmapChart data={data.heatmap} />
      </section>

      <section className="panel mt-3">
        <h2>Preguntas con mayor varianza</h2>
        <p className="note">Reactivos que diferencian más a la población — los más informativos del instrumento.</p>
        <BarChart
          data={(data.variance || []).slice(0, 8).map(q => ({
            label: `#${q.sort_order}`,
            value: Number(q.stddev || 0),
            tip: q.question_text,
          }))}
          x="label" y="value" color="#C9A227"
        />
        <details className="mt-2"><summary>Ver detalles</summary>
          <ul style={{paddingLeft: 20, fontSize: '0.9rem'}}>
            {(data.variance || []).slice(0, 10).map(q => (
              <li key={q.question_id}>
                <strong>#{q.sort_order}</strong> ({q.dimension}, σ={Number(q.stddev || 0).toFixed(2)}): {q.question_text}
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section className="panel mt-3">
        <h2>Métricas de Pum-AI</h2>
        <div className="kpi-grid">
          <Kpi label="Llamadas totales" value={data.pumai?.total_calls ?? 0} />
          <Kpi label="Pum-AI exitosa" value={data.pumai?.pumai_count ?? 0} accent="sage" />
          <Kpi label="Fallback local" value={data.pumai?.fallback_count ?? 0} accent="coral" />
          <Kpi label="Tasa de éxito" value={pumaiSuccessRate != null ? pumaiSuccessRate + '%' : '—'} accent="gold" />
        </div>
      </section>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
          align-items: start;
        }
        .chart-svg {
          width: 100%;
          height: auto;
        }
        .chart-empty {
          padding: 32px;
          text-align: center;
          color: var(--c-gris);
          background: var(--c-marfil);
          border-radius: 12px;
        }
        @media (max-width: 880px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

function Kpi({ label, value, accent }) {
  return (
    <div className={`kpi-card ${accent || ''}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}
