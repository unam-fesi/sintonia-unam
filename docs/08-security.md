# 08 · Seguridad

AURA atiende a estudiantes que pueden estar pasando por momentos vulnerables. La seguridad y privacidad no son opcionales — son requisito ético.

## Principios

1. **Cero PII en flujos públicos.** Ningún usuario público (estudiante) ingresa nombre, correo, teléfono, número de cuenta. El identificador único es un código alfanumérico de 8 caracteres (`SIN-XXX-9999`).
2. **Hash en lugar de IP.** Las IPs se almacenan como SHA-256 con salt secreto, nunca en claro. Sólo guardamos los primeros 2 octetos como `ip_prefix` para análisis agregado.
3. **Service-side everything sensible.** API keys de Gemini, hashing, borrado en cascada, creación de usuarios — todo en Edge Functions, jamás en el cliente.
4. **RLS en cada tabla.** Sin excepciones. Las Edge Functions usan `service_role` solo cuando es indispensable.
5. **Auditoría inmutable.** Toda acción admin se persiste en `admin_audit_log` con before/after snapshots.

## Modelo de amenazas considerado

### Amenaza: Identificación de un estudiante

**Defensa:**
- Sin PII en `assessment_sessions`, `weekly_checkins`, `student_journal`, `chat_messages`, etc.
- El código anónimo NO se asocia con email, número de cuenta, ni dispositivo persistente.
- IPs hasheadas con salt secreto; ni el admin con SQL editor puede revertir el hash.
- `view_anonymous_kpis` y vistas similares agregan a nivel facultad/carrera, nunca individual.

### Amenaza: Inyección de prompts a Pum-AI

**Defensa:**
- System prompts blindados en cada Edge Function (jamás en el cliente).
- Detección de crisis con regex local — si match, NO llama a Gemini, responde con plantilla de emergencia. Esto previene que un atacante "envenene" el contexto.
- `safetySettings` de Gemini configurados a `BLOCK_LOW_AND_ABOVE` para sexualidad explícita y peligro.
- Defensa post-IA en `buddy-ai-reply`: regex que limpia si Gemini suelta nombre/carrera/facultad por accidente.

### Amenaza: Spam masivo de cuentas anónimas

**Defensa:**
- Rate limit en `anon-auth`: max 5 registros por IP-hash en 24h → auto-bloquea en `ip_blocklist`.
- Validación de formato del código (`SIN-[A-Z]{3}-\d{4}`).
- En el admin: vista `view_suspicious_ips` lista IPs con más de 5 registros para revisión manual.
- Todas las llamadas a Edge Functions loggean en `ip_log`.

### Amenaza: Abuso del chat IA (consumo de tokens)

**Defensa:**
- `chat-companion`: 30 mensajes/hora por código, 200 llamadas/día por IP-hash.
- `buddy-ai-reply`: 30 msgs/hora por par, 200 llamadas/día por IP, cooldown 1.5s.
- Detección de crisis corto-circuita el chat y NO consume tokens.
- `view_pumai_cost` en admin muestra costos en tiempo real.

### Amenaza: Acceso no autorizado al panel admin

**Defensa:**
- Login con email + password vía Supabase Auth (con MFA opcional).
- JWT verificado en cada Edge Function privilegiada.
- RLS con `has_admin_access(auth.uid())` en cada tabla sensible.
- Roles granulares: aunque te robas la sesión de un docente, no puedes ver detalle de sesiones individuales.
- Audit log inmutable: cualquier acción queda registrada.

### Amenaza: Adivinanza de códigos anónimos ajenos

**Defensa:**
- Códigos generados con `crypto.getRandomValues` (24 letras × 8 dígitos = ~10^11 combinaciones).
- Si el usuario eligió password, se requiere para `login` + `history`.
- Rate limit: 10 intentos fallidos/hora por IP-hash.
- Mensaje genérico "código o contraseña incorrectos" — no filtra si el código existe.

### Amenaza: Exfiltración de datos vía SQL injection

**Defensa:**
- supabase-js usa parámetros tipados, sin string concat.
- Edge Functions también pasan params, nunca templating de SQL crudo.
- RLS limita lo que cada cliente puede ver, incluso si bypasean validaciones cliente.

### Amenaza: Datos de un estudiante visibles a otros

**Defensa:**
- `buddy_messages` RLS: solo participantes del par pueden leer.
- `student_journal` RLS: solo el código dueño + admin puede leer.
- Las realtime subs son filtradas por `pair_id` (postgres_changes filter).

## Capas defensivas concretas

### 1. Frontend
- CSP estricta en index.html (script-src 'self' + cloudflare cdn).
- Sanitización de input en chat (max 1000 chars, escape HTML al renderizar).
- `prefers-reduced-motion` respetado.
- Nada de `dangerouslySetInnerHTML` con data del usuario.

### 2. Edge Functions
- Try/catch global: nunca devuelven 5xx vacío con stack trace al cliente.
- Validación de input con regex/typeof antes de tocar BD.
- Tolerancia a tablas faltantes (graceful degradation).
- CORS abierto pero `--no-verify-jwt` solo en funciones públicas; las admin verifican manualmente.

### 3. Base de datos
- RLS en TODAS las tablas (verificado en `pg_tables`).
- Roles: `anon` solo escribe lo suyo, `authenticated` solo lee lo suyo o lo que el rol admin permite.
- Triggers de auditoría en tablas administrativas.
- `service_role` solo desde Edge Functions, jamás expuesto al cliente.

### 4. Infraestructura
- Backups automáticos de Supabase (point-in-time recovery).
- HTTPS obligatorio (GitHub Pages + Supabase ya lo dan).
- Secrets nunca commiteados (`.env.local` en `.gitignore`).

## Política de retención

- `assessment_sessions`: indefinido (datos agregados son valiosos para investigación). Sin PII.
- `chat_messages`, `buddy_messages`: borrables por el usuario en cualquier momento desde su rincón. Borrado en cascada al eliminar cuenta anónima.
- `ip_log`: rotar cada 90 días automáticamente (job recomendado).
- `admin_audit_log`: nunca se borra (compliance).

## Recomendaciones de operación

- **Rotar `HASH_SALT`** anualmente (requiere migración de hashes existentes — planificar).
- **Rotar `service_role` y `GEMINI_API_KEY`** si hay sospecha de leak.
- **Habilitar MFA** para cuentas con rol `admin`.
- **Revisar `view_suspicious_ips`** al menos semanalmente.
- **Revisar `admin_audit_log`** cada vez que un staff cambia de rol o salga del programa.

## Reporte de vulnerabilidades

Si encuentras una vulnerabilidad, NO abras un issue público. Contacta directo a `seguridad@aura.iztacala.unam.mx` (o el canal definido por la coordinación).

## Compliance

- **No clínico**: la plataforma orienta, no diagnostica. Esto debe quedar explícito en `Privacy.jsx`, `Consent.jsx` y en la home.
- **Consentimiento explícito**: el flujo del test pasa por `/consentimiento` con checkbox antes de continuar.
- **Derecho a borrado**: el usuario puede borrar todo desde su rincón. Si no recuerda su código, puede contactar al programa con prueba razonable y el admin lo borra.
- **Sin transferencia de datos**: los servicios de Gemini procesan los mensajes pero no se entrenan con ellos (configurado en Google Cloud).
