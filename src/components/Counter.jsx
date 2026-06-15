// =============================================================
// AURA — <Counter>
// Número que cuenta de 0 (o `from`) a `to` al entrar al viewport.
//
// Uso:
//   <Counter to={20} />
//   <Counter to={1500} duration={2000} format={n => n.toLocaleString()} />
// =============================================================

import { useEffect, useRef, useState } from 'react';
import { useInView } from '../utils/dynamicMotion.js';

export default function Counter({
  to,
  from = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  format = null,
  decimals = 0,
  as: Tag = 'span',
  className = '',
  style = {},
}) {
  const [refInView, inView] = useInView();
  const [value, setValue] = useState(from);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const target = Number(to);
    if (!Number.isFinite(target)) { setValue(target); return; }
    function tick(t) {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      setValue(decimals ? Number(v.toFixed(decimals)) : Math.round(v));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, to, from, duration, decimals]);

  const display = format ? format(value) : String(value);
  return (
    <Tag ref={refInView} className={`counter ${className}`} style={style}>
      {prefix}{display}{suffix}
    </Tag>
  );
}
