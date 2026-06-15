import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import InfoCard from '../components/InfoCard.jsx';
import SafetyNotice from '../components/SafetyNotice.jsx';
import { DailyQuote, DailyChallenge } from '../components/DailyContent.jsx';
import ScrollReveal, { RevealStagger } from '../components/ScrollReveal.jsx';
import TiltCard from '../components/TiltCard.jsx';
import SplitText from '../components/SplitText.jsx';
import ShimmerText from '../components/ShimmerText.jsx';
import Marquee from '../components/Marquee.jsx';
import MagneticButton from '../components/MagneticButton.jsx';

const PILLARS = [
  { icon: '📝', accent: 'azul',    title: 'Evaluación breve',
    text: 'Veinte preguntas en aproximadamente siete a diez minutos.' },
  { icon: '📊', accent: 'oro',     title: 'Resultado informativo',
    text: 'Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas.' },
  { icon: '🌿', accent: 'mint',    title: 'Recomendaciones personalizadas',
    text: 'Acciones de autocuidado y vinculación con actividades universitarias.' },
  { icon: '🏛',  accent: 'coral',   title: 'Recursos universitarios',
    text: 'Orientación psicológica, deporte, cultura, comunidad y bienestar verde.' },
  { icon: '🤝', accent: 'lavanda', title: 'IA con responsabilidad',
    text: 'Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional.' },
];

