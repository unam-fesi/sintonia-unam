# 02 · Arquitectura

## Diagrama de alto nivel

```
┌──────────────────────────────────────────────────────────────────┐
│                  GitHub Pages (estático)                         │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  React 18 + Vite SPA                                      │   │
│  │  - Rutas públicas (Home, Test, Resultado, Recursos…)      │   │
│  │  - Rincón anónimo (con código)                            │   │
│  │  - Panel /admin (5 roles)                                 │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                       │ (HTTPS, anon key)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                       Supabase                                   │
│  ┌─────────────┐   ┌────────────────┐   ┌────────────────────┐   │
│  │  Postgres   │   │  Auth           │  │  Edge Functions    │   │
│  │  + RLS      │   │  (admin login) │  │  (Deno, 11 fns)    │   │
│  └─────────────┘   └────────────────┘   └────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                       │ (server-to-server)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                Google Gemini API                                 │
│            (gemini-2.5-flash, vía Edge Function)                 │
└──────────────────────────────────────────────────────────────────┘
                       │
                       ▼
                 OpenStreetMap (tiles · Leaflet CDN)
```

## Stack detallado

### Frontend
- **React 18.3** con hooks (sin Redux, sin Next.js)
- **Vite 5** como bundler, con `manualChunks` para `vendor-react` y `vendor-supabase`
- **React Router DOM 6** con `lazy()` y `Suspense` para code splitting
- **CSS variables** centralizadas en `src/styles/theme.css`; sin Tailwind, sin styled-components
- **Leaflet** cargado por CDN dinámicamente (hook `useLeaflet`) sólo en `/mapa`
- **createPortal** para drawers móviles que evitan stacking-context conflicts

### Backend
- **Supabase Postgres 15** con RLS habilitada en cada tabla
- **Supabase Auth** sólo para usuarios administrativos (email + contraseña)
- **Supabase Edge Functions** (Deno) para todo lo que no se puede ejecutar en el cliente:
  - Llamadas a Gemini (la API key vive en secretos del proyecto)
  - Hash de IP con salt
  - Operaciones privilegiadas (creación/borrado de usuarios, insights agregados)
- **Storage** no se usa (no hay archivos del usuario)

### IA
- **Gemini 2.5 Flash** (`gemini-2.5-flash`) vía Edge Function
- `thinkingConfig.thinkingBudget = 0` para evitar que el "thinking" consuma el presupuesto de salida
- `responseSchema` cuando se necesita JSON estricto (orientación, sugerencias, ruta de bienestar)
- Detección de crisis vía regex antes de tocar la API (corto-circuito que muestra recursos de emergencia sin gastar tokens)
- Rate limits por IP (hashed) y por código anónimo

### Hosting
- **GitHub Pages** sobre rama `gh-pages` (script `npm run deploy` con `gh-pages -d dist`)
- `vite.config.js` define `base: '/aura-fesi/'` para que los assets resuelvan bien

### Mapa
- **Leaflet 1.9** + **OpenStreetMap** tiles
- Markers personalizados (oro/coral/azul) según tipo de recurso
- Popups con CTA "Ver detalle"

## Estructura de carpetas

```
aura-fesi/
├── docs/                    ← Esta documentación
├── public/
│   └── data/                ← Sonidos relajantes (seed)
├── src/
│   ├── App.jsx              ← Routing + layout
│   ├── main.jsx             ← Mount + BrowserRouter
│   ├── pages/               ← 32 páginas (públicas + admin)
│   ├── components/          ← Componentes reutilizables
│   ├── services/            ← Lógica de I/O
│   │   ├── supabaseService.js   ← CRUD + queries
│   │   ├── geminiService.js     ← Llamadas a Edge Functions
│   │   ├── authService.js       ← Login admin + sesión
│   │   ├── auditService.js      ← Audit log helpers
│   │   └── assessmentService.js ← Lógica del test
│   ├── hooks/
│   │   ├── useStudent.js        ← Sesión anónima en sessionStorage
│   │   └── useLeaflet.js        ← Carga Leaflet por CDN
│   ├── config/
│   │   └── supabaseClient.js    ← createClient con anon key
│   ├── data/                ← Fallbacks (preguntas, recursos, recomendaciones)
│   ├── utils/               ← anonymousCode, scoring, constants
│   └── styles/              ← global.css + theme.css
├── vite.config.js
└── package.json
```

