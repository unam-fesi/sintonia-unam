import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useStudent } from '../hooks/useStudent.js';
import './Header.css';

export default function Header() {
  const { student, clearStudent } = useStudent();
  const loggedIn = !!student?.code;
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null); // 'discover' | 'mine' | 'user' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Cierra menús al cambiar de ruta o click fuera
  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    function handler(e) {
      if (!navRef.current?.contains(e.target)) setOpenMenu(null);
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Bloquear scroll del body + flag de drawer abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    document.body.classList.toggle('drawer-open', mobileOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('drawer-open');
    };
  }, [mobileOpen]);

  function toggle(name) {
    setOpenMenu(m => (m === name ? null : name));
  }
  function closeMobile() { setMobileOpen(false); }
  function handleLogout() {
    setMobileOpen(false);
    if (confirm('¿Cerrar sesión?\n\nTu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.')) {
      clearStudent();
      window.location.assign(import.meta.env.BASE_URL);
    }
  }

  const initials = loggedIn
    ? student.code.split('-').map(p => p[0]).join('').slice(0, 3)
    : '';

  return (
    <header className="site-header">
      <div className="container topbar">
        <Link to="/" className="brand" aria-label="AURA, ir al inicio">
          <img
            src={`${import.meta.env.BASE_URL}Aura-icon192.png`}
            srcSet={`${import.meta.env.BASE_URL}Aura-icon192.png 1x, ${import.meta.env.BASE_URL}Aura-icon512.png 2x`}
            alt="AURA"
            className="brand-logo"
            width="56" height="56"
          />
          <div className="brand-copy">
            <strong>AURA</strong>
            <span>Bienestar emocional universitario</span>
          </div>
        </Link>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >☰</button>

        <nav className="nav" aria-label="Navegación principal" ref={navRef}>
          <NavLink to="/" end className="nav-link">Inicio</NavLink>

          {/* Conocer (público) */}
          <div className="dropdown">
            <button
              type="button"
              className={`nav-link drop-trigger ${openMenu === 'discover' ? 'active' : ''}`}
              onClick={() => toggle('discover')}
              aria-haspopup="true"
              aria-expanded={openMenu === 'discover'}
            >
              Conocer ▾
            </button>
            {openMenu === 'discover' && (
              <div className="drop-panel">
                <NavLink to="/recursos">📌 Recursos</NavLink>
                <NavLink to="/calendario">📅 Calendario</NavLink>
                <NavLink to="/mapa">🗺 Mapa</NavLink>
                <NavLink to="/emociones">📖 Emociones</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/apoyo" className="nav-link">🆘 Apoyo</NavLink>

          {/* Mi rincón (logged-in) */}
          {loggedIn && (
            <div className="dropdown">
              <button
                type="button"
                className={`nav-link drop-trigger ${openMenu === 'mine' ? 'active' : ''}`}
                onClick={() => toggle('mine')}
                aria-haspopup="true"
                aria-expanded={openMenu === 'mine'}
              >
                Mi rincón ▾
              </button>
              {openMenu === 'mine' && (
                <div className="drop-panel">
                  <NavLink to="/mi-historia">📊 Mi historia</NavLink>
                  <NavLink to="/check-in">📝 Check-in</NavLink>
                  <NavLink to="/diario">📔 Diario</NavLink>
                  <NavLink to="/ruta">🛤 Mi ruta</NavLink>
                  <NavLink to="/companion">🤝 Pum-AI</NavLink>
                  <NavLink to="/biblioteca">📚 Biblioteca</NavLink>
                  <NavLink to="/aventura">🗺 Aventura</NavLink>
                  <NavLink to="/buddy">🫂 Buddy</NavLink>
                  <NavLink to="/arboles">🌳 Mis árboles</NavLink>
                </div>
              )}
            </div>
          )}

          {!loggedIn && <NavLink to="/mi-historia" className="nav-link">Mi historia</NavLink>}

          <NavLink to="/privacidad" className="nav-link nav-tiny">Privacidad</NavLink>

          {loggedIn ? (
            <div className="dropdown">
              <button
                type="button"
                className={`user-chip ${openMenu === 'user' ? 'active' : ''}`}
                onClick={() => toggle('user')}
                aria-haspopup="true"
                aria-expanded={openMenu === 'user'}
                title="Abrir menú"
              >
                <span className="initials">{initials}</span>
                <small>{student.code}</small>
                <span className="chev" aria-hidden="true">▾</span>
              </button>
              {openMenu === 'user' && (
                <div className="drop-panel user-drop">
                  <NavLink to="/mi-historia" end>📊 Mi panel</NavLink>
                  <NavLink to="/check-in">📝 Check-in semanal</NavLink>
                  <NavLink to="/diario">📔 Diario emocional</NavLink>
                  <NavLink to="/ruta">🛤 Mi ruta</NavLink>
                  <NavLink to="/companion">🤝 Pum-AI</NavLink>
                  <NavLink to="/biblioteca">📚 Biblioteca</NavLink>
                  <NavLink to="/aventura">🗺 Aventura</NavLink>
                  <NavLink to="/buddy">🫂 Buddy</NavLink>
                  <NavLink to="/arboles">🌳 Mis árboles</NavLink>
                  <hr style={{margin:'6px 0', border:0, borderTop:'1px solid var(--c-borde-soft)'}} />
                  <button
                    type="button"
                    className="logout-link"
                    onClick={() => {
                      setOpenMenu(null);
                      if (confirm('¿Cerrar sesión?\n\nTu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.')) {
                        clearStudent();
                        window.location.assign(import.meta.env.BASE_URL);
                      }
                    }}
                  >
                    ↩ Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/consentimiento" className="btn btn-primary btn-sm nav-cta">
              Iniciar orientación
            </Link>
          )}
        </nav>
      </div>

      {/* ===== Drawer mobile (portal a body para escapar del sticky header) ===== */}
      {mobileOpen && createPortal(
        <>
          <div className="mobile-overlay" onClick={closeMobile} />
          <aside className="mobile-drawer" role="dialog" aria-label="Menú principal">
            <header>
              <strong>Menú</strong>
              <button className="close-x" onClick={closeMobile} aria-label="Cerrar">✕</button>
            </header>

            {loggedIn && (
              <div className="m-user">
                <span className="m-initials">{initials}</span>
                <div>
                  <strong>Tu código</strong>
                  <code>{student.code}</code>
                </div>
              </div>
            )}

            <nav className="m-nav">
              <NavLink to="/" end onClick={closeMobile}>🏠 Inicio</NavLink>

              <h4>Conocer</h4>
              <NavLink to="/recursos" onClick={closeMobile}>📌 Recursos</NavLink>
              <NavLink to="/calendario" onClick={closeMobile}>📅 Calendario</NavLink>
              <NavLink to="/mapa" onClick={closeMobile}>🗺 Mapa</NavLink>
              <NavLink to="/emociones" onClick={closeMobile}>📖 Emociones</NavLink>

              <h4>Apoyo</h4>
              <NavLink to="/apoyo" onClick={closeMobile}>🆘 Apoyo y canalización</NavLink>

              {loggedIn && (
                <>
                  <h4>Mi rincón</h4>
                  <NavLink to="/mi-historia" onClick={closeMobile}>📊 Mi panel</NavLink>
                  <NavLink to="/check-in" onClick={closeMobile}>📝 Check-in semanal</NavLink>
                  <NavLink to="/diario" onClick={closeMobile}>📔 Diario</NavLink>
                  <NavLink to="/ruta" onClick={closeMobile}>🛤 Mi ruta</NavLink>
                  <NavLink to="/companion" onClick={closeMobile}>🤝 Pum-AI</NavLink>
                  <NavLink to="/biblioteca" onClick={closeMobile}>📚 Biblioteca</NavLink>
                  <NavLink to="/aventura" onClick={closeMobile}>🗺 Aventura</NavLink>
                  <NavLink to="/buddy" onClick={closeMobile}>🫂 Buddy</NavLink>
                  <NavLink to="/arboles" onClick={closeMobile}>🌳 Mis árboles</NavLink>
                </>
              )}

              <h4>Información</h4>
              <NavLink to="/privacidad" onClick={closeMobile}>🔒 Privacidad</NavLink>

              <div className="m-cta">
                {loggedIn ? (
                  <button type="button" className="btn btn-coral" onClick={handleLogout}>↩ Cerrar sesión</button>
                ) : (
                  <Link to="/consentimiento" onClick={closeMobile} className="btn btn-primary btn-lg">
                    Iniciar orientación
                  </Link>
                )}
              </div>
            </nav>
          </aside>
        </>,
        document.body
      )}
    </header>
  );
}
