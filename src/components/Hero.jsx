import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import SplitText from './SplitText.jsx';
import ShimmerText from './ShimmerText.jsx';
import MagneticButton from './MagneticButton.jsx';
import Counter from './Counter.jsx';

export default function Hero() {
  // Parallax fuerte del logo (se mueve hacia arriba al scrollear)
  const logoRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let raf = null;
    function update() {
      if (!logoRef.current) return;
      const y = window.scrollY;
      const rotate = Math.min(8, y * 0.02);
      const translate = y * -0.25;
      const scale = Math.max(0.85, 1 - y * 0.0005);
      logoRef.current.style.transform =
        `translate3d(0, ${translate}px, 0) rotate(${rotate}deg) scale(${scale})`;
      raf = null;
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-card card fade-in">
            <span className="tag">Programa universitario · FES Iztacala</span>
            <h1 className="mt-2 hero-h1">
              <SplitText as="span" splitBy="word" stagger={0.05} variant="slideUp">
                Sintonízate contigo, con tu
              </SplitText>
              {' '}
              <ShimmerText as="span" variant="aurora" speed={5}>comunidad</ShimmerText>
              {' '}
              <SplitText as="span" splitBy="word" stagger={0.05} delay={0.3} variant="slideUp">
                y con tu bienestar.
              </SplitText>
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
              <MagneticButton as={Link} to="/consentimiento" className="btn btn-primary btn-lg" strength={0.35}>
                Iniciar orientación
              </MagneticButton>
              <MagneticButton as={Link} to="/privacidad" className="btn btn-ghost" strength={0.25}>
                Aviso de privacidad
              </MagneticButton>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <Counter as="strong" to={20} duration={1100} />
                <span>preguntas</span>
              </div>
              <div className="hero-stat">
                <strong>7-10</strong>
                <span>minutos</span>
              </div>
              <div className="hero-stat">
                <Counter as="strong" to={0} from={5} duration={900} />
                <span>datos personales</span>
              </div>
            </div>
          </div>

          <aside className="hero-visual fade-in" aria-hidden="true">
            <div className="hero-logo-wrap">
              <img
                ref={logoRef}
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
