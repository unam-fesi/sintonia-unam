// =============================================================
// AURA — Admin: Usuarios anónimos
// Rediseño con cards visuales, filtros, delete cascada (admin only)
// =============================================================

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

const MS_DAY = 24 * 3600 * 1000;
const FACULTY_COLORS = ['#10243E','#C9A227','#8FB8A0','#D26B53','#B7A8D9','#1A3358','#4FA88E'];

export default function AdminAnonymous({ ctx }) {
  const isFullAdmin = ctx?.admin?.role === 'admin';

  const [users, setUsers] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState({ key: 'engagement_score', dir: 'desc' });
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    const [u, k, f] = await Promise.all([
      supabase.from('view_student_activity').select('*'),
      supabase.from('view_anonymous_kpis').select('*').maybeSingle(),
      supabase.from('view_faculty_distribution').select('*'),
    ]);
    setUsers(u.data || []);
    setKpis(k.data || {});
    setFaculty(f.data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  // Cuenta usuarios inactivos +1 mes
  const inactive30Count = useMemo(() => {
    const cutoff = Date.now() - 30 * MS_DAY;
    return users.filter(u => !u.last_activity_at || new Date(u.last_activity_at).getTime() < cutoff).length;
  }, [users]);

  const visible = useMemo(() => {
    let out = users;
    if (search) {
      const s = search.toLowerCase();
      out = out.filter(u =>
        u.anonymous_code.toLowerCase().includes(s) ||
        (u.faculty || '').toLowerCase().includes(s) ||
        (u.career || '').toLowerCase().includes(s)
      );
    }
    const now = Date.now();
    if (filter === 'active7')   out = out.filter(u => u.last_activity_at && new Date(u.last_activity_at).getTime() > now - 7 * MS_DAY);
    if (filter === 'active30')  out = out.filter(u => u.last_activity_at && new Date(u.last_activity_at).getTime() > now - 30 * MS_DAY);
    if (filter === 'inactive30') out = out.filter(u => !u.last_activity_at || new Date(u.last_activity_at).getTime() < now - 30 * MS_DAY);
    if (filter === 'flagged')   out = out.filter(u => u.chat_flagged_count > 0);

    out = [...out].sort((a, b) => {
      const A = a[sortBy.key]; const B = b[sortBy.key];
      if (A === B) return 0;
      if (A == null) return 1;
      if (B == null) return -1;
      const cmp = typeof A === 'number' ? A - B : String(A).localeCompare(String(B));
      return sortBy.dir === 'asc' ? cmp : -cmp;
    });
    return out;
  }, [users, search, filter, sortBy]);

  function setSort(key) {
    setSortBy(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' });
  }

  function exportCSV() {
    const cols = ['anonymous_code','faculty','career','registered_at','last_activity_at','sessions_count','checkins_count','journal_count','achievements_count','routes_completed','trees_adopted','events_rsvped','chat_messages_count','engagement_score'];
    const csv = cols.join(',') + '\n' + visible.map(r => cols.map(c => `"${String(r[c] ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `usuarios-anonimos-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  async function handleDelete(code) {
    if (!isFullAdmin) return alert('Solo el rol Administrador puede borrar usuarios.');
    const ok = confirm(
      `⚠ ELIMINAR ${code}\n\n` +
      'Esta acción borra DEFINITIVAMENTE:\n' +
      '· Su perfil anónimo\n' +
      '· Todas sus evaluaciones, respuestas y resultados\n' +
      '· Todos sus check-ins y entradas de diario\n' +
      '· Sus rutas de bienestar y logros\n' +
      '· Sus chats con Pum-AI y conversaciones de buddy\n' +
      '· Adopciones de árboles, RSVPs y progreso de aventuras\n\n' +
      'Esta acción quedará registrada en auditoría. ¿Confirmar?'
    );
    if (!ok) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-delete-anonymous', {
        body: { anonymous_code: code },
      });
      if (error || data?.error) throw new Error(data?.error || error.message);
      alert(`✓ Usuario ${code} eliminado.\n` + Object.entries(data.counts || {}).map(([k,v]) => `${v} ${k}`).join('\n'));
      setSelected(null);
      load();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="spinner" style={{margin:'80px auto'}} />;

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag azul">Comunidad anónima</span>
          <h1 className="mt-2">Usuarios anónimos</h1>
          <p className="lede">Quiénes están usando AURA. Sin nombres ni identificadores personales — solo códigos y métricas.</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={exportCSV}>⬇ Exportar CSV</button>
      </header>

      {/* ============ HERO STATS EN CARDS ============ */}
      <div className="hero-stats">
        <StatCard
          icon="👥"
          label="Total registrados"
          value={kpis?.total_registered ?? 0}
          accent="azul"
        />
        <StatCard
          icon="🌿"
          label="Activos esta semana"
          value={kpis?.active_7d ?? 0}
          sub={`${pct(kpis?.active_7d, kpis?.total_registered)}% del total`}
          accent="sage"
        />
        <StatCard
          icon="📅"
          label="Activos último mes"
          value={kpis?.active_30d ?? 0}
          sub={`${pct(kpis?.active_30d, kpis?.total_registered)}% del total`}
          accent="gold"
        />
        <StatCard
          icon="⏰"
          label="Inactivos +1 mes"
          value={inactive30Count}
          sub="Sin actividad reciente"
          accent="coral"
          actionLabel={inactive30Count > 0 ? "Filtrar →" : null}
          onAction={() => setFilter('inactive30')}
        />
        <StatCard
          icon="🔐"
          label="Con contraseña"
          value={kpis?.with_password ?? 0}
          sub="Pueden volver con su clave"
        />
        <StatCard
          icon="📝"
          label="Check-ins totales"
          value={kpis?.total_checkins ?? 0}
        />
        <StatCard
          icon="📔"
          label="Diario"
          value={kpis?.total_journal_entries ?? 0}
          sub="Entradas escritas"
        />
        <StatCard
          icon="🌳"
          label="Árboles adoptados"
          value={kpis?.total_tree_adoptions ?? 0}
          accent="sage"
        />
      </div>

      {/* ============ DISTRIBUCIÓN POR FACULTAD COMO CARDS ============ */}
      {faculty.length > 0 && (
        <section className="panel mt-3">
          <h2>Distribución por facultad</h2>
          <div className="faculty-grid">
            {faculty.slice(0, 8).map((f, i) => (
              <FacultyCard key={f.faculty} f={f} color={FACULTY_COLORS[i % FACULTY_COLORS.length]} total={kpis?.total_registered || 1} />
            ))}
          </div>
        </section>
      )}

      {/* ============ FILTROS Y BÚSQUEDA ============ */}
      <section className="panel mt-3">
        <div className="filter-row">
          <input className="search" placeholder="🔍 Buscar código, facultad, carrera…" value={search} onChange={e => setSearch(e.target.value)} />
          <div className="chips">
            {[
              { id:'all', label:`Todos (${users.length})` },
              { id:'active7', label:'Activos 7d' },
              { id:'active30', label:'Activos 30d' },
              { id:'inactive30', label:`💤 Inactivos +1mes (${inactive30Count})`, accent:'coral' },
              { id:'flagged', label:'⚠ Flaggeados' },
            ].map(c => (
              <button
                key={c.id}
                className={`chip ${filter === c.id ? 'active' : ''} ${c.accent || ''}`}
                onClick={() => setFilter(c.id)}
              >{c.label}</button>
            ))}
          </div>
          <small className="note">Mostrando <strong>{visible.length}</strong> de {users.length}</small>
        </div>

        <div className="table-wrap mt-3" style={{maxHeight: 600, overflowY: 'auto'}}>
          <table className="admin-table">
            <thead>
              <tr>
                <th><Sh k="anonymous_code" sortBy={sortBy} onSort={setSort}>Código</Sh></th>
                <th><Sh k="faculty" sortBy={sortBy} onSort={setSort}>Facultad</Sh></th>
                <th><Sh k="sessions_count" sortBy={sortBy} onSort={setSort}>Tests</Sh></th>
                <th><Sh k="checkins_count" sortBy={sortBy} onSort={setSort}>Check-ins</Sh></th>
                <th><Sh k="journal_count" sortBy={sortBy} onSort={setSort}>Diario</Sh></th>
                <th><Sh k="routes_completed" sortBy={sortBy} onSort={setSort}>Rutas ✓</Sh></th>
                <th><Sh k="chat_messages_count" sortBy={sortBy} onSort={setSort}>💬</Sh></th>
                <th><Sh k="engagement_score" sortBy={sortBy} onSort={setSort}>Score</Sh></th>
                <th><Sh k="last_activity_at" sortBy={sortBy} onSort={setSort}>Última actividad</Sh></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && <tr><td colSpan={10} className="note text-center">Sin usuarios con esos filtros.</td></tr>}
              {visible.map(u => {
                const isInactive = !u.last_activity_at || (Date.now() - new Date(u.last_activity_at).getTime() > 30 * MS_DAY);
                return (
                  <tr key={u.anonymous_code} className={isInactive ? 'row-inactive' : ''}>
                    <td>
                      <code style={{cursor:'pointer'}} onClick={() => setSelected(u)}>{u.anonymous_code}</code>
                      {isInactive && <span title="Inactivo +1mes" style={{marginLeft:6,fontSize:'0.8rem'}}>💤</span>}
                    </td>
                    <td><small>{u.faculty || '—'}</small></td>
                    <td>{u.sessions_count}</td>
                    <td>{u.checkins_count}</td>
                    <td>{u.journal_count}</td>
                    <td>{u.routes_completed}</td>
                    <td>
                      {u.chat_messages_count}
                      {u.chat_flagged_count > 0 && <span title="Flaggeado" style={{color:'#93362A',marginLeft:4}}>⚠</span>}
                    </td>
                    <td><strong style={{color: u.engagement_score > 50 ? 'var(--c-salvia-600)' : u.engagement_score > 10 ? 'var(--c-azul-800)' : 'var(--c-gris)'}}>{u.engagement_score}</strong></td>
                    <td>
                      <small>{u.last_activity_at ? new Date(u.last_activity_at).toLocaleString('es-MX', {month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—'}</small>
                    </td>
                    <td className="row-actions">
                      <button className="icon-btn" onClick={() => setSelected(u)} title="Ver detalle">👁</button>
                      {isFullAdmin && (
                        <button className="icon-btn danger" onClick={() => handleDelete(u.anonymous_code)} disabled={busy} title="Eliminar usuario">🗑</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <DetailModal
          user={selected}
          isFullAdmin={isFullAdmin}
          onClose={() => setSelected(null)}
          onDelete={() => handleDelete(selected.anonymous_code)}
          busy={busy}
        />
      )}

      <style>{`
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          margin-bottom: 14px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          position: relative;
          transition: transform .2s, box-shadow .2s;
        }
        .stat-card.has-action { cursor: pointer; }
        .stat-card.has-action:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }
        .stat-card .icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--c-azul-100);
          display: grid; place-items: center;
          font-size: 1.4rem;
          margin-bottom: 8px;
        }
        .stat-card.azul   .icon { background: var(--c-azul-100);   }
        .stat-card.sage   .icon { background: var(--c-salvia-100); }
        .stat-card.gold   .icon { background: var(--c-oro-100);    }
        .stat-card.coral  .icon { background: var(--c-coral-100);  }
        .stat-card .label {
          font-size: 0.84rem;
          color: var(--c-gris);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-card .value {
          font-family: var(--ff-serif);
          font-size: 2.2rem;
          color: var(--c-azul-800);
          font-weight: 800;
          line-height: 1;
        }
        .stat-card .sub { font-size: 0.82rem; color: var(--c-texto-soft); margin-top: 6px; }
        .stat-card .action {
          margin-top: 10px;
          background: transparent;
          border: 1px solid var(--c-coral-500);
          color: #93362A;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }
        .stat-card .action:hover { background: var(--c-coral-100); }

        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }
        .faculty-card {
          background: var(--c-marfil);
          border-radius: var(--r-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .faculty-card .fc-bar {
          height: 8px;
          border-radius: 4px;
          background: rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .faculty-card .fc-bar > span { display: block; height: 100%; border-radius: 4px; transition: width 0.6s; }
        .faculty-card .fc-stats { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--c-gris); }
        .faculty-card .fc-stats strong { color: var(--c-azul-800); }
        .faculty-card .fc-name { font-weight: 700; color: var(--c-azul-800); font-size: 0.9rem; }

        .filter-row {
          display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
        }
        .search {
          flex: 1; min-width: 240px;
          padding: 9px 14px;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.92rem;
        }
        .chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 6px 12px;
          font-size: 0.82rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .chip.coral.active { background: var(--c-coral-500); border-color: var(--c-coral-500); }

        .row-inactive { background: rgba(214, 59, 57, 0.04); }
        .row-actions { display: flex; gap: 4px; white-space: nowrap; }
        .icon-btn {
          background: transparent;
          border: 1px solid var(--c-borde);
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
        .icon-btn.danger:hover { background: var(--c-coral-100); }
        .icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </>
  );
}

function pct(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function StatCard({ icon, label, value, sub, accent, actionLabel, onAction }) {
  const cls = `stat-card ${accent || ''} ${onAction ? 'has-action' : ''}`;
  return (
    <div className={cls} onClick={onAction || (() => {})}>
      <div className="icon">{icon}</div>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {sub && <div className="sub">{sub}</div>}
      {actionLabel && <button className="action" onClick={(e) => { e.stopPropagation(); onAction?.(); }}>{actionLabel}</button>}
    </div>
  );
}

function FacultyCard({ f, color, total }) {
  const pct = total ? Math.round((f.total / total) * 100) : 0;
  return (
    <div className="faculty-card" style={{borderLeft: `3px solid ${color}`}}>
      <div className="fc-name">{f.faculty}</div>
      <div className="fc-bar">
        <span style={{width: `${pct}%`, background: color}} />
      </div>
      <div className="fc-stats">
        <span><strong>{f.total}</strong> registrados</span>
        <span>{f.active_7d} activos 7d</span>
      </div>
    </div>
  );
}

function Sh({ k, sortBy, onSort, children }) {
  const active = sortBy.key === k;
  const arrow = active ? (sortBy.dir === 'asc' ? '▲' : '▼') : '↕';
  return (
    <button type="button" onClick={() => onSort(k)}
      style={{background:'transparent',border:0,cursor:'pointer',font:'inherit',color:'inherit',padding:0,display:'inline-flex',gap:4,opacity: active ? 1 : 0.7}}>
      {children} <span style={{fontSize:'0.7em'}}>{arrow}</span>
    </button>
  );
}

// ===========================================================
// Detalle del usuario (modal)
// ===========================================================
function DetailModal({ user, onClose, onDelete, busy, isFullAdmin }) {
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    (async () => {
      const code = user.anonymous_code;
      const [sessions, checkins, journal, achievements, routes, chats, notes] = await Promise.all([
        supabase.from('assessment_sessions').select('id, total_score, general_level, dimension_scores, top_attention_areas, created_at').eq('anonymous_code', code).order('created_at', { ascending: false }),
        supabase.from('weekly_checkins').select('mood, energy, stress, social, free_text, week_iso, created_at').eq('anonymous_code', code).order('created_at', { ascending: false }),
        supabase.from('student_journal').select('entry, emotion_tag, created_at').eq('anonymous_code', code).order('created_at', { ascending: false }).limit(20),
        supabase.from('student_achievements').select('achievement_key, awarded_at').eq('anonymous_code', code),
        supabase.from('wellness_routes').select('id, duration_days, started_at, completed_at, plan').eq('anonymous_code', code),
        supabase.from('chat_sessions').select('id, message_count, flagged, flag_reason, created_at, last_at').eq('anonymous_code', code),
        supabase.from('session_notes').select('admin_name, note, created_at').in('session_id',
          (await supabase.from('assessment_sessions').select('id').eq('anonymous_code', code)).data?.map(s => s.id) || []
        ),
      ]);

      setData({
        loading: false,
        sessions: sessions.data || [],
        checkins: checkins.data || [],
        journal:  journal.data  || [],
        achievements: achievements.data || [],
        routes:   routes.data   || [],
        chats:    chats.data    || [],
        notes:    notes.data    || [],
      });
    })();
  }, [user.anonymous_code]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header>
          <div>
            <h2>👤 <code>{user.anonymous_code}</code></h2>
            <small>{user.faculty || 'Sin facultad'} · Registrado: {user.registered_at ? new Date(user.registered_at).toLocaleDateString('es-MX') : '—'}</small>
          </div>
          <button onClick={onClose}>✕</button>
        </header>

        {data.loading ? <div className="spinner" style={{margin:'40px auto'}} /> : (
          <>
            <div className="quick-kpis">
              <span><strong>{data.sessions.length}</strong> tests</span>
              <span><strong>{data.checkins.length}</strong> check-ins</span>
              <span><strong>{data.journal.length}</strong> diario</span>
              <span><strong>{data.achievements.length}</strong> logros</span>
              <span><strong>{data.routes.filter(r => r.completed_at).length}/{data.routes.length}</strong> rutas</span>
              <span><strong>{data.chats.length}</strong> chats</span>
            </div>

            <h3>📊 Tests realizados</h3>
            {data.sessions.length === 0 ? <p className="note">Sin tests.</p> : (
              <ul className="detail-list">
                {data.sessions.map(s => (
                  <li key={s.id}>
                    <strong>{s.total_score}/100</strong>{' '}
                    <span className={`lvl-bg-${s.general_level}`} style={{padding:'2px 8px',borderRadius:6,fontSize:'0.78rem'}}>{s.general_level}</span>
                    <small>{new Date(s.created_at).toLocaleString('es-MX')}</small>
                  </li>
                ))}
              </ul>
            )}

            <h3>📝 Check-ins</h3>
            {data.checkins.length === 0 ? <p className="note">Sin check-ins.</p> : (
              <ul className="detail-list">
                {data.checkins.slice(0, 8).map((c, i) => (
                  <li key={i}>
                    Ánimo {c.mood}/5 · Energía {c.energy}/5 · Estrés {c.stress}/5 · Social {c.social}/5
                    <small>{c.week_iso} · {new Date(c.created_at).toLocaleDateString('es-MX')}</small>
                    {c.free_text && <em style={{display:'block',marginTop:4}}>"{c.free_text}"</em>}
                  </li>
                ))}
              </ul>
            )}

            <h3>📔 Diario</h3>
            {data.journal.length === 0 ? <p className="note">Sin entradas.</p> : (
              <ul className="detail-list">
                {data.journal.slice(0, 8).map((j, i) => (
                  <li key={i}>
                    <em>"{j.entry}"</em>
                    <small>{j.emotion_tag || '—'} · {new Date(j.created_at).toLocaleDateString('es-MX')}</small>
                  </li>
                ))}
              </ul>
            )}

            {data.achievements.length > 0 && (<>
              <h3>🏆 Logros ({data.achievements.length})</h3>
              <div className="achievements-list">
                {data.achievements.map((a, i) => (<span key={i} className="achievement">🏆 {a.achievement_key}</span>))}
              </div>
            </>)}

            {data.chats.length > 0 && (<>
              <h3>💬 Chat con Pum-AI</h3>
              <ul className="detail-list">
                {data.chats.map(c => (
                  <li key={c.id}>
                    <strong>{c.message_count}</strong> mensajes
                    {c.flagged && <span style={{color:'#93362A',marginLeft:6}}>⚠ {c.flag_reason}</span>}
                    <small>{new Date(c.created_at).toLocaleString('es-MX')}</small>
                  </li>
                ))}
              </ul>
            </>)}

            {data.notes.length > 0 && (<>
              <h3>🗒 Notas del equipo</h3>
              <ul className="detail-list">
                {data.notes.map((n, i) => (
                  <li key={i}>
                    <strong>{n.admin_name || 'Anónimo'}</strong>
                    <small>{new Date(n.created_at).toLocaleString('es-MX')}</small>
                    <p style={{margin:'4px 0 0'}}>{n.note}</p>
                  </li>
                ))}
              </ul>
            </>)}

            {/* Acciones admin */}
            {isFullAdmin && (
              <div className="modal-actions">
                <button className="btn btn-coral" onClick={onDelete} disabled={busy}>
                  {busy ? 'Borrando…' : '🗑 Eliminar usuario y todos sus datos'}
                </button>
                <small className="note">Esta acción es irreversible. Quedará registrada en auditoría.</small>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .overlay { position: fixed; inset: 0; background: rgba(10,25,41,0.55); z-index: 100; display: grid; place-items: center; padding: 16px; }
        .modal { background: #fff; border-radius: var(--r-xl); padding: 24px; max-width: 760px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .modal header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .modal header h2 { margin: 0; font-size: 1.4rem; }
        .modal header small { color: var(--c-gris); font-size: 0.84rem; }
        .modal header button { background: transparent; border: 0; cursor: pointer; font-size: 1.4rem; color: var(--c-gris); }
        .modal h3 { color: var(--c-azul-800); margin: 18px 0 8px; font-size: 1.05rem; }

        .quick-kpis { display: flex; gap: 14px; flex-wrap: wrap; padding: 12px 16px; background: var(--c-azul-100); border-radius: 12px; margin-bottom: 6px; }
        .quick-kpis span { font-size: 0.92rem; }
        .quick-kpis strong { color: var(--c-azul-800); font-family: var(--ff-serif); font-size: 1.1rem; }

        .detail-list { list-style: none; padding: 0; display: grid; gap: 6px; }
        .detail-list li {
          background: var(--c-marfil); border: 1px solid var(--c-borde-soft);
          padding: 8px 12px; border-radius: 8px;
          font-size: 0.92rem;
        }
        .detail-list small { color: var(--c-gris); font-size: 0.78rem; display:block; margin-top: 2px; }

        .achievements-list { display: flex; gap: 6px; flex-wrap: wrap; }
        .achievement { background: var(--c-oro-100); color: #7B5E14; padding: 4px 10px; border-radius: 999px; font-size: 0.84rem; font-weight: 700; }

        .modal-actions {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--c-borde-soft);
          display: flex; flex-direction: column; gap: 6px;
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
}
