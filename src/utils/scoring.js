// =============================================================
// AURA — Lógica de cálculo del resultado
// Transparente y trazable. Sin terminología clínica.
// =============================================================

import { LEVEL_THRESHOLDS, LEVEL_LABELS } from './constants.js';
import { DIMENSIONS } from '../data/fallbackQuestions.js';

const LIKERT_MAX = 4;

/**
 * Para cada respuesta, normaliza a 0..1 considerando si la pregunta
 * está marcada como inversa (positiva).
 *  - Pregunta negativa (alto = malestar):    valor / 4
 *  - Pregunta positiva (alto = bienestar):   (4 - valor) / 4
 *
 * El resultado normalizado SIEMPRE representa "intensidad de atención
 * requerida" (0 = bajo nivel, 1 = atención prioritaria).
 */
export function normalizeAnswer(question, rawValue) {
  const v = Math.max(0, Math.min(LIKERT_MAX, Number(rawValue)));
  return question.is_reverse_scored ? (LIKERT_MAX - v) / LIKERT_MAX : v / LIKERT_MAX;
}

export function classifyLevel(percent) {
  if (percent <= LEVEL_THRESHOLDS.bajo.max)        return 'bajo';
  if (percent <= LEVEL_THRESHOLDS.moderado.max)    return 'moderado';
  return 'prioritario';
}

/**
 * Calcula el resultado completo a partir de:
 *  - questions: array con { id, dimension, is_reverse_scored }
 *  - answers:   { [questionId]: 0..4 }
 */
export function computeResult(questions, answers) {
  // Acumula por dimensión
  const byDim = Object.create(null);
  for (const dim of DIMENSIONS) {
    byDim[dim.id] = { sum: 0, n: 0 };
  }

  let totalSum = 0, totalN = 0;
  const normalizedById = {};

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === undefined || raw === null) continue;
    const norm = normalizeAnswer(q, raw);
    normalizedById[q.id] = norm;

    if (!byDim[q.dimension]) byDim[q.dimension] = { sum: 0, n: 0 };
    byDim[q.dimension].sum += norm;
    byDim[q.dimension].n += 1;

    totalSum += norm;
    totalN += 1;
  }

  // Promedio por dimensión → score 0..100
  const dimensions = {};
  for (const [dimId, agg] of Object.entries(byDim)) {
    const score = agg.n ? Math.round((agg.sum / agg.n) * 100) : 0;
    dimensions[dimId] = {
      score,
      level: classifyLevel(score),
      level_label: LEVEL_LABELS[classifyLevel(score)],
      label: DIMENSIONS.find(d => d.id === dimId)?.label || dimId,
    };
  }

  const totalScore = totalN ? Math.round((totalSum / totalN) * 100) : 0;
  const generalLevel = classifyLevel(totalScore);

  // Áreas de mayor atención: dimensiones con nivel prioritario o moderado, ordenadas por score desc
  const topAttentionAreas = Object.entries(dimensions)
    .filter(([, d]) => d.level !== 'bajo')
    .sort((a, b) => b[1].score - a[1].score)
    .map(([id, d]) => ({ id, label: d.label, score: d.score, level: d.level }));

  return {
    total_score: totalScore,
    general_level: generalLevel,
    general_level_label: LEVEL_LABELS[generalLevel],
    dimensions,
    top_attention_areas: topAttentionAreas,
    normalized_by_question: normalizedById,
  };
}
