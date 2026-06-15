// =============================================================
// AURA — Carga Leaflet vía CDN una sola vez
// Evita agregar la dependencia npm — sirve para mapas simples.
// =============================================================

import { useEffect, useState } from 'react';

const CDN_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const CDN_JS  = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

let loadingPromise = null;

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CDN_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CDN_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${CDN_JS}"]`)) {
      const s = document.createElement('script');
      s.src = CDN_JS;
      s.async = true;
      s.onload = () => resolve(window.L);
      s.onerror = reject;
      document.body.appendChild(s);
    } else {
      const wait = setInterval(() => {
        if (window.L) { clearInterval(wait); resolve(window.L); }
      }, 50);
    }
  });
  return loadingPromise;
}

export function useLeaflet() {
  const [L, setL] = useState(window.L || null);
  useEffect(() => {
    if (L) return;
    loadLeaflet().then(setL).catch(console.error);
  }, [L]);
  return L;
}
