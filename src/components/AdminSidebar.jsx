// =============================================================
// AURA — <AdminSidebar>
// Sidebar admin con grupos colapsables, iconos consistentes,
// filtrado por rol y persistencia del estado de cada grupo.
// =============================================================

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { signOut, can, ROLE_LABEL } from '../services/authService.js';

const STORAGE_KEY = 'aura.admin.sidebar.groups';

// Cada item: { to, icon, label, requires? }
// requires = permiso necesario; si no se especifica, todos lo ven.
const NAV_GROUPS = [
  {
    id: 'home',
    items: [
      { to: '',           end: true, icon: 'home',        label: 'Dashboard',         hideForRoles: ['docente'] },
    ],
  },
  {
    id: 'analytics',
    label: 'Análisis',
    icon: 'sparkles',
    items: [
      { to: 'estadisticas', icon: 'chart-bar',  label: 'Estadísticas',    requires: 'view_aggregated' },
      { to: 'avanzado',     icon: 'brain',      label: 'Análisis avanzado', requires: 'view_aggregated' },
      { to: 'insights',     icon: 'wand',       label: 'Pum-AI Insights', requires: 'view_insights' },
      { to: 'exportar',     icon: 'download',   label: 'Exportar',        requires: 'view_aggregated' },
    ],
  },
  {
    id: 'people',
    label: 'Personas',
    icon: 'user-heart',
    items: [
      { to: 'sesiones', icon: 'check-list', label: 'Sesiones',          requires: 'view_detail' },
      { to: 'anonimos', icon: 'friends',    label: 'Usuarios anónimos', requires: 'view_detail' },
      { to: 'buscar',   icon: 'search',     label: 'Buscar por código', requires: 'view_detail' },
    ],
  },
  {
    id: 'content',
    label: 'Contenido',
    icon: 'notebook',
    items: [
      { to: 'contenido', icon: 'edit',     label: 'Editor de contenido', requires: 'manage_content' },
      { to: 'programa',  icon: 'tree',     label: 'Programa',            requires: 'manage_content' },
      { to: 'docentes',  icon: 'books',    label: 'Kit docente',         requires: 'view_teachers_kit' },
    ],
  },
  {
    id: 'security',
    label: 'Seguridad',
    icon: 'shield',
    items: [
      { to: 'operacion',  icon: 'lock',           label: 'Operación',       requires: 'manage_security' },
      { to: 'seguridad',  icon: 'alert',          label: 'Eventos seguridad', requires: 'manage_security' },
      { to: 'costos-ai',  icon: 'coin',           label: 'Costos Pum-AI',   requires: 'manage_security' },
      { to: 'auditoria',  icon: 'history',        label: 'Auditoría',       requires: 'manage_users' },
    ],
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: 'settings',
    items: [
      { to: 'sistema',  icon: 'settings',    label: 'Configuración', requires: 'manage_config' },
      { to: 'usuarios', icon: 'user-cog',    label: 'Usuarios admin', requires: 'manage_users' },
    ],
  },
];

// Iconos que faltaban en el componente Icon — los agregamos inline aquí
const EXTRA_ICONS = {
  'chart-bar': <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
  'brain': <><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24 2.5 2.5 0 014.44-1.04z"/><path d="M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24 2.5 2.5 0 00-4.44-1.04z"/></>,
  'wand': <><path d="M15 4l5 5L9 20l-5-5z"/><line x1="14" y1="5" x2="19" y2="10"/><path d="M5 3v2M3 5h4M19 17v2M17 19h4"/></>,
  'download': <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  'edit': <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4z"/></>,
  'lock': <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  'alert': <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  'coin': <><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></>,
  'history': <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  'shield': <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  'user-cog': <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4"/><circle cx="18" cy="15" r="3"/><path d="M18 11v1M18 19v-1M14.6 13l.9.5M21.5 16.5l-.9-.5M14.6 17l.9-.5M21.5 13.5l-.9.5"/></>,
  'search': <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
};

