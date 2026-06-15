# 07 · Despliegue

Guía completa para levantar AURA de cero, ya sea en un proyecto Supabase nuevo o re-desplegando.

## Prerrequisitos

- Node 18+ y npm
- Cuenta de GitHub (para el repo y Pages)
- Cuenta de Supabase (free tier alcanza para empezar)
- API key de Google AI Studio (Gemini)
- CLI de Supabase: `npm install -g supabase` (o `brew install supabase/tap/supabase`)

## Paso 1 — Crear proyecto Supabase

1. Ir a https://app.supabase.com → New project.
2. Anotar:
   - **Project URL** (algo como `https://abcdefg.supabase.co`)
   - **anon (public) key** — para el cliente.
   - **service_role key** — para Edge Functions y SQL editor (NUNCA al cliente).
3. SQL Editor → ejecutar **en orden** los archivos de migración:
   ```
   wave-A-migration.sql
   wave-B-seed.sql
   wave-C-seed.sql
   wave-D-migration.sql
   wave-D-seed.sql
   wave-E-migration.sql
   wave-E-seed.sql
   wave-F-content-blocks.sql
   wave-G-anonymous-activity.sql
   wave-H-ai-buddy.sql
   wave-I-webinars.sql
   admin-migration.sql
   admin-features-migration.sql
   sounds-seed.sql
   buddy-realtime-enable.sql
   ```
   Todos son idempotentes (`if not exists`). Si alguno falla, el log dice cuál tabla.

## Paso 2 — Variables de entorno

### En Supabase Dashboard → Project Settings → Edge Functions → Secrets:

```
GEMINI_API_KEY=AIzaSy...      # tu key de Google AI Studio
GEMINI_MODEL=gemini-2.5-flash
HASH_SALT=<algo-random-largo-único>     # NUNCA usar el default en prod
```

### En tu `.env.local` (frontend, no se commitea):

```
VITE_SUPABASE_URL=https://abcdefg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

> El `anon key` es público por diseño — RLS lo bloquea de ver datos sensibles.

## Paso 3 — Desplegar Edge Functions

```bash
# Login en Supabase CLI
supabase login

# Linkear al proyecto
supabase link --project-ref <tu-project-ref>

# Desplegar todas (--no-verify-jwt porque el frontend público no tiene sesión)
for fn in generate-orientation chat-companion buddy-ai-reply anon-auth \
          generate-wellness-route journal-suggest suggest-questions \
          suggest-recommendations ai-insights admin-create-user \
          admin-delete-anonymous; do
  supabase functions deploy $fn --no-verify-jwt
done
```

> **Nota**: cada función debe vivir en `supabase/functions/<name>/index.ts`. El repo guarda los `.ts` en raíz; cópialos a la estructura correcta antes del deploy:
> ```bash
> for fn in *.ts; do
>   name=$(basename $fn .ts)
>   mkdir -p supabase/functions/$name
>   cp $fn supabase/functions/$name/index.ts
> done
> ```

## Paso 4 — Bootstrapear el primer admin

```sql
-- En Supabase Dashboard → Authentication → Users → "Add user" con tu email
-- Luego en SQL Editor:
INSERT INTO public.admin_users (user_id, email, role, full_name)
VALUES ('<el-uuid-del-user>', 'tu@email.com', 'admin', 'Tu Nombre');
```

A partir de aquí puedes crear los demás staff desde `/admin/usuarios`.

## Paso 5 — Frontend en GitHub Pages

```bash
# Clonar el repo (o tu fork)
git clone https://github.com/<tu-org>/aura-fesi.git
cd aura-fesi

# Instalar dependencias
npm install

# Configurar .env.local con tus credenciales (paso 2)

# Ajustar la base path en vite.config.js
# Si tu repo se llama distinto (ej. mi-sintonia), el build sirve en /mi-sintonia/
```

`vite.config.js`:
```js
const BASE = process.env.VITE_BASE_PATH || '/aura-fesi/';
```

Para dominio personalizado o root, exporta `VITE_BASE_PATH=/`.

```bash
# Build local para validar
npm run build
npm run preview   # abre en http://localhost:4173

# Deploy a GitHub Pages (rama gh-pages)
npm run deploy
```

`npm run deploy` corre `vite build && gh-pages -d dist`.

En GitHub → Settings → Pages → Source = `gh-pages` branch / root.

## Paso 6 — Verificar

1. Visita la URL pública (ej. `https://<usuario>.github.io/aura-fesi/`).
2. Test de smoke:
   - Hacer el test de 20 preguntas.
   - Llegar a resultado (verifica Gemini funciona).
   - Crear cuenta anónima desde "Mi rincón".
   - Entrar a `/companion` y enviar un mensaje (verifica chat-companion).
   - Entrar a `/buddy` con dos navegadores distintos (códigos distintos), uno se mete a la cola y el otro debería ver el toast "Alguien busca un buddy".
3. Login admin → verificar `/admin/stats` muestra los charts.

## Comandos útiles

```bash
# Ver logs de una Edge Function en vivo
supabase functions logs <fn-name> --tail

# Ver logs de un período
supabase functions logs anon-auth --since 1h

# Reset RLS / limpiar para testing (cuidado, borra datos)
DELETE FROM public.ip_log WHERE created_at >= now() - interval '24 hours';
DELETE FROM public.ip_blocklist WHERE blocked_at >= now() - interval '24 hours';
```

## Re-deploy de cambios

### Solo frontend
```bash
git add -A && git commit -m "ajuste"
git push origin main
npm run deploy   # build + push a gh-pages
```

### Solo una Edge Function
```bash
cp anon-auth.ts supabase/functions/anon-auth/index.ts
supabase functions deploy anon-auth --no-verify-jwt
```

### Solo SQL (migraciones nuevas)
Pegar en el SQL Editor de Supabase. Las nuevas waves van con `if not exists`/`do $$` para ser idempotentes.

## Dominio personalizado (opcional)

1. En GitHub → repo → Settings → Pages → Custom domain → `aura.iztacala.unam.mx`.
2. Añadir CNAME en tu DNS apuntando al GitHub Pages.
3. Cambiar `VITE_BASE_PATH=/` antes del build:
   ```bash
   VITE_BASE_PATH=/ npm run build
   npx gh-pages -d dist
   ```
4. Esperar propagación + activar HTTPS desde GitHub.

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| `Edge Function returned a non-2xx status code` | Función no deployada o env var falta | Probar `{ action: 'ping' }`, revisar logs |
| Test no genera resultado | `GEMINI_API_KEY` mal puesta o `gemini-1.5-flash` deprecado | Verificar secrets, usar `gemini-2.5-flash` |
| Buddy chat se "siente trabado" en móvil | Realtime no habilitado | Correr `buddy-realtime-enable.sql` |
| "IP bloqueada por uso indebido" en testing | Auto-bloqueo por más de 5 registros | `/admin/operaciones` → "🧹 Resetear rate limits de las últimas 24h" |
| Charts vacíos en admin | Vistas no migradas | Re-correr `wave-G-anonymous-activity.sql` |
| Error CORS en `functions.invoke` | Header de origen | Las funciones ya tienen CORS `*`, revisar consola del navegador |