## Decisiones arquitectónicas clave

### 1. Anonimato como ciudadano de primera clase
Ningún flujo público requiere PII. El "código anónimo" es un identificador opaco generado por Edge Function (`anon-auth`) que el usuario guarda como bookmark. La contraseña, si se elige, se hashea con SHA-256 + salt en Edge Function antes de persistir.

### 2. RLS en todas las tablas
Cada tabla expuesta tiene políticas que filtran por `auth.uid()` (admin) o por código anónimo. Las Edge Functions usan `service_role` sólo cuando es indispensable (creación de usuarios, hash con secretos).

### 3. `content_blocks` para texto editable
Todo el copy que un coordinador puede querer ajustar (preguntas del test, descripciones de dimensiones, CTAs de la home) vive en una tabla `content_blocks` versionada, no hardcodeado en el JSX. Hay fallbacks locales (`src/data/fallback*.js`) para que la app funcione si Supabase está caído.

### 4. Roles + permisos granulares
Cinco roles (admin, analista, especialista, coordinador, docente) con ocho permisos atómicos. El componente `<RoleGuard requires={[...]} />` envuelve rutas y secciones del panel. Ver [06-roles-permissions.md](./06-roles-permissions.md).

### 5. Sin servidor propio
Todo el cómputo se delega a Edge Functions o al cliente. Esto baja costos, simplifica despliegue, pero exige cuidado con el tamaño del bundle (de ahí el code splitting agresivo).

### 6. UI flotante sobre "marea de acuarela"
El componente `WellnessBackground` renderiza un wash en gradiente animado + cinco blobs gigantes con `mix-blend-mode: multiply` y `blur(90px)`. Las cards usan `backdrop-filter: blur(12px)` para flotar sobre la marea sin perder legibilidad. En móviles bajamos blur y desactivamos dos blobs por performance.

## Flujos de datos representativos

### Flujo del test
```
Home → /consentimiento (acepta) → sessionStorage flag
     → /evaluacion (20 preguntas, sessionStorage de respuestas)
     → /resultado:
        1. Cliente calcula scores (utils/scoring.js)
        2. Llama Edge Fn `generate-orientation` con scores + dimensiones
        3. Edge Fn → Gemini → texto orientativo + recomendaciones
        4. Persiste sesión en `sesiones` (con código anónimo si existe)
        5. Muestra ResultCard + DimensionChart + ResourceCard[]
```

### Flujo de registro anónimo
```
Cualquier página → "Crear código anónimo"
     → Edge Fn `anon-auth` (op: create)
        - Genera código alfanumérico de 8 chars
        - Si hay password: hash SHA-256 + salt → `anon_passwords`
        - Inserta en `usuarios_anonimos`
     → Devuelve código → useStudent guarda en sessionStorage
     → Acceso a /mi-historia, /diario, /buddy, /aventura, /arboles, /ruta
```

### Flujo del companion (Pum-AI)
```
/companion → user envía mensaje
     → cliente: regex de crisis → si match, muestra emergencia, no llama IA
     → Edge Fn `chat-companion`:
        1. Verifica rate limit por IP hash + código
        2. Carga últimos N turnos del historial
        3. Llama Gemini con system prompt empático + historial
        4. Persiste turno en `companion_turns`
     → cliente renderiza respuesta
```

### Flujo del admin
```
/admin/login → Supabase Auth (email + password)
     → JWT con role custom claim
     → AdminLayout carga rol → RoleGuard filtra navegación
     → Cada sub-página (Stats, Insights, Operations…) verifica permisos
     → Acciones sensibles (delete user, config) requieren rol superior
     → Toda mutación se persiste en `audit_log`
```

## Performance

- Bundle inicial < 200 KB gzipped (sólo Home, Consent, Assessment, Results eager)
- Resto de páginas en chunks lazy (~20-50 KB cada uno)
- Leaflet sólo se carga cuando el usuario entra a `/mapa`
- `prefers-reduced-motion` desactiva animaciones del background y transiciones
- Imágenes y sonidos se sirven desde `public/` (cache de GitHub Pages)