// Persistencia del estado collapsed/expanded de cada grupo
function loadGroups() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}
function saveGroups(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

// Componente Icon extendido con los iconos extra del sidebar
function NavIcon({ name, size = 18 }) {
  if (EXTRA_ICONS[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
           style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
           aria-hidden="true">
        {EXTRA_ICONS[name]}
      </svg>
    );
  }
  return <Icon name={name} size={size} />;
}

export default function AdminSidebar({ ctx }) {
  const r = ctx.admin.role;
  const initials = (ctx.admin.full_name || ctx.admin.email)
    .split(/\s+/)
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Estado de grupos: por defecto el primero expandido, los demás colapsados
  const [openGroups, setOpenGroups] = useState(() => {
    const saved = loadGroups();
    if (saved) return saved;
    const init = {};
    NAV_GROUPS.forEach((g, i) => { init[g.id] = i === 0 || i === 1; }); // home + analytics
    return init;
  });

  useEffect(() => { saveGroups(openGroups); }, [openGroups]);

  function toggleGroup(id) {
    setOpenGroups(s => ({ ...s, [id]: !s[id] }));
  }

  // Filtrar items por rol + permisos
  function visibleItems(items) {
    return items.filter(it => {
      if (it.hideForRoles?.includes(r)) return false;
      if (it.requires && !can(r, it.requires)) return false;
      return true;
    });
  }

  return (
    <aside className="admin-side admin-side-v2">
      {/* Brand logo */}
      <NavLink to="" end className="admin-brand" aria-label="Inicio del panel">
        <img
          src={`${import.meta.env.BASE_URL}Aura.png`}
          alt="AURA"
          className="admin-brand-logo"
          loading="eager"
          decoding="async"
        />
      </NavLink>

      {/* Profile */}
      <NavLink to="perfil" className="profile-link" title="Editar mi perfil">
        <span className="avatar" aria-hidden="true">{initials}</span>
        <div className="profile-meta">
          <span className="role-chip">{ROLE_LABEL[r] || r}</span>
          <strong>{ctx.admin.full_name || ctx.admin.email}</strong>
          <small>{ctx.admin.email}</small>
        </div>
        <span className="edit-icon" aria-hidden="true"><NavIcon name="settings" size={14} /></span>
      </NavLink>

      {/* Grupos */}
      <nav className="admin-nav">
        {NAV_GROUPS.map(group => {
          const items = visibleItems(group.items);
          if (items.length === 0) return null;
          // Grupo sin label = sin colapsar, items directos
          if (!group.label) {
            return (
              <div key={group.id} className="nav-group nav-group-flat">
                {items.map(it => (
                  <NavLink key={it.to} to={it.to} end={it.end}>
                    <NavIcon name={it.icon} />
                    <span>{it.label}</span>
                  </NavLink>
                ))}
              </div>
            );
          }
          const open = !!openGroups[group.id];
          return (
            <div key={group.id} className={`nav-group ${open ? 'open' : ''}`}>
              <button type="button" className="nav-group-head" onClick={() => toggleGroup(group.id)}>
                <NavIcon name={group.icon} />
                <span className="nav-group-label">{group.label}</span>
                <span className="nav-group-chev" aria-hidden="true">
                  <Icon name="chevron-down" size={14} />
                </span>
              </button>
              <div className="nav-group-items" aria-hidden={!open}>
                {items.map(it => (
                  <NavLink key={it.to} to={it.to} end={it.end}>
                    <NavIcon name={it.icon} />
                    <span>{it.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}

        {/* Mi perfil siempre visible (footer del nav) */}
        <div className="nav-group nav-group-flat nav-group-footer">
          <NavLink to="perfil">
            <NavIcon name="user-heart" />
            <span>Mi perfil</span>
          </NavLink>
        </div>
      </nav>

      <ThemeToggle />

      <button className="logout" onClick={async () => {
        await signOut();
        window.location.href = import.meta.env.BASE_URL + 'admin/login';
      }}>
        <Icon name="logout" size={16} />
        <span>Cerrar sesión</span>
      </button>

      <style>{`
        .admin-side-v2 .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 0;                 /* CERO espacio entre grupos */
          margin-top: 10px;
          padding-bottom: 12px;
          overflow-y: auto;
        }

        /* ===== Grupos (tema CLARO Atardecer) ===== */
        .nav-group {
          display: flex;
          flex-direction: column;
          margin: 0;              /* sin margin externo, los headers quedan pegados */
        }
        .nav-group-flat { gap: 2px; }
        .nav-group-flat > a {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: 10px;
          color: var(--c-azul-800);
          font-size: 0.92rem; font-weight: 600;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .nav-group-flat > a:hover { background: rgba(157,123,217,0.10); transform: translateX(2px); }
        .nav-group-flat > a.active {
          background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
          color: var(--c-azul-800);
          box-shadow: 0 4px 12px rgba(201,162,39,0.25);
        }

        /* ===== Header del grupo colapsable ===== */
        .nav-group-head {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          margin: 0;                /* sin margin para que los headers queden pegados */
          background: transparent;
          border: 0;
          color: var(--c-texto-soft);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 8px;
          transition: color 0.15s ease, background 0.15s ease;
          text-align: left;
          width: 100%;
        }
        .nav-group-head:hover {
          color: var(--c-azul-800);
          background: rgba(157,123,217,0.10);
        }
        .nav-group.open .nav-group-head {
          color: var(--c-azul-800);
          background: rgba(157,123,217,0.08);
        }
        .nav-group-label { flex: 1; }
        .nav-group-chev {
          display: inline-flex;
          transition: transform 0.25s cubic-bezier(.2,.7,.2,1);
          opacity: 0.7;
        }
        .nav-group.open .nav-group-chev { transform: rotate(0deg); }
        .nav-group:not(.open) .nav-group-chev { transform: rotate(-90deg); }

        /* ===== Items del grupo (colapsable) ===== */
        /* Usamos max-height (con un tope generoso) en lugar de grid-template-rows.
           max-height permite contraer a 0 PIXELES sin dejar residuos. */
        .nav-group-items {
          max-height: 600px;
          overflow: hidden;
          padding: 4px 0 4px 12px;
          margin-left: 14px;
          border-left: 1.5px solid rgba(157,123,217,0.30);
          opacity: 1;
          transition: max-height 0.32s cubic-bezier(.2,.7,.2,1),
                      padding 0.32s cubic-bezier(.2,.7,.2,1),
                      opacity 0.22s ease,
                      border-color 0.22s ease;
        }
        .nav-group:not(.open) .nav-group-items {
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          opacity: 0;
          border-left-color: transparent;
          pointer-events: none;
        }
        .nav-group-items > a {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 12px;
          margin: 1px 0;
          border-radius: 8px;
          color: var(--c-texto-soft);
          font-size: 0.88rem;
          font-weight: 500;
          transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
        }
        .nav-group-items > a:hover {
          background: rgba(157,123,217,0.10);
          color: var(--c-azul-800);
          transform: translateX(3px);
        }
        .nav-group-items > a.active {
          background: var(--c-oro-100);
          color: var(--c-oro-700);
          border-left: 3px solid var(--c-oro-600);
          padding-left: 9px;
        }

        /* ===== Logout con icono ===== */
        .admin-side-v2 .logout {
          display: flex; align-items: center; gap: 8px;
          justify-content: center;
          width: 100%;
          padding: 10px 12px;
          margin-top: 10px;
          background: transparent;
          border: 1px solid var(--c-coral-500);
          border-radius: 10px;
          color: var(--c-coral-700);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .admin-side-v2 .logout:hover {
          background: var(--c-coral-600);
          border-color: var(--c-coral-500);
          color: #fff;
        }

        .nav-group-footer {
          margin-top: 6px; padding-top: 6px;
          border-top: 1px solid var(--c-borde-soft);
        }

        /* ===== Mobile ===== */
        @media (max-width: 880px) {
          .admin-side-v2 { padding: 16px; }
          .nav-group-head { font-size: 0.72rem; }
        }
      `}</style>
    </aside>
  );
}
