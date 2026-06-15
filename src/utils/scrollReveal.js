// =============================================================
// AURA — Scroll reveal helpers
// Sistema ligero para storytelling con scroll usando IntersectionObserver.
// Respeta prefers-reduced-motion (en ese modo no anima, solo muestra).
// Sin dependencias externas para mantener bundle pequeño.
// =============================================================

let sharedObserver = null;
const observedEls = new WeakMap();

function getReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Suscribe un elemento al observer compartido. Cuando entra al viewport,
 * agrega clase `in-view` y dispara el callback opcional.
 *
 * @param {HTMLElement} el        - elemento a observar
 * @param {Object}      options
 * @param {number}      options.threshold      - 0..1, fracción visible para disparar (default 0.15)
 * @param {string}      options.rootMargin     - margen del observer (default '0px 0px -10% 0px')
 * @param {boolean}     options.once           - si true, deja de observar tras primer reveal (default true)
 * @param {Function}    options.onEnter        - callback(el) cuando entra al viewport
 * @returns {() => void} - función para des-suscribir
 */
export function observeReveal(el, options = {}) {
  if (!el) return () => {};

  // En reduced-motion, aplicamos in-view de inmediato y salimos
  if (getReducedMotion()) {
    el.classList.add('in-view');
    options.onEnter?.(el);
    return () => {};
  }

  const {
    threshold  = 0.15,
    rootMargin = '0px 0px -10% 0px',
    once       = true,
    onEnter,
  } = options;

  // Reutilizamos un solo observer global para performance.
  // (Si los threshold/rootMargin difieren mucho podríamos pooling — para este proyecto basta uno.)
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            const meta = observedEls.get(entry.target);
            meta?.onEnter?.(entry.target);
            if (meta?.once !== false) {
              sharedObserver.unobserve(entry.target);
              observedEls.delete(entry.target);
            }
          }
        }
      },
      { threshold, rootMargin }
    );
  }

  observedEls.set(el, { onEnter, once });
  sharedObserver.observe(el);

  return () => {
    sharedObserver?.unobserve(el);
    observedEls.delete(el);
  };
}

/**
 * Hook React-friendly: pasa una ref y obtienes el setup automático.
 * Uso:
 *   const ref = useReveal({ delay: 0.2 });
 *   <div ref={ref} className="reveal">...</div>
 */
import { useEffect, useRef } from 'react';

export function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (options.delay) {
      ref.current.style.transitionDelay = `${options.delay}s`;
    }
    return observeReveal(ref.current, options);
  }, [options.delay, options.threshold, options.rootMargin]);
  return ref;
}

/**
 * Counter animado: cuenta de 0 a target cuando el elemento entra al viewport.
 * Mejora la sensación cinematográfica en KPIs / stats.
 *
 * @param {HTMLElement} el      - elemento de texto a actualizar
 * @param {number}      target  - número final
 * @param {Object}      options
 * @param {number}      options.duration  - duración en ms (default 1400)
 * @param {string}      options.suffix    - sufijo (ej. '%')
 * @param {string}      options.prefix    - prefijo (ej. '$')
 * @param {Function}    options.format    - formateador (n) => string
 */
export function animateCounter(el, target, options = {}) {
  if (!el) return;
  if (getReducedMotion()) {
    el.textContent = (options.prefix || '') + (options.format ? options.format(target) : String(target)) + (options.suffix || '');
    return;
  }
  const { duration = 1400, suffix = '', prefix = '', format } = options;
  const start = performance.now();
  function tick(t) {
    const p = Math.min(1, (t - start) / duration);
    // EaseOutCubic
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.round(target * eased);
    el.textContent = prefix + (format ? format(v) : String(v)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
