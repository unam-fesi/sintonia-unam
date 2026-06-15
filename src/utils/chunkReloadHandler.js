// =============================================================
// AURA — Chunk reload handler
// Detecta errores de "failed to load dynamically imported module"
// que ocurren cuando un usuario tiene la app abierta y se
// despliega una nueva versión (los chunks cambian de hash).
//
// Estrategia:
// 1. Escuchar errores window.error + unhandledrejection
// 2. Si el error menciona "import" / "module" / "MIME" / "chunk"
//    Y la URL contiene /assets/...js → invalidar cache y recargar
// 3. Cooldown de 60s para no entrar en loop infinito si el problema
//    persiste (ej. CDN tirado de verdad)
// =============================================================

const RELOAD_FLAG = 'aura.chunk_reload_at';
const COOLDOWN_MS = 60_000;

function looksLikeChunkLoadError(err) {
  if (!err) return false;
  const msg = String(err.message || err || '');
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|MIME type|ChunkLoadError|Loading chunk \d+ failed/i.test(msg);
}

function tryReload() {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_FLAG) || 0);
    const now = Date.now();
    if (last && now - last < COOLDOWN_MS) {
      console.warn('[chunkReload] within cooldown, skipping reload');
      return false;
    }
    sessionStorage.setItem(RELOAD_FLAG, String(now));
    // Bypass del cache local del browser
    const url = new URL(window.location.href);
    url.searchParams.set('_v', String(now));
    window.location.replace(url.toString());
    return true;
  } catch (e) {
    // Fallback duro
    window.location.reload();
    return true;
  }
}

export function installChunkReloadHandler() {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (e) => {
    if (looksLikeChunkLoadError(e?.error || e?.message)) {
      console.warn('[chunkReload] detected stale chunk, reloading…', e?.message);
      tryReload();
    }
  });

  window.addEventListener('unhandledrejection', (e) => {
    if (looksLikeChunkLoadError(e?.reason)) {
      console.warn('[chunkReload] detected stale chunk (promise), reloading…', e?.reason);
      tryReload();
    }
  });
}
