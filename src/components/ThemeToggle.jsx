import { useEffect, useState } from 'react';

const KEY = 'aura.theme';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(KEY) === 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem(KEY, dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(d => !d)}
      title={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label="Cambiar tema"
    >
      {dark ? '☀️' : '🌙'}
      <style>{`
        .theme-toggle {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 10px;
          margin-top: 12px;
          width: 100%;
          transition: background 0.2s;
        }
        .theme-toggle:hover { background: rgba(255,255,255,0.15); }
      `}</style>
    </button>
  );
}
