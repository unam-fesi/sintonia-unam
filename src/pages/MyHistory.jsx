import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import SafetyNotice from '../components/SafetyNotice.jsx';
import EmotionalAvatar from '../components/EmotionalAvatar.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { setStudent, clearStudent, getStudent } from '../hooks/useStudent.js';

// Extrae el mensaje de error real cuando una Edge Function devuelve non-2xx.
// supabase-js v2 envuelve esto en FunctionsHttpError sin exponer el body.
async function extractFnError(error) {
  try {
    if (error?.context && typeof error.context.json === 'function') {
      const body = await error.context.json();
      if (body?.detail) return `${body.error || 'Error'} — ${body.detail}`;
      if (body?.error)  return body.error;
    }
    if (error?.context && typeof error.context.text === 'function') {
      const txt = await error.context.text();
      if (txt) return txt.slice(0, 280);
    }
  } catch (_) { /* ignore */ }
  return error?.message || null;
}

export default function MyHistory() {
  const existing = getStudent();
  const [step, setStep] = useState(existing?.code ? 'loading' : 'login');
  const [code, setCode] = useState(existing?.code || '');
  const [password, setPassword] = useState(existing?.password || '');
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión, intenta cargar histórico directo
  useEffect(() => {
    if (!existing?.code) return;
    (async () => {
      try {
        const { data: hist, error } = await supabase.functions.invoke('anon-auth', {
          body: { action: 'history', anonymous_code: existing.code, password: existing.password || '' },
        });
        if (error) throw error;
        if (hist?.error) throw new Error(hist.error);
        setData(hist);
        setStep('history');
      } catch (e) {
        // Si falla (ej. password incorrecto guardado), regresa a login
        setStep('login');
        setErr(e.message);
      }
    })();
  // eslint-disable-next-line
  }, []);

  async function login() {
    setLoading(true); setErr(null);
    try {
      const { data: r, error } = await supabase.functions.invoke('anon-auth', {
        body: { action: 'login', anonymous_code: code, password },
      });
      if (error) {
        const detail = await extractFnError(error);
        throw new Error(detail || 'Edge Function falló');
      }
      if (r?.error) throw new Error(r.detail ? `${r.error} — ${r.detail}` : r.error);

      const { data: hist, error: hErr } = await supabase.functions.invoke('anon-auth', {
        body: { action: 'history', anonymous_code: code, password },
      });
      if (hErr) {
        const detail = await extractFnError(hErr);
        throw new Error(detail || 'Edge Function falló');
      }
      if (hist?.error) throw new Error(hist.detail ? `${hist.error} — ${hist.detail}` : hist.error);

      setData(hist);
      setStudent({ code, password: password || null });
      setStep('history');
    } catch (e) {
      console.error('[login] error completo:', e);
      setErr(e.message || 'Error de inicio de sesión');
    } finally {
      setLoading(false);
    }
  }

  async function register(faculty, password) {
    setLoading(true); setErr(null);
    const codeNew = generateAnonCode();
    try {
      const { data: r, error } = await supabase.functions.invoke('anon-auth', {
        body: { action: 'register', anonymous_code: codeNew, password, faculty },
      });
      if (error) {
        // El SDK no incluye el body del error — lo extraemos manualmente
        const detail = await extractFnError(error);
        throw new Error(detail || error.message || 'Edge Function falló');
      }
      if (r?.error) throw new Error(r.detail ? `${r.error} — ${r.detail}` : r.error);

      setCode(codeNew);
      setStudent({ code: codeNew, password: password || null });
      setData({ created: codeNew });
      setStep('registered');
    } catch (e) {
      console.error('[register] error completo:', e);
      setErr(e.message || 'No pudimos crear tu cuenta');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'loading') {
    return (
      <section className="section">
        <div className="container text-center" style={{maxWidth: 520}}>
          <div className="spinner" style={{margin:'40px auto'}} />
          <p className="lede">Cargando tu rincón…</p>
        </div>
      </section>
    );
  }
  async function goToPanel() {
    setStep('loading'); setErr(null);
    try {
      const { data: hist, error } = await supabase.functions.invoke('anon-auth', {
        body: { action: 'history', anonymous_code: code, password: password || '' },
      });
      if (error) throw error;
      if (hist?.error) throw new Error(hist.error);
      setData(hist);
      setStep('history');
    } catch (e) {
      setErr(e.message);
      setStep('login');
    }
  }

  if (step === 'history' && data) return <HistoryView data={data} code={code} onLogout={() => { clearStudent(); setStep('login'); setData(null); setCode(''); setPassword(''); }} />;
  if (step === 'registered') return <RegisteredOk code={code} onContinue={goToPanel} />;
  if (step === 'register') return <RegisterForm onRegister={register} onCancel={() => setStep('login')} loading={loading} err={err} />;

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 520}}>
        <div className="panel">
          <span className="tag">Mi historia</span>
          <h1 className="mt-2">Consulta tu evolución</h1>
          <p className="lede">
            Si ya hiciste un test antes y guardaste tu código anónimo (ej. <code>SIN-XJS-4278</code>),
            ingrésalo para ver tu histórico de evaluaciones, check-ins y diario.
          </p>

          {err && <div className="login-error">{err}</div>}

          <div className="field">
            <label>Tu código anónimo</label>
            <input
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="SIN-XXX-####"
              style={{fontFamily:'var(--ff-serif)', letterSpacing:'0.05em'}}
            />
          </div>
          <div className="field">
            <label>Contraseña (si la registraste)</label>
            <input type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="(deja vacío si no tienes)" />
          </div>
          <button className="btn btn-primary" disabled={loading || !code} onClick={login} style={{width:'100%'}}>
            {loading ? 'Verificando…' : 'Entrar'}
          </button>

          <div className="divider"></div>

          <p className="text-center">
            <strong>¿Primera vez?</strong> Crea tu código anónimo (sin pedirte datos personales)
            para empezar a guardar tus check-ins y diario.
          </p>
          <button className="btn btn-ghost" style={{width:'100%'}} onClick={() => setStep('register')}>
            Crear mi código anónimo
          </button>

          <p className="text-center mt-3">
            <Link to="/" className="note">← Volver al inicio</Link>
          </p>
        </div>
      </div>
      <style>{`
        .login-error {
          background: var(--c-coral-100); color: #93362A;
          padding: 10px 14px; border-radius: 12px; font-size: 0.92rem; margin-bottom: 12px;
        }
      `}</style>
    </section>
  );
}

