// =============================================================
// AURA — Código anónimo de sesión
// Genera un identificador legible y NO PII para que la persona
// pueda regresar a su resultado durante la sesión y, en Fase 2,
// para seguimiento longitudinal voluntario.
// =============================================================

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // sin I, O para evitar confusión
const DIGITS = '23456789';                    // sin 0, 1

function pickFrom(set, n) {
  let out = '';
  const arr = new Uint32Array(n);
  crypto.getRandomValues(arr);
  for (let i = 0; i < n; i++) out += set[arr[i] % set.length];
  return out;
}

// Formato: SIN-XXX-9999  (ej. SIN-KQT-2856)
export function generateAnonymousCode() {
  return `SIN-${pickFrom(ALPHABET, 3)}-${pickFrom(DIGITS, 4)}`;
}

// SHA-256 hex (no PII; sólo se usa para deduplicar sesiones)
export async function hashCode(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
