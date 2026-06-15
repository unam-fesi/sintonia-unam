// =============================================================
// AURA — <Parallax>
// Aplica translateY al elemento basado en scroll, creando efecto
// parallax. Velocidad ajustable. Respeta prefers-reduced-motion.
//
// Uso:
//   <Parallax speed={-0.3}>
//     <img src="..." />
//   </Parallax>
//
// speed: negativo = más lento que el scroll (clásico),
//        positivo = más rápido (acelerado).
// =============================================================

import { useEffect, useRef } from 'react';

export default function Parallax({
  children,
  as: Tag = 'div',
  speed = -0.2,
  className = '',
  style = {},
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let raf = null;
    let lastY = window.scrollY;

    function update() {
      if (!ref.current) return;
      // Calcula el offset basado en la posición del elemento en el viewport
      const rect = ref.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const elCenter = rect.top + rect.height / 2;
      // Distancia del centro del elemento al centro del viewport
      const distance = elCenter - viewportH / 2;
      const offset = distance * speed;
      ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      raf = null;
    }

    function onScroll() {
      lastY = window.scrollY;
      if (raf == null) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <Tag
      ref={ref}
      className={`parallax ${className}`}
      style={{ willChange: 'transform', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
