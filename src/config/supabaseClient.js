// =============================================================
// AURA — Cliente Supabase para el frontend
// Sólo se usan claves PÚBLICAS (anon / publishable).
// Las claves service_role y de Pum-AI viven en Edge Functions.
// =============================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper: lee el código anónimo de sessionStorage en cada momento
function getAnonCode() {
  try {
    const raw = sessionStorage.getItem('aura.student');
    if (raw) return (JSON.parse(raw).code || '');
    return sessionStorage.getItem('aura.anon_code') || '';
  } catch { return ''; }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storageKey: 'aura.auth',
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    // Hook que ejecuta antes de CADA request HTTP a Supabase
    fetch: (url, opts = {}) => {
      const code = getAnonCode();
      const headers = new Headers(opts.headers || {});
      if (code) headers.set('X-Anon-Code', code);
      return fetch(url, { ...opts, headers });
    },
  },
});

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
