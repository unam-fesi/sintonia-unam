// =============================================================
// AURA — Orquesta el flujo de evaluación
// 1. Calcula resultado local (transparente).
// 2. Persiste sesión + respuestas (anónimas) en Supabase.
// 3. Pide a la Edge Function una orientación amigable con Gemini.
// 4. Devuelve un objeto consolidado para la UI.
// =============================================================

import { computeResult } from '../utils/scoring.js';
import { generateAnonymousCode } from '../utils/anonymousCode.js';
import { saveSession, saveAnswers, fetchRecommendations } from './supabaseService.js';
import { generateOrientation } from './geminiService.js';
import { TEST_VERSION } from '../utils/constants.js';

export async function submitAssessment({ questions, answers, anonymousCode }) {
  // 1. Cálculo local
  const result = computeResult(questions, answers);
  const code = anonymousCode || generateAnonymousCode();

  // 2. Persistir sesión (sin PII)
  const sessionPayload = {
    anonymous_code: code,
    test_version: TEST_VERSION,
    total_score: result.total_score,
    general_level: result.general_level,
    dimension_scores: result.dimensions,
    top_attention_areas: result.top_attention_areas,
  };
  const { id: sessionId } = await saveSession(sessionPayload);

  // 3. Persistir respuestas
  if (sessionId) {
    const rows = Object.entries(answers).map(([questionId, value]) => ({
      question_id: questionId,
      answer_value: Number(value),
      normalized_value: result.normalized_by_question[questionId] ?? null,
    }));
    await saveAnswers(sessionId, rows);
  }

  // 4. Orientación Gemini (con catálogo controlado)
  const recommendations = await fetchRecommendations();
  const aiPayload = await generateOrientation({
    session_id: sessionId,
    test_version: TEST_VERSION,
    general_level: result.general_level,
    dimensions: result.dimensions,
    top_attention_areas: result.top_attention_areas,
    recommendation_catalog: recommendations.slice(0, 30), // limitar
  });

  return {
    session_id: sessionId || null,
    anonymous_code: code,
    created_at: new Date().toISOString(),
    ...result,
    ai: aiPayload || null,
    base_recommendations: recommendations,
  };
}