// Áreas que acompaña la plataforma — antes vivían como "orbs" en el hero.
// Ahora son cards bajo el logo grande.
const AREAS = [
  { icon: '🧠', tone: 'azul',     label: 'Psicología' },
  { icon: '⚖️', tone: 'oro',      label: 'Equilibrio' },
  { icon: '🌿', tone: 'mint',     label: 'Calma'      },
  { icon: '🤝', tone: 'coral',    label: 'Comunidad'  },
  { icon: '✨', tone: 'lavanda',  label: 'AURA'   },
  { icon: '🎨', tone: 'rosa',     label: 'Arte'       },
  { icon: '🏃', tone: 'durazno',  label: 'Deporte'    },
  { icon: '📚', tone: 'azul',     label: 'Estudio'    },
  { icon: '💛', tone: 'peach',    label: 'Bienestar'  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ===== Áreas que acompañamos (antes orbs del hero) ===== */}
      <section className="section-sm">
        <div className="container">
          <ScrollReveal variant="slideUp">
            <div className="text-center" style={{maxWidth: 640, margin: '0 auto'}}>
              <span className="tag lavanda">Áreas que acompañamos</span>
              <h2 className="mt-2" style={{fontSize:'clamp(1.3rem, 2vw, 1.8rem)'}}>
                <SplitText splitBy="word" stagger={0.07}>Lo que cuida</SplitText>{' '}
                <ShimmerText variant="aurora" speed={5}>AURA</ShimmerText>
              </h2>
            </div>
          </ScrollReveal>
          <div className="areas-grid">
            {AREAS.map((a, i) => (
              <ScrollReveal key={a.label} variant="slideUp" delay={0.06 * i}>
                <TiltCard
                  className={`area-chip area-${a.tone}`}
                  max={18}
                  scale={1.05}
                  glowColor="rgba(157,123,217,0.35)"
                >
                  <span className="area-icon" aria-hidden="true">{a.icon}</span>
                  <span className="area-label">{a.label}</span>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
          <style>{`
            .areas-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
              gap: 12px;
              margin-top: 22px;
              max-width: 980px;
              margin-left: auto;
              margin-right: auto;
            }
            .area-chip {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 14px 18px;
              border-radius: 16px;
              background: rgba(255,255,255,0.85);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(255,255,255,0.6);
              box-shadow: 0 4px 14px rgba(108,80,124,0.06);
              font-weight: 600;
              transition: transform 0.25s ease, box-shadow 0.25s ease;
            }
            .area-chip:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(108,80,124,0.12); }
            .area-icon { font-size: 1.4rem; }
            .area-label { font-family: var(--ff-serif); font-size: 1rem; }

            .area-azul    { color: var(--c-azul-800);     border-color: rgba(16,36,62,0.18); }
            .area-oro     { color: var(--c-oro-700);      border-color: rgba(201,162,39,0.30); }
            .area-mint    { color: var(--c-mint-700);     border-color: rgba(125,196,174,0.45); }
            .area-coral   { color: var(--c-coral-700);    border-color: rgba(232,130,107,0.40); }
            .area-lavanda { color: var(--c-lavanda-700);  border-color: rgba(157,123,217,0.35); }
            .area-rosa    { color: var(--c-rosa-700);     border-color: rgba(232,130,159,0.40); }
            .area-durazno { color: var(--c-durazno-700);  border-color: rgba(224,172,74,0.40); }
            .area-peach   { color: var(--c-peach-700);    border-color: rgba(255,154,123,0.40); }

            @media (max-width: 540px) {
              .areas-grid { grid-template-columns: repeat(2, 1fr); }
              .area-chip { padding: 11px 14px; }
              .area-label { font-size: 0.92rem; }
              .area-icon { font-size: 1.2rem; }
            }
          `}</style>
        </div>
      </section>

      {/* ===== Marquee inspiracional ===== */}
      <section className="section-sm" style={{padding:'8px 0 24px'}}>
        <Marquee speed={36}>
          <span style={{fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'var(--c-lavanda-700)'}}>✦ Respira</span>
          <span style={{fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'var(--c-peach-700)'}}>✦ Cuida tu cuerpo</span>
          <span style={{fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'var(--c-mint-700)'}}>✦ Habla con alguien</span>
          <span style={{fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'var(--c-coral-700)'}}>✦ No estás solo</span>
          <span style={{fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'var(--c-durazno-700)'}}>✦ Una pausa es válida</span>
          <span style={{fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'var(--c-rosa-700)'}}>✦ Pide ayuda cuando la necesites</span>
          <span style={{fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'var(--c-azul-800)'}}>✦ Tu bienestar importa</span>
        </Marquee>
      </section>

      <section className="section-sm">
        <div className="container" style={{maxWidth: 980}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <TiltCard max={8} scale={1.02} glow={false}><DailyQuote /></TiltCard>
            <TiltCard max={8} scale={1.02} glow={false}><DailyChallenge /></TiltCard>
          </div>
          <style>{`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal variant="slideUp">
            <div className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
              <span className="tag">Cómo te acompaña AURA</span>
              <h2 className="mt-2">
                <SplitText splitBy="word" stagger={0.05}>Una orientación clara,</SplitText>{' '}
                <ShimmerText variant="sunset" speed={6}>anónima</ShimmerText>{' '}
                <SplitText splitBy="word" stagger={0.05} delay={0.3}>y con sentido comunitario</SplitText>
              </h2>
              <p className="lede">
                AURA es una plataforma para reflexionar sobre tu bienestar emocional,
                identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM.
              </p>
            </div>
          </ScrollReveal>

          <div className="pillars">
            {PILLARS.map((p, i) => (
              <ScrollReveal key={p.title} variant="slideUp" delay={0.12 * i}>
                <TiltCard max={10} scale={1.025} glowColor="rgba(255,184,156,0.35)">
                  <InfoCard icon={p.icon} title={p.title} accent={p.accent}>
                    {p.text}
                  </InfoCard>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="zoomIn" delay={0.1}>
          <div className="continuity-card">
            <div className="continuity-icon" aria-hidden="true">🔁</div>
            <div>
              <span className="tag sage">¿Quieres seguir cuidándote?</span>
              <h3 className="mt-2">Tu código anónimo te abre un rincón propio</h3>
              <p>
                Si guardas tu código (ej. <code>SIN-XXX-####</code>) puedes regresar
                cuando quieras y obtener acceso a:
              </p>
              <ul className="continuity-list">
                <li>📝 <strong>Check-in semanal</strong> de 30 segundos</li>
                <li>📔 <strong>Diario emocional</strong> rápido (1 línea/día)</li>
                <li>🛤 <strong>Ruta de bienestar</strong> de 7 o 14 días personalizada</li>
                <li>🤝 <strong>Pum-AI acompañante</strong> para conversar cuando lo necesites</li>
                <li>📚 <strong>Biblioteca</strong> de respiraciones, sonidos y videos</li>
                <li>🗺 <strong>Aventura</strong> con pistas en el campus</li>
                <li>🌳 <strong>Adopta un árbol</strong> y cuídalo</li>
                <li>🫂 <strong>Buddy anónimo</strong> para conectar con otra persona</li>
                <li>📅 <strong>Calendario</strong> de eventos universitarios</li>
                <li>📊 <strong>Tu evolución</strong> a lo largo del tiempo</li>
              </ul>
              <p className="note">
                Sigue siendo <strong>100% anónimo</strong>: solo tu código y, si quieres, una contraseña.
                Nada de nombre, correo ni datos personales.
              </p>
              <div className="continuity-actions">
                <Link to="/mi-historia" className="btn btn-gold">Crear mi código anónimo</Link>
                <Link to="/consentimiento" className="btn btn-ghost">Solo hacer el test</Link>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>

        <style>{`
          .continuity-card {
            background: linear-gradient(135deg, var(--c-azul-100), var(--c-salvia-100));
            border: 1px solid rgba(255,184,156,0.4);
            border-radius: var(--r-xl);
            padding: 32px;
            margin-top: 28px;
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: start;
          }
          .continuity-icon {
            width: 72px; height: 72px;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
            display: grid; place-items: center;
            font-size: 2rem;
          }
          .continuity-card h3 {
            font-size: 1.4rem;
            color: var(--c-azul-800);
          }
          .continuity-list {
            list-style: none;
            padding: 0;
            margin: 14px 0 16px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 6px 16px;
          }
          .continuity-list li {
            font-size: 0.94rem;
            color: var(--c-texto);
          }
          .continuity-actions {
            display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;
          }
          @media (max-width: 720px) {
            .continuity-card { grid-template-columns: 1fr; padding: 22px; }
            .continuity-icon { width: 60px; height: 60px; font-size: 1.6rem; }
          }
        `}</style>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>¿Listo para iniciar?</h2>
              <p>
                La orientación es anónima. No solicitamos nombre, correo, teléfono ni número de cuenta.
                Tus respuestas se procesan para devolverte un panorama útil y recomendaciones.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/consentimiento" className="btn btn-primary btn-lg">Iniciar orientación</Link>
              <Link to="/recursos" className="btn btn-ghost">Ver recursos de apoyo</Link>
            </div>
          </div>

          <div className="mt-4">
            <SafetyNotice />
          </div>
        </div>
      </section>

      <style>{`
        .pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 28px;
        }
        .cta-band {
          background: linear-gradient(135deg, var(--c-azul-100), var(--c-oro-100));
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          padding: 36px;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
        @media (max-width: 740px) {
          .cta-band { grid-template-columns: 1fr; padding: 24px; }
          .cta-actions { justify-content: flex-start; }
        }
      `}</style>
    </>
  );
}
