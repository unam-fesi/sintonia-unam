import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';
import { installChunkReloadHandler } from './utils/chunkReloadHandler.js';

// Auto-reload si un chunk lazy falla (deploy nuevo con pestaña vieja).
installChunkReloadHandler();

// GitHub Pages SPA fallback: si /404.html nos rescata con ?p=, restauramos la URL.
(function spaFallback() {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('p');
  if (p !== null) {
    const q = params.get('q');
    const target = window.location.pathname.replace(/\/$/, '') + p
      + (q ? '?' + q.replace(/~and~/g, '&') : '')
      + window.location.hash;
    window.history.replaceState(null, '', target);
  }
})();

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
