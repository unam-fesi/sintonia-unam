import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-card">
          <div>
            <h4>AURA</h4>
            <p>
              Plataforma universitaria de orientación para el bienestar emocional.
              No constituye diagnóstico ni sustituye atención profesional.
            </p>
          </div>
          <div className="footer-links">
            <Link to="/privacidad">Aviso de privacidad</Link>
            <Link to="/recursos">Recursos de apoyo</Link>
            <Link to="/admin">Acceso interno</Link>
          </div>
        </div>
        <p className="footer-credits">© Universidad Nacional Autónoma de México, {year}.</p>
      </div>
    </footer>
  );
}
