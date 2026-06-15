import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

export default function AdminInsights() {
  const [exec, setExec] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [anomaly, setAnomaly] = useState(null);
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState({});
  const [err, setErr] = useState(null);

  useEffect(() => {
    supabase.from('view_pumai_cost').select('*').limit(30)
      .then(({ data }) => setCosts(data || []));
    // Cargar últimos cacheados
    Promise.all([
      supabase.from('ai_insights').select('*').eq('kind', 'executive_report').order('generated_at', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('ai_insights').select('*').eq('kind', 'qualitative_feedback').order('generated_at', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('ai_insights').select('*').eq('kind', 'anomaly_detection').order('generated_at', { ascending: false }).limit(1).maybeSingle(),
    ]).then(([e, f, a]) => {
      setExec(e.data?.data ? { ...e.data.data, generated_at: e.data.generated_at } : null);
      setFeedback(f.data?.data ? { ...f.data.data, generated_at: f.data.generated_at } : null);
      setAnomaly(a.data?.data ? { ...a.data.data, generated_at: a.data.generated_at } : null);
    });
  }, []);

  async function generate(kind, force = false) {
    setLoading(s => ({ ...s, [kind]: true })); setErr(null);
    try {
      const { data, error } = await supabase.functions.invoke('ai-insights', {
        body: { kind, cache: !force },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (kind === 'executive_report') setExec(data);
      if (kind === 'qualitative_feedback') setFeedback(data);
      if (kind === 'anomaly_detection') setAnomaly(data);
    } catch (e) {
      setErr(`${kind}: ${e.message}`);
    } finally {
      setLoading(s => ({ ...s, [kind]: false }));
    }
  }

  const totalCost = costs.reduce((s, r) => s + Number(r.cost_total_usd || 0), 0);
  const totalCalls = costs.reduce((s, r) => s + (r.calls || 0), 0);

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag">Pum-AI Insights</span>
          <h1 className="mt-2">Inteligencia y costo del programa</h1>
          <p className="lede">
            Reportes ejecutivos, análisis cualitativo y detección de anomalías generados por Pum-AI.
            Los reportes se cachean 24h para no gastar créditos.
          </p>
        </div>
      </header>

      {err && <p className="feedback error">{err}</p>}

      <section className="panel">
        <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <h2>📊 Reporte ejecutivo</h2>
          <div style={{display:'flex',gap:6}}>
            <button className="btn btn-ghost btn-sm" onClick={() => generate('executive_report', true)} disabled={loading.executive_report}>
              {loading.executive_report ? 'Generando…' : '🔄 Regenerar'}
            </button>
          </div>
        </header>
        {!exec ? (
          <button className="btn btn-primary mt-2" onClick={() => generate('executive_report')} disabled={loading.executive_report}>
            {loading.executive_report ? 'Generando…' : '✨ Generar reporte ejecutivo'}
          </button>
        ) : (
          <ExecReportView data={exec} />
        )}
      </section>

      <section className="panel mt-3">
        <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <h2>💬 Análisis cualitativo del feedback</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => generate('qualitative_feedback', true)} disabled={loading.qualitative_feedback}>
            {loading.qualitative_feedback ? 'Generando…' : '🔄 Regenerar'}
          </button>
        </header>
        {!feedback ? (
          <button className="btn btn-primary mt-2" onClick={() => generate('qualitative_feedback')} disabled={loading.qualitative_feedback}>
            {loading.qualitative_feedback ? 'Generando…' : '✨ Analizar comentarios'}
          </button>
        ) : (
          <QualitativeView data={feedback} />
        )}
      </section>

      <section className="panel mt-3">
        <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <h2>⚠️ Detección de anomalías</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => generate('anomaly_detection', true)} disabled={loading.anomaly_detection}>
            {loading.anomaly_detection ? 'Generando…' : '🔄 Regenerar'}
          </button>
        </header>
        {!anomaly ? (
          <button className="btn btn-primary mt-2" onClick={() => generate('anomaly_detection')} disabled={loading.anomaly_detection}>
            {loading.anomaly_detection ? 'Generando…' : '✨ Detectar anomalías'}
          </button>
        ) : (
          <AnomalyView data={anomaly} />
        )}
      </section>

      <section className="panel mt-3">
        <h2>💰 Consumo Pum-AI (últimos 30 días)</h2>
        <div className="kpi-grid mt-2">
          <Kpi label="Llamadas" value={totalCalls} />
          <Kpi label="Costo USD" value={'$' + totalCost.toFixed(4)} accent="gold" />
          <Kpi label="Modelo" value={costs[0]?.model || 'pum-ai-flash'} />
        </div>
        {costs.length > 0 && (
          <div className="table-wrap mt-2">
            <table className="admin-table">
              <thead><tr><th>Día</th><th>Modelo</th><th>Llamadas</th><th>Tokens in</th><th>Tokens out</th><th>USD</th></tr></thead>
              <tbody>
                {costs.slice(0, 14).map((r, i) => (
                  <tr key={i}>
                    <td>{r.day}</td>
                    <td><code>{r.model}</code></td>
                    <td>{r.calls}</td>
                    <td>{r.tokens_in}</td>
                    <td>{r.tokens_out}</td>
                    <td>${Number(r.cost_total_usd).toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="note mt-2">Precios estimados: Pum-AI ≈ $0.075/1M tokens entrada, $0.30/1M salida (USD).</p>
      </section>

      <style>{`
        .feedback.error { background: var(--c-coral-100); color: #93362A; padding: 10px 14px; border-radius: 12px; }
      `}</style>
    </>
  );
}

function ExecReportView({ data }) {
  const tone = data.tone || 'estable';
  const toneColor = tone === 'alerta' ? 'var(--c-coral-500)' : tone === 'atender' ? 'var(--c-oro-600)' : 'var(--c-salvia-600)';
  return (
    <div className="mt-2">
      <span style={{padding:'3px 10px',borderRadius:8,background:toneColor,color:'#fff',fontSize:'0.78rem',fontWeight:700,textTransform:'uppercase'}}>
        {tone}
      </span>
      <p className="lede mt-2">{data.summary}</p>
      <h3>Hallazgos clave</h3>
      <ul>{(data.key_findings || []).map((k, i) => <li key={i}>{k}</li>)}</ul>
      <h3>Recomendaciones</h3>
      <ul>{(data.recommendations || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
      <small className="note">Generado: {data.generated_at ? new Date(data.generated_at).toLocaleString('es-MX') : 'recién'} · Periodo: {data.period_label}</small>
    </div>
  );
}

function QualitativeView({ data }) {
  return (
    <div className="mt-2">
      <p className="note">{data.total_comments || 0} comentarios analizados.</p>
      <div className="sentiment-row">
        <SentBar label="Positivo" pct={data.sentiment?.positive_pct || 0} color="var(--c-salvia-600)" />
        <SentBar label="Neutral"  pct={data.sentiment?.neutral_pct  || 0} color="var(--c-azul-700)" />
        <SentBar label="Negativo" pct={data.sentiment?.negative_pct || 0} color="var(--c-coral-500)" />
      </div>

      <h3 className="mt-3">Temas recurrentes</h3>
      <div className="themes">
        {(data.themes || []).map((t, i) => (
          <div key={i} className="theme">
            <strong>{t.label} <small>({t.count})</small></strong>
            {t.sample_quote && <em>"{t.sample_quote}"</em>}
          </div>
        ))}
      </div>

      <h3 className="mt-3">Sugerencias de mejora</h3>
      <ul>{(data.improvement_suggestions || []).map((s, i) => <li key={i}>{s}</li>)}</ul>

      <style>{`
        .sentiment-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 10px; }
        .themes { display: grid; gap: 8px; margin-top: 8px; }
        .theme { background: var(--c-marfil); padding: 12px 14px; border-radius: 10px; }
        .theme em { display: block; color: var(--c-texto-soft); font-size: 0.92rem; margin-top: 4px; }
      `}</style>
    </div>
  );
}

function SentBar({ label, pct, color }) {
  return (
    <div style={{textAlign:'center'}}>
      <div style={{height:60,display:'flex',alignItems:'flex-end'}}>
        <div style={{width:'100%',height: `${pct}%`,background: color,borderRadius:6,minHeight:4}} />
      </div>
      <small><strong>{pct}%</strong> {label}</small>
    </div>
  );
}

function AnomalyView({ data }) {
  const status = data.overall_status || 'estable';
  const statusColor = status === 'alerta' ? '#93362A' : status === 'atender' ? '#7B5E14' : '#2F8770';
  return (
    <div className="mt-2">
      <span style={{padding:'4px 12px',borderRadius:8,background: statusColor,color:'#fff',fontSize:'0.84rem',fontWeight:700,textTransform:'uppercase'}}>
        {status}
      </span>
      <p className="lede mt-2">{data.summary}</p>

      {data.recent && data.baseline && (
        <div className="mt-2 note">
          Últimos 7 días: <strong>{data.recent.total}</strong> sesiones,
          {' '}<strong>{(data.recent.priorityRate * 100).toFixed(1)}%</strong> prioritario,
          {' '}promedio <strong>{data.recent.avgScore}</strong>.
          Baseline: <strong>{data.baseline.total}</strong>,
          {' '}<strong>{(data.baseline.priorityRate * 100).toFixed(1)}%</strong> prioritario,
          {' '}promedio <strong>{data.baseline.avgScore}</strong>.
        </div>
      )}

      {(data.anomalies || []).length === 0 ? (
        <p className="note">No se detectaron anomalías relevantes.</p>
      ) : (
        <div className="anom-list mt-2">
          {data.anomalies.map((a, i) => (
            <article key={i} className={`anom sev-${a.severity}`}>
              <strong>{a.title}</strong>
              <p>{a.description}</p>
              {a.suggestion && <small>💡 {a.suggestion}</small>}
            </article>
          ))}
        </div>
      )}

      <style>{`
        .anom-list { display: grid; gap: 10px; }
        .anom { padding: 14px; background: var(--c-marfil); border-left: 3px solid var(--c-azul-700); border-radius: 8px; }
        .anom.sev-alerta { border-color: var(--c-coral-500); }
        .anom.sev-atender { border-color: var(--c-oro-600); }
        .anom strong { color: var(--c-azul-800); }
        .anom p { margin: 4px 0; font-size: 0.94rem; }
        .anom small { color: var(--c-gris); }
      `}</style>
    </div>
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