function RegisterForm({ onRegister, onCancel, loading, err }) {
  const [faculty, setFaculty] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [usePassword, setUsePassword] = useState(true);
  const [err2, setErr2] = useState(null);

  function submit() {
    setErr2(null);
    if (usePassword) {
      if (password.length < 6) return setErr2('Mínimo 6 caracteres');
      if (password !== password2) return setErr2('Las contraseñas no coinciden');
    }
    onRegister(faculty.trim() || null, usePassword ? password : '');
  }

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 520}}>
        <div className="panel">
          <span className="tag sage">Cuenta anónima</span>
          <h1 className="mt-2">Crear mi código</h1>
          <p className="lede">
            Te generaremos un código tipo <code>SIN-XXX-####</code> que solo tú conoces.
            <strong> No solicitamos nombre, correo ni número de cuenta.</strong>
          </p>

          {(err || err2) && <div className="login-error">{err || err2}</div>}

          <div className="field">
            <label>Facultad o Escuela <small className="note">(opcional, sirve para reportes anónimos)</small></label>
            <select value={faculty} onChange={e => setFaculty(e.target.value)}>
              <option value="">— Prefiero no decir —</option>
              <option>FES Iztacala</option>
              <option>FES Cuautitlán</option>
              <option>FES Aragón</option>
              <option>FES Acatlán</option>
              <option>FES Zaragoza</option>
              <option>Facultad de Filosofía y Letras</option>
              <option>Facultad de Psicología</option>
              <option>Facultad de Medicina</option>
              <option>Facultad de Ingeniería</option>
              <option>Otra</option>
            </select>
          </div>

          <div className="field">
            <label>
              <input type="checkbox" checked={usePassword}
                onChange={e => setUsePassword(e.target.checked)} />
              {' '}Quiero proteger mi código con una contraseña
            </label>
          </div>

          {usePassword && (
            <>
              <div className="field">
                <label>Contraseña</label>
                <input type="password" value={password}
                  onChange={e => setPassword(e.target.value)} minLength={6} />
              </div>
              <div className="field">
                <label>Confirmar contraseña</label>
                <input type="password" value={password2}
                  onChange={e => setPassword2(e.target.value)} minLength={6} />
              </div>
            </>
          )}

          <button className="btn btn-primary" disabled={loading} onClick={submit} style={{width:'100%'}}>
            {loading ? 'Creando…' : 'Crear mi cuenta anónima'}
          </button>
          <button className="btn btn-ghost" onClick={onCancel} style={{width:'100%',marginTop:8}}>
            Volver
          </button>
        </div>
      </div>
    </section>
  );
}

