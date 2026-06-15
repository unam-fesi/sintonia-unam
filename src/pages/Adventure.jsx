// =============================================================
// AURA — Treasure Hunt
// Eventos con pistas que se desbloquean por progreso (check-ins, ruta, etc.)
// =============================================================

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

export default function Adventure() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [progress, setProgress] = useState({});
  const [stats, setStats] = useState({ checkins: 0, routes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/aventura' } });
      return;
    }
    load();
  // eslint-disable-next-line
  }, [student?.code]);

  async function load() {
    setLoading(true);

    // Eventos activos
    const { data: ev } = await supabase.from('game_events')
      .select('*, clues:game_clues(*)')
      .eq('active', true)
      .lte('starts_at', new Date().toISOString())
      .gte('ends_at', new Date().toISOString())
      .order('starts_at');
    setEvents(ev || []);

    // Mi progreso
    const { data: prog } = await supabase.from('game_progress')
      .select('*').eq('anonymous_code', student.code);
    const map = {};
    for (const p of prog || []) map[p.event_id] = p;
    setProgress(map);

    // Stats para evaluar unlocks
    const [{ count: checkinCount }, { count: routeCount }] = await Promise.all([
      supabase.from('weekly_checkins').select('*', { count:'exact', head:true }).eq('anonymous_code', student.code),
      supabase.from('wellness_routes').select('*', { count:'exact', head:true }).eq('anonymous_code', student.code).not('completed_at','is',null),
    ]);
    setStats({ checkins: checkinCount ?? 0, routes: routeCount ?? 0 });

    setLoading(false);
  }

  function isUnlocked(clue) {
    if (!clue.unlock_after) return true;
    const [type, val] = clue.unlock_after.split(':');
    const num = parseInt(val) || 0;
    if (type === 'checkin_count') return stats.checkins >= num;
    if (type === 'wellness_route_done') return stats.routes >= 1;
    if (type === 'always') return true;
    return false;
  }

  async function tryFound(eventId) {
    if (!confirm('¿Lo encontraste? Solo confírmalo si realmente fuiste al lugar.')) return;
    await supabase.from('game_progress').upsert({
      anonymous_code: student.code,
      event_id: eventId,
      found_at: new Date().toISOString(),
    }, { onConflict: 'anonymous_code,event_id' });
    await supabase.from('student_achievements').upsert({
      anonymous_code: student.code,
      achievement_key: `adventure_${eventId}`,
    });
    load();
  }

  if (!student?.code) return null;
  if (loading) return <div className="spinner" style={{margin:'80px auto'}} />;

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 920}}>
        <header className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
          <span className="tag coral">Aventura</span>
          <h1 className="mt-2">🗺 Búsqueda del Tesoro AURA</h1>
          <p className="lede">
            Pum-AI ha escondido objetos especiales en el campus. Cada check-in y actividad de
            cuidado te desbloquea una pista. Caminar, observar y descubrir es ya un acto de
            bienestar.
          </p>
        </header>

        {events.length === 0 ? (
          <div className="panel text-center mt-3">
            <h2>No hay aventuras activas en este momento</h2>
            <p className="lede">Pronto tu equipo de AURA publicará una nueva ruta misteriosa.</p>
            <p className="note">Mientras tanto, sigue acumulando check-ins. Cada uno se contará para futuras aventuras.</p>
          </div>
        ) : events.map(ev => {
          const myProg = progress[ev.id];
          const found = !!myProg?.found_at;
          const sortedClues = [...(ev.clues || [])].sort((a,b) => a.clue_order - b.clue_order);

          return (
            <article key={ev.id} className="adv-card">
              <header>
                <h2>{ev.title}</h2>
                <small>Termina: {new Date(ev.ends_at).toLocaleDateString('es-MX')}</small>
              </header>
              <p className="lede">{ev.description}</p>
              {ev.reward_label && (
                <div className="reward">🎁 <strong>Recompensa:</strong> {ev.reward_label}</div>
              )}

              {found ? (
                <div className="found-badge">🎉 ¡Lo encontraste el {new Date(myProg.found_at).toLocaleDateString('es-MX')}!</div>
              ) : (
                <>
                  <div className="clues">
                    {sortedClues.map((c, i) => {
                      const open = isUnlocked(c);
                      return (
                        <div key={c.id} className={`clue ${open ? 'open' : 'locked'}`}>
                          <div className="clue-num">{c.clue_order}</div>
                          <div>
                            {open ? (
                              <>
                                <p className="riddle">{c.riddle}</p>
                                {c.hint && <small>💡 {c.hint}</small>}
                              </>
                            ) : (
                              <small>🔒 Desbloquea con: {humanUnlock(c.unlock_after)}</small>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {sortedClues.every(isUnlocked) && (
                    <button className="btn btn-coral btn-lg mt-3" onClick={() => tryFound(ev.id)}>
                      ✨ Lo encontré
                    </button>
                  )}
                </>
              )}
            </article>
          );
        })}

        <div className="hint-stats mt-3">
          <span>📝 Check-ins: <strong>{stats.checkins}</strong></span>
          <span>🛤 Rutas completadas: <strong>{stats.routes}</strong></span>
          <Link to="/check-in" className="btn btn-ghost btn-sm">Hacer check-in</Link>
        </div>
      </div>

      <style>{`
        .adv-card {
          background: linear-gradient(135deg, var(--c-coral-100), var(--c-oro-100));
          border: 1px solid var(--c-oro-600);
          border-radius: var(--r-xl);
          padding: 24px 28px;
          margin-top: 16px;
        }
        .adv-card header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
        .adv-card h2 { margin: 0; }
        .adv-card small { color: var(--c-gris); }
        .reward {
          background: var(--c-oro-600);
          color: var(--c-azul-800);
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 0.94rem;
          margin: 12px 0;
        }
        .found-badge {
          background: var(--c-salvia-100);
          color: #2F8770;
          padding: 14px 18px;
          border-radius: 12px;
          font-weight: 700;
          text-align: center;
          margin: 12px 0;
        }
        .clues { display: grid; gap: 10px; margin-top: 14px; }
        .clue {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.7);
          border-radius: 10px;
          align-items: start;
        }
        .clue.locked { opacity: 0.55; }
        .clue-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--c-azul-800);
          color: var(--c-oro-400);
          display: grid; place-items: center;
          font-weight: 800;
        }
        .clue.locked .clue-num { background: var(--c-gris); }
        .riddle { font-family: var(--ff-serif); font-style: italic; color: var(--c-azul-800); margin: 0; }
        .clue small { color: var(--c-texto-soft); font-size: 0.86rem; display:block; margin-top: 4px; }

        .hint-stats {
          display: flex; gap: 14px; align-items: center; flex-wrap: wrap;
          background: var(--c-marfil);
          border-radius: 12px;
          padding: 12px 16px;
        }
        .hint-stats span { font-size: 0.92rem; }
      `}</style>
    </section>
  );
}

function humanUnlock(s) {
  if (!s) return '—';
  const [type, val] = s.split(':');
  if (type === 'checkin_count') return `${val} check-in${val === '1' ? '' : 's'} semanal${val === '1' ? '' : 'es'}`;
  if (type === 'wellness_route_done') return 'completar una ruta de bienestar';
  if (type === 'always') return 'disponible';
  return s;
}
