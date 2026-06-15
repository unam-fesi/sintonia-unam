// =============================================================
// AURA — Lecturas/escrituras a Supabase
// Cae a datos fallback si la BD no está configurada.
// =============================================================

import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';
import { FALLBACK_QUESTIONS } from '../data/fallbackQuestions.js';
import { FALLBACK_RESOURCES } from '../data/fallbackResources.js';
import { FALLBACK_RECOMMENDATIONS } from '../data/fallbackRecommendations.js';

export async function fetchQuestions() {
  if (!isSupabaseConfigured) return FALLBACK_QUESTIONS;
  const { data, error } = await supabase
    .from('questions')
    .select('id, dimension, question_text, is_reverse_scored, sort_order')
    .eq('active', true)
    .order('sort_order');
  if (error || !data || data.length === 0) {
    if (error) console.warn('[supabase] questions →', error.message);
    return FALLBACK_QUESTIONS;
  }
  return data;
}

export async function fetchResources() {
  if (!isSupabaseConfigured) return FALLBACK_RESOURCES;
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('active', true)
    .order('name');
  if (error || !data || data.length === 0) {
    if (error) console.warn('[supabase] resources →', error.message);
    return FALLBACK_RESOURCES;
  }
  return data;
}

export async function fetchRecommendations() {
  if (!isSupabaseConfigured) return FALLBACK_RECOMMENDATIONS;
  const { data, error } = await supabase
    .from('recommendations')
    .select('dimension, level, title, description')
    .eq('active', true);
  if (error || !data || data.length === 0) {
    if (error) console.warn('[supabase] recommendations →', error.message);
    return FALLBACK_RECOMMENDATIONS;
  }
  return data;
}

// ---------------- Persistencia anónima ----------------
// Generamos el UUID en el cliente para no necesitar SELECT después del INSERT
// (las RLS bloquean la lectura pública de sesiones).
export async function saveSession(payload) {
  if (!isSupabaseConfigured) return { saved: false, id: null };
  const id = (window.crypto && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'sin-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  const { error } = await supabase
    .from('assessment_sessions')
    .insert({ id, ...payload });
  if (error) {
    console.warn('[supabase] saveSession →', error.message);
    return { saved: false, error: error.message, id };
  }
  return { saved: true, id };
}

export async function saveAnswers(sessionId, rows) {
  if (!isSupabaseConfigured || !sessionId) return { saved: false };
  const payload = rows.map(r => ({ session_id: sessionId, ...r }));
  const { error } = await supabase.from('assessment_answers').insert(payload);
  if (error) {
    console.warn('[supabase] saveAnswers →', error.message);
    return { saved: false, error: error.message };
  }
  return { saved: true };
}

// ---------------- Conexión ----------------
export async function checkSupabaseHealth() {
  if (!isSupabaseConfigured) return { ok: false, reason: 'not_configured' };
  try {
    const { error } = await supabase.from('questions').select('id', { head: true, count: 'exact' });
    if (error) return { ok: false, reason: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
}
