# 04 · Base de datos

AURA corre sobre **Postgres 15** vía Supabase, con **Row Level Security (RLS)** habilitada en todas las tablas. Las migraciones se aplican como una secuencia de "waves" (`wave-A` a `wave-I`) más patches para `admin-features-migration.sql`.

## Mapa por dominio

### Núcleo del test
- **`assessment_questions`** — Banco de preguntas (id, dimensión, texto, orden, activa). Editable por admin/coordinador.
- **`assessment_dimensions`** — Catálogo de las 7 dimensiones (Ánimo, Energía, Conexión, Estrés académico, Sueño, Hábitos, Pertenencia).
- **`assessment_sessions`** — Cada test completado (anonymous_code, scores, dimension_scores, top_attention_areas, generated_text, recommendations, created_at).
- **`assessment_feedback`** — Feedback "¿te fue útil?" post-test (👍/👎 + texto opcional).

### Recomendaciones y recursos
- **`actividades`** — Microhábitos/ejercicios sugeribles.
- **`recomendaciones`** — Plantillas de recomendaciones (texto, dimensión, nivel, FK a `actividades`).
- **`resources`** — Catálogo de servicios UNAM (categoría, campus, horarios, contacto, lat/lng para mapa).
- **`content_blocks`** — Texto editable: home, footer, copy del test, FAQ. Versionado básico (key, value, updated_by, updated_at).

### Identidad anónima
- **`student_profiles`** — Perfil opcional asociado a `anonymous_code` (password_hash SHA-256+salt, faculty, career, semester, last_seen). Sin PII.
- **`anon_passwords`** — (legado, fusionado en student_profiles).
- **`student_achievements`** — Insignias desbloqueadas.

### Seguimiento del estudiante
- **`weekly_checkins`** — Check-in semanal (mood, energy, stress, social, free_text, week_iso).
- **`student_journal`** — Entradas de diario (entry, emotion_tag, suggestion_book_id).
- **`wellness_routes`** — Plan de 21 días generado por Pum-AI (json con días/hábitos).
- **`wellness_route_progress`** — Avance por día (route_id, day, completed_at, note).
- **`student_library`** — Items leídos/guardados de la biblioteca.

### Comunidad
- **`buddy_queue`** — Cola de espera para emparejamiento (anonymous_code, joined_at). Realtime ON.
- **`buddy_pairs`** — Pares activos (code_a, code_b, active, is_ai_buddy, paired_at).
- **`buddy_messages`** — Mensajes del chat buddy (pair_id, sender_code, message, created_at). Realtime ON.
- **`tree_plantings`** — Árboles plantados (anonymous_code, species, planted_at).
- **`tree_caretakers`** — Quién cuida qué árbol.
- **`tree_care_log`** — Log de acciones (regar, podar, etc.).

### Companion (chat IA)
- **`chat_sessions`** — Conversaciones del usuario con Pum-AI.
- **`chat_messages`** — Turnos individuales (role, content, tokens_in/out).

### Eventos y comunidad
- **`wellness_events`** — Talleres, círculos, webinars (title, date, location, online_url).
- **`event_rsvp`** — RSVPs anónimos.
- **`webinars`** — Calendario de webinars con detalles extra.

### Gamificación / aventura
- **`game_clues`** — Pistas de la aventura comunitaria.
- **`game_events`** — Eventos disparados por descubrir pistas.
- **`game_progress`** — Avance por usuario.

### Administración
- **`admin_users`** — Usuarios staff (auth.uid → role enum).
- **`admin_audit_log`** — Log inmutable de acciones admin (admin_email, action, entity, entity_id, before_data, after_data).
- **`session_notes`** — Notas privadas que un especialista puede dejar sobre una sesión.
- **`specialists`** — Catálogo de especialistas UNAM (sin PII).
- **`ai_insights`** — Insights generados por Pum-AI sobre datos agregados (cacheados).
- **`system_config`** — Feature flags y configuración global (key/value json).

### Seguridad / infra
- **`ip_log`** — Hash de IP por endpoint (ip_hash, ip_prefix, endpoint, anonymous_code, created_at). NUNCA almacena IP en claro.
- **`ip_blocklist`** — Lista de hashes bloqueados.
- **`anon_passwords`** — Hashes de password de cuentas anónimas (legado).

## Vistas (KPIs y reporting)

