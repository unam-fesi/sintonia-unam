import { Link } from 'react-router-dom';
import SafetyNotice from '../components/SafetyNotice.jsx';

export default function Privacy() {
  return (
    <section className="section">
      <div className="container" style={{maxWidth: 820}}>
        <div className="panel">
          <span className="tag azul">Aviso de privacidad y uso responsable</span>
          <h1 className="mt-2">Tu privacidad importa</h1>
          <p className="lede">
            AURA es una herramienta universitaria de orientación informativa
            que opera con el menor uso posible de información. Este aviso explica cómo
            funciona la herramienta, qué datos manejamos y cómo se usan.
          </p>

          <h2 className="mt-4">¿Qué es AURA?</h2>
          <p>
            Es una plataforma anónima que permite a la comunidad universitaria reflexionar
            sobre su bienestar emocional, identificar áreas de autocuidado y conocer recursos
            de apoyo dentro de la UNAM.
          </p>

          <h2 className="mt-4">¿Qué datos solicitamos?</h2>
          <p>
            En esta primera fase, <strong>no solicitamos datos personales</strong>. Concretamente,
            nunca pedimos:
          </p>
          <ul>
            <li>Nombre o apellidos.</li>
            <li>Correo electrónico o teléfono.</li>
            <li>Número de cuenta UNAM o RFC/CURP.</li>
            <li>Dirección o ubicación.</li>
            <li>Información médica o de identidad.</li>
          </ul>

          <h2 className="mt-4">¿Qué datos sí almacenamos?</h2>
          <ul>
            <li>Las respuestas a las 20 preguntas, asociadas únicamente a un código anónimo (por ejemplo: SIN-KQT-2856).</li>
            <li>Los puntajes y dimensiones calculados a partir de tus respuestas.</li>
            <li>El nivel general y áreas de mayor atención sugerida.</li>
            <li>La fecha y hora de tu evaluación, sin incluir tu IP ni metadatos del dispositivo.</li>
          </ul>

          <h2 className="mt-4">¿Para qué se usan?</h2>
          <ul>
            <li>Generar de forma <strong>inmediata</strong> tu orientación personal.</li>
            <li>Mejorar el programa con <strong>análisis agregado</strong> (por ejemplo: cuántas personas
              han buscado orientación en cierta dimensión).</li>
            <li>Vincularte con recursos universitarios pertinentes.</li>
          </ul>

          <h2 className="mt-4">¿Cómo se almacenan?</h2>
          <p>
            En servidores seguros con políticas de control de acceso por fila activas, lo cual significa que:
          </p>
          <ul>
            <li>Tus respuestas no son legibles públicamente.</li>
            <li>Solo personal autorizado del programa puede consultar reportes agregados.</li>
            <li>Los reportes administrativos no incluyen información que te identifique.</li>
          </ul>

          <h2 className="mt-4">Uso responsable de inteligencia artificial</h2>
          <p>
            Para redactar la orientación amigable utilizamos <strong>Pum-AI</strong>,
            nuestro asistente basado en modelos de inteligencia artificial.
            Tomamos las siguientes medidas:
          </p>
          <ul>
            <li>El modelo recibe únicamente <strong>datos agregados</strong>: nivel general, puntajes por dimensión y áreas con más atención.</li>
            <li>No le enviamos tu nombre, correo, teléfono ni información personal sensible —porque tampoco la solicitamos.</li>
            <li>El prompt restringe explícitamente al modelo a <strong>no diagnosticar, no recetar y no inventar servicios</strong>.</li>
            <li>La IA no sustituye atención profesional; solo redacta la orientación con tono empático y prudente.</li>
          </ul>

          <h2 className="mt-4">Límites de la herramienta</h2>
          <ul>
            <li>AURA es <strong>informativa</strong>, no diagnóstica.</li>
            <li>No reemplaza terapia, intervención psicológica clínica ni atención médica.</li>
            <li>Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios.</li>
          </ul>

          <SafetyNotice variant="gold">
            Si en este momento estás atravesando una crisis o piensas en hacerte daño,
            llama a la <strong>Línea de la Vida: 800 290 0024</strong>. Gratuito, confidencial y disponible 24 horas.
          </SafetyNotice>

          <h2 className="mt-4">Contacto</h2>
          <p>
            Para consultas sobre este aviso o sobre el manejo de información, escríbenos a
            <a href="mailto:sintonia@unam.mx"> sintonia@unam.mx</a>.
          </p>

          <p className="mt-4">
            <Link to="/" className="btn btn-ghost">Volver al inicio</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
