import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SafetyNotice from '../components/SafetyNotice.jsx';
import { STORAGE_KEYS } from '../utils/constants.js';

export default function Consent() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  function continuar() {
    if (!accepted) return;
    sessionStorage.setItem(STORAGE_KEYS.CONSENT, JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString(),
    }));
    navigate('/evaluacion');
  }

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 820}}>
        <div className="panel">
          <span className="tag">Antes de iniciar</span>
          <h1 className="mt-2">Consentimiento informado</h1>
          <p className="lede">
            Antes de comenzar, te invitamos a leer las siguientes consideraciones.
            Tu participación es libre y puedes detenerla en cualquier momento.
          </p>

          <h2 className="mt-4">¿Qué es AURA?</h2>
          <p>
            AURA es una herramienta <strong>informativa</strong> de orientación para el bienestar emocional.
            <strong> No es un servicio médico, terapéutico ni de atención clínica.</strong>
            Su propósito es ayudarte a reflexionar sobre cómo te has sentido y conocer recursos de apoyo
            dentro de la universidad.
          </p>

          <h2 className="mt-4">¿Qué pasará con tus respuestas?</h2>
          <ul>
            <li>
              <strong>No te pediremos datos personales</strong>: ni nombre, ni correo, ni teléfono,
              ni número de cuenta, ni cualquier información que te identifique directamente.
            </li>
            <li>
              Generamos un <strong>código anónimo</strong> (por ejemplo: SIN-KQT-2856) que tú decides
              guardar si quieres consultar tu resultado más tarde.
            </li>
            <li>
              Tus respuestas se almacenan de forma <strong>anónima y agregada</strong> con fines
              de mejora del programa y análisis estadístico.
            </li>
            <li>
              Para generar tu orientación amigable, enviamos a un modelo de inteligencia artificial
              <strong> únicamente datos agregados</strong> (puntajes y dimensiones), nunca información personal.
            </li>
          </ul>

          <h2 className="mt-4">Limitaciones</h2>
          <ul>
            <li>El resultado es <strong>informativo, no diagnóstico</strong>.</li>
            <li>No reemplaza la atención psicológica o médica profesional.</li>
            <li>Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios de orientación.</li>
          </ul>

          <SafetyNotice variant="gold">
            Si en este momento estás atravesando una crisis o piensas en hacerte daño,
            comunícate de inmediato a la <strong>Línea de la Vida: 800 290 0024</strong> (24 horas, gratuito).
          </SafetyNotice>

          <div className="consent-box mt-4">
            <label className="consent-label">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>He leído y acepto continuar con esta orientación informativa.</span>
            </label>
          </div>

          <div className="actions mt-4">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={continuar}
              disabled={!accepted}
            >
              Continuar →
            </button>
            <Link to="/" className="btn btn-ghost">Volver al inicio</Link>
          </div>
        </div>
      </div>

      <style>{`
        .consent-box {
          background: var(--c-azul-100);
          border-radius: 14px;
          padding: 16px 18px;
        }
        .consent-label {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-weight: 500;
          color: var(--c-texto);
          cursor: pointer;
        }
        .consent-label input { margin-top: 4px; transform: scale(1.2); accent-color: var(--c-azul-800); }
        .actions { display: flex; gap: 12px; flex-wrap: wrap; }
      `}</style>
    </section>
  );
}
