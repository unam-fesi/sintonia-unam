// =============================================================
// AURA — RoleGuard
// Bloquea rutas admin a usuarios sin el permiso requerido.
// =============================================================

import { Navigate } from 'react-router-dom';
import { can } from '../services/authService.js';

export default function RoleGuard({ ctx, permission, role, children }) {
  const r = ctx?.admin?.role;
  if (!r) return <Navigate to="/admin/login" replace />;

  // role exacto requerido
  if (role && r !== role) {
    return <Forbidden role={r} />;
  }
  // permiso requerido
  if (permission && !can(r, permission)) {
    return <Forbidden role={r} />;
  }
  return children;
}

function Forbidden({ role }) {
  return (
    <section className="section">
      <div className="container text-center" style={{maxWidth: 520}}>
        <div className="panel">
          <h1>🔒 Acceso restringido</h1>
          <p className="lede">
            Tu rol <strong>{role}</strong> no tiene permiso para ver esta sección.
          </p>
          <p className="note">
            Si crees que esto es un error, contacta a la coordinación del programa.
          </p>
          <a href={import.meta.env.BASE_URL + 'admin'} className="btn btn-primary">
            ← Volver al panel
          </a>
        </div>
      </div>
    </section>
  );
}
