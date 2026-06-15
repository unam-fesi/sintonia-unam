// =============================================================
// AURA — <FloatingParticles>
// Partículas pequeñas flotando lento en el viewport. Canvas para
// performance. Solo en pantallas grandes y sin reduced-motion.
// =============================================================

import { useEffect, useRef } from 'react';

const COLORS = [
  'rgba(183, 168, 217, 0.55)',  // lavanda
  'rgba(255, 184, 156, 0.50)',  // peach
  'rgba(255, 199, 216, 0.50)',  // rosa
  'rgba(255, 216, 158, 0.50)',  // durazno
];

export default function FloatingParticles({ density = 28, maxRadius = 4 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia?.('(max-width: 720px)').matches) return; // desactivar en móvil

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = Array.from({ length: density }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.4 + Math.random() * maxRadius,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.15 - Math.random() * 0.25, // suben suave
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf = null;
    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.014;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const alpha = 0.6 + Math.sin(p.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.55', String(0.35 + alpha * 0.25));
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [density, maxRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'multiply',
      }}
    />
  );
}
