# Security Policy

## Reporting a Vulnerability

AURA atiende a estudiantes que pueden estar en momentos vulnerables. Tomamos la seguridad con MUY en serio.

**Si encuentras una vulnerabilidad NO abras un issue público.**

### Canales privados

- **Private vulnerability reporting** (recomendado): usa la pestaña Security de este repo, botón "Report a vulnerability". Solo el equipo de mantenedores lo ve.
- **Email**: seguridad@aura.iztacala.unam.mx (o el canal que la coordinación FES Iztacala defina).

Describe:
1. Qué encontraste (descripción técnica)
2. Cómo reproducirlo (pasos o PoC, sin tocar datos reales)
3. Posible impacto (qué datos / qué usuarios)
4. Sugerencia de fix si tienes idea

### Tiempos de respuesta esperados

| Severidad | Primera respuesta | Patch en producción |
|---|---|---|
| Crítica (PII expuesta, RCE) | 24h | 72h |
| Alta (RLS bypass, auth bypass) | 48h | 1 semana |
| Media (XSS, CSRF) | 1 semana | 2 semanas |
| Baja (defecto sin impacto directo) | 2 semanas | Próxima release |

### Reglas para investigadores

- Pruebas con tu propia cuenta anónima generada (código SIN-XXX-####).
- Reportes detallados que incluyan PoC.
- NO accedas a datos privados de otros usuarios.
- NO ejecutes DoS ni intentos masivos.
- NO uses ingeniería social contra el equipo o estudiantes.
- NO ataques infraestructura compartida UNAM/Supabase.

### Reconocimiento

Los reportes válidos serán reconocidos en este archivo (Hall of Fame) si el reportante lo autoriza. AURA es un programa universitario sin fines de lucro — no podemos ofrecer bounty económico, pero sí reconocimiento académico.

## Alcance

EN-SCOPE:
- https://unam-fesi.github.io/aura-fesi/
- Edge Functions de Supabase del proyecto AURA
- El código fuente en este repositorio

OUT-OF-SCOPE:
- Infraestructura compartida UNAM
- Cuentas personales de admins
- DoS / volumetric attacks
- Click-jacking en páginas sin acción crítica

## Hall of Fame

(Reportantes que han ayudado a mejorar la seguridad de AURA)

- _Por documentar_
