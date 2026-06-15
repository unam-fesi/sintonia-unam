// =============================================================
// AURA — <SplitText>
// Rompe el texto en palabras (o letras) y las anima en cascada
// al entrar al viewport. Efecto editorial cinematográfico.
//
// Uso:
//   <SplitText as="h1">Bienvenido a AURA</SplitText>
//   <SplitText splitBy="char" stagger={0.04}>HOLA</SplitText>
//   <SplitText variant="slideUp" stagger={0.08}>Texto largo aquí</SplitText>
// =============================================================

import { useEffect, useRef } from 'react';
import { useInView } from '../utils/dynamicMotion.js';

export default function SplitText({
  children,
  as: Tag = 'span',
  splitBy = 'word',        // 'word' | 'char'
  stagger = 0.06,
  variant = 'slideUp',     // slideUp | slideRight | zoomIn | blurIn | fadeIn
  delay = 0,
  className = '',
  style = {},
  once = true,
  ...rest
}) {
  const [refInView, inView] = useInView({ once });
  const text = typeof children === 'string' ? children : String(children);
  const parts = splitBy === 'char'
    ? text.split('')
    : text.split(/(\s+)/); // mantiene espacios

  return (
    <Tag
      ref={refInView}
      className={`split-text split-${variant} ${inView ? 'split-in' : ''} ${className}`}
      style={style}
      aria-label={text}
      {...rest}
    >
      {parts.map((p, i) => {
        if (/^\s+$/.test(p)) return <span key={i}>{p}</span>;
        return (
          <span
            key={i}
            className="split-part"
            style={{ transitionDelay: `${delay + i * stagger}s`, animationDelay: `${delay + i * stagger}s` }}
            aria-hidden="true"
          >
            {p}
          </span>
        );
      })}

      <style>{`
        .split-text { display: inline-block; }
        .split-part {
          display: inline-block;
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(.2,.7,.2,1), transform 0.7s cubic-bezier(.2,.7,.2,1), filter 0.7s cubic-bezier(.2,.7,.2,1);
          will-change: opacity, transform, filter;
        }
        .split-text.split-in .split-part { opacity: 1; transform: none !important; filter: none !important; }

        .split-slideUp    .split-part { transform: translate3d(0, 1em, 0); }
        .split-slideRight .split-part { transform: translate3d(-1em, 0, 0); }
        .split-zoomIn     .split-part { transform: scale(0.6); }
        .split-blurIn     .split-part { filter: blur(10px); }
        .split-fadeIn     .split-part { /* solo opacity */ }

        @media (prefers-reduced-motion: reduce) {
          .split-part { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
        }
      `}</style>
    </Tag>
  );
}
