// =============================================================
// AURA — Dynamic Motion Utilities
// Hooks y helpers para microinteracciones cinematográficas.
// Respeta prefers-reduced-motion en todos lados.
// =============================================================

import { useEffect, useRef, useState } from 'react';

function isReduced() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// =============================================================
// useTilt3D — tilt 3D al mover el mouse sobre el elemento
// Retorna ref. Aplica transform perspective + rotateX/Y.
// =============================================================
export function useTilt3D({ max = 14, scale = 1.03, glow = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (isReduced()) return;
    const el = ref.current;
    let raf = null;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let mouseX = 50, mouseY = 50; // %
    let isInside = false;

    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top)  / r.height;
      targetX = (y - 0.5) * -2 * max;       // rotateX
      targetY = (x - 0.5) *  2 * max;       // rotateY
      mouseX = x * 100;
      mouseY = y * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function onEnter() { isInside = true; el.style.willChange = 'transform'; }
    function onLeave() {
      isInside = false;
      targetX = 0; targetY = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function tick() {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      const s = isInside ? scale : 1;
      el.style.transform =
        `perspective(900px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(${s},${s},${s})`;
      if (glow) {
        el.style.setProperty('--tilt-x', `${mouseX}%`);
        el.style.setProperty('--tilt-y', `${mouseY}%`);
      }
      const stillMoving = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillMoving) raf = requestAnimationFrame(tick);
      else { raf = null; if (!isInside) el.style.willChange = ''; }
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, scale, glow]);
  return ref;
}

// =============================================================
// useMagnetic — el elemento es atraído por el cursor
// Útil para botones primarios. strength = 0.3-0.5 recomendado.
// =============================================================
export function useMagnetic({ strength = 0.4, radius = 100 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (isReduced()) return;
    const el = ref.current;
    let raf = null;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    function onMove(e) {
      const r = el.getBoundingClientRect();
      const centerX = r.left + r.width / 2;
      const centerY = r.top + r.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) { tx = 0; ty = 0; }
      else {
        tx = dx * strength;
        ty = dy * strength;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function onLeave() { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); }
    function tick() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(tick);
      else raf = null;
    }
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, radius]);
  return ref;
}

// =============================================================
// useScrollProgress — retorna 0-1 según posición del elemento
// 0 = está abajo del viewport (entrando), 1 = está arriba (saliendo)
// =============================================================
export function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let raf = null;
    function update() {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when bottom of element at bottom of viewport, 1 when top at top
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      setProgress(p);
      raf = null;
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, progress];
}

// =============================================================
// useGlobalScrollProgress — progreso global del scroll de la página
// =============================================================
export function useGlobalScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

// =============================================================
// useInView — hook simple para detectar si está visible
// =============================================================
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (isReduced()) { setInView(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) obs.unobserve(entry.target);
      } else if (!once) setInView(false);
    }, { threshold, rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);
  return [ref, inView];
}
