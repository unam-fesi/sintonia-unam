// =============================================================
// AURA — Cliente de la Edge Function de Pum-AI
// Llama a `generate-orientation` en Supabase y devuelve un
// objeto { friendly_summary, suggested_actions, recommended_resources, safety_note }.
//
// Si Supabase no está configurado o la función falla, regresa null
// para que la UI use recomendaciones base locales.
// =============================================================

import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';
import { ORIENTATION_FUNCTION } from '../utils/constants.js';

export async function generateOrientation(payload) {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.functions.invoke(ORIENTATION_FUNCTION, {
      body: payload,
    });
    if (error) {
      console.warn('[pumai] error →', error.message);
      return null;
    }
    if (!data || typeof data !== 'object') return null;
    if (data.error) return null;
    return data;
  } catch (e) {
    console.warn('[pumai] excepción →', e.message);
    return null;
  }
}

export async function checkOrientationHealth() {
  if (!isSupabaseConfigured) return { ok: false, reason: 'not_configured' };
  try {
    const { error } = await supabase.functions.invoke(ORIENTATION_FUNCTION, {
      body: { ping: true },
    });
    return { ok: !error, reason: error?.message };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
}
