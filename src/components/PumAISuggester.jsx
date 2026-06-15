// =============================================================
// AURA — Modal de sugerencias de Pum-AI para preguntas
// =============================================================

import { useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { DIMENSIONS } from '../data/fallbackQuestions.js';

const CONTEXTS = [
  { id: 'general',         label: 'Sin contexto específico' },
  { id: 'examenes',        label: 'Periodo de exámenes (parciales/finales)' },
  { id: 'inicio_semestre', label: 'Inicio de semestre' },
  { id: 'fin_semestre',    label: 'Fin de semestre' },
  { id: 'vacaciones',      label: 'Periodo vacacional' },
  { id: 'regreso_clases',  label: 'Regreso de vacaciones' },
  { id: 'invierno',        label: 'Temporada invernal' },
];

export default function PumAISuggester({ onUse }) {
  const [open, setOpen] = useState(false);
  const [dimension, setDimension] = useState(DIMENSIONS[0].id);
  const [context, setContext] = useState('general');
  const [count, setCount] = useState(5);
  const [tone, setTone] = useState('cercano');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(null);

  async function generate() {
    setLoading(true); setErr(null); setResults([]);
    try {
      const { data, error } = await supabase.functions.invoke('suggest-questions', {
        body: { dimension, context, count, tone },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResults(data?.suggestions || []);
    } catch (e) {
      setErr(e?.message || 'No pudimos generar sugerencias.');
    } finally {
      setLoading(false);
    }
  }

  function handleUse(s) {
    onUse?.({
      question_text: s.question_text,
      is_reverse_scored: s.is_reverse_scored,
      dimension,
    });
    setOpen(false);
  }

  return (
    <>
      <button className="btn btn-gold btn-sm" onClick={() => setOpen(true)}>
        ✨ Sugerir con Pum-AI
      </button>

      {open && (
        <div className="pumai-overlay" onClick={() => setOpen(false)}>
          <div className="pumai-modal" onClick={e => e.stopPropagation()}>
            <header>
              <h3>✨ Pum-AI · Sugerir preguntas</h3>
              <button className="close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
            </header>

            <div className="form-grid">
              <div className="field">
                <label>Dimensión</label>
                <select value={dimension} onChange={e => setDimension(e.target.value)}>
                  {DIMENSIONS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Contexto / época del año</label>
                <select value={context} onChange={e => setContext(e.target.value)}>
                  {CONTEXTS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Tono</label>
                <select value={tone} onChange={e => setTone(e.target.value)}>
                  <option value="cercano">Cercano (default)</option>
                  <option value="neutral">Neutral / formal</option>
                  <option value="empatico">Empático / suave</option>
                  <option value="directo">Directo / breve</option>
                </select>
              </div>
              <div className="field">
                <label>Cantidad</label>
                <input type="number" min="1" max="10" value={count}
                  onChange={e => setCount(Number(e.target.value))} />
              </div>
            </div>

            <button className="btn btn-primary" onClick={generate} disabled={loading}>
              {loading ? 'Generando con Pum-AI…' : '✨ Generar sugerencias'}
            </button>

            {err && <p className="error">{err}</p>}

            {results.length > 0 && (
              <div className="results">
                <h4>Sugerencias ({results.length})</h4>
                {results.map((s, i) => (
                  <article key={i} className="suggestion">
                    <p className="q-text">"{s.question_text}"</p>
                    <div className="meta">
                      <span className={`badge ${s.is_reverse_scored ? 'pos' : 'neg'}`}>
                        {s.is_reverse_scored ? '↑ Positiva (más = bienestar)' : '↓ Negativa (más = malestar)'}
                      </span>
                      {s.rationale && <small>{s.rationale}</small>}
                    </div>
                    <button className="btn btn-coral btn-sm" onClick={() => handleUse(s)}>
                      ＋ Usar esta
                    </button>
                  </article>
                ))}
                <p className="note text-center mt-2">
                  Pum-AI puede equivocarse. Revisa cada sugerencia antes de guardarla.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .pumai-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 25, 41, 0.6);
          backdrop-filter: blur(4px);
          display: grid;
          place-items: center;
          z-index: 100;
          padding: 16px;
          animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} }
        .pumai-modal {
          background: var(--c-blanco, #fff);
          border-radius: var(--r-xl);
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
        }
        .pumai-modal header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 14px;
        }
        .pumai-modal h3 { margin: 0; font-size: 1.2rem; color: var(--c-azul-800); }
        .pumai-modal .close {
          background: transparent; border: none; cursor: pointer;
          font-size: 1.4rem; color: var(--c-gris); padding: 4px 8px;
          border-radius: 8px;
        }
        .pumai-modal .close:hover { background: var(--c-azul-100); }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pumai-modal .error {
          background: var(--c-coral-100); color: #93362A;
          padding: 10px 14px; border-radius: 12px; font-size: 0.92rem;
          margin-top: 12px;
        }
        .results { margin-top: 24px; display: grid; gap: 10px; }
        .results h4 { color: var(--c-azul-800); margin: 0 0 6px; }
        .suggestion {
          padding: 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde);
          border-radius: 12px;
        }
        .suggestion .q-text {
          font-family: var(--ff-serif);
          font-size: 1.02rem;
          color: var(--c-azul-800);
          margin: 0 0 8px;
          font-style: italic;
        }
        .suggestion .meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
        .suggestion small { color: var(--c-gris); font-size: 0.82rem; }
        .badge {
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 700;
        }
        .badge.pos { background: var(--c-salvia-100); color: #2F8770; }
        .badge.neg { background: var(--c-coral-100); color: #93362A; }
        @media (max-width: 540px) {
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