function RegisteredOk({ code, onContinue }) {
  return (
    <section className="section">
      <div className="container" style={{maxWidth: 520}}>
        <div className="panel text-center">
          <span className="tag sage">¡Listo!</span>
          <h1 className="mt-2">Tu código anónimo</h1>
          <div style={{
            fontFamily: 'var(--ff-serif)',
            fontSize: '2.6rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--c-azul-800)',
            background: 'var(--c-oro-100)',
            padding: '20px',
            borderRadius: 16,
            margin: '20px 0',
          }}>
            {code}
          </div>
          <SafetyNotice variant="gold">
            <strong>¡Guárdalo en un lugar seguro!</strong> Sin él (y la contraseña que pusiste)
            no podrás recuperar tu histórico. No lo recuperamos por ti — es tu garantía de anonimato.
          </SafetyNotice>
          <button className="btn btn-primary mt-3" onClick={onContinue}>Ir a mi panel →</button>
        </div>
      </div>
    </section>
  );
}

function HistoryView({ data, code, onLogout }) {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal variant="slideUp">
          <header style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:12}}>
            <div>
              <span className="tag">Mi historia</span>
              <h1 className="mt-2">Tu evolución, código <code>{code}</code></h1>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onLogout}>Cerrar sesión</button>
          </header>
        </ScrollReveal>

        <ScrollReveal variant="zoomIn" delay={0.1}>
        <div className="avatar-row mt-3">
          <EmotionalAvatar code={code} />
          <div className="quick-actions">
            <Link to="/check-in" className="btn btn-primary">📝 Check-in semanal</Link>
            <Link to="/diario" className="btn btn-gold">📔 Diario</Link>
            <Link to="/companion" className="btn btn-coral">🤝 Hablar con Pum-AI</Link>
            <Link to="/ruta" className="btn btn-ghost">🛤 Mi ruta</Link>
            <Link to="/biblioteca" className="btn btn-ghost">📚 Biblioteca</Link>
            <Link to="/aventura" className="btn btn-ghost">🗺 Aventura</Link>
            <Link to="/buddy" className="btn btn-ghost">🫂 Buddy</Link>
            <Link to="/arboles" className="btn btn-ghost">🌳 Mis árboles</Link>
            <Link to="/calendario" className="btn btn-ghost">📅 Calendario</Link>
          </div>
        </div>
        </ScrollReveal>

        <div className="hist-grid mt-3">
          <ScrollReveal variant="slideRight">
          <section className="panel">
            <h2>Evaluaciones ({data.sessions.length})</h2>
            {data.sessions.length === 0 && <p className="note">Aún no has hecho ningún test. <Link to="/consentimiento">Empieza ahora</Link>.</p>}
            <ul className="hist-list">
              {data.sessions.map(s => (
                <li key={s.id}>
                  <strong>{s.total_score}/100</strong>{' '}
                  <span className={`lvl-bg-${s.general_level}`} style={{padding:'2px 8px',borderRadius:6,fontSize:'0.78rem'}}>{s.general_level}</span>
                  <small>{new Date(s.created_at).toLocaleDateString('es-MX')}</small>
                </li>
              ))}
            </ul>
          </section>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.12}>
          <section className="panel">
            <h2>Check-ins ({data.checkins.length})</h2>
            {data.checkins.length === 0 && <p className="note">Aún no has hecho check-in semanal.</p>}
            <ul className="hist-list">
              {data.checkins.slice(0, 8).map((c, i) => (
                <li key={i}>
                  Ánimo {c.mood}/5 · Energía {c.energy}/5 · Estrés {c.stress}/5
                  <small>{new Date(c.created_at).toLocaleDateString('es-MX')}</small>
                </li>
              ))}
            </ul>
          </section>
          </ScrollReveal>

          <ScrollReveal variant="slideLeft" delay={0.18}>
          <section className="panel">
            <h2>Diario ({data.journal.length})</h2>
            {data.journal.length === 0 && <p className="note">Aún no tienes entradas.</p>}
            <ul className="hist-list">
              {data.journal.slice(0, 6).map((j, i) => (
                <li key={i}>
                  "{j.entry}"
                  <small>{new Date(j.created_at).toLocaleDateString('es-MX')}</small>
                </li>
              ))}
            </ul>
          </section>
          </ScrollReveal>

          <ScrollReveal variant="zoomIn" delay={0.24}>
          <section className="panel">
            <h2>Logros y retos</h2>
            <ChallengesTracker achievements={data.achievements || []} />
            <h3 className="mt-3" style={{fontSize:'0.94rem'}}>🏆 Otros logros ({data.achievements.filter(a => !a.achievement_key.startsWith('challenge_')).length})</h3>
            {data.achievements.filter(a => !a.achievement_key.startsWith('challenge_')).length === 0 ? (
              <p className="note">Aún sin logros — ¡sigue cuidándote!</p>
            ) : (
              <ul className="hist-list">
                {data.achievements.filter(a => !a.achievement_key.startsWith('challenge_')).map((a, i) => (
                  <li key={i}>🏆 {humanAchievement(a.achievement_key)}</li>
                ))}
              </ul>
            )}
          </section>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .avatar-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 18px;
          align-items: center;
        }
        .quick-actions {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        @media (max-width: 720px) { .avatar-row { grid-template-columns: 1fr; } }
        .hist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .hist-list { list-style: none; padding: 0; display: grid; gap: 8px; }
        .hist-list li {
          padding: 10px 12px;
          background: var(--c-marfil);
          border-radius: 10px;
          font-size: 0.92rem;
        }
        .hist-list small { display: block; color: var(--c-gris); font-size: 0.78rem; margin-top: 2px; }
      `}</style>
    </section>
  );
}

function ChallengesTracker({ achievements }) {
  // achievements format: 'challenge_<dayHash>_<id>'
  const challenges = achievements
    .filter(a => a.achievement_key.startsWith('challenge_'))
    .map(a => ({
      key: a.achievement_key,
      day: parseInt(a.achievement_key.split('_')[1] || '0'),
      date: a.awarded_at ? new Date(a.awarded_at) : null,
    }))
    .sort((a, b) => b.day - a.day);

  const total = challenges.length;
  const today = (() => {
    const d = new Date();
    return d.getFullYear() * 1000 + d.getMonth() * 32 + d.getDate();
  })();

  // Streak: días consecutivos terminando en hoy o ayer
  let streak = 0;
  const days = [...new Set(challenges.map(c => c.day))].sort((a, b) => b - a);
  let cursor = today;
  for (const d of days) {
    if (d === cursor || d === cursor - 1) {
      streak++;
      cursor = d - 1;
    } else if (d < cursor - 1) {
      break;
    }
  }

  return (
    <div className="challenges-tracker">
      <div className="ct-row">
        <div className="ct-stat">
          <span className="ct-num">{total}</span>
          <small>retos completados</small>
        </div>
        <div className="ct-stat">
          <span className="ct-num">{streak}</span>
          <small>días seguidos</small>
        </div>
        {streak >= 3 && <div className="ct-fire">🔥</div>}
      </div>
      {streak >= 7 && <p className="note" style={{textAlign:'center',color:'#7B5E14'}}>✨ Una semana completa de retos. ¡Eso es disciplina con cariño!</p>}
      {streak === 0 && total > 0 && <p className="note" style={{textAlign:'center'}}>Hoy es buen día para retomar tu reto diario.</p>}
      <style>{`
        .challenges-tracker { background: linear-gradient(135deg, var(--c-oro-100), var(--c-marfil)); padding: 14px; border-radius: 12px; }
        .ct-row { display: flex; gap: 18px; align-items: center; justify-content: center; }
        .ct-stat { text-align: center; }
        .ct-num { display: block; font-family: var(--ff-serif); font-size: 1.8rem; font-weight: 800; color: var(--c-azul-800); }
        .ct-stat small { color: var(--c-gris); font-size: 0.78rem; }
        .ct-fire { font-size: 2rem; animation: bounce 1.6s ease-in-out infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </div>
  );
}

function humanAchievement(key) {
  const map = {
    first_checkin: 'Primer check-in semanal',
    first_day_route: 'Día 1 de tu ruta de bienestar',
    seven_day_route: '🎉 Ruta de 7 días completa',
    fourteen_day_route: '🎉🎉 Ruta de 14 días completa',
    tree_adopted: 'Adoptaste un árbol 🌳',
    wellness_walk: 'Caminata de bienestar',
    journal_streak_7: '7 días de diario seguidos',
    community_visit: 'Visitaste una actividad comunitaria',
  };
  return map[key] || key;
}

function generateAnonCode() {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const D = '23456789';
  const arr = new Uint32Array(7); crypto.getRandomValues(arr);
  return `SIN-${A[arr[0] % A.length]}${A[arr[1] % A.length]}${A[arr[2] % A.length]}-${D[arr[3] % D.length]}${D[arr[4] % D.length]}${D[arr[5] % D.length]}${D[arr[6] % D.length]}`;
}
