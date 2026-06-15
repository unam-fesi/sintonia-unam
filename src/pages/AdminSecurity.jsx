// =============================================================
// AURA — /admin/seguridad
// Visor de security_events con filtros por severidad/categoría.
// Datos baratos: solo lee la vista, no escribe.
// =============================================================

import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import Icon from '../components/Icon.jsx';

const SEVERITY_COLOR = {
  low:      { bg: 'var(--c-mint-100)',   fg: 'var(--c-mint-700)' },
  medium:   { bg: 'var(--c-oro-100)',    fg: 'var(--c-oro-700)' },
  high:     { bg: 'var(--c-peach-100)',  fg: 'var(--c-peach-700)' },
  critical: { bg: 'var(--c-coral-100)',  fg: 'var(--c-coral-700)' },
};

const CATEGORY_LABEL = {
  honeypot:           'Honeypot',
  prompt_injection:   'Inyección de prompt',
  rate_limit:         'Rate limit',
  rls_violation:      'Violación RLS',
  auth_failure:       'Auth fallida',
  abuse_detected:     'Abuso',
  pii_detected:       'PII detectada',
  crisis_signal:      'Señal crisis',
  quota_exceeded:     'Quota excedida',
  suspicious_pattern: 'Patrón sospechoso',
};

export default function AdminSecurity() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severity, setSeverity] = useState('all');
  const [category, setCategory] = useState('all');
  const [range, setRange] = useState('24h');
  const [stats, setStats] = useState({ total: 0, by_severity: {}, by_category: {} });

  async function load() {
    setLoading(true);
    let q = supabase.from('security_events').select('*');
    const since = new Date(Date.now() - (range === '24h' ? 24 : range === '7d' ? 168 : 720) * 3600 * 1000).toISOString();
    q = q.gte('created_at', since);
    if (severity !== 'all') q = q.eq('severity', severity);
    if (category !== 'all') q = q.eq('category', category);
    q = q.order('created_at', { ascending: false }).limit(200);
    const { data } = await q;
    setRows(data || []);

    // Stats agregados
    const bySev = {}; const byCat = {};
    for (const r of (data || [])) {
      bySev[r.severity] = (bySev[r.severity] || 0) + 1;
      byCat[r.category] = (byCat[r.category] || 0) + 1;
    }
    setStats({ total: data?.length || 0, by_severity: bySev, by_category: byCat });
    setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [severity, category, range]);

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag coral">Seguridad</span>
          <h1 className="mt-2">Eventos de seguridad</h1>
          <p className="lede">
            Honeypots, intentos de inyección, brute force, violaciones RLS y otros incidentes
            registrados por las defensas de AURA. Datos hasheados — sin PII.
          </p>
        </div>
      </header>

      {/* Filtros */}
      <div className="sec-filters">
        <div className="sec-filter-group">
          <label>Rango</label>
          <select value={range} onChange={e => setRange(e.target.value)}>
            <option value="24h">Últimas 24h</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
          </select>
        </div>
        <div className="sec-filter-group">
          <label>Severidad</label>
          <select value={severity} onChange={e => setSeverity(e.target.value)}>
            <option value="all">Todas</option>
            <option value="critical">Crítica</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
        <div className="sec-filter-group">
          <label>Categoría</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">Todas</option>
            {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={load}>Actualizar</button>
      </div>

      {/* Stats cards */}
      <div className="sec-stats mt-3">
        <div className="sec-stat">
          <div className="sec-stat-num">{stats.total}</div>
          <div className="sec-stat-lbl">Eventos</div>
        </div>
        <div className="sec-stat sec-coral">
          <div className="sec-stat-num">{stats.by_severity.critical || 0}</div>
          <div className="sec-stat-lbl">Críticos</div>
        </div>
        <div className="sec-stat sec-peach">
          <div className="sec-stat-num">{stats.by_severity.high || 0}</div>
          <div className="sec-stat-lbl">Altos</div>
        </div>
        <div className="sec-stat sec-oro">
          <div className="sec-stat-num">{stats.by_severity.medium || 0}</div>
          <div className="sec-stat-lbl">Medios</div>
        </div>
        <div className="sec-stat sec-mint">
          <div className="sec-stat-num">{stats.by_severity.low || 0}</div>
          <div className="sec-stat-lbl">Bajos</div>
        </div>
      </div>

      {/* Tabla */}
      <section className="panel mt-4">
        {loading ? <div className="spinner" style={{margin:'40px auto'}} /> :
         rows.length === 0 ? <p className="note text-center">Sin eventos para este filtro. 🟢</p> : (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cuándo</th>
                  <th>Sev</th>
                  <th>Categoría</th>
                  <th>Fuente</th>
                  <th>IP (prefix)</th>
                  <th>Scope</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => {
                  const sc = SEVERITY_COLOR[r.severity] || SEVERITY_COLOR.low;
                  return (
                    <tr key={r.id}>
                      <td>
                        <small style={{whiteSpace:'nowrap'}}>{new Date(r.created_at).toLocaleString('es-MX', { hour12: false })}</small>
                      </td>
                      <td>
                        <span className="sev-pill" style={{background: sc.bg, color: sc.fg}}>
                          {r.severity}
                        </span>
                      </td>
                      <td>{CATEGORY_LABEL[r.category] || r.category}</td>
                      <td><code style={{fontSize:'0.74rem'}}>{r.source}</code></td>
                      <td><small>{r.ip_prefix || '—'}</small></td>
                      <td><small>{r.scope ? `${r.scope}=${r.scope_value?.slice(0,12)}…` : '—'}</small></td>
                      <td>
                        <details>
                          <summary style={{cursor:'pointer', fontSize:'0.84rem'}}>Ver</summary>
                          <pre style={{fontSize:'0.72rem', maxWidth:300, overflow:'auto', margin:'4px 0 0', background:'var(--c-marfil)', padding:'8px', borderRadius:6}}>
                            {JSON.stringify(r.detail || {}, null, 2).slice(0, 600)}
                          </pre>
                        </details>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <style>{`
        .sec-filters {
          display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;
          margin-top: 12px;
        }
        .sec-filter-group { display: flex; flex-direction: column; gap: 4px; }
        .sec-filter-group label { font-size: 0.74rem; color: var(--c-gris); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .sec-filter-group select { padding: 8px 12px; border: 1px solid var(--c-borde); border-radius: 8px; background: white; }

        .sec-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        @media (max-width: 720px) { .sec-stats { grid-template-columns: repeat(2, 1fr); } }
        .sec-stat {
          padding: 14px 18px; border-radius: 14px;
          background: var(--c-azul-100); border: 1px solid var(--c-borde-soft);
          text-align: center;
        }
        .sec-stat-num { font-family: var(--ff-serif); font-size: 1.8rem; font-weight: 800; color: var(--c-azul-800); }
        .sec-stat-lbl { font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--c-gris); }
        .sec-coral  { background: var(--c-coral-100); border-color: rgba(232,130,107,0.30); }
        .sec-coral  .sec-stat-num { color: var(--c-coral-700); }
        .sec-peach  { background: var(--c-peach-100); border-color: rgba(255,154,123,0.30); }
        .sec-peach  .sec-stat-num { color: var(--c-peach-700); }
        .sec-oro    { background: var(--c-oro-100);   border-color: rgba(201,162,39,0.30); }
        .sec-oro    .sec-stat-num { color: var(--c-oro-700); }
        .sec-mint   { background: var(--c-mint-100);  border-color: rgba(125,196,174,0.40); }
        .sec-mint   .sec-stat-num { color: var(--c-mint-700); }

        .sev-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      `}</style>
    </>
  );
}
