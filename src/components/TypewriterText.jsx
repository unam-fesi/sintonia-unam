// =============================================================
// AURA — <TypewriterText>
// Texto que se "escribe" letra por letra. Útil para respuestas
// de Pum-AI o frases de bienvenida.
//
// Uso:
//   <TypewriterText speed={28}>Hola, soy Pum-AI</TypewriterText>
// =============================================================

import { useEffect, useState } from 'react';

export default function TypewriterText({
  children,
  speed = 32,           // ms por carácter
  startDelay = 0,
  cursor = true,
  onDone,
  as: Tag = 'span',
  className = '',
  style = {},
}) {
  const fullText = typeof children === 'string' ? children : String(children);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCount(fullText.length);
      onDone?.();
      return;
    }
    let id;
    const start = setTimeout(() => {
      let i = 0;
      id = setInterval(() => {
        i++;
        setCount(i);
        if (i >= fullText.length) {
          clearInterval(id);
          onDone?.();
        }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); if (id) clearInterval(id); };
  }, [fullText, speed, startDelay]);

  const isDone = count >= fullText.length;

  return (
    <Tag className={`typewriter ${className}`} style={style} aria-label={fullText}>
      <span aria-hidden="true">{fullText.slice(0, count)}</span>
      {cursor && !isDone && <span className="tw-cursor">▍</span>}
      <style>{`
        .tw-cursor {
          display: inline-block;
          animation: tw-blink 0.9s steps(2, end) infinite;
          color: var(--c-lavanda-600);
          margin-left: 1px;
        }
        @keyframes tw-blink {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tw-cursor { animation: none; }
        }
      `}</style>
    </Tag>
  );
}
