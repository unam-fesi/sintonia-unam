import './ResultCard.css';
import Counter from './Counter.jsx';
import SplitText from './SplitText.jsx';
import ShimmerText from './ShimmerText.jsx';

export default function ResultCard({ result }) {
  if (!result) return null;
  const { total_score, general_level_label, anonymous_code, ai } = result;

  return (
    <section className="result-card">
      <div className="result-hero">
        <div className="result-score">
          <Counter as="span" to={Number(total_score) || 0} duration={1800} className="result-score-num" />
          <span className="result-score-label">/ 100</span>
        </div>
        <div className="result-meta">
          <span className="tag">Tu orientación</span>
          <h1 className="mt-2">
            <ShimmerText variant="aurora" speed={6}>{general_level_label}</ShimmerText>
          </h1>
          <p className="result-summary">
            {ai?.friendly_summary ? (
              <SplitText splitBy="word" stagger={0.018} delay={0.2}>{ai.friendly_summary}</SplitText>
            ) : (
              'Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico.'
            )}
          </p>
          {anonymous_code && (
            <p className="anon-code">
              Tu código anónimo: <strong>{anonymous_code}</strong>
              <small>Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde.</small>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
