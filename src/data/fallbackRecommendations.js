// =============================================================
// AURA — Catálogo base de recomendaciones
// Estructura: { dimension, level, title, description }
// level: 'bajo' | 'moderado' | 'prioritario'
// Se utilizan si no hay conexión con Supabase / Gemini.
// =============================================================

export const FALLBACK_RECOMMENDATIONS = [
  // -------- Estado emocional --------
  { dimension: 'estado_emocional', level: 'bajo',
    title: 'Sigue cultivando tus rutinas de bienestar',
    description: 'Tus respuestas sugieren un buen equilibrio emocional. Mantener pequeñas pausas, gratitud diaria o momentos de movimiento te ayudará a sostenerlo.' },
  { dimension: 'estado_emocional', level: 'moderado',
    title: 'Espacio para reconocer tus emociones',
    description: 'Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva.' },
  { dimension: 'estado_emocional', level: 'prioritario',
    title: 'Acércate a un servicio universitario de orientación',
    description: 'Sentir tristeza o nervios sostenidos amerita acompañamiento. Te recomendamos contactar los servicios de orientación psicológica de tu plantel.' },

  // -------- Estrés académico --------
  { dimension: 'estres_academico', level: 'bajo',
    title: 'Tu carga académica parece manejable',
    description: 'Conserva tus rutinas de organización. Una agenda y bloques de estudio cortos pueden sostener este ritmo.' },
  { dimension: 'estres_academico', level: 'moderado',
    title: 'Pequeños ajustes para liberar presión',
    description: 'Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora de estudio.' },
  { dimension: 'estres_academico', level: 'prioritario',
    title: 'Considera apoyo académico y orientación',
    description: 'Sentirte rebasado(a) puede afectar tu desempeño y tu salud. Las tutorías académicas y la orientación universitaria pueden ser un buen primer paso.' },

  // -------- Sueño y descanso --------
  { dimension: 'sueno_descanso', level: 'bajo',
    title: 'Tu descanso es un recurso valioso',
    description: 'Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia.' },
  { dimension: 'sueno_descanso', level: 'moderado',
    title: 'Refuerza tu higiene del sueño',
    description: 'Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía.' },
  { dimension: 'sueno_descanso', level: 'prioritario',
    title: 'El descanso necesita atención',
    description: 'Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios para descartar causas atendibles.' },

  // -------- Apoyo social --------
  { dimension: 'apoyo_social', level: 'bajo',
    title: 'Tu red de apoyo te acompaña',
    description: 'Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti.' },
  { dimension: 'apoyo_social', level: 'moderado',
    title: 'Reconecta con personas de confianza',
    description: 'Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias universitarias también ayudan.' },
  { dimension: 'apoyo_social', level: 'prioritario',
    title: 'Buscar compañía es un acto de cuidado',
    description: 'Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas universitarias y, si lo prefieres, a grupos de orientación.' },

  // -------- Motivación y pertenencia --------
  { dimension: 'motivacion_pertenencia', level: 'bajo',
    title: 'Tu motivación es un buen aliado',
    description: 'Conserva los proyectos y actividades que te dan propósito. Compartir lo que disfrutas con otros lo amplifica.' },
  { dimension: 'motivacion_pertenencia', level: 'moderado',
    title: 'Reactiva pequeños propósitos',
    description: 'Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus.' },
  { dimension: 'motivacion_pertenencia', level: 'prioritario',
    title: 'Espacios universitarios para reencontrarte',
    description: 'Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia. Acércate a las actividades comunitarias de tu facultad.' },
];

// Helper para obtener todas las recomendaciones aplicables a un resultado
export function getRecommendationsFor(dimensions) {
  return FALLBACK_RECOMMENDATIONS.filter(r =>
    dimensions[r.dimension]?.level === r.level
  );
}
