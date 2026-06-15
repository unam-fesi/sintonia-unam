import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn, getAdminContext } from '../services/authService.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión válida, brincamos directo al panel
  useEffect(() => {
    (async () => {
      const ctx = await getAdminContext().catch(() => null);
      if (ctx) navigate('/admin', { replace: true });
    })();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      const ctx = await getAdminContext();
      if (!ctx) {
        setError('Esta cuenta no tiene permisos administrativos.');
        return;
      }
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-shell">
      {/* Marea de acuarela del fondo (mismo vibe que el público) */}
      <div className="login-bg" aria-hidden="true">
        <div className="lb-blob lb-lavender" />
        <div className="lb-blob lb-peach" />
        <div className="lb-blob lb-rosa" />
        <div className="lb-blob lb-durazno" />
      </div>

      <div className="login-stack">
        <img
          src={`${import.meta.env.BASE_URL}Aura.png`}
          alt="AURA"
          className="login-logo"
          loading="eager"
          decoding="async"
        />

        <div className="login-card">
          <h1>Acceso interno</h1>
          <p className="lede text-center">Panel administrativo · AURA</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="field">
              <label htmlFor="email">Correo institucional</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@unam.mx"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{width: '100%'}}
              disabled={loading}
            >
              {loading ? 'Verificando…' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="note text-center mt-3">
            Solo personal autorizado. Si tu cuenta no aparece, contacta a la coordinación del programa.
          </p>
          <p className="text-center mt-2">
            <Link to="/" className="note">← Volver al sitio público</Link>
          </p>
        </div>
      </div>

      <style>{`
        .login-shell {
          position: relative;
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 20px;
          overflow: hidden;
          background: linear-gradient(180deg, #FFFAF5 0%, #FFF0E8 100%);
        }
        /* Marea ATardecer abrazo en el fondo */
        .login-bg {
          position: absolute;
          inset: -10vh -10vw;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .lb-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          mix-blend-mode: multiply;
        }
        .lb-lavender {
          width: 70vmax; height: 70vmax;
          top: -20vmax; left: -15vmax;
          background: radial-gradient(circle, var(--c-lavanda-500) 0%, transparent 58%);
          opacity: 0.7;
        }
        .lb-peach {
          width: 65vmax; height: 65vmax;
          bottom: -20vmax; right: -15vmax;
          background: radial-gradient(circle, var(--c-peach-500) 0%, transparent 60%);
          opacity: 0.65;
        }
        .lb-rosa {
          width: 50vmax; height: 50vmax;
          top: 40%; right: -10vmax;
          background: radial-gradient(circle, var(--c-rosa-500) 0%, transparent 60%);
          opacity: 0.5;
        }
        .lb-durazno {
          width: 55vmax; height: 55vmax;
          bottom: 10%; left: -10vmax;
          background: radial-gradient(circle, var(--c-durazno-500) 0%, transparent 60%);
          opacity: 0.55;
        }

        .login-stack {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 460px;
        }

        .login-logo {
          width: 100%;
          max-width: 320px;
          height: auto;
          display: block;
          filter: drop-shadow(0 18px 38px rgba(108,80,124,0.22))
                  drop-shadow(0 6px 14px rgba(108,80,124,0.12));
          animation: loginLogoFloat 6s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes loginLogoFloat {
          0%, 100% { transform: translateY(0)   rotate(-0.5deg); }
          50%      { transform: translateY(-6px) rotate(0.5deg); }
        }

        .login-card {
          width: 100%;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(14px) saturate(1.2);
          -webkit-backdrop-filter: blur(14px) saturate(1.2);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: var(--r-xl);
          padding: 36px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 24px 60px rgba(108,80,124,0.18),
            0 8px 22px rgba(108,80,124,0.10);
        }
        .login-card h1 {
          text-align: center;
          font-size: 1.6rem;
          margin: 0 0 4px;
        }
        .login-error {
          background: var(--c-coral-100);
          color: var(--c-coral-700);
          border: 1px solid rgba(232,130,107,0.4);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 0.92rem;
          margin: 12px 0;
        }

        @media (max-width: 540px) {
          .login-logo { max-width: 220px; }
          .login-card { padding: 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .login-logo { animation: none; }
        }
      `}</style>
    </section>
  );
}