- **`view_anonymous_kpis`** — KPIs agregados de actividad anónima.
- **`view_cohorts_monthly`** — Cohortes mensuales.
- **`view_completion_funnel`** — Funnel home → test → resultado → registro.
- **`view_dimension_heatmap`** — Heatmap de dimensiones por carrera/campus.
- **`view_dimension_impact`** — Impacto relativo de cada dimensión en nivel general.
- **`view_dimension_timeline`** — Evolución temporal por dimensión.
- **`view_faculty_distribution`** — Distribución por facultad.
- **`view_feedback_summary`** — Agregado de 👍/👎 + temas.
- **`view_hourly_distribution`** — Heatmap por hora del día.
- **`view_pumai_cost`** y **`view_pumai_metrics`** — Costos y métricas de uso de Gemini.
- **`view_question_variance`** — Varianza de respuestas por pregunta (para detectar items débiles).
- **`view_sessions_timeline`** — Timeline de sesiones.
- **`view_student_activity`** — Actividad por código anónimo.
- **`view_suspicious_ips`** — IPs con más de 5 registros en 24h.
- **`view_trees_with_care`** — Árboles + último cuidado.
- **`view_upcoming_events`** y **`view_upcoming_webinars`** — Eventos próximos.

Las vistas se consumen desde el panel admin (`/admin/stats`, `/admin/insights`, `/admin/operaciones`).

## Row Level Security — patrón general

Todas las tablas siguen una de estas estrategias:

### Tablas de usuarios anónimos
- **INSERT** abierto a `anon` (cualquiera puede crear su check-in, journal, etc.).
- **SELECT** restringido por `anonymous_code = current_setting('request.jwt.claim.code')` o vía Edge Function con `service_role`.
- **UPDATE/DELETE** restringido al propio code o admin.

### Tablas de admin
- **SELECT/INSERT/UPDATE/DELETE** restringidos por `auth.uid()` con función helper `has_admin_access(uid)` o `has_role(uid, role)`.
- Roles: `admin > coordinador, analista, especialista, docente`.

### Tablas de seguridad
- `ip_log` e `ip_blocklist`: **service_role only** (escritas por Edge Functions). Admin sólo lee vía vistas.
- `admin_audit_log`: insertado por triggers o Edge Functions, sólo lectura para admin.

## Helpers SQL importantes

```sql
-- Verifica si un uid tiene cualquier rol admin
create or replace function public.has_admin_access(uid uuid)
returns boolean language sql stable as $$
  select exists (select 1 from public.admin_users where user_id = uid)
$$;

-- Verifica un rol específico
create or replace function public.has_role(uid uuid, target_role text)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.admin_users
    where user_id = uid and role = target_role
  )
$$;
```

## Secuencia de migraciones

Aplicar en este orden (todas idempotentes con `if not exists`):

1. `wave-A-migration.sql` — Núcleo: assessment, recursos, profiles anónimos, ip_log, ip_blocklist, admin_users.
2. `wave-B-seed.sql` — Seed de check-ins, journal, ruta de bienestar.
3. `wave-C-seed.sql` — Seed de companion, biblioteca, emociones, frase del día.
4. `wave-D-migration.sql` + `wave-D-seed.sql` — Mapa, árboles, buddy, calendario, aventura.
5. `wave-E-migration.sql` + `wave-E-seed.sql` — Admin avanzado: insights, operación, programa, kit docente.
6. `wave-F-content-blocks.sql` — Tabla `content_blocks` para contenido editable.
7. `wave-G-anonymous-activity.sql` — Vistas y tablas de actividad anónima detallada.
8. `wave-H-ai-buddy.sql` — Soporte para buddy IA (`is_ai_buddy` en `buddy_pairs`).
9. `wave-I-webinars.sql` — Tabla webinars + vistas + rate limits adicionales.
10. `admin-features-migration.sql` + `admin-migration.sql` — Patches de admin.
11. `sounds-seed.sql` — Datos de los 10 sonidos relajantes.
12. `buddy-realtime-enable.sql` — Habilitar realtime en `buddy_messages` y `buddy_queue`.

## Backups y borrado

- **Borrado en cascada anónimo**: la Edge Function `admin-delete-anonymous` borra en orden: `tree_care_log` → `tree_caretakers` → `student_journal` → `weekly_checkins` → `student_achievements` → `wellness_route_progress` → `wellness_routes` → `student_library` → `event_rsvp` → `buddy_messages` → `buddy_pairs` → `buddy_queue` → `chat_messages` → `chat_sessions` → `assessment_sessions` → `student_profiles`. Todo loggeado en `admin_audit_log`.
- **Backups**: Supabase hace point-in-time recovery automático. Para exportar agregados, usar `/admin/exportar` (CSVs sin PII).
