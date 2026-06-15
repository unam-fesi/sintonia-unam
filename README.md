# AURA

> Orientación universitaria para el bienestar emocional.
> Plataforma anónima, informativa y no diagnóstica para la comunidad UNAM.

Una autoevaluación breve (20 preguntas, 7-10 minutos) que entrega
un resultado por dimensiones, recomendaciones de autocuidado y vinculación
con recursos universitarios. Apoyada por inteligencia artificial **con responsabilidad**.

---

## Stack

| Capa        | Tecnología                                  |
|-------------|---------------------------------------------|
| Frontend    | React + Vite                                |
| Routing     | React Router DOM                            |
| Hosting     | GitHub Pages   temporal                             |
| Base datos  | Backend Postgres + Row Level Security      |
| Función IA  | Backend Edge Function               |


---

## Arquitectura

```
┌──────────────────────────────────────────────────────────────┐
│  navegador (GitHub Pages estático, React + Vite)             │
│  ──────────────────────────────────────────────────────────  │
│  [Home] → [Consent] → [Assessment 20q] → [Results]           │
│                              │                                │
│                              ▼                                │
│             /functions/generate-orientation                   │
│             (Edge Function, Deno)                             │
│                              │                                │
│                              ▼                                │
│                       PUM-AI                            │
└──────────────────────────────────────────────────────────────┘
            │
            └── Inserta sesión + respuestas (anónimas) →  Supabase Postgres
```

## Licencia y créditos

© Universidad Nacional Autónoma de México, 2026.
Programa universitario de orientación para el bienestar emocional.

Esta plataforma es informativa y no constituye atención clínica.
