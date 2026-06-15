import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-card card fade-in">
            <span className="tag">Programa universitario · FES Iztacala</span>
            <h1 className="mt-2">
              Sintonízate contigo, con tu <span style={{color: 'var(--c-oro-700)'}}>comunidad</span>
              {' '}y con tu bienestar.
            </h1>
            <p className="lede">
              Una autoevaluación breve, anónima y con recomendaciones personalizadas
              para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo
              en FES Iztacala y la UNAM.
            </p>
            <ul className="hero-checks">
              <li><strong>20 preguntas</strong> en 7 a 10 minutos</li>
              <li>Resultado <strong>informativo, anónimo y confidencial</strong></li>
              <li>Recomendaciones y vinculación con <strong>recursos universitarios</strong></li>
            </ul>
            <div className="hero-actions">
              <Link to="/consentimiento" className="btn btn-primary btn-lg">Iniciar orientación</Link>
              <Link to="/privacidad" className="btn btn-ghost">Aviso de privacidad</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>20</strong><span>preguntas</span></div>
              <div className="hero-stat"><strong>7-10</strong><span>minutos</span></div>
              <div className="hero-stat"><strong>0</strong><span>datos personales</span></div>
            </div>
          </div>

          <aside className="hero-visual fade-in" aria-hidden="true">
            <div className="hero-logo-wrap">
              <img
                className="hero-logo"
                src={`${import.meta.env.BASE_URL}Aura.png`}
                alt="AURA"
                loading="eager"
                decoding="async"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
