// =============================================================
// AURA — Hook para gestionar la "sesión" anónima del estudiante
// Guarda anonymous_code (+ password opcional) en sessionStorage.
// =============================================================

import { useEffect, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';

const KEY = 'aura.student';

export function getStudent() {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
    // Fallback: si recién terminó un test, hay anon_code en otro storage
    const code = sessionStorage.getItem(STORAGE_KEYS.ANON_CODE);
    if (code) return { code, password: null };
    return null;
  } catch { return null; }
}

export function setStudent(payload) {
  if (!payload) sessionStorage.removeItem(KEY);
  else sessionStorage.setItem(KEY, JSON.stringify(payload));
  // Disparar evento para que otros componentes se enteren
  window.dispatchEvent(new Event('sintonia:student'));
}

export function clearStudent() {
  sessionStorage.removeItem(KEY);
  sessionStorage.removeItem(STORAGE_KEYS.ANON_CODE);
  window.dispatchEvent(new Event('sintonia:student'));
}

export function useStudent() {
  const [student, setS] = useState(getStudent);

  const refresh = useCallback(() => setS(getStudent()), []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('sintonia:student', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('sintonia:student', handler);
      window.removeEventListener('storage', handler);
    };
  }, [refresh]);

  return { student, setStudent: (p) => { setStudent(p); refresh(); }, clearStudent: () => { clearStudent(); refresh(); } };
}
