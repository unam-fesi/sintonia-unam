import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';
import SafetyNotice from '../components/SafetyNotice.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { STORAGE_KEYS } from '../utils/constants.js';

const CATEGORY_ICON = {
  respiracion:    '🌬',
  movimiento:     '🏃',
  social:         '🤝',
  arte:           '🎨',
  sueno:          '🌙',
  sustentabilidad:'🌿',
  reflexion:      '📓',
  comunidad:      '👥',
  flexible:       '✨',
};

export default function WellnessRoute() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({}); // {day_index: bool}
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/ruta' } });
      return;
    }
    loadRoute();
  // eslint-disable-next-line
  }, [student?.code]);

  async function loadRoute() {
    setLoading(true);
    const { data } = await supabase
      .from('wellness_routes')
      .select('*')
      .eq('anonymous_code', student.code)
      .order('started_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setRoute(data);
      // Cargar progreso
      const { data: prog } = await supabase
        .from('wellness_route_progress')
        .select('*')
        .eq('route_id', data.id);
      const p = {};
      for (const item of (prog || [])) p[`${item.day}-${item.activity_index}`] = item.done;
      setProgress(p);
    }
    setLoading(false);
  }

  async function generate(duration_days) {
    setGenerating(true); setErr(null);
    try {
      const last = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.RESULT) || 'null');
      const payload = {
        anonymous_code: student.code,
        session_id: last?.session_id || null,
        duration_days,
        general_level: last?.general_level || 'moderado',
        dimensions: last?.dimensions || {},
        top_attention_areas: last?.top_attention_areas || [],
        force_regenerate: !!route,
      };

      const { data, error } = await supabase.functions.invoke('generate-wellness-route', { body: payload });

      // Si la edge function regresó non-2xx, supabase-js mete el response body en error.context
      if (error) {
        let detail = error.message || 'Error desconocido';
        try {
          const ctx = error.context;
          if (ctx?.json) {
            const body = await ctx.json();
            detail = body.error || body.detail || detail;
          } else if (ctx?.text) {
            detail = await ctx.text();
          } else if (ctx?.body) {
            detail = JSON.stringify(ctx.body);
          }
        } catch { /* ignore */ }
        throw new Error(detail);
      }
      if (data?.error) throw new Error(`${data.error}${data.detail ? ': ' + data.detail : ''}`);

      setRoute(data.route);
      setProgress({});
    } catch (e) {
      setErr(e.message || 'No pudimos generar tu ruta.');
    } finally {
      setGenerating(false);
    }
  }

  async function toggleActivity(day, activity_index, current) {
    const key = `${day}-${activity_index}`;
    const newDone = !current;
    setProgress(p => ({ ...p, [key]: newDone }));
    await supabase.from('wellness_route_progress').upsert({
      route_id: route.id,
      day,
      activity_index,
      done: newDone,
      done_at: newDone ? new Date().toISOString() : null,
    }, { onConflict: 'route_id,day,activity_index' });

    // Logro: completó día 1
    if (newDone && day === 1) {
      await supabase.from('student_achievements').upsert({
        anonymous_code: student.code,
        achievement_key: 'first_day_route',
      });
    }

    // Logro: completó la ruta
    if (newDone) {
      const total = route.plan.days.reduce((sum, d) => sum + d.activities.length, 0);
      const done = Object.values({...progress, [key]: newDone}).filter(Boolean).length;
      if (done === total) {
        await supabase.from('student_achievements').upsert({
          anonymous_code: student.code,
          achievement_key: route.duration_days === 7 ? 'seven_day_route' : 'fourteen_day_route',
        });
        await supabase.from('wellness_routes')
          .update({ completed_at: new Date().toISOString() })
          .eq('id', route.id);
      }
    }
  }

  if (loading) return <div className="spinner" style={{margin:'80px auto'}} />;

  if (!route) {
    return (
      <section className="section">
        <div className="container" style={{maxWidth: 620}}>
          <div className="panel text-center">
            <span className="tag sage">Ruta de bienestar</span>
            <h1 className="mt-2">Tu plan de cuidado personalizado</h1>
            <p className="lede">
              Pum-AI puede generarte una ruta de actividades pequeñas y accesibles para los próximos
              <strong> 7 o 14 días</strong>, basada en tu evaluación más reciente.
            </p>

            {err && <div className="login-error mt-2">{err}</div>}

            <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginTop:20}}>
              <button className="btn btn-primary btn-lg" onClick={() => generate(7)} disabled={generating}>
                {generating ? 'Generando…' : '7 días — Empezar'}
              </button>
              <button className="btn btn-gold btn-lg" onClick={() => generate(14)} disabled={generating}>
                14 días — Más profundo
              </button>
            </div>

            <p className="note mt-3">
              Si aún no has hecho el test, te recomiendo <Link to="/consentimiento">empezar por ahí</Link>{' '}
              para que la ruta sea más personalizada.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const totalActivities = route.plan?.days?.reduce((s, d) => s + (d.activities?.length || 0), 0) || 1;
  const doneCount = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((doneCount / totalActivities) * 100);
  const isCompleted = !!route.completed_at;

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 880}}>
        <ScrollReveal variant="blurIn">
        <header className="panel" style={{background:'linear-gradient(135deg, var(--c-azul-100), var(--c-salvia-100))'}}>
          <span className="tag mint">Tu ruta</span>
          <h1 className="mt-2">{route.plan?.title || `Ruta de ${route.duration_days} días`}</h1>
          <p className="lede">{route.plan?.summary}</p>

          <div className="progress-bar mt-3">
            <span style={{width: `${pct}%`}} />
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
            <small className="note">{doneCount} de {totalActivities} actividades</small>
            <small className="note">{pct}%</small>
          </div>

          {isCompleted && (
            <div className="completed-badge">🎉 Ruta completada el {new Date(route.completed_at).toLocaleDateString('es-MX')}</div>
          )}

          <div style={{display:'flex',gap:8,marginTop:14,flexWrap:'wrap'}}>
            <button className="btn btn-ghost btn-sm" onClick={() => generate(route.duration_days)} disabled={generating}>
              {generating ? 'Regenerando…' : '🔄 Regenerar ruta'}
            </button>
            <Link to="/check-in" className="btn btn-primary btn-sm">📝 Hacer check-in</Link>
          </div>
        </header>
        </ScrollReveal>

        <div className="days-list mt-3">
          {(route.plan?.days || []).map((day, i) => (
            <ScrollReveal key={day.day} variant="slideUp" delay={Math.min(0.5, i * 0.06)}>
            <article className="day-card">
              <header>
                <span className="day-num">Día {day.day}</span>
                <h3>{day.focus}</h3>
              </header>
              <ul className="activities">
                {(day.activities || []).map((a, i) => {
                  const key = `${day.day}-${i}`;
                  const done = !!progress[key];
                  return (
                    <li key={i} className={`activity ${done ? 'done' : ''}`}>
                      <button className="check" onClick={() => toggleActivity(day.day, i, done)} aria-label={done ? 'Desmarcar' : 'Completar'}>
                        {done ? '✓' : ''}
                      </button>
                      <div className="act-body">
                        <strong>{CATEGORY_ICON[a.category] || '✨'} {a.title}</strong>
                        <p>{a.detail}</p>
                        <small>
                          {a.time && <span>🕐 {a.time}</span>}
                          {a.duration_min && <span>⏱ {a.duration_min} min</span>}
                        </small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
            </ScrollReveal>
          ))}
        </div>

        <SafetyNotice variant="gold">
          <strong>Recuerda:</strong> esta ruta es orientativa. Si no logras hacer alguna actividad,
          no es un fracaso — vuelve mañana. Si necesitas apoyo profesional,{' '}
          <Link to="/apoyo">aquí están las rutas de canalización</Link>.
        </SafetyNotice>
      </div>

      <style>{`
        .login-error { background: var(--c-coral-100); color: #93362A; padding: 10px 14px; border-radius: 12px; }
        .progress-bar {
          height: 12px;
          background: rgba(255,255,255,0.5);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-bar > span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--c-azul-800), var(--c-oro-600));
          border-radius: 999px;
          transition: width 0.4s;
        }
        .completed-badge {
          margin-top: 12px;
          padding: 10px 14px;
          background: var(--c-oro-600);
          color: var(--c-azul-800);
          border-radius: 12px;
          font-weight: 700;
          text-align: center;
        }

        .days-list { display: grid; gap: 14px; }
        .day-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px 22px;
        }
        .day-card header { display: flex; gap: 12px; align-items: baseline; margin-bottom: 8px; }
        .day-num {
          font-family: var(--ff-serif);
          font-weight: 800;
          color: var(--c-oro-600);
          font-size: 0.86rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .day-card h3 { color: var(--c-azul-800); margin: 0; }

        .activities { list-style: none; padding: 0; display: grid; gap: 8px; margin: 0; }
        .activity {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 12px;
          align-items: start;
          padding: 12px;
          background: var(--c-marfil);
          border-radius: 10px;
        }
        .activity.done { background: var(--c-salvia-100); }
        .activity.done .act-body strong, .activity.done .act-body p { text-decoration: line-through; opacity: 0.7; }
        .check {
          width: 26px; height: 26px;
          border-radius: 8px;
          border: 2px solid var(--c-borde);
          background: #fff;
          cursor: pointer;
          font-weight: 800;
          color: var(--c-salvia-600);
          display: grid; place-items: center;
        }
        .activity.done .check {
          background: var(--c-salvia-600);
          color: #fff;
          border-color: var(--c-salvia-600);
        }
        .act-body strong { color: var(--c-azul-800); display: block; }
        .act-body p { margin: 4px 0; font-size: 0.92rem; color: var(--c-texto-soft); }
        .act-body small { color: var(--c-gris); font-size: 0.78rem; display: flex; gap: 10px; }
      `}</style>
    </section>
  );
}
