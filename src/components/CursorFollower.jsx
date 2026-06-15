// =============================================================
// AURA — <CursorFollower>
// Cursor personalizado: blob lavanda que sigue al mouse con
// suavidad. Crece al hover sobre links/botones (clase "cursor-hover").
// Solo desktop con cursor real.
// =============================================================

import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia?.('(pointer: coarse)').matches) return; // sin touch

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    let raf = null;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let rx = tx, ry = ty;
    let isHover = false;

    function onMove(e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function tick() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${isHover ? 1.6 : 1})`;
      if (Math.abs(tx - rx) > 0.2 || Math.abs(ty - ry) > 0.2) raf = requestAnimationFrame(tick);
      else raf = null;
    }
    function onOver(e) {
      const tag = e.target?.closest?.('a, button, [role=button], input, textarea, select, .tilt-card, .area-chip');
      isHover = !!tag;
      if (!raf) raf = requestAnimationFrame(tick);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.body.classList.add('has-cursor-follower');
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      if (raf) cancelAnimationFrame(raf);
      document.body.classList.remove('has-cursor-follower');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <style>{`
        .cursor-ring, .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: multiply;
          will-change: transform;
        }
        .cursor-ring {
          width: 36px; height: 36px;
          border: 1.5px solid var(--c-lavanda-600);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(157,123,217,0.10), transparent 70%);
          transition: transform 0.06s linear, background 0.25s;
        }
        .cursor-dot {
          width: 6px; height: 6px;
          background: var(--c-lavanda-700);
          border-radius: 50%;
        }
        body.has-cursor-follower,
        body.has-cursor-follower * { cursor: none !important; }
        body.has-cursor-follower a,
        body.has-cursor-follower button,
        body.has-cursor-follower input,
        body.has-cursor-follower textarea,
        body.has-cursor-follower select { cursor: none !important; }
        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .cursor-ring, .cursor-dot { display: none; }
          body.has-cursor-follower,
          body.has-cursor-follower * { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}
