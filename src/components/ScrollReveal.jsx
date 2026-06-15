// =============================================================
// AURA — <ScrollReveal>
// Wrapper que aplica clase `in-view` cuando entra al viewport,
// disparando una transición CSS. Usa el observer compartido de
// scrollReveal.js para performance.
//
// Uso:
//   <ScrollReveal>
//     <h2>Hola</h2>
//   </ScrollReveal>
//
//   <ScrollReveal as="section" delay={0.2} variant="slideUp">
//     <p>...</p>
//   </ScrollReveal>
//
// Variants:
//   slideUp     (default) — desde abajo
//   slideRight  — desde la izquierda
//   slideLeft   — desde la derecha
//   fadeIn      — solo opacity
//   zoomIn      — escala desde 0.95
//   blurIn      — entrada con blur
// =============================================================

import { useEffect, useRef } from 'react';
import { observeReveal } from '../utils/scrollReveal.js';

export default function ScrollReveal({
  children,
  as: Tag = 'div',
  variant = 'slideUp',
  delay = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  className = '',
  style = {},
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (delay) ref.current.style.transitionDelay = `${delay}s`;
    return observeReveal(ref.current, { threshold, rootMargin });
  }, [delay, threshold, rootMargin]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={style}
      {...rest}
    >
      {children}

      <style>{`
        .reveal {
          opacity: 0;
          transition:
            opacity 0.9s cubic-bezier(.2,.7,.2,1),
            transform 0.9s cubic-bezier(.2,.7,.2,1),
            filter 0.9s cubic-bezier(.2,.7,.2,1);
          will-change: opacity, transform, filter;
        }
        .reveal.in-view {
          opacity: 1;
          transform: none !important;
          filter: none !important;
        }
        .reveal-slideUp    { transform: translate3d(0, 30px, 0); }
        .reveal-slideRight { transform: translate3d(-40px, 0, 0); }
        .reveal-slideLeft  { transform: translate3d(40px, 0, 0); }
        .reveal-fadeIn     { /* solo opacity */ }
        .reveal-zoomIn     { transform: scale(0.95); }
        .reveal-blurIn     { filter: blur(12px); opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </Tag>
  );
}

/**
 * Stagger: revela hijos en cascada. Cada hijo entra con `delayStep`
 * de retraso. Útil para grids/lists.
 *
 *   <RevealStagger delayStep={0.12}>
 *     <Card/>
 *     <Card/>
 *   </RevealStagger>
 */
export function RevealStagger({ children, delayStep = 0.1, variant = 'slideUp', ...rest }) {
  const arr = Array.isArray(children) ? children : [children];
  return (
    <>
      {arr.map((child, i) => (
        <ScrollReveal
          key={i}
          variant={variant}
          delay={i * delayStep}
          {...rest}
        >
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}
