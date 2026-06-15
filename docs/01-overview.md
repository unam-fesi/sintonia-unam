# 01 · Overview del proyecto

## ¿Qué es AURA?

**AURA** es una plataforma web de orientación universitaria para el bienestar emocional de la comunidad estudiantil de la Universidad Nacional Autónoma de México.

Es **informativa, anónima y no diagnóstica**. Combina:

- Una autoevaluación breve (20 preguntas, 7-10 min)
- Resultados orientativos generados con apoyo de IA
- Recursos universitarios reales para canalización
- Herramientas de seguimiento (check-in semanal, diario, ruta de bienestar)
- Acompañante conversacional con IA y buddy anónimo
- Visualización en mapa, calendario y aventura comunitaria

## Misión

Acompañar a estudiantes universitarios en el reconocimiento, expresión y cuidado de su bienestar emocional, conectándolos con recursos institucionales sin etiquetas clínicas y respetando absolutamente su anonimato.

## Quiénes usan la plataforma

### Usuarios públicos (estudiantes y comunidad UNAM)
- **Sin código anónimo:** pueden hacer el test, ver recursos, acudir a apoyo, leer privacidad y emociones
- **Con código anónimo:** acceden a un "rincón" personal con check-ins, diario, ruta de bienestar, biblioteca, aventura, buddy, árboles adoptados y mapa personal

### Usuarios administrativos
- **Administrador:** control total
- **Analista:** métricas agregadas
- **Especialista:** detalle de sesiones individuales
- **Coordinador:** gestión de contenido
- **Docente:** kit pedagógico para acompañamiento de estudiantes

## Principios rectores

1. **Anonimato absoluto.** Ningún usuario público proporciona PII (nombre, correo, teléfono, número de cuenta).
2. **No clínico.** Las recomendaciones y orientaciones son educativas, nunca diagnósticas.
3. **Lenguaje cercano y respetuoso.** Tono empático, sin alarmismo.
4. **IA con responsabilidad.** Pum-AI redacta, no diagnostica. Hay rate limits y guardrails.
5. **Datos protegidos.** Row Level Security (RLS), hashes con salt, logs auditados.
6. **Comunidad primero.** Las funciones de aventura, buddy, árboles, eventos refuerzan pertenencia.

## Tecnologías

- **Frontend:** React 18 + Vite, sin framework UI pesado, CSS variables, componentes propios
- **Backend:** Supabase (Postgres + Auth + Edge Functions Deno)
- **IA:** Google Gemini (gemini-2.5-flash) vía Edge Functions
- **Hosting:** GitHub Pages (estático)
- **Mapa:** Leaflet + OpenStreetMap

## Identidad visual

- **Paleta institucional:** azul marino UNAM (#10243E) + dorado (#C9A227)
- **Acentos psicológicos:** salvia (calma), coral (cercanía), lavanda (introspección)
- **Tipografía:** Source Serif 4 (títulos) + Inter (texto)
- **Mascota:** Pum-AI (asistente conversacional)
- **Background animado:** "marea de acuarela" con blobs lavanda/salvia/oro/coral en movimiento permanente
