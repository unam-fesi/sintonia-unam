// =============================================================
// AURA — Frase y Reto del día
// Selección determinista por fecha desde student_library.
// =============================================================

import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

function dayHash() {
  const d = new Date();
  return d.getFullYear() * 1000 + d.getMonth() * 32 + d.getDate();
}
function pickByDay(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[dayHash() % arr.length];
}

export function DailyQuote({ compact = false }) {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    supabase.from('student_library')
      .select('id, title, body, meta')
      .eq('category', 'quote').eq('active', true)
      .then(({ data }) => setQuote(pickByDay(data)));
  }, []);
  if (!quote) return null;
  return (
    <div className={`daily-quote ${compact ? 'compact' : ''}`}>
      <small>💭 Frase del día</small>
      <blockquote>"{quote.title}"</blockquote>
      {quote.body && <cite>— {quote.body}</cite>}
      <style>{`
        .daily-quote {
          background: linear-gradient(135deg, var(--c-azul-100), var(--c-lavanda-100));
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin: 12px 0;
        }
        .daily-quote.compact { padding: 12px 16px; }
        .daily-quote small { color: var(--c-gris); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .daily-quote blockquote {
          font-family: var(--ff-serif);
          font-size: 1.15rem;
          color: var(--c-azul-800);
          font-style: italic;
          margin: 8px 0 4px;
        }
        .daily-quote cite { color: var(--c-texto-soft); font-size: 0.86rem; font-style: normal; }
      `}</style>
    </div>
  );
}

export function DailyChallenge() {
  const { student } = useStudent();
  const [challenge, setChallenge] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    supabase.from('student_library')
      .select('id, title, body')
      .eq('category', 'challenge').eq('active', true)
      .then(({ data }) => setChallenge(pickByDay(data)));
  }, []);

  useEffect(() => {
    if (!challenge || !student?.code) return;
    const key = `challenge_${dayHash()}_${challenge.id}`;
    supabase.from('student_achievements')
      .select('id')
      .eq('anonymous_code', student.code)
      .eq('achievement_key', key)
      .maybeSingle()
      .then(({ data }) => setDone(!!data));
  }, [challenge, student?.code]);

  async function markDone() {
    if (!student?.code || !challenge) return;
    const key = `challenge_${dayHash()}_${challenge.id}`;
    await supabase.from('student_achievements').upsert({
      anonymous_code: student.code,
      achievement_key: key,
    });
    setDone(true);
  }

  if (!challenge) return null;
  return (
    <div className="daily-challenge">
      <small>🎯 Reto del día</small>
      <h3>{challenge.title}</h3>
      {challenge.body && <p>{challenge.body}</p>}
      {student?.code && (
        <button
          className={`btn ${done ? 'btn-ghost' : 'btn-coral'} btn-sm`}
          onClick={markDone}
          disabled={done}
        >
          {done ? '✓ ¡Lo hiciste!' : 'Marcar como hecho'}
        </button>
      )}
      <style>{`
        .daily-challenge {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border: 1px solid rgba(232,130,107,0.3);
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin: 12px 0;
        }
        .daily-challenge small { color: #93362A; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .daily-challenge h3 { color: var(--c-azul-800); margin: 6px 0 4px; }
        .daily-challenge p { color: var(--c-texto-soft); margin: 0 0 10px; font-size: 0.94rem; }
      `}</style>
    </div>
  );
}
