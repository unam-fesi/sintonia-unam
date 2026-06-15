// =============================================================
// AURA — 20 preguntas fallback
// Se usan si la BD no tiene preguntas activas configuradas.
// 5 dimensiones × 4 preguntas = 20 reactivos.
//
// Escala Likert 0..4:
//   0 = Nunca · 1 = Casi nunca · 2 = Algunas veces ·
//   3 = Frecuentemente · 4 = Casi siempre
//
// is_reverse_scored = true cuando la pregunta es POSITIVA
// (puntaje alto = bienestar). En esos casos, en utils/scoring.js
// se invierte: respuesta_invertida = 4 - respuesta.
// =============================================================

export const DIMENSIONS = [
  { id: 'estado_emocional',    label: 'Estado emocional' },
  { id: 'estres_academico',    label: 'Estrés académico' },
  { id: 'sueno_descanso',      label: 'Sueño y descanso' },
  { id: 'apoyo_social',        label: 'Convivencia y apoyo social' },
  { id: 'motivacion_pertenencia', label: 'Motivación y pertenencia' },
];

export const FALLBACK_QUESTIONS = [
  // ----- 1. Estado emocional -----
  { id: 'q01', sort_order: 1, dimension: 'estado_emocional', is_reverse_scored: false,
    question_text: 'En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?' },
  { id: 'q02', sort_order: 2, dimension: 'estado_emocional', is_reverse_scored: false,
    question_text: '¿Has sentido nervios o preocupación que te cuesta calmar?' },
  { id: 'q03', sort_order: 3, dimension: 'estado_emocional', is_reverse_scored: true,
    question_text: '¿Has logrado disfrutar momentos pequeños de tu día a día?' },
  { id: 'q04', sort_order: 4, dimension: 'estado_emocional', is_reverse_scored: true,
    question_text: '¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?' },

  // ----- 2. Estrés académico -----
  { id: 'q05', sort_order: 5, dimension: 'estres_academico', is_reverse_scored: false,
    question_text: '¿Has sentido que tus actividades académicas o personales te rebasan?' },
  { id: 'q06', sort_order: 6, dimension: 'estres_academico', is_reverse_scored: false,
    question_text: '¿Te ha costado concentrarte al estudiar o atender tus clases?' },
  { id: 'q07', sort_order: 7, dimension: 'estres_academico', is_reverse_scored: true,
    question_text: '¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?' },
  { id: 'q08', sort_order: 8, dimension: 'estres_academico', is_reverse_scored: true,
    question_text: '¿Has podido afrontar exámenes o entregas con relativa calma?' },

  // ----- 3. Sueño y descanso -----
  { id: 'q09', sort_order: 9, dimension: 'sueno_descanso', is_reverse_scored: true,
    question_text: '¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?' },
  { id: 'q10', sort_order: 10, dimension: 'sueno_descanso', is_reverse_scored: true,
    question_text: '¿Has mantenido un horario de sueño relativamente constante?' },
  { id: 'q11', sort_order: 11, dimension: 'sueno_descanso', is_reverse_scored: false,
    question_text: '¿Te has despertado cansado(a) o con poca energía?' },
  { id: 'q12', sort_order: 12, dimension: 'sueno_descanso', is_reverse_scored: false,
    question_text: '¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?' },

  // ----- 4. Convivencia y apoyo social -----
  { id: 'q13', sort_order: 13, dimension: 'apoyo_social', is_reverse_scored: true,
    question_text: '¿Has contado con alguien con quien hablar cuando lo necesitas?' },
  { id: 'q14', sort_order: 14, dimension: 'apoyo_social', is_reverse_scored: true,
    question_text: '¿Has compartido tiempo con familiares o amistades que te hacen bien?' },
  { id: 'q15', sort_order: 15, dimension: 'apoyo_social', is_reverse_scored: false,
    question_text: '¿Te has sentido solo(a) o con poca conexión con quienes te rodean?' },
  { id: 'q16', sort_order: 16, dimension: 'apoyo_social', is_reverse_scored: false,
    question_text: '¿Has evitado actividades sociales que antes disfrutabas?' },

  // ----- 5. Motivación y pertenencia -----
  { id: 'q17', sort_order: 17, dimension: 'motivacion_pertenencia', is_reverse_scored: true,
    question_text: '¿Has sentido motivación para participar en tus actividades universitarias?' },
  { id: 'q18', sort_order: 18, dimension: 'motivacion_pertenencia', is_reverse_scored: true,
    question_text: '¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?' },
  { id: 'q19', sort_order: 19, dimension: 'motivacion_pertenencia', is_reverse_scored: true,
    question_text: '¿Te has sentido parte de tu comunidad universitaria?' },
  { id: 'q20', sort_order: 20, dimension: 'motivacion_pertenencia', is_reverse_scored: false,
    question_text: '¿Has perdido interés o entusiasmo por metas que antes te importaban?' },
];

export const LIKERT_OPTIONS = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Casi nunca' },
  { value: 2, label: 'Algunas veces' },
  { value: 3, label: 'Frecuentemente' },
  { value: 4, label: 'Casi siempre' },
];
