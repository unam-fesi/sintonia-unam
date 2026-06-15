// =============================================================
// AURA — <MagneticButton>
// Botón/link que es atraído por el cursor (efecto magnético).
// El contenido interno se mueve más rápido que el contenedor
// para sensación táctil.
//
// Uso:
//   <MagneticButton as={Link} to="/test" className="btn btn-primary">
//     Empezar
//   </MagneticButton>
// =============================================================

import { useRef, useEffect } from 'react';

export default function MagneticButton({
  children,
  as: Tag = 'button',
  strength = 0.38,
  innerStrength = 0.7,   // el contenido se mueve más rápido
  radius = 110,
  className = '',
  style = {},
  ...rest
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!outerRef.current) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    let raf = null;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    function onMove(e) {
      const r = outer.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist > radius) { tx = 0; ty = 0; }
      else { tx = dx * strength; ty = dy * strength; }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function onLeave() { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); }
    function tick() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      outer.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (inner) {
        const ix = cx * innerStrength;
        const iy = cy * innerStrength;
        inner.style.transform = `translate3d(${ix.toFixed(2)}px, ${iy.toFixed(2)}px, 0)`;
      }
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(tick);
      else raf = null;
    }
    window.addEventListener('mousemove', onMove);
    outer.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      outer.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, innerStrength, radius]);

  return (
    <Tag
      ref={outerRef}
      className={`magnetic-btn ${className}`}
      style={{
        display: 'inline-flex',
        willChange: 'transform',
        transition: 'box-shadow 0.3s ease',
        ...style,
      }}
      {...rest}
    >
      <span ref={innerRef} className="magnetic-inner" style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'inherit',
        willChange: 'transform',
        pointerEvents: 'none',
      }}>
        {children}
      </span>
    </Tag>
  );
}
