// =============================================================
// AURA — Pum-AI sugiere recomendaciones por dimensión/nivel
// =============================================================

import { useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { DIMENSIONS } from '../data/fallbackQuestions.js';

const LEVELS = [
  { id: 'bajo',        label: 'Bajo (mantener)' },
  { id: 'moderado',    label: 'Moderado (ajustar)' },
  { id: 'prioritario', label: 'Prioritario (acompañar)' },
];

const TYPES = [
  { id: 'autocuidado',  label: 'Autocuidado individual' },
  { id: 'comunidad',    label: 'Comunidad / grupal' },
  { id: 'ejercicio',    label: 'Ejercicio físico' },
  { id: 'mindfulness',  label: 'Mindfulness / respiración' },
  { id: 'arte',         label: 'Arte y expresión' },
  { id: 'orientacion',  label: 'Orientación profesional' },
];

export default function PumAIRecSuggester({ onUse }) {
  const [open, setOpen] = useState(false);
  const [dimension, setDimension] = useState(DIMENSIONS[0].id);
  const [level, setLevel] = useState('moderado');
  const [type, setType] = useState('autocuidado');
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(null);

  async function generate() {
    setLoading(true); setErr(null); setResults([]);
    try {
      const { data, error } = await supabase.functions.invoke('suggest-recommendations', {
        body: { dimension, level, type, count },
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
    onUse?.({ ...s, dimension, level });
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
              <h3>✨ Pum-AI · Sugerir recomendaciones</h3>
              <button className="close" onClick={() => setOpen(false)}>✕</button>
            </header>

            <div className="form-grid">
              <div className="field">
                <label>Dimensión</label>
                <select value={dimension} onChange={e => setDimension(e.target.value)}>
                  {DIMENSIONS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Nivel de atención</label>
                <select value={level} onChange={e => setLevel(e.target.value)}>
                  {LEVELS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Tipo de acción</label>
                <select value={type} onChange={e => setType(e.target.value)}>
                  {TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Cantidad</label>
                <input type="number" min="1" max="6" value={count}
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
                    <strong>{s.title}</strong>
                    <p>{s.description}</p>
                    <button className="btn btn-coral btn-sm" onClick={() => handleUse(s)}>
                      ＋ Usar esta
                    </button>
                  </article>
                ))}
                <p className="note text-center mt-2">Revisa cada sugerencia antes de guardarla.</p>
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
          display: grid; place-items: center;
          z-index: 100; padding: 16px;
          animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} }
        .pumai-modal {
          background: #fff;
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
        }
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
        .suggestion strong { color: var(--c-azul-800); display: block; margin-bottom: 4px; }
        .suggestion p { margin: 0 0 8px; font-size: 0.94rem; color: var(--c-texto-soft); }
        @media (max-width: 540px) { .form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
