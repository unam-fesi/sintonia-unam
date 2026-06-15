// =============================================================
// AURA — /admin/costos-ai
// Dashboard de uso y costos de Pum-AI (Gemini). Lee de
// gemini_usage que ya tiene los tokens y el estimado por llamada.
// =============================================================

import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import Counter from '../components/Counter.jsx';

const FEATURE_LABEL = {
  chat_companion:    'Companion',
  buddy_ai:          'Buddy IA',
  journal_suggest:   'Diario sugerencias',
  orientation:       'Orientación post-test',
  wellness_route:    'Ruta de bienestar',
};

const FEATURE_COLOR = {
  chat_companion:    'var(--c-azul-800)',
  buddy_ai:          'var(--c-lavanda-600)',
  journal_suggest:   'var(--c-peach-600)',
  orientation:       'var(--c-mint-600)',
  wellness_route:    'var(--c-oro-600)',
};

export default function AdminAICost() {
  const [range, setRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ total: 0, calls: 0, tokens_in: 0, tokens_out: 0, by_feature: [], by_day: [] });

  async function load() {
    setLoading(true);
    const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720;
    const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();
    const { data: rows } = await supabase
      .from('gemini_usage')
      .select('feature, tokens_in, tokens_out, cost_usd_est, ok, created_at')
      .gte('created_at', since)
      .limit(5000);

    let total = 0, calls = 0, tin = 0, tout = 0;
    const byFeat = {};
    const byDay = {};
    for (const r of (rows || [])) {
      calls++;
      tin  += Number(r.tokens_in)  || 0;
      tout += Number(r.tokens_out) || 0;
      total += Number(r.cost_usd_est) || 0;

      const f = r.feature || 'unknown';
      byFeat[f] = byFeat[f] || { feature: f, calls: 0, tokens_in: 0, tokens_out: 0, cost: 0 };
      byFeat[f].calls++;
      byFeat[f].tokens_in  += Number(r.tokens_in)  || 0;
      byFeat[f].tokens_out += Number(r.tokens_out) || 0;
      byFeat[f].cost       += Number(r.cost_usd_est) || 0;

      const d = String(r.created_at).slice(0, 10);
      byDay[d] = byDay[d] || { day: d, calls: 0, cost: 0 };
      byDay[d].calls++;
      byDay[d].cost += Number(r.cost_usd_est) || 0;
    }

    setData({
      total, calls, tokens_in: tin, tokens_out: tout,
      by_feature: Object.values(byFeat).sort((a, b) => b.cost - a.cost),
      by_day: Object.values(byDay).sort((a, b) => a.day.localeCompare(b.day)),
    });
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [range]);

  const maxDayCost = Math.max(0.0001, ...data.by_day.map(d => d.cost));

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag oro">Pum-AI</span>
          <h1 className="mt-2">Costos y uso de IA</h1>
          <p className="lede">
            Cuánto se ha usado Pum-AI por feature y día. Cuotas activas: ver
            sección Operación. Los datos se calculan client-side desde <code>gemini_usage</code>.
          </p>
        </div>
        <div>
          <select value={range} onChange={e => setRange(e.target.value)} style={{padding:'8px 12px', borderRadius:8, border:'1px solid var(--c-borde)'}}>
            <option value="24h">Últimas 24h</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
          </select>
        </div>
      </header>

      {/* KPIs */}
      <div className="aicost-kpis mt-3">
        <div className="aic-card">
          <div className="aic-num"><Counter to={data.calls} duration={900} /></div>
          <div className="aic-lbl">Llamadas</div>
        </div>
        <div className="aic-card">
          <div className="aic-num">
            <Counter to={Math.round(data.tokens_in / 1000)} duration={900} />k
          </div>
          <div className="aic-lbl">Tokens entrada</div>
        </div>
        <div className="aic-card">
          <div className="aic-num">
            <Counter to={Math.round(data.tokens_out / 1000)} duration={900} />k
          </div>
          <div className="aic-lbl">Tokens salida</div>
        </div>
        <div className="aic-card aic-highlight">
          <div className="aic-num">${data.total.toFixed(4)}</div>
          <div className="aic-lbl">Costo estimado USD</div>
        </div>
      </div>

      {/* Tabla por feature */}
      <section className="panel mt-4">
        <h2>Uso por feature</h2>
        {loading ? <div className="spinner" style={{margin:'24px auto'}} /> :
         data.by_feature.length === 0 ? <p className="note text-center">Sin datos.</p> : (
          <div className="table-wrap mt-2">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Llamadas</th>
                  <th>Tokens in</th>
                  <th>Tokens out</th>
                  <th>Costo USD est.</th>
                </tr>
              </thead>
              <tbody>
                {data.by_feature.map(f => (
                  <tr key={f.feature}>
                    <td>
                      <span style={{display:'inline-block', width:8, height:8, borderRadius:'50%', background: FEATURE_COLOR[f.feature], marginRight:8}} />
                      {FEATURE_LABEL[f.feature] || f.feature}
                    </td>
                    <td><strong>{f.calls}</strong></td>
                    <td>{f.tokens_in.toLocaleString()}</td>
                    <td>{f.tokens_out.toLocaleString()}</td>
                    <td><strong>${f.cost.toFixed(4)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Gráfica por día */}
      <section className="panel mt-4">
        <h2>Costo por día</h2>
        <div className="day-bars">
          {data.by_day.map(d => {
            const h = Math.max(2, (d.cost / maxDayCost) * 100);
            return (
              <div key={d.day} className="day-bar" title={`${d.day}: ${d.calls} calls, $${d.cost.toFixed(4)}`}>
                <div className="day-bar-fill" style={{height: `${h}%`}} />
                <small>{d.day.slice(5)}</small>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        .aicost-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        @media (max-width: 720px) { .aicost-kpis { grid-template-columns: repeat(2, 1fr); } }
        .aic-card {
          padding: 16px 18px; border-radius: 14px;
          background: var(--c-azul-100); border: 1px solid var(--c-borde-soft);
          text-align: center;
        }
        .aic-num { font-family: var(--ff-serif); font-size: 1.9rem; font-weight: 800; color: var(--c-azul-800); }
        .aic-lbl { font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--c-gris); margin-top: 2px; }
        .aic-highlight { background: linear-gradient(135deg, var(--c-oro-100), var(--c-peach-100)); border-color: var(--c-oro-600); }
        .aic-highlight .aic-num { color: var(--c-oro-700); }

        .day-bars { display: flex; gap: 6px; align-items: flex-end; height: 200px; margin-top: 16px; padding: 8px; }
        .day-bar { flex: 1; min-width: 32px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; gap: 4px; }
        .day-bar-fill {
          width: 100%; min-height: 2px;
          background: linear-gradient(180deg, var(--c-oro-600), var(--c-peach-600));
          border-radius: 6px 6px 0 0;
          transition: height 0.6s cubic-bezier(.2,.7,.2,1);
        }
        .day-bar small { font-size: 0.68rem; color: var(--c-gris); }
      `}</style>
    </>
  );
}
